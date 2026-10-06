import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Coins, Check, Search, TrendingUp } from 'lucide-react';
import { useCurrency, SUPPORTED_CURRENCIES } from '../context/CurrencyContext';

interface CurrencySelectorProps {
  variant?: 'navbar' | 'compact' | 'drawer';
  className?: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  variant = 'navbar',
  className = ''
}) => {
  const { currentCurrency, setCurrency, currencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
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

  const filteredCurrencies = currencies.filter(c => 
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase()) ||
    c.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        id="currency-selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-xl transition-all cursor-pointer select-none font-bold ${
          variant === 'navbar'
            ? 'px-2.5 py-1.5 text-xs bg-white/10 hover:bg-white/15 text-slate-100 hover:text-white border border-white/15 hover:border-[#c8f526]/50 shadow-xs'
            : variant === 'drawer'
            ? 'w-full justify-between p-2.5 bg-slate-100 dark:bg-[#0a1c3b] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 text-xs'
            : 'px-2 py-1 text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
        }`}
        title={`Global Currency: ${currentCurrency.name} (${currentCurrency.code}) - Click to change currency throughout the app`}
        aria-label="Select display currency"
        aria-expanded={isOpen}
      >
        <span className="text-sm leading-none shrink-0" role="img" aria-label={currentCurrency.name}>
          {currentCurrency.flag}
        </span>
        <span className="font-mono tracking-tight font-black">
          {currentCurrency.code}
        </span>
        <span className="opacity-80 text-[11px] hidden sm:inline font-mono">
          ({currentCurrency.symbol})
        </span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#c8f526]' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-[#071938] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2.5 z-50 animate-fadeIn">
          
          {/* Header & Search */}
          <div className="p-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#0c2b64] dark:text-[#c8f526] flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5" />
                <span>Global Currency (FX)</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                1 USD = {currentCurrency.rateAgainstUSD.toLocaleString()} {currentCurrency.code}
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search currency (NGN, USD, KES, ZAR...)"
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-[#c8f526]"
                autoFocus
              />
            </div>
          </div>

          {/* Currencies List */}
          <div className="max-h-64 overflow-y-auto p-1 space-y-1 mt-1 scrollbar-thin">
            {filteredCurrencies.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No matching currencies found.
              </div>
            ) : (
              filteredCurrencies.map((c) => {
                const isSelected = c.code === currentCurrency.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setCurrency(c.code);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-[#0c2b64] dark:text-[#c8f526] font-bold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base leading-none shrink-0" role="img" aria-label={c.name}>
                        {c.flag}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-black">{c.code}</span>
                          <span className="text-[11px] opacity-75 font-mono">({c.symbol})</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                            {c.region}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {c.name}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400 font-mono">
                        {c.code === 'USD' ? 'Baseline' : `${c.rateAgainstUSD.toLocaleString()}/$`}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-blue-700 dark:text-[#c8f526] stroke-[3]" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Quick Notice Footer */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-500" />
            <span>Real-time conversion applied globally across all partner deals & metrics</span>
          </div>

        </div>
      )}
    </div>
  );
};
