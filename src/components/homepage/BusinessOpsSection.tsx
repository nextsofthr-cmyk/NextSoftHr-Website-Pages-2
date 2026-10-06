import { useState } from 'react';
import { 
  Briefcase, TrendingUp, DollarSign, CheckSquare, 
  ArrowRight, Users, CheckCircle2, BarChart2, FolderCheck 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface BusinessOpsProps {
  onOpenDemo: () => void;
}

export const BusinessOpsSection = ({ onOpenDemo }: BusinessOpsProps) => {
  const { formatMoney, currencyInfo } = useCurrency();
  const [activeTab, setActiveTab] = useState<'crm' | 'finance' | 'projects'>('finance');

  return (
    <section id="business-ops" className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 border border-lime-300 dark:border-lime-800 uppercase tracking-wider mb-3 inline-block">
            Connected Business Ecosystem
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Beyond HR: A Unified Business Engine.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
            Eliminate silos between HR, accounting, client relationships, and project delivery. NextSofthr synchronizes workforce hours and payroll directly with your balance sheet and CRM.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('finance')}
              className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'finance' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Connect People, Payroll & Finance</span>
            </button>

            <button
              onClick={() => setActiveTab('crm')}
              className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'crm' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Manage Relationships (CRM)</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'projects' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Projects & Workforce Capacity</span>
            </button>
          </div>
        </div>

        {/* Dynamic Showcase Panel */}
        <div className="max-w-5xl mx-auto bg-slate-50 dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg">
          
          {/* 1. Finance View */}
          {activeTab === 'finance' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Connect People, Payroll & Finance.
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
                    Direct automated journal entries syncing payroll expenses, statutory tax liabilities, and employee expense reimbursements with your general ledger.
                  </p>
                </div>
                <button
                  onClick={onOpenDemo}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
                >
                  Explore Ledger Sync
                </button>
              </div>

              {/* Finance Data Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
                  <span className="text-slate-400 dark:text-slate-400 font-semibold uppercase block mb-1">Monthly Payroll Expense</span>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">{formatMoney(842500)}</div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold block mt-1">✓ Reconciled with Barclays & Chase</span>
                </div>
                <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
                  <span className="text-slate-400 dark:text-slate-400 font-semibold uppercase block mb-1">Employee Expenses Pending</span>
                  <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">{formatMoney(14280)}</div>
                  <span className="text-slate-500 dark:text-slate-400 font-medium block mt-1">28 Receipts (Auto-scanned by OCR)</span>
                </div>
                <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
                  <span className="text-slate-400 dark:text-slate-400 font-semibold uppercase block mb-1">Budget Variance</span>
                  <div className="text-2xl font-extrabold text-lime-700 dark:text-lime-400 font-mono">-2.4% Under</div>
                  <span className="text-slate-500 dark:text-slate-400 font-medium block mt-1">Optimized by shift scheduling</span>
                </div>
              </div>

              {/* Ledger Preview */}
              <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-xs font-mono">
                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span>General Ledger Code</span>
                  <span>Debit / Credit</span>
                  <span>Status</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-600 dark:text-slate-400">
                  <div className="py-2.5 flex justify-between">
                    <span>GL-5100: Salaries & Wages</span>
                    <span className="text-slate-900 dark:text-white font-bold">{formatMoney(627220, { showDecimals: true })} DR</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-sans font-bold">Auto-Posted</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span>GL-2100: Payroll Taxes Withheld</span>
                    <span className="text-slate-900 dark:text-white font-bold">{formatMoney(182410, { showDecimals: true })} CR</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-sans font-bold">Auto-Posted</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. CRM View */}
          {activeTab === 'crm' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Manage Relationships Beyond Your Workforce.
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
                    Connect account executives, client communications, deals, and commission payouts in one place.
                  </p>
                </div>
                <button
                  onClick={onOpenDemo}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
                >
                  Explore CRM Pipeline
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                  <span className="text-slate-400 dark:text-slate-400 font-semibold block mb-1">Active Deal Pipeline</span>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">{formatMoney(2400000, { compact: true })} ARR</div>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold block mt-1">42 Enterprise Deals</span>
                </div>
                <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                  <span className="text-slate-400 dark:text-slate-400 font-semibold block mb-1">Commission Calculated</span>
                  <div className="text-2xl font-extrabold text-lime-700 dark:text-lime-400 font-mono">{formatMoney(48200)}</div>
                  <span className="text-slate-500 dark:text-slate-400 font-semibold block mt-1">Auto-routed to Sep Payroll</span>
                </div>
                <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                  <span className="text-slate-400 dark:text-slate-400 font-semibold block mb-1">Client Retention</span>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">99.2%</div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold block mt-1">CSAT: 4.9/5.0</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Projects & Tasks View */}
          {activeTab === 'projects' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Turn Workforce Capacity Into Business Results.
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
                    Assign projects, track billable client timesheets, monitor team capacity, and prevent burnout.
                  </p>
                </div>
                <button
                  onClick={onOpenDemo}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
                >
                  Explore Task Board
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-3">
                  <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                    <span>Active Client Initiatives</span>
                    <span className="text-blue-600 dark:text-blue-400">8 In Progress</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-700/80">
                    <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200">
                      <span>Global Cloud Migration</span>
                      <span className="text-lime-700 dark:text-lime-400 font-bold">85% Complete</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">Assigned: 12 Staff • 480 Billable Hours logged</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-3">
                  <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                    <span>Workforce Capacity Utilization</span>
                    <span className="text-lime-700 dark:text-lime-400 font-bold">Optimal (82%)</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-700/80">
                    <p className="text-slate-700 dark:text-slate-300 text-[11px]">
                      NextSofthr AI forecasts zero team burnout risk for upcoming Q4 product deliverables.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
