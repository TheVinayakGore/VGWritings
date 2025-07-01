"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { CheckCircle } from "react-feather";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-40 px-4">
      <div className="max-w-6xl m-auto items-start p-3 bg-primary/5 shadow-xl border rounded-lg w-full">
        <div className="flex flex-col lg:flex-row items-start bg-background p-5 md:p-8 border rounded-lg">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-7 lg:mb-0 md:pr-10 md:border-r-[1.5px] border-dashed lg:w-1/2"
          >
            <div className="relative w-full rounded-lg overflow-hidden">
              <Image
                src="/vinu.jpeg"
                alt="About VGWritings"
                width={2000}
                height={2000}
                className="object-cover w-full"
              />
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
              About VGWritings
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              VGWritings was born out of a passion for sharing knowledge and
              stories that inspire, educate, and entertain. Our platform brings
              together writers from diverse backgrounds to create a rich
              tapestry of content. Whether you are a seasoned writer or just
              starting your journey, VGWritings is a welcoming space to express
              your thoughts and connect with like-minded individuals.
            </p>
            <ul className="pl-0 mb-6 text-muted-foreground">
              <li className="flex items-center gap-2 mb-2">
                <CheckCircle className="size-4 text-primary" />
                Personal stories and life lessons
              </li>
              <li className="flex items-center gap-2 mb-2">
                <CheckCircle className="size-4 text-primary" />
                Learning posts and tutorials
              </li>
              <li className="flex items-center gap-2 mb-2">
                <CheckCircle className="size-4 text-primary" />
                Travel diaries and cultural explorations
              </li>
              <li className="flex items-center gap-2 mb-2">
                <CheckCircle className="size-4 text-primary" />
                Career growth tips and experiences
              </li>
              <li className="flex items-center gap-2 mb-2">
                <CheckCircle className="size-4 text-primary" />
                Productivity and self-improvement strategies
              </li>
              <li className="flex items-center gap-2 mb-2">
                <CheckCircle className="size-4 text-primary" />
                Technology trends and creative inspiration
              </li>
              <li className="flex items-center gap-2 mb-2">
                <CheckCircle className="size-4 text-primary" />
                Community-driven discussions and more
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/blog">Start Reading</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
