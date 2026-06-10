/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Target, Leaf, Sparkles, Award, ArrowRight, Sun, Zap, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  // Animated counters state
  const [projects, setProjects] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [co2, setCo2] = useState(0);
  const [clientSatisfaction, setClientSatisfaction] = useState(0);

  useEffect(() => {
    // Simple counts interpolation
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 30;
      const stepTime = duration / steps;
      let stepCurrent = 0;

      const interval = setInterval(() => {
        stepCurrent++;
        setProjects(Math.round((225 / steps) * stepCurrent));
        setCapacity(Math.round(((15.5 / steps) * stepCurrent) * 10) / 10);
        setCo2(Math.round((2500 / steps) * stepCurrent));
        setClientSatisfaction(Math.round((98 / steps) * stepCurrent));

        if (stepCurrent >= steps) {
          setProjects(225);
          setCapacity(15.5);
          setCo2(2500);
          setClientSatisfaction(98);
          clearInterval(interval);
        }
      }, stepTime);

      return () => clearInterval(interval);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="relative py-28 bg-[#071B2F] overflow-hidden">

      {/* Absolute Decorative Ambient Background circles */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Ashonika introduction details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#FFC107] uppercase">
                <Sparkles className="w-4 h-4" />
                World-Class Clean Energy
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                About <span className="bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent">Ashonika</span>
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Ashonika stands at the forefront of the clean energy transition, specializing in premium, high-tier Solar Engineering, Procurement, and Commissioning (EPC) solutions. We are dedicated to delivering highly efficient grid-tied, hybrid, and off-grid power structures that empower residential, business, and industrial clients with complete energy independence.
              </p>
              <p>
                By integrating state-of-the-art monocrystalline PV modules, smart solid-state inverter systems, and durable power storage technology, Ashonika transforms idle spaces into high-yield clean energy generators. Our certified engineering framework guarantees maximum structural safety, long-term electricity yield, and reliable post-commissioning support—powering a sustainable tomorrow for decades to come.
              </p>
            </div>
          </div>

          {/* Right Column: Key metrics counters in an elegant 2x2 grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#09223c] border border-white/5 text-center relative overflow-hidden group hover:border-[#FFC107]/30 transition-colors shadow-lg">
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#FFC107]/5 rounded-bl-full group-hover:scale-150 transition-transform" />
                <div className="text-2xl md:text-3xl font-extrabold text-[#FFC107] font-mono mb-1">
                  {projects}+
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                  Grid Projects
                </div>
                <div className="text-[10px] text-gray-500 mt-1">
                  Successfully Completed
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#09223c] border border-white/5 text-center relative overflow-hidden group hover:border-emerald-500/30 transition-colors shadow-lg">
                <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/5 rounded-bl-full group-hover:scale-150 transition-transform" />
                <div className="text-2xl md:text-3xl font-extrabold text-emerald-400 font-mono mb-1">
                  {capacity} MW+
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                  Capacity Live
                </div>
                <div className="text-[10px] text-gray-500 mt-1">
                  Active Solar Yield
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#09223c] border border-white/5 text-center relative overflow-hidden group hover:border-blue-500/30 transition-colors shadow-lg">
                <div className="absolute top-0 right-0 w-12 h-12 bg-blue-500/5 rounded-bl-full group-hover:scale-150 transition-transform" />
                <div className="text-2xl md:text-3xl font-extrabold text-blue-400 font-mono mb-1">
                  {co2} T
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                  CO₂ Saved
                </div>
                <div className="text-[10px] text-gray-500 mt-1">
                  Tons Mitigated Annually
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#09223c] border border-white/5 text-center relative overflow-hidden group hover:border-lime-500/30 transition-colors shadow-lg">
                <div className="absolute top-0 right-0 w-12 h-12 bg-lime-500/5 rounded-bl-full group-hover:scale-150 transition-transform" />
                <div className="text-2xl md:text-3xl font-extrabold text-lime-400 font-mono mb-1">
                  {clientSatisfaction}%
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                  Satisfaction
                </div>
                <div className="text-[10px] text-gray-500 mt-1">
                  Verified Client Happiness
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Association section */}
        <motion.div 
          id="associations-section" 
          className="mt-24 pt-16 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }
            }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-[10px] font-bold tracking-widest text-[#FFC107] uppercase">
              <Sparkles className="w-3 h-3" />
              Strategic Network
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-3 tracking-tight">
              Associated <span className="bg-gradient-to-r from-emerald-400 to-[#FFC107] bg-clip-text text-transparent">With</span>
            </h3>
            <p className="text-gray-400 text-xs md:text-sm mt-2">
              Collaboratively driving high-efficiency clean energy deployments across key operational domains.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div 
              className="flex items-center gap-4 p-5 rounded-2xl bg-linear-to-b from-[#09223c] to-[#041221] border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-inner">
                <Sun className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-sm font-bold text-white tracking-tight">
                  RP Solar Energy
                </span>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-4 p-5 rounded-2xl bg-linear-to-b from-[#09223c] to-[#041221] border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#FFC107] border border-amber-500/20 shadow-inner">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-sm font-bold text-white tracking-tight">
                  SB Power
                </span>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-4 p-5 rounded-2xl bg-linear-to-b from-[#09223c] to-[#041221] border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-450 border border-sky-500/20 shadow-inner">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="text-sm font-bold text-white tracking-tight whitespace-nowrap">
                  Solar Technician Ajmer
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
