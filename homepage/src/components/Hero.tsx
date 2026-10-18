import { useState } from 'react';
import { 
  CheckCircle2, ArrowRight, Play, Shield, Globe2, Sparkles, 
  TrendingUp, Users, CreditCard, Clock, Calendar, Check, X,
  FileCheck, AlertCircle, Laptop, Bell
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

interface HeroProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
  onOpenExpert: () => void;
  onOpenPayslip: () => void;
}

export const Hero = ({ onOpenDemo, onOpenGetStarted, onOpenExpert, onOpenPayslip }: HeroProps) => {
  const { dict } = useLanguage();
  const { formatMoney, currencyInfo } = useCurrency();
  const [leaveStatus, setLeaveStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [payrollStatus, setPayrollStatus] = useState<'ready' | 'processing' | 'disbursed'>('ready');
  const [activeTab, setActiveTab] = useState<'overview' | 'payroll' | 'attendance'>('overview');

  const handleApproveLeave = () => {
    setLeaveStatus('approved');
    setTimeout(() => setLeaveStatus('pending'), 4000);
  };

  const handleProcessPayroll = () => {
    setPayrollStatus('processing');
    setTimeout(() => {
      setPayrollStatus('disbursed');
      setTimeout(() => setPayrollStatus('ready'), 5000);
    }, 1200);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-blue-50/40 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      
      {/* Background soft decorative ambient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-blue-200/30 to-lime-200/25 dark:from-blue-900/20 dark:to-lime-900/10 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-300/15 dark:bg-blue-600/10 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust / Category Tag */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-4 animate-fadeIn">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
            </span>
            <span className="text-blue-700 dark:text-blue-400 font-bold">{dict.hero.badgeEdition}</span>
            <span className="text-slate-600 dark:text-slate-400">{dict.hero.badgeSubtitle}</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            {dict.hero.headlineStart} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-slate-900 dark:from-blue-400 dark:via-blue-300 dark:to-slate-100">
              {dict.hero.headlineHighlight}
            </span>{' '}
            {dict.hero.headlineEnd}
          </h1>

          {/* Supporting Headline */}
          <p className="font-display text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 mt-4 max-w-2xl">
            {dict.hero.supportingHeadline}
          </p>

          {/* Hero Description */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-3 max-w-3xl leading-relaxed">
            {dict.hero.description}
          </p>

          {/* Conversion CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8 w-full sm:w-auto">
            <a
              id="hero-get-started-cta"
              href="/signup"
              className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{dict.hero.ctaGetStarted}</span>
              <ArrowRight className="w-4 h-4 text-lime-400 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              id="hero-explore-demo-cta"
              href="https://demo.scriptmaster.store/login"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-slate-950 bg-[#84cc16] hover:bg-[#74be12] rounded-xl shadow-lg shadow-lime-500/25 transition-all flex items-center justify-center gap-2 group hover:-translate-y-0.5 cursor-pointer"
            >
              <Play className="w-4 h-4 text-slate-950 fill-current" />
              <span>Explore Demo</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              id="hero-talk-expert-cta"
              onClick={onOpenExpert}
              className="w-full sm:w-auto px-5 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{dict.hero.ctaTalkExpert}</span>
              <span className="text-lime-600 dark:text-lime-400 font-bold">→</span>
            </button>
          </div>

          {/* Trust Message */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-5">
            <Shield className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            <span>{dict.hero.trustEnterprise}</span>
          </div>
        </div>

        {/* Global Stats / Proof ribbon */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 text-center">
          <div className="p-3 bg-white/70 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm">
            <div className="text-2xl font-extrabold text-blue-700 dark:text-blue-400">{dict.hero.statPayrollAccuracy}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{dict.hero.statPayrollLabel}</div>
          </div>
          <div className="p-3 bg-white/70 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm">
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{dict.hero.statJurisdictions}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{dict.hero.statJurisdictionsLabel}</div>
          </div>
          <div className="p-3 bg-white/70 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm">
            <div className="text-2xl font-extrabold text-lime-700 dark:text-lime-400">{dict.hero.statTimeSaved}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{dict.hero.statTimeSavedLabel}</div>
          </div>
          <div className="p-3 bg-white/70 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm">
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{dict.hero.statSupport}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{dict.hero.statSupportLabel}</div>
          </div>
        </div>

        {/* Hero Visual: Sophisticated SaaS Dashboard Mockup */}
        <div className="relative max-w-6xl mx-auto">
          {/* Glowing framing container */}
          <div className="p-2 sm:p-3 rounded-3xl bg-gradient-to-b from-slate-200/70 via-blue-200/40 to-slate-200/60 dark:from-slate-800 dark:via-blue-950/40 dark:to-slate-900 shadow-2xl shadow-blue-900/10 border border-white/60 dark:border-slate-800">
            
            {/* Dashboard Mockup Shell */}
            <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-inner">
              
              {/* Dashboard Topbar */}
              <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block"></div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                    <span className="font-bold text-lime-400">app.nextsofthr.com</span>
                    <span className="text-slate-500 hidden md:inline">/ executive-cockpit</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-blue-950/80 border border-blue-800 rounded-lg text-xs text-blue-300">
                    <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                    <span>AI Assistant Online</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs ring-2 ring-lime-400">
                    NX
                  </div>
                </div>
              </div>

              {/* Sub-navigation inside dashboard */}
              <div className="bg-slate-50/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-2.5 flex items-center justify-between overflow-x-auto">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {dict.hero.tabOverview}
                  </button>
                  <button 
                    onClick={() => setActiveTab('payroll')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeTab === 'payroll' ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {dict.hero.tabPayroll}
                  </button>
                  <button 
                    onClick={() => setActiveTab('attendance')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeTab === 'attendance' ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {dict.hero.tabAttendance}
                  </button>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hidden md:inline">
                    {dict.hero.payPeriod}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                    ● {dict.hero.realtimeSync}
                  </span>
                </div>
              </div>

              {/* Dashboard Content Grid */}
              <div className="p-4 sm:p-6 bg-slate-100/60 dark:bg-slate-950/80 space-y-4">
                
                {/* Metric Summary Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  
                  {/* Card 1: Employee Count */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1.5">
                      <span className="text-xs font-semibold">{dict.hero.totalEmployees}</span>
                      <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-slate-900 dark:text-white">2,840</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+42 this mo</span>
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">14 Global Branches • 98% Active</div>
                  </div>

                  {/* Card 2: Payroll Summary */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1.5">
                      <span className="text-xs font-semibold">{dict.hero.payrollRun}</span>
                      <CreditCard className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{formatMoney(842500)}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-400 border border-lime-200 dark:border-lime-800">
                        Audited ({currencyInfo.code})
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Zero tax anomalies detected</div>
                  </div>

                  {/* Card 3: Attendance Rate */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1.5">
                      <span className="text-xs font-semibold">{dict.hero.todayAttendance}</span>
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-slate-900 dark:text-white">97.4%</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">On-Time</span>
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">2,766 Clocked in • 74 On Leave</div>
                  </div>

                  {/* Card 4: Recruitment Pipeline */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1.5">
                      <span className="text-xs font-semibold">{dict.hero.recruitmentPipeline}</span>
                      <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-slate-900 dark:text-white">34 Active</span>
                      <span className="text-xs font-bold text-purple-600 dark:text-purple-400">4 Offers Out</span>
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Avg time-to-hire: 16 days</div>
                  </div>
                </div>

                {/* Second Row: Interactive Action Widgets */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  
                  {/* Left Column: Payroll Processing Status & Action */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Payroll Processing Engine</h4>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          AUTO-TAX • {currencyInfo.code}
                        </span>
                      </div>

                      <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl space-y-2 text-xs border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Gross Salaries</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{formatMoney(842500, { showDecimals: true })}</span>
                        </div>
                        <div className="flex justify-between text-rose-600 dark:text-rose-400">
                          <span>Taxes & Deductions</span>
                          <span className="font-bold">-{formatMoney(215280, { showDecimals: true })}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700 font-extrabold text-blue-900 dark:text-blue-300">
                          <span>Net Disbursable</span>
                          <span>{formatMoney(627220, { showDecimals: true })}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs">
                        <div className={`w-2.5 h-2.5 rounded-full ${payrollStatus === 'disbursed' ? 'bg-emerald-500' : 'bg-lime-500 animate-pulse'}`} />
                        <span className="text-slate-600 dark:text-slate-300">
                          {payrollStatus === 'disbursed' ? 'Disbursed to 2,840 bank accounts' : payrollStatus === 'processing' ? 'Calculating local tax brackets...' : 'Pre-flight verified • Ready to disburse'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-2">
                      <button
                        onClick={handleProcessPayroll}
                        disabled={payrollStatus === 'processing'}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                      >
                        {payrollStatus === 'disbursed' ? '✓ Processed' : payrollStatus === 'processing' ? 'Processing...' : dict.hero.run1ClickPayroll}
                      </button>
                      <button
                        onClick={onOpenPayslip}
                        className="px-3 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        {dict.hero.samplePayslip}
                      </button>
                    </div>
                  </div>

                  {/* Middle Column: Leave Requests & Shifts */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{dict.hero.pendingLeave}</h4>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          1 Action Required
                        </span>
                      </div>

                      {/* Interactive Leave Card */}
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <img 
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                              alt="Kavita" 
                              className="w-8 h-8 rounded-full object-cover border border-white dark:border-slate-700 ring-1 ring-slate-200 dark:ring-slate-700"
                            />
                            <div>
                              <p className="font-bold text-xs text-slate-900 dark:text-white">Kavita Patel</p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400">Sr. Product Manager • Annual Leave</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                            Sep 22 - 25
                          </span>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-200/80 dark:border-slate-700/80 text-[11px]">
                          <span className="text-slate-500 dark:text-slate-400">Balance: 14 days left</span>
                          {leaveStatus === 'pending' ? (
                            <div className="flex gap-1.5">
                              <button
                                onClick={handleApproveLeave}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[10px] transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <Check className="w-3 h-3" /> Approve
                              </button>
                              <button
                                onClick={() => setLeaveStatus('rejected')}
                                className="px-2 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded text-[10px] transition-colors cursor-pointer"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Approved & Synced
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Upcoming shift snippet */}
                      <div className="mt-3 flex items-center justify-between text-xs p-2 bg-blue-50/60 dark:bg-blue-950/40 rounded-lg text-blue-950 dark:text-blue-200 border border-blue-100 dark:border-blue-900/50">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>London Night Shift Roster (8 staff)</span>
                        </div>
                        <span className="font-bold text-lime-700 dark:text-lime-400">100% Covered</span>
                      </div>
                    </div>

                    <div className="pt-3 text-right">
                      <a href="#shifts" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                        Open Full Schedule Roster →
                      </a>
                    </div>
                  </div>

                  {/* Right Column: AI HR Assistant Quick Widget */}
                  <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-5 rounded-xl shadow-md flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 rounded-full blur-2xl pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-lg bg-lime-400 text-slate-950">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                          <h4 className="font-bold text-white text-sm">{dict.hero.aiPromptHeadline}</h4>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30">
                          Active
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                        Instant intelligent answers for labor laws, payroll calculations, and workforce insights.
                      </p>

                      <div className="space-y-2">
                        <div className="p-2.5 rounded-lg bg-white/10 text-xs border border-white/10 text-slate-200">
                          <span className="text-lime-300 font-semibold block mb-0.5">Prompt:</span>
                          “Calculate this month's payroll.”
                        </div>
                        <div className="p-2 rounded-lg bg-blue-900/60 text-[11px] text-blue-100 border border-blue-700/50">
                          <span className="font-bold text-lime-400">AI Response:</span> 14 entities audited. Zero anomalies. $627,220 net ready for disbursement.
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <a
                        href="#ai-assistant"
                        className="w-full bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold py-2 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        Try AI Assistant Prompts
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* International Team Imagery Banner */}
                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <img className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-800 object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" alt="Team member" />
                      <img className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-800 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Team member" />
                      <img className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-800 object-cover" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80" alt="Team member" />
                      <img className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-800 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Team member" />
                    </div>
                    <span>
                      Empowering global HR, finance leaders, and hybrid teams worldwide.
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" /> ISO 27001 Ready
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" /> GDPR & Statutory Compliant
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
