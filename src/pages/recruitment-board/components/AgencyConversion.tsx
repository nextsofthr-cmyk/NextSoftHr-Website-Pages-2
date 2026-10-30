import React from 'react';
import { 
  Users2, 
  Layers, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Briefcase, 
  LineChart 
} from 'lucide-react';

interface AgencyConversionProps {
  onJoinRecruiterNetwork: () => void;
  onExploreAgencyFeatures: () => void;
}

export const AgencyConversion: React.FC<AgencyConversionProps> = ({
  onJoinRecruiterNetwork,
  onExploreAgencyFeatures
}) => {
  return (
    <section className="py-20 bg-slate-900 dark:bg-[#070B14] text-white border-b border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-[#0B1120] dark:via-[#0F172A] dark:to-[#0B1120] rounded-3xl p-8 sm:p-12 border border-slate-700/80 dark:border-slate-800 shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/20 dark:bg-lime-950/40 border border-lime-400/30 dark:border-lime-400/30 text-lime-300 dark:text-lime-400 text-xs font-semibold uppercase tracking-wider">
                <Users2 className="w-3.5 h-3.5" />
                <span>For Professional Recruiters & Headhunting Firms</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Your Recruitment Expertise. <br />
                <span className="text-lime-400">A More Connected Platform.</span>
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Connect with employers, organize recruitment assignments, showcase your expertise, and grow your placement opportunities through the NextSoftHR recruitment ecosystem.
              </p>

              {/* Recruiter Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Professional verified agency profile</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Supported employer vacancy workflows</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Candidate & assignment management</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Placement visibility & reporting</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200 sm:col-span-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Co-brokerage opportunities on confidential executive briefs</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onJoinRecruiterNetwork}
                  className="px-6 py-3.5 bg-[#0F9D8A] hover:bg-[#0C7F6F] text-white text-sm font-semibold rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2"
                >
                  <span>Join the Recruiter Network</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onExploreAgencyFeatures}
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-sm font-semibold rounded-xl transition-colors"
                >
                  Explore Agency Features
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                NextSoftHR maintains strict data privacy. Independent agencies operate their private candidate databases without unauthorized disclosure.
              </p>
            </div>

            {/* Right side agency features visual box */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-700/60 space-y-4">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
                  <span className="font-semibold text-slate-300">Supported Placement Models</span>
                  <span className="text-[10px] text-lime-400 font-mono">AGENCY CONSOLE</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Executive Search & Retained Search</span>
                      <span className="text-[11px] text-slate-400">Senior leadership & board advisory assignments</span>
                    </div>
                    <span className="text-lime-400 font-semibold text-[11px]">Retained</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Specialist Permanent Placements</span>
                      <span className="text-[11px] text-slate-400">Technical, commercial & financial talent</span>
                    </div>
                    <span className="text-blue-400 font-semibold text-[11px]">Direct Hire</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Contract & Temporary Staffing</span>
                      <span className="text-[11px] text-slate-400">Timesheets, billing & contract compliance</span>
                    </div>
                    <span className="text-purple-400 font-semibold text-[11px]">Flexible</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-lime-950/40 border border-lime-800/40 text-[11px] text-lime-200">
                  Registered recruitment agencies undergo credential verification to maintain high employer trust across the marketplace.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
