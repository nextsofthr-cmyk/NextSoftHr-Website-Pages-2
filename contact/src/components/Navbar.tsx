import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu, X, Globe, Sparkles, Sun, Moon } from 'lucide-react';
import { BRAND } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  onSelectOption: (type: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectOption }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nextsofthr-theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nextsofthr-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nextsofthr-theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1F3A]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
          : 'bg-[#0B1F3A] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="NextSofthr Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#1769E0] text-white shadow-md shadow-[#1769E0]/30 transition-transform duration-300 group-hover:scale-105">
              <span className="font-extrabold text-xl tracking-tight text-white font-display">N</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#C8F000] rounded-full ring-2 ring-[#0B1F3A]"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                NextSofthr<span className="text-[#C8F000]">.</span>
              </span>
              <span className="text-[10px] tracking-wider text-slate-300 font-medium uppercase -mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8F000] inline-block animate-pulse"></span>
                HR • Payroll • Business
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium text-slate-200">
            <button
              onClick={() => scrollToSection('contact-options')}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              {t.nav.howCanWeHelp}
            </button>
            <button
              onClick={() => scrollToSection('contact-form')}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              {t.nav.contactForm}
            </button>
            <button
              onClick={() => scrollToSection('global-presence')}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-[#C8F000]" />
              {t.nav.globalNetwork}
            </button>
            <button
              onClick={() => scrollToSection('ai-assistant')}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8F000]" />
              {t.nav.aiAssistant}
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              {t.nav.faqs}
            </button>
          </nav>

          {/* Direct Phone & Action CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-white px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#1769E0] transition-colors"
              title="Call NextSofthr directly"
            >
              <div className="w-6 h-6 rounded-full bg-[#1769E0]/30 flex items-center justify-center text-[#C8F000]">
                <Phone className="w-3 h-3" />
              </div>
              <span className="hidden xl:inline">{BRAND.phone}</span>
            </a>

            <button
              onClick={() => {
                onSelectOption('sales');
                scrollToSection('contact-form');
              }}
              className="text-xs font-semibold text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors border border-white/20 cursor-pointer"
            >
              {t.nav.talkToSales}
            </button>

            <button
              onClick={() => {
                onSelectOption('demo');
                scrollToSection('contact-form');
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#0B1F3A] bg-[#C8F000] hover:bg-[#b8dd00] px-3.5 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <span>{t.nav.bookDemo}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Language Selector Dropdown */}
            <LanguageSelector variant="desktop" />

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-white/10 text-slate-200 hover:text-[#C8F000] hover:bg-white/15 transition-all cursor-pointer border border-white/10"
              aria-label={isDark ? t.nav.themeToggleLight : t.nav.themeToggleDark}
              title={isDark ? t.nav.themeToggleLight : t.nav.themeToggleDark}
            >
              {isDark ? <Sun className="w-4 h-4 text-[#C8F000]" /> : <Moon className="w-4 h-4 text-slate-200" />}
            </button>
          </div>

          {/* Mobile Menu Button & Quick Actions */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector variant="desktop" />
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-white/10 text-slate-200 hover:text-[#C8F000] hover:bg-white/20"
              aria-label={isDark ? t.nav.themeToggleLight : t.nav.themeToggleDark}
            >
              {isDark ? <Sun className="w-4 h-4 text-[#C8F000]" /> : <Moon className="w-4 h-4 text-slate-200" />}
            </button>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="p-2 rounded-lg bg-white/10 text-[#C8F000] hover:bg-white/20"
              aria-label="Call NextSofthr"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-white/10 mt-3 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
            <button
              onClick={() => scrollToSection('contact-options')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 rounded-md"
            >
              {t.nav.howCanWeHelp}
            </button>
            <button
              onClick={() => scrollToSection('contact-form')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 rounded-md"
            >
              {t.nav.contactForm}
            </button>
            <button
              onClick={() => scrollToSection('global-presence')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 rounded-md flex items-center justify-between"
            >
              <span>{t.nav.globalNetwork}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1769E0] text-white">{t.nav.hubsBadge}</span>
            </button>
            <button
              onClick={() => scrollToSection('ai-assistant')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 rounded-md flex items-center justify-between"
            >
              <span>{t.nav.aiAssistant}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8F000] text-[#0B1F3A] font-bold">{t.nav.newBadge}</span>
            </button>
            <button
              onClick={() => scrollToSection('why-contact')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 rounded-md"
            >
              {t.nav.whyContact}
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 rounded-md"
            >
              {t.nav.faqs}
            </button>

            {/* Language Switcher in Mobile Drawer */}
            <div className="pt-2 border-t border-white/10">
              <LanguageSelector variant="mobile" />
            </div>

            {/* Theme Toggle in Mobile Drawer */}
            <div className="pt-2 flex items-center justify-between px-3 py-2 bg-white/5 rounded-lg text-xs text-slate-200">
              <span className="flex items-center gap-2">
                {isDark ? <Moon className="w-3.5 h-3.5 text-[#C8F000]" /> : <Sun className="w-3.5 h-3.5 text-[#C8F000]" />}
                <span>{t.nav.themeLabel}: <strong>{isDark ? 'Dark Palette' : 'Light Palette'}</strong></span>
              </span>
              <button
                onClick={() => setIsDark(!isDark)}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[#C8F000] font-semibold text-[11px]"
              >
                Toggle
              </button>
            </div>

            <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onSelectOption('sales');
                  scrollToSection('contact-form');
                }}
                className="w-full text-center py-2.5 px-3 text-xs font-semibold text-white bg-white/10 rounded-lg hover:bg-white/15"
              >
                {t.nav.talkToSales}
              </button>
              <button
                onClick={() => {
                  onSelectOption('demo');
                  scrollToSection('contact-form');
                }}
                className="w-full text-center py-2.5 px-3 text-xs font-bold text-[#0B1F3A] bg-[#C8F000] rounded-lg hover:bg-[#b8dd00]"
              >
                {t.nav.bookDemo}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

