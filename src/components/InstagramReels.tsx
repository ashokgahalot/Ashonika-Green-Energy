/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Instagram,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

export interface ReelItem {
  id: string;
  youtubeId?: string;
  videoUrl?: string;
  posterUrl: string;
  title: string;
  titleHi: string;
  caption: string;
  captionHi: string;
  permalink: string;
}

const INSTAGRAM_ACCOUNT_URL = 'https://www.instagram.com/ashonikagreenenergy/';
const INSTAGRAM_REELS_URL = 'https://www.instagram.com/ashonikagreenenergy/reels/';

// Official Ashonika Green Energy vertical 9:16 solar installation videos (720x1280),
// playable inline with live mute/unmute & play/pause controls.
const DEFAULT_REELS: ReelItem[] = [
  {
    id: 'reel-1',
    youtubeId: 'lMsI9XBTlvs',
    posterUrl: 'https://i.ytimg.com/vi/lMsI9XBTlvs/oar2.jpg',
    title: 'Industrial Solar Installation',
    titleHi: 'इंडस्ट्रियल सोलर इंस्टॉलेशन',
    caption: 'Heavy-Duty Commercial Rooftop Array • Ashonika',
    captionHi: 'हैवी-ड्यूटी कमर्शियल रूफटॉप सोलर • आशोनिका',
    permalink: 'https://www.instagram.com/reel/Df1GljcylJd/'
  },
  {
    id: 'reel-2',
    youtubeId: 'OWybohYFhL8',
    posterUrl: 'https://i.ytimg.com/vi/OWybohYFhL8/oar2.jpg',
    title: 'Solar Structure Installation',
    titleHi: 'सोलर स्ट्रक्चर इंस्टॉलेशन',
    caption: 'Precision Galvanized Mounting Alignment',
    captionHi: 'मजबूत गैल्वेनाइज्ड माउंटिंग स्ट्रक्चर',
    permalink: 'https://www.instagram.com/reel/DddXxaby3x-/'
  },
  {
    id: 'reel-3',
    youtubeId: 'yLVuvhAhvFY',
    posterUrl: 'https://i.ytimg.com/vi/yLVuvhAhvFY/oar2.jpg',
    title: 'Solar Inverter Installation',
    titleHi: 'सोलर इन्वर्टर इंस्टॉलेशन',
    caption: 'Smart On-Grid Inverter & Wiring Setup',
    captionHi: 'स्मार्ट ऑन-ग्रिड इन्वर्टर और वायरिंग सेटअप',
    permalink: 'https://www.instagram.com/reel/DdTvLgDyPOt/'
  },
  {
    id: 'reel-4',
    youtubeId: 'L564hvW-W5s',
    posterUrl: 'https://i.ytimg.com/vi/L564hvW-W5s/oar2.jpg',
    title: 'Rooftop Solar Commissioning',
    titleHi: 'रूफटॉप सोलर कमीशनिंग',
    caption: 'Complete Turnkey EPC Deployment • Kishangarh',
    captionHi: 'संपूर्ण टर्नकी EPC सोलर इंस्टॉलेशन • किशनगढ़',
    permalink: 'https://www.instagram.com/reel/DcS7gZGynGv/'
  },
  {
    id: 'reel-5',
    youtubeId: 'zAR4R36Ypt0',
    posterUrl: 'https://i.ytimg.com/vi/zAR4R36Ypt0/oar2.jpg',
    title: 'Site Solar Installation',
    titleHi: 'साइट सोलर इंस्टॉलेशन',
    caption: 'High-Efficiency PV Module Array',
    captionHi: 'उच्च दक्षता वाले सोलर पैनल सेटअप',
    permalink: INSTAGRAM_REELS_URL
  },
  {
    id: 'reel-6',
    youtubeId: 'U-70jcY7j-U',
    posterUrl: 'https://i.ytimg.com/vi/U-70jcY7j-U/oar2.jpg',
    title: '3 kW Grid Solar Setup',
    titleHi: '3 kW सोलर ग्रिड सेटअप',
    caption: 'Residential Solar • PM Surya Ghar Subsidy',
    captionHi: 'घरेलू सोलर • पीएम सूर्य घर सब्सिडी',
    permalink: INSTAGRAM_REELS_URL
  },
  {
    id: 'reel-7',
    youtubeId: '24eBSD2o8vA',
    posterUrl: 'https://i.ytimg.com/vi/24eBSD2o8vA/oar2.jpg',
    title: 'DC Safety & Protection',
    titleHi: 'DC सेफ्टी और प्रोटेक्शन',
    caption: 'Electrical Safety Tips from Ashonika Engineers',
    captionHi: 'आशोनिका इंजीनियर्स द्वारा इलेक्ट्रिकल सेफ्टी टिप्स',
    permalink: INSTAGRAM_REELS_URL
  }
];

export default function InstagramReels() {
  const { language } = useLanguage();
  const [reels, setReels] = useState<ReelItem[]>(DEFAULT_REELS);
  const [activeIndex, setActiveIndex] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Optional live Instagram Graph API fetch when VITE_INSTAGRAM_ACCESS_TOKEN is configured
  useEffect(() => {
    const token = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN as string | undefined;
    if (!token) return;

    let cancelled = false;
    fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=10&access_token=${encodeURIComponent(token)}`
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.data?.length) return;
        const videoMedia = data.data.filter(
          (item: any) => item.media_type === 'VIDEO' && item.media_url
        );
        if (videoMedia.length > 0) {
          const mapped: ReelItem[] = videoMedia.map((item: any) => ({
            id: item.id,
            videoUrl: item.media_url,
            posterUrl: item.thumbnail_url || DEFAULT_REELS[0].posterUrl,
            title: item.caption ? item.caption.slice(0, 40) : 'Ashonika Solar Reel',
            titleHi: item.caption ? item.caption.slice(0, 40) : 'आशोनिका सोलर रील',
            caption: item.caption || '@ashonikagreenenergy',
            captionHi: item.caption || '@ashonikagreenenergy',
            permalink: item.permalink || INSTAGRAM_REELS_URL
          }));
          setReels(mapped);
          setActiveIndex(Math.floor(mapped.length / 2));
        }
      })
      .catch(() => {
        // Keep default playable Ashonika vertical videos
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const total = reels.length;

  const getWrappedIndex = (offset: number) => {
    return ((activeIndex + offset) % total + total) % total;
  };

  const sendYouTubeCommand = (func: string) => {
    if (!iframeRef.current?.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func,
        args: []
      }),
      '*'
    );
  };

  const handleToggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
    sendYouTubeCommand(nextMuted ? 'mute' : 'unMute');
  };

  const handleTogglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);

    if (videoRef.current) {
      if (nextPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
    sendYouTubeCommand(nextPlaying ? 'playVideo' : 'pauseVideo');
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setIsPlaying(true);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
    setIsPlaying(true);
  };

  const handleSelectOffset = (offset: number) => {
    if (offset === 0) {
      handleTogglePlay();
      return;
    }
    setActiveIndex(getWrappedIndex(offset));
    setIsPlaying(true);
  };

  const visibleOffsets = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <section
      id="instagram-reels"
      className="relative py-14 sm:py-16 bg-white dark:bg-slate-950 overflow-hidden border-b border-slate-200/60 dark:border-slate-800/40 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1.5">
            <a
              href={INSTAGRAM_ACCOUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-amber-500/10 border border-pink-500/20 text-[11px] font-bold tracking-widest text-rose-600 dark:text-rose-400 uppercase hover:border-pink-500/40 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@ashonikagreenenergy</span>
            </a>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
              {language === 'hi' ? (
                <>
                  हमारे सोलर <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">वीडियो और रील्स</span>
                </>
              ) : (
                <>
                  Solar Project <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Reels &amp; Videos</span>
                </>
              )}
            </h2>
          </div>

          <a
            href={INSTAGRAM_REELS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:scale-[1.02]"
          >
            <Instagram className="w-4 h-4 text-rose-400" />
            <span>{language === 'hi' ? 'Instagram पर देखें' : 'Follow on Instagram'}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-75" />
          </a>
        </div>
      </div>

      {/* Horizontal 9:16 Reels Carousel */}
      <div className="relative w-full overflow-hidden py-4 sm:py-6">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 select-none">
          {visibleOffsets.map((offset) => {
            const reelIndex = getWrappedIndex(offset);
            const reel = reels[reelIndex];
            const isCenter = offset === 0;
            const isOuterEdge = Math.abs(offset) === 3;
            const isFarSide = Math.abs(offset) === 2;

            return (
              <div
                key={`${offset}-${reel.id}`}
                onClick={() => handleSelectOffset(offset)}
                className={`relative shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out bg-slate-900 ${
                  isCenter
                    ? 'w-[225px] h-[400px] sm:w-[255px] sm:h-[453px] md:w-[270px] md:h-[480px] z-20 shadow-2xl shadow-black/30 ring-1 ring-black/10 dark:ring-white/15'
                    : isFarSide
                    ? 'hidden md:block w-[195px] h-[346px] lg:w-[215px] lg:h-[382px] z-10 opacity-95 hover:opacity-100'
                    : isOuterEdge
                    ? 'hidden lg:block w-[165px] h-[346px] xl:w-[190px] xl:h-[382px] z-0 opacity-85 hover:opacity-95'
                    : 'w-[140px] h-[290px] sm:w-[195px] sm:h-[346px] md:w-[215px] md:h-[382px] z-10 opacity-95 hover:opacity-100'
                }`}
              >
                {/* Poster background (prevents black frame while video loads) */}
                <img
                  src={reel.posterUrl}
                  alt={language === 'hi' ? reel.titleHi : reel.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Active Center Playable Video Player */}
                {isCenter && reel.videoUrl ? (
                  <video
                    ref={videoRef}
                    key={reel.id}
                    src={reel.videoUrl}
                    poster={reel.posterUrl}
                    loop
                    playsInline
                    muted={isMuted}
                    autoPlay={isPlaying}
                    className="relative z-10 w-full h-full object-cover"
                  />
                ) : isCenter && reel.youtubeId ? (
                  <iframe
                    ref={iframeRef}
                    key={reel.youtubeId}
                    src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${reel.youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&iv_load_policy=3`}
                    title={language === 'hi' ? reel.titleHi : reel.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => {
                      if (!isMuted) sendYouTubeCommand('unMute');
                      if (!isPlaying) sendYouTubeCommand('pauseVideo');
                    }}
                    className="relative z-10 w-full h-full border-0 pointer-events-none scale-[1.03]"
                  />
                ) : null}

                {/* Click overlay on center card so tapping video toggles play/pause cleanly */}
                {isCenter && (
                  <div
                    className="absolute inset-0 z-20 cursor-pointer"
                    onClick={handleTogglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  />
                )}

                {/* Subtle bottom gradient for caption legibility */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/35 to-transparent z-20" />

                {/* Top-Right Controls on Active Center Card (Mute & Play/Pause) */}
                {isCenter && (
                  <div
                    className="absolute top-3 right-3 z-30 flex flex-col gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={handleToggleMute}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      title={isMuted ? 'Unmute' : 'Mute'}
                      className="w-8 h-8 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center backdrop-blur-xs transition-transform hover:scale-105 cursor-pointer shadow-md"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      title={isPlaying ? 'Pause' : 'Play'}
                      className="w-8 h-8 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center backdrop-blur-xs transition-transform hover:scale-105 cursor-pointer shadow-md"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
                    </button>
                  </div>
                )}

                {/* Center Play Badge when center video is paused */}
                {isCenter && !isPlaying && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-14 h-14 rounded-full bg-black/70 text-white flex items-center justify-center backdrop-blur-xs shadow-xl">
                      <Play className="w-6 h-6 ml-0.5 fill-current" />
                    </div>
                  </div>
                )}

                {/* Centered Play Button Overlay on Inactive Side Cards */}
                {!isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/10 hover:bg-black/5 transition-colors">
                    <div className="w-11 h-11 rounded-full bg-black/70 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-xs shadow-lg transition-transform duration-200 hover:scale-110">
                      <Play className="w-4 h-4 ml-0.5 fill-current" />
                    </div>
                  </div>
                )}

                {/* Bottom Caption & Instagram Account Link */}
                <div className="absolute bottom-3 inset-x-3 z-30 text-left space-y-1 pointer-events-none">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-extrabold text-[10px] sm:text-[11px] tracking-tight shadow-sm">
                    {language === 'hi' ? reel.titleHi : reel.title}
                  </span>
                  <p className="text-white/95 text-[11px] font-medium leading-snug drop-shadow-sm line-clamp-1">
                    {language === 'hi' ? reel.captionHi : reel.caption}
                  </p>
                  {isCenter && (
                    <a
                      href={reel.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="pointer-events-auto inline-flex items-center gap-1.5 text-[10px] font-bold text-white/90 hover:text-emerald-300 transition-colors pt-0.5"
                    >
                      <Instagram className="w-3 h-3" />
                      <span>@ashonikagreenenergy</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Prev / Next Circular Navigation Controls */}
        <div className="flex items-center justify-center gap-3 mt-7 sm:mt-8">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Video"
            className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white flex items-center justify-center shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Video"
            className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white flex items-center justify-center shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
