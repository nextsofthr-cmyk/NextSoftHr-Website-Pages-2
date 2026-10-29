import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  CreditCard, 
  Users, 
  Briefcase, 
  Globe2, 
  Clock, 
  TrendingUp, 
  BarChart3, 
  HelpCircle, 
  Headphones, 
  Zap, 
  Layers, 
  FileCheck2, 
  CheckCircle2,
  ChevronDown,
  PhoneCall,
  CalendarCheck
} from 'lucide-react';
import { GlobalHeader } from '../../components/GlobalHeader';
import { GlobalFooter } from '../../components/GlobalFooter';
import { SERVICE_PACKAGES } from '../outsourcing/data/mockData';
import { CurrencyProvider, useCurrency } from '../outsourcing/context/CurrencyContext';
import { QuotationWizard } from '../outsourcing/components/outsourcing/QuotationWizard';
import { RoiCalculator } from '../outsourcing/components/outsourcing/RoiCalculator';
import { LeadModal } from '../outsourcing/components/common/LeadModal';
import { OutsourcingPricingTable } from '../outsourcing/components/outsourcing/OutsourcingPricingTable';

function OutsourcingPricingContent() {
  const { formatCurrency, currency, setCurrencyCode, supportedCurrencies } = useCurrency();
  const [activeTab, setActiveTab] = useState<'packages' | 'wizard' | 'roi' | 'compare'>('packages');
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadModalService, setLeadModalService] = useState('Payroll + HR Outsourcing');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleOpenLead = (service: string = 'General Outsourcing Pricing Inquiry') => {
    setLeadModalService(service);
    setLeadModalOpen(true);
  };

  const handleSelectTablePlan = (planName: string, billingCycle: 'Monthly' | 'Yearly', estimatedEmployees?: number) => {
    const empText = estimatedEmployees && estimatedEmployees > 1 ? ` for ${estimatedEmployees} employees` : '';
    handleOpenLead(`Outsourcing Plan: ${planName} (${billingCycle}${empText})`);
  };

  const faqs = [
    {
      q: 'What is included in NextSofthr Outsourcing monthly retainers?',
      a: 'Every package includes gross-to-net salary calculations, statutory remittances (PAYE, Pension, NHF, NSITF, ITF), digital employee payslips, direct payroll advice, and our cloud ESS/MSS software access. Higher tiers include dedicated HRBPs, performance management, disciplinary mediation, and custom ERP integrations.'
    },
    {
      q: 'How does pricing adjust as our team headcount scales?',
      a: 'Our models are transparently tiered based on your active employee count. As you add employees, per-user marginal costs decrease with automatic volume brackets. You only pay for active staff processed during the pay cycle.'
    },
    {
      q: 'Do you provide SLA and tax filing accuracy guarantees?',
      a: 'Yes. NextSofthr contracts include a 99.99% software uptime SLA and a 100% statutory filing accuracy guarantee. In the unlikely event of any statutory penalties resulting from our calculation error, NextSofthr covers the penalty in full.'
    },
    {
      q: 'How long does onboarding and legacy data migration take?',
      a: 'Standard onboarding takes 10–14 business days. Our dedicated migration engineers extract and sanitize records from legacy spreadsheets, SAP, Oracle, or legacy HRIS, followed by a verified parallel payroll run before complete cutover.'
    },
    {
      q: 'Can we operate across multiple African countries under one agreement?',
      a: 'Yes. Our Pan-African Multi-Country entity allows you to manage teams in Nigeria, Ghana, Kenya, South Africa, Uganda, Rwanda, and more under a single master service agreement with consolidated invoicing.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060D1E] text-slate-900 dark:text-slate-100 font-sans selection:bg-[#84CC16]/30 selection:text-slate-950 transition-colors duration-200">
      {/* 1. Global Header */}
      <GlobalHeader 
        onOpenDemo={() => handleOpenLead('Outsourcing Demo')}
        onOpenGetStarted={() => handleOpenLead('Get Started with Outsourcing')}
      />

      <main className="pt-20">
        {/* 2. Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[140px] pointer-events-none rounded-full" />
          <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-lime-400/15 blur-[120px] pointer-events-none rounded-full" />

          <div className="relative max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-lime-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
              <span>Transparent Outsourcing Retainers • Zero Hidden Fees</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Flexible Outsourcing Packages <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400">
                Built for Every Stage of Scale.
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
              Eliminate internal overhead, compliance bottlenecks, and payroll errors. Outsource monthly gross-to-net payroll, employee lifecycle administration, or your entire People department.
            </p>

            {/* Quick Hero Actions */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'packages'
                    ? 'bg-lime-400 text-slate-950 shadow-lg shadow-lime-400/20'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Explore Packages</span>
              </button>

              <button
                onClick={() => setActiveTab('wizard')}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'wizard'
                    ? 'bg-lime-400 text-slate-950 shadow-lg shadow-lime-400/20'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Custom Quotation Wizard</span>
              </button>

              <button
                onClick={() => setActiveTab('roi')}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'roi'
                    ? 'bg-lime-400 text-slate-950 shadow-lg shadow-lime-400/20'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>ROI Savings Calculator</span>
              </button>

              <button
                onClick={() => handleOpenLead('Outsourcing Expert Consultation')}
                className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-500 to-[#0265DC] hover:from-blue-600 hover:to-blue-700 text-white shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Talk to a Specialist</span>
              </button>
            </div>

            {/* SLA Trust Strip */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs">
                <div className="text-2xl font-black text-lime-400 font-mono">99.99%</div>
                <div className="text-xs text-slate-300 font-medium">Uptime & Accuracy SLA</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs">
                <div className="text-2xl font-black text-lime-400 font-mono">480+</div>
                <div className="text-xs text-slate-300 font-medium">Enterprise Clients Managed</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs">
                <div className="text-2xl font-black text-lime-400 font-mono">100%</div>
                <div className="text-xs text-slate-300 font-medium">Statutory Tax Filing Record</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs">
                <div className="text-2xl font-black text-lime-400 font-mono">24/7</div>
                <div className="text-xs text-slate-300 font-medium">Dedicated Support Engineer</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Currency Control Strip */}
        <section className="bg-white dark:bg-[#0B1528] border-y border-slate-200 dark:border-slate-800 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Globe2 className="w-4 h-4 text-[#0265DC] dark:text-lime-400" />
              <span>Display Currency:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {currency.name} ({currency.symbol})
              </span>
            </div>

            {/* Currency Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
              {supportedCurrencies.slice(0, 8).map((cur) => (
                <button
                  key={cur.code}
                  id={`outsourcing-currency-${cur.code}`}
                  onClick={() => setCurrencyCode(cur.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    currency.code === cur.code
                      ? 'bg-[#0265DC] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{cur.flag}</span>
                  <span>{cur.code}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Tab Views Switcher */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {/* View Tab 1: Outsourcing Pricing Cards */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <OutsourcingPricingTable
                onSelectPlan={handleSelectTablePlan}
                onOpenDemo={() => handleOpenLead('Outsourcing Live Demo Inquiry')}
              />
            </div>
          )}

          {/* View Tab 2: Custom Quotation Wizard */}
          {activeTab === 'wizard' && (
            <div className="space-y-8">
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <span className="text-xs font-bold text-blue-600 dark:text-lime-400 uppercase tracking-wider">Instant Quote</span>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Configure Your Custom Outsourcing Scope
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Select your exact workforce headcount, entity structures, and required service lines to generate an instant formal proposal.
                </p>
              </div>

              <QuotationWizard />
            </div>
          )}

          {/* View Tab 3: ROI Savings Calculator */}
          {activeTab === 'roi' && (
            <div className="space-y-8">
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <span className="text-xs font-bold text-blue-600 dark:text-lime-400 uppercase tracking-wider">Financial Analysis</span>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Calculate Your Savings vs. In-House Department
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  See how much your organization saves on payroll staff salaries, software subscriptions, and compliance risks.
                </p>
              </div>

              <RoiCalculator onOpenLeadModal={handleOpenLead} />
            </div>
          )}
        </div>

        {/* 5. In-House vs Outsourcing Cost Comparison Table */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white dark:bg-[#0B1528] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-lime-400 uppercase tracking-wider">Cost Comparison</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                In-House People Operations vs. NextSofthr Outsourced Model
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Discover why 480+ enterprises choose to partner with NextSofthr rather than maintaining heavy internal department overhead.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#081226] text-slate-600 dark:text-slate-300">
                    <th className="p-4 font-bold">Operational Component</th>
                    <th className="p-4 font-bold text-red-600 dark:text-rose-400">Traditional In-House Department</th>
                    <th className="p-4 font-bold text-emerald-600 dark:text-lime-400 bg-lime-50/40 dark:bg-lime-950/20">
                      NextSofthr Managed Outsourcing
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">Staffing & Salaries</td>
                    <td className="p-4">Full-time HR Director, Payroll Manager, Tax Specialists ($3,500 – $6,000 / mo)</td>
                    <td className="p-4 font-semibold text-emerald-700 dark:text-lime-300 bg-lime-50/20 dark:bg-lime-950/10">
                      Predictable monthly retainer starting at $120 – $400 / mo (Save up to 75%)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">Software & Infrastructure</td>
                    <td className="p-4">Separate payroll tools, cloud servers, biometric terminal licenses ($400 – $1,200 / mo)</td>
                    <td className="p-4 font-semibold text-emerald-700 dark:text-lime-300 bg-lime-50/20 dark:bg-lime-950/10">
                      Fully bundled NextSofthr AI Cloud Platform included at zero extra cost
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">Compliance & Penalties</td>
                    <td className="p-4">Employer bears 100% of late filing fines, tax audit liabilities, and tribunal fees</td>
                    <td className="p-4 font-semibold text-emerald-700 dark:text-lime-300 bg-lime-50/20 dark:bg-lime-950/10">
                      100% Guaranteed statutory tax compliance with SLA penalty-backed protection
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">Turnover & Absence Risk</td>
                    <td className="p-4">Operations stall when key payroll officers resign, fall sick, or take leave</td>
                    <td className="p-4 font-semibold text-emerald-700 dark:text-lime-300 bg-lime-50/20 dark:bg-lime-950/10">
                      Zero disruption: dedicated delivery pods with redundant cross-trained certified leads
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 6. FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-bold text-blue-600 dark:text-lime-400 uppercase tracking-wider">Got Questions?</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-[#0B1528] rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-[#0E1A38] transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openFaqIndex === idx ? 'rotate-180 text-blue-600 dark:text-lime-400' : 'text-slate-400'}`} />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 7. Bottom CTA */}
        <section className="bg-gradient-to-r from-[#0265DC] via-[#004DB3] to-[#061537] text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Streamline Your Workforce Operations?</h2>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
              Speak with a Senior Outsourcing Lead today. We will audit your current setup and deliver a custom cost-benefit breakdown within 24 hours.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleOpenLead('Bottom CTA Consultation')}
                className="px-8 py-3.5 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Request Custom Proposal</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
              <a
                href="/contact"
                className="px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm rounded-xl transition-colors border border-white/20 flex items-center gap-2"
              >
                <span>Contact Sales Office</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Global Footer */}
      <GlobalFooter />

      {/* Lead capture modal */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultService={leadModalService}
      />
    </div>
  );
}

export default function OutsourcingPricing() {
  return (
    <CurrencyProvider>
      <OutsourcingPricingContent />
    </CurrencyProvider>
  );
}
