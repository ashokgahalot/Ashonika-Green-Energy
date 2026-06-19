import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SkeletonLoaderProps {
  theme: 'light' | 'dark';
}

export default function SkeletonLoader({ theme }: SkeletonLoaderProps) {
  // Determine if it should render dark theme background based on prop
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-0 z-100 flex flex-col justify-between overflow-hidden select-none transition-colors duration-300 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-800'
      }`}
    >
      {/* Premium ambient light flare in dark mode */}
      {isDark && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
        </>
      )}

      {/* Header Placeholder */}
      <header className={`border-b ${isDark ? 'border-slate-800/40 bg-slate-950/80' : 'border-slate-200/60 bg-white/80'} backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4 shrink-0`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg animate-pulse ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`} />
            <div className={`h-5 w-32 rounded-md animate-pulse ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`} />
          </div>

          {/* Navigation Links Placeholders */}
          <div className="hidden lg:flex items-center gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`h-4 w-16 rounded-md animate-pulse ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>

          {/* Theme Switcher & Call Button Placeholders */}
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full animate-pulse ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`} />
            <div className={`hidden sm:block w-36 h-10 rounded-full animate-pulse ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`} />
          </div>
        </div>
      </header>

      {/* Main Content Hero Skeleton Grid */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex items-center relative z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column: Hero Text Copy Skeleton */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            {/* Animated Badge */}
            <div className="inline-flex items-center justify-center lg:justify-start">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                <div className={`h-3 w-40 rounded-sm animate-pulse ${isDark ? 'bg-slate-800' : 'bg-slate-250'}`} />
              </div>
            </div>

            {/* Huge Heading Lines */}
            <div className="space-y-4">
              <div className={`h-12 md:h-16 w-11/12 mx-auto lg:mx-0 rounded-xl animate-pulse ${
                isDark ? 'bg-slate-900' : 'bg-slate-100'
              }`} />
              <div className={`h-12 md:h-16 w-3/4 mx-auto lg:mx-0 rounded-xl animate-pulse ${
                isDark ? 'bg-slate-900' : 'bg-slate-100'
              }`} />
              <div className={`h-12 md:h-16 w-5/6 mx-auto lg:mx-0 rounded-xl animate-pulse ${
                isDark ? 'bg-slate-900' : 'bg-slate-100'
              }`} />
            </div>

            {/* Description Subtext Line */}
            <div className="space-y-2.5 max-w-xl mx-auto lg:mx-0">
              <div className={`h-4.5 w-full rounded-md animate-pulse ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`} />
              <div className={`h-4.5 w-5/6 rounded-md animate-pulse ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`} />
            </div>

            {/* Interactive Call-To-Action Button Skeleton */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
              <div className={`h-14 w-full sm:w-56 rounded-full animate-pulse ${
                isDark ? 'bg-emerald-900/60' : 'bg-emerald-100'
              }`} />
            </div>
          </div>

          {/* Right Column: Globe Simulation Spinner Placeholder */}
          <div className="lg:col-span-5 h-[320px] lg:h-[480px] flex items-center justify-center relative">
            {/* Pulsing Globe Outer Circle */}
            <div className={`w-72 h-72 sm:w-85 sm:h-85 lg:w-96 lg:h-96 rounded-full border flex items-center justify-center animate-spin-slow ${
              isDark ? 'border-emerald-500/10' : 'border-emerald-500/5'
            }`}>
              {/* Inner Pulsing Rings */}
              <div className={`w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full border flex items-center justify-center animate-pulse ${
                isDark ? 'border-amber-500/5 bg-slate-900/40' : 'border-amber-500/5 bg-slate-50/40'
              }`}>
                {/* Center Core */}
                <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center border-2 border-dashed ${
                  isDark ? 'border-emerald-500/20 bg-slate-905' : 'border-emerald-500/10 bg-white'
                }`}>
                  <div className={`w-16 h-16 rounded-full animate-pulse ${
                    isDark ? 'bg-emerald-500/20' : 'bg-emerald-500/15'
                  }`} />
                </div>
              </div>
            </div>

            {/* Floating abstract orbital items representing solar panels */}
            <div className={`absolute top-1/4 right-8 w-12 h-8 rounded-lg border flex items-center justify-center animate-pulse ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className={`w-6 h-1 bg-emerald-500/40 rounded-xs`} />
            </div>
            <div className={`absolute bottom-1/4 left-10 w-10 h-6 rounded-lg border flex items-center justify-center animate-pulse ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className={`w-4 h-1 bg-amber-500/40 rounded-xs`} />
            </div>
          </div>

        </div>
      </main>

      {/* Footer Placeholder Bar */}
      <footer className={`border-t ${
        isDark ? 'border-slate-800/40 bg-slate-950/80 text-slate-500' : 'border-slate-200/60 bg-white/80 text-slate-400'
      } px-4 py-4 shrink-0 font-mono text-[10px] sm:text-xs relative z-10`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>AUTHENTIC TIER-1 HARNESS ECOSYSTEM</span>
          </div>
          <div className="flex gap-4">
            <div className={`h-3 w-28 rounded-xs animate-pulse ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`} />
            <div className={`h-3 w-24 rounded-xs animate-pulse ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`} />
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
