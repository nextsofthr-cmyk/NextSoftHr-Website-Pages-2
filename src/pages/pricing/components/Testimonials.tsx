import React from 'react';
import { Quote, CheckCircle2, Star, Building2, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/pricingData';
import { CardSlider } from './CardSlider';

const TESTIMONIALS_PER_VIEW = { base: 1, md: 2 };

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-[#0B132B] border-t border-slate-100 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-100 dark:bg-lime-950/60 text-slate-900 dark:text-[#A3E635] text-xs font-bold mb-3 border border-lime-300 dark:border-lime-800/60">
            <span>Customer Impact</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] dark:text-white tracking-tight">
            Businesses Run Better with NextSofthr
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            See how operations leaders, HR directors, and financial controllers streamline everyday
            people management with our all-in-one platform.
          </p>
        </div>

        {/* Testimonials Slider */}
        <CardSlider
          id="testimonials-slider"
          ariaLabel="Customer testimonials"
          items={TESTIMONIALS}
          perView={TESTIMONIALS_PER_VIEW}
          renderItem={(item, idx) => (
            <div
              id={`testimonial-card-${idx}`}
              className="bg-[#F8FAFC] dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#65A30D] dark:text-[#A3E635]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white dark:bg-[#162447] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    {item.industry}
                  </span>
                </div>

                <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div>
                {/* Verified Benefit Banner */}
                <div className="mb-5 p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 flex items-center gap-2 text-xs font-semibold text-[#0265DC] dark:text-blue-300">
                  <CheckCircle2 className="w-4 h-4 text-[#65A30D] dark:text-[#A3E635] shrink-0" />
                  <span>{item.verifiedBenefit}</span>
                </div>

                {/* Person Profile */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-display font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {item.role} • <span className="font-medium text-slate-700 dark:text-slate-300">{item.company}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
};
