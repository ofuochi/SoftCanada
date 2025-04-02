import { Collection } from "tinacms";

export const PostCollection: Collection = {
  name: "post",
  label: "Posts",
  path: "content/posts",
  format: "md",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
  ui: {
    router: ({ document }) => {
      console.log(document._sys);
      if (document._sys.filename === "home") {
        return "/";
      }
      return `/posts/${document._sys.filename}`;
    },
    // Add filename customization
    filename: {
      slugify: (values) => {
        return sanitizeFilename(values.title?.toLowerCase() || "untitled");
      },
    },
  },
};

// Helper function to sanitize filenames
const sanitizeFilename = (name: string) => {
  return name
    .replace(/[^a-z0-9]/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
};
