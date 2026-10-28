import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  Scale 
} from 'lucide-react';

export const TrustAndSecurity: React.FC = () => {
  const pillars = [
    {
      icon: Lock,
      title: 'Data Privacy & Protection',
      desc: 'Strict compliance with the Nigeria Data Protection Act (NDPA) and global GDPR standards. Candidate records are never sold or shared without explicit consent.'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Corporate Employers',
      desc: 'All organizations posting vacancies undergo tax identification and business registration verification, protecting candidates from fraudulent vacancies.'
    },
    {
      icon: UserCheck,
      title: 'Role-Based Access Control',
      desc: 'Rigorous permission models ensure candidate resumes, private salary data, and interview scorecards are accessible solely to designated hiring team members.'
    },
    {
      icon: Scale,
      title: 'Fair & Objective Recruitment',
      desc: 'Ethical recruitment practices prioritizing merit, transparent salary disclosures, and structured competency-based candidate evaluations.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-lime-600 dark:text-lime-400">
            Governance & Compliance
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] dark:text-white tracking-tight">
            Trust, Security & Enterprise Credibility
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Building Africa's most dependable talent infrastructure with institutional data governance, verified employer accounts, and transparent hiring standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50/70 dark:bg-[#0F172A] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:bg-white dark:hover:bg-[#131D31] hover:border-lime-400/40 hover:shadow-md dark:hover:shadow-black/60 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-lime-50 dark:bg-[#131D31] text-lime-600 dark:text-lime-400 flex items-center justify-center mb-4 border border-lime-100 dark:border-slate-700">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#142B4A] dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-semibold text-lime-600 dark:text-lime-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Enterprise Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
