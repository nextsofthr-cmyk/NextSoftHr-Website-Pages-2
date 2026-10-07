import { enTranslations } from './en';
import { frTranslations } from './fr';
import { ptTranslations } from './pt';
import { esTranslations } from './es';
import { Language, LanguageOption, Translations } from './types';

export * from './types';

export const translations: Record<Language, Translations> = {
  en: enTranslations,
  fr: frTranslations,
  pt: ptTranslations,
  es: esTranslations,
};

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    flag: '🇬🇧',
    region: 'Global / Africa Anglophone',
  },
  {
    code: 'fr',
    label: 'French',
    nativeLabel: 'Français',
    flag: '🇫🇷',
    region: 'Afrique Francophone / Global',
  },
  {
    code: 'pt',
    label: 'Portuguese',
    nativeLabel: 'Português',
    flag: '🇵🇹',
    region: 'África Lusófona / PALOP',
  },
  {
    code: 'es',
    label: 'Spanish',
    nativeLabel: 'Español',
    flag: '🇪🇸',
    region: 'Guinea Ecuatorial / Global',
  },
];
