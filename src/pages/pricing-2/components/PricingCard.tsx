import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Check, Sparkles, ArrowRight, Headphones, Zap, TrendingDown, Info, X, Plus, Minus, Users } from 'lucide-react';
import { PricingPlan, BillingCycle, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/pricingData';
import { useLanguage } from '../context/LanguageContext';

interface CompetitorBenchmark {
  tierName: string;
  monthlyUSD: number;
  competitors: string[];
  benchmarkBasis: string;
}

const INDUSTRY_COMPETITOR_BENCHMARKS: Record<string, CompetitorBenchmark> = {
  starter: {
    tierName: 'Entry-Level HR & Payroll SaaS',
    monthlyUSD: 69,
    competitors: ['BambooHR Starter', 'Gusto Core', 'ADP Run Starter'],
    benchmarkBasis: 'Standard 10–15 user starter tier + monthly payroll processing fees.',
  },
  professional: {
    tierName: 'Mid-Tier Scaling HR Platforms',
    monthlyUSD: 189,
    competitors: ['Rippling Unity', 'BambooHR Advantage', 'Deel HR Suite'],
    benchmarkBasis: '30–50 seat tier with shift scheduling, overtime rules & multi-tier tax automation.',
  },
  business: {
    tierName: 'Mid-Market Operations HCM',
    monthlyUSD: 389,
    competitors: ['ADP Workforce Now', 'Dayforce HCM', 'Workday Mid-Market'],
    benchmarkBasis: '100+ seats with multi-company branches, CRM, REST API & dedicated onboarding.',
  },
  enterprise: {
    tierName: 'Legacy Enterprise ERPs',
    monthlyUSD: 850,
    competitors: ['Workday Enterprise', 'SAP SuccessFactors', 'Oracle HCM Cloud'],
    benchmarkBasis: 'Global ERP multi-country payroll licenses & enterprise implementation retainers.',
  },
};

const HEADCOUNT_STEPS = [10, 25, 50, 100, 250, 500];

interface PricingCardProps {
  plan: PricingPlan;
  billingCycle: BillingCycle;
  selectedCurrency: CurrencyCode;
  headcount?: number;
  onChangeHeadcount?: (count: number) => void;
  onSelectPlan: (plan: PricingPlan) => void;
  onSubscribePlan?: (plan: PricingPlan) => void;
  onOpenEnterpriseDemo?: () => void;
  pppFactor?: number;
  pppBadgeText?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  billingCycle,
  selectedCurrency,
  headcount = 25,
  onChangeHeadcount,
  onSelectPlan,
  onSubscribePlan,
  onOpenEnterpriseDemo,
  pppFactor = 1.0,
  pppBadgeText,
}) => {
  const { t, tx, language } = useLanguage();
  const currencyConfig = CURRENCIES[selectedCurrency] || CURRENCIES['NGN'];
  const isEnterprise = plan.id === 'enterprise';
  const isProfessional = plan.isPopular;

  // Localized plan fields if available
  const planName =
    plan.id === 'starter'
      ? t.plans.starterName
      : plan.id === 'professional'
      ? t.plans.proName
      : plan.id === 'business'
      ? t.plans.bizName
      : t.plans.entName;

  const planTagline =
    plan.id === 'starter'
      ? t.plans.starterTagline
      : plan.id === 'professional'
      ? t.plans.proTagline
      : plan.id === 'business'
      ? t.plans.bizTagline
      : t.plans.entTagline;

  const employeeAllowance =
    plan.id === 'starter'
      ? t.plans.starterAllowance
      : plan.id === 'professional'
      ? t.plans.proAllowance
      : plan.id === 'business'
      ? t.plans.bizAllowance
      : t.plans.entAllowance;

  const recommendedRange =
    plan.id === 'starter'
      ? t.plans.starterRecommended
      : plan.id === 'professional'
      ? t.plans.proRecommended
      : plan.id === 'business'
      ? t.plans.bizRecommended
      : t.plans.entRecommended;

  const supportLevel =
    plan.id === 'starter'
      ? t.plans.starterSupport
      : plan.id === 'professional'
      ? t.plans.proSupport
      : plan.id === 'business'
      ? t.plans.bizSupport
      : t.plans.entSupport;

  const customText =
    language === 'fr' ? 'Sur mesure' : language === 'pt' || language === 'es' ? 'Personalizado' : 'Custom';

  // Calculate base & per-employee price based on cycle and currency exchange rate
  const isYearly = billingCycle === 'yearly';
  const rawBasePriceInUSD = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const isPPPActive = pppFactor < 0.999 && !isEnterprise;
  const effectiveBasePriceInUSD = isPPPActive
    ? Math.round(rawBasePriceInUSD * pppFactor * 100) / 100
    : rawBasePriceInUSD;

  // Per-employee rate so clicking employees increases the amount dynamically
  const basePerEmpUSD = plan.perEmployeeAfterLimit || (plan.id === 'starter' ? 2 : plan.id === 'professional' ? 3 : 4);
  const rawPerEmpUSD = isYearly ? Math.round(basePerEmpUSD * 0.8 * 100) / 100 : basePerEmpUSD;
  const effectivePerEmpUSD = isPPPActive
    ? Math.round(rawPerEmpUSD * pppFactor * 100) / 100
    : rawPerEmpUSD;

  // Total monthly price for active headcount
  const rawTotalUSD = rawBasePriceInUSD + headcount * rawPerEmpUSD;
  const effectiveTotalUSD = isEnterprise
    ? headcount * (isYearly ? 4 : 5) * pppFactor
    : effectiveBasePriceInUSD + headcount * effectivePerEmpUSD;

  const formattedPrice = isEnterprise
    ? customText
    : currencyConfig.format(effectiveTotalUSD);

  const formattedBasePrice = !isEnterprise ? currencyConfig.format(effectiveBasePriceInUSD) : customText;
  const formattedPerEmpPrice = currencyConfig.format(effectivePerEmpUSD);
  const formattedOriginalPrice = !isEnterprise ? currencyConfig.format(rawTotalUSD) : '';
  const formattedTotalMonthly = currencyConfig.format(effectiveTotalUSD);

  const handleIncreaseEmployees = () => {
    if (!onChangeHeadcount) return;
    const nextPreset = HEADCOUNT_STEPS.find((step) => step > headcount);
    onChangeHeadcount(nextPreset ?? headcount + 25);
  };

  const handleDecreaseEmployees = () => {
    if (!onChangeHeadcount) return;
    const prevPresets = HEADCOUNT_STEPS.filter((step) => step < headcount);
    const prevPreset = prevPresets.length > 0 ? prevPresets[prevPresets.length - 1] : Math.max(1, headcount - 5);
    onChangeHeadcount(prevPreset);
  };

  // Competitor Benchmark and Dynamic Savings Calculation
  const benchmark = INDUSTRY_COMPETITOR_BENCHMARKS[plan.id] || INDUSTRY_COMPETITOR_BENCHMARKS.starter;
  const competitorMonthlyUSD = benchmark.monthlyUSD + headcount * (basePerEmpUSD * 2.2);
  const competitorFormatted = currencyConfig.format(competitorMonthlyUSD);

  const dynamicSavingsPercent = useMemo(() => {
    if (isEnterprise) return 58;
    const diff = competitorMonthlyUSD - effectiveTotalUSD;
    if (diff <= 0) return 10;
    return Math.min(85, Math.max(10, Math.round((diff / competitorMonthlyUSD) * 100)));
  }, [isEnterprise, competitorMonthlyUSD, effectiveTotalUSD]);

  const annualSavingsUSD = isEnterprise
    ? 550 * 12
    : Math.max(0, (competitorMonthlyUSD - effectiveTotalUSD) * 12);
  const annualSavingsFormatted = currencyConfig.format(annualSavingsUSD);

  // Tooltip & details popover state
  const [showBenchmarkDetails, setShowBenchmarkDetails] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showBenchmarkDetails) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowBenchmarkDetails(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowBenchmarkDetails(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showBenchmarkDetails]);

  return (
    <div
      id={`pricing-card-${plan.id}`}
      className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between h-full w-full p-5 sm:p-6 ${
        isProfessional
          ? 'bg-white dark:bg-[#111C38] border-2 border-[#0265DC] shadow-xl shadow-blue-500/10 dark:shadow-blue-950/40 z-10 ring-4 ring-blue-500/5 dark:ring-blue-500/20'
          : 'bg-white/95 dark:bg-[#0D162C] border-2 border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      {/* Most Popular Badge for Professional */}
      {isProfessional && (
        <div
          id="badge-most-popular"
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#A3E635] text-slate-950 text-[11px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1.5 border border-[#84CC16] whitespace-nowrap z-20"
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-900 fill-slate-900 shrink-0" />
          <span>{t.common.popular}</span>
        </div>
      )}

      {/* Plan Header */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B132B] dark:text-white leading-tight break-words">
              {planName}
            </h3>
          </div>

          {plan.upgradeIndicator && (
            <div>
              <span
                className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-lg leading-snug max-w-full break-words ${
                  isProfessional
                    ? 'bg-blue-50 dark:bg-blue-950/80 text-[#0265DC] dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {tx(plan.upgradeIndicator)}
              </span>
            </div>
          )}
        </div>

        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 min-h-[40px] leading-relaxed">
          {planTagline}
        </p>

        {/* Pricing Block (Matching Outsourcing Pricing Cards) */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Struck-through original price if PPP is active */}
          {isPPPActive && (
            <div className="flex items-center flex-wrap gap-1.5 mb-1">
              <span className="text-xs text-slate-400 dark:text-slate-500 line-through font-mono">
                {formattedOriginalPrice}
              </span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-lime-100 dark:bg-lime-950/80 text-emerald-800 dark:text-[#A3E635] border border-lime-300/60 dark:border-lime-800">
                {pppBadgeText ? tx(pppBadgeText) : `-${Math.round((1 - pppFactor) * 100)}% PPP`}
              </span>
            </div>
          )}

          <div className="flex items-baseline flex-wrap gap-x-1.5 gap-y-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              {formattedPrice}
            </span>
            {!isEnterprise && (
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t.common.perMonth}
              </span>
            )}
          </div>

          {!isEnterprise && (
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {tx('Base')}: <span className="font-semibold text-slate-700 dark:text-slate-300">{formattedBasePrice}</span> +{' '}
              <span className="font-semibold text-slate-700 dark:text-slate-300">{formattedPerEmpPrice}</span>/{tx('emp')}
            </div>
          )}

          {/* Interactive Headcount Total Preview Pill (Click Employees to Increase Amount) */}
          <div className="mt-3 p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900/40 text-xs flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400 shrink-0" />
                <span>{tx('Total for')}</span>
              </span>

              {/* Clickable Employee Stepper on the Card */}
              <div className="inline-flex items-center gap-1 bg-white dark:bg-[#0B132B] border border-blue-200 dark:border-slate-700 rounded-lg p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={handleDecreaseEmployees}
                  title={tx('Decrease employees')}
                  className="w-5 h-5 rounded flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={handleIncreaseEmployees}
                  title={tx('Click to increase employees')}
                  className="px-1.5 py-0.5 text-[11px] font-extrabold text-[#0265DC] dark:text-white hover:text-blue-700 cursor-pointer whitespace-nowrap"
                >
                  {headcount} {tx('staff')}
                </button>
                <button
                  type="button"
                  onClick={handleIncreaseEmployees}
                  title={tx('Increase employees')}
                  className="w-5 h-5 rounded flex items-center justify-center bg-[#0265DC] text-white hover:bg-[#004DB3] cursor-pointer transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-blue-200/50 dark:border-blue-900/40">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {isYearly ? tx('Billed Yearly (20% Off)') : tx('Monthly Billing')}
              </span>
              <span className="font-extrabold text-[#0265DC] dark:text-[#A3E635] font-mono text-xs sm:text-sm whitespace-nowrap">
                {formattedTotalMonthly} / {tx('mo')}
              </span>
            </div>
          </div>

          {/* Save vs. Competitor Indicator */}
          <div className="mt-2.5 relative">
            <button
              type="button"
              id={`save-vs-competitor-btn-${plan.id}`}
              onClick={() => setShowBenchmarkDetails((prev) => !prev)}
              className="w-full inline-flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/70 transition-all text-[11px] font-bold shadow-xs group cursor-pointer text-left"
              aria-label={tx('Save vs. competitor info for {name}', { name: planName })}
            >
              <span className="flex items-center gap-1.5 min-w-0">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="truncate">
                  {isEnterprise ? tx('Save ~58% vs. Legacy ERP') : tx('Save ~{n}% vs. Competitor', { n: dynamicSavingsPercent })}
                </span>
              </span>
              <Info className="w-3 h-3 text-emerald-600 dark:text-emerald-400 opacity-70 group-hover:opacity-100 shrink-0" />
            </button>

            {/* Benchmark Popover / Tooltip */}
            {showBenchmarkDetails && (
              <div
                ref={tooltipRef}
                className="absolute left-0 top-full mt-2 z-40 w-72 sm:w-80 p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 shadow-2xl text-left"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-2.5">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      {tx('Cost Comparison')}
                    </span>
                    <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {tx(benchmark.tierName)}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowBenchmarkDetails(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    aria-label={tx('Close benchmark details')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                      <span>{tx('Industry Competitor Avg:')}</span>
                      <span className="font-semibold line-through text-slate-400 dark:text-slate-500 font-mono">
                        ~{competitorFormatted}{tx('/mo')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-900 dark:text-white font-bold">
                      <span className="text-blue-600 dark:text-blue-400">{tx('NextSoftHR Effective:')}</span>
                      <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                        {formattedTotalMonthly}{tx('/mo')}
                      </span>
                    </div>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold flex items-center justify-between">
                    <span>{tx('Estimated Annual Savings:')}</span>
                    <span className="font-extrabold font-mono">{annualSavingsFormatted}{tx('/yr')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Employee Allowance & Recommended Range */}
          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-[#081533] border border-slate-200/80 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
              <Zap className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400 shrink-0" />
              <span className="leading-snug">{employeeAllowance}</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {t.common.recommended}: <span className="font-semibold text-slate-700 dark:text-slate-200">{recommendedRange}</span>
            </div>
          </div>
        </div>

        {/* Feature List */}
        <div className="mt-5 flex-1 flex flex-col">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            {isEnterprise ? tx('Enterprise Capabilities') : tx('Included in Plan')}
          </div>
          <ul className="space-y-2 text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 flex-1">
            {plan.keyFeatures.map((feat, idx) => {
              const isLead = feat.startsWith('Everything in');
              return (
                <li key={idx} className="flex items-start gap-2 leading-snug">
                  <div
                    className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                      isProfessional
                        ? 'bg-blue-100 dark:bg-blue-950 text-[#0265DC] dark:text-blue-400'
                        : isEnterprise
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                        : 'bg-lime-100 dark:bg-lime-950 text-[#65A30D] dark:text-[#A3E635]'
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span className={`${isLead ? 'font-bold text-[#0265DC] dark:text-blue-400' : ''}`}>{tx(feat)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Card Footer: CTA & Support Level */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col justify-end">
        <div className="flex flex-col gap-2">
          {/* Main CTA: Subscribe & Checkout */}
          <button
            id={`plan-subscribe-${plan.id}`}
            onClick={() => (onSubscribePlan ? onSubscribePlan(plan) : onSelectPlan(plan))}
            className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              isProfessional
                ? 'bg-[#A3E635] text-slate-950 hover:bg-[#84CC16] shadow-md shadow-lime-500/20 hover:shadow-lg'
                : 'bg-[#0265DC] text-white hover:bg-[#004DB3] shadow-sm'
            }`}
          >
            <span>{isEnterprise ? tx('Contact Enterprise Sales') : tx('Subscribe & Checkout')}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>

          {/* Secondary CTA: Free Trial */}
          {!isEnterprise && (
            <button
              id={`plan-trial-${plan.id}`}
              onClick={() => onSelectPlan(plan)}
              className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-center cursor-pointer"
            >
              {tx('Or start with 14-day free trial')}
            </button>
          )}

          {/* Secondary CTA for Enterprise */}
          {isEnterprise && onOpenEnterpriseDemo && (
            <button
              id="enterprise-book-demo-btn"
              onClick={onOpenEnterpriseDemo}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#0265DC] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/70 dark:border-blue-800/60 transition-colors cursor-pointer"
            >
              {t.common.bookDemo}
            </button>
          )}
        </div>

        {/* Support Level Indicator */}
        <div className="mt-3.5 flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 text-center">
          <Headphones className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
          <span className="leading-snug">{supportLevel}</span>
        </div>
      </div>
    </div>
  );
};
