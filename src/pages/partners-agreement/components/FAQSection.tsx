import React, { useState } from 'react';
import { FAQS } from '../data/partnerData';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const categories = ['All', 'Program & Eligibility', 'Leads & Protection', 'Commissions & Billing', 'Rights & Governance'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
  });

  return (
    <section id="faq" className="py-20 bg-white dark:bg-[#040E1F] border-b border-slate-200 dark:border-blue-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">
            <span>Knowledge Base</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span>24 Partner Questions Answered</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Everything you need to know about partner classification, lead protection, recurring commission calculations, and operational compliance.
          </p>
        </div>

        {/* Search and Category Filter */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search FAQ questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-[#0A1A30] border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-[#0A1A30] text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#071D3E] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-blue-900/50 border border-transparent dark:border-blue-900/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 24 FAQs Accordion */}
        <div className="mt-8 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400 rounded-xl bg-slate-50 dark:bg-[#071D3E]/50 border border-slate-200 dark:border-blue-900/60 text-xs">
              No matching questions found. Try searching for "commission", "protection", or "cancel".
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all ${
                    isExpanded
                      ? 'border-blue-300 dark:border-blue-500 bg-white dark:bg-[#071D3E] shadow-xs'
                      : 'border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#071D3E]/70 hover:border-slate-300 dark:hover:border-blue-700'
                  }`}
                >
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-3">
                      <HelpCircle className={`w-4 h-4 mt-0.5 shrink-0 ${isExpanded ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400'}`} />
                      <div>
                        <span className="text-xs font-mono text-slate-400 block mb-0.5">
                          {faq.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {faq.question}
                        </h4>
                      </div>
                    </div>
                    <div className="p-1 rounded-lg text-slate-400">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-blue-900/60">
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                        {faq.answer}
                      </p>
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
