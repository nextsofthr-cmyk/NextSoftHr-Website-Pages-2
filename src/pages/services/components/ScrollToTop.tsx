import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (height > 0) {
        const scrolled = Math.min(100, Math.max(0, (winScroll / height) * 100));
        setScrollProgress(scrolled);
      }

      // Show button when page is scrolled down past 350px
      if (winScroll > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check in case page reloads scrolled down
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  // SVG circle calculations for progress ring
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40 animate-in fade-in zoom-in-90 duration-300">
      <button
        id="scroll-to-top-button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title="Scroll to Top"
        className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white dark:bg-[#0A2540] text-slate-700 dark:text-slate-200 hover:text-[#0256C4] dark:hover:text-[#84CC16] shadow-xl hover:shadow-2xl border border-slate-200/90 dark:border-blue-900/80 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
      >
        {/* Circular Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 44 44"
        >
          {/* Background Track */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-slate-200/60 dark:stroke-blue-950/80"
            strokeWidth="2.5"
            fill="transparent"
          />
          {/* Progress Indicator */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-[#0256C4] dark:stroke-[#84CC16] transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Upward Arrow Icon */}
        <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />

        {/* Tooltip on Desktop Hover */}
        <div className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-[#0A2540] dark:bg-[#07182E] text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md border border-slate-700 dark:border-blue-900/80 hidden sm:flex items-center gap-1.5">
          <span>Back to Top</span>
          <span className="text-[10px] text-[#84CC16] font-mono">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      </button>
    </div>
  );
};
