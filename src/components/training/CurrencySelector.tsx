import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, CurrencyInfo } from '../context/CurrencyContext';
import { CurrencyCode } from '../types';
import { ChevronDown, Check, Search, Globe } from 'lucide-react';

interface CurrencySelectorProps {
  variant?: 'header' | 'mobile';
  className?: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { currency, setCurrency, currentCurrency, availableCurrencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const filteredCurrencies = availableCurrencies.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.symbol.toLowerCase().includes(q)
    );
  });

  const handleSelect = (code: CurrencyCode) => {
    setCurrency(code);
    setIsOpen(false);
    setSearchQuery('');
  };

  if (variant === 'mobile') {
    return (
      <div className={`w-full ${className}`}>
        <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
          Select Currency (16 Available):
        </label>
        <div className="relative">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="w-full px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-md border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0F4C81] dark:focus:ring-lime-400"
          >
            {availableCurrencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} ({c.symbol}) - {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button in Header */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer shadow-2xs group"
        title="Toggle global currency"
        aria-expanded={isOpen}
      >
        <span className="text-sm leading-none" role="img" aria-label={currentCurrency.country}>
          {currentCurrency.flag}
        </span>
        <span className="font-bold text-[#0F4C81] dark:text-[#84CC16]">
          {currentCurrency.code}
        </span>
        <span className="text-slate-500 dark:text-slate-400 text-[11px]">
          ({currentCurrency.symbol})
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Global Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-[#0F172A] rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header & Quick Search */}
          <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Globe className="w-3 h-3 text-[#0F4C81] dark:text-[#84CC16]" />
                <span>Global Currency Provider</span>
              </span>
              <span className="text-[10px] text-slate-400">16 Supported</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search currency, code or country..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0F4C81] dark:focus:border-[#84CC16]"
                autoFocus
              />
            </div>
          </div>

          {/* Currency List */}
          <div className="max-h-64 overflow-y-auto p-1.5 space-y-0.5">
            {filteredCurrencies.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No currencies match &quot;{searchQuery}&quot;
              </div>
            ) : (
              filteredCurrencies.map((c) => {
                const isSelected = c.code === currency;
                return (
                  <button
                    key={c.code}
                    onClick={() => handleSelect(c.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-[#84CC16] font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none" role="img" aria-label={c.country}>
                        {c.flag}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5 leading-snug">
                          <span className="font-bold text-slate-900 dark:text-white">{c.code}</span>
                          <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">
                            ({c.symbol})
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                          {c.name} · {c.country}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        {c.code === 'USD' ? 'Base (1.00)' : `1$ = ${c.ratePerUSD.toLocaleString()}`}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#0F4C81] dark:text-[#84CC16] flex-shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer note on auto-conversion */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-center text-slate-400 bg-slate-50/50 dark:bg-slate-900/40">
            Real-time conversion across all courses, bundles, and checkout fees.
          </div>
        </div>
      )}
    </div>
  );
};
