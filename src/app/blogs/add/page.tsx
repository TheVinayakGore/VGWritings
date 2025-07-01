"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Save,
  Eye,
  Code,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
} from "react-feather";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import { useToast } from "@/components/ui/use-toast";

export default function AddBlogPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cover: "/card.png",
    content: "",
  });
  const [isPreview, setIsPreview] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const insertMarkdown = (type: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    let insertion = "";
    let cursorOffset = 0;

    switch (type) {
      case "bold":
        insertion = `**${text.substring(start, end) || "bold text"}**`;
        cursorOffset = 2;
        break;
      case "italic":
        insertion = `*${text.substring(start, end) || "italic text"}*`;
        cursorOffset = 1;
        break;
      case "code":
        insertion = `\`${text.substring(start, end) || "code"}\``;
        cursorOffset = 1;
        break;
      case "link":
        insertion = `[${text.substring(start, end) || "link text"}](url)`;
        cursorOffset = -3;
        break;
      case "list":
        insertion = `- ${text.substring(start, end) || "list item"}`;
        break;
      case "codeblock":
        insertion = `\`\`\`jsx
${text.substring(start, end) || "// Your code here"}
\`\`\``;
        break;
      case "h1":
        insertion = `# ${text.substring(start, end) || "Heading 1"}`;
        break;
      case "h2":
        insertion = `## ${text.substring(start, end) || "Heading 2"}`;
        break;
      case "h3":
        insertion = `### ${text.substring(start, end) || "Heading 3"}`;
        break;
    }

    const newText = text.substring(0, start) + insertion + text.substring(end);
    handleInputChange("content", newText);

    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + insertion.length + cursorOffset,
        start + insertion.length + cursorOffset
      );
    }, 0);
  };

  const formatContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="text-3xl font-bold mt-8 mb-4">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-2xl font-bold mt-6 mb-3">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-xl font-bold mt-5 mb-2">
            {line.substring(4)}
          </h3>
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
          <CodeBlock key={i} language={language || "javascript"}>
            {codeContent.trim()}
          </CodeBlock>
        );
      }
      // Lists
      else if (line.startsWith("- ")) {
        const listItems = [
          <li key={i} className="ml-4 mb-1">
            {line.substring(2)}
          </li>,
        ];
        i++;

        while (i < lines.length && lines[i].startsWith("- ")) {
          listItems.push(
            <li key={i} className="ml-4 mb-1">
              {lines[i].substring(2)}
            </li>
          );
          i++;
        }

        elements.push(
          <ul key={`ul-${i}`} className="mb-4">
            {listItems}
          </ul>
        );
        continue;
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
        // Handle inline code with Atom Dark theme colors
        formattedLine = formattedLine.replace(
          /`([^`]+)`/g,
          '<code class="bg-[#1d1f21] text-[#c5c8c6] px-1 rounded text-sm font-mono">$1</code>'
        );

        elements.push(
          <p
            key={i}
            className="mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        );
      }

      i++;
    }

    return elements;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a blog title",
        variant: "destructive",
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a blog description",
        variant: "destructive",
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter blog content",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save to a database
    console.log("Blog data:", formData);

    toast({
      title: "Blog Saved Successfully!",
      description: "Your blog has been saved and is ready to publish.",
    });

    // Reset form after successful save
    setFormData({
      title: "",
      description: "",
      cover: "/card.png",
      content: "",
    });
  };

  return (
    <div className="container mx-auto py-20">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/blogs"
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to blogs
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Blog</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter blog title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cover Image URL
                  </label>
                  <Input
                    value={formData.cover}
                    onChange={(e) => handleInputChange("cover", e.target.value)}
                    placeholder="/path/to/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Enter blog description"
                  rows={3}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Content</label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPreview(!isPreview)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {isPreview ? "Edit" : "Preview"}
                    </Button>
                  </div>
                </div>

                {!isPreview ? (
                  <div>
                    <div className="flex items-center space-x-2 mb-2 p-2 bg-gray-50 rounded-t-lg border">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown("h1")}
                      >
                        H1
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown("h2")}
                      >
                        H2
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown("h3")}
                      >
                        H3
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown("bold")}
                      >
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown("italic")}
                      >
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown("code")}
                      >
                        <Code className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown("codeblock")}
                      >
                        Code Block
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown("list")}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown("link")}
                      >
                        <LinkIcon className="w-4 h-4" />
                      </Button>
                    </div>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) =>
                        handleInputChange("content", e.target.value)
                      }
                      placeholder="Write your blog content in markdown..."
                      rows={20}
                      className="rounded-t-none"
                      required
                    />
                  </div>
                ) : (
                  <div className="border rounded-lg p-6 min-h-[500px] bg-white">
                    <div className="prose prose-lg max-w-none">
                      {formatContent(formData.content)}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <Link href="/blogs">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  Save Blog
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
