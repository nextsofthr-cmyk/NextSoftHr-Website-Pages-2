import React, { useState } from 'react';
import {
  Globe,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Building,
  Smartphone,
  ArrowRight,
  TrendingUp,
  Landmark
} from 'lucide-react';

interface BuiltForAfricaProps {
  onOpenDemo: () => void;
}

export const BuiltForAfrica: React.FC<BuiltForAfricaProps> = ({ onOpenDemo }) => {
  const [activeMarket, setActiveMarket] = useState<'africa' | 'global'>('africa');

  const africanStrengths = [
    {
      title: 'Statutory Tax & Pension Compliance',
      description: 'Pre-configured PAYE brackets, NSITF, NHF, pension remittance schedules, and state internal revenue service requirements.',
      icon: Landmark,
    },
    {
      title: 'Multi-Currency & Banking Rails',
      description: 'Calculate and disburse in Nigerian Naira (₦), Kenyan Shillings (KSh), South African Rand (R), Ghanaian Cedis (GH₵), Rwandan Francs, USD, GBP, and EUR.',
      icon: Coins,
    },
    {
      title: 'Mobile-First & Intermittent Connectivity',
      description: 'Engineered for real-world conditions. Offline punch buffering, low data consumption, and SMS/WhatsApp notifications for remote workers.',
      icon: Smartphone,
    },
    {
      title: 'Multi-Branch & State Entity Hierarchy',
      description: 'Effortlessly oversee staff spread across Lagos, Abuja, Port Harcourt, Nairobi, Johannesburg, or Accra with centralized controls.',
      icon: Building,
    },
  ];

  const globalStrengths = [
    {
      title: 'Cross-Border Contractor & Remote Staff Payouts',
      description: 'Pay international contractors and distributed digital talent according to their local tax and currency preferences.',
      icon: Globe,
    },
    {
      title: 'Enterprise Data Governance & ISO-Grade Security',
      description: 'Strict adherence to NDPR (Nigeria Data Protection Regulation), GDPR compliance, and enterprise SOC-type operational controls.',
      icon: ShieldCheck,
    },
    {
      title: 'Time Zone & Multi-Location Roaster Engine',
      description: 'Coordinate global teams across UTC, WAT, EAT, GMT, and EST with intelligent cross-timezone shift calendars.',
      icon: TrendingUp,
    },
    {
      title: 'ERP & Accounting Software Connectors',
      description: 'Export general ledger journals directly into QuickBooks, Xero, SAP, or Microsoft Dynamics with zero manual re-keying.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="built-for-africa" className="py-20 lg:py-28 bg-white dark:bg-[#071322] border-b border-slate-200/80 dark:border-slate-800 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 text-xs font-bold text-[#0B3B73] dark:text-[#38BDF8]">
            <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
            <span>Unmatched Regional Depth</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
            Built for Africa. <span className="text-[#0B3B73] dark:text-[#38BDF8]">Ready for the World.</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            NextSofthr understands the unique needs of businesses operating in African
            markets while building technology with global businesses and modern workplaces
            in mind.
          </p>
        </div>

        {/* Contemporary African Business Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="relative rounded-2xl overflow-hidden h-64 group shadow-md border border-transparent dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
              alt="African corporate HR leadership"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#84CC16]">
                Corporate Leadership
              </span>
              <div className="text-xs font-bold">African HR Executives & Directors</div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-64 group shadow-md border border-transparent dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=600&auto=format&fit=crop"
              alt="African tech & product development team"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#84CC16]">
                High-Growth Tech
              </span>
              <div className="text-xs font-bold">Fast-Growing African Startups</div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-64 group shadow-md border border-transparent dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop"
              alt="Business consultancy & advisory"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#84CC16]">
                Consulting & SMEs
              </span>
              <div className="text-xs font-bold">Professional Firms & African SMEs</div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-64 group shadow-md border border-transparent dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
              alt="Cross-border and international remote teams"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#84CC16]">
                Global Distributed
              </span>
              <div className="text-xs font-bold">Multinational & Remote Teams</div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Box: African Precision vs. Global Readiness */}
        <div className="bg-[#0A2540] dark:bg-[#06101E] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-transparent dark:border-blue-900/40 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 dark:border-slate-800">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#84CC16]">
                Tailored Architecture
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                How NextSofthr Bridges Africa & The World
              </h3>
            </div>

            <div className="flex items-center bg-white/10 dark:bg-slate-900/80 p-1 rounded-xl border border-white/15 dark:border-slate-800">
              <button
                onClick={() => setActiveMarket('africa')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeMarket === 'africa'
                    ? 'bg-[#84CC16] text-[#0A2540]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                African Market Precision
              </button>
              <button
                onClick={() => setActiveMarket('global')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeMarket === 'global'
                    ? 'bg-[#84CC16] text-[#0A2540]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Global Enterprise Readiness
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            {(activeMarket === 'africa' ? africanStrengths : globalStrengths).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white/5 dark:bg-[#0E2038] border border-white/10 dark:border-blue-900/40 rounded-2xl p-6 hover:bg-white/10 dark:hover:bg-[#132A4A] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#84CC16]/20 border border-[#84CC16]/40 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#84CC16]" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div>
              Supported Currencies:{' '}
              <span className="font-mono text-[#84CC16] font-bold">
                NGN (₦) • KES (KSh) • ZAR (R) • GHS (GH₵) • RWF • USD ($) • GBP (£) • EUR (€)
              </span>
            </div>

            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-1.5 text-[#84CC16] font-bold hover:underline cursor-pointer"
            >
              <span>See Regional Compliance Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
