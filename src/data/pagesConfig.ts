export interface PageMeta {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Core' | 'Company' | 'Solutions' | 'Partners' | 'Resources' | 'Support' | 'Portal' | 'Legal';
  path: string;
  aliases: string[];
  badge?: string;
  description: string;
  iconName: string;
}

export const PAGES_CONFIG: PageMeta[] = [
  {
    id: 'homepage',
    slug: 'homepage',
    title: 'Homepage',
    subtitle: 'Global HR, Payroll & Business Ecosystem',
    category: 'Core',
    path: '/',
    aliases: ['/homepage', '/home'],
    badge: 'Main',
    description: 'NextSoftHR all-in-one platform showcase featuring Core HR, Payroll, ATS, AI Assistant & Business Ops.',
    iconName: 'Home'
  },
  {
    id: 'about-us',
    slug: 'about-us',
    title: 'About Us (Overview)',
    subtitle: 'Our Story, Mission, Values & African Roots',
    category: 'Company',
    path: '/about-us',
    aliases: ['/about'],
    badge: 'Flagship',
    description: 'Meet the team and mission behind NextSoftHR, built for Africa and scaling worldwide.',
    iconName: 'Building2'
  },
  {
    id: 'about-us-2',
    slug: 'about-us-2',
    title: 'About Us (Enterprise)',
    subtitle: 'Platform Architecture & Enterprise Culture',
    category: 'Company',
    path: '/about-us-2',
    aliases: ['/company'],
    badge: 'Enterprise',
    description: 'Deep dive into company values, technology stack, and leadership vision.',
    iconName: 'Users'
  },
  {
    id: 'services',
    slug: 'services',
    title: 'Services & Operations',
    subtitle: 'HR, Payroll, Tax Compliance & Advisory',
    category: 'Solutions',
    path: '/services',
    aliases: ['/solutions'],
    badge: 'Solutions',
    description: 'Enterprise business management services, automated tax filings, compliance & operational consulting.',
    iconName: 'Briefcase'
  },
  {
    id: 'pricing',
    slug: 'pricing',
    title: 'Pricing & Plans',
    subtitle: 'Interactive Tiered Calculator & Regional Currencies',
    category: 'Solutions',
    path: '/pricing',
    aliases: ['/plans', '/cost'],
    badge: 'Transparent',
    description: 'Transparent pricing plans for Startups, Growth, and Enterprise with live currency toggle.',
    iconName: 'CreditCard'
  },
  {
    id: 'outsourcing',
    slug: 'outsourcing',
    title: 'Managed Outsourcing',
    subtitle: 'Smarter HR & Payroll Outsourcing Ecosystem',
    category: 'Solutions',
    path: '/outsourcing',
    aliases: ['/bpo'],
    badge: 'Managed BPO',
    description: 'Full-service HR business process outsourcing, dedicated HR managers & payroll specialists.',
    iconName: 'Globe2'
  },
  {
    id: 'training',
    slug: 'training',
    title: 'Training Academy',
    subtitle: 'Master HR, Payroll, Compliance & Certifications',
    category: 'Solutions',
    path: '/training',
    aliases: ['/academy', '/courses'],
    badge: 'Academy',
    description: 'Accredited courses, interactive career roadmaps, corporate bundles, and verifiable certificates.',
    iconName: 'GraduationCap'
  },
  {
    id: 'partners',
    slug: 'partners',
    title: 'Channel Partner Program',
    subtitle: 'Earn Recurring Revenue as an Official Partner',
    category: 'Partners',
    path: '/partners',
    aliases: ['/partner-program'],
    badge: 'Revenue Share',
    description: 'Join the NextSoftHR global partner network for resellers, consultants, and implementation firms.',
    iconName: 'Handshake'
  },
  {
    id: 'partner-registry',
    slug: 'partner-registry',
    title: 'Partner Registry & Directory',
    subtitle: 'Verified Global Partner & Consultant Directory',
    category: 'Partners',
    path: '/partner-registry',
    aliases: ['/directory'],
    badge: 'Verified',
    description: 'Search and connect with accredited NextSoftHR implementation partners worldwide.',
    iconName: 'BookOpenCheck'
  },
  {
    id: 'partner-commission-1',
    slug: 'partner-commission-1',
    title: 'Commission Schedule 1',
    subtitle: 'Partner Revenue Share & Commission Tier Matrix',
    category: 'Partners',
    path: '/partner-commission-1',
    aliases: ['/commission-schedule'],
    badge: 'Tiers',
    description: 'Transparent commission tiers, recurring revenue models, and payout timelines.',
    iconName: 'Percent'
  },
  {
    id: 'partner-commission-2',
    slug: 'partner-commission-2',
    title: 'Commission Share Hub 2',
    subtitle: 'Interactive Earnings Calculator & Bonus Schedule',
    category: 'Partners',
    path: '/partner-commission-2',
    aliases: ['/commission-hub'],
    badge: 'Calculator',
    description: 'Simulate earnings, performance milestones, and volume-based reseller bonuses.',
    iconName: 'TrendingUp'
  },
  {
    id: 'partners-agreement',
    slug: 'partners-agreement',
    title: 'Partner Legal Agreement',
    subtitle: 'Distributor, Reseller & Associate Legal Terms',
    category: 'Partners',
    path: '/partners-agreement',
    aliases: ['/partner-terms'],
    badge: 'Contract',
    description: 'Official terms and binding agreement for channel partners, distributors, and agents.',
    iconName: 'FileCheck'
  },
  {
    id: 'blog',
    slug: 'blog',
    title: 'Blog & HR Insights',
    subtitle: 'Thought Leadership, Labor Law & People Ops Trends',
    category: 'Resources',
    path: '/blog',
    aliases: ['/news', '/articles'],
    badge: 'Editorial',
    description: 'Actionable guides, labor regulations, tax compliance tips, and future of work trends.',
    iconName: 'Newspaper'
  },
  {
    id: 'contact',
    slug: 'contact',
    title: 'Contact Us & Sales',
    subtitle: 'Book Live Demos, Get Support & Reach Regional Hubs',
    category: 'Support',
    path: '/contact',
    aliases: ['/support', '/help'],
    badge: '24/7 Support',
    description: 'Connect with our regional offices across Lagos, Nairobi, Johannesburg, London, and San Francisco.',
    iconName: 'Mail'
  },
  {
    id: 'faq',
    slug: 'faq',
    title: 'FAQ & Help Center',
    subtitle: 'Comprehensive Questions, Answers & Knowledge Base',
    category: 'Support',
    path: '/faq',
    aliases: ['/help-center', '/questions'],
    badge: 'Knowledge Base',
    description: 'Instant answers on onboarding, security, integrations, payroll calculation, and employee self-service.',
    iconName: 'HelpCircle'
  },
  {
    id: 'sign-in',
    slug: 'sign-in',
    title: 'Enterprise Sign In',
    subtitle: 'Secure Multi-Tenant Authentication & Portal Access',
    category: 'Portal',
    path: '/sign-in',
    aliases: ['/login', '/auth'],
    badge: 'Portal',
    description: 'Access employee self-service, admin dashboard, biometric clocking, and payroll manager.',
    iconName: 'LogIn'
  },
  {
    id: 'privacy-policy',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    subtitle: 'Global Data Protection, NDPR & GDPR Compliance',
    category: 'Legal',
    path: '/privacy-policy',
    aliases: ['/privacy'],
    badge: 'Compliance',
    description: 'How NextSoftHR handles, encrypts, and protects enterprise employee data and financial records.',
    iconName: 'Shield'
  },
  {
    id: 'refund-policy',
    slug: 'refund-policy',
    title: 'Refund & Cancellation',
    subtitle: 'Subscription Terms, Billing & Refund Conditions',
    category: 'Legal',
    path: '/refund-policy',
    aliases: ['/refunds'],
    badge: 'Billing',
    description: 'Clear subscription cancellation terms, refund eligibility windows, and payment dispute procedures.',
    iconName: 'Receipt'
  },
  {
    id: 'terms-conditions',
    slug: 'terms-conditions',
    title: 'Terms & Conditions',
    subtitle: 'Master SaaS Service Agreement & Usage Terms',
    category: 'Legal',
    path: '/terms-conditions',
    aliases: ['/terms'],
    badge: 'SaaS Agreement',
    description: 'Master service agreement governing subscription licensing, uptime SLAs, and liability terms.',
    iconName: 'Scale'
  }
];

export const CATEGORIES = [
  'All',
  'Core',
  'Company',
  'Solutions',
  'Partners',
  'Resources',
  'Support',
  'Portal',
  'Legal'
] as const;
