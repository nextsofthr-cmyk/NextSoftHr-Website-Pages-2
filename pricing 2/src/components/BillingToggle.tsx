import React from 'react';
import { BillingCycle, CurrencyCode } from '../types';
import { Sparkles, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BillingToggleProps {
  billingCycle: BillingCycle;
  onChangeBillingCycle: (cycle: BillingCycle) => void;
  selectedCurrency: CurrencyCode;
  onChangeCurrency: (currency: CurrencyCode) => void;
  headcount?: number;
  onChangeHeadcount?: (count: number) => void;
}

export const BillingToggle: React.FC<BillingToggleProps> = ({
  billingCycle,
  onChangeBillingCycle,
  headcount = 25,
  onChangeHeadcount,
}) => {
  const { t, tx } = useLanguage();

  const headcountPresets = [10, 25, 50, 100, 250, 500];

  return (
    <div
      id="billing-toggle-container"
      className="flex flex-col items-center justify-center pt-2 pb-6 px-4 w-full"
    >
      <div className="w-full max-w-6xl bg-slate-100/90 dark:bg-[#111C38] p-4 sm:p-5 lg:px-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-inner flex flex-col gap-3.5">
        {/* Row 1: Billing Cycle Toggle (Centered, No wrapping) */}
        <div className="flex items-center justify-center pb-3 border-b border-slate-200/70 dark:border-slate-800">
          <div className="inline-flex items-center relative bg-white dark:bg-[#0B132B] rounded-xl p-1 shadow-sm border border-slate-200/60 dark:border-slate-700 whitespace-nowrap">
            <button
              id="billing-cycle-monthly-btn"
              type="button"
              onClick={() => onChangeBillingCycle('monthly')}
              className={`relative px-5 sm:px-7 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                billingCycle === 'monthly'
                  ? 'text-white bg-[#0265DC] shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {t.billing.monthly}
            </button>

            <button
              id="billing-cycle-yearly-btn"
              type="button"
              onClick={() => onChangeBillingCycle('yearly')}
              className={`relative px-5 sm:px-7 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                billingCycle === 'yearly'
                  ? 'text-slate-950 bg-[#A3E635] shadow-sm ring-1 ring-lime-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{t.billing.yearly}</span>
              {/* Animated Save 20% Badge */}
              <span
                id="save-discount-badge"
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                  billingCycle === 'yearly'
                    ? 'bg-slate-900 text-[#A3E635] shadow-sm'
                    : 'bg-lime-100 dark:bg-lime-950 text-lime-800 dark:text-[#A3E635]'
                }`}
              >
                {t.billing.yearlySavingsBadge}
              </span>
            </button>
          </div>
        </div>

        {/* Row 2: Employee Headcount Interactive Calculator (Single Straight Line, No Wrapping) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-[#0265DC] dark:text-blue-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <div className="text-left">
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">
                {tx('Calculate for Your Headcount:')}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {tx('Preview total monthly investment for your team size')}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center flex-nowrap gap-1.5 sm:gap-2 overflow-x-auto max-w-full shrink-0 py-0.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mr-1 hidden sm:inline whitespace-nowrap shrink-0">
              {tx('Presets:')}
            </span>
            {headcountPresets.map((preset) => (
              <button
                key={preset}
                id={`headcount-preset-${preset}`}
                type="button"
                onClick={() => onChangeHeadcount?.(preset)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  headcount === preset
                    ? 'bg-[#0265DC] text-white shadow-xs'
                    : 'bg-white dark:bg-[#0B132B] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {preset} {tx('staff')}
              </button>
            ))}

            <div className="flex items-center gap-1.5 pl-1.5 sm:pl-2 shrink-0 whitespace-nowrap">
              <input
                id="headcount-input-number"
                type="number"
                min={1}
                max={50000}
                value={headcount}
                onChange={(e) => onChangeHeadcount?.(Math.max(1, parseInt(e.target.value) || 1))}
                aria-label="Staff headcount"
                className="w-16 sm:w-18 px-2 py-1 text-xs font-black text-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
              />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                {tx('employees')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400" />
        <span>{t.billing.switchNote}</span>
      </p>
    </div>
  );
};
