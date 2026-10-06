import { AiPromptOption, PricingPlan, Testimonial, FaqItem, OutsourcingService } from '../types';

export const AI_PROMPTS: AiPromptOption[] = [
  {
    id: 'payroll-calc',
    query: "Calculate this month's payroll.",
    category: 'payroll',
    response: {
      summary: "September 2026 Payroll calculation complete across 14 international legal entities. 100% tax and statutory contributions verified.",
      type: 'table',
      data: {
        totalGross: "$948,250.00",
        totalDeductions: "$182,410.00",
        totalTaxes: "$138,620.00",
        netDisbursement: "$627,220.00",
        employeesCount: 2840,
        anomaliesDetected: 0,
        status: "Ready for 1-Click Payout",
        breakdown: [
          { department: 'Engineering & Product', employees: 840, gross: '$382,400', net: '$254,100', status: 'Approved' },
          { department: 'Global Sales & Marketing', employees: 620, gross: '$245,600', net: '$161,200', status: 'Approved' },
          { department: 'Customer Success & Ops', employees: 510, gross: '$148,200', net: '$99,400', status: 'Approved' },
          { department: 'General & Administrative', employees: 870, gross: '$172,050', net: '$112,520', status: 'Approved' }
        ]
      },
      insights: [
        "Zero payroll tax compliance discrepancies detected across US, UK, EU, and APAC jurisdictions.",
        "Overtime expenses decreased by 4.2% compared to August due to intelligent shift optimization.",
        "Direct deposit batch prepared with automated banking clearing integration."
      ],
      actionLabel: "Execute Instant Payout"
    }
  },
  {
    id: 'who-absent',
    query: "Who is absent today?",
    category: 'attendance',
    response: {
      summary: "Attendance audit for Tuesday, September 15, 2026: 98.2% attendance rate. 14 team members on approved leave, 2 unexpected absences flagged.",
      type: 'table',
      data: {
        breakdown: [
          { name: 'Elena Rostova', role: 'Staff Data Engineer', dept: 'Engineering', status: 'Annual Leave', returnDate: 'Sep 18, 2026' },
          { name: 'Marcus Chen', role: 'Enterprise Account Exec', dept: 'Sales', status: 'Sick Leave', returnDate: 'Sep 16, 2026' },
          { name: 'Amara Okafor', role: 'HR Operations Specialist', dept: 'People', status: 'Parental Leave', returnDate: 'Nov 02, 2026' },
          { name: 'Liam Davies', role: 'Frontend Architect', dept: 'Engineering', status: 'Unplanned (Follow-up sent)', returnDate: 'Pending' }
        ]
      },
      insights: [
        "All critical shift coverage requirements met with automated backup assignments.",
        "Liam Davies was automatically pinged via WhatsApp & NextSofthr Mobile app with no penalty."
      ],
      actionLabel: "View Live Attendance Roster"
    }
  },
  {
    id: 'leave-expires',
    query: "Show employees whose leave expires this week.",
    category: 'attendance',
    response: {
      summary: "5 employees have annual or medical leave ending between Sep 15 and Sep 19, 2026. Handover summaries scheduled.",
      type: 'table',
      data: {
        breakdown: [
          { name: 'Sofia Rodriguez', role: 'UI/UX Designer', leaveType: 'Annual Leave', returnDate: 'Tomorrow (Sep 16)', handoverStatus: 'Completed' },
          { name: 'Tariq Al-Mansoor', role: 'DevOps Lead', leaveType: 'Maternity/Paternity', returnDate: 'Thu (Sep 17)', handoverStatus: 'In Review' },
          { name: 'Claire Bennett', role: 'Payroll Analyst', leaveType: 'Study Leave', returnDate: 'Fri (Sep 18)', handoverStatus: 'Completed' }
        ]
      },
      insights: [
        "Workstation and Slack access will automatically un-pause at 08:00 AM on their respective return dates.",
        "Manager welcome-back 1-on-1 check-ins have been auto-scheduled."
      ],
      actionLabel: "Send Welcome Notifications"
    }
  },
  {
    id: 'overtime-dept',
    query: "Which department has the highest overtime?",
    category: 'analytics',
    response: {
      summary: "Logistics & Global Fulfillment logged the highest overtime this cycle at 312 cumulative hours ($11,480 cost), primarily driven by Q3 inventory rollouts.",
      type: 'stat-grid',
      data: {
        departments: [
          { name: 'Logistics & Fulfillment', hours: '312 hrs', cost: '$11,480', change: '+18%', alert: 'High' },
          { name: 'Customer Support (24/7)', hours: '184 hrs', cost: '$5,890', change: '-4%', alert: 'Normal' },
          { name: 'Engineering Infra', hours: '64 hrs', cost: '$3,120', change: '-12%', alert: 'Low' },
          { name: 'Sales Operations', hours: '18 hrs', cost: '$720', change: '0%', alert: 'Optimal' }
        ]
      },
      insights: [
        "Recommendation: Auto-generate 2 part-time shift slots to reduce overtime multiplier by 38%.",
        "NextSofthr shift swap feature resolved 42 potential bottleneck shifts automatically."
      ],
      actionLabel: "Optimize Shift Distribution"
    }
  },
  {
    id: 'contract-gen',
    query: "Create an employment contract.",
    category: 'compliance',
    response: {
      summary: "Drafted Standard Global Full-Time Employment Agreement compliant with local labour law & remote IP protection.",
      type: 'document',
      data: {
        title: "Standard Employment Agreement (Global Remote)",
        candidate: "Sarah Jenkins, Senior Product Designer",
        jurisdiction: "United Kingdom & International Framework",
        clauses: [
          "Section 1: Position, Duties & Agile Deliverables",
          "Section 2: Compensation, Monthly Payroll & Statutory Benefits (£78,000/yr)",
          "Section 3: Intellectual Property & Inventions Assignment (Worldwide)",
          "Section 4: Remote Work Stipend & Equipment Security Protocol",
          "Section 5: 28 Days Statutory Holiday + NextSofthr Wellness Allowance"
        ],
        eSignReady: true
      },
      insights: [
        "Localized automatically with UK statutory pension contribution (Auto-Enrolment compliant).",
        "Ready for 1-click delivery via NextSofthr Secure e-Sign to candidate portal."
      ],
      actionLabel: "Send via Secure e-Sign"
    }
  },
  {
    id: 'workforce-costs',
    query: "What are my biggest workforce costs?",
    category: 'analytics',
    response: {
      summary: "Workforce expenditure analysis: 64% Base Salaries, 18% Healthcare & Employee Benefits, 11% Statutory Taxes & Pensions, 7% Contractor & Overtime.",
      type: 'stat-grid',
      data: {
        totalSpend: "$11,380,000 YTD",
        categories: [
          { label: 'Base Salaries', pct: '64%', amount: '$7.28M', trend: 'Stable' },
          { label: 'Health & Pension Benefits', pct: '18%', amount: '$2.05M', trend: '-2.4% (Negotiated)' },
          { label: 'Statutory Payroll Taxes', pct: '11%', amount: '$1.25M', trend: 'Compliant' },
          { label: 'Overtime & Contractors', pct: '7%', amount: '$0.80M', trend: '-8.1% (Automated)' }
        ]
      },
      insights: [
        "Consolidating international contractor payroll into NextSofthr unified ledger saved $48,000 in wire fees.",
        "Projected annual cost per hire dropped 22% using AI talent pre-screening."
      ],
      actionLabel: "Export Full Executive Financial Report"
    }
  },
  {
    id: 'salary-review',
    query: "Who is due for a salary review?",
    category: 'payroll',
    response: {
      summary: "8 team members have reached their 12-month review cycle with consistent Top Quartile performance scores (>4.6/5.0).",
      type: 'table',
      data: {
        breakdown: [
          { name: 'Devon Vance', role: 'Lead DevOps Engineer', tenure: '24 mos', currentSalary: '$115,000', recommended: '$126,500 (+10%)', rating: '4.9 ★' },
          { name: 'Kavita Patel', role: 'Senior Product Manager', tenure: '14 mos', currentSalary: '$98,000', recommended: '$108,000 (+10.2%)', rating: '4.8 ★' },
          { name: 'Lucas Meyer', role: 'Account Executive', tenure: '12 mos', currentSalary: '$72,000 + Comm', recommended: '$80,000 Base', rating: '4.7 ★' }
        ]
      },
      insights: [
        "Benchmark comparison against international market median shows 92nd percentile retention risk without adjustment.",
        "Total budgetary impact fits comfortably within the approved H2 compensation buffer."
      ],
      actionLabel: "Open Compensation Committee Review"
    }
  },
  {
    id: 'hr-policy',
    query: "Help me create an HR policy.",
    category: 'policy',
    response: {
      summary: "Generated comprehensive Global Hybrid & Remote Work Policy (2026 Edition) covering security, ergonomics, and core collaboration hours.",
      type: 'document',
      data: {
        title: "NextSofthr Model Global Flexible Workplace Policy",
        scope: "Applicable to all full-time, part-time and contract personnel",
        sections: [
          "1. Core Collaboration Windows (10:00 - 15:00 UTC for cross-timezone sync)",
          "2. Home Office Hardware & Ergonomics Reimbursement Allowance",
          "3. Data Protection & Zero-Trust Device Security Standards",
          "4. Right to Disconnect & Digital Well-being Commitments"
        ]
      },
      insights: [
        "Includes GDPR, CCPA, and UK Working Time Regulations compliance clauses.",
        "Ready to distribute to 2,840 employees with digital acknowledgment tracking."
      ],
      actionLabel: "Publish to Employee Handbook"
    }
  }
];

export const AI_CAPABILITIES = [
  { title: "AI Payroll Assistant", desc: "Automates gross-to-net calculations, tax brackets, allowances, and local statutory deductions instantly.", icon: "Calculator" },
  { title: "AI HR Advisor", desc: "Instant answers on labor law compliance, dispute protocols, and global workplace guidelines.", icon: "Sparkles" },
  { title: "AI Employee Assistant", desc: "24/7 conversational self-service for leave balance checks, tax slips, and benefits inquiries.", icon: "Bot" },
  { title: "AI Recruitment Assistant", desc: "Intelligently parses CVs, matches competencies, and drafts custom interview scorecards in seconds.", icon: "UserCheck" },
  { title: "AI Workforce Analytics", desc: "Predicts attrition risks, models compensation bands, and identifies talent pipeline gaps.", icon: "TrendingUp" },
  { title: "AI Report Generation", desc: "Converts natural prompts into boardroom-ready visual executive decks and audit spreadsheets.", icon: "FileSpreadsheet" },
  { title: "AI Document Generation", desc: "Drafts tailored offer letters, NDA agreements, and promotion contracts with zero legal friction.", icon: "FileText" },
  { title: "AI Attendance Insights", desc: "Flags chronic tardiness patterns, burnout risks, and optimal staffing schedules.", icon: "Clock" },
  { title: "AI Payroll Anomaly Detection", desc: "Detects duplicate payouts, ghost workers, overtime spikes, and incorrect bank info before disbursement.", icon: "ShieldAlert" },
  { title: "AI Performance Insights", desc: "Synthesizes 360-degree feedback and KPI milestones into fair, bias-free appraisal summaries.", icon: "Award" },
  { title: "AI HR Policy Assistant", desc: "Maintains living employee handbooks synchronized with multi-jurisdiction labor legislations.", icon: "BookOpen" },
  { title: "AI Workforce Forecasting", desc: "Simulates hiring costs and payroll budget scenarios under 6, 12, and 24-month growth models.", icon: "BarChart3" }
];

export const PAIN_POINTS = [
  {
    num: "01",
    title: "Manual Payroll Calculations",
    desc: "Payroll calculations take too much time and create costly errors, tax penalty risks, and unhappy team members waiting on corrections.",
    icon: "AlertTriangle",
    metric: "42 hrs",
    metricLabel: "lost per month on manual spreadsheets"
  },
  {
    num: "02",
    title: "Scattered Employee Information",
    desc: "Employee records, contracts, visas, and tax documents are scattered across endless folders, emails, and disconnected legacy drives.",
    icon: "FolderSync",
    metric: "6.5 hrs",
    metricLabel: "wasted weekly hunting for HR files"
  },
  {
    num: "03",
    title: "Attendance & Time Tracking Chaos",
    desc: "Struggling to accurately track working hours, buddy punching, late arrivals, overtime disputes, and remote worker availability.",
    icon: "Clock",
    metric: "14%",
    metricLabel: "untracked payroll bleed from time leakage"
  },
  {
    num: "04",
    title: "Complicated Leave Approvals",
    desc: "Managers spend endless hours tracking email leave requests, spreadsheet balances, and sudden staffing shortages.",
    icon: "CalendarX",
    metric: "3.2 days",
    metricLabel: "average delay for simple time-off approval"
  },
  {
    num: "05",
    title: "Disorganized Recruitment & Hiring",
    desc: "Recruiting, screening, interview scheduling, and onboarding candidates becomes slow, disjointed, and loses top talent.",
    icon: "UserX",
    metric: "45 days",
    metricLabel: "average time-to-hire without AI workflows"
  },
  {
    num: "06",
    title: "Zero Real-Time Workforce Visibility",
    desc: "Executives and founders lack instant visibility into true employee costs, department productivity, and headcount budgets.",
    icon: "EyeOff",
    metric: "0 real-time",
    metricLabel: "visibility into total workforce ROI"
  },
  {
    num: "07",
    title: "Too Many Disconnected Software Tools",
    desc: "Paying for 6 different single-purpose apps for HR, attendance, payroll, CRM, and projects that refuse to talk to one another.",
    icon: "Layers",
    metric: "$240+",
    metricLabel: "per user/mo spent across fragmented software"
  },
  {
    num: "08",
    title: "Ever-Shifting HR Compliance & Taxes",
    desc: "Keeping up with local labor regulations, statutory benefits, tax filings, and audit readiness across multiple jurisdictions.",
    icon: "ShieldX",
    metric: "$32k",
    metricLabel: "average annual cost of compliance oversights"
  }
];

export const COMPARISON_DATA = [
  { feature: "Payroll Processing", traditional: "Manual spreadsheets, error-prone tax formulas", nextsoft: "1-Click automated calculation, multi-currency & direct bank rails" },
  { feature: "Employee Records", traditional: "Physical paper files, scattered PDFs & Google Drive", nextsoft: "Encrypted centralized digital dossiers with lifecycle auditing" },
  { feature: "Time & Attendance", traditional: "Paper punch cards, manual sign-in sheets", nextsoft: "Biometric, geo-fenced mobile clock-in & live roster tracking" },
  { feature: "Leave Workflows", traditional: "Back-and-forth emails, lost messages & confusion", nextsoft: "Instant mobile requests, balance calculations & 1-tap approvals" },
  { feature: "Talent Acquisition", traditional: "Manual resume screening, slow hiring steps", nextsoft: "AI candidate scoring, automated pipelines & 1-click offer letters" },
  { feature: "Workforce Analytics", traditional: "Stale monthly exports that take days to compile", nextsoft: "Live real-time dashboards with predictive AI forecasting" },
  { feature: "Employee Self-Service", traditional: "Employees call HR for basic slips and questions", nextsoft: "Modern iOS & Android ESS app + 24/7 AI employee concierge" },
  { feature: "Finance & CRM Link", traditional: "Siloed accounting with double-entry nightmares", nextsoft: "Unified ledger syncing payroll, expenses, CRM & project time" },
  { feature: "HR Outsourcing Option", traditional: "Hire costly fragmented external agencies", nextsoft: "Native hybrid model: software only or fully managed HR specialists" }
];

export const CORE_HR_FEATURES = [
  { id: 'emp-mgmt', title: "Employee Profiles & Records", desc: "Comprehensive 360° digital dossiers holding contracts, tax forms, emergency contacts, certifications, and career timelines.", icon: "Users" },
  { id: 'docs-vault', title: "Document Management & Vault", desc: "Enterprise cloud storage with automated expiry notifications for passports, visas, insurance policies, and work permits.", icon: "FileText" },
  { id: 'org-structure', title: "Org Structure & Hierarchy", desc: "Dynamic visual reporting trees, multi-tier departments, cost centers, and automated approval matrixes.", icon: "Network" },
  { id: 'roles-perms', title: "Granular Roles & Permissions", desc: "Enterprise RBAC granting precise access to Super Admins, HR Managers, Finance Leads, Line Managers, and Staff.", icon: "ShieldCheck" },
  { id: 'hr-policies', title: "Digital HR Policies & Handbooks", desc: "Version-controlled corporate policies with mandatory digital sign-off and audit-trail verification.", icon: "BookCheck" },
  { id: 'lifecycle', title: "Lifecycle Management", desc: "End-to-end management from first contact to probation, promotions, department transfers, and offboarding.", icon: "Repeat" },
  { id: 'onboarding', title: "Automated Onboarding", desc: "Delight new hires on day one with automated document collection, IT provisioning requests, and welcome packs.", icon: "UserPlus" },
  { id: 'offboarding', title: "Seamless Offboarding", desc: "Checklists for equipment return, access revocation, exit interviews, final settlement calculation, and severance.", icon: "UserMinus" },
  { id: 'performance', title: "Performance & OKRs", desc: "Goal tracking, 360 reviews, continuous feedback loops, and automated performance appraisal summaries.", icon: "Target" },
  { id: 'hr-reports', title: "Comprehensive HR Reports", desc: "Pre-built compliance reports, headcount growth, diversity statistics, attrition analysis, and tenure trends.", icon: "BarChart4" }
];

export const TIME_ATTENDANCE_FEATURES = [
  { title: "Mobile Clock-in & Geo-fencing", desc: "Employees verify clock-in via GPS geofencing or office Wi-Fi with zero spoofing.", icon: "Smartphone" },
  { title: "Biometric Hardware Sync", desc: "Direct plug-and-play integration with fingerprint and facial recognition terminals.", icon: "Fingerprint" },
  { title: "Lateness & Early Departure", desc: "Automated alerts for line managers when shifts start late or finish early.", icon: "AlertCircle" },
  { title: "Overtime & Break Tracking", desc: "Accurate tracking of paid/unpaid rest breaks and statutory overtime compensation.", icon: "Timer" },
  { title: "Absence & Sick Tracking", desc: "Medical note uploads, pattern recognition (e.g. Monday absenteeism), and notifications.", icon: "Activity" },
  { title: "Real-time Live Roster", desc: "Live cockpit showing exactly who is on-site, working remotely, on break, or on leave.", icon: "Radio" }
];

export const PAYROLL_STEPS = [
  { step: '01', title: 'Gross Earnings', desc: 'Base salary, allowances, bonuses, overtime hours, commissions, and travel per-diems calculated automatically.' },
  { step: '02', title: 'Statutory Deductions', desc: 'Social security, health insurance, provident funds, pensions, and voluntary union or savings withholdings.' },
  { step: '03', title: 'Tax & Compliance', desc: 'Localized progressive income tax, federal/state brackets, PAYE, and national insurance formulas.' },
  { step: '04', title: 'Company Benefits', desc: 'Employer-side matching for 401k, health stipends, gym perks, and learning allowances.' },
  { step: '05', title: 'Net Pay Disbursement', desc: 'Instant bank batch payouts, local mobile money rails, encrypted payslip dispatch, and ledger sync.' }
];

export const OUTSOURCING_TIERS = [
  {
    tier: "Software Only",
    badge: "Self-Managed",
    desc: "For businesses with an in-house HR and payroll department who want the best technology.",
    features: [
      "Full NextSofthr All-in-One Software Suite",
      "Unlimited Employee Profiles & Self-Service",
      "Automated Global Payroll & Tax Calculators",
      "Mobile Attendance & Shift Management",
      "24/7 Technical Platform Support & SLA",
      "Continuous Regulatory Software Updates"
    ],
    cta: "Start Free Trial",
    highlight: false
  },
  {
    tier: "Software + Support",
    badge: "Most Popular",
    desc: "Get our intelligent platform plus a dedicated NextSofthr HR & payroll specialist on call.",
    features: [
      "Everything in Software Only tier",
      "Dedicated HR & Payroll Account Manager",
      "Monthly Payroll Review & Pre-Audit Verification",
      "Employment Contract Review & Localized Templates",
      "Priority Regulatory Compliance Advisory",
      "Quarterly HR Health Checks & Policy Updates"
    ],
    cta: "Talk to an HR Expert",
    highlight: true
  },
  {
    tier: "Fully Outsourced HR & Payroll",
    badge: "Complete Peace of Mind",
    desc: "Hand over your entire HR, payroll, benefits, and compliance operations to our licensed experts.",
    features: [
      "Complete End-to-End Payroll Processing",
      "Tax Filings, Remittances & Statutory Submissions",
      "Full Employee Onboarding & Exit Administration",
      "Leave & Attendance Monitoring & Reconciliation",
      "Workplace Dispute & Employee Relations Support",
      "Executive Board HR & Finance Reporting"
    ],
    cta: "Request Outsourcing Proposal",
    highlight: false
  }
];

export const OUTSOURCING_SERVICES: OutsourcingService[] = [
  { id: '1', title: "Payroll Processing & Disbursement", description: "Flawless monthly calculations, bank file generation, and payslip distribution.", deliverables: ["Direct Bank Batching", "Tax Deductions", "Statutory Filings"], icon: "CreditCard" },
  { id: '2', title: "Statutory Tax & Pension Compliance", description: "Accurate monthly tax remittances, filings with national revenue authorities, and audits.", deliverables: ["Annual Returns", "Social Security", "Audit Defense"], icon: "ShieldCheck" },
  { id: '3', title: "Employee Lifecycle Administration", description: "Drafting offer letters, collecting KYC documents, background checks, and setup.", deliverables: ["Contract Drafting", "Asset Tracking", "Probation Reviews"], icon: "Users" },
  { id: '4', title: "Leave & Attendance Reconciliation", description: "Monthly audits of clock-in records, shift overtimes, and leave balance adjustments.", deliverables: ["Overtime Audits", "Leave Entitlements", "Absence Policies"], icon: "CalendarCheck" },
  { id: '5', title: "Talent Acquisition & Sourcing", description: "End-to-end recruitment, pre-screening interviews, candidate scoring, and offer negotiations.", deliverables: ["Candidate Sourcing", "Interview Coordination", "Offer Benchmarking"], icon: "Search" },
  { id: '6', title: "HR Consulting & Advisory", description: "Strategic workforce restructuring, performance management frameworks, and compensation banding.", deliverables: ["Salary Benchmarking", "Policy Development", "Employee Relations"], icon: "Briefcase" }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Micro & Small Teams',
    description: 'Perfect for startups and small businesses needing clean payroll and automated HR records.',
    priceMonthly: 4,
    priceYearly: 3.2,
    employeeRange: '1 - 25 Employees ($4/user/mo)',
    features: [
      'Core HR & Centralized Employee Records',
      'Automated Payroll & Direct Deposit',
      'Mobile Time & Attendance Tracking',
      'Leave Management & Approvals',
      'Standard Employee Self-Service (ESS)',
      'Basic AI HR Assistant (50 queries/mo)',
      'Standard Email Support'
    ],
    ctaText: 'Get Started Free'
  },
  {
    id: 'growth',
    name: 'Growth',
    badge: 'Fast-Growing Companies',
    description: 'Ideal for scaling businesses with expanding teams, departments, and multiple locations.',
    priceMonthly: 7,
    priceYearly: 5.6,
    employeeRange: '26 - 150 Employees ($7/user/mo)',
    popular: true,
    features: [
      'Everything in Starter, plus:',
      'Shift & Schedule Management with Swapping',
      'Talent Acquisition & Applicant Tracking (ATS)',
      'Basic Business CRM & Lead Tracking',
      'Project & Task Management with Timesheets',
      'Advanced AI Assistant & Document Drafting',
      'Biometric & Geo-fenced Attendance Integration',
      'Priority Support & Dedicated Onboarding'
    ],
    ctaText: 'Start 14-Day Free Trial'
  },
  {
    id: 'business',
    name: 'Business',
    badge: 'Established Organizations',
    description: 'For mid-sized companies demanding deep financial controls, custom permissions, and multi-entity support.',
    priceMonthly: 12,
    priceYearly: 9.6,
    employeeRange: '151 - 500 Employees ($12/user/mo)',
    features: [
      'Everything in Growth, plus:',
      'Full Finance & Accounting Ledger Integration',
      'Multi-Currency & Multi-Branch Management',
      'Custom Role-Based Access Control (RBAC)',
      'Manager Self-Service (MSS) Cockpit',
      'Unlimited AI Queries & Predictive Forecasting',
      'Performance Management & 360 Reviews',
      'Dedicated Account Manager'
    ],
    ctaText: 'Book a Personalized Demo'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Global Scale',
    description: 'For large enterprises, multinational corporations, and complex compliance environments.',
    priceMonthly: 19,
    priceYearly: 15.2,
    employeeRange: '500+ Employees (Custom quote available)',
    features: [
      'Everything in Business, plus:',
      'Multi-Country Global Payroll Architecture',
      'Custom API & Legacy ERP Integrations (SAP, Oracle)',
      'Enterprise SLA (99.99% Uptime Guarantee)',
      'Dedicated Security & Audit Compliance Vault',
      'Custom HR & Payroll Outsourcing Options',
      'Executive Strategy & Quarterly Business Reviews',
      '24/7 Phone & Priority Engineer Support'
    ],
    ctaText: 'Contact Enterprise Sales'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "Switching from fragmented spreadsheets and 3 different tools to NextSofthr reduced our monthly payroll processing time from 4 whole days down to 25 minutes. The tax calculations across our 4 country branches are 100% accurate every single month.",
    author: "Elena Vasquez",
    role: "Chief People Officer",
    company: "Apex Global Logistics",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    highlight: "Payroll reduced from 4 days to 25 mins",
    companySize: "480 Employees"
  },
  {
    id: '2',
    quote: "The AI HR Assistant feels like having a senior labor lawyer and payroll director sitting right inside our dashboard. Asking 'Calculate this month's payroll' or 'Who is absent today' gives me instant, executive-grade answers without waiting on reports.",
    author: "Kwame Mensah",
    role: "Managing Director",
    company: "Vanguard Tech Ventures",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    highlight: "Instant AI answers for leadership",
    companySize: "165 Employees"
  },
  {
    id: '3',
    quote: "When we scaled from 35 to 220 employees across London, New York, and Singapore, we chose NextSofthr's Software + Support outsourcing model. Having their licensed specialists review our foreign payroll has saved us thousands in compliance mistakes.",
    author: "Samantha Ward",
    role: "VP of Finance & Operations",
    company: "Hyperion Media Cloud",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    highlight: "Seamless multi-country scaling",
    companySize: "220 Employees"
  },
  {
    id: '4',
    quote: "Our field workers and nurses love the mobile attendance clock-in with geo-fencing. It eliminated all buddy punching, and shift swapping used to take hours of manual texting. Now it happens automatically with manager approval in seconds.",
    author: "David Althaus",
    role: "Director of HR & Operations",
    company: "CareFirst Health Network",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    highlight: "Zero buddy punching with geo-fencing",
    companySize: "950 Employees"
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'what-is',
    category: 'general',
    question: "What is NextSofthr?",
    answer: "NextSofthr is an all-in-one modern global HR, Payroll, and Business Management platform. It brings together employee management, time and attendance, shift scheduling, automated leave workflows, global payroll processing, talent recruitment, CRM, finance, project management, and AI assistance into a unified, secure operating system for your business."
  },
  {
    id: 'who-for',
    category: 'general',
    question: "Who is NextSofthr designed for?",
    answer: "NextSofthr is engineered to scale seamlessly with businesses of all sizes worldwide: from early-stage startups and micro-businesses (1-10 employees), to growing SMEs (20-250 employees), multi-branch medium businesses, and multinational large enterprises (500-10,000+ employees)."
  },
  {
    id: 'manage-payroll',
    category: 'payroll',
    question: "Can NextSofthr manage complex payroll calculations?",
    answer: "Yes. NextSofthr automates gross-to-net payroll processing including basic salaries, allowances, bonuses, overtime rates, statutory deductions (tax, social security, pension), and voluntary withholdings. It supports multiple payroll schedules (monthly, bi-weekly, weekly), direct deposit bank exports, and automated digital payslip generation."
  },
  {
    id: 'multi-branch',
    category: 'features',
    question: "Can I manage multiple branches, offices, and international entities?",
    answer: "Absolutely. NextSofthr features a multi-entity and multi-location architecture. You can manage separate branches, sister subsidiaries, and international offices under one central executive dashboard, with localized tax rules, multi-currency support, and specific branch permissions."
  },
  {
    id: 'ess',
    category: 'features',
    question: "Does NextSofthr support employee self-service (ESS)?",
    answer: "Yes. Employees have access to a sleek web portal and mobile app (iOS and Android) where they can view encrypted payslips, request time off, check leave balances, clock in/out with GPS verification, view shift schedules, submit expense claims, and chat with the AI employee assistant."
  },
  {
    id: 'leave-online',
    category: 'features',
    question: "Can employees request leave online and view balances?",
    answer: "Yes. Employees can submit leave requests in under 15 seconds from their phone or laptop. The system automatically verifies leave balances, checks for team conflict dates, and routes the request to their designated manager."
  },
  {
    id: 'manager-approve',
    category: 'features',
    question: "Can managers approve leave and overtime from their dashboard?",
    answer: "Yes. Managers receive instant notifications and can approve or reject leave, overtime, shift swaps, and expense claims with a single click from their Manager Self-Service (MSS) dashboard or email alert."
  },
  {
    id: 'shifts',
    category: 'features',
    question: "Does NextSofthr support shift scheduling and roster management?",
    answer: "Yes. Managers can build weekly and monthly rotating shifts with visual drag-and-drop calendars, monitor overtime caps, prevent scheduling conflicts, notify staff automatically, and allow employee-to-employee shift swapping with manager sign-off."
  },
  {
    id: 'recruitment',
    category: 'features',
    question: "Can NextSofthr manage recruitment and hiring pipelines?",
    answer: "Yes. The built-in ATS (Applicant Tracking System) lets you publish job postings to job boards, screen candidate resumes using AI matching, schedule interviews, collaborate on candidate scorecards, and send automated offer letters that transition accepted candidates straight into onboarding."
  },
  {
    id: 'ai-assistant',
    category: 'general',
    question: "Does NextSofthr have AI HR assistance?",
    answer: "Yes! AI is one of our core pillars. NextSofthr includes an intelligent AI HR & Payroll Assistant that can calculate payroll, analyze attendance, generate legal-compliant employment contracts and HR policies, detect payroll anomalies, summarize performance reviews, and provide conversational workforce analytics."
  },
  {
    id: 'accounting-integrations',
    category: 'features',
    question: "Can NextSofthr integrate with accounting and business systems?",
    answer: "Yes. NextSofthr integrates seamlessly with popular accounting systems like QuickBooks, Xero, Sage, NetSuite, as well as biometric hardware terminals, Slack, Microsoft Teams, Google Calendar, and major commercial banking payment rails."
  },
  {
    id: 'outsource-payroll',
    category: 'outsourcing',
    question: "Can I outsource our payroll operations to NextSofthr?",
    answer: "Yes. If your company prefers not to manage payroll in-house, NextSofthr offers Fully Outsourced Payroll & HR Services. Our licensed payroll specialists and certified HR professionals handle your monthly calculations, tax filings, statutory compliance, and payroll inquiries on your behalf."
  },
  {
    id: 'hr-consulting',
    category: 'outsourcing',
    question: "Can NextSofthr provide HR consulting and team training?",
    answer: "Yes. Our HR advisory team delivers strategic consulting including compensation benchmarking, organizational restructuring, customized employee training, compliance audits, and hands-on system setup."
  },
  {
    id: 'large-business',
    category: 'general',
    question: "Is NextSofthr suitable for large and enterprise businesses?",
    answer: "Yes. NextSofthr is built on enterprise-grade cloud infrastructure featuring 99.99% uptime, end-to-end 256-bit encryption, comprehensive audit logging, customizable role-based permissions (RBAC), and dedicated account success managers."
  },
  {
    id: 'international-org',
    category: 'general',
    question: "Can NextSofthr support international organizations with remote staff?",
    answer: "Yes. NextSofthr was built from day one for global and hybrid teams. You can pay employees and contractors in multiple currencies, adhere to local labor statutes, manage time zones, and standardize HR practices across international borders."
  }
];

export const INTEGRATIONS = [
  { name: 'QuickBooks', category: 'Accounting', logo: 'Receipt' },
  { name: 'Xero', category: 'Accounting', logo: 'Calculator' },
  { name: 'Oracle NetSuite', category: 'Enterprise ERP', logo: 'Database' },
  { name: 'Sage Intacct', category: 'Accounting', logo: 'FileSpreadsheet' },
  { name: 'Slack', category: 'Communication', logo: 'MessageSquare' },
  { name: 'Microsoft Teams', category: 'Communication', logo: 'Users' },
  { name: 'Google Workspace', category: 'Calendar & Docs', logo: 'Mail' },
  { name: 'Biometric Terminals', category: 'Hardware Attendance', logo: 'Fingerprint' },
  { name: 'Stripe & Banking Rails', category: 'Payment & Payout', logo: 'CreditCard' },
  { name: 'Workday Bridge', category: 'Legacy Sync', logo: 'Repeat' }
];

export const DEMO_CHAPTERS = [
  { title: "01. Executive Dashboard", duration: "0:45", desc: "Live overview of 2,840 employees, payroll costs, and real-time on-time rate." },
  { title: "02. 1-Click Payroll Run", duration: "1:15", desc: "Gross-to-net tax calculation, multi-currency conversion, and instant bank disbursement." },
  { title: "03. AI HR & Payroll Assistant", duration: "1:30", desc: "Asking conversational prompts like 'Calculate this month's payroll' and drafting contracts." },
  { title: "04. Shift Scheduling & Swaps", duration: "0:50", desc: "Visual roster management with overtime threshold alarms and employee mobile swaps." },
  { title: "05. Mobile Employee Self-Service", duration: "1:10", desc: "Employees viewing payslips, clocking in via geo-fence, and requesting vacation." },
  { title: "06. Talent Acquisition Pipeline", duration: "1:05", desc: "AI candidate scoring, ATS kanban board, and digital offer letter generation." }
];

export const OUTSOURCING_SERVICES_LIST = [
  "Managed payroll calculations & disbursements",
  "Statutory tax filing & pension remittances",
  "Employee lifecycle & digital records administration",
  "Leave & attendance audit & reconciliation",
  "Dedicated certified HR account manager",
  "Multi-country contractor & remote payroll"
];

export const CONSULTING_SERVICES_LIST = [
  "Strategic HR & organizational restructuring",
  "Compensation benchmarking & salary banding",
  "Employee handbook & policy manual design",
  "Labor law compliance audits & risk assessments",
  "Executive performance appraisal frameworks",
  "Workforce planning & headcount modeling"
];

export const ESS_FEATURES = [
  "View and download encrypted payslips",
  "Download annual tax documents (W-2, P60)",
  "Request vacation and check leave balances",
  "Clock in / out with GPS geofencing verification",
  "View weekly shift roster and request shift swaps",
  "Submit receipt photos for expense reimbursement",
  "Update bank accounts and personal contact info",
  "Access employee handbook and company policies",
  "24/7 AI employee assistant for instant questions"
];

export const MSS_FEATURES = [
  "1-click leave and time-off approvals",
  "Approve employee shift swap requests",
  "Review and sign off on expense receipts",
  "Live department attendance radar and tracking",
  "Drag-and-drop shift schedule builder",
  "Conduct 360 performance reviews and ratings",
  "Overtime threshold monitoring and alerts",
  "Recommend promotions and salary revisions",
  "Monitor team project task delivery"
];

export const FAQ_ITEMS = FAQS.map((faq) => ({
  q: faq.question,
  a: faq.answer,
  category: faq.category
}));

export const BUSINESS_SEGMENTS = [
  {
    id: 'micro',
    title: 'Micro Businesses',
    range: '1 - 9 Employees',
    icon: 'Building2',
    desc: 'Simplicity first. Pay salaries on time, track attendance simply, store documents securely, and eliminate manual paperwork without bloated software.',
    features: [
      'Fast 1-click automated monthly payroll',
      'Mobile attendance with instant clock-in',
      'Digital employee document vault',
      'Straightforward self-service app'
    ]
  },
  {
    id: 'small',
    title: 'Small Businesses',
    range: '10 - 49 Employees',
    icon: 'Users2',
    desc: 'Structure and automation. Manage growing teams, standardize leave workflows, eliminate payroll mistakes, and recruit candidates effortlessly.',
    features: [
      'Shift roster and schedule swapping',
      'Multi-tier leave approval hierarchy',
      'Talent recruitment and ATS pipelines',
      'Accounting sync (Xero & QuickBooks)'
    ]
  },
  {
    id: 'medium',
    title: 'Medium-Sized Companies',
    range: '50 - 249 Employees',
    icon: 'Building',
    desc: 'Operational scale and department control. Coordinate multiple branches, track project labor timesheets, automate statutory tax filings, and empower managers.',
    features: [
      'Manager Self-Service (MSS) cockpit',
      'Project timesheets and cost tracking',
      'Statutory compliance & tax filing engine',
      'Advanced biometric and geo-fence tracking'
    ]
  },
  {
    id: 'large',
    title: 'Large & Global Enterprises',
    range: '250+ Employees',
    icon: 'Landmark',
    desc: 'Governance, multi-entity support, and deep compliance. Multi-country payroll, custom role permissions, SSO, and dedicated HR support specialists.',
    features: [
      'Multi-currency and multi-entity payroll',
      'Enterprise RBAC and SOC2 audit trails',
      'Custom ERP API integrations (SAP, Oracle)',
      'Dedicated HR & payroll success partner'
    ]
  }
];

export const GLOBAL_LOCATIONS = [
  {
    city: 'London',
    country: 'United Kingdom',
    currency: 'GBP £',
    regime: 'HMRC PAYE, RTI & Workplace Pension',
    users: '14,200',
    taxMethod: 'Auto-updated Scottish & UK income tax bands',
    pensionSystem: 'Auto-Enrolment (NEST, The People\'s Pension)',
    complianceScore: '100% Statutory Compliant'
  },
  {
    city: 'New York',
    country: 'United States',
    currency: 'USD $',
    regime: 'IRS Federal, State & Local Withholding',
    users: '28,500',
    taxMethod: 'W-2, W-4, 1099-NEC multi-state reciprocal tax',
    pensionSystem: '401(k) pre/post-tax matching & ERISA auditing',
    complianceScore: '100% Statutory Compliant'
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    currency: 'SGD $',
    regime: 'IRAS Auto-Inclusion & CPF Board',
    users: '8,900',
    taxMethod: 'IR8A digital lodgement & SDL/FWL calculation',
    pensionSystem: 'Central Provident Fund (CPF) tiered rates',
    complianceScore: '100% Statutory Compliant'
  },
  {
    city: 'Zurich',
    country: 'Switzerland',
    currency: 'CHF Fr.',
    regime: 'SwissDec & Cantonal Direct Tax',
    users: '5,400',
    taxMethod: '26 Cantons source tax & Quellensteuer rules',
    pensionSystem: 'Pillar 2 (BVG / LPP) & UVG accident insurance',
    complianceScore: '100% Statutory Compliant'
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    currency: 'AED د.إ',
    regime: 'WPS (Wage Protection System) & MOHRE',
    users: '6,100',
    taxMethod: '0% income tax with mandatory SIF bank upload',
    pensionSystem: 'End of Service Gratuity (EOSG) actuarial calculator',
    complianceScore: '100% Statutory Compliant'
  },
  {
    city: 'Sydney',
    country: 'Australia',
    currency: 'AUD $',
    regime: 'ATO STP Phase 2 & SuperStream',
    users: '7,300',
    taxMethod: 'Pay-As-You-Go (PAYG) withholding & HELP debt',
    pensionSystem: 'Superannuation Guarantee (11.5%) direct clearing',
    complianceScore: '100% Statutory Compliant'
  }
];

export const SECURITY_HIGHLIGHTS = [
  {
    title: 'ISO 27001 & SOC 2 Type II',
    desc: 'Audited annual controls ensuring strict information security and risk governance over customer data.'
  },
  {
    title: 'End-to-End 256-Bit AES & TLS 1.3',
    desc: 'All employee bank details, national IDs, and salary documents are encrypted both at rest and in transit.'
  },
  {
    title: 'Granular Role-Based Access (RBAC)',
    desc: 'Prevent unauthorized viewing with custom permissions for HR, line managers, payroll officers, and auditors.'
  },
  {
    title: 'GDPR & Statutory Audit Trails',
    desc: 'Complete immutable changelog of every salary adjustment, clock-in edit, and document download with timestamps.'
  }
];

export const INTEGRATION_CATEGORIES = [
  {
    category: 'Accounting & ERP',
    apps: ['QuickBooks Online', 'Xero', 'Oracle NetSuite', 'Sage Intacct', 'SAP Business One']
  },
  {
    category: 'Workplace Communication',
    apps: ['Slack', 'Microsoft Teams', 'Google Chat', 'WhatsApp Business']
  },
  {
    category: 'Identity & SSO',
    apps: ['Okta', 'Microsoft Azure AD / Entra ID', 'Google Workspace', 'OneLogin']
  },
  {
    category: 'Banking & Payroll Rails',
    apps: ['Stripe', 'Wise Business', 'Direct BACS / ACH / SEPA', 'Swift Payments']
  },
  {
    category: 'Productivity & Calendars',
    apps: ['Google Calendar', 'Outlook 365', 'Notion', 'Asana', 'Jira']
  },
  {
    category: 'Biometric Hardware',
    apps: ['ZKTeco', 'Suprema', 'Anviz', 'Hikvision Biometrics']
  }
];



