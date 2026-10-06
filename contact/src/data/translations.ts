export type Language = 'en' | 'fr' | 'pt' | 'es';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  regionLabel: string;
}

export const LANGUAGES: Record<Language, LanguageInfo> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    regionLabel: 'Pan-African & Global',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    regionLabel: 'Afrique Francophone',
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    regionLabel: 'África Lusófona & Global',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    regionLabel: 'Internacional & Regional',
  },
};

export interface Translations {
  nav: {
    howCanWeHelp: string;
    contactForm: string;
    globalNetwork: string;
    aiAssistant: string;
    whyContact: string;
    faqs: string;
    directCall: string;
    talkToSales: string;
    bookDemo: string;
    themeToggleLight: string;
    themeToggleDark: string;
    themeLabel: string;
    hubsBadge: string;
    newBadge: string;
    selectLanguage: string;
  };
  hero: {
    eyebrow: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    subtitle: string;
    subtitleHighlight: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statCompliance: string;
    statPayroll: string;
    statScaling: string;
    floatingActiveEmployees: string;
    floatingAccuracyRate: string;
    floatingTimeSaved: string;
    floatingPayrollTitle: string;
    floatingDisbursed: string;
  };
  contactOptions: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    cards: {
      sales: { title: string; headline: string; description: string; cta: string; badge: string };
      demo: { title: string; headline: string; description: string; cta: string; badge: string };
      support: { title: string; headline: string; description: string; cta: string };
      partnerships: { title: string; headline: string; description: string; cta: string };
      enterprise: { title: string; headline: string; description: string; cta: string; badge: string };
      general: { title: string; headline: string; description: string; cta: string };
    };
  };
  form: {
    badge: string;
    title: string;
    subtitle: string;
    activeCategoryLabel: string;
    fields: {
      firstName: string;
      firstNamePlaceholder: string;
      lastName: string;
      lastNamePlaceholder: string;
      workEmail: string;
      workEmailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      companyName: string;
      companyNamePlaceholder: string;
      country: string;
      countryPlaceholder: string;
      companySize: string;
      companySizePlaceholder: string;
      enquiryType: string;
      message: string;
      messagePlaceholder: string;
      agreeToTerms: string;
      termsLink: string;
      submitButton: string;
      submittingButton: string;
      successTitle: string;
      successMessage: string;
      resetButton: string;
      returnToTop: string;
    };
    dynamic: {
      payrollTitle: string;
      payrollCount: string;
      payrollCountries: string;
      payrollFrequency: string;
      payrollFrequencyMonthly: string;
      payrollFrequencyBiWeekly: string;
      payrollFrequencyWeekly: string;
      currentSystem: string;
      hrTitle: string;
      hrEmployeesCount: string;
      hrTeamSize: string;
      mainChallenge: string;
      enterpriseTitle: string;
      locationsCount: string;
      operatingCountries: string;
      currentErp: string;
    };
    sidebar: {
      directCallTitle: string;
      directCallSubtitle: string;
      emailTeamTitle: string;
      hoursTitle: string;
      hoursSubtitle: string;
      securityTitle: string;
      securitySubtitle: string;
    };
  };
  contactInfo: {
    badge: string;
    title: string;
    subtitle: string;
    hubLagos: string;
    hubNairobi: string;
    hubLondon: string;
    hubJohannesburg: string;
    generalTitle: string;
    salesTitle: string;
    supportTitle: string;
    partnershipsTitle: string;
    hoursWeekday: string;
    hoursSaturday: string;
    hoursSunday: string;
    responsePromise: string;
  };
  global: {
    badge: string;
    title: string;
    subtitle: string;
    allHubs: string;
    africanHubs: string;
    globalHubs: string;
    hubsCount: string;
    activeCountries: string;
    supportedCurrencies: string;
    uptimeSla: string;
    nodeLiveLabel: string;
  };
  whyContact: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      consultation: { title: string; description: string };
      demo: { title: string; description: string };
      implementation: { title: string; description: string };
      payroll: { title: string; description: string };
      technology: { title: string; description: string };
      enterprise: { title: string; description: string };
    };
  };
  aiAssistant: {
    badge: string;
    title: string;
    subtitle: string;
    botRole: string;
    statusOnline: string;
    quickPromptsLabel: string;
    inputPlaceholder: string;
    sendButton: string;
    applyAdviceButton: string;
    defaultGreeting: string;
    prompts: {
      payroll: string;
      remoteTeam: string;
      enterprise: string;
      pricing: string;
    };
  };
  challenges: {
    badge: string;
    title: string;
    subtitle: string;
    solveWithNextSofthr: string;
    items: {
      c1: { question: string; solution: string };
      c2: { question: string; solution: string };
      c3: { question: string; solution: string };
      c4: { question: string; solution: string };
      c5: { question: string; solution: string };
      c6: { question: string; solution: string };
    };
  };
  video: {
    badge: string;
    title: string;
    subtitle: string;
    videoDuration: string;
    previewTag: string;
    playVideo: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    scheduleWalkthrough: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    moreQuestionsTitle: string;
    moreQuestionsDesc: string;
    contactSupportBtn: string;
    items: Array<{ q: string; a: string }>;
  };
  finalCta: {
    badge: string;
    title: string;
    subtitle: string;
    bookDemoBtn: string;
    talkToSalesBtn: string;
    instantCallOrChat: string;
    noCardRequired: string;
    quickDeployment: string;
  };
  footer: {
    description: string;
    solutionsTitle: string;
    companyTitle: string;
    resourcesTitle: string;
    legalTitle: string;
    rightsReserved: string;
    panAfricanDisclaimer: string;
  };
  mobileBar: {
    talkToSales: string;
    bookDemo: string;
  };
  liveChat: {
    onlineSpecialist: string;
    statusAvailable: string;
    chatHeadline: string;
    chatSubhead: string;
    initialMessage: string;
    replyTime: string;
    quickOptions: {
      pricing: string;
      demo: string;
      compliance: string;
      human: string;
    };
    inputPlaceholder: string;
    openWhatsApp: string;
    directCall: string;
    tooltip: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      howCanWeHelp: 'How Can We Help?',
      contactForm: 'Contact Form',
      globalNetwork: 'Africa & Global',
      aiAssistant: 'AI Assistant',
      whyContact: 'Why Contact Us',
      faqs: 'FAQs',
      directCall: 'Direct Call',
      talkToSales: 'Talk to Sales',
      bookDemo: 'Book a Demo',
      themeToggleLight: 'Switch to light mode',
      themeToggleDark: 'Switch to dark mode',
      themeLabel: 'Theme',
      hubsBadge: '14+ Hubs',
      newBadge: 'New',
      selectLanguage: 'Language',
    },
    hero: {
      eyebrow: 'CONTACT NEXTSOFTHR',
      headlinePart1: "Let's Build a",
      headlineHighlight: 'Smarter Workplace',
      headlinePart2: 'Together',
      subtitle: 'Have questions about HR, payroll, employee management or business operations?',
      subtitleHighlight: 'Talk to the NextSofthr team and discover how our all-in-one platform can help your organization simplify processes, improve productivity and manage your workforce more efficiently.',
      ctaPrimary: 'Talk to Our Team',
      ctaSecondary: 'Book a Demo',
      statCompliance: 'African statutory compliance',
      statPayroll: 'Multi-currency payroll ready',
      statScaling: 'Micro to enterprise scaling',
      floatingActiveEmployees: 'Active African Workforce',
      floatingAccuracyRate: '99.98% Accuracy',
      floatingTimeSaved: '72% Payroll Time Saved',
      floatingPayrollTitle: 'Pan-African Multi-Currency Payroll',
      floatingDisbursed: 'Disbursed on time across 12 countries',
    },
    contactOptions: {
      sectionBadge: 'INQUIRY CHANNELS',
      sectionTitle: 'How Can We Help You Today?',
      sectionSubtitle: 'Select the area of assistance that best fits your immediate organizational needs.',
      cards: {
        sales: {
          title: 'Sales',
          headline: 'Talk to Sales',
          description: 'Want to understand how NextSofthr can fit your business, team size, and growth roadmap?',
          cta: 'Contact Sales',
          badge: 'Fast Response',
        },
        demo: {
          title: 'Product Tour',
          headline: 'See NextSofthr in Action',
          description: 'Schedule a personalized product demonstration tailored to your exact industry workflows.',
          cta: 'Book a Demo',
          badge: 'Interactive',
        },
        support: {
          title: 'Customer Support',
          headline: 'Need Support?',
          description: 'Already using NextSofthr? Our dedicated regional support desk is ready to help your team.',
          cta: 'Get Support',
        },
        partnerships: {
          title: 'Partnerships',
          headline: 'Become a Partner',
          description: 'Partner with NextSofthr and help organizations modernize HR, compliance, and payroll across Africa.',
          cta: 'Become a Partner',
        },
        enterprise: {
          title: 'Enterprise',
          headline: 'Enterprise Solutions',
          description: 'Need a multi-entity solution for a large or complex organization with distributed teams?',
          cta: 'Talk to Enterprise',
          badge: 'Custom Architecture',
        },
        general: {
          title: 'General Inquiries',
          headline: 'General Enquiries',
          description: 'Have a question, media inquiry, suggestion, or strategic business opportunity for our founders?',
          cta: 'Send an Enquiry',
        },
      },
    },
    form: {
      badge: 'DIRECT CONTACT PORTAL',
      title: 'Get in Touch with Our Specialists',
      subtitle: 'Complete the form below and an advisory specialist will reach out within 2 to 4 business hours.',
      activeCategoryLabel: 'Selected Inquiry Category',
      fields: {
        firstName: 'First Name',
        firstNamePlaceholder: 'e.g. Amara',
        lastName: 'Last Name',
        lastNamePlaceholder: 'e.g. Okafor',
        workEmail: 'Work Email Address',
        workEmailPlaceholder: 'name@company.com',
        phone: 'Phone Number (with Country Code)',
        phonePlaceholder: '+234 800 000 0000',
        companyName: 'Company / Organization Name',
        companyNamePlaceholder: 'e.g. Apex FinTech Africa Ltd',
        country: 'Operating Country / Headquarters',
        countryPlaceholder: 'Select your country',
        companySize: 'Company Size (Total Employees)',
        companySizePlaceholder: 'Select company size',
        enquiryType: 'Primary Inquiry Category',
        message: 'How can we help your organization?',
        messagePlaceholder: 'Tell us about your team setup, current payroll or HR challenges, and what you are looking to achieve...',
        agreeToTerms: 'I agree to receive communications from NextSofthr regarding product updates, consultations, and services in accordance with the Privacy Policy.',
        termsLink: 'Privacy Policy',
        submitButton: 'Send Inquiry to NextSofthr Team',
        submittingButton: 'Submitting Inquiry...',
        successTitle: 'Thank You! Your Request Has Been Successfully Processed',
        successMessage: 'Thank you for reaching out to NextSofthr. Our regional workforce advisors have received your inquiry and will contact you via email or phone within 2–4 business hours.',
        resetButton: 'Submit Another Inquiry',
        returnToTop: 'Return to Top of Page',
      },
      dynamic: {
        payrollTitle: 'Additional Payroll Specifications',
        payrollCount: 'Estimated Number of Employees on Payroll',
        payrollCountries: 'Countries Where Employees are Located',
        payrollFrequency: 'Payroll Processing Frequency',
        payrollFrequencyMonthly: 'Monthly',
        payrollFrequencyBiWeekly: 'Bi-Weekly',
        payrollFrequencyWeekly: 'Weekly',
        currentSystem: 'Current Payroll Mechanism (e.g. Excel, Legacy ERP)',
        hrTitle: 'Workforce & HR Architecture',
        hrEmployeesCount: 'Total Workforce Size',
        hrTeamSize: 'Dedicated HR/People Operations Team Size',
        mainChallenge: 'Core Workforce Pain Point to Solve',
        enterpriseTitle: 'Enterprise Multi-Entity Specifications',
        locationsCount: 'Number of Operating Subsidiaries or Offices',
        operatingCountries: 'Target Countries for Cross-Border Operations',
        currentErp: 'Current Core ERP or Accounting Stack (e.g. SAP, NetSuite, QuickBooks)',
      },
      sidebar: {
        directCallTitle: 'Prefer to talk right away?',
        directCallSubtitle: 'Call our direct advisory line for rapid assistance during business hours.',
        emailTeamTitle: 'Dedicated Inboxes',
        hoursTitle: 'Operational Hours',
        hoursSubtitle: 'Monday – Friday: 8:00 AM – 6:00 PM (WAT / GMT+1 & EAT)',
        securityTitle: 'Enterprise-Grade Security',
        securitySubtitle: 'NDPR, GDPR & ISO-ready data protection standards across all nodes.',
      },
    },
    contactInfo: {
      badge: 'GLOBAL REACH & HEADQUARTERS',
      title: 'Our Pan-African & Global Presence',
      subtitle: 'Connect with local workforce specialists across Africa and our international coordination hubs.',
      hubLagos: 'West Africa Regional HQ (Lagos, Nigeria)',
      hubNairobi: 'East Africa Regional HQ (Nairobi, Kenya)',
      hubLondon: 'European & Global Coordination (London, UK)',
      hubJohannesburg: 'Southern Africa Regional Operations (Johannesburg, South Africa)',
      generalTitle: 'General Operations',
      salesTitle: 'Commercial & Sales',
      supportTitle: 'Client Success & Helpdesk',
      partnershipsTitle: 'Strategic Alliances & Integrations',
      hoursWeekday: 'Monday – Friday: 08:00 – 18:00 WAT / GMT+1',
      hoursSaturday: 'Saturday: 09:00 – 14:00 (Emergency Standby)',
      hoursSunday: 'Sunday: Closed (Self-service online portal active)',
      responsePromise: 'Guaranteed 2-4 business hour response time for enterprise inquiries.',
    },
    global: {
      badge: 'PAN-AFRICAN & GLOBAL FOOTPRINT',
      title: 'Built for Cross-Border African Businesses',
      subtitle: 'Operating smoothly across 14+ commercial hubs with native multi-currency and statutory compliance.',
      allHubs: 'All Operations',
      africanHubs: 'African Hubs',
      globalHubs: 'International Hubs',
      hubsCount: '14+ Active Hubs',
      activeCountries: '12+ Countries Compliant',
      supportedCurrencies: '20+ Currencies Supported',
      uptimeSla: '99.98% Platform Uptime',
      nodeLiveLabel: 'Operational Hub',
    },
    whyContact: {
      badge: 'WHY ENGAGE WITH US',
      title: 'Why Organizations Choose to Consult NextSofthr',
      subtitle: 'Whether you are transitioning from manual spreadsheets or upgrading legacy enterprise software, our advisors walk with you every step of the journey.',
      items: {
        consultation: {
          title: 'Personalized Strategic Consultation',
          description: 'Get actionable guidance customized to your workforce size, regional tax jurisdictions, and operating reality.',
        },
        demo: {
          title: 'Tailored Live Platform Demonstration',
          description: 'Experience real-time interactive dashboards, multi-tiered approvals, and employee self-service before committing.',
        },
        implementation: {
          title: 'Seamless Data Migration & Onboarding',
          description: 'Migrate biometric attendance records, historical payroll, and employee masters with zero operational downtime.',
        },
        payroll: {
          title: 'Pan-African Payroll & Tax Compliance',
          description: 'Eliminate calculation errors and ensure compliance with PAYE, pension, health insurance, and local labor laws.',
        },
        technology: {
          title: 'Modern HR Tech & AI Automation',
          description: 'Leverage intelligent document scanning, performance analytics, and automated leave management.',
        },
        enterprise: {
          title: 'Scalable Multi-Entity Architecture',
          description: 'Govern distributed teams across multiple subsidiaries with consolidated financial reporting and role-based security.',
        },
      },
    },
    aiAssistant: {
      badge: 'SMART DISCOVERY',
      title: 'Interactive Workforce Advisor',
      subtitle: 'Ask our guided AI tool to diagnose your organizational bottleneck and pre-fill your contact inquiry with actionable context.',
      botRole: 'NextSofthr AI Workforce Advisory Specialist',
      statusOnline: 'Active Online',
      quickPromptsLabel: 'Popular Guidance Topics:',
      inputPlaceholder: 'Ask a question about multi-country payroll, biometric tracking, or pricing...',
      sendButton: 'Ask Advisor',
      applyAdviceButton: 'Apply to Contact Form',
      defaultGreeting: "Hello! I am NextSofthr's AI workforce advisor. Which aspect of your human resources or payroll operations are you looking to streamline today?",
      prompts: {
        payroll: 'How do you handle multi-country payroll and statutory tax filing across Africa?',
        remoteTeam: 'Can we manage remote and hybrid staff with biometric and mobile clock-in?',
        enterprise: 'How does NextSofthr support multi-subsidiary enterprise consolidation?',
        pricing: 'What are the pricing tiers for small vs growing enterprises?',
      },
    },
    challenges: {
      badge: 'OPERATIONAL BOTTLENECK REMOVAL',
      title: 'Common Workplace Challenges We Solve Every Day',
      subtitle: 'Click any challenge below to load the proven solution into your inquiry form.',
      solveWithNextSofthr: 'Solve with NextSofthr',
      items: {
        c1: {
          question: 'Disorganized employee records and manual paperwork?',
          solution: 'Centralize all employee digital files, contracts, and emergency records with zero paper clutter.',
        },
        c2: {
          question: 'Complex payroll calculations with tax and pension errors?',
          solution: 'One-click multi-currency payroll automatically calculated with local statutory compliance rules.',
        },
        c3: {
          question: 'Attendance disputes, buddy punching, and lost shift hours?',
          solution: 'Integrated biometric, GPS geofencing, and mobile self-service clock-in with overtime validation.',
        },
        c4: {
          question: 'Messy leave approvals and lost productivity oversight?',
          solution: 'Automated leave accruals, hierarchical approval workflows, and live team calendar synchronization.',
        },
        c5: {
          question: 'Ineffective annual reviews with zero measurable employee goals?',
          solution: 'Continuous 360-degree feedback, quarterly OKRs, and competency tracking tied directly to payroll incentives.',
        },
        c6: {
          question: 'Managing cross-border teams with different currencies and tax codes?',
          solution: 'Multi-entity corporate governance letting you pay teams in NGN, GHS, KES, ZAR, USD, and EUR seamlessly.',
        },
      },
    },
    video: {
      badge: 'SYSTEM OVERVIEW',
      title: 'See the NextSofthr Experience in Action',
      subtitle: 'Explore the intuitive dashboard that modernizes payroll, attendance, and employee management for African businesses.',
      videoDuration: '3 Min Overview',
      previewTag: 'NextSofthr Core Platform Walkthrough',
      playVideo: 'Watch Overview',
      feature1Title: 'Smart Self-Service',
      feature1Desc: 'Employees request leave, view payslips, and submit claims directly on mobile.',
      feature2Title: 'Automated Compliance',
      feature2Desc: 'Automated statutory tax deduction schedules tailored to 12+ African jurisdictions.',
      feature3Title: 'Multi-Currency Rails',
      feature3Desc: 'Pay local and international staff with direct bank and mobile money integrations.',
      scheduleWalkthrough: 'Schedule a 1-on-1 Guided Walkthrough',
    },
    faq: {
      badge: 'FREQUENTLY ASKED QUESTIONS',
      title: 'Clear Answers to Your Questions',
      subtitle: 'Everything you need to know about NextSofthr platform onboarding, security, and localized capabilities.',
      moreQuestionsTitle: 'Have a question not listed here?',
      moreQuestionsDesc: 'Our workforce specialists are available to discuss your specific requirements directly.',
      contactSupportBtn: 'Speak with an Expert',
      items: [
        {
          q: 'How fast can our company get onboarded onto NextSofthr?',
          a: 'Most small to medium businesses are up and running within 48 to 72 hours. For enterprise organizations with multi-subsidiary data migration, our dedicated deployment team typically completes transition within 7 to 14 business days with zero payroll downtime.',
        },
        {
          q: 'Does NextSofthr support local African statutory tax and pension regulations?',
          a: 'Yes! NextSofthr is engineered with native localized compliance formulas for Nigeria (PAYE, Pension Reform Act, NHF, NSITF, ITF), Kenya (PAYE, NSSF, NHIF, Housing Levy), Ghana (SSNIT, Tier 1/2/3, GRA), South Africa (SARS, UIF, SDL), Rwanda, Uganda, and other key African jurisdictions.',
        },
        {
          q: 'Can NextSofthr handle multi-currency payroll for international and remote teams?',
          a: 'Absolutely. NextSofthr allows organizations to maintain employee contracts and process payouts in local currencies (NGN, KES, GHS, ZAR, RWF, UGX) as well as global currencies (USD, GBP, EUR) with exchange rate safeguards.',
        },
        {
          q: 'How secure is our confidential payroll and employee data?',
          a: 'Security is at the heart of our infrastructure. NextSofthr employs AES-256 bank-level encryption at rest, TLS 1.3 in transit, role-based access control (RBAC), multi-factor authentication (MFA), and full compliance with NDPR and GDPR regulations.',
        },
        {
          q: 'Can NextSofthr integrate with our existing biometric time clocks and ERPs?',
          a: 'Yes. Our platform provides standard REST APIs and pre-built connectors for major biometric hardware brands (ZKTeco, Suprema, Hikvision) as well as accounting and ERP stacks including SAP, QuickBooks, and Xero.',
        },
        {
          q: 'What level of support do you provide after deployment?',
          a: 'All clients receive dedicated regional customer success management, priority WhatsApp helpdesk support, ticket tracking, and live phone assistance during standard African business hours.',
        },
        {
          q: 'Is NextSofthr suitable for small businesses with fewer than 20 employees?',
          a: 'Yes, our platform is fully modular and scales from growing startups of 5 employees up to conglomerates with tens of thousands of staff. You only pay for active seats.',
        },
      ],
    },
    finalCta: {
      badge: 'START TODAY',
      title: 'Ready to Transform Your Workplace Operations?',
      subtitle: 'Join hundreds of forward-thinking organizations across Africa and worldwide that rely on NextSofthr to manage their people and payroll with confidence.',
      bookDemoBtn: 'Book a Live Demo',
      talkToSalesBtn: 'Talk to Sales',
      instantCallOrChat: 'Prefer instant chat? Reach our advisors via WhatsApp or phone.',
      noCardRequired: 'No credit card required',
      quickDeployment: 'Rapid 48-hour onboarding',
    },
    footer: {
      description: 'All-in-one HR, Payroll and Business Management Platform designed for micro, small, medium-sized and large businesses across Africa and worldwide.',
      solutionsTitle: 'Solutions',
      companyTitle: 'Company',
      resourcesTitle: 'Resources',
      legalTitle: 'Legal & Compliance',
      rightsReserved: 'All rights reserved. NextSofthr Platform.',
      panAfricanDisclaimer: 'NextSofthr operations are designed with strict data sovereignty, NDPR, GDPR, and regional statutory compliance standards across all African and global nodes.',
    },
    mobileBar: {
      talkToSales: 'Talk to Sales',
      bookDemo: 'Book Demo',
    },
    liveChat: {
      onlineSpecialist: 'Amara Okafor',
      statusAvailable: 'Online • Workforce Advisor',
      chatHeadline: 'Chat with NextSofthr',
      chatSubhead: 'We typically reply within minutes.',
      initialMessage: "Hello! Welcome to NextSofthr. How can our team assist your organization's HR or payroll setup today?",
      replyTime: 'Average reply time: < 3 mins',
      quickOptions: {
        pricing: 'Get Pricing & Plans',
        demo: 'Book a Personalized Demo',
        compliance: 'African Tax & Payroll Compliance',
        human: 'Speak with a Live Human Agent',
      },
      inputPlaceholder: 'Type your question or message...',
      openWhatsApp: 'Chat on WhatsApp',
      directCall: 'Call Specialist',
      tooltip: 'Need assistance? Chat live with our team',
    },
  },

  fr: {
    nav: {
      howCanWeHelp: 'Comment Vous Aider ?',
      contactForm: 'Formulaire de Contact',
      globalNetwork: 'Afrique & International',
      aiAssistant: 'Assistant IA',
      whyContact: 'Pourquoi Nous Choisir',
      faqs: 'FAQ',
      directCall: 'Appel Direct',
      talkToSales: 'Contacter les Ventes',
      bookDemo: 'Demander une Démo',
      themeToggleLight: 'Passer en mode clair',
      themeToggleDark: 'Passer en mode sombre',
      themeLabel: 'Thème',
      hubsBadge: '14+ Hubs',
      newBadge: 'Nouveau',
      selectLanguage: 'Langue',
    },
    hero: {
      eyebrow: 'CONTACTER NEXTSOFTHR',
      headlinePart1: 'Bâtissons un',
      headlineHighlight: 'Lieu de Travail Intelligent',
      headlinePart2: 'Ensemble',
      subtitle: 'Des questions sur les RH, la paie, la gestion des effectifs ou les opérations de votre entreprise ?',
      subtitleHighlight: 'Échangez avec l’équipe NextSofthr et découvrez comment notre plateforme tout-en-un aide votre organisation à simplifier ses processus, stimuler la productivité et piloter votre capital humain en toute sérénité.',
      ctaPrimary: 'Parler à Notre Équipe',
      ctaSecondary: 'Réserver une Démo',
      statCompliance: 'Conformité légale & fiscale africaine',
      statPayroll: 'Paie multidevise prête à l’emploi',
      statScaling: 'De la PME aux grands groupes',
      floatingActiveEmployees: 'Employés Actifs en Afrique',
      floatingAccuracyRate: '99,98 % Précision de Paie',
      floatingTimeSaved: '72 % de Temps Économisé',
      floatingPayrollTitle: 'Paie Panafricaine & Multidevise',
      floatingDisbursed: 'Versée à temps dans 12 pays',
    },
    contactOptions: {
      sectionBadge: 'CANAUX D’ÉCHANGE',
      sectionTitle: 'Comment Pouvons-Nous Vous Aider ?',
      sectionSubtitle: 'Sélectionnez le département le mieux adapté à vos priorités immédiates.',
      cards: {
        sales: {
          title: 'Commercial',
          headline: 'Équipe Commerciale',
          description: 'Découvrez comment NextSofthr s’adapte à la taille de votre équipe, vos ambitions et votre modèle.',
          cta: 'Contacter les Ventes',
          badge: 'Réponse Rapide',
        },
        demo: {
          title: 'Visite Produit',
          headline: 'Voir NextSofthr en Action',
          description: 'Programmez une démonstration personnalisée basée sur vos flux de travail et contraintes sectorielles.',
          cta: 'Réserver une Démo',
          badge: 'Interactif',
        },
        support: {
          title: 'Support Client',
          headline: 'Besoin d’Assistance ?',
          description: 'Vous utilisez déjà NextSofthr ? Notre centre d’assistance régional est à l’écoute de votre équipe.',
          cta: 'Accéder au Support',
        },
        partnerships: {
          title: 'Partenariats',
          headline: 'Devenir Partenaire',
          description: 'Associez-vous à NextSofthr pour moderniser la gestion RH, la conformité et la paie à travers l’Afrique.',
          cta: 'Devenir Partenaire',
        },
        enterprise: {
          title: 'Entreprise & Groupes',
          headline: 'Solutions Grands Comptes',
          description: 'Besoin d’une architecture multi-filiales pour des équipes réparties dans plusieurs pays ?',
          cta: 'Contacter l’Équipe Entreprise',
          badge: 'Architecture Dédiée',
        },
        general: {
          title: 'Demandes Générales',
          headline: 'Renseignements Divers',
          description: 'Une question générale, une opportunité presse ou une proposition stratégique pour nos fondateurs ?',
          cta: 'Envoyer un Message',
        },
      },
    },
    form: {
      badge: 'PORTAIL DE CONTACT DIRECT',
      title: 'Prenez Contact avec Nos Spécialistes',
      subtitle: 'Remplissez le formulaire ci-dessous et un conseiller en ressources humaines vous recontactera sous 2 à 4 heures ouvrées.',
      activeCategoryLabel: 'Catégorie Sélectionnée',
      fields: {
        firstName: 'Prénom',
        firstNamePlaceholder: 'ex. Jean-Paul',
        lastName: 'Nom de famille',
        lastNamePlaceholder: 'ex. Diallo',
        workEmail: 'Adresse Email Professionnelle',
        workEmailPlaceholder: 'nom@entreprise.com',
        phone: 'Numéro de Téléphone (avec indicatif)',
        phonePlaceholder: '+221 77 000 00 00',
        companyName: 'Nom de l’Entreprise / Organisation',
        companyNamePlaceholder: 'ex. Dakar Tech Solutions SARL',
        country: 'Pays d’Activité / Siège Social',
        countryPlaceholder: 'Sélectionnez votre pays',
        companySize: 'Taille de l’Entreprise (Nombre d’Employés)',
        companySizePlaceholder: 'Sélectionnez la tranche d’effectif',
        enquiryType: 'Sujet Principal de Votre Demande',
        message: 'Comment pouvons-nous aider votre organisation ?',
        messagePlaceholder: 'Décrivez votre structure, vos défis actuels en matière de paie ou de RH, et vos objectifs...',
        agreeToTerms: 'J’accepte de recevoir des communications de NextSofthr relatives aux produits, conseils et services, conformément à la Politique de Confidentialité.',
        termsLink: 'Politique de Confidentialité',
        submitButton: 'Envoyer la Demande à NextSofthr',
        submittingButton: 'Envoi en cours...',
        successTitle: 'Merci ! Votre Demande a Été Traitée avec Succès',
        successMessage: 'Merci d’avoir contacté NextSofthr. Nos conseillers régionaux ont bien reçu votre demande et vous recontacteront par email ou téléphone dans un délai de 2 à 4 heures ouvrées.',
        resetButton: 'Envoyer une Autre Demande',
        returnToTop: 'Retourner en Haut de la Page',
      },
      dynamic: {
        payrollTitle: 'Spécifications Complémentaires de la Paie',
        payrollCount: 'Nombre Estimé d’Employés sur le Livre de Paie',
        payrollCountries: 'Pays où se Trouvent vos Collaborateurs',
        payrollFrequency: 'Fréquence de Traitement des Salaires',
        payrollFrequencyMonthly: 'Mensuelle',
        payrollFrequencyBiWeekly: 'Bimensuelle',
        payrollFrequencyWeekly: 'Hebdomadaire',
        currentSystem: 'Outil de Paie Actuel (ex. Excel, ERP Hérité)',
        hrTitle: 'Organisation & Architecture RH',
        hrEmployeesCount: 'Effectif Global de l’Organisation',
        hrTeamSize: 'Taille de l’Équipe RH / Administration',
        mainChallenge: 'Défi Principal à Résoudre',
        enterpriseTitle: 'Spécifications Multi-Entités & Groupe',
        locationsCount: 'Nombre de Filiales ou de Bureaux Locaux',
        operatingCountries: 'Pays Cibles pour vos Opérations Transfrontalières',
        currentErp: 'ERP ou Logiciel Comptable Actuel (ex. SAP, Sage, NetSuite)',
      },
      sidebar: {
        directCallTitle: 'Besoin d’une réponse immédiate ?',
        directCallSubtitle: 'Appelez directement notre ligne conseil pendant les heures ouvrées.',
        emailTeamTitle: 'Boîtes Emails Dédiées',
        hoursTitle: 'Heures d’Ouverture',
        hoursSubtitle: 'Lundi – Vendredi : 08h00 – 18h00 (Heure de Dakar, Abidjan & Douala)',
        securityTitle: 'Sécurité de Niveau Entreprise',
        securitySubtitle: 'Conformité stricte aux normes RGPD, APDP et protection souveraine des données.',
      },
    },
    contactInfo: {
      badge: 'PORTÉE GLOBALE & SIÈGES',
      title: 'Notre Présence Panafricaine & Internationale',
      subtitle: 'Connectez-vous avec nos spécialistes RH locaux à travers l’Afrique et nos hubs de coordination mondiaux.',
      hubLagos: 'Siège Régional Afrique de l’Ouest (Lagos, Nigéria)',
      hubNairobi: 'Siège Régional Afrique de l’Est (Nairobi, Kenya)',
      hubLondon: 'Coordination Européenne & Globale (Londres, Royaume-Uni)',
      hubJohannesburg: 'Opérations Afrique Australe (Johannesbourg, Afrique du Sud)',
      generalTitle: 'Opérations Générales',
      salesTitle: 'Direction Commerciale',
      supportTitle: 'Succès Client & Support',
      partnershipsTitle: 'Alliances Stratégiques & Intégrations',
      hoursWeekday: 'Lundi – Vendredi : 08h00 – 18h00 GMT / WAT',
      hoursSaturday: 'Samedi : 09h00 – 14h00 (Astreinte Urgences)',
      hoursSunday: 'Dimanche : Fermé (Portail en ligne 24/7)',
      responsePromise: 'Délai de réponse garanti de 2 à 4 heures ouvrées pour les entreprises.',
    },
    global: {
      badge: 'EMPREINTE PANAFRICAINE & GLOBALE',
      title: 'Conçu pour les Entreprises Africaines Transfrontalières',
      subtitle: 'Opérant en toute fluidité à travers plus de 14 hubs avec gestion multidevise et conformité légale intégrée.',
      allHubs: 'Tous les Hubs',
      africanHubs: 'Hubs Africains',
      globalHubs: 'Hubs Internationaux',
      hubsCount: '14+ Hubs Actifs',
      activeCountries: '12+ Pays Couverts',
      supportedCurrencies: '20+ Devises Gérées',
      uptimeSla: '99,98 % de Disponibilité',
      nodeLiveLabel: 'Hub Opérationnel',
    },
    whyContact: {
      badge: 'POURQUOI NOUS CONSULTER',
      title: 'Pourquoi les Entreprises Choisissent NextSofthr',
      subtitle: 'Que vous quittiez des fichiers Excel fastidieux ou remplaciez un ancien logiciel, nos experts vous accompagnent à chaque étape.',
      items: {
        consultation: {
          title: 'Conseil Stratégique Personnalisé',
          description: 'Obtenez des recommandations adaptées à la taille de votre équipe, aux législations locales et aux réalités du terrain.',
        },
        demo: {
          title: 'Démonstration Pratique et Sur-Mesure',
          description: 'Découvrez en direct nos tableaux de bord interactifs, les circuits d’approbation et le portail employé en libre-service.',
        },
        implementation: {
          title: 'Migration et Déploiement Fluides',
          description: 'Transférez vos données biométriques, historiques de paie et dossiers du personnel sans aucune interruption de paie.',
        },
        payroll: {
          title: 'Paie Panafricaine & Fiscalité Conforme',
          description: 'Supprimez les erreurs de calcul et garantissez la conformité fiscale (IPR, cotisations sociales, caisses de retraite).',
        },
        technology: {
          title: 'Technologies RH Modernes & Automatisation IA',
          description: 'Profitez de la numérisation intelligente des documents, de l’analyse prédictive et du suivi automatique des congés.',
        },
        enterprise: {
          title: 'Architecture Multi-Entités Évolutive',
          description: 'Supervisez vos équipes réparties dans plusieurs filiales avec une consolidation financière et des rôles stricts.',
        },
      },
    },
    aiAssistant: {
      badge: 'DIAGNOSTIC INTELLIGENT',
      title: 'Conseiller RH Interactif par IA',
      subtitle: 'Interrogez notre assistant pour analyser vos défis opérationnels et pré-remplir votre demande de contact avec un contexte précis.',
      botRole: 'Spécialiste Conseil RH NextSofthr',
      statusOnline: 'En Ligne',
      quickPromptsLabel: 'Sujets Fréquents :',
      inputPlaceholder: 'Posez une question sur la paie multi-pays, le pointage biométrique ou nos tarifs...',
      sendButton: 'Poser la Question',
      applyAdviceButton: 'Appliquer au Formulaire',
      defaultGreeting: 'Bonjour ! Je suis le conseiller RH NextSofthr. Quel aspect de vos ressources humaines ou de votre paie souhaitez-vous optimiser aujourd’hui ?',
      prompts: {
        payroll: 'Comment gérez-vous la paie multi-pays et les déclarations fiscales en Afrique francophone ?',
        remoteTeam: 'Peut-on gérer des équipes en télétravail avec pointage mobile et géolocalisation ?',
        enterprise: 'Comment NextSofthr prend-il en charge la consolidation multi-filiales ?',
        pricing: 'Quels sont vos forfaits tarifaires pour PME et grandes entreprises ?',
      },
    },
    challenges: {
      badge: 'RÉSOLUTION DES POINTS DE BLOCAGE',
      title: 'Les Défis Quotidiens que Nous Résolvons pour Vous',
      subtitle: 'Cliquez sur l’un des défis ci-dessous pour charger la solution adaptée dans votre formulaire.',
      solveWithNextSofthr: 'Résoudre avec NextSofthr',
      items: {
        c1: {
          question: 'Dossiers du personnel éparpillés et paperasse manuelle ?',
          solution: 'Centralisez l’ensemble des dossiers dématérialisés, contrats et fiches d’urgence sans encombrement papier.',
        },
        c2: {
          question: 'Calculs de paie fastidieux avec risques d’erreurs fiscales ?',
          solution: 'Générez la paie multidevise en un clic avec application automatique des barèmes fiscaux et sociaux locaux.',
        },
        c3: {
          question: 'Litiges de présence, pointages frauduleux et heures perdues ?',
          solution: 'Pointage biométrique synchronisé, géolocalisation mobile et validation rigoureuse des heures supplémentaires.',
        },
        c4: {
          question: 'Validation chaotique des congés et manque de visibilité ?',
          solution: 'Calcul automatique des soldes, circuits de validation hiérarchiques et planning d’équipe partagé en direct.',
        },
        c5: {
          question: 'Évaluations annuelles inefficaces sans objectifs mesurables ?',
          solution: 'Feedback 360 continu, OKR trimestriels et grille de compétences directement reliés aux primes.',
        },
        c6: {
          question: 'Gestion d’équipes transfrontalières avec plusieurs monnaies ?',
          solution: 'Pilotage multi-entités permettant de payer vos collaborateurs en XOF, XAF, GNF, USD et EUR en toute clarté.',
        },
      },
    },
    video: {
      badge: 'APERÇU DE LA PLATEFORME',
      title: 'Découvrez l’Expérience NextSofthr en Action',
      subtitle: 'Explorez l’interface intuitive qui modernise la paie, le pointage et la gestion des talents pour les entreprises en Afrique.',
      videoDuration: 'Aperçu 3 Minutes',
      previewTag: 'Démonstration de la Plateforme NextSofthr',
      playVideo: 'Regarder la Démo',
      feature1Title: 'Espace Salarié Intuitif',
      feature1Desc: 'Les collaborateurs posent leurs congés, consultent leurs bulletins et notes de frais sur mobile.',
      feature2Title: 'Conformité Fiscale Automatisée',
      feature2Desc: 'Déclarations fiscales et cotisations sociales automatisées pour plus de 12 juridictions africaines.',
      feature3Title: 'Réseau de Paiement Multidevise',
      feature3Desc: 'Rémunérez vos équipes locales et internationales par virements bancaires et mobile money.',
      scheduleWalkthrough: 'Planifier une Démonstration Guidée Personnalisée',
    },
    faq: {
      badge: 'FOIRE AUX QUESTIONS',
      title: 'Des Réponses Claires à Vos Questions',
      subtitle: 'Tout ce que vous devez savoir sur le déploiement, la sécurité et les fonctionnalités locales de NextSofthr.',
      moreQuestionsTitle: 'Vous avez une question spécifique ?',
      moreQuestionsDesc: 'Nos spécialistes RH et paie sont à votre disposition pour analyser vos besoins particuliers.',
      contactSupportBtn: 'Parler avec un Spécialiste',
      items: [
        {
          q: 'Combien de temps faut-il pour déployer NextSofthr au sein de notre structure ?',
          a: 'La majorité des PME sont opérationnelles en 48 à 72 heures. Pour les grands comptes nécessitant une migration complexe de plusieurs filiales, notre équipe spécialisée finalise la transition en 7 à 14 jours ouvrés sans interruption de paie.',
        },
        {
          q: 'NextSofthr prend-il en charge les réglementations fiscales et sociales locales africaines ?',
          a: 'Oui ! NextSofthr intègre nativement les calculs de charges sociales et fiscales pour les pays de la zone OHADA/UEMOA/CEMAC (Sénégal, Côte d’Ivoire, Cameroun, RDC, Gabon), ainsi que le Nigéria, le Kenya, le Ghana et l’Afrique du Sud.',
        },
        {
          q: 'La plateforme permet-elle de gérer la paie en plusieurs devises ?',
          a: 'Parfaitement. NextSofthr permet d’établir les contrats et de verser les salaires en devises locales (FCFA XOF/XAF, Franc Guinéen, NGN, KES) tout comme en devises internationales (USD, EUR, GBP) avec un suivi des taux de change.',
        },
        {
          q: 'Quel est le niveau de sécurité garanti pour nos données confidentielles ?',
          a: 'La sécurité est au cœur de notre architecture : chiffrement AES-256 au repos, TLS 1.3 en transit, contrôle d’accès basé sur les rôles (RBAC), double authentification (2FA) et stricte conformité aux lois de protection des données personnelles.',
        },
        {
          q: 'NextSofthr peut-il s’intégrer à nos pointeuses biométriques et à notre logiciel comptable ?',
          a: 'Oui. Notre solution intègre des connecteurs natifs pour les pointeuses reconnues (ZKTeco, Suprema, Hikvision) ainsi que des API pour synchroniser vos écritures de paie avec SAP, Sage, QuickBooks ou Xero.',
        },
        {
          q: 'Quel accompagnement offrez-vous après le démarrage ?',
          a: 'Chaque client bénéficie d’un gestionnaire de compte régional dédié, d’un support prioritaire par WhatsApp, d’un suivi par tickets et d’une assistance téléphonique directe pendant les heures d’ouverture.',
        },
        {
          q: 'NextSofthr est-il adapté aux petites entreprises de moins de 20 salariés ?',
          a: 'Oui, notre plateforme est modulaire et commence dès les équipes de 5 collaborateurs jusqu’aux groupes de plusieurs milliers d’employés. Vous ne payez que pour les utilisateurs actifs.',
        },
      ],
    },
    finalCta: {
      badge: 'COMMENCEZ MAINTENANT',
      title: 'Prêt à Transformer la Gestion de Vos Équipes ?',
      subtitle: 'Rejoignez des centaines d’entreprises visionnaires en Afrique et à l’international qui font confiance à NextSofthr pour piloter leur capital humain.',
      bookDemoBtn: 'Réserver une Démo en Direct',
      talkToSalesBtn: 'Parler à un Conseiller',
      instantCallOrChat: 'Besoin d’un contact immédiat ? Échangez avec nous par WhatsApp ou téléphone.',
      noCardRequired: 'Aucune carte bancaire requise',
      quickDeployment: 'Mise en route rapide sous 48h',
    },
    footer: {
      description: 'Plateforme complète de gestion des RH, de la paie et de l’administration d’entreprise pour les structures de toutes tailles en Afrique et à travers le monde.',
      solutionsTitle: 'Solutions',
      companyTitle: 'Entreprise',
      resourcesTitle: 'Ressources',
      legalTitle: 'Conformité & Légal',
      rightsReserved: 'Tous droits réservés. Plateforme NextSofthr.',
      panAfricanDisclaimer: 'Les opérations NextSofthr respectent la souveraineté des données, les normes RGPD/APDP et les exigences réglementaires des pays d’Afrique et du monde entier.',
    },
    mobileBar: {
      talkToSales: 'Ventes',
      bookDemo: 'Réserver Démo',
    },
    liveChat: {
      onlineSpecialist: 'Amara Okafor',
      statusAvailable: 'En ligne • Conseillère RH',
      chatHeadline: 'Discussion avec NextSofthr',
      chatSubhead: 'Nous répondons en quelques minutes.',
      initialMessage: 'Bonjour ! Bienvenue chez NextSofthr. Comment pouvons-nous vous aider aujourd’hui dans votre gestion RH ou de paie ?',
      replyTime: 'Temps de réponse moyen : < 3 min',
      quickOptions: {
        pricing: 'Consulter les Tarifs & Formules',
        demo: 'Réserver une Démonstration Guidée',
        compliance: 'Conformité Fiscale & Paie en Afrique',
        human: 'Parler avec un Spécialiste Humain',
      },
      inputPlaceholder: 'Écrivez votre message ou question...',
      openWhatsApp: 'Discuter sur WhatsApp',
      directCall: 'Appeler le Conseiller',
      tooltip: 'Besoin d’aide ? Échangez en direct avec nous',
    },
  },

  pt: {
    nav: {
      howCanWeHelp: 'Como Podemos Ajudar?',
      contactForm: 'Formulário de Contacto',
      globalNetwork: 'África & Internacional',
      aiAssistant: 'Assistente IA',
      whyContact: 'Porquê Contactar-nos',
      faqs: 'Perguntas Frequentes',
      directCall: 'Chamada Direta',
      talkToSales: 'Falar com Vendas',
      bookDemo: 'Agendar Demonstração',
      themeToggleLight: 'Mudar para modo claro',
      themeToggleDark: 'Mudar para modo escuro',
      themeLabel: 'Tema',
      hubsBadge: '14+ Polos',
      newBadge: 'Novo',
      selectLanguage: 'Idioma',
    },
    hero: {
      eyebrow: 'CONTACTAR NEXTSOFTHR',
      headlinePart1: 'Vamos Construir um',
      headlineHighlight: 'Ambiente de Trabalho Inteligente',
      headlinePart2: 'Juntos',
      subtitle: 'Tem dúvidas sobre RH, processamento salarial, gestão de funcionários ou operações empresariais?',
      subtitleHighlight: 'Fale com a equipa da NextSofthr e descubra como a nossa plataforma unificada ajuda a sua organização a simplificar processos, aumentar a produtividade e gerir a sua força de trabalho com total eficiência.',
      ctaPrimary: 'Falar com a Nossa Equipa',
      ctaSecondary: 'Agendar uma Demonstração',
      statCompliance: 'Conformidade legal e fiscal africana',
      statPayroll: 'Processamento salarial multimoeda pronto',
      statScaling: 'De microempresas a grandes corporações',
      floatingActiveEmployees: 'Colaboradores Ativos em África',
      floatingAccuracyRate: '99,98% Precisão Salarial',
      floatingTimeSaved: '72% Tempo Poupado em Salários',
      floatingPayrollTitle: 'Processamento Salarial Panafricano',
      floatingDisbursed: 'Processado a tempo em 12 países',
    },
    contactOptions: {
      sectionBadge: 'CANAIS DE ATENDIMENTO',
      sectionTitle: 'Como Podemos Ajudar Hoje?',
      sectionSubtitle: 'Selecione a área mais adequada às necessidades prioritárias da sua organização.',
      cards: {
        sales: {
          title: 'Vendas',
          headline: 'Falar com Vendas',
          description: 'Descubra como a NextSofthr se adapta à dimensão da sua equipa, orçamento e plano de expansão.',
          cta: 'Contactar Vendas',
          badge: 'Resposta Rápida',
        },
        demo: {
          title: 'Visita ao Produto',
          headline: 'Ver a NextSofthr em Ação',
          description: 'Agende uma demonstração prática personalizada de acordo com os fluxos operacionais da sua empresa.',
          cta: 'Agendar Demonstração',
          badge: 'Interativo',
        },
        support: {
          title: 'Suporte ao Cliente',
          headline: 'Precisa de Ajuda?',
          description: 'Já utiliza a NextSofthr? A nossa equipa de suporte regional está pronta para apoiar a sua empresa.',
          cta: 'Obter Suporte',
        },
        partnerships: {
          title: 'Parcerias',
          headline: 'Seja Nosso Parceiro',
          description: 'Junte-se à NextSofthr e ajude empresas a modernizar recursos humanos, conformidade e salários em África.',
          cta: 'Tornar-se Parceiro',
        },
        enterprise: {
          title: 'Empresarial & Grupos',
          headline: 'Soluções Corporativas',
          description: 'Necessita de uma solução multientidade para empresas de grande dimensão com equipas distribuídas?',
          cta: 'Falar com Especialistas',
          badge: 'Arquitetura Dedicada',
        },
        general: {
          title: 'Informações Gerais',
          headline: 'Dúvidas Gerais',
          description: 'Tem uma questão geral, contacto de imprensa ou oportunidade estratégica para os nossos fundadores?',
          cta: 'Enviar Mensagem',
        },
      },
    },
    form: {
      badge: 'PORTAL DE CONTACTO DIRETO',
      title: 'Entre em Contacto com os Nossos Especialistas',
      subtitle: 'Preencha o formulário abaixo e um consultor de recursos humanos entrará em contacto dentro de 2 a 4 horas úteis.',
      activeCategoryLabel: 'Categoria de Atendimento Selecionada',
      fields: {
        firstName: 'Nome Próprio',
        firstNamePlaceholder: 'ex. Manuel',
        lastName: 'Apelido / Sobrenome',
        lastNamePlaceholder: 'ex. dos Santos',
        workEmail: 'E-mail Profissional',
        workEmailPlaceholder: 'nome@empresa.com',
        phone: 'Número de Telefone (com indicativo)',
        phonePlaceholder: '+244 923 000 000',
        companyName: 'Nome da Empresa / Organização',
        companyNamePlaceholder: 'ex. Luanda Tech Group Lda',
        country: 'País de Atuação / Sede',
        countryPlaceholder: 'Selecione o seu país',
        companySize: 'Dimensão da Empresa (Total de Funcionários)',
        companySizePlaceholder: 'Selecione o número de colaboradores',
        enquiryType: 'Assunto Principal do Contacto',
        message: 'Como podemos apoiar a sua empresa?',
        messagePlaceholder: 'Descreva a estrutura da sua equipa, desafios atuais com folhas de pagamento ou RH e os seus objetivos...',
        agreeToTerms: 'Concordo em receber comunicações da NextSofthr sobre atualizações de produtos, consultoria e serviços de acordo com a Política de Privacidade.',
        termsLink: 'Política de Privacidade',
        submitButton: 'Enviar Mensagem para a NextSofthr',
        submittingButton: 'A enviar mensagem...',
        successTitle: 'Obrigado! O Seu Pedido Foi Processado com Sucesso',
        successMessage: 'Obrigado por contactar a NextSofthr. Os nossos consultores regionais receberam o seu pedido e entrarão em contacto por e-mail ou telefone dentro de 2 a 4 horas úteis.',
        resetButton: 'Enviar Outra Mensagem',
        returnToTop: 'Voltar ao Topo da Página',
      },
      dynamic: {
        payrollTitle: 'Especificações Adicionais de Folha de Pagamento',
        payrollCount: 'Número Estimado de Colaboradores na Folha',
        payrollCountries: 'Países Onde os Funcionários se Encontram',
        payrollFrequency: 'Frequência de Processamento Salarial',
        payrollFrequencyMonthly: 'Mensal',
        payrollFrequencyBiWeekly: 'Quinzenal',
        payrollFrequencyWeekly: 'Semanal',
        currentSystem: 'Sistema de Salários Atual (ex. Excel, ERP Antigo)',
        hrTitle: 'Estrutura Organizacional e de RH',
        hrEmployeesCount: 'Total Global de Colaboradores',
        hrTeamSize: 'Dimensão da Equipa de RH / Pessoal',
        mainChallenge: 'Principal Ponto Crítico a Resolver',
        enterpriseTitle: 'Especificações Corporativas Multientidade',
        locationsCount: 'Número de Filiais ou Escritórios Locais',
        operatingCountries: 'Países de Operação Transfronteiriça',
        currentErp: 'ERP ou Software de Contabilidade Atual (ex. SAP, Primavera, PHC)',
      },
      sidebar: {
        directCallTitle: 'Prefere falar imediatamente?',
        directCallSubtitle: 'Ligue diretamente para a nossa linha de atendimento durante o horário de expediente.',
        emailTeamTitle: 'Caixas de Correio Dedicadas',
        hoursTitle: 'Horário de Funcionamento',
        hoursSubtitle: 'Segunda – Sexta: 08:00 – 18:00 (Fuso horário Luanda, Maputo & GMT+1)',
        securityTitle: 'Segurança de Nível Empresarial',
        securitySubtitle: 'Conformidade com padrões internacionais de proteção de dados e soberania da informação.',
      },
    },
    contactInfo: {
      badge: 'ALCANCE GLOBAL & SEDES',
      title: 'A Nossa Presença Panafricana & Internacional',
      subtitle: 'Conecte-se com especialistas locais de recursos humanos em África e nos nossos centros de coordenação internacionais.',
      hubLagos: 'Sede Regional África Ocidental (Lagos, Nigéria)',
      hubNairobi: 'Sede Regional África Oriental (Nairóbi, Quénia)',
      hubLondon: 'Coordenação Europeia & Global (Londres, Reino Unido)',
      hubJohannesburg: 'Operações África Austral (Joanesburgo, África do Sul)',
      generalTitle: 'Operações Gerais',
      salesTitle: 'Direção Comercial e Vendas',
      supportTitle: 'Sucesso do Cliente e Helpdesk',
      partnershipsTitle: 'Alianças Estratégicas e Integrações',
      hoursWeekday: 'Segunda – Sexta: 08:00 – 18:00 WAT / CAT',
      hoursSaturday: 'Sábado: 09:00 – 14:00 (Piquete de Urgências)',
      hoursSunday: 'Domingo: Encerrado (Plataforma online ativa 24/7)',
      responsePromise: 'Tempo de resposta garantido de 2 a 4 horas úteis para empresas.',
    },
    global: {
      badge: 'PRESENÇA PANAFRICANA & GLOBAL',
      title: 'Desenvolvido para Negócios Africanos Transfronteiriços',
      subtitle: 'Operação fluida em mais de 14 polos estratégicos com suporte nativo multimoeda e conformidade fiscal.',
      allHubs: 'Todos os Polos',
      africanHubs: 'Polos em África',
      globalHubs: 'Polos Internacionais',
      hubsCount: '14+ Polos Ativos',
      activeCountries: '12+ Países Cobertos',
      supportedCurrencies: '20+ Moedas Suportadas',
      uptimeSla: '99,98% Disponibilidade',
      nodeLiveLabel: 'Polo Operacional',
    },
    whyContact: {
      badge: 'PORQUÊ A NEXTSOFTHR',
      title: 'Porque as Empresas Escolhem a NextSofthr',
      subtitle: 'Quer esteja a transitar de folhas de cálculo manuais ou a substituir um software legado, os nossos especialistas acompanham cada etapa.',
      items: {
        consultation: {
          title: 'Consultoria Estratégica Personalizada',
          description: 'Obtenha orientação prática ajustada à dimensão da sua equipa, regimes fiscais locais e realidade do mercado.',
        },
        demo: {
          title: 'Demonstração Interativa à Medida',
          description: 'Experimente painéis dinâmicos em tempo real, fluxos de aprovação multinível e o portal de autoatendimento do colaborador.',
        },
        implementation: {
          title: 'Migração de Dados e Integração Sem Falhas',
          description: 'Transfira históricos de ponto biométrico, folhas salariais passadas e cadastros sem qualquer paragem no processamento de salários.',
        },
        payroll: {
          title: 'Processamento Salarial & Conformidade Fiscal',
          description: 'Elimine erros manuais de cálculo e assegure a total conformidade com impostos (IRT, Segurança Social, fundos de pensões).',
        },
        technology: {
          title: 'Tecnologia de RH & Automação Inteligente',
          description: 'Aproveite a digitalização inteligente de documentos, análises de desempenho e gestão automatizada de férias.',
        },
        enterprise: {
          title: 'Arquitetura Multientidade Escalável',
          description: 'Supervisione equipas em múltiplas subsidiárias com consolidação financeira rigorosa e controlo estrito de acessos.',
        },
      },
    },
    aiAssistant: {
      badge: 'DIAGNÓSTICO INTELIGENTE',
      title: 'Consultor de RH Interativo com IA',
      subtitle: 'Pergunte ao nosso assistente inteligente para identificar os gargalos da sua operação e preencher o formulário com dados precisos.',
      botRole: 'Especialista em Gestão de Pessoas NextSofthr',
      statusOnline: 'Disponível Online',
      quickPromptsLabel: 'Tópicos Frequentes:',
      inputPlaceholder: 'Pergunte sobre salários em vários países, relógio de ponto ou planos...',
      sendButton: 'Perguntar',
      applyAdviceButton: 'Aplicar ao Formulário',
      defaultGreeting: 'Olá! Sou o consultor virtual da NextSofthr. Que área dos recursos humanos ou da folha de pagamento gostaria de otimizar hoje?',
      prompts: {
        payroll: 'Como funciona o processamento salarial multipaís e cumprimento fiscal em África?',
        remoteTeam: 'Podemos gerir colaboradores em teletrabalho com registo de ponto por telemóvel e GPS?',
        enterprise: 'Como a NextSofthr apoia a consolidação de grupos com múltiplas subsidiárias?',
        pricing: 'Quais são os planos e preços para PMEs e grandes empresas?',
      },
    },
    challenges: {
      badge: 'ELIMINAÇÃO DE GARGALOS',
      title: 'Desafios Operacionais que Resolvemos Todos os Dias',
      subtitle: 'Clique em qualquer desafio abaixo para carregar a solução comprovada diretamente no seu formulário.',
      solveWithNextSofthr: 'Resolver com a NextSofthr',
      items: {
        c1: {
          question: 'Documentos de funcionários dispersos e processos manuais em papel?',
          solution: 'Centralize ficheiros digitais de pessoal, contratos de trabalho e contactos de emergência sem papelada.',
        },
        c2: {
          question: 'Cálculos de salários complexos com riscos de erros fiscais e sociais?',
          solution: 'Emissão de salários com um único clique com aplicação automática das tabelas de impostos e segurança social.',
        },
        c3: {
          question: 'Disputas de assiduidade, fraudes de ponto e horas extras descontroladas?',
          solution: 'Relógio biométrico integrado, geolocalização por telemóvel e validação transparente de horas extraordinárias.',
        },
        c4: {
          question: 'Aprovações caóticas de férias e falta de visibilidade da equipa?',
          solution: 'Cálculo automático de saldos de férias, fluxos hierárquicos de aprovação e calendário partilhado em tempo real.',
        },
        c5: {
          question: 'Avaliações de desempenho sem metas claras nem acompanhamento?',
          solution: 'Avaliação 360 contínua, OKRs trimestrais e matriz de competências associadas a incentivos de mérito.',
        },
        c6: {
          question: 'Gestão de equipas internacionais com diferentes moedas e tributações?',
          solution: 'Governação multientidade que permite pagar salários em AOA, MZN, NGN, ZAR, USD e EUR sem complicações.',
        },
      },
    },
    video: {
      badge: 'VISÃO GERAL DO SISTEMA',
      title: 'Veja a Experiência NextSofthr em Ação',
      subtitle: 'Conheça a plataforma intuitiva que moderniza salários, controlo de assiduidade e gestão de talento para empresas em África.',
      videoDuration: 'Resumo de 3 Minutos',
      previewTag: 'Demonstração da Plataforma NextSofthr',
      playVideo: 'Assistir ao Vídeo',
      feature1Title: 'Portal do Colaborador',
      feature1Desc: 'Os colaboradores pedem férias, visualizam recibos de vencimento e submetem despesas pelo telemóvel.',
      feature2Title: 'Conformidade Fiscal Automática',
      feature2Desc: 'Mapas de impostos e deduções previdenciárias automatizadas para mais de 12 jurisdições em África.',
      feature3Title: 'Canais de Pagamento Multimoeda',
      feature3Desc: 'Pague colaboradores locais e internacionais através de transferências bancárias e pagamentos móveis.',
      scheduleWalkthrough: 'Agendar Demonstração Guiada Personalizada',
    },
    faq: {
      badge: 'PERGUNTAS FREQUENTES',
      title: 'Respostas Transparentes para as Suas Dúvidas',
      subtitle: 'Tudo o que precisa de saber sobre o processo de adesão, segurança de dados e capacidades locais da NextSofthr.',
      moreQuestionsTitle: 'Tem alguma dúvida que não esteja aqui?',
      moreQuestionsDesc: 'Os nossos especialistas estão à disposição para analisar detalhadamente o caso da sua organização.',
      contactSupportBtn: 'Falar com um Especialista',
      items: [
        {
          q: 'Quanto tempo demora a implementação da NextSofthr na nossa empresa?',
          a: 'A maior parte das PMEs começa a operar em 48 a 72 horas. Para grandes corporações com migração de dados complexa entre várias subsidiárias, a nossa equipa especializada conclui o processo entre 7 a 14 dias úteis, sem interrupção nos salários.',
        },
        {
          q: 'A NextSofthr cumpre as leis laborais e fiscais dos países africanos?',
          a: 'Sim! A NextSofthr está calibrada com as fórmulas legais e fiscais oficiais para Angola (IRT, Segurança Social), Moçambique (IRPS, INSS), Cabo Verde, Nigéria, Quénia, Gana, África do Sul e restantes economias da região.',
        },
        {
          q: 'A plataforma permite processar folhas de pagamento em várias moedas?',
          a: 'Sim, com total flexibilidade. Pode manter contratos e emitir pagamentos tanto em moedas locais (Kwanza AOA, Metical MZN, NGN, KES, ZAR) como em divisas internacionais (USD, EUR, GBP) com histórico de conversão cambial.',
        },
        {
          q: 'Qual é o nível de segurança garantido para as informações confidenciais?',
          a: 'A segurança é prioridade absoluta: encriptação bancária AES-256 em repouso, TLS 1.3 em trânsito, gestão de permissões por perfil (RBAC), autenticação de dois fatores (2FA) e respeito integral pelas leis de proteção de dados.',
        },
        {
          q: 'A NextSofthr integra-se com relógios de ponto biométricos e sistemas de contabilidade?',
          a: 'Sim. A plataforma disponibiliza integração direta com equipamentos de marcas de topo (ZKTeco, Suprema, Hikvision) bem como APIs para sincronizar lançamentos de salários com SAP, Primavera, PHC, QuickBooks e Xero.',
        },
        {
          q: 'Que tipo de suporte técnico fornecem após a entrada em produção?',
          a: 'Todos os clientes contam com um gestor de conta regional dedicado, canal de suporte prioritário via WhatsApp, acompanhamento por bilhetes e assistência telefónica direta durante o horário de expediente.',
        },
        {
          q: 'A NextSofthr é adequada para pequenas empresas com menos de 20 funcionários?',
          a: 'Com certeza. A nossa arquitetura é modular e acompanha desde startups em fase inicial com 5 pessoas até grupos corporativos com dezenas de milhares de funcionários. Apenas paga pelos utilizadores ativos.',
        },
      ],
    },
    finalCta: {
      badge: 'COMECE HOJE',
      title: 'Pronto para Transformar a Gestão das Suas Equipas?',
      subtitle: 'Junte-se a centenas de empresas inovadoras em África e no mundo que confiam na NextSofthr para gerir pessoas e salários com total rigor.',
      bookDemoBtn: 'Agendar Demonstração ao Vivo',
      talkToSalesBtn: 'Falar com um Consultor',
      instantCallOrChat: 'Prefere um contacto imediato? Converse connosco através do WhatsApp ou por telefone.',
      noCardRequired: 'Não é necessário cartão de crédito',
      quickDeployment: 'Implementação rápida em 48 horas',
    },
    footer: {
      description: 'Plataforma unificada de gestão de Recursos Humanos, Folha de Pagamento e Negócios para empresas de todas as dimensões em África e no mercado internacional.',
      solutionsTitle: 'Soluções',
      companyTitle: 'Empresa',
      resourcesTitle: 'Recursos',
      legalTitle: 'Conformidade e Legal',
      rightsReserved: 'Todos os direitos reservados. Plataforma NextSofthr.',
      panAfricanDisclaimer: 'As operações da NextSofthr asseguram soberania de dados, conformidade com normas RGPD e regulamentos legais em todos os mercados onde atuamos.',
    },
    mobileBar: {
      talkToSales: 'Vendas',
      bookDemo: 'Agendar',
    },
    liveChat: {
      onlineSpecialist: 'Amara Okafor',
      statusAvailable: 'Online • Consultora de RH',
      chatHeadline: 'Conversar com a NextSofthr',
      chatSubhead: 'Respondemos normalmente em minutos.',
      initialMessage: 'Olá! Bem-vindo à NextSofthr. Como podemos apoiar a sua empresa na gestão de pessoas ou salários hoje?',
      replyTime: 'Tempo médio de resposta: < 3 min',
      quickOptions: {
        pricing: 'Consultar Preços e Planos',
        demo: 'Agendar Demonstração Personalizada',
        compliance: 'Conformidade Fiscal e Salarial em África',
        human: 'Falar com um Consultor Humano',
      },
      inputPlaceholder: 'Escreva a sua mensagem ou dúvida...',
      openWhatsApp: 'Conversar no WhatsApp',
      directCall: 'Ligar para Consultor',
      tooltip: 'Precisa de apoio? Fale em direto com a nossa equipa',
    },
  },

  es: {
    nav: {
      howCanWeHelp: '¿Cómo Podemos Ayudarle?',
      contactForm: 'Formulario de Contacto',
      globalNetwork: 'África & Global',
      aiAssistant: 'Asistente IA',
      whyContact: 'Por Qué Contactarnos',
      faqs: 'Preguntas Frecuentes',
      directCall: 'Llamada Directa',
      talkToSales: 'Hablar con Ventas',
      bookDemo: 'Solicitar una Demo',
      themeToggleLight: 'Cambiar a modo claro',
      themeToggleDark: 'Cambiar a modo oscuro',
      themeLabel: 'Tema',
      hubsBadge: '14+ Centros',
      newBadge: 'Nuevo',
      selectLanguage: 'Idioma',
    },
    hero: {
      eyebrow: 'CONTACTAR A NEXTSOFTHR',
      headlinePart1: 'Construyamos un',
      headlineHighlight: 'Lugar de Trabajo Inteligente',
      headlinePart2: 'Juntos',
      subtitle: '¿Tiene preguntas sobre gestión de personal, nóminas, administración de empleados u operaciones corporativas?',
      subtitleHighlight: 'Hable con el equipo de NextSofthr y descubra cómo nuestra plataforma integral ayuda a su organización a simplificar procesos, impulsar la productividad y gestionar su plantilla con máxima eficiencia.',
      ctaPrimary: 'Hablar con Nuestro Equipo',
      ctaSecondary: 'Solicitar una Demo',
      statCompliance: 'Conformidad legal y fiscal en África',
      statPayroll: 'Nómina multimoneda lista para operar',
      statScaling: 'De PYMEs a grandes corporaciones',
      floatingActiveEmployees: 'Empleados Activos en África',
      floatingAccuracyRate: '99,98% de Precisión en Nómina',
      floatingTimeSaved: '72% de Tiempo Ahorrado',
      floatingPayrollTitle: 'Nómina Panafricana & Multidivisa',
      floatingDisbursed: 'Procesada a tiempo en 12 países',
    },
    contactOptions: {
      sectionBadge: 'CANALES DE CONSULTA',
      sectionTitle: '¿Cómo Podemos Ayudarle Hoy?',
      sectionSubtitle: 'Seleccione el área de asistencia que mejor responda a las necesidades inmediatas de su empresa.',
      cards: {
        sales: {
          title: 'Ventas',
          headline: 'Hablar con Ventas',
          description: 'Descubra cómo NextSofthr se adapta al tamaño de su equipo, presupuesto y objetivos de crecimiento.',
          cta: 'Contactar a Ventas',
          badge: 'Respuesta Rápida',
        },
        demo: {
          title: 'Demostración de Producto',
          headline: 'Vea NextSofthr en Acción',
          description: 'Agende una demostración personalizada adaptada a los flujos operativos de su sector.',
          cta: 'Solicitar Demo',
          badge: 'Interactivo',
        },
        support: {
          title: 'Atención al Cliente',
          headline: '¿Necesita Soporte?',
          description: '¿Ya es usuario de NextSofthr? Nuestro servicio regional de atención está listo para asistirle.',
          cta: 'Obtener Soporte',
        },
        partnerships: {
          title: 'Alianzas y Partners',
          headline: 'Sea Nuestro Socio',
          description: 'Únase a NextSofthr para modernizar la gestión de RRHH, el cumplimiento y las nóminas en África.',
          cta: 'Hacerse Partner',
        },
        enterprise: {
          title: 'Grandes Empresas',
          headline: 'Soluciones Corporativas',
          description: '¿Requiere una infraestructura multientidad para grandes organizaciones con equipos distribuidos?',
          cta: 'Contactar Especialistas',
          badge: 'Arquitectura a Medida',
        },
        general: {
          title: 'Consultas Generales',
          headline: 'Información General',
          description: '¿Tiene una consulta de prensa, sugerencia u oportunidad comercial para nuestros fundadores?',
          cta: 'Enviar Mensaje',
        },
      },
    },
    form: {
      badge: 'PORTAL DE CONTACTO DIRECTO',
      title: 'Póngase en Contacto con Nuestros Especialistas',
      subtitle: 'Complete el siguiente formulario y un consultor de recursos humanos se comunicará con usted en un plazo de 2 a 4 horas hábiles.',
      activeCategoryLabel: 'Categoría de Consulta Seleccionada',
      fields: {
        firstName: 'Nombre',
        firstNamePlaceholder: 'ej. Carlos',
        lastName: 'Apellidos',
        lastNamePlaceholder: 'ej. Obiang',
        workEmail: 'Correo Electrónico Corporativo',
        workEmailPlaceholder: 'nombre@empresa.com',
        phone: 'Teléfono de Contacto (con código de país)',
        phonePlaceholder: '+240 222 000 000',
        companyName: 'Nombre de la Empresa u Organización',
        companyNamePlaceholder: 'ej. Malabo Tech Enterprises SL',
        country: 'País de Operación / Sede Central',
        countryPlaceholder: 'Seleccione su país',
        companySize: 'Tamaño de la Empresa (Número de Empleados)',
        companySizePlaceholder: 'Seleccione el rango de empleados',
        enquiryType: 'Asunto Principal de su Consulta',
        message: '¿Cómo podemos ayudar a su organización?',
        messagePlaceholder: 'Cuéntenos sobre su equipo, desafíos actuales con nóminas o RRHH y qué metas desea alcanzar...',
        agreeToTerms: 'Acepto recibir comunicaciones de NextSofthr sobre novedades de producto, asesoramiento y servicios conforme a la Política de Privacidad.',
        termsLink: 'Política de Privacidad',
        submitButton: 'Enviar Mensaje a NextSofthr',
        submittingButton: 'Enviando mensaje...',
        successTitle: '¡Muchas Gracias! Su Solicitud Ha Sido Procesada con Éxito',
        successMessage: 'Gracias por ponerse en contacto con NextSofthr. Nuestros asesores regionales han recibido su solicitud y le contactarán por correo o teléfono en un plazo de 2 a 4 horas laborables.',
        resetButton: 'Enviar Otra Consulta',
        returnToTop: 'Volver al Inicio de la Página',
      },
      dynamic: {
        payrollTitle: 'Especificaciones Adicionales de Nómina',
        payrollCount: 'Número Estimado de Empleados en Nómina',
        payrollCountries: 'Países Donde se Encuentran sus Empleados',
        payrollFrequency: 'Frecuencia de Pago de Salarios',
        payrollFrequencyMonthly: 'Mensual',
        payrollFrequencyBiWeekly: 'Quincenal',
        payrollFrequencyWeekly: 'Semanal',
        currentSystem: 'Herramienta de Nómina Actual (ej. Excel, ERP Clásico)',
        hrTitle: 'Estructura Organizacional y de RRHH',
        hrEmployeesCount: 'Plantilla Total de la Organización',
        hrTeamSize: 'Tamaño del Equipo de RRHH / Personal',
        mainChallenge: 'Principal Reto Operativo a Resolver',
        enterpriseTitle: 'Especificaciones Corporativas Multientidad',
        locationsCount: 'Número de Filiales u Oficinas Operativas',
        operatingCountries: 'Países de Operación Transfronteriza',
        currentErp: 'ERP o Software Contable Actual (ej. SAP, QuickBooks, Navision)',
      },
      sidebar: {
        directCallTitle: '¿Prefiere hablar de inmediato?',
        directCallSubtitle: 'Llame a nuestra línea directa de asesoramiento durante el horario comercial.',
        emailTeamTitle: 'Buzones de Correo Dedicados',
        hoursTitle: 'Horario de Atención',
        hoursSubtitle: 'Lunes – Viernes: 08:00 – 18:00 (Zona Horaria GMT+1 / WAT)',
        securityTitle: 'Seguridad de Grado Corporativo',
        securitySubtitle: 'Cumplimiento riguroso de normativas internacionales de protección de datos y privacidad.',
      },
    },
    contactInfo: {
      badge: 'ALCANCE INTERNACIONAL & SEDES',
      title: 'Nuestra Presencia Panafricana & Global',
      subtitle: 'Conecte con asesores locales de recursos humanos en toda África y en nuestros centros de coordinación internacional.',
      hubLagos: 'Sede Regional África Occidental (Lagos, Nigeria)',
      hubNairobi: 'Sede Regional África Oriental (Nairobi, Kenia)',
      hubLondon: 'Coordinación Europea y Global (Londres, Reino Unido)',
      hubJohannesburg: 'Operaciones África Austral (Johannesburgo, Sudáfrica)',
      generalTitle: 'Operaciones Generales',
      salesTitle: 'Dirección Comercial y Ventas',
      supportTitle: 'Atención al Cliente y Soporte',
      partnershipsTitle: 'Alianzas Estratégicas e Integraciones',
      hoursWeekday: 'Lunes – Viernes: 08:00 – 18:00 WAT / GMT+1',
      hoursSaturday: 'Sábado: 09:00 – 14:00 (Guardia de Emergencias)',
      hoursSunday: 'Domingo: Cerrado (Portal web activo 24/7)',
      responsePromise: 'Compromiso de respuesta garantizado de 2 a 4 horas hábiles.',
    },
    global: {
      badge: 'HUELLA PANAFRICANA Y GLOBAL',
      title: 'Diseñado para Empresas Africanas Transfronterizas',
      subtitle: 'Operación continua en más de 14 centros comerciales con soporte nativo multimoneda y cumplimiento legal.',
      allHubs: 'Todos los Centros',
      africanHubs: 'Centros en África',
      globalHubs: 'Centros Internacionales',
      hubsCount: '14+ Centros Activos',
      activeCountries: '12+ Países Cubiertos',
      supportedCurrencies: '20+ Monedas Compatibles',
      uptimeSla: '99,98% Disponibilidad Garantizada',
      nodeLiveLabel: 'Centro Operativo',
    },
    whyContact: {
      badge: 'POR QUÉ NEXTSOFTHR',
      title: 'Por Qué las Empresas Eligen Consultar con NextSofthr',
      subtitle: 'Tanto si migra de hojas de cálculo manuales como si renueva un software obsoleto, nuestros consultores le guiarán en cada fase.',
      items: {
        consultation: {
          title: 'Asesoramiento Estratégico Personalizado',
          description: 'Reciba orientación práctica adecuada al tamaño de su empresa, normativas fiscales locales y contexto real.',
        },
        demo: {
          title: 'Demostración Práctica Adaptada a su Sector',
          description: 'Explore paneles interactivos en tiempo real, flujos de aprobación y el portal de autoservicio del empleado.',
        },
        implementation: {
          title: 'Migración de Datos y Despliegue sin Fricciones',
          description: 'Transfiera registros de fichajes biométricos, nóminas históricas y expedientes de empleados sin pausas en pagos.',
        },
        payroll: {
          title: 'Nómina Panafricana y Cumplimiento Normativo',
          description: 'Evite errores de cálculo y asegure el cumplimiento total de retenciones fiscales y aportes a la seguridad social.',
        },
        technology: {
          title: 'Tecnología de RRHH Moderna y Automatización con IA',
          description: 'Aproveche el escaneo inteligente de documentos, analítica de desempeño y gestión automática de vacaciones.',
        },
        enterprise: {
          title: 'Arquitectura Multientidad Escalable',
          description: 'Gestione equipos en múltiples filiales con consolidación financiera y permisos de acceso basados en roles.',
        },
      },
    },
    aiAssistant: {
      badge: 'DESCUBRIMIENTO INTELIGENTE',
      title: 'Asesor de RRHH Interactivo con IA',
      subtitle: 'Consulte a nuestro asistente inteligente para analizar sus desafíos operativos y rellenar su consulta con contexto útil.',
      botRole: 'Especialista en Asesoría de Personal NextSofthr',
      statusOnline: 'Disponible en Línea',
      quickPromptsLabel: 'Preguntas Frecuentes:',
      inputPlaceholder: 'Pregunte sobre nómina multipaís, control biométrico o planes de precios...',
      sendButton: 'Consultar',
      applyAdviceButton: 'Aplicar al Formulario',
      defaultGreeting: '¡Hola! Soy el asesor de recursos humanos de NextSofthr. ¿Qué área de su gestión de personal o nóminas desea optimizar hoy?',
      prompts: {
        payroll: '¿Cómo gestionan la nómina multipaís y los impuestos en diferentes países de África?',
        remoteTeam: '¿Se puede controlar la asistencia de empleados en remoto mediante móvil y geolocalización?',
        enterprise: '¿Cómo apoya NextSofthr la consolidación de grupos empresariales con filiales?',
        pricing: '¿Cuáles son las tarifas para pequeñas empresas frente a grandes corporaciones?',
      },
    },
    challenges: {
      badge: 'SUPERACIÓN DE CUELLOS DE BOTELLA',
      title: 'Desafíos Laborales Cotidianos que Resolvemos Cada Día',
      subtitle: 'Haga clic en cualquiera de los retos para cargar la solución comprobada en su formulario de contacto.',
      solveWithNextSofthr: 'Resolver con NextSofthr',
      items: {
        c1: {
          question: '¿Expedientes de empleados desorganizados y exceso de papeleo?',
          solution: 'Centralice contratos, documentos de identificación y datos de emergencia en formato digital sin acumular papel.',
        },
        c2: {
          question: '¿Cálculos de nómina complejos con riesgo de errores tributarios?',
          solution: 'Procesamiento de nómina multimoneda en un clic con aplicación automática de tablas fiscales y de previsión.',
        },
        c3: {
          question: '¿Disputas sobre asistencia, fichajes fraudulentos y horas perdidas?',
          solution: 'Fichaje biométrico sincronizado, geovallas GPS en móviles y validación automática de horas extraordinarias.',
        },
        c4: {
          question: '¿Gestión caótica de vacaciones y falta de previsión de ausencias?',
          solution: 'Cálculo automatizado de saldos, circuitos de aprobación jerárquica y calendario compartido de equipo en tiempo real.',
        },
        c5: {
          question: '¿Evaluaciones de desempeño anuales sin metas medibles ni seguimiento?',
          solution: 'Evaluación 360 continua, OKRs trimestrales y seguimiento de competencias vinculado a planes de incentivos.',
        },
        c6: {
          question: '¿Gestión de equipos internacionales con distintas monedas y normativas?',
          solution: 'Gobernanza multientidad que le permite remunerar a sus equipos en XAF, XOF, NGN, KES, USD y EUR con total transparencia.',
        },
      },
    },
    video: {
      badge: 'VISIÓN GENERAL',
      title: 'Compruebe la Experiencia NextSofthr en Acción',
      subtitle: 'Conozca la plataforma intuitiva que moderniza nóminas, control horario y gestión del talento en empresas de África.',
      videoDuration: 'Resumen de 3 Minutos',
      previewTag: 'Demostración de la Plataforma NextSofthr',
      playVideo: 'Ver Demostración',
      feature1Title: 'Portal del Empleado Intuitivo',
      feature1Desc: 'Los empleados solicitan vacaciones, revisan recibos de sueldo y justifican gastos desde el móvil.',
      feature2Title: 'Cumplimiento Fiscal Automatizado',
      feature2Desc: 'Liquidación automática de impuestos y cargas sociales configurada para más de 12 países en África.',
      feature3Title: 'Pasarelas de Pago Multidivisa',
      feature3Desc: 'Pague al personal local e internacional mediante transferencias bancarias directas y dinero móvil.',
      scheduleWalkthrough: 'Agendar una Demostración Guiada Personalizada',
    },
    faq: {
      badge: 'PREGUNTAS FRECUENTES',
      title: 'Respuestas Claras a sus Dudas',
      subtitle: 'Todo lo que necesita saber sobre el despliegue, la seguridad de datos y las funciones locales de NextSofthr.',
      moreQuestionsTitle: '¿Tiene alguna pregunta no respondida aquí?',
      moreQuestionsDesc: 'Nuestros consultores están disponibles para analizar los requisitos concretos de su organización.',
      contactSupportBtn: 'Consultar con un Experto',
      items: [
        {
          q: '¿Cuánto tiempo lleva poner en marcha NextSofthr en nuestra empresa?',
          a: 'La mayoría de pequeñas y medianas empresas están operativas en 48 a 72 horas. Para grandes corporaciones con migración compleja entre filiales, nuestro equipo especializado completa la transición en 7 a 14 días laborables sin interrumpir pagos.',
        },
        {
          q: '¿NextSofthr cumple con las leyes laborales y fiscales locales de los países africanos?',
          a: '¡Sí! NextSofthr incorpora los esquemas normativos y fórmulas oficiales para Nigeria, Kenia, Ghana, Sudáfrica, Guinea Ecuatorial, Senegal, Costa de Marfil, Camerún y las principales economías de la región.',
        },
        {
          q: '¿La plataforma permite procesar salarios en varias monedas?',
          a: 'Por supuesto. Puede formalizar contratos y abonar retribuciones tanto en monedas locales (FCFA, NGN, KES, GHS, ZAR) como en divisas globales (USD, EUR, GBP) con historial de tipos de cambio.',
        },
        {
          q: '¿Qué nivel de seguridad y privacidad tienen los datos de nuestra plantilla?',
          a: 'La seguridad es el pilar de nuestra infraestructura: cifrado bancario AES-256 en reposo, TLS 1.3 en tránsito, control de acceso por roles (RBAC), verificación en dos pasos (2FA) y pleno cumplimiento de regulaciones de protección de datos.',
        },
        {
          q: '¿Puede NextSofthr integrarse con nuestros terminales biométricos y ERP contable?',
          a: 'Sí. Disponemos de integración nativa con los principales fabricantes biométricos (ZKTeco, Suprema, Hikvision) y APIs para sincronizar asientos de salarios con SAP, QuickBooks, Sage y Xero.',
        },
        {
          q: '¿Qué tipo de asistencia técnica brindan después de la puesta en marcha?',
          a: 'Todos los clientes cuentan con un gestor regional asignado, canal prioritario en WhatsApp, gestión de incidencias por tickets y atención telefónica durante el horario laboral.',
        },
        {
          q: '¿NextSofthr es apto para empresas pequeñas con menos de 20 trabajadores?',
          a: 'Absolutamente. Nuestra plataforma es escalable y se adapta desde startups con 5 personas hasta conglomerados con decenas de miles de empleados. Únicamente abona los usuarios activos.',
        },
      ],
    },
    finalCta: {
      badge: 'COMIENCE HOY',
      title: '¿Listo para Modernizar la Gestión de sus Equipos?',
      subtitle: 'Súmese a cientos de organizaciones vanguardistas en África y el mundo que confían en NextSofthr para dirigir su talento y nóminas.',
      bookDemoBtn: 'Reservar Demo en Directo',
      talkToSalesBtn: 'Hablar con un Consultor',
      instantCallOrChat: '¿Prefiere contacto instantáneo? Escríbanos por WhatsApp o llámenos.',
      noCardRequired: 'No requiere tarjeta de crédito',
      quickDeployment: 'Puesta en marcha en 48 horas',
    },
    footer: {
      description: 'Plataforma integral de gestión de Recursos Humanos, Nómina y Administración Empresarial diseñada para empresas de cualquier escala en África y a nivel internacional.',
      solutionsTitle: 'Soluciones',
      companyTitle: 'Compañía',
      resourcesTitle: 'Recursos',
      legalTitle: 'Conformidad y Legal',
      rightsReserved: 'Todos los derechos reservados. Plataforma NextSofthr.',
      panAfricanDisclaimer: 'Las operaciones de NextSofthr salvaguardan la soberanía de los datos y cumplen con los estándares de protección y regulaciones legales en todos los países donde operamos.',
    },
    mobileBar: {
      talkToSales: 'Ventas',
      bookDemo: 'Pedir Demo',
    },
    liveChat: {
      onlineSpecialist: 'Amara Okafor',
      statusAvailable: 'En línea • Asesora de RRHH',
      chatHeadline: 'Chat con NextSofthr',
      chatSubhead: 'Solemos responder en pocos minutos.',
      initialMessage: '¡Hola! Le damos la bienvenida a NextSofthr. ¿En qué podemos ayudarle hoy con la gestión de su plantilla o nómina?',
      replyTime: 'Tiempo medio de respuesta: < 3 min',
      quickOptions: {
        pricing: 'Consultar Tarifas y Planes',
        demo: 'Solicitar Demostración Guiada',
        compliance: 'Cumplimiento Fiscal y Nómina en África',
        human: 'Hablar con un Asesor Humano',
      },
      inputPlaceholder: 'Escriba su mensaje o consulta...',
      openWhatsApp: 'Chatear por WhatsApp',
      directCall: 'Llamar a Asesor',
      tooltip: '¿Necesita ayuda? Chatee en vivo con nuestro equipo',
    },
  },
};
