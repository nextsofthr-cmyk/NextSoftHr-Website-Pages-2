import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, ArrowRight, ShieldCheck, Headphones, Zap, Play } from 'lucide-react';
import { PricingPlan, BillingCycle, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/pricingData';
import { useLanguage } from '../context/LanguageContext';

interface PricingCardProps {
  plan: PricingPlan;
  billingCycle: BillingCycle;
  selectedCurrency: CurrencyCode;
  headcount?: number;
  onSelectPlan: (plan: PricingPlan) => void;
  onOpenEnterpriseDemo?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  billingCycle,
  selectedCurrency,
  headcount = 25,
  onSelectPlan,
  onOpenEnterpriseDemo,
}) => {
  const { t, language } = useLanguage();
  const currencyConfig = CURRENCIES[selectedCurrency] || CURRENCIES.USD;
  const isEnterprise = plan.id === 'enterprise';
  const isOutsourcing = plan.id === 'outsourcing';
  const isScale = plan.id === 'scale' || plan.id === 'pay-as-you-scale';
  const isProfessional = plan.id === 'professional';
  const isStarter = plan.id === 'starter';
  const isBusiness = plan.id === 'business';
  const isPopular = plan.isPopular;

  // Localized plan fields if available
  const planName =
    isStarter
      ? t.plans.starterName || 'Started'
      : isProfessional
      ? (t.plans as any).proName || 'Professional'
      : isBusiness
      ? t.plans.bizName || 'Business'
      : isScale
      ? (t.plans as any).scaleName || 'Pay As You Scale'
      : isOutsourcing
      ? (t.plans as any).outsourcingName || plan.name
      : t.plans.entName || 'Enterprise';

  const planTagline =
    isStarter
      ? t.plans.starterTagline
      : isProfessional
      ? (t.plans as any).proTagline || plan.tagline
      : isBusiness
      ? t.plans.bizTagline
      : isScale
      ? (t.plans as any).scaleTagline || plan.tagline
      : isOutsourcing
      ? (t.plans as any).outsourcingTagline || plan.tagline
      : t.plans.entTagline;

  const employeeAllowance =
    isStarter
      ? t.plans.starterAllowance
      : isProfessional
      ? (t.plans as any).proAllowance || plan.employeeAllowanceText
      : isBusiness
      ? t.plans.bizAllowance
      : isScale
      ? (t.plans as any).scaleAllowance || plan.employeeAllowanceText
      : isOutsourcing
      ? (t.plans as any).outsourcingAllowance || plan.employeeAllowanceText
      : t.plans.entAllowance;

  const recommendedRange =
    isStarter
      ? t.plans.starterRecommended
      : isProfessional
      ? (t.plans as any).proRecommended || plan.recommendedEmployeeRange
      : isBusiness
      ? t.plans.bizRecommended
      : isScale
      ? (t.plans as any).scaleRecommended || plan.recommendedEmployeeRange
      : isOutsourcing
      ? (t.plans as any).outsourcingRecommended || plan.recommendedEmployeeRange
      : t.plans.entRecommended;

  const supportLevel =
    isStarter
      ? t.plans.starterSupport
      : isProfessional
      ? (t.plans as any).proSupport || plan.supportLevel
      : isBusiness
      ? t.plans.bizSupport
      : isScale
      ? (t.plans as any).scaleSupport || plan.supportLevel
      : isOutsourcing
      ? (t.plans as any).outsourcingSupport || '24/7 Dedicated Support Engineer & SLA'
      : t.plans.entSupport;

  const ctaText =
    isEnterprise
      ? t.plans.entCta
      : isOutsourcing
      ? (t.plans as any).outsourcingCta1 || 'Explore Outsourcing Prices'
      : t.plans.starterCta;

  const customText =
    language === 'fr' ? 'Sur mesure' : language === 'pt' || language === 'es' ? 'Personalizado' : 'Custom';

  // Calculate pricing display & period suffix
  let formattedPrice = '';
  let periodSuffix = '';

  if (isEnterprise || isOutsourcing) {
    formattedPrice = customText;
    periodSuffix = '';
  } else if (selectedCurrency === 'NGN') {
    if (isStarter) {
      formattedPrice = billingCycle === 'yearly' ? '₦18,000' : '₦22,500';
      periodSuffix = billingCycle === 'yearly' ? '/Month (Billed Yearly)' : '/Month Plan';
    } else if (isProfessional) {
      formattedPrice = billingCycle === 'yearly' ? '₦100,000' : '₦125,000';
      periodSuffix = billingCycle === 'yearly' ? '/Month (Billed Yearly)' : '/Month Plan';
    } else if (isBusiness) {
      formattedPrice = billingCycle === 'yearly' ? '₦280,000' : '₦350,000';
      periodSuffix = billingCycle === 'yearly' ? '/Month (Billed Yearly)' : '/Month Plan';
    } else if (isScale) {
      formattedPrice = billingCycle === 'yearly' ? '₦24,000' : '₦2,000';
      periodSuffix = billingCycle === 'yearly' ? '/User/Year' : '/User/Month';
    } else {
      const rawPrice = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
      formattedPrice = currencyConfig.format(rawPrice);
      periodSuffix = `${t.common.perMonth} ${billingCycle === 'yearly' ? `(${t.common.billedYearly})` : ''}`;
    }
  } else {
    // For other currencies (USD, EUR, GBP, etc.)
    if (isStarter) {
      formattedPrice = billingCycle === 'yearly' ? currencyConfig.format(12) : currencyConfig.format(15);
      periodSuffix = '/Month Plan';
    } else if (isProfessional) {
      formattedPrice = billingCycle === 'yearly' ? currencyConfig.format(65) : currencyConfig.format(80);
      periodSuffix = '/Month Plan';
    } else if (isBusiness) {
      formattedPrice = billingCycle === 'yearly' ? currencyConfig.format(185) : currencyConfig.format(230);
      periodSuffix = '/Month Plan';
    } else if (isScale) {
      formattedPrice = billingCycle === 'yearly' ? currencyConfig.format(16) : currencyConfig.format(1.5);
      periodSuffix = billingCycle === 'yearly' ? '/User/Year' : '/User/Month';
    } else {
      const rawPrice = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
      formattedPrice = currencyConfig.format(rawPrice);
      periodSuffix = `${t.common.perMonth} ${billingCycle === 'yearly' ? `(${t.common.billedYearly})` : ''}`;
    }
  }

  // Headcount-aware total price calculation (matching Outsourcing pricing table behavior)
  const isYearly = billingCycle === 'yearly';
  let formattedTotalMonthly = '';
  let employeeNote = '';

  if (isEnterprise) {
    formattedTotalMonthly = customText;
    employeeNote = 'Dedicated Enterprise Pod';
  } else if (isOutsourcing) {
    if (selectedCurrency === 'NGN') {
      const perEmp = isYearly ? 2800 : 3500;
      formattedTotalMonthly = `₦${(perEmp * headcount).toLocaleString()} / mo`;
    } else {
      const perEmpUSD = isYearly ? 2.0 : 2.5;
      formattedTotalMonthly = `${currencyConfig.format(perEmpUSD * headcount)} / mo`;
    }
    employeeNote = `${headcount} staff managed outsourcing`;
  } else if (isScale) {
    if (selectedCurrency === 'NGN') {
      const perEmp = 2000;
      formattedTotalMonthly = `₦${(perEmp * headcount).toLocaleString()} / mo`;
    } else {
      const perEmpUSD = isYearly ? 1.33 : 1.5;
      formattedTotalMonthly = `${currencyConfig.format(perEmpUSD * headcount)} / mo`;
    }
    employeeNote = `${headcount} staff @ flexible per-user rate`;
  } else if (isStarter) {
    const allowance = 15;
    const baseNGN = isYearly ? 18000 : 22500;
    const extraPerEmpNGN = isYearly ? 2400 : 3000;
    const baseUSD = isYearly ? 12 : 15;
    const extraPerEmpUSD = isYearly ? 1.6 : 2.0;

    const extraCount = Math.max(0, headcount - allowance);
    if (selectedCurrency === 'NGN') {
      const total = baseNGN + extraCount * extraPerEmpNGN;
      formattedTotalMonthly = `₦${total.toLocaleString()} / mo`;
    } else {
      const totalUSD = baseUSD + extraCount * extraPerEmpUSD;
      formattedTotalMonthly = `${currencyConfig.format(totalUSD)} / mo`;
    }
    employeeNote = extraCount > 0 ? `Includes 15 (+${extraCount} extra)` : `Within 15 included allowance`;
  } else if (isProfessional) {
    const allowance = 50;
    const baseNGN = isYearly ? 100000 : 125000;
    const extraPerEmpNGN = isYearly ? 3040 : 3800;
    const baseUSD = isYearly ? 65 : 80;
    const extraPerEmpUSD = isYearly ? 2.0 : 2.5;

    const extraCount = Math.max(0, headcount - allowance);
    if (selectedCurrency === 'NGN') {
      const total = baseNGN + extraCount * extraPerEmpNGN;
      formattedTotalMonthly = `₦${total.toLocaleString()} / mo`;
    } else {
      const totalUSD = baseUSD + extraCount * extraPerEmpUSD;
      formattedTotalMonthly = `${currencyConfig.format(totalUSD)} / mo`;
    }
    employeeNote = extraCount > 0 ? `Includes 50 (+${extraCount} extra)` : `Within 50 included allowance`;
  } else if (isBusiness) {
    const allowance = 100;
    const baseNGN = isYearly ? 280000 : 350000;
    const extraPerEmpNGN = isYearly ? 4000 : 5000;
    const baseUSD = isYearly ? 185 : 230;
    const extraPerEmpUSD = isYearly ? 2.8 : 3.5;

    const extraCount = Math.max(0, headcount - allowance);
    if (selectedCurrency === 'NGN') {
      const total = baseNGN + extraCount * extraPerEmpNGN;
      formattedTotalMonthly = `₦${total.toLocaleString()} / mo`;
    } else {
      const totalUSD = baseUSD + extraCount * extraPerEmpUSD;
      formattedTotalMonthly = `${currencyConfig.format(totalUSD)} / mo`;
    }
    employeeNote = extraCount > 0 ? `Includes 100 (+${extraCount} extra)` : `Within 100 included allowance`;
  }

  return (
    <div
      id={`pricing-card-${plan.id}`}
      className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between flex-1 self-stretch h-full w-full min-h-[860px] sm:min-h-[870px] lg:min-h-[880px] p-6 sm:p-7 ${
        isPopular
          ? 'bg-white dark:bg-[#111C38] border-2 border-[#0265DC] shadow-xl shadow-blue-500/10 dark:shadow-blue-950/40 z-10 ring-4 ring-blue-500/5 dark:ring-blue-500/20'
          : 'bg-white/90 dark:bg-[#0D162C] border-2 border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      {/* Most Popular Badge */}
      {isPopular && (
        <div
          id="badge-most-popular"
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#A3E635] text-slate-950 text-xs font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1.5 border border-[#84CC16]"
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-900 fill-slate-900" />
          <span>{t.common.popular}</span>
        </div>
      )}

      {/* Plan Header */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 min-h-[60px] sm:min-h-[64px]">
          <h3 className="font-display text-2xl font-bold text-[#0B132B] dark:text-white leading-tight">{planName}</h3>
          {plan.upgradeIndicator && (
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                isPopular
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-[#0265DC] dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {plan.upgradeIndicator}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 min-h-[44px] sm:min-h-[48px] leading-relaxed line-clamp-2">
          {planTagline}
        </p>

        {/* Pricing Block */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 min-h-[140px] flex flex-col justify-center">
          <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              {formattedPrice}
            </span>
            {periodSuffix && (
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {periodSuffix}
              </span>
            )}
          </div>

          {/* Dynamic Headcount Total Preview Pill (Matching Outsourcing Pricing Table) */}
          {!isEnterprise ? (
            <div className="mt-3 p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900/40 text-xs flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  Total for <strong className="text-slate-900 dark:text-white font-bold">{headcount} staff</strong>:
                </span>
                {employeeNote && (
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    {employeeNote}
                  </span>
                )}
              </div>
              <span className="font-extrabold text-[#0265DC] dark:text-[#A3E635] font-mono text-sm sm:text-base whitespace-nowrap">
                {formattedTotalMonthly}
              </span>
            </div>
          ) : (
            <div className="mt-3 p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Volume for <strong className="text-slate-900 dark:text-white font-bold">{headcount} staff</strong>:
              </span>
              <span className="font-extrabold text-[#0265DC] dark:text-blue-400 font-mono text-xs">
                Bespoke SLA & Volume
              </span>
            </div>
          )}

          {/* Employee Allowance */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
            <Zap className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400 shrink-0" />
            <span className="truncate">{employeeAllowance}</span>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {t.common.recommended}: <span className="font-semibold text-slate-700 dark:text-slate-200">{recommendedRange}</span>
          </div>
        </div>

        {/* Feature List */}
        <div className="mt-5 flex-1 flex flex-col">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            {isEnterprise ? 'Enterprise Capabilities' : isOutsourcing ? 'Outsourcing Services' : 'Included in Plan'}
          </div>
          <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-200 flex-1 flex flex-col justify-start min-h-[350px]">
            {plan.keyFeatures.map((feat, idx) => {
              if (feat === 'Enterprise Support') {
                return (
                  <li
                    key={idx}
                    className="pt-2 pb-0.5 text-xs font-extrabold uppercase tracking-wider text-[#0265DC] dark:text-blue-400 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 min-h-[28px]"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                );
              }
              const isLead = feat.startsWith('Everything in');
              return (
                <li key={idx} className="flex items-start gap-2.5 min-h-[28px]">
                  <div
                    className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                      isPopular
                        ? 'bg-blue-100 dark:bg-blue-950 text-[#0265DC] dark:text-blue-400'
                        : isEnterprise || isOutsourcing
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                        : 'bg-lime-100 dark:bg-lime-950 text-[#65A30D] dark:text-[#A3E635]'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className={`${isLead ? 'font-semibold text-[#0265DC] dark:text-blue-400' : ''}`}>{feat}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Card Footer: CTA & Support Level */}
      <div className="mt-auto pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col justify-end">
        <div className="flex flex-col gap-2">
          {isOutsourcing ? (
            <Link
              id="plan-cta-outsourcing-prices"
              to="/outsourcing-pricing"
              className="w-full h-11 px-4 rounded-xl text-sm font-bold bg-[#0265DC] text-white hover:bg-[#004DB3] shadow-md shadow-blue-500/10 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : isEnterprise ? (
            <button
              id={`plan-cta-${plan.id}`}
              type="button"
              onClick={() => onSelectPlan(plan)}
              className="w-full h-11 px-4 rounded-xl text-sm font-bold bg-[#0265DC] text-white hover:bg-[#004DB3] shadow-md shadow-blue-500/10 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id={`plan-cta-${plan.id}`}
              type="button"
              onClick={() => onSelectPlan(plan)}
              className={`w-full h-11 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                isPopular
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 hover:shadow-lg'
                  : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-sm'
              }`}
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {/* Secondary Button: Explore Demo */}
          <a
            id={`plan-demo-${plan.id}`}
            href="https://demo.scriptmaster.store/login"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-9 px-4 rounded-xl text-xs font-semibold text-[#0265DC] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/70 dark:border-blue-800/60 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{t.common.bookDemo || 'Explore Demo'}</span>
          </a>
        </div>

        {/* Support Level Indicator */}
        <div className="mt-3.5 flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 text-center h-5">
          <Headphones className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
          <span className="truncate">{supportLevel}</span>
        </div>
      </div>
    </div>
  );
};
