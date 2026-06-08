/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { motion } from 'motion/react';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  avatar: string;
}

export default function TestimonialCarousel() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const list: TestimonialItem[] = [
    {
      id: 'test1',
      name: 'Rajesh Singhal',
      role: 'Operations VP',
      company: 'Vardhaman Textile Mills',
      rating: 5,
      content: 'We shifted our high-tension fabric manufacturing lines to Ashonika’s 1.2 MWp solar canopy. The transition was completely seamless, with absolutely zero structural downtime. Our energy overhead represents a massive monthly business saving now!',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'test2',
      name: 'Meera Krishnan',
      role: 'Homeowner',
      company: 'Green Canopy Estate',
      rating: 5,
      content: 'Our home roof looks premium and produces more power than we consume! Ashonika Green Energy assisted with the Central PM-Surya Ghar national subsidy filing. The panels are beautiful and our monthly bills are literally zero.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'test3',
      name: 'Suresh Oberoi',
      role: 'General Director',
      company: 'Oberoi Logistics & Cold Storage',
      rating: 5,
      content: 'Thermal management is critical for logistics. Installing a 150 kWp solar grid shade lowered cooling demands below and generates surplus returns. Their ROI savings estimation calculator is extremely accurate!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    }
  ];

  // Auto scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % list.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [list.length]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + list.length) % list.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % list.length);
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <Star
        key={idx}
        className={`w-3.5 h-3.5 ${
          idx < count ? 'fill-[#FFC107] text-[#FFC107]' : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="relative py-28 bg-[#071B2F] overflow-hidden border-b border-white/5">

      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Static introduction details text (5cols) */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-bold tracking-widest text-[#FFC107] uppercase">
              <Quote className="w-3.5 h-3.5" />
              Verified Client Endorsements
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              What Our <span className="bg-gradient-to-r from-emerald-400 to-[#FFC107] bg-clip-text text-transparent">Partners Say</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              From heavy textile mill logistics to premium residential spaces, our certified solar grids empower our clients across the country.
            </p>

            {/* Quick selector dots */}
            <div className="flex gap-2.5 pt-4">
              {list.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIdx === idx ? 'w-8 bg-[#FFC107]' : 'w-2.5 bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`View testimonial client ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Testimonial Active Slider Card panel (7cols) */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            <div className="absolute -top-10 -left-6 text-emerald-800/20 pointer-events-none select-none">
              <Quote className="w-56 h-56 transform rotate-180" />
            </div>

            {/* Glassmorphic review card wrap */}
            <div className="relative p-8 md:p-10 rounded-3xl bg-linear-to-b from-[#09223c] to-[#041221] border border-white/10 shadow-2xl space-y-8 overflow-hidden min-h-[300px] flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {renderStars(list[activeIdx].rating)}
                </div>
                <p className="text-white text-sm md:text-base leading-relaxed italic font-medium">
                  "{list[activeIdx].content}"
                </p>
              </div>

              {/* Client Profile panel footer */}
              <div className="flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-emerald-500/20 bg-emerald-500/10">
                    <img
                      src={list[activeIdx].avatar}
                      alt={list[activeIdx].name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      {list[activeIdx].name}
                    </h4>
                    <span className="text-[10px] md:text-xs text-[#FFC107] font-semibold block mt-0.5">
                      {list[activeIdx].role} at {list[activeIdx].company}
                    </span>
                  </div>
                </div>

                {/* Left/Right manual triggers buttons inside card */}
                <div className="flex gap-2 pointer-events-auto">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-xl bg-[#061829] border border-white/5 text-gray-400 hover:text-white hover:bg-[#0c2a46] transition-colors cursor-pointer"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-xl bg-[#061829] border border-white/5 text-gray-400 hover:text-white hover:bg-[#0c2a46] transition-colors cursor-pointer"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
