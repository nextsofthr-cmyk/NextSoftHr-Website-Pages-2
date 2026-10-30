import React from 'react';
import { Globe, Building, DollarSign, MapPin, Layers, Users, Shield, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const GlobalSupport: React.FC = () => {
  const { tx } = useLanguage();
  const globalCapabilities = [
    {
      title: 'Multiple Countries',
      desc: 'Centralize cross-border teams with localized employee information fields and time zones.',
      icon: Globe,
    },
    {
      title: 'Multiple Currencies',
      desc: 'Seamlessly display and manage compensations in USD, EUR, GBP, NGN, and local currencies.',
      icon: DollarSign,
    },
    {
      title: 'Multiple Locations',
      desc: 'Configure independent regional holiday calendars, office hours, and geofenced attendance.',
      icon: MapPin,
    },
    {
      title: 'Multiple Companies',
      desc: 'Manage subsidiary entities and parent holdings with distinct tax profiles under one master account.',
      icon: Building,
    },
    {
      title: 'Multiple Departments',
      desc: 'Structure complex departmental hierarchies with dedicated budget pools and approval ladders.',
      icon: Layers,
    },
    {
      title: 'Centralized HR & Payroll',
      desc: 'Eliminate fragmented local spreadsheets with a unified operational ledger and compliance oversight.',
      icon: Users,
    },
  ];

  return (
    <section id="global-support" className="py-20 bg-white dark:bg-[#0B132B] border-t border-slate-100 dark:border-slate-800 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0265DC] dark:text-blue-300 text-xs font-bold mb-3 border border-blue-200/50 dark:border-blue-800/60">
            <Globe className="w-3.5 h-3.5" />
            <span>{tx('Worldwide Workforce Ready')}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] dark:text-white tracking-tight">
            {tx('One Platform for a Global Workforce')}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {tx('Whether your organization operates from a single headquarters or spans multiple international hubs, NextSofthr keeps your workforce aligned and compliant.')}
          </p>
        </div>

        {/* Global Network Visual & Stats */}
        <div className="bg-[#0B132B] dark:bg-[#070D1E] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          {/* Subtle World Map SVG Graphic Background with Blue & Lemon Glow */}
          <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 1000 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="200" cy="180" rx="120" ry="80" fill="#0265DC" />
              <ellipse cx="480" cy="150" rx="100" ry="70" fill="#0265DC" />
              <ellipse cx="520" cy="270" rx="90" ry="110" fill="#A3E635" />
              <ellipse cx="780" cy="220" rx="140" ry="90" fill="#0265DC" />
              <ellipse cx="850" cy="380" rx="70" ry="50" fill="#A3E635" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Highlights */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#A3E635] text-xs font-semibold backdrop-blur-xs border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
                <span>{tx('Multi-Region Architecture')}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                {tx('Manage global employees, subsidiaries & compensation with zero friction.')}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {tx('NextSofthr standardizes your records, attendance timesheets, and payroll authorizations across continents, allowing local managers autonomy while executive teams maintain clear visibility.')}
              </p>

              {/* Status Points */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-xs text-slate-400">{tx('Timezone Agnostic')}</div>
                  <div className="text-sm font-bold text-[#A3E635] mt-0.5">{tx('Automated Shifts')}</div>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-xs text-slate-400">{tx('Multi-Currency')}</div>
                  <div className="text-sm font-bold text-white mt-0.5">{tx('Auto-Reconciled')}</div>
                </div>
              </div>
            </div>

            {/* Right: Global Capability Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {globalCapabilities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#A3E635]/60 hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0265DC]/30 border border-[#0265DC]/50 flex items-center justify-center text-[#A3E635] mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="font-display text-sm font-bold text-white">{tx(item.title)}</div>
                    <div className="text-xs text-slate-300 mt-1 leading-relaxed">{tx(item.desc)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
