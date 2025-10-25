"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Code2, Star, BookOpen } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GitHubEvent {
    id: string;
    type: string;
    repo: {
        name: string;
        url: string;
    };
    created_at: string;
}

export default function RecentActivity() {
    const [events, setEvents] = useState<GitHubEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const timelineRef = useRef<HTMLDivElement>(null);

    const username = "developer-jabed"; // your GitHub username

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch(
                    `https://api.github.com/users/${username}/events/public`
                );
                const data = await res.json();
                setEvents(data.slice(0, 5)); // latest 5 events
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchEvents();
    }, [username]);

    // GSAP animations
    useEffect(() => {
        if (!timelineRef.current) return;

        const items = timelineRef.current.querySelectorAll(".timeline-item");
        const dots = timelineRef.current.querySelectorAll(".timeline-dot");

        // Cards slide in
        gsap.from(items, {
            opacity: 1,
            x: -50,
            stagger: 0.3,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            },
        });

        // Dots floating animation
        dots.forEach((dot) => {
            gsap.to(dot, {
                y: "-=10",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                duration: 1.5 + Math.random(), // slight variation
            });
        });

        // Timeline line glow pulse
        gsap.to(timelineRef.current.querySelector(".timeline-line"), {
            boxShadow: "0 0 20px rgba(0,255,255,0.5)",
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: "sine.inOut",
        });
    }, [events]);

    if (loading) {
        return (
            <div className="flex justify-center py-20 text-cyan-400 text-lg font-medium animate-pulse">
                Fetching GitHub activity...
            </div>
        );
    }

    const getIconByEventType = (type: string) => {
        switch (type) {
            case "PushEvent":
                return <Code2 className="w-7 h-7 text-cyan-400" />;
            case "CreateEvent":
                return <Star className="w-7 h-7 text-yellow-400" />;
            case "PullRequestEvent":
                return <BookOpen className="w-7 h-7 text-pink-400" />;
            default:
                return <Github className="w-7 h-7 text-gray-400" />;
        }
    };

    return (
        <section className="py-24 bg-gradient-to-b from-black to-[#190505] text-white relative overflow-hidden">
            {/* Background floating circles */}
            <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-cyan-500/20 rounded-full filter blur-3xl animate-bounce-slow" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-pink-500/20 rounded-full filter blur-3xl animate-bounce-slow" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.h2
                    className="text-5xl font-bold text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Recent <span className="text-cyan-400">GitHub Activity</span>
                </motion.h2>

                {/* Timeline line */}
                <div
                    ref={timelineRef}
                    className="relative border-l-2 border-cyan-700 pl-10 timeline-line"
                >
                    {events.map((event, index) => (
                        <div key={event.id} className="timeline-item mb-12 relative">
                            {/* Timeline dot */}
                            <div className="timeline-dot absolute -left-5 top-1 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center shadow-lg">
                                {getIconByEventType(event.type)}
                            </div>

                            {/* Card */}
                            <div className="bg-[#1e293b]/70 p-6 rounded-xl shadow-lg border border-cyan-700 hover:scale-105 transition-transform duration-300">
                                <p className="font-semibold text-lg">
                                    {event.type.replace("Event", "")} on{" "}
                                    <a
                                        href={`https://github.com/${event.repo.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-cyan-400 hover:underline"
                                    >
                                        {event.repo.name}
                                    </a>
                                </p>
                                <p className="text-gray-300 text-sm mt-1">
                                    {new Date(event.created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
