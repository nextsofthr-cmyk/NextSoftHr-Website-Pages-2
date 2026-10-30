import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, LanguageConfig } from '../types';
import { translations, LANGUAGES, TranslationDictionary } from '../i18n/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationDictionary;
  currentLanguageConfig: LanguageConfig;
  allLanguages: Record<LanguageCode, LanguageConfig>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const globalSaved = localStorage.getItem('nextsofthr-language') as LanguageCode;
      if (globalSaved && (globalSaved === 'en' || globalSaved === 'fr' || globalSaved === 'pt' || globalSaved === 'es')) {
        return globalSaved;
      }
      const saved = localStorage.getItem('nextsofthr-lang') as LanguageCode;
      if (saved && (saved === 'en' || saved === 'fr' || saved === 'pt' || saved === 'es')) {
        return saved;
      }
      const browserLang = navigator.language?.slice(0, 2).toLowerCase();
      if (browserLang === 'fr') return 'fr';
      if (browserLang === 'pt') return 'pt';
      if (browserLang === 'es') return 'es';
    }
    return 'en';
  });

  useEffect(() => {
    const handleCustom = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && (customEvent.detail === 'en' || customEvent.detail === 'fr' || customEvent.detail === 'pt' || customEvent.detail === 'es')) {
        setLanguageState(customEvent.detail as LanguageCode);
      }
    };
    const handleStorage = (e: StorageEvent) => {
      if ((e.key === 'nextsofthr-language' || e.key === 'nextsofthr-lang') && e.newValue) {
        if (e.newValue === 'en' || e.newValue === 'fr' || e.newValue === 'pt' || e.newValue === 'es') {
          setLanguageState(e.newValue as LanguageCode);
        }
      }
    };
    window.addEventListener('nextsoft-language-change', handleCustom);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('nextsoft-language-change', handleCustom);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nextsofthr-language', lang);
      localStorage.setItem('nextsofthr-lang', lang);
      document.documentElement.lang = lang;
      window.dispatchEvent(new CustomEvent('nextsoft-language-change', { detail: lang }));
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language] as TranslationDictionary,
    currentLanguageConfig: LANGUAGES[language],
    allLanguages: LANGUAGES,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
