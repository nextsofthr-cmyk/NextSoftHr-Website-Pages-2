import React from 'react';
import { 
  Award, 
  Check, 
  Sparkles, 
  ChevronRight, 
  ArrowUpRight, 
  ShieldCheck, 
  FileCheck,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { PARTNER_TIERS } from '../data/scheduleData';

import { useCommissionLanguage } from '../context/LanguageContext';
export const TierMatrix: React.FC<{ 
  onSelectTierForCalc: (tierId: string) => void;
  onNavigateToSection: (id: number) => void;
}> = ({ onSelectTierForCalc, onNavigateToSection }) => {
  const { t } = useCommissionLanguage();

  const qualificationCriteria = [
    { title: 'New Customers Acquired', desc: 'Number of unique qualified commercial accounts closed per cycle.' },
    { title: 'Revenue & ARR Generated', desc: 'Annual recurring subscription revenue processed through NextSoftHR.' },
    { title: 'Customer Retention & Renewals', desc: 'Low churn rate and active multi-year renewals under Section 43.' },
    { title: 'Customer Satisfaction (CSAT)', desc: 'High feedback scores on post-sale onboarding and support.' },
    { title: 'Certified Employees', desc: 'Staff trained on NextSoftHR modules, architecture, and compliance.' },
    { title: 'Implementation Capabilities', desc: 'Direct technical capacity to deploy Payroll, Attendance, and ESS.' },
    { title: 'Product Knowledge', desc: 'Full mastery across all 11 core and add-on software modules.' },
    { title: 'Lead Quality & Integrity', desc: 'Verified lead registrations, clean attribution, zero fraudulent attempts.' },
    { title: 'Channel Compliance', desc: 'Strict adherence to Master Agreement, Schedule B, and pricing standards.' },
    { title: 'Support & Escalation Performance', desc: 'SLA response times and tier-1 partner triage efficiency.' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-white dark:from-slate-900 via-white dark:via-slate-900 to-indigo-50 dark:to-indigo-950/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800/60 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5" />
              Sections 3–8 & 51 • NextSoftHR Tier Structure
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('page.tiers.title')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-3xl">
              {t('page.tiers.subtitle')}
            </p>
          </div>

          <button
            onClick={() => onNavigateToSection(8)}
            className="self-start md:self-auto px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <span>View Section 8 Rules</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          </button>
        </div>
      </div>

      {/* 4 Standard Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PARTNER_TIERS.map((tier) => {
          const isPlatinum = tier.id === 'platinum';
          const isGold = tier.id === 'gold';

          return (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 border flex flex-col justify-between transition-all duration-300 relative ${
                isPlatinum
                  ? 'bg-gradient-to-b from-white dark:from-slate-900 via-white dark:via-slate-900 to-cyan-50 dark:to-cyan-950/40 border-cyan-500/60 shadow-xl shadow-cyan-200/40 dark:shadow-cyan-950/30'
                  : isGold
                  ? 'bg-gradient-to-b from-white dark:from-slate-900 via-white dark:via-slate-900 to-amber-50 dark:to-amber-950/30 border-amber-500/50 shadow-xl shadow-amber-200/40 dark:shadow-amber-950/20'
                  : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800'
              }`}
            >
              {isPlatinum && (
                <div className="absolute -top-3 right-5 px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow">
                  Top Tier
                </div>
              )}
              {isGold && (
                <div className="absolute -top-3 right-5 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{tier.name}</h3>
                  <span className="text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400">{tier.rate}%</span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[32px]">{tier.tagline}</p>

                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">
                    Qualification Target
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-0.5 block">
                    {tier.minArr}
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {tier.qualification}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="mt-5 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Included Benefits
                  </span>
                  <ul className="space-y-2">
                    {tier.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => onSelectTierForCalc(tier.id)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-cyan-950 hover:border-cyan-300 dark:hover:border-cyan-700 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Simulate in Calculator</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 8 Qualification Criteria Breakdown */}
      <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Section 8: Partner Level Qualification Criteria
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              NextSoftHR evaluates channel tiers using a multi-dimensional matrix rather than pure sales volume:
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 px-2.5 py-1 rounded bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800">
              Periodic Tier Audits (Sec 51)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {qualificationCriteria.map((crit, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800/60 flex items-center justify-center text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-bold shrink-0">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">{crit.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{crit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Review Status Banner (Section 51) */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-white dark:from-slate-900 to-indigo-50 dark:to-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 text-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Section 51 Performance Review Outcomes</span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                Periodic reviews can lead to: <strong>Promotion</strong> to higher commission tier, <strong>Continued Status</strong>, <strong>Performance Improvement Plan (PIP)</strong>, or <strong>Downgrade</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToSection(51)}
            className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold transition-colors shrink-0"
          >
            Review Sec 51
          </button>
        </div>
      </div>
    </div>
  );
};
