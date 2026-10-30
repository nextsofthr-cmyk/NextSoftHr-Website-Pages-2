import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Award, 
  CreditCard, 
  ArrowRight,
  Star,
  MessageSquare,
  Lock
} from 'lucide-react';
import { CandidatePlanType, CandidateSubscription } from '../types';

interface CandidateSubscriptionCardProps {
  currentPlan?: CandidatePlanType;
  onSelectPlan?: (planType: CandidatePlanType, planName: string, price: string) => void;
  onOpenPaymentGateways?: (persona?: 'employer' | 'recruiter' | 'headhunter' | 'candidate', planId?: string) => void;
  onToast?: (msg: string) => void;
  isDashboardView?: boolean;
}

export const CANDIDATE_TIERS = [
  {
    id: 'basic_free' as CandidatePlanType,
    name: 'Basic Talent',
    badge: 'Standard',
    monthlyPrice: '₦0',
    usdPrice: '$0',
    period: 'forever free',
    description: 'Essential tools for job seekers starting their career exploration.',
    isPopular: false,
    features: [
      '5 Job Applications / month',
      'Basic Mock NLP Resume Parser',
      'Standard Job Alerts (Weekly)',
      'Public Job Board Access',
      'Standard Candidate Profile'
    ],
    ctaText: 'Current Plan',
    buttonClass: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
  },
  {
    id: 'talent_pro' as CandidatePlanType,
    name: 'Talent Pro',
    badge: 'Recommended',
    monthlyPrice: '₦15,000',
    usdPrice: '$12',
    period: 'per month',
    description: 'Propel your hiring rate with AI preparation, priority recruiter visibility & direct messaging.',
    isPopular: true,
    features: [
      'Unlimited Job Applications',
      '🌟 Featured Candidate Badge on Recruiter Search',
      'AI Personalized Interview Prep tailored to active applications',
      'Direct Real-Time Messaging with Recruiters',
      'AI Salary Negotiation & Benchmark Simulator',
      'Verified Skill Credential Badges (CIPM, AWS, React, etc.)',
      'Instant Match Push & WhatsApp Job Alerts'
    ],
    ctaText: 'Upgrade to Talent Pro',
    buttonClass: 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-md'
  },
  {
    id: 'executive_vip' as CandidatePlanType,
    name: 'Executive VIP Mandate',
    badge: 'White-Glove',
    monthlyPrice: '₦45,000',
    usdPrice: '$35',
    period: 'per month',
    description: 'Dedicated career coaching, CV rewrite by senior HRBPs, and guaranteed introductions.',
    isPopular: false,
    features: [
      'Everything in Talent Pro',
      '1-on-1 CV & LinkedIn Overhaul by NextSoftHR Certified HRBP',
      'Guaranteed Recruiter Interview Screening within 14 Days',
      'Direct C-Suite & Headhunter Referral Network',
      'Executive Search Placement Fee Coverage',
      'Priority Interview Calendar Rescheduling Support'
    ],
    ctaText: 'Get Executive VIP',
    buttonClass: 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white'
  }
];

export const CandidateSubscriptionCard: React.FC<CandidateSubscriptionCardProps> = ({
  currentPlan = 'basic_free',
  onSelectPlan,
  onOpenPaymentGateways,
  onToast,
  isDashboardView = false
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handleChoosePlan = (tier: typeof CANDIDATE_TIERS[0]) => {
    if (tier.id === currentPlan) {
      if (onToast) onToast(`You are currently on the ${tier.name} tier.`);
      return;
    }

    if (tier.id === 'basic_free') {
      if (onSelectPlan) onSelectPlan('basic_free', 'Basic Talent', '₦0');
      if (onToast) onToast('Activated Basic Talent plan.');
      return;
    }

    if (onSelectPlan) {
      onSelectPlan(tier.id, tier.name, tier.monthlyPrice);
    }
    if (onOpenPaymentGateways) {
      const targetPlanId = tier.id === 'talent_pro' ? 'cand-pro' : tier.id === 'executive_vip' ? 'cand-executive' : 'cand-basic';
      onOpenPaymentGateways('candidate', targetPlanId);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Billing Switch */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-[#2563EB] dark:text-blue-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Candidate Subscription Tiers</span>
        </div>
        <h3 className="text-2xl font-extrabold text-[#142B4A] dark:text-white">
          Accelerate Your Career with NextSoftHR Pro
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Get 3x more profile views, personalized AI interview mock questions, and direct messaging with employers.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-semibold mt-3">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-slate-900 text-[#2563EB] dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('annual')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-white dark:bg-slate-900 text-[#2563EB] dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.2 rounded-md font-bold">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {CANDIDATE_TIERS.map((tier) => {
          const isCurrent = tier.id === currentPlan;
          const displayPrice = billingCycle === 'annual' && tier.id !== 'basic_free'
            ? tier.id === 'talent_pro' ? '₦12,000' : '₦36,000'
            : tier.monthlyPrice;

          return (
            <div
              key={tier.id}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between relative overflow-hidden ${
                tier.isPopular
                  ? 'bg-white dark:bg-slate-900 border-[#2563EB] shadow-xl ring-2 ring-blue-500/10'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0 bg-[#2563EB] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-xs">
                  {tier.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${
                    tier.isPopular ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
                  }`}>
                    {tier.name}
                  </span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[#142B4A] dark:text-white">
                      {displayPrice}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      / {tier.period}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                    What's Included:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => handleChoosePlan(tier)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isCurrent
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-default'
                      : tier.buttonClass
                  }`}
                >
                  {isCurrent ? (
                    <span>Current Active Plan</span>
                  ) : (
                    <>
                      <span>{tier.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
