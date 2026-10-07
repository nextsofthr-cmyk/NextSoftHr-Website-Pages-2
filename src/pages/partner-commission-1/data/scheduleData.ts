export interface ScheduleSection {
  id: number;
  title: string;
  chapter: string;
  summary: string;
  content: string[];
  tables?: {
    headers: string[];
    rows: string[][];
  };
  highlights?: string[];
  keyTerms?: string[];
}

export interface ScheduleMetadata {
  title: string;
  subtitle: string;
  website: string;
  phone: string;
  tagline: string;
  version: string;
  effectiveDate: string;
  lastUpdated: string;
}

export const SCHEDULE_METADATA: ScheduleMetadata = {
  title: "NEXTSOFTHR PARTNER COMMISSION & REVENUE SHARE SCHEDULE",
  subtitle: "Schedule B to the NextSoftHR Reseller, Partner, Distributor, Affiliate & Associate Agreement",
  website: "www.nextsofthr.org",
  phone: "+2349158482622",
  tagline: "Powering People. Driving Businesses.",
  version: "1.0",
  effectiveDate: "March 2026",
  lastUpdated: "March 30, 2026",
};

export const CHAPTERS = [
  "All Chapters",
  "1. General Purpose & Compensation Model",
  "2. Standard Partner Tiers & Benefits",
  "3. Customer Qualification & Commissionable Revenue",
  "4. Recurring Revenue & Product Modules",
  "5. Reseller Margins & Distributor Overrides",
  "6. Lead Registration & Protection Rules",
  "7. Financial Terms, Reconciliation & Reversals",
  "8. Post-Termination, Rights & Recordkeeping",
  "9. Calculation Examples",
  "10. Acceptance & Execution Signatures",
] as const;

export const SCHEDULE_SECTIONS: ScheduleSection[] = [
  {
    id: 1,
    title: "PURPOSE",
    chapter: "1. General Purpose & Compensation Model",
    summary: "Establishes the commercial terms under which approved NextSoftHR Partners earn commissions, reseller margins, overrides, and service fees under Master Agreement Schedule B.",
    content: [
      "This Partner Commission & Revenue Share Schedule (“Commission Schedule”) establishes the commercial terms under which an approved NextSoftHR Partner may earn commissions, revenue share, reseller margins, referral fees, distributor overrides or other approved financial benefits.",
      "This Schedule forms part of the NextSoftHR Reseller, Partner, Distributor, Affiliate & Associate Agreement (“Master Agreement”).",
      "If there is a conflict between this Schedule and the Master Agreement concerning commission calculations or commercial benefits, this Schedule will control only with respect to those specific commercial matters, unless the applicable Partner Schedule expressly states otherwise."
    ],
    highlights: ["Governing Schedule B document", "Controls over Master Agreement on commercial calculations"]
  },
  {
    id: 2,
    title: "PARTNER COMMISSION MODEL",
    chapter: "1. General Purpose & Compensation Model",
    summary: "Flexible compensation model rewarding partners based on approved category, tier, responsibilities, and commercial contributions.",
    content: [
      "NextSoftHR operates a flexible partner compensation model designed to reward partners based on their approved partner category, tier, performance, responsibilities and commercial contribution.",
      "Eligible compensation may include:",
      "• Referral commissions\n• Affiliate commissions\n• Recurring commissions\n• Reseller margins\n• Distributor commissions\n• Distributor overrides\n• Implementation revenue\n• Training revenue\n• Consulting revenue\n• Outsourcing revenue\n• Approved professional-service revenue\n• Strategic partnership revenue",
      "Not every partner category is entitled to every form of compensation.",
      "The applicable compensation will be stated in the Partner Profile and Commission Schedule assigned to the Partner."
    ],
    keyTerms: ["Referral", "Affiliate", "Recurring", "Reseller margins", "Distributor overrides", "Professional services"]
  },
  {
    id: 3,
    title: "STANDARD PARTNER TIERS",
    chapter: "2. Standard Partner Tiers & Benefits",
    summary: "Overview of NextSoftHR's 4 standard channel partner tiers (Bronze 15%, Silver 20%, Gold 30%, Platinum 40%).",
    content: [
      "NextSoftHR's standard partner tiers and recurring commission rates are established as follows:",
      "These percentages represent the standard program rates and may be modified by Partner category, territory, product, customer segment, sales volume, strategic agreement, promotional campaign, distributor agreement, enterprise agreement, or special commercial arrangement.",
      "The rate applicable to an individual Partner will be recorded in that Partner's approved Partner Schedule."
    ],
    tables: {
      headers: ["Partner Tier", "Standard Recurring Commission", "Target Profile"],
      rows: [
        ["Bronze", "15%", "Entry level channel partners & registered referral affiliates"],
        ["Silver", "20%", "Established channel participants with verified recurring activity"],
        ["Gold / Partner", "30%", "Active partners with high sales, onboarding, & implementation volume"],
        ["Platinum", "40%", "High-performing strategic relationships, regional distributors & enterprise partners"]
      ]
    }
  },
  {
    id: 4,
    title: "BRONZE PARTNER",
    chapter: "2. Standard Partner Tiers & Benefits",
    summary: "Standard Commission: 15%. Entry-level channel program with essential marketing, referral links, and tracking access.",
    content: [
      "Standard Commission: 15%",
      "Bronze Partners represent the entry level of the NextSoftHR channel program.",
      "Potential benefits include:",
      "• Partner Portal access\n• Lead registration\n• Referral links\n• Basic marketing materials\n• Product information\n• Sales resources\n• Partner training\n• Standard referral commission\n• Customer referral tracking",
      "Bronze Partners may be upgraded based on NextSoftHR's qualification requirements."
    ],
    highlights: ["15% Recurring Commission", "Standard referral tracking & lead registration"]
  },
  {
    id: 5,
    title: "SILVER PARTNER",
    chapter: "2. Standard Partner Tiers & Benefits",
    summary: "Standard Commission: 20%. Established channel participants with increased commission, enhanced training, and sales support.",
    content: [
      "Standard Commission: 20%",
      "Silver Partners are established channel participants demonstrating increased commercial activity.",
      "Potential benefits include:",
      "• Everything available to Bronze Partners\n• Increased recurring commission (20%)\n• Additional marketing resources\n• Enhanced partner training\n• Sales support\n• Partner campaign opportunities\n• Increased lead-management capabilities\n• Potential inclusion in the NextSoftHR Partner Directory\n• Additional partner resources"
    ],
    highlights: ["20% Recurring Commission", "Directory listing & sales campaign opportunities"]
  },
  {
    id: 6,
    title: "GOLD / PARTNER",
    chapter: "2. Standard Partner Tiers & Benefits",
    summary: "Standard Commission: 30%. Active partners with proven sales, implementation capabilities, co-marketing, and inbound lead eligibility.",
    content: [
      "Standard Commission: 30%",
      "Gold / Partner level participants are active channel partners with demonstrated sales, customer acquisition, implementation or business-development capabilities.",
      "Potential benefits include:",
      "• Everything available to Silver Partners\n• Higher recurring commission (30%)\n• Advanced training\n• Implementation opportunities\n• Co-marketing opportunities\n• Business-development support\n• Enhanced partner visibility\n• Priority partner opportunities\n• Access to selected partner campaigns\n• Potential customer referrals from NextSoftHR"
    ],
    highlights: ["30% Recurring Commission", "Direct NextSoftHR customer referrals & co-marketing"]
  },
  {
    id: 7,
    title: "PLATINUM PARTNER",
    chapter: "2. Standard Partner Tiers & Benefits",
    summary: "Standard Commission: 40%. Top-tier strategic relationships, distributor rights, joint marketing, and regional expansion terms.",
    content: [
      "Standard Commission: 40%",
      "Platinum Partners represent high-performing or strategically important channel relationships.",
      "Potential benefits may include:",
      "• Highest standard recurring commission (40%)\n• Strategic account opportunities\n• Distributor opportunities\n• Joint marketing\n• Co-branded campaigns\n• Priority business-development opportunities\n• Advanced training\n• Strategic account support\n• Partner events\n• Enhanced directory visibility\n• Regional expansion opportunities\n• Special commercial arrangements",
      "Platinum status is subject to NextSoftHR approval and ongoing compliance."
    ],
    highlights: ["40% Recurring Commission", "Distributor rights, co-branded enterprise campaigns"]
  },
  {
    id: 8,
    title: "PARTNER LEVEL QUALIFICATION",
    chapter: "2. Standard Partner Tiers & Benefits",
    summary: "Evaluation metrics including ARR, customer retention, employee certifications, implementation capability, and quality score.",
    content: [
      "NextSoftHR may evaluate partner levels using a combination of:",
      "• New customers acquired\n• Revenue generated\n• Annual recurring revenue (ARR)\n• Subscription value\n• Customer retention\n• Customer satisfaction (CSAT)\n• Number of certified employees\n• Implementation capability\n• Product knowledge\n• Sales activity\n• Lead quality\n• Compliance\n• Support performance\n• Strategic value",
      "NextSoftHR may review partner levels periodically.",
      "A partner may be promoted, retained, downgraded or placed on a performance plan depending on the applicable qualification criteria."
    ]
  },
  {
    id: 9,
    title: "QUALIFIED CUSTOMER",
    chapter: "3. Customer Qualification & Commissionable Revenue",
    summary: "Legal definition of an attributed customer eligible for commission payout.",
    content: [
      "A “Qualified Customer” means a prospective customer that:",
      "1. Is legitimately attributed to the Partner;\n2. Meets NextSoftHR's applicable lead qualification requirements;\n3. Is not already an existing customer where existing customers are excluded;\n4. Is not already assigned to another protected Partner;\n5. Completes an eligible purchase;\n6. Makes the required payment;\n7. Is not involved in fraudulent or prohibited activity; and\n8. Satisfies all applicable commercial requirements."
    ],
    highlights: ["Legitimate attribution required", "Must make verified payment", "Protected against duplicate assignment"]
  },
  {
    id: 10,
    title: "QUALIFIED PURCHASE",
    chapter: "3. Customer Qualification & Commissionable Revenue",
    summary: "Types of transactions eligible for commissions: initial subscriptions, renewals, upgrades, branch expansions, and add-on modules.",
    content: [
      "A “Qualified Purchase” may include:",
      "• Initial subscription\n• Renewal\n• Upgrade\n• Additional users\n• Additional employees\n• Additional branches\n• Additional locations\n• Additional modules\n• Add-on products\n• Approved services\n• Other qualifying purchases",
      "The applicable Commission Schedule may exclude certain products, services, taxes, fees, promotional items or third-party products."
    ]
  },
  {
    id: 11,
    title: "COMMISSIONABLE REVENUE",
    chapter: "3. Customer Qualification & Commissionable Revenue",
    summary: "Commissions are calculated on net received revenue after excluding taxes, payment processing, chargebacks, and unbilled trials.",
    content: [
      "Unless otherwise specified, commissions are calculated on eligible net revenue actually received by NextSoftHR.",
      "Commissionable revenue may exclude:",
      "• VAT\n• Sales tax\n• Withholding tax\n• Government charges\n• Refunds\n• Chargebacks\n• Credits\n• Reversed transactions\n• Payment-processing charges where applicable\n• Non-commissionable services\n• Third-party products\n• Promotional credits\n• Complimentary subscriptions\n• Free trials\n• Bad debt",
      "NextSoftHR will specify exceptions in the applicable Partner Schedule."
    ],
    highlights: ["Net received cash revenue basis", "Excludes VAT, processing fees, and chargebacks"]
  },
  {
    id: 12,
    title: "INITIAL PURCHASE",
    chapter: "3. Customer Qualification & Commissionable Revenue",
    summary: "Rules governing the first qualifying paid subscription by an attributed Qualified Customer.",
    content: [
      "An Initial Purchase is the first qualifying paid subscription purchased by a Qualified Customer through an approved Partner relationship.",
      "The Initial Purchase must satisfy the applicable attribution and payment requirements."
    ]
  },
  {
    id: 13,
    title: "RECURRING COMMISSIONS",
    chapter: "4. Recurring Revenue & Product Modules",
    summary: "Eligibility criteria for recurring monthly, quarterly, and annual subscription renewals and expansions.",
    content: [
      "Where the applicable Partner Plan provides recurring commissions, the Partner may receive a commission on qualifying recurring subscription revenue.",
      "Recurring commission eligibility may apply to:",
      "• Monthly subscriptions\n• Quarterly subscriptions\n• Annual subscriptions\n• Multi-year subscriptions\n• Renewals\n• Upgrades\n• Additional users\n• Additional branches\n• Additional modules",
      "The precise duration of recurring commission eligibility will be stated in the applicable Partner Schedule."
    ]
  },
  {
    id: 14,
    title: "RECOMMENDED RECURRING COMMISSION MODEL",
    chapter: "4. Recurring Revenue & Product Modules",
    summary: "Default tier commission percentages on eligible recurring subscription revenue.",
    content: [
      "Unless otherwise agreed:",
      "• Bronze: 15% recurring commission\n• Silver: 20% recurring commission\n• Gold / Partner: 30% recurring commission\n• Platinum: 40% recurring commission",
      "The commission applies only to eligible revenue and remains subject to refunds, cancellations, chargebacks, customer payment and other provisions of this Schedule."
    ]
  },
  {
    id: 15,
    title: "COMMISSION ON UPGRADES",
    chapter: "4. Recurring Revenue & Product Modules",
    summary: "Earn commissions on incremental revenue when customers upgrade tiers, add branches, or expand seats.",
    content: [
      "Where an existing Qualified Customer:",
      "• Adds users\n• Adds employees\n• Adds branches\n• Adds locations\n• Purchases additional modules\n• Upgrades subscription level\n• Adds eligible services",
      "the Partner may receive commission on the qualifying incremental revenue, subject to the applicable Partner Schedule."
    ]
  },
  {
    id: 16,
    title: "ADD-ON MODULE COMMISSIONS",
    chapter: "4. Recurring Revenue & Product Modules",
    summary: "List of NextSoftHR software modules eligible for commission compensation.",
    content: [
      "Eligible NextSoftHR modules may include, subject to commercial availability:",
      "• Core HR & People Management\n• Payroll & Automated Statutory Deductions\n• Time & Attendance (Biometric & Geofenced)\n• Leave Management & Accruals\n• Recruitment & Applicant Tracking (ATS)\n• Customer Relationship Management (CRM)\n• Finance & Expense Management\n• Projects & Timesheets\n• Employee Self-Service (ESS Portal)\n• Manager Self-Service (MSS Workflow)\n• HR & Payroll Outsourcing\n• Other proprietary NextSoftHR modules",
      "Commission treatment for each module may be specified in the Commission Schedule."
    ]
  },
  {
    id: 17,
    title: "MULTI-COMPANY, MULTI-BRANCH AND MULTI-LOCATION CUSTOMERS",
    chapter: "4. Recurring Revenue & Product Modules",
    summary: "Commissions apply to multi-branch, holding company, and subsidiary rollouts when attributed to the partner.",
    content: [
      "Where a Qualified Customer operates multiple:",
      "• Companies\n• Branches\n• Locations\n• Departments\n• Business units",
      "eligible subscription revenue may qualify for commission provided the purchase is properly attributed to the Partner."
    ]
  },
  {
    id: 18,
    title: "RESELLER MARGIN",
    chapter: "5. Reseller Margins & Distributor Overrides",
    summary: "Commercial structure for authorized resellers: purchase discount, maximum discounting, and minimum price enforcement.",
    content: [
      "Approved Resellers may receive a reseller margin rather than, or in addition to, a referral commission.",
      "The applicable Reseller Schedule may specify:",
      "• Customer List Price\n• Reseller Purchase Price (Wholesale discount)\n• Reseller Margin (% retained)\n• Maximum Customer Discount allowed\n• Minimum Authorized Price",
      "Resellers must not represent unauthorized prices as official NextSoftHR pricing."
    ],
    highlights: ["Wholesale reseller margin structure", "Strict minimum authorized pricing compliance"]
  },
  {
    id: 19,
    title: "DISTRIBUTOR COMMISSION",
    chapter: "5. Reseller Margins & Distributor Overrides",
    summary: "Distributor compensation including direct sales, reseller network revenue, territory overrides, and strategic incentives.",
    content: [
      "Approved Distributors may receive distributor compensation based on:",
      "• Direct customer sales\n• Reseller sales\n• Distributor-managed opportunities\n• Territory revenue\n• Approved reseller network revenue",
      "The Distributor Schedule may specify Distributor Margin, Direct Commission, Sub-Reseller Override, Territory Commission, and Strategic Incentives."
    ]
  },
  {
    id: 20,
    title: "SUB-RESELLER OVERRIDE",
    chapter: "5. Reseller Margins & Distributor Overrides",
    summary: "Tiered revenue split between sub-resellers and managing regional master distributors.",
    content: [
      "Where NextSoftHR authorizes a Distributor to recruit and manage sub-resellers, a distributor override may apply.",
      "Example structure:\nCustomer Revenue\n  ↓\nSub-Reseller Commission (e.g. 20%)\n  ↓\nDistributor Override (e.g. 5%)\n  ↓\nNextSoftHR Revenue (e.g. 75%)",
      "The exact percentages must be defined in the Distributor Schedule.",
      "No partner may recruit sub-resellers without written authorization."
    ]
  },
  {
    id: 21,
    title: "AFFILIATE COMMISSION",
    chapter: "5. Reseller Margins & Distributor Overrides",
    summary: "Affiliate tracking rules via referral links, cookie attribution windows, and anti-fraud controls.",
    content: [
      "Affiliates may receive commissions based on qualifying customers generated through:",
      "• Affiliate links\n• Referral codes\n• Approved landing pages\n• Campaign tracking\n• Partner Portal attribution",
      "Affiliate commission is subject to attribution, cookie/tracking period, customer qualification, payment completion, refund period, and anti-fraud controls."
    ]
  },
  {
    id: 22,
    title: "REFERRAL COMMISSION",
    chapter: "5. Reseller Margins & Distributor Overrides",
    summary: "Payment triggers for registered and approved customer referrals.",
    content: [
      "Referral Partners may receive a commission when:",
      "1. The referral is registered;\n2. NextSoftHR accepts the referral;\n3. The prospect becomes a Qualified Customer;\n4. The customer makes a qualifying payment.",
      "The applicable referral percentage will be specified in the Partner Schedule."
    ]
  },
  {
    id: 23,
    title: "LEAD REGISTRATION",
    chapter: "6. Lead Registration & Protection Rules",
    summary: "Mandatory opportunity submission requirements via the NextSoftHR Partner Portal.",
    content: [
      "Partners must register opportunities through the approved NextSoftHR Partner Portal or other authorized process.",
      "Lead registration should include:",
      "• Customer name\n• Company name\n• Contact person & details\n• Country\n• Industry\n• Product requirement / Modules\n• Expected purchase value (ARR/MRR)\n• Expected purchase date"
    ],
    highlights: ["Mandatory portal registration", "Captures deal value, industry, and contact details"]
  },
  {
    id: 24,
    title: "LEAD PROTECTION PERIOD",
    chapter: "6. Lead Registration & Protection Rules",
    summary: "Standard 90-day exclusivity period for registered opportunities with activity progression requirements.",
    content: [
      "Standard recommended lead protection: 90 days.",
      "NextSoftHR may establish a different period for:",
      "• Enterprise accounts\n• Government opportunities\n• Distributor opportunities\n• Strategic opportunities\n• Large accounts\n• Special campaigns",
      "If a Partner fails to meaningfully progress an opportunity during the protection period, NextSoftHR may release the opportunity."
    ],
    highlights: ["90 days standard protection exclusivity", "Requires meaningful progression activity"]
  },
  {
    id: 25,
    title: "DUPLICATE LEADS",
    chapter: "6. Lead Registration & Protection Rules",
    summary: "Priority rules when multiple partners register the same prospect.",
    content: [
      "Where multiple Partners submit the same prospect, priority may be determined by:",
      "1. Valid first registration;\n2. Customer written confirmation;\n3. Existing commercial relationship;\n4. Demonstrable sales activity;\n5. Approved attribution records.",
      "NextSoftHR's Partner Operations team may make the final administrative determination subject to the dispute procedure."
    ]
  },
  {
    id: 26,
    title: "AFFILIATE COOKIE PERIOD",
    chapter: "6. Lead Registration & Protection Rules",
    summary: "90-day tracking window for digital affiliate links with browser policy limits.",
    content: [
      "Recommended default tracking period: 90 days.",
      "The tracking period may be changed by NextSoftHR.",
      "Tracking may be affected by browser settings, cookie deletion, privacy restrictions, ad blockers, device changes, technical failures, direct purchases, or other attribution limitations.",
      "No commission is guaranteed solely because an affiliate link was clicked."
    ]
  },
  {
    id: 27,
    title: "SELF-REFERRALS",
    chapter: "6. Lead Registration & Protection Rules",
    summary: "Strict prohibition against artificial self-purchases, family accounts, or fake lead generation.",
    content: [
      "Partners may not generate commissions by:",
      "• Purchasing for themselves\n• Purchasing for their employees\n• Purchasing for immediate family members\n• Creating artificial accounts\n• Creating duplicate accounts\n• Generating fake leads\n• Artificially inflating revenue",
      "NextSoftHR may reverse commissions resulting from prohibited self-referrals."
    ],
    highlights: ["Prohibits self, family, and employee commission claims", "Immediate clawback of self-referrals"]
  },
  {
    id: 28,
    title: "FRAUD PREVENTION",
    chapter: "6. Lead Registration & Protection Rules",
    summary: "Audit procedures and penalties for fake accounts, cookie stuffing, and bot traffic.",
    content: [
      "NextSoftHR may investigate:",
      "• Fake leads\n• Fake accounts\n• Cookie stuffing\n• Automated traffic\n• Fraudulent purchases\n• Manipulated attribution\n• Duplicate accounts\n• Misleading campaigns\n• Unauthorized incentives",
      "Fraudulent commissions may be withheld, reversed or recovered."
    ]
  },
  {
    id: 29,
    title: "CUSTOMER CANCELLATION",
    chapter: "7. Financial Terms, Reconciliation & Reversals",
    summary: "Commission cessation rules upon customer churn, non-renewal, or contract cancellation.",
    content: [
      "If a customer cancels, commission eligibility may cease from the effective cancellation date.",
      "If the customer cancels during an applicable refund period, unpaid commission may be cancelled.",
      "Where commission was already paid and subsequently reversed through a refund or chargeback, NextSoftHR may offset the amount against future commissions."
    ]
  },
  {
    id: 30,
    title: "CUSTOMER REFUNDS",
    chapter: "7. Financial Terms, Reconciliation & Reversals",
    summary: "Full refunds eliminate commission; partial refunds adjust commissions proportionally.",
    content: [
      "No commission is earned on revenue that is fully refunded.",
      "Where a partial refund occurs, the commission may be recalculated proportionally based on the net retained revenue."
    ]
  },
  {
    id: 31,
    title: "CHARGEBACKS",
    chapter: "7. Financial Terms, Reconciliation & Reversals",
    summary: "Treatment of disputed merchant transactions and recovery against partner balances.",
    content: [
      "Where a transaction is reversed through a payment dispute or chargeback, the associated commission may be cancelled, reversed, offset, or recovered from future commissions."
    ]
  },
  {
    id: 32,
    title: "FREE TRIALS",
    chapter: "7. Financial Terms, Reconciliation & Reversals",
    summary: "Trials carry no commission until successful conversion to a paid subscription.",
    content: [
      "Free trials are generally non-commissionable unless expressly included in a promotional campaign.",
      "A commission may become eligible when the customer converts to a qualifying paid subscription."
    ]
  },
  {
    id: 33,
    title: "PROMOTIONAL PRICING",
    chapter: "7. Financial Terms, Reconciliation & Reversals",
    summary: "Commission calculations during seasonal or promotional discount campaigns.",
    content: [
      "NextSoftHR may run seasonal promotions, partner promotions, launch campaigns, discount campaigns, regional campaigns, or enterprise promotions.",
      "The Commission Schedule may specify whether commissions are calculated on standard price, discounted price, or net revenue."
    ]
  },
  {
    id: 34,
    title: "PAYMENT THRESHOLD",
    chapter: "7. Financial Terms, Reconciliation & Reversals",
    summary: "Recommended minimum payout of USD $100 (or local equivalent). Amounts below roll forward.",
    content: [
      "Recommended minimum payout: USD $100 or equivalent local currency.",
      "NextSoftHR may change the threshold.",
      "Amounts below the threshold may roll forward until the minimum threshold is reached."
    ],
    highlights: ["USD $100 minimum payout threshold", "Sub-threshold balances rollover automatically"]
  },
  {
    id: 35,
    title: "PAYMENT FREQUENCY",
    chapter: "7. Financial Terms, Reconciliation & Reversals",
    summary: "Monthly reconciliation and payout schedule following accounting verification.",
    content: [
      "Recommended: Monthly.",
      "Commission statements may be generated after the applicable accounting period.",
      "Payment may occur after revenue reconciliation, refund review, chargeback review, fraud review, tax review, and minimum payout threshold confirmation."
    ]
  },
  {
    id: 36,
    title: "PAYMENT METHODS",
    chapter: "7. Financial Terms, Reconciliation & Reversals",
    summary: "Approved payout mechanisms including direct bank transfers and international wire.",
    content: [
      "Approved payment methods may include:",
      "• Bank transfer\n• Wire transfer\n• Approved payment platforms\n• Other payment methods designated by NextSoftHR",
      "The Partner is responsible for maintaining accurate payment information in the Partner Portal."
    ]
  },
  {
    id: 37,
    title: "CURRENCY",
    chapter: "7. Financial Terms, Reconciliation & Reversals",
    summary: "Commissions calculated in received transaction currency; bank FX rates govern conversions.",
    content: [
      "Commissions may be calculated in the currency in which the qualifying transaction is received.",
      "Where conversion is required, NextSoftHR may use its applicable accounting or payment-provider exchange rate.",
      "Currency conversion differences do not create an additional commission entitlement."
    ]
  },
  {
    id: 38,
    title: "TAXES",
    chapter: "7. Financial Terms, Reconciliation & Reversals",
    summary: "Partner responsibility for local VAT, withholding, income, and corporate taxes.",
    content: [
      "Partners are responsible for their applicable income taxes, corporate taxes, VAT, sales taxes, withholding obligations, and local government charges.",
      "NextSoftHR may withhold taxes where legally required.",
      "Partners must provide appropriate tax documentation when requested."
    ]
  },
  {
    id: 39,
    title: "COMMISSION STATEMENTS",
    chapter: "7. Financial Terms, Reconciliation & Reversals",
    summary: "Mandatory line items on Partner Portal statements: customer, invoice, rate, deductions, and net amount.",
    content: [
      "Partner Portal statements should display the following line items:",
      "• Customer name\n• Invoice reference\n• Product / Module\n• Purchase date\n• Gross Revenue\n• Commissionable revenue\n• Commission percentage\n• Commission amount\n• Refund adjustment\n• Chargeback adjustment\n• Net commission\n• Payment status"
    ],
    highlights: ["12-point standardized statement audit schema", "Full line-item transparency in Partner Portal"]
  },
  {
    id: 40,
    title: "COMMISSION DISPUTES",
    chapter: "7. Financial Terms, Reconciliation & Reversals",
    summary: "30-day window from statement publication to lodge written commercial disputes.",
    content: [
      "Partners must submit commission disputes within 30 days from the date the commission statement becomes available.",
      "Disputes should include:",
      "• Customer name\n• Invoice number\n• Partner ID\n• Transaction reference\n• Amount disputed\n• Supporting documentation",
      "NextSoftHR may investigate and issue an administrative determination."
    ],
    highlights: ["Strict 30-day dispute filing window", "Requires documentary evidence"]
  },
  {
    id: 41,
    title: "COMMISSION AUDIT",
    chapter: "7. Financial Terms, Reconciliation & Reversals",
    summary: "NextSoftHR reserves right to audit accounts for duplicate claims, tier errors, and overpayments.",
    content: [
      "NextSoftHR may review commission accounts to identify errors, duplicate payments, fraud, refunds, chargebacks, incorrect attribution, or incorrect partner tier.",
      "Overpayments may be offset against future commissions."
    ]
  },
  {
    id: 42,
    title: "CUSTOMER OWNERSHIP",
    chapter: "8. Post-Termination, Rights & Recordkeeping",
    summary: "Commercial commissions do not confer permanent ownership; NextSoftHR retains direct service access.",
    content: [
      "Partner commission does not automatically establish permanent ownership of a customer.",
      "Customer relationship rights may depend on partner type, reseller status, customer agreement, territory, existing relationship, and commercial schedule.",
      "NextSoftHR retains the right to communicate directly with customers concerning billing, security, product support, legal requirements, service notices, account management, renewals, and product changes."
    ]
  },
  {
    id: 43,
    title: "CUSTOMER RENEWALS",
    chapter: "8. Post-Termination, Rights & Recordkeeping",
    summary: "Renewal commissions depend on active partner status, client retention, and prompt subscription settlement.",
    content: [
      "Where recurring commission applies, eligible renewals may generate commissions.",
      "Renewals may be subject to active partner status, customer payment, customer retention, applicable commission period, partner relationship, and contractual requirements."
    ]
  },
  {
    id: 44,
    title: "POST-TERMINATION COMMISSIONS",
    chapter: "8. Post-Termination, Rights & Recordkeeping",
    summary: "Treatment of partner commissions upon termination with or without cause.",
    content: [
      "Unless a Partner Schedule provides otherwise:",
      "• Termination by Partner: Eligible commissions accrued before termination remain payable.\n• Termination by NextSoftHR without cause: Eligible commissions on qualifying customers may continue for the period specifically stated in the applicable Commission Schedule.\n• Termination for partner breach: NextSoftHR may stop future commissions associated with the terminated relationship, subject to applicable law and accrued contractual rights.\n• Fraud / misconduct: NextSoftHR may withhold or reverse commissions connected with fraudulent or prohibited conduct, subject to applicable law."
    ]
  },
  {
    id: 45,
    title: "RECOMMENDED POST-TERMINATION MODEL",
    chapter: "8. Post-Termination, Rights & Recordkeeping",
    summary: "Three-tier classification: Accrued Commission, Protected Commission, and Future Commission.",
    content: [
      "For greater clarity, three categories are created:",
      "1. Accrued Commission: Commission already earned before termination. Payable subject to reconciliation.\n2. Protected Commission: Commission from customers who became Qualified Customers before termination and remain eligible under the applicable schedule. May continue for the agreed protection period.\n3. Future Commission: New customers or purchases generated after termination. Not commissionable unless expressly authorized."
    ],
    highlights: ["Accrued: Earned before termination", "Protected: Existing customers during protection window", "Future: No post-termination rights"]
  },
  {
    id: 46,
    title: "PROFESSIONAL SERVICES REVENUE",
    chapter: "8. Post-Termination, Rights & Recordkeeping",
    summary: "Partners keep 100% of approved implementation, configuration, and consulting fees.",
    content: [
      "Partners may independently generate revenue from approved implementation, consulting, training, migration, configuration, HR consulting, payroll consulting, and outsourcing.",
      "Unless otherwise agreed, professional-service revenue earned directly by the Partner is separate from NextSoftHR subscription commission."
    ]
  },
  {
    id: 47,
    title: "OUTSOURCING PARTNERS",
    chapter: "8. Post-Termination, Rights & Recordkeeping",
    summary: "Revenue models for BPO and payroll processing partners.",
    content: [
      "Approved outsourcing partners may earn revenue from payroll outsourcing, HR outsourcing, employee administration, HR consulting, payroll processing, and business process outsourcing.",
      "The Partner is responsible for its own professional-service pricing and obligations unless otherwise agreed."
    ]
  },
  {
    id: 48,
    title: "SPECIAL STRATEGIC AGREEMENTS",
    chapter: "8. Post-Termination, Rights & Recordkeeping",
    summary: "Custom terms permitted for government, fintech, enterprise resellers, and multinational distributors.",
    content: [
      "NextSoftHR may negotiate customized commercial terms for large distributors, enterprise resellers, regional partners, government channel partners, strategic technology partners, fintech partners, and major consulting organizations.",
      "Such arrangements must be documented in writing."
    ]
  },
  {
    id: 49,
    title: "NO AUTOMATIC ENTITLEMENT",
    chapter: "8. Post-Termination, Rights & Recordkeeping",
    summary: "Partner appointment does not guarantee leads, exclusivity, minimum sales, or territory protection.",
    content: [
      "Partner status does not automatically guarantee leads, sales, customers, revenue, commission, exclusivity, territory protection, renewals, or minimum sales volume.",
      "Commercial benefits are subject to the applicable Partner Schedule."
    ]
  },
  {
    id: 50,
    title: "CHANGES TO COMMISSION RATES",
    chapter: "8. Post-Termination, Rights & Recordkeeping",
    summary: "Prospective modifications permitted with reasonable notice; historical earnings remain protected.",
    content: [
      "NextSoftHR may modify future commission rates by providing reasonable notice.",
      "Unless otherwise stated, changes will apply to future qualifying purchases and will not retroactively alter commissions already earned.",
      "Where applicable, Partners may be given an opportunity to terminate participation following material changes."
    ]
  },
  {
    id: 51,
    title: "PARTNER PERFORMANCE REVIEW",
    chapter: "8. Post-Termination, Rights & Recordkeeping",
    summary: "Periodic operational reviews affecting tier promotion, retention, or performance plans.",
    content: [
      "NextSoftHR may periodically review revenue, customers, retention, support quality, training, certifications, lead quality, compliance, and marketing activity.",
      "The review may result in promotion, continued status, performance improvement plan, downgrade, suspension, or termination."
    ]
  },
  {
    id: 52,
    title: "PARTNER INCENTIVES",
    chapter: "8. Post-Termination, Rights & Recordkeeping",
    summary: "Temporary booster campaigns, quarterly bonuses, and certification rewards.",
    content: [
      "NextSoftHR may introduce temporary incentives such as new customer bonuses, quarterly bonuses, annual performance bonuses, regional incentives, product launch incentives, campaign incentives, certification bonuses, and customer-retention bonuses.",
      "Each incentive should have separate eligibility requirements."
    ]
  },
  {
    id: 53,
    title: "EXAMPLE COMMISSION CALCULATION",
    chapter: "9. Calculation Examples",
    summary: "Standard illustration: $1,000 subscription, Silver 20% tier, $100 refund impact.",
    content: [
      "Example scenario:",
      "• Customer subscription: $1,000\n• Applicable Partner Tier: Silver (20%)\n• Eligible commission: $200",
      "If the customer receives a $100 qualifying refund:\n• Adjusted commissionable revenue: $900 ($1,000 - $100)\n• Adjusted commission: $180 (20% of $900)",
      "The actual calculation will depend on the applicable commercial schedule and exclusions."
    ]
  },
  {
    id: 54,
    title: "EXAMPLE RECURRING COMMISSION",
    chapter: "9. Calculation Examples",
    summary: "Recurring model: $500/month recurring subscription at Gold 30% generates $1,800 annually.",
    content: [
      "Recurring scenario:",
      "• Customer monthly subscription: $500\n• Partner tier: Gold (30%)\n• Monthly qualifying commission: $150 (30% of $500)",
      "If the customer remains eligible for 12 months:\n• Potential qualifying annual commission: $1,800 ($150 × 12)",
      "This example is illustrative only and does not guarantee a specific commercial outcome."
    ]
  },
  {
    id: 55,
    title: "DISTRIBUTOR EXAMPLE",
    chapter: "9. Calculation Examples",
    summary: "Sub-reseller and master distributor override calculation breakdown.",
    content: [
      "Distributor scenario:",
      "• Customer revenue: $1,000\n• Sub-reseller compensation (20%): $200\n• Distributor override (5%): $50\n• NextSoftHR retained revenue (75%): $750",
      "The applicable commercial schedule will determine whether the distributor receives an override in addition to, or instead of, other compensation."
    ]
  },
  {
    id: 56,
    title: "PARTNER RESPONSIBILITY FOR RECORDS",
    chapter: "8. Post-Termination, Rights & Recordkeeping",
    summary: "Partners must retain customer, tax, lead, and marketing records in accordance with statutory requirements.",
    content: [
      "Partners must maintain accurate records relating to customers, leads, sales, referrals, invoices, taxes, marketing activities, and commission claims.",
      "Records should be retained for the period required by applicable law."
    ]
  },
  {
    id: 57,
    title: "NO DOUBLE COMMISSION",
    chapter: "6. Lead Registration & Protection Rules",
    summary: "Single transaction attribution policy prohibiting dual payouts on identical sales.",
    content: [
      "A transaction will not normally generate multiple full commissions merely because:",
      "• Several partners claim the same customer;\n• A customer uses multiple referral links;\n• A distributor and reseller both claim the same sale;\n• An affiliate and referral partner both claim attribution.",
      "NextSoftHR may establish an allocation or override mechanism in the applicable Partner Schedule."
    ]
  },
  {
    id: 58,
    title: "PARTNER ATTRIBUTION HIERARCHY",
    chapter: "6. Lead Registration & Protection Rules",
    summary: "Clear ranking system to resolve overlapping attribution disputes.",
    content: [
      "Where multiple partner relationships exist, NextSoftHR may consider:",
      "1. Existing contractual relationship\n2. Valid registered opportunity\n3. Approved distributor relationship\n4. Valid affiliate attribution\n5. Customer written confirmation\n6. Demonstrable sales activity\n7. Other documented evidence",
      "NextSoftHR may establish specific attribution rules for particular channels."
    ]
  },
  {
    id: 59,
    title: "CONFIDENTIALITY OF COMMERCIAL TERMS",
    chapter: "8. Post-Termination, Rights & Recordkeeping",
    summary: "Partner-specific commission rates, discounts, margins, and overrides are protected trade secrets.",
    content: [
      "Partner-specific commission rates, discounts, margins, overrides, bonuses, and strategic incentives may be treated as confidential information unless disclosure is authorized or legally required."
    ]
  },
  {
    id: 60,
    title: "ACCEPTANCE",
    chapter: "10. Acceptance & Execution Signatures",
    summary: "Formal partner affirmations, signature covenants, and commercial profile details.",
    content: [
      "The Partner confirms and covenants:",
      "☑ I have read and understood this Commission & Revenue Share Schedule.\n☑ I accept the commission, payment and attribution provisions applicable to my Partner category.\n☑ I understand that commissions are subject to customer payment, refunds, chargebacks, attribution and applicable program rules.\n☑ I understand that my specific commercial terms are contained in my Partner Schedule.",
      "Execution Details Required:\n• Partner Legal Name\n• Company Name\n• Partner Category (Reseller, Partner, Distributor, Affiliate, Associate)\n• Partner Tier (Bronze 15%, Silver 20%, Gold 30%, Platinum 40%, Custom)\n• Commission Rate %\n• Territory\n• Effective Date\n• Authorized Representative\n• Signature & Timestamp"
    ]
  },
  {
    id: 61,
    title: "NEXTSOFTHR ACCEPTANCE",
    chapter: "10. Acceptance & Execution Signatures",
    summary: "Official NextSoftHR countersignature authorization block.",
    content: [
      "For NextSoftHR:",
      "• Authorized Representative Name\n• Corporate Title\n• Official NextSoftHR Signature\n• Counter-Execution Date & Certificate Verification"
    ]
  },
  {
    id: 62,
    title: "FINAL LEGAL NOTICE",
    chapter: "10. Acceptance & Execution Signatures",
    summary: "Legal disclaimer regarding jurisdiction, professional counsel review, and master agreement binding.",
    content: [
      "This Commission & Revenue Share Schedule is intended to form part of the NextSoftHR Partner Agreement.",
      "Commercial rates, eligibility criteria, payment procedures and program rules may vary by partner category, territory, product and commercial arrangement.",
      "The final document should be reviewed and approved by qualified legal and tax professionals in the relevant jurisdictions before implementation.",
      "© 2026 NextSoftHR. All Rights Reserved. Powering People. Driving Businesses."
    ]
  }
];

export const MODULE_CATALOG = [
  { id: "hr", name: "Core HR & Employee Management", basePriceMonthly: 120, description: "Digital employee records, document management & organizational charting" },
  { id: "payroll", name: "Automated Payroll & Statutory Tax", basePriceMonthly: 180, description: "Multi-currency payroll, PAYE, pension, NHF, & automated tax remittances" },
  { id: "time", name: "Time & Attendance (Biometric/Geofenced)", basePriceMonthly: 90, description: "Shift scheduling, biometric sync, mobile clock-in & overtime engine" },
  { id: "leave", name: "Leave & Absence Management", basePriceMonthly: 60, description: "Custom leave types, accrual rules, policy tiers, & automated manager workflows" },
  { id: "recruitment", name: "Recruitment & ATS Portal", basePriceMonthly: 110, description: "Job requisition boards, candidate parsing, scorecard interviews & offer letters" },
  { id: "crm", name: "Customer Relationship Management (CRM)", basePriceMonthly: 150, description: "Sales pipelines, deal stage tracking, customer contact directory & activity logs" },
  { id: "finance", name: "Finance, Invoicing & Expenses", basePriceMonthly: 140, description: "Receipt audits, expense claims, billing schedules, and ledger reconciliation" },
  { id: "projects", name: "Projects & Timesheet Tracking", basePriceMonthly: 95, description: "Task allocation, milestone budgets, client billable hours, and progress analytics" },
  { id: "ess", name: "Employee Self-Service (ESS)", basePriceMonthly: 50, description: "Mobile-responsive portal for payslips, leave requests, and personal info updates" },
  { id: "mss", name: "Manager Self-Service (MSS)", basePriceMonthly: 65, description: "Approval queues, departmental reviews, team performance, and headcounts" },
  { id: "outsourcing", name: "Managed HR & Payroll Outsourcing", basePriceMonthly: 300, description: "End-to-end outsourced payroll processing, compliance auditing & BPO administration" },
];
