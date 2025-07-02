"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Share2,
  Bookmark,
  Clock,
  Eye,
  Calendar,
  CheckCircle,
} from "react-feather";
import CodeBlock from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import ShareDialog from "@/components/ShareDialog";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import NewsletterSignup from "@/components/NewsletterSignup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const blogData = {
  "understanding-react-server-components": {
    id: 1,
    title: "Understanding React Server Components",
    description:
      "A deep dive into React Server Components and how they change the way we build web apps.",
    date: "June 1, 2024",
    readTime: "8 min read",
    cover: "/card.png",
    stats: {
      likes: 124,
      views: 2560,
    },
    tags: ["React", "Next.js", "Performance"],
    content: `
# 🚀 Understanding React Server Components

React Server Components (RSC) represent a paradigm shift in how we build React applications. They allow us to render components on the server and send the result to the client, reducing the JavaScript bundle size and improving performance.

## 🤔 What are Server Components?

Server Components are React components that run exclusively on the server. They can:

- Access backend resources directly
- Keep sensitive data on the server
- Reduce client-side JavaScript
- Improve initial page load performance

## 🌟 Key Benefits

1. Reduced Bundle Size: Server components don't ship JavaScript to the client
2. Better Performance: Faster initial page loads
3. Enhanced Security: Sensitive data stays on the server
4. Improved SEO: Better server-side rendering

## 🛠️ Example Implementation

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

## 🔄 Client vs Server Components

| Feature | Client Component | Server Component |
| JavaScript | Sent to client | Stays on server |
| Interactivity | Full | Limited |
| Data fetching | Client-side | Server-side |
| Bundle size | Larger | Smaller |

## 💡 Best Practices

1. Use Server Components by default
2. Add "use client" only when needed
3. Keep interactive parts as client components
4. Leverage server-side data fetching

## 🎯 Conclusion

React Server Components offer a powerful way to build more efficient React applications. By understanding when and how to use them, you can create faster, more secure web applications.

For more information, check out the [official React documentation](https://react.dev).
    `,
    images: ["/trip/01.jpeg", "/trip/02.jpeg", "/trip/03.jpeg"],
  },
  "mastering-javascript-closures": {
    id: 2,
    title: "Mastering JavaScript Closures",
    description:
      "A comprehensive guide to understanding and using closures in JavaScript.",
    date: "May 15, 2024",
    readTime: "6 min read",
    cover: "/trip/01.jpeg",
    stats: {
      likes: 98,
      views: 1800,
    },
    tags: ["JavaScript", "Closures", "Fundamentals"],
    content: `
# 🧠 Mastering JavaScript Closures

Closures are a fundamental concept in JavaScript that every developer should understand. They allow functions to access variables from an enclosing scope, even after that scope has closed.

## ❓ What is a Closure?

A closure is created when a function is defined inside another function, allowing the inner function to access the outer function's variables.

\`\`\`javascript
function outer() {
  let count = 0;
  function inner() {
    count++;
    return count;
  }
  return inner;
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

## 💡 Why Use Closures?

- Data privacy
- Function factories
- Maintaining state

## ⚠️ Common Pitfalls

1. Unintended variable sharing in loops
2. Memory leaks if not careful

## 🎯 Conclusion

Closures are powerful but can be tricky. Practice using them to fully understand their behavior!`,
    images: [],
  },
  "css-grid-vs-flexbox": {
    id: 3,
    title: "CSS Grid vs Flexbox: When to Use Which?",
    description:
      "A practical comparison of CSS Grid and Flexbox for modern web layouts.",
    date: "April 28, 2024",
    readTime: "7 min read",
    cover: "/trip/02.jpeg",
    stats: {
      likes: 112,
      views: 2100,
    },
    tags: ["CSS", "Grid", "Flexbox"],
    content: `
# 🎨 CSS Grid vs Flexbox: When to Use Which?

CSS Grid and Flexbox are two powerful layout systems in CSS. Knowing when to use each can help you build responsive and maintainable layouts.

## 🟩 CSS Grid

- Two-dimensional layout
- Great for complex grids
- Explicit placement of items

## ➡️ Flexbox

- One-dimensional layout
- Best for linear arrangements
- Simple alignment and distribution

## 🏗️ Example: Grid

\`\`\`css
grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
\`\`\`

## 🧩 Example: Flexbox

\`\`\`css
.flex-container {
  display: flex;
  flex-direction: row;
  gap: 16px;
}
\`\`\`

## 🤔 When to Use Which?

- Use Grid for overall page layout
- Use Flexbox for components and small UI elements

## 🎯 Conclusion

Both Grid and Flexbox are essential tools. Choose the right one based on your layout needs!`,
    images: ["/trip/04.jpeg", "/trip/05.jpeg"],
  },
  "unaccepted-mumbai-trip": {
    id: 4,
    title: "Unaccepted Mumbai Trip",
    description:
      "A spontaneous and unforgettable journey through the heart of Mumbai, filled with surprises, street food, and city lights.",
    date: "July 10, 2024",
    readTime: "10 min read",
    cover: "/trip/03.jpeg",
    stats: {
      likes: 87,
      views: 1420,
    },
    tags: ["Travel", "Mumbai", "Adventure", "India"],
    images: [
      "/trip/01.jpeg",
      "/trip/02.jpeg",
      "/trip/03.jpeg",
      "/trip/04.jpeg",
      "/trip/05.jpeg",
    ],
    content: `
# 🏙️ Unaccepted Mumbai Trip

Sometimes the best adventures are the ones you never planned. My recent trip to Mumbai was exactly that—a spontaneous escape that turned into a whirlwind of discovery, flavors, and memories.

[key-moments]

## 🚆 The Unexpected Departure

It all started with a late-night call from a friend: "Let's go to Mumbai tomorrow!" With barely any time to pack, we hopped on the first available train. The excitement of an unplanned journey was palpable as the city lights faded and the tracks hummed beneath us.

## 🌅 Sunrise at Marine Drive

We arrived in Mumbai just as the sun was rising. The first stop? Marine Drive. The cool breeze, the sound of waves, and the golden light made for a magical welcome. We sat on the promenade, sipping chai from a street vendor, watching the city wake up.

## 🍲 Street Food Extravaganza

Mumbai is a food lover's paradise. From spicy vada pav at a bustling corner stall to sweet jalebis in a crowded market, every bite was an explosion of flavor. We wandered through the lanes of Mohammad Ali Road, sampling kebabs, pav bhaji, and more.

- Vada Pav at Dadar
- Pav Bhaji at Chowpatty
- Jalebi at CST
- Kebabs at Mohammad Ali Road
- Cutting Chai everywhere!

## 🕌 Gateway of India & Colaba Causeway

No trip to Mumbai is complete without visiting the Gateway of India. The monument stood tall against the blue sky, surrounded by tourists and pigeons. We strolled down Colaba Causeway, picking up quirky souvenirs and chatting with local shopkeepers.

## 🚇 Local Train Adventures

Traveling by Mumbai's local trains is an experience in itself. The rush, the crowd, the energy—it's the lifeblood of the city. We squeezed into a compartment, made new friends, and even got travel tips from daily commuters.

## 🌃 Nightlife & Reflections

As night fell, we explored Bandra's vibrant streets, enjoyed live music at a cozy café, and ended the day with a peaceful walk along Carter Road. Mumbai's energy is infectious, and its spirit stays with you long after you leave.

## 🎯 Conclusion

The Unaccepted Mumbai Trip taught me that sometimes, the best memories come from the journeys you never expected to take. Mumbai, with its chaos and charm, welcomed us with open arms and left us craving more.

If you ever get a chance to visit, say yes—even if you haven't planned a thing!`,
  },
};

export default function BlogPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [showFloatingActions, setShowFloatingActions] = useState(false);
  const [tocItems, setTocItems] = useState<
    { id: string; text: string; level: number }[]
  >([]);

  const blog = blogData[slug as keyof typeof blogData];

  useEffect(() => {
    if (blog) {
      setLikes(blog.stats.likes);
      // Extract headings for TOC
      const headings = Array.from(
        document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      ).map((heading) => ({
        id: heading.id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.substring(1)),
      }));
      setTocItems(headings);
    }
  }, [blog]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFloatingActions(scrollY > 300);
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

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <ReadingProgressBar />
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
                <Link
                  href="/blogs"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to blogs
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
              <header className="mb-10">
                <Badge
                  variant="outline"
                  className="flex flex-wrap items-center justify-start gap-2 p-3 mb-6 overflow-auto"
                >
                  <span className="rounded-full text-xl leading-none font-bold px-3">
                    ► TAGS
                  </span>
                  {blog.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-primary rounded text-base p-1 px-4"
                    >
                      {tag}
                    </Badge>
                  ))}
                </Badge>

                <h1 className="logo text-3xl md:text-4xl lg:text-5xl tracking-wide mb-4">
                  {blog.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                  {blog.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{blog.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{blog.stats.views.toLocaleString()} views</span>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="rounded-xl border overflow-hidden shadow-lg"
              >
                <Image
                  src={blog.cover}
                  alt={blog.title}
                  width={1600}
                  height={900}
                  className="w-full h-auto object-cover"
                  priority
                />
              </motion.div>

              {/* Article Content */}
              <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80 prose-code:before:hidden prose-code:after:hidden prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm">
                <BlogContent
                  content={blog.content}
                  images={blog.images || []}
                />
              </article>

              {/* Article Footer */}
              <footer className="mt-16 border-y py-8">
                <div className="flex flex-row justify-center sm:justify-between items-center gap-3">
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

                    <ShareDialog
                      title={blog.title}
                      description={blog.description}
                      url={currentUrl}
                      trigger={
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </Button>
                      }
                    />
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
            <div className="my-10">
              <NewsletterSignup />
            </div>

            {/* Related Articles */}
            <section className="mb-16">
              <h2 className="logo text-2xl md:text-4xl font-bold mb-5 md:mb-10">
                🚀{" "}
                <span className="underline underline-offset-8">
                  More articles you might like
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {Object.entries(blogData)
                  .filter(([key]) => key !== slug)
                  .map(([key, post]) => (
                    <motion.div
                      key={key}
                      whileHover={{ y: -5 }}
                      className="bg-background border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <Link href={`/blogs/${key}`} className="block">
                        <div className="relative h-60 md:h-76 w-full">
                          <Image
                            src={post.cover}
                            alt={post.title}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        <div className="p-4 sm:p-5">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                className="bg-primary rounded-full p-1 px-3"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="logo text-xl font-bold mb-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2 mb-4">
                            {post.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 sm:h-4 w-3 sm:w-4" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 sm:h-4 w-3 sm:w-4" />
                              <span>{post.readTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="h-3 sm:h-4 w-3 sm:w-4" />
                              <span>
                                {post.stats.views.toLocaleString()} views
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                  .slice(0, 6)}
              </div>
              <Link href="/blogs">
                <Button size="lg" className="flex items-center gap-3 my-5">
                  <span>Explore more Blogs</span> <MdOutlineArrowRightAlt />
                </Button>
              </Link>
            </section>
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
          <ShareDialog
            title={blog.title}
            description={blog.description}
            url={currentUrl}
            trigger={
              <Button
                size="icon"
                className="rounded-full shadow-lg size-12 bg-background hover:bg-muted"
                variant="outline"
              >
                <Share2 className="size-5" />
              </Button>
            }
          />
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

function KeyMoments({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <section className="mb-8 overflow-x-auto w-full">
      <h3 className="font-semibold text-lg mb-2"># Key Moments :</h3>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="flex gap-5 overflow-x-auto p-5 md:p-10 md:pt-5 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/30"
          asChild
        >
          <div>
            {images.map((img, idx) => (
              <button
                key={img + idx}
                type="button"
                className="shrink-0 w-32 md:w-56 h-auto p-2 border rounded-lg hover:shadow-lg transition-all hover:scale-105 duration-300 overflow-hidden bg-muted cursor-pointer"
                onClick={() => {
                  setSelected(img);
                  setOpen(true);
                }}
              >
                <Image
                  src={img}
                  alt={`Key moment ${idx + 1}`}
                  width={2000}
                  height={2000}
                  className="object-cover rounded-lg w-full h-full"
                />
              </button>
            ))}
          </div>
        </DialogTrigger>
        <DialogContent className="mt-16 md:mt-10 max-h-[80vh] w-full overflow-auto">
          <DialogHeader>
            <DialogTitle>Captured moments</DialogTitle>
            <DialogDescription>
              A memorable moment from the journey.
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <Image
              src={selected}
              alt="Large key moment"
              width={1200}
              height={800}
              className="rounded-lg w-full h-full"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function BlogContent({
  content,
  images,
}: {
  content: string;
  images: string[];
}) {
  const formatContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Key Moments shortcode
      if (line.trim() === "[key-moments]") {
        elements.push(<KeyMoments key={`key-moments-${i}`} images={images} />);
        i++;
        continue;
      }

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={i}
            id={line.substring(2).toLowerCase().replace(/\s+/g, "-")}
            className="text-3xl font-bold mt-5 scroll-m-20"
          >
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={i}
            id={line.substring(3).toLowerCase().replace(/\s+/g, "-")}
            className="text-2xl font-bold scroll-m-20"
          >
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={i}
            id={line.substring(4).toLowerCase().replace(/\s+/g, "-")}
            className="text-xl font-bold scroll-m-20"
          >
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith("#### ")) {
        elements.push(
          <h4
            key={i}
            id={line.substring(5).toLowerCase().replace(/\s+/g, "-")}
            className="text-lg font-bold scroll-m-20"
          >
            {line.substring(5)}
          </h4>
        );
      } else if (line.startsWith("##### ")) {
        elements.push(
          <h5
            key={i}
            id={line.substring(6).toLowerCase().replace(/\s+/g, "-")}
            className="text-base font-bold scroll-m-20"
          >
            {line.substring(6)}
          </h5>
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
          <div key={i} className="">
            <CodeBlock language={language || "javascript"}>
              {codeContent.trim()}
            </CodeBlock>
          </div>
        );
      }
      // Lists
      else if (line.startsWith("- ")) {
        const listItems = [
          <li
            key={`li-${i}-${line.substring(2, 10)}`}
            className="ml-4 mb-1 flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-green-500 inline-block" />
            {line.substring(2)}
          </li>,
        ];
        i++;

        while (i < lines.length && lines[i].startsWith("- ")) {
          listItems.push(
            <li
              key={`li-${i}-${lines[i].substring(2, 10)}`}
              className="ml-4 mb-1 flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-green-500 inline-block" />
              {lines[i].substring(2)}
            </li>
          );
          i++;
        }

        elements.push(
          <ul key={`ul-${i}-${listItems.length}`} className="pl-4 list-disc">
            {listItems}
          </ul>
        );
        continue;
      } else if (line.startsWith("1. ")) {
        const listItems = [
          <li key={`oli-${i}-${line.substring(3, 10)}`} className="ml-4 mb-1">
            {line.substring(3)}
          </li>,
        ];
        i++;

        while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
          listItems.push(
            <li
              key={`oli-${i}-${lines[i]
                .replace(/^\d+\.\s/, "")
                .substring(0, 10)}`}
              className="ml-4 mb-1"
            >
              {lines[i].replace(/^\d+\.\s/, "")}
            </li>
          );
          i++;
        }

        elements.push(
          <ol key={`ol-${i}-${listItems.length}`} className="pl-4 list-decimal">
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
            <Link
              key={`a-${i}-${linkMatch[2]}`}
              href={linkMatch[2]}
              className="text-primary hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkMatch[1]}
            </Link>
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
            <th
              key={cellIndex}
              className="border px-4 py-2 bg-muted font-semibold"
            >
              {cell.trim()}
            </th>
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
              <td key={cellIndex} className="border px-4 py-2">
                {cell.trim()}
              </td>
            ));
            tableRows.push(<tr key={`row-${i}`}>{dataCells}</tr>);
            i++;
          }

          elements.push(
            <div key={`table-${i}`} className="overflow-x-auto">
              <table className="border-collapse border w-full">
                <tbody>{tableRows}</tbody>
              </table>
            </div>
          );
          continue;
        }
      }
      // Empty lines
      else if (line.trim() === "") {
        elements.push(<br key={`br-${i}`} />);
      }
      // Regular paragraphs with inline formatting
      else {
        let formattedLine = line;
        // Italic (*text*) but not **text**
        formattedLine = formattedLine.replace(
          /(^|\s)\*(?!\*)([^*]+)\*(?=\s|$)/g,
          "$1<em>$2</em>"
        );
        // Handle inline code
        formattedLine = formattedLine.replace(
          /`([^`]+)`/g,
          '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
        );

        elements.push(
          <p
            key={`p-${i}-${formattedLine.substring(0, 10)}`}
            className="leading-relaxed text-foreground/90"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        );
      }

      i++;
    }

    return elements;
  };

  return <>{formatContent(content)}</>;
}
