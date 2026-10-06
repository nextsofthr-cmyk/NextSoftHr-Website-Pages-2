import { useState, useMemo } from 'react';
import { 
  Calculator, TrendingUp, Clock, DollarSign, Users, 
  ArrowRight, Sparkles, CheckCircle2, RefreshCcw, ShieldCheck, 
  ChevronRight, Sliders, Zap, Check, Copy, Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency, MajorCurrency, MAJOR_CURRENCIES } from '../context/CurrencyContext';

interface HrSavingsCalculatorProps {
  onOpenGetStarted: () => void;
  onOpenDemo: () => void;
}

export const HrSavingsCalculator = ({
  onOpenGetStarted,
  onOpenDemo,
}: HrSavingsCalculatorProps) => {
  const { dict } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  // Input Mode: simple aggregate vs granular tasks
  const [inputMode, setInputMode] = useState<'aggregate' | 'granular'>('aggregate');
  const [resultsTab, setResultsTab] = useState<'financial' | 'productivity'>('financial');
  const [copied, setCopied] = useState(false);

  // Inputs
  const [headcount, setHeadcount] = useState<number>(45);
  const [hourlyWage, setHourlyWage] = useState<number>(35);
  const [hoursPerEmployeeMonth, setHoursPerEmployeeMonth] = useState<number>(3.5);
  const [automationRate, setAutomationRate] = useState<number>(75); // percent

  // Granular task hours (hours spent per month total for company)
  const [payrollHoursMo, setPayrollHoursMo] = useState<number>(24);
  const [attendanceHoursMo, setAttendanceHoursMo] = useState<number>(20);
  const [onboardingHoursMo, setOnboardingHoursMo] = useState<number>(18);
  const [inquiriesHoursMo, setInquiriesHoursMo] = useState<number>(16);

  const curr = {
    symbol: MAJOR_CURRENCIES[currency]?.symbol || '$',
    code: currency,
    rate: MAJOR_CURRENCIES[currency]?.ratePerUSD || 1.0
  };

  // Calculation Engine
  const metrics = useMemo(() => {
    let totalMonthlyAdminHours = 0;

    if (inputMode === 'granular') {
      totalMonthlyAdminHours = payrollHoursMo + attendanceHoursMo + onboardingHoursMo + inquiriesHoursMo;
    } else {
      totalMonthlyAdminHours = headcount * hoursPerEmployeeMonth;
    }

    const totalCurrentAnnualHours = totalMonthlyAdminHours * 12;
    
    // Total hours saved through NextSofthr automation
    const annualHoursSaved = Math.round(totalCurrentAnnualHours * (automationRate / 100));
    const monthlyHoursSaved = Math.round(annualHoursSaved / 12);
    
    // Labor cost savings
    const grossAnnualSavings = Math.round(annualHoursSaved * hourlyWage * curr.rate);
    const grossMonthlySavings = Math.round(grossAnnualSavings / 12);

    // Estimated software cost (Growth tier at ~$6/user/mo equivalent in chosen currency)
    const monthlyCostPerUser = 6 * curr.rate;
    const annualSoftwareCost = Math.round(headcount * monthlyCostPerUser * 12);

    // Net financial return
    const netAnnualSavings = Math.max(0, grossAnnualSavings - annualSoftwareCost);
    const roiPercentage = annualSoftwareCost > 0 
      ? Math.round((netAnnualSavings / annualSoftwareCost) * 100) 
      : 0;

    // Productivity metrics
    const workdaysSavedPerYear = Math.round(annualHoursSaved / 8);
    const fullTimeFteEquivalent = (annualHoursSaved / 1920).toFixed(1);

    // Breakdown categories
    const breakdown = [
      {
        area: 'Payroll & Tax Reconciliation',
        pct: 35,
        hours: Math.round(annualHoursSaved * 0.35),
        amount: Math.round(grossAnnualSavings * 0.35),
        desc: 'Automated gross-to-net calculations, tax lodgments, and error remediation'
      },
      {
        area: 'Time, Shifts & Leave Approvals',
        pct: 25,
        hours: Math.round(annualHoursSaved * 0.25),
        amount: Math.round(grossAnnualSavings * 0.25),
        desc: 'Geofenced mobile clock-ins, shift swap automation, and self-service balance deduction'
      },
      {
        area: 'Digital Onboarding & Paperwork',
        pct: 20,
        hours: Math.round(annualHoursSaved * 0.20),
        amount: Math.round(grossAnnualSavings * 0.20),
        desc: 'Contract e-signing, automated equipment dispatch, and digital document vaulting'
      },
      {
        area: 'Repetitive Employee Inquiries (AI Bot)',
        pct: 20,
        hours: Math.round(annualHoursSaved * 0.20),
        amount: Math.round(grossAnnualSavings * 0.20),
        desc: 'Instant answers to policy questions, payslip queries, and benefit explanations'
      }
    ];

    return {
      totalMonthlyAdminHours,
      totalCurrentAnnualHours,
      annualHoursSaved,
      monthlyHoursSaved,
      workdaysSavedPerYear,
      fullTimeFteEquivalent,
      grossAnnualSavings,
      grossMonthlySavings,
      annualSoftwareCost,
      netAnnualSavings,
      roiPercentage,
      breakdown
    };
  }, [inputMode, headcount, hoursPerEmployeeMonth, payrollHoursMo, attendanceHoursMo, onboardingHoursMo, inquiriesHoursMo, automationRate, hourlyWage, curr]);

  const presetHeadcounts = [15, 35, 75, 150, 300];

  const handleCopySummary = () => {
    const summaryText = `NextSofthr ROI & Savings Benchmark
• Organization Headcount: ${headcount} employees
• Manual Time Spent: ${inputMode === 'granular' ? metrics.totalMonthlyAdminHours + ' hrs/mo (company-wide)' : hoursPerEmployeeMonth + ' hrs/employee/mo'}
• Annual Hours Saved: ${metrics.annualHoursSaved.toLocaleString()} hrs (${metrics.workdaysSavedPerYear} full 8-hr workdays)
• Equivalent FTE Reclaimed: ${metrics.fullTimeFteEquivalent} Full-Time Employee(s)
• Gross Annual Savings: ${curr.symbol}${metrics.grossAnnualSavings.toLocaleString()}
• Net Bottom-Line Savings: ${curr.symbol}${metrics.netAnnualSavings.toLocaleString()} / year
• Estimated ROI: ${metrics.roiPercentage}%
Calculated via NextSofthr.com`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="savings-calculator" className="mb-24 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-lime-100 dark:bg-lime-950/80 text-lime-900 dark:text-lime-300 border border-lime-300 dark:border-lime-800 uppercase tracking-wider mb-3">
          <Calculator className="w-3.5 h-3.5 text-lime-700 dark:text-lime-400" />
          {dict.calculator.badge}
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {dict.calculator.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
          {dict.calculator.subtitle}
        </p>
      </div>

      {/* Main Calculator Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden max-w-6xl mx-auto">
        
        {/* Top Control Bar: Currency, Mode & Quick Reset */}
        <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Live Workforce Impact Engine
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Input mode toggle */}
            <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setInputMode('aggregate')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                  inputMode === 'aggregate'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Quick Input</span>
              </button>
              <button
                onClick={() => setInputMode('granular')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                  inputMode === 'granular'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3 h-3" />
                <span>Detailed Task Breakdown</span>
              </button>
            </div>

            {/* Currency Selector */}
            <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-xs">
              {(['USD', 'NGN', 'KES', 'EUR', 'GBP'] as MajorCurrency[]).map((cKey) => (
                <button
                  key={cKey}
                  onClick={() => setCurrency(cKey)}
                  className={`px-2 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    currency === cKey
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cKey} ({MAJOR_CURRENCIES[cKey].symbol})
                </button>
              ))}
            </div>

            {/* Reset button */}
            <button
              onClick={() => {
                setHeadcount(45);
                setHourlyWage(35);
                setHoursPerEmployeeMonth(3.5);
                setAutomationRate(75);
                setPayrollHoursMo(24);
                setAttendanceHoursMo(20);
                setOnboardingHoursMo(18);
                setInquiriesHoursMo(16);
              }}
              title="Reset parameters to industry defaults"
              className="text-slate-400 hover:text-white p-1.5 rounded-md hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* 2-Column Body: Interactive Inputs (Left) & Real-time Results (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Inputs Column (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-extrabold flex items-center justify-center">
                  1
                </span>
                Your Headcount & Manual Admin Hours
              </h3>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
                {inputMode === 'aggregate' ? 'Aggregated Model' : 'Task Breakdown Model'}
              </span>
            </div>

            <div className="space-y-6">
              {/* Slider 1: Headcount */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="input-headcount" className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Total Employee Headcount
                  </label>
                  <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-extrabold text-blue-600 dark:text-blue-400 shadow-2xs min-w-[70px] text-right">
                    {headcount} staff
                  </span>
                </div>
                <input
                  id="input-headcount"
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={headcount}
                  onChange={(e) => setHeadcount(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  <span>5 employees</span>
                  <span>100</span>
                  <span>250</span>
                  <span>500+ employees</span>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-2 mt-2.5">
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Presets:</span>
                  {presetHeadcounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setHeadcount(preset)}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-all ${
                        headcount === preset
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 2: Average Hourly HR/Admin Cost */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="input-hourly-wage" className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                    HR / Operations Hourly Labor Cost
                  </label>
                  <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-extrabold text-slate-900 dark:text-white shadow-2xs min-w-[70px] text-right font-mono">
                    {curr.symbol}{Math.round(hourlyWage * curr.rate).toLocaleString()}/hr
                  </span>
                </div>
                <input
                  id="input-hourly-wage"
                  type="range"
                  min={15}
                  max={80}
                  step={1}
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium font-mono">
                  <span>{curr.symbol}{Math.round(15 * curr.rate).toLocaleString()}/hr (Admin)</span>
                  <span>{curr.symbol}{Math.round(35 * curr.rate).toLocaleString()}/hr (Generalist)</span>
                  <span>{curr.symbol}{Math.round(80 * curr.rate).toLocaleString()}/hr (Senior Ops)</span>
                </div>
              </div>

              {/* Input Mode 1: Aggregate Time */}
              {inputMode === 'aggregate' ? (
                <div className="bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="input-hours-per-emp" className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-500" />
                      Manual HR & Payroll Time per Employee
                    </label>
                    <span className="px-3 py-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-extrabold text-slate-900 dark:text-white min-w-[70px] text-right">
                      {hoursPerEmployeeMonth} hrs/mo
                    </span>
                  </div>
                  <input
                    id="input-hours-per-emp"
                    type="range"
                    min={1}
                    max={8}
                    step={0.5}
                    value={hoursPerEmployeeMonth}
                    onChange={(e) => setHoursPerEmployeeMonth(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    <span>1.0 hr (Streamlined)</span>
                    <span>3.5 hrs (Industry Average)</span>
                    <span>8.0 hrs (Spreadsheets)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 italic">
                    Includes time spent per team member on payroll calculation, attendance verification, leave approvals, and employee questions.
                  </p>
                </div>
              ) : (
                /* Input Mode 2: Detailed Task-by-Task Breakdown */
                <div className="bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-500" />
                      Estimated Monthly Hours Spent by Task
                    </span>
                    <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-md">
                      {payrollHoursMo + attendanceHoursMo + onboardingHoursMo + inquiriesHoursMo} total hrs / mo
                    </span>
                  </div>

                  {/* Task 1: Payroll Calculation */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">1. Monthly Payroll & Payslip Distribution</span>
                      <span className="font-bold text-slate-900 dark:text-white">{payrollHoursMo} hrs/mo</span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={60}
                      step={2}
                      value={payrollHoursMo}
                      onChange={(e) => setPayrollHoursMo(Number(e.target.value))}
                      className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Task 2: Attendance & Leave Reconciliation */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">2. Attendance, Shifts & Leave Balancing</span>
                      <span className="font-bold text-slate-900 dark:text-white">{attendanceHoursMo} hrs/mo</span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={60}
                      step={2}
                      value={attendanceHoursMo}
                      onChange={(e) => setAttendanceHoursMo(Number(e.target.value))}
                      className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Task 3: Onboarding & Documents */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">3. Onboarding Paperwork & Compliance Records</span>
                      <span className="font-bold text-slate-900 dark:text-white">{onboardingHoursMo} hrs/mo</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={40}
                      step={2}
                      value={onboardingHoursMo}
                      onChange={(e) => setOnboardingHoursMo(Number(e.target.value))}
                      className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Task 4: Inquiries & FAQ */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">4. Employee Inquiries, Policy Lookups & Emails</span>
                      <span className="font-bold text-slate-900 dark:text-white">{inquiriesHoursMo} hrs/mo</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={40}
                      step={2}
                      value={inquiriesHoursMo}
                      onChange={(e) => setInquiriesHoursMo(Number(e.target.value))}
                      className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Automation Efficiency Tier */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                    NextSofthr Automation Efficiency
                  </span>
                  <span className="text-xs font-extrabold text-lime-700 dark:text-lime-400">
                    {automationRate}% Process Reduction
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { rate: 50, label: 'Conservative', desc: 'Core payroll & leave auto' },
                    { rate: 75, label: 'Standard (Recommended)', desc: 'Full HR, shifts & self-service' },
                    { rate: 85, label: 'AI-First Maximized', desc: 'AI Assistant + ATS automated' }
                  ].map((tier) => (
                    <button
                      key={tier.rate}
                      type="button"
                      onClick={() => setAutomationRate(tier.rate)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        automationRate === tier.rate
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                          : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${automationRate === tier.rate ? 'text-blue-900 dark:text-blue-200' : 'text-slate-900 dark:text-white'}`}>
                          {tier.rate}%
                        </span>
                        {automationRate === tier.rate && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-0.5">{tier.label}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{tier.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Results Column (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-slate-900 text-white flex flex-col justify-between">
            <div>
              {/* Tab Selector: Financial Savings vs Productivity Gains */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-xs">
                  <button
                    onClick={() => setResultsTab('financial')}
                    className={`px-3 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                      resultsTab === 'financial'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Cost Savings</span>
                  </button>
                  <button
                    onClick={() => setResultsTab('productivity')}
                    className={`px-3 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                      resultsTab === 'productivity'
                        ? 'bg-lime-500 text-slate-950 shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Productivity Gains</span>
                  </button>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-lime-400/20 text-lime-300 border border-lime-400/30">
                  {metrics.roiPercentage}% ROI
                </span>
              </div>

              {resultsTab === 'financial' ? (
                /* Tab 1: Financial View */
                <div>
                  {/* Big Hero Stat: Net Annual Savings */}
                  <div className="py-6 border-b border-slate-800">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
                      Net Annual Bottom-Line Savings
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-display text-4xl sm:text-5xl font-black text-lime-400 tracking-tight">
                        {curr.symbol}{metrics.netAnnualSavings.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400">/ year</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-2">
                      Net savings after accounting for NextSofthr Growth plan licensing ({curr.symbol}{metrics.annualSoftwareCost.toLocaleString()}/yr).
                    </p>
                  </div>

                  {/* Supporting Stats */}
                  <div className="grid grid-cols-2 gap-4 py-5 border-b border-slate-800 text-left">
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>Annual Labor Saved</span>
                      </div>
                      <div className="text-xl font-extrabold text-white mt-1">
                        {metrics.annualHoursSaved.toLocaleString()} <span className="text-xs font-medium text-slate-400">hours</span>
                      </div>
                      <div className="text-[10px] text-lime-400 font-semibold mt-0.5">
                        ≈ {metrics.workdaysSavedPerYear} full workdays
                      </div>
                    </div>

                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <DollarSign className="w-3.5 h-3.5 text-lime-400" />
                        <span>Monthly Savings</span>
                      </div>
                      <div className="text-xl font-extrabold text-white mt-1">
                        {curr.symbol}{metrics.grossMonthlySavings.toLocaleString()} <span className="text-xs font-medium text-slate-400">/ mo</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                        Gross efficiency recovery
                      </div>
                    </div>
                  </div>

                  {/* Breakdown by HR function */}
                  <div className="py-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                      <span className="font-semibold text-slate-300">Savings Breakdown by Area</span>
                      <span>{metrics.annualHoursSaved} total hrs</span>
                    </div>
                    <div className="space-y-2.5">
                      {metrics.breakdown.map((item, idx) => (
                        <div key={idx} className="text-xs">
                          <div className="flex justify-between items-center text-[11px] mb-1">
                            <span className="text-slate-300 font-medium truncate max-w-[200px]">
                              {item.area}
                            </span>
                            <span className="text-lime-300 font-bold ml-2 shrink-0">
                              {curr.symbol}{item.amount.toLocaleString()} ({item.hours}h)
                            </span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-blue-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${item.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Tab 2: Productivity Gains View */
                <div>
                  <div className="py-6 border-b border-slate-800">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
                      Productivity Value Reclaimed
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-display text-4xl sm:text-5xl font-black text-lime-400 tracking-tight">
                        {metrics.workdaysSavedPerYear}
                      </span>
                      <span className="text-lg font-bold text-white">Full Workdays / Year</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-2">
                      Equivalent to reclaiming <strong className="text-lime-300">{metrics.fullTimeFteEquivalent} full-time employee(s)</strong> worth of high-value working capacity.
                    </p>
                  </div>

                  {/* Benchmark comparison tiles */}
                  <div className="space-y-3 py-5 border-b border-slate-800 text-xs">
                    <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase font-semibold">Payroll Cycle Execution Time</div>
                        <div className="text-slate-200 font-medium mt-0.5">From 3-4 manual days to 1-click audit</div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-lime-400">15 mins</span>
                        <div className="text-[10px] text-slate-400">96% faster</div>
                      </div>
                    </div>

                    <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase font-semibold">Payroll & Compliance Error Rate</div>
                        <div className="text-slate-200 font-medium mt-0.5">Spreadsheet typos & missing tax brackets</div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-lime-400">&lt; 0.05%</span>
                        <div className="text-[10px] text-slate-400">Statutory verified</div>
                      </div>
                    </div>

                    <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase font-semibold">New Hire Time-to-Productivity</div>
                        <div className="text-slate-200 font-medium mt-0.5">Pre-boarding, contract signing & asset dispatch</div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-lime-400">Day 1 Ready</span>
                        <div className="text-[10px] text-slate-400">100% digital</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs & Copy Summary Button */}
            <div className="pt-6 border-t border-slate-800 space-y-2.5">
              <button
                onClick={onOpenGetStarted}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Lock in These Savings — Start Free</span>
                <ArrowRight className="w-4 h-4 text-lime-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onOpenDemo}
                  className="py-2.5 px-3 rounded-xl font-semibold text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Book Walkthrough</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleCopySummary}
                  className="py-2.5 px-3 rounded-xl font-semibold text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 border border-slate-800"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-lime-400" />
                      <span className="text-lime-300 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Report</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Guarantee Bar */}
        <div className="bg-slate-100 dark:bg-slate-950 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
            <span>Calculation benchmark grounded in empirical PwC & SHRM human resources administrative studies.</span>
          </div>
          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
            Average customer achieves 100% investment payback in &lt; 35 days.
          </div>
        </div>

      </div>
    </div>
  );
};

