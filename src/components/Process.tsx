/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle2, PhoneCall, Ruler, DraftingCompass, FileCheck, HardHat, ShieldCheck, ChevronRight } from 'lucide-react';
import SectionBackground3D from './SectionBackground3D.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

interface ProgressStep {
  number: number;
  title: string;
  duration: string;
  description: string;
  detailedPoints: string[];
  icon: React.ReactNode;
}

export default function Process() {
  const { language, t, tArray } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(1);

  const stepsData: ProgressStep[] = [
    {
      number: 1,
      title: t('process', 'step1_title'),
      duration: language === 'en' ? '1-2 Days' : '1-2 दिन',
      description: t('process', 'step1_desc'),
      detailedPoints: tArray('process', 'step1_points'),
      icon: <PhoneCall className="w-5 h-5" />
    },
    {
      number: 2,
      title: t('process', 'step2_title'),
      duration: language === 'en' ? '2-3 Days' : '2-3 दिन',
      description: t('process', 'step2_desc'),
      detailedPoints: tArray('process', 'step2_points'),
      icon: <Ruler className="w-5 h-5" />
    },
    {
      number: 3,
      title: t('process', 'step3_title'),
      duration: language === 'en' ? '3-4 Days' : '3-4 दिन',
      description: t('process', 'step3_desc'),
      detailedPoints: tArray('process', 'step3_points'),
      icon: <DraftingCompass className="w-5 h-5" />
    },
    {
      number: 4,
      title: t('process', 'step4_title'),
      duration: language === 'en' ? '7-14 Days' : '7-14 दिन',
      description: t('process', 'step4_desc'),
      detailedPoints: tArray('process', 'step4_points'),
      icon: <FileCheck className="w-5 h-5" />
    },
    {
      number: 5,
      title: t('process', 'step5_title'),
      duration: language === 'en' ? '2-3 Days' : '2-3 दिन',
      description: t('process', 'step5_desc'),
      detailedPoints: tArray('process', 'step5_points'),
      icon: <HardHat className="w-5 h-5" />
    },
    {
      number: 6,
      title: t('process', 'step6_title'),
      duration: language === 'en' ? '1-2 Days' : '1-2 दिन',
      description: t('process', 'step6_desc'),
      detailedPoints: tArray('process', 'step6_points'),
      icon: <ShieldCheck className="w-5 h-5" />
    }
  ];

  const currentStepObj = stepsData.find((s) => s.number === activeStep) || stepsData[0];

  return (
    <section id="process" className="relative py-28 bg-white dark:bg-slate-950 overflow-hidden border-b border-slate-200/60 dark:border-slate-800/40 transition-colors duration-300">
      <SectionBackground3D type="process" />

      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Title Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-500/10 text-xs font-bold tracking-widest text-[#0B8F4D] dark:text-emerald-400 uppercase animate-pulse">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t('process', 'badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
            {language === 'en' ? (
              <>Our 6-Step <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Solar Journey</span></>
            ) : (
              <>सोलर इंस्टॉलेशन की <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">हमारी 6-चरणीय प्रक्रिया</span></>
            )}
          </h2>
          <p className="text-slate-600 dark:text-slate-350 text-sm md:text-base">
            {t('process', 'subheading')}
          </p>
        </div>

        {/* Roadmap Steps Process Grid line (Horizontal) */}
        <div className="hidden lg:grid grid-cols-6 gap-4 relative mb-14 pt-8">
          {/* Connector horizontal rule across steps */}
          <div className="absolute top-[68px] left-[8%] right-[8%] h-[2px] bg-slate-200 z-0" />

          {stepsData.map((step) => {
            const isSelected = activeStep === step.number;
            return (
              <div
                key={step.number}
                className="text-center group relative z-10 cursor-pointer"
                onClick={() => setActiveStep(step.number)}
              >
                {/* Visual Step bubble item */}
                <div className={`mx-auto w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#0B8F4D] border-[#0B8F4D] text-white scale-110 shadow-lg shadow-emerald-700/20 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600 hover:scale-105'
                }`}>
                  {step.icon}
                </div>

                <div className="mt-4 space-y-1 px-2">
                  <span className="block text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    {language === 'en' ? 'Step' : 'चरण'} 0{step.number}
                  </span>
                  <h4 className={`text-xs font-bold transition-colors ${
                    isSelected ? 'text-emerald-750 font-extrabold' : 'text-slate-600 group-hover:text-slate-900'
                  }`}>
                    {step.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile vertical steps list */}
        <div className="lg:hidden flex flex-col gap-4 mb-10">
          {stepsData.map((step, idx) => (
            <div
              key={step.number}
              className="relative p-4 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xs flex gap-4 items-center"
            >
              {/* Vertical timeline connector line */}
              {idx < stepsData.length - 1 && (
                <div className="absolute top-[38px] bottom-[-22px] left-[33px] sm:left-[37px] w-[2px] bg-gradient-to-b from-slate-200 to-transparent pointer-events-none z-0" />
              )}

              {/* Step number and icon */}
              <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                {React.cloneElement(step.icon as React.ReactElement, { className: 'w-4 h-4 sm:w-5 sm:h-5' })}
              </div>

              {/* Step detailed information */}
              <div className="flex-1 min-w-0">
                <span className="block text-[9px] font-mono font-bold text-emerald-600 uppercase tracking-widest leading-none">
                  {language === 'en' ? 'Step' : 'चरण'} 0{step.number}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight mt-1 leading-snug">
                  {step.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* The active step detail board panel */}
        <div className="hidden lg:block p-8 rounded-3xl bg-slate-50 border border-slate-200/60 shadow-lg relative overflow-hidden group">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Explanatory side */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-mono font-bold">
                  {language === 'en' ? 'Step' : 'चरण'} 0{currentStepObj.number}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {language === 'en' ? `Standard Execution Phase 0${currentStepObj.number}` : `प्रक्रिया का ${currentStepObj.number === 1 ? 'पहला' : currentStepObj.number === 2 ? 'दूसरा' : currentStepObj.number === 3 ? 'तीसरा' : currentStepObj.number === 4 ? 'चौथा' : currentStepObj.number === 5 ? 'पाँचवाँ' : 'अंतिम'} चरण`}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                {currentStepObj.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {currentStepObj.description}
              </p>

              {/* Sub-points check circle grids */}
              <div className="space-y-3 pt-2">
                {currentStepObj.detailedPoints.map((pt, idx) => (
                  <div key={idx} className="flex gap-2.5 items-center text-xs text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step visualization graphic aspect */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-52 h-52 rounded-full border border-slate-205 bg-white flex flex-col items-center justify-center p-6 text-center relative group-hover:border-emerald-300 transition-all shadow-md shadow-slate-100">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full group-hover:scale-150 transition-transform" />
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 mb-4">
                  {currentStepObj.icon}
                </div>
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  {t('process', 'right_quality')}
                </h5>
                <p className="text-sm font-extrabold text-slate-800">
                  {t('process', 'right_certified')}
                </p>
                <div className="text-[9px] text-emerald-600 font-semibold uppercase mt-2">
                  {t('process', 'right_compliance')}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
