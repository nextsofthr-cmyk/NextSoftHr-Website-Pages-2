import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, SUPPORTED_CURRENCIES } from '../../context/CurrencyContext';
import { ChevronDown, Check, Globe } from 'lucide-react';

interface CurrencySelectorProps {
  variant?: 'light' | 'dark' | 'compact';
  className?: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ 
  variant = 'light',
  className = '' 
}) => {
  const { currency, setCurrencyCode } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCurrencies = SUPPORTED_CURRENCIES.filter(c => 
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isDark = variant === 'dark';
  const isCompact = variant === 'compact';

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 transition-all text-xs font-bold rounded-xl ${
          isCompact
            ? 'py-1 px-2.5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/15'
            : isDark
            ? 'py-1.5 px-3 bg-white/10 hover:bg-white/15 text-white border border-white/20'
            : 'py-2 px-3 bg-slate-100 hover:bg-slate-200/80 text-slate-800 dark:bg-[#0B1A3D] dark:hover:bg-[#122452] dark:text-slate-200 dark:border-blue-900/50 border border-slate-200 shadow-2xs'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title="Toggle global currency"
      >
        <span className="text-sm leading-none">{currency.flag}</span>
        <span className="font-mono">{currency.code}</span>
        <span className={isCompact || isDark ? 'text-lime-300 font-bold' : 'text-blue-700 dark:text-lime-400 font-bold'}>
          ({currency.symbol})
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-1.5 w-64 bg-white dark:bg-[#0A1938] rounded-2xl shadow-2xl border border-slate-200 dark:border-blue-900/60 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          role="listbox"
        >
          <div className="p-1.5 pb-2 border-b border-slate-100 dark:border-blue-900/40">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              <span>Display Currency</span>
              <span className="text-[10px] text-lime-700 dark:text-lime-300 font-mono bg-lime-50 dark:bg-lime-950/60 border dark:border-lime-800/40 px-1.5 py-0.5 rounded">
                Live Conversion
              </span>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search currency..."
              className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-[#06112C] border border-slate-200 dark:border-blue-900/40 rounded-lg text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#081636]"
              autoFocus
            />
          </div>

          <div className="max-h-56 overflow-y-auto space-y-0.5 py-1">
            {filteredCurrencies.map(c => {
              const isSelected = c.code === currency.code;
              return (
                <button
                  type="button"
                  key={c.code}
                  onClick={() => {
                    setCurrencyCode(c.code);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    isSelected 
                      ? 'bg-blue-50 dark:bg-blue-900/40 text-[#0F2D6B] dark:text-lime-300 font-bold' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-blue-950/60'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{c.flag}</span>
                    <span className="font-mono font-bold">{c.code}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] truncate max-w-[100px]">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">{c.symbol}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-700 dark:text-lime-400 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
            {filteredCurrencies.length === 0 && (
              <div className="text-center py-4 text-xs text-slate-400">
                No matching currencies
              </div>
            )}
          </div>

          <div className="pt-1.5 mt-1 border-t border-slate-100 dark:border-blue-900/40 text-[10px] text-slate-400 text-center">
            Rates updated dynamically across all views
          </div>
        </div>
      )}
    </div>
  );
};
