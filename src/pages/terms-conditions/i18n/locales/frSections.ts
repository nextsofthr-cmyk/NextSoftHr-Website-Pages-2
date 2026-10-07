import { SectionTranslationMeta } from '../types';

export const FR_SECTIONS: Record<string, SectionTranslationMeta> = {
  introduction: {
    title: 'Introduction & Objet de la Plateforme',
    category: 'General',
    summary: 'NextSoftHR fournit une plateforme logicielle mondiale de gestion RH, de paie et d’entreprise sur le cloud. Les présentes Conditions régissent l’ensemble des relations contractuelles.',
    paragraphs: [
      'NextSoftHR Ltd. (« NextSoftHR », « nous », « notre » ou « nos ») développe et commercialise une suite logicielle infonuagique intégrée dédiée à la gestion du personnel, au traitement automatisé de la paie, au pointage du temps de travail, au suivi des congés, au recrutement (ATS), aux relations clients (CRM), au contrôle financier opérationnel, à la gestion de projets et aux processus d’entreprise afférents.',
      'Les présentes Conditions Générales d’Utilisation (les « Conditions » ou le « Contrat ») constituent un accord juridique contraignant entre NextSoftHR et la personne morale ou physique (« Client », « vous » ou « votre ») accédant à nos services, s’inscrivant sur la plateforme ou souscrivant un plan commercial.',
      'En accédant au site web www.nextsofthr.org, en créant un compte organisationnel, en téléchargeant nos applications ou en utilisant nos interfaces de programmation (API), vous reconnaissez avoir lu, compris et accepté sans réserve d’être lié par ces Conditions.'
    ],
    bulletPoints: [
      'Applicable aux structures micro, PME, ETI et grandes entreprises multinationales.',
      'Régit l’ensemble des modules opérationnels, portails salariés et services managés.',
      'Prévoit un engagement d’adhésion préalable obligatoire avant toute exécution de paie.'
    ]
  },

  'acceptance-of-terms': {
    title: 'Acceptation des Conditions d’Utilisation',
    category: 'General',
    summary: 'L’utilisation des services implique l’acceptation pleine et entière des présentes conditions par un représentant dument habilité de votre organisation.',
    highlightBoxTitle: 'Avis d’Examen Juridique Obligatoire',
    highlightBoxText: 'Veuillez lire attentivement ces Conditions avant d’effectuer la paie de vos salariés ou de valider vos accès organisationnels.',
    paragraphs: [
      'En cochant la case d’acceptation lors de votre inscription, en validant un bon de commande (Order Form) ou en continuant d’utiliser la Plateforme, vous confirmez votre adhésion irrévocable à l’intégralité des clauses stipulées dans le présent document.',
      'Si vous concluez cet accord au nom d’une société, institution ou autre entité juridique, vous déclarez et garantissez disposer du pouvoir légal et statutaire nécessaire pour engager ladite entité vis-à-vis de NextSoftHR.',
      'Si vous n’acceptez pas ces Conditions ou ne disposez pas des pouvoirs de représentation requis, vous devez immédiatement cesser tout accès et vous abstenir d’utiliser la Plateforme NextSoftHR.'
    ]
  },

  definitions: {
    title: 'Définitions & Terminologie Contractuelle',
    category: 'General',
    summary: 'Terminologie juridique fondamentale définie avec précision pour assurer une parfaite transparence dans toutes les juridictions internationales et africaines.',
    paragraphs: [
      'Dans le cadre des présentes Conditions, les termes débutant par une majuscule revêtent la signification qui leur est expressément conférée dans le glossaire interactif ci-après ainsi que dans l’ensemble du corps contractuel.',
      'Ces définitions s’appliquent indifféremment au singulier et au pluriel ainsi qu’à toutes leurs déclinaisons grammaticales directes.'
    ]
  },

  eligibility: {
    title: 'Éligibilité & Capacité Juridique',
    category: 'General',
    summary: 'La Plateforme est réservée aux entreprises et professionnels majeurs juridiquement habilités, excluant tout usage domestique ou de consommation personnelle.',
    paragraphs: [
      'NextSoftHR est une solution exclusivement professionnelle destinée aux entreprises (B2B). Pour être éligible à la création d’un compte et à la souscription de nos services, le Client doit être une entreprise légalement immatriculée ou un travailleur indépendant dûment déclaré selon la législation de son pays d’établissement.',
      'Tout Utilisateur individuel agissant sur la Plateforme doit être âgé d’au moins dix-huit (18) ans ou avoir atteint la majorité légale en vigueur dans sa juridiction de rattachement.',
      'La Plateforme n’est pas conçue ni concédée sous licence pour des besoins personnels, familiaux ou domestiques de consommateurs au sens du droit de la consommation.'
    ]
  },

  'account-registration': {
    title: 'Inscription du Compte & Sécurité des Accès',
    category: 'General',
    summary: 'Le Client doit fournir des données précises, protéger rigoureusement ses identifiants et assumer la pleine responsabilité de la gestion de ses Administrateurs.',
    paragraphs: [
      'Lors de la création de son compte organisationnel, le Client s’engage à fournir des renseignements d’entreprise véridiques, exacts, exhaustifs et continuellement actualisés (raison sociale, numéro d’immatriculation fiscale, pays de rattachement, identité des administrateurs habilités).',
      'Le Client est seul responsable du maintien de la stricte confidentialité de ses identifiants de connexion, mots de passe et clés d’API secrètes. Toute activité initiée au moyen des identifiants attribués au Client est réputée avoir été valablement autorisée par ce dernier.',
      'L’Administrateur principal du compte possède les prérogatives pour créer, révoquer ou moduler les accès des employés et des managers. En cas de suspicion de compromission d’un identifiant ou d’intrusion non autorisée, le Client s’engage à notifier sans délai NextSoftHR à l’adresse security@nextsofthr.org.'
    ],
    bulletPoints: [
      'Obligation d’activation de l’authentification multifacteur (MFA/2FA) pour les rôles administratifs.',
      'Révocation immédiate requise lors du départ ou du changement de poste d’un collaborateur.',
      'Interdiction absolue de partage d’identifiant unique entre plusieurs personnes physiques.'
    ]
  },

  'user-responsibilities': {
    title: 'Responsabilités de l’Utilisateur & Usage Acceptable',
    category: 'General',
    summary: 'Interdiction stricte de toute rétro-ingénierie, tentative de piratage, injection de code malveillant ou traitement frauduleux de la paie.',
    paragraphs: [
      'Le Client s’engage à utiliser la Plateforme NextSoftHR en parfaite conformité avec les lois et réglementations en vigueur, y compris les dispositions relatives au droit du travail, à la fiscalité des rémunérations et à la protection des données personnelles.',
      'Il est formellement interdit au Client et à l’ensemble de ses Utilisateurs de :',
      'Toute violation avérée des présentes règles d’usage constitue un manquement substantiel autorisant NextSoftHR à suspendre ou résilier l’accès sans préavis ni indemnité.'
    ],
    bulletPoints: [
      'Désosser, décompiler, désassembler ou tenter d’extraire le code source de la Plateforme.',
      'Contourner, neutraliser ou tester les mécanismes de sécurité et de contrôle d’accès sans accord préalable écrit.',
      'Téléverser ou propager des virus, vers, chevaux de Troie ou tout code informatique nocif.',
      'Effectuer des calculs de salaires fictifs ou des transactions de paie sciemment erronées ou frauduleuses.',
      'Collecter massivement des données d’autres clients ou perturber la stabilité de l’infrastructure cloud collective.'
    ]
  },

  'platform-use': {
    title: 'Utilisation de la Plateforme NextSoftHR',
    category: 'Modules',
    summary: 'NextSoftHR concède un droit d’accès révocable, non exclusif et non transférable aux modules souscrits pour les besoins stricts de l’organisation cliente.',
    paragraphs: [
      'Sous réserve du complet paiement des forfaits applicables et du respect des présentes Conditions, NextSoftHR octroie au Client un droit personnel, révocable, non exclusif et non transférable d’accès et d’utilisation de la Plateforme dans le monde entier, pour ses stricts besoins de gestion opérationnelle interne.',
      'Le périmètre exact des fonctionnalités mises à disposition dépend des modules activés lors de la commande (Gestion RH, Paie, Présences, Congés, Recrutement, CRM, Finance, Gestion de Projets, Portails Salariés et Managers).'
    ]
  },

  'hr-management': {
    title: 'Services de Gestion des Ressources Humaines (RH)',
    category: 'Modules',
    summary: 'Centralisation des dossiers du personnel, organigrammes, gestion de l’intégration, conformité administrative et suivi du cycle de vie des collaborateurs.',
    paragraphs: [
      'Le module de gestion RH permet au Client de structurer ses entités juridiques, d’administrer les fiches collaborateurs (contrats, pièces d’identité, diplômes, coordonnées d’urgence), de modéliser les organigrammes et de piloter les processus d’intégration (onboarding) et de départ (offboarding).',
      'Le Client conserve la maîtrise totale du choix des champs personnalisés et veille à ne collecter que les données proportionnées et strictement nécessaires à l’exécution des contrats de travail de ses collaborateurs.'
    ]
  },

  'payroll-services': {
    title: 'Services & Traitement de Paie',
    category: 'Modules',
    summary: 'Moteur de calcul automatisé brut-en-net et génération des états de paie. Le Client demeure seul garant de l’audit de ses paramètres fiscaux et sociaux.',
    highlightBoxTitle: 'Avis sur la Vérification de Paie',
    highlightBoxText: 'Avant toute émission de virement salarial, le Client doit vérifier les montants et coordonnées bancaires. NextSoftHR n’est pas un cabinet comptable ni un conseiller fiscal.',
    paragraphs: [
      'NextSoftHR fournit un moteur de paie performant permettant la définition de grilles indiciaires, de rubriques de gains, de primes contractuelles, d’avantages en nature et de déductions fiscales et sociales obligatoires.',
      'Le Client reconnaît expressément que NextSoftHR n’agit pas en tant qu’expert-comptable, conseiller fiscal ou officier public. Le Client est tenu de configurer, vérifier et valider l’exactitude de ses taux de retenues fiscales, barèmes de sécurité sociale et conventions collectives avant tout décaissement de salaires.',
      'NextSoftHR décline toute responsabilité en cas d’erreurs de calcul résultant de données de pointage erronées, de paramétrages fiscaux inexacts ou d’omissions imputables au Client.'
    ]
  },

  'employee-self-service': {
    title: 'Espace Salarié en Libre-Service (ESS)',
    category: 'Modules',
    summary: 'Portail web et mobile permettant aux collaborateurs autorisés de consulter leurs fiches de paie, poser leurs congés et mettre à jour leurs informations.',
    paragraphs: [
      'Le portail ESS offre aux salariés un accès sécurisé à leurs bulletins de paie dématérialisés, à l’historique de leurs soldes de congés, à leurs attestations d’emploi et à la soumission dématérialisée de leurs notes de frais.',
      'Chaque employé est responsable de la conservation confidentielle de ses identifiants. L’accès à l’ESS est immédiatement suspendu dès la notification formelle de rupture du contrat de travail par le Client.'
    ]
  },

  'time-attendance': {
    title: 'Gestion des Temps de Travail & Présences',
    category: 'Modules',
    summary: 'Pointeuse numérique, gestion des plannings et calcul des heures supplémentaires dans le respect des droits des salariés.',
    paragraphs: [
      'Ce module gère le suivi des horaires de travail, le pointage via pointeuses physiques ou géolocalisées sur smartphone, l’affectation des équipes en rotation et le calcul automatisé des heures supplémentaires.',
      'Le Client garantit qu’il a recueilli l’ensemble des accords et autorisations nécessaires auprès de son personnel et des instances représentatives compétentes pour tout recours à des dispositifs de pointage géolocalisé ou biométrique.'
    ]
  },

  'leave-management': {
    title: 'Gestion des Congés & Absences',
    category: 'Modules',
    summary: 'Décompte automatisé des droits à congés, circuits de validation hiérarchiques et intégration automatique aux variables de paie.',
    paragraphs: [
      'Le Client configure ses règles d’acquisition de congés payés, congés de maternité/paternité, absences pour événements familiaux et arrêts maladie conformément au droit applicable.',
      'Les validations ou refus de congés sont consignés avec traçabilité et horodatage dans le journal d’audit de la Plateforme.'
    ]
  },

  'recruitment-talent': {
    title: 'Recrutement & Gestion des Talents (ATS)',
    category: 'Modules',
    summary: 'Publication d’offres d’emploi, suivi des candidatures en mode Kanban, entretiens et édition de promesses d’embauche.',
    paragraphs: [
      'L’outil ATS permet la diffusion d’offres d’emploi, la centralisation des CV et la conduite de grilles d’évaluation des candidats. Le Client garantit respecter le principe de non-discrimination à l’embauche.',
      'Les données des candidats non retenus doivent être purgées ou conservées selon les durées légales prévues par la réglementation sur la protection des données.'
    ]
  },

  'crm-business-features': {
    title: 'CRM & Relations Commerciales',
    category: 'Modules',
    summary: 'Suivi des comptes clients, contrats de prestations associées et historique d’échanges pour les entreprises de services.',
    paragraphs: [
      'Les fonctionnalités CRM intégrées facilitent la liaison entre les contrats de prestations signés avec vos donneurs d’ordre et les équipes de collaborateurs détachées sur le terrain.',
      'Le Client assure détenir les consentements commerciaux requis pour tout enregistrement de contacts d’affaires.'
    ]
  },

  'project-task-management': {
    title: 'Gestion de Projets & des Tâches',
    category: 'Modules',
    summary: 'Planification d’activités, affectation des ressources, saisie des temps passés et suivi de la rentabilité opérationnelle.',
    paragraphs: [
      'Permet de décomposer les projets en tâches, d’assigner des collaborateurs, d’imputer des heures travaillées et d’alimenter automatiquement la refacturation et le suivi de rentabilité.',
      'La responsabilité de l’exactitude des imputations horaires saisies par les équipes incombe au chef de projet désigné par le Client.'
    ]
  },

  'third-party-integrations': {
    title: 'Intégrations & Connecteurs Tiers',
    category: 'Modules',
    summary: 'Interconnexion avec les banques, plateformes de télédéclaration fiscale, outils comptables et annuaires SSO d’entreprise.',
    paragraphs: [
      'NextSoftHR met à disposition des connecteurs vers des systèmes tiers (passerelles bancaires pour ordres de virement SEPA/SWIFT, logiciels ERP comptables, fournisseurs SSO Azure AD/Google Workspace).',
      'L’activation de ces intégrations peut exiger des abonnements distincts auprès des éditeurs tiers concernés et demeure sous le contrôle direct de l’Administrateur du Client.'
    ]
  },

  'subscription-plans': {
    title: 'Formules d’Abonnement & Tarifs',
    category: 'Commercial',
    summary: 'Abonnements modulaires mensuels ou annuels calculés selon le nombre d’employés actifs et les fonctionnalités souscrites.',
    paragraphs: [
      'L’accès à NextSoftHR s’effectue sous forme d’abonnement renouvelable. La tarification est fonction des modules choisis et du volume d’employés enregistrés sur la période de facturation.',
      'Toute augmentation du nombre de salariés actifs au-delà du seuil convenu entraînera un ajustement automatique au prorata sur la facturation suivante.',
      'Les prix sont stipulés hors taxes applicables (TVA, taxe sur les ventes ou retenues à la source locales), qui demeurent à la charge exclusive du Client.'
    ]
  },

  'free-trials': {
    title: 'Périodes d’Essai Gratuit & Offres Spéciales',
    category: 'Commercial',
    summary: 'Conditions de mise à disposition des environnements d’évaluation sans engagement pour tester les fonctionnalités de la plateforme.',
    paragraphs: [
      'NextSoftHR peut proposer une période d’essai gratuit d’une durée standard de quatorze (14) ou trente (30) jours pour permettre aux organisations d’évaluer la solution.',
      'Pendant l’essai, certaines fonctionnalités critiques telles que l’émission de réels virements bancaires peuvent être restreintes à un mode simulation.',
      'À l’issue de la période d’essai, sans souscription formelle à une formule payante, l’accès est suspendu et les données de test sont conservées pendant trente (30) jours avant purge définitive.'
    ]
  },

  'payment-billing': {
    title: 'Facturation & Modalités de Paiement',
    category: 'Commercial',
    summary: 'Règlement des factures par carte bancaire, prélèvement ou virement. Procédure en cas d’impayé ou de rejet de paiement.',
    paragraphs: [
      'Les abonnements sont payables d’avance selon la périodicité retenue (mensuelle ou annuelle). Le Client s’engage à renseigner un moyen de paiement valide et approvisionné.',
      'En cas d’échec de prélèvement, une mise en demeure automatique est adressée. Si l’impayé persiste au-delà d’un délai de quatorze (14) jours calendaires, NextSoftHR se réserve le droit de restreindre l’accès au compte jusqu’à régularisation intégrale.',
      'Aucun remboursement au prorata n’est accordé pour les résiliations anticipées en cours de période d’abonnement entamée.'
    ]
  },

  'suspension-termination': {
    title: 'Suspension & Résiliation du Compte',
    category: 'Commercial',
    summary: 'Modalités de résiliation à l’échéance contractuelle et conditions de suspension immédiate pour manquement grave aux obligations.',
    paragraphs: [
      'Chaque partie peut résilier l’abonnement à l’issue de la période en cours en respectant un préavis d’au moins trente (30) jours avant la date de renouvellement automatique.',
      'NextSoftHR peut suspendre ou clore un compte avec effet immédiat en cas de défaut de paiement persistant, de fraude caractérisée, de violation des droits de propriété intellectuelle ou d’atteinte à la sécurité du système.',
      'En cas de cessation du contrat, le Client dispose d’une fenêtre de trente (30) jours pour exporter l’intégralité de ses fiches de paie et données sociales sous formats standards (CSV, PDF, Excel).'
    ]
  },

  'data-ownership': {
    title: 'Propriété des Données du Client',
    category: 'Data & Security',
    summary: 'Le Client conserve la propriété absolue et exclusive de toutes les données relatives à ses employés, fiches de paie et opérations d’entreprise.',
    paragraphs: [
      'Le Client est et demeure l’unique propriétaire de toutes les données, fichiers de paie, pièces administratives et informations professionnelles téléversées sur son espace NextSoftHR (« Données Client »).',
      'NextSoftHR ne revendique aucun droit de propriété sur vos données d’entreprise. Vous nous concédez uniquement un droit d’hébergement et de traitement strictement restreint à la fourniture et à l’amélioration technique des services contractuels.'
    ]
  },

  'privacy-data-protection': {
    title: 'Protection de la Vie Privée & Données Personnelles',
    category: 'Data & Security',
    summary: 'Conformité rigoureuse aux réglementations mondiales et régionales sur la protection des données (RGPD, lois africaines de protection des données, DPA).',
    highlightBoxTitle: 'Accord de Traitement des Données (DPA)',
    highlightBoxText: 'Un Accord de Traitement des Données (DPA) formalisant nos engagements d’intégrité et de confidentialité est disponible sur simple demande.',
    actionLabel: 'Lire la Politique',
    paragraphs: [
      'NextSoftHR traite les données à caractère personnel dans le respect le plus strict des réglementations en vigueur, notamment le RGPD européen, le UK GDPR, la loi nigériane NDPA, la législation sud-africaine POPIA, la convention de l’Union Africaine de Malabo et les législations nationales francophones applicables.',
      'Dans le cadre de l’utilisation de la Plateforme, le Client agit en qualité de « Responsable du Traitement » et NextSoftHR agit en qualité de « Sous-Traitant » exécutant des opérations sur instructions documentées du Client.',
      'NextSoftHR s’engage à ne jamais vendre, louer ou commercialiser les données personnelles de vos salariés à des régies publicitaires ou courtiers de données.'
    ]
  },

  'security-safeguards': {
    title: 'Sécurité & Mesures Techniques de Protection',
    category: 'Data & Security',
    summary: 'Chiffrement de bout en bout (TLS 1.3 / AES-256), centres de données certifiés, sauvegardes automatiques et gestion stricte des habilitations RBAC.',
    paragraphs: [
      'NextSoftHR applique des mesures techniques et organisationnelles conformes aux standards les plus exigeants de l’industrie pour préserver la sécurité, l’intégrité et la disponibilité des données de paie et de RH.',
      'Les données sont chiffrées en transit au moyen de protocoles TLS 1.3 et chiffrées au repos via l’algorithme AES-256. L’infrastructure est hébergée au sein de centres de données hautement sécurisés bénéficiant de certifications SOC 2 Type II et ISO/IEC 27001.',
      'Des sauvegardes complètes redondantes sont opérées quotidiennement avec tests de restauration périodiques pour prémunir les organisations contre tout incident d’intégrité.'
    ]
  },

  confidentiality: {
    title: 'Confidentialité des Informations d’Entreprise',
    category: 'Data & Security',
    summary: 'Obligation mutuelle de secret professionnel couvrant les données salariales, éléments financiers et secrets d’affaires échangés.',
    paragraphs: [
      'Chaque partie s’engage à conserver dans la plus stricte confidentialité toutes les informations techniques, commerciales, financières ou salariales émanant de l’autre partie identifiées comme confidentielles.',
      'Cette obligation de secret demeure en vigueur pendant toute la durée de la relation contractuelle ainsi que pendant une période de cinq (5) années consécutives à compter de la résiliation effective du compte.'
    ]
  },

  'intellectual-property': {
    title: 'Propriété Intellectuelle de NextSoftHR',
    category: 'Legal & Compliance',
    summary: 'NextSoftHR est titulaire exclusif des droits d’auteur, brevets, marques et codes sources composant la plateforme et son identité visuelle.',
    paragraphs: [
      'L’ensemble des éléments composant la Plateforme NextSoftHR (codes sources, interfaces graphiques, ergonomie logicielle, algorithmes de calcul, documentation, logo et marques déposées) relève de la propriété exclusive de NextSoftHR Ltd. et de ses concédants de licence.',
      'Aucun droit de propriété industrielle ou intellectuelle n’est transféré au Client, à l’exception du droit d’utilisation nominatif prévu aux présentes.'
    ]
  },

  'user-content': {
    title: 'Contenu Téléversé par l’Utilisateur',
    category: 'Legal & Compliance',
    summary: 'Garantie du Client d’avoir recueilli les autorisations légales nécessaires pour héberger et traiter les données de ses employés sur la plateforme.',
    paragraphs: [
      'Le Client garantit posséder tous les droits, autorisations et consentements légaux nécessaires pour saisir, téléverser et traiter le Contenu et les données nominatives de son personnel sur la Plateforme.',
      'Le Client dégage NextSoftHR de toute réclamation ou recours intenté par un collaborateur ou candidat au titre d’une collecte illicite opérée par le Client.'
    ]
  },

  'third-party-services': {
    title: 'Services Tiers & Liens Externes',
    category: 'Legal & Compliance',
    summary: 'Exonération de responsabilité quant aux pannes, retards ou changements d’API imputables aux établissements bancaires ou partenaires externes.',
    paragraphs: [
      'La Plateforme peut comporter des liaisons vers des services tiers (banques, autorités fiscales, portails d’emploi). Ces prestations sont fournies selon les conditions propres à chaque partenaire externe.',
      'NextSoftHR ne saurait être tenu pour responsable de l’indisponibilité fortuite, des dysfonctionnements techniques ou des modifications unilatérales imposées par lesdits tiers.'
    ]
  },

  'service-availability': {
    title: 'Disponibilité du Service & Maintenance',
    category: 'Legal & Compliance',
    summary: 'Engagement d’un taux de disponibilité SaaS de 99,9 % hors fenêtres programmées de maintenance et incidents de réseaux télécoms majeurs.',
    paragraphs: [
      'NextSoftHR met en œuvre des moyens techniques raisonnables pour assurer une disponibilité ininterrompue de la Plateforme 24 heures sur 24 et 7 jours sur 7, visant un taux de disponibilité mensuel cible de 99,9 %.',
      'Des opérations de maintenance préventive peuvent être planifiées avec préavis pour maintenir la sécurité de l’infrastructure et déployer les évolutions logicielles.'
    ]
  },

  'software-updates': {
    title: 'Mises à Jour Logicielles & Évolutions',
    category: 'Legal & Compliance',
    summary: 'Déploiement continu d’améliorations ergonomiques, correctifs de sécurité et ajustements aux barèmes légaux de paie.',
    paragraphs: [
      'NextSoftHR enrichit en continu ses modules afin d’intégrer des optimisations fonctionnelles et de répondre aux évolutions réglementaires ou technologiques.',
      'Les mises à jour standard sont incluses dans le forfait sans supplément financier, à l’exception d’éventuels nouveaux modules optionnels commercialisés séparément.'
    ]
  },

  disclaimers: {
    title: 'Exclusion de Garanties & Déclarations',
    category: 'Legal & Compliance',
    summary: 'Fourniture du logiciel « en l’état ». NextSoftHR ne remplace pas l’appréciation humaine ni l’arbitrage juridique ou comptable du Client.',
    highlightBoxTitle: 'Rappel Déontologique Essentiel',
    highlightBoxText: 'NextSoftHR fournit un progiciel de calcul automatisé et ne dispense aucun conseil juridique, fiscal, social ou comptable personnalisé.',
    paragraphs: [
      'Sous réserve des garanties légales impératives, la Plateforme est fournie « en l’état » et « selon disponibilité ». NextSoftHR ne garantit pas que le logiciel sera totalement exempt d’anomalies mineures ou que son utilisation répondra sans ajustement à toutes les contraintes sectorielles particulières du Client.',
      'Il appartient au Client de superviser les résultats de calculs générés et de solliciter si besoin l’avis de professionnels du droit ou du chiffre qualifiés.'
    ]
  },

  'limitation-liability': {
    title: 'Limitation de Responsabilité',
    category: 'Legal & Compliance',
    summary: 'Plafond légal d’indemnisation égal aux sommes effectivement perçues par NextSoftHR au cours des 12 derniers mois et exclusion des préjudices indirects.',
    counselFlag: '[Validation Juridique Recommandée : Plafond standard de responsabilité SaaS]',
    paragraphs: [
      'Dans toute la mesure permise par le droit applicable, aucune des parties ne pourra être tenue responsable des dommages indirects, pertes de bénéfices, manques à gagner, préjudices d’exploitation ou atteintes à la réputation.',
      'La responsabilité globale cumulée de NextSoftHR envers le Client au titre de tout incident lié à l’exécution du Contrat est expressément plafonnée au montant total effectivement payé par le Client au titre de son abonnement au cours des douze (12) mois précédant le fait générateur.'
    ]
  },

  indemnification: {
    title: 'Indemnisation & Garantie d’Éviction',
    category: 'Legal & Compliance',
    summary: 'Garantie mutuelle protégeant le Client contre les revendications de contrefaçon logicielle et protégeant NextSoftHR contre l’usage illicite de données.',
    paragraphs: [
      'NextSoftHR indemnisera le Client contre toute réclamation de tiers établissant que la Plateforme NextSoftHR contrefait un brevet ou droit d’auteur valablement déposé, sous réserve d’en être notifié sans délai.',
      'Réciproquement, le Client s’engage à défendre et garantir NextSoftHR contre toute réclamation découlant d’une utilisation illicite de la Plateforme ou d’un manquement aux obligations sociales et fiscales incombant au Client.'
    ]
  },

  'force-majeure': {
    title: 'Force Majeure',
    category: 'Legal & Compliance',
    summary: 'Exonération temporaire en cas de catastrophe naturelle, guerre, pandémie, grève générale ou panne généralisée des réseaux électriques.',
    paragraphs: [
      'Aucune des parties ne sera tenue responsable d’un retard ou d’un défaut d’exécution de ses obligations résultant d’un événement de force majeure échappant à son contrôle raisonnable (catastrophes naturelles, conflits armés, attentats, cyberattaques étatiques massives, défaillances générales d’infrastructures internet).'
    ]
  },

  'governing-law': {
    title: 'Loi Applicable & Juridiction Compétente',
    category: 'Legal & Compliance',
    summary: 'Désignation de la loi applicable au contrat et clause attributive de compétence territoriale devant les tribunaux compétents.',
    counselFlag: '[À formaliser par la direction juridique : Siège social & Tribunaux compétents]',
    paragraphs: [
      'Les présentes Conditions et tout litige en découlant sont régis et interprétés selon les lois du siège social statutaire de NextSoftHR Ltd., sans égard aux règles régissant les conflits de lois.',
      'Les parties conviennent expressément de soumettre tout différend non résolu à l’amiable à la compétence exclusive des juridictions du siège statutaire de NextSoftHR.'
    ]
  },

  'dispute-resolution': {
    title: 'Règlement des Différends & Procédure d’Arbitrage',
    category: 'Legal & Compliance',
    summary: 'Engagement préalable de négociation amiable de 30 jours avant tout recours judiciaire ou procédure arbitrale commerciale.',
    paragraphs: [
      'En cas de contestation ou de litige survenant entre les parties, celles-ci s’engagent à tenter de résoudre leur différend par une négociation directe de bonne foi entre leurs dirigeants respectifs pendant un délai minimum de trente (30) jours.',
      'À défaut de conciliation amiable, le litige pourra être déféré à un tribunal arbitral indépendant ou aux juridictions compétentes selon les clauses particulières convenues au bon de commande.'
    ]
  },

  'changes-to-terms': {
    title: 'Modifications des Présentes Conditions',
    category: 'Legal & Compliance',
    summary: 'Préavis raisonnable de 30 jours pour les modifications contractuelles majeures avec mise à jour de la date de révision.',
    paragraphs: [
      'NextSoftHR se réserve la faculté d’actualiser périodiquement les présentes Conditions pour refléter les évolutions législatives, fiscales ou techniques.',
      'En cas de modification substantielle affectant les droits du Client, une notification lui sera adressée par courrier électronique ou par affichage visible sur la Plateforme au moins trente (30) jours avant son entrée en vigueur.'
    ]
  },

  'contact-information': {
    title: 'Informations de Contact & Canaux Officiels',
    category: 'Legal & Compliance',
    summary: 'Canaux de communication directs avec les départements Juridique, DPO, Conformité et Support de NextSoftHR.',
    highlightBoxTitle: 'Support Grands Comptes & Entreprises',
    highlightBoxText: 'Les clients disposant d’un contrat d’entreprise (Enterprise MSA) bénéficient d’un interlocuteur juridique et technique dédié.',
    paragraphs: [
      'Pour toute question, réclamation formelle ou demande relative aux présentes Conditions d’Utilisation, vous pouvez contacter notre service juridique via les canaux officiels ci-après :',
      'NextSoftHR Ltd. · Service Juridique & Conformité Mondiale · Site officiel : www.nextsofthr.org · Courrier électronique : legal@nextsofthr.org · Délégué à la Protection des Données : dpo@nextsofthr.org · Sécurité des Systèmes : security@nextsofthr.org.'
    ]
  }
};
