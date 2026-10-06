import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowRight, MessageSquare } from 'lucide-react';
import { BRAND } from '../data/content';
import { useLanguage } from '../context/LanguageContext';

interface FAQSectionProps {
  onAskQuestion: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onAskQuestion }) => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-[#081528] relative border-t border-slate-200/80 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1769E0]/10 dark:bg-[#1769E0]/20 text-[#1769E0] dark:text-[#C8F000] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faq.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight font-display mb-4">
            {t.faq.title}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {t.faq.items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#1769E0] bg-[#F7FAFC] dark:bg-[#0E223D] dark:border-[#1769E0] shadow-sm'
                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A182B] hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-extrabold text-base sm:text-lg text-[#0B1F3A] dark:text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#1769E0] text-white rotate-180'
                        : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/40 dark:border-white/10">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#0B1F3A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1769E0] flex items-center justify-center text-[#C8F000] shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-white">
                {t.faq.moreQuestionsTitle}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                {t.faq.moreQuestionsDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8F000]" />
              <span>{BRAND.phone}</span>
            </a>
            <button
              onClick={onAskQuestion}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#0B1F3A] bg-[#C8F000] hover:bg-[#bde300] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{t.faq.contactSupportBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
