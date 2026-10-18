import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Layers, 
  Building, 
  RotateCcw, 
  Info, 
  Sparkles, 
  Check, 
  Sliders, 
  ArrowRight,
  ShieldAlert,
  Percent,
  Calendar,
  Users
} from 'lucide-react';
import { PARTNER_TIERS, NEXTSOFTHR_MODULES, PartnerTier } from '../data/scheduleData';

import { useCommissionLanguage } from '../context/LanguageContext';
type CalculationMode = 'recurring' | 'reseller' | 'distributor';

export const CalculatorView: React.FC<{ onNavigateToSection: (id: number) => void }> = ({ onNavigateToSection }) => {
  const { t } = useCommissionLanguage();
  const [mode, setMode] = useState<CalculationMode>('recurring');

  // Recurring & Direct Parameters
  const [selectedTierId, setSelectedTierId] = useState<string>('gold');
  const [customRate, setCustomRate] = useState<number>(30);
  const [useCustomRate, setUseCustomRate] = useState<boolean>(false);
  const [baseSubscription, setBaseSubscription] = useState<number>(500); // monthly base
  const [billingFrequency, setBillingFrequency] = useState<'monthly' | 'annually'>('monthly');
  const [durationMonths, setDurationMonths] = useState<number>(12);
  const [numberOfCustomers, setNumberOfCustomers] = useState<number>(3);
  const [numberOfBranches, setNumberOfBranches] = useState<number>(1);
  const [selectedModules, setSelectedModules] = useState<string[]>(['hr', 'payroll']);
  
  // Exclusions (Section 11)
  const [taxRatePercent, setTaxRatePercent] = useState<number>(7.5); // e.g. VAT / WHT
  const [paymentGatewayFeePct, setPaymentGatewayFeePct] = useState<number>(1.5);
  const [monthlyRefunds, setMonthlyRefunds] = useState<number>(0);
  const [monthlyChargebacks, setMonthlyChargebacks] = useState<number>(0);

  // Reseller Parameters (Section 18)
  const [listPrice, setListPrice] = useState<number>(1200);
  const [resellerDiscountPct, setResellerDiscountPct] = useState<number>(25);
  const [customerDiscountPct, setCustomerDiscountPct] = useState<number>(10);
  const [resellerUnits, setResellerUnits] = useState<number>(5);

  // Distributor Parameters (Section 19, 20, 55)
  const [networkVolume, setNetworkVolume] = useState<number>(25000);
  const [subResellerRate, setSubResellerRate] = useState<number>(20);
  const [distributorOverrideRate, setDistributorOverrideRate] = useState<number>(5);
  const [directSalesVolume, setDirectSalesVolume] = useState<number>(5000);
  const [directCommissionRate, setDirectCommissionRate] = useState<number>(40);

  const currentTier = PARTNER_TIERS.find(t => t.id === selectedTierId) || PARTNER_TIERS[2];
  const effectiveRate = useCustomRate ? customRate : currentTier.rate;

  // Toggle module selection
  const toggleModule = (id: string) => {
    setSelectedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  // Preset loaders for the document examples
  const loadPreset = (preset: 'ex53' | 'ex54' | 'ex55' | 'enterprise') => {
    if (preset === 'ex53') {
      // Section 53: $1,000 sub, Silver 20%, $100 refund -> $900 net -> $180
      setMode('recurring');
      setSelectedTierId('silver');
      setUseCustomRate(false);
      setBaseSubscription(1000);
      setBillingFrequency('monthly');
      setDurationMonths(1);
      setNumberOfCustomers(1);
      setNumberOfBranches(1);
      setSelectedModules([]);
      setTaxRatePercent(0);
      setPaymentGatewayFeePct(0);
      setMonthlyRefunds(100);
      setMonthlyChargebacks(0);
    } else if (preset === 'ex54') {
      // Section 54: $500 monthly, Gold 30%, 12 months -> $150/mo -> $1,800
      setMode('recurring');
      setSelectedTierId('gold');
      setUseCustomRate(false);
      setBaseSubscription(500);
      setBillingFrequency('monthly');
      setDurationMonths(12);
      setNumberOfCustomers(1);
      setNumberOfBranches(1);
      setSelectedModules([]);
      setTaxRatePercent(0);
      setPaymentGatewayFeePct(0);
      setMonthlyRefunds(0);
      setMonthlyChargebacks(0);
    } else if (preset === 'ex55') {
      // Section 55: $1,000 revenue -> Sub-reseller 20% ($200), Distributor override 5% ($50)
      setMode('distributor');
      setNetworkVolume(1000);
      setSubResellerRate(20);
      setDistributorOverrideRate(5);
      setDirectSalesVolume(0);
      setDirectCommissionRate(40);
    } else if (preset === 'enterprise') {
      // Enterprise Deal: 10 branches, Gold tier, 12 months
      setMode('recurring');
      setSelectedTierId('gold');
      setUseCustomRate(false);
      setBaseSubscription(1200);
      setBillingFrequency('monthly');
      setDurationMonths(12);
      setNumberOfCustomers(4);
      setNumberOfBranches(3);
      setSelectedModules(['hr', 'payroll', 'attendance', 'leave', 'ess']);
      setTaxRatePercent(7.5);
      setPaymentGatewayFeePct(1.5);
      setMonthlyRefunds(0);
      setMonthlyChargebacks(0);
    }
  };

  // Recurring calculations
  const recurringMetrics = useMemo(() => {
    // Add module costs
    const modulesMonthly = selectedModules.reduce((acc, modId) => {
      const mod = NEXTSOFTHR_MODULES.find(m => m.id === modId);
      return acc + (mod ? mod.basePrice : 0);
    }, 0);

    const singleCustomerMonthlyGross = (baseSubscription + modulesMonthly) * (numberOfBranches > 1 ? 1 + (numberOfBranches - 1) * 0.4 : 1);
    const totalMonthlyGross = singleCustomerMonthlyGross * numberOfCustomers;

    // Deductions per Section 11 (Taxes, processing, refunds, chargebacks)
    const taxDeduction = totalMonthlyGross * (taxRatePercent / 100);
    const gatewayDeduction = totalMonthlyGross * (paymentGatewayFeePct / 100);
    const totalDeductions = taxDeduction + gatewayDeduction + monthlyRefunds + monthlyChargebacks;

    const commissionableMonthly = Math.max(0, totalMonthlyGross - totalDeductions);
    const monthlyCommission = commissionableMonthly * (effectiveRate / 100);

    const projectedTotalPeriodCommission = monthlyCommission * durationMonths;
    const projectedAnnualCommission = monthlyCommission * 12;
    const projected3YearCommission = monthlyCommission * 36;

    // Section 34 check ($100 payment threshold)
    const meetsThreshold = monthlyCommission >= 100;

    return {
      modulesMonthly,
      totalMonthlyGross,
      taxDeduction,
      gatewayDeduction,
      totalDeductions,
      commissionableMonthly,
      monthlyCommission,
      projectedTotalPeriodCommission,
      projectedAnnualCommission,
      projected3YearCommission,
      meetsThreshold
    };
  }, [
    baseSubscription, 
    selectedModules, 
    numberOfBranches, 
    numberOfCustomers, 
    taxRatePercent, 
    paymentGatewayFeePct, 
    monthlyRefunds, 
    monthlyChargebacks, 
    effectiveRate, 
    durationMonths
  ]);

  // Reseller Calculations (Section 18)
  const resellerMetrics = useMemo(() => {
    const wholesalePrice = listPrice * (1 - resellerDiscountPct / 100);
    const endUserPrice = listPrice * (1 - customerDiscountPct / 100);
    const unitMargin = endUserPrice - wholesalePrice;
    const marginPct = endUserPrice > 0 ? (unitMargin / endUserPrice) * 100 : 0;
    const totalResellerProfit = unitMargin * resellerUnits;
    const totalWholesaleSpend = wholesalePrice * resellerUnits;
    const totalCustomerRevenue = endUserPrice * resellerUnits;

    return {
      wholesalePrice,
      endUserPrice,
      unitMargin,
      marginPct,
      totalResellerProfit,
      totalWholesaleSpend,
      totalCustomerRevenue
    };
  }, [listPrice, resellerDiscountPct, customerDiscountPct, resellerUnits]);

  // Distributor Calculations (Section 19, 20, 55)
  const distributorMetrics = useMemo(() => {
    const subResellerEarnings = networkVolume * (subResellerRate / 100);
    const overrideEarnings = networkVolume * (distributorOverrideRate / 100);
    const directEarnings = directSalesVolume * (directCommissionRate / 100);
    const totalDistributorIncome = overrideEarnings + directEarnings;
    const nextsoftNet = (networkVolume - subResellerEarnings - overrideEarnings) + (directSalesVolume - directEarnings);

    return {
      subResellerEarnings,
      overrideEarnings,
      directEarnings,
      totalDistributorIncome,
      nextsoftNet
    };
  }, [networkVolume, subResellerRate, distributorOverrideRate, directSalesVolume, directCommissionRate]);

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Presets */}
      <div className="bg-gradient-to-r from-white dark:from-slate-900 via-white dark:via-slate-900/90 to-indigo-50 dark:to-indigo-950/70 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800/60 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-3">
              <Calculator className="w-3.5 h-3.5" />
              Official Schedule B Commission & Margin Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('page.calc.title')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-2xl">
              {t('page.calc.subtitle')}
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Schedule Presets:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => loadPreset('ex53')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-medium transition-all"
                title="Loads Example from Section 53: $1,000 deal, Silver 20%, $100 refund"
              >
                Sec 53 Example (Refund)
              </button>
              <button
                onClick={() => loadPreset('ex54')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-medium transition-all"
                title="Loads Example from Section 54: Gold 30% on $500/mo over 12 months = $1,800"
              >
                Sec 54 Example ($1,800/yr)
              </button>
              <button
                onClick={() => loadPreset('ex55')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-medium transition-all"
                title="Loads Example from Section 55: Distributor 5% override on $1,000 sub-reseller deal"
              >
                Sec 55 Distributor
              </button>
              <button
                onClick={() => loadPreset('enterprise')}
                className="px-2.5 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950 hover:bg-cyan-100 dark:hover:bg-cyan-900 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/80 text-xs font-semibold transition-all"
              >
                Multi-Branch Enterprise
              </button>
            </div>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mt-6 -mb-2">
          <button
            onClick={() => setMode('recurring')}
            className={`flex items-center gap-2 pb-3 px-4 text-sm font-semibold border-b-2 transition-all ${
              mode === 'recurring'
                ? 'border-cyan-400 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Recurring & Direct Commission (Sec 3, 13–17)
          </button>
          <button
            onClick={() => setMode('reseller')}
            className={`flex items-center gap-2 pb-3 px-4 text-sm font-semibold border-b-2 transition-all ${
              mode === 'reseller'
                ? 'border-cyan-400 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Reseller Wholesale Margins (Sec 18)
          </button>
          <button
            onClick={() => setMode('distributor')}
            className={`flex items-center gap-2 pb-3 px-4 text-sm font-semibold border-b-2 transition-all ${
              mode === 'distributor'
                ? 'border-cyan-400 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            Distributor Network Overrides (Sec 19, 20, 55)
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: RECURRING & DIRECT COMMISSION MODEL */}
      {/* ========================================================================= */}
      {mode === 'recurring' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tier Selection (Sections 3-7) */}
            <div className="bg-white dark:bg-slate-900/90 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    1. Partner Tier & Rate (Section 3 & 14)
                  </h3>
                </div>
                <button
                  onClick={() => onNavigateToSection(3)}
                  className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  View Schedule Section 3
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PARTNER_TIERS.map((tier) => {
                  const isSelected = !useCustomRate && selectedTierId === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => {
                        setSelectedTierId(tier.id);
                        setUseCustomRate(false);
                      }}
                      className={`relative p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? `bg-gradient-to-b from-slate-800 to-slate-900 border-cyan-400 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-400`
                          : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-400 dark:text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{tier.name.split(' ')[0]}</span>
                        <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">{tier.rate}%</span>
                      </div>
                      <div className="text-lg font-extrabold text-slate-900 dark:text-white">{tier.rate}%</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">{tier.minArr}</div>
                    </button>
                  );
                })}
              </div>

              {/* Custom rate toggle (e.g. strategic special agreement Sec 48) */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={useCustomRate}
                    onChange={(e) => setUseCustomRate(e.target.checked)}
                    className="rounded border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-cyan-500 focus:ring-0"
                  />
                  <span>Custom Strategic / Special Agreement Rate (Section 48)</span>
                </label>
                {useCustomRate && (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={customRate}
                      onChange={(e) => setCustomRate(Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs text-right"
                    />
                    <span className="text-slate-500 dark:text-slate-400 font-mono">%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Subscription & Customer Volume */}
            <div className="bg-white dark:bg-slate-900/90 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    2. Customer Subscription & Scope (Sections 10, 13, 17)
                  </h3>
                </div>
                <button
                  onClick={() => onNavigateToSection(17)}
                  className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  Sec 17 Multi-Branch
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Base Platform Subscription ($ / Month)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 dark:text-slate-400 text-xs">$</span>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={baseSubscription}
                      onChange={(e) => setBaseSubscription(Math.max(0, Number(e.target.value)))}
                      className="w-full pl-7 pr-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Core software fee before add-on modules</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Active Qualified Customers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-2.5 w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={numberOfCustomers}
                      onChange={(e) => setNumberOfCustomers(Math.max(1, Number(e.target.value)))}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Compliant with Section 9 qualification</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Multi-Branch / Locations per Deal (Sec 17)
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-2.5 w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={numberOfBranches}
                      onChange={(e) => setNumberOfBranches(Math.max(1, Number(e.target.value)))}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">+40% per additional registered branch</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Commission Eligibility Projection Window
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <select
                      value={durationMonths}
                      onChange={(e) => setDurationMonths(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-cyan-400 focus:outline-none"
                    >
                      <option value={1}>1 Month (Single Payout)</option>
                      <option value={3}>Quarterly (3 Months)</option>
                      <option value={6}>6 Months (Half Year)</option>
                      <option value={12}>12 Months (Full Annual Run - Sec 54)</option>
                      <option value={24}>24 Months (Multi-Year Renewal)</option>
                      <option value={36}>36 Months (Long-Term Retention)</option>
                    </select>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Section 13 recurring duration</span>
                </div>
              </div>
            </div>

            {/* Add-on Modules (Section 16) */}
            <div className="bg-white dark:bg-slate-900/90 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    3. NextSoftHR Add-On Modules (Section 16)
                  </h3>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  +${recurringMetrics.modulesMonthly}/mo selected
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Select modules deployed to calculate incremental add-on commission:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {NEXTSOFTHR_MODULES.map((mod) => {
                  const isChecked = selectedModules.includes(mod.id);
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => toggleModule(mod.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all text-xs flex flex-col justify-between ${
                        isChecked
                          ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500/60 text-cyan-800 dark:text-cyan-200'
                          : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-semibold">{mod.name}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />}
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">+${mod.basePrice}/mo</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Exclusions & Adjustments (Section 11, 29-31) */}
            <div className="bg-white dark:bg-slate-900/90 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    4. Deductions & Net Adjustments (Section 11, 30, 31)
                  </h3>
                </div>
                <button
                  onClick={() => onNavigateToSection(11)}
                  className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  Sec 11 Net Exclusions
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Tax / VAT / WHT Exclusion % (Sec 11 & 38)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="30"
                      value={taxRatePercent}
                      onChange={(e) => setTaxRatePercent(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">Excluded from commission base</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Payment Processing / Gateway Fee % (Sec 11)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={paymentGatewayFeePct}
                      onChange={(e) => setPaymentGatewayFeePct(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">Bank / gateway pass-through</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Customer Refund Offset ($ / Month) (Sec 30 & 53)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={monthlyRefunds}
                    onChange={(e) => setMonthlyRefunds(Math.max(0, Number(e.target.value)))}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500">Proportional clawback per Sec 30</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Chargeback / Dispute Adjustment ($ / Month) (Sec 31)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={monthlyChargebacks}
                    onChange={(e) => setMonthlyChargebacks(Math.max(0, Number(e.target.value)))}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500">Offset against statement payouts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-b from-white dark:from-slate-900 to-slate-50 dark:to-slate-950 rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-200/40 dark:shadow-cyan-950/20 sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">
                    Net Commission Payout
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                      ${recurringMetrics.monthlyCommission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ month</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Tier Rate</span>
                  <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400 font-mono">
                    {effectiveRate}%
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {currentTier.name}
                  </span>
                </div>
              </div>

              {/* Threshold Status (Section 34) */}
              <div className="my-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 flex items-start gap-3">
                {recurringMetrics.meetsThreshold ? (
                  <>
                    <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300">Meets Section 34 Payout Threshold</span>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                        Amount exceeds the required USD $100 minimum; eligible for regular monthly disbursement.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 mt-0.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs">
                      <span className="font-semibold text-amber-700 dark:text-amber-300">Below Section 34 Threshold ($100 Min)</span>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                        Earned balance of ${recurringMetrics.monthlyCommission.toFixed(2)} will roll forward to subsequent accounting periods until reaching USD $100.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Revenue Breakdown Waterfall */}
              <div className="space-y-2.5 text-xs py-3 border-y border-slate-200 dark:border-slate-800">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Gross Client Billing (Monthly):</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">
                    ${recurringMetrics.totalMonthlyGross.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span className="pl-2">└ Less VAT & Taxes ({taxRatePercent}%):</span>
                  <span className="font-mono text-red-600 dark:text-red-400">
                    -${recurringMetrics.taxDeduction.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span className="pl-2">└ Less Payment Gateway ({paymentGatewayFeePct}%):</span>
                  <span className="font-mono text-red-600 dark:text-red-400">
                    -${recurringMetrics.gatewayDeduction.toFixed(2)}
                  </span>
                </div>

                {(monthlyRefunds > 0 || monthlyChargebacks > 0) && (
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span className="pl-2">└ Less Refunds & Chargebacks:</span>
                    <span className="font-mono text-red-600 dark:text-red-400">
                      -${(monthlyRefunds + monthlyChargebacks).toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-cyan-700 dark:text-cyan-300 font-semibold pt-1 border-t border-slate-200 dark:border-slate-800/80">
                  <span>Eligible Commissionable Net Revenue (Sec 11):</span>
                  <span className="font-mono">
                    ${recurringMetrics.commissionableMonthly.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Multi-Period Projections (Section 13 & 54) */}
              <div className="mt-5 space-y-3">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">
                  Projected Recurring Earnings
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-left">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Selected {durationMonths} Mo. Horizon</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                      ${recurringMetrics.projectedTotalPeriodCommission.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-left">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">12-Month Annual Run</span>
                    <span className="text-lg font-bold text-cyan-700 dark:text-cyan-300 font-mono">
                      ${recurringMetrics.projectedAnnualCommission.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-50 dark:from-indigo-950/40 to-white dark:to-slate-900 border border-indigo-200 dark:border-indigo-800/40 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-indigo-700 dark:text-indigo-300 font-semibold block">
                      3-Year Retained Customer Value (Sec 13)
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Assuming maintained renewals & qualification
                    </span>
                  </div>
                  <span className="text-xl font-extrabold text-indigo-700 dark:text-indigo-300 font-mono">
                    ${recurringMetrics.projected3YearCommission.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              {/* Tier Upgrade Impact */}
              {selectedTierId !== 'platinum' && !useCustomRate && (
                <div className="mt-4 p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/40 text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-700 dark:text-cyan-300 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Tier Advancement Potential (Section 8)
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">
                    Qualifying for Platinum (40%) on this same deal increases your annual recurring commission by{' '}
                    <strong className="text-slate-900 dark:text-white font-mono">
                      +${((recurringMetrics.commissionableMonthly * 0.40 - recurringMetrics.monthlyCommission) * 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </strong>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: RESELLER WHOLESALE MARGIN CALCULATOR (SECTION 18) */}
      {/* ========================================================================= */}
      {mode === 'reseller' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900/90 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Reseller Margin Parameters (Section 18)
                  </h3>
                </div>
                <button
                  onClick={() => onNavigateToSection(18)}
                  className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  View Schedule Section 18
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Approved Resellers purchase NextSoftHR software licenses at a designated wholesale price and resell to customers at official list or authorized discounted pricing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Official Customer List Price ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 dark:text-slate-400 text-xs">$</span>
                    <input
                      type="number"
                      min="100"
                      step="50"
                      value={listPrice}
                      onChange={(e) => setListPrice(Math.max(1, Number(e.target.value)))}
                      className="w-full pl-7 pr-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">MSRP / Official catalog rate</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Reseller Wholesale Discount %
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <input
                      type="number"
                      min="5"
                      max="60"
                      value={resellerDiscountPct}
                      onChange={(e) => setResellerDiscountPct(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">Wholesale purchase margin</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Authorized Customer Discount % (Max authorized)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <input
                      type="number"
                      min="0"
                      max={resellerDiscountPct - 5}
                      value={customerDiscountPct}
                      onChange={(e) => setCustomerDiscountPct(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">Concession granted to client</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Volume of Reseller Packages / Deals
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={resellerUnits}
                    onChange={(e) => setResellerUnits(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500">Deployments sold</span>
                </div>
              </div>
            </div>

            {/* Compliance reminder (Section 18) */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-amber-500/30 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-amber-700 dark:text-amber-300">Section 18 Pricing Compliance Requirement:</strong>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Resellers must not represent unauthorized prices as official NextSoftHR pricing. Customer discounts must remain within the agreed Maximum Authorized Customer Discount specified in the Reseller Schedule.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <h3 className="text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">
                Reseller Commercial Economics
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 text-left">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Reseller Cost (Each)</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white font-mono">
                    ${resellerMetrics.wholesalePrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Wholesale Buy</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 text-left">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">End-User Price (Each)</span>
                  <span className="text-base font-bold text-cyan-700 dark:text-cyan-300 font-mono">
                    ${resellerMetrics.endUserPrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Retail Invoiced</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/40">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 block">Unit Margin Profit</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                      ${resellerMetrics.unitMargin.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Effective Margin</span>
                    <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      {resellerMetrics.marginPct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs pt-2">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Total Wholesale Spend ({resellerUnits} units):</span>
                  <span className="font-mono text-slate-500 dark:text-slate-400">${resellerMetrics.totalWholesaleSpend.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Total End-Customer Invoicing:</span>
                  <span className="font-mono text-slate-900 dark:text-white">${resellerMetrics.totalCustomerRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-cyan-600 dark:text-cyan-400 font-bold pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Net Reseller Margin Profit:</span>
                  <span className="font-mono text-base text-emerald-600 dark:text-emerald-400">
                    ${resellerMetrics.totalResellerProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: DISTRIBUTOR NETWORK & SUB-RESELLER OVERRIDES (SECTION 19, 20, 55) */}
      {/* ========================================================================= */}
      {mode === 'distributor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900/90 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Distributor Network & Override Configuration (Section 19, 20 & 55)
                  </h3>
                </div>
                <button
                  onClick={() => onNavigateToSection(20)}
                  className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  View Schedule Section 20
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Authorized Distributors recruit and manage a network of sub-resellers and earn a <strong>distributor override</strong> on all sub-reseller volume in addition to direct customer sales.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs font-mono text-cyan-700 dark:text-cyan-300">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] mb-1 font-sans">Section 20 Distribution Cascade:</span>
                Customer Revenue ↓ Sub-Reseller Commission ({subResellerRate}%) ↓ Distributor Override ({distributorOverrideRate}%) ↓ NextSoftHR Revenue
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Sub-Reseller Managed Revenue ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 dark:text-slate-400 text-xs">$</span>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={networkVolume}
                      onChange={(e) => setNetworkVolume(Math.max(0, Number(e.target.value)))}
                      className="w-full pl-7 pr-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">Gross revenue through sub-resellers</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Distributor Override Rate % (Sec 20 & 55)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <input
                      type="number"
                      min="1"
                      max="15"
                      value={distributorOverrideRate}
                      onChange={(e) => setDistributorOverrideRate(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">Standard example: 5% (Sec 55)</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Sub-Reseller Compensation % (Sec 55)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <input
                      type="number"
                      min="10"
                      max="35"
                      value={subResellerRate}
                      onChange={(e) => setSubResellerRate(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">Sub-reseller baseline rate</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Direct Distributor Sales Volume ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 dark:text-slate-400 text-xs">$</span>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      value={directSalesVolume}
                      onChange={(e) => setDirectSalesVolume(Math.max(0, Number(e.target.value)))}
                      className="w-full pl-7 pr-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">Deals closed directly by Distributor</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <h3 className="text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">
                Total Distributor Earnings Summary
              </h3>

              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-50 dark:from-cyan-950/60 to-blue-50 dark:to-blue-950/40 border border-cyan-500/40">
                <span className="text-xs text-cyan-700 dark:text-cyan-300 font-semibold block">Combined Distributor Revenue</span>
                <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                  ${distributorMetrics.totalDistributorIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Override earnings plus direct customer sales commission.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 block">Sub-Reseller Override ({distributorOverrideRate}%):</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">On ${networkVolume.toLocaleString()} sub-reseller volume</span>
                  </div>
                  <span className="text-sm font-bold text-cyan-700 dark:text-cyan-300 font-mono">
                    +${distributorMetrics.overrideEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 block">Direct Sales Commission ({directCommissionRate}%):</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">On ${directSalesVolume.toLocaleString()} direct volume</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    +${distributorMetrics.directEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex justify-between items-center text-slate-500 dark:text-slate-400">
                  <div>
                    <span className="block text-slate-600 dark:text-slate-300">Paid to Sub-Resellers ({subResellerRate}%):</span>
                    <span className="text-[10px] text-slate-500 font-mono">Retained by sub-reseller partners</span>
                  </div>
                  <span className="font-mono text-slate-600 dark:text-slate-300">
                    ${distributorMetrics.subResellerEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
