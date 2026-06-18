/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Eye, MapPin, Minimize2, ZoomIn, Landmark, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Industrial';
  location: string;
  capacity: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  images: string[];
}

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
}

export function ImageSlider({ images, alt, className = '' }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000); // slide every 2 seconds
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className={`relative w-full h-full overflow-hidden select-none group/slider ${className}`}>
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={src}
            alt={`${alt} view ${idx + 1}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}

      {/* Navigation arrows (visible on hover) */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity pointer-events-auto"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev + 1) % images.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity pointer-events-auto"
            aria-label="Next Image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/40 px-2 py-1 rounded-full backdrop-blur-xs">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-250 cursor-pointer ${
                idx === currentIndex ? 'bg-[#FFC107] scale-125' : 'bg-white/40 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ProjectsProps {
  viewMode?: 'carousel' | 'full';
  onNavigateToProjectsPage?: () => void;
  onBackToHome?: () => void;
}

export default function Projects({ viewMode = 'full', onNavigateToProjectsPage, onBackToHome }: ProjectsProps) {
  const [filter, setFilter] = useState<'All' | 'Residential' | 'Commercial' | 'Industrial'>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Carousel Active index state
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const projectsData: ProjectItem[] = [
    {
      id: 'proj1',
      title: 'Jain Restaurant',
      category: 'Commercial',
      location: 'RK Link Rd, Tilak Nagar, Kishangarh, Rajasthan 305801',
      capacity: '35 kW Commercial Rooftop',
      beforeImg: 'https://lh3.googleusercontent.com/d/1KtR6Pb1Hzy_xc65XTLtDo_vJ-yRdoSC0',
      afterImg: 'https://lh3.googleusercontent.com/d/1KBBNtASR678yyA1k7ElTqnfbGsOLo4zQ',
      description: '',
      images: [
        'https://lh3.googleusercontent.com/d/1KtR6Pb1Hzy_xc65XTLtDo_vJ-yRdoSC0',
        'https://lh3.googleusercontent.com/d/1KBBNtASR678yyA1k7ElTqnfbGsOLo4zQ'
      ]
    },
    {
      id: 'proj2',
      title: 'R.P. Wood Products Pvt. Ltd.',
      category: 'Industrial',
      location: 'Near Balaji Temple, Ajmer-Jaipur Highway, N.H.-8 Gegal, Ajmer, Rajasthan 305001',
      capacity: '800 kW Industrial Rooftop',
      beforeImg: 'https://lh3.googleusercontent.com/d/18-SgWDtwmkRYI24PRTGgOntVS_kDX9kh',
      afterImg: 'https://lh3.googleusercontent.com/d/1Q-TT-dBmj4OHjIlCh7YrxIjbEyJXkE27',
      description: 'An expansive industrial rooftop solar installation for R.P. Wood Products Pvt. Ltd., designed to seamlessly power heavy wood processing machinery and reduce grid reliance.',
      images: [
        'https://lh3.googleusercontent.com/d/18-SgWDtwmkRYI24PRTGgOntVS_kDX9kh',
        'https://lh3.googleusercontent.com/d/1Q-TT-dBmj4OHjIlCh7YrxIjbEyJXkE27',
        'https://lh3.googleusercontent.com/d/1FwbidEAIG8-XoBQx0vdpkCayEBcJ3Ww2'
      ]
    }
  ];

  const [isDesktop, setIsDesktop] = useState(true);

  React.useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const itemsPerView = isDesktop ? 4 : 2;
  const maxIndex = Math.max(0, projectsData.length - itemsPerView);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  React.useEffect(() => {
    if (activeIndex > maxIndex) {
      setActiveIndex(maxIndex);
    }
  }, [maxIndex, activeIndex]);

  React.useEffect(() => {
    if (viewMode !== 'carousel') return;
    if (maxIndex === 0) {
      setActiveIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex > maxIndex ? 0 : nextIndex;
      });
    }, 3000); // slide slowly every 3 seconds

    return () => clearInterval(interval);
  }, [viewMode, maxIndex]);

  const filteredProjects = projectsData.filter(
    (p) => filter === 'All' || p.category === filter
  );

  // RENDER CAROUSEL MODE (4-columns on desktop / 2-columns on mobile format)
  if (viewMode === 'carousel') {
    return (
      <section id="projects" className="relative py-16 bg-[#071B2F] overflow-hidden border-b border-white/5">
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-[#FFC107]/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header section with unified responsive spacing */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/40 border border-emerald-500/20 text-[11px] font-bold tracking-widest text-[#FFC107] uppercase rounded-full">
              <Eye className="w-3.5 h-3.5" />
              Proven Operational Track Record
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Our <span className="bg-gradient-to-r from-emerald-400 to-[#FFC107] bg-clip-text text-transparent">Grid Commissioned Sites</span>
            </h2>
            <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
              Explore our real-world custom layouts, highlighting empty spaces on before-after premium smart solar grid commissioning.
            </p>
          </div>

          {/* 4-column (desktop) / 2-column (mobile) Slider track view */}
          <div className="relative mb-10 overflow-hidden w-full px-1">
            <div 
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * (100 / itemsPerView)}%)` }}
            >
              {projectsData.map((project) => (
                <div 
                  key={project.id} 
                  className="w-1/2 md:w-1/4 shrink-0 px-2 lg:px-3 pb-4"
                >
                  <div
                    id={`project-card-${project.id}`}
                    className="group relative bg-[#092037]/60 border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-[#041120] h-full flex flex-col justify-between"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Responsive Project thumbnail */}
                    <div className="relative aspect-3/2 w-full overflow-hidden rounded-t-xl shrink-0">
                      <ImageSlider
                        images={project.images}
                        alt={project.title}
                      />
                      <div className="absolute top-2 left-2 bg-[#071B2F]/90 border border-white/10 px-2.5 py-1 rounded-md text-[8px] font-bold text-emerald-400 capitalize font-mono z-20">
                        {project.category}
                      </div>
                    </div>

                    <div className="p-3 md:p-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="flex items-center gap-1 text-[8px] md:text-[9px] text-gray-400 font-bold font-mono uppercase tracking-wider">
                          <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                          <span className="truncate">{project.location}</span>
                        </span>
                        <h3 className="text-xs md:text-sm font-bold text-white group-hover:text-[#FFC107] transition-all line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-[10px] text-gray-400 font-medium">
                          Capacity: {project.capacity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hover arrow buttons when items exceed active viewport capacity */}
            {maxIndex > 0 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-1 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-[#071B2F]/80 hover:bg-[#071B2F] border border-white/10 text-white cursor-pointer transition-all hover:scale-105"
                  aria-label="Previous items"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-1 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-[#071B2F]/80 hover:bg-[#071B2F] border border-white/10 text-white cursor-pointer transition-all hover:scale-105"
                  aria-label="Next items"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Simple dot indicators if carousel is slideable */}
          {maxIndex > 0 && (
            <div className="flex justify-center items-center gap-1.5 mb-8">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    activeIndex === idx ? 'bg-[#FFC107] w-6' : 'bg-white/20 hover:bg-white/40 w-1.5'
                  }`}
                  aria-label={`Select Project Slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* All Sites Center Link button - Left Exactly As Requested */}
          <div className="flex justify-center">
            <button
              onClick={onNavigateToProjectsPage}
              className="px-6 py-3.5 rounded-full bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs md:text-sm tracking-wider uppercase cursor-pointer transition-all duration-200 shadow-md flex items-center justify-center gap-2 border border-emerald-400/25 hover:-translate-y-0.5"
            >
              <span>All Sites</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Full project modal details view overlay shared right in return */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div
              id="projects-modal-layout"
              className="w-full max-w-3xl bg-[#07203b] rounded-3xl border border-emerald-500/30 p-6 md:p-8 relative max-h-[95vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close project modal dialog"
              >
                <Minimize2 className="w-5 h-5" />
              </button>

              {/* Header block */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/25 rounded-md text-xs font-mono font-semibold capitalize mb-2">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 mt-2 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  {selectedProject.location} • Installed Capacity: {selectedProject.capacity}
                </p>
              </div>

              {/* Split row: big image vs description */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
                
                <div className={`${selectedProject.description ? 'md:col-span-7' : 'md:col-span-12'} rounded-2xl overflow-hidden border border-white/5 aspect-3/2`}>
                  <ImageSlider
                    images={selectedProject.images}
                    alt={selectedProject.title}
                  />
                </div>

                {selectedProject.description && (
                  <div className="md:col-span-5 space-y-4">
                    <h4 className="text-xs font-bold text-[#FFC107] uppercase tracking-widest border-b border-white/5 pb-2">
                      Project Overview
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                )}

              </div>

              {/* Final Assessment CTA */}
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                    Request custom feasibility proposal
                  </h5>
                  <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
                    We use CAD satellite simulators to model solar system performance.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    if (onBackToHome) {
                      onBackToHome();
                    }
                    setTimeout(() => {
                      const contactSec = document.getElementById('contact');
                      if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#FFC107] text-[#071B2F] font-bold text-xs tracking-wider uppercase hover:bg-amber-400 cursor-pointer transition-all flex items-center justify-center gap-1"
                >
                  <span>Request Survey</span>
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  // RENDER COMPREHENSIVE FULL PAGE VIEW (When redirected or selected projects view)
  return (
    <section id="projects" className="relative py-16 bg-[#071B2F] overflow-hidden border-b border-white/5">
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back navigation block when standalone */}
        {onBackToHome && (
          <div className="mb-6 flex justify-start">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-bold transition-all border border-white/5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        )}

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/40 border border-emerald-500/20 text-[11px] font-bold tracking-widest text-[#FFC107] uppercase rounded-full">
              <Eye className="w-3.5 h-3.5" />
              Proven Operational Track Record
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none">
              Featured <span className="bg-gradient-to-r from-emerald-400 to-[#FFC107] bg-clip-text text-transparent">Grid Installations</span>
            </h2>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Explore our physical layout, showcasing empty roof spaces versus high-powered smart solar grid commissioning.
            </p>
          </div>


        </div>



        {/* Gallery Showcase Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredProjects.map((project) => (
            <div
              id={`project-card-${project.id}`}
              key={project.id}
              className="group relative p-3 md:p-5 bg-[#092037]/60 border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-[#041120]"
              onClick={() => setSelectedProject(project)}
            >
              {/* Responsive Project thumbnail */}
              <div className="relative aspect-3/2 w-full overflow-hidden rounded-xl mb-3 md:mb-4">
                <ImageSlider
                  images={project.images}
                  alt={project.title}
                />
                <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-[#071B2F]/90 border border-white/10 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md text-[8px] md:text-[9px] font-bold text-emerald-400 capitalize font-mono z-20">
                  {project.category}
                </div>
              </div>

              <div>
                <span className="flex items-center gap-1 text-[8px] md:text-[10px] text-gray-400 font-bold font-mono uppercase tracking-wider">
                  <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-red-500 shrink-0" />
                  <span className="truncate">{project.location}</span>
                </span>
                <h3 className="text-xs md:text-base lg:text-lg font-bold text-white mt-1 group-hover:text-[#FFC107] transition-all line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-[10px] md:text-xs text-gray-450 font-medium mt-1">
                  Capacity: {project.capacity}
                </p>
              </div>


            </div>
          ))}
        </div>
      </div>

      {/* Full project modal details view overlay */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div
            id="projects-modal-layout"
            className="w-full max-w-3xl bg-[#07203b] rounded-3xl border border-emerald-500/30 p-6 md:p-8 relative max-h-[95vh] overflow-y-auto"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer animate-pulse"
              aria-label="Close project modal dialog"
            >
              <Minimize2 className="w-5 h-5" />
            </button>

            {/* Header block */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/25 rounded-md text-xs font-mono font-semibold capitalize mb-2">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {selectedProject.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 mt-2 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                {selectedProject.location} • Installed Capacity: {selectedProject.capacity}
              </p>
            </div>

            {/* Split row: big image vs description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
              
              <div className={`${selectedProject.description ? 'md:col-span-7' : 'md:col-span-12'} rounded-2xl overflow-hidden border border-white/5 aspect-3/2`}>
                <ImageSlider
                  images={selectedProject.images}
                  alt={selectedProject.title}
                />
              </div>

              {selectedProject.description && (
                <div className="md:col-span-5 space-y-4">
                  <h4 className="text-xs font-bold text-[#FFC107] uppercase tracking-widest border-b border-white/5 pb-2">
                    Project Overview
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
              )}

            </div>

            {/* Final Assessment CTA */}
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                  Request custom feasibility proposal
                </h5>
                <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
                  We use CAD satellite simulators to model solar system performance.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  if (onBackToHome) {
                    onBackToHome();
                  }
                  setTimeout(() => {
                    const contactSec = document.getElementById('contact');
                    if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#FFC107] text-[#071B2F] font-bold text-xs tracking-wider uppercase hover:bg-amber-400 cursor-pointer transition-all flex items-center justify-center gap-1"
              >
                <span>Request Survey</span>
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
