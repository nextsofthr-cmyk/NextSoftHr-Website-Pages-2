import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Rocket, 
  Users, 
  Workflow, 
  Layers, 
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { WHY_WORK_WITH_PARTNER } from '../data/content';

interface WhyWorkWithPartnerProps {
  onFindPartnerClick: () => void;
}

export const WhyWorkWithPartner: React.FC<WhyWorkWithPartnerProps> = ({ onFindPartnerClick }) => {
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

  const totalPages = Math.ceil(WHY_WORK_WITH_PARTNER.length / itemsPerPage);

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

  const getIcon = (name: string) => {
    switch (name) {
      case 'MapPin': return <MapPin className="w-6 h-6 text-[#0c2b64] dark:text-[#c8f526]" />;
      case 'Rocket': return <Rocket className="w-6 h-6 text-[#0c2b64] dark:text-[#c8f526]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#0c2b64] dark:text-[#c8f526]" />;
      case 'Workflow': return <Workflow className="w-6 h-6 text-[#0c2b64] dark:text-[#c8f526]" />;
      case 'Layers': return <Layers className="w-6 h-6 text-[#0c2b64] dark:text-[#c8f526]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#0c2b64] dark:text-[#c8f526]" />;
      default: return <CheckCircle2 className="w-6 h-6 text-[#0c2b64] dark:text-[#c8f526]" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#f8fafc] dark:bg-[#061124] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-[#0c2b64] dark:text-[#c8f526] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-700 dark:text-[#c8f526]" />
            <span>VALUE OF CERTIFIED EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0c2b64] dark:text-white tracking-tight">
            Why Work With a NextSofthr Partner?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Maximizing the ROI of your HR and payroll technology begins with seasoned local professionals who understand your specific tax codes, workforce culture, and business systems.
          </p>
        </div>

        {/* Carousel Container with Side Arrows & Keyboard/Touch */}
        <div 
          className="relative px-0 sm:px-4 focus:outline-hidden"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
          }}
          aria-label="Why work with a NextSofthr partner slider"
        >
          {/* Side Prev Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            title="Previous"
            className="flex absolute -left-2 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-[#0c2b64] dark:text-white shadow-xl hover:bg-[#c8f526] hover:text-[#0c2b64] dark:hover:bg-[#c8f526] dark:hover:text-[#061124] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Side Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            title="Next"
            className="flex absolute -right-2 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-[#0c2b64] dark:text-white shadow-xl hover:bg-[#c8f526] hover:text-[#0c2b64] dark:hover:bg-[#c8f526] dark:hover:text-[#061124] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
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
              {WHY_WORK_WITH_PARTNER.map((item, idx) => (
                <div 
                  key={idx}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3 flex flex-col"
                >
                  <div className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 group flex flex-col justify-between h-full">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-[#0c234b] border border-blue-200 dark:border-blue-800 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#c8f526]/20 group-hover:border-[#c8f526] transition-all">
                        {getIcon(item.icon)}
                      </div>
                      
                      <h3 className="text-lg font-bold text-[#0c2b64] dark:text-white tracking-tight">
                        {item.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-blue-800 dark:text-[#c8f526] font-semibold">
                      <span>Certified NextSofthr Delivery</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8f526]"></span>
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
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0a1c3b] text-slate-600 dark:text-slate-300 hover:bg-[#0c2b64] hover:text-white dark:hover:bg-[#c8f526] dark:hover:text-[#071938] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
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
                    ? 'w-8 h-2.5 bg-[#0c2b64] dark:bg-[#c8f526]'
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
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0a1c3b] text-slate-600 dark:text-slate-300 hover:bg-[#0c2b64] hover:text-white dark:hover:bg-[#c8f526] dark:hover:text-[#071938] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">
            {currentPage + 1} / {totalPages}
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-10 text-center">
          <button
            onClick={onFindPartnerClick}
            className="px-6 py-3 rounded-xl bg-[#0c2b64] hover:bg-blue-800 dark:bg-blue-900/80 dark:hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
          >
            Find a Certified Partner in Your City
          </button>
        </div>

      </div>
    </section>
  );
};
