import React from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Info
} from 'lucide-react';
import { PARTNER_CATEGORIES, PartnerCategoryBadge, CategoryConfig } from './PartnerCategoryBadge';

interface CategoryStandardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string) => void;
  activeCategory?: string;
}

export const CategoryStandardsModal: React.FC<CategoryStandardsModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  activeCategory
}) => {
  if (!isOpen) return null;

  const categoriesList = Object.values(PARTNER_CATEGORIES);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-[#061124] w-full max-w-5xl rounded-2xl md:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto relative flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-[#071938] via-[#0c2b64] to-[#123e8f] text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c8f526]/20 border border-[#c8f526] text-[#c8f526] text-xs font-black uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>OFFICIAL PARTNER CATEGORY ACCREDITATION STANDARDS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Professional Partner Badges & Domain Competencies
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Every partner in the NextSofthr Registry is accredited into specialized professional categories. Each category represents rigorous platform mastery, proven delivery track records, and strict code-of-conduct benchmarks.
          </p>
        </div>

        {/* Categories Grid (Scrollable) */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 bg-slate-50/50 dark:bg-[#061124]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoriesList.map((category: CategoryConfig) => {
              const isSelected = activeCategory === category.name;
              const IconComp = category.icon;

              return (
                <div
                  key={category.id}
                  className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-600 dark:border-[#c8f526] shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white dark:bg-[#0a1c3b] border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 shadow-xs'
                  }`}
                >
                  <div>
                    {/* Top Badge & Icon */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl bg-slate-50 dark:bg-[#061227] border ${category.badgeBorder} ${category.darkBadgeBorder} ${category.iconColor} ${category.darkIconColor}`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                              Category Badge
                            </span>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-[#c8f526]" />
                          </div>
                          <h3 className="text-base font-black text-[#0c2b64] dark:text-white">
                            {category.name}
                          </h3>
                        </div>
                      </div>

                      <PartnerCategoryBadge category={category.name} size="xs" />
                    </div>

                    {/* Tagline */}
                    <p className="text-xs font-semibold text-blue-700 dark:text-[#c8f526] mb-1.5">
                      {category.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {category.description}
                    </p>

                    {/* Core Deliverables */}
                    <div className="mb-4">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5 tracking-wider">
                        Core Certified Deliverables
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {category.coreDeliverables.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#061227] border border-slate-200/80 dark:border-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Filter Action */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      NextSofthr Verified Scope
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCategory(category.name);
                        onClose();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#c8f526] text-[#071938]'
                          : 'bg-blue-900/10 dark:bg-blue-950/70 text-blue-900 dark:text-[#c8f526] hover:bg-blue-900 hover:text-white dark:hover:bg-[#c8f526] dark:hover:text-[#071938]'
                      }`}
                    >
                      <span>{isSelected ? 'Active Filter' : 'Filter by this Category'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a1c3b] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#c8f526]" />
            <span>All badges require certified practitioner status renewed annually.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
