import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, ArrowRight, CheckCircle2, RefreshCcw } from 'lucide-react';
import { EnquiryType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  recommendedCategory?: EnquiryType;
}

interface AIAssistantWidgetProps {
  onApplyRecommendation: (category: EnquiryType, note: string) => void;
}

export const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({
  onApplyRecommendation,
}) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: t.aiAssistant.defaultGreeting,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPromptsList: Array<{ id: string; label: string; reply: string; category: EnquiryType }> = [
    {
      id: 'payroll',
      label: t.aiAssistant.prompts.payroll,
      reply: t.faq.items[1]?.a || 'NextSofthr natively calculates localized taxes, pensions, and statutory filings across African countries with one-click processing.',
      category: 'Payroll',
    },
    {
      id: 'remote',
      label: t.aiAssistant.prompts.remoteTeam,
      reply: t.faq.items[4]?.a || 'Our mobile app allows remote staff to check in with verified GPS geofencing and facial biometric confirmation.',
      category: 'Time & Attendance',
    },
    {
      id: 'enterprise',
      label: t.aiAssistant.prompts.enterprise,
      reply: t.faq.items[0]?.a || 'NextSofthr provides multi-subsidiary enterprise consolidation, cross-border multi-currency ledgers, and role-based permissions.',
      category: 'Enterprise Solutions',
    },
    {
      id: 'pricing',
      label: t.aiAssistant.prompts.pricing,
      reply: t.faq.items[6]?.a || 'NextSofthr plans are flexible and transparent based on active employee seat count, designed for both growing businesses and large enterprises.',
      category: 'HR Management',
    },
  ];

  const handleQuickOption = (option: typeof quickPromptsList[0]) => {
    // Add user message
    const userMsg: Message = { sender: 'user', text: option.label };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: option.reply,
          recommendedCategory: option.category,
        },
      ]);
    }, 450);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const query = inputValue.trim();
    setInputValue('');
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = query.toLowerCase();
      let reply = "NextSofthr brings together people, payroll, compliance, and operational workflows into one unified platform.";
      let cat: EnquiryType = 'HR Management';

      if (lower.includes('pay') || lower.includes('salary') || lower.includes('tax') || lower.includes('pension') || lower.includes('paie') || lower.includes('salaire') || lower.includes('impôt') || lower.includes('salário') || lower.includes('nómina')) {
        reply = t.faq.items[1]?.a || "NextSofthr automates localized tax deductions and multi-currency bank disbursements.";
        cat = 'Payroll';
      } else if (lower.includes('attend') || lower.includes('clock') || lower.includes('biometric') || lower.includes('pointage') || lower.includes('ponto') || lower.includes('fichaje')) {
        reply = t.video.feature1Desc || "Our Time & Attendance module supports biometric clock-in and GPS mobile tracking.";
        cat = 'Time & Attendance';
      } else if (lower.includes('leave') || lower.includes('vacation') || lower.includes('congé') || lower.includes('férias') || lower.includes('vacaciones')) {
        reply = "Leave management includes automated entitlements, hierarchical approvals, and team calendar syncs.";
        cat = 'Leave Management';
      } else if (lower.includes('enterprise') || lower.includes('subsidiary') || lower.includes('filiale') || lower.includes('grupo')) {
        reply = t.whyContact.items.enterprise.description;
        cat = 'Enterprise Solutions';
      } else {
        reply = `${query} — NextSofthr specialists can walk you through a tailored setup during a 15-minute consultation.`;
        cat = 'HR Management';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          recommendedCategory: cat,
        },
      ]);
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        sender: 'ai',
        text: t.aiAssistant.defaultGreeting,
      },
    ]);
  };

  return (
    <section id="ai-assistant" className="py-20 bg-[#F7FAFC] dark:bg-[#071322] relative transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1769E0]/10 dark:bg-[#1769E0]/20 text-[#1769E0] dark:text-[#C8F000] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#1769E0] dark:text-[#C8F000]" />
            <span>{t.aiAssistant.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight font-display mb-2">
            {t.aiAssistant.title}
          </h2>
          <p className="text-xl font-bold text-[#1769E0] dark:text-[#C8F000] mb-3">
            {t.aiAssistant.botRole}
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.aiAssistant.subtitle}
          </p>
        </div>

        {/* AI Assistant Chat Frame */}
        <div className="bg-white dark:bg-[#0D1F38] rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden">
          
          {/* Assistant Header */}
          <div className="bg-[#0B1F3A] px-6 py-4 flex items-center justify-between text-white border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1769E0] to-[#C8F000] flex items-center justify-center text-[#0B1F3A] font-bold shadow-md">
                <Bot className="w-5 h-5 text-[#0B1F3A]" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#C8F000] ring-2 ring-[#0B1F3A]"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-white">NextSofthr AI Assistant</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8F000] text-[#0B1F3A] font-bold">
                    {t.aiAssistant.statusOnline}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300">
                  {t.hero.floatingActiveEmployees}
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors"
              title="Reset conversation"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Quick Options Bar (Above messages for instant 1-click discovery) */}
          <div className="p-4 bg-slate-50 dark:bg-[#0A182B] border-b border-slate-200/80 dark:border-white/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              {t.aiAssistant.quickPromptsLabel}
            </div>
            <div className="flex flex-wrap gap-2">
              {quickPromptsList.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleQuickOption(opt)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#0E223D] hover:bg-[#1769E0] hover:text-white text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:border-[#1769E0] shadow-xs transition-colors cursor-pointer"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message Thread */}
          <div className="p-6 max-h-[380px] overflow-y-auto space-y-4 bg-white dark:bg-[#091629]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-lg bg-[#1769E0]/10 dark:bg-[#1769E0]/30 flex items-center justify-center shrink-0 text-[#1769E0] dark:text-[#C8F000]">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-lg rounded-2xl p-4 text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#1769E0] text-white rounded-br-none shadow-sm'
                      : 'bg-[#F7FAFC] dark:bg-[#0E223D] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/10 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>

                  {/* Recommendation Action Button if provided */}
                  {m.recommendedCategory && (
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-xs font-bold text-[#1769E0] dark:text-[#C8F000]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1769E0] dark:text-[#C8F000]" />
                        <span>Suggested: {m.recommendedCategory}</span>
                      </div>

                      <button
                        onClick={() =>
                          onApplyRecommendation(
                            m.recommendedCategory!,
                            `Regarding: ${m.text.slice(0, 100)}...`
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#0B1F3A] bg-[#C8F000] hover:bg-[#bde300] shadow-xs transition-colors cursor-pointer"
                      >
                        <span>{t.aiAssistant.applyAdviceButton}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-[#0B1F3A] flex items-center justify-center shrink-0 text-white">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 pl-11">
                <span className="w-2 h-2 rounded-full bg-[#1769E0] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#1769E0] animate-bounce delay-100"></span>
                <span className="w-2 h-2 rounded-full bg-[#1769E0] animate-bounce delay-200"></span>
                <span>NextSofthr Assistant...</span>
              </div>
            )}
          </div>

          {/* Assistant Input Bar */}
          <form
            onSubmit={handleCustomSend}
            className="p-4 bg-slate-50 dark:bg-[#0A182B] border-t border-slate-200 dark:border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.aiAssistant.inputPlaceholder}
              className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-[#081729] border border-slate-200 dark:border-white/10 text-sm text-[#0B1F3A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#1769E0] focus:ring-2 focus:ring-[#C8F000]/40"
            />
            <button
              type="submit"
              className="p-3 rounded-xl bg-[#1769E0] hover:bg-[#0B1F3A] text-white transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};

