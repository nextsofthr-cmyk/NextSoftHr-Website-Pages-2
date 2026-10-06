import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { FAQ_ITEMS } from '../data/policyData';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface FaqSectionProps {
  currentLang?: SupportedLanguage;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ currentLang = 'en' }) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2', 'faq-3', 'faq-5']);
  const [faqSearch, setFaqSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Customers' | 'Billing' | 'Partners' | 'Services'>('All');
  const t = TRANSLATIONS[currentLang];

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(FAQ_ITEMS.map((f) => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  const categoryLabels: Record<string, string> = {
    All: t.faq.allQuestions,
    Customers: currentLang === 'fr' ? 'Clients' : currentLang === 'pt' ? 'Clientes' : currentLang === 'es' ? 'Clientes' : 'Customers',
    Billing: currentLang === 'fr' ? 'Facturation' : currentLang === 'pt' ? 'Faturação' : currentLang === 'es' ? 'Facturación' : 'Billing',
    Partners: currentLang === 'fr' ? 'Partenaires' : currentLang === 'pt' ? 'Parceiros' : currentLang === 'es' ? 'Socios' : 'Partners',
    Services: currentLang === 'fr' ? 'Services' : currentLang === 'pt' ? 'Serviços' : currentLang === 'es' ? 'Servicios' : 'Services',
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedFilter === 'All' || item.category === selectedFilter;
    const matchesSearch =
      faqSearch.trim() === '' ||
      item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq-section" className="scroll-mt-24 pt-12 pb-16 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0A3B7B] dark:text-[#38BDF8] uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4 text-[#84CC16]" />
            <span>{t.faq.kicker}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A3B7B] dark:text-white tracking-tight">
            {t.faq.title}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-white dark:bg-[#131D31] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6 shadow-xs space-y-3 transition-colors">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder={t.faq.searchPlaceholder}
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8]"
              />
            </div>

            {/* Expand / Collapse All */}
            <div className="flex items-center justify-end gap-2 text-xs font-semibold text-[#0A3B7B] dark:text-[#38BDF8]">
              <button
                type="button"
                onClick={expandAll}
                className="px-2.5 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              >
                {t.faq.expandAll}
              </button>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <button
                type="button"
                onClick={collapseAll}
                className="px-2.5 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              >
                {t.faq.collapseAll}
              </button>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
            {(['All', 'Customers', 'Billing', 'Partners', 'Services'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedFilter === cat
                    ? 'bg-[#0A3B7B] dark:bg-[#1E40AF] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#0F172A] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#131D31] rounded-2xl border border-slate-200 dark:border-slate-800">
              {t.faq.noResults}
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs transition-colors hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3B7B] dark:focus-visible:ring-[#38BDF8]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 mt-0.5 tabular-nums">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      <div>
                        <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                          {faq.question}
                        </span>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          <span>{categoryLabels[faq.category] || faq.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{t.faq.verifiedStandard}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0A3B7B] dark:text-[#38BDF8]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0F172A]/70">
                      <p className="pl-7">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
