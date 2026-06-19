/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Home, Building2, Factory, Cpu, ArrowLeftRight, Wrench, ShieldCheck, ChevronRight, X, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';
import SectionBackground3D from './SectionBackground3D.tsx';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  benefits: string[];
  features: string[];
  capacityRange: string;
}

interface ServicesProps {
  onRequestSurvey?: () => void;
}

export default function Services({ onRequestSurvey }: ServicesProps = {}) {
  const servicesData: ServiceItem[] = [
    {
      id: 'residential',
      title: 'Residential Solar',
      description: 'Elegant solar panel installations tailored for smart homes. Save up to 90% on monthly utility bills.',
      longDescription: 'Our residential systems are engineered with highest-tier solar panels, featuring mono-PERC cell technology and integrated smart microinverters. We customize arrays to fit your rooftop architectural style seamlessly—optimizing aesthetics while maximizing energy absorption across all seasons.',
      icon: <Home className="w-6 h-6 text-emerald-400" />,
      benefits: [
        'Immediate reduction in monthly electric bills by 85-90%',
        'Increase home property valuation with clean energy assets',
        '25-year performance warranty with minimal maintenance',
        'Direct connection with standard net metering returns'
      ],
      features: [
        'Tier-1 Mono PERC Bifacial Solar PV Panels',
        'App-based real-time generation monitoring',
        'Integrated modular battery storage options (Tesla / AGE Powerwall)',
        'Sleek, low-profile safety mounting frames'
      ],
      capacityRange: '3 kW to 15 kW'
    },
    {
      id: 'commercial',
      title: 'Commercial Solar',
      description: 'Reliable rooftop, carport, and ground-mount PV installations for corporate offices, malls, and clinics.',
      longDescription: 'Establish commercial leadership with a self-funding power asset. We provide turn-key rooftop arrays, modern solar carports, and energy storage options for corporate offices, clinics, housing societies, and retail complexes. We handle everything from ROI feasibility models to regulatory government subsidies.',
      icon: <Building2 className="w-6 h-6 text-[#FFC107]" />,
      benefits: [
        'Depreciate capital assets quickly with 40% accelerated depreciation',
        'Fix electricity tariffs for the next 25 years',
        'Strengthen your brand corporate sustainability ESG profile',
        'Enhance workspace parking with sleek solar carport shades'
      ],
      features: [
        'Automated string inverters with grid backup',
        'Toughened wind-resistant frame engineering (up to 180 km/h)',
        'Smart energy telemetry with IoT alerts',
        'Zero-down flexible corporate financing models'
      ],
      capacityRange: '10 kW to 100 kW'
    },
    {
      id: 'industrial',
      title: 'Industrial Solar',
      description: 'Megawatt-scale microgrid architectures for factories, warehouses, cold storage, and heavy industries.',
      longDescription: 'Industrial facilities face steep utility tariffs and peak-load penalties. Our megawatt-scale solar installations provide uninterrupted operational power for energy-intensive manufacturing plants, cold storage units, warehouses, and chemical facilities. We design custom high-voltage transmission tie-ins for reliable stability.',
      icon: <Factory className="w-6 h-6 text-blue-400" />,
      benefits: [
        'Mitigate heavy commercial peak-load surges and penalties',
        'Drastic savings on heavy manufacturing electricity overheads',
        'Shield production lines from regional power-outages',
        'Earn Clean Energy Tradable Carbon Credits'
      ],
      features: [
        'High-density Bifacial panels with elevated ground clearances',
        'Multi-string centralized heavy megawatt-tier inverters',
        'SCADA telemetry monitoring for active load-sharing',
        'Integrated zero-outage grid-switching systems'
      ],
      capacityRange: '100 kW to 5 MW+'
    },
    {
      id: 'epc',
      title: 'Solar EPC Solutions',
      description: 'Comprehensive, end-to-end solar solutions, including feasibility research, layout, and complete setup.',
      longDescription: 'Our certified engineers handle the full Engineering, Procurement, and Construction (EPC) lifecycle. We utilize state-of-the-art shadow-simulation CAD mapping, structural load testing, and premium component sourcing to build high-performance green power grids with maximal lifecycle returns.',
      icon: <Cpu className="w-6 h-6 text-lime-400" />,
      benefits: [
        'Stress-free execution managed by specialized solar engineers',
        'Highest grade material sourcing with direct manufacturer guarantees',
        'Adherence to strict global IEEE safety and installation standards',
        'Rapid milestone-based deployment timelines'
      ],
      features: [
        '3D LiDAR drone rooftop thermal profiling and mapping',
        'Custom heavy-gauge hot-dip galvanized mounting structures',
        'Grid synchronization and load protection switches',
        'Rigorous pre-commissioning power-quality sweeps'
      ],
      capacityRange: 'Custom Scale'
    },
    {
      id: 'netmetering',
      title: 'Net Metering Assitance',
      description: 'Seamless regulatory approvals, DISCOM inspection filings, and meter upgrades for energy sellbacks.',
      longDescription: 'Export excess daytime solar energy back to the regional grid and receive full credits. We handle all paperwork, DISCOM (distribution company) filing, structural fitness certificates, and billing grid integrations to make sure your net metering system starts paying you back immediately.',
      icon: <ArrowLeftRight className="w-6 h-6 text-emerald-400" />,
      benefits: [
        'Sell surplus power back and balance monsoon or winter deficits',
        'Avoid batteries to save 40% on initial investment costs',
        'DISCOM compliant and fully legal net billing setups',
        'Clear, itemized bill tracking and export credits'
      ],
      features: [
        'Pre-validated government subsidy application filing',
        'Licensed liaison with DISCOM inspection engineers',
        'Supply and testing of dual-directional smart meters',
        'Continuous performance and net credit accounting'
      ],
      capacityRange: 'All Grid Scales'
    },
    {
      id: 'maintenance',
      title: 'Solar Maintenance',
      description: 'Periodic thermal testing, robotic panel wash solutions, checkups, and guaranteed uptime.',
      longDescription: 'Regular maintenance guarantees up to 15% higher energy extraction. Our professional service crew provides periodic chemical-free high-pressure panel washing, drone thermal imaging to find micro-hotspots, electrical wire insulation checks, and string inverter tuning for ultimate grid performance.',
      icon: <Wrench className="w-6 h-6 text-amber-500" />,
      benefits: [
        'Boost solar generation yield by up to 15%',
        'Identify electrical insulation leaks before they trigger failures',
        'Maximize physical component life past 30 years',
        '24/7 priority emergency technical response'
      ],
      features: [
        'Thermal imaging hotspot detection drones',
        'De-ionized anti-static chemical-free water washing',
        'Full structural load bolt re-tensioning checks',
        'Inverter software telemetry and firmware upgrades'
      ],
      capacityRange: 'Annual Contracts'
    }
  ];

  return (
    <section id="services" className="relative py-28 bg-slate-50 dark:bg-slate-900/40 overflow-hidden border-b border-slate-200/60 dark:border-slate-800/40 transition-colors duration-300">
      {/* Interactive 3D Orbiting Panel Slabs Background */}
      <SectionBackground3D type="services" />

      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#FFC107]/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading Group */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-500/10 text-xs font-bold tracking-widest text-[#0B8F4D] dark:text-emerald-400 uppercase">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            Ashonika Engineering Services
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
            Our Premium <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Power Solutions</span>
          </h2>
          <p className="text-slate-650 dark:text-slate-350 text-sm md:text-base">
            Engineered systems designed to transition homes and heavy industries to high-efficiency, independent green microgrids.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            >
              <div
                id={`service-card-${service.id}`}
                className="group relative p-3.5 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/40 shadow-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:-translate-y-1 overflow-hidden h-full flex flex-col justify-between"
              >
                {/* Card top edge gradient lighting */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#FFC107]/40 to-emerald-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-500/35 transition-all text-emerald-600">
                      {React.cloneElement(service.icon as React.ReactElement, { className: 'w-4 h-4 sm:w-6 sm:h-6' })}
                    </div>
                    <span className="text-[9px] sm:text-xs font-mono text-slate-500 group-hover:text-emerald-600 transition-colors">
                      {service.capacityRange}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-base md:text-xl font-bold text-slate-900 dark:text-slate-100 mb-1.5 sm:mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-450 transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-350 text-[10px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-6">
                    {service.description}
                  </p>
                </div>

                <button
                  onClick={onRequestSurvey}
                  className="w-full mt-4 sm:mt-6 py-2 px-3 sm:py-3 sm:px-4 rounded-lg sm:rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-[9px] sm:text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Free Site Survey</span>
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
