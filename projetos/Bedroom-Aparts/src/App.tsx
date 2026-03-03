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
  Box,
  Home,
  LayoutGrid,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Globe,
  ChevronDown,
  User,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
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
  <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-white/40 hover:bg-white/60 border border-white/20 rounded-full transition-all">
    <span className="text-black/40">{label}:</span>
    <span className="text-black">{value}</span>
    <ChevronDown size={14} className="text-black/40" />
  </button>
);

export default function App() {
  const [viewMode, setViewMode] = useState<"2D" | "3D">("3D");

  return (
    <div className="relative w-full min-h-screen overflow-auto bg-[#E4E3E0] overflow-y-auto overflow-x-hidden selection:bg-black selection:text-white">
      {/* Background Visualization */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-4 lg:p-0">
        <div className="relative w-full h-[50vh] lg:h-full max-w-6xl lg:max-h-[80vh] flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="https://picsum.photos/seed/architecture/1600/1200"
            alt="Urban Visualization"
            className="w-full h-full object-cover rounded-[24px] lg:rounded-[40px] shadow-2xl opacity-80"
            referrerPolicy="no-referrer"
          />
          {/* Overlay Grid Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(228,227,224,0.4)_100%)] rounded-[24px] lg:rounded-[40px]" />
        </div>
      </div>

      {/* Top Navigation / Filters */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative lg:absolute top-0 lg:top-8 w-full z-20 px-4 lg:px-12 py-6 lg:py-0 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
      >
        <div className="flex items-center gap-8 w-full lg:w-auto">
          <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 lg:px-5 py-2 lg:py-3 rounded-2xl border border-white/40 shadow-soft w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0">
                <TrendingUp size={18} className="text-white" />
              </div>
              <span className="font-bold tracking-tight text-sm uppercase">
                CITYBLDR
              </span>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Bell
                size={16}
                className="text-black/40 cursor-pointer hover:text-black transition-colors"
              />
              <MapPin
                size={16}
                className="text-black/40 cursor-pointer hover:text-black transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
          <div className="flex items-center gap-3 shrink-0">
            <FilterButton label="Property Type" value="Apartments" />
            <FilterButton label="Score" value="100+" />
            <FilterButton label="Last Sold" value="From 2021" />
            <FilterButton label="Lot Size" value="10+ Units" />
          </div>
        </div>
      </motion.header>

      {/* Main Content Area - Responsive Grid */}
      <div
        className="
  relative 
  z-10 
  px-4 
  sm:px-6 
  lg:px-12 
  pt-6 
  lg:pt-0 
  pb-32 
  lg:pb-0 
  flex 
  flex-col 
  lg:block 
  gap-6
"
      >
        {/* Left Floating Card: Target Segment */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative lg:absolute lg:top-40 lg:left-12 w-full lg:w-80 glass p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] shadow-soft lg:animate-float"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1">
                Target Segment
              </p>
              <h2 className="text-xl lg:text-2xl font-medium tracking-tight">
                2-Bedroom Aparts
              </h2>
            </div>
            <div className="p-2 bg-white/40 rounded-full">
              <ExternalLink size={14} className="text-black/60" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <p className="text-[10px] text-black/40 uppercase font-bold mb-1">
                Anchor Units
              </p>
              <p className="text-lg font-mono">7</p>
            </div>
            <div>
              <p className="text-[10px] text-black/40 uppercase font-bold mb-1">
                Avg Sq Ft
              </p>
              <p className="text-lg font-mono">1,100</p>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="relative">
              <div className="flex justify-between items-end mb-2">
                <p className="text-[10px] text-black/40 uppercase font-bold">
                  Efficiency Ratio
                </p>
                <p className="text-sm font-mono">88%</p>
              </div>
              <div className="h-1 bg-black/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "88%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-black"
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between items-end mb-2">
                <p className="text-[10px] text-black/40 uppercase font-bold">
                  IRR Projection
                </p>
                <p className="text-sm font-mono">6.2%</p>
              </div>
              <div className="h-1 bg-black/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "62%" }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="h-full bg-black"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl lg:text-3xl font-medium tracking-tight">
                $ 3,900
              </p>
              <p className="text-[10px] text-black/40 font-bold uppercase">
                Monthly Rent
              </p>
            </div>
            <button className="px-4 lg:px-6 py-2 lg:py-3 bg-black text-white text-[10px] lg:text-xs font-bold rounded-full hover:scale-105 transition-transform">
              Make an Offer
            </button>
          </div>
        </motion.div>

        {/* Right Panel: Property Details */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative lg:absolute lg:top-20 lg:right-12 w-full lg:w-96 glass p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] shadow-soft"
        >
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("2D")}
                className={`p-2 rounded-full transition-all ${viewMode === "2D" ? "bg-black text-white" : "bg-white/40 text-black/40"}`}
              >
                <Minus size={16} />
              </button>
              <div className="bg-white/60 px-4 py-2 rounded-full border border-white/40 flex items-center gap-2">
                <Box size={14} />
                <span className="text-[10px] lg:text-xs font-bold">
                  2-Bedroom Aparts
                </span>
              </div>
              <button
                onClick={() => setViewMode("3D")}
                className={`p-2 rounded-full transition-all ${viewMode === "3D" ? "bg-black text-white" : "bg-white/40 text-black/40"}`}
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="p-2 bg-white/40 rounded-full">
              <ChevronDown size={14} className="text-black/60" />
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1">
              1108 33RD AVE
            </p>
            <h1 className="text-3xl lg:text-4xl font-medium tracking-tighter mb-4">
              #619012
              <br />
              RC-4 / 80-D
            </h1>

            <div className="flex gap-2">
              <span className="px-3 py-1 bg-yellow-400/20 text-yellow-700 text-[10px] font-bold rounded-full border border-yellow-400/30">
                In Progress
              </span>
              <span className="px-3 py-1 bg-green-400/20 text-green-700 text-[10px] font-bold rounded-full border border-green-400/30">
                Verified
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <p className="text-[10px] text-black/40 font-bold uppercase mb-1">
                Score
              </p>
              <p className="text-sm font-mono text-green-600">138.2</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] text-black/40 font-bold uppercase mb-1">
                17 Units
              </p>
              <p className="text-sm font-mono">63,000 sq ft</p>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-black/5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] text-black/40 font-bold uppercase mb-1">
                  Owner
                </p>
                <p className="text-sm font-medium">Kenneth Lee</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-black/40 font-bold uppercase mb-1">
                  Last Sold - 09.2021
                </p>
                <p className="text-sm font-mono">$ 2,150,000</p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-white/40 p-4 rounded-2xl border border-white/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center overflow-hidden">
                  <User size={20} className="text-black/40" />
                </div>
                <div>
                  <p className="text-[10px] text-black/40 font-bold uppercase">
                    Assigned to
                  </p>
                  <p className="text-sm font-medium">Ramsey Casey</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-white/60 rounded-full hover:bg-white transition-colors">
                  <Mail size={14} />
                </button>
                <button className="p-2 bg-white/60 rounded-full hover:bg-white transition-colors">
                  <Phone size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Right: Construction Velocity */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative lg:absolute lg:bottom-12 lg:right-12 w-full lg:w-80 glass p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] shadow-soft"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1">
                Construction Velocity
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl lg:text-3xl font-medium tracking-tight">
                  94%
                </h3>
                <span className="text-[10px] text-black/40 font-bold uppercase tracking-widest">
                  - Success Rate
                </span>
              </div>
            </div>
            <div className="p-2 bg-white/40 rounded-full">
              <ExternalLink size={14} className="text-black/60" />
            </div>
          </div>

          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#000"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-end mt-4">
            <p className="text-[10px] text-black/40 font-bold uppercase">
              Highest and Best Use
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="text-[10px] font-bold uppercase">Current</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Controls (Left) - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:flex absolute left-12 bottom-40 z-20 flex-col gap-3">
        <button className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-soft hover:bg-white transition-all">
          <Plus size={18} />
        </button>
        <button className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-soft hover:bg-white transition-all">
          <Minus size={18} />
        </button>
        <button className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-soft hover:bg-white transition-all">
          <span className="text-[10px] font-bold">2D</span>
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="
    fixed 
    bottom-3 
    left-1/2 
    -translate-x-1/2 
    z-30 
    flex 
    items-center 
    gap-1 
    bg-white/80 
    backdrop-blur-md 
    px-2 
    py-1.5 
    rounded-full 
    border 
    border-white/40 
    shadow-soft 
    w-[88%] 
    max-w-sm 
    justify-between

    lg:absolute 
    lg:bottom-8 
    lg:w-auto 
    lg:px-4 
    lg:py-3 
    lg:gap-2
  "
      >
        <button className="p-1.5 lg:p-3 text-black/40 hover:text-black transition-colors">
          <Search size={16} className="lg:w-5 lg:h-5" />
        </button>

        <button className="p-1.5 lg:p-3 text-black bg-white rounded-full shadow-sm">
          <Home size={16} className="lg:w-5 lg:h-5" />
        </button>

        <button className="p-1.5 lg:p-3 text-black/40 hover:text-black transition-colors">
          <LayoutGrid size={16} className="lg:w-5 lg:h-5" />
        </button>

        <button className="p-1.5 lg:p-3 text-black/40 hover:text-black transition-colors">
          <Calendar size={16} className="lg:w-5 lg:h-5" />
        </button>

        <button className="p-1.5 lg:p-3 text-black/40 hover:text-black transition-colors hidden sm:block">
          <CheckCircle2 size={16} className="lg:w-5 lg:h-5" />
        </button>

        <button className="p-1.5 lg:p-3 text-black/40 hover:text-black transition-colors hidden sm:block">
          <TrendingUp size={16} className="lg:w-5 lg:h-5" />
        </button>

        <button className="p-1.5 lg:p-3 text-black/40 hover:text-black transition-colors">
          <Globe size={16} className="lg:w-5 lg:h-5" />
        </button>
      </motion.nav>

      {/* Subtle Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
