export type SupportedLanguage = 'en' | 'fr' | 'pt' | 'es';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    region: 'Pan-African & Global'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    region: 'Afrique Francophone & International'
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    region: 'Angola, Moçambique & Lusofonia'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    region: 'Guinea Ecuatorial & Mercado Global'
  }
];

export interface TranslationDictionary {
  nav: {
    announcement: string;
    announcementMobile: string;
    talkExpert: string;
    uptime: string;
    platform: string;
    aiAssistant: string;
    outsourcing: string;
    roiCalculator: string;
    pricing: string;
    customerStories: string;
    faq: string;
    bookDemo: string;
    getStarted: string;
    needHelpModules: string;
    exploreCustomConfig: string;
    platformCapabilities: string;
    theme: string;
    appearance: string;
    language: string;
  };
  modules: {
    coreHr: { name: string; desc: string };
    payroll: { name: string; desc: string; badge?: string };
    attendance: { name: string; desc: string };
    shifts: { name: string; desc: string };
    leave: { name: string; desc: string };
    talent: { name: string; desc: string };
    businessOps: { name: string; desc: string };
    selfService: { name: string; desc: string };
    finance: { name: string; desc: string };
  };
  hero: {
    badgeEdition: string;
    badgeSubtitle: string;
    headlineStart: string;
    headlineHighlight: string;
    headlineEnd: string;
    supportingHeadline: string;
    description: string;
    ctaGetStarted: string;
    ctaBookDemo: string;
    ctaTalkExpert: string;
    trustEnterprise: string;
    statPayrollAccuracy: string;
    statPayrollLabel: string;
    statJurisdictions: string;
    statJurisdictionsLabel: string;
    statTimeSaved: string;
    statTimeSavedLabel: string;
    statSupport: string;
    statSupportLabel: string;
    tabOverview: string;
    tabPayroll: string;
    tabAttendance: string;
    payPeriod: string;
    realtimeSync: string;
    totalEmployees: string;
    payrollRun: string;
    todayAttendance: string;
    recruitmentPipeline: string;
    run1ClickPayroll: string;
    samplePayslip: string;
    pendingLeave: string;
    aiPromptHeadline: string;
  };
  problem: {
    badge: string;
    headline: string;
    description: string;
    bridgeBadge: string;
    bridgeHeadline: string;
    bridgeDesc: string;
    bridgeCta: string;
  };
  comparison: {
    badge: string;
    headline: string;
    description: string;
    colDomain: string;
    colTraditional: string;
    colNextsoft: string;
    footerTitle: string;
    footerSubtitle: string;
    liveDemo: string;
    switchCta: string;
  };
  calculator: {
    badge: string;
    title: string;
    subtitle: string;
    headcount: string;
    hourlyRate: string;
    timeSpent: string;
    annualSavings: string;
    hoursReclaimed: string;
    roi: string;
    fteEquivalent: string;
    ctaCalculate: string;
    ctaApply: string;
  };
  pricing: {
    badge: string;
    headline: string;
    description: string;
    monthly: string;
    annual: string;
    saveBadge: string;
    popularChoice: string;
    perUserMonth: string;
    guarantee: string;
  };
  faq: {
    badge: string;
    headline: string;
    description: string;
    searchPlaceholder: string;
  };
  footer: {
    tagline: string;
    globalHq: string;
    colPlatform: string;
    colSolutions: string;
    colServices: string;
    colTrust: string;
    themeAppearance: string;
    languageSelector: string;
    copyright: string;
  };
  common: {
    verified: string;
    active: string;
    learnMore: string;
    close: string;
    submit: string;
    loading: string;
    save: string;
    allRightsReserved: string;
  };
}
