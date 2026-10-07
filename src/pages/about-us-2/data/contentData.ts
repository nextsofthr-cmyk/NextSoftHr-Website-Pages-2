import {
  NavLink,
  ValueCard,
  PlatformModule,
  IndustryCard,
  TeamPillar,
  StoryPhase,
  VideoChapter,
  AIAssistantSample,
  CustomerSuccessQuote
} from '../types';

export const BRAND = {
  name: 'NextSofthr',
  website: 'www.nextsofthr.org',
  websiteUrl: 'https://www.nextsofthr.org',
  phone: '+2349158482622',
  phoneDisplay: '+234 915 848 2622',
  email: 'info@nextsofthr.org',
  address: 'Lagos & Global Distributed Hubs',
  tagline: 'Empowering Businesses Through Smarter People & Business Management',
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Features', href: '#platform' },
  { label: 'Solutions', href: '#who-we-serve' },
  { label: 'Pricing', href: '#pricing-preview' },
  { label: 'About Us', href: '#about-intro', isCurrent: true },
  { label: 'Resources', href: '#ai-future' },
  { label: 'Partners', href: '#people' },
  { label: 'Contact', href: '#cta' },
];

export const CAPABILITY_HIGHLIGHTS = [
  {
    title: 'HR Management',
    description: 'Centralized employee directory, smart records, onboarding lifecycles and self-service portals.',
    icon: 'Users',
    badge: 'Core Module',
  },
  {
    title: 'Payroll Automation',
    description: 'Multi-tier tax rules, statutory deductions, multi-currency payouts, and one-click payslip generation.',
    icon: 'Calculator',
    badge: 'Automated',
  },
  {
    title: 'Time & Attendance',
    description: 'Biometric, GPS mobile clock-in, flexible shift schedules, real-time rosters, and overtime tracking.',
    icon: 'Clock',
    badge: 'Real-time',
  },
  {
    title: 'Employee Management',
    description: 'Performance milestones, disciplinary notes, asset allocations, and comprehensive personnel files.',
    icon: 'UserCheck',
    badge: 'Ecosystem',
  },
  {
    title: 'Business Management',
    description: 'Connect departments, department budgets, approval workflows, and audit-ready operational oversight.',
    icon: 'Briefcase',
    badge: 'Unified',
  },
  {
    title: 'AI-Powered Assistance',
    description: 'Conversational HR insights, automated payroll variance audits, query resolution, and workflow drafts.',
    icon: 'Sparkles',
    badge: 'NextGen AI',
  },
];

export const STORY_PHASES: StoryPhase[] = [
  {
    stage: 'The Challenge',
    title: 'Siloed Tools & Fragmented Spreadsheets',
    description:
      'African enterprises and fast-growing organizations faced a common bottleneck: disconnected spreadsheets, manually calculated payrolls, mismatched tax deductions, and fragmented paperwork across offices that consumed hundreds of hours every month.',
    accent: 'from-[#0B3B73] to-[#1E40AF]',
    icon: 'AlertTriangle',
    bulletPoints: [
      'Manual payroll runs prone to formula errors and delays',
      'Attendance data locked in paper logs or isolated biometric clocks',
      'No single source of truth for employee records across branches',
    ],
  },
  {
    stage: 'The Idea',
    title: 'A Unified People & Operations Hub',
    description:
      'We envisioned an intuitive, cloud-native platform specifically architected to reflect how businesses in Africa actually operate—supporting statutory tax variations, local compliance, intermittent connectivity, and mobile-first teams while matching global software standards.',
    accent: 'from-[#0B3B73] to-[#84CC16]',
    icon: 'Lightbulb',
    bulletPoints: [
      'Rooted in deep African business realities and labor regulations',
      'Designed with zero training curve for both field staff and executives',
      'Accessible across desktop, tablets, and smartphones',
    ],
  },
  {
    stage: 'The Platform',
    title: 'An Integrated HR, Payroll & Operations Ecosystem',
    description:
      'NextSofthr was engineered: an all-in-one suite bridging people administration, automated payroll calculation, time & leave tracking, departmental workflows, and intelligent business reporting into a single secure platform.',
    accent: 'from-[#0B3B73] to-[#0A2540]',
    icon: 'Cpu',
    bulletPoints: [
      'Automated statutory compliance across multiple African jurisdictions',
      'Modular architecture that expands as companies grow from 5 to 5,000 employees',
      'Bank-grade data encryption with multi-location automated backups',
    ],
  },
  {
    stage: 'The Vision',
    title: 'Empowering Workplaces Across Continents',
    description:
      'Today, NextSofthr is building the infrastructure that lets micro, small, medium, and multinational businesses operate with corporate sophistication, scaling from African commercial hubs to global international operations.',
    accent: 'from-[#84CC16] to-[#0B3B73]',
    icon: 'Globe',
    bulletPoints: [
      'Empowering organizations across Africa and global markets',
      'Continuous AI integration to automate routine administrative load',
      'Enabling sustainable business growth through smarter workforce data',
    ],
  },
];

export const CORE_VALUES: ValueCard[] = [
  {
    number: '01',
    title: 'Customer First',
    description:
      'We design our products and services around real business needs, helping customers achieve meaningful, measurable operational results.',
    iconName: 'HeartHandshake',
  },
  {
    number: '02',
    title: 'Innovation',
    description:
      'We continuously explore better technologies, cloud automation, and practical AI to advance how organizations manage their workforces.',
    iconName: 'Zap',
  },
  {
    number: '03',
    title: 'Simplicity',
    description:
      'We believe powerful enterprise technology should be straightforward to implement, delightful to understand, and effortless to use daily.',
    iconName: 'Sliders',
  },
  {
    number: '04',
    title: 'Integrity',
    description:
      'We operate with uncompromised transparency, rigorous data privacy, accountability, and respect for our customers, partners, and team members.',
    iconName: 'ShieldCheck',
  },
  {
    number: '05',
    title: 'Collaboration',
    description:
      'We believe great businesses are built through strong, reciprocal relationships, cross-functional teamwork, and shared long-term milestones.',
    iconName: 'Users2',
  },
  {
    number: '06',
    title: 'Growth',
    description:
      'We help businesses and their employees unlock their full potential by providing tools that drive productivity, clarity, and informed decision-making.',
    iconName: 'TrendingUp',
  },
];

export const BELIEFS = [
  {
    title: 'Reduce Unnecessary Administrative Work',
    description: 'Eliminate repetitive manual entry so HR leaders and managers can focus on culture, talent development, and strategic initiatives.',
  },
  {
    title: 'Make Information Instantly Accessible',
    description: 'Break down departmental information silos. Let employees check payslips and managers approve requests in seconds.',
  },
  {
    title: 'Connect People and Processes Seamlessly',
    description: 'Link hiring to onboarding, onboarding to attendance, attendance to payroll, and payroll to operational financial reporting.',
  },
  {
    title: 'Automate Repetitive Tasks with Precision',
    description: 'Remove human computation errors in tax brackets, pension deductions, overtime formulas, and recurring leave accruals.',
  },
  {
    title: 'Help Managers Make Informed Decisions',
    description: 'Deliver actionable, real-time people analytics and workforce cost projections before budget deadlines arrive.',
  },
  {
    title: 'Give Businesses Greater Visibility & Control',
    description: 'Equip leadership with transparent oversight across multiple branches, remote staff, and distributed country operations.',
  },
  {
    title: 'Support Employees Throughout Their Journey',
    description: 'From day one welcome kits to career appraisals and milestone recognition, empower every individual in your company.',
  },
];

export const PLATFORM_MODULES: PlatformModule[] = [
  {
    id: 'hr',
    title: 'HR & Personnel',
    shortDesc: 'Employee records, digital onboarding, document vaults, and lifecycle administration.',
    fullDesc:
      'Create a unified digital directory of every team member. Manage contracts, certifications, emergency contacts, role transitions, and company-wide announcements in one secure repository.',
    iconName: 'Users',
    features: [
      'Self-service employee profiles',
      'Automated onboarding checklists',
      'Secure document storage & expirations',
      'Custom org charts & hierarchy views',
      'Company policy distribution & e-signatures',
    ],
    metricsPreview: {
      label: 'Onboarding Turnaround',
      value: '78% Faster',
      subtext: 'Digitized paperless workflows',
    },
  },
  {
    id: 'attendance',
    title: 'Time & Attendance',
    shortDesc: 'Attendance tracking, work schedules, shifts, and employee time management.',
    fullDesc:
      'Capture attendance accurately via mobile geo-fenced clock-ins, biometric hardware syncing, or web punch cards. Configure rotating shifts, overtime calculations, and work rosters effortlessly.',
    iconName: 'Clock',
    features: [
      'Geo-fenced mobile clock-in & out',
      'Biometric hardware integration',
      'Custom shift scheduling & rotations',
      'Overtime & late-coming tracking',
      'Direct sync with payroll calculations',
    ],
    metricsPreview: {
      label: 'Roster Accuracy',
      value: '99.4%',
      subtext: 'Eliminates buddy punching & attendance gaps',
    },
  },
  {
    id: 'leave',
    title: 'Leave Management',
    shortDesc: 'Leave requests, multi-tier approvals, balances, and organizational visibility.',
    fullDesc:
      'Eliminate paper leave forms. Employees check their real-time paid time off, maternity, sick, or study leave balances. Managers approve or decline requests with a single click from email or mobile.',
    iconName: 'CalendarCheck',
    features: [
      'Automated leave accrual & policies',
      'Customizable multi-level approval chains',
      'Departmental leave calendar view',
      'Public holiday calendar management',
      'Instant notifications on Slack, WhatsApp & Email',
    ],
    metricsPreview: {
      label: 'Leave Approval Time',
      value: '< 2 Hours',
      subtext: 'Down from 3-5 working days',
    },
  },
  {
    id: 'payroll',
    title: 'Automated Payroll',
    shortDesc: 'Payroll processing, compensation, statutory deductions, payslips, and compliance.',
    fullDesc:
      'Run accurate payroll in minutes instead of days. Automatic calculation of PAYE, pension contributions, NHF, NSITF, state levies, and company deductions. Generate one-click bank disbursement schedules.',
    iconName: 'Wallet',
    features: [
      'Multi-currency salary disbursements',
      'Automatic statutory tax & pension calculations',
      'Instant digital payslip delivery via email & portal',
      'Direct bank disbursement upload formats',
      'Historical payroll auditing & variance reports',
    ],
    metricsPreview: {
      label: 'Payroll Processing Time',
      value: '15 Minutes',
      subtext: 'Automated end-of-month computation',
    },
  },
  {
    id: 'business',
    title: 'Business Operations',
    shortDesc: 'Connect essential business processes, branch assets, and organizational data.',
    fullDesc:
      'Bridge people operations with overarching commercial workflows. Track company assets, operational expenses, department budgets, and vendor contacts with full governance.',
    iconName: 'Building2',
    features: [
      'Company asset tracking & assignment',
      'Department budget & expense tracking',
      'Custom approval workflows for requisitions',
      'Executive KPI dashboards & audit trails',
      'Multi-branch permissions & entity management',
    ],
    metricsPreview: {
      label: 'Operational Visibility',
      value: 'Real-Time',
      subtext: 'Unified multi-entity oversight',
    },
  },
  {
    id: 'ai-assistant',
    title: 'AI HR & Payroll Assistant',
    shortDesc: 'Find answers, understand complex HR processes, analyze trends, and simplify tasks.',
    fullDesc:
      'Your conversational co-pilot for people management. Ask questions in natural English to spot payroll anomalies, draft job descriptions, query labor law guidelines, or generate workforce distribution summaries.',
    iconName: 'Sparkles',
    features: [
      'Instant natural-language queries across HR records',
      'Automated payroll variance detection',
      'AI-assisted job description & review drafting',
      'Smart policy clarification for employees',
      'Predictive turnover & absenteeism indicators',
    ],
    metricsPreview: {
      label: 'Query Resolution',
      value: 'Instant',
      subtext: 'Answers common staff questions 24/7',
    },
  },
];

export const WHO_WE_SERVE_LIST: IndustryCard[] = [
  {
    id: 'micro',
    category: 'size',
    name: 'Micro Businesses',
    description: 'Teams of 1 to 10 employees seeking clean, affordable digital payroll and employee records without complexity.',
    iconName: 'Store',
    highlight: 'Quick 1-day rollout',
  },
  {
    id: 'small',
    category: 'size',
    name: 'Small Businesses',
    description: 'Companies with 10 to 50 staff replacing chaotic spreadsheets with automated attendance and direct bank payslips.',
    iconName: 'Briefcase',
    highlight: 'Zero IT overhead',
  },
  {
    id: 'medium',
    category: 'size',
    name: 'Medium-Sized Businesses',
    description: 'Organizations scaling to multiple departments, structured hierarchies, performance appraisals, and structured leave.',
    iconName: 'Building',
    highlight: 'Multi-dept approvals',
  },
  {
    id: 'enterprise',
    category: 'size',
    name: 'Large Enterprises',
    description: 'High-volume workforce operations requiring fine-grained RBAC, custom audit logs, and integration with ERPs.',
    iconName: 'Landmark',
    highlight: 'Enterprise SLA & audits',
  },
  {
    id: 'startups',
    category: 'size',
    name: 'Growing Startups',
    description: 'Fast-moving tech and venture-backed ventures looking for modern tools that scale smoothly from seed to Series B.',
    iconName: 'Rocket',
    highlight: 'Agile team dynamics',
  },
  {
    id: 'multinationals',
    category: 'size',
    name: 'Multinational Organizations',
    description: 'Companies operating across several African countries and overseas, requiring multi-currency and multi-jurisdiction compliance.',
    iconName: 'Globe2',
    highlight: 'Pan-African & global',
  },
  {
    id: 'prof-services',
    category: 'industry',
    name: 'Professional Services',
    description: 'Law firms, accounting practices, consultancies, and creative agencies managing client billable hours and talent.',
    iconName: 'FileText',
    highlight: 'Time tracking & contracts',
  },
  {
    id: 'retail',
    category: 'industry',
    name: 'Retail & Supermarkets',
    description: 'Stores and franchises requiring rotating cashier shifts, multi-store rosters, and prompt shift replacement management.',
    iconName: 'ShoppingBag',
    highlight: 'Roster & shift swaps',
  },
  {
    id: 'tech',
    category: 'industry',
    name: 'Technology Companies',
    description: 'Remote-first and hybrid engineering and product teams demanding paperless onboarding and remote attendance.',
    iconName: 'Laptop',
    highlight: 'Remote workforce sync',
  },
  {
    id: 'finance',
    category: 'industry',
    name: 'Financial Services',
    description: 'Banks, microfinance institutions, and fintech firms needing rigorous compliance, strict security, and flawless payroll.',
    iconName: 'Coins',
    highlight: 'Auditable compliance',
  },
  {
    id: 'manufacturing',
    category: 'industry',
    name: 'Manufacturing & Plants',
    description: 'Industrial facilities with large shift-based floor staff, overtime calculations, and biometric attendance clocks.',
    iconName: 'Factory',
    highlight: 'Factory floor shifts',
  },
  {
    id: 'hospitality',
    category: 'industry',
    name: 'Hospitality & Hotels',
    description: 'Hotels, restaurants, and resorts balancing seasonal staff, variable shifts, service charge sharing, and tip handling.',
    iconName: 'Hotel',
    highlight: 'Seasonal staff support',
  },
  {
    id: 'logistics',
    category: 'industry',
    name: 'Logistics & Haulage',
    description: 'Transport, courier, and supply-chain operators tracking field drivers, dispatchers, and regional distribution hubs.',
    iconName: 'Truck',
    highlight: 'Mobile geo-tracking',
  },
  {
    id: 'healthcare',
    category: 'industry',
    name: 'Healthcare & Clinics',
    description: 'Hospitals, medical labs, and clinics managing 24/7 doctor and nurse rotations, on-call allowances, and credential tracking.',
    iconName: 'Stethoscope',
    highlight: '24/7 rotation management',
  },
  {
    id: 'education',
    category: 'industry',
    name: 'Education & Schools',
    description: 'Primary, secondary, and tertiary institutions handling academic vs. non-academic staff contracts and termly calendars.',
    iconName: 'GraduationCap',
    highlight: 'Termly leave & payroll',
  },
  {
    id: 'nonprofits',
    category: 'industry',
    name: 'Nonprofits & NGOs',
    description: 'Development organizations and charities tracking grant-allocated salaries, field volunteer stipends, and donor audits.',
    iconName: 'HandHeart',
    highlight: 'Grant-allocated salaries',
  },
];

export const TEAM_PILLARS: TeamPillar[] = [
  {
    role: 'Product & Architecture Teams',
    mission: 'Engineering intuitive workflows tailored to African business rhythms and global resilience.',
    focus: 'Enterprise Scalability & Zero-Friction UX',
    image: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=800&auto=format&fit=crop',
    keySkills: ['Cloud Infrastructure', 'Microservices', 'UX Research', 'Mobile Interfaces'],
  },
  {
    role: 'HR & Labor Specialists',
    mission: 'Guiding platform logic to reflect practical statutory tax acts, labor codes, and workplace trends.',
    focus: 'Regulatory Precision & People Best Practices',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    keySkills: ['Statutory Compliance', 'Talent Strategy', 'Compensation Modeling', 'Labor Relations'],
  },
  {
    role: 'Payroll Engineers & Analysts',
    mission: 'Ensuring penny-accurate multi-currency calculations, pension compliance, and instant bank handshakes.',
    focus: '100% Mathematical & Tax Accuracy',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    keySkills: ['Automated Computation', 'Multi-Currency Math', 'Banking Protocols', 'Tax Audit Tracing'],
  },
  {
    role: 'Customer Success & Implementation',
    mission: 'Providing hands-on onboarding, staff training, and fast support in local time zones.',
    focus: 'Customer Flourishing & Seamless Migration',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop',
    keySkills: ['Data Migration', 'Team Training', 'Priority Support', 'Workflow Optimization'],
  },
];

export const AI_ASSISTANT_SAMPLES: AIAssistantSample[] = [
  {
    id: 'payroll-audit',
    category: 'Payroll Intelligence',
    prompt: 'Summarize March payroll variances and flag any unusual overtime spikes across our offices.',
    response: {
      title: 'March Payroll Variance Analysis Completed',
      summary:
        'Analyzed 184 employee records across Lagos (HQ), Abuja, and Nairobi hubs. Total net disbursement increased by 4.2% primarily driven by scheduled Q1 performance increments in Sales.',
      dataPoints: [
        { label: 'Total Net Payroll', value: '₦46,820,400', badge: 'Normal' },
        { label: 'Variance vs Feb', value: '+₦1,890,000 (+4.2%)', badge: 'Expected' },
        { label: 'Overtime Hours Flagged', value: '32 hrs in Logistics', badge: 'Review Needed' },
      ],
      actionItems: [
        'Approved sales incentive schedule matches HR letter dated Feb 28',
        '2 logistics team members exceeded standard 15h overtime threshold due to port clearance backlog',
        'Tax & Pension remittances pre-formatted for direct e-filing',
      ],
    },
  },
  {
    id: 'leave-coverage',
    category: 'Leave & Attendance',
    prompt: 'Check leave coverage for the Engineering and Support departments during the upcoming festive period.',
    response: {
      title: 'Departmental Leave Coverage Assessment',
      summary:
        'Reviewed 24 pending and approved leave requests for December 18 – January 5. Support team maintains 72% minimum operational capacity; Engineering has 2 on-call engineers scheduled per shift.',
      dataPoints: [
        { label: 'Support Shift Coverage', value: '72% Available', badge: 'Adequate' },
        { label: 'Overlapping Critical Roles', value: '0 Conflicts', badge: 'Clear' },
        { label: 'On-Call Engineers Confirmed', value: '4 Senior Leads', badge: 'Assigned' },
      ],
      actionItems: [
        'No overlapping leaves between Tier-2 escalation managers',
        'Emergency standby allowance pre-calculated for holiday shift staff',
      ],
    },
  },
  {
    id: 'onboarding-draft',
    category: 'Talent & HR Ops',
    prompt: 'Draft an accelerated 7-day onboarding plan for our incoming Senior Regional Operations Manager.',
    response: {
      title: 'Tailored 7-Day Executive Onboarding Plan Generated',
      summary:
        'Standardized 30-item compliance and orientation checklist configured with automated document collection, system credential provisioning, and departmental meet-and-greet calendar invites.',
      dataPoints: [
        { label: 'Tax & Bank Verification', value: 'Automated via Portal', badge: 'Ready' },
        { label: 'Asset Requisition', value: 'MacBook Pro + Access Badge', badge: 'Dispatched' },
        { label: 'Compliance Read-Throughs', value: '5 Modules Assigned', badge: 'Scheduled' },
      ],
      actionItems: [
        'Day 1: Digital contract e-signature & company culture overview',
        'Day 2-3: Deep-dive with Finance & Payroll leads on operational budgets',
        'Day 4-7: Regional branch tour & first 30-day KPI alignment review',
      ],
    },
  },
];

export const VIDEO_STORY_CHAPTERS: VideoChapter[] = [
  {
    id: 1,
    time: '0:00 - 0:08',
    title: '1. African Entrepreneur Opening a Business',
    description: 'An ambitious founder unlocking doors at dawn in a bustling commercial district, preparing to scale a visionary venture.',
    duration: 8,
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    time: '0:08 - 0:16',
    title: '2. HR Manager Managing Employee Records',
    description: 'A professional HR manager reviewing digital profiles on NextSofthr, effortlessly updating benefits and promotions.',
    duration: 8,
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 3,
    time: '0:16 - 0:24',
    title: '3. Employee Clocking In Seamlessly',
    description: 'Staff arriving at office premises, clocking in with a quick tap on mobile with verified geo-location.',
    duration: 8,
    thumbnail: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 4,
    time: '0:24 - 0:32',
    title: '4. Manager Reviewing Attendance Rosters',
    description: 'A team lead checking live floor attendance, confirming shift coverages and approving overtime requests on a tablet.',
    duration: 8,
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 5,
    time: '0:32 - 0:42',
    title: '5. Payroll Administrator Processing Monthly Pay',
    description: 'One-click payroll run automatically calculating tax, pension deductions, bonuses, and generating encrypted payslips.',
    duration: 10,
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 6,
    time: '0:42 - 0:52',
    title: '6. Business Owner Reviewing Executive Analytics',
    description: 'Leadership examining real-time headcount growth, branch operational costs, and productivity metrics.',
    duration: 10,
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 7,
    time: '0:52 - 1:02',
    title: '7. HR Consultant Training a Client Team',
    description: 'A NextSofthr implementation specialist guiding business leaders through customized payroll and policy setups.',
    duration: 10,
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 8,
    time: '1:02 - 1:12',
    title: '8. International Teams Collaborating',
    description: 'Cross-border teams in Lagos, Nairobi, London, and New York coordinating operations on a single unified interface.',
    duration: 10,
    thumbnail: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 9,
    time: '1:12 - 1:22',
    title: '9. NextSofthr Dashboard In Action',
    description: 'A showcase of clean visual graphs, one-click approvals, and lightning-fast search in the NextSofthr platform.',
    duration: 10,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 10,
    time: '1:22 - 1:30',
    title: '10. Closing Global Brand Animation',
    description: 'The NextSofthr logo illuminating with African roots branching into a connected global network of modern workplaces.',
    duration: 8,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'One Connected Platform',
    description: 'Bring essential HR, payroll, attendance, leave, and business processes together into one coherent, synchronized database.',
    icon: 'Layers',
    benefit: 'Eliminates 5+ disconnected subscriptions and spreadsheet sprawl',
  },
  {
    title: 'Designed for Business Growth',
    description: 'Support businesses as teams, branch locations, and cross-border operations expand from single digit staff to thousands.',
    icon: 'TrendingUp',
    benefit: 'Seamless scalability with enterprise-grade permission tiers',
  },
  {
    title: 'Simple User Experience',
    description: 'Make powerful enterprise technology delightfully easy for everyday employees, frontline managers, and seasoned executives to use.',
    icon: 'Smile',
    benefit: 'Zero steep learning curves; instant adoption across teams',
  },
  {
    title: 'Modern Automation',
    description: 'Reduce repetitive administrative processes, eliminating calculation errors, manual data transfers, and compliance blindspots.',
    icon: 'Zap',
    benefit: 'Saves 30+ hours of manual administrative labor every month',
  },
  {
    title: 'AI-Powered Assistance',
    description: 'Make critical information and daily business workflows accessible through intelligent natural language query assistance.',
    icon: 'Sparkles',
    benefit: 'Instant compliance summaries, variance checks, and draft generators',
  },
  {
    title: 'Global Vision, African Foundation',
    description: 'Built with an intimate understanding of African business realities while architected to support global enterprises effortlessly.',
    icon: 'Globe',
    benefit: 'Local tax & mobile money support coupled with global compliance',
  },
];

export const CUSTOMER_SUCCESS_QUOTES: CustomerSuccessQuote[] = [
  {
    id: 'quote-1',
    name: 'Funmi Adeyemi',
    role: 'Founder & Managing Director',
    personaCategory: 'Small Business Owner',
    companyType: 'Multi-Branch Retail & E-commerce',
    companyName: 'Kora Lifestyle Outlets',
    location: 'Lagos & Abuja, Nigeria',
    quote:
      'Before NextSofthr, running payroll across our four store locations took three exhausting, sleepless days every month. Now, attendance syncs automatically from employees’ mobile clock-ins and payroll is finalized in under 15 minutes with zero tax calculation mistakes.',
    highlightStat: {
      value: '92%',
      label: 'Faster Payroll Cycles',
    },
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    verifiedUser: true,
  },
  {
    id: 'quote-2',
    name: 'Kwesi Mensah',
    role: 'Group HR Director',
    personaCategory: 'HR Director',
    companyType: 'Regional Freight & Supply Chain',
    companyName: 'Apex Logistics International',
    location: 'Accra, Ghana & Abidjan, Côte d’Ivoire',
    quote:
      'Managing field drivers, warehouse staff, and regional office professionals was our single biggest organizational bottleneck. NextSofthr gave us a unified people directory with crystal-clear shift rosters and automated cross-border statutory compliance that our auditors applaud.',
    highlightStat: {
      value: '100%',
      label: 'Multi-Country Tax Compliance',
    },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    verifiedUser: true,
  },
  {
    id: 'quote-3',
    name: 'Tariq El-Mansoor',
    role: 'Owner & Executive Chef',
    personaCategory: 'Small Business Owner',
    companyType: 'Artisan Food & Hospitality Chain',
    companyName: 'Heritage Bakery & Cafés',
    location: 'Nairobi & Mombasa, Kenya',
    quote:
      'As a growing business owner, I could not afford a bloated corporate HR department. NextSofthr acts like an elite HR and payroll director right on my phone. My kitchen and service staff request leave in seconds without a single paper form.',
    highlightStat: {
      value: 'Zero',
      label: 'Paperwork & Missing Records',
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    verifiedUser: true,
  },
  {
    id: 'quote-4',
    name: 'Zainab Al-Hassan',
    role: 'Head of People & Culture',
    personaCategory: 'HR Director',
    companyType: 'High-Growth Financial Technology',
    companyName: 'PayOrbit Financial Systems',
    location: 'Kigali, Rwanda & London, UK',
    quote:
      'Our distributed engineering and customer support teams require utmost speed and agility. NextSofthr’s AI assistant and real-time operational analytics transformed our HR team from a paperwork silo into a strategic leadership driver.',
    highlightStat: {
      value: '38 hrs',
      label: 'Saved Per Month in HR Admin',
    },
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    verifiedUser: true,
  },
  {
    id: 'quote-5',
    name: 'David Chibuzor',
    role: 'Chief Operating Officer',
    personaCategory: 'Operations & Finance',
    companyType: 'Multi-Specialty Healthcare Network',
    companyName: 'PrimeCare Medical Centers',
    location: 'Enugu & Port Harcourt, Nigeria',
    quote:
      'In healthcare, 24/7 rotational shifts, on-call allowances, and biometric attendance accuracy cannot fail. NextSofthr eliminated ghost attendance and payroll discrepancies entirely. It is by far the most reliable operations software we have ever implemented.',
    highlightStat: {
      value: '100%',
      label: 'Roster Accuracy & Audit Readiness',
    },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    verifiedUser: true,
  },
  {
    id: 'quote-6',
    name: 'Amina Diallo',
    role: 'Founder & Chief Executive Officer',
    personaCategory: 'Founder & Executive',
    companyType: 'Pan-African Agro-Processing & Export',
    companyName: 'Savanna Harvest Group',
    location: 'Dakar, Senegal & Johannesburg, South Africa',
    quote:
      'NextSofthr proves that software engineered for African business realities can stand toe-to-toe with any global enterprise suite. It has effortlessly scaled with our business from 40 factory workers to over 600 full-time staff across three economic zones.',
    highlightStat: {
      value: '15x',
      label: 'Workforce Scale Without Headcount Bloat',
    },
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop',
    verifiedUser: true,
  },
];
