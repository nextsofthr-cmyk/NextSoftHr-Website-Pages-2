import React from 'react';
import { ArrowDown, CheckCircle2, TrendingUp, Users, DollarSign, Clock, ArrowRight, Bot } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onExploreInsights: () => void;
  onExploreNextSoftHr: () => void;
  onOpenBookDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreInsights,
  onExploreNextSoftHr,
  onOpenBookDemo,
}) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-[#EEF5FC] dark:from-[#061528] dark:via-[#07192F] dark:to-[#0B1E36] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200 dark:border-[#1E3656] transition-colors duration-300">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#0A3F7E]/5 dark:bg-[#0A3F7E]/20 blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-[#8EE000]/10 dark:bg-[#8EE000]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Proposition & CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Kicker Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A3F7E]/10 dark:bg-[#8EE000]/15 border border-[#0A3F7E]/20 dark:border-[#8EE000]/30 text-xs font-semibold text-[#0A3F7E] dark:text-[#8EE000]">
              <span className="w-2 h-2 rounded-full bg-[#8EE000] animate-pulse" />
              <span>{t('hero.badge', 'NextSoftHr Global Workforce & Intelligence Publication')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08] text-balance">
              {t('hero.titleLine1', 'Insights for the')} <br className="hidden sm:inline" />
              <span className="text-[#0A3F7E] dark:text-[#60A5FA] relative inline-block">
                {t('hero.titleLine2', 'Future of Work')}
                <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-[#8EE000]" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0 7 C 25 12, 75 0, 100 6" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t('hero.subtitle', 'Practical HR, payroll, workforce and business-management insights to help organizations build better workplaces, manage people smarter and grow with confidence.')}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onExploreInsights}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] shadow-md hover:shadow-lg transition-all active:scale-[0.98] border border-[#7BC500]"
              >
                <span>{t('hero.ctaInsights', 'Explore Insights')}</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <button
                onClick={onExploreNextSoftHr}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-[#0A3F7E] dark:text-white bg-white dark:bg-[#0E2442] border border-[#0A3F7E]/30 dark:border-[#1E3656] hover:bg-[#0A3F7E]/5 dark:hover:bg-[#122E54] hover:border-[#0A3F7E] dark:hover:border-[#8EE000] shadow-xs transition-all"
              >
                <span>{t('hero.ctaPlatform', 'Explore NextSoftHr')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Key Value Indicators */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-[#1E3656] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8EE000] shrink-0" />
                <span className="font-medium">{t('hero.val1', 'African & Global Scope')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8EE000] shrink-0" />
                <span className="font-medium">{t('hero.val2', '100% Tax & Legal Compliance')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8EE000] shrink-0" />
                <span className="font-medium">{t('hero.val3', 'AI Decision Support')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual SaaS Composition (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A3F7E]/20 to-[#8EE000]/20 rounded-2xl filter blur-xl transform -rotate-1" />

              {/* Main SaaS Platform Showcase Card */}
              <div className="relative bg-white dark:bg-[#0B1E36] rounded-2xl shadow-xl border border-slate-200 dark:border-[#1E3656] overflow-hidden">
                {/* Dashboard Top Header */}
                <div className="bg-[#051A33] px-4 py-3 text-white flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#8EE000]" />
                    <span className="text-[11px] font-mono text-slate-300 ml-2">{t('hero.dashboardTitle', 'NextSoftHr Enterprise Platform')}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8EE000] bg-[#8EE000]/15 px-2 py-0.5 rounded-full border border-[#8EE000]/30">
                    {t('hero.liveSync', 'Live Sync')}
                  </span>
                </div>

                {/* Dashboard Body Preview */}
                <div className="p-4 sm:p-5 space-y-4 bg-slate-50/50 dark:bg-[#07192F]/50">
                  {/* Top Stats Metric Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white dark:bg-[#0E2442] p-3 rounded-xl border border-slate-200/80 dark:border-[#1E3656] shadow-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                        <span>{t('hero.workforce', 'Workforce')}</span>
                        <Users className="w-3.5 h-3.5 text-[#0A3F7E] dark:text-[#8EE000]" />
                      </div>
                      <div className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">1,482</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>+8.4% this quarter</span>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-[#0E2442] p-3 rounded-xl border border-slate-200/80 dark:border-[#1E3656] shadow-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                        <span>{t('hero.payrollDisbursed', 'Payroll Disbursed')}</span>
                        <DollarSign className="w-3.5 h-3.5 text-[#8EE000]" />
                      </div>
                      <div className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">100% OK</div>
                      <div className="text-[10px] text-[#0A3F7E] dark:text-[#8EE000] font-semibold mt-0.5">
                        Zero statutory variance
                      </div>
                    </div>
                  </div>

                  {/* Attendance & Shift Visual Track */}
                  <div className="bg-white dark:bg-[#0E2442] p-3.5 rounded-xl border border-slate-200/80 dark:border-[#1E3656] shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#0A3F7E] dark:text-[#8EE000]" />
                        {t('hero.shiftAttendance', 'Real-Time Shift Attendance')}
                      </span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 text-xs font-bold">98.6%</span>
                    </div>

                    {/* Progress Bar with Lemon Green Accent */}
                    <div className="w-full bg-slate-100 dark:bg-[#07192F] rounded-full h-2 overflow-hidden flex">
                      <div className="bg-[#0A3F7E] dark:bg-[#2563EB] h-2 rounded-l-full" style={{ width: '75%' }} />
                      <div className="bg-[#8EE000] h-2 rounded-r-full" style={{ width: '23.6%' }} />
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-0.5">
                      <span>1,461 Clocked-in</span>
                      <span>15 On Approved Leave</span>
                      <span>6 Field Transit</span>
                    </div>
                  </div>

                  {/* Live AI Assistant Alert Card */}
                  <div className="bg-gradient-to-r from-[#0A3F7E] to-[#062447] text-white p-3.5 rounded-xl shadow-xs border border-white/10 relative overflow-hidden">
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#8EE000] flex items-center justify-center text-slate-950 shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white">{t('hero.aiTitle', 'NextSoftHr AI Assistant')}</span>
                          <span className="text-[9px] font-mono text-[#8EE000] bg-[#8EE000]/20 px-1.5 py-0.2 rounded">
                            Decision Support
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-200 leading-snug">
                          {t('hero.aiAlert', '"Attendance trends indicate increased overtime within Branch 3. Recommended shift rebalance generated."')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Trust Stamp */}
                <div className="px-4 py-2.5 bg-slate-100/80 dark:bg-[#0E2442] border-t border-slate-200 dark:border-[#1E3656] flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
                  <span className="font-medium">{t('hero.multiCurrency', 'Multi-Currency & AfCFTA Ready')}</span>
                  <button
                    onClick={onOpenBookDemo}
                    className="font-bold text-[#0A3F7E] dark:text-[#8EE000] hover:underline flex items-center gap-1"
                  >
                    <span>{t('hero.requestWalkthrough', 'Request Live Platform Walkthrough')}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
