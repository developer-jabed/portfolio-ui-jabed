"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Folder, Github, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Portfolio Website",
        description:
            "A modern portfolio website built with Next.js, Tailwind, and Framer Motion.",
        github: "#",
        live: "#",
    },
    {
        title: "E-commerce App",
        description:
            "Full-stack MERN app with authentication, cart, and payment integration.",
        github: "#",
        live: "#",
    },
    {
        title: "Blog System",
        description:
            "Next.js blog with dynamic routes, markdown support, and CMS integration.",
        github: "#",
        live: "#",
    },
];

export default function ProjectsCart() {
    const projectRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        gsap.from(projectRefs.current, {
            y: 50,
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: projectRefs.current,
                start: "top 80%",
            },
        });
    }, []);

    return (
        <div className="bg-black text-white min-h-screen px-6 md:px-16 py-24">
            {/* Page Heading */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-12"
            >
                My Projects
            </motion.h1>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-3 gap-10">
                {projects.map((project, idx) => (
                    <div
                        key={project.title}
                        ref={(el) => {
                            if (el) projectRefs.current[idx] = el;
                        }}
                        className="group bg-gray-900/50 p-6 rounded-2xl border border-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Folder className="w-6 h-6 text-pink-400" />
                            <h2 className="text-2xl font-semibold">{project.title}</h2>
                        </div>
                        <p className="text-gray-300 mb-6">{project.description}</p>
                        <div className="flex gap-4">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition"
                            >
                                <Github className="w-5 h-5" /> Github
                            </a>
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition"
                            >
                                <ExternalLink className="w-5 h-5" /> Live Demo
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
