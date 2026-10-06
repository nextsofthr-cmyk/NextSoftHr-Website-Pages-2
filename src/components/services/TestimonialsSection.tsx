import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_LIST } from '../data/servicesData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_LIST.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_LIST.length) % TESTIMONIALS_LIST.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-[#0A2540] relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[#0256C4] dark:text-[#84CC16] text-xs font-extrabold uppercase tracking-widest border border-blue-100 dark:border-blue-800 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
              AUTHENTIC CLIENT EXPERIENCES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
              Trusted by Growing Businesses and HR Leaders
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 mt-2">
              Hear directly from founders, people managers, and operations directors who transformed their workplace
              culture and compliance with NextSofthr.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-slate-300 dark:border-blue-800 hover:border-[#0256C4] dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/60 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#0256C4] dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Previous Testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-slate-300 dark:border-blue-800 hover:border-[#0256C4] dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/60 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#0256C4] dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Next Testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3-Column Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS_LIST.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-[#F8FAFC] dark:bg-[#0D2644] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-blue-800/80 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Location */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-300 bg-white dark:bg-[#0A2540] px-2.5 py-1 rounded-full border border-slate-200 dark:border-blue-900 flex items-center gap-1.5">
                    <span>{item.countryFlag}</span>
                    <span>{item.country}</span>
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200/70 dark:border-blue-900/60">
                <div className="flex items-center gap-3.5 mb-2">
                  <img
                    src={item.imageUrl}
                    alt={item.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-blue-800 shadow-xs"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#0A2540] dark:text-white">{item.author}</h4>
                    <p className="text-xs text-[#0256C4] dark:text-[#84CC16] font-medium">{item.position}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.company}</p>
                  </div>
                </div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded w-max border border-transparent dark:border-emerald-900">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>{item.verifiedStatus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row of 2 Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6">
          {TESTIMONIALS_LIST.slice(3, 5).map((item) => (
            <div
              key={item.id}
              className="bg-[#F8FAFC] dark:bg-[#0D2644] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-blue-800/80 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-300 bg-white dark:bg-[#0A2540] px-2.5 py-1 rounded-full border border-slate-200 dark:border-blue-900 flex items-center gap-1.5">
                    <span>{item.countryFlag}</span>
                    <span>{item.country}</span>
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/70 dark:border-blue-900/60">
                <div className="flex items-center gap-3.5 mb-2">
                  <img
                    src={item.imageUrl}
                    alt={item.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-blue-800 shadow-xs"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#0A2540] dark:text-white">{item.author}</h4>
                    <p className="text-xs text-[#0256C4] dark:text-[#84CC16] font-medium">{item.position}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.company}</p>
                  </div>
                </div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded w-max border border-transparent dark:border-emerald-900">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>{item.verifiedStatus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
