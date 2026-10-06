import React, { useState } from 'react';
import {
  Laptop,
  ShoppingBag,
  Factory,
  Stethoscope,
  GraduationCap,
  UtensilsCrossed,
  HardHat,
  Landmark,
  Briefcase,
  Truck,
  HeartHandshake,
  Wheat,
  Building,
  Coffee,
  ShieldCheck,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { INDUSTRIES_LIST } from '../data/servicesData';
import { IndustryItem } from '../types';

interface IndustriesSectionProps {
  onSelectIndustry: (industry: IndustryItem) => void;
}

const industryIconMap: Record<string, React.FC<{ className?: string }>> = {
  tech: Laptop,
  retail: ShoppingBag,
  manufacturing: Factory,
  healthcare: Stethoscope,
  education: GraduationCap,
  hospitality: Coffee,
  construction: HardHat,
  financial: Landmark,
  professional: Briefcase,
  logistics: Truck,
  ngos: HeartHandshake,
  agriculture: Wheat,
  realestate: Building,
  restaurants: UtensilsCrossed,
  security: ShieldCheck,
};

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectIndustry }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'corporate' | 'industrial' | 'service'>('all');

  const filteredIndustries = INDUSTRIES_LIST.filter((ind) => {
    if (filterCategory === 'all') return true;
    return ind.category === filterCategory;
  });

  return (
    <section id="industries" className="py-20 bg-slate-50 dark:bg-[#07182E] border-t border-slate-200/80 dark:border-blue-900/60 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 dark:bg-blue-950/80 text-[#0256C4] dark:text-[#84CC16] text-xs font-extrabold uppercase tracking-widest border border-blue-200 dark:border-blue-800 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            INDUSTRY-SPECIFIC HR SOLUTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight mb-4">
            HR &amp; Business Management for Every Industry
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Every sector in Africa faces distinct operational challenges. NextSofthr provides specialized rosters,
            statutory modules, and compliance workflows tailored to your sector.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-[#0256C4] text-white shadow-md'
                : 'bg-white dark:bg-[#0D2644] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-blue-900/50 border border-slate-200 dark:border-blue-800'
            }`}
          >
            All 15 Sectors
          </button>
          <button
            onClick={() => setFilterCategory('corporate')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filterCategory === 'corporate'
                ? 'bg-[#0256C4] text-white shadow-md'
                : 'bg-white dark:bg-[#0D2644] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-blue-900/50 border border-slate-200 dark:border-blue-800'
            }`}
          >
            Corporate &amp; Tech
          </button>
          <button
            onClick={() => setFilterCategory('industrial')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filterCategory === 'industrial'
                ? 'bg-[#0256C4] text-white shadow-md'
                : 'bg-white dark:bg-[#0D2644] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-blue-900/50 border border-slate-200 dark:border-blue-800'
            }`}
          >
            Industrial &amp; Agriculture
          </button>
          <button
            onClick={() => setFilterCategory('service')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filterCategory === 'service'
                ? 'bg-[#0256C4] text-white shadow-md'
                : 'bg-white dark:bg-[#0D2644] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-blue-900/50 border border-slate-200 dark:border-blue-800'
            }`}
          >
            Service &amp; Hospitality
          </button>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredIndustries.map((ind) => {
            const IconComp = industryIconMap[ind.id] || Briefcase;

            return (
              <div
                key={ind.id}
                className="bg-white dark:bg-[#0A2540] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Authentic African Image Header */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={ind.imageUrl}
                      alt={`${ind.name} African professionals`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent flex items-end p-4 text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#0256C4] flex items-center justify-center text-white shadow-sm">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-sm text-white">{ind.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-2">
                      {ind.description}
                    </p>

                    {/* Features pill tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {ind.features.map((feat, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#0D2644] text-slate-700 dark:text-slate-200 text-[11px] font-medium border border-transparent dark:border-blue-900/50"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Stat Highlight */}
                    <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-100/80 dark:border-emerald-900">
                      ✓ {ind.stat}
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="p-5 pt-0 mt-auto">
                  <button
                    onClick={() => onSelectIndustry(ind)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-[#0256C4] dark:text-blue-300 group-hover:bg-[#0256C4] group-hover:text-white border border-blue-100 dark:border-blue-800 group-hover:border-transparent transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>View Solution</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
