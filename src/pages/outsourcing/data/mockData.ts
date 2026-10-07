import { CountryConfig, PayrollRecord, JobCandidate, SupportTicket, ComplianceTask } from '../types';

export const AFRICAN_COUNTRIES: CountryConfig[] = [
  {
    id: 'nigeria',
    name: 'Nigeria',
    currency: 'NGN (₦)',
    flag: '🇳🇬',
    statutoryBodies: ['FIRS (Federal Inland Revenue Service)', 'State Internal Revenue (SIRS)', 'PenCom', 'NHF', 'ITF', 'NSITF'],
    payeRules: 'Consolidated Relief Allowance (200k or 1% gross + 20% gross), graduated tax rates 7% to 24%',
    pensionRules: '8% Employee statutory contribution, 10% Employer statutory contribution',
    additionalLevies: ['National Housing Fund (2.5%)', 'NSITF Employee Compensation (1%)', 'ITF (1%)'],
    activeClients: 148,
    statutoryFilingDay: '10th of each calendar month (PAYE) & 14th (Pensions)',
    supportedCities: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano']
  },
  {
    id: 'ghana',
    name: 'Ghana',
    currency: 'GHS (₵)',
    flag: '🇬🇭',
    statutoryBodies: ['GRA (Ghana Revenue Authority)', 'SSNIT (Social Security and National Insurance Trust)'],
    payeRules: 'Graduated bands with personal tax-free thresholds up to 35% top bracket',
    pensionRules: 'SSNIT Tier 1 (13.5% employer), Tier 2 (5% employee)',
    additionalLevies: ['NHIL (2.5%)', 'GETFund (2.5%)', 'COVID-19 Health Levy (1%)'],
    activeClients: 82,
    statutoryFilingDay: '15th of each month for PAYE & Tier 1/2 returns',
    supportedCities: ['Accra', 'Kumasi', 'Takoradi', 'Tema']
  },
  {
    id: 'kenya',
    name: 'Kenya',
    currency: 'KES (KSh)',
    flag: '🇰🇪',
    statutoryBodies: ['KRA (Kenya Revenue Authority)', 'NSSF', 'SHIF (Social Health Insurance Fund)', 'Housing Levy'],
    payeRules: 'Graduated tax bands 10% to 35% with Monthly Personal Relief (KES 2,400)',
    pensionRules: 'NSSF Tier I (KES 420) & Tier II (KES 1,740) matching',
    additionalLevies: ['Affordable Housing Levy (1.5% employee, 1.5% employer)', 'SHIF 2.75% gross'],
    activeClients: 94,
    statutoryFilingDay: '9th of every month via KRA iTax portal',
    supportedCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru']
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    currency: 'ZAR (R)',
    flag: '🇿🇦',
    statutoryBodies: ['SARS (South African Revenue Service)', 'UIF (Unemployment Insurance Fund)', 'SDL (Skills Development Levy)'],
    payeRules: 'Progressive tax brackets 18% to 45% with primary/secondary rebates',
    pensionRules: 'Provident / Pension funds governed under Pension Funds Act',
    additionalLevies: ['UIF 1% employee + 1% employer (capped)', 'SDL 1% of total payroll'],
    activeClients: 110,
    statutoryFilingDay: '7th of every month (EMP201 declarations)',
    supportedCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria']
  },
  {
    id: 'uganda',
    name: 'Uganda',
    currency: 'UGX (USh)',
    flag: '🇺🇬',
    statutoryBodies: ['URA (Uganda Revenue Authority)', 'NSSF Uganda'],
    payeRules: 'PAYE rates from 0% up to 40% for high earners over UGX 10M monthly',
    pensionRules: 'NSSF 5% employee, 10% employer mandatory contribution',
    additionalLevies: ['Local Service Tax (LST) annually'],
    activeClients: 46,
    statutoryFilingDay: '15th of the subsequent month',
    supportedCities: ['Kampala', 'Entebbe', 'Jinja', 'Mbarara']
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    currency: 'TZS (TSh)',
    flag: '🇹🇿',
    statutoryBodies: ['TRA (Tanzania Revenue Authority)', 'NSSF / PSSSF', 'WCF (Workers Compensation Fund)', 'SDL'],
    payeRules: 'Progressive rates 9% to 30% depending on mainland vs Zanzibar registration',
    pensionRules: '10% employee contribution, 10% employer contribution',
    additionalLevies: ['WCF (0.5% private sector)', 'SDL (3.5% employer payroll)'],
    activeClients: 39,
    statutoryFilingDay: '7th of each month for PAYE and social security',
    supportedCities: ['Dar es Salaam', 'Arusha', 'Mwanza', 'Dodoma']
  },
  {
    id: 'rwanda',
    name: 'Rwanda',
    currency: 'RWF (FRw)',
    flag: '🇷🇼',
    statutoryBodies: ['RRA (Rwanda Revenue Authority)', 'RSSB (Rwanda Social Security Board)'],
    payeRules: 'Graduated bands 0%, 10%, 20%, 30%',
    pensionRules: 'RSSB Pension 3% employee + 5% employer',
    additionalLevies: ['Maternity Leave Scheme (0.3% employee + 0.3% employer)', 'Community Based Health Insurance'],
    activeClients: 31,
    statutoryFilingDay: '15th of each month via RRA E-Tax',
    supportedCities: ['Kigali', 'Rubavu', 'Huye']
  },
  {
    id: 'zambia',
    name: 'Zambia',
    currency: 'ZMW (K)',
    flag: '🇿🇲',
    statutoryBodies: ['ZRA (Zambia Revenue Authority)', 'NAPSA', 'NHIMA'],
    payeRules: 'Progressive tax system 0% up to 37.5%',
    pensionRules: 'NAPSA 5% employee + 5% employer contribution (capped)',
    additionalLevies: ['NHIMA Health Insurance (1% employee, 1% employer)'],
    activeClients: 28,
    statutoryFilingDay: '10th of each month (PAYE) & 10th (NAPSA)',
    supportedCities: ['Lusaka', 'Ndola', 'Kitwe', 'Livingstone']
  }
];

export const SAMPLE_PAYROLL_DATA: PayrollRecord[] = [
  {
    id: 'PAY-1082',
    employeeName: 'Amara Okafor',
    role: 'Lead Cloud Architect',
    department: 'Engineering',
    grossSalary: 1850000,
    allowances: 250000,
    overtime: 0,
    deductions: 35000,
    taxPAYE: 324000,
    pensionEmployee: 148000,
    pensionEmployer: 185000,
    netPay: 1593000,
    currency: 'NGN (₦)',
    status: 'Approved',
    payslipRef: 'NSHR-2026-09-001'
  },
  {
    id: 'PAY-1083',
    employeeName: 'Kwame Mensah',
    role: 'Regional Operations Director',
    department: 'Operations',
    grossSalary: 1650000,
    allowances: 300000,
    overtime: 45000,
    deductions: 20000,
    taxPAYE: 289000,
    pensionEmployee: 132000,
    pensionEmployer: 165000,
    netPay: 1554000,
    currency: 'NGN (₦)',
    status: 'Approved',
    payslipRef: 'NSHR-2026-09-002'
  },
  {
    id: 'PAY-1084',
    employeeName: 'Zainab Al-Hassan',
    role: 'Senior People Partner',
    department: 'Human Resources',
    grossSalary: 1100000,
    allowances: 150000,
    overtime: 0,
    deductions: 15000,
    taxPAYE: 178000,
    pensionEmployee: 88000,
    pensionEmployer: 110000,
    netPay: 969000,
    currency: 'NGN (₦)',
    status: 'Review Required',
    payslipRef: 'NSHR-2026-09-003'
  },
  {
    id: 'PAY-1085',
    employeeName: 'Tariq Ndlovu',
    role: 'Financial Systems Controller',
    department: 'Finance',
    grossSalary: 1400000,
    allowances: 180000,
    overtime: 25000,
    deductions: 10000,
    taxPAYE: 242000,
    pensionEmployee: 112000,
    pensionEmployer: 140000,
    netPay: 1241000,
    currency: 'NGN (₦)',
    status: 'Approved',
    payslipRef: 'NSHR-2026-09-004'
  },
  {
    id: 'PAY-1086',
    employeeName: 'Grace Achieng',
    role: 'Brand & Marketing Specialist',
    department: 'Growth',
    grossSalary: 850000,
    allowances: 120000,
    overtime: 15000,
    deductions: 8000,
    taxPAYE: 134000,
    pensionEmployee: 68000,
    pensionEmployer: 85000,
    netPay: 775000,
    currency: 'NGN (₦)',
    status: 'Calculated',
    payslipRef: 'NSHR-2026-09-005'
  }
];

export const SAMPLE_CANDIDATES: JobCandidate[] = [
  {
    id: 'CAND-01',
    name: 'Dr. Chidi Ekwueme',
    jobTitle: 'Senior People Analytics Lead',
    stage: 'Interview',
    experienceYears: 8,
    appliedDate: '2026-09-18',
    rating: 4.9,
    matchScore: 96,
    keySkills: ['Workforce Planning', 'HRIS Migration', 'Python', 'Executive Reporting']
  },
  {
    id: 'CAND-02',
    name: 'Fatima Sow',
    jobTitle: 'Senior Payroll Specialist (West Africa)',
    stage: 'Offer',
    experienceYears: 6,
    appliedDate: '2026-09-12',
    rating: 4.8,
    matchScore: 93,
    keySkills: ['Statutory Tax', 'SSNIT', 'FIRS iTax', 'Reconciliations']
  },
  {
    id: 'CAND-03',
    name: 'Tendai Mutasa',
    jobTitle: 'Talent Acquisition Partner',
    stage: 'Shortlisted',
    experienceYears: 5,
    appliedDate: '2026-09-22',
    rating: 4.5,
    matchScore: 88,
    keySkills: ['Tech Sourcing', 'Interview Design', 'LinkedIn Recruiter', 'Offer Closing']
  },
  {
    id: 'CAND-04',
    name: 'Aisha Bello',
    jobTitle: 'Employee Relations Specialist',
    stage: 'Screening',
    experienceYears: 4,
    appliedDate: '2026-09-25',
    rating: 4.3,
    matchScore: 84,
    keySkills: ['Policy Drafting', 'Dispute Resolution', 'Labour Law Compliance']
  },
  {
    id: 'CAND-05',
    name: 'Kofi Boateng',
    jobTitle: 'Compensation & Benefits Analyst',
    stage: 'Applied',
    experienceYears: 3,
    appliedDate: '2026-09-27',
    rating: 4.2,
    matchScore: 80,
    keySkills: ['Salary Benchmarking', 'Job Evaluation', 'Excel Modeling']
  }
];

export const COMPLIANCE_ITEMS: ComplianceTask[] = [
  {
    id: 'CMP-01',
    title: 'Monthly PAYE Remittance & Electronic Schedule Filing',
    country: 'Nigeria (LIRS & FIRS)',
    authority: 'Lagos State Internal Revenue',
    dueDate: '2026-10-10',
    status: 'Ready to File',
    riskLevel: 'High',
    documentsReady: true
  },
  {
    id: 'CMP-02',
    title: 'PenCom Mandated Pension Contribution Reconciliation',
    country: 'Nigeria',
    authority: 'PenCom Accredited Custodians (PFCs)',
    dueDate: '2026-10-14',
    status: 'Upcoming',
    riskLevel: 'High',
    documentsReady: true
  },
  {
    id: 'CMP-03',
    title: 'SSNIT Tier 1 & Tier 2 Statutory Submission',
    country: 'Ghana',
    authority: 'Social Security and National Insurance Trust',
    dueDate: '2026-10-15',
    status: 'Upcoming',
    riskLevel: 'Medium',
    documentsReady: true
  },
  {
    id: 'CMP-04',
    title: 'KRA Monthly iTax PAYE & Housing Levy Remittance',
    country: 'Kenya',
    authority: 'Kenya Revenue Authority',
    dueDate: '2026-10-09',
    status: 'Ready to File',
    riskLevel: 'High',
    documentsReady: true
  },
  {
    id: 'CMP-05',
    title: 'SARS EMP201 Monthly Return (PAYE, UIF, SDL)',
    country: 'South Africa',
    authority: 'South African Revenue Service',
    dueDate: '2026-10-07',
    status: 'Submitted',
    riskLevel: 'Low',
    documentsReady: true
  }
];

export const SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'TCK-4819',
    title: 'Discrepancy in voluntary pension deduction for September',
    client: 'Apex Global Logistics Ltd',
    category: 'Payroll Inquiry',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Oluwaseun Adeleke (Senior Payroll Lead)',
    createdAt: '2026-09-28 14:22',
    slaTarget: '4 hours (Met)'
  },
  {
    id: 'TCK-4820',
    title: 'Expedited contract generation for 12 contract workers in Nairobi',
    client: 'Kifaru FinTech Solutions',
    category: 'Employee Onboarding',
    priority: 'Medium',
    status: 'Assigned',
    assignedTo: 'Mercy Wanjiku (HR Specialist)',
    createdAt: '2026-09-29 08:45',
    slaTarget: '8 hours'
  },
  {
    id: 'TCK-4821',
    title: 'Verification of expatriate tax relief and CERPAC documentation',
    client: 'Starlight Mining Group',
    category: 'Statutory Tax',
    priority: 'Critical',
    status: 'Waiting',
    assignedTo: 'Emeka Nwosu (Compliance Counsel)',
    createdAt: '2026-09-27 16:30',
    slaTarget: '2 hours (Met)'
  },
  {
    id: 'TCK-4822',
    title: 'Integration setup for ZKTeco Biometric Clocking station',
    client: 'Harbour Maritime Services',
    category: 'System Access',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: 'Tobi Daniels (Tech Support)',
    createdAt: '2026-09-26 11:15',
    slaTarget: '24 hours (Met)'
  }
];

export const SERVICE_PACKAGES = [
  {
    id: 'payroll-only',
    name: 'Payroll Only',
    tagline: 'Precision payroll processing and statutory filings without administrative friction.',
    target: 'Businesses with internal HR that need dedicated payroll calculations and compliance accuracy.',
    accentColor: 'border-blue-700',
    features: [
      'Complete monthly gross-to-net payroll processing',
      'Statutory deduction filings (PAYE, Pension, NHF, Levies)',
      'Automated digital employee payslips & email dispatch',
      'Bank payment advice & multi-currency batch export',
      'Direct employee payroll queries support desk',
      'Year-end tax reconciliations & P60/Form H1 equivalents'
    ],
    startingPriceNGN: 180000,
    highlight: false
  },
  {
    id: 'hr-admin',
    name: 'HR Administration',
    tagline: 'Hands-on operational employee administration, leave, and documentation.',
    target: 'Companies seeking structured personnel files, contracts, and lifecycle coordination.',
    accentColor: 'border-slate-300',
    features: [
      'Centralized employee personnel files & digital archiving',
      'End-to-end digital onboarding & offboarding workflows',
      'Leave policy configuration & balance tracking',
      'Time, attendance & shift recording administration',
      'Official HR letters (promotions, confirmations, visas)',
      'Quarterly HR headcount & attrition reporting'
    ],
    startingPriceNGN: 240000,
    highlight: false
  },
  {
    id: 'hr-payroll',
    name: 'HR + Payroll',
    tagline: 'Our flagship integrated workforce engine. One unified outsourcing partner.',
    target: 'Mid-sized to growing enterprises wanting seamless HR data flows into payroll.',
    accentColor: 'border-lime-500',
    features: [
      'Everything in Payroll Only + HR Administration',
      'Unified cloud Employee Self-Service (ESS) & Manager (MSS) portal',
      'Direct link from approved leaves/overtime to payroll line items',
      'NextSofthr HR AI Copilot for employees and managers',
      'Dedicated HR Operations Account Specialist',
      'Standard SLA guarantee with 4-hour query response'
    ],
    startingPriceNGN: 380000,
    highlight: true,
    badge: 'Most Popular'
  },
  {
    id: 'managed-hr',
    name: 'Managed HR',
    tagline: 'Your outsourced people department: dedicated HR team + advanced tech.',
    target: 'Organizations requiring strategic guidance, employee relations, and policy leadership.',
    accentColor: 'border-blue-800',
    features: [
      'Dedicated Senior HR Business Partner & Payroll Lead',
      'Employee handbook & statutory policy drafting and regular reviews',
      'Performance review cycle orchestration & appraisal forms',
      'Employee disciplinary, grievances & mediation advisory',
      'Workforce planning and quarterly executive talent reviews',
      'Comprehensive monthly HR metrics & leadership presentations'
    ],
    startingPriceNGN: 620000,
    highlight: false
  },
  {
    id: 'enterprise',
    name: 'Enterprise Outsourcing',
    tagline: 'Bespoke multi-company, multi-country workforce outsourcing for large scale groups.',
    target: 'Pan-African and multinational groups with complex branch hierarchies and holding companies.',
    accentColor: 'border-slate-800',
    features: [
      'Multi-entity parent-subsidiary workforce segregation',
      'Multi-country African statutory tax engines & foreign currency payouts',
      'Custom ERP integrations (SAP, Oracle, NetSuite, Workday)',
      'Custom biometric device integrations & enterprise SSO (SAML/Okta)',
      'Dedicated enterprise delivery pod (3 specialists + lead counsel)',
      'Custom SLA with 1-hour priority support & quarterly onsite audit'
    ],
    startingPriceNGN: 1450000,
    highlight: false
  }
];
