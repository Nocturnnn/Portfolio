'use client';

import React from 'react';
import { motion } from 'motion/react';

const About = () => {
  return (
    <section className="py-32 px-8 md:px-16 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-accent" />
            <span className="text-xs font-bold tracking-widest text-accent uppercase">About Us</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-8">
            From exotic sports cars to luxury sedans and SUVs, our collection offers an exceptional selection and personalised service.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl">
            We provide selection of finest luxury cars to hire such as various types of Mercedes Benz, Hummer, BMW, Porsche, Alphard, Vellfire, Mini Cooper, Fortuner, Land Cruiser, and variety Toyota fine cars. It&apos;s all here to make your delightful days.
          </p>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center gap-12"
        >
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Curated Luxury Vehicles</h3>
            <p className="text-white/40">Every vehicle in our fleet is handpicked for its performance, style, and prestige.</p>
            <div className="w-full h-px bg-white/10" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Trusted Service</h3>
            <p className="text-white/40">Our team of experts ensures a seamless experience from reservation to return.</p>
            <div className="w-full h-px bg-white/10" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Premium Experience</h3>
            <p className="text-white/40">We don&apos;t just rent cars; we deliver unforgettable moments on the road.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
