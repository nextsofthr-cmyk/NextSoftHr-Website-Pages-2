import React, { useState, useRef, useEffect } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../data/translations';

interface LanguageSelectorProps {
  variant?: 'navbar' | 'mobile' | 'footer';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'navbar',
  className = ''
}) => {
  const { language, setLanguage, languages, currentLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
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

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className={`space-y-1.5 ${className}`}>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          <Languages className="w-3.5 h-3.5 text-[#c8f526]" />
          <span>{t('nav.select_language', undefined, 'Language')}</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => handleSelect(l.code)}
              className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold transition-all text-left ${
                language === l.code
                  ? 'bg-[#c8f526] text-[#071938] shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
              }`}
            >
              <span className="text-base">{l.flag}</span>
              <div className="min-w-0 flex-1">
                <div className="truncate leading-none">{l.nativeName}</div>
                <div className="text-[10px] opacity-75 uppercase font-mono mt-0.5">{l.code}</div>
              </div>
              {language === l.code && <Check className="w-3.5 h-3.5 shrink-0 stroke-[3]" />}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        id="language-selector-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors cursor-pointer select-none"
        title="Select Language (English, Français, Português, Español)"
      >
        <span className="text-sm leading-none">{currentLanguage.flag}</span>
        <span className="uppercase font-bold tracking-wider">{currentLanguage.code}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#c8f526]' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Language selection"
          className="absolute right-0 top-full mt-2 w-64 bg-[#0a1c3b] border border-blue-800/80 rounded-2xl shadow-2xl p-1.5 z-50 animate-fadeIn backdrop-blur-md"
        >
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-blue-900/80 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-[#c8f526]" />
              <span>Language / Langue / Idioma</span>
            </span>
            <span className="text-[#c8f526] font-mono">{languages.length}</span>
          </div>

          <div className="py-1 space-y-0.5 max-h-80 overflow-y-auto">
            {languages.map((l) => {
              const isSelected = language === l.code;
              return (
                <button
                  key={l.code}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => handleSelect(l.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600/30 text-white border border-blue-500/50'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-lg leading-none">{l.flag}</span>
                    <div className="min-w-0">
                      <div className="font-extrabold text-white flex items-center gap-1.5">
                        <span>{l.nativeName}</span>
                        {l.name !== l.nativeName && (
                          <span className="text-[10px] text-slate-400 font-normal">({l.name})</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">{l.region}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-[#c8f526] font-bold">
                      {l.code}
                    </span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#c8f526] stroke-[2.5]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-2 border-t border-blue-900/60 bg-blue-950/40 rounded-xl mt-1 text-[10px] text-slate-400 text-center">
            🌍 Full Pan-African & International Localization
          </div>
        </div>
      )}
    </div>
  );
};
