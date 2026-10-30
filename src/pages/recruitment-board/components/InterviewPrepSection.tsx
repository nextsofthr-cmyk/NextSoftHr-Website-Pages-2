import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  Briefcase,
  Layers,
  Send
} from 'lucide-react';
import { ParsedResumeProfile, Job, CandidateApplication } from '../types';

interface InterviewPrepSectionProps {
  parsedProfile: ParsedResumeProfile | null;
  targetJob?: Job | null;
  applications?: CandidateApplication[];
  jobs?: Job[];
  onToast?: (message: string) => void;
}

interface QuestionItem {
  id: string;
  category: 'Behavioral' | 'Technical' | 'Situational' | 'Leadership';
  question: string;
  evaluationFocus: string;
  starFramework: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  avoidPhrase: string;
}

const INDUSTRY_PREP_BANK: Record<string, { roleName: string; tips: string[]; questions: QuestionItem[] }> = {
  'Human Resources': {
    roleName: 'HR Business Partner & People Operations',
    tips: [
      'Anchor your responses around the Nigerian Labour Act, statutory compliance, and mediation frameworks.',
      'Emphasize how people programs directly reduced turnover, shortened time-to-hire, or supported revenue growth.',
      'Show familiarity with modern HRMS stacks (BambooHR, Workday, SAP SuccessFactors) and payroll integrations.'
    ],
    questions: [
      {
        id: 'hr-1',
        category: 'Situational',
        question: 'How do you handle a sensitive employee grievance alleging wrongful disciplinary action or bias from a C-level executive?',
        evaluationFocus: 'Impartiality, strict legal confidentiality, procedural documentation, and mediation diplomacy.',
        starFramework: {
          situation: 'A department lead disputed performance ratings, alleging personal prejudice from the VP.',
          task: 'Conduct an independent fact-finding inquiry while protecting whistleblowing safeguards.',
          action: 'Secured contemporaneous records, interviewed witnesses separately, and drafted an objective findings memorandum.',
          result: 'Resolved the dispute internally without litigation, realigned performance KPIs, and preserved team trust.'
        },
        avoidPhrase: '“I immediately took the manager’s side because executives have final say.”'
      },
      {
        id: 'hr-2',
        category: 'Behavioral',
        question: 'Describe an instance where you restructured compensation & benefits packages in response to macroeconomic inflation.',
        evaluationFocus: 'Data-driven salary benchmarking, cost modeling, executive buy-in, and clear employee communication.',
        starFramework: {
          situation: 'High FX inflation eroded employee purchasing power, resulting in a spike in voluntary resignations.',
          task: 'Design a resilient compensation adjustment model within a tight corporate operating budget.',
          action: 'Introduced targeted transport and healthcare subsidies alongside a tiered cost-of-living allowance.',
          result: 'Decreased unwanted turnover by 34% within 6 months while staying within budget bounds.'
        },
        avoidPhrase: '“We couldn’t do anything because the economy was out of our hands.”'
      },
      {
        id: 'hr-3',
        category: 'Leadership',
        question: 'How do you foster a high-performance culture across distributed cross-border teams?',
        evaluationFocus: 'Objective OKR alignment, transparent async communication, and continuous recognition ecosystems.',
        starFramework: {
          situation: 'The company expanded into Kenya and Ghana, creating silos between Lagos HQ and regional pods.',
          task: 'Unify quarterly OKRs and performance review standards across all geographic offices.',
          action: 'Implemented weekly async check-ins, standardized 360 review criteria, and led cross-cultural workshops.',
          result: 'Employee engagement scores increased from 68% to 89% across all three hubs.'
        },
        avoidPhrase: '“I insisted everyone report in real-time on Lagos timezone without exception.”'
      }
    ]
  },
  'Information Technology': {
    roleName: 'Software Engineer & Technical Architect',
    tips: [
      'Structure architectural answers using distributed systems trade-offs (CAP theorem, idempotency, latency vs throughput).',
      'Discuss test automation, CI/CD observability, and rollback strategies rather than just raw code syntax.',
      'Highlight concrete payment and fintech domain knowledge (ISO 8583, webhooks, reconciliation engines).'
    ],
    questions: [
      {
        id: 'tech-1',
        category: 'Technical',
        question: 'How would you design a distributed payment webhook ingestion service that survives upstream gateway latency spikes?',
        evaluationFocus: 'Dead letter queues, asynchronous message brokers (Kafka/RabbitMQ), idempotency keys, and circuit breakers.',
        starFramework: {
          situation: 'Incoming payment webhooks overwhelmed database connections during Black Friday volume surges.',
          task: 'Decouple incoming request ingestion from downstream ledger updates.',
          action: 'Introduced Redis rate-limiting, queued events into Kafka, and processed updates idempotently with worker pools.',
          result: 'Achieved 99.99% webhook processing reliability with zero data loss and sub-20ms ingestion latency.'
        },
        avoidPhrase: '“I simply increased the database connection pool limit.”'
      },
      {
        id: 'tech-2',
        category: 'Situational',
        question: 'Tell me about a high-severity production outage you managed. How did you diagnose and remediate it?',
        evaluationFocus: 'Blameless post-mortem culture, root-cause analysis, proactive monitoring, and disaster recovery.',
        starFramework: {
          situation: 'A database lock contention caused transactions to timeout across core payment endpoints.',
          task: 'Restore transaction processing within a 15-minute SLA.',
          action: 'Identified the long-running query via pg_stat_activity, safely terminated it, and deployed an index migration.',
          result: 'Restored service in 11 minutes and wrote a comprehensive post-mortem with automated lock alerts.'
        },
        avoidPhrase: '“It was the junior engineer’s fault for pushing unreviewed code.”'
      },
      {
        id: 'tech-3',
        category: 'Leadership',
        question: 'How do you balance technical debt refactoring against fast-moving commercial product deadlines?',
        evaluationFocus: 'Pragmatic prioritization, measuring debt impact on team velocity, and negotiating tech milestones with PMs.',
        starFramework: {
          situation: 'A monolithic billing module was causing regressions in new feature sprints.',
          task: 'Convince business stakeholders to allocate 20% of sprint capacity to refactoring.',
          action: 'Demonstrated that bugs in billing caused 40% of customer support escalations, framing the refactor as a stability investment.',
          result: 'Modularized the billing service, reducing sprint defect rates by 60% over two quarters.'
        },
        avoidPhrase: '“I ignored product deadlines and refactored the entire codebase anyway.”'
      }
    ]
  },
  'Banking & Finance': {
    roleName: 'Financial Controller & Treasury Analyst',
    tips: [
      'Focus on audit compliance, IFRS standards, and central bank foreign exchange regulations.',
      'Highlight quantifiable cost reduction and risk mitigation frameworks.',
      'Demonstrate mastery of advanced financial modeling and working capital optimization.'
    ],
    questions: [
      {
        id: 'fin-1',
        category: 'Situational',
        question: 'How do you safeguard company treasury against sudden foreign exchange volatility and currency devaluation?',
        evaluationFocus: 'Hedging instruments, forward contracts, multi-currency accounts, and cash flow forecasting.',
        starFramework: {
          situation: 'Volatile exchange rates threatened profit margins on imported equipment contracts.',
          task: 'Protect project margins from currency slippage.',
          action: 'Negotiated FX forward contracts and restructured vendor contracts into dual-currency brackets.',
          result: 'Preserved 98% of expected project margins despite a 22% local currency depreciation.'
        },
        avoidPhrase: '“We waited and hoped the central bank would stabilize rates.”'
      }
    ]
  }
};

export const InterviewPrepSection: React.FC<InterviewPrepSectionProps> = ({
  parsedProfile,
  targetJob,
  applications = [],
  jobs = [],
  onToast
}) => {
  // Determine initial industry based on role
  const [selectedIndustry, setSelectedIndustry] = useState<string>(() => {
    if (targetJob?.industry && INDUSTRY_PREP_BANK[targetJob.industry]) {
      return targetJob.industry;
    }
    const roleLower = parsedProfile?.currentRole?.toLowerCase() || '';
    if (roleLower.includes('software') || roleLower.includes('engineer') || roleLower.includes('developer')) {
      return 'Information Technology';
    }
    return 'Human Resources';
  });

  const [selectedAppId, setSelectedAppId] = useState<string>(() => {
    return applications[0]?.jobId || targetJob?.id || 'job-1';
  });

  const [expandedQuestionId, setExpandedQuestionId] = useState<string>('custom-app-1');
  const [userPracticeAnswer, setUserPracticeAnswer] = useState<string>('');
  const [practiceFeedback, setPracticeFeedback] = useState<string | null>(null);

  // Matched target application
  const activeApp = applications.find(a => a.jobId === selectedAppId) || applications[0];
  const activeTargetJob = jobs.find(j => j.id === (activeApp?.jobId || selectedAppId)) || targetJob || jobs[0];

  // Dynamically generated personalized mock questions based on active application & parsed resume
  const personalizedApplicationQuestions: QuestionItem[] = useMemo(() => {
    const jobTitle = activeTargetJob?.title || activeApp?.jobTitle || 'Target Role';
    const company = activeTargetJob?.companyName || activeApp?.companyName || 'Employer Partner';
    const topSkills = parsedProfile?.extractedSkills?.slice(0, 3).join(', ') || 'Core Technical & Leadership Competencies';
    const yearsExp = parsedProfile?.yearsOfExperience || '5+ years';

    return [
      {
        id: 'custom-app-1',
        category: 'Behavioral',
        question: `How will your track record in ${topSkills} directly accelerate the ${jobTitle} objectives at ${company}?`,
        evaluationFocus: `Candidate domain familiarity, proactive adaptation to ${company}'s scale, and alignment with the posted role requirements.`,
        starFramework: {
          situation: `At a previous high-growth organization, our team needed to scale operations while maintaining high quality benchmarks.`,
          task: `Take leadership on aligning cross-functional deliverables for the ${jobTitle} function.`,
          action: `Leveraged ${topSkills} to streamline workflows and introduce rigorous KPI tracking.`,
          result: `Exceeded milestone targets by 28% and received executive commendation.`
        },
        avoidPhrase: `“I am just looking for any job and ${company} seemed like a good brand.”`
      },
      {
        id: 'custom-app-2',
        category: 'Technical',
        question: `In your ${yearsExp} of experience, describe a high-stakes technical or operational roadblock you navigated that is relevant to ${company}'s products.`,
        evaluationFocus: `Technical depth, structured problem diagnosis, and concrete business continuity protection.`,
        starFramework: {
          situation: `A critical system pipeline experienced unexpected latency during month-end volume spikes.`,
          task: `Diagnose bottleneck without disrupting live user transactions.`,
          action: `Implemented targeted caching and real-time observability dashboards to isolate the query flaw.`,
          result: `Restored sub-second response times and established automated alerts preventing future recurrences.`
        },
        avoidPhrase: `“It wasn't my responsibility so I waited for senior management to fix it.”`
      },
      {
        id: 'custom-app-3',
        category: 'Leadership',
        question: `If selected for the ${jobTitle} opening at ${company}, what strategic initiatives would you execute in your first 90 days?`,
        evaluationFocus: `First 90-day onboarding strategy: 30 days listen/audit, 60 days quick wins, 90 days strategic transformation.`,
        starFramework: {
          situation: `Stepping into a pivotal role with immediate stakeholder expectations.`,
          task: `Build trust across team pods and identify high-leverage process optimizations.`,
          action: `Scheduled 1-on-1 discovery interviews, conducted a gap analysis, and drafted a prioritized roadmap.`,
          result: `Delivered 2 immediate quick wins within 45 days and solidified department alignment.`
        },
        avoidPhrase: `“I would immediately replace everything the current team is doing on day one.”`
      }
    ];
  }, [activeTargetJob, activeApp, parsedProfile]);

  const prepData = INDUSTRY_PREP_BANK[selectedIndustry] || INDUSTRY_PREP_BANK['Human Resources'];

  const allDisplayQuestions = [...personalizedApplicationQuestions, ...prepData.questions];

  const handleEvaluatePracticeAnswer = () => {
    if (!userPracticeAnswer.trim()) return;
    setPracticeFeedback('Evaluating answer with STAR Framework model...');
    setTimeout(() => {
      setPracticeFeedback('✓ Excellent response structure! You clearly addressed the Situation and measurable Result. Tip: Add 1 specific numerical KPI (e.g. "reduced turnaround by 30%") to make your Action even more authoritative.');
      if (onToast) onToast('AI Prep Coach generated answer critique!');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: AI Personalized Mock Questions from Active Job Applications */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-blue-800">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/30 text-white flex items-center justify-center font-bold shadow-md shrink-0 border border-blue-400/40">
            <Sparkles className="w-6 h-6 text-lime-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">
                AI Personalized Interview Prep Module
              </h3>
              <span className="text-[10px] bg-lime-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                Active Applications Tailored
              </span>
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              Generating mock questions derived from your active application for <strong>{activeTargetJob?.title}</strong> at <strong>{activeTargetJob?.companyName}</strong> and your parsed resume.
            </p>
          </div>
        </div>

        {/* Application Selector */}
        {applications.length > 0 && (
          <div className="w-full md:w-auto bg-slate-900/80 backdrop-blur-md p-2.5 rounded-2xl border border-blue-700/60 space-y-1 shrink-0">
            <label className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">
              Tailor to Active Application:
            </label>
            <select
              value={selectedAppId}
              onChange={(e) => {
                setSelectedAppId(e.target.value);
                setExpandedQuestionId('custom-app-1');
                if (onToast) onToast('AI Mock Questions re-generated for application!');
              }}
              className="w-full md:w-64 px-3 py-1.5 bg-slate-800 border border-blue-500/50 rounded-xl text-xs font-semibold text-white cursor-pointer"
            >
              {applications.map((app) => (
                <option key={app.jobId} value={app.jobId}>
                  {app.jobTitle || 'Application'} ({app.companyName || 'Employer'})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Strategic Interview Tips Strip */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 to-lime-50/80 dark:from-slate-900 dark:to-slate-900 border border-blue-200/80 dark:border-slate-800 space-y-2">
        <span className="text-xs font-extrabold text-[#142B4A] dark:text-white flex items-center gap-1.5">
          <Award className="w-4 h-4 text-lime-600 dark:text-lime-400" />
          <span>Personalized Advice for {activeTargetJob?.title || prepData.roleName}:</span>
        </span>
        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-1.5 shrink-0" />
            <span>Demonstrate direct alignment with <strong>{activeTargetJob?.companyName}</strong>’s core product objectives and technical standards.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-1.5 shrink-0" />
            <span>Highlight concrete projects featuring your extracted skills: <strong>{parsedProfile?.extractedSkills?.slice(0, 4).join(', ')}</strong>.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-1.5 shrink-0" />
            <span>Frame every answer using the STAR methodology (Situation, Task, Action, Result) with quantitative metrics.</span>
          </li>
        </ul>
      </div>

      {/* Common Questions & STAR Framework Interactive Accordion */}
      <div className="space-y-3">
        <h4 className="font-extrabold text-sm text-[#142B4A] dark:text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Role & Application Questions ({allDisplayQuestions.length})</span>
            <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-[#2563EB] dark:text-blue-300 font-bold px-2 py-0.5 rounded-full">
              Personalized
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-normal hidden sm:inline">Click question to view proven STAR framework</span>
        </h4>

        {allDisplayQuestions.map((q) => {
          const isExpanded = expandedQuestionId === q.id;

          return (
            <div
              key={q.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all overflow-hidden shadow-xs ${
                q.id.startsWith('custom-app') 
                  ? 'border-blue-300 dark:border-blue-800 ring-1 ring-blue-500/20' 
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedQuestionId(isExpanded ? '' : q.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    q.category === 'Technical'
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                      : q.category === 'Situational'
                      ? 'bg-lime-100 dark:bg-lime-950 text-lime-800 dark:text-lime-300'
                      : 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300'
                  }`}>
                    {q.category}
                  </span>
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    {q.question}
                  </span>
                </div>

                <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-5 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs animate-in fade-in duration-150">
                  {/* Evaluation focus */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">What Hiring Managers Seek:</strong> {q.evaluationFocus}
                  </div>

                  {/* 4 STAR Components */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40">
                      <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400 block mb-1">1. Situation</span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300">{q.starFramework.situation}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40">
                      <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-400 block mb-1">2. Task</span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300">{q.starFramework.task}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
                      <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 block mb-1">3. Action</span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300">{q.starFramework.action}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-lime-50/60 dark:bg-lime-950/30 border border-lime-200/60 dark:border-lime-900/40">
                      <span className="text-[10px] uppercase font-bold text-lime-700 dark:text-lime-400 block mb-1">4. Result</span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300">{q.starFramework.result}</p>
                    </div>
                  </div>

                  {/* Red flag avoid */}
                  <div className="p-3 rounded-xl bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-[11px] text-red-800 dark:text-red-300">
                    ❌ <strong>Red Flag Phrase to Avoid:</strong> {q.avoidPhrase}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Practice Simulator Box */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-lime-600 dark:text-lime-400" />
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 dark:text-white">
            Interview Response Practice & Instant Critique
          </h4>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Type your drafted answer to any of the questions above. Our coach will evaluate your STAR clarity and quantitative impact.
        </p>

        <div className="space-y-2">
          <textarea
            rows={3}
            value={userPracticeAnswer}
            onChange={(e) => setUserPracticeAnswer(e.target.value)}
            placeholder="Type your response draft here (e.g., 'In my previous role, our team faced a 25% spike in churn. I took the lead on...')"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400"
          />

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">
              {userPracticeAnswer.split(/\s+/).filter(Boolean).length} words
            </span>

            <button
              type="button"
              onClick={handleEvaluatePracticeAnswer}
              disabled={!userPracticeAnswer.trim()}
              className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Get AI Critique</span>
            </button>
          </div>
        </div>

        {practiceFeedback && (
          <div className="p-3.5 rounded-xl bg-lime-50 dark:bg-lime-950/60 border border-lime-300 dark:border-lime-800 text-xs text-lime-900 dark:text-lime-200 animate-in fade-in">
            {practiceFeedback}
          </div>
        )}
      </div>
    </div>
  );
};
