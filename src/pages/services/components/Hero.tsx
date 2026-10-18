import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Users,
  CreditCard,
  Clock,
  Calendar,
  TrendingUp,
  ShieldCheck,
  Building2,
  Activity,
  Zap,
} from 'lucide-react';

interface HeroProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo, onOpenGetStarted }) => {
  const [activeWidgetTab, setActiveWidgetTab] = useState<'payroll' | 'attendance' | 'headcount'>('payroll');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#F0F5FD] via-white to-[#F8FAFC] dark:from-[#0A2540] dark:via-[#07182E] dark:to-[#07182E]">
      {/* Subtle background ambient decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-[10%] right-[15%] w-[450px] h-[450px] bg-[#84CC16]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-700/60 text-[#0256C4] dark:text-[#84CC16] text-xs sm:text-sm font-bold tracking-wide uppercase shadow-xs mb-6 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse"></span>
            <span>NEXT-GENERATION HR &amp; BUSINESS MANAGEMENT</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A2540] dark:text-white tracking-tight leading-[1.12] mb-6">
            Everything Your Business Needs to Manage{' '}
            <span className="text-[#0256C4] dark:text-blue-400 underline decoration-[#84CC16] decoration-4 underline-offset-8">
              People, Payroll
            </span>{' '}
            &amp; Operations
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-200 font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
            Simplify HR, automate payroll, manage attendance, empower employees and streamline business operations with
            one intelligent platform built for African businesses and designed for the world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-4">
            <a
              href="/signup"
              id="hero-get-started-cta"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-base text-white bg-[#0256C4] hover:bg-[#024bb0] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 transition-all duration-200 flex items-center justify-center gap-3 group border border-blue-500 cursor-pointer"
            >
              <span>Get Started Free</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] group-hover:scale-125 transition-transform" />
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://demo.scriptmaster.store/login"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-explore-demo-cta"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-[#0A2540] dark:text-white bg-white dark:bg-[#0D2644] border border-slate-300 dark:border-blue-700 hover:border-slate-400 dark:hover:border-blue-500 shadow-sm transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-900/60 flex items-center justify-center text-[#0256C4] dark:text-blue-300 group-hover:bg-[#84CC16]/20 transition-colors">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span>Explore Demo</span>
            </a>
          </div>

          {/* Secondary reassurance text */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 font-medium flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#84CC16]" /> No complicated setup
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#84CC16]" /> No fragmented systems
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="inline-flex items-center gap-1 text-[#0256C4] dark:text-[#84CC16] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#84CC16]" /> One connected platform
            </span>
          </p>
        </div>

        {/* Hero Visual: Large African Business Team Photograph Combined with Floating NextSofthr Dashboard Interface */}
        <div className="relative mt-8 lg:mt-12 max-w-6xl mx-auto">
          {/* Main Mockup Card Container */}
          <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-slate-200/70 via-white to-slate-200/80 dark:from-blue-900/40 dark:via-[#0D2644] dark:to-blue-900/50 shadow-2xl shadow-slate-900/15 border border-slate-200 dark:border-blue-800">
            {/* Top Browser / App Header */}
            <div className="bg-slate-900 dark:bg-[#051528] rounded-t-xl sm:rounded-t-2xl px-4 py-3 flex items-center justify-between border-b border-slate-800 dark:border-blue-900/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-[#84CC16]" />
                <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                  https://app.nextsofthr.org/dashboard
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50 hidden md:inline">
                  Multi-Currency: NGN • KES • GHS • ZAR • USD
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-ping" /> System Live
                </span>
              </div>
            </div>

            {/* Dashboard Workspace */}
            <div className="bg-slate-50 dark:bg-[#07182E] rounded-b-xl sm:rounded-b-2xl p-3 sm:p-6 lg:p-8">
              {/* Top Dashboard Row with Real African Corporate Context */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
                {/* Authentic African Professional Team Banner Preview */}
                <div className="lg:col-span-7 relative rounded-xl overflow-hidden shadow-md border border-slate-200 group">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"
                    alt="African professional HR executive and corporate team collaborating in a modern headquarters"
                    className="w-full h-56 sm:h-72 object-cover object-top group-hover:scale-102 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#84CC16] text-[#0A2540] text-[11px] font-black uppercase tracking-wider">
                        Enterprise Team Hub
                      </span>
                      <span className="text-xs text-slate-200 font-medium">Lagos • Nairobi • Accra • Johannesburg</span>
                    </div>
                    <h2 className="text-base sm:text-xl font-bold text-white leading-snug">
                      NextSofthr Connected Operations: 1,482 Active Personnel
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-1 mt-0.5">
                      Seamless statutory compliance, biometric sync &amp; multi-branch payroll approvals.
                    </p>
                  </div>
                </div>

                {/* Right Quick Ticker & Metric Cards */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
                  {/* Total Employees */}
                  <div className="bg-white dark:bg-[#0D2644] p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-blue-800/80 shadow-xs hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-300 mb-2">
                      <span className="text-xs font-semibold">Total Employees</span>
                      <Users className="w-4 h-4 text-[#0256C4] dark:text-blue-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#0A2540] dark:text-white">1,482</div>
                    <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +24 this month
                    </div>
                  </div>

                  {/* Attendance */}
                  <div className="bg-white dark:bg-[#0D2644] p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-blue-800/80 shadow-xs hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-300 mb-2">
                      <span className="text-xs font-semibold">Attendance</span>
                      <Clock className="w-4 h-4 text-[#84CC16]" />
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#0A2540] dark:text-white">98.4%</div>
                    <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-1">1,458 clocked in</div>
                  </div>

                  {/* Payroll Summary */}
                  <div className="bg-white dark:bg-[#0D2644] p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-blue-800/80 shadow-xs hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-300 mb-2">
                      <span className="text-xs font-semibold">Payroll Status</span>
                      <CreditCard className="w-4 h-4 text-[#0256C4] dark:text-blue-400" />
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-[#84CC16]" /> Processed
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-300 mt-1 font-mono font-medium">₦94.8M / $120k Disbursed</div>
                  </div>

                  {/* Leave Requests */}
                  <div className="bg-white dark:bg-[#0D2644] p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-blue-800/80 shadow-xs hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-300 mb-2">
                      <span className="text-xs font-semibold">Leave Requests</span>
                      <Calendar className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#0A2540] dark:text-white">12</div>
                    <div className="text-[11px] text-amber-600 dark:text-amber-400 font-bold mt-1">Pending Approval</div>
                  </div>
                </div>
              </div>

              {/* Interactive Widget Selector Tabs */}
              <div className="bg-white dark:bg-[#0D2644] rounded-xl border border-slate-200 dark:border-blue-800/80 p-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-blue-900/60 pb-3 mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#0256C4] dark:text-blue-400" />
                    <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                      Live NextSofthr Pulse
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#0A2540] rounded-lg text-xs font-semibold">
                    <button
                      onClick={() => setActiveWidgetTab('payroll')}
                      className={`px-3 py-1 rounded-md transition-all ${
                        activeWidgetTab === 'payroll'
                          ? 'bg-white dark:bg-[#0256C4] text-[#0256C4] dark:text-white shadow-xs font-bold'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Payroll Processing
                    </button>
                    <button
                      onClick={() => setActiveWidgetTab('attendance')}
                      className={`px-3 py-1 rounded-md transition-all ${
                        activeWidgetTab === 'attendance'
                          ? 'bg-white dark:bg-[#0256C4] text-[#0256C4] dark:text-white shadow-xs font-bold'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Live Attendance
                    </button>
                    <button
                      onClick={() => setActiveWidgetTab('headcount')}
                      className={`px-3 py-1 rounded-md transition-all ${
                        activeWidgetTab === 'headcount'
                          ? 'bg-white dark:bg-[#0256C4] text-[#0256C4] dark:text-white shadow-xs font-bold'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      HR Analytics
                    </button>
                  </div>
                </div>

                {/* Tab 1: Payroll Processing Preview */}
                {activeWidgetTab === 'payroll' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                    <div className="p-3 bg-blue-50/70 dark:bg-blue-950/50 rounded-lg border border-blue-100 dark:border-blue-900/60">
                      <span className="text-[11px] font-bold text-blue-900 dark:text-blue-300 uppercase">Gross Payroll</span>
                      <p className="text-base font-bold text-[#0A2540] dark:text-white">₦117,180,450</p>
                      <span className="text-[11px] text-blue-700 dark:text-blue-400">Calculated for 382 staff</span>
                    </div>
                    <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-lg border border-emerald-100 dark:border-emerald-900/60">
                      <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 uppercase">Statutory Deductions</span>
                      <p className="text-base font-bold text-emerald-800 dark:text-emerald-400">₦22,360,000</p>
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400/80">PAYE, NHF &amp; Pension auto-split</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-[#0A2540] rounded-lg border border-slate-200 dark:border-blue-900/60">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">Bank Disbursement</span>
                      <p className="text-base font-bold text-slate-900 dark:text-white">Direct Batch Export</p>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Ready for NIBSS / Bank API</span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Attendance Preview */}
                {activeWidgetTab === 'attendance' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                    <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-lg border border-emerald-100 dark:border-emerald-900/60">
                      <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 uppercase">On-Time Arrivals</span>
                      <p className="text-base font-bold text-[#0A2540] dark:text-white">1,412 Employees (95.2%)</p>
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400">Via mobile GPS &amp; turnstiles</span>
                    </div>
                    <div className="p-3 bg-amber-50/70 dark:bg-amber-950/40 rounded-lg border border-amber-100 dark:border-amber-900/60">
                      <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 uppercase">Grace-Period Logins</span>
                      <p className="text-base font-bold text-amber-800 dark:text-amber-400">46 Employees</p>
                      <span className="text-[11px] text-amber-700 dark:text-amber-400/80">&lt; 15 mins commute window</span>
                    </div>
                    <div className="p-3 bg-blue-50/70 dark:bg-blue-950/50 rounded-lg border border-blue-100 dark:border-blue-900/60">
                      <span className="text-[11px] font-bold text-blue-900 dark:text-blue-300 uppercase">Field / Remote Verified</span>
                      <p className="text-base font-bold text-blue-900 dark:text-white">24 Staff in Transit</p>
                      <span className="text-[11px] text-blue-700 dark:text-blue-400">Client site geofenced check-in</span>
                    </div>
                  </div>
                )}

                {/* Tab 3: HR Analytics Preview */}
                {activeWidgetTab === 'headcount' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                    <div className="p-3 bg-purple-50/70 dark:bg-purple-950/40 rounded-lg border border-purple-100 dark:border-purple-900/60">
                      <span className="text-[11px] font-bold text-purple-900 dark:text-purple-300 uppercase">Employee Retention</span>
                      <p className="text-base font-bold text-[#0A2540] dark:text-white">96.4% Annual Benchmark</p>
                      <span className="text-[11px] text-purple-700 dark:text-purple-400">+3.2% increase vs 2024</span>
                    </div>
                    <div className="p-3 bg-blue-50/70 dark:bg-blue-950/50 rounded-lg border border-blue-100 dark:border-blue-900/60">
                      <span className="text-[11px] font-bold text-blue-900 dark:text-blue-300 uppercase">Avg Performance Score</span>
                      <p className="text-base font-bold text-[#0A2540] dark:text-white">4.8 / 5.0 Q3 Review</p>
                      <span className="text-[11px] text-blue-700 dark:text-blue-400">92% OKR milestone alignment</span>
                    </div>
                    <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-lg border border-emerald-100 dark:border-emerald-900/60">
                      <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 uppercase">Onboarding Speed</span>
                      <p className="text-base font-bold text-emerald-800 dark:text-emerald-400">3 Days to First Productivity</p>
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400">Automated document collection</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Floating UI Elements / Cards as requested in prompt */}
          {/* Card 1: Payroll Processed */}
          <div className="hidden md:flex items-center gap-3 absolute -top-5 -left-6 bg-white/95 dark:bg-[#0D2644]/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-xl border border-slate-200 dark:border-blue-800 animate-float-slow">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-xs">
              ✓
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">Payroll Processed</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">100% Disbursed on Time</div>
            </div>
          </div>

          {/* Card 2: 98% Attendance */}
          <div
            className="hidden md:flex items-center gap-3 absolute -bottom-5 -left-4 bg-white/95 dark:bg-[#0D2644]/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-xl border border-slate-200 dark:border-blue-800 animate-float-slow"
            style={{ animationDelay: '1.2s' }}
          >
            <div className="w-8 h-8 rounded-lg bg-[#84CC16] flex items-center justify-center text-[#0A2540] font-black text-xs">
              98%
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">Punctual Attendance</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-300">Biometric &amp; GPS Verified</div>
            </div>
          </div>

          {/* Card 3: 12 Leave Requests */}
          <div
            className="hidden md:flex items-center gap-3 absolute -top-6 -right-6 bg-white/95 dark:bg-[#0D2644]/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-xl border border-slate-200 dark:border-blue-800 animate-float-slow"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              12
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">Leave Requests</div>
              <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">1-Tap Manager Approval</div>
            </div>
          </div>

          {/* Card 4: +24 New Employees */}
          <div
            className="hidden md:flex items-center gap-3 absolute -bottom-5 -right-4 bg-white/95 dark:bg-[#0D2644]/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-xl border border-slate-200 dark:border-blue-800 animate-float-slow"
            style={{ animationDelay: '1.8s' }}
          >
            <div className="w-8 h-8 rounded-lg bg-[#0A2540] dark:bg-blue-900 flex items-center justify-center text-[#84CC16] font-extrabold text-xs">
              +24
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">New Employees</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-300">Digital Onboarding Complete</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
