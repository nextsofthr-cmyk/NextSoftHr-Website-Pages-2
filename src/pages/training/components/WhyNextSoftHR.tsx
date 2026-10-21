import React, { useState, useEffect } from 'react';
import {
  Wrench,
  BookCheck,
  Cpu,
  Layers,
  TrendingUp,
  Target,
  Award,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const WhyNextSoftHR: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const reasons = [
    {
      icon: Wrench,
      title: 'Practical Learning',
      description: 'Training focused on real workplace applications, actual payroll reconciliations, grievance hearings, and policy templates you use on Monday.',
    },
    {
      icon: BookCheck,
      title: 'Modern Curriculum',
      description: 'Courses designed around modern HR, payroll and workforce practices—continually updated to reflect prevailing tax laws and labor reforms.',
    },
    {
      icon: Cpu,
      title: 'Technology-Driven',
      description: 'Connect human resource knowledge with modern HR technology, analytics dashboards, and intelligent workflow automation.',
    },
    {
      icon: Layers,
      title: 'Flexible Delivery',
      description: 'Self-paced on-demand, interactive virtual suites, live weekend cohorts, and custom on-site corporate training options.',
    },
    {
      icon: TrendingUp,
      title: 'Career Development',
      description: 'Build knowledge and validated credentials for rapid professional advancement, board readiness, and high-impact compensation.',
    },
    {
      icon: Target,
      title: 'Business-Focused',
      description: 'Training designed not merely for theory, but to measurably improve team retention, statutory audit defense, and company performance.',
    },
    {
      icon: Award,
      title: 'Accredited Credentials',
      description: 'Earn industry-recognized certificates with verifiable digital IDs, recognized by top employers, audit institutions, and HR boards.',
    },
    {
      icon: GraduationCap,
      title: 'Executive Faculty Network',
      description: 'Learn directly from seasoned HR directors, certified tax practitioners, and labor attorneys with decades of front-line leadership.',
    },
  ];

  // Responsive items-per-page calculation: 4 on desktop, 2 on tablet, 1 on mobile
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

  const totalPages = Math.ceil(reasons.length / itemsPerPage);

  // Ensure currentPage does not exceed totalPages on resize
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

  // Touch swipe support
  const minSwipeDistance = 50;
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
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#0B1120] border-b border-slate-200/70 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            The NextSoftHR Difference
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Why Learn With NextSoftHR?
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Engineered by HR technology veterans and enterprise practitioners to bridge the gap between classroom theory and real workplace execution.
          </p>
        </div>

        {/* Carousel Container with Side Arrows */}
        <div 
          className="relative px-0 sm:px-6 focus:outline-hidden"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
          }}
          aria-label="Why learn with NextSoftHR slider"
        >
          {/* Side Prev Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous advantages"
            title="Previous advantages"
            className="flex absolute -left-2 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-[#0F4C81] dark:text-white shadow-xl hover:bg-[#0F4C81] hover:text-white dark:hover:bg-[#84CC16] dark:hover:text-[#0F172A] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Side Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next advantages"
            title="Next advantages"
            className="flex absolute -right-2 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-[#0F4C81] dark:text-white shadow-xl hover:bg-[#0F4C81] hover:text-white dark:hover:bg-[#84CC16] dark:hover:text-[#0F172A] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
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
              {reasons.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx} 
                    className="w-full sm:w-1/2 lg:w-1/4 shrink-0 px-2.5 flex flex-col"
                  >
                    <div
                      className="bg-white dark:bg-[#0F172A] rounded-xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-[#0F4C81]/40 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between h-full"
                    >
                      <div>
                        <div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-slate-800 text-[#0F4C81] dark:text-[#84CC16] flex items-center justify-center mb-4 border border-blue-100/80 dark:border-slate-700">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-semibold text-[#65A30D] dark:text-[#84CC16]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
                        <span>Enterprise Ready Standard</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
                  ? 'w-8 h-2.5 bg-[#0F4C81] dark:bg-[#84CC16]'
                  : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
