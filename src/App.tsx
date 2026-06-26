/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronRight, Calculator, PhoneCall, CheckCircle, HelpCircle, Sun } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import InteractiveScene from './components/InteractiveScene.tsx';
import SkeletonLoader from './components/SkeletonLoader.tsx';
import CursorFollowerArt from './components/CursorFollowerArt.tsx';
import InteractiveBackgroundParticles from './components/InteractiveBackgroundParticles.tsx';
import WelcomePopup from './components/WelcomePopup.tsx';
import About from './components/About.tsx';
import Services from './components/Services.tsx';
import WhyChooseUs from './components/WhyChooseUs.tsx';
import TrustedBrands from './components/TrustedBrands.tsx';
import Projects from './components/Projects.tsx';
import Process from './components/Process.tsx';
import ContactForm from './components/Contactform.tsx';
import Footer from './components/Footer.tsx';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [contactSubject, setContactSubject] = useState<string>('Solar Installation');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
    }
    return 'light';
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    // Beautiful loader bootstrap time to allow interactive elements to load
    const timer = setTimeout(() => {
      setInitializing(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Dynamic document title and meta description update based on page route for superior search indexing (SEO)
  useEffect(() => {
    const path = location.pathname;
    let title = 'Ashonika Green Energy | Premium Solar EPC Solutions';
    let description = 'Ashonika Green Energy is a premier certified solar EPC corporation specializing in high-voltage microgrid layouts, net-metering, and commercial/residential installations.';

    if (path === '/about') {
      title = 'About Us | Ashonika Green Energy';
      description = 'Learn about Ashonika Green Energy, our vision, mission, and certified engineers deploying industry-leading grid-tie solar systems.';
    } else if (path === '/services') {
      title = 'Our Solar Services | Ashonika Green Energy';
      description = 'Explore our turn-key solar installations, net metering, residential rooftop arrays, and commercial solar microgrids.';
    } else if (path === '/why-choose-us') {
      title = 'Why Choose Ashonika Green Energy';
      description = 'Discover why over 200+ clients trust us: premium components, certified master electricians, and hassle-free government subsidies.';
    } else if (path === '/projects') {
      title = 'Our Solar Project Portfolio | Ashonika Green Energy';
      description = 'Browse our extensive portfolio of grid-tie residential, commercial, and industrial solar installations.';
    }

    document.title = title;

    // Update meta description if it exists
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Trigger smooth scrolling or routing to section ID / path
  const handleScrollToSection = (sectionId: string) => {
    const isHomePage = location.pathname === '/';

    const routeMap: Record<string, string> = {
      home: '/',
      about: '/about',
      services: '/services',
      timeline: '/why-choose-us',
      projects: '/projects',
      'projects-page': '/projects',
      contact: '#contact'
    };

    if (isHomePage) {
      if (sectionId === 'projects-page') {
        navigate('/projects');
      } else if (sectionId === 'contact') {
        const element = document.getElementById('contact');
        if (element) {
          const offset = 80; // height of fixed header navbar
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          window.scrollTo({
            top: elementRect - bodyRect - offset,
            behavior: 'smooth'
          });
        }
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          window.scrollTo({
            top: elementRect - bodyRect - offset,
            behavior: 'smooth'
          });
          setActiveSection(sectionId);
        } else if (sectionId === 'home') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          setActiveSection('home');
        } else {
          const path = routeMap[sectionId];
          if (path) navigate(path);
        }
      }
    } else {
      // Not on home page, navigate to dedicated path
      const path = routeMap[sectionId];
      if (path) {
        if (path === '#contact') {
          navigate('/');
          // Let home page render, then scroll to contact form
          setTimeout(() => {
            const element = document.getElementById('contact');
            if (element) {
              const offset = 80;
              const bodyRect = document.body.getBoundingClientRect().top;
              const elementRect = element.getBoundingClientRect().top;
              window.scrollTo({
                top: elementRect - bodyRect - offset,
                behavior: 'smooth'
              });
            }
          }, 150);
        } else {
          navigate(path);
        }
      }
    }
  };

  // Automated scroll observer to highlight current navigation tab (only active on home page)
  useEffect(() => {
    const handleScroll = () => {
      const path = location.pathname;
      if (path !== '/') {
        if (path === '/about') setActiveSection('about');
        else if (path === '/services') setActiveSection('services');
        else if (path === '/why-choose-us') setActiveSection('timeline');
        else if (path === '/projects') setActiveSection('projects');
        return;
      }

      const sections = [
        'home',
        'about',
        'services',
        'timeline',
        'projects',
        'process',
        'contact'
      ];

      const scrollPosition = window.scrollY + 200; // offset factor

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load/route change to sync state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle CTA inside services on sub-pages
  const handleRequestSurvey = () => {
    setContactSubject('Free Site Survey');
    handleScrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-emerald-600 selection:text-white relative transition-colors duration-300">
      
      {/* Futuristic Solar Energy Cursor Follower Art */}
      <CursorFollowerArt />

      {/* Subtle, interactive, high-performance background particles */}
      <InteractiveBackgroundParticles theme={theme} />

      {/* Modern Solar Energy Welcome Popup */}
      <WelcomePopup />

      {/* Animated Framer-Motion System-Initialization Skeleton Loader */}
      <AnimatePresence>
        {initializing && <SkeletonLoader theme={theme} />}
      </AnimatePresence>

      {/* Interactive Sticky Header Navigation */}
      <Navbar onNavigate={handleScrollToSection} activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />

      {/* Routing pages section */}
      <Routes>
        {/* Full standard index landing page */}
        <Route path="/" element={
          <>
            {/* Hero section landing front */}
            <header
              id="home"
              className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
            >
              {/* Dynamic Holographic Earth Glow Canvas Background */}
              <InteractiveScene />

               {/* Ambient Top Gradients */}
              <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-black/5 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white dark:from-slate-950 to-transparent z-10 pointer-events-none transition-colors duration-300" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center lg:text-left py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Hero Copy (7cols) */}
                  <div className="lg:col-span-7 space-y-6 md:space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/15 text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase animate-pulse select-none">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Tomorrow's Smart Grid Today</span>
                    </div>

                    <div className="space-y-4">
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-none">
                        Turn Your Electricity Bill Into a{' '}
                        <span className="bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                          Long-Term Asset
                        </span>
                      </h1>
                      <p className="text-slate-600 dark:text-slate-350 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                        End-to-End Solar EPC Solutions Designed for Maximum Savings and Long-Term Performance.
                      </p>
                    </div>

                    {/* Action buttons list */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                      <button
                        onClick={() => handleScrollToSection('contact')}
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs md:text-sm tracking-wider uppercase cursor-pointer transition-all duration-200 transform hover:scale-[1.03] shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 border border-emerald-400/25"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span>Free Solar Consultation</span>
                      </button>
                    </div>
                  </div>

                  {/* Empty space/Visual aspect in Hero to make way for the rotating Globe Canvas (5cols) */}
                  <div className="lg:col-span-5 h-[350px] lg:h-[500px] pointer-events-none relative" />

                </div>
              </div>
            </header>

            {/* Corporate profile Section */}
            <About />

            {/* Solutions Services Section */}
            <Services onRequestSurvey={handleRequestSurvey} />

            {/* Operational Standardized Why Choose Timeline Section */}
            <WhyChooseUs />

            {/* Trusted Component Manufacturer Brands Section */}
            <TrustedBrands />

            {/* Portfolio Showcase Carousel Section on Home Page */}
            <Projects viewMode="carousel" onNavigateToProjectsPage={() => handleScrollToSection('projects-page')} />

            {/* Horiz/Vertical Journey Pipeline Section */}
            <Process />

            {/* Free Site Assessment Contact Lead Forms Section */}
            <ContactForm selectedSubject={contactSubject} onSubjectChange={setContactSubject} />

            {/* Corporate Slogan Wave Dark Footer */}
            <Footer onNavigate={handleScrollToSection} />
          </>
        } />

        {/* Separate Standalone About Us Page */}
        <Route path="/about" element={
          <div className="pt-20 min-h-screen flex flex-col">
            <header className="relative pt-20 pb-16 bg-slate-50 dark:bg-slate-900/40 overflow-hidden border-b border-slate-200/60 dark:border-slate-800/40">
              <InteractiveScene />
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none transition-colors duration-300" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/15 text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase select-none">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get To Know Ashonika</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                  About <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Our Vision & Mission</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-350 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  Empowering communities with commercial & residential solar energy installations. Learn more about our technical engineering pedigree and sustainability benchmarks.
                </p>
              </div>
            </header>

            <About />

            <ContactForm selectedSubject={contactSubject} onSubjectChange={setContactSubject} />

            <Footer onNavigate={handleScrollToSection} />
          </div>
        } />

        {/* Separate Standalone Services Page */}
        <Route path="/services" element={
          <div className="pt-20 min-h-screen flex flex-col">
            <header className="relative pt-20 pb-16 bg-slate-50 dark:bg-slate-900/40 overflow-hidden border-b border-slate-200/60 dark:border-slate-800/40">
              <InteractiveScene />
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none transition-colors duration-300" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/15 text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase select-none">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>High-Yield Solar Architecture</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                  Our <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Solar Solutions</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-350 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  From premium residential systems to high-voltage industrial solar EPC projects. Explore our customizable engineering services.
                </p>
              </div>
            </header>

            <Services onRequestSurvey={handleRequestSurvey} />

            <ContactForm selectedSubject={contactSubject} onSubjectChange={setContactSubject} />

            <Footer onNavigate={handleScrollToSection} />
          </div>
        } />

        {/* Separate Standalone Why Choose Us Page */}
        <Route path="/why-choose-us" element={
          <div className="pt-20 min-h-screen flex flex-col">
            <header className="relative pt-20 pb-16 bg-slate-50 dark:bg-slate-900/40 overflow-hidden border-b border-slate-200/60 dark:border-slate-800/40">
              <InteractiveScene />
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none transition-colors duration-300" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/15 text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase select-none">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Ashonika Advantage</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                  Why Choose <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Ashonika Energy</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-350 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  Discover why over 200+ clients trust us for sustainable energy: premium grade Tier-1 components, certified engineers, and government subsidy processing.
                </p>
              </div>
            </header>

            <WhyChooseUs />

            <TrustedBrands />

            <ContactForm selectedSubject={contactSubject} onSubjectChange={setContactSubject} />

            <Footer onNavigate={handleScrollToSection} />
          </div>
        } />

        {/* Separate Standalone Projects Page */}
        <Route path="/projects" element={
          <div className="pt-20 min-h-screen flex flex-col">
            <header className="relative pt-20 pb-16 bg-slate-50 dark:bg-slate-900/40 overflow-hidden border-b border-slate-200/60 dark:border-slate-800/40">
              <InteractiveScene />
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none transition-colors duration-300" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/15 text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase select-none">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Our National Engineering Portfolio</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                  Ashonika <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Project Portfolio</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-350 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  Complete engineering logs of our nationwide grid-tie commissioning catalog, including live efficiency comparisons and case analyses.
                </p>
              </div>
            </header>

            <Projects viewMode="full" onBackToHome={() => handleScrollToSection('home')} />

            <ContactForm selectedSubject={contactSubject} onSubjectChange={setContactSubject} />

            <Footer onNavigate={handleScrollToSection} />
          </div>
        } />

        {/* Fallback redirect */}
        <Route path="*" element={
          <div className="pt-20 min-h-screen flex flex-col justify-center items-center text-center space-y-4 bg-slate-50 dark:bg-slate-900">
            <h1 className="text-6xl font-black text-emerald-600">404</h1>
            <p className="text-slate-600 dark:text-slate-350">Page not found. Redirecting to home...</p>
            <button onClick={() => navigate('/')} className="px-6 py-3 rounded-full bg-emerald-600 text-white font-bold shadow-md hover:bg-emerald-500">
              Go Home
            </button>
          </div>
        } />
      </Routes>

      {/* Floating Call Button */}
      <a
        href="tel:+917728023503"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl transition-all duration-300 transform hover:scale-110 group cursor-pointer"
        aria-label="Call Solar Helpline"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping" />
        <PhoneCall className="w-6 h-6" />
        <span className="absolute right-full mr-3 whitespace-nowrap bg-white border border-slate-200 px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-xs font-bold text-slate-800 shadow-lg shadow-black/5">
          Call solar helpline (+91 77280-23503)
        </span>
      </a>

    </div>
  );
}
