import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowRight, Search } from 'lucide-react';
import { FAQ_ITEMS } from '../data/servicesData';

interface FAQSectionProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenDemo, onOpenGetStarted }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]); // First two opened by default
  const [faqSearch, setFaqSearch] = useState<string>('');

  const toggleAccordion = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 bg-slate-50 dark:bg-[#07182E] border-t border-slate-200/80 dark:border-blue-900/60 relative transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 dark:bg-blue-950/80 text-[#0256C4] dark:text-[#84CC16] text-xs font-extrabold uppercase tracking-widest border border-blue-200 dark:border-blue-800 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#0256C4] dark:text-[#84CC16]" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Got questions about onboarding, local African compliance, biometric integrations, or pricing? Find clear
            answers below.
          </p>

          {/* Quick Search */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#0A2540] border border-slate-200 dark:border-blue-800 focus:outline-none focus:ring-2 focus:ring-[#0256C4] dark:focus:ring-[#84CC16] text-slate-800 dark:text-white placeholder-slate-400 shadow-xs"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);

            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0A2540] rounded-2xl border border-slate-200/80 dark:border-blue-900/60 overflow-hidden transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-500"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#0A2540] dark:text-white hover:text-[#0256C4] dark:hover:text-[#84CC16] transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-blue-50 dark:bg-blue-900/60 text-[#0256C4] dark:text-[#84CC16] rotate-180'
                        : 'bg-slate-100 dark:bg-[#0D2644] text-slate-500 dark:text-slate-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-blue-900/40 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 bg-white dark:bg-[#0A2540] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-blue-900/60 text-center shadow-xs">
          <h3 className="text-lg font-bold text-[#0A2540] dark:text-white">Still have questions about your organization&apos;s setup?</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-1 max-w-lg mx-auto">
            Our African HR specialists and solutions engineers are available to review your existing payroll rules,
            leave policies, and tech stack.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+2349158482622"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0D2644] hover:bg-slate-200 dark:hover:bg-blue-900 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#84CC16]" />
              <span>Call Us: +234 915 848 2622</span>
            </a>
            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0256C4] hover:bg-[#024bb0] text-white text-xs sm:text-sm font-bold transition-colors shadow-sm cursor-pointer"
            >
              <span>Schedule Advisor Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
