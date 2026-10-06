import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
  TRANSLATIONS,
  LanguageOption,
} from '../data/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string, params?: Record<string, string>) => string;
  currentLanguageOption: LanguageOption;
  availableLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nextsofthr_language') as SupportedLanguage | null;
      if (stored && ['en', 'fr', 'pt', 'es'].includes(stored)) {
        return stored;
      }
      // Check browser language
      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      if (['fr', 'pt', 'es'].includes(browserLang)) {
        return browserLang as SupportedLanguage;
      }
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nextsofthr_language', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
  };

  const t = (key: string, fallback?: string, params?: Record<string, string>): string => {
    const langDict = TRANSLATIONS[language];
    let text = (langDict && langDict[key]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) || fallback || key;
    if (params) {
      Object.entries(params).forEach(([pKey, pVal]) => {
        text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), pVal);
      });
    }
    return text;
  };

  const currentLanguageOption =
    SUPPORTED_LANGUAGES.find((opt) => opt.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentLanguageOption,
        availableLanguages: SUPPORTED_LANGUAGES,
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
