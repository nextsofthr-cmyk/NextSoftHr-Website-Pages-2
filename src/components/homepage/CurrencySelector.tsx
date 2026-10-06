import { useState, useRef, useEffect } from 'react';
import { Coins, ChevronDown, Check, ArrowRightLeft, TrendingUp } from 'lucide-react';
import { useCurrency, MajorCurrency } from '../context/CurrencyContext';

interface CurrencySelectorProps {
  className?: string;
  variant?: 'dropdown' | 'segmented' | 'footer' | 'compact';
}

export const CurrencySelector = ({
  className = '',
  variant = 'dropdown'
}: CurrencySelectorProps) => {
  const { currency, setCurrency, currencies, currencyInfo } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [justChanged, setJustChanged] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (code: MajorCurrency) => {
    setCurrency(code);
    setIsOpen(false);
    setJustChanged(true);
    setTimeout(() => setJustChanged(false), 1200);
  };

  // Segmented Pill Variant (Mobile drawer & compact bars)
  if (variant === 'segmented') {
    return (
      <div 
        role="group" 
        aria-label="Currency selector"
        className={`inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs ${className}`}
      >
        {currencies.map((c) => {
          const isSelected = currency === c.code;
          return (
            <button
              key={c.code}
              type="button"
              onClick={() => handleSelect(c.code)}
              aria-pressed={isSelected}
              title={`${c.name} (${c.code} - ${c.symbol})`}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                isSelected
                  ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 shadow-xs border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="text-xs leading-none">{c.flag}</span>
              <span className="text-[11px] font-mono uppercase">{c.code}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Footer Variant (Dark Footer Bar)
  if (variant === 'footer') {
    return (
      <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all shadow-xs cursor-pointer"
        >
          <Coins className="w-3.5 h-3.5 text-lime-400" />
          <span className="text-sm leading-none">{currencyInfo.flag}</span>
          <span className="font-bold text-white">{currencyInfo.code}</span>
          <span className="text-lime-400 font-mono text-[11px]">({currencyInfo.symbol})</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div
            role="listbox"
            className="absolute bottom-full left-0 mb-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-1.5 z-50 animate-fadeIn"
          >
            <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span>Global Currencies</span>
              <span className="text-[9px] text-lime-600 dark:text-lime-400 font-mono">Live Rates</span>
            </div>
            <div className="space-y-1 mt-1">
              {currencies.map((c) => {
                const isSelected = currency === c.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(c.code)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg leading-none">{c.flag}</span>
                      <div>
                        <div className="flex items-center gap-1.5 leading-tight">
                          <span className="font-bold text-slate-900 dark:text-white">{c.code}</span>
                          <span className="text-slate-400 font-mono text-[11px]">({c.symbol})</span>
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
                          {c.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                        {c.code === 'USD' ? 'Base 1.0' : `1: ${c.ratePerUSD.toLocaleString()}`}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-lime-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
        >
          <span>{currencyInfo.flag}</span>
          <span className="font-mono">{currencyInfo.code}</span>
          <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div
            role="listbox"
            className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-1 z-50 animate-fadeIn"
          >
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => handleSelect(c.code)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                  currency === c.code 
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 font-bold' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{c.flag}</span>
                  <span>{c.code} ({c.symbol})</span>
                </div>
                {currency === c.code && <Check className="w-3.5 h-3.5 text-blue-600" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default Header Dropdown Variant
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        id="header-currency-selector-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Current currency: ${currencyInfo.name} (${currencyInfo.code})`}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'bg-blue-50 dark:bg-slate-900 border-blue-400 text-blue-700 dark:text-blue-300 shadow-sm'
            : justChanged
            ? 'bg-lime-50 dark:bg-lime-950/40 border-lime-400 text-lime-800 dark:text-lime-300 ring-2 ring-lime-400/30'
            : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-2xs'
        }`}
      >
        <span className="text-sm leading-none">{currencyInfo.flag}</span>
        <span className="font-bold text-slate-900 dark:text-white font-mono tracking-tight">
          {currencyInfo.code}
        </span>
        <span className="text-[11px] font-extrabold text-blue-600 dark:text-lime-400 bg-blue-50 dark:bg-slate-800 px-1 py-0.5 rounded leading-none">
          {currencyInfo.symbol}
        </span>
        <ChevronDown 
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
          }`} 
        />
      </button>

      {/* Flyout Panel */}
      {isOpen && (
        <div
          role="listbox"
          id="header-currency-dropdown"
          className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-fadeIn"
        >
          {/* Header indicator */}
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-blue-600 dark:text-lime-400" />
              <span className="text-[11px] font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Display Currency
              </span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 border border-lime-200 dark:border-lime-800">
              Live Converter
            </span>
          </div>

          {/* Subtext info */}
          <p className="px-3 pt-2 pb-1 text-[11px] text-slate-500 dark:text-slate-400">
            Updates all transaction, payroll, pricing and financial metrics globally.
          </p>

          {/* Currency list */}
          <div className="space-y-1 mt-1">
            {currencies.map((c) => {
              const isSelected = currency === c.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(c.code)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-900 shadow-2xs'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl leading-none">{c.flag}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-slate-900 dark:text-white">
                          {c.code}
                        </span>
                        <span className="text-blue-600 dark:text-lime-400 font-mono text-[11px] font-bold">
                          ({c.symbol})
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                        {c.name} • {c.region}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 block leading-tight">
                        {c.code === 'USD' ? 'Base 1.00' : `1$ = ${c.ratePerUSD.toLocaleString()}`}
                      </span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 block leading-tight">
                        {c.clearingRail.split('/')[0]}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-lime-400 flex items-center justify-center text-white dark:text-slate-950 shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick info note */}
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 px-3 py-1.5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <ArrowRightLeft className="w-3 h-3 text-lime-500" /> Instant exchange conversion
            </span>
            <span className="font-mono text-slate-500 dark:text-slate-400 font-bold">Pan-African &amp; Global</span>
          </div>
        </div>
      )}
    </div>
  );
};
