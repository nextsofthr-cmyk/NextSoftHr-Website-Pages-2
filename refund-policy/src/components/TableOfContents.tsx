import React from 'react';
import { Search, Printer, ChevronRight, X } from 'lucide-react';
import { POLICY_SECTIONS } from '../data/policyData';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface TableOfContentsProps {
  activeSectionId: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onPrintPolicy: () => void;
  currentLang?: SupportedLanguage;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  activeSectionId,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onPrintPolicy,
  currentLang = 'en',
}) => {
  const t = TRANSLATIONS[currentLang];
  const categories = ['All', 'Overview', 'Customers', 'Partners & Channel', 'Commercial & Legal'];

  const categoryLabels: Record<string, string> = {
    All: t.tableOfContents.all,
    Overview: currentLang === 'fr' ? 'Aperçu' : currentLang === 'pt' ? 'Visão Geral' : currentLang === 'es' ? 'Descripción' : 'Overview',
    Customers: currentLang === 'fr' ? 'Clients' : currentLang === 'pt' ? 'Clientes' : currentLang === 'es' ? 'Clientes' : 'Customers',
    'Partners & Channel': currentLang === 'fr' ? 'Partenaires & Canaux' : currentLang === 'pt' ? 'Parceiros e Canal' : currentLang === 'es' ? 'Socios y Canal' : 'Partners & Channel',
    'Commercial & Legal': currentLang === 'fr' ? 'Commercial & Juridique' : currentLang === 'pt' ? 'Comercial e Jurídico' : currentLang === 'es' ? 'Comercial y Legal' : 'Commercial & Legal',
  };

  const filteredSections = POLICY_SECTIONS.filter((sec) => {
    const matchesCategory = selectedCategory === 'All' || sec.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.content.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <aside className="w-full bg-white dark:bg-[#131D31] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors duration-200 max-h-[calc(100vh-8.5rem)] flex flex-col">
      {/* Search Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="policy-search" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t.tableOfContents.searchTitle}
          </label>
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              <span>{t.tableOfContents.clear}</span>
            </button>
          )}
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            id="policy-search"
            type="text"
            placeholder={t.tableOfContents.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8] focus:bg-white dark:focus:bg-[#0F172A] transition-all"
          />
        </div>
      </div>

      {/* Category Filter Segments */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          {t.tableOfContents.filterScope}
        </div>
        <div className="flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-[#0F172A] rounded-xl border border-transparent dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-[#1E293B] text-[#0A3B7B] dark:text-[#38BDF8] shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Clause Directory */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 shrink-0">
          <span>{t.tableOfContents.tableTitle}</span>
          <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">
            {filteredSections.length} {t.tableOfContents.of} 25
          </span>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-1">
          {filteredSections.length === 0 ? (
            <div className="p-3 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#0F172A] rounded-lg border border-transparent dark:border-slate-800">
              {t.tableOfContents.noClausesMatch}
            </div>
          ) : (
            filteredSections.map((sec) => {
              const isActive = activeSectionId === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className={`group flex items-start gap-2.5 p-2 rounded-lg text-xs transition-colors ${
                    isActive
                      ? 'bg-[#0A3B7B]/10 dark:bg-[#38BDF8]/15 text-[#0A3B7B] dark:text-[#38BDF8] font-bold border-l-2 border-[#0A3B7B] dark:border-[#38BDF8]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] shrink-0 tabular-nums ${
                      isActive ? 'text-[#0A3B7B] dark:text-[#38BDF8] font-bold' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {sec.number < 10 ? `0${sec.number}` : sec.number}
                  </span>
                  <span className="line-clamp-1 leading-snug group-hover:underline">
                    {sec.title}
                  </span>
                </a>
              );
            })
          )}
        </div>
      </div>

      {/* Quick Jump Bottom Links */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
        <a
          href="#faq-section"
          className="flex items-center justify-between p-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0A3B7B] dark:hover:text-[#38BDF8] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span>{t.tableOfContents.frequentlyAsked}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
        </a>

        <a
          href="#contact-desk"
          className="flex items-center justify-between p-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0A3B7B] dark:hover:text-[#38BDF8] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span>{t.tableOfContents.directContact}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
        </a>
      </div>

      {/* Print / Save Action */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={onPrintPolicy}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#0A3B7B] dark:hover:text-white bg-slate-50 dark:bg-[#0F172A] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
        >
          <Printer className="w-3.5 h-3.5 text-[#84CC16]" />
          <span>{t.tableOfContents.printExport}</span>
        </button>
      </div>
    </aside>
  );
};
