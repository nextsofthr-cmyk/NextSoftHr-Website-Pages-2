import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, RefreshCw, Layers, Sparkles, AlertCircle, ArrowUpRight, Check, HelpCircle } from 'lucide-react';
import { MODULE_CATALOG } from '../data/scheduleData';

interface CommissionCalculatorProps {
  onJumpToSection: (sectionId: number) => void;
}

export const CommissionCalculator: React.FC<CommissionCalculatorProps> = ({ onJumpToSection }) => {
  // Modes: 'recurring' | 'reseller' | 'distributor'
  const [modelMode, setModelMode] = useState<'recurring' | 'reseller' | 'distributor'>('recurring');

  // Standard / Recurring parameters
  const [selectedTier, setSelectedTier] = useState<'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Custom'>('Gold');
  const [customRate, setCustomRate] = useState<number>(30);
  const [baseSubscriptionType, setBaseSubscriptionType] = useState<'modules' | 'manual'>('modules');
  const [selectedModules, setSelectedModules] = useState<string[]>(['hr', 'payroll', 'time', 'ess']);
  const [manualMonthlyAmount, setManualMonthlyAmount] = useState<number>(1000);
  const [employeeSeats, setEmployeeSeats] = useState<number>(150);
  const [branchCount, setBranchCount] = useState<number>(1);
  const [retentionMonths, setRetentionMonths] = useState<number>(12);

  // Financial deductions (Section 11)
  const [taxDeductionPercent, setTaxDeductionPercent] = useState<number>(7.5); // VAT
  const [processingFeePercent, setProcessingFeePercent] = useState<number>(2.0); // Payment processor
  const [refundOffset, setRefundOffset] = useState<number>(0);

  // Reseller Margin Mode (Section 18)
  const [customerListPrice, setCustomerListPrice] = useState<number>(2500);
  const [resellerMarginPercent, setResellerMarginPercent] = useState<number>(25);
  const [customerDiscountPercent, setCustomerDiscountPercent] = useState<number>(5);

  // Distributor Override Mode (Section 19-20 & 55)
  const [distributorTotalRev, setDistributorTotalRev] = useState<number>(10000);
  const [subResellerRate, setSubResellerRate] = useState<number>(20);
  const [distributorOverrideRate, setDistributorOverrideRate] = useState<number>(5);
  const [distributorDirectRev, setDistributorDirectRev] = useState<number>(3000);
  const [distributorDirectRate, setDistributorDirectRate] = useState<number>(35);

  // Tier Rate mapping
  const tierRateMap: Record<string, number> = {
    Bronze: 15,
    Silver: 20,
    Gold: 30,
    Platinum: 40,
    Custom: customRate
  };

  const activeRate = tierRateMap[selectedTier] || 30;

  // Module pricing calculation
  const modulesMonthlyTotal = useMemo(() => {
    let total = 0;
    selectedModules.forEach((modId) => {
      const found = MODULE_CATALOG.find((m) => m.id === modId);
      if (found) total += found.basePriceMonthly;
    });
    // Multi-branch multiplier: each additional branch adds 25% base maintenance
    const branchMultiplier = 1 + Math.max(0, branchCount - 1) * 0.25;
    // Scaled by employee seats: base tier is up to 50 employees, +$1.20 per employee above 50
    const extraSeats = Math.max(0, employeeSeats - 50);
    const seatAddon = extraSeats * 1.5;
    return Math.round((total + seatAddon) * branchMultiplier);
  }, [selectedModules, branchCount, employeeSeats]);

  const grossMonthlyRevenue = baseSubscriptionType === 'modules' ? modulesMonthlyTotal : manualMonthlyAmount;

  // Section 11 deductions calculation
  const monthlyDeductions = useMemo(() => {
    const taxAmt = grossMonthlyRevenue * (taxDeductionPercent / 100);
    const feeAmt = grossMonthlyRevenue * (processingFeePercent / 100);
    return taxAmt + feeAmt;
  }, [grossMonthlyRevenue, taxDeductionPercent, processingFeePercent]);

  // Section 11 net commissionable revenue
  const monthlyCommissionableRevenue = Math.max(0, grossMonthlyRevenue - monthlyDeductions - refundOffset);
  const monthlyPartnerCommission = monthlyCommissionableRevenue * (activeRate / 100);
  const cumulativeCommission = monthlyPartnerCommission * retentionMonths;
  const cumulativeGrossRevenue = grossMonthlyRevenue * retentionMonths;

  // Reseller Mode calculations (Section 18)
  const resellerDiscountedSellingPrice = customerListPrice * (1 - customerDiscountPercent / 100);
  const resellerPurchasePrice = customerListPrice * (1 - resellerMarginPercent / 100);
  const resellerNetProfitPerDeal = Math.max(0, resellerDiscountedSellingPrice - resellerPurchasePrice);
  const resellerActualEffectiveMargin = customerListPrice > 0 ? (resellerNetProfitPerDeal / customerListPrice) * 100 : 0;

  // Distributor Mode calculations (Section 20 & 55)
  const distributorOverrideEarnings = distributorTotalRev * (distributorOverrideRate / 100);
  const subResellerTotalEarnings = distributorTotalRev * (subResellerRate / 100);
  const distributorDirectEarnings = distributorDirectRev * (distributorDirectRate / 100);
  const distributorTotalMonthlyEarnings = distributorOverrideEarnings + distributorDirectEarnings;
  const nextSoftHRRetainedRev = (distributorTotalRev + distributorDirectRev) - subResellerTotalEarnings - distributorTotalMonthlyEarnings;

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const applyPreset = (presetName: string) => {
    if (presetName === 'section53') {
      setModelMode('recurring');
      setSelectedTier('Silver');
      setBaseSubscriptionType('manual');
      setManualMonthlyAmount(1000);
      setTaxDeductionPercent(0);
      setProcessingFeePercent(0);
      setRefundOffset(100);
      setRetentionMonths(1);
    } else if (presetName === 'section54') {
      setModelMode('recurring');
      setSelectedTier('Gold');
      setBaseSubscriptionType('manual');
      setManualMonthlyAmount(500);
      setTaxDeductionPercent(0);
      setProcessingFeePercent(0);
      setRefundOffset(0);
      setRetentionMonths(12);
    } else if (presetName === 'section55') {
      setModelMode('distributor');
      setDistributorTotalRev(1000);
      setSubResellerRate(20);
      setDistributorOverrideRate(5);
      setDistributorDirectRev(0);
    } else if (presetName === 'enterprise') {
      setModelMode('recurring');
      setSelectedTier('Platinum');
      setBaseSubscriptionType('modules');
      setSelectedModules(['hr', 'payroll', 'time', 'leave', 'recruitment', 'ess', 'mss', 'outsourcing']);
      setEmployeeSeats(450);
      setBranchCount(4);
      setTaxDeductionPercent(7.5);
      setProcessingFeePercent(2.0);
      setRefundOffset(0);
      setRetentionMonths(24);
    }
  };

  return (
    <div className="space-y-8">
      {/* Simulator Hero & Preset Presets */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
              <span>Section 14 & 53–55 Compliant Engine</span>
              <span aria-hidden="true">·</span>
              <span className="text-blue-700 font-mono">Real-Time Yield Simulator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Partner Commission & Revenue Share Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Model your recurring payouts, multi-branch add-on modules, reseller margins, or distributor overrides with statutory tax exclusions (Section 11).
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-400">Official Presets:</span>
            <button
              onClick={() => applyPreset('section53')}
              className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
              title="Loads Section 53 Example: $1000 Silver with $100 Refund"
            >
              § 53 Refund ($1,000)
            </button>
            <button
              onClick={() => applyPreset('section54')}
              className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
              title="Loads Section 54 Example: $500/mo Gold 30% x 12 months = $1,800"
            >
              § 54 Recurring ($1,800)
            </button>
            <button
              onClick={() => applyPreset('section55')}
              className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
              title="Loads Section 55 Example: $1000 rev, 20% sub-reseller, 5% distributor override"
            >
              § 55 Override (5%)
            </button>
            <button
              onClick={() => applyPreset('enterprise')}
              className="px-2.5 py-1 text-xs font-medium bg-blue-50 hover:bg-blue-100 rounded text-blue-700 transition-colors"
            >
              Enterprise 4-Branch
            </button>
          </div>
        </div>

        {/* Model Mode Segmented Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg mt-6 max-w-md">
          <button
            onClick={() => setModelMode('recurring')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-colors ${
              modelMode === 'recurring'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Recurring Tiers (15%–40%)
          </button>
          <button
            onClick={() => setModelMode('reseller')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-colors ${
              modelMode === 'reseller'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Reseller Margin (Sec 18)
          </button>
          <button
            onClick={() => setModelMode('distributor')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-colors ${
              modelMode === 'distributor'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Distributor Override (Sec 19-20)
          </button>
        </div>
      </div>

      {/* Main Calculation Layout */}
      {modelMode === 'recurring' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Partner Tier Selection */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  1. Partner Tier & Rate (Sections 3–7)
                </span>
                <button
                  onClick={() => onJumpToSection(3)}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  View § 3 Rules <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'Bronze', rate: '15%', desc: 'Entry Channel' },
                  { name: 'Silver', rate: '20%', desc: 'Established' },
                  { name: 'Gold', rate: '30%', desc: 'Active / Direct Leads' },
                  { name: 'Platinum', rate: '40%', desc: 'Strategic & Enterprise' },
                ].map((tier) => (
                  <button
                    key={tier.name}
                    onClick={() => setSelectedTier(tier.name as any)}
                    className={`p-3 text-left border rounded-md transition-all ${
                      selectedTier === tier.name
                        ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-800">{tier.name}</div>
                    <div className="text-lg font-extrabold font-mono text-blue-700">{tier.rate}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Revenue Input Method */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. Deal Scope & NextSoftHR Modules (Section 16–17)
                </span>
                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setBaseSubscriptionType('modules')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      baseSubscriptionType === 'modules'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Select Modules
                  </button>
                  <button
                    onClick={() => setBaseSubscriptionType('manual')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      baseSubscriptionType === 'manual'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Custom Amount
                  </button>
                </div>
              </div>

              {baseSubscriptionType === 'modules' ? (
                <div className="space-y-4">
                  {/* Scope scale sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-50 rounded-md">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-700">Employees / User Seats</span>
                        <span className="font-mono font-bold text-blue-700">{employeeSeats}</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="1000"
                        step="10"
                        value={employeeSeats}
                        onChange={(e) => setEmployeeSeats(Number(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-700">Branches / Entities (Sec 17)</span>
                        <span className="font-mono font-bold text-blue-700">{branchCount}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={branchCount}
                        onChange={(e) => setBranchCount(Number(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                    </div>
                  </div>

                  {/* Modules selection checklist */}
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-2">
                      Eligible Modules Included in Contract:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {MODULE_CATALOG.map((mod) => {
                        const isChecked = selectedModules.includes(mod.id);
                        return (
                          <div
                            key={mod.id}
                            onClick={() => toggleModule(mod.id)}
                            className={`p-2.5 border rounded-md cursor-pointer flex items-start gap-2.5 transition-colors ${
                              isChecked
                                ? 'border-blue-500 bg-blue-50/30'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="mt-0.5 rounded text-blue-600 focus:ring-0"
                            />
                            <div className="text-xs leading-tight flex-1">
                              <div className="font-semibold text-slate-900 flex justify-between">
                                <span>{mod.name}</span>
                                <span className="font-mono text-slate-500">${mod.basePriceMonthly}/mo</span>
                              </div>
                              <div className="text-slate-500 text-[11px] mt-0.5">{mod.description}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Gross Customer Monthly Subscription ($ USD)
                    </label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="number"
                        min="10"
                        step="50"
                        value={manualMonthlyAmount}
                        onChange={(e) => setManualMonthlyAmount(Number(e.target.value))}
                        className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded font-mono font-semibold"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Commissionable Deductions (Section 11) */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. Statutory Exclusions & Adjustments (Section 11)
                </span>
                <button
                  onClick={() => onJumpToSection(11)}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  View § 11 Exclusions <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">
                    VAT / Sales Tax (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    step="0.5"
                    value={taxDeductionPercent}
                    onChange={(e) => setTaxDeductionPercent(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Standard W.Africa VAT ~7.5%</span>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">
                    Gateway / Wire Fee (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={processingFeePercent}
                    onChange={(e) => setProcessingFeePercent(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Bank gateway fees ~1.5–2%</span>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">
                    Refund / Offset ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={refundOffset}
                    onChange={(e) => setRefundOffset(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Section 30 refunds</span>
                </div>
              </div>
            </div>

            {/* Step 4: Customer Retention Horizon (Section 13, 14, 54) */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  4. Client Retention Horizon (Section 13 & 54)
                </span>
                <span className="font-mono text-xs font-bold text-blue-700">
                  {retentionMonths} Months ({Math.round(retentionMonths / 12 * 10) / 10} Yrs)
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="36"
                step="1"
                value={retentionMonths}
                onChange={(e) => setRetentionMonths(Number(e.target.value))}
                className="w-full accent-blue-600"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>1 Month (Initial)</span>
                <span>12 Months (1 Year)</span>
                <span>24 Months (2 Years)</span>
                <span>36 Months (3 Years)</span>
              </div>
            </div>

          </div>

          {/* Results Summary Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Financial Statement Card */}
            <div className="bg-slate-900 text-white rounded-lg p-6 space-y-6 border border-slate-800 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Commission Breakdown
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {selectedTier} Tier ({activeRate}%)
                </span>
              </div>

              {/* Monthly Highlight Metric */}
              <div>
                <span className="text-xs text-slate-400 block mb-1">Estimated Monthly Partner Commission</span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tracking-tight tabular-nums">
                  ${monthlyPartnerCommission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-xs text-slate-400 font-normal ml-2">/ month</span>
                </div>
              </div>

              {/* Full Horizon Accumulation */}
              <div className="p-3.5 bg-slate-800/80 rounded-md border border-slate-700/60">
                <span className="text-xs text-slate-400 block mb-1">
                  Cumulative Payout over {retentionMonths} Months
                </span>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">
                  ${cumulativeCommission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  From total ${cumulativeGrossRevenue.toLocaleString()} client gross subscription
                </div>
              </div>

              {/* Line-item Reconciliation Ledger */}
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Customer Gross Subscription:</span>
                  <span className="font-mono tabular-nums text-white">${grossMonthlyRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 text-rose-400">
                  <span>Less VAT ({taxDeductionPercent}%) & Fees ({processingFeePercent}%):</span>
                  <span className="font-mono tabular-nums">-${monthlyDeductions.toFixed(2)}</span>
                </div>
                {refundOffset > 0 && (
                  <div className="flex justify-between py-1 text-rose-400">
                    <span>Less Refund / Offset (Sec 30):</span>
                    <span className="font-mono tabular-nums">-${refundOffset.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 border-t border-slate-800 font-semibold text-white">
                  <span>Commissionable Net Revenue (Sec 11):</span>
                  <span className="font-mono tabular-nums text-blue-300">${monthlyCommissionableRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Commission Rate Applied:</span>
                  <span className="font-mono text-emerald-400 font-bold">{activeRate}%</span>
                </div>
                <div className="flex justify-between py-1.5 border-t border-slate-800 text-slate-400">
                  <span>NextSoftHR Retained Revenue:</span>
                  <span className="font-mono tabular-nums text-slate-300">
                    ${(monthlyCommissionableRevenue - monthlyPartnerCommission).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Section 34 Threshold Indicator */}
              <div className={`p-3 rounded text-xs flex items-start gap-2 ${
                monthlyPartnerCommission >= 100
                  ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                  : 'bg-amber-950/60 border border-amber-800 text-amber-300'
              }`}>
                <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  {monthlyPartnerCommission >= 100 ? (
                    <span>
                      <strong>Qualifies for Immediate Monthly Payout (Section 34):</strong> Amount meets the $100.00 minimum disbursement threshold.
                    </span>
                  ) : (
                    <span>
                      <strong>Section 34 Rollover Rule:</strong> Amount is under $100.00 threshold; balance will roll forward to subsequent billing cycles until $100 is accumulated.
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Side-by-side Tier Comparison Box */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Cross-Tier Comparison on Same Deal
              </span>
              <div className="divide-y divide-slate-100 text-xs">
                {[
                  { name: 'Bronze', rate: 15 },
                  { name: 'Silver', rate: 20 },
                  { name: 'Gold / Partner', rate: 30 },
                  { name: 'Platinum', rate: 40 },
                ].map((t) => {
                  const mRev = monthlyCommissionableRevenue * (t.rate / 100);
                  const aRev = mRev * 12;
                  const isCurrent = t.rate === activeRate;
                  return (
                    <div
                      key={t.name}
                      className={`py-2 px-1 flex items-center justify-between ${
                        isCurrent ? 'bg-blue-50/60 font-semibold' : ''
                      }`}
                    >
                      <div>
                        <span className="text-slate-800">{t.name}</span>
                        <span className="text-slate-400 font-mono ml-1.5">({t.rate}%)</span>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-slate-900">${mRev.toFixed(2)}/mo</span>
                        <span className="text-slate-400 text-[11px] block">${aRev.toFixed(0)}/yr</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Reseller Margin Mode (Section 18) */}
      {modelMode === 'reseller' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Reseller Schedule Parameters (Section 18)
                </span>
                <button
                  onClick={() => onJumpToSection(18)}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  View § 18 Rules <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Authorized Resellers buy wholesale from NextSoftHR and invoice end customers directly up to the authorized discount ceiling.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Customer Official List Price ($ USD)
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={customerListPrice}
                  onChange={(e) => setCustomerListPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Reseller Wholesale Margin</span>
                    <span className="font-mono font-bold text-blue-700">{resellerMarginPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="1"
                    value={resellerMarginPercent}
                    onChange={(e) => setResellerMarginPercent(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Wholesale discount from List</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Customer Discount Offered</span>
                    <span className="font-mono font-bold text-blue-700">{customerDiscountPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={customerDiscountPercent}
                    onChange={(e) => setCustomerDiscountPercent(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Maximum authorized discount: 20%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white rounded-lg p-6 space-y-5 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block border-b border-slate-800 pb-2">
              Reseller Economics Summary
            </span>

            <div>
              <span className="text-xs text-slate-400 block mb-1">Net Reseller Profit Per Transaction</span>
              <div className="text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
                ${resellerNetProfitPerDeal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Effective retained margin: <strong className="text-white font-mono">{resellerActualEffectiveMargin.toFixed(1)}%</strong> of list price
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">NextSoftHR Wholesale Price to Reseller:</span>
                <span className="font-mono text-white">${resellerPurchasePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Invoiced Price to Customer:</span>
                <span className="font-mono text-emerald-300">${resellerDiscountedSellingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-t border-slate-800 text-slate-400">
                <span>Minimum Authorized Price Floor:</span>
                <span className="font-mono text-slate-300">${(customerListPrice * 0.80).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Distributor Override Mode (Section 19-20 & 55) */}
      {modelMode === 'distributor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Distributor Network & Override (Sections 19, 20 & 55)
                </span>
                <button
                  onClick={() => onJumpToSection(20)}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  View § 20 Overrides <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Master distributors recruit and supervise local sub-resellers, earning overrides on their aggregate network turnover plus direct commissions.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Sub-Reseller Network Monthly Revenue ($ USD)
                </label>
                <input
                  type="number"
                  min="500"
                  step="500"
                  value={distributorTotalRev}
                  onChange={(e) => setDistributorTotalRev(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Sub-Reseller Commission</span>
                    <span className="font-mono font-bold text-blue-700">{subResellerRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="1"
                    value={subResellerRate}
                    onChange={(e) => setSubResellerRate(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Paid directly to sub-reseller</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Distributor Override</span>
                    <span className="font-mono font-bold text-blue-700">{distributorOverrideRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    step="0.5"
                    value={distributorOverrideRate}
                    onChange={(e) => setDistributorOverrideRate(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Standard override: 5% (Sec 55)</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Direct Distributor Sales Revenue ($ USD)
                </label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={distributorDirectRev}
                  onChange={(e) => setDistributorDirectRev(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white rounded-lg p-6 space-y-5 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block border-b border-slate-800 pb-2">
              Distributor Settlement Breakdown
            </span>

            <div>
              <span className="text-xs text-slate-400 block mb-1">Total Monthly Distributor Earnings</span>
              <div className="text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
                ${distributorTotalMonthlyEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Annualized Run-Rate: <strong className="text-white font-mono">${(distributorTotalMonthlyEarnings * 12).toLocaleString()}</strong>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Override from Sub-Resellers ({distributorOverrideRate}%):</span>
                <span className="font-mono text-emerald-300">${distributorOverrideEarnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Sub-Resellers Earned ({subResellerRate}%):</span>
                <span className="font-mono text-slate-400">${subResellerTotalEarnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Direct Sales Commission ({distributorDirectRate}%):</span>
                <span className="font-mono text-emerald-300">${distributorDirectEarnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-t border-slate-800 text-slate-400">
                <span>NextSoftHR Retained Net:</span>
                <span className="font-mono text-white">${nextSoftHRRetainedRev.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
