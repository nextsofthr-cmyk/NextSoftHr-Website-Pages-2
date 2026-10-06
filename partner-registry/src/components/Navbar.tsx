import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  Search, 
  Sparkles,
  ShieldCheck,
  UserCheck,
  Building2,
  Sun,
  Moon
} from 'lucide-react';
import { CurrencySelector } from './CurrencySelector';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onFindPartnerClick?: () => void;
  onBecomePartnerClick?: () => void;
  onLoginClick?: () => void;
  onPartnerPortalClick?: () => void;
  activeCountry?: string;
  onCountrySelect?: (country: string) => void;
  onSelectCountry?: (country: string) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onOpenAiMatch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onFindPartnerClick = () => {
    const el = document.getElementById('directory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  },
  onBecomePartnerClick = () => {
    const el = document.getElementById('registration');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  },
  onLoginClick,
  onPartnerPortalClick,
  activeCountry = 'Global',
  onCountrySelect,
  onSelectCountry,
  isDarkMode = false,
  onToggleTheme,
  onOpenAiMatch
}) => {
  const handlePortal = onPartnerPortalClick || onLoginClick || (() => {});
  const handleCountryChoice = onCountrySelect || onSelectCountry || (() => {});
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const countries = [
    { name: 'Global (All Regions)', code: 'ALL', flag: '🌐' },
    { name: 'Nigeria', code: 'NG', flag: '🇳🇬' },
    { name: 'Kenya', code: 'KE', flag: '🇰🇪' },
    { name: 'Ghana', code: 'GH', flag: '🇬🇭' },
    { name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
    { name: 'Rwanda', code: 'RW', flag: '🇷🇼' },
    { name: 'Egypt', code: 'EG', flag: '🇪🇬' },
    { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
    { name: 'United States', code: 'US', flag: '🇺🇸' },
    { name: 'UAE', code: 'AE', flag: '🇦🇪' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#071938]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-blue-900/40 py-3' 
          : 'bg-[#071938] border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0c2b64] to-[#1652f0] border border-[#c8f526]/50 flex items-center justify-center text-white shadow-md shadow-blue-950 group-hover:border-[#c8f526] transition-colors">
              {/* Custom SVG mark for NextSofthr */}
              <svg className="w-6 h-6 text-[#c8f526]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
                <circle cx="5" cy="12" r="2" fill="#c8f526" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center">
                NextSofthr
                <span className="w-2 h-2 rounded-full bg-[#c8f526] ml-1 inline-block animate-pulse"></span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#c8f526]/90 -mt-1 hidden sm:block">
                Global Partner Registry
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <a 
              href="#platform" 
              className="px-3 py-1.5 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {t('nav.platform', undefined, 'Platform')}
            </a>
            
            {/* Solutions Dropdown */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {t('nav.solutions', undefined, 'Solutions')}
                <ChevronDown className={`w-4 h-4 transition-transform ${solutionsDropdownOpen ? 'rotate-180 text-[#c8f526]' : ''}`} />
              </button>

              {solutionsDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-72 bg-[#0c234b] border border-blue-800/80 rounded-xl shadow-2xl p-2 z-50"
                  onMouseLeave={() => setSolutionsDropdownOpen(false)}
                >
                  <div className="text-[11px] font-bold text-[#c8f526] px-3 py-1.5 uppercase tracking-wider">
                    Core Business Suites
                  </div>
                  <a href="#directory" onClick={() => setSolutionsDropdownOpen(false)} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-200 hover:text-white">
                    <UserCheck className="w-4 h-4 text-[#c8f526] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold">Human Resources & Attendance</div>
                      <div className="text-[11px] text-slate-400">Employee lifecycle & shifts</div>
                    </div>
                  </a>
                  <a href="#directory" onClick={() => setSolutionsDropdownOpen(false)} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-200 hover:text-white">
                    <ShieldCheck className="w-4 h-4 text-[#c8f526] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold">Automated African Payroll</div>
                      <div className="text-[11px] text-slate-400">PAYE, KRA, SARS, GRA compliance</div>
                    </div>
                  </a>
                  <a href="#directory" onClick={() => setSolutionsDropdownOpen(false)} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-200 hover:text-white">
                    <Building2 className="w-4 h-4 text-[#c8f526] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold">Multi-Company & Branches</div>
                      <div className="text-[11px] text-slate-400">Pan-African enterprise operations</div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <a 
              href="#industries" 
              className="px-3 py-1.5 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Industries
            </a>

            {/* Active Partners Page Link */}
            <a 
              href="#directory" 
              className="px-3 py-1.5 text-sm font-bold text-[#c8f526] bg-blue-900/50 border border-[#c8f526]/30 rounded-lg flex items-center gap-1.5"
            >
              <span>{t('nav.partners', undefined, 'Partners')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8f526]"></span>
            </a>

            {/* Partner Referral & Rewards */}
            <a 
              href="#referrals" 
              className="px-3 py-1.5 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Referrals</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#c8f526]/20 text-[#c8f526] font-extrabold border border-[#c8f526]/40">
                Rewards
              </span>
            </a>

            <a 
              href="#pricing" 
              className="px-3 py-1.5 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {t('nav.pricing', undefined, 'Pricing')}
            </a>
            <a 
              href="#resources" 
              className="px-3 py-1.5 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {t('nav.resources', undefined, 'Resources')}
            </a>
            <a 
              href="#about" 
              className="px-3 py-1.5 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {t('nav.about', undefined, 'About Us')}
            </a>
          </nav>

          {/* Right Header CTAs & Country Selector */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Country/Region Selector */}
            <div className="relative">
              <button 
                id="country-selector-btn"
                type="button"
                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#c8f526]" />
                <span>{activeCountry || 'Nigeria'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {countryDropdownOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-52 bg-[#0c234b] border border-blue-800 rounded-xl shadow-2xl py-1 z-50 max-h-72 overflow-y-auto"
                  onMouseLeave={() => setCountryDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-400 border-b border-blue-900/80">
                    Filter Directory Region
                  </div>
                  {countries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        if (onCountrySelect) {
                          onCountrySelect(c.code === 'ALL' ? '' : c.name);
                        }
                        setCountryDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs text-left text-slate-200 hover:bg-blue-800/60 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Global Currency Selector */}
            <CurrencySelector variant="navbar" />

            {/* Global Language Selector (EN, FR, PT, ES) */}
            <LanguageSelector variant="navbar" />

            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                id="theme-toggle-btn"
                type="button"
                onClick={onToggleTheme}
                className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center group relative"
                aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-[#c8f526] transition-transform duration-300 rotate-0 group-hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-200 transition-transform duration-300 group-hover:-rotate-12" />
                )}
                <span className="sr-only">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            )}

            {/* AI Partner Match button */}
            {onOpenAiMatch && (
              <button 
                type="button"
                id="nav-ai-match-btn"
                onClick={onOpenAiMatch}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c8f526]/20 hover:bg-[#c8f526] text-[#c8f526] hover:text-[#071938] border border-[#c8f526]/70 text-xs font-black transition-all cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('nav.ai_match', undefined, 'AI Match')}</span>
              </button>
            )}

            {/* Login button */}
            <button 
              id="nav-login-btn"
              onClick={handlePortal}
              className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {t('nav.partner_portal', undefined, 'Partner Portal')}
            </button>

            {/* Become a Partner */}
            <button 
              id="nav-become-partner-btn"
              onClick={onBecomePartnerClick}
              className="text-xs font-semibold text-slate-200 hover:text-white border border-slate-700 hover:border-slate-500 px-3.5 py-2 rounded-lg transition-colors"
            >
              {t('nav.become_partner', undefined, 'Become a Partner')}
            </button>

            {/* Primary Find a Partner CTA (Lemon Green) */}
            <button 
              id="nav-find-partner-btn"
              onClick={onFindPartnerClick}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] font-bold text-xs shadow-md lemon-shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Find a Partner</span>
            </button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-1.5 lg:hidden">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-2 rounded-lg text-slate-300 hover:text-white bg-white/5 border border-white/10"
                aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-[#c8f526]" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-200" />
                )}
              </button>
            )}
            <button 
              onClick={onFindPartnerClick}
              className="px-3 py-1.5 rounded-lg bg-[#c8f526] text-[#071938] font-bold text-xs shadow-sm"
            >
              Find Partner
            </button>
            <button 
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#071938] border-b border-blue-900/60 shadow-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <a 
              href="#platform" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-blue-950/60 text-slate-200 hover:text-white"
            >
              Platform
            </a>
            <a 
              href="#directory" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-blue-900/40 text-[#c8f526] font-semibold border border-[#c8f526]/30"
            >
              Partner Directory
            </a>
            <a 
              href="#industries" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-blue-950/60 text-slate-200 hover:text-white"
            >
              Industries
            </a>
            <a 
              href="#partner-levels" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-blue-950/60 text-slate-200 hover:text-white"
            >
              Partner Levels
            </a>
            <a 
              href="#benefits" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-blue-950/60 text-slate-200 hover:text-white"
            >
              Partner Benefits
            </a>
            <a 
              href="#case-studies" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-blue-950/60 text-slate-200 hover:text-white"
            >
              Success Stories
            </a>
            <a 
              href="#referrals" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-[#c8f526]/10 border border-[#c8f526]/40 text-[#c8f526] font-bold col-span-2 flex items-center justify-between"
            >
              <span>Partner Referral & Rewards</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#c8f526] text-[#071938] font-black">Dashboard</span>
            </a>
          </div>

          <div className="pt-2 border-t border-blue-900/60 space-y-3">
            {/* Language Selector in Mobile Drawer */}
            <div>
              <LanguageSelector variant="mobile" />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                Display Currency
              </label>
              <CurrencySelector variant="drawer" />
            </div>

            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onBecomePartnerClick();
              }}
              className="w-full py-2.5 rounded-xl border border-[#c8f526]/40 text-[#c8f526] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#c8f526]/10"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('nav.become_partner', undefined, 'Apply to Become a Partner')}</span>
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                handlePortal();
              }}
              className="w-full py-2.5 rounded-xl bg-blue-900/40 text-slate-200 font-medium text-sm hover:bg-blue-800/40"
            >
              {t('nav.partner_portal', undefined, 'Partner Portal Login')}
            </button>
          </div>

          <div className="pt-2 text-center text-xs text-slate-400">
            Official NextSofthr Support: <a href="tel:+2349158482622" className="text-[#c8f526] font-semibold">+234 915 848 2622</a>
          </div>
        </div>
      )}
    </header>
  );
};
