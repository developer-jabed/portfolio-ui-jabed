"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Database, ServerCog, Layers, Github, Linkedin, Mail } from "lucide-react";

// Horizontal text slider component
const AboutTextSlider = () => {
  const sliderTexts = [
    "Hello, I am Jabed",
    "I am a Fullstack Developer",
    "I create modern apps",
    "I love building web solutions with MERN & Next.js",
  ];

  return (
    <div className="overflow-hidden w-full mt-8 mb-12">
      <motion.div
        className="flex gap-10 whitespace-nowrap text-2xl md:text-3xl font-semibold text-pink-400"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 15,
          ease: "linear",
        }}
      >
        {sliderTexts.map((text, index) => (
          <span key={index} className="mx-4">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const techStack = [
  { name: "React.js", icon: <Code2 className="w-6 h-6 text-pink-400" /> },
  { name: "Next.js", icon: <Code2 className="w-6 h-6 text-purple-400" /> },
  { name: "TypeScript", icon: <Terminal className="w-6 h-6 text-blue-400" /> },
  { name: "Node.js", icon: <ServerCog className="w-6 h-6 text-green-400" /> },
  { name: "Express", icon: <ServerCog className="w-6 h-6 text-gray-400" /> },
  { name: "MongoDB", icon: <Database className="w-6 h-6 text-green-500" /> },
  { name: "PostgreSQL", icon: <Database className="w-6 h-6 text-blue-600" /> },
  { name: "Docker", icon: <Layers className="w-6 h-6 text-cyan-400" /> },
  { name: "AWS", icon: <ServerCog className="w-6 h-6 text-orange-400" /> },
];

const AboutPage = () => {
  return (
    <div className="bg-black text-white min-h-screen py-20 px-6 md:px-16 overflow-hidden relative">
      {/* Background floating orbs */}
      <motion.div
        className="absolute w-72 h-72 bg-pink-600/20 rounded-full blur-3xl top-10 left-10"
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl bottom-10 right-10"
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-6"
      >
        💤 The developer is sleeping…
      </motion.h1>

      {/* Horizontal Text Slider */}
      <AboutTextSlider />

      {/* Tech Stack Section */}
      <section className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          My Tech Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-pink-500/30 hover:bg-pink-500/10 transition backdrop-blur-sm cursor-pointer text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              {tech.icon} <span>{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact / Social Links */}
      <section className="text-center mt-12">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          Let s Connect
        </h2>
        <motion.div
          className="flex justify-center gap-6 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Github className="w-8 h-8 hover:text-pink-400 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Linkedin className="w-8 h-8 hover:text-purple-400 transition" />
          </a>
          <a href="mailto:youremail@example.com">
            <Mail className="w-8 h-8 hover:text-blue-400 transition" />
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-800 mt-16">
        © {new Date().getFullYear()} — Built with ❤️ by{" "}
        <span className="text-pink-400 font-semibold">Jabed Islam</span>
      </footer>
    </div>
  );
};

export default AboutPage;
