import React from 'react';
import { 
  Building2, 
  Printer, 
  Globe,
  ShieldCheck, 
  CheckCircle2,
  Phone,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import { useCommissionLanguage } from '../context/LanguageContext';

export type TabType = 'simulator' | 'schedule' | 'tiers' | 'leads' | 'statements' | 'disputes' | 'acceptance';

interface HeaderProps {
  onPrint: () => void;
  onScrollToSection?: (sectionId: string) => void;
  onJumpToSection?: (sectionId: number) => void;
  // Optional for backward compatibility
  activeTab?: TabType;
  setActiveTab?: (tab: TabType) => void;
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onPrint,
  onScrollToSection,
}) => {
  const { t } = useCommissionLanguage();

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 shadow-md dark:shadow-2xl transition-colors no-print">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 relative z-30">
        {/* Brand identity */}
        <div
          onClick={() => {
            if (onScrollToSection) onScrollToSection('simulator');
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
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

        {/* Right Action Tools: Print */}
        <div className="flex items-center gap-2 sm:gap-3 relative z-30">
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
      <div className="bg-slate-50 dark:bg-slate-900/60 border-t border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2 text-xs transition-colors overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-slate-500 dark:text-slate-400 min-w-max">
          <div className="flex items-center gap-3 sm:gap-5 whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
              <strong className="text-slate-900 dark:text-white font-mono">15%–40%</strong> {t('ticker.commission_range')}
            </span>
            <span className="text-slate-300 dark:text-slate-700 shrink-0">•</span>
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <strong className="text-slate-900 dark:text-white font-mono">90 Days</strong> {t('ticker.lead_protection')}
            </span>
            <span className="text-slate-300 dark:text-slate-700 shrink-0">•</span>
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 shrink-0">
              <DollarSign className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <strong className="text-slate-900 dark:text-white font-mono">$100</strong> {t('ticker.payout_threshold')}
            </span>
            <span className="text-slate-300 dark:text-slate-700 shrink-0">•</span>
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <strong className="text-slate-900 dark:text-white font-mono">100%</strong> {t('ticker.services_retained')}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
            <button
              onClick={() => {
                if (onScrollToSection) onScrollToSection('acceptance');
              }}
              className="text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{t('ticker.sign_schedule')}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
