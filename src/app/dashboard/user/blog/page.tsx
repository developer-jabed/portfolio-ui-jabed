"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Eye, Edit, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/components/modules/Auth/context/AuthContext";

interface BlogType {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    coverImage: string;
    published: boolean;
}

type ModalType = "view" | "edit" | "create";

export default function Blog() {
    const { user } = useAuth();
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalType, setModalType] = useState<ModalType | null>(null);
    const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null);
    const [blogForm, setBlogForm] = useState<Partial<BlogType> | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Axios setup
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        axios.defaults.baseURL = API_URL;
        axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";
        axios.defaults.withCredentials = true;
    }, [API_URL]);

    // Fetch blogs
    const fetchMyBlogs = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const res = await axios.get("/blog/my-blogs");
            setBlogs(res.data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to fetch blogs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBlogs();
    }, [user]);

    // Delete blog
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

    // Submit create or update
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!blogForm) return;

        try {
            if (modalType === "create") {
                const res = await axios.post("/blog/create", blogForm);
                setBlogs((prev) => [res.data.data, ...prev]);
                toast.success("Blog created successfully!");
            } else if (modalType === "edit" && selectedBlog) {
                const res = await axios.patch(`/blog/update/${selectedBlog.id}`, blogForm);
                setBlogs((prev) =>
                    prev.map((b) => (b.id === selectedBlog.id ? res.data.data : b))
                );
                toast.success("Blog updated successfully!");
            }
            closeModal();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to submit blog");
        }
    };

    const openModal = (type: ModalType, blog?: BlogType) => {
        setModalType(type);
        if (blog) {
            setSelectedBlog(blog);
            setBlogForm({ ...blog });
        } else {
            setBlogForm({ title: "", excerpt: "", content: "", coverImage: "", published: true });
        }
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedBlog(null);
        setBlogForm(null);
    };

    if (loading)
        return <p className="text-center mt-10 text-gray-400 animate-pulse">Loading blogs...</p>;

    return (
        <div className="p-4 min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white flex flex-col items-center relative">
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

            <h1 className="text-4xl font-bold text-pink-400 mb-6 drop-shadow-lg">My Blogs</h1>

            {/* Create Button */}
            <motion.button
                onClick={() => openModal("create")}
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
                        {blog.coverImage && (
                            <img src={blog.coverImage} alt={blog.title} className="w-full h-48 object-cover" />
                        )}
                        <div className="p-4 flex flex-col gap-2">
                            <h3 className="text-xl font-semibold text-pink-300">{blog.title}</h3>
                            <p className="text-gray-300 text-sm line-clamp-3">{blog.excerpt}</p>
                            <div className="flex gap-2 mt-2 flex-wrap">
                                <button
                                    onClick={() => openModal("view", blog)}
                                    className="flex items-center gap-1 px-3 py-1 bg-pink-400 rounded hover:bg-pink-500 transition"
                                >
                                    <Eye className="w-4 h-4" /> View
                                </button>
                                <button
                                    onClick={() => openModal("edit", blog)}
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

            {/* Modal */}
            <AnimatePresence>
                {modalType && blogForm && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 1 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 max-w-2xl w-full shadow-2xl border border-pink-500/20"
                        >
                            {modalType === "view" && selectedBlog && (
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-2xl font-bold text-pink-400">{selectedBlog.title}</h2>
                                    {selectedBlog.coverImage && (
                                        <img src={selectedBlog.coverImage} className="w-full h-48 object-cover rounded" />
                                    )}
                                    <p className="text-gray-300">{selectedBlog.content}</p>
                                    <button
                                        onClick={closeModal}
                                        className="mt-4 bg-pink-400 hover:bg-pink-500 text-black py-2 rounded-md"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}

                            {(modalType === "edit" || modalType === "create") && (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <h2 className="text-2xl font-bold text-pink-400">
                                        {modalType === "edit" ? "Edit Blog" : "Create Blog"}
                                    </h2>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={blogForm.title}
                                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                        className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-pink-500/40"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Excerpt"
                                        value={blogForm.excerpt}
                                        onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                                        className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-pink-500/40"
                                        required
                                    />
                                    <textarea
                                        rows={5}
                                        placeholder="Content"
                                        value={blogForm.content}
                                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                                        className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-pink-500/40"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Cover Image URL"
                                        value={blogForm.coverImage}
                                        onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                                        className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-pink-500/40"
                                    />
                                    <label className="flex items-center gap-2 text-gray-300 mt-2">
                                        <input
                                            type="checkbox"
                                            checked={blogForm.published}
                                            onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                                            className="w-4 h-4 accent-pink-400"
                                        />
                                        Published
                                    </label>
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            type="submit"
                                            className={`flex-1 py-2 px-4 rounded-md font-semibold ${modalType === "edit" ? "bg-yellow-400 hover:bg-yellow-500" : "bg-pink-400 hover:bg-pink-500"
                                                }`}
                                        >
                                            {modalType === "edit" ? "Update" : "Create"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
