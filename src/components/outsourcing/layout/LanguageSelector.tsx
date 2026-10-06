import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES, SupportedLanguage } from '../../context/LanguageContext';
import { ChevronDown, Check, Globe } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'light' | 'dark' | 'compact';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'light',
  className = ''
}) => {
  const { language, setLanguageCode } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
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
        title="Select Language / Changer de langue"
      >
        <span className="text-sm leading-none">{language.flag}</span>
        <span className="font-mono uppercase">{language.code}</span>
        <span className="hidden sm:inline font-sans font-medium text-[11px] opacity-80">
          {language.nativeName}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-1.5 w-60 bg-white dark:bg-[#0A1938] rounded-2xl shadow-2xl border border-slate-200 dark:border-blue-900/60 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          role="listbox"
        >
          <div className="p-1.5 pb-2 border-b border-slate-100 dark:border-blue-900/40">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-lime-400" />
                <span>Pan-African Language</span>
              </span>
              <span className="text-[10px] text-lime-700 dark:text-lime-300 font-mono bg-lime-50 dark:bg-lime-950/60 border border-lime-200 dark:border-lime-800/40 px-1.5 py-0.2 rounded">
                4 Markets
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Select your preferred operational language
            </p>
          </div>

          <div className="space-y-1 py-1.5">
            {SUPPORTED_LANGUAGES.map(item => {
              const isSelected = item.code === language.code;
              return (
                <button
                  type="button"
                  key={item.code}
                  onClick={() => {
                    setLanguageCode(item.code as SupportedLanguage);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-900/40 text-[#0F2D6B] dark:text-lime-300 font-bold border border-blue-200/60 dark:border-blue-800/60'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-blue-950/60 border border-transparent'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.flag}</span>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{item.nativeName}</span>
                        <span className="font-mono text-[10px] text-slate-400 uppercase">({item.code})</span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight">
                        {item.region}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
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
