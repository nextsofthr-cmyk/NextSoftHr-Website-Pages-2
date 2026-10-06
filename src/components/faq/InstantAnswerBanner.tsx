import React from 'react';
import { Sparkles, ArrowRight, Bot, Zap, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface InstantAnswerBannerProps {
  onOpenAI: () => void;
}

export const InstantAnswerBanner: React.FC<InstantAnswerBannerProps> = ({ onOpenAI }) => {
  const { t } = useLanguage();

  return (
    <section className="py-8 bg-[#F8FAFC] dark:bg-[#080E1E] transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 dark:from-[#0B1528] dark:via-[#081226] dark:to-[#0B1528] text-white p-6 sm:p-8 border border-blue-900/60 dark:border-blue-800/60 shadow-lg">
          
          {/* Subtle Lemon Green & Blue Light Accents */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-lime-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-lime-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
                    {t('instant.badge', 'NextSoftHR Intelligence')}
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-lime-400" />
                  <span className="text-[11px] text-slate-300">{t('instant.copilot', 'Instant Copilot')}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {t('instant.title', 'Need an Instant Answer?')}
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                  {t('instant.desc', 'Ask the NextSoftHR AI Assistant about HR, payroll, attendance, leave, employee management and more.')}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex sm:self-center">
              <button
                onClick={onOpenAI}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-slate-950 bg-lime-400 hover:bg-lime-300 rounded-xl transition-all shadow-md group"
              >
                <Bot className="w-4 h-4 text-slate-900" />
                <span>{t('instant.btn', 'Ask NextSoftHR AI')}</span>
                <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
