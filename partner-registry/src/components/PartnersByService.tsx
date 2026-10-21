import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CreditCard, 
  Rocket, 
  Calculator, 
  Briefcase, 
  Building, 
  Layers, 
  Cpu, 
  GraduationCap, 
  Workflow, 
  Sliders, 
  Headphones,
  ArrowRight,
  Sparkles,
  DollarSign,
  CheckCircle2,
  UserPlus,
  FileSpreadsheet,
  TrendingUp,
  LifeBuoy,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/countries';

interface PartnersByServiceProps {
  onSelectService: (serviceName: string) => void;
}

export const PartnersByService: React.FC<PartnersByServiceProps> = ({ onSelectService }) => {
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

  const totalPages = Math.ceil(SERVICE_CATEGORIES.length / itemsPerPage);

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
      case 'Users': return <Users className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'DollarSign': return <DollarSign className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Calculator': return <Calculator className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'UserPlus': return <UserPlus className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Sliders': return <Sliders className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'LifeBuoy': return <LifeBuoy className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Building': return <Building className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
      default: return <Sparkles className="w-5 h-5 text-blue-900 dark:text-[#c8f526]" />;
    }
  };

  const handleServiceClick = (name: string) => {
    onSelectService(name);
    const el = document.getElementById('directory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-white dark:bg-[#061124] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8f526]/30 dark:bg-[#c8f526]/20 border border-[#c8f526] text-[#0c2b64] dark:text-[#c8f526] text-xs font-black uppercase tracking-wider mb-3">
            <Workflow className="w-3.5 h-3.5" />
            <span>SPECIALIZED CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0c2b64] dark:text-white tracking-tight">
            Find Partners by Expertise
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-400">
            From complete enterprise ERP integrations and payroll compliance audits to shift scheduling setups, discover specialists tailored to your specific organizational needs.
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
          aria-label="Partners by expertise slider"
        >
          {/* Side Prev Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous specializations"
            title="Previous specializations"
            className="flex absolute -left-2 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-[#0c2b64] dark:text-white shadow-xl hover:bg-[#c8f526] hover:text-[#0c2b64] dark:hover:bg-[#c8f526] dark:hover:text-[#061124] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Side Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next specializations"
            title="Next specializations"
            className="flex absolute -right-2 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-[#0c2b64] dark:text-white shadow-xl hover:bg-[#c8f526] hover:text-[#0c2b64] dark:hover:bg-[#c8f526] dark:hover:text-[#061124] items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
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
              {SERVICE_CATEGORIES.map((service) => (
                <div 
                  key={service.id} 
                  className="w-full sm:w-1/2 lg:w-1/4 shrink-0 px-2.5 flex flex-col"
                >
                  <div
                    onClick={() => handleServiceClick(service.title)}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0a1c3b] hover:bg-white dark:hover:bg-[#0c234b] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group h-full"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#061227] border border-slate-200 dark:border-slate-700 group-hover:bg-[#c8f526] group-hover:border-[#b5e01b] flex items-center justify-center mb-3.5 shadow-xs transition-colors">
                        {getIcon(service.icon)}
                      </div>

                      <h3 className="text-sm font-bold text-[#0c2b64] dark:text-white group-hover:text-blue-700 dark:group-hover:text-[#c8f526] transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-900 dark:text-[#c8f526] group-hover:text-blue-600 dark:group-hover:text-lime-300">
                      <span>Find Partners</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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
                  ? 'w-8 h-2.5 bg-[#0c2b64] dark:bg-[#c8f526]'
                  : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
