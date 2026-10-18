import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, Menu, X, ArrowRight, Headphones, Sparkles,
  Users, Mail, Briefcase, Award, HelpCircle, BookOpen,
  ShieldCheck, FileText, Handshake, Percent, Receipt,
  Play, CheckCircle2, Phone, Coins, Globe
} from 'lucide-react';
import { ThemeToggle } from '../pages/homepage/components/ThemeToggle';
import { LanguageSelector } from '../pages/homepage/components/LanguageSelector';
import { CurrencySelector } from '../pages/homepage/components/CurrencySelector';
import { useLanguage } from '../pages/homepage/context/LanguageContext';

export interface GlobalHeaderProps {
  onOpenDemo?: () => void;
  onOpenGetStarted?: () => void;
  onOpenExpert?: () => void;
  onOpenTrial?: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  onOpenDemo,
  onOpenGetStarted,
  onOpenExpert,
  onOpenTrial,
}) => {
  const { dict } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [insightsDropdown, setInsightsDropdown] = useState(false);
  const [mobileInsightsExpanded, setMobileInsightsExpanded] = useState(true);

  // Local fallback modals for pages that don't pass handlers
  const [localDemoOpen, setLocalDemoOpen] = useState(false);
  const [localGetStartedOpen, setLocalGetStartedOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setInsightsDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setInsightsDropdown(false);
  }, [location.pathname]);

  const handleDemoClick = () => {
    if (onOpenDemo) {
      onOpenDemo();
    } else {
      setLocalDemoOpen(true);
    }
  };

  const handleGetStartedClick = () => {
    if (onOpenGetStarted) {
      onOpenGetStarted();
    } else if (onOpenTrial) {
      onOpenTrial();
    } else {
      setLocalGetStartedOpen(true);
    }
  };

  const handleExpertClick = () => {
    if (onOpenExpert) {
      onOpenExpert();
    } else {
      window.location.href = '/contact';
    }
  };

  // Active link check
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/homepage';
    return location.pathname.startsWith(path);
  };

  const isInsightsActive = [
    '/about-us', '/contact', '/partner-registry', '/faq', '/blog',
    '/privacy-policy', '/terms-conditions', '/partners-agreement',
    '/partner-commission', '/refund-policy'
  ].some(p => location.pathname.startsWith(p));

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-lime-400 text-slate-950 font-extrabold px-1.5 py-0.5 rounded text-[10px] tracking-wide uppercase">
              New
            </span>
            <span className="text-slate-300 hidden sm:inline">
              Workforce OS 2026 Edition • Statutory Payroll &amp; Compliance in 25+ African Countries
            </span>
            <span className="text-slate-300 sm:hidden truncate max-w-[220px]">
              Workforce OS 2026 Edition
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-slate-300 text-[11px]">
            <button 
              onClick={handleExpertClick}
              className="hover:text-lime-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Headphones className="w-3 h-3 text-lime-400" />
              <span>Talk to an Expert</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
              <span>99.98% SLA Uptime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className={`px-4 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800 py-2.5' 
          : 'bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 xl:gap-3">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center shrink-0 group">
            <img
              src="/next-soft-logo.png"
              alt="NextSoftHr — Powering People. Driving Businesses"
              className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex flex-1 justify-center items-center gap-0.5 text-[13px] font-semibold min-w-0 [&>a]:px-2! [&>a]:whitespace-nowrap [&>div>button:first-child]:px-2! [&>div>button:first-child]:whitespace-nowrap">
            {/* 1. Home */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-slate-900 font-bold' 
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              Home
            </Link>

            {/* 2. Prices */}
            <Link
              to="/pricing"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/pricing') 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-slate-900 font-bold' 
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              Prices
            </Link>

            {/* 3. Training */}
            <Link
              to="/training"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/training') 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-slate-900 font-bold' 
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              Training
            </Link>

            {/* 4. Partner */}
            <Link
              to="/partners"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/partners') 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-slate-900 font-bold' 
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              Partner
            </Link>

            {/* 5. Outsourcing */}
            <Link
              to="/outsourcing"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/outsourcing') 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-slate-900 font-bold' 
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              Outsourcing
            </Link>

            {/* 6. Services */}
            <Link
              to="/services"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/services') 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-slate-900 font-bold' 
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              Services
            </Link>

            {/* 7. Insights (Dropdown with 3 structured groups) */}
            <div 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setInsightsDropdown(true)}
              onMouseLeave={() => setInsightsDropdown(false)}
            >
              <button
                id="insights-dropdown-btn"
                onClick={() => setInsightsDropdown(!insightsDropdown)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  insightsDropdown || isInsightsActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-900 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
                aria-expanded={insightsDropdown}
              >
                <span>Insights</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${insightsDropdown ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
              </button>

              {/* Insights Mega Menu Card */}
              {insightsDropdown && (
                <div 
                  id="insights-mega-menu"
                  className="absolute top-full right-0 lg:-right-20 xl:right-0 xl:left-auto w-[680px] max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 grid grid-cols-3 gap-6 animate-fadeIn z-50 mt-1"
                >
                  {/* Column 1: Who we Are */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 pb-1 border-b border-slate-100 dark:border-slate-800">
                      <Users className="w-3.5 h-3.5" />
                      <span>Who we Are</span>
                    </div>
                    <ul className="space-y-1.5">
                      <li>
                        <Link
                          to="/about-us"
                          onClick={() => setInsightsDropdown(false)}
                          className="group/item flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50/70 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-100/70 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                            <Users className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                              About Us
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              Company vision, story &amp; team
                            </p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/contact"
                          onClick={() => setInsightsDropdown(false)}
                          className="group/item flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50/70 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-100/70 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                              Contact Us
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              Reach enterprise advisors &amp; support
                            </p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/contact"
                          onClick={() => setInsightsDropdown(false)}
                          className="group/item flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50/70 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-100/70 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                              Career
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              Join our global mission
                            </p>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: What We Do */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-lime-600 dark:text-lime-400 pb-1 border-b border-slate-100 dark:border-slate-800">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>What We Do</span>
                    </div>
                    <ul className="space-y-1.5">
                      <li>
                        <Link
                          to="/partner-registry"
                          onClick={() => setInsightsDropdown(false)}
                          className="group/item flex items-start gap-2.5 p-2 rounded-xl hover:bg-lime-50/70 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-lime-100/80 dark:bg-lime-950 text-lime-700 dark:text-lime-400 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-lime-600 group-hover/item:text-white transition-colors">
                            <Award className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover/item:text-lime-600 dark:group-hover/item:text-lime-400 transition-colors">
                              Partner Registry
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              Certified global partners directory
                            </p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/faq"
                          onClick={() => setInsightsDropdown(false)}
                          className="group/item flex items-start gap-2.5 p-2 rounded-xl hover:bg-lime-50/70 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-lime-100/80 dark:bg-lime-950 text-lime-700 dark:text-lime-400 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-lime-600 group-hover/item:text-white transition-colors">
                            <HelpCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover/item:text-lime-600 dark:group-hover/item:text-lime-400 transition-colors">
                              FAQ
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              Answers to platform &amp; tax questions
                            </p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/blog"
                          onClick={() => setInsightsDropdown(false)}
                          className="group/item flex items-start gap-2.5 p-2 rounded-xl hover:bg-lime-50/70 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-lime-100/80 dark:bg-lime-950 text-lime-700 dark:text-lime-400 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-lime-600 group-hover/item:text-white transition-colors">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover/item:text-lime-600 dark:group-hover/item:text-lime-400 transition-colors">
                              Blog
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              Workforce trends, compliance &amp; tips
                            </p>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Statutory */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 pb-1 border-b border-slate-100 dark:border-slate-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Statutory</span>
                    </div>
                    <ul className="space-y-1">
                      <li>
                        <Link
                          to="/privacy-policy"
                          onClick={() => setInsightsDropdown(false)}
                          className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-blue-600" />
                          <span>Private Policy</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/terms-conditions"
                          onClick={() => setInsightsDropdown(false)}
                          className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-blue-600" />
                          <span>Terms &amp; Conditions</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/partners-agreement"
                          onClick={() => setInsightsDropdown(false)}
                          className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Handshake className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-blue-600" />
                          <span>Partner Agreement</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/partner-commission"
                          onClick={() => setInsightsDropdown(false)}
                          className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Percent className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-blue-600" />
                          <span>Partner Commission</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/refund-policy"
                          onClick={() => setInsightsDropdown(false)}
                          className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Receipt className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-blue-600" />
                          <span>Refund Policy</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Mega Menu Footer Note */}
                  <div className="col-span-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs px-1 text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-500" />
                      GDPR, ISO 27001 &amp; African Labor Compliant
                    </span>
                    <button
                      onClick={() => { setInsightsDropdown(false); handleExpertClick(); }}
                      className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Consult Legal &amp; HR Advisory</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Action CTAs, Language Selector, Currency Selector & Theme Toggle */}
          <div className="hidden xl:flex items-center gap-1.5 shrink-0">
            {/* Country / Currency Selector Dropdown */}
            <CurrencySelector variant="dropdown" />

            {/* Language Dropdown */}
            <LanguageSelector variant="dropdown" />

            {/* Light / Dark Mode Toggle (compact icon so the header always fits) */}
            <ThemeToggle />

            {/* Explore Demo Button */}
            <a
              id="global-nav-explore-demo-btn"
              href="https://demo.scriptmaster.store/login"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-[13px] font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              Explore Demo
            </a>

            {/* Get Started Button */}
            <Link
              id="global-nav-get-started-btn"
              to="/signup"
              className="px-3.5 py-2 text-[13px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 group cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Get Started</span>
              <div className="w-1.5 h-1.5 rounded-full bg-lime-400 group-hover:scale-125 transition-transform" />
            </Link>
          </div>

          {/* Mobile Header Controls */}
          <div className="flex xl:hidden items-center gap-1 sm:gap-1.5 shrink-0">
            <CurrencySelector variant="compact" />
            <LanguageSelector variant="dropdown" />
            <ThemeToggle />
            <Link
              id="global-mobile-quick-start-btn"
              to="/signup"
              className="px-2.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer whitespace-nowrap"
            >
              Get Started
            </Link>
            <button
              id="global-mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-4 pb-6 space-y-3 animate-fadeIn max-h-[85vh] overflow-y-auto">
            {/* Primary Nav Links */}
            <div className="space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-semibold rounded-lg ${
                  isActive('/') ? 'text-blue-600 bg-blue-50 dark:bg-slate-900 font-bold' : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                Home
              </Link>
              <Link
                to="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-semibold rounded-lg ${
                  isActive('/pricing') ? 'text-blue-600 bg-blue-50 dark:bg-slate-900 font-bold' : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                Prices
              </Link>
              <Link
                to="/training"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-semibold rounded-lg ${
                  isActive('/training') ? 'text-blue-600 bg-blue-50 dark:bg-slate-900 font-bold' : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                Training
              </Link>
              <Link
                to="/partners"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-semibold rounded-lg ${
                  isActive('/partners') ? 'text-blue-600 bg-blue-50 dark:bg-slate-900 font-bold' : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                Partner
              </Link>
              <Link
                to="/outsourcing"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-semibold rounded-lg ${
                  isActive('/outsourcing') ? 'text-blue-600 bg-blue-50 dark:bg-slate-900 font-bold' : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                Outsourcing
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-semibold rounded-lg ${
                  isActive('/services') ? 'text-blue-600 bg-blue-50 dark:bg-slate-900 font-bold' : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                Services
              </Link>
            </div>

            {/* Insights Section Collapsible */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-2">
              <button
                onClick={() => setMobileInsightsExpanded(!mobileInsightsExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-slate-800 dark:text-slate-100"
              >
                <span>Insights</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileInsightsExpanded ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {mobileInsightsExpanded && (
                <div className="pl-3 pr-1 pt-1 pb-2 space-y-4">
                  {/* Group 1: Who we Are */}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 px-3 py-1">
                      Who we Are
                    </div>
                    <div className="space-y-1">
                      <Link
                        to="/about-us"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                      >
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                        <span>About Us</span>
                      </Link>
                      <Link
                        to="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                      >
                        <Mail className="w-3.5 h-3.5 text-blue-600" />
                        <span>Contact Us</span>
                      </Link>
                      <Link
                        to="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                      >
                        <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                        <span>Career</span>
                      </Link>
                    </div>
                  </div>

                  {/* Group 2: What We Do */}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-lime-600 dark:text-lime-400 px-3 py-1">
                      What We Do
                    </div>
                    <div className="space-y-1">
                      <Link
                        to="/partner-registry"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                      >
                        <Award className="w-3.5 h-3.5 text-lime-600" />
                        <span>Partner Registry</span>
                      </Link>
                      <Link
                        to="/faq"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-lime-600" />
                        <span>FAQ</span>
                      </Link>
                      <Link
                        to="/blog"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-lime-600" />
                        <span>Blog</span>
                      </Link>
                    </div>
                  </div>

                  {/* Group 3: Statutory */}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3 py-1">
                      Statutory
                    </div>
                    <div className="space-y-1">
                      <Link
                        to="/privacy-policy"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                        <span>Private Policy</span>
                      </Link>
                      <Link
                        to="/terms-conditions"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span>Terms &amp; Conditions</span>
                      </Link>
                      <Link
                        to="/partners-agreement"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                      >
                        <Handshake className="w-3.5 h-3.5 text-slate-400" />
                        <span>Partner Agreement</span>
                      </Link>
                      <Link
                        to="/partner-commission"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                      >
                        <Percent className="w-3.5 h-3.5 text-slate-400" />
                        <span>Partner Commission</span>
                      </Link>
                      <Link
                        to="/refund-policy"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                      >
                        <Receipt className="w-3.5 h-3.5 text-slate-400" />
                        <span>Refund Policy</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Selectors */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-lime-600" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Currency</span>
                </div>
                <CurrencySelector variant="segmented" />
              </div>

              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Language</span>
                </div>
                <LanguageSelector variant="segmented" />
              </div>

              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Theme</span>
                <ThemeToggle variant="segmented" />
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <a
                href="https://demo.scriptmaster.store/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-sm font-bold text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-center block"
              >
                Explore Demo
              </a>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 cursor-pointer text-center block"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Built-in Fallback Demo Modal for pages without modal handlers */}
      {localDemoOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-scaleUp">
            <button
              onClick={() => setLocalDemoOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  Schedule a Live Demo
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tailored workforce &amp; payroll walkthrough with specialists
                </p>
              </div>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you! A NextSoftHr workforce specialist will reach out shortly.');
                setLocalDemoOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Jane Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Email</label>
                <input
                  required
                  type="email"
                  placeholder="jane@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Size</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option>1 - 25 Employees</option>
                  <option>26 - 150 Employees</option>
                  <option>151 - 500 Employees</option>
                  <option>500+ Enterprise</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 cursor-pointer"
              >
                Confirm Walkthrough Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Built-in Fallback Get Started Modal */}
      {localGetStartedOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-scaleUp">
            <button
              onClick={() => setLocalGetStartedOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  Get Started Free
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  14-Day Free All-Access Trial • Instant Setup • No Credit Card
                </p>
              </div>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert('Your free trial workspace is ready! Please check your email to verify.');
                setLocalGetStartedOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
                <input
                  required
                  type="text"
                  placeholder="Acme Technologies Ltd"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Email</label>
                <input
                  required
                  type="email"
                  placeholder="admin@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Country of Operation</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option>Nigeria (NGN)</option>
                  <option>Kenya (KES)</option>
                  <option>South Africa (ZAR)</option>
                  <option>Ghana (GHS)</option>
                  <option>United Kingdom (GBP)</option>
                  <option>United States / International (USD)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 cursor-pointer"
              >
                Create Workspace &amp; Start Trial
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
