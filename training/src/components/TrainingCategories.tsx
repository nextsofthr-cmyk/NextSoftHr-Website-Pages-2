import React from 'react';
import { CATEGORIES } from '../data/academyData';
import {
  Users,
  CreditCard,
  Clock,
  UserCheck,
  Award,
  BarChart3,
  Sparkles,
  Briefcase,
  ArrowRight,
} from 'lucide-react';

interface TrainingCategoriesProps {
  onSelectCategory: (categoryName: string) => void;
}

export const TrainingCategories: React.FC<TrainingCategoriesProps> = ({
  onSelectCategory,
}) => {
  const iconMap: Record<string, React.ElementType> = {
    Users,
    CreditCard,
    Clock,
    UserCheck,
    Award,
    BarChart3,
    Sparkles,
    Briefcase,
  };

  return (
    <section className="py-16 bg-white dark:bg-[#0F172A] border-b border-slate-200/70 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
              Curriculum Domains
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              Explore Our Training Categories
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Targeted skill tracks engineered for operational excellence, regulatory compliance, and forward-looking workforce leadership.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-semibold text-slate-500 dark:text-slate-400">
            8 Specialized Faculties · Practical Enterprise Curriculum
          </div>
        </div>

        {/* Category Grid: 8 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.iconName] || Users;
            return (
              <div
                key={cat.id}
                className="group relative bg-slate-50/60 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-xl p-5 border border-slate-200/80 dark:border-slate-700/80 hover:border-[#0F4C81]/40 dark:hover:border-blue-500/60 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Count */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-white dark:bg-slate-700 border border-slate-200/90 dark:border-slate-600 text-[#0F4C81] dark:text-[#84CC16] group-hover:bg-[#0F4C81] group-hover:text-white dark:group-hover:bg-blue-600 flex items-center justify-center transition-colors shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {cat.courseCount} Courses
                    </span>
                  </div>

                  {/* Name & Description */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0F4C81] dark:group-hover:text-[#84CC16] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Key Subcategories list */}
                  <div className="mt-3.5 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                      Core Modules
                    </div>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      {cat.subcategories.slice(0, 3).map((sub, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#84CC16]" />
                          <span className="truncate">{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Explore Courses Link */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <button
                    onClick={() => onSelectCategory(cat.name)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] dark:text-[#84CC16] hover:text-[#0B3C68] dark:hover:text-lime-300 group-hover:translate-x-0.5 transition-all cursor-pointer"
                  >
                    <span>Explore Courses</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16]" />
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
