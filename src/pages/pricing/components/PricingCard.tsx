import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Headphones, Zap } from 'lucide-react';
import { PricingPlan, BillingCycle, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/pricingData';
import { useLanguage } from '../context/LanguageContext';

interface PricingCardProps {
  plan: PricingPlan;
  billingCycle: BillingCycle;
  selectedCurrency: CurrencyCode;
  onSelectPlan: (plan: PricingPlan) => void;
  onOpenEnterpriseDemo?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  billingCycle,
  selectedCurrency,
  onSelectPlan,
  onOpenEnterpriseDemo,
}) => {
  const { t, language } = useLanguage();
  const currencyConfig = CURRENCIES[selectedCurrency];
  const isEnterprise = plan.id === 'enterprise';
  const isOutsourcing = plan.id === 'outsourcing';
  const isProfessional = plan.isPopular;

  // Localized plan fields if available
  const planName =
    plan.id === 'starter'
      ? t.plans.starterName
      : plan.id === 'professional'
      ? t.plans.proName
      : plan.id === 'business'
      ? t.plans.bizName
      : plan.id === 'outsourcing'
      ? (t.plans as any).outsourcingName || plan.name
      : t.plans.entName;

  const planTagline =
    plan.id === 'starter'
      ? t.plans.starterTagline
      : plan.id === 'professional'
      ? t.plans.proTagline
      : plan.id === 'business'
      ? t.plans.bizTagline
      : plan.id === 'outsourcing'
      ? (t.plans as any).outsourcingTagline || plan.tagline
      : t.plans.entTagline;

  const employeeAllowance =
    plan.id === 'starter'
      ? t.plans.starterAllowance
      : plan.id === 'professional'
      ? t.plans.proAllowance
      : plan.id === 'business'
      ? t.plans.bizAllowance
      : plan.id === 'outsourcing'
      ? (t.plans as any).outsourcingAllowance || plan.employeeAllowanceText
      : t.plans.entAllowance;

  const recommendedRange =
    plan.id === 'starter'
      ? t.plans.starterRecommended
      : plan.id === 'professional'
      ? t.plans.proRecommended
      : plan.id === 'business'
      ? t.plans.bizRecommended
      : plan.id === 'outsourcing'
      ? (t.plans as any).outsourcingRecommended || plan.recommendedEmployeeRange
      : t.plans.entRecommended;

  const supportLevel =
    plan.id === 'starter'
      ? t.plans.starterSupport
      : plan.id === 'professional'
      ? t.plans.proSupport
      : plan.id === 'business'
      ? t.plans.bizSupport
      : plan.id === 'outsourcing'
      ? (t.plans as any).outsourcingSupport || '24/7 dedicated support engineer & 99.99% Uptime SLA'
      : t.plans.entSupport;

  const ctaText =
    plan.id === 'enterprise'
      ? t.plans.entCta
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
    if (plan.id === 'starter') {
      formattedPrice = '₦22,500';
      periodSuffix = billingCycle === 'yearly' ? '/Month Plan' : '/Month Plan';
    } else if (plan.id === 'professional') {
      formattedPrice = billingCycle === 'yearly' ? '₦24,000' : '₦2,000';
      periodSuffix = billingCycle === 'yearly' ? '/Year/User' : '/Month/User';
    } else if (plan.id === 'business') {
      formattedPrice = billingCycle === 'yearly' ? '₦280,000' : '₦350,000';
      periodSuffix = billingCycle === 'yearly' ? '/Year Plan' : '/Month Plan';
    } else {
      const rawPrice = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
      formattedPrice = currencyConfig.format(rawPrice);
      periodSuffix = `${t.common.perMonth} ${billingCycle === 'yearly' ? `(${t.common.billedYearly})` : ''}`;
    }
  } else {
    // For other currencies (USD, EUR, GBP, etc.)
    if (plan.id === 'starter') {
      formattedPrice = currencyConfig.format(15);
      periodSuffix = '/Month Plan';
    } else if (plan.id === 'professional') {
      formattedPrice = billingCycle === 'yearly' ? currencyConfig.format(16) : currencyConfig.format(1.5);
      periodSuffix = billingCycle === 'yearly' ? '/Year/User' : '/Month/User';
    } else if (plan.id === 'business') {
      formattedPrice = billingCycle === 'yearly' ? currencyConfig.format(185) : currencyConfig.format(230);
      periodSuffix = billingCycle === 'yearly' ? '/Year Plan' : '/Month Plan';
    } else {
      const rawPrice = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
      formattedPrice = currencyConfig.format(rawPrice);
      periodSuffix = `${t.common.perMonth} ${billingCycle === 'yearly' ? `(${t.common.billedYearly})` : ''}`;
    }
  }

  return (
    <div
      id={`pricing-card-${plan.id}`}
      className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between h-full ${
        isProfessional
          ? 'bg-white dark:bg-[#111C38] border-2 border-[#0265DC] shadow-xl shadow-blue-500/10 dark:shadow-blue-950/40 lg:-translate-y-2.5 z-10 p-6 sm:p-7.5 ring-4 ring-blue-500/5 dark:ring-blue-500/20'
          : 'bg-white/90 dark:bg-[#0D162C] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 p-6 sm:p-7'
      }`}
    >
      {/* Most Popular Badge for Pay As You Scale */}
      {isProfessional && (
        <div
          id="badge-most-popular"
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#A3E635] text-slate-950 text-xs font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1.5 border border-[#84CC16]"
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-900 fill-slate-900" />
          <span>{t.common.popular}</span>
        </div>
      )}

      {/* Plan Header */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-2xl font-bold text-[#0B132B] dark:text-white">{planName}</h3>
          {plan.upgradeIndicator && (
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                isProfessional
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-[#0265DC] dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {plan.upgradeIndicator}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 min-h-[40px] leading-relaxed">{planTagline}</p>

        {/* Pricing Block */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
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

          {/* Employee Allowance */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
            <Zap className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400 shrink-0" />
            <span>{employeeAllowance}</span>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {t.common.recommended}: <span className="font-semibold text-slate-700 dark:text-slate-200">{recommendedRange}</span>
          </div>
        </div>

        {/* Feature List */}
        <div className="mt-6 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {isEnterprise ? 'Enterprise Capabilities' : isOutsourcing ? 'Outsourcing Services' : 'Included in Plan'}
          </div>
          <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-200">
            {plan.keyFeatures.map((feat, idx) => {
              if (feat === 'Enterprise Support') {
                return (
                  <li
                    key={idx}
                    className="pt-2.5 pb-0.5 text-xs font-extrabold uppercase tracking-wider text-[#0265DC] dark:text-blue-400 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                );
              }
              const isLead = feat.startsWith('Everything in');
              return (
                <li key={idx} className="flex items-start gap-2.5">
                  <div
                    className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                      isProfessional
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
      <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800">
        {isOutsourcing ? (
          <div className="flex flex-col gap-2">
            {/* Button 1: Explore Outsourcing Prices */}
            <a
              id="plan-cta-outsourcing-prices"
              href="/outsourcing-pricing"
              className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-[#0265DC] text-white hover:bg-[#004DB3] shadow-md shadow-blue-500/10 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>{(t.plans as any).outsourcingCta1 || 'Explore Outsourcing Prices'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Button 2: Explore Demo */}
            <button
              id="plan-cta-outsourcing-demo"
              type="button"
              onClick={onOpenEnterpriseDemo}
              className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#0265DC] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/70 dark:border-blue-800/60 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{(t.plans as any).outsourcingCta2 || 'Explore Demo'}</span>
            </button>
          </div>
        ) : isEnterprise ? (
          <div className="flex flex-col gap-2">
            {/* Main CTA: Contact Sales */}
            <button
              id={`plan-cta-${plan.id}`}
              type="button"
              onClick={() => onSelectPlan(plan)}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-[#0265DC] text-white hover:bg-[#004DB3] shadow-md shadow-blue-500/10 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary CTA: Book Demo */}
            {onOpenEnterpriseDemo && (
              <button
                id="enterprise-book-demo-btn"
                type="button"
                onClick={onOpenEnterpriseDemo}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#0265DC] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/70 dark:border-blue-800/60 transition-colors"
              >
                {t.common.bookDemo}
              </button>
            )}

            {/* Third CTA: Let's Talk button linked to contact form */}
            <a
              id="enterprise-lets-talk-btn"
              href="/contact"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{(t.plans as any).letsTalk || "Let's Talk"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              id={`plan-cta-${plan.id}`}
              type="button"
              onClick={() => onSelectPlan(plan)}
              className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                ctaText.toLowerCase().includes('trial') || isProfessional
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 hover:shadow-lg'
                  : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-sm'
              }`}
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Support Level Indicator */}
        <div className="mt-3.5 flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 text-center">
          <Headphones className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
          <span>{supportLevel}</span>
        </div>
      </div>
    </div>
  );
};
