import React, { useState } from 'react';
import { 
  BarChart3, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Info,
  DollarSign,
  Coins
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

interface RoiCalculatorProps {
  onOpenLeadModal: (service?: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenLeadModal }) => {
  const { formatCurrency, currency } = useCurrency();
  const [employees, setEmployees] = useState(120);
  const [hrStaff, setHrStaff] = useState(2);
  const [branches, setBranches] = useState(3);
  const [frequency, setFrequency] = useState('Monthly');
  const [adminHours, setAdminHours] = useState(55);
  const [payrollHours, setPayrollHours] = useState(35);

  // Calculations
  const totalCurrentMonthlyHours = adminHours + payrollHours;
  const estimatedHoursRedirected = Math.round(totalCurrentMonthlyHours * 0.72);
  const estimatedEfficiencyGain = 75; // percentage
  const annualizedHoursSaved = estimatedHoursRedirected * 12;

  // Estimated economic value: average regional blended HR specialist hourly rate ~₦4,800/hr
  const baseBlendedHourlyRateNGN = 4800;
  const estimatedMonthlyFinancialSavingsNGN = estimatedHoursRedirected * baseBlendedHourlyRateNGN;
  const estimatedAnnualFinancialSavingsNGN = annualizedHoursSaved * baseBlendedHourlyRateNGN;

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Workforce Efficiency Analytics</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Outsourcing ROI Calculator”
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Discover how many administrative hours your leadership and HR teams can reclaim by outsourcing routine payroll, leave, and compliance operations to NextSofthr.
          </p>
        </div>
      </section>

      {/* Interactive Calculator Workbench */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-colors">
          {/* Inputs Column */}
          <div className="p-6 sm:p-8 lg:col-span-7 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-blue-900/40">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">1. Your Organization Profile</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Adjust the inputs below to reflect your current workforce operations.</p>
            </div>

            {/* Slider 1: Employees */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                <span>Number of Employees:</span>
                <span className="font-mono text-blue-700 dark:text-lime-400 font-extrabold text-sm">{employees} Staff</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-blue-950 rounded-lg appearance-none cursor-pointer accent-[#0F2D6B] dark:accent-lime-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                <span>10</span>
                <span>250</span>
                <span>500</span>
                <span>1,000+</span>
              </div>
            </div>

            {/* Row: HR Staff & Branches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Internal HR Staff Count:</label>
                <input
                  type="number"
                  min="0"
                  max="25"
                  value={hrStaff}
                  onChange={e => setHrStaff(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-blue-900/60 bg-white dark:bg-[#06112C] text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 dark:focus:ring-lime-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Number of Operating Branches:</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={branches}
                  onChange={e => setBranches(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-blue-900/60 bg-white dark:bg-[#06112C] text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 dark:focus:ring-lime-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Payroll Frequency */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Payroll Cycle Frequency:</label>
              <div className="grid grid-cols-3 gap-2">
                {['Monthly', 'Bi-Weekly', 'Weekly'].map(f => (
                  <button
                    type="button"
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      frequency === f 
                        ? 'bg-[#0F2D6B] dark:bg-lime-400 text-white dark:text-slate-950 border-[#0F2D6B] dark:border-lime-400 font-bold' 
                        : 'bg-slate-50 dark:bg-[#071433] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-blue-900/50 hover:bg-slate-100 dark:hover:bg-blue-900/40'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 2: Monthly Admin Hours */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-blue-900/40">
              <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                <span>Monthly HR Administration Hours (Filing, letters, leaves, disputes):</span>
                <span className="font-mono text-blue-700 dark:text-lime-400 font-extrabold text-sm">{adminHours} hrs/mo</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={adminHours}
                onChange={e => setAdminHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-blue-950 rounded-lg appearance-none cursor-pointer accent-[#0F2D6B] dark:accent-lime-400"
              />
            </div>

            {/* Slider 3: Payroll Hours */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                <span>Payroll Processing Hours (Reconciliations, bank schedules, tax filings):</span>
                <span className="font-mono text-blue-700 dark:text-lime-400 font-extrabold text-sm">{payrollHours} hrs/mo</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={payrollHours}
                onChange={e => setPayrollHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-blue-950 rounded-lg appearance-none cursor-pointer accent-[#0F2D6B] dark:accent-lime-400"
              />
            </div>
          </div>

          {/* Results Column */}
          <div className="p-6 sm:p-8 lg:col-span-5 bg-gradient-to-b from-slate-900 to-[#0A1E4A] text-white flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-lime-400">Projected Efficiency</span>
                <h3 className="text-xl font-bold text-white mt-1">Estimated Operational Savings</h3>
              </div>

              {/* Key Output 1: Redirected Hours */}
              <div className="p-4 bg-white/10 rounded-xl border border-white/10 space-y-1">
                <span className="text-xs text-slate-300 font-medium">Estimated Monthly Hours Redirected</span>
                <div className="text-3xl sm:text-4xl font-black text-lime-400 font-mono">
                  ~{estimatedHoursRedirected} hrs / month
                </div>
                <div className="text-[11px] text-slate-400">
                  Equivalent to <strong className="text-white font-mono">{annualizedHoursSaved.toLocaleString()} hours</strong> annually freed for strategic core business.
                </div>
              </div>

              {/* Output 2: Financial Value Reclaimed */}
              <div className="p-4 bg-white/10 rounded-xl border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">Estimated Financial Value Reclaimed</span>
                  <span className="text-[10px] font-mono font-bold bg-lime-400 text-slate-950 px-2 py-0.5 rounded">
                    {currency.code}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-lime-300 font-mono">
                  ~{formatCurrency(estimatedMonthlyFinancialSavingsNGN)} <span className="text-xs font-normal text-slate-300">/ mo</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Totaling approx. <strong className="text-white font-mono">{formatCurrency(estimatedAnnualFinancialSavingsNGN)}</strong> per year in recouped management & operational capacity.
                </div>
              </div>

              {/* Output 3: Process Efficiency */}
              <div className="p-4 bg-white/10 rounded-xl border border-white/10 space-y-1">
                <span className="text-xs text-slate-300 font-medium">Potential Process Efficiency</span>
                <div className="text-2xl font-bold text-emerald-400 font-mono">
                  ~{estimatedEfficiencyGain}% Faster Turnaround
                </div>
                <div className="text-[11px] text-slate-400">
                  Automated cloud employee self-service replaces manual paper forms and email chains.
                </div>
              </div>

              {/* Key Areas for Automation */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Top Automation Areas:</span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                    <span>Automated gross-to-net tax & pension formulas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                    <span>Instant digital payslip delivery via ESS portal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                    <span>Biometric gate attendance reconciliation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mandatory Illustrative Disclaimer */}
            <div className="pt-4 border-t border-white/15 space-y-3">
              <div className="flex items-start gap-2 text-[11px] text-slate-400 italic">
                <Info className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
                <span>“Illustrative estimate — actual results vary by organization.”</span>
              </div>

              <button
                onClick={() => onOpenLeadModal('ROI Consultation')}
                className="w-full py-3 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Request Formal Efficiency Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
