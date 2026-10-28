import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, X, Check, Globe } from 'lucide-react';
import { ALL_WORLD_COUNTRIES_SORTED, CountryOption } from '../../data/countries';

export const CountryFlag: React.FC<{
  code: string;
  name?: string;
  className?: string;
}> = ({ code, name = '', className = 'w-5 h-3.5' }) => {
  const [imgError, setImgError] = useState(false);
  const cleanCode = code?.toLowerCase();

  if (!cleanCode || cleanCode === 'global' || cleanCode === 'multiple') {
    return <span className="text-base leading-none">🌍</span>;
  }

  if (imgError) {
    return (
      <span className="w-5 h-3.5 rounded-xs bg-slate-200 border border-slate-300 flex items-center justify-center text-[9px] font-bold uppercase text-slate-700 shrink-0">
        {cleanCode.slice(0, 2)}
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${cleanCode}.png`}
      srcSet={`https://flagcdn.com/w80/${cleanCode}.png 2x`}
      alt={name ? `${name} flag` : 'Flag'}
      loading="lazy"
      className={`${className} rounded-xs object-cover border border-slate-200/80 shadow-2xs inline-block shrink-0`}
      onError={() => setImgError(true)}
    />
  );
};

export const POPULAR_AFRICAN_COUNTRIES: CountryOption[] = [
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
  { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'MULTIPLE', name: 'Multiple African Countries', flag: '🌍' },
];

interface CountrySelectProps {
  value: string;
  onChange: (countryName: string) => void;
  id?: string;
  className?: string;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  id = 'field-country',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'africa'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  // Find active country object
  const selectedCountry = useMemo(() => {
    const foundPopular = POPULAR_AFRICAN_COUNTRIES.find(
      (c) => c.name.toLowerCase() === value.toLowerCase()
    );
    if (foundPopular) return foundPopular;
    return (
      ALL_WORLD_COUNTRIES_SORTED.find(
        (c) => c.name.toLowerCase() === value.toLowerCase()
      ) || { code: 'NG', name: value || 'Nigeria', flag: '🇳🇬' }
    );
  }, [value]);

  // Filter countries
  const filteredCountries = useMemo(() => {
    let list = activeTab === 'africa' ? POPULAR_AFRICAN_COUNTRIES : ALL_WORLD_COUNTRIES_SORTED;
    if (!search.trim()) return list;

    const q = search.toLowerCase().trim();
    return ALL_WORLD_COUNTRIES_SORTED.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [search, activeTab]);

  const handleSelect = (countryName: string) => {
    onChange(countryName);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm flex items-center justify-between transition-all cursor-pointer shadow-2xs text-left"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <CountryFlag
            code={selectedCountry.code}
            name={selectedCountry.name}
            className="w-5 h-3.5"
          />
          <span className="font-medium text-slate-800 truncate">
            {selectedCountry.name}
          </span>
          {selectedCountry.code && selectedCountry.code !== 'MULTIPLE' && (
            <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
              {selectedCountry.code}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-blue-600' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Search Header */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50/80">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country or code..."
                className="w-full pl-9 pr-8 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 placeholder-slate-400"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex items-center gap-1.5 mt-2">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                All Countries (200+)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('africa')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'africa'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                Popular African Hubs
              </button>
            </div>
          </div>

          {/* Countries Scroll List */}
          <div className="max-h-56 overflow-y-auto divide-y divide-slate-100/80 py-1" role="listbox">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const isSelected = c.name.toLowerCase() === value.toLowerCase();
                return (
                  <button
                    key={c.code + '-' + c.name}
                    type="button"
                    onClick={() => handleSelect(c.name)}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 text-blue-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CountryFlag code={c.code} name={c.name} className="w-5 h-3.5" />
                      <span className="truncate">{c.name}</span>
                      {c.code && c.code !== 'MULTIPLE' && (
                        <span className="text-[10px] text-slate-400 font-mono uppercase">
                          ({c.code})
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-6 text-center text-xs text-slate-500">
                No country found matching "{search}".
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
