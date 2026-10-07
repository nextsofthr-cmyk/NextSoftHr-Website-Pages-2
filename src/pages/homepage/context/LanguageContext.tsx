import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { 
  SupportedLanguage, 
  SUPPORTED_LANGUAGES, 
  LanguageInfo, 
  TranslationDictionary, 
  TRANSLATIONS, 
  getNestedTranslation 
} from '../i18n';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languages: LanguageInfo[];
  currentLanguageInfo: LanguageInfo;
  t: (key: string, params?: Record<string, string | number>, fallback?: string) => string;
  dict: TranslationDictionary;
}

const LANGUAGE_STORAGE_KEY = 'nextsofthr-language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (saved && (saved === 'en' || saved === 'fr' || saved === 'pt' || saved === 'es')) {
          return saved as SupportedLanguage;
        }
        // Detect browser navigator language
        const browserLang = navigator.language || (navigator as any).userLanguage || '';
        const prefix = browserLang.toLowerCase().slice(0, 2);
        if (prefix === 'fr') return 'fr';
        if (prefix === 'pt') return 'pt';
        if (prefix === 'es') return 'es';
      } catch {}
    }
    return 'en';
  });

  const setLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
        document.documentElement.lang = newLang;
      } catch {}
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const dict = useMemo(() => {
    return TRANSLATIONS[language] || TRANSLATIONS.en;
  }, [language]);

  const currentLanguageInfo = useMemo(() => {
    return SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  }, [language]);

  const t = (key: string, params?: Record<string, string | number>, fallback?: string): string => {
    let text = getNestedTranslation(dict, key, '');
    if (!text) {
      // Fallback to English dictionary
      text = getNestedTranslation(TRANSLATIONS.en, key, fallback || key);
    }

    if (params && typeof text === 'string') {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
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
        currentLanguageInfo,
        t,
        dict
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
