'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

const VisualSection = () => {
  return (
    <section className="relative h-[80vh] bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop"
            alt="Top View Luxury Car"
            fill
            className="object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </motion.div>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-8"
        >
          Unmatched Elegance.
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100px' }}
          viewport={{ once: true }}
          className="h-1 bg-accent mb-8"
        />
        <p className="text-white/40 max-w-lg mx-auto text-lg">
          Experience the pinnacle of automotive engineering and design. Our fleet represents the absolute best the world has to offer.
        </p>
      </div>
    </section>
  );
};

export default VisualSection;
