"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      
      {/* Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          Transforme Ideias em Execução com IA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-gray-400"
        >
          Automatize fluxos de trabalho, potencialize sua equipe e escale
          resultados com inteligência artificial de próxima geração.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-10 flex justify-center gap-6"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/20">
            Começar Agora
          </button>

          <button className="px-8 py-4 border border-gray-600 rounded-xl font-semibold hover:bg-white/5 transition duration-300">
            Ver Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}