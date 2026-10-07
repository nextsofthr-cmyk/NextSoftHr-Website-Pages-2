import React, { useState } from 'react';
import { BRAND_INFO } from '../data/academyData';
import { MessageSquare, Phone, X, ArrowRight, Sparkles } from 'lucide-react';

interface FloatingAdvisoryWidgetProps {
  onRegisterClick: () => void;
  onOpenAIAdvisor?: () => void;
  onOpenLiveChat?: () => void;
}

export const FloatingAdvisoryWidget: React.FC<FloatingAdvisoryWidgetProps> = ({
  onRegisterClick,
  onOpenAIAdvisor,
  onOpenLiveChat,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
        {isOpen && (
          <div className="mb-3 bg-white dark:bg-[#0F172A] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 w-72 animate-in fade-in slide-in-from-bottom-2 duration-200 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-[#0F4C81] dark:text-[#84CC16]">NextSoftHR Admissions</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 my-2 leading-relaxed">
              Have questions about course curriculum, corporate training, or certification? Speak with an academic advisor right now.
            </p>

            <div className="space-y-2 pt-1">
              {onOpenLiveChat && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenLiveChat();
                  }}
                  className="w-full py-2 px-3 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#84CC16]" />
                  <span>Start Live Chat with Advisor</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse ml-1" />
                </button>
              )}
              {onOpenAIAdvisor && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAIAdvisor();
                  }}
                  className="w-full py-2 px-3 text-xs font-bold text-[#0F4C81] dark:text-[#84CC16] bg-lime-100 hover:bg-lime-200 dark:bg-lime-950/80 dark:hover:bg-lime-900 border border-lime-300 dark:border-lime-700/80 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16]" />
                  <span>AI Course Advisor (Matcher)</span>
                </button>
              )}

              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 text-xs font-bold text-white bg-[#65A30D] hover:bg-[#528709] rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#0F4C81] dark:text-[#84CC16]" />
                <span>Call {BRAND_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-3.5 rounded-full shadow-lg border-2 border-white dark:border-slate-800 flex items-center gap-2 group transition-all cursor-pointer"
          aria-label="Contact Admissions"
        >
          <MessageSquare className="w-5 h-5 text-[#84CC16]" />
          <span className="text-xs font-bold hidden sm:inline pr-1">Advisory Desk</span>
        </button>
      </div>
    </>
  );
};
