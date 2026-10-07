import React, { useState } from 'react';
import {
  Sparkles,
  Share2,
  Repeat,
  Network,
  Wrench,
  Compass,
  GraduationCap,
  Cpu,
  Users,
  Calculator,
  Headphones,
  Briefcase,
  Layers,
  Award,
  ArrowRight
} from 'lucide-react';

interface EcosystemItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  whoItsFor: string;
  commercialValue: string;
}

const ECOSYSTEM_CAPABILITIES: EcosystemItem[] = [
  {
    id: 'lead-generation',
    title: 'Lead Generation',
    icon: Sparkles,
    description: 'Identify enterprise and SME organizations seeking to modernize manual HR, paper attendance, and error-prone spreadsheets into a unified cloud system.',
    whoItsFor: 'Digital agencies, business development specialists, and inbound marketers.',
    commercialValue: 'Protected lead registry with 90-day exclusive sales engagement.'
  },
  {
    id: 'referral',
    title: 'Referral',
    icon: Share2,
    description: 'Introduce qualified corporate decision-makers (CEOs, CFOs, HR Directors) to NextSoftHR account executives with zero pre-sales complexity.',
    whoItsFor: 'Commercial brokers, industry connectors, and executive networks.',
    commercialValue: '15% - 20% recurring commission on net collected subscription fees.'
  },
  {
    id: 'reselling',
    title: 'Reselling',
    icon: Repeat,
    description: 'Package, quote, and resell NextSoftHR subscriptions to end-users directly, operating either on direct commission or wholesale margin billing.',
    whoItsFor: 'Value-added resellers (VARs), IT solution providers, software dealers.',
    commercialValue: '20% - 40% margin, full client billing control, add-on bundling.'
  },
  {
    id: 'distribution',
    title: 'Distribution',
    icon: Network,
    description: 'Develop, recruit, train, and orchestrate an authorized network of sub-resellers and dealers across a national or multi-state territory.',
    whoItsFor: 'Master technology distributors, regional cloud aggregators.',
    commercialValue: 'Overriding regional master distribution margin + co-op marketing funds.'
  },
  {
    id: 'implementation',
    title: 'Implementation',
    icon: Wrench,
    description: 'Deliver expert tenant configuration, employee master data migration from legacy CSV/Excel, leave structure mapping, and system rollout.',
    whoItsFor: 'Enterprise systems integrators, digital transformation consultants.',
    commercialValue: '100% retained billable professional services fees ($2,000 - $50,000/deal).'
  },
  {
    id: 'consulting',
    title: 'Consulting',
    icon: Compass,
    description: 'Provide strategic workforce advisory, performance appraisal matrix design, statutory labor compliance audits, and HR restructuring.',
    whoItsFor: 'Human resources management consultants, organizational psychologists.',
    commercialValue: 'Ongoing advisory retainers backed by NextSoftHR software automation.'
  },
  {
    id: 'training',
    title: 'Training',
    icon: GraduationCap,
    description: 'Deliver certified NextSoftHR user training, administrator bootcamps, and payroll compliance workshops to client teams.',
    whoItsFor: 'Corporate academies, vocational training institutes, HR educators.',
    commercialValue: 'Direct course tuition revenue + authorized exam proctoring fees.'
  },
  {
    id: 'integration',
    title: 'Integration',
    icon: Cpu,
    description: 'Connect NextSoftHR REST APIs with biometric time clocks, enterprise ERPs (SAP, Oracle, Dynamics), and internal corporate databases.',
    whoItsFor: 'Software developers, systems integrators, API architects.',
    commercialValue: 'Custom integration contracts, middleware licensing, and API royalties.'
  },
  {
    id: 'hr-outsourcing',
    title: 'HR Outsourcing (HRO)',
    icon: Users,
    description: 'Manage comprehensive employee self-service, leave administration, disciplinary tracking, and onboarding as an outsourced HR department.',
    whoItsFor: 'BPO firms, HR outsourcing agencies, interim HR management providers.',
    commercialValue: 'Multi-tenant cloud client management at volume wholesale licensing.'
  },
  {
    id: 'payroll-outsourcing',
    title: 'Payroll Outsourcing',
    icon: Calculator,
    description: 'Run automated statutory PAYE tax computations, pension remittances, automated payslips, and direct bank disbursement files for clients.',
    whoItsFor: 'Payroll service bureaus, chartered accounting practices, tax advisors.',
    commercialValue: 'Recurring monthly per-employee-per-month (PEPM) processing fees.'
  },
  {
    id: 'customer-support',
    title: 'Customer Support',
    icon: Headphones,
    description: 'Deliver localized Tier-1 helpdesk support, answering user queries in local languages, timezones, and regional business idioms.',
    whoItsFor: 'Regional IT managed service providers (MSPs) and helpdesk operations.',
    commercialValue: 'Client SLA retainers combined with Tier-1 reseller commissions.'
  },
  {
    id: 'business-advisory',
    title: 'Business Advisory',
    icon: Briefcase,
    description: 'Advise business owners on operational headcount planning, compensation benchmarking, and profitability metrics driven by NextSoftHR analytics.',
    whoItsFor: 'Chartered accountants, virtual CFOs, business turnaround advisors.',
    commercialValue: 'High-value executive advisory retainers powered by real-time workforce data.'
  },
  {
    id: 'technology-partnerships',
    title: 'Technology Partnerships',
    icon: Layers,
    description: 'Co-build certified marketplace integrations with biometric facial recognition terminals, expense tools, and employee health benefits providers.',
    whoItsFor: 'ISVs, biometric hardware OEMs, enterprise SaaS providers.',
    commercialValue: 'Mutual co-marketing, marketplace directory listing, bidirectional lead flow.'
  },
  {
    id: 'strategic-partnerships',
    title: 'Strategic Partnerships',
    icon: Award,
    description: 'Bespoke institutional collaborations with commercial banks, telecom operators, and national employer federations.',
    whoItsFor: 'Financial institutions, telecoms, national chambers of commerce.',
    commercialValue: 'Custom bilateral revenue-share models and nationwide distribution.'
  }
];

export const ProgramOverview: React.FC = () => {
  const [selectedCapability, setSelectedCapability] = useState<EcosystemItem>(ECOSYSTEM_CAPABILITIES[0]);

  return (
    <section id="overview" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
            <span>Program Architecture</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Global SaaS Channel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            An International Ecosystem Built for Every Commercial Model
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            NextSoftHR collaborates with organizations and independent professionals who help businesses discover, purchase, deploy, support, and maximize the power of cloud HR and payroll technology. Our channel model provides fourteen distinct capability pathways to recurring revenue.
          </p>
        </div>

        {/* Capabilities Grid & Interactive Inspector */}
        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Capability List (2 columns of clean items) */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-3">
            {ECOSYSTEM_CAPABILITIES.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedCapability.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedCapability(item)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-400 shadow-sm ring-1 ring-blue-300'
                      : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-lg shrink-0 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 shadow-xs'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 flex items-center justify-between">
                      <span>{item.title}</span>
                      {isSelected && (
                        <span className="text-[10px] uppercase font-bold tracking-wide text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Capability Inspector Panel */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs uppercase font-mono tracking-wider text-lime-400">
                  Capability Blueprint
                </span>
                <span className="text-xs text-slate-400">NextSoftHR Ecosystem</span>
              </div>

              <div className="mt-5">
                <div className="inline-flex p-3 rounded-xl bg-blue-600/30 text-lime-300 border border-blue-500/30 mb-4">
                  <selectedCapability.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">
                  {selectedCapability.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedCapability.description}
                </p>
              </div>

              <div className="mt-6 space-y-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1 font-medium">Ideal Participant:</span>
                  <span className="text-slate-200 font-semibold">{selectedCapability.whoItsFor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1 font-medium">Commercial Revenue Stream:</span>
                  <span className="text-lime-300 font-semibold">{selectedCapability.commercialValue}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Governed under Clauses 5–25</span>
                <a
                  href="#agreement-text"
                  className="text-lime-400 hover:text-lime-300 inline-flex items-center gap-1 font-semibold"
                >
                  <span>Read Clauses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
