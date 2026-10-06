export type PartnerTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface TierInfo {
  id: PartnerTier;
  name: string;
  badge: string;
  commission: number;
  commissionLabel: string;
  summary: string;
  benefits: string[];
  cta: string;
  popular?: boolean;
}

export interface PartnerCategoryItem {
  id: string;
  title: string;
  description: string;
  group: 'HR & People' | 'Finance & Tax' | 'Tech & IT' | 'Consulting & Advisory';
  iconName: string;
  bestFit: string;
  tier?: PartnerTier;
}

export interface EcosystemModule {
  id: string;
  name: string;
  category: 'core' | 'workforce' | 'ai' | 'analytics';
  description: string;
  features: string[];
  icon: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  flag: string;
  partnerLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  quote: string;
  stats: string;
  avatar: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  format: 'PDF Guide' | 'Slide Deck' | 'Video' | 'Spreadsheet' | 'Templates Kit';
  description: string;
  pagesOrDuration: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: 'Webinar' | 'Workshop' | 'Conference' | 'Certification';
  date: string;
  time: string;
  location: string;
  description: string;
  speaker: string;
  speakerTitle: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ApplicationFormData {
  // Step 1
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  // Step 2
  companyName: string;
  website: string;
  businessType: string;
  yearsInBusiness: string;
  numberOfEmployees: string;
  countriesServed: string;
  // Step 3
  partnerType: string;
  // Step 4
  partnershipInterests: string[];
  notes?: string;
}
