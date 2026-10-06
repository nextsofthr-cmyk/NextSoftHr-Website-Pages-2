import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Language, LanguageOption } from '../translations';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  options: LanguageOption[];
  isCompact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage,
  options,
  isCompact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption =
    options.find((opt) => opt.code === currentLanguage) || options[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (code: Language) => {
    onSelectLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1527] hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 shadow-2xs transition-colors focus:outline-none focus:ring-1 focus:ring-[#0F52BA]`}
        title={`Change Language (${activeOption.nativeLabel})`}
      >
        <Globe className="w-3.5 h-3.5 text-[#0F52BA] dark:text-[#60A5FA] shrink-0" />
        <span className="text-sm leading-none shrink-0" aria-hidden="true">
          {activeOption.flag}
        </span>
        {!isCompact && (
          <span className="hidden sm:inline font-semibold">
            {activeOption.code.toUpperCase()}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-1.5 w-64 rounded-xl bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800/80 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Select Language / Choisir la Langue
            </span>
          </div>

          {options.map((option) => {
            const isSelected = option.code === currentLanguage;
            return (
              <button
                key={option.code}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors ${
                  isSelected
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 text-[#0F52BA] dark:text-[#60A5FA] font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{option.flag}</span>
                  <div>
                    <div className="font-semibold leading-tight text-slate-900 dark:text-white">
                      {option.nativeLabel}{' '}
                      <span className="text-[11px] font-normal text-slate-400">
                        ({option.label})
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
                      {option.region}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-[#84CC16] shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
