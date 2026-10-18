export type PartnerCategory = 'Reseller' | 'Referral Partner' | 'Distributor' | 'Affiliate' | 'Associate';
export type PartnerTier = 'Bronze' | 'Silver' | 'Gold / Partner' | 'Platinum' | 'Custom Enterprise';

export interface CommissionStatementItem {
  id: string;
  customerName: string;
  invoiceNumber: string;
  product: string;
  purchaseDate: string;
  grossRevenue: number;
  exclusions: number; // VAT, processing, etc.
  commissionableRevenue: number;
  commissionRate: number; // e.g. 0.20 for 20%
  commissionAmount: number;
  refundAdjustment: number;
  netCommission: number;
  paymentStatus: 'Paid' | 'Scheduled' | 'Processing' | 'Rolled Forward (< $100)' | 'Under Review';
  payoutDate?: string;
  referenceNotes?: string;
}

export interface RegisteredLead {
  id: string;
  customerName: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  country: string;
  industry: string;
  selectedModules: string[];
  expectedValue: number;
  expectedCloseDate: string;
  registeredDate: string;
  protectionDaysRemaining: number;
  status: 'Protected Active' | 'Pending Review' | 'Converted to Customer' | 'Expired';
  attributionNotes?: string;
}

export interface PartnerExecutionData {
  partnerName: string;
  companyName: string;
  partnerCategory: PartnerCategory;
  partnerTier: PartnerTier;
  commissionRate: number;
  territory: string;
  effectiveDate: string;
  authorizedRepName: string;
  repTitle: string;
  signatureDataUrl?: string;
  signedTimestamp?: string;
  termsAccepted: {
    readAndUnderstood: boolean;
    acceptProvisions: boolean;
    understandPaymentConditions: boolean;
    termsInPartnerSchedule: boolean;
  };
  counterSignatory: {
    name: string;
    title: string;
    signed: boolean;
    signedDate: string;
    certificateId: string;
  };
}

export interface DisputeRecord {
  id: string;
  invoiceNumber: string;
  customerName: string;
  partnerId: string;
  disputedAmount: number;
  submissionDate: string;
  reason: string;
  status: 'Received' | 'Under Investigation' | 'Resolved - Credited' | 'Resolved - Declined';
  investigationNotes?: string;
}
