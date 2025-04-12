import { TinaAuth } from "@/tinaAuth";
import { defineConfig } from "tinacms";
import { BlogPostCollection } from "@/tina/collections/BlogPostCollection";
import { LandingCollection } from "@/tina/collections/LandingCollection";
import { FooterCollection } from "./collections/FooterCollection";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";
const clientId =
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID ||
  "b546cb9e-5a49-465b-9c70-a7fa3d6c8127";

const token =
  process.env.TINA_TOKEN || "4697295d0eaf11cc5d48f92c3844e9af0f439f2e";

export default defineConfig({
  branch,
  authProvider: new TinaAuth(),
  clientId,
  token,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [BlogPostCollection, LandingCollection, FooterCollection],
  },
});
