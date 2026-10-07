import React, { useState, useMemo } from 'react';
import {
  Compass,
  TrendingUp,
  Award,
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowRight,
  Target,
  Briefcase,
  Users,
  BrainCircuit,
  GraduationCap,
  ShieldCheck,
  Zap,
  BarChart3,
  Sliders,
  DollarSign,
  Clock,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';

interface CareerPathingVisualizerProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

interface CareerStage {
  level: string;
  title: string;
  experience: string;
  salaryUsd: string;
  salaryNgn: string;
  description: string;
  coreCompetencies: string[];
  nextsoftTool: {
    name: string;
    feature: string;
    benefit: string;
  };
  keyOkrs: string[];
  recommendedCert: string;
}

interface CareerTrack {
  id: string;
  department: string;
  iconName: string;
  description: string;
  stages: CareerStage[];
}

const CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'hr',
    department: 'People & HR Operations',
    iconName: 'Users',
    description: 'From routine personnel administration to strategic Pan-African workforce leadership.',
    stages: [
      {
        level: 'Entry / Associate',
        title: 'HR Operations Officer',
        experience: '0 – 2 Years',
        salaryUsd: '$8,000 – $14,000 / yr',
        salaryNgn: '₦8M – ₦15M / yr',
        description: 'Managing employee records, onboarding checklists, leave queries, and initial attendance reconciliations.',
        coreCompetencies: ['Onboarding workflows', 'Leave verification', 'Basic labor law compliance', 'Attendance auditing'],
        nextsoftTool: {
          name: 'NextSofthr Core HR & Document Vault',
          feature: 'Automated digital onboarding and self-service records',
          benefit: 'Reclaims 15+ hours weekly from manual paperwork so officers focus on employee engagement.',
        },
        keyOkrs: ['Reduce employee onboarding turnaround to under 48 hours', 'Achieve 100% digital personnel file completion'],
        recommendedCert: 'Associate CIPM or HRCI aPHR',
      },
      {
        level: 'Mid-Level',
        title: 'Senior Talent & People Partner',
        experience: '2 – 5 Years',
        salaryUsd: '$16,000 – $26,000 / yr',
        salaryNgn: '₦18M – ₦32M / yr',
        description: 'Leading departmental performance reviews, resolving employee relations, and orchestrating skills training.',
        coreCompetencies: ['360° feedback management', 'Competency mapping', 'Payroll reconciliation', 'Conflict resolution'],
        nextsoftTool: {
          name: 'NextSofthr 360° Appraisal & Matrix Engine',
          feature: 'Custom review cycles with automated peer & manager reviews',
          benefit: 'Eliminates annual review bias with continuous, objective merit scoring.',
        },
        keyOkrs: ['Maintain 92%+ review cycle on-time completion', 'Identify top 15% high-potential talent across branches'],
        recommendedCert: 'CIPM ACIPM or SHRM-CP',
      },
      {
        level: 'Senior / Lead',
        title: 'People & Culture Manager',
        experience: '5 – 8 Years',
        salaryUsd: '$28,000 – $45,000 / yr',
        salaryNgn: '₦35M – ₦58M / yr',
        description: 'Overseeing multi-branch HR strategy, statutory tax compliance governance, and departmental OKR alignment.',
        coreCompetencies: ['Workforce planning', 'Pan-African labor statutes', 'Retention modeling', 'Budget allocation'],
        nextsoftTool: {
          name: 'NextSofthr Predictive Attrition & Analytics',
          feature: 'Machine-learning flight risk detection & retention insights',
          benefit: 'Alerts leadership to turnover risks 60 days before resignation notices occur.',
        },
        keyOkrs: ['Reduce voluntary annual turnover below 8%', 'Ensure 100% audit compliance with NDPR and local tax boards'],
        recommendedCert: 'SHRM-SCP or SPHRi',
      },
      {
        level: 'Executive',
        title: 'Chief Human Resources Officer (CHRO)',
        experience: '8+ Years',
        salaryUsd: '$50,000 – $95,000+ / yr',
        salaryNgn: '₦65M – ₦130M+ / yr',
        description: 'Directing executive succession planning, board reporting, M&A talent integration, and cross-border expansion.',
        coreCompetencies: ['Executive succession planning', 'Pan-African entity scaling', 'C-suite advisory', 'Enterprise culture'],
        nextsoftTool: {
          name: 'NextSofthr Enterprise Succession & Governance',
          feature: '9-Box grid talent calibration and leadership bench pipeline',
          benefit: 'Provides the Board of Directors instant talent continuity blueprints across all subsidiaries.',
        },
        keyOkrs: ['Develop a 2-deep succession pipeline for all mission-critical roles', 'Optimize workforce ROI by 24% year-over-year'],
        recommendedCert: 'Fellow CIPM (FCIPM) or Chartered Fellow CIPD',
      },
    ],
  },
  {
    id: 'finance',
    department: 'Finance & Payroll Accounting',
    iconName: 'DollarSign',
    description: 'From transaction journal entries to multi-currency capital governance and treasury leadership.',
    stages: [
      {
        level: 'Entry / Associate',
        title: 'Payroll & Accounts Assistant',
        experience: '0 – 2 Years',
        salaryUsd: '$7,500 – $13,500 / yr',
        salaryNgn: '₦7M – ₦14M / yr',
        description: 'Validating monthly timesheets, compiling statutory deduction registers, and managing expense disbursements.',
        coreCompetencies: ['Statutory deductions', 'Invoice matching', 'Bank reconciliations', 'Timesheet audits'],
        nextsoftTool: {
          name: 'NextSofthr 3-Click Payroll Engine',
          feature: 'Automatic tax computation (PAYE, NHF, Pensions)',
          benefit: 'Guarantees 100% mathematical precision with zero manual calculation errors.',
        },
        keyOkrs: ['Complete timesheet verification by 22nd of every month', 'Zero errors in monthly tax withholding schedules'],
        recommendedCert: 'ICAN ATSWA or ACCA Foundations',
      },
      {
        level: 'Mid-Level',
        title: 'Senior Financial & Tax Analyst',
        experience: '2 – 5 Years',
        salaryUsd: '$15,000 – $27,000 / yr',
        salaryNgn: '₦17M – ₦34M / yr',
        description: 'Managing monthly financial closes, statutory filings with revenue services, and payroll variance analyses.',
        coreCompetencies: ['Multi-entity tax filing', 'Variance analysis', 'Budget forecasting', 'Audit trail verification'],
        nextsoftTool: {
          name: 'NextSofthr Statutory Compliance Hub',
          feature: 'Direct integration with KRA, GRA, and state tax service formats',
          benefit: 'Generates regulatory-ready remittance schedules preventing hefty late-filing fines.',
        },
        keyOkrs: ['Reduce month-end payroll close cycle to 2 business days', 'Maintain 100% clean audit trail for statutory remittances'],
        recommendedCert: 'ACA (ICAN) or ACCA Affiliate',
      },
      {
        level: 'Senior / Lead',
        title: 'Finance & Payroll Controller',
        experience: '5 – 8 Years',
        salaryUsd: '$30,000 – $52,000 / yr',
        salaryNgn: '₦38M – ₦68M / yr',
        description: 'Directing corporate treasury, multi-currency salary disbursements, internal financial controls, and risk mitigation.',
        coreCompetencies: ['Cash-flow modeling', 'Treasury hedging', 'Internal controls', 'ERP integration'],
        nextsoftTool: {
          name: 'NextSofthr Real-Time ERP & Ledger Sync',
          feature: 'Instant journal entry synchronization with SAP, Oracle, and QuickBooks',
          benefit: 'Eliminates dual data entry and gives real-time labor cost visibility against budgets.',
        },
        keyOkrs: ['Zero regulatory penalties across all subsidiary entities', 'Optimize working capital reserves by 18%'],
        recommendedCert: 'FCA (ICAN), FCCA, or CFA',
      },
      {
        level: 'Executive',
        title: 'Chief Financial Officer (CFO)',
        experience: '8+ Years',
        salaryUsd: '$55,000 – $110,000+ / yr',
        salaryNgn: '₦75M – ₦160M+ / yr',
        description: 'Capital structure strategy, investor relations, international entity structuring, and enterprise valuation growth.',
        coreCompetencies: ['Strategic capital allocation', 'M&A valuation', 'Board governance', 'Enterprise risk management'],
        nextsoftTool: {
          name: 'NextSofthr Executive Labor Cost Intelligence',
          feature: 'Longitudinal labor-to-revenue efficiency heatmaps',
          benefit: 'Enables the C-suite to model headcounts, salary reviews, and regional expansion budgets accurately.',
        },
        keyOkrs: ['Achieve 20%+ EBITDA margin expansion', 'Maintain pristine regulatory compliance across all African entities'],
        recommendedCert: 'FCA / CFA / Executive MBA',
      },
    ],
  },
  {
    id: 'operations',
    department: 'Operations & Supply Chain',
    iconName: 'TrendingUp',
    description: 'From field roster coordination to operational excellence and pan-African facility leadership.',
    stages: [
      {
        level: 'Entry / Associate',
        title: 'Operations & Roster Coordinator',
        experience: '0 – 2 Years',
        salaryUsd: '$7,000 – $12,500 / yr',
        salaryNgn: '₦7M – ₦13M / yr',
        description: 'Publishing weekly shift schedules, monitoring attendance punch cards, and logging inventory requisitions.',
        coreCompetencies: ['Shift scheduling', 'Attendance verification', 'Dispatch coordination', 'Field safety adherence'],
        nextsoftTool: {
          name: 'NextSofthr Biometric Shift & Roster Scheduler',
          feature: 'Drag-and-drop rotation calendar with mobile SMS push',
          benefit: 'Staff receive instant shift notifications on WhatsApp or mobile app, cutting shift absenteeism by 65%.',
        },
        keyOkrs: ['Publish shift rosters 7 days in advance with zero staffing shortages', 'Reduce unexcused shift tardiness to under 3%'],
        recommendedCert: 'Six Sigma White Belt or CILT',
      },
      {
        level: 'Mid-Level',
        title: 'Branch Operations Lead',
        experience: '2 – 5 Years',
        salaryUsd: '$14,000 – $24,000 / yr',
        salaryNgn: '₦16M – ₦30M / yr',
        description: 'Managing branch facility workflows, asset tracking, vendor contracts, and field employee productivity.',
        coreCompetencies: ['Process optimization', 'SLA enforcement', 'Facility management', 'Field staff performance'],
        nextsoftTool: {
          name: 'NextSofthr Geofenced Field Mobile Tracker',
          feature: 'GPS-bounded clocking with offline cellular caching',
          benefit: 'Ensures distributed sales and field engineers are verified at client sites without fraudulent check-ins.',
        },
        keyOkrs: ['Ensure 98%+ on-time client order fulfillment', 'Achieve 100% compliance with workplace safety standards'],
        recommendedCert: 'Lean Six Sigma Green Belt or PMP',
      },
      {
        level: 'Senior / Lead',
        title: 'Head of Regional Operations',
        experience: '5 – 8 Years',
        salaryUsd: '$27,000 – $46,000 / yr',
        salaryNgn: '₦34M – ₦60M / yr',
        description: 'Orchestrating regional supply chains, multi-hub logistics, turnstile security hardware, and unit economics.',
        coreCompetencies: ['Multi-hub logistics', 'CapEx planning', 'Lean manufacturing', 'Union & labor negotiations'],
        nextsoftTool: {
          name: 'NextSofthr Multi-Branch Command Center',
          feature: 'Centralized live attendance, overtime, and facility dashboard',
          benefit: 'Gives regional directors unified oversight across 20+ branches on a single screen.',
        },
        keyOkrs: ['Reduce regional operating expenses by 14%', 'Achieve 99.4% on-time logistics SLA across corridors'],
        recommendedCert: 'Six Sigma Black Belt or CSCP',
      },
      {
        level: 'Executive',
        title: 'Chief Operating Officer (COO)',
        experience: '8+ Years',
        salaryUsd: '$52,000 – $105,000+ / yr',
        salaryNgn: '₦70M – ₦150M+ / yr',
        description: 'Enterprise operational strategy, business model scaling, regional regulatory integration, and digital transformation.',
        coreCompetencies: ['Enterprise scaling', 'Crisis management', 'Cross-functional alignment', 'Operational transformation'],
        nextsoftTool: {
          name: 'NextSofthr Enterprise Workforce Command Suite',
          feature: 'Automated labor capacity forecasting and risk mitigation',
          benefit: 'Models headcount needs dynamically based on operational demand forecasts.',
        },
        keyOkrs: ['Scale operational throughput by 40% without increasing administrative overhead', 'Deliver industry-leading customer Net Promoter Score'],
        recommendedCert: 'Executive Leadership Certification',
      },
    ],
  },
  {
    id: 'tech',
    department: 'Technology & Engineering',
    iconName: 'BrainCircuit',
    description: 'From software engineering craftsmanship to tech architecture and enterprise digital transformation.',
    stages: [
      {
        level: 'Entry / Associate',
        title: 'Junior Software Engineer',
        experience: '0 – 2 Years',
        salaryUsd: '$9,000 – $16,000 / yr',
        salaryNgn: '₦10M – ₦18M / yr',
        description: 'Building features, fixing bugs, writing tests, and collaborating in daily standups.',
        coreCompetencies: ['Modern frameworks', 'Clean code & unit tests', 'Git workflows', 'Problem-solving'],
        nextsoftTool: {
          name: 'NextSofthr Individual OKR & Sprint Tracker',
          feature: 'Transparent milestone metrics with continuous feedback loops',
          benefit: 'Junior developers see exact criteria required for promotion into mid-level engineering.',
        },
        keyOkrs: ['Deliver sprint story points with less than 2% escaped defect rate', 'Complete 3 internal engineering masterclasses'],
        recommendedCert: 'AWS Certified Cloud Practitioner',
      },
      {
        level: 'Mid-Level',
        title: 'Senior Software Engineer',
        experience: '2 – 5 Years',
        salaryUsd: '$18,000 – $32,000 / yr',
        salaryNgn: '₦22M – ₦42M / yr',
        description: 'Architecting modular systems, conducting peer code reviews, mentoring juniors, and ensuring high service availability.',
        coreCompetencies: ['System architecture', 'API design', 'Code mentorship', 'Performance profiling'],
        nextsoftTool: {
          name: 'NextSofthr Skills Matrix & Peer Kudos',
          feature: 'Technical competency mapping with peer endorsement tracking',
          benefit: 'Identifies technical subject matter experts and ensures recognition for mentorship.',
        },
        keyOkrs: ['Maintain 99.95% system uptime on core services', 'Successfully onboard and mentor 2 junior engineers'],
        recommendedCert: 'AWS Certified Solutions Architect Associate',
      },
      {
        level: 'Senior / Lead',
        title: 'Engineering Manager / Lead Architect',
        experience: '5 – 8 Years',
        salaryUsd: '$34,000 – $58,000 / yr',
        salaryNgn: '₦44M – ₦78M / yr',
        description: 'Leading agile engineering squads, driving architectural roadmaps, and conducting engineering appraisals.',
        coreCompetencies: ['Technical leadership', 'Sprint velocity optimization', 'Hiring & technical interviews', 'Security compliance'],
        nextsoftTool: {
          name: 'NextSofthr Engineering Appraisal & Career Ladders',
          feature: 'Standardized dual-track ladders (Staff IC vs Engineering Management)',
          benefit: 'Empowers engineers to advance with transparent salary bands without needing to become managers.',
        },
        keyOkrs: ['Increase squad sprint velocity by 25% without sacrificing test coverage', 'Maintain zero critical security vulnerabilities in production'],
        recommendedCert: 'Certified ScrumMaster (CSM) or TOGAF',
      },
      {
        level: 'Executive',
        title: 'Chief Technology Officer (CTO)',
        experience: '8+ Years',
        salaryUsd: '$60,000 – $120,000+ / yr',
        salaryNgn: '₦85M – ₦180M+ / yr',
        description: 'Directing enterprise technology vision, IP protection, infrastructure security, and technical board governance.',
        coreCompetencies: ['Technology roadmap', 'Cloud cost optimization', 'Enterprise IP & InfoSec', 'Board technical strategy'],
        nextsoftTool: {
          name: 'NextSofthr Enterprise Governance & SOC2 Vault',
          feature: 'Audit-ready security logs and access governance matrices',
          benefit: 'Maintains airtight ISO 27001 and NDPR compliance for technical investor due diligence.',
        },
        keyOkrs: ['Complete enterprise SOC2 Type II certification', 'Support 300% platform user growth with zero unscheduled downtime'],
        recommendedCert: 'CISSP / CISM',
      },
    ],
  },
];

export const CareerPathingVisualizer: React.FC<CareerPathingVisualizerProps> = ({
  onOpenDemo,
  onOpenGetStarted,
}) => {
  const [selectedTrackId, setSelectedTrackId] = useState<string>('hr');
  const [activeStageIndex, setActiveStageIndex] = useState<number>(1);
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [completedSkills, setCompletedSkills] = useState<Record<string, boolean>>({
    'Quarterly OKR 90%+ target achieved': true,
    '360 Peer Review score > 4.2/5.0': true,
    'Certified in core functional domain': false,
    'Leadership & mentorship milestone logged': false,
  });

  const currentTrack = useMemo(
    () => CAREER_TRACKS.find((t) => t.id === selectedTrackId) || CAREER_TRACKS[0],
    [selectedTrackId]
  );

  const currentStage = currentTrack.stages[activeStageIndex];

  // Promotion Readiness Score calculation
  const readinessScore = useMemo(() => {
    const total = Object.keys(completedSkills).length;
    const completed = Object.values(completedSkills).filter(Boolean).length;
    const base = 40; // baseline for current tenure
    return Math.round(base + (completed / total) * 55);
  }, [completedSkills]);

  const toggleSkill = (skill: string) => {
    setCompletedSkills((prev) => ({
      ...prev,
      [skill]: !prev[skill],
    }));
  };

  const handleWhatsAppConsultation = () => {
    const text = `Hello NextSofthr Team, I am exploring your Career Pathing & Performance Management framework for our ${currentTrack.department} department. We want to implement objective appraisal cycles and transparent career progression across our organization.`;
    window.open(`https://wa.me/2349158482622?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="career-pathing"
      className="py-20 bg-white dark:bg-[#07182E] transition-colors border-b border-slate-200 dark:border-blue-900/60 relative overflow-hidden"
    >
      {/* Ambient background accents */}
      <div className="absolute -top-32 right-10 w-96 h-96 bg-[#0256C4]/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-96 h-96 bg-[#84CC16]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-xs font-bold text-[#0256C4] dark:text-[#84CC16] mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Talent Development Visualizer</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight leading-tight">
            Map Clear Career Trajectories with{' '}
            <span className="text-[#0256C4] dark:text-[#84CC16]">NextSofthr Performance Tools</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Retain high-performing African talent by replacing vague subjective appraisals with transparent, objective career ladders, real-time OKRs, and automated merit progression.
          </p>
        </div>

        {/* Track Selector Tabs & Currency Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-slate-50 dark:bg-[#0A2540] p-2 rounded-2xl border border-slate-200 dark:border-blue-900/80 shadow-sm">
          {/* Track Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {CAREER_TRACKS.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => {
                  setSelectedTrackId(track.id);
                  setActiveStageIndex(1); // default to mid-level
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  selectedTrackId === track.id
                    ? 'bg-[#0256C4] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-blue-900/40'
                }`}
              >
                {track.id === 'hr' && <Users className="w-4 h-4" />}
                {track.id === 'finance' && <DollarSign className="w-4 h-4" />}
                {track.id === 'operations' && <TrendingUp className="w-4 h-4" />}
                {track.id === 'tech' && <BrainCircuit className="w-4 h-4" />}
                <span>{track.department}</span>
              </button>
            ))}
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-1 self-end sm:self-center bg-white dark:bg-[#07182E] p-1 rounded-xl border border-slate-200 dark:border-blue-900">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-2">
              Salary Benchmark:
            </span>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                currency === 'USD'
                  ? 'bg-[#0256C4] text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => setCurrency('NGN')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                currency === 'NGN'
                  ? 'bg-[#0256C4] text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              NGN (₦)
            </button>
          </div>
        </div>

        {/* 4-Stage Connected Roadmap Timeline */}
        <div className="mb-10 bg-slate-50/70 dark:bg-[#0A2540]/60 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-blue-900/60 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {currentTrack.stages.map((stage, idx) => {
              const isSelected = activeStageIndex === idx;
              const isPast = activeStageIndex > idx;

              return (
                <button
                  key={stage.level}
                  type="button"
                  onClick={() => setActiveStageIndex(idx)}
                  className={`relative text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white dark:bg-[#0C2F52] border-[#0256C4] dark:border-[#84CC16] shadow-xl scale-102 ring-2 ring-[#0256C4]/20 dark:ring-[#84CC16]/20'
                      : isPast
                      ? 'bg-white/80 dark:bg-[#071D3A]/80 border-slate-200 dark:border-blue-900/60 hover:border-blue-300 dark:hover:border-blue-700'
                      : 'bg-white/60 dark:bg-[#06182E]/60 border-slate-200/60 dark:border-blue-950 hover:border-slate-300'
                  }`}
                >
                  {/* Step indicator header */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#0256C4] text-white dark:bg-[#84CC16] dark:text-[#0A2540]'
                          : isPast
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-slate-200 dark:bg-blue-950 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Stage {idx + 1} • {stage.level}
                    </span>

                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0256C4] dark:bg-[#84CC16] animate-ping" />
                    )}
                  </div>

                  <div>
                    <h4
                      className={`text-base font-extrabold leading-snug transition-colors ${
                        isSelected
                          ? 'text-[#0256C4] dark:text-[#84CC16]'
                          : 'text-[#0A2540] dark:text-white group-hover:text-[#0256C4]'
                      }`}
                    >
                      {stage.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {stage.description}
                    </p>
                  </div>

                  {/* Micro Metadata badge */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-blue-900/40 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#0256C4] dark:text-[#84CC16]" />
                      {stage.experience}
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {currency === 'USD' ? stage.salaryUsd.split(' /')[0] : stage.salaryNgn.split(' /')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Deep-Dive Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Detailed Stage Information & Core Competencies (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0A2540] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-blue-900/80 shadow-xl space-y-6">
            
            {/* Header: Title & Salary Benchmark */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-blue-900/60">
              <div>
                <span className="text-xs font-bold text-[#0256C4] dark:text-[#84CC16] uppercase tracking-wider">
                  Target Role Blueprint
                </span>
                <h3 className="text-2xl font-black text-[#0A2540] dark:text-white mt-0.5">
                  {currentStage.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {currentStage.description}
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/70 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto shrink-0">
                <div className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                  Industry Salary Range
                </div>
                <div className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-300">
                  {currency === 'USD' ? currentStage.salaryUsd : currentStage.salaryNgn}
                </div>
              </div>
            </div>

            {/* NextSofthr Performance Feature Spotlight Callout */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50/30 dark:from-blue-950/60 dark:to-[#071D3A] border border-blue-200 dark:border-blue-800/80 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#0256C4] text-white dark:bg-[#84CC16] dark:text-[#0A2540]">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0256C4] dark:text-[#84CC16]">
                  How NextSofthr Facilitates This Milestone
                </span>
              </div>

              <h4 className="text-base font-bold text-[#0A2540] dark:text-white">
                {currentStage.nextsoftTool.name}
              </h4>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>Platform Capability:</strong> {currentStage.nextsoftTool.feature}
              </p>

              <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-medium bg-white/70 dark:bg-black/30 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60">
                <strong>Employee &amp; Employer Impact:</strong> {currentStage.nextsoftTool.benefit}
              </p>
            </div>

            {/* Core Competencies Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#0256C4] dark:text-[#84CC16]" />
                <span>Required Competency Matrix for Advancement</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentStage.coreCompetencies.map((comp) => (
                  <div
                    key={comp}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-[#07182E] border border-slate-200 dark:border-blue-900/60 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Measurable Strategic OKRs */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-[#0256C4] dark:text-[#84CC16]" />
                <span>Target OKR Benchmark in NextSofthr</span>
              </h4>

              <div className="space-y-2">
                {currentStage.keyOkrs.map((okr) => (
                  <div
                    key={okr}
                    className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#0256C4] dark:bg-[#84CC16] mt-1.5 shrink-0" />
                    <span className="font-medium leading-relaxed">{okr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Professional Credential */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Recommended L&amp;D Credential:</span>
                <span className="font-bold text-amber-800 dark:text-amber-300">{currentStage.recommendedCert}</span>
              </div>
              <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 hidden sm:inline">
                Tracked in NextSofthr LMS
              </span>
            </div>
          </div>

          {/* RIGHT: Promotion Readiness Simulator & NextSofthr Value (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interactive Promotion Readiness Simulator Card */}
            <div className="bg-white dark:bg-[#0A2540] rounded-3xl p-6 border border-slate-200 dark:border-blue-900/80 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-blue-900/60">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#0256C4] dark:text-[#84CC16] flex items-center justify-center font-bold">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0A2540] dark:text-white">Promotion Readiness Simulator</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">NextSofthr Merit Calibration</p>
                  </div>
                </div>

                <span className="text-xl font-black text-[#0256C4] dark:text-[#84CC16]">
                  {readinessScore}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-300">Readiness Score</span>
                  <span className="text-[#0256C4] dark:text-[#84CC16] font-bold">
                    {readinessScore >= 85 ? 'Eligible for Promotion Review' : 'In Progress (Developing)'}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-[#07182E] rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-blue-900">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#0256C4] to-[#84CC16]"
                    style={{ width: `${readinessScore}%` }}
                  />
                </div>
              </div>

              {/* Toggleable Milestone Criteria */}
              <div className="space-y-2 pt-1">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Toggle achievements to test the promotion algorithm:
                </p>

                {Object.entries(completedSkills).map(([skill, isDone]) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isDone
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                        : 'bg-slate-50 dark:bg-[#07182E] border-slate-200 dark:border-blue-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <span className="pr-2">{skill}</span>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#84CC16] shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-[#07182E] p-3 rounded-xl border border-slate-200 dark:border-blue-900/60">
                NextSofthr connects these verified milestones directly with automated payroll grade step-ups and compensation reviews, removing favoritism and office politics.
              </p>
            </div>

            {/* Performance Management Suite Value Props */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0A2540] to-[#05192D] text-white border border-blue-900/80 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#84CC16]" />
                <h4 className="text-base font-bold text-white">Why African Enterprises Choose NextSofthr Performance</h4>
              </div>

              <ul className="space-y-2.5 text-xs text-blue-100/90">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0 mt-0.5" />
                  <span><strong>Eliminate Annual Review Panic:</strong> Continuous monthly check-ins keep goals aligned without spreadsheet scramble.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0 mt-0.5" />
                  <span><strong>Fair Compensation Linkage:</strong> Objective appraisal scores seamlessly update payroll salary grades in one click.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0 mt-0.5" />
                  <span><strong>Multi-Branch Succession:</strong> Identify ready-now leaders for new branches across Lagos, Accra, Nairobi, and Johannesburg.</span>
                </li>
              </ul>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="py-2.5 px-3.5 rounded-xl bg-[#84CC16] hover:bg-[#73b612] text-[#0A2540] font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Test in Live Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppConsultation}
                  className="py-2.5 px-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 font-semibold text-xs border border-emerald-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Discuss Career Framework</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
