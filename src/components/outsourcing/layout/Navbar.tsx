import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  CreditCard, 
  Briefcase, 
  Building, 
  Sparkles, 
  Lock, 
  Globe2, 
  BarChart3, 
  Calendar,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { NavigationPage } from '../../types';
import { CurrencySelector } from './CurrencySelector';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenLeadModal: (service?: string) => void;
  onOpenPortals: (portal?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenLeadModal,
  onOpenPortals
}) => {
  const { t } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (page: NavigationPage) => {
    onNavigate(page);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full" ref={navRef}>
      {/* Top Utility Ribbon */}
      <div className="bg-[#061537] text-slate-300 text-xs py-1.5 px-4 border-b border-blue-900/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-lime-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse"></span>
              {t('ribbon.badge', 'Pan-African Payroll & Workforce Outsourcing')}
            </span>
            <span className="text-slate-500">|</span>
            <span>{t('ribbon.coverage', 'Covering Nigeria, Ghana, Kenya, South Africa, Rwanda, Senegal & 15+ Markets')}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400">{t('ribbon.language', 'Language')}:</span>
              <LanguageSelector variant="compact" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400">{t('ribbon.currency', 'Currency')}:</span>
              <CurrencySelector variant="compact" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400">{t('ribbon.theme', 'Theme')}:</span>
              <ThemeToggle variant="compact" />
            </div>
            <span className="text-slate-600">·</span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('compliance')}>
              {t('ribbon.compliance', 'Compliance Center')}
            </span>
            <span className="text-slate-600">·</span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('calculator')}>
              {t('ribbon.calculator', 'ROI Calculator')}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 font-mono">www.nextsofthr.org</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`w-full transition-all duration-200 border-b ${
          isScrolled 
            ? 'bg-white/95 dark:bg-[#06122E]/95 backdrop-blur-md shadow-sm border-slate-200 dark:border-blue-900/40 py-3' 
            : 'bg-white dark:bg-[#06122E] border-slate-100 dark:border-blue-950 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <div 
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer"
          >
            <BrandLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-medium text-slate-700">
            {/* HOME */}
            <button
              onClick={() => handleLinkClick('home')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'home' 
                  ? 'text-[#0F2D6B] font-bold bg-blue-50/70' 
                  : 'hover:text-[#0F2D6B] hover:bg-slate-50'
              }`}
            >
              {t('nav.home', 'Home')}
            </button>

            {/* OUTSOURCING (Mega Menu) */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'outsourcing' ? null : 'outsourcing')}
                onMouseEnter={() => setActiveDropdown('outsourcing')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  currentPage.startsWith('outsourcing') 
                    ? 'text-[#0F2D6B] font-bold bg-blue-50/70' 
                    : 'hover:text-[#0F2D6B] hover:bg-slate-50'
                }`}
              >
                <span>{t('nav.outsourcing', 'Outsourcing')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'outsourcing' ? 'rotate-180 text-lime-600' : ''}`} />
              </button>

              {activeDropdown === 'outsourcing' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-1 w-[580px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="col-span-2 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#0F2D6B] uppercase tracking-wider">Outsourcing Service Lines</span>
                      <p className="text-xs text-slate-500">Technology-powered managed operations for modern teams</p>
                    </div>
                    <button 
                      onClick={() => handleLinkClick('outsourcing-hub')}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                      Hub Overview <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div 
                    onClick={() => handleLinkClick('outsourcing-payroll')}
                    className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-[#0F2D6B]">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Payroll Outsourcing</div>
                        <div className="text-xs text-slate-500 mt-0.5">End-to-end calculations, statutory PAYE, pensions & payslips</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    onClick={() => handleLinkClick('outsourcing-hr-admin')}
                    className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-lime-50 text-lime-700">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">HR Administration</div>
                        <div className="text-xs text-slate-500 mt-0.5">Lifecycle records, onboarding, letters & documentation</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    onClick={() => handleLinkClick('outsourcing-managed-hr')}
                    className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-purple-50 text-purple-700">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Managed HR Services</div>
                        <div className="text-xs text-slate-500 mt-0.5">Your outsourced HR department + strategic partner</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    onClick={() => handleLinkClick('outsourcing-recruitment')}
                    className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Recruitment & Talent</div>
                        <div className="text-xs text-slate-500 mt-0.5">ATS pipelines, candidate screening & AI recruitment assistant</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    onClick={() => handleLinkClick('outsourcing-employee-admin')}
                    className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Employee Administration</div>
                        <div className="text-xs text-slate-500 mt-0.5">Centralized records, job history, contracts & emergency contacts</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    onClick={() => handleLinkClick('multi-company')}
                    className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Enterprise Workforce</div>
                        <div className="text-xs text-slate-500 mt-0.5">Multi-entity holding groups, subsidiaries & branches</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* HR FEATURES */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'hr' ? null : 'hr')}
                onMouseEnter={() => setActiveDropdown('hr')}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#0F2D6B] hover:bg-slate-50 transition-colors"
              >
                <span>HR</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'hr' ? 'rotate-180 text-lime-600' : ''}`} />
              </button>

              {activeDropdown === 'hr' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <button 
                    onClick={() => handleLinkClick('outsourcing-hr-admin')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center justify-between"
                  >
                    <span>HR Management</span>
                  </button>
                  <button 
                    onClick={() => handleLinkClick('outsourcing-employee-admin')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center justify-between"
                  >
                    <span>Employee Management</span>
                  </button>
                  <button 
                    onClick={() => handleLinkClick('outsourcing-recruitment')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center justify-between"
                  >
                    <span>Recruitment & ATS</span>
                  </button>
                  <button 
                    onClick={() => handleLinkClick('outsourcing-time-attendance')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center justify-between"
                  >
                    <span>Time & Attendance</span>
                  </button>
                  <button 
                    onClick={() => handleLinkClick('outsourcing-leave')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center justify-between"
                  >
                    <span>Leave Management</span>
                  </button>
                  <button 
                    onClick={() => { onOpenPortals('employee-ess'); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-lime-700 bg-lime-50/60 hover:bg-lime-100/60 rounded-lg flex items-center justify-between"
                  >
                    <span>Employee Self-Service (ESS)</span>
                    <span className="text-[10px] bg-lime-200 text-lime-900 px-1.5 py-0.5 rounded">Portal</span>
                  </button>
                </div>
              )}
            </div>

            {/* PAYROLL */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'payroll' ? null : 'payroll')}
                onMouseEnter={() => setActiveDropdown('payroll')}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#0F2D6B] hover:bg-slate-50 transition-colors"
              >
                <span>Payroll</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'payroll' ? 'rotate-180 text-lime-600' : ''}`} />
              </button>

              {activeDropdown === 'payroll' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <button 
                    onClick={() => handleLinkClick('outsourcing-payroll')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                  >
                    Payroll Management
                  </button>
                  <button 
                    onClick={() => handleLinkClick('outsourcing-payroll')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                  >
                    Payroll Processing Engine
                  </button>
                  <button 
                    onClick={() => handleLinkClick('multi-country')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 rounded-lg flex items-center justify-between"
                  >
                    <span>Multi-Country African Payroll</span>
                    <Globe2 className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                  <button 
                    onClick={() => handleLinkClick('analytics')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                  >
                    Payroll Reports & Analytics
                  </button>
                  <button 
                    onClick={() => { onOpenPortals('employee-ess'); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                  >
                    Employee Payslips Portal
                  </button>
                </div>
              )}
            </div>

            {/* SOLUTIONS */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
                onMouseEnter={() => setActiveDropdown('solutions')}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#0F2D6B] hover:bg-slate-50 transition-colors"
              >
                <span>{t('nav.solutions', 'Solutions')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'solutions' ? 'rotate-180 text-lime-600' : ''}`} />
              </button>

              {activeDropdown === 'solutions' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <button 
                    onClick={() => handleLinkClick('packages')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                  >
                    {t('nav.small_business', 'Small Business Solutions')}
                  </button>
                  <button 
                    onClick={() => handleLinkClick('packages')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                  >
                    {t('nav.growing_business', 'Growing Business Solutions')}
                  </button>
                  <button 
                    onClick={() => handleLinkClick('multi-company')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                  >
                    {t('nav.enterprise_multi_company', 'Enterprise Multi-Company')}
                  </button>
                  <button 
                    onClick={() => handleLinkClick('multi-company')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                  >
                    {t('nav.multi_branch', 'Multi-Branch Workforce')}
                  </button>
                  <button 
                    onClick={() => handleLinkClick('multi-country')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50/50 hover:bg-blue-100/50 rounded-lg"
                  >
                    {t('nav.pan_african', 'Pan-African Expansion')}
                  </button>
                </div>
              )}
            </div>

            {/* PACKAGES */}
            <button
              onClick={() => handleLinkClick('packages')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'packages' 
                  ? 'text-[#0F2D6B] font-bold bg-blue-50/70' 
                  : 'hover:text-[#0F2D6B] hover:bg-slate-50'
              }`}
            >
              {t('nav.packages', 'Packages')}
            </button>

            {/* PARTNERS */}
            <button
              onClick={() => handleLinkClick('partners')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'partners' 
                  ? 'text-[#0F2D6B] font-bold bg-blue-50/70' 
                  : 'hover:text-[#0F2D6B] hover:bg-slate-50'
              }`}
            >
              {t('nav.partners', 'Partners')}
            </button>

            {/* RESOURCES (Compliance, Migration, Security, ROI) */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                onMouseEnter={() => setActiveDropdown('resources')}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#0F2D6B] hover:bg-slate-50 transition-colors"
              >
                <span>{t('nav.resources', 'Resources')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'resources' ? 'rotate-180 text-lime-600' : ''}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute right-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <button 
                    onClick={() => handleLinkClick('compliance')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Compliance Center</span>
                  </button>
                  <button 
                    onClick={() => handleLinkClick('calculator')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                  >
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <span>Outsourcing ROI Calculator</span>
                  </button>
                  <button 
                    onClick={() => handleLinkClick('migration')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-amber-600" />
                    <span>Data Migration Center</span>
                  </button>
                  <button 
                    onClick={() => handleLinkClick('implementation')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span>Implementation Timeline</span>
                  </button>
                  <button 
                    onClick={() => handleLinkClick('integrations')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4 text-teal-600" />
                    <span>Integrations Directory</span>
                  </button>
                  <button 
                    onClick={() => handleLinkClick('security')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-slate-600" />
                    <span>Enterprise Security Center</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-2.5">
            {/* Theme Toggle */}
            <ThemeToggle variant="standard" />

            {/* Language Selector */}
            <LanguageSelector variant="light" />

            {/* Currency Selector */}
            <CurrencySelector variant="light" />

            {/* Live Portals Switcher */}
            <button
              onClick={() => onOpenPortals()}
              className="px-3.5 py-2 text-xs font-semibold text-[#0F2D6B] dark:text-slate-200 bg-slate-100 hover:bg-slate-200/80 dark:bg-[#0B1A3D] dark:hover:bg-[#122452] dark:border-blue-900/50 rounded-xl transition-all flex items-center gap-1.5 border border-slate-200"
            >
              <Lock className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>{t('nav.portals', 'Live Portals')}</span>
            </button>

            {/* Primary CTA */}
            <button
              onClick={() => onOpenLeadModal()}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-1.5"
            >
              <span>{t('nav.talk_expert', 'Talk to an Expert')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button & Quick Controls */}
          <div className="lg:hidden flex items-center gap-1.5">
            <LanguageSelector variant="light" className="scale-90" />
            <CurrencySelector variant="light" className="scale-90" />
            <button
              onClick={() => onOpenLeadModal()}
              className="px-2.5 py-1.5 text-xs font-bold text-slate-950 bg-lime-400 rounded-lg hidden sm:block"
            >
              {t('nav.talk_expert', 'Talk to Expert')}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#06122E] border-b border-slate-200 dark:border-blue-900/40 shadow-xl max-h-[85vh] overflow-y-auto px-4 py-5 space-y-4">
          {/* Mobile Global Controls: Language, Currency & Theme */}
          <div className="p-3 bg-slate-50 dark:bg-[#0A1938] rounded-2xl border border-slate-200 dark:border-blue-900/60 grid grid-cols-2 gap-2.5">
            <div className="col-span-2 sm:col-span-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                {t('ribbon.language', 'Language')}
              </span>
              <LanguageSelector variant="light" className="w-full" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                {t('ribbon.currency', 'Currency')}
              </span>
              <CurrencySelector variant="light" className="w-full" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                {t('ribbon.theme', 'Theme')}
              </span>
              <ThemeToggle variant="standard" />
            </div>
          </div>

          <div className="space-y-1">
            <button 
              onClick={() => handleLinkClick('home')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-50 dark:hover:bg-blue-950/50"
            >
              Home
            </button>
            <button 
              onClick={() => handleLinkClick('outsourcing-hub')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-[#0F2D6B] dark:text-lime-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50"
            >
              Outsourcing Hub
            </button>
            <div className="pl-3 py-1 space-y-1 border-l-2 border-slate-100 dark:border-blue-900/50 ml-3">
              <button onClick={() => handleLinkClick('outsourcing-payroll')} className="block text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1">Payroll Outsourcing</button>
              <button onClick={() => handleLinkClick('outsourcing-hr-admin')} className="block text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1">HR Administration</button>
              <button onClick={() => handleLinkClick('outsourcing-managed-hr')} className="block text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1">Managed HR Services</button>
              <button onClick={() => handleLinkClick('outsourcing-recruitment')} className="block text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1">Recruitment Outsourcing</button>
              <button onClick={() => handleLinkClick('outsourcing-employee-admin')} className="block text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1">Employee Administration</button>
              <button onClick={() => handleLinkClick('outsourcing-time-attendance')} className="block text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1">Time & Attendance</button>
              <button onClick={() => handleLinkClick('outsourcing-leave')} className="block text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1">Leave Management</button>
            </div>
            <button 
              onClick={() => handleLinkClick('multi-country')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-50 dark:hover:bg-blue-950/50"
            >
              Pan-African Multi-Country
            </button>
            <button 
              onClick={() => handleLinkClick('packages')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-50 dark:hover:bg-blue-950/50"
            >
              Outsourcing Packages
            </button>
            <button 
              onClick={() => handleLinkClick('compliance')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-50 dark:hover:bg-blue-950/50"
            >
              Compliance Center
            </button>
            <button 
              onClick={() => handleLinkClick('calculator')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-50 dark:hover:bg-blue-950/50"
            >
              Outsourcing ROI Calculator
            </button>
            <button 
              onClick={() => handleLinkClick('migration')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-50 dark:hover:bg-blue-950/50"
            >
              Data Migration Center
            </button>
            <button 
              onClick={() => handleLinkClick('partners')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-50 dark:hover:bg-blue-950/50"
            >
              Partner Program
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-blue-900/50 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenPortals(); }}
              className="w-full py-2.5 text-center text-xs font-semibold text-[#0F2D6B] dark:text-lime-300 bg-blue-50 dark:bg-blue-900/40 rounded-xl"
            >
              Open Portals (Client / Employee / Manager)
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenLeadModal(); }}
              className="w-full py-2.5 text-center text-xs font-bold text-slate-950 bg-lime-400 rounded-xl"
            >
              Talk to an Outsourcing Expert
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
