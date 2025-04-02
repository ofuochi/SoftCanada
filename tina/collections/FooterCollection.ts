import {Collection} from "tinacms";

export const FooterCollection: Collection = {
  name: "footer",
  label: "Footer",
  path: "content/footer",
  format: "md",
  ui: {
    router: () => "/"
  },
  fields: [
    {
      name: "logo",
      label: "Logo",
      type: "image",
    },
    {
      name: "sections",
      label: "Sections",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title || "New Section",
        }),
      },
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "type",
          label: "Section Type",
          type: "string",
          options: [
            {label: "Links", value: "links"},
            {label: "Socials", value: "socials"},
          ],
        },
        {
          name: "description",
          label: "Description",
          type: "string",
          ui: {component: "textarea"},
        },
        {
          name: "links",
          label: "Links",
          type: "object",
          list: true,
          ui: {
            defaultItem: () => ({
              label: "New Link",
              url: "https://example.com",
            }),
            itemProps: (item) => ({
              label: item?.label || "New Link",
            }),
          },
          fields: [
            {
              name: "label",
              label: "Label",
              type: "string",
            },
            {
              name: "url",
              label: "URL",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "socials",
      label: "Social Media Links",
      type: "object",
      list: true,
      ui: {
        defaultItem: () => ({
          icon: "/images/icons/instagram.svg",
          link: "https://instagram.com",
        }),
      },
      fields: [
        {
          name: "icon",
          label: "Icon",
          type: "image",
          required: true,
        },
        {
          name: "link",
          label: "Link",
          type: "string",
          required: true,
        },
      ],
    },
  ],
};
