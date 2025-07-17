import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),
    defineField({
      name: "features",
      title: "Features List",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "primaryButtonLink",
      title: "Primary Button Link",
      type: "string",
      initialValue: "/blog",
    }),
    defineField({
      name: "secondaryButtonLink",
      title: "Secondary Button Link",
      type: "string",
      initialValue: "#contact",
    }),
  ],
});
