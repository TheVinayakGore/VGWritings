"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "react-feather";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

const blogs = [
  {
    id: 1,
    title: "Understanding React Server Components",
    description:
      "A deep dive into React Server Components and how they change the way we build web apps.",
    date: "2024-06-01",
    cover: "/card.png",
    slug: "understanding-react-server-components",
  },
  {
    id: 2,
    title: "Next.js 14: What's New?",
    description:
      "Explore the latest features and improvements in Next.js 14 for modern web development.",
    date: "2024-05-20",
    cover: "/card.png",
    slug: "nextjs-14-whats-new",
  },
  {
    id: 3,
    title: "Styling in Tailwind CSS",
    description:
      "Tips and tricks for efficient styling using Tailwind CSS in your projects.",
    date: "2024-05-10",
    cover: "/card.png",
    slug: "styling-in-tailwind-css",
  },
  {
    id: 4,
    title: "Deploying with Vercel: Best Practices",
    description:
      "How to deploy your Next.js apps seamlessly using Vercel and optimize for performance.",
    date: "2024-04-28",
    cover: "/card.png",
    slug: "deploying-with-vercel",
  },
  {
    id: 5,
    title: "TypeScript for Beginners",
    description:
      "A beginner's guide to using TypeScript in your React and Next.js projects.",
    date: "2024-04-15",
    cover: "/card.png",
    slug: "typescript-for-beginners",
  },
  {
    id: 6,
    title: "Building Accessible Web Apps",
    description:
      "Learn the fundamentals of web accessibility and how to implement them in your projects.",
    date: "2024-03-30",
    cover: "/card.png",
    slug: "building-accessible-web-apps",
  },
  {
    id: 7,
    title: "Optimizing Images in Next.js",
    description:
      "Best practices for optimizing and serving images efficiently in Next.js.",
    date: "2024-03-10",
    cover: "/card.png",
    slug: "optimizing-images-in-nextjs",
  },
  {
    id: 8,
    title: "Dark Mode in React Apps",
    description:
      "How to implement and manage dark mode in your React and Next.js applications.",
    date: "2024-02-25",
    cover: "/card.png",
    slug: "dark-mode-in-react-apps",
  },
];

export default function BlogsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Show toast for search results
    if (query.length > 2) {
      const results = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query.toLowerCase()) ||
          blog.description.toLowerCase().includes(query.toLowerCase())
      );

      if (results.length === 0) {
        toast({
          title: "No Results Found",
          description: `No blogs found matching "${query}"`,
          variant: "destructive",
        });
      } else if (results.length === 1) {
        toast({
          title: "1 Result Found",
          description: `Found 1 blog matching "${query}"`,
        });
      } else {
        toast({
          title: `${results.length} Results Found`,
          description: `Found ${results.length} blogs matching "${query}"`,
        });
      }
    }
  };

  return (
    <div className="container mx-auto py-20 m-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Latest Blogs</h1>
        <Link href="/blogs/add">
          <Button
            onClick={() => {
              toast({
                title: "Creating New Blog",
                description: "Opening blog editor...",
              });
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Blog
          </Button>
        </Link>
      </div>
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="max-w-md mx-auto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.slug}`}>
            <Card className="hover:scale-105 transition-all duration-300 cursor-pointer pt-0">
              <Image
                src={blog.cover}
                alt={blog.title}
                width={2000}
                height={2000}
                className="w-full h-auto object-cover rounded-t-xl"
              />
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>{blog.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {blog.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
