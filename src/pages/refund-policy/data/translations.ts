export type SupportedLanguage = 'en' | 'fr' | 'pt' | 'es';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇫🇷' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português', flag: '🇵🇹' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸' },
];

export interface Translations {
  nav: {
    overview: string;
    customers: string;
    partners: string;
    commercial: string;
    faqs: string;
    contact: string;
    partnerDesk: string;
    submitClaim: string;
    refundDesk: string;
    callUs: string;
  };
  hero: {
    breadcrumbHome: string;
    breadcrumbLegal: string;
    breadcrumbCurrent: string;
    effective: string;
    updated: string;
    versionPrefix: string;
    trustKicker: string;
    headline: string;
    subheadline: string;
    supportingText: string;
    contactSupport: string;
    contactPartnerTeam: string;
    printTooltip: string;
    shareTooltip: string;
    linkCopied: string;
    complianceNote: string;
    cardJurisdiction: string;
    cardJurisdictionVal: string;
    cardScope: string;
    cardScopeVal: string;
    cardCurrency: string;
    cardSupportDesk: string;
    cardHelpline: string;
    cardTip: string;
  };
  summaryCard: {
    header: string;
    subHeader: string;
    refundWindow: string;
    cancellationProcedure: string;
    financialNotice: string;
    governingClauses: string;
    directJump: string;
    readFullPolicy: string;
    categories: {
      Customers: {
        title: string;
        badge: string;
        description: string;
        refundWindow: string;
        cancellationRule: string;
        financialImpact: string;
      };
      Resellers: {
        title: string;
        badge: string;
        description: string;
        refundWindow: string;
        cancellationRule: string;
        financialImpact: string;
      };
      Distributors: {
        title: string;
        badge: string;
        description: string;
        refundWindow: string;
        cancellationRule: string;
        financialImpact: string;
      };
      Partners: {
        title: string;
        badge: string;
        description: string;
        refundWindow: string;
        cancellationRule: string;
        financialImpact: string;
      };
      Affiliates: {
        title: string;
        badge: string;
        description: string;
        refundWindow: string;
        cancellationRule: string;
        financialImpact: string;
      };
    };
  };
  tableOfContents: {
    searchTitle: string;
    searchPlaceholder: string;
    clear: string;
    filterScope: string;
    all: string;
    tableTitle: string;
    of: string;
    noClausesMatch: string;
    frequentlyAsked: string;
    directContact: string;
    printExport: string;
  };
  faq: {
    kicker: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    expandAll: string;
    collapseAll: string;
    verifiedStandard: string;
    noResults: string;
    allQuestions: string;
  };
  contact: {
    kicker: string;
    headline: string;
    text: string;
    contactSupport: string;
    contactPartnerTeam: string;
    websiteLabel: string;
    phoneLabel: string;
    standardsTitle: string;
    hoursLabel: string;
    hoursVal: string;
    responseLabel: string;
    responseVal: string;
    channelLabel: string;
    channelVal: string;
    directMailNote: string;
  };
  footer: {
    tagline: string;
    productCol: string;
    companyCol: string;
    legalCol: string;
    contactCol: string;
    submitRequestBtn: string;
    counselNoticeTitle: string;
    counselNoticeText: string;
    copyright: string;
    slaCompliant: string;
    dataStandards: string;
  };
  modals: {
    refundTitle: string;
    refundSubtitle: string;
    partnerTitle: string;
    partnerSubtitle: string;
    close: string;
    cancel: string;
    submit: string;
    validating: string;
    transmitting: string;
  };
  liveChat: {
    title: string;
    status: string;
    hours: string;
    welcomeMsg: string;
    openClaimForm: string;
    openPartnerForm: string;
    callDirect: string;
    quickRefund: string;
    quickCancel: string;
    quickPartner: string;
    inputPlaceholder: string;
    buttonLabelOpen: string;
    buttonLabelClose: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    nav: {
      overview: 'Overview',
      customers: 'Customers & Subscriptions',
      partners: 'Resellers & Partners',
      commercial: 'Commercial Terms',
      faqs: 'FAQs',
      contact: 'Contact',
      partnerDesk: 'Partner Desk',
      submitClaim: 'Submit Refund Claim',
      refundDesk: 'Refund Desk',
      callUs: 'Call',
    },
    hero: {
      breadcrumbHome: 'NextSoftHR',
      breadcrumbLegal: 'Legal & Compliance',
      breadcrumbCurrent: 'Refund & Cancellation Policy',
      effective: 'Effective:',
      updated: 'Updated:',
      versionPrefix: 'v',
      trustKicker: 'NextSoftHR Global Commercial & Compliance Framework',
      headline: 'Refund & Cancellation Policy',
      subheadline: 'Clear, transparent and fair payment, cancellation and refund guidelines for NextSoftHR customers and partners.',
      supportingText: 'At NextSoftHR, we believe in transparent commercial relationships. This policy explains how cancellations, refunds, credits, subscription payments, service fees, reseller purchases and partner transactions are handled.',
      contactSupport: 'Contact Support',
      contactPartnerTeam: 'Contact Partner Team',
      printTooltip: 'Print or Save Policy as PDF',
      shareTooltip: 'Copy Link to this Policy',
      linkCopied: 'Link copied!',
      complianceNote: 'Global Multi-Tenant & Enterprise Compliance',
      cardJurisdiction: 'Legal Jurisdiction:',
      cardJurisdictionVal: 'Nigeria & Global Cross-Border',
      cardScope: 'Audit Scope:',
      cardScopeVal: 'SaaS, VAR, Resellers, Partners',
      cardCurrency: 'Billing Currency:',
      cardSupportDesk: 'Support Desk:',
      cardHelpline: 'Direct Helpline:',
      cardTip: 'Need immediate assistance? Submissions through the verified Billing Operations Desk are resolved within 48–72 business hours.',
    },
    summaryCard: {
      header: 'Policy Summary Matrix · Select Your Commercial Relationship:',
      subHeader: 'Click any category to review specific terms',
      refundWindow: 'Refund Window & Eligibility',
      cancellationProcedure: 'Cancellation Procedure',
      financialNotice: 'Financial & Commission Notice',
      governingClauses: 'Governing Policy Clauses',
      directJump: 'Direct Jump',
      readFullPolicy: 'Read Full 25-Section Policy in Sequence',
      categories: {
        Customers: {
          title: 'Direct Subscribers & SaaS Customers',
          badge: 'Standard & Enterprise End-Users',
          description: 'Encompasses monthly subscribers, annual contracted enterprises, trial evaluators, and organizations licensing individual HR/Payroll add-on modules.',
          refundWindow: '14 calendar days for annual subscriptions; zero day for monthly periods; full refund for verified duplicate charges or persistent unresolved technical failures.',
          cancellationRule: 'Cancel anytime via Admin Console. Future recurring charges halt immediately; active platform access continues through the paid billing cycle end date.',
          financialImpact: 'Data export available for 30 days post-expiration. Unused days within monthly billing periods are strictly non-refundable.',
        },
        Resellers: {
          title: 'Authorized Value-Added Resellers (VARs)',
          badge: 'Channel Resellers & Integrators',
          description: 'Commercial entities certified by NextSoftHR to package and resell our software licenses bundled with their own localized accounting or managed payroll services.',
          refundWindow: 'Governed strictly by executed Reseller Agreements. Resellers cannot promise refunds exceeding official NextSoftHR standards.',
          cancellationRule: 'Customer cancellations must be coordinated via the Reseller Channel Portal to synchronize downstream billing ledgers.',
          financialImpact: 'Approved customer refunds directly reduce commissionable transactions. Reseller margins already disbursed are subject to automatic clawback on future statements.',
        },
        Distributors: {
          title: 'Master Wholesale Distributors',
          badge: 'Bulk License Operators',
          description: 'High-volume regional distribution partners who purchase prepaid multi-tenant license banks and wholesale enterprise blocks for sub-distribution.',
          refundWindow: 'Wholesale license batches are non-refundable once allocated in the Global Console. Unallocated seats may qualify for product rollover.',
          cancellationRule: 'Distributor commitments are governed by executed Purchase Orders (POs) and annual distribution quotas.',
          financialImpact: 'Downstream cancellations may generate Commercial Credit Notes applicable toward subsequent wholesale renewals, in lieu of cash refunds.',
        },
        Partners: {
          title: 'Technology & Consulting Alliances',
          badge: 'Accounting, HR & System Alliances',
          description: 'Independent HR consultants, chartered accounting firms, and system integrators who advise client organizations and embed NextSoftHR workflows.',
          refundWindow: 'Referral rewards vest 30 days post-settlement. Cancellations or refunds within this window void associated partner compensation.',
          cancellationRule: 'Client churn or service cancellation triggers automated ledger reconciliation on the Partner Operations dashboard.',
          financialImpact: 'Commission deductions apply to clawed back or disputed transactions. Auditable reconciliation vouchers provided on each settlement run.',
        },
        Affiliates: {
          title: 'Affiliates & Referral Partners',
          badge: 'Commercial Referral Advocates',
          description: 'Individuals, professional advocates, and digital publishers who introduce new commercial enterprises to the NextSoftHR suite.',
          refundWindow: 'Accruals remain pending during the mandatory 30-day client evaluation window; finalized upon verified, non-refunded revenue receipt.',
          cancellationRule: 'If a referred customer rescinds or disputes their subscription within 30 days, referral attribution is deactivated.',
          financialImpact: 'Strict zero-tolerance for self-referrals, coupon site scraping, or abusive churning. Unearned commissions are revoked immediately.',
        },
      },
    },
    tableOfContents: {
      searchTitle: 'Search Policy Clauses',
      searchPlaceholder: 'Search e.g. chargeback, refund, VAR...',
      clear: 'Clear',
      filterScope: 'Filter by Governance Scope',
      all: 'All',
      tableTitle: 'Table of Clauses',
      of: 'of',
      noClausesMatch: 'No clauses matched your search query. Try another keyword.',
      frequentlyAsked: 'Frequently Asked Questions',
      directContact: 'Direct Contact & Support',
      printExport: 'Print / Export Legal Document',
    },
    faq: {
      kicker: 'Commercial Inquiries & Clarifications',
      title: 'Frequently Asked Questions',
      subtitle: 'Practical answers regarding cancellations, refund timelines, commissions, partner adjustments, and data grace periods.',
      searchPlaceholder: 'Search FAQ questions...',
      expandAll: 'Expand All',
      collapseAll: 'Collapse All',
      verifiedStandard: 'Verified Policy Standard',
      noResults: 'No matching questions found. You can submit your question directly to our Billing Desk.',
      allQuestions: 'All Questions',
    },
    contact: {
      kicker: 'NextSoftHR Commercial Care & Dispute Resolution',
      headline: 'Need Help With a Refund or Cancellation?',
      text: 'Our support and partner teams are available to help you understand your billing, cancellation and refund options.',
      contactSupport: 'Contact Support',
      contactPartnerTeam: 'Contact Partner Team',
      websiteLabel: 'Website:',
      phoneLabel: 'Phone:',
      standardsTitle: 'Billing Desk Operating Standards',
      hoursLabel: 'Support Hours:',
      hoursVal: 'Monday – Friday, 8:00 AM – 6:00 PM (WAT / UTC+1). Enterprise customers receive 24/7 priority SLA coverage.',
      responseLabel: 'Inquiry Response Window:',
      responseVal: 'All documented refund claims and billing audit filings receive a written initial assessment within 48 to 72 business hours.',
      channelLabel: 'Dedicated Channel Escalation:',
      channelVal: 'Resellers, distributors, and certified partners are assigned a dedicated Partner Operations specialist.',
      directMailNote: 'Direct written correspondence may also be addressed to: NextSoftHR Global Commercial Legal & Billing Affairs, support@nextsofthr.org.',
    },
    footer: {
      tagline: 'NextSoftHR is a global HR, Payroll and Business Management Platform serving micro, small, medium and large enterprises across international borders.',
      productCol: 'Product',
      companyCol: 'Company',
      legalCol: 'Legal',
      contactCol: 'Contact',
      submitRequestBtn: 'Submit Refund Request',
      counselNoticeTitle: 'Legal Counsel Compliance Notice:',
      counselNoticeText: 'The legal wording must be presented as a clear commercial policy and should be reviewed by qualified legal counsel before publication to ensure compliance with applicable laws in Nigeria and other jurisdictions where NextSoftHR operates.',
      copyright: 'NextSoftHR. All Rights Reserved.',
      slaCompliant: 'Enterprise SLA Compliant',
      dataStandards: 'NDPA & Global Data Standards',
    },
    modals: {
      refundTitle: 'Submit a Refund Request',
      refundSubtitle: 'As described in Section 17, provide complete invoice and transaction details to ensure rapid audit by NextSoftHR Global Billing.',
      partnerTitle: 'Contact NextSoftHR Partner Team',
      partnerSubtitle: 'Specialized support for Authorized Resellers, Master Distributors, Affiliates, and Accounting/HR Alliances (Sections 11–14 & 18).',
      close: 'Close Window',
      cancel: 'Cancel',
      submit: 'Submit Request',
      validating: 'Validating...',
      transmitting: 'Transmitting...',
    },
    liveChat: {
      title: 'NextSoftHR Support',
      status: 'Agents Online · Avg reply < 2 mins',
      hours: 'Operating Hours: 8:00 AM – 6:00 PM (WAT)',
      welcomeMsg: 'Hello and welcome to NextSoftHR Support! How can we assist you with your subscription, refund claim, or partner account today?',
      openClaimForm: 'Open Refund Claim Form',
      openPartnerForm: 'Contact Partner Team',
      callDirect: 'Call Direct: +2349158482622',
      quickRefund: 'Refund inquiry',
      quickCancel: 'Cancel policy',
      quickPartner: 'Partner / Reseller',
      inputPlaceholder: 'Type your question here...',
      buttonLabelOpen: 'Live Support',
      buttonLabelClose: 'Close Help',
    },
  },

  fr: {
    nav: {
      overview: 'Aperçu',
      customers: 'Clients & Abonnements',
      partners: 'Revendeurs & Partenaires',
      commercial: 'Conditions Commerciales',
      faqs: 'FAQ',
      contact: 'Contact',
      partnerDesk: 'Bureau Partenaires',
      submitClaim: 'Demande de Remboursement',
      refundDesk: 'Bureau Remboursements',
      callUs: 'Appeler',
    },
    hero: {
      breadcrumbHome: 'NextSoftHR',
      breadcrumbLegal: 'Juridique & Conformité',
      breadcrumbCurrent: 'Politique de Remboursement & d\'Annulation',
      effective: 'Date d\'effet :',
      updated: 'Mise à jour :',
      versionPrefix: 'v',
      trustKicker: 'Cadre Commercial & de Conformité Mondiale NextSoftHR',
      headline: 'Politique de Remboursement & d\'Annulation',
      subheadline: 'Directives claires, transparentes et équitables de paiement, d\'annulation et de remboursement pour les clients et partenaires NextSoftHR.',
      supportingText: 'Chez NextSoftHR, nous croyons en des relations commerciales transparentes. Cette politique régit la gestion des annulations, des remboursements, des crédits de service, des paiements d\'abonnement, des achats revendeurs et des commissions partenaires.',
      contactSupport: 'Contacter le Support',
      contactPartnerTeam: 'Équipe Partenaires',
      printTooltip: 'Imprimer ou Sauvegarder en PDF',
      shareTooltip: 'Copier le lien de cette politique',
      linkCopied: 'Lien copié !',
      complianceNote: 'Conformité Mondiale Multi-Tenants & Entreprises',
      cardJurisdiction: 'Juridiction Légale :',
      cardJurisdictionVal: 'Nigéria & Transactions Transfrontalières',
      cardScope: 'Périmètre d\'Audit :',
      cardScopeVal: 'SaaS, VAR, Distributeurs, Partenaires',
      cardCurrency: 'Devises de Facturation :',
      cardSupportDesk: 'Bureau d\'Assistance :',
      cardHelpline: 'Ligne Directe :',
      cardTip: 'Besoin d\'assistance immédiate ? Les dossiers soumis au Bureau des Opérations de Facturation sont traités sous 48 à 72 heures ouvrées.',
    },
    summaryCard: {
      header: 'Matrice de Synthèse · Sélectionnez Votre Relation Commerciale :',
      subHeader: 'Cliquez sur une catégorie pour consulter ses conditions spécifiques',
      refundWindow: 'Délai & Éligibilité au Remboursement',
      cancellationProcedure: 'Procédure d\'Annulation',
      financialNotice: 'Avis Financier & Commissions',
      governingClauses: 'Clauses Applicables',
      directJump: 'Accès Direct',
      readFullPolicy: 'Lire l\'Intégralité des 25 Clauses',
      categories: {
        Customers: {
          title: 'Abonnés Directs & Clients SaaS',
          badge: 'Utilisateurs Finaux Standard & Entreprise',
          description: 'Comprend les abonnés mensuels, les entreprises sous contrat annuel, les utilisateurs en essai et les entreprises achetant des modules RH/Paie complémentaires.',
          refundWindow: '14 jours calendaires pour les abonnements annuels ; aucun remboursement pour les périodes mensuelles entamées ; remboursement intégral en cas de double prélèvement avéré ou de panne technique persistante.',
          cancellationRule: 'Annulation à tout moment depuis la Console d\'Administration. Les facturations futures s\'arrêtent immédiatement ; l\'accès demeure actif jusqu\'à la fin de la période payée.',
          financialImpact: 'Exportation des données garantie pendant 30 jours après expiration. Les jours non consommés d\'un mois en cours ne sont pas remboursables.',
        },
        Resellers: {
          title: 'Revendeurs à Valeur Ajoutée Agréés (VAR)',
          badge: 'Revendeurs & Intégrateurs Réseau',
          description: 'Entités commerciales certifiées par NextSoftHR pour distribuer nos licences logicielles associées à leurs propres services comptables ou de paie externalisée.',
          refundWindow: 'Régie strictement par le Contrat de Revendeur officiel. Les revendeurs ne peuvent promettre des remboursements supérieurs aux normes NextSoftHR.',
          cancellationRule: 'Les annulations de clients finaux doivent être transmises via le Portail Partenaire pour synchroniser les registres comptables.',
          financialImpact: 'Les remboursements accordés aux clients réduisent proportionnellement l\'assiette commissionnable. Les marges déjà versées sont déduites des règlements futurs.',
        },
        Distributors: {
          title: 'Distributeurs Grossistes Principaux',
          badge: 'Opérateurs de Licences en Volume',
          description: 'Partenaires de distribution régionale acquérant des banques prépayées de licences et des blocs d\'infrastructures d\'entreprise.',
          refundWindow: 'Les lots de licences en gros ne sont pas remboursables une fois alloués. Les sièges non attribués peuvent faire l\'objet d\'une réaffectation produit.',
          cancellationRule: 'Engagements régis par Bons de Commande (PO) fermes et quotas annuels de distribution.',
          financialImpact: 'Les annulations de clients finaux peuvent générer des Notes de Crédit Commerciales applicables aux futurs renouvellements en gros.',
        },
        Partners: {
          title: 'Alliances Technologiques & Conseils',
          badge: 'Cabinets Comptables, RH & Intégrateurs',
          description: 'Consultants RH indépendants, cabinets d\'expertise comptable et intégrateurs systèmes accompagnant la digitalisation de leurs clients avec NextSoftHR.',
          refundWindow: 'Les commissions de recommandation sont acquises 30 jours après le règlement effectif du client. Toute annulation dans ce délai annule la commission.',
          cancellationRule: 'L\'attrition ou l\'annulation d\'un client déclenche un ajustement comptable automatique dans le tableau de bord Partenaires.',
          financialImpact: 'Déductions appliquées en cas de rétrofacturation ou de litige. États de rapprochement détaillés fournis à chaque cycle de versement.',
        },
        Affiliates: {
          title: 'Affiliés & Partenaires de Parrainage',
          badge: 'Prescripteurs Commerciaux',
          description: 'Particuliers, spécialistes métier et éditeurs recommandant la suite logicielle NextSoftHR à de nouvelles organisations.',
          refundWindow: 'Commissions en attente pendant la période d\'évaluation client de 30 jours ; validées après encaissement définitif sans litige.',
          cancellationRule: 'En cas de résiliation ou contestation client sous 30 jours, l\'attribution du parrainage est annulée.',
          financialImpact: 'Tolérance zéro pour les auto-parrainages ou pratiques abusives. Les commissions indues sont révoquées sans délai.',
        },
      },
    },
    tableOfContents: {
      searchTitle: 'Rechercher une Clause',
      searchPlaceholder: 'Rechercher ex. rétrofacturation, remboursement...',
      clear: 'Effacer',
      filterScope: 'Filtrer par Périmètre',
      all: 'Tous',
      tableTitle: 'Table des Clauses',
      of: 'sur',
      noClausesMatch: 'Aucune clause ne correspond à votre recherche. Essayez un autre mot-clé.',
      frequentlyAsked: 'Foire Aux Questions',
      directContact: 'Contact Direct & Support',
      printExport: 'Imprimer / Exporter le Document Légal',
    },
    faq: {
      kicker: 'Questions Commerciales & Éclaircissements',
      title: 'Foire Aux Questions',
      subtitle: 'Réponses précises concernant les annulations, délais de remboursement, commissions, ajustements partenaires et sauvegarde des données.',
      searchPlaceholder: 'Rechercher dans la FAQ...',
      expandAll: 'Tout Développer',
      collapseAll: 'Tout Réduire',
      verifiedStandard: 'Norme Officielle de la Politique',
      noResults: 'Aucune question trouvée. Vous pouvez contacter directement notre Bureau de Facturation.',
      allQuestions: 'Toutes les Questions',
    },
    contact: {
      kicker: 'Service Commercial & Résolution des Litiges NextSoftHR',
      headline: 'Besoin d\'Aide Pour un Remboursement ou une Annulation ?',
      text: 'Nos équipes support et partenaires sont à votre disposition pour vous expliquer vos options de facturation, d\'annulation et de remboursement.',
      contactSupport: 'Contacter le Support',
      contactPartnerTeam: 'Équipe Partenaires',
      websiteLabel: 'Site Web :',
      phoneLabel: 'Téléphone :',
      standardsTitle: 'Normes de Service du Bureau de Facturation',
      hoursLabel: 'Heures d\'Ouverture :',
      hoursVal: 'Du lundi au vendredi, de 8h00 à 18h00 (WAT / UTC+1). Couverture SLA prioritaire 24h/24 et 7j/7 pour les clients Entreprise.',
      responseLabel: 'Délai de Réponse :',
      responseVal: 'Toute demande de remboursement ou réclamation de facturation documentée reçoit un examen initial sous 48 à 72 heures ouvrées.',
      channelLabel: 'Canal Dédié Partenaires :',
      channelVal: 'Les revendeurs, distributeurs et partenaires certifiés disposent d\'un interlocuteur dédié aux Opérations Partenaires.',
      directMailNote: 'Les correspondances formelles peuvent être envoyées à : NextSoftHR Global Commercial Legal & Billing Affairs, support@nextsofthr.org.',
    },
    footer: {
      tagline: 'NextSoftHR est une plateforme mondiale de gestion RH, de paie et de gestion d\'entreprise au service des TPE, PME et grandes entreprises à l\'international.',
      productCol: 'Produit',
      companyCol: 'Entreprise',
      legalCol: 'Juridique',
      contactCol: 'Contact',
      submitRequestBtn: 'Demander un Remboursement',
      counselNoticeTitle: 'Avis de Conformité Juridique :',
      counselNoticeText: 'Ce texte contractuel constitue une politique commerciale officielle et doit être validé par un conseil juridique qualifié avant publication définitive afin d\'assurer sa conformité avec le droit nigérian et les législations applicables.',
      copyright: 'NextSoftHR. Tous droits réservés.',
      slaCompliant: 'Conforme aux SLA Entreprise',
      dataStandards: 'Normes NDPA & Protection des Données',
    },
    modals: {
      refundTitle: 'Soumettre une Demande de Remboursement',
      refundSubtitle: 'Conformément à la Section 17, veuillez fournir les références de facture et de transaction complètes pour un audit rapide par la Facturation NextSoftHR.',
      partnerTitle: 'Contacter l\'Équipe Partenaires NextSoftHR',
      partnerSubtitle: 'Support dédié pour Revendeurs Agréés, Distributeurs Grossistes, Affiliés et Cabinets Partenaires (Sections 11–14 & 18).',
      close: 'Fermer la Fenêtre',
      cancel: 'Annuler',
      submit: 'Envoyer la Demande',
      validating: 'Vérification...',
      transmitting: 'Transmission...',
    },
    liveChat: {
      title: 'Support NextSoftHR',
      status: 'Agents en ligne · Réponse moy. < 2 min',
      hours: 'Heures d\'assistance : 8h00 – 18h00 (WAT)',
      welcomeMsg: 'Bonjour et bienvenue sur le Support NextSoftHR ! Comment pouvons-nous vous aider aujourd\'hui au sujet de votre abonnement, remboursement ou compte partenaire ?',
      openClaimForm: 'Ouvrir le Formulaire de Remboursement',
      openPartnerForm: 'Contacter l\'Équipe Partenaires',
      callDirect: 'Appel Direct : +2349158482622',
      quickRefund: 'Demande remboursement',
      quickCancel: 'Conditions résiliation',
      quickPartner: 'Revendeur / Partenaire',
      inputPlaceholder: 'Écrivez votre message ici...',
      buttonLabelOpen: 'Support en Direct',
      buttonLabelClose: 'Fermer l\'Aide',
    },
  },

  pt: {
    nav: {
      overview: 'Visão Geral',
      customers: 'Clientes & Assinaturas',
      partners: 'Revendedores & Parceiros',
      commercial: 'Termos Comerciais',
      faqs: 'Perguntas Frequentes',
      contact: 'Contacto',
      partnerDesk: 'Mesa de Parceiros',
      submitClaim: 'Pedir Reembolso',
      refundDesk: 'Balcão de Reembolso',
      callUs: 'Ligue',
    },
    hero: {
      breadcrumbHome: 'NextSoftHR',
      breadcrumbLegal: 'Jurídico & Conformidade',
      breadcrumbCurrent: 'Política de Reembolso e Cancelamento',
      effective: 'Vigência:',
      updated: 'Atualização:',
      versionPrefix: 'v',
      trustKicker: 'Quadro Comercial e de Conformidade Global NextSoftHR',
      headline: 'Política de Reembolso e Cancelamento',
      subheadline: 'Diretrizes claras, transparentes e justas de pagamento, cancelamento e reembolso para clientes e parceiros NextSoftHR.',
      supportingText: 'Na NextSoftHR, acreditamos em relações comerciais transparentes. Esta política detalha como são geridos os cancelamentos, reembolsos, créditos, pagamentos de assinaturas, serviços profissionais e transações com parceiros e revendedores.',
      contactSupport: 'Contactar Suporte',
      contactPartnerTeam: 'Equipa de Parceiros',
      printTooltip: 'Imprimir ou Guardar em PDF',
      shareTooltip: 'Copiar Link desta Política',
      linkCopied: 'Link copiado!',
      complianceNote: 'Conformidade Empresarial e Multi-Tenant Global',
      cardJurisdiction: 'Jurisdição Legal:',
      cardJurisdictionVal: 'Nigéria e Operações Transfronteiriças',
      cardScope: 'Âmbito de Auditoria:',
      cardScopeVal: 'SaaS, VAR, Distribuidores, Parceiros',
      cardCurrency: 'Moedas de Cobrança:',
      cardSupportDesk: 'Mesa de Faturação:',
      cardHelpline: 'Linha Direta:',
      cardTip: 'Precisa de apoio urgente? Pedidos submetidos na Mesa de Operações de Faturação são resolvidos em 48 a 72 horas úteis.',
    },
    summaryCard: {
      header: 'Matriz de Resumo da Política · Selecione a sua Relação Comercial:',
      subHeader: 'Clique em qualquer categoria para ver os termos específicos',
      refundWindow: 'Prazo e Elegibilidade de Reembolso',
      cancellationProcedure: 'Procedimento de Cancelamento',
      financialNotice: 'Aviso Financeiro e de Comissões',
      governingClauses: 'Cláusulas Aplicáveis',
      directJump: 'Acesso Rápido',
      readFullPolicy: 'Ler as 25 Cláusulas da Política na Íntegra',
      categories: {
        Customers: {
          title: 'Subscritores Diretos e Clientes SaaS',
          badge: 'Utilizadores Finais Padrão e Enterprise',
          description: 'Abrange clientes com faturação mensal, contratos anuais empresariais, utilizadores em período de teste e organizações com módulos adicionais de RH/Salários.',
          refundWindow: '14 dias de calendário para contratos anuais; não reembolsável para períodos mensais decorridos; reembolso integral em caso de cobrança duplicada ou falha técnica grave.',
          cancellationRule: 'Cancelamento a qualquer momento pelo Painel de Administração. Faturações futuras cessam de imediato; o acesso mantém-se ativo até ao fim do ciclo pago.',
          financialImpact: 'Exportação de dados disponível durante 30 dias após expiração. Dias não consumidos num mês faturado não conferem reembolso monetário.',
        },
        Resellers: {
          title: 'Revendedores de Valor Acrescentado (VAR)',
          badge: 'Revendedores de Canal e Integradores',
          description: 'Entidades comerciais certificadas pela NextSoftHR para revender as nossas licenças integradas com serviços próprios de contabilidade ou processamento salarial.',
          refundWindow: 'Regido estritamente pelo Acordo de Revenda. Os revendedores não podem prometer garantias de reembolso superiores às políticas oficiais da NextSoftHR.',
          cancellationRule: 'Cancelamentos de clientes finais devem ser submetidos através do Portal de Parceiros para sincronização contabilística.',
          financialImpact: 'Reembolsos aprovados diminuem o valor comissionável. Comissões já pagas são deduzidas em extratos subsequentes.',
        },
        Distributors: {
          title: 'Distribuidores Grossistas Principais',
          badge: 'Operadores de Licenças em Volume',
          description: 'Parceiros de distribuição regional que adquirem pacotes pré-pagos de licenças para subdistribuição a redes locais e empresas.',
          refundWindow: 'Lotes de licenças por grosso não são reembolsáveis após atribuição. Licenças não ativadas podem ser convertidas entre módulos conforme acordo.',
          cancellationRule: 'Compromissos formalizados através de Ordens de Compra (PO) vinculativas e metas anuais de distribuição.',
          financialImpact: 'Cancelamentos em clientes finais podem originar Notas de Crédito Comercial aplicáveis a futuras renovações por grosso.',
        },
        Partners: {
          title: 'Alianças Tecnológicas e Consultorias',
          badge: 'Contabilistas, Consultores de RH e Integradores',
          description: 'Consultores independentes e gabinetes de contabilidade que recomendam ou integram o ecossistema NextSoftHR nos seus clientes.',
          refundWindow: 'As comissões de recomendação são consolidadas 30 dias após a liquidação do cliente. Cancelamentos nesse intervalo anulam a comissão.',
          cancellationRule: 'A descontinuação do cliente aciona conciliação automática no painel de controlo de Operações de Parceiros.',
          financialImpact: 'Ajustes automáticos em casos de estorno ou disputas de pagamento. Extratos auditáveis emitidos em cada liquidação.',
        },
        Affiliates: {
          title: 'Afiliados e Parceiros de Referência',
          badge: 'Divulgadores Comerciais',
          description: 'Profissionais e plataformas digitais que apresentam novas empresas e negócios à plataforma NextSoftHR.',
          refundWindow: 'Comissões retidas durante a janela de avaliação de 30 dias do cliente; confirmadas após cobrança consolidada.',
          cancellationRule: 'Caso o cliente indicado cancele ou conteste o pagamento nos primeiros 30 dias, a atribuição é anulada.',
          financialImpact: 'Tolerância zero para autoreferências ou práticas abusivas. Comissões indevidas são revogadas de imediato.',
        },
      },
    },
    tableOfContents: {
      searchTitle: 'Pesquisar Cláusulas da Política',
      searchPlaceholder: 'Pesquisar ex. estorno, reembolso, revendedor...',
      clear: 'Limpar',
      filterScope: 'Filtrar por Âmbito',
      all: 'Todos',
      tableTitle: 'Índice de Cláusulas',
      of: 'de',
      noClausesMatch: 'Nenhuma cláusula encontrada para a sua pesquisa. Tente outro termo.',
      frequentlyAsked: 'Perguntas Frequentes',
      directContact: 'Contacto Direto e Suporte',
      printExport: 'Imprimir / Exportar Documento Legal',
    },
    faq: {
      kicker: 'Dúvidas Comerciais e Esclarecimentos',
      title: 'Perguntas Frequentes',
      subtitle: 'Respostas práticas sobre cancelamentos, prazos de reembolso, comissões, ajustes de parceiros e salvaguarda de dados.',
      searchPlaceholder: 'Pesquisar nas perguntas frequentes...',
      expandAll: 'Expandir Tudo',
      collapseAll: 'Recolher Tudo',
      verifiedStandard: 'Padrão Oficial da Política',
      noResults: 'Nenhuma pergunta correspondente. Pode contactar diretamente a nossa Mesa de Faturação.',
      allQuestions: 'Todas as Perguntas',
    },
    contact: {
      kicker: 'Apoio Comercial e Resolução de Disputas NextSoftHR',
      headline: 'Precisa de Ajuda com um Reembolso ou Cancelamento?',
      text: 'As nossas equipas de suporte e parceiros estão prontas para ajudar a entender as suas opções de faturação, cancelamento e reembolso.',
      contactSupport: 'Contactar Suporte',
      contactPartnerTeam: 'Equipa de Parceiros',
      websiteLabel: 'Website:',
      phoneLabel: 'Telefone:',
      standardsTitle: 'Padrões Operacionais da Mesa de Faturação',
      hoursLabel: 'Horário de Apoio:',
      hoursVal: 'De segunda a sexta-feira, das 8h00 às 18h00 (WAT / UTC+1). Clientes Enterprise têm cobertura SLA prioritária 24/7.',
      responseLabel: 'Prazo de Resposta:',
      responseVal: 'Todos os pedidos de reembolso e auditorias de faturação recebem avaliação inicial por escrito em 48 a 72 horas úteis.',
      channelLabel: 'Canal Exclusivo para Parceiros:',
      channelVal: 'Revendedores, distribuidores e parceiros certificados contam com gestores especializados de Operações de Canal.',
      directMailNote: 'Correspondência formal pode também ser enviada para: NextSoftHR Global Commercial Legal & Billing Affairs, support@nextsofthr.org.',
    },
    footer: {
      tagline: 'A NextSoftHR é uma plataforma global de RH, processamento salarial e gestão de negócios que serve micro, pequenas, médias e grandes empresas em múltiplos países.',
      productCol: 'Produto',
      companyCol: 'Empresa',
      legalCol: 'Jurídico',
      contactCol: 'Contacto',
      submitRequestBtn: 'Pedir Reembolso',
      counselNoticeTitle: 'Aviso de Conformidade Jurídica:',
      counselNoticeText: 'O texto contratual deve ser apresentado como uma política comercial clara e deve ser revisto por assessoria jurídica qualificada antes da publicação definitiva para garantir conformidade com a legislação nigeriana e internacional aplicável.',
      copyright: 'NextSoftHR. Todos os direitos reservados.',
      slaCompliant: 'Conformidade SLA Enterprise',
      dataStandards: 'Normas NDPA e Proteção de Dados',
    },
    modals: {
      refundTitle: 'Submeter Pedido de Reembolso',
      refundSubtitle: 'Conforme descrito na Cláusula 17, forneça os detalhes completos da fatura e da transação para auditoria célere pela Faturação NextSoftHR.',
      partnerTitle: 'Contactar Equipa de Parceiros NextSoftHR',
      partnerSubtitle: 'Suporte especializado para Revendedores, Distribuidores, Afiliados e Alianças de Consultoria (Cláusulas 11–14 e 18).',
      close: 'Fechar Janela',
      cancel: 'Cancelar',
      submit: 'Submeter Pedido',
      validating: 'A validar...',
      transmitting: 'A transmitir...',
    },
    liveChat: {
      title: 'Suporte NextSoftHR',
      status: 'Agentes Online · Resposta média < 2 min',
      hours: 'Horário de atendimento: 8h00 – 18h00 (WAT)',
      welcomeMsg: 'Olá e bem-vindo ao Suporte NextSoftHR! Como podemos ajudar hoje com a sua subscrição, pedido de reembolso ou conta de parceiro?',
      openClaimForm: 'Abrir Formulário de Reembolso',
      openPartnerForm: 'Contactar Equipa de Parceiros',
      callDirect: 'Ligar Diretamente: +2349158482622',
      quickRefund: 'Pedido de reembolso',
      quickCancel: 'Dúvida cancelamento',
      quickPartner: 'Parceiro / Revenda',
      inputPlaceholder: 'Escreva a sua mensagem aqui...',
      buttonLabelOpen: 'Apoio em Direto',
      buttonLabelClose: 'Fechar Ajuda',
    },
  },

  es: {
    nav: {
      overview: 'Descripción General',
      customers: 'Clientes y Suscripciones',
      partners: 'Distribuidores y Socios',
      commercial: 'Términos Comerciales',
      faqs: 'Preguntas Frecuentes',
      contact: 'Contacto',
      partnerDesk: 'Mesa de Socios',
      submitClaim: 'Solicitar Reembolso',
      refundDesk: 'Oficina de Reembolsos',
      callUs: 'Llamar',
    },
    hero: {
      breadcrumbHome: 'NextSoftHR',
      breadcrumbLegal: 'Legal y Cumplimiento',
      breadcrumbCurrent: 'Política de Reembolso y Cancelación',
      effective: 'Vigencia:',
      updated: 'Actualizado:',
      versionPrefix: 'v',
      trustKicker: 'Marco Comercial y de Cumplimiento Global NextSoftHR',
      headline: 'Política de Reembolso y Cancelación',
      subheadline: 'Pautas claras, transparentes y justas de pago, cancelación y reembolso para clientes y socios comerciales de NextSoftHR.',
      supportingText: 'En NextSoftHR creemos en relaciones comerciales transparentes. Esta política explica cómo se gestionan cancelaciones, reembolsos, créditos, pagos de suscripción, servicios profesionales y operaciones con distribuidores y socios.',
      contactSupport: 'Contactar Soporte',
      contactPartnerTeam: 'Equipo de Socios',
      printTooltip: 'Imprimir o Guardar en PDF',
      shareTooltip: 'Copiar enlace a esta política',
      linkCopied: '¡Enlace copiado!',
      complianceNote: 'Cumplimiento Global Multi-Inquilino y Empresarial',
      cardJurisdiction: 'Jurisdicción Legal:',
      cardJurisdictionVal: 'Nigeria y Operaciones Transfronterizas',
      cardScope: 'Alcance de Auditoría:',
      cardScopeVal: 'SaaS, VAR, Distribuidores, Socios',
      cardCurrency: 'Monedas de Facturación:',
      cardSupportDesk: 'Mesa de Facturación:',
      cardHelpline: 'Línea Telefónica Directa:',
      cardTip: '¿Requiere asistencia inmediata? Las solicitudes tramitadas por la Mesa de Facturación se resuelven en 48 a 72 horas hábiles.',
    },
    summaryCard: {
      header: 'Matriz Resumen de Políticas · Seleccione su Relación Comercial:',
      subHeader: 'Haga clic en cualquier categoría para revisar sus términos específicos',
      refundWindow: 'Plazo y Elegibilidad de Reembolso',
      cancellationProcedure: 'Procedimiento de Cancelación',
      financialNotice: 'Aviso Financiero y de Comisiones',
      governingClauses: 'Cláusulas Aplicables',
      directJump: 'Acceso Directo',
      readFullPolicy: 'Leer las 25 Cláusulas de la Política en Detalle',
      categories: {
        Customers: {
          title: 'Suscriptores Directos y Clientes SaaS',
          badge: 'Usuarios Finales Estándar y Empresariales',
          description: 'Abarca suscriptores mensuales, empresas con contratos anuales, evaluadores de prueba y organizaciones que licencian módulos adicionales de RR. HH. y nómina.',
          refundWindow: '14 días naturales para suscripciones anuales; no reembolsable en periodos mensuales activos; reembolso total en cobros dobles verificados o fallas técnicas críticas.',
          cancellationRule: 'Cancelación disponible en cualquier momento desde la Consola de Administración. Los cobros automáticos futuros se detienen de inmediato y el acceso continúa hasta fin del ciclo.',
          financialImpact: 'Exportación de datos disponible durante 30 días posteriores al vencimiento. Los días no utilizados del mes activo no son reembolsables en efectivo.',
        },
        Resellers: {
          title: 'Distribuidores de Valor Añadido Autorizados (VAR)',
          badge: 'Canales de Reventa e Integradores',
          description: 'Entidades comerciales autorizadas por NextSoftHR para comercializar nuestras licencias junto con sus servicios contables o de administración de nómina.',
          refundWindow: 'Regido rigurosamente por el Acuerdo de Reventa. Los distribuidores no pueden prometer políticas que superen las directrices oficiales de NextSoftHR.',
          cancellationRule: 'Las cancelaciones de clientes finales deben tramitarse mediante el Portal de Canales para sincronizar los libros contables.',
          financialImpact: 'Los reembolsos a clientes finales reducen el valor comisionable. Los márgenes ya liquidados se deducen de facturaciones futuras.',
        },
        Distributors: {
          title: 'Distribuidores Mayoristas Principales',
          badge: 'Operadores de Licencias Masivas',
          description: 'Socios de distribución regional que adquieren bancos prepagados de licencias y capacidad empresarial para su distribución en mercados locales.',
          refundWindow: 'Los lotes de licencias al por mayor no son reembolsables tras su asignación. Los cupos no utilizados pueden reasignarse entre módulos según convenio.',
          cancellationRule: 'Compromisos comerciales regidos por Órdenes de Compra (PO) vinculantes y cuotas anuales de distribución.',
          financialImpact: 'Cancelaciones de clientes pueden generar Notas de Crédito Comercial aplicables a renovaciones mayoristas futuras.',
        },
        Partners: {
          title: 'Alianzas Tecnológicas y de Consultoría',
          badge: 'Firmas Contables, RR. HH. e Integradores',
          description: 'Consultores independientes y despachos contables que implementan y recomiendan la plataforma NextSoftHR a sus clientes corporativos.',
          refundWindow: 'Las comisiones por referencia se consolidan 30 días después del cobro efectivo. Cancelaciones en este plazo anulan la comisión respectiva.',
          cancellationRule: 'La baja del cliente activa un reajuste contable automático en el panel de Operaciones de Socios.',
          financialImpact: 'Ajustes por contracargos o controversias de pago. Estados de cuenta auditables emitidos en cada ciclo de liquidación.',
        },
        Affiliates: {
          title: 'Afiliados y Promotores Comerciales',
          badge: 'Referenciadores Comerciales',
          description: 'Profesionales y plataformas que difunden e introducen nuevas organizaciones al ecosistema empresarial de NextSoftHR.',
          refundWindow: 'Comisiones en custodia durante el periodo de evaluación de 30 días del cliente; liberadas tras confirmación de ingreso definitivo.',
          cancellationRule: 'Si el cliente cancela o desconoce la transacción dentro de los 30 días, la asignación de comisión queda sin efecto.',
          financialImpact: 'Tolerancia cero contra autorreferencias o abusos en promociones. Las comisiones indebidas son canceladas de inmediato.',
        },
      },
    },
    tableOfContents: {
      searchTitle: 'Buscar Cláusulas de la Política',
      searchPlaceholder: 'Buscar ej. contracargo, reembolso, VAR...',
      clear: 'Borrar',
      filterScope: 'Filtrar por Ámbito',
      all: 'Todos',
      tableTitle: 'Índice de Cláusulas',
      of: 'de',
      noClausesMatch: 'No se encontraron cláusulas coincidentes. Intente con otro término.',
      frequentlyAsked: 'Preguntas Frecuentes',
      directContact: 'Contacto Directo y Soporte',
      printExport: 'Imprimir / Exportar Documento Legal',
    },
    faq: {
      kicker: 'Consultas Comerciales y Aclaraciones',
      title: 'Preguntas Frecuentes',
      subtitle: 'Respuestas prácticas sobre cancelaciones, plazos de reembolso, comisiones, ajustes de socios y custodia de datos.',
      searchPlaceholder: 'Buscar en preguntas frecuentes...',
      expandAll: 'Expandir Todo',
      collapseAll: 'Contraer Todo',
      verifiedStandard: 'Norma Oficial de la Política',
      noResults: 'No se encontraron preguntas. Puede contactar directamente a nuestra Mesa de Facturación.',
      allQuestions: 'Todas las Preguntas',
    },
    contact: {
      kicker: 'Atención Comercial y Resolución de Controversias NextSoftHR',
      headline: '¿Necesita Ayuda con un Reembolso o Cancelación?',
      text: 'Nuestros equipos de soporte y canales están a su entera disposición para orientarle en opciones de facturación, cancelación y reembolso.',
      contactSupport: 'Contactar Soporte',
      contactPartnerTeam: 'Equipo de Socios',
      websiteLabel: 'Sitio Web:',
      phoneLabel: 'Teléfono:',
      standardsTitle: 'Estándares Operativos de Facturación',
      hoursLabel: 'Horario de Atención:',
      hoursVal: 'Lunes a viernes de 8:00 a 18:00 (WAT / UTC+1). Clientes Enterprise cuentan con cobertura SLA prioritaria 24/7.',
      responseLabel: 'Plazo de Respuesta:',
      responseVal: 'Toda solicitud documentada de reembolso o revisión de cobros recibe dictamen inicial en 48 a 72 horas hábiles.',
      channelLabel: 'Atención Exclusiva para Socios:',
      channelVal: 'Distribuidores y socios certificados cuentan con un especialista dedicado de Operaciones de Canal.',
      directMailNote: 'Correspondencia formal puede remitirse a: NextSoftHR Global Commercial Legal & Billing Affairs, support@nextsofthr.org.',
    },
    footer: {
      tagline: 'NextSoftHR es una plataforma global de gestión de RR. HH., nómina y administración de negocios que atiende a micro, pequeñas, medianas y grandes empresas a escala internacional.',
      productCol: 'Producto',
      companyCol: 'Empresa',
      legalCol: 'Legal',
      contactCol: 'Contacto',
      submitRequestBtn: 'Solicitar Reembolso',
      counselNoticeTitle: 'Aviso de Cumplimiento Legal:',
      counselNoticeText: 'El texto legal debe presentarse como una política comercial clara y debe ser revisado por asesoría legal calificada antes de su publicación para garantizar cumplimiento con las leyes de Nigeria y jurisdicciones donde opera NextSoftHR.',
      copyright: 'NextSoftHR. Todos los derechos reservados.',
      slaCompliant: 'Conforme con SLA Empresarial',
      dataStandards: 'Estándares NDPA y Protección de Datos',
    },
    modals: {
      refundTitle: 'Presentar una Solicitud de Reembolso',
      refundSubtitle: 'Conforme a la Sección 17, proporcione los datos completos de factura y transacción para una auditoría expedita por Facturación NextSoftHR.',
      partnerTitle: 'Contactar al Equipo de Socios NextSoftHR',
      partnerSubtitle: 'Soporte especializado para Distribuidores Autorizados, Mayoristas, Afiliados y Alianzas de Consultoría (Secciones 11–14 y 18).',
      close: 'Cerrar Ventana',
      cancel: 'Cancelar',
      submit: 'Enviar Solicitud',
      validating: 'Validando...',
      transmitting: 'Transmitiendo...',
    },
    liveChat: {
      title: 'Soporte NextSoftHR',
      status: 'Agentes en línea · Respuesta prom. < 2 min',
      hours: 'Horario de atención: 8:00 – 18:00 (WAT)',
      welcomeMsg: '¡Hola y bienvenido a Soporte NextSoftHR! ¿En qué podemos ayudarle hoy respecto a su suscripción, reembolso o cuenta de socio?',
      openClaimForm: 'Abrir Formulario de Reembolso',
      openPartnerForm: 'Contactar Equipo de Socios',
      callDirect: 'Llamada Directa: +2349158482622',
      quickRefund: 'Consulta reembolso',
      quickCancel: 'Cancelar plan',
      quickPartner: 'Socio / Distribuidor',
      inputPlaceholder: 'Escriba su mensaje aquí...',
      buttonLabelOpen: 'Soporte en Vivo',
      buttonLabelClose: 'Cerrar Ayuda',
    },
  },
};
