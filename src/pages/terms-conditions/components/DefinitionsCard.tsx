import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Copy, Check, BookOpen } from 'lucide-react';
import { DefinitionItem } from '../data/termsData';
import { useLanguage } from '../i18n/LanguageContext';

interface DefinitionsCardProps {
  definitions: DefinitionItem[];
}

export const DefinitionsCard: React.FC<DefinitionsCardProps> = ({ definitions }) => {
  const { t } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);
  const [collapsedTerms, setCollapsedTerms] = useState<Record<string, boolean>>({});

  // Collect distinct categories from the localized definitions
  const categories = useMemo(() => {
    const cats = Array.from(new Set(definitions.map((d) => d.category).filter(Boolean))) as string[];
    return ['ALL', ...cats];
  }, [definitions]);

  const filtered = definitions.filter((item) => {
    if (filterCategory === 'ALL') return true;
    return item.category === filterCategory;
  });

  const toggleTerm = (term: string) => {
    setCollapsedTerms((prev) => ({
      ...prev,
      [term]: !prev[term]
    }));
  };

  const handleCopy = (term: string, text: string) => {
    navigator.clipboard.writeText(`"${term}": ${text}`);
    setCopiedTerm(term);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  return (
    <div className="bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 my-6 transition-colors">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100/70 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.definitionsGlossaryTitle}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.definitionsGlossarySubtitle}</p>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat === 'ALL' ? t.categoryAll : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Definition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
        {filtered.map((item) => {
          const isCollapsed = collapsedTerms[item.term] ?? false;

          return (
            <div
              key={item.term}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs hover:border-blue-200 dark:hover:border-blue-700 transition-all group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    &ldquo;{item.term}&rdquo;
                  </span>
                  {item.category && (
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleCopy(item.term, item.definition)}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition-colors"
                    title="Copy definition"
                    aria-label={`Copy definition for ${item.term}`}
                  >
                    {copiedTerm === item.term ? (
                      <Check className="w-3.5 h-3.5 text-[#65a30d] dark:text-[#84cc16]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleTerm(item.term)}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition-colors"
                    aria-label={isCollapsed ? 'Expand' : 'Collapse'}
                  >
                    {isCollapsed ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronUp className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {!isCollapsed && (
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {item.definition}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
