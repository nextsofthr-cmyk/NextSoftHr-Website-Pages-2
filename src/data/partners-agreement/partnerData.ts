import { PartnerCategory, PartnerTier, DocumentItem, FAQItem, AcademyCourse, TerritoryConfig, LeadRecord } from '../types/agreement';

export const PARTNER_CATEGORIES: PartnerCategory[] = [
  {
    id: 'reseller',
    title: 'Reseller Partner',
    shortDesc: 'Authorized to market, quote, and sell NextSoftHR subscriptions and approved add-ons directly to client organizations.',
    fullDesc: 'Reseller Partners represent the commercial backbone of our regional software sales. Authorized to market, package, quote, and distribute NextSoftHR subscriptions to micro, small, medium, and large enterprise clients under approved commercial terms.',
    authorizationScope: 'Direct subscription sales, quotation issuance, contract execution support, optional wholesale billing, first-tier customer onboarding.',
    commissionType: '15% - 40% Recurring Commission or Wholesale Margin',
    defaultTier: 'Silver',
    keyRequirements: [
      'Registered IT, software, or business advisory company',
      'Minimum of 2 NextSoftHR certified sales specialists',
      'Commitment to quarterly net-new subscription targets',
      'Adherence to authorized pricing and maximum discount rules'
    ],
    allowedActivities: [
      'Direct customer demonstrations',
      'Authorized quotation generation',
      'Co-branded sales campaigns',
      'First-line user onboarding'
    ]
  },
  {
    id: 'distributor',
    title: 'Distributor (Master VAD)',
    shortDesc: 'Authorized to recruit, onboard, enable, and manage an approved regional network of sub-resellers across an assigned territory.',
    fullDesc: 'Master Value-Added Distributors hold regional commercial authority. They build, train, and support sub-reseller networks across entire countries or multi-state provinces, coordinating localized marketing, channel enablement, and bulk licensing.',
    authorizationScope: 'Sub-reseller recruitment, regional territory management, multi-tier commission orchestration, regional currency fulfillment.',
    commissionType: 'Overriding Regional Distribution Margin + Channel Override',
    defaultTier: 'Platinum',
    keyRequirements: [
      'Demonstrated multi-tier technology distribution infrastructure',
      'Dedicated channel management and partner engineering team',
      'Regional inventory, invoicing, and local currency payment gateways',
      'Annual regional quota commitments ($100k+ ARR)'
    ],
    allowedActivities: [
      'Recruiting and qualifying sub-resellers',
      'Hosting localized partner academies and webinars',
      'Managing regional deal desk reviews',
      'Providing second-tier channel support'
    ]
  },
  {
    id: 'affiliate',
    title: 'Affiliate Partner',
    shortDesc: 'Promotes NextSoftHR through approved digital publications, websites, content marketing, blogs, and tracked referral links.',
    fullDesc: 'Digital publishers, industry content creators, technology comparison platforms, and business media organizations that drive qualified online traffic and trial signups using tracked affiliate URLs and digital banners.',
    authorizationScope: 'Digital promotion via approved web, social media, podcast, and newsletter media channels.',
    commissionType: '15% - 25% First-Year Recurring or CPA Bounty',
    defaultTier: 'Bronze',
    keyRequirements: [
      'Active business or technology website with organic audience',
      'Strict adherence to trademark and PPC bidding prohibitions',
      'Compliance with digital advertising disclosures and privacy laws'
    ],
    allowedActivities: [
      'Publishing software reviews and tutorials',
      'Deploying official tracking links and banners',
      'Featuring NextSoftHR in email newsletters'
    ]
  },
  {
    id: 'referral',
    title: 'Referral Partner',
    shortDesc: 'Introduces pre-qualified business prospects and decision-makers to NextSoftHR account executives.',
    fullDesc: 'Business leaders, commercial brokers, and professional advisors who identify organizations seeking HR or payroll automation, introduce the prospect to NextSoftHR, and receive recurring commissions upon contract execution.',
    authorizationScope: 'Lead generation, warm introduction to NextSoftHR sales teams, opportunity registration.',
    commissionType: '15% - 20% Recurring Commission',
    defaultTier: 'Bronze',
    keyRequirements: [
      'Verifiable corporate or professional standing',
      'Direct introductory relationship with prospect leadership',
      'Registration of prospect via the Partner Portal prior to sales engagement'
    ],
    allowedActivities: [
      'Executive introductions and meeting scheduling',
      'Joint introductory discovery calls',
      'Deal status tracking in Partner Portal'
    ]
  },
  {
    id: 'associate',
    title: 'Associate',
    shortDesc: 'Accredited professional or organization with an approved strategic business relationship with NextSoftHR.',
    fullDesc: 'Senior industry fellows, management consultants, and specialized enterprise advisors who facilitate institutional adoption of NextSoftHR across conglomerates, trade associations, or government bodies.',
    authorizationScope: 'Institutional relationship development, executive advisory, cross-industry alliance formation.',
    commissionType: 'Custom Negotiated Commercial Schedule',
    defaultTier: 'Gold',
    keyRequirements: [
      'Recognized industry leadership or executive advisory practice',
      'Approved bilateral Associate Schedule',
      'Direct sponsorship by NextSoftHR executive leadership'
    ],
    allowedActivities: [
      'High-level enterprise relationship facilitation',
      'Industry conference co-sponsorship',
      'National trade association initiatives'
    ]
  },
  {
    id: 'accountant',
    title: 'Accountant / Accounting Firm',
    shortDesc: 'Leverages NextSoftHR to deliver payroll, tax filings, book reconciliation, and outsourced finance operations.',
    fullDesc: 'Certified public accountants, chartered tax advisors, and bookkeeping practices that recommend NextSoftHR to small-and-medium business clients, or manage client payrolls directly using our multi-company accountant portal.',
    authorizationScope: 'Client payroll administration, statutory tax reporting, journal exports to ERP/accounting software.',
    commissionType: '20% - 30% Recurring Share or Wholesale Practice Discount',
    defaultTier: 'Silver',
    keyRequirements: [
      'Active professional accounting or tax practice accreditation',
      'Completion of NextSoftHR Certified Payroll Specialist track',
      'Management of 3+ client payroll tenants'
    ],
    allowedActivities: [
      'Direct multi-tenant client payroll processing',
      'Setting up automated tax and pension schedules',
      'Exporting automated general ledger entries'
    ]
  },
  {
    id: 'hr_consultant',
    title: 'HR Consultant & Advisory Firm',
    shortDesc: 'Recommends and supports NextSoftHR for enterprise HR, talent management, and workforce compliance requirements.',
    fullDesc: 'Human resources advisory firms, organizational design consultants, and talent management agencies that specify NextSoftHR as their preferred HR Information System (HRIS) for client performance, onboarding, and compliance.',
    authorizationScope: 'HR process consulting, employee handbook mapping, performance review setup, workforce policy configuration.',
    commissionType: '20% - 30% Recurring Commission + Consulting Services',
    defaultTier: 'Silver',
    keyRequirements: [
      'Demonstrated HR advisory or talent consulting practice',
      'Certified NextSoftHR HR Specialist accreditation',
      'Active client workforce advisory engagements'
    ],
    allowedActivities: [
      'Client HR policy digitization',
      'Custom employee evaluation workflow design',
      'Leave and attendance policy structuring'
    ]
  },
  {
    id: 'technology',
    title: 'Technology & ISV Partner',
    shortDesc: 'Integrates complementary technology, biometric hardware, ERPs, or APIs with NextSoftHR.',
    fullDesc: 'Independent Software Vendors (ISVs), biometric time-clock manufacturers, enterprise ERP integrators, and API developers who build interoperable integrations with the NextSoftHR cloud platform.',
    authorizationScope: 'API integration development, hardware certification, marketplace listing, developer sandbox access.',
    commissionType: 'Co-sell Revenue Share / Marketplace Listing Terms',
    defaultTier: 'Gold',
    keyRequirements: [
      'Production-ready complementary software or hardware solution',
      'Adherence to NextSoftHR API security and rate-limiting protocols',
      'Maintenance of uptime and integration support SLA'
    ],
    allowedActivities: [
      'Developing REST API and webhook integrations',
      'Certifying biometric attendance hardware',
      'Publishing connectors on the NextSoftHR Marketplace'
    ]
  },
  {
    id: 'implementation',
    title: 'Implementation Partner',
    shortDesc: 'Provides approved implementation, configuration, historical data migration, and enterprise onboarding.',
    fullDesc: 'Specialized enterprise systems integrators who lead complex deployments, multi-country payroll setup, legacy data migrations, and custom workflow automations for enterprise NextSoftHR clients.',
    authorizationScope: 'Tenant architecture, master data migration, payroll formula programming, enterprise change management.',
    commissionType: '100% Retained Professional Service Fees + 20% Recurring SaaS Share',
    defaultTier: 'Gold',
    keyRequirements: [
      'Certified NextSoftHR Implementation Professional (CSIP) on staff',
      'Proven track record in ERP/HCM system deployments',
      'Maintenance of E&O / Professional Indemnity Insurance'
    ],
    allowedActivities: [
      'Direct billable client configuration and consulting',
      'Data mapping and legacy system ETL migration',
      'Custom user acceptance testing (UAT) leadership'
    ]
  },
  {
    id: 'training',
    title: 'Training Partner',
    shortDesc: 'Delivers authorized NextSoftHR training, executive workshops, and user certification academies.',
    fullDesc: 'Corporate training institutes, HR business schools, and vocational centers authorized to deliver official NextSoftHR training courses, administrator certifications, and end-user adoption bootcamps.',
    authorizationScope: 'Delivery of official training curricula, examination proctoring, certification issuance.',
    commissionType: 'Training Course Tuition Revenue + Software Referral Share',
    defaultTier: 'Silver',
    keyRequirements: [
      'Accredited training facility or corporate LMS infrastructure',
      'Certified NextSoftHR Master Instructors',
      'Compliance with official examination and grading rubrics'
    ],
    allowedActivities: [
      'Delivering certified classroom and online bootcamps',
      'Proctoring NextSoftHR certification exams',
      'Issuing authorized completion certificates'
    ]
  },
  {
    id: 'outsourcing',
    title: 'Outsourcing Partner (BPO / PEO)',
    shortDesc: 'Provides payroll, HR, accounting, or managed workforce services using NextSoftHR as the operational core.',
    fullDesc: 'Business Process Outsourcing (BPO) firms, Professional Employer Organizations (PEOs), and HR service bureaus that execute client payroll, tax remittances, and benefits administration using NextSoftHR.',
    authorizationScope: 'Managed payroll execution, multi-company statutory filing preparation, outsourced HR helpdesk.',
    commissionType: 'Volume Tiered Wholesale SaaS Pricing',
    defaultTier: 'Platinum',
    keyRequirements: [
      'Dedicated payroll bureau team servicing multiple corporate clients',
      'Full compliance with statutory financial and data protection standards',
      'Comprehensive professional indemnity and cyber risk insurance'
    ],
    allowedActivities: [
      'Running multi-company payroll runs across dozens of client entities',
      'Managing employee self-service rollouts on behalf of clients',
      'Automating statutory tax returns and pension schedules'
    ]
  },
  {
    id: 'strategic',
    title: 'Strategic Partner',
    shortDesc: 'High-impact enterprise alliances, multinational telcos, banks, and conglomerates operating under tailored terms.',
    fullDesc: 'Commercial banks, telecommunications operators, national payroll clearinghouses, and enterprise conglomerates that bundle or embed NextSoftHR with their core business banking or SME service packages.',
    authorizationScope: 'Bespoke enterprise bundling, white-label OEM distribution, national commercial co-marketing.',
    commissionType: 'Individually Negotiated Bilateral Commercial Schedule',
    defaultTier: 'Platinum',
    keyRequirements: [
      'Enterprise scale, national reach, or significant SME customer base',
      'Executive sponsorship and dedicated alliance management team',
      'Custom bilaterally executed Master Alliance Agreement'
    ],
    allowedActivities: [
      'Embedding NextSoftHR in SME banking packages',
      'Telecom bundle distribution',
      'Joint venture enterprise solutions'
    ]
  }
];

export const PARTNER_TIERS: PartnerTier[] = [
  {
    id: 'bronze',
    name: 'Bronze Partner',
    recurringRate: 15,
    description: 'Entry-level channel participation. Ideal for new affiliates, independent referral partners, and early-stage advisors.',
    qualificationCriteria: [
      'Completed Partner Registration and verified compliance profile',
      'At least 1 registered deal or active referral link',
      'Basic product knowledge overview completed',
      'Standard support SLA and access to partner portal assets'
    ],
    recommendedVolume: '1 - 4 Active Subscriptions ($1k - $10k ARR)',
    supportLevel: 'Email and Ticket Helpdesk (24hr SLA)',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200'
  },
  {
    id: 'silver',
    name: 'Silver Partner',
    recurringRate: 20,
    description: 'For established partners generating qualified business consistently, with accredited staff and active deal pipelines.',
    qualificationCriteria: [
      'Minimum of 5 Active Subscriptions or $15,000 ARR under management',
      'At least 1 employee with NextSoftHR Foundation Certification',
      'Demonstrated 90%+ annual customer retention rate',
      'Active quarterly pipeline review with channel coordinator'
    ],
    recommendedVolume: '5 - 19 Active Subscriptions ($15k - $50k ARR)',
    supportLevel: 'Priority Ticket and Chat (8hr SLA)',
    badgeColor: 'text-slate-700 bg-slate-100 border-slate-300'
  },
  {
    id: 'gold',
    name: 'Gold / Certified Partner',
    recurringRate: 30,
    description: 'For high-engagement, active partners with demonstrated technical sales competence, certified consultants, and strong CSAT.',
    qualificationCriteria: [
      'Minimum of 20 Active Subscriptions or $60,000 ARR under management',
      'At least 2 employees with NextSoftHR Professional or Implementation Certification',
      'Verified 95%+ client satisfaction (CSAT) rating',
      'Active co-marketing campaigns and quarterly joint business plans'
    ],
    recommendedVolume: '20 - 49 Active Subscriptions ($60k - $150k ARR)',
    supportLevel: 'Dedicated Partner Manager + Solution Architect (4hr SLA)',
    badgeColor: 'text-yellow-800 bg-yellow-50 border-yellow-300'
  },
  {
    id: 'platinum',
    name: 'Platinum Strategic Partner',
    recurringRate: 40,
    description: 'For high-performing strategic channel leaders, master distributors, and major enterprise systems integrators driving massive adoption.',
    qualificationCriteria: [
      'Minimum of 50+ Active Subscriptions or $150,000+ ARR under management',
      'At least 4 Certified Implementation and Payroll Specialists on staff',
      'National or multi-territory distribution capability',
      'Executive sponsorship and semi-annual executive business reviews (EBRs)'
    ],
    recommendedVolume: '50+ Active Subscriptions ($150k+ ARR)',
    supportLevel: 'Direct 24/7 Hotline + Dedicated Channel Director (2hr SLA)',
    badgeColor: 'text-blue-900 bg-blue-50 border-blue-300'
  }
];

export const DOCUMENT_CENTER: DocumentItem[] = [
  {
    id: 'doc-master-agreement',
    title: 'Master Partner Agreement (Clauses 1–81)',
    code: 'NSHR-LEGAL-MPA-v1.0',
    version: '1.0',
    pages: 28,
    category: 'Agreement',
    description: 'The complete, comprehensive 81-clause master commercial agreement governing resellers, distributors, affiliates, and associates.',
    contentPreview: 'Official legal instrument setting out mutual obligations, appointment terms, licensing boundaries, data protection covenants, and dispute resolution mechanisms.'
  },
  {
    id: 'doc-commission-schedule',
    title: 'Commission & Revenue Share Schedule',
    code: 'NSHR-SCHED-COMM-v1.0',
    version: '1.0',
    pages: 8,
    category: 'Schedules',
    description: 'Defines the exact percentage matrices (Bronze 15%, Silver 20%, Gold 30%, Platinum 40%), payout dates, and clawback rules.',
    contentPreview: 'Detailed mathematical breakdown of Commissionable Revenue, multi-year subscription recognition, wholesale margin formulas, and payment processing rules.'
  },
  {
    id: 'doc-partner-profile',
    title: 'Partner Profile Schedule (Schedule A)',
    code: 'NSHR-SCHED-A-PROF-v1.0',
    version: '1.0',
    pages: 4,
    category: 'Schedules',
    description: 'Captures partner entity particulars, corporate registration number, tax identifiers, banking details, and authorized signatories.',
    contentPreview: 'Legal schedule identifying the contracting entity, designated technical and billing points of contact, and approved operating categories.'
  },
  {
    id: 'doc-territory-schedule',
    title: 'Territory & Jurisdiction Schedule (Schedule C)',
    code: 'NSHR-SCHED-C-TERR-v1.0',
    version: '1.0',
    pages: 6,
    category: 'Schedules',
    description: 'Sets geographic boundaries, non-exclusivity status, local contracting entities, governing laws, and arbitration forums.',
    contentPreview: 'Jurisdiction-specific allocation linking African, European, North American, and Middle Eastern operations to their respective legal regimes.'
  },
  {
    id: 'doc-dpa',
    title: 'Data Processing Addendum (Schedule D)',
    code: 'NSHR-SCHED-D-DPA-v1.0',
    version: '1.0',
    pages: 14,
    category: 'Schedules',
    description: 'International data privacy addendum compliant with NDPA, GDPR, UK GDPR, and CCPA for handling customer HR and payroll data.',
    contentPreview: 'Mandatory technical and organizational measures, sub-processor authorizations, audit obligations, and international data transfer safeguards.'
  },
  {
    id: 'doc-code-of-conduct',
    title: 'Partner Code of Conduct (Schedule E)',
    code: 'NSHR-SCHED-E-COC-v1.0',
    version: '1.0',
    pages: 5,
    category: 'Guidelines',
    description: 'Ethical manifesto requiring integrity, anti-bribery, anti-money laundering, non-harassment, and fair commercial competition.',
    contentPreview: 'Explicit standards governing sales honesty, avoidance of conflicts of interest, ethical workforce treatment, and mandatory incident reporting.'
  },
  {
    id: 'doc-brand-guidelines',
    title: 'Brand Usage & Marketing Guidelines',
    code: 'NSHR-GUIDE-BRAND-v1.0',
    version: '1.0',
    pages: 12,
    category: 'Guidelines',
    description: 'Authorized logo usage, color palettes (Blue & Lemon Green), typography, partner badge placement, and marketing copy rules.',
    contentPreview: 'Design specifications for cobranded one-pagers, presentation slide decks, webinar title cards, and prohibition against trademark alterations.'
  },
  {
    id: 'doc-affiliate-guidelines',
    title: 'Affiliate Marketing & Tracking Guidelines',
    code: 'NSHR-GUIDE-AFF-v1.0',
    version: '1.0',
    pages: 7,
    category: 'Guidelines',
    description: 'Rules for deploying Affiliate IDs, referral links, cookies, UTM tags, and prohibitions against trademark bidding and spam.',
    contentPreview: 'Technical guidelines on cookie lifespans (90 days), multi-touch attribution mechanics, ad copy approval, and prohibited PPC search bidding.'
  },
  {
    id: 'doc-reseller-guidelines',
    title: 'Reseller Operations & Wholesale Handbook',
    code: 'NSHR-GUIDE-RES-v1.0',
    version: '1.0',
    pages: 16,
    category: 'Operations',
    description: 'Step-by-step guidance on customer quotation, maximum authorized discounts, billing models, and first-tier onboarding.',
    contentPreview: 'Operational playbook for issuing approved client quotes, activating new customer tenants, managing renewals, and handling Tier 1 support.'
  },
  {
    id: 'doc-distributor-guidelines',
    title: 'Master Distributor Channel Framework',
    code: 'NSHR-GUIDE-DIST-v1.0',
    version: '1.0',
    pages: 20,
    category: 'Operations',
    description: 'Protocols for recruiting downstream resellers, managing territory quotas, localized billing, and channel conflict mediation.',
    contentPreview: 'Operational framework for sub-reseller qualification, joint marketing fund (JMF) allocation, and regional customer escalation workflows.'
  },
  {
    id: 'doc-onboarding-guide',
    title: 'Partner Onboarding & Quick-Start Guide',
    code: 'NSHR-GUIDE-ONBOARD-v1.0',
    version: '1.0',
    pages: 10,
    category: 'Operations',
    description: 'Step-by-step walkthrough to activate portal accounts, submit first leads, access the academy, and generate referral links.',
    contentPreview: 'Fast-track guide taking a newly accepted partner through Day 1 portal setup, training enrollment, lead registration, and deal submission.'
  }
];

export const COUNTRY_SCHEDULES: Record<string, {
  contractingEntity: string;
  governingLaw: string;
  arbitrationRules: string;
  venue: string;
  regulatoryNotes: string;
}> = {
  'Nigeria & West Africa': {
    contractingEntity: 'NextSoftHR Technologies Limited',
    governingLaw: 'Laws of the Federal Republic of Nigeria',
    arbitrationRules: 'Lagos Court of Arbitration (LCA) Rules',
    venue: 'Lagos, Nigeria',
    regulatoryNotes: 'Full compliance with NDPA (Nigeria Data Protection Act), PAYE tax deductions, and statutory pension frameworks.'
  },
  'United Kingdom & Europe': {
    contractingEntity: 'NextSoftHR Global Holdings Ltd',
    governingLaw: 'Laws of England and Wales',
    arbitrationRules: 'London Court of International Arbitration (LCIA) Rules',
    venue: 'London, United Kingdom',
    regulatoryNotes: 'Full compliance with UK GDPR, EU GDPR, and statutory HMRC payroll information exchange standards.'
  },
  'United States & Americas': {
    contractingEntity: 'NextSoftHR Inc. (Delaware)',
    governingLaw: 'Laws of the State of Delaware, United States',
    arbitrationRules: 'American Arbitration Association (AAA) Commercial Rules',
    venue: 'Wilmington, Delaware, USA',
    regulatoryNotes: 'Compliance with federal and state employment statutes, CCPA privacy rights, and IRS W-8BEN/W-9 reporting.'
  },
  'Middle East & Asia': {
    contractingEntity: 'NextSoftHR Middle East FZ-LLC',
    governingLaw: 'Laws of the Dubai International Financial Centre (DIFC)',
    arbitrationRules: 'DIAC (Dubai International Arbitration Centre) Rules',
    venue: 'Dubai, United Arab Emirates',
    regulatoryNotes: 'Compliance with UAE Federal Decree-Law on Personal Data Protection and regional Wage Protection System (WPS) requirements.'
  },
  'Pan-African Regional (OHADA / AfCFTA)': {
    contractingEntity: 'NextSoftHR African Operations Ltd',
    governingLaw: 'Uniform Act on Commercial Law (OHADA) / English Common Law',
    arbitrationRules: 'Common Court of Justice and Arbitration (CCJA) / LCA',
    venue: 'Nairobi / Lagos / Abidjan',
    regulatoryNotes: 'Adherence to regional economic community treaties, cross-border remittance laws, and AfCFTA commerce rules.'
  }
};

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'crs-found-01',
    title: 'NextSoftHR Platform Fundamentals & Architecture',
    category: 'Product Training',
    level: 'Foundation',
    duration: '4 Hours',
    modulesCount: 6,
    description: 'Core overview of multi-tenant cloud navigation, employee directory, leave management, self-service portals, and document vaults.'
  },
  {
    id: 'crs-prof-02',
    title: 'Statutory Payroll, Tax Engines & Multi-Country Formulas',
    category: 'Payroll Training',
    level: 'Professional',
    duration: '8 Hours',
    modulesCount: 10,
    description: 'Master automated PAYE tax formulas, pensions, healthcare deductions, overtime computation, payslip distribution, and banking direct credit.'
  },
  {
    id: 'crs-prof-03',
    title: 'Commercial Channel Sales & Value Proposition Engineering',
    category: 'Sales Training',
    level: 'Professional',
    duration: '5 Hours',
    modulesCount: 7,
    description: 'Learn discovery questioning, objection handling against legacy desktop software, ROI quantification, and closing enterprise deals.'
  },
  {
    id: 'crs-adv-04',
    title: 'Data Migration, System Configuration & Implementation Methodology',
    category: 'Implementation Training',
    level: 'Certified Implementation Partner',
    duration: '16 Hours',
    modulesCount: 14,
    description: 'In-depth deployment protocol: legacy CSV/Excel data cleansing, shift roster mapping, approval hierarchy design, and UAT sign-off.'
  },
  {
    id: 'crs-adv-05',
    title: 'Enterprise Security, Privacy Laws (GDPR/NDPA) & Compliance',
    category: 'Compliance & Security',
    level: 'Advanced',
    duration: '6 Hours',
    modulesCount: 8,
    description: 'Critical compliance requirements for handling sensitive workforce data, MFA protocols, role-based access control, and incident reporting.'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'What is the NextSoftHR Partner Program?',
    answer: 'The NextSoftHR Partner Program is a global channel ecosystem designed for software resellers, distributors, HR consultants, accounting firms, affiliates, and systems integrators to build sustainable recurring revenue by empowering businesses to simplify HR, payroll, time tracking, and business operations using NextSoftHR cloud software.',
    category: 'Program & Eligibility'
  },
  {
    question: 'Who can become a partner?',
    answer: 'Any registered business, software consultancy, accounting practice, HR consulting agency, training institute, BPO firm, or professional individual with an established audience or business network can apply. Every applicant is verified for corporate legitimacy and compliance.',
    category: 'Program & Eligibility'
  },
  {
    question: 'What is a reseller?',
    answer: 'A Reseller Partner is authorized to directly quote, market, package, and resell NextSoftHR subscriptions to end-user clients, either via wholesale billing (retaining a direct margin) or direct-to-customer billing (receiving recurring commissions).',
    category: 'Program & Eligibility'
  },
  {
    question: 'What is a distributor?',
    answer: 'A Distributor (Master VAD) is authorized to recruit, train, and manage an entire regional network of sub-resellers across an assigned country or territory, earning overriding regional margins and managing localized support.',
    category: 'Program & Eligibility'
  },
  {
    question: 'What is an affiliate?',
    answer: 'An Affiliate is a digital publisher, content creator, or media platform that promotes NextSoftHR through approved websites, articles, tutorials, social media, and referral links, earning commissions on resulting signups without handling direct sales.',
    category: 'Program & Eligibility'
  },
  {
    question: 'What is a referral partner?',
    answer: 'A Referral Partner introduces pre-qualified corporate decision-makers to the NextSoftHR sales team. Once the lead converts to a paid customer within the protection window, the partner earns recurring commission with minimal sales overhead.',
    category: 'Program & Eligibility'
  },
  {
    question: 'Can accountants join?',
    answer: 'Yes. Certified accountants, bookkeepers, and tax firms join as Accountant Partners to manage client payrolls through our multi-company accountant console, automate tax remittances, and export general ledger entries to their preferred accounting tools while receiving ongoing revenue share.',
    category: 'Program & Eligibility'
  },
  {
    question: 'Can HR consultants join?',
    answer: 'Absolutely. HR consultants specify NextSoftHR as their preferred HR Information System, delivering billable workforce consulting, employee handbook mapping, performance management frameworks, and leave policies while earning recurring SaaS commissions.',
    category: 'Program & Eligibility'
  },
  {
    question: 'Can IT companies join?',
    answer: 'Yes. IT companies, system integrators, and managed service providers (MSPs) join to expand their software portfolio, bundling NextSoftHR cloud software with their IT infrastructure, security, and hardware services.',
    category: 'Program & Eligibility'
  },
  {
    question: 'Can partners operate internationally?',
    answer: 'Yes. NextSoftHR is an international SaaS platform supporting multi-country payroll, diverse currency denominations, and regional statutory compliance. Partners can register leads across approved international territories subject to their Partner Schedule.',
    category: 'Program & Eligibility'
  },
  {
    question: 'How does lead registration work?',
    answer: 'Partners log into the Partner Portal and submit prospect details (company name, decision-maker contact, employee headcount, module interest, estimated deal size, and timeframe). The system and channel desk review and validate the lead within 48 hours.',
    category: 'Leads & Protection'
  },
  {
    question: 'How long is a lead protected?',
    answer: 'Approved leads receive an exclusive ninety (90) calendar day protection window. During this period, NextSoftHR direct sales and competing partners cannot solicit the registered prospect. Extensions of 30 days are available upon demonstrating active procurement milestones.',
    category: 'Leads & Protection'
  },
  {
    question: 'How are commissions calculated?',
    answer: 'Commissions are calculated as a percentage of Commissionable Revenue—defined as the net subscription fees actually collected in cleared funds from an active client, excluding taxes, government levies, bank fees, chargebacks, and hardware costs.',
    category: 'Commissions & Billing'
  },
  {
    question: 'Are commissions recurring?',
    answer: 'Yes. Eligible partners in Silver, Gold, and Platinum tiers earn recurring commissions on client renewals, additional employee seat additions, and module upgrades for up to thirty-six (36) months or perpetual lifetime for active Platinum partners.',
    category: 'Commissions & Billing'
  },
  {
    question: 'When are commissions paid?',
    answer: 'Qualified commissions are disbursed monthly, on or before the 15th of the month following the close of the calendar month in which revenue was received, provided the accrued balance meets the minimum payout threshold ($100 USD / £100 GBP / ₦100,000 NGN).',
    category: 'Commissions & Billing'
  },
  {
    question: 'What happens when a customer cancels?',
    answer: 'When a customer cancels their subscription, recurring commissions on that account cease upon the effective cancellation date. No future commissions accrue on inactive accounts.',
    category: 'Commissions & Billing'
  },
  {
    question: 'What happens when a customer receives a refund?',
    answer: 'If an invoice on which a commission was previously disbursed is refunded, credited, or charged back, the unearned commission is automatically deducted ("clawed back") from subsequent commission disbursements.',
    category: 'Commissions & Billing'
  },
  {
    question: 'Can partners recruit sub-resellers?',
    answer: 'Only authorized Master Distributors operating under an executed Distributor Schedule are permitted to recruit, onboard, and manage downstream sub-resellers.',
    category: 'Rights & Governance'
  },
  {
    question: 'Can partners provide implementation services?',
    answer: 'Yes! Certified Implementation Partners can deliver billable configuration, data migration, and change management services directly to customers, keeping 100% of their billable consulting fees.',
    category: 'Rights & Governance'
  },
  {
    question: 'Can partners use NextSoftHR branding?',
    answer: 'Accredited partners receive a non-exclusive license to use official NextSoftHR logos, banners, and "Authorized Partner" badges in marketing collateral in strict compliance with the Brand Guidelines.',
    category: 'Rights & Governance'
  },
  {
    question: 'What training is available?',
    answer: 'NextSoftHR Partner Academy offers comprehensive on-demand and instructor-led training tracks covering Product, Statutory Payroll, Sales Engineering, Implementation, Technical Integration, and Data Privacy.',
    category: 'Rights & Governance'
  },
  {
    question: 'How does partner certification work?',
    answer: 'Partners complete structured curriculum modules and pass practical proctored examinations to earn recognized digital badges: Foundation, Professional, Advanced, and Certified Implementation Partner.',
    category: 'Rights & Governance'
  },
  {
    question: 'How can a partner terminate the agreement?',
    answer: 'Either party may terminate the agreement for convenience at any time by providing thirty (30) calendar days prior written notice through the Partner Portal or via registered email to legal@nextsofthr.org.',
    category: 'Rights & Governance'
  },
  {
    question: 'What happens to commissions after termination?',
    answer: 'Upon termination without cause, all qualified eligible commissions accrued up to the effective termination date will be paid in the normal billing cycle. In cases of immediate termination for fraud or criminal breach, unvested balances are forfeited.',
    category: 'Rights & Governance'
  }
];

export const INITIAL_LEADS: LeadRecord[] = [
  {
    id: 'LEAD-8841',
    prospectName: 'Apex Logistics Global',
    company: 'Apex Logistics Ltd',
    contactPerson: 'Kemi Adebayo, VP of HR',
    email: 'kemi.adebayo@apexlogistics.example',
    phone: '+234 803 555 0192',
    country: 'Nigeria',
    industry: 'Logistics & Supply Chain',
    estimatedEmployeeCount: 350,
    productInterest: 'Full Suite (Payroll + HRIS + Biometric Attendance)',
    estimatedOpportunityValue: 12500,
    expectedPurchaseTimeframe: '30 - 60 Days',
    status: 'Protected',
    submissionDate: '2026-09-15',
    protectionExpiryDate: '2026-12-14',
    notes: 'Demo completed. Procurement review underway. 74 days of protection remaining.'
  },
  {
    id: 'LEAD-8842',
    prospectName: 'Meridian Health Network',
    company: 'Meridian Healthcare Services',
    contactPerson: 'David Chen, Chief Financial Officer',
    email: 'd.chen@meridianhealth.example',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    industry: 'Healthcare & Medical Clinics',
    estimatedEmployeeCount: 620,
    productInterest: 'Multi-Location Payroll & Shift Roster Engine',
    estimatedOpportunityValue: 24800,
    expectedPurchaseTimeframe: '60 - 90 Days',
    status: 'Approved',
    submissionDate: '2026-09-22',
    protectionExpiryDate: '2026-12-21',
    notes: 'Approved by UK Channel Desk. Partner leading discovery workshops.'
  },
  {
    id: 'LEAD-8843',
    prospectName: 'Vanguard Retail Holdings',
    company: 'Vanguard Superstores',
    contactPerson: 'Tariq Al-Mansoor, Operations Director',
    email: 'tariq@vanguardretail.example',
    phone: '+971 4 312 8900',
    country: 'United Arab Emirates',
    industry: 'Retail & Multi-Branch Commerce',
    estimatedEmployeeCount: 1100,
    productInterest: 'Enterprise HR + WPS Payroll Compliance',
    estimatedOpportunityValue: 48000,
    expectedPurchaseTimeframe: 'Immediate (< 30 Days)',
    status: 'Opportunity',
    submissionDate: '2026-08-30',
    protectionExpiryDate: '2026-11-28',
    notes: 'Proposal submitted. Contract legal review in progress.'
  }
];

export const DEFAULT_TERRITORY_CONFIG: TerritoryConfig = {
  country: 'Nigeria & West Africa',
  region: 'Sub-Saharan Africa',
  stateProvince: 'Lagos & Regional Blocs',
  city: 'Lagos, Abuja, Port Harcourt',
  industry: 'Cross-Sector (SME, Enterprise, Professional Services, Manufacturing)',
  customerSegment: 'Micro, Small, Medium and Large Enterprise (10 to 5,000+ employees)',
  product: 'NextSoftHR Full Suite (Core HR, Payroll, Time & Attendance, Talent, Self-Service)',
  exclusivity: 'Non-Exclusive',
  leadProtectionPeriodDays: 90,
  specialConditions: 'Subject to continuous adherence to NDPA compliance and certified personnel quotas.',
  contractingEntity: 'NextSoftHR Technologies Limited',
  governingLaw: 'Laws of the Federal Republic of Nigeria',
  arbitrationVenue: 'Lagos Court of Arbitration (LCA), Lagos, Nigeria'
};
