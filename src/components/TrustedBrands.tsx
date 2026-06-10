/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Shield, Award, CheckCircle2, Zap, Sun, Settings, Heart, Flame } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  specialty: string;
  established: string;
  badge: string;
  color: string;
}

export default function TrustedBrands() {
  const brands: Brand[] = [
    {
      id: 'waaree',
      name: 'Waaree Energies',
      specialty: 'High-Efficiency PV Modules',
      established: 'Tier-1 Module Leader',
      badge: 'Premium PV',
      color: 'from-amber-400 to-amber-600'
    },
    {
      id: 'tata',
      name: 'Tata Power Solar',
      specialty: 'Proven EPC & Solar Cells',
      established: 'Decades of Trust',
      badge: 'Legacy Leader',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'havells',
      name: 'Havells',
      specialty: 'Smart Solar Inverters & Cables',
      established: 'Advanced Electricals',
      badge: 'Smart Grid',
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      id: 'adani',
      name: 'Adani Solar',
      specialty: 'Ultra-Power Mono-PERC Modules',
      established: 'Gigawatt-Scale Tech',
      badge: 'Ultra Power',
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 'vikram',
      name: 'Vikram Solar',
      specialty: 'High-Yield Bifacial Panels',
      established: 'Global Standard PV',
      badge: 'Bifacial Cells',
      color: 'from-teal-400 to-teal-600'
    },
    {
      id: 'renewsys',
      name: 'RenewSys',
      specialty: 'Integrated Cell & Backsheets',
      established: 'Component Quality',
      badge: 'Integrated Co.',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      id: 'premier',
      name: 'Premier Energies',
      specialty: 'Advanced Cell Manufacturing',
      established: 'Next-Gen Facilities',
      badge: 'Cell Tech',
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      id: 'emmvee',
      name: 'Emmvee',
      specialty: 'Custom Tailored PV Solutions',
      established: 'Rooftop Specialists',
      badge: 'Custom PV',
      color: 'from-rose-400 to-rose-600'
    },
    {
      id: 'rayzon',
      name: 'Rayzon Solar',
      specialty: 'Sleek Aesthetic Modules',
      established: 'High Durability',
      badge: 'Aesthetic PV',
      color: 'from-violet-400 to-violet-600'
    },
    {
      id: 'saatvik',
      name: 'Saatvik Green Energy',
      specialty: 'Optimized Rooftop Modules',
      established: 'Premium Engineering',
      badge: 'Optimized',
      color: 'from-amber-400 to-orange-500'
    },
    {
      id: 'goldi',
      name: 'Goldi Solar',
      specialty: 'Heavy-Duty Industrial Panels',
      established: 'Exceptional Reliability',
      badge: 'Heavy Duty',
      color: 'from-yellow-400 to-emerald-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="trusted-brands-section" className="py-20 bg-[#071B2F] relative overflow-hidden border-t border-b border-white/5">
      {/* Structural background decorations */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/25 text-xs font-bold tracking-widest text-[#FFC107] uppercase select-none">
            <Award className="w-3.5 h-3.5" />
            <span>Authorized Component Ecosystem</span>
          </div>
          <h2 id="trusted-brands-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Elite <span className="text-[#FFC107]">Solar Brand</span> Partners
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            We procure only Tier-1 equipment and premium hardware from the industry's most reputable manufacturers. Your rooftop solar system is engineered for guaranteed output, safety, and operational longevity.
          </p>
        </div>

        {/* Brand Showcase Grid */}
        <motion.div
          id="trusted-brands-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              id={`brand-card-${brand.id}`}
              variants={itemVariants}
              whileHover={{ y: -5, borderColor: 'rgba(255,193,7,0.3)', transition: { duration: 0.2 } }}
              className="bg-[#09223c]/40 hover:bg-[#09223c]/70 border border-white/5 rounded-xl sm:rounded-2xl p-2.5 sm:p-5 relative overflow-hidden transition-all duration-300 shadow-xl group cursor-default flex flex-col justify-between"
            >
              {/* Subtle top-right glowing gradient of the brand */}
              <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${brand.color} opacity-[0.03] group-hover:opacity-[0.10] rounded-full blur-xl transition-all duration-300`} />

              <div className="space-y-2.5 sm:space-y-4">
                {/* Visual Avatar with first letter representing solar tech */}
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${brand.color} p-[1px] flex items-center justify-center shadow-lg shadow-black/20`}>
                    <div className="w-full h-full bg-[#071B2F] rounded-[7px] sm:rounded-[11px] flex items-center justify-center font-bold text-xs sm:text-base text-white group-hover:text-[#FFC107] transition-colors">
                      {brand.name.charAt(0)}
                    </div>
                  </div>
                  <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                    {brand.badge}
                  </span>
                </div>

                {/* Brand Name & specialty descriptions */}
                <div>
                  <h3 className="text-[10px] sm:text-lg font-bold text-white group-hover:text-[#FFC107] transition-colors leading-tight sm:leading-snug">
                    {brand.name}
                  </h3>
                  <p className="hidden sm:block text-gray-400 text-xs mt-1 font-medium">
                    {brand.specialty}
                  </p>
                </div>
              </div>

              {/* Verified Trust Tag in footer of the brand card */}
              <div className="hidden sm:flex mt-5 pt-4 border-t border-white/5 items-center justify-between">
                <span className="text-[10px] text-gray-500 font-mono tracking-wide">
                  {brand.established}
                </span>
                <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-sm">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Approved</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Micro Credential Banner below grid */}
        <div id="trusted-brands-footer" className="mt-16 p-6 rounded-2xl bg-[#09223c]/20 border border-white/5 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/20">
              <Shield className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Manufacturer Backed Warranty Agreements</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Our direct partnerships ensure 10 to 12 Year Manufacture Warranties on Smart Inverters and up to 25 to 30 Year Linear Power Warranties on premium Photovoltaic Panels.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-1.5 px-3.5 rounded-lg bg-[#061525] border border-white/5 text-[11px] font-mono text-amber-400 whitespace-nowrap">
            <Zap className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
            <span>100% Guaranteed Genuine Components</span>
          </div>
        </div>

      </div>
    </section>
  );
}
