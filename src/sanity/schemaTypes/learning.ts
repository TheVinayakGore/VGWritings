import { defineField, defineType } from "sanity";

export default defineType({
  name: "learning",
  title: "Learning",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({ name: "date", title: "Date", type: "datetime" }),
    defineField({ name: "readingTime", title: "Reading Time", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "object",
      fields: [
        { name: "likes", title: "Likes", type: "number", initialValue: 0 },
        { name: "views", title: "Views", type: "number", initialValue: 0 },
      ],
    }),
    defineField({
      name: "keyMomentsData",
      title: "Key Moments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 5,
    }),
  ],
});
