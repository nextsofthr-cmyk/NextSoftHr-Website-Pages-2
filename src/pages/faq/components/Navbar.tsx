import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  onOpenDemo: () => void;
  onOpenSupport: () => void;
  onOpenAI: () => void;
  onOpenPricing: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDemo,
  onOpenSupport,
  onOpenAI,
  onOpenPricing,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home', 'Home'), href: '#hero' },
    { name: t('nav.hr', 'HR'), href: '#category-hr-management' },
    { name: t('nav.payroll', 'Payroll'), href: '#category-payroll' },
    { name: t('nav.features', 'Features'), href: '#categories-overview' },
    { name: t('nav.solutions', 'Solutions'), href: '#category-business-management' },
    { name: t('nav.pricing', 'Pricing'), href: '#pricing', onClick: onOpenPricing },
    { name: t('nav.resources', 'Resources'), href: '#support-cta' },
    { name: t('nav.partners', 'Partners'), href: '#integrations-section' },
    { name: t('nav.faq', 'FAQ'), href: '#faq-main', current: true },
    { name: t('nav.contact', 'Contact'), href: '#support-cta', onClick: onOpenSupport },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 border-b ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#0B132B]/95 backdrop-blur-md border-slate-200/80 dark:border-slate-800 shadow-xs'
          : 'bg-white dark:bg-[#0B132B] border-slate-100 dark:border-slate-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Left: Brand Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 text-decoration-none group focus-visible:outline-2 focus-visible:outline-blue-600 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center shadow-xs text-white relative overflow-hidden transition-transform duration-200 group-hover:scale-105">
              <span className="font-extrabold text-xl tracking-tight text-white">N</span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-lime-400 rounded-full border-2 border-white dark:border-slate-900" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">NextSoft</span>
                <span className="text-xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">HR</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 -mt-0.5">
                Global Platform
              </span>
            </div>
          </a>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className={`text-sm font-medium transition-colors relative py-1.5 ${
                  link.current
                    ? 'text-blue-700 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.name}
                {link.current && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-500 dark:bg-lime-400 rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Language Selector */}
            <LanguageSelector />

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-lime-300 bg-slate-100 dark:bg-[#111F42] hover:bg-slate-200 dark:hover:bg-[#162752] border border-slate-200 dark:border-slate-700/80 rounded-lg transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-lime-400" />
              )}
            </button>

            <button
              onClick={onOpenAI}
              className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-blue-700 dark:text-lime-300 bg-blue-50/80 dark:bg-[#111F42] hover:bg-blue-100 dark:hover:bg-[#162752] rounded-lg border border-blue-200/60 dark:border-blue-500/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
              <span>{t('nav.askAi', 'Ask AI')}</span>
            </button>

            <button
              onClick={onOpenSupport}
              className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 px-2 py-2 transition-colors whitespace-nowrap"
            >
              {t('nav.signIn', 'Sign In')}
            </button>

            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 bg-white dark:bg-[#111F42] hover:bg-blue-50/60 dark:hover:bg-[#162752] border border-blue-600/30 dark:border-blue-500/40 rounded-lg transition-colors shadow-2xs whitespace-nowrap"
            >
              {t('nav.bookDemo', 'Book a Demo')}
            </button>

            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors shadow-xs whitespace-nowrap"
            >
              <span>{t('nav.getStarted', 'Get Started')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-lime-300" />
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex sm:hidden items-center gap-1.5">
            <LanguageSelector />
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#111F42] rounded-lg"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-lime-400" />
              )}
            </button>
            <button
              onClick={onOpenAI}
              className="p-2 text-blue-700 dark:text-lime-300 bg-blue-50 dark:bg-[#111F42] rounded-lg"
              aria-label="Ask AI"
            >
              <Sparkles className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-[#111F42] rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg ${
                  link.current
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>{link.name}</span>
                {link.current && (
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                )}
              </a>
            ))}
          </div>

          <div className="mb-4">
            <LanguageSelector isMobileDrawer={true} />
          </div>

          <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAI();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-800 dark:text-lime-300 bg-blue-50 dark:bg-[#111F42] border border-blue-200 dark:border-blue-500/30 rounded-lg"
            >
              <Sparkles className="w-4 h-4 text-lime-600 dark:text-lime-400" />
              <span>{t('nav.askAi', 'Ask AI')}</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {t('nav.bookDemo', 'Book a Demo')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full py-2.5 text-sm font-semibold text-white bg-blue-700 dark:bg-blue-600 rounded-lg"
              >
                {t('nav.getStarted', 'Get Started')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

