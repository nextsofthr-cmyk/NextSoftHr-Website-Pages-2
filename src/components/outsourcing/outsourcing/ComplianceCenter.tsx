import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  Lock, 
  Clock, 
  Building2,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { COMPLIANCE_ITEMS } from '../../data/mockData';
import { ComplianceTask } from '../../types';

interface ComplianceCenterProps {
  onOpenLeadModal: (service?: string) => void;
}

export const ComplianceCenter: React.FC<ComplianceCenterProps> = ({ onOpenLeadModal }) => {
  const [tasks, setTasks] = useState<ComplianceTask[]>(COMPLIANCE_ITEMS);
  const [selectedCountry, setSelectedCountry] = useState('All');

  const expiryAlerts = [
    { title: 'Expatriate CERPAC Work Permit Expiry', employee: 'Jean-Paul Dupont', daysLeft: 28, status: 'Action Required' },
    { title: 'Annual Health Certificate Renewal', employee: '14 Warehouse Staff', daysLeft: 45, status: 'Scheduled' },
    { title: 'Driver License & Insurance Certificate', employee: 'Fleet Logistics Pool', daysLeft: 12, status: 'Urgent' }
  ];

  const auditTrails = [
    { timestamp: '2026-09-29 08:30 GMT', user: 'Oluwaseun Adeleke (Specialist)', event: 'Approved monthly PAYE remittance schedule for Lagos State SIRS', hash: 'SHA256: 7f8b9...c32' },
    { timestamp: '2026-09-28 17:15 GMT', user: 'Kifaru FinTech Admin', event: 'Signed updated employee contract for Senior Architect role', hash: 'SHA256: 1a4e2...e90' },
    { timestamp: '2026-09-27 11:00 GMT', user: 'System Automated Rule', event: 'Recalculated NHF 2.5% statutory relief following gross salary revision', hash: 'SHA256: 9c0d1...f88' }
  ];

  const handleFileReturn = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'Submitted' } : t));
  };

  const filteredTasks = selectedCountry === 'All' 
    ? tasks 
    : tasks.filter(t => t.country.includes(selectedCountry));

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Governance & Regulatory Operations</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Stay Organized. Stay Ready.”
          </h1>

          {/* Mandated Compliance Position Statement */}
          <div className="max-w-3xl mx-auto p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-sm text-slate-200 leading-relaxed font-medium">
            <p>
              “NextSofthr helps organizations organize, monitor and manage HR and payroll processes to support their compliance responsibilities.”
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenLeadModal('Compliance Center Assessment')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Review Your Compliance Posture</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Compliance Task Tracking Board */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Statutory Obligations</span>
              <h3 className="text-2xl font-bold text-slate-900">Active Regulatory Filing Schedules</h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Filter Market:</span>
              <select
                value={selectedCountry}
                onChange={e => setSelectedCountry(e.target.value)}
                className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none"
              >
                <option value="All">All African Jurisdictions</option>
                <option value="Nigeria">Nigeria (FIRS/LIRS/PenCom)</option>
                <option value="Ghana">Ghana (GRA/SSNIT)</option>
                <option value="Kenya">Kenya (KRA/NSSF)</option>
                <option value="South Africa">South Africa (SARS/UIF)</option>
              </select>
            </div>
          </div>

          {/* Task List */}
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {filteredTasks.map(task => (
              <div key={task.id} className="p-4 bg-slate-50/60 hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{task.title}</span>
                    <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {task.country}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      task.status === 'Submitted' ? 'bg-emerald-100 text-emerald-800' :
                      task.status === 'Ready to File' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Statutory Authority: <strong className="text-slate-900">{task.authority}</strong> · Due Date: <strong className="font-mono text-rose-700">{task.dueDate}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {task.status !== 'Submitted' ? (
                    <button
                      onClick={() => handleFileReturn(task.id)}
                      className="px-3.5 py-1.5 bg-[#0F2D6B] hover:bg-[#0A1E4A] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <FileCheck className="w-3.5 h-3.5 text-lime-400" />
                      <span>Prepare Statutory File</span>
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Filed & Documented
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Expiry Alerts & Tamper-Evident Audit Trails */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expiry Alerts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Clock className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-base">Document Expiry & Renewal Alerts</h3>
            </div>
            <p className="text-xs text-slate-500">
              Automated reminders prevent lapse of expatriate quotas, medical clearances, and operating permits.
            </p>

            <div className="space-y-2.5">
              {expiryAlerts.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <div className="text-slate-500 text-[11px]">{item.employee}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-rose-600 font-mono font-bold">{item.daysLeft} days left</span>
                    <div className="text-[10px] text-slate-400">{item.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Trails */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Lock className="w-5 h-5 text-lime-400" />
              <h3 className="font-bold text-white text-base">Immutable Audit Trail</h3>
            </div>
            <p className="text-xs text-slate-400">
              Every payroll modification, approval sign-off, and policy adjustment is logged with cryptographic hashes.
            </p>

            <div className="space-y-2.5 font-mono text-[11px]">
              {auditTrails.map((audit, idx) => (
                <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span>{audit.timestamp}</span>
                    <span className="text-lime-400">{audit.hash}</span>
                  </div>
                  <div className="text-white font-sans text-xs">{audit.event}</div>
                  <div className="text-slate-400 text-[10px]">Actor: {audit.user}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
