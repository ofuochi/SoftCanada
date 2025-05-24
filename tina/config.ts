import { BlogPostCollection } from "@/tina/collections/BlogPostCollection";
import { LandingCollection } from "@/tina/collections/LandingCollection";
import { TinaAuth } from "@/tinaAuth";
import { defineConfig } from "tinacms";
import { FooterCollection } from "./collections/FooterCollection";
import { BlogPageCollection } from "./collections/BlogPageCollection";
import { ContactCollection } from "./collections/ContactCollection";
import { FaqCollection } from "./collections/FaqCollection";

export default defineConfig({
  contentApiUrlOverride: "/api/gql",
  authProvider: new TinaAuth(),
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      const { AzureMediaStore } = await import("@/lib/media-store");
      return AzureMediaStore;
    },
  },
  schema: {
    collections: [
      BlogPostCollection,
      LandingCollection,
      FooterCollection,
      BlogPageCollection,
      ContactCollection,
      FaqCollection,
    ],
  },
});
