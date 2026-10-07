import { useState } from 'react';
import { Calendar, CheckCircle, Clock, Heart, Baby, Plane, AlertCircle, ArrowRight, Check, X } from 'lucide-react';

interface LeaveManagementProps {
  onOpenDemo: () => void;
}

export const LeaveManagementSection = ({ onOpenDemo }: LeaveManagementProps) => {
  const [selectedType, setSelectedType] = useState('Annual Vacation');
  const [approvalState, setApprovalState] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const leaveBalances = [
    { type: 'Annual Vacation', total: 25, used: 11, remaining: 14, icon: Plane, color: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/60' },
    { type: 'Medical / Sick', total: 12, used: 2, remaining: 10, icon: Heart, color: 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/60' },
    { type: 'Parental / Family', total: 60, used: 0, remaining: 60, icon: Baby, color: 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/60' },
    { type: 'Wellness & Study', total: 5, used: 1, remaining: 4, icon: Calendar, color: 'text-lime-600 bg-lime-50 dark:text-lime-400 dark:bg-lime-950/60' }
  ];

  return (
    <section id="leave" className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 border border-lime-300 dark:border-lime-800 uppercase tracking-wider mb-3 inline-block">
            Leave & Absence Automation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Simple, Automated Leave Management.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
            From vacation accruals to parental leave and statutory sick days, automate time-off requests, team conflict checks, and manager approvals in seconds.
          </p>
        </div>

        {/* Interactive Leave Balances Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {leaveBalances.map((b) => (
            <div
              key={b.type}
              onClick={() => setSelectedType(b.type)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedType === b.type 
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 dark:border-blue-400 shadow-sm ring-2 ring-blue-500/20' 
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{b.type}</span>
                <div className={`p-1.5 rounded-lg ${b.color}`}>
                  <b.icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{b.remaining}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">days left</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-blue-600 dark:bg-blue-500 h-full rounded-full" 
                  style={{ width: `${(b.remaining / b.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Employee Request & Manager Approval Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-slate-50 dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
          
          {/* Employee submission preview */}
          <div className="bg-white dark:bg-slate-800/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Step 1: Employee Mobile Request
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Takes 15 seconds</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500 dark:text-slate-400 font-semibold block mb-1">Leave Type</label>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                  {selectedType}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 dark:text-slate-400 font-semibold block mb-1">Start Date</label>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                    Oct 05, 2026
                  </div>
                </div>
                <div>
                  <label className="text-slate-500 dark:text-slate-400 font-semibold block mb-1">Return Date</label>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                    Oct 12, 2026 (5 days)
                  </div>
                </div>
              </div>

              <div>
                <label className="text-slate-500 dark:text-slate-400 font-semibold block mb-1">Handover Notes / Delegate</label>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  Client accounts handed over to Marcus Chen. All Q3 tickets resolved.
                </div>
              </div>

              <div className="p-2.5 bg-lime-50 dark:bg-lime-950/50 text-lime-900 dark:text-lime-300 rounded-xl border border-lime-200 dark:border-lime-900/60 flex items-center gap-2 text-[11px]">
                <CheckCircle className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                <span>Zero team schedule conflicts detected. Sufficient accrued balance.</span>
              </div>
            </div>
          </div>

          {/* Manager 1-Click Approval Cockpit */}
          <div className="bg-white dark:bg-slate-800/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <span className="text-xs font-bold text-lime-700 dark:text-lime-400 uppercase tracking-wider">
                Step 2: Manager 1-Click Action
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                Pending Approval
              </span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/80 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Applicant:</span>
                <span className="font-bold text-slate-900 dark:text-white">Sarah Jenkins (Senior Designer)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Duration:</span>
                <span className="font-bold text-slate-900 dark:text-white">5 Working Days (Oct 5 - 12)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Impact on Payroll:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Fully Paid Leave (0 Deduction)</span>
              </div>
            </div>

            <div className="pt-2">
              {approvalState === 'pending' ? (
                <div className="flex gap-3">
                  <button
                    id="approve-leave-simulator-btn"
                    onClick={() => setApprovalState('approved')}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    Approve Leave
                  </button>
                  <button
                    onClick={() => setApprovalState('rejected')}
                    className="px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors"
                  >
                    Decline
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Approved! Team calendar updated & Slack status auto-scheduled.</span>
                </div>
              )}
            </div>

            <div className="text-center pt-1">
              <button
                onClick={onOpenDemo}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Explore Full Leave Workflow Demo</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
