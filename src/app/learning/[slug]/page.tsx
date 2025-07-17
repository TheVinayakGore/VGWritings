"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Bookmark,
  Share2,
  Calendar,
  ArrowLeft,
  CheckCircle,
} from "react-feather";
import { client } from "@/sanity/lib/client";
import { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import TableOfContents, { TocItem } from "@/components/TableOfContents";
import NewsletterSignup from "@/components/NewsletterSignup";
import { motion } from "framer-motion";
import CodeBlock from "@/components/CodeBlock";
import "@/styles/prism-atom-dark.css";

type LearningPost = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  content: PortableTextBlock[];
  tags: string[];
  cover?: { asset: { url: string } };
  summary?: string;
  stats?: { likes?: number; views?: number };
  readingTime?: string;
};

export default function Page() {
  const { slug } = useParams();
  const { toast } = useToast();
  const [post, setPost] = useState<LearningPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [showFloatingActions, setShowFloatingActions] = useState(false);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchPost = async () => {
      const query = `*[_type == "learning" && slug.current == $slug][0]{
        _id, title, category, date, content, slug, tags, cover{asset->{url}}, summary, stats, readingTime
      }`;
      try {
        const result = await client.fetch(query, { slug });
        setPost(result);
        setLikes(result?.stats?.likes || 0);
      } catch (error) {
        toast({
          title: "Error fetching post",
          description: String(error),
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  useEffect(() => {
    // Extract headings from PortableText for TOC
    if (post?.content) {
      const headings: TocItem[] = [];
      post.content.forEach((block: PortableTextBlock) => {
        if (
          block._type === "block" &&
          block.style &&
          block.children &&
          ["h1", "h2", "h3", "h4", "h5", "h6"].includes(block.style)
        ) {
          headings.push({
            id: String(block._key),
            text: (block.children as { text: string }[])
              .map((c) => c.text)
              .join(" "),
            level: Number((block.style as string).replace("h", "")) || 1,
          });
        }
      });
      setTocItems(headings);
    }
  }, [post]);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingActions(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <div className="py-20 px-4 text-center">Loading...</div>;
  if (!post)
    return <div className="py-20 px-4 text-center">Post not found</div>;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    toast({
      title: liked ? "Removed like" : "Liked post",
      description: liked ? "You unliked this post" : "You liked this post!",
    });
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: bookmarked
        ? "You can find this later in your bookmarks"
        : "This post has been saved to your bookmarks",
    });
  };

  const portableTextComponents: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>
      ),
      normal: ({ children }) => (
        <p className="text-base leading-relaxed mb-4">{children}</p>
      ),
      code: ({ value }) => {
        const codeBlock = value as unknown as {
          code: string;
          language?: string;
        };
        const languageMap: Record<string, string> = {
          js: "javascript",
          ts: "typescript",
          sh: "bash",
          html: "markup",
          // add more as needed
        };
        const prismLanguage = codeBlock.language
          ? languageMap[codeBlock.language] || codeBlock.language
          : "javascript";
        return <CodeBlock language={prismLanguage}>{codeBlock.code}</CodeBlock>;
      },
    },
    marks: {
      link: ({ children, value }) => (
        <a
          href={value.href}
          className="text-primary underline hover:text-primary/80"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      // Add more mark renderers if needed
    },
    list: {
      bullet: ({ children }) => <ul className="pl-6 mb-4">{children}</ul>,
      number: ({ children }) => (
        <ol className="list-decimal pl-6 mb-4">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="mb-1 flex items-center gap-2">
          <CheckCircle className="size-4 text-green-500 inline-block" />
          <span>{children}</span>
        </li>
      ),
      number: ({ children }) => <li className="mb-1">{children}</li>,
    },
  };

  return (
    <>
      {/* ReadingProgressBar can be added here if desired */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center px-4 sm:px-10 lg:px-20 m-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 container justify-center m-auto gap-16 mt-3 w-full">
          {/* Table of Contents - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20 pb-5">
              <motion.div whileHover={{ x: -5 }} className="py-3">
                <Link href="/learning">
                  <Button className="p-7 text-sm md:text-base w-full">
                    <ArrowLeft className="size-5 mr-2" />
                    Back to blogs
                  </Button>
                </Link>
              </motion.div>
              <TableOfContents items={tocItems} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {/* Article Header */}
              <header className="mb-4 md:mb-10">
                <Badge
                  variant="outline"
                  className="flex md:inline-flex flex-wrap items-center justify-start md:gap-2 p-3 mb-3 md:mb-6 overflow-auto w-full md:w-auto"
                >
                  <span className="rounded-full text-base md:text-lg leading-none font-bold pr-2 md:px-3">
                    ► TAGS
                  </span>
                  {post.tags.map((item) => (
                    <Badge
                      key={item}
                      className="bg-primary text-xs md:text-sm p-1 px-3 md:px-4 rounded-full"
                    >
                      {item}
                    </Badge>
                  ))}
                </Badge>
                <h1 className="logo text-xl md:text-4xl lg:text-5xl tracking-wide mb-3">
                  {post.title}
                </h1>
                {post.summary && (
                  <p className="text-sm md:text-lg text-muted-foreground mb-3">
                    {post.summary}
                  </p>
                )}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  {post.readingTime && (
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="clock">
                        ⏱️
                      </span>
                      <span>{post.readingTime}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Heart className="size-4" />
                    <span>{likes} Likes</span>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              {post.cover?.asset?.url && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="rounded-md md:rounded-xl border overflow-hidden shadow-lg mb-8"
                >
                  <Image
                    src={post.cover.asset.url}
                    alt={post.title}
                    width={1200}
                    height={600}
                    className="w-full h-72 object-cover"
                    priority
                  />
                </motion.div>
              )}

              {/* Article Content */}
              <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80 prose-code:before:hidden prose-code:after:hidden prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm">
                <PortableText
                  value={post.content}
                  components={portableTextComponents}
                />
              </article>

              {/* Article Footer */}
              <footer className="mt-5 md:mt-16 border-y py-4 md:py-8">
                <div className="flex flex-row justify-center sm:justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant={liked ? "default" : "outline"}
                      size="sm"
                      onClick={handleLike}
                      className="flex items-center gap-2"
                    >
                      <Heart
                        className={`w-4 h-4 ${liked ? "fill-current" : ""}`}
                      />
                      <span>{likes} Likes</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => {
                        navigator.clipboard.writeText(currentUrl);
                        toast({ title: "Link copied!" });
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </Button>
                  </div>
                  <Button
                    variant={bookmarked ? "default" : "outline"}
                    size="sm"
                    onClick={handleBookmark}
                    className="flex items-center gap-2"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`}
                    />
                    <span>{bookmarked ? "Saved" : "Save"}</span>
                  </Button>
                </div>
              </footer>
            </motion.div>

            {/* Newsletter Signup */}
            <div className="my-5 md:my-10">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Action Buttons */}
      {showFloatingActions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg size-12"
            onClick={() => {
              navigator.clipboard.writeText(currentUrl);
              toast({ title: "Link copied!" });
            }}
          >
            <Share2 className="size-5" />
          </Button>
          <Button
            size="icon"
            className="rounded-full shadow-lg size-12"
            onClick={handleLike}
          >
            <Heart className={`size-5 ${liked ? "fill-current" : ""}`} />
          </Button>
        </motion.div>
      )}
    </>
  );
}
