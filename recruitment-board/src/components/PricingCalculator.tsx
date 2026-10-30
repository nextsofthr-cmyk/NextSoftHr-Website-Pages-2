import React, { useState } from 'react';
import { Users, Sparkles, ArrowRight, CheckCircle2, Calculator, Info } from 'lucide-react';
import { CurrencyCode, BillingCycle } from '../types';
import { CURRENCIES, PRICING_PLANS } from '../data/pricingData';
import { useLanguage } from '../context/LanguageContext';

interface PricingCalculatorProps {
  billingCycle: BillingCycle;
  selectedCurrency: CurrencyCode;
  onGetStarted: (planName: string, employeeCount: number) => void;
}

const EMPLOYEE_STEPS = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000];

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  billingCycle,
  selectedCurrency,
  onGetStarted,
}) => {
  const { t, language } = useLanguage();
  const [sliderIndex, setSliderIndex] = useState(2); // default 50 employees
  const employeeCount = EMPLOYEE_STEPS[sliderIndex];
  const currencyConfig = CURRENCIES[selectedCurrency] || CURRENCIES['NGN'];

  // Determine recommended plan and pricing formula
  let recommendedPlan = PRICING_PLANS[1]; // default Professional
  let baseMonthly = 79;
  let baseYearly = 64;
  let perEmpRate = 2.5;

  if (employeeCount <= 25) {
    recommendedPlan = PRICING_PLANS[0]; // Starter
    baseMonthly = 29;
    baseYearly = 24;
    perEmpRate = 1.8;
  } else if (employeeCount <= 120) {
    recommendedPlan = PRICING_PLANS[1]; // Professional
    baseMonthly = 79;
    baseYearly = 64;
    perEmpRate = 2.5;
  } else if (employeeCount <= 750) {
    recommendedPlan = PRICING_PLANS[2]; // Business
    baseMonthly = 179;
    baseYearly = 144;
    perEmpRate = 3.0;
  } else {
    recommendedPlan = PRICING_PLANS[3]; // Enterprise
  }

  const isEnterpriseTier = employeeCount >= 1000;

  // Compute calculated amounts in USD
  const monthlyTotalUSD = isEnterpriseTier
    ? 0
    : Math.round(baseMonthly + (employeeCount > 15 ? (employeeCount - 15) * perEmpRate : 0));

  const yearlyMonthlyRateUSD = isEnterpriseTier
    ? 0
    : Math.round(baseYearly + (employeeCount > 15 ? (employeeCount - 15) * (perEmpRate * 0.8) : 0));

  const activeMonthlyUSD = billingCycle === 'yearly' ? yearlyMonthlyRateUSD : monthlyTotalUSD;
  const annualTotalUSD = activeMonthlyUSD * 12;
  const annualSavingsUSD = (monthlyTotalUSD * 12) - (yearlyMonthlyRateUSD * 12);

  const customText =
    language === 'fr' ? 'Sur mesure' : language === 'pt' || language === 'es' ? 'Personalizado' : 'Custom';
  const customSavingsText =
    language === 'fr'
      ? 'Remise volumétrique sur mesure'
      : language === 'pt'
      ? 'Desconto personalizado por volume'
      : language === 'es'
      ? 'Descuento por volumen personalizado'
      : 'Tailored volume discount';

  const displayMonthly = isEnterpriseTier ? customText : currencyConfig.format(activeMonthlyUSD);
  const displayAnnual = isEnterpriseTier ? customText : currencyConfig.format(annualTotalUSD);
  const displaySavings = isEnterpriseTier
    ? customSavingsText
    : currencyConfig.format(annualSavingsUSD > 0 ? annualSavingsUSD : 0);

  const localizedPlanName =
    recommendedPlan.id === 'starter'
      ? t.plans.starterName
      : recommendedPlan.id === 'professional'
      ? t.plans.proName
      : recommendedPlan.id === 'business'
      ? t.plans.bizName
      : t.plans.entName;

  const localizedPlanTagline =
    recommendedPlan.id === 'starter'
      ? t.plans.starterTagline
      : recommendedPlan.id === 'professional'
      ? t.plans.proTagline
      : recommendedPlan.id === 'business'
      ? t.plans.bizTagline
      : t.plans.entTagline;

  return (
    <section id="pricing-calculator" className="py-16 bg-white dark:bg-[#070D1E] border-y border-slate-100 dark:border-slate-800 relative transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0265DC] dark:text-blue-300 text-xs font-bold mb-3 border border-blue-200/50 dark:border-blue-800/60">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.calculator.badge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B132B] dark:text-white tracking-tight">
            {t.calculator.title}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-[#F8FAFC] dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Slider & Range */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="employee-range-slider"
                  className="text-base sm:text-lg font-bold text-slate-900 dark:text-white"
                >
                  {t.calculator.teamSizeLabel}
                </label>
                <div className="flex items-center gap-2 bg-white dark:bg-[#111C38] px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <Users className="w-4 h-4 text-[#0265DC] dark:text-blue-400" />
                  <span className="font-display text-xl font-extrabold text-[#0B132B] dark:text-white">
                    {employeeCount >= 5000 ? '5,000+' : employeeCount.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.calculator.employeeUnit}</span>
                </div>
              </div>

              {/* Slider Component */}
              <div className="space-y-3 pt-2">
                <input
                  id="employee-range-slider"
                  type="range"
                  min="0"
                  max={EMPLOYEE_STEPS.length - 1}
                  step="1"
                  value={sliderIndex}
                  onChange={(e) => setSliderIndex(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0265DC] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
                />

                {/* Slider Step Labels */}
                <div className="flex justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500 px-1 select-none">
                  {EMPLOYEE_STEPS.map((step, idx) => (
                    <span
                      key={step}
                      className={`cursor-pointer transition-colors ${
                        sliderIndex === idx ? 'text-[#0265DC] dark:text-blue-400 font-bold scale-110' : 'hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                      onClick={() => setSliderIndex(idx)}
                    >
                      {step >= 1000 ? `${step / 1000}k` : step}
                      {step === 5000 ? '+' : ''}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic Recommended Tier Callout */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#111C38] border border-slate-200/80 dark:border-slate-700 shadow-xs flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-lime-100 dark:bg-lime-950 text-[#65A30D] dark:text-[#A3E635] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.calculator.recommendedTier}</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{localizedPlanName}</span>
                    {recommendedPlan.isPopular && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#A3E635] text-slate-950 font-extrabold uppercase">
                        {t.common.popular}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{localizedPlanTagline}</p>
                </div>
              </div>
            </div>

            {/* Right: Calculated Summary Card */}
            <div className="lg:col-span-5 bg-white dark:bg-[#111C38] border border-blue-100 dark:border-slate-700 rounded-2xl p-6 shadow-md shadow-blue-500/5 dark:shadow-black/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#A3E635]/15 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-700">
                {t.calculator.title}
              </h3>

              <div className="mt-4 space-y-3.5">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.calculator.monthlyEst}</div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white mt-0.5 flex items-baseline gap-1">
                    <span>{displayMonthly}</span>
                    {!isEnterpriseTier && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">{t.common.perMonth}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">{t.calculator.annualTotal}</span>
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5">{displayAnnual}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">{t.calculator.annualSavings}</span>
                    <div className="font-bold text-[#65A30D] dark:text-[#A3E635] text-sm mt-0.5">{displaySavings}</div>
                  </div>
                </div>
              </div>

              {/* Get Started CTA */}
              <button
                id="calculator-get-started-btn"
                onClick={() => onGetStarted(recommendedPlan.name, employeeCount)}
                className="w-full mt-6 py-3.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-md shadow-lime-500/20 hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2"
              >
                <span>{t.calculator.getStartedBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Disclaimer */}
              <div className="mt-4 flex items-start gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Displayed pricing is an estimate based on selected parameters. Final enterprise or
                  high-volume pricing may depend on custom integrations and multi-country tax rules.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
