import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight,
  Coins,
  CreditCard,
  Globe,
  Sparkles
} from 'lucide-react';
import { PricingPlan, CandidatePlanType } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { CandidateSubscriptionCard } from './CandidateSubscriptionCard';

interface PricingPackagesProps {
  plans: PricingPlan[];
  onSelectPlan: (plan: PricingPlan) => void;
  onOpenPaymentGateways?: (persona?: 'employer' | 'recruiter' | 'headhunter' | 'candidate', planId?: string) => void;
  onSelectCandidatePlan?: (planType: CandidatePlanType, planName: string, price: string) => void;
  onToast?: (msg: string) => void;
  currentCandidatePlan?: CandidatePlanType;
}

export const PricingPackages: React.FC<PricingPackagesProps> = ({
  plans,
  onSelectPlan,
  onOpenPaymentGateways,
  onSelectCandidatePlan,
  onToast,
  currentCandidatePlan = 'basic_free'
}) => {
  const [personaTab, setPersonaTab] = useState<'employer' | 'candidate'>('employer');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'posting' | 'software' | 'enterprise'>('all');
  const { currentCurrency, currencyConfig, convertAndFormatPrice } = useCurrency();

  const filteredPlans = plans.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-lime-400">
              Commercial Options & Plans
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-[#0F172A] text-blue-700 dark:text-lime-300 border border-blue-200 dark:border-slate-800">
              <Coins className="w-3 h-3 text-blue-500 dark:text-lime-400" />
              <span>{currencyConfig.flag} Billed in {currencyConfig.code} ({currencyConfig.symbol})</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] dark:text-white tracking-tight">
            Flexible Recruitment Packages & Technology
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Choose between self-service job postings, integrated ATS recruitment software, or dedicated executive headhunting and RPO partnerships.
          </p>

          {/* Persona Switcher: Employer vs Candidate */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex p-1.5 bg-slate-100 dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <button
                onClick={() => setPersonaTab('employer')}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                  personaTab === 'employer'
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>🏢 Employer & Recruiter Packages</span>
              </button>
              <button
                onClick={() => setPersonaTab('candidate')}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                  personaTab === 'candidate'
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>👤 Job Seeker & Candidate Plans</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              </button>
            </div>
          </div>

          {personaTab === 'employer' && (
            <>
              {/* Filter Pills */}
              <div className="pt-2 flex items-center justify-center">
                <div className="inline-flex p-1 bg-slate-100 dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-300">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-white dark:bg-[#1E293B] text-[#142B4A] dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    All Options
                  </button>
                  <button
                    onClick={() => setSelectedCategory('posting')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      selectedCategory === 'posting'
                        ? 'bg-white dark:bg-[#1E293B] text-[#142B4A] dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Job Posting
                  </button>
                  <button
                    onClick={() => setSelectedCategory('software')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      selectedCategory === 'software'
                        ? 'bg-white dark:bg-[#1E293B] text-[#142B4A] dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Recruitment ATS
                  </button>
                  <button
                    onClick={() => setSelectedCategory('enterprise')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      selectedCategory === 'enterprise'
                        ? 'bg-white dark:bg-[#1E293B] text-[#142B4A] dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    RPO & Headhunting
                  </button>
                </div>
              </div>

              {/* Regional Payment Gateways Callout Banner */}
              {onOpenPaymentGateways && (
                <div className="pt-2">
                  <div 
                    onClick={() => onOpenPaymentGateways('employer')}
                    className="p-4 rounded-2xl bg-linear-to-r from-blue-50 via-indigo-50 to-emerald-50 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:border-blue-400 dark:hover:border-blue-600 transition-all group shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-900 dark:text-white">
                            Multi-Gateway Regional Checkout Enabled
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            20+ Gateways
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300">
                          West Africa (Paystack, Flutterwave, Monnify) · East Africa (M-Pesa, Peach, DPO) · South Africa (Ozow, Yoco, Pesapal) · Francophone (FedaPay, CinetPay) · Global (Stripe, PayPal, Razorpay)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform shrink-0 self-start sm:self-auto">
                      <span>Pay by Region</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Content Area Based on Persona */}
        {personaTab === 'candidate' ? (
          <div className="mt-4 space-y-4">
            {onOpenPaymentGateways && (
              <div 
                onClick={() => onOpenPaymentGateways('candidate')}
                className="p-4 rounded-2xl bg-linear-to-r from-lime-50/80 via-emerald-50 to-blue-50 dark:from-slate-900 dark:via-emerald-950/30 dark:to-slate-900 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-600 transition-all group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        Pan-African & Global Payment Gateways for Candidates
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Local Currency Checkout
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      Pay Talent Pro (₦15,000 / $12) or Executive VIP (₦45,000 / $35) via Paystack, Flutterwave, M-Pesa, Ozow, FedaPay, or Cards with instant tier activation.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0 self-start sm:self-auto">
                  <span>Open Candidate Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            <CandidateSubscriptionCard
              isDashboardView={false}
              currentPlan={currentCandidatePlan}
              onSelectPlan={onSelectCandidatePlan}
              onOpenPaymentGateways={onOpenPaymentGateways}
              onToast={onToast}
            />
          </div>
        ) : (
          /* Employer Pricing Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {filteredPlans.map((plan) => {
            const isFreePlan = plan.id === 'plan-free';

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative ${
                  isFreePlan
                    ? 'bg-gradient-to-b from-emerald-50/70 to-white dark:from-emerald-950/30 dark:to-[#0F172A] border-2 border-emerald-500 hover:border-emerald-600 shadow-lg ring-2 ring-emerald-500/10'
                    : plan.highlighted
                    ? 'bg-gradient-to-b from-blue-50/50 to-white dark:from-[#0B1120] dark:to-[#0F172A] border-2 border-[#2563EB] dark:border-blue-500 hover:dark:border-lime-400 shadow-xl'
                    : 'bg-slate-50/70 dark:bg-[#0F172A] hover:bg-white dark:hover:bg-[#131D31] border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-lime-400/40 hover:shadow-lg dark:hover:shadow-black/60'
                }`}
              >
                {isFreePlan ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs whitespace-nowrap">
                    1 Free Post Every 7 Days
                  </div>
                ) : plan.highlighted ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#2563EB] text-white dark:bg-lime-400 dark:text-slate-950 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs whitespace-nowrap">
                    Most Popular for Growth
                  </div>
                ) : null}

                <div>
                  <div className="mb-3">
                    <h3 className="text-base font-bold text-[#142B4A] dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="py-3 border-y border-slate-200/70 dark:border-slate-800 my-2">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <div className={`text-2xl font-black tabular-nums tracking-tight ${isFreePlan ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#142B4A] dark:text-lime-400'}`}>
                        {isFreePlan ? 'FREE' : convertAndFormatPrice(plan.price)}
                      </div>
                      {currentCurrency !== 'NGN' && plan.price.includes('₦') && !isFreePlan && (
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                          ({plan.price})
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {plan.period}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                      What's included:
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isFreePlan ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#0F9D8A] dark:text-lime-400'}`} />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-2.5 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${
                      isFreePlan
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                        : plan.highlighted
                        ? 'bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white'
                        : 'bg-[#142B4A] hover:bg-[#1E3A5F] dark:bg-[#131D31] dark:hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
        )}

      </div>
    </section>
  );
};
