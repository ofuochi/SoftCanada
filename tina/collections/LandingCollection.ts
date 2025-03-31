import {Collection} from "tinacms";

export const LandingCollection: Collection = {
  name: "landing",
  label: "Landing",
  path: "content/landing",
  format: "md",
  ui: {
    router: (props) =>
      props.document._sys.relativePath === "home.md"
        ? "/"
        : props.document._sys.filename,
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
              required: true,
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string",
              required: true,
            },
            {
              name: "buttonLink",
              label: "Button Link",
              type: "string",
              required: true,
            },
            {
              name: "backgroundImage",
              label: "Background Image",
              type: "image",
              required: true,
            },
          ],
        },
        {
          name: "homepageFeatureBlock",
          label: "Feature Sections",
          fields: [
            {
              name: "sectionTitle",
              label: "Section Title",
              type: "rich-text",
              required: true,
            },
            {
              name: "jobFeature",
              label: "Jobs & Career Advice",
              type: "object",
              fields: [
                {
                  name: "heading",
                  label: "Heading",
                  type: "rich-text",
                  required: true,
                },
                {
                  name: "buttonText",
                  label: "Button Text",
                  type: "string",
                  required: true,
                },
                {
                  name: "buttonLink",
                  label: "Button Link",
                  type: "string",
                },
                {
                  name: "image",
                  label: "Feature Image",
                  type: "image",
                  required: true,
                },
              ],
            },
            {
              name: "realEstateFeature",
              label: "Real Estate & Housing",
              type: "object",
              fields: [
                {
                  name: "heading",
                  label: "Heading",
                  type: "rich-text",
                  required: true,
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
                },
                {
                  name: "image",
                  label: "Feature Image",
                  type: "image",
                  required: true,
                },
              ],
            },
            {
              name: "immigrationFeature",
              label: "Immigration News & Pathways",
              type: "object",
              fields: [
                {
                  name: "heading",
                  label: "Heading",
                  type: "rich-text",
                  required: true,
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
                },
                {
                  name: "image",
                  label: "Immigration Image",
                  type: "image",
                  required: true,
                },
              ],
            },
            {
              name: "financeFeature",
              label: "Finance",
              type: "object",
              fields: [
                {
                  name: "heading",
                  label: "Heading",
                  type: "rich-text",
                  required: true,
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
                },
                {
                  name: "image",
                  label: "Finance Image",
                  type: "image",
                  required: true,
                },
              ],
            },
            {
              name: "grantsFeature",
              label: "Grants",
              type: "object",
              fields: [
                {
                  name: "heading",
                  label: "Heading",
                  type: "rich-text",
                  required: true,
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
                },
                {
                  name: "image",
                  label: "Feature Image",
                  type: "image",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
