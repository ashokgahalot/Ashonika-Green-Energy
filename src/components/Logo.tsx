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
      {/* SVG Icon part of the brand logo */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="primaryLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="50%" stopColor="#0B8F4D" />
            <stop offset="100%" stopColor="#065F31" />
          </linearGradient>
          <linearGradient id="solarYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#FFC107" />
          </linearGradient>
          <linearGradient id="accentBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        {/* Outer Circular/Spherical Leaf Arc */}
        <path
          d="M 280 200 A 90 90 0 1 0 110 260 C 120 280, 160 300, 200 305"
          stroke="url(#primaryLeafGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />

        {/* The Solar Cell grid background design */}
        <g transform="translate(190, 130) scale(0.6)">
          {/* Main frame of solar panels */}
          <polygon
            points="10,60 90,60 110,120 -10,120"
            fill="url(#accentBlueGrad)"
            stroke="#ffffff"
            strokeWidth="3"
          />
          {/* Grid lines */}
          <line x1="30" y1="60" x2="15" y2="120" stroke="#ffffff" strokeWidth="2" />
          <line x1="50" y1="60" x2="50" y2="120" stroke="#ffffff" strokeWidth="2" />
          <line x1="70" y1="60" x2="85" y2="120" stroke="#ffffff" strokeWidth="2" />
          <line x1="0" y1="90" x2="100" y2="90" stroke="#ffffff" strokeWidth="2" />
        </g>

        {/* The Wind Turbine back outline */}
        <g transform="translate(240, 110) scale(0.6)">
          {/* Tower */}
          <path d="M 0 110 L -4 10 L 4 10 Z" fill="#e2e8f0" />
          {/* Rotor cap */}
          <circle cx="0" cy="10" r="5" fill="#94a3b8" />
          {/* Rotor blades (tilted) */}
          <path d="M 0 10 C -5 -20, -5 -40, 0 -60 C 2 -40, 2 -20, 0 10 Z" fill="#94a3b8" />
          <path d="M 0 10 C 20 5, 40 10, 56 15 C 40 5, 20 0, 0 10 Z" fill="#94a3b8" />
          <path d="M 0 10 C -20 15, -35 30, -48 44 C -35 25, -20 15, 0 10 Z" fill="#94a3b8" />
        </g>

        {/* Bold Futuristic "A" merged with the brand style */}
        <g transform="translate(110, 100)">
          {/* Green Styled Left Leaf of the A */}
          <path
            d="M 20 140 C -15 110, -10 60, 20 45 C 15 75, 10 110, 20 140 Z"
            fill="url(#primaryLeafGrad)"
          />
          {/* The main A shape vector frame */}
          <path
            d="M 50 10 L 105 130"
            stroke="url(#primaryLeafGrad)"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M 50 10 L 5 130"
            stroke="url(#primaryLeafGrad)"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Dual leaf icons inside the A cavity */}
          <path
            d="M 45 75 C 38 65, 30 65, 25 70 C 30 78, 38 78, 45 75 Z"
            fill="#4ADE80"
          />
          <path
            d="M 55 75 C 62 65, 70 65, 75 70 C 70 78, 62 78, 55 75 Z"
            fill="#4ADE80"
          />
        </g>

        {/* High Tech "G" and "E" stylized glyph outlines forming the bottom anchor */}
        <g transform="translate(150, 220)">
          {/* G outline */}
          <path
            d="M 85 45 C 50 45, 20 42, 20 70 C 20 95, 55 98, 85 95 C 85 80, 52 80, 52 80 L 85 80 L 85 64"
            stroke="url(#primaryLeafGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* E outline */}
          <path
            d="M 100 48 L 140 48 M 100 70 L 132 70 M 100 92 L 140 92 M 100 48 L 100 92"
            stroke="url(#primaryLeafGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* Small Sunlight Spark particle at the top loop junction */}
        <circle cx="210" cy="98" r="8" fill="url(#solarYellowGrad)" />
      </svg>

      {showText && (
        <div className="flex flex-col tracking-wider font-sans">
          {/* ASHOK Typography */}
          <div className="flex items-center text-xl md:text-2xl font-bold font-sans text-white tracking-widest leading-none drop-shadow-sm">
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
