import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  LanguageCode,
  LanguageInfo,
  SUPPORTED_LANGUAGES,
  TRANSLATIONS,
} from '../data/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLanguage: LanguageInfo;
  availableLanguages: LanguageInfo[];
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const stored = (localStorage.getItem('nextsofthr-language') || 
                      localStorage.getItem('nextsofthr-lang') || 
                      localStorage.getItem('nextsofthr_language')) as LanguageCode | null;
      if (stored && (stored === 'en' || stored === 'fr' || stored === 'pt' || stored === 'es')) {
        return stored;
      }
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'fr' || browserLang === 'pt' || browserLang === 'es') {
        return browserLang as LanguageCode;
      }
      return 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<LanguageCode>;
      if (customEvent.detail && (customEvent.detail === 'en' || customEvent.detail === 'fr' || customEvent.detail === 'pt' || customEvent.detail === 'es')) {
        setLanguageState(customEvent.detail);
      }
    };
    window.addEventListener('nextsoft-language-change', handleCustomChange);
    return () => window.removeEventListener('nextsoft-language-change', handleCustomChange);
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    if (lang === 'en' || lang === 'fr' || lang === 'pt' || lang === 'es') {
      setLanguageState(lang);
      try {
        localStorage.setItem('nextsofthr-language', lang);
        localStorage.setItem('nextsofthr-lang', lang);
        window.dispatchEvent(new CustomEvent('nextsoft-language-change', { detail: lang }));
      } catch {}
    }
  };

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback !== undefined ? fallback : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLanguage,
        availableLanguages: SUPPORTED_LANGUAGES,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
