import { Translations } from './types';

export const frTranslations: Translations = {
  nav: {
    platform: 'Plateforme',
    hrPayroll: 'RH & Paie',
    trustSecurity: 'Confiance & Sécurité',
    resources: 'Ressources',
    contact: 'Contact',
    signIn: 'Connexion',
    policyAdmin: 'Admin Politique',
    privacyDesk: 'Pôle Confidentialité',
    platformOverview: 'Aperçu de la Plateforme',
    securityArch: 'Architecture de Sécurité',
    yourRights: 'Vos Droits à la Vie Privée',
    contactDpo: 'Contacter le DPD/DPO',
    submitRequest: 'Déposer une Demande',
  },
  hero: {
    badge: 'Centre de Confiance & Conformité NextSoftHR',
    title: 'Politique de Confidentialité',
    subtitle:
      'Votre vie privée compte pour nous. Découvrez comment NextSoftHR collecte, utilise, protège et gère vos données personnelles lorsque vous utilisez notre plateforme et nos services.',
    lastUpdated: 'Dernière mise à jour :',
    version: 'Version',
    updateNotice: '(Mettre à jour la notice)',
    searchPlaceholder:
      "Rechercher dans les sections (ex. 'rétention', 'IA', 'cookies', 'droits')...",
    clear: 'Effacer',
    cookiePrefs: 'Préférences des Cookies',
    requestAssistance: 'Demander une Assistance Confidentialité',
    printPdf: 'Imprimer / PDF',
    governanceCore: 'Noyau de Gouvernance des Données',
    globalArch: 'Architecture Globale NextSoftHR',
    activeShield: 'Bouclier Actif',
    workforceIdentity: 'Identité RH & Paie Sécurisée',
    workforceSub: 'Dossiers du personnel · Salaires · Pointage',
    encryptionBridge: 'Chiffrement TLS 1.3 · AES-256 en Transit & Repos',
    cloudVault: 'Coffre Cloud & Sauvegardes Géodiversifiées',
    cloudVaultSub: 'Partitions chiffrées · Clichés quotidiens',
    aiEngine: 'IA Responsable & Automatisation',
    aiEngineSub: 'Supervision humaine · Télémétrie anonymisée',
    governedBadge: 'Gouverné',
    footerRegion: 'Afrique & Marchés Internationaux',
    structuredArticles: '16 Articles Structurés',
  },
  toc: {
    title: 'Table des Matières',
    readTime: '~8 min de lecture',
    needAssistance: 'Besoin d’aide ?',
    assistanceText:
      'Adressez vos questions relatives aux droits sur les données RH à notre Délégué à la Protection des Données.',
    contactTeam: 'Contacter l’Équipe Confidentialité →',
    section: 'Section',
    items: {
      introduction: 'Introduction',
      informationWeCollect: 'Informations Collectées',
      howWeUseInformation: 'Utilisation des Données',
      cookiesTracking: 'Cookies & Technologies de Traçage',
      dataSharing: 'Partage & Divulgation des Données',
      dataStorageSecurity: 'Stockage & Sécurité des Données',
      dataRetention: 'Conservation des Données',
      yourPrivacyRights: 'Vos Droits à la Vie Privée',
      employeeCustomerData: 'Données Collaborateurs & Clients',
      internationalTransfers: 'Transferts Internationaux de Données',
      thirdPartyServices: 'Services & Intégrations Tiers',
      childrensPrivacy: 'Protection des Mineurs',
      marketingCommunications: 'Communications Marketing',
      aiAutomatedProcessing: 'IA & Traitement Automatisé',
      changesToPolicy: 'Modifications de cette Politique',
      contactUs: 'Nous Contacter',
    },
  },
  policy: {
    sec1: {
      tag: 'Portée Générale',
      title: '1. Introduction',
      p1: "NextSoftHR ('NextSoftHR', 'nous', 'notre' ou 'nos') respecte la vie privée et les droits fondamentaux de protection des données de ses utilisateurs, employeurs, collaborateurs, prestataires indépendants, clients potentiels, partenaires commerciaux et visiteurs du site. Nous nous engageons à traiter les données professionnelles et personnelles selon des standards rigoureux de transparence, de légalité et de responsabilité.",
      p2: 'Cette Politique de Confidentialité décrit comment NextSoftHR collecte, utilise, stocke, protège et divulgue vos informations personnelles lorsque vous interagissez avec nous, notamment lorsque vous :',
      scopes: [
        'Visitez ou naviguez sur notre site officiel (www.nextsofthr.org)',
        'Créez, configurez ou administrez un compte d’entreprise',
        'Accédez à ou utilisez la suite logicielle cloud NextSoftHR',
        'Bénéficiez de nos services d’externalisation RH et de gestion de la paie',
        'Sollicitez nos équipes d’assistance technique et de succès client',
        'Demandez une démonstration logicielle ou un devis personnalisé',
        'Souscrivez à un abonnement logiciel ou à des offres commerciales',
        'Communiquez avec NextSoftHR par e-mail, messagerie instantanée ou téléphone',
        'Connectez des applications tierces intégrées et des interfaces API',
      ],
      boxTitle: 'Couverture Multi-Entreprise Complète',
      boxDesc:
        'NextSoftHR prend en charge l’ensemble des opérations de gestion d’entreprise : Gestion des Ressources Humaines, Gestion de la Paie, Temps & Présences, Espace Collaborateur (ESS), Espace Manager (MSS), Gestion des Congés, Plannings & Équipes, Recrutement & Talents, CRM, Finance, Projets & Tâches, Externalisation RH & Paie, Gestion Commerciale et Assistance RH propulsée par l’IA.',
    },
    sec2: {
      tag: 'Taxonomie des Données',
      title: '2. Informations que Nous Collectons',
      intro:
        'Nous collectons strictement les données personnelles adéquates, pertinentes et limitées à ce qui est strictement indispensable aux finalités opérationnelles pour lesquelles elles sont traitées. Nous ne sollicitons aucune donnée superflue.',
      categoryOf: 'Catégorie',
      processedElements: 'Exemples de Données Traitées :',
      adminNotice:
        'Les attributs de données sont configurés selon les politiques administratives et les droits d’accès définis par chaque entreprise cliente.',
      categories: [
        {
          title: 'Informations de Compte',
          desc: 'Identifiants personnels et coordonnées professionnelles fournis lors de la création ou de l’administration du compte.',
          items: [
            'Nom légal complet et nom d’usage',
            'Adresse e-mail professionnelle et directe',
            'Numéro de téléphone professionnel ou mobile',
            'Nom légal de l’entreprise et identifiant d’enregistrement',
            'Intitulé du poste, fonction hiérarchique et niveau d’accès',
            'Identifiants de connexion chiffrés et jetons d’authentification',
            'Langue du système, fuseau horaire et préférences d’interface',
          ],
        },
        {
          title: 'Informations Entreprise & Dossiers Collaborateurs',
          desc: 'Données organisationnelles et fiches des employés renseignées ou téléversées par les gestionnaires au sein de la plateforme.',
          items: [
            'Structure de l’entreprise, filiales et adresses des sites géographiques',
            'Organigrammes départementaux, hiérarchies et centres de coûts',
            'Profils individuels du personnel, contrats de travail et numéros d’immatriculation fiscale/sociale',
            'Calculs de salaires, grilles de rémunération, retenues et coordonnées bancaires',
            'Horaires de travail, relevés de pointage biométrique et récapitulatifs d’assiduité',
            'Soldes de congés payés, demandes d’absence et justificatifs médicaux',
            'Rotations d’équipes, plannings de travail et affectation des tâches',
          ],
        },
        {
          title: 'Informations Techniques & Matérielles',
          desc: 'Télémétrie générée automatiquement lors de l’accès aux interfaces web, mobiles ou API de NextSoftHR.',
          items: [
            'Adresse IP et localisation géographique approximative (niveau ville/pays)',
            'Famille de navigateur, version et configuration linguistique',
            'Système d’exploitation, modèle d’appareil et résolution d’écran',
            'Horodatages des sessions, fréquence des connexions et parcours de navigation',
            'Télémétrie de diagnostic, codes d’erreurs HTTP et métriques de charge',
            'Jetons de session, cookies d’authentification sécurisés et en-têtes CSRF',
          ],
        },
        {
          title: 'Communications & Support Client',
          desc: 'Échanges, tickets d’assistance et avis formulés lors des interactions de support.',
          items: [
            'Tickets d’assistance client, retranscriptions de chat et courriers d’échange',
            'Notes de démonstrations, besoins exprimés et cahiers des charges',
            'Réponses aux enquêtes de satisfaction et suggestions d’amélioration',
            'Correspondances relatives à la facturation, aux devis et aux abonnements',
          ],
        },
      ],
    },
    sec3: {
      tag: 'Finalités du Traitement',
      title: '3. Comment Nous Utilisons Vos Informations',
      intro:
        'Nous traitons vos données personnelles et professionnelles exclusivement pour des objectifs légitimes et documentés, fondés sur des bases légales explicites :',
      purposes: [
        {
          title: 'Fourniture des Services RH & Paie',
          desc: 'Exécution automatisée des bulletins de paie brut/net, déductions fiscales obligatoires, cotisations sociales et déclarations légales.',
        },
        {
          title: 'Gestion des Identités & Accès Sécurisés',
          desc: 'Authentification des utilisateurs autorisés, gestion des profils de permissions et application des règles de sécurité d’entreprise.',
        },
        {
          title: 'Gestion Centralisée du Personnel',
          desc: 'Organisation des fiches collaborateurs, des contrats, des contacts d’urgence et des parcours professionnels au sein de l’organisation.',
        },
        {
          title: 'Suivi du Temps, des Équipes & des Congés',
          desc: 'Enregistrement des plannings de travail, décompte des congés, synchronisation des pointages biométriques et calcul des heures supplémentaires.',
        },
        {
          title: 'Assistance Technique & Support Entreprise',
          desc: 'Résolution des tickets d’incident, accompagnement technique et respect des engagements de disponibilité (SLA).',
        },
        {
          title: 'Fiabilité & Performance de la Plateforme',
          desc: 'Surveillance continue de la santé des serveurs, des temps de réponse et du débit des transactions API.',
        },
        {
          title: 'Sécurité & Prévention des Fraudes',
          desc: 'Détection des attaques par force brute, prévention des intrusions et contrôle des actions administratives critiques.',
        },
        {
          title: 'Facturation & Abonnements Commerciaux',
          desc: 'Traitement des paiements d’abonnement, émission des factures proforma et gestion des renouvellements de licences.',
        },
        {
          title: 'Communications Opérationnelles Indispensables',
          desc: 'Envoi d’avis de sécurité, d’alertes de maintenance programmée et de notifications obligatoires sur la plateforme.',
        },
        {
          title: 'Communications Marketing Sollicitées',
          desc: 'Diffusion de webinaires, de guides pratiques et d’annonces de nouvelles fonctionnalités lorsque vous y avez expressément consenti.',
        },
        {
          title: 'Conformité Légale & Réglementaire',
          desc: 'Respect des législations du travail applicables, des obligations de déclaration fiscale et des réquisitions judiciaires valides.',
        },
        {
          title: 'Amélioration Continue des Produits',
          desc: 'Agrégation de métriques d’usage non identifiables pour optimiser l’ergonomie et simplifier les flux de travail RH.',
        },
      ],
    },
    sec4: {
      tag: 'Technologies Navigateurs',
      title: '4. Cookies et Technologies de Traçage',
      intro:
        'NextSoftHR et ses partenaires certifiés utilisent des cookies, des jetons HTTP sécurisés et le stockage local pour assurer la disponibilité de la plateforme, mémoriser vos préférences et mesurer l’audience.',
      types: [
        {
          title: 'Cookies Strictement Nécessaires',
          desc: 'Indispensables à l’authentification de session, à l’équilibrage de charge, à la sécurité CSRF et à la navigation.',
        },
        {
          title: 'Cookies de Fonctionnalité',
          desc: 'Mémorisent la langue de travail, l’espace entreprise actif, le fuseau horaire et les filtres personnalisés.',
        },
        {
          title: 'Cookies d’Analyse & Performance',
          desc: 'Mesurent de manière anonyme la vitesse de chargement des pages et l’utilisation des fonctionnalités clés.',
        },
        {
          title: 'Cookies de Préférences',
          desc: 'Retiennent la densité d’affichage des tableaux de bord et les réglages de pagination des listes.',
        },
        {
          title: 'Technologies de Sécurité',
          desc: 'Identifient les empreintes suspectes d’appareils pour bloquer les tentatives d’usurpation de compte.',
        },
      ],
      manageTitle: 'Gérer vos Préférences',
      manageDesc:
        'Vous pouvez à tout moment inspecter ou modifier votre consentement pour les cookies optionnels.',
      button: 'Préférences des Cookies',
      browserNote:
        'La plupart des navigateurs modernes permettent de bloquer ou filtrer les cookies via leurs paramètres. Veuillez noter que la désactivation des cookies essentiels peut empêcher votre accès au logiciel NextSoftHR.',
    },
    sec5: {
      tag: 'Sous-traitants & Tiers',
      title: '5. Partage et Divulgation des Données',
      intro:
        'NextSoftHR ne vend, ne loue, ni ne commercialise vos données personnelles à des courtiers en données ou régies publicitaires. Nous partageons les données strictement selon le principe du besoin d’en connaître avec les entités suivantes :',
      entities: [
        {
          title: 'Utilisateurs d’Entreprise Autorisés',
          desc: 'Collaborateurs et supérieurs habilités dans le cadre de votre compte d’entreprise selon les rôles définis par votre administrateur RH.',
        },
        {
          title: 'Hébergeurs Cloud & Infrastructure',
          desc: 'Centres de données cloud certifiés de classe mondiale, réseaux de diffusion de contenu (CDN) et partenaires de stockage chiffré.',
        },
        {
          title: 'Processeurs de Paiement & Banques',
          desc: 'Établissements financiers certifiés PCI-DSS permettant le virement direct des salaires et le règlement des abonnements.',
        },
        {
          title: 'Fournisseurs de Sécurité & d’Analyse',
          desc: 'Outils spécialisés dans la surveillance de disponibilité, la mitigation DDoS et la journalisation d’incidents.',
        },
        {
          title: 'Partenaires d’Intégration Logicielle',
          desc: 'Applications tierces que vous choisissez de connecter (comptabilité, pointeuses biométriques, outils collaboratifs).',
        },
        {
          title: 'Conseils Professionnels & Auditeurs',
          desc: 'Avocats, experts-comptables et auditeurs indépendants soumis au secret professionnel le plus strict.',
        },
        {
          title: 'Autorités Publiques & Réglementaires',
          desc: 'Administrations fiscales, inspection du travail ou juridictions uniquement sur réquisition légale formelle et obligatoire.',
        },
      ],
    },
    sec6: {
      tag: 'Architecture de Sécurité',
      title: '6. Stockage et Sécurité des Données',
      intro:
        'NextSoftHR applique des mesures techniques et organisationnelles de premier ordre conçues pour préserver les données contre tout accès non autorisé, divulgation, altération, perte ou destruction illicite. Bien qu’aucun système informatique ne puisse prétendre à une invulnérabilité absolue, nous mettons en œuvre une stratégie éprouvée de défense en profondeur.',
      standardTag: 'Pilier de Sécurité',
      pillars: [
        {
          title: 'Infrastructure Sécurisée',
          summary:
            'Environnements cloud renforcés hébergés dans des centres certifiés ISO Tier-III/IV.',
          details: [
            'Architecture multi-zones redondante sans point unique de défaillance',
            'Protection anti-DDoS et filtrage par pare-feu applicatif (WAF)',
            'Réseaux VPC étanches sans aucune base de données exposée publiquement',
          ],
        },
        {
          title: 'Contrôles d’Accès Rigoureux',
          summary:
            'Principe du moindre privilège appliqué à tous les échelons internes et clients.',
          details: [
            'Gestion granulaire des rôles (RBAC) pour les modules RH, Paie et Admin',
            'Authentification Multi-Facteurs (MFA/2FA) requise pour les privilèges élevés',
            'Fermeture automatique des sessions inactives et support SSO SAML/OIDC',
          ],
        },
        {
          title: 'Chiffrement des Données',
          summary:
            'Standards cryptographiques stricts protégeant les données en transit et au repos.',
          details: [
            'Protocole TLS 1.3 de bout en bout pour tous les flux sur réseaux publics',
            'Chiffrement matériel AES-256 bits pour les bases de données et sauvegardes',
            'Salage cryptographique et cycles réguliers de rotation des clés secrètes',
          ],
        },
        {
          title: 'Surveillance & Journal d’Audit',
          summary:
            'Visibilité continue, détection proactive des anomalies et pistes d’audit immuables.',
          details: [
            'Surveillance automatisée 24h/24 et 7j/7 des anomalies de connexion',
            'Journaux d’audit infalsifiables retraçant chaque modification de paie',
            'Tests d’intrusion réguliers et revues de code de sécurité indépendantes',
          ],
        },
        {
          title: 'Sauvegarde & Reprise d’Activité',
          summary:
            'Mécanismes de restauration fiables garantissant la continuité opérationnelle.',
          details: [
            'Snapshots quotidiens chiffrés répliqués sur des zones géographiques distinctes',
            'Objectifs RPO et RTO testés et validés lors d’exercices trimestriels',
            'Sauvegardes WORM (écriture unique, non modifiables) contre les rançongiciels',
          ],
        },
      ],
      userResponsibility:
        'Rappel sur la responsabilité utilisateur : Les utilisateurs sont tenus de préserver la confidentialité de leurs mots de passe, d’activer le MFA et d’interdire le partage d’identifiants de connexion.',
    },
    sec7: {
      tag: 'Calendrier de Rétention',
      title: '7. Conservation des Données',
      intro:
        'Nous ne conservons les données personnelles que pendant la durée raisonnablement indispensable à la réalisation des finalités pour lesquelles elles ont été recueillies, au maintien des comptes clients, au respect des contrats, des obligations fiscales et du droit du travail.',
      table: {
        thCategory: 'Catégorie de Données',
        thPurpose: 'Finalité Opérationnelle',
        thRetention: 'Durée de Conservation',
        thRationale: 'Fondement Légal',
      },
      rules: [
        {
          category: 'Dossiers du Personnel & Contrats',
          purpose:
            'Gestion de la relation contractuelle employeur-collaborateur et administration RH.',
          retentionPeriod:
            'Durée du contrat client + 7 ans (ou durée légale du travail)',
          statutoryBasis: 'Code du Travail & Règlements Sociaux',
        },
        {
          category: 'Bulletins de Paie & Déclarations Fiscales',
          purpose:
            'Contrôle des salaires, retenues à la source et cotisations de retraite obligatoires.',
          retentionPeriod:
            '6 à 10 ans après la clôture de l’exercice fiscal concerné',
          statutoryBasis: 'Législation Fiscale & Comptable',
        },
        {
          category: 'Journaux d’Audit & Connexions',
          purpose:
            'Surveillance de la sécurité, prévention des intrusions et analyses médico-légales.',
          retentionPeriod: '12 à 24 mois glissants à compter de l’événement',
          statutoryBasis: 'Intérêt Légitime de Cybersécurité',
        },
        {
          category: 'Correspondance & Support Client',
          purpose:
            'Historique des réclamations, résolution technique et suivi de la qualité de service.',
          retentionPeriod: '3 ans après la clôture définitive du ticket',
          statutoryBasis: 'Exécution Contractuelle & Support',
        },
        {
          category: 'Consentements Marketing & Prospects',
          purpose:
            'Gestion des préférences promotionnelles et envoi des nouveautés produits.',
          retentionPeriod: 'Jusqu’au retrait du consentement ou désinscription',
          statutoryBasis: 'Consentement Explicite',
        },
      ],
      expirationNote:
        'À l’issue des délais de conservation légaux, les données sont soit détruites de façon irréversible par écrasement cryptographique, soit définitivement anonymisées à des fins statistiques.',
    },
    sec8: {
      tag: 'Droits Légaux',
      title: '8. Vos Droits à la Vie Privée',
      intro:
        'Selon votre juridiction et les lois sur la protection des données applicables (telles que les lois nationales africaines sur les données personnelles, le RGPD ou conventions régionales), vous bénéficiez de droits clairs concernant vos informations :',
      rights: [
        {
          name: 'Droit d’Accès',
          desc: 'Obtenir la confirmation du traitement de vos données et en recevoir une copie intégrale.',
        },
        {
          name: 'Droit de Rectification',
          desc: 'Faire corriger ou actualiser des données inexactes, incomplètes ou obsolètes.',
        },
        {
          name: 'Droit à l’Effacement',
          desc: 'Demander la suppression de vos données personnelles sous réserve d’obligations légales.',
        },
        {
          name: 'Droit à la Limitation',
          desc: 'Geler temporairement le traitement de vos données lors de litiges ou vérifications.',
        },
        {
          name: 'Droit d’Opposition',
          desc: 'Vous opposer au traitement fondé uniquement sur l’intérêt légitime de l’entreprise.',
        },
        {
          name: 'Droit à la Portabilité',
          desc: 'Récupérer vos données fournies dans un format ouvert, structuré et lisible par machine.',
        },
        {
          name: 'Retrait du Consentement',
          desc: 'Retirer votre accord à tout moment lorsque le traitement repose sur votre consentement.',
        },
        {
          name: 'Réclamation auprès de l’Autorité',
          desc: 'Introduire un recours formel auprès de votre commission nationale de protection des données.',
        },
      ],
      ctaTitle: 'Besoin d’exercer vos droits sur vos données ?',
      ctaDesc:
        'Adressez une demande formelle directement à notre Délégué à la Protection des Données pour un traitement prioritaire.',
      ctaButton: 'Demander une Assistance Confidentialité',
    },
    sec9: {
      tag: 'Séparation des Rôles',
      title: '9. Données des Collaborateurs et Clients',
      intro:
        'Étant donné que NextSoftHR est une plateforme logicielle multi-entreprise de gestion RH et de paie, il est fondamental de distinguer clairement les responsabilités juridiques :',
      processorTitle: 'NextSoftHR en tant que Sous-Traitant (Prestataire)',
      processorDesc:
        'NextSoftHR met à disposition l’infrastructure cloud, les algorithmes de paie et les modules applicatifs. Nous traitons les données du personnel strictement selon les instructions documentées et les Accords de Traitement de Données (DPA) conclus avec nos entreprises clientes.',
      controllerTitle: 'L’Entreprise Cliente (Employeur) en tant que Responsable de Traitement',
      controllerDesc:
        'L’employeur ou organisation cliente décide souverainement des informations de ses employés à intégrer, des modes de pointage, des retenues salariales et des règles de conservation. L’employeur demeure personnellement responsable de ses obligations envers son personnel.',
      employeeNoticeTitle: 'Note aux Salariés et Prestataires :',
      employeeNoticeDesc:
        'Si vous êtes un employé utilisant l’Espace Collaborateur (ESS) NextSoftHR et souhaitez accéder à votre dossier RH ou corriger un bulletin, veuillez vous adresser en premier lieu à la direction RH de votre employeur. NextSoftHR apportera son concours technique immédiat pour répondre à toute demande légitime.',
    },
    sec10: {
      tag: 'Flux Transfrontaliers',
      title: '10. Transferts Internationaux de Données',
      intro:
        'NextSoftHR dessert des organisations sur l’ensemble du continent africain et à l’international. Par conséquent, les données traitées via notre plateforme peuvent transiter ou être hébergées dans des serveurs situés hors de votre pays de résidence.',
      p2: 'Lors de chaque transfert transfrontalier, nous veillons à la mise en place de garanties légales appropriées conformément aux réglementations de protection des données :',
      safeguards: [
        'Clauses Contractuelles Types (CCT) et Accords de Transfert imposant des obligations de confidentialité et de sécurité techniques strictes.',
        'Évaluations d’Impact sur les Transferts (TIA) examinant le niveau de protection juridique dans les pays de destination.',
        'Options de résidence régionale des données pour les grandes entreprises exigeant la localisation souveraine des données de paie.',
      ],
    },
    sec11: {
      tag: 'Écosystème & Intégrations',
      title: '11. Services et Intégrations Tiers',
      intro:
        'Notre plateforme s’interface facilement avec des services tiers tels que des passerelles bancaires, des logiciels comptables, des suites collaboratives, des fournisseurs d’authentification SSO et des infrastructures cloud.',
      p2: 'Veuillez noter que ces services tiers appliquent leurs propres politiques de confidentialité. Lorsque vous activez une passerelle tierce, nous vous conseillons vivement d’examiner leurs conditions d’utilisation avant d’autoriser le flux de données.',
    },
    sec12: {
      tag: 'Protection des Mineurs',
      title: '12. Protection de la Vie Privée des Enfants',
      intro:
        'NextSoftHR est une plateforme logicielle professionnelle exclusivement destinée aux entreprises, organisations et professionnels en activité. Elle n’est pas conçue pour ni destinée à recueillir des données de mineurs de moins de 16 ans (ou de l’âge légal de la majorité au travail en vigueur).',
      p2: 'Si nous apprenons que des données de mineurs ont été transmises sans l’autorisation vérifiée d’un tuteur ou représentant légal, nous prendrons immédiatement les mesures nécessaires pour les expurger de nos bases.',
    },
    sec13: {
      tag: 'Communications Commerciales',
      title: '13. Communications Marketing',
      intro:
        'NextSoftHR peut périodiquement adresser des informations sur ses produits, des invitations à des webinaires et des lettres d’information aux administrateurs enregistrés ou aux personnes ayant expressément sollicité ces informations.',
      boxTitle: 'Se Désinscrire des Communications Marketing',
      boxDesc:
        "Vous pouvez vous désabonner à tout moment en cliquant sur le lien 'Se désabonner' présent au bas de chaque e-mail, ou en saisissant directement votre adresse professionnelle ci-dessous :",
      inputPlaceholder: 'Saisissez votre adresse e-mail professionnelle',
      optOutButton: 'Se Désinscrire',
      optOutSuccess:
        'Désinscription prise en compte. Un délai de 48 heures peut être nécessaire pour la synchronisation complète.',
      transactionalNote:
        '*Attention : la désinscription marketing ne concerne pas les notifications techniques, alertes de paie, avis de sécurité ou factures indispensables au fonctionnement de votre compte.',
    },
    sec14: {
      tag: 'Technologie Intelligente',
      title: '14. Intelligence Artificielle et Traitement Automatisé',
      intro:
        'NextSoftHR intègre des fonctionnalités modernes d’intelligence artificielle conçues pour simplifier la gestion RH et fluidifier les processus d’entreprise. Nos assistants IA peuvent intervenir dans :',
      features: [
        'Réponses aux questions fréquentes sur le règlement intérieur',
        'Analyses prédictives d’assiduité et d’effectifs',
        'Vérifications de cohérence des calculs de paie',
        'Automatisation des parcours d’intégration des nouvelles recrues',
        'Synthèse des indicateurs de productivité organisationnelle',
        'Recommandations d’optimisation des plannings d’équipes',
        'Génération assistée de modèles d’attestations et courriers RH',
      ],
      governanceTitle: 'Gouvernance Responsable de l’IA & Supervision Humaine',
      governanceDesc:
        'Les entreprises clientes configurent et gèrent les modules IA sous leur propre responsabilité. Les suggestions automatisées et prévisions analytiques constituent des aides à la décision et ne sauraient tenir lieu de conseils juridiques ou fiscaux engageants.',
      hitlTitle: 'Principe Fondamental de l’Humain dans la Boucle (HITL) :',
      hitlDesc:
        'NextSoftHR applique fermement la règle selon laquelle aucune décision individuelle à impact juridique significatif sur un collaborateur (licenciement, sanction, révision salariale) ne peut résulter d’un traitement automatisé sans validation humaine formelle préalable.',
      disclaimer:
        'Nous ne garantissons pas que les propositions générées par l’IA soient totalement exemptes d’inexactitudes. Tout résultat doit obligatoirement être revu par un professionnel RH avant validation.',
    },
    sec15: {
      tag: 'Historique des Révisions',
      title: '15. Modifications de cette Politique',
      intro:
        'NextSoftHR se réserve le droit d’actualiser périodiquement cette Politique de Confidentialité pour refléter l’évolution de ses fonctionnalités logicielles, de ses pratiques de sécurité ou du cadre juridique.',
      p2: 'En cas de modification substantielle, nous publierons un préavis visible sur nos plateformes ou vous en informerons directement par e-mail avant l’entrée en vigueur des dispositions nouvelles.',
      statusLabel: 'Statut Actuel de la Politique :',
      effectiveLabel: 'En vigueur le',
      hideHistory: 'Masquer l’Historique',
      viewHistory: 'Historique des Versions',
    },
    sec16: {
      tag: 'Pôle DPD / DPO',
      title: '16. Nous Contacter',
      bannerTitle: 'Une Question sur Vos Données Personnelles ?',
      bannerDesc:
        'Pour toute interrogation, réclamation ou exercice de droits concernant le traitement de vos informations chez NextSoftHR, nos experts en protection des données sont à votre écoute.',
      orgLabel: 'Organisation',
      websiteLabel: 'Site Officiel',
      hotlineLabel: 'Ligne Dédiée Confidentialité',
      contactBtn: 'Nous Écrire',
      visitBtn: 'Visiter NextSoftHR',
      formTitle: 'Déposer une Demande Officielle de Confidentialité',
      formDesc:
        'Utilisez ce formulaire officiel pour soumettre une demande d’accès, de rectification, d’effacement ou toute question relative à vos données.',
    },
  },
  requestForm: {
    receivedTitle: 'Demande de Confidentialité Enregistrée',
    receivedDesc:
      'Votre requête a été transmise à notre Délégué à la Protection des Données. Un accusé de réception a été émis pour votre suivi.',
    ticketRef: 'Numéro de Suivi :',
    statutoryTime:
      'Conformément aux réglementations, les demandes sont traitées dans un délai de 30 jours après confirmation de votre identité.',
    submitAnother: 'Déposer une Nouvelle Demande',
    fullNameLabel: 'Nom et Prénom',
    fullNamePlaceholder: 'ex. Amadou Diallo',
    orgLabel: 'Entreprise / Organisation',
    orgPlaceholder: 'ex. Société Africaine d’Investissement',
    emailLabel: 'Adresse E-mail Professionnelle',
    emailPlaceholder: 'vous@entreprise.com',
    typeLabel: 'Type de Demande',
    types: {
      access: 'Accès à mes Données (Droit d’Accès)',
      correct: 'Rectification de mes Données',
      delete: 'Suppression / Effacement de mes Données',
      question: 'Question Générale sur la Confidentialité',
      security: 'Signalement d’un Problème de Sécurité',
      other: 'Autre Requête',
    },
    messageLabel: 'Détails de votre Demande',
    messagePlaceholder:
      'Précisez les dossiers RH ou données concernées, l’employeur rattaché, ou la nature de votre question...',
    attachLabel: 'Justificatif ou Document de Support (Facultatif)',
    attachButton: 'Choisir un fichier (PDF, PNG, JPG ≤ 5Mo)',
    consentText:
      'J’atteste être légitimement habilité(e) à soumettre cette demande et consens à ce que NextSoftHR vérifie mon identité par les moyens de contact fournis conformément aux lois sur les données personnelles.',
    submitBtn: 'Envoyer la Demande',
    submittingBtn: 'Transmission en cours...',
  },
  cookiesModal: {
    title: 'Préférences des Cookies & Traceurs',
    subtitle: 'Contrôlez l’utilisation des cookies sur la plateforme NextSoftHR',
    intro:
      'NextSoftHR utilise des cookies et technologies de stockage pour garantir la stabilité de la session, sécuriser vos connexions, mémoriser vos préférences et mesurer l’audience. Vous pouvez personnaliser vos choix ci-dessous.',
    essentialTitle: 'Cookies Strictement Essentiels',
    essentialTag: 'Requis',
    essentialDesc:
      'Indispensables à la sécurité, à l’authentification des accès, à la protection CSRF et à la navigation. La plateforme ne peut pas fonctionner sans eux.',
    alwaysActive: 'Toujours Actifs',
    functionalTitle: 'Cookies de Fonctionnalité & Préférences',
    functionalDesc:
      'Retiennent la langue de l’interface, l’espace de travail actif, le format de date et les réglages de tableaux.',
    analyticsTitle: 'Cookies de Mesure d’Audience & Diagnostics',
    analyticsDesc:
      'Données agrégées et anonymisées aidant nos ingénieurs à éliminer les lenteurs et améliorer l’expérience utilisateur.',
    marketingTitle: 'Cookies d’Attribution Marketing',
    marketingDesc:
      'Permettent d’évaluer la pertinence de nos communications professionnelles sans jamais céder vos données.',
    savedSuccess: 'Vos préférences ont été enregistrées avec succès.',
    rejectOptional: 'Refuser les Optionnels',
    acceptAll: 'Tout Accepter',
    savePreferences: 'Enregistrer mes Préférences',
  },
  adminModal: {
    title: 'Configuration de la Notice Administrateur',
    subtitle:
      'Modifiez la date d’effet et la version sans redéployer le code source',
    banner:
      'Les administrateurs peuvent actualiser la date de publication légale, le numéro de version et les coordonnées de référence. Les modifications s’appliquent instantanément.',
    dateLabel: 'Date d’Effet Affichée',
    versionLabel: 'Numéro de Version de la Politique',
    orgLabel: 'Organisation :',
    hotlineLabel: 'Ligne Directe :',
    savedNotice: 'Informations de la notice mises à jour avec succès !',
    resetBtn: 'Rétablir par Défaut',
    cancelBtn: 'Annuler',
    applyBtn: 'Appliquer la Notice',
  },
  trust: {
    tag: 'Architecture de Sécurité NextSoftHR',
    title: 'Conçu avec la Confidentialité et la Sécurité au Cœur',
    subtitle:
      'Notre plateforme logicielle multi-entreprises de gestion RH et de paie est conçue dès l’origine pour protéger la confidentialité des données des salariés et la souveraineté des entreprises.',
    cards: [
      {
        title: 'Protection des Données',
        desc: 'Conçu pour aider les entreprises à préserver leurs données de paie et de personnel via un chiffrement renforcé et des partitions hermétiques.',
        badge: 'Chiffrement Total au Repos',
      },
      {
        title: 'Accès Ultra-Sécurisés',
        desc: 'Permissions granulaires par rôles (RBAC), authentification multi-facteurs (MFA) obligatoire et journalisation de toutes les sessions.',
        badge: 'RBAC & MFA Avancé',
      },
      {
        title: 'Gestion Responsable des Données',
        desc: 'Outils permettant aux organisations de piloter leurs données avec rigueur : calendrier de purge automatisé et pistes d’audit vérifiables.',
        badge: 'Outils de Conformité',
      },
      {
        title: 'Support Panafricain & Global',
        desc: 'Développé pour les structures opérant en Afrique et à l’international, gérant le multi-devises, les conventions collectives et les exigences locales.',
        badge: 'SaaS Afrique & International',
      },
    ],
    readyText: 'Prêt pour l’Entreprise',
  },
  footer: {
    desc: 'Plateforme Panafricaine et Globale de Gestion des Ressources Humaines, de la Paie et des Entreprises, conçue pour les TPE, PME et Grandes Entreprises.',
    platformTitle: 'Plateforme',
    businessTitle: 'Gestion Entreprise',
    resourcesTitle: 'Ressources',
    legalTitle: 'Légal & Conformité',
    backToTop: 'Haut de Page',
    allRightsReserved: 'Tous droits réservés.',
    tagline: 'Architecture SaaS RH & Paie de Classe Mondiale',
  },
  liveChat: {
    buttonLabel: 'Assistance en Direct',
    statusOnline: 'Conseillers en Ligne',
    headerTitle: 'Centre d’Assistance NextSoftHR',
    replyTime: 'Réponse habituelle en moins de 5 minutes',
    tabChat: 'Discuter avec un Agent',
    tabChannels: 'Canaux Directs',
    tabFaq: 'Questions Rapides',
    departmentLabel: 'Catégorie de la demande :',
    departments: {
      privacy: 'Pôle DPD / Confidentialité des Données',
      hr: 'Conseil RH & Gestion de la Paie',
      technical: 'Support Technique & Plateforme Cloud',
      billing: 'Facturation & Abonnements',
    },
    initialAgentGreeting:
      'Bonjour ! Bienvenue sur l’assistance en direct de NextSoftHR. Nos conseillers humains sont connectés pour répondre à vos questions RH, paie ou conformité. Comment pouvons-nous vous aider aujourd’hui ?',
    placeholder: 'Saisissez votre message pour un conseiller...',
    sendButton: 'Envoyer',
    agentTyping: 'Un conseiller est en train d’écrire...',
    callDirect: 'Appeler la Ligne Directe',
    whatsappChat: 'Échanger sur WhatsApp',
    emailDesk: 'Envoyer un E-mail au Support',
    operatingHours: 'Du Lundi au Samedi : 8h00 – 18h00 (WAT / GMT+1)',
    operatingHoursTitle: 'Horaires du Service Client',
    needPrivacyAssistance: 'Vous souhaitez déposer une demande formelle DPD ?',
    privacyFormBtn: 'Ouvrir le Formulaire DPD',
    close: 'Fermer le chat',
    minimize: 'Réduire',
  },
};
