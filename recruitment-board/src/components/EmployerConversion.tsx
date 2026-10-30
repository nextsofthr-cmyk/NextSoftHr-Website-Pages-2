import React from 'react';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  ShieldCheck 
} from 'lucide-react';

interface EmployerConversionProps {
  onCreateEmployerAccount: () => void;
  onSpeakToTeam: () => void;
}

export const EmployerConversion: React.FC<EmployerConversionProps> = ({
  onCreateEmployerAccount,
  onSpeakToTeam
}) => {
  return (
    <section id="for-employers" className="py-20 bg-[#142B4A] dark:bg-[#070B14] text-white relative overflow-hidden transition-colors duration-300">
      {/* Decorative ambient lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <span>NextSoftHR for Enterprise & Growing Businesses</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Your Next Great Hire Is Closer Than You Think.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Bring your hiring activities into one organized experience. Publish vacancies, manage applicants, strengthen your employer brand, and access recruitment support when you need it.
            </p>

            {/* Three Benefit Points */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Reach relevant candidates</h3>
                  <p className="text-xs text-slate-300 mt-0.5">Publish positions to targeted talent networks across Nigeria, Africa, and verified diaspora communities.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Organize recruitment workflows</h3>
                  <p className="text-xs text-slate-300 mt-0.5">Manage screening stages, interviewer feedback scorecards, and candidate communications in one audit-ready console.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Scale your hiring approach as your business grows</h3>
                  <p className="text-xs text-slate-300 mt-0.5">Seamlessly switch between self-service job postings, embedded RPO teams, and C-suite executive headhunting.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onCreateEmployerAccount}
                className="px-6 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center gap-2 active:scale-[0.98]"
              >
                <span>Create Employer Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onSpeakToTeam}
                className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-lime-400" />
                <span>Speak to Our Recruitment Team</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 italic">
              Reassurance: Choose self-service recruitment, professional recruitment support, or a combination of both.
            </p>
          </div>

          {/* Right Column: Interactive Hiring Metrics Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 dark:bg-[#0B1120] rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-5 transition-colors duration-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-semibold text-slate-400">Employer Impact Benchmarks</span>
                <span className="text-[11px] font-mono text-lime-400">NextSoftHR Metric Ledger</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-800/60 dark:bg-[#0F172A] border border-slate-700/50 dark:border-slate-800 transition-colors duration-300">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-white tabular-nums">40% Less</span>
                    <span className="text-xs font-semibold text-lime-400">Time-to-Hire</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Accelerated candidate shortlisting through pre-screened talent pools & ATS scorecards.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 dark:bg-[#0F172A] border border-slate-700/50 dark:border-slate-800 transition-colors duration-300">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-white tabular-nums">1-Click</span>
                    <span className="text-xs font-semibold text-blue-400">Payroll Integration</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Directly generate employee records, statutory tax codes, and payroll profiles in NextSoftHR Core.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 dark:bg-[#0F172A] border border-slate-700/50 dark:border-slate-800 transition-colors duration-300">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-white tabular-nums">100% Verified</span>
                    <span className="text-xs font-semibold text-lime-400">Credentials Check</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Full educational, criminal, and previous employer verification for peace of mind.</p>
                </div>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-slate-400">
                  Already using NextSoftHR HRMS? Sign in to unlock instant ATS synchronization.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
