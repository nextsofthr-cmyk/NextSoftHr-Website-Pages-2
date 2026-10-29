import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CheckCircle, 
  Bookmark, 
  Share2, 
  UploadCloud, 
  CheckCircle2, 
  ExternalLink,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Zap,
  FileText,
  Lock,
  Building2,
  User,
  Users,
  Target,
  TrendingUp,
  BarChart3,
  DollarSign,
  GraduationCap,
  Video,
  Bell
} from 'lucide-react';
import { Job, Company, CandidateApplication, ScheduledInterview, InterviewStatus, ParsedResumeProfile } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { InterviewScheduler } from './InterviewScheduler';
import { SalaryCompetitivenessChart } from './SalaryCompetitivenessChart';
import { D3SalaryDistributionChart } from './D3SalaryDistributionChart';
import { AiSalaryMarketBenchmark } from './AiSalaryMarketBenchmark';
import { parseResumeWithMockNlp, generateTailoredCoverNote } from '../utils/resumeParser';
import { SocialShareModal } from './SocialShareModal';
import { MockInterviewVideoModal } from './MockInterviewVideoModal';
import { AiResumeTailor } from './AiResumeTailor';
import { InterviewPrepReminderCard } from './InterviewPrepReminderCard';

interface JobDetailsModalProps {
  job: Job | null;
  company?: Company;
  allJobs?: Job[];
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onApplySubmit: (application: CandidateApplication) => void;
  interviews?: ScheduledInterview[];
  onScheduleInterview?: (interview: ScheduledInterview) => void;
  onUpdateInterviewStatus?: (interviewId: string, status: InterviewStatus, confirmedSlotId?: string, notes?: string) => void;
  parsedProfile?: ParsedResumeProfile | null;
  onSaveParsedProfile?: (profile: ParsedResumeProfile) => void;
  onToast?: (message: string) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  company,
  allJobs = [],
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onApplySubmit,
  interviews = [],
  onScheduleInterview,
  onUpdateInterviewStatus,
  parsedProfile = null,
  onSaveParsedProfile,
  onToast
}) => {
  const { currentCurrency, currencyConfig, convertAndFormatSalary } = useCurrency();
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'salary' | 'scheduler'>('overview');
  const [salaryChartType, setSalaryChartType] = useState<'ai-line-benchmark' | 'd3-distribution' | 'market-matrix'>('ai-line-benchmark');
  const [isApplying, setIsApplying] = useState(false);
  const [fullName, setFullName] = useState(parsedProfile?.fullName || '');
  const [email, setEmail] = useState(parsedProfile?.email || '');
  const [phone, setPhone] = useState(parsedProfile?.phone || '');
  const [currentRole, setCurrentRole] = useState(parsedProfile?.currentRole || '');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [cvFileName, setCvFileName] = useState(parsedProfile?.fileName || '');
  const [extractedSkills, setExtractedSkills] = useState<string[]>(parsedProfile?.extractedSkills || []);
  const [isNlpParsingCv, setIsNlpParsingCv] = useState(false);
  const [nlpStatusText, setNlpStatusText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [isMockVideoModalOpen, setIsMockVideoModalOpen] = useState(false);

  if (!isOpen || !job) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCvFileName(file.name);
      setIsNlpParsingCv(true);
      try {
        const parsed = await parseResumeWithMockNlp(file, (step) => {
          setNlpStatusText(step);
        });

        // Pre-fill application form fields from parsed resume!
        setFullName(parsed.fullName);
        setEmail(parsed.email);
        setPhone(parsed.phone);
        setCurrentRole(parsed.currentRole);
        setExtractedSkills(parsed.extractedSkills);
        setCoverNote(generateTailoredCoverNote(parsed, job.title, job.companyName));

        if (onSaveParsedProfile) {
          onSaveParsedProfile(parsed);
        }

        if (onToast) {
          onToast(`⚡ Mock NLP Engine extracted ${parsed.extractedSkills.length} skills & experience from "${file.name}"!`);
        }
      } catch {
        if (onToast) onToast('Failed to parse resume document.');
      } finally {
        setIsNlpParsingCv(false);
      }
    }
  };

  const handleApplyAutoFillFromProfile = () => {
    if (!parsedProfile) return;
    setFullName(parsedProfile.fullName);
    setEmail(parsedProfile.email);
    setPhone(parsedProfile.phone);
    setCurrentRole(parsedProfile.currentRole);
    setCvFileName(parsedProfile.fileName);
    setExtractedSkills(parsedProfile.extractedSkills);
    setCoverNote(generateTailoredCoverNote(parsedProfile, job.title, job.companyName));
    if (onToast) {
      onToast(`⚡ Pre-filled form with parsed resume for ${parsedProfile.fullName}!`);
    }
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    onApplySubmit({
      jobId: job.id,
      fullName,
      email,
      phone,
      currentRole,
      linkedinUrl,
      coverNote,
      cvFileName: cvFileName || 'Resume_Document.pdf',
      appliedAt: new Date().toLocaleDateString(),
      extractedSkills
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsApplying(false);
      onClose();
    }, 1800);
  };

  // Social Share Pre-Populated URLs
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://nextsofthr.com';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const shareUrl = `${origin}${pathname}?job=${job.id}`;

  const twitterShareText = `Hiring: ${job.title} at ${job.companyName} (${job.location} · ${job.workArrangement})! Remuneration: ${job.salaryRange || 'Competitive'}. Check specifications & apply on @NextSoftHR:`;

  const whatsappShareText = `💼 *Job Opening: ${job.title}*\n🏢 *Company:* ${job.companyName}\n📍 *Location:* ${job.location} (${job.workArrangement})\n💰 *Compensation:* ${job.salaryRange || 'Competitive'}\n\n👉 *View details & apply on NextSoftHR:*\n${shareUrl}`;

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterShareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(`jobs,hiring,NextSoftHR,${job.category?.replace(/[^a-zA-Z0-9]/g, '') || 'careers'}`)}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappShareText)}`;

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleCopyDirectLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      if (onToast) onToast(`📋 Job URL copied to clipboard: ${job.title}`);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => {
          e.stopPropagation();
          if (shareMenuOpen) setShareMenuOpen(false);
        }}
      >
        
        {/* Modal Top Bar */}
        <div className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#142B4A] dark:text-white font-bold text-sm tracking-wider">
              {job.companyInitials}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{job.companyName}</span>
                {job.isVerified && <CheckCircle className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Recruitment Source: {job.recruiterSource || 'Direct Employer'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 relative">
            {/* 60s Mock Prep Video Button */}
            <button
              type="button"
              onClick={() => setIsMockVideoModalOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Watch personalized 60-second Mock Interview Prep Video"
            >
              <Video className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span className="hidden sm:inline">60s Mock Video</span>
              <Sparkles className="w-3 h-3 text-purple-500" />
            </button>

            {/* Social Share Button & Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShareMenuOpen(!shareMenuOpen);
                }}
                className={`p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                  shareMenuOpen 
                    ? 'bg-blue-100 text-[#2563EB] dark:bg-blue-950 dark:text-blue-400' 
                    : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Share job opening directly to LinkedIn, Twitter, or WhatsApp"
                aria-label="Share job opening"
                aria-expanded={shareMenuOpen}
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-semibold">Share</span>
              </button>

              {/* Share Popover Menu */}
              {shareMenuOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-30 space-y-1 animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-2 py-1 border-b border-slate-100 dark:border-slate-800 mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Share to Social Media
                    </span>
                    <button 
                      type="button"
                      onClick={() => setShareMenuOpen(false)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs cursor-pointer"
                    >
                      ×
                    </button>
                  </div>

                  {/* LinkedIn Share */}
                  <a
                    href={linkedinShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setShareMenuOpen(false);
                      if (onToast) onToast(`Sharing ${job.title} to LinkedIn`);
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-200 transition-colors text-xs font-medium cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    </div>
                    <span>Share on LinkedIn</span>
                  </a>

                  {/* Twitter / X Share */}
                  <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setShareMenuOpen(false);
                      if (onToast) onToast(`Sharing ${job.title} to Twitter / X`);
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-xs font-medium cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <span>Share on Twitter / X</span>
                  </a>

                  {/* WhatsApp Share */}
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setShareMenuOpen(false);
                      if (onToast) onToast(`Sharing ${job.title} to WhatsApp`);
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-700 dark:text-slate-200 transition-colors text-xs font-medium cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.24-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.3z"/>
                      </svg>
                    </div>
                    <span>Share on WhatsApp</span>
                  </a>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => {
                        handleCopyDirectLink();
                        setShareMenuOpen(false);
                      }}
                      className="px-2 py-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium hover:underline cursor-pointer"
                    >
                      Copy Link
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShareMenuOpen(false);
                        setIsShareModalOpen(true);
                      }}
                      className="px-2 py-1 text-[#2563EB] dark:text-blue-400 font-bold hover:underline cursor-pointer"
                    >
                      Customize...
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onToggleSave(job.id)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isSaved ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
              title={isSaved ? 'Saved' : 'Save Job'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="px-6 sm:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2 sm:gap-6 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveModalTab('overview')}
            className={`py-3.5 border-b-2 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeModalTab === 'overview'
                ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span>Role Specifications & Company</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModalTab('salary')}
            className={`py-3.5 border-b-2 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeModalTab === 'salary'
                ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            <span>Salary & Market Benchmark</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-100 dark:bg-lime-950/70 text-lime-800 dark:text-lime-300 border border-lime-300 dark:border-lime-800">
              Recharts
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModalTab('scheduler')}
            className={`py-3.5 border-b-2 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeModalTab === 'scheduler'
                ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Interview Scheduler</span>
            {interviews.some(i => i.jobId === job.id) ? (
              (() => {
                const inv = interviews.find(i => i.jobId === job.id)!;
                return (
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                    inv.status === 'confirmed'
                      ? 'bg-lime-100 text-lime-800 dark:bg-lime-950/60 dark:text-lime-300'
                      : inv.status === 'rescheduled'
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}>
                    {inv.status}
                  </span>
                );
              })()
            ) : (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                Propose / Pick Slots
              </span>
            )}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Header Block */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] dark:text-white tracking-tight">
              {job.title}
            </h1>

            {/* Unboxed Metadata */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                {job.location}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{job.workArrangement}</span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span>{job.employmentType}</span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span>Experience: {job.experienceLevel}</span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span>Posted {job.datePosted}</span>
            </div>

            {/* Poster Persona Badge */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                job.posterType === 'individual' || job.recruiterSource === 'Individual / Founder'
                  ? 'bg-lime-100 text-lime-800 dark:bg-lime-950/70 dark:text-lime-300 border border-lime-300 dark:border-lime-800'
                  : job.posterType === 'agency' || job.recruiterSource === 'Partner Agency'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                  : job.posterType === 'headhunter' || job.recruiterSource === 'Executive Headhunter'
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
              }`}>
                {job.posterType === 'individual' || job.recruiterSource === 'Individual / Founder' ? (
                  <>
                    <User className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                    <span>Individual / Founder Direct Hire</span>
                  </>
                ) : job.posterType === 'agency' || job.recruiterSource === 'Partner Agency' ? (
                  <>
                    <Users className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Recruiter / Staffing Agency Mandate</span>
                  </>
                ) : job.posterType === 'headhunter' || job.recruiterSource === 'Executive Headhunter' ? (
                  <>
                    <Target className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>Executive Headhunter · Retained Search</span>
                  </>
                ) : (
                  <>
                    <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Direct Employer / Company</span>
                  </>
                )}
              </span>

              {job.posterDetails?.isConfidential && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  <Lock className="w-3 h-3 text-amber-500" />
                  <span>Confidential Mandate</span>
                </span>
              )}

              {job.posterDetails?.retainedMandateLevel && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  <span>Tier: {job.posterDetails.retainedMandateLevel}</span>
                </span>
              )}
            </div>

            {/* Role Attributes: Shift, Degree Level, Gender & Diversity, Skills */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Shift: {job.shift || 'Day Shift'}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60">
                <GraduationCap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Degree: {job.degreeLevel || "Bachelor's / B.Sc / HND"}</span>
              </span>

              {job.genderPreference === 'Female-Preferred / Diversity Initiative' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-fuchsia-50 dark:bg-fuchsia-950/60 text-fuchsia-800 dark:text-fuchsia-300 border border-fuchsia-200 dark:border-fuchsia-800">
                  <Sparkles className="w-3.5 h-3.5 text-fuchsia-600 dark:text-fuchsia-400" />
                  <span>Diversity & Inclusion Initiative</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  <span>{job.genderPreference || 'Equal Opportunity'}</span>
                </span>
              )}

              {job.skills && job.skills.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 ml-1">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Compensation & CTA Bar */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Proposed Remuneration:</span>
                <span className="text-xl font-black text-[#142B4A] dark:text-white tabular-nums">
                  {convertAndFormatSalary(job.salaryRange, job.currency)}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  {currentCurrency !== job.currency ? (
                    <span>Original: {job.salaryRange} ({job.currency}) · Converted to {currencyConfig.name} ({currencyConfig.code})</span>
                  ) : (
                    <span>{job.currency === 'NGN' ? 'Nigerian Naira (Monthly Gross)' : `${currencyConfig.name} (${currencyConfig.code})`}</span>
                  )}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModalTab('salary')}
                  className="px-3.5 py-2.5 bg-lime-50 hover:bg-lime-100 dark:bg-lime-950/60 dark:hover:bg-lime-900/60 text-lime-800 dark:text-lime-300 border border-lime-200 dark:border-lime-800/80 font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                  <span>Salary Chart</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsMockVideoModalOpen(true)}
                  className="px-3.5 py-2.5 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80 font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Generate a personalized 60-second Mock Interview Prep summary video"
                >
                  <Video className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>60s Mock Video</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModalTab('scheduler')}
                  className="px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-[#142B4A] dark:text-white border border-slate-200 dark:border-slate-700 font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
                  <span>Interview Scheduler</span>
                  {interviews.some(i => i.jobId === job.id) && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  )}
                </button>

                {!isApplying && !isSubmitted && (
                  <button
                    onClick={() => {
                      setActiveModalTab('overview');
                      setIsApplying(true);
                    }}
                    className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply for Position</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* If on Interview Scheduler tab: Render Scheduler */}
          {activeModalTab === 'scheduler' ? (
            <InterviewScheduler
              job={job}
              interviews={interviews}
              onScheduleInterview={onScheduleInterview || (() => {})}
              onUpdateInterviewStatus={onUpdateInterviewStatus || (() => {})}
              candidateDefaultName={fullName || 'Adaeze Okonkwo'}
              candidateDefaultEmail={email || 'adaeze.okonkwo@example.com'}
              onToast={onToast}
            />
          ) : activeModalTab === 'salary' ? (
            /* Dedicated Salary Competitiveness & Benchmarking Tab with D3 Distribution Curve */
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Chart Subtab Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSalaryChartType('ai-line-benchmark')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                      salaryChartType === 'ai-line-benchmark'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                    <span>AI Salary Benchmark (Interactive Line Chart)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSalaryChartType('d3-distribution')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                      salaryChartType === 'd3-distribution'
                        ? 'bg-lime-500 text-slate-950 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>D3 Distribution Curve</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSalaryChartType('market-matrix')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                      salaryChartType === 'market-matrix'
                        ? 'bg-lime-500 text-slate-950 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Cross-Company Comparison</span>
                  </button>
                </div>

                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hidden lg:inline">
                  AI-Powered Market Engine
                </span>
              </div>

              {/* Render chosen chart */}
              {salaryChartType === 'ai-line-benchmark' ? (
                <AiSalaryMarketBenchmark
                  currentJob={job}
                  candidateExperienceLevel={job.experienceLevel}
                  parsedYearsOfExperience={parsedProfile?.yearsOfExperience}
                  onApplyPreset={(val) => {
                    setActiveModalTab('overview');
                    setIsApplying(true);
                    if (onToast) onToast(`Target compensation benchmark applied: ${val}`);
                  }}
                />
              ) : salaryChartType === 'd3-distribution' ? (
                <D3SalaryDistributionChart
                  job={job}
                  candidateExperienceLevel={job.experienceLevel}
                  parsedYearsOfExperience={parsedProfile?.yearsOfExperience}
                  onApplyPreset={(val) => {
                    setActiveModalTab('overview');
                    setIsApplying(true);
                    if (onToast) onToast(`Target compensation benchmark applied: ${val}`);
                  }}
                />
              ) : (
                <SalaryCompetitivenessChart currentJob={job} allJobs={allJobs} />
              )}
              
              {/* Extra Market Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="font-bold text-[#142B4A] dark:text-white text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Industry Compensation Factors</span>
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Roles in <strong className="text-slate-800 dark:text-white">{job.industry || job.category}</strong> within <strong className="text-slate-800 dark:text-white">{job.location}</strong> reflect technical stack seniority, local currency stability, and market demand. Senior candidates often secure additional allowances or annual retention bonuses.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="font-bold text-[#142B4A] dark:text-white text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                    <span>Total Rewards & Perks In Scope</span>
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Beyond the base pay of <strong className="text-slate-800 dark:text-white">{job.salaryRange}</strong>, this role includes {job.benefits.length} verified employer benefits (e.g. {job.benefits.slice(0, 2).join(', ')}), enhancing the candidate’s overall financial and healthcare package.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveModalTab('overview')}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  ← Back to Role Specifications
                </button>

                {!isApplying && !isSubmitted && (
                  <button
                    onClick={() => {
                      setActiveModalTab('overview');
                      setIsApplying(true);
                    }}
                    className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply for this Role with Benchmarked Salary</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Active Interview Notice Strip in Overview tab */}
              {(() => {
                const activeInv = interviews.find(i => i.jobId === job.id);
                if (!activeInv) return null;
                return (
                  <div 
                    onClick={() => setActiveModalTab('scheduler')}
                    className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-slate-800/80 border border-blue-200 dark:border-blue-900/50 flex items-center justify-between gap-3 cursor-pointer hover:bg-blue-100/60 dark:hover:bg-slate-750 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            Interview in Progress: {activeInv.interviewType}
                          </span>
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                            activeInv.status === 'confirmed'
                              ? 'bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300'
                              : activeInv.status === 'rescheduled'
                              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          }`}>
                            {activeInv.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {activeInv.status === 'confirmed' 
                            ? `Confirmed for ${activeInv.confirmedSlot?.formattedDate} at ${activeInv.confirmedSlot?.formattedTime}`
                            : activeInv.status === 'rescheduled'
                            ? 'Candidate requested reschedule - awaiting new slot review'
                            : `${activeInv.proposedSlots.length} time slots proposed - click to select & confirm`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#2563EB] dark:text-blue-400 group-hover:translate-x-0.5 transition-transform shrink-0">
                      <span>View Scheduler</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })()}

              {/* 24-Hour Interview Prep Reminder & Checklist */}
              <InterviewPrepReminderCard
                job={job}
                interview={interviews.find(i => i.jobId === job.id)}
                onToast={onToast}
                onOpenMockVideo={() => setIsMockVideoModalOpen(true)}
              />

              {/* Direct Social Media Sharing Card (LinkedIn, Twitter, WhatsApp with pre-populated content) */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 via-slate-50 to-lime-50/60 dark:from-slate-800/70 dark:via-slate-850 dark:to-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0 mt-0.5">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-xs">
                        Share Job Listing
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300 border border-lime-300 dark:border-lime-800">
                        Pre-Populated Content
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                      Share directly with your network on LinkedIn, Twitter, or WhatsApp with rich formatted blurbs.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {/* LinkedIn */}
                  <a
                    href={linkedinShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (onToast) onToast(`Opening LinkedIn share for ${job.title}...`);
                    }}
                    className="px-3 py-2 bg-[#0A66C2] hover:bg-[#084e96] text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                    title="Share directly to LinkedIn"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>

                  {/* Twitter / X */}
                  <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (onToast) onToast(`Opening Twitter / X share for ${job.title}...`);
                    }}
                    className="px-3 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                    title="Share directly to Twitter / X"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>Twitter / X</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (onToast) onToast(`Opening WhatsApp share for ${job.title}...`);
                    }}
                    className="px-3 py-2 bg-[#25D366] hover:bg-[#1fae53] text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                    title="Share directly to WhatsApp"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.24-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.3z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </a>

                  {/* Open Preview Modal */}
                  <button
                    type="button"
                    onClick={() => setIsShareModalOpen(true)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    title="Customize & Preview Pre-populated Post"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Preview & Copy</span>
                  </button>
                </div>
              </div>

          {copiedLink && (
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Link copied to clipboard!</span>
            </div>
          )}

          {/* If Candidate Clicked Apply: Embedded Application Form */}
          {isApplying && (
            <div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-slate-950 border border-blue-200 dark:border-slate-800 animate-in fade-in duration-150">
              {isSubmitted ? (
                <div className="text-center py-6 space-y-2">
                  <div className="w-12 h-12 bg-lime-100 dark:bg-lime-950/60 text-lime-700 dark:text-lime-400 rounded-full flex items-center justify-center mx-auto border border-lime-300 dark:border-lime-800">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Application Submitted!</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">Your profile and CV have been routed to the hiring team at {job.companyName}.</p>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-blue-200/80 dark:border-slate-800 pb-2">
                    <div>
                      <h3 className="font-bold text-[#142B4A] dark:text-white text-sm">Submit Candidate Application</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Upload your resume to auto-extract skills & experience using our mock NLP engine.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsApplying(false)}
                      className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* 1-Click Auto-Fill from Candidate Dashboard Parsed Profile */}
                  {parsedProfile && (
                    <div className="p-3 bg-gradient-to-r from-lime-50 to-emerald-50 dark:from-slate-850 dark:to-lime-950/30 rounded-xl border border-lime-200 dark:border-lime-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-800 dark:text-white">
                            Parsed Resume Profile Available: {parsedProfile.fullName}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                            {parsedProfile.currentRole} · {parsedProfile.extractedSkills.length} skills identified
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleApplyAutoFillFromProfile}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
                      >
                        ⚡ 1-Click Auto-Fill
                      </button>
                    </div>
                  )}

                  {/* CV Upload with Mock NLP Engine */}
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Upload Resume PDF / CV (Extracts Skills & Pre-fills Form)
                    </label>
                    <label className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white dark:bg-slate-850 ${
                      isNlpParsingCv
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40'
                        : 'border-blue-300 dark:border-blue-800 hover:bg-blue-50/80 dark:hover:bg-slate-800'
                    }`}>
                      {isNlpParsingCv ? (
                        <div className="flex flex-col items-center gap-2 py-1">
                          <Sparkles className="w-6 h-6 text-blue-600 animate-spin" />
                          <span className="font-bold text-xs text-blue-700 dark:text-blue-300">
                            {nlpStatusText || 'Mock NLP Engine: Analyzing resume tokens...'}
                          </span>
                          <span className="text-[11px] text-slate-500">Extracting skills, tenure, and contact details...</span>
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="w-6 h-6 text-[#2563EB] dark:text-blue-400 mb-1" />
                          <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                            {cvFileName ? cvFileName : 'Click to select or drop your resume (PDF, DOCX)'}
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            PDF or DOCX up to 5MB · Auto-analyzed by Mock NLP Engine
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc,.txt"
                        onChange={handleFileChange}
                        disabled={isNlpParsingCv}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Babatunde Sowore"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 803 000 0000"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Current Job Title</label>
                      <input
                        type="text"
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value)}
                        placeholder="e.g. Senior People Partner"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Extracted Skills Chips if available */}
                  {extractedSkills.length > 0 && (
                    <div className="p-3 bg-blue-50/60 dark:bg-slate-800/80 rounded-xl border border-blue-200/80 dark:border-slate-700 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>Extracted Skills from Resume ({extractedSkills.length}):</span>
                        </span>
                        <span className="text-slate-400">Attached to application</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {extractedSkills.map((skill) => (
                          <span 
                            key={skill}
                            className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 border border-blue-200 dark:border-slate-600 text-[11px] font-semibold text-slate-700 dark:text-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Resume Tailor: Bullet-Point Refinements & Keyword Alignment */}
                  <AiResumeTailor
                    job={job}
                    candidateProfile={parsedProfile}
                    extractedSkills={extractedSkills}
                    onApplyBulletToCoverNote={(bullet) => {
                      setCoverNote(prev => prev ? `${prev}\n• ${bullet}` : `• ${bullet}`);
                    }}
                    onToast={onToast}
                  />

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Brief Cover Note / Why You're a Great Fit</label>
                    <textarea
                      rows={3}
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      placeholder="Summarize your relevant accomplishments for this opening..."
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-xl shadow-sm text-xs transition-colors cursor-pointer"
                  >
                    Send Pre-filled Application to Hiring Team
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Job Description Overview */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#142B4A] dark:text-white">Role Overview</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#142B4A] dark:text-white">Key Responsibilities</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {job.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-blue-400 mt-2 shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Candidate Requirements */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#142B4A] dark:text-white">Required Qualifications & Skills</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-500 dark:bg-lime-400 mt-2 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Compensation & Benefits */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#142B4A] dark:text-white">Perks & Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
              {job.benefits.map((benefit, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Salary Competitiveness & Market Comparison (Recharts) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#142B4A] dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                  <span>Salary Range & Industry Competitiveness</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Benchmarked against similar verified roles in {job.location} & {job.industry || job.category}
                </p>
              </div>
            </div>
            <SalaryCompetitivenessChart currentJob={job} allJobs={allJobs} />
          </div>

          {/* Company Card */}
          {company && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#142B4A] dark:text-white text-sm">About {company.name}</span>
                    <span className="text-slate-500 dark:text-slate-400">{company.employeeCount}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{company.description}</p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
                    <span>Headquarters: {company.headquarters}</span>
                    <a href={company.website} target="_blank" rel="noreferrer" className="text-[#2563EB] dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold">
                      <span>Visit Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

      </div>

      {/* Social Media Sharing Modal with Pre-populated Content */}
      {isShareModalOpen && (
        <SocialShareModal
          job={job}
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          onToast={onToast}
        />
      )}

      {/* 60-Second Mock Interview Prep AI Summary Video Modal */}
      {isMockVideoModalOpen && (
        <MockInterviewVideoModal
          isOpen={isMockVideoModalOpen}
          onClose={() => setIsMockVideoModalOpen(false)}
          job={job}
          candidateProfile={parsedProfile}
          onToast={onToast}
        />
      )}
    </div>
  );
};
