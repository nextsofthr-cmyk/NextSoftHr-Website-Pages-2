import React from 'react';
import {
  CreditCard,
  Calculator,
  Building2,
  MessageSquare,
  KeyRound,
  Calendar,
  Layers,
  Code2,
  CheckCircle2,
  ArrowRight,
  Share2,
} from 'lucide-react';
import { INTEGRATION_CATEGORIES } from '../data/servicesData';

interface IntegrationSectionProps {
  onOpenDemo: () => void;
}

const catIcons: Record<string, React.FC<{ className?: string }>> = {
  'Banking & Payments': CreditCard,
  'Accounting & ERP': Calculator,
  'Communication & Collaboration': MessageSquare,
  'Identity & Access Management': KeyRound,
  'Productivity & Calendars': Calendar,
  'Biometric & Turnstiles': Building2,
  'Business Applications': Layers,
  'Developer APIs & Webhooks': Code2,
};

export const IntegrationSection: React.FC<IntegrationSectionProps> = ({ onOpenDemo }) => {
  return (
    <section id="integrations" className="py-20 bg-white dark:bg-[#0A2540] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[#0256C4] dark:text-[#84CC16] text-xs font-extrabold uppercase tracking-widest border border-blue-100 dark:border-blue-800 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            CONNECTED ENTERPRISE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight mb-4">
            Connect NextSofthr With Your Business Ecosystem
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Eliminate double data entry. Seamlessly bridge your accounting ledgers, commercial banking gateways,
            biometric turnstiles, and daily team collaboration apps.
          </p>
        </div>

        {/* Central Visual Integration Hub Graphic */}
        <div className="relative mb-14 bg-gradient-to-r from-blue-50 via-slate-50 to-lime-50 dark:from-[#0D2644] dark:via-[#0A2540] dark:to-[#0D2644] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-blue-900/60">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0256C4] text-white flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0 relative">
                <Share2 className="w-8 h-8 text-[#84CC16]" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#84CC16] ring-4 ring-white dark:ring-slate-900 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#84CC16] uppercase tracking-wider">
                  Real-Time Bi-Directional Sync
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0A2540] dark:text-white">
                  The NextSofthr Enterprise Integration Hub
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
                  Connect once, synchronize everywhere. Secure RESTful webhooks, pre-built banking connectors, and
                  automated daily ledger journals.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenDemo}
              className="shrink-0 px-6 py-3 rounded-xl bg-[#0A2540] dark:bg-[#0256C4] hover:bg-slate-800 dark:hover:bg-[#024bb0] text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore API Docs &amp; Connectors</span>
              <ArrowRight className="w-4 h-4 text-[#84CC16]" />
            </button>
          </div>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INTEGRATION_CATEGORIES.map((cat, idx) => {
            const IconComp = catIcons[cat.name] || Layers;

            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] dark:bg-[#0D2644] hover:bg-white dark:hover:bg-[#123860] rounded-2xl p-6 border border-slate-200/80 dark:border-blue-800/80 hover:border-[#0256C4]/40 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#07182E] group-hover:bg-[#0256C4] text-[#0256C4] dark:text-blue-300 group-hover:text-white border border-slate-200 dark:border-blue-800 flex items-center justify-center transition-colors shadow-xs">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#0256C4] dark:text-[#84CC16] bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-800">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0A2540] dark:text-white group-hover:text-[#0256C4] dark:group-hover:text-blue-300 transition-colors mb-2">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Examples tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cat.examples.map((ex, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-white dark:bg-[#0A2540] text-slate-700 dark:text-slate-200 text-[11px] font-medium border border-slate-200/70 dark:border-blue-900/60"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 dark:border-blue-900/60 mt-auto">
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="line-clamp-1">{cat.highlight}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
