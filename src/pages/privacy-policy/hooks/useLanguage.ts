import { useState, useEffect } from 'react';
import { Language, translations, LANGUAGE_OPTIONS } from '../translations';

export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('nextsoft_language') as Language;
    if (saved && (saved === 'en' || saved === 'fr' || saved === 'pt' || saved === 'es')) {
      return saved;
    }
    // Auto-detect browser language
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      if (browserLang === 'fr') return 'fr';
      if (browserLang === 'pt') return 'pt';
      if (browserLang === 'es') return 'es';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nextsoft_language', lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = translations[language];

  return {
    language,
    setLanguage,
    t,
    options: LANGUAGE_OPTIONS,
  };
};
