import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../i18n/types';

interface LanguageSelectorProps {
  variant?: 'header' | 'footer' | 'compact';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'header',
  className = ''
}) => {
  const { language, setLanguage, availableLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = availableLanguages.find((l) => l.code === language) || availableLanguages[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
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

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const selectLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t.selectLanguage}
        title={t.selectLanguage}
      >
        <span className="text-sm leading-none" role="img" aria-hidden="true">
          {currentLang.flag}
        </span>
        <span className="uppercase font-mono text-[11px] tracking-wide">
          {currentLang.code}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-slate-950/50 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
          role="listbox"
          aria-label={t.selectLanguage}
        >
          <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>International &amp; Pan-African Markets</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Select legal terms translation language
            </div>
          </div>

          <div className="p-1 space-y-0.5">
            {availableLanguages.map((lang) => {
              const isSelected = lang.code === language;

              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => selectLanguage(lang.code)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base" role="img" aria-hidden="true">
                      {lang.flag}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {lang.nativeName}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">
                          ({lang.name})
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                        {lang.marketNote}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#84cc16] shrink-0 drop-shadow-xs" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
