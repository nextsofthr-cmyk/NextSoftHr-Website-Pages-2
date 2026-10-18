import React from 'react';
import { 
  Building2, 
  Printer, 
  Sun, 
  Moon, 
  Globe,
  Calculator, 
  FileText, 
  Award, 
  ShieldCheck, 
  Receipt, 
  AlertCircle, 
  CheckCircle2,
  Phone,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import { useCommissionLanguage } from '../context/LanguageContext';
import { LanguageSelector } from '../../homepage/components/LanguageSelector';

export type TabType = 'simulator' | 'schedule' | 'tiers' | 'leads' | 'statements' | 'disputes' | 'acceptance';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onPrint: () => void;
  onJumpToSection: (sectionId: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  toggleTheme,
  onPrint,
  onJumpToSection,
}) => {
  const { t } = useCommissionLanguage();

  const navItems: { id: TabType; labelKey: string; badgeKey?: string; icon: React.ElementType }[] = [
    { id: 'simulator', labelKey: 'tab.simulator', badgeKey: 'tab.simulator_badge', icon: Calculator },
    { id: 'schedule', labelKey: 'tab.schedule', badgeKey: 'tab.schedule_badge', icon: FileText },
    { id: 'tiers', labelKey: 'tab.tiers', badgeKey: 'tab.tiers_badge', icon: Award },
    { id: 'leads', labelKey: 'tab.leads', badgeKey: 'tab.leads_badge', icon: ShieldCheck },
    { id: 'statements', labelKey: 'tab.statements', badgeKey: 'tab.statements_badge', icon: Receipt },
    { id: 'disputes', labelKey: 'tab.disputes', badgeKey: 'tab.disputes_badge', icon: AlertCircle },
    { id: 'acceptance', labelKey: 'tab.acceptance', badgeKey: 'tab.acceptance_badge', icon: CheckCircle2 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 shadow-md dark:shadow-2xl transition-colors no-print">
      {/* Top Corporate Utility Bar */}
      <div className="bg-slate-100 dark:bg-gradient-to-r dark:from-slate-900 dark:via-indigo-950/60 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800/50 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 py-1.5 px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 transition-colors">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400 font-bold tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse"></span>
            {t('brand.program')}
          </span>
          <span className="hidden md:inline-block text-slate-300 dark:text-slate-700">|</span>
          <span className="hidden md:inline-block text-slate-500 dark:text-slate-400 italic">
            "{t('brand.motto')}"
          </span>
          <span className="hidden lg:inline-block text-slate-300 dark:text-slate-700">|</span>
          <span className="hidden lg:inline-block text-slate-500 dark:text-slate-400">
            {t('brand.schedule_b')}
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px]">
          <a
            href="https://www.nextsofthr.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          >
            <Globe className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
            <span>www.nextsofthr.org</span>
          </a>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <a
            href="tel:+2349158482622"
            className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          >
            <Phone className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
            <span>+2349158482622</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div
          onClick={() => setActiveTab('simulator')}
          className="cursor-pointer flex items-center gap-3 group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                Next<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-blue-500">Soft</span>HR
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-cyan-950/80 dark:text-cyan-300 border border-blue-200 dark:border-cyan-800/60 uppercase tracking-wider">
                Schedule B
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {t('brand.doc_subtitle')}
            </p>
          </div>
        </div>

        {/* Right Action Tools: Language Switcher, Dark/Light Toggle, Print */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Shared site-wide language switcher (same as homepage) */}
          <LanguageSelector variant="dropdown" />

          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={isDarkMode ? t('nav.light_mode') : t('nav.dark_mode')}
            title={isDarkMode ? t('nav.light_mode') : t('nav.dark_mode')}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-amber-400 border border-slate-300 dark:border-slate-700/80 shadow-xs transition-all cursor-pointer"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Print / Save PDF Button */}
          <button
            onClick={onPrint}
            title={t('nav.print')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950 hover:bg-blue-600 dark:hover:bg-cyan-400 text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t('nav.print')}</span>
          </button>
        </div>
      </div>

      {/* Program Vital Metrics Ticker */}
      <div className="bg-slate-50 dark:bg-slate-900/60 border-t border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2 text-xs transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
              <strong className="text-slate-900 dark:text-white font-mono">15%–40%</strong> {t('ticker.commission_range')}
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <strong className="text-slate-900 dark:text-white font-mono">90 Days</strong> {t('ticker.lead_protection')}
            </span>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <DollarSign className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <strong className="text-slate-900 dark:text-white font-mono">$100</strong> {t('ticker.payout_threshold')}
            </span>
            <span className="hidden lg:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <strong className="text-slate-900 dark:text-white font-mono">100%</strong> {t('ticker.services_retained')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('acceptance')}
              className="text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{t('ticker.sign_schedule')}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
        <nav className="flex space-x-1 sm:space-x-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 dark:bg-gradient-to-r dark:from-cyan-600/20 dark:to-blue-600/20 text-blue-700 dark:text-cyan-300 border border-blue-300 dark:border-cyan-500/40 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/80 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{t(item.labelKey)}</span>
                {item.badgeKey && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive
                        ? 'bg-blue-200 text-blue-800 dark:bg-cyan-500/20 dark:text-cyan-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {t(item.badgeKey)}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
