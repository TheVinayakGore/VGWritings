import { defineType, defineField } from "sanity";

export const learningEngagement = defineType({
  name: "learningEngagement",
  title: "Learning Engagement",
  type: "document",
  fields: [
    defineField({
      name: "learning",
      title: "Learning Post",
      type: "reference",
      to: [{ type: "learning" }],
    }),
    defineField({
      name: "likes",
      title: "Likes",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "stars",
      title: "Stars",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "likedBy",
      title: "Liked By",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "starredBy",
      title: "Starred By",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
    }),
  ],
});

export const learningComments = defineType({
  name: "learningComments",
  title: "Learning Comments",
  type: "document",
  fields: [
    defineField({
      name: "learning",
      title: "Learning Post",
      type: "reference",
      to: [{ type: "learning" }],
    }),
    defineField({
      name: "username",
      title: "Username",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
