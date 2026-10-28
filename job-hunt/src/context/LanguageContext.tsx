import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SupportedLanguage, 
  LanguageConfig, 
  SUPPORTED_LANGUAGES, 
  LANGUAGE_LIST, 
  TRANSLATIONS 
} from '../data/translations';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  languageConfig: LanguageConfig;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, defaultText?: string) => string;
  isRtl: boolean;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'nextsoft_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage;
      if (saved && SUPPORTED_LANGUAGES[saved]) {
        return saved;
      }
      // Check browser navigator language
      const browserLang = navigator.language?.slice(0, 2).toLowerCase();
      if (browserLang && SUPPORTED_LANGUAGES[browserLang as SupportedLanguage]) {
        return browserLang as SupportedLanguage;
      }
    }
    return 'en';
  });

  const languageConfig = SUPPORTED_LANGUAGES[currentLanguage] || SUPPORTED_LANGUAGES.en;
  const isRtl = languageConfig.direction === 'rtl';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, currentLanguage);
      } catch {
        // ignore storage errors
      }
      document.documentElement.lang = currentLanguage;
      document.documentElement.dir = languageConfig.direction;
    }
  }, [currentLanguage, languageConfig.direction]);

  const setLanguage = (lang: SupportedLanguage) => {
    if (SUPPORTED_LANGUAGES[lang]) {
      setCurrentLanguageState(lang);
    }
  };

  /**
   * Translation lookup with fallback to English and default text
   */
  const t = (key: string, defaultText?: string): string => {
    const activeDict = TRANSLATIONS[currentLanguage];
    if (activeDict && activeDict[key]) {
      return activeDict[key];
    }
    // Fallback to English dictionary
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        languageConfig,
        setLanguage,
        t,
        isRtl,
        dir: languageConfig.direction
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

export { LANGUAGE_LIST, SUPPORTED_LANGUAGES };
