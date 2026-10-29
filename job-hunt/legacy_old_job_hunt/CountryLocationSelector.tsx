import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  ChevronDown, 
  X, 
  Globe, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { 
  WORLD_COUNTRIES, 
  ALL_COUNTRIES_SORTED, 
  POPULAR_COUNTRIES, 
  AFRICAN_COUNTRIES,
  CountryItem,
  SPECIAL_LOCATIONS,
  findCountry
} from '../data/countries';

interface CountryLocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: 'hero' | 'compact' | 'modal';
  id?: string;
}

export const CountryLocationSelector: React.FC<CountryLocationSelectorProps> = ({
  value,
  onChange,
  placeholder = "Select any country or location...",
  className = "",
  variant = 'compact',
  id
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'africa' | 'global'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Find currently selected country metadata if any
  const currentCountry = useMemo(() => {
    return findCountry(value);
  }, [value]);

  // Filter countries based on query and tab
  const filteredCountries = useMemo(() => {
    let list = ALL_COUNTRIES_SORTED;

    if (activeTab === 'popular') {
      list = POPULAR_COUNTRIES;
    } else if (activeTab === 'africa') {
      list = AFRICAN_COUNTRIES;
    }

    if (!searchQuery.trim()) {
      return list;
    }

    const q = searchQuery.toLowerCase().trim();
    return ALL_COUNTRIES_SORTED.filter(country => 
      country.name.toLowerCase().includes(q) ||
      country.code.toLowerCase().includes(q) ||
      country.region.toLowerCase().includes(q) ||
      country.majorCities?.some(city => city.toLowerCase().includes(q))
    );
  }, [searchQuery, activeTab]);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  // Determine label and flag to show in trigger
  const displayInfo = useMemo(() => {
    if (!value || value === 'All' || value.trim() === '') {
      return {
        label: placeholder,
        flag: null,
        isCustom: false
      };
    }

    if (value.toLowerCase() === 'remote') {
      return {
        label: 'Remote (Worldwide)',
        flag: '🌍',
        isCustom: false
      };
    }

    if (value.toLowerCase() === 'pan-africa') {
      return {
        label: 'Pan-Africa (All Countries)',
        flag: '🌍',
        isCustom: false
      };
    }

    if (currentCountry) {
      return {
        label: currentCountry.name,
        flag: currentCountry.flag,
        isCustom: false
      };
    }

    return {
      label: value,
      flag: '📍',
      isCustom: true
    };
  }, [value, currentCountry, placeholder]);

  return (
    <div ref={containerRef} className={`relative ${className}`} id={id}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={`w-full flex items-center justify-between text-left transition-all cursor-pointer ${
          variant === 'hero'
            ? 'pl-10 pr-4 py-3 text-sm text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 md:bg-transparent dark:md:bg-transparent rounded-xl md:rounded-none border border-slate-200 dark:border-slate-700 md:border-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 md:border-r md:border-slate-200 dark:md:border-slate-800'
            : 'pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-slate-800 dark:text-slate-100'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 truncate">
          {displayInfo.flag ? (
            <span className="text-base select-none shrink-0">{displayInfo.flag}</span>
          ) : (
            <MapPin className={`${variant === 'hero' ? 'w-5 h-5 left-3.5 absolute text-slate-400 dark:text-slate-500' : 'w-4 h-4 left-3 absolute text-slate-400 dark:text-slate-500'} pointer-events-none`} />
          )}
          <span className={`truncate ${!value ? 'text-slate-400 dark:text-slate-500 font-normal' : 'text-slate-800 dark:text-slate-100 font-medium'}`}>
            {displayInfo.label}
          </span>
        </span>

        <span className="flex items-center gap-1 shrink-0 ml-1.5">
          {value && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClear(e as any); }}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
              title="Clear location filter"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#2563EB]' : ''}`} />
        </span>
      </button>

      {/* Floating Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-full min-w-[320px] max-w-[440px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header & Search */}
          <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any country or major city..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-800 dark:text-slate-100 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex items-center gap-1 mt-2.5 overflow-x-auto no-scrollbar text-[11px] font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#2563EB] text-white shadow-2xs font-semibold'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                All Countries (195+)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('popular')}
                className={`px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer ${
                  activeTab === 'popular'
                    ? 'bg-[#2563EB] text-white shadow-2xs font-semibold'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                Featured Hubs
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('africa')}
                className={`px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer ${
                  activeTab === 'africa'
                    ? 'bg-[#2563EB] text-white shadow-2xs font-semibold'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                Africa 🌍
              </button>
            </div>
          </div>

          {/* Quick Selection Chips for Top Destinations */}
          {!searchQuery && (
            <div className="px-3 py-2 bg-slate-50/40 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 block">
                Quick Picks
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SPECIAL_LOCATIONS.map(spec => (
                  <button
                    key={spec.label}
                    type="button"
                    onClick={() => handleSelect(spec.value)}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                      value === spec.value
                        ? 'bg-[#2563EB]/15 text-[#2563EB] dark:text-blue-400 border border-[#2563EB]/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700'
                    }`}
                  >
                    <span>{spec.flag}</span>
                    <span>{spec.label.split(' ')[0]}</span>
                  </button>
                ))}
                
                {/* Popular Country Mini Chips */}
                {POPULAR_COUNTRIES.slice(0, 6).map(c => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelect(c.name)}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                      value.toLowerCase() === c.name.toLowerCase()
                        ? 'bg-[#2563EB]/15 text-[#2563EB] dark:text-blue-400 border border-[#2563EB]/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700'
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Scrollable Country List */}
          <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 py-1">
            {/* If user searched and there's a custom query, allow picking custom city/state */}
            {searchQuery.trim() && (
              <button
                type="button"
                onClick={() => handleSelect(searchQuery.trim())}
                className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-700 dark:text-blue-300 flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="font-medium">Filter by custom text:</span>
                    <span className="font-bold ml-1">"{searchQuery.trim()}"</span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400">Search exact city, region, or keyword</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Select &rarr;</span>
              </button>
            )}

            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => {
                const isSelected = value.toLowerCase() === country.name.toLowerCase() || value.toUpperCase() === country.code;
                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleSelect(country.name)}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-blue-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg leading-none shrink-0 select-none">{country.flag}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate">{country.name}</span>
                          <span className="text-[10px] px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-400 font-mono">
                            {country.code}
                          </span>
                        </div>
                        {country.majorCities && country.majorCities.length > 0 && (
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate block">
                            {country.majorCities.slice(0, 3).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] px-1.5 py-0.5 rounded text-slate-400 dark:text-slate-500 bg-slate-100/80 dark:bg-slate-800">
                        {country.region}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center">
                <Globe className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">No countries found for "{searchQuery}"</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  You can still use this as a custom city or location filter.
                </p>
                <button
                  type="button"
                  onClick={() => handleSelect(searchQuery.trim())}
                  className="mt-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#2563EB] text-white hover:bg-blue-700 transition-colors"
                >
                  Use "{searchQuery}" as location
                </button>
              </div>
            )}
          </div>

          {/* Footer Status */}
          <div className="px-3.5 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Showing all 195+ global countries</span>
            {value && (
              <button
                type="button"
                onClick={() => handleSelect('')}
                className="text-[#2563EB] dark:text-blue-400 hover:underline font-medium cursor-pointer"
              >
                Reset to Worldwide
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
