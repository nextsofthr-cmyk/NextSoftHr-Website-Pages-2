export type PartnerLevel = 
  | 'Registered Partner'
  | 'Certified Partner'
  | 'Professional Partner'
  | 'Premium Partner'
  | 'Strategic Partner';

export type PartnerType =
  | 'Implementation Partner'
  | 'HR Consultant'
  | 'Payroll Consultant'
  | 'Accounting Firm'
  | 'Accountant'
  | 'Technology Partner'
  | 'IT Company'
  | 'Software Consultant'
  | 'Business Consultant'
  | 'Training Partner'
  | 'Recruitment Consultant'
  | 'Outsourcing Company'
  | 'Reseller'
  | 'Distributor'
  | 'System Integrator'
  | 'HR Technology Consultant'
  | 'Payroll Specialist';

export type BusinessSize =
  | 'Micro Business'
  | 'Small Business'
  | 'Medium Business'
  | 'Large Enterprise'
  | 'Multinational';

export interface PartnerCaseStudy {
  title: string;
  clientName: string;
  industry: string;
  country: string;
  challenge: string;
  solution: string;
  result: string;
  metric: string;
}

export interface PartnerTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export type AvailabilityStatus = 
  | 'Accepting New Clients' 
  | 'Limited Availability' 
  | 'Currently Booked';

export interface Partner {
  id: string;
  companyName: string;
  tagline: string;
  logo: string;
  logoBg?: string;
  coverImage: string;
  description: string;
  country: string;
  countryCode: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  website: string;
  email: string;
  phone: string;
  partnerType: PartnerType;
  partnerLevel: PartnerLevel;
  availabilityStatus?: AvailabilityStatus;
  isVerified: boolean;
  isFeatured: boolean;
  services: string[];
  industries: string[];
  businessSizesServed: BusinessSize[];
  countriesServed: string[];
  languages: string[];
  yearsExperience: number;
  numberOfImplementations: number;
  clientCount: number;
  certifications: string[];
  caseStudies: PartnerCaseStudy[];
  testimonials: PartnerTestimonial[];
  registrationDate: string;
  rating: number;
  reviewCount: number;
}

export interface FilterState {
  searchQuery: string;
  country: string;
  city: string;
  partnerType: string;
  industry: string;
  businessSize: string;
  service: string;
  partnerLevel: string;
  availabilityStatus?: string;
  verifiedOnly: boolean;
  sortBy: 'recommended' | 'experience' | 'implementations' | 'level' | 'rating';
}

export interface PartnerEnquiry {
  id: string;
  partnerId: string;
  partnerName: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  businessSize: string;
  serviceNeeded: string;
  message: string;
  createdAt: string;
}

export interface PartnerRegistration {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  businessEmail: string;
  phone: string;
  country: string;
  city: string;
  partnerType: PartnerType;
  yearsInBusiness: string;
  areasOfExpertise: string[];
  website: string;
  numberOfEmployees: string;
  message: string;
  status: 'pending' | 'approved' | 'under_review';
  appliedAt: string;
}

export interface PartnerApplication {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  partnerType: string;
  website: string;
  numberOfEmployees: string;
  servicesOffered: string[];
  motivation: string;
  status: string;
  createdAt: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  speaker: string;
  speakerRole: string;
  thumbnail: string;
  summary: string;
  youtubeId?: string;
  highlights: string[];
}

export interface CaseStudyItem {
  id: string;
  partnerName: string;
  customerName: string;
  customerIndustry: string;
  country: string;
  flag: string;
  challenge: string;
  solution: string;
  result: string;
  keyMetric: string;
  metricLabel: string;
  image: string;
  logoInitial: string;
}

export type ReferralType = 'business_client' | 'consultant_partner';

export type ReferralStatus = 
  | 'submitted' 
  | 'contacted' 
  | 'demo_scheduled' 
  | 'won_activated' 
  | 'rewards_paid';

export interface PartnerReferral {
  id: string;
  referringPartnerId: string;
  referringPartnerName: string;
  candidateName: string;
  candidateType: ReferralType;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  city?: string;
  estimatedSeats: string;
  notes?: string;
  status: ReferralStatus;
  pointsAwarded: number;
  potentialPoints: number;
  cashValueUSD: number;
  createdAt: string;
  updatedAt: string;
}

export interface RewardRedemptionItem {
  id: string;
  title: string;
  pointsCost: number;
  category: 'cash' | 'certification' | 'software' | 'sponsorship' | 'event';
  description: string;
  iconName: string;
  badge?: string;
}

export interface PartnerRewardAccount {
  partnerId: string;
  partnerName: string;
  partnerLevel: PartnerLevel;
  totalPointsEarned: number;
  availableBalance: number;
  redeemedPoints: number;
  tierMultiplier: number;
  referralCount: number;
  successfulConversions: number;
}
