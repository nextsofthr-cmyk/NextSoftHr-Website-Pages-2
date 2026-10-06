import React, { useState } from 'react';
import { PARTNER_TIERS } from '../data/partnerData';
import { Check, HelpCircle, Calculator, TrendingUp, Sparkles, DollarSign } from 'lucide-react';

export const PartnerTiers: React.FC = () => {
  // Calculator state
  const [selectedTierRate, setSelectedTierRate] = useState<number>(30); // Default Gold 30%
  const [clientCount, setClientCount] = useState<number>(20);
  const [avgArr, setAvgArr] = useState<number>(3600); // $300/mo = $3,600 ARR
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'NGN'>('USD');

  const currencySymbols = {
    USD: '$',
    GBP: '£',
    NGN: '₦'
  };

  const currencyMultipliers = {
    USD: 1,
    GBP: 0.8,
    NGN: 1500
  };

  const sym = currencySymbols[currency];
  const mult = currencyMultipliers[currency];

  const totalArrUnderManagement = clientCount * avgArr * mult;
  const annualCommission = totalArrUnderManagement * (selectedTierRate / 100);
  const monthlyCommission = annualCommission / 12;
  const threeYearCumulative = annualCommission * 3;

  return (
    <section id="tiers" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
            <span>Performance Framework</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Recurring Commission Tiers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Predictable, Compounding Revenue at Every Tier
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Our progressive 4-tier model rewards active engagement, certification excellence, customer retention, and recurring growth. All recurring commissions are paid on qualifying net subscription revenue collected.
          </p>
        </div>

        {/* 4 Professional Tiers Grid */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARTNER_TIERS.map((tier) => {
            const isGold = tier.id === 'gold';
            return (
              <div
                key={tier.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                  isGold
                    ? 'border-blue-500 bg-gradient-to-b from-blue-50/50 to-white shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Tier Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {tier.name}
                    </span>
                    {isGold && (
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Recurring Rate Number */}
                  <div className="mt-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold tracking-tight text-slate-900 tabular-nums">
                        {tier.recurringRate}%
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        recurring
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed min-h-[40px]">
                      {tier.description}
                    </p>
                  </div>

                  {/* Qualification Criteria */}
                  <div className="mt-6 pt-4 border-t border-slate-200/60 space-y-2 text-xs">
                    <span className="font-semibold text-slate-900 block mb-2">
                      Key Qualifications:
                    </span>
                    <ul className="space-y-2 text-slate-600">
                      {tier.qualificationCriteria.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <Check className="w-3.5 h-3.5 text-lime-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Metadata */}
                <div className="mt-6 pt-4 border-t border-slate-200/60 space-y-2 text-[11px] text-slate-500">
                  <div className="flex justify-between">
                    <span>Target Volume:</span>
                    <span className="font-medium text-slate-700">{tier.recommendedVolume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Support SLA:</span>
                    <span className="font-medium text-slate-700">{tier.supportLevel}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Qualification Standards Explanation Box (Mandatory Prompt Requirement) */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-lime-400" />
            <h3 className="text-base font-bold text-white">
              Holistic Tier Evaluation Standards
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Partnership advancement is evaluated across multiple dimensions rather than revenue alone. NextSoftHR reviews partner performance semi-annually based on:
          </p>
          <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
              <span>Revenue generated</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
              <span>Number of active customers</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
              <span>Net new subscriptions</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
              <span>Customer retention (90%+)</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Certified employees on staff</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Demonstrated product knowledge</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Implementation capability</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Customer satisfaction (CSAT)</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Quarterly sales performance</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Statutory and brand compliance</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Territory development initiatives</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Specialized partner certifications</span>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-slate-400 italic">
            * Note: Revenue thresholds do not automatically guarantee tier promotion. NextSoftHR maintains full discretion to assign, adjust, or establish specialized partner levels in accordance with regional channel needs.
          </p>
        </div>

        {/* Interactive Commission & Recurring Earnings Calculator */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-700 text-white shadow-xs">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Interactive Recurring Commission Calculator
                </h3>
                <p className="text-xs text-slate-500">
                  Simulate your monthly and multi-year compounded earnings based on your target portfolio.
                </p>
              </div>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg self-start">
              {(['USD', 'GBP', 'NGN'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    currency === curr
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Tier Selection Radio Pills */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Partner Tier:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {PARTNER_TIERS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTierRate(t.recurringRate)}
                      className={`p-2.5 text-center rounded-xl border transition-all cursor-pointer ${
                        selectedTierRate === t.recurringRate
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span className="block text-xs uppercase">{t.name.split(' ')[0]}</span>
                      <span className="block text-base font-extrabold text-blue-700 tabular-nums">
                        {t.recurringRate}%
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Clients Slider */}
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-semibold text-slate-700">Active Subscriptions (Clients):</span>
                  <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {clientCount} Accounts
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={clientCount}
                  onChange={(e) => setClientCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1 client</span>
                  <span>50 clients</span>
                  <span>100+ clients</span>
                </div>
              </div>

              {/* Average ARR per Client Slider */}
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-semibold text-slate-700">Average Annual Contract Value (ARR):</span>
                  <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {sym}{Math.round(avgArr * mult).toLocaleString()} / year
                  </span>
                </div>
                <input
                  type="range"
                  min="1200"
                  max="15000"
                  step="300"
                  value={avgArr}
                  onChange={(e) => setAvgArr(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>Small ({sym}{Math.round(1200 * mult).toLocaleString()})</span>
                  <span>Mid-Market ({sym}{Math.round(6000 * mult).toLocaleString()})</span>
                  <span>Enterprise ({sym}{Math.round(15000 * mult).toLocaleString()}+)</span>
                </div>
              </div>
            </div>

            {/* Calculated Output Showcase */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block pb-2 border-b border-slate-100">
                Projected Partner Earnings
              </span>

              <div>
                <span className="text-xs text-slate-500 block">Total Portfolio ARR Managed:</span>
                <span className="text-xl font-bold text-slate-900 tabular-nums">
                  {sym}{Math.round(totalArrUnderManagement).toLocaleString()}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-lime-50/70 border border-lime-200">
                <span className="text-xs text-lime-900 font-semibold block">
                  Monthly Recurring Commission:
                </span>
                <span className="text-3xl font-extrabold text-lime-900 tabular-nums">
                  {sym}{Math.round(monthlyCommission).toLocaleString()}
                </span>
                <span className="text-[11px] text-lime-800 block mt-1">
                  Disbursed automatically on the 15th of each month
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block mb-0.5">Annual Commission:</span>
                  <span className="text-base font-bold text-slate-900 tabular-nums">
                    {sym}{Math.round(annualCommission).toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block mb-0.5">3-Year Cumulative:</span>
                  <span className="text-base font-bold text-blue-700 tabular-nums">
                    {sym}{Math.round(threeYearCumulative).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
