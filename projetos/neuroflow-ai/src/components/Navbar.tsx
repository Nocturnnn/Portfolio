"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          NeuroFlow AI
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <Link href="#features" className="hover:text-white transition">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-white transition">
            Pricing
          </Link>
          <Link href="#about" className="hover:text-white transition">
            About
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/20">
            Get Started
          </button>
        </div>
      </div>
    </motion.header>
  );
}