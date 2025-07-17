"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { format } from "date-fns";
import { toast } from "sonner";
import { PortableTextBlock } from "@portabletext/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiCalendar, FiClock, FiArrowRight, FiSearch } from "react-icons/fi";
import { FaRegCommentAlt } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "./Card"; // <-- your local Card component

interface GeneralPosts {
  _id: string;
  title: string;
  desc: string;
  slug: { current: string };
  content?: PortableTextBlock[];
  date?: string;
  coverImage?: {
    asset: { _ref: string };
    attribution?: string;
  };
  estimatedReadingTime?: number;
  commentsCount?: number;
  category?: string;
}

const GENERAL_QUERY = defineQuery(`*[
  _type == "general"
  && defined(slug.current)
]{_id, title, desc, slug, content, date, coverImage, estimatedReadingTime, commentsCount, category}|order(_createdAt desc)`);

const General: React.FC = () => {
  const [general, setGeneral] = useState<GeneralPosts[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await client.fetch(GENERAL_QUERY);
        setGeneral(
          fetchedBlogs.sort((a: GeneralPosts, b: GeneralPosts) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
          })
        );
      } catch (error) {
        toast.error("Error fetching General blogs : " + error);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = general.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <main className="container flex flex-col items-center px-4 py-24 m-auto w-full min-h-screen">
        {/* Search Bar */}
        <div className="w-full mb-10 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <FiSearch className="size-6" />
          </span>
          <Input
            type="text"
            placeholder="Search blogs by name..."
            className="w-full pl-12 py-6 !text-lg rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 w-full">
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">General Blogs</span>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full">
          <AnimatePresence>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, idx) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Card className="flex flex-col h-full transition-shadow hover:shadow-lg group">
                    {blog.coverImage && (
                      <div className="w-full h-96 relative overflow-hidden">
                        <Image
                          src={urlFor(blog.coverImage.asset).url()}
                          alt={blog.coverImage.attribution || "Cover image"}
                          width={2000}
                          height={2000}
                          priority
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                        {blog.category && (
                          <span className="absolute top-4 left-4 bg-muted text-xs font-medium px-3 py-1 rounded-full border border-border text-muted-foreground">
                            {blog.category}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2 flex-wrap">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          {blog.date
                            ? format(new Date(blog.date), "MMM dd, yyyy")
                            : "No Date"}
                        </span>
                        {blog.estimatedReadingTime !== undefined &&
                          blog.estimatedReadingTime !== null && (
                            <span className="flex items-center gap-1">
                              <FiClock className="w-4 h-4" />
                              {blog.estimatedReadingTime} min read
                            </span>
                          )}
                        {blog.commentsCount !== undefined &&
                          blog.commentsCount !== null && (
                            <span className="flex items-center gap-1">
                              <FaRegCommentAlt className="w-4 h-4" />
                              {blog.commentsCount}
                            </span>
                          )}
                      </div>
                      <h2 className="text-xl font-bold mb-1">{blog.title}</h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {blog.desc}
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        className="w-fit mt-auto"
                      >
                        <Link href={`/general/${blog.slug.current}`}>
                          Read more
                          <FiArrowRight className="ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="col-span-full text-center text-lg font-light text-muted-foreground py-16"
              >
                No blog posts found. Check back later!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};

export default General;
