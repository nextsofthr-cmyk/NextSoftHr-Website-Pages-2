import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  CreditCard, 
  Briefcase, 
  Clock, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  Headphones, 
  BarChart3, 
  Bot, 
  Receipt, 
  Settings, 
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play
} from 'lucide-react';
import { SUPPORT_TICKETS, COMPLIANCE_ITEMS } from '../../data/mockData';
import { useCurrency } from '../../context/CurrencyContext';

export const AdminOpsConsole: React.FC = () => {
  const { formatCurrency, currency } = useCurrency();
  const [activeModule, setActiveModule] = useState<string>('Overview');

  const modules = [
    'Overview',
    'Clients',
    'Companies',
    'Employees',
    'Payroll',
    'HR Operations',
    'Recruitment',
    'Attendance',
    'Leave',
    'Documents',
    'Compliance Tasks',
    'Support Tickets',
    'Reports',
    'AI Assistant',
    'Billing',
    'Settings'
  ];

  const metrics = [
    { label: 'Active Enterprise Clients', val: '482', change: '+18 this month', color: 'text-blue-700' },
    { label: 'Employees Under Management', val: '34,120', change: '+1,240 onboarding', color: 'text-lime-700' },
    { 
      label: 'Cycle Payrolls Processed', 
      val: formatCurrency(1840000000, { compact: true }), 
      change: `Calculated in ${currency.code} across 8 markets`, 
      color: 'text-emerald-700' 
    },
    { label: 'Pending Approvals', val: '14 Batches', change: '8 due today', color: 'text-amber-700' },
    { label: 'Open Support Cases', val: '4 Tickets', change: 'All within SLA target', color: 'text-purple-700' },
    { label: 'Service Performance', val: '99.98%', change: 'Calculated penny accuracy', color: 'text-teal-700' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-[#061537] text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-blue-900/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-lime-400 font-semibold uppercase tracking-wider">NextSofthr Specialist Operations Console</span>
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Global Outsourcing Operations Hub</h2>
          <div className="text-xs text-slate-300 mt-0.5">
            Operator: Senior Operations Delivery Pod · Multi-Tenant Master Authorization
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono bg-blue-900/60 text-lime-300 border border-blue-800 px-3 py-1.5 rounded-xl">
            Live Engine: 100% Up
          </span>
        </div>
      </div>

      {/* 16 Modules Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-xs overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max text-xs font-bold text-slate-600">
          {modules.map(mod => (
            <button
              key={mod}
              onClick={() => setActiveModule(mod)}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeModule === mod 
                  ? 'bg-[#0F2D6B] text-white shadow-xs' 
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {metrics.map(m => (
          <div key={m.label} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <div className="text-[11px] font-semibold text-slate-500 uppercase leading-tight">{m.label}</div>
            <div className={`text-xl sm:text-2xl font-black ${m.color}`}>{m.val}</div>
            <div className="text-[10px] text-slate-400">{m.change}</div>
          </div>
        ))}
      </div>

      {/* Module View Body */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 uppercase">
            Active Module: {activeModule}
          </h3>
          <span className="text-xs text-slate-500">Auto-refresh every 30s</span>
        </div>

        {activeModule === 'Overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Batch Payroll Queue */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-900 uppercase">Upcoming Payroll Cycle Runs</span>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <div className="p-3 bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Apex Global Logistics Ltd (Nigeria)</div>
                      <div className="text-slate-500">142 Employees · Gross: {formatCurrency(6850000, { compact: true })}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Ready</span>
                  </div>

                  <div className="p-3 bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Kifaru FinTech Solutions (Kenya)</div>
                      <div className="text-slate-500">86 Employees · Gross: {formatCurrency(14200000 * 12, { compact: true })}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">Variance Check</span>
                  </div>

                  <div className="p-3 bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Harbour Maritime (Ghana)</div>
                      <div className="text-slate-500">62 Employees · Gross: {formatCurrency(820000 * 105, { compact: true })}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Ready</span>
                  </div>
                </div>
              </div>

              {/* High Priority Support Queue */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-900 uppercase">Urgent SLA Tickets</span>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                  {SUPPORT_TICKETS.slice(0, 3).map(t => (
                    <div key={t.id} className="p-3 bg-slate-50 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{t.client}</div>
                        <div className="text-slate-500 truncate max-w-xs">{t.title}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 font-mono">
                        {t.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeModule !== 'Overview' && (
          <div className="py-8 text-center text-xs text-slate-500 space-y-2">
            <div className="text-base font-bold text-slate-900">NextSofthr Operational Engine: {activeModule}</div>
            <p>Module active with automated synchronization across tenant client organizations.</p>
          </div>
        )}
      </div>
    </div>
  );
};
