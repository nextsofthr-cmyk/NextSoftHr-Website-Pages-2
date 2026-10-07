import React from 'react';
import {
  Rocket,
  Users,
  CreditCard,
  Clock,
  CalendarCheck,
  UserCheck,
  Smartphone,
  Sparkles,
  Briefcase,
  ShieldCheck,
  Blocks,
  BadgeDollarSign,
  Headphones,
  Building2,
  ChevronRight,
  Filter
} from 'lucide-react';
import { FAQCategory } from '../data/faqData';
import { useLanguage } from '../context/LanguageContext';

interface CategoryNavProps {
  categories: FAQCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Rocket,
  Users,
  CreditCard,
  Clock,
  CalendarCheck,
  UserCheck,
  Smartphone,
  Sparkles,
  Briefcase,
  ShieldCheck,
  Blocks,
  BadgeDollarSign,
  Headphones,
  Building2,
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
}) => {
  const { t } = useLanguage();

  return (
    <section id="categories-overview" className="py-10 bg-white dark:bg-[#0B132B] border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-1">
              {t('catNav.badge', 'Browse by Module')}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t('catNav.title', 'Explore Solution Categories')}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>{t('catNav.hint', 'Select a category to jump directly to detailed answers')}</span>
          </div>
        </div>

        {/* Mobile Dropdown View */}
        <div className="sm:hidden mb-4">
          <label htmlFor="category-select" className="sr-only">
            Select FAQ Category
          </label>
          <select
            id="category-select"
            value={activeCategoryId}
            onChange={(e) => onSelectCategory(e.target.value)}
            className="w-full px-3.5 py-3 text-sm font-medium bg-slate-50 dark:bg-[#0F1D3D] border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#111F42]"
          >
            <option value="all">{t('catNav.allCategories', 'All Categories')} ({categories.reduce((acc, c) => acc + c.questions.length, 0)} questions)</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {t(`cat.${cat.id}`, cat.title)} ({cat.questions.length})
              </option>
            ))}
          </select>
        </div>

        {/* Horizontal Swipeable Bar on Tablet/Mobile & Elegant Grid on Desktop */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.iconName] || Briefcase;
            const isActive = activeCategoryId === cat.id;
            const isAI = cat.id === 'ai-assistant';

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between relative ${
                  isActive
                    ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 ring-2 ring-blue-600/20 shadow-xs'
                    : isAI
                    ? 'bg-slate-900 dark:bg-[#080E1E] text-white border-slate-800 dark:border-slate-750 hover:border-lime-400'
                    : 'bg-white dark:bg-[#0F1D3D] hover:bg-slate-50/80 dark:hover:bg-[#162752] border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-blue-700 text-white'
                          : isAI
                          ? 'bg-lime-400 text-slate-950'
                          : 'bg-slate-100 dark:bg-[#162752] text-slate-700 dark:text-slate-200 group-hover:bg-blue-100 group-hover:text-blue-700 dark:group-hover:bg-blue-900/60 dark:group-hover:text-blue-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {cat.badge ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400 bg-lime-950/60 px-1.5 py-0.5 rounded border border-lime-800/40">
                        {cat.badge}
                      </span>
                    ) : (
                      <span
                        className={`text-[11px] font-semibold tabular-nums ${
                          isActive
                            ? 'text-blue-700 dark:text-blue-400 font-bold'
                            : isAI
                            ? 'text-slate-400'
                            : 'text-slate-400 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                        }`}
                      >
                        {cat.questions.length} {t('catNav.qs', 'Qs')}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-xs font-bold leading-snug line-clamp-1 ${
                      isActive
                        ? 'text-blue-900 dark:text-blue-300'
                        : isAI
                        ? 'text-white'
                        : 'text-slate-800 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400'
                    }`}
                  >
                    {t(`cat.${cat.id}`, cat.title)}
                  </h3>
                  <p
                    className={`text-[11px] mt-1 line-clamp-2 leading-tight ${
                      isActive
                        ? 'text-blue-700/80 dark:text-blue-300/80'
                        : isAI
                        ? 'text-slate-300'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {t(`cat.${cat.id}.desc`, cat.shortDescription)}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100/10 dark:border-slate-800">
                  <span
                    className={`text-[10px] font-semibold ${
                      isActive
                        ? 'text-blue-700 dark:text-blue-400'
                        : isAI
                        ? 'text-lime-300'
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                    }`}
                  >
                    {isActive ? t('catNav.active', 'Active') : t('catNav.jump', 'Jump to section')}
                  </span>
                  <ChevronRight
                    className={`w-3 h-3 transition-transform ${
                      isActive
                        ? 'text-blue-700 dark:text-blue-400 translate-x-0.5'
                        : isAI
                        ? 'text-lime-300'
                        : 'text-slate-300 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* View All Button */}
        {activeCategoryId !== 'all' && (
          <div className="mt-4 text-center sm:text-right">
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-4"
            >
              {t('catNav.resetAll', 'Reset to view all 14 categories')} ({categories.reduce((acc, c) => acc + c.questions.length, 0)} questions)
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
