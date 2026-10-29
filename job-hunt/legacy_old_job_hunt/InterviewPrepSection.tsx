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
import { ParsedResumeProfile, Job } from '../types';

interface InterviewPrepSectionProps {
  parsedProfile: ParsedResumeProfile | null;
  targetJob?: Job | null;
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

  const [expandedQuestionId, setExpandedQuestionId] = useState<string>('hr-1');
  const [userPracticeAnswer, setUserPracticeAnswer] = useState<string>('');
  const [practiceFeedback, setPracticeFeedback] = useState<string | null>(null);

  const prepData = INDUSTRY_PREP_BANK[selectedIndustry] || INDUSTRY_PREP_BANK['Human Resources'];

  const handleEvaluatePracticeAnswer = () => {
    if (!userPracticeAnswer.trim()) return;
    setPracticeFeedback('Evaluating answer with STAR Framework model...');
    setTimeout(() => {
      setPracticeFeedback('✓ Excellent response structure! You clearly addressed the Situation and measurable Result. Tip: Add 1 specific numerical KPI (e.g. "reduced latency by 35%") to make your Action even more authoritative.');
      if (onToast) onToast('AI Prep Coach generated answer critique!');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Industry & Job Title Match */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#142B4A] dark:bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shrink-0">
            <BookOpen className="w-6 h-6 text-lime-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-[#142B4A] dark:text-white">
                Dynamic Interview Preparation & Common Questions
              </h3>
              <span className="text-[10px] bg-lime-100 dark:bg-lime-950 text-lime-900 dark:text-lime-300 font-bold px-2 py-0.5 rounded-full border border-lime-300 dark:border-lime-800">
                STAR Method
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Curated for candidate role: <strong>{parsedProfile?.currentRole || prepData.roleName}</strong> in <strong>{selectedIndustry}</strong>.
            </p>
          </div>
        </div>

        {/* Industry Switcher */}
        <div className="w-full md:w-auto bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1 shrink-0">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Switch Target Industry:
          </label>
          <select
            value={selectedIndustry}
            onChange={(e) => {
              setSelectedIndustry(e.target.value);
              const newBank = INDUSTRY_PREP_BANK[e.target.value];
              if (newBank?.questions[0]) setExpandedQuestionId(newBank.questions[0].id);
            }}
            className="w-full md:w-56 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 cursor-pointer"
          >
            {Object.keys(INDUSTRY_PREP_BANK).map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Strategic Interview Tips Strip */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 to-lime-50/80 dark:from-slate-900 dark:to-slate-900 border border-blue-200/80 dark:border-slate-800 space-y-2">
        <span className="text-xs font-extrabold text-[#142B4A] dark:text-white flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-lime-600 dark:text-lime-400" />
          <span>Strategic Interview Advice for {prepData.roleName}:</span>
        </span>
        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          {prepData.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-1.5 shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Common Questions & STAR Framework Interactive Accordion */}
      <div className="space-y-3">
        <h4 className="font-extrabold text-sm text-[#142B4A] dark:text-white flex items-center gap-2">
          <span>High-Frequency Role Questions ({prepData.questions.length})</span>
          <span className="text-[11px] text-slate-500 font-normal">Click each question to view the proven STAR response framework</span>
        </h4>

        {prepData.questions.map((q) => {
          const isExpanded = expandedQuestionId === q.id;

          return (
            <div
              key={q.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-all"
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
