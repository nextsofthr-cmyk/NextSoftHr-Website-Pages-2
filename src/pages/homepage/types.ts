export interface NavLink {
  label: string;
  href: string;
  badge?: string;
  children?: {
    title: string;
    description: string;
    href: string;
    icon: string;
  }[];
}

export interface AiPromptOption {
  id: string;
  query: string;
  category: 'payroll' | 'attendance' | 'talent' | 'analytics' | 'compliance' | 'policy';
  response: {
    summary: string;
    type: 'table' | 'stat-grid' | 'document' | 'chart' | 'action-list';
    data?: any;
    insights?: string[];
    actionLabel?: string;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  employeeRange: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  highlight: string;
  companySize: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'payroll' | 'features' | 'outsourcing';
}

export interface ModuleFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag?: string;
}

export interface OutsourcingService {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
}
