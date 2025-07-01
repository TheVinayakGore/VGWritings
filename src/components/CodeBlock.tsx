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
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children, language, isHydrated]);

  return (
    <pre className={`my-4 overflow-x-auto rounded-lg ${className}`}>
      <code
        ref={codeRef}
        className={`language-${language}`}
        suppressHydrationWarning
      >
        {children}
      </code>
    </pre>
  );
}
