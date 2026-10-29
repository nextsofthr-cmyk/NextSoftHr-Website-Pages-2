import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  UserCheck, 
  Building2, 
  FileText, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Check, 
  Search, 
  SlidersHorizontal, 
  HelpCircle, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  ExternalLink,
  Bot
} from 'lucide-react';
import { Job } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onPublishJobDirectly: (newJob: Job) => void;
  initialTab?: 'candidate' | 'employer-search' | 'job-drafter' | 'chat';
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  jobs,
  onSelectJob,
  onPublishJobDirectly,
  initialTab = 'candidate'
}) => {
  const [activeTab, setActiveTab] = useState<'candidate' | 'employer-search' | 'job-drafter' | 'chat'>(initialTab);
  
  // Tab 1: Candidate Job Matcher
  const [candidateRole, setCandidateRole] = useState('Senior HR Business Partner');
  const [candidateSkills, setCandidateSkills] = useState('Employee Relations, CIPM certification, Nigerian Labour Act, Talent Acquisition, Performance Management');
  const [candidateExp, setCandidateExp] = useState('6+ years');
  const [candidateLocation, setCandidateLocation] = useState('Lagos, Nigeria (Hybrid / Remote)');
  const [candidateSalary, setCandidateSalary] = useState('₦1,500,000 / month');
  const [candidateArrangement, setCandidateArrangement] = useState('Hybrid');
  const [isMatchingJobs, setIsMatchingJobs] = useState(false);
  const [jobMatchResult, setJobMatchResult] = useState<any>(null);

  // Tab 2: Recruiter Candidate Finder
  const [recruiterRole, setRecruiterRole] = useState('Lead Software Engineer (Fintech)');
  const [recruiterDept, setRecruiterDept] = useState('Core Infrastructure & Payments');
  const [recruiterSkills, setRecruiterSkills] = useState('Node.js, TypeScript, PostgreSQL, Distributed Systems, High Concurrency');
  const [recruiterExp, setRecruiterExp] = useState('Lead / Director');
  const [recruiterLocation, setRecruiterLocation] = useState('Lagos / Hybrid or Remote');
  const [recruiterBudget, setRecruiterBudget] = useState('₦2,500,000 - ₦3,500,000 / month');
  const [isFindingCandidates, setIsFindingCandidates] = useState(false);
  const [candidateSearchResult, setCandidateSearchResult] = useState<any>(null);

  // Tab 3: Job Post Drafter
  const [draftTitle, setDraftTitle] = useState('Head of Digital Marketing');
  const [draftDept, setDraftDept] = useState('Commercial Growth');
  const [draftIndustry, setDraftIndustry] = useState('Financial Technology');
  const [draftExp, setDraftExp] = useState('Senior Level');
  const [draftSalary, setDraftSalary] = useState('₦1,800,000 - ₦2,500,000');
  const [draftArrangement, setDraftArrangement] = useState('Hybrid');
  const [draftFocus, setDraftFocus] = useState('Customer Acquisition Cost (CAC) reduction, multi-channel performance marketing in Africa, and team mentorship');
  const [isDraftingJob, setIsDraftingJob] = useState(false);
  const [generatedJobPost, setGeneratedJobPost] = useState<any>(null);

  // Tab 4: Interactive Chat
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: 'Hello! I am NextSoftHR\'s AI Talent Copilot. Ask me anything about matching your skills to open jobs, finding top candidate profiles, salary benchmarks in Africa, or structuring recruitment workflows.'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const [copiedBoolean, setCopiedBoolean] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isPublishingDirect, setIsPublishingDirect] = useState(false);

  if (!isOpen) return null;

  // Handler 1: Candidate Match Jobs
  const handleMatchJobs = async () => {
    setIsMatchingJobs(true);
    try {
      const response = await fetch('/api/ai/match-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          careerTitle: candidateRole,
          skills: candidateSkills,
          experienceYears: candidateExp,
          targetLocation: candidateLocation,
          targetSalary: candidateSalary,
          workPreference: candidateArrangement,
          jobsList: jobs
        })
      });
      const data = await response.json();
      if (data.success && data.data) {
        setJobMatchResult(data.data);
      }
    } catch (err) {
      console.error('Error calling /api/ai/match-jobs:', err);
    } finally {
      setIsMatchingJobs(false);
    }
  };

  // Handler 2: Recruiter Find Candidates
  const handleFindCandidates = async () => {
    setIsFindingCandidates(true);
    try {
      const response = await fetch('/api/ai/find-candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleTitle: recruiterRole,
          department: recruiterDept,
          requiredSkills: recruiterSkills,
          experienceLevel: recruiterExp,
          locationPreference: recruiterLocation,
          budget: recruiterBudget
        })
      });
      const data = await response.json();
      if (data.success && data.data) {
        setCandidateSearchResult(data.data);
      }
    } catch (err) {
      console.error('Error calling /api/ai/find-candidates:', err);
    } finally {
      setIsFindingCandidates(false);
    }
  };

  // Handler 3: Draft Job Post
  const handleDraftJob = async () => {
    setIsDraftingJob(true);
    try {
      const response = await fetch('/api/ai/draft-job-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleTitle: draftTitle,
          department: draftDept,
          industry: draftIndustry,
          experienceLevel: draftExp,
          salaryRange: draftSalary,
          workArrangement: draftArrangement,
          keyPoints: draftFocus
        })
      });
      const data = await response.json();
      if (data.success && data.data) {
        setGeneratedJobPost(data.data);
      }
    } catch (err) {
      console.error('Error calling /api/ai/draft-job-post:', err);
    } finally {
      setIsDraftingJob(false);
    }
  };

  // Handler 4: Interactive Chat
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userText = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/ai/chat-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          conversationHistory: chatMessages.slice(-4),
          userRole: activeTab === 'candidate' ? 'job_seeker' : 'employer'
        })
      });
      const data = await response.json();
      if (data.success && data.reply) {
        setChatMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { sender: 'ai', text: 'I am here to help! What specific role, skill set, or hiring strategy can I evaluate for you?' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Publish AI Generated Job
  const handlePublishGeneratedJob = () => {
    if (!generatedJobPost) return;
    setIsPublishingDirect(true);

    const newJob: Job = {
      id: `job-ai-${Date.now()}`,
      title: generatedJobPost.title || draftTitle,
      companyId: 'comp-1',
      companyName: 'NextSoftHR Partner Group',
      companyLogo: '',
      companyInitials: 'NS',
      isVerified: true,
      location: 'Lagos, Nigeria / Hybrid',
      workArrangement: draftArrangement as any,
      employmentType: 'Full-Time',
      salaryRange: draftSalary,
      currency: draftSalary.includes('$') ? 'USD' : 'NGN',
      experienceLevel: draftExp as any,
      category: 'Information Technology',
      industry: draftIndustry,
      datePosted: 'Just now',
      department: draftDept,
      description: generatedJobPost.description,
      responsibilities: generatedJobPost.responsibilities || [],
      requirements: generatedJobPost.requirements || [],
      benefits: generatedJobPost.benefits || [],
      applicantCount: 0,
      isFeatured: true,
      recruiterSource: 'NextSoftHR RPO'
    };

    onPublishJobDirectly(newJob);
    setTimeout(() => {
      setIsPublishingDirect(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto transition-colors duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="bg-[#142B4A] dark:bg-[#070e1b] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#0F9D8A] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">NextSoftHR AI Talent Assistant</h2>
                <span className="text-[10px] bg-blue-500/30 text-blue-300 font-mono px-2 py-0.5 rounded-full border border-blue-400/40">
                  Powered by Gemini 3.8
                </span>
              </div>
              <p className="text-xs text-slate-300 dark:text-slate-400">
                Criteria-based matching for candidates and precision talent sourcing for recruiters
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer" aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs shrink-0 transition-colors">
          <button
            onClick={() => setActiveTab('candidate')}
            className={`px-3.5 py-2 font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'candidate' 
                ? 'bg-white dark:bg-slate-800 text-[#142B4A] dark:text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
            <span>Find Jobs (For Candidates)</span>
          </button>

          <button
            onClick={() => setActiveTab('employer-search')}
            className={`px-3.5 py-2 font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'employer-search' 
                ? 'bg-white dark:bg-slate-800 text-[#142B4A] dark:text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Search className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            <span>Find Candidates (For Recruiters)</span>
          </button>

          <button
            onClick={() => setActiveTab('job-drafter')}
            className={`px-3.5 py-2 font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'job-drafter' 
                ? 'bg-white dark:bg-slate-800 text-[#142B4A] dark:text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>AI Job Post Drafter</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3.5 py-2 font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'chat' 
                ? 'bg-white dark:bg-slate-800 text-[#142B4A] dark:text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span>Interactive AI Copilot</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs">
          
          {/* TAB 1: CANDIDATE JOB MATCHER */}
          {activeTab === 'candidate' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Form */}
                <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-950/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 transition-colors">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">Your Career Profile</span>
                    <span className="text-[11px] text-[#2563EB] dark:text-blue-400 font-semibold">Criteria Matcher</span>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Job Title / Career Goal</label>
                    <input
                      type="text"
                      value={candidateRole}
                      onChange={(e) => setCandidateRole(e.target.value)}
                      placeholder="e.g. Lead Software Engineer or Senior HRBP"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Key Skills & Competencies</label>
                    <textarea
                      rows={3}
                      value={candidateSkills}
                      onChange={(e) => setCandidateSkills(e.target.value)}
                      placeholder="e.g. TypeScript, React, PostgreSQL, Docker, Microservices..."
                      className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg text-xs resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                    <div className="mt-1 flex flex-wrap gap-1 text-[10px]">
                      <span className="text-slate-400 dark:text-slate-500">Presets:</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCandidateRole('Lead Software Engineer');
                          setCandidateSkills('Node.js, TypeScript, PostgreSQL, Distributed Systems, Microservices, AWS');
                        }}
                        className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        Software Lead
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCandidateRole('Senior HR Business Partner');
                          setCandidateSkills('CIPM, Employee Relations, Nigerian Labour Act, HRMS, Compensation Benchmarking');
                        }}
                        className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        HRBP
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCandidateRole('Finance & Treasury Manager');
                          setCandidateSkills('ICAN, Cashflow Forecasting, CBN Regulations, Multi-currency FX, Financial Modeling');
                        }}
                        className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        Finance/Treasury
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Experience</label>
                      <select
                        value={candidateExp}
                        onChange={(e) => setCandidateExp(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg text-xs cursor-pointer"
                      >
                        <option value="1-2 years">1-2 years (Entry)</option>
                        <option value="3-5 years">3-5 years (Mid)</option>
                        <option value="6+ years">6+ years (Senior)</option>
                        <option value="10+ years">10+ years (Director)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Work Mode</label>
                      <select
                        value={candidateArrangement}
                        onChange={(e) => setCandidateArrangement(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg text-xs cursor-pointer"
                      >
                        <option value="Hybrid">Hybrid</option>
                        <option value="Remote">100% Remote</option>
                        <option value="On-Site">On-Site</option>
                        <option value="Any">Any Arrangement</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Location</label>
                      <input
                        type="text"
                        value={candidateLocation}
                        onChange={(e) => setCandidateLocation(e.target.value)}
                        placeholder="e.g. Lagos, Abuja, Remote"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Remuneration</label>
                      <input
                        type="text"
                        value={candidateSalary}
                        onChange={(e) => setCandidateSalary(e.target.value)}
                        placeholder="e.g. ₦1,500,000"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleMatchJobs}
                    disabled={isMatchingJobs}
                    className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isMatchingJobs ? 'Analyzing Opportunities with AI...' : 'Match Jobs Based on My Skills'}</span>
                  </button>
                </div>

                {/* Right Results Display */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors">
                  {jobMatchResult ? (
                    <div className="space-y-4">
                      {/* Top Metric Bar */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 via-teal-50 to-white dark:from-blue-950/60 dark:via-teal-950/40 dark:to-slate-850 border border-blue-200/80 dark:border-blue-900/60 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block uppercase tracking-wider">Overall Profile Match</span>
                          <span className="text-3xl font-black text-[#142B4A] dark:text-white tabular-nums">
                            {jobMatchResult.compatibilityScore}% Compatibility
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 font-bold rounded-full text-xs border border-lime-300 dark:border-lime-800">
                            High Market Demand
                          </span>
                        </div>
                      </div>

                      {/* Career Narrative */}
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">Career Positioning Analysis:</h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                          {jobMatchResult.careerFitAnalysis}
                        </p>
                      </div>

                      {/* Matched Roles from Database */}
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Top Recommended Vacancies for You:</h4>
                        <div className="space-y-2.5">
                          {jobMatchResult.matchDetails?.map((detail: any, idx: number) => {
                            const matchedJob = jobs.find(j => j.id === detail.jobId) || jobs[idx] || jobs[0];
                            return (
                              <div
                                key={idx}
                                className="p-3.5 rounded-xl border border-blue-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 bg-blue-50/20 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-slate-800/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                      {matchedJob.title}
                                    </span>
                                    <span className="text-[10px] bg-lime-50 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 font-bold px-1.5 py-0.5 rounded border border-lime-200 dark:border-lime-800">
                                      {detail.matchPercentage}% Match
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                    {matchedJob.companyName} · {matchedJob.location} · {matchedJob.salaryRange}
                                  </div>
                                  <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                                    Why: {detail.whyItMatches}
                                  </p>
                                  {detail.recommendedPitch && (
                                    <p className="text-[10px] text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-900 p-1.5 rounded border border-blue-100 dark:border-blue-900/50">
                                      <strong>Application Pitch:</strong> "{detail.recommendedPitch}"
                                    </p>
                                  )}
                                </div>

                                <button
                                  onClick={() => {
                                    onClose();
                                    onSelectJob(matchedJob);
                                  }}
                                  className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-lg text-xs whitespace-nowrap self-start sm:self-auto shrink-0 flex items-center gap-1 shadow-2xs"
                                >
                                  <span>View & Apply</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Skills to Acquire & Salary Benchmarks */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                          <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">Recommended Growth Skills:</span>
                          <ul className="space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside">
                            {jobMatchResult.recommendedSkillsToAcquire?.map((s: string, i: number) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                          <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">Salary Insight:</span>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                            {jobMatchResult.marketSalaryInsight}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="my-auto py-12 text-center text-slate-400 dark:text-slate-500 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-500 dark:text-blue-400 flex items-center justify-center mx-auto">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">AI Career Matcher Ready</p>
                      <p className="max-w-xs mx-auto text-xs text-slate-500 dark:text-slate-400">
                        Fill in your skills and target role, then click "Match Jobs Based on My Skills" to generate deep compatibility analysis against our live openings.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: RECRUITER CANDIDATE FINDER */}
          {activeTab === 'employer-search' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Form */}
                <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-950/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 transition-colors">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">Hiring Brief Criteria</span>
                    <span className="text-[11px] text-lime-600 dark:text-lime-400 font-semibold">Sourcer Copilot</span>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Role Title *</label>
                    <input
                      type="text"
                      value={recruiterRole}
                      onChange={(e) => setRecruiterRole(e.target.value)}
                      placeholder="e.g. Lead Software Engineer or VP of HR"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Department & Division</label>
                    <input
                      type="text"
                      value={recruiterDept}
                      onChange={(e) => setRecruiterDept(e.target.value)}
                      placeholder="e.g. Core Engineering"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Required Competencies</label>
                    <textarea
                      rows={3}
                      value={recruiterSkills}
                      onChange={(e) => setRecruiterSkills(e.target.value)}
                      placeholder="e.g. Node.js, Go, Distributed Systems, High Concurrency..."
                      className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg text-xs resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Seniority</label>
                      <select
                        value={recruiterExp}
                        onChange={(e) => setRecruiterExp(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg text-xs"
                      >
                        <option value="Senior Level">Senior Level</option>
                        <option value="Lead / Director">Lead / Director</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Executive / C-Suite">Executive / C-Suite</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Remuneration Budget</label>
                      <input
                        type="text"
                        value={recruiterBudget}
                        onChange={(e) => setRecruiterBudget(e.target.value)}
                        placeholder="e.g. ₦2,500,000 / mo"
                        className="w-full px-2.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleFindCandidates}
                    disabled={isFindingCandidates}
                    className="w-full py-3 bg-[#0F9D8A] hover:bg-[#0C7F6F] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Search className="w-4 h-4" />
                    <span>{isFindingCandidates ? 'Searching Talent Networks...' : 'Find Candidates & Sourcing Plan'}</span>
                  </button>
                </div>

                {/* Right Results Display */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors">
                  {candidateSearchResult ? (
                    <div className="space-y-4">
                      {/* Sourcing Strategy */}
                      <div className="p-3.5 bg-lime-50 dark:bg-lime-950/50 border border-lime-200 dark:border-lime-800 rounded-xl">
                        <span className="font-bold text-lime-900 dark:text-lime-200 block mb-1">Executive Sourcing Strategy:</span>
                        <p className="text-lime-800 dark:text-lime-300 text-xs leading-relaxed">
                          {candidateSearchResult.sourcingStrategy}
                        </p>
                      </div>

                      {/* Ready-to-copy Boolean Search Strings */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-slate-900 dark:text-white">Boolean Search Query Strings:</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(candidateSearchResult.booleanSearchStrings?.join('\n') || '');
                              setCopiedBoolean(true);
                              setTimeout(() => setCopiedBoolean(false), 2000);
                            }}
                            className="text-[11px] text-lime-700 dark:text-lime-400 font-semibold flex items-center gap-1 hover:underline"
                          >
                            {copiedBoolean ? <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedBoolean ? 'Copied' : 'Copy Query'}</span>
                          </button>
                        </div>
                        <div className="space-y-1.5 font-mono text-[11px]">
                          {candidateSearchResult.booleanSearchStrings?.map((str: string, i: number) => (
                            <div key={i} className="p-2 bg-slate-900 dark:bg-slate-950 text-lime-400 rounded-lg break-all border border-transparent dark:border-slate-800">
                              {str}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Candidate Archetypes */}
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block mb-2">Target Candidate Archetypes:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {candidateSearchResult.candidateArchetypes?.map((arch: any, i: number) => (
                            <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900 dark:text-white">{arch.archetypeTitle}</span>
                                <span className="text-[10px] font-bold text-lime-800 dark:text-lime-300 bg-lime-100 dark:bg-lime-950/80 px-1.5 py-0.5 rounded border border-lime-300 dark:border-lime-800">
                                  {arch.estimatedMatchScore}% Fit
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-300">{arch.recommendedBackground}</p>
                              <div className="flex flex-wrap gap-1 pt-1">
                                {arch.keyStrengths?.map((k: string, idx: number) => (
                                  <span key={idx} className="text-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                                    {k}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Behavioral Interview Questions */}
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block mb-2">Competency-Based Interview Scorecard:</span>
                        <div className="space-y-2">
                          {candidateSearchResult.competencyInterviewQuestions?.map((q: any, i: number) => (
                            <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-[11px] space-y-1">
                              <p className="font-semibold text-slate-900 dark:text-white">Q: "{q.question}"</p>
                              <p className="text-lime-700 dark:text-lime-400">✓ <strong>Look for:</strong> {q.whatToLookFor}</p>
                              <p className="text-red-600 dark:text-red-400">✗ <strong>Red flag:</strong> {q.redFlags}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Candidate Outreach Template */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900 dark:text-white">Passive Candidate Outreach Message:</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(candidateSearchResult.outreachEmailTemplate || '');
                              setCopiedEmail(true);
                              setTimeout(() => setCopiedEmail(false), 2000);
                            }}
                            className="text-[11px] text-lime-700 dark:text-lime-400 font-semibold flex items-center gap-1 hover:underline"
                          >
                            {copiedEmail ? <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
                          </button>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-[11px] text-slate-700 dark:text-slate-300 whitespace-pre-line font-sans">
                          {candidateSearchResult.outreachEmailTemplate}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="my-auto py-12 text-center text-slate-400 dark:text-slate-500 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-lime-50 dark:bg-lime-950/60 text-lime-600 dark:text-lime-400 flex items-center justify-center mx-auto">
                        <Search className="w-6 h-6" />
                      </div>
                      <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Recruiter Sourcing AI Ready</p>
                      <p className="max-w-xs mx-auto text-xs text-slate-500 dark:text-slate-400">
                        Specify the open position and core competencies to generate boolean search queries, candidate profiles, and interview evaluation rubrics.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: AI JOB POST DRAFTER */}
          {activeTab === 'job-drafter' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Form */}
                <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-950/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 transition-colors">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">Role Parameters</span>
                    <span className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">AI Generator</span>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Job Title *</label>
                    <input
                      type="text"
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
                      placeholder="e.g. Lead Software Engineer or Senior HRBP"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Department</label>
                      <input
                        type="text"
                        value={draftDept}
                        onChange={(e) => setDraftDept(e.target.value)}
                        placeholder="e.g. Engineering"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Industry</label>
                      <select
                        value={draftIndustry}
                        onChange={(e) => setDraftIndustry(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg text-xs"
                      >
                        <option value="Financial Technology">Fintech</option>
                        <option value="Banking & Financial Services">Banking</option>
                        <option value="HR Technology & SaaS">HR Tech</option>
                        <option value="Manufacturing & Logistics">Logistics & Supply</option>
                        <option value="Healthcare">Healthcare</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Seniority</label>
                      <select
                        value={draftExp}
                        onChange={(e) => setDraftExp(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg text-xs"
                      >
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior Level">Senior Level</option>
                        <option value="Lead / Director">Lead / Director</option>
                        <option value="Executive">Executive</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Arrangement</label>
                      <select
                        value={draftArrangement}
                        onChange={(e) => setDraftArrangement(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg text-xs"
                      >
                        <option value="Hybrid">Hybrid</option>
                        <option value="Remote">Remote</option>
                        <option value="On-Site">On-Site</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Proposed Remuneration Range</label>
                    <input
                      type="text"
                      value={draftSalary}
                      onChange={(e) => setDraftSalary(e.target.value)}
                      placeholder="e.g. ₦1,800,000 - ₦2,500,000"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Key Focus & Objectives</label>
                    <textarea
                      rows={3}
                      value={draftFocus}
                      onChange={(e) => setDraftFocus(e.target.value)}
                      placeholder="e.g. Scale payment pipelines, lead agile sprints..."
                      className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg text-xs resize-none"
                    />
                  </div>

                  <button
                    onClick={handleDraftJob}
                    disabled={isDraftingJob}
                    className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{isDraftingJob ? 'Generating Job Post with AI...' : 'Draft Market-Ready Job Post'}</span>
                  </button>
                </div>

                {/* Right Results Display */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors">
                  {generatedJobPost ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                        <div>
                          <h3 className="font-extrabold text-[#142B4A] dark:text-white text-base">{generatedJobPost.title}</h3>
                          <p className="text-slate-500 dark:text-slate-400 text-xs">{draftDept} · {draftArrangement} · {draftSalary}</p>
                        </div>
                        <button
                          onClick={handlePublishGeneratedJob}
                          disabled={isPublishingDirect}
                          className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl shadow-xs text-xs flex items-center gap-1.5 transition-all"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isPublishingDirect ? 'Publishing...' : 'Publish to Marketplace'}</span>
                        </button>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">Executive Overview:</span>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs whitespace-pre-line">
                          {generatedJobPost.description}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">Key Responsibilities:</span>
                        <ul className="space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside">
                          {generatedJobPost.responsibilities?.map((r: string, idx: number) => (
                            <li key={idx}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">Candidate Requirements:</span>
                        <ul className="space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside">
                          {generatedJobPost.requirements?.map((req: string, idx: number) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">Compensation & Benefits:</span>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                          {generatedJobPost.benefits?.map((b: string, idx: number) => (
                            <div key={idx} className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="my-auto py-12 text-center text-slate-400 dark:text-slate-500 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
                        <FileText className="w-6 h-6" />
                      </div>
                      <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Job Description Drafter Ready</p>
                      <p className="max-w-xs mx-auto text-xs text-slate-500 dark:text-slate-400">
                        Input your role parameters to draft a structured specification. Once generated, you can publish it directly to the active marketplace in one click!
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: INTERACTIVE AI TALENT COPILOT CHAT */}
          {activeTab === 'chat' && (
            <div className="max-w-3xl mx-auto h-[480px] flex flex-col justify-between bg-slate-50 dark:bg-slate-950/70 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 transition-colors">
              {/* Message List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#2563EB] text-white rounded-br-xs'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-fit text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                    <span>NextSoftHR AI is thinking...</span>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChatMessage} className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask anything: e.g. 'What is the salary for Senior HRBP in Lagos?' or 'How do I hire a Golang engineer?'..."
                  className="flex-1 px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 dark:disabled:text-slate-600 font-bold rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
