/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import Logo from './Logo.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
}

export default function Navbar({ onNavigate, activeSection, theme = 'light', toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

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
    { label: t('nav', 'home'), id: 'home' },
    { label: t('nav', 'about'), id: 'about' },
    { label: t('nav', 'services'), id: 'services' },
    { label: t('nav', 'calculator'), id: 'calculator' },
    { label: t('nav', 'timeline'), id: 'timeline' },
    { label: t('nav', 'projects'), id: 'projects' },
    { label: t('nav', 'faqs'), id: 'faqs' },
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
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md py-4 border-b border-emerald-600/10 dark:border-emerald-500/10 shadow-lg'
          : 'bg-transparent py-6 border-b border-slate-200/50 dark:border-slate-850/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo element */}
          <div className="cursor-pointer" onClick={() => handleMenuClick('home')}>
            <Logo />
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`relative px-1.5 xl:px-3 py-1.5 text-[11px] xl:text-[13px] font-bold tracking-wide rounded-full cursor-pointer transition-colors duration-300 ${
                    isActive
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 bg-emerald-50/50 dark:bg-emerald-950/40 rounded-full -z-10 border border-emerald-550/10 dark:border-emerald-400/20 shadow-xs"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Side action CTAs */}
          <div className="hidden sm:flex items-center gap-1.5 xl:gap-3 shrink-0">
            {/* Elegant Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 xl:p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300 cursor-pointer flex items-center justify-center shadow-xs"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle visual theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-amber-500 animate-[spin_6s_linear_infinite]" />
              ) : (
                <Moon className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-emerald-600" />
              )}
            </button>

            {/* Language Switcher Button (to the left of Get Quote) */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 xl:px-3.5 py-1.5 xl:py-2 text-[10px] xl:text-xs font-bold uppercase rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer shadow-xs select-none"
              title="Switch Language / भाषा बदलें"
            >
              <span className={language === 'en' ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : 'text-slate-400 dark:text-slate-500 font-medium'}>EN</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className={language === 'hi' ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : 'text-slate-400 dark:text-slate-500 font-medium'}>हिन्दी</span>
            </button>

            <button
              onClick={() => handleMenuClick('contact')}
              className="px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-full bg-linear-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-[10px] xl:text-xs tracking-wider uppercase hover:from-emerald-500 hover:to-emerald-400 cursor-pointer transition-all duration-200 transform hover:scale-[1.03] shadow-lg shadow-emerald-900/10 border border-emerald-400/20 flex items-center gap-1"
            >
              {t('nav', 'getQuote')}
              <ArrowUpRight className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
            </button>
          </div>

          {/* Mobile menu triggers */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Elegant Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all cursor-pointer flex items-center justify-center"
              aria-label="Toggle visual theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-emerald-600" />
              )}
            </button>

            {/* Language Switcher for Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-bold uppercase rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all cursor-pointer shadow-xs select-none animate-pulse-gentle"
              title="Switch Language / भाषा बदलें"
            >
              <span className={language === 'en' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}>EN</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className={language === 'hi' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}>हिन्दी</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-350 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav screen panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/98 dark:bg-slate-950/98 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto max-h-[85vh]">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl font-medium tracking-wide transition-all ${
                  activeSection === item.id
                    ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-l-2 border-emerald-500 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-650 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 px-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => handleMenuClick('contact')}
                className="w-full text-center py-3 rounded-full bg-linear-to-r from-emerald-600 to-emerald-500 text-white font-bold tracking-wider uppercase hover:from-emerald-500 shadow-md flex items-center justify-center gap-2"
              >
                <span>{t('nav', 'getQuote')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
