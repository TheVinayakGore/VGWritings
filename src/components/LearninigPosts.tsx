"use client";
import React, { useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import { client } from "@/sanity/lib/client";
import { PortableTextBlock } from "@portabletext/types";
import { format } from "date-fns";

type LearningPost = {
  _id: string;
  title: string;
  category: string;
  date: string;
  content: PortableTextBlock[];
  slug: {
    current: string; // Ensure slug has a current property
  };
  tags: string[];
};

export default function LearningPosts() {
  const [learning, setLearning] = useState<LearningPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearning = async () => {
      const query = `*[_type == "learning"]{
        _id,
        title,
        category,
        date,
        content,
        slug,
        tags[],
      }`;
      try {
        const result = await client.fetch(query);
        setLearning(result);
      } catch (error) {
        toast.error("Error fetching learning content: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchLearning();
  }, []);

  if (loading) {
    return <div className="py-20 px-4 text-center">Loading...</div>;
  }

  if (!learning || learning.length === 0) {
    return (
      <div className="py-20 px-4 text-center">No Learning content found</div>
    );
  }

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
            Learning Posts
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Discover our most popular and recently published articles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learning.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full flex flex-col transition-shadow hover:shadow-lg">
                <CardHeader>
                  <span className="text-sm text-primary font-medium">
                    {item.category}
                  </span>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>
                    {" "}
                    {item.date
                      ? format(new Date(item.date), "MMM dd, yyyy")
                      : "No Date"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {item.content
                    .filter(
                      (block: PortableTextBlock) =>
                        block._type === "block" && block.style === "normal"
                    )
                    .map((block: PortableTextBlock) =>
                      (block.children as { text: string }[])
                        .map((c) => c.text)
                        .join(" ")
                    )
                    .join(" ")
                    .slice(0, 100)}...
                </CardContent>
                <div className="px-6 pb-6">
                  <Button asChild variant="outline">
                    <Link
                      href={`/learning/${item.slug.current}`}
                      target="_blank"
                    >
                      Read More
                    </Link>
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
