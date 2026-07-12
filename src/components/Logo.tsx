/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-1.5 sm:gap-2.5 select-none ${className}`}>
      <img
        src="https://lh3.googleusercontent.com/d/1XT4C5ZM-aRBphGpdSCVpBj5BlPs9i_K8"
        alt="Ashonika Green Energy Logo"
        className="h-8 sm:h-10 lg:h-9 xl:h-11 w-auto object-contain transition-transform duration-300 hover:scale-[1.07]"
        referrerPolicy="no-referrer"
      />

      {showText && (
        <div className="flex flex-col tracking-wider font-sans">
          {/* ASHONIKA Typography with integrated thunderbolt element */}
          <div className="flex items-center text-xs sm:text-lg lg:text-base xl:text-xl font-bold font-sans text-slate-900 dark:text-slate-100 tracking-widest leading-none drop-shadow-xs">
            <span>ASH</span>
            {/* Custom stylized electric thunderbolt letter "O" */}
            <span className="relative flex items-center justify-center mx-[2px] w-3 h-3 sm:w-4.5 sm:h-4.5 lg:w-4 lg:h-4 xl:w-4.5 xl:h-4.5 bg-emerald-600 rounded-full">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 text-amber-400 absolute"
              >
                <path
                  d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                  fill="currentColor"
                  strokeWidth="0.5"
                  stroke="currentColor"
                />
              </svg>
            </span>
            <span>NIKA</span>
          </div>

          {/* Subtext: GREEN ENERGY */}
          <div className="flex items-center justify-between text-[6px] sm:text-[8px] lg:text-[7px] xl:text-[9px] font-bold text-emerald-450 tracking-[0.25em] leading-tight mt-0.5">
            <span>GREEN ENERGY</span>
          </div>
        </div>
      )}
    </div>
  );
}
