import { ContactOptionCard, BusinessChallenge, NetworkNode, EnquiryType } from '../types';

export const BRAND = {
  name: 'NextSofthr',
  website: 'www.nextsofthr.org',
  websiteUrl: 'https://www.nextsofthr.org',
  phone: '+234 915 848 2622',
  phoneRaw: '+2349158482622',
  whatsappRaw: '2349158482622',
  email: 'contact@nextsofthr.org',
  salesEmail: 'sales@nextsofthr.org',
  supportEmail: 'support@nextsofthr.org',
  address: 'NextSofthr Global Operations, Victoria Island, Lagos & Nairobi Tech Corridor',
  responseTimeStatement: 'Our advisory and support team typically replies within 2 to 4 business hours during regular operating windows (GMT+1 / EAT).',
};

export const COUNTRIES = [
  'Nigeria',
  'Ghana',
  'Kenya',
  'South Africa',
  'Uganda',
  'Tanzania',
  'Rwanda',
  'Zambia',
  'Botswana',
  'Egypt',
  'Other African Country',
  'United Kingdom',
  'United States',
  'Canada',
  'UAE',
  'Other',
];

export const COMPANY_SIZES = [
  '1–10',
  '11–50',
  '51–200',
  '201–500',
  '501–1,000',
  '1,000+',
];

export const ENQUIRY_TYPES: EnquiryType[] = [
  'HR Management',
  'Payroll',
  'Recruitment',
  'Employee Management',
  'Time & Attendance',
  'Leave Management',
  'Performance Management',
  'Business Management',
  'AI HR Assistant',
  'Enterprise Solutions',
  'Partnership',
  'Customer Support',
  'Other',
];

export const CONTACT_OPTIONS: ContactOptionCard[] = [
  {
    id: 'sales',
    title: 'Sales',
    headline: 'Talk to Sales',
    description: 'Want to understand how NextSofthr can fit your business, team size, and growth roadmap?',
    ctaText: 'Contact Sales',
    enquiryType: 'HR Management',
    badge: 'Fast Response',
  },
  {
    id: 'demo',
    title: 'Product Tour',
    headline: 'See NextSofthr in Action',
    description: 'Schedule a personalized product demonstration tailored to your exact industry workflows.',
    ctaText: 'Book a Demo',
    enquiryType: 'HR Management',
    badge: 'Interactive',
  },
  {
    id: 'support',
    title: 'Customer Support',
    headline: 'Need Support?',
    description: 'Already using NextSofthr? Our dedicated regional support desk is ready to help your team.',
    ctaText: 'Get Support',
    enquiryType: 'Customer Support',
  },
  {
    id: 'partnerships',
    title: 'Partnerships',
    headline: 'Become a Partner',
    description: 'Partner with NextSofthr and help organizations modernize HR, compliance, and payroll across Africa.',
    ctaText: 'Become a Partner',
    enquiryType: 'Partnership',
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    headline: 'Enterprise Solutions',
    description: 'Need a multi-entity solution for a large or complex organization with distributed teams?',
    ctaText: 'Talk to Enterprise',
    enquiryType: 'Enterprise Solutions',
    badge: 'Custom Architecture',
  },
  {
    id: 'general',
    title: 'General Inquiries',
    headline: 'General Enquiries',
    description: 'Have a question, media inquiry, suggestion, or strategic business opportunity for our founders?',
    ctaText: 'Send an Enquiry',
    enquiryType: 'Other',
  },
];

export const WHY_CONTACT_BENEFITS = [
  {
    id: 'consultation',
    title: 'Personalized Consultation',
    description: 'Get strategic guidance customized to your organization size, regulatory framework, and localized operating environment.',
    iconName: 'UserCheck',
  },
  {
    id: 'demo',
    title: 'Product Demonstration',
    description: 'Experience real-time interactive dashboards, multi-tier approval flows, and self-service portals before making any commitment.',
    iconName: 'Laptop',
  },
  {
    id: 'implementation',
    title: 'Implementation Guidance',
    description: 'Understand how seamlessly your employee master records, biometric clocks, and data can migrate with zero payroll downtime.',
    iconName: 'Compass',
  },
  {
    id: 'payroll',
    title: 'Payroll Consultation',
    description: 'Discuss multi-currency payroll workflows, statutory tax remittances, pension deductions, and local banking integrations.',
    iconName: 'Coins',
  },
  {
    id: 'technology',
    title: 'HR Technology Consultation',
    description: 'Explore how AI-powered automation, digital onboarding, and automated performance reviews streamline daily HR work.',
    iconName: 'Cpu',
  },
  {
    id: 'enterprise',
    title: 'Enterprise Solutions',
    description: 'Architect complex workforce governance, multi-subsidiary consolidation, role-based security, and custom API integrations.',
    iconName: 'Building2',
  },
];

export const BUSINESS_CHALLENGES: BusinessChallenge[] = [
  {
    id: 'c1',
    question: 'Payroll taking too much time?',
    solution: "Let's simplify it.",
    category: 'Payroll',
    iconName: 'Clock',
  },
  {
    id: 'c2',
    question: 'Employee records scattered across systems?',
    solution: "Let's centralize them.",
    category: 'Employee Management',
    iconName: 'FolderKanban',
  },
  {
    id: 'c3',
    question: 'Attendance difficult to track?',
    solution: "Let's automate it.",
    category: 'Time & Attendance',
    iconName: 'ScanFace',
  },
  {
    id: 'c4',
    question: 'HR processes still manual?',
    solution: "Let's digitize them.",
    category: 'HR Management',
    iconName: 'FileCheck',
  },
  {
    id: 'c5',
    question: 'Managing multiple locations?',
    solution: "Let's connect your workforce.",
    category: 'Enterprise Solutions',
    iconName: 'Network',
  },
  {
    id: 'c6',
    question: 'Need better workforce insights?',
    solution: "Let's turn your data into actionable information.",
    category: 'Business Management',
    iconName: 'BarChart3',
  },
];

export const NETWORK_NODES: NetworkNode[] = [
  // African Hubs
  { id: 'ng', country: 'Nigeria', city: 'Lagos & Abuja', region: 'Africa', x: 46, y: 52, highlight: true, activeUsersLabel: '120k+ Active Employees' },
  { id: 'gh', country: 'Ghana', city: 'Accra', region: 'Africa', x: 42, y: 54, activeUsersLabel: 'Statutory GRA & SSNIT Automated' },
  { id: 'ke', country: 'Kenya', city: 'Nairobi', region: 'Africa', x: 58, y: 57, highlight: true, activeUsersLabel: 'KRA iTax & NSSF Ready' },
  { id: 'za', country: 'South Africa', city: 'Johannesburg & Cape Town', region: 'Africa', x: 53, y: 78, highlight: true, activeUsersLabel: 'SARS & UIF Compliant' },
  { id: 'ug', country: 'Uganda', city: 'Kampala', region: 'Africa', x: 55, y: 55, activeUsersLabel: 'URA & NSSF Integration' },
  { id: 'tz', country: 'Tanzania', city: 'Dar es Salaam', region: 'Africa', x: 58, y: 62, activeUsersLabel: 'TRA & WCF Automated' },
  { id: 'rw', country: 'Rwanda', city: 'Kigali', region: 'Africa', x: 54, y: 58, highlight: true, activeUsersLabel: 'RRA Instant E-Filing' },
  { id: 'zm', country: 'Zambia', city: 'Lusaka', region: 'Africa', x: 53, y: 68, activeUsersLabel: 'ZRA Multi-currency Pay' },
  { id: 'bw', country: 'Botswana', city: 'Gaborone', region: 'Africa', x: 51, y: 75, activeUsersLabel: 'BURS Localized' },
  { id: 'eg', country: 'Egypt', city: 'Cairo', region: 'Africa', x: 54, y: 38, activeUsersLabel: 'ETA Tax & Social Insurance' },
  // Global Market Hubs
  { id: 'uk', country: 'United Kingdom', city: 'London', region: 'Global', x: 45, y: 28, highlight: true, activeUsersLabel: 'HMRC & Cross-border EOR' },
  { id: 'us', country: 'United States', city: 'New York & SF', region: 'Global', x: 23, y: 34, highlight: true, activeUsersLabel: 'Remote Contractor & Expat Pay' },
  { id: 'ca', country: 'Canada', city: 'Toronto', region: 'Global', x: 21, y: 27, activeUsersLabel: 'Global Distributed Teams' },
  { id: 'ae', country: 'UAE', city: 'Dubai', region: 'Global', x: 62, y: 43, highlight: true, activeUsersLabel: 'WPS Compliant Payroll' },
];

export const FAQS = [
  {
    question: 'How can I contact NextSofthr?',
    answer: 'Visitors can contact the NextSofthr team directly through our online contact form, by telephone at +234 915 848 2622, or via email at contact@nextsofthr.org. For urgent account support, existing clients can also access their in-app concierge support desk.',
  },
  {
    question: 'Can I request a product demo?',
    answer: 'Yes, absolutely! You can click "Book a Demo" anywhere on this page to schedule a guided, 30-minute demonstration tailored specifically to your company size, multi-country payroll requirements, and operational workflows.',
  },
  {
    question: 'Does NextSofthr support small businesses?',
    answer: 'Yes. NextSofthr is engineered with flexible modular pricing and intuitive onboarding for micro and small businesses (1–50 employees), while seamlessly scaling to mid-sized firms and enterprises with tens of thousands of staff across distributed offices.',
  },
  {
    question: 'Can NextSofthr support businesses across Africa?',
    answer: 'Yes. NextSofthr is purpose-built with deep African statutory tax compliance, multi-currency processing (NGN, KES, GHS, ZAR, RWF, USD, GBP, etc.), localized pension regulations, and banking rails, while fully supporting global international subsidiaries and remote staff.',
  },
  {
    question: 'Do you offer enterprise solutions?',
    answer: 'Yes. For large conglomerates, government entities, and multinational enterprises, our Enterprise Solutions team provides dedicated account managers, custom ERP/SAP/Oracle integrations, custom SLA agreements, role-based audit logging, and private cloud deployment options.',
  },
  {
    question: 'Can I get help choosing the right solution?',
    answer: 'Certainly. You can speak with our human HR technology specialists through this page, or use our interactive NextSofthr AI Assistant right on this screen to instantly pinpoint the optimal modules for your workforce challenges.',
  },
  {
    question: 'How quickly will someone respond?',
    answer: 'Our dedicated advisory and customer success team reviews inquiries in real-time. Inquiries submitted via this portal typically receive a personal response within 2 to 4 business hours during standard operational windows.',
  },
];

export const AI_QUICK_OPTIONS = [
  {
    id: 'employees',
    label: 'Manage Employees',
    category: 'Employee Management' as EnquiryType,
    reply: "NextSofthr centralizes your entire employee database: digital employee files, automated onboarding checklists, document storage, and self-service profile updates so your HR team saves 15+ hours weekly.",
  },
  {
    id: 'payroll',
    label: 'Run Payroll',
    category: 'Payroll' as EnquiryType,
    reply: "Our 1-click payroll engine computes gross-to-net calculations, statutory deductions (PAYE, Pension, NHF, NSITF, NSSF, NHIF), generates automated payslips, and direct-credits bank accounts in minutes with 100% compliance.",
  },
  {
    id: 'attendance',
    label: 'Track Attendance',
    category: 'Time & Attendance' as EnquiryType,
    reply: "Eliminate attendance ghosting with GPS geo-fenced mobile clock-in, facial biometric device integrations, shift rosters, and instant sync into monthly payroll deductions.",
  },
  {
    id: 'leave',
    label: 'Manage Leave',
    category: 'Leave Management' as EnquiryType,
    reply: "Automate leave applications, multi-tier manager approvals, rollover balances, and public holiday calendars tailored to each country where your team operates.",
  },
  {
    id: 'recruit',
    label: 'Recruit Employees',
    category: 'Recruitment' as EnquiryType,
    reply: "From job postings to applicant tracking, resume parsing, interview scheduling, and 1-click candidate-to-employee conversion upon offer acceptance.",
  },
  {
    id: 'hr_ops',
    label: 'Improve HR Operations',
    category: 'HR Management' as EnquiryType,
    reply: "Digitize HR policies, performance appraisals (360-degree reviews, OKRs/KPIs), disciplinary management, asset tracking, and analytics dashboards in one unified system.",
  },
  {
    id: 'business_proc',
    label: 'Manage Business Processes',
    category: 'Business Management' as EnquiryType,
    reply: "Beyond HR, orchestrate expense claims, petty cash disbursements, procurement requests, and document digital signatures across your departments.",
  },
  {
    id: 'sales',
    label: 'Talk to Sales',
    category: 'Enterprise Solutions' as EnquiryType,
    reply: "Our senior solutions architects are ready to evaluate your workforce structure, map out software savings, and provide custom pricing. Let's get you connected immediately!",
  },
];
