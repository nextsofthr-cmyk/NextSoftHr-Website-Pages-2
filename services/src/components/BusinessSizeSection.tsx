import React from 'react';
import { ArrowRight, Check, Sparkles, Building, Briefcase, Store, Landmark } from 'lucide-react';
import { BUSINESS_STAGES } from '../data/servicesData';

interface BusinessSizeSectionProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

const tierIcons = [Store, Briefcase, Building, Landmark];

export const BusinessSizeSection: React.FC<BusinessSizeSectionProps> = ({
  onOpenDemo,
  onOpenGetStarted,
}) => {
  return (
    <section id="business-stages" className="py-20 bg-white dark:bg-[#0A2540] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[#0256C4] dark:text-[#84CC16] text-xs font-extrabold uppercase tracking-widest border border-blue-100 dark:border-blue-800 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            SCALABLE WORKFORCE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight mb-4">
            Built for Every Stage of Business
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Whether you are launching your first startup or coordinating tens of thousands of staff across multinational
            subsidiaries, NextSofthr adapts to your operating scale.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUSINESS_STAGES.map((stage, idx) => {
            const IconComp = tierIcons[idx] || Building;

            return (
              <div
                key={stage.id}
                className="bg-[#F8FAFC] dark:bg-[#0D2644] hover:bg-white dark:hover:bg-[#123860] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-blue-800/80 hover:border-[#0256C4]/40 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* African Business Photograph Header for Every Card */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={stage.imageUrl}
                      alt={stage.imageCaption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-4 text-white">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#0256C4] text-white text-[11px] font-bold">
                          {stage.employeeRange}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                          <IconComp className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#84CC16] mb-1">
                      {stage.tier}
                    </div>
                    <h3 className="text-lg font-bold text-[#0A2540] dark:text-white group-hover:text-[#0256C4] dark:group-hover:text-blue-300 transition-colors mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-3">
                      {stage.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2 pt-3 border-t border-slate-200/70 dark:border-blue-900/60 mb-4">
                      {stage.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className="line-clamp-1 font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Highlight stat */}
                    <div className="p-2.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/60 text-[11px] font-semibold text-[#0256C4] dark:text-blue-300 border border-blue-100/70 dark:border-blue-900">
                      ★ {stage.highlightStat}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="p-5 sm:p-6 pt-0 mt-auto">
                  <a
                    href="/signup"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#0256C4] dark:text-blue-300 group-hover:bg-[#0256C4] group-hover:text-white border border-blue-200 dark:border-blue-800 group-hover:border-transparent transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom enterprise migration note */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 font-medium">
            Migrating from an existing legacy HRMS or Excel sheets?{' '}
            <button
              onClick={onOpenDemo}
              className="text-[#0256C4] dark:text-[#84CC16] font-bold underline hover:text-[#0A2540] dark:hover:text-white transition-colors ml-1 cursor-pointer"
            >
              Request white-glove data migration support →
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};
