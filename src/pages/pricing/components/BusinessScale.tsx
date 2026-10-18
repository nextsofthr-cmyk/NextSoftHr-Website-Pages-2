import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { BUSINESS_STAGES } from '../data/pricingData';

interface BusinessScaleProps {
  onSelectPlan?: (planName: string) => void;
}

export const BusinessScale: React.FC<BusinessScaleProps> = () => {
  return (
    <section id="scale-section" className="py-20 bg-[#F8FAFC] dark:bg-[#070D1E] border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0265DC] dark:text-blue-300 text-xs font-bold mb-3 border border-blue-200/60 dark:border-blue-800/60">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Future-Proof Architecture</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] dark:text-white tracking-tight">
            Built for Every Stage of Your Business
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium">
            <span className="text-[#0265DC] dark:text-blue-400">Start small.</span>{' '}
            <span className="text-[#65A30D] dark:text-[#A3E635]">Scale globally.</span>{' '}
            <span className="text-slate-900 dark:text-white">Manage everything from one platform.</span>
          </p>
        </div>

        {/* Growth Path Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-200 via-lime-300 to-blue-400 -translate-y-12 -z-0 pointer-events-none opacity-40 dark:opacity-20" />

          {BUSINESS_STAGES.map((stage, idx) => (
            <div
              key={stage.stage}
              id={`scale-stage-${idx}`}
              className="bg-white dark:bg-[#0B132B] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative z-10 group"
            >
              <div>
                {/* Stage Step Pill */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#162447] text-slate-700 dark:text-slate-300">
                    Stage 0{idx + 1}
                  </span>
                  <span className="text-xs font-extrabold text-[#0265DC] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800/60">
                    {stage.employees}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#0265DC] dark:group-hover:text-blue-400 transition-colors">
                  {stage.stage}
                </h3>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 mb-3">
                  {stage.headline}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {stage.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {stage.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#A3E635] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Tier Pill & Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Ideal tier:{' '}
                  <span className="font-bold text-slate-900 dark:text-white">{stage.idealPlan}</span>
                </div>
                <a
                  id={`scale-stage-signup-${idx}`}
                  href="/signup"
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#162447] hover:bg-[#A3E635] text-slate-700 dark:text-slate-300 hover:text-slate-950 transition-colors"
                  title="Sign up"
                  aria-label={`Sign up for ${stage.idealPlan}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
