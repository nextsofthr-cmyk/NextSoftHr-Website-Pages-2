import { TierInfo, PartnerCategoryItem, EcosystemModule, TestimonialItem, ResourceItem, EventItem, FaqItem } from '../types';

export const PARTNER_TIERS: TierInfo[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    badge: '🥉 BRONZE',
    commission: 15,
    commissionLabel: '15% Recurring Commission',
    summary: 'For new and developing partners building their NextSofthr customer portfolio.',
    benefits: [
      '15% recurring commission',
      'Partner onboarding',
      'Product training',
      'Sales resources',
      'Marketing materials',
      'Partner support',
      'Customer referral tracking'
    ],
    cta: 'Start as Bronze Partner'
  },
  {
    id: 'silver',
    name: 'Silver',
    badge: '🥈 SILVER',
    commission: 20,
    commissionLabel: '20% Recurring Commission',
    summary: 'For active partners growing their customer base with NextSofthr.',
    benefits: [
      '20% recurring commission',
      'Everything in Bronze',
      'Advanced product training',
      'Sales enablement resources',
      'Co-marketing opportunities',
      'Priority partner support',
      'Business development assistance'
    ],
    cta: 'Become a Silver Partner'
  },
  {
    id: 'gold',
    name: 'Gold',
    badge: '🥇 GOLD',
    commission: 30,
    commissionLabel: '30% Recurring Commission',
    summary: 'For high-performing partners actively acquiring and supporting NextSofthr customers.',
    benefits: [
      '30% recurring commission',
      'Everything in Silver',
      'Advanced sales enablement',
      'Dedicated partner support',
      'Joint marketing campaigns',
      'Co-branded campaigns',
      'Business growth planning',
      'Priority lead opportunities'
    ],
    cta: 'Become a Gold Partner',
    popular: true
  },
  {
    id: 'platinum',
    name: 'Platinum',
    badge: '💎 PLATINUM',
    commission: 40,
    commissionLabel: '40% Recurring Commission',
    summary: 'For strategic partners building a significant NextSofthr business portfolio.',
    benefits: [
      '40% recurring commission',
      'Everything in Gold',
      'Strategic partnership support',
      'Premium partner enablement',
      'Joint go-to-market campaigns',
      'Priority business opportunities',
      'Executive partnership engagement',
      'Strategic account collaboration'
    ],
    cta: 'Become a Platinum Partner'
  }
];

export const PARTNER_CATEGORIES: PartnerCategoryItem[] = [
  {
    id: 'hr-consultants',
    title: 'HR Consultants',
    description: 'Provide clients with modern workforce tools while earning steady commissions on SaaS subscriptions.',
    group: 'HR & People',
    iconName: 'Users',
    bestFit: 'HR Advisory, Organizational Design',
    tier: 'silver'
  },
  {
    id: 'hr-professionals',
    title: 'HR Professionals',
    description: 'Empower leadership with automated leave, attendance, and compliance solutions.',
    group: 'HR & People',
    iconName: 'UserCheck',
    bestFit: 'Talent Officers, People Leads',
    tier: 'bronze'
  },
  {
    id: 'payroll-consultants',
    title: 'Payroll Consultants',
    description: 'Deliver multi-jurisdiction tax, pension, statutory deductions, and automated payment slips.',
    group: 'Finance & Tax',
    iconName: 'DollarSign',
    bestFit: 'Payroll Bureaus, Remittance Specialists',
    tier: 'silver'
  },
  {
    id: 'accountants',
    title: 'Accountants',
    description: 'Streamline client payroll reconciliations, journal entries, and general ledger synchronization.',
    group: 'Finance & Tax',
    iconName: 'Calculator',
    bestFit: 'CPAs, Certified Bookkeepers',
    tier: 'silver'
  },
  {
    id: 'accounting-firms',
    title: 'Accounting Firms',
    description: 'Bundle NextSofthr with accounting retainers for comprehensive client financial automation.',
    group: 'Finance & Tax',
    iconName: 'Briefcase',
    bestFit: 'Mid-Tier & Boutique Audit Practices',
    tier: 'gold'
  },
  {
    id: 'tax-consultants',
    title: 'Tax Consultants',
    description: 'Ensure statutory PAYE, NHF, pension, and local payroll tax compliance across African markets.',
    group: 'Finance & Tax',
    iconName: 'FileText',
    bestFit: 'Fiscal Advisory, Tax Filing Services',
    tier: 'silver'
  },
  {
    id: 'audit-firms',
    title: 'Audit Firms',
    description: 'Leverage auditable payroll logs, biometric attendance records, and tamper-proof trail data.',
    group: 'Finance & Tax',
    iconName: 'ShieldCheck',
    bestFit: 'Statutory & Internal Audit Teams',
    tier: 'gold'
  },
  {
    id: 'business-consultants',
    title: 'Business Consultants',
    description: 'Restructure client operations with automated approval workflows, shifts, and team dashboards.',
    group: 'Consulting & Advisory',
    iconName: 'TrendingUp',
    bestFit: 'Growth Advisory, Operational Turnaround',
    tier: 'gold'
  },
  {
    id: 'management-consultants',
    title: 'Management Consultants',
    description: 'Enhance corporate governance with automated KPI appraisals and real-time executive metrics.',
    group: 'Consulting & Advisory',
    iconName: 'Award',
    bestFit: 'Corporate Strategy, Executive Coaching',
    tier: 'gold'
  },
  {
    id: 'recruitment-agencies',
    title: 'Recruitment Agencies',
    description: 'Place candidates directly into structured onboarding pipelines and self-service portals.',
    group: 'HR & People',
    iconName: 'UserPlus',
    bestFit: 'Staffing Agencies, Headhunters',
    tier: 'bronze'
  },
  {
    id: 'it-companies',
    title: 'IT Companies',
    description: 'Expand your software catalog with enterprise-grade cloud HR & payroll infrastructure.',
    group: 'Tech & IT',
    iconName: 'Server',
    bestFit: 'Managed Service Providers, IT Vendors',
    tier: 'platinum'
  },
  {
    id: 'technology-companies',
    title: 'Technology Companies',
    description: 'Integrate existing ERPs or internal systems with NextSofthr’s open REST API architecture.',
    group: 'Tech & IT',
    iconName: 'Cpu',
    bestFit: 'Cloud Integrators, SaaS Developers',
    tier: 'platinum'
  },
  {
    id: 'software-resellers',
    title: 'Software Resellers',
    description: 'Capitalize on booming African & global demand for cloud workplace modernization.',
    group: 'Tech & IT',
    iconName: 'ShoppingBag',
    bestFit: 'B2B Software Distributors',
    tier: 'gold'
  },
  {
    id: 'it-resellers',
    title: 'IT Resellers',
    description: 'Bundle hardware (biometric scanners, tablets) with NextSofthr cloud software subscriptions.',
    group: 'Tech & IT',
    iconName: 'Layers',
    bestFit: 'Hardware & Infrastructure Resellers',
    tier: 'platinum'
  },
  {
    id: 'system-integrators',
    title: 'System Integrators',
    description: 'Deploy seamless enterprise HRIS workflows across legacy databases and cloud environments.',
    group: 'Tech & IT',
    iconName: 'Network',
    bestFit: 'Enterprise Solution Architects',
    tier: 'platinum'
  },
  {
    id: 'business-advisors',
    title: 'Business Advisors',
    description: 'Guide SME founders from chaotic manual spreadsheets to structured, scalable HR operations.',
    group: 'Consulting & Advisory',
    iconName: 'Compass',
    bestFit: 'Board Advisors, SME Mentors',
    tier: 'silver'
  },
  {
    id: 'training-consulting-firms',
    title: 'Training & Consulting Firms',
    description: 'Combine workforce training programs with NextSofthr performance evaluation modules.',
    group: 'Consulting & Advisory',
    iconName: 'GraduationCap',
    bestFit: 'Corporate Learning, Skill Academies',
    tier: 'bronze'
  },
  {
    id: 'outsourcing-companies',
    title: 'Outsourcing Companies',
    description: 'Power your multi-client BPO and HR outsourcing operations with multi-tenant company partitions.',
    group: 'HR & People',
    iconName: 'Shuffle',
    bestFit: 'BPO Providers, Payroll Service Desks',
    tier: 'platinum'
  },
  {
    id: 'professional-services-firms',
    title: 'Professional Services Firms',
    description: 'Offer end-to-end digital transformation for law, engineering, and consulting practices.',
    group: 'Consulting & Advisory',
    iconName: 'Building2',
    bestFit: 'Legal, Architectural & Engineering',
    tier: 'platinum'
  },
  {
    id: 'digital-transformation-consultants',
    title: 'Digital Transformation Consultants',
    description: 'Help African and global enterprises transition from paper files to AI-driven digital HR.',
    group: 'Tech & IT',
    iconName: 'Zap',
    bestFit: 'Transformation Leads, Agile Coaches',
    tier: 'gold'
  },
  {
    id: 'payroll-service-providers',
    title: 'Payroll Service Providers',
    description: 'Automate salary disbursements, tax deduction computation, and bulk pay slip delivery.',
    group: 'Finance & Tax',
    iconName: 'CreditCard',
    bestFit: 'Commercial Payroll Bureaus',
    tier: 'silver'
  },
  {
    id: 'business-associations',
    title: 'Business Associations',
    description: 'Provide member businesses with discounted access to elite HR software while earning partnership dues.',
    group: 'Consulting & Advisory',
    iconName: 'Globe2',
    bestFit: 'Chambers of Commerce, Trade Unions',
    tier: 'bronze'
  },
  {
    id: 'sme-advisors',
    title: 'SME Advisors',
    description: 'Help small businesses implement formal HR policies, payroll sanity, and employee leaves.',
    group: 'Consulting & Advisory',
    iconName: 'Target',
    bestFit: 'Micro-Enterprise Incubators',
    tier: 'bronze'
  },
  {
    id: 'independent-business-dev',
    title: 'Independent Business Development Professionals',
    description: 'Monetize your professional network across enterprise executives with recurring monthly revenue.',
    group: 'Consulting & Advisory',
    iconName: 'Handshake',
    bestFit: 'Commercial Brokers, Dealmakers',
    tier: 'bronze'
  }
];

export const ECOSYSTEM_MODULES: EcosystemModule[] = [
  {
    id: 'hr-mgmt',
    name: 'HR Management',
    category: 'core',
    description: 'Centralized employee records, job roles, departments, organizational hierarchy, and contracts.',
    features: ['Org Chart Generator', 'Digital Employee Folders', 'Custom Fields & Metadata'],
    icon: 'Building'
  },
  {
    id: 'employee-mgmt',
    name: 'Employee Management',
    category: 'core',
    description: '360° employee profiles, history tracking, milestone alerts, and self-service updates.',
    features: ['Life-cycle Tracking', 'Emergency Contacts', 'Equipment Assignment'],
    icon: 'Users'
  },
  {
    id: 'payroll',
    name: 'Payroll Automation',
    category: 'core',
    description: 'Multi-currency payroll engine with tax (PAYE), pension, allowances, deductions, and banking files.',
    features: ['1-Click Pay Runs', 'Direct Bank File Export', 'Multi-Currency Settlement'],
    icon: 'DollarSign'
  },
  {
    id: 'time-attendance',
    name: 'Time & Attendance',
    category: 'workforce',
    description: 'Biometric device sync, geofenced mobile check-ins, overtime tracking, and timesheet approvals.',
    features: ['GPS Geofenced Clock-in', 'Biometric Machine Sync', 'Automated Overtime Rules'],
    icon: 'Clock'
  },
  {
    id: 'leave-mgmt',
    name: 'Leave Management',
    category: 'workforce',
    description: 'Configurable leave policies (annual, maternity, sick, compassionate), accruals, and approvals.',
    features: ['Automated Accruals', 'Multi-Level Approvals', 'Team Leave Calendar'],
    icon: 'Calendar'
  },
  {
    id: 'shift-scheduling',
    name: 'Shift & Scheduling',
    category: 'workforce',
    description: 'Smart shift rostering, swap requests, rotation patterns, and real-time SMS/email alerts.',
    features: ['Drag & Drop Roster', 'Shift Swapping Protocol', 'Conflict Detection'],
    icon: 'CalendarDays'
  },
  {
    id: 'recruitment',
    name: 'Recruitment & ATS',
    category: 'core',
    description: 'Applicant tracking, job board posting, resume parsing, interview scheduling, and offer letters.',
    features: ['Candidate Pipeline', 'Automated Scorecards', 'Offer Letter Generator'],
    icon: 'UserPlus'
  },
  {
    id: 'performance-mgmt',
    name: 'Performance Management',
    category: 'workforce',
    description: 'OKRs, KPIs, 360-degree reviews, continuous feedback loops, and performance calibration.',
    features: ['Quarterly OKR Tracking', '360° Peer Feedback', 'Performance Scorecards'],
    icon: 'BarChart3'
  },
  {
    id: 'employee-self-service',
    name: 'Employee Self-Service (ESS)',
    category: 'core',
    description: 'Empowers employees to check pay slips, request leaves, update info, and submit expense claims.',
    features: ['Mobile & Web Portal', 'Instant Payslip Download', 'Expense Claim Submission'],
    icon: 'Smartphone'
  },
  {
    id: 'workforce-mgmt',
    name: 'Workforce Management',
    category: 'workforce',
    description: 'Strategic labor planning, cost forecasting, contractor administration, and productivity insights.',
    features: ['Headcount Forecasting', 'Contractor Management', 'Labor Cost Heatmaps'],
    icon: 'Briefcase'
  },
  {
    id: 'ai-hr-assistant',
    name: 'AI HR Assistant',
    category: 'ai',
    description: 'Generative AI for drafting compliant job descriptions, policy handbooks, and answering HR queries.',
    features: ['Instant Policy Generation', 'Smart Query Resolution', 'Employee Sentiment Analysis'],
    icon: 'Bot'
  },
  {
    id: 'ai-payroll-assistant',
    name: 'AI Payroll Assistant',
    category: 'ai',
    description: 'Detects payroll anomalies, predicts variances, explains salary changes, and validates tax math.',
    features: ['Anomaly Alert Engine', 'Variance Reconciliation', 'Automated Audit Checks'],
    icon: 'Sparkles'
  },
  {
    id: 'reports-analytics',
    name: 'Reports & Analytics',
    category: 'analytics',
    description: 'Deep workforce BI, turnover trends, diversity statistics, payroll cost projections, and visual exports.',
    features: ['50+ Prebuilt Reports', 'Custom Query Builder', 'PDF & Excel One-Click Exports'],
    icon: 'PieChart'
  },
  {
    id: 'business-mgmt',
    name: 'Business Management',
    category: 'analytics',
    description: 'Company-wide asset tracking, vendor management, operational checklists, and branch controls.',
    features: ['Asset Depreciation', 'Branch Division Control', 'SOP Document Vault'],
    icon: 'Layers'
  },
  {
    id: 'employee-documents',
    name: 'Employee Documents',
    category: 'core',
    description: 'Secure cloud repository with e-signatures, expiration warnings for ID/visas, and encryption.',
    features: ['Digital E-Signatures', 'Visa Expiry Alerter', 'AES-256 Cloud Vault'],
    icon: 'FileCheck'
  },
  {
    id: 'notifications-communication',
    name: 'Notifications & Broadcasts',
    category: 'core',
    description: 'Omnichannel communication via WhatsApp, SMS, push alerts, and company bulletin boards.',
    features: ['WhatsApp Alerts', 'SMS Notifications', 'Company-wide Bulletin'],
    icon: 'Bell'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Adebayo Ogunlesi',
    role: 'Managing Director',
    company: 'Apex People Advisory',
    country: 'Nigeria',
    flag: '🇳🇬',
    partnerLevel: 'Platinum',
    quote: 'NextSofthr gives us a powerful technology platform we can confidently introduce to our business clients while creating a recurring revenue opportunity for our consulting business. Our clients love the payroll compliance across Nigerian states.',
    stats: '₦18.4M+ Annual Commission Earned',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'test-2',
    name: 'Wanjiku Mwangi',
    role: 'Lead Partner',
    company: 'Nairobi Chartered Accountants & Tax Advisory',
    country: 'Kenya',
    flag: '🇰🇪',
    partnerLevel: 'Gold',
    quote: 'We migrated 28 of our mid-sized corporate clients from spreadsheets to NextSofthr. The automatic KRA tax deductions and NSSF calculations saved hundreds of hours, and our recurring commission has become a bedrock income channel.',
    stats: '34 Active Client Deployments',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'test-3',
    name: 'Kwame Mensah',
    role: 'Principal IT Consultant',
    company: 'Accra Cloud Solutions Ltd',
    country: 'Ghana',
    flag: '🇬🇭',
    partnerLevel: 'Gold',
    quote: 'As system integrators, NextSofthr is the smoothest HR and payroll rollout we have ever executed in West Africa. The partner enablement team provided us with everything needed to close large manufacturing contracts.',
    stats: '99.4% Client Retention Rate',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'test-4',
    name: 'Sipho Ndlovu',
    role: 'CEO',
    company: 'Vanguard Workforce Strategies',
    country: 'South Africa',
    flag: '🇿🇦',
    partnerLevel: 'Platinum',
    quote: 'The AI assistant and unified payroll engine provide true enterprise firepower. Partnering with NextSofthr allowed us to double our consulting margins while delivering immense value to clients in Johannesburg and Cape Town.',
    stats: '40% Top Tier Commission Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80'
  }
];

export const RESOURCE_ITEMS: ResourceItem[] = [
  {
    id: 'sales-kit',
    title: 'Partner Sales Kit',
    category: 'Sales Enablement',
    format: 'Slide Deck',
    description: 'Complete slide decks, pitch scripts, customer objection handling guides, and deal battlecards.',
    pagesOrDuration: '42 Slides + Script'
  },
  {
    id: 'product-brochures',
    title: 'Product Brochures',
    category: 'Marketing',
    format: 'PDF Guide',
    description: 'High-res printable and digital brochures detailing all 16 NextSofthr modules for client hand-offs.',
    pagesOrDuration: '28 Pages'
  },
  {
    id: 'demo-resources',
    title: 'Demo Resources',
    category: 'Sales Enablement',
    format: 'Templates Kit',
    description: 'Pre-populated demo tenant datasets with realistic multi-branch staff, schedules, and payroll runs.',
    pagesOrDuration: 'Ready Sandbox'
  },
  {
    id: 'product-videos',
    title: 'Product Videos',
    category: 'Media',
    format: 'Video',
    description: 'Bite-sized walkthrough videos highlighting employee self-service, automated tax runs, and AI tools.',
    pagesOrDuration: '14 Modules (HD)'
  },
  {
    id: 'hr-payroll-guides',
    title: 'HR & Payroll Guides',
    category: 'Knowledge',
    format: 'PDF Guide',
    description: 'Regional compliance guides for statutory payroll in Nigeria, Kenya, Ghana, South Africa, and UK.',
    pagesOrDuration: '65 Pages'
  },
  {
    id: 'social-media-kit',
    title: 'Social Media Marketing Kits',
    category: 'Marketing',
    format: 'Templates Kit',
    description: 'LinkedIn and Twitter graphic packs, thought leadership copy, and banners to attract client leads.',
    pagesOrDuration: '30+ Creatives'
  },
  {
    id: 'presentation-templates',
    title: 'Presentation Templates',
    category: 'Sales Enablement',
    format: 'Slide Deck',
    description: 'Customizable client presentation decks ready for your own firm logo and proposal pricing.',
    pagesOrDuration: 'Keynote & PPTX'
  },
  {
    id: 'onboarding-guides',
    title: 'Customer Onboarding Guides',
    category: 'Customer Success',
    format: 'PDF Guide',
    description: 'Step-by-step checklist to guide your clients from initial data import to their first successful pay run.',
    pagesOrDuration: '18 Pages'
  },
  {
    id: 'product-training',
    title: 'Product Training',
    category: 'Enablement',
    format: 'Video',
    description: 'Comprehensive certification curriculum for partner consultants, implementation leads, and sales reps.',
    pagesOrDuration: '6 Video Modules'
  },
  {
    id: 'faqs-handbook',
    title: 'Partner FAQs & Terms',
    category: 'Legal & Policy',
    format: 'PDF Guide',
    description: 'Detailed operational guidelines on partner payout schedules, commission tracking, and client SLAs.',
    pagesOrDuration: '14 Pages'
  },
  {
    id: 'partner-playbook',
    title: 'NextSofthr Partner Playbook',
    category: 'Master Strategy',
    format: 'PDF Guide',
    description: 'The definitive handbook to building a recurring $50k+ revenue stream as a NextSofthr channel partner.',
    pagesOrDuration: '52 Pages'
  }
];

export const PARTNER_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    title: 'NextSofthr Partner Summit 2026: Scaling African SaaS',
    type: 'Conference',
    date: 'April 22, 2026',
    time: '10:00 AM WAT / 12:00 PM EAT',
    location: 'Hybrid (Lagos & Virtual Stream)',
    description: 'Join top HR consultants, accounting firm leaders, and technology partners discussing cloud transformation trends.',
    speaker: 'Oluwaseun Balogun',
    speakerTitle: 'Head of Global Partnerships, NextSofthr'
  },
  {
    id: 'event-2',
    title: 'AI in HR & Automated Payroll: Advanced Partner Masterclass',
    type: 'Masterclass' as any,
    date: 'May 06, 2026',
    time: '2:00 PM WAT / 4:00 PM EAT',
    location: 'Interactive Zoom Session',
    description: 'Learn how to demonstrate NextSofthr’s AI Assistant to enterprise prospects to command higher advisory retainers.',
    speaker: 'Dr. Tariq Al-Mansoor',
    speakerTitle: 'Lead AI Engineer & Product Architect'
  },
  {
    id: 'event-3',
    title: 'Certified Channel Partner Onboarding & Sales Bootcamp',
    type: 'Certification',
    date: 'May 19, 2026',
    time: '11:00 AM WAT',
    location: 'Virtual Partner Academy',
    description: 'Fast-track your path from Bronze to Gold partner tier. Hands-on training on client pitches, demos, and closing deals.',
    speaker: 'Chidinma Eze',
    speakerTitle: 'Partner Enablement Director'
  },
  {
    id: 'event-4',
    title: 'Cross-Border African Payroll & Multi-Currency Compliance',
    type: 'Workshop',
    date: 'June 03, 2026',
    time: '1:00 PM GMT / 2:00 PM WAT',
    location: 'Virtual Classroom',
    description: 'In-depth review of tax compliance across Nigeria, Ghana, Kenya, South Africa, and international remittance rails.',
    speaker: 'Farai Moyo',
    speakerTitle: 'Senior Regulatory & Payroll Specialist'
  }
];

export const FAQ_LIST: FaqItem[] = [
  {
    question: 'Who can become a NextSofthr partner?',
    answer: 'HR consultants, HR professionals, accountants, accounting firms, tax consultants, audit firms, technology companies, IT resellers, system integrators, business consultants, management consultants, recruitment agencies, and professional services providers can apply. If you advise or serve businesses, you are ideally positioned to succeed as a NextSofthr partner.'
  },
  {
    question: 'How does the commission program work?',
    answer: 'Approved partners earn recurring commission on eligible customer subscription fees according to their active partner tier (15% for Bronze, 20% for Silver, 30% for Gold, and 40% for Platinum). As your referred customers renew their monthly or annual SaaS subscriptions, you continue to earn your recurring percentage for as long as they remain active subscribers.'
  },
  {
    question: 'What is the highest commission tier?',
    answer: 'Platinum partners can earn 40% recurring commission, subject to program requirements, active customer volume, and partner agreement terms. Platinum partners also receive dedicated executive support, co-branded marketing budgets, and priority lead opportunities.'
  },
  {
    question: 'Do partners receive training?',
    answer: 'Yes! All partners receive comprehensive onboarding, product education, video walkthroughs, and sales enablement kits. Silver, Gold, and Platinum tiers receive advanced sales coaching, live joint demonstrations, and direct access to NextSofthr solutions engineers.'
  },
  {
    question: 'Can technology companies become partners?',
    answer: 'Yes. Technology companies, software resellers, IT managed service providers (MSPs), and systems integrators actively partner with NextSofthr to add premier cloud HR, payroll, and business management software to their technology catalog.'
  },
  {
    question: 'Can accounting firms become partners?',
    answer: 'Yes, accounting and audit firms are among our most successful partners. By introducing NextSofthr, accountants eliminate messy manual payroll records, automate tax computations, and establish a high-margin recurring advisory revenue stream.'
  },
  {
    question: 'Can individual consultants become partners?',
    answer: 'Yes. Independent HR consultants, SME advisors, and business development professionals can apply. We evaluate your industry experience and client network to place you in the appropriate partner enablement track.'
  },
  {
    question: 'How do I become a partner?',
    answer: 'Simply complete the multi-step online partner application on this page. The NextSofthr partner team reviews your profile within 24 to 48 business hours, schedules an introductory enablement call, and issues your official partner credentials.'
  },
  {
    question: 'How are commissions paid?',
    answer: 'Commissions are calculated monthly based on verified customer subscription collections and paid directly to your registered bank account or preferred payment rails. You can track all referred accounts, renewals, and pending payouts in real time within your Partner Portal.'
  }
];
