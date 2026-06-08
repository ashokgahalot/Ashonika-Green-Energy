/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo.tsx';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Solar Calculator', id: 'calculator' },
    { label: 'Why Choose Us', id: 'timeline' },
    { label: 'Projects', id: 'projects' },
  ];

  const handleMenuClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      id="main-navigation-bar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#071B2F]/85 backdrop-blur-md py-4 border-b border-emerald-600/20 shadow-xl'
          : 'bg-transparent py-6 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo element */}
          <div className="cursor-pointer" onClick={() => handleMenuClick('home')}>
            <Logo />
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-colors rounded-full duration-150 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-[#FFC107] bg-white/5 font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Side action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => handleMenuClick('contact')}
              className="px-5 py-2.5 rounded-full bg-linear-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-xs tracking-wider uppercase hover:from-emerald-500 hover:to-emerald-400 cursor-pointer transition-all duration-200 transform hover:scale-[1.03] shadow-lg shadow-emerald-900/30 border border-emerald-400/20 flex items-center gap-1.5"
            >
              Get Quote
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu triggers */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav screen panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#071B2F]/95 backdrop-blur-lg border-b border-emerald-600/20 shadow-2xl overflow-y-auto max-h-[85vh]">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl font-medium tracking-wide transition-all ${
                  activeSection === item.id
                    ? 'text-[#FFC107] bg-white/5 border-l-2 border-[#FFC107]'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 px-4 border-t border-white/5">
              <button
                onClick={() => handleMenuClick('contact')}
                className="w-full text-center py-3 rounded-full bg-linear-to-r from-emerald-600 to-emerald-500 text-white font-bold tracking-wider uppercase hover:from-emerald-500 shadow-md flex items-center justify-center gap-2"
              >
                <span>Get Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
