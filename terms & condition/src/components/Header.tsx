import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { NextSoftHRLogo } from './NextSoftHRLogo';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';

interface HeaderProps {
  onContactClick: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onContactClick, theme, onToggleTheme }) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.navHome, href: 'https://www.nextsofthr.org' },
    { label: t.navFeatures, href: '#features' },
    { label: t.navSolutions, href: '#solutions' },
    { label: t.navPricing, href: '#pricing' },
    { label: t.navPartners, href: '#partners' },
    { label: t.navResources, href: '#resources' },
    { label: t.navAboutUs, href: '#about' },
    { label: t.navContact, href: '#contact', onClick: onContactClick },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 no-print ${
        scrolled
          ? 'bg-white/95 dark:bg-[#0a0f1d]/95 backdrop-blur-md shadow-xs border-b border-slate-200/90 dark:border-slate-800/90 py-3.5'
          : 'bg-white dark:bg-[#070d18] border-b border-slate-100 dark:border-slate-800/70 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Official Brand Logo */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.nextsofthr.org"
              className="focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md py-0.5"
              title="NextSoftHR - Global HR, Payroll & Business Management"
            >
              <NextSoftHRLogo size="md" variant="auto" />
            </a>

            {/* Global Region Indicator */}
            <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pl-4 border-l border-slate-200 dark:border-slate-800">
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{t.editionBadge}</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {/* International Language Selector */}
            <LanguageSelector />

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-lg transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#84cc16] transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
              )}
            </button>

            <button
              type="button"
              onClick={onContactClick}
              className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {t.signIn}
            </button>
            <a
              href="#subscription-plans"
              className="inline-flex items-center justify-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2 rounded-lg shadow-xs hover:shadow-sm transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 group"
            >
              <span>{t.getStarted}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16] ml-2 group-hover:scale-125 transition-transform" />
            </a>
          </div>

          {/* Mobile Right Controls: Language Selector + Theme Toggle + Hamburger Toggle */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <LanguageSelector />

            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#84cc16]" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-800 dark:text-slate-200" /> : <Menu className="w-6 h-6 text-slate-800 dark:text-slate-200" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#0a0f1d]/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="px-3 py-2.5 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full text-center py-2.5 px-4 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {t.signIn}
            </button>
            <a
              href="#subscription-plans"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-2.5 px-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
            >
              <span>{t.getStarted}</span>
              <span className="w-2 h-2 rounded-full bg-[#84cc16] ml-2" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
