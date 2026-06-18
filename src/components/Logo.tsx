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
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <img
        src="https://lh3.googleusercontent.com/d/1XT4C5ZM-aRBphGpdSCVpBj5BlPs9i_K8"
        alt="Ashonika Green Energy Logo"
        className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
        referrerPolicy="no-referrer"
      />

      {showText && (
        <div className="flex flex-col tracking-wider font-sans">
          {/* ASHONIKA Typography with integrated thunderbolt element */}
          <div className="flex items-center text-xl md:text-2xl font-bold font-sans text-white tracking-widest leading-none drop-shadow-xs">
            <span>ASH</span>
            {/* Custom stylized electric thunderbolt letter "O" */}
            <span className="relative flex items-center justify-center mx-[2px] w-5 h-5 bg-emerald-600 rounded-full">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-3.5 h-3.5 text-amber-400 absolute"
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
          <div className="flex items-center justify-between text-[8px] md:text-[10px] font-bold text-emerald-400 tracking-[0.25em] leading-tight">
            <span>GREEN ENERGY</span>
          </div>
        </div>
      )}
    </div>
  );
}
