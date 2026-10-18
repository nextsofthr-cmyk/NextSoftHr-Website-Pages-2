import { useLanguage } from '../../homepage/context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

/**
 * The active language comes from the shared homepage LanguageProvider (so the
 * homepage LanguageSelector drives it); strings come from this page's dictionary.
 */
export const useCommissionLanguage = () => {
  const { language } = useLanguage();

  const t = (key: string, fallback?: string): string =>
    TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || fallback || key;

  return { language, t };
};
