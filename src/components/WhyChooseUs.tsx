/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Landmark, Zap, Clock, TrendingUp, CheckSquare } from 'lucide-react';
import SectionBackground3D from './SectionBackground3D.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
}

export default function WhyChooseUs() {
  const { language, t } = useLanguage();

  const features: FeatureItem[] = [
    {
      id: 'products',
      title: t('whyPartner', 'f1_title'),
      description: t('whyPartner', 'f1_desc'),
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      accent: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/10'
    },
    {
      id: 'engineers',
      title: t('whyPartner', 'f2_title'),
      description: t('whyPartner', 'f2_desc'),
      icon: <CheckSquare className="w-5 h-5 text-indigo-400" />,
      accent: 'border-indigo-500/20 text-indigo-400 bg-indigo-500/10'
    },
    {
      id: 'subsidy',
      title: t('whyPartner', 'f3_title'),
      description: t('whyPartner', 'f3_desc'),
      icon: <Landmark className="w-5 h-5 text-[#FFC107]" />,
      accent: 'border-amber-500/20 text-amber-400 bg-amber-500/10'
    },
    {
      id: 'installation',
      title: t('whyPartner', 'f4_title'),
      description: t('whyPartner', 'f4_desc'),
      icon: <Zap className="w-5 h-5 text-sky-400" />,
      accent: 'border-sky-500/20 text-sky-400 bg-sky-500/10'
    },
    {
      id: 'support',
      title: t('whyPartner', 'f5_title'),
      description: t('whyPartner', 'f5_desc'),
      icon: <Clock className="w-5 h-5 text-rose-500" />,
      accent: 'border-rose-500/20 text-rose-400 bg-rose-500/10'
    },
    {
      id: 'monitoring',
      title: t('whyPartner', 'f6_title'),
      description: t('whyPartner', 'f6_desc'),
      icon: <TrendingUp className="w-5 h-5 text-lime-400" />,
      accent: 'border-lime-500/20 text-lime-400 bg-lime-500/10'
    }
  ];

  return (
    <section id="timeline" className="relative py-20 bg-white dark:bg-slate-950 overflow-hidden border-b border-slate-200/60 dark:border-slate-800/40 transition-colors duration-300">
      <SectionBackground3D type="whychoose" />
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-500/10 text-[11px] font-bold tracking-widest text-[#0B8F4D] dark:text-emerald-400 uppercase rounded-full">
            <Award className="w-3.5 h-3.5" />
            {t('whyPartner', 'badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
            {language === 'en' ? (
              <>
                Why Partner with <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Ashonika?</span>
              </>
            ) : (
              <>
                <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Ashonika</span> को क्यों चुनें?
              </>
            )}
          </h2>
          <p className="text-slate-600 dark:text-slate-350 text-xs md:text-sm">
            {t('whyPartner', 'subheading')}
          </p>
        </div>

        {/* Clean, compact responsive Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/40 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-0.5 flex flex-col sm:flex-row gap-2.5 sm:gap-4 items-start"
            >
              <div className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border shrink-0 ${feature.accent.replace('text-emerald-400', 'text-emerald-600').replace('text-indigo-400', 'text-indigo-600').replace('text-amber-400', 'text-amber-600').replace('text-sky-400', 'text-sky-650').replace('text-rose-450', 'text-rose-600').replace('text-lime-400', 'text-lime-600')}`}>
                {React.cloneElement(feature.icon as React.ReactElement, { className: 'w-4 h-4 sm:w-5 sm:h-5 text-current' })}
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[8px] sm:text-[10px] font-bold text-slate-550 dark:text-slate-400 uppercase tracking-widest font-mono block">
                  0{index + 1} / {language === 'en' ? 'Feature' : 'विशेषता'}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-650 dark:text-slate-350 text-[10px] sm:text-xs md:text-[13px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
