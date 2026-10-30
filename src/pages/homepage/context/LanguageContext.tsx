import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { 
  SupportedLanguage, 
  SUPPORTED_LANGUAGES, 
  LanguageInfo, 
  TranslationDictionary, 
  TRANSLATIONS, 
  getNestedTranslation 
} from '../i18n';
import { 
  initTranslationManager, 
  setGlobalLanguage, 
  getSavedLanguage 
} from '../../../utils/translationManager';

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
export { LanguageContext };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    return getSavedLanguage() as SupportedLanguage;
  });

  useEffect(() => {
    initTranslationManager();
  }, []);

  const setLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    setGlobalLanguage(newLang);
  };

  useEffect(() => {
    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<SupportedLanguage>;
      if (customEvent.detail && (customEvent.detail === 'en' || customEvent.detail === 'fr' || customEvent.detail === 'pt' || customEvent.detail === 'es')) {
        if (customEvent.detail !== language) {
          setLanguageState(customEvent.detail);
        }
      }
    };
    const handleStorage = (e: StorageEvent) => {
      if ((e.key === LANGUAGE_STORAGE_KEY || e.key === 'nextsofthr-lang') && e.newValue) {
        if (e.newValue === 'en' || e.newValue === 'fr' || e.newValue === 'pt' || e.newValue === 'es') {
          setLanguageState(e.newValue as SupportedLanguage);
        }
      }
    };
    window.addEventListener('nextsoft-language-change', handleCustomChange);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('nextsoft-language-change', handleCustomChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, [language]);

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

export function useSafeLanguage(): LanguageContextType | undefined {
  return useContext(LanguageContext);
}

