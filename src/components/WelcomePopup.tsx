import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sun, Sparkles } from 'lucide-react';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown in the current session
    const isShown = sessionStorage.getItem('ashonika_welcome_popup_shown');
    if (!isShown) {
      // Small delay for natural and elegant page load feeling
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('ashonika_welcome_popup_shown', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-emerald-500/20 shadow-2xl z-50 text-slate-800 dark:text-slate-100 flex flex-col"
          >
            {/* Top decorative Solar Wave background */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-500" />

            {/* Glowing Sun Aura in Back */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-400/20 dark:bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-emerald-500/15 dark:bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />

            {/* Content Section */}
            <div className="p-6 md:p-8 pt-8 flex flex-col items-center text-center relative">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                aria-label="Close welcome popup"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon Container with Floating Solar Flare Effect */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-amber-400/30 dark:bg-amber-500/20 rounded-2xl blur-md animate-pulse" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-350 flex items-center justify-center shadow-lg transform rotate-6 hover:rotate-12 transition-transform duration-300">
                  <Sun className="w-8 h-8 text-slate-950 animate-spin-slow" />
                </div>
              </div>

              {/* Brand Header */}
              <h4 className="text-[10px] uppercase tracking-widest text-[#0B8F4D] dark:text-emerald-400 font-bold font-mono mb-1.5 flex items-center gap-1.5 justify-center">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-500" />
                Ashonika Green Energy
              </h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-5">
                Rooftop Solar EPC Partner
              </p>

              {/* Bold Message Text Box */}
              <div className="w-full bg-emerald-50/60 dark:bg-slate-800/50 border border-emerald-100/50 dark:border-slate-800 rounded-2xl p-5 md:p-6 mb-6">
                <p className="text-lg md:text-xl font-black text-slate-900 dark:text-white leading-relaxed font-sans tracking-wide space-y-2 uppercase">
                  <span className="block text-[#0b8f4d] dark:text-emerald-400">आज सोलर लगवाएगा,</span>
                  <span className="block text-slate-800 dark:text-slate-200">तो कल बिजली का बिल घटाएगा।</span>
                  <span className="block text-amber-500 mt-2 text-sm font-semibold tracking-normal lowercase opacity-80 decoration-none">••••••••••</span>
                  <span className="block text-[#0b8f4d] dark:text-emerald-400 mt-2">सोलर पर भरोसा रख दोस्त,</span>
                  <span className="block text-slate-800 dark:text-slate-200">खूब पैसा बचाएगा।</span>
                </p>
              </div>

              {/* CTA Action button to explore and close */}
              <button
                onClick={handleClose}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs md:text-sm tracking-wider shadow-md hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 transition-all uppercase"
              >
                आगे बढ़ें (Proceed)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
