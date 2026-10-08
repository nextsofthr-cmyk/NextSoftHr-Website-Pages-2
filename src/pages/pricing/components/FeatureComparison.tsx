import React, { useState } from 'react';
import {
  Check,
  X,
  Sparkles,
  HelpCircle,
  Search,
  Users,
  Clock,
  CalendarCheck,
  Wallet,
  UserPlus,
  TrendingUp,
  Receipt,
  Briefcase,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { COMPARISON_DATA } from '../data/pricingData';
import { ComparisonFeature } from '../types';

interface FeatureComparisonProps {
  onSelectPlan: (planName: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'HR Management': Users,
  'Time & Attendance': Clock,
  'Leave Management': CalendarCheck,
  'Payroll': Wallet,
  'Recruitment': UserPlus,
  'Performance': TrendingUp,
  'Finance & Expenses': Receipt,
  'Business Management': Briefcase,
  'AI Assistant': Sparkles,
  'Enterprise & Security': ShieldCheck,
};

export const FeatureComparison: React.FC<FeatureComparisonProps> = ({ onSelectPlan }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter features based on category and query
  const filteredCategories = COMPARISON_DATA.map((cat) => {
    if (selectedCategory !== 'All' && cat.category !== selectedCategory) {
      return null;
    }
    const matchingFeatures = cat.features.filter((f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (matchingFeatures.length === 0) return null;
    return {
      ...cat,
      features: matchingFeatures,
    };
  }).filter(Boolean) as typeof COMPARISON_DATA;

  const renderValue = (val: boolean | string, isPop?: boolean) => {
    if (typeof val === 'boolean') {
      return val ? (
        <div
          className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
            isPop
              ? 'bg-[#A3E635] text-slate-900 shadow-xs'
              : 'bg-blue-100 dark:bg-blue-950 text-[#0265DC] dark:text-blue-400'
          }`}
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
        </div>
      ) : (
        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
          <X className="w-3.5 h-3.5 stroke-[2]" />
        </div>
      );
    }
    return (
      <span
        className={`text-xs font-semibold px-2 py-1 rounded-md inline-block ${
          isPop
            ? 'bg-blue-50 dark:bg-blue-950/80 text-[#0265DC] dark:text-blue-400 font-bold border border-blue-200/50 dark:border-blue-800/50'
            : 'text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80'
        }`}
      >
        {val}
      </span>
    );
  };

  return (
    <section id="compare-features" className="py-20 bg-white dark:bg-[#070D1E] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0265DC] dark:text-blue-300 text-xs font-bold mb-3 border border-blue-200/60 dark:border-blue-800/60">
            <span>Detailed Breakdown</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] dark:text-white tracking-tight">
            Compare Plans &amp; Features
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base">
            Explore complete platform functionality across our tiers to select the exact fit for
            your company.
          </p>
        </div>

        {/* Controls: Search & Category Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="feature-search-input"
              type="text"
              placeholder="Search features (e.g. shift, overtime, SSO)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0265DC] bg-[#F8FAFC] dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400"
            />
          </div>

          {/* Category Dropdown / Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {['All', 'HR Management', 'Time & Attendance', 'Payroll', 'AI Assistant', 'Enterprise & Security'].map(
              (cat) => (
                <button
                  key={cat}
                  id={`cat-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#0265DC] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Table Container with Horizontal Scroll */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-[#070D1E]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              {/* Sticky Header */}
              <thead>
                <tr className="bg-slate-50/90 dark:bg-[#111C38] border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="p-4 sm:p-5 w-2/5 font-bold text-slate-900 dark:text-white sticky left-0 bg-slate-50/95 dark:bg-[#111C38] z-20">
                    Feature Category
                  </th>
                  <th className="p-4 sm:p-5 text-center font-bold text-slate-800 dark:text-slate-200 w-[15%]">
                    Starter
                    <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400 normal-case mt-0.5">
                      Up to 15 staff
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 text-center font-bold text-[#0265DC] dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30 w-[15%] relative">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#A3E635] text-slate-950 text-[10px] font-extrabold uppercase mr-1">
                      Popular
                    </span>
                    Professional
                    <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400 normal-case mt-0.5">
                      Up to 50 staff
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 text-center font-bold text-slate-800 dark:text-slate-200 w-[15%]">
                    Business
                    <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400 normal-case mt-0.5">
                      Up to 150 staff
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 text-center font-bold text-slate-800 dark:text-slate-200 w-[15%]">
                    Enterprise
                    <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400 normal-case mt-0.5">
                      Unlimited
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.map((categoryGroup) => {
                  const Icon = CATEGORY_ICONS[categoryGroup.category] || Users;
                  return (
                    <React.Fragment key={categoryGroup.category}>
                      {/* Category Header Row */}
                      <tr className="bg-slate-100/70 dark:bg-[#0D162C] border-y border-slate-200 dark:border-slate-800 font-bold text-xs text-slate-800 dark:text-slate-200">
                        <td
                          colSpan={5}
                          className="p-3.5 sm:px-5 sticky left-0 bg-slate-100/90 dark:bg-[#0D162C] z-10"
                        >
                          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                            <Icon className="w-4 h-4 text-[#0265DC] dark:text-blue-400" />
                            <span className="font-display text-sm tracking-wide">
                              {categoryGroup.category}
                            </span>
                          </div>
                        </td>
                      </tr>

                      {/* Feature Rows */}
                      {categoryGroup.features.map((feature: ComparisonFeature, idx: number) => (
                        <tr
                          key={feature.name}
                          className={`border-b border-slate-100 dark:border-slate-800/70 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors text-sm ${
                            idx % 2 === 0 ? 'bg-white dark:bg-[#070D1E]' : 'bg-slate-50/30 dark:bg-[#091124]'
                          }`}
                        >
                          <td className="p-4 sm:px-5 font-medium text-slate-800 dark:text-slate-200 sticky left-0 bg-white/95 dark:bg-[#070D1E] z-10">
                            <div className="flex items-center justify-between pr-2">
                              <span>{feature.name}</span>
                              {feature.description && (
                                <span title={feature.description}>
                                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 cursor-help" />
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-center">{renderValue(feature.starter)}</td>
                          <td className="p-4 text-center bg-blue-50/30 dark:bg-blue-950/20 border-x border-blue-100/50 dark:border-blue-900/40">
                            {renderValue(feature.professional, true)}
                          </td>
                          <td className="p-4 text-center">{renderValue(feature.business)}</td>
                          <td className="p-4 text-center">{renderValue(feature.enterprise)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>

              {/* Bottom Table Action Row */}
              <tfoot>
                <tr className="bg-slate-50 dark:bg-[#111C38] border-t-2 border-slate-200 dark:border-slate-800">
                  <td className="p-4 sm:p-5 font-semibold text-slate-700 dark:text-slate-200 sticky left-0 bg-slate-50 dark:bg-[#111C38] z-10">
                    Ready to get started?
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => onSelectPlan('Starter')}
                      className="px-3 py-2 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 w-full"
                    >
                      Choose Starter
                    </button>
                  </td>
                  <td className="p-4 text-center bg-blue-50/60 dark:bg-blue-950/30 border-x border-blue-100 dark:border-blue-900/40">
                    <button
                      onClick={() => onSelectPlan('Professional')}
                      className="px-3 py-2 rounded-lg text-xs font-extrabold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-sm w-full"
                    >
                      Choose Pro
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => onSelectPlan('Business')}
                      className="px-3 py-2 rounded-lg text-xs font-bold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 border border-transparent dark:border-slate-600 w-full"
                    >
                      Choose Business
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => onSelectPlan('Enterprise')}
                      className="px-3 py-2 rounded-lg text-xs font-bold text-[#0265DC] dark:text-blue-300 bg-blue-100 dark:bg-blue-950 hover:bg-blue-200 dark:hover:bg-blue-900 border border-transparent dark:border-blue-800/60 w-full"
                    >
                      Contact Sales
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
