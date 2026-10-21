import React from 'react';
import {
  Users,
  Wallet,
  Clock,
  CalendarCheck,
  Briefcase,
  TrendingUp,
  Receipt,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Play,
} from 'lucide-react';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../data/pricingData';
import { useLanguage } from '../context/LanguageContext';

interface PricingHeroProps {
  onExplorePlans: () => void;
  onOpenDemo: () => void;
  onOpenTrial: () => void;
  selectedCurrency?: CurrencyCode;
}

export const PricingHero: React.FC<PricingHeroProps> = ({
  onExplorePlans,
  onOpenDemo,
  onOpenTrial,
  selectedCurrency = 'USD',
}) => {
  const { t } = useLanguage();
  const currencyConfig = CURRENCIES[selectedCurrency] || CURRENCIES.USD;
  return (
    <section
      id="pricing-hero-section"
      className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-[#F8FAFC] dark:from-[#0B132B] dark:via-[#070D1E] dark:to-[#070D1E] transition-colors duration-200"
    >
      {/* Subtle Background Accents */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-20 pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-tr from-blue-400/10 via-lime-300/10 to-transparent dark:from-blue-600/15 dark:via-lime-500/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Trust Pill */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-xs font-semibold text-[#0265DC] dark:text-blue-300 shadow-sm text-center">
            <span className="w-2 h-2 rounded-full bg-[#A3E635] ring-2 ring-[#84CC16]/40 animate-pulse shrink-0" />
            <span>{t.hero.badge}</span>
          </div>
        </div>

        {/* Hero Title & Copy */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1
            id="pricing-hero-headline"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B132B] dark:text-white leading-[1.12]"
          >
            <span className="text-[#0265DC] dark:text-blue-400 relative inline-block mr-2">
              {t.hero.titleHighlight}
              <svg
                className="absolute left-0 -bottom-1.5 w-full h-3 text-[#A3E635] -z-10"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8.5C50 2 150 2 198 8.5"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            {t.hero.titleRest}
          </h1>

          <p
            id="pricing-hero-copy"
            className="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            {t.hero.subtitle}
          </p>

          {/* Trust Message */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span className="text-[#0265DC] dark:text-blue-400">{t.hero.pill1}</span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span className="text-[#65A30D] dark:text-[#A3E635]">{t.hero.pill2}</span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span className="text-slate-800 dark:text-slate-200">{t.hero.pill3}</span>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              id="hero-start-trial-btn"
              href="/signup"
              className="px-6 py-3.5 rounded-xl font-bold text-slate-900 bg-[#A3E635] hover:bg-[#84CC16] shadow-md shadow-lime-500/20 hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>{t.common.startFreeTrial}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              id="hero-book-demo-btn"
              onClick={onOpenDemo}
              className="px-6 py-3.5 rounded-xl font-semibold text-[#0265DC] dark:text-blue-300 bg-white dark:bg-[#111C38] hover:bg-slate-50 dark:hover:bg-[#162447] border border-slate-200/90 dark:border-slate-700 shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t.common.bookDemo}</span>
            </button>
            <button
              id="hero-compare-plans-btn"
              onClick={onExplorePlans}
              className="px-5 py-3.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
            >
              {t.hero.comparePlansBtn}
            </button>
          </div>
        </div>

        {/* Modern HR Dashboard Visual Representation */}
        <div className="max-w-5xl mx-auto mt-6">
          <div
            id="hero-dashboard-mockup"
            className="rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-blue-900/10 dark:shadow-black/60 p-4 sm:p-6 relative overflow-hidden backdrop-blur-sm"
          >
            {/* Top Bar of the Dashboard */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 ml-2">
                  {t.hero.dashboardView}
                </span>
              </div>
              {/* AI Assistant Pill Badge */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-lime-50 dark:from-slate-800 dark:to-slate-800 border border-blue-200/60 dark:border-blue-800/40 text-xs font-semibold text-[#0265DC] dark:text-blue-300">
                <Sparkles className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#A3E635]" />
                <span>{t.hero.aiAssistantStatus}</span>
              </div>
            </div>

            {/* Dashboard Grid Items: Employee count, Payroll summary, Attendance, Leave requests, Recruitment, Performance, Expenses */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {/* 1. Employee Count */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-[#111C38] border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="text-xs font-medium">{t.hero.employeeCount}</span>
                  <div className="p-1.5 rounded-lg bg-blue-100/70 dark:bg-blue-950 text-[#0265DC] dark:text-blue-400">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">482</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                  <span>{t.hero.joinedMonth}</span>
                </div>
              </div>

              {/* 2. Payroll Summary */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-[#111C38] border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="text-xs font-medium">{t.hero.payrollSummary}</span>
                  <div className="p-1.5 rounded-lg bg-emerald-100/80 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                    <Wallet className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                  {currencyConfig.format(184250)}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{t.hero.onTimeVerified}</span>
                </div>
              </div>

              {/* 3. Attendance Rate */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-[#111C38] border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="text-xs font-medium">{t.hero.attendanceShifts}</span>
                  <div className="p-1.5 rounded-lg bg-blue-100/70 dark:bg-blue-950 text-[#0265DC] dark:text-blue-400">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">98.4%</div>
                <div className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-1">
                  <span>{t.hero.fullShiftCoverage}</span>
                </div>
              </div>

              {/* 4. Leave Requests */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-[#111C38] border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="text-xs font-medium">{t.hero.leaveRequests}</span>
                  <div className="p-1.5 rounded-lg bg-amber-100/80 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
                    <CalendarCheck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">5 Pending</div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
                  <span>{t.hero.approvalsToday}</span>
                </div>
              </div>

              {/* 5. Recruitment Pipeline */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-[#111C38] border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="text-xs font-medium">{t.hero.recruitmentAts}</span>
                  <div className="p-1.5 rounded-lg bg-purple-100/70 dark:bg-purple-950 text-purple-700 dark:text-purple-400">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">3 Openings</div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
                  <span>{t.hero.activeCandidates}</span>
                </div>
              </div>

              {/* 6. Performance Reviews */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-[#111C38] border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="text-xs font-medium">{t.hero.performanceOkrs}</span>
                  <div className="p-1.5 rounded-lg bg-lime-100 dark:lime-950 text-[#65A30D] dark:text-[#A3E635]">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">94% Done</div>
                <div className="flex items-center gap-1 text-[11px] text-[#65A30D] dark:text-[#A3E635] font-medium mt-1">
                  <span>{t.hero.appraisalCycle}</span>
                </div>
              </div>

              {/* 7. Expense Claims */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-[#111C38] border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="text-xs font-medium">{t.hero.expensesClaims}</span>
                  <div className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400">
                    <Receipt className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                  {currencyConfig.format(8420)}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
                  <span>{t.hero.receiptsVerified}</span>
                </div>
              </div>

              {/* 8. AI Copilot Status */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-blue-500 to-[#0265DC] text-white shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1.5 text-blue-100">
                  <span className="text-xs font-medium">AI Workforce Hub</span>
                  <Sparkles className="w-4 h-4 text-[#A3E635]" />
                </div>
                <div>
                  <div className="text-sm font-bold font-display text-white">{t.hero.aiCopilotTitle}</div>
                  <div className="text-[11px] text-blue-100/90 mt-0.5">
                    {t.hero.aiCopilotDesc}
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between text-[10px]">
                  <span className="text-[#A3E635] font-semibold">{t.hero.systemOptimal}</span>
                  <span className="text-white/80">{t.hero.globalSync}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

