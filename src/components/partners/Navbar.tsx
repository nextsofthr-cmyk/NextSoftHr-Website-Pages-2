import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  ArrowRight, 
  ChevronRight, 
  Sun, 
  Moon, 
  Globe, 
  Check, 
  ChevronDown,
  Sparkles,
  Coins,
  Search
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../translations/translations';
import { useCurrency, CurrencyCode } from '../context/CurrencyContext';

interface NavbarProps {
  onApplyClick: () => void;
  onPortalClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onApplyClick, onPortalClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [currencySearch, setCurrencySearch] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState<'all' | 'africa' | 'global'>('all');

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, currentLanguage, supportedLanguages, isRTL, strings } = useLanguage();
  const { currency, setCurrency, currentCurrency, supportedCurrencies } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: strings.nav.program, href: '#program' },
    { label: strings.nav.benefits, href: '#benefits' },
    { label: strings.nav.commission, href: '#commission' },
    { label: strings.nav.howItWorks, href: '#how-it-works' },
    { label: strings.nav.ecosystem, href: '#ecosystem' },
    { label: strings.nav.aiPlatform, href: '#ai-platform' },
    { label: strings.nav.network, href: '#network' },
    { label: strings.nav.resources, href: '#resources' },
    { label: strings.nav.faq, href: '#faq' },
  ];

  const handleLanguageSelect = (code: Language) => {
    setLanguage(code);
    setLangDropdownOpen(false);
  };

  const handleCurrencySelect = (code: CurrencyCode) => {
    setCurrency(code);
    setCurrencyDropdownOpen(false);
    setCurrencySearch('');
  };

  const filteredCurrencies = supportedCurrencies.filter((c) => {
    const matchesSearch = 
      c.code.toLowerCase().includes(currencySearch.toLowerCase()) ||
      c.name.toLowerCase().includes(currencySearch.toLowerCase()) ||
      c.region.toLowerCase().includes(currencySearch.toLowerCase());
    
    if (!matchesSearch) return false;

    if (currencyFilter === 'africa') {
      return ['NGN', 'KES', 'ZAR', 'GHS', 'MAD', 'XAF', 'UGX', 'TZS', 'RWF', 'ZMW', 'EGP', 'ZIP'].includes(c.code);
    }
    if (currencyFilter === 'global') {
      return ['USD', 'GBP', 'EUR', 'AED'].includes(c.code);
    }
    return true;
  });

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#040E1F]/95 backdrop-blur-md border-b border-slate-200 dark:border-blue-900/60 shadow-lg dark:shadow-xl py-2.5'
          : 'bg-white/85 dark:bg-[#040E1F]/85 backdrop-blur-sm border-b border-slate-200/60 dark:border-blue-900/30 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0E356A] to-[#071D3E] border border-blue-700/60 flex items-center justify-center shadow-md relative overflow-hidden group-hover:border-[#B8F010]/80 transition-colors">
            <div className="w-2.5 h-2.5 rounded-full bg-[#B8F010] absolute top-1.5 right-1.5 animate-pulse"></div>
            <span className="text-white font-extrabold text-xl tracking-tight">N<span className="text-[#B8F010]">S</span></span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-900 dark:text-white font-bold text-xl tracking-tight transition-colors">NextSofthr</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#B8F010]/20 text-[#071D3E] dark:text-[#B8F010] border border-[#B8F010]/40">
                {strings.nav.partnerBadge}
              </span>
            </div>
            <span className="text-[10px] text-blue-700 dark:text-blue-200/70 tracking-wider uppercase font-medium">
              {strings.nav.brandSubtitle}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-[#B8F010] transition-colors py-1 relative group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8F010] transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          
          {/* Global Currency Selector Dropdown */}
          <div className="relative" ref={currencyDropdownRef}>
            <button
              onClick={() => {
                setCurrencyDropdownOpen(!currencyDropdownOpen);
                setLangDropdownOpen(false);
              }}
              aria-expanded={currencyDropdownOpen}
              aria-haspopup="true"
              aria-label="Change operating currency"
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold border transition-all duration-200 shadow-sm ${
                currencyDropdownOpen
                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-[#B8F010] border-blue-400 dark:border-[#B8F010]/60 ring-2 ring-blue-500/20'
                  : 'bg-slate-100 dark:bg-blue-950/70 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-blue-800/80 hover:border-slate-400 dark:hover:border-blue-600'
              }`}
            >
              <Coins className="w-3.5 h-3.5 text-blue-600 dark:text-[#B8F010]" />
              <span className="text-sm leading-none" role="img" aria-label={currentCurrency.name}>
                {currentCurrency.flag}
              </span>
              <span className="tracking-wide">
                {currentCurrency.code}
              </span>
              <span className="text-[10px] text-blue-600 dark:text-[#B8F010] font-mono">
                ({currentCurrency.symbol.trim()})
              </span>
              <ChevronDown className={`w-3 h-3 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${currencyDropdownOpen ? 'rotate-180 text-blue-600 dark:text-[#B8F010]' : ''}`} />
            </button>

            {/* Currency Dropdown Menu */}
            {currencyDropdownOpen && (
              <div 
                className={`absolute top-full mt-2 w-88 rounded-2xl bg-white dark:bg-[#071D3E] border border-slate-200 dark:border-blue-800 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                  isRTL ? 'left-0' : 'right-0'
                }`}
              >
                {/* Header */}
                <div className="pb-2.5 mb-2 border-b border-slate-100 dark:border-blue-900/60">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        Operating Currency
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold">
                      16 CURRENCIES
                    </span>
                  </div>

                  {/* Filter Pills */}
                  <div className="grid grid-cols-3 gap-1 mb-2 bg-slate-100 dark:bg-blue-950/70 p-1 rounded-lg text-[11px] font-semibold">
                    <button
                      onClick={() => setCurrencyFilter('all')}
                      className={`py-1 rounded text-center transition-all ${currencyFilter === 'all' ? 'bg-white dark:bg-blue-800 text-blue-700 dark:text-[#B8F010] shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      All (16)
                    </button>
                    <button
                      onClick={() => setCurrencyFilter('africa')}
                      className={`py-1 rounded text-center transition-all ${currencyFilter === 'africa' ? 'bg-white dark:bg-blue-800 text-blue-700 dark:text-[#B8F010] shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      Africa (12)
                    </button>
                    <button
                      onClick={() => setCurrencyFilter('global')}
                      className={`py-1 rounded text-center transition-all ${currencyFilter === 'global' ? 'bg-white dark:bg-blue-800 text-blue-700 dark:text-[#B8F010] shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      Global (4)
                    </button>
                  </div>

                  {/* Search box */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search currency, country or code..."
                      value={currencySearch}
                      onChange={(e) => setCurrencySearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-blue-950 border border-slate-200 dark:border-blue-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Currency List (Scrollable) */}
                <div className="max-h-64 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {filteredCurrencies.map((c) => {
                    const isSelected = currency === c.code;
                    return (
                      <button
                        key={c.code}
                        onClick={() => handleCurrencySelect(c.code)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-950/90 border border-blue-300 dark:border-[#B8F010]/60 text-blue-900 dark:text-white'
                            : 'hover:bg-slate-50 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-300 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-xl shrink-0" role="img" aria-label={c.name}>
                            {c.flag}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-xs text-slate-900 dark:text-white">{c.code}</span>
                              <span className="text-xs font-mono font-bold text-blue-700 dark:text-[#B8F010]">({c.symbol.trim()})</span>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                              {c.name}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0 ml-2">
                          {isSelected ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-blue-700 dark:text-[#B8F010] bg-blue-100 dark:bg-[#B8F010]/15 px-1.5 py-0.5 rounded">
                              <Check className="w-3 h-3" />
                              ACTIVE
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-mono">
                              1$={c.ratePerUSD >= 100 ? Math.round(c.ratePerUSD).toLocaleString() : c.ratePerUSD}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Footer hint */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-blue-900/60 px-1 flex items-center justify-between text-[10px] text-slate-500 dark:text-blue-300/70">
                  <span>Auto-converts all commissions & transactions</span>
                  <span className="font-mono text-blue-700 dark:text-[#B8F010] font-bold">1 USD = {currentCurrency.ratePerUSD} {currentCurrency.code}</span>
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setCurrencyDropdownOpen(false);
              }}
              aria-expanded={langDropdownOpen}
              aria-haspopup="true"
              aria-label="Change language / Changer de langue / تغيير اللغة"
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 shadow-sm ${
                langDropdownOpen
                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-[#B8F010] border-blue-400 dark:border-[#B8F010]/60 ring-2 ring-blue-500/20'
                  : 'bg-slate-100 dark:bg-blue-950/70 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-blue-800/80 hover:border-slate-400 dark:hover:border-blue-600'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-[#B8F010]" />
              <span className="text-sm leading-none" role="img" aria-label={currentLanguage.name}>
                {currentLanguage.flag}
              </span>
              <span className="font-bold tracking-wide uppercase">
                {currentLanguage.code}
              </span>
              <ChevronDown className={`w-3 h-3 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180 text-blue-600 dark:text-[#B8F010]' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {langDropdownOpen && (
              <div 
                className={`absolute top-full mt-2 w-80 rounded-2xl bg-white dark:bg-[#071D3E] border border-slate-200 dark:border-blue-800 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                  isRTL ? 'left-0' : 'right-0'
                }`}
              >
                {/* Header */}
                <div className="px-3 py-2 border-b border-slate-100 dark:border-blue-900/60 mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-[#B8F010]" />
                    <span className="text-[11px] font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                      {strings.nav.selectLang}
                    </span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    PAN-AFRICA
                  </span>
                </div>

                {/* Language Choices */}
                <div className="space-y-1">
                  {supportedLanguages.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-all text-left ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-950/80 border border-blue-300 dark:border-[#B8F010]/50 text-blue-900 dark:text-white'
                            : 'hover:bg-slate-50 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-300 border border-transparent'
                        }`}
                      >
                        <span className="text-2xl pt-0.5 shrink-0" role="img" aria-label={lang.name}>
                          {lang.flag}
                        </span>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold flex items-center gap-1.5">
                              <span>{lang.nativeName}</span>
                              {lang.nativeName !== lang.name && (
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                                  ({lang.name})
                                </span>
                              )}
                            </span>
                            {isSelected && (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-[#B8F010] bg-blue-100 dark:bg-[#B8F010]/15 px-1.5 py-0.5 rounded">
                                <Check className="w-3 h-3" />
                                {strings.nav.activeBadge}
                              </span>
                            )}
                          </div>
                          
                          <p className="text-[11px] font-medium text-blue-700 dark:text-[#B8F010] mt-0.5">
                            {lang.regionFocus}
                          </p>
                          
                          <p className="text-[10px] text-slate-500 dark:text-blue-200/60 mt-0.5 truncate">
                            {lang.keyHubs}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Footer hint */}
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-blue-900/60 px-3 py-1 flex items-center justify-between text-[10px] text-slate-500 dark:text-blue-300/70">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#B8F010]" />
                    {strings.nav.globalAfricanFocus}
                  </span>
                  <span className="font-mono uppercase text-blue-600 dark:text-[#B8F010]">
                    {language.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-blue-950/70 border border-slate-300 dark:border-blue-800/80 hover:border-slate-400 dark:hover:border-blue-600 transition-all duration-200 flex items-center justify-center group shadow-sm"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-yellow-400 group-hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-blue-700 group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Hotline */}
          <a
            href="tel:+2349158482622"
            className="hidden 2xl:flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-blue-200 hover:text-blue-600 dark:hover:text-[#B8F010] transition-colors py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-blue-800/80 bg-slate-100 dark:bg-blue-950/40"
            title={strings.nav.hotlineTitle}
          >
            <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-[#B8F010]" />
            <span>{strings.nav.hotline}</span>
          </a>

          {/* Portal Button */}
          <button
            id="nav-portal-btn"
            onClick={onPortalClick}
            className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-blue-900/40 border border-transparent hover:border-slate-300 dark:hover:border-blue-700/50 transition-all flex items-center gap-1"
          >
            <span>{strings.nav.portal}</span>
            <ChevronRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          </button>

          {/* CTA */}
          <button
            id="nav-apply-btn"
            onClick={onApplyClick}
            className="text-xs font-bold px-3.5 py-2.5 rounded-lg bg-[#B8F010] text-[#040E1F] hover:bg-[#CBFF1A] transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#B8F010]/20 flex items-center gap-2 whitespace-nowrap"
          >
            <span>{strings.nav.applyNow}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#040E1F]" />
          </button>
        </div>

        {/* Mobile Actions: Currency quick toggle + Language quick toggle + Theme toggle + Apply + Menu */}
        <div className="flex items-center gap-1.5 lg:hidden">
          
          {/* Quick Mobile Currency Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-1 p-2 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-blue-950/60 border border-slate-300 dark:border-blue-800"
            aria-label="Select currency"
            title={`Active Currency: ${currentCurrency.code}`}
          >
            <span className="text-sm">{currentCurrency.flag}</span>
            <span className="text-[10px] font-mono">{currentCurrency.code}</span>
          </button>

          {/* Quick Mobile Language Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-1 p-2 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-blue-950/60 border border-slate-300 dark:border-blue-800"
            aria-label="Select language"
          >
            <span className="text-sm">{currentLanguage.flag}</span>
            <span className="text-[10px] uppercase">{currentLanguage.code}</span>
          </button>

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-blue-950/60 border border-slate-300 dark:border-blue-800"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-700" />
            )}
          </button>
          
          <button
            onClick={onApplyClick}
            className="text-xs font-bold px-3 py-2 rounded-lg bg-[#B8F010] text-[#040E1F] hover:bg-[#CBFF1A] transition-all whitespace-nowrap"
          >
            {strings.nav.quickApply}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-blue-900/50 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#040E1F] border-b border-slate-200 dark:border-blue-900/80 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl max-h-[85vh] overflow-y-auto">
          
          {/* Mobile Currency Switcher Section */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-blue-950/50 border border-slate-200 dark:border-blue-900/60">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-blue-200 mb-2">
              <span className="flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-blue-600 dark:text-[#B8F010]" />
                <span>Operating Currency</span>
              </span>
              <span className="text-[10px] text-blue-600 dark:text-[#B8F010] font-mono font-bold">
                {currentCurrency.code} ({currentCurrency.symbol.trim()})
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 max-h-36 overflow-y-auto p-1 bg-white dark:bg-blue-900/30 rounded-lg border border-slate-200 dark:border-blue-800/80">
              {supportedCurrencies.map((c) => {
                const isActive = currency === c.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-center transition-all ${
                      isActive
                        ? 'bg-blue-600 dark:bg-[#071D3E] text-white border border-blue-600 dark:border-[#B8F010] shadow-xs'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-blue-900/50'
                    }`}
                  >
                    <span className="text-base">{c.flag}</span>
                    <span className="text-[10px] font-bold">{c.code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Language Switcher Row */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-blue-950/50 border border-slate-200 dark:border-blue-900/60">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-blue-200 mb-2">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-[#B8F010]" />
                {strings.nav.selectLang}
              </span>
              <span className="text-[10px] text-blue-600 dark:text-[#B8F010] font-bold">
                {currentLanguage.regionFocus}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {supportedLanguages.map((lang) => {
                const isActive = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                    }}
                    className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-lg border text-center transition-all ${
                      isActive
                        ? 'bg-blue-600 dark:bg-[#071D3E] text-white border-blue-600 dark:border-[#B8F010] shadow-sm'
                        : 'bg-white dark:bg-blue-900/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-blue-800/80 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xl mb-0.5">{lang.flag}</span>
                    <span className="text-xs font-bold">{lang.nativeName}</span>
                    <span className="text-[9px] opacity-75 font-mono uppercase">{lang.code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-b border-slate-200 dark:border-blue-900/50 pb-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-[#B8F010] py-2 px-2 rounded hover:bg-slate-100 dark:hover:bg-blue-950/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            
            {/* Theme Toggle in Mobile Menu */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between text-sm font-semibold text-slate-800 dark:text-slate-200 py-2.5 px-3 rounded-lg border border-slate-300 dark:border-blue-800/80 bg-slate-100 dark:bg-blue-900/40"
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-yellow-500" />
                    <span>{strings.nav.themeLight}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-blue-700" />
                    <span>{strings.nav.themeDark}</span>
                  </>
                )}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-[#B8F010]/20 text-[#071D3E] dark:text-[#B8F010] border border-[#B8F010]/30">
                {theme === 'dark' ? 'LIGHT' : 'DARK'}
              </span>
            </button>

            <a
              href="tel:+2349158482622"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 dark:text-blue-200 py-2.5 rounded-lg border border-slate-300 dark:border-blue-800 bg-slate-100 dark:bg-blue-950/60"
            >
              <Phone className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
              <span>{strings.nav.hotlineTitle} ({strings.nav.hotline})</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onPortalClick();
              }}
              className="w-full text-center text-sm font-semibold text-slate-700 dark:text-slate-200 py-2.5 rounded-lg border border-slate-300 dark:border-blue-800/80 bg-slate-100 dark:bg-blue-900/40"
            >
              {strings.nav.portal}
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onApplyClick();
              }}
              className="w-full flex items-center justify-center gap-2 text-sm font-bold py-3 rounded-lg bg-[#B8F010] text-[#040E1F] hover:bg-[#CBFF1A] shadow-md shadow-[#B8F010]/20"
            >
              <span>{strings.nav.applyNow}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
