export type BillingCycle = 'monthly' | 'yearly';
export type CurrencyCode =
  | 'NGN'
  | 'USD'
  | 'GBP'
  | 'KES'
  | 'ZAR'
  | 'GHS'
  | 'MAD'
  | 'XAF'
  | 'AED'
  | 'UGX'
  | 'TZS'
  | 'RWF'
  | 'ZMW'
  | 'EGP'
  | 'ZIP'
  | 'EUR';

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
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'General' | 'Pricing' | 'Features' | 'Security';
}
