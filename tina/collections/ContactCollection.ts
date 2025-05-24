import { Collection } from "tinacms";

export const ContactCollection: Collection = {
  label: "Contact",
  name: "contact",
  path: "content/contact",
  fields: [
    {
      type: "rich-text",
      name: "message",
      label: "Hero Message",
      description: "The main message for the contact page.",
    },
    {
      type: "rich-text",
      name: "heading",
      label: "Hero Heading",
      description: "The main heading message for the contact page.",
    },
    {
      type: "string",
      name: "phoneNumber",
      label: "Phone Number",
      required: true,
      description: "The phone number for contact.",
    },
    {
      type: "string",
      name: "address",
      label: "Address",
      description: "The address for contact.",
    },
    {
      type: "string",
      name: "email",
      label: "Email",
      required: true,
      description: "The email address for contact.",
    },
    {
      type: "image",
      name: "heroBackgroundImage",
      label: "Hero Background Image",
    },
  ],
};
