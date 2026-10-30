import React, { useState } from 'react';
import { 
  Sparkles, 
  UserCheck, 
  FileText, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Check 
} from 'lucide-react';
import { Job } from '../types';

interface AiRecruitmentAssistantProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onOpenSearchWithKeyword: (kw: string) => void;
  onOpenFullAiModal?: (tab?: 'candidate' | 'employer-search' | 'job-drafter' | 'chat') => void;
}

export const AiRecruitmentAssistant: React.FC<AiRecruitmentAssistantProps> = ({
  jobs,
  onSelectJob,
  onOpenFullAiModal
}) => {
  const [activeTab, setActiveTab] = useState<'candidate' | 'employer'>('candidate');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Candidate mode state
  const [resumeText, setResumeText] = useState('Senior HR professional with 6 years experience in employee relations, CIPM certification, talent acquisition, and Nigerian Labour Act compliance.');
  const [matchResult, setMatchResult] = useState<{
    score: number;
    matchedKeywords: string[];
    suggestedRoles: string[];
    recommendedJobId: string;
  } | null>({
    score: 94,
    matchedKeywords: ['Employee Relations', 'CIPM Certified', 'Nigerian Labour Act', 'Talent Acquisition', 'HRBP'],
    suggestedRoles: ['Senior HR Business Partner (HRBP)', 'Payroll & HR Operations Specialist', 'Executive Recruitment Consultant'],
    recommendedJobId: 'job-1'
  });

  // Employer generator state
  const [targetTitle, setTargetTitle] = useState('Head of Digital Marketing');
  const [targetIndustry, setTargetIndustry] = useState('Financial Technology');
  const [generatedDraft, setGeneratedDraft] = useState<{
    summary: string;
    responsibilities: string[];
    requirements: string[];
    interviewQuestions: string[];
  } | null>({
    summary: 'Lead customer acquisition, multi-channel performance marketing, and brand growth strategies for NextSoftHR financial technology ecosystem across West Africa.',
    responsibilities: [
      'Scale paid acquisition channels (Google Ads, Meta, LinkedIn) with strict CAC/LTV targets.',
      'Lead digital campaign attribution and conversion rate optimization (CRO) funnels.',
      'Manage cross-functional creative squads including copywriters, SEO specialists, and designers.'
    ],
    requirements: [
      '6+ years of growth marketing experience in high-growth fintech or B2B SaaS.',
      'Demonstrated expertise managing advertising budgets exceeding ₦20,000,000 monthly.',
      'Mastery of Google Analytics 4, Mixpanel, AppsFlyer, and SQL attribution models.'
    ],
    interviewQuestions: [
      'How have you navigated rising digital advertising costs in African markets while preserving lead quality?',
      'Describe a campaign where CAC spiked unexpectedly: what diagnostic steps did you take?'
    ]
  });

  const [copiedDraft, setCopiedDraft] = useState(false);

  const handleAnalyzeResume = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai/match-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skills: resumeText,
          careerTitle: resumeText.includes('HR') ? 'Senior HR Business Partner' : resumeText.includes('Software') ? 'Lead Software Engineer' : 'Operations Specialist',
          experienceYears: '5+ years',
          jobsList: jobs
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        const d = data.data;
        setMatchResult({
          score: d.compatibilityScore || 92,
          matchedKeywords: d.recommendedSkillsToAcquire || ['Core Competencies', 'Industry Alignment'],
          suggestedRoles: d.matchDetails?.map((m: any) => m.whyItMatches.split('for ')[1]?.split(' at')[0] || 'Target Role') || ['HRBP', 'Lead Software Engineer'],
          recommendedJobId: d.topMatchedJobIds?.[0] || 'job-1'
        });
        return;
      }
    } catch (e) {
      console.warn('Backend match failed, using client fallback:', e);
    } finally {
      setIsAnalyzing(false);
    }

    // Fallback if needed
    const textLower = resumeText.toLowerCase();
    let score = 75;
    let recId = 'job-1';
    let kw = ['Professional Experience', 'Communication'];
    let roles = ['Operations Specialist', 'Project Consultant'];

    if (textLower.includes('software') || textLower.includes('engineer') || textLower.includes('code') || textLower.includes('react') || textLower.includes('node')) {
      score = 96;
      recId = 'job-2';
      kw = ['Full-Stack', 'Distributed Systems', 'PostgreSQL', 'Microservices'];
      roles = ['Lead Software Engineer (Fintech & Core Banking)', 'Senior Product Designer'];
    } else if (textLower.includes('hr') || textLower.includes('people') || textLower.includes('talent') || textLower.includes('cipm')) {
      score = 94;
      recId = 'job-1';
      kw = ['Employee Relations', 'CIPM Certified', 'Labour Law', 'Talent Acquisition'];
      roles = ['Senior HR Business Partner (HRBP)', 'Executive Recruitment Consultant'];
    } else if (textLower.includes('finance') || textLower.includes('payroll') || textLower.includes('accounting') || textLower.includes('tax')) {
      score = 91;
      recId = 'job-4';
      kw = ['Statutory Compliance', 'PAYE & Tax', 'Payroll Reconciliation', 'ICAN'];
      roles = ['Payroll & HR Operations Specialist', 'Finance & Treasury Manager'];
    }

    setMatchResult({
      score,
      matchedKeywords: kw,
      suggestedRoles: roles,
      recommendedJobId: recId
    });
  };

  const handleGenerateJobDraft = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/draft-job-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleTitle: targetTitle,
          department: targetIndustry.includes('Tech') ? 'Engineering' : 'Business Operations',
          industry: targetIndustry,
          experienceLevel: 'Senior Level',
          salaryRange: '₦1,800,000 - ₦2,500,000',
          workArrangement: 'Hybrid'
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        const d = data.data;
        setGeneratedDraft({
          summary: d.description || `Accomplished ${targetTitle} to drive strategic initiatives.`,
          responsibilities: d.responsibilities || ['Lead high-impact projects', 'Coordinate cross-functional teams'],
          requirements: d.requirements || ['5+ years experience', 'Bachelor degree in related field'],
          interviewQuestions: d.screeningQuestions || [`What is your experience in ${targetTitle}?`]
        });
        return;
      }
    } catch (e) {
      console.warn('Backend draft failed, using client fallback:', e);
    } finally {
      setIsGenerating(false);
    }

    setGeneratedDraft({
      summary: `We are seeking an accomplished ${targetTitle} to drive strategic initiatives in our ${targetIndustry} division. This role reports to executive management and leads critical workforce and business objectives.`,
      responsibilities: [
        `Spearhead operational strategies and cross-departmental alignment for ${targetTitle}.`,
        'Establish measurable OKRs, KPI tracking, and quarterly performance governance.',
        'Collaborate closely with internal stakeholders and senior executives to drive execution efficiency.'
      ],
      requirements: [
        '5+ years of demonstrable track record in a similar senior capacity.',
        `Strong domain expertise within ${targetIndustry} and familiarity with African market dynamics.`,
        'Relevant professional certification and Bachelor’s degree in related field.'
      ],
      interviewQuestions: [
        `What is the most significant operational hurdle you solved in ${targetIndustry}?`,
        'How do you measure success and candidate quality within your team?'
      ]
    });
  };

  const handleCopyDraft = () => {
    if (!generatedDraft) return;
    const text = `${targetTitle} (${targetIndustry})\n\nSummary:\n${generatedDraft.summary}\n\nKey Responsibilities:\n${generatedDraft.responsibilities.map(r => `• ${r}`).join('\n')}\n\nKey Requirements:\n${generatedDraft.requirements.map(r => `• ${r}`).join('\n')}\n\nSuggested Interview Questions:\n${generatedDraft.interviewQuestions.map(q => `• ${q}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const recommendedJob = jobs.find(j => j.id === matchResult?.recommendedJobId) || jobs[0];

  return (
    <section className="py-20 bg-gradient-to-b from-[#F5F7FB] to-white dark:from-[#0B1120] dark:to-[#090D16] border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-lime-950/40 border border-blue-200 dark:border-lime-400/30 text-[#2563EB] dark:text-lime-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB] dark:text-lime-400" />
            <span>AI-Assisted Recruitment & Career Tools</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] dark:text-white tracking-tight">
            Smarter Career Discovery. More Focused Hiring.
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Enhance human decision-making with intelligent resume matching, automated job description drafting, and objective skill analysis.
          </p>

          {/* Toggle between Candidate Copilot and Employer Drafter */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex p-1 bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs transition-colors duration-300">
              <button
                onClick={() => setActiveTab('candidate')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'candidate'
                    ? 'bg-[#142B4A] dark:bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>For Candidates: Resume & Fit Matcher</span>
              </button>
              <button
                onClick={() => setActiveTab('employer')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'employer'
                    ? 'bg-[#142B4A] dark:bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>For Employers: Job Spec Drafter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Workspace Area */}
        {activeTab === 'candidate' ? (
          <div className="max-w-4xl mx-auto bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Input Form */}
              <div className="md:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Paste Your Skills or CV Summary
                  </label>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Privacy Protected</span>
                </div>

                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={4}
                  className="w-full p-3 text-xs text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 resize-none font-sans"
                  placeholder="e.g. 5 years in software engineering with React, Node.js, and cloud deployments..."
                />

                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Quick Presets:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setResumeText('Experienced Software Engineer with Node.js, TypeScript, PostgreSQL, microservices architecture, and AWS DevOps.');
                      setTimeout(handleAnalyzeResume, 50);
                    }}
                    className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    Tech Lead
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setResumeText('CIPM certified HR Business Partner with 7 years in organizational design, labour law compliance, and talent acquisition.');
                      setTimeout(handleAnalyzeResume, 50);
                    }}
                    className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    HRBP
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setResumeText('Senior Payroll Specialist with ICAN, statutory tax compliance (PAYE, LIRS, FIRS), and multi-currency payroll accounting.');
                      setTimeout(handleAnalyzeResume, 50);
                    }}
                    className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    Payroll
                  </button>
                </div>

                <button
                  onClick={handleAnalyzeResume}
                  disabled={isAnalyzing}
                  className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                  <span>{isAnalyzing ? 'Analyzing with Gemini 3.8...' : 'Analyze Career Fit & Match Vacancies'}</span>
                </button>
              </div>

              {/* Right Column: Dynamic Analysis Output */}
              <div className="md:col-span-6 bg-slate-50 dark:bg-[#090D16] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-colors duration-300">
                {matchResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block">Estimated Market Match</span>
                        <span className="text-2xl font-black text-[#142B4A] dark:text-lime-400 tabular-nums">{matchResult.score}% Compatibility</span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-lime-100 dark:bg-lime-950/60 text-lime-800 dark:text-lime-400 font-bold text-xs flex items-center justify-center border border-lime-300 dark:border-lime-500/40">
                        High Fit
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Detected Key Competencies</span>
                      <div className="flex flex-wrap gap-1.5">
                        {matchResult.matchedKeywords.map((kw, i) => (
                          <span key={i} className="text-[11px] font-medium bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Top Matching Live Role:</span>
                      <div 
                        onClick={() => onSelectJob(recommendedJob)}
                        className="bg-white dark:bg-[#131D31] p-3 rounded-lg border border-blue-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-lime-400/50 cursor-pointer transition-all shadow-2xs group"
                      >
                        <div className="text-xs font-bold text-[#142B4A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-lime-400 line-clamp-1">
                          {recommendedJob.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {recommendedJob.companyName} · {recommendedJob.location}
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">{recommendedJob.salaryRange}</span>
                          <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
                            <span>View Job</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-400 text-xs">
                    Paste your skills to view AI career matching analysis.
                  </div>
                )}
              </div>

            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Employer Form */}
              <div className="md:col-span-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block mb-1.5">
                    Target Job Title
                  </label>
                  <input
                    type="text"
                    value={targetTitle}
                    onChange={(e) => setTargetTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                    placeholder="e.g. Chief Technology Officer"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block mb-1.5">
                    Industry Sector
                  </label>
                  <select
                    value={targetIndustry}
                    onChange={(e) => setTargetIndustry(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 font-medium cursor-pointer"
                  >
                    <option value="Financial Technology" className="dark:bg-slate-800">Financial Technology</option>
                    <option value="Banking & Finance" className="dark:bg-slate-800">Banking & Finance</option>
                    <option value="HR Technology & SaaS" className="dark:bg-slate-800">HR Technology & SaaS</option>
                    <option value="Manufacturing & Logistics" className="dark:bg-slate-800">Manufacturing & Logistics</option>
                    <option value="Healthcare & Life Sciences" className="dark:bg-slate-800">Healthcare & Life Sciences</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateJobDraft}
                  disabled={isGenerating}
                  className="w-full py-2.5 bg-[#142B4A] hover:bg-[#1E3A5F] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-blue-300 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Drafting with Gemini 3.8...' : 'Draft Structured Job Specification'}</span>
                </button>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  Note: AI assists drafting; human recruiters evaluate and calibrate culture, compensation, and ethics.
                </p>
              </div>

              {/* Right Column: Generated Specification */}
              <div className="md:col-span-7 bg-slate-50 dark:bg-slate-950/80 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
                {generatedDraft ? (
                  <div className="space-y-3.5 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">{targetTitle}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{targetIndustry} · Structured Spec</span>
                      </div>
                      <button
                        onClick={handleCopyDraft}
                        className="px-2.5 py-1 text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-slate-700 dark:text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedDraft ? <Check className="w-3 h-3 text-lime-600 dark:text-lime-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
                        <span>{copiedDraft ? 'Copied' : 'Copy Spec'}</span>
                      </button>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 italic">
                      "{generatedDraft.summary}"
                    </p>

                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Key Responsibilities:</span>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside">
                        {generatedDraft.responsibilities.map((r, idx) => (
                          <li key={idx}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Suggested Interview Question:</span>
                      <p className="text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 text-[11px]">
                        "{generatedDraft.interviewQuestions[0]}"
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-400 text-xs">
                    Click draft to create a structured job specification.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Full AI Assistant Launcher Banner */}
        <div className="mt-10 max-w-4xl mx-auto p-5 rounded-2xl bg-[#142B4A] dark:bg-slate-900 border border-slate-700/80 dark:border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Need In-Depth Criteria Matching or Candidate Sourcing?</p>
              <p className="text-slate-300 dark:text-slate-400 text-xs">Launch the full NextSoftHR AI Talent Suite for boolean search generators, interview rubrics, and instant career compatibility reports.</p>
            </div>
          </div>
          <button
            onClick={() => onOpenFullAiModal && onOpenFullAiModal('candidate')}
            className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-xl text-xs whitespace-nowrap shadow-md flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
          >
            <span>Launch AI Talent Suite</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
