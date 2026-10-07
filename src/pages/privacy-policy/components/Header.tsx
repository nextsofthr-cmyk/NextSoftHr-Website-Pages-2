import React, { useState } from 'react';
import { Menu, X, ShieldCheck, Settings } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { Theme } from '../hooks/useTheme';
import { Language, LanguageOption, Translations } from '../translations';

interface HeaderProps {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  languageOptions: LanguageOption[];
  t: Translations;
  onOpenPrivacyModal: () => void;
  onOpenAdminModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  resolvedTheme,
  onToggleTheme,
  currentLanguage,
  onSelectLanguage,
  languageOptions,
  t,
  onOpenPrivacyModal,
  onOpenAdminModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#090e1a]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.nextsofthr.org"
              className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-opacity hover:opacity-90"
              aria-label="NextSoftHR Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F52BA] to-[#0A3982] flex items-center justify-center text-white shadow-sm ring-1 ring-[#0F52BA]/20 dark:ring-white/20">
                <span className="font-extrabold text-[#84CC16] text-lg leading-none">N</span>
              </div>
              <span className="font-display text-xl text-slate-900 dark:text-white font-extrabold tracking-tight">
                NextSoft<span className="text-[#0F52BA] dark:text-[#60A5FA]">HR</span>
              </span>
            </a>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a
              href="https://www.nextsofthr.org#platform"
              className="hover:text-[#0F52BA] dark:hover:text-[#60A5FA] transition-colors py-1 hover:underline underline-offset-4 decoration-[#84CC16] decoration-2"
            >
              {t.nav.platform}
            </a>
            <a
              href="https://www.nextsofthr.org#modules"
              className="hover:text-[#0F52BA] dark:hover:text-[#60A5FA] transition-colors py-1 hover:underline underline-offset-4 decoration-[#84CC16] decoration-2"
            >
              {t.nav.hrPayroll}
            </a>
            <a
              href="#data-storage-security"
              className="hover:text-[#0F52BA] dark:hover:text-[#60A5FA] transition-colors py-1 hover:underline underline-offset-4 decoration-[#84CC16] decoration-2"
            >
              {t.nav.trustSecurity}
            </a>
            <a
              href="https://www.nextsofthr.org#resources"
              className="hover:text-[#0F52BA] dark:hover:text-[#60A5FA] transition-colors py-1 hover:underline underline-offset-4 decoration-[#84CC16] decoration-2"
            >
              {t.nav.resources}
            </a>
            <a
              href="#contact-us"
              className="hover:text-[#0F52BA] dark:hover:text-[#60A5FA] transition-colors py-1 hover:underline underline-offset-4 decoration-[#84CC16] decoration-2"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Zone 3: Actions + Language Selector + Theme toggle */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Selector */}
            <LanguageSelector
              currentLanguage={currentLanguage}
              onSelectLanguage={onSelectLanguage}
              options={languageOptions}
            />

            {/* Theme Toggle Button */}
            <ThemeToggle
              theme={theme}
              resolvedTheme={resolvedTheme}
              onToggle={onToggleTheme}
            />

            <button
              onClick={onOpenAdminModal}
              title="Admin Policy Configuration"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1.5"
              aria-label="Admin settings"
            >
              <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="hidden xl:inline text-xs font-medium">{t.nav.policyAdmin}</span>
            </button>

            <a
              href="https://www.nextsofthr.org/signin"
              className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#0F52BA] dark:hover:text-[#60A5FA] hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-lg transition-colors whitespace-nowrap"
            >
              {t.nav.signIn}
            </a>

            <button
              onClick={onOpenPrivacyModal}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0F52BA] hover:bg-[#0A3982] active:scale-[0.98] rounded-lg shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>{t.nav.privacyDesk}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#84CC16]" />
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-1.5">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onSelectLanguage={onSelectLanguage}
              options={languageOptions}
              isCompact={true}
            />
            <ThemeToggle
              theme={theme}
              resolvedTheme={resolvedTheme}
              onToggle={onToggleTheme}
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1325] px-4 pt-2 pb-6 space-y-3 transition-colors">
          <nav className="flex flex-col space-y-2 pt-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <a
              href="https://www.nextsofthr.org"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              {t.nav.platformOverview}
            </a>
            <a
              href="#data-storage-security"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              {t.nav.securityArch}
            </a>
            <a
              href="#your-privacy-rights"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              {t.nav.yourRights}
            </a>
            <a
              href="#contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              {t.nav.contactDpo}
            </a>
          </nav>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminModal();
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md flex items-center justify-between"
            >
              <span>{t.nav.policyAdmin}</span>
              <Settings className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPrivacyModal();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#0F52BA] rounded-lg shadow-sm"
            >
              {t.nav.submitRequest}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
