import React, { useState } from 'react';
import { 
  Building2, 
  CreditCard, 
  Users, 
  FileText, 
  BarChart3, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Download, 
  ArrowRight,
  ShieldCheck,
  Receipt,
  Headphones,
  Check
} from 'lucide-react';
import { SAMPLE_PAYROLL_DATA } from '../../data/mockData';
import { useCurrency } from '../../context/CurrencyContext';

export const ClientPortal: React.FC = () => {
  const { formatCurrency } = useCurrency();
  const [activeTab, setActiveTab] = useState<'payroll' | 'employees' | 'invoices' | 'services'>('payroll');
  const [payrollApproved, setPayrollApproved] = useState(false);

  const invoices = [
    { id: 'INV-2026-09', service: 'Monthly Managed HR & Payroll Outsourcing', amount: 650000, status: 'Paid', date: '20 Sep 2026' },
    { id: 'INV-2026-08', service: 'Monthly Managed HR & Payroll Outsourcing', amount: 650000, status: 'Paid', date: '20 Aug 2026' },
    { id: 'INV-2026-07', service: 'Monthly Managed HR & Payroll Outsourcing', amount: 650000, status: 'Paid', date: '20 Jul 2026' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1E4A] via-[#0F2D6B] to-[#12398C] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-lime-400 font-semibold uppercase tracking-wider">Client Administration Portal</span>
            <span className="w-2 h-2 rounded-full bg-lime-400"></span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Apex Global Logistics Ltd</h2>
          <div className="text-xs text-slate-300 mt-0.5">
            Client ID: APEX-9481 · Service Tier: HR + Payroll Outsourcing · Lead Partner: Oluwaseun Adeleke
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-lime-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl">
            SLA Health: 100% Operational
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-blue-900/50 bg-white dark:bg-[#0B1A3D] rounded-xl shadow-xs px-4 overflow-x-auto text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors">
        <button
          onClick={() => setActiveTab('payroll')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'payroll' ? 'border-lime-500 text-[#0F2D6B] dark:text-lime-400' : 'border-transparent hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Payroll Approval & Register</span>
        </button>
        <button
          onClick={() => setActiveTab('employees')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'employees' ? 'border-lime-500 text-[#0F2D6B] dark:text-lime-400' : 'border-transparent hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Workforce Master Files (142)</span>
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'invoices' ? 'border-lime-500 text-[#0F2D6B] dark:text-lime-400' : 'border-transparent hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Outsourcing Invoices</span>
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'services' ? 'border-lime-500 text-[#0F2D6B] dark:text-lime-400' : 'border-transparent hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Active Service Pod & SLA</span>
        </button>
      </div>

      {/* Main Panel Content */}
      <div className="bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-md p-6 space-y-6 transition-colors">
        {activeTab === 'payroll' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-blue-900/40 gap-4">
              <div>
                <span className="text-xs font-bold text-blue-700 dark:text-lime-400 uppercase">Monthly Payroll Authorization</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">September 2026 Gross-to-Net Batch</h3>
              </div>

              <div>
                {payrollApproved ? (
                  <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs animate-in fade-in border dark:border-emerald-800/40">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Executive Approval Signed · Batch Queued for Bank Disbursement</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setPayrollApproved(true)}
                    className="px-5 py-2.5 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve & Authorize September Payroll</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-[#06112C] rounded-xl border border-slate-200 dark:border-blue-900/40">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Total Net Disbursement</span>
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">{formatCurrency(6132000)}</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-[#06112C] rounded-xl border border-slate-200 dark:border-blue-900/40">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Statutory PAYE Remittance</span>
                <div className="text-xl font-bold text-blue-700 dark:text-blue-400 mt-1 font-mono">{formatCurrency(1167000)}</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-[#06112C] rounded-xl border border-slate-200 dark:border-blue-900/40">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Pension Fund Transfer</span>
                <div className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1 font-mono">{formatCurrency(1233000)}</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-[#06112C] rounded-xl border border-slate-200 dark:border-blue-900/40">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Variance vs Last Month</span>
                <div className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">+1.2%</div>
              </div>
            </div>

            {/* Summary Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase">Batch Register Preview</span>
              <div className="divide-y divide-slate-100 dark:divide-blue-900/30 border border-slate-200 dark:border-blue-900/40 rounded-xl overflow-hidden text-xs">
                {SAMPLE_PAYROLL_DATA.slice(0, 4).map(r => (
                  <div key={r.id} className="p-3.5 bg-slate-50/50 dark:bg-[#071330] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{r.employeeName}</div>
                      <div className="text-slate-500 dark:text-slate-400">{r.role} · {r.department}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold font-mono text-emerald-600 dark:text-lime-400">{formatCurrency(r.netPay)}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">Gross: {formatCurrency(r.grossSalary)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'employees' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-blue-900/40">
              Workforce Master Records
            </h3>
            <p className="text-slate-600 dark:text-slate-300">142 total active personnel records maintained by NextSofthr team.</p>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-blue-900/40">
              Outsourcing Retainer & Service Invoices
            </h3>
            <div className="space-y-2">
              {invoices.map(inv => (
                <div key={inv.id} className="p-4 bg-slate-50 dark:bg-[#06112C] rounded-xl border border-slate-200 dark:border-blue-900/40 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{inv.id} · {inv.service}</div>
                    <div className="text-slate-500 dark:text-slate-400">Issued: {inv.date}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold font-mono text-slate-900 dark:text-white text-sm">{formatCurrency(inv.amount)}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border dark:border-emerald-800/40">
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-blue-900/40">
              Active Outsourcing SLA Pod
            </h3>
            <div className="p-4 bg-slate-50 dark:bg-[#06112C] rounded-xl border border-slate-200 dark:border-blue-900/40 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">Senior Account Lead: Oluwaseun Adeleke</div>
              <div className="text-slate-600 dark:text-slate-300">Payroll Specialist: Fatima Sow · HRBP: Zainab Al-Hassan</div>
              <div className="text-blue-700 dark:text-lime-400 font-semibold pt-1">Priority 2-hour response SLA active on all tickets</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
