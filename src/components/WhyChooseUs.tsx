/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Landmark, Zap, Clock, TrendingUp, CheckSquare } from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
}

export default function WhyChooseUs() {
  const features: FeatureItem[] = [
    {
      id: 'products',
      title: 'Premium Quality Products',
      description: 'We prioritize Tier-1 micro-silicon hardware with 25-Year peak performance guarantees.',
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      accent: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/10'
    },
    {
      id: 'engineers',
      title: 'Certified Engineers',
      description: 'In-house design and deployment managed strictly by licensed master electricians and civil leads.',
      icon: <CheckSquare className="w-5 h-5 text-indigo-400" />,
      accent: 'border-indigo-500/20 text-indigo-400 bg-indigo-500/10'
    },
    {
      id: 'subsidy',
      title: 'Government Subsidy Support',
      description: 'Hassle-free application submission under regional net-metering schemes and state quotas.',
      icon: <Landmark className="w-5 h-5 text-[#FFC107]" />,
      accent: 'border-amber-500/20 text-amber-400 bg-amber-500/10'
    },
    {
      id: 'installation',
      title: 'Precision Fast Installation',
      description: 'Rapid structural deployment within 72 hours of regulatory civil approvals.',
      icon: <Zap className="w-5 h-5 text-sky-400" />,
      accent: 'border-sky-500/20 text-sky-400 bg-sky-500/10'
    },
    {
      id: 'support',
      title: 'Lifetime Expert Support',
      description: '24/7 prioritized operational response with on-demand service dispatches.',
      icon: <Clock className="w-5 h-5 text-rose-500" />,
      accent: 'border-rose-500/20 text-rose-400 bg-rose-500/10'
    },
    {
      id: 'monitoring',
      title: 'Performance Monitoring',
      description: 'Continuous cloud-linked performance tracking dashboard with predictive maintenance alerts.',
      icon: <TrendingUp className="w-5 h-5 text-lime-400" />,
      accent: 'border-lime-500/20 text-lime-400 bg-lime-500/10'
    }
  ];

  return (
    <section id="timeline" className="relative py-20 bg-[#041120] overflow-hidden border-b border-white/5">
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/40 border border-emerald-500/20 text-[11px] font-bold tracking-widest text-[#FFC107] uppercase rounded-full">
            <Award className="w-3.5 h-3.5" />
            Uncompromised Corporate Standards
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Why Partner with <span className="bg-gradient-to-r from-emerald-400 to-[#FFC107] bg-clip-text text-transparent">Ashonika?</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm">
            We deliver state-of-the-art clean energy solutions backed by rigorous certified safety engineering.
          </p>
        </div>

        {/* Clean, compact responsive Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#09223c]/60 border border-white/15 hover:border-emerald-500/30 transition-all duration-300 shadow-md hover:shadow-emerald-950/10 hover:-translate-y-0.5 flex flex-col sm:flex-row gap-2.5 sm:gap-4 items-start"
            >
              <div className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border shrink-0 ${feature.accent}`}>
                {React.cloneElement(feature.icon as React.ReactElement, { className: 'w-4 h-4 sm:w-5 sm:h-5' })}
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono block">
                  0{index + 1} / Feature
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-[10px] sm:text-xs md:text-[13px] leading-relaxed">
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
