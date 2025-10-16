"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import gsap from "gsap";

export default function ContactPage() {
    const contactRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contactRef.current) {
            gsap.from(contactRef.current.children, {
                y: 50,
                opacity: 1,
                stagger: 0.2,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: contactRef.current,
                    start: "top 80%",
                },
            });
        }
    }, []);

    return (
        <div className="bg-black text-white min-h-screen px-6 md:px-16 py-24">
            {/* Heading */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-12"
            >
                Get in Touch
            </motion.h1>

            {/* Contact Methods */}
            <div
                ref={contactRef}
                className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto"
            >
                <div className="flex flex-col gap-6 bg-gray-900/50 p-8 rounded-2xl border border-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all">
                    <h2 className="text-2xl font-semibold text-pink-400 flex items-center gap-2">
                        <Mail className="w-6 h-6" /> Email
                    </h2>
                    <p className="text-gray-300">jabed1780@gmail.com</p>

                    <h2 className="text-2xl font-semibold text-pink-400 flex items-center gap-2">
                        <Linkedin className="w-6 h-6" /> LinkedIn
                    </h2>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-300 hover:text-pink-400 transition"
                    >
                        linkedin.com/in/yourprofile
                    </a>

                    <h2 className="text-2xl font-semibold text-pink-400 flex items-center gap-2">
                        <Github className="w-6 h-6" /> Github
                    </h2>
                    <a
                        href="https://github.com/developer-jabed"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-300 hover:text-pink-400 transition"
                    >
                        https://github.com/developer-jabed
                    </a>

                    <h2 className="text-2xl font-semibold text-pink-400 flex items-center gap-2">
                        <MapPin className="w-6 h-6" /> Location
                    </h2>
                    <p className="text-gray-300">Dinajpur, Bangladesh</p>
                </div>

                {/* Contact Form */}
                <div className="bg-gray-900/50 p-8 rounded-2xl border border-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all">
                    <h2 className="text-2xl font-semibold text-pink-400 mb-6">
                        Send a Message
                    </h2>
                    <form className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-pink-400 bg-black text-white"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-pink-400 bg-black text-white"
                        />
                        <textarea
                            rows={4}
                            placeholder="Your Message"
                            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-pink-400 bg-black text-white"
                        />
                        <button
                            type="submit"
                            className="mt-2 w-full bg-pink-400 text-black font-medium py-2 rounded-md hover:bg-pink-500 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
