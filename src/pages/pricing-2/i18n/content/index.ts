import { LanguageCode } from '../../types';
import fr from './fr';
import pt from './pt';
import es from './es';
import frOverlays from './overlays/fr';
import ptOverlays from './overlays/pt';
import esOverlays from './overlays/es';

/**
 * Phrase dictionaries for page content (section copy + data in pricingData.ts) and for
 * overlays (modals, checkout, cart, chat & WhatsApp widgets, currency picker).
 * Keys are the exact English source strings; missing keys fall back to English.
 * `{name}` style placeholders are filled from `params`.
 */
const CONTENT: Partial<Record<LanguageCode, Record<string, string>>> = {
  fr: { ...fr, ...frOverlays },
  pt: { ...pt, ...ptOverlays },
  es: { ...es, ...esOverlays },
};

export const translateContent = (
  language: LanguageCode,
  text: string,
  params?: Record<string, string | number>
): string => {
  let result = CONTENT[language]?.[text] ?? text;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      result = result.split(`{${key}}`).join(String(value));
    }
  }
  return result;
};
