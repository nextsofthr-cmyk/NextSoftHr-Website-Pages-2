import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Clock, ShieldCheck, UserCheck, Zap, TrendingUp, 
  RotateCcw, Globe2, ArrowRight, CheckCircle2, ChevronDown, 
  Building2, Sparkles, BarChart3, AlertTriangle, FileCheck
} from 'lucide-react';

interface GlobalImpactStatsProps {
  onOpenDemo?: () => void;
  onOpenGetStarted?: () => void;
  onScrollToCalculator?: () => void;
}

type ProjectionScale = 'global' | 'team100' | 'team500' | 'team2000';

interface MetricItem {
  id: string;
  title: string;
  targetValue: number;
  decimals: number;
  prefix?: string;
  suffix: string;
  badge: string;
  badgeColor: string;
  icon: typeof Clock;
  iconBg: string;
  iconColor: string;
  description: string;
  traditionalState: string;
  nextsoftState: string;
  howItWorks: string[];
}

// Custom smoothly eased count-up hook
const useAnimatedCount = (target: number, duration: number = 1800, triggerKey: any = 0) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const startValue = 0;
    const changeInValue = target - startValue;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Smooth ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCurrent(startValue + changeInValue * easeOut);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCurrent(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, triggerKey]);

  return current;
};

// Animated Number Display Component
const AnimatedNumber = ({ 
  value, 
  decimals = 0, 
  prefix = '', 
  suffix = '',
  triggerKey = 0 
}: { 
  value: number; 
  decimals?: number; 
  prefix?: string; 
  suffix?: string;
  triggerKey?: any;
}) => {
  const count = useAnimatedCount(value, 1600, triggerKey);

  const formattedNumber = useMemo(() => {
    if (decimals > 0) {
      return count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
    return Math.round(count).toLocaleString();
  }, [count, decimals]);

  return (
    <span>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};

export const GlobalImpactStats = ({
  onOpenDemo,
  onOpenGetStarted,
  onScrollToCalculator
}: GlobalImpactStatsProps) => {
  const [scale, setScale] = useState<ProjectionScale>('global');
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);
  const [hasIntersected, setHasIntersected] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger animation when entering viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasIntersected(true);
            setAnimationKey((prev) => prev + 1);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleScaleChange = (newScale: ProjectionScale) => {
    setScale(newScale);
    setAnimationKey((prev) => prev + 1);
  };

  const handleReplay = () => {
    setAnimationKey((prev) => prev + 1);
  };

  const toggleExpand = (id: string) => {
    setExpandedMetric((prev) => (prev === id ? null : id));
  };

  // Dynamic values configured based on selected projection scale
  const metrics: MetricItem[] = useMemo(() => {
    switch (scale) {
      case 'team100':
        return [
          {
            id: 'hours',
            title: 'Hours Saved Annually',
            targetValue: hasIntersected ? 2840 : 0,
            decimals: 0,
            suffix: ' hrs',
            badge: '82% Admin Reduction',
            badgeColor: 'bg-lime-100 text-lime-800 dark:bg-lime-950/80 dark:text-lime-300 border-lime-300 dark:border-lime-800',
            icon: Clock,
            iconBg: 'bg-lime-100 dark:bg-lime-900/40 text-lime-700 dark:text-lime-400',
            iconColor: 'text-lime-600 dark:text-lime-400',
            description: 'Staff hours liberated from manual timesheet chasing, paper leave approvals, and reconciliation.',
            traditionalState: '3,460 hrs/yr wasted on manual paper & spreadsheet overhead',
            nextsoftState: '620 hrs/yr with intelligent automated workflows',
            howItWorks: [
              'Biometric & GPS mobile punch-in with instant auto-approval rules',
              'AI automated leave accrual balances and conflict detection',
              'Self-service employee portal cuts 90% of routine HR inquiries'
            ]
          },
          {
            id: 'errors',
            title: 'Payroll Errors Reduced',
            targetValue: hasIntersected ? 99.4 : 0,
            decimals: 1,
            suffix: '%',
            badge: '<0.01% Variance',
            badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800',
            icon: ShieldCheck,
            iconBg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400',
            iconColor: 'text-blue-600 dark:text-blue-400',
            description: 'Zero recalculation headaches with statutory payroll rule tables and pre-flight tax audits.',
            traditionalState: 'Avg. 3 to 6 payroll calculation disputes per cycle',
            nextsoftState: 'Zero recurring tax penalties and 99.9% first-pass accuracy',
            howItWorks: [
              'Built-in real-time statutory tax formulas for 14+ jurisdictions',
              'Pre-flight automated anomaly detection flagged before disbursement',
              'Direct-to-bank electronic batch file generations'
            ]
          },
          {
            id: 'onboarding',
            title: 'Average Onboarding Time',
            targetValue: hasIntersected ? 1.8 : 0,
            decimals: 1,
            suffix: ' Days',
            badge: '87% Accelerated',
            badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
            icon: UserCheck,
            iconBg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400',
            iconColor: 'text-emerald-600 dark:text-emerald-400',
            description: 'From signed offer letter to full productivity with automated welcome packets and digital e-signatures.',
            traditionalState: '14 business days of printing, scanning, and emailing files',
            nextsoftState: '1.8 business days via self-guided mobile onboarding',
            howItWorks: [
              'Pre-hire self-service link sent prior to Day 1',
              'Automated e-signature and statutory tax form capture',
              'Instant provisioning of role-based permissions and assets'
            ]
          },
          {
            id: 'cycle',
            title: 'Payroll Processing Speed',
            targetValue: hasIntersected ? 88 : 0,
            decimals: 0,
            suffix: '% Faster',
            badge: '45 Min Run Time',
            badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-800',
            icon: Zap,
            iconBg: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400',
            iconColor: 'text-purple-600 dark:text-purple-400',
            description: 'Cut monthly payroll cycle from a 3-day ordeal down to a single automated verification workflow.',
            traditionalState: '2.5 to 3.5 days of manual spreadsheet data collation',
            nextsoftState: 'Under 45 minutes from timesheet lock to banking disbursement',
            howItWorks: [
              'Real-time automated sync between attendance clocks and payroll ledger',
              'Automatic calculation of overtime rates and night-shift differentials',
              '1-click electronic payslip distribution via secure employee app'
            ]
          }
        ];

      case 'team500':
        return [
          {
            id: 'hours',
            title: 'Hours Saved Annually',
            targetValue: hasIntersected ? 14250 : 0,
            decimals: 0,
            suffix: ' hrs',
            badge: '84% Admin Reduction',
            badgeColor: 'bg-lime-100 text-lime-800 dark:bg-lime-950/80 dark:text-lime-300 border-lime-300 dark:border-lime-800',
            icon: Clock,
            iconBg: 'bg-lime-100 dark:bg-lime-900/40 text-lime-700 dark:text-lime-400',
            iconColor: 'text-lime-600 dark:text-lime-400',
            description: 'Significant operational recovery equivalent to over 7 full-time operational administrators.',
            traditionalState: '16,900 annual hours tied up in manual tracking and inquiries',
            nextsoftState: '2,650 annual hours with centralized workflow intelligence',
            howItWorks: [
              'Automated shift swaps, roster scheduling, and penalty rate tracking',
              'Departmental manager approval delegation with mobile alerts',
              'Centralized document repository with automated expiry triggers'
            ]
          },
          {
            id: 'errors',
            title: 'Payroll Errors Reduced',
            targetValue: hasIntersected ? 99.6 : 0,
            decimals: 1,
            suffix: '%',
            badge: 'Audit-Grade Quality',
            badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800',
            icon: ShieldCheck,
            iconBg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400',
            iconColor: 'text-blue-600 dark:text-blue-400',
            description: 'Audited statutory precision across multiple branches, business units, and legal entities.',
            traditionalState: 'Estimated $68,000/yr in retroactive corrections & dispute resolution',
            nextsoftState: 'Zero financial audit penalties and airtight ledger exports',
            howItWorks: [
              'Custom wage rule matrices for salaried, hourly, and contract workers',
              'Multi-tier finance review and digital cryptographic audit trail',
              'Native integration with general ledger accounting suites'
            ]
          },
          {
            id: 'onboarding',
            title: 'Average Onboarding Time',
            targetValue: hasIntersected ? 1.5 : 0,
            decimals: 1,
            suffix: ' Days',
            badge: '90% Accelerated',
            badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
            icon: UserCheck,
            iconBg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400',
            iconColor: 'text-emerald-600 dark:text-emerald-400',
            description: 'Rapid, standardized welcoming experience ensuring zero Day 1 equipment or payroll delays.',
            traditionalState: '15 business days across cross-functional email threads',
            nextsoftState: '1.5 business days from offer acceptance to productive contribution',
            howItWorks: [
              'Automated compliance document checklist by jurisdiction',
              'Self-service bank and identity credential verification',
              'Pre-scheduled intro meetings and initial training course tracks'
            ]
          },
          {
            id: 'cycle',
            title: 'Payroll Processing Speed',
            targetValue: hasIntersected ? 91 : 0,
            decimals: 0,
            suffix: '% Faster',
            badge: '1.2 Hr Completion',
            badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-800',
            icon: Zap,
            iconBg: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400',
            iconColor: 'text-purple-600 dark:text-purple-400',
            description: 'Complete 500-person multi-department payroll cycle in under 80 minutes.',
            traditionalState: '5 business days of manual collation across departmental managers',
            nextsoftState: '75 minutes total verification and bank distribution',
            howItWorks: [
              'Bulk payroll dry-run with automatic highlight of edge cases',
              'Direct multi-entity banking dispatches and tax wire files',
              'Instant push notifications to employee mobile devices'
            ]
          }
        ];

      case 'team2000':
        return [
          {
            id: 'hours',
            title: 'Hours Saved Annually',
            targetValue: hasIntersected ? 58400 : 0,
            decimals: 0,
            suffix: ' hrs',
            badge: '86% Admin Reduction',
            badgeColor: 'bg-lime-100 text-lime-800 dark:bg-lime-950/80 dark:text-lime-300 border-lime-300 dark:border-lime-800',
            icon: Clock,
            iconBg: 'bg-lime-100 dark:bg-lime-900/40 text-lime-700 dark:text-lime-400',
            iconColor: 'text-lime-600 dark:text-lime-400',
            description: 'Enterprise-grade automation saving over 28 full-time equivalent years of tedious admin labor.',
            traditionalState: '68,000+ hours spent annually across enterprise business divisions',
            nextsoftState: '9,600 focused oversight hours with autonomous platform rules',
            howItWorks: [
              'Global organization chart with dynamic matrix reporting',
              'Enterprise shift scheduling with labor cost forecast modeling',
              'Enterprise-wide automated statutory filing reports'
            ]
          },
          {
            id: 'errors',
            title: 'Payroll Errors Reduced',
            targetValue: hasIntersected ? 99.8 : 0,
            decimals: 1,
            suffix: '%',
            badge: 'Enterprise Zero-Defect',
            badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800',
            icon: ShieldCheck,
            iconBg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400',
            iconColor: 'text-blue-600 dark:text-blue-400',
            description: 'Zero compliance slippage with automated multi-country regulatory tracking and tax engine.',
            traditionalState: 'Multi-jurisdiction tax penalties and manual reconciliation liabilities',
            nextsoftState: 'Zero statutory penalties with automated regulatory updates',
            howItWorks: [
              'Continuous regulatory rate updates pushed automatically',
              'SOC2 & ISO27001 certified payroll processing architecture',
              'Granular role-based access control and multi-approver governance'
            ]
          },
          {
            id: 'onboarding',
            title: 'Average Onboarding Time',
            targetValue: hasIntersected ? 1.2 : 0,
            decimals: 1,
            suffix: ' Days',
            badge: '92% Accelerated',
            badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
            icon: UserCheck,
            iconBg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400',
            iconColor: 'text-emerald-600 dark:text-emerald-400',
            description: 'Scalable automated candidate-to-employee journey without manual administrative bottlenecks.',
            traditionalState: '16 business days with high risk of document drop-off',
            nextsoftState: '1.2 business days with 98% positive candidate survey ratings',
            howItWorks: [
              'Automated background check integrations and status triggers',
              'Instant provisioning through SCIM and enterprise SSO directories',
              'Personalized onboarding paths customized by business department'
            ]
          },
          {
            id: 'cycle',
            title: 'Payroll Processing Speed',
            targetValue: hasIntersected ? 94 : 0,
            decimals: 0,
            suffix: '% Faster',
            badge: 'Under 2 Hours',
            badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-800',
            icon: Zap,
            iconBg: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400',
            iconColor: 'text-purple-600 dark:text-purple-400',
            description: 'Execute enterprise-wide payroll across thousands of employees in under two hours.',
            traditionalState: '7 business days across 4 specialized payroll specialists',
            nextsoftState: '1 hour 45 mins with automated pre-validation workflows',
            howItWorks: [
              'Parallel calculation pipeline supporting tens of thousands of records',
              'Instant discrepancy warnings highlighting abnormal spikes or drops',
              'Automated compliance reports generated in seconds for CFO review'
            ]
          }
        ];

      case 'global':
      default:
        return [
          {
            id: 'hours',
            title: 'Hours Saved Annually',
            targetValue: hasIntersected ? 3420000 : 0,
            decimals: 0,
            prefix: '',
            suffix: '+ hrs',
            badge: 'Cumulative Client Impact',
            badgeColor: 'bg-lime-100 text-lime-800 dark:bg-lime-950/80 dark:text-lime-300 border-lime-300 dark:border-lime-800',
            icon: Clock,
            iconBg: 'bg-lime-100 dark:bg-lime-900/40 text-lime-700 dark:text-lime-400',
            iconColor: 'text-lime-600 dark:text-lime-400',
            description: 'Total manual administrative and payroll processing hours eliminated for client teams globally.',
            traditionalState: '3.9M+ collective operational hours consumed by paper & spreadsheets',
            nextsoftState: '3.42M+ hours saved and redirected to core business growth',
            howItWorks: [
              'Automated self-service employee requests without HR intermediary delays',
              'Single source of truth eliminates duplicate data entry across disparate tools',
              'Continuous real-time synchronization between attendance and payroll records'
            ]
          },
          {
            id: 'errors',
            title: 'Payroll Errors Reduced',
            targetValue: hasIntersected ? 99.4 : 0,
            decimals: 1,
            suffix: '%',
            badge: 'Audited Global Precision',
            badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800',
            icon: ShieldCheck,
            iconBg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400',
            iconColor: 'text-blue-600 dark:text-blue-400',
            description: 'Drastic reduction in calculation anomalies, missed tax deductions, and off-cycle retro corrections.',
            traditionalState: 'Industry standard 3.8% manual payroll discrepancy frequency',
            nextsoftState: 'Reduced to less than 0.02% error rate across client deployments',
            howItWorks: [
              'Rule-driven gross-to-net tax engines with automated statutory table updates',
              'Systematic pre-flight audit checklist catches missing data before disbursement',
              'Immutable audit log tracking every deduction, bonus, and adjustment'
            ]
          },
          {
            id: 'onboarding',
            title: 'Average Onboarding Time',
            targetValue: hasIntersected ? 1.8 : 0,
            decimals: 1,
            suffix: ' Days',
            badge: '88% Faster Globally',
            badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
            icon: UserCheck,
            iconBg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400',
            iconColor: 'text-emerald-600 dark:text-emerald-400',
            description: 'Average new employee onboarding cycle time across all customer deployments worldwide.',
            traditionalState: 'Global average of 14.2 business days for complete onboarding',
            nextsoftState: 'Cut to 1.8 business days with digital self-service onboarding',
            howItWorks: [
              'Digital document packets dispatched automatically upon contract signature',
              'Mobile ID verification, tax declaration, and bank account self-enrollment',
              'Automated departmental task assignment with escalation reminders'
            ]
          },
          {
            id: 'cycle',
            title: 'Payroll Processing Speed',
            targetValue: hasIntersected ? 92 : 0,
            decimals: 0,
            suffix: '% Faster',
            badge: 'Global Median Gain',
            badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-800',
            icon: Zap,
            iconBg: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400',
            iconColor: 'text-purple-600 dark:text-purple-400',
            description: 'Overall speedup in end-to-end payroll processing cycles from timesheet cut-off to final disbursement.',
            traditionalState: 'Median 4.2 days spent collating and approving payroll per cycle',
            nextsoftState: 'Median 50 minutes to verify and execute multi-branch payroll runs',
            howItWorks: [
              'Real-time biometric & geofenced timesheet reconciliation',
              'Pre-configured statutory tax calculations for 14+ jurisdictions',
              '1-click electronic bank transfer file generation & payslip release'
            ]
          }
        ];
    }
  }, [scale, hasIntersected]);

  return (
    <div ref={sectionRef} className="mb-24 scroll-mt-24" id="global-impact">
      {/* Header Container */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3 shadow-xs">
          <Globe2 className="w-4 h-4 text-lime-600 dark:text-lime-400" />
          <span>PROVEN MEASURABLE VALUE PROPOSITION</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Global Impact & Projected Efficiency.
        </h2>

        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
          Realized operational gains and projected benchmark metrics across businesses powered by NextSofthr worldwide.
        </p>

        {/* Projection Scale Switcher */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="inline-flex p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 text-xs font-semibold shadow-inner max-w-full overflow-x-auto">
            <button
              id="projection-scale-global"
              onClick={() => handleScaleChange('global')}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                scale === 'global'
                  ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              All Clients Aggregate
            </button>
            <button
              id="projection-scale-100"
              onClick={() => handleScaleChange('team100')}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                scale === 'team100'
                  ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Per 100 Employees
            </button>
            <button
              id="projection-scale-500"
              onClick={() => handleScaleChange('team500')}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                scale === 'team500'
                  ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Per 500 Employees
            </button>
            <button
              id="projection-scale-2000"
              onClick={() => handleScaleChange('team2000')}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                scale === 'team2000'
                  ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Per 2,000 Employees
            </button>
          </div>

          <button
            id="replay-counter-animation-btn"
            onClick={handleReplay}
            title="Replay animated counters"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Replay Counters</span>
          </button>
        </div>
      </div>

      {/* Main Animated Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isExpanded = expandedMetric === metric.id;

          return (
            <div
              key={metric.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-2xl group-hover:bg-lime-400/15 transition-all pointer-events-none" />

              <div>
                {/* Header Row: Icon + Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${metric.iconBg} shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${metric.badgeColor}`}>
                    {metric.badge}
                  </span>
                </div>

                {/* Metric Label */}
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {metric.title}
                </h3>

                {/* Big Animated Counter Display */}
                <div className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight my-2 flex items-baseline gap-1">
                  <AnimatedNumber
                    value={metric.targetValue}
                    decimals={metric.decimals}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    triggerKey={animationKey}
                  />
                </div>

                {/* Supporting description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {metric.description}
                </p>

                {/* Before vs After Micro-Visualizer */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-2 text-[11px] mb-4">
                  <div className="flex items-start gap-1.5 text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-rose-500 shrink-0">Before:</span>
                    <span className="line-through decoration-rose-400/60 leading-tight">
                      {metric.traditionalState}
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-900 dark:text-slate-200 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0 mt-0.5" />
                    <span className="leading-tight text-blue-900 dark:text-blue-300 font-bold">
                      {metric.nextsoftState}
                    </span>
                  </div>
                </div>

                {/* Expandable "How It Works" Details */}
                {isExpanded && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 mb-4 animate-fadeIn">
                    <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                      <span>How NextSofthr Achieves This:</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                      {metric.howItWorks.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Action: Toggle Details */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  id={`toggle-metric-details-${metric.id}`}
                  onClick={() => toggleExpand(metric.id)}
                  className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  <span>{isExpanded ? 'Hide Methodology' : 'View Methodology'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  Verified Telemetry
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cross-Platform Value Proposition Banner */}
      <div className="mt-10 max-w-5xl mx-auto bg-gradient-to-r from-blue-900 via-blue-850 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-blue-800/80 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30 text-xs font-bold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>PROJECTED RETURN ON INVESTMENT</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-display font-extrabold text-white">
            Estimate Your Exact Dollar Savings in Seconds
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Every business is unique. Use our interactive HR Savings Calculator below to compute annual labor hours, dollar savings, and software consolidation ROI tailored to your exact headcount.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          {onScrollToCalculator ? (
            <button
              id="scroll-to-calculator-cta"
              onClick={onScrollToCalculator}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5"
            >
              <span>Launch Savings Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <a
              href="#calculator"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5"
            >
              <span>Launch Savings Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          )}

          {onOpenDemo && (
            <button
              id="global-impact-book-demo-cta"
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Schedule Live Demo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
