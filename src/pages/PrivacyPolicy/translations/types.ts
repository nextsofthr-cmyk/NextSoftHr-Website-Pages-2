export type Language = 'en' | 'fr' | 'pt' | 'es';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
  region: string;
}

export interface Translations {
  nav: {
    platform: string;
    hrPayroll: string;
    trustSecurity: string;
    resources: string;
    contact: string;
    signIn: string;
    policyAdmin: string;
    privacyDesk: string;
    platformOverview: string;
    securityArch: string;
    yourRights: string;
    contactDpo: string;
    submitRequest: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    lastUpdated: string;
    version: string;
    updateNotice: string;
    searchPlaceholder: string;
    clear: string;
    cookiePrefs: string;
    requestAssistance: string;
    printPdf: string;
    governanceCore: string;
    globalArch: string;
    activeShield: string;
    workforceIdentity: string;
    workforceSub: string;
    encryptionBridge: string;
    cloudVault: string;
    cloudVaultSub: string;
    aiEngine: string;
    aiEngineSub: string;
    governedBadge: string;
    footerRegion: string;
    structuredArticles: string;
  };
  toc: {
    title: string;
    readTime: string;
    needAssistance: string;
    assistanceText: string;
    contactTeam: string;
    section: string;
    items: {
      introduction: string;
      informationWeCollect: string;
      howWeUseInformation: string;
      cookiesTracking: string;
      dataSharing: string;
      dataStorageSecurity: string;
      dataRetention: string;
      yourPrivacyRights: string;
      employeeCustomerData: string;
      internationalTransfers: string;
      thirdPartyServices: string;
      childrensPrivacy: string;
      marketingCommunications: string;
      aiAutomatedProcessing: string;
      changesToPolicy: string;
      contactUs: string;
    };
  };
  policy: {
    sec1: {
      tag: string;
      title: string;
      p1: string;
      p2: string;
      scopes: string[];
      boxTitle: string;
      boxDesc: string;
    };
    sec2: {
      tag: string;
      title: string;
      intro: string;
      categoryOf: string;
      processedElements: string;
      adminNotice: string;
      categories: {
        title: string;
        desc: string;
        items: string[];
      }[];
    };
    sec3: {
      tag: string;
      title: string;
      intro: string;
      purposes: {
        title: string;
        desc: string;
      }[];
    };
    sec4: {
      tag: string;
      title: string;
      intro: string;
      types: {
        title: string;
        desc: string;
      }[];
      manageTitle: string;
      manageDesc: string;
      button: string;
      browserNote: string;
    };
    sec5: {
      tag: string;
      title: string;
      intro: string;
      entities: {
        title: string;
        desc: string;
      }[];
    };
    sec6: {
      tag: string;
      title: string;
      intro: string;
      standardTag: string;
      pillars: {
        title: string;
        summary: string;
        details: string[];
      }[];
      userResponsibility: string;
    };
    sec7: {
      tag: string;
      title: string;
      intro: string;
      table: {
        thCategory: string;
        thPurpose: string;
        thRetention: string;
        thRationale: string;
      };
      rules: {
        category: string;
        purpose: string;
        retentionPeriod: string;
        statutoryBasis: string;
      }[];
      expirationNote: string;
    };
    sec8: {
      tag: string;
      title: string;
      intro: string;
      rights: {
        name: string;
        desc: string;
      }[];
      ctaTitle: string;
      ctaDesc: string;
      ctaButton: string;
    };
    sec9: {
      tag: string;
      title: string;
      intro: string;
      processorTitle: string;
      processorDesc: string;
      controllerTitle: string;
      controllerDesc: string;
      employeeNoticeTitle: string;
      employeeNoticeDesc: string;
    };
    sec10: {
      tag: string;
      title: string;
      intro: string;
      p2: string;
      safeguards: string[];
    };
    sec11: {
      tag: string;
      title: string;
      intro: string;
      p2: string;
    };
    sec12: {
      tag: string;
      title: string;
      intro: string;
      p2: string;
    };
    sec13: {
      tag: string;
      title: string;
      intro: string;
      boxTitle: string;
      boxDesc: string;
      inputPlaceholder: string;
      optOutButton: string;
      optOutSuccess: string;
      transactionalNote: string;
    };
    sec14: {
      tag: string;
      title: string;
      intro: string;
      features: string[];
      governanceTitle: string;
      governanceDesc: string;
      hitlTitle: string;
      hitlDesc: string;
      disclaimer: string;
    };
    sec15: {
      tag: string;
      title: string;
      intro: string;
      p2: string;
      statusLabel: string;
      effectiveLabel: string;
      hideHistory: string;
      viewHistory: string;
    };
    sec16: {
      tag: string;
      title: string;
      bannerTitle: string;
      bannerDesc: string;
      orgLabel: string;
      websiteLabel: string;
      hotlineLabel: string;
      contactBtn: string;
      visitBtn: string;
      formTitle: string;
      formDesc: string;
    };
  };
  requestForm: {
    receivedTitle: string;
    receivedDesc: string;
    ticketRef: string;
    statutoryTime: string;
    submitAnother: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    orgLabel: string;
    orgPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    typeLabel: string;
    types: {
      access: string;
      correct: string;
      delete: string;
      question: string;
      security: string;
      other: string;
    };
    messageLabel: string;
    messagePlaceholder: string;
    attachLabel: string;
    attachButton: string;
    consentText: string;
    submitBtn: string;
    submittingBtn: string;
  };
  cookiesModal: {
    title: string;
    subtitle: string;
    intro: string;
    essentialTitle: string;
    essentialTag: string;
    essentialDesc: string;
    alwaysActive: string;
    functionalTitle: string;
    functionalDesc: string;
    analyticsTitle: string;
    analyticsDesc: string;
    marketingTitle: string;
    marketingDesc: string;
    savedSuccess: string;
    rejectOptional: string;
    acceptAll: string;
    savePreferences: string;
  };
  adminModal: {
    title: string;
    subtitle: string;
    banner: string;
    dateLabel: string;
    versionLabel: string;
    orgLabel: string;
    hotlineLabel: string;
    savedNotice: string;
    resetBtn: string;
    cancelBtn: string;
    applyBtn: string;
  };
  trust: {
    tag: string;
    title: string;
    subtitle: string;
    cards: {
      title: string;
      desc: string;
      badge: string;
    }[];
    readyText: string;
  };
  footer: {
    desc: string;
    platformTitle: string;
    businessTitle: string;
    resourcesTitle: string;
    legalTitle: string;
    backToTop: string;
    allRightsReserved: string;
    tagline: string;
  };
  liveChat: {
    buttonLabel: string;
    statusOnline: string;
    headerTitle: string;
    replyTime: string;
    tabChat: string;
    tabChannels: string;
    tabFaq: string;
    departmentLabel: string;
    departments: {
      privacy: string;
      hr: string;
      technical: string;
      billing: string;
    };
    initialAgentGreeting: string;
    placeholder: string;
    sendButton: string;
    agentTyping: string;
    callDirect: string;
    whatsappChat: string;
    emailDesk: string;
    operatingHours: string;
    operatingHoursTitle: string;
    needPrivacyAssistance: string;
    privacyFormBtn: string;
    close: string;
    minimize: string;
  };
}
