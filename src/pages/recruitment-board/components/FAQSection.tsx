import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { FaqItem } from '../types';

interface FaqSectionProps {
  faqs: FaqItem[];
  onActionClick: (target: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  faqs,
  onActionClick
}) => {
  const [openIds, setOpenIds] = useState<string[]>([faqs[0]?.id || 'faq-1', faqs[2]?.id || 'faq-3']);

  const toggleFaq = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 bg-[#F8FAFC] dark:bg-[#090D16] border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-lime-400">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Everything you need to know about navigating the NextSoftHR recruitment marketplace, employer accounts, agency partnerships, and HRMS integrations.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all duration-300 shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-[#131D31] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#142B4A] dark:text-white flex items-center gap-3">
                    <span className="text-xs font-mono text-[#2563EB] dark:text-lime-400 font-bold">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span>{faq.question}</span>
                  </span>

                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#2563EB] dark:text-lime-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#090D16]/50 space-y-3">
                    <p>{faq.answer}</p>
                    
                    {faq.actionLabel && faq.actionTarget && (
                      <div className="pt-1">
                        <button
                          onClick={() => onActionClick(faq.actionTarget!)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] dark:text-blue-400 hover:text-[#1D4ED8] dark:hover:text-blue-300 transition-colors cursor-pointer"
                        >
                          <span>{faq.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
