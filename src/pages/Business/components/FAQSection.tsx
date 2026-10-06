import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search, Sparkles } from 'lucide-react';
import { FAQ_LIST } from '../data/pricingData';
import { FAQItem } from '../types';

export const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<number[]>([1, 5, 8]); // Default first few open
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleAccordion = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQ_LIST.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 bg-[#F8FAFC] dark:bg-[#070D1E] border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0265DC] dark:text-blue-300 text-xs font-bold mb-3 border border-blue-200/50 dark:border-blue-800/60">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] dark:text-white tracking-tight">
            Common Questions Answered
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Everything you need to know about NextSofthr plans, security, billing, and implementation.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="faq-search-input"
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['All', 'General', 'Pricing', 'Features', 'Security'].map((cat) => (
              <button
                key={cat}
                id={`faq-cat-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0265DC] text-white'
                    : 'bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-[#0B132B] rounded-2xl border border-slate-200 dark:border-slate-800">
              No matching questions found for "{searchQuery}". Try a different search term or contact
              our team.
            </div>
          ) : (
            filteredFaqs.map((faq: FAQItem) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="bg-white dark:bg-[#0B132B] border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors shadow-xs"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                      <span className="text-xs font-mono text-slate-400 dark:text-slate-500 font-normal">
                        {faq.id < 10 ? `0${faq.id}` : faq.id}.
                      </span>
                      <span>{faq.question}</span>
                    </span>
                    <div
                      className={`p-1.5 rounded-lg transition-transform duration-200 shrink-0 ${
                        isOpen ? 'bg-blue-50 dark:bg-blue-950/80 text-[#0265DC] dark:text-blue-300' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-150"
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact info banner if question not answered */}
        <div className="mt-10 p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Have a specific or custom question?</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Our workforce specialists are available via phone (+2349158482622) or email.
            </div>
          </div>
          <a
            href="tel:+2349158482622"
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#0265DC] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800/60 whitespace-nowrap transition-colors"
          >
            Call +2349158482622
          </a>
        </div>
      </div>
    </section>
  );
};
