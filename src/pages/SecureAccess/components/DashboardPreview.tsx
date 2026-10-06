import React, { useState } from 'react';
import NextSofthrLogo from './NextSofthrLogo';
import ThemeToggle from './ThemeToggle';
import { useToast } from './ToastNotification';
import {
  Users,
  CreditCard,
  CalendarCheck,
  Sparkles,
  LogOut,
  Bell,
  Search,
  CheckCircle,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Building,
  Briefcase,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface DashboardPreviewProps {
  userEmail: string;
  onSignOut: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  userEmail,
  onSignOut,
  isDark,
  onToggleTheme,
}) => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'payroll' | 'employees'>('overview');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleAiAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setTimeout(() => {
      setAiLoading(false);
      const answer = `NextSofthr AI Analysis: For 148 active staff across Lagos and Nairobi offices, all pension contributions (8% employer, 10% employee) and statutory PAYE calculations are reconciled. Overtime for logistics team is 12.4 hrs within compliant labor caps.`;
      setAiResponse(answer);
      toast.success('Workplace intelligence query analyzed against statutory payroll rules.', {
        title: 'Intelligence Ready',
      });
    }, 800);
  };

  const handleSignOutClick = () => {
    toast.info('You have safely signed out of your NextSofthr session.', {
      title: 'Session Ended',
    });
    onSignOut();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08101e] flex flex-col antialiased text-slate-800 dark:text-slate-100 transition-colors">
      {/* Top Enterprise Navigation */}
      <header className="sticky top-0 z-30 bg-white dark:bg-[#0f1c33] border-b border-slate-200 dark:border-white/10 px-4 sm:px-6 lg:px-8 py-2.5 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <NextSofthrLogo size="sm" showTagline={false} />
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#caff33] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#84b800] dark:bg-[#caff33]"></span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">Apex Pan-African Ventures</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0056b3] dark:text-[#38bdf8] text-[10px] font-bold border border-blue-100 dark:border-blue-900/60">
                ENTERPRISE TIER
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            {/* Search bar */}
            <div className="hidden sm:flex items-center relative">
              <Search className="w-3.5 h-3.5 absolute left-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search employees, payroll runs..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-[#1b2d4e] focus:outline-none focus:border-[#0056b3] w-48 lg:w-56"
              />
            </div>

            {/* Notification bell */}
            <button
              onClick={() => {
                toast.info('You have 3 compliance reminders scheduled for end-of-month payroll reconciliation.', {
                  title: 'Notifications (3)',
                });
              }}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#0056b3] dark:bg-[#caff33]"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0056b3] to-[#004494] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="hidden sm:block text-left text-xs leading-tight">
                <div className="font-semibold text-slate-900 dark:text-white truncate max-w-[130px]">
                  {userEmail || 'admin@nextsofthr.org'}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Workspace Active</div>
              </div>
            </div>

            {/* Sign Out CTA */}
            <button
              onClick={handleSignOutClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors border border-slate-200 dark:border-white/10 hover:border-red-200 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Sign In</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome greeting banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#002244] via-[#003366] to-[#0056b3] text-white shadow-xl relative overflow-hidden mb-6">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#caff33_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[#caff33] text-xs font-semibold backdrop-blur-xs mb-2">
                <Sparkles className="w-3 h-3 text-[#caff33]" />
                NextSofthr Smart Workspace
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Welcome back to your workspace!
              </h2>
              <p className="mt-1 text-xs text-blue-100/90 max-w-xl">
                Your integrated HR operations, payroll compliance, and employee intelligence across Africa and worldwide are synchronized and up to date.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#caff33] hover:bg-[#b8f018] text-[#003366] shadow-md shadow-[#caff33]/20 transition-all flex items-center gap-1.5 font-bold cursor-pointer">
                <span>Run Monthly Payroll</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Card 1 */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#0f1c33] border border-slate-200/90 dark:border-white/10 shadow-xs transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Total Workforce</span>
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0056b3] dark:text-[#38bdf8]">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">148</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>+6 onboarded this month</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#0f1c33] border border-slate-200/90 dark:border-white/10 shadow-xs transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Active Payroll Cycle</span>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">₦42.5M <span className="text-xs text-slate-400 font-normal">($28.4k)</span></div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
              <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Direct Bank API Ready</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#0f1c33] border border-slate-200/90 dark:border-white/10 shadow-xs transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Pending Leave</span>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <CalendarCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">4 Requests</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              <span>2 Annual, 2 Sick leaves pending</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#0f1c33] border border-slate-200/90 dark:border-white/10 shadow-xs transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Statutory Compliance</span>
              <div className="p-2 rounded-lg bg-[#f7fee7] dark:bg-[#caff33]/15 text-[#84b800] dark:text-[#caff33]">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#0056b3] dark:text-[#38bdf8]">100%</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <span>Tax &amp; Pension Filed on schedule</span>
            </div>
          </div>
        </div>

        {/* AI Assistant Quick Feature in Dashboard */}
        <div className="bg-white dark:bg-[#0f1c33] rounded-2xl border border-slate-200/90 dark:border-white/10 p-5 shadow-xs mb-6 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-[#0056b3]/10 dark:bg-[#0056b3]/25 text-[#0056b3] dark:text-[#38bdf8] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#0056b3] dark:text-[#caff33]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                NextSofthr AI Workplace Intelligence
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Ask questions about your African workforce, payroll forecasts, or labor law statutory guidelines.
              </p>
            </div>
          </div>

          <form onSubmit={handleAiAsk} className="flex gap-2">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g., Audit tax deductions for Kenya remote engineers or summarize leave trends..."
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-[#1b2d4e] focus:outline-none focus:border-[#0056b3]"
            />
            <button
              type="submit"
              disabled={aiLoading}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#0056b3] hover:bg-[#004494] text-white transition-all shadow-xs"
            >
              {aiLoading ? 'Thinking...' : 'Ask AI'}
            </button>
          </form>

          {aiResponse && (
            <div className="mt-3 p-3 rounded-xl bg-[#f0f7ff] dark:bg-[#15233e] border border-blue-100 dark:border-white/10 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
              {aiResponse}
            </div>
          )}
        </div>

        {/* Quick Operations Table */}
        <div className="bg-white dark:bg-[#0f1c33] rounded-2xl border border-slate-200/90 dark:border-white/10 overflow-hidden shadow-xs transition-colors">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Multi-Country Business Hubs
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Consolidated employee and payroll status by location
              </p>
            </div>
            <span className="text-xs text-[#0056b3] dark:text-[#38bdf8] font-semibold cursor-pointer hover:underline">
              View All Locations
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-white/10">
            {[
              { city: 'Lagos, Nigeria', employees: '72 Employees', currency: 'NGN (₦)', status: 'Payroll Verified' },
              { city: 'Nairobi, Kenya', employees: '38 Employees', currency: 'KES (KSh)', status: 'Payroll Verified' },
              { city: 'Johannesburg, South Africa', employees: '24 Employees', currency: 'ZAR (R)', status: 'Tax Filed' },
              { city: 'Accra, Ghana', employees: '14 Employees', currency: 'GHS (₵)', status: 'Cycle Open' },
            ].map((hub, idx) => (
              <div key={idx} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/70 dark:hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#1a2c4e] flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs">
                    <Building className="w-4 h-4 text-[#0056b3] dark:text-[#caff33]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">{hub.city}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{hub.employees} • {hub.currency}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                    {hub.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
export default DashboardPreview;
