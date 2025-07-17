import { defineField, defineType } from "sanity";

export default defineType({
  name: "general",
  title: "General Blogs",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
    }),
    defineField({
      title: "Short Description",
      name: "desc",
      type: "string",
    }),
    defineField({
      title: "Cover Image",
      name: "coverImage",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      title: "Estimated Reading Time (minutes)",
      name: "estimatedReadingTime",
      type: "number",
      description: "Estimated reading time in minutes.",
    }),
    defineField({
      title: "Comments Count",
      name: "commentsCount",
      type: "number",
      description: "Number of comments on the blog post.",
    }),
    defineField({
      title: "Category",
      name: "category",
      type: "string",
      description: "Category of the blog post.",
    }),
    defineField({
      title: "Content",
      name: "content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Heading 5", value: "h5" },
            { title: "Divider", value: "hr" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
            { title: "Square", value: "square" },
            { title: "Circle", value: "circle" },
            { title: "Alphabet", value: "alpha" },
            { title: "Roman", value: "roman" },
          ],
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
        {
          title: "Code Block",
          type: "code",
          options: {
            language: "javascript",
            theme: "atomOneDark",
          },
        },
      ],
    }),
  ],
});
