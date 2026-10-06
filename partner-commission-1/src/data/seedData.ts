import { CommissionStatementItem, RegisteredLead, PartnerExecutionData, DisputeRecord } from '../types';

export const INITIAL_STATEMENTS: CommissionStatementItem[] = [
  {
    id: 'stmt-001',
    customerName: 'Dangote Logistics Hub',
    invoiceNumber: 'INV-2026-0891',
    product: 'Core HR + Payroll + ESS (350 Users)',
    purchaseDate: '2026-03-05',
    grossRevenue: 1850,
    exclusions: 148, // 8% VAT & processing
    commissionableRevenue: 1702,
    commissionRate: 0.30, // Gold Tier
    commissionAmount: 510.60,
    refundAdjustment: 0,
    netCommission: 510.60,
    paymentStatus: 'Paid',
    payoutDate: '2026-03-15',
    referenceNotes: 'Wire transfer ref #NS-TX-99201'
  },
  {
    id: 'stmt-002',
    customerName: 'Apex Health Systems Africa',
    invoiceNumber: 'INV-2026-0904',
    product: 'Time & Attendance + Leave Management (5 Branches)',
    purchaseDate: '2026-03-12',
    grossRevenue: 1200,
    exclusions: 96,
    commissionableRevenue: 1104,
    commissionRate: 0.30,
    commissionAmount: 331.20,
    refundAdjustment: 0,
    netCommission: 331.20,
    paymentStatus: 'Paid',
    payoutDate: '2026-03-25',
    referenceNotes: 'Direct bank settlement'
  },
  {
    id: 'stmt-003',
    customerName: 'Meridian Capital Partners',
    invoiceNumber: 'INV-2026-0932',
    product: 'Full NextSoftHR Suite + CRM + Outsourcing',
    purchaseDate: '2026-03-20',
    grossRevenue: 3400,
    exclusions: 272,
    commissionableRevenue: 3128,
    commissionRate: 0.30,
    commissionAmount: 938.40,
    refundAdjustment: 0,
    netCommission: 938.40,
    paymentStatus: 'Scheduled',
    payoutDate: '2026-04-10',
    referenceNotes: 'Scheduled for April monthly disbursement cycle'
  },
  {
    id: 'stmt-004',
    customerName: 'Horizon Retail Conglomerate',
    invoiceNumber: 'INV-2026-0941',
    product: 'Recruitment ATS & Biometric Attendance',
    purchaseDate: '2026-03-24',
    grossRevenue: 850,
    exclusions: 68,
    commissionableRevenue: 782,
    commissionRate: 0.30,
    commissionAmount: 234.60,
    refundAdjustment: -50.00, // Section 30 Partial refund adjustment
    netCommission: 184.60,
    paymentStatus: 'Processing',
    payoutDate: '2026-04-10',
    referenceNotes: 'Section 30 partial refund offset applied ($50 returned)'
  },
  {
    id: 'stmt-005',
    customerName: 'Veritas Agro Industries',
    invoiceNumber: 'INV-2026-0955',
    product: 'Starter Payroll Add-on (15 Users)',
    purchaseDate: '2026-03-28',
    grossRevenue: 95,
    exclusions: 7.6,
    commissionableRevenue: 87.40,
    commissionRate: 0.30,
    commissionAmount: 26.22,
    refundAdjustment: 0,
    netCommission: 26.22,
    paymentStatus: 'Rolled Forward (< $100)',
    referenceNotes: 'Section 34 Rule: Sub-$100 threshold rolls forward to next billing cycle'
  }
];

export const INITIAL_LEADS: RegisteredLead[] = [
  {
    id: 'lead-101',
    customerName: 'Oando Energy Infrastructure Ltd',
    companyName: 'Oando Energy',
    contactEmail: 'hr.operations@oandoenergy.com',
    contactPhone: '+234 803 112 4490',
    country: 'Nigeria',
    industry: 'Energy & Oil/Gas',
    selectedModules: ['Core HR', 'Automated Payroll', 'ESS/MSS', 'Biometric Attendance'],
    expectedValue: 4800,
    expectedCloseDate: '2026-04-25',
    registeredDate: '2026-02-15',
    protectionDaysRemaining: 47,
    status: 'Protected Active',
    attributionNotes: 'Lead registered by Partner ID #PTR-8821 under 90-day protection window'
  },
  {
    id: 'lead-102',
    customerName: 'Kiprotich Logistics & Haulage',
    companyName: 'Kiprotich East Africa',
    contactEmail: 'partnerships@kiprotich.co.ke',
    contactPhone: '+254 711 982 341',
    country: 'Kenya',
    industry: 'Logistics & Supply Chain',
    selectedModules: ['Time & Attendance', 'Payroll', 'Projects & Timesheets'],
    expectedValue: 2600,
    expectedCloseDate: '2026-05-10',
    registeredDate: '2026-03-02',
    protectionDaysRemaining: 62,
    status: 'Protected Active',
    attributionNotes: 'Regional enterprise qualification verified'
  },
  {
    id: 'lead-103',
    customerName: 'Zenith Microfinance Bank',
    companyName: 'Zenith Microfinance Plc',
    contactEmail: 'procurement@zenithmfb.ng',
    contactPhone: '+234 901 445 6789',
    country: 'Nigeria',
    industry: 'Financial Services & Banking',
    selectedModules: ['Full NextSoftHR Suite', 'Outsourcing'],
    expectedValue: 7500,
    expectedCloseDate: '2026-04-18',
    registeredDate: '2026-03-20',
    protectionDaysRemaining: 80,
    status: 'Protected Active',
    attributionNotes: 'Multi-branch deployment across 14 locations'
  },
  {
    id: 'lead-104',
    customerName: 'Savannah Agribusiness Group',
    companyName: 'Savannah Agro Ltd',
    contactEmail: 'admin@savannahagro.gh',
    contactPhone: '+233 24 556 7890',
    country: 'Ghana',
    industry: 'Agriculture & Processing',
    selectedModules: ['Core HR', 'Time & Attendance'],
    expectedValue: 1900,
    expectedCloseDate: '2026-03-15',
    registeredDate: '2025-12-10',
    protectionDaysRemaining: 0,
    status: 'Converted to Customer',
    attributionNotes: 'Successfully converted to customer (INV-2026-0891)'
  }
];

export const INITIAL_DISPUTES: DisputeRecord[] = [
  {
    id: 'dsp-01',
    invoiceNumber: 'INV-2026-0744',
    customerName: 'PrimeTech West Africa',
    partnerId: 'PTR-8821',
    disputedAmount: 145.00,
    submissionDate: '2026-03-10',
    reason: 'Partner tier upgraded to Gold (30%) prior to invoice date, but statement applied Silver rate (20%).',
    status: 'Resolved - Credited',
    investigationNotes: 'Verified tier effective date was 2026-02-01. Credit adjustment of $145.00 processed on March statement.'
  }
];

export const INITIAL_EXECUTION_DATA: PartnerExecutionData = {
  partnerName: 'Apex Strategic Business Solutions Ltd',
  companyName: 'Apex Business Group',
  partnerCategory: 'Reseller',
  partnerTier: 'Gold / Partner',
  commissionRate: 30,
  territory: 'West Africa (Nigeria, Ghana, Côte d\'Ivoire)',
  effectiveDate: '2026-03-01',
  authorizedRepName: 'Francis O. Erikefe',
  repTitle: 'Managing Director & Head of Enterprise Partnerships',
  signedTimestamp: '2026-03-01T10:15:00Z',
  termsAccepted: {
    readAndUnderstood: true,
    acceptProvisions: true,
    understandPaymentConditions: true,
    termsInPartnerSchedule: true,
  },
  counterSignatory: {
    name: 'Dr. Alistair Vance',
    title: 'Executive Director, Channel Operations & Legal Affairs, NextSoftHR',
    signed: true,
    signedDate: '2026-03-02',
    certificateId: 'NSHR-SCH-B-2026-08492-EXEC'
  }
};
