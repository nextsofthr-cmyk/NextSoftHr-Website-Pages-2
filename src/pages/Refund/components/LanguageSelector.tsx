import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../data/translations';

interface LanguageSelectorProps {
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
  className?: string;
  variant?: 'compact' | 'full';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onSelectLang,
  className = '',
  variant = 'compact',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select application language"
        title="Change language / Changer de langue / Mudar idioma / Cambiar idioma"
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131D31] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#0A3B7B] dark:hover:text-[#38BDF8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
      >
        <Globe className="w-3.5 h-3.5 text-[#0A3B7B] dark:text-[#38BDF8]" />
        <span className="font-mono text-[11px] uppercase tracking-wider">{selected.code}</span>
        {variant === 'full' && (
          <span className="hidden sm:inline font-normal text-slate-500 dark:text-slate-400">
            ({selected.nativeLabel})
          </span>
        )}
        <ChevronDown
          className={`w-3 h-3 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#0A3B7B] dark:text-[#38BDF8]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Languages"
          className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
            Regional Language / Langue
          </div>

          {SUPPORTED_LANGUAGES.map((lang) => {
            const isCurrent = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={isCurrent}
                onClick={() => {
                  onSelectLang(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors ${
                  isCurrent
                    ? 'bg-[#0A3B7B]/10 dark:bg-[#38BDF8]/15 text-[#0A3B7B] dark:text-[#38BDF8] font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-[#0A3B7B] dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm leading-none" role="img" aria-label={lang.label}>
                    {lang.flag}
                  </span>
                  <span>{lang.nativeLabel}</span>
                </div>
                {isCurrent && <Check className="w-3.5 h-3.5 text-[#84CC16]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
