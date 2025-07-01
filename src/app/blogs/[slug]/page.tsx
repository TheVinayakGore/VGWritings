"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Clock,
  User,
} from "react-feather";
import CodeBlock from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import ShareDialog from "@/components/ShareDialog";

// Mock blog data - in a real app, this would come from a database
const blogData = {
  "understanding-react-server-components": {
    id: 1,
    title: "Understanding React Server Components",
    description:
      "A deep dive into React Server Components and how they change the way we build web apps.",
    date: "2024-06-01",
    readTime: "8 min read",
    cover: "/card.png",
    author: {
      name: "Sarah Johnson",
      avatar: "/avatar1.jpg",
      bio: "Senior React Developer at TechCorp",
    },
    stats: {
      likes: 124,
      comments: 28,
      shares: 45,
    },
    tags: ["React", "Next.js", "Performance"],
    content: `
# Understanding React Server Components

React Server Components (RSC) represent a paradigm shift in how we build React applications. They allow us to render components on the server and send the result to the client, reducing the JavaScript bundle size and improving performance.

## What are Server Components?

Server Components are React components that run exclusively on the server. They can:

- Access backend resources directly
- Keep sensitive data on the server
- Reduce client-side JavaScript
- Improve initial page load performance

## Key Benefits

1. **Reduced Bundle Size**: Server components don't ship JavaScript to the client
2. **Better Performance**: Faster initial page loads
3. **Enhanced Security**: Sensitive data stays on the server
4. **Improved SEO**: Better server-side rendering

## Example Implementation

Here's a simple example of a server component:

\`\`\`jsx
// ServerComponent.jsx
async function ServerComponent() {
  const data = await fetchDataFromDatabase();
  
  return (
    <div>
      <h2>Server Data</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

## Client vs Server Components

| Feature | Client Component | Server Component |
|---------|------------------|------------------|
| JavaScript | Sent to client | Stays on server |
| Interactivity | Full | Limited |
| Data fetching | Client-side | Server-side |
| Bundle size | Larger | Smaller |

## Best Practices

1. **Use Server Components by default**
2. **Add "use client" only when needed**
3. **Keep interactive parts as client components**
4. **Leverage server-side data fetching**

## Conclusion

React Server Components offer a powerful way to build more efficient React applications. By understanding when and how to use them, you can create faster, more secure web applications.

For more information, check out the [official React documentation](https://react.dev).
    `,
  },
  "nextjs-14-whats-new": {
    id: 2,
    title: "Next.js 14: What's New?",
    description:
      "Explore the latest features and improvements in Next.js 14 for modern web development.",
    date: "2024-05-20",
    readTime: "6 min read",
    cover: "/card.png",
    author: {
      name: "Michael Chen",
      avatar: "/avatar2.jpg",
      bio: "Next.js Expert and Technical Writer",
    },
    stats: {
      likes: 89,
      comments: 15,
      shares: 32,
    },
    tags: ["Next.js", "React", "Web Development"],
    content: `
# Next.js 14: What's New?

Next.js 14 brings significant improvements to performance, developer experience, and the overall React ecosystem. Let's explore the key features and changes.

## Major Features

### 1. Improved Performance

Next.js 14 introduces several performance optimizations:

- **Faster builds** with Turbopack
- **Enhanced caching** strategies
- **Better tree shaking** for smaller bundles

### 2. Enhanced Developer Experience

The development experience has been significantly improved:

\`\`\`bash
# Install Next.js 14
npm install next@14 react@18 react-dom@18
\`\`\`

### 3. New App Router Features

The App Router now supports:

- **Partial Prerendering** (Preview)
- **Improved Server Actions**
- **Better error handling**

## Code Examples

Here's how to use some new features:

\`\`\`jsx
// app/page.jsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Welcome to Next.js 14</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
\`\`\`

## Migration Guide

To migrate from Next.js 13:

1. Update dependencies
2. Review breaking changes
3. Test thoroughly
4. Deploy gradually

## Conclusion

Next.js 14 represents a significant step forward in the React ecosystem, offering better performance and developer experience.
    `,
  },
};

export default function BlogPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [showFloatingShare, setShowFloatingShare] = useState(false);

  const blog = blogData[slug as keyof typeof blogData];

  useEffect(() => {
    if (blog) {
      setLikes(blog.stats.likes);
    }
  }, [blog]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFloatingShare(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!blog) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto py-20"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
          <Link href="/blogs" className="text-primary hover:underline">
            Back to blogs
          </Link>
        </div>
      </motion.div>
    );
  }

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
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

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto py-10 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div whileHover={{ x: -5 }}>
          <Link
            href="/blogs"
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to blogs
          </Link>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="overflow-hidden"
        >
          {/* Cover Image */}
          <div className="relative h-auto w-full">
            <Image
              src={blog.cover}
              alt={blog.title}
              width={2000}
              height={2000}
              className="h-auto rounded-xl"
              priority
            />
          </div>

          {/* Header Section */}
          <div className="pt-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </div>
              <span>•</span>
              <span>{blog.date}</span>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Content Section */}
          <div className="px-6">
            <div className="flex items-center gap-4 mb-8">
              <Avatar>
                <AvatarImage src={blog.author.avatar} />
                <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{blog.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {blog.author.bio}
                </p>
              </div>
            </div>

            <BlogContent content={blog.content} />
          </div>

          {/* Footer Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border rounded-2xl">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center gap-2 ${
                  liked ? "text-red-500" : ""
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                <span>{likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{blog.stats.comments}</span>
              </Button>

              <ShareDialog
                title={blog.title}
                description={blog.description}
                url={currentUrl}
                trigger={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{blog.stats.shares}</span>
                  </Button>
                }
              />
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`flex items-center gap-2 ${
                bookmarked ? "text-primary" : ""
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`}
              />
              <span>{bookmarked ? "Saved" : "Save"}</span>
            </Button>
          </div>
        </motion.div>

        {/* Related Posts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h3 className="text-xl font-bold mb-6">More from VGWritings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(blogData)
              .filter(([key]) => key !== slug)
              .map(([key, post]) => (
                <motion.div
                  key={key}
                  whileHover={{ y: -5 }}
                  className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link href={`/blogs/${key}`} className="block">
                    <div className="relative h-40 w-full">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold mb-2">{post.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {post.author.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Floating Share Button */}
        {showFloatingShare && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <ShareDialog
              title={blog.title}
              description={blog.description}
              url={currentUrl}
              trigger={
                <Button size="icon" className="rounded-full shadow-lg size-12">
                  <Share2 className="size-5" />
                </Button>
              }
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function BlogContent({ content }: { content: string }) {
  const formatContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <motion.h1
            key={i}
            className="text-3xl font-bold mt-12 mb-6 scroll-m-20"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {line.substring(2)}
          </motion.h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <motion.h2
            key={i}
            className="text-2xl font-bold mt-10 mb-4 scroll-m-20"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {line.substring(3)}
          </motion.h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <motion.h3
            key={i}
            className="text-xl font-bold mt-8 mb-3 scroll-m-20"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {line.substring(4)}
          </motion.h3>
        );
      } else if (line.startsWith("#### ")) {
        elements.push(
          <motion.h4
            key={i}
            className="text-lg font-bold mt-6 mb-2 scroll-m-20"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {line.substring(5)}
          </motion.h4>
        );
      } else if (line.startsWith("##### ")) {
        elements.push(
          <motion.h5
            key={i}
            className="text-base font-bold mt-4 mb-1 scroll-m-20"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {line.substring(6)}
          </motion.h5>
        );
      }
      // Code blocks
      else if (line.startsWith("```")) {
        const language = line.substring(3).trim();
        let codeContent = "";
        i++;

        while (i < lines.length && !lines[i].startsWith("```")) {
          codeContent += lines[i] + "\n";
          i++;
        }

        elements.push(
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="my-6"
          >
            <CodeBlock language={language || "javascript"}>
              {codeContent.trim()}
            </CodeBlock>
          </motion.div>
        );
      }
      // Lists
      else if (line.startsWith("- ")) {
        const listItems = [
          <motion.li
            key={i}
            className="ml-4 mb-1"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {line.substring(2)}
          </motion.li>,
        ];
        i++;

        while (i < lines.length && lines[i].startsWith("- ")) {
          listItems.push(
            <motion.li
              key={i}
              className="ml-4 mb-1"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {lines[i].substring(2)}
            </motion.li>
          );
          i++;
        }

        elements.push(
          <ul key={`ul-${i}`} className="mb-6 pl-4 list-disc">
            {listItems}
          </ul>
        );
        continue;
      } else if (line.startsWith("1. ")) {
        const listItems = [
          <motion.li
            key={i}
            className="ml-4 mb-1"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {line.substring(3)}
          </motion.li>,
        ];
        i++;

        while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
          listItems.push(
            <motion.li
              key={i}
              className="ml-4 mb-1"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {lines[i].replace(/^\d+\.\s/, "")}
            </motion.li>
          );
          i++;
        }

        elements.push(
          <ol key={`ol-${i}`} className="mb-6 pl-4 list-decimal">
            {listItems}
          </ol>
        );
        continue;
      }
      // Links
      else if (
        line.includes("[") &&
        line.includes("](") &&
        line.includes(")")
      ) {
        const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          elements.push(
            <motion.a
              key={i}
              href={linkMatch[2]}
              className="text-primary hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {linkMatch[1]}
            </motion.a>
          );
        }
      }
      // Tables
      else if (line.includes("|") && line.trim().length > 0) {
        const cells = line.split("|").filter((cell) => cell.trim());
        const isHeader = i === 0 || (i > 0 && !lines[i - 1].includes("|"));

        if (isHeader) {
          const tableRows = [];
          const headerCells = cells.map((cell, cellIndex) => (
            <motion.th
              key={cellIndex}
              className="border px-4 py-2 bg-muted font-semibold"
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {cell.trim()}
            </motion.th>
          ));
          tableRows.push(<tr key={`header-${i}`}>{headerCells}</tr>);

          i++;
          while (
            i < lines.length &&
            lines[i].includes("|") &&
            lines[i].trim().length > 0
          ) {
            const rowCells = lines[i].split("|").filter((cell) => cell.trim());
            const dataCells = rowCells.map((cell, cellIndex) => (
              <motion.td
                key={cellIndex}
                className="border px-4 py-2"
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {cell.trim()}
              </motion.td>
            ));
            tableRows.push(<tr key={`row-${i}`}>{dataCells}</tr>);
            i++;
          }

          elements.push(
            <motion.div
              key={`table-${i}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="my-6 overflow-x-auto"
            >
              <table className="border-collapse border w-full">
                <tbody>{tableRows}</tbody>
              </table>
            </motion.div>
          );
          continue;
        }
      }
      // Empty lines
      else if (line.trim() === "") {
        elements.push(<br key={i} />);
      }
      // Regular paragraphs with inline formatting
      else {
        let formattedLine = line;
        // Handle bold and italic
        formattedLine = formattedLine.replace(
          /\*\*(.*?)\*\*/g,
          "<strong>$1</strong>"
        );
        formattedLine = formattedLine.replace(/\*(.*?)\*/g, "<em>$1</em>");
        // Handle inline code
        formattedLine = formattedLine.replace(
          /`([^`]+)`/g,
          '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
        );

        elements.push(
          <motion.p
            key={i}
            className="mb-6 leading-relaxed text-foreground/90"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          />
        );
      }

      i++;
    }

    return elements;
  };

  return (
    <div className="prose prose-lg max-w-none">{formatContent(content)}</div>
  );
}
