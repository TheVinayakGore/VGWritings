"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-40 px-4">
      <div className="container m-auto w-full">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative aspect-square w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/vinu.jpeg"
                alt="About VGWritings"
                width={2000}
                height={2000}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="logo text-4xl md:text-6xl font-bold mb-5">About VGWritings</h2>
            <p className="text-lg text-foreground/80 mb-6">
              VGWritings was born out of a passion for sharing knowledge and stories that
              inspire, educate, and entertain. Our platform brings together writers
              from diverse backgrounds to create a rich tapestry of content.
            </p>
            <p className="text-lg text-foreground/80 mb-6">
              Whether you are looking for technical insights, creative inspiration,
              or thought-provoking essays, you will find it here in our growing
              collection of articles.
            </p>
            <p className="text-lg text-foreground/80 mb-8">
              Join our community of readers and writers today, and be part of the
              conversation.
            </p>
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