/**
 * NextSoftHR Terms & Conditions Data Definition
 * Comprehensive legal terms for the NextSoftHR Global Platform
 * Reference website: www.nextsofthr.org
 */

export interface DefinitionItem {
  term: string;
  definition: string;
  category?: string;
}

export interface ModuleItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconName: string;
}

export interface TermSection {
  id: string;
  sectionNumber: string;
  title: string;
  category: 'General' | 'Modules' | 'Commercial' | 'Data & Security' | 'Legal & Compliance';
  summary: string;
  counselFlag?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  definitions?: DefinitionItem[];
  modules?: ModuleItem[];
  highlightBox?: {
    type: 'info' | 'warning' | 'policy' | 'trial';
    title: string;
    text: string;
    actionLabel?: string;
    actionType?: string;
  };
}

export const TERMS_LAST_UPDATED = 'September 27, 2026';
export const TERMS_EFFECTIVE_DATE = 'October 1, 2026';
export const TERMS_VERSION = 'v3.4.2 (Enterprise Edition)';

export const DEFINITIONS_LIST: DefinitionItem[] = [
  {
    term: 'NextSoftHR',
    definition: 'Refers to NextSoftHR Ltd., its global parent companies, affiliates, subsidiaries, and licensors operating the SaaS platform accessible at www.nextsofthr.org.',
    category: 'Entity'
  },
  {
    term: 'Platform',
    definition: 'The cloud-based software-as-a-service suite, web applications, mobile interfaces, APIs, developer tools, and underlying software infrastructure provided by NextSoftHR.',
    category: 'Technology'
  },
  {
    term: 'Customer',
    definition: 'The commercial entity, business organization, institution, or sole proprietor that registers for an account, enters into an Order Form or Subscription, and authorizes Users.',
    category: 'Party'
  },
  {
    term: 'User',
    definition: 'Any natural individual authorized by a Customer to log in and access the Platform, including Administrators, Managers, and Employees.',
    category: 'Party'
  },
  {
    term: 'Employee',
    definition: 'An individual personnel member, contractor, worker, or candidate whose employment records, timesheets, payroll, or profile data are recorded or managed within the Platform.',
    category: 'Personnel'
  },
  {
    term: 'Administrator',
    definition: 'A designated User with root or elevated organizational permissions authorized by the Customer to configure settings, assign roles, manage subscriptions, and access all operational data.',
    category: 'Permissions'
  },
  {
    term: 'Subscription',
    definition: 'The commercial access entitlement granted to Customer pursuant to an Order Form or online plan tier (monthly or annual) specifying authorized modules, user seat limits, and fee schedules.',
    category: 'Commercial'
  },
  {
    term: 'Account',
    definition: 'The unique organizational tenancy, credentials, and configuration profiles generated to grant Customer and authorized Users access to the Platform.',
    category: 'Security'
  },
  {
    term: 'Services',
    definition: 'All software features, hosting, automated payroll calculation engines, self-service portals, customer support, and onboarding services rendered by NextSoftHR.',
    category: 'Commercial'
  },
  {
    term: 'Content',
    definition: 'All data, text, documents, timesheets, candidate CVs, tax parameters, and employee information entered, stored, or processed via Customer accounts.',
    category: 'Data'
  },
  {
    term: 'Personal Data',
    definition: 'Any information relating to an identified or identifiable natural person processed through the Platform in accordance with applicable global data protection laws.',
    category: 'Privacy'
  },
  {
    term: 'Third-Party Services',
    definition: 'External software products, payment gateways, banking APIs, electronic tax filing portals, identity providers (IdPs), and webhooks operated by independent third parties.',
    category: 'Integrations'
  }
];

export const PLATFORM_MODULES: ModuleItem[] = [
  {
    id: 'hr-mgmt',
    title: 'HR Management',
    description: 'Centralized employee digital records, customizable organizational charts, onboarding workflows, document e-signing, and end-to-end lifecycle management.',
    features: ['Employee Master Records', 'Digital Document Repository', 'Lifecycle Workflows', 'Department Hierarchy'],
    iconName: 'Users'
  },
  {
    id: 'time-att',
    title: 'Time & Attendance',
    description: 'Real-time punch clocks, biometrics integration, geofenced mobile check-ins, automated overtime calculations, and shift scheduling.',
    features: ['Geofenced Clock-in', 'Overtime Rule Engine', 'Shift Rosters', 'Timesheet Sign-offs'],
    iconName: 'Clock'
  },
  {
    id: 'leave-mgmt',
    title: 'Leave Management',
    description: 'Statutory and custom leave policies, balance accruals, multi-level manager approvals, public holiday calendars, and absence analytics.',
    features: ['Automated Accruals', 'Multi-tier Approval Chains', 'Holiday Localization', 'Absence Insights'],
    iconName: 'CalendarCheck'
  },
  {
    id: 'payroll-engine',
    title: 'Payroll Services',
    description: 'Gross-to-net calculation engine, custom salary structures, recurring allowances, statutory tax deduction templates, and multi-currency payouts.',
    features: ['Automated Salary Computations', 'Custom Allowances & Deductions', 'Bank Direct Export', 'Digital Pay Slips'],
    iconName: 'Banknote'
  },
  {
    id: 'recruitment',
    title: 'Talent Acquisition',
    description: 'Applicant tracking system (ATS), job posting management, candidate pipeline Kanban boards, automated interview scheduling, and offer letter generation.',
    features: ['Visual Candidate Pipeline', 'Collaborative Scorecards', 'Offer Letter E-Sign', 'Career Portal Integration'],
    iconName: 'UserCheck'
  },
  {
    id: 'crm',
    title: 'CRM & Relationship Management',
    description: 'Client relationship management, corporate client contract tracking, billing contacts, and commercial interaction timelines.',
    features: ['Client Organization Profiles', 'Account Executive Assignment', 'Contract Renewal Trackers', 'Activity Audit'],
    iconName: 'Building2'
  },
  {
    id: 'finance',
    title: 'Finance & Expense Operations',
    description: 'Employee expense claims, digital receipt scanning, departmental budget allocation, and integration with general ledger accounting systems.',
    features: ['Receipt OCR & Multi-Currency', 'Disbursement Approvals', 'Cost Center Tagging', 'Accounting Export'],
    iconName: 'PieChart'
  },
  {
    id: 'projects',
    title: 'Project & Task Management',
    description: 'Project milestone tracking, task assignments, employee billable hours recording, resource capacity planning, and deliverable deadlining.',
    features: ['Milestone Timelines', 'Billable Time Association', 'Workload Balancing', 'Cross-team Collaboration'],
    iconName: 'Briefcase'
  },
  {
    id: 'ess',
    title: 'Employee Self-Service (ESS)',
    description: 'Empowers employees with a dedicated web and mobile portal to view payslips, request time-off, update personal details, and clock attendance.',
    features: ['Instant Payslip Downloads', 'Time-off Self Submission', 'Tax Declaration Forms', 'Mobile App Access'],
    iconName: 'Smartphone'
  },
  {
    id: 'mss',
    title: 'Manager Self-Service (MSS)',
    description: 'Gives team leaders dedicated dashboards for 1-click approvals, shift adjustments, direct report reviews, and team absence visibility.',
    features: ['One-click Approvals', 'Team Calendar Overlay', 'Performance Appraisals', 'Overtime Review'],
    iconName: 'ShieldCheck'
  },
  {
    id: 'outsourcing',
    title: 'HR & Payroll Outsourcing',
    description: 'Specialized managed services where certified NextSoftHR partners or specialists assist in compliance processing and payroll execution.',
    features: ['Dedicated Account Specialist', 'Statutory Filing Assistance', 'Year-end Tax Summaries', 'Service Level Assurances'],
    iconName: 'Workflow'
  }
];

export const TERMS_SECTIONS: TermSection[] = [
  {
    id: 'introduction',
    sectionNumber: '1.0',
    title: 'Introduction',
    category: 'General',
    summary: 'NextSoftHR provides global cloud-based HR, payroll, and business management software. These Terms constitute a legally binding agreement between NextSoftHR and the Customer.',
    paragraphs: [
      'NextSoftHR ("NextSoftHR", "we", "us", or "our") provides an enterprise-grade, cloud-based Human Resources (HR), Payroll, and Business Management platform accessible at www.nextsofthr.org and associated subdomains, mobile applications, APIs, and software components (collectively, the "Platform" or "Services").',
      'The Platform is purpose-built to empower micro, small, medium, and large global organizations to streamline workforce administration, statutory and custom payroll, time tracking, employee leaves, candidate recruitment, corporate CRM, finance workflows, and project management.',
      'These Terms & Conditions ("Terms", "Agreement") govern your access to and use of NextSoftHR. By registering for an account, accessing the Platform, executing an Order Form, or permitting any authorized User to utilize the Services, you confirm that you have read, understood, and agreed to be legally bound by these Terms.'
    ],
    bulletPoints: [
      'Applies to all micro, small, medium, and large corporate accounts worldwide.',
      'Governs all software editions, mobile apps, customer portals, and integration endpoints.',
      'Requires full acceptance prior to accessing or provisioning organizational tenancies.'
    ]
  },
  {
    id: 'acceptance-of-terms',
    sectionNumber: '2.0',
    title: 'Acceptance of Terms',
    category: 'General',
    summary: 'By signing up, clicking to accept, or accessing the Services, you create a binding contract. If you represent an entity, you confirm you possess full authority to bind that entity.',
    paragraphs: [
      'By clicking an "I Agree", "Sign Up", "Activate Account" button, signing an enterprise Master Services Agreement or Order Form referencing these Terms, or by otherwise using or browsing the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety.',
      'If you are entering into these Terms on behalf of a company, partnership, government body, or other legal entity, you represent and warrant that you possess the requisite legal authority to bind such entity and its affiliates to these Terms. In that event, the terms "Customer", "you", and "your" refer to that entity.',
      'If you do not agree with each and every provision contained herein, or if you lack the necessary legal authority to bind your organization, you must not accept these Terms and must immediately refrain from accessing, configuring, or using the Platform.'
    ],
    highlightBox: {
      type: 'warning',
      title: 'Mandatory Review Notice',
      text: 'Please review these Terms carefully before completing your account registration or processing any employee payroll. Continued use of the NextSoftHR Platform constitutes ongoing acceptance.'
    }
  },
  {
    id: 'definitions',
    sectionNumber: '3.0',
    title: 'Definitions',
    category: 'General',
    summary: 'Core legal terminology defined throughout the agreement to ensure unambiguous clarity across global jurisdictions.',
    paragraphs: [
      'Throughout this Agreement, capitalized terms have the specific meanings set forth below or in the section where they first appear in bold quotation marks. These definitions apply equally to singular and plural forms.'
    ],
    definitions: DEFINITIONS_LIST
  },
  {
    id: 'eligibility',
    sectionNumber: '4.0',
    title: 'Eligibility',
    category: 'General',
    summary: 'The Platform is intended strictly for commercial and organizational use by individuals aged 18 and older authorized by legally registered entities.',
    paragraphs: [
      'The Platform is designed strictly for business, institutional, and commercial use. It is not offered to consumers for individual, personal, household, or family recreation.',
      'To be eligible to subscribe to and use the Platform, you must be at least eighteen (18) years of age (or the age of legal majority in your country of incorporation) and fully competent to enter into the terms, conditions, obligations, representations, and warranties set forth herein.',
      'You warrant that your organization is legally organized, validly existing, and in good standing under the laws of its jurisdiction of incorporation, and is not located in any country subject to comprehensive international trade sanctions or embargoes.'
    ]
  },
  {
    id: 'account-registration',
    sectionNumber: '5.0',
    title: 'Account Registration & Security',
    category: 'General',
    summary: 'Customers must supply accurate organizational data, enforce secure credential management, and are responsible for all actions taken under authorized accounts.',
    paragraphs: [
      'To access NextSoftHR, Customer must register an organizational Account. Customer agrees to provide true, accurate, current, and complete information during registration, and to promptly update such information to maintain its accuracy.',
      'Administrator Responsibilities: Customer’s designated Administrator possesses elevated permissions to invite Users, provision module access, view employee personal and financial records, and configure company policies. Customer is strictly responsible for designating authorized Administrators and monitoring their activities.',
      'Credential Protection: Each User must maintain the confidentiality of their credentials (usernames, passwords, and multi-factor authentication tokens). Shared logins or generic group accounts are strictly prohibited. Customer must immediately notify NextSoftHR at security@nextsofthr.org upon discovering any unauthorized access, compromised credentials, or breach of security.'
    ],
    bulletPoints: [
      'Every User must possess a unique, individual login email and secure passphrase.',
      'Enabling Multi-Factor Authentication (MFA) is strongly recommended across all Administrator roles.',
      'Customer remains liable for all transactions and activities occurring under its registered accounts.'
    ]
  },
  {
    id: 'user-responsibilities',
    sectionNumber: '6.0',
    title: 'User Responsibilities & Acceptable Use',
    category: 'General',
    summary: 'Strict prohibitions against unlawful activities, reverse engineering, security tampering, system abuse, and unauthorized data scraping.',
    paragraphs: [
      'Customer and all authorized Users agree to utilize NextSoftHR strictly in compliance with all applicable local, national, and international laws, regulations, and industry standards.',
      'Under no circumstances shall Customer or any User engage in, attempt, or permit any third party to engage in any of the following prohibited activities:'
    ],
    bulletPoints: [
      'Decompiling, disassembling, deciphering, or reverse engineering any part of the Platform or underlying software.',
      'Probing, scanning, or testing the vulnerability of our systems or networks without prior written authorization.',
      'Circumventing, tampering with, or bypassing authentication mechanisms, licensing limits, or security controls.',
      'Uploading, transmitting, or distributing computer viruses, worms, Trojan horses, ransomware, or malicious payloads.',
      'Scraping, crawling, or utilizing automated scripts to extract platform proprietary code, templates, or competitive benchmarks.',
      'Processing fraudulent payroll, laundering funds, forging employee attendance logs, or submitting falsified tax records.',
      'Harassing, threatening, defaming, or violating the legal rights (including privacy and publicity rights) of employees or third parties.',
      'Reselling, sublicensing, timesharing, or white-labeling the Services to unauthorized third parties without our express written consent.'
    ]
  },
  {
    id: 'platform-use',
    sectionNumber: '7.0',
    title: 'Use of the NextSoftHR Platform',
    category: 'Modules',
    summary: 'NextSoftHR grants Customer a non-exclusive, non-transferable, revocable license to access the modular cloud system in accordance with their subscription.',
    paragraphs: [
      'Subject to timely payment of applicable subscription fees and continuous compliance with these Terms, NextSoftHR grants Customer a limited, non-exclusive, non-transferable, non-sublicensable, revocable right to access and utilize the subscribed modules of the Platform for Customer’s internal business operations during the active Subscription Term.',
      'Access is granted on a modular basis according to the specific plan selected (e.g., Core HR, Full Suite, Enterprise Custom). The specific modules and capabilities provided are outlined in Sections 8 through 15 below.'
    ],
    modules: PLATFORM_MODULES
  },
  {
    id: 'hr-management',
    sectionNumber: '8.0',
    title: 'HR Management Services',
    category: 'Modules',
    summary: 'Covers digitized employee records, organizational structures, lifecycle documentation, and internal operational workflows.',
    paragraphs: [
      'The HR Management module provides organizational data architecture for managing the complete employee lifecycle—from onboarding and probation tracking to promotions, transfers, and offboarding.',
      'Customer acknowledges that it acts as the Data Controller regarding all employee records deposited into the Platform. Customer is responsible for ensuring it holds valid legal bases and employee consents (where applicable) to store documents, contracts, identification numbers, and contact records.'
    ],
    bulletPoints: [
      'Secure digital employee master files with role-based field visibility.',
      'Customizable onboarding task checklists and automated reminders.',
      'Department and team hierarchy modeling with dynamic org chart rendering.',
      'Automated document expiry tracking (visas, work permits, certifications).'
    ]
  },
  {
    id: 'payroll-services',
    sectionNumber: '9.0',
    title: 'Payroll Services & Computations',
    category: 'Modules',
    summary: 'Automated gross-to-net payroll processing, deductions, allowances, and reporting. Customer remains solely responsible for verifying tax and wage compliance.',
    paragraphs: [
      'NextSoftHR provides a calculation and workflow software engine that enables Customer to configure salary structures, calculate gross pay, apply custom or pre-set deductions (such as pensions, statutory contributions, insurance, loan repayments), add bonuses and allowances, generate payslips, and produce bank payment disbursement files.',
      'Critical Operational Disclaimer: NextSoftHR provides software tools and configurable tax calculation templates. NextSoftHR does NOT act as a licensed fiduciary, tax accountant, certified public accountant (CPA), or legal counsel. Customer bears sole responsibility for verifying that its chosen tax brackets, minimum wage parameters, overtime formulas, and deductions comply strictly with the statutory laws of the relevant jurisdiction.'
    ],
    highlightBox: {
      type: 'warning',
      title: 'Payroll Verification Notice',
      text: 'Before disbursing payroll funds, Customer must carefully audit calculation summaries, banking routing information, and deduction balances. NextSoftHR is not liable for errors arising from Customer’s erroneous inputs or misconfigured rules.'
    }
  },
  {
    id: 'employee-self-service',
    sectionNumber: '10.0',
    title: 'Employee Self-Service (ESS)',
    category: 'Modules',
    summary: 'Permits authorized employees to review personal profiles, retrieve payslips, submit leave requests, and manage personal preferences directly.',
    paragraphs: [
      'The Employee Self-Service (ESS) portal grants authorized Employees secure access to review their individual records, download past payslips, update banking and contact particulars, submit reimbursement claims, and request time off.',
      'Customer Administrators determine the specific permissions and field-editing rights accorded to Employees in ESS. Customer must ensure Employees are educated on safeguarding their login credentials.'
    ]
  },
  {
    id: 'time-attendance',
    sectionNumber: '11.0',
    title: 'Time & Attendance Tracking',
    category: 'Modules',
    summary: 'Workforce time capture via web, mobile, and hardware integrations. Customer is responsible for compliance with workplace monitoring and biometric regulations.',
    paragraphs: [
      'The Time & Attendance module enables organizations to track working hours, shifts, attendance, late check-ins, early departures, and overtime through web browsers, mobile geofencing, or compatible clocking hardware.',
      'Workplace Privacy Compliance: Where Customer utilizes geofencing, GPS location stamps, or biometric authentication devices in conjunction with NextSoftHR, Customer is solely responsible for complying with local employee notice laws, obtaining explicit written consent where legally mandated, and observing workplace surveillance regulations.'
    ]
  },
  {
    id: 'leave-management',
    sectionNumber: '12.0',
    title: 'Leave Management & Policies',
    category: 'Modules',
    summary: 'Configuration of paid time off, statutory sick leave, parental leaves, approval workflows, and balance tracking.',
    paragraphs: [
      'The Leave Management module facilitates the setup of multi-tier leave categories (annual leave, medical leave, maternity/paternity, bereavement, compensatory days off), automated accrual formulas, and customizable approval hierarchies.',
      'Customer is responsible for configuring leave policies in strict adherence to applicable labor contracts, collective bargaining agreements, and statutory employment standards in each operating country.'
    ]
  },
  {
    id: 'recruitment-talent',
    sectionNumber: '13.0',
    title: 'Recruitment & Talent Management',
    category: 'Modules',
    summary: 'Applicant tracking, vacancy publication, candidate pipelines, interview notes, and recruitment compliance.',
    paragraphs: [
      'NextSoftHR’s Talent Acquisition module provides applicant tracking capabilities, allowing Customer to create job openings, receive candidate submissions, record interview notes, and extend offers.',
      'Customer must ensure that its recruitment practices, candidate screening, candidate data retention, and rejection notices adhere to applicable anti-discrimination and candidate data protection regulations (e.g., GDPR Article 6/88, EEOC standards).'
    ]
  },
  {
    id: 'crm-business-features',
    sectionNumber: '14.0',
    title: 'CRM and Business Management Features',
    category: 'Modules',
    summary: 'Enables client tracking, commercial account management, relationship timelines, and operational business records.',
    paragraphs: [
      'Where subscribed, NextSoftHR provides CRM and business relationship features designed to track client contacts, service engagements, commercial billing profiles, and communication logs alongside workforce operations.',
      'Customer remains the owner and controller of all commercial client data entered into the CRM module.'
    ]
  },
  {
    id: 'project-task-management',
    sectionNumber: '15.0',
    title: 'Project and Task Management',
    category: 'Modules',
    summary: 'Facilitates team task allocation, milestone tracking, deadline management, and work progress collaboration.',
    paragraphs: [
      'The Project and Task Management features allow teams to create project boards, assign milestones, link employee work logs to specific deliverables, and evaluate operational resource utilization.',
      'NextSoftHR does not monitor or control the internal task descriptions or proprietary project files uploaded by Customer.'
    ]
  },
  {
    id: 'third-party-integrations',
    sectionNumber: '16.0',
    title: 'Third-Party Integrations & Ecosystem',
    category: 'Modules',
    summary: 'Platform interoperability with third-party software, banks, tax portals, and communication services is governed by third-party terms.',
    paragraphs: [
      'The Platform may permit Customer to connect or integrate with third-party applications, including payment gateways, commercial banks, government e-filing portals, single sign-on (SSO/SAML) identity providers, and productivity suites.',
      'Third-Party Terms: Integrations are subject to the respective terms and privacy policies of the third-party providers. NextSoftHR does not control, endorse, or assume liability for the availability, security, or data handling practices of third-party platforms.',
      'API Usage: If Customer utilizes NextSoftHR APIs to construct custom workflows, Customer agrees to comply with documented rate limits, security tokens, and API guidelines.'
    ]
  },
  {
    id: 'subscription-plans',
    sectionNumber: '17.0',
    title: 'Subscription Plans and Fees',
    category: 'Commercial',
    summary: 'Commercial terms governing monthly or annual subscriptions, seat licensing, renewals, applicable taxes, and fee adjustments.',
    paragraphs: [
      'NextSoftHR is licensed on a subscription basis under various tiers (e.g., Starter, Professional, Enterprise) structured primarily around active employee seat counts, selected feature modules, and billing cycles (monthly or annual).',
      'Renewals: Unless expressly stated otherwise in an Order Form, all Subscriptions automatically renew for successive terms equivalent to the expiring term, unless either party delivers written notice of non-renewal at least thirty (30) days prior to the expiration date.',
      'Taxes: Subscription fees do not include value-added tax (VAT), sales tax, goods and services tax (GST), withholding tax, or other governmental levies. Customer is responsible for paying all applicable taxes associated with its purchase, excluding taxes based on NextSoftHR’s net income.',
      'Price Changes: NextSoftHR reserves the right to modify subscription fees upon at least sixty (60) days’ advance written notice prior to the commencement of the subsequent renewal term.'
    ],
    bulletPoints: [
      'Seat counts are evaluated based on active employees registered in the system during the billing period.',
      'Add-on modules and premium support tiers are billed alongside the core subscription.',
      'Annual billing plans receive discounted rates in exchange for a committed term.'
    ]
  },
  {
    id: 'free-trials',
    sectionNumber: '18.0',
    title: 'Free Trials and Promotional Offers',
    category: 'Commercial',
    summary: 'Conditions governing promotional free trials, duration, feature access, automatic conversion, and cancellation obligations.',
    paragraphs: [
      'NextSoftHR may offer new Customers access to a limited-duration Free Trial to evaluate the Platform prior to executing a paid subscription.',
      'Trial Eligibility & Duration: Free trials are restricted to one per organization and generally span [Default: 14 Days / Subject to Promotional Terms]. NextSoftHR reserves the right in its sole discretion to terminate or modify trial eligibility at any time without liability.',
      'Conversion to Paid Subscription: Upon expiration of the Free Trial period, continued access to the Platform requires the execution of a paid subscription plan. If Customer does not upgrade prior to trial conclusion, NextSoftHR may suspend access and permanently archive or delete trial data following a [30-Day Retention Window].',
      'Configurable Trial Guarantee: Any special promotional terms agreed upon during trial onboarding are codified in writing within the electronic trial registration workflow.'
    ],
    highlightBox: {
      type: 'trial',
      title: 'Free Trial Terms Summary',
      text: 'Trial accounts have access to standard sandbox features. No long-term commitments are required, and Customer may cancel or export basic data at any point prior to trial conclusion.'
    }
  },
  {
    id: 'payment-billing',
    sectionNumber: '19.0',
    title: 'Payment and Billing Terms',
    category: 'Commercial',
    summary: 'Methods of payment, payment obligations, failed transaction procedures, and late interest provisions.',
    paragraphs: [
      'Payment Methods: Customer must maintain a valid, authorized credit card, automated clearing house (ACH) mandate, direct debit authorization, or approved invoicing arrangement on file with NextSoftHR.',
      'Billing In advance: Subscription fees are invoiced and charged in advance at the start of each billing period (monthly or annual). Usage-based fees (such as per-payslip or transactional SMS alerts) are invoiced in arrears.',
      'Failed Payments & Collections: In the event of a failed transaction or overdue balance, NextSoftHR will make reasonable attempts to notify Customer. Overdue amounts may accrue interest at the rate of 1.5% per month (or the maximum statutory rate permitted by law) from the due date until paid in full.'
    ]
  },
  {
    id: 'suspension-termination',
    sectionNumber: '20.0',
    title: 'Account Suspension and Termination',
    category: 'Commercial',
    summary: 'Grounds for suspension or termination by either party, notice periods, and post-termination data transition protocols.',
    paragraphs: [
      'Termination for Convenience: Customer may cancel its subscription at the end of the current billing cycle by providing written notice or completing the cancellation flow within the administrative dashboard.',
      'Termination for Cause: Either party may immediately terminate this Agreement upon written notice if the other party: (a) commits a material breach of these Terms and fails to cure such breach within thirty (30) days of receiving written notice; or (b) becomes the subject of a petition in bankruptcy or insolvency proceeding.',
      'Immediate Suspension: NextSoftHR reserves the right to immediately suspend access to Customer’s Account if we reasonably suspect: (i) an active security breach or malware compromise; (ii) fraudulent or unlawful activity; (iii) substantial non-payment after notice; or (iv) repeated violations of Section 6 (Acceptable Use).',
      'Post-Termination Data Access: Upon termination, Customer’s right to access the Platform ceases immediately. NextSoftHR will provide Customer thirty (30) days from the effective termination date to export its Customer Data in standard format (e.g., CSV, JSON, PDF), after which NextSoftHR will securely delete or de-identify such data in accordance with our data retention policies.'
    ]
  },
  {
    id: 'data-ownership',
    sectionNumber: '21.0',
    title: 'Data Ownership & Proprietary Rights',
    category: 'Data & Security',
    summary: 'Customer retains 100% full legal ownership of its business and employee data. NextSoftHR claims no proprietary rights over Customer Content.',
    paragraphs: [
      'Customer Data Ownership: As between NextSoftHR and Customer, Customer exclusively retains all right, title, and ownership interest (including all intellectual property rights) in and to all data, records, employee information, documents, and content submitted, stored, or processed via the Platform ("Customer Data").',
      'Limited License to NextSoftHR: Customer grants NextSoftHR a non-exclusive, worldwide, royalty-free, limited license to host, copy, transmit, format, and display Customer Data solely to the extent necessary to provide, maintain, secure, backup, and improve the Services for Customer, or as strictly mandated by applicable law.',
      'Aggregated & De-Identified Data: NextSoftHR may generate anonymized, de-identified, and aggregated statistical metrics (e.g., industry payroll trends, platform benchmark metrics) that do not identify Customer, any User, or any individual Employee, for purposes of system optimization and product enhancement.'
    ]
  },
  {
    id: 'privacy-data-protection',
    sectionNumber: '22.0',
    title: 'Privacy and Data Protection',
    category: 'Data & Security',
    summary: 'Commitment to international data privacy frameworks (GDPR, UK GDPR, CCPA/CPRA, and global standards) with roles clearly delineated.',
    paragraphs: [
      'Both parties agree to comply with all applicable data protection and privacy legislation concerning the collection, storage, transfer, and processing of Personal Data.',
      'Roles of the Parties: For the purposes of global data protection laws (including the EU/UK General Data Protection Regulation and the California Consumer Privacy Act): Customer acts as the "Data Controller" (or Business), and NextSoftHR acts as the "Data Processor" (or Service Provider).',
      'Data Processing Addendum (DPA): NextSoftHR provides a standardized global Data Processing Addendum (DPA) incorporating Standard Contractual Clauses (SCCs) to govern cross-border data transfers and sub-processor engagements, which forms an integral part of this Agreement where applicable.'
    ],
    highlightBox: {
      type: 'policy',
      title: 'NextSoftHR Privacy Policy',
      text: 'Our comprehensive Privacy Policy details how we handle information, respond to data subject requests, and enforce strict privacy controls.',
      actionLabel: 'Read Our Privacy Policy',
      actionType: 'privacy-modal'
    }
  },
  {
    id: 'security',
    sectionNumber: '23.0',
    title: 'Security & Technical Safeguards',
    category: 'Data & Security',
    summary: 'Technical and organizational measures enforced to protect Customer Data from unauthorized disclosure, loss, or alteration.',
    paragraphs: [
      'NextSoftHR is dedicated to maintaining institutional-grade technical, physical, and administrative safeguards designed to ensure the confidentiality, integrity, availability, and resilience of the Platform and Customer Data.',
      'Reasonable safeguards include, but are not limited to, the following baseline controls:'
    ],
    bulletPoints: [
      'Data Encryption: Strong encryption for data in transit (TLS 1.3) and data at rest (AES-256) across all storage databases and backup vaults.',
      'Access Controls: Granular role-based access controls (RBAC), multi-factor authentication (MFA) enforcement, and strict principle-of-least-privilege.',
      'Infrastructure Redundancy: High-availability cloud infrastructure distributed across secure tier-IV data center availability zones.',
      'Continuous Monitoring: Automated 24/7 intrusion detection, vulnerability scanning, and threat intelligence alerting.',
      'Backup & Disaster Recovery: Automated daily snapshot backups, geographically replicated off-site repositories, and annual disaster recovery testing.',
      'Incident Response Protocol: Formalized security incident management procedures with prompt notification to affected Customers in accordance with applicable laws.'
    ]
  },
  {
    id: 'confidentiality',
    sectionNumber: '24.0',
    title: 'Confidentiality',
    category: 'Data & Security',
    summary: 'Mutual obligations to safeguard proprietary business information, technical architectures, and financial data.',
    paragraphs: [
      'Each party ("Receiving Party") agrees that all code, inventions, business, technical, financial, and employee information disclosed to it by the other party ("Disclosing Party") under these Terms constitutes confidential information ("Confidential Information").',
      'The Receiving Party agrees: (a) to hold Confidential Information in strict confidence; (b) not to disclose such information to any third party, except to authorized employees, contractors, and legal advisors who have a genuine need to know and are bound by confidentiality obligations no less restrictive than those herein; and (c) not to use such information for any purpose outside the scope of this Agreement.',
      'Exceptions: Confidential Information does not include information that: (i) is or becomes publicly known through no breach by Receiving Party; (ii) was known prior to disclosure without confidentiality restriction; (iii) is independently developed without reference to Disclosing Party’s information; or (iv) is required to be disclosed by valid court order, provided prompt advance notice is given where legally permissible.'
    ]
  },
  {
    id: 'intellectual-property',
    sectionNumber: '25.0',
    title: 'Intellectual Property Rights',
    category: 'Legal & Compliance',
    summary: 'NextSoftHR retains all copyrights, trademarks, software patents, trade secrets, and visual interface assets.',
    paragraphs: [
      'NextSoftHR and its licensors retain all intellectual property rights, titles, and interests in and to the Platform, including all software code, interface designs, logos, trademarks, documentation, calculation algorithms, graphic components, templates, and text.',
      'Except for the limited right of access expressly granted to Customer under Section 7, nothing in this Agreement confers any ownership, copyright, patent, trademark, or proprietary license to Customer or any third party.',
      'Customer Feedback: If Customer or any User submits feedback, feature recommendations, or enhancements concerning the Platform, NextSoftHR may freely incorporate such feedback into its products without any royalty, attribution, or obligation to Customer.'
    ]
  },
  {
    id: 'user-content',
    sectionNumber: '26.0',
    title: 'User Content & Representations',
    category: 'Legal & Compliance',
    summary: 'Customer warrants it holds all required legal rights and consents for content uploaded to the system.',
    paragraphs: [
      'Customer represents and warrants that all Customer Data and content uploaded to the Platform: (a) was lawfully obtained; (b) does not infringe upon or violate any third-party intellectual property, privacy, or statutory rights; and (c) complies with all applicable workplace and employment standards.',
      'NextSoftHR reserves the right, but undertakes no obligation, to remove or restrict access to any content that we reasonably believe violates this Agreement or applicable laws.'
    ]
  },
  {
    id: 'third-party-services',
    sectionNumber: '27.0',
    title: 'Third-Party Services & Links',
    category: 'Legal & Compliance',
    summary: 'NextSoftHR disclaims liability for external third-party tools, payment vendors, or external portals linked through the software.',
    paragraphs: [
      'The Platform may showcase links to third-party websites or enable direct integrations with third-party software (e.g., payment aggregators, pension administrators, identity verifiers).',
      'Such third-party services are governed solely by their independent terms of service and privacy agreements. NextSoftHR does not control, supervise, or endorse such services and expressly disclaims any warranties or liability related to their performance, availability, or accuracy.'
    ]
  },
  {
    id: 'service-availability',
    sectionNumber: '28.0',
    title: 'Service Availability & Maintenance',
    category: 'Legal & Compliance',
    summary: 'NextSoftHR strives for continuous service availability, with reasonable carve-outs for maintenance windows, network outages, and emergency updates.',
    paragraphs: [
      'Operational Target: NextSoftHR aims to provide reliable, commercial-grade cloud service availability twenty-four hours a day, seven days a week (24/7).',
      'Permitted Exceptions: NextSoftHR does not warrant or guarantee that the Platform will operate completely uninterrupted, bug-free, or without latency. Unavailability caused by the following shall not constitute a breach of this Agreement:'
    ],
    bulletPoints: [
      'Scheduled Maintenance: Routine infrastructure upgrades and software deployments conducted during designated off-peak maintenance windows (with reasonable advance notice).',
      'Emergency Security Patches: Critical vulnerability mitigations or urgent infrastructure repairs necessary to protect system integrity.',
      'Telecommunications & Network Outages: Internet service provider (ISP) failures, external cloud backbone interruptions, or DNS propagation delays.',
      'Force Majeure: Unforeseen geopolitical, environmental, or infrastructural catastrophes beyond NextSoftHR’s reasonable operational control.'
    ]
  },
  {
    id: 'software-updates',
    sectionNumber: '29.0',
    title: 'Software Updates and Feature Changes',
    category: 'Legal & Compliance',
    summary: 'NextSoftHR continuously improves the Platform and may deploy enhancements, workflow redesigns, or deprecate legacy tools.',
    paragraphs: [
      'As a software-as-a-service provider, NextSoftHR regularly enhances, refines, and deploys updates to the Platform, including security patches, feature additions, interface refinements, and statutory formula updates.',
      'While NextSoftHR seeks to expand functionality, we reserve the right to deprecate, modify, or substitute specific features or APIs, provided such modification does not materially degrade the core functionality of the subscribed Services taken as a whole.'
    ]
  },
  {
    id: 'disclaimers',
    sectionNumber: '30.0',
    title: 'Disclaimers of Advice & Warranties',
    category: 'Legal & Compliance',
    summary: 'NextSoftHR is a software platform, not a law firm, accounting firm, or certified tax consultancy. Provided AS-IS to the fullest extent permitted by law.',
    paragraphs: [
      'NO PROFESSIONAL ADVICE: NEXTSOFTHR PROVIDES AUTOMATED WORKFLOW SOFTWARE TOOLS AND COMPUTATION TEMPLATES. THE SERVICES DO NOT CONSTITUTE, AND MUST NEVER BE RELIED UPON AS, LEGAL ADVICE, TAX ADVICE, ACCOUNTING CONSULTING, CERTIFIED FINANCIAL PLANNING, OR SPECIALIZED LABOR LAW COUNSEL.',
      'CUSTOMER IS SOLELY RESPONSIBLE FOR VERIFYING AND AUDITING ALL PAYROLL FORMULAS, WORKPLACE TIME RESTRICTIONS, EMPLOYMENT CONTRACT TEMPLATES, AND STATUTORY DEDUCTIONS AGAINST THE APPLICABLE STATUTORY MANDATES IN ITS SPECIFIC OPERATING JURISDICTIONS.',
      'WARRANTY DISCLAIMER: EXCEPT AS EXPRESSLY PROVIDED IN THESE TERMS, THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, NEXTSOFTHR DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.'
    ],
    highlightBox: {
      type: 'warning',
      title: 'Important Legal Disclaimer',
      text: 'NextSoftHR does not provide legal, tax, or accounting advice. Organizations must consult qualified local labor attorneys and chartered accountants for statutory filing compliance.'
    }
  },
  {
    id: 'limitation-liability',
    sectionNumber: '31.0',
    title: 'Limitation of Liability',
    category: 'Legal & Compliance',
    summary: 'Standard SaaS liability limitation caps indirect, punitive, or consequential damages to the amount paid during the preceding 12 months.',
    counselFlag: '[Subject to Local Enforceability Review: Jurisdiction Standard SaaS Caps]',
    paragraphs: [
      'EXCLUSION OF CONSEQUENTIAL DAMAGES: TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL EITHER PARTY, ITS AFFILIATES, OFFICERS, DIRECTORS, OR LICENSORS BE LIABLE TO THE OTHER PARTY FOR ANY INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, COVER, OR CONSEQUENTIAL DAMAGES (INCLUDING LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS INTERRUPTION), HOWEVER CAUSED, UNDER ANY THEORY OF LIABILITY (WHETHER IN CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE).',
      'AGGREGATE LIABILITY CAP: TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE TOTAL CUMULATIVE LIABILITY OF NEXTSOFTHR ARISING OUT OF OR RELATING TO THIS AGREEMENT OR THE USE OF THE PLATFORM SHALL IN NO EVENT EXCEED THE TOTAL FEES ACTUALLY PAID BY CUSTOMER TO NEXTSOFTHR IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO LIABILITY.',
      'EXCEPTIONS: THE LIMITATIONS IN THIS SECTION DO NOT APPLY TO: (A) CUSTOMER’S OBLIGATION TO PAY SUBSCRIPTION FEES; (B) EITHER PARTY’S BREACH OF CONFIDENTIALITY (SECTION 24); (C) EITHER PARTY’S INDEMNIFICATION OBLIGATIONS (SECTION 32); OR (D) MATTERS FOR WHICH LIABILITY CANNOT BE LAWFULLY EXCLUDED OR LIMITED UNDER APPLICABLE STATUTES.'
    ]
  },
  {
    id: 'indemnification',
    sectionNumber: '32.0',
    title: 'Indemnification',
    category: 'Legal & Compliance',
    summary: 'Mutual indemnification protections covering intellectual property infringement and customer compliance with labor/tax laws.',
    paragraphs: [
      'Customer Indemnification: Customer agrees to defend, indemnify, and hold harmless NextSoftHR, its parent entities, officers, directors, and employees against any third-party claims, regulatory penalties, damages, or liabilities arising from or related to: (a) Customer Data or Content violating applicable laws or third-party rights; (b) Customer’s breach of Section 6 (Acceptable Use); (c) unlawful wage, overtime, or tax withholding practices conducted by Customer; or (d) disputes between Customer and its Employees.',
      'NextSoftHR Indemnification: NextSoftHR shall defend Customer against any third-party claim alleging that Customer’s authorized use of the Platform directly infringes a valid copyright or patent of such third party, and shall indemnify Customer against damages finally awarded by a court of competent jurisdiction, provided Customer promptly notifies NextSoftHR, grants sole control of defense, and cooperates fully.'
    ]
  },
  {
    id: 'force-majeure',
    sectionNumber: '33.0',
    title: 'Force Majeure',
    category: 'Legal & Compliance',
    summary: 'Neither party is liable for delivery delays or failures caused by events outside reasonable control.',
    paragraphs: [
      'Neither party shall be held liable or responsible for any failure or delay in the performance of its obligations under this Agreement (except for payment obligations) to the extent such failure or delay is caused by events outside its reasonable control.',
      'Qualifying events include acts of God, natural catastrophes, floods, earthquakes, fires, armed conflicts, acts of war, terrorism, civil unrest, labor strikes, epidemics, pandemics, government sanctions, widespread telecommunication outages, or grid utility failures.'
    ]
  },
  {
    id: 'governing-law',
    sectionNumber: '34.0',
    title: 'Governing Law and Jurisdiction',
    category: 'Legal & Compliance',
    summary: 'Governing law and jurisdiction placeholders to be customized according to the designated corporate entity.',
    counselFlag: '[Pending Company / Legal Counsel Review: Insert Corporate Seat & Forum]',
    paragraphs: [
      'This Agreement, and any disputes or claims arising out of or in connection with its subject matter or formation (including non-contractual disputes), shall be governed by and construed in accordance with the laws of [Insert Applicable Governing Jurisdiction, e.g., England & Wales / Delaware, United States / Singapore], without giving effect to any principles of conflicts of law.',
      'The United Nations Convention on Contracts for the International Sale of Goods (CISG) is expressly disclaimed and shall not apply to this Agreement.',
      'Each party irrevocably submits to the exclusive jurisdiction of the competent courts located in [Insert Applicable Legal Venue/City] to resolve any dispute, suit, or controversy arising under or in relation to this Agreement.'
    ]
  },
  {
    id: 'dispute-resolution',
    sectionNumber: '35.0',
    title: 'Dispute Resolution & Arbitration',
    category: 'Legal & Compliance',
    summary: 'Structured amicable resolution procedures, mediation escalation, and binding arbitration protocols.',
    paragraphs: [
      'Informal Negotiation: In the event of any controversy, claim, or dispute arising out of or relating to these Terms, the parties agree to first attempt in good faith to resolve the dispute informally by delivering written notice to the other party and having authorized senior executive representatives meet within thirty (30) days.',
      'Arbitration: If the dispute is not resolved through informal negotiations within forty-five (45) days of initial notice, either party may submit the dispute to binding commercial arbitration administered under the rules of [Insert Arbitration Institute, e.g., LCIA / AAA / ICC / SIAC] by a single neutral arbitrator appointed in accordance with said rules.',
      'Class Action Waiver: To the extent permitted by applicable law, all claims must be brought in the parties’ individual capacity, and not as a plaintiff or class member in any purported class, collective, or representative proceeding.'
    ]
  },
  {
    id: 'changes-to-terms',
    sectionNumber: '36.0',
    title: 'Changes to These Terms',
    category: 'Legal & Compliance',
    summary: 'NextSoftHR reserves the right to modify these Terms, providing advance notice of material revisions.',
    paragraphs: [
      'NextSoftHR reserves the right to revise, update, or amend these Terms & Conditions periodically to reflect modifications to the Platform, changes in statutory requirements, or enhancements to our operational practices.',
      'Notification of Material Changes: When we make material alterations that substantially affect Customer rights or obligations, we will provide advance notice via email to registered Administrators, via in-app dashboard banners, or by updating the "Last Updated" timestamp at the top of this document at least thirty (30) days prior to the effective date.',
      'Continued Use: By continuing to access or use NextSoftHR after updated Terms become effective, Customer agrees to be bound by the revised provisions. If Customer disagrees with the updated Terms, its sole remedy is to cease using the Platform and terminate its subscription.'
    ]
  },
  {
    id: 'contact-information',
    sectionNumber: '37.0',
    title: 'Contact Information & Inquiries',
    category: 'Legal & Compliance',
    summary: 'Official contact channels for inquiries regarding legal terms, data protection, security, and customer service.',
    paragraphs: [
      'If you have any questions, clarifications, legal notices, or feedback regarding these Terms & Conditions or our global platform operations, please contact NextSoftHR using the official channels below:'
    ],
    bulletPoints: [
      'Platform Entity: NextSoftHR (Global HR, Payroll & Business Management Platform)',
      'Official Website: www.nextsofthr.org',
      'Legal & Compliance Department: legal@nextsofthr.org',
      'Privacy & Data Protection Officer: dpo@nextsofthr.org',
      'Security Operations Center: security@nextsofthr.org',
      'Customer Support & Help Desk: support@nextsofthr.org'
    ],
    highlightBox: {
      type: 'info',
      title: 'Dedicated Enterprise Support',
      text: 'Enterprise customers with custom Master Services Agreements (MSAs) or dedicated service level agreements (SLAs) may reach their assigned Account Manager directly.'
    }
  }
];
