import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, LANGUAGES, TRANSLATIONS, LanguageInfo } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  currentLanguageInfo: LanguageInfo;
  availableLanguages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsofthr-lang') as Language;
      if (saved && (saved === 'en' || saved === 'fr' || saved === 'pt' || saved === 'es')) {
        return saved;
      }
      // Check browser navigator language
      const browserLang = navigator.language?.toLowerCase() || '';
      if (browserLang.startsWith('fr')) return 'fr';
      if (browserLang.startsWith('pt')) return 'pt';
      if (browserLang.startsWith('es')) return 'es';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nextsofthr-lang', lang);
      document.documentElement.setAttribute('lang', lang);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('lang', language);
    }
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: TRANSLATIONS[language] || TRANSLATIONS.en,
    currentLanguageInfo: LANGUAGES[language] || LANGUAGES.en,
    availableLanguages: LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
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
