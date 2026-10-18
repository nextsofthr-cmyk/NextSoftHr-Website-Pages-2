import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import {
  Calculator,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  BarChart3,
  RefreshCw,
  MessageCircle,
} from 'lucide-react';

interface HRSavingsCalculatorProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

export const HRSavingsCalculator: React.FC<HRSavingsCalculatorProps> = ({
  onOpenDemo,
  onOpenGetStarted,
}) => {
  // Input states
  const [headcount, setHeadcount] = useState<number>(85);
  const [weeklyAdminHours, setWeeklyAdminHours] = useState<number>(24);
  const [hourlyRate, setHourlyRate] = useState<number>(18);
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [activeChartView, setActiveChartView] = useState<'workflows' | 'timeline'>('workflows');

  const currencyMultiplier = currency === 'NGN' ? 1450 : 1;
  const currencySymbol = currency === 'NGN' ? '₦' : '$';

  // Quick preset buttons for headcount
  const presets = [
    { label: '25 (Seed/Micro)', value: 25 },
    { label: '85 (Growing SME)', value: 85 },
    { label: '250 (Mid-Market)', value: 250 },
    { label: '650 (Enterprise)', value: 650 },
  ];

  // Calculations
  const calculations = useMemo(() => {
    // Monthly hours spent manually
    const monthlyManualHours = Math.round(weeklyAdminHours * 4.33);
    
    // Manual labor cost per month
    const manualLaborCost = monthlyManualHours * hourlyRate;
    
    // Estimated error, payroll correction and manual paper waste cost (~$2.20 per employee/month)
    const errorRiskCost = Math.round(headcount * 2.2);
    
    // Total monthly legacy cost
    const totalLegacyCost = manualLaborCost + errorRiskCost;
    
    // With NextSofthr: 78% administrative time reduction
    const nextSoftMonthlyHours = Math.max(2, Math.round(monthlyManualHours * 0.22));
    const hoursSavedMonthly = monthlyManualHours - nextSoftMonthlyHours;
    
    // Estimated platform software fee ($2.40/employee/month tiered)
    const tierMultiplier = headcount > 300 ? 1.8 : headcount > 100 ? 2.1 : 2.5;
    const softwareSubscription = Math.round(headcount * tierMultiplier);
    
    // New monthly operating cost with NextSofthr
    const nextSoftLaborCost = nextSoftMonthlyHours * hourlyRate;
    const totalNextSoftCost = nextSoftLaborCost + softwareSubscription;
    
    // Net Monthly Savings
    const netMonthlySavings = Math.max(0, totalLegacyCost - totalNextSoftCost);
    const netAnnualSavings = netMonthlySavings * 12;
    
    // ROI percentage
    const roiPercentage = softwareSubscription > 0 
      ? Math.round((netMonthlySavings / softwareSubscription) * 100) 
      : 0;

    return {
      monthlyManualHours,
      nextSoftMonthlyHours,
      hoursSavedMonthly,
      totalLegacyCost,
      totalNextSoftCost,
      softwareSubscription,
      netMonthlySavings,
      netAnnualSavings,
      roiPercentage,
    };
  }, [headcount, weeklyAdminHours, hourlyRate]);

  // Breakdown across 4 primary HR workflows
  const workflowData = useMemo(() => {
    const legacy = calculations.totalLegacyCost;
    const automated = calculations.totalNextSoftCost;

    return [
      {
        workflow: 'Payroll & Tax Filing',
        legacyCost: Math.round(legacy * 0.40 * currencyMultiplier),
        nextSoftCost: Math.round(automated * 0.25 * currencyMultiplier),
        hoursReduction: '85% faster',
      },
      {
        workflow: 'Attendance & Biometrics',
        legacyCost: Math.round(legacy * 0.25 * currencyMultiplier),
        nextSoftCost: Math.round(automated * 0.20 * currencyMultiplier),
        hoursReduction: '80% faster',
      },
      {
        workflow: 'Leave & Expense Approvals',
        legacyCost: Math.round(legacy * 0.20 * currencyMultiplier),
        nextSoftCost: Math.round(automated * 0.25 * currencyMultiplier),
        hoursReduction: '75% faster',
      },
      {
        workflow: 'Onboarding & Record Audits',
        legacyCost: Math.round(legacy * 0.15 * currencyMultiplier),
        nextSoftCost: Math.round(automated * 0.30 * currencyMultiplier),
        hoursReduction: '70% faster',
      },
    ];
  }, [calculations, currencyMultiplier]);

  // 6-Month cumulative savings projection
  const timelineData = useMemo(() => {
    const monthlyNet = calculations.netMonthlySavings * currencyMultiplier;
    return [
      { month: 'Month 1', cumulativeSavings: Math.round(monthlyNet * 0.6), hoursReclaimed: Math.round(calculations.hoursSavedMonthly * 0.6) },
      { month: 'Month 2', cumulativeSavings: Math.round(monthlyNet * 1.8), hoursReclaimed: Math.round(calculations.hoursSavedMonthly * 1.8) },
      { month: 'Month 3', cumulativeSavings: Math.round(monthlyNet * 3.0), hoursReclaimed: Math.round(calculations.hoursSavedMonthly * 3.0) },
      { month: 'Month 4', cumulativeSavings: Math.round(monthlyNet * 4.1), hoursReclaimed: Math.round(calculations.hoursSavedMonthly * 4.1) },
      { month: 'Month 5', cumulativeSavings: Math.round(monthlyNet * 5.2), hoursReclaimed: Math.round(calculations.hoursSavedMonthly * 5.2) },
      { month: 'Month 6', cumulativeSavings: Math.round(monthlyNet * 6.3), hoursReclaimed: Math.round(calculations.hoursSavedMonthly * 6.3) },
    ];
  }, [calculations, currencyMultiplier]);

  // Format monetary figures
  const formatMoney = (amount: number) => {
    return `${currencySymbol}${Math.round(amount).toLocaleString()}`;
  };

  const handleWhatsAppQuote = () => {
    const text = `Hello NextSofthr Sales Team! We just used your HR Savings Calculator for our organization of ${headcount} employees. Our projected monthly savings is approx ${formatMoney(calculations.netMonthlySavings * currencyMultiplier)}. We would like to discuss deploying NextSofthr.`;
    window.open(`https://wa.me/2349158482622?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="calculator" className="py-20 bg-slate-50 dark:bg-[#06152B] transition-colors border-b border-slate-200 dark:border-blue-900/60 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-b from-blue-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-xs font-bold text-[#0256C4] dark:text-[#84CC16] mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Financial Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
            Calculate Your Organization&apos;s <span className="text-[#0256C4] dark:text-[#84CC16]">HR &amp; Payroll ROI</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Adjust the sliders to match your current employee count and weekly HR operational time. See immediate projections of reclaimed work-hours, eliminated payroll error leakage, and bottom-line monthly savings.
          </p>
        </div>

        {/* Main Calculator Layout: 2-Column Responsive Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Sliders & Parameter Controls (5 Cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0A2540] rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-blue-900/80 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-blue-900/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#0256C4] dark:text-[#84CC16] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A2540] dark:text-white">Your Workforce Parameters</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Live dynamic simulation</p>
                </div>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center bg-slate-100 dark:bg-[#07182E] p-1 rounded-xl border border-slate-200 dark:border-blue-900">
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    currency === 'USD'
                      ? 'bg-[#0256C4] text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('NGN')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    currency === 'NGN'
                      ? 'bg-[#0256C4] text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  NGN (₦)
                </button>
              </div>
            </div>

            {/* Slider 1: Headcount */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="headcount-slider" className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#0256C4] dark:text-[#84CC16]" />
                  <span>Total Employee Headcount</span>
                </label>
                <span className="text-base font-extrabold text-[#0256C4] dark:text-[#84CC16] bg-blue-50 dark:bg-blue-950/70 px-3 py-1 rounded-xl border border-blue-100 dark:border-blue-900/60">
                  {headcount.toLocaleString()} Staff
                </span>
              </div>

              <input
                id="headcount-slider"
                type="range"
                min="10"
                max="1000"
                step="5"
                value={headcount}
                onChange={(e) => setHeadcount(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0256C4] dark:accent-[#84CC16]"
              />

              {/* Headcount Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                {presets.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setHeadcount(p.value)}
                    className={`text-[11px] py-1 px-2 rounded-lg font-medium border text-center transition-all cursor-pointer truncate ${
                      headcount === p.value
                        ? 'bg-[#0256C4] text-white border-[#0256C4]'
                        : 'bg-slate-50 dark:bg-[#07182E] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-blue-900/60 hover:border-blue-300'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 2: Weekly HR Admin Hours */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label htmlFor="admin-hours-slider" className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#0256C4] dark:text-[#84CC16]" />
                  <span>Weekly HR Admin Time</span>
                </label>
                <span className="text-base font-extrabold text-[#0A2540] dark:text-white bg-slate-100 dark:bg-[#07182E] px-3 py-1 rounded-xl border border-slate-200 dark:border-blue-900/60">
                  {weeklyAdminHours} hrs/week
                </span>
              </div>

              <input
                id="admin-hours-slider"
                type="range"
                min="5"
                max="60"
                step="1"
                value={weeklyAdminHours}
                onChange={(e) => setWeeklyAdminHours(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0256C4] dark:accent-[#84CC16]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span>5 hrs (Minimal)</span>
                <span>25 hrs (Typical SME)</span>
                <span>60 hrs (Multi-branch)</span>
              </div>
            </div>

            {/* Slider 3: Average HR / Finance Hourly Cost */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label htmlFor="hourly-rate-slider" className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#0256C4] dark:text-[#84CC16]" />
                  <span>Avg. HR/Finance Hourly Wage</span>
                </label>
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  {currency === 'NGN' ? `₦${(hourlyRate * currencyMultiplier).toLocaleString()}` : `$${hourlyRate}`}/hr
                </span>
              </div>

              <input
                id="hourly-rate-slider"
                type="range"
                min="8"
                max="50"
                step="1"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span>$8/hr (Entry Level)</span>
                <span>$18/hr (Avg Professional)</span>
                <span>$50/hr (Senior Controller)</span>
              </div>
            </div>

            {/* Micro summary callout */}
            <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/60 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
              <div className="font-bold text-[#0A2540] dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#84CC16]" />
                Automated Calculations Include:
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                78% time reduction via auto-computed PAYE/Pensions, biometric attendance syncing, mobile employee self-service, and zero paper payslip overhead.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Recharts Visualization & ROI Highlights (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top KPI Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {/* Monthly Savings Card */}
              <div className="bg-white dark:bg-[#0A2540] p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-blue-900/80 shadow-md">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Monthly Savings
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-[#84CC16] truncate">
                  {formatMoney(calculations.netMonthlySavings * currencyMultiplier)}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  / month operational net
                </div>
              </div>

              {/* Annual Net Card */}
              <div className="bg-white dark:bg-[#0A2540] p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-blue-900/80 shadow-md">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Annual Impact
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#0256C4] dark:text-blue-300 truncate">
                  {formatMoney(calculations.netAnnualSavings * currencyMultiplier)}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  projected 1-yr ROI
                </div>
              </div>

              {/* Hours Saved Card */}
              <div className="col-span-2 sm:col-span-1 bg-white dark:bg-[#0A2540] p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-blue-900/80 shadow-md">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Reclaimed Time
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-500 dark:text-amber-400">
                  {calculations.hoursSavedMonthly} hrs
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  freed for strategic HR
                </div>
              </div>
            </div>

            {/* Chart Card */}
            <div className="bg-white dark:bg-[#0A2540] rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-blue-900/80 shadow-xl space-y-4">
              {/* Chart Header & Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-blue-900/60">
                <div>
                  <h4 className="text-base font-extrabold text-[#0A2540] dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#0256C4] dark:text-[#84CC16]" />
                    <span>Cost &amp; Efficiency Breakdown</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Comparing unoptimized manual workflows vs NextSofthr automation
                  </p>
                </div>

                {/* View Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#07182E] p-1 rounded-xl self-start sm:self-auto border border-slate-200 dark:border-blue-900">
                  <button
                    type="button"
                    onClick={() => setActiveChartView('workflows')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeChartView === 'workflows'
                        ? 'bg-white dark:bg-[#0256C4] text-[#0A2540] dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Workflow Cost
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveChartView('timeline')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeChartView === 'timeline'
                        ? 'bg-white dark:bg-[#0256C4] text-[#0A2540] dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    6-Mo Savings
                  </button>
                </div>
              </div>

              {/* Chart Container */}
              <div className="w-full h-[280px] sm:h-[310px] pt-2">
                {activeChartView === 'workflows' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={workflowData}
                      margin={{ top: 15, right: 10, left: 0, bottom: 25 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />
                      <XAxis
                        dataKey="workflow"
                        tick={{ fontSize: 11, fill: 'currentColor' }}
                        className="text-slate-600 dark:text-slate-300"
                        interval={0}
                        angle={-10}
                        textAnchor="end"
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: 'currentColor' }}
                        className="text-slate-600 dark:text-slate-300"
                        tickFormatter={(val) => `${currencySymbol}${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (!active || !payload || !payload.length) return null;
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#0A2540] text-white p-3.5 rounded-2xl shadow-xl border border-blue-800 text-xs space-y-1.5">
                              <div className="font-extrabold text-[#84CC16]">{label}</div>
                              <div className="flex items-center justify-between gap-4 text-slate-300">
                                <span className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-slate-400" /> Manual Cost:
                                </span>
                                <span className="font-bold text-white">{currencySymbol}{data.legacyCost.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between gap-4 text-emerald-300">
                                <span className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-[#84CC16]" /> With NextSofthr:
                                </span>
                                <span className="font-extrabold text-[#84CC16]">{currencySymbol}{data.nextSoftCost.toLocaleString()}</span>
                              </div>
                              <div className="pt-1 border-t border-blue-900 text-[11px] text-blue-200">
                                Operational Speed: <span className="font-bold text-white">{data.hoursReduction}</span>
                              </div>
                            </div>
                          );
                        }}
                      />
                      <Legend
                        verticalAlign="top"
                        align="right"
                        wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
                      />
                      <Bar name="Manual Legacy Cost" dataKey="legacyCost" fill="#94A3B8" radius={[6, 6, 0, 0]} />
                      <Bar name="With NextSofthr" dataKey="nextSoftCost" fill="#84CC16" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={timelineData}
                      margin={{ top: 15, right: 15, left: 0, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#84CC16" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#84CC16" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'currentColor' }} className="text-slate-600 dark:text-slate-300" />
                      <YAxis
                        tick={{ fontSize: 11, fill: 'currentColor' }}
                        className="text-slate-600 dark:text-slate-300"
                        tickFormatter={(val) => `${currencySymbol}${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (!active || !payload || !payload.length) return null;
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#0A2540] text-white p-3.5 rounded-2xl shadow-xl border border-emerald-500/40 text-xs space-y-1.5">
                              <div className="font-extrabold text-[#84CC16]">{label} Milestone</div>
                              <div className="text-sm font-black text-white">
                                Cumulative Saved: {currencySymbol}{data.cumulativeSavings.toLocaleString()}
                              </div>
                              <div className="text-[11px] text-blue-200">
                                Total Hours Reclaimed: <span className="font-bold text-white">{data.hoursReclaimed} hrs</span>
                              </div>
                            </div>
                          );
                        }}
                      />
                      <Area
                        name="Cumulative Net Savings"
                        type="monotone"
                        dataKey="cumulativeSavings"
                        stroke="#84CC16"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#savingsGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Action Buttons & WhatsApp Link */}
              <div className="pt-4 border-t border-slate-100 dark:border-blue-900/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onOpenDemo}
                    className="px-5 py-2.5 rounded-xl bg-[#0256C4] hover:bg-[#024aa8] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Demo with this ROI</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={onOpenGetStarted}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                  >
                    Start Free Trial
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsAppQuote}
                  className="px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Send Quote to Sales via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
