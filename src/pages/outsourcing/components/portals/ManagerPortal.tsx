import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Award, 
  Check, 
  X, 
  AlertCircle, 
  BarChart3, 
  Briefcase, 
  Lock,
  ArrowRight
} from 'lucide-react';

export const ManagerPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'team' | 'approvals' | 'attendance' | 'performance' | 'requisitions'>('approvals');

  const [teamMembers, setTeamMembers] = useState([
    { id: 'TM-1', name: 'Amara Okafor', role: 'Lead Cloud Architect', status: 'Working', onLeave: false },
    { id: 'TM-2', name: 'Tariq Ndlovu', role: 'Senior DevOps Specialist', status: 'Working', onLeave: false },
    { id: 'TM-3', name: 'Grace Achieng', role: 'Platform Reliability Engineer', status: 'On Leave (Annual)', onLeave: true },
    { id: 'TM-4', name: 'Kofi Boateng', role: 'DevOps Associate', status: 'Working', onLeave: false }
  ]);

  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 'AP-1', employee: 'Grace Achieng', type: 'Annual Leave Request (3 days)', submitted: '29 Sep 2026', note: 'Project milestone completed; handoff assigned to Tariq.' },
    { id: 'AP-2', employee: 'Tariq Ndlovu', type: 'Weekend Overtime Authorization (8 hrs)', submitted: '28 Sep 2026', note: 'Supported database cutover during non-business hours.' }
  ]);

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setPendingApprovals(prev => prev.filter(a => a.id !== id));
    setFeedback('Request approved and updated in NextSofthr central payroll ledger.');
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleDecline = (id: string) => {
    setPendingApprovals(prev => prev.filter(a => a.id !== id));
    setFeedback('Request declined and returned to employee with constructive feedback.');
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Feedback Banner */}
      {feedback && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in shadow-xs">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Manager Header */}
      <div className="bg-gradient-to-r from-[#061537] via-[#0A1E4A] to-[#0F2D6B] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-lime-400 font-semibold uppercase tracking-wider">Manager Self-Service (MSS)</span>
            <span className="w-2 h-2 rounded-full bg-lime-400"></span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Engineering & Infrastructure Leadership</h2>
          <div className="text-xs text-slate-300 mt-0.5">
            Role: Engineering Director · Direct Reports: 4 Specialists · Cost Center: CC-0482
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs bg-white/10 px-4 py-2.5 rounded-xl border border-white/15">
          <Lock className="w-4 h-4 text-lime-400 shrink-0" />
          <span>Salary records masked per department role authorization matrix.</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-blue-900/50 bg-white dark:bg-[#0B1A3D] rounded-xl shadow-xs px-4 overflow-x-auto text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors">
        <button
          onClick={() => setActiveTab('approvals')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'approvals' ? 'border-lime-500 text-[#0F2D6B] dark:text-lime-400' : 'border-transparent hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Pending Approvals ({pendingApprovals.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'team' ? 'border-lime-500 text-[#0F2D6B] dark:text-lime-400' : 'border-transparent hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Team Members ({teamMembers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'attendance' ? 'border-lime-500 text-[#0F2D6B] dark:text-lime-400' : 'border-transparent hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Team Attendance & Shifts</span>
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'performance' ? 'border-lime-500 text-[#0F2D6B] dark:text-lime-400' : 'border-transparent hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Q3 Performance Appraisals</span>
        </button>
        <button
          onClick={() => setActiveTab('requisitions')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'requisitions' ? 'border-lime-500 text-[#0F2D6B] dark:text-lime-400' : 'border-transparent hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Recruitment Requisitions</span>
        </button>
      </div>

      {/* Main Tab Panels */}
      <div className="bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-md p-6 space-y-6 transition-colors">
        {activeTab === 'approvals' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-blue-900/40">
              Pending Line Manager Sign-Offs
            </h3>

            {pendingApprovals.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
                All team requests have been processed. Great job!
              </div>
            ) : (
              <div className="space-y-3">
                {pendingApprovals.map(req => (
                  <div key={req.id} className="p-4 bg-slate-50 dark:bg-[#06112C] rounded-xl border border-slate-200 dark:border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{req.employee}</span>
                        <span className="bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border dark:border-blue-800/40 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                          {req.type}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">Note: "{req.note}"</p>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">Submitted: {req.submitted}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleDecline(req.id)}
                        className="px-3.5 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-blue-900/40">
              Department Direct Reports
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teamMembers.map(tm => (
                <div key={tm.id} className="p-4 rounded-xl border border-slate-200 dark:border-blue-900/40 bg-slate-50/50 dark:bg-[#06112C] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{tm.name}</div>
                    <div className="text-slate-500 dark:text-slate-400">{tm.role}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                    tm.onLeave ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border dark:border-blue-800/40' : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border dark:border-emerald-800/40'
                  }`}>
                    {tm.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-blue-900/40">
              Team Shift Logs
            </h3>
            <p className="text-slate-600 dark:text-slate-300">All 4 engineers are on approved hybrid schedules (3 days office, 2 days remote).</p>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-blue-900/40">
              Q3 Appraisal Status
            </h3>
            <p className="text-slate-600 dark:text-slate-300">3 of 4 team members have submitted self-appraisals. Line Manager ratings due by October 15th.</p>
          </div>
        )}

        {activeTab === 'requisitions' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-blue-900/40">
              Hiring Requisitions
            </h3>
            <p className="text-slate-600 dark:text-slate-300">Need to expand your engineering team? Submit a requisition to the NextSofthr Recruitment Outsourcing pod.</p>
            <button
              onClick={() => {
                setFeedback('New Requisition draft opened and routed to NextSofthr Talent Outsourcing pod.');
                setTimeout(() => setFeedback(null), 4000);
              }}
              className="px-4 py-2 bg-[#0F2D6B] dark:bg-lime-400 hover:bg-[#0A1E4A] dark:hover:bg-lime-300 text-white dark:text-slate-950 font-bold rounded-lg transition-colors"
            >
              Draft Open Requisition
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
