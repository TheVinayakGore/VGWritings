import { defineField, defineType } from "sanity";

export const blogEngagement = defineType({
  name: "generalEngagement",
  title: "General Engagement",
  type: "document",
  fields: [
    defineField({
      name: "general",
      title: "General Blogs",
      type: "reference",
      to: [{ type: "blogs" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "likes",
      title: "Like Count",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "stars",
      title: "Star Count",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "likedBy",
      title: "Liked By",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [],
    }),
    defineField({
      name: "starredBy",
      title: "Starred By",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [],
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "blog.title",
      likes: "likes",
      stars: "stars",
    },
    prepare(selection) {
      const { title, likes, stars } = selection;
      return {
        title: title || "Untitled",
        subtitle: `Likes: ${likes} | Stars: ${stars}`,
      };
    },
  },
});
