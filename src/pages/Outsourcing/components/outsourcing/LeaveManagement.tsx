import React, { useState } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Check, 
  X, 
  Users, 
  FileText,
  Heart,
  Baby,
  Activity
} from 'lucide-react';
import { LeaveRequest } from '../../types';

interface LeaveManagementProps {
  onOpenLeadModal: (service?: string) => void;
}

export const LeaveManagement: React.FC<LeaveManagementProps> = ({ onOpenLeadModal }) => {
  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: 'LR-101',
      employeeName: 'Fatima Sow',
      type: 'Annual',
      startDate: '2026-10-05',
      endDate: '2026-10-16',
      days: 10,
      status: 'Pending Review',
      reason: 'Annual family holiday in Dakar'
    },
    {
      id: 'LR-102',
      employeeName: 'Dr. Chidi Ekwueme',
      type: 'Paternity',
      startDate: '2026-10-01',
      endDate: '2026-10-14',
      days: 14,
      status: 'Approved',
      reason: 'Newborn child bonding period'
    },
    {
      id: 'LR-103',
      employeeName: 'Kwame Mensah',
      type: 'Sick',
      startDate: '2026-09-28',
      endDate: '2026-09-29',
      days: 2,
      status: 'Approved',
      reason: 'Doctor prescribed recovery'
    }
  ]);

  const [filterMonth, setFilterMonth] = useState('October 2026');

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
  };

  const leaveTypes = [
    { name: 'Annual Leave', statutory: '21 standard business days / year', icon: Calendar, color: 'text-blue-600 bg-blue-50' },
    { name: 'Sick & Medical Leave', statutory: '12 paid days with medical certificate', icon: Activity, color: 'text-amber-600 bg-amber-50' },
    { name: 'Maternity Leave', statutory: '12 to 16 weeks fully paid per jurisdiction', icon: Baby, color: 'text-purple-600 bg-purple-50' },
    { name: 'Paternity Leave', statutory: '14 calendar days for fathers', icon: Heart, color: 'text-rose-600 bg-rose-50' },
    { name: 'Compassionate Leave', statutory: '5 days bereavement entitlement', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Custom / Study Leave', statutory: 'Configurable company policy', icon: FileText, color: 'text-slate-600 bg-slate-50' }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Leave Management Outsourcing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Make Leave Management Simple.”
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Eliminate conflicting time-off, lost email requests, and manual spreadsheet balances. NextSofthr configures custom leave policies and manages approvals directly linked to payroll.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenLeadModal('Leave Management Outsourcing')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Simplify Your Leave Policy</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Company Leave Calendar & Request Queue */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Leave Operations</span>
              <h3 className="text-2xl font-bold text-slate-900">Live Team Leave Queue & Calendar</h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-medium">Viewing Schedule:</span>
              <span className="text-xs font-bold text-[#0F2D6B] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                {filterMonth}
              </span>
            </div>
          </div>

          {/* Leave Requests Table with Live One-Click Approvals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase">Pending & Recent Leave Requests</h4>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {requests.map((req) => (
                <div key={req.id} className="p-4 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{req.employeeName}</span>
                      <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {req.type} Leave ({req.days} days)
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        req.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">
                      Duration: <strong className="font-mono text-slate-900">{req.startDate}</strong> to <strong className="font-mono text-slate-900">{req.endDate}</strong> · Reason: "{req.reason}"
                    </div>
                  </div>

                  {req.status === 'Pending Review' ? (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Logged & Synced to Payroll</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leave Types Supported */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Policy Configuration</span>
          <h3 className="text-2xl font-bold text-slate-900">Customizable Leave Categories</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaveTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.name} className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${type.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{type.name}</h4>
                </div>
                <p className="text-xs text-slate-500">{type.statutory}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
