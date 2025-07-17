"use client";
import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "@/styles/prism-atom-dark.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import { IoClipboardOutline } from "react-icons/io5";

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

export default function CodeBlock({
  children,
  language = "javascript",
  className = "",
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Ensure code is always a string and trimmed
  let codeString = "";
  if (typeof children === "string") {
    codeString = children;
  } else if (Array.isArray(children)) {
    codeString = (children as string[]).join("");
  }
  codeString = codeString.trim();
  const prismLanguage = language || "javascript";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [codeString, prismLanguage, mounted]);

  const handleCopy = async () => {
    if (codeRef.current) {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  if (!mounted) return null;
  return (
    <div className="relative px-1.5 border rounded-lg bg-primary/5 hover:shadow-lg transition-all hover:scale-105 duration-300">
      <pre className={`overflow-x-auto rounded-lg ${className}`}>
        <code ref={codeRef} className={`language-${prismLanguage}`}>
          {codeString}
        </code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-4 right-4 bg-white/10 text-white rounded-md border border-white/10 z-10 px-3 sm:px-4 py-1 text-sm md:text-base flex items-center gap-1 cursor-pointer shadow-lg transition-all hover:scale-105 duration-300"
      >
        <IoClipboardOutline
          className={`${copied && "text-green-500"} "w-4 h-4"`}
        />
        {copied ? (
          <span className="text-green-500 font-semibold">Copied !</span>
        ) : (
          "Copy"
        )}
      </button>
    </div>
  );
}
