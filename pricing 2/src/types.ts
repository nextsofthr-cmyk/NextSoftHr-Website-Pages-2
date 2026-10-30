export type BillingCycle = 'monthly' | 'yearly';
export type CurrencyCode =
  | 'NGN'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'KES'
  | 'ZAR'
  | 'GHS'
  | 'MAD'
  | 'XOF'
  | 'XAF'
  | 'AED'
  | 'CAD'
  | 'AUD'
  | 'JPY'
  | 'INR'
  | 'CNY'
  | 'BRL'
  | 'UGX'
  | 'TZS'
  | 'RWF'
  | 'ETB'
  | 'EGP'
  | 'ZMW'
  | 'ZIP'
  | (string & {});

export type LanguageCode = 'en' | 'fr' | 'pt' | 'es';

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  symbol: string;
  exchangeRate: number; // relative to USD 1.0
  region?: string;
  flag?: string;
  format: (amount: number) => string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  isPopular?: boolean;
  monthlyPrice: number; // in USD
  yearlyPrice: number; // in USD per month billed annually (e.g. 20% discount)
  perEmployeeAfterLimit?: number;
  employeeAllowanceText: string;
  recommendedEmployeeRange: string;
  keyFeatures: string[];
  ctaText: string;
  ctaAction: 'trial' | 'enterprise';
  supportLevel: string;
  upgradeIndicator?: string;
  highlightText?: string;
}

export interface ComparisonFeature {
  name: string;
  description?: string;
  starter: boolean | string;
  professional: boolean | string;
  business: boolean | string;
  enterprise: boolean | string;
}

export interface ComparisonCategory {
  category: string;
  iconName: string;
  features: ComparisonFeature[];
}

export interface EssentialFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface BusinessStage {
  stage: string;
  employees: string;
  headline: string;
  description: string;
  idealPlan: string;
  highlights: string[];
}

export interface SecurityFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  industry: string;
  location: string;
  avatarUrl: string;
  quote: string;
  verifiedBenefit: string;
}

export interface IndustrySolution {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  description: string;
  keyWorkflows: string[];
  imageUrl: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  unitText: string;
  isOneTime?: boolean;
  fixedPriceNGN?: number;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'General' | 'Pricing' | 'Features' | 'Security';
}

export interface SubscriptionCustomer {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  address?: string;
  taxId?: string;
}

export interface SubscriptionInvoice {
  invoiceNumber: string;
  receiptNumber: string;
  date: string;
  dueDate: string;
  customer: SubscriptionCustomer;
  planId: string;
  planName: string;
  billingCycle: BillingCycle;
  planPriceUSD: number;
  selectedAddOns: AddOnItem[];
  addOnsTotalUSD: number;
  subtotalUSD: number;
  promoCode?: string;
  discountPercent?: number;
  discountAmountUSD: number;
  taxableSubtotalUSD: number;
  vatRate: number; // 0.075 (7.5%)
  vatAmountUSD: number;
  totalUSD: number;
  currency: CurrencyCode;
  currencyRate: number;
  totalFormatted: string;
  gatewayId: string;
  gatewayName: string;
  paymentMethod: string;
  paymentReference: string;
  status: 'PAID' | 'PENDING';
}

export interface PPPRegion {
  id: string;
  name: string;
  shortLabel: string;
  flag: string;
  currency: CurrencyCode;
  discountPercent: number;
  factor: number;
  description: string;
  badgeText: string;
}

export interface QuickStartCompanyData {
  companyName: string;
  tradingName?: string;
  industry: string;
  country: string;
  currency: CurrencyCode;
  employeeSize: string;
  website?: string;
  payFrequency: 'Monthly' | 'Bi-weekly' | 'Weekly';
  payDay: string;
  statutoryPension: boolean;
  statutoryTax: boolean;
  statutoryHealth: boolean;
  departments: string[];
  adminName: string;
  adminEmail: string;
  adminPhone?: string;
  adminRole: string;
  enableGPSAttendance: boolean;
  enableMobileESS: boolean;
  enableWhatsAppAlerts: boolean;
  enableMultiTierApproval: boolean;
  selectedPlan: string;
}


