/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Target, Leaf, Sparkles, Award, ArrowRight, Sun, Zap, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import SectionBackground3D from './SectionBackground3D.tsx';

export default function About() {
  return (
    <section id="about" className="relative py-28 bg-white dark:bg-slate-950 overflow-hidden border-b border-slate-200/60 dark:border-slate-800/40 transition-colors duration-300">
      <SectionBackground3D type="about" />

      {/* Absolute Decorative Ambient Background circles */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Introduction Layout */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <span className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-amber-600 dark:text-amber-450 uppercase">
              <Sparkles className="w-4 h-4 animate-pulse" />
              World-Class Clean Energy
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
              About <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Ashonika</span>
            </h2>
          </div>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-350 text-sm md:text-lg leading-relaxed max-w-3xl mx-auto">
            <p>
              Ashonika stands at the forefront of the clean energy transition, specializing in premium, high-tier Solar Engineering, Procurement, and Commissioning (EPC) solutions. We are dedicated to delivering highly efficient grid-tied, hybrid, and off-grid power structures that empower residential, business, and industrial clients with complete energy independence.
            </p>
            <p>
              By integrating state-of-the-art monocrystalline PV modules, smart solid-state inverter systems, and durable power storage technology, Ashonika transforms idle spaces into high-yield clean energy generators. Our certified engineering framework guarantees maximum structural safety, long-term electricity yield, and reliable post-commissioning support—powering a sustainable tomorrow for decades to come.
            </p>
          </div>
        </div>

        {/* Association section */}
        <motion.div 
          id="associations-section" 
          className="mt-24 pt-16 border-t border-slate-200/60"
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
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-500/15 text-[10px] font-bold tracking-widest text-[#0B8F4D] uppercase">
              <Sparkles className="w-3 h-3" />
              Strategic Network
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Associated <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">With</span>
            </h3>
            <p className="text-slate-650 text-xs md:text-sm mt-2">
              Collaboratively driving high-efficiency clean energy deployments across key operational domains.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div 
              className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-emerald-500/30 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20 shadow-inner">
                <Sun className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-800 tracking-tight">
                  RP Solar Energy
                </span>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-emerald-500/30 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-500/20 shadow-inner">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-800 tracking-tight">
                  SB Power
                </span>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-emerald-500/30 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 border border-sky-500/20 shadow-inner">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-800 tracking-tight whitespace-nowrap">
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
