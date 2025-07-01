"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, Calendar, MapPin, CheckCircle } from "react-feather";
import { FiChevronsRight } from "react-icons/fi";

const trips = [
  {
    title: "Mumbai",
    period: "Jan 15-20, 2023",
    description:
      "Exploring the bustling streets and coastal beauty of India's financial capital.",
    image: "/trip/01.jpeg",
    highlights: [
      "Visited Gateway of India at sunset",
      "Tasted street food at Juhu Beach",
      "Explored Elephanta Caves",
    ],
    stats: {
      travelers: 4,
      days: 5,
      landmarks: 12,
    },
  },
  {
    title: "Pune",
    period: "Mar 3-7, 2023",
    description:
      "Cultural immersion in the Oxford of the East with its rich history and vibrant youth culture.",
    image: "/trip/02.jpeg",
    highlights: [
      "Toured Aga Khan Palace",
      "Hiked to Sinhagad Fort",
      "Enjoyed local Maharashtrian cuisine",
    ],
    stats: {
      travelers: 2,
      days: 4,
      landmarks: 8,
    },
  },
  {
    title: "Solapur",
    period: "Nov 10-12, 2023",
    description:
      "Discovering the textile city's heritage and nearby religious sites.",
    image: "/trip/03.jpeg",
    highlights: [
      "Visited Siddheshwar Temple",
      "Explored textile markets",
      "Day trip to Pandharpur",
    ],
    stats: {
      travelers: 3,
      days: 2,
      landmarks: 5,
    },
  },
  {
    title: "Goa",
    period: "Dec 22-27, 2023",
    description:
      "Relaxing on the sunny beaches and enjoying the vibrant nightlife of Goa.",
    image: "/trip/04.jpeg",
    highlights: [
      "Sunbathed at Baga Beach",
      "Explored Fort Aguada",
      "Experienced Goa Carnival",
    ],
    stats: {
      travelers: 5,
      days: 6,
      landmarks: 9,
    },
  },
  {
    title: "Jaipur",
    period: "Feb 10-14, 2024",
    description:
      "A royal journey through the Pink City, exploring forts, palaces, and local bazaars.",
    image: "/trip/05.jpeg",
    highlights: [
      "Visited Amber Fort",
      "Shopped at Johari Bazaar",
      "Admired Hawa Mahal",
    ],
    stats: {
      travelers: 3,
      days: 5,
      landmarks: 7,
    },
  },
];

export default function MyTravels() {
  return (
    <section className="py-20 md:py-40 px-4 bg-gradient-to-tr from-primary/10 to-violet-100 dark:from-primary/20 dark:to-gray-900">
      <div className="container m-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="logo text-4xl md:text-6xl font-bold pb-5 bg-gradient-to-r from-orange-500 to-violet-600 bg-clip-text text-transparent dark:from-yellow-400 dark:to-purple-400">
            My Travelling Diaries
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            A glimpse into my journeys across India, capturing memories,
            culture, and adventure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {trips.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                boxShadow: "0 8px 32px rgba(80, 80, 200, 0.15)",
              }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg dark:shadow-zinc-800 overflow-hidden flex flex-col transition-transform hover:scale-105 duration-300"
            >
              <div className="relative w-full xl:h-96">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={2000}
                  height={2000}
                  className="object-cover object-top w-full h-full"
                  style={{
                    borderBottomLeftRadius: "1rem",
                    borderBottomRightRadius: "1rem",
                  }}
                />
                <span className="absolute top-4 left-4 bg-white/80 text-black px-3 py-1 rounded-full text-xs font-semibold shadow">
                  {item.period}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1 w-full">
                <h1 className="text-2xl font-extrabold mb-2">{item.title}</h1>
                <p className="text-foreground/70 dark:text-zinc-300 mb-4">
                  {item.description}
                </p>
                <ul className="mb-4 space-y-2">
                  {item.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-center text-foreground/80 dark:text-zinc-200"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mr-2" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between bg-gradient-to-r from-orange-50 to-violet-50 dark:from-zinc-800 dark:to-zinc-900 rounded-lg p-3 mt-auto">
                  <div className="flex items-center gap-1 text-sm text-foreground/80 dark:text-zinc-200">
                    <Users className="h-4 w-4 text-orange-500" />{" "}
                    {item.stats.travelers} Travelers
                  </div>
                  <div className="flex items-center gap-1 text-sm text-foreground/80 dark:text-zinc-200">
                    <Calendar className="h-4 w-4 text-orange-500" />{" "}
                    {item.stats.days} Days
                  </div>
                  <div className="flex items-center gap-1 text-sm text-foreground/80 dark:text-zinc-200">
                    <MapPin className="h-4 w-4 text-orange-500" />{" "}
                    {item.stats.landmarks} Landmarks
                  </div>
                </div>
                <Link
                  href={`/blogs/${item.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="mt-6 p-2 px-4 rounded-lg bg-primary/5 font-medium border hover:bg-primary/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center justify-center gap-2 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                  aria-label={`Read blog post about ${item.title}`}
                >
                  Start Reading
                  <FiChevronsRight className="size-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
