import { Collection } from "tinacms";

export const BlogCategories: readonly string[] = [
  "Finance",
  "Immigration",
  "Real Estate",
  "Deals",
  "Careers",
  "Lifestyle",
] as const;

export const BlogPostCollection: Collection = {
  name: "blogs",
  label: "Blog Posts",
  path: "content/blogs", // Allow nested directories
  format: "md",
  match: {
    include: "**/*",
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      description: "The title of the post.",
      required: true,
    },
    {
      type: "string",
      name: "category",
      label: "Category",
      options: BlogCategories as string[],
      description: "Select a category for the post.",
      required: true,
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      required: true,
      description: "The main content of the post.",
    },
    {
      type: "string",
      name: "author",
      label: "Author",
      description: "The author of the post.",
      required: true,
    },
    {
      type: "datetime",
      name: "date",
      label: "Publish Date",
      description: "The date when the post was published.",
      required: true,
    },
    {
      type: "string",
      name: "readTime",
      label: "Read Time",
      description: "Estimated read time in minutes",
      required: true,
    },
    {
      type: "string",
      name: "excerpt",
      label: "Excerpt",
      description: "A short summary of the post for SEO purposes.",
      required: true,
    },
    {
      type: "image",
      name: "thumbnail",
      label: "Thumbnail Image",
      description: "A thumbnail image for the post.",
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/blogs/${document._sys.breadcrumbs.join("/")}`;
    },
    filename: {
      slugify: (values) => {
        const category = values.category
          ? sanitizeFilename(values.category.toLowerCase()) + "/"
          : "";
        const title = sanitizeFilename(
          values.title?.toLowerCase() || "untitled"
        );
        return `${category}${title}`;
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
