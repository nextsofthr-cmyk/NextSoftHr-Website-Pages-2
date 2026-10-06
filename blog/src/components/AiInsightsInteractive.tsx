import React, { useState } from 'react';
import { Bot, Sparkles, CheckCircle2, ArrowRight, FileText, DollarSign, Users, Clock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AiInsightsInteractiveProps {
  onExploreAi: () => void;
}

export const AiInsightsInteractive: React.FC<AiInsightsInteractiveProps> = ({ onExploreAi }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'hr' | 'payroll' | 'recruitment' | 'workforce'>('workforce');


  const tabData = {
    hr: {
      name: 'AI HR Assistant',
      badge: 'Policy & Employee Operations',
      icon: Users,
      headline: 'Instant, Context-Aware Policy & Document Intelligence',
      description:
        'Resolves routine employee inquiries instantly against company-approved handbooks, drafts custom employment agreements, and flags ambiguous contract clauses.',
      capabilities: [
        'Employee questions resolution 24/7',
        'HR policy search & contextual answers',
        'HR document generation (memos, warnings, letters)',
        'Workforce policy sentiment analysis',
      ],
      samplePrompt: 'What is our standard bereavement leave entitlement for regional branch managers?',
      sampleResponse: {
        title: 'Verified Policy Extract (NextSoftHr Handbook Sec. 4.2)',
        insight:
          'Regional branch managers are entitled to 5 consecutive business days of paid compassionate leave. Notice must be registered via the ESS mobile portal with supporting documents attached within 14 days.',
        action: 'Recommended Next Step: Generate pre-filled compassionate leave grant memo for manager approval.',
        status: 'Audit Confidence: 99.8%',
      },
    },
    payroll: {
      name: 'AI Payroll Assistant',
      badge: 'Audit & Calculation Guardrails',
      icon: DollarSign,
      headline: 'Always-On Anomaly Detection Before Disbursement',
      description:
        'Pre-audits salary ledgers, flags variance discrepancies in statutory deductions, identifies duplicate bank entries, and validates tax tables across states.',
      capabilities: [
        'Automated payroll anomaly detection',
        'Multi-tiered statutory tax validation',
        'Overtime and shift differential cross-check',
        'Instant payroll reconciliation reporting',
      ],
      samplePrompt: 'Audit September draft payroll for anomalies across logistics personnel.',
      sampleResponse: {
        title: 'Payroll Audit Anomaly Detected (2 Discrepancies Found)',
        insight:
          'Employee #NSH-4102 recorded a 42% overtime spike exceeding statutory monthly caps without supervisor overtime authorization. Employee #NSH-3918 has an unlinked pension PFA code.',
        action: 'Action Required: Supervisor sign-off required prior to locking bank disbursement file.',
        status: 'Guardrail: Transfer Locked for Review',
      },
    },
    recruitment: {
      name: 'AI Recruitment Assistant',
      badge: 'Sourcing & Structured Scorecards',
      icon: FileText,
      headline: 'Objective Candidate Screening & Interview Preparation',
      description:
        'Generates role-tailored competency rubrics, benchmarks job specifications against industry compensation standards, and drafts behavioral interview scorecards.',
      capabilities: [
        'Objective skill & portfolio screening',
        'Automated job description generation',
        'Structured behavioral interview scorecards',
        'Recruitment pipeline velocity analytics',
      ],
      samplePrompt: 'Generate a senior logistics coordinator job description with AfCFTA compliance experience.',
      sampleResponse: {
        title: 'Structured Requisition Profile Ready',
        insight:
          'Includes required proficiencies in bonded warehouse customs clearance, GPS fleet telemetry, and West African cross-border transit regulations with salary market bands ($18k–$26k).',
        action: 'Action: Scorecard and 6 behavioral interview questions drafted for the hiring panel.',
        status: 'Fairness Audit: Gender-Neutral Syntax Verified',
      },
    },
    workforce: {
      name: 'AI Workforce Assistant',
      badge: 'Attendance & Capacity Planning',
      icon: Clock,
      headline: 'Predictive Attendance Trends & Capacity Insights',
      description:
        'Detects hidden absenteeism clusters, models shift coverage for peak operational seasons, and highlights potential workforce burnout before attrition occurs.',
      capabilities: [
        'Attendance patterns & anomaly detection',
        'Unscheduled leave trend analysis',
        'Departmental staffing capacity forecasts',
        'Overtime distribution fairness insights',
      ],
      samplePrompt: 'Analyze September attendance trends across manufacturing plant 2.',
      sampleResponse: {
        title: 'AI Workforce Insight',
        insight:
          'Attendance trends indicate increased absenteeism within one department this month. Review the underlying workforce data and applicable HR policies before taking action.',
        action: 'Recommended Action: Correlate overtime shift length with Monday absence patterns to optimize shift rotation.',
        status: 'Decision-Support Alert Generated',
      },
    },
  };

  const current = tabData[activeTab];

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#07192F] border-b border-slate-200 dark:border-[#1E3656] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A3F7E]/10 dark:bg-[#8EE000]/15 border border-[#0A3F7E]/20 dark:border-[#8EE000]/30 text-xs font-bold text-[#0A3F7E] dark:text-[#8EE000]">
            <Sparkles className="w-3.5 h-3.5 text-[#8EE000]" />
            <span>{t('ai.kicker', 'Next-Gen People Analytics & Operations')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-heading">
            {t('ai.title', 'AI-Powered HR Is Here')}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('ai.subtitle', 'Empower executives and people leaders with intelligent assistants that synthesize attendance signals, catch payroll variances before disbursement, and draft legally robust policies.')}
          </p>
        </div>


        {/* Interactive Assistant Selection Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 max-w-4xl mx-auto mb-8">
          {(['workforce', 'payroll', 'hr', 'recruitment'] as const).map((key) => {
            const item = tabData[key];
            const isSelected = activeTab === key;
            const Icon = item.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'bg-[#0A3F7E] dark:bg-[#2563EB] text-white border-[#0A3F7E] dark:border-[#2563EB] shadow-md ring-2 ring-[#0A3F7E]/20 dark:ring-[#2563EB]/40'
                    : 'bg-white dark:bg-[#0B1E36] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#1E3656] hover:bg-slate-100/80 dark:hover:bg-[#0E2442]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#8EE000] text-slate-950 font-bold' : 'bg-slate-100 dark:bg-[#122A4A] text-[#0A3F7E] dark:text-[#8EE000]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold truncate">{item.name}</div>
                  <div
                    className={`text-[10px] truncate ${
                      isSelected ? 'text-slate-300 dark:text-slate-200' : 'text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sophisticated NextSoftHr AI Dashboard Simulation Box */}
        <div className="bg-white dark:bg-[#0B1E36] rounded-2xl border border-slate-200 dark:border-[#1E3656] shadow-xl overflow-hidden max-w-5xl mx-auto transition-colors duration-300">
          {/* Dashboard Window Header */}
          <div className="bg-[#051A33] px-6 py-4 flex items-center justify-between border-b border-slate-800 text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#8EE000] text-slate-950 flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold flex items-center gap-2">
                  <span>{current.name}</span>
                  <span className="text-[10px] font-mono text-[#8EE000] bg-[#8EE000]/15 px-2 py-0.5 rounded-full border border-[#8EE000]/30">
                    Decision-Support Mode
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">NextSoftHr Proprietary HR & Payroll Engine</div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#8EE000] animate-pulse" />
              <span>Real-Time Model Active</span>
            </div>
          </div>

          {/* Interactive Workbench */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Capabilities Overview (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-bold text-[#0A3F7E] dark:text-[#8EE000] uppercase tracking-wider font-mono">
                  {current.badge}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 font-heading">
                  {current.headline}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Capabilities List */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#1E3656]">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">Core Assistant Modules:</div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {current.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8EE000] shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clear Ethical Boundaries Stamp */}
              <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Human-in-the-Loop Architecture:</strong> NextSoftHr AI serves strictly as an assistance and decision-support capability. Final approvals, terminations, and legal actions always remain under human HR leadership.
                </p>
              </div>
            </div>

            {/* Right Interactive Simulation Panel (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-50 dark:bg-[#07192F] rounded-xl p-5 sm:p-6 border border-slate-200 dark:border-[#1E3656] flex flex-col justify-between space-y-4">
              {/* Simulated User Inquiry */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider font-mono flex items-center justify-between">
                  <span>Sample Operator Query</span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">Natural Language Query</span>
                </div>
                <div className="bg-white dark:bg-[#0B1E36] p-3.5 rounded-lg border border-slate-200 dark:border-[#1E3656] text-xs font-medium text-slate-800 dark:text-slate-200 shadow-xs flex items-center gap-2">
                  <span className="text-[#0A3F7E] dark:text-[#8EE000] font-bold font-mono">&gt;</span>
                  <span>&quot;{current.samplePrompt}&quot;</span>
                </div>
              </div>

              {/* Simulated AI Assistant Output */}
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider font-mono flex items-center justify-between">
                  <span>Assistant Decision-Support Output</span>
                  <span className="text-emerald-700 dark:text-[#8EE000] font-bold text-[10px] bg-emerald-50 dark:bg-[#8EE000]/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-[#8EE000]/30">
                    {current.sampleResponse.status}
                  </span>
                </div>

                <div className="bg-white dark:bg-[#0B1E36] p-4 rounded-xl border border-slate-200 dark:border-[#1E3656] shadow-sm space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                    <span className="w-2 h-2 rounded-full bg-[#8EE000]" />
                    <span>{current.sampleResponse.title}</span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans bg-slate-50 dark:bg-[#0E2442] p-3 rounded-lg border border-slate-100 dark:border-[#1E3656]">
                    &ldquo;{current.sampleResponse.insight}&rdquo;
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-[#1E3656] flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {current.sampleResponse.action}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Assistant CTA */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">Integrated into NextSoftHr Enterprise Suite</span>
                <button
                  onClick={onExploreAi}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] transition-all border border-[#7BC500]"
                >
                  <span>{t('ai.exploreAi', 'Explore NextSoftHr AI')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
