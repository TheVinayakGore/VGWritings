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
import blogData from "@/data/blog-data.json";

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
                <Link href="/blogs">
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
                  {blog.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-primary text-xs md:text-sm p-1 px-3 md:px-4 rounded-full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </Badge>

                <h1 className="logo text-xl md:text-4xl lg:text-5xl tracking-wide mb-3">
                  {blog.title}
                </h1>

                <p className="text-sm md:text-lg text-muted-foreground mb-3">
                  {blog.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span>{blog.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="size-4" />
                    <span>{blog.stats.views.toLocaleString()} views</span>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="rounded-md md:rounded-xl border overflow-hidden shadow-lg"
              >
                <Image
                  src={blog.cover}
                  alt={blog.title}
                  width={1600}
                  height={900}
                  className="w-full h-[30rem] object-cover"
                  priority
                />
              </motion.div>

              {/* Article Content */}
              <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80 prose-code:before:hidden prose-code:after:hidden prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm">
                <BlogContent
                  content={blog.content}
                  images={blog.images || []}
                  keyMomentsData={blog.keyMomentsData || []}
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
            <div className="my-5 md:my-10">
              <NewsletterSignup />
            </div>

            {/* Related Articles */}
            <section className="mb-6 md:mb-16">
              <h2 className="logo text-lg md:text-4xl font-bold mb-5 md:mb-10">
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
                        <div className="relative h-52 md:h-76 w-full">
                          <Image
                            src={post.cover}
                            alt={post.title}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        <div>
                          <div className="flex flex-wrap gap-2 p-3">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                className="text-xs md:text-sm bg-primary rounded-full p-1 px-3"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="p-4 pt-0 sm:pt-2">
                            <h3 className="logo text-lg md:text-xl font-bold mb-2">
                              {post.title}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground line-clamp-2 mb-4">
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

function KeyMoments({
  images,
  keyMomentsData,
}: {
  images: string[];
  keyMomentsData: { image: string; title: string; description: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string>(
    "🤩 Captured moments"
  );

  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <section className="overflow-x-auto w-full">
      <h3 className="font-semibold text-lg mb-2"># Key Moments :</h3>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="flex gap-3 overflow-x-auto p-5 md:p-10 md:pt-5 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/30"
          asChild
        >
          <div>
            {images.map((img, idx) => (
              <button
                key={img + idx}
                type="button"
                className="shrink-0 md:mt-3 -rotate-6 z-0 hover:rotate-0 hover:z-10 w-auto h-40 md:h-64 p-1 md:p-1.5 border rounded md:rounded-md hover:shadow-lg transition-all hover:scale-110 duration-300 overflow-hidden bg-muted cursor-pointer"
                onClick={() => {
                  setSelected(img);
                  const momentData = keyMomentsData.find(
                    (moment) => moment.image === img
                  );
                  setSelectedDescription(
                    momentData?.description ||
                      "A memorable moment from the journey !"
                  );
                  setSelectedTitle(
                    momentData?.title
                      ? `${momentData.title}`
                      : "🤩 Captured moments"
                  );
                  setOpen(true);
                }}
              >
                <Image
                  src={img}
                  alt={`Key moment ${idx + 1}`}
                  width={2000}
                  height={2000}
                  className="object-cover rounded md:rounded-md w-full h-full"
                />
              </button>
            ))}
          </div>
        </DialogTrigger>
        <DialogContent className="mt-16 md:mt-10 p-1.5 md:p-6 max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">
              {selectedTitle}
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base leading-relaxed">
              {selectedDescription}
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <Image
              src={selected}
              alt="Large key moment"
              width={1200}
              height={800}
              className="rounded-md md:rounded-lg w-full h-full"
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
  keyMomentsData,
}: {
  content: string;
  images: string[];
  keyMomentsData: { image: string; title: string; description: string }[];
}) {
  const formatContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Key Moments shortcode
      if (line.trim() === "[key-moments]") {
        elements.push(
          <KeyMoments
            key={`key-moments-${i}`}
            images={images}
            keyMomentsData={keyMomentsData}
          />
        );
        i++;
        continue;
      }

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={i}
            id={line.substring(2).toLowerCase().replace(/\s+/g, "-")}
            className="text-xl md:text-3xl font-bold mt-2 md:mt-5 md:scroll-m-20"
          >
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={i}
            id={line.substring(3).toLowerCase().replace(/\s+/g, "-")}
            className="text-lg md:text-2xl font-bold scroll-m-20"
          >
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={i}
            id={line.substring(4).toLowerCase().replace(/\s+/g, "-")}
            className="text-base md:text-xl font-bold scroll-m-20"
          >
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith("#### ")) {
        elements.push(
          <h4
            key={i}
            id={line.substring(5).toLowerCase().replace(/\s+/g, "-")}
            className="text-sm md:text-lg font-bold scroll-m-20"
          >
            {line.substring(5)}
          </h4>
        );
      } else if (line.startsWith("##### ")) {
        elements.push(
          <h5
            key={i}
            id={line.substring(6).toLowerCase().replace(/\s+/g, "-")}
            className="text-xs md:text-base font-bold scroll-m-20"
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
            className="ml-2 md:ml-4 mb-1 flex items-center gap-2"
          >
            <CheckCircle className="size-3 md:size-5 text-green-500 inline-block" />
            {line.substring(2)}
          </li>,
        ];
        i++;

        while (i < lines.length && lines[i].startsWith("- ")) {
          listItems.push(
            <li
              key={`li-${i}-${lines[i].substring(2, 10)}`}
              className="ml-2 md:ml-4 mb-1 flex items-center gap-2"
            >
              <CheckCircle className="size-3 md:size-5 text-green-500 inline-block" />
              {lines[i].substring(2)}
            </li>
          );
          i++;
        }

        elements.push(
          <ul
            key={`ul-${i}-${listItems.length}`}
            className="pl-2 md:pl-4 list-disc"
          >
            {listItems}
          </ul>
        );
        continue;
      } else if (line.startsWith("1. ")) {
        const listItems = [
          <li
            key={`oli-${i}-${line.substring(3, 10)}`}
            className="ml-2 md:ml-4 mb-1"
          >
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
              className="ml-2 md:ml-4 mb-1"
            >
              {lines[i].replace(/^\d+\.\s/, "")}
            </li>
          );
          i++;
        }

        elements.push(
          <ol
            key={`ol-${i}-${listItems.length}`}
            className="pl-2 md:pl-4 list-decimal"
          >
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
            className="text-xs md:text-base -my-3 sm:my-0 leading-relaxed text-foreground/80 pb-3 md:pb-6 border-b"
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
