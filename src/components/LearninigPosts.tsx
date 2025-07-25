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
import { client } from "@/sanity/lib/client";
import { toast } from "sonner";

// Define the type for a learning post based on the schema
interface LearningPost {
  _id: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  slug: { current: string };
  tags: string[];
  summary: string;
}

export default function LearninigPosts() {
  const [posts, setPosts] = useState<LearningPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await client.fetch(
          `*[_type == "learning"]{
            _id,
            title,
            category,
            date,
            readingTime,
            slug,
            tags,
            summary
          } | order(date desc)`
        );
        setPosts(data);
      } catch {
        setPosts([]);
        toast("Failed to fetch learning posts", {
          description:
            "There was an error fetching learning posts. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section
      id="learning"
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
          {loading ? (
            <div>Loading posts...</div>
          ) : posts.length === 0 ? (
            <div>No learning posts found.</div>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full flex flex-col transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <span className="text-sm text-primary font-medium">
                      {post.category}
                    </span>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription>
                      {new Date(post.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {post.summary}
                  </CardContent>
                  <div className="px-6 pb-6">
                    <Button asChild variant="outline">
                      <Link href={"/learning/" + post.slug.current}>
                        Read More
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg">
            <Link href="/blogs">View All Posts</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
