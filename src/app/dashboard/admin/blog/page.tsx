"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Eye, Edit } from "lucide-react";

interface BlogType {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  published: boolean;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null);
  const limit = 5;

  const fetchBlogs = async (page: number) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/v1/blog/all-blogs?page=${page}&limit=${limit}`
      );
      setBlogs(res.data.data);
      setTotalPages(Math.ceil(res.data.total / limit));
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/v1/blog/delete/${id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading blogs...</p>;

  return (
    <div className="p-4 min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold text-pink-400 mb-6">All Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition"
          >
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-300 text-sm line-clamp-3">{blog.excerpt}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="flex items-center gap-1 px-3 py-1 bg-pink-400 rounded hover:bg-pink-500 transition"
                >
                  <Eye className="w-4 h-4" /> View
                </button>
                <button
                  onClick={() => alert("Update functionality here")}
                  className="flex items-center gap-1 px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition"
                >
                  <Edit className="w-4 h-4" /> Update
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 rounded hover:bg-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-4 mt-6 flex-wrap justify-center">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-pink-400 hover:bg-pink-500 disabled:opacity-50 transition"
        >
          Previous
        </button>
        <span className="flex items-center gap-2">
          Page <strong>{currentPage}</strong> of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-pink-400 hover:bg-pink-500 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-gray-900 rounded-2xl max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-pink-400 mb-4">
                {selectedBlog.title}
              </h2>
              <img
                src={selectedBlog.coverImage}
                alt={selectedBlog.title}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-300 whitespace-pre-line">{selectedBlog.content}</p>
              <button
                onClick={() => setSelectedBlog(null)}
                className="mt-4 px-4 py-2 bg-pink-400 rounded hover:bg-pink-500 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
