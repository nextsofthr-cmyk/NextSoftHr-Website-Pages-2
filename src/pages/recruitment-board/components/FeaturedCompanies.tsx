import React from 'react';
import { 
  Building2, 
  MapPin, 
  CheckCircle, 
  Briefcase, 
  ArrowRight 
} from 'lucide-react';
import { Company } from '../types';

interface FeaturedCompaniesProps {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
  onOpenEmployerRegister: () => void;
}

export const FeaturedCompanies: React.FC<FeaturedCompaniesProps> = ({
  companies,
  onSelectCompany,
  onOpenEmployerRegister
}) => {
  return (
    <section id="companies" className="py-20 bg-[#F8FAFC] dark:bg-[#090D16] border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-lime-400">
              Employer Directory
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] dark:text-white tracking-tight mt-1">
              Discover Companies Hiring Now
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-xl">
              Connect with leading organizations leveraging NextSoftHR for talent acquisition, verified employee credentials, and workplace culture.
            </p>
          </div>

          <button
            onClick={onOpenEmployerRegister}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#142B4A] hover:bg-[#1E3A5F] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors self-start sm:self-auto shrink-0 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-blue-300 dark:text-blue-200" />
            <span>Showcase Your Company</span>
          </button>
        </div>

        {/* Employer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 hover:border-blue-300 dark:hover:border-lime-400/40 hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => onSelectCompany(company)}
            >
              <div>
                {/* Header: Logo, Name, Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#131D31] border border-slate-200/80 dark:border-slate-700 flex items-center justify-center font-bold text-sm text-[#142B4A] dark:text-white group-hover:bg-blue-50 dark:group-hover:bg-lime-950/20 group-hover:text-[#2563EB] dark:group-hover:text-lime-400 transition-colors">
                    {company.initials}
                  </div>
                  {company.isVerified && (
                    <span 
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-lime-700 dark:text-lime-400 bg-lime-50 dark:bg-lime-950/40 border border-lime-200/60 dark:border-lime-400/30 px-2 py-0.5 rounded-md"
                      title="Verified NextSoftHR Corporate Account"
                    >
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#142B4A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors mt-4">
                  {company.name}
                </h3>

                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                  {company.industry}
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span className="truncate">{company.location}</span>
                </div>

                <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {company.description}
                </p>
              </div>

              {/* Footer: Vacancy Count & Action */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#2563EB] dark:text-lime-400" />
                  <span className="tabular-nums font-bold text-[#2563EB] dark:text-lime-400">{company.activeVacanciesCount}</span> Open Roles
                </span>

                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#2563EB] dark:group-hover:text-lime-400 flex items-center gap-1 transition-colors">
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
