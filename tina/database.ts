import { AzureCosmosLevel } from "@/lib/cosmos-level";
import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";

// Manage this flag in your CI/CD pipeline and make sure it is set to false in production
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN || "";
const owner = process.env.GITHUB_OWNER || "";
const repo = process.env.GITHUB_REPO || "";
const branch = process.env.GITHUB_BRANCH || "main";
const endpoint = process.env.COSMOS_ENDPOINT || "";
const key = process.env.COSMOS_KEY || "";

const gitProvider = new GitHubProvider({
  branch,
  owner,
  repo,
  token,
});
const db = new AzureCosmosLevel({
  endpoint,
  key,
  databaseName: "tinacms",
  containerName: "tinacms",
  partitionKey: "tinacms-partition",
  // If you know your data is textual (strings), set encodings:
  keyEncoding: "utf8",
  valueEncoding: "utf8",
});

async function initializeDatabase() {
  await db.open();
  return db;
}

const databaseAdapter = initializeDatabase();

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider,
      databaseAdapter,
      namespace: branch,
    });
