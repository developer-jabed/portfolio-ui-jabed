"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BookOpen, Code2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface BlogType {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  slug: string;
  author: {
    name: string;
    email: string;
  };
}

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null);

  // Axios setup
  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:5000/api/v1";
    axios.defaults.withCredentials = true;

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/blog/all-blogs");
        setBlogs(res.data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-400 animate-pulse">
        Loading blogs...
      </p>
    );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#1a0a0a] to-black text-white py-28 px-6">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

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
            key={blog.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
            className="group relative p-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:shadow-[0_0_25px_rgba(255,0,85,0.4)]"
          >
            <div className="rounded-2xl bg-[#0d0d0d] p-8 h-full flex flex-col justify-between group-hover:bg-gradient-to-b group-hover:from-[#1a0a0a] group-hover:to-black transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                {i % 3 === 0 ? (
                  <Code2 className="w-8 h-8 text-pink-400" />
                ) : i % 3 === 1 ? (
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                ) : (
                  <BookOpen className="w-8 h-8 text-blue-400" />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-pink-300 group-hover:text-pink-400 transition-colors">
                {blog.title}
              </h3>
              <p className="text-gray-400 text-base mb-6">{blog.excerpt}</p>
              <button
                onClick={() => setSelectedBlog(blog)}
                className="inline-flex items-center gap-2 text-pink-400 font-medium hover:text-pink-300 transition-all group"
              >
                Read More
                <motion.span
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  →
                </motion.span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Blog Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 max-w-3xl w-full overflow-y-auto max-h-[90vh] shadow-2xl border border-pink-500/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-pink-400 mb-4">
                {selectedBlog.title}
              </h2>
              <img
                src={selectedBlog.coverImage}
                alt={selectedBlog.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-300 whitespace-pre-line mb-4">
                {selectedBlog.content}
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Author: {selectedBlog.author.name} ({selectedBlog.author.email})
              </p>
              <button
                onClick={() => setSelectedBlog(null)}
                className="mt-2 w-full py-2 bg-pink-400 hover:bg-pink-500 rounded font-semibold transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
