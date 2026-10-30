/**
 * Global Translation & Language Synchronization Manager
 * 
 * Provides:
 * 1. React DOM protection (prevents removeChild/insertBefore reconciliation crashes when DOM text nodes are translated)
 * 2. Invisible Google Translate engine that automatically translates 100% of the website's body content into
 *    English (en), French (fr), Portuguese (pt), and Spanish (es)
 * 3. Unified cross-page and cross-context language synchronization across all pages
 */

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
    __nextsoft_translation_initialized?: boolean;
    __nextsoft_dom_patched?: boolean;
  }
}

const STORAGE_KEYS = [
  'nextsofthr-language',
  'nextsofthr-lang',
  'nextsofthr_language',
  'nextsoft_language'
];

/**
 * Patch Node.prototype to prevent React reconciliation crashes from external DOM mutation
 */
export function patchReactDomForTranslation() {
  if (typeof window === 'undefined' || window.__nextsoft_dom_patched) return;
  window.__nextsoft_dom_patched = true;

  if (typeof Node === 'function' && Node.prototype) {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
      if (child.parentNode !== this) {
        if (child.parentNode) {
          return child.parentNode.removeChild(child) as T;
        }
        return child;
      }
      return originalRemoveChild.call(this, child) as T;
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
      if (referenceNode && referenceNode.parentNode !== this) {
        if (referenceNode.parentNode) {
          return referenceNode.parentNode.insertBefore(newNode, referenceNode) as T;
        }
        return newNode;
      }
      return originalInsertBefore.call(this, newNode, referenceNode) as T;
    };
  }
}

/**
 * Get current saved language from localStorage or browser
 */
export function getSavedLanguage(): 'en' | 'fr' | 'pt' | 'es' {
  if (typeof window === 'undefined') return 'en';
  try {
    for (const key of STORAGE_KEYS) {
      const val = localStorage.getItem(key);
      if (val === 'en' || val === 'fr' || val === 'pt' || val === 'es') {
        return val;
      }
    }
    const nav = navigator.language?.slice(0, 2).toLowerCase();
    if (nav === 'fr' || nav === 'pt' || nav === 'es') {
      return nav;
    }
  } catch {}
  return 'en';
}

/**
 * Set the googtrans cookie for domain, subdomains, and root path
 */
function setGoogtransCookie(lang: string) {
  if (typeof document === 'undefined') return;
  const cookieVal = lang === 'en' ? '' : `/auto/${lang}`;
  const hostname = window.location.hostname;
  const expire = lang === 'en' ? 'expires=Thu, 01 Jan 1970 00:00:00 UTC;' : 'path=/;';

  document.cookie = `googtrans=${cookieVal}; path=/; ${expire}`;
  document.cookie = `googtrans=${cookieVal}; path=/; domain=${hostname}; ${expire}`;

  if (hostname.includes('.')) {
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      const rootDomain = '.' + parts.slice(-2).join('.');
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${rootDomain}; ${expire}`;
    }
  }
}

/**
 * Trigger the Google Translate dropdown to switch language
 */
function applyGoogleComboLanguage(lang: string): boolean {
  if (typeof document === 'undefined') return false;

  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
  if (select) {
    if (lang === 'en') {
      // Revert to English
      select.value = 'en';
      select.dispatchEvent(new Event('change', { bubbles: true }));

      // Also try clicking "Show original" in banner if present
      try {
        const iframe = document.querySelector('.goog-te-banner-frame') as HTMLIFrameElement;
        if (iframe && iframe.contentDocument) {
          const btn = iframe.contentDocument.querySelector('.goog-te-button button') as HTMLButtonElement;
          if (btn) btn.click();
        }
      } catch {}
      return true;
    } else {
      select.value = lang;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    }
  }
  return false;
}

/**
 * Initialize Google Translate Script and Elements
 */
export function initTranslationManager() {
  if (typeof window === 'undefined') return;

  patchReactDomForTranslation();

  if (window.__nextsoft_translation_initialized) return;
  window.__nextsoft_translation_initialized = true;

  const initialLang = getSavedLanguage();
  setGoogtransCookie(initialLang);

  // Ensure container exists
  let container = document.getElementById('google_translate_element');
  if (!container) {
    container = document.createElement('div');
    container.id = 'google_translate_element';
    container.style.display = 'none';
    container.style.position = 'absolute';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    document.body.appendChild(container);
  }

  // Define Google Translate Init Callback
  window.googleTranslateElementInit = function () {
    try {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'auto',
          includedLanguages: 'en,fr,pt,es',
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );

      // Once initialized, if language is not English, ensure combo is selected
      const saved = getSavedLanguage();
      setTimeout(() => {
        applyGoogleComboLanguage(saved);
      }, 300);
    } catch (e) {
      console.warn('Google Translate init notice:', e);
    }
  };

  // Inject Script if not present
  if (!document.getElementById('google-translate-script')) {
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
  }
}

/**
 * Switch global language across the entire application:
 * 1. Saves to all localStorage keys
 * 2. Updates document.documentElement.lang
 * 3. Applies Google Translate cookie and changes combo
 * 4. Dispatches custom event for all page LanguageProviders
 */
export function setGlobalLanguage(lang: 'en' | 'fr' | 'pt' | 'es') {
  if (typeof window === 'undefined') return;

  // 1. Save to local storage
  try {
    for (const key of STORAGE_KEYS) {
      localStorage.setItem(key, lang);
    }
    document.documentElement.lang = lang;
  } catch {}

  // 2. Set cookies & trigger Google Translate
  setGoogtransCookie(lang);
  const applied = applyGoogleComboLanguage(lang);

  // If select was not found yet, retry after a short delay
  if (!applied) {
    setTimeout(() => {
      applyGoogleComboLanguage(lang);
    }, 500);
  }

  // 3. Dispatch global custom event for React contexts
  window.dispatchEvent(new CustomEvent('nextsoft-language-change', { detail: lang }));
}

/**
 * Re-trigger translation on dynamic route change if needed
 */
export function reapplyLanguageOnRouteChange() {
  if (typeof window === 'undefined') return;
  const currentLang = getSavedLanguage();
  if (currentLang !== 'en') {
    setTimeout(() => {
      applyGoogleComboLanguage(currentLang);
    }, 200);
  }
}
