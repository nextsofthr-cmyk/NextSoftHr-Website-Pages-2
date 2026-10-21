import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Cloud, 
  TrendingUp, 
  Globe2, 
  Building2, 
  GitFork, 
  Sparkles, 
  Smartphone,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { TRUST_FEATURES } from '../data/content';

export const TrustSection: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Responsive items-per-page calculation
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

  const totalPages = Math.ceil(TRUST_FEATURES.length / itemsPerPage);

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

  const getIcon = (name: string) => {
    switch (name) {
      case 'Shield':
      case 'ShieldCheck': 
        return <ShieldCheck className="w-6 h-6 text-[#c8f526]" />;
      case 'Cloud': 
        return <Cloud className="w-6 h-6 text-[#c8f526]" />;
      case 'TrendingUp': 
        return <TrendingUp className="w-6 h-6 text-[#c8f526]" />;
      case 'Globe':
      case 'Globe2': 
        return <Globe2 className="w-6 h-6 text-[#c8f526]" />;
      case 'Building2': 
        return <Building2 className="w-6 h-6 text-[#c8f526]" />;
      case 'GitFork': 
        return <GitFork className="w-6 h-6 text-[#c8f526]" />;
      case 'Sparkles': 
        return <Sparkles className="w-6 h-6 text-[#c8f526]" />;
      case 'Smartphone': 
        return <Smartphone className="w-6 h-6 text-[#c8f526]" />;
      default: 
        return <CheckCircle2 className="w-6 h-6 text-[#c8f526]" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#071938] text-white border-b border-blue-900 relative overflow-hidden">
      
      {/* Subtle Glows */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#c8f526]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 border border-[#c8f526]/40 text-[#c8f526] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ENTERPRISE-GRADE TRUST & ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Built for Scale, Security & Resilience
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            NextSofthr pairs bank-grade cloud infrastructure with deep African statutory localization, giving partners and enterprises complete operational confidence.
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
          aria-label="Built for scale, security and resilience slider"
        >
          {/* Side Prev Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous features"
            title="Previous features"
            className="flex absolute -left-2 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0b214a] border border-blue-800 text-white shadow-xl hover:bg-[#c8f526] hover:text-[#071938] hover:border-[#c8f526] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Side Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next features"
            title="Next features"
            className="flex absolute -right-2 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0b214a] border border-blue-800 text-white shadow-xl hover:bg-[#c8f526] hover:text-[#071938] hover:border-[#c8f526] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
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
              {TRUST_FEATURES.map((item, idx) => (
                <div 
                  key={idx} 
                  className="w-full sm:w-1/2 lg:w-1/4 shrink-0 px-2.5 flex flex-col"
                >
                  <div className="bg-[#0b214a] rounded-2xl border border-blue-800 p-5 flex flex-col justify-between hover:border-blue-500 transition-colors group h-full">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-700/60 flex items-center justify-center mb-4 group-hover:bg-[#0c2b64] transition-colors">
                        {getIcon(item.icon)}
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-[#c8f526] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-blue-900/80 flex items-center gap-1.5 text-[11px] font-semibold text-[#c8f526]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>NextSofthr Core Standard</span>
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
                  ? 'w-8 h-2.5 bg-[#c8f526]'
                  : 'w-2.5 h-2.5 bg-blue-900/70 hover:bg-blue-800'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
