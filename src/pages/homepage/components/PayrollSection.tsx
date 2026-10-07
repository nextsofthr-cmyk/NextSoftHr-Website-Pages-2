import { useState } from 'react';
import { 
  CreditCard, ShieldCheck, DollarSign, ArrowRight, FileText, 
  CheckCircle2, Globe, Building2, Sparkles, Sliders
} from 'lucide-react';
import { PAYROLL_STEPS } from '../data/mockData';
import { PayrollCurrencyConverter } from './PayrollCurrencyConverter';
import { useCurrency } from '../context/CurrencyContext';

interface PayrollSectionProps {
  onOpenDemo: () => void;
  onOpenPayslip: () => void;
}

export const PayrollSection = ({ onOpenDemo, onOpenPayslip }: PayrollSectionProps) => {
  const { formatMoney, currencyInfo } = useCurrency();
  const [baseSalary, setBaseSalary] = useState(6500);
  const [allowance, setAllowance] = useState(500);
  const [bonus, setBonus] = useState(400);

  // Calculations
  const gross = baseSalary + allowance + bonus;
  const tax = Math.round(gross * 0.18);
  const pension = Math.round(gross * 0.05);
  const deductions = tax + pension;
  const benefitsVal = 350; // health coverage etc
  const netPay = gross - deductions;

  return (
    <section id="payroll" className="py-24 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white relative overflow-hidden transition-colors">
      
      {/* Background accents */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <CreditCard className="w-3.5 h-3.5 text-lime-400" />
            Global Payroll Architecture
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Payroll Without the Complexity.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            Automate payroll processing, reduce errors and give your employees a reliable, transparent payroll experience across multiple currencies and jurisdictions.
          </p>
        </div>

        {/* The Pipeline Architecture Visual: Gross → Deductions → Taxes → Benefits → Net Pay */}
        <div className="mb-16">
          <div className="text-center mb-6">
            <span className="text-xs font-mono font-bold text-lime-400 uppercase tracking-widest">
              Intelligent 5-Stage Payroll Pipeline
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {PAYROLL_STEPS.map((step, idx) => (
              <div 
                key={step.step}
                className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 hover:border-lime-400/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-lime-400">
                      STAGE {step.step}
                    </span>
                    {idx < 4 && (
                      <span className="hidden md:inline text-slate-500 group-hover:text-lime-400 transition-colors">→</span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Live Salary & Payslip Engine */}
        <div className="max-w-5xl mx-auto bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 backdrop-blur-md mb-16">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-700 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Interactive Payroll Simulator</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30">
                  Live Formula • {currencyInfo.code} ({currencyInfo.symbol})
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Adjust sliders to see instant statutory tax deductions, benefits, and net take-home calculation in {currencyInfo.name}.</p>
            </div>

            <button
              id="view-sample-payslip-btn"
              onClick={onOpenPayslip}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md shrink-0"
            >
              <FileText className="w-4 h-4 text-lime-400" />
              <span>View Full Sample Payslip ({currencyInfo.code})</span>
            </button>
          </div>

          {/* Calculator Sliders & Live Pipeline Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
            
            {/* Sliders on Left */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Base Monthly Salary</span>
                  <span className="text-lime-400 font-mono font-bold">{formatMoney(baseSalary)}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="15000"
                  step="250"
                  value={baseSalary}
                  onChange={(e) => setBaseSalary(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-lime-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Allowances & Travel Stipend</span>
                  <span className="text-lime-400 font-mono font-bold">{formatMoney(allowance)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={allowance}
                  onChange={(e) => setAllowance(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-lime-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Performance Bonus / Commission</span>
                  <span className="text-lime-400 font-mono font-bold">{formatMoney(bonus)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="100"
                  value={bonus}
                  onChange={(e) => setBonus(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-lime-400"
                />
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-blue-400" /> Multi-country statutory tax rules
                </span>
                <span className="text-lime-400 font-bold">14 Countries Supported</span>
              </div>
            </div>

            {/* Visual Calculated Flow on Right */}
            <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 text-slate-300">
                  <span>Gross Salary:</span>
                  <span className="font-mono font-bold text-white text-sm">{formatMoney(gross)}</span>
                </div>
                <div className="flex justify-between items-center py-1 text-rose-400">
                  <span>PAYE / Income Tax (Est. 18%):</span>
                  <span className="font-mono font-bold">-{formatMoney(tax)}</span>
                </div>
                <div className="flex justify-between items-center py-1 text-rose-400">
                  <span>Social Security & Pension (5%):</span>
                  <span className="font-mono font-bold">-{formatMoney(pension)}</span>
                </div>
                <div className="flex justify-between items-center py-1 text-blue-400">
                  <span>Company Health & Wellness (Employer Paid):</span>
                  <span className="font-mono font-bold">+{formatMoney(benefitsVal)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Calculated Net Pay
                  </span>
                  <div className="text-3xl font-extrabold text-lime-400 font-mono mt-0.5">
                    {formatMoney(netPay)}
                  </div>
                </div>

                <button
                  onClick={onOpenDemo}
                  className="px-4 py-2.5 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-lg"
                >
                  Schedule Payroll Run
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Cross-Border Multi-Currency Payroll Converter Widget */}
        <PayrollCurrencyConverter onOpenDemo={onOpenDemo} />

        {/* Global Multi-Currency Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80">
            <span className="font-bold text-white block">Multi-Currency Bank Rails</span>
            <span className="text-slate-400 text-[11px] mt-0.5 block">USD, EUR, GBP, NGN, KES, ZAR, GHS, RWF, CAD</span>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80">
            <span className="font-bold text-white block">Automated Payslip Vault</span>
            <span className="text-slate-400 text-[11px] mt-0.5 block">256-bit encrypted employee downloads</span>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80">
            <span className="font-bold text-white block">Zero Tax Discrepancies</span>
            <span className="text-slate-400 text-[11px] mt-0.5 block">Pre-run audit checks & anomaly guards</span>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80">
            <span className="font-bold text-white block">Flexible Pay Schedules</span>
            <span className="text-slate-400 text-[11px] mt-0.5 block">Monthly, semi-monthly, bi-weekly or weekly</span>
          </div>
        </div>

      </div>
    </section>
  );
};
