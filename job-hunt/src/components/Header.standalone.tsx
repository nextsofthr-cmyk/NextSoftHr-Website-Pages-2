import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Phone,
  ArrowRight,
  Sun,
  Moon,
  Info,
  Languages,
  Check,
  Search,
  Calculator,
  ShieldCheck,
  HelpCircle,
  Layers,
  Building2,
  Wallet,
  ShoppingCart,
} from 'lucide-react';
import { CurrencyCode, LanguageCode } from '../types';
import { CURRENCIES } from '../data/pricingData';
import { getCurrencyConfig } from '../data/worldCurrencies';
import { useLanguage } from '../context/LanguageContext';
import { CurrencyPickerModal } from './CurrencyPickerModal';

interface HeaderProps {
  onOpenTrial: (planName?: string) => void;
  onOpenDemo: () => void;
  selectedCurrency: CurrencyCode;
  onSelectCurrency: (currency: CurrencyCode) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenCheckout?: () => void;
  cartItemCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTrial,
  onOpenDemo,
  selectedCurrency,
  onSelectCurrency,
  theme,
  onToggleTheme,
  onOpenCheckout,
  cartItemCount = 0,
}) => {
  const { language, setLanguage, t, currentLanguageConfig, allLanguages } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [showCurrencyTooltip, setShowCurrencyTooltip] = useState(false);
  const [currencySearch, setCurrencySearch] = useState('');
  const [mobileCurrencySearch, setMobileCurrencySearch] = useState('');
  const [worldCurrencyModalOpen, setWorldCurrencyModalOpen] = useState(false);
  const currencyContainerRef = useRef<HTMLDivElement>(null);
  const languageContainerRef = useRef<HTMLDivElement>(null);

  const currentCurrencyConfig = getCurrencyConfig(selectedCurrency);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile full-screen drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close dropdowns & tooltip on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        currencyContainerRef.current &&
        !currencyContainerRef.current.contains(event.target as Node)
      ) {
        setCurrencyDropdownOpen(false);
        setShowCurrencyTooltip(false);
      }
      if (
        languageContainerRef.current &&
        !languageContainerRef.current.contains(event.target as Node)
      ) {
        setLanguageDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: t.header.home, href: '#' },
    { label: t.header.features, href: '#features' },
    { label: t.header.solutions, href: '#industries' },
    { label: t.common.viewPricing, href: '#pricing-plans', isActive: true },
    { label: t.header.calculator, href: '#pricing-calculator' },
    { label: t.header.faq, href: '#faq' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#070D1E]/95 backdrop-blur-md shadow-sm dark:shadow-black/50 border-b border-slate-200/80 dark:border-slate-800/80 py-3.5'
          : 'bg-white/80 dark:bg-[#070D1E]/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800/60 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            id="brand-logo-link"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#0265DC] rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0265DC] to-[#004DB3] flex items-center justify-center shadow-md shadow-blue-500/20 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
              <span className="font-display font-extrabold text-white text-lg tracking-tight">N</span>
              <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#A3E635] ring-2 ring-white dark:ring-[#070D1E]"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight text-[#0B132B] dark:text-white leading-none">
                Next<span className="text-[#0265DC]">Soft</span>
                <span className="text-[#65A30D] dark:text-[#A3E635]">hr</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider text-slate-500 dark:text-slate-400 uppercase mt-0.5">
                Global HR &amp; Payroll
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  link.isActive
                    ? 'text-[#0265DC] dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/60 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#0B132B] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-button"
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-all duration-200 border border-transparent dark:border-slate-700 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to High-Contrast Dark Theme'}
              aria-label={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to High-Contrast Dark Theme'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#A3E635] transition-transform duration-200 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform duration-200 hover:-rotate-12" />
              )}
            </button>

            {/* Language Selector Dropdown */}
            <div ref={languageContainerRef} className="relative">
              <button
                id="language-selector-button"
                onClick={() => {
                  setLanguageDropdownOpen(!languageDropdownOpen);
                  setCurrencyDropdownOpen(false);
                  setShowCurrencyTooltip(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors border border-transparent dark:border-slate-700"
                title={t.header.selectLanguage}
                aria-expanded={languageDropdownOpen}
              >
                <span className="text-sm leading-none">{currentLanguageConfig.flag}</span>
                <span className="font-semibold">{currentLanguageConfig.code.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {languageDropdownOpen && (
                <div
                  id="language-dropdown-menu"
                  className="absolute right-0 mt-1 w-64 bg-white dark:bg-[#0D162C] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3.5 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-1">
                    <span>{t.header.selectLanguage}</span>
                    <span className="text-[10px] text-blue-500 font-sans font-normal">Pan-African</span>
                  </div>

                  {(Object.keys(allLanguages) as LanguageCode[]).map((code) => {
                    const item = allLanguages[code];
                    const isSelected = language === code;
                    return (
                      <button
                        key={code}
                        id={`language-opt-${code}`}
                        onClick={() => {
                          setLanguage(code);
                          setLanguageDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors ${
                          isSelected
                            ? 'bg-blue-50/70 dark:bg-blue-950/40 text-[#0265DC] dark:text-blue-400 font-bold'
                            : 'text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{item.flag}</span>
                          <div>
                            <div className="font-semibold">{item.nativeName}</div>
                            <div className="text-[10px] text-slate-400 dark:text-slate-500">
                              {item.region}
                            </div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Currency Selector & Real-Time Conversion Tooltip */}
            <div ref={currencyContainerRef} className="relative flex items-center gap-1">
              <div className="relative">
                <button
                  id="currency-selector-button"
                  onClick={() => {
                    setCurrencyDropdownOpen(!currencyDropdownOpen);
                    setShowCurrencyTooltip(false);
                    setCurrencySearch('');
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors border border-transparent dark:border-slate-700"
                  title="Select Currency (160+ African & Global World Currencies)"
                  aria-expanded={currencyDropdownOpen}
                >
                  <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span className="font-semibold">{selectedCurrency}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({currentCurrencyConfig.symbol})</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {currencyDropdownOpen && (
                  <div
                    id="currency-dropdown-menu"
                    className="absolute right-0 mt-1 w-84 bg-white dark:bg-[#0D162C] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-3.5 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                      <span>World Currencies 🌍</span>
                      <span className="text-[10px] text-emerald-500 font-mono font-normal">Default: ₦ NGN</span>
                    </div>

                    {/* Quick Search Input */}
                    <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={currencySearch}
                          onChange={(e) => setCurrencySearch(e.target.value)}
                          placeholder="Search NGN, KES, ZAR, USD, EUR..."
                          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0265DC]"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800/50">
                      {(Object.keys(CURRENCIES) as CurrencyCode[])
                        .filter((curr) => {
                          if (!currencySearch.trim()) return true;
                          const q = currencySearch.toLowerCase();
                          const config = CURRENCIES[curr];
                          return (
                            curr.toLowerCase().includes(q) ||
                            config.name.toLowerCase().includes(q) ||
                            (config.region && config.region.toLowerCase().includes(q)) ||
                            config.symbol.toLowerCase().includes(q)
                          );
                        })
                        .map((curr) => {
                          const config = CURRENCIES[curr];
                          const isSelected = selectedCurrency === curr;
                          return (
                            <button
                              key={curr}
                              id={`currency-opt-${curr.toLowerCase()}`}
                              onClick={() => {
                                onSelectCurrency(curr);
                                setCurrencyDropdownOpen(false);
                                setCurrencySearch('');
                              }}
                              className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors ${
                                isSelected
                                  ? 'bg-blue-50/70 dark:bg-blue-950/40 text-[#0265DC] dark:text-blue-400 font-bold'
                                  : 'text-slate-700 dark:text-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="text-base shrink-0">{config.flag}</span>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-slate-900 dark:text-white">{curr}</span>
                                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                      {config.name}
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mt-0.5">
                                    <span>{config.region}</span>
                                    <span>•</span>
                                    <span className="font-mono text-emerald-600 dark:text-emerald-400">
                                      1 USD = {config.symbol}
                                      {config.exchangeRate.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 pl-2 shrink-0">
                                <span className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500">
                                  {config.symbol}
                                </span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400" />}
                              </div>
                            </button>
                          );
                        })}
                    </div>

                    {/* View all 160+ world currencies modal link */}
                    <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                      <button
                        type="button"
                        id="open-world-currencies-modal-btn"
                        onClick={() => {
                          setCurrencyDropdownOpen(false);
                          setWorldCurrencyModalOpen(true);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#0265DC] dark:text-blue-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-blue-200/60 dark:border-blue-900"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Browse All 160+ World Currencies</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Informative Tooltip Trigger */}
              <div className="relative">
                <button
                  id="currency-info-tooltip-btn"
                  type="button"
                  onClick={() => setShowCurrencyTooltip(!showCurrencyTooltip)}
                  onMouseEnter={() => setShowCurrencyTooltip(true)}
                  onMouseLeave={() => setShowCurrencyTooltip(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  aria-label="Currency exchange rate information"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>

                {showCurrencyTooltip && (
                  <div
                    id="currency-info-tooltip-content"
                    role="tooltip"
                    className="absolute right-0 top-full mt-2 w-80 p-3.5 bg-slate-900 text-white dark:bg-[#070D1E] dark:border dark:border-slate-700 rounded-2xl shadow-2xl z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mt-1 shrink-0" />
                      <div>
                        <div className="font-semibold text-white text-[12px]">
                          Global &amp; Pan-African FX Rates
                        </div>
                        <div className="text-[10px] text-slate-400">16 Major Currencies Supported</div>
                      </div>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed mb-2.5">
                      All subscription tiers, payroll runs, expense reimbursements, and add-on costs convert in real time using central benchmark exchange rates.
                    </p>
                    <div className="p-2.5 rounded-xl bg-slate-800/80 dark:bg-slate-800/60 border border-slate-700 text-[10px] space-y-1.5 font-mono text-slate-300">
                      <div className="text-emerald-400 font-semibold flex items-center justify-between font-sans">
                        <span>Baseline Benchmark:</span>
                        <span>1 USD Standard</span>
                      </div>
                      <div className="text-[10px] text-slate-300 border-t border-slate-700/60 pt-1 space-y-0.5 font-sans">
                        <div><strong className="text-white">West:</strong> ₦1,550 (NGN) • GH₵15.5 (GHS) • 605 FCFA (XAF)</div>
                        <div><strong className="text-white">East:</strong> KSh 130 (KES) • USh 3,720 (UGX) • TSh 2,650 (TZS) • 1,350 FRw (RWF)</div>
                        <div><strong className="text-white">South:</strong> R 18.2 (ZAR) • ZK 26.5 (ZMW) • ZiG 27.5 (ZIP)</div>
                        <div><strong className="text-white">North &amp; ME:</strong> E£ 48.5 (EGP) • 9.9 MAD • 3.67 AED</div>
                        <div><strong className="text-white">Global:</strong> €0.92 (EUR) • £0.79 (GBP) • $1.00 (USD)</div>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2">
                      Zero hidden foreign currency transaction fees. Your invoices and payroll disbursements are localized to your selected denomination.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Cart / Checkout Button */}
            {onOpenCheckout && (
              <button
                id="header-cart-button"
                onClick={onOpenCheckout}
                className="relative p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-[#0265DC] dark:hover:text-[#A3E635] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
                title={`View Subscription Cart & Checkout (${cartItemCount} item${cartItemCount === 1 ? '' : 's'})`}
                aria-label={`View Subscription Cart (${cartItemCount} items)`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#A3E635] text-slate-950 font-extrabold text-[11px] flex items-center justify-center shadow-xs animate-in zoom-in-50">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {/* Login Link */}
            <a
              href="#login"
              onClick={(e) => {
                e.preventDefault();
                onOpenTrial('Starter');
              }}
              id="header-login-button"
              className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#0265DC] dark:hover:text-blue-400 transition-colors"
            >
              Login
            </a>

            {/* Secondary CTA: Book a Demo */}
            <button
              id="header-demo-button"
              onClick={onOpenDemo}
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-[#0265DC] dark:text-blue-300 bg-blue-50/90 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors duration-150 border border-blue-200/60 dark:border-blue-800/60"
            >
              {t.common.bookDemo}
            </button>

            {/* Primary CTA: Start Free Trial */}
            <button
              id="header-trial-button"
              onClick={() => onOpenTrial()}
              className="px-4 py-2 rounded-lg text-sm font-bold text-slate-900 bg-[#A3E635] hover:bg-[#84CC16] shadow-sm hover:shadow-md transition-all duration-150 flex items-center gap-1.5"
            >
              <span>{t.common.startFreeTrial}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Actions: Language + Theme Toggle + Currency + Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            {/* Mobile Language Toggle */}
            <button
              id="mobile-language-toggle"
              onClick={() => {
                const langs: LanguageCode[] = ['en', 'fr', 'pt', 'es'];
                const nextIdx = (langs.indexOf(language) + 1) % langs.length;
                setLanguage(langs[nextIdx]);
              }}
              className="px-2 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-transparent dark:border-slate-700 flex items-center gap-1"
              title={t.header.selectLanguage}
            >
              <span>{currentLanguageConfig.flag}</span>
              <span className="font-bold">{language.toUpperCase()}</span>
            </button>

            {/* Mobile Theme Toggle */}
            <button
              id="mobile-theme-toggle"
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-transparent dark:border-slate-700"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#A3E635]" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <button
              id="mobile-currency-toggle"
              onClick={() => {
                const codes: CurrencyCode[] = [
                  'NGN',
                  'USD',
                  'GBP',
                  'KES',
                  'ZAR',
                  'GHS',
                  'MAD',
                  'XAF',
                  'AED',
                  'UGX',
                  'TZS',
                  'RWF',
                  'ZMW',
                  'EGP',
                  'ZIP',
                  'EUR',
                ];
                const nextIdx = (codes.indexOf(selectedCurrency) + 1) % codes.length;
                onSelectCurrency(codes[nextIdx]);
              }}
              className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-transparent dark:border-slate-700 flex items-center gap-1"
              title="Toggle Currency (16 Currencies)"
            >
              <span>{selectedCurrency}</span>
              <span className="text-[10px] text-slate-400 font-mono">
                {CURRENCIES[selectedCurrency].symbol}
              </span>
            </button>

            {onOpenCheckout && (
              <button
                id="mobile-cart-toggle"
                onClick={onOpenCheckout}
                className="relative p-1.5 rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-transparent dark:border-slate-700"
                title="Cart & Checkout"
                aria-label={`Open Cart (${cartItemCount} items)`}
              >
                <ShoppingCart className="w-4 h-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#A3E635] text-slate-950 font-bold text-[9px] flex items-center justify-center shadow-xs">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-[#0265DC] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Slide-Out Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop with dark blur */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <div
            id="mobile-navigation-drawer"
            className="fixed inset-y-0 right-0 w-full sm:w-[420px] max-w-full bg-white dark:bg-[#070D1E] shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-out animate-in slide-in-from-right border-l border-slate-200 dark:border-slate-800"
          >
            {/* 1. Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-white/95 dark:bg-[#070D1E]/95 backdrop-blur-md shrink-0">
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0265DC] to-[#004DB3] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                  N
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-lg text-[#0B132B] dark:text-white leading-tight">
                    Next<span className="text-[#0265DC]">Soft</span>
                    <span className="text-[#65A30D] dark:text-[#A3E635]">hr</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                    Pan-African HR &amp; Payroll
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-2">
                {/* Theme Toggle Button */}
                <button
                  onClick={onToggleTheme}
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-[#A3E635]" />
                  ) : (
                    <Moon className="w-4 h-4 text-slate-700" />
                  )}
                </button>

                {/* Close Drawer Button */}
                <button
                  id="mobile-drawer-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 2. Scrollable Body Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 text-slate-800 dark:text-slate-100">
              {/* Primary Call to Actions in Drawer */}
              <div className="flex flex-col gap-2.5">
                <button
                  id="mobile-drawer-trial-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTrial();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <span>{t.common.startFreeTrial}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onOpenCheckout && (
                  <button
                    id="mobile-drawer-cart-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCheckout();
                    }}
                    className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#0265DC] hover:bg-[#004DB3] shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#A3E635]" />
                    <span>Subscribe &amp; Checkout {cartItemCount > 0 ? `(${cartItemCount})` : ''}</span>
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="mobile-drawer-demo-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenDemo();
                    }}
                    className="py-2.5 px-3 rounded-xl text-xs font-semibold text-[#0265DC] dark:text-blue-300 bg-blue-50/90 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/70 dark:border-blue-800/60 transition-colors text-center"
                  >
                    {t.common.bookDemo}
                  </button>

                  <a
                    href="#login"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      onOpenTrial('Starter');
                    }}
                    className="py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-center flex items-center justify-center"
                  >
                    {t.common.login}
                  </a>
                </div>
              </div>

              {/* Primary Navigation Links */}
              <div>
                <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
                  <span>Navigation</span>
                  <span className="text-[10px] text-blue-500 font-sans font-normal">Pan-African Platform</span>
                </div>
                <nav className="flex flex-col space-y-1">
                  {[
                    { label: t.header.home, href: '#', icon: Globe },
                    { label: t.common.viewPricing, href: '#pricing-plans', isActive: true, icon: Wallet },
                    { label: t.header.calculator, href: '#pricing-calculator', icon: Calculator },
                    { label: t.header.features, href: '#compare-features', icon: Layers },
                    { label: 'AI Copilot', href: '#ai-section', icon: Sparkles },
                    { label: t.header.solutions, href: '#industries', icon: Building2 },
                    { label: 'Security & Trust', href: '#security', icon: ShieldCheck },
                    { label: t.header.faq, href: '#faq', icon: HelpCircle },
                  ].map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                          link.isActive
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-[#0265DC] dark:text-blue-400 font-bold border border-blue-100 dark:border-blue-900/50 shadow-xs'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`w-4 h-4 ${
                              link.isActive
                                ? 'text-[#0265DC] dark:text-blue-400'
                                : 'text-slate-400'
                            }`}
                          />
                          <span>{link.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Language Selector (Pan-African & International) */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#0265DC] dark:text-blue-400" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      Language • Langue • Idioma
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#0265DC] dark:text-blue-400">
                    {currentLanguageConfig.flag} {currentLanguageConfig.name}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(allLanguages) as LanguageCode[]).map((code) => {
                    const item = allLanguages[code];
                    const isSelected = language === code;
                    return (
                      <button
                        key={code}
                        id={`mobile-drawer-lang-${code}`}
                        onClick={() => setLanguage(code)}
                        className={`p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-white dark:bg-blue-950 border-[#0265DC] text-[#0265DC] dark:text-blue-300 font-bold shadow-xs ring-1 ring-blue-500/20'
                            : 'bg-white/80 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-lg shrink-0">{item.flag}</span>
                          <div className="min-w-0">
                            <div className="font-bold truncate">{item.nativeName}</div>
                            <div className="text-[9px] text-slate-400 truncate">{item.region}</div>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400 shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Currency Selector (All 160+ World Currencies) */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      Currency (160+ World Currencies)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
                    Active: {selectedCurrency} ({currentCurrencyConfig.symbol})
                  </span>
                </div>

                {/* Button to open full world currencies modal */}
                <button
                  type="button"
                  id="mobile-open-world-currencies-btn"
                  onClick={() => {
                    setWorldCurrencyModalOpen(true);
                  }}
                  className="w-full mb-2.5 py-2 px-3 rounded-xl bg-[#0265DC] hover:bg-[#004DB3] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Open Full World Currency Directory (160+)</span>
                </button>

                {/* Mobile Currency Filter Search */}
                <div className="relative mb-2.5">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={mobileCurrencySearch}
                    onChange={(e) => setMobileCurrencySearch(e.target.value)}
                    placeholder="Search NGN, KES, ZAR, USD, EUR, CFA..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0265DC]"
                  />
                  {mobileCurrencySearch && (
                    <button
                      onClick={() => setMobileCurrencySearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* 16 Currency Grid with Full Accessibility */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-h-56 overflow-y-auto pr-1">
                  {(Object.keys(CURRENCIES) as CurrencyCode[])
                    .filter((curr) => {
                      if (!mobileCurrencySearch.trim()) return true;
                      const q = mobileCurrencySearch.toLowerCase();
                      const config = CURRENCIES[curr];
                      return (
                        curr.toLowerCase().includes(q) ||
                        config.name.toLowerCase().includes(q) ||
                        (config.region && config.region.toLowerCase().includes(q)) ||
                        config.symbol.toLowerCase().includes(q)
                      );
                    })
                    .map((curr) => {
                      const config = CURRENCIES[curr];
                      const isSelected = selectedCurrency === curr;
                      return (
                        <button
                          key={curr}
                          id={`mobile-drawer-curr-${curr.toLowerCase()}`}
                          onClick={() => {
                            onSelectCurrency(curr);
                          }}
                          className={`p-2 rounded-xl text-left text-xs transition-all flex flex-col justify-between border ${
                            isSelected
                              ? 'bg-white dark:bg-blue-950 border-[#0265DC] text-[#0265DC] dark:text-blue-300 font-bold shadow-xs ring-1 ring-blue-500/20'
                              : 'bg-white/80 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                          }`}
                          title={`${config.name} (${config.symbol})`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-base">{config.flag}</span>
                            <span className="text-[10px] font-mono font-bold text-slate-400">
                              {config.symbol}
                            </span>
                          </div>
                          <div className="mt-1">
                            <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                              <span>{curr}</span>
                              {isSelected && (
                                <Check className="w-3 h-3 text-[#0265DC] dark:text-blue-400" />
                              )}
                            </div>
                            <div className="text-[9px] text-slate-400 truncate">
                              {config.name}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Direct Support & Hotline */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <a
                    href="tel:+2349158482622"
                    className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-[#0265DC] font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400" />
                    <span>+2349158482622</span>
                  </a>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Specialists Online
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 text-center">
                  Pan-African &amp; Global Operations • Invoiced in selected currency
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* World Currencies Selector Modal */}
      <CurrencyPickerModal
        isOpen={worldCurrencyModalOpen}
        onClose={() => setWorldCurrencyModalOpen(false)}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={onSelectCurrency}
        title="Select Global Currency"
        subtitle="Choose from all 160+ world currencies. Defaults to Nigerian Naira (₦)."
      />
    </header>
  );
};
