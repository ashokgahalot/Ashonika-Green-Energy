/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle2, PhoneCall, Ruler, DraftingCompass, FileCheck, HardHat, ShieldCheck, ChevronRight } from 'lucide-react';

interface ProgressStep {
  number: number;
  title: string;
  duration: string;
  description: string;
  detailedPoints: string[];
  icon: React.ReactNode;
}

export default function Process() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const stepsData: ProgressStep[] = [
    {
      number: 1,
      title: 'Consultation & Feasibility',
      duration: '1-2 Days',
      description: 'Initial structural, billing assessment, and financial savings calculations.',
      detailedPoints: [
        'Analyze past 12-month electric utility utility records',
        'Simulate ROI solar payback periods using CAD models',
        'Finalize custom finance options and state subsidy eligibility check'
      ],
      icon: <PhoneCall className="w-5 h-5" />
    },
    {
      number: 2,
      title: 'Site Survey & Engineering',
      duration: '2-3 Days',
      description: 'Physical rooftop shadow analysis, drone scans, and civil structural diagnostics.',
      detailedPoints: [
        'Drone thermal scans to check roof shadow patterns',
        'Civil structural checks to verify roof load thresholds',
        'Sizing exact anchor placement spots to protect water barriers'
      ],
      icon: <Ruler className="w-5 h-5" />
    },
    {
      number: 3,
      title: 'Besboke Grid Design',
      duration: '3-4 Days',
      description: 'Custom 3D layout simulation of electrical cabling and wind-load structures.',
      detailedPoints: [
        '3D CAD grid mapping of panel configurations',
        'Electrical string layouts to minimize inverter loss',
        'Structural static reviews for gust levels above 150 km/h'
      ],
      icon: <DraftingCompass className="w-5 h-5" />
    },
    {
      number: 4,
      title: 'Permitting & Approvals',
      duration: '7-14 Days',
      description: 'Liaison with municipal boards & state electricity DISCOM net-meter limits approval.',
      detailedPoints: [
        'Submit load clearances to state electric DISCOM',
        'Apply for Central PM-Surya Ghar national quota subsidies',
        'Complete regulatory engineering peer-review endorsements'
      ],
      icon: <FileCheck className="w-5 h-5" />
    },
    {
      number: 5,
      title: 'Civil & Panel Installation',
      duration: '2-3 Days',
      description: 'Deploying panel tracks, solar arrays, string cabling, and microinverter networks.',
      detailedPoints: [
        'Secure hot-dip galvanized elevated structures',
        'Layout Tier-1 high efficiency solar PV modules',
        'Integrate smart string management and surge protection modules'
      ],
      icon: <HardHat className="w-5 h-5" />
    },
    {
      number: 6,
      title: 'Commissioning & Sync',
      duration: '1-2 Days',
      description: 'Final grid inspection, net-metering synch, and active telemetry startup.',
      detailedPoints: [
        'Conduct safety resistance insulation grid checks',
        'Commission the dual-directional net meter grid sync',
        'Enable mobile cloud-linked solar telemetry and metrics control'
      ],
      icon: <ShieldCheck className="w-5 h-5" />
    }
  ];

  const currentStepObj = stepsData.find((s) => s.number === activeStep) || stepsData[0];

  return (
    <section id="process" className="relative py-28 bg-[#041120] overflow-hidden border-b border-white/5">

      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-bold tracking-widest text-[#FFC107] uppercase">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Engineering Workflow Pipeline
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Our 6-Step <span className="bg-gradient-to-r from-emerald-400 to-[#FFC107] bg-clip-text text-transparent">Solar Journey</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            From the initial layout estimates down to double-checked net-meter grid syncing, we supervise every milestone.
          </p>
        </div>

        {/* Roadmap Steps Process Grid line (Horizontal) */}
        <div className="hidden lg:grid grid-cols-6 gap-4 relative mb-14 pt-8">
          {/* Connector horizontal rule across steps */}
          <div className="absolute top-[68px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-emerald-600 via-[#FFC107] to-emerald-900 z-0" />

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
                    ? 'bg-[#FFC107] border-[#041120] text-[#071B2F] scale-110 shadow-lg shadow-[#FFC107]/20 font-bold'
                    : 'bg-[#04203e]/90 border-emerald-500/30 text-emerald-400 hover:border-[#FFC107] hover:scale-105'
                }`}>
                  {step.icon}
                </div>

                <div className="mt-4 space-y-1 px-2">
                  <span className="block text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                    Step 0{step.number}
                  </span>
                  <h4 className={`text-xs font-bold transition-colors ${
                    isSelected ? 'text-[#FFC107]' : 'text-gray-300 group-hover:text-white'
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
              className="relative p-4 rounded-2xl bg-[#09223c]/60 border border-white/15 shadow-md flex gap-4 items-center"
            >
              {/* Vertical timeline connector line */}
              {idx < stepsData.length - 1 && (
                <div className="absolute top-[38px] bottom-[-22px] left-[33px] sm:left-[37px] w-[2px] bg-gradient-to-b from-emerald-500 to-transparent pointer-events-none z-0" />
              )}

              {/* Step number and icon */}
              <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[#FFC107] flex items-center justify-center shrink-0">
                {React.cloneElement(step.icon as React.ReactElement, { className: 'w-4 h-4 sm:w-5 sm:h-5' })}
              </div>

              {/* Step detailed information */}
              <div className="flex-1 min-w-0">
                <span className="block text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest leading-none">
                  Step 0{step.number}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mt-1 leading-snug">
                  {step.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* The active step detail board panel */}
        <div className="hidden lg:block p-8 rounded-3xl bg-linear-to-b from-[#09223c] to-[#041221] border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Explanatory side */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-md bg-[#FFC107]/25 text-[#FFC107] border border-[#FFC107]/20 text-xs font-mono font-bold">
                  Step 0{currentStepObj.number}
                </span>
                <span className="text-xs font-semibold text-gray-550">
                  Standard Execution Phase 0{currentStepObj.number}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {currentStepObj.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {currentStepObj.description}
              </p>

              {/* Sub-points check circle grids */}
              <div className="space-y-3 pt-2">
                {currentStepObj.detailedPoints.map((pt, idx) => (
                  <div key={idx} className="flex gap-2.5 items-center text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step visualization graphic aspect */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-52 h-52 rounded-full border border-emerald-500/20 bg-[#061e38] flex flex-col items-center justify-center p-6 text-center relative group-hover:border-[#FFC107]/40 transition-colors shadow-2xl shadow-black/40">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFC107]/5 rounded-bl-full group-hover:scale-150 transition-transform" />
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-[#FFC107] mb-4">
                  {currentStepObj.icon}
                </div>
                <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  Engineering Quality
                </h5>
                <p className="text-sm font-extrabold text-white">
                  Certified Installation
                </p>
                <div className="text-[9px] text-emerald-400 font-semibold uppercase mt-2">
                  Full Compliance
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
