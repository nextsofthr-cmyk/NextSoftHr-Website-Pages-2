import React, { useState } from 'react';
import { Phone, Menu, X, ArrowUpRight, Search } from 'lucide-react';
import { NextSoftLogo } from './NextSoftLogo';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  onOpenRefundModal: () => void;
  onOpenPartnerModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRefundModal,
  onOpenPartnerModal,
  searchQuery,
  onSearchChange,
  isDark,
  onToggleTheme,
  currentLang,
  onSelectLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Zone 1: Single Brand Element */}
          <a
            href="https://www.nextsofthr.org"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3B7B] rounded-lg shrink-0"
            title="NextSoftHR Homepage"
          >
            <NextSoftLogo size="md" />
          </a>

          {/* Zone 2: Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a
              href="#overview"
              className="hover:text-[#0A3B7B] dark:hover:text-[#38BDF8] transition-colors whitespace-nowrap"
            >
              {t.nav.overview}
            </a>
            <a
              href="#customer-policy"
              className="hover:text-[#0A3B7B] dark:hover:text-[#38BDF8] transition-colors whitespace-nowrap"
            >
              {t.nav.customers}
            </a>
            <a
              href="#partner-policy"
              className="hover:text-[#0A3B7B] dark:hover:text-[#38BDF8] transition-colors whitespace-nowrap"
            >
              {t.nav.partners}
            </a>
            <a
              href="#commercial-terms"
              className="hover:text-[#0A3B7B] dark:hover:text-[#38BDF8] transition-colors whitespace-nowrap"
            >
              {t.nav.commercial}
            </a>
            <a
              href="#faq-section"
              className="hover:text-[#0A3B7B] dark:hover:text-[#38BDF8] transition-colors whitespace-nowrap"
            >
              {t.nav.faqs}
            </a>
            <a
              href="#contact-desk"
              className="hover:text-[#0A3B7B] dark:hover:text-[#38BDF8] transition-colors whitespace-nowrap"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Zone 3: Primary Action Controls + Language Selector + Theme Switcher */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3">
            <a
              href="tel:+2349158482622"
              className="hidden 2xl:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0A3B7B] dark:hover:text-[#38BDF8] transition-colors px-2 py-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#84CC16]" />
              <span className="tabular-nums">+2349158482622</span>
            </a>

            {/* Language Selector */}
            <LanguageSelector currentLang={currentLang} onSelectLang={onSelectLang} />

            {/* Theme Toggle Button */}
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            <button
              onClick={onOpenPartnerModal}
              className="px-3 py-1.5 text-xs font-semibold text-[#0A3B7B] dark:text-[#60A5FA] hover:text-[#1E40AF] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
            >
              {t.nav.partnerDesk}
            </button>

            <button
              onClick={onOpenRefundModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0A3B7B] hover:bg-[#1E40AF] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap"
            >
              <span>{t.nav.submitClaim}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#84CC16]" />
            </button>
          </div>

          {/* Mobile Menu Button + Language + Theme Toggle */}
          <div className="flex sm:hidden items-center gap-1.5">
            <LanguageSelector currentLang={currentLang} onSelectLang={onSelectLang} />
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <button
              onClick={onOpenRefundModal}
              className="px-2.5 py-1.5 bg-[#0A3B7B] text-white text-[11px] font-semibold rounded-lg whitespace-nowrap"
            >
              {t.nav.refundDesk}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 py-4 px-2 space-y-3 bg-white dark:bg-[#0B1120] transition-colors">
            <div className="px-2 pb-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.tableOfContents.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#131D31] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A3B7B]"
                />
              </div>
            </div>
            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200 px-2">
              <a
                href="#overview"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#0A3B7B] dark:hover:text-[#38BDF8]"
              >
                {t.nav.overview}
              </a>
              <a
                href="#customer-policy"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#0A3B7B] dark:hover:text-[#38BDF8]"
              >
                {t.nav.customers}
              </a>
              <a
                href="#partner-policy"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#0A3B7B] dark:hover:text-[#38BDF8]"
              >
                {t.nav.partners}
              </a>
              <a
                href="#commercial-terms"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#0A3B7B] dark:hover:text-[#38BDF8]"
              >
                {t.nav.commercial}
              </a>
              <a
                href="#faq-section"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#0A3B7B] dark:hover:text-[#38BDF8]"
              >
                {t.nav.faqs}
              </a>
              <a
                href="#contact-desk"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#0A3B7B] dark:hover:text-[#38BDF8]"
              >
                {t.nav.contact}
              </a>
            </nav>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2 px-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartnerModal();
                }}
                className="w-full py-2 text-center text-xs font-semibold text-[#0A3B7B] dark:text-[#60A5FA] bg-slate-100 dark:bg-slate-800 rounded-lg"
              >
                {t.nav.partnerDesk}
              </button>
              <a
                href="tel:+2349158482622"
                className="flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 rounded-lg"
              >
                <Phone className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>{t.nav.callUs} +2349158482622</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
