import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const FreeTrialConfigCard: React.FC = () => {
  const { t } = useLanguage();
  const [trialDays, setTrialDays] = useState<number>(14);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-900 dark:to-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 rounded-2xl p-5 my-6 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-blue-100 dark:border-blue-900/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#84cc16]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.freeTrialTitle}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.freeTrialSubtitle}</p>
          </div>
        </div>

        {/* Dynamic Duration Switcher for business evaluation */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-600 dark:text-slate-400 font-medium">{t.standardDurationLabel}</span>
          <div className="inline-flex rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-0.5">
            {[14, 30].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => setTrialDays(days)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  trialDays === days
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {days} {t.trialDaysLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Key Provisions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
        <div className="bg-white dark:bg-slate-900/90 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#65a30d] dark:text-[#84cc16]" />
            <span>{t.trialEligibilityTitle}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.trialEligibilityDesc}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/90 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#65a30d] dark:text-[#84cc16]" />
            <span>{t.trialScopeTitle}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.trialScopeDesc}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/90 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#65a30d] dark:text-[#84cc16]" />
            <span>{t.trialConversionTitle}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.trialConversionDesc}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/90 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#65a30d] dark:text-[#84cc16]" />
            <span>{t.trialCancellationTitle}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.trialCancellationDesc}
          </p>
        </div>
      </div>
    </div>
  );
};
