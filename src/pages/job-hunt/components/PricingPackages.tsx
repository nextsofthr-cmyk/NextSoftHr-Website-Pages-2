import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight,
  Coins 
} from 'lucide-react';
import { PricingPlan } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface PricingPackagesProps {
  plans: PricingPlan[];
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PricingPackages: React.FC<PricingPackagesProps> = ({
  plans,
  onSelectPlan
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'posting' | 'software' | 'enterprise'>('all');
  const { currentCurrency, currencyConfig, convertAndFormatPrice } = useCurrency();

  const filteredPlans = plans.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-lime-400">
              Commercial Options & Plans
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-[#0F172A] text-blue-700 dark:text-lime-300 border border-blue-200 dark:border-slate-800">
              <Coins className="w-3 h-3 text-blue-500 dark:text-lime-400" />
              <span>{currencyConfig.flag} Billed in {currencyConfig.code} ({currencyConfig.symbol})</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] dark:text-white tracking-tight">
            Flexible Recruitment Packages & Technology
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Choose between self-service job postings, integrated ATS recruitment software, or dedicated executive headhunting and RPO partnerships.
          </p>

          {/* Filter Pills */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex p-1 bg-slate-100 dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-300">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-white dark:bg-[#1E293B] text-[#142B4A] dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All Options
              </button>
              <button
                onClick={() => setSelectedCategory('posting')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'posting'
                    ? 'bg-white dark:bg-[#1E293B] text-[#142B4A] dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Job Posting
              </button>
              <button
                onClick={() => setSelectedCategory('software')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'software'
                    ? 'bg-white dark:bg-[#1E293B] text-[#142B4A] dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Recruitment ATS
              </button>
              <button
                onClick={() => setSelectedCategory('enterprise')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'enterprise'
                    ? 'bg-white dark:bg-[#1E293B] text-[#142B4A] dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                RPO & Headhunting
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-blue-50/50 to-white dark:from-[#0B1120] dark:to-[#0F172A] border-2 border-[#2563EB] dark:border-blue-500 hover:dark:border-lime-400 shadow-xl'
                  : 'bg-slate-50/70 dark:bg-[#0F172A] hover:bg-white dark:hover:bg-[#131D31] border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-lime-400/40 hover:shadow-lg dark:hover:shadow-black/60'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#2563EB] text-white dark:bg-lime-400 dark:text-slate-950 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                  Most Popular for Growth
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-base font-bold text-[#142B4A] dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {plan.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="py-4 border-y border-slate-200/70 dark:border-slate-800 my-2">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <div className="text-2xl font-black text-[#142B4A] dark:text-lime-400 tabular-nums tracking-tight">
                      {convertAndFormatPrice(plan.price)}
                    </div>
                    {currentCurrency !== 'NGN' && plan.price.includes('₦') && (
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                        ({plan.price})
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {plan.period}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                    What's included:
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#0F9D8A] dark:text-lime-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-2.5 px-4 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                    plan.highlighted
                      ? 'bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white'
                      : 'bg-[#142B4A] hover:bg-[#1E3A5F] dark:bg-[#131D31] dark:hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
