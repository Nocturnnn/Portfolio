'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-16"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
          <span className="text-black font-bold text-xl italic">K</span>
        </div>
        <span className="font-display font-bold text-2xl tracking-tighter uppercase">Karzone</span>
      </div>

      <div className="hidden md:flex items-center gap-10">
        {['Reservations', 'Vehicles', 'Locations', 'Car Sales', 'For Business'].map((item) => (
          <Link 
            key={item} 
            href="#" 
            className="text-sm font-medium text-white/70 hover:text-accent transition-colors duration-300"
          >
            {item}
          </Link>
        ))}
      </div>

      <button className="bg-accent text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white transition-all duration-300 transform hover:scale-105 active:scale-95">
        Contact Us
      </button>
    </motion.nav>
  );
};

export default Navbar;
