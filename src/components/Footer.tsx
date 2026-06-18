/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, Facebook, Instagram, Youtube, Linkedin, Heart } from 'lucide-react';
import Logo from './Logo.tsx';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section-wrapper" className="relative bg-[#020912] pt-24 pb-8 overflow-hidden">
      
      {/* Premium Undulating Wave animated vectors on top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 select-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 md:h-16 text-[#041120]"
          fill="currentColor"
        >
          {/* Animated Wave 1 */}
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,55.05,17.22,83.33,24.16,158.28,42.53,238.16,66.11,321.39,56.44Z"
            className="animate-wave-slow opacity-30"
          />
          {/* Animated Wave 2 */}
          <path
            d="M110,60 C320,120 450,20 750,90 C980,140 1080,40 1200,60 V120 H0 V120 Z"
            className="animate-wave opacity-50"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-21 pt-8">
        
        {/* Main Columns Grid block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-16 border-b border-white/5">
          
          {/* Logo & Slogan Column */}
          <div className="space-y-4 max-w-xl">
            <div className="cursor-pointer" onClick={() => onNavigate('home')}>
              <Logo />
            </div>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Ashonika Green Energy is a premier certified solar EPC corporation specializing in high-voltage microgrid layouts, net-metering synchronization, and lifetime tracking coordinates for commercial, public, and private properties.
            </p>

            {/* Social handles */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61590887721251"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-600 hover:text-white border border-white/10 flex items-center justify-center text-gray-400 transition-all cursor-pointer"
                aria-label="Facebook Profile"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/ashonikagreenenergy/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-600 hover:text-white border border-[#ffffff15] flex items-center justify-center text-gray-400 transition-all cursor-pointer"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@AshonikaGreenEnergy"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-600 hover:text-white border border-[#ffffff15] flex items-center justify-center text-gray-400 transition-all cursor-pointer"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/ashonika-green-energy"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-600 hover:text-white border border-[#ffffff15] flex items-center justify-center text-gray-400 transition-all cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick inline coordinates */}
          <div className="space-y-3 font-mono text-[11px] md:text-xs text-gray-400 self-stretch md:self-auto flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8 shrink-0">
            <span className="text-[10px] font-bold text-emerald-405 tracking-widest uppercase block mb-1">
              Contact Info
            </span>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#FFC107] shrink-0" />
              +91 77280-23503
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#0B8F4D] shrink-0" />
              info@ashonika.com
            </p>
          </div>

        </div>

        {/* Lower row: Copy notes */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© {currentYear} Ashonika Green Energy Private Limited. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with
            <Heart className="w-3 h-3 text-rose-500 fill-current" />
            for a carbon-neutral planet.
          </p>
        </div>

      </div>
    </footer>
  );
}
