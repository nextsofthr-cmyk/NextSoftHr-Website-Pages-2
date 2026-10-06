import React, { useState } from 'react';
import { 
  Layers, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  Building2, 
  CreditCard, 
  Clock, 
  Briefcase, 
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface IntegrationsDirectoryProps {
  onOpenLeadModal: (service?: string) => void;
}

export const IntegrationsDirectory: React.FC<IntegrationsDirectoryProps> = ({ onOpenLeadModal }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Accounting & ERP',
    'Commercial Banking',
    'Time & Biometrics',
    'Communication & SSO',
    'Developer APIs'
  ];

  const integrationItems = [
    {
      name: 'General Ledger Export (SAP, Oracle, NetSuite)',
      category: 'Accounting & ERP',
      desc: 'Automatic mapping of monthly payroll debits, employer pension costs, and tax liabilities directly into standard ERP journals.'
    },
    {
      name: 'Multi-Bank Electronic Payout Batch Schedules',
      category: 'Commercial Banking',
      desc: 'Generates ISO 20022 and standard clearing batch payment files compatible with all major commercial banks across Africa.'
    },
    {
      name: 'Hardware Biometric Clocking Connectors',
      category: 'Time & Biometrics',
      desc: 'Local agent and network listeners that sync clock-in/out records from ZKTeco, Suprema, and card readers directly into NextSofthr.'
    },
    {
      name: 'Enterprise Single Sign-On (SAML / Okta / Azure AD)',
      category: 'Communication & SSO',
      desc: 'Secure single-identity authentication allowing employees and leadership to access portals using corporate credentials.'
    },
    {
      name: 'Team Collaboration Hub (Slack & Microsoft Teams)',
      category: 'Communication & SSO',
      desc: 'Instant manager notifications for leave approvals, expense sign-offs, and company-wide HR policy announcements.'
    },
    {
      name: 'NextSofthr Open REST APIs & Webhooks',
      category: 'Developer APIs',
      desc: 'Secure REST endpoints allowing internal IT teams to programmatically create employees, trigger onboardings, and sync headcounts.'
    }
  ];

  const filtered = activeCategory === 'All' 
    ? integrationItems 
    : integrationItems.filter(i => i.category === activeCategory);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Connected Workforce Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Connect NextSofthr with the systems your organization already uses.”
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Our open enterprise architecture plugs seamlessly into your accounting ledgers, banking rails, physical biometric security gates, and communication channels.
          </p>
        </div>
      </section>

      {/* Filterable Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeCategory === cat
                  ? 'bg-[#0F2D6B] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-lime-700 bg-lime-50 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <h4 className="text-base font-bold text-slate-900">{item.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-700 font-semibold">
                <span>Production Connector</span>
                <span className="flex items-center gap-1 text-slate-400 font-normal">Active</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-10">
          <button
            onClick={() => onOpenLeadModal('Custom Integration Inquiry')}
            className="px-6 py-3 bg-[#0F2D6B] hover:bg-[#0A1E4A] text-white text-xs font-bold rounded-xl shadow transition-colors inline-flex items-center gap-2"
          >
            <span>Discuss a Custom Integration with Our Solutions Architect</span>
            <ArrowRight className="w-3.5 h-3.5 text-lime-400" />
          </button>
        </div>
      </section>
    </div>
  );
};
