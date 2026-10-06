import React, { useState } from 'react';
import { PARTNER_CATEGORIES } from '../data/partnerData';
import { PartnerCategory, PartnerCategoryType } from '../types/agreement';
import { Check, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

interface PartnerCategoriesProps {
  onSelectCategoryForAcceptance: (categoryId: PartnerCategoryType) => void;
}

export const PartnerCategories: React.FC<PartnerCategoriesProps> = ({
  onSelectCategoryForAcceptance
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'sales' | 'advisory' | 'services' | 'enterprise'>('all');
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);

  const filteredCategories = PARTNER_CATEGORIES.filter((category) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'sales') {
      return ['reseller', 'distributor', 'affiliate', 'referral'].includes(category.id);
    }
    if (activeFilter === 'advisory') {
      return ['accountant', 'hr_consultant', 'associate'].includes(category.id);
    }
    if (activeFilter === 'services') {
      return ['implementation', 'training', 'outsourcing', 'technology'].includes(category.id);
    }
    if (activeFilter === 'enterprise') {
      return ['strategic', 'distributor', 'outsourcing'].includes(category.id);
    }
    return true;
  });

  return (
    <section id="categories" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
              <span>Channel Taxonomy</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>12 Recognized Classifications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Select Your Authorized Partner Category
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Each classification carries defined commercial rights, commission schedules, onboarding benchmarks, and operational parameters within our global agreement.
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Types (12)
            </button>
            <button
              onClick={() => setActiveFilter('sales')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'sales'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sales & Channels
            </button>
            <button
              onClick={() => setActiveFilter('advisory')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'advisory'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Advisory & Finance
            </button>
            <button
              onClick={() => setActiveFilter('services')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'services'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Services & Integration
            </button>
            <button
              onClick={() => setActiveFilter('enterprise')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'enterprise'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Strategic & BPO
            </button>
          </div>
        </div>

        {/* 12 Visual Cards Grid */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => {
            const isExpanded = expandedCategoryId === category.id;
            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6">
                  {/* Card Header with Editorial Numbering */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      {String(index + 1).padStart(2, '0')}. Category
                    </span>
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      Default: {category.defaultTier}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-lg font-bold text-slate-900">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed min-h-[48px]">
                    {category.shortDesc}
                  </p>

                  {/* Commercial Framework Info */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Revenue Model:</span>
                      <span className="text-slate-800 font-semibold">{category.commissionType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Authorization Scope:</span>
                      <span className="text-slate-700">{category.authorizationScope}</span>
                    </div>
                  </div>

                  {/* Expandable Key Requirements */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs">
                      <div>
                        <span className="font-semibold text-slate-900 block mb-1.5">
                          Prerequisites & Qualification:
                        </span>
                        <ul className="space-y-1 text-slate-600">
                          {category.keyRequirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-lime-600 shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <span className="font-semibold text-slate-900 block mb-1.5">
                          Approved Activities:
                        </span>
                        <ul className="space-y-1 text-slate-600">
                          {category.allowedActivities.map((act, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setExpandedCategoryId(isExpanded ? null : category.id)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 focus:outline-none cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Requirements'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  <button
                    onClick={() => onSelectCategoryForAcceptance(category.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Select & Sign</span>
                    <ArrowRight className="w-3 h-3" />
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
