/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Eye, Edit, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

interface ProjectType {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  liveUrl?: string;
  repoUrl?: string;
  features: string[];
}

export default function ProjectPage() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [editProject, setEditProject] = useState<ProjectType | null>(null);
  const [newProject, setNewProject] = useState<Partial<ProjectType> | null>(null);

  const limit = 5;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios.defaults.baseURL = "http://localhost:5000/api/v1";
    axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";
    axios.defaults.withCredentials = true;
  }, []);

  const fetchProjects = async (page: number) => {
    try {
      setLoading(true);
      const res = await axios.get(`/project/all-project?page=${page}&limit=${limit}`);
      setProjects(res.data.data);
      setTotalPages(Math.ceil(res.data.total / limit));
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`/project/delete/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("Project deleted successfully");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete project");
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProject) return;

    try {
      const payload = { 
        ...editProject, 
        features: typeof editProject.features === "string" ? editProject.features.split(",").map((f: string) => f.trim()) : editProject.features 
      };
      const res = await axios.patch(`/project/update/${editProject.id}`, payload);
      setProjects((prev) =>
        prev.map((p) => (p.id === editProject.id ? res.data.data : p))
      );
      setEditProject(null);
      toast.success("Project updated successfully");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update project");
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject?.title || !newProject?.description || !newProject?.slug) {
      toast.error("Title, slug, and description are required");
      return;
    }

    try {
      const payload = { 
        ...newProject, 
        features: typeof newProject.features === "string" ? newProject.features.split(",").map((f: string) => f.trim()) : newProject.features 
      };
      const res = await axios.post(`/project/create-project`, payload);
      setProjects((prev) => [res.data.data, ...prev]);
      setNewProject(null);
      toast.success("Project created successfully");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create project");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-400">Loading projects...</p>;

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white flex flex-col items-center relative">
      <h1 className="text-4xl font-bold text-pink-400 mb-6 drop-shadow-lg">All Projects</h1>

      {/* Create Button */}
      <motion.button
        onClick={() =>
          setNewProject({ title: "", slug: "", description: "", thumbnail: "", features: [], liveUrl: "", repoUrl: "" })
        }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 p-4 rounded-full shadow-lg shadow-pink-400/30 transition z-50"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-pink-500/30 hover:scale-[1.03] transition"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-pink-300">{project.title}</h3>
              <p className="text-gray-300 text-sm line-clamp-3">{project.description}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1 px-3 py-1 bg-pink-400 rounded hover:bg-pink-500 transition"
                >
                  <Eye className="w-4 h-4" /> View
                </button>
                <button
                  onClick={() => setEditProject(project)}
                  className="flex items-center gap-1 px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition"
                >
                  <Edit className="w-4 h-4" /> Update
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
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
        {(selectedProject || editProject || newProject) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setSelectedProject(null);
              setEditProject(null);
              setNewProject(null);
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
              {/* View Project */}
              {selectedProject && (
                <>
                  <h2 className="text-2xl font-bold text-pink-400 mb-4">
                    {selectedProject.title}
                  </h2>
                  <img
                    src={selectedProject.thumbnail}
                    alt={selectedProject.title}
                    className="w-full h-60 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-300 whitespace-pre-line">{selectedProject.description}</p>
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="text-pink-400 underline block">Live Demo</a>
                  )}
                  {selectedProject.repoUrl && (
                    <a href={selectedProject.repoUrl} target="_blank" rel="noreferrer" className="text-pink-400 underline block">Repository</a>
                  )}
                  {selectedProject.features.length > 0 && (
                    <p className="text-gray-300 mt-2">
                      Features: {selectedProject.features.join(", ")}
                    </p>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="mt-4 px-4 py-2 bg-pink-400 rounded hover:bg-pink-500 transition w-full"
                  >
                    Close
                  </button>
                </>
              )}

              {/* Edit Project */}
              {editProject && (
                <form onSubmit={handleUpdateSubmit} className="space-y-3">
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
                    ✏️ Edit Project
                  </h2>

                  <input
                    type="text"
                    value={editProject.title}
                    onChange={(e) => setEditProject({ ...editProject, title: e.target.value })}
                    placeholder="Title"
                    className="w-full p-2 rounded bg-gray-800 border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                  <input
                    type="text"
                    value={editProject.slug}
                    onChange={(e) => setEditProject({ ...editProject, slug: e.target.value })}
                    placeholder="Slug"
                    className="w-full p-2 rounded bg-gray-800 border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                  <textarea
                    value={editProject.description}
                    onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
                    placeholder="Description"
                    rows={4}
                    className="w-full p-2 rounded bg-gray-800 border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                  <input
                    type="text"
                    value={editProject.thumbnail}
                    onChange={(e) => setEditProject({ ...editProject, thumbnail: e.target.value })}
                    placeholder="Thumbnail URL"
                    className="w-full p-2 rounded bg-gray-800 border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="text"
                    value={editProject.liveUrl || ""}
                    onChange={(e) => setEditProject({ ...editProject, liveUrl: e.target.value })}
                    placeholder="Live URL"
                    className="w-full p-2 rounded bg-gray-800 border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="text"
                    value={editProject.repoUrl || ""}
                    onChange={(e) => setEditProject({ ...editProject, repoUrl: e.target.value })}
                    placeholder="Repo URL"
                    className="w-full p-2 rounded bg-gray-800 border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="text"
                    value={editProject.features.join(", ")}
                    onChange={(e) => setEditProject({ ...editProject, features: e.target.value.split(",") })}
                    placeholder="Features (comma-separated)"
                    className="w-full p-2 rounded bg-gray-800 border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500 transition w-full font-semibold"
                  >
                    Update Project
                  </button>
                </form>
              )}

              {/* Create Project */}
              {newProject && (
                <form onSubmit={handleCreateSubmit} className="space-y-3">
                  <h2 className="text-2xl font-bold text-pink-400 mb-4 text-center">
                    📝 Create New Project
                  </h2>

                  <input
                    type="text"
                    value={newProject.title || ""}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="Title"
                    className="w-full p-2 rounded bg-gray-800 border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    required
                  />
                  <input
                    type="text"
                    value={newProject.slug || ""}
                    onChange={(e) => setNewProject({ ...newProject, slug: e.target.value })}
                    placeholder="Slug"
                    className="w-full p-2 rounded bg-gray-800 border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    required
                  />
                  <textarea
                    value={newProject.description || ""}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Description"
                    rows={4}
                    className="w-full p-2 rounded bg-gray-800 border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    required
                  />
                  <input
                    type="text"
                    value={newProject.thumbnail || ""}
                    onChange={(e) => setNewProject({ ...newProject, thumbnail: e.target.value })}
                    placeholder="Thumbnail URL"
                    className="w-full p-2 rounded bg-gray-800 border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <input
                    type="text"
                    value={newProject.liveUrl || ""}
                    onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                    placeholder="Live URL"
                    className="w-full p-2 rounded bg-gray-800 border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <input
                    type="text"
                    value={newProject.repoUrl || ""}
                    onChange={(e) => setNewProject({ ...newProject, repoUrl: e.target.value })}
                    placeholder="Repo URL"
                    className="w-full p-2 rounded bg-gray-800 border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <input
                    type="text"
                    value={newProject.features?.join(", ") || ""}
                    onChange={(e) => setNewProject({ ...newProject, features: e.target.value.split(",") })}
                    placeholder="Features (comma-separated)"
                    className="w-full p-2 rounded bg-gray-800 border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-pink-500 rounded hover:bg-pink-600 transition w-full font-semibold"
                  >
                    Create Project
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
