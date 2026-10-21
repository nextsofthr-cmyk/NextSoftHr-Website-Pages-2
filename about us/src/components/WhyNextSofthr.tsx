import React, { useState, useEffect } from 'react';
import {
  Layers,
  TrendingUp,
  Smile,
  Zap,
  Sparkles,
  Globe,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/contentData';

interface WhyNextSofthrProps {
  onOpenGetStarted: () => void;
}

export const WhyNextSofthr: React.FC<WhyNextSofthrProps> = ({ onOpenGetStarted }) => {
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

  const totalPages = Math.ceil(WHY_CHOOSE_US.length / itemsPerPage);

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

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#84CC16]" />;
      case 'Smile':
        return <Smile className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#84CC16]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#84CC16]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-[#84CC16]" />;
      default:
        return <Layers className="w-6 h-6 text-[#0B3B73] dark:text-[#38BDF8]" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-white dark:bg-[#071322] border-b border-slate-200/80 dark:border-slate-800 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 text-xs font-bold text-[#0B3B73] dark:text-[#38BDF8]">
            <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
            <span>Competitive Differentiators</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
            Why Businesses Choose NextSofthr
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Organizations choose NextSofthr when they outgrow disconnected tools and seek an
            enterprise-grade platform that understands local operational nuances and global ambition.
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
          aria-label="Why choose NextSofthr slider"
        >
          {/* Side Prev Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous differentiators"
            title="Previous differentiators"
            className="flex absolute -left-2 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-[#0B3B73] dark:text-white shadow-xl hover:bg-[#0B3B73] hover:text-white dark:hover:bg-[#84CC16] dark:hover:text-[#061124] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Side Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next differentiators"
            title="Next differentiators"
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
              {WHY_CHOOSE_US.map((item, idx) => (
                <div
                  key={item.title}
                  className="w-full sm:w-1/2 lg:w-1/4 shrink-0 px-2.5 flex flex-col"
                >
                  <div className="bg-[#F8FAFC] dark:bg-[#0E2038] border border-slate-200/80 dark:border-blue-900/40 hover:border-[#0B3B73]/40 dark:hover:border-blue-500 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#162D4E] shadow-sm border border-slate-200 dark:border-blue-800/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {getFeatureIcon(item.icon)}
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                          0{idx + 1}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#0A2540] dark:text-white mb-2.5 group-hover:text-[#0B3B73] dark:group-hover:text-[#84CC16] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-[#071322] p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0" />
                        <span>{item.benefit}</span>
                      </div>
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

        {/* Bottom CTA trigger */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenGetStarted}
            className="inline-flex items-center gap-2 bg-[#84CC16] hover:bg-[#74be12] text-[#0A2540] font-extrabold px-8 py-4 rounded-xl text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Experience the NextSofthr Difference</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
