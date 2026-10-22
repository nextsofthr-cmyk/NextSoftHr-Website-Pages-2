export interface CountryData {
  id: string;
  name: string;
  code: string;
  region: "Africa" | "International";
  flag: string;
  capital: string;
  partnerCount: number;
  availableServices: string[];
  description: string;
  keyCities: string[];
  mapCoords: { x: number; y: number }; // Relative percentage coordinates on world map
}

export const COUNTRIES_DATA: CountryData[] = [
  {
    id: "nigeria",
    name: "Nigeria",
    code: "NG",
    region: "Africa",
    flag: "🇳🇬",
    capital: "Abuja",
    partnerCount: 14,
    availableServices: [
      "HR Implementation",
      "Payroll (PAYE, Pension, NSITF)",
      "Shift & Attendance Scheduling",
      "Accounting & Finance",
      "System Integration",
      "HR Consulting & Advisory",
      "Payroll Outsourcing",
      "Data Migration & Onboarding",
      "HR Managed Services",
      "Compliance & Statutory Audits",
      "Company Incorporation Support",
      "Annual Tax Returns & Filing",
      "Training & Team Development",
      "Custom Workflow Development",
      "Dedicated Technical Support",
      "Business Process Re-engineering"
    ],
    description:
      "NextSofthr’s largest market hub with deep partner coverage in Lagos, Abuja, Port Harcourt, and Ibadan.",
    keyCities: ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano"],
    mapCoords: { x: 48.5, y: 55.2 },
  },
  {
    id: "kenya",
    name: "Kenya",
    code: "KE",
    region: "Africa",
    flag: "🇰🇪",
    capital: "Nairobi",
    partnerCount: 9,
    availableServices: [
      "KRA iTax Payroll",
      "NSSF/NHIF Compliance",
      "AgriTech Scheduling",
      "Employee Self-Service",
    ],
    description:
      "East African regional innovation center with verified partners in Nairobi, Mombasa, and Kisumu.",
    keyCities: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
    mapCoords: { x: 58.2, y: 58.5 },
  },
  {
    id: "ghana",
    name: "Ghana",
    code: "GH",
    region: "Africa",
    flag: "🇬🇭",
    capital: "Accra",
    partnerCount: 7,
    availableServices: [
      "GRA Tax Filing",
      "SSNIT Tier 1 & 2",
      "Performance Management",
      "Recruitment Outsourcing",
    ],
    description:
      "Growing West African tech hub with partners supporting financial institutions, education, and retail.",
    keyCities: ["Accra", "Kumasi", "Takoradi", "Tema"],
    mapCoords: { x: 45.8, y: 55.0 },
  },
  {
    id: "south-africa",
    name: "South Africa",
    code: "ZA",
    region: "Africa",
    flag: "🇿🇦",
    capital: "Pretoria / Cape Town",
    partnerCount: 11,
    availableServices: [
      "SARS PAYE & UIF",
      "BCEA Compliance",
      "Multi-Company Payroll",
      "Enterprise Integration",
    ],
    description:
      "Southern Africa powerhouse with top tier Strategic and Premium implementation partners in Johannesburg and Cape Town.",
    keyCities: ["Johannesburg", "Cape Town", "Durban", "Pretoria"],
    mapCoords: { x: 53.5, y: 78.5 },
  },
  {
    id: "rwanda",
    name: "Rwanda",
    code: "RW",
    region: "Africa",
    flag: "🇷🇼",
    capital: "Kigali",
    partnerCount: 5,
    availableServices: [
      "RRA Tax Filing",
      "RSSB Social Security",
      "Cloud ERP Integration",
      "Healthcare Staff Rostering",
    ],
    description:
      "Central African digital government & tech leader with specialized NextSofthr integration partners.",
    keyCities: ["Kigali", "Musanze", "Huye"],
    mapCoords: { x: 54.8, y: 60.5 },
  },
  {
    id: "uganda",
    name: "Uganda",
    code: "UG",
    region: "Africa",
    flag: "🇺🇬",
    capital: "Kampala",
    partnerCount: 4,
    availableServices: [
      "URA Tax Payroll",
      "NSSF Uganda",
      "NGO Field Timesheets",
      "Hospitality Shift Management",
    ],
    description:
      "Expert partners supporting agribusinesses, NGOs, and education networks across Uganda.",
    keyCities: ["Kampala", "Entebbe", "Jinja", "Mbarara"],
    mapCoords: { x: 56.5, y: 57.5 },
  },
  {
    id: "tanzania",
    name: "Tanzania",
    code: "TZ",
    region: "Africa",
    flag: "🇹🇿",
    capital: "Dodoma / Dar es Salaam",
    partnerCount: 4,
    availableServices: [
      "TRA Payroll Compliance",
      "NSSF/WCF Processing",
      "Logistics Rostering",
      "Swahili Portal",
    ],
    description:
      "Serving East African transport, logistics, tourism, and mining ventures.",
    keyCities: ["Dar es Salaam", "Arusha", "Mwanza", "Zanzibar"],
    mapCoords: { x: 57.5, y: 63.5 },
  },
  {
    id: "egypt",
    name: "Egypt",
    code: "EG",
    region: "Africa",
    flag: "🇪🇬",
    capital: "Cairo",
    partnerCount: 6,
    availableServices: [
      "Arabic Localization",
      "Social Insurance Law",
      "Hospitality Rotations",
      "Corporate HCM",
    ],
    description:
      "MENA gateway with certified Arabic/English bilingual partners based in Cairo and Alexandria.",
    keyCities: ["Cairo", "Alexandria", "Giza", "Sharm El Sheikh"],
    mapCoords: { x: 55.0, y: 41.5 },
  },
  {
    id: "morocco",
    name: "Morocco",
    code: "MA",
    region: "Africa",
    flag: "🇲🇦",
    capital: "Rabat",
    partnerCount: 5,
    availableServices: [
      "CNSS & CIMR Filings",
      "Call Center Rostering",
      "ERP Connector Sync",
      "French Language HR",
    ],
    description:
      "North African manufacturing and offshoring hub with certified implementation specialists.",
    keyCities: ["Casablanca", "Rabat", "Tangier", "Marrakech"],
    mapCoords: { x: 44.0, y: 39.5 },
  },
  {
    id: "senegal",
    name: "Senegal",
    code: "SN",
    region: "Africa",
    flag: "🇸🇳",
    capital: "Dakar",
    partnerCount: 4,
    availableServices: [
      "IPRES & CSS Filings",
      "Francophone Payroll",
      "Fintech Onboarding",
      "Bilingual Support",
    ],
    description:
      "Francophone West African center for digital innovation and financial services.",
    keyCities: ["Dakar", "Saint-Louis", "Thiès"],
    mapCoords: { x: 40.5, y: 52.0 },
  },
  {
    id: "cote-divoire",
    name: "Côte d'Ivoire",
    code: "CI",
    region: "Africa",
    flag: "🇨🇮",
    capital: "Yamoussoukro / Abidjan",
    partnerCount: 5,
    availableServices: [
      "OHADA Labor Law",
      "CNPS Payroll",
      "Agri-Cooperative HR",
      "French ERP Integration",
    ],
    description:
      "Economic engine of Francophone West Africa with deep coverage in Abidjan and San-Pédro.",
    keyCities: ["Abidjan", "Bouaké", "San-Pédro"],
    mapCoords: { x: 44.5, y: 56.0 },
  },
  {
    id: "cameroon",
    name: "Cameroon",
    code: "CM",
    region: "Africa",
    flag: "🇨🇲",
    capital: "Yaoundé / Douala",
    partnerCount: 3,
    availableServices: [
      "CEMAC Tax Codes",
      "CNPS Cameroon",
      "Industrial Attendance",
      "Bilingual English/French",
    ],
    description:
      "Central African industrial and maritime hub with certified accounting and tech partners.",
    keyCities: ["Douala", "Yaoundé", "Limbe"],
    mapCoords: { x: 49.5, y: 58.0 },
  },
  {
    id: "uk",
    name: "United Kingdom",
    code: "GB",
    region: "International",
    flag: "🇬🇧",
    capital: "London",
    partnerCount: 8,
    availableServices: [
      "Cross-Border HCM",
      "Expatriate Payroll",
      "UK PAYE Consolidation",
      "GDPR Compliance",
    ],
    description:
      "Connecting multinational headquarters with African subsidiaries and remote contractors.",
    keyCities: ["London", "Manchester", "Birmingham"],
    mapCoords: { x: 46.5, y: 28.5 },
  },
  {
    id: "usa",
    name: "United States",
    code: "US",
    region: "International",
    flag: "🇺🇸",
    capital: "Washington, D.C.",
    partnerCount: 9,
    availableServices: [
      "Remote Workforce Onboarding",
      "Contractor Invoicing",
      "Diaspora Business Scaling",
      "ERP Connectors",
    ],
    description:
      "Supporting US companies scaling technical and commercial teams across Africa.",
    keyCities: ["Atlanta", "New York", "San Francisco", "Houston"],
    mapCoords: { x: 23.5, y: 38.0 },
  },
  {
    id: "canada",
    name: "Canada",
    code: "CA",
    region: "International",
    flag: "🇨🇦",
    capital: "Ottawa",
    partnerCount: 4,
    availableServices: [
      "CRA Alignment",
      "Remote Engineering Team Management",
      "Multi-Currency Payments",
    ],
    description:
      "Partners in Toronto and Calgary helping tech and energy firms expand operations.",
    keyCities: ["Toronto", "Vancouver", "Calgary", "Montreal"],
    mapCoords: { x: 21.5, y: 29.0 },
  },
  {
    id: "uae",
    name: "UAE",
    code: "AE",
    region: "International",
    flag: "🇦🇪",
    capital: "Abu Dhabi / Dubai",
    partnerCount: 6,
    availableServices: [
      "UAE WPS SIF Processing",
      "GCC-Africa Trade Staffing",
      "Free Zone Compliance",
      "Multi-Branch Sync",
    ],
    description:
      "Dubai trade gateway bridging Gulf enterprises with expanding African branches.",
    keyCities: ["Dubai", "Abu Dhabi", "Sharjah"],
    mapCoords: { x: 62.5, y: 44.5 },
  },
  {
    id: "india",
    name: "India",
    code: "IN",
    region: "International",
    flag: "🇮🇳",
    capital: "New Delhi",
    partnerCount: 5,
    availableServices: [
      "SAP/Oracle Connector Sync",
      "Custom Microservices",
      "Enterprise API Automation",
      "Data Migration",
    ],
    description:
      "Enterprise systems engineering and ERP integration partners in Bengaluru and Mumbai.",
    keyCities: ["Bengaluru", "Mumbai", "Hyderabad", "Delhi NCR"],
    mapCoords: { x: 69.5, y: 45.0 },
  },
];

export const SERVICE_CATEGORIES = [
  {
    id: "hr-consulting",
    title: "HR Consulting",
    icon: "Users",
    description:
      "Talent strategy, policy design, grading, and organizational culture.",
  },
  {
    id: "payroll-consulting",
    title: "Payroll Consulting",
    icon: "DollarSign",
    description:
      "Tax structures, pension rules, statutory audits, and payroll health checks.",
  },
  {
    id: "implementation",
    title: "Implementation",
    icon: "CheckCircle2",
    description:
      "End-to-end configuration, tenant onboarding, and company structure setup.",
  },
  {
    id: "accounting",
    title: "Accounting",
    icon: "Calculator",
    description:
      "General ledger mapping, chart of accounts sync, and journal reporting.",
  },
  {
    id: "recruitment",
    title: "Recruitment",
    icon: "UserPlus",
    description:
      "NextSofthr ATS setup, interview scoring pipelines, and job portal integration.",
  },
  {
    id: "hr-outsourcing",
    title: "HR Outsourcing",
    icon: "Briefcase",
    description:
      "Managed HR operations, disciplinary handling, and employee inquiries.",
  },
  {
    id: "payroll-outsourcing",
    title: "Payroll Outsourcing",
    icon: "FileSpreadsheet",
    description:
      "Full monthly payroll computation, payslip distribution, and bank schedules.",
  },
  {
    id: "technology-integration",
    title: "Technology Integration",
    icon: "Cpu",
    description:
      "Biometric time-clocks, turnstiles, SAP, Oracle, NetSuite, and custom APIs.",
  },
  {
    id: "training",
    title: "Training",
    icon: "GraduationCap",
    description:
      "Administrator bootcamps, employee self-service workshops, and manager guides.",
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    icon: "TrendingUp",
    description:
      "Process re-engineering, growth restructuring, and KPI frameworks.",
  },
  {
    id: "system-customization",
    title: "System Customization",
    icon: "Sliders",
    description:
      "Custom formula builders, tailored reports, and custom approval hierarchies.",
  },
  {
    id: "technical-support",
    title: "Technical Support",
    icon: "LifeBuoy",
    description:
      "Dedicated SLA support, tenant maintenance, data backups, and troubleshooting.",
  },
];

export const PARTNER_LEVELS = [
  {
    name: "Registered Partner",
    tag: "Registered",
    badgeColor: "border-slate-300 text-slate-700 bg-slate-100",
    description:
      "For verified businesses and independent practitioners joining the NextSofthr ecosystem.",
    criteria:
      "Business registration verified, fundamental product overview completed.",
    benefits:
      "Directory listing, partner portal access, standard referral commissions.",
  },
  {
    name: "Certified Partner",
    tag: "Certified",
    badgeColor: "border-blue-200 text-blue-800 bg-blue-50",
    description:
      "For partners whose staff have completed rigorous NextSofthr training and technical exams.",
    criteria:
      "At least 2 NextSofthr certified professionals, 5+ verified customer setups.",
    benefits:
      "Co-marketing collateral, tier-2 partner support, demo tenant licenses.",
  },
  {
    name: "Professional Partner",
    tag: "Professional",
    badgeColor: "border-sky-300 text-sky-900 bg-sky-100",
    description:
      "Demonstrated excellence delivering complex HR and payroll implementations and advisory.",
    criteria:
      "4+ certified consultants, 15+ client deployments, high customer satisfaction rating (4.5+).",
    benefits:
      "Direct lead distribution from NextSofthr sales, dedicated partner account manager.",
  },
  {
    name: "Premium Partner",
    tag: "Premium",
    badgeColor: "border-[#c8f526] text-[#0b1b3d] bg-[#c8f526]/30 font-semibold",
    description:
      "High-performing regional consultancies delivering enterprise-grade human capital solutions.",
    criteria:
      "8+ certified specialists, 30+ enterprise implementations, multi-branch experience.",
    benefits:
      "Priority lead routing, joint marketing funds (MDF), executive advisory council seat.",
  },
  {
    name: "Strategic Partner",
    tag: "Strategic",
    badgeColor:
      "border-[#c8f526] text-[#0b1b3d] bg-[#c8f526] font-bold shadow-sm",
    description:
      "Top-tier global organizations delivering large-scale digital transformations and multi-country rollouts.",
    criteria:
      "Cross-border deployment capability, 50+ enterprise rollouts, ISO/security compliance.",
    benefits:
      "Custom product roadmap input, highest commission tiers, dedicated technical architects.",
  },
];
