import React from 'react';
import { BLOG_CATEGORIES } from '../data/categories';
import { Sparkles, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
  selectedSubcategory: string | null;
  onSelectSubcategory: (subcategory: string | null) => void;
}

const CAT_KEY_MAP: Record<string, string> = {
  'HR Management': 'cat.hrManagement',
  'Payroll': 'cat.payroll',
  'Talent': 'cat.talent',
  'Workforce': 'cat.workforce',
  'Employee Experience': 'cat.employeeExperience',
  'Business': 'cat.business',
  'AI & Technology': 'cat.aiTechnology',
  'Compliance': 'cat.compliance',
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSubcategory,
  onSelectSubcategory,
}) => {
  const { t } = useLanguage();
  const currentCategoryObj = BLOG_CATEGORIES.find(
    (c) => c.name.toLowerCase() === selectedCategory?.toLowerCase()
  );

  return (
    <div className="bg-slate-50/70 dark:bg-[#07192F] border-b border-slate-200 dark:border-[#1E3656] py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Category Filter Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {/* 'All Insights' Button */}
          <button
            onClick={() => {
              onSelectCategory(null);
              onSelectSubcategory(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === null
                ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white shadow-sm ring-2 ring-[#0A3F7E]/20 dark:ring-[#2563EB]/40'
                : 'bg-white dark:bg-[#0B1E36] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0E2442] border border-slate-200 dark:border-[#1E3656]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t('category.all', 'All Insights')}</span>
          </button>


          {BLOG_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory?.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.name);
                  onSelectSubcategory(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white shadow-sm ring-2 ring-[#0A3F7E]/20 dark:ring-[#2563EB]/40'
                    : 'bg-white dark:bg-[#0B1E36] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0E2442] border border-slate-200 dark:border-[#1E3656]'
                }`}
              >
                <span>
                  {CAT_KEY_MAP[cat.name] ? t(CAT_KEY_MAP[cat.name], cat.name) : cat.name}
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? 'bg-white/20 text-[#8EE000]'
                      : 'bg-slate-100 dark:bg-[#122A4A] text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {cat.articleCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Subcategories Bar if a category is selected */}
        {currentCategoryObj && currentCategoryObj.subcategories.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-[#1E3656] flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 dark:text-slate-400 font-medium shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#8EE000]" />
              {t('category.topicsIn', 'Topics in')} {CAT_KEY_MAP[currentCategoryObj.name] ? t(CAT_KEY_MAP[currentCategoryObj.name], currentCategoryObj.name) : currentCategoryObj.name}:
            </span>

            <button
              onClick={() => onSelectSubcategory(null)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedSubcategory === null
                  ? 'bg-[#8EE000]/20 dark:bg-[#8EE000]/30 text-slate-950 dark:text-[#8EE000] font-bold border border-[#8EE000]/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#0B1E36] border border-slate-200 dark:border-[#1E3656]'
              }`}
            >
              {t('category.allTopics', 'All Topics')}
            </button>


            {currentCategoryObj.subcategories.map((sub) => {
              const isSubSelected = selectedSubcategory?.toLowerCase() === sub.toLowerCase();
              return (
                <button
                  key={sub}
                  onClick={() => onSelectSubcategory(sub)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    isSubSelected
                      ? 'bg-[#8EE000]/20 dark:bg-[#8EE000]/30 text-slate-950 dark:text-[#8EE000] font-bold border border-[#8EE000]/50'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#0B1E36] border border-slate-200 dark:border-[#1E3656]'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
