import React from 'react';
import { ShieldCheck, KeyRound, Sliders, Globe, ArrowRight } from 'lucide-react';
import { Translations } from '../translations';

interface TrustSectionProps {
  t: Translations;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ t }) => {
  const icons = [ShieldCheck, KeyRound, Sliders, Globe];

  return (
    <section className="py-14 sm:py-18 bg-white dark:bg-[#070b14] border-t border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-xs font-semibold text-[#0F52BA] dark:text-[#60A5FA] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#84CC16]" />
            <span>{t.trust.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.trust.title}
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.trust.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.trust.cards.map((card, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={index}
                className="group p-6 rounded-xl bg-slate-50/70 dark:bg-[#0c1527] border border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-white dark:hover:bg-[#0e192e] transition-all duration-200 flex flex-col justify-between shadow-2xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#0F52BA] dark:text-[#60A5FA] group-hover:bg-[#0F52BA] group-hover:text-white dark:group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-[#080d19] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-xs text-[#0F52BA] dark:text-[#60A5FA] font-semibold">
                  <span>{t.trust.readyText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
