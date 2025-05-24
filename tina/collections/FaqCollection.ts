import { Collection } from "tinacms";

export const FaqCollection: Collection = {
  name: "faq",
  label: "FAQs",
  path: "content/faqs",
  format: "md",
  ui: {
    router: (props) => {
      return `/faqs`;
    },
  },
  fields: [
    {
      type: "string",
      name: "pageTitle", // Added for clarity in Tina UI if listing multiple FAQ docs (though we'll have one)
      label: "Page Title",
      isTitle: true,
      required: true,
    },
    // Hero Section Fields
    {
      type: "string",
      name: "heroTitle",
      label: "Hero Title",
      required: true,
    },
    {
      type: "string",
      name: "heroSubtitle",
      label: "Hero Subtitle",
    },
    {
      type: "image",
      name: "heroBackgroundImage",
      label: "Hero Background Image",
    },
    // Intro section for FAQ list
    {
      type: "string",
      name: "introTitle",
      label: "FAQ Intro Title (e.g., 'In case you were wondering')",
    },
    {
      type: "string",
      name: "introSubtitle",
      label: "FAQ Intro Subtitle (e.g., 'Here are some of the most common things people ask')",
    },
    // FAQ Items
    // Option 1: Simple list of FAQs (removing categories for simplicity as per original page structure)
    {
      type: "object",
      name: "faqs",
      label: "FAQ Items",
      list: true,
      fields: [
        {
          type: "string",
          name: "question",
          label: "Question",
          required: true,
        },
        {
          type: "rich-text",
          name: "answer",
          label: "Answer",
          required: true,
        },
      ],
      ui: {
        itemProps: (item) => {
          return { label: item.question || "New FAQ Item" };
        },
      },
    },
    // Contact Section Fields (for the "Still have questions?" part)
    {
      type: "string",
      name: "contactSectionTitle",
      label: "Contact Section Title",
    },
    {
      type: "rich-text",
      name: "contactSectionText",
      label: "Contact Section Text",
    },
    {
      type: "string",
      name: "contactSectionButtonText",
      label: "Contact Section Button Text",
    },
    {
      type: "string",
      name: "contactSectionButtonLink",
      label: "Contact Section Button Link",
    },
  ],
};
