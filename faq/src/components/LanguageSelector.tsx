import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../data/translations';

interface LanguageSelectorProps {
  isMobileDrawer?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isMobileDrawer = false }) => {
  const { language, setLanguage, currentLanguageOption, availableLanguages } = useLanguage();
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

  const handleSelectLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (isMobileDrawer) {
    return (
      <div className="w-full">
        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-lime-400" />
          <span>Language / Langue / Idioma</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {availableLanguages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 text-blue-800 dark:text-blue-300 font-bold shadow-2xs'
                    : 'bg-slate-50 dark:bg-[#111F42] border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#162752]'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <div className="truncate">
                  <div className="truncate">{lang.nativeName}</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-400 truncate">{lang.name}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-lime-300 bg-slate-100 dark:bg-[#111F42] hover:bg-slate-200 dark:hover:bg-[#162752] border border-slate-200 dark:border-slate-700/80 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
      >
        <span className="text-sm">{currentLanguageOption.flag}</span>
        <span className="uppercase font-bold tracking-wider">{currentLanguageOption.code}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#0B132B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 mb-1">
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-lime-400" />
              <span>International &amp; Pan-African</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Select your preferred workspace language
            </div>
          </div>

          <div className="space-y-1">
            {availableLanguages.map((lang) => {
              const isSelected = language === lang.code;

              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-900'
                      : 'hover:bg-slate-50 dark:hover:bg-[#111F42] text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl shrink-0">{lang.flag}</span>
                    <div className="truncate">
                      <div className="text-xs font-semibold flex items-center gap-1.5">
                        <span>{lang.nativeName}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({lang.name})</span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[190px]">
                        {lang.regions}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
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
