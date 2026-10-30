import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Coins, Search } from 'lucide-react';
import { useCurrency, CURRENCY_LIST, SupportedCurrency } from '../context/CurrencyContext';

interface CurrencySelectorProps {
  className?: string;
  compact?: boolean;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ 
  className = '',
  compact = false 
}) => {
  const { currentCurrency, currencyConfig, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredCurrencies = CURRENCY_LIST.filter(c => 
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-[#0B1120] dark:hover:bg-[#131D31] border border-slate-200/90 dark:border-slate-800 dark:hover:border-lime-400/40 text-slate-800 dark:text-slate-100 text-xs font-semibold shadow-2xs transition-all duration-300 cursor-pointer group"
        title={`Change Global Currency (Active: ${currencyConfig.code} - ${currencyConfig.symbol})`}
        aria-label="Select Currency"
      >
        <span className="text-base leading-none select-none">{currencyConfig.flag}</span>
        <span className="font-bold tracking-tight text-slate-900 dark:text-white">
          {currencyConfig.code}
        </span>
        <span className="text-slate-600 dark:text-lime-400 font-mono text-[11px]">
          ({currencyConfig.symbol})
        </span>
        <ChevronDown 
          className={`w-3.5 h-3.5 text-slate-600 dark:text-slate-300 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-blue-600 dark:text-lime-400' : ''
          }`} 
        />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 transition-colors duration-300">
          
          {/* Header */}
          <div className="px-2 pt-1 pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Global Currency Provider</span>
              </span>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono font-medium">
                16 Currencies
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
              Updates all salaries, pricing plans & transactions globally.
            </p>

            {/* Quick Search */}
            <div className="mt-2 relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by code, country, or name..."
                className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
            </div>
          </div>

          {/* Currencies Scroll List */}
          <div className="max-h-64 overflow-y-auto py-1.5 space-y-0.5">
            {filteredCurrencies.map((c) => {
              const isSelected = c.code === currentCurrency;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setCurrency(c.code as SupportedCurrency);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer group ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-[#131D31] text-blue-900 dark:text-lime-300 border border-blue-200 dark:border-lime-400/40 font-bold'
                      : 'hover:bg-slate-50 dark:hover:bg-[#131D31]/80 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl leading-none shrink-0 select-none">{c.flag}</span>
                    <div className="min-w-0 flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          {c.code}
                        </span>
                        <span className="font-mono text-xs font-semibold text-blue-600 dark:text-lime-400">
                          {c.symbol}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-600 dark:text-slate-300 truncate">
                        {c.name} · {c.country}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono">
                      {c.ratePerUSD === 1 ? '$1.00' : `1$ = ${c.ratePerUSD >= 100 ? Math.round(c.ratePerUSD).toLocaleString() : c.ratePerUSD.toFixed(1)}`}
                    </span>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-blue-600 dark:bg-lime-400 text-white dark:text-slate-950 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}

            {filteredCurrencies.length === 0 && (
              <div className="py-4 text-center text-xs text-slate-400">
                No matching currencies found for "{searchQuery}"
              </div>
            )}
          </div>

          {/* Footer Status */}
          <div className="px-2.5 py-1.5 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 flex items-center justify-between">
            <span>Base USD Index</span>
            <span className="text-lime-700 dark:text-lime-400 font-medium">● Real-time Conversion Active</span>
          </div>

        </div>
      )}
    </div>
  );
};
