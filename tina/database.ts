import { AzureCosmosLevel } from "@/lib/cosmos-level";
import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";

// Manage this flag in your CI/CD pipeline and make sure it is set to false in production
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const token = process.env.SOFTCAN_GITHUB_PAT!;
const owner = process.env.SOFTCAN_GITHUB_OWNER!;
const repo = process.env.SOFTCAN_GITHUB_REPO!;
const branch = process.env.SOFTCAN_GITHUB_BRANCH || "main";

const gitProvider = new GitHubProvider({
  branch,
  owner,
  repo,
  token,
});
const databaseAdapter = new AzureCosmosLevel({
  endpoint: process.env.COSMOS_ENDPOINT!,
  key: process.env.COSMOS_KEY!,
  databaseName: "tinacms",
  containerName: "tinacms",
  partitionKey: "tinacms-partition",
  keyEncoding: "buffer",
  valueEncoding: "buffer",
});

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider,
      databaseAdapter,
      namespace: branch,
    });
