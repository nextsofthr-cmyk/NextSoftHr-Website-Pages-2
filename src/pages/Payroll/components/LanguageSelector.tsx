import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Language } from '../i18n/translations';

interface LanguageSelectorProps {
  compact?: boolean;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  compact = false,
  className = '',
}) => {
  const { language, setLanguage, currentOption, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#0A3F7E] dark:hover:text-[#8EE000] hover:bg-slate-100 dark:hover:bg-[#0E2442] transition-colors border border-slate-200/80 dark:border-[#1E3656]"
        aria-label="Select language"
        title={`Language: ${currentOption.label}`}
      >
        <span className="text-sm leading-none" role="img" aria-label={currentOption.label}>
          {currentOption.flag}
        </span>
        {!compact && (
          <span className="font-mono uppercase font-bold tracking-wider text-[11px]">
            {currentOption.code}
          </span>
        )}
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#0A203A] border border-slate-200 dark:border-[#1E3656] shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3.5 py-1.5 border-b border-slate-100 dark:border-[#1E3656] text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#8EE000]" />
              Pan-African & Global Locale
            </span>
            <span className="text-[#8EE000] font-mono text-[9px]">4 Languages</span>
          </div>

          <div className="py-1 space-y-0.5 px-1">
            {availableLanguages.map((opt) => {
              const isSelected = opt.code === language;
              return (
                <button
                  key={opt.code}
                  onClick={() => handleSelect(opt.code)}
                  className={`w-full flex items-start gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                    isSelected
                      ? 'bg-[#0A3F7E]/10 dark:bg-[#8EE000]/15 text-[#0A3F7E] dark:text-[#8EE000] font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#0E2442]'
                  }`}
                >
                  <span className="text-base leading-none mt-0.5" role="img" aria-label={opt.label}>
                    {opt.flag}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">{opt.nativeName}</span>
                      <span className="text-[10px] font-mono uppercase text-slate-400">{opt.code}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-400 truncate">
                      {opt.region}
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#0A3F7E] dark:text-[#8EE000] shrink-0 mt-0.5" />
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
