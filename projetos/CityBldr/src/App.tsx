/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Search,
  Bell,
  MapPin,
  Plus,
  Minus,
  Home,
  LayoutGrid,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Globe,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const chartData = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 55 },
  { name: "Mar", value: 48 },
  { name: "Apr", value: 70 },
  { name: "May", value: 85 },
  { name: "Jun", value: 94 },
];

const FilterButton = ({ label, value }: { label: string; value: string }) => (
  <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-white/40 hover:bg-white/60 border border-white/20 rounded-full transition-all whitespace-nowrap">
    <span className="text-black/40">{label}:</span>
    <span className="text-black">{value}</span>
    <ChevronDown size={14} className="text-black/40" />
  </button>
);

export default function App() {
  const [viewMode, setViewMode] = useState<"2D" | "3D">("3D");

  return (
    <div className="relative w-full min-h-screen bg-[#E4E3E0] overflow-x-hidden selection:bg-black selection:text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center px-4 md:px-0">
        <div className="relative w-full h-[60vh] md:h-full max-w-6xl md:max-h-[80vh] flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            src="https://picsum.photos/seed/architecture/1600/1200"
            alt="Urban Visualization"
            className="w-full h-full object-cover rounded-[28px] md:rounded-[40px] shadow-2xl opacity-80"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(228,227,224,0.4)_100%)] rounded-[28px] md:rounded-[40px]" />
        </div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative md:absolute md:top-8 left-0 right-0 z-20 px-4 md:px-12 pt-6 md:pt-0 flex flex-col md:flex-row gap-6 md:gap-0 items-start md:items-center justify-between"
      >
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/40 shadow-soft">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <TrendingUp size={18} className="text-white" />
          </div>
          <span className="font-bold text-sm uppercase tracking-tight">
            CITYBLDR
          </span>
          <div className="flex items-center gap-2 ml-4">
            <Bell
              size={16}
              className="text-black/40 hover:text-black transition-colors"
            />
            <MapPin
              size={16}
              className="text-black/40 hover:text-black transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <FilterButton label="Property Type" value="Apartments" />
          <FilterButton label="Score" value="100+" />
          <FilterButton label="Last Sold" value="From 2021" />
          <FilterButton label="Lot Size" value="10+ Units" />
        </div>
      </motion.header>

      {/* Content Wrapper */}
      <div className="relative z-20 px-4 md:px-0 pb-32 md:pb-0 mt-6 md:mt-0">
        {/* Left Card */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative md:absolute md:top-40 md:left-12 w-full md:w-80 glass p-8 rounded-[28px] md:rounded-[32px] shadow-soft mb-6 md:mb-0"
        >
          <p className="text-xs font-bold text-black/40 uppercase tracking-widest mb-1">
            Target Segment
          </p>
          <h2 className="text-2xl font-medium tracking-tight mb-6">
            2-Bedroom Apartments
          </h2>

          <div className="mb-6">
            <p className="text-xs text-black/40 mb-1">Average Score</p>
            <h3 className="text-3xl font-semibold">94</h3>
          </div>

          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#000"
                  fill="#000"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="relative md:absolute md:top-40 md:right-20 flex flex-col gap-8 w-full md:w-auto">
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full md:w-[380px] glass p-8 rounded-[28px] md:rounded-[32px] shadow-soft"
          >
            <p className="text-xs font-bold text-black/40 uppercase tracking-widest mb-1">
              Property Details
            </p>
            <h3 className="text-xl font-medium mb-4">
              Modern Residential Complex
            </h3>

            <div className="flex justify-between text-sm text-black/60 mb-4">
              <span>Units</span>
              <span>124</span>
            </div>

            <div className="flex justify-between text-sm text-black/60 mb-4">
              <span>Lot Area</span>
              <span>3,200 m²</span>
            </div>

            <div className="flex justify-between text-sm text-black/60">
              <span>Completion</span>
              <span>2025</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Construction Velocity */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative md:absolute md:bottom-12 md:right-12 z-20 w-full md:w-80 glass p-8 rounded-[28px] md:rounded-[32px] shadow-soft mx-4 md:mx-0 mb-24 md:mb-0"
      >
        <p className="text-xs font-bold text-black/40 uppercase tracking-widest mb-1">
          Construction Velocity
        </p>
        <h3 className="text-2xl font-semibold mb-4">+18% YoY</h3>
      </motion.div>

      {/* Floating Controls */}
      <div className="hidden md:flex absolute left-12 bottom-40 z-20 flex-col gap-3">
        <button className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-soft hover:bg-white transition-all">
          <Plus size={18} />
        </button>
        <button className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-soft hover:bg-white transition-all">
          <Minus size={18} />
        </button>
        <button
          onClick={() => setViewMode(viewMode === "2D" ? "3D" : "2D")}
          className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-soft hover:bg-white transition-all text-xs font-bold"
        >
          {viewMode}
        </button>
      </div>

      {/* Bottom Nav */}
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed md:absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-3 rounded-full border border-white/40 shadow-soft"
      >
        <Search size={20} />
        <Home size={20} />
        <LayoutGrid size={20} />
        <Calendar size={20} />
        <CheckCircle2 size={20} />
        <TrendingUp size={20} />
        <Globe size={20} />
      </motion.nav>
    </div>
  );
}
