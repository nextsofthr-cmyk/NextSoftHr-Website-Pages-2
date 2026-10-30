import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Building2, 
  BookOpen, 
  Users, 
  ChevronDown, 
  Menu, 
  X, 
  Bookmark, 
  PlusCircle, 
  Layers, 
  ShieldCheck, 
  Code2,
  Sparkles,
  Sun,
  Moon,
  Bell,
  Zap,
  FileText,
  User,
  Target,
  CreditCard
} from 'lucide-react';
import { UserRole, PosterType, ParsedResumeProfile } from '../types';
import { useTheme } from '../context/ThemeContext';
import { CurrencySelector } from './CurrencySelector';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { GlobalHeader } from '../../../components/GlobalHeader';

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'register', role?: UserRole) => void;
  onOpenPostJob: (posterType?: PosterType) => void;
  onOpenSearch: (params?: { keyword?: string; category?: string; location?: string }) => void;
  onOpenServicesModal: (serviceId?: string) => void;
  onOpenApiDocs: () => void;
  onOpenAiAssistant: (tab?: 'candidate' | 'employer-search' | 'job-drafter' | 'chat') => void;
  savedJobsCount: number;
  onOpenSavedJobs: () => void;
  onOpenJobAlerts: () => void;
  onOpenCandidateDashboard: () => void;
  onOpenRecruiterDashboard?: () => void;
  onOpenResumeBuilder?: () => void;
  onOpenPaymentGateways?: (persona?: 'employer' | 'recruiter' | 'headhunter' | 'candidate', planId?: string) => void;
  savedCandidatesCount?: number;
  alertsCount: number;
  currentUser: { email: string; role: UserRole; name: string } | null;
  onSignOut: () => void;
  onLinkedInSignIn?: (userData: { name: string; email: string; role: UserRole }, parsedProfile: ParsedResumeProfile) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAuth,
  onOpenPostJob,
  onOpenSearch,
  onOpenServicesModal,
  onOpenApiDocs,
  onOpenAiAssistant,
  savedJobsCount,
  onOpenSavedJobs,
  onOpenJobAlerts,
  onOpenCandidateDashboard,
  onOpenRecruiterDashboard,
  onOpenResumeBuilder,
  onOpenPaymentGateways,
  savedCandidatesCount = 0,
  alertsCount,
  currentUser,
  onSignOut,
  onLinkedInSignIn
}) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmployersDropdownOpen, setIsEmployersDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
  const [isLinkedInSyncing, setIsLinkedInSyncing] = useState(false);

  const handleLinkedInSignInClick = () => {
    setIsLinkedInSyncing(true);
    setTimeout(() => {
      setIsLinkedInSyncing(false);
      const linkedInUser = {
        name: 'Adewale Adeleke',
        email: 'adewale.adeleke@talent.linkedin.com',
        role: 'job_seeker' as UserRole
      };
      const linkedInProfile: ParsedResumeProfile = {
        fullName: 'Adewale Adeleke',
        email: 'adewale.adeleke@talent.linkedin.com',
        phone: '+234 803 892 4110',
        currentRole: 'Senior Full-Stack Engineer & Cloud Architect',
        yearsOfExperience: '7+ years',
        fileName: 'LinkedIn_Adewale_Profile_Sync.pdf',
        fileSize: '1.5 MB',
        parsedAt: 'Just now',
        education: 'B.Sc. Computer Science - University of Lagos (First Class Honours, 2018)',
        summary: 'Passionate software architect with 7+ years building enterprise fintech, distributed microservices, and AI integrations across EMEA and Africa.',
        confidenceScore: 96,
        extractedSkills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Python', 'Tailwind CSS', 'System Design'],
        pastCompanies: ['Paystack Financial', 'Andela Inc.', 'Interswitch Group'],
        certifications: ['AWS Certified Solutions Architect', 'CKA Kubernetes Administrator'],
        verifiedSkills: [
          { name: 'TypeScript & React Architecture', verifiedAt: 'Verified via LinkedIn Skills', score: 96, type: 'assessment' },
          { name: 'Cloud Infrastructure & AWS', verifiedAt: 'AWS Certified Solutions Architect', score: 94, type: 'certification', certName: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services' },
          { name: 'PostgreSQL Database Tuning', verifiedAt: 'Verified via LinkedIn Assessment', score: 91, type: 'assessment' }
        ]
      };
      if (onLinkedInSignIn) {
        onLinkedInSignIn(linkedInUser, linkedInProfile);
      }
    }, 800);
  };

  return (
    <>
      <GlobalHeader
        onOpenDemo={() => onOpenServicesModal('srv-b')}
        onOpenGetStarted={() => onOpenPostJob('company')}
      />
      <header className="sticky top-[88px] z-30 bg-white/95 dark:bg-[#0b1120]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Zone 1: Brand Wordmark (Clean single-line element) */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#142B4A] dark:bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-sm group-hover:bg-[#2563EB] dark:group-hover:bg-blue-500 transition-colors">
                <span>N</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-[#142B4A] dark:text-white flex items-center">
                  NextSoft<span className="text-[#2563EB] dark:text-blue-400">HR</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-lime-400 ml-1 mb-2.5 transition-colors shadow-2xs" />
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-600 dark:text-slate-400 -mt-0.5">
                  Recruitment Marketplace
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Navigation Links (Single-line, quiet typography) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700 dark:text-slate-300">
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav.home', 'Home')}
            </a>
            
            <button 
              onClick={() => onOpenSearch()}
              className="hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>{t('nav.findJobs', 'Find Jobs')}</span>
            </button>

            <a 
              href="#companies" 
              className="hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>{t('nav.companies', 'Companies')}</span>
            </a>

            {/* For Employers Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsEmployersDropdownOpen(true)}
              onMouseLeave={() => setIsEmployersDropdownOpen(false)}
            >
              <button 
                className="hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 py-2 cursor-pointer"
                onClick={() => setIsEmployersDropdownOpen(!isEmployersDropdownOpen)}
              >
                <span>{t('nav.employers', 'For Employers')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isEmployersDropdownOpen ? 'rotate-180 text-[#2563EB] dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`} />
              </button>

              {isEmployersDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-white">Post Vacancies · By Persona</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Publish directly to global talent pools</p>
                  </div>

                  <div className="py-1 border-b border-slate-100 dark:border-slate-800 space-y-0.5">
                    <button 
                      onClick={() => { setIsEmployersDropdownOpen(false); onOpenPostJob('company'); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="font-medium">Employer or Company</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Corporate</span>
                    </button>

                    <button 
                      onClick={() => { setIsEmployersDropdownOpen(false); onOpenPostJob('individual'); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                        <span className="font-medium">Individuals / Founders</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Direct Hire</span>
                    </button>

                    <button 
                      onClick={() => { setIsEmployersDropdownOpen(false); onOpenPostJob('agency'); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span className="font-medium">Recruiters or Agency</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Staffing</span>
                    </button>

                    <button 
                      onClick={() => { setIsEmployersDropdownOpen(false); onOpenPostJob('headhunter'); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Target className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                        <span className="font-medium">Headhunters & Exec Search</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Retained</span>
                    </button>

                    {onOpenPaymentGateways && (
                      <button 
                        onClick={() => { setIsEmployersDropdownOpen(false); onOpenPaymentGateways('employer'); }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg bg-emerald-50/70 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-900 dark:text-emerald-300 flex items-center justify-between transition-colors cursor-pointer border border-emerald-200/60 dark:border-emerald-800/60 mt-1"
                      >
                        <span className="flex items-center gap-2">
                          <CreditCard className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="font-bold">Subscription & Payment Gateways</span>
                        </span>
                        <span className="text-[9px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded">Pan-Africa</span>
                      </button>
                    )}
                  </div>

                  <a 
                    href="#for-employers"
                    onClick={() => setIsEmployersDropdownOpen(false)}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 flex items-start gap-2 transition-colors mt-1"
                  >
                    <Layers className="w-4 h-4 text-lime-600 dark:text-lime-400 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-slate-900 dark:text-white">NextSoftHR HRMS Sync</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Sync applicants directly into payroll & records</span>
                    </div>
                  </a>
                  <button 
                    onClick={() => { setIsEmployersDropdownOpen(false); onOpenServicesModal('srv-b'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 flex items-start gap-2 transition-colors cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-amber-500 dark:text-amber-400 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-slate-900 dark:text-white">Recruitment Process Outsourcing</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Full managed recruitment by our specialists</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Recruitment Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <button 
                className="hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 py-2 cursor-pointer"
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              >
                <span>{t('nav.recruitmentServices', 'Recruitment Services')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180 text-[#2563EB] dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`} />
              </button>

              {isServicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-white">Professional Workforce Solutions</p>
                    <p className="text-slate-500 dark:text-slate-400">Beyond standard job postings</p>
                  </div>
                  <button 
                    onClick={() => { setIsServicesDropdownOpen(false); onOpenServicesModal('srv-c'); }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 flex items-start gap-2.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#142B4A] dark:text-blue-400 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-slate-900 dark:text-white">Executive Search & Headhunting</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Confidential C-suite & VP talent mapping</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => { setIsServicesDropdownOpen(false); onOpenServicesModal('srv-e'); }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 flex items-start gap-2.5 cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-[#2563EB] dark:text-blue-400 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-slate-900 dark:text-white">Contract Staffing & Contingent</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Scalable project and interim workforce</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => { setIsServicesDropdownOpen(false); onOpenServicesModal('srv-d'); }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 flex items-start gap-2.5 cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-lime-600 dark:text-lime-400 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-slate-900 dark:text-white">Recruiter & Agency Solutions</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Multi-client pipeline portal for staffing firms</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <a 
              href="#resources" 
              className="hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>{t('nav.careerResources', 'Career Resources')}</span>
            </a>

            <a 
              href="#partners" 
              className="hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav.partners', 'Partners')}
            </a>

            <button
              onClick={() => onOpenAiAssistant('candidate')}
              className="text-[#2563EB] dark:text-blue-400 hover:text-[#1D4ED8] bg-blue-50/80 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-800/60 font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg shadow-2xs cursor-pointer"
              title="AI Candidate & Job Matcher"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
              <span>{t('nav.aiAssistant', 'AI Assistant')}</span>
            </button>

            <button
              onClick={onOpenCandidateDashboard}
              className="text-lime-800 dark:text-lime-300 hover:text-lime-900 bg-lime-50/90 dark:bg-lime-950/60 hover:bg-lime-100 dark:hover:bg-lime-900/60 border border-lime-200/80 dark:border-lime-800/60 font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg shadow-2xs cursor-pointer"
              title="Candidate Dashboard with Mock NLP Resume Parser & Interview Calendar"
            >
              <Zap className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
              <span>{t('nav.candidateDashboard', 'Candidate Dashboard')}</span>
            </button>

            {onOpenResumeBuilder && (
              <button
                onClick={onOpenResumeBuilder}
                className="text-indigo-800 dark:text-indigo-300 hover:text-indigo-900 bg-indigo-50/90 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800/60 font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg shadow-2xs cursor-pointer"
                title="Create a professional CV with the step-by-step Resume Builder and PDF export"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Resume Builder</span>
              </button>
            )}

            {onOpenRecruiterDashboard && (
              <button
                onClick={onOpenRecruiterDashboard}
                className="text-[#142B4A] dark:text-white hover:text-blue-600 bg-slate-100/90 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg shadow-2xs cursor-pointer"
                title="Employer & Recruiter Portal - Saved Candidates & Talent Search"
              >
                <Users className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                <span>{t('nav.recruiterPortal', 'Recruiter Portal')}</span>
                {savedCandidatesCount > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-lime-500 text-slate-950">
                    {savedCandidatesCount}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={onOpenApiDocs}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md cursor-pointer"
              title="View REST & GraphQL API Integration Specifications"
            >
              <Code2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>{t('nav.apiSpecs', 'API Specs')}</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action & Authentication */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Global Language Selector */}
            <LanguageSelector />

            {/* Global Currency Selector Provider */}
            <CurrencySelector />

            {/* Theme Toggle Component */}
            <ThemeToggle />

            {/* Job Alerts indicator */}
            <button
              onClick={onOpenJobAlerts}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title={`Job Alerts (${alertsCount} active)`}
              aria-label={`Job Alerts (${alertsCount} active)`}
            >
              <Bell className="w-5 h-5" />
              {alertsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {alertsCount}
                </span>
              )}
            </button>

            {/* Saved Jobs indicator */}
            <button
              onClick={onOpenSavedJobs}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-[#142B4A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title={`Saved Jobs (${savedJobsCount})`}
            >
              <Bookmark className="w-5 h-5" />
              {savedJobsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#2563EB] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {savedJobsCount}
                </span>
              )}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-semibold text-slate-900 dark:text-white truncate max-w-[120px]">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">{currentUser.role.replace('_', ' ')}</div>
                </div>
                <button
                  onClick={onSignOut}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={handleLinkedInSignInClick}
                  disabled={isLinkedInSyncing}
                  className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#0077B5] hover:bg-[#005f93] text-white transition-all shadow-xs cursor-pointer disabled:opacity-75"
                  title="Sign in with LinkedIn to instantly import profile & verified skills"
                >
                  {isLinkedInSyncing ? (
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.54a1.63 1.63 0 1 0 0 3.25 1.63 1.63 0 0 0 0-3.25z" />
                    </svg>
                  )}
                  <span>{isLinkedInSyncing ? 'Importing...' : 'Sign in with LinkedIn'}</span>
                </button>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#142B4A] dark:hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Primary Action Button with Persona Dropdown */}
            <div className="relative">
              <div className="flex items-center rounded-lg shadow-sm bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white transition-all">
                <button
                  type="button"
                  onClick={() => onOpenPostJob()}
                  className="px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap flex items-center gap-1.5 active:scale-[0.98] cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Post Vacancy</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPostMenuOpen(!isPostMenuOpen)}
                  className="px-2 py-2.5 border-l border-blue-400/40 hover:bg-black/15 rounded-r-lg transition-colors cursor-pointer"
                  title="Choose persona to post vacancy"
                  aria-label="Choose persona to post vacancy"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isPostMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Quick Persona Dropdown */}
              {isPostMenuOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 text-xs z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setIsPostMenuOpen(false)}
                >
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Post Vacancy As
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenPostJob('company')}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Employer or Company</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Direct corporate employer</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenPostJob('individual')}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Individual / Founder</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Private client or solo founder</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenPostJob('agency')}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Recruiter or Agency</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Staffing firm or external RPO</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenPostJob('headhunter')}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Target className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Executive Headhunter</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Retained executive search</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0B1120] border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-xl transition-colors duration-300">
          {/* Mobile Language, Currency & Theme Strips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-[#0F172A] rounded-xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t('nav.language', 'Language')}
              </span>
              <LanguageSelector compact />
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-[#0F172A] rounded-xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Currency
              </span>
              <CurrencySelector compact />
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-[#0F172A] rounded-xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Theme
              </span>
              <ThemeToggle showLabel />
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-base font-medium text-slate-800 dark:text-slate-200">
            <button 
              onClick={() => { setIsMobileMenuOpen(false); onOpenAiAssistant('candidate'); }}
              className="flex items-center justify-between p-2 rounded-lg bg-blue-50/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold text-left cursor-pointer"
            >
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#2563EB] dark:text-blue-400" /> AI Talent Assistant</span>
              <span className="text-[10px] bg-blue-200/70 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1.5 py-0.5 rounded font-mono">Gemini</span>
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); onOpenCandidateDashboard(); }}
              className="flex items-center justify-between p-2 rounded-lg bg-lime-50/70 dark:bg-lime-950/60 text-lime-800 dark:text-lime-300 font-semibold text-left cursor-pointer"
            >
              <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-lime-600 dark:text-lime-400" /> Candidate Dashboard</span>
              <span className="text-[10px] bg-lime-200/70 dark:bg-lime-900 text-lime-900 dark:text-lime-200 px-1.5 py-0.5 rounded font-mono">NLP Auto-Fill</span>
            </button>
            {onOpenResumeBuilder && (
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onOpenResumeBuilder(); }}
                className="flex items-center justify-between p-2 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-semibold text-left cursor-pointer"
              >
                <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Resume Builder</span>
                <span className="text-[10px] bg-indigo-200/70 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 px-1.5 py-0.5 rounded font-mono">PDF Export</span>
              </button>
            )}
            {onOpenPaymentGateways && (
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onOpenPaymentGateways('employer'); }}
                className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold text-left cursor-pointer"
              >
                <span className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Payment Gateways</span>
                <span className="text-[10px] bg-emerald-200/70 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 px-1.5 py-0.5 rounded font-mono">20+ Gateways</span>
              </button>
            )}
            <button 
              onClick={() => { setIsMobileMenuOpen(false); onOpenSearch(); }}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left cursor-pointer"
            >
              <span className="flex items-center gap-2"><Search className="w-4 h-4 text-[#2563EB] dark:text-blue-400" /> Find Jobs</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Directory</span>
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); onOpenJobAlerts(); }}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                <span>Job Alerts</span>
              </span>
              <span className="text-xs bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 font-bold px-2 py-0.5 rounded-full">
                {alertsCount} Active
              </span>
            </button>
            <a 
              href="#companies" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <span className="flex items-center gap-2"><Building2 className="w-4 h-4 text-[#2563EB] dark:text-blue-400" /> Companies</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Verified</span>
            </a>
            <a 
              href="#services" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <span className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-lime-600 dark:text-lime-400" /> Recruitment Services</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">RPO & Search</span>
            </a>
            <a 
              href="#for-employers" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-[#142B4A] dark:text-blue-400" /> For Employers</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">HRMS</span>
            </a>
            <a 
              href="#resources" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-amber-500" /> Career Resources</span>
            </a>
            <a 
              href="#partners" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <span className="flex items-center gap-2"><Users className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Partners</span>
            </a>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {!currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLinkedInSignInClick();
                  }}
                  disabled={isLinkedInSyncing}
                  className="w-full py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-semibold rounded-lg bg-[#0077B5] hover:bg-[#005f93] text-white transition-all shadow-xs cursor-pointer disabled:opacity-75"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.54a1.63 1.63 0 1 0 0 3.25 1.63 1.63 0 0 0 0-3.25z" />
                  </svg>
                  <span>{isLinkedInSyncing ? 'Importing from LinkedIn...' : 'Sign in with LinkedIn Profile'}</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); onOpenAuth('login'); }}
                    className="w-full py-2.5 text-center text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); onOpenAuth('register'); }}
                    className="w-full py-2.5 text-center text-sm font-semibold text-[#2563EB] dark:text-blue-400 border border-[#2563EB] dark:border-blue-500 rounded-lg cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">{currentUser.role.replace('_', ' ')}</p>
                </div>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onSignOut(); }}
                  className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
            <button
              onClick={() => { setIsMobileMenuOpen(false); onOpenPostJob(); }}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-[#2563EB] dark:bg-blue-600 rounded-lg shadow-sm cursor-pointer"
            >
              Post a Job Vacancy
            </button>
          </div>
        </div>
      )}
    </header>
    </>
  );
};
