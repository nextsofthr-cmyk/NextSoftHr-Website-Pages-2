import React from 'react';
import { Award, CheckCircle2, Star, ShieldCheck, ChevronRight, Sparkles, DollarSign, TrendingUp } from 'lucide-react';
import { PARTNER_LEVELS } from '../data/countries';
import { useCurrency } from '../context/CurrencyContext';

interface PartnerLevelSystemProps {
  onApplyClick: () => void;
}

export const PartnerLevelSystem: React.FC<PartnerLevelSystemProps> = ({ onApplyClick }) => {
  const { formatCurrency, currentCurrency } = useCurrency();

  const getTierRevenueTarget = (tag: string) => {
    switch (tag) {
      case 'Strategic':
        return { target: 250000, sharePct: 40, estAnnualShare: 100000 };
      case 'Premium':
        return { target: 100000, sharePct: 30, estAnnualShare: 30000 };
      case 'Professional':
        return { target: 35000, sharePct: 15, estAnnualShare: 5250 };
      case 'Certified':
        return { target: 10000, sharePct: 20, estAnnualShare: 2000 };
      default:
        return { target: 2500, sharePct: 10, estAnnualShare: 250 };
    }
  };
  return (
    <section id="partner-levels" className="py-16 md:py-24 bg-white dark:bg-[#061124] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c8f526]/30 dark:bg-[#c8f526]/20 border border-[#c8f526] text-[#0c2b64] dark:text-[#c8f526] text-xs font-black uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>PARTNER ADVANCEMENT SYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0c2b64] dark:text-white tracking-tight">
            Clear, Transparent Partner Levels
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            NextSofthr partners are vetted and tiered according to verified platform certifications, customer deployment milestones, and proven domain proficiency.
          </p>
        </div>

        {/* 5-Tier Level Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3">
          {PARTNER_LEVELS.map((tier, idx) => {
            const isTopTier = tier.tag === 'Strategic' || tier.tag === 'Premium';
            return (
              <div 
                key={tier.name}
                className={`rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 ${
                  tier.tag === 'Strategic'
                    ? 'bg-[#071938] dark:bg-[#0c234b] text-white border-2 border-[#c8f526] shadow-xl relative'
                    : tier.tag === 'Premium'
                    ? 'bg-gradient-to-b from-blue-50/70 to-white dark:from-[#0d234d] dark:to-[#0a1c3b] text-[#0c2b64] dark:text-white border-2 border-[#c8f526]/80 shadow-md'
                    : 'bg-slate-50/70 dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div>
                  {/* Badge Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider ${tier.badgeColor}`}>
                      {tier.tag}
                    </span>
                    <span className="text-[11px] font-bold opacity-60 dark:text-slate-400">
                      Tier 0{idx + 1}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold tracking-tight ${tier.tag === 'Strategic' ? 'text-white' : 'text-[#0c2b64] dark:text-white'}`}>
                    {tier.name}
                  </h3>

                  <p className={`text-xs mt-2 leading-relaxed ${tier.tag === 'Strategic' ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}`}>
                    {tier.description}
                  </p>

                  {/* Benchmark Criteria */}
                  <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-slate-700/50">
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 dark:text-slate-400 mb-1">
                      Benchmark Criteria
                    </div>
                    <p className={`text-[11px] font-medium leading-snug ${tier.tag === 'Strategic' ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'}`}>
                      {tier.criteria}
                    </p>
                  </div>

                  {/* Ecosystem Benefits */}
                  <div className="mt-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 dark:text-slate-400 mb-1">
                      Key Privileges
                    </div>
                    <p className={`text-[11px] leading-snug ${tier.tag === 'Strategic' ? 'text-[#c8f526]' : 'text-blue-800 dark:text-[#c8f526] font-semibold'}`}>
                      {tier.benefits}
                    </p>
                  </div>

                  {/* Practice Revenue Benchmark */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/30 dark:border-slate-700/40">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider opacity-60 dark:text-slate-400 mb-1">
                      <span>Practice ARR Benchmark</span>
                      <span className="font-mono text-[#c8f526]">{getTierRevenueTarget(tier.tag).sharePct}% Share</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className={`text-xs font-black font-mono ${tier.tag === 'Strategic' ? 'text-white' : 'text-[#0c2b64] dark:text-white'}`}>
                        {formatCurrency(getTierRevenueTarget(tier.tag).target, { compact: true })}+ /yr
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-[#c8f526] font-bold font-mono">
                        Est. {formatCurrency(getTierRevenueTarget(tier.tag).estAnnualShare, { compact: true })} margin
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/30 dark:border-slate-700/40">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold opacity-80">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${tier.tag === 'Strategic' ? 'text-[#c8f526]' : 'text-emerald-600 dark:text-[#c8f526]'}`} />
                    <span className="dark:text-slate-300">NextSofthr Verified</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Callout banner */}
        <div className="mt-12 bg-blue-950 dark:bg-[#0a1c3b] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-blue-900 dark:border-slate-800 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#c8f526]" />
              <span>Looking to scale your consultancy to Premium or Strategic tier?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Access the NextSofthr Partner Enablement Academy, certification vouchers, and co-selling leads.
            </p>
          </div>
          <button
            onClick={onApplyClick}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] font-bold text-xs shadow-md transition-colors"
          >
            Apply for Certification
          </button>
        </div>

      </div>
    </section>
  );
};
