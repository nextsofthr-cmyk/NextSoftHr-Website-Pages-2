import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/academyData';
import {
  Users,
  CreditCard,
  Clock,
  UserCheck,
  Award,
  BarChart3,
  Sparkles,
  Briefcase,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface TrainingCategoriesProps {
  onSelectCategory: (categoryName: string) => void;
}

export const TrainingCategories: React.FC<TrainingCategoriesProps> = ({
  onSelectCategory,
}) => {
  const iconMap: Record<string, React.ElementType> = {
    Users,
    CreditCard,
    Clock,
    UserCheck,
    Award,
    BarChart3,
    Sparkles,
    Briefcase,
  };

  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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

  const totalPages = Math.ceil(CATEGORIES.length / itemsPerPage);

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
    <section className="py-16 bg-white dark:bg-[#0F172A] border-b border-slate-200/70 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
              Curriculum Domains
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              Explore Our Training Categories
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Targeted skill tracks engineered for operational excellence, regulatory compliance, and forward-looking workforce leadership.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-semibold text-slate-500 dark:text-slate-400">
            8 Specialized Faculties · Practical Enterprise Curriculum
          </div>
        </div>

        {/* Carousel Container with Side Arrows */}
        <div 
          className="relative px-0 sm:px-6 focus:outline-hidden"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
          }}
          aria-label="Training categories slider"
        >
          {/* Side Prev Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous training categories"
            title="Previous training categories"
            className="flex absolute -left-2 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-[#0F4C81] dark:text-white shadow-xl hover:bg-[#0F4C81] hover:text-white dark:hover:bg-[#84CC16] dark:hover:text-[#0F172A] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Side Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next training categories"
            title="Next training categories"
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
              {CATEGORIES.map((cat) => {
                const Icon = iconMap[cat.iconName] || Users;
                return (
                  <div 
                    key={cat.id} 
                    className="w-full sm:w-1/2 lg:w-1/4 shrink-0 px-2.5 flex flex-col"
                  >
                    <div
                      className="group relative bg-slate-50/60 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-xl p-5 border border-slate-200/80 dark:border-slate-700/80 hover:border-[#0F4C81]/40 dark:hover:border-blue-500/60 hover:shadow-md transition-all flex flex-col justify-between h-full"
                    >
                      <div>
                        {/* Icon & Count */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-11 h-11 rounded-lg bg-white dark:bg-slate-700 border border-slate-200/90 dark:border-slate-600 text-[#0F4C81] dark:text-[#84CC16] group-hover:bg-[#0F4C81] group-hover:text-white dark:group-hover:bg-blue-600 flex items-center justify-center transition-colors shadow-2xs">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {cat.courseCount} Courses
                          </span>
                        </div>

                        {/* Name & Description */}
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0F4C81] dark:group-hover:text-[#84CC16] transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                          {cat.description}
                        </p>

                        {/* Key Subcategories list */}
                        <div className="mt-3.5 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                          <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                            Core Modules
                          </div>
                          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                            {cat.subcategories.slice(0, 3).map((sub, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-[#84CC16]" />
                                <span className="truncate">{sub}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Explore Courses Link */}
                      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                        <button
                          onClick={() => onSelectCategory(cat.name)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] dark:text-[#84CC16] hover:text-[#0B3C68] dark:hover:text-lime-300 group-hover:translate-x-0.5 transition-all cursor-pointer"
                        >
                          <span>Explore Courses</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16]" />
                        </button>
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
