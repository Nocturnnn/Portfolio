'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Zap, Gauge, Calendar } from 'lucide-react';

const FeaturedVehicle = () => {
  return (
    <section className="py-32 px-8 md:px-16 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Stage Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-accent/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Title and Image */}
        <div className="lg:col-span-8 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="text-accent font-mono text-sm tracking-widest uppercase mb-2 block">Type R</span>
            <h2 className="font-display text-8xl md:text-[12rem] font-black tracking-tighter text-white/5 leading-none">
              JAGUAR
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 -mt-20 md:-mt-40"
          >
            <Image
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop"
              alt="Jaguar F-Type"
              width={1000}
              height={600}
              className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Specs Icons */}
          <div className="flex flex-wrap gap-8 mt-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest">Horsepower</p>
                <p className="text-xl font-bold">450 <span className="text-xs font-normal text-white/40">HP</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                <Gauge className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest">Top Speed</p>
                <p className="text-xl font-bold">280 <span className="text-xs font-normal text-white/40">KM/H</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest">Year</p>
                <p className="text-xl font-bold">2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Description and CTA */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-4 space-y-8"
        >
          <h3 className="text-3xl font-display font-bold">Jaguar F-Type R</h3>
          <p className="text-white/50 leading-relaxed">
            Every trip with the accelerator is a joy ride. It&apos;s a special engine, a little talisman against boredom and the indignities of daily life. Experience the roar of the V8 and the precision of British engineering.
          </p>
          <button className="w-full py-4 border border-accent text-accent font-bold rounded-full hover:bg-accent hover:text-black transition-all duration-300">
            View details
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedVehicle;
