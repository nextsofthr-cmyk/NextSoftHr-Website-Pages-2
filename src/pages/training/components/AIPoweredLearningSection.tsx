import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Compass,
  FileText,
  Calculator,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface AIPoweredLearningSectionProps {
  onExploreCourse: (courseId: string) => void;
  onOpenAIAdvisor?: () => void;
}

export const AIPoweredLearningSection: React.FC<AIPoweredLearningSectionProps> = ({
  onExploreCourse,
  onOpenAIAdvisor,
}) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);

  const scenarios = [
    {
      label: 'Payroll Tax Variance Simulation',
      icon: Calculator,
      scenario: 'How to handle an unexpected 15% discrepancy between monthly gross payroll and the bank direct-debit authorization file before payment cut-off.',
      aiAnalysis:
        'Immediate Action: Halt the bank batch approval. Check the Variance Audit log for newly added employee records with retroactive effective dates, unapproved overtime multiples, or anomalous tax relief adjustments. Reconcile against statutory Form H1 allowances.',
      recommendedCourseId: 'c2',
      recommendedCourseTitle: 'Payroll Administration & End-to-End Processing',
      skillCheck: 'Gross-to-Net Variance Reconciliations & Audit Defense',
    },
    {
      label: 'Disciplinary Fair Hearing Protocol',
      icon: FileText,
      scenario: 'A branch supervisor intends to immediately fire a senior teller accused of attendance falsification without issuing a formal query.',
      aiAnalysis:
        'Compliance Warning: Summary dismissal without written query and fair hearing breaches Nigerian labor jurisprudence (NICN standards). Draft a precise Query Letter citing the exact date/time of alleged breach, grant 48 hours for written response, and convene an objective investigative panel.',
      recommendedCourseId: 'c4',
      recommendedCourseTitle: 'Employee Relations & Labor Dispute Resolution',
      skillCheck: 'Fair Hearing Due Process & Query Drafting',
    },
    {
      label: 'AI Resume Screening & Bias Audit',
      icon: Sparkles,
      scenario: 'Deploying automated algorithmic screening across 500 entry-level job applications while preventing demographic bias.',
      aiAnalysis:
        'Ethical Practice: Strip demographic identifiers (names, graduation years, postal codes) from the evaluation vector. Audit keyword weights to ensure non-traditional educational pathways are not penalized, and maintain human-in-the-loop validation for all shortlisted candidates.',
      recommendedCourseId: 'c8',
      recommendedCourseTitle: 'AI for HR Professionals: Automation & Productivity',
      skillCheck: 'Responsible AI Governance & Prompt Engineering',
    },
  ];

  const currentScenario = scenarios[selectedScenarioIndex];

  return (
    <section id="ai-learning" className="py-16 bg-white dark:bg-[#0F172A] border-b border-slate-200/70 dark:border-slate-800 scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16]" />
            <span>Next-Gen Educational Technology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Meet the Future of HR Learning
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Augment your study with NextSoftHR’s intelligent scenario simulators, tailored knowledge checks, and automated curriculum recommendations.
          </p>
          {onOpenAIAdvisor && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onOpenAIAdvisor}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F4C81] dark:bg-blue-600 hover:bg-[#0B3C68] dark:hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-[#84CC16] group-hover:rotate-12 transition-transform" />
                <span>Launch NextSoftHR AI Training Advisor</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {/* 8 AI Pillar Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-12">
          {[
            { icon: Bot, title: 'AI Learning Assistant', desc: 'Instant answers to statutory and operational questions.' },
            { icon: Compass, title: 'Course Recommendations', desc: 'Diagnostic matching based on your role and career gap.' },
            { icon: TrendingUp, title: 'Personalized Paths', desc: 'Custom learning roadmaps for rapid career promotion.' },
            { icon: FileText, title: 'HR Scenario Simulations', desc: 'Practice tough workplace dilemmas in a safe sandbox.' },
            { icon: Calculator, title: 'Payroll Knowledge Help', desc: 'Formulas and step-by-step tax computation checks.' },
            { icon: HelpCircle, title: 'Practice Questions', desc: 'Interactive quizzes that adapt to your progress.' },
            { icon: ShieldCheck, title: 'Progress Insights', desc: 'Automated skill gap tracking and mastery ratings.' },
            { icon: Sparkles, title: 'Skills Recommendations', desc: 'Next skills to master for your targeted executive tier.' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80">
                <Icon className="w-5 h-5 text-[#0F4C81] dark:text-[#84CC16] mb-2" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Scenario Simulation Demonstration */}
        <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 dark:border-slate-800/80 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-bold text-[#84CC16] uppercase tracking-wider">
                Live Interactive Sandbox
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                Workplace Dilemma & AI-Assisted Solution
              </h3>
            </div>
            
            {/* Scenario Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {scenarios.map((sc, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedScenarioIndex(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedScenarioIndex === i
                      ? 'bg-[#0F4C81] text-white border border-blue-400'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Simulation Output Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
            <div className="lg:col-span-7">
              <div className="bg-slate-800/80 dark:bg-slate-900/80 rounded-xl p-5 border border-slate-700/80 mb-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Selected Workplace Scenario:
                </span>
                <p className="text-sm text-slate-200 font-medium leading-relaxed">
                  "{currentScenario.scenario}"
                </p>
              </div>

              <div className="bg-blue-950/60 dark:bg-blue-950/90 rounded-xl p-5 border border-blue-800/60">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-[#84CC16]" />
                  <span className="text-xs font-bold text-[#84CC16] uppercase tracking-wider">
                    NextSoftHR Diagnostic Advisory:
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  {currentScenario.aiAnalysis}
                </p>
              </div>
            </div>

            {/* Matched Course Box */}
            <div className="lg:col-span-5 bg-slate-800/90 dark:bg-slate-900 rounded-xl p-5 border border-slate-700">
              <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400 block mb-1">
                Recommended Curriculum Track:
              </span>
              <h4 className="text-sm font-bold text-white leading-snug">
                {currentScenario.recommendedCourseTitle}
              </h4>
              <p className="text-xs text-slate-300 mt-2">
                Gain hands-on proficiency in <strong className="text-white">{currentScenario.skillCheck}</strong> with instructor mentorship.
              </p>

              <button
                onClick={() => onExploreCourse(currentScenario.recommendedCourseId)}
                className="mt-4 w-full py-2.5 px-4 text-xs font-bold text-[#0F4C81] bg-[#84CC16] hover:bg-[#74b810] rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Explore This Course</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Ethics & Human-Centered Notice */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-[#84CC16] flex-shrink-0" />
            <span>
              NextSoftHR AI supports the learner’s critical thinking and rapid problem-solving—it enhances, but does not replace, accredited human instructor guidance.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
