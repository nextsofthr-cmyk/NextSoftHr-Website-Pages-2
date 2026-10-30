import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, UITranslations } from './types';
import { UI_TRANSLATIONS, LANGUAGES_LIST } from './translations';
import { getLocalizedSections, METADATA_TRANSLATIONS } from './termsContentTranslations';
import { TermSection } from '../data/termsData';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: UITranslations;
  sections: TermSection[];
  metadata: { lastUpdated: string; effectiveDate: string; version: string };
  availableLanguages: typeof LANGUAGES_LIST;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const saved = (localStorage.getItem('nextsofthr-language') ||
                     localStorage.getItem('nextsofthr-lang') ||
                     localStorage.getItem('nextsofthr_language')) as SupportedLanguage;
      if (saved && (saved === 'en' || saved === 'fr' || saved === 'pt' || saved === 'es')) {
        return saved;
      }
      // Check browser languages
      const browserLang = navigator.language?.slice(0, 2);
      if (browserLang === 'fr' || browserLang === 'pt' || browserLang === 'es') {
        return browserLang as SupportedLanguage;
      }
    }
    return 'en';
  });

  useEffect(() => {
    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<SupportedLanguage>;
      if (customEvent.detail && (customEvent.detail === 'en' || customEvent.detail === 'fr' || customEvent.detail === 'pt' || customEvent.detail === 'es')) {
        setLanguageState(customEvent.detail);
      }
    };
    window.addEventListener('nextsoft-language-change', handleCustomChange);
    return () => window.removeEventListener('nextsoft-language-change', handleCustomChange);
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('nextsofthr-language', lang);
      localStorage.setItem('nextsofthr-lang', lang);
      window.dispatchEvent(new CustomEvent('nextsoft-language-change', { detail: lang }));
    } catch {
      // ignore
    }
  };

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const sections = getLocalizedSections(language);
  const metadata = METADATA_TRANSLATIONS[language] || METADATA_TRANSLATIONS.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        sections,
        metadata,
        availableLanguages: LANGUAGES_LIST
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
