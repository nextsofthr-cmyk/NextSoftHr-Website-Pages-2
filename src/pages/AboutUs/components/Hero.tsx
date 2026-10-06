import React, { useState } from 'react';
import {
  ArrowRight,
  Headphones,
  Users,
  Wallet,
  Clock,
  Calendar,
  BarChart3,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Shield,
  Layers
} from 'lucide-react';

interface HeroProps {
  onOpenGetStarted: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenGetStarted, onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'payroll' | 'attendance' | 'leave'>('overview');

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#0A2540] via-[#0B3B73] to-[#0A2540] dark:from-[#050e18] dark:via-[#091f3c] dark:to-[#071322] text-white pt-12 pb-24 lg:pt-20 lg:pb-32 transition-colors duration-300">
      {/* Decorative Grid & Glow Effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#84CC16_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#84CC16]/15 via-blue-500/20 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Eyebrow Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-100 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse"></span>
            <span>All-in-One African & Global Enterprise SaaS</span>
            <span className="text-[#84CC16]">•</span>
            <span className="text-slate-200">About NextSofthr</span>
          </div>
        </div>

        {/* Main Hero Typography */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Empowering Businesses Through Smarter{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-[#84CC16]">
              People & Business Management
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto font-normal">
            NextSofthr brings HR, payroll and essential business management tools
            together in one intelligent platform—helping organizations across Africa
            and around the world manage their people, automate processes and build
            better businesses.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#84CC16] hover:bg-[#74be12] text-[#0A2540] font-extrabold px-8 py-4 rounded-xl text-base shadow-lg shadow-[#84CC16]/25 hover:shadow-xl transition-all group cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-7 py-4 rounded-xl text-base border border-white/20 backdrop-blur-md transition-all group cursor-pointer"
            >
              <Headphones className="w-5 h-5 text-[#84CC16]" />
              <span>Talk to Our Team</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#84CC16]" />
              <span>Zero Complicated Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#84CC16]" />
              <span>Pan-African & Global Tax Compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#84CC16]" />
              <span>Bank-Grade Data Encryption</span>
            </div>
          </div>
        </div>

        {/* Hero Visual: Blended African Business Environment & SaaS Interface */}
        <div className="mt-14 relative max-w-6xl mx-auto">
          {/* Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#84CC16]/40 via-blue-500/30 to-[#84CC16]/30 rounded-2xl blur-lg opacity-60"></div>

          <div className="relative bg-slate-900/90 rounded-2xl border border-white/20 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Window Bar */}
            <div className="bg-[#0A2540] px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-[#84CC16]"></div>
                <span className="ml-2 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
                  app.nextsofthr.org / Executive Workspace
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 text-xs">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-[#84CC16] text-[#0A2540] font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Operations Overview
                </button>
                <button
                  onClick={() => setActiveTab('payroll')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    activeTab === 'payroll'
                      ? 'bg-[#84CC16] text-[#0A2540] font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Automated Payroll
                </button>
                <button
                  onClick={() => setActiveTab('attendance')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    activeTab === 'attendance'
                      ? 'bg-[#84CC16] text-[#0A2540] font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Attendance & Rosters
                </button>
                <button
                  onClick={() => setActiveTab('leave')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    activeTab === 'leave'
                      ? 'bg-[#84CC16] text-[#0A2540] font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Leave Management
                </button>
              </div>
            </div>

            {/* Main Interactive Workspace Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-7">
              {/* Left Column: Authentic African Business Collaboration Photography */}
              <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-white/15 group">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
                  alt="African HR Director collaborating with technology team in modern office"
                  className="w-full h-full object-cover min-h-[320px] max-h-[460px] group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/40 to-transparent"></div>

                {/* Floating Real-world African business context pill */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#84CC16]" />
                      African Enterprise in Action
                    </span>
                    <span className="bg-[#84CC16]/20 text-[#84CC16] px-1.5 py-0.5 rounded text-[10px] font-bold">
                      Real Collaboration
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Diverse HR leaders, entrepreneurs, and payroll professionals
                    streamlining operations seamlessly across regional offices.
                  </p>
                </div>
              </div>

              {/* Right Column: Live NextSofthr SaaS Dashboard */}
              <div className="lg:col-span-7 space-y-4">
                {/* Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-[11px] text-slate-400">Total Workforce</div>
                    <div className="text-xl font-extrabold text-white mt-0.5">342</div>
                    <div className="text-[10px] text-[#84CC16] flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3 h-3" /> +14 this quarter
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-[11px] text-slate-400">Payroll Cycle</div>
                    <div className="text-xl font-extrabold text-[#84CC16] mt-0.5">100%</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Tax & Pension audited</div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-[11px] text-slate-400">Today's Attendance</div>
                    <div className="text-xl font-extrabold text-white mt-0.5">98.2%</div>
                    <div className="text-[10px] text-blue-300 mt-0.5">Geo-clocked in</div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-[11px] text-slate-400">AI Assistant</div>
                    <div className="text-xl font-extrabold text-emerald-400 mt-0.5 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-[#84CC16]" /> Ready
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">0 compliance flags</div>
                  </div>
                </div>

                {/* Dynamic Content Panel based on Tab */}
                {activeTab === 'overview' && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                      <span className="font-bold text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#84CC16]" />
                        Active Operational Pulse
                      </span>
                      <span className="text-slate-400 text-[11px]">Synced 2 mins ago</span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between bg-slate-800/60 p-2.5 rounded-lg text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#0B3B73] flex items-center justify-center font-bold text-white text-xs border border-[#84CC16]/30">
                            AO
                          </div>
                          <div>
                            <div className="font-semibold text-white">Amina Okonjo</div>
                            <div className="text-[10px] text-slate-400">Head of People & Culture • Lagos HQ</div>
                          </div>
                        </div>
                        <span className="bg-[#84CC16]/20 text-[#84CC16] text-[10px] font-bold px-2 py-0.5 rounded">
                          Approved 3 Leave Requests
                        </span>
                      </div>

                      <div className="flex items-center justify-between bg-slate-800/60 p-2.5 rounded-lg text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-emerald-900/60 flex items-center justify-center font-bold text-[#84CC16] text-xs">
                            <Wallet className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">March Statutory Remittance Schedule</div>
                            <div className="text-[10px] text-slate-400">PAYE, Pension, NHF & State Levies reconciled</div>
                          </div>
                        </div>
                        <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded">
                          Disbursement Ready
                        </span>
                      </div>

                      <div className="flex items-center justify-between bg-slate-800/60 p-2.5 rounded-lg text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-purple-900/60 flex items-center justify-center font-bold text-purple-300 text-xs">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">Logistics & Branch Shift Rotation</div>
                            <div className="text-[10px] text-slate-400">12 branch shifts active • 0 unassigned shifts</div>
                          </div>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                          100% Covered
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'payroll' && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                      <span className="font-bold text-white flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-[#84CC16]" />
                        Automated Multi-Jurisdiction Payroll
                      </span>
                      <span className="bg-[#84CC16]/20 text-[#84CC16] font-bold text-[10px] px-2 py-0.5 rounded">
                        1-Click Processing
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 bg-slate-800/80 rounded-lg">
                        <div className="text-[10px] text-slate-400">Gross Salaries</div>
                        <div className="font-bold text-white">₦52,400,000</div>
                      </div>
                      <div className="p-2 bg-slate-800/80 rounded-lg">
                        <div className="text-[10px] text-slate-400">Statutory PAYE/Pension</div>
                        <div className="font-bold text-[#84CC16]">₦9,180,000</div>
                      </div>
                      <div className="p-2 bg-slate-800/80 rounded-lg">
                        <div className="text-[10px] text-slate-400">Net Disbursement</div>
                        <div className="font-bold text-white">₦43,220,000</div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300">
                      Calculates employee compensation, deductions, loan repayments, and tax brackets
                      automatically across Nigeria, Kenya, Ghana, South Africa, and international hires.
                    </p>
                  </div>
                )}

                {activeTab === 'attendance' && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                      <span className="font-bold text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#84CC16]" />
                        Time & Attendance Tracking
                      </span>
                      <span className="text-slate-400 text-[11px]">Geo-fenced Mobile & Biometric</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center p-2 bg-slate-800/80 rounded-lg">
                        <span className="text-slate-200">On-Time Punch In Rate</span>
                        <span className="text-[#84CC16] font-bold">96.8%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-800/80 rounded-lg">
                        <span className="text-slate-200">Shift Swaps Approved</span>
                        <span className="text-blue-300 font-bold">14 Requests</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-800/80 rounded-lg">
                        <span className="text-slate-200">Overtime Pre-Authorization</span>
                        <span className="text-white font-bold">Synced with Payroll</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'leave' && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                      <span className="font-bold text-white flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#84CC16]" />
                        Leave & PTO Management
                      </span>
                      <span className="text-[#84CC16] text-[10px] font-bold">Transparent Visibility</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-slate-800/80 rounded-lg">
                        <div className="text-[10px] text-slate-400">Annual Leave Utilization</div>
                        <div className="text-base font-bold text-white">64%</div>
                        <div className="text-[10px] text-slate-400">Balanced department cover</div>
                      </div>
                      <div className="p-2.5 bg-slate-800/80 rounded-lg">
                        <div className="text-[10px] text-slate-400">Average Approval Speed</div>
                        <div className="text-base font-bold text-[#84CC16]">&lt; 1.5 hrs</div>
                        <div className="text-[10px] text-slate-400">Via mobile & WhatsApp bot</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Status Bar */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#84CC16]" />
                    Enterprise Security Standard ISO-27001 / NDPR Compliant
                  </span>
                  <span className="text-[#84CC16] font-semibold">
                    Built for Africa • Global Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
