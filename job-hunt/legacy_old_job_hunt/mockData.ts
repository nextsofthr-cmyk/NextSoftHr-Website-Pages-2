import { Job, Company, JobCategory, RecruitmentService, PricingPlan, FaqItem, Article } from '../types';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    name: 'NextSoftHR Internal Talent',
    logo: '',
    initials: 'NS',
    industry: 'HR Technology & SaaS',
    location: 'Lagos, Nigeria & Remote',
    headquarters: 'Victoria Island, Lagos',
    employeeCount: '150 - 300 employees',
    website: 'https://nextsofthr.com',
    isVerified: true,
    description: 'NextSoftHR develops next-generation enterprise workforce software, automated payroll engines, and recruitment solutions for high-growth enterprises across Africa and emerging markets.',
    activeVacanciesCount: 4,
    perks: ['Health insurance', 'Remote work stipend', 'Stock options', 'Learning allowance']
  },
  {
    id: 'comp-2',
    name: 'Paystack Financial',
    logo: '',
    initials: 'PF',
    industry: 'Financial Technology',
    location: 'Lagos, Nigeria (Hybrid)',
    headquarters: 'Ikeja, Lagos',
    employeeCount: '500+ employees',
    website: 'https://paystack.com',
    isVerified: true,
    description: 'A modern payment infrastructure powering frictionless financial transactions for businesses across Africa with world-class engineering and customer focus.',
    activeVacanciesCount: 6,
    perks: ['Competitive equity', 'Comprehensive HMO', 'Continuous learning budget', 'Home office setup']
  },
  {
    id: 'comp-3',
    name: 'Sterling Tech Group',
    logo: '',
    initials: 'ST',
    industry: 'Banking & Financial Services',
    location: 'Marina, Lagos & Abuja',
    headquarters: 'Marina, Lagos',
    employeeCount: '2,500+ employees',
    website: 'https://sterling.ng',
    isVerified: true,
    description: 'Pioneering institutional bank providing digital banking, SME credit facilities, and consumer technology initiatives across West Africa.',
    activeVacanciesCount: 5,
    perks: ['Retirement plan', 'Executive healthcare', 'Performance bonuses', 'Career rotation program']
  },
  {
    id: 'comp-4',
    name: 'Interswitch Global',
    logo: '',
    initials: 'IG',
    industry: 'Digital Payments & Identity',
    location: 'Victoria Island, Lagos & Nairobi',
    headquarters: 'Lagos, Nigeria',
    employeeCount: '1,200+ employees',
    website: 'https://interswitchgroup.com',
    isVerified: true,
    description: 'An Africa-focused integrated digital payment and commerce company facilitating electronic circulation of money and exchange of value.',
    activeVacanciesCount: 7,
    perks: ['Medical coverage for family', 'Pension fund', 'Gym membership', 'Childcare subsidy']
  },
  {
    id: 'comp-5',
    name: 'Moniepoint Cloud',
    logo: '',
    initials: 'MC',
    industry: 'Fintech & Business Banking',
    location: 'Lekki Phase 1, Lagos & Remote',
    headquarters: 'Lagos, Nigeria',
    employeeCount: '1,000+ employees',
    website: 'https://moniepoint.com',
    isVerified: true,
    description: 'All-in-one financial services platform for businesses offering banking, payments, credit, and business management tools.',
    activeVacanciesCount: 8,
    perks: ['Performance bonuses', 'Health insurance', 'Flexible hours', 'Relocation assistance']
  },
  {
    id: 'comp-6',
    name: 'Dangote Industrial Holding',
    logo: '',
    initials: 'DH',
    industry: 'Manufacturing & Heavy Industry',
    location: 'Ikoyi, Lagos & Lekki FTZ',
    headquarters: 'Ikoyi, Lagos',
    employeeCount: '15,000+ employees',
    website: 'https://dangote.com',
    isVerified: true,
    description: 'Leading diversified industrial conglomerate with manufacturing operations spanning cement, sugar, petrochemicals, fertilizers, and logistics.',
    activeVacanciesCount: 9,
    perks: ['Comprehensive healthcare', 'Executive travel allowance', 'Pension', 'Life insurance']
  },
  {
    id: 'comp-7',
    name: 'Andela Talent Network',
    logo: '',
    initials: 'AT',
    industry: 'Global Technical Staffing',
    location: 'Fully Remote (Africa / Global)',
    headquarters: 'New York & Global',
    employeeCount: '800+ employees',
    website: 'https://andela.com',
    isVerified: true,
    description: 'Connecting brilliant technical talent across Africa and the globe with world-class engineering teams and top venture-backed companies.',
    activeVacanciesCount: 6,
    perks: ['100% remote flexibility', 'USD salary benchmarks', 'Co-working stipend', 'Annual retreat']
  },
  {
    id: 'comp-8',
    name: 'Kuda Microfinance Bank',
    logo: '',
    initials: 'KM',
    industry: 'Digital Banking',
    location: 'Yaba, Lagos & London (Hybrid)',
    headquarters: 'Lagos, Nigeria',
    employeeCount: '450+ employees',
    website: 'https://kuda.com',
    isVerified: true,
    description: 'The money app for Africans everywhere, offering zero-fee digital banking, smart budgeting, and seamless multi-currency payments.',
    activeVacanciesCount: 4,
    perks: ['Modern health cover', 'Wellness days', 'Hybrid schedule', 'Free team lunches']
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior HR Business Partner (HRBP)',
    companyId: 'comp-1',
    companyName: 'NextSoftHR Internal Talent',
    companyLogo: '',
    companyInitials: 'NS',
    isVerified: true,
    location: 'Victoria Island, Lagos',
    workArrangement: 'Hybrid',
    employmentType: 'Full-Time',
    salaryRange: '₦1,200,000 - ₦1,850,000',
    currency: 'NGN',
    experienceLevel: 'Senior Level',
    category: 'Human Resources',
    industry: 'HR Technology & SaaS',
    datePosted: '2 days ago',
    deadline: '2026-11-15',
    isFeatured: true,
    department: 'People Operations',
    description: 'We are seeking an experienced Human Resources Business Partner to align business objectives with employees and management in designated business units. The HRBP acts as an employee champion and change agent, orchestrating high-performance talent strategies through NextSoftHR\'s suite of software tools.',
    responsibilities: [
      'Partner with department leaders to drive organizational design, workforce planning, and succession planning.',
      'Analyze trends and metrics in partnership with the HR group to develop solutions, programs and policies.',
      'Manage and resolve complex employee relations issues while conducting effective, thorough, and objective investigations.',
      'Maintain in-depth knowledge of legal requirements related to day-to-day management of employees, reducing legal risks and ensuring regulatory compliance with Nigerian Labour Laws.',
      'Provide performance management guidance to line management (coaching, counseling, career development, disciplinary actions).'
    ],
    requirements: [
      'Minimum of 6+ years of resolving complex employee relations issues and HR business partnering.',
      'BSc or Master\'s degree in Human Resources, Business Administration, or related discipline; CIPM, SHRM-CP, or SPHRi certification required.',
      'Demonstrated expertise in Nigerian labor legislation, employee engagement, and talent retention strategies.',
      'Experience working in a fast-paced technology, fintech, or professional consulting environment.'
    ],
    benefits: [
      'Comprehensive HMO covering spouse and up to 3 dependants',
      'Annual performance bonus and executive pension contribution',
      'Flexible hybrid working model (2 days remote, 3 days office)',
      'Subsidized continuous learning and professional certification renewals'
    ],
    applicantCount: 28,
    recruiterSource: 'Direct Employer',
    shift: 'Day Shift',
    genderPreference: 'Equal Opportunity',
    degreeLevel: "Bachelor's / B.Sc / HND",
    skills: ['HR Strategy', 'CIPM', 'Labor Law', 'Payroll', 'Employee Relations', 'Talent Retention']
  },
  {
    id: 'job-2',
    title: 'Lead Software Engineer (Fintech & Core Banking)',
    companyId: 'comp-2',
    companyName: 'Paystack Financial',
    companyLogo: '',
    companyInitials: 'PF',
    isVerified: true,
    location: 'Lagos, Nigeria (Hybrid)',
    workArrangement: 'Hybrid',
    employmentType: 'Full-Time',
    salaryRange: '₦2,400,000 - ₦3,500,000',
    currency: 'NGN',
    experienceLevel: 'Lead / Director',
    category: 'Information Technology',
    industry: 'Financial Technology',
    datePosted: '1 day ago',
    deadline: '2026-11-20',
    isFeatured: true,
    department: 'Core Infrastructure',
    description: 'Lead a cross-functional engineering squad designing and scaling low-latency payment processing pipelines handling billions of Naira in daily settlement volume.',
    responsibilities: [
      'Architect robust, resilient microservices handling high concurrency financial workflows.',
      'Drive technical excellence, code reviews, and mentorship across mid-level and senior software developers.',
      'Collaborate with product and compliance teams on PCI-DSS compliance, fraud mitigation, and API resiliency.',
      'Establish automated CI/CD pipelines, observability standards, and infrastructure health metrics.'
    ],
    requirements: [
      '7+ years building enterprise distributed systems in TypeScript/Node.js, Go, or Java.',
      'Deep experience with PostgreSQL, Kafka/RabbitMQ, Docker, and AWS/GCP cloud environments.',
      'Demonstrated understanding of financial ledger structures, idempotent transactions, and cryptographic verification.',
      'Strong leadership communication and track record of mentoring software engineers.'
    ],
    benefits: [
      'Competitive base compensation plus dollar-denominated stock equity options',
      'Full family medical coverage with optical and dental care',
      'Annual home workstation hardware budget (₦1,500,000 allowance)',
      'Unlimited paid annual leave policy with mandatory 3-week wellness break'
    ],
    applicantCount: 42,
    recruiterSource: 'Direct Employer',
    shift: 'Flexible / Rotational',
    genderPreference: 'Equal Opportunity',
    degreeLevel: "Bachelor's / B.Sc / HND",
    skills: ['TypeScript', 'Node.js', 'PostgreSQL', 'Kafka', 'Docker', 'AWS / Cloud', 'Distributed Systems']
  },
  {
    id: 'job-3',
    title: 'Executive Recruitment Consultant (Headhunter)',
    companyId: 'comp-1',
    companyName: 'NextSoftHR Internal Talent',
    companyLogo: '',
    companyInitials: 'NS',
    isVerified: true,
    location: 'Victoria Island, Lagos / Hybrid',
    workArrangement: 'Hybrid',
    employmentType: 'Full-Time',
    salaryRange: '₦1,400,000 - ₦2,200,000',
    currency: 'NGN',
    experienceLevel: 'Senior Level',
    category: 'Human Resources',
    industry: 'HR Technology & SaaS',
    datePosted: 'Just now',
    deadline: '2026-11-30',
    isFeatured: true,
    isUrgent: true,
    department: 'Executive Search & RPO',
    description: 'NextSoftHR\'s Executive Search Practice is hiring a seasoned Headhunter to lead retained C-suite and VP-level executive searches for Tier-1 commercial banks, multinational telecom operators, and venture-backed African unicorns.',
    responsibilities: [
      'Lead end-to-end confidential executive searches for C-level (CEO, CFO, CTO, CPO) and Board roles.',
      'Build comprehensive talent mapping matrices across Pan-African and Diaspora talent pools.',
      'Conduct rigorous behavioral and competency-based executive interviews and leadership assessments.',
      'Manage client stakeholder relationships, search progress reports, and compensation negotiations.'
    ],
    requirements: [
      '5+ years dedicated headhunting or retained executive search consulting experience.',
      'Extensive existing network across African executive leadership and diaspora talent.',
      'Superb interpersonal presentation, written reporting, and confidential negotiation capabilities.',
      'Bachelor’s degree; advanced degrees or recruitment accreditations preferred.'
    ],
    benefits: [
      'Generous placement bonus commission structure (uncapped quarterly incentives)',
      'Executive company vehicle allowance and business travel expenses',
      'Comprehensive executive medical and life insurance package',
      'Access to state-of-the-art NextSoftHR Talent Intelligence Suite'
    ],
    applicantCount: 19,
    recruiterSource: 'Executive Headhunter',
    posterType: 'headhunter',
    posterDetails: {
      headhunterFirm: 'NextSoft Executive Search Partners',
      retainedMandateLevel: 'Retained C-Suite Search',
      contactName: 'Chidi Okonkwo, Managing Partner'
    },
    shift: 'Day Shift',
    genderPreference: 'All Genders Welcome',
    degreeLevel: "Master's / M.Sc / MBA",
    skills: ['Executive Search', 'Headhunting', 'Talent Mapping', 'C-Suite Assessment', 'Client Relations']
  },
  {
    id: 'job-4',
    title: 'Payroll & HR Operations Specialist',
    companyId: 'comp-3',
    companyName: 'Sterling Tech Group',
    companyLogo: '',
    companyInitials: 'ST',
    isVerified: true,
    location: 'Marina, Lagos',
    workArrangement: 'On-Site',
    employmentType: 'Full-Time',
    salaryRange: '₦850,000 - ₦1,250,000',
    currency: 'NGN',
    experienceLevel: 'Mid Level',
    category: 'Banking & Finance',
    industry: 'Banking & Financial Services',
    datePosted: '3 days ago',
    deadline: '2026-11-12',
    isFeatured: false,
    department: 'People & Payroll Operations',
    description: 'Ensure accurate, on-time monthly payroll processing, tax remittances, and statutory deduction compliance across Sterling\'s distributed workforce of 2,500+ professionals.',
    responsibilities: [
      'Oversee end-to-end payroll runs including allowances, deductions, pensions, and PAYE tax remittances.',
      'Reconcile payroll discrepancies and resolve employee payroll inquiries through NextSoftHR HRMS.',
      'Ensure strict statutory compliance with NSITF, ITF, NHF, and state internal revenue services (LIRS, FIRS).',
      'Generate monthly workforce payroll analytics and compensation variance reports for the CFO.'
    ],
    requirements: [
      '3-5 years of dedicated payroll administration and statutory accounting experience in Nigeria.',
      'In-depth mastery of Nigerian tax laws, Pension Reform Act, and employee compensation accounting.',
      'Proficiency with HRMS software (NextSoftHR, SAP, or Sage) and advanced Microsoft Excel skills.',
      'BSc in Accounting, Finance, Human Resources, or related discipline with ICAN or CIPM in progress.'
    ],
    benefits: [
      'Guaranteed 13th month salary bonus and annual performance incentive',
      'Comprehensive institutional staff medical scheme',
      'Subsidized staff loans and mortgage equity facilities',
      'Contributory pension scheme with above-statutory employer match'
    ],
    applicantCount: 37,
    recruiterSource: 'Direct Employer',
    shift: 'Day Shift',
    genderPreference: 'Equal Opportunity',
    degreeLevel: "Bachelor's / B.Sc / HND",
    skills: ['Payroll / HRMS', 'LIRS / FIRS Tax', 'Pension Reform', 'Excel', 'Statutory Compliance', 'ICAN']
  },
  {
    id: 'job-5',
    title: 'Senior Operations Supervisor (Logistics & Supply Chain)',
    companyId: 'comp-6',
    companyName: 'Dangote Industrial Holding',
    companyLogo: '',
    companyInitials: 'DH',
    isVerified: true,
    location: 'Lekki Free Trade Zone, Lagos',
    workArrangement: 'On-Site',
    employmentType: 'Full-Time',
    salaryRange: '₦1,100,000 - ₦1,700,000',
    currency: 'NGN',
    experienceLevel: 'Senior Level',
    category: 'Logistics & Supply Chain',
    industry: 'Manufacturing & Heavy Industry',
    datePosted: '4 days ago',
    deadline: '2026-11-25',
    isFeatured: true,
    department: 'Plant Operations & Fleet Logistics',
    description: 'Direct day-to-day warehouse distribution operations, multimodal fleet coordination, and industrial inventory safety standards at our Lekki logistics hub.',
    responsibilities: [
      'Supervise dispatch workflows, inventory staging, and truck fleet movements across maritime and road corridors.',
      'Implement strict Health, Safety & Environment (HSE) protocols across all active loading docks.',
      'Coordinate shift planning, labor allocation, and attendance records using NextSoftHR workforce tools.',
      'Optimize turnaround time for heavy commercial haulage vehicles and reduce demurrage liabilities.'
    ],
    requirements: [
      '6+ years supervisory experience in industrial manufacturing logistics, port operations, or supply chain.',
      'Bachelor\'s degree in Supply Chain Management, Engineering, Logistics, or Business Administration.',
      'Strong crisis management, workforce mobilization, and vendor negotiation capabilities.',
      'Certification in CILT or CSCP is an added advantage.'
    ],
    benefits: [
      'Competitive executive remuneration with annual profit-sharing bonus',
      'Dedicated company vehicle and fuel card',
      'On-site subsidized executive dining and fitness center',
      'Executive HMO with coverage across top private hospitals'
    ],
    applicantCount: 22,
    recruiterSource: 'Recruitment Agency',
    posterType: 'agency',
    posterDetails: {
      agencyClientName: 'Dangote Industrial Holding',
      contactName: 'KPMG / Workforce Advisory Partners',
      isConfidential: false
    },
    shift: 'Flexible / Rotational',
    genderPreference: 'All Genders Welcome',
    degreeLevel: "Bachelor's / B.Sc / HND",
    skills: ['Supply Chain / Logistics', 'Warehouse Ops', 'Fleet Management', 'HSE Protocols', 'CILT']
  },
  {
    id: 'job-6',
    title: 'B2B Enterprise Sales Executive (HR Technology)',
    companyId: 'comp-1',
    companyName: 'NextSoftHR Internal Talent',
    companyLogo: '',
    companyInitials: 'NS',
    isVerified: true,
    location: 'Victoria Island, Lagos / Hybrid',
    workArrangement: 'Hybrid',
    employmentType: 'Full-Time',
    salaryRange: '₦900,000 - ₦1,500,000 + Uncapped Commission',
    currency: 'NGN',
    experienceLevel: 'Mid Level',
    category: 'Sales & Marketing',
    industry: 'HR Technology & SaaS',
    datePosted: '1 day ago',
    deadline: '2026-11-18',
    isFeatured: true,
    department: 'Commercial Growth',
    description: 'Drive expansion of NextSoftHR\'s HRMS suite, recruitment software, and managed payroll services across corporate mid-market and enterprise accounts in West and East Africa.',
    responsibilities: [
      'Source, prospect, and close new software licenses with Heads of HR, Chief People Officers, and Managing Directors.',
      'Conduct consultative product demonstrations highlighting NextSoftHR\'s recruitment marketplace and applicant tracking.',
      'Collaborate with the pre-sales solutions engineering team to respond to enterprise RFPs.',
      'Exceed quarterly revenue quotas and foster long-term client retention and upselling.'
    ],
    requirements: [
      '3-6 years of B2B SaaS, enterprise software, or corporate HR consulting sales experience.',
      'Proven track record of consistently meeting or exceeding commercial quota targets in Africa.',
      'Exceptional presentation, pitching, and executive relationship building skills.',
      'Familiarity with HR technology, ATS platforms, or ERP systems (SAP, Workday, BambooHR).'
    ],
    benefits: [
      'Uncapped monthly sales commissions paid in both local and foreign currency',
      'Official transport allowance and client entertainment account',
      'Latest Apple MacBook Pro and corporate mobile stipend',
      'Annual international sales incentive club retreat'
    ],
    applicantCount: 31,
    recruiterSource: 'Direct Employer',
    shift: 'Day Shift',
    genderPreference: 'Female-Preferred / Diversity Initiative',
    degreeLevel: "Bachelor's / B.Sc / HND",
    skills: ['B2B Sales', 'SaaS Licensing', 'RFP Response', 'CRM', 'Executive Pitching', 'Account Management']
  },
  {
    id: 'job-7',
    title: 'Senior Product Designer (Design Systems & Web Apps)',
    companyId: 'comp-4',
    companyName: 'Interswitch Global',
    companyLogo: '',
    companyInitials: 'IG',
    isVerified: true,
    location: 'Lagos & Nairobi (Remote / Hybrid)',
    workArrangement: 'Remote',
    employmentType: 'Remote',
    salaryRange: '₦1,800,000 - ₦2,600,000',
    currency: 'NGN',
    experienceLevel: 'Senior Level',
    category: 'Information Technology',
    industry: 'Digital Payments & Identity',
    datePosted: '5 days ago',
    deadline: '2026-11-22',
    isFeatured: true,
    department: 'Product Experience',
    description: 'Craft intuitive, frictionless web and mobile interfaces for millions of consumers and corporate merchants relying on Interswitch financial rails.',
    responsibilities: [
      'Maintain and evolve the enterprise multi-brand design system with Figma token standards.',
      'Translate complex financial reconciliation, risk analysis, and merchant onboarding into crystal-clear user journeys.',
      'Conduct user interviews, usability testing sessions, and quantitative telemetry analysis with product managers.',
      'Partner closely with front-end engineers to ensure pixel-perfect fidelity across responsive viewports.'
    ],
    requirements: [
      '5+ years designing enterprise SaaS, fintech products, or developer platforms.',
      'Stunning portfolio displaying high-end interaction design, typographic craftsmanship, and design systems.',
      'Mastery of Figma, component auto-layout, interactive prototyping, and WCAG AA accessibility.',
      'Experience working across African payment patterns (USSD, cards, virtual accounts, QR).'
    ],
    benefits: [
      'Flexible work-from-anywhere policy with dedicated home office allowance',
      'Comprehensive health coverage including gym & dental',
      'Annual technology conference attendance budget',
      'Generous paid parental leave'
    ],
    applicantCount: 45,
    recruiterSource: 'Direct Employer',
    shift: 'Flexible / Rotational',
    genderPreference: 'All Genders Welcome',
    degreeLevel: "Bachelor's / B.Sc / HND",
    skills: ['Figma / UI Design', 'Design Systems', 'WCAG AA Accessibility', 'User Research', 'Prototyping']
  },
  {
    id: 'job-8',
    title: 'Finance & Treasury Manager',
    companyId: 'comp-5',
    companyName: 'Moniepoint Cloud',
    companyLogo: '',
    companyInitials: 'MC',
    isVerified: true,
    location: 'Lekki Phase 1, Lagos',
    workArrangement: 'Hybrid',
    employmentType: 'Full-Time',
    salaryRange: '₦2,000,000 - ₦3,000,000',
    currency: 'NGN',
    experienceLevel: 'Senior Level',
    category: 'Banking & Finance',
    industry: 'Fintech & Business Banking',
    datePosted: '3 days ago',
    deadline: '2026-11-19',
    isFeatured: false,
    department: 'Finance & Treasury',
    description: 'Direct multi-currency liquidity management, Central Bank statutory ratios, capital adequacy reporting, and commercial cash management operations.',
    responsibilities: [
      'Manage daily interbank settlements, foreign exchange hedging, and overnight liquidity placements.',
      'Ensure strict regulatory compliance with Central Bank of Nigeria (CBN) monetary policy guidelines.',
      'Formulate monthly cashflow forecasts, interest rate sensitivity models, and working capital strategies.',
      'Manage external relationships with corresponding commercial banks and institutional liquidity providers.'
    ],
    requirements: [
      '6+ years of treasury and corporate finance experience in a licensed commercial bank or high-volume fintech.',
      'BSc in Finance, Economics, or Accounting; ACA, ACCA, or CFA qualification required.',
      'Extensive understanding of electronic payment settlement cycles and treasury management systems.',
      'Strong analytical rigor and executive stakeholder reporting.'
    ],
    benefits: [
      'Executive equity participation',
      'Comprehensive international HMO policy',
      'Flexible hybrid schedule with luxury office workspace in Lekki',
      'Company car option scheme'
    ],
    applicantCount: 26,
    recruiterSource: 'NextSoftHR RPO',
    shift: 'Day Shift',
    genderPreference: 'Equal Opportunity',
    degreeLevel: "Professional Certification",
    skills: ['Financial Modeling', 'Treasury Ops', 'CBN Regulations', 'Cashflow Forecasting', 'ACA / ACCA', 'CFA']
  },
  {
    id: 'job-9',
    title: 'Graduate Trainee - People & Operations (2026 Cohort)',
    companyId: 'comp-1',
    companyName: 'NextSoftHR Internal Talent',
    companyLogo: '',
    companyInitials: 'NS',
    isVerified: true,
    location: 'Lagos & Abuja, Nigeria',
    workArrangement: 'On-Site',
    employmentType: 'Internship',
    salaryRange: '₦350,000 - ₦500,000',
    currency: 'NGN',
    experienceLevel: 'Entry Level',
    category: 'Human Resources',
    industry: 'HR Technology & SaaS',
    datePosted: '3 days ago',
    deadline: '2026-12-01',
    isFeatured: true,
    department: 'Human Resources & Academy',
    description: 'An accelerated 18-month rotational leadership program for high-achieving recent graduates interested in mastering modern HR technology, recruitment operations, and talent management.',
    responsibilities: [
      'Rotate across Talent Acquisition, HR Technology Consulting, Payroll Administration, and Client Success.',
      'Support senior HR consultants with candidate screening, resume validation, and interview scheduling.',
      'Assist in executing workforce data audits and employee records migration into the NextSoftHR cloud platform.',
      'Participate in structured mentorship sessions with the Chief Executive and People Leadership.'
    ],
    requirements: [
      'Bachelor\'s degree with a First Class or Second Class Upper (2:1) in any discipline from an accredited university.',
      'Completion of the National Youth Service Corps (NYSC) or valid exemption certificate.',
      'Exceptional analytical, written communication, and digital problem-solving skills.',
      'Passionate enthusiasm for human resources technology and building scalable modern organizations.'
    ],
    benefits: [
      'Competitive monthly trainee stipend with full HMO medical cover',
      'Structured professional mentorship and sponsored CIPM/HRCI certification',
      'Guaranteed direct transition to Associate Consultant role upon successful program completion',
      'Access to state-of-the-art technology equipment and learning stipends'
    ],
    applicantCount: 114,
    recruiterSource: 'Direct Employer',
    shift: 'Day Shift',
    genderPreference: 'Female-Preferred / Diversity Initiative',
    degreeLevel: "Bachelor's / B.Sc / HND",
    skills: ['Talent Sourcing', 'HR Technology', 'NYSC Completed', 'Analytics', 'Candidate Screening']
  },
  {
    id: 'job-10',
    title: 'Contract Staffing Specialist (Temporary & Project Workforce)',
    companyId: 'comp-7',
    companyName: 'Andela Talent Network',
    companyLogo: '',
    companyInitials: 'AT',
    isVerified: true,
    location: 'Remote (Pan-Africa)',
    workArrangement: 'Remote',
    employmentType: 'Contract',
    salaryRange: '$4,000 - $6,500 / month',
    currency: 'USD',
    experienceLevel: 'Mid Level',
    category: 'Administration',
    industry: 'Global Technical Staffing',
    datePosted: '1 day ago',
    deadline: '2026-11-28',
    isFeatured: false,
    department: 'Global Workforce Deployment',
    description: 'Manage flexible contractor onboarding, multi-jurisdiction compliance, invoicing, and talent retention across 12 African markets for international enterprise clients.',
    responsibilities: [
      'Draft and coordinate localized contractor agreements ensuring local tax and labor law compliance.',
      'Liaise with client engagement managers to ensure rapid deployment of technical contractor teams.',
      'Manage monthly contractor timesheet approvals and cross-border disbursements.',
      'Conduct regular contractor pulse checks and dispute resolution.'
    ],
    requirements: [
      '4+ years managing contractor workforce solutions or agency recruitment operations across Africa.',
      'Familiarity with global contractor management platforms and international compliance regulations.',
      'Strong organizational, contract negotiation, and customer relationship management skills.',
      'Fluency in English; working French proficiency is a significant plus.'
    ],
    benefits: [
      'USD-denominated compensation with stable direct wire disbursements',
      '100% remote flexibility with co-working desk allowance',
      'International telehealth health cover',
      'Annual equipment refresh stipend'
    ],
    applicantCount: 38,
    recruiterSource: 'Partner Agency',
    shift: 'Flexible / Rotational',
    genderPreference: 'All Genders Welcome',
    degreeLevel: "Bachelor's / B.Sc / HND",
    skills: ['Contract Staffing', 'Global Compliance', 'Timesheets', 'Vendor Management', 'Bilingual']
  },
  {
    id: 'job-11',
    title: 'Senior FinTech Platform Architect (Mobile Money)',
    companyId: 'comp-4',
    companyName: 'Interswitch Global',
    companyLogo: '',
    companyInitials: 'IG',
    isVerified: true,
    location: 'Nairobi, Kenya',
    workArrangement: 'Hybrid',
    employmentType: 'Full-Time',
    salaryRange: 'KSh 450,000 - KSh 680,000 / month',
    currency: 'KES',
    experienceLevel: 'Lead / Director',
    category: 'Information Technology',
    industry: 'Digital Payments & Identity',
    datePosted: '1 day ago',
    deadline: '2026-11-28',
    isFeatured: true,
    isUrgent: false,
    department: 'East Africa Infrastructure',
    description: 'Design and expand high-concurrency cross-border payment switches and merchant acquiring gateways connecting East Africa with global remittance rails.',
    responsibilities: [
      'Architect resilient microservices bridging M-Pesa APIs, Airtel Money, and core banking switches.',
      'Supervise compliance with Central Bank of Kenya (CBK) national payment system standards.',
      'Mentor senior software developers in Go, distributed tracing, and fault-tolerant event queues.'
    ],
    requirements: [
      '7+ years in distributed transaction systems, fintech platforms, or telecom payment engines.',
      'Strong hands-on mastery of Kafka, Redis, Docker, and Kubernetes in AWS/GCP.',
      'Based in Nairobi or willing to work in our Westlands technology hub.'
    ],
    benefits: [
      'Comprehensive family medical cover (inpatient & outpatient across East Africa)',
      'Quarterly performance bonuses & executive stock equity',
      'Flexible hybrid schedule (2 days in office, 3 days remote)'
    ],
    applicantCount: 29,
    recruiterSource: 'Direct Employer',
    shift: 'Flexible / Rotational',
    genderPreference: 'Equal Opportunity',
    degreeLevel: "Bachelor's / B.Sc / HND",
    skills: ['Kafka', 'Go', 'M-Pesa APIs', 'Kubernetes', 'Redis', 'AWS / Cloud', 'Microservices']
  },
  {
    id: 'job-12',
    title: 'Head of People & Culture (West Africa Expansion)',
    companyId: 'comp-1',
    companyName: 'NextSoftHR Internal Talent',
    companyLogo: '',
    companyInitials: 'NS',
    isVerified: true,
    location: 'Accra, Ghana & Remote',
    workArrangement: 'Hybrid',
    employmentType: 'Full-Time',
    salaryRange: 'GH₵ 28,000 - GH₵ 42,000 / month',
    currency: 'GHS',
    experienceLevel: 'Lead / Director',
    category: 'Human Resources',
    industry: 'HR Technology & SaaS',
    datePosted: '2 days ago',
    deadline: '2026-11-30',
    isFeatured: true,
    department: 'Executive People Leadership',
    description: 'Champion organizational culture, talent acquisition, and performance management as NextSoftHR scales enterprise HR software client engagements across Ghana and Côte d\'Ivoire.',
    responsibilities: [
      'Formulate comprehensive talent attraction strategies for enterprise client delivery teams.',
      'Ensure 100% compliance with Ghanaian Labour Act regulations, SSNIT statutory pensions, and local employment law.',
      'Implement NextSoftHR cloud human resource systems internally to set benchmark organizational standards.'
    ],
    requirements: [
      '6+ years of progressive HR leadership experience in West Africa or global tech firms.',
      'Bachelor’s or Master’s in Human Resource Management; CIHRM or SHRM-SCP certification.',
      'Outstanding executive communications and organizational design capability.'
    ],
    benefits: [
      'Executive company vehicle allowance and private medical insurance',
      'Continuous leadership education grant (USD $3,000 annually)',
      'Subsidized international company retreats'
    ],
    applicantCount: 23,
    recruiterSource: 'NextSoftHR RPO',
    shift: 'Day Shift',
    genderPreference: 'Female-Preferred / Diversity Initiative',
    degreeLevel: "Master's / M.Sc / MBA",
    skills: ['HR Strategy', 'Organizational Design', 'CIHRM / SHRM', 'Ghana Labour Law', 'Leadership']
  },
  {
    id: 'job-13',
    title: 'Cloud Infrastructure & Site Reliability Engineer',
    companyId: 'comp-2',
    companyName: 'Paystack Financial',
    companyLogo: '',
    companyInitials: 'PF',
    isVerified: true,
    location: 'Cape Town & Johannesburg, South Africa',
    workArrangement: 'Remote',
    employmentType: 'Full-Time',
    salaryRange: 'R 85,000 - R 130,000 / month',
    currency: 'ZAR',
    experienceLevel: 'Senior Level',
    category: 'Information Technology',
    industry: 'Financial Technology',
    datePosted: 'Just now',
    deadline: '2026-12-05',
    isFeatured: true,
    isUrgent: true,
    department: 'Cloud Platform Engineering',
    description: 'Ensure 99.999% availability, zero-trust cloud security posture, and automated disaster recovery for payment settlement pipelines handling millions of monthly API calls across Southern and Sub-Saharan Africa.',
    responsibilities: [
      'Manage Terraform infrastructure-as-code across multi-region AWS and Google Cloud environments.',
      'Establish automated chaos testing, Prometheus/Grafana alerting, and automated canary deployments.',
      'Enforce PCI-DSS level 1 compliance and SOC 2 Type II audit readiness.'
    ],
    requirements: [
      '5+ years managing high-scale cloud infrastructure with Terraform, Kubernetes, and Linux internals.',
      'Proficiency in Python, Go, or Bash for robust platform automation and telemetry ingestion.',
      'Experience in financial service SLAs or regulated industry environments.'
    ],
    benefits: [
      'Full South African medical aid subsidy for employee and family',
      'Remote home office budget (R 25,000 setup allowance)',
      'Competitive equity stock options and annual performance incentives'
    ],
    applicantCount: 34,
    recruiterSource: 'Direct Employer',
    shift: 'Night Shift',
    genderPreference: 'Equal Opportunity',
    degreeLevel: "Bachelor's / B.Sc / HND",
    skills: ['Terraform', 'Kubernetes', 'AWS / Cloud', 'Linux', 'Python', 'Prometheus', 'Zero-Trust']
  },
  {
    id: 'job-14',
    title: 'Director of International People Operations & Compliance',
    companyId: 'comp-1',
    companyName: 'NextSoftHR Internal Talent',
    companyLogo: '',
    companyInitials: 'NS',
    isVerified: true,
    location: 'London, United Kingdom',
    workArrangement: 'Hybrid',
    employmentType: 'Full-Time',
    salaryRange: '£75,000 - £95,000 / year',
    currency: 'GBP',
    experienceLevel: 'Lead / Director',
    category: 'Human Resources',
    industry: 'HR Technology & SaaS',
    datePosted: '3 days ago',
    deadline: '2026-12-10',
    isFeatured: true,
    department: 'Global Governance & Operations',
    description: 'Lead NextSoftHR’s European market expansion office in Central London, managing cross-border diaspora recruitment mandates, UK-Africa enterprise workforce partnerships, and employment compliance.',
    responsibilities: [
      'Direct cross-border executive recruitment searches bridging London financial institutions with emerging market headquarters.',
      'Advise UK corporate employers on sponsoring African diaspora engineering and executive leaders.',
      'Partner with product teams to adapt NextSoftHR HRMS to UK statutory requirements (HMRC PAYE, GDPR).'
    ],
    requirements: [
      '7+ years in senior human resources, international talent mobility, or UK employment law advisory.',
      'Chartered MCIPD or equivalent senior HR qualification.',
      'Deep appreciation for Pan-African talent ecosystems and international business operations.'
    ],
    benefits: [
      'Competitive City of London salary with executive profit share bonus',
      'Private Bupa medical cover and contributory UK pension (up to 8% employer match)',
      'Hybrid working flexibility with premium Mayfair / Soho office space'
    ],
    applicantCount: 19,
    recruiterSource: 'NextSoftHR RPO',
    shift: 'Day Shift',
    genderPreference: 'Equal Opportunity',
    degreeLevel: "Master's / M.Sc / MBA",
    skills: ['Diaspora Recruitment', 'UK Employment Law', 'MCIPD', 'Governance', 'GDPR', 'Expatriate Mobility']
  },
  {
    id: 'job-15',
    title: 'Principal Staff Software Engineer (Diaspora Talent Network)',
    companyId: 'comp-7',
    companyName: 'Andela Talent Network',
    companyLogo: '',
    companyInitials: 'AT',
    isVerified: true,
    location: 'New York & San Francisco, United States (Remote)',
    workArrangement: 'Remote',
    employmentType: 'Full-Time',
    salaryRange: '$165,000 - $210,000 / year',
    currency: 'USD',
    experienceLevel: 'Lead / Director',
    category: 'Information Technology',
    industry: 'Global Technical Staffing',
    datePosted: '1 day ago',
    deadline: '2026-12-15',
    isFeatured: true,
    department: 'Global Engineering Platform',
    description: 'Architect next-generation AI-assisted talent discovery algorithms, matching high-caliber international software engineers with Tier-1 US tech companies and venture-funded unicorns.',
    responsibilities: [
      'Build scalable GraphQL/REST APIs and automated candidate skill evaluation engines in TypeScript and Rust.',
      'Partner with US enterprise clients on engineering capacity planning and high-velocity hiring.'
    ],
    requirements: [
      '8+ years building high-traffic cloud platforms and developer tooling in distributed teams.',
      'Demonstrated expertise in system design, distributed data stores, and event-driven architectures.'
    ],
    benefits: [
      'Top-tier US comprehensive medical, dental, and vision insurance',
      '401(k) matching with immediate vesting',
      'Flexible unlimited PTO policy and annual remote retreat'
    ],
    applicantCount: 52,
    recruiterSource: 'Direct Employer',
    shift: 'Flexible / Rotational',
    genderPreference: 'All Genders Welcome',
    degreeLevel: "Doctorate / Ph.D",
    skills: ['GraphQL', 'Rust', 'TypeScript', 'Distributed Systems', 'System Design', 'AI Matching']
  },
  {
    id: 'job-16',
    title: 'Senior Full-Stack Platform Engineer (Cross-Border Rails)',
    companyId: 'comp-5',
    companyName: 'Moniepoint Cloud',
    companyLogo: '',
    companyInitials: 'MC',
    isVerified: true,
    location: 'Toronto, Canada (Remote)',
    workArrangement: 'Remote',
    employmentType: 'Full-Time',
    salaryRange: 'CAD $120,000 - CAD $155,000 / year',
    currency: 'CAD',
    experienceLevel: 'Senior Level',
    category: 'Information Technology',
    industry: 'Fintech & Business Banking',
    datePosted: '2 days ago',
    deadline: '2026-11-29',
    isFeatured: false,
    department: 'International Rails',
    description: 'Develop low-latency remittance integrations connecting North American banking channels with African instant payment switches for cross-border SME trade.',
    responsibilities: [
      'Implement bulletproof payment gateway integrations in TypeScript/React and Java/Kotlin microservices.',
      'Collaborate with AML/KYC automated identity verification pipelines.'
    ],
    requirements: [
      '5+ years full-stack development experience with modern React, Node.js or Kotlin, and PostgreSQL.',
      'Canadian work authorization or resident in Canada.'
    ],
    benefits: [
      'Competitive Canadian compensation + equity participation',
      'Comprehensive Canadian health and dental benefits',
      'Flexible remote lifestyle with home office budget'
    ],
    applicantCount: 27,
    recruiterSource: 'Direct Employer',
    shift: 'Flexible / Rotational',
    genderPreference: 'Equal Opportunity',
    degreeLevel: "Bachelor's / B.Sc / HND",
    skills: ['React', 'Node.js', 'Kotlin', 'PostgreSQL', 'AML / KYC', 'Fintech Rails']
  },
  {
    id: 'job-17',
    title: 'Regional HR Operations & Talent Development Manager',
    companyId: 'comp-1',
    companyName: 'NextSoftHR Internal Talent',
    companyLogo: '',
    companyInitials: 'NS',
    isVerified: true,
    location: 'Kigali, Rwanda',
    workArrangement: 'On-Site',
    employmentType: 'Full-Time',
    salaryRange: 'RWF 2,800,000 - RWF 4,200,000 / month',
    currency: 'RWF',
    experienceLevel: 'Senior Level',
    category: 'Human Resources',
    industry: 'HR Technology & SaaS',
    datePosted: '2 days ago',
    deadline: '2026-12-08',
    isFeatured: true,
    department: 'East Africa People Operations',
    description: 'Coordinate pan-African talent mobilization and regional hiring programs from Kigali Innovation City, supporting tech accelerators and multinational operations across Central & East Africa.',
    responsibilities: [
      'Direct bilingual (English/French) talent assessment programs and leadership succession planning.',
      'Manage local Rwandan labor law compliance and expatriate work permit workflows.'
    ],
    requirements: [
      '5+ years experience in HR operations or talent management in Rwanda or East Africa.',
      'Bachelor\'s or Master\'s degree in Human Resources or related discipline.'
    ],
    benefits: [
      'Competitive remuneration package with private regional health insurance',
      'Annual performance bonus and professional learning stipend'
    ],
    applicantCount: 16,
    recruiterSource: 'NextSoftHR RPO',
    shift: 'Day Shift',
    genderPreference: 'All Genders Welcome',
    degreeLevel: "Master's / M.Sc / MBA",
    skills: ['HR Operations', 'Talent Assessment', 'Labor Law', 'Bilingual French', 'Succession Planning']
  },
  {
    id: 'job-18',
    title: 'Enterprise Commercial Sales Director (MEA Region)',
    companyId: 'comp-4',
    companyName: 'Interswitch Global',
    companyLogo: '',
    companyInitials: 'IG',
    isVerified: true,
    location: 'Dubai, United Arab Emirates',
    workArrangement: 'Hybrid',
    employmentType: 'Full-Time',
    salaryRange: 'AED 35,000 - AED 50,000 / month + Bonus',
    currency: 'AED',
    experienceLevel: 'Lead / Director',
    category: 'Sales & Marketing',
    industry: 'Digital Payments & Identity',
    datePosted: '3 days ago',
    deadline: '2026-12-18',
    isFeatured: true,
    department: 'Middle East & Africa Commercial',
    description: 'Lead institutional sales engagements with Gulf sovereign funds, multinational payment processors, and global airlines expanding merchant payment services across Africa and the Middle East.',
    responsibilities: [
      'Develop strategic relationships with enterprise CFOs, Heads of Payment, and commercial banking executives across the GCC.',
      'Exceed multi-million dollar annual software license and transaction processing quotas.'
    ],
    requirements: [
      '7+ years in enterprise fintech sales, corporate payment gateway licensing, or transaction banking.',
      'Established executive network across Dubai, Abu Dhabi, and international financial corridors.'
    ],
    benefits: [
      'Tax-free UAE compensation package + uncapped commercial commission',
      'Executive international travel allowance and VIP health cover',
      'DIFC prime office location'
    ],
    applicantCount: 21,
    recruiterSource: 'Direct Employer',
    posterType: 'company',
    shift: 'Day Shift',
    genderPreference: 'Equal Opportunity',
    degreeLevel: "Bachelor's / B.Sc / HND",
    skills: ['B2B Sales', 'GCC Banking', 'Fintech Licensing', 'Sovereign Accounts', 'Pipeline Management']
  },
  {
    id: 'job-19',
    title: 'Founding Chief of Staff & Operations Lead (Private Tech Ventures)',
    companyId: 'comp-private-1',
    companyName: 'Dr. O. Adeleke (Private Office)',
    companyLogo: '',
    companyInitials: 'OA',
    isVerified: true,
    location: 'Ikoyi, Lagos & London (Hybrid)',
    workArrangement: 'Hybrid',
    employmentType: 'Full-Time',
    salaryRange: '$4,500 - $7,000 / month',
    currency: 'USD',
    experienceLevel: 'Senior Level',
    category: 'Administration',
    industry: 'Private Office & Angel Ventures',
    datePosted: 'Just now',
    deadline: '2026-12-20',
    isFeatured: true,
    isUrgent: true,
    department: 'Principal Executive Office',
    description: 'Direct confidential strategic initiatives, portfolio venture coordination, and operational governance directly alongside a serial tech entrepreneur and angel investor.',
    responsibilities: [
      'Serve as right-hand trusted advisor managing strategic initiatives across 4 portfolio companies.',
      'Represent the principal in board preparations, investor briefings, and high-stakes commercial negotiations.',
      'Coordinate executive travel, special ventures, and philanthropic initiatives across London and Lagos.'
    ],
    requirements: [
      '4-7 years in management consulting, investment banking, or high-growth startup leadership.',
      'Exceptional analytical, written, and diplomatic confidentiality capabilities.',
      'Bachelor’s or Master’s degree from a globally recognized institution.'
    ],
    benefits: [
      'USD-denominated compensation with annual venture carry & bonus',
      'International executive medical coverage',
      'First-class travel allowance when accompanying principal overseas'
    ],
    applicantCount: 16,
    recruiterSource: 'Individual / Founder',
    posterType: 'individual',
    posterDetails: {
      contactName: 'Dr. O. Adeleke',
      individualTitle: 'Tech Entrepreneur & Angel Investor',
      contactEmail: 'adeleke.office@ventures.africa',
      isConfidential: false
    },
    shift: 'Weekend Shift',
    genderPreference: 'All Genders Welcome',
    degreeLevel: "Master's / M.Sc / MBA",
    skills: ['Venture Operations', 'Consulting', 'Board Governance', 'Investor Relations', 'Strategic Planning']
  },
  {
    id: 'job-20',
    title: 'Customer Care & Operations Specialist (Night Shift)',
    companyId: 'comp-2',
    companyName: 'Paystack Financial',
    companyLogo: '',
    companyInitials: 'PF',
    isVerified: true,
    location: 'Ikeja, Lagos & Remote',
    workArrangement: 'Hybrid',
    employmentType: 'Full-Time',
    salaryRange: '₦450,000 - ₦650,000',
    currency: 'NGN',
    experienceLevel: 'Entry Level',
    category: 'Administration',
    industry: 'Financial Technology',
    datePosted: '1 day ago',
    deadline: '2026-11-25',
    isFeatured: false,
    department: 'Customer Success & 24/7 Operations',
    description: 'Provide round-the-clock merchant dispute resolution, terminal telemetry troubleshooting, and instant transaction support during overnight settlement hours.',
    responsibilities: [
      'Address tier-1 and tier-2 inbound merchant transaction issues and API webhooks via live chat.',
      'Perform live card settlement reconciliation and flag anomalous chargeback patterns.',
      'Collaborate with engineering on-call teams during nocturnal scheduled database maintenance.'
    ],
    requirements: [
      'High School Diploma / SSCE / OND or Bachelor’s degree in any field.',
      'Strong empathy, written customer engagement, and fast typing speed (50+ WPM).',
      'Willingness and passion to work nocturnal schedules (10:00 PM - 6:00 AM) with night shift allowances.'
    ],
    benefits: [
      'Dedicated nocturnal transport allowance + meal vouchers',
      'Comprehensive health coverage including mental wellness',
      'Laptop and high-speed fiber internet stipend'
    ],
    applicantCount: 65,
    recruiterSource: 'Direct Employer',
    shift: 'Night Shift',
    genderPreference: 'Equal Opportunity',
    degreeLevel: 'High School / SSCE / OND',
    skills: ['Customer Support', 'Dispute Resolution', 'Live Chat', 'Night Shift Ops', 'CRM', 'Zendesk']
  },
  {
    id: 'job-21',
    title: 'Lead AI & People Analytics Research Scientist',
    companyId: 'comp-1',
    companyName: 'NextSoftHR Internal Talent',
    companyLogo: '',
    companyInitials: 'NS',
    isVerified: true,
    location: 'Victoria Island, Lagos / Hybrid',
    workArrangement: 'Hybrid',
    employmentType: 'Full-Time',
    salaryRange: '₦3,800,000 - ₦5,200,000',
    currency: 'NGN',
    experienceLevel: 'Senior Level',
    category: 'Engineering',
    industry: 'HR Technology & SaaS',
    datePosted: 'Just now',
    deadline: '2026-12-12',
    isFeatured: true,
    isUrgent: true,
    department: 'AI Research & Workforce Analytics',
    description: 'Design and train ethical AI models for predictive retention modeling, automated skill taxonomy extraction, and bias-free candidate matching algorithms.',
    responsibilities: [
      'Train natural language understanding models on African multilingual resume corpora.',
      'Develop algorithmic fairness audits ensuring zero bias in recruitment shortlisting scorecards.',
      'Publish research findings in computational social science and human-computer interaction conferences.'
    ],
    requirements: [
      'Ph.D. / Doctorate in Computer Science, Data Science, Quantitative Social Science, or Applied Mathematics.',
      'Proven publication record in NLP, algorithmic fairness, or human capital data mining.',
      'Mastery of Python, PyTorch, HuggingFace transformers, and vector databases.'
    ],
    benefits: [
      'Top-percentile compensation with generous founder equity grant',
      'Research lab hardware grant + GPU compute quota',
      'Annual international conference travel sponsorships'
    ],
    applicantCount: 12,
    recruiterSource: 'Direct Employer',
    shift: 'Flexible / Rotational',
    genderPreference: 'Female-Preferred / Diversity Initiative',
    degreeLevel: 'Doctorate / Ph.D',
    skills: ['Python', 'NLP', 'PyTorch', 'Data Science', 'Machine Learning', 'AI Ethics', 'Algorithmic Fairness']
  }
];

export const JOB_CATEGORIES: JobCategory[] = [
  { id: 'cat-1', name: 'Information Technology', iconName: 'Laptop', jobCount: 184, description: 'Software engineering, cloud infrastructure, cybersecurity, and product management' },
  { id: 'cat-2', name: 'Banking & Finance', iconName: 'Landmark', jobCount: 142, description: 'Investment banking, financial analysis, treasury, audit, and risk management' },
  { id: 'cat-3', name: 'Human Resources', iconName: 'Users', jobCount: 96, description: 'HRBPs, talent acquisition, payroll specialists, and organizational development' },
  { id: 'cat-4', name: 'Sales & Marketing', iconName: 'TrendingUp', jobCount: 135, description: 'Enterprise sales, growth marketing, digital advertising, and brand communications' },
  { id: 'cat-5', name: 'Engineering', iconName: 'Cpu', jobCount: 88, description: 'Mechanical, electrical, civil, industrial, and petroleum engineering specialties' },
  { id: 'cat-6', name: 'Healthcare', iconName: 'Activity', jobCount: 64, description: 'Clinical operations, healthcare administration, pharmacy, and medical technology' },
  { id: 'cat-7', name: 'Education', iconName: 'GraduationCap', jobCount: 47, description: 'Higher education lecturing, corporate training, curriculum design, and edtech' },
  { id: 'cat-8', name: 'Administration', iconName: 'FileText', jobCount: 78, description: 'Executive assistance, office management, procurement, and facility administration' },
  { id: 'cat-9', name: 'Manufacturing', iconName: 'Factory', jobCount: 92, description: 'Plant management, quality assurance, production lines, and industrial maintenance' },
  { id: 'cat-10', name: 'Logistics & Supply Chain', iconName: 'Truck', jobCount: 110, description: 'Freight forwarding, fleet operations, procurement, and warehouse logistics' },
  { id: 'cat-11', name: 'Hospitality', iconName: 'Coffee', jobCount: 39, description: 'Hotel management, catering services, travel logistics, and event coordination' },
  { id: 'cat-12', name: 'Customer Service', iconName: 'Headphones', jobCount: 73, description: 'Client success, technical support, call center supervision, and dispute resolution' }
];

export const RECRUITMENT_SERVICES: RecruitmentService[] = [
  {
    id: 'srv-a',
    code: 'A',
    title: 'Internal Recruitment Management',
    subtitle: 'Self-Service Applicant Tracking & Hiring Workflow',
    targetAudience: 'Companies managing their own recruitment teams',
    deliverables: [
      'Vacancy creation and automated multi-channel job distribution',
      'Centralized applicant database and CV parsing',
      'AI-assisted CV screening and candidate shortlisting scores',
      'Integrated interview scheduling and scorecard coordination',
      'Direct recruitment-to-employee onboarding pipeline sync'
    ],
    ctaLabel: 'Manage Recruitment',
    iconName: 'LayoutGrid',
    badge: 'Software Solution'
  },
  {
    id: 'srv-b',
    code: 'B',
    title: 'Recruitment Process Outsourcing (RPO)',
    subtitle: 'End-to-End Talent Acquisition Partnership',
    targetAudience: 'Organizations needing external support for part or all hiring operations',
    deliverables: [
      'Tailored workforce planning and market compensation benchmarking',
      'Proactive candidate sourcing and talent mapping across Africa',
      'Rigorous multi-stage vetting, background and reference checks',
      'End-to-end interview coordination and stakeholder feedback loops',
      'Dedicated recruitment account managers embedded with your team'
    ],
    ctaLabel: 'Outsource Recruitment',
    iconName: 'Briefcase',
    badge: 'Managed Service'
  },
  {
    id: 'srv-c',
    code: 'C',
    title: 'Executive Search & Headhunting',
    subtitle: 'Confidential Senior Leadership & C-Suite Acquisition',
    targetAudience: 'Boards and CEOs hiring mission-critical leadership',
    deliverables: [
      'Confidential executive talent mapping and market reconnaissance',
      'Discreet approach and passive executive candidate outreach',
      'Competency-based leadership assessments and track-record audits',
      'Shortlisting of vetted C-level, VP, and Director candidates',
      'Executive compensation advisory and seamless offer closing'
    ],
    ctaLabel: 'Request Executive Search',
    iconName: 'Award',
    badge: 'Retained Advisory'
  },
  {
    id: 'srv-d',
    code: 'D',
    title: 'Recruitment Agency Solutions',
    subtitle: 'Multi-Client Platform for Staffing Firms & Headhunters',
    targetAudience: 'Independent recruitment agencies and boutique headhunters',
    deliverables: [
      'Multi-client assignment management and candidate pipelines',
      'Organized talent pool database with private candidate tags',
      'Collaborative assignment tracking and client review portals',
      'Placement verification, billing, and commission tracking tools',
      'Verified agency directory listing to attract corporate briefs'
    ],
    ctaLabel: 'Register Your Agency',
    iconName: 'Layers',
    badge: 'Agency Platform'
  },
  {
    id: 'srv-e',
    code: 'E',
    title: 'Contract Staffing & Workforce Solutions',
    subtitle: 'Flexible, Scalable Project & Contingent Talent',
    targetAudience: 'Businesses requiring temporary, contract, or scalable workforce',
    deliverables: [
      'Rapid deployment of vetted technical and operational talent',
      'Multi-country contract compliance, tax withholding, and labor standards',
      'Automated digital timesheet tracking and consolidated billing',
      'Contingent workforce risk mitigation and indemnity protection',
      'Seamless contract-to-permanent conversion pathways'
    ],
    ctaLabel: 'Discuss Workforce Needs',
    iconName: 'Users2',
    badge: 'Scalable Staffing'
  },
  {
    id: 'srv-f',
    code: 'F',
    title: 'Integrated HR Technology',
    subtitle: 'Unified Recruitment-to-Payroll HRMS Suite',
    targetAudience: 'Organizations wanting to connect hiring with broader HR operations',
    deliverables: [
      '1-click candidate-to-employee onboarding file transfer',
      'Integrated employee records, digital contracts, and HR compliance',
      'Automated payroll engine connection with automated tax deductions',
      'Leave, performance, and continuous career development tracking',
      'Executive workforce visibility and predictive attrition analytics'
    ],
    ctaLabel: 'Explore NextSoftHR',
    iconName: 'Workflow',
    badge: 'Unified HRMS'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-1',
    name: 'Standard Job Post',
    category: 'posting',
    price: '₦45,000',
    period: 'per single vacancy (30 days)',
    description: 'Perfect for startups and businesses with occasional recruitment needs.',
    highlighted: false,
    features: [
      'Published on NextSoftHR for 30 days',
      'Distributed to relevant job seeker email alerts',
      'Applicant tracking dashboard with CV downloads',
      'Company logo and branded profile inclusion',
      'Standard candidate screening questions'
    ],
    ctaText: 'Post a Single Job'
  },
  {
    id: 'plan-2',
    name: 'Growth Hiring Bundle',
    category: 'posting',
    price: '₦180,000',
    period: '5 job posts (valid for 90 days)',
    description: 'Designed for expanding companies scaling multiple departments simultaneously.',
    highlighted: true,
    features: [
      '5 Featured Job Postings with top-of-category placement',
      'Social media amplification across NextSoftHR talent channels',
      'AI Resume Keyword screening and candidate rank scoring',
      'Automated candidate status notifications and email dispatch',
      'Dedicated customer success recruitment support'
    ],
    ctaText: 'Get Growth Bundle'
  },
  {
    id: 'plan-3',
    name: 'NextSoftHR Recruitment ATS',
    category: 'software',
    price: '₦125,000',
    period: 'per month (billed annually)',
    description: 'Complete recruitment technology suite integrated with NextSoftHR HRMS.',
    highlighted: false,
    features: [
      'Unlimited active job posts on NextSoftHR marketplace',
      'Full candidate relationship management (CRM) and talent pools',
      'Multi-stage hiring pipelines and interviewer scorecards',
      'Direct integration with NextSoftHR Payroll and Employee Records',
      'Advanced recruitment pipeline velocity and source analytics'
    ],
    ctaText: 'Start Software Trial'
  },
  {
    id: 'plan-4',
    name: 'RPO & Executive Search',
    category: 'enterprise',
    price: 'Custom Engagement',
    period: 'Retained or milestone-based',
    description: 'Full-service recruitment process outsourcing and executive talent search.',
    highlighted: false,
    features: [
      'Dedicated Senior Recruiter or Headhunter assigned to your brief',
      'Comprehensive market talent mapping and compensation research',
      '100% replacement guarantee within 90 days of candidate placement',
      'Full candidate background checks, credential verification, and references',
      'Bespoke executive onboarding and transition support'
    ],
    ctaText: 'Request Custom Proposal'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'seekers',
    question: 'How do I create a job-seeker account on NextSoftHR?',
    answer: 'Creating an account is free and takes less than 2 minutes. Click "Create Account" in the top navigation, select the "Job Seeker" option, enter your basic contact information, and upload your current CV. You can then manage your career profile, track job applications, and set up automated job alerts.',
    actionLabel: 'Create Candidate Account',
    actionTarget: 'register-seeker'
  },
  {
    id: 'faq-2',
    category: 'employers',
    question: 'How can my company post a job vacancy?',
    answer: 'You can click the "Post a Job" button in the header. If you are a new employer, you will register your organization with your official corporate email. You can post single listings on-demand or subscribe to a monthly recruitment software package for volume hiring with full ATS features.',
    actionLabel: 'Post a Job Now',
    actionTarget: 'post-job'
  },
  {
    id: 'faq-3',
    category: 'employers',
    question: 'Can existing NextSoftHR software customers access recruitment tools?',
    answer: 'Yes! If your organization already uses NextSoftHR HRMS for payroll or employee records, your administrator can activate the recruitment module directly from your existing dashboard without separate credentials. Successful candidates can be converted into active employees with a single click.',
    actionLabel: 'Sign In via HRMS',
    actionTarget: 'login-employer'
  },
  {
    id: 'faq-4',
    category: 'services',
    question: 'What is the difference between using the job board and outsourcing recruitment (RPO)?',
    answer: 'The job board is a self-service tool where you publish openings and manage incoming applications yourself. Recruitment Process Outsourcing (RPO) is a comprehensive managed service where NextSoftHR\'s dedicated talent acquisition consultants handle everything: candidate sourcing, deep screening, interview coordination, and offer negotiation on your behalf.',
    actionLabel: 'Explore RPO Options',
    actionTarget: 'services-modal'
  },
  {
    id: 'faq-5',
    category: 'agencies',
    question: 'Can independent recruitment agencies register on the platform?',
    answer: 'Yes. We welcome independent recruitment agencies and staffing firms. An agency account provides multi-client pipeline management, candidate tracking, assignment tracking, and the opportunity to receive verified hiring briefs from employers looking for specialist placement partners.',
    actionLabel: 'Register Your Agency',
    actionTarget: 'register-agency'
  },
  {
    id: 'faq-6',
    category: 'agencies',
    question: 'How can executive headhunters join NextSoftHR?',
    answer: 'Executive headhunters can register as specialized talent consultants. Following verification of your track record, you gain access to confidential C-suite and senior executive briefs, diaspora talent mapping tools, and co-brokerage placements within the NextSoftHR Executive Search network.',
    actionLabel: 'Join Recruiter Network',
    actionTarget: 'register-agency'
  },
  {
    id: 'faq-7',
    category: 'general',
    question: 'How can I become a NextSoftHR business or referral partner?',
    answer: 'We collaborate with HR consultants, technology implementation partners, and payroll advisors across Africa and internationally. Our partners earn attractive recurring referral commissions when introducing corporate clients to NextSoftHR software or managed recruitment solutions.',
    actionLabel: 'Become a Partner',
    actionTarget: 'register-partner'
  },
  {
    id: 'faq-8',
    category: 'employers',
    question: 'Can I manage multiple vacancies and interview pipelines concurrently?',
    answer: 'Yes. The employer recruitment console allows you to manage unlimited vacancies, organize candidates by customized hiring stages (Screening, Interview 1, Technical Assessment, Final Offer), and invite hiring team members to submit standardized candidate scorecards.',
    actionLabel: 'View Employer Plans',
    actionTarget: 'pricing'
  },
  {
    id: 'faq-9',
    category: 'seekers',
    question: 'How do job alerts and saved jobs work?',
    answer: 'When viewing any job listing, click the bookmark icon to save it for later review in your candidate dashboard. You can also save custom search filters (such as "Software Engineer in Lagos" or "Remote HR") and receive instant daily or weekly notifications whenever matching roles are published.',
    actionLabel: 'Find Jobs',
    actionTarget: 'search-jobs'
  },
  {
    id: 'faq-10',
    category: 'services',
    question: 'How do I request enterprise recruitment or contract staffing services?',
    answer: 'You can click "Speak to Our Recruitment Team" or fill out the Enterprise Consultation form in the Recruitment Services section. One of our Senior Talent Advisors will schedule a discovery session within 24 business hours to analyze your workforce goals and tailor a formal proposal.',
    actionLabel: 'Request Consultation',
    actionTarget: 'services-modal'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Crafting a High-Impact CV for African & International Employers in 2026',
    category: 'CV & Resume Writing',
    excerpt: 'Key strategies to format your professional experience, highlight quantified business impact, and pass modern ATS parsers without losing human warmth.',
    content: 'In today’s competitive talent marketplace, recruitment software and hiring managers review hundreds of applications within minutes. Learn the three structural pillars of a high-converting curriculum vitae: measurable business outcomes, clear chronological career milestones, and concise technical proficiencies.',
    author: 'Amina Bello',
    authorRole: 'Head of Talent Advisory, NextSoftHR',
    readTime: '5 min read',
    publishedDate: 'October 14, 2026',
    tags: ['Resume Tips', 'ATS Optimization', 'Career Growth']
  },
  {
    id: 'art-2',
    title: 'Mastering Executive Leadership Interviews: The Behavioral Competency Framework',
    category: 'Interview Preparation',
    excerpt: 'How to articulate strategic vision, stakeholder alignment, and crisis governance during senior C-level and director interviews.',
    content: 'Senior leadership interviews evaluate far more than operational competence; they assess emotional resilience, strategic horizon planning, and cultural stewardship. We analyze proven methodologies for framing complex organizational transformations.',
    author: 'Tunde Adeleke',
    authorRole: 'Managing Director, Executive Search Practice',
    readTime: '7 min read',
    publishedDate: 'October 08, 2026',
    tags: ['Executive Search', 'Leadership', 'Interview Skills']
  },
  {
    id: 'art-3',
    title: 'Compensation Benchmarking: Tech, Finance & HR Salaries in Nigeria & East Africa',
    category: 'Salary & Compensation',
    excerpt: 'Comprehensive data analysis on inflation-adjusted compensation, dual-currency salaries, and equity benchmarks across West and East Africa.',
    content: 'Navigating macroeconomic currency volatility requires both employers and candidates to adopt transparent, resilient compensation models. Discover current market percentiles for mid-level and senior roles in Lagos, Nairobi, and regional remote hubs.',
    author: 'Dr. Chinedu Eze',
    authorRole: 'Chief Economist & Workforce Researcher',
    readTime: '6 min read',
    publishedDate: 'September 29, 2026',
    tags: ['Compensation', 'Workforce Data', 'African Markets']
  },
  {
    id: 'art-4',
    title: 'Scaling High-Performance HR Operations: Bridging the ATS to Payroll Divide',
    category: 'Employer Recruitment Tips',
    excerpt: 'Why disconnected recruitment tools create candidate drop-off and how unified HRMS architectures accelerate time-to-hire by 40%.',
    content: 'When candidate records must be manually re-keyed into payroll and HR administration systems, companies introduce compliance errors and onboarding friction. This guide illustrates the operational advantages of unified employee lifecycle management.',
    author: 'Folake Oshodi',
    authorRole: 'VP of Product, NextSoftHR',
    readTime: '4 min read',
    publishedDate: 'September 19, 2026',
    tags: ['HR Operations', 'Recruitment Tech', 'Onboarding']
  }
];

export const TECHNICAL_INTEGRATION_SPECS = {
  version: 'v2.4-enterprise',
  architecture: 'RESTful JSON & GraphQL Gateway with Webhooks',
  authMechanism: 'OAuth 2.0 Client Credentials & JWT Bearer Token',
  endpoints: [
    {
      method: 'POST',
      path: '/api/v1/vacancies/publish',
      description: 'Publishes a verified job vacancy to NextSoftHR marketplace and syndicate network',
      auth: 'Bearer Employer_Token',
      roles: ['employer_admin', 'agency_recruiter', 'hrms_service_account']
    },
    {
      method: 'GET',
      path: '/api/v1/vacancies/search',
      description: 'Searches active vacancies with faceted filtering (category, salary, location, remote)',
      auth: 'Public / Candidate Optional',
      roles: ['guest', 'job_seeker', 'all']
    },
    {
      method: 'POST',
      path: '/api/v1/candidates/apply',
      description: 'Submits job application payload with CV attachment metadata and screening responses',
      auth: 'Bearer Seeker_Token or Public Guest Token',
      roles: ['job_seeker', 'candidate']
    },
    {
      method: 'POST',
      path: '/api/v1/hrms/sync-onboarding',
      description: 'Transfers accepted candidate record into NextSoftHR Core HRMS (payroll, tax, employee ID)',
      auth: 'Bearer API_Key + Secret',
      roles: ['hrms_enterprise_client']
    },
    {
      method: 'POST',
      path: '/api/v1/rpo/consultation-request',
      description: 'Dispatches enterprise talent search brief to NextSoftHR Executive & RPO Practice',
      auth: 'Public Form Validated',
      roles: ['employer', 'corporate_client']
    },
    {
      method: 'POST',
      path: '/api/v1/partners/referral-lead',
      description: 'Records partner referral with attribution cookie and commission ledger',
      auth: 'Bearer Partner_Token',
      roles: ['verified_partner']
    }
  ]
};
