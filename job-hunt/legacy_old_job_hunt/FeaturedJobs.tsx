import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  CheckCircle, 
  Bookmark, 
  ArrowRight, 
  Sparkles,
  Bell,
  Mail,
  Search,
  CheckCircle2
} from 'lucide-react';
import { Job, JobType } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface FeaturedJobsProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onToggleSaveJob: (jobId: string) => void;
  savedJobIds: string[];
  onViewAllJobs: (filterType?: string) => void;
  onApplyDirect: (job: Job) => void;
  onOpenJobAlerts?: (params?: { keyword?: string; location?: string; email?: string }) => void;
  onQuickSubscribeAlert?: (alert: { email: string; keyword: string; location: string }) => void;
}

export const FeaturedJobs: React.FC<FeaturedJobsProps> = ({
  jobs,
  onSelectJob,
  onToggleSaveJob,
  savedJobIds,
  onViewAllJobs,
  onApplyDirect,
  onOpenJobAlerts,
  onQuickSubscribeAlert
}) => {
  const { convertAndFormatSalary } = useCurrency();
  const [activeTab, setActiveTab] = useState<'All' | JobType>('All');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickKeyword, setQuickKeyword] = useState('');
  const [quickLocation, setQuickLocation] = useState('Lagos');
  const [quickSubscribed, setQuickSubscribed] = useState(false);

  const filterTabs: ('All' | JobType)[] = [
    'All',
    'Full-Time',
    'Remote',
    'Hybrid',
    'Contract',
    'Part-Time',
    'Internship'
  ];

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Remote') return job.workArrangement === 'Remote';
    if (activeTab === 'Hybrid') return job.workArrangement === 'Hybrid';
    return job.employmentType === activeTab;
  });

  return (
    <section id="featured-jobs" className="py-20 bg-[#F8FAFC] dark:bg-[#090D16] border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Segmented Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-lime-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Marketplace Listings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] dark:text-white tracking-tight">
              Explore Featured Opportunities
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-xl">
              Discover verified career opportunities from direct employers, recruitment process outsourcing (RPO) programs, and certified headhunters.
            </p>
          </div>

          {/* Interactive Filter Tabs (Segmented control) */}
          <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto max-w-full shadow-xs transition-colors duration-300">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#142B4A] dark:bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {tab === 'All' ? 'All Roles' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.slice(0, 6).map((job) => {
            const isSaved = savedJobIds.includes(job.id);

            return (
              <div
                key={job.id}
                className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 hover:border-blue-300 dark:hover:border-lime-400/50 hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 flex flex-col justify-between group relative cursor-pointer"
                onClick={() => onSelectJob(job)}
              >
                <div>
                  {/* Top Header: Company logo monogram & save button */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#131D31] border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-[#142B4A] dark:text-white font-bold text-sm tracking-wider group-hover:border-[#2563EB]/40 dark:group-hover:border-lime-400/40 transition-colors">
                        {job.companyInitials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {job.companyName}
                          </span>
                          {job.isVerified && (
                            <span title="Verified NextSoftHR Entity">
                              <CheckCircle className="w-3.5 h-3.5 text-[#0F9D8A] dark:text-lime-400 fill-[#0F9D8A]/10 dark:fill-lime-400/10 shrink-0" />
                            </span>
                          )}
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
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {job.department}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSaveJob(job.id);
                      }}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        isSaved 
                          ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60' 
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save job'}
                      aria-label={isSaved ? 'Remove from saved' : 'Save job'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Job Title */}
                  <div className="mt-4">
                    <h3 className="text-base font-bold text-[#142B4A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {job.title}
                    </h3>
                  </div>

                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                      {job.location}
                    </span>
                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{job.workArrangement}</span>
                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                    <span>{job.employmentType}</span>
                  </div>

                  {/* Snippet */}
                  <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Card Footer: Salary, Date, and CTA */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-[#142B4A] dark:text-lime-400 block tabular-nums">
                      {convertAndFormatSalary(job.salaryRange, job.currency)}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      Posted {job.datePosted} · {job.experienceLevel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onApplyDirect(job);
                      }}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors shadow-xs cursor-pointer"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Subscribe to Job Alerts Callout Widget */}
        <div className="mt-12 bg-gradient-to-br from-[#142B4A] via-[#1A365D] to-[#0A192F] dark:from-[#0B1120] dark:via-[#0F172A] dark:to-[#070B14] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-blue-900/50 dark:border-slate-800 transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-lime-400">
                  Instant Candidate Notifications
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Never Miss a Matching Opportunity
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Set up targeted email alerts for your preferred role and city. The instant an employer publishes matching criteria, we deliver it to your inbox.
              </p>
            </div>

            {quickSubscribed ? (
              <div className="bg-lime-950/70 border border-lime-500/50 p-4 rounded-2xl flex items-center gap-3 text-lime-200 text-xs">
                <CheckCircle2 className="w-5 h-5 text-lime-400 shrink-0" />
                <div>
                  <p className="font-bold">Subscribed Successfully!</p>
                  <p className="text-[11px] text-lime-300">We'll alert {quickEmail} when new "{quickKeyword || 'relevant'}" jobs appear.</p>
                </div>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!quickEmail || !quickKeyword) return;
                  if (onQuickSubscribeAlert) {
                    onQuickSubscribeAlert({ email: quickEmail, keyword: quickKeyword, location: quickLocation });
                  }
                  setQuickSubscribed(true);
                  setTimeout(() => setQuickSubscribed(false), 4000);
                }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:max-w-xl"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={quickKeyword}
                    onChange={(e) => setQuickKeyword(e.target.value)}
                    placeholder="Role (e.g. Lead Engineer)"
                    className="w-full pl-9 pr-3 py-2.5 bg-white/10 dark:bg-black/30 border border-white/20 dark:border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="relative flex-1 sm:max-w-[150px]">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={quickLocation}
                    onChange={(e) => setQuickLocation(e.target.value)}
                    placeholder="Lagos / Remote"
                    className="w-full pl-9 pr-3 py-2.5 bg-white/10 dark:bg-black/30 border border-white/20 dark:border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={quickEmail}
                    onChange={(e) => setQuickEmail(e.target.value)}
                    placeholder="Your work email"
                    className="w-full pl-9 pr-3 py-2.5 bg-white/10 dark:bg-black/30 border border-white/20 dark:border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl text-xs shadow-md transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
            <span>Free daily digest or instant alerts · Unsubscribe in one click</span>
            {onOpenJobAlerts && (
              <button
                type="button"
                onClick={() => onOpenJobAlerts({ keyword: quickKeyword, location: quickLocation, email: quickEmail })}
                className="text-lime-400 hover:text-white font-semibold underline flex items-center gap-1 cursor-pointer"
              >
                <span>Advanced Alert Filters & Frequencies →</span>
              </button>
            )}
          </div>
        </div>

        {/* View All Jobs CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onViewAllJobs(activeTab === 'All' ? undefined : activeTab)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm font-semibold rounded-xl shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <span>View All Searchable Vacancies</span>
            <ArrowRight className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Showing curated roles · Access full candidate search with multi-faceted filtering
          </p>
        </div>

      </div>
    </section>
  );
};
