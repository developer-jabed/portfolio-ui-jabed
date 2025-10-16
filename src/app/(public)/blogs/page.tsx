"use client";

import { motion } from "framer-motion";
import { Sparkles, BookOpen, Code2 } from "lucide-react";
import Link from "next/link";

export default function AllBlogsPage() {
  const blogs = [
    {
      title: "Mastering Next.js 15",
      desc: "A complete guide to Next.js 15 features, routing, and performance optimization.",
      icon: <Code2 className="w-8 h-8 text-pink-400" />,
    },
    {
      title: "Animating with GSAP & Framer Motion",
      desc: "Level up your frontend animations using GSAP timelines and Framer Motion magic.",
      icon: <Sparkles className="w-8 h-8 text-yellow-400" />,
    },
    {
      title: "From React to React Server Components",
      desc: "Learn how to migrate to React Server Components efficiently with examples.",
      icon: <BookOpen className="w-8 h-8 text-blue-400" />,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#1a0a0a] to-black text-white py-28 px-6">
      {/* Glowing Orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl top-20 left-[-100px]"
        animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-20 right-[-120px]"
        animate={{ x: [0, -50, 50, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated Header */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "backOut" }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-400 via-red-500 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,0,85,0.3)]"
        >
          All Blogs
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto"
        >
          Discover the latest articles, tutorials, and insights on{" "}
          <span className="text-pink-400 font-semibold">
            web development, React, Next.js, and more
          </span>
          . Stay inspired — one blog at a time.
        </motion.p>
      </div>

      {/* Blog Grid */}
      <div className="relative z-10 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {blogs.map((blog, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
            className="group relative p-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:shadow-[0_0_25px_rgba(255,0,85,0.4)]"
          >
            <div className="rounded-2xl bg-[#0d0d0d] p-8 h-full flex flex-col justify-between group-hover:bg-gradient-to-b group-hover:from-[#1a0a0a] group-hover:to-black transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">{blog.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-pink-300 group-hover:text-pink-400 transition-colors">
                {blog.title}
              </h3>
              <p className="text-gray-400 text-base mb-6">{blog.desc}</p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-pink-400 font-medium hover:text-pink-300 transition-all group"
              >
                Read More
                <motion.span
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Footer Text */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-sm text-gray-500 mt-24"
      >
        ✨ Crafted with ❤️ by{" "}
        <span className="text-pink-400 font-semibold">Jabed Islam</span>
      </motion.div>
    </div>
  );
}
