import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  SlidersHorizontal, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Building, 
  Users, 
  Sparkles, 
  TrendingUp, 
  Laptop,
  PlusCircle
} from 'lucide-react';
import { JobType, PosterType } from '../types';
import { PanAfricanTalentHeroVisual } from './PanAfricanTalentHeroVisual';
import { CountryLocationSelector } from './CountryLocationSelector';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onSearch: (params: { keyword: string; location: string; employmentType: string; arrangement: string }) => void;
  onOpenEmployerFlow: () => void;
  onOpenServicesModal: () => void;
  onOpenPostJob?: (type?: PosterType) => void;
  onSelectCategoryQuick: (category: string) => void;
  onOpenAiAssistant?: (tab?: 'candidate' | 'employer-search' | 'job-drafter') => void;
  totalJobsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onOpenEmployerFlow,
  onOpenServicesModal,
  onOpenPostJob,
  onSelectCategoryQuick,
  onOpenAiAssistant,
  totalJobsCount
}) => {
  const { t } = useLanguage();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('All');
  const [arrangement, setArrangement] = useState('All');

  const popularTags = [
    'Human Resources',
    'Software Engineering',
    'Accounting & Finance',
    'Sales & Marketing',
    'Administration',
    'Operations',
    'Graduate Trainee',
    'Remote Jobs'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ keyword, location, employmentType, arrangement });
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 bg-gradient-to-b from-[#F5F7FB] via-white to-white dark:from-[#0B1120] dark:via-[#090D16] dark:to-[#090D16] border-b border-slate-200/70 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-tr from-blue-100/50 via-teal-50/40 to-slate-100/30 dark:from-blue-950/40 dark:via-lime-950/20 dark:to-slate-900/30 blur-3xl -z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Header: Side-by-Side Headline & Pan-African Human Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10">
          
          {/* Left Column: Headline, Mission & Social Proof */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-[#0F172A] border border-blue-200/60 dark:border-slate-800 text-[#142B4A] dark:text-blue-200 text-xs font-semibold transition-colors duration-300">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] dark:bg-lime-400 shadow-xs" />
              <span>{t('hero.badge', 'NextSoftHR Recruitment Marketplace')}</span>
              <span className="text-slate-400 dark:text-slate-600">|</span>
              <span className="text-[#0F9D8A] dark:text-lime-400 font-bold">Nigeria · Pan-Africa · Global</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-extrabold text-[#142B4A] dark:text-white tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              {t('hero.titleMain', 'Find the Right Opportunity.')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-indigo-600 to-[#0F9D8A] dark:from-blue-400 dark:via-indigo-300 dark:to-lime-400">
                {t('hero.titleSub', 'Hire the Right Talent.')}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('hero.description', "Explore verified career opportunities, connect with leading employers, and access professional recruitment services powered by NextSoftHR's enterprise HR technology ecosystem.")}
            </p>

            {/* Quick Proof Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
                <span>12,500+ Verified African Professionals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
                <span>450+ Leading Employers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
                <span>94% Placement Success</span>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Pan-African Human Imagery Visual */}
          <div className="lg:col-span-5 w-full">
            <PanAfricanTalentHeroVisual />
          </div>

        </div>

        {/* Primary Horizontal Job Search Panel */}
        <div className="mt-10 max-w-5xl mx-auto">
          <form 
            onSubmit={handleSubmit}
            className="bg-white dark:bg-[#0F172A] rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200/90 dark:border-slate-800 p-3 sm:p-4 transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Field 1: Keywords */}
              <div className="md:col-span-4 relative flex items-center">
                <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={t('hero.searchPlaceholder', 'Job title, skills, or keywords...')}
                  className="w-full pl-10 pr-3 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-slate-50 dark:bg-[#131D31] md:bg-transparent dark:md:bg-transparent rounded-xl md:rounded-none border border-slate-200 dark:border-slate-700 md:border-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:focus:ring-lime-400/20 md:border-r md:border-slate-200 dark:md:border-slate-800"
                />
              </div>

              {/* Field 2: Location (Any Country in World) */}
              <div className="md:col-span-3 relative flex items-center">
                <CountryLocationSelector
                  value={location}
                  onChange={setLocation}
                  variant="hero"
                  placeholder={t('hero.locationPlaceholder', 'Select any country / global...')}
                  className="w-full"
                />
              </div>

              {/* Field 3: Arrangement & Type */}
              <div className="md:col-span-3 grid grid-cols-2 gap-2">
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full px-2.5 py-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 md:bg-transparent dark:md:bg-transparent rounded-xl md:rounded-none border border-slate-200 dark:border-slate-700 md:border-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 md:border-r md:border-slate-200 dark:md:border-slate-800 font-medium cursor-pointer"
                >
                  <option value="All" className="dark:bg-slate-900 dark:text-slate-200">{t('hero.allTypes', 'All Types')}</option>
                  <option value="Full-Time" className="dark:bg-slate-900 dark:text-slate-200">Full-Time</option>
                  <option value="Contract" className="dark:bg-slate-900 dark:text-slate-200">Contract</option>
                  <option value="Part-Time" className="dark:bg-slate-900 dark:text-slate-200">Part-Time</option>
                  <option value="Internship" className="dark:bg-slate-900 dark:text-slate-200">Internship</option>
                </select>

                <select
                  value={arrangement}
                  onChange={(e) => setArrangement(e.target.value)}
                  className="w-full px-2.5 py-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 md:bg-transparent dark:md:bg-transparent rounded-xl md:rounded-none border border-slate-200 dark:border-slate-700 md:border-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 font-medium cursor-pointer"
                >
                  <option value="All" className="dark:bg-slate-900 dark:text-slate-200">{t('hero.allArrangements', 'All Modes')}</option>
                  <option value="Remote" className="dark:bg-slate-900 dark:text-slate-200">Remote</option>
                  <option value="Hybrid" className="dark:bg-slate-900 dark:text-slate-200">Hybrid</option>
                  <option value="On-Site" className="dark:bg-slate-900 dark:text-slate-200">On-Site</option>
                </select>
              </div>

              {/* Field 4: Search Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.98] cursor-pointer"
                >
                  <span>{t('hero.searchButton', 'Search Jobs')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{t('hero.popularSearches', 'Popular Searches:')}</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setKeyword(tag);
                  onSelectCategoryQuick(tag);
                }}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Secondary CTAs & Quick Value Props with 4 Persona Options */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => (onOpenPostJob ? onOpenPostJob('company') : onOpenEmployerFlow())}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#142B4A] dark:bg-blue-600 hover:bg-[#1E3A5F] dark:hover:bg-blue-500 text-white text-sm font-semibold shadow-md transition-all cursor-pointer group"
              >
                <PlusCircle className="w-4 h-4 text-lime-400 group-hover:rotate-90 transition-transform duration-200" />
                <span>{t('hero.postMandate', 'Post a Vacancy')}</span>
              </button>

              <button
                onClick={onOpenServicesModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm font-semibold shadow-xs transition-all cursor-pointer"
              >
                <Users className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                <span>Request Recruitment Outsourcing & Executive Search</span>
              </button>

              {onOpenAiAssistant && (
                <button
                  onClick={() => onOpenAiAssistant('candidate')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-[#2563EB] dark:text-blue-400 text-sm font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                  <span>AI Skills Matcher</span>
                </button>
              )}
            </div>

            {/* 4 Vacancy Poster Personas Quick Select */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-medium text-slate-500 dark:text-slate-400 mr-1">Post Vacancy as:</span>
              <button
                onClick={() => onOpenPostJob ? onOpenPostJob('individual') : onOpenEmployerFlow()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-lime-50 dark:bg-lime-950/40 text-lime-800 dark:text-lime-300 hover:bg-lime-100 dark:hover:bg-lime-900/50 border border-lime-200 dark:border-lime-800/60 transition-colors font-medium cursor-pointer"
                title="Post as an Individual, Founder, Private Principal or Family Office hiring directly"
              >
                <span>👤 Individual / Founder</span>
              </button>
              <button
                onClick={() => onOpenPostJob ? onOpenPostJob('company') : onOpenEmployerFlow()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800/60 transition-colors font-medium cursor-pointer"
                title="Post as an Employer, Corporate HR, Startup or Enterprise"
              >
                <span>🏢 Employer / Company</span>
              </button>
              <button
                onClick={() => onOpenPostJob ? onOpenPostJob('agency') : onOpenEmployerFlow()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800/60 transition-colors font-medium cursor-pointer"
                title="Post as a Recruitment Agency, Staffing Firm or RPO Partner"
              >
                <span>🤝 Recruiter / Agency</span>
              </button>
              <button
                onClick={() => onOpenPostJob ? onOpenPostJob('headhunter') : onOpenEmployerFlow()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800/60 transition-colors font-medium cursor-pointer"
                title="Post as an Executive Search Consultant or Retained Talent Scout"
              >
                <span>🎯 Headhunter / Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Visual Preview: Modern Recruitment Dashboard Showcase */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="bg-[#142B4A] dark:bg-[#070B14] rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-700/60 dark:border-slate-800 text-white relative transition-all duration-300">
            
            {/* Top Bar Preview */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700/60 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-lime-400" />
                <span className="text-slate-300 dark:text-slate-400 ml-2 font-mono text-[11px]">NextSoftHR Recruitment Console · Live Pipeline</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-lime-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Enterprise Employers
                </span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline text-slate-300">
                  NextSoftHR Core HRMS Connected
                </span>
              </div>
            </div>

            {/* Simulated Live ATS Pipeline Strip */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
              
              {/* Column 1: Sourced Candidates */}
              <div className="bg-slate-800/80 dark:bg-[#0F172A] rounded-xl p-3 border border-slate-700/60 dark:border-slate-800 transition-colors duration-300">
                <div className="flex items-center justify-between text-xs font-semibold mb-3">
                  <span className="text-slate-300">1. Sourced & Applied</span>
                  <span className="text-blue-400 dark:text-lime-400 tabular-nums">48 Candidates</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-slate-900/90 dark:bg-[#131D31] p-2.5 rounded-lg border border-slate-700/50 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-white">Chisom Okonkwo</span>
                      <span className="text-[10px] text-lime-400 font-semibold">96% Fit</span>
                    </div>
                    <div className="text-[11px] text-slate-300 dark:text-slate-400 mt-1">Lead Software Engineer · Lagos</div>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                      <span>CV Scanned</span>
                      <span className="text-blue-400 dark:text-blue-300">Interview Ready</span>
                    </div>
                  </div>
                  <div className="bg-slate-900/90 dark:bg-[#131D31] p-2.5 rounded-lg border border-slate-700/50 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-white">Ibrahim Danladi</span>
                      <span className="text-[10px] text-lime-400 font-semibold">92% Fit</span>
                    </div>
                    <div className="text-[11px] text-slate-300 dark:text-slate-400 mt-1">Payroll Specialist · Abuja</div>
                  </div>
                </div>
              </div>

              {/* Column 2: Interviewing */}
              <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
                <div className="flex items-center justify-between text-xs font-semibold mb-3">
                  <span className="text-slate-300">2. Structured Assessment</span>
                  <span className="text-amber-400 tabular-nums">14 Active</span>
                </div>
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white">Fatima Al-Hassan</span>
                    <span className="text-[10px] text-amber-300 font-semibold">Stage 2</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Senior HRBP · Victoria Island</div>
                  <div className="mt-2 text-[10px] text-slate-400 bg-slate-800 px-2 py-1 rounded">
                    Scorecard: 4.8 / 5.0 (Recommended)
                  </div>
                </div>
              </div>

              {/* Column 3: Executive Search & Vetting */}
              <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
                <div className="flex items-center justify-between text-xs font-semibold mb-3">
                  <span className="text-slate-300">3. Background & Vetting</span>
                  <span className="text-lime-400 tabular-nums">6 Finalists</span>
                </div>
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white">David Adeleke</span>
                    <span className="text-[10px] text-lime-400 font-semibold">Verified</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">VP of Finance · Commercial Bank</div>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] text-lime-400">
                    <CheckCircle2 className="w-3 h-3" /> Credentials & Reference Passed
                  </div>
                </div>
              </div>

              {/* Column 4: Hired & HRMS Sync */}
              <div className="bg-gradient-to-br from-blue-950/60 to-slate-900 rounded-xl p-3 border border-blue-600/40">
                <div className="flex items-center justify-between text-xs font-semibold mb-3">
                  <span className="text-blue-300">4. Hired & Onboarded</span>
                  <span className="text-lime-400 font-bold">1-Click Sync</span>
                </div>
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-lime-500/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white">Nneka Obi</span>
                    <span className="text-[10px] bg-lime-500/20 text-lime-300 px-1.5 py-0.5 rounded font-mono">ONBOARDED</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Product Designer · Flutterwave</div>
                  <div className="mt-2 text-[10px] text-slate-400 border-t border-slate-800 pt-1.5">
                    Transferred to NextSoftHR Payroll & Staff ID generated
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Proof Strip */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-white font-bold tabular-nums">100%</span> Verified Employers
                </div>
                <div>
                  <span className="text-white font-bold tabular-nums">1-Click</span> HRMS & Payroll Transition
                </div>
                <div>
                  <span className="text-white font-bold tabular-nums">&lt; 48 hrs</span> Shortlist Average
                </div>
              </div>
              <div className="text-slate-400 text-[11px]">
                Built for Nigerian & African Enterprises with Global Expansion Architecture
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
