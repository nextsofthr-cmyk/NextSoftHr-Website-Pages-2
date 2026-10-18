import {
  BillingCycle,
  CurrencyCode,
  CurrencyConfig,
  PricingPlan,
  ComparisonCategory,
  EssentialFeature,
  BusinessStage,
  SecurityFeature,
  Testimonial,
  IndustrySolution,
  AddOnItem,
  FAQItem,
} from "../types";

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  NGN: {
    code: "NGN",
    name: "Nigerian Naira",
    symbol: "₦",
    exchangeRate: 1550,
    region: "West Africa",
    flag: "🇳🇬",
    format: (val: number) => `₦${Math.round(val * 1550).toLocaleString()}`,
  },
  USD: {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    exchangeRate: 1,
    region: "Global Benchmark",
    flag: "🇺🇸",
    format: (val: number) => `$${Math.round(val).toLocaleString()}`,
  },
  GBP: {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    exchangeRate: 0.79,
    region: "United Kingdom",
    flag: "🇬🇧",
    format: (val: number) => `£${Math.round(val * 0.79).toLocaleString()}`,
  },
  KES: {
    code: "KES",
    name: "Kenyan Shilling",
    symbol: "KSh",
    exchangeRate: 130,
    region: "East Africa",
    flag: "🇰🇪",
    format: (val: number) => `KSh ${Math.round(val * 130).toLocaleString()}`,
  },
  ZAR: {
    code: "ZAR",
    name: "South African Rand",
    symbol: "R",
    exchangeRate: 18.2,
    region: "Southern Africa",
    flag: "🇿🇦",
    format: (val: number) => `R ${Math.round(val * 18.2).toLocaleString()}`,
  },
  GHS: {
    code: "GHS",
    name: "Ghanaian Cedi",
    symbol: "GH₵",
    exchangeRate: 15.5,
    region: "West Africa",
    flag: "🇬🇭",
    format: (val: number) => `GH₵ ${Math.round(val * 15.5).toLocaleString()}`,
  },
  MAD: {
    code: "MAD",
    name: "Moroccan Dirham",
    symbol: "MAD",
    exchangeRate: 9.9,
    region: "North Africa",
    flag: "🇲🇦",
    format: (val: number) => `${Math.round(val * 9.9).toLocaleString()} MAD`,
  },
  XAF: {
    code: "XAF",
    name: "Central African CFA Franc",
    symbol: "FCFA",
    exchangeRate: 605,
    region: "CEMAC / West Africa",
    flag: "🇨🇲",
    format: (val: number) => `${Math.round(val * 605).toLocaleString()} FCFA`,
  },
  AED: {
    code: "AED",
    name: "UAE Dirham",
    symbol: "AED",
    exchangeRate: 3.67,
    region: "Middle East",
    flag: "🇦🇪",
    format: (val: number) => `${Math.round(val * 3.67).toLocaleString()} AED`,
  },
  UGX: {
    code: "UGX",
    name: "Ugandan Shilling",
    symbol: "USh",
    exchangeRate: 3720,
    region: "East Africa",
    flag: "🇺🇬",
    format: (val: number) => `USh ${Math.round(val * 3720).toLocaleString()}`,
  },
  TZS: {
    code: "TZS",
    name: "Tanzanian Shilling",
    symbol: "TSh",
    exchangeRate: 2650,
    region: "East Africa",
    flag: "🇹🇿",
    format: (val: number) => `TSh ${Math.round(val * 2650).toLocaleString()}`,
  },
  RWF: {
    code: "RWF",
    name: "Rwandan Franc",
    symbol: "FRw",
    exchangeRate: 1350,
    region: "East Africa",
    flag: "🇷🇼",
    format: (val: number) => `${Math.round(val * 1350).toLocaleString()} FRw`,
  },
  ZMW: {
    code: "ZMW",
    name: "Zambian Kwacha",
    symbol: "ZK",
    exchangeRate: 26.5,
    region: "Southern Africa",
    flag: "🇿🇲",
    format: (val: number) => `ZK ${Math.round(val * 26.5).toLocaleString()}`,
  },
  EGP: {
    code: "EGP",
    name: "Egyptian Pound",
    symbol: "E£",
    exchangeRate: 48.5,
    region: "North Africa",
    flag: "🇪🇬",
    format: (val: number) => `E£ ${Math.round(val * 48.5).toLocaleString()}`,
  },
  ZIP: {
    code: "ZIP",
    name: "Zimbabwe Gold (ZiG)",
    symbol: "ZiG",
    exchangeRate: 27.5,
    region: "Southern Africa",
    flag: "🇿🇼",
    format: (val: number) => `ZiG ${Math.round(val * 27.5).toLocaleString()}`,
  },
  EUR: {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    exchangeRate: 0.92,
    region: "European Union",
    flag: "🇪🇺",
    format: (val: number) => `€${Math.round(val * 0.92).toLocaleString()}`,
  },
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline:
      "For small businesses getting started with professional HR and payroll management.",
    monthlyPrice: 29,
    yearlyPrice: 24,
    perEmployeeAfterLimit: 2,
    employeeAllowanceText: "Includes up to 15 employees",
    recommendedEmployeeRange: "10 – 30 employees",
    keyFeatures: [
      "Employee management & profiles",
      "Basic HR dashboard & analytics",
      "Attendance tracking & clock-in",
      "Leave management & requests",
      "Employee self-service (ESS) portal",
      "Basic compliant payroll runs",
      "Standard email & push notifications",
      "Mobile-friendly browser access",
      "Email support (24–48h response)",
    ],
    ctaText: "Start Free Trial",
    ctaAction: "trial",
    supportLevel: "Standard Email Support",
    upgradeIndicator: "Standard HR essentials",
  },
  {
    id: "professional",
    name: "Professional",
    isPopular: true,
    tagline:
      "For growing businesses needing advanced HR, automated payroll and workforce management.",
    monthlyPrice: 79,
    yearlyPrice: 64,
    perEmployeeAfterLimit: 3,
    employeeAllowanceText: "Includes up to 50 employees",
    recommendedEmployeeRange: "30 – 150 employees",
    highlightText: "Most Popular Choice for Scaling Teams",
    keyFeatures: [
      "Everything in Starter, plus:",
      "Advanced multi-tier payroll & tax rules",
      "Time & attendance with shift scheduling",
      "Staff scheduling & overtime rules",
      "Custom leave approval workflows",
      "Recruitment & applicant pipeline",
      "Performance appraisals & review cycles",
      "Employee expense claims & reimbursements",
      "Document management & e-signatures",
      "Multiple departments & sub-locations",
      "AI HR & Payroll Assistant included",
      "Priority live chat & email support",
    ],
    ctaText: "Start Free Trial",
    ctaAction: "trial",
    supportLevel: "Priority Support (Chat & Email)",
    upgradeIndicator: "Includes AI Assistant & Shift Scheduling",
  },
  {
    id: "business",
    name: "Business",
    tagline:
      "For established businesses managing larger teams, multiple branches and complex operations.",
    monthlyPrice: 179,
    yearlyPrice: 144,
    perEmployeeAfterLimit: 3.5,
    employeeAllowanceText: "Includes up to 150 employees",
    recommendedEmployeeRange: "150 – 800 employees",
    keyFeatures: [
      "Everything in Professional, plus:",
      "Multiple branches & multi-company structure",
      "Advanced payroll processing & custom formulas",
      "Granular role-based employee permissions",
      "Project management & task tracking",
      "Built-in CRM & customer contacts",
      "Finance management & budget allocations",
      "Advanced business analytics & executive reports",
      "Custom workflow automation triggers",
      "Full REST API access & webhooks",
      "Advanced AI business insights & forecasting",
      "Dedicated onboarding specialist",
    ],
    ctaText: "Start Free Trial",
    ctaAction: "trial",
    supportLevel: "Dedicated Onboarding & Priority Support",
    upgradeIndicator: "Multi-company, CRM & REST API",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline:
      "For large organizations requiring advanced control, custom security, deep integrations and bespoke SLAs.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    employeeAllowanceText: "Unlimited employees & locations",
    recommendedEmployeeRange: "800+ employees",
    keyFeatures: [
      "Everything in Business, plus:",
      "Unlimited scalability & custom architecture",
      "Enterprise multi-country payroll setup",
      "Custom role hierarchies & approvals",
      "Enterprise reporting & custom dashboards",
      "SSO (SAML 2.0 / Okta / Azure AD)",
      "Enterprise audit logs & compliance vault",
      "Dedicated Customer Success Manager",
      "Custom integration engineering & APIs",
      "Data migration assistance from legacy HRIS",
      "Custom SLA guarantees (99.95% uptime)",
      "24/7 Premium executive support line",
    ],
    ctaText: "Contact Sales",
    ctaAction: "enterprise",
    supportLevel: "24/7 Dedicated Account Manager & SLAs",
    upgradeIndicator: "Full custom security, SSO & Enterprise SLA",
  },
];

export const ESSENTIAL_FEATURES: EssentialFeature[] = [
  {
    title: "Employee Management",
    description:
      "Centralized profiles, personal details, contracts, emergency contacts, and organizational structure.",
    iconName: "Users",
  },
  {
    title: "HR Management",
    description:
      "Department hierarchies, digital document vaults, automated milestone tracking, and company announcements.",
    iconName: "Building2",
  },
  {
    title: "Attendance & Time",
    description:
      "GPS/IP-verified clock-in, biometric terminal sync, break timers, and automatic timesheet generation.",
    iconName: "Clock",
  },
  {
    title: "Leave Management",
    description:
      "Custom leave categories, policy configurations, balance tracking, and multi-tier manager approval flows.",
    iconName: "CalendarCheck",
  },
  {
    title: "Payroll Processing",
    description:
      "Automated gross-to-net calculations, tax brackets, benefit deductions, allowances, and digital payslips.",
    iconName: "Wallet",
  },
  {
    title: "Employee Self-Service",
    description:
      "Mobile-friendly portal for staff to view payslips, request time-off, update info, and log expenses.",
    iconName: "Smartphone",
  },
  {
    title: "Reports & Analytics",
    description:
      "Headcount trends, turnover metrics, payroll disbursement graphs, and exportable CSV/PDF summaries.",
    iconName: "BarChart3",
  },
  {
    title: "Smart Notifications",
    description:
      "Automated reminders for contract renewals, payroll runs, probation reviews, and pending approvals.",
    iconName: "BellRing",
  },
  {
    title: "Enterprise Security",
    description:
      "End-to-end data encryption at rest and in transit, multi-factor authentication, and strict role guards.",
    iconName: "ShieldCheck",
  },
  {
    title: "Mobile Access",
    description:
      "Fast, responsive experience across iOS, Android, tablets, and desktop workstations without app downloads.",
    iconName: "MonitorSmartphone",
  },
  {
    title: "Cloud Infrastructure",
    description:
      "High-availability global cloud hosting with automatic data backups, zero server maintenance, and fast page loads.",
    iconName: "Cloud",
  },
  {
    title: "AI Assistance",
    description:
      "Built-in intelligent copilot providing rapid answers, payroll checks, absence insights, and HR drafting.",
    iconName: "Sparkles",
  },
];

export const BUSINESS_STAGES: BusinessStage[] = [
  {
    stage: "Small Business",
    employees: "10–50 employees",
    headline: "Eliminate spreadsheets and manual paperwork",
    description:
      "Empower a lean management team with automated onboarding, accurate time tracking, and error-free payroll in minutes.",
    idealPlan: "Starter or Professional",
    highlights: [
      "1-Click monthly payroll",
      "Direct employee mobile portal",
      "Instant leave approvals",
    ],
  },
  {
    stage: "Growing Business",
    employees: "50–250 employees",
    headline: "Standardize operations across multiple departments",
    description:
      "Coordinate rotating shifts, manage applicant pipelines, enforce customized approval policies, and leverage AI insights.",
    idealPlan: "Professional",
    highlights: [
      "Multi-department budgeting",
      "Shift scheduling & overtime caps",
      "Automated performance reviews",
    ],
  },
  {
    stage: "Established Business",
    employees: "250–1,000 employees",
    headline: "Unify multiple branches, companies, and workflows",
    description:
      "Consolidate multiple subsidiary payrolls, connect CRM and finance ledgers, and maintain enterprise audit compliance.",
    idealPlan: "Business",
    highlights: [
      "Multi-entity management",
      "Cross-branch reporting",
      "REST API & Webhooks",
    ],
  },
  {
    stage: "Enterprise",
    employees: "1,000+ employees",
    headline: "Global workforce governance with custom security",
    description:
      "Tailored implementations, dedicated solution architects, custom SSO policies, multi-country compliance, and bespoke SLAs.",
    idealPlan: "Enterprise",
    highlights: [
      "SAML SSO & custom RBAC",
      "Bespoke integration engineering",
      "Dedicated Account Executive",
    ],
  },
];

export const SECURITY_FEATURES: SecurityFeature[] = [
  {
    title: "Secure Cloud Infrastructure",
    description:
      "Hosted on enterprise-grade cloud datacenters with automated failover, load balancing, and high availability.",
    iconName: "Server",
  },
  {
    title: "Role-Based Access Control",
    description:
      "Granular permissions that ensure managers, payroll officers, and employees only view authorized information.",
    iconName: "UserCheck",
  },
  {
    title: "Granular User Permissions",
    description:
      "Define custom roles with fine-tuned read, write, and approval privileges across every department.",
    iconName: "Lock",
  },
  {
    title: "Data Protection & Encryption",
    description:
      "All employee records, salaries, and sensitive data are encrypted using standard AES-256 and TLS 1.3 encryption.",
    iconName: "KeyRound",
  },
  {
    title: "Immutable Audit Trails",
    description:
      "Detailed activity logs recording all system actions, payroll approvals, data changes, and user sign-ins.",
    iconName: "FileText",
  },
  {
    title: "Secure Authentication",
    description:
      "Enforce multi-factor authentication (MFA), password complexity rules, session timeouts, and SAML SSO.",
    iconName: "Fingerprint",
  },
  {
    title: "Automated Backup & Recovery",
    description:
      "Daily automated snapshot backups with redundant geo-distributed replication and tested recovery routines.",
    iconName: "DatabaseBackup",
  },
  {
    title: "Privacy & Data Governance",
    description:
      "Comprehensive consent management, data retention configurations, and strict data confidentiality protocols.",
    iconName: "EyeOff",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Amara Okafor",
    role: "Head of People & Culture",
    company: "Apex Logistics Group",
    industry: "Logistics & Supply Chain",
    location: "Lagos & Nairobi",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    quote:
      "Before NextSofthr, running monthly payroll for 380 employees across 4 distribution hubs took our team four days. Now our payroll processing is finalized and verified in under two hours.",
    verifiedBenefit: "Saved 28 administrative hours each monthly payroll cycle",
  },
  {
    name: "Marcus Vance",
    role: "Chief Operating Officer",
    company: "Sterling Health Network",
    industry: "Healthcare Services",
    location: "London & Manchester",
    avatarUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    quote:
      "Shift scheduling and nurse attendance used to cause constant operational friction. NextSofthr gave us real-time visibility into shift coverage, overtime, and leave balances in one clean dashboard.",
    verifiedBenefit: "Eliminated shift scheduling overlaps across 6 clinics",
  },
  {
    name: "Elena Rostova",
    role: "Managing Director",
    company: "Nova Digital Solutions",
    industry: "Technology & Consulting",
    location: "Amsterdam",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    quote:
      "The employee self-service portal empowered our distributed staff to access their payslips and request time off without messaging HR. It elevated our workforce experience completely.",
    verifiedBenefit: "Reduced routine HR inquiries by over 60%",
  },
  {
    name: "David K. Mensah",
    role: "Financial Controller",
    company: "Summit Manufacturing Ltd",
    industry: "Manufacturing",
    location: "Accra",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote:
      "The integration between employee attendance timesheets and payroll deductions has been seamless. The built-in AI assistant helps me double-check tax deductions before final authorization.",
    verifiedBenefit: "100% accurate salary calculations and timely dispatches",
  },
];

export const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    id: "retail",
    name: "Retail",
    iconName: "ShoppingBag",
    tagline: "Multi-store shifts & hourly payroll",
    description:
      "Manage store staff across multiple retail outlets, track peak hour attendance, and automate overtime calculations.",
    keyWorkflows: [
      "Store rota management",
      "Hourly & salaried wages",
      "Staff clock-in verification",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "restaurants",
    name: "Restaurants & Food",
    iconName: "Utensils",
    tagline: "Fast-paced shift scheduling & tips",
    description:
      "Optimize front-of-house and kitchen staff rosters, reduce no-shows, and ensure prompt wage distribution.",
    keyWorkflows: [
      "Split shifts & meal breaks",
      "Tip allocations & allowances",
      "Immediate mobile notifications",
    ],
    imageUrl:
      "https://img.magnific.com/free-photo/stylish-african-woman-red-shirt-hat-posed-indoor-cafe-drinking-pineapple-lemonade_627829-2425.jpg?t=st=1792143158~exp=1792146758~hmac=e153a340058526a52195f674ebb2c2ce7865d1290873dde31d1d55790c1eb967&amp;w=740",
  },
  {
    id: "hospitality",
    name: "Hospitality & Hotels",
    iconName: "Hotel",
    tagline: "24/7 guest service workforce",
    description:
      "Coordinate rotating 24/7 housekeeping, reception, and culinary crews with dynamic schedule swapping.",
    keyWorkflows: [
      "Multi-department rotations",
      "Holiday premium pay",
      "Temporary staff onboarding",
    ],
    imageUrl:
      "https://img.magnific.com/premium-photo/happy-african-american-family-eating-lunch-together-restaurant-having-fun_146105-102613.jpg?w=360",
  },
  {
    id: "healthcare",
    name: "Healthcare & Clinics",
    iconName: "Stethoscope",
    tagline: "Compliant clinical staffing",
    description:
      "Ensure adequate nurse-to-patient staffing, manage certifications and licenses, and monitor on-call hours.",
    keyWorkflows: [
      "Credential tracking",
      "Strict compliance records",
      "Emergency shift backfills",
    ],
    imageUrl:
      "https://img.magnific.com/premium-photo/employment-elegance-employee-photo_960396-67028.jpg?w=360",
  },
  {
    id: "education",
    name: "Education & Schools",
    iconName: "GraduationCap",
    tagline: "Academic terms & faculty payroll",
    description:
      "Handle tenured teachers, administrative staff, term-based contracts, and academic calendar leave cycles.",
    keyWorkflows: [
      "Academic term calendars",
      "Adjunct faculty contracts",
      "Departmental approval ladders",
    ],
    imageUrl:
      "https://img.magnific.com/free-photo/young-student-working-assignment_23-2149257177.jpg?t=st=1792143516~exp=1792147116~hmac=ca1b1c7adcba9db63d621a739713b3a0746f39b00c3e73b9aa1d17966ebfa6a8&amp;w=360",
  },
  {
    id: "professional-services",
    name: "Professional Services",
    iconName: "Briefcase",
    tagline: "Billable time & client project HR",
    description:
      "Track billable consultant hours, manage professional travel expense reimbursements, and evaluate project KPIs.",
    keyWorkflows: [
      "Client expense claims",
      "Quarterly goal reviews",
      "Flexible remote check-in",
    ],
    imageUrl:
      "https://img.magnific.com/premium-photo/hotel-manager-overseeing-employee-training_622301-8138.jpg?w=360",
  },
  {
    id: "construction",
    name: "Construction",
    iconName: "HardHat",
    tagline: "On-site workforce & subcontractor tracking",
    description:
      "Track worker clock-ins on job sites with geo-fencing, monitor safety trainings, and manage project-based crews.",
    keyWorkflows: [
      "Geo-location attendance",
      "Safety document archives",
      "Subcontractor registry",
    ],
    imageUrl:
      "https://img.magnific.com/free-photo/black-employee-works-with-ai-tools-enhance-package-tracking-efficiency_482257-129881.jpg?t=st=1792143935~exp=1792147535~hmac=f86ce6cc3c3f60fb5d18763c3b81880d9c12421c0546e8090e7d4658a190f276&amp;w=740",
  },
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    iconName: "Truck",
    tagline: "Drivers, warehouse shifts & fleet staff",
    description:
      "Keep round-the-clock distribution centers staffed, track dispatch personnel hours, and automate trip allowances.",
    keyWorkflows: [
      "Warehouse shift cycles",
      "Trip per-diem allowances",
      "Performance milestones",
    ],
    imageUrl:
      "https://img.magnific.com/free-photo/afro-american-man-suit-holding-documents-talking-female-boss_1098-20604.jpg?t=st=1792143687~exp=1792147287~hmac=35cd9d0840422839546b93605bd4880cba5014b95b28fa3001d78158705e88ab&amp;w=1480",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    iconName: "Factory",
    tagline: "Plant floor workforce & overtime rules",
    description:
      "Integrate assembly line biometric turnstiles, automate complex multi-shift overtime policies, and enforce safety checks.",
    keyWorkflows: [
      "Biometric clock sync",
      "Triple-shift rotations",
      "Overtime premium formulas",
    ],
    imageUrl:
      "https://img.magnific.com/free-photo/woman-debugging-optimizing-code-using-ai_482257-124593.jpg?t=st=1792144168~exp=1792147768~hmac=41c2b7199ed2d1eb13efa7be4807061bce2ab564a8ea84c458e83c1a52e44427&amp;w=360",
  },
  {
    id: "technology",
    name: "Technology & SaaS",
    iconName: "Laptop",
    tagline: "Hybrid teams, equity & performance",
    description:
      "Support high-performing engineering and sales teams with seamless onboarding, stock option tracking, and 360 reviews.",
    keyWorkflows: [
      "Remote onboarding workflows",
      "Goal-setting (OKRs)",
      "Multi-currency compensation",
    ],
    imageUrl:
      "https://img.magnific.com/free-photo/data-center-expert-doing-software-updates-verifying-machine-learning-parameters_482257-127247.jpg?t=st=1792144231~exp=1792147831~hmac=573dcdcd13307904171a97331b24c4eb9737cc4f86270c00e25cc88594fd6dfa&amp;w=740",
  },
  {
    id: "finance",
    name: "Finance & Banking",
    iconName: "Landmark",
    tagline: "Audit-ready payroll & strict access",
    description:
      "Meet demanding compliance requirements with segregated financial approvals, detailed audit trails, and strict encryption.",
    keyWorkflows: [
      "Dual-signature authorization",
      "Regulatory tax filing reports",
      "Zero-leakage confidentiality",
    ],
    imageUrl:
      "https://img.magnific.com/premium-photo/african-american-woman-handling-labeling-with-shipment-details-adhesive-tags-working-processing_482257-132583.jpg?w=740",
  },
  {
    id: "nonprofits",
    name: "Nonprofits & NGOs",
    iconName: "HeartHandshake",
    tagline: "Donor grant time allocation & volunteers",
    description:
      "Allocate payroll accurately to grant budgets, manage field worker stipends, and maintain clean donor audit records.",
    keyWorkflows: [
      "Grant-specific timesheets",
      "Volunteer records",
      "Transparent expense tracking",
    ],
    imageUrl:
      "https://img.magnific.com/premium-photo/charity-food-drive-volunteers-share-provisions-food-with-homeless-young-people-offer-their-time-feed-hungry-less-fortunate-exhibiting-spirit-volunteerism-handheld_482257-74147.jpg?w=1060",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    iconName: "Globe",
    tagline: "Fulfillment crews & peak season scaling",
    description:
      "Scale workforce rapidly for seasonal shopping surges, coordinate customer support shifts, and manage packaging teams.",
    keyWorkflows: [
      "Seasonal staff flex-up",
      "Customer support shifts",
      "Performance incentives",
    ],
    imageUrl:
      "https://img.magnific.com/free-photo/influencer-doing-shopping-haul_482257-81602.jpg?t=st=1792144568~exp=1792148168~hmac=2fcc77de0d75a3f32f36771d50cbd39b38c1734afbabae7e4d709b16d12e20d0&amp;w=360",
  },
];

export const ADD_ONS: AddOnItem[] = [
  {
    id: "addon-payroll-adv",
    name: "Advanced Payroll & Multi-Tax Engine",
    description:
      "Custom gross-to-net tax formulas, statutory pension returns, and split-currency compensation disbursement.",
    monthlyPrice: 25,
    yearlyPrice: 20,
    unitText: "per company / mo",
  },
  {
    id: "addon-recruitment",
    name: "Recruitment & Applicant Tracking (ATS)",
    description:
      "Branded careers page, resume parser, automated interview scheduling, and collaborative candidate scoring.",
    monthlyPrice: 35,
    yearlyPrice: 28,
    unitText: "per active pipeline / mo",
  },
  {
    id: "addon-performance",
    name: "Performance Management & 360 Reviews",
    description:
      "Custom appraisal cycles, company-wide OKRs/KPIs, peer feedback matrices, and career growth pathways.",
    monthlyPrice: 30,
    yearlyPrice: 24,
    unitText: "per organization / mo",
  },
  {
    id: "addon-crm",
    name: "Integrated Business CRM",
    description:
      "Manage sales pipelines, customer directories, communication history, and client contracts directly in NextSofthr.",
    monthlyPrice: 40,
    yearlyPrice: 32,
    unitText: "per 5 sales seats / mo",
  },
  {
    id: "addon-projects",
    name: "Project & Task Management",
    description:
      "Kanban project boards, milestone tracking, timesheet allocation to client projects, and resource utilization charts.",
    monthlyPrice: 30,
    yearlyPrice: 24,
    unitText: "per workspace / mo",
  },
  {
    id: "addon-analytics",
    name: "Advanced Workforce Analytics & BI",
    description:
      "Customizable executive dashboards, predictive turnover alerts, compensation benchmarking, and scheduled data exports.",
    monthlyPrice: 45,
    yearlyPrice: 36,
    unitText: "per admin / mo",
  },
  {
    id: "addon-ai-business",
    name: "Advanced AI Business Copilot",
    description:
      "Unlimited AI queries, automated policy drafting, smart payroll discrepancy audits, and natural-language report synthesis.",
    monthlyPrice: 25,
    yearlyPrice: 20,
    unitText: "per organization / mo",
  },
  {
    id: "addon-api",
    name: "Extended API & Webhooks Engine",
    description:
      "High-throughput REST API calls, real-time webhooks, dedicated sandbox environment, and ERP data connector.",
    monthlyPrice: 50,
    yearlyPrice: 40,
    unitText: "per API endpoint group / mo",
  },
  {
    id: "addon-storage",
    name: "Additional Secure Cloud Storage",
    description:
      "Extra 500GB encrypted cloud storage for employee contracts, scanned certificates, and historic financial records.",
    monthlyPrice: 15,
    yearlyPrice: 12,
    unitText: "per 500 GB block / mo",
  },
  {
    id: "addon-companies",
    name: "Additional Subsidiary Entities",
    description:
      "Manage independent corporate legal entities with distinct tax IDs, bank accounts, and payroll structures under one master account.",
    monthlyPrice: 45,
    yearlyPrice: 36,
    unitText: "per entity / mo",
  },
  {
    id: "addon-locations",
    name: "Additional Branch Locations",
    description:
      "Configure separate office or store physical locations with localized holiday calendars and shift rules.",
    monthlyPrice: 20,
    yearlyPrice: 16,
    unitText: "per 3 branch pack / mo",
  },
];

export const COMPARISON_DATA: ComparisonCategory[] = [
  {
    category: "HR Management",
    iconName: "Users",
    features: [
      {
        name: "Employee profiles & directory",
        starter: "Basic",
        professional: "Full",
        business: "Advanced",
        enterprise: "Unlimited Custom",
      },
      {
        name: "Departments & teams",
        starter: "Up to 3",
        professional: "Multiple",
        business: "Unlimited",
        enterprise: "Unlimited Multi-org",
      },
      {
        name: "Office locations & branches",
        starter: "1 Location",
        professional: "Up to 5",
        business: "Unlimited",
        enterprise: "Global Multi-country",
      },
      {
        name: "Employee document vault",
        starter: "Standard (5GB)",
        professional: "25GB + E-sign",
        business: "100GB + Auto-archive",
        enterprise: "Unlimited + Compliance Vault",
      },
      {
        name: "Employee Self-Service (ESS)",
        starter: true,
        professional: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Custom HR approval workflows",
        starter: false,
        professional: "Up to 3 levels",
        business: "Unlimited conditional",
        enterprise: "Advanced Enterprise Engine",
      },
    ],
  },
  {
    category: "Time & Attendance",
    iconName: "Clock",
    features: [
      {
        name: "Attendance tracking & check-in",
        starter: "Web & Mobile",
        professional: "Web, Mobile, GPS",
        business: "Biometric + Geo-fence",
        enterprise: "Full Hardware & API Sync",
      },
      {
        name: "Digital clock in / out & breaks",
        starter: true,
        professional: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Automatic timesheets",
        starter: "Weekly / Monthly",
        professional: "Real-time Daily",
        business: "Multi-project linked",
        enterprise: "Enterprise ERP Linked",
      },
      {
        name: "Overtime calculation rules",
        starter: false,
        professional: "Standard 1.5x / 2x",
        business: "Custom policy engine",
        enterprise: "Complex Multi-tier Overtime",
      },
      {
        name: "Shift management & rotations",
        starter: false,
        professional: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Staff scheduling & conflict alerts",
        starter: false,
        professional: true,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Leave Management",
    iconName: "CalendarCheck",
    features: [
      {
        name: "Leave requests via portal",
        starter: true,
        professional: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Multi-level leave approvals",
        starter: "1-Step Manager",
        professional: "Multi-level hierarchy",
        business: "Conditional rules",
        enterprise: "Custom approval matrices",
      },
      {
        name: "Configurable leave policies",
        starter: "3 standard policies",
        professional: "Unlimited policies",
        business: "Unlimited policies",
        enterprise: "Multi-country policy rules",
      },
      {
        name: "Automated leave balances & accruals",
        starter: true,
        professional: true,
        business: true,
        enterprise: true,
      },
      {
        name: "National & regional holiday calendars",
        starter: "Single calendar",
        professional: "Multi-region",
        business: "Multi-country",
        enterprise: "Custom global calendars",
      },
    ],
  },
  {
    category: "Payroll",
    iconName: "Wallet",
    features: [
      {
        name: "Automated payroll processing",
        starter: "Standard Run",
        professional: "Automated Multi-tier",
        business: "Batch processing",
        enterprise: "High-volume Multi-country",
      },
      {
        name: "Salary & compensation structures",
        starter: "Fixed salary",
        professional: "Salary + Hourly",
        business: "Multi-component matrix",
        enterprise: "Custom compensation models",
      },
      {
        name: "Deductions (Pension, Loans, Insurance)",
        starter: "Standard deductions",
        professional: "Configurable deductions",
        business: "Advanced automatic rules",
        enterprise: "Custom regulatory rules",
      },
      {
        name: "Allowances & bonuses",
        starter: "Manual entry",
        professional: "Recurring & one-off",
        business: "Rule-based automated",
        enterprise: "Enterprise compensation formulas",
      },
      {
        name: "Payroll audit & compliance reports",
        starter: "Basic CSV",
        professional: "Detailed PDF/Excel",
        business: "Executive & Departmental",
        enterprise: "Full Regulatory Vault",
      },
      {
        name: "Employee digital payslips",
        starter: true,
        professional: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Tax-related payroll configuration",
        starter: "Standard tax tables",
        professional: "Configurable brackets",
        business: "Multi-tax jurisdictions",
        enterprise: "Enterprise tax compliance setup",
      },
    ],
  },
  {
    category: "Recruitment",
    iconName: "UserPlus",
    features: [
      {
        name: "Job vacancies & postings",
        starter: false,
        professional: "Up to 5 active",
        business: "Unlimited openings",
        enterprise: "Unlimited with Careers Site",
      },
      {
        name: "Applicant Tracking System (ATS)",
        starter: false,
        professional: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Candidate pipeline stages",
        starter: false,
        professional: "Standard stages",
        business: "Custom pipeline stages",
        enterprise: "Multi-department pipelines",
      },
      {
        name: "Interview scheduling & scoring",
        starter: false,
        professional: "Standard calendar",
        business: "Scorecards & teams",
        enterprise: "Automated scheduling + Video",
      },
      {
        name: "Recruitment approval workflows",
        starter: false,
        professional: false,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Performance",
    iconName: "TrendingUp",
    features: [
      {
        name: "Goal tracking & OKRs",
        starter: false,
        professional: "Individual goals",
        business: "Cascading team OKRs",
        enterprise: "Strategic enterprise OKRs",
      },
      {
        name: "Performance review cycles",
        starter: false,
        professional: "Annual & bi-annual",
        business: "Continuous 360 cycles",
        enterprise: "Bespoke appraisal matrices",
      },
      {
        name: "KPI metrics tracking",
        starter: false,
        professional: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Employee evaluations & self-appraisals",
        starter: false,
        professional: true,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Finance & Expenses",
    iconName: "Receipt",
    features: [
      {
        name: "Expense claim submission",
        starter: false,
        professional: "Receipt uploads",
        business: "Multi-currency receipts",
        enterprise: "Corporate card integration",
      },
      {
        name: "Multi-tier expense approvals",
        starter: false,
        professional: "Direct manager",
        business: "Manager + Finance",
        enterprise: "Custom policy thresholds",
      },
      {
        name: "Financial & payroll cost reports",
        starter: "Basic summary",
        professional: "Departmental breakdown",
        business: "Budget variance reports",
        enterprise: "Full ERP ledger integration",
      },
      {
        name: "Budget tracking by department",
        starter: false,
        professional: false,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Business Management",
    iconName: "Briefcase",
    features: [
      {
        name: "Customer Relationship Management (CRM)",
        starter: false,
        professional: false,
        business: "Included",
        enterprise: "Advanced enterprise CRM",
      },
      {
        name: "Project & milestone management",
        starter: false,
        professional: false,
        business: "Included",
        enterprise: "Advanced project portfolio",
      },
      {
        name: "Task allocation & tracking",
        starter: false,
        professional: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Business operational reports",
        starter: "HR Only",
        professional: "HR + Payroll",
        business: "All-in-one Business Suite",
        enterprise: "Custom BI data warehouse",
      },
    ],
  },
  {
    category: "AI Assistant",
    iconName: "Sparkles",
    features: [
      {
        name: "AI HR Assistant",
        starter: false,
        professional: "Standard (100 queries/mo)",
        business: "Advanced (500 queries/mo)",
        enterprise: "Unlimited queries",
      },
      {
        name: "AI Payroll Assistant & audits",
        starter: false,
        professional: "Discrepancy alerts",
        business: "Automated reconciliation",
        enterprise: "Predictive payroll intelligence",
      },
      {
        name: "AI natural language reporting",
        starter: false,
        professional: "Basic summaries",
        business: "Deep business insights",
        enterprise: "Custom LLM fine-tuning",
      },
      {
        name: "AI employee assistance copilot",
        starter: false,
        professional: false,
        business: "Staff policy queries",
        enterprise: "Omni-channel bot (Slack/Teams)",
      },
    ],
  },
  {
    category: "Enterprise & Security",
    iconName: "ShieldCheck",
    features: [
      {
        name: "REST API & Webhooks",
        starter: false,
        professional: false,
        business: "Standard access",
        enterprise: "High-throughput custom endpoints",
      },
      {
        name: "Single Sign-On (SSO / SAML 2.0)",
        starter: false,
        professional: false,
        business: false,
        enterprise: "Okta, Azure AD, Google Workspace",
      },
      {
        name: "Comprehensive audit logs",
        starter: "7 days",
        professional: "90 days",
        business: "1 Year retention",
        enterprise: "Indefinite compliance vault",
      },
      {
        name: "Advanced custom role permissions",
        starter: false,
        professional: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Dedicated Customer Success Manager",
        starter: false,
        professional: false,
        business: "Onboarding support",
        enterprise: "Dedicated Account Executive",
      },
      {
        name: "Custom SLA & 24/7 emergency support",
        starter: false,
        professional: false,
        business: false,
        enterprise: "99.95% Uptime SLA Guarantee",
      },
    ],
  },
];

export const AI_ASSISTANT_EXAMPLES = [
  {
    id: "absent",
    question: "How many employees were absent this month?",
    badge: "Attendance Copilot",
    responseHeadline: "Attendance Summary: Current Billing Cycle",
    stats: [
      { label: "Total Absences", value: "6 recorded", sub: "Across 142 staff" },
      { label: "Unplanned Rate", value: "1.2%", sub: "Within healthy range" },
      { label: "Top Reason", value: "Medical Leave", sub: "4 of 6 validated" },
    ],
    explanation:
      "A total of 6 absence days were recorded this calendar month across 3 departments. All have submitted valid doctor notes or prior leave notices. Operations department achieved 100% attendance.",
    actionPill: "Download Detailed Absenteeism Report (PDF)",
  },
  {
    id: "payroll-summary",
    question: "Calculate this month's payroll summary.",
    badge: "Payroll Engine",
    responseHeadline: "Gross-to-Net Payroll Reconciliation",
    stats: [
      { label: "Gross Payroll", value: "$84,250.00", sub: "Base + allowances" },
      {
        label: "Total Deductions",
        value: "$16,850.00",
        sub: "Taxes, pension, loans",
      },
      { label: "Net Payable", value: "$67,400.00", sub: "142 bank accounts" },
    ],
    explanation:
      "Automated payroll calculations completed for 142 employees. No statutory calculation conflicts detected. Direct bank transfer batch file is formatted and ready for your review.",
    actionPill: "Authorize & Dispatch Payslips",
  },
  {
    id: "leave-balance",
    question: "Show employees whose leave balance is low.",
    badge: "Leave Intelligence",
    responseHeadline: "3 Employees with ≤ 2 Days Remaining",
    stats: [
      { label: "Sarah Jenkins", value: "1.5 Days", sub: "Engineering Lead" },
      {
        label: "Tunde Adebayo",
        value: "0.0 Days",
        sub: "Senior Logistics Mgr",
      },
      { label: "Chloe Martin", value: "2.0 Days", sub: "Customer Support" },
    ],
    explanation:
      "Identified 3 team members who have exhausted or nearly depleted their annual leave quota for this cycle. System alerts can prompt their direct supervisors regarding wellness and scheduling.",
    actionPill: "View Accrual Forecast Table",
  },
  {
    id: "attendance-report",
    question: "Create an attendance report.",
    badge: "Report Generator",
    responseHeadline: "Workforce Attendance & Punctuality Index",
    stats: [
      { label: "On-Time Rate", value: "98.4%", sub: "+0.6% vs last month" },
      { label: "Total Clock-Ins", value: "3,124", sub: "Mobile + Biometric" },
      { label: "Avg Shift Duration", value: "8.1 hrs", sub: "Target: 8.0 hrs" },
    ],
    explanation:
      "Attendance report generated for all active operational sites. Peak check-in time observed at 08:52 AM. Remote employees achieved a 99.1% check-in timeliness score.",
    actionPill: "Export CSV / Excel Timesheets",
  },
  {
    id: "hr-performance",
    question: "Summarize this month's HR performance.",
    badge: "Executive Insights",
    responseHeadline: "Monthly Human Resources Executive Brief",
    stats: [
      { label: "New Hires", value: "8 Joined", sub: "100% onboarded" },
      { label: "Retention Rate", value: "99.3%", sub: "1 resignation" },
      {
        label: "Avg Onboarding Time",
        value: "3.2 Days",
        sub: "Down from 6 days",
      },
    ],
    explanation:
      "Strong performance across employee lifecycle metrics this month. 8 new team members completed their digital compliance paperwork on day one via the mobile self-service portal.",
    actionPill: "Share Briefing with Executive Board",
  },
  {
    id: "overtime-dept",
    question: "Which departments have the highest overtime?",
    badge: "Overtime Analytics",
    responseHeadline: "Overtime Distribution by Department",
    stats: [
      {
        label: "1. Logistics Hub",
        value: "142.5 hrs",
        sub: "$3,560 calculated pay",
      },
      {
        label: "2. Customer Care",
        value: "48.0 hrs",
        sub: "$1,200 calculated pay",
      },
      {
        label: "3. Manufacturing",
        value: "32.5 hrs",
        sub: "$812 calculated pay",
      },
    ],
    explanation:
      "Logistics experienced high overtime due to end-of-quarter distribution surges. NextSofthr recommends activating the shift backfill workflow to balance future shift allocations.",
    actionPill: "Optimize Next Week Rota",
  },
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: 1,
    question: "What is NextSofthr?",
    answer:
      "NextSofthr is an all-in-one modern cloud platform combining HR management, payroll processing, time and attendance tracking, shift scheduling, recruitment, performance evaluation, expense management, and business operations into one intelligent, unified system.",
    category: "General",
  },
  {
    id: 2,
    question: "Which businesses can use NextSofthr?",
    answer:
      "NextSofthr is built to serve businesses of all sizes worldwide—from micro-enterprises and small startups (10+ staff) to medium-sized companies and large multi-location enterprises across retail, healthcare, logistics, tech, hospitality, finance, and manufacturing.",
    category: "General",
  },
  {
    id: 3,
    question: "Does NextSofthr support small businesses?",
    answer:
      "Yes, absolutely. Our Starter plan is specifically designed for small businesses getting started with professional HR and payroll. It provides employee self-service, leave tracking, attendance, and compliant payroll without high enterprise overhead.",
    category: "Pricing",
  },
  {
    id: 4,
    question: "Can NextSofthr support large enterprises?",
    answer:
      "Yes. Our Enterprise tier provides unlimited scalability, multi-company and multi-country configurations, custom role permissions, SSO (SAML/Okta/Azure AD), dedicated Account Executives, custom SLA guarantees, and enterprise data migration.",
    category: "General",
  },
  {
    id: 5,
    question: "How does NextSofthr pricing work?",
    answer:
      "NextSofthr uses clear, transparent subscription pricing based on your chosen tier and workforce size. You can subscribe on either a monthly or yearly billing schedule. Yearly billing offers up to 20% in savings compared to monthly subscriptions.",
    category: "Pricing",
  },
  {
    id: 6,
    question: "Can I change my plan?",
    answer:
      "Yes, you can upgrade, downgrade, or adjust your subscription plan at any time directly through your administrative billing settings. Upgrades apply immediately with prorated billing adjustments.",
    category: "Pricing",
  },
  {
    id: 7,
    question: "Can I switch between monthly and annual billing?",
    answer:
      "Yes, you can switch between monthly and annual billing whenever you choose. When switching to annual billing, the 20% discount is applied to your subsequent subscription cycle.",
    category: "Pricing",
  },
  {
    id: 8,
    question: "Is there a free trial?",
    answer:
      "Yes, NextSofthr offers a free trial so you can experience our full suite of HR, attendance, self-service, and payroll features before committing. No complex credit card setup is required to begin.",
    category: "Pricing",
  },
  {
    id: 9,
    question: "Can I manage multiple companies?",
    answer:
      "Yes. The Business and Enterprise tiers allow you to manage multiple legal entities, subsidiary corporations, or separate brands from a single master administrative dashboard with separated payroll ledgers.",
    category: "Features",
  },
  {
    id: 10,
    question: "Can I manage multiple branches?",
    answer:
      "Yes, NextSofthr allows you to set up multiple office locations, regional branches, and retail stores with localized holiday calendars, shift rotas, and geofenced attendance tracking.",
    category: "Features",
  },
  {
    id: 11,
    question: "Does NextSofthr support payroll?",
    answer:
      "Yes, payroll is one of our flagship capabilities. NextSofthr automates gross-to-net salary calculations, custom allowances, tax deductions, pension contributions, and generates digital payslips sent straight to employee portals.",
    category: "Features",
  },
  {
    id: 12,
    question: "Does NextSofthr support attendance and shifts?",
    answer:
      "Yes. The platform supports multiple check-in methods (web clock-in, mobile GPS check-in, and biometric device integration), overtime calculation rules, shift scheduling, rota rotations, and automatic timesheet exports.",
    category: "Features",
  },
  {
    id: 13,
    question: "Can employees access their own information?",
    answer:
      "Yes, all plans include our Employee Self-Service (ESS) portal. Employees can view and download payslips, request time off, clock in/out, submit expense receipts, and update personal details securely from their smartphones or laptops.",
    category: "Features",
  },
  {
    id: 14,
    question: "Does NextSofthr have an AI assistant?",
    answer:
      "Yes, NextSofthr features a built-in AI HR & Payroll Assistant. You can ask natural-language questions to check employee attendance, generate payroll reconciliations, discover leave balances, and synthesize workforce performance trends instantly.",
    category: "Features",
  },
  {
    id: 15,
    question: "Does NextSofthr integrate with other software?",
    answer:
      "Yes. We offer REST API access and webhooks on our Business and Enterprise plans, as well as connectors for accounting suites, ERP systems, calendar platforms, and biometric hardware terminals.",
    category: "Features",
  },
  {
    id: 16,
    question: "Can I import existing employee data?",
    answer:
      "Yes. NextSofthr provides intuitive CSV/Excel data import templates for employee profiles, historical leave balances, and compensation structures. For Enterprise clients, our migration team assists in transferring legacy HRIS data.",
    category: "General",
  },
  {
    id: 17,
    question: "Is my business data secure?",
    answer:
      "Yes, security is foundational to NextSofthr. All data is protected with industry-standard AES-256 encryption at rest and TLS 1.3 in transit. We maintain role-based access control, strict multi-factor authentication, and immutable audit logs.",
    category: "Security",
  },
  {
    id: 18,
    question: "Can I contact sales for enterprise requirements?",
    answer:
      "Yes. Our enterprise sales and solutions engineering team is available to discuss custom workflows, custom multi-country payroll rules, dedicated infrastructure, and tailored agreements. Contact us via phone (+2349158482622) or click Contact Sales.",
    category: "General",
  },
  {
    id: 19,
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time without punitive cancellation fees. Your account remains active through the end of your prepaid billing period, and you can export all your company data anytime.",
    category: "Pricing",
  },
  {
    id: 20,
    question: "How do I get started?",
    answer:
      'Getting started is fast and straightforward. Click "Start Free Trial" on any plan to set up your account in minutes, or click "Book a Demo" to schedule a personalized walkthrough with a NextSofthr workforce specialist.',
    category: "General",
  },
];
