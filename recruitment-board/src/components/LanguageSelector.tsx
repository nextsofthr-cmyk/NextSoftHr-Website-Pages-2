import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Globe, Search } from 'lucide-react';
import { useLanguage, LANGUAGE_LIST } from '../context/LanguageContext';
import { SupportedLanguage } from '../data/translations';

interface LanguageSelectorProps {
  className?: string;
  compact?: boolean;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  compact = false,
  onLanguageChange
}) => {
  const { currentLanguage, languageConfig, setLanguage, t } = useLanguage();
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

  const filteredLanguages = LANGUAGE_LIST.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
    setSearchQuery('');
    if (onLanguageChange) {
      onLanguageChange(code);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-[#0B1120] dark:hover:bg-[#131D31] border border-slate-200/90 dark:border-slate-800 dark:hover:border-blue-400/40 text-slate-800 dark:text-slate-100 text-xs font-semibold shadow-2xs transition-all duration-200 cursor-pointer group"
        title={`Select Language (Active: ${languageConfig.nativeName} - ${languageConfig.name})`}
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <span className="text-base leading-none select-none">{languageConfig.flag}</span>
        
        {!compact ? (
          <div className="flex items-center gap-1">
            <span className="font-bold tracking-tight text-slate-900 dark:text-white uppercase">
              {languageConfig.code}
            </span>
            <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px] hidden xl:inline">
              · {languageConfig.nativeName}
            </span>
          </div>
        ) : (
          <span className="font-bold tracking-tight text-slate-900 dark:text-white uppercase">
            {languageConfig.code}
          </span>
        )}

        <ChevronDown 
          className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#2563EB] dark:text-blue-400' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header */}
          <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {t('nav.language', 'Language')} / Translation
              </span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] dark:bg-blue-950/80 dark:text-blue-300">
              8 Regional Locales
            </span>
          </div>

          {/* Search Box */}
          <div className="p-2">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search language or region..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-lg text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                autoFocus
              />
            </div>
          </div>

          {/* Languages List */}
          <div className="max-h-60 overflow-y-auto space-y-1 p-1">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected = currentLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/70 text-[#2563EB] dark:text-blue-400 font-bold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg leading-none select-none">{lang.flag}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {lang.nativeName}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            ({lang.name})
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                          {lang.region}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {lang.direction === 'rtl' && (
                        <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          RTL
                        </span>
                      )}
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                No languages match your search.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Translations applied across UI</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              Active: {languageConfig.code.toUpperCase()}
            </span>
          </div>

        </div>
      )}
    </div>
  );
};
