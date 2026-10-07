import React from 'react';
import { Search, RotateCcw, Filter, Check, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/academyData';

interface CourseSearchSectionProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedSkillLevel: string;
  onSkillLevelChange: (level: string) => void;
  selectedFormat: string;
  onFormatChange: (fmt: string) => void;
  selectedCertification: boolean | null;
  onCertificationChange: (cert: boolean | null) => void;
  totalFilteredCount: number;
  onResetFilters: () => void;
  onOpenAIAdvisor?: () => void;
}

export const CourseSearchSection: React.FC<CourseSearchSectionProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSkillLevel,
  onSkillLevelChange,
  selectedFormat,
  onFormatChange,
  selectedCertification,
  onCertificationChange,
  totalFilteredCount,
  onResetFilters,
  onOpenAIAdvisor,
}) => {
  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== 'All' ||
    selectedSkillLevel !== 'All' ||
    selectedFormat !== 'All' ||
    selectedCertification !== null;

  return (
    <section id="courses-section" className="pt-16 pb-8 bg-slate-50 dark:bg-[#0B1120] border-b border-slate-200/60 dark:border-slate-800 scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Course Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Find the Right Training for Your Career
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Browse our comprehensive curriculum in human resources, payroll operations, labor compliance, and workforce intelligence.
          </p>
        </div>

        {/* Search & Filter SaaS Box */}
        <div className="bg-white dark:bg-[#0F172A] rounded-xl shadow-xs border border-slate-200 dark:border-slate-800 p-4 sm:p-6 mb-8 transition-colors">
          {/* Main Search Input */}
          <div className="relative mb-5">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search courses, skills or topics... (e.g. Payroll, Compliance, OKRs, AI)"
              className="w-full pl-11 pr-4 py-3 bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0F4C81] dark:focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
              >
                <option value="All">All Categories (8)</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name} ({cat.courseCount})
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Level Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Skill Level
              </label>
              <select
                value={selectedSkillLevel}
                onChange={(e) => onSkillLevelChange(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
              >
                <option value="All">All Skill Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Training Format Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Training Format
              </label>
              <select
                value={selectedFormat}
                onChange={(e) => onFormatChange(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
              >
                <option value="All">All Formats</option>
                <option value="Self-Paced">Self-Paced Learning</option>
                <option value="Live Instructor-Led">Live Instructor-Led</option>
                <option value="Corporate">Corporate Training</option>
                <option value="On-Site">On-Site Training</option>
              </select>
            </div>

            {/* Certification Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Certification
              </label>
              <select
                value={selectedCertification === null ? 'All' : selectedCertification ? 'Certified' : 'All'}
                onChange={(e) => {
                  if (e.target.value === 'All') onCertificationChange(null);
                  else if (e.target.value === 'Certified') onCertificationChange(true);
                }}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
              >
                <option value="All">All Courses</option>
                <option value="Certified">Verified Certificate Included</option>
              </select>
            </div>
          </div>

          {/* Action Row & Active Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <Filter className="w-3.5 h-3.5 text-[#0F4C81] dark:text-[#84CC16]" />
              <span>
                Showing <strong className="text-slate-900 dark:text-white font-bold">{totalFilteredCount}</strong> training courses
              </span>
              {hasActiveFilters && (
                <span className="text-[#65A30D] dark:text-[#84CC16] font-semibold">· Filters active</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  onClick={onResetFilters}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear Filters</span>
                </button>
              )}

              {onOpenAIAdvisor && (
                <button
                  type="button"
                  onClick={onOpenAIAdvisor}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#0F4C81] dark:text-[#84CC16] bg-lime-100 hover:bg-lime-200 dark:bg-lime-950/80 dark:hover:bg-lime-900 border border-lime-300 dark:border-lime-700/80 rounded-md transition-all cursor-pointer shadow-2xs group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16] group-hover:rotate-12 transition-transform" />
                  <span>AI Course Matcher</span>
                </button>
              )}

              <button
                onClick={() => {
                  const el = document.getElementById('popular-courses-container');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors cursor-pointer"
              >
                Search Courses
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
