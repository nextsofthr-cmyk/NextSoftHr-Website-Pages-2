export interface NavLink {
  label: string;
  href: string;
  isCurrent?: boolean;
}

export interface ValueCard {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PlatformModule {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  metricsPreview: {
    label: string;
    value: string;
    subtext: string;
  };
}

export interface IndustryCard {
  id: string;
  category: 'size' | 'industry';
  name: string;
  description: string;
  iconName: string;
  highlight: string;
}

export interface TeamPillar {
  role: string;
  mission: string;
  focus: string;
  image: string;
  keySkills: string[];
}

export interface StoryPhase {
  stage: string;
  title: string;
  description: string;
  accent: string;
  icon: string;
  bulletPoints: string[];
}

export interface VideoChapter {
  id: number;
  time: string;
  title: string;
  description: string;
  duration: number; // in seconds
  thumbnail: string;
}

export interface AIAssistantSample {
  id: string;
  category: string;
  prompt: string;
  response: {
    title: string;
    summary: string;
    dataPoints: { label: string; value: string; badge?: string }[];
    actionItems: string[];
  };
}

export interface CustomerSuccessQuote {
  id: string;
  name: string;
  role: string;
  personaCategory: 'Small Business Owner' | 'HR Director' | 'Operations & Finance' | 'Founder & Executive';
  companyType: string;
  companyName: string;
  location: string;
  quote: string;
  highlightStat: {
    value: string;
    label: string;
  };
  avatar: string;
  verifiedUser: boolean;
}
