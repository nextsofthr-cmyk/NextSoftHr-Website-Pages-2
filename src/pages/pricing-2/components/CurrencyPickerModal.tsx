import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  X,
  Search,
  Globe,
  Check,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { CurrencyCode, CurrencyConfig } from '../types';
import {
  ALL_WORLD_CURRENCIES_LIST,
  POPULAR_CURRENCIES_CODES,
  WORLD_CURRENCIES,
  getCurrencyConfig,
} from '../data/worldCurrencies';

import { useLanguage } from '../context/LanguageContext';
interface CurrencyPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCurrency: CurrencyCode;
  onSelectCurrency: (code: CurrencyCode) => void;
  title?: string;
  subtitle?: string;
}

type RegionTab = 'all' | 'africa' | 'europe' | 'americas' | 'asia-pacific' | 'middle-east';

export const CurrencyPickerModal: React.FC<CurrencyPickerModalProps> = ({
  isOpen,
  onClose,
  selectedCurrency,
  onSelectCurrency,
  title = 'Select Payment Currency',
  subtitle = 'Choose from all 160+ world currencies. Defaults to Nigerian Naira (₦).',
}) => {
  const { tx } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<RegionTab>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
      setActiveTab('all');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Filter currencies based on tab and search query
  const filteredCurrencies = useMemo(() => {
    let list = ALL_WORLD_CURRENCIES_LIST;

    if (activeTab === 'africa') {
      list = list.filter((c) =>
        ['West Africa', 'East Africa', 'Southern Africa', 'North Africa', 'Central Africa', 'Horn of Africa', 'Indian Ocean', 'Nigeria', 'Kenya', 'Ghana', 'South Africa', 'UEMOA', 'CEMAC'].some(
          (reg) => c.region?.toLowerCase().includes(reg.toLowerCase())
        )
      );
    } else if (activeTab === 'europe') {
      list = list.filter((c) =>
        ['Europe', 'United Kingdom', 'Eurozone', 'Scandinavia', 'Balkans', 'Caucasus'].some(
          (reg) => c.region?.toLowerCase().includes(reg.toLowerCase())
        )
      );
    } else if (activeTab === 'americas') {
      list = list.filter((c) =>
        ['America', 'Canada', 'United States', 'Latin America', 'South America', 'Central America', 'Caribbean'].some(
          (reg) => c.region?.toLowerCase().includes(reg.toLowerCase())
        )
      );
    } else if (activeTab === 'asia-pacific') {
      list = list.filter((c) =>
        ['Asia', 'Oceania', 'Japan', 'China', 'India', 'Australia', 'New Zealand', 'Pacific'].some(
          (reg) => c.region?.toLowerCase().includes(reg.toLowerCase())
        )
      );
    } else if (activeTab === 'middle-east') {
      list = list.filter((c) =>
        ['Middle East', 'Gulf', 'Emirates', 'Saudi', 'Qatar', 'Kuwait', 'Central Asia'].some(
          (reg) => c.region?.toLowerCase().includes(reg.toLowerCase())
        )
      );
    }

    if (!searchQuery.trim()) {
      return list;
    }

    const q = searchQuery.toLowerCase().trim();
    return list.filter((c) => {
      return (
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q) ||
        (c.region && c.region.toLowerCase().includes(q))
      );
    });
  }, [activeTab, searchQuery]);

  if (!isOpen) return null;

  const currentConfig = getCurrencyConfig(selectedCurrency);

  const handleSelect = (code: CurrencyCode) => {
    onSelectCurrency(code);
    onClose();
  };

  return (
    <div
      id="currency-picker-backdrop"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="currency-picker-dialog"
        className="relative w-full max-w-2xl bg-white dark:bg-[#0B132B] rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="currency-picker-title"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/50 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-[#0265DC] dark:text-blue-400 flex items-center justify-center shadow-inner">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="currency-picker-title" className="text-lg font-bold text-slate-900 dark:text-white">
                  {tx(title)}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">{tx("Default: ₦ NGN")}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{tx(subtitle)}</p>
            </div>
          </div>
          <button
            id="close-currency-picker-btn"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            aria-label={tx("Close currency picker")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Currency Banner */}
        <div className="px-4 py-2.5 bg-blue-50/80 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <span className="text-base">{currentConfig.flag}</span>
            <span className="font-semibold text-slate-900 dark:text-white">{tx("Currently Selected:")}{' '}{currentConfig.name} ({currentConfig.code})
            </span>
            <span className="text-slate-400 font-mono">{tx("1 USD ≈")}{' '}{currentConfig.format(1)}</span>
          </div>
          {currentConfig.code === 'NGN' && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded shadow-xs">{tx("★ Primary Default")}</span>
          )}
        </div>

        {/* Search & Tabs */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              id="currency-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={tx("Search by code, country, or currency (e.g. NGN, Naira, Dollar, KES, Yen, Euro)...")}
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0265DC] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Pinned Currencies */}
          {!searchQuery && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>{tx("Featured & Popular Currencies")}</span>
                <span className="text-[10px] text-blue-500 font-normal">{tx("Click to quick select")}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_CURRENCIES_CODES.map((code) => {
                  const curr = WORLD_CURRENCIES[code];
                  if (!curr) return null;
                  const isSelected = selectedCurrency === curr.code;
                  return (
                    <button
                      key={curr.code}
                      id={`quick-currency-${curr.code}`}
                      onClick={() => handleSelect(curr.code)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-[#0265DC] text-white shadow-sm ring-2 ring-blue-400/30 font-bold'
                          : curr.code === 'NGN'
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span className="text-sm leading-none">{curr.flag}</span>
                      <span>{curr.code}</span>
                      <span className="text-[10px] opacity-75 font-mono">({curr.symbol})</span>
                      {curr.code === 'NGN' && !isSelected && (
                        <span className="text-[9px] bg-emerald-600 text-white px-1 rounded">{tx("Default")}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Region Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs border-t border-slate-100 dark:border-slate-800/60 pt-2.5">
            {[
              { id: 'all', label: tx('All Currencies ({count})', { count: ALL_WORLD_CURRENCIES_LIST.length }) },
              { id: 'africa', label: 'Africa (35+)' },
              { id: 'europe', label: 'Europe & UK' },
              { id: 'americas', label: 'Americas' },
              { id: 'asia-pacific', label: 'Asia & Pacific' },
              { id: 'middle-east', label: 'Middle East' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as RegionTab)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors text-xs font-medium ${
                  activeTab === tab.id
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-[#0265DC] dark:text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {tx(tab.label)}
              </button>
            ))}
          </div>
        </div>

        {/* Currency List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 divide-y divide-slate-100 dark:divide-slate-800/50 max-h-[50vh]">
          {filteredCurrencies.length === 0 ? (
            <div className="py-12 text-center">
              <Globe className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{tx('No currencies found matching “{query}”', { query: searchQuery })}</p>
              <p className="text-xs text-slate-400 mt-1">{tx("Try searching by ISO code (e.g. NGN, EUR, USD, ZAR) or country name.")}</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="mt-3 text-xs text-[#0265DC] hover:underline font-semibold"
              >{tx("Reset search filters")}</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {filteredCurrencies.map((curr) => {
                const isSelected = selectedCurrency === curr.code;
                const isDefault = curr.code === 'NGN';
                return (
                  <button
                    key={curr.code}
                    id={`currency-item-${curr.code}`}
                    onClick={() => handleSelect(curr.code)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all group ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 ring-1 ring-blue-500/20'
                        : isDefault
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="text-2xl flex-shrink-0 leading-none">{curr.flag}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-bold ${
                              isSelected
                                ? 'text-[#0265DC] dark:text-blue-400'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {curr.code}
                          </span>
                          <span className="font-mono text-slate-500 dark:text-slate-400 font-medium">
                            ({curr.symbol})
                          </span>
                          {isDefault && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-600 text-white">{tx("Default")}</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-medium">
                          {curr.name}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                          {tx(curr.region)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 text-right">
                      <div className="hidden sm:block">
                        <div className="text-[10px] text-slate-400 uppercase">{tx("Rate")}</div>
                        <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 font-semibold">
                          {curr.format(1)}
                        </div>
                      </div>
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-[#0265DC] text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-xs">
          <div className="text-slate-500 dark:text-slate-400 text-[11px]">{tx("Showing")}{' '}<strong className="text-slate-700 dark:text-slate-200">{filteredCurrencies.length}</strong>{' '}{tx("world currencies")}</div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >{tx("Done")}</button>
        </div>
      </div>
    </div>
  );
};
