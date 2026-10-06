import React, { useState } from 'react';
import { INDUSTRY_INSIGHTS } from '../data/industryInsights';
import { IndustryInsightItem } from '../types/blog';
import { Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface IndustryInsightsProps {
  onSelectIndustry: (industry: IndustryInsightItem) => void;
}

export const IndustryInsights: React.FC<IndustryInsightsProps> = ({ onSelectIndustry }) => {
  const { t } = useLanguage();
  const [filterType, setFilterType] = useState<'all' | 'enterprise' | 'services' | 'operations'>('all');


  const getFilteredIndustries = () => {
    if (filterType === 'all') return INDUSTRY_INSIGHTS;
    if (filterType === 'enterprise') {
      return INDUSTRY_INSIGHTS.filter((i) =>
        ['enterprises', 'financial-services', 'government-public', 'technology'].includes(i.id)
      );
    }
    if (filterType === 'services') {
      return INDUSTRY_INSIGHTS.filter((i) =>
        ['small-businesses', 'medium-businesses', 'startups', 'professional-services', 'ngos'].includes(i.id)
      );
    }
    return INDUSTRY_INSIGHTS.filter((i) =>
      ['manufacturing', 'healthcare', 'retail', 'hospitality', 'logistics', 'education'].includes(i.id)
    );
  };

  const displayed = getFilteredIndustries();

  return (
    <section className="py-16 bg-white dark:bg-[#061528] border-b border-slate-200 dark:border-[#1E3656] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A3F7E] dark:text-[#8EE000]">
              <span className="w-2 h-2 rounded-full bg-[#8EE000]" />
              <span>{t('industry.kicker', 'Tailored Sector Solutions')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-heading">
              {t('industry.title', 'HR Insights for Every Organization')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {t('industry.subtitle', 'Explore specialized people operations, statutory payroll rules, and shift dynamics across 15 global and African industry verticals.')}
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#07192F] rounded-xl shrink-0 border border-transparent dark:border-[#1E3656]">
            {[
              { id: 'all', label: t('industry.all', 'All 15 Sectors') },
              { id: 'enterprise', label: t('industry.enterprise', 'Enterprise & Gov') },
              { id: 'services', label: t('industry.services', 'SMEs & Tech') },
              { id: 'operations', label: t('industry.operations', 'Shift & Industrial') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filterType === tab.id
                    ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* 15 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectIndustry(item)}
              className="group bg-slate-50 dark:bg-[#0B1E36] hover:bg-white dark:hover:bg-[#0E2442] rounded-2xl p-6 border border-slate-200 dark:border-[#1E3656] hover:border-[#0A3F7E]/40 dark:hover:border-[#8EE000]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-[#1E3656] group-hover:bg-[#8EE000] transition-colors" />

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#07192F] group-hover:bg-[#0A3F7E] dark:group-hover:bg-[#8EE000] text-[#0A3F7E] dark:text-[#8EE000] group-hover:text-white dark:group-hover:text-slate-950 flex items-center justify-center border border-slate-200 dark:border-[#1E3656] group-hover:border-[#0A3F7E] dark:group-hover:border-[#8EE000] transition-all shadow-xs">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-300 bg-white dark:bg-[#07192F] px-2.5 py-1 rounded-md border border-slate-200 dark:border-[#1E3656] font-mono">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0A3F7E] dark:group-hover:text-[#60A5FA] transition-colors font-heading">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Key Metric highlight */}
                <div className="pt-2 border-t border-slate-200/80 dark:border-[#1E3656] flex items-center gap-1.5 text-xs text-emerald-700 dark:text-[#8EE000] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8EE000]" />
                  <span>{item.keyMetric}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-[#1E3656] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400">
                  {t('industry.focus', 'Key Focus:')} {item.focusArea}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0A3F7E] dark:text-[#8EE000] group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                  <span>{t('industry.explore', 'Explore Sector')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8EE000] group-hover:translate-x-1 transition-transform" />
                </span>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
