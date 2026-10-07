import React from 'react';
import { TRAINING_BUNDLES } from '../data/academyData';
import { TrainingBundle } from '../types';
import {
  Layers,
  Clock,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import { useCurrency } from '../context/CurrencyContext';

interface TrainingBundlesSectionProps {
  currency?: string;
  onSelectBundle: (bundle: TrainingBundle) => void;
}

export const TrainingBundlesSection: React.FC<TrainingBundlesSectionProps> = ({
  onSelectBundle,
}) => {
  const { formatBundlePrice, formatAmount } = useCurrency();
  const formatPrice = (bundle: TrainingBundle) => {
    return {
      bundle: formatBundlePrice(bundle, false),
      original: formatBundlePrice(bundle, true),
      savings: formatAmount(bundle.originalPriceUSD - bundle.bundlePriceUSD),
    };
  };

  return (
    <section className="py-16 bg-white dark:bg-[#0F172A] border-b border-slate-200/70 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-lime-100 dark:bg-lime-950/80 text-[#65A30D] dark:text-[#84CC16] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Value Packages</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Save With Professional Learning Bundles
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Combine complementary masterclasses for comprehensive career acceleration and save up to 30% on tuition.
          </p>
        </div>

        {/* 4 Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINING_BUNDLES.map((bundle) => {
            const pricing = formatPrice(bundle);
            return (
              <div
                key={bundle.id}
                className="bg-slate-50/70 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80 p-6 shadow-2xs hover:shadow-md hover:border-[#0F4C81]/50 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Savings Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#84CC16] text-[#0F4C81] tracking-wider uppercase">
                      Save {bundle.savingsPercentage}%
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{bundle.totalDuration}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {bundle.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {bundle.description}
                  </p>

                  {/* Courses in Bundle */}
                  <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-slate-700">
                    <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                      Included Courses ({bundle.courses.length})
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {bundle.courses.map((cTitle, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16] mt-0.5 flex-shrink-0" />
                          <span className="leading-tight text-[11px] line-clamp-1">{cTitle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Certificate indicator */}
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#0F4C81] dark:text-blue-300">
                    <Award className="w-4 h-4 text-[#84CC16]" />
                    <span>Includes Master Bundle Credential</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-xs text-slate-400 line-through mr-1.5">
                        {pricing.original}
                      </span>
                      <span className="text-xl font-extrabold text-[#0F4C81] dark:text-[#84CC16]">
                        {pricing.bundle}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#65A30D] dark:text-[#84CC16] font-bold">
                      Save {pricing.savings}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectBundle(bundle)}
                    className="w-full py-2.5 px-3 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Enroll in Bundle</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#84CC16]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
