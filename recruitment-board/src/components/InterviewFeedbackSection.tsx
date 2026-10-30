import React, { useState } from 'react';
import { 
  MessageSquare, 
  Star, 
  CheckCircle2, 
  User, 
  ShieldCheck, 
  ThumbsUp, 
  Clock, 
  Send, 
  Filter, 
  Sparkles,
  Building2,
  AlertCircle,
  Award,
  Check,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Copy,
  CheckCheck,
  Printer,
  Download,
  ArrowRight,
  Quote,
  Lightbulb,
  FileText,
  Search,
  ExternalLink
} from 'lucide-react';
import { Job, ScheduledInterview, InterviewFeedback, RecruiterPostInterviewFeedback } from '../types';
import { DEFAULT_RECRUITER_FEEDBACK_LIST } from '../data/mockRecruiterFeedback';

interface InterviewFeedbackSectionProps {
  jobs: Job[];
  interviews: ScheduledInterview[];
  feedbackList?: InterviewFeedback[];
  recruiterFeedbackList?: RecruiterPostInterviewFeedback[];
  onSubmitFeedback?: (feedback: InterviewFeedback) => void;
  candidateDefaultName?: string;
  onToast?: (message: string) => void;
  onOpenMessaging?: (companyName: string) => void;
}

const INITIAL_MOCK_COMMUNITY_FEEDBACK: InterviewFeedback[] = [
  {
    id: 'fb-1',
    interviewId: 'intv-1',
    jobId: 'job-1',
    jobTitle: 'Senior HR Business Partner (HRBP)',
    companyName: 'NextSoftHR Internal Talent',
    interviewType: 'Video Call (Google Meet)',
    isAnonymous: false,
    candidateName: 'Adaeze Okonkwo',
    candidateRole: 'Senior HR Business Partner',
    overallRating: 5,
    professionalismRating: 5,
    clarityRating: 5,
    relevanceRating: 4,
    punctualityRating: 5,
    difficulty: 'Fair & Balanced',
    wouldRecommend: true,
    feedbackTimeline: 'Prompt (< 48 hrs)',
    whatWentWell: 'The interview panel was exceptionally transparent about organizational restructure objectives and culture. Questions tested practical talent strategy rather than textbook theory.',
    constructiveFeedback: 'Technical connection instructions could be sent 15 minutes earlier to test camera and audio feeds.',
    adviceForCandidates: 'Bring concrete case studies of restructuring or retention turnarounds in emerging markets.',
    submittedAt: '3 days ago',
    reviewedByRecruiter: true
  },
  {
    id: 'fb-2',
    interviewId: 'intv-2',
    jobId: 'job-2',
    jobTitle: 'Lead Backend & Payment Systems Engineer',
    companyName: 'Paystack Financial',
    interviewType: 'Technical Screen',
    isAnonymous: true,
    candidateName: 'Anonymous Candidate',
    candidateRole: 'Principal Backend Engineer',
    overallRating: 4,
    professionalismRating: 5,
    clarityRating: 4,
    relevanceRating: 5,
    punctualityRating: 5,
    difficulty: 'Challenging',
    wouldRecommend: true,
    feedbackTimeline: 'Reasonable (3-5 days)',
    whatWentWell: 'Collaborative architectural whiteboard session on webhook idempotency and payment failovers. The interviewer was sharp and open to constructive debate.',
    constructiveFeedback: 'Give candidates 5 extra minutes at the start to read through complex system specs.',
    adviceForCandidates: 'Brush up on distributed transaction reconciliation patterns and database isolation levels.',
    submittedAt: '1 week ago',
    reviewedByRecruiter: true
  }
];

export const InterviewFeedbackSection: React.FC<InterviewFeedbackSectionProps> = ({
  jobs,
  interviews,
  feedbackList = [],
  recruiterFeedbackList,
  onSubmitFeedback,
  candidateDefaultName = 'Adaeze Okonkwo',
  onToast,
  onOpenMessaging
}) => {
  // Main view mode: 'recruiter-feedback' (primary user request) or 'community-reviews'
  const [viewMode, setViewMode] = useState<'recruiter-feedback' | 'community-reviews'>('recruiter-feedback');

  // Recruiter post-interview evaluations state
  const [recruiterEvaluations, setRecruiterEvaluations] = useState<RecruiterPostInterviewFeedback[]>(
    recruiterFeedbackList && recruiterFeedbackList.length > 0 
      ? recruiterFeedbackList 
      : DEFAULT_RECRUITER_FEEDBACK_LIST
  );

  const [selectedEvaluationId, setSelectedEvaluationId] = useState<string>(
    DEFAULT_RECRUITER_FEEDBACK_LIST[0]?.id || ''
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Community feedback state
  const [communityReviews, setCommunityReviews] = useState<InterviewFeedback[]>(
    feedbackList.length > 0 ? feedbackList : INITIAL_MOCK_COMMUNITY_FEEDBACK
  );
  const [isCommunityFormOpen, setIsCommunityFormOpen] = useState(false);
  const [filterCompany, setFilterCompany] = useState<string>('all');

  // Community Form state
  const [targetJobId, setTargetJobId] = useState<string>(jobs[0]?.id || 'job-1');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [overallRating, setOverallRating] = useState(5);
  const [professionalismRating, setProfessionalismRating] = useState(5);
  const [clarityRating, setClarityRating] = useState(4);
  const [relevanceRating, setRelevanceRating] = useState(5);
  const [punctualityRating, setPunctualityRating] = useState(5);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Fair & Balanced' | 'Challenging' | 'Very Tough'>('Fair & Balanced');
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [feedbackTimeline, setFeedbackTimeline] = useState<'Prompt (< 48 hrs)' | 'Reasonable (3-5 days)' | 'Slow (> 1 week)' | 'Still Awaiting'>('Prompt (< 48 hrs)');
  const [whatWentWell, setWhatWentWell] = useState('');
  const [constructiveFeedback, setConstructiveFeedback] = useState('');
  const [adviceForCandidates, setAdviceForCandidates] = useState('');

  const selectedJob = jobs.find(j => j.id === targetJobId) || jobs[0];

  // Filter recruiter evaluations
  const filteredEvaluations = recruiterEvaluations.filter(e => {
    const query = searchQuery.toLowerCase();
    return (
      e.companyName.toLowerCase().includes(query) ||
      e.jobTitle.toLowerCase().includes(query) ||
      e.recruiterName.toLowerCase().includes(query) ||
      e.recommendation.toLowerCase().includes(query)
    );
  });

  const activeEvaluation = recruiterEvaluations.find(e => e.id === selectedEvaluationId) || filteredEvaluations[0] || recruiterEvaluations[0];

  // Calculated stats for recruiter feedback
  const avgRecruiterScore = (
    recruiterEvaluations.reduce((acc, curr) => acc + curr.overallScore, 0) / (recruiterEvaluations.length || 1)
  ).toFixed(1);

  const strongHireCount = recruiterEvaluations.filter(e => e.recommendation === 'Strong Hire').length;
  const nextStageCount = recruiterEvaluations.filter(e => e.recommendation.includes('Next Stage') || e.recommendation === 'Strong Hire').length;

  const handleCopyEvaluation = (evaluation: RecruiterPostInterviewFeedback) => {
    const text = `NextSoftHR Recruiter Post-Interview Evaluation:
Company: ${evaluation.companyName}
Role: ${evaluation.jobTitle}
Recruiter: ${evaluation.recruiterName} (${evaluation.recruiterRole})
Interview Date: ${evaluation.interviewDate} (${evaluation.interviewType})
Overall Score: ${evaluation.overallScore} / 5.0 (${evaluation.recommendation})

Criteria Ratings:
${evaluation.criteriaRatings.map(c => `• ${c.criterion}: ${c.score}/5 - ${c.description}`).join('\n')}

Key Strengths:
${evaluation.keyStrengths.map(s => `+ ${s}`).join('\n')}

Areas for Growth:
${evaluation.growthAreas.map(g => `- ${g}`).join('\n')}

Recruiter Summary:
"${evaluation.summaryNotes}"

Next Steps: ${evaluation.nextSteps}`;

    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(evaluation.id);
    if (onToast) onToast(`📋 Copied official interview evaluation for ${evaluation.companyName}!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrintEvaluation = () => {
    window.print();
    if (onToast) onToast('Preparing print view of recruiter feedback...');
  };

  const handleCommunitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatWentWell.trim() || !constructiveFeedback.trim()) {
      if (onToast) onToast('Please provide both what went well and constructive feedback.');
      return;
    }

    const newFeedback: InterviewFeedback = {
      id: `fb-${Date.now()}`,
      jobId: selectedJob?.id || 'job-1',
      jobTitle: selectedJob?.title || 'Target Role',
      companyName: selectedJob?.companyName || 'Hiring Company',
      interviewType: 'Video & Competency Assessment',
      isAnonymous,
      candidateName: isAnonymous ? 'Anonymous Candidate' : candidateDefaultName,
      candidateRole: candidateDefaultName,
      overallRating,
      professionalismRating,
      clarityRating,
      relevanceRating,
      punctualityRating,
      difficulty,
      wouldRecommend,
      feedbackTimeline,
      whatWentWell,
      constructiveFeedback,
      adviceForCandidates: adviceForCandidates.trim() || undefined,
      submittedAt: 'Just now',
      reviewedByRecruiter: false
    };

    setCommunityReviews(prev => [newFeedback, ...prev]);
    if (onSubmitFeedback) onSubmitFeedback(newFeedback);
    if (onToast) onToast('✨ Interview feedback submitted anonymously to improve hiring transparency!');

    setWhatWentWell('');
    setConstructiveFeedback('');
    setAdviceForCandidates('');
    setIsCommunityFormOpen(false);
  };

  const filteredCommunityReviews = communityReviews.filter(r => {
    if (filterCompany === 'all') return true;
    return r.companyName.toLowerCase().includes(filterCompany.toLowerCase());
  });

  return (
    <div className="space-y-6">

      {/* Top Navigation Mode Pill Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewMode('recruiter-feedback')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'recruiter-feedback'
                ? 'bg-white dark:bg-slate-900 text-[#2563EB] dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Recruiter Feedback & Scorecards</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {recruiterEvaluations.length} Shared
            </span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('community-reviews')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'community-reviews'
                ? 'bg-white dark:bg-slate-900 text-[#2563EB] dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-slate-500" />
            <span>Community Transparency Reviews</span>
            <span className="text-[10px] text-slate-400">
              ({communityReviews.length})
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 px-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Official Recruiter Post-Interview Audit</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODE 1: RECRUITER POST-INTERVIEW FEEDBACK & SCORECARDS        */}
      {/* ============================================================== */}
      {viewMode === 'recruiter-feedback' && (
        <div className="space-y-6 animate-in fade-in duration-150">

          {/* Recruiter Evaluation Banner & Performance Stats */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-900 border border-emerald-200 dark:border-emerald-800/80 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Recruiter Post-Interview Feedback</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#142B4A] dark:text-white tracking-tight">
                  Candidate Evaluation Scorecards
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Review ratings, competency criteria scores, standout strengths, and direct qualitative guidance shared by hiring teams following your completed interviews.
                </p>
              </div>

              {/* Stat Metric Cards */}
              <div className="grid grid-cols-3 gap-3 shrink-0">
                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-emerald-200/80 dark:border-slate-700 text-center shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Avg Score
                  </span>
                  <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 font-black text-xl mt-0.5">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{avgRecruiterScore}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">/ 5.0 Scale</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-emerald-200/80 dark:border-slate-700 text-center shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Advancement
                  </span>
                  <div className="font-black text-xl text-blue-600 dark:text-blue-400 mt-0.5">
                    {Math.round((nextStageCount / recruiterEvaluations.length) * 100)}%
                  </div>
                  <span className="text-[10px] text-slate-400">{nextStageCount} of {recruiterEvaluations.length} Hires</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-emerald-200/80 dark:border-slate-700 text-center shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Evaluations
                  </span>
                  <div className="font-black text-xl text-slate-900 dark:text-white mt-0.5">
                    {recruiterEvaluations.length}
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">All Completed</span>
                </div>
              </div>

            </div>
          </div>

          {/* Two-Column Layout: Left Master List, Right Detail Scorecard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Completed Interviews List (4 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Evaluated Interviews ({filteredEvaluations.length})
                </span>
                <span className="text-[11px] text-slate-400">Click to inspect</span>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by company, role or recruiter..."
                  className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* List of Evaluation Items */}
              <div className="space-y-2.5">
                {filteredEvaluations.map((ev) => {
                  const isSelected = ev.id === activeEvaluation?.id;
                  return (
                    <div
                      key={ev.id}
                      onClick={() => setSelectedEvaluationId(ev.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative space-y-2 ${
                        isSelected
                          ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                          : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">
                            {ev.companyName}
                          </span>
                          <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                            {ev.jobTitle}
                          </span>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          ev.recommendation === 'Strong Hire'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        }`}>
                          {ev.recommendation}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-750">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 font-bold text-[10px] flex items-center justify-center text-slate-700 dark:text-slate-300">
                            {ev.recruiterAvatar || ev.recruiterName.slice(0, 2).toUpperCase()}
                          </span>
                          <span>{ev.recruiterName}</span>
                        </div>

                        <div className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>{ev.overallScore.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 flex items-center justify-between">
                        <span>{ev.interviewType}</span>
                        <span>{ev.completedAt}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredEvaluations.length === 0 && (
                <div className="p-6 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                  No evaluations match "{searchQuery}".
                </div>
              )}
            </div>

            {/* Right Column: Detailed Recruiter Evaluation Scorecard (7 Cols) */}
            <div className="lg:col-span-7">
              {activeEvaluation ? (
                <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-6 shadow-sm">
                  
                  {/* Scorecard Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-750 pb-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                          Post-Interview Debrief
                        </span>
                        <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Official Scorecard
                        </span>
                      </div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                        {activeEvaluation.jobTitle}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold">{activeEvaluation.companyName}</span>
                        <span>·</span>
                        <span>{activeEvaluation.interviewType}</span>
                        <span>·</span>
                        <span className="text-slate-400">{activeEvaluation.interviewDate}</span>
                      </div>
                    </div>

                    <div className="text-right sm:self-center shrink-0">
                      <div className="flex items-center gap-1.5 sm:justify-end text-amber-500 font-black text-2xl">
                        <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
                        <span className="text-slate-900 dark:text-white">{activeEvaluation.overallScore.toFixed(1)}</span>
                        <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold mt-1 ${
                        activeEvaluation.recommendation === 'Strong Hire'
                          ? 'bg-emerald-500 text-slate-950 shadow-xs'
                          : 'bg-blue-600 text-white'
                      }`}>
                        {activeEvaluation.recommendation}
                      </span>
                    </div>
                  </div>

                  {/* Recruiter Identity Banner */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center shadow-xs">
                        {activeEvaluation.recruiterAvatar || activeEvaluation.recruiterName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {activeEvaluation.recruiterName}
                          </span>
                          <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Verified Hiring Partner</span>
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                          {activeEvaluation.recruiterRole} · {activeEvaluation.companyName}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] text-slate-400 hidden sm:block">
                      {activeEvaluation.feedbackSharedDate}
                    </span>
                  </div>

                  {/* Competency Ratings Criteria Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Competency Criteria Scorecard
                      </span>
                      <span className="text-[11px] text-slate-400">1 to 5 Stars Scale</span>
                    </div>

                    <div className="space-y-2.5">
                      {activeEvaluation.criteriaRatings.map((cr, idx) => {
                        const percent = (cr.score / 5) * 100;
                        return (
                          <div 
                            key={idx}
                            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60 space-y-1.5 text-xs"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800 dark:text-slate-200">
                                {cr.criterion}
                              </span>
                              <div className="flex items-center gap-1 text-xs font-black text-slate-900 dark:text-white">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                                <span>{cr.score.toFixed(1)}</span>
                                <span className="text-slate-400 text-[10px]">/ 5</span>
                              </div>
                            </div>

                            {/* Progress meter */}
                            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                  cr.score >= 4.5 ? 'bg-emerald-500' : 'bg-blue-500'
                                }`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>

                            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed pt-0.5">
                              {cr.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recruiter Executive Summary Commentary */}
                  <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-300">
                      <Quote className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Recruiter Qualitative Summary & Observations</span>
                    </div>
                    <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed italic">
                      "{activeEvaluation.summaryNotes}"
                    </p>
                  </div>

                  {/* Standout Strengths & Growth Areas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    
                    {/* Strengths */}
                    <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                      <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Key Strengths Observed</span>
                      </span>
                      <ul className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                        {activeEvaluation.keyStrengths.map((str, i) => (
                          <li key={i} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Growth Areas */}
                    <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2">
                      <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        <span>Constructive Areas for Growth</span>
                      </span>
                      <ul className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                        {activeEvaluation.growthAreas.map((gr, i) => (
                          <li key={i} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                            <span>{gr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Next Steps Notification Box */}
                  <div className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-md">
                    <div>
                      <span className="text-[10px] text-lime-400 font-bold uppercase tracking-wider block">
                        Hiring Process Next Step
                      </span>
                      <p className="font-semibold text-slate-200 text-xs mt-0.5">
                        {activeEvaluation.nextSteps}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopyEvaluation(activeEvaluation)}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Copy evaluation summary"
                      >
                        {copiedId === activeEvaluation.id ? (
                          <>
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Report</span>
                          </>
                        )}
                      </button>

                      {onOpenMessaging && (
                        <button
                          type="button"
                          onClick={() => onOpenMessaging(activeEvaluation.companyName)}
                          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Reply to Recruiter</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-slate-500 text-xs">
                  Select an evaluated interview from the left panel to inspect the recruiter's scorecard.
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 2: COMMUNITY TRANSPARENCY REVIEWS (Candidate Feedback)   */}
      {/* ============================================================== */}
      {viewMode === 'community-reviews' && (
        <div className="space-y-6 animate-in fade-in duration-150">

          {/* Overview Stats Bar */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 dark:from-slate-800/80 dark:via-emerald-950/20 dark:to-slate-850 border border-emerald-200 dark:border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Candidate Community Transparency
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                  Verified Reviews
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                Peer Interview Reviews & Culture Transparency
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Anonymous candidate insights into interview rigor, timeline promptness, and hiring culture across NextSoftHR employers.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsCommunityFormOpen(!isCommunityFormOpen)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isCommunityFormOpen ? 'Close Form' : 'Leave Peer Review'}</span>
              </button>
            </div>
          </div>

          {/* Leave Feedback Form */}
          {isCommunityFormOpen && (
            <form onSubmit={handleCommunitySubmit} className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Submit Interview Review & Transparency Feedback
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Help other candidates understand what to expect. You can post completely anonymously.
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Post Anonymously</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Employer & Role Evaluated
                  </label>
                  <select
                    value={targetJobId}
                    onChange={(e) => setTargetJobId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-750 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                  >
                    {jobs.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.companyName} · {j.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Interview Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-750 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Fair & Balanced">Fair & Balanced</option>
                    <option value="Challenging">Challenging</option>
                    <option value="Very Tough">Very Tough</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Feedback Timeline After Interview
                  </label>
                  <select
                    value={feedbackTimeline}
                    onChange={(e) => setFeedbackTimeline(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-750 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Prompt (< 48 hrs)">Prompt (&lt; 48 hrs)</option>
                    <option value="Reasonable (3-5 days)">Reasonable (3-5 days)</option>
                    <option value="Slow (> 1 week)">Slow (&gt; 1 week)</option>
                    <option value="Still Awaiting">Still Awaiting</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Overall Rating (1 to 5 Stars)
                  </label>
                  <div className="flex items-center gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setOverallRating(s)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            s <= overallRating
                              ? 'fill-amber-400 text-amber-500'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 font-bold text-slate-700 dark:text-slate-300">{overallRating} / 5</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    What went well during the interview?
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={whatWentWell}
                    onChange={(e) => setWhatWentWell(e.target.value)}
                    placeholder="e.g. Panel was respectful, clear explanation of technical challenge..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-750 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Constructive feedback for the hiring team:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={constructiveFeedback}
                    onChange={(e) => setConstructiveFeedback(e.target.value)}
                    placeholder="e.g. Would appreciate clearer timeline on when next round decisions are announced..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-750 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 text-xs">
                  Advice for Future Candidates (Optional):
                </label>
                <input
                  type="text"
                  value={adviceForCandidates}
                  onChange={(e) => setAdviceForCandidates(e.target.value)}
                  placeholder="e.g. Focus on practical system design case studies and live coding..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-750 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setIsCommunityFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Verified Feedback</span>
                </button>
              </div>
            </form>
          )}

          {/* Review Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Recent Peer Evaluations ({filteredCommunityReviews.length})
              </h4>
              <span className="text-[11px] text-slate-400">
                All reviews moderated for professional standards
              </span>
            </div>

            <div className="space-y-3">
              {filteredCommunityReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                        {rev.isAnonymous ? '?' : rev.candidateName?.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {rev.isAnonymous ? 'Anonymous Candidate' : rev.candidateName}
                          </span>
                          {rev.isAnonymous && (
                            <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-0.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                              <span>Protected Identity</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                          Interviewed for <strong>{rev.jobTitle}</strong> at <strong>{rev.companyName}</strong> · {rev.submittedAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3.5 h-3.5 ${
                              idx < rev.overallRating ? 'fill-current' : 'text-slate-300 dark:text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {rev.overallRating}.0
                      </span>
                    </div>
                  </div>

                  {/* Review details grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-750">
                      <span className="text-slate-400 block">Difficulty:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{rev.difficulty}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-750">
                      <span className="text-slate-400 block">Decision Speed:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{rev.feedbackTimeline}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-750">
                      <span className="text-slate-400 block">Professionalism:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{rev.professionalismRating} / 5</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-750">
                      <span className="text-slate-400 block">Recommend Process:</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{rev.wouldRecommend ? 'Yes, Recommended' : 'Neutral'}</span>
                    </div>
                  </div>

                  {/* Feedback prose */}
                  <div className="space-y-2 pt-1">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block">
                        What went well:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {rev.whatWentWell}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block">
                        Constructive Feedback:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {rev.constructiveFeedback}
                      </p>
                    </div>

                    {rev.adviceForCandidates && (
                      <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40">
                        <span className="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider block">
                          Candidate Tip:
                        </span>
                        <p className="text-blue-900 dark:text-blue-200 italic">
                          "{rev.adviceForCandidates}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
