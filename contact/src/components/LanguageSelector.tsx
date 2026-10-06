import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';

interface LanguageSelectorProps {
  variant?: 'desktop' | 'mobile' | 'footer';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'desktop', className = '' }) => {
  const { language, setLanguage, currentLanguageInfo, availableLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className={`pt-2 ${className}`}>
        <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-2 px-1">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#C8F000]" />
            <span>{t.nav.selectLanguage}</span>
          </span>
          <span className="text-[10px] text-[#C8F000] font-mono uppercase bg-white/10 px-2 py-0.5 rounded">
            {currentLanguageInfo.code.toUpperCase()}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {(Object.keys(availableLanguages) as Language[]).map((langKey) => {
            const lang = availableLanguages[langKey];
            const isSelected = language === langKey;
            return (
              <button
                key={langKey}
                onClick={() => handleSelect(langKey)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                  isSelected
                    ? 'bg-[#1769E0] text-white font-bold shadow-sm ring-1 ring-[#C8F000]'
                    : 'bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="truncate">{lang.nativeName}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#C8F000] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C8F000]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Select language. Current: ${currentLanguageInfo.name}`}
      >
        <span className="text-sm leading-none">{currentLanguageInfo.flag}</span>
        <span className="font-mono text-xs text-[#C8F000] uppercase font-bold">
          {currentLanguageInfo.code}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0B1F3A] border border-white/15 shadow-2xl backdrop-blur-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-white/10 mb-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.nav.selectLanguage} • Pan-African &amp; Global
            </p>
          </div>
          <div role="listbox">
            {(Object.keys(availableLanguages) as Language[]).map((langKey) => {
              const lang = availableLanguages[langKey];
              const isSelected = language === langKey;
              return (
                <button
                  key={langKey}
                  onClick={() => handleSelect(langKey)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#1769E0]/25 text-[#C8F000] font-bold border border-[#1769E0]/50'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg leading-none">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-white leading-tight">
                        {lang.nativeName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {lang.regionLabel}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#1769E0] flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#C8F000]" />
                    </div>
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
