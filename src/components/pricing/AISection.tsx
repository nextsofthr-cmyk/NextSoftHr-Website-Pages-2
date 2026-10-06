import React, { useState } from 'react';
import { Sparkles, Bot, Send, ArrowRight, CheckCircle2, FileDown, Clock, Zap } from 'lucide-react';
import { AI_ASSISTANT_EXAMPLES } from '../data/pricingData';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

export const AISection: React.FC = () => {
  const { t, language } = useLanguage();
  const { formatAmount, selectedCurrency, currencyConfig } = useCurrency();
  const [activeQuestionId, setActiveQuestionId] = useState<string>('payroll-summary');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const activeExample =
    AI_ASSISTANT_EXAMPLES.find((ex) => ex.id === activeQuestionId) || AI_ASSISTANT_EXAMPLES[0];

  const handleSelectQuestion = (id: string) => {
    if (id === activeQuestionId) return;
    setIsTyping(true);
    setActiveQuestionId(id);
    setTimeout(() => {
      setIsTyping(false);
    }, 300);
  };

  // Dynamically format financial stats if the question pertains to payroll or overtime
  const formatStatValue = (exId: string, statIndex: number, originalValue: string) => {
    if (exId === 'payroll-summary') {
      if (statIndex === 0) return formatAmount(84250);
      if (statIndex === 1) return formatAmount(16850);
      if (statIndex === 2) return formatAmount(67400);
    }
    return originalValue;
  };

  const formatStatSub = (exId: string, statIndex: number, originalSub: string) => {
    if (exId === 'overtime-dept') {
      const calcPayText =
        language === 'fr'
          ? 'rémunération calculée'
          : language === 'pt'
          ? 'remuneração calculada'
          : language === 'es'
          ? 'pago calculado'
          : 'calculated pay';
      if (statIndex === 0) return `${formatAmount(3560)} ${calcPayText}`;
      if (statIndex === 1) return `${formatAmount(1200)} ${calcPayText}`;
      if (statIndex === 2) return `${formatAmount(812)} ${calcPayText}`;
    }
    return originalSub;
  };

  return (
    <section
      id="ai-section"
      className="py-20 bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#0B132B] dark:via-[#070D1E] dark:to-[#0B132B] border-t border-slate-100 dark:border-slate-800 relative overflow-hidden transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-100 dark:bg-lime-950/60 text-slate-950 dark:text-[#A3E635] text-xs font-extrabold mb-3 border border-[#A3E635]">
            <Sparkles className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#A3E635]" />
            <span>{t.aiSection.badge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] dark:text-white tracking-tight">
            {t.aiSection.title}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.aiSection.subtitle}
          </p>
        </div>

        {/* Interactive Assistant Interface Mockup */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#0E1730] border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xl shadow-blue-500/5 p-6 sm:p-8 transition-colors">
          {/* Assistant Header */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0265DC] to-[#004DB3] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">NextGen Copilot</h3>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#A3E635] text-slate-950">
                    {t.aiSection.copilotActive}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  HR, Payroll, Tax &amp; Attendance Intelligence • {selectedCurrency} ({currencyConfig.symbol})
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.aiSection.systemSync}</span>
            </div>
          </div>

          {/* Example Question Chips */}
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2.5">
              {t.aiSection.tryPrompt}
            </div>
            <div className="flex flex-wrap gap-2">
              {AI_ASSISTANT_EXAMPLES.map((item) => (
                <button
                  key={item.id}
                  id={`ai-prompt-${item.id}`}
                  onClick={() => handleSelectQuestion(item.id)}
                  className={`text-xs px-3 py-2 rounded-xl border transition-all duration-150 text-left ${
                    activeQuestionId === item.id
                      ? 'bg-blue-50/90 dark:bg-blue-950/70 border-[#0265DC] dark:border-blue-500 text-[#0265DC] dark:text-blue-300 font-bold shadow-xs'
                      : 'bg-slate-50 dark:bg-[#162447] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  "{item.question}"
                </button>
              ))}
            </div>
          </div>

          {/* Conversational Cards */}
          <div className="space-y-4">
            {/* User Query Bubble */}
            <div className="flex items-start justify-end gap-2.5">
              <div className="bg-[#0265DC] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-sm font-medium shadow-sm max-w-md">
                {activeExample.question}
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center text-xs font-bold text-[#0265DC] dark:text-blue-300">
                HR
              </div>
            </div>

            {/* AI Response Card */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0265DC] to-[#A3E635] flex items-center justify-center text-white shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>

              <div className="flex-1 bg-[#F8FAFC] dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-2xl rounded-tl-xs p-5 shadow-xs transition-colors">
                {isTyping ? (
                  <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                    <span className="w-2 h-2 rounded-full bg-[#0265DC] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#0265DC] animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-bounce [animation-delay:300ms]" />
                    <span className="ml-1">Analyzing workforce records...</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold text-[#0265DC] dark:text-blue-300 uppercase tracking-wider">
                        {activeExample.badge}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">Response time: 0.18s</span>
                    </div>

                    <h4 className="font-display text-base font-bold text-slate-900 dark:text-white mb-3">
                      {activeExample.responseHeadline}
                    </h4>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      {activeExample.stats.map((stat, i) => (
                        <div key={i} className="p-3 bg-white dark:bg-[#162447] rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
                          <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
                          <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white font-display mt-0.5">
                            {formatStatValue(activeExample.id, i, stat.value)}
                          </div>
                          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                            {formatStatSub(activeExample.id, i, stat.sub)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {activeExample.id === 'payroll-summary'
                        ? `Automated payroll calculations completed for 142 employees in ${selectedCurrency} (${currencyConfig.symbol}). Statutory payroll deductions and direct bank transfer batch files are formatted and ready for your review.`
                        : activeExample.explanation}
                    </p>

                    {/* Action pill / trigger */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-slate-800 flex-wrap gap-2">
                      <button
                        onClick={() => alert(`Triggered: ${activeExample.actionPill}`)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] px-3.5 py-2 rounded-lg transition-colors shadow-xs"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{activeExample.actionPill}</span>
                      </button>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">Audit logged &amp; verified</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

