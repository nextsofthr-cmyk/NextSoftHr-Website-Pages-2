import { SupportedLanguage, TranslationDictionary, SUPPORTED_LANGUAGES } from './types';
import { en } from './translations/en';
import { fr } from './translations/fr';
import { pt } from './translations/pt';
import { es } from './translations/es';

export * from './types';

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en,
  fr,
  pt,
  es
};

/**
 * Nested key accessor with fallback to English
 * Example: getTranslation(translations, 'hero.badgeEdition')
 */
export function getNestedTranslation(obj: any, path: string, fallback?: string): string {
  try {
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
      if (current === undefined || current === null) return fallback || path;
      current = current[key];
    }
    return typeof current === 'string' ? current : fallback || path;
  } catch {
    return fallback || path;
  }
}
