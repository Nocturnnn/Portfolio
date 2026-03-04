'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pt-32 overflow-hidden">
      {/* Background Car Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Sports Car"
          fill
          className="object-cover object-center opacity-80"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 pb-20 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12"
        >
          <span className="font-mono text-accent text-lg mb-4 block">001</span>
          <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter max-w-2xl">
            Rent the luxury.<br />
            <span className="text-white/40">Own the thrill.</span>
          </h1>
        </motion.div>

        {/* Wheel Glow Effect (Stylistic) */}
        <div className="absolute right-[15%] bottom-[25%] hidden lg:block">
           <motion.div 
             animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="w-64 h-64 rounded-full border-4 border-accent/30 blur-xl"
           />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border-t border-white/10">
          <button className="group flex items-center justify-between p-8 hover:bg-accent transition-all duration-500">
            <span className="font-display text-2xl font-bold group-hover:text-black">Rent a car</span>
            <ArrowRight className="w-6 h-6 group-hover:text-black transform group-hover:translate-x-2 transition-transform" />
          </button>
          <button className="group flex items-center justify-between p-8 hover:bg-white transition-all duration-500">
            <span className="font-display text-2xl font-bold group-hover:text-black">Buy a car</span>
            <ArrowRight className="w-6 h-6 group-hover:text-black transform group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      {/* Subtle Floor Reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent opacity-50" />
    </section>
  );
};

export default Hero;
