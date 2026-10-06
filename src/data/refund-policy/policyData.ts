export interface PolicySection {
  id: string;
  number: number;
  title: string;
  category: 'Overview' | 'Customers' | 'Partners & Channel' | 'Commercial & Legal';
  summary: string;
  content: string[];
  subsections?: {
    subtitle: string;
    body: string;
    bulletPoints?: string[];
  }[];
  callout?: {
    type: 'info' | 'warning' | 'notice' | 'important';
    title?: string;
    text: string;
  };
  actions?: {
    label: string;
    actionType: 'refund-modal' | 'partner-modal' | 'support-modal' | 'terms-link' | 'privacy-link';
  }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Customers' | 'Partners' | 'Billing' | 'Services';
}

export const POLICY_META = {
  effectiveDate: 'January 1, 2026',
  lastUpdated: 'September 30, 2026',
  version: '3.4.1 (Enterprise Global)',
  companyName: 'NextSoftHR',
  website: 'www.nextsofthr.org',
  websiteUrl: 'https://www.nextsofthr.org',
  phone: '+2349158482622',
  email: 'billing@nextsofthr.org',
  partnerEmail: 'partners@nextsofthr.org',
  supportHours: 'Monday – Friday, 8:00 AM – 6:00 PM (WAT / UTC+1) with 24/7 Priority SLA for Enterprise Tier',
};

export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'section-1',
    number: 1,
    title: 'Policy Overview',
    category: 'Overview',
    summary: 'Establishes the binding framework governing cancellations, refunds, credits, subscription billings, and commercial adjustments across all NextSoftHR platforms and partner ecosystems.',
    content: [
      'This Refund, Cancellation, Credit & Payment Policy ("Policy") sets forth the contractual rules and operational guidelines governing refunds, subscription cancellations, service credits, and commercial balance adjustments for NextSoftHR, a global HR, Payroll, and Business Management platform.',
      'NextSoftHR serves micro, small, medium, and large enterprise businesses worldwide, as well as an extensive ecosystem of authorized distributors, value-added resellers, affiliates, referral partners, and system integrators. Because our product offerings encompass cloud-based multi-tenant software, dedicated private cloud deployments, API integrations, and hands-on consulting services, commercial rules differ based on transactional context.',
      'Different commercial and refund rules apply depending on:',
    ],
    subsections: [
      {
        subtitle: 'Variables Governing Applicability',
        body: 'Every transaction is evaluated in light of specific contractual and jurisdictional parameters:',
        bulletPoints: [
          'Subscription type (Self-service monthly, annual committed contracts, or multi-year enterprise agreements)',
          'Billing frequency (Monthly, quarterly, semi-annual, or annual advance billing)',
          'Product or module purchased (Core HR, Payroll Engine, Talent Acquisition, CRM, Finance, AI Modules, etc.)',
          'Payment method (Corporate card, direct debit / ACH, wire transfer, mobile money, or partner ledger credit)',
          'Promotional offers, introductory rate lock-ins, or discounted commercial bundles',
          'Signed custom Master Services Agreements (MSA), Statements of Work (SOW), or executed Order Forms',
          'Delivery status of implementation, payroll configuration, data migration, or professional services',
          'Reseller, Distributor, or Channel Partner Agreement terms and designated commercial authorizations',
          'Applicable mandatory statutory laws in the jurisdiction where the customer or business entity is domiciled',
        ],
      },
      {
        subtitle: 'Contractual Precedence & Order of Governance',
        body: 'Where a customer or partner has executed a bespoke written Master Services Agreement, Enterprise Order Form, Reseller Agreement, or Distributor Contract signed by an authorized corporate officer of NextSoftHR, the specific refund, cancellation, and payment terms contained in that signed instrument shall supersede and govern any conflicting provisions of this general Policy.',
      },
    ],
  },
  {
    id: 'section-2',
    number: 2,
    title: 'Customer Subscription Refunds',
    category: 'Customers',
    summary: 'Detailed billing rules for monthly and annual subscriptions, recurring renewals, mid-cycle upgrades, and plan downgrades.',
    content: [
      'NextSoftHR provides subscription access on a recurring billing cycle. Subscription fees are payable in advance of the applicable billing period and grant non-exclusive access to the platform and associated services.',
    ],
    subsections: [
      {
        subtitle: 'Monthly Subscriptions',
        body: 'Monthly subscriptions are billed in advance on a recurring monthly anniversary date. Customers may cancel their monthly subscription at any time prior to the scheduled generation of the next recurring invoice. Because platform access, server compute capacity, and storage allocations remain fully provisioned throughout the active term, payments for monthly subscriptions are strictly non-refundable for the current billing cycle, and no prorated cash refunds are issued for unused days during that cycle.',
      },
      {
        subtitle: 'Annual Subscriptions',
        body: 'Annual subscriptions provide customers with significant preferential pricing and resource reservations in exchange for a twelve (12) month commercial commitment. Customers may elect not to renew their annual subscription at the conclusion of the 12-month period. Once paid, annual subscription fees are generally non-refundable after the initial fourteen (14) calendar day grace window from the initial purchase date. If a cancellation is requested after day 14, access will continue uninterrupted until the end of the 12-month term, with no mid-contract partial cash refund.',
      },
      {
        subtitle: 'Subscription Upgrades',
        body: 'Customers may upgrade their plan tier, employee seat count, or module portfolio at any time. When an upgrade occurs mid-billing cycle, NextSoftHR calculates a prorated charge for the remaining duration of the active billing period. The upgraded features and higher capacity tiers become operational immediately upon payment verification.',
      },
      {
        subtitle: 'Subscription Downgrades',
        body: 'Customers may request a downgrade to a lower tier or reduce active employee seat limits. Downgrades take effect at the commencement of the subsequent billing cycle. NextSoftHR does not issue retroactive cash refunds or mid-cycle prorated refunds for downgrades processed while a current billing period is in progress.',
      },
      {
        subtitle: 'Automatic Renewals',
        body: 'All subscriptions automatically renew at the conclusion of their respective billing cycle unless cancelled prior to the renewal date. NextSoftHR transmits courtesy billing renewal notifications via email at least fourteen (14) days prior to annual subscription renewals. Customers may manage renewal settings directly within their NextSoftHR Admin Console under Billing & Licenses.',
      },
    ],
  },
  {
    id: 'section-3',
    number: 3,
    title: 'Free Trial Policy',
    category: 'Customers',
    summary: 'Guidelines governing the 14-day free trial, feature testing, expiration protocols, auto-conversion rules, and fair use requirements.',
    content: [
      'NextSoftHR makes available a zero-obligation 14-day Free Trial to allow prospective business customers to evaluate our comprehensive HR, payroll, attendance, and business management suite in an authentic environment.',
    ],
    subsections: [
      {
        subtitle: 'Trial Eligibility & Account Creation',
        body: 'Free trials are made available strictly to legitimate business entities, corporate HR departments, and certified professionals evaluating the platform for bona fide organizational operations. Free trials are limited to one (1) trial instance per company, corporate domain, and legal tax entity.',
      },
      {
        subtitle: 'Payment Information & Auto-Conversion Safeguards',
        body: 'For standard self-service trials, payment card details are not mandatory to commence evaluation. If a trial user voluntarily inputs billing information to unlock automated transition to a paid plan upon trial expiration, NextSoftHR will clearly display the forthcoming billing date, tier rate, and provide an explicit opt-out toggle. You will not be billed during the active 14-day trial period.',
      },
      {
        subtitle: 'Trial Expiration & Data Availability',
        body: 'Upon reaching the 14th day of the trial without an active paid subscription conversion, access to live platform workflows is placed in read-only standby status. Trial data is preserved in encrypted storage for thirty (30) calendar days to permit effortless activation. If unactivated after 30 days, trial databases are permanently sanitized in accordance with our data protection policies.',
      },
      {
        subtitle: 'Prevention of Repeated & Abusive Trial Usage',
        body: 'Registering multiple trial accounts under disposable email addresses, synthetic corporate aliases, or revolving identities to circumvent paid subscriptions constitutes a material violation of our Terms of Service. NextSoftHR reserves the unreserved right to immediately terminate such accounts without notice and bar future access.',
      },
    ],
  },
  {
    id: 'section-4',
    number: 4,
    title: 'Refund Eligibility',
    category: 'Customers',
    summary: 'Exhaustive specification of scenarios where a commercial refund may be authorized upon documented review and verification.',
    content: [
      'While NextSoftHR operates under a general policy of non-refundable digital service consumption, we are committed to uncompromising fairness and commercial integrity. A refund or account credit may be approved under the following verified conditions:',
    ],
    subsections: [
      {
        subtitle: 'Recognized Refund Circumstances',
        body: 'All refund requests must be formally submitted through our verified billing portal or designated support queue for validation against the following criteria:',
        bulletPoints: [
          'Duplicate Payment: Instances where banking system latency, gateway re-tries, or administrative oversight resulted in a customer being billed more than once for the exact same billing period or invoice.',
          'NextSoftHR Billing Error: Documented calculation discrepancies, improper tariff classification, or administrative billing glitches directly originating from NextSoftHR systems.',
          'Verified Unauthorized Transaction: Proven fraudulent charges on a stolen corporate card or payment instrument, provided prompt notification is supplied prior to legitimate platform consumption.',
          'Material Unresolved Service Outage: Prolonged, systemic platform failure directly attributable to NextSoftHR infrastructure that prevents core operational use (e.g., total inability to execute scheduled payroll runs) for more than forty-eight (48) consecutive hours, where our engineering team cannot provide an alternative resolution.',
          'Post-Cancellation Charge: A verified charge executed after a customer timely and properly submitted a valid cancellation request in full compliance with Section 6.',
          'Mandatory Consumer Protection Statutes: Any situation where applicable statutory law in the customer domicile creates an non-waivable statutory right of rescission or cooling-off period.',
      ],
      },
    ],
    callout: {
      type: 'notice',
      title: 'Important Clarification on Non-Use',
      text: 'A customer choosing not to log in, unread training materials, internal personnel turnover, or internal change of corporate strategy does NOT constitute grounds for a refund. Cloud resources and computing capacity are reserved continuously upon account provisioning.',
    },
  },
  {
    id: 'section-5',
    number: 5,
    title: 'Non-Refundable Items',
    category: 'Customers',
    summary: 'Clear demarcation of operational expenses, consumed resources, and professional services that are strictly non-refundable.',
    content: [
      'To sustain institutional reliability and provide world-class infrastructure, certain incurred expenses and delivered milestones cannot be recouped or credited under any circumstances, subject always to mandatory local consumer protection statutes.',
      'The following goods, services, and transactions are strictly non-refundable:',
    ],
    subsections: [
      {
        subtitle: 'Comprehensive Schedule of Non-Refundable Items',
        body: 'Customers and partners acknowledge that fees associated with the following categories are fully earned upon commencement or delivery:',
        bulletPoints: [
          'Subscription periods already consumed or partially elapsed prior to a cancellation request',
          'Partial or residual days remaining within an active monthly billing period following cancellation',
          'Account initialization, tenant provisioning, and initial system onboarding fees once environment is deployed',
          'Delivered training programs, administrative webinars, and interactive knowledge-transfer sessions',
          'Implementation services, technical workflow consulting, and payroll architecture configuration already performed',
          'Custom software development, custom reporting queries, bespoke API connectors, or ERP integration coding',
          'Third-party costs, including SMS notification gateway bundles, biometric hardware integrations, or bank verification fees',
          'Non-recoverable merchant processing fees, payment gateway surcharge deductions, and international wire clearing charges',
          'Promotional subscriptions, end-of-year discounted bundles, or heavily subsidized multi-year corporate agreements where explicitly marked as final sale',
          'Expenses, disbursements, or travel costs incurred specifically on behalf of the customer with prior written authorization',
        ],
      },
    ],
    callout: {
      type: 'important',
      title: 'Statutory Consumer Rights Protected',
      text: 'Nothing in this Policy shall be construed to limit, exclude, or modify any mandatory statutory consumer rights, implied warranties, or statutory refund remedies that cannot legally be excluded under applicable Nigerian federal or state laws, or the consumer protection regulations of any jurisdiction where NextSoftHR conducts business.',
    },
  },
  {
    id: 'section-6',
    number: 6,
    title: 'Cancellation Policy',
    category: 'Customers',
    summary: 'Standardized 6-step operational procedure for requesting and processing subscription cancellations with zero hidden barriers.',
    content: [
      'NextSoftHR believes in customer autonomy. We do not impose artificial hurdles or retaliatory retention locks when an organization decides to discontinue services.',
      'Customers may cancel their subscription at any time using the formal 6-step procedure below:',
    ],
    subsections: [
      {
        subtitle: 'Standardized 6-Step Cancellation Workflow',
        body: 'To ensure data security and avoid unauthorized disruption to mission-critical HR records, cancellations must follow this path:',
        bulletPoints: [
          'Step 1 — Authentication: An authorized Primary Admin or Billing Owner logs into the NextSoftHR Admin Console (or submits a verified signed request from the registered corporate domain).',
          'Step 2 — Request Submission: Navigate to Settings → Billing & Plans → Subscription Details and select "Request Cancellation", or email billing@nextsofthr.org with corporate authorization.',
          'Step 3 — Identity & Authority Verification: NextSoftHR automated security checks verify corporate credentials and authorization level to prevent malicious or accidental disruption of employee payroll records.',
          'Step 4 — Processing & Scheduled Stop: The cancellation request is logged into our billing registry; all future recurring automated invoice generation is permanently halted.',
          'Step 5 — Formal Confirmation Notice: The account administrator immediately receives an official system confirmation timestamp and a statement detailing the exact expiration date.',
          'Step 6 — Continued Access Grace: Complete platform access, reporting features, and workflow execution continue uninterrupted until 11:59 PM UTC on the final day of the active paid billing cycle.',
        ],
      },
    ],
    callout: {
      type: 'info',
      title: 'Cancellation vs. Refund Distinction',
      text: 'Submitting a cancellation terminates future automated billing obligations. It does not retroactively generate an entitlement to a cash refund for the balance of the current active cycle.',
    },
  },
  {
    id: 'section-7',
    number: 7,
    title: 'Effect of Cancellation',
    category: 'Customers',
    summary: 'Legal, operational, and data governance implications following subscription termination, including data export grace periods.',
    content: [
      'Following the submission and processing of an official cancellation request, the commercial and technical relationship transitions according to clear operational safeguards:',
    ],
    subsections: [
      {
        subtitle: 'Billing & Commercial Transition',
        body: 'All recurring billing mandates, card debits, and automated payment tokens are deactivated. Outstanding unpaid invoices for services already delivered prior to cancellation remain fully due and legally payable.',
      },
      {
        subtitle: 'Platform Access & Operational Continuity',
        body: 'Access to employee profiles, payroll calculation engines, attendance logs, and administrative dashboards continues without feature reduction until the final calendar day of the paid term. NextSoftHR does not arbitrarily truncate access prematurely.',
      },
      {
        subtitle: 'Data Export, Retention & Privacy Safeguards',
        body: 'Because payroll and personnel records are subject to strict national labor standards and statutory audit mandates, NextSoftHR provides a comprehensive thirty (30) day Data Export Window following subscription expiration. During this 30-day window, account administrators may download complete organizational archives (CSV, Excel, and encrypted PDF formats) at zero additional cost. Following the 30-day grace window, account databases are permanently scrubbed in full compliance with the NextSoftHR Privacy Policy and applicable data protection legislation.',
      },
    ],
    actions: [
      { label: 'Review Privacy Policy', actionType: 'privacy-link' },
      { label: 'Review Terms & Conditions', actionType: 'terms-link' },
    ],
  },
  {
    id: 'section-8',
    number: 8,
    title: 'Add-On Module Refunds',
    category: 'Customers',
    summary: 'Specific policies governing modular extensions such as Payroll, Attendance, CRM, Finance, ESS, MSS, and AI Intelligence tools.',
    content: [
      'NextSoftHR features a modular ecosystem that enables organizations to scale functionality as business needs evolve. Customers may independently license modular add-ons alongside their core subscription.',
      'Covered modular extensions include:',
    ],
    subsections: [
      {
        subtitle: 'Supported Modular Portfolio',
        body: 'The provisions of this section govern all standalone or bundled module purchases:',
        bulletPoints: [
          'Core HR & Employee Directory',
          'Automated Multi-Jurisdiction Payroll & Tax Engine',
          'Time & Attendance with Geofencing and Biometrics',
          'Leave & Absence Management',
          'Shift & Workforce Scheduling',
          'Talent Acquisition, ATS & Onboarding',
          'Enterprise CRM & Client Relationship Pipeline',
          'Corporate Finance, Expense Management & Invoicing',
          'Project & Task Management Suite',
          'Employee Self-Service (ESS) Mobile & Web Portals',
          'Manager Self-Service (MSS) Approvals & Team Metrics',
          'AI-Powered HR Predictive Analytics & Document Extraction',
          'AI Payroll Compliance & Anomaly Detection Tools',
          'Future specialized modules released into the NextSoftHR App Center',
        ],
      },
      {
        subtitle: 'Independent Cancellation & Billing Mechanics',
        body: 'Cancelling or deactivating an individual add-on module (e.g., removing the AI Payroll Anomaly tool) does NOT cancel or impact your base NextSoftHR subscription or other active modules unless expressly instructed. Deactivated modules remain accessible through the end of their current billing period. Add-on fees are non-refundable for the active billing period in which deactivation is requested.',
      },
    ],
  },
  {
    id: 'section-9',
    number: 9,
    title: 'Implementation, Training & Professional Services',
    category: 'Commercial & Legal',
    summary: 'Milestone-based compensation, credit adjustments, and refund limits for data migration, setup, payroll configuration, and custom integrations.',
    content: [
      'NextSoftHR maintains an elite professional services practice providing turnkey setup, legacy payroll migration, HR workflow consulting, and custom integration engineering. Because these engagements deploy specialized personnel and technical engineering hours, refundability is strictly calibrated to milestone delivery.',
    ],
    subsections: [
      {
        subtitle: 'Milestone-Based Refundability Framework',
        body: 'Refund eligibility for professional services is evaluated strictly against the progress of executed Statements of Work (SOW):',
        bulletPoints: [
          'Milestone Stage 1 — Not Started: Where a customer cancels professional services prior to kickoff, requirements discovery, or allocation of engineering hours, NextSoftHR will refund 100% of the prepaid service fee, less a 5% administrative intake processing fee.',
          'Milestone Stage 2 — Commenced but Under 50% Delivered: Where project discovery, schema mapping, or initial configuration has commenced but less than 50% of agreed scope is completed, NextSoftHR may issue a 50% commercial service credit toward future software subscriptions or a 35% partial cash refund upon mutual agreement.',
          'Milestone Stage 3 — Substantially Completed (50% to 90%): Where data migration scripts have executed, custom reports have been built, or user acceptance testing (UAT) has initiated, no cash refunds will be authorized. At NextSoftHR sole discretion, a service credit of up to 20% of the service fee may be allocated for future platform expansion.',
          'Milestone Stage 4 — Fully Delivered (Sign-off or Deployment): Once payroll configuration has completed, live data imported, or training conducted, professional service fees are 100% non-refundable under all circumstances.',
        ],
      },
      {
        subtitle: 'Service Credits vs. Cash Payouts',
        body: 'NextSoftHR reserves the right to issue non-expiring platform service credits in lieu of cash refunds for professional service adjustments, providing clients with ongoing purchasing power across our software suite.',
      },
    ],
  },
  {
    id: 'section-10',
    number: 10,
    title: 'Payment Disputes & Chargebacks',
    category: 'Commercial & Legal',
    summary: 'Binding protocol for resolving billing issues amicably, preventative dialogue obligations, and remedies for fraudulent chargeback filings.',
    content: [
      'NextSoftHR is dedicated to swift, courteous resolution of all commercial inquiries. We strongly encourage customers to engage directly with our billing operations team prior to escalating claims to external payment processors or banking institutions.',
    ],
    subsections: [
      {
        subtitle: 'Obligation of Good-Faith Consultation',
        body: 'Customers agree to contact billing@nextsofthr.org or call our billing desk at +2349158482622 with invoice numbers and transaction proofs before filing a dispute or chargeback with their credit card issuer, bank, or payment facilitator. Most discrepancies are audited and reconciled within two to three (2–3) business days without adversarial friction.',
      },
      {
        subtitle: 'Consequences of Unjustified or Fraudulent Chargebacks',
        body: 'Filing a payment chargeback while actively utilizing the platform, without prior notification or valid cause, creates severe operational disruption. Where a chargeback is determined to be fraudulent, abusive, or filed in bad faith, NextSoftHR reserves the legal right to:',
        bulletPoints: [
          'Immediately suspend platform access to prevent unauthorized utilization of services',
          'Initiate an expedited compliance audit into the transaction and user access logs',
          'Recover legitimate outstanding subscription amounts, including payment network chargeback dispute penalties ($50 USD or local equivalent per occurrence)',
          'Permanently terminate enterprise accounts and prohibit corporate entity officers from future registrations',
          'Pursue available civil remedies for recovery of contractual debts and associated legal representation fees',
        ],
      },
      {
        subtitle: 'Preservation of Lawful Financial Rights',
        body: 'Nothing in this section is intended to override or negate legitimate consumer dispute rights granted by national banking regulators, Visa, Mastercard, Interswitch, or applicable consumer credit statutory provisions.',
      },
    ],
  },
  {
    id: 'section-11',
    number: 11,
    title: 'Reseller Refund Policy',
    category: 'Partners & Channel',
    summary: 'Commercial guidelines for authorized Value-Added Resellers (VARs), end-customer refund alignment, and reseller commission adjustments.',
    content: [
      'NextSoftHR partners with authorized Value-Added Resellers (VARs) who bundle our enterprise platform with local advisory, managed payroll, and accounting services. Resellers operate under specific contractual covenants.',
    ],
    subsections: [
      {
        subtitle: 'Reseller Contractual Authority & Alignment',
        body: 'Resellers act as independent commercial contractors under the NextSoftHR Master Reseller Agreement. Resellers may not offer, promise, or execute refund terms, cancellation windows, or commercial warranties that differ from or exceed the standards articulated in this official Policy without prior written authorization from NextSoftHR.',
      },
      {
        subtitle: 'End-Customer Refund Workflow via Resellers',
        body: 'When an end-customer purchasing through a reseller seeks a refund, the request must be submitted through the reseller channel portal. NextSoftHR audits the platform metrics, license provisioning records, and payment settlements. If an end-customer refund is mandated by law or authorized by NextSoftHR, the financial settlement is reconciled through the reseller account ledger.',
      },
      {
        subtitle: 'Impact on Reseller Margins & Commissions',
        body: 'Approved refunds directly reduce the underlying commissionable transaction value. Any margins, commissions, or rebates previously credited or disbursed to the reseller with respect to refunded fees will be clawed back or debited against the reseller next commission statement.',
      },
    ],
    callout: {
      type: 'warning',
      title: 'Reseller Advertising Covenant',
      text: 'Resellers must not advertise refund guarantees, "30-day money-back promises", or commercial concessions that differ from NextSoftHR official policies without written authorization from NextSoftHR Executive Management.',
    },
  },
  {
    id: 'section-12',
    number: 12,
    title: 'Distributor Refund Policy',
    category: 'Partners & Channel',
    summary: 'Framework governing wholesale distributors, bulk license commitments, prepaid allocation banks, and credit adjustments.',
    content: [
      'Authorized NextSoftHR Master Distributors purchase wholesale enterprise licenses, multi-tenant server blocks, and bulk subscription allocations for distribution to downstream sub-resellers and corporate enterprises.',
    ],
    subsections: [
      {
        subtitle: 'Bulk License Commitments & Prepaid Allocations',
        body: 'Distributor transactions are executed via binding Purchase Orders (POs) and volume-tier distribution schedules. Wholesale licenses purchased in bulk blocks are non-refundable once allocated and provisioned in the NextSoftHR Global Distributor Console.',
      },
      {
        subtitle: 'Unused License Seat Banks & Allocation Credits',
        body: 'Distributors maintain an active license pool. While cash refunds are not issued for unallocated license capacity, distributors may request a rollover or reallocation of unused prepaid seats into alternative product modules (e.g., converting surplus CRM seats into Payroll seats) subject to the terms of their Distribution Master Agreement.',
      },
      {
        subtitle: 'Distributor-Initiated Cancellations & Credit Notes',
        body: 'If a downstream enterprise client cancels a contract for valid cause covered under NextSoftHR SLA terms, NextSoftHR will issue an authorized Commercial Credit Note to the distributor account, applied against forthcoming wholesale billing cycles.',
      },
    ],
  },
  {
    id: 'section-13',
    number: 13,
    title: 'Partner & Affiliate Refund Policy',
    category: 'Partners & Channel',
    summary: 'Rules governing referral partners, affiliate marketers, accounting consultants, technology integrators, and channel associates.',
    content: [
      'The NextSoftHR Partner Program embraces Affiliates, Referral Partners, Technology Ecosystem Partners, Certified HR Consultants, and Accounting Alliances. Partner referral rewards are tied directly to verified, settled client revenue.',
    ],
    subsections: [
      {
        subtitle: 'Commission Contingency & Qualification',
        body: 'Affiliate and referral commissions are accrued conditionally and become finalized only after the referred client has completed the applicable cancellation/cooling-off period (minimum 30 calendar days from initial settlement) without initiating a refund, chargeback, or non-payment default.',
      },
      {
        subtitle: 'Partner Commission Adjustments',
        body: 'Partner earnings are adjusted or cancelled where:',
        bulletPoints: [
          'A referred customer receives an approved refund or billing credit under this Policy',
          'A transaction is cancelled or rescinded by the customer within the initial grace window',
          'A payment is reversed by a merchant processor or acquiring banking network',
          'An unauthorized chargeback or payment recall is initiated against the transaction',
          'A referred transaction is determined upon investigation to involve self-referral, affiliate fraud, or collusive bidding',
          'A customer fails to clear ongoing recurring invoices, resulting in subscription termination',
        ],
      },
    ],
  },
  {
    id: 'section-14',
    number: 14,
    title: 'Commission Reversals',
    category: 'Partners & Channel',
    summary: 'High-visibility rules on how customer refunds, chargebacks, and payment clawbacks directly impact partner commissions and account balances.',
    content: [
      'At NextSoftHR, we maintain transparent, sustainable commercial partnerships. Because referral rewards are derived from bona fide software revenue, any post-settlement refund directly alters commission balances.',
    ],
    subsections: [
      {
        subtitle: 'Clawback & Offset Mechanics',
        body: 'Where an approved refund, cancellation, chargeback, or payment reversal relates to a partner-referred customer, NextSoftHR reserves the right to execute the following financial adjustments:',
        bulletPoints: [
          'Reverse Unpaid Accruals: Immediately cancel any pending, unreleased commissions linked to the refunded transaction.',
          'Deduct from Future Disbursements: Offset previously disbursed commissions against upcoming monthly partner payout cycles until the balance is fully reconciled.',
          'Issue Account Adjustments: Record an adjusting debit entry on the partner commercial ledger.',
          'Temporary Escrow Holds: Place disputed commissions on administrative hold while a compliance review or fraud investigation is completed.',
        ],
      },
      {
        subtitle: 'Partner Statement Audit Rights',
        body: 'Partners receive transparent reconciliation statements showing original transaction IDs, refund timestamps, and adjustment line items. Partners may submit an audit inquiry to partners@nextsofthr.org within thirty (30) days of receiving an adjustment statement.',
      },
    ],
    callout: {
      type: 'warning',
      title: 'Refunds Can Directly Affect Partner Commissions',
      text: 'Partners acknowledge that commission eligibility requires final, non-refundable revenue collection. In the event of a customer refund or chargeback, corresponding commission amounts will be reversed or offset in accordance with the Partner Agreement.',
    },
  },
  {
    id: 'section-15',
    number: 15,
    title: 'Promotional Offers & Discounts',
    category: 'Commercial & Legal',
    summary: 'Terms governing seasonal discounts, bundle incentives, coupon codes, multi-year rate freezes, and enterprise launch credits.',
    content: [
      'NextSoftHR periodically offers special promotional pricing, launch discounts, bundle vouchers, and extended-term introductory rates.',
    ],
    subsections: [
      {
        subtitle: 'Promotional Terms Transparency',
        body: 'All promotional packages, introductory rate discounts, free-month incentives, and annual prepay discounts are governed by the specific terms disclosed at checkout or on the executed Order Form. Unless expressly stated otherwise, promotional subscriptions and heavily discounted bundles are strictly non-refundable and non-exchangeable once provisioned.',
      },
      {
        subtitle: 'Revocation of Promotional Discounts Upon Early Termination',
        body: 'Where an enterprise customer was granted preferential volume pricing or waived onboarding fees predicated on a multi-year or annual commitment, early termination by the customer prior to contract conclusion will forfeit all promotional price reductions, and standard list prices will be retroactively calculated against services delivered.',
      },
    ],
  },
  {
    id: 'section-16',
    number: 16,
    title: 'Refund Method & Processing Time',
    category: 'Commercial & Legal',
    summary: 'Standard operational timelines, banking rail clearance windows, and original payment rail security requirements.',
    content: [
      'To prevent financial laundering and comply with global anti-fraud and banking compliance standards, approved refunds are returned strictly to the original payment instrument used for the purchase.',
    ],
    subsections: [
      {
        subtitle: 'Original Payment Rail Requirement',
        body: 'Refunds cannot be redirected to third-party bank accounts, alternate credit cards, or unrelated digital wallets. If the original payment card has expired or closed, the refund will still be routed to the card issuer, where the customer financial institution will reallocate the funds to the active account.',
      },
      {
        subtitle: 'Operational Processing Timelines',
        body: 'Refunds require two distinct stages of operational processing:',
        bulletPoints: [
          'NextSoftHR Internal Audit & Authorization: Completed within five to seven (5–7) business days following receipt of all required supporting documentation and verification.',
          'Interbank & Card Network Settlement: Once authorized by NextSoftHR, acquiring banks, credit card networks (Visa/Mastercard), and domestic clearing houses typically require an additional three to ten (3–10) business days to post credits to the customer statement.',
          'International Wire Transfers: International cross-border SWIFT wire settlements may require five to twelve (5–12) business days depending on intermediary correspondent banking institutions.',
        ],
      },
    ],
    callout: {
      type: 'info',
      title: 'Realistic Processing Schedule',
      text: 'NextSoftHR processes internal approvals rapidly. However, because final cardholder crediting depends entirely on the customer banking institution and international payment rails, NextSoftHR does not warrant exact calendar settlement dates beyond our direct control.',
    },
  },
  {
    id: 'section-17',
    number: 17,
    title: 'How to Request a Refund',
    category: 'Customers',
    summary: 'Step-by-step instructions and required documentation checklist for submitting a verified customer refund claim.',
    content: [
      'Customers who believe they meet the eligibility criteria defined in Section 4 may submit a formal request through our secure billing desk.',
      'Follow the 5-step procedure below:',
    ],
    subsections: [
      {
        subtitle: '5-Step Refund Application Protocol',
        body: 'Submitting a complete file ensures rapid review without repetitive email cycles:',
        bulletPoints: [
          'Step 1 — Contact Support: Navigate to the NextSoftHR Support Desk or submit an electronic ticket to billing@nextsofthr.org (or use the interactive "Submit a Refund Request" button below).',
          'Step 2 — Provide Required File Details: Ensure your request includes: (1) Registered Company Legal Name, (2) Primary Account Email, (3) NextSoftHR Invoice Number, (4) Payment Transaction Reference / Gateway ID, (5) Date and Currency of Payment, (6) Exact Amount Requested, and (7) Detailed statement outlining the basis for the refund.',
          'Step 3 — Operational Review: NextSoftHR billing specialists audit server logs, transaction timestamps, and account status within 48 to 72 business hours.',
          'Step 4 — Decision Notification: The authorized account holder receives an official written determination detailing whether the request was Approved, Partially Approved (Credit), or Declined.',
          'Step 5 — Execution: If approved, credit notes or electronic payment reversals are generated within 5 business days, accompanied by formal settlement vouchers.',
        ],
      },
    ],
    actions: [
      { label: 'Submit a Refund Request', actionType: 'refund-modal' },
    ],
  },
  {
    id: 'section-18',
    number: 18,
    title: 'Partner Refund Request Process',
    category: 'Partners & Channel',
    summary: 'Dedicated reconciliation pipeline for Resellers, Distributors, Affiliates, and Technology Alliances.',
    content: [
      'To maintain strict accounting integrity and audit trails across channel operations, partner transactions undergo an integrated multi-tier review process.',
    ],
    subsections: [
      {
        subtitle: 'Partner Operational Sequence',
        body: 'The partner refund and adjustment lifecycle operates through this sequence:',
        bulletPoints: [
          '1. Partner Initiation: Authorized partner submits formal adjustment request through the Partner Portal or partners@nextsofthr.org.',
          '2. Account & ID Verification: Partner ID, reseller tier, and contract covenants are verified.',
          '3. Transaction Review: Underlying customer invoice, software usage metrics, and payment gateway receipts are examined.',
          '4. Customer & End-User Verification: NextSoftHR confirms license status and operational usage records with the end-customer.',
          '5. Commission Impact Review: System recalculates commission balances, partner tier requirements, and potential clawback amounts.',
          '6. Formal Decision: Partner Operations issues a formal Commercial Resolution Notice within seven (7) business days.',
          '7. Execution & Ledger Update: Appropriate credit notes, ledger debits, or payment adjustments are posted to the partner dashboard.',
        ],
      },
    ],
    actions: [
      { label: 'Contact Partner Support', actionType: 'partner-modal' },
    ],
  },
  {
    id: 'section-19',
    number: 19,
    title: 'Refunds Due to Service Interruption',
    category: 'Commercial & Legal',
    summary: 'Service Level Agreement (SLA) standards, service credit computations, and exclusions for planned maintenance or upstream disruptions.',
    content: [
      'NextSoftHR is engineered with resilient cloud architecture designed for 99.9% application availability. In the rare event of a severe platform interruption, remedies are governed by our Service Level Agreement.',
    ],
    subsections: [
      {
        subtitle: 'SLA Remedy via Service Credits',
        body: 'Temporary outages do not generate automatic cash refund entitlements. Rather, eligible business customers experiencing validated downtime exceeding SLA commitments are entitled to Service Credits applied against future recurring billing cycles:',
        bulletPoints: [
          'Monthly Availability 99.0% to 99.89%: 5% Service Credit of the monthly base subscription fee',
          'Monthly Availability 98.0% to 98.99%: 15% Service Credit of the monthly base subscription fee',
          'Monthly Availability < 98.0%: 25% Service Credit of the monthly base subscription fee',
        ],
      },
      {
        subtitle: 'Exclusions from Service Interruption Credits',
        body: 'Outage credits do not apply to: (1) Scheduled maintenance announced at least 48 hours in advance, (2) Emergency security patches affecting the broader internet, (3) Customer network, device, or internet service provider failures, or (4) Force majeure events (natural disasters, civil unrest, national power grid failures, or cloud hyper-scaler outages).',
      },
    ],
  },
  {
    id: 'section-20',
    number: 20,
    title: 'Fraud, Abuse & Misuse',
    category: 'Commercial & Legal',
    summary: 'Institutional safeguards against payment manipulation, synthetic identities, unauthorized reselling, and abusive refund churning.',
    content: [
      'NextSoftHR enforces rigorous anti-fraud controls to safeguard our client community, cloud infrastructure, and partner networks. We proactively monitor for malicious commercial behavior.',
    ],
    subsections: [
      {
        subtitle: 'Prohibited Practices & Triggers',
        body: 'NextSoftHR may initiate forensic review and impose immediate sanctions upon identifying:',
        bulletPoints: [
          'Payment manipulation, including use of unauthorized corporate cards or stolen payment credentials',
          'Account churning: repeatedly subscribing, downloading proprietary payroll templates or employee data, and demanding immediate refunds',
          'Filing multiple unsubstantiated refund claims across sister companies or revolving accounts',
          'Unauthorized resale, sublicensing, or sharing of user credentials without an executed Reseller Agreement',
          'Misrepresentation of employee count to obtain micro-tier pricing for mid-market organizations',
          'Coordinated chargeback abuse or intentional exploitation of payment dispute mechanisms',
        ],
      },
      {
        subtitle: 'Remedies & Legal Action',
        body: 'Upon substantiating fraudulent conduct, NextSoftHR reserves the right to immediately terminate all associated accounts, invalidate pending credits, notify banking fraud divisions, and report offenses to competent law enforcement agencies.',
      },
    ],
  },
  {
    id: 'section-21',
    number: 21,
    title: 'Business Closure or Change of Ownership',
    category: 'Commercial & Legal',
    summary: 'Procedures for corporate mergers, acquisitions, business restructuring, entity dissolution, and account novation.',
    content: [
      'Organizations experience organic evolution, including mergers, acquisitions, divestitures, management buyouts, and dissolution. These corporate events must be navigated in compliance with existing contract terms.',
    ],
    subsections: [
      {
        subtitle: 'No Automatic Refund Entitlement',
        body: 'The voluntary cessation of business, company restructuring, reduction in headcount, or acquisition of an organization by another entity does not create an automatic right to cancel a committed term early or receive a refund for remaining subscription cycles.',
      },
      {
        subtitle: 'Account Assignment & Novation Procedure',
        body: 'In the event of a merger, acquisition, or corporate reorganization, NextSoftHR permits the seamless transfer (novation) of an existing subscription and historic HR data to the successor corporate entity. The successor entity must execute our standard Assignment Agreement agreeing to assume all ongoing rights, responsibilities, and billing mandates.',
      },
    ],
  },
  {
    id: 'section-22',
    number: 22,
    title: 'International Customers',
    category: 'Commercial & Legal',
    summary: 'Cross-border transaction guidelines, currency exchange variances, international banking charges, and global consumer rights.',
    content: [
      'NextSoftHR delivers software solutions to organizations operating across Africa, Europe, North America, the Middle East, and Asia. International commercial transactions are governed by global operational standards.',
    ],
    subsections: [
      {
        subtitle: 'Currency Conversions & Foreign Exchange Fluctuations',
        body: 'Where a customer is billed in a currency different from their home banking currency (e.g., USD, NGN, GBP, EUR), the customer card issuer or bank performs foreign currency conversion. If a refund is authorized, NextSoftHR remits the exact numerical amount originally collected in the contract currency. NextSoftHR is not responsible for any variance in the final amount deposited caused by floating exchange rates or bank conversion spreads between the charge date and the refund date.',
      },
      {
        subtitle: 'Intermediary Bank Charges & Remittance Fees',
        body: 'Cross-border SWIFT wires and international transactions may incur intermediary banking charges or foreign transaction fees levied by the customer financial institution. These third-party fees are non-refundable by NextSoftHR.',
      },
      {
        subtitle: 'Supremacy of Mandatory Local Consumer Statutes',
        body: 'Where local consumer protection legislation in the customer legal jurisdiction grants mandatory, non-waivable statutory rights (such as statutory cooling-off periods under specific regional laws), those statutory provisions shall prevail to the minimum extent necessary to comply with such law.',
      },
    ],
  },
  {
    id: 'section-23',
    number: 23,
    title: 'Taxes',
    category: 'Commercial & Legal',
    summary: 'Tax calculation principles for Value Added Tax (VAT), Digital Services Tax (DST), Sales Tax, and Withholding Tax on refunds.',
    content: [
      'All subscription charges and professional services are subject to applicable national, state, and local taxation in accordance with the tax residency of the customer entity and NextSoftHR statutory registration.',
    ],
    subsections: [
      {
        subtitle: 'Tax Treatment on Approved Refunds',
        body: 'Where a cash refund or credit note is issued for a transaction upon which Value Added Tax (VAT), sales tax, or digital service tax was collected and remitted to government revenue authorities (such as the Federal Inland Revenue Service in Nigeria or international equivalents):',
        bulletPoints: [
          'Full Refunds: Where a complete transaction is reversed, the corresponding collected tax portion will be credited or refunded, and NextSoftHR will issue an official Tax Credit Note adjusting the original invoice.',
          'Partial Refunds: Taxes are recalculated proportionally to the revised taxable base.',
          'Withholding Tax (WHT): Customers operating under statutory withholding tax regimes who have deducted WHT must provide valid government-issued Credit Notes before NextSoftHR can reconcile corresponding account adjustments.',
        ],
      },
    ],
  },
  {
    id: 'section-24',
    number: 24,
    title: 'Policy Changes',
    category: 'Commercial & Legal',
    summary: 'Protocols for periodic policy updates, customer notification criteria, and historical version archiving.',
    content: [
      'NextSoftHR reserves the right to revise, modernize, or amend this Policy from time to time to reflect emerging product capabilities, changes in payment network rules, or evolving regulatory landscapes.',
    ],
    subsections: [
      {
        subtitle: 'Notification of Material Modifications',
        body: 'When material modifications are made to this Policy that substantively alter existing customer cancellation or refund rights, NextSoftHR will provide at least thirty (30) days advance notice via prominent banner notices within the NextSoftHR Admin Console and by email dispatch to primary billing contacts.',
      },
      {
        subtitle: 'Acceptance of Updated Terms',
        body: 'Continued access or utilization of the NextSoftHR platform following the stated Effective Date of an updated Policy constitutes conclusive acceptance of the revised terms.',
      },
      {
        subtitle: 'Version Records',
        body: 'Effective Date: January 1, 2026 | Last Updated: September 30, 2026 | Current Version: 3.4.1 (Enterprise Global). Historical version archives may be requested via legal@nextsofthr.org.',
      },
    ],
  },
  {
    id: 'section-25',
    number: 25,
    title: 'Governing Terms & Legal Hierarchy',
    category: 'Commercial & Legal',
    summary: 'Contractual relationship with Master Services Agreements, SLAs, DPAs, and dispute resolution mechanisms.',
    content: [
      'This Policy constitutes an integral component of the comprehensive commercial relationship between NextSoftHR and its customers, subscribers, and partners.',
    ],
    subsections: [
      {
        subtitle: 'Comprehensive Legal Architecture',
        body: 'This Policy must be read in direct conjunction with:',
        bulletPoints: [
          'NextSoftHR Master Terms & Conditions',
          'NextSoftHR Global Privacy Policy & Data Processing Addendum (DPA)',
          'Service Level Agreement (SLA)',
          'Authorized Reseller Agreement (for VARs)',
          'Master Distributor Agreement (for Distributors)',
          'Partner & Affiliate Commercial Terms',
          'Executed Enterprise Order Forms and Statements of Work (SOW)',
          'Applicable mandatory statutory laws of the Federal Republic of Nigeria and designated operating jurisdictions',
        ],
      },
      {
        subtitle: 'Conflict of Terms & Order of Precedence',
        body: 'In the event of an irreconcilable ambiguity or direct conflict between the terms of this Policy and an individually executed, signed Enterprise Order Form or Reseller Contract executed by NextSoftHR corporate leadership, the provisions of the signed contract shall control and take legal precedence.',
      },
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Customers',
    question: 'Can I cancel my NextSoftHR subscription?',
    answer: 'Yes, absolutely. You can cancel your subscription at any time directly through your NextSoftHR Admin Console under Settings → Billing & Plans, or by emailing billing@nextsofthr.org from your verified corporate domain. Upon cancellation, your access remains fully functional until the end of your current paid billing period, and future automated renewal charges will cease immediately.',
  },
  {
    id: 'faq-2',
    category: 'Customers',
    question: 'Will I receive a refund after cancellation?',
    answer: 'Under our general commercial policy, cancellations do not automatically generate cash refunds for unused days within an active monthly or annual billing period. However, you will continue to enjoy uninterrupted, full platform access until the expiration date of your paid cycle. Cash refunds or service credits are granted only under the specific eligibility conditions detailed in Section 4 (such as duplicate payments or verified billing glitches).',
  },
  {
    id: 'faq-3',
    category: 'Customers',
    question: 'Are annual subscriptions refundable?',
    answer: 'Annual subscriptions provide substantial volume discounts in exchange for a 12-month commitment. We offer a 14-calendar-day evaluation window from your initial purchase date during which you may request a refund if NextSoftHR does not meet your organizational requirements. After the 14-day window has elapsed, annual subscriptions are non-refundable, but your access remains active through the full 12-month term.',
  },
  {
    id: 'faq-4',
    category: 'Billing',
    question: 'What happens if I accidentally pay twice?',
    answer: 'If banking delays or duplicate clicks result in double-billing for the same invoice, our billing operations desk will promptly verify the discrepancy. Upon verification, the duplicate charge will either be refunded in full back to your original payment card within 5–7 business days, or applied as an immediate billing credit toward your upcoming invoices, depending on your preferred instructions.',
  },
  {
    id: 'faq-5',
    category: 'Billing',
    question: 'How do I request a refund?',
    answer: 'You can submit a refund claim by clicking the "Submit a Refund Request" button on this page, or by emailing billing@nextsofthr.org. Please provide your corporate entity name, registered account email, invoice number, payment reference ID, date, amount, and an explanation of the request. Our finance team will review and respond within 48 to 72 business hours.',
  },
  {
    id: 'faq-6',
    category: 'Billing',
    question: 'How long does a refund take?',
    answer: 'Once approved by NextSoftHR, our internal finance team executes the refund instruction within 5 to 7 business days. Following internal execution, acquiring banks and credit card networks (such as Visa, Mastercard, or local clearing switches) typically take an additional 3 to 10 business days to reflect the credit on your bank statement.',
  },
  {
    id: 'faq-7',
    category: 'Services',
    question: 'Are implementation fees refundable?',
    answer: 'Implementation and setup fees depend on project milestones. If you cancel before any engineering, discovery, or data mapping has commenced, you receive a 100% refund (less a 5% administrative setup fee). If work has started but is under 50% complete, a 50% platform service credit or partial refund may be issued. Once data migration, custom reports, or payroll configurations are substantially completed or delivered, implementation fees are non-refundable.',
  },
  {
    id: 'faq-8',
    category: 'Customers',
    question: 'Are add-on modules refundable?',
    answer: 'Add-on modules (such as AI Payroll Tools, Shift Scheduling, Recruitment, or CRM) can be deactivated at any time to prevent future billing. However, module fees are non-refundable for the current active billing cycle in which they were active. Deactivating a single add-on does not cancel your base NextSoftHR subscription.',
  },
  {
    id: 'faq-9',
    category: 'Partners',
    question: 'What happens to reseller commissions after a refund?',
    answer: 'Reseller commissions are directly tied to settled, non-refunded revenue. If an end-customer receives an approved refund or executes a valid cancellation, any commissions or margins previously credited or disbursed to the reseller for that transaction will be clawed back, cancelled, or deducted from the reseller next payout cycle.',
  },
  {
    id: 'faq-10',
    category: 'Partners',
    question: 'Can distributors return unused licenses?',
    answer: 'Distributors purchase wholesale license allocations via binding Purchase Orders, which are non-refundable once provisioned. However, distributors with unallocated license seats in their prepaid bank may request a reallocation or rollover of those seats across different product modules in accordance with their Master Distribution Agreement.',
  },
  {
    id: 'faq-11',
    category: 'Partners',
    question: 'Can partners lose commissions after a customer refund?',
    answer: 'Yes. In the event of a customer refund, chargeback, or payment reversal, any unpaid commissions associated with that transaction are voided, and previously paid commissions will be debited against future affiliate/partner earnings. This protects commercial integrity across the channel network.',
  },
  {
    id: 'faq-12',
    category: 'Billing',
    question: 'What happens if I dispute a payment?',
    answer: 'We strongly urge customers to contact our billing team (+2349158482622 / billing@nextsofthr.org) before filing a bank dispute or credit card chargeback. Most billing issues can be resolved amicably in 24–48 hours. Submitting fraudulent, unsubstantiated, or abusive chargebacks may lead to immediate account suspension and recovery of dispute fees.',
  },
  {
    id: 'faq-13',
    category: 'Billing',
    question: 'Are promotional plans refundable?',
    answer: 'Unless specifically stated otherwise in the promotion terms, discounted subscriptions, introductory rate offers, bundled specials, and promotional coupons are strictly non-refundable and final sale once purchased.',
  },
  {
    id: 'faq-14',
    category: 'Customers',
    question: 'What happens after my subscription expires?',
    answer: 'After your subscription period officially concludes, your account transitions to read-only status for 30 calendar days. During this 30-day Data Export Window, authorized administrators can export full employee records, payroll histories, tax ledgers, and attendance archives free of charge. After 30 days, account databases are safely purged in compliance with our Privacy Policy.',
  },
  {
    id: 'faq-15',
    category: 'Billing',
    question: 'Can I receive a service credit instead of a refund?',
    answer: 'Yes! In many commercial scenarios (such as plan adjustments, service interruptions, or partial implementation renegotiations), NextSoftHR can issue non-expiring Platform Service Credits. These credits can be applied toward future monthly subscription renewals, seat upgrades, new add-on modules, or specialized professional training.',
  },
];
