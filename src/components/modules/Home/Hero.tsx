"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);

  const texts = [
    "👋 Hello, I’m Jabed",
    "💻 I’m a Fullstack Developer",
    "🚀 I create modern web apps",
  ];
  const [index, setIndex] = useState(0);

  // GSAP entry animation for hero content
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(headlineRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      })
        .from(
          subRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          btnRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Text slider loop
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2500); // Change text every 2.5s
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div
      ref={heroRef}
      className="relative flex flex-col items-center justify-center h-screen overflow-hidden text-white"
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #2b0707 100%)",
        }}
      />

      {/* Animated Glow Orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-pink-500/30 rounded-full blur-3xl mix-blend-overlay"
        animate={{
          x: [0, 150, -100, 0],
          y: [0, -80, 80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl mix-blend-overlay"
        animate={{
          x: [0, -100, 120, 0],
          y: [0, 80, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <section className="relative z-10 text-center px-6">
        {/* Sparkles Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex justify-center mb-6"
        >
          <Sparkles className="w-8 h-8 text-pink-400 drop-shadow-lg" />
        </motion.div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-pink-400 via-red-500 to-orange-400 bg-clip-text text-transparent drop-shadow-lg"
        >
          Read. Learn. Create. <br className="hidden md:block" />
          Code That Inspires.
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-300"
        >
          I’m <span className="text-pink-400 font-semibold">Jabed Islam</span>,
          a passionate web developer crafting modern experiences with React,
          Next.js, and GSAP. Dive into my world of code and creativity.
        </p>

        {/* CTA Button */}
        <div ref={btnRef} className="mt-10 flex justify-center">
          <Link
            href="/blogs"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-medium rounded-xl border border-pink-500 text-pink-300 overflow-hidden transition-all duration-300 hover:bg-pink-500 hover:text-white"
          >
            <span className="z-10 flex items-center gap-2">
              Explore Blogs{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
        </div>
      </section>

      {/* 🔥 Infinite Text Slider */}
      <div className="absolute bottom-10 overflow-hidden w-full text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-lg md:text-xl font-medium text-gray-400"
          >
            {texts[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
