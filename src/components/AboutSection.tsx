"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { CheckCircle } from "react-feather";
import toast from "react-hot-toast";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type AboutItem = {
  _id: string;
  title?: string;
  content?: PortableTextBlock[];
  image?: SanityImageSource;
  features?: string[];
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
};

export default function AboutSection() {
  const [about, setAbout] = useState<AboutItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      const query = `*[_type == "about"]{
        _id,
        title,
        content,
        image,
        features[],
        primaryButtonText,
        primaryButtonLink,
        secondaryButtonText,
        secondaryButtonLink
      }`;
      try {
        const result = await client.fetch(query);
        setAbout(result);
      } catch (error) {
        toast.error("Error fetching about content: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return <div className="py-20 px-4 text-center">Loading...</div>;
  }

  if (!about || about.length === 0) {
    return <div className="py-20 px-4 text-center">No about content found</div>;
  }

  return (
    <section id="about" className="py-20 md:py-40 px-4">
      <div className="max-w-6xl m-auto items-start p-3 bg-primary/5 shadow-xl border rounded-lg w-full">
        {about.map((item) => (
          <div
            key={item._id}
            className="flex flex-col lg:flex-row items-start bg-background p-5 md:p-8 border rounded-lg"
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-7 lg:mb-0 md:pr-10 md:border-r-[1.5px] border-dashed lg:w-1/2"
            >
              <div className="relative w-full rounded-lg overflow-hidden">
                {item.image && (
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.title || "About Image"}
                    width={2000}
                    height={2000}
                    priority
                    className="object-cover w-full"
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:pl-10 h-full lg:w-1/2"
            >
              <h1 className="logo text-4xl md:text-6xl font-bold mb-5">
                {item.title || "About VGWritings"}
              </h1>

              <div className="text-base md:text-lg text-muted-foreground mb-6">
                <PortableText value={item.content ?? []} />
              </div>

              {item.features && item.features.length > 0 && (
                <ul className="pl-0 mb-6 text-muted-foreground">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 mb-2">
                      <CheckCircle className="size-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-4">
                {item.primaryButtonLink && (
                  <Button asChild>
                    <Link href={item.primaryButtonLink}>Start Reading</Link>
                  </Button>
                )}
                {item.secondaryButtonLink && (
                  <Button variant="outline" asChild>
                    <Link href={item.secondaryButtonLink}>Contact Me</Link>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
