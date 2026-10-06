import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LanguageKey } from '../data/translations';
import { useToast } from './ToastNotification';

interface LanguageSelectorProps {
  currentLang: LanguageKey;
  onLanguageChange: (lang: LanguageKey) => void;
  variant?: 'light' | 'dark';
}

const languages: { key: LanguageKey; label: string; flag: string; native: string }[] = [
  { key: 'en', label: 'English', flag: '🇬🇧', native: 'English' },
  { key: 'fr', label: 'French', flag: '🇫🇷', native: 'Français' },
  { key: 'pt', label: 'Portuguese', flag: '🇵🇹', native: 'Português' },
  { key: 'ar', label: 'Arabic', flag: '🇸🇦', native: 'العربية' },
  { key: 'es', label: 'Spanish', flag: '🇪🇸', native: 'Español' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onLanguageChange,
  variant = 'light',
}) => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = languages.find((l) => l.key === currentLang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
          variant === 'dark'
            ? 'bg-white/10 hover:bg-white/15 text-white border-white/20'
            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/80 shadow-xs dark:bg-[#1b2a47] dark:hover:bg-[#233559] dark:text-slate-100 dark:border-white/15'
        }`}
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5 text-[#0056b3] dark:text-[#caff33]" />
        <span>{selected.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-300 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 origin-top-right rounded-xl bg-white dark:bg-[#0f1c33] shadow-xl ring-1 ring-black/5 dark:ring-white/10 border border-slate-100 dark:border-white/10 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
            Select Language
          </div>
          {languages.map((lang) => {
            const isCurrent = lang.key === currentLang;
            return (
              <button
                key={lang.key}
                type="button"
                onClick={() => {
                  if (lang.key !== currentLang) {
                    onLanguageChange(lang.key);
                    toast.success(`Workspace language changed to ${lang.label} (${lang.native})`, {
                      title: 'Language Updated',
                      duration: 3500,
                    });
                  }
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                  isCurrent
                    ? 'bg-[#f0f7ff] text-[#0056b3] font-semibold dark:bg-[#0056b3]/30 dark:text-[#caff33]'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{lang.flag}</span>
                  <div>
                    <div>{lang.label}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-400 font-normal">
                      {lang.native}
                    </div>
                  </div>
                </div>
                {isCurrent && (
                  <Check className="w-4 h-4 text-[#0056b3] dark:text-[#caff33]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default LanguageSelector;
