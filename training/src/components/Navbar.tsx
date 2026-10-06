import React, { useState, useEffect } from 'react';
import { NextSoftLogo } from './NextSoftLogo';
import { ThemeToggle } from './ThemeToggle';
import { CurrencySelector } from './CurrencySelector';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { BRAND_INFO } from '../data/academyData';
import {
  Phone,
  BookOpen,
  Calendar,
  Briefcase,
  Sparkles,
  HelpCircle,
  Menu,
  X,
  User,
  GraduationCap,
  MessageSquare,
  Compass,
} from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenPortal: () => void;
  onOpenCorporate: () => void;
  onOpenRegister: () => void;
  onOpenAIAdvisor?: () => void;
  onOpenLiveChat?: () => void;
  currency?: string;
  onToggleCurrency?: () => void;
  enrolledCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenPortal,
  onOpenCorporate,
  onOpenRegister,
  onOpenAIAdvisor,
  onOpenLiveChat,
  enrolledCount,
}) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.explore', 'Explore Training'), id: 'courses-section', icon: BookOpen },
    { label: t('nav.career_roadmap', 'Career Roadmap'), id: 'learning-paths', icon: Compass },
    { label: t('nav.corporate', 'Corporate Training'), id: 'corporate-training', icon: Briefcase },
    { label: t('nav.upcoming', 'Upcoming Sessions'), id: 'upcoming-sessions', icon: Calendar },
    { label: t('nav.ai_learning', 'AI Learning'), id: 'ai-learning', icon: Sparkles },
    { label: t('nav.faq', 'FAQ'), id: 'faq-section', icon: HelpCircle },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#0B132B]/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 py-2.5'
          : 'bg-white dark:bg-[#0B132B] border-b border-slate-100 dark:border-slate-800/80 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <NextSoftLogo />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-[#0F4C81] dark:hover:text-[#84CC16] transition-colors cursor-pointer py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right Action Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Live Chat Desk Trigger Button */}
            {onOpenLiveChat && (
              <button
                type="button"
                onClick={onOpenLiveChat}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md transition-all cursor-pointer shadow-2xs group"
                title="Chat Live with Academic Admissions Desk"
              >
                <div className="relative">
                  <MessageSquare className="w-3.5 h-3.5 text-[#0F4C81] dark:text-[#84CC16]" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
                </div>
                <span>Live Chat</span>
              </button>
            )}

            {/* AI Course Advisor Button */}
            {onOpenAIAdvisor && (
              <button
                onClick={onOpenAIAdvisor}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0F4C81] dark:text-[#84CC16] bg-lime-100/80 dark:bg-lime-950/70 hover:bg-lime-200 dark:hover:bg-lime-900/80 border border-lime-300 dark:border-lime-700/80 rounded-md transition-all cursor-pointer shadow-2xs group"
                title="Get AI Course Recommendations"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16] group-hover:rotate-12 transition-transform" />
                <span>AI Course Advisor</span>
              </button>
            )}

            {/* Dark / Light Mode Theme Toggle */}
            <ThemeToggle />

            {/* Direct Phone / WhatsApp Contact */}
            <a
              href={`tel:${BRAND_INFO.phone}`}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#0F4C81] dark:hover:text-[#84CC16] transition-colors"
              title="Call NextSoftHR Training Academy"
            >
              <Phone className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16]" />
              <span className="hidden xl:inline">{BRAND_INFO.phoneDisplay}</span>
            </a>

            {/* Global Language Selector Dropdown */}
            <LanguageSelector variant="header" />

            {/* Global Currency Selector Dropdown */}
            <CurrencySelector variant="header" />

            {/* Learner Dashboard / Sign In */}
            <button
              onClick={onOpenPortal}
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0F4C81] dark:text-blue-200 bg-blue-50/70 dark:bg-blue-950/70 hover:bg-blue-100/70 dark:hover:bg-blue-900/70 border border-blue-200/60 dark:border-blue-800/60 rounded-md transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t('nav.portal', 'Learner Portal')}</span>
              {enrolledCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#84CC16] text-[#0F4C81] text-[10px] font-bold flex items-center justify-center">
                  {enrolledCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenRegister}
              className="px-4 py-2 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 active:scale-95 rounded-md shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{t('nav.enroll_now', 'Register Now')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            </button>
          </div>

          {/* Mobile Menu & Theme Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle size="sm" />
            <button
              onClick={onOpenPortal}
              className="p-1.5 text-[#0F4C81] dark:text-blue-300 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md text-xs font-medium flex items-center gap-1"
            >
              <User className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            {onOpenLiveChat && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLiveChat();
                }}
                className="flex items-center gap-2.5 px-3 py-2 text-sm font-bold text-white bg-[#0F4C81] dark:bg-blue-600 rounded-md text-left cursor-pointer shadow-xs"
              >
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-[#84CC16]" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
                </div>
                <span>Start Live Chat with Admissions</span>
              </button>
            )}

            {onOpenAIAdvisor && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIAdvisor();
                }}
                className="flex items-center gap-2.5 px-3 py-2 text-sm font-bold text-[#0F4C81] dark:text-[#84CC16] bg-lime-50 dark:bg-lime-950/60 rounded-md text-left cursor-pointer border border-lime-200 dark:border-lime-800/60"
              >
                <Sparkles className="w-4 h-4 text-[#65A30D] dark:text-[#84CC16]" />
                <span>AI Course Advisor (Course Matcher)</span>
              </button>
            )}

            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-md text-left cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-[#0F4C81] dark:text-[#84CC16]" />
                  <span>{link.label}</span>
                </button>
              );
            })}

            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5 px-3">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <span>Theme Mode:</span>
                <ThemeToggle size="sm" showLabel={true} />
              </div>

              {/* Mobile Language Selector */}
              <LanguageSelector variant="mobile" />

              {/* Mobile Currency Selector */}
              <CurrencySelector variant="mobile" />

              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 py-1"
              >
                <Phone className="w-4 h-4 text-[#65A30D] dark:text-[#84CC16]" />
                <span>{t('nav.call_admissions', 'Call Admissions')}: {BRAND_INFO.phoneDisplay}</span>
              </a>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCorporate();
                  }}
                  className="w-full py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md text-center cursor-pointer"
                >
                  Corporate Info
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full py-2 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md text-center cursor-pointer"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
