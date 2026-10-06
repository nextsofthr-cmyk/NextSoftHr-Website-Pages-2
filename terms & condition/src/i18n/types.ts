import { TermSection, DefinitionItem, ModuleItem } from '../data/termsData';

export type SupportedLanguage = 'en' | 'fr' | 'pt' | 'es';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  marketNote: string;
}

export interface UITranslations {
  // Header
  navHome: string;
  navFeatures: string;
  navSolutions: string;
  navPricing: string;
  navPartners: string;
  navResources: string;
  navAboutUs: string;
  navContact: string;
  signIn: string;
  getStarted: string;
  editionBadge: string;
  themeSwitch: string;
  selectLanguage: string;

  // Hero
  breadcrumbHome: string;
  breadcrumbLegal: string;
  breadcrumbCurrent: string;
  heroTitle: string;
  heroSubtitle: string;
  lastUpdated: string;
  effectiveDate: string;
  versionLabel: string;
  searchPlaceholder: string;
  searchMatches: string;
  searchClear: string;
  searchPressCmdK: string;
  toggleSummary: string;
  toggleSummaryActive: string;
  toggleSummaryOff: string;
  toggleCounsel: string;
  toggleCounselOn: string;
  toggleCounselOff: string;
  printPdf: string;
  trustCenterTitle: string;
  trustCenterSubtitle: string;
  verifiedBadge: string;
  pillarDataOwnership: string;
  pillarSecurity: string;
  pillarPrivacy: string;
  pillarSubscriptions: string;

  // Table of Contents
  onThisPage: string;
  readProgress: string;
  filterSections: string;
  noMatchingSections: string;
  totalClauses: string;
  backToTop: string;
  jumpToSection: string;

  // Terms Content & Cards
  sectionLabel: string;
  linkAction: string;
  copiedAction: string;
  executiveSummaryHeading: string;
  readPrivacyPolicy: string;
  privacyNoticeText: string;
  submitLegalInquiry: string;
  contactLegalNoticeText: string;
  noClausesFoundTitle: string;
  noClausesFoundDesc: string;
  resetFilter: string;

  // Definitions
  definitionsGlossaryTitle: string;
  definitionsGlossarySubtitle: string;
  copyDefinition: string;
  categoryAll: string;

  // Modules Grid
  modulesScopeTitle: string;
  modulesScopeSubtitle: string;

  // Free Trial
  freeTrialTitle: string;
  freeTrialSubtitle: string;
  standardDurationLabel: string;
  trialDaysLabel: string;
  trialEligibilityTitle: string;
  trialEligibilityDesc: string;
  trialScopeTitle: string;
  trialScopeDesc: string;
  trialConversionTitle: string;
  trialConversionDesc: string;
  trialCancellationTitle: string;
  trialCancellationDesc: string;

  // Contact CTA
  ctaTag: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaPlatform: string;
  ctaPlatformDesc: string;
  ctaContactBtn: string;
  ctaHelpCenterBtn: string;

  // Footer
  footerDesc: string;
  footerColPlatform: string;
  footerColCompany: string;
  footerColLegal: string;
  footerEnterpriseSecurity: string;
  footerGlobalProtection: string;
  footerCopyright: string;
  footerArchitecture: string;

  // Privacy Modal
  privacyModalTitle: string;
  privacyModalSubtitle: string;
  privacyModalControllerTitle: string;
  privacyModalControllerDesc: string;
  privacyPillar1Title: string;
  privacyPillar1Desc: string;
  privacyPillar2Title: string;
  privacyPillar2Desc: string;
  privacyPillar3Title: string;
  privacyPillar3Desc: string;
  privacyPillar4Title: string;
  privacyPillar4Desc: string;
  privacyModalFooterNotice: string;
  closeSummaryBtn: string;

  // Contact Modal
  contactModalTitle: string;
  contactModalSubtitle: string;
  contactNameLabel: string;
  contactEmailLabel: string;
  contactCompanyLabel: string;
  contactTopicLabel: string;
  contactMessageLabel: string;
  contactMessagePlaceholder: string;
  contactTransmitBtn: string;
  contactCancelBtn: string;
  contactSuccessTitle: string;
  contactSuccessDesc: string;
  contactReturnBtn: string;

  privacyBriefTitle: string;
  contactModalCategory: string;
  searchBannerShowing: string;
  searchBannerOf: string;
  searchBannerMatching: string;
  clearSearchFilter: string;
  floatingBackToTop: string;

  // Live Chat Widget
  liveChatButtonLabel: string;
  liveChatOnlineStatus: string;
  liveChatTitle: string;
  liveChatSubtitle: string;
  liveChatTypicalReplyTime: string;
  liveChatWelcomeMsg: string;
  liveChatWelcomeSecondary: string;
  liveChatQuickTopicsHeading: string;
  liveChatPlaceholder: string;
  liveChatSendBtn: string;
  liveChatAgentTyping: string;
  liveChatTabChat: string;
  liveChatTabFaq: string;
  liveChatTabCallback: string;
  liveChatChipPayroll: string;
  liveChatChipDataPrivacy: string;
  liveChatChipSLA: string;
  liveChatChipDPA: string;
  liveChatChipBilling: string;
  liveChatAgentName: string;
  liveChatAgentRole: string;
}

export interface SectionTranslationMeta {
  title: string;
  category: 'General' | 'Modules' | 'Commercial' | 'Data & Security' | 'Legal & Compliance';
  summary: string;
  counselFlag?: string;
  paragraphs?: string[];
  bulletPoints?: string[];
  highlightBoxTitle?: string;
  highlightBoxText?: string;
  actionLabel?: string;
}
