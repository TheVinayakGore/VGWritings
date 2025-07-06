"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, Clock, Eye, Heart, Calendar } from "react-feather";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const blogs = [
  {
    id: 1,
    title: "Understanding React Server Components",
    description:
      "A deep dive into React Server Components and how they change the way we build web apps.",
    date: "2024-06-01",
    readTime: "8 min read",
    cover: "/trip/01.jpeg",
    slug: "understanding-react-server-components",
    views: 1245,
    likes: 89,
    comments: 23,
    tags: ["React", "Next.js", "Performance"],
  },
  {
    id: 2,
    title: "Next.js 14: What's New?",
    description:
      "Explore the latest features and improvements in Next.js 14 for modern web development.",
    date: "2024-05-20",
    readTime: "6 min read",
    cover: "/trip/02.jpeg",
    slug: "nextjs-14-whats-new",
    views: 982,
    likes: 76,
    comments: 18,
    tags: ["Next.js", "React", "Web Development"],
  },
  {
    id: 3,
    title: "Styling in Tailwind CSS",
    description:
      "Tips and tricks for efficient styling using Tailwind CSS in your projects.",
    date: "2024-05-10",
    readTime: "5 min read",
    cover: "/trip/03.jpeg",
    slug: "styling-in-tailwind-css",
    views: 756,
    likes: 64,
    comments: 12,
    tags: ["Tailwind", "CSS", "Design"],
  },
  {
    id: 4,
    title: "Deploying with Vercel: Best Practices",
    description:
      "How to deploy your Next.js apps seamlessly using Vercel and optimize for performance.",
    date: "2024-04-28",
    readTime: "7 min read",
    cover: "/trip/04.jpeg",
    slug: "deploying-with-vercel",
    views: 845,
    likes: 71,
    comments: 15,
    tags: ["Vercel", "Deployment", "DevOps"],
  },
  {
    id: 5,
    title: "TypeScript for Beginners",
    description:
      "A beginner's guide to using TypeScript in your React and Next.js projects.",
    date: "2024-04-15",
    readTime: "10 min read",
    cover: "/trip/05.jpeg",
    slug: "typescript-for-beginners",
    views: 1123,
    likes: 92,
    comments: 27,
    tags: ["TypeScript", "JavaScript", "Beginner"],
  },
];

export default function BlogsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearching(query.length > 0);

    if (query.length > 2) {
      const results = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query.toLowerCase()) ||
          blog.description.toLowerCase().includes(query.toLowerCase()) ||
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      );

      if (results.length === 0) {
        toast({
          title: "No Results Found",
          description: `No blogs found matching "${query}"`,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h1 className="logo text-4xl md:text-5xl font-bold pb-5">All Blogs</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the latest articles on web development, design, and modern
          technologies
        </p>
      </motion.div>

      {/* Search and Add Blog */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col md:flex-row items-center relative mb-12 max-w-3xl mx-auto w-full"
      >
        <div className="w-full">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 size-7 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search blogs by title, description or tags..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-16 py-8 xl:text-xl placeholder:text-xl rounded-full w-full"
          />
        </div>
        <Link href="/blogs/add" className="absolute right-0">
          <Button size="icon" className="p-8 hover:shadow-md rounded-full">
            <Plus className="size-7" />
          </Button>
        </Link>
      </motion.div>

      {/* Blog Grid */}
      {filteredBlogs.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              layout
            >
              <Link href={`/blogs/${blog.slug}`}>
                <Card className="h-full flex flex-col overflow-hidden pt-0 group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-video border-b overflow-hidden min-h-60">
                    <Image
                      src={blog.cover}
                      alt={blog.title}
                      width={2000}
                      height={2000}
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500 min-h-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs md:text-sm px-3">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2">
                      {blog.title}
                    </CardTitle>
                    <div className="flex flex-col items-start gap-2 mt-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <p className="line-clamp-3 opacity-60">
                      {blog.description.length > 100
                        ? blog.description + "..."
                        : blog.description}
                    </p>
                  </CardContent>

                  <CardFooter className="flex justify-between items-center border-t pt-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{blog.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{blog.likes}</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="mx-auto max-w-md">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">
              {isSearching ? "No blogs found" : "No blogs available"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {isSearching
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Check back later or create a new blog post."}
            </p>
            <Link href="/blogs/add">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create New Blog
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </main>
  );
}
