import { Collection } from "tinacms";

export const BlogPageCollection: Collection = {
  name: "blogPage",
  label: "Blog Page",
  path: "content/blogPage",
  format: "md",
  ui: {
    router: () => "/blogs",
  },
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
      name: "message",
      label: "Hero Heading",
      description: "The main heading message for the blog page.",
    },
    {
      type: "image",
      name: "backgroundImage",
      label: "Background Image",
      description: "Upload a background image for the hero section.",
    },
    {
      type: "rich-text",
      name: "blogHeading",
      label: "Blog Heading",
      description: "The heading for the blog section.",
    },
    {
      type: "string",
      name: "categoryTitle",
      label: "Category Title",
      description: "The title for the category section.",
    },
  ],
};
