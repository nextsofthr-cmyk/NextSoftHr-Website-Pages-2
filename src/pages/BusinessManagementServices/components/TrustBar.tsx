import React from 'react';
import { Layers, Globe, Cloud, Sparkles, CheckCircle2, Shield } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustStats = [
    {
      icon: Layers,
      highlight: '1',
      title: 'Unified Platform',
      description: 'Zero fragmented tools or disconnected spreadsheets',
    },
    {
      icon: CheckCircle2,
      highlight: '12+',
      title: 'HR & Business Modules',
      description: 'End-to-end workforce lifecycle from hire to retire',
    },
    {
      icon: Globe,
      highlight: 'Africa + Global',
      title: 'Pan-African & Worldwide',
      description: 'Multi-currency, localized statutory tax compliance',
    },
    {
      icon: Cloud,
      highlight: '99.99%',
      title: 'Cloud-Based Reliability',
      description: 'Secure bank-grade cloud accessible 24/7 on any device',
    },
    {
      icon: Sparkles,
      highlight: 'AI-Powered',
      title: 'Workforce Intelligence',
      description: 'Smart query assistant, anomaly detection & automation',
    },
  ];

  return (
    <section className="bg-white dark:bg-[#0A2540] border-y border-slate-200/80 dark:border-blue-900/60 py-10 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0256C4] dark:text-[#84CC16] bg-blue-50 dark:bg-blue-950/70 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
            PROVEN WORKFORCE EXCELLENCE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A2540] dark:text-white mt-3">
            Built for Businesses That Want to Work Smarter
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-1">
            Engineered with deep African compliance expertise and international scalability.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {trustStats.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] dark:bg-[#0D2644] hover:bg-white dark:hover:bg-[#123860] rounded-xl p-4 sm:p-5 border border-slate-200/70 dark:border-blue-800/80 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/60 text-[#0256C4] dark:text-blue-300 group-hover:bg-[#84CC16]/20 group-hover:text-[#0A2540] dark:group-hover:text-[#84CC16] flex items-center justify-center mb-3 transition-colors">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#0A2540] dark:text-white tracking-tight mb-1">
                  {item.highlight}
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">{item.title}</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-300 leading-tight">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Localized African Compliance Badges */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-blue-900/60 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-500 dark:text-slate-400 font-semibold">
          <span className="text-slate-400 dark:text-slate-400 uppercase tracking-wider text-[11px]">Compliant with:</span>
          <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
            <span className="text-base">🇳🇬</span> Nigeria PAYE, NHF, Pension Act
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
            <span className="text-base">🇬🇭</span> Ghana GRA &amp; SSNIT Regulations
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
            <span className="text-base">🇰🇪</span> Kenya KRA, NSSF &amp; NHIF
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
            <span className="text-base">🇿🇦</span> South Africa SARS, UIF &amp; SDL
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
            <span className="text-base">🌍</span> Global Multi-Currency Standards
          </span>
        </div>
      </div>
    </section>
  );
};
