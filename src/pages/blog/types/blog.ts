export type ArticleStatus = 'Draft' | 'Review' | 'Scheduled' | 'Published' | 'Archived';

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  articleCount: number;
}

export interface ArticleContentSection {
  id: string;
  title: string;
  content: string[];
  subsections?: {
    title: string;
    content: string[];
  }[];
  callout?: {
    type: 'insight' | 'stat' | 'quote' | 'warning';
    title: string;
    text: string;
    highlight?: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  checklist?: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  subcategory: string;
  author: Author;
  publishedDate: string;
  lastUpdatedDate: string;
  readingTime: string;
  views: number;
  featured?: boolean;
  popularRank?: number;
  tags: string[];
  status: ArticleStatus;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  coverGradient: {
    from: string;
    to: string;
    accent: string;
  };
  summary: string;
  sections: ArticleContentSection[];
  keyTakeaways: string[];
  targetIndustries?: string[];
  regionFocus?: 'Pan-African' | 'Global' | 'Both';
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  subcategories: string[];
  articleCount: number;
  iconName: string;
}

export interface IndustryInsightItem {
  id: string;
  name: string;
  badge: string;
  description: string;
  keyMetric: string;
  focusArea: string;
  recommendedCategory: string;
}

export interface ResourceItem {
  id: string;
  type: 'HR Guides' | 'Payroll Guides' | 'Templates' | 'Checklists' | 'Case Studies' | 'Webinars' | 'Reports';
  title: string;
  description: string;
  format: string;
  pagesOrDuration: string;
  downloadCount: string;
}
