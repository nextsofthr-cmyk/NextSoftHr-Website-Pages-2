import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data/academyData';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const getInitials = (name: string): string => {
  if (!name) return 'NS';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const AVATAR_STYLES = [
  'bg-blue-600 text-white border border-blue-400/40 dark:bg-blue-600 dark:text-white',
  'bg-emerald-600 text-white border border-emerald-400/40 dark:bg-emerald-600 dark:text-white',
  'bg-indigo-700 text-white border border-indigo-400/40 dark:bg-indigo-600 dark:text-white',
  'bg-[#0F4C81] text-[#84CC16] border border-[#84CC16]/40 dark:bg-slate-800 dark:text-[#84CC16]',
  'bg-amber-600 text-white border border-amber-400/40 dark:bg-amber-600 dark:text-white',
  'bg-purple-700 text-white border border-purple-400/40 dark:bg-purple-600 dark:text-white',
];

export const StudentSuccessSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Responsive items per page: 3 on desktop, 2 on tablet, 1 on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(TESTIMONIALS.length / itemsPerPage);

  // Bound currentPage on resize
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

  // Touch swipe handling
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
    <section className="py-16 md:py-20 bg-slate-50 dark:bg-[#0B1120] border-b border-slate-200/70 dark:border-slate-800 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-[#0F4C81] dark:text-[#84CC16] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#84CC16]" />
            <span>Alumni Outcomes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Professionals Are Building Their Skills With NextSoftHR
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Hear from alumni across human resources, payroll operations, and executive leadership who accelerated their workplace impact.
          </p>
        </div>

        {/* Carousel Viewport with Side Arrows */}
        <div
          className="relative px-0 sm:px-4 focus:outline-hidden"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
          }}
          aria-label="Student testimonials slider"
        >
          {/* Side Prev Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            title="Previous"
            className="flex absolute -left-2 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-[#0F4C81] dark:text-white shadow-xl hover:bg-[#84CC16] hover:text-[#0F4C81] dark:hover:bg-[#84CC16] dark:hover:text-[#0B1120] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Side Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            title="Next"
            className="flex absolute -right-2 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-[#0F4C81] dark:text-white shadow-xl hover:bg-[#84CC16] hover:text-[#0F4C81] dark:hover:bg-[#84CC16] dark:hover:text-[#0B1120] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Sliding Track Viewport */}
          <div
            className="overflow-hidden py-3"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {TESTIMONIALS.map((t, idx) => (
                <div
                  key={t.id}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3 flex flex-col"
                >
                  <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-lg hover:border-[#0F4C81]/30 dark:hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between h-full group">
                    <div>
                      {/* Rating & Quote Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                        <Quote className="w-6 h-6 text-slate-200 dark:text-slate-700 group-hover:text-[#84CC16]/60 transition-colors" />
                      </div>

                      {/* Course Completed Tag */}
                      <div className="mb-3">
                        <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-[#0F4C81] dark:text-[#84CC16] line-clamp-1 border border-blue-100 dark:border-blue-900/60">
                          {t.courseCompleted}
                        </span>
                      </div>

                      {/* Testimonial Quote */}
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                        "{t.content}"
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                      <div
                        aria-label={t.name}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs tracking-wider shrink-0 select-none shadow-xs ${
                          AVATAR_STYLES[idx % AVATAR_STYLES.length]
                        }`}
                      >
                        {t.initials || getInitials(t.name)}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {t.name}
                          </span>
                          {t.verifiedStudent && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16] shrink-0" />
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                          {t.role}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block truncate">
                          {t.organization}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Pagination Controls: Arrows + Dots */}
        <div className="mt-8 flex items-center justify-center gap-3" aria-label="Pagination controls">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            title="Previous slide"
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] text-slate-600 dark:text-slate-300 hover:bg-[#0F4C81] hover:text-white dark:hover:bg-[#84CC16] dark:hover:text-[#0B1120] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
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

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            title="Next slide"
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] text-slate-600 dark:text-slate-300 hover:bg-[#0F4C81] hover:text-white dark:hover:bg-[#84CC16] dark:hover:text-[#0B1120] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
