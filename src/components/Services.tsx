/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Home, Building2, Factory, Cpu, ArrowLeftRight, Wrench, ShieldCheck, ChevronRight, X, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';
import SectionBackground3D from './SectionBackground3D.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  capacityRange: string;
}

interface ServicesProps {
  onRequestSurvey?: () => void;
}

export default function Services({ onRequestSurvey }: ServicesProps = {}) {
  const { language, t } = useLanguage();

  const servicesData: ServiceItem[] = [
    {
      id: 'residential',
      title: t('services', 'residential_title'),
      description: t('services', 'residential_desc'),
      capacityRange: t('services', 'residential_capacity'),
      icon: <Home className="w-6 h-6 text-emerald-400" />
    },
    {
      id: 'commercial',
      title: t('services', 'commercial_title'),
      description: t('services', 'commercial_desc'),
      capacityRange: t('services', 'commercial_capacity'),
      icon: <Building2 className="w-6 h-6 text-[#FFC107]" />
    },
    {
      id: 'industrial',
      title: t('services', 'industrial_title'),
      description: t('services', 'industrial_desc'),
      capacityRange: t('services', 'industrial_capacity'),
      icon: <Factory className="w-6 h-6 text-blue-400" />
    },
    {
      id: 'epc',
      title: t('services', 'epc_title'),
      description: t('services', 'epc_desc'),
      capacityRange: t('services', 'epc_capacity'),
      icon: <Cpu className="w-6 h-6 text-lime-400" />
    },
    {
      id: 'netmetering',
      title: t('services', 'metering_title'),
      description: t('services', 'metering_desc'),
      capacityRange: t('services', 'metering_capacity'),
      icon: <ArrowLeftRight className="w-6 h-6 text-emerald-400" />
    },
    {
      id: 'maintenance',
      title: t('services', 'maintenance_title'),
      description: t('services', 'maintenance_desc'),
      capacityRange: t('services', 'maintenance_capacity'),
      icon: <Wrench className="w-6 h-6 text-amber-500" />
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
            {language === 'en' ? 'Ashonika Engineering Services' : 'अशोनिका इंजीनियरिंग सर्विसेज'}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
            {language === 'en' ? (
              <>
                Our Premium <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Power Solutions</span>
              </>
            ) : (
              <>
                हमारे प्रीमियम <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">सोलर समाधान</span>
              </>
            )}
          </h2>
          <p className="text-slate-650 dark:text-slate-350 text-sm md:text-base">
            {t('services', 'description')}
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
                  <span>{t('services', `${service.id === 'netmetering' ? 'metering' : service.id}_button`, 'Free Site Survey')}</span>
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
