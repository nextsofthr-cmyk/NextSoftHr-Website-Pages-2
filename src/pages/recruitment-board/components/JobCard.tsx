import React from 'react';
import { 
  Building2, 
  MapPin, 
  CheckCircle, 
  CheckCircle2, 
  Bookmark, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Job } from '../types';
import { useCurrency } from '../context/CurrencyContext';

export interface JobCardProps {
  job: Job;
  isSaved: boolean;
  isApplied: boolean;
  onSelectJob: (job: Job) => void;
  onToggleSaveJob: (jobId: string) => void;
  onApplyDirect?: (job: Job) => void;
  viewLayout?: 'grid' | 'list';
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  isApplied,
  onSelectJob,
  onToggleSaveJob,
  onApplyDirect,
  viewLayout = 'grid'
}) => {
  const { convertAndFormatSalary } = useCurrency();

  const handleCardClick = () => {
    onSelectJob(job);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSaveJob(job.id);
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onApplyDirect) {
      onApplyDirect(job);
    } else {
      onSelectJob(job);
    }
  };

  const isList = viewLayout === 'list';

  return (
    <div
      onClick={handleCardClick}
      className={`bg-white dark:bg-[#0F172A] rounded-2xl border transition-all duration-300 flex flex-col justify-between group relative cursor-pointer ${
        isApplied
          ? 'border-emerald-300 dark:border-emerald-700/80 shadow-xs ring-1 ring-emerald-500/20 bg-emerald-50/15 dark:bg-emerald-950/10'
          : 'border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-lime-400/50 hover:shadow-lg dark:hover:shadow-black/60'
      } ${isList ? 'p-4 sm:p-5 sm:flex-row sm:items-center gap-4' : 'p-5'}`}
    >
      <div className="flex-1">
        {/* Top Header: Monogram, Company, Badges, and Save/Applied Tag */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-sm tracking-wider transition-colors shrink-0 ${
              isApplied
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-[#131D31] border-slate-200/80 dark:border-slate-700 text-[#142B4A] dark:text-white group-hover:border-[#2563EB]/40 dark:group-hover:border-lime-400/40'
            }`}>
              {job.companyInitials}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {job.companyName}
                </span>

                {job.isVerified && (
                  <span title="Verified NextSoftHR Corporate Entity">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0F9D8A] dark:text-lime-400 fill-[#0F9D8A]/10 dark:fill-lime-400/10 shrink-0" />
                  </span>
                )}

                {/* Poster Type Badges */}
                {job.posterType === 'individual' || job.recruiterSource === 'Individual / Founder' ? (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-lime-100 dark:bg-lime-950/70 text-lime-800 dark:text-lime-300">
                    👤 Individual
                  </span>
                ) : job.posterType === 'agency' || job.recruiterSource === 'Partner Agency' ? (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
                    🤝 Agency
                  </span>
                ) : job.posterType === 'headhunter' || job.recruiterSource === 'Executive Headhunter' ? (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300">
                    🎯 Headhunter
                  </span>
                ) : null}

                {job.isUrgent && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 flex items-center gap-0.5">
                    <Zap className="w-2.5 h-2.5" /> Urgent
                  </span>
                )}
              </div>

              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {job.department}
              </span>
            </div>
          </div>

          {/* Right Header: Applied Badge & Bookmark Button */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Visually tag jobs as 'Applied' if user submitted an application */}
            {isApplied && (
              <span 
                className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500 text-slate-950 flex items-center gap-1 shadow-xs border border-emerald-400 animate-in fade-in zoom-in-95 duration-200"
                title="You have submitted an application for this role"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Applied</span>
              </span>
            )}

            <button
              onClick={handleSaveClick}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isSaved 
                  ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              title={isSaved ? 'Remove from saved jobs' : 'Save job'}
              aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Job Title */}
        <div className="mt-3.5">
          <h3 className="text-base font-bold text-[#142B4A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors leading-snug">
            {job.title}
          </h3>
        </div>

        {/* Location & Employment Arrangement */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500" />
            {job.location}
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
          <span className="font-medium text-slate-700 dark:text-slate-300">{job.workArrangement}</span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
          <span>{job.employmentType}</span>
          {job.experienceLevel && (
            <>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-[11px] text-slate-500">{job.experienceLevel}</span>
            </>
          )}
        </div>

        {/* Snippet (if not condensed) */}
        {!isList && (
          <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        )}
      </div>

      {/* Card Footer */}
      <div className={`pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 ${
        isList ? 'sm:border-t-0 sm:pt-0 shrink-0 sm:w-64' : 'mt-5'
      }`}>
        <div>
          <span className="text-xs font-bold text-[#142B4A] dark:text-lime-400 block tabular-nums">
            {convertAndFormatSalary(job.salaryRange, job.currency)}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            Posted {job.datePosted}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isApplied ? (
            <button
              onClick={handleApplyClick}
              className="px-3.5 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-800 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Applied</span>
            </button>
          ) : (
            <button
              onClick={handleApplyClick}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
