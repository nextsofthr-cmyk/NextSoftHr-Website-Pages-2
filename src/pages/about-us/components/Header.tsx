import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../data/contentData';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenDemo: () => void;
  onOpenContact: () => void;
  onOpenGetStarted: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDemo,
  onOpenContact,
  onOpenGetStarted,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { translations } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#0A2540] dark:bg-[#050e18] text-slate-300 text-xs py-2 px-4 border-b border-blue-900/40 relative z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#84CC16]/20 text-[#84CC16] px-2 py-0.5 rounded-full font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              {translations.announcementBadge}
            </span>
            <span className="hidden sm:inline text-slate-400">
              {translations.announcementSub}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-[#84CC16] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#84CC16]" />
              <span className="font-medium">{BRAND.phoneDisplay}</span>
            </a>
            <span className="text-slate-600 dark:text-slate-700">|</span>
            <button
              onClick={onOpenContact}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {translations.supportLink}
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#071322]/95 backdrop-blur-md shadow-md border-b border-slate-100 dark:border-slate-800/80 py-3.5'
            : 'bg-white dark:bg-[#071322] border-b border-slate-100 dark:border-slate-800/80 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0B3B73] to-[#0A2540] dark:from-[#0f4a8f] dark:to-[#0B2544] flex items-center justify-center shadow-md shadow-blue-950/10 border border-blue-800/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-xl tracking-tight">N</span>
              <span className="w-2 h-2 rounded-full bg-[#84CC16] -ml-1 -mt-3 ring-2 ring-white dark:ring-[#071322]"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-[#0A2540] dark:text-white flex items-center">
                Next<span className="text-[#0B3B73] dark:text-[#38BDF8]">Softhr</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider -mt-1">
                HR • Payroll • Operations
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  link.isCurrent
                    ? 'text-[#0B3B73] dark:text-[#84CC16] font-semibold bg-blue-50/80 dark:bg-blue-950/60'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#0B3B73] dark:hover:text-[#84CC16] hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                {translations.navLinks[link.label] || link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTAs, Language Switcher & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Language Switcher Dropdown */}
            <LanguageSwitcher />

            <ThemeToggle />

            <button
              onClick={onOpenDemo}
              className="text-sm font-semibold text-[#0A2540] dark:text-slate-200 hover:text-[#0B3B73] dark:hover:text-[#84CC16] px-3.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {translations.signIn}
            </button>

            <button
              onClick={onOpenGetStarted}
              className="inline-flex items-center justify-center gap-2 bg-[#84CC16] hover:bg-[#74be12] text-[#0A2540] text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all group cursor-pointer"
            >
              <span>{translations.getStarted}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="lg:hidden flex items-center gap-1.5">
            <LanguageSwitcher compact />
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#0A192F] border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-xl transition-colors duration-300">
            {/* Language selection banner for mobile */}
            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-[#11243E] rounded-xl border border-slate-200/80 dark:border-blue-900/40">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                Language / Langue:
              </span>
              <LanguageSwitcher />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    link.isCurrent
                      ? 'text-[#0B3B73] dark:text-[#84CC16] font-bold bg-blue-50 dark:bg-blue-950/60'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {translations.navLinks[link.label] || link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-[#0A2540] dark:text-slate-100 bg-slate-100 dark:bg-slate-800"
              >
                {translations.signIn} / Book Demo
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGetStarted();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold bg-[#84CC16] text-[#0A2540] shadow"
              >
                <span>{translations.getStarted}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
