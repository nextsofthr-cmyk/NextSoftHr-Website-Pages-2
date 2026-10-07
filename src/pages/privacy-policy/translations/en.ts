import { Translations } from './types';

export const enTranslations: Translations = {
  nav: {
    platform: 'Platform',
    hrPayroll: 'HR & Payroll',
    trustSecurity: 'Trust & Security',
    resources: 'Resources',
    contact: 'Contact',
    signIn: 'Sign In',
    policyAdmin: 'Policy Admin',
    privacyDesk: 'Privacy Desk',
    platformOverview: 'Platform Overview',
    securityArch: 'Security Architecture',
    yourRights: 'Your Privacy Rights',
    contactDpo: 'Contact DPO',
    submitRequest: 'Submit Privacy Request',
  },
  hero: {
    badge: 'NextSoftHR Trust & Compliance Center',
    title: 'Privacy Policy',
    subtitle:
      'Your privacy matters to us. Learn how NextSoftHR collects, uses, protects and manages your personal information when you use our platform and services.',
    lastUpdated: 'Last Updated:',
    version: 'Version',
    updateNotice: '(Update Notice)',
    searchPlaceholder:
      "Search policy sections (e.g., 'retention', 'AI', 'cookies', 'rights')...",
    clear: 'Clear',
    cookiePrefs: 'Cookie Preferences',
    requestAssistance: 'Request Privacy Assistance',
    printPdf: 'Print / PDF',
    governanceCore: 'Data Governance Core',
    globalArch: 'NextSoftHR Global Architecture',
    activeShield: 'Active Shield',
    workforceIdentity: 'Workforce & Payroll Identity',
    workforceSub: 'Employee records · Salaries · Time tracking',
    encryptionBridge: 'TLS 1.3 · AES-256 Transport & Storage',
    cloudVault: 'Cloud Vault & Geodiverse Backup',
    cloudVaultSub: 'Encrypted database partitions · Daily snapshots',
    aiEngine: 'Responsible AI & Automation',
    aiEngineSub: 'Human-in-the-loop · Anonymized telemetry',
    governedBadge: 'Governed',
    footerRegion: 'Africa & International Markets',
    structuredArticles: '16 Structured Articles',
  },
  toc: {
    title: 'Table of Contents',
    readTime: '~8 min read',
    needAssistance: 'Need assistance?',
    assistanceText:
      'Direct questions regarding workforce data rights to our Data Protection Office.',
    contactTeam: 'Contact Privacy Team →',
    section: 'Section',
    items: {
      introduction: 'Introduction',
      informationWeCollect: 'Information We Collect',
      howWeUseInformation: 'How We Use Your Information',
      cookiesTracking: 'Cookies & Tracking Technologies',
      dataSharing: 'Data Sharing & Disclosure',
      dataStorageSecurity: 'Data Storage & Security',
      dataRetention: 'Data Retention',
      yourPrivacyRights: 'Your Privacy Rights',
      employeeCustomerData: 'Employee & Customer Data',
      internationalTransfers: 'International Data Transfers',
      thirdPartyServices: 'Third-Party Services',
      childrensPrivacy: "Children's Privacy",
      marketingCommunications: 'Marketing Communications',
      aiAutomatedProcessing: 'AI & Automated Processing',
      changesToPolicy: 'Changes to This Policy',
      contactUs: 'Contact Us',
    },
  },
  policy: {
    sec1: {
      tag: 'General Scope',
      title: '1. Introduction',
      p1: "NextSoftHR ('NextSoftHR', 'we', 'us', or 'our') respects the privacy and fundamental data protection rights of our users, employers, employees, independent contractors, prospective clients, business partners, and website visitors. We are committed to processing personal and workforce data with transparent, lawful, and accountable standards.",
      p2: 'This Privacy Policy outlines how NextSoftHR collects, uses, stores, secures, and discloses personal information when you interact with us across multiple engagement channels, including when you:',
      scopes: [
        'Visit or navigate our official website (www.nextsofthr.org)',
        'Create, configure, or administer an enterprise account',
        'Access or utilize the NextSoftHR cloud software suite',
        'Deploy our Human Resources & Payroll outsourcing services',
        'Engage our technical support and customer success desks',
        'Request software demonstrations or consultative proposals',
        'Subscribe to software licensing or commercial tiers',
        'Communicate with NextSoftHR via email, chat, or telephone',
        'Connect integrated third-party applications and APIs',
      ],
      boxTitle: 'Multi-Tenant Platform Coverage',
      boxDesc:
        'NextSoftHR powers end-to-end organizational operations, including Human Resources Management, Payroll Management, Time & Attendance, Employee Self-Service (ESS), Manager Self-Service (MSS), Leave Management, Shift & Schedule Management, Talent Acquisition, CRM, Finance, Project & Task Management, HR & Payroll Outsourcing, Business Management, and AI-powered HR assistance.',
    },
    sec2: {
      tag: 'Data Taxonomy',
      title: '2. Information We Collect',
      intro:
        'We strictly collect personal data that is adequate, relevant, and limited to what is necessary in relation to the operational purposes for which it is processed. We do not solicit or record extraneous personal details.',
      categoryOf: 'Category',
      processedElements: 'Representative Data Elements Processed:',
      adminNotice:
        'Data attributes are governed by customer administrative policies and permission schemas.',
      categories: [
        {
          title: 'Account Information',
          desc: 'Personal identifying credentials and contact details supplied during onboarding or account administration.',
          items: [
            'Full legal name and preferred name',
            'Professional and direct email address',
            'Contact telephone number (mobile and office)',
            'Registered company name and legal entity identifier',
            'Job title, organizational role, and permission tier',
            'Encrypted login credentials and authentication tokens',
            'System language, timezone, and interface preferences',
          ],
        },
        {
          title: 'Business & Workforce Information',
          desc: 'Organizational data and employee records uploaded or managed by customer administrators within the platform.',
          items: [
            'Company structural details, subsidiaries, and physical office locations',
            'Department structures, reporting hierarchies, and cost centers',
            'Employee personal profiles, employment contracts, and tax identifiers',
            'Payroll calculations, salary structures, deductions, and banking details',
            'Time, shift, clock-in/out timestamps, biometric device sync logs, and attendance summaries',
            'Leave balances, paid time off (PTO) requests, and medical leave documentation',
            'Shift schedules, rotas, and task assignments',
          ],
        },
        {
          title: 'Technical & Device Information',
          desc: 'Automated telemetry generated when accessing NextSoftHR web platforms, mobile interfaces, or API endpoints.',
          items: [
            'Internet Protocol (IP) address and approximate geolocation (city/country level)',
            'Browser family, version, and language configuration',
            'Operating system, device hardware model, and screen resolution',
            'Session timestamps, login frequency, and feature navigation paths',
            'Diagnostic telemetry, HTTP error codes, and performance metrics',
            'Session tokens, secure authentication cookies, and CSRF protection headers',
          ],
        },
        {
          title: 'Communication & Support Information',
          desc: 'Inbound queries, customer service records, and feedback provided across support interactions.',
          items: [
            'Customer support tickets, chat transcripts, and recorded correspondence',
            'Demo request notes, inquiry details, and business requirement briefs',
            'Survey responses, product feedback, and feature enhancement requests',
            'Billing, invoicing, and subscription inquiry exchanges',
          ],
        },
      ],
    },
    sec3: {
      tag: 'Processing Purposes',
      title: '3. How We Use Your Information',
      intro:
        'We process personal and organization information solely for legitimate, documented business and technical objectives under statutory legal grounds:',
      purposes: [
        {
          title: 'Providing HR & Payroll Services',
          desc: 'Executing automated gross-to-net payroll runs, generating compliant payslips, tax deductions, and statutory pension schedules.',
        },
        {
          title: 'Account & Identity Administration',
          desc: 'Authenticating authorized workforce users, managing permission profiles, and enforcing security policies across corporate workspaces.',
        },
        {
          title: 'Workforce Record Management',
          desc: 'Organizing centralized employee profiles, departmental reporting lines, contracts, emergency contacts, and job histories.',
        },
        {
          title: 'Attendance, Shifts & Leave Oversight',
          desc: 'Logging shift rosters, processing leave balances, recording biometric device clock-ins, and calculating overtime hours.',
        },
        {
          title: 'Enterprise Technical Support',
          desc: 'Investigating customer service tickets, diagnosing configuration queries, and maintaining SLA uptime commitments.',
        },
        {
          title: 'Platform Reliability & Performance',
          desc: 'Monitoring server health, latency metrics, and API transaction speeds to guarantee platform stability.',
        },
        {
          title: 'Security & Abuse Prevention',
          desc: 'Detecting credential stuffing, unauthorized intrusion attempts, and fraudulent administrative actions.',
        },
        {
          title: 'Subscriptions & Commercial Billing',
          desc: 'Processing licensing payments, managing invoices, calculating tier renewals, and enforcing contractual terms.',
        },
        {
          title: 'Essential Service Communications',
          desc: 'Transmitting operational announcements, security updates, scheduled maintenance notices, and critical product alerts.',
        },
        {
          title: 'Requested Marketing Communications',
          desc: 'Delivering product webinars, best practice guides, and release updates where explicit consent has been furnished.',
        },
        {
          title: 'Statutory & Regulatory Obligations',
          desc: 'Complying with applicable labor regulations, corporate financial reporting guidelines, and legal court orders.',
        },
        {
          title: 'Product Innovation & Experience Design',
          desc: 'Aggregating non-identifiable usage patterns to refine workflows, simplify navigation, and improve user interfaces.',
        },
      ],
    },
    sec4: {
      tag: 'Browser Technologies',
      title: '4. Cookies and Tracking Technologies',
      intro:
        'NextSoftHR and our verified third-party partners deploy cookies, secure HTTP tokens, local storage mechanisms, and similar tracking technologies to guarantee application responsiveness, remember user preferences, and analyze platform traffic.',
      types: [
        {
          title: 'Essential Cookies',
          desc: 'Required for core session authentication, load balancing, CSRF protection, and platform navigation.',
        },
        {
          title: 'Functional Cookies',
          desc: 'Retain user interface selections, active workspace context, time zone offsets, and language options.',
        },
        {
          title: 'Analytics Cookies',
          desc: 'Collect anonymized metrics regarding page loading times, feature popularity, and user journeys.',
        },
        {
          title: 'Preference Cookies',
          desc: 'Remember filter configurations, table pagination limits, and layout densities within dashboards.',
        },
        {
          title: 'Security Technologies',
          desc: 'Identify suspicious device signatures, prevent brute-force credential stuffing, and protect forms.',
        },
      ],
      manageTitle: 'Manage Your Choice',
      manageDesc:
        'You can inspect or adjust non-essential cookie consents at any time.',
      button: 'Cookie Preferences',
      browserNote:
        'Most modern browsers permit you to control cookies through their configuration settings (e.g. Chrome, Safari, Firefox, Edge). Note that disabling essential cookies may impact your ability to log in or operate NextSoftHR software.',
    },
    sec5: {
      tag: 'Sub-processors & Disclosures',
      title: '5. Data Sharing and Disclosure',
      intro:
        'NextSoftHR does not sell, rent, or trade your personal or workforce data to data brokers or third-party marketers. We share personal information strictly on a need-to-know basis for legitimate business operations and legal compliance with the following entities:',
      entities: [
        {
          title: 'Authorized Corporate Users',
          desc: 'Colleagues and supervisors authorized within your company account, based on role permissions defined by your HR administrator.',
        },
        {
          title: 'Infrastructure & Cloud Hosting',
          desc: 'Certified enterprise cloud hosting facilities, content delivery networks (CDNs), and database storage partners.',
        },
        {
          title: 'Payment Processors & Banking Gateways',
          desc: 'PCI-DSS certified payment processors facilitating payroll disbursements, tax remittances, and software subscription charges.',
        },
        {
          title: 'Security & Analytics Providers',
          desc: 'Vendors assisting with uptime monitoring, threat defense, error logging, and system telemetry.',
        },
        {
          title: 'Integration Partners',
          desc: 'Third-party applications you explicitly elect to connect (e.g. accounting packages, biometrics, productivity tools).',
        },
        {
          title: 'Professional Advisers',
          desc: 'Legal counsel, certified public accountants, and external auditors bound by strict professional confidentiality obligations.',
        },
        {
          title: 'Statutory & Regulatory Authorities',
          desc: 'Law enforcement, tax authorities, or court jurisdictions only where compelled by valid legal process or statutory statutes.',
        },
      ],
    },
    sec6: {
      tag: 'Security Architecture',
      title: '6. Data Storage and Security',
      intro:
        'NextSoftHR implements robust technical and organizational safeguards designed to protect personal and corporate data against unauthorized access, unauthorized disclosure, data loss, data misuse, alteration, and destruction. While no internet-connected platform can promise absolute immunity against all evolving cyber threats, we uphold defense-in-depth engineering principles.',
      standardTag: 'Safeguard Standard',
      pillars: [
        {
          title: 'Secure Infrastructure',
          summary:
            'Hardened cloud environments hosted within ISO-certified Tier-III/IV data facilities.',
          details: [
            'Redundant multi-zone cloud architecture with zero single points of failure',
            'DDoS mitigation and intelligent Web Application Firewall (WAF) filtering',
            'Isolated VPC networks with zero public database exposure',
          ],
        },
        {
          title: 'Access Controls',
          summary:
            'Strict principle of least privilege enforced across internal and client tiers.',
          details: [
            'Granular Role-Based Access Control (RBAC) across HR, Payroll, and Admin tiers',
            'Mandatory Multi-Factor Authentication (MFA/2FA) for privileged roles',
            'Automated session timeouts and single-sign-on (SSO) SAML/OIDC support',
          ],
        },
        {
          title: 'Data Encryption',
          summary:
            'Strong cryptographic standards protecting data across rest and transit.',
          details: [
            'End-to-end TLS 1.3 encryption for all data in transit across public networks',
            'AES-256 bit hardware-backed encryption for database records and backup archives',
            'Cryptographic salting and secure key management rotation cycles',
          ],
        },
        {
          title: 'Monitoring & Audit',
          summary:
            'Continuous visibility, anomaly detection, and immutable administrative audit logs.',
          details: [
            '24/7 automated telemetry monitoring for unauthorized login anomalies',
            'Immutable audit trails recording critical payroll and salary change events',
            'Routine independent vulnerability testing and code security assessments',
          ],
        },
        {
          title: 'Backup & Recovery',
          summary:
            'Resilient data restoration pipelines ensuring business continuity.',
          details: [
            'Automated daily encrypted snapshots replicated across geodiverse regions',
            'RPO and RTO disaster targets rigorously audited and tested quarterly',
            'Comprehensive disaster recovery drills and immutable write-once backups',
          ],
        },
      ],
      userResponsibility:
        'Notice Regarding Security Responsibilities: Users are responsible for maintaining the confidentiality of their account passwords, enabling MFA, and avoiding shared account credentials.',
    },
    sec7: {
      tag: 'Retention Schedule',
      title: '7. Data Retention',
      intro:
        'We retain personal information only for as long as reasonably necessary to fulfill the business purposes for which it was collected, maintain active customer accounts, meet contractual obligations, satisfy legal, tax, and labor obligations, resolve disputes, and enforce agreements.',
      table: {
        thCategory: 'Data Category',
        thPurpose: 'Operational Purpose',
        thRetention: 'Retention Horizon',
        thRationale: 'Regulatory Rationale',
      },
      rules: [
        {
          category: 'Workforce & Employment Records',
          purpose:
            'Facilitating active employer-employee relationships and human resources administration.',
          retentionPeriod:
            'Duration of customer contract + 7 years (or statutory labor duration)',
          statutoryBasis: 'Labor & Employment Regulations',
        },
        {
          category: 'Payroll & Statutory Tax Filings',
          purpose:
            'Payroll disbursement auditing, tax withholding compliance, and national pension reporting.',
          retentionPeriod: '6 to 10 years following relevant financial year end',
          statutoryBasis: 'Financial Reporting & Tax Compliance',
        },
        {
          category: 'Authentication & Audit Logs',
          purpose:
            'System security monitoring, fraud prevention, forensic analysis, and platform integrity.',
          retentionPeriod: 'Rolling 12 to 24 months from timestamp generation',
          statutoryBasis: 'Legitimate Cybersecurity Interest',
        },
        {
          category: 'Customer Support & Correspondence',
          purpose:
            'Resolving disputes, documenting technical assistance, and training quality assurance.',
          retentionPeriod: '3 years following ticket resolution',
          statutoryBasis: 'Contractual Performance & Support',
        },
        {
          category: 'Marketing Consent & Lead Records',
          purpose:
            'Managing communication preferences and delivering requested product announcements.',
          retentionPeriod: 'Until consent is withdrawn / opt-out received',
          statutoryBasis: 'Explicit User Consent',
        },
      ],
      expirationNote:
        'Following the expiration of retention horizons, data is either securely scrubbed using cryptographic erasure methods or permanently anonymized for historical benchmarking.',
    },
    sec8: {
      tag: 'Statutory Rights',
      title: '8. Your Privacy Rights',
      intro:
        'Depending on your jurisdiction and applicable data protection legislation (such as the NDPR, GDPR, CCPA, or regional African and international data protection laws), you may possess specific rights regarding your personal information:',
      rights: [
        {
          name: 'Right of Access',
          desc: 'Request a copy of the personal information NextSoftHR holds concerning you.',
        },
        {
          name: 'Right to Rectification',
          desc: 'Request correction or updating of inaccurate or incomplete workforce records.',
        },
        {
          name: 'Right to Erasure',
          desc: 'Request deletion of personal records where there is no statutory obligation to retain them.',
        },
        {
          name: 'Right to Restriction',
          desc: 'Request temporary suspension of processing pending verification or legal disputes.',
        },
        {
          name: 'Right to Object',
          desc: 'Object to data processing conducted on the basis of legitimate business interests.',
        },
        {
          name: 'Right to Portability',
          desc: 'Obtain structured, machine-readable exports of data you have provided.',
        },
        {
          name: 'Withdrawal of Consent',
          desc: 'Withdraw consent at any time where processing relies exclusively on prior consent.',
        },
        {
          name: 'Complaint Lodgement',
          desc: 'Lodge a formal grievance with your relevant national data protection authority.',
        },
      ],
      ctaTitle: 'Need to Exercise Your Data Protection Rights?',
      ctaDesc:
        'Submit a formal request directly to our Data Protection Officer for swift resolution.',
      ctaButton: 'Request Privacy Assistance',
    },
    sec9: {
      tag: 'Role Separation',
      title: '9. Employee and Customer Data',
      intro:
        'Because NextSoftHR operates as a multi-tenant enterprise HR, payroll, and business management platform, it is crucial to recognize the legal distinction between:',
      processorTitle: 'NextSoftHR as a Service Provider (Data Processor)',
      processorDesc:
        'NextSoftHR provides the cloud infrastructure, software modules, and automated payroll pipelines. We process workforce data strictly pursuant to the written instructions, commercial agreements, and Data Processing Agreements (DPA) established with our corporate clients.',
      controllerTitle: 'Customer / Employer as Data Controller',
      controllerDesc:
        'The business customer (your employer or contracting entity) determines what employee information is uploaded, how attendance is monitored, what deductions apply, and which retention limits govern. Employers maintain their own independent legal obligations to their workforce.',
      employeeNoticeTitle: 'For Employees & Contractors:',
      employeeNoticeDesc:
        'If you are an employee utilizing NextSoftHR Employee Self-Service (ESS) and wish to access, correct, or delete your employment or payroll records, please direct your initial request to your employer’s HR department. NextSoftHR will assist your employer in fulfilling valid requests.',
    },
    sec10: {
      tag: 'Cross-Border Flow',
      title: '10. International Data Transfers',
      intro:
        'NextSoftHR operates across Africa and global markets. Consequently, information collected through our platform may be stored and processed in server facilities situated outside your home country or territory.',
      p2: 'Whenever we transfer personal information internationally, we ensure that appropriate safeguards are instituted in accordance with applicable data protection legislation. These safeguards include:',
      safeguards: [
        'Standard Contractual Clauses (SCCs) and Data Transfer Agreements incorporating strict confidentiality and technical security mandates.',
        'Transfer Impact Assessments (TIAs) evaluating local judicial standards and government access regulations.',
        'Regional data residency options for enterprise customers requiring workforce data to remain within specific domestic boundaries.',
      ],
    },
    sec11: {
      tag: 'Ecosystem Integrations',
      title: '11. Third-Party Services',
      intro:
        'Our platform enables seamless integrations with external services such as payment gateways, accounting systems, communication platforms, identity providers (SSO), analytics solutions, and cloud infrastructure.',
      p2: 'Please be advised that third-party services operate independently and are governed by their respective privacy notices and terms of service. When you enable third-party connectors, we strongly encourage reviewing their privacy documentation before authorizing data exchanges.',
    },
    sec12: {
      tag: 'Minor Safeguards',
      title: "12. Children's Privacy",
      intro:
        'NextSoftHR is an enterprise business-to-business (B2B) platform designed exclusively for organizations, employers, and working professionals. It is not directed to or intentionally designed to collect personal information from children under the age of 16 (or relevant statutory age of majority in your jurisdiction).',
      p2: 'If we discover that personal data of a minor has been collected without verifiable parental or guardian authorization, we will take immediate measures to delete such records from our databases.',
    },
    sec13: {
      tag: 'Commercial Communications',
      title: '13. Marketing Communications',
      intro:
        'NextSoftHR may periodically send promotional emails, product updates, feature release bulletins, and business newsletters to registered administrators or individuals who have expressly opted in to receive commercial notifications.',
      boxTitle: 'Unsubscribe from Marketing Communications',
      boxDesc:
        "You can opt out of non-essential marketing emails at any time by clicking the 'Unsubscribe' link situated in the footer of any marketing message, or by submitting your email below:",
      inputPlaceholder: 'Enter your email address',
      optOutButton: 'Opt Out',
      optOutSuccess:
        'Opt-out registered. Please allow up to 48 hours for marketing systems to synchronize.',
      transactionalNote:
        '*Please note that opt-out preferences do not apply to transactional, administrative, or critical service alerts (e.g. payroll completion notices, security alerts, invoice delivery).',
    },
    sec14: {
      tag: 'Intelligent Technology',
      title: '14. AI and Automated Processing',
      intro:
        'NextSoftHR incorporates modern, intelligent AI features engineered to simplify human resources administration and augment workplace productivity. Our AI functionalities may assist with:',
      features: [
        'HR policy queries and workforce FAQs',
        'Workforce analytics & attendance insights',
        'Payroll sanity checks & calculation assistance',
        'Employee onboarding workflow automation',
        'Aggregated business productivity analysis',
        'Shift scheduling & rota recommendations',
        'Administrative document template generation',
      ],
      governanceTitle: 'Responsible AI Governance & Human Oversight',
      governanceDesc:
        'Customers configure and administer AI capabilities responsibly within their corporate workspaces. Automated suggestions, drafted documents, and predictive workforce analytics serve solely as decision-support tooling and do not constitute binding legal, tax, or employment advice.',
      hitlTitle: 'Human-in-the-Loop Principle:',
      hitlDesc:
        'NextSoftHR strictly adheres to the principle that significant decisions having legal or similarly significant effects on employees (such as termination, disciplinary action, or compensation adjustments) must never be determined solely by automated processing without human verification.',
      disclaimer:
        'We do not make representations or warranties that AI-generated outputs are invariably error-free. Outputs must always be reviewed by authorized HR professionals before implementation.',
    },
    sec15: {
      tag: 'Revisions & History',
      title: '15. Changes to This Privacy Policy',
      intro:
        'NextSoftHR reserves the right to periodically modify and update this Privacy Policy to reflect modifications in our software services, regulatory standards, or operational processes.',
      p2: 'When material revisions occur, we will provide conspicuous advance notice through our application dashboards, email communications, or a prominent notice on our website prior to changes taking effect.',
      statusLabel: 'Current Policy Status:',
      effectiveLabel: 'Effective',
      hideHistory: 'Hide History',
      viewHistory: 'Version History',
    },
    sec16: {
      tag: 'Inquiries & DPO',
      title: '16. Contact Us',
      bannerTitle: 'Questions About Your Privacy?',
      bannerDesc:
        'If you have questions, concerns or requests regarding this Privacy Policy or the way NextSoftHR handles personal information, please contact our team.',
      orgLabel: 'Organization',
      websiteLabel: 'Official Website',
      hotlineLabel: 'Privacy Hotline',
      contactBtn: 'Contact Us',
      visitBtn: 'Visit NextSoftHR',
      formTitle: 'Submit an Official Privacy Request',
      formDesc:
        'Use this direct verification form to submit access, correction, erasure, or general privacy inquiries to our compliance desk.',
    },
  },
  requestForm: {
    receivedTitle: 'Privacy Request Received',
    receivedDesc:
      'Your inquiry has been assigned to NextSoftHR Data Protection Office. A confirmation receipt has been generated for your records.',
    ticketRef: 'Reference Ticket:',
    statutoryTime:
      'Under applicable regulations, requests are generally processed within 30 days following identity confirmation.',
    submitAnother: 'Submit Another Request',
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'e.g. Samuel Adebayo',
    orgLabel: 'Business / Organization',
    orgPlaceholder: 'e.g. Zenith Global Ltd',
    emailLabel: 'Official Email Address',
    emailPlaceholder: 'you@company.com',
    typeLabel: 'Request Type',
    types: {
      access: 'Access My Data (Subject Access Request)',
      correct: 'Correct My Data (Rectification)',
      delete: 'Delete My Data (Erasure)',
      question: 'Privacy Question / Guidance',
      security: 'Data Security Concern',
      other: 'Other Privacy Matter',
    },
    messageLabel: 'Detailed Request / Message',
    messagePlaceholder:
      'Please specify the workforce records or personal information involved, relevant employer account, or description of your question...',
    attachLabel: 'Supporting Verification / Document (Optional)',
    attachButton: 'Select Document (PDF, PNG, JPG ≤ 5MB)',
    consentText:
      'I confirm that I am authorized to submit this privacy request and consent to NextSoftHR verifying my identity using the provided contact details in accordance with applicable privacy laws.',
    submitBtn: 'Submit Privacy Request',
    submittingBtn: 'Transmitting Request...',
  },
  cookiesModal: {
    title: 'Cookie & Tracking Preferences',
    subtitle: 'Manage how NextSoftHR uses cookies and tracking technologies',
    intro:
      'NextSoftHR uses cookies and similar storage technologies to ensure platform availability, authenticate secure administrator sessions, analyze usage patterns, and deliver relevant communications. You can customize your preferences below.',
    essentialTitle: 'Strictly Essential Cookies',
    essentialTag: 'Required',
    essentialDesc:
      'Necessary for secure authentication, CSRF validation, load balancing, and session persistence. The platform cannot function without these.',
    alwaysActive: 'Always Active',
    functionalTitle: 'Functional & Preference Cookies',
    functionalDesc:
      'Remember your interface settings, language choice, dashboard module layout, and regional date/currency formatting.',
    analyticsTitle: 'Analytics & Diagnostic Cookies',
    analyticsDesc:
      'Aggregate, anonymized telemetry to help our engineering team measure feature adoption, diagnose page performance, and eliminate system bottlenecks.',
    marketingTitle: 'Marketing & Campaign Attribution',
    marketingDesc:
      'Measure the effectiveness of business outreach and ensure you receive only relevant platform feature announcements.',
    savedSuccess: 'Preferences saved successfully to local storage.',
    rejectOptional: 'Reject Optional',
    acceptAll: 'Accept All',
    savePreferences: 'Save Preferences',
  },
  adminModal: {
    title: 'Admin Notice Configuration',
    subtitle:
      'Update legal effective date & version without redeploying code',
    banner:
      'Administrators can change the publication notice date, legal version marker, and contact references. Changes are immediately reflected across hero metadata and footer.',
    dateLabel: 'Effective Date Displayed',
    versionLabel: 'Policy Version Identifier',
    orgLabel: 'Organization:',
    hotlineLabel: 'Hotline:',
    savedNotice: 'Notice details updated and saved successfully!',
    resetBtn: 'Reset Default',
    cancelBtn: 'Cancel',
    applyBtn: 'Apply Notice',
  },
  trust: {
    tag: 'NextSoftHR Security Architecture',
    title: 'Built With Privacy and Security in Mind',
    subtitle:
      'Our multi-tenant HR, payroll, and enterprise management platform is engineered from the ground up to protect workforce data dignity and maintain corporate confidentiality.',
    cards: [
      {
        title: 'Data Protection',
        desc: 'Designed to help businesses protect sensitive workforce information through multi-layered encryption, isolated tenant partitions, and resilience controls.',
        badge: 'Zero Knowledge At Rest',
      },
      {
        title: 'Secure Access',
        desc: 'Role-based access controls, granular administrative permission tiers, multi-factor authentication, and centralized session monitoring.',
        badge: 'RBAC & MFA',
      },
      {
        title: 'Responsible Data Management',
        desc: 'Tools designed to help organizations manage business and employee information responsibly, from automated retention to verifiable audit trails.',
        badge: 'Compliance Tooling',
      },
      {
        title: 'Global Business Support',
        desc: 'Built for organizations operating across Africa and international markets, adapting to multi-currency payroll, local labor laws, and cross-border safeguards.',
        badge: 'African & Global SaaS',
      },
    ],
    readyText: 'Enterprise Ready',
  },
  footer: {
    desc: 'Global HR, Payroll and Business Management Platform designed for micro, small, medium and large enterprises across Africa and worldwide.',
    platformTitle: 'Platform',
    businessTitle: 'Business',
    resourcesTitle: 'Resources',
    legalTitle: 'Legal & Trust',
    backToTop: 'Back to Top',
    allRightsReserved: 'All Rights Reserved.',
    tagline: 'Global SaaS Workforce & Payroll Architecture',
  },
  liveChat: {
    buttonLabel: 'Live Chat',
    statusOnline: 'Support Agents Online',
    headerTitle: 'NextSoftHR Live Support Desk',
    replyTime: 'Typically replies in under 5 minutes',
    tabChat: 'Chat with Agent',
    tabChannels: 'Direct Channels',
    tabFaq: 'Quick FAQs',
    departmentLabel: 'Inquiry Category:',
    departments: {
      privacy: 'Data Privacy & DPO Desk',
      hr: 'HR & Payroll Advisory',
      technical: 'Platform & Cloud Technical Support',
      billing: 'Billing & Subscriptions',
    },
    initialAgentGreeting:
      'Hello! Welcome to NextSoftHR Live Support. Our human support agents are online to assist with your workforce, payroll, or privacy questions. How can we assist your organization today?',
    placeholder: 'Type your message to an agent...',
    sendButton: 'Send',
    agentTyping: 'Agent is typing...',
    callDirect: 'Call Phone Hotline',
    whatsappChat: 'Chat on WhatsApp',
    emailDesk: 'Email Support Desk',
    operatingHours: 'Monday – Saturday: 8:00 AM – 6:00 PM (WAT / GMT+1)',
    operatingHoursTitle: 'Support Desk Hours',
    needPrivacyAssistance: 'Looking to submit a formal data protection request?',
    privacyFormBtn: 'Open DPO Request Form',
    close: 'Close chat',
    minimize: 'Minimize',
  },
};
