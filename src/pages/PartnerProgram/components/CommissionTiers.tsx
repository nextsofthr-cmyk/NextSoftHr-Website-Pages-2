import React, { useState } from 'react';
import { PARTNER_TIERS } from '../data/partnerData';
import { Check, ArrowRight, Sparkles, Calculator, ShieldCheck, Award } from 'lucide-react';
import { PartnerTier } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { PartnerBadgeOptions } from '../utils/badgeGenerator';

interface CommissionTiersProps {
  onSelectTier?: (tierId: PartnerTier) => void;
  onApplyClick?: () => void;
  onOpenBadgeModal?: (options?: PartnerBadgeOptions) => void;
}

export const CommissionTiers: React.FC<CommissionTiersProps> = ({ onSelectTier, onApplyClick, onOpenBadgeModal }) => {
  const { strings, isRTL, language } = useLanguage();
  const c = strings.commission;

  // Calculator state
  const [numCompanies, setNumCompanies] = useState<number>(12);
  const [avgStaffPerCompany, setAvgStaffPerCompany] = useState<number>(35);
  
  // Set default currency based on active language
  const defaultCurrency = language === 'fr' ? 'XOF' : language === 'ar' ? 'USD' : 'NGN';
  const [activeCurrency, setActiveCurrency] = useState<'NGN' | 'USD' | 'EUR' | 'XOF' | 'KES' | 'EGP'>(defaultCurrency);

  // Pricing model assumptions (approximate average SaaS per employee/month):
  const rateTable: Record<string, { symbol: string; unitRate: number }> = {
    NGN: { symbol: '₦', unitRate: 1200 },
    USD: { symbol: '$', unitRate: 2.5 },
    EUR: { symbol: '€', unitRate: 2.3 },
    XOF: { symbol: 'CFA ', unitRate: 1500 },
    KES: { symbol: 'KSh ', unitRate: 320 },
    EGP: { symbol: 'ج.م ', unitRate: 120 },
  };

  const totalEmployees = numCompanies * avgStaffPerCompany;
  const currentRate = rateTable[activeCurrency] || rateTable.USD;
  const monthlyGrossBilling = totalEmployees * currentRate.unitRate;

  // Determine which tier this matches based on volume
  let simulatedTier = 15;
  let simulatedTierName = 'Bronze';
  if (numCompanies >= 25 || totalEmployees >= 1000) {
    simulatedTier = 40;
    simulatedTierName = 'Platinum';
  } else if (numCompanies >= 12 || totalEmployees >= 400) {
    simulatedTier = 30;
    simulatedTierName = 'Gold';
  } else if (numCompanies >= 5 || totalEmployees >= 150) {
    simulatedTier = 20;
    simulatedTierName = 'Silver';
  }

  const estimatedMonthlyCommission = (monthlyGrossBilling * simulatedTier) / 100;
  const estimatedAnnualCommission = estimatedMonthlyCommission * 12;

  const formatMoney = (val: number) => {
    return val.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  return (
    <section id="commission" className="py-24 bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-[#040E1F] dark:via-[#071D3E] dark:to-[#040E1F] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/80 border border-blue-200 dark:border-[#B8F010]/40 text-xs font-extrabold text-blue-800 dark:text-[#B8F010] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{c.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {c.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {c.subtitle}
          </p>

          {/* Animated Upward Progression Strip */}
          <div className="mt-8 max-w-2xl mx-auto bg-white dark:bg-[#030A14] border border-slate-200 dark:border-blue-800/80 rounded-2xl p-4 shadow-sm dark:shadow-xl transition-colors duration-300">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-2 px-2">
              <span className="text-blue-600 dark:text-blue-300 uppercase">UPWARD PROGRESSION</span>
              <span className="text-blue-700 dark:text-[#B8F010]">15% → 20% → 30% → 40%</span>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-blue-950 border border-slate-200 dark:border-blue-800 text-center">
                <span className="text-[11px] block text-slate-500 dark:text-slate-400 font-bold">BRONZE</span>
                <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">15%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-blue-950 border border-slate-200 dark:border-blue-800 text-center">
                <span className="text-[11px] block text-slate-500 dark:text-slate-400 font-bold">SILVER</span>
                <span className="text-lg sm:text-xl font-black text-blue-700 dark:text-blue-200">20%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/60 border border-blue-200 dark:border-blue-600 text-center">
                <span className="text-[11px] block text-blue-800 dark:text-[#B8F010] font-bold">GOLD</span>
                <span className="text-lg sm:text-xl font-black text-blue-800 dark:text-[#B8F010]">30%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#B8F010]/20 border border-emerald-500 dark:border-[#B8F010] text-center shadow-sm">
                <span className="text-[11px] block text-[#040E1F] dark:text-[#B8F010] font-bold">PLATINUM</span>
                <span className="text-lg sm:text-xl font-black text-[#040E1F] dark:text-[#B8F010]">40%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PARTNER_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                tier.popular
                  ? 'bg-blue-50/90 dark:bg-gradient-to-b dark:from-[#0D2D5E] dark:to-[#071D3E] border-2 border-blue-600 dark:border-[#B8F010] shadow-xl dark:shadow-2xl dark:shadow-[#B8F010]/15'
                  : 'bg-white dark:bg-[#071D3E] border border-slate-200/90 dark:border-blue-800/80 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-xl'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#B8F010] text-[#040E1F] text-[11px] font-extrabold uppercase tracking-wider shadow">
                  {c.popularBadge}
                </div>
              )}

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black tracking-wider uppercase text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-950 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-800">
                    {tier.badge}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">NextSofthr</span>
                </div>

                {/* Big Commission Rate in Lemon Green */}
                <div className="mb-4">
                  <span className="text-4xl sm:text-5xl font-black text-blue-700 dark:text-[#B8F010] font-mono tracking-tight">
                    {tier.commission}%
                  </span>
                  <span className="block text-xs font-bold text-slate-900 dark:text-white mt-1">
                    {strings.hero.stat1Label}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {tier.summary}
                </p>

                {/* Benefits List */}
                <div className="space-y-2.5 mb-8">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-blue-700 dark:text-blue-300">
                    Tier Inclusions:
                  </p>
                  {tier.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-[#B8F010]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-blue-600 dark:text-[#B8F010]" />
                      </div>
                      <span className="leading-snug">{b}</span>
                    </div>
                  ))}

                  {/* Top-Tier Dynamic SVG Certification Badge Callout */}
                  {(tier.id === 'gold' || tier.id === 'platinum') && (
                    <div className="pt-2">
                      <div className="p-2.5 rounded-xl bg-blue-100/70 dark:bg-blue-950/80 border border-blue-300 dark:border-[#B8F010]/40 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-blue-700 dark:text-[#B8F010] shrink-0" />
                          <span className="text-[11px] font-bold text-slate-900 dark:text-white">Official SVG Badge</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenBadgeModal && onOpenBadgeModal({
                              partnerName: 'Enterprise Channel Partner',
                              tier: tier.id as any,
                              partnerId: tier.id === 'platinum' ? 'NX-PTR-8832' : 'NX-PTR-6340',
                              specialization: tier.id === 'platinum' ? 'Strategic Enterprise Channel' : 'Premier Advisory & Solutions',
                              styleVariant: tier.id === 'platinum' ? 'crest' : 'shield'
                            });
                          }}
                          className="text-[10px] font-black text-blue-700 dark:text-[#B8F010] hover:underline"
                        >
                          View Badge &rarr;
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tier CTA Button */}
              <button
                onClick={() => {
                  if (onSelectTier) onSelectTier(tier.id);
                  if (onApplyClick) onApplyClick();
                }}
                className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                  tier.popular
                    ? 'bg-[#B8F010] text-[#040E1F] hover:bg-[#CBFF1A] shadow-md shadow-[#B8F010]/25'
                    : 'bg-slate-100 dark:bg-blue-950 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-blue-900 border border-slate-300 dark:border-blue-700 hover:border-blue-500 dark:hover:border-[#B8F010]'
                }`}
              >
                <span>{c.startAtTier} ({tier.name})</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          ))}
        </div>

        {/* Interactive Recurring Commission Calculator */}
        <div className="rounded-3xl bg-white dark:bg-[#030914] border border-slate-200 dark:border-blue-700/80 p-6 sm:p-10 shadow-lg dark:shadow-2xl mb-10 transition-colors duration-300">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-blue-900/80 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-xs font-bold text-blue-800 dark:text-[#B8F010] mb-2 border border-blue-200 dark:border-blue-800">
                <Calculator className="w-3.5 h-3.5" />
                <span>{c.calculatorTitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {c.calculatorSub}
              </h3>
            </div>

            {/* Currency selector - Multi-currency African & Global */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-blue-950 p-1.5 rounded-xl border border-slate-300 dark:border-blue-800 flex-wrap">
              {(['USD', 'NGN', 'EUR', 'XOF', 'KES', 'EGP'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setActiveCurrency(curr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCurrency === curr
                      ? 'bg-blue-600 text-white dark:bg-[#B8F010] dark:text-[#040E1F] shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Calculator Controls & Output */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">
                    {c.clientsSliderLabel}: <span className="text-blue-600 dark:text-[#B8F010] text-base font-extrabold">{numCompanies}</span>
                  </label>
                  <span className="text-xs text-slate-500 dark:text-slate-400">1 – 50</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={numCompanies}
                  onChange={(e) => setNumCompanies(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-blue-950 rounded-lg appearance-none cursor-pointer accent-[#B8F010]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">
                    {c.avgEmployeesLabel}: <span className="text-blue-600 dark:text-[#B8F010] text-base font-extrabold">{avgStaffPerCompany}</span>
                  </label>
                  <span className="text-xs text-slate-500 dark:text-slate-400">10 – 250</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="250"
                  step="5"
                  value={avgStaffPerCompany}
                  onChange={(e) => setAvgStaffPerCompany(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-blue-950 rounded-lg appearance-none cursor-pointer accent-[#B8F010]"
                />
              </div>

              {/* Total employees metric badge */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071D3E] border border-slate-200 dark:border-blue-800 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-xs text-slate-600 dark:text-slate-300 block">Total Active Subscribed Users</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{totalEmployees.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Qualifying Partner Tier</span>
                  <span className="text-sm font-extrabold text-blue-700 dark:text-[#B8F010]">{simulatedTierName} ({simulatedTier}%)</span>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 to-blue-950 p-6 rounded-2xl border border-blue-700/80 text-center text-white shadow-xl">
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block mb-1">
                {c.estimatedMonthlyRevenue}
              </span>
              
              <div className="my-4">
                <span className="text-3xl sm:text-4xl font-black text-[#B8F010] font-mono">
                  {currentRate.symbol}{formatMoney(estimatedMonthlyCommission)}
                </span>
                <span className="text-xs text-blue-200/70 block mt-1">Paid out monthly in {activeCurrency}</span>
              </div>

              <div className="pt-4 border-t border-blue-800 mb-6">
                <span className="text-xs text-blue-200/90 block">{c.estimatedAnnualRevenue}</span>
                <span className="text-2xl font-extrabold text-white font-mono">
                  {currentRate.symbol}{formatMoney(estimatedAnnualCommission)} / yr
                </span>
              </div>

              <button
                onClick={() => onSelectTier('gold')}
                className="w-full py-3 rounded-xl bg-[#B8F010] text-[#040E1F] text-xs font-extrabold hover:bg-[#CBFF1A] transition-all flex items-center justify-center gap-2 shadow"
              >
                <span>{strings.nav.applyNow}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>

          </div>
        </div>

        {/* Legal Disclaimer Note */}
        <div className="text-center max-w-3xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-blue-950/40 p-3.5 rounded-xl border border-slate-200 dark:border-blue-900/60">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-[#B8F010] shrink-0" />
          <span>
            Commission eligibility, qualification requirements, payment schedules and other partner terms are subject to the official NextSofthr Partner Agreement.
          </span>
        </div>

      </div>
    </section>
  );
};
