/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, Facebook, Instagram, Youtube, Linkedin, Heart } from 'lucide-react';
import Logo from './Logo.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  return (
    <footer id="footer-section-wrapper" className="relative bg-slate-50 border-t border-slate-200/60 pt-24 pb-8 overflow-hidden font-sans">
      
      {/* Premium Undulating Wave animated vectors on top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 select-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 md:h-16 text-white"
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-16 border-b border-slate-200/60">
          
          {/* Logo & Slogan Column */}
          <div className="space-y-4 max-w-xl">
            <div className="cursor-pointer" onClick={() => onNavigate('home')}>
              <Logo />
            </div>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              {language === 'en' ? (
                "Ashonika Green Energy is a premier certified solar EPC corporation specializing in high-voltage microgrid layouts, net-metering synchronization, and lifetime tracking coordinates for commercial, public, and private properties."
              ) : (
                "आशोनिका ग्रीन एनर्जी एक प्रमुख प्रमाणित सोलर EPC कंपनी है जो व्यावसायिक, सार्वजनिक और निजी संपत्तियों के लिए हाई-वोल्टेज माइक्रोग्रिड लेआउट, नेट-मीटरिंग सिंक्रोनाइजेशन और लाइफटाइम ट्रैकिंग में विशेषज्ञता रखती है।"
              )}
            </p>

            {/* Social handles */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61590887721251"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 flex items-center justify-center text-slate-500 transition-all cursor-pointer"
                aria-label="Facebook Profile"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/ashonikagreenenergy/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 flex items-center justify-center text-slate-500 transition-all cursor-pointer"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@AshonikaGreenEnergy"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 flex items-center justify-center text-slate-500 transition-all cursor-pointer"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/ashonika-green-energy"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 flex items-center justify-center text-slate-500 transition-all cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick inline coordinates */}
          <div className="space-y-3 font-mono text-[11px] md:text-xs text-slate-600 self-stretch md:self-auto flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8 shrink-0">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase block mb-1">
              {language === 'en' ? 'Contact Info' : 'संपर्क विवरण'}
            </span>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              +91 77280-23503
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              info@ashonika.com
            </p>
          </div>

        </div>

        {/* SEO Footer Extension: Keyword-Optimized Locations & Service Coverage */}
        <div className="py-8 border-b border-slate-200/60 space-y-6">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase">
              {language === 'hi' ? 'सोलर सर्विस क्षेत्र और प्रमुख स्थान' : 'Solar Service Regions & Major Coverage Areas'}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong>Kishangarh & Ajmer District:</strong> Sarana, Magra, Madanganj Kishangarh, Harmara, Marble Slurry Area, Pushkar, Beawar, Kekri, Nasirabad, Ajmer City, Silora Industrial Area.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong>Rajasthan Solar EPC Coverage:</strong> Jaipur, Jodhpur, Udaipur, Kota, Bhilwara, Bikaner, Alwar, Sikar, Nagaur, Chittorgarh, Pali, Tonk, Jhunjhunu, Hanumangarh, Sri Ganganagar, and all districts across Rajasthan.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong>Pan-India EPC Network:</strong> Delhi NCR, Haryana, Punjab, Madhya Pradesh, Gujarat, Uttar Pradesh, and nationwide commercial & industrial solar EPC projects in India.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[10px] text-slate-500">
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Best Solar Company Kishangarh</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Solar Panel Dealer Ajmer</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">PM Surya Ghar Subsidy Rajasthan</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">3kW Rooftop Solar Cost</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">5kW Solar Plant Price</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">10kW Commercial Solar EPC</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Loom Solar Dealer Rajasthan</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">On-Grid Solar Installer Ajmer</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Hybrid Solar Power System</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Top Solar EPC Company India</span>
          </div>
        </div>

        {/* Lower row: Copy notes */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p>© {currentYear} Ashonika Green Energy Private Limited. {language === 'en' ? 'All rights reserved.' : 'सर्वाधिकार सुरक्षित।'}</p>
          <p className="flex items-center gap-1">
            {language === 'en' ? 'Engineered with' : 'कार्बन-मुक्त पृथ्वी के लिए'}
            <Heart className="w-3 h-3 text-rose-500 fill-current" />
            {language === 'en' ? 'for a carbon-neutral planet.' : 'प्रेमपूर्वक निर्मित।'}
          </p>
        </div>

      </div>
    </footer>
  );
}
