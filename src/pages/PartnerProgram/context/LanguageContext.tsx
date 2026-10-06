import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  LanguageInfo,
  SUPPORTED_LANGUAGES,
  translations,
} from '../translations/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentLanguage: LanguageInfo;
  supportedLanguages: LanguageInfo[];
  isRTL: boolean;
  t: (keyPath: string, fallback?: string) => string;
  strings: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('nextsofthr_language') as Language;
      if (savedLang && (savedLang === 'en' || savedLang === 'fr' || savedLang === 'ar')) {
        return savedLang;
      }
      // Check browser language
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith('fr')) return 'fr';
      if (navLang.startsWith('ar')) return 'ar';
    }
    return 'en';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');

    if (language === 'ar') {
      root.classList.add('rtl-mode');
    } else {
      root.classList.remove('rtl-mode');
    }

    localStorage.setItem('nextsofthr_language', language);
  }, [language]);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((item) => item.code === language) || SUPPORTED_LANGUAGES[0];

  const currentStrings = translations[language] || translations.en;

  // Helper function to resolve nested keys like "nav.program"
  const t = (keyPath: string, fallback?: string): string => {
    const parts = keyPath.split('.');
    let current: any = currentStrings;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        // Fallback to English if missing
        let enCurrent: any = translations.en;
        for (const p of parts) {
          if (enCurrent && typeof enCurrent === 'object' && p in enCurrent) {
            enCurrent = enCurrent[p];
          } else {
            return fallback || keyPath;
          }
        }
        return typeof enCurrent === 'string' ? enCurrent : fallback || keyPath;
      }
    }
    return typeof current === 'string' ? current : fallback || keyPath;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLanguage,
        supportedLanguages: SUPPORTED_LANGUAGES,
        isRTL: language === 'ar',
        t,
        strings: currentStrings,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
