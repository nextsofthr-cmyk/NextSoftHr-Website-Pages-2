import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';

export const ScrollNavigationControl: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showTooltip, setShowTooltip] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight <= 0) {
        setScrollProgress(0);
        setIsAtTop(true);
        setIsAtBottom(true);
        return;
      }

      const progress = Math.min(100, Math.max(0, Math.round((scrollY / totalHeight) * 100)));
      setScrollProgress(progress);
      setIsAtTop(scrollY < 80);
      setIsAtBottom(scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const scrollByStep = (direction: 'up' | 'down') => {
    const viewportHeight = window.innerHeight * 0.75;
    window.scrollBy({
      top: direction === 'up' ? -viewportHeight : viewportHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className="fixed left-4 sm:left-6 bottom-6 z-40 flex flex-col items-center select-none"
      aria-label="Page scroll navigation controls"
    >
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-900/10 dark:shadow-black/50 p-1 flex flex-col items-center gap-1 transition-all duration-200 hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700">
        
        {/* Scroll Up Button */}
        <div className="relative">
          <button
            type="button"
            onClick={scrollToTop}
            onMouseEnter={() => setShowTooltip('up')}
            onMouseLeave={() => setShowTooltip(null)}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
              isAtTop
                ? 'text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                : 'text-slate-700 dark:text-slate-200 hover:bg-[#2563EB]/10 dark:hover:bg-blue-900/30 hover:text-[#2563EB] dark:hover:text-blue-400 hover:scale-105 active:scale-95'
            }`}
            title="Scroll to Top"
            aria-label="Scroll to top of page"
          >
            <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
          </button>

          {/* Up Tooltip */}
          {showTooltip === 'up' && (
            <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-semibold rounded-lg shadow-lg whitespace-nowrap pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-150">
              <span>Scroll to Top</span>
              <span className="absolute right-full top-1/2 -translate-y-1/2 -mr-1 border-4 border-transparent border-r-slate-900 dark:border-r-white" />
            </div>
          )}
        </div>

        {/* Dynamic Scroll Progress Pill / Percentage */}
        <div 
          className="w-8 h-8 rounded-lg flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-750/60 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 transition-colors"
          title={`Page scrolled: ${scrollProgress}%`}
        >
          <span className="leading-none">{scrollProgress}%</span>
        </div>

        {/* Scroll Down Button */}
        <div className="relative">
          <button
            type="button"
            onClick={scrollToBottom}
            onMouseEnter={() => setShowTooltip('down')}
            onMouseLeave={() => setShowTooltip(null)}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
              isAtBottom
                ? 'text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                : 'text-slate-700 dark:text-slate-200 hover:bg-[#2563EB]/10 dark:hover:bg-blue-900/30 hover:text-[#2563EB] dark:hover:text-blue-400 hover:scale-105 active:scale-95'
            }`}
            title="Scroll to Bottom"
            aria-label="Scroll to bottom of page"
          >
            <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
          </button>

          {/* Down Tooltip */}
          {showTooltip === 'down' && (
            <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-semibold rounded-lg shadow-lg whitespace-nowrap pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-150">
              <span>Scroll to Bottom</span>
              <span className="absolute right-full top-1/2 -translate-y-1/2 -mr-1 border-4 border-transparent border-r-slate-900 dark:border-r-white" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
