import {Collection} from "tinacms";

export const PostCollection: Collection = ({
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
    router: (props) =>
      props.document._sys.relativePath === "home.md"
        ? "/"
        : `/posts/${props.document._sys.filename}`,
  },
});