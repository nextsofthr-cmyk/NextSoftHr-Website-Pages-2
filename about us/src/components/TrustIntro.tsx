import React, { useState, useEffect } from 'react';
import {
  Users,
  Calculator,
  Clock,
  UserCheck,
  Briefcase,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Check,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CAPABILITY_HIGHLIGHTS } from '../data/contentData';

interface TrustIntroProps {
  onSelectModule: (moduleTitle: string) => void;
}

export const TrustIntro: React.FC<TrustIntroProps> = ({ onSelectModule }) => {
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

  const totalPages = Math.ceil(CAPABILITY_HIGHLIGHTS.length / itemsPerPage);

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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#84CC16]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#84CC16]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      default:
        return <Users className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
    }
  };

  return (
    <section id="about-intro" className="py-20 lg:py-28 bg-white dark:bg-[#071322] border-b border-slate-100 dark:border-slate-800/80 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 text-xs font-bold text-[#0B3B73] dark:text-[#38BDF8]">
            <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
            <span>Who We Are & What We Do</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
            Technology That Helps Businesses Move Forward
          </h2>

          <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed pt-2">
            <p>
              <strong className="text-[#0A2540] dark:text-white font-semibold">NextSofthr</strong> was created to make business and people
              management simpler, more accessible and more intelligent.
            </p>
            <p>
              From growing African businesses to established organizations operating
              across multiple locations, NextSofthr provides the technology businesses
              need to manage employees, automate repetitive processes, improve visibility
              and make informed decisions.
            </p>
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              The platform combines modern HR technology, payroll automation and business
              management capabilities into one connected ecosystem.
            </p>
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
          aria-label="Technology capabilities slider"
        >
          {/* Side Prev Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous capabilities"
            title="Previous capabilities"
            className="flex absolute -left-2 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-[#0B3B73] dark:text-white shadow-xl hover:bg-[#0B3B73] hover:text-white dark:hover:bg-[#84CC16] dark:hover:text-[#061124] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Side Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next capabilities"
            title="Next capabilities"
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
              {CAPABILITY_HIGHLIGHTS.map((cap) => (
                <div 
                  key={cap.title} 
                  className="w-full sm:w-1/2 lg:w-1/4 shrink-0 px-2.5 flex flex-col"
                >
                  <div
                    className="bg-[#F8FAFC] dark:bg-[#0E2038] hover:bg-[#F0F7FF] dark:hover:bg-[#132A4A] border border-slate-200/80 dark:border-blue-900/40 hover:border-blue-300 dark:hover:border-blue-600 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg group flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#162D4E] shadow-sm border border-slate-100 dark:border-blue-800/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {getIcon(cap.icon)}
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-100/60 dark:bg-blue-950/80 text-[#0B3B73] dark:text-[#38BDF8]">
                          {cap.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#0A2540] dark:text-white mb-2 group-hover:text-[#0B3B73] dark:group-hover:text-[#84CC16] transition-colors">
                        {cap.title}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {cap.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#0B3B73] dark:text-[#38BDF8]">
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <Check className="w-3.5 h-3.5 text-[#84CC16]" />
                        Integrated Capability
                      </span>
                      <button
                        onClick={() => onSelectModule(cap.title)}
                        className="inline-flex items-center gap-1 text-[#0B3B73] dark:text-[#84CC16] group-hover:text-[#0A2540] dark:group-hover:text-white hover:underline cursor-pointer"
                      >
                        <span>Explore Module</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#84CC16]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
                  ? 'w-8 h-2.5 bg-[#0B3B73] dark:bg-[#84CC16]'
                  : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Value Anchor Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#0A2540] via-[#0B3B73] to-[#0A2540] dark:from-[#050e18] dark:via-[#0c2548] dark:to-[#071322] border border-blue-900/30 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-300">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Designed with African Regulatory Nuance, Built for Global Enterprise
            </h4>
            <p className="text-sm text-slate-300">
              Tax rules, pension statutory reporting, flexible banking rails, and multi-currency salaries in a single click.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs bg-[#84CC16]/20 border border-[#84CC16]/40 text-[#84CC16] font-bold px-3.5 py-2 rounded-lg">
              Unified Ecosystem
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
