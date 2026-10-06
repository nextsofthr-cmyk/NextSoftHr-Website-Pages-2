export type Language = 'en' | 'fr' | 'ar';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  regionFocus: string;
  keyHubs: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    direction: 'ltr',
    regionFocus: 'Global & Anglophone Africa',
    keyHubs: 'Lagos • Nairobi • Accra • Johannesburg • London',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
    regionFocus: 'Afrique Francophone & Monde',
    keyHubs: 'Abidjan • Dakar • Douala • Kinshasa • Paris',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    direction: 'rtl',
    regionFocus: 'شمال إفريقيا والشرق الأوسط',
    keyHubs: 'القاهرة • الدار البيضاء • تونس • الجزائر • دبي',
  },
];

export const translations = {
  en: {
    // Navigation
    nav: {
      program: 'Partner Program',
      benefits: 'Benefits',
      commission: 'Commission',
      howItWorks: 'How It Works',
      ecosystem: 'Ecosystem',
      aiPlatform: 'AI Platform',
      network: 'Network',
      resources: 'Resources',
      faq: 'FAQ',
      portal: 'Partner Portal',
      applyNow: 'Become a Partner',
      quickApply: 'Apply Now',
      hotline: '+234 915 848 2622',
      hotlineTitle: 'Call NextSofthr Partner Desk',
      brandSubtitle: 'HR & Payroll Ecosystem',
      partnerBadge: 'PARTNER',
      themeLight: 'Switch to Light Palette',
      themeDark: 'Switch to Deep Navy/Charcoal',
      langSwitcher: 'Language',
      selectLang: 'Select Regional Market Language',
      activeBadge: 'ACTIVE',
      globalAfricanFocus: 'Global & Pan-African Focus',
    },

    // Hero Section
    hero: {
      badge: 'Official Channel Partner Program',
      commissionBadge: 'Up to 40% Recurring',
      titlePart1: 'Partner With',
      titleBrand: 'NextSofthr',
      titlePart2: 'Grow Your Business.',
      titlePart3: 'Earn Recurring Revenue.',
      subtitle:
        'Join the NextSofthr Partner Network and help businesses across Africa and around the world transform HR, payroll and business management while building a new recurring revenue stream for your organization.',
      ctaApply: 'Become a Partner',
      ctaExplore: 'Explore Partner Program',
      stat1Value: '15%–40%',
      stat1Label: 'Monthly Commission',
      stat2Value: '24+',
      stat2Label: 'Eligible Partner Types',
      stat3Value: '16 Modules',
      stat3Label: 'All-in-One Cloud HR',
      stat4Value: '0 NGN / $0',
      stat4Label: 'Free Partner Sign-up',
      philosophyTitle: 'Partner Philosophy',
      philosophyValue: 'Build. Sell. Grow. Earn.',
      photoTag: 'HR & Financial Consultants in Session',
      photoHubs: 'Lagos • Nairobi • Global',
      valueCycleTag: 'VALUE CYCLE',
      valueCycleSub: 'Automated Recurring Revenue',
      stepPartnership: 'Partnership',
      stepCustomers: 'Customers',
      stepRevenue: 'Revenue',
      stepGrowth: 'Scale Growth',
      dashHubTitle: 'NextSofthr Payroll & Attendance Hub',
      dashSyncBadge: 'LIVE SYNC',
      dashPayRun: 'Current Pay Run',
      dashPayRunValue: '1,420 Staff',
      dashPayRunNote: '100% Tax Compliant',
      dashAiInsights: 'AI HR Insights',
      dashAiValue: '99.8% Accuracy',
      dashAiNote: 'Audit Ready',
      dashPartnerShare: 'Partner Share',
      dashPartnerValue: '₦1,850,000 / mo',
      dashPartnerNote: 'Recurring',
      dashFooterText: 'Serving SMEs & Multinationals across Africa & Worldwide',
    },

    // Trust Strip
    trust: {
      card1Title: 'Recurring Revenue',
      card1Desc: 'Build an ongoing revenue stream by bringing businesses onto NextSofthr.',
      card1Stat: 'Up to 40%',
      card2Title: 'Global Opportunity',
      card2Desc: 'Serve businesses across Africa and international markets.',
      card2Stat: 'Pan-Africa & Global',
      card3Title: 'Powerful SaaS Platform',
      card3Desc: 'Offer customers modern HR, payroll and business management technology.',
      card3Stat: '16 Integrated Apps',
      card4Title: 'Partner Growth Support',
      card4Desc: 'Get resources, training, sales enablement and marketing support.',
      card4Stat: 'Dedicated Desk',
    },

    // Why Partner
    why: {
      tag: 'WHY PARTNER WITH NEXTSOFTHR',
      titleMain: 'More Than a Partnership.',
      titleGradient: 'Build a New Revenue Stream.',
      subtitle:
        'Combine your existing professional relationships, consulting expertise or technology services with a modern HR, payroll, and business management platform designed for rapid customer adoption and sustained recurring cash flow.',
      card1Title: 'Recurring Commission',
      card1Desc: 'Earn recurring commission from eligible customer subscriptions according to your partner tier.',
      card1Highlight: 'Up to 40% every cycle',
      card2Title: 'Powerful HR & Payroll Platform',
      card2Desc: 'Give customers access to HR, payroll and business management tools from one platform.',
      card2Highlight: '16 connected modules',
      card3Title: 'AI-Powered Assistance',
      card3Desc: 'Help customers leverage modern AI assistance for HR, payroll and workforce management workflows.',
      card3Highlight: 'Generative HR & Analytics',
      card4Title: 'Sales & Marketing Support',
      card4Desc: 'Provide partners with sales resources, promotional materials, product demonstrations and campaign support.',
      card4Highlight: 'Co-marketing & collateral',
      card5Title: 'Partner Training',
      card5Desc: 'Access product education and partner enablement resources to confidently demonstrate and sell NextSofthr.',
      card5Highlight: 'Certified partner courses',
      card6Title: 'Customer Success Support',
      card6Desc: 'Work with the NextSofthr team to help customers onboard, adopt and grow with the platform.',
      card6Highlight: 'Dedicated implementation',
      bannerTitle: 'Ready to monetize your professional business network?',
      bannerSubtitle: 'Apply in 3 minutes. Zero license fees. Immediate access to partner onboarding.',
      bannerBtn: 'Start Your Application',
    },

    // Partner Categories
    categories: {
      tag: 'PARTNER PROFILES & CLASSIFICATIONS',
      title: 'Built for Diverse Professional Advisors & Tech Firms',
      subtitle:
        'Whether you provide human capital advisory, implement ERP solutions, manage outsourced payroll or audit financial records, NextSofthr elevates your service offering with recurring margins.',
      tabAll: 'All Profiles',
      tabHR: 'HR & People Advisory',
      tabFinance: 'Finance, Tax & Audit',
      tabTech: 'Tech & System Integrators',
      tabBusiness: 'Business Centers & Accelerators',
      bestFitLabel: 'Best Suited For',
      expectedTier: 'Target Tier',
      applyForCategory: 'Apply as',
    },

    // Commission Tiers
    commission: {
      tag: 'TRANSPARENT REVENUE SHARE',
      title: 'Four Clear Tiers. Predictable Monthly Payouts.',
      subtitle:
        'Earn compounding recurring commissions paid out monthly directly to your designated bank account in NGN, USD, GBP, EUR or West/Central African FCFA.',
      calculatorTitle: 'Interactive Commission Calculator',
      calculatorSub: 'Simulate your recurring earnings based on monthly client subscriptions and headcount.',
      clientsSliderLabel: 'Active Managed Clients',
      avgEmployeesLabel: 'Average Employees per Client',
      estimatedMonthlyRevenue: 'Estimated Monthly Commission',
      estimatedAnnualRevenue: 'Estimated Annualized Commission',
      tierBronze: 'Bronze (15%)',
      tierSilver: 'Silver (20%)',
      tierGold: 'Gold (30%)',
      tierPlatinum: 'Platinum (40%)',
      startAtTier: 'Start at this tier',
      popularBadge: 'MOST POPULAR',
    },

    // How It Works
    how: {
      tag: 'THE PARTNER JOURNEY',
      title: 'Simple 4-Step Path to Recurring Income',
      subtitle: 'From initial registration to launching your first enterprise customer on NextSofthr.',
      step1Title: '1. Fast Online Application',
      step1Desc: 'Complete our simple 3-minute form specifying your organization profile, primary geography, and client focus.',
      step2Title: '2. Certification & Enablement',
      step2Desc: 'Access the Partner Portal, complete on-demand platform training, and receive certified partner badges and pitch collateral.',
      step3Title: '3. Introduce & Implement',
      step3Desc: 'Introduce prospects using your unique partner link or work with our solutions engineering team for customized client demos.',
      step4Title: '4. Monthly Compounding Payouts',
      step4Desc: 'Track subscriptions live in your portal dashboard and receive transparent recurring payouts every single month.',
      ctaText: 'Ready to take Step 1?',
      ctaBtn: 'Complete Partner Application',
    },

    // Partner Portal
    portal: {
      tag: 'NEXTSOFTHR PARTNER OS',
      title: 'A Dedicated Dashboard Built for Channel Growth',
      subtitle: 'Real-time visibility into deal registration, commission pipelines, client lifecycle metrics, and marketing assets.',
      overviewTab: 'Overview',
      pipelineTab: 'Deal Pipeline',
      commissionsTab: 'Earnings & Payouts',
      assetsTab: 'Marketing Collateral',
      demoLoginNotice: 'Live interactive preview of the NextSofthr Partner Cloud interface.',
      openPortalBtn: 'Launch Partner Portal',
    },

    // Partner Benefits
    benefits: {
      tag: 'PARTNER ADVANTAGE',
      title: 'Comprehensive Enablement at Every Level',
      subtitle: 'We provide the commercial, technical, and operational backing you need to successfully advise and retain customers.',
      commercialTab: 'Commercial Incentives',
      technicalTab: 'Platform & Product',
      marketingTab: 'Marketing & Co-Selling',
      supportTab: 'Dedicated Support',
    },

    // Product Ecosystem
    ecosystem: {
      tag: 'UNIFIED CLOUD SUITE',
      title: '16 Integrated HR, Payroll & Business Apps',
      subtitle: 'A single, cohesive platform that replaces fragmented legacy software and manual spreadsheets for your clients.',
      exploreModules: 'Explore All Modules',
    },

    // AI Platform
    ai: {
      tag: 'INTELLIGENT WORKFORCE TECH',
      title: 'Powered by Purpose-Built Enterprise HR AI',
      subtitle: 'Provide your clients with autonomous payroll error detection, natural language workforce analytics, and smart compliance checks.',
      feature1: 'Autonomous Payroll Reconciliation',
      feature2: 'Predictive Employee Retention Analytics',
      feature3: 'Multi-Country Statutory Tax Compliance AI',
      feature4: 'Automated Job Description & Offer Generation',
    },

    // Global Network Map
    network: {
      tag: 'PAN-AFRICAN & GLOBAL EXPANSION',
      title: 'A Rapidly Scaling Network of African & Global Partners',
      subtitle: 'Operating across West, East, Central, and Southern Africa with expanding connectivity into Europe, the Middle East, and North America.',
      africanFocus: 'African Regional Hubs',
      africanFocusDesc: 'Tailored for statutory tax, pension, PAYE, and banking regulations across Nigeria, Ghana, Kenya, South Africa, Côte d’Ivoire, Senegal, and Egypt.',
      globalFocus: 'Global Readiness',
      globalFocusDesc: 'Multi-currency payroll, GDPR & NDPR data compliance, remote workforce management, and enterprise-grade SLA infrastructure.',
    },

    // Success Stories
    stories: {
      tag: 'PARTNER VOICES',
      title: 'Real Firms Scaling with NextSofthr',
      subtitle: 'Discover how consulting leaders and tech advisors across the continent generate six-figure recurring revenues.',
    },

    // Events & Training
    events: {
      tag: 'ACADEMY & SESSIONS',
      title: 'Upcoming Partner Enablement & Masterclasses',
      subtitle: 'Join live product walkthroughs, co-selling workshops, and regional African compliance summits.',
      registerBtn: 'Reserve My Seat',
      upcomingBadge: 'UPCOMING',
    },

    // Resource Centre
    resources: {
      tag: 'SALES & MARKETING VAULT',
      title: 'Partner Resources, Pitch Decks & Collateral',
      subtitle: 'Download client-facing one-pagers, ROI comparison calculators, RFP response templates, and implementation guides.',
      downloadBtn: 'Download Resource',
    },

    // FAQ Section
    faq: {
      tag: 'FREQUENTLY ASKED QUESTIONS',
      title: 'Everything You Need to Know',
      subtitle: 'Answers to common questions regarding partner eligibility, commission cycles, contract ownership, and technical support.',
      haveMoreQuestions: 'Still have specific questions about the partner agreement?',
      contactPartnerDesk: 'Contact NextSofthr Partner Desk',
    },

    // Application Form
    apply: {
      tag: 'OFFICIAL APPLICATION',
      title: 'Join the NextSofthr Partner Network',
      subtitle: 'Complete this streamlined application. Our Partner Management team reviews and responds to all applications within 24 business hours.',
      step1Title: 'Personal Details',
      step2Title: 'Company Profile',
      step3Title: 'Partnership Category',
      step4Title: 'Market Reach & Goals',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'e.g. Olumide Adeleke',
      emailLabel: 'Work Email Address',
      emailPlaceholder: 'olumide@company.com',
      phoneLabel: 'Phone / WhatsApp Number',
      phonePlaceholder: '+234 803 123 4567',
      countryLabel: 'Primary Country of Operation',
      cityLabel: 'City / Headquarters',
      cityPlaceholder: 'Lagos, Nairobi, Abidjan, etc.',
      companyLabel: 'Company / Firm Name',
      companyPlaceholder: 'e.g. Apex Strategic Advisory Ltd',
      websiteLabel: 'Company Website (optional)',
      websitePlaceholder: 'https://apexadvisory.com',
      businessTypeLabel: 'Primary Business Focus',
      yearsLabel: 'Years in Business',
      employeesLabel: 'Number of Staff / Consultants',
      clientsLabel: 'Estimated Business Clients Managed',
      notesLabel: 'Additional Information or Growth Goals',
      notesPlaceholder: 'Tell us about your target clients, current HR/ERP tools you implement, or regional expansion plans...',
      backBtn: 'Back',
      nextBtn: 'Proceed to Next Step',
      submitBtn: 'Submit Partner Application',
      submitting: 'Processing Application...',
      successTitle: 'Application Submitted Successfully!',
      successMsg: 'Thank you for applying to the NextSofthr Partner Network. A Dedicated Partner Manager will contact you via email and phone within 24 business hours with your onboarding package.',
      successRef: 'Application Reference ID',
    },

    // Final CTA
    finalCta: {
      tag: 'START EARNING TODAY',
      title: 'Ready to Transform Your Practice with Recurring Revenue?',
      subtitle:
        'Join hundreds of advisors, accounting firms, and IT integrators building long-term recurring value with NextSofthr across Africa and worldwide.',
      btnApply: 'Become a Partner Today',
      btnContact: 'Schedule a Partner Intro Call',
      guarantee1: 'Zero upfront license fees',
      guarantee2: 'Full sales enablement & collateral',
      guarantee3: 'Prompt monthly commission payouts',
    },

    // Footer
    footer: {
      tagline: 'The leading intelligent HR, payroll and workforce ecosystem empowering African enterprises and global organizations.',
      programTitle: 'Partner Program',
      productTitle: 'Platform Modules',
      companyTitle: 'Company & Hubs',
      legalTitle: 'Compliance & Legal',
      allRights: 'All rights reserved.',
      panAfricanNotice: 'Proudly engineered for the African continent with global standards.',
      lagosHub: 'Lagos, Nigeria (HQ)',
      nairobiHub: 'Nairobi, Kenya',
      abidjanHub: 'Abidjan, Côte d’Ivoire',
      londonHub: 'London, United Kingdom',
    },

    // Modals & Chat
    modals: {
      portalLoginTitle: 'NextSofthr Partner Portal',
      portalLoginSubtitle: 'Secure channel partner management dashboard',
      demoCredNotice: 'Interactive Demo Access Enabled. Click below to sign in.',
      signInBtn: 'Sign In to Partner Portal',
      closeBtn: 'Close Window',
      eventRegisterTitle: 'Partner Event Registration',
      eventRegisterSubtitle: 'Reserve your complimentary virtual seat',
      confirmSeatBtn: 'Confirm My Reservation',
      seatReserved: 'Seat Confirmed! Calendar invite sent.',
    },
  },

  fr: {
    // Navigation
    nav: {
      program: 'Programme Partenaire',
      benefits: 'Avantages',
      commission: 'Commissions',
      howItWorks: 'Fonctionnement',
      ecosystem: 'Écosystème',
      aiPlatform: 'Plateforme IA',
      network: 'Réseau',
      resources: 'Ressources',
      faq: 'FAQ',
      portal: 'Portail Partenaire',
      applyNow: 'Devenir Partenaire',
      quickApply: 'Postuler',
      hotline: '+234 915 848 2622',
      hotlineTitle: 'Appelez le Bureau Partenaires NextSofthr',
      brandSubtitle: 'Écosystème RH & Paie',
      partnerBadge: 'PARTENAIRE',
      themeLight: 'Passer au thème clair',
      themeDark: 'Passer au thème bleu nuit/charbon',
      langSwitcher: 'Langue',
      selectLang: 'Sélectionnez la langue du marché',
      activeBadge: 'ACTIF',
      globalAfricanFocus: 'Focus Afrique & Mondial',
    },

    // Hero Section
    hero: {
      badge: 'Programme Officiel Partenaires Distributeurs',
      commissionBadge: "Jusqu'à 40% Récurrent",
      titlePart1: 'Associez-vous à',
      titleBrand: 'NextSofthr',
      titlePart2: 'Développez Vos Affaires.',
      titlePart3: 'Générez des Revenus Récurrents.',
      subtitle:
        "Rejoignez le Réseau Partenaire NextSofthr et aidez les entreprises en Afrique et dans le monde entier à moderniser leur gestion des RH, de la paie et des effectifs, tout en créant une nouvelle source de revenus récurrents pour votre cabinet.",
      ctaApply: 'Devenir Partenaire',
      ctaExplore: 'Découvrir le Programme',
      stat1Value: '15%–40%',
      stat1Label: 'Commission Mensuelle',
      stat2Value: '24+',
      stat2Label: 'Profils Partenaires Éligibles',
      stat3Value: '16 Modules',
      stat3Label: 'Cloud RH Tout-en-Un',
      stat4Value: '0 FCFA / 0 $',
      stat4Label: 'Inscription Gratuite',
      philosophyTitle: 'Philosophie Partenaire',
      philosophyValue: 'Bâtir. Vendre. Croître. Gagner.',
      photoTag: 'Consultants RH & Financiers en Session',
      photoHubs: 'Abidjan • Dakar • Mondial',
      valueCycleTag: 'CYCLE DE VALEUR',
      valueCycleSub: 'Revenus Récurrents Automatisés',
      stepPartnership: 'Partenariat',
      stepCustomers: 'Clients',
      stepRevenue: 'Revenus',
      stepGrowth: 'Croissance',
      dashHubTitle: 'Centre Paie & Présence NextSofthr',
      dashSyncBadge: 'SYNCHRO DIRECT',
      dashPayRun: 'Cycle de Paie Actuel',
      dashPayRunValue: '1 420 Collaborateurs',
      dashPayRunNote: '100% Conforme Fiscalité',
      dashAiInsights: 'Analyses RH IA',
      dashAiValue: '99.8% Précision',
      dashAiNote: 'Prêt pour Audit',
      dashPartnerShare: 'Part Partenaire',
      dashPartnerValue: '1 850 000 FCFA / m',
      dashPartnerNote: 'Récurrent',
      dashFooterText: 'Au service des PME et Multinationales en Afrique et dans le Monde',
    },

    // Trust Strip
    trust: {
      card1Title: 'Revenus Récurrents',
      card1Desc: "Générez un flux régulier de revenus en intégrant vos entreprises clientes sur NextSofthr.",
      card1Stat: "Jusqu'à 40%",
      card2Title: 'Opportunité Panafricaine & Mondiale',
      card2Desc: 'Accompagnez des entreprises à travers toute l’Afrique et les marchés internationaux.',
      card2Stat: 'Afrique & International',
      card3Title: 'Plateforme SaaS Puissante',
      card3Desc: 'Offrez à vos clients une technologie moderne de gestion des RH, de la paie et des équipes.',
      card3Stat: '16 Applications Liées',
      card4Title: 'Soutien à la Croissance',
      card4Desc: 'Bénéficiez de formations, de supports commerciaux et d’un accompagnement marketing complet.',
      card4Stat: 'Équipe Dédiée',
    },

    // Why Partner
    why: {
      tag: 'POURQUOI DEVENIR PARTENAIRE NEXTSOFTHR',
      titleMain: 'Bien Plus Qu’un Simple Partenariat.',
      titleGradient: 'Bâtissez une Nouvelle Rente Récurrente.',
      subtitle:
        'Associez votre expertise en conseil, vos relations professionnelles ou vos services informatiques à une plateforme moderne de gestion RH et paie pensée pour une adoption rapide et des revenus durables.',
      card1Title: 'Commissions Récurrentes',
      card1Desc: 'Touchez des commissions chaque mois sur tous les abonnements actifs de vos clients selon votre palier.',
      card1Highlight: "Jusqu'à 40% chaque mois",
      card2Title: 'Plateforme RH & Paie Complète',
      card2Desc: 'Offrez une solution unique couvrant tous les besoins RH, paie, congés, pointage et conformité.',
      card2Highlight: '16 modules interconnectés',
      card3Title: 'Intelligence Artificielle Dédiée RH',
      card3Desc: 'Aidez vos clients à exploiter une IA moderne pour le traitement de la paie et les prévisions RH.',
      card3Highlight: 'IA Générative & Analyses',
      card4Title: 'Support Commercial & Marketing',
      card4Desc: 'Accédez à des présentations certifiées, des démonstrations et des campagnes de co-marketing.',
      card4Highlight: 'Outils & Co-marketing',
      card5Title: 'Formations & Certifications',
      card5Desc: 'Participez à nos programmes de certification pour maîtriser et déployer la solution avec assurance.',
      card5Highlight: 'Formations certifiantes',
      card6Title: 'Succès Client Garanti',
      card6Desc: 'Notre équipe d’ingénieurs vous épaule lors du déploiement et de l’intégration chez vos clients.',
      card6Highlight: 'Déploiement assisté',
      bannerTitle: 'Prêt à monétiser votre réseau professionnel et vos mandats ?',
      bannerSubtitle: 'Candidature en 3 minutes. Aucun frais d’adhésion. Accès immédiat au kit d’intégration.',
      bannerBtn: 'Démarrer Votre Candidature',
    },

    // Partner Categories
    categories: {
      tag: 'PROFILS & TYPOLOGIES DE PARTENAIRES',
      title: 'Conçu pour les Cabinets de Conseil et Sociétés IT',
      subtitle:
        'Que vous soyez consultant RH, expert-comptable, intégrateur ERP ou distributeur de logiciels, NextSofthr s’adapte parfaitement à votre modèle d’affaires.',
      tabAll: 'Tous les Profils',
      tabHR: 'Conseil RH & Capital Humain',
      tabFinance: 'Expertise Comptable & Audit',
      tabTech: 'Intégrateurs Systèmes & ESN',
      tabBusiness: 'Pépinières & Accélérateurs',
      bestFitLabel: 'Idéal Pour',
      expectedTier: 'Palier Cible',
      applyForCategory: 'Postuler en tant que',
    },

    // Commission Tiers
    commission: {
      tag: 'MODÈLE DE RÉMUNÉRATION TRANSPARENT',
      title: 'Quatre Paliers Clairs. Rémunérations Mensuelles Prévisibles.',
      subtitle:
        'Touchez des commissions récurrentes mensuelles virées directement sur votre compte bancaire en FCFA, EUR, USD, GBP ou NGN.',
      calculatorTitle: 'Simulateur de Revenus Partenaire',
      calculatorSub: 'Estimez vos revenus récurrents selon le nombre d’entreprises et d’employés gérés.',
      clientsSliderLabel: 'Nombre d’Entreprises Clientes',
      avgEmployeesLabel: 'Employés Moyens par Entreprise',
      estimatedMonthlyRevenue: 'Commission Mensuelle Estimée',
      estimatedAnnualRevenue: 'Commission Annuelle Estimée',
      tierBronze: 'Bronze (15%)',
      tierSilver: 'Argent (20%)',
      tierGold: 'Or (30%)',
      tierPlatinum: 'Platine (40%)',
      startAtTier: 'Commencer à ce palier',
      popularBadge: 'LE PLUS POPULAIRE',
    },

    // How It Works
    how: {
      tag: 'LE PARCOURS PARTENAIRE',
      title: '4 Étapes Simples Vers Vos Premières Commissions',
      subtitle: 'De votre inscription en ligne au déploiement de vos premiers clients sur NextSofthr.',
      step1Title: '1. Candidature Rapide en Ligne',
      step1Desc: 'Remplissez notre formulaire en 3 minutes en précisant le profil de votre cabinet et votre marché.',
      step2Title: '2. Certification & Prise en Main',
      step2Desc: 'Accédez au Portail Partenaire, suivez les modules de formation et téléchargez vos outils marketing.',
      step3Title: '3. Recommandation & Déploiement',
      step3Desc: 'Proposez la solution à vos clients avec votre lien partenaire ou collaborez avec nos experts pour les démos.',
      step4Title: '4. Commissions Mensuelles & Croissance',
      step4Desc: 'Suivez vos revenus en direct depuis votre tableau de bord et recevez vos virements chaque mois.',
      ctaText: 'Prêt à franchir la 1ère étape ?',
      ctaBtn: 'Compléter Ma Candidature',
    },

    // Partner Portal
    portal: {
      tag: 'NEXTSOFTHR PARTNER OS',
      title: 'Un Espace Conçu Pour Booster Votre Croissance',
      subtitle: 'Visibilité complète sur l’enregistrement des affaires, vos commissions et les supports marketing.',
      overviewTab: 'Vue d’ensemble',
      pipelineTab: 'Opportunités',
      commissionsTab: 'Gains & Versements',
      assetsTab: 'Supports Marketing',
      demoLoginNotice: 'Aperçu interactif du portail partenaire NextSofthr.',
      openPortalBtn: 'Ouvrir le Portail Partenaire',
    },

    // Partner Benefits
    benefits: {
      tag: 'L’AVANTAGE PARTENAIRE',
      title: 'Un Accompagnement Complet à Chaque Étape',
      subtitle: 'Nous investissons dans votre réussite commerciale avec des ressources marketing et techniques dédiées.',
      commercialTab: 'Avantages Commerciaux',
      technicalTab: 'Plateforme & Produit',
      marketingTab: 'Marketing & Ventes',
      supportTab: 'Assistance Dédiée',
    },

    // Product Ecosystem
    ecosystem: {
      tag: 'SUITE CLOUD UNIFIÉE',
      title: '16 Applications RH, Paie & Gestion Intégrées',
      subtitle: 'Une plateforme unique remplaçant les logiciels dispersés et les fichiers Excel chez vos clients.',
      exploreModules: 'Explorer Tous les Modules',
    },

    // AI Platform
    ai: {
      tag: 'TECHNOLOGIE RH INTELLIGENTE',
      title: 'Propulsé par une IA Spécifiquement Développée Pour les RH',
      subtitle: 'Offrez à vos clients la détection automatique des anomalies de paie et des analyses RH avancées.',
      feature1: 'Rapprochement Automatisé de la Paie',
      feature2: 'Analyses Prédictives de Rétention des Talents',
      feature3: 'Conformité Fiscale & Sociale Multi-Pays',
      feature4: 'Génération Automatique de Fiches de Poste',
    },

    // Global Network Map
    network: {
      tag: 'EXPANSION PANAFRICAINE & INTERNATIONALE',
      title: 'Un Réseau en Pleine Expansion à Travers l’Afrique et le Monde',
      subtitle: 'Actif en Afrique de l’Ouest, Centrale, de l’Est et Australe avec des ouvertures sur l’Europe et le Moyen-Orient.',
      africanFocus: 'Hubs Régionaux Africains',
      africanFocusDesc: 'Conçu pour respecter les réglementations fiscales, cotisations sociales et régimes fiscaux (Côte d’Ivoire, Sénégal, Cameroun, Nigéria, Kenya...).',
      globalFocus: 'Normes Internationales',
      globalFocusDesc: 'Gestion multidevises, conformité RGPD & lois locales sur les données, et hébergement haute sécurité.',
    },

    // Success Stories
    stories: {
      tag: 'TÉMOIGNAGES PARTENAIRES',
      title: 'Des Cabinets Partenaires Qui Développent Leurs Revenus',
      subtitle: 'Découvrez comment des consultants et intégrateurs à travers le continent génèrent des revenus récurrents majeurs.',
    },

    // Events & Training
    events: {
      tag: 'ACADÉMIE & WEBINAIRES',
      title: 'Webinaires et Masterclasses Partenaires à Venir',
      subtitle: 'Participez à nos sessions live de formation produit et décryptage des réformes fiscales et sociales en Afrique.',
      registerBtn: 'Réserver Ma Place',
      upcomingBadge: 'À VENIR',
    },

    // Resource Centre
    resources: {
      tag: 'ESPACE DOCUMENTATION & VENTES',
      title: 'Ressources Partenaires, Présentations & Fiches Produit',
      subtitle: 'Téléchargez les présentations commerciales, calculateurs de ROI et modèles de cahier des charges.',
      downloadBtn: 'Télécharger la Ressource',
    },

    // FAQ Section
    faq: {
      tag: 'FOIRE AUX QUESTIONS',
      title: 'Tout Ce Que Vous Devez Savoir',
      subtitle: 'Réponses claires sur les critères d’éligibilité, les cycles de versement des commissions et le support technique.',
      haveMoreQuestions: 'Vous avez des questions spécifiques sur le contrat partenaire ?',
      contactPartnerDesk: 'Contacter le Bureau Partenaires NextSofthr',
    },

    // Application Form
    apply: {
      tag: 'CANDIDATURE OFFICIELLE',
      title: 'Rejoindre le Réseau Partenaire NextSofthr',
      subtitle: 'Remplissez ce formulaire simplifié. Notre équipe responsable des partenariats vous contacte sous 24 heures ouvrées.',
      step1Title: 'Coordonnées Personnelles',
      step2Title: 'Profil du Cabinet / Entreprise',
      step3Title: 'Typologie de Partenariat',
      step4Title: 'Objectifs & Marchés Cibles',
      fullNameLabel: 'Nom & Prénom',
      fullNamePlaceholder: 'ex. Jean-Marc Kouassi',
      emailLabel: 'Adresse Email Professionnelle',
      emailPlaceholder: 'jm.kouassi@entreprise.ci',
      phoneLabel: 'Numéro Téléphone / WhatsApp',
      phonePlaceholder: '+225 07 12 34 56 78',
      countryLabel: 'Pays Principal d’Exercice',
      cityLabel: 'Ville / Siège Social',
      cityPlaceholder: 'Abidjan, Dakar, Douala, etc.',
      companyLabel: 'Nom du Cabinet / Entreprise',
      companyPlaceholder: 'ex. Conseil Stratégique Afrique SARL',
      websiteLabel: 'Site Web (optionnel)',
      websitePlaceholder: 'https://moncabinet.com',
      businessTypeLabel: 'Activité Principale',
      yearsLabel: 'Années d’Expérience',
      employeesLabel: 'Nombre de Collaborateurs',
      clientsLabel: 'Clients Entreprises Actuels',
      notesLabel: 'Informations Complémentaires & Objectifs',
      notesPlaceholder: 'Présentez vos types de clients cibles, outils RH actuels ou zones géographiques visées...',
      backBtn: 'Retour',
      nextBtn: 'Étape Suivante',
      submitBtn: 'Envoyer Ma Candidature',
      submitting: 'Traitement de la candidature...',
      successTitle: 'Candidature Transmise avec Succès !',
      successMsg: 'Merci pour votre candidature au Réseau Partenaire NextSofthr. Un Responsable Partenariats Dédié vous contactera sous 24 heures ouvrées avec votre kit d’accueil.',
      successRef: 'Numéro de Référence',
    },

    // Final CTA
    finalCta: {
      tag: 'COMMENCEZ DÈS AUJOURD’HUI',
      title: 'Prêt à Transformer Votre Cabinet Grâce aux Revenus Récurrents ?',
      subtitle:
        'Rejoignez des centaines de consultants, experts-comptables et intégrateurs qui construisent une valeur durable avec NextSofthr en Afrique et dans le monde.',
      btnApply: 'Devenir Partenaire Aujourd’hui',
      btnContact: 'Planifier un Échange Découverte',
      guarantee1: 'Zéro frais d’adhésion ou de licence',
      guarantee2: 'Supports commerciaux et marketing complets',
      guarantee3: 'Paiements de commissions mensuels garantis',
    },

    // Footer
    footer: {
      tagline: 'L’écosystème intelligent de référence pour la gestion des RH, de la paie et des effectifs en Afrique et à l’international.',
      programTitle: 'Programme Partenaire',
      productTitle: 'Modules de la Plateforme',
      companyTitle: 'Entreprise & Bureaux',
      legalTitle: 'Conformité & Légal',
      allRights: 'Tous droits réservés.',
      panAfricanNotice: 'Conçu avec fierté pour le continent africain selon les plus hauts standards internationaux.',
      lagosHub: 'Lagos, Nigéria (Siège)',
      nairobiHub: 'Nairobi, Kenya',
      abidjanHub: 'Abidjan, Côte d’Ivoire',
      londonHub: 'Londres, Royaume-Uni',
    },

    // Modals & Chat
    modals: {
      portalLoginTitle: 'Portail Partenaire NextSofthr',
      portalLoginSubtitle: 'Espace sécurisé de gestion des partenariats',
      demoCredNotice: 'Accès Démo Interactif Activé. Cliquez ci-dessous pour entrer.',
      signInBtn: 'Accéder au Portail Partenaire',
      closeBtn: 'Fermer la Fenêtre',
      eventRegisterTitle: 'Inscription Événement Partenaire',
      eventRegisterSubtitle: 'Réservez votre place virtuelle offerte',
      confirmSeatBtn: 'Confirmer Ma Réservation',
      seatReserved: 'Place confirmée ! Invitation agenda envoyée.',
    },
  },

  ar: {
    // Navigation
    nav: {
      program: 'برنامج الشركاء',
      benefits: 'المزايا',
      commission: 'العمولات',
      howItWorks: 'كيف يعمل',
      ecosystem: 'المنظومة',
      aiPlatform: 'منصة الذكاء الاصطناعي',
      network: 'الشبكة',
      resources: 'الموارد',
      faq: 'الأسئلة الشائعة',
      portal: 'بوابة الشركاء',
      applyNow: 'كن شريكاً معنا',
      quickApply: 'قدّم طلبك الآن',
      hotline: '+234 915 848 2622',
      hotlineTitle: 'اتصل بمكتب شركاء NextSofthr',
      brandSubtitle: 'منظومة الموارد البشرية والرواتب',
      partnerBadge: 'شريك معتمد',
      themeLight: 'التبديل إلى الوضع النهاري',
      themeDark: 'التبديل إلى الوضع الليلي الكحلي',
      langSwitcher: 'اللغة',
      selectLang: 'اختر لغة السوق الإقليمي',
      activeBadge: 'نشط',
      globalAfricanFocus: 'تركيز أفريقي وعالمي',
    },

    // Hero Section
    hero: {
      badge: 'البرنامج الرسمي لشركاء القنوات المعتمدين',
      commissionBadge: 'عمولة دورية تصل إلى 40%',
      titlePart1: 'شارك مع',
      titleBrand: 'NextSofthr',
      titlePart2: 'نمّ أعمالك ومؤسستك.',
      titlePart3: 'واكسب عوائد مالية شهرية متكررة.',
      subtitle:
        'انضم إلى شبكة شركاء NextSofthr وساعد الشركات في جميع أنحاء إفريقيا والعالم على تطوير إدارة الموارد البشرية والرواتب وفرق العمل مع بناء تدفق إيرادات شهري متكرر لشركتك.',
      ctaApply: 'كن شريكاً معتمداً',
      ctaExplore: 'استكشف برنامج الشركاء',
      stat1Value: '15%–40%',
      stat1Label: 'عمولة شهرية مستمرة',
      stat2Value: '+24',
      stat2Label: 'فئة شركاء مؤهلة',
      stat3Value: '16 تطبيقاً',
      stat3Label: 'منظومة سحابية متكاملة',
      stat4Value: '0 $ / 0 درهم',
      stat4Label: 'تسجيل مجاني بالكامل',
      philosophyTitle: 'فلسفة الشراكة',
      philosophyValue: 'ابنِ. بع. نمُّ. اكسب.',
      photoTag: 'مستشارو الموارد البشرية والمالية في جلسة استشارية',
      photoHubs: 'القاهرة • الدار البيضاء • عالمي',
      valueCycleTag: 'دورة القيمة',
      valueCycleSub: 'عوائد متكررة مؤتمتة',
      stepPartnership: 'الشراكة',
      stepCustomers: 'العملاء',
      stepRevenue: 'العوائد',
      stepGrowth: 'توسيع النمو',
      dashHubTitle: 'مركز الرواتب والحضور الذكي NextSofthr',
      dashSyncBadge: 'مزامنة حية',
      dashPayRun: 'دورة الرواتب الحالية',
      dashPayRunValue: '1,420 موظف',
      dashPayRunNote: 'توافق ضريبي وتأميني 100%',
      dashAiInsights: 'تحليلات الموارد البشرية الذكية',
      dashAiValue: 'دقة بنسبة 99.8%',
      dashAiNote: 'جاهز للتدقيق المالي',
      dashPartnerShare: 'حصة الشريك الشهرية',
      dashPartnerValue: '1,850,000 د.ج / شهر',
      dashPartnerNote: 'عوائد دورية',
      dashFooterText: 'خدمة المؤسسات والشركات متعددة الجنسيات في إفريقيا والعالم',
    },

    // Trust Strip
    trust: {
      card1Title: 'عوائد متكررة ومستمرة',
      card1Desc: 'ابنِ مصدر دخل شهري مستمر عن طريق ضم الشركات والمؤسسات إلى منصة NextSofthr.',
      card1Stat: 'حتى 40%',
      card2Title: 'فرصة إقليمية وعالمية',
      card2Desc: 'خدمة عملاء وشركات في جميع أنحاء شمال وغرب وشرق إفريقيا والأسواق الدولية.',
      card2Stat: 'إفريقيا والعالم',
      card3Title: 'منصة سحابية متقدمة',
      card3Desc: 'قدّم لعملائك أحدث تقنيات إدارة الموارد البشرية والرواتب والحضور الذكي.',
      card3Stat: '16 تطبيقاً مترابطاً',
      card4Title: 'دعم كامل لنمو الشريك',
      card4Desc: 'احصل على تدريب مستمر ومواد تسويقية ودعم فني واستشاري مخصص.',
      card4Stat: 'مكتب دعم مخصص',
    },

    // Why Partner
    why: {
      tag: 'لماذا تشارك مع NEXTSOFTHR',
      titleMain: 'أكثر من مجرد شراكة عادية.',
      titleGradient: 'ابنِ مسار إيرادات مستدام ومتنامٍ.',
      subtitle:
        'ادمج علاقاتك المهنية وخبراتك الاستشارية أو خدماتك التقنية مع منصة حديثة مصممة لاعتماد العملاء السريع وتوليد تدفق نقدي شهري ثابت.',
      card1Title: 'عمولات دورية متراكمة',
      card1Desc: 'اكسب عمولات دورية عن كل اشتراك نشط لعملائك وفقاً لمستوى شراكتك المعتمد.',
      card1Highlight: 'تصل إلى 40% شهرياً',
      card2Title: 'منظومة موارد بشرية شاملة',
      card2Desc: 'وفّر لعملائك جميع أدوات الموارد البشرية والرواتب من منصة سحابية موحدة.',
      card2Highlight: '16 وحدة متصلة بالكامل',
      card3Title: 'ذكاء اصطناعي متخصص',
      card3Desc: 'ساعد عملاءك في الاستفادة من الذكاء الاصطناعي التوليدي لضبط الرواتب وتحليل الأداء.',
      card3Highlight: 'ذكاء اصطناعي تحليلي',
      card4Title: 'دعم تسويقي ومبيعات',
      card4Desc: 'احصل على عروض تقديمية معتمدة ومواد ترويجية ودعم كامل في العروض التوضيحية.',
      card4Highlight: 'مواد تسويق مشتركة',
      card5Title: 'تدريب واعتماد الشركاء',
      card5Desc: 'برامج تعليمية وشهادات معتمدة لتمكين فريقك من بيع ودعم المنصة بثقة كاملة.',
      card5Highlight: 'دورات وشهادات معتمدة',
      card6Title: 'ضمان نجاح العميل',
      card6Desc: 'يعمل فريقنا التقني معك جنباً إلى جنب لتثبيت وتشغيل المنصة للعملاء بسلاسة.',
      card6Highlight: 'تنفيذ وإطلاق مخصص',
      bannerTitle: 'هل أنت جاهز لتحويل علاقاتك وخبراتك إلى دخل دوري متزايد؟',
      bannerSubtitle: 'قدّم طلبك في 3 دقائق. بدون أي رسوم ترخيص. دخول فوري لبرنامج التدريب.',
      bannerBtn: 'ابدأ طلب الشراكة الآن',
    },

    // Partner Categories
    categories: {
      tag: 'فئات الشركاء والملفات المهنية',
      title: 'مصمم للمستشارين المحترفين وشركات تكنولوجيا المعلومات',
      subtitle:
        'سواء كنت تقدم استشارات الموارد البشرية، أو تنفذ أنظمة تخطيط الموارد ERP، أو تقدم تدقيقاً محاسبياً، توفر لك NextSofthr نموذج شراكة مصمم لزيادة أرباحك.',
      tabAll: 'جميع الفئات',
      tabHR: 'استشارات الموارد البشرية',
      tabFinance: 'المحاسبة والضرائب والتدقيق',
      tabTech: 'شركات البرمجيات ودمج الأنظمة',
      tabBusiness: 'مراكز الأعمال وحاضنات الشركات',
      bestFitLabel: 'الأنسب لـ',
      expectedTier: 'المستوى المستهدف',
      applyForCategory: 'التقديم كـ',
    },

    // Commission Tiers
    commission: {
      tag: 'نموذج عمولات شفاف وعادل',
      title: 'أربعة مستويات واضحة. عوائد شهرية متوقعة وموثوقة.',
      subtitle:
        'اكسب عمولات شهرية تدفع مباشرة إلى حسابك البنكي بالدولار أو اليورو أو العملات المحلية الإقليمية.',
      calculatorTitle: 'حاسبة أرباح الشركاء التفاعلية',
      calculatorSub: 'احسب أرباحك الشهرية المتوقعة بناءً على عدد المؤسسات والعملاء والموظفين المدارين.',
      clientsSliderLabel: 'عدد الشركات والعملاء النشطين',
      avgEmployeesLabel: 'متوسط عدد الموظفين لكل شركة',
      estimatedMonthlyRevenue: 'العمولة الشهرية التقديرية',
      estimatedAnnualRevenue: 'العمولة السنوية التقديرية',
      tierBronze: 'البرونزي (15%)',
      tierSilver: 'الفضي (20%)',
      tierGold: 'الذهبي (30%)',
      tierPlatinum: 'البلاتيني (40%)',
      startAtTier: 'ابدأ في هذا المستوى',
      popularBadge: 'الأكثر اختياراً',
    },

    // How It Works
    how: {
      tag: 'مسار الشريك نحو النجاح',
      title: '4 خطوات بسيطة لتحقيق أولى عوائدك المتكررة',
      subtitle: 'من التسجيل عبر الإنترنت حتى إطلاق أول عميل مؤسسي على المنصة.',
      step1Title: '1. التقديم السريع عبر الإنترنت',
      step1Desc: 'املأ استمارة التقديم في 3 دقائق محددًا مجالات خبرتك ونطاق عملك الجغرافي والمهني.',
      step2Title: '2. التدريب ونيل شهادة الاعتماد',
      step2Desc: 'ادخل بوابة الشركاء، وأكمل مسار التدريب التفاعلي، واحصل على الشارات وحزم التسويق المعتمدة.',
      step3Title: '3. ترشيح العملاء وتطبيق المنصة',
      step3Desc: 'رشح العملاء عبر رابط الشريك الخاص بك أو تعاون مع مهندسينا لإجراء عروض تجريبية مخصصة.',
      step4Title: '4. استلام العوائد الشهرية والتوسع',
      step4Desc: 'تابع اشتراكات عملائك وعمولاتك لحظياً من لوحة التحكم واستلم مدفوعاتك الشهرية بانتظام.',
      ctaText: 'جاهز لبدء الخطوة الأولى؟',
      ctaBtn: 'أكمل استمارة طلب الشراكة',
    },

    // Partner Portal
    portal: {
      tag: 'نظام تشغيل شركاء NEXTSOFTHR',
      title: 'لوحة تحكم احترافية مخصصة لتنمية أعمالك',
      subtitle: 'متابعة مباشرة لتسجيل الصفقات، تدفق العمولات، مؤشرات أداء العملاء، ومكتبة الأصول التسويقية.',
      overviewTab: 'نظرة عامة',
      pipelineTab: 'مسار الصفقات',
      commissionsTab: 'الأرباح والتحويلات',
      assetsTab: 'المواد التسويقية',
      demoLoginNotice: 'معاينة تجريبية تفاعلية لواجهة بوابة شركاء NextSofthr.',
      openPortalBtn: 'فتح بوابة الشركاء',
    },

    // Partner Benefits
    benefits: {
      tag: 'ميزة الشراكة',
      title: 'تمكين شامل على كافة المستويات المهنية',
      subtitle: 'نستثمر في نجاحك التجاري منذ اليوم الأول عبر موارد تسويقية وتقنية واستشارية متكاملة.',
      commercialTab: 'الحوافز التجارية',
      technicalTab: 'المنصة والتكنولوجيا',
      marketingTab: 'التسويق والمبيعات المشتركة',
      supportTab: 'الدعم الاستشاري المخصص',
    },

    // Product Ecosystem
    ecosystem: {
      tag: 'منظومة سحابية متحدة',
      title: '16 تطبيقاً متكاملاً لإدارة الموارد البشرية والرواتب',
      subtitle: 'منصة مركزية واحدة تستبدل البرمجيات القديمة المتناثرة وجداول البيانات اليدوية لعملائك.',
      exploreModules: 'استكشف كافة التطبيقات',
    },

    // AI Platform
    ai: {
      tag: 'تكنولوجيا الموارد البشرية الذكية',
      title: 'مدعوم بذكاء اصطناعي مؤسسي صُمم خصيصاً للموارد البشرية',
      subtitle: 'زوّد عملاءك بإمكانيات الكشف التلقائي عن أخطاء الرواتب وتحليلات القوى العاملة الذكية.',
      feature1: 'المطابقة والتسوية الآلية للرواتب',
      feature2: 'تحليلات التنبؤ باستبقاء المواهب والكفاءات',
      feature3: 'الامتثال للضرائب والتأمينات في بلدان متعددة',
      feature4: 'صياغة التوصيف الوظيفي وعروض العمل آلياً',
    },

    // Global Network Map
    network: {
      tag: 'توسع إقليمي وعالمي',
      title: 'شبكة سريعة النمو عبر إفريقيا والأسواق العالمية',
      subtitle: 'نعمل في شمال، وغرب، وشرق، وجنوب إفريقيا مع توسع متواصل في أوروبا والشرق الأوسط.',
      africanFocus: 'المراكز الإقليمية الإفريقية',
      africanFocusDesc: 'متوافق مع قوانين الضرائب والضمان الاجتماعي والتأمينات (مصر، المغرب، الجزائر، تونس، نيجيريا، كينيا...).',
      globalFocus: 'جاهزية عالمية متطورة',
      globalFocusDesc: 'رواتب بعملات متعددة، امتثال لحماية البيانات، وإدارة الفرق العاملة عن بُعد بأعلى معايير الأمان.',
    },

    // Success Stories
    stories: {
      tag: 'آراء ونجاحات الشركاء',
      title: 'شركات حقيقية تنمو وتحقق عوائد متكررة مع NextSofthr',
      subtitle: 'تعرف على كيفية تحقيق المستشارين وشركات الحلول التقنية في القارة لأرباح متكررة مستمرة.',
    },

    // Events & Training
    events: {
      tag: 'الأكاديمية والندوات المتخصصة',
      title: 'ورش العمل والندوات الإلكترونية القادمة للشركاء',
      subtitle: 'شارك في عروض حية للمنتج وورش عمل حول الامتثال الضريبي والعمالي في الأسواق الإقليمية.',
      registerBtn: 'احجز مقعدي المجاني',
      upcomingBadge: 'قريباً',
    },

    // Resource Centre
    resources: {
      tag: 'مكتبة أدوات المبيعات والتسويق',
      title: 'موارد الشركاء والعروض التقديمية وحقائب المبيعات',
      subtitle: 'حمّل النشرات التعريفية وحاسبات العائد على الاستثمار ونماذج مقترحات المشاريع.',
      downloadBtn: 'تحميل المورد',
    },

    // FAQ Section
    faq: {
      tag: 'الأسئلة الأكثر تكراراً',
      title: 'كل ما تحتاج لمعرفته حول البرنامج',
      subtitle: 'إجابات واضحة ومباشرة حول شروط الأهلية ودورات تحويل العمولات والدعم الفني.',
      haveMoreQuestions: 'هل لديك استفسارات محددة حول اتفاقية الشراكة؟',
      contactPartnerDesk: 'تواصل مع مكتب شركاء NextSofthr',
    },

    // Application Form
    apply: {
      tag: 'طلب الانضمام الرسمي',
      title: 'انضم إلى شبكة شركاء NextSofthr',
      subtitle: 'املأ استمارة التقديم المبسطة. يقوم فريق إدارة الشركاء بمراجعة طلبك والرد خلال 24 ساعة عمل.',
      step1Title: 'البيانات الشخصية',
      step2Title: 'ملف الشركة والمؤسسة',
      step3Title: 'فئة الشراكة المطلوبة',
      step4Title: 'النطاق والأهداف الاستراتيجية',
      fullNameLabel: 'الاسم الكامل',
      fullNamePlaceholder: 'مثال: أحمد مصطفى',
      emailLabel: 'البريد الإلكتروني للعمل',
      emailPlaceholder: 'ahmed@company.com',
      phoneLabel: 'رقم الهاتف / واتساب',
      phonePlaceholder: '+20 100 123 4567',
      countryLabel: 'بلد العمل والنشاط الرئيسي',
      cityLabel: 'المدينة / المقر الرئيسي',
      cityPlaceholder: 'القاهرة، الدار البيضاء، الرياض، إلخ',
      companyLabel: 'اسم الشركة أو المؤسسة الاستشارية',
      companyPlaceholder: 'مثال: شركة الاستشارات الحديثة',
      websiteLabel: 'الموقع الإلكتروني (اختياري)',
      websitePlaceholder: 'https://mycompany.com',
      businessTypeLabel: 'مجال النشاط الرئيسي',
      yearsLabel: 'سنوات العمل والخبرة',
      employeesLabel: 'عدد الموظفين والمستشارين',
      clientsLabel: 'عدد الشركات والعملاء الحاليين',
      notesLabel: 'معلومات إضافية أو أهداف النمو',
      notesPlaceholder: 'أخبرنا عن عملائك المستهدفين، وأنظمة الموارد البشرية الحالية التي تتعامل معها...',
      backBtn: 'السابق',
      nextBtn: 'الانتقال للخطوة التالية',
      submitBtn: 'إرسال طلب الشراكة',
      submitting: 'جاري إرسال الطلب...',
      successTitle: 'تم إرسال طلب الشراكة بنجاح!',
      successMsg: 'شكراً لتقديمك للانضمام إلى شبكة شركاء NextSofthr. سيتواصل معك مدير الشركاء المخصص عبر البريد الإلكتروني والهاتف خلال 24 ساعة عمل لتسليمك حزمة الانضمام.',
      successRef: 'الرقم المرجعي للطلب',
    },

    // Final CTA
    finalCta: {
      tag: 'ابدأ في جني الأرباح اليوم',
      title: 'هل أنت مستعد لتطوير أعمالك وتحقيق عوائد شهرية متكررة؟',
      subtitle:
        'انضم إلى المئات من المستشارين والخبراء وشركات تكنولوجيا المعلومات الذين يبنون قيمة مستدامة مع NextSofthr في إفريقيا والعالم.',
      btnApply: 'كن شريكاً معتمداً اليوم',
      btnContact: 'حجز جلسة استكشافية مع فريق الشركاء',
      guarantee1: 'بدون أي رسوم ترخيص مسبقة',
      guarantee2: 'أدوات تسويقية وتدريبية شاملة',
      guarantee3: 'تحويلات شهرية منتظمة وموثوقة للعمولات',
    },

    // Footer
    footer: {
      tagline: 'المنظومة السحابية الذكية الرائدة لإدارة الموارد البشرية والرواتب لتمكين المؤسسات الإفريقية والعالمية.',
      programTitle: 'برنامج الشركاء',
      productTitle: 'تطبيقات المنظومة',
      companyTitle: 'الشركة والمراكز',
      legalTitle: 'الامتثال والشروط القانونية',
      allRights: 'جميع الحقوق محفوظة.',
      panAfricanNotice: 'صُمم بفخر لخدمة القارة الإفريقية وفق أعلى المعايير التقنية العالمية.',
      lagosHub: 'لاغوس، نيجيريا (المقر الرئيسي)',
      nairobiHub: 'نيروبي، كينيا',
      abidjanHub: 'أبيدجان، كوت ديفوار',
      londonHub: 'لندن، المملكة المتحدة',
    },

    // Modals & Chat
    modals: {
      portalLoginTitle: 'بوابة شركاء NextSofthr',
      portalLoginSubtitle: 'لوحة إدارة الشركاء والقنوات الآمنة',
      demoCredNotice: 'تم تفعيل الدخول التجريبي التفاعلي. انقر بالأسفل لتسجيل الدخول.',
      signInBtn: 'تسجيل الدخول إلى بوابة الشركاء',
      closeBtn: 'إغلاق النافذة',
      eventRegisterTitle: 'التسجيل في فعالية الشركاء',
      eventRegisterSubtitle: 'احجز مقعدك الافتراضي المجاني',
      confirmSeatBtn: 'تأكيد الحجز',
      seatReserved: 'تم تأكيد حجز مقعدك! تم إرسال دعوة التقويم.',
    },
  },
};
