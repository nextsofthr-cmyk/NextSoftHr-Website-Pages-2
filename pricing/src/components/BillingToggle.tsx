import React from 'react';
import { BillingCycle, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/pricingData';
import { Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BillingToggleProps {
  billingCycle: BillingCycle;
  onChangeBillingCycle: (cycle: BillingCycle) => void;
  selectedCurrency: CurrencyCode;
  onChangeCurrency: (currency: CurrencyCode) => void;
}

export const BillingToggle: React.FC<BillingToggleProps> = ({
  billingCycle,
  onChangeBillingCycle,
  selectedCurrency,
  onChangeCurrency,
}) => {
  const { t } = useLanguage();

  const popularCurrencies: CurrencyCode[] = ['NGN', 'USD', 'GBP', 'KES', 'ZAR', 'GHS', 'EUR'];
  const pillsToDisplay: CurrencyCode[] = popularCurrencies.includes(selectedCurrency)
    ? popularCurrencies
    : [...popularCurrencies, selectedCurrency];

  return (
    <div
      id="billing-toggle-container"
      className="flex flex-col items-center justify-center pt-2 pb-6 px-4"
    >
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 bg-slate-100/90 dark:bg-[#111C38] p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-inner">
        {/* Toggle Controls */}
        <div className="flex items-center relative bg-white dark:bg-[#0B132B] rounded-xl p-1 shadow-sm border border-slate-200/60 dark:border-slate-700">
          <button
            id="billing-cycle-monthly-btn"
            type="button"
            onClick={() => onChangeBillingCycle('monthly')}
            className={`relative px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
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
            className={`relative px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              billingCycle === 'yearly'
                ? 'text-slate-950 bg-[#A3E635] shadow-sm ring-1 ring-lime-400'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <span>{t.billing.yearly}</span>
            {/* Animated Save 20% Badge */}
            <span
              id="save-discount-badge"
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-all duration-200 ${
                billingCycle === 'yearly'
                  ? 'bg-slate-900 text-[#A3E635] shadow-sm'
                  : 'bg-lime-100 dark:bg-lime-950 text-lime-800 dark:text-[#A3E635]'
              }`}
            >
              {t.billing.yearlySavingsBadge}
            </span>
          </button>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium pl-1 pr-2">
          <span className="hidden sm:inline">{t.billing.currency}:</span>
          {pillsToDisplay.map((curr) => (
            <button
              key={curr}
              id={`currency-pill-${curr.toLowerCase()}`}
              type="button"
              onClick={() => onChangeCurrency(curr)}
              className={`px-2 py-1 rounded-md transition-colors flex items-center gap-1 ${
                selectedCurrency === curr
                  ? 'bg-[#0265DC] text-white font-bold shadow-xs'
                  : 'bg-white dark:bg-[#0B132B] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-transparent dark:border-slate-700'
              }`}
            >
              <span>{curr}</span>
              <span className="text-[10px] opacity-75 font-mono">
                {CURRENCIES[curr]?.symbol}
              </span>
            </button>
          ))}

          {/* Quick Select for all 16 currencies */}
          <div className="relative inline-flex items-center">
            <select
              aria-label="Select from all 16 currencies"
              value={selectedCurrency}
              onChange={(e) => onChangeCurrency(e.target.value as CurrencyCode)}
              className="text-xs bg-white dark:bg-[#0B132B] text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#0265DC] cursor-pointer"
            >
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                <option key={c} value={c}>
                  {CURRENCIES[c].flag} {c} ({CURRENCIES[c].symbol}) - {CURRENCIES[c].name}
                </option>
              ))}
            </select>
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
