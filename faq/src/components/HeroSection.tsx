import React, { useRef, useEffect } from 'react';
import { Search, X, Sparkles, CheckCircle2, TrendingUp, Users, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { POPULAR_SEARCH_TERMS } from '../data/faqData';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectQuery: (query: string) => void;
  totalQuestions: number;
  totalCategories: number;
  onOpenAI: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSelectQuery,
  totalQuestions,
  totalCategories,
  onOpenAI,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  // Global hotkey '/' to jump to search, Esc to clear
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        onSearchChange('');
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearchChange]);

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 bg-linear-to-b from-blue-50/50 via-white to-[#F8FAFC] dark:from-[#0B1528] dark:via-[#080E1E] dark:to-[#080E1E] transition-colors duration-200">
      {/* Abstract SaaS Background Grids & Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-25">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-200/40 dark:bg-blue-600/20 blur-3xl" />
        <div className="absolute top-1/4 -right-24 w-80 h-80 rounded-full bg-lime-200/40 dark:bg-lime-500/15 blur-3xl" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-30 dark:opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Copy and Search */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-[#111F42] border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs mb-5">
              <span className="w-2 h-2 rounded-full bg-lime-500 dark:bg-lime-400 animate-pulse" />
              <span className="tracking-wide uppercase text-[11px] text-blue-900 dark:text-blue-300 font-bold">{t('hero.badge', 'NEXTSOFTHR SUPPORT CENTER')}</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-slate-500 dark:text-slate-400 font-normal">{t('hero.badgeSub', 'Global Knowledge Base')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] text-balance mb-4">
              {t('hero.title', 'Frequently Asked')} <span className="text-blue-700 dark:text-blue-400">{t('hero.titleHighlight', 'Questions')}</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t('hero.subtitle', 'Find clear answers about NextSoftHR, our HR, payroll, workforce management and business management solutions.')}
            </p>

            {/* Search Box Container */}
            <div className="relative max-w-2xl mx-auto lg:mx-0 mb-6">
              <div className="relative flex items-center shadow-md rounded-xl bg-white dark:bg-[#0F1D3D] border-2 border-slate-200 dark:border-slate-700/80 hover:border-blue-500/80 dark:hover:border-blue-400/80 focus-within:border-blue-600 dark:focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/40 transition-all duration-200">
                <div className="pl-4 pr-2 text-slate-400">
                  <Search className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const el = document.getElementById('faq-main') || document.getElementById('faq-accordion-list');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  placeholder={t('hero.searchPlaceholder', 'Search your question (e.g. payroll, multi-company, self-service)...')}
                  className="w-full py-4 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-transparent focus:outline-none"
                  aria-label="Search frequently asked questions"
                />
                
                {searchQuery ? (
                  <button
                    onClick={() => onSearchChange('')}
                    className="p-2 mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="hidden sm:flex items-center gap-1 mr-3 px-2 py-1 bg-slate-100 dark:bg-[#162752] text-[11px] font-medium text-slate-500 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700">
                    <span>{t('hero.press', 'Press')}</span>
                    <kbd className="font-semibold text-slate-700 dark:text-slate-200">/</kbd>
                  </div>
                )}

                <button
                  onClick={() => {
                    const el = document.getElementById('faq-accordion-list');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 mr-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>{t('hero.searchBtn', 'Search')}</span>
                </button>
              </div>
            </div>

            {/* Popular Search Suggestions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium mr-1">{t('hero.popular', 'Popular queries:')}</span>
              {POPULAR_SEARCH_TERMS.slice(0, 4).map((term) => (
                <button
                  key={term}
                  onClick={() => onSelectQuery(term)}
                  className="px-2.5 py-1 rounded-md bg-white dark:bg-[#111F42] hover:bg-blue-50 dark:hover:bg-[#162752] text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 border border-slate-200/80 dark:border-slate-700/80 transition-colors text-left"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Proof and Metric Indicators */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{totalQuestions}+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('hero.statVerified', 'Verified Answers')}</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">{totalCategories}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('hero.statModules', 'Core Modules')}</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center lg:justify-start gap-1">
                  <span>99.98%</span>
                  <span className="w-2 h-2 rounded-full bg-lime-500 dark:bg-lime-400 inline-block" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('hero.statSla', 'Global Uptime SLA')}</div>
              </div>
            </div>
          </div>

          {/* Right: Abstract SaaS Dashboard & Workforce Cards */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Interactive SaaS Snapshot Card */}
              <div className="bg-white dark:bg-[#0F1D3D] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-lg relative z-10 space-y-4 transition-colors">
                {/* Header bar of mini mockup */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-700 flex items-center justify-center text-white text-xs font-bold">
                      N
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{t('hero.hubTitle', 'NextSoftHR Executive Hub')}</div>
                      <div className="text-[10px] text-slate-400">{t('hero.hubSub', 'Enterprise Dashboard · Global')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-lime-50 dark:bg-lime-950/60 text-[11px] font-semibold text-lime-700 dark:text-lime-300 border border-lime-200/60 dark:border-lime-700/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
                    <span>{t('hero.realtime', 'Real-time Active')}</span>
                  </div>
                </div>

                {/* Metric Strip */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#111F42] border border-slate-100 dark:border-slate-800">
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>{t('hero.payrollCycle', 'Payroll Cycle')}</span>
                      <TrendingUp className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-1">{t('hero.reconciled', '100% Reconciled')}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{t('hero.statutorySynced', 'Auto statutory deduction synced')}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/40 border border-blue-100/60 dark:border-blue-900/40">
                    <div className="text-[11px] font-medium text-blue-700 dark:text-blue-300 flex items-center justify-between">
                      <span>{t('hero.liveAttendance', 'Live Attendance')}</span>
                      <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-base font-bold text-blue-900 dark:text-blue-200 mt-1">{t('hero.presentRate', '98.4% Present')}</div>
                    <div className="text-[10px] text-blue-600 dark:text-blue-300">{t('hero.mobileCheckins', 'Geo-fenced mobile check-ins')}</div>
                  </div>
                </div>

                {/* Employee Profile Preview Card */}
                <div className="p-3 rounded-xl bg-white dark:bg-[#111F42] border border-slate-200/70 dark:border-slate-700/70 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-700 to-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      AO
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">Amara Okafor</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Lead People Operations · Lagos HQ</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-medium text-slate-400">{t('hero.leaveBalance', 'Leave Balance')}</div>
                    <div className="text-xs font-bold text-blue-700 dark:text-lime-400">{t('hero.daysAvailable', '18 Days Available')}</div>
                  </div>
                </div>

                {/* AI Assistant Instant Teaser */}
                <div className="p-3.5 rounded-xl bg-linear-to-r from-blue-900 to-slate-900 dark:from-[#0B1528] dark:to-[#0F1D3D] text-white relative overflow-hidden border border-blue-800/40">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-lime-400 text-slate-950 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{t('hero.aiTitle', 'NextSoftHR AI Assistant')}</div>
                        <div className="text-[10px] text-slate-300">{t('hero.aiDesc', 'Policy explanation & instant answers')}</div>
                      </div>
                    </div>
                    <button
                      onClick={onOpenAI}
                      className="text-[11px] font-semibold text-lime-300 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>{t('hero.tryAi', 'Try AI')}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Trust Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white dark:bg-[#0F1D3D] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md z-20 items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-lime-500/10 text-lime-700 dark:text-lime-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{t('hero.isoReady', 'Multi-Entity & ISO Ready')}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">SOC 2 Type II · GDPR · NDPR</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
