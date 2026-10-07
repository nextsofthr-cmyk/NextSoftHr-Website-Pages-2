import { useState, useEffect } from 'react';
import { 
  Users, CreditCard, Clock, Calendar, Sparkles, Briefcase, 
  Menu, X, ChevronDown, ArrowRight, ShieldCheck,
  TrendingUp, Laptop, Layers, Headphones, Globe, Coins
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { CurrencySelector } from './CurrencySelector';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
  onOpenExpert: () => void;
}

export const Navbar = ({ onOpenDemo, onOpenGetStarted, onOpenExpert }: NavbarProps) => {
  const { dict } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformDropdown, setPlatformDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const modulesList = [
    { key: 'coreHr', icon: Users, href: '#core-hr', defaultName: dict.modules.coreHr.name, defaultDesc: dict.modules.coreHr.desc },
    { key: 'payroll', icon: CreditCard, href: '#payroll', badge: dict.modules.payroll.badge || 'Popular', defaultName: dict.modules.payroll.name, defaultDesc: dict.modules.payroll.desc },
    { key: 'attendance', icon: Clock, href: '#attendance', defaultName: dict.modules.attendance.name, defaultDesc: dict.modules.attendance.desc },
    { key: 'shifts', icon: Calendar, href: '#shifts', defaultName: dict.modules.shifts.name, defaultDesc: dict.modules.shifts.desc },
    { key: 'leave', icon: Calendar, href: '#leave', defaultName: dict.modules.leave.name, defaultDesc: dict.modules.leave.desc },
    { key: 'talent', icon: Briefcase, href: '#talent', defaultName: dict.modules.talent.name, defaultDesc: dict.modules.talent.desc },
    { key: 'businessOps', icon: TrendingUp, href: '#business-ops', defaultName: dict.modules.businessOps.name, defaultDesc: dict.modules.businessOps.desc },
    { key: 'selfService', icon: Laptop, href: '#self-service', defaultName: dict.modules.selfService.name, defaultDesc: dict.modules.selfService.desc },
    { key: 'finance', icon: Layers, href: '#business-ops', defaultName: dict.modules.finance.name, defaultDesc: dict.modules.finance.desc }
  ];

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
              {dict.nav.announcement}
            </span>
            <span className="text-slate-300 sm:hidden truncate max-w-[220px]">
              {dict.nav.announcementMobile}
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-slate-300 text-[11px]">
            <button 
              onClick={onOpenExpert}
              className="hover:text-lime-400 flex items-center gap-1 transition-colors"
            >
              <Headphones className="w-3 h-3 text-lime-400" />
              <span>{dict.nav.talkExpert}</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
              <span>{dict.nav.uptime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className={`transition-all duration-200 ${isScrolled ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800 py-3' : 'bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <div className="relative flex items-center justify-center">
                <span className="font-display font-extrabold text-lg tracking-tighter text-white">N</span>
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-lime-400 rounded-full ring-2 ring-blue-600"></span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white leading-none">
                NextSoft<span className="text-blue-600 dark:text-blue-400">hr</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                Workforce OS
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Platform Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setPlatformDropdown(true)}
              onMouseLeave={() => setPlatformDropdown(false)}
            >
              <button
                id="platform-menu-trigger"
                onClick={() => setPlatformDropdown(!platformDropdown)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${platformDropdown ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-900' : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900'}`}
              >
                <span>{dict.nav.platform}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${platformDropdown ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
              </button>

              {platformDropdown && (
                <div 
                  id="platform-mega-menu"
                  className="absolute top-full left-0 w-[580px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-4 grid grid-cols-2 gap-2 animate-fadeIn z-50 mt-1"
                >
                  {modulesList.map((mod) => (
                    <a
                      key={mod.key}
                      href={mod.href}
                      onClick={() => setPlatformDropdown(false)}
                      className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-start gap-3 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <mod.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {mod.defaultName}
                          </span>
                          {mod.badge && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-400 border border-lime-200 dark:border-lime-800">
                              {mod.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {mod.defaultDesc}
                        </p>
                      </div>
                    </a>
                  ))}

                  <div className="col-span-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs px-2">
                    <span className="text-slate-500 dark:text-slate-400">{dict.nav.needHelpModules}</span>
                    <button
                      onClick={() => { setPlatformDropdown(false); onOpenExpert(); }}
                      className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                    >
                      <span>{dict.nav.exploreCustomConfig}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a href="#ai-assistant" className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-lime-600 dark:text-lime-400" />
              <span>{dict.nav.aiAssistant}</span>
            </a>

            <a href="#outsourcing" className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors">
              {dict.nav.outsourcing}
            </a>

            <a href="#savings-calculator" className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
              <span>{dict.nav.roiCalculator}</span>
            </a>

            <a href="#pricing" className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors">
              {dict.nav.pricing}
            </a>

            <a href="#customer-stories" className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors">
              {dict.nav.customerStories}
            </a>

            <a href="#faqs" className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors">
              {dict.nav.faq}
            </a>
          </nav>

          {/* Action CTAs, Language Selector, Currency Selector & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Global Currency Selector (NGN, USD, KES, EUR, GBP) */}
            <CurrencySelector variant="dropdown" />

            {/* International Language Selector */}
            <LanguageSelector variant="dropdown" />

            {/* Persistent Theme Switcher */}
            <ThemeToggle variant="segmented" />

            <button
              id="nav-book-demo-btn"
              onClick={onOpenDemo}
              className="px-3.5 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            >
              {dict.nav.bookDemo}
            </button>

            <button
              id="nav-get-started-btn"
              onClick={onOpenGetStarted}
              className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>{dict.nav.getStarted}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-lime-400 group-hover:scale-125 transition-transform" />
            </button>
          </div>

          {/* Mobile header controls */}
          <div className="flex lg:hidden items-center gap-1.5">
            <CurrencySelector variant="compact" />
            <LanguageSelector variant="dropdown" />
            <ThemeToggle />
            <button
              id="mobile-quick-start-btn"
              onClick={onOpenGetStarted}
              className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg"
            >
              {dict.nav.getStarted}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-4 pb-6 space-y-3 animate-fadeIn">
            <div className="font-bold text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
              {dict.nav.platformCapabilities}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {modulesList.map((m) => (
                <a
                  key={m.key}
                  href={m.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2"
                >
                  <m.icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span className="truncate">{m.defaultName}</span>
                </a>
              ))}
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
              <a
                href="#ai-assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg"
              >
                {dict.nav.aiAssistant}
              </a>
              <a
                href="#outsourcing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg"
              >
                {dict.nav.outsourcing}
              </a>
              <a
                href="#savings-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-900 rounded-lg"
              >
                {dict.nav.roiCalculator}
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg"
              >
                {dict.nav.pricing}
              </a>
              <a
                href="#customer-stories"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg"
              >
                {dict.nav.customerStories}
              </a>
              <a
                href="#faqs"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg"
              >
                {dict.nav.faq}
              </a>
            </div>

            {/* Currency Selection row */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/60">
              <div className="flex items-center gap-2">
                <Coins className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Currency</span>
              </div>
              <CurrencySelector variant="segmented" />
            </div>

            {/* Language Selection row */}
            <div className="pt-2 flex items-center justify-between px-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/60">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{dict.nav.language}</span>
              </div>
              <LanguageSelector variant="segmented" />
            </div>

            {/* Appearance Mode item */}
            <div className="pt-2 flex items-center justify-between px-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/60">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{dict.nav.theme}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">{dict.nav.appearance}</span>
              </div>
              <ThemeToggle variant="segmented" />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenDemo(); }}
                className="w-full py-2.5 text-sm font-bold text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {dict.nav.bookDemo}
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenExpert(); }}
                className="w-full py-2.5 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-900 rounded-xl hover:bg-blue-100 dark:hover:bg-slate-800"
              >
                {dict.nav.talkExpert}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

