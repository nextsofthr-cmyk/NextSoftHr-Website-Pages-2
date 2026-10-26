import React, { useState } from 'react';
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
  Briefcase
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export interface OutsourcingPricingRow {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
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
    subtitle:
      'Outsources the administration, monitoring and coordination of employee attendance, working hours, shifts and staff schedules, without the payroll platform.',
    bestFor:
      'for companies with shift workers, multiple locations, variable working hours, overtime, absenteeism or frequent changes in staffing requirements.',
    monthlyActualNGN: 3500,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 42000,
    yearlyDiscountedNGN: 33600,
    keyInclusions: [
      'Capture daily clock-in and clock-out records.',
      'Monitor lateness, early departures and absenteeism.',
      'Reconcile biometric, card, mobile or timesheet records.',
      'Review missing punches and attendance exceptions.',
      'Calculate regular hours, overtime hours and attendance summaries.',
      'Maintain approved shift patterns and shift rotations.',
      'Track shift assignments, handovers and coverage.',
      'Monitor shift swaps, replacements and last-minute changes.',
      'Identify understaffed or overstaffed shifts.',
      'Track overtime, night shifts, rest periods and shift allowances.',
      'Prepare weekly, fortnightly or monthly rosters.',
      'Allocate employees based on skills, availability and location.',
      'Match staffing levels to forecast demand.',
      'Schedule leave, rest days, weekend and public-holiday coverage.',
      'Manage approved shift swaps and replacements.',
      'Check roster compliance against working-time rules.'
    ]
  },
  {
    id: 'payroll-only',
    name: 'Payroll Only',
    badge: 'Standard Choice',
    subtitle:
      'Precision payroll processing and statutory filings without administrative friction.',
    bestFor:
      'Businesses with internal HR that need dedicated payroll calculations and compliance accuracy.',
    monthlyActualNGN: 4000,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 48000,
    yearlyDiscountedNGN: 38400,
    keyInclusions: [
      'Complete monthly gross-to-net payroll processing',
      'Overtime, allowance & Bonus Calculations',
      'Statutory deduction filings (African Tax Compliance)',
      'Automated digital employee payslips & email dispatch',
      'Bank payment advice & multi-currency batch export',
      'Direct employee payroll queries support desk',
      'WhatsApp Support & In-App Ticket',
      'Manager/Employee Self Service Management',
      'Year-end tax reconciliations & P60/Form H1 equivalents',
      'AI Payroll Assistance',
      'Reports & Analytics',
      'Dedicated Payroll Administrator'
    ]
  },
  {
    id: 'hr-administration',
    name: 'HR Administration',
    subtitle:
      'Hands-on operational employee administration, leave, and documentation.',
    bestFor:
      'Companies seeking structured personnel files, contracts, and lifecycle coordination.',
    monthlyActualNGN: 5500,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 66000,
    yearlyDiscountedNGN: 52800,
    keyInclusions: [
      'Centralized employee personnel files & digital archiving',
      'End-to-end digital onboarding & off boarding workflows',
      'Leave policy configuration & balance tracking',
      'Time, attendance & shift recording administration',
      'Official HR letters (promotions, confirmations, visas)',
      'Quarterly HR headcount & attrition reporting',
      'Company Policy Administration',
      'Workforce Compliance Documentation',
      'Employee HR Request Processing',
      'Dedicated Employee Support Desk',
      'AI HR Assistance',
      'Reports & Analytics.'
    ]
  },
  {
    id: 'hr-payroll',
    name: 'HR + Payroll',
    badge: 'Most Popular',
    popular: true,
    subtitle:
      'Our flagship integrated workforce engine. One unified outsourcing partner. Mid-sized to growing enterprises wanting seamless HR data flows into payroll.',
    bestFor:
      'Mid-sized to growing enterprises wanting seamless HR data flows into payroll.',
    monthlyActualNGN: 9000,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 108000,
    yearlyDiscountedNGN: 86400,
    keyInclusions: [
      'Everything in Payroll Only + HR Administration',
      'Unified cloud Employee Self-Service (ESS) & Manager (MSS) portal',
      'Direct link from approved leaves/overtime to payroll line items',
      'NextSoftHr HR AI Copilot for employees and managers',
      'Dedicated HR Operations Account Specialist',
      'Standard SLA guarantee with 4-hour query response.'
    ]
  },
  {
    id: 'managed-hr-service',
    name: 'Managed HR Service',
    badge: 'Executive Pod',
    subtitle:
      'Your outsourced people department: dedicated HR team + advanced tech.',
    bestFor:
      'Organizations requiring strategic guidance, employee relations, and policy leadership.',
    monthlyActualNGN: 22000,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 264000,
    yearlyDiscountedNGN: 211200,
    keyInclusions: [
      'Dedicated Senior HR Business Partner & Payroll Lead',
      'Employee handbook & statutory policy drafting and regular reviews',
      'Performance review cycle orchestration & appraisal forms',
      'Employee disciplinary, grievances & mediation advisory',
      'Workforce planning and quarterly executive talent reviews',
      'Comprehensive monthly HR metrics & leadership presentations',
      'Employee Engagement and culture',
      'Recruitment Coordination',
      'Strategic HR Advisory & Policy Support',
      'HR Documentation & Templates',
      'HR Technology Administration',
      'Employee Relations Support',
      'Executive HR Reports & Analytics'
    ]
  },
  {
    id: 'employee-administration',
    name: 'Employee Administration',
    subtitle:
      'Consolidate fragmented personnel folders, physical contracts, and salary spreadsheets into a verified single source of truth managed and maintained.',
    bestFor:
      'businesses with many employees, multiple branches, frequent recruitment, high staff turnover, or limited internal HR capacity.',
    monthlyActualNGN: 4500,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 54000,
    yearlyDiscountedNGN: 43200,
    keyInclusions: [
      'Employee Records and Personnel Files',
      'Employee Letter & Document',
      'Manage Document Request',
      'Employee Onboarding and off boarding Administration',
      'Leave, Attendance and Employee Status Administration',
      'HR Data Entry and HRM Software Management',
      'Benefits and Employment Documentation',
      'HR Compliance Records and Reporting',
      'Manager/Employee Self Service',
      'Employee Change Management'
    ]
  },
  {
    id: 'enterprise-workforce',
    name: 'Enterprise Workforce',
    badge: 'Multi-Country',
    subtitle:
      'Bespoke multi-company, multi-country and currency workforce outsourcing for large scale groups.',
    bestFor:
      'Pan-African and multinational groups with complex branch hierarchies and holding companies.',
    monthlyActualNGN: 25000,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 300000,
    yearlyDiscountedNGN: 240000,
    keyInclusions: [
      'Workforce Onboarding and off boarding',
      'Deployment Coordination & Administration',
      'Time & Attendance Management',
      'Multi-entity parent-subsidiary workforce segregation',
      'Compliance Administration & Advisory',
      'Multi-country African statutory tax engines & foreign currency payouts',
      'Custom ERP integrations (SAP, Oracle, NetSuite, Workday, Sage, Dynamics)',
      'Custom biometric device integrations & enterprise SSO (SAML/Okta)',
      'Dedicated enterprise delivery pod (3 specialists + lead counsel)',
      'Custom SLA with 1-hour priority support & quarterly onsite',
      'Employee Help Desk & Support',
      'Workforce Reports & Analytics'
    ]
  },
  {
    id: 'recruitment-talent',
    name: 'Recruitment & Talent',
    badge: 'Request Quote',
    isCustomQuote: true,
    subtitle:
      'NextSoftHr acts as your dedicated talent acquisition engine. Combining human headhunters with intelligent ATS workflows and AI assistance.',
    bestFor:
      'organizations that need to attract, recruit, screen, assess, and hire qualified employees without maintaining a large internal recruitment team. It is particularly useful for businesses experiencing rapid growth, high staff turnover, skills shortages, or frequent recruitment needs.',
    monthlyActualNGN: 0,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 0,
    yearlyDiscountedNGN: 0,
    keyInclusions: [
      'Workforce planning & headcount modeling',
      'AI-assisted job description creation',
      'Proactive executive candidate sourcing',
      'Multi-channel job publishing across Africa',
      'Application management & ATS pipeline tracking',
      'Automated interview scheduling & calendar sync',
      'structured candidate screening & scoring',
      'Candidate communication & status updates',
      'Multi-tier hiring approvals workflow',
      'Offer letter management & compensation benchmarking',
      'Seamless transition to digital onboarding',
      'Recruitment analytics & time-to-hire reporting'
    ]
  },
  {
    id: 'custom-outsourcing',
    name: 'Custom Outsourcing',
    badge: 'Request Quote',
    isCustomQuote: true,
    subtitle:
      'Tailored multi-entity HR, payroll, custom API integrations, and SLA guarantees for large enterprises. Request Quote',
    bestFor:
      'Businesses with Unlimited employees & custom instances',
    recommended:
      '500+ employees / Multi-country operations',
    monthlyActualNGN: 0,
    monthlyDiscountedNGN: null,
    yearlyActualNGN: 0,
    yearlyDiscountedNGN: 0,
    keyInclusions: [
      'Unlimited scalability & custom architecture',
      'Enterprise multi-country payroll setup',
      'Custom role hierarchies & approvals',
      'Enterprise reporting & custom dashboards',
      'SSO (SAML 2.0 / Okta / Azure AD)',
      'Enterprise audit logs & compliance vault',
      'Dedicated Customer Success Manager',
      'Custom integration engineering & APIs',
      'Data migration assistance from legacy HRIS',
      'Custom SLA guarantees (99.95% uptime)',
      '24/7 Premium executive support line',
      'Custom ERP integrations (SAP, Oracle, NetSuite, Workday, Sage, Dynamics)',
      'Custom Reports & Analytics designs'
    ],
    enterpriseSupport: [
      'Dedicated account manager',
      'Custom onboarding & training',
      'SLA-backed support',
      'Custom integrations available',
      'Volume & multi-site discounts'
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
  const [headcount, setHeadcount] = useState<number>(1);
  const [isCustomHeadcount, setIsCustomHeadcount] = useState<boolean>(false);

  const headcountPresets = [1, 25, 50, 100, 250, 500];

  const handleHeadcountChange = (val: number) => {
    const sanitized = Math.max(1, Math.min(10000, val || 1));
    setHeadcount(sanitized);
  };

  const handleAction = (planName: string, cycle: 'Monthly' | 'Yearly') => {
    if (onSelectPlan) {
      onSelectPlan(planName, cycle, headcount);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Headcount Estimator Strip */}
      <div className="bg-white dark:bg-[#0C1938] rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-lime-400 border border-blue-200/60 dark:border-blue-900/60 flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Workforce Headcount Calculator</span>
              <span className="text-[11px] font-medium text-blue-600 dark:text-lime-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200/50 dark:border-blue-800/40">
                Live Estimates
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select or type your active team size to view total calculated monthly and yearly billing across all plans.
            </p>
          </div>
        </div>

        {/* Headcount selector buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
            {headcountPresets.map((count) => (
              <button
                key={count}
                onClick={() => {
                  setHeadcount(count);
                  setIsCustomHeadcount(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  headcount === count && !isCustomHeadcount
                    ? 'bg-[#0265DC] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {count === 1 ? '1 (Per Emp)' : `${count} emps`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 pl-2">
            <input
              type="number"
              min={1}
              max={10000}
              value={headcount}
              onChange={(e) => {
                setIsCustomHeadcount(true);
                handleHeadcountChange(parseInt(e.target.value, 10));
              }}
              placeholder="Custom"
              className="w-20 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071127] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0265DC] text-center"
            />
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">staff</span>
          </div>
        </div>
      </div>

      {/* Main Pricing Table */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A162D] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1020px]">
            {/* Table Header: 2-Tier Row Header */}
            <thead>
              {/* Tier 1 Header */}
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-[#071022]">
                <th 
                  rowSpan={2}
                  scope="col" 
                  className="py-4 px-6 sm:px-8 text-xs font-black tracking-wider uppercase text-slate-800 dark:text-slate-200 w-[42%] text-left border-r border-slate-200/80 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600 dark:text-lime-400" />
                    <span>Description</span>
                  </div>
                </th>
                <th 
                  colSpan={2}
                  scope="col" 
                  className="py-3 px-4 text-center text-xs font-black tracking-wider uppercase text-blue-700 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30 border-r border-slate-200/80 dark:border-slate-800"
                >
                  <span>Employ/Monthly ({currency.symbol})</span>
                </th>
                <th 
                  colSpan={2}
                  scope="col" 
                  className="py-3 px-4 text-center text-xs font-black tracking-wider uppercase text-lime-700 dark:text-lime-400 bg-lime-50/50 dark:bg-lime-950/30"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-lime-500" />
                    <span>Employ/Yearly ({currency.symbol})</span>
                  </div>
                </th>
              </tr>

              {/* Tier 2 Subheaders */}
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050C1B] text-[11px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {/* Subheaders for Employ/Monthly */}
                <th scope="col" className="py-2.5 px-4 text-center border-r border-slate-200/60 dark:border-slate-800/80 bg-blue-50/20 dark:bg-blue-950/20 w-[14%]">
                  Actual Price
                </th>
                <th scope="col" className="py-2.5 px-4 text-center border-r border-slate-200/80 dark:border-slate-800 bg-blue-50/30 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 w-[15%]">
                  Discounted 0%
                </th>

                {/* Subheaders for Employ/Yearly */}
                <th scope="col" className="py-2.5 px-4 text-center border-r border-slate-200/60 dark:border-slate-800/80 bg-lime-50/20 dark:bg-lime-950/20 w-[14%]">
                  Actual Price
                </th>
                <th scope="col" className="py-2.5 px-4 text-center bg-lime-50/30 dark:bg-lime-950/30 text-lime-700 dark:text-lime-300 w-[15%]">
                  Discounted 20%
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
              {OUTSOURCING_TABLE_ROWS.map((row) => {
                const isCustom = row.isCustomQuote;
                const monthlyActual = row.monthlyActualNGN;
                const monthlyDiscounted = row.monthlyDiscountedNGN;
                const yearlyActual = row.yearlyActualNGN;
                const yearlyDiscounted = row.yearlyDiscountedNGN;

                const totalMonthlyActual = monthlyActual * headcount;
                const totalMonthlyDiscounted = monthlyDiscounted !== null ? monthlyDiscounted * headcount : null;
                const totalYearlyActual = yearlyActual * headcount;
                const totalYearlyDiscounted = yearlyDiscounted * headcount;

                const annualSavingsPercent = isCustom || !yearlyActual
                  ? 0 
                  : Math.round(((yearlyActual - yearlyDiscounted) / yearlyActual) * 100);

                return (
                  <tr 
                    key={row.id}
                    className={`transition-colors duration-150 hover:bg-slate-50/70 dark:hover:bg-[#0E1E3F]/40 ${
                      row.popular ? 'bg-blue-50/20 dark:bg-blue-950/10' : ''
                    }`}
                  >
                    {/* 1. Description Column */}
                    <td className="py-7 px-6 sm:px-8 align-top border-r border-slate-200/60 dark:border-slate-800/80">
                      <div className="space-y-4">
                        {/* Title & Badge */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            {row.name}
                          </h3>
                          {row.badge && (
                            <span className="px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#A3E635] text-slate-950 border border-lime-500 shadow-xs">
                              {row.badge}
                            </span>
                          )}
                        </div>

                        {/* Summary / Subtitle */}
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                          {row.subtitle}
                        </p>

                        {/* Best For Box */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#081533] border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          <span className="font-bold text-slate-900 dark:text-white">Best for: </span>
                          <span>{row.bestFor}</span>
                          {row.recommended && (
                            <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60 text-blue-700 dark:text-lime-400 font-semibold">
                              <span>Recommended: </span>
                              <span>{row.recommended}</span>
                            </div>
                          )}
                        </div>

                        {/* KEY INCLUSIONS */}
                        <div className="pt-2">
                          <div className="text-[11px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-3.5 h-3.5 text-lime-500" />
                            <span>KEY INCLUSIONS:</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            {row.keyInclusions.map((inclusion, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-snug">
                                <div className="w-4 h-4 rounded-full bg-lime-100 dark:bg-lime-950/90 text-lime-700 dark:text-lime-400 flex items-center justify-center shrink-0 mt-0.5 border border-lime-300/80 dark:border-lime-900/60 shadow-2xs">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </div>
                                <span className="pt-0.5">{inclusion}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Optional Enterprise Support (for Custom Outsourcing) */}
                        {row.enterpriseSupport && (
                          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/70">
                            <div className="text-[11px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-500 dark:text-lime-400" />
                              <span>Enterprise Support:</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                              {row.enterpriseSupport.map((supportItem, sIdx) => (
                                <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-snug">
                                  <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950/90 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-300/80 dark:border-blue-900/60 shadow-2xs">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </div>
                                  <span className="pt-0.5">{supportItem}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* 2. Employ/Monthly -> Actual Price */}
                    <td className="py-7 px-4 align-middle text-center bg-blue-50/10 dark:bg-blue-950/5 border-r border-slate-200/60 dark:border-slate-800/80">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        {isCustom ? (
                          <div className="space-y-1">
                            <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-mono">
                              Request Quote
                            </span>
                            <span className="text-[10px] text-slate-400 block">Tiered Retainer</span>
                          </div>
                        ) : (
                          <>
                            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                              {formatCurrency(monthlyActual)}
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                              / emp / month
                            </span>
                            {headcount > 1 && (
                              <div className="mt-1 pt-1 border-t border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 font-mono">
                                Total: {formatCurrency(totalMonthlyActual)}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </td>

                    {/* 3. Employ/Monthly -> Discounted */}
                    <td className="py-7 px-4 align-middle text-center bg-blue-50/20 dark:bg-blue-950/15 border-r border-slate-200/80 dark:border-slate-800">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        {isCustom ? (
                          <div className="py-2">
                            <span className="text-sm sm:text-base font-black text-blue-700 dark:text-blue-300 font-mono">
                              Request Quote
                            </span>
                          </div>
                        ) : monthlyDiscounted !== null ? (
                          <>
                            <div>
                              <div className="text-xl sm:text-2xl font-black text-blue-700 dark:text-blue-300 font-mono tracking-tight">
                                {formatCurrency(monthlyDiscounted)}
                              </div>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                                / emp / month
                              </span>
                            </div>

                            {headcount > 1 && totalMonthlyDiscounted !== null && (
                              <div className="w-full p-1.5 rounded-lg bg-white dark:bg-[#071328] border border-blue-200/60 dark:border-blue-900/60 text-center text-[10px]">
                                <span className="font-extrabold text-blue-900 dark:text-blue-200 font-mono block">
                                  {formatCurrency(totalMonthlyDiscounted)} / mo
                                </span>
                              </div>
                            )}

                            <button
                              onClick={() => handleAction(row.name, 'Monthly')}
                              className="w-full py-2.5 px-3 rounded-xl font-bold text-xs bg-[#0265DC] hover:bg-[#004DB3] text-white shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>Select Monthly</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="py-1">
                              <div className="text-2xl sm:text-3xl font-black text-slate-400 dark:text-slate-500 font-mono tracking-widest">
                                —
                              </div>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium block mt-0.5">
                                No Monthly Discount
                              </span>
                            </div>

                            <button
                              onClick={() => handleAction(row.name, 'Monthly')}
                              className="w-full py-2.5 px-3 rounded-xl font-bold text-xs bg-[#0265DC] hover:bg-[#004DB3] text-white shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>Select Monthly</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>

                    {/* 4. Employ/Yearly -> Actual Price */}
                    <td className="py-7 px-4 align-middle text-center bg-lime-50/10 dark:bg-lime-950/5 border-r border-slate-200/60 dark:border-slate-800/80">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        {isCustom ? (
                          <div className="space-y-1">
                            <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-mono">
                              Request Quote
                            </span>
                            <span className="text-[10px] text-slate-400 block">Annual Agreement</span>
                          </div>
                        ) : (
                          <>
                            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                              {formatCurrency(yearlyActual)}
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                              / emp / year
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              (12 × Monthly)
                            </span>
                            {headcount > 1 && (
                              <div className="mt-1 pt-1 border-t border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 font-mono">
                                Total: {formatCurrency(totalYearlyActual)}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </td>

                    {/* 5. Employ/Yearly -> Discounted */}
                    <td className="py-7 px-4 align-middle text-center bg-lime-50/20 dark:bg-lime-950/15">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        {isCustom ? (
                          <div className="py-2">
                            <span className="text-sm sm:text-base font-black text-slate-900 dark:text-lime-300 font-mono">
                              Request Quote
                            </span>
                          </div>
                        ) : (
                          <>
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-lime-400 text-slate-950 border border-lime-500 shadow-2xs">
                              <Sparkles className="w-2.5 h-2.5 text-slate-950" />
                              <span>Save ~{annualSavingsPercent}%</span>
                            </div>

                            <div>
                              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-lime-300 font-mono tracking-tight">
                                {formatCurrency(yearlyDiscounted)}
                              </div>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                                / emp / year
                              </span>
                              <span className="text-[10px] font-semibold text-emerald-600 dark:text-lime-400 mt-0.5 block">
                                ≈ {formatCurrency(Math.round(yearlyDiscounted / 12))} / mo / emp
                              </span>
                            </div>

                            {headcount > 1 && (
                              <div className="w-full p-1.5 rounded-lg bg-white dark:bg-[#071328] border border-lime-300/60 dark:border-lime-900/60 text-center text-[10px]">
                                <span className="font-extrabold text-slate-900 dark:text-lime-300 font-mono block">
                                  {formatCurrency(totalYearlyDiscounted)} / yr
                                </span>
                              </div>
                            )}

                            <button
                              onClick={() => handleAction(row.name, 'Yearly')}
                              className="w-full py-2.5 px-3 rounded-xl font-bold text-xs bg-[#84CC16] hover:bg-[#65A30D] text-slate-950 shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>Select Yearly</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SLA & Support Footer Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-6 bg-slate-50/90 dark:bg-[#071124] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-lime-100 dark:bg-lime-950/80 text-lime-700 dark:text-lime-400 flex items-center justify-center shrink-0 border border-lime-300/80 dark:border-lime-900/60">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                24/7 dedicated support engineer & 99.99% Uptime SLA
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                100% Tax & Regulatory Compliance guarantee across all African and global entities.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onOpenDemo && (
              <button
                onClick={onOpenDemo}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
              >
                Explore Live Demo
              </button>
            )}
            <button
              onClick={() => handleAction('Custom Outsourcing Scope', 'Monthly')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0265DC] hover:bg-[#004DB3] text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Request Custom Proposal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
