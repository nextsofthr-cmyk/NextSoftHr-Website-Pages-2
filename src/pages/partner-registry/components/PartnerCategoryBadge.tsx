import React from 'react';
import {
  Layers,
  Users,
  Sparkles,
  Calculator,
  PieChart,
  Cpu,
  GitMerge,
  Code2,
  GraduationCap,
  UserPlus,
  TrendingUp,
  Store,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';

export interface CategoryConfig {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  iconColor: string;
  darkBadgeBg: string;
  darkBadgeText: string;
  darkBadgeBorder: string;
  darkIconColor: string;
  glowColor: string;
  accentHex: string;
  coreDeliverables: string[];
}

export const PARTNER_CATEGORIES: Record<string, CategoryConfig> = {
  'Implementation Partner': {
    id: 'implementation-partner',
    name: 'Implementation Partner',
    shortName: 'Implementation',
    tagline: 'End-to-End Enterprise Deployment Specialist',
    description: 'Certified in full-cycle NextSofthr tenant setup, multi-branch architecture, master data imports, and go-live deployment.',
    icon: Layers,
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-800',
    badgeBorder: 'border-emerald-200',
    iconColor: 'text-emerald-600',
    darkBadgeBg: 'dark:bg-emerald-950/50',
    darkBadgeText: 'dark:text-emerald-300',
    darkBadgeBorder: 'dark:border-emerald-800/80',
    darkIconColor: 'dark:text-emerald-400',
    glowColor: 'shadow-emerald-500/10',
    accentHex: '#10b981',
    coreDeliverables: ['Tenant Setup', 'Data Migration', 'Shift Configuration', 'Go-Live Audits']
  },
  'HR Consultant': {
    id: 'hr-consultant',
    name: 'HR Consultant',
    shortName: 'HR Advisory',
    tagline: 'Strategic Human Capital & Labor Policy Advisory',
    description: 'Specializes in statutory employment laws, organizational restructuring, appraisal matrices, and workforce policy governance.',
    icon: Users,
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-800',
    badgeBorder: 'border-blue-200',
    iconColor: 'text-blue-600',
    darkBadgeBg: 'dark:bg-blue-950/50',
    darkBadgeText: 'dark:text-blue-300',
    darkBadgeBorder: 'dark:border-blue-800/80',
    darkIconColor: 'dark:text-blue-400',
    glowColor: 'shadow-blue-500/10',
    accentHex: '#2563eb',
    coreDeliverables: ['Labor Compliance', 'Job Grading', 'Performance Systems', 'HR Handbooks']
  },
  'HR Technology Consultant': {
    id: 'hr-technology-consultant',
    name: 'HR Technology Consultant',
    shortName: 'HR Tech',
    tagline: 'Digital Workforce Systems & Automation Architect',
    description: 'Focuses on digital HR transformations, employee self-service adoption, mobile attendance workflows, and HR tech roadmaps.',
    icon: Sparkles,
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-800',
    badgeBorder: 'border-indigo-200',
    iconColor: 'text-indigo-600',
    darkBadgeBg: 'dark:bg-indigo-950/50',
    darkBadgeText: 'dark:text-indigo-300',
    darkBadgeBorder: 'dark:border-indigo-800/80',
    darkIconColor: 'dark:text-indigo-400',
    glowColor: 'shadow-indigo-500/10',
    accentHex: '#6366f1',
    coreDeliverables: ['Digital HR Audits', 'Mobile ESS Rollouts', 'Workflow Automation', 'Tech Stack Roadmaps']
  },
  'Payroll Specialist': {
    id: 'payroll-specialist',
    name: 'Payroll Specialist',
    shortName: 'Payroll Spec.',
    tagline: 'Statutory Tax, Remittance & Disbursal Specialist',
    description: 'Accredited in regional statutory tax formulas (PAYE, Pension, NSITF, NHF, KRA, SARS, TRA), multi-currency compensation, and automated banking files.',
    icon: Calculator,
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-800',
    badgeBorder: 'border-teal-200',
    iconColor: 'text-teal-600',
    darkBadgeBg: 'dark:bg-teal-950/50',
    darkBadgeText: 'dark:text-teal-300',
    darkBadgeBorder: 'dark:border-teal-800/80',
    darkIconColor: 'dark:text-teal-400',
    glowColor: 'shadow-teal-500/10',
    accentHex: '#0d9488',
    coreDeliverables: ['PAYE Calculations', 'Pension Remittances', 'Bank SIF Generation', 'Tax Audit Schedules']
  },
  'Payroll Consultant': {
    id: 'payroll-consultant',
    name: 'Payroll Consultant',
    shortName: 'Payroll Cons.',
    tagline: 'Enterprise Payroll Governance & Compliance Expert',
    description: 'Provides advisory on multi-country payroll structuring, expat wage equalization, shift overtime schemes, and payroll audit defense.',
    icon: Calculator,
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-800',
    badgeBorder: 'border-teal-200',
    iconColor: 'text-teal-600',
    darkBadgeBg: 'dark:bg-teal-950/50',
    darkBadgeText: 'dark:text-teal-300',
    darkBadgeBorder: 'dark:border-teal-800/80',
    darkIconColor: 'dark:text-teal-400',
    glowColor: 'shadow-teal-500/10',
    accentHex: '#0d9488',
    coreDeliverables: ['Multi-State Payroll', 'Expat Remuneration', 'Audit Defense', 'Statutory Structuring']
  },
  'Accounting Firm': {
    id: 'accounting-firm',
    name: 'Accounting Firm',
    shortName: 'Accounting',
    tagline: 'Certified Financial & General Ledger Synchronization Firm',
    description: 'Licensed certified public accountants ensuring NextSofthr payroll journals integrate cleanly into enterprise ERPs and accounting ledgers.',
    icon: PieChart,
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-850',
    badgeBorder: 'border-amber-200',
    iconColor: 'text-amber-600',
    darkBadgeBg: 'dark:bg-amber-950/50',
    darkBadgeText: 'dark:text-amber-300',
    darkBadgeBorder: 'dark:border-amber-800/80',
    darkIconColor: 'dark:text-amber-400',
    glowColor: 'shadow-amber-500/10',
    accentHex: '#d97706',
    coreDeliverables: ['General Ledger Sync', 'Statutory Audit Readiness', 'Cost Center Reporting', 'CFO Advisory']
  },
  'Accountant': {
    id: 'accountant',
    name: 'Accountant',
    shortName: 'Accounting',
    tagline: 'Financial & Payroll Journal Practitioner',
    description: 'Certified bookkeeping and payroll reconciliation practitioner aligning NextSofthr ledger items with local reporting standards.',
    icon: PieChart,
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-850',
    badgeBorder: 'border-amber-200',
    iconColor: 'text-amber-600',
    darkBadgeBg: 'dark:bg-amber-950/50',
    darkBadgeText: 'dark:text-amber-300',
    darkBadgeBorder: 'dark:border-amber-800/80',
    darkIconColor: 'dark:text-amber-400',
    glowColor: 'shadow-amber-500/10',
    accentHex: '#d97706',
    coreDeliverables: ['Journal Posting', 'Bank Reconciliation', 'Payroll Auditing', 'Statutory Filings']
  },
  'Technology Partner': {
    id: 'technology-partner',
    name: 'Technology Partner',
    shortName: 'Tech Partner',
    tagline: 'Cloud Infrastructure & Hardware Integration Provider',
    description: 'Provides physical hardware connectivity (biometric fingerprint / facial recognition clocks), secure cloud networks, and SSO identity management.',
    icon: Cpu,
    badgeBg: 'bg-cyan-50',
    badgeText: 'text-cyan-900',
    badgeBorder: 'border-cyan-200',
    iconColor: 'text-cyan-600',
    darkBadgeBg: 'dark:bg-cyan-950/50',
    darkBadgeText: 'dark:text-cyan-300',
    darkBadgeBorder: 'dark:border-cyan-800/80',
    darkIconColor: 'dark:text-cyan-400',
    glowColor: 'shadow-cyan-500/10',
    accentHex: '#0891b2',
    coreDeliverables: ['Biometric Clocks', 'Single Sign-On (SSO)', 'Cloud Hosting', 'VPN & Network Security']
  },
  'IT Company': {
    id: 'it-company',
    name: 'IT Company',
    shortName: 'IT Services',
    tagline: 'Enterprise IT Solutions & Hardware Vendor',
    description: 'Experienced in deploying on-premise attendance devices, secure local networks, endpoint administration, and technical helpdesk services.',
    icon: Cpu,
    badgeBg: 'bg-cyan-50',
    badgeText: 'text-cyan-900',
    badgeBorder: 'border-cyan-200',
    iconColor: 'text-cyan-600',
    darkBadgeBg: 'dark:bg-cyan-950/50',
    darkBadgeText: 'dark:text-cyan-300',
    darkBadgeBorder: 'dark:border-cyan-800/80',
    darkIconColor: 'dark:text-cyan-400',
    glowColor: 'shadow-cyan-500/10',
    accentHex: '#0891b2',
    coreDeliverables: ['Hardware Setup', 'Local Server Sync', 'Security Hardening', 'Onsite Support']
  },
  'System Integrator': {
    id: 'system-integrator',
    name: 'System Integrator',
    shortName: 'Integrator',
    tagline: 'Enterprise ERP & REST API Synchronization Architect',
    description: 'Builds robust bi-directional bridges between NextSofthr and tier-1 ERPs (SAP, Oracle EBS, Microsoft Dynamics 365, NetSuite).',
    icon: GitMerge,
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-900',
    badgeBorder: 'border-purple-200',
    iconColor: 'text-purple-600',
    darkBadgeBg: 'dark:bg-purple-950/50',
    darkBadgeText: 'dark:text-purple-300',
    darkBadgeBorder: 'dark:border-purple-800/80',
    darkIconColor: 'dark:text-purple-400',
    glowColor: 'shadow-purple-500/10',
    accentHex: '#9333ea',
    coreDeliverables: ['SAP / Oracle Sync', 'Custom REST APIs', 'Data Warehousing', 'Webhooks Pipeline']
  },
  'Software Consultant': {
    id: 'software-consultant',
    name: 'Software Consultant',
    shortName: 'Software Cons.',
    tagline: 'Custom Workflow & Systems Automation Specialist',
    description: 'Designs custom approval chains, automated notification scripts, and third-party SaaS connector integrations for specialized business units.',
    icon: Code2,
    badgeBg: 'bg-violet-50',
    badgeText: 'text-violet-900',
    badgeBorder: 'border-violet-200',
    iconColor: 'text-violet-600',
    darkBadgeBg: 'dark:bg-violet-950/50',
    darkBadgeText: 'dark:text-violet-300',
    darkBadgeBorder: 'dark:border-violet-800/80',
    darkIconColor: 'dark:text-violet-400',
    glowColor: 'shadow-violet-500/10',
    accentHex: '#7c3aed',
    coreDeliverables: ['Custom Scripts', 'Approval Pipelines', 'SaaS Connectors', 'Automation Rules']
  },
  'Training Partner': {
    id: 'training-partner',
    name: 'Training Partner',
    shortName: 'Training',
    tagline: 'NextSofthr Academy & Organizational Change Coach',
    description: 'Accredited training facilitators offering employee onboarding courses, HR admin deep-dives, and train-the-trainer workshops.',
    icon: GraduationCap,
    badgeBg: 'bg-fuchsia-50',
    badgeText: 'text-fuchsia-900',
    badgeBorder: 'border-fuchsia-200',
    iconColor: 'text-fuchsia-600',
    darkBadgeBg: 'dark:bg-fuchsia-950/50',
    darkBadgeText: 'dark:text-fuchsia-300',
    darkBadgeBorder: 'dark:border-fuchsia-800/80',
    darkIconColor: 'dark:text-fuchsia-400',
    glowColor: 'shadow-fuchsia-500/10',
    accentHex: '#c026d3',
    coreDeliverables: ['Admin Bootcamps', 'Staff ESS Seminars', 'Change Management', 'Certification Prep']
  },
  'Recruitment Consultant': {
    id: 'recruitment-consultant',
    name: 'Recruitment Consultant',
    shortName: 'Recruiter',
    tagline: 'Executive Talent Acquisition & Headhunting Firm',
    description: 'Specializes in recruiting pre-vetted HR managers, payroll directors, and technical personnel trained on the NextSofthr platform.',
    icon: UserPlus,
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-900',
    badgeBorder: 'border-rose-200',
    iconColor: 'text-rose-600',
    darkBadgeBg: 'dark:bg-rose-950/50',
    darkBadgeText: 'dark:text-rose-300',
    darkBadgeBorder: 'dark:border-rose-800/80',
    darkIconColor: 'dark:text-rose-400',
    glowColor: 'shadow-rose-500/10',
    accentHex: '#e11d48',
    coreDeliverables: ['Executive Search', 'Talent Pooling', 'Candidate Screening', 'Placement Audits']
  },
  'Outsourcing Company': {
    id: 'outsourcing-company',
    name: 'Outsourcing Company',
    shortName: 'BPO / PEO',
    tagline: 'Managed Payroll, BPO & Employer of Record (EOR)',
    description: 'Provides complete outsourced payroll processing, workforce leasing, and compliant Employer of Record services across African jurisdictions.',
    icon: Briefcase,
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-900',
    badgeBorder: 'border-rose-200',
    iconColor: 'text-rose-600',
    darkBadgeBg: 'dark:bg-rose-950/50',
    darkBadgeText: 'dark:text-rose-300',
    darkBadgeBorder: 'dark:border-rose-800/80',
    darkIconColor: 'dark:text-rose-400',
    glowColor: 'shadow-rose-500/10',
    accentHex: '#e11d48',
    coreDeliverables: ['Full Payroll BPO', 'Employer of Record', 'Contractor Management', 'Statutory Indemnity']
  },
  'Business Consultant': {
    id: 'business-consultant',
    name: 'Business Consultant',
    shortName: 'Business Cons.',
    tagline: 'Strategic Management & Operational Scalability Advisory',
    description: 'Advises C-suite leadership on workforce scaling roadmaps, operational efficiency KPI design, and post-merger HR consolidation.',
    icon: TrendingUp,
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-800',
    badgeBorder: 'border-slate-300',
    iconColor: 'text-slate-600',
    darkBadgeBg: 'dark:bg-slate-800/60',
    darkBadgeText: 'dark:text-slate-200',
    darkBadgeBorder: 'dark:border-slate-700',
    darkIconColor: 'dark:text-slate-300',
    glowColor: 'shadow-slate-500/10',
    accentHex: '#475569',
    coreDeliverables: ['C-Suite Roadmaps', 'Operational Audits', 'M&A HR Harmonization', 'KPI Alignment']
  },
  'Reseller': {
    id: 'reseller',
    name: 'Reseller',
    shortName: 'Reseller',
    tagline: 'Authorized NextSofthr Commercial Distribution Partner',
    description: 'Authorized regional commercial partner providing software licensing, localized customer onboarding, and renewal support.',
    icon: Store,
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-900',
    badgeBorder: 'border-amber-200',
    iconColor: 'text-amber-600',
    darkBadgeBg: 'dark:bg-amber-950/50',
    darkBadgeText: 'dark:text-amber-300',
    darkBadgeBorder: 'dark:border-amber-800/80',
    darkIconColor: 'dark:text-amber-400',
    glowColor: 'shadow-amber-500/10',
    accentHex: '#d97706',
    coreDeliverables: ['License Distribution', 'Subscription Renewals', 'Account Management', 'Local Support']
  },
  'Distributor': {
    id: 'distributor',
    name: 'Distributor',
    shortName: 'Distributor',
    tagline: 'Territorial Master License & Channel Distributor',
    description: 'Appointed regional channel master distributing NextSofthr licenses and coordinating secondary implementation partners.',
    icon: Store,
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-900',
    badgeBorder: 'border-amber-200',
    iconColor: 'text-amber-600',
    darkBadgeBg: 'dark:bg-amber-950/50',
    darkBadgeText: 'dark:text-amber-300',
    darkBadgeBorder: 'dark:border-amber-800/80',
    darkIconColor: 'dark:text-amber-400',
    glowColor: 'shadow-amber-500/10',
    accentHex: '#d97706',
    coreDeliverables: ['Territory Channeling', 'Master Licensing', 'Sub-Partner Enablement', 'B2B Procurement']
  }
};

export const getCategoryConfig = (categoryName: string): CategoryConfig => {
  if (PARTNER_CATEGORIES[categoryName]) {
    return PARTNER_CATEGORIES[categoryName];
  }
  
  // Fuzzy match fallback
  const normalized = categoryName.toLowerCase().trim();
  for (const [key, cfg] of Object.entries(PARTNER_CATEGORIES)) {
    if (normalized.includes(key.toLowerCase()) || key.toLowerCase().includes(normalized)) {
      return cfg;
    }
  }

  // Default fallback
  return {
    id: 'general-consultant',
    name: categoryName || 'Partner Consultant',
    shortName: categoryName || 'Partner',
    tagline: 'Certified NextSofthr Ecosystem Practitioner',
    description: 'Verified professional supporting NextSofthr deployments, human resource workflows, and localized compliance.',
    icon: Briefcase,
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-800',
    badgeBorder: 'border-blue-200',
    iconColor: 'text-blue-600',
    darkBadgeBg: 'dark:bg-blue-950/50',
    darkBadgeText: 'dark:text-blue-300',
    darkBadgeBorder: 'dark:border-blue-800/80',
    darkIconColor: 'dark:text-blue-400',
    glowColor: 'shadow-blue-500/10',
    accentHex: '#2563eb',
    coreDeliverables: ['System Support', 'Client Consultation', 'Service Delivery']
  };
};

export interface PartnerCategoryBadgeProps {
  category: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showTooltip?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: 'pill' | 'card' | 'outline' | 'compact';
}

export const PartnerCategoryBadge: React.FC<PartnerCategoryBadgeProps> = ({
  category,
  size = 'sm',
  showIcon = true,
  showTooltip = false,
  interactive = false,
  onClick,
  className = '',
  variant = 'pill'
}) => {
  const config = getCategoryConfig(category);
  const IconComponent = config.icon;

  const sizeClasses = {
    xs: {
      pill: 'px-2 py-0.5 text-[10px] gap-1 font-semibold',
      icon: 'w-2.5 h-2.5'
    },
    sm: {
      pill: 'px-2.5 py-1 text-xs gap-1.5 font-semibold',
      icon: 'w-3 h-3'
    },
    md: {
      pill: 'px-3 py-1.5 text-xs sm:text-sm gap-2 font-bold',
      icon: 'w-3.5 h-3.5'
    },
    lg: {
      pill: 'px-4 py-2 text-sm gap-2.5 font-bold',
      icon: 'w-4 h-4'
    }
  };

  if (variant === 'card') {
    return (
      <div 
        onClick={onClick}
        className={`p-4 rounded-2xl border transition-all duration-200 group relative ${config.badgeBg} ${config.darkBadgeBg} ${config.badgeBorder} ${config.darkBadgeBorder} ${
          interactive ? 'cursor-pointer hover:shadow-md hover:scale-[1.02]' : ''
        } ${className}`}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl bg-white dark:bg-[#061227] border shadow-xs ${config.badgeBorder} ${config.darkBadgeBorder} ${config.iconColor} ${config.darkIconColor}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-bold uppercase tracking-wider ${config.iconColor} ${config.darkIconColor}`}>
                Certified Category
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#c8f526]" />
            </div>
            <h4 className={`text-base font-extrabold mt-0.5 ${config.badgeText} ${config.darkBadgeText}`}>
              {config.name}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {config.description}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-200/50 dark:border-slate-800/80 flex flex-wrap gap-1.5">
          {config.coreDeliverables.map((item, idx) => (
            <span 
              key={idx}
              className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/70 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  const badgeElement = (
    <span
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={`inline-flex items-center rounded-full border shadow-2xs transition-all duration-150 select-none ${
        config.badgeBg
      } ${config.darkBadgeBg} ${config.badgeText} ${config.darkBadgeText} ${
        config.badgeBorder
      } ${config.darkBadgeBorder} ${sizeClasses[size].pill} ${
        interactive 
          ? 'cursor-pointer hover:opacity-90 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#c8f526]' 
          : ''
      } ${className}`}
      title={showTooltip ? `${config.name}: ${config.tagline}` : undefined}
    >
      {showIcon && (
        <IconComponent className={`${sizeClasses[size].icon} ${config.iconColor} ${config.darkIconColor} shrink-0`} />
      )}
      <span className="truncate tracking-tight">{config.name}</span>
    </span>
  );

  return badgeElement;
};
