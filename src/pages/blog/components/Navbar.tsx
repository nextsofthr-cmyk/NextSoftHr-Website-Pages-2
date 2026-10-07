import React, { useState, useEffect } from 'react';
import { NextSoftHrLogo } from './NextSoftHrLogo';
import { Bookmark, Menu, X, ArrowRight, ShieldCheck, Sparkles, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  currentView: string;
  onNavigate: (route: string) => void;
  onOpenBookDemo: () => void;
  onOpenGetStarted: () => void;
  onOpenBookmarks: () => void;
  onOpenCmsAdmin: () => void;
  bookmarkedCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenBookDemo,
  onOpenGetStarted,
  onOpenBookmarks,
  onOpenCmsAdmin,
  bookmarkedCount,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage, availableLanguages } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.home', 'Home'), id: 'home', route: '/blog' },
    { label: t('nav.hr', 'HR'), id: 'hr', route: 'category:hr-management' },
    { label: t('nav.payroll', 'Payroll'), id: 'payroll', route: 'category:payroll' },
    { label: t('nav.attendance', 'Time & Attendance'), id: 'attendance', route: 'category:workforce' },
    { label: t('nav.talent', 'Talent'), id: 'talent', route: 'category:talent' },
    { label: t('nav.crm', 'CRM'), id: 'crm', route: 'category:business' },
    { label: t('nav.finance', 'Finance'), id: 'finance', route: 'category:business' },
    { label: t('nav.projects', 'Projects'), id: 'projects', route: 'category:business' },
    { label: t('nav.services', 'Services'), id: 'services', route: '#services' },
    { label: t('nav.pricing', 'Pricing'), id: 'pricing', route: '#pricing' },
    { label: t('nav.resources', 'Resources'), id: 'resources', route: '#resources' },
    { label: t('nav.blog', 'Blog'), id: 'blog', route: '/blog', isBlog: true },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#061528]/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-[#1E3656] py-2.5'
            : 'bg-white dark:bg-[#061528] border-b border-slate-200 dark:border-[#1E3656] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Zone 1: Logo */}
            <div className="flex items-center gap-6 shrink-0">
              <button
                onClick={() => onNavigate('/blog')}
                className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3F7E] dark:focus-visible:ring-[#8EE000] rounded-lg"
                aria-label="NextSoftHr Home"
              >
                <NextSoftHrLogo size="md" variant="auto" />
              </button>

              {/* Verified Platform Pill - Subtle */}
              <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#0E2442] border border-slate-200/80 dark:border-[#1E3656] text-[11px] font-medium text-slate-600 dark:text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0A3F7E] dark:text-[#8EE000]" />
                <span>{t('nav.globalSuite', 'Global Enterprise Suite')}</span>
              </div>
            </div>

            {/* Zone 2: Navigation Links (Desk/Wide) */}
            <nav className="hidden xl:flex items-center gap-1 text-[13px] font-medium text-slate-600 dark:text-slate-300">
              {navItems.map((item) => {
                const isActive = item.isBlog && (currentView === '/blog' || currentView.startsWith('/blog/'));
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.route)}
                    className={`px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
                      isActive
                        ? 'text-[#0A3F7E] dark:text-[#8EE000] font-bold bg-[#0A3F7E]/10 dark:bg-[#8EE000]/15 relative after:content-[""] after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:bg-[#8EE000]'
                        : 'hover:text-[#0A3F7E] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#0E2442]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Actions & CTAs */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Language Selector Dropdown */}
              <LanguageSelector />

              {/* Theme Toggle Button (Light / Dark) */}
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-[#0A3F7E] dark:hover:text-[#8EE000] hover:bg-slate-100 dark:hover:bg-[#0E2442] transition-colors border border-slate-200/80 dark:border-[#1E3656]"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
                aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[#8EE000] transition-transform duration-300 rotate-0 hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 text-[#0A3F7E] transition-transform duration-300 -rotate-12 hover:rotate-0" />
                )}
              </button>

              {/* Saved bookmarks toggle */}
              <button
                onClick={onOpenBookmarks}
                className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-[#0A3F7E] dark:hover:text-[#8EE000] hover:bg-slate-100 dark:hover:bg-[#0E2442] transition-colors border border-slate-200/80 dark:border-[#1E3656]"
                title={t('nav.savedInsights', 'Saved Articles')}
                aria-label="View saved articles"
              >
                <Bookmark className="w-4 h-4" />
                {bookmarkedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8EE000] text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-xs">
                    {bookmarkedCount}
                  </span>
                )}
              </button>

              {/* CMS Admin Link */}
              <button
                onClick={onOpenCmsAdmin}
                className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0A3F7E] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0E2442] rounded-lg transition-colors border border-dashed border-slate-300 dark:border-[#1E3656]"
                title="Open CMS Blog Management Console"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8EE000]" />
                <span>{t('nav.cmsAdmin', 'CMS Admin')}</span>
              </button>

              {/* Sign In */}
              <button
                onClick={() => onOpenGetStarted()}
                className="hidden md:block px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#0A3F7E] dark:hover:text-white transition-colors whitespace-nowrap"
              >
                {t('nav.signIn', 'Sign In')}
              </button>

              {/* Book a Demo */}
              <button
                onClick={onOpenBookDemo}
                className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-[#0A3F7E] dark:text-white bg-white dark:bg-[#0E2442] border border-[#0A3F7E]/30 dark:border-[#1E3656] rounded-lg hover:bg-slate-50 dark:hover:bg-[#122E54] hover:border-[#0A3F7E] dark:hover:border-[#8EE000] transition-all whitespace-nowrap"
              >
                {t('nav.bookDemo', 'Book a Demo')}
              </button>

              {/* Get Started - Primary CTA with Lemon Green Accent */}
              <button
                onClick={onOpenGetStarted}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] rounded-lg shadow-sm hover:shadow transition-all active:scale-[0.98] whitespace-nowrap border border-[#7BC500]"
              >
                <span>{t('nav.getStarted', 'Get Started')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#0E2442] focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Out / Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 dark:border-[#1E3656] bg-white dark:bg-[#061528] shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
            {/* Quick Language & Theme Switcher in Mobile Drawer */}
            <div className="p-3 mb-3 bg-slate-50 dark:bg-[#0B1E36] rounded-xl border border-slate-200 dark:border-[#1E3656] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {t('nav.displayTheme', 'Display Theme')}
                </span>
                <button
                  onClick={onToggleTheme}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-[#061528] text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-[#1E3656] flex items-center gap-1.5 shadow-xs"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-[#8EE000]" />
                      <span>{t('nav.lightMode', 'Light Mode')}</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-[#0A3F7E]" />
                      <span>{t('nav.darkNavy', 'Dark Navy')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mobile Language Grid */}
              <div className="pt-2 border-t border-slate-200/80 dark:border-[#1E3656]">
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                  Select Language / Idioma / Langue:
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {availableLanguages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLanguage(l.code)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs text-left flex items-center gap-1.5 transition-colors ${
                        language === l.code
                          ? 'bg-[#0A3F7E] text-white font-bold'
                          : 'bg-white dark:bg-[#061528] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1E3656]'
                      }`}
                    >
                      <span className="text-sm">{l.flag}</span>
                      <span className="truncate">{l.nativeName}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1 mb-4">
              {navItems.map((item) => {
                const isActive = item.isBlog && (currentView === '/blog' || currentView.startsWith('/blog/'));
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.route);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between ${
                      isActive
                        ? 'font-bold text-[#0A3F7E] dark:text-[#8EE000] bg-[#0A3F7E]/10 dark:bg-[#8EE000]/15'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#0B1E36]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#8EE000]" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#1E3656] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onOpenCmsAdmin();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#0B1E36] hover:bg-slate-200 dark:hover:bg-[#0E2442] rounded-lg flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8EE000]" />
                <span>{t('nav.cmsAdmin', 'Blog CMS Management')}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenBookDemo();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-xs font-semibold text-[#0A3F7E] dark:text-white border border-[#0A3F7E] dark:border-[#8EE000] rounded-lg text-center"
                >
                  {t('nav.bookDemo', 'Book a Demo')}
                </button>
                <button
                  onClick={() => {
                    onOpenGetStarted();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] rounded-lg text-center"
                >
                  {t('nav.getStarted', 'Get Started')}
                </button>
              </div>

              <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Already have an account? </span>
                <button
                  onClick={() => {
                    onOpenGetStarted();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-[#0A3F7E] dark:text-[#8EE000] font-semibold underline underline-offset-2"
                >
                  {t('nav.signIn', 'Sign In')}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
