"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, CheckCircle } from "lucide-react";
import gsap from "gsap";

export default function ContactPage() {
    const contactRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const content = formData.get("content") as string;

        try {
            setLoading(true);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, content }),
            });

            if (!res.ok) throw new Error("Failed to send message");

            form.reset();
            setShowModal(true);
            setTimeout(() => setShowModal(false), 3000);
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Something went wrong! Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-black text-white min-h-screen px-6 md:px-16 py-24 relative overflow-hidden">
            {/* Heading */}
            <motion.h1
                initial={{ opacity: 1, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-12"
            >
                Get in Touch
            </motion.h1>

            {/* Contact Methods + Form */}
            <div
                ref={contactRef}
                className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto"
            >
                {/* Contact Info */}
                <div className="flex flex-col gap-6 bg-gray-900/50 p-8 rounded-2xl border border-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all">
                    <h2 className="text-2xl font-semibold text-pink-400 flex items-center gap-2">
                        <Mail className="w-6 h-6" /> Email
                    </h2>
                    <p className="text-gray-300">jabed1780@gmail.com</p>

                    <h2 className="text-2xl font-semibold text-pink-400 flex items-center gap-2">
                        <Linkedin className="w-6 h-6" /> LinkedIn
                    </h2>
                    <a
                        href="https://www.linkedin.com/in/jabed-islam-59ba3b365/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-300 hover:text-pink-400 transition"
                    >
                        linkedin.com/in/jabeddev
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
                        github.com/developer-jabed
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
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-pink-400 bg-black text-white"
                            required
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Your Email"
                            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-pink-400 bg-black text-white"
                            required
                        />
                        <textarea
                            name="content"
                            rows={4}
                            placeholder="Your Message"
                            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-pink-400 bg-black text-white"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 w-full bg-pink-400 text-black font-medium py-2 rounded-md hover:bg-pink-500 transition disabled:opacity-70"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Fancy Thank You Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="bg-gray-900/80 border border-pink-500/40 rounded-2xl p-10 text-center shadow-lg shadow-pink-500/20"
                        >
                            <CheckCircle className="w-14 h-14 text-pink-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-semibold text-pink-400 mb-2">
                                Thank You!
                            </h2>
                            <p className="text-gray-300">
                                Your message has been sent successfully. <br />
                                I’ll get back to you soon 🚀
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
