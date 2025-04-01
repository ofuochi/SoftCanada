import { Collection } from "tinacms";
import { IconPicker } from "../../src/components/IconPicker";

import * as Icons from "react-icons/fa";

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
          label: "Features section",
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
                  required: true,
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
                  required: true,
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
          ],
        },
        {
          name: "howItWorksBlock",
          label: '"How It Works" section',
          fields: [
            {
              name: "heading",
              label: "Heading",
              type: "rich-text",
            },

            {
              name: "step1",
              label: "Left to right step",
              type: "object",
              list: true,
              ui: {
                itemProps: (item) => {
                  return {
                    label: item.label,
                  };
                },
                defaultItem: () => {
                  return {
                    title: "Step Title",
                    description: "Step Description",
                    icon: Object.keys(Icons)[0],
                  };
                },
              },
              fields: [
                {
                  name: "title",
                  label: "Title",
                  type: "string",
                  required: true,
                },
                {
                  name: "description",
                  label: "Description",
                  type: "string",
                  ui: {
                    component: "textarea",
                  },
                  required: true,
                },
                {
                  name: "icon",
                  label: "Icon",
                  type: "string",
                  options: Object.keys(Icons),
                  ui: {
                    component: IconPicker,
                  },
                  required: true,
                },
                {
                  name: "iconColor",
                  label: "Icon Color",
                  type: "string",
                  options: [
                    "red",
                    "blue",
                    "yellow",
                    "purple",
                    "green",
                    "orange",
                    "pink",
                  ],
                },
              ],
            },
            {
              name: "step2",
              label: "Right to left step",
              type: "object",
              list: true,
              ui: {
                itemProps: (item) => {
                  return {
                    label: item.label,
                  };
                },
                defaultItem: () => {
                  return {
                    title: "Step Title",
                    description: "Step Description",
                    icon: Object.keys(Icons)[0],
                  };
                },
              },
              fields: [
                {
                  name: "title",
                  label: "Title",
                  type: "string",
                  required: true,
                },
                {
                  name: "description",
                  label: "Description",
                  type: "string",
                  ui: {
                    component: "textarea",
                  },
                  required: true,
                },
                {
                  name: "icon",
                  label: "Icon",
                  type: "string",
                  options: Object.keys(Icons),
                  ui: {
                    component: IconPicker,
                  },
                  required: true,
                },
                {
                  name: "iconColor",
                  label: "Icon Color",
                  type: "string",
                  options: [
                    "red",
                    "blue",
                    "yellow",
                    "purple",
                    "green",
                    "orange",
                    "pink",
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
