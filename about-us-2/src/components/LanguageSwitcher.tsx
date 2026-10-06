import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Sparkles } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageOption } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  compact?: boolean;
  className?: string;
  dropUp?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  compact = false,
  className = '',
  dropUp = false
}) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelectLanguage = (lang: LanguageOption) => {
    setLanguage(lang.code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Current language: ${currentLanguage.name}. Click to change language`}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#0B3B73] dark:hover:text-[#84CC16] bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/60 dark:border-slate-700/60 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B3B73] dark:focus:ring-[#84CC16]"
      >
        <span className="text-sm leading-none" role="img" aria-label={currentLanguage.name}>
          {currentLanguage.flag}
        </span>
        <span className="font-bold tracking-tight">
          {compact ? currentLanguage.code.toUpperCase() : currentLanguage.localName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#0B3B73] dark:text-[#84CC16]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Supported African & Global Languages"
          className={`absolute ${dropUp ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 z-50 w-72 sm:w-80 rounded-xl bg-white dark:bg-[#0E2038] border border-slate-200 dark:border-blue-900/50 shadow-2xl shadow-blue-950/20 dark:shadow-black/70 overflow-hidden animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* Header */}
          <div className="p-3 bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-[#0B1E38] dark:to-[#071322] border-b border-slate-100 dark:border-blue-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#0B3B73] dark:text-[#38BDF8]" />
                Regional &amp; Market Languages
              </span>
              <span className="text-[10px] font-semibold text-[#84CC16] bg-[#84CC16]/10 px-1.5 py-0.5 rounded">
                Pan-African
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Select your region’s preferred business language
            </p>
          </div>

          {/* Options List */}
          <div className="p-1.5 max-h-72 overflow-y-auto space-y-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLanguage.code;
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectLanguage(lang)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/70 text-[#0B3B73] dark:text-[#84CC16] font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-lg leading-none mt-0.5" role="img" aria-label={lang.name}>
                      {lang.flag}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {lang.localName}
                        </span>
                        {lang.localName !== lang.name && (
                          <span className="text-[11px] text-slate-400 dark:text-slate-500">
                            ({lang.name})
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                        {lang.region}
                      </p>
                      <p className="text-[9px] text-[#0B3B73]/70 dark:text-blue-300/60 font-mono mt-0.5">
                        Currencies: {lang.currencyExample}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#84CC16] text-slate-950 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Hint */}
          <div className="p-2.5 px-3 bg-slate-50/80 dark:bg-[#071322]/80 border-t border-slate-100 dark:border-blue-900/30 text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>More regional dialects available on request</span>
            <span className="text-[#0B3B73] dark:text-[#84CC16] font-semibold">6 Locales</span>
          </div>
        </div>
      )}
    </div>
  );
};
