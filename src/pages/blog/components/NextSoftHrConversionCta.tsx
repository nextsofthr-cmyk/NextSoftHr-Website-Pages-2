import React from 'react';
import { ArrowRight, Users, CreditCard, Clock, Calendar, Briefcase, Award, CheckSquare, BarChart3, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NextSoftHrConversionCtaProps {
  onOpenGetStarted: () => void;
  onOpenBookDemo: () => void;
}

export const NextSoftHrConversionCta: React.FC<NextSoftHrConversionCtaProps> = ({
  onOpenGetStarted,
  onOpenBookDemo,
}) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-b from-[#051A33] to-[#031124] text-white relative overflow-hidden">
      {/* Background Subtle Geometric Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
        backgroundSize: '28px 28px',
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0A3F7E]/30 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Pitch Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#8EE000] border border-white/15">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('cta.ecosystem', 'NextSoftHr Global SaaS Ecosystem')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-heading">
            {t('cta.title', 'Ready to Build a Smarter Workplace?')}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t('cta.subtitle', 'Manage HR, payroll, attendance, talent, finance and business operations from one intelligent platform.')}
          </p>


          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenGetStarted}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] shadow-lg transition-all active:scale-[0.98] border border-[#7BC500]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBookDemo}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
            >
              <span>Book a Demo</span>
            </button>
          </div>
        </div>

        {/* NextSoftHr Dashboard Mockup with all 8 requested cards */}
        <div className="bg-[#0A3F7E]/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl max-w-6xl mx-auto">
          {/* Mockup Toolbar Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#8EE000]" />
              <span className="font-bold text-white text-sm">NextSoftHr Enterprise Command Center</span>
              <span className="hidden sm:inline text-slate-400 font-mono">v2026.4 Multi-Entity Live</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#8EE000]">
              <span>Synchronized: Pan-African & Global Hubs</span>
            </div>
          </div>

          {/* 8 Dashboard Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Card 1: Total Employees */}
            <div className="bg-[#051A33]/80 p-4 rounded-2xl border border-white/10 space-y-2 hover:border-[#8EE000]/40 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Employees</span>
                <Users className="w-4 h-4 text-[#8EE000]" />
              </div>
              <div className="text-2xl font-black text-white tabular-nums">1,482</div>
              <div className="text-[11px] text-emerald-400 font-semibold">+18 added this cycle</div>
            </div>

            {/* Card 2: Payroll */}
            <div className="bg-[#051A33]/80 p-4 rounded-2xl border border-white/10 space-y-2 hover:border-[#8EE000]/40 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Payroll</span>
                <CreditCard className="w-4 h-4 text-[#8EE000]" />
              </div>
              <div className="text-2xl font-black text-white">Disbursed</div>
              <div className="text-[11px] text-[#8EE000] font-semibold">100% Statutory Compliant</div>
            </div>

            {/* Card 3: Attendance */}
            <div className="bg-[#051A33]/80 p-4 rounded-2xl border border-white/10 space-y-2 hover:border-[#8EE000]/40 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Attendance</span>
                <Clock className="w-4 h-4 text-[#8EE000]" />
              </div>
              <div className="text-2xl font-black text-white tabular-nums">98.6%</div>
              <div className="text-[11px] text-slate-300">Geofence & Biometric</div>
            </div>

            {/* Card 4: Leave */}
            <div className="bg-[#051A33]/80 p-4 rounded-2xl border border-white/10 space-y-2 hover:border-[#8EE000]/40 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Leave</span>
                <Calendar className="w-4 h-4 text-[#8EE000]" />
              </div>
              <div className="text-2xl font-black text-white tabular-nums">12 Active</div>
              <div className="text-[11px] text-amber-300 font-medium">3 Pending Approval</div>
            </div>

            {/* Card 5: Recruitment */}
            <div className="bg-[#051A33]/80 p-4 rounded-2xl border border-white/10 space-y-2 hover:border-[#8EE000]/40 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Recruitment</span>
                <Briefcase className="w-4 h-4 text-[#8EE000]" />
              </div>
              <div className="text-2xl font-black text-white tabular-nums">8 Roles</div>
              <div className="text-[11px] text-slate-300">42 In Final Scorecard</div>
            </div>

            {/* Card 6: Performance */}
            <div className="bg-[#051A33]/80 p-4 rounded-2xl border border-white/10 space-y-2 hover:border-[#8EE000]/40 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Performance</span>
                <Award className="w-4 h-4 text-[#8EE000]" />
              </div>
              <div className="text-2xl font-black text-white tabular-nums">92.4%</div>
              <div className="text-[11px] text-emerald-400 font-semibold">Q3 OKR Target Met</div>
            </div>

            {/* Card 7: HR Tasks */}
            <div className="bg-[#051A33]/80 p-4 rounded-2xl border border-white/10 space-y-2 hover:border-[#8EE000]/40 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>HR Tasks</span>
                <CheckSquare className="w-4 h-4 text-[#8EE000]" />
              </div>
              <div className="text-2xl font-black text-white tabular-nums">94% Done</div>
              <div className="text-[11px] text-slate-300">Automated Line Routing</div>
            </div>

            {/* Card 8: Workforce Analytics */}
            <div className="bg-[#051A33]/80 p-4 rounded-2xl border border-white/10 space-y-2 hover:border-[#8EE000]/40 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Workforce Analytics</span>
                <BarChart3 className="w-4 h-4 text-[#8EE000]" />
              </div>
              <div className="text-2xl font-black text-white tabular-nums">Optimal</div>
              <div className="text-[11px] text-[#8EE000] font-semibold">AI Decision Support Active</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
