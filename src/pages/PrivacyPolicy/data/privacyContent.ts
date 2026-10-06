import { DataCategory, RetentionRule, SecurityPillar, TocItem } from '../types/privacy';

export const TOC_ITEMS: TocItem[] = [
  { id: 'introduction', number: '01', title: 'Introduction' },
  { id: 'information-we-collect', number: '02', title: 'Information We Collect' },
  { id: 'how-we-use-information', number: '03', title: 'How We Use Your Information' },
  { id: 'cookies-tracking', number: '04', title: 'Cookies & Tracking Technologies' },
  { id: 'data-sharing', number: '05', title: 'Data Sharing & Disclosure' },
  { id: 'data-storage-security', number: '06', title: 'Data Storage & Security' },
  { id: 'data-retention', number: '07', title: 'Data Retention' },
  { id: 'your-privacy-rights', number: '08', title: 'Your Privacy Rights' },
  { id: 'employee-customer-data', number: '09', title: 'Employee & Customer Data' },
  { id: 'international-transfers', number: '10', title: 'International Data Transfers' },
  { id: 'third-party-services', number: '11', title: 'Third-Party Services' },
  { id: 'childrens-privacy', number: '12', title: "Children's Privacy" },
  { id: 'marketing-communications', number: '13', title: 'Marketing Communications' },
  { id: 'ai-automated-processing', number: '14', title: 'AI & Automated Processing' },
  { id: 'changes-to-policy', number: '15', title: 'Changes to This Policy' },
  { id: 'contact-us', number: '16', title: 'Contact Us' },
];

export const INITIAL_DATA_CATEGORIES: DataCategory[] = [
  {
    title: 'Account Information',
    description: 'Personal identifying credentials and contact details supplied during onboarding or account administration.',
    items: [
      'Full legal name and preferred name',
      'Professional and direct email address',
      'Contact telephone number (mobile and office)',
      'Registered company name and legal entity identifier',
      'Job title, organizational role, and permission tier',
      'Encrypted login credentials and authentication tokens',
      'System language, timezone, and interface preferences'
    ],
    icon: 'UserCheck'
  },
  {
    title: 'Business & Workforce Information',
    description: 'Organizational data and employee records uploaded or managed by customer administrators within the platform.',
    items: [
      'Company structural details, subsidiaries, and physical office locations',
      'Department structures, reporting hierarchies, and cost centers',
      'Employee personal profiles, employment contracts, and tax identifiers',
      'Payroll calculations, salary structures, deductions, and banking details',
      'Time, shift, clock-in/out timestamps, biometric device sync logs, and attendance summaries',
      'Leave balances, paid time off (PTO) requests, and medical leave documentation',
      'Shift schedules, rotas, and task assignments'
    ],
    icon: 'Building2'
  },
  {
    title: 'Technical & Device Information',
    description: 'Automated telemetry generated when accessing NextSoftHR web platforms, mobile interfaces, or API endpoints.',
    items: [
      'Internet Protocol (IP) address and approximate geolocation (city/country level)',
      'Browser family, version, and language configuration',
      'Operating system, device hardware model, and screen resolution',
      'Session timestamps, login frequency, and feature navigation paths',
      'Diagnostic telemetry, HTTP error codes, and performance metrics',
      'Session tokens, secure authentication cookies, and CSRF protection headers'
    ],
    icon: 'Server'
  },
  {
    title: 'Communication & Support Information',
    description: 'Inbound queries, customer service records, and feedback provided across support interactions.',
    items: [
      'Customer support tickets, chat transcripts, and recorded correspondence',
      'Demo request notes, inquiry details, and business requirement briefs',
      'Survey responses, product feedback, and feature enhancement requests',
      'Billing, invoicing, and subscription inquiry exchanges'
    ],
    icon: 'MessageSquareText'
  }
];

export const INITIAL_RETENTION_RULES: RetentionRule[] = [
  {
    category: 'Workforce & Employment Records',
    purpose: 'Facilitating active employer-employee relationships and human resources administration.',
    retentionPeriod: 'Duration of customer contract + 7 years (or statutory labor duration)',
    statutoryBasis: 'Labor & Employment Regulations'
  },
  {
    category: 'Payroll & Statutory Tax Filings',
    purpose: 'Payroll disbursement auditing, tax withholding compliance, and national pension reporting.',
    retentionPeriod: '6 to 10 years following the relevant financial year end',
    statutoryBasis: 'Financial Reporting & Tax Compliance'
  },
  {
    category: 'Authentication & Audit Logs',
    purpose: 'System security monitoring, fraud prevention, forensic analysis, and platform integrity.',
    retentionPeriod: 'Rolling 12 to 24 months from timestamp generation',
    statutoryBasis: 'Legitimate Cybersecurity Interest'
  },
  {
    category: 'Customer Support & Correspondence',
    purpose: 'Resolving disputes, documenting technical assistance, and training quality assurance.',
    retentionPeriod: '3 years following ticket resolution',
    statutoryBasis: 'Contractual Performance & Support'
  },
  {
    category: 'Marketing Consent & Lead Records',
    purpose: 'Managing communication preferences and delivering requested product announcements.',
    retentionPeriod: 'Until consent is withdrawn / opt-out request received',
    statutoryBasis: 'Explicit User Consent'
  }
];

export const SECURITY_PILLARS: SecurityPillar[] = [
  {
    title: 'Secure Infrastructure',
    summary: 'Hardened cloud environments hosted within ISO-certified Tier-III/IV data facilities.',
    details: [
      'Redundant multi-zone cloud architecture with zero single points of failure',
      'DDoS mitigation and intelligent Web Application Firewall (WAF) filtering',
      'Isolated VPC networks with zero public database exposure'
    ]
  },
  {
    title: 'Access Controls',
    summary: 'Strict principle of least privilege enforced across internal and client tiers.',
    details: [
      'Granular Role-Based Access Control (RBAC) across HR, Payroll, and Admin tiers',
      'Mandatory Multi-Factor Authentication (MFA/2FA) for privileged roles',
      'Automated session timeouts and single-sign-on (SSO) SAML/OIDC support'
    ]
  },
  {
    title: 'Data Encryption',
    summary: 'Strong cryptographic standards protecting data across rest and transit.',
    details: [
      'End-to-end TLS 1.3 encryption for all data in transit across public networks',
      'AES-256 bit hardware-backed encryption for database records and backup archives',
      'Cryptographic salting and secure key management rotation cycles'
    ]
  },
  {
    title: 'Monitoring & Audit',
    summary: 'Continuous visibility, anomaly detection, and immutable administrative audit logs.',
    details: [
      '24/7 automated telemetry monitoring for unauthorized login anomalies',
      'Immutable audit trails recording critical payroll and salary change events',
      'Routine independent vulnerability testing and code security assessments'
    ]
  },
  {
    title: 'Backup & Recovery',
    summary: 'Resilient data restoration pipelines ensuring business continuity.',
    details: [
      'Automated daily encrypted snapshots replicated across geodiverse regions',
      'RPO (Recovery Point Objective) and RTO (Recovery Time Objective) targets tested quarterly',
      'Comprehensive disaster recovery drills and immutable write-once backups'
    ]
  }
];

export const VERSION_HISTORY = [
  {
    version: 'Version 2.4 (Current)',
    date: 'September 24, 2026',
    notes: 'Refined AI & Automated Processing governance standards, expanded African regional data transfer disclosures, and modernized cookie preference taxonomy.'
  },
  {
    version: 'Version 2.3',
    date: 'January 15, 2026',
    notes: 'Enhanced Employee Self-Service (ESS) and biometric time-tracking privacy provisions.'
  },
  {
    version: 'Version 2.0',
    date: 'June 10, 2025',
    notes: 'Complete restructuring for NextSoftHR multi-tenant global business platform and payroll outsourcing operations.'
  }
];
