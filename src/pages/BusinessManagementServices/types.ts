export interface ServiceItem {
  id: string;
  number: string;
  category: 'core-hr' | 'payroll' | 'workforce' | 'growth-ai';
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaText: string;
  badge?: string;
  detailedOverview: string;
  benefits: string[];
  supportedInRegions: string;
}

export interface ExplorerTab {
  id: string;
  label: string;
  title: string;
  description: string;
  badge: string;
  features: string[];
  metricLabel: string;
  metricValue: string;
  metricChange: string;
  imageUrl: string;
  imageAlt: string;
  mockupData: {
    heading: string;
    subheading: string;
    stats: { label: string; value: string; trend?: string }[];
    recentItems: { title: string; meta: string; status: string; statusType: 'success' | 'warning' | 'info' }[];
  };
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeframe: string;
}

export interface WhyChooseItem {
  title: string;
  description: string;
  tagline: string;
}

export interface BusinessStage {
  id: string;
  tier: string;
  title: string;
  subtitle: string;
  employeeRange: string;
  description: string;
  features: string[];
  imageUrl: string;
  imageCaption: string;
  highlightStat: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  category: 'corporate' | 'industrial' | 'service';
  description: string;
  features: string[];
  imageUrl: string;
  stat: string;
}

export interface AIPromptExample {
  id: string;
  query: string;
  category: string;
  aiResponse: {
    summary: string;
    metrics?: { label: string; value: string; note?: string }[];
    tableData?: { col1: string; col2: string; col3: string }[];
    actionSuggestion: string;
  };
}

export interface IntegrationCategory {
  name: string;
  description: string;
  examples: string[];
  badge: string;
  highlight: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  country: string;
  countryFlag: string;
  verifiedStatus: string;
  imageUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}
