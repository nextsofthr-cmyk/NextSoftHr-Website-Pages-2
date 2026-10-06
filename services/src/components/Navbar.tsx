import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Phone,
  Sparkles,
  Layers,
  Users,
  CreditCard,
  Clock,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

interface NavbarProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, onOpenGetStarted }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Video Tour', href: '#video-tour' },
    { label: 'Services', href: '#services' },
    { label: 'Explorer', href: '#explorer' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Business Size', href: '#business-size' },
    { label: 'Industries', href: '#industries' },
    { label: 'AI Assistant', href: '#ai-assistant' },
    { label: 'Career Pathing', href: '#career-pathing' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'Security', href: '#security' },
    { label: 'Growth Impact', href: '#stats' },
    { label: 'ROI Calculator', href: '#calculator' },
    { label: 'Client Spotlight', href: '#client-spotlight' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#05192D] dark:bg-[#031020] text-white text-xs py-2 px-4 border-b border-blue-900/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-bold text-[#84CC16]">
              <Sparkles className="w-3 h-3 text-[#84CC16]" /> Next-Gen African &amp; Global HRMS
            </span>
            <span className="hidden md:inline text-slate-400">
              Transform payroll, attendance, and operations with intelligent automation.
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a
              href="tel:+2349158482622"
              className="flex items-center gap-1.5 hover:text-[#84CC16] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#84CC16]" /> +234 915 848 2622
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a
              href="https://www.nextsofthr.org"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors hidden sm:inline"
            >
              www.nextsofthr.org
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#0A2540]/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-blue-900/80 py-3'
            : 'bg-white dark:bg-[#0A2540] border-b border-slate-100 dark:border-blue-900/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0256C4] to-[#0A2540] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200 relative overflow-hidden">
              <ShieldCheck className="w-6 h-6 text-white" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#84CC16] ring-2 ring-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0A2540] dark:text-white flex items-center">
                Next<span className="text-[#0256C4] dark:text-blue-400">Soft</span>
                <span className="text-[#84CC16] font-black">hr</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold -mt-1">
                Workforce Intelligence
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.slice(0, 7).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#0256C4] dark:hover:text-[#84CC16] hover:bg-blue-50/70 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Quick dropdown for additional links */}
            <div className="relative">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onBlur={() => setTimeout(() => setServicesDropdownOpen(false), 200)}
                className="px-3 py-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#0256C4] dark:hover:text-[#84CC16] hover:bg-blue-50/70 dark:hover:bg-blue-900/50 rounded-lg transition-colors inline-flex items-center gap-1"
              >
                More <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#0D2644] rounded-xl shadow-xl border border-slate-100 dark:border-blue-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <a
                    href="#how-it-works"
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/60 hover:text-[#0256C4] dark:hover:text-white"
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Implementation Process
                  </a>
                  <a
                    href="#why-us"
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/60 hover:text-[#0256C4] dark:hover:text-white"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-[#84CC16]" /> Why NextSofthr
                  </a>
                  <a
                    href="#integrations"
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/60 hover:text-[#0256C4] dark:hover:text-white"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Integrations
                  </a>
                  <a
                    href="#security"
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/60 hover:text-[#0256C4] dark:hover:text-white"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-700 dark:text-blue-300" /> Security &amp; Data Privacy
                  </a>
                  <a
                    href="#testimonials"
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/60 hover:text-[#0256C4] dark:hover:text-white"
                  >
                    <Users className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> African Success Stories
                  </a>
                  <a
                    href="#faq"
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/60 hover:text-[#0256C4] dark:hover:text-white"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> Frequently Asked Questions
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action CTAs & Theme Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Prominent Theme Toggle Switch */}
            <div className="flex items-center pl-2 pr-3 py-1 rounded-full bg-slate-100/90 dark:bg-blue-950/70 border border-slate-200 dark:border-blue-800/80 shadow-xs">
              <ThemeSwitcher showLabel={true} size="md" />
            </div>

            <button
              onClick={onOpenDemo}
              className="px-3.5 py-2 text-sm font-semibold text-[#0A2540] dark:text-slate-200 hover:text-[#0256C4] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
            >
              Book a Demo
            </button>
            <button
              onClick={onOpenGetStarted}
              id="nav-get-started-btn"
              className="relative group overflow-hidden px-5 py-2.5 rounded-lg font-bold text-sm text-white bg-[#0256C4] hover:bg-[#024bb0] shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 border border-blue-600"
            >
              <span>Get Started</span>
              <span className="w-2 h-2 rounded-full bg-[#84CC16] group-hover:scale-125 transition-transform"></span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger toggle & Theme Switcher */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeSwitcher size="sm" />

            <button
              onClick={onOpenGetStarted}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#0256C4] rounded-lg"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-[#0256C4] hover:bg-slate-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white dark:bg-[#0A2540] border-b border-slate-200 dark:border-blue-900/80 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
            {/* Prominent Theme Toggle in Mobile Drawer */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-blue-950/80 border border-slate-200/80 dark:border-blue-800">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#84CC16]" />
                  Theme Appearance
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Switch between Light and Dark mode
                </span>
              </div>
              <ThemeSwitcher showLabel={true} size="md" />
            </div>

            <div className="grid grid-cols-2 gap-1 pb-3 border-b border-slate-100 dark:border-blue-900/60">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#0256C4] dark:hover:text-[#84CC16] hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full py-2.5 text-sm font-bold text-[#0A2540] dark:text-white border border-slate-300 dark:border-blue-700 rounded-lg hover:bg-slate-50 dark:hover:bg-blue-900/50 transition-colors text-center"
              >
                Book a Live Demo
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGetStarted();
                }}
                className="w-full py-2.5 text-sm font-bold text-white bg-[#0256C4] hover:bg-[#024bb0] rounded-lg shadow-sm text-center flex items-center justify-center gap-2"
              >
                <span>Get Started Free</span>
                <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
              </button>
              <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#84CC16]" /> Tel: +234 915 848 2622
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
