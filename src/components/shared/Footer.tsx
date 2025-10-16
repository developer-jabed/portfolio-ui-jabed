"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden pt-16 pb-10 bg-black text-white">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute w-64 h-64 bg-pink-500/30 rounded-full blur-3xl mix-blend-overlay top-[-50px] left-[-50px]"
        animate={{ x: [0, 50, -30, 0], y: [0, -50, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl mix-blend-overlay bottom-[-100px] right-[-80px]"
        animate={{ x: [0, -60, 40, 0], y: [0, 60, -40, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Footer Content */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left"
        >
          {/* Left: Logo + Branding */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/">
              <Image
                src="https://i.postimg.cc/2yCFrQfq/jab-logo-jab-letter-jab-letter-logo-design-initials-jab-logo-linked-with-circle-and-uppercase-monogr.jpg"
                width={80}
                height={80}
                alt="Jabed Portfolio Logo"
                className="rounded-full"
              />
            </Link>
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
              Jabed Islam
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              MERN Stack Developer | Fullstack Web Applications
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/projects", label: "Projects" },
              { href: "/blogs", label: "Blogs" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <motion.div key={link.href} whileHover={{ scale: 1.1 }}>
                <Link
                  href={link.href}
                  className="relative text-gray-400 hover:text-pink-400 transition-all font-medium"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-pink-400 rounded-full group-hover:w-full transition-all"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right: Contact Icons */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                whileHover={{ scale: 1.2 }}
              >
                <Github className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                whileHover={{ scale: 1.2 }}
              >
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
              </motion.a>
              <motion.a
                href="mailto:jabed@example.com"
                whileHover={{ scale: 1.2 }}
              >
                <Mail className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
              </motion.a>
            </div>
            <p className="text-sm text-gray-500">
              © {currentYear} Jabed Islam. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
