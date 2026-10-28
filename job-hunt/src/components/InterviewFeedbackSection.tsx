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
  AlertCircle
} from 'lucide-react';
import { Job, ScheduledInterview, InterviewFeedback } from '../types';

interface InterviewFeedbackSectionProps {
  jobs: Job[];
  interviews: ScheduledInterview[];
  feedbackList?: InterviewFeedback[];
  onSubmitFeedback?: (feedback: InterviewFeedback) => void;
  candidateDefaultName?: string;
  onToast?: (message: string) => void;
}

const INITIAL_MOCK_FEEDBACK: InterviewFeedback[] = [
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
  onSubmitFeedback,
  candidateDefaultName = 'Adaeze Okonkwo',
  onToast
}) => {
  const [reviews, setReviews] = useState<InterviewFeedback[]>(
    feedbackList.length > 0 ? feedbackList : INITIAL_MOCK_FEEDBACK
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterCompany, setFilterCompany] = useState<string>('all');

  // Form state
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

  const handleSubmit = (e: React.FormEvent) => {
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

    setReviews(prev => [newFeedback, ...prev]);
    if (onSubmitFeedback) onSubmitFeedback(newFeedback);
    if (onToast) onToast('✨ Interview feedback submitted anonymously to improve hiring transparency!');

    // Reset
    setWhatWentWell('');
    setConstructiveFeedback('');
    setAdviceForCandidates('');
    setIsFormOpen(false);
  };

  const filteredReviews = reviews.filter(r => {
    if (filterCompany === 'all') return true;
    return r.companyName.toLowerCase().includes(filterCompany.toLowerCase());
  });

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.overallRating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-6">
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
            Interview Experience & Recruiter Feedback
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
            Anonymous candidate insights into interview rigor, timeline promptness, and hiring culture across NextSoftHR employers.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="flex items-center gap-1 text-amber-500 font-extrabold text-lg">
              <Star className="w-5 h-5 fill-current" />
              <span className="tabular-nums text-slate-900 dark:text-white">{averageRating}</span>
              <span className="text-xs text-slate-400">/ 5.0</span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              {reviews.length} Candidate Evaluations
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isFormOpen ? 'Close Form' : 'Leave Feedback'}</span>
          </button>
        </div>
      </div>

      {/* Leave Feedback Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm animate-in fade-in duration-150">
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
              onClick={() => setIsFormOpen(false)}
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
            Recent Community Evaluations ({filteredReviews.length})
          </h4>
          <span className="text-[11px] text-slate-400">
            All reviews moderated for professional standards
          </span>
        </div>

        <div className="space-y-3">
          {filteredReviews.map((rev) => (
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
                          <ShieldCheck className="w-3 h-3 text-slate-400" />
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
  );
};
