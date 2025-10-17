"use client";

import Hero from "@/components/modules/Home/Hero";
import { motion } from "framer-motion";
import { Code2, Github, Linkedin, Mail, Star, Database, ServerCog, Terminal, Layers } from "lucide-react";

export default function HomePage() {
  const techStack = [
    { name: "React.js", icon: <Code2 className="w-5 h-5 text-pink-400" /> },
    { name: "Next.js", icon: <Code2 className="w-5 h-5 text-purple-400" /> },
    { name: "TypeScript", icon: <Terminal className="w-5 h-5 text-blue-400" /> },
    { name: "Node.js", icon: <ServerCog className="w-5 h-5 text-green-400" /> },
    { name: "Express", icon: <ServerCog className="w-5 h-5 text-gray-400" /> },
    { name: "MongoDB", icon: <Database className="w-5 h-5 text-green-500" /> },
    { name: "PostgreSQL", icon: <Database className="w-5 h-5 text-blue-600" /> },
    { name: "Docker", icon: <Layers className="w-5 h-5 text-cyan-400" /> },
    { name: "AWS", icon: <ServerCog className="w-5 h-5 text-orange-400" /> },
    { name: "GSAP & Framer Motion", icon: <Code2 className="w-5 h-5 text-pink-400" /> },
  ];

  const featuredProjects = [
    {
      title: "Portfolio Website",
      description:
        "A modern portfolio showcasing sleek animations, dynamic content, and responsive UI.",
      repoUrl: "https://github.com/developer-jabed/portfolio",
      liveUrl: "https://portfolio-jabed.vercel.app",
    },
    {
      title: "Food Delivery App",
      description:
        "Fullstack MERN app with JWT authentication, cart functionality, and review system.",
      repoUrl: "https://github.com/developer-jabed/food-delivery",
      liveUrl: "https://food-delivery-jabed.vercel.app",
    },
    {
      title: "Blog Platform",
      description:
        "A blogging platform with CRUD features, user authentication, and real-time updates.",
      repoUrl: "https://github.com/developer-jabed/blog-platform",
      liveUrl: "https://blog-platform-jabed.vercel.app",
    },
  ];

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="relative py-28 px-6 md:px-16 bg-gradient-to-b from-black via-[#140404] to-[#1a0a0a] text-center">
        <motion.div
          initial={{ opacity: 1, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="max-w-3xl mx-auto text-gray-300 leading-relaxed text-lg">
            Hi, I’m <span className="text-pink-400 font-semibold">Jabed Islam</span> — a
            passionate <span className="text-red-400">Fullstack Developer</span> working with
            <span className="text-pink-400 font-semibold"> React, Next.js, Node.js, MongoDB, PostgreSQL</span>.
            I craft modern, interactive, and performant web applications.
          </p>
        </motion.div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-8 md:px-16 text-center bg-black/90">
        <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-500">
          Tech Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-pink-500/40 hover:bg-pink-500/10 transition text-gray-300 backdrop-blur-sm cursor-pointer"
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              {tech.icon}
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-28 px-6 md:px-16 bg-gradient-to-b from-black to-[#190505] text-center">
        <h2 className="text-4xl font-bold mb-14 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={i}
              className="group bg-black/40 border border-pink-500/30 p-6 rounded-2xl hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold mb-3 text-pink-400">{project.title}</h3>
              <p className="text-gray-400">{project.description}</p>
              <div className="mt-6 flex justify-center gap-6 text-gray-400">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-pink-400 transition"
                >
                  <Github className="w-6 h-6" /> <span className="text-sm">GitHub</span>
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-pink-400 transition"
                  >
                    <Star className="w-6 h-6" /> <span className="text-sm">Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-28 text-center bg-gradient-to-r from-pink-900/20 to-red-900/20 backdrop-blur-sm">
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-3xl font-light text-gray-200 max-w-4xl mx-auto leading-relaxed"
        >
          “Every great developer you know got there by solving problems they
          were unqualified to solve — until they did.”
        </motion.blockquote>
        <p className="mt-4 text-pink-400 font-semibold">— Patrick McKenzie</p>
      </section>

      {/* Contact */}
      <section className="py-24 text-center bg-black">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent"
        >
          Let’s Connect
        </motion.h2>
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-6 mt-8"
        >
          <a href="https://github.com/developer-jabed" target="_blank" rel="noreferrer">
            <Github className="w-8 h-8 hover:text-pink-400 transition" />
          </a>
          <a href="https://www.linkedin.com/in/jabed-islam-59ba3b365/" target="_blank" rel="noreferrer">
            <Linkedin className="w-8 h-8 hover:text-pink-400 transition" />
          </a>
          <a href="mailto:jabed1780@gmail.com">
            <Mail className="w-8 h-8 hover:text-pink-400 transition" />
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} — Built with ❤️ by{" "}
        <span className="text-pink-400 font-semibold">Jabed Islam</span>
      </footer>
    </div>
  );
}
