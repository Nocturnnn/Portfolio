'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

const brands = [
  { name: 'Bugatti', logo: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Ferrari', logo: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Lamborghini', logo: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Jaguar', logo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Bentley', logo: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2070&auto=format&fit=crop' },
];

const BrandShowcase = () => {
  const [activeBrand, setActiveBrand] = useState('Lamborghini');

  return (
    <section className="py-32 px-8 md:px-16 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-[1px] bg-accent" />
          <span className="text-xs font-bold tracking-widest text-accent uppercase">Arrive in Style</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
           <div className="lg:col-span-8">
              <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tighter">
                Choose from our prestigious collection of world-class brands.
              </h2>
           </div>
           <div className="lg:col-span-4 flex justify-end gap-4">
              <button className="text-sm font-bold text-accent border-b border-accent pb-1">Rent a car</button>
              <button className="text-sm font-bold text-white/40 hover:text-white transition-colors">Buy a car</button>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              whileHover={{ y: -10 }}
              onClick={() => setActiveBrand(brand.name)}
              className={`relative h-64 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 border-2 ${
                activeBrand === brand.name ? 'border-accent' : 'border-white/5'
              }`}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className={`object-cover transition-transform duration-700 ${activeBrand === brand.name ? 'scale-110' : 'scale-100 opacity-40'}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className={`font-display text-xl font-bold ${activeBrand === brand.name ? 'text-accent' : 'text-white'}`}>
                  {brand.name}
                </p>
              </div>
              {activeBrand === brand.name && (
                <motion.div 
                  layoutId="glow"
                  className="absolute inset-0 bg-accent/10 blur-xl"
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-8">
           <p className="text-white/40 text-center max-w-2xl">
             No automotive brand is as alluring as {activeBrand}. Its scissor doors, V10 and V12 engines, howling exhaust notes — their exotic models are the very definition of ostentatious.
           </p>
           <button className="bg-accent text-black px-10 py-4 rounded-full font-bold hover:bg-white transition-all duration-300">
             Buy a {activeBrand}
           </button>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
