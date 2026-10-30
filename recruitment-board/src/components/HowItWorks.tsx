import React, { useState } from 'react';
import { 
  UserCheck, 
  FileText, 
  Send, 
  Clock, 
  Building2, 
  ShieldCheck, 
  Layers, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'seekers' | 'employers' | 'agencies'>('seekers');

  const seekerSteps = [
    {
      number: '01',
      title: 'Create Your Account',
      desc: 'Sign up in under two minutes with basic contact info or professional credentials.',
      icon: UserCheck
    },
    {
      number: '02',
      title: 'Complete Professional Profile',
      desc: 'Add your skills, work history, and upload your CV with instant parsing.',
      icon: FileText
    },
    {
      number: '03',
      title: 'Discover & Apply for Roles',
      desc: 'Search verified job listings with transparent salary ranges and submit with 1 click.',
      icon: Send
    },
    {
      number: '04',
      title: 'Track Your Applications',
      desc: 'Follow your application status from initial screening to interview and final offer.',
      icon: Clock
    }
  ];

  const employerSteps = [
    {
      number: '01',
      title: 'Register Your Organization',
      desc: 'Create an employer account using your corporate email and company details.',
      icon: Building2
    },
    {
      number: '02',
      title: 'Complete Corporate Verification',
      desc: 'Verify your company identity to receive the NextSoftHR Verified Employer badge.',
      icon: ShieldCheck
    },
    {
      number: '03',
      title: 'Publish Roles or Request Support',
      desc: 'Post self-service vacancies or engage our dedicated RPO and headhunting team.',
      icon: Layers
    },
    {
      number: '04',
      title: 'Review & Manage Candidates',
      desc: 'Use structured scorecards, schedule interviews, and sync new hires into payroll.',
      icon: CheckCircle2
    }
  ];

  const agencySteps = [
    {
      number: '01',
      title: 'Register Your Agency',
      desc: 'Set up your recruitment firm account with operating regions and specializations.',
      icon: Users
    },
    {
      number: '02',
      title: 'Profile & Accreditation Review',
      desc: 'Complete recruiter credential checks to qualify for corporate placement briefs.',
      icon: ShieldCheck
    },
    {
      number: '03',
      title: 'Manage Recruitment Assignments',
      desc: 'Coordinate multi-client vacancies, candidate pipelines, and client feedback.',
      icon: Layers
    },
    {
      number: '04',
      title: 'Track Placements & Invoicing',
      desc: 'Monitor candidate progress, verified placements, and transparent commission records.',
      icon: Award
    }
  ];

  const currentSteps = 
    activeTab === 'seekers' ? seekerSteps :
    activeTab === 'employers' ? employerSteps : agencySteps;

  return (
    <section className="py-20 bg-white dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-lime-400">
            Simple, Transparent Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] dark:text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Tailored journeys designed for speed, clarity, and accountability at every stage of the talent acquisition lifecycle.
          </p>

          {/* Interactive Role Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex p-1 bg-slate-100 dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-300">
              <button
                onClick={() => setActiveTab('seekers')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'seekers'
                    ? 'bg-white dark:bg-[#1E293B] text-[#142B4A] dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                For Job Seekers
              </button>
              <button
                onClick={() => setActiveTab('employers')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'employers'
                    ? 'bg-white dark:bg-[#1E293B] text-[#142B4A] dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                For Employers
              </button>
              <button
                onClick={() => setActiveTab('agencies')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'agencies'
                    ? 'bg-white dark:bg-[#1E293B] text-[#142B4A] dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                For Recruitment Agencies
              </button>
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 dark:bg-[#0F172A] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 hover:bg-white dark:hover:bg-[#131D31] hover:border-lime-400/40 hover:shadow-md dark:hover:shadow-black/60 transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 dark:text-lime-400/80 font-mono">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-[#131D31] text-[#2563EB] dark:text-lime-400 flex items-center justify-center border border-transparent dark:border-slate-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#142B4A] dark:text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 dark:text-slate-700">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
