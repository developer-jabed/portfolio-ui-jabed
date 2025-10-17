"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Terminal,
  Database,
  ServerCog,
  Layers,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
} from "lucide-react";
import Image from "next/image";

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

// Enhanced tech stack with experience/usage text
const techStack = [
  {
    name: "React.js",
    icon: <Code2 className="w-6 h-6 text-pink-400" />,
    experience: "Built interactive UI components and SPA applications.",
  },
  {
    name: "Next.js",
    icon: <Code2 className="w-6 h-6 text-purple-400" />,
    experience: "Implemented SSR, SSG, API routes, and optimized performance.",
  },
  {
    name: "TypeScript",
    icon: <Terminal className="w-6 h-6 text-blue-400" />,
    experience: "Ensured type safety and scalable code architecture.",
  },
  {
    name: "Node.js",
    icon: <ServerCog className="w-6 h-6 text-green-400" />,
    experience: "Developed backend APIs and server-side logic for apps.",
  },
  {
    name: "Express",
    icon: <ServerCog className="w-6 h-6 text-gray-400" />,
    experience: "Built RESTful APIs, handled routing and middleware.",
  },
  {
    name: "MongoDB",
    icon: <Database className="w-6 h-6 text-green-500" />,
    experience: "Managed NoSQL databases for dynamic data storage.",
  },
  {
    name: "PostgreSQL",
    icon: <Database className="w-6 h-6 text-blue-600" />,
    experience: "Designed relational database schemas and optimized queries.",
  },
  {
    name: "Docker",
    icon: <Layers className="w-6 h-6 text-cyan-400" />,
    experience: "Containerized apps for deployment and consistent environments.",
  },
  {
    name: "AWS",
    icon: <ServerCog className="w-6 h-6 text-orange-400" />,
    experience: "Hosted applications and used cloud services for scalability.",
  },
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

      {/* Header Section */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-6"
      >
        💤 The Developer is Sleeping…
      </motion.h1>

      <AboutTextSlider />

      {/* Profile Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border-2 border-pink-400/40 shadow-lg shadow-pink-500/10"
        >
          <Image
            src="https://i.postimg.cc/T3LZY1MR/IMG-1189.jpg"
            alt="Jabed Islam"
            width={250}
            height={250}
            className="rounded-2xl object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-xl text-center md:text-left"
        >
          <h2 className="text-3xl font-bold mb-3 text-pink-400">
            Jabed Islam
          </h2>
          <p className="text-gray-300 mb-4">
            I’m a passionate Fullstack Developer specializing in building
            modern, scalable, and visually appealing web applications. I love
            crafting beautiful user interfaces and developing secure, efficient
            backend systems with Node.js, Express, and MongoDB.
          </p>
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <MapPin className="text-pink-400 w-5 h-5" />
            <span className="text-gray-400">Dhaka, Bangladesh</span>
          </div>

          <a
            href="/Jabed_Islam_CV.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-pink-500/30 hover:bg-pink-500/10 transition backdrop-blur-sm text-pink-400 font-medium"
          >
            <Download className="w-5 h-5" /> Download CV
          </a>
        </motion.div>
      </section>

      {/* Tech Stack Section with cards */}
      <section className="text-center mb-12 mt-16">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          My Tech Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              className="bg-gray-900/50 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-4 w-60 flex flex-col items-center gap-3 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              {tech.icon}
              <h3 className="font-semibold text-pink-400">{tech.name}</h3>
              <p className="text-gray-300 text-sm text-center">{tech.experience}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact / Social Links */}
      <section className="text-center mt-12">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          Let’s Connect
        </h2>
        <motion.div
          className="flex justify-center gap-6 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://github.com/developer-jabed"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="w-8 h-8 hover:text-pink-400 transition" />
          </a>
          <a
            href="https://www.linkedin.com/in/jabed-islam-59ba3b365/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="w-8 h-8 hover:text-purple-400 transition" />
          </a>
          <a href="mailto:jabed1780@gmail.com">
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
