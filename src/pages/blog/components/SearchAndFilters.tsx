import React from 'react';
import { Search, X, User, Tag, RotateCcw } from 'lucide-react';
import { AUTHORS } from '../data/mockArticles';
import { useLanguage } from '../context/LanguageContext';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  selectedAuthor: string | null;
  onSelectAuthor: (authorName: string | null) => void;
  onResetFilters: () => void;
  totalResults: number;
}


export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedTag,
  onSelectTag,
  selectedAuthor,
  onSelectAuthor,
  onResetFilters,
  totalResults,
}) => {
  const { t } = useLanguage();

  const exampleSearches = [
    'Payroll compliance',
    'Employee onboarding',
    'HR AI',
    'Leave management',
    'Performance management',
    'Workforce analytics',
  ];

  const popularTags = [
    'Workforce Automation',
    'PAYE',
    'Tax Compliance',
    'African Workforce',
    'Employee Engagement',
    'Self-Service',
    'Retention',
    'Geofencing',
  ];

  const hasActiveFilters = searchQuery !== '' || selectedTag !== null || selectedAuthor !== null;

  return (
    <div className="bg-white dark:bg-[#061528] py-6 border-b border-slate-200 dark:border-[#1E3656] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Main Search Bar */}
        <div className="relative flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-[#0A3F7E] dark:text-[#60A5FA]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('search.placeholder', 'Search HR, payroll and business insights...')}
              className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-300 dark:border-[#1E3656] bg-slate-50/50 dark:bg-[#0B1E36] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A3F7E] dark:focus:ring-[#8EE000] focus:bg-white dark:focus:bg-[#0E2442] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Author Selector */}
          <div className="w-full md:w-56 shrink-0 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </div>
            <select
              value={selectedAuthor || ''}
              onChange={(e) => onSelectAuthor(e.target.value || null)}
              className="w-full pl-9 pr-8 py-3 rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#0B1E36] text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0A3F7E] dark:focus:ring-[#8EE000] transition-all"
            >
              <option value="">{t('search.allAuthors', 'All Authors')}</option>
              {Object.values(AUTHORS).map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="px-4 py-3 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-[#0B1E36] hover:bg-slate-200 dark:hover:bg-[#122A4A] transition-colors flex items-center justify-center gap-1.5 shrink-0 border border-transparent dark:border-[#1E3656]"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('search.reset', 'Reset')}</span>
            </button>
          )}
        </div>

        {/* Quick Search Suggestions & Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 dark:text-slate-400 font-medium mr-1">{t('search.trending', 'Trending Topics:')}</span>
            {exampleSearches.map((term) => (
              <button
                key={term}
                onClick={() => onSearchChange(term)}
                className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#0B1E36] hover:bg-[#8EE000]/20 hover:text-slate-950 dark:hover:text-white text-slate-600 dark:text-slate-300 transition-colors font-medium text-[11px] border border-transparent dark:border-[#1E3656]"
              >
                &ldquo;{term}&rdquo;
              </button>
            ))}
          </div>

          {/* Result Counter */}
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
            {t('search.showing', 'Showing')}{' '}
            <span className="text-[#0A3F7E] dark:text-[#60A5FA] font-bold">{totalResults}</span>{' '}
            {t('search.insights', 'insights')}
          </div>
        </div>

        {/* Popular Tags Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-400 dark:text-slate-400 font-medium shrink-0">{t('search.tags', 'Tags:')}</span>

          {popularTags.map((tag) => {
            const isSelected = selectedTag?.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                onClick={() => onSelectTag(isSelected ? null : tag)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white font-bold'
                    : 'bg-slate-100 dark:bg-[#0B1E36] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#122A4A] border border-transparent dark:border-[#1E3656]'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
