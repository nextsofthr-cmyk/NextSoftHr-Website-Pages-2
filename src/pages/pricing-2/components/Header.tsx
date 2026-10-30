import React, { useState } from 'react';
import { GlobalHeader } from '../../../components/GlobalHeader';
import { CurrencyCode } from '../types';
import { Sparkles, Globe, ShoppingCart } from 'lucide-react';
import { CurrencyPickerModal } from './CurrencyPickerModal';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenTrial?: (planName?: string) => void;
  onOpenDemo?: () => void;
  selectedCurrency: CurrencyCode;
  onSelectCurrency: (currency: CurrencyCode) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onOpenCheckout?: () => void;
  cartItemCount?: number;
  onOpenQuickStart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTrial,
  onOpenDemo,
  selectedCurrency,
  onSelectCurrency,
  onOpenCheckout,
  cartItemCount = 0,
  onOpenQuickStart,
}) => {
  const { tx } = useLanguage();
  const [worldCurrencyModalOpen, setWorldCurrencyModalOpen] = useState(false);

  return (
    <>
      <GlobalHeader
        onOpenDemo={onOpenDemo}
        onOpenGetStarted={() => onOpenTrial?.()}
        onOpenTrial={() => onOpenTrial?.()}
      />

      {/* Pricing 2 Quick Tools Bar */}
      <div className="bg-slate-50/90 dark:bg-[#0B132B]/90 border-b border-slate-200/80 dark:border-slate-800 py-2 notranslate" translate="no">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium">
            <a href="#pricing-plans" className="hover:text-[#0265DC] dark:hover:text-lime-400 transition-colors font-semibold">
              {tx('Plans & PPP')}
            </a>
            <span>•</span>
            <a href="#pricing-calculator" className="hover:text-[#0265DC] dark:hover:text-lime-400 transition-colors">
              {tx('ROI Calculator')}
            </a>
            <span>•</span>
            <a href="#compare-features" className="hover:text-[#0265DC] dark:hover:text-lime-400 transition-colors">
              {tx('Compare Features')}
            </a>
            <span>•</span>
            <a href="#faq" className="hover:text-[#0265DC] dark:hover:text-lime-400 transition-colors">
              {tx('FAQ')}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setWorldCurrencyModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400" />
              <span>{tx('160+ World Currencies ({code})', { code: selectedCurrency })}</span>
            </button>

            {onOpenQuickStart && (
              <button
                type="button"
                onClick={onOpenQuickStart}
                className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#0265DC] dark:text-blue-300 border border-blue-200/70 dark:border-blue-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#A3E635]" />
                <span>{tx('Quick Start Setup')}</span>
              </button>
            )}

            {onOpenCheckout && (
              <button
                type="button"
                onClick={onOpenCheckout}
                className="px-2.5 py-1 rounded-lg bg-[#0265DC] hover:bg-[#004DB3] text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>{tx('Checkout ({count})', { count: cartItemCount })}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <CurrencyPickerModal
        isOpen={worldCurrencyModalOpen}
        onClose={() => setWorldCurrencyModalOpen(false)}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={(code) => {
          onSelectCurrency(code);
          setWorldCurrencyModalOpen(false);
        }}
      />
    </>
  );
};
