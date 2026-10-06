import React, { useState } from 'react';
import { FAQS, BRAND_INFO } from '../data/academyData';
import { ChevronDown, HelpCircle, Phone, Mail, MessageSquare } from 'lucide-react';

interface FaqSectionProps {
  onOpenLiveChat?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenLiveChat }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-16 bg-slate-50 dark:bg-[#0B1120] border-b border-slate-200/70 dark:border-slate-800 scroll-mt-20 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Clear answers about course formats, certification validity, corporate registration, and student support.
          </p>
        </div>

        {/* 16 Questions Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-50 dark:bg-blue-950 text-[#0F4C81] dark:text-[#84CC16]' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-900/40">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Banner */}
        <div className="mt-10 bg-white dark:bg-[#0F172A] rounded-xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Have a specific training question?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Our academic advising desk is available Monday through Saturday.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {onOpenLiveChat && (
              <button
                type="button"
                onClick={onOpenLiveChat}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0F4C81] dark:text-[#84CC16] bg-lime-100 hover:bg-lime-200 dark:bg-lime-950/80 dark:hover:bg-lime-900 border border-lime-300 dark:border-lime-700/80 rounded-md transition-colors cursor-pointer shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16]" />
                <span>Live Chat</span>
              </button>
            )}
            <a
              href={`tel:${BRAND_INFO.phone}`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#84CC16]" />
              <span>{BRAND_INFO.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Team</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
