import React from 'react';
import { BRAND_INFO } from '../data/academyData';
import {
  Building2,
  Users,
  CheckCircle2,
  Phone,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  PieChart,
} from 'lucide-react';

interface CorporateTrainingSectionProps {
  onRequestCorporate: () => void;
}

export const CorporateTrainingSection: React.FC<CorporateTrainingSectionProps> = ({
  onRequestCorporate,
}) => {
  const targetTeams = [
    'HR Teams',
    'Payroll Teams',
    'Finance Teams',
    'Managers',
    'Supervisors',
    'Business Owners',
    'Operations Teams',
  ];

  const features = [
    { title: 'Team Training', desc: 'Cohorts aligned to departmental goals and cross-functional agility.' },
    { title: 'Private Training Sessions', desc: 'Confidential corporate rooms focusing exclusively on your proprietary data.' },
    { title: 'Customized Curriculum', desc: 'Syllabus tailored to your industry, regional tax rules, and software stack.' },
    { title: 'Employee Development', desc: 'Structured competency milestones mapped to annual appraisal KPIs.' },
    { title: 'Progress Tracking', desc: 'Real-time dashboard for HR directors to inspect lesson completions.' },
    { title: 'Completion Certificates', desc: 'Official NextSoftHR verifiable certificates issued to each staff member.' },
    { title: 'Training Reports', desc: 'Detailed post-program analytics on skill gains and assessment scores.' },
    { title: 'Flexible Scheduling', desc: 'Weekend, evening, hybrid, or on-site delivery that never disrupts operations.' },
  ];

  return (
    <section id="corporate-training" className="py-16 bg-[#0F4C81] text-white scroll-mt-20 relative overflow-hidden">
      {/* Subtle brand ambient accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-lime-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-800/80 border border-blue-600/60 text-lime-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Enterprise Learning Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
            Upskill Your Entire Workforce
          </h2>

          <p className="text-base text-blue-100 leading-relaxed max-w-2xl">
            Give your HR, payroll, management and operations teams the knowledge they need to work smarter and deliver better business results.
          </p>

          {/* Teams We Upskill Strip */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs text-blue-200 font-semibold mr-1">Trained Teams:</span>
            {targetTeams.map((team, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-800/70 border border-blue-700/80 text-white"
              >
                {team}
              </span>
            ))}
          </div>
        </div>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-blue-900/50 backdrop-blur-xs border border-blue-700/60 rounded-xl p-5 hover:bg-blue-900/80 hover:border-[#84CC16]/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#84CC16] flex-shrink-0" />
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-xs text-blue-200 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner & Action Call */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#84CC16] text-[#0F4C81] flex items-center justify-center flex-shrink-0 font-bold">
              <PieChart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Ready to transform organizational capability?
              </h3>
              <p className="text-xs sm:text-sm text-blue-100">
                Custom corporate proposals delivered within 24 hours. Group discounts available for teams of 5+.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={onRequestCorporate}
              className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold text-[#0F4C81] bg-[#84CC16] hover:bg-[#74b810] rounded-md shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Corporate Training</span>
              <ArrowRight className="w-4 h-4 text-[#0F4C81]" />
            </button>

            <a
              href={`tel:${BRAND_INFO.phone}`}
              className="w-full sm:w-auto px-5 py-3.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-lime-300" />
              <span>Talk to a Training Specialist</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
