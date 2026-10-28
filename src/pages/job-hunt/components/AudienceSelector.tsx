import React from 'react';
import { 
  UserSearch, 
  Building2, 
  Users2, 
  Handshake, 
  ArrowRight, 
  Check 
} from 'lucide-react';
import { UserRole } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AudienceSelectorProps {
  onSelectRoleJourney: (role: UserRole) => void;
  onOpenSearch: () => void;
  onOpenEmployerModal: () => void;
  onOpenAuth: (mode: 'login' | 'register', role?: UserRole) => void;
  onOpenCandidateDashboard?: () => void;
  onOpenRecruiterPortal?: () => void;
}

export const AudienceSelector: React.FC<AudienceSelectorProps> = ({
  onSelectRoleJourney,
  onOpenSearch,
  onOpenEmployerModal,
  onOpenAuth,
  onOpenCandidateDashboard,
  onOpenRecruiterPortal
}) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <p className="text-xs uppercase tracking-widest font-bold text-[#2563EB] dark:text-lime-400">
            Unified Recruitment Ecosystem
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] dark:text-white tracking-tight">
            {t('audience.title', 'What brings you to NextSoftHR?')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            {t('audience.subtitle', 'Select your dedicated pathway to access tailored tools, workflows, and commercial opportunities across our recruitment marketplace.')}
          </p>
        </div>

        {/* 4 User Journey Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Job Seekers */}
          <div className="bg-slate-50/80 dark:bg-[#0F172A] hover:bg-white dark:hover:bg-[#131D31] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-lime-400/40 shadow-xs hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100/80 dark:bg-blue-950/80 text-[#2563EB] dark:text-lime-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <UserSearch className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-blue-400">For Candidates</span>
                <h3 className="text-lg font-bold text-[#142B4A] dark:text-white mt-1 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                  Find Your Next Career Opportunity.
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Search verified job opportunities, create your professional profile, upload your CV, and apply for roles that match your skills.
              </p>
              
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Job search & multi-facet filtering</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Candidate profile & CV management</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Real-time application tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Saved jobs & personalized alerts</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
              <button
                onClick={() => onOpenCandidateDashboard ? onOpenCandidateDashboard() : onOpenSearch()}
                className="w-full py-2.5 px-4 bg-lime-600 hover:bg-lime-700 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Candidate Dashboard (NLP Auto-Fill)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenSearch()}
                className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Explore Jobs Directory</span>
              </button>
            </div>
          </div>

          {/* Card 2: Employers & HR Teams */}
          <div className="bg-slate-50/80 dark:bg-[#0F172A] hover:bg-white dark:hover:bg-[#131D31] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 hover:border-[#142B4A] dark:hover:border-blue-500/50 shadow-xs hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 flex flex-col justify-between group relative">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#142B4A] dark:text-blue-400">For Employers</span>
                <h3 className="text-lg font-bold text-[#142B4A] dark:text-white mt-1 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                  Build Your Team with Confidence.
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Manage recruitment through your NextSoftHR account, publish vacancies, review applications, and streamline your hiring process.
              </p>
              
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Job posting & vacancy management</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Applicant tracking & scorecards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Interview scheduling & pipelines</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Integrated NextSoftHR Core HRMS</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
              <button
                onClick={() => onOpenEmployerModal()}
                className="w-full py-2.5 px-4 bg-[#142B4A] hover:bg-[#1E3A5F] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Hire with NextSoftHR</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 pt-1">
                Already using NextSoftHR?{' '}
                <button
                  onClick={() => onOpenAuth('login', 'employer')}
                  className="text-[#2563EB] dark:text-blue-400 font-semibold hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>

          {/* Card 3: Recruitment Agencies & Headhunters */}
          <div className="bg-slate-50/80 dark:bg-[#0F172A] hover:bg-white dark:hover:bg-[#131D31] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 hover:border-teal-300 dark:hover:border-lime-400/40 shadow-xs hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-lime-100/80 dark:bg-lime-950/80 text-lime-600 dark:text-lime-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-lime-600 dark:text-lime-400">Recruiters & Search</span>
                <h3 className="text-lg font-bold text-[#142B4A] dark:text-white mt-1 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                  Grow Your Recruitment Business.
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Manage recruitment assignments, source candidates, support client hiring, and collaborate with employers through a professional platform.
              </p>
              
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Executive search & specialist staffing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Multi-client vacancy & candidate pipeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Assignment tracking & reporting</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Fee & placement ledger management</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
              {onOpenRecruiterPortal && (
                <button
                  onClick={onOpenRecruiterPortal}
                  className="w-full py-2.5 px-4 bg-lime-500 hover:bg-lime-400 text-slate-950 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Users2 className="w-4 h-4" />
                  <span>Recruiter Portal & Saved Talent</span>
                </button>
              )}

              <button
                onClick={() => onOpenAuth('register', 'agency')}
                className="w-full py-2 px-3 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Join Recruiter Network</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Business & Referral Partners */}
          <div className="bg-slate-50/80 dark:bg-[#0F172A] hover:bg-white dark:hover:bg-[#131D31] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-500/50 shadow-xs hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100/80 dark:bg-purple-950/80 text-purple-700 dark:text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Handshake className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">Ecosystem Partners</span>
                <h3 className="text-lg font-bold text-[#142B4A] dark:text-white mt-1 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                  Partner with NextSoftHR.
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Expand your service offering by connecting clients with HR technology, recruitment solutions, and workforce management services.
              </p>
              
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>HR consultants & system integrators</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Recurring referral commission revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Partner portal & lead tracking tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>Dedicated partner success resources</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800">
              <button
                onClick={() => onOpenAuth('register', 'partner')}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Become a Partner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
