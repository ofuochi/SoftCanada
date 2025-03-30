import {Collection} from "tinacms";

export const LandingCollection: Collection = ({
  name: "landing",
  label: "Landing",
  path: "content/landing",
  format: "md",
  ui: {
    router: props => props.document._sys.relativePath === "home.md" ? "/" : props.document._sys.filename
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
      name: "blocks",
      label: "Blocks",
      type: "object",
      list: true,
      templates: [
        {
          name: "welcomeHero",
          label: "Welcome Hero",
          fields: [
            {
              name: "message",
              label: "Message",
              type: "rich-text",
              required: true
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string",
              required: true
            },
            {
              name: "buttonLink",
              label: "Button Link",
              type: "string",
              required: true
            },
            {
              name: "backgroundImage",
              label: "Background Image",
              type: "image",
              required: true
            },
          ],
        }
      ]
    },
  ]
});