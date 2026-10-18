export interface ScheduleSection {
  id: number;
  title: string;
  category: 
    | 'Core & Overview'
    | 'Tiers & Benefits'
    | 'Commercial Rules & Modules'
    | 'Channel Models & Margins'
    | 'Leads & Protection'
    | 'Financial & Settlement'
    | 'Governance & Operations'
    | 'Professional Services'
    | 'Examples & Attribution'
    | 'Acceptance & Execution';
  summary: string;
  fullContent: string;
  tags: string[];
  keyPoints?: string[];
  highlightBadge?: string;
}

export interface PartnerTier {
  id: 'bronze' | 'silver' | 'gold' | 'platinum';
  name: string;
  rate: number; // percentage
  badgeColor: string;
  tagline: string;
  minArr?: string;
  qualification: string;
  benefits: string[];
}

export const PARTNER_TIERS: PartnerTier[] = [
  {
    id: 'bronze',
    name: 'Bronze Partner',
    rate: 15,
    badgeColor: 'from-amber-700 to-amber-900 border-amber-600/40 text-amber-200',
    tagline: 'Entry-level channel partnership',
    minArr: 'Entry / Emerging',
    qualification: 'Approved partner registration and initial onboarding.',
    benefits: [
      'Partner Portal access',
      'Lead registration capability',
      'Unique referral links & tracking',
      'Basic marketing materials & sales resources',
      'Product information & documentation',
      'Partner training sessions',
      'Standard 15% referral commission',
      'Customer referral tracking dashboard'
    ]
  },
  {
    id: 'silver',
    name: 'Silver Partner',
    rate: 20,
    badgeColor: 'from-slate-400 to-slate-600 border-slate-400/40 text-slate-100',
    tagline: 'Established commercial participant',
    minArr: '$10k - $25k ARR',
    qualification: 'Demonstrated commercial activity, verified closed deals, active pipeline.',
    benefits: [
      'Everything available to Bronze Partners',
      'Increased recurring commission of 20%',
      'Additional marketing resources & collateral',
      'Enhanced partner training & certification',
      'Dedicated sales support',
      'Partner campaign opportunities',
      'Increased lead-management capabilities',
      'Potential inclusion in NextSoftHR Partner Directory',
      'Additional technical and operational resources'
    ]
  },
  {
    id: 'gold',
    name: 'Gold / Partner',
    rate: 30,
    badgeColor: 'from-yellow-500 to-amber-600 border-yellow-400/50 text-yellow-100',
    tagline: 'Active channel driver with implementation capabilities',
    minArr: '$25k - $75k ARR',
    qualification: 'Demonstrated sales, customer acquisition, implementation, or biz-dev capabilities.',
    benefits: [
      'Everything available to Silver Partners',
      'Higher recurring commission of 30%',
      'Advanced implementation & technical training',
      'Direct customer implementation opportunities',
      'Co-marketing opportunities & joint collateral',
      'Business-development support & account planning',
      'Enhanced partner visibility in ecosystem',
      'Priority partner opportunities & deal routing',
      'Access to selected high-growth partner campaigns',
      'Potential direct customer referrals from NextSoftHR'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum Partner',
    rate: 40,
    badgeColor: 'from-cyan-400 to-blue-600 border-cyan-400/60 text-cyan-100',
    tagline: 'High-performing strategic channel powerhouse',
    minArr: '$75k+ ARR',
    qualification: 'High ARR volume, certified implementation team, outstanding customer satisfaction, strategic regional influence.',
    benefits: [
      'Highest standard recurring commission of 40%',
      'Strategic account opportunities & enterprise deals',
      'Distributor opportunities & sub-reseller rights',
      'Joint marketing funds & co-branded campaigns',
      'Priority business-development & executive alignment',
      'Advanced specialized training & certification',
      'Dedicated strategic account support architect',
      'VIP invitation to NextSoftHR partner events',
      'Enhanced directory visibility & verified badge',
      'Regional expansion opportunities & exclusivity options',
      'Special custom commercial arrangements'
    ]
  }
];

export const NEXTSOFTHR_MODULES = [
  { id: 'hr', name: 'Core HR', description: 'Employee records, lifecycle, document management, organization charts', basePrice: 120 },
  { id: 'payroll', name: 'Payroll Engine', description: 'Statutory compliance, tax calculations, pay slips, direct bank disbursements', basePrice: 200 },
  { id: 'attendance', name: 'Time & Attendance', description: 'Biometric integration, shift scheduling, geofenced mobile clocking', basePrice: 100 },
  { id: 'leave', name: 'Leave Management', description: 'Custom policies, multi-tier approvals, public holiday calendars', basePrice: 80 },
  { id: 'recruitment', name: 'Recruitment & ATS', description: 'Job boards, candidate pipeline, scorecards, onboarding workflows', basePrice: 140 },
  { id: 'crm', name: 'CRM & Client Pipeline', description: 'Lead tracking, customer communications, deals, quotes', basePrice: 150 },
  { id: 'finance', name: 'Finance & Invoicing', description: 'Billing, expenses, ledger reconciliation, automated invoice receipts', basePrice: 180 },
  { id: 'projects', name: 'Projects & Tasks', description: 'Timesheets, milestones, resource allocation, team collaboration', basePrice: 110 },
  { id: 'ess', name: 'Employee Self-Service (ESS)', description: 'Mobile and web portal for leave, payslips, profile updates', basePrice: 70 },
  { id: 'mss', name: 'Manager Self-Service (MSS)', description: 'Team approvals, performance check-ins, shift roasters', basePrice: 90 },
  { id: 'outsourcing', name: 'HR & Payroll Outsourcing', description: 'Managed HR services, outsourced payroll calculation and compliance', basePrice: 350 },
];

export const SCHEDULE_SECTIONS: ScheduleSection[] = [
  {
    id: 1,
    title: '1. PURPOSE',
    category: 'Core & Overview',
    summary: 'Establishes commercial terms for commissions, revenue share, reseller margins, referral fees, distributor overrides, or other financial benefits under the Master Agreement.',
    fullContent: `This Partner Commission & Revenue Share Schedule (“Commission Schedule”) establishes the commercial terms under which an approved NextSoftHR Partner may earn commissions, revenue share, reseller margins, referral fees, distributor overrides or other approved financial benefits.

This Schedule forms part of the NextSoftHR Reseller, Partner, Distributor, Affiliate & Associate Agreement (“Master Agreement”).

If there is a conflict between this Schedule and the Master Agreement concerning commission calculations or commercial benefits, this Schedule will control only with respect to those specific commercial matters, unless the applicable Partner Schedule expressly states otherwise.`,
    tags: ['purpose', 'master agreement', 'commercial terms', 'precedence'],
    highlightBadge: 'Governing Commercial Schedule'
  },
  {
    id: 2,
    title: '2. PARTNER COMMISSION MODEL',
    category: 'Core & Overview',
    summary: 'Flexible compensation model rewarding partners based on approved category, tier, performance, responsibilities, and commercial contribution.',
    fullContent: `NextSoftHR operates a flexible partner compensation model designed to reward partners based on their approved partner category, tier, performance, responsibilities and commercial contribution.

Eligible compensation may include:
• Referral commissions
• Affiliate commissions
• Recurring commissions
• Reseller margins
• Distributor commissions
• Distributor overrides
• Implementation revenue
• Training revenue
• Consulting revenue
• Outsourcing revenue
• Approved professional-service revenue
• Strategic partnership revenue

Not every partner category is entitled to every form of compensation. The applicable compensation will be stated in the Partner Profile and Commission Schedule assigned to the Partner.`,
    tags: ['model', 'compensation types', 'referral', 'recurring', 'overrides', 'services'],
    highlightBadge: '12 Compensation Types'
  },
  {
    id: 3,
    title: '3. STANDARD PARTNER TIERS',
    category: 'Tiers & Benefits',
    summary: 'Bronze (15%), Silver (20%), Gold / Partner (30%), Platinum (40%) standard recurring commission rates.',
    fullContent: `NextSoftHR's standard partner tiers are:

Partner Tier | Standard Recurring Commission
-------------|-----------------------------
Bronze       | 15%
Silver       | 20%
Gold / Partner | 30%
Platinum     | 40%

These percentages represent the standard program rates and may be modified by:
• Partner category
• Territory
• Product
• Customer segment
• Sales volume
• Strategic agreement
• Promotional campaign
• Distributor agreement
• Enterprise agreement
• Special commercial arrangement

The rate applicable to an individual Partner will be recorded in that Partner's approved Partner Schedule.`,
    tags: ['tiers', 'bronze', 'silver', 'gold', 'platinum', 'percentages'],
    highlightBadge: '15% - 40% Recurring Rates'
  },
  {
    id: 4,
    title: '4. BRONZE PARTNER',
    category: 'Tiers & Benefits',
    summary: '15% Commission. Entry level channel program offering portal access, lead registration, referral links, and basic marketing kits.',
    fullContent: `Standard Commission: 15%
Bronze Partners represent the entry level of the NextSoftHR channel program.

Potential benefits include:
• Partner Portal access
• Lead registration
• Referral links
• Basic marketing materials
• Product information
• Sales resources
• Partner training
• Standard referral commission
• Customer referral tracking

Bronze Partners may be upgraded based on NextSoftHR's qualification requirements.`,
    tags: ['bronze', '15%', 'entry level', 'portal access', 'lead registration'],
    highlightBadge: 'Standard Commission: 15%'
  },
  {
    id: 5,
    title: '5. SILVER PARTNER',
    category: 'Tiers & Benefits',
    summary: '20% Commission. Established channel participants with increased recurring commission, sales support, and partner directory inclusion.',
    fullContent: `Standard Commission: 20%
Silver Partners are established channel participants demonstrating increased commercial activity.

Potential benefits include:
• Everything available to Bronze Partners
• Increased recurring commission (20%)
• Additional marketing resources
• Enhanced partner training
• Sales support
• Partner campaign opportunities
• Increased lead-management capabilities
• Potential inclusion in the NextSoftHR Partner Directory
• Additional partner resources`,
    tags: ['silver', '20%', 'sales support', 'directory', 'campaigns'],
    highlightBadge: 'Standard Commission: 20%'
  },
  {
    id: 6,
    title: '6. GOLD / PARTNER',
    category: 'Tiers & Benefits',
    summary: '30% Commission. Active channel partners with sales, implementation, or biz-dev capabilities, with co-marketing and priority opportunities.',
    fullContent: `Standard Commission: 30%
Gold / Partner level participants are active channel partners with demonstrated sales, customer acquisition, implementation or business-development capabilities.

Potential benefits include:
• Everything available to Silver Partners
• Higher recurring commission (30%)
• Advanced training
• Implementation opportunities
• Co-marketing opportunities
• Business-development support
• Enhanced partner visibility
• Priority partner opportunities
• Access to selected partner campaigns
• Potential customer referrals from NextSoftHR`,
    tags: ['gold', '30%', 'implementation', 'co-marketing', 'referrals'],
    highlightBadge: 'Standard Commission: 30%'
  },
  {
    id: 7,
    title: '7. PLATINUM PARTNER',
    category: 'Tiers & Benefits',
    summary: '40% Commission. High-performing strategic relationships with top recurring rates, joint marketing funds, distributor rights, and regional expansion.',
    fullContent: `Standard Commission: 40%
Platinum Partners represent high-performing or strategically important channel relationships.

Potential benefits may include:
• Highest standard recurring commission (40%)
• Strategic account opportunities
• Distributor opportunities
• Joint marketing & Co-branded campaigns
• Priority business-development opportunities
• Advanced training & Strategic account support
• Partner events & VIP networking
• Enhanced directory visibility
• Regional expansion opportunities
• Special commercial arrangements

Platinum status is subject to NextSoftHR approval and ongoing compliance.`,
    tags: ['platinum', '40%', 'distributor', 'joint marketing', 'expansion'],
    highlightBadge: 'Standard Commission: 40%'
  },
  {
    id: 8,
    title: '8. PARTNER LEVEL QUALIFICATION',
    category: 'Tiers & Benefits',
    summary: 'Comprehensive evaluation criteria: new customers, revenue, ARR, customer retention, employee certifications, and compliance.',
    fullContent: `NextSoftHR may evaluate partner levels using a combination of:
• New customers acquired
• Revenue generated
• Annual recurring revenue (ARR)
• Subscription value
• Customer retention
• Customer satisfaction
• Number of certified employees
• Implementation capability
• Product knowledge
• Sales activity
• Lead quality
• Compliance
• Support performance
• Strategic value

NextSoftHR may review partner levels periodically. A partner may be promoted, retained, downgraded or placed on a performance plan depending on the applicable qualification criteria.`,
    tags: ['qualification', 'performance review', 'criteria', 'promotion', 'downgrade'],
    highlightBadge: '14 Evaluation Metrics'
  },
  {
    id: 9,
    title: '9. QUALIFIED CUSTOMER',
    category: 'Commercial Rules & Modules',
    summary: '8 mandatory conditions defining a legitimately attributed, non-fraudulent customer who completes payment.',
    fullContent: `A “Qualified Customer” means a prospective customer that:
1. Is legitimately attributed to the Partner;
2. Meets NextSoftHR's applicable lead qualification requirements;
3. Is not already an existing customer where existing customers are excluded;
4. Is not already assigned to another protected Partner;
5. Completes an eligible purchase;
6. Makes the required payment;
7. Is not involved in fraudulent or prohibited activity; and
8. Satisfies all applicable commercial requirements.`,
    tags: ['qualified customer', 'attribution', 'payment', 'eligibility', 'fraud'],
    highlightBadge: '8 Essential Conditions'
  },
  {
    id: 10,
    title: '10. QUALIFIED PURCHASE',
    category: 'Commercial Rules & Modules',
    summary: 'Eligible transactions including subscriptions, renewals, upgrades, seats, branches, and add-on modules.',
    fullContent: `A “Qualified Purchase” may include:
• Initial subscription
• Renewal
• Upgrade
• Additional users
• Additional employees
• Additional branches
• Additional locations
• Additional modules
• Add-on products
• Approved services
• Other qualifying purchases

The applicable Commission Schedule may exclude certain products, services, taxes, fees, promotional items or third-party products.`,
    tags: ['qualified purchase', 'renewals', 'upgrades', 'branches', 'modules'],
    highlightBadge: 'Broad Revenue Scope'
  },
  {
    id: 11,
    title: '11. COMMISSIONABLE REVENUE',
    category: 'Commercial Rules & Modules',
    summary: 'Calculated on net revenue received by NextSoftHR; excludes VAT, sales taxes, WHT, refunds, chargebacks, and payment processing fees.',
    fullContent: `Unless otherwise specified, commissions are calculated on eligible net revenue actually received by NextSoftHR.

Commissionable revenue may exclude:
• VAT
• Sales tax
• Withholding tax (WHT)
• Government charges
• Refunds
• Chargebacks
• Credits & Reversed transactions
• Payment-processing charges where applicable
• Non-commissionable services
• Third-party products
• Promotional credits
• Complimentary subscriptions & Free trials
• Bad debt

NextSoftHR will specify exceptions in the applicable Partner Schedule.`,
    tags: ['commissionable revenue', 'exclusions', 'vat', 'wht', 'refunds', 'chargebacks', 'net revenue'],
    highlightBadge: 'Net Revenue Standard'
  },
  {
    id: 12,
    title: '12. INITIAL PURCHASE',
    category: 'Commercial Rules & Modules',
    summary: 'First qualifying paid subscription purchased by a Qualified Customer through an approved Partner relationship.',
    fullContent: `An Initial Purchase is the first qualifying paid subscription purchased by a Qualified Customer through an approved Partner relationship.

The Initial Purchase must satisfy the applicable attribution and payment requirements.`,
    tags: ['initial purchase', 'first transaction', 'attribution', 'paid subscription']
  },
  {
    id: 13,
    title: '13. RECURRING COMMISSIONS',
    category: 'Commercial Rules & Modules',
    summary: 'Commissions extend across monthly, quarterly, annual, and multi-year subscriptions, renewals, user expansions, and module additions.',
    fullContent: `Where the applicable Partner Plan provides recurring commissions, the Partner may receive a commission on qualifying recurring subscription revenue.

Recurring commission eligibility may apply to:
• Monthly subscriptions
• Quarterly subscriptions
• Annual subscriptions
• Multi-year subscriptions
• Renewals
• Upgrades
• Additional users
• Additional branches
• Additional modules

The precise duration of recurring commission eligibility will be stated in the applicable Partner Schedule.`,
    tags: ['recurring', 'subscriptions', 'renewals', 'cadence', 'duration'],
    highlightBadge: 'Multi-term Coverage'
  },
  {
    id: 14,
    title: '14. RECOMMENDED RECURRING COMMISSION MODEL',
    category: 'Commercial Rules & Modules',
    summary: 'Bronze 15%, Silver 20%, Gold / Partner 30%, Platinum 40% on eligible revenue subject to refunds, cancellations, and payment.',
    fullContent: `Unless otherwise agreed:
• Bronze: 15% recurring commission
• Silver: 20% recurring commission
• Gold / Partner: 30% recurring commission
• Platinum: 40% recurring commission

The commission applies only to eligible revenue and remains subject to refunds, cancellations, chargebacks, customer payment and other provisions of this Schedule.`,
    tags: ['recurring model', 'bronze 15%', 'silver 20%', 'gold 30%', 'platinum 40%']
  },
  {
    id: 15,
    title: '15. COMMISSION ON UPGRADES',
    category: 'Commercial Rules & Modules',
    summary: 'Partner earns commission on qualifying incremental revenue when a customer expands users, branches, modules, or subscription tiers.',
    fullContent: `Where an existing Qualified Customer:
• Adds users
• Adds employees
• Adds branches
• Adds locations
• Purchases additional modules
• Upgrades subscription level
• Adds eligible services

the Partner may receive commission on the qualifying incremental revenue, subject to the applicable Partner Schedule.`,
    tags: ['upgrades', 'expansion', 'incremental revenue', 'upsell'],
    highlightBadge: 'Expansion Commission'
  },
  {
    id: 16,
    title: '16. ADD-ON MODULE COMMISSIONS',
    category: 'Commercial Rules & Modules',
    summary: 'Eligibility across HR, Payroll, Time & Attendance, Leave, Recruitment, CRM, Finance, Projects, ESS, MSS, and Outsourcing.',
    fullContent: `Eligible NextSoftHR modules may include, subject to commercial availability:
• HR
• Payroll
• Time & Attendance
• Leave
• Recruitment
• CRM
• Finance
• Projects
• Employee Self-Service (ESS)
• Manager Self-Service (MSS)
• Outsourcing
• Other NextSoftHR modules

Commission treatment for each module may be specified in the Commission Schedule.`,
    tags: ['modules', 'hr', 'payroll', 'crm', 'finance', 'attendance', 'leave', 'outsourcing']
  },
  {
    id: 17,
    title: '17. MULTI-COMPANY, MULTI-BRANCH AND MULTI-LOCATION CUSTOMERS',
    category: 'Commercial Rules & Modules',
    summary: 'Revenue from multi-branch, multi-company, and multi-location corporate accounts qualifies for commission when properly attributed.',
    fullContent: `Where a Qualified Customer operates multiple:
• Companies
• Branches
• Locations
• Departments
• Business units

eligible subscription revenue may qualify for commission provided the purchase is properly attributed to the Partner.`,
    tags: ['multi-branch', 'multi-company', 'enterprise', 'attribution']
  },
  {
    id: 18,
    title: '18. RESELLER MARGIN',
    category: 'Channel Models & Margins',
    summary: 'Resellers purchase at a defined discount and sell at list price; establishes list price, purchase price, reseller margin, and maximum discount.',
    fullContent: `Approved Resellers may receive a reseller margin rather than, or in addition to, a referral commission.

The applicable Reseller Schedule may specify:
• Customer List Price: [Insert]
• Reseller Purchase Price: [Insert]
• Reseller Margin: [Insert %]
• Maximum Customer Discount: [Insert %]
• Minimum Authorized Price: [Insert]

Resellers must not represent unauthorized prices as official NextSoftHR pricing.`,
    tags: ['reseller margin', 'wholesale', 'list price', 'discounting', 'pricing compliance'],
    highlightBadge: 'Authorized Margin Control'
  },
  {
    id: 19,
    title: '19. DISTRIBUTOR COMMISSION',
    category: 'Channel Models & Margins',
    summary: 'Distributors earn direct commissions, reseller sales margins, sub-reseller overrides, and territory-level incentives.',
    fullContent: `Approved Distributors may receive distributor compensation based on:
• Direct customer sales
• Reseller sales
• Distributor-managed opportunities
• Territory revenue
• Approved reseller network revenue

The Distributor Schedule may specify:
• Distributor Margin: [Insert]
• Direct Commission: [Insert]
• Sub-Reseller Override: [Insert]
• Territory Commission: [Insert]
• Strategic Incentive: [Insert]`,
    tags: ['distributor', 'network revenue', 'override', 'territory', 'channel']
  },
  {
    id: 20,
    title: '20. SUB-RESELLER OVERRIDE',
    category: 'Channel Models & Margins',
    summary: 'Multi-tier distribution cascade: Customer Revenue -> Sub-Reseller Commission -> Distributor Override -> NextSoftHR Net Revenue.',
    fullContent: `Where NextSoftHR authorizes a Distributor to recruit and manage sub-resellers, a distributor override may apply.

Example structure:
Customer Revenue
  ↓
Sub-Reseller Commission
  ↓
Distributor Override
  ↓
NextSoftHR Revenue

The exact percentages must be defined in the Distributor Schedule. No partner may recruit sub-resellers without written authorization.`,
    tags: ['sub-reseller', 'distributor override', 'hierarchy', 'written authorization'],
    highlightBadge: 'Hierarchical Overrides'
  },
  {
    id: 21,
    title: '21. AFFILIATE COMMISSION',
    category: 'Channel Models & Margins',
    summary: 'Generated through tracking links, referral codes, approved landing pages, and portal attribution, subject to anti-fraud controls.',
    fullContent: `Affiliates may receive commissions based on qualifying customers generated through:
• Affiliate links
• Referral codes
• Approved landing pages
• Campaign tracking
• Partner Portal attribution

Affiliate commission is subject to:
• Attribution
• Cookie/tracking period
• Customer qualification
• Payment completion
• Refund period
• Anti-fraud controls`,
    tags: ['affiliate', 'tracking links', 'referral codes', 'cookie period', 'fraud controls']
  },
  {
    id: 22,
    title: '22. REFERRAL COMMISSION',
    category: 'Channel Models & Margins',
    summary: 'Four conditions for referral payout: Registered referral, NextSoftHR acceptance, prospect qualifies, qualifying payment made.',
    fullContent: `Referral Partners may receive a commission when:
1. The referral is registered;
2. NextSoftHR accepts the referral;
3. The prospect becomes a Qualified Customer;
4. The customer makes a qualifying payment.

The applicable referral percentage will be specified in the Partner Schedule.`,
    tags: ['referral partner', 'deal registration', 'acceptance', 'payment trigger']
  },
  {
    id: 23,
    title: '23. LEAD REGISTRATION',
    category: 'Leads & Protection',
    summary: 'Mandatory registration via Partner Portal with Customer, Company, Contact, Country, Industry, Requirement, Value, and Date.',
    fullContent: `Partners must register opportunities through the approved NextSoftHR Partner Portal or other authorized process.

Lead registration should include:
• Customer name
• Company name
• Contact details
• Country
• Industry
• Product requirement
• Expected purchase value
• Expected purchase date`,
    tags: ['lead registration', 'partner portal', 'deal registration', 'mandatory fields'],
    highlightBadge: 'Mandatory Portal Submission'
  },
  {
    id: 24,
    title: '24. LEAD PROTECTION PERIOD',
    category: 'Leads & Protection',
    summary: 'Standard 90-day lead protection window. May be customized for enterprise, government, or strategic deals; released if inactive.',
    fullContent: `Standard recommended lead protection: 90 days.

NextSoftHR may establish a different period for:
• Enterprise accounts
• Government opportunities
• Distributor opportunities
• Strategic opportunities
• Large accounts
• Special campaigns

If a Partner fails to meaningfully progress an opportunity during the protection period, NextSoftHR may release the opportunity.`,
    tags: ['lead protection', '90 days', 'enterprise', 'expiration', 'release'],
    highlightBadge: '90-Day Protection Window'
  },
  {
    id: 25,
    title: '25. DUPLICATE LEADS',
    category: 'Leads & Protection',
    summary: 'Priority hierarchy: Valid first registration, Customer confirmation, Existing relationship, Demonstrable activity, Approved records.',
    fullContent: `Where multiple Partners submit the same prospect, priority may be determined by:
1. Valid first registration
2. Customer confirmation
3. Existing commercial relationship
4. Demonstrable sales activity
5. Approved attribution records

NextSoftHR's Partner Operations team may make the final administrative determination subject to the dispute procedure.`,
    tags: ['duplicate leads', 'first registration', 'tie-breaker', 'partner operations'],
    highlightBadge: '5 Priority Rules'
  },
  {
    id: 26,
    title: '26. AFFILIATE COOKIE PERIOD',
    category: 'Leads & Protection',
    summary: 'Recommended default 90-day tracking cookie. Subject to browser settings, privacy controls, and direct purchase limitations.',
    fullContent: `Recommended default: 90 days.
The tracking period may be changed by NextSoftHR.

Tracking may be affected by:
• Browser settings
• Cookie deletion
• Privacy restrictions
• Ad blockers
• Device changes
• Technical failures
• Direct purchases
• Other attribution limitations

No commission is guaranteed solely because an affiliate link was clicked.`,
    tags: ['cookie period', '90 days', 'browser tracking', 'attribution limits']
  },
  {
    id: 27,
    title: '27. SELF-REFERRALS',
    category: 'Leads & Protection',
    summary: 'Strict prohibition against self-purchasing, purchasing for employees/family, duplicate accounts, or artificial revenue inflation.',
    fullContent: `Partners may not generate commissions by:
• Purchasing for themselves
• Purchasing for their employees
• Purchasing for immediate family members
• Creating artificial accounts
• Creating duplicate accounts
• Generating fake leads
• Artificially inflating revenue

NextSoftHR may reverse commissions resulting from prohibited self-referrals.`,
    tags: ['self-referral', 'prohibition', 'family', 'artificial accounts', 'clawback'],
    highlightBadge: 'Strictly Prohibited'
  },
  {
    id: 28,
    title: '28. FRAUD PREVENTION',
    category: 'Leads & Protection',
    summary: 'NextSoftHR actively investigates fake leads, cookie stuffing, automated traffic, manipulated attribution, and clawbacks unearned payouts.',
    fullContent: `NextSoftHR may investigate:
• Fake leads
• Fake accounts
• Cookie stuffing
• Automated traffic
• Fraudulent purchases
• Manipulated attribution
• Duplicate accounts
• Misleading campaigns
• Unauthorized incentives

Fraudulent commissions may be withheld, reversed or recovered.`,
    tags: ['fraud prevention', 'cookie stuffing', 'automated bots', 'withholding']
  },
  {
    id: 29,
    title: '29. CUSTOMER CANCELLATION',
    category: 'Financial & Settlement',
    summary: 'Commission ceases upon cancellation date. Unpaid commissions within refund window cancelled; offsets against future payouts.',
    fullContent: `If a customer cancels:
• Commission eligibility may cease from the effective cancellation date.
• If the customer cancels during an applicable refund period, unpaid commission may be cancelled.
• Where commission was already paid and subsequently reversed through a refund or chargeback, NextSoftHR may offset the amount against future commissions.`,
    tags: ['cancellation', 'offset', 'churn', 'future commissions']
  },
  {
    id: 30,
    title: '30. CUSTOMER REFUNDS',
    category: 'Financial & Settlement',
    summary: 'Zero commission on fully refunded revenue; proportional recalculation on partial refunds.',
    fullContent: `No commission is earned on revenue that is fully refunded.

Where a partial refund occurs, the commission may be recalculated proportionally based on the remaining net revenue.`,
    tags: ['refunds', 'proportional recalculation', 'net adjustment']
  },
  {
    id: 31,
    title: '31. CHARGEBACKS',
    category: 'Financial & Settlement',
    summary: 'Payment disputes and chargebacks lead to immediate cancellation, reversal, or offset from subsequent commissions.',
    fullContent: `Where a transaction is reversed through a payment dispute or chargeback, the associated commission may be:
• Cancelled
• Reversed
• Offset
• Recovered from future commissions`,
    tags: ['chargebacks', 'payment disputes', 'reversal', 'clawback']
  },
  {
    id: 32,
    title: '32. FREE TRIALS',
    category: 'Financial & Settlement',
    summary: 'Free trials are non-commissionable until conversion to an active, qualifying paid subscription.',
    fullContent: `Free trials are generally non-commissionable unless expressly included in a promotional campaign.

A commission may become eligible when the customer converts to a qualifying paid subscription.`,
    tags: ['free trials', 'trial conversion', 'non-commissionable']
  },
  {
    id: 33,
    title: '33. PROMOTIONAL PRICING',
    category: 'Financial & Settlement',
    summary: 'Clarifies commission calculations on discounted or campaign pricing versus standard catalog list prices.',
    fullContent: `NextSoftHR may run:
• Seasonal promotions
• Partner promotions
• Launch campaigns
• Discount campaigns
• Regional campaigns
• Enterprise promotions

The Commission Schedule may specify whether commissions are calculated on standard price, discounted price, or actual net revenue.`,
    tags: ['promotions', 'discounted price', 'net revenue', 'campaigns']
  },
  {
    id: 34,
    title: '34. PAYMENT THRESHOLD',
    category: 'Financial & Settlement',
    summary: 'Recommended minimum payout threshold of USD $100 (or equivalent local currency); balances roll forward until met.',
    fullContent: `Recommended minimum payout: USD $100 or equivalent local currency.

NextSoftHR may change the threshold.
Amounts below the threshold may roll forward until the minimum threshold is reached.`,
    tags: ['payment threshold', '$100 minimum', 'roll forward', 'payout limit'],
    highlightBadge: 'Min Payout: USD $100'
  },
  {
    id: 35,
    title: '35. PAYMENT FREQUENCY',
    category: 'Financial & Settlement',
    summary: 'Monthly commission reconciliation and payout cycle following revenue verification, refund reviews, and tax checks.',
    fullContent: `Recommended: Monthly.

Commission statements may be generated after the applicable accounting period.
Payment may occur after:
• Revenue reconciliation
• Refund review
• Chargeback review
• Fraud review
• Tax review
• Minimum payout threshold confirmation`,
    tags: ['payment frequency', 'monthly payouts', 'reconciliation', 'accounting cycle'],
    highlightBadge: 'Monthly Payout Schedule'
  },
  {
    id: 36,
    title: '36. PAYMENT METHODS',
    category: 'Financial & Settlement',
    summary: 'Supported methods include bank transfer, wire transfer, and approved designated digital payment platforms.',
    fullContent: `Approved payment methods may include:
• Bank transfer
• Wire transfer
• Approved payment platforms
• Other payment methods designated by NextSoftHR

The Partner is responsible for maintaining accurate payment information in the Partner Portal.`,
    tags: ['payment methods', 'bank transfer', 'wire transfer', 'banking info']
  },
  {
    id: 37,
    title: '37. CURRENCY',
    category: 'Financial & Settlement',
    summary: 'Calculated in the transaction currency; standard accounting exchange rates apply when currency conversion is required.',
    fullContent: `Commissions may be calculated in the currency in which the qualifying transaction is received.

Where conversion is required, NextSoftHR may use its applicable accounting or payment-provider exchange rate. Currency conversion differences do not create an additional commission entitlement.`,
    tags: ['currency', 'fx rates', 'exchange rate', 'usd', 'local currency']
  },
  {
    id: 38,
    title: '38. TAXES',
    category: 'Financial & Settlement',
    summary: 'Partners are liable for income, corporate, VAT, and sales taxes. NextSoftHR withholds taxes where legally required.',
    fullContent: `Partners are responsible for their applicable:
• Income taxes
• Corporate taxes
• VAT
• Sales taxes
• Withholding obligations (WHT)
• Local government charges

NextSoftHR may withhold taxes where legally required. Partners must provide appropriate tax documentation when requested.`,
    tags: ['taxes', 'vat', 'withholding tax', 'compliance', 'wht']
  },
  {
    id: 39,
    title: '39. COMMISSION STATEMENTS',
    category: 'Governance & Operations',
    summary: 'Specifies 11 itemized fields for all Partner Portal statements (Customer, Invoice, Product, Dates, Revenue, Adjustments, Net).',
    fullContent: `Partner Portal statements should display:
1. Customer
2. Invoice
3. Product
4. Purchase date
5. Revenue
6. Commissionable revenue
7. Commission percentage
8. Commission amount
9. Refund adjustment
10. Chargeback adjustment
11. Net commission & Payment status`,
    tags: ['commission statements', 'itemized fields', 'reporting', 'audit trail'],
    highlightBadge: '11 Standard Statement Fields'
  },
  {
    id: 40,
    title: '40. COMMISSION DISPUTES',
    category: 'Governance & Operations',
    summary: 'Strict 30-day window from statement publication for partners to file formal itemized disputes with supporting proof.',
    fullContent: `Partners must submit commission disputes within: 30 days from the date the commission statement becomes available.

Disputes should include:
• Customer name
• Invoice number
• Partner ID
• Transaction details
• Amount disputed
• Supporting documentation

NextSoftHR may investigate and issue a determination.`,
    tags: ['disputes', '30 days', 'partner id', 'investigation', 'invoice'],
    highlightBadge: '30-Day Dispute Window'
  },
  {
    id: 41,
    title: '41. COMMISSION AUDIT',
    category: 'Governance & Operations',
    summary: 'NextSoftHR may audit accounts for errors, duplicates, fraudulent entries, and offset previous overpayments from future batches.',
    fullContent: `NextSoftHR may review commission accounts to identify:
• Errors
• Duplicate payments
• Fraud
• Refunds & Chargebacks
• Incorrect attribution
• Incorrect partner tier

Overpayments may be offset against future commissions.`,
    tags: ['audit', 'overpayments', 'account review', 'tier verification']
  },
  {
    id: 42,
    title: '42. CUSTOMER OWNERSHIP',
    category: 'Governance & Operations',
    summary: 'Commission does not grant permanent customer ownership. NextSoftHR retains full right to direct communication and service notices.',
    fullContent: `Partner commission does not automatically establish permanent ownership of a customer. Customer relationship rights may depend on partner type, reseller status, customer agreement, territory, and commercial schedule.

NextSoftHR retains the right to communicate directly with customers concerning:
• Billing
• Security
• Product support
• Legal requirements
• Service notices
• Account management
• Renewals
• Product changes`,
    tags: ['customer ownership', 'direct communication', 'support', 'renewals']
  },
  {
    id: 43,
    title: '43. CUSTOMER RENEWALS',
    category: 'Governance & Operations',
    summary: 'Renewals qualify for recurring commission contingent upon active partner status, timely payment, and contractual compliance.',
    fullContent: `Where recurring commission applies, eligible renewals may generate commissions.

Renewals may be subject to:
• Active partner status
• Customer payment
• Customer retention
• Applicable commission period
• Partner relationship
• Contractual requirements`,
    tags: ['renewals', 'retention', 'recurring commission', 'active status']
  },
  {
    id: 44,
    title: '44. POST-TERMINATION COMMISSIONS',
    category: 'Governance & Operations',
    summary: 'Rules for termination by partner, termination without cause, breach, and fraud.',
    fullContent: `Unless a Partner Schedule provides otherwise:
• Termination by Partner: Eligible commissions accrued before termination remain payable.
• Termination by NextSoftHR without cause: Eligible commissions on qualifying customers may continue for the period specifically stated in the applicable Commission Schedule.
• Termination for partner breach: NextSoftHR may stop future commissions associated with the terminated relationship, subject to applicable law and accrued contractual rights.
• Fraud / misconduct: NextSoftHR may withhold or reverse commissions connected with fraudulent or prohibited conduct, subject to applicable law.`,
    tags: ['post-termination', 'accrued commission', 'cause', 'breach', 'forfeiture']
  },
  {
    id: 45,
    title: '45. RECOMMENDED POST-TERMINATION MODEL',
    category: 'Governance & Operations',
    summary: 'Three clear buckets: Accrued Commission (payable), Protected Commission (defined run-off window), Future Commission (zero).',
    fullContent: `For greater clarity, three categories are created:

1. Accrued Commission:
Commission already earned before termination. Payable subject to reconciliation.

2. Protected Commission:
Commission from customers who became Qualified Customers before termination and remain eligible under the applicable schedule. May continue for the agreed protection period.

3. Future Commission:
New customers or purchases generated after termination. Not commissionable unless expressly authorized.`,
    tags: ['post-termination model', 'accrued', 'protected', 'future commissions'],
    highlightBadge: '3-Tier Termination Rule'
  },
  {
    id: 46,
    title: '46. PROFESSIONAL SERVICES REVENUE',
    category: 'Professional Services',
    summary: 'Partners retain 100% of approved implementation, configuration, consulting, training, and migration fees billed directly to customers.',
    fullContent: `Partners may independently generate revenue from approved:
• Implementation
• Consulting
• Training
• Migration
• Configuration
• HR consulting
• Payroll consulting
• Outsourcing

Unless otherwise agreed, professional-service revenue earned directly by the Partner is separate from NextSoftHR subscription commission.`,
    tags: ['professional services', 'implementation fees', 'consulting', 'training', '100% retention'],
    highlightBadge: 'Partner Retains 100%'
  },
  {
    id: 47,
    title: '47. OUTSOURCING PARTNERS',
    category: 'Professional Services',
    summary: 'Approved HR & payroll outsourcing partners set their own service pricing while managing customer operational administration.',
    fullContent: `Approved outsourcing partners may earn revenue from:
• Payroll outsourcing
• HR outsourcing
• Employee administration
• HR consulting
• Payroll processing
• Business process outsourcing (BPO)

The Partner is responsible for its own professional-service pricing and obligations unless otherwise agreed.`,
    tags: ['outsourcing', 'bpo', 'payroll processing', 'managed services']
  },
  {
    id: 48,
    title: '48. SPECIAL STRATEGIC AGREEMENTS',
    category: 'Professional Services',
    summary: 'Customized commercial terms for large distributors, enterprise resellers, government channel partners, and fintech alliances.',
    fullContent: `NextSoftHR may negotiate customized commercial terms for:
• Large distributors
• Enterprise resellers
• Regional partners
• Government channel partners
• Strategic technology partners
• Fintech partners
• Major consulting organizations

Such arrangements must be documented in writing.`,
    tags: ['strategic agreements', 'enterprise', 'government', 'fintech', 'custom terms']
  },
  {
    id: 49,
    title: '49. NO AUTOMATIC ENTITLEMENT',
    category: 'Professional Services',
    summary: 'Partner status does not guarantee leads, sales, territory exclusivity, minimum volumes, or automatic renewal revenue.',
    fullContent: `Partner status does not automatically guarantee:
• Leads
• Sales
• Customers
• Revenue
• Commission
• Exclusivity
• Territory protection
• Renewals
• Minimum sales volume

Commercial benefits are subject to the applicable Partner Schedule.`,
    tags: ['no guarantee', 'disclaimer', 'exclusivity', 'performance']
  },
  {
    id: 50,
    title: '50. CHANGES TO COMMISSION RATES',
    category: 'Professional Services',
    summary: 'Rate adjustments require reasonable advance notice and apply prospectively without altering already-earned commissions.',
    fullContent: `NextSoftHR may modify future commission rates by providing reasonable notice.

Unless otherwise stated:
• Changes will apply to future qualifying purchases and will not retroactively alter commissions already earned.
• Where applicable, Partners may be given an opportunity to terminate participation following material changes.`,
    tags: ['rate changes', 'advance notice', 'non-retroactive', 'termination right']
  },
  {
    id: 51,
    title: '51. PARTNER PERFORMANCE REVIEW',
    category: 'Professional Services',
    summary: 'Periodic reviews evaluate revenue, customer retention, certifications, and compliance, leading to tier adjustments or PIPs.',
    fullContent: `NextSoftHR may periodically review:
• Revenue & ARR
• Customers acquired
• Retention rates
• Support quality
• Training & Certifications
• Lead quality
• Compliance & Integrity
• Marketing activity

The review may result in:
• Promotion to higher tier
• Continued status
• Performance improvement plan (PIP)
• Downgrade
• Suspension
• Termination`,
    tags: ['performance review', 'tier upgrade', 'pip', 'certifications']
  },
  {
    id: 52,
    title: '52. PARTNER INCENTIVES',
    category: 'Professional Services',
    summary: 'Supplementary temporary bonus programs: new customer bonuses, quarterly targets, certification bonuses, and retention awards.',
    fullContent: `NextSoftHR may introduce temporary incentives such as:
• New customer bonuses
• Quarterly bonuses
• Annual performance bonuses
• Regional incentives
• Product launch incentives
• Campaign incentives
• Certification bonuses
• Customer-retention bonuses

Each incentive should have separate eligibility requirements.`,
    tags: ['incentives', 'bonuses', 'quarterly targets', 'promotions'],
    highlightBadge: 'Performance Bonuses'
  },
  {
    id: 53,
    title: '53. EXAMPLE COMMISSION CALCULATION',
    category: 'Examples & Attribution',
    summary: 'Official numerical calculation on a $1,000 subscription at Silver tier (20%) adjusted for a $100 refund.',
    fullContent: `Example:
Customer subscription: $1,000
Applicable Partner Tier: Silver (20%)
Eligible commission: $200

If the customer receives a $100 qualifying refund:
Adjusted commissionable revenue: $900
Adjusted commission (20%): $180

The actual calculation will depend on the applicable commercial schedule and exclusions.`,
    tags: ['example 53', 'silver tier', 'refund adjustment', '$180 net'],
    highlightBadge: 'Illustrative Example 1'
  },
  {
    id: 54,
    title: '54. EXAMPLE RECURRING COMMISSION',
    category: 'Examples & Attribution',
    summary: 'Official recurring model: Gold partner (30%) on a $500 monthly subscription yields $150/mo or $1,800 over 12 months.',
    fullContent: `Example:
Customer monthly subscription: $500
Partner tier: Gold (30%)
Monthly qualifying commission: $150

If the customer remains eligible for 12 months:
Potential qualifying commission: $1,800

This example is illustrative only and does not guarantee a specific commercial outcome.`,
    tags: ['example 54', 'gold tier', '$150/month', '$1,800 annual', 'recurring'],
    highlightBadge: 'Illustrative Example 2'
  },
  {
    id: 55,
    title: '55. DISTRIBUTOR EXAMPLE',
    category: 'Examples & Attribution',
    summary: 'Distributor model with $1,000 revenue: 20% ($200) to sub-reseller and 5% ($50) distributor override.',
    fullContent: `Example:
Customer revenue: $1,000
Sub-reseller compensation: 20% ($200)
Distributor override: 5% ($50)

The applicable commercial schedule will determine whether the distributor receives an override in addition to, or instead of, other compensation.`,
    tags: ['example 55', 'distributor', 'override', 'sub-reseller', 'cascade'],
    highlightBadge: 'Illustrative Example 3'
  },
  {
    id: 56,
    title: '56. PARTNER RESPONSIBILITY FOR RECORDS',
    category: 'Examples & Attribution',
    summary: 'Partners must retain audit-ready logs of customers, leads, sales, referrals, invoices, taxes, and claims.',
    fullContent: `Partners must maintain accurate records relating to:
• Customers
• Leads
• Sales
• Referrals
• Invoices
• Taxes
• Marketing activities
• Commission claims

Records should be retained for the period required by applicable law.`,
    tags: ['record keeping', 'compliance', 'audit trails', 'retention']
  },
  {
    id: 57,
    title: '57. NO DOUBLE COMMISSION',
    category: 'Examples & Attribution',
    summary: 'Prevents multi-partner commission stacking on a single deal via clear allocation or override mechanisms.',
    fullContent: `A transaction will not normally generate multiple full commissions merely because:
• Several partners claim the same customer;
• A customer uses multiple referral links;
• A distributor and reseller both claim the same sale;
• An affiliate and referral partner both claim attribution.

NextSoftHR may establish an allocation or override mechanism in the applicable Partner Schedule.`,
    tags: ['no double commission', 'anti-stacking', 'attribution single-source']
  },
  {
    id: 58,
    title: '58. PARTNER ATTRIBUTION HIERARCHY',
    category: 'Examples & Attribution',
    summary: 'Strict 7-tier hierarchy for resolving competing partner claims on transactions.',
    fullContent: `Where multiple partner relationships exist, NextSoftHR may consider:
1. Existing contractual relationship
2. Valid registered opportunity
3. Approved distributor relationship
4. Valid affiliate attribution
5. Customer confirmation
6. Sales activity
7. Other documented evidence

NextSoftHR may establish specific attribution rules for particular channels.`,
    tags: ['attribution hierarchy', 'priority', 'conflict resolution', '7 levels'],
    highlightBadge: '7 Priority Levels'
  },
  {
    id: 59,
    title: '59. CONFIDENTIALITY OF COMMERCIAL TERMS',
    category: 'Examples & Attribution',
    summary: 'Rates, margins, discounts, overrides, and strategic bonuses are confidential commercial information.',
    fullContent: `Partner-specific:
• Commission rates
• Discounts
• Margins
• Overrides
• Bonuses
• Strategic incentives

may be treated as confidential information unless disclosure is authorized or legally required.`,
    tags: ['confidentiality', 'nda', 'rates', 'margins', 'non-disclosure']
  },
  {
    id: 60,
    title: '60. ACCEPTANCE',
    category: 'Acceptance & Execution',
    summary: 'Four mandatory declarations and signature block for Partner authorized representative.',
    fullContent: `The Partner confirms:
☐ I have read and understood this Commission & Revenue Share Schedule.
☐ I accept the commission, payment and attribution provisions applicable to my Partner category.
☐ I understand that commissions are subject to customer payment, refunds, chargebacks, attribution and applicable program rules.
☐ I understand that my specific commercial terms are contained in my Partner Schedule.

Partner Name: ______________________
Company: ___________________________
Partner Category: ___________________
Partner Tier: _______________________
Commission Rate: ____________________
Territory: ___________________________
Effective Date: ______________________
Authorized Representative: ___________
Signature: __________________________
Date: ______________________________`,
    tags: ['acceptance', 'partner sign-off', 'execution', 'declarations'],
    highlightBadge: 'Mandatory Execution Form'
  },
  {
    id: 61,
    title: '61. NEXTSOFTHR ACCEPTANCE',
    category: 'Acceptance & Execution',
    summary: 'Official NextSoftHR counter-signature execution block for authorized corporate officer.',
    fullContent: `For NextSoftHR
Authorized Representative:
________________________________________
Name:
________________________________________
Title:
________________________________________
Signature:
________________________________________
Date:
________________________________________`,
    tags: ['nextsofthr acceptance', 'countersign', 'corporate authorization']
  },
  {
    id: 62,
    title: '62. FINAL LEGAL NOTICE',
    category: 'Acceptance & Execution',
    summary: 'Schedule B status under Master Agreement, jurisdictional tax & legal review reminder, and copyright notice.',
    fullContent: `This Commission & Revenue Share Schedule is intended to form part of the NextSoftHR Partner Agreement.

Commercial rates, eligibility criteria, payment procedures and program rules may vary by partner category, territory, product and commercial arrangement.

The final document should be reviewed and approved by qualified legal and tax professionals in the relevant jurisdictions before implementation.

© 2026 NextSoftHR. All Rights Reserved.
Website: www.nextsofthr.org | Phone: +2349158482622
Tagline: Powering People. Driving Businesses.`,
    tags: ['legal notice', 'disclaimer', 'copyright', 'jurisdiction'],
    highlightBadge: 'Official Legal Notice'
  }
];

export const CATEGORIES = [
  'All Sections',
  'Core & Overview',
  'Tiers & Benefits',
  'Commercial Rules & Modules',
  'Channel Models & Margins',
  'Leads & Protection',
  'Financial & Settlement',
  'Governance & Operations',
  'Professional Services',
  'Examples & Attribution',
  'Acceptance & Execution'
] as const;

export const SAMPLE_STATEMENTS = [
  {
    id: 'STMT-2026-001',
    customer: 'Zenith Global Logistics Ltd',
    invoice: 'INV-NX-8821',
    product: 'Core HR + Payroll + ESS (120 Seats)',
    purchaseDate: '2026-08-15',
    revenue: 4500,
    commissionableRevenue: 4200,
    commissionPct: 30, // Gold
    commissionAmount: 1260,
    refundAdjustment: 0,
    chargebackAdjustment: 0,
    netCommission: 1260,
    paymentStatus: 'Paid via Wire Transfer',
    period: 'August 2026'
  },
  {
    id: 'STMT-2026-002',
    customer: 'Apex Financial Services Plc',
    invoice: 'INV-NX-8940',
    product: 'Full Enterprise Suite (3 Branches)',
    purchaseDate: '2026-08-28',
    revenue: 9000,
    commissionableRevenue: 8500,
    commissionPct: 30, // Gold
    commissionAmount: 2550,
    refundAdjustment: -200,
    chargebackAdjustment: 0,
    netCommission: 2350,
    paymentStatus: 'Paid via Bank Transfer',
    period: 'August 2026'
  },
  {
    id: 'STMT-2026-003',
    customer: 'Horizon HealthTech Systems',
    invoice: 'INV-NX-9104',
    product: 'Time & Attendance + Leave Module',
    purchaseDate: '2026-09-10',
    revenue: 1800,
    commissionableRevenue: 1700,
    commissionPct: 30,
    commissionAmount: 510,
    refundAdjustment: 0,
    chargebackAdjustment: 0,
    netCommission: 510,
    paymentStatus: 'Scheduled (Next Monthly Run)',
    period: 'September 2026'
  },
  {
    id: 'STMT-2026-004',
    customer: 'Vanguard Retail Chain',
    invoice: 'INV-NX-9188',
    product: 'Recruitment & ATS + 5 Branches',
    purchaseDate: '2026-09-22',
    revenue: 3200,
    commissionableRevenue: 3000,
    commissionPct: 30,
    commissionAmount: 900,
    refundAdjustment: -150,
    chargebackAdjustment: 0,
    netCommission: 750,
    paymentStatus: 'Scheduled (Next Monthly Run)',
    period: 'September 2026'
  }
];
