import React, { useState, useMemo } from 'react';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Headphones, 
  Clock, 
  Users, 
  Calculator, 
  FileText, 
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  PhoneCall,
  Briefcase,
  Zap,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { CardSlider } from '../common/CardSlider';

export interface OutsourcingPricingRow {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  category: 'core' | 'integrated' | 'enterprise';
  subtitle: string;
  bestFor: string;
  recommended?: string;
  isCustomQuote?: boolean;
  monthlyActualNGN: number;
  monthlyDiscountedNGN: number | null;
  yearlyActualNGN: number;
  yearlyDiscountedNGN: number;
  keyInclusions: string[];
  enterpriseSupport?: string[];
}

export const OUTSOURCING_TABLE_ROWS: OutsourcingPricingRow[] = [
  {
    id: 'attendance-shift-roster',
    name: 'Attendance, Shift & Roster',
    category: 'core',
    badge: 'Shift Operations',
    subtitle:
      'Outsources the administration, monitoring and coordination of employee attendance, working hours, shifts and staff schedules.',
    bestFor:
      'Companies with shift workers, multiple branch locations, variable working hours, and overtime monitoring.',
    monthlyActualNGN: 3500,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 42000,
    yearlyDiscountedNGN: 33600,
    keyInclusions: [
      'Capture daily clock-in & clock-out records',
      'Monitor lateness, early departures & absenteeism',
      'Reconcile biometric, mobile GPS & timesheet punches',
      'Review missing punches & attendance exceptions',
      'Calculate regular & overtime hours automatically',
      'Maintain approved shift patterns & roster rotations',
      'Track shift assignments, handovers & emergency coverage',
      'Manage approved peer-to-peer shift swaps'
    ]
  },
  {
    id: 'payroll-only',
    name: 'Payroll Only',
    category: 'core',
    badge: 'Standard Choice',
    subtitle:
      'Precision payroll processing, African statutory tax filings, bank disbursement schedules, and employee payslips.',
    bestFor:
      'Businesses with internal HR that need dedicated payroll calculations, tax remittances, and bank disbursement accuracy.',
    monthlyActualNGN: 4000,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 48000,
    yearlyDiscountedNGN: 38400,
    keyInclusions: [
      'Complete monthly gross-to-net payroll processing',
      'Statutory deduction filings (PAYE, Pension, NHF, NSITF, ITF)',
      'Automated digital employee payslips & email dispatch',
      'Bank payment advice & multi-currency batch export',
      'Direct employee payroll queries support desk',
      'Manager & Employee Self-Service (ESS/MSS) access',
      'Year-end tax reconciliations & Form H1/P60 equivalents',
      'Dedicated NextSofthr Payroll Administrator'
    ]
  },
  {
    id: 'employee-administration',
    name: 'Employee Administration',
    category: 'core',
    badge: 'Records & Personnel',
    subtitle:
      'Consolidate fragmented personnel folders, physical contracts, and salary spreadsheets into a verified single source of truth.',
    bestFor:
      'Businesses with growing headcounts, multiple branches, high staff turnover, or limited internal HR administrative capacity.',
    monthlyActualNGN: 4500,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 54000,
    yearlyDiscountedNGN: 43200,
    keyInclusions: [
      'Digital employee personnel files & audit archiving',
      'Official employment letter & contract drafting',
      'Document request tracking (visas, embassy, verification)',
      'Digital onboarding & offboarding workflows',
      'Leave, attendance & employee lifecycle administration',
      'HR software data entry & employee change management',
      'Employee benefits & workforce compliance logging'
    ]
  },
  {
    id: 'hr-administration',
    name: 'HR Administration',
    category: 'integrated',
    badge: 'Operational HR',
    subtitle:
      'Hands-on operational employee administration, leave tracking, document lifecycle, and regulatory workforce records.',
    bestFor:
      'Companies seeking structured personnel files, formalized HR policies, and dedicated operational support.',
    monthlyActualNGN: 5500,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 66000,
    yearlyDiscountedNGN: 52800,
    keyInclusions: [
      'Centralized employee personnel archives & digital storage',
      'End-to-end digital onboarding & offboarding workflows',
      'Company policy administration & compliance records',
      'Time, attendance & shift recording administration',
      'Official HR letters (promotions, confirmations, visas)',
      'Quarterly HR headcount & attrition analytics',
      'Dedicated employee HR request processing desk'
    ]
  },
  {
    id: 'hr-payroll',
    name: 'HR + Payroll',
    category: 'integrated',
    badge: 'Most Popular',
    popular: true,
    subtitle:
      'Our flagship integrated workforce engine. One unified outsourcing partner with direct synchronization from leave to payroll.',
    bestFor:
      'Mid-sized to growing enterprises wanting seamless HR data flows into payroll with zero manual reconciliation.',
    monthlyActualNGN: 9000,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 108000,
    yearlyDiscountedNGN: 86400,
    keyInclusions: [
      'Everything in Payroll Only + HR Administration',
      'Unified cloud Employee Self-Service & Manager portal',
      'Direct link from approved leaves/overtime to payroll line items',
      'NextSofthr AI HR Copilot for employees and managers',
      'Dedicated HR Operations Account Specialist',
      'Standard SLA guarantee with 4-hour query response',
      'Bank disbursement advice & localized statutory tax files'
    ]
  },
  {
    id: 'managed-hr-service',
    name: 'Managed HR Service',
    category: 'integrated',
    badge: 'Executive Pod',
    subtitle:
      'Your full outsourced people department: dedicated senior HRBP team, payroll lead, and strategic workforce advisory.',
    bestFor:
      'Organizations requiring strategic talent guidance, employee relations leadership, and complete HR oversight.',
    monthlyActualNGN: 22000,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 264000,
    yearlyDiscountedNGN: 211200,
    keyInclusions: [
      'Dedicated Senior HR Business Partner & Payroll Lead',
      'Employee handbook & statutory policy drafting & reviews',
      'Performance review cycle orchestration & appraisal forms',
      'Employee disciplinary, grievances & mediation advisory',
      'Workforce planning & quarterly executive talent reviews',
      'Strategic HR Advisory & employee relations support',
      'Executive HR leadership presentations & board analytics'
    ]
  },
  {
    id: 'enterprise-workforce',
    name: 'Enterprise Workforce',
    category: 'enterprise',
    badge: 'Multi-Country Scale',
    subtitle:
      'Bespoke multi-company, multi-country and foreign currency workforce outsourcing for large pan-African corporate groups.',
    bestFor:
      'Pan-African and multinational groups with complex branch hierarchies, subsidiaries, and holding companies.',
    monthlyActualNGN: 25000,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 300000,
    yearlyDiscountedNGN: 240000,
    keyInclusions: [
      'Multi-entity parent-subsidiary workforce segregation',
      'Multi-country African statutory tax engines & FX payouts',
      'Custom ERP integrations (SAP, Oracle, NetSuite, Workday, Sage)',
      'Custom biometric device integrations & enterprise SSO (Okta/SAML)',
      'Dedicated enterprise delivery pod (3 specialists + lead counsel)',
      'Custom SLA with 1-hour priority support & quarterly onsite',
      'Employee Help Desk & Workforce Analytics'
    ]
  },
  {
    id: 'recruitment-talent',
    name: 'Recruitment & Talent',
    category: 'enterprise',
    badge: 'Talent Acquisition',
    isCustomQuote: true,
    subtitle:
      'Dedicated talent acquisition engine combining human headhunters with intelligent ATS workflows and AI assistance.',
    bestFor:
      'Organizations scaling rapidly, hiring across multiple African corridors, or needing executive talent placement.',
    monthlyActualNGN: 0,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 0,
    yearlyDiscountedNGN: 0,
    keyInclusions: [
      'Workforce planning & headcount modeling',
      'AI-assisted job description creation & role scoring',
      'Proactive executive candidate headhunting across Africa',
      'Multi-channel job publishing & ATS pipeline tracking',
      'Structured interview scheduling & candidate assessments',
      'Multi-tier hiring approvals & offer letter management',
      'Seamless transition into digital employee onboarding'
    ]
  },
  {
    id: 'custom-outsourcing',
    name: 'Custom Outsourcing',
    category: 'enterprise',
    badge: 'Bespoke Retainer',
    isCustomQuote: true,
    subtitle:
      'Tailored multi-entity HR, payroll, custom API integrations, dedicated legal counsel, and custom SLA guarantees.',
    bestFor:
      'Enterprises with 250+ to 10,000+ employees requiring custom operating pods and dedicated compliance oversight.',
    recommended: '250+ employees / Multi-country operations',
    monthlyActualNGN: 0,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 0,
    yearlyDiscountedNGN: 0,
    keyInclusions: [
      'Unlimited scalability & custom architecture',
      'Enterprise multi-country payroll setup',
      'Custom role hierarchies & approvals',
      'Dedicated Customer Success Manager & delivery pod',
      'Custom SLA guarantees (99.95% uptime)',
      '24/7 Premium executive support line',
      'Data migration assistance from legacy HRIS'
    ],
    enterpriseSupport: [
      'Dedicated account manager',
      'Custom onboarding & staff training',
      'SLA-backed accuracy guarantee',
      'Volume & multi-site tier discounts'
    ]
  }
];

interface OutsourcingPricingTableProps {
  onSelectPlan?: (planName: string, billingCycle: 'Monthly' | 'Yearly', estimatedEmployees?: number) => void;
  onOpenDemo?: () => void;
}

export const OutsourcingPricingTable: React.FC<OutsourcingPricingTableProps> = ({
  onSelectPlan,
  onOpenDemo
}) => {
  const { formatCurrency, currency } = useCurrency();
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [headcount, setHeadcount] = useState<number>(25);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'core' | 'integrated' | 'enterprise'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const headcountPresets = [10, 25, 50, 100, 250, 500];

  const handleAction = (planName: string) => {
    if (onSelectPlan) {
      onSelectPlan(planName, billingCycle, headcount);
    }
  };

  const filteredRows = useMemo(() => {
    if (selectedCategory === 'all') return OUTSOURCING_TABLE_ROWS;
    return OUTSOURCING_TABLE_ROWS.filter((r) => r.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div id="outsourcing-pricing-section" className="space-y-8">
      
      {/* 1. Header & Value Proposition */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[#0265DC] dark:text-[#A3E635] text-xs font-extrabold uppercase tracking-widest border border-blue-100 dark:border-blue-900">
          <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
          <span>Choose Your NextSofthr Plan</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] dark:text-white tracking-tight">
          Choose Your Outsourcing Plan
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Transparent per-employee monthly retainers tailored for African operations. All plans include dedicated specialist support, statutory compliance accuracy, and cloud self-service access.
        </p>
      </div>

      {/* 2. Interactive Controls Toolbar: Billing Toggle, Headcount Slider, Category Filter & View Mode */}
      <div className="bg-slate-50 dark:bg-[#071329] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
        
        {/* Row A: Billing Cycle Toggle & View Mode */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-5 border-b border-slate-200/70 dark:border-slate-800">
          
          {/* Billing Cycle Pill Buttons */}
          <div className="flex items-center bg-white dark:bg-[#0B1528] rounded-2xl p-1.5 border border-slate-200 dark:border-slate-700 shadow-xs">
            <button
              type="button"
              onClick={() => setBillingCycle('Monthly')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                billingCycle === 'Monthly'
                  ? 'bg-[#0265DC] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly Billing
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle('Yearly')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                billingCycle === 'Yearly'
                  ? 'bg-[#A3E635] text-slate-950 shadow-sm ring-1 ring-lime-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full transition-all ${
                billingCycle === 'Yearly'
                  ? 'bg-slate-950 text-[#A3E635]'
                  : 'bg-lime-100 dark:bg-lime-950 text-lime-800 dark:text-[#A3E635]'
              }`}>
                SAVE 20%
              </span>
            </button>
          </div>

          {/* View Mode Toggle: Cards View vs Comparison Table */}
          <div className="flex items-center gap-2 bg-white dark:bg-[#0B1528] p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards View</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Matrix Table</span>
            </button>
          </div>

        </div>

        {/* Row B: Employee Headcount Interactive Calculator */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-[#0265DC] dark:text-blue-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Calculate for Your Headcount:</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Preview total monthly investment for your team size</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mr-1">Presets:</span>
            {headcountPresets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setHeadcount(preset)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  headcount === preset
                    ? 'bg-[#0265DC] text-white shadow-xs'
                    : 'bg-white dark:bg-[#0B1528] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {preset} staff
              </button>
            ))}

            <div className="flex items-center gap-1.5 pl-2">
              <input
                type="number"
                min={1}
                max={50000}
                value={headcount}
                onChange={(e) => setHeadcount(Math.max(1, parseInt(e.target.value) || 1))}
                aria-label="Staff headcount"
                className="w-18 px-2.5 py-1 text-xs font-black text-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1528] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
              />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">employees</span>
            </div>
          </div>
        </div>

        {/* Row C: Scope Category Filter Pills */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Filter Scope:
          </span>

          {[
            { id: 'all', label: 'All Packages (9)' },
            { id: 'core', label: 'Core Payroll & Shift Roster' },
            { id: 'integrated', label: 'Integrated HR & People Pod' },
            { id: 'enterprise', label: 'Enterprise & Multi-Country' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#0B1528] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* 3. CARDS VIEW (Default — Exactly like Choose Your NextSofthr Plan) */}
      {viewMode === 'cards' && (
        <div className="mt-4">
          <CardSlider
            id="outsourcing-plans-cards-slider"
            ariaLabel="NextSofthr outsourcing pricing cards"
            items={filteredRows}
            perView={{ base: 1, md: 2, lg: 3, xl: 3 }}
            stepMode="item"
            gap={24}
            showSideArrows={false}
            renderItem={(row) => {
              const isCustom = row.isCustomQuote;
              const isYearly = billingCycle === 'Yearly';

              // Per-employee price computation
              const monthlyEffectiveNGN = isYearly ? row.yearlyDiscountedNGN / 12 : row.monthlyActualNGN;
              const formattedPerEmp = isCustom ? 'Custom Quote' : formatCurrency(monthlyEffectiveNGN);

              // Total computation for user's active headcount
              const totalMonthlyNGN = monthlyEffectiveNGN * headcount;
              const formattedTotalMonthly = formatCurrency(totalMonthlyNGN);

              return (
                <div
                  id={`outsourcing-card-${row.id}`}
                  className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between flex-1 self-stretch h-full w-full min-h-[860px] sm:min-h-[870px] lg:min-h-[880px] p-6 sm:p-7 ${
                    row.popular
                      ? 'bg-white dark:bg-[#111C38] border-2 border-[#0265DC] shadow-xl shadow-blue-500/10 dark:shadow-blue-950/40 z-10 ring-4 ring-blue-500/5 dark:ring-blue-500/20'
                      : 'bg-white/95 dark:bg-[#0D162C] border-2 border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Floating Most Popular Badge */}
                  {row.popular && (
                    <div
                      id="badge-most-popular-outsourcing"
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#A3E635] text-slate-950 text-xs font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1.5 border border-[#84CC16]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-slate-900 fill-slate-900" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  {/* Top Block: Title, Upgrade Badge, Tagline, Price Block */}
                  <div className="flex-1 flex flex-col">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-2 min-h-[60px] sm:min-h-[64px]">
                      <h3 className="font-display text-2xl font-bold text-[#0B132B] dark:text-white leading-tight">
                        {row.name}
                      </h3>
                      {row.badge && (
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                            row.popular
                              ? 'bg-blue-50 dark:bg-blue-950/80 text-[#0265DC] dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {row.badge}
                        </span>
                      )}
                    </div>

                    {/* Tagline / Subtitle */}
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 min-h-[44px] sm:min-h-[48px] leading-relaxed line-clamp-2">
                      {row.subtitle}
                    </p>

                    {/* Pricing Block */}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 min-h-[116px] flex flex-col justify-center">
                      <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
                        <span className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
                          {formattedPerEmp}
                        </span>
                        {!isCustom && (
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            / emp / month
                          </span>
                        )}
                      </div>

                      {/* Headcount Total Preview Pill */}
                      {!isCustom ? (
                        <div className="mt-2.5 flex items-center justify-between p-2 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 text-xs">
                          <span className="text-slate-600 dark:text-slate-300 font-medium">
                            Total for <strong className="text-slate-900 dark:text-white">{headcount} staff</strong>:
                          </span>
                          <span className="font-extrabold text-[#0265DC] dark:text-[#A3E635] font-mono">
                            {formattedTotalMonthly} / mo
                          </span>
                        </div>
                      ) : (
                        <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                          <Zap className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400 shrink-0" />
                          <span>Custom Scope & Volume Brackets</span>
                        </div>
                      )}

                      {/* Billing Notice */}
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center justify-between">
                        <span>
                          {isYearly && !isCustom ? '✓ Billed Annually (20% Savings applied)' : 'Monthly Pay-As-You-Grow'}
                        </span>
                        {currency.code !== 'NGN' && (
                          <span className="font-mono text-[10px] text-slate-400">
                            ({currency.code})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Best For Box */}
                    <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-[#081533] border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="font-bold text-slate-900 dark:text-white">Best for: </span>
                      <span className="line-clamp-2">{row.bestFor}</span>
                    </div>

                    {/* Feature / Inclusions List */}
                    <div className="mt-4 flex-1 flex flex-col">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                        Outsourcing Inclusions
                      </div>

                      <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-200 flex-1 flex flex-col justify-start min-h-[300px]">
                        {row.keyInclusions.slice(0, 6).map((item, idx) => {
                          const isLead = item.startsWith('Everything in');
                          return (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-snug">
                              <div
                                className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                                  row.popular
                                    ? 'bg-blue-100 dark:bg-blue-950 text-[#0265DC] dark:text-blue-400'
                                    : 'bg-lime-100 dark:bg-lime-950 text-[#65A30D] dark:text-[#A3E635]'
                                }`}
                              >
                                <Check className="w-3 h-3 stroke-[2.5]" />
                              </div>
                              <span className={isLead ? 'font-bold text-[#0265DC] dark:text-blue-400' : ''}>
                                {item}
                              </span>
                            </li>
                          );
                        })}

                        {row.keyInclusions.length > 6 && (
                          <li className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 pl-6 italic">
                            + {row.keyInclusions.length - 6} more specialized operational deliverables
                          </li>
                        )}

                        {row.enterpriseSupport && (
                          <li className="pt-2 text-xs font-extrabold uppercase tracking-wider text-[#0265DC] dark:text-blue-400 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 mt-auto">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400 shrink-0" />
                            <span>Enterprise SLA & Account Pod</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer: Action Buttons & Guarantee */}
                  <div className="mt-auto pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col justify-end">
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => handleAction(row.name)}
                        className="w-full h-11 px-4 rounded-xl text-sm font-bold bg-[#0265DC] hover:bg-[#004DB3] text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{isCustom ? 'Request Custom Proposal' : 'Select Outsourcing Plan'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {onOpenDemo && (
                        <button
                          type="button"
                          onClick={onOpenDemo}
                          className="w-full h-9 px-3 rounded-lg text-xs font-semibold text-[#0265DC] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-[#0265DC] dark:text-blue-400" />
                          <span>Talk to Outsourcing Specialist</span>
                        </button>
                      )}
                    </div>

                    <div className="mt-3 text-center text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                      100% Tax Filing Accuracy • 24/7 SLA Backed
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>
      )}

      {/* 4. COMPARISON MATRIX TABLE VIEW (Toggleable for deep feature inspection) */}
      {viewMode === 'table' && (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A162D] shadow-xl overflow-hidden mt-6">
          <div className="p-4 bg-slate-50 dark:bg-[#071125] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0265DC] dark:text-[#A3E635]" />
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Full Scope Comparison Matrix ({filteredRows.length} Plans)
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Calculated for {headcount} employees in {currency.code}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-[#050C1B] text-xs font-black uppercase text-slate-800 dark:text-slate-200">
                  <th scope="col" className="py-4 px-6 w-[40%]">Outsourcing Deliverable</th>
                  <th scope="col" className="py-4 px-4 text-center w-[20%]">Per Employee Rate</th>
                  <th scope="col" className="py-4 px-4 text-center w-[20%]">Team Total ({headcount} Staff)</th>
                  <th scope="col" className="py-4 px-6 text-center w-[20%]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredRows.map((row) => {
                  const isCustom = row.isCustomQuote;
                  const isYearly = billingCycle === 'Yearly';
                  const monthlyEffective = isYearly ? row.yearlyDiscountedNGN / 12 : row.monthlyActualNGN;
                  const totalMonthly = monthlyEffective * headcount;

                  return (
                    <tr 
                      key={row.id}
                      className={`hover:bg-slate-50/80 dark:hover:bg-[#0D1F42]/40 transition-colors ${
                        row.popular ? 'bg-blue-50/20 dark:bg-blue-950/20' : ''
                      }`}
                    >
                      <td className="py-5 px-6">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-slate-900 dark:text-white">
                              {row.name}
                            </span>
                            {row.badge && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A3E635] text-slate-950">
                                {row.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                            {row.subtitle}
                          </p>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            <strong>Best for:</strong> {row.bestFor}
                          </div>
                        </div>
                      </td>

                      <td className="py-5 px-4 text-center">
                        {isCustom ? (
                          <span className="font-bold text-xs text-slate-900 dark:text-white">Custom Retainer</span>
                        ) : (
                          <div>
                            <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
                              {formatCurrency(monthlyEffective)}
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">/ emp / mo</span>
                          </div>
                        )}
                      </td>

                      <td className="py-5 px-4 text-center">
                        {isCustom ? (
                          <span className="text-xs text-slate-400">Volume Brackets</span>
                        ) : (
                          <div>
                            <div className="text-base font-extrabold text-[#0265DC] dark:text-[#A3E635] font-mono">
                              {formatCurrency(totalMonthly)}
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">per month</span>
                          </div>
                        )}
                      </td>

                      <td className="py-5 px-6 text-center">
                        <button
                          type="button"
                          onClick={() => handleAction(row.name)}
                          className="py-2 px-4 rounded-xl text-xs font-bold bg-[#0265DC] hover:bg-[#004DB3] text-white shadow-xs transition-all cursor-pointer w-full"
                        >
                          {isCustom ? 'Request Quote' : 'Select Plan'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Bottom SLA Trust Strip */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#071329] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              100% African Statutory Tax Filing & Accuracy Guarantee
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Any regulatory discrepancy or penalty caused by our computation error is covered 100% by NextSofthr.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#A3E635]" />
            <span>99.99% Uptime SLA</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#A3E635]" />
            <span>24/7 Dedicated Support Pod</span>
          </span>
        </div>
      </div>

    </div>
  );
};
