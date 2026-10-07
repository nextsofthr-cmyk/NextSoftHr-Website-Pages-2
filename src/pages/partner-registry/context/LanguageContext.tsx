import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  SupportedLanguage, 
  LanguageInfo, 
  SUPPORTED_LANGUAGES, 
  TRANSLATIONS 
} from '../data/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languages: LanguageInfo[];
  currentLanguage: LanguageInfo;
  t: (key: string, variables?: Record<string, string | number>, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsofthr_language');
      if (saved && (saved === 'en' || saved === 'fr' || saved === 'pt' || saved === 'es')) {
        return saved as SupportedLanguage;
      }
      // Check browser language
      const browserLang = navigator.language?.slice(0, 2).toLowerCase();
      if (browserLang === 'fr') return 'fr';
      if (browserLang === 'pt') return 'pt';
      if (browserLang === 'es') return 'es';
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nextsofthr_language', lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const currentLanguage = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const t = (key: string, variables?: Record<string, string | number>, fallback?: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS['en'];
    let text = dict[key] || TRANSLATIONS['en'][key] || fallback || key;

    if (variables) {
      Object.entries(variables).forEach(([k, val]) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(val));
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        languages: SUPPORTED_LANGUAGES,
        currentLanguage,
        t
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
