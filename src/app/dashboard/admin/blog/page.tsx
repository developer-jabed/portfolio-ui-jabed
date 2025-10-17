"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Eye, Edit, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

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
  const [editBlog, setEditBlog] = useState<BlogType | null>(null);
  const [newBlog, setNewBlog] = useState<Partial<BlogType> | null>(null);

  const limit = 5;

  // ✅ Axios setup
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
    axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";
    axios.defaults.withCredentials = true;
  }, []);

  // ✅ Fetch Blogs
  const fetchBlogs = async (page: number) => {
    try {
      setLoading(true);
      const res = await axios.get(`/blog/all-blogs?page=${page}&limit=${limit}`);
      setBlogs(res.data.data);
      setTotalPages(Math.ceil(res.data.total / limit));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  // ✅ Delete Blog
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`/blog/delete/${id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast.success("Blog deleted successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete blog");
    }
  };

  // ✅ Update Blog
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBlog) return;
    try {
      await axios.patch(`/blog/update/${editBlog.id}`, editBlog);
      setBlogs((prev) => prev.map((b) => (b.id === editBlog.id ? editBlog : b)));
      setEditBlog(null);
      toast.success("Blog updated successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update blog");
    }
  };

  // ✅ Create Blog
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog?.title || !newBlog?.content) return;

    try {
      const res = await axios.post(`/blog/create`, newBlog);
      setBlogs((prev) => [res.data.data, ...prev]);
      setNewBlog(null);
      toast.success("Blog created successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create blog");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400 animate-pulse">
        Loading blogs...
      </p>
    );

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white flex flex-col items-center relative">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <h1 className="text-4xl font-bold text-pink-400 mb-6 drop-shadow-lg">
        All Blogs
      </h1>

      {/* Create Button */}
      <motion.button
        onClick={() =>
          setNewBlog({
            title: "",
            excerpt: "",
            content: "",
            coverImage: "",
            published: true,
          })
        }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 p-4 rounded-full shadow-lg shadow-pink-400/30 transition z-50"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-pink-500/30 hover:scale-[1.03] transition"
          >
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-pink-300">
                {blog.title}
              </h3>
              <p className="text-gray-300 text-sm line-clamp-3">
                {blog.excerpt}
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="flex items-center gap-1 px-3 py-1 bg-pink-400 rounded hover:bg-pink-500 transition"
                >
                  <Eye className="w-4 h-4" /> View
                </button>
                <button
                  onClick={() => setEditBlog(blog)}
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

      {/* Fancy Modal */}
      <AnimatePresence>
        {(selectedBlog || editBlog || newBlog) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setSelectedBlog(null);
              setEditBlog(null);
              setNewBlog(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 max-w-2xl w-full shadow-2xl border border-pink-500/20"
            >
              {/* View Blog */}
              {selectedBlog && (
                <>
                  <h2 className="text-2xl font-bold text-pink-400 mb-4">
                    {selectedBlog.title}
                  </h2>
                  <img
                    src={selectedBlog.coverImage}
                    alt={selectedBlog.title}
                    className="w-full h-60 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-300 whitespace-pre-line">
                    {selectedBlog.content}
                  </p>
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="mt-4 px-4 py-2 bg-pink-400 rounded hover:bg-pink-500 transition w-full"
                  >
                    Close
                  </button>
                </>
              )}

              {/* Edit Blog */}
              {editBlog && (
                <form onSubmit={handleUpdateSubmit} className="space-y-3">
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
                    ✏️ Edit Blog
                  </h2>
                  <input
                    type="text"
                    value={editBlog.title}
                    onChange={(e) =>
                      setEditBlog({ ...editBlog, title: e.target.value })
                    }
                    placeholder="Title"
                    className="w-full p-2 rounded bg-gray-800 border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                  <textarea
                    value={editBlog.excerpt}
                    onChange={(e) =>
                      setEditBlog({ ...editBlog, excerpt: e.target.value })
                    }
                    placeholder="Excerpt"
                    rows={2}
                    className="w-full p-2 rounded bg-gray-800 border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <textarea
                    value={editBlog.content}
                    onChange={(e) =>
                      setEditBlog({ ...editBlog, content: e.target.value })
                    }
                    placeholder="Content"
                    rows={6}
                    className="w-full p-2 rounded bg-gray-800 border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                  <input
                    type="text"
                    value={editBlog.coverImage}
                    onChange={(e) =>
                      setEditBlog({ ...editBlog, coverImage: e.target.value })
                    }
                    placeholder="Cover Image URL"
                    className="w-full p-2 rounded bg-gray-800 border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500 transition w-full font-semibold"
                  >
                    Update Blog
                  </button>
                </form>
              )}

              {/* Create Blog */}
              {newBlog && (
                <form onSubmit={handleCreateSubmit} className="space-y-3">
                  <h2 className="text-2xl font-bold text-pink-400 mb-4 text-center">
                    📝 Create New Blog
                  </h2>
                  <input
                    type="text"
                    value={newBlog.title || ""}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, title: e.target.value })
                    }
                    placeholder="Title"
                    className="w-full p-2 rounded bg-gray-800 border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    required
                  />
                  <textarea
                    value={newBlog.excerpt || ""}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, excerpt: e.target.value })
                    }
                    placeholder="Excerpt"
                    rows={2}
                    className="w-full p-2 rounded bg-gray-800 border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <textarea
                    value={newBlog.content || ""}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, content: e.target.value })
                    }
                    placeholder="Content"
                    rows={6}
                    className="w-full p-2 rounded bg-gray-800 border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    required
                  />
                  <input
                    type="text"
                    value={newBlog.coverImage || ""}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, coverImage: e.target.value })
                    }
                    placeholder="Cover Image URL"
                    className="w-full p-2 rounded bg-gray-800 border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-pink-500 rounded hover:bg-pink-600 transition w-full font-semibold"
                  >
                    Create Blog
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
