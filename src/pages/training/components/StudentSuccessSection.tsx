import React from 'react';
import { TESTIMONIALS } from '../data/academyData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const StudentSuccessSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-[#0B1120] border-b border-slate-200/70 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            Alumni Outcomes
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Professionals Are Building Their Skills With NextSoftHR
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Hear from alumni across human resources, payroll operations, and executive leadership who accelerated their workplace impact.
          </p>
        </div>

        {/* 4 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-[#0F172A] rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-[#0F4C81]/30 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200 dark:text-slate-700" />
                </div>

                {/* Course Completed Tag */}
                <div className="mb-3">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-[#0F4C81] dark:text-[#84CC16] line-clamp-1">
                    {t.courseCompleted}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                />
                <div className="truncate">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {t.name}
                    </span>
                    {t.verifiedStudent && (
                      <CheckCircle2 className="w-3 h-3 text-[#65A30D] dark:text-[#84CC16] flex-shrink-0" />
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
          ))}
        </div>

      </div>
    </section>
  );
};
