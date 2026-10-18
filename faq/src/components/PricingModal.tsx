import React, { useState } from 'react';
import { X, Check, ArrowRight, Sparkles, Shield, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemo: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onOpenDemo }) => {
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [employeeCount, setEmployeeCount] = useState<number>(35);

  if (!isOpen) return null;

  const discountMultiplier = billingCycle === 'annual' ? 0.8 : 1.0;

  const plans = [
    {
      name: 'Starter',
      price: (2.5 * discountMultiplier).toFixed(2),
      description: t('pricing.starterDesc', 'Core HR and essential statutory payroll for micro and small teams.'),
      features: [
        'Centralized Employee Directory',
        'Standard Statutory Payroll & Payslips',
        'Leave Management & Public Holidays',
        'Employee Self-Service (ESS Web & Mobile)',
        'Document Vault (Up to 5GB)',
        'Email Support',
      ],
      popular: false,
      cta: t('pricing.startTrial', 'Start Free Trial'),
    },
    {
      name: 'Growth',
      price: (4.5 * discountMultiplier).toFixed(2),
      description: t('pricing.growthDesc', 'Full workforce management, shift rosters and applicant tracking.'),
      features: [
        'Everything in Starter',
        'Time & Attendance with GPS Mobile Check-in',
        'Shift Scheduling & Overtime Multipliers',
        'Applicant Tracking System (ATS)',
        'Multi-Tier Approval Workflows',
        'Performance Goals & 360 Reviews',
        'Priority 24/7 Live Support',
      ],
      popular: true,
      cta: t('pricing.startTrial', 'Start Free Trial'),
    },
    {
      name: 'Scale',
      price: (7.0 * discountMultiplier).toFixed(2),
      description: t('pricing.scaleDesc', 'Intelligent AI copilot, project management, and CRM integration.'),
      features: [
        'Everything in Growth',
        'NextSoftHR AI Assistant Included',
        'CRM & Client Pipeline Tracking',
        'Project & Task Collaboration Hub',
        'Advanced General Ledger Accounting Sync',
        'Biometric Device API Sync',
        'Executive Analytics & Board Summaries',
      ],
      popular: false,
      cta: t('pricing.startTrial', 'Start Free Trial'),
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: t('pricing.enterpriseDesc', 'Tailored architecture, multi-entity holding groups and outsourcing.'),
      features: [
        'Everything in Scale',
        'Multi-Entity Subsidiary Management',
        'Hybrid Managed Payroll Outsourcing Options',
        'Single Sign-On (SSO) & Custom RBAC',
        'Dedicated Solutions Architect & SLA',
        'White-Glove Historical Data Migration',
        'Custom API & Webhook Endpoints',
      ],
      popular: false,
      cta: t('pricing.contactSales', 'Talk to Sales'),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#0B132B] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col transition-colors">
        
        {/* Header */}
        <div className="px-6 py-6 bg-slate-900 dark:bg-[#060B17] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
                {t('pricing.badge', 'Transparent Global Pricing')}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {t('pricing.title', 'Simple, Scalable Pricing for Modern Teams')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {t('pricing.sub', 'No hidden fees. Free 14-day trial. Scale up or down as your workforce evolves.')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#F8FAFC] dark:bg-[#080E1E] transition-colors">
          
          {/* Billing Toggle & Slider */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 p-4 bg-white dark:bg-[#0F1D3D] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Billing Cadence
              </div>
              <div className="flex items-center gap-2 mt-1.5 p-1 bg-slate-100 dark:bg-[#162752] rounded-xl inline-flex">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    billingCycle === 'monthly'
                      ? 'bg-white dark:bg-[#0F1D3D] text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t('pricing.monthly', 'Monthly Billing')}
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    billingCycle === 'annual'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{t('pricing.annual', 'Annual Billing')}</span>
                  <span className="text-[10px] text-lime-300 font-bold bg-blue-800 dark:bg-blue-900 px-1.5 py-0.5 rounded">
                    {t('pricing.save20', 'Save 20%')}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex-1 sm:max-w-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>{t('pricing.teamSize', 'Select Team Size (Employees):')}</span>
                <span className="text-blue-700 dark:text-lime-400 font-bold">{employeeCount} Employees</span>
              </div>
              <input
                type="range"
                min="5"
                max="300"
                step="5"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(parseInt(e.target.value, 10))}
                className="w-full accent-blue-700 dark:accent-lime-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                <span>5 micro</span>
                <span>150 medium</span>
                <span>300+ scale</span>
              </div>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-5 flex flex-col justify-between transition-all relative ${
                  plan.popular
                    ? 'bg-white dark:bg-[#0F1D3D] border-2 border-blue-600 dark:border-blue-500 shadow-md ring-2 ring-blue-600/10'
                    : 'bg-white dark:bg-[#0F1D3D] border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-blue-300 dark:hover:border-blue-500/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-700 dark:bg-blue-600 text-lime-300 text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    {t('pricing.popular', 'Most Popular')}
                  </div>
                )}

                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{plan.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">{plan.description}</p>

                  <div className="mt-4 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                    {plan.price === 'Custom' ? (
                      <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{t('pricing.custom', 'Custom')}</div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-slate-900 dark:text-white">${plan.price}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{t('pricing.pepm', '/ employee / month')}</span>
                      </div>
                    )}
                    {plan.price !== 'Custom' && (
                      <div className="text-[11px] text-blue-700 dark:text-lime-400 font-medium mt-1">
                        Est. ${(parseFloat(plan.price) * employeeCount).toFixed(0)}/mo ({employeeCount} staff)
                      </div>
                    )}
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mb-6">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenDemo();
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    plan.cta.toLowerCase().includes('trial') || plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                      : 'bg-slate-100 dark:bg-[#162752] hover:bg-slate-200 dark:hover:bg-[#1d3368] text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            {t('pricing.guarantee', '30-day money back guarantee · No credit card required to start trial · Cancel anytime')}
          </div>

        </div>

      </div>
    </div>
  );
};
