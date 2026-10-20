import {
  ServiceItem,
  ExplorerTab,
  ProcessStep,
  WhyChooseItem,
  BusinessStage,
  IndustryItem,
  AIPromptExample,
  IntegrationCategory,
  TestimonialItem,
  FAQItem,
} from "../types";

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "hr-management",
    number: "01",
    category: "core-hr",
    title: "Human Resources Management",
    subtitle: "Full Employee Lifecycle & Governance",
    description:
      "Manage your entire employee lifecycle from recruitment and onboarding to employee records, organizational policies, and seamless offboarding.",
    features: [
      "Employee profiles & digital records",
      "Centralized employee database",
      "Departments & hierarchical positions",
      "Interactive organization structure",
      "Secure employee document vault",
      "Guided onboarding workflows",
      "Structured offboarding & exit interviews",
      "Custom configurable HR workflows",
      "Self-service employee portal",
      "Comprehensive audit-ready HR reports",
    ],
    ctaText: "Explore HR Management →",
    badge: "Core Foundation",
    detailedOverview:
      "Eliminate fragmented paperwork and lost employee records. NextSofthr centralizes contract documents, emergency contacts, tax identities, and role assignments into a unified, secure database that scales from 5 to 50,000 employees.",
    benefits: [
      "Reduce HR administrative overhead by up to 68%",
      "Eliminate missing contracts and compliance documentation",
      "Seamless role changes, promotions, and department transfers",
    ],
    supportedInRegions:
      "Pan-African & Global (Nigeria, Kenya, Ghana, South Africa, Rwanda, UK, US, etc.)",
  },
  {
    id: "payroll",
    number: "02",
    category: "payroll",
    title: "Smart Payroll Management",
    subtitle: "Automated Tax, Deductions & Multi-Currency",
    description:
      "Automate payroll calculations, approvals, deductions, and payslips while maintaining accurate employee payment records and statutory compliance.",
    features: [
      "Automated payroll batch processing",
      "Flexible salary & compensation management",
      "Custom allowances & bonuses",
      "Statutory & voluntary deductions",
      "Localized tax computations (PAYE, NHF, Pension, etc.)",
      "Instant branded digital payslips via email & app",
      "Consolidated payroll summary reports",
      "Multi-tier payroll approval workflows",
      "Direct payment records & bank disbursement files",
      "Immutable historical payroll archives",
    ],
    ctaText: "Explore Payroll →",
    badge: "100% Error-Free",
    detailedOverview:
      "Built specifically with African tax authorities and global currency standards in mind. NextSofthr calculates complex PAYE tiers, pensions, health insurance schemes, and custom allowances in seconds, generating bank-ready bulk payment schedules.",
    benefits: [
      "Disburse payroll in minutes instead of days",
      "Zero calculation errors with auto-updated statutory tax tables",
      "Self-service payslip downloads 24/7 for all staff",
    ],
    supportedInRegions: "Localized for NGN, GHS, KES, ZAR, RWF, USD, GBP, EUR",
  },
  {
    id: "attendance",
    number: "03",
    category: "workforce",
    title: "Time & Attendance",
    subtitle: "Real-Time Biometric & Mobile Clock-In",
    description:
      "Know when employees work, arrive, leave, and take breaks with modern attendance tracking designed for on-site, field, and remote teams.",
    features: [
      "One-tap mobile clock-in & clock-out",
      "Real-time attendance tracking & logs",
      "Automated weekly & monthly timesheets",
      "Late arrival & early departure tracking",
      "Configurable overtime calculation rules",
      "Real-time attendance summaries & reports",
      "Employee mobile attendance companion",
      "Location-based GPS geofencing where supported",
      "Manager review & single-click approvals",
      "Hardware biometric terminal integration",
    ],
    ctaText: "Explore Attendance →",
    badge: "Real-Time Sync",
    detailedOverview:
      "Say goodbye to paper sign-in sheets and buddy-punching. Employees can clock in via mobile geofencing, web punch, or connected biometric devices at office turnstiles. Real-time data streams straight into payroll without manual re-entry.",
    benefits: [
      "Eliminate time-theft and attendance tampering",
      "Automatic overtime computation feeding into monthly payroll",
      "Visibility over field teams, branch networks, and remote staff",
    ],
    supportedInRegions: "Mobile App (iOS & Android) + Biometric Device APIs",
  },
  {
    id: "scheduling",
    number: "04",
    category: "workforce",
    title: "Shift & Workforce Scheduling",
    subtitle: "Dynamic Rota Planning & Shift Swapping",
    description:
      "Create smarter schedules and ensure the right employees with the right skills are available at the right time across all operating branches.",
    features: [
      "Drag-and-drop shift creation",
      "Multi-location employee scheduling",
      "Automated rotating shift schedules",
      "Skill-based shift assignments",
      "Overtime budget & hour cap management",
      "Interactive workforce schedule calendar",
      "Instant SMS & push shift notifications",
      "Manager shift approvals & change logs",
      "Peer-to-peer shift swap requests",
      "Labor cost forecasting vs. schedule",
    ],
    ctaText: "Explore Scheduling →",
    badge: "Smart Rota",
    detailedOverview:
      "Ideal for 24/7 operations, hospitals, hotels, factories, and retail chains. Prevent understaffing or accidental overtime violations with automated conflict detection and instant notifications to employee mobile devices.",
    benefits: [
      "Reduce scheduling conflicts by 92%",
      "Enable peer shift swaps with manager sign-off",
      "Monitor labor budget adherence before shifts occur",
    ],
    supportedInRegions: "Multi-branch & 24/7 Shift Environments",
  },
  {
    id: "leave",
    number: "05",
    category: "workforce",
    title: "Leave & Absence Management",
    subtitle: "Transparent Balances & One-Click Approvals",
    description:
      "Make leave requests, approvals, and employee absence tracking simple, transparent, and aligned with company and statutory policies.",
    features: [
      "Customizable annual, sick, maternity & study leave policies",
      "Instant mobile & web leave requests",
      "Multi-level hierarchical approval workflows",
      "Real-time leave balance calculations & accruals",
      "National & corporate holiday calendars",
      "Absence tracking & medical document uploads",
      "Departmental team leave calendars",
      "Comprehensive leave utilization reports",
      "Auto-sync with attendance & payroll deductions",
      "Prorated leave calculations for new hires",
    ],
    ctaText: "Explore Leave Management →",
    badge: "Auto-Accrual",
    detailedOverview:
      "Employees can check their remaining balances and apply for leave in seconds. Managers receive immediate notifications with team overlap warnings so departments never experience sudden coverage shortages.",
    benefits: [
      "Zero confusion on remaining paid leave days",
      "Prevent overlapping team absences with calendar heatmaps",
      "Automatically factor unpaid absences into payroll calculations",
    ],
    supportedInRegions:
      "African statutory labor laws & custom corporate policies",
  },
  {
    id: "performance",
    number: "06",
    category: "growth-ai",
    title: "Employee Performance",
    subtitle: "OKRs, KPIs & 360-Degree Feedback",
    description:
      "Build a high-performance culture with structured performance appraisals, goal alignment, continuous manager check-ins, and objective tracking.",
    features: [
      "Quarterly & annual performance reviews",
      "Company & individual goals & objectives (OKRs)",
      "Departmental Key Performance Indicators (KPIs)",
      "360-degree peer & self-evaluations",
      "Continuous 1-on-1 manager feedback notes",
      "Historical performance tracking & trends",
      "Individual development plans (IDPs)",
      "Talent matrix & 9-box performance reports",
      "Merit-based compensation recommendations",
      "Competency assessment frameworks",
    ],
    ctaText: "Explore Performance →",
    badge: "Results-Driven",
    detailedOverview:
      "Replace stressful annual appraisal rituals with agile, ongoing performance enablement. Align executive strategic OKRs with team milestones, gather 360-degree peer feedback, and identify top talent ready for leadership.",
    benefits: [
      "Align employee day-to-day work with company revenue goals",
      "Transparent appraisals backed by objective milestones",
      "Identify skill gaps and target training budgets effectively",
    ],
    supportedInRegions: "Global standard OKR & KPI frameworks",
  },
  {
    id: "recruitment",
    number: "07",
    category: "growth-ai",
    title: "Recruitment & Talent Management",
    subtitle: "Applicant Tracking & Frictionless Onboarding",
    description:
      "Attract, organize, evaluate, and hire top-tier talent across Africa and internationally with an intuitive applicant tracking pipeline.",
    features: [
      "Branded career portal & job vacancy publishing",
      "Structured candidate pipeline management",
      "Applicant tracking with custom hiring stages",
      "Automated interview scheduling & calendar sync",
      "Collaborative scorecard candidate evaluation",
      "Resume parser & candidate filtering",
      "Digital offer letter generation & e-signature",
      "Instant convert hired applicant to employee profile",
      "Automated pre-boarding document collection",
      "Talent pool candidate archiving for future roles",
    ],
    ctaText: "Explore Recruitment →",
    badge: "Hire Faster",
    detailedOverview:
      "Post jobs to your custom company career page, track candidates through Kanban-style stages, collect interviewer feedback, and issue signed offer letters that automatically turn new hires into active employee records.",
    benefits: [
      "Cut time-to-hire by 45%",
      "Eliminate candidate drop-off during onboarding",
      "Centralize interviewer notes, CVs, and compensation asks",
    ],
    supportedInRegions: "Pan-African talent sourcing & remote global hiring",
  },
  {
    id: "self-service",
    number: "08",
    category: "core-hr",
    title: "Employee Self-Service (ESS)",
    subtitle: "Empower Your Workforce Anywhere",
    description:
      "Give employees convenient, secure 24/7 access to their personal HR records, payslips, leave balances, requests, and announcements.",
    features: [
      "Intuitive personal employee dashboard",
      "Instant password-protected payslip downloads",
      "One-tap leave application & balance inquiry",
      "Mobile attendance punch & shift schedule view",
      "Personal document repository (IDs, degrees, licenses)",
      "Self-service profile & bank account updates",
      "Internal expense reimbursement requests",
      "Real-time push notifications & company memos",
      "Peer directory & organizational chart lookup",
      "Multi-language friendly interface",
    ],
    ctaText: "Explore Employee Self-Service →",
    badge: "24/7 Portal",
    detailedOverview:
      'Empower your team and free HR from answering repetitive questions like "Can I have my June payslip?" or "How many leave days do I have left?". Available as both a responsive web app and mobile companion.',
    benefits: [
      "80% fewer routine inquiries sent to HR and payroll inboxes",
      "Direct mobile notification for salary alerts and approvals",
      "Guaranteed employee privacy and secure personal data access",
    ],
    supportedInRegions: "Accessible on any smartphone, tablet, or web browser",
  },
  {
    id: "business-management",
    number: "09",
    category: "workforce",
    title: "Business Management & Expenses",
    subtitle: "Operational Workflows & Expense Claims",
    description:
      "Connect workforce operations with essential business administration, expense reimbursement, travel claims, and operational approvals.",
    features: [
      "Digital employee expense claims & receipt photo uploads",
      "Configurable multi-level business approval chains",
      "Departmental operational workflows",
      "Real-time executive management dashboards",
      "Cash advance & per-diem reconciliation",
      "Business travel request management",
      "Operational spending audit reports",
      "Asset issuance & company equipment tracking",
      "Procurement requisition workflows",
      "Direct accounting synchronization",
    ],
    ctaText: "Explore Business Management →",
    badge: "Full Visibility",
    detailedOverview:
      "Bridging the gap between Human Capital and Business Operations. Staff can submit expense receipts from their phone while traveling, allowing managers and finance leads to approve them in real time with complete budget visibility.",
    benefits: [
      "Zero paper receipts lost in transit",
      "Control departmental expenditure before reimbursement",
      "Track laptops, company cars, and equipment assigned to staff",
    ],
    supportedInRegions: "Multi-branch corporate administration",
  },
  {
    id: "ai-assistant",
    number: "10",
    category: "growth-ai",
    title: "AI-Powered HR Assistant",
    subtitle: "Conversational Intelligence for Workforce Operations",
    description:
      "Introduce an intelligent conversational AI partner that helps HR leaders, managers, and employees query data, automate tasks, and surface deep workforce insights.",
    features: [
      "Conversational natural language HR assistant",
      "Instant HR policy Q&A for employees & managers",
      "Automated payroll anomaly & variance detection",
      "Proactive turnover risk & absenteeism insights",
      "AI-assisted job description & review generation",
      "Smart onboarding checklist auto-creation",
      "Automated workforce recommendations",
      "Natural-language data reporting & charts",
      "Multi-lingual contextual awareness",
      "Enterprise role-gated private data perimeter",
    ],
    ctaText: "Explore AI HR →",
    badge: "Next-Gen AI",
    detailedOverview:
      'Ask NextSofthr questions in plain English: "Who hasn’t taken their annual leave this year?" or "Generate a summary of this month\'s overtime spend in the Lagos office." The AI retrieves accurate, role-sanitized insights instantly.',
    benefits: [
      "Immediate answers without manual spreadsheet filtering",
      "Detect payroll inconsistencies before disbursement",
      "Instant policy guidance based on your employee handbook",
    ],
    supportedInRegions: "Secure private cloud model with strict data privacy",
  },
  {
    id: "analytics",
    number: "11",
    category: "growth-ai",
    title: "Workforce Analytics & Reports",
    subtitle: "Data-Driven Insights for Executive Decision Making",
    description:
      "Transform disparate workforce data points into executive-ready dashboards, predictive headcount trends, and strategic business intelligence.",
    features: [
      "Executive HR KPI & retention dashboards",
      "Payroll cost breakdown & overtime trend analytics",
      "Departmental attendance & punctuality heatmaps",
      "Diversity, equity & inclusion (DEI) metrics",
      "Leave liability & unused balance forecasting",
      "Performance rating distribution curves",
      "Custom drag-and-drop report builder",
      "Automated scheduled PDF & Excel email reports",
      "Branch vs. branch operational benchmark comparisons",
      "Secure data exports for board presentations",
    ],
    ctaText: "Explore Analytics →",
    badge: "Executive Ready",
    detailedOverview:
      "Stop spending days assembling board slide decks. NextSofthr provides real-time visualizations of turnover rates, payroll cost per revenue dollar, absenteeism costs, and departmental productivity indices at a single glance.",
    benefits: [
      "Instant clarity on labor cost vs. organizational revenue",
      "Identify retention bottlenecks before top talent resigns",
      "Audit-ready exports for regulatory bodies and investors",
    ],
    supportedInRegions: "Exportable to Excel, CSV, PDF, and BI Connectors",
  },
  {
    id: "consulting",
    number: "12",
    category: "core-hr",
    title: "Implementation, Training & Support",
    subtitle: "White-Glove Onboarding & Continuous Success",
    description:
      "Partner with experienced African and international HR transformation specialists to ensure rapid adoption, seamless data migration, and dedicated support.",
    features: [
      "Tailored enterprise implementation planning",
      "Full legacy data migration (Excel, legacy HRMS)",
      "Customized organizational & policy configuration",
      "Localized statutory payroll configuration",
      "Interactive executive & HR administrator training",
      "All-hands employee self-service onboarding",
      "Dedicated Customer Success Manager (CSM)",
      "Priority phone, WhatsApp & email support",
      "Quarterly operational health checks",
      "Continuous software feature updates",
    ],
    ctaText: "Talk to an Expert →",
    badge: "Dedicated Success",
    detailedOverview:
      "We do not just hand you software and walk away. Our localized implementation specialists review your existing pay structures, import your employee records, configure local tax rules, and train your staff in weeks, not months.",
    benefits: [
      "Go live in as little as 7 to 14 business days",
      "Zero loss of historical payroll and employee records",
      "Direct phone support via our dedicated line: +2349158482622",
    ],
    supportedInRegions:
      "On-site in major African commercial hubs & remote globally",
  },
];

export const EXPLORER_TABS: ExplorerTab[] = [
  {
    id: "hr",
    label: "HR Management",
    title: "Unified Employee Database & Lifecycle Hub",
    description:
      "Centralize every team member profile, contract, emergency contact, and promotion history in one encrypted cloud repository.",
    badge: "Core HR",
    features: [
      "Digital employee dossiers with complete contract histories",
      "Automated role transitions and departmental re-assignments",
      "Role-based permission access (HR, Manager, Executive, Staff)",
      "Automated document expiry alerts for work permits & credentials",
    ],
    metricLabel: "Active Managed Employees",
    metricValue: "12,480+",
    metricChange: "+18% MoM across 8 African hubs",
    imageUrl:
      "https://img.freepik.com/premium-photo/team-young-african-people-office-table-with-laptop_219728-4569.jpg?size=626&amp;ext=jpg&amp;ga=GA1.1.233311484.1695720566&amp;semt=ais",
    imageAlt:
      "African professional woman HR director in modern office collaborating with executive team",
    mockupData: {
      heading: "Employee Directory & Structure",
      subheading: "Victoria Island HQ & Remote Regional Offices",
      stats: [
        { label: "Total Headcount", value: "482", trend: "+14 this month" },
        { label: "Departments", value: "18 Active", trend: "Fully staffed" },
        {
          label: "Retention Rate",
          value: "96.4%",
          trend: "+3.2% vs last year",
        },
      ],
      recentItems: [
        {
          title: "Folake Adeleke",
          meta: "Senior Software Architect • Lagos Tech Hub",
          status: "Active • Full Time",
          statusType: "success",
        },
        {
          title: "Kwame Mensah",
          meta: "Financial Controller • Accra Operations",
          status: "Active • Full Time",
          statusType: "success",
        },
        {
          title: "Amina Ndlovu",
          meta: "Talent Acquisition Lead • Johannesburg",
          status: "Onboarding Stage 3",
          statusType: "info",
        },
      ],
    },
  },
  {
    id: "payroll",
    label: "Payroll",
    title: "Smart, Automated & Compliant African Payroll",
    description:
      "Run complex payroll runs in minutes. Calculate statutory PAYE, pension, social security, health contributions, and disburse directly to local bank accounts.",
    badge: "Automated Disbursements",
    features: [
      "Pre-configured statutory tax rules for Nigeria, Kenya, Ghana, South Africa & more",
      "Multi-currency processing in NGN, KES, GHS, ZAR, USD, and GBP",
      "One-click digital payslips generated and sent directly to employee portals",
      "Instant direct-debit bank schedule exports compatible with all major commercial banks",
    ],
    metricLabel: "Monthly Payroll Disbursed",
    metricValue: "₦4.2 Billion+",
    metricChange: "100% on-time, zero calculation variance",
    imageUrl:
      "https://img.freepik.com/premium-photo/financial-partners-shaking-hands-during-office-meeting_160672-42630.jpg?size=626&amp;ext=jpg&amp;ga=GA1.1.233311484.1695720566&amp;semt=ais",
    imageAlt:
      "African payroll accountant reviewing financial data on dual screens in corporate finance suite",
    mockupData: {
      heading: "Payroll Run — September 2026",
      subheading: "Status: Approved & Scheduled for Auto-Disbursement",
      stats: [
        { label: "Net Disbursed", value: "₦94,820,450", trend: "382 staff" },
        {
          label: "Statutory Taxes (PAYE)",
          value: "₦14,210,000",
          trend: "Auto-computed",
        },
        {
          label: "Pension & Trust Fund",
          value: "₦8,150,000",
          trend: "Reconciled",
        },
      ],
      recentItems: [
        {
          title: "Engineering & Product Pool",
          meta: "94 employees • ₦38,400,000",
          status: "Approved",
          statusType: "success",
        },
        {
          title: "Commercial & Sales Commission",
          meta: "128 employees • ₦31,900,000",
          status: "Approved",
          statusType: "success",
        },
        {
          title: "Operations & Logistics Rota",
          meta: "160 employees • ₦24,520,450",
          status: "Approved",
          statusType: "success",
        },
      ],
    },
  },
  {
    id: "attendance",
    label: "Attendance",
    title: "Real-Time Clock-In, Biometrics & Mobile GPS",
    description:
      "Track shift arrivals, remote logins, and field team check-ins with precision. Geofencing guarantees employees are on-site without invasive surveillance.",
    badge: "Precision Tracking",
    features: [
      "Location-aware geofencing for client sites, retail stores, and headquarters",
      "Hardware biometric terminal sync via plug-and-play network protocols",
      "Automatic overtime calculation synced directly with employee payroll",
      "Real-time supervisor attendance dashboard with instant late arrival alerts",
    ],
    metricLabel: "Attendance Reliability Rate",
    metricValue: "98.8%",
    metricChange: "Field workforce punctual arrivals",
    imageUrl:
      "https://img.freepik.com/premium-photo/human-resources-hr-management-recruitment-employment-headhunting-concept-human-resources-uses-computers-search-select-job-applicants-process-selecting-people-join-work-hr_29488-6227.jpg?size=626&amp;ext=jpg&amp;ga=GA1.1.233311484.1695720566&amp;semt=ais",
    imageAlt:
      "African tech team collaborating with laptops in modern open workspace",
    mockupData: {
      heading: "Live Attendance Monitor — Today",
      subheading: "482 Registered Personnel Across 5 Operational Sites",
      stats: [
        {
          label: "Present On-Site",
          value: "458 Staff",
          trend: "95.0% by 08:30",
        },
        {
          label: "Approved Remote",
          value: "18 Staff",
          trend: "Verified GPS log",
        },
        { label: "On Approved Leave", value: "6 Staff", trend: "Scheduled" },
      ],
      recentItems: [
        {
          title: "Main Factory Gate 1",
          meta: "180 clocked in • Turnstile Alpha",
          status: "Normal Flow",
          statusType: "success",
        },
        {
          title: "Ikeja Logistics Depot",
          meta: "44 drivers checked in via Mobile GPS",
          status: "Active Shift",
          statusType: "success",
        },
        {
          title: "Executive Suites & HQ",
          meta: "All department managers checked in",
          status: "On Track",
          statusType: "success",
        },
      ],
    },
  },
  {
    id: "leave",
    label: "Leave",
    title: "Frictionless Leave & Absence Workflows",
    description:
      "No more paper leave request forms wandering between managers. Employees request time off from their phones; supervisors approve in a single tap.",
    badge: "Transparent Accruals",
    features: [
      "Automated prorated leave accruals reflecting company tenure and policy",
      "Interactive department leave calendar avoiding conflicting holiday bookings",
      "Instant manager push notification with team coverage indicators",
      "Sick leave medical certificate attachment upload from smartphone camera",
    ],
    metricLabel: "Average Approval Speed",
    metricValue: "< 2 Hours",
    metricChange: "Down from 5 days of email back-and-forth",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    imageAlt:
      "African professional manager reviewing team schedules on a tablet in brightly lit office",
    mockupData: {
      heading: "Leave Governance & Requests",
      subheading: "Current Balance & Pending Authorizations",
      stats: [
        {
          label: "Pending Approvals",
          value: "4 Requests",
          trend: "Action required",
        },
        {
          label: "Currently on Leave",
          value: "6 Personnel",
          trend: "Cover allocated",
        },
        {
          label: "Average Balance",
          value: "14.2 Days",
          trend: "Accrual healthy",
        },
      ],
      recentItems: [
        {
          title: "Tunde Bakare (Annual Leave)",
          meta: "5 Days • Oct 12 – Oct 16 • Senior Dev",
          status: "Awaiting Sign-off",
          statusType: "warning",
        },
        {
          title: "Zainab Bello (Maternity Leave)",
          meta: "12 Weeks • Nov 01 – Jan 24 • Legal",
          status: "Approved by HR",
          statusType: "success",
        },
        {
          title: "Chidi Okeke (Exam Leave)",
          meta: "2 Days • Oct 04 – Oct 05 • Finance",
          status: "Approved by Dept Head",
          statusType: "success",
        },
      ],
    },
  },
  {
    id: "performance",
    label: "Performance",
    title: "Objective Alignment, OKRs & 360 Reviews",
    description:
      "Keep your entire organization focused on measurable impact. Link individual daily achievements directly with high-level corporate growth metrics.",
    badge: "Continuous Growth",
    features: [
      "Agile quarterly OKR setting with transparent progress tracking bars",
      "Confidential 360-degree peer and direct report feedback questionnaires",
      "Continuous 1-on-1 coaching logs between line managers and team members",
      "Objective merit recommendation data for annual bonus and promotion rounds",
    ],
    metricLabel: "Goal Completion Index",
    metricValue: "91.4%",
    metricChange: "Quarterly OKR milestone achievement",
    imageUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop",
    imageAlt:
      "African corporate woman executive presenting performance strategy to diverse board members",
    mockupData: {
      heading: "Q3 Enterprise Performance Cycle",
      subheading: "94% Evaluation Completion Across All Business Units",
      stats: [
        {
          label: "Average Org Rating",
          value: "4.3 / 5.0",
          trend: "High Performance",
        },
        {
          label: "Goals On Track",
          value: "312 Objectives",
          trend: "88% of target",
        },
        {
          label: "1-on-1s Completed",
          value: "184 Sessions",
          trend: "100% recorded",
        },
      ],
      recentItems: [
        {
          title: "Expansion to East Africa Market",
          meta: "Commercial Dept • Lead: David Mwangi",
          status: "Exceeding Target",
          statusType: "success",
        },
        {
          title: "ISO 27001 Security Compliance",
          meta: "DevOps Team • Lead: Emmanuel Ade",
          status: "100% Completed",
          statusType: "success",
        },
        {
          title: "Customer Onboarding Speedup",
          meta: "Support Unit • Lead: Grace Otieno",
          status: "On Track",
          statusType: "info",
        },
      ],
    },
  },
  {
    id: "recruitment",
    label: "Recruitment",
    title: "Pipeline Velocity & Automated Candidate Scoring",
    description:
      "Source, screen, interview, and hire top talent from Lagos to London. Convert winning applicants into fully provisioned employee profiles in seconds.",
    badge: "Talent Acquisition",
    features: [
      "One-click multi-board job syndication & custom branded careers portal",
      "Visual drag-and-drop hiring pipeline with stage-gated scorecard feedback",
      "Automated email interview scheduling with calendar booking links",
      "Digital offer letter dispatch with tamper-proof electronic signature",
    ],
    metricLabel: "Time-to-Hire Reduction",
    metricValue: "-45%",
    metricChange: "From requisition opening to signed contract",
    imageUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    imageAlt:
      "African business executive smiling warmly in high-end corporate office setting",
    mockupData: {
      heading: "Active Recruitment Campaigns",
      subheading: "14 Open Positions • 420 Qualified Candidates",
      stats: [
        {
          label: "Shortlisted",
          value: "42 Candidates",
          trend: "Ready for interview",
        },
        {
          label: "Interviews This Week",
          value: "16 Sessions",
          trend: "Panel confirmed",
        },
        {
          label: "Offers Extended",
          value: "3 Letters",
          trend: "Awaiting signature",
        },
      ],
      recentItems: [
        {
          title: "Senior Financial Analyst",
          meta: "Finance Dept • 18 Applicants • Stage: Final Partner Interview",
          status: "In Progress",
          statusType: "info",
        },
        {
          title: "Frontend Engineer (React)",
          meta: "Technology • 64 Applicants • Stage: Technical Challenge",
          status: "Evaluating",
          statusType: "warning",
        },
        {
          title: "Supply Chain Operations Lead",
          meta: "Logistics • 32 Applicants • Stage: Offer Sent",
          status: "Offer Extended",
          statusType: "success",
        },
      ],
    },
  },
  {
    id: "ai",
    label: "AI HR Assistant",
    title: "Intelligent Autonomous Copilot for People & Payroll",
    description:
      "Leverage cutting-edge enterprise AI to answer complex policy questions, detect payroll anomalies before processing, and draft documents in seconds.",
    badge: "Enterprise AI",
    features: [
      "Conversational queries across entire company policy and handbook docs",
      "Automatic anomaly detection identifying sudden overtime surges and variances",
      "AI-generated performance summary reviews and job description drafting",
      "Privacy-first architecture ensuring zero company data leaks to public LLMs",
    ],
    metricLabel: "Queries Resolved Instantly",
    metricValue: "85%+",
    metricChange: "Without needing human HR staff escalation",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    imageAlt:
      "Modern tech professional in collaborative workspace with analytical dashboard",
    mockupData: {
      heading: "NextSofthr AI Copilot Console",
      subheading: "Connected to Enterprise Workspace & Payroll Ledger",
      stats: [
        { label: "Policy Queries Solved", value: "1,240", trend: "This month" },
        {
          label: "Anomalies Prevented",
          value: "7 Flubbed Claims",
          trend: "Saved ₦1.8M",
        },
        {
          label: "Report Generation",
          value: "Instant",
          trend: "< 3.2 seconds",
        },
      ],
      recentItems: [
        {
          title: "“Show employees on sick leave this week”",
          meta: "Queried by Ops Director • 3 staff listed with medical notes",
          status: "Completed",
          statusType: "success",
        },
        {
          title: "“Generate Q3 Overtime Variance Report”",
          meta: "Queried by Finance VP • PDF ready with bar chart",
          status: "Completed",
          statusType: "success",
        },
        {
          title: "“Draft Senior DevOps Onboarding Plan”",
          meta: "Queried by Engineering Manager • 30-60-90 day draft ready",
          status: "Completed",
          statusType: "success",
        },
      ],
    },
  },
  {
    id: "analytics",
    label: "Analytics",
    title: "Strategic Workforce Intelligence & Board Reporting",
    description:
      "Empower C-suite and HR executives with instant clarity on talent retention, labor cost efficiency, absenteeism impact, and headcount forecasting.",
    badge: "Executive BI",
    features: [
      "Interactive drill-down charts for payroll-to-revenue efficiency ratios",
      "Predictive flight-risk indicators highlighting retention vulnerabilities",
      "Cross-departmental productivity and punctuality heatmaps",
      "One-click export of investor-ready PDF and Excel analytical reports",
    ],
    metricLabel: "Reporting Time Saved",
    metricValue: "18 Hours",
    metricChange: "Saved per month per HR manager",
    imageUrl:
      "https://img.freepik.com/free-photo/multicultural-businesswomen-group-meeting_1157-47735.jpg?size=626&ext=jpg&ga=GA1.2.233311484.1695720566&semt=ais",
    imageAlt:
      "African business executive reviewing financial charts with team members in boardroom",
    mockupData: {
      heading: "Workforce Intelligence Overview",
      subheading: "Consolidated Metrics for Executive Leadership",
      stats: [
        {
          label: "Monthly Labor Cost",
          value: "₦112.4M",
          trend: "-2.1% efficiency gain",
        },
        {
          label: "Turnover Rate (Ann.)",
          value: "3.8%",
          trend: "Top tier benchmark",
        },
        {
          label: "Average Tenure",
          value: "3.4 Years",
          trend: "+8 months vs 2024",
        },
      ],
      recentItems: [
        {
          title: "Sales Department Compensation Efficiency",
          meta: "Revenue per employee up 18.4% YoY",
          status: "Optimal",
          statusType: "success",
        },
        {
          title: "Engineering Team Retention Index",
          meta: "Voluntary departure at 0% over past 12 months",
          status: "High Stability",
          statusType: "success",
        },
        {
          title: "Leave Liability Projection",
          meta: "Accrued unused days manageable within Q4 provisions",
          status: "Controlled",
          statusType: "info",
        },
      ],
    },
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    subtitle: "Needs Assessment & Audit",
    description:
      "We collaborate with your leadership and HR teams to map your exact organizational structure, payroll policies, shift patterns, and compliance requirements.",
    deliverables: [
      "Workforce architecture blueprint",
      "Statutory compliance checklist",
      "Data migration roadmap",
    ],
    timeframe: "Day 1 - 3",
  },
  {
    number: "02",
    title: "Configure",
    subtitle: "System & Policy Setup",
    description:
      "Configure departments, employee grades, salary structures, tax rules, allowances, approval hierarchies, and company leave policies to your exact specifications.",
    deliverables: [
      "Custom payroll calculation engine",
      "Approval matrices setup",
      "Branded employee portal",
    ],
    timeframe: "Day 4 - 6",
  },
  {
    number: "03",
    title: "Connect",
    subtitle: "Data Migration & Ecosystem Integration",
    description:
      "Migrate existing employee records, historical balances, and contracts seamlessly. Connect bank accounts, biometric devices, and accounting tools.",
    deliverables: [
      "100% verified historical data upload",
      "Bank disbursement test",
      "Biometric & ERP integration",
    ],
    timeframe: "Day 7 - 9",
  },
  {
    number: "04",
    title: "Automate",
    subtitle: "Pilot Run & Staff Onboarding",
    description:
      "Run a parallel test payroll to confirm calculations. Train HR administrators, line managers, and roll out the self-service app to your entire workforce.",
    deliverables: [
      "Zero-variance parallel payroll run",
      "Interactive administrator workshop",
      "All-hands mobile rollout",
    ],
    timeframe: "Day 10 - 12",
  },
  {
    number: "05",
    title: "Grow",
    subtitle: "Intelligent Scale & Continuous Success",
    description:
      "Unlock real-time operational visibility, continuous AI assistance, and dedicated ongoing support from your local NextSofthr Customer Success Manager.",
    deliverables: [
      "Executive analytics dashboard",
      "Quarterly optimization audits",
      "Dedicated priority support",
    ],
    timeframe: "Continuous",
  },
];

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    title: "One Connected Platform",
    description:
      "Manage HR, payroll, attendance, leave, performance, and operational expenses from one single pane of glass without fragmented spreadsheets.",
    tagline: "No more disconnected data silos",
  },
  {
    title: "Built for African Businesses",
    description:
      "Designed ground-up with African banking networks, state tax rules (PAYE, NHF, Pensions), multi-tier currencies, and local operational realities.",
    tagline: "Deep local compliance & statutory accuracy",
  },
  {
    title: "Globally Scalable",
    description:
      "Whether you operate a single office in Nairobi or 50 multinational subsidiaries across Africa, Europe, and North America, NextSofthr scales effortlessly.",
    tagline: "Multi-currency, multi-branch & multi-country ready",
  },
  {
    title: "AI-Powered Intelligence",
    description:
      "Automate repetitive workflows, detect payroll anomalies before money moves, and query workforce records in plain natural language.",
    tagline: "Smart automation that saves hours weekly",
  },
  {
    title: "Secure & Cloud-Based",
    description:
      "Bank-grade AES-256 encryption, continuous automated backups, role-based access security, and full compliance with NDPR and GDPR standards.",
    tagline: "Enterprise data sovereignty & protection",
  },
  {
    title: "Intuitive & Easy to Use",
    description:
      "A consumer-grade user experience so straightforward that employees can request leave and download payslips with zero training.",
    tagline: "Loved by HR, managers, and employees alike",
  },
  {
    title: "Flexible & Cost-Effective",
    description:
      "Start small with the modules you need today and seamlessly add advanced capabilities as your team expands. Transparent, predictable pricing.",
    tagline: "Invest in software that grows alongside you",
  },
];

export const BUSINESS_STAGES: BusinessStage[] = [
  {
    id: "micro",
    tier: "Micro Businesses",
    title: "Simple HR & Payroll for Growing Teams",
    subtitle: "From 1 to 15 Employees",
    employeeRange: "1 - 15 Staff",
    description:
      "Replace messy spreadsheets and manual bank transfers with automated payroll, digital employee profiles, and instant payslips in one easy-to-use platform.",
    features: [
      "Simple monthly payroll calculation & instant payslips",
      "Digital employee contract & bio-data storage",
      "Easy WhatsApp & email leave requests",
      "No complicated IT setup — up and running in 24 hours",
    ],
    imageUrl:
      "https://i0.wp.com/ivend.com/wp-content/uploads/2026/05/Why-Loyalty-Performs-Better-with-Better-Retail-Data.jpg?w=1200&ssl=1",
    imageCaption:
      "African boutique founder managing staff payroll on a modern tablet",
    highlightStat: "Save 10+ hours every month on payroll admin",
  },
  {
    id: "small",
    tier: "Small Businesses",
    title: "Automate Everyday HR & Workforce Processes",
    subtitle: "From 16 to 50 Employees",
    employeeRange: "16 - 50 Staff",
    description:
      "Empower managers to approve leave, monitor employee attendance, calculate overtime, and ensure 100% statutory tax compliance every month.",
    features: [
      "Employee self-service mobile app for attendance and leave",
      "Automated PAYE, pension, and statutory deduction schedules",
      "Multi-level approval workflows for managers and founders",
      "Structured onboarding workflows for new team members",
    ],
    imageUrl:
      "https://iideainformatics.it/html/taxvi/assets/img/project/project-5.jpg",
    imageCaption:
      "Young vibrant African startup team brainstorming in open workspace",
    highlightStat: "Zero payroll penalties and tax calculation errors",
  },
  {
    id: "medium",
    tier: "Medium Businesses",
    title: "Centralize Workforce Operations & Deep Visibility",
    subtitle: "From 51 to 250 Employees",
    employeeRange: "51 - 250 Staff",
    description:
      "Gain organizational visibility across multiple departments, track shift schedules, manage operational expenses, and run quarterly performance OKRs.",
    features: [
      "Departmental roster scheduling & biometric clock-in sync",
      "Expense reimbursement and travel advance tracking",
      "Structured quarterly KPI and 360-degree performance reviews",
      "Comprehensive HR and finance executive reports",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    imageCaption:
      "African corporate department managers reviewing quarterly metrics",
    highlightStat: "68% reduction in internal HR administrative inquiries",
  },
  {
    id: "enterprise",
    tier: "Large Enterprises",
    title: "Complex Teams, Structures & Multi-Location Scale",
    subtitle: "250+ to 10,000+ Employees",
    employeeRange: "250+ Staff",
    description:
      "Enterprise-grade governance, custom ERP integrations, multi-entity payroll consolidation, advanced security controls, and dedicated account management.",
    features: [
      "Multi-subsidiary, multi-country and cross-border currency payroll",
      "Custom API webhooks and direct ERP & banking integrations",
      "Role-based granular permissions with full tamper-evident audit logs",
      "Dedicated Customer Success Manager and 24/7 SLA guarantee",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    imageCaption:
      "Enterprise executive leadership team in high-rise corporate tower",
    highlightStat: "Managing 10,000+ personnel with 99.99% system uptime",
  },
];

export const INDUSTRIES_LIST: IndustryItem[] = [
  {
    id: "tech",
    name: "Technology & Startups",
    category: "corporate",
    description:
      "Agile remote and hybrid teams, equity tracking, flexible perks, and fast international hiring.",
    features: [
      "Hybrid clock-in",
      "Remote contract vault",
      "Sprint & OKR alignment",
    ],
    imageUrl:
      "https://img.magnific.com/premium-photo/african-entrepreneur-having-business-call-coronavirus-sitting-workplace-wearing-face-mask-multiethnic-coworkers-working-respecting-social-distance-financial-company_16990631.jpg",
    stat: "45% faster technical hiring",
  },
  {
    id: "retail",
    name: "Retail & E-commerce",
    category: "service",
    description:
      "Shift scheduling across retail branches, seasonal staff management, and sales commission payouts.",
    features: [
      "Multi-store attendance",
      "Commission engine",
      "Casual worker roster",
    ],
    imageUrl:
      "https://img.magnific.com/free-photo/woman-promoting-cloths-from-thrift-store_23-2150952340.jpg",
    stat: "98% shift fill rate",
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Industrial",
    category: "industrial",
    description:
      "Rotational 24/7 plant shifts, biometric gate turnstiles, overtime rules, and health & safety compliance.",
    features: [
      "Biometric gate integration",
      "Overtime auto-calc",
      "Safety training logs",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
    stat: "Zero overtime calculation errors",
  },
  {
    id: "healthcare",
    name: "Healthcare & Clinics",
    category: "service",
    description:
      "Complex on-call medical rosters, doctor credential verification, and round-the-clock shift handovers.",
    features: [
      "Medical license expiry alerts",
      "Emergency roster swaps",
      "Departmental rotas",
    ],
    imageUrl:
      "https://img.magnific.com/free-photo/african-american-radiologist-doctor-disucssing-healthcare-treatment-with-patient-mother_482257-26939.jpg",
    stat: "24/7 uninterrupted patient coverage",
  },
  {
    id: "education",
    name: "Education & Schools",
    category: "service",
    description:
      "Term-based teacher contracts, academic leave schedules, and non-academic staff payroll administration.",
    features: [
      "Academic holiday calendar",
      "Contract renewal workflows",
      "Substitute teacher tracking",
    ],
    imageUrl:
      "https://img.magnific.com/premium-photo/hands-typing-laptop-cozy-evening-ambiance_1089440-4108.jpg",
    stat: "Seamless academic term onboarding",
  },
  {
    id: "hospitality",
    name: "Hospitality & Hotels",
    category: "service",
    description:
      "Front-of-house and housekeeping shift schedules, tip distribution, and high-volume seasonal staffing.",
    features: [
      "Service charge allocation",
      "Split shifts support",
      "Mobile time-punch",
    ],
    imageUrl:
      "https://img.magnific.com/free-photo/young-couple-talking-videocall-after-arriving-hotel-waiting-check-sitting-lounge-area-happy-tourists-resting-couch-using-online-videoconference-chat_482257-67513.jpg",
    stat: "100% staff roster transparency",
  },
  {
    id: "construction",
    name: "Construction & Real Estate",
    category: "industrial",
    description:
      "Geofenced construction site attendance, artisan timesheets, subcontractor tracking, and hazard perks.",
    features: [
      "Site-based GPS punch",
      "Daily artisan muster logs",
      "Project labor costing",
    ],
    imageUrl:
      "https://img.magnific.com/free-photo/smiling-african-american-woman-safety-helmet-near-model-building_23-2148039859.jpg",
    stat: "Accurate job-site labor allocation",
  },
  {
    id: "financial",
    name: "Financial Services",
    category: "corporate",
    description:
      "Strict regulatory audit trails, compliance certifications, high-security data isolation, and bonus schemes.",
    features: [
      "Four-eye payroll approvals",
      "Immutable audit logs",
      "NDPR/GDPR security",
    ],
    imageUrl:
      "https://img.magnific.com/premium-photo/african-american-candidate-signing-employment-contract-interview-with-hr-manager_482257-136918.jpg",
    stat: "Bank-grade compliance compliance",
  },
  {
    id: "professional",
    name: "Professional Services",
    category: "corporate",
    description:
      "Law firms, audit consultancies, and creative agencies tracking billable team hours and client allocations.",
    features: [
      "Billable hour tracking",
      "Expense disbursement",
      "Performance matrix",
    ],
    imageUrl:
      "https://img.magnific.com/premium-photo/school-administrator-printing-visitor-badges-front-office-desk_108855-13537.jpg?uid=R108549358&ga=GA1.1.135559016.1792137120&semt=ais_hybrid&w=740&q=80",
    stat: "30% increase in billable realization",
  },
  {
    id: "logistics",
    name: "Logistics & Transportation",
    category: "industrial",
    description:
      "Fleet driver check-ins, transit allowance management, per-diem reconciliation, and depot scheduling.",
    features: [
      "Mobile route check-in",
      "Per-diem cash reconciliations",
      "Driver license tracking",
    ],
    imageUrl:
      "https://img.magnific.com/free-photo/african-american-logistics-managers-discussing-inventory-management-software-while-checking-goods-stock-laptop-distribution-department-employees-talking-about-supply-chain-storehouse_482257-71406.jpg?t=st=1792141285~exp=1792144885~hmac=b9417448e0c976099a8ce0628c0e67851358917492a8d38ec33dd2e203ec1ccd&w=1060",
    stat: "Real-time driver shift visibility",
  },
  {
    id: "ngos",
    name: "NGOs & Nonprofits",
    category: "service",
    description:
      "Grant-specific employee allocations, donor-compliant timesheets, and multi-country field volunteer management.",
    features: [
      "Grant code time allocation",
      "Donor audit reports",
      "Expatriate payroll support",
    ],
    imageUrl:
      "https://img.magnific.com/premium-photo/group-young-african-american-volunteers-working-charity-center_839833-13689.jpg?w=360",
    stat: "100% grant audit compliance",
  },
  {
    id: "agriculture",
    name: "Agriculture & Agro-Allied",
    category: "industrial",
    description:
      "Plantation workforce rosters, seasonal harvest laborer tracking, piece-rate wages, and remote farm check-in.",
    features: [
      "Offline check-in sync",
      "Piece-rate pay calculation",
      "Seasonal worker records",
    ],
    imageUrl:
      "https://img.magnific.com/premium-photo/group-people-are-gathered-around-table-with-globe-it_1310179-5551.jpg",
    stat: "Effortless harvest payroll runs",
  },
  {
    id: "realestate",
    name: "Property Management",
    category: "service",
    description:
      "Facility maintenance staff schedules, estate security team shifts, and agent performance tracking.",
    features: [
      "Property location roster",
      "Maintenance staff logs",
      "Commission payouts",
    ],
    imageUrl:
      "https://img.magnific.com/free-photo/happy-cheerful-african-american-farm-worker-holding-crate-full-local-eco-friendly-ripe-leafy-greens-from-sustainable-crop-harvest-entrepreneurial-bio-permaculture-greenhouse-farm_482257-64585.jpg?t=st=1792141719~exp=1792145319~hmac=3e6c9f9c2c82f11ac1af44b1edb47fa279e7e805dd81e69267e15e20c4ea9d83&w=1060",
    stat: "Full facility staffing coverage",
  },
  {
    id: "restaurants",
    name: "Restaurants & Quick Service",
    category: "service",
    description:
      "Kitchen vs. floor staff shifts, tip pooling, food hygiene certificate renewal alerts, and high staff turnover.",
    features: [
      "Rapid shift swapper",
      "Tip management",
      "Health compliance tracking",
    ],
    imageUrl:
      "https://img.magnific.com/free-photo/full-shot-women-working-together_23-2149894686.jpg?uid=R108549358&ga=GA1.1.135559016.1792137120&semt=ais_hybrid&w=740&q=80",
    stat: "Zero understaffed dinner services",
  },
  {
    id: "security",
    name: "Security Services & Patrol",
    category: "industrial",
    description:
      "Strict guard muster tracking, post rotations, emergency shift coverage, and uniform asset issuance.",
    features: [
      "Patrol post assignments",
      "Instant relief guard calls",
      "Guard asset logs",
    ],
    imageUrl:
      "https://img.magnific.com/premium-photo/close-up-shot-caucasian-contractor-holding-real-estate-project-while-his-african-colleague-point_926199-2020561.jpg?w=360",
    stat: "100% guard post accountability",
  },
];

export const AI_PROMPT_EXAMPLES: AIPromptExample[] = [
  {
    id: "p1",
    query: "How many employees are currently on leave?",
    category: "Workforce Leave",
    aiResponse: {
      summary:
        "Currently, 6 employees are on approved leave across all branches today (representing 1.2% of your 482 total headcount). All positions have verified departmental coverage.",
      metrics: [
        {
          label: "Annual Leave",
          value: "4 Employees",
          note: "Returning next Monday",
        },
        {
          label: "Maternity Leave",
          value: "1 Employee",
          note: "Zainab Bello (Legal)",
        },
        {
          label: "Sick / Medical",
          value: "1 Employee",
          note: "Doctor note attached",
        },
      ],
      tableData: [
        {
          col1: "Zainab Bello",
          col2: "Maternity Leave (Legal Dept)",
          col3: "Nov 01 – Jan 24",
        },
        {
          col1: "Tunde Bakare",
          col2: "Annual Leave (Engineering)",
          col3: "Oct 12 – Oct 16",
        },
        {
          col1: "Grace Otieno",
          col2: "Annual Leave (Customer Ops)",
          col3: "Oct 10 – Oct 15",
        },
      ],
      actionSuggestion: "View full team calendar or export leave coverage PDF.",
    },
  },
  {
    id: "p2",
    query: "Generate this month's payroll summary.",
    category: "Payroll & Finance",
    aiResponse: {
      summary:
        "September 2026 payroll run has been calculated and verified. Total gross disbursement is ₦117,180,450 across 382 eligible employees with zero calculation variances.",
      metrics: [
        {
          label: "Net Take-Home Pay",
          value: "₦94,820,450",
          note: "Bank file generated",
        },
        {
          label: "PAYE Tax Remittance",
          value: "₦14,210,000",
          note: "Statutory compliance",
        },
        {
          label: "Total Pension (Employer + Staff)",
          value: "₦8,150,000",
          note: "PFAs reconciled",
        },
      ],
      tableData: [
        {
          col1: "Lagos Headquarters",
          col2: "240 Staff • ₦64,800,000",
          col3: "Verified ✓",
        },
        {
          col1: "Accra Office & Hub",
          col2: "62 Staff • GHS 320,000 equivalent",
          col3: "Verified ✓",
        },
        {
          col1: "Nairobi Regional Centre",
          col2: "80 Staff • KES 4,100,000 equivalent",
          col3: "Verified ✓",
        },
      ],
      actionSuggestion:
        "Trigger multi-tier executive approval or download bank payment file.",
    },
  },
  {
    id: "p3",
    query: "Show employees with repeated late attendance.",
    category: "Attendance & Discipline",
    aiResponse: {
      summary:
        "Found 4 employees with 3 or more late check-ins (>15 minutes past shift commencement) over the last 30 calendar days.",
      metrics: [
        {
          label: "Average Late Delay",
          value: "26 Minutes",
          note: "Traffic / commute cited",
        },
        {
          label: "Department Most Impacted",
          value: "Ikeja Logistics",
          note: "Depot Gate 2",
        },
      ],
      tableData: [
        {
          col1: "Emeka Nwosu",
          col2: "Ikeja Depot • 5 Lates this month",
          col3: "Auto-Warning Sent",
        },
        {
          col1: "Ibrahim Sani",
          col2: "Customer Support • 3 Lates",
          col3: "Supervisor Review",
        },
        {
          col1: "Kofi Mensah",
          col2: "Retail Store 4 • 3 Lates",
          col3: "Shift Swap Requested",
        },
      ],
      actionSuggestion:
        "Schedule a coaching 1-on-1 or review transport subsidy guidelines.",
    },
  },
  {
    id: "p4",
    query: "What is our current headcount and departmental breakdown?",
    category: "Organization Insights",
    aiResponse: {
      summary:
        "Your active workforce stands at 482 full-time employees, with 24 new hires joining this quarter and an overall annual retention rate of 96.4%.",
      metrics: [
        {
          label: "Total Active Headcount",
          value: "482 Staff",
          note: "+5.2% this quarter",
        },
        {
          label: "Gender Diversity Ratio",
          value: "48% F / 52% M",
          note: "Healthy balance",
        },
        {
          label: "Avg Employee Tenure",
          value: "3.4 Years",
          note: "Above industry avg",
        },
      ],
      tableData: [
        {
          col1: "Engineering & Product",
          col2: "142 Staff (29.5%)",
          col3: "98% retention",
        },
        {
          col1: "Operations & Logistics",
          col2: "164 Staff (34.0%)",
          col3: "95% retention",
        },
        {
          col1: "Commercial, Sales & Mktg",
          col2: "112 Staff (23.2%)",
          col3: "97% retention",
        },
      ],
      actionSuggestion:
        "Export high-res organization chart for executive presentation.",
    },
  },
  {
    id: "p5",
    query:
      "Help me create an onboarding checklist for a Senior Financial Analyst.",
    category: "Talent & Onboarding",
    aiResponse: {
      summary:
        "Generated a tailored 30-60-90 day onboarding roadmap for Senior Financial Analyst, covering compliance, ERP credentials, and stakeholder introductions.",
      metrics: [
        {
          label: "Core Milestones",
          value: "14 Tasks",
          note: "Auto-assigned to HR & Manager",
        },
        {
          label: "System Access Items",
          value: "5 Tools",
          note: "ERP, Banking Portal, NextSofthr",
        },
      ],
      tableData: [
        {
          col1: "Day 1 - 3: Foundation",
          col2: "Tax setup, contract signing, laptop handover",
          col3: "Auto-Triggered",
        },
        {
          col1: "Day 4 - 14: Integration",
          col2: "Ledger orientation, audit overview, team meet",
          col3: "Manager Assigned",
        },
        {
          col1: "Day 15 - 30: Delivery",
          col2: "First monthly variance draft & forecast review",
          col3: "Goal Metric",
        },
      ],
      actionSuggestion:
        "Apply this template directly to candidate in recruitment pipeline.",
    },
  },
];

export const INTEGRATION_CATEGORIES: IntegrationCategory[] = [
  {
    name: "Banking & Payments",
    description:
      "Direct automated disbursement to commercial bank accounts across Nigeria, Ghana, Kenya, and South Africa.",
    examples: [
      "NIBSS Direct Credit",
      "Paystack",
      "Flutterwave",
      "Interswitch",
      "Standard Bank Direct",
      "Absa Connect",
    ],
    badge: "Real-time Clearing",
    highlight:
      "Instant bulk salary payments without manual token signing per staff",
  },
  {
    name: "Accounting & ERP",
    description:
      "Synchronize payroll journals, department cost allocations, and statutory liabilities automatically.",
    examples: [
      "QuickBooks Online",
      "Xero",
      "Sage Business Cloud",
      "Zoho Books",
      "SAP Business One",
      "Oracle NetSuite",
    ],
    badge: "Two-Way Sync",
    highlight: "Zero double data entry for your accounting and finance teams",
  },
  {
    name: "Communication & Collaboration",
    description:
      "Deliver payslip alerts, shift changes, leave approvals, and company memos where employees already work.",
    examples: [
      "Slack Workspaces",
      "Microsoft Teams",
      "WhatsApp for Business",
      "Direct SMS Gateways",
      "Google Workspace",
    ],
    badge: "Instant Alerts",
    highlight: "Approve time off with a single click inside Slack or WhatsApp",
  },
  {
    name: "Identity & Access Management",
    description:
      "Enterprise single sign-on (SSO), multi-factor authentication, and automated de-provisioning on offboarding.",
    examples: [
      "Google Workspace SSO",
      "Microsoft Entra ID (Azure AD)",
      "Okta Identity Cloud",
      "SAML 2.0 / OpenID",
    ],
    badge: "Zero Trust Security",
    highlight: "Instant user revocation when an employee leaves the company",
  },
  {
    name: "Productivity & Calendars",
    description:
      "Keep company meetings and project schedules aligned with actual workforce availability.",
    examples: [
      "Google Calendar",
      "Outlook 365 Calendar",
      "Notion Workspaces",
      "Asana",
      "Trello",
    ],
    badge: "Smart Scheduling",
    highlight:
      "Team calendars automatically reflect approved leaves and holidays",
  },
  {
    name: "Biometric & Turnstiles",
    description:
      "Connect existing physical fingerprint, facial recognition, and RFID card gate terminals to the cloud.",
    examples: [
      "ZKTeco Terminals",
      "Hikvision Access",
      "Suprema Biometrics",
      "RFID Badge Readers",
      "Mobile Beacon",
    ],
    badge: "Hardware Sync",
    highlight:
      "Real-time cloud clock-ins directly from building entry turnstiles",
  },
  {
    name: "Business Applications",
    description:
      "Connect workforce metrics with operational sales, POS tills, and logistics software.",
    examples: [
      "Retail POS Systems",
      "Fleet Tracking Telematics",
      "Customer CRM Platforms",
      "Project Portals",
    ],
    badge: "Unified Data",
    highlight:
      "Correlate employee shift hours directly with branch sales performance",
  },
  {
    name: "Developer APIs & Webhooks",
    description:
      "Build custom internal enterprise automations and pull real-time workforce metrics into custom data lakes.",
    examples: [
      "RESTful OpenAPI v3",
      "Secure Webhook Triggers",
      "GraphQL Query Layer",
      "Python & Node.js SDKs",
    ],
    badge: "Developer Friendly",
    highlight:
      "99.99% API SLA with comprehensive documentation and code samples",
  },
];

export const SECURITY_ITEMS = [
  {
    title: "Bank-Grade Data Encryption",
    description:
      "All employee sensitive data, salary numbers, and identity records are encrypted using AES-256 at rest and TLS 1.3 in transit.",
  },
  {
    title: "Role-Based Access Control (RBAC)",
    description:
      "Granular permissions ensure employees only see their personal records, managers only see direct reports, and payroll data is strictly restricted.",
  },
  {
    title: "Immutable Audit Trails",
    description:
      "Every salary update, permission modification, profile change, and approval is logged with timestamp, user identity, and IP address.",
  },
  {
    title: "African Data Sovereignty & Protection",
    description:
      "Fully compliant with Nigeria Data Protection Regulation (NDPR), South Africa POPIA, Kenya Data Protection Act, and EU GDPR principles.",
  },
  {
    title: "Secure Multi-Factor Authentication (MFA)",
    description:
      "Enforce two-factor authentication via SMS OTP, authenticator apps, or company SSO to prevent unauthorized portal access.",
  },
  {
    title: "Continuous Automated Backups & High Availability",
    description:
      "Multi-zone geo-redundant database replication ensures 99.99% availability with automated snapshot backups every hour.",
  },
  {
    title: "Disaster Recovery & Redundancy",
    description:
      "Rapid failover protocols guarantee zero data loss in the event of local infrastructure outages or network disruptions.",
  },
  {
    title: "Privacy-First Architecture",
    description:
      "Your company data is never used to train public AI models. Data isolation guarantees your company records remain 100% private to your tenant.",
  },
];

export const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: "t1",
    quote:
      "NextSofthr completely transformed our month-end payroll. What used to take our finance team 4 full stressful days of manual Excel reconciliations now takes just 25 minutes. The localized Nigerian tax computations and instant bank integration are extraordinary.",
    author: "Olumide Adebayo",
    position: "Vice President of People & Culture",
    company: "TechSphere Africa Solutions",
    country: "Nigeria",
    countryFlag: "🇳🇬",
    verifiedStatus: "Verified Enterprise Customer (350+ Staff)",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "t2",
    quote:
      "Operating 12 retail supermarkets across Accra and Kumasi meant shift scheduling and overtime tracking were nightmares. NextSofthr gave us real-time attendance, eliminated paper timesheets, and our store managers love the simple mobile approval app.",
    author: "Akosua Mensah",
    position: "Head of Human Capital & Operations",
    company: "GoldCoast Retail Group",
    country: "Ghana",
    countryFlag: "🇬🇭",
    verifiedStatus: "Verified Retail Network (600+ Staff)",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "t3",
    quote:
      "We coordinate cross-border logistics across Kenya, Uganda, and Rwanda. Having a single HR and payroll platform that understands multi-currency salaries, regional statutory rules, and field driver check-ins has given our executive board complete visibility.",
    author: "David Mwangi",
    position: "Chief Operating Officer",
    company: "Savanna Freight & Logistics",
    country: "Kenya",
    countryFlag: "🇰🇪",
    verifiedStatus: "Verified Regional Logistics Hub (450+ Staff)",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "t4",
    quote:
      "The Employee Self-Service portal and AI HR Assistant have cut our routine HR support tickets by over 70%. Staff access their own tax certificates, log leave, and check shifts without bothering HR. It is world-class software built with African businesses in mind.",
    author: "Zanele Khumalo",
    position: "Human Resources Director",
    company: "Apex Financial Services",
    country: "South Africa",
    countryFlag: "🇿🇦",
    verifiedStatus: "Verified Financial Institution (800+ Staff)",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "t5",
    quote:
      "As an agro-tech business managing farm workers across seasonal harvest cycles, NextSofthr simplified casual worker rosters, piece-rate payments, and contract archives. The implementation team held our hands throughout onboarding.",
    author: "Jean-Paul Habimana",
    position: "Founder & Managing Director",
    company: "Kivu AgroTech Holdings",
    country: "Rwanda",
    countryFlag: "🇷🇼",
    verifiedStatus: "Verified Agribusiness Partner (280+ Staff)",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
  },
];

export const STATS_BAND = [
  {
    module: "HR Management",
    stat: "100%",
    label: "Digital Employee Records",
    subtext: "Zero missing physical files & contracts",
  },
  {
    module: "Payroll Processing",
    stat: "0",
    label: "Calculation Errors & Penalties",
    subtext: "Auto-updated statutory tax rates",
  },
  {
    module: "Time & Attendance",
    stat: "Real-Time",
    label: "Biometric & Mobile Clock-In",
    subtext: "GPS geofencing across all locations",
  },
  {
    module: "Leave Management",
    stat: "< 2 Hrs",
    label: "Average Approval Turnaround",
    subtext: "Automated multi-level manager sign-offs",
  },
  {
    module: "Performance Alignment",
    stat: "360°",
    label: "Objective OKR & KPI Tracking",
    subtext: "Continuous coaching and review cycles",
  },
  {
    module: "AI HR Assistance",
    stat: "Instant",
    label: "Natural Language Workflows",
    subtext: "Deep workforce insights on demand",
  },
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: "faq-1",
    category: "Overview",
    question: "What is NextSofthr?",
    answer:
      "NextSofthr is an all-in-one, cloud-based HR, Payroll and Business Management platform specifically engineered for modern micro, small, medium-sized, and enterprise businesses across Africa and globally. It brings together core HR records, automated payroll calculations, attendance tracking, shift scheduling, leave workflows, performance appraisals, recruitment pipelines, and AI assistance into one connected platform.",
  },
  {
    id: "faq-2",
    category: "Target Audience",
    question: "Who is NextSofthr designed for?",
    answer:
      "NextSofthr is designed for business owners, HR directors, people managers, finance controllers, and payroll accountants across micro-enterprises (1-15 staff), growing SMEs (16-250 staff), and large enterprise conglomerates (250+ to 10,000+ staff) operating across retail, technology, manufacturing, financial services, healthcare, logistics, hospitality, NGOs, and professional services.",
  },
  {
    id: "faq-3",
    category: "Business Size",
    question: "Can small businesses use NextSofthr?",
    answer:
      "Yes, absolutely! We offer streamlined, highly affordable plans specifically built for startups, micro-businesses, and growing SMEs. You can set up your company in as little as 24 hours, eliminate spreadsheet payroll chaos, and give your employees modern self-service tools from their very first day.",
  },
  {
    id: "faq-4",
    category: "Business Size",
    question: "Can NextSofthr support large organizations?",
    answer:
      "Yes. NextSofthr is built on robust enterprise cloud architecture capable of handling multi-company corporate structures, multi-currency payrolls, complex approval matrices, thousands of concurrent biometric turnstiles, and millions in monthly disbursements with 99.99% guaranteed uptime and dedicated enterprise SLAs.",
  },
  {
    id: "faq-5",
    category: "Features",
    question: "Does NextSofthr include payroll?",
    answer:
      "Yes, Smart Payroll Management is one of our flagship modules. It automates complex statutory computations (including localized PAYE taxes, pension contributions, National Housing Fund, health insurance schemes, and custom allowances), generates branded payslips, and outputs direct bank disbursement schedules compatible with all major commercial banks.",
  },
  {
    id: "faq-6",
    category: "Features",
    question: "Does NextSofthr support employee self-service?",
    answer:
      "Yes. Every employee receives a dedicated self-service portal accessible via web browser and mobile device. Employees can securely view and download past payslips, check their real-time leave balances, submit time-off requests, punch in/out with GPS confirmation, update personal bank details, and submit travel expense claims.",
  },
  {
    id: "faq-7",
    category: "Technology",
    question: "Does NextSofthr have AI capabilities?",
    answer:
      "Yes! NextSofthr includes an enterprise AI HR Assistant that allows HR teams and managers to query company workforce data in natural language (e.g., asking for headcount summaries, leave calendar overlaps, or overtime variances), draft role descriptions, detect payroll anomalies before disbursement, and provide instant policy answers to employees based on your internal handbook.",
  },
  {
    id: "faq-8",
    category: "Accessibility",
    question: "Can employees access NextSofthr remotely?",
    answer:
      "Yes. NextSofthr is a modern cloud-first application. Whether your team is in the corporate office, working from home, stationed at remote manufacturing plants, or traveling across international borders, they can access their dashboard 24/7 on any smartphone, tablet, or laptop.",
  },
  {
    id: "faq-9",
    category: "Scalability",
    question: "Can NextSofthr support multiple departments and locations?",
    answer:
      "Yes. You can configure multiple subsidiaries, regional offices, branch locations, and cost centers. Each branch can have its own local managers, shift patterns, and holiday calendars, while group executive leadership maintains consolidated reporting across the entire organization.",
  },
  {
    id: "faq-10",
    category: "Integration",
    question: "Can NextSofthr integrate with other business systems?",
    answer:
      "Yes. NextSofthr features seamless integration points with leading accounting software (QuickBooks, Xero, Sage), commercial banking portals, hardware biometric attendance terminals (ZKTeco, Hikvision), collaboration tools (Slack, Microsoft Teams, WhatsApp), identity providers (Google Workspace, Microsoft Entra ID), and provides open RESTful APIs for custom enterprise data pipelines.",
  },
  {
    id: "faq-11",
    category: "Implementation",
    question: "How does implementation work?",
    answer:
      "Our structured 5-step implementation methodology (Understand, Configure, Connect, Automate, Grow) pairs your organization with an experienced implementation specialist. We handle your legacy data migration from Excel or old HRMS tools, configure your specific salary and tax structures, and run parallel pilot tests so your team transitions smoothly in 7 to 14 business days.",
  },
  {
    id: "faq-12",
    category: "Getting Started",
    question: "Can I request a demo?",
    answer:
      'Yes! You can click the "Book a Demo" button anywhere on this page to schedule an interactive personalized walkthrough with one of our HR technology specialists, or call us directly at +2349158482622. We will demonstrate how NextSofthr can be tailored to your exact business size and industry requirements.',
  },
];

export const FAQ_ITEMS = FAQ_LIST;

export const STATS_ITEMS = [
  {
    value: "85%",
    label: "Hours Saved on Payroll",
    description:
      "Finance teams complete complex payrolls in minutes instead of days.",
  },
  {
    value: "94%",
    label: "Reduction in Attendance Errors",
    description:
      "Biometric terminals and mobile GPS geofencing eliminate manual timesheet errors.",
  },
  {
    value: "3x",
    label: "Faster Leave Approvals",
    description:
      "Instant manager mobile sign-offs and auto-updating statutory leave balances.",
  },
  {
    value: "98%",
    label: "Employee Adoption Rate",
    description:
      "Intuitive self-service portal empowering workers across Africa on any smartphone.",
  },
];
