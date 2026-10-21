import React, { useState, useEffect } from 'react';
import {
  HeartHandshake,
  Zap,
  Sliders,
  ShieldCheck,
  Users2,
  TrendingUp,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CORE_VALUES } from '../data/contentData';

export const CoreValues: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(CORE_VALUES.length / itemsPerPage);

  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentPage]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#84CC16]" />;
      case 'Sliders':
        return <Sliders className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#84CC16]" />;
      case 'Users2':
        return <Users2 className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#84CC16]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
    }
  };

  return (
    <section id="values" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#06101E] border-b border-slate-200/80 dark:border-slate-800 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 text-xs font-bold text-[#0B3B73] dark:text-[#38BDF8]">
            <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
            <span>Our Principles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
            The Values That Guide Us
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Every feature we ship, every customer support conversation we hold, and every
            architectural decision we make is anchored in these foundational tenets.
          </p>
        </div>

        {/* 4-in-a-row Slider */}
        <div
          className="relative px-0 sm:px-6 focus:outline-hidden"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
          }}
          aria-label="Core values slider"
        >
          {/* Side Prev Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous values"
            title="Previous values"
            className="flex absolute -left-2 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-[#0B3B73] dark:text-white shadow-xl hover:bg-[#0B3B73] hover:text-white dark:hover:bg-[#84CC16] dark:hover:text-[#061124] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Side Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next values"
            title="Next values"
            className="flex absolute -right-2 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-[#0B3B73] dark:text-white shadow-xl hover:bg-[#0B3B73] hover:text-white dark:hover:bg-[#84CC16] dark:hover:text-[#061124] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Sliding Track Viewport */}
          <div
            className="overflow-hidden py-2"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {CORE_VALUES.map((val) => (
                <div
                  key={val.number}
                  className="w-full sm:w-1/2 lg:w-1/4 shrink-0 px-2.5 flex flex-col"
                >
                  <div
                    className="bg-white dark:bg-[#0E2038] border border-slate-200/80 dark:border-blue-900/40 hover:border-[#0B3B73]/40 dark:hover:border-blue-500 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl group relative overflow-hidden flex flex-col justify-between h-full"
                  >
                    {/* Subtle accent line on top */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#84CC16] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-[#162D4E] border border-blue-100/60 dark:border-blue-800/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {getIcon(val.iconName)}
                        </div>
                        <span className="font-mono text-2xl font-extrabold text-slate-300 dark:text-slate-600 group-hover:text-[#84CC16] transition-colors">
                          {val.number}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#0A2540] dark:text-white mb-3 group-hover:text-[#0B3B73] dark:group-hover:text-[#84CC16] transition-colors">
                        {val.title}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {val.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-[#0B3B73] dark:text-[#38BDF8]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]"></span>
                      <span>NextSofthr Standard</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Pagination Dots */}
          <div className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination controls">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide page ${idx + 1}`}
                onClick={() => setCurrentPage(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentPage === idx
                    ? 'w-8 h-2.5 bg-[#0B3B73] dark:bg-[#84CC16]'
                    : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
