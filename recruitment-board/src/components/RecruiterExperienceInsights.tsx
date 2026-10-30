import React, { useState } from 'react';
import { 
  MessageSquare, 
  Star, 
  ThumbsUp, 
  CheckCircle2, 
  Filter, 
  Download, 
  Building2, 
  User, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { InterviewFeedback } from '../types';

interface RecruiterExperienceInsightsProps {
  feedbackList?: InterviewFeedback[];
  onToggleReview?: (feedbackId: string) => void;
  onToast?: (message: string) => void;
}

export const RecruiterExperienceInsights: React.FC<RecruiterExperienceInsightsProps> = ({
  feedbackList = [],
  onToggleReview,
  onToast
}) => {
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterReviewed, setFilterReviewed] = useState<'all' | 'unreviewed' | 'reviewed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample feedback fallback if empty
  const feedbackData: InterviewFeedback[] = feedbackList.length > 0 ? feedbackList : [
    {
      id: 'rf-1',
      interviewId: 'int-101',
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
      submittedAt: '2 days ago',
      reviewedByRecruiter: true
    },
    {
      id: 'rf-2',
      interviewId: 'int-102',
      jobId: 'job-2',
      jobTitle: 'Lead Backend & Payment Systems Engineer',
      companyName: 'Paystack Financial',
      interviewType: 'Technical Screen',
      isAnonymous: true,
      candidateName: 'Anonymous Candidate',
      candidateRole: 'Senior Systems Architect',
      overallRating: 4.5,
      professionalismRating: 5,
      clarityRating: 4,
      relevanceRating: 5,
      punctualityRating: 5,
      difficulty: 'Challenging',
      wouldRecommend: true,
      feedbackTimeline: 'Reasonable (3-5 days)',
      whatWentWell: 'Architectural live coding session felt very close to production challenges (concurrency and idempotency under network partitions). Interviewers were encouraging.',
      constructiveFeedback: 'Clearer guidelines on whether external docs or Go standard library references are permitted ahead of time.',
      adviceForCandidates: 'Brush up on distributed lock patterns and Redis idempotency tokens.',
      submittedAt: '4 days ago',
      reviewedByRecruiter: false
    },
    {
      id: 'rf-3',
      interviewId: 'int-103',
      jobId: 'job-3',
      jobTitle: 'Enterprise Account Executive (Fintech & Payroll)',
      companyName: 'Flutterwave Enterprise',
      interviewType: 'Panel Presentation',
      isAnonymous: false,
      candidateName: 'Kofi Mensah',
      candidateRole: 'Fintech Account Executive',
      overallRating: 4,
      professionalismRating: 4.5,
      clarityRating: 4,
      relevanceRating: 4,
      punctualityRating: 4,
      difficulty: 'Fair & Balanced',
      wouldRecommend: true,
      feedbackTimeline: 'Prompt (< 48 hrs)',
      whatWentWell: 'Executive mock pitch was highly interactive. The hiring director challenged assumptions constructively and shared realistic quota expectations.',
      constructiveFeedback: 'The calendar invite was rescheduled once with short notice, though apologized for professionally.',
      adviceForCandidates: 'Understand regional cross-border payment regulations across ECOWAS before the final round.',
      submittedAt: '1 week ago',
      reviewedByRecruiter: true
    }
  ];

  // Calculate metrics
  const totalReviews = feedbackData.length;
  const avgOverall = totalReviews > 0 
    ? (feedbackData.reduce((acc, f) => acc + f.overallRating, 0) / totalReviews).toFixed(1)
    : '4.8';
  const avgProf = totalReviews > 0
    ? (feedbackData.reduce((acc, f) => acc + f.professionalismRating, 0) / totalReviews).toFixed(1)
    : '4.9';
  const avgClarity = totalReviews > 0
    ? (feedbackData.reduce((acc, f) => acc + f.clarityRating, 0) / totalReviews).toFixed(1)
    : '4.6';
  const avgRelevance = totalReviews > 0
    ? (feedbackData.reduce((acc, f) => acc + f.relevanceRating, 0) / totalReviews).toFixed(1)
    : '4.7';
  const recommendPercent = totalReviews > 0
    ? Math.round((feedbackData.filter(f => f.wouldRecommend).length / totalReviews) * 100)
    : 95;

  const filtered = feedbackData.filter(item => {
    if (filterDifficulty !== 'all' && item.difficulty !== filterDifficulty) return false;
    if (filterReviewed === 'unreviewed' && item.reviewedByRecruiter) return false;
    if (filterReviewed === 'reviewed' && !item.reviewedByRecruiter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = item.jobTitle.toLowerCase().includes(q) ||
        (item.candidateRole && item.candidateRole.toLowerCase().includes(q)) ||
        item.whatWentWell.toLowerCase().includes(q) ||
        item.constructiveFeedback.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleExportCsv = () => {
    const rows = [
      ['Date', 'Job Title', 'Candidate', 'Overall Rating', 'Professionalism', 'Clarity', 'Relevance', 'Difficulty', 'Recommend', 'Went Well', 'Constructive', 'Reviewed'],
      ...feedbackData.map(f => [
        `"${f.submittedAt}"`,
        `"${f.jobTitle}"`,
        `"${f.isAnonymous ? 'Anonymous' : f.candidateName}"`,
        f.overallRating,
        f.professionalismRating,
        f.clarityRating,
        f.relevanceRating,
        `"${f.difficulty}"`,
        f.wouldRecommend ? 'Yes' : 'No',
        `"${f.whatWentWell.replace(/"/g, '""')}"`,
        `"${f.constructiveFeedback.replace(/"/g, '""')}"`,
        f.reviewedByRecruiter ? 'Reviewed' : 'Pending'
      ])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'recruiter_candidate_experience_survey_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onToast) onToast('Exported candidate experience insights to CSV!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Banner / Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-[#142B4A] text-white">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400 text-slate-950">
              Candidate NPS Score: +{Math.round((recommendPercent - 10))}
            </span>
            <span className="text-xs text-emerald-200">Continuous Talent Feedback</span>
          </div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <span>Candidate Experience & Interview Quality Insights</span>
            <Sparkles className="w-4 h-4 text-emerald-300" />
          </h3>
          <p className="text-xs text-slate-200 max-w-xl">
            Real feedback collected from candidates who completed interviews across your talent pipelines. Use this qualitative intelligence to coach hiring panels, calibrate difficulty, and improve offer acceptance ratios.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCsv}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Feedback Report</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-[11px] font-semibold text-slate-500">Overall Rating</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{avgOverall}</span>
            <span className="text-xs text-amber-500 font-bold flex items-center">
              <Star className="w-3.5 h-3.5 fill-amber-400 inline" /> / 5.0
            </span>
          </div>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">Top 5% across African tech</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-[11px] font-semibold text-slate-500">Professionalism</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{avgProf}</span>
            <span className="text-xs text-slate-400">/ 5.0</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Interviewer courtesy</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-[11px] font-semibold text-slate-500">Expectations Clarity</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{avgClarity}</span>
            <span className="text-xs text-slate-400">/ 5.0</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Role responsibilities</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-[11px] font-semibold text-slate-500">Practical Relevance</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{avgRelevance}</span>
            <span className="text-xs text-slate-400">/ 5.0</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Real-world tasks</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
          <p className="text-[11px] font-semibold text-slate-500">Would Recommend</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{recommendPercent}%</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Positive brand sentiment</p>
        </div>
      </div>

      {/* Qualitative Feedback Sentiment Analysis & Trend Mapping Chart */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                NLP Sentiment Mapping
              </span>
              <span className="text-xs text-slate-400">Qualitative Text Analysis</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              Interview Sentiment & Qualitative Feedback Trends
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated natural language sentiment extracted from candidate & recruiter written feedback comments.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500">Overall Sentiment:</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
              88% Favorable (+3.2% MoM)
            </span>
          </div>
        </div>

        {/* Polarity Distribution Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Positive Sentiment (88%)
            </span>
            <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              Neutral / Constructive (9%)
            </span>
            <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              Friction Areas (3%)
            </span>
          </div>

          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
            <div style={{ width: '88%' }} className="bg-emerald-500 h-full transition-all duration-500" title="88% Positive" />
            <div style={{ width: '9%' }} className="bg-amber-400 h-full transition-all duration-500" title="9% Constructive" />
            <div style={{ width: '3%' }} className="bg-rose-500 h-full transition-all duration-500" title="3% Friction" />
          </div>
        </div>

        {/* Trend Comparison Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Positive Trends */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <ThumbsUp className="w-4 h-4 text-emerald-600" />
                <span>Top Positive Trends in Candidate Comments</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/60 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">
                High Impact
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  <span>Panel Transparency & Respect</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">94% mention rate</span>
                </div>
                <div className="h-1.5 bg-emerald-200/60 dark:bg-emerald-900/60 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '94%' }} />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
                  "Interviewers were open about company growth challenges and culture."
                </p>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  <span>Practical Real-World Assessment</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">89% mention rate</span>
                </div>
                <div className="h-1.5 bg-emerald-200/60 dark:bg-emerald-900/60 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '89%' }} />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
                  "Case studies mimicked actual production and payroll problems."
                </p>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  <span>Prompt Decision Timelines</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">82% mention rate</span>
                </div>
                <div className="h-1.5 bg-emerald-200/60 dark:bg-emerald-900/60 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '82%' }} />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
                  "Feedback received in under 48 hours without ghosting."
                </p>
              </div>
            </div>
          </div>

          {/* Friction / Constructive Improvement Trends */}
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Common Friction & Improvement Themes</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/60 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                Action Items
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  <span>Spec Reading Time Allocation</span>
                  <span className="text-amber-700 dark:text-amber-400 font-bold">28% flagged</span>
                </div>
                <div className="h-1.5 bg-amber-200/60 dark:bg-amber-900/60 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '28%' }} />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
                  "Candidates requested 5 minutes to read through complex architecture briefs."
                </p>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  <span>Pre-Interview Tech Check Links</span>
                  <span className="text-amber-700 dark:text-amber-400 font-bold">19% flagged</span>
                </div>
                <div className="h-1.5 bg-amber-200/60 dark:bg-amber-900/60 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '19%' }} />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
                  "Send meeting link 15 minutes in advance for microphone checks."
                </p>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  <span>Schedule Notice for Working Professionals</span>
                  <span className="text-amber-700 dark:text-amber-400 font-bold">14% flagged</span>
                </div>
                <div className="h-1.5 bg-amber-200/60 dark:bg-amber-900/60 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '14%' }} />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
                  "Provide 48-hour heads-up when panel members need to reschedule."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          >
            <option value="all">All Difficulties</option>
            <option value="Fair & Balanced">Fair & Balanced</option>
            <option value="Challenging & Rigorous">Challenging & Rigorous</option>
            <option value="Introductory / Easy">Introductory / Easy</option>
          </select>

          <select
            value={filterReviewed}
            onChange={(e) => setFilterReviewed(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          >
            <option value="all">All Review Statuses</option>
            <option value="unreviewed">Unreviewed Only</option>
            <option value="reviewed">Reviewed by Hiring Team</option>
          </select>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search comments or job titles..."
          className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 sm:w-64"
        />
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
            No feedback entries matching your current filters.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-3xl bg-white dark:bg-slate-900 border transition-all space-y-4 ${
                item.reviewedByRecruiter 
                  ? 'border-slate-200 dark:border-slate-800' 
                  : 'border-emerald-300 dark:border-emerald-700 shadow-xs ring-1 ring-emerald-400/20'
              }`}
            >
              {/* Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {item.jobTitle}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {item.interviewType}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      Difficulty: {item.difficulty}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 pt-0.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {item.isAnonymous ? '👤 Verified Candidate (Anonymous)' : `👤 ${item.candidateName} (${item.candidateRole})`}
                    </span>
                    <span>·</span>
                    <span>{item.submittedAt}</span>
                    <span>·</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {item.wouldRecommend ? '✓ Would recommend applying' : 'Does not recommend'}
                    </span>
                  </div>
                </div>

                {/* Score badge & Action */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-black text-sm text-slate-900 dark:text-white">{item.overallRating}</span>
                      <span className="text-xs text-slate-400">/ 5.0</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Candidate Score</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onToggleReview) onToggleReview(item.id);
                      if (onToast) onToast(item.reviewedByRecruiter ? 'Marked as unreviewed' : '✓ Marked interview feedback as reviewed by team');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      item.reviewedByRecruiter
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.reviewedByRecruiter ? 'Reviewed' : 'Mark Reviewed'}</span>
                  </button>
                </div>
              </div>

              {/* Specific Quotes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 space-y-1">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 text-[11px]">
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>What Went Well (Candidate Highlight):</span>
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "{item.whatWentWell}"
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 space-y-1">
                  <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Constructive Improvement Suggestion:</span>
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "{item.constructiveFeedback}"
                  </p>
                </div>
              </div>

              {item.adviceForCandidates && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  <span className="font-bold text-slate-700 dark:text-slate-200 shrink-0">💡 Advice for future applicants:</span>
                  <span>"{item.adviceForCandidates}"</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
