import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  CreditCard, 
  Calendar, 
  Clock, 
  Download, 
  Bell, 
  HelpCircle, 
  Bot, 
  Send, 
  Check, 
  Eye, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { SAMPLE_PAYROLL_DATA } from '../../data/mockData';
import { useCurrency } from '../../context/CurrencyContext';

export const EmployeePortal: React.FC = () => {
  const { formatCurrency } = useCurrency();
  const [activeTab, setActiveTab] = useState<'payslips' | 'leave' | 'attendance' | 'documents' | 'requests' | 'ai'>('payslips');
  const [leaveDaysRequested, setLeaveDaysRequested] = useState(3);
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  const payslips = [
    { month: 'September 2026', gross: 1850000, net: 1593000, ref: 'NSHR-2026-09-001', date: '25 Sep 2026' },
    { month: 'August 2026', gross: 1850000, net: 1593000, ref: 'NSHR-2026-08-001', date: '25 Aug 2026' },
    { month: 'July 2026', gross: 1850000, net: 1593000, ref: 'NSHR-2026-07-001', date: '25 Jul 2026' }
  ];

  const announcements = [
    { title: 'Upcoming Statutory Holiday Schedule: Independence Day', date: '28 Sep 2026', read: false },
    { title: 'New HMO Health Provider Network Update - Dental & Optical Expansion', date: '20 Sep 2026', read: true }
  ];

  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleRequestLeave = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaveSubmitted(true);
    setTimeout(() => {
      setLeaveSubmitted(false);
      setLeaveReason('');
      setFeedbackMsg('Leave request submitted to your Line Manager for approval.');
      setTimeout(() => setFeedbackMsg(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Employee Greeting Header */}
      <div className="bg-gradient-to-r from-[#0A1E4A] via-[#0F2D6B] to-[#12398C] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-lime-400 to-emerald-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow">
            AO
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-lime-400 font-semibold uppercase tracking-wider">Employee Self-Service (ESS)</span>
              <span className="w-2 h-2 rounded-full bg-lime-400"></span>
            </div>
            <h2 className="text-2xl font-bold text-white">Welcome, Amara Okafor</h2>
            <div className="text-xs text-slate-300 mt-0.5">
              Lead Cloud Architect · Engineering & DevOps · Lagos Island Office
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs text-slate-300 bg-white/10 px-4 py-2 rounded-xl border border-white/15">
            <div>Annual Leave Balance: <strong className="text-lime-300 font-mono text-sm">16.5 Days</strong></div>
            <div className="text-[10px] text-slate-400">Next cycle: October 2026</div>
          </div>
        </div>
      </div>

      {/* Inline Feedback Banner */}
      {feedbackMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in shadow-xs">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* ESS Navigation Bar */}
      <div className="flex border-b border-slate-200 dark:border-blue-900/50 bg-white dark:bg-[#0B1A3D] rounded-xl shadow-xs px-4 overflow-x-auto text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors">
        <button
          onClick={() => setActiveTab('payslips')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'payslips' ? 'border-lime-500 text-[#0F2D6B] dark:text-lime-400' : 'border-transparent hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>My Payslips</span>
        </button>
        <button
          onClick={() => setActiveTab('leave')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'leave' ? 'border-lime-500 text-[#0F2D6B] dark:text-lime-400' : 'border-transparent hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Leave & Time-Off</span>
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'attendance' ? 'border-lime-500 text-[#0F2D6B] dark:text-lime-400' : 'border-transparent hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>My Attendance</span>
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'documents' ? 'border-lime-500 text-[#0F2D6B] dark:text-lime-400' : 'border-transparent hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>My Documents & Contracts</span>
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'requests' ? 'border-lime-500 text-[#0F2D6B] dark:text-lime-400' : 'border-transparent hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>My HR Requests</span>
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 text-lime-700 dark:text-lime-400 bg-lime-50/40 dark:bg-lime-950/40 ${
            activeTab === 'ai' ? 'border-lime-500 font-black' : 'border-transparent hover:text-lime-900 dark:hover:text-lime-300'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI HR Copilot</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Middle Column (Active Tab) */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'payslips' && (
            <div className="bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-md p-6 space-y-4 transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-blue-900/40">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Your Monthly Payslip History</h3>
                <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border dark:border-emerald-900/50">All Disbursed</span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-blue-900/30">
                {payslips.map(ps => (
                  <div key={ps.ref} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{ps.month}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Ref: {ps.ref} · Paid on {ps.date}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-emerald-600 dark:text-lime-400 font-mono">{formatCurrency(ps.net)}</div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500">Gross: {formatCurrency(ps.gross)}</div>
                      </div>
                      <button
                        onClick={() => {
                          setFeedbackMsg(`Official signed payslip PDF for ${ps.month} downloaded successfully.`);
                          setTimeout(() => setFeedbackMsg(null), 4000);
                        }}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-[#06112C] hover:bg-slate-200 dark:hover:bg-blue-900/40 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors border dark:border-blue-900/40"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leave' && (
            <div className="bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-md p-6 space-y-5 transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-blue-900/40">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Request Time-Off or Leave</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">16.5 days remaining</span>
              </div>

              <form onSubmit={handleRequestLeave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Leave Category</label>
                    <select className="w-full px-3 py-2 border border-slate-300 dark:border-blue-900/60 rounded-lg bg-white dark:bg-[#06112C] text-slate-900 dark:text-white">
                      <option>Annual Leave (Paid)</option>
                      <option>Casual / Personal Leave</option>
                      <option>Sick Leave (Certificate upload available)</option>
                      <option>Compassionate Leave</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Duration (Business Days)</label>
                    <input
                      type="number"
                      min={1}
                      max={16}
                      value={leaveDaysRequested}
                      onChange={e => setLeaveDaysRequested(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-blue-900/60 rounded-lg bg-white dark:bg-[#06112C] text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Reason / Handover Notes *</label>
                  <textarea
                    rows={2}
                    required
                    value={leaveReason}
                    onChange={e => setLeaveReason(e.target.value)}
                    placeholder="Brief notes on planned absence and ongoing sprint handover..."
                    className="w-full px-3 py-2 border border-slate-300 dark:border-blue-900/60 rounded-lg bg-white dark:bg-[#06112C] text-slate-900 dark:text-white resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={leaveSubmitted}
                  className="px-5 py-2.5 bg-[#0F2D6B] dark:bg-lime-400 hover:bg-[#0A1E4A] dark:hover:bg-lime-300 text-white dark:text-slate-950 font-bold rounded-xl transition-all shadow flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to Line Manager</span>
                </button>
              </form>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-md p-6 space-y-4 transition-colors">
              <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-blue-900/40">
                Your Monthly Attendance Record
              </h3>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
                  <div className="text-emerald-700 dark:text-emerald-400 font-bold text-lg">21 Days</div>
                  <div className="text-slate-500 dark:text-slate-400">Present & On-Time</div>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/50">
                  <div className="text-amber-700 dark:text-amber-400 font-bold text-lg">0 Late</div>
                  <div className="text-slate-500 dark:text-slate-400">Tardiness Incidents</div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/50">
                  <div className="text-blue-700 dark:text-blue-400 font-bold text-lg">0 Absent</div>
                  <div className="text-slate-500 dark:text-slate-400">Unexcused Absences</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-md p-6 space-y-3 text-xs transition-colors">
              <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-blue-900/40">
                Personnel Files & Employment Contracts
              </h3>
              <div className="p-3 bg-slate-50 dark:bg-[#06112C] rounded-xl border border-slate-200 dark:border-blue-900/40 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Verified Indeterminate Employment Contract.pdf</div>
                  <div className="text-slate-500 dark:text-slate-400">Signed 12 March 2024 · NextSofthr Certified Vault</div>
                </div>
                <button 
                  onClick={() => {
                    setFeedbackMsg('Verified employment contract downloaded successfully from NextSofthr Vault.');
                    setTimeout(() => setFeedbackMsg(null), 4000);
                  }}
                  className="px-3 py-1 bg-white dark:bg-[#0B1A3D] border border-slate-200 dark:border-blue-900/50 text-slate-800 dark:text-slate-200 rounded-lg font-semibold hover:bg-slate-100 dark:hover:bg-blue-900/50"
                >
                  Download
                </button>
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-md p-6 space-y-4 text-xs transition-colors">
              <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-blue-900/40">
                HR Service Requests
              </h3>
              <p className="text-slate-600 dark:text-slate-300">Need an official bank introduction letter, visa sponsorship letter, or health insurance card renewal?</p>
              <button 
                onClick={() => {
                  setFeedbackMsg('Official Embassy / Bank Introduction Letter requested from NextSofthr team. Turnaround: 24 hours.');
                  setTimeout(() => setFeedbackMsg(null), 4000);
                }}
                className="px-4 py-2 bg-[#0F2D6B] dark:bg-blue-600 hover:bg-[#0A1E4A] dark:hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm"
              >
                Request Official Employment Introduction Letter
              </button>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-md p-6 space-y-4 text-xs transition-colors">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-blue-900/40 text-[#0F2D6B] dark:text-lime-400 font-bold">
                <Bot className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                <span>NextSofthr Employee AI Assistant</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Ask questions about your health insurance policy, compassionate leave eligibility, or tax relief under the 2026 Finance Act.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-[#06112C] rounded-xl border border-slate-200 dark:border-blue-900/40 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">Q: When is the salary cutoff for October?</div>
                <div className="text-slate-700 dark:text-slate-300">A: Overtime and claims cut off on the 18th. Salary is disbursed on the 25th.</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Company Announcements & Quick HR Support */}
        <div className="space-y-6">
          {/* Announcements Card */}
          <div className="bg-white dark:bg-[#0B1A3D] rounded-2xl border border-slate-200 dark:border-blue-900/50 shadow-md p-5 space-y-3 transition-colors">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-blue-900/40 font-bold text-xs uppercase text-slate-900 dark:text-white">
              <Bell className="w-4 h-4 text-blue-700 dark:text-lime-400" />
              <span>Company Announcements</span>
            </div>
            <div className="space-y-2.5">
              {announcements.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-[#06112C] rounded-xl border border-slate-200 dark:border-blue-900/40 space-y-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dedicated HR Support Desk Card */}
          <div className="bg-slate-900 dark:bg-[#06112C] text-white rounded-2xl p-5 space-y-3 border border-slate-800 dark:border-blue-900/50">
            <div className="text-xs font-bold text-lime-400 uppercase tracking-wider">Dedicated NextSofthr HRBP</div>
            <div className="text-sm font-bold text-white">Zainab Al-Hassan</div>
            <p className="text-xs text-slate-300">
              Assigned Senior People Operations Partner for Engineering & DevOps.
            </p>
            <div className="pt-2 text-xs">
              <button 
                onClick={() => {
                  setFeedbackMsg('Direct inquiry sent to dedicated HRBP Zainab Al-Hassan. Response within 2 hours.');
                  setTimeout(() => setFeedbackMsg(null), 4000);
                }}
                className="w-full py-2 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold rounded-lg transition-colors text-center"
              >
                Send Message to HRBP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
