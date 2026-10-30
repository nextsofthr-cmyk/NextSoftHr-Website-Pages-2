import React from 'react';
import { X, Building2, MapPin, Users, Globe, CheckCircle, ArrowRight, Briefcase } from 'lucide-react';
import { Company, Job } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface CompanyModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  openJobs: Job[];
  onSelectJob: (job: Job) => void;
}

export const CompanyModal: React.FC<CompanyModalProps> = ({
  company,
  isOpen,
  onClose,
  openJobs,
  onSelectJob
}) => {
  const { convertAndFormatSalary } = useCurrency();
  if (!isOpen || !company) return null;

  const companyJobs = openJobs.filter(j => j.companyId === company.id || j.companyName === company.name);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#142B4A] dark:bg-blue-650 text-white flex items-center justify-center font-bold text-base shadow-sm">
              {company.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#142B4A] dark:text-white">{company.name}</h2>
                {company.isVerified && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-lime-700 dark:text-lime-300 bg-lime-50 dark:bg-lime-950/70 border border-lime-200 dark:border-lime-800 px-2 py-0.5 rounded">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{company.industry} · {company.employeeCount}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1.5">About the Organization</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
              {company.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span><strong>Headquarters:</strong> {company.headquarters}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span><strong>Website:</strong> <a href={company.website} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{company.website.replace('https://', '')}</a></span>
            </div>
          </div>

          {/* Perks */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">Culture & Workplace Perks</h3>
            <div className="flex flex-wrap gap-2">
              {company.perks.map((perk, i) => (
                <span key={i} className="px-3 py-1.5 bg-blue-50 dark:bg-slate-800 text-[#142B4A] dark:text-slate-200 font-semibold rounded-lg border border-blue-100 dark:border-slate-700">
                  ✓ {perk}
                </span>
              ))}
            </div>
          </div>

          {/* Active Job Openings at this company */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                Active Job Openings at {company.name} ({companyJobs.length})
              </h3>
            </div>

            {companyJobs.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400 italic">No public vacancies posted at this moment.</p>
            ) : (
              <div className="space-y-2.5">
                {companyJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => {
                      onClose();
                      onSelectJob(job);
                    }}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-slate-800/70 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {job.title}
                      </h4>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {job.location} · {job.workArrangement} · {job.employmentType}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#142B4A] dark:text-slate-200 tabular-nums">
                        {convertAndFormatSalary(job.salaryRange, job.currency)}
                      </span>
                      <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
