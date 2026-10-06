export type PartnerCategoryType =
  | 'reseller'
  | 'distributor'
  | 'affiliate'
  | 'referral'
  | 'associate'
  | 'accountant'
  | 'hr_consultant'
  | 'technology'
  | 'implementation'
  | 'training'
  | 'outsourcing'
  | 'strategic';

export interface PartnerCategory {
  id: PartnerCategoryType;
  title: string;
  shortDesc: string;
  fullDesc: string;
  authorizationScope: string;
  commissionType: string;
  defaultTier: string;
  keyRequirements: string[];
  allowedActivities: string[];
}

export interface PartnerTier {
  id: 'bronze' | 'silver' | 'gold' | 'platinum';
  name: string;
  recurringRate: number; // e.g. 15, 20, 30, 40%
  description: string;
  qualificationCriteria: string[];
  recommendedVolume: string;
  supportLevel: string;
  badgeColor: string;
}

export interface LegalClause {
  number: number;
  title: string;
  category: 'Governance & Purpose' | 'Channel Ecosystem & Rights' | 'Commercials & Commission' | 'Operational & Support' | 'Compliance, IP & Security' | 'Risk, Liability & Termination' | 'Schedules & Addenda';
  summary: string;
  fullText: string;
  keyTakeaway: string;
  practicalApplication: string;
}

export interface TerritoryConfig {
  country: string;
  region: string;
  stateProvince: string;
  city: string;
  industry: string;
  customerSegment: string;
  product: string;
  exclusivity: 'Non-Exclusive' | 'Exclusive (Subject to Schedule)';
  leadProtectionPeriodDays: number;
  specialConditions: string;
  contractingEntity: string;
  governingLaw: string;
  arbitrationVenue: string;
}

export interface LeadRecord {
  id: string;
  prospectName: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  industry: string;
  estimatedEmployeeCount: number;
  productInterest: string;
  estimatedOpportunityValue: number;
  expectedPurchaseTimeframe: string;
  status:
    | 'Submitted'
    | 'Under Review'
    | 'Approved'
    | 'Protected'
    | 'Contacted'
    | 'Qualified'
    | 'Opportunity'
    | 'Won'
    | 'Lost'
    | 'Rejected'
    | 'Expired';
  submissionDate: string;
  protectionExpiryDate: string;
  notes?: string;
}

export interface AcceptanceRecord {
  agreementId: string;
  partnerId: string;
  fullName: string;
  jobTitle: string;
  company: string;
  partnerType: PartnerCategoryType;
  country: string;
  email: string;
  phone: string;
  acceptanceDate: string;
  agreementVersion: string;
  digitalSignature: string; // base64 canvas or cryptographic typed hash
  ipAddressStamp: string;
  auditHash: string;
  territorySummary: string;
  commissionScheduleRef: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  code: string;
  version: string;
  pages: number;
  description: string;
  category: 'Agreement' | 'Schedules' | 'Guidelines' | 'Operations';
  contentPreview: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Program & Eligibility' | 'Leads & Protection' | 'Commissions & Billing' | 'Rights & Governance';
}

export interface AcademyCourse {
  id: string;
  title: string;
  category: string;
  level: 'Foundation' | 'Professional' | 'Advanced' | 'Certified Implementation Partner';
  duration: string;
  modulesCount: number;
  description: string;
}
