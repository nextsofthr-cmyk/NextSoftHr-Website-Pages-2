import React, { useState } from 'react';
import { Course, LearningPath } from '../types';
import { COURSES, LEARNING_PATHS } from '../data/academyData';
import {
  X,
  Sparkles,
  Bot,
  Brain,
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  Award,
  Layers,
  RotateCcw,
  Zap,
  Target,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface AIRecommendationResult {
  analysis: string;
  matchedCourseIds: string[];
  primaryRecommendation: {
    courseId: string;
    title: string;
    why: string;
  };
  secondaryRecommendation?: {
    courseId: string;
    title: string;
    why: string;
  };
  matchedPathId?: string;
  estimatedWeeks?: string;
  keySkills: string[];
  nextActionStep: string;
}

interface AITrainingAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: string;
  onSelectCourse: (course: Course) => void;
  onEnrollCourse: (course: Course) => void;
  onSelectPath: (path: LearningPath) => void;
}

const PRESET_SCENARIOS = [
  {
    title: 'Payroll Tax Reconciliations & Audit',
    role: 'Payroll Specialist / Finance Analyst',
    exp: 'Mid-level (3-5 years)',
    challenge: 'Handling complex gross-to-net tax bands, variance discrepancies, and upcoming state revenue audit defense.',
    goal: 'Eliminate monthly payroll variances and master statutory tax laws with certified proof.',
    org: 'Corporate Enterprise',
  },
  {
    title: 'HR Generalist to Strategic Lead',
    role: 'HR Officer / People Ops Generalist',
    exp: 'Early Career (1-3 years)',
    challenge: 'Need structured competency in employment contracts, grievance hearings, and formal workplace policies.',
    goal: 'Transition from routine administrative tasks to high-impact strategic employee relations.',
    org: 'Fast-growing Scaleup',
  },
  {
    title: 'AI Adoption in HR & Screening',
    role: 'Talent Acquisition Lead / HRBP',
    exp: 'Senior (5-8 years)',
    challenge: 'High applicant volume; need to deploy AI screening tools safely without algorithmic demographic bias.',
    goal: 'Implement automated prompt workflows and responsible AI policy frameworks.',
    org: 'Tech & Professional Services',
  },
  {
    title: 'New Team Lead Performance & OKRs',
    role: 'Engineering / Operations Manager',
    exp: 'New Manager (< 2 years managing)',
    challenge: 'Difficulty conducting performance appraisals, giving difficult feedback, and cascading quarterly OKRs.',
    goal: 'Build psychological safety, master GROW coaching, and manage underperformance objectively.',
    org: 'Commercial Enterprise',
  },
];

export const AITrainingAdvisorModal: React.FC<AITrainingAdvisorModalProps> = ({
  isOpen,
  onClose,
  onSelectCourse,
  onEnrollCourse,
  onSelectPath,
}) => {
  const { formatCoursePrice } = useCurrency();
  const [role, setRole] = useState('HR Specialist');
  const [experienceLevel, setExperienceLevel] = useState('Mid-level (3-5 years)');
  const [currentChallenges, setCurrentChallenges] = useState(
    'Discrepancies between gross compensation and bank batch files, plus anxiety over state statutory tax audits.'
  );
  const [goals, setGoals] = useState('Master end-to-end payroll computation, statutory audit defense, and lead compensation.');
  const [organizationType, setOrganizationType] = useState('Corporate Enterprise');
  const [preferredFormat, setPreferredFormat] = useState('Flexible (Live or Self-Paced)');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIRecommendationResult | null>(null);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: typeof PRESET_SCENARIOS[0]) => {
    setRole(preset.role);
    setExperienceLevel(preset.exp);
    setCurrentChallenges(preset.challenge);
    setGoals(preset.goal);
    setOrganizationType(preset.org);
  };

  const handleGenerateAdvice = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-training-advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role,
          experienceLevel,
          currentChallenges,
          goals,
          organizationType,
          preferredFormat,
        }),
      });

      const data = await res.json();
      if (data.success && data.recommendation) {
        setResult(data.recommendation);
      } else {
        throw new Error('Could not parse response');
      }
    } catch (err) {
      console.error('Advisor fetch error:', err);
      // Fallback
      setResult({
        analysis: `For your position as ${role}, mastering structured statutory compliance and modern automated tools will directly resolve your operational bottlenecks.`,
        matchedCourseIds: ['c2', 'c3'],
        primaryRecommendation: {
          courseId: 'c2',
          title: 'Payroll Administration & End-to-End Processing',
          why: 'Covers practical gross-to-net salary schedules, tax computations, and audit controls to eliminate variances.',
        },
        secondaryRecommendation: {
          courseId: 'c3',
          title: 'Payroll Compliance, Tax Law & Statutory Audit Defense',
          why: 'Provides complete defense against statutory revenue queries and audit liabilities.',
        },
        matchedPathId: 'payroll-professional-path',
        estimatedWeeks: '4 to 6 weeks',
        keySkills: [
          'Gross-to-net payroll computation and reconciliation',
          'Statutory audit defense protocols (PAYE, Pension, ITF)',
          'Automated payroll scheduling and internal controls',
        ],
        nextActionStep: 'Enroll in the upcoming cohort for Payroll Administration.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const primaryCourse = result
    ? COURSES.find((c) => c.id === result.primaryRecommendation.courseId) || COURSES[1]
    : null;

  const secondaryCourse = result && result.secondaryRecommendation
    ? COURSES.find((c) => c.id === result.secondaryRecommendation?.courseId) || COURSES[2]
    : null;

  const matchedPath = result && result.matchedPathId
    ? LEARNING_PATHS.find((p) => p.id === result.matchedPathId) || LEARNING_PATHS[1]
    : null;

  const formatPrice = (course: Course) => formatCoursePrice(course);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-5">
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#0F4C81] via-[#0B3C68] to-[#0A2E50] text-white p-6 sm:p-7 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Close Advisor"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-lime-400/20 text-[#84CC16] text-[11px] font-bold border border-lime-400/30 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Intelligent Course Recommender</span>
            </span>
            <span className="text-blue-200 text-xs font-mono hidden sm:inline">Powered by Gemini AI</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            NextSoftHR AI Training Advisor
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl leading-relaxed">
            Diagnose your career challenges or team upskilling goals. Our AI analyzes the entire NextSoftHR curriculum to recommend the precise course or learning path tailored to your workplace reality.
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Preset Quick Chips */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
              <Zap className="w-3.5 h-3.5 text-[#84CC16]" />
              <span>Or Choose a Workplace Scenario to Analyze:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_SCENARIOS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(p)}
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-700 text-left transition-all cursor-pointer group"
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0F4C81] dark:group-hover:text-[#84CC16]">
                    {p.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {p.role} · {p.goal}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleGenerateAdvice} className="space-y-4 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Your Current Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Senior Payroll Analyst, HR Officer, Operations Lead"
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Experience Tier
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                >
                  <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                  <option value="Mid-level (3-5 years)">Mid-level (3-5 years)</option>
                  <option value="Senior Level (6-10 years)">Senior Level (6-10 years)</option>
                  <option value="Executive / Director (10+ years)">Executive / Director (10+ years)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Workplace Challenge, Bottleneck or Inquiry
                </label>
                <textarea
                  rows={2}
                  value={currentChallenges}
                  onChange={(e) => setCurrentChallenges(e.target.value)}
                  placeholder="Describe what you are battling with (e.g. manual Excel payroll errors, union queries, drafting remote policies, implementing AI)..."
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Primary Career / Upskilling Goal
                </label>
                <input
                  type="text"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="e.g. Lead company payroll with zero variance, earn verifiable certification"
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Organization Sector
                </label>
                <select
                  value={organizationType}
                  onChange={(e) => setOrganizationType(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
                >
                  <option value="Corporate Enterprise">Corporate Enterprise</option>
                  <option value="Financial Institution / Banking">Financial Institution / Banking</option>
                  <option value="Tech Startup / Scaleup">Tech Startup / Scaleup</option>
                  <option value="Manufacturing & Logistics">Manufacturing & Logistics</option>
                  <option value="Public Sector / NGO">Public Sector / NGO</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Instant match against all 12 academy courses & learning paths.
              </span>

              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Brain className="w-4 h-4 animate-spin text-[#84CC16]" />
                    <span>Analyzing Curriculum...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#84CC16]" />
                    <span>Generate AI Training Advice</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* AI Output Result Section */}
          {result && (
            <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Diagnostic Evaluation Card */}
              <div className="p-5 rounded-xl bg-blue-50/80 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-5 h-5 text-[#0F4C81] dark:text-[#84CC16]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F4C81] dark:text-[#84CC16]">
                    Academic Diagnostic Evaluation
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {result.analysis}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1 font-semibold text-[#0F4C81] dark:text-blue-300">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Target Duration: {result.estimatedWeeks || '4 to 6 weeks'}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1 font-semibold text-[#65A30D] dark:text-[#84CC16]">
                    <Award className="w-3.5 h-3.5" />
                    <span>Validated NextSoftHR Certification</span>
                  </div>
                </div>
              </div>

              {/* Primary Recommended Course Card */}
              {primaryCourse && (
                <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border-2 border-[#0F4C81] dark:border-blue-500 shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#84CC16] text-[#0F4C81]">
                      Primary Recommended Match
                    </span>
                    <span className="text-sm font-extrabold text-[#0F4C81] dark:text-[#84CC16]">
                      {formatPrice(primaryCourse)}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {primaryCourse.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    {result.primaryRecommendation.why}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Instructor: <strong className="text-slate-700 dark:text-slate-200">{primaryCourse.instructor.name}</strong> · {primaryCourse.duration}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectCourse(primaryCourse);
                        }}
                        className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors cursor-pointer"
                      >
                        View Syllabus
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onEnrollCourse(primaryCourse);
                        }}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Enroll Now</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#84CC16]" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Secondary Recommended Course Card */}
              {secondaryCourse && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Complementary Track
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {formatPrice(secondaryCourse)}
                    </span>
                  </div>

                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                    {secondaryCourse.title}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    {result.secondaryRecommendation?.why}
                  </p>

                  <div className="mt-3 flex items-center justify-end">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectCourse(secondaryCourse);
                      }}
                      className="text-xs font-bold text-[#0F4C81] dark:text-[#84CC16] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Course</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Recommended Learning Path */}
              {matchedPath && (
                <div className="p-5 rounded-xl bg-gradient-to-r from-blue-900 to-[#0F4C81] text-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#84CC16]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-lime-300">
                        Recommended Multi-Course Career Path
                      </span>
                    </div>
                    <span className="text-xs font-bold text-white/90">{matchedPath.totalDuration}</span>
                  </div>

                  <h4 className="text-base font-bold text-white">
                    {matchedPath.title}
                  </h4>
                  <p className="text-xs text-blue-100 mt-1 max-w-xl">
                    {matchedPath.description} Progression for {matchedPath.targetRole}.
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                    <span className="text-xs text-blue-200">
                      Includes {matchedPath.steps.length} sequential milestone tracks.
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectPath(matchedPath);
                      }}
                      className="px-4 py-2 text-xs font-bold text-[#0F4C81] bg-[#84CC16] hover:bg-[#74b810] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Start Learning Path</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Key Skills Checklist */}
              {result.keySkills && result.keySkills.length > 0 && (
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-[#65A30D] dark:text-[#84CC16]" />
                    <span>Concrete Skills You Will Demonstrate</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.keySkills.map((sk, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16] mt-0.5 flex-shrink-0" />
                        <span>{sk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Next Action */}
              <div className="p-4 rounded-xl bg-lime-50 dark:bg-lime-950/40 border border-lime-200 dark:border-lime-900 flex items-center justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <Lightbulb className="w-5 h-5 text-[#65A30D] dark:text-[#84CC16] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Next Step for Immediate Impact</h5>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{result.nextActionStep}</p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#84CC16]" />
            <span>NextSoftHR AI Course Diagnostic Engine</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
