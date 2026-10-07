import React, { useState } from 'react';
import { FAQ_LIST } from '../data/partnerData';
import { ChevronDown, HelpCircle, Phone, ArrowRight, MessageSquare } from 'lucide-react';

interface FaqSectionProps {
  onContactClick: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onContactClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-[#051329] border-t border-slate-200 dark:border-blue-900/60 relative transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/80 border border-blue-200 dark:border-blue-700/60 text-xs font-bold text-blue-800 dark:text-[#B8F010] mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Everything You Need to Know
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Got questions regarding commission rates, partner enablement, or international payouts? Find quick answers below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-14">
          {FAQ_LIST.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
                  isOpen
                    ? 'bg-blue-50/60 dark:bg-[#071D3E] border-blue-400 dark:border-[#B8F010]/80 shadow-md'
                    : 'bg-slate-50 dark:bg-[#071D3E]/70 border-slate-200 dark:border-blue-800/80 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-blue-800 dark:text-[#B8F010] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                      0{index + 1}
                    </span>
                    {faq.question}
                  </span>

                  <div className={`w-8 h-8 rounded-full bg-white dark:bg-blue-950 flex items-center justify-center shrink-0 border border-slate-200 dark:border-blue-700 transition-transform duration-200 shadow-xs ${
                    isOpen ? 'rotate-180 border-blue-500 dark:border-[#B8F010] text-blue-600 dark:text-[#B8F010]' : 'text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-slate-200 dark:border-blue-900/60 animate-in fade-in duration-150">
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Help Strip */}
        <div className="rounded-2xl bg-slate-100 dark:bg-[#030914] border border-slate-200 dark:border-blue-700/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm dark:shadow-xl transition-colors">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Have a specific question about your partner structure?</h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Our partnership desk is available via phone or direct WhatsApp briefing.</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+2349158482622"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-blue-950 hover:bg-slate-50 dark:hover:bg-blue-900 border border-slate-300 dark:border-blue-700 text-xs font-bold text-slate-800 dark:text-white transition-all shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-[#B8F010]" />
              <span>+234 915 848 2622</span>
            </a>

            <button
              onClick={onContactClick}
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-[#B8F010] text-[#040E1F] text-xs font-extrabold hover:bg-[#CBFF1A] transition-all shadow"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Partner Desk</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
