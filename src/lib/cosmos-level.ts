import {
  AbstractLevel,
  AbstractDatabaseOptions,
  AbstractOpenOptions,
  AbstractIterator,
  AbstractKeyIterator,
  AbstractValueIterator,
  NodeCallback,
} from "abstract-level";
import { NextCallback } from "abstract-level/types/abstract-iterator";
import { CosmosClient, Container, Database, SqlQuerySpec } from "@azure/cosmos";
import ModuleError from "module-error";

export interface AzureCosmosLevelOptions<K, V>
  extends AbstractDatabaseOptions<K, V> {
  endpoint: string;
  key: string;
  databaseName: string;
  containerName: string;
  partitionKey?: string;
}

export interface AzureCosmosLevelOpenOptions extends AbstractOpenOptions {
  createIfMissing?: boolean;
  errorIfExists?: boolean;
}

type BatchOperation = BatchPutOperation | BatchDelOperation;
interface BatchPutOperation {
  type: "put";
  key: Buffer;
  value: Buffer;
}
interface BatchDelOperation {
  type: "del";
  key: Buffer;
}

interface FilterOptions<K> {
  gt?: K;
  gte?: K;
  lt?: K;
  lte?: K;
  limit: number;
  reverse: boolean;
  keyEncoding: "buffer" | BufferEncoding;
  valueEncoding: "buffer" | BufferEncoding | "json";
}

interface IteratorOptions<K> extends FilterOptions<K> {
  keys: boolean;
  values: boolean;
}

function buildWhereClause<K>(
  options: FilterOptions<K>,
  partitionKey: string
): { condition: string; args: { name: string; value: any }[] } {
  const conditions = ["c.partitionKey = @partitionKey"];
  const args: { name: string; value: any }[] = [
    { name: "@partitionKey", value: partitionKey },
  ];

  const encode = (x: K): string => {
    if (options.keyEncoding === "buffer") {
      if (!(x instanceof Buffer)) {
        throw new Error("Key must be a Buffer when keyEncoding is buffer");
      }
      return x
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }
    const buf = Buffer.from(String(x), options.keyEncoding);
    return buf
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };

  if (options.gte !== undefined) {
    conditions.push("c.key >= @lower");
    args.push({ name: "@lower", value: encode(options.gte) });
  } else if (options.gt !== undefined) {
    conditions.push("c.key > @lower");
    args.push({ name: "@lower", value: encode(options.gt) });
  }

  if (options.lte !== undefined) {
    conditions.push("c.key <= @upper");
    args.push({ name: "@upper", value: encode(options.lte) });
  } else if (options.lt !== undefined) {
    conditions.push("c.key < @upper");
    args.push({ name: "@upper", value: encode(options.lt) });
  }

  return {
    condition: `WHERE ${conditions.join(" AND ")}`,
    args,
  };
}

function buildQuery<K>(
  options: IteratorOptions<K>,
  partitionKey: string
): SqlQuerySpec {
  const { condition, args } = buildWhereClause(options, partitionKey);
  let q = `SELECT * FROM c ${condition} ORDER BY c.key ${
    options.reverse ? "DESC" : "ASC"
  }`;
  if (options.limit > 0) {
    q += ` OFFSET 0 LIMIT ${options.limit}`;
  }
  return { query: q, parameters: args };
}

class AzureCosmosIterator<K, V> extends AbstractIterator<
  AzureCosmosLevel<K, V>,
  K,
  V
> {
  private feed: AsyncIterableIterator<any>;
  private currentPage: any[] = [];
  private pageIndex = 0;
  private itemsYielded = 0;

  constructor(
    db: AzureCosmosLevel<K, V>,
    container: Container,
    private readonly options: IteratorOptions<K>
  ) {
    super(db, options);
    const { query, parameters } = buildQuery(options, db.partitionKey);
    this.feed = container.items
      .query({ query, parameters }, { maxItemCount: options.limit || 100 })
      .getAsyncIterator() as AsyncIterableIterator<any>;
  }

  private async loadNextPage() {
    const { value, done } = await this.feed.next();
    this.currentPage = done || !value?.resources ? [] : value.resources;
    this.pageIndex = 0;
  }

  async _next(callback: NextCallback<K, V>) {
    try {
      if (this.options.limit > 0 && this.itemsYielded >= this.options.limit) {
        return this.db.nextTick(callback);
      }

      while (true) {
        if (this.pageIndex >= this.currentPage.length) {
          await this.loadNextPage();
        }
        if (this.currentPage.length === 0) {
          return this.db.nextTick(callback);
        }

        const doc = this.currentPage[this.pageIndex++];
        this.itemsYielded++;

        let outKey: K | undefined;
        let outValue: V | undefined;

        if (this.options.keys) {
          outKey = this.db.decodeKey(
            doc.key,
            this.options.keyEncoding as string
          );
        }
        if (this.options.values) {
          outValue = this.db.decodeValue(
            doc.value,
            this.options.valueEncoding as string
          );
        }

        return this.db.nextTick(callback, null, outKey, outValue);
      }
    } catch (err: any) {
      return this.db.nextTick(
        callback,
        new ModuleError(err.message, { code: "COSMOS_ERROR" })
      );
    }
  }
}

class AzureCosmosKeyIterator<K, V> extends AbstractKeyIterator<
  AzureCosmosLevel<K, V>,
  K
> {
  private iterator: AzureCosmosIterator<K, V>;
  constructor(
    db: AzureCosmosLevel<K, V>,
    container: Container,
    options: IteratorOptions<K>
  ) {
    super(db, options);
    this.iterator = new AzureCosmosIterator(db, container, {
      ...options,
      values: false,
    });
  }
  async _next(callback: NodeCallback<K>) {
    this.iterator._next((err, key) => callback(err, key));
  }
}

class AzureCosmosValueIterator<K, V> extends AbstractValueIterator<
  AzureCosmosLevel<K, V>,
  K,
  V
> {
  private iterator: AzureCosmosIterator<K, V>;
  constructor(
    db: AzureCosmosLevel<K, V>,
    container: Container,
    options: IteratorOptions<K>
  ) {
    super(db, options);
    this.iterator = new AzureCosmosIterator(db, container, {
      ...options,
      keys: false,
    });
  }
  async _next(callback: NextCallback<K, V>) {
    this.iterator._next((err, _, value) => callback(err, value as any));
  }
}

export class AzureCosmosLevel<K = string, V = string> extends AbstractLevel<
  Buffer | Uint8Array | string,
  K,
  V
> {
  private client?: CosmosClient;
  private db?: Database;
  private container?: Container;

  constructor(private readonly opts: AzureCosmosLevelOptions<K, V>) {
    super(
      {
        encodings: {
          utf8: true,
          buffer: true,
        },
      },
      opts
    );
  }

  get type() {
    return "azure-cosmos-level";
  }

  get partitionKey() {
    return this.opts.partitionKey ?? "tinacms-partition";
  }

  async _open(
    _: AzureCosmosLevelOpenOptions,
    callback: NodeCallback<void>
  ): Promise<void> {
    try {
      const { endpoint, key, databaseName, containerName } = this.opts;
      if (!endpoint || !key || !databaseName || !containerName) {
        throw new Error("Missing required Cosmos config parameters");
      }
      this.client = new CosmosClient({ endpoint, key });
      const { database } = await this.client.databases.createIfNotExists({
        id: databaseName,
      });
      this.db = database;
      const { container } = await database.containers.createIfNotExists({
        id: containerName,
        partitionKey: { paths: ["/partitionKey"] },
      });
      this.container = container;
      this.nextTick(callback);
    } catch (err: any) {
      this.nextTick(
        callback,
        new ModuleError(err.message, {
          code:
            err.code === 409 ? "LEVEL_DATABASE_EXISTS" : "COSMOS_OPEN_FAILED",
        })
      );
    }
  }

  async _close(callback: NodeCallback<void>) {
    try {
      this.client?.dispose();
      this.client = undefined;
      this.db = undefined;
      this.container = undefined;
      this.nextTick(callback);
    } catch (err: any) {
      this.nextTick(
        callback,
        new ModuleError(err.message, { code: "COSMOS_CLOSE_FAILED" })
      );
    }
  }

  private toDocId(keyBuf: Buffer): string {
    const buff = Buffer.from(keyBuf.toString());
    return buff
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  private fromDocId(docId: string): Buffer {
    let base64 = docId.replace(/-/g, "+").replace(/_/g, "/");
    const pad = (4 - (base64.length % 4)) % 4;
    base64 += "=".repeat(pad);
    return Buffer.from(base64, "base64");
  }

  decodeKey(encoded: string, encoding: string): K {
    const buf = this.fromDocId(encoded);
    if (encoding === "buffer") return buf as unknown as K;
    if (encoding === "utf8") return buf.toString("utf8") as unknown as K;
    if (encoding === "json")
      return JSON.parse(buf.toString("utf8")) as unknown as K;
    throw new ModuleError(`Unsupported key encoding: ${encoding}`, {
      code: "ENCODING_NOT_SUPPORTED",
    });
  }

  decodeValue(encoded: string, encoding: string): V {
    if (encoding === "buffer") {
      return Buffer.from(encoded, "base64") as unknown as V;
    }
    if (encoding === "utf8") {
      return encoded as unknown as V;
    }
    if (encoding === "json") {
      const buf = Buffer.from(encoded, "base64");
      return JSON.parse(buf.toString("utf8")) as V;
    }
    throw new ModuleError(`Unsupported value encoding: ${encoding}`, {
      code: "ENCODING_NOT_SUPPORTED",
    });
  }

  async _put(
    key: Buffer,
    value: Buffer,
    options: any,
    callback: NodeCallback<void>
  ): Promise<void> {
    try {
      const id = this.toDocId(key);
      let storeValue: string;
      switch (options.valueEncoding) {
        case "buffer":
          storeValue = value.toString("base64");
          break;
        case "json":
          storeValue = Buffer.from(
            JSON.stringify(value.toString("utf8"))
          ).toString("base64");
          break;
        case "utf8":
          storeValue = value.toString("utf8");
          break;
        default:
          throw new Error(
            `Unsupported value encoding: ${options.valueEncoding}`
          );
      }
      await this.container!.items.upsert({
        id,
        partitionKey: this.partitionKey,
        key: id,
        value: storeValue,
      });
      this.nextTick(callback);
    } catch (err: any) {
      this.nextTick(
        callback,
        new ModuleError(err.message, { code: "COSMOS_ERROR" })
      );
    }
  }

  async _get(
    key: Buffer,
    _: any,
    callback: (err?: Error, val?: Buffer | string) => void
  ) {
    try {
      const id = this.toDocId(key);
      const { resource } = await this.container!.item(
        id,
        this.partitionKey
      ).read();
      if (!resource) {
        return this.nextTick(
          callback,
          new ModuleError("Key not found", { code: "LEVEL_NOT_FOUND" })
        );
      }

      this.nextTick(callback, null, resource.value);
    } catch (err: any) {
      if (err.code === 404) {
        return this.nextTick(
          callback,
          new ModuleError("Key not found", { code: "LEVEL_NOT_FOUND" })
        );
      }
      this.nextTick(
        callback,
        new ModuleError(err.message, { code: "COSMOS_ERROR" })
      );
    }
  }

  async _del(key: Buffer, _opts: any, callback: NodeCallback<void>) {
    try {
      const id = this.toDocId(key);
      await this.container!.item(id, this.partitionKey).delete();
      this.nextTick(callback);
    } catch (err: any) {
      if (err.code === 404) return this.nextTick(callback);
      this.nextTick(
        callback,
        new ModuleError(err.message, { code: "COSMOS_ERROR" })
      );
    }
  }

  async _batch(ops: BatchOperation[], _: any, callback: NodeCallback<void>) {
    try {
      const batchReq = ops.map((op) => {
        const id = this.toDocId(op.key);
        return op.type === "put"
          ? {
              operationType: "Upsert" as const,
              id,
              resourceBody: {
                id,
                partitionKey: this.partitionKey,
                key: id,
                value: op.value.toString("base64"),
              },
            }
          : { operationType: "Delete" as const, id };
      });
      await this.container!.items.batch(batchReq, this.partitionKey);
      this.nextTick(callback);
    } catch (err: any) {
      this.nextTick(
        callback,
        new ModuleError(err.message, { code: "COSMOS_ERROR" })
      );
    }
  }

  async _clear(
    options: FilterOptions<K>,
    callback: NodeCallback<void>
  ): Promise<void> {
    try {
      const { query, parameters } = buildQuery(
        {
          ...options,
          keys: true,
          values: false,
        },
        this.partitionKey
      );
      // We'll ignore the limit in the user options, because they might have Infinity
      // We'll do a "scan" approach:
      const feed = this.container!.items.query(
        { query, parameters },
        { maxItemCount: undefined }
      ).getAsyncIterator() as AsyncIterableIterator<any>;

      let page;
      do {
        page = await feed.next();
        if (page.value && page.value.resources) {
          const batchDeletes = page.value.resources.map(async (doc: any) => {
            await this.container!.item(doc.id, this.partitionKey).delete();
          });
          await Promise.all(batchDeletes);
        }
      } while (!page.done);

      this.nextTick(callback);
    } catch (err: any) {
      return this.nextTick(
        callback,
        new ModuleError(err.message, { code: "COSMOS_ERROR" })
      );
    }
  }

  _iterator(
    opts: IteratorOptions<K>
  ): AbstractIterator<AzureCosmosLevel<K, V>, K, V> {
    return new AzureCosmosIterator(this, this.container!, opts);
  }
  _keys(
    opts: IteratorOptions<K>
  ): AbstractKeyIterator<AzureCosmosLevel<K, V>, K> {
    return new AzureCosmosKeyIterator(this, this.container!, opts);
  }
  _values(
    opts: IteratorOptions<K>
  ): AbstractValueIterator<AzureCosmosLevel<K, V>, K, V> {
    return new AzureCosmosValueIterator(this, this.container!, opts);
  }
}
