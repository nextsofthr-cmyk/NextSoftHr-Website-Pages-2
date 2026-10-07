import React, { useState } from 'react';
import {
  ShoppingBag,
  Utensils,
  Hotel,
  Stethoscope,
  GraduationCap,
  Briefcase,
  HardHat,
  Truck,
  Factory,
  Laptop,
  Landmark,
  HeartHandshake,
  Globe,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { INDUSTRY_SOLUTIONS } from '../data/pricingData';
import { IndustrySolution } from '../types';

const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  ShoppingBag,
  Utensils,
  Hotel,
  Stethoscope,
  GraduationCap,
  Briefcase,
  HardHat,
  Truck,
  Factory,
  Laptop,
  Landmark,
  HeartHandshake,
  Globe,
};

interface IndustrySolutionsProps {
  onExploreIndustry: (industry: IndustrySolution) => void;
}

export const IndustrySolutions: React.FC<IndustrySolutionsProps> = ({ onExploreIndustry }) => {
  const [activeTabId, setActiveTabId] = useState<string>(INDUSTRY_SOLUTIONS[0].id);

  const activeIndustry =
    INDUSTRY_SOLUTIONS.find((ind) => ind.id === activeTabId) || INDUSTRY_SOLUTIONS[0];

  return (
    <section id="industries" className="py-20 bg-[#F8FAFC] dark:bg-[#070D1E] border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0265DC] dark:text-blue-300 text-xs font-bold mb-3 border border-blue-200/50 dark:border-blue-800/60">
            <span>Specialized Workflows</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] dark:text-white tracking-tight">
            One Platform. Multiple Industries.
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            From hospital shift rotations and retail rosters to technology equity incentives, NextSofthr
            adapts to the distinct operational realities of your sector.
          </p>
        </div>

        {/* Industry Pill Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {INDUSTRY_SOLUTIONS.map((ind) => {
            const Icon = INDUSTRY_ICONS[ind.iconName] || Briefcase;
            const isActive = ind.id === activeTabId;
            return (
              <button
                key={ind.id}
                id={`industry-pill-${ind.id}`}
                onClick={() => setActiveTabId(ind.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-[#0265DC] text-white shadow-sm'
                    : 'bg-white dark:bg-[#0B132B] border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#A3E635]' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Feature Card */}
        <div className="bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg shadow-blue-900/5 grid grid-cols-1 lg:grid-cols-12 transition-colors">
          {/* Left Visual Image */}
          <div className="lg:col-span-6 relative h-64 lg:h-auto min-h-[320px]">
            <img
              src={activeIndustry.imageUrl}
              alt={activeIndustry.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 lg:hidden text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A3E635]">
                {activeIndustry.name} Solution
              </span>
              <h4 className="font-display text-lg font-bold">{activeIndustry.tagline}</h4>
            </div>
          </div>

          {/* Right Details */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-[#0265DC] dark:text-blue-300 uppercase tracking-wider mb-2">
                <span>NextSofthr for {activeIndustry.name}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B132B] dark:text-white">
                {activeIndustry.tagline}
              </h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeIndustry.description}
              </p>

              {/* Workflows checklist */}
              <div className="mt-6 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Customized Sector Capabilities:
                </div>
                {activeIndustry.keyWorkflows.map((wf, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-800 dark:text-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#65A30D] dark:text-[#A3E635] shrink-0" />
                    <span>{wf}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                id="explore-industry-solution-btn"
                onClick={() => onExploreIndustry(activeIndustry)}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-sm transition-colors flex items-center gap-2"
              >
                <span>View {activeIndustry.name} Workflows</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400 dark:text-slate-500">All plans compatible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
