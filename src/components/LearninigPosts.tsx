"use client";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

const learninigPosts = [
  {
    id: 1,
    title: "The Art of Creative Writing",
    description:
      "Explore techniques to enhance your creative writing skills and captivate your readers.",
    category: "Writing",
    date: "May 15, 2023",
  },
  {
    id: 2,
    title: "Modern Web Development Trends",
    description:
      "Discover the latest trends shaping the future of web development in 2023.",
    category: "Technology",
    date: "June 2, 2023",
  },
  {
    id: 3,
    title: "Mindfulness and Productivity",
    description:
      "How practicing mindfulness can significantly boost your productivity and focus.",
    category: "Lifestyle",
    date: "April 28, 2023",
  },
  {
    id: 4,
    title: "Building a Personal Brand Online",
    description:
      "Tips and strategies to establish and grow your personal brand in the digital world.",
    category: "Personal Growth",
    date: "July 10, 2023",
  },
  {
    id: 5,
    title: "Effective Time Management for Creators",
    description:
      "Master the art of time management to balance creativity and productivity.",
    category: "Productivity",
    date: "August 5, 2023",
  },
  {
    id: 6,
    title: "Travel Diaries: Exploring the Himalayas",
    description:
      "A personal account of adventures and lessons learned while trekking in the Himalayas.",
    category: "Travel",
    date: "September 12, 2023",
  },
  {
    id: 7,
    title: "The Science of Habit Formation",
    description:
      "Understand how habits are formed and how to build positive routines for success.",
    category: "Self-Improvement",
    date: "October 1, 2023",
  },
  {
    id: 8,
    title: "AI in Everyday Life: Opportunities & Challenges",
    description:
      "Explore how artificial intelligence is transforming daily life and what the future holds.",
    category: "Technology",
    date: "November 18, 2023",
  },
];

export default function LearninigPosts() {
  return (
    <section
      id="featured"
      className="py-20 md:py-40 px-4 bg-gradient-to-tr from-primary/10"
    >
      <div className="container m-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="logo text-4xl md:text-6xl font-bold mb-5">
            Learninig Posts
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Discover our most popular and recently published articles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learninigPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full flex flex-col transition-shadow hover:shadow-lg">
                <CardHeader>
                  <span className="text-sm text-primary font-medium">
                    {post.category}
                  </span>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>{post.date}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/80 mb-4">{post.description}</p>
                </CardContent>
                <div className="px-6 pb-6">
                  <Button asChild variant="outline">
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg">
            <Link href="/blog">View All Posts</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
