"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { format } from "date-fns";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiClock } from "react-icons/fi";
import { FaRegCommentAlt } from "react-icons/fa";
import { SlShare } from "react-icons/sl";
import LoadingSpinner from "@/components/LoadingSpinner";
import LoadingBar from "@/components/LoadingBar";
import { toast } from "sonner";
import { PortableTextBlock } from "@portabletext/types";
import type { PortableTextMarkComponentProps } from "@portabletext/react";
import type {
  PortableTextBlockComponent,
  PortableTextListComponent,
} from "@portabletext/react";
import { MdDone } from "react-icons/md";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { GoPaste } from "react-icons/go";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "react-feather";
import { motion } from "framer-motion";
import { BiSolidQuoteLeft } from "react-icons/bi";

// CommentModal component
const CommentModal = ({
  closeModal,
  onSubmit,
}: {
  closeModal: () => void;
  onSubmit: (comment: { username: string; message: string }) => void;
}) => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add a Comment</h2>
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          className="w-full mb-3 p-2 border rounded"
          placeholder="Your comment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (username && message) {
                onSubmit({ username, message });
              }
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

// ShareDialog component
const ShareDialog = ({
  isOpen,
  onClose,
  shareUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <SlShare /> Share this blog
        </h2>
        <div className="flex items-center gap-2 mb-4">
          <input
            className="w-full p-2 border rounded"
            value={shareUrl}
            readOnly
          />
          <Button onClick={handleCopy}>Copy</Button>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

interface GeneralPost {
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
  [key: string]: unknown;
}

interface Comment {
  username: string;
  message: string;
  date: string;
}

const GeneralBlogPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<GeneralPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  // Fetch blog post
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "general" && slug.current == $slug][0]`;
        const result = await client.fetch(query, { slug });
        if (!result) {
          setError("Blog not found");
        } else {
          setBlog(result);
        }
      } catch {
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  // LocalStorage engagement demo
  useEffect(() => {
    if (!blog) return;
    // Load comments from localStorage for demo
    const stored = localStorage.getItem(`general-comments-${blog._id}`);
    setComments(stored ? JSON.parse(stored) : []);
  }, [blog]);

  // Comment handler
  const handleCommentSubmit = (newComment: {
    username: string;
    message: string;
  }) => {
    if (!blog) return;
    const comment: Comment = {
      ...newComment,
      date: new Date().toISOString(),
    };
    const updated = [comment, ...comments];
    setComments(updated);
    localStorage.setItem(
      `general-comments-${blog._id}`,
      JSON.stringify(updated)
    );
    setModalOpen(false);
    toast.success("Comment submitted!");
  };

  const CodeBlock = ({
    value,
  }: {
    value: { language: string; code: string };
  }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(value.code);
      setIsCopied(true);
      toast.success("Copied Successfully!");
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    };

    return (
      <div className="p-2 border rounded-lg bg-primary/5 hover:shadow-lg transition-all hover:scale-105 duration-300 w-full">
        <div className="flex items-center justify-between bg-zinc-900 border-b border-muted-foreground/30 rounded-t-lg text-base px-4 py-1.5 md:py-2 font-medium">
          <div className="flex items-center gap-1">
            <span className="bg-red-500 rounded-full w-2 md:w-3 h-2 md:h-3"></span>
            <span className="bg-yellow-500 rounded-full w-2 md:w-3 h-2 md:h-3"></span>
            <span className="bg-green-500 rounded-full w-2 md:w-3 h-2 md:h-3"></span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center text-xs md:text-sm cursor-pointer font-light gap-1 md:gap-2 pb-0.5 md:pb-1 ${
              isCopied ? "text-green-500" : "text-white"
            }`}
          >
            <span>{isCopied ? <MdDone /> : <GoPaste />}</span>
            <span>{isCopied ? "Copied !" : "Copy"}</span>
          </button>
        </div>
        <SyntaxHighlighter
          language={value.language || "javascript"}
          style={atomOneDark}
          customStyle={{
            padding: "1.2rem 1.8rem",
            borderRadius: "0 0 0.5rem 0.5rem",
          }}
          wrapLongLines={true}
          className="text-xs md:text-sm font-light"
        >
          {value.code}
        </SyntaxHighlighter>
      </div>
    );
  };

  // PortableText components
  const components = {
    types: {
      image: ({
        value,
      }: {
        value: { asset: { _ref: string }; attribution?: string };
      }) => (
        <Image
          src={urlFor(value.asset).url()}
          alt={value.attribution || "Blog image"}
          width={5000}
          height={5000}
          priority
          className="border rounded-lg my-2 w-full h-full"
        />
      ),
      code: CodeBlock,
    },
    block: {
      h1: (({ children, value }) => (
        <h1
          id={value._key}
          className="text-xl md:text-3xl font-light md:font-medium my-2"
        >
          {children}
        </h1>
      )) as PortableTextBlockComponent,
      h2: (({ children, value }) => (
        <h2
          id={value._key}
          className="text-lg md:text-2xl font-light md:font-medium my-2"
        >
          {children}
        </h2>
      )) as PortableTextBlockComponent,
      h3: (({ children, value }) => (
        <h3
          id={value._key}
          className="text-base md:text-xl font-light md:font-medium my-2"
        >
          {children}
        </h3>
      )) as PortableTextBlockComponent,
      h4: (({ children, value }) => (
        <h4
          id={value._key}
          className="text-sm md:text-lg font-light md:font-medium my-2"
        >
          {children}
        </h4>
      )) as PortableTextBlockComponent,
      h5: (({ children, value }) => (
        <h5
          id={value._key}
          className="text-xs md:text-base font-light text-white py-1 rounded md:rounded-md bg-yellow-500/[0.3] whitespace-nowrap overflow-x-auto opacity-50 w-full"
        >
          <span className="sticky left-0 z-20 p-1 md:py-2 px-1.5 md:px-3 rounded md:rounded-md rounded-r-none bg-gradient-to-r from-yellow-500 to-yellow-400">
            ✦
          </span>
          <span className="p-2">{children}</span>
        </h5>
      )) as PortableTextBlockComponent,
      normal: (({ children }) => (
        <p className="text-xs md:text-base leading-relaxed mb-2">{children}</p>
      )) as PortableTextBlockComponent,
      hr: () => <hr className="my-5 md:my-10 border-t" />,
    },
    list: {
      bullet: (({ children }) => (
        <ul className="list-disc text-xs leading-5 md:leading-7 md:text-base my-2 py-3 px-6 md:px-7 rounded-lg">
          {children}
        </ul>
      )) as PortableTextListComponent,
      number: (({ children }) => (
        <ol className="list-decimal pl-5 text-xs leading-5 md:leading-7 md:text-base my-2">
          {children}
        </ol>
      )) as PortableTextListComponent,
    },
    marks: {
      link: (
        props: PortableTextMarkComponentProps<{ _type: string; href?: string }>
      ) => {
        const { children, value } = props;
        const href = value?.href || "";
        const target = href.startsWith("http") ? "_blank" : undefined;
        return (
          <Link
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className="text-blue-600 hover:text-green-500"
          >
            {children}
          </Link>
        );
      },
    },
  };

  const tocItems = useMemo(() => {
    if (!blog?.content) return [];
    return blog.content
      .filter(
        (block: PortableTextBlock) =>
          block._type === "block" &&
          ["h1", "h2", "h3", "h4", "h5"].includes(block.style as string) &&
          block.children &&
          block.children.length > 0
      )
      .map((block: PortableTextBlock) => ({
        id: block._key ?? "",
        text: (block.children as { text: string }[])
          .map((c) => c.text)
          .join(" "),
        level: Number((block.style as string).replace("h", "")),
      }))
      .filter((item) => item.id); // filter out items with empty id
  }, [blog?.content]);

  const TableOfContents = ({
    items,
  }: {
    items: { id: string; text: string; level: number }[];
  }) => (
    <Card className="gap-2 w-full">
      <CardHeader className="">
        <div className="flex items-center gap-2">
          <span className="text-lg">▶</span>
          <span className="text-2xl font-bold">Table of Contents</span>
        </div>
      </CardHeader>
      <CardContent>
        <hr className="pb-3 border-neutral-200 dark:border-neutral-700" />
        <ul className="flex flex-col gap-3 w-full">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-2 text-muted-foreground hover:text-blue-500 break-words pl-0 text-sm font-medium transition-all duration-300"
            >
              <BiSolidQuoteLeft className="size-4" />
              <Link
                href={`#${item.id}`}
                className="hover:underline underline-offset-4 transition-all duration-1000"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <>
        <LoadingBar loading={loading} />
        <LoadingSpinner />
      </>
    );
  }

  if (error) {
    toast.error("Error : " + error);
    return <p>Blog not found</p>;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <>
      <title>{`General Blog | ${blog.title}`}</title>
      <main className="lg:container relative mx-auto flex flex-col lg:flex-row p-4 gap-10 min-h-screen w-full">
        {/* Main Content */}
        <article className="flex-1">
          {/* Cover Image and Title */}
          {blog.coverImage && (
            <div className="w-full h-[25rem] relative rounded-lg overflow-hidden mb-8">
              <Image
                src={urlFor(blog.coverImage.asset).url()}
                alt={blog.coverImage.attribution || blog.title}
                width={5000}
                height={5000}
                priority
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
            {blog.title}
          </h1>
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <span className="inline-flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-xs text-neutral-600 dark:text-neutral-300">
              <FiClock className="w-4 h-4" />
              {blog.estimatedReadingTime} min read
            </span>
            <span className="inline-flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-xs text-neutral-600 dark:text-neutral-300">
              <FaRegCommentAlt className="w-4 h-4" />
              {comments.length} comments
            </span>
            <span className="inline-flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-xs text-neutral-600 dark:text-neutral-300">
              {format(new Date(blog.date!), "MMM dd, yyyy")}
            </span>
            {blog.category && (
              <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-semibold">
                {blog.category}
              </span>
            )}
          </div>
          <p className="text-lg mb-8">{blog.desc}</p>
          {/* Article Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-10">
            <PortableText value={blog.content ?? []} components={components} />
          </div>
          {/* Comments Section */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            {comments.length > 0 ? (
              comments.map((comment, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-4"
                >
                  <Image
                    src="/user.png"
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <div>
                    <div className="font-medium text-blue-700 dark:text-blue-300">
                      {comment.username}
                    </div>
                    <div className="text-xs text-neutral-400 mb-1">
                      {format(
                        new Date(comment.date),
                        "dd-MM-yyyy | hh:mm:ss a"
                      )}
                    </div>
                    <div className="text-neutral-700 dark:text-neutral-300">
                      {comment.message}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-neutral-400">
                No comments yet, be the first to comment!
              </p>
            )}
          </section>
        </article>

        {/* Sidebar */}
        <aside className="sticky top-0 right-0 flex flex-col items-start gap-4 w-full lg:w-1/3 flex-shrink-0 lg:max-h-screen">
          {/* Table of Contents - Desktop */}
          <motion.div whileHover={{ x: -5 }} className="w-full">
            <Link href="/blogs">
              <Button className="p-7 text-sm md:text-base w-full">
                <ArrowLeft className="size-5 mr-2" />
                Back to blogs
              </Button>
            </Link>
          </motion.div>
          <TableOfContents items={tocItems} />
          {/* Author Card */}
          <Card className="w-full">
            <CardHeader className="">
              <div className="flex items-center gap-4">
                <Image
                  src="/user.png"
                  alt="Author"
                  width={200}
                  height={200}
                  className="rounded-md size-10"
                />
                <div>
                  <div className="font-semibold">Author Name</div>
                  <div className="text-xs text-muted-foreground">
                    Published {format(new Date(blog.date!), "MMM dd, yyyy")}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Short author bio goes here.
            </CardContent>
          </Card>
          {/* Newsletter Signup */}
          <Card className="w-full">
            <CardHeader>
              <h3 className="font-semibold">Weekly newsletter</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Get the latest posts delivered right to your inbox.
              </p>
              <form>
                <Input
                  type="email"
                  placeholder="Your email"
                  className="my-4 p-5"
                />
                <Button className="w-full">Subscribe</Button>
              </form>
            </CardContent>
          </Card>
        </aside>
      </main>

      {/* Modals */}
      {isModalOpen && (
        <CommentModal
          closeModal={() => setModalOpen(false)}
          onSubmit={handleCommentSubmit}
        />
      )}
      <ShareDialog
        isOpen={isShareModalOpen}
        onClose={() => setShareModalOpen(false)}
        shareUrl={typeof window !== "undefined" ? window.location.href : ""}
      />
    </>
  );
};

export default GeneralBlogPage;
