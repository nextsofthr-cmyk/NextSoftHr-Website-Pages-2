import React, { useState, useEffect } from 'react';
import { X, Check, Cookie } from 'lucide-react';
import { CookieSettings } from '../types/privacy';
import { Translations } from '../translations';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
}

export const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({
  isOpen,
  onClose,
  t,
}) => {
  const [settings, setSettings] = useState<CookieSettings>(() => {
    const saved = localStorage.getItem('nextsoft_cookie_prefs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // default
      }
    }
    return {
      essential: true,
      functional: true,
      analytics: true,
      marketing: false,
    };
  });

  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSavedNotice(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('nextsoft_cookie_prefs', JSON.stringify(settings));
    setSavedNotice(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleAcceptAll = () => {
    const all = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setSettings(all);
    localStorage.setItem('nextsoft_cookie_prefs', JSON.stringify(all));
    setSavedNotice(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleRejectNonEssential = () => {
    const minimal = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setSettings(minimal);
    localStorage.setItem('nextsoft_cookie_prefs', JSON.stringify(minimal));
    setSavedNotice(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0c1527] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/70 dark:bg-[#090e1a]/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-[#0F52BA] dark:text-[#60A5FA]">
              <Cookie className="w-5 h-5 text-[#0F52BA] dark:text-[#60A5FA]" />
            </div>
            <div>
              <h3 id="cookie-modal-title" className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                {t.cookiesModal.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.cookiesModal.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.cookiesModal.intro}
          </p>

          {/* Cookie Item 1: Essential */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#080d19] flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {t.cookiesModal.essentialTitle}
                </span>
                <span className="text-[10px] font-semibold text-[#0F52BA] dark:text-[#60A5FA] bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/60">
                  {t.cookiesModal.essentialTag}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.cookiesModal.essentialDesc}
              </p>
            </div>
            <div className="shrink-0 pt-0.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 cursor-not-allowed">
                {t.cookiesModal.alwaysActive}
              </span>
            </div>
          </div>

          {/* Cookie Item 2: Functional */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#0c1527] transition-colors flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {t.cookiesModal.functionalTitle}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.cookiesModal.functionalDesc}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 pt-1">
              <input
                type="checkbox"
                checked={settings.functional}
                onChange={(e) =>
                  setSettings({ ...settings, functional: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F52BA] dark:peer-checked:bg-[#2563EB]"></div>
            </label>
          </div>

          {/* Cookie Item 3: Analytics */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#0c1527] transition-colors flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {t.cookiesModal.analyticsTitle}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.cookiesModal.analyticsDesc}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 pt-1">
              <input
                type="checkbox"
                checked={settings.analytics}
                onChange={(e) =>
                  setSettings({ ...settings, analytics: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F52BA] dark:peer-checked:bg-[#2563EB]"></div>
            </label>
          </div>

          {/* Cookie Item 4: Marketing */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#0c1527] transition-colors flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {t.cookiesModal.marketingTitle}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.cookiesModal.marketingDesc}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 pt-1">
              <input
                type="checkbox"
                checked={settings.marketing}
                onChange={(e) =>
                  setSettings({ ...settings, marketing: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F52BA] dark:peer-checked:bg-[#2563EB]"></div>
            </label>
          </div>

          {savedNotice && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-lg flex items-center gap-2 text-xs font-medium text-emerald-800 dark:text-emerald-300">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t.cookiesModal.savedSuccess}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-[#080d19] border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={handleRejectNonEssential}
            className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            {t.cookiesModal.rejectOptional}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0c1527] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              {t.cookiesModal.acceptAll}
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0F52BA] hover:bg-[#0A3982] rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              {t.cookiesModal.savePreferences}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
