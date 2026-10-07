import { useState } from 'react';
import { 
  BarChart3, ShieldCheck, Lock, Key, FileSpreadsheet, 
  Layers, CheckCircle2, ArrowRight, RefreshCw, Cpu 
} from 'lucide-react';
import { SECURITY_HIGHLIGHTS, INTEGRATION_CATEGORIES } from '../data/mockData';
import { GlobalComplianceHeatmap } from './GlobalComplianceHeatmap';

interface AnalyticsSecurityProps {
  onOpenDemo: () => void;
}

export const AnalyticsSecurityIntegrations = ({ onOpenDemo }: AnalyticsSecurityProps) => {
  const [reportType, setReportType] = useState<'turnover' | 'payroll' | 'attendance'>('payroll');

  return (
    <section id="analytics" className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module 1: Workforce Analytics & Reporting */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-wider mb-3 inline-block">
              Intelligent Executive Analytics
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Make Decisions with Complete Workforce Clarity.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
              Transform raw HR timestamps and payroll disbursements into predictive executive dashboards, turnover anomaly warnings, and budget forecasts.
            </p>
          </div>

          {/* Interactive Analytics Dashboard View */}
          <div className="bg-slate-50 dark:bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReportType('payroll')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    reportType === 'payroll' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Payroll Cost Velocity
                </button>
                <button
                  onClick={() => setReportType('attendance')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    reportType === 'attendance' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Overtime & Absenteeism
                </button>
                <button
                  onClick={() => setReportType('turnover')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    reportType === 'turnover' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Retention & Attrition Index
                </button>
              </div>

              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                Data Refresh: Live (0.2s latency)
              </span>
            </div>

            {/* Visual Simulated Chart Bars */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-8 bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Monthly Departmental Spend ($k)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">+3.2% vs budget forecast</span>
                </div>

                {/* Bars */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                      <span>Engineering & AI Systems</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">$384k (45.5%)</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                      <span>Global Sales & Client Success</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">$215k (25.5%)</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                      <div className="bg-lime-500 h-full rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                      <span>Operations, Logistics & Facilities</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">$142k (16.8%)</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: '38%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                      <span>General & Administrative</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">$101k (12.2%)</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* KPI callout on right */}
              <div className="lg:col-span-4 space-y-3">
                <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                  <span className="text-xs text-slate-400 font-semibold uppercase block">Turnover Benchmark</span>
                  <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1">2.1%</div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">Industry median: 8.4%</span>
                </div>

                <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                  <span className="text-xs text-slate-400 font-semibold uppercase block">Overtime Spend Leakage</span>
                  <div className="text-2xl font-extrabold text-lime-700 dark:text-lime-400 font-mono mt-1">$0.00</div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">Zero unapproved shift hours</span>
                </div>

                <button
                  onClick={onOpenDemo}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                >
                  Generate Custom Executive Deck
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Module 2: Enterprise-Grade Security & Compliance */}
        <div id="security" className="mb-20 bg-slate-900 dark:bg-slate-900/90 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mb-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-lime-400/20 text-lime-300 border border-lime-400/30 uppercase tracking-wider mb-3 inline-block">
              Bank-Grade Confidentiality
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise-Grade Security for Your Most Sensitive Data.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Employee financial records and personal identity documents require military-grade protections. We adhere to the most stringent international compliance standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SECURITY_HIGHLIGHTS.map((sec, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 hover:border-lime-400/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-lime-400 text-slate-950 flex items-center justify-center font-bold text-xs mb-3">
                  ✓
                </div>
                <h4 className="font-bold text-base text-white mb-1.5">{sec.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2.5: Interactive D3 Global Compliance Heatmap */}
        <GlobalComplianceHeatmap onOpenDemo={onOpenDemo} />

        {/* Module 3: Integrations Ecosystem */}
        <div id="integrations">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 border border-lime-300 dark:border-lime-800 uppercase tracking-wider mb-3 inline-block">
              Ecosystem Connectivity
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Connects with the Tools Your Business Already Uses.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
              Effortlessly link NextSofthr with your existing accounting ledger, corporate chat, single sign-on provider, and bank accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTEGRATION_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
              >
                <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-2">
                  {cat.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {cat.apps.map((app) => (
                    <span
                      key={app}
                      className="px-3 py-1.5 bg-white dark:bg-slate-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
