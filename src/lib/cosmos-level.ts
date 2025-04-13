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
import { CosmosClient, Container, Database } from "@azure/cosmos";
import ModuleError from "module-error";

/**
 * These options configure the AzureCosmosLevel.  You can add custom fields like partitionKey, etc.
 */
export interface AzureCosmosLevelOptions<K, V>
  extends AbstractDatabaseOptions<K, V> {
  endpoint: string;
  key: string;
  databaseName: string;
  containerName: string;

  /**
   * Hard-coded partition key for all documents.  If you need per-document partitioning,
   * you can adapt this library to suit.
   */
  partitionKey?: string;
}

/**
 * Implement how you want to handle open-time checks.  By default
 * abstract-level expects these, but you can ignore them if they
 * don’t apply to Cosmos (like `createIfMissing`, `errorIfExists`).
 */
export interface AzureCosmosLevelOpenOptions extends AbstractOpenOptions {
  createIfMissing?: boolean;
  errorIfExists?: boolean;
}

/**
 * The internal shape of batch operations.  We'll store keys/values as Buffers
 * because `abstract-level` has already encoded them as per your manifest.
 */
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

/**
 * Options for building queries with gt/gte/lt/lte, reverse, limit, etc.
 * By the time we get them, keys/values have been encoded to Buffers or strings
 * according to the `db.supports.encodings`.
 */
interface FilterOptions<K> {
  gt?: K;
  gte?: K;
  lt?: K;
  lte?: K;
  limit: number;
  reverse: boolean;
  keyEncoding: string;
  valueEncoding: string;
}

/**
 * An iterator extends these filter options plus information about whether we want keys, values, or both.
 */
interface IteratorOptions<K> extends FilterOptions<K> {
  keys: boolean;
  values: boolean;
}

/**
 * Convert user-supplied filter constraints (like .gt, .lt, etc.) into a snippet
 * of WHERE clause for Cosmos.  This is a naive string approach.  For robust usage
 * you'd parameterize queries to avoid injection or do a more carefully-coded approach.
 */
function buildWhereClause<K>(options: FilterOptions<K>): {
  condition: string;
  args: any[];
} {
  // We'll store conditions in an array of strings, then join them with AND
  // We'll also push parameters into an array as [value].
  const conditions: string[] = [];
  const args: any[] = [];

  // We'll treat all keys as strings so let's coerce them.  If your keys are Buffers,
  // you'll want to convert them to base64 or something consistent.  For simplicity, do .toString().
  function asString(x: K) {
    if (x instanceof Buffer) return x.toString("base64");
    return String(x);
  }

  // gte / gt
  if (options.gte !== undefined) {
    conditions.push(`c.key >= @lower`);
    args.push(asString(options.gte));
  } else if (options.gt !== undefined) {
    conditions.push(`c.key > @lower`);
    args.push(asString(options.gt));
  }

  // lte / lt
  if (options.lte !== undefined) {
    conditions.push(`c.key <= @upper`);
    args.push(asString(options.lte));
  } else if (options.lt !== undefined) {
    conditions.push(`c.key < @upper`);
    args.push(asString(options.lt));
  }

  if (conditions.length === 0) {
    return { condition: "", args: [] };
  }
  return {
    condition: "WHERE " + conditions.join(" AND "),
    args,
  };
}

/**
 * Create a SQL query from the user-specified range and ordering.  We'll do "SELECT c.key, c.value FROM c"
 * plus the WHERE clause, plus "ORDER BY c.key ASC|DESC".
 */
function buildQuery<K>(options: IteratorOptions<K>): {
  query: string;
  parameters: any[];
} {
  // If we only want keys, do SELECT c.key.  If we only want values, do SELECT c.value.  If we want both, do SELECT c.key, c.value
  // For simplicity, just always do SELECT c.key, c.value:
  const selectClause = `SELECT c.key, c.value FROM c`;
  const whereInfo = buildWhereClause(options);
  const order = options.reverse ? "DESC" : "ASC";

  const queryText = [
    selectClause,
    whereInfo.condition,
    `ORDER BY c.key ${order}`,
  ]
    .filter((x) => x.length > 0)
    .join(" ");

  // We'll set parameter placeholders @lower, @upper in order.
  // We have to build a parameters array with name & value.  We'll do a quick approach:
  const parameters: any[] = [];
  let paramIndex = 0;

  whereInfo.args.forEach((val) => {
    paramIndex++;
    if (paramIndex === 1) {
      parameters.push({ name: "@lower", value: val });
    } else if (paramIndex === 2) {
      parameters.push({ name: "@upper", value: val });
    }
  });

  return {
    query: queryText,
    parameters,
  };
}

/**
 * The main key+value iterator class, which must implement `_next()` etc.
 * We'll lazily call container.items.query(...) and keep fetching pages (continuation tokens) as needed.
 */
class AzureCosmosIterator<KDefault, VDefault> extends AbstractIterator<
  AzureCosmosLevel<KDefault, VDefault>,
  KDefault,
  VDefault
> {
  private feed: AsyncIterableIterator<any>;
  private currentPage: any[] = [];
  private pageIndex = 0;

  constructor(
    db: AzureCosmosLevel<KDefault, VDefault>,
    private readonly container: Container,
    private readonly options: IteratorOptions<KDefault>
  ) {
    super(db, options);

    const { query, parameters } = buildQuery(options);

    // Setting maxItemCount helps limit how many items we get at once if user sets limit.
    // We do a minimum of 1 if user sets limit to e.g. -1 or Infinity.
    const maxItemCount = options.limit <= 0 ? undefined : options.limit;
    this.feed = container.items
      .query(
        { query, parameters },
        {
          maxItemCount,
        }
      )
      .getAsyncIterator() as AsyncIterableIterator<any>;
  }

  private async loadNextPage(): Promise<void> {
    const page = await this.feed.next();
    if (!page || page.done || !page.value || !page.value.resources) {
      this.currentPage = [];
    } else {
      this.currentPage = page.value.resources;
    }
    this.pageIndex = 0;
  }

  async _next(callback: NextCallback<KDefault, VDefault>) {
    try {
      // If we've exhausted the current page, fetch another
      if (this.pageIndex >= this.currentPage.length) {
        await this.loadNextPage();
      }

      if (this.currentPage.length === 0) {
        // Natural end
        return this.db.nextTick(callback);
      }

      // We'll have a doc with { key, value }
      const doc = this.currentPage[this.pageIndex++];

      // Convert them back to the type that abstract-level expects
      // We'll treat them as base64 if we stored them that way.  For simplicity, assume we stored raw strings:
      const rawKey = doc.key;
      const rawVal = doc.value;

      // If user only wants keys, yield [key, undefined].
      // If user only wants values, yield [undefined, value].
      // Usually we do [key, value].
      let outKey: KDefault | undefined;
      let outValue: VDefault | undefined;

      if (this.options.keys) {
        // If the stored doc key is a base64 string, decode.  Or if we stored them as raw strings, parse them.
        outKey =
          this.options.keyEncoding === "utf8"
            ? (rawKey as unknown as KDefault)
            : (rawKey as unknown as KDefault);
      }
      if (this.options.values) {
        outValue =
          this.options.valueEncoding === "utf8"
            ? (rawVal as unknown as VDefault)
            : (rawVal as unknown as VDefault);
      }

      // Call back with the pair (or partial pair)
      return this.db.nextTick(callback, null, outKey, outValue);
    } catch (err: any) {
      return callback(new ModuleError(err.message, { code: "COSMOS_ERROR" }));
    }
  }
}

/**
 * The key-only iterator.  We do the same logic as above, but yield only keys.
 */
class AzureCosmosKeyIterator<KDefault, VDefault> extends AbstractKeyIterator<
  AzureCosmosLevel<KDefault, VDefault>,
  KDefault
> {
  private feed: AsyncIterableIterator<any>;
  private currentPage: any[] = [];
  private pageIndex = 0;

  constructor(
    db: AzureCosmosLevel<KDefault, VDefault>,
    private container: Container,
    private options: IteratorOptions<KDefault>
  ) {
    super(db, options);
    const { query, parameters } = buildQuery(options);

    this.feed = container.items
      .query(
        { query, parameters },
        {
          maxItemCount: options.limit <= 0 ? undefined : options.limit,
        }
      )
      .getAsyncIterator() as AsyncIterableIterator<any>;
  }

  private async loadNextPage(): Promise<void> {
    const page = await this.feed.next();
    if (!page || page.done || !page.value || !page.value.resources) {
      this.currentPage = [];
    } else {
      this.currentPage = page.value.resources;
    }
    this.pageIndex = 0;
  }

  async _next(callback: NodeCallback<KDefault>) {
    try {
      if (this.pageIndex >= this.currentPage.length) {
        await this.loadNextPage();
      }

      if (this.currentPage.length === 0) {
        return this.db.nextTick(callback);
      }

      const doc = this.currentPage[this.pageIndex++];
      // doc.key might be base64 or string
      let outKey: KDefault | undefined;
      if (this.options.keyEncoding === "utf8") {
        outKey = doc.key as KDefault;
      } else {
        outKey = doc.key as KDefault;
      }

      return this.db.nextTick(callback, null, outKey);
    } catch (err: any) {
      return callback(new ModuleError(err.message, { code: "COSMOS_ERROR" }));
    }
  }
}

/**
 * The value-only iterator.  We do the same logic as above, but yield only values.
 */
class AzureCosmosValueIterator<
  KDefault,
  VDefault
> extends AbstractValueIterator<
  AzureCosmosLevel<KDefault, VDefault>,
  KDefault,
  VDefault
> {
  private feed: AsyncIterableIterator<any>;
  private currentPage: any[] = [];
  private pageIndex = 0;

  constructor(
    db: AzureCosmosLevel<KDefault, VDefault>,
    private container: Container,
    private options: IteratorOptions<KDefault>
  ) {
    super(db, options);

    const { query, parameters } = buildQuery(options);
    this.feed = container.items
      .query(
        { query, parameters },
        {
          maxItemCount: options.limit <= 0 ? undefined : options.limit,
        }
      )
      .getAsyncIterator() as AsyncIterableIterator<any>;
  }

  private async loadNextPage(): Promise<void> {
    const page = await this.feed.next();
    if (!page || page.done || !page.value || !page.value.resources) {
      this.currentPage = [];
    } else {
      this.currentPage = page.value.resources;
    }
    this.pageIndex = 0;
  }

  async _next(callback: NextCallback<KDefault, VDefault>) {
    try {
      if (this.pageIndex >= this.currentPage.length) {
        await this.loadNextPage();
      }

      if (this.currentPage.length === 0) {
        return this.db.nextTick(callback);
      }

      const doc = this.currentPage[this.pageIndex++];
      let outVal: VDefault | undefined;
      if (this.options.valueEncoding === "utf8") {
        outVal = doc.value as VDefault;
      } else {
        outVal = doc.value as VDefault;
      }
      return this.db.nextTick(callback, null, outVal);
    } catch (err: any) {
      return callback(new ModuleError(err.message, { code: "COSMOS_ERROR" }));
    }
  }
}

/**
 * Finally, our main class that extends AbstractLevel, storing data in Azure Cosmos.
 * We keep the entire config needed: endpoint, key, databaseName, containerName, etc.
 *
 * By default, we declare support for `'utf8'` so that at minimum we can
 * store strings in `_put` / `_get` without extra conversions.  If you can
 * also store Buffer data natively, you can add `'buffer': true` to the manifest.
 */
export class AzureCosmosLevel<
  KDefault = string,
  VDefault = string
> extends AbstractLevel<Buffer | Uint8Array | string, KDefault, VDefault> {
  private readonly endpoint: string;
  private readonly masterKey: string;
  private readonly databaseName: string;
  private readonly containerName: string;
  private readonly partitionKey: string;

  private client?: CosmosClient;
  private db?: Database;
  private container?: Container;

  /**
   * The constructor defines what we "say" we support.  Minimally `'utf8'`.
   * If your code can pass through buffers natively, also do `encodings: { utf8: true, buffer: true }`.
   */
  constructor(options: AzureCosmosLevelOptions<KDefault, VDefault>) {
    super({ encodings: { utf8: true } }, options);

    this.endpoint = options.endpoint;
    this.masterKey = options.key;
    this.databaseName = options.databaseName;
    this.containerName = options.containerName;
    this.partitionKey = options.partitionKey ?? "leveldb";
  }

  get type() {
    return "azure-cosmos-level";
  }

  /**
   * Called by abstract-level once the user or library does `db.open()`.
   * We create or open the DB/Container, ensuring a partition key is set up.
   */
  async _open(
    options: AzureCosmosLevelOpenOptions,
    callback: (error?: Error) => void
  ): Promise<void> {
    if (
      !this.endpoint ||
      !this.masterKey ||
      !this.databaseName ||
      !this.containerName
    ) {
      return this.nextTick(
        callback,
        new ModuleError(
          "Missing required Cosmos config: endpoint, key, databaseName, containerName",
          { code: "COSMOS_CONFIG_ERROR" }
        )
      );
    }

    try {
      this.client = new CosmosClient({
        endpoint: this.endpoint,
        key: this.masterKey,
      });
      // Create database if not exists
      const { database } = await this.client.databases.createIfNotExists({
        id: this.databaseName,
      });
      this.db = database;

      // Create container if not exists, with partitionKey = "/partitionKey"
      const { container } = await database.containers.createIfNotExists({
        id: this.containerName,
        partitionKey: "/partitionKey",
      });
      this.container = container;
      // All done
      this.nextTick(callback);
    } catch (err: any) {
      return this.nextTick(
        callback,
        new ModuleError(err.message, { code: "COSMOS_OPEN_FAILED" })
      );
    }
  }

  /**
   * Called by abstract-level once the user or library does `db.close()`.
   */
  async _close(callback: (error?: Error) => void): Promise<void> {
    try {
      // CosmosClient doesn't strictly need 'closing', but we'll drop references
      // in case we want to re-open or let GC do its thing
      this.db = undefined;
      this.container = undefined;
      if (this.client) {
        // There's no official "close" on CosmosClient but let's drop it anyway
        this.client.dispose?.();
        this.client = undefined;
      }
      this.nextTick(callback);
    } catch (err: any) {
      return this.nextTick(
        callback,
        new ModuleError(err.message, { code: "COSMOS_CLOSE_FAILED" })
      );
    }
  }

  /**
   * Insert or update a single key/value pair.
   */
  async _put(
    key: Buffer,
    value: Buffer,
    options: any,
    callback: (error?: Error) => void
  ) {
    try {
      const docId = this.toDocId(key); // produce safe ID with no slash
      const valString = value.toString("base64");
      await this.container!.items.upsert({
        id: docId, // always store slash-free docId
        partitionKey: this.partitionKey,
        key: key.toString("base64"), // original base64 is fine as data
        value: valString,
      });
      this.nextTick(callback);
    } catch (err: any) {
      return callback(new ModuleError(err.message, { code: "COSMOS_ERROR" }));
    }
  }

  /**
   * Retrieve a single value by key.
   */
  async _get(
    key: Buffer,
    options: any,
    callback: (error?: Error, value?: Buffer) => void
  ) {
    try {
      const docId = this.toDocId(key); // same transformation
      const { resource } = await this.container!.item(
        docId,
        this.partitionKey
      ).read();
      if (!resource) {
        return this.nextTick(
          callback,
          new ModuleError(`Key not found`, { code: "LEVEL_NOT_FOUND" })
        );
      }
      const buff = Buffer.from(resource.value, "base64");
      this.nextTick(callback, null, buff);
    } catch (err: any) {
      if (err.code === 404) {
        return this.nextTick(
          callback,
          new ModuleError(`Key not found`, { code: "LEVEL_NOT_FOUND" })
        );
      }
      return this.nextTick(
        callback,
        new ModuleError(err.message, { code: "COSMOS_ERROR" })
      );
    }
  }

  /**
   * Delete a single entry by key.
   */
  async _del(
    key: Buffer,
    options: any,
    callback: (error?: Error) => void
  ): Promise<void> {
    try {
      const keyString = key.toString("base64");
      await this.container!.item(keyString, this.partitionKey).delete();
      this.nextTick(callback);
    } catch (err: any) {
      // If 404, that's okay, means nothing to delete
      // Some folks might want to treat that as an error. We'll just ignore
      if (err.code === 404) {
        return this.nextTick(callback);
      }
      return this.nextTick(
        callback,
        new ModuleError(err.message, { code: "COSMOS_ERROR" })
      );
    }
  }

  /**
   * Batch operations: we either put or delete multiple keys.  We'll do multiple upserts
   * or deletes in parallel.  For bigger performance, you might try the bulk API.
   */
  async _batch(
    ops: BatchOperation[],
    options: any,
    callback: (error?: Error) => void
  ): Promise<void> {
    try {
      // If you want better performance, consider container.items.batch().
      // But that has a limit on partition keys, so here we do naive parallel ops:
      const tasks = ops.map(async (op) => {
        if (op.type === "put") {
          const keyString = op.key.toString("base64");
          const valString = op.value.toString("base64");
          await this.container!.items.upsert({
            id: keyString,
            partitionKey: this.partitionKey,
            key: keyString,
            value: valString,
          });
        } else if (op.type === "del") {
          const keyString = op.key.toString("base64");
          try {
            await this.container!.item(keyString, this.partitionKey).delete();
          } catch (e: any) {
            if (e.code !== 404) throw e;
          }
        }
      });
      await Promise.all(tasks);
      this.nextTick(callback);
    } catch (err: any) {
      return this.nextTick(
        callback,
        new ModuleError(err.message, { code: "COSMOS_ERROR" })
      );
    }
  }

  /**
   * Clear a range (or everything).  We'll do a naive approach: query all matching docs, then delete them one by one.
   * For large sets, you should probably do more optimal flows or the bulk API.
   */
  async _clear(
    options: FilterOptions<KDefault>,
    callback: (error?: Error) => void
  ): Promise<void> {
    try {
      const { query, parameters } = buildQuery({
        ...options,
        keys: true,
        values: false,
      });
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

  /**
   * Return a full-blown iterator that yields `[key, value]`.
   */
  _iterator(
    options: IteratorOptions<KDefault>
  ): AbstractIterator<
    AzureCosmosLevel<KDefault, VDefault>,
    KDefault,
    VDefault
  > {
    return new AzureCosmosIterator<KDefault, VDefault>(
      this,
      this.container!,
      options
    );
  }

  /**
   * Return a key-only iterator.
   */
  _keys(
    options: IteratorOptions<KDefault>
  ): AbstractKeyIterator<AzureCosmosLevel<KDefault, VDefault>, KDefault> {
    // We can reuse the same logic or do a specialized class:
    return new AzureCosmosKeyIterator<KDefault, VDefault>(
      this,
      this.container!,
      options
    );
  }

  /**
   * Return a value-only iterator.
   */
  _values(
    options: IteratorOptions<KDefault>
  ): AbstractValueIterator<
    AzureCosmosLevel<KDefault, VDefault>,
    KDefault,
    VDefault
  > {
    return new AzureCosmosValueIterator<KDefault, VDefault>(
      this,
      this.container!,
      options
    );
  }

  private toDocId(keyBuf: Buffer): string {
    // 1) Raw base64
    let raw = keyBuf.toString("base64");
    // 2) Replace + with - and / with _
    raw = raw.replace(/\+/g, "-").replace(/\//g, "_");
    // 3) Remove = padding if any (optional, but commonly done in “base64url”)
    raw = raw.replace(/=+$/, "");
    return raw;
  }
}
