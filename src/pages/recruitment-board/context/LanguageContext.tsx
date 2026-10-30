import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SupportedLanguage, 
  LanguageConfig, 
  SUPPORTED_LANGUAGES, 
  LANGUAGE_LIST, 
  TRANSLATIONS 
} from '../data/translations';
import { 
  initTranslationManager, 
  setGlobalLanguage, 
  getSavedLanguage 
} from '../../../utils/translationManager';

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
    const saved = getSavedLanguage();
    if (saved && SUPPORTED_LANGUAGES[saved as SupportedLanguage]) {
      return saved as SupportedLanguage;
    }
    if (typeof window !== 'undefined') {
      const localSaved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage;
      if (localSaved && SUPPORTED_LANGUAGES[localSaved]) {
        return localSaved;
      }
    }
    return 'en';
  });

  useEffect(() => {
    initTranslationManager();
  }, []);

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

  useEffect(() => {
    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const newLang = customEvent.detail as SupportedLanguage;
      if (newLang && SUPPORTED_LANGUAGES[newLang] && newLang !== currentLanguage) {
        setCurrentLanguageState(newLang);
      }
    };
    window.addEventListener('nextsoft-language-change', handleCustomChange);
    return () => window.removeEventListener('nextsoft-language-change', handleCustomChange);
  }, [currentLanguage]);

  const setLanguage = (lang: SupportedLanguage) => {
    if (SUPPORTED_LANGUAGES[lang]) {
      setCurrentLanguageState(lang);
      const langStr = lang as string;
      if (langStr === 'en' || langStr === 'fr' || langStr === 'pt' || langStr === 'es') {
        setGlobalLanguage(langStr);
      }
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
