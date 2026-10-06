import React, { useState, useEffect, useRef } from 'react';
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  Building2,
  MapPin,
  TrendingUp,
  Play,
  Pause,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { CUSTOMER_SUCCESS_QUOTES } from '../data/contentData';
import { CustomerSuccessQuote } from '../types';

interface CustomerSuccessCarouselProps {
  onOpenDemo?: (industry?: string) => void;
}

export const CustomerSuccessCarousel: React.FC<CustomerSuccessCarouselProps> = ({ onOpenDemo }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const categories = [
    'All',
    'Small Business Owner',
    'HR Director',
    'Operations & Finance',
    'Founder & Executive',
  ];

  const filteredQuotes = selectedCategory === 'All'
    ? CUSTOMER_SUCCESS_QUOTES
    : CUSTOMER_SUCCESS_QUOTES.filter(q => q.personaCategory === selectedCategory);

  // Keep index within bounds if category filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Autoplay management
  useEffect(() => {
    if (isAutoPlaying && filteredQuotes.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredQuotes.length);
      }, 6500);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isAutoPlaying, filteredQuotes.length, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredQuotes.length) % filteredQuotes.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredQuotes.length);
  };

  const activeQuote: CustomerSuccessQuote | undefined = filteredQuotes[currentIndex] || filteredQuotes[0];

  if (!activeQuote) return null;

  return (
    <section
      id="customer-success"
      className="py-20 lg:py-28 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white dark:from-[#06101E] dark:via-[#071322] dark:to-[#081526] relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Subtle Geometric Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#84CC16]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#0B3B73]/10 dark:bg-blue-600/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A2540]/5 dark:bg-blue-950/60 border border-[#0A2540]/10 dark:border-blue-900/50 text-xs font-semibold uppercase tracking-wider text-[#0B3B73] dark:text-[#38BDF8] mb-4">
            <Quote className="w-3.5 h-3.5 text-[#84CC16]" />
            <span>Customer Success & Real Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight leading-tight">
            Loved by Business Leaders Across Continents
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            See how small business owners, HR directors, and operations executives eliminate administrative chaos, automate payroll, and empower their workforces with NextSofthr.
          </p>

          {/* Persona Category Filters */}
          <div className="mt-8 flex flex-wrap justify-center gap-2" id="persona-filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0A2540] dark:bg-[#84CC16] text-white dark:text-[#0A2540] shadow-sm ring-2 ring-[#0A2540]/20'
                    : 'bg-white dark:bg-[#0E2038] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-[#132A4A]'
                }`}
              >
                {cat === 'All' ? 'All Personas' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Showcase Card */}
        <div className="relative max-w-5xl mx-auto">
          <div
            id="testimonial-card-main"
            className="bg-white dark:bg-[#0E2038] rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-blue-950/20 border border-slate-200/80 dark:border-blue-900/40 p-6 sm:p-10 lg:p-12 relative overflow-hidden transition-all duration-300"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Top Accent Stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0B3B73] via-[#84CC16] to-[#0A2540]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Author Profile & Metric */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 pb-8 lg:pb-0 lg:pr-8">
                {/* Avatar with Verified Ring */}
                <div className="relative mb-4">
                  <img
                    src={activeQuote.avatar}
                    alt={activeQuote.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-md border-2 border-white dark:border-[#0E2038] ring-4 ring-[#84CC16]/30"
                    referrerPolicy="no-referrer"
                  />
                  {activeQuote.verifiedUser && (
                    <div
                      className="absolute -bottom-2 -right-2 bg-[#84CC16] text-[#0A2540] p-1.5 rounded-xl shadow-md border-2 border-white dark:border-[#0E2038] flex items-center justify-center"
                      title="Verified NextSofthr Customer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0A2540]" />
                    </div>
                  )}
                </div>

                {/* Author Info */}
                <h3 className="text-xl font-bold text-[#0A2540] dark:text-white leading-snug">{activeQuote.name}</h3>
                <p className="text-sm font-semibold text-[#0B3B73] dark:text-[#38BDF8] mt-0.5">{activeQuote.role}</p>

                {/* Persona Tag */}
                <span className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                  <Briefcase className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  {activeQuote.personaCategory}
                </span>

                {/* Company & Location Badges */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 w-full flex flex-col gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium text-slate-700 dark:text-slate-200">{activeQuote.companyName}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                    {activeQuote.companyType}
                  </div>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{activeQuote.location}</span>
                  </div>
                </div>

                {/* Stat Highlight Box */}
                <div className="mt-6 w-full bg-slate-50 dark:bg-[#071322] rounded-xl p-3.5 border border-slate-100 dark:border-slate-800 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#0B3B73] dark:text-[#38BDF8] font-bold text-xl sm:text-2xl">
                    <TrendingUp className="w-5 h-5 text-[#84CC16]" />
                    <span>{activeQuote.highlightStat.value}</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                    {activeQuote.highlightStat.label}
                  </div>
                </div>
              </div>

              {/* Right Column: Quote Text & Context */}
              <div className="lg:col-span-8 flex flex-col justify-between h-full">
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Verified Customer Review
                  </span>
                </div>

                {/* The Quote */}
                <div className="relative">
                  <Quote className="w-12 h-12 text-[#0B3B73]/10 dark:text-white/5 absolute -top-4 -left-2 -z-0" />
                  <blockquote className="relative z-10 text-lg sm:text-xl lg:text-2xl text-slate-800 dark:text-slate-100 font-medium leading-relaxed italic">
                    “{activeQuote.quote}”
                  </blockquote>
                </div>

                {/* Company Type Pill & Footer Action */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Sector:</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                      {activeQuote.companyType}
                    </span>
                  </div>

                  {onOpenDemo && (
                    <button
                      id="quote-cta-demo"
                      type="button"
                      onClick={() => onOpenDemo(activeQuote.companyType)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#0B3B73] dark:text-[#84CC16] hover:text-[#0A2540] dark:hover:text-white group cursor-pointer"
                    >
                      <span>Explore solution for {activeQuote.personaCategory}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#84CC16]" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            {/* Slide Indicators / Dots */}
            <div className="flex items-center gap-2" id="carousel-indicators">
              {filteredQuotes.map((q, idx) => (
                <button
                  key={q.id}
                  id={`carousel-dot-${idx}`}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}: ${q.name} (${q.personaCategory})`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 h-2.5 bg-[#0B3B73] dark:bg-[#84CC16]'
                      : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                  }`}
                />
              ))}
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-2">
                {currentIndex + 1} of {filteredQuotes.length}
              </span>
            </div>

            {/* Play/Pause & Prev/Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                id="carousel-autoplay-toggle"
                type="button"
                aria-label={isAutoPlaying ? 'Pause automatic carousel' : 'Play automatic carousel'}
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
                title={isAutoPlaying ? 'Pause rotation' : 'Start auto-rotation'}
              >
                {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <div className="flex items-center gap-2">
                <button
                  id="carousel-btn-prev"
                  type="button"
                  aria-label="Previous customer quote"
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-white dark:bg-[#0E2038] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#132A4A] hover:border-slate-300 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                </button>
                <button
                  id="carousel-btn-next"
                  type="button"
                  aria-label="Next customer quote"
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-[#0A2540] dark:bg-blue-600 text-white hover:bg-[#0B3B73] dark:hover:bg-blue-700 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick-switch Thumbnail Persona Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {filteredQuotes.map((q, idx) => (
              <button
                key={q.id}
                id={`thumb-persona-${idx}`}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-2.5 cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-white dark:bg-[#162D4E] border-[#0B3B73] dark:border-[#84CC16] shadow-md ring-2 ring-[#0B3B73]/10 dark:ring-[#84CC16]/20'
                    : 'bg-white/70 dark:bg-[#0E2038]/70 border-slate-200/80 dark:border-slate-800 hover:bg-white dark:hover:bg-[#0E2038] hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <img
                  src={q.avatar}
                  alt={q.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{q.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{q.personaCategory}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
