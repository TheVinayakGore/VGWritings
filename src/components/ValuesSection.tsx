"use client";
import { motion } from "framer-motion";
import { BookOpen, PenTool, Users, Globe } from "react-feather";

const values = [
  {
    icon: BookOpen,
    title: "Knowledge Sharing",
    description: "We believe in the power of sharing knowledge to empower others.",
  },
  {
    icon: PenTool,
    title: "Creative Expression",
    description: "Encouraging diverse voices and creative storytelling.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive network of writers and readers.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "Making quality content available to everyone, everywhere.",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-20 md:py-40 px-4">
      <div className="container m-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="logo text-4xl md:text-6xl font-bold mb-5">Our Values</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-background p-6 rounded-xl hover:shadow-lg border flex flex-col items-center text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">
                <value.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-foreground/80">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}