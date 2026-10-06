export interface CaseStudyItem {
  id: string;
  partnerName: string;
  customerName: string;
  customerIndustry: string;
  country: string;
  flag: string;
  challenge: string;
  solution: string;
  result: string;
  keyMetric: string;
  metricLabel: string;
  image: string;
  logoInitial: string;
}

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'cs-1',
    partnerName: 'NextHR Solutions Ltd',
    customerName: 'Dangote Agro Allied Division',
    customerIndustry: 'Manufacturing & Agribusiness',
    country: 'Nigeria',
    flag: '🇳🇬',
    challenge: 'Manual spreadsheets caused 4-day payroll preparation delays for 1,400 plant employees across 3 states, with frequent overtime disputes and delayed state tax remittances.',
    solution: 'Implemented NextSofthr Multi-Branch Payroll with facial biometric attendance terminals and direct automated bank payment schedules for Nigerian banks.',
    result: 'Payroll calculation cycle dropped from 4 full days to 45 minutes with zero statutory remittance penalties across Lagos, Ogun, and Kano states.',
    keyMetric: '92%',
    metricLabel: 'Reduction in Monthly Payroll Time',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    logoInitial: 'DA'
  },
  {
    id: 'cs-2',
    partnerName: 'AfriPay Systems Consulting',
    customerName: 'Mount Kenya Flower Farms',
    customerIndustry: 'Agriculture & Floriculture',
    country: 'Kenya',
    flag: '🇰🇪',
    challenge: 'Managing variable piece-rate wages and seasonal harvesting schedules for 3,200 rural workers resulted in weekly queue bottlenecks and error-prone cash calculations.',
    solution: 'Configured NextSofthr Shift & Attendance using handheld solar-powered barcode scanners linked to real-time piece-rate earnings dashboards.',
    result: 'Workers now receive instant SMS earnings summaries and automated mobile money MPESA salary dispatches with total transparency.',
    keyMetric: '3,200',
    metricLabel: 'Farm Workers Onboarded in 3 Weeks',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
    logoInitial: 'MK'
  },
  {
    id: 'cs-3',
    partnerName: 'Ubuntu HCM Solutions',
    customerName: 'Cape Hospitality Group',
    customerIndustry: 'Hospitality & Tourism',
    country: 'South Africa',
    flag: '🇿🇦',
    challenge: '9 boutique hotel properties operated disconnected spreadsheets, causing double-booked annual leaves during the festive high season and SARS compliance headaches.',
    solution: 'Consolidated the group into a unified NextSofthr multi-entity setup with automated leave blackout rules and SARS PAYE/UIF integration.',
    result: 'Manager shift-swapping administrative hours fell by 70%, and holiday season staff coverage reached an all-time high of 99.8%.',
    keyMetric: '99.8%',
    metricLabel: 'Peak Season Shift Fulfillment',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80',
    logoInitial: 'CH'
  },
  {
    id: 'cs-4',
    partnerName: 'Crown HR Global Advisory',
    customerName: 'Finova Cloud Africa',
    customerIndustry: 'Financial Technology',
    country: 'UK / Ghana / Nigeria',
    flag: '🇬🇧',
    challenge: 'A dual-headquartered fintech needed to pay 240 engineers in London, Accra, and Lagos across GBP, GHS, and NGN with strict GDPR and African data privacy compliance.',
    solution: 'Designed a NextSofthr multi-currency instance with role-based access control, automated cross-rate FX conversions, and localized tax tables.',
    result: 'Consolidated multinational payroll onto a single pane of glass, cutting cross-border compliance audit time by 80%.',
    keyMetric: '80%',
    metricLabel: 'Faster International Audit Turnaround',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80',
    logoInitial: 'FC'
  }
];

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  speaker: string;
  speakerRole: string;
  thumbnail: string;
  summary: string;
  youtubeId?: string;
  highlights: string[];
}

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'How HR Consultants in Lagos Scale Client Retention with NextSofthr',
    category: 'HR Consultant Spotlight',
    duration: '4:35',
    speaker: 'Babajide Alabi',
    speakerRole: 'Principal Consultant, NextHR Solutions',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    summary: 'Discover how NextHR transformed their advisory service into a high-margin recurring SaaS implementation practice delivering 100% compliant payrolls.',
    highlights: ['Automating Nigerian PAYE & Pension', 'Client onboarding in under 14 days', 'Building long-term retainer contracts']
  },
  {
    id: 'vid-2',
    title: 'Deploying Shift & Scheduling for 3,000+ Agricultural & Factory Workers in Kenya',
    category: 'Implementation Case',
    duration: '5:12',
    speaker: 'Wanjiru Mwangi',
    speakerRole: 'Payroll Systems Lead, AfriPay Systems',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
    summary: 'A field walkthrough of mobile QR scanning, biometric shift tracking, and instant mobile wallet payouts for agricultural workforces.',
    highlights: ['Offline-ready tablet check-ins', 'Mobile money payroll payouts', 'Preventing ghost worker fraud']
  },
  {
    id: 'vid-3',
    title: 'Integrating NextSofthr with Enterprise ERPs: Live Demo & Best Practices',
    category: 'Technology & Integration',
    duration: '6:40',
    speaker: 'Rajiv Sharma & Diane Uwase',
    speakerRole: 'Systems Integrator & Cloud Architect',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    summary: 'Technical deep-dive showing how NextSofthr REST APIs and webhooks connect biometric turnstiles, SAP, and NetSuite general ledgers.',
    highlights: ['REST API authentication & webhooks', 'Biometric turnstile hardware sync', 'Automated GL journal posting']
  },
  {
    id: 'vid-4',
    title: 'Highlights from the NextSofthr Africa Partner Summit & Tech Showcase',
    category: 'Global Ecosystem Event',
    duration: '3:50',
    speaker: 'NextSofthr Ecosystem Council',
    speakerRole: 'Partnership Directors & Global Integrators',
    thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    summary: 'Over 200 HR consultants, accountants, and IT leaders gathered in Lagos and Nairobi to explore the future of African workforce technology.',
    highlights: ['AI-powered payroll automation preview', 'New partner co-op fund incentives', 'Pan-African compliance roadmap']
  }
];

export const PARTNER_BENEFITS = [
  {
    icon: 'BadgePercent',
    title: 'New Revenue Opportunities',
    description: 'Create substantial new income streams through NextSofthr implementation, client onboarding, data migration, and ongoing consulting retainers.'
  },
  {
    icon: 'Repeat',
    title: 'Recurring Business',
    description: 'Build long-term customer relationships with predictable recurring monthly commissions and continuous managed HR/payroll services.'
  },
  {
    icon: 'GraduationCap',
    title: 'Partner Training & Certification',
    description: 'Access the NextSofthr Academy with structured curriculum, product certification badges, sandbox demo tenants, and implementation playbooks.'
  },
  {
    icon: 'Megaphone',
    title: 'Marketing Support & Co-Op Funds',
    description: 'Receive professionally designed brand collateral, pitch decks, client battle cards, event sponsorships, and co-branded case studies.'
  },
  {
    icon: 'Briefcase',
    title: 'Sales Enablement & Qualified Leads',
    description: 'Gain access to enterprise sales toolkits, customized demo scripts, proposal templates, and pre-qualified leads routed from NextSofthr sales.'
  },
  {
    icon: 'Headphones',
    title: 'Priority Technical Support',
    description: 'Direct access to senior NextSofthr product engineers, private Slack/Teams partner channels, and guaranteed SLAs during live go-lives.'
  },
  {
    icon: 'FileCode2',
    title: 'Partner Resources & APIs',
    description: 'Comprehensive API documentation, developer sandbox keys, pre-built webhook connectors, and architectural review consultations.'
  },
  {
    icon: 'Globe2',
    title: 'Global Network & Cross-Referrals',
    description: 'Collaborate with an expanding international network of HR consultants, accountants, and software integrators across 20+ countries.'
  }
];

export const WHY_WORK_WITH_PARTNER = [
  {
    icon: 'MapPin',
    title: 'Local Regulatory Expertise',
    description: 'Partner with verified specialists who understand local labor acts, statutory deductions (PAYE, Pension, NHF, KRA, SARS, SSNIT), and union collective bargaining agreements.'
  },
  {
    icon: 'Rocket',
    title: 'Fast & Reliable Implementation',
    description: 'Get your NextSofthr tenant configured right the first time — organizational charts, leave policies, grade levels, and custom salary components mapped smoothly.'
  },
  {
    icon: 'Users',
    title: 'Professional Team Training',
    description: 'Empower HR managers, payroll officers, line supervisors, and general staff with hands-on role-specific training sessions and employee self-service guides.'
  },
  {
    icon: 'Workflow',
    title: 'Business Process Consulting',
    description: 'Modernize legacy manual workflows, remove paper approval bottlenecks, and optimize appraisal frameworks with expert guidance from seasoned practitioners.'
  },
  {
    icon: 'Layers',
    title: 'Integration & Customization',
    description: 'Seamlessly link NextSofthr with your existing biometric hardware, enterprise ERPs (SAP, Oracle, NetSuite), bank payment gateways, and custom internal tools.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Ongoing SLA & Dedicated Support',
    description: 'Enjoy fast local response times, on-site assistance when needed, and continuous system maintenance as your business scales and opens new branches.'
  }
];

export const TRUST_FEATURES = [
  { icon: 'Shield', title: 'Secure Platform', desc: 'Bank-grade 256-bit encryption & SOC2 ready' },
  { icon: 'Cloud', title: '100% Cloud-Based', desc: 'No on-prem hardware or server maintenance' },
  { icon: 'TrendingUp', title: 'Scalable Architecture', desc: 'From 5 to 50,000+ employees seamlessly' },
  { icon: 'Globe', title: 'Multi-Country Ready', desc: 'Cross-border statutory tax & currency handling' },
  { icon: 'Building2', title: 'Multi-Company Support', desc: 'Consolidated holdings & subsidiary ledgers' },
  { icon: 'GitFork', title: 'Multi-Branch Operations', desc: 'Independent rosters & branch permissions' },
  { icon: 'Sparkles', title: 'AI-Powered Assistance', desc: 'Automated anomaly detection & smart HR queries' },
  { icon: 'Smartphone', title: 'Mobile Friendly', desc: 'Native-feel web & mobile self-service apps' }
];

export const FAQS = [
  {
    question: 'What is the NextSofthr Partner Network?',
    answer: 'The NextSofthr Partner Network is a global ecosystem of certified HR consultants, payroll specialists, accounting firms, technology companies, system integrators, and business advisors who help organizations implement, customize, and optimize NextSofthr across Africa and international markets.'
  },
  {
    question: 'Who can become a NextSofthr partner?',
    answer: 'Any registered business or experienced professional providing human resources consulting, payroll administration, accounting, IT services, enterprise software implementation, or management consulting can apply. We welcome single-country boutiques, pan-African consultancies, and global systems integrators.'
  },
  {
    question: 'Can HR consultants become partners?',
    answer: 'Yes, absolutely. HR consultants are a cornerstone of our partner network. They help businesses transition from chaotic spreadsheets and paper files to NextSofthr, while advising clients on performance management, employee grading, policy manuals, and compliance.'
  },
  {
    question: 'Can accounting firms become partners?',
    answer: 'Yes. Accounting firms use NextSofthr to manage outsourced payroll for multiple SME and enterprise clients through a unified multi-company dashboard, while seamlessly syncing payroll journal entries to accounting platforms.'
  },
  {
    question: 'Can IT companies and system integrators become partners?',
    answer: 'Yes. Technology companies and system integrators connect NextSofthr with existing biometric time-clocks, turnstiles, ERPs (SAP, NetSuite, Microsoft Dynamics), and develop custom API integrations for clients with specific technical requirements.'
  },
  {
    question: 'Can partners serve customers in multiple countries?',
    answer: 'Yes. NextSofthr natively supports multi-country operations with localized statutory tax algorithms for Nigeria (PAYE/Pension/NSITF), Kenya (KRA/NSSF/NHIF), Ghana (GRA/SSNIT), South Africa (SARS/UIF), Rwanda (RRA/RSSB), UK, UAE, and more. Partners can serve clients across multiple borders from a single console.'
  },
  {
    question: 'How do I find a NextSofthr partner?',
    answer: 'Use our interactive Partner Directory above! You can search by keyword, filter by country, city, industry expertise, partner type, or business size, and compare partner certifications, past client implementations, and ratings. You can then submit a direct enquiry or view their verified profile.'
  },
  {
    question: 'How are NextSofthr partners verified?',
    answer: 'All partners undergo rigorous vetting: validation of corporate registration, background checks, review of past implementation references, and mandatory NextSofthr technical certification exams for their staff. Higher tiers (Professional, Premium, Strategic) require demonstrated track records of successful deployments.'
  },
  {
    question: 'What services do NextSofthr partners provide?',
    answer: 'NextSofthr partners provide end-to-end services including HR software implementation, payroll setup & statutory tax filing, biometric attendance integration, historical data migration, admin & employee training, ongoing SLA support, custom API connectors, and strategic human capital consulting.'
  },
  {
    question: 'How do I become a NextSofthr partner?',
    answer: 'Click "Become a Partner" or fill out the registration form below. Our ecosystem onboarding team reviews your application within 24-48 business hours, schedules an introductory briefing, and provides your team with sandbox demo environments and certification training.'
  }
];
