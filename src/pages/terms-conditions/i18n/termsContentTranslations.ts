import { TermSection, DefinitionItem, ModuleItem, TERMS_SECTIONS, DEFINITIONS_LIST, PLATFORM_MODULES } from '../data/termsData';
import { SupportedLanguage, SectionTranslationMeta } from './types';
import { FR_SECTIONS } from './locales/frSections';
import { PT_SECTIONS } from './locales/ptSections';
import { ES_SECTIONS } from './locales/esSections';

export const METADATA_TRANSLATIONS: Record<SupportedLanguage, { lastUpdated: string; effectiveDate: string; version: string }> = {
  en: {
    lastUpdated: 'September 27, 2026',
    effectiveDate: 'October 1, 2026',
    version: 'v3.4.2 (Enterprise Edition)'
  },
  fr: {
    lastUpdated: '27 Septembre 2026',
    effectiveDate: '1er Octobre 2026',
    version: 'v3.4.2 (Édition Entreprise)'
  },
  pt: {
    lastUpdated: '27 de Setembro de 2026',
    effectiveDate: '1 de Outubro de 2026',
    version: 'v3.4.2 (Edição Empresarial)'
  },
  es: {
    lastUpdated: '27 de Septiembre de 2026',
    effectiveDate: '1 de Octubre de 2026',
    version: 'v3.4.2 (Edición Empresarial)'
  }
};

// French definitions
export const DEFINITIONS_FR: DefinitionItem[] = [
  {
    term: 'NextSoftHR',
    definition: 'Désigne NextSoftHR Ltd., ses filiales, sociétés mères mondiales et concédants exploitant la plateforme SaaS accessible sur www.nextsofthr.org.',
    category: 'Entité'
  },
  {
    term: 'Plateforme',
    definition: 'L’ensemble logiciel SaaS sur le cloud, les applications web et mobiles, les interfaces API et l’infrastructure sous-jacente fournie par NextSoftHR.',
    category: 'Technologie'
  },
  {
    term: 'Client',
    definition: 'L’entité commerciale, l’entreprise, l’institution ou le professionnel souscrivant un abonnement et autorisant des Utilisateurs.',
    category: 'Partie'
  },
  {
    term: 'Utilisateur',
    definition: 'Toute personne physique autorisée par le Client à accéder à la Plateforme, y compris les Administrateurs, Managers et Employés.',
    category: 'Partie'
  },
  {
    term: 'Employé',
    definition: 'Tout membre du personnel, contractuel ou collaborateur dont les fiches, heures, salaires ou données sont gérés sur la Plateforme.',
    category: 'Personnel'
  },
  {
    term: 'Administrateur',
    definition: 'Un Utilisateur doté de permissions organisationnelles étendues, habilité à paramétrer le compte, assigner des rôles et gérer la souscription.',
    category: 'Permissions'
  },
  {
    term: 'Abonnement',
    definition: 'Le droit d’accès commercial consenti au Client selon un bon de commande ou forfait en ligne (mensuel ou annuel) spécifiant les modules et sièges.',
    category: 'Commercial'
  },
  {
    term: 'Compte',
    definition: 'L’espace organisationnel unique et les identifiants configurés pour permettre au Client et aux Utilisateurs autorisés d’accéder aux Services.',
    category: 'Sécurité'
  },
  {
    term: 'Services',
    definition: 'L’ensemble des fonctionnalités logicielles, moteurs de calcul de paie, portails en libre-service, hébergement et assistance fournis par NextSoftHR.',
    category: 'Commercial'
  },
  {
    term: 'Contenu',
    definition: 'Toutes les données, textes, documents, relevés d’heures, CVs et fiches d’employés saisis ou traités via le compte du Client.',
    category: 'Données'
  },
  {
    term: 'Données Personnelles',
    definition: 'Toute information relative à une personne physique identifiée ou identifiable traitée conformément aux réglementations applicables sur la protection des données.',
    category: 'Confidentialité'
  },
  {
    term: 'Services Tiers',
    definition: 'Les applications externes, passerelles de paiement, banques partenaires, télédéclarations fiscales et fournisseurs d’identité SSO tiers.',
    category: 'Intégrations'
  }
];

// Portuguese definitions
export const DEFINITIONS_PT: DefinitionItem[] = [
  {
    term: 'NextSoftHR',
    definition: 'Refere-se à NextSoftHR Ltd., suas empresas-mãe globais, subsidiárias e licenciantes que operam a plataforma SaaS disponível em www.nextsofthr.org.',
    category: 'Entidade'
  },
  {
    term: 'Plataforma',
    definition: 'O conjunto de software em nuvem, aplicações web e móveis, APIs e infraestrutura fornecida pela NextSoftHR.',
    category: 'Tecnologia'
  },
  {
    term: 'Cliente',
    definition: 'A entidade empresarial, instituição ou profissional que subscreve um plano ou formulário de pedido e autoriza Utilizadores.',
    category: 'Parte'
  },
  {
    term: 'Utilizador',
    definition: 'Qualquer indivíduo autorizado pelo Cliente a aceder à Plataforma, incluindo Administradores, Gestores e Colaboradores.',
    category: 'Parte'
  },
  {
    term: 'Colaborador',
    definition: 'Membro da equipa, contratado ou trabalhador cujos registos, assiduidade, salários ou perfil são geridos na Plataforma.',
    category: 'Pessoal'
  },
  {
    term: 'Administrador',
    definition: 'Utilizador com permissões elevadas designado pelo Cliente para configurar políticas, gerir acessos e administrar assinaturas.',
    category: 'Permissões'
  },
  {
    term: 'Assinatura',
    definition: 'O direito de acesso comercial concedido ao Cliente com base num plano mensal ou anual com limites de utilizadores e módulos definidos.',
    category: 'Comercial'
  },
  {
    term: 'Conta',
    definition: 'A instância organizacional única e credenciais atribuídas ao Cliente e respetivos utilizadores para aceder aos Serviços.',
    category: 'Segurança'
  },
  {
    term: 'Serviços',
    definition: 'Todas as funcionalidades de software, cálculo salarial automatizado, portais de autosserviço, suporte e alojamento prestados pela NextSoftHR.',
    category: 'Comercial'
  },
  {
    term: 'Conteúdo',
    definition: 'Todos os dados, ficheiros, folhas de horas, currículos e informações de colaboradores inseridos ou processados na Conta.',
    category: 'Dados'
  },
  {
    term: 'Dados Pessoais',
    definition: 'Qualquer informação relativa a uma pessoa singular identificada ou identificável processada em conformidade com as leis de proteção de dados.',
    category: 'Privacidade'
  },
  {
    term: 'Serviços de Terceiros',
    definition: 'Aplicações externas, plataformas bancárias, sistemas de faturação fiscal e provedores de autenticação (SSO) independentes.',
    category: 'Integrações'
  }
];

// Spanish definitions
export const DEFINITIONS_ES: DefinitionItem[] = [
  {
    term: 'NextSoftHR',
    definition: 'Se refiere a NextSoftHR Ltd., sus matrices globales, filiales y licenciantes que gestionan la plataforma SaaS accesible en www.nextsofthr.org.',
    category: 'Entidad'
  },
  {
    term: 'Plataforma',
    definition: 'La suite de software en la nube (SaaS), aplicaciones web y móviles, interfaces API e infraestructura subyacente provista por NextSoftHR.',
    category: 'Tecnología'
  },
  {
    term: 'Cliente',
    definition: 'La entidad comercial, empresa o profesional que formaliza un pedido o suscripción y autoriza el acceso a Usuarios.',
    category: 'Parte'
  },
  {
    term: 'Usuario',
    definition: 'Toda persona física autorizada por el Cliente para acceder a la Plataforma, incluidos Administradores, Responsables y Empleados.',
    category: 'Parte'
  },
  {
    term: 'Empleado',
    definition: 'Cualquier colaborador, contratista o trabajador cuyos registros, jornadas, nóminas o perfiles se gestionan en la Plataforma.',
    category: 'Personal'
  },
  {
    term: 'Administrador',
    definition: 'Usuario con privilegios de gestión asignado por el Cliente para configurar módulos, autorizar roles y administrar suscripciones.',
    category: 'Permisos'
  },
  {
    term: 'Suscripción',
    definition: 'El derecho de acceso comercial concedido al Cliente mediante plan mensual o anual con especificación de módulos y puestos.',
    category: 'Comercial'
  },
  {
    term: 'Cuenta',
    definition: 'El entorno de organización exclusivo y credenciales generadas para que el Cliente y Usuarios accedan a los Servicios.',
    category: 'Seguridad'
  },
  {
    term: 'Servicios',
    definition: 'Las funcionalidades de software, motores de cálculo de nómina, portales de autoservicio, soporte y alojamiento de NextSoftHR.',
    category: 'Comercial'
  },
  {
    term: 'Contenido',
    definition: 'Todos los datos, documentos, horas registradas, expedientes y currículums introducidos o procesados a través de la cuenta.',
    category: 'Datos'
  },
  {
    term: 'Datos Personales',
    definition: 'Cualquier información sobre una persona física identificada o identificable tratada conforme a las leyes de protección de datos aplicables.',
    category: 'Privacidad'
  },
  {
    term: 'Servicios de Terceros',
    definition: 'Plataformas externas, pasarelas de pago, banca electrónica, portales fiscales y proveedores de identidad SSO independientes.',
    category: 'Integraciones'
  }
];

// French modules
export const MODULES_FR: ModuleItem[] = [
  {
    id: 'hr-mgmt',
    title: 'Gestion des Ressources Humaines (RH)',
    description: 'Dossiers numériques des employés, organigrammes interactifs, parcours d’onboarding, signature électronique et gestion du cycle de vie.',
    features: ['Dossiers Maîtres Employés', 'Coffre-fort Numérique', 'Parcours d’Intégration', 'Hiérarchie Organisationnelle'],
    iconName: 'Users'
  },
  {
    id: 'time-att',
    title: 'Temps & Présences',
    description: 'Pointeuse en temps réel, biométrie, pointage géolocalisé sur mobile, calcul automatisé des heures supplémentaires et plannings.',
    features: ['Pointage Géolocalisé', 'Moteur d’Heures Supplémentaires', 'Plannings d’Équipe', 'Validation des Heures'],
    iconName: 'Clock'
  },
  {
    id: 'leave-mgmt',
    title: 'Gestion des Congés & Absences',
    description: 'Règles légales et coutumières, décomptes automatisés, circuits de validation hiérarchique, calendriers des jours fériés et analytiques.',
    features: ['Acquisition Automatisée', 'Circuits de Validation', 'Calendriers Localisés', 'Analyses d’Absentéisme'],
    iconName: 'CalendarCheck'
  },
  {
    id: 'payroll-engine',
    title: 'Services & Traitement de Paie',
    description: 'Moteur de calcul brut-en-net, structures salariales personnalisées, déductions fiscales, cotisations sociales et virements multi-devises.',
    features: ['Calcul Automatique des Salaires', 'Rubriques & Primes sur Mesure', 'Export Bancaire Direct', 'Bulletins de Paie Sécurisés'],
    iconName: 'Banknote'
  },
  {
    id: 'recruitment',
    title: 'Acquisition des Talents & ATS',
    description: 'Gestion des offres d’emploi, suivi des candidatures en tableau Kanban, planification d’entretiens et génération des contrats d’embauche.',
    features: ['Pipeline Visuel de Candidats', 'Fiches d’Évaluation Partagées', 'Signature d’Offres', 'Portail Carrière Intégré'],
    iconName: 'UserCheck'
  },
  {
    id: 'crm',
    title: 'CRM & Relations Professionnelles',
    description: 'Gestion des relations clients, suivi des contrats d’affaires, interlocuteurs de facturation et historique des interactions commerciales.',
    features: ['Fiches Entreprises Clientes', 'Suivi des Renouvellements', 'Historique d’Activité', 'Comptes Clés'],
    iconName: 'Building2'
  },
  {
    id: 'finance',
    title: 'Opérations Financières & Notes de Frais',
    description: 'Notes de frais des employés, numérisation OCR des reçus, gestion budgétaire par département et exports vers la comptabilité.',
    features: ['Numérisation Reçus & Devises', 'Circuits de Remboursement', 'Centres de Coûts', 'Export Grand Livre'],
    iconName: 'PieChart'
  },
  {
    id: 'projects',
    title: 'Gestion de Projets & Tâches',
    description: 'Suivi des jalons de projet, attribution des tâches, feuilles de temps facturables, planification des ressources et respect des échéances.',
    features: ['Lignes de Temps Jalons', 'Heures Facturables', 'Équilibrage de Charge', 'Collaboration Inter-équipes'],
    iconName: 'Briefcase'
  },
  {
    id: 'ess',
    title: 'Portail Employé (ESS)',
    description: 'Espace sécurisé web et mobile permettant aux salariés de consulter leurs bulletins de paie, demander des congés et mettre à jour leur profil.',
    features: ['Bulletins de Paie Immédiats', 'Demandes de Congés', 'Déclarations Fiscales', 'Application Mobile'],
    iconName: 'Smartphone'
  },
  {
    id: 'mss',
    title: 'Portail Manager (MSS)',
    description: 'Tableau de bord dédié aux chefs d’équipe pour les validations en un clic, le suivi des présences et les évaluations de performance.',
    features: ['Validation Rapide', 'Vue Calendrier Équipe', 'Entretiens Individuels', 'Suivi Heures Complémentaires'],
    iconName: 'ShieldCheck'
  },
  {
    id: 'outsourcing',
    title: 'Externalisation RH & Paie',
    description: 'Services d’accompagnement gérés par des experts certifiés NextSoftHR pour la conformité légale et le traitement des déclarations sociales.',
    features: ['Spécialiste de Compte Dédié', 'Assistance Fiscale & Sociale', 'Déclarations Annuelles', 'Engagements de Service (SLA)'],
    iconName: 'Workflow'
  }
];

// Portuguese modules
export const MODULES_PT: ModuleItem[] = [
  {
    id: 'hr-mgmt',
    title: 'Gestão de Recursos Humanos (RH)',
    description: 'Fichas digitais de colaboradores, organigramas dinâmicos, acolhimento (onboarding), assinatura digital e gestão completa do ciclo de vida.',
    features: ['Registo Central de Pessoal', 'Repositório de Documentos', 'Fluxos de Integração', 'Hierarquias de Departamentos'],
    iconName: 'Users'
  },
  {
    id: 'time-att',
    title: 'Assiduidade & Picagens',
    description: 'Relógio de ponto em tempo real, biometria, picagem com geolocalização no telemóvel, horas extraordinárias e escalas de trabalho.',
    features: ['Ponto com Geolocalização', 'Mecanismo de Horas Extras', 'Escalas de Turnos', 'Aprovação de Folhas de Ponto'],
    iconName: 'Clock'
  },
  {
    id: 'leave-mgmt',
    title: 'Gestão de Férias & Ausências',
    description: 'Políticas de férias estatutárias e da empresa, cálculos automáticos de saldo, aprovações de chefia e feriados nacionais.',
    features: ['Cálculo de Direitos de Férias', 'Fluxo de Aprovação em Cadeia', 'Calendários Nacionais', 'Relatórios de Ausências'],
    iconName: 'CalendarCheck'
  },
  {
    id: 'payroll-engine',
    title: 'Processamento Salarial',
    description: 'Motor de cálculo do salário bruto ao líquido, subsídios, deduções fiscais e previdenciais, recibos de vencimento e ficheiros bancários.',
    features: ['Cálculo Salarial Automático', 'Subsídios Personalizados', 'Ficheiros Bancários SEPA/Direct', 'Recibos Digitais Seguros'],
    iconName: 'Banknote'
  },
  {
    id: 'recruitment',
    title: 'Recrutamento & Seleção (ATS)',
    description: 'Publicação de vagas, painéis Kanban de candidatos, marcação de entrevistas e geração de cartas de oferta de emprego com assinatura.',
    features: ['Pipeline Visual de Candidatos', 'Grelhas de Avaliação', 'Assinatura de Ofertas', 'Portal de Carreiras Integrado'],
    iconName: 'UserCheck'
  },
  {
    id: 'crm',
    title: 'CRM & Gestão Empresarial',
    description: 'Gestão de relações com clientes corporativos, acompanhamento de contratos de prestação de serviços e histórico de interações.',
    features: ['Perfis de Clientes', 'Gestores de Conta', 'Alertas de Renovação', 'Auditoria de Atividades'],
    iconName: 'Building2'
  },
  {
    id: 'finance',
    title: 'Gestão Financeira & Despesas',
    description: 'Reembolso de despesas, leitura inteligente de recibos (OCR), orçamentos de departamentos e exportação para sistemas de contabilidade.',
    features: ['OCR de Faturas & Moedas', 'Fluxos de Reembolso', 'Centros de Custos', 'Exportação para Contabilidade'],
    iconName: 'PieChart'
  },
  {
    id: 'projects',
    title: 'Projetos & Tarefas',
    description: 'Controlo de metas e marcos de projeto, atribuição de tarefas, registo de horas faturáveis e colaboração de equipas.',
    features: ['Cronogramas de Marcos', 'Horas Faturáveis', 'Capacidade de Equipa', 'Colaboração Partilhada'],
    iconName: 'Briefcase'
  },
  {
    id: 'ess',
    title: 'Portal do Colaborador (ESS)',
    description: 'Acesso seguro via web e telemóvel para consulta de recibos de vencimento, pedidos de férias, despesas e atualização de dados.',
    features: ['Descarga de Recibos de Vencimento', 'Submissão de Férias', 'Declarações Fiscais', 'Acesso Móvel'],
    iconName: 'Smartphone'
  },
  {
    id: 'mss',
    title: 'Portal do Gestor (MSS)',
    description: 'Painel para líderes de equipa aprovarem pedidos, gerirem horários, avaliações e visualizarem o mapa de ausências da equipa.',
    features: ['Aprovações em 1 Clique', 'Mapa de Férias da Equipa', 'Avaliações de Desempenho', 'Revisão de Horas Extras'],
    iconName: 'ShieldCheck'
  },
  {
    id: 'outsourcing',
    title: 'Outsourcing de RH & Salários',
    description: 'Serviços especializados prestados por especialistas certificados NextSoftHR para suporte à conformidade e execução salarial.',
    features: ['Gestor de Conta Dedicado', 'Apoio Fiscal e Contributivo', 'Resumos de Fecho Anual', 'Garantias de Serviço (SLA)'],
    iconName: 'Workflow'
  }
];

// Spanish modules
export const MODULES_ES: ModuleItem[] = [
  {
    id: 'hr-mgmt',
    title: 'Gestión de Recursos Humanos (RRHH)',
    description: 'Expedientes digitales del empleado, organigramas interactivos, procesos de onboarding, firma digital y ciclo de vida laboral.',
    features: ['Expedientes Maestros de Personal', 'Repositorio Digital Seguro', 'Itinerarios de Acogida', 'Estructura Organizacional'],
    iconName: 'Users'
  },
  {
    id: 'time-att',
    title: 'Control Horario & Presencia',
    description: 'Fichaje en tiempo real, integración biométrica, registro geolocalizado en el móvil, cálculo de horas extras y turnos de trabajo.',
    features: ['Fichaje Geolocalizado', 'Motor de Horas Extraordinarias', 'Planificación de Turnos', 'Validación de Jornadas'],
    iconName: 'Clock'
  },
  {
    id: 'leave-mgmt',
    title: 'Gestión de Vacaciones & Permisos',
    description: 'Políticas legales y de empresa, devengos automáticos, circuitos de aprobación por responsables, festivos y análisis de ausencias.',
    features: ['Cálculo Automático de Días', 'Circuitos de Aprobación', 'Calendarios Laborales', 'Informes de Absentismo'],
    iconName: 'CalendarCheck'
  },
  {
    id: 'payroll-engine',
    title: 'Gestión de Nóminas & Retribución',
    description: 'Motor de cálculo de bruto a neto, conceptos salariales personalizados, retenciones fiscales, cotizaciones y transferencias SEPA/bancarias.',
    features: ['Cálculo Automatizado de Nómina', 'Complementos y Deducciones', 'Remesas Bancarias Directas', 'Nóminas Digitales Seguras'],
    iconName: 'Banknote'
  },
  {
    id: 'recruitment',
    title: 'Selección de Talento & ATS',
    description: 'Publicación de ofertas de empleo, seguimiento de candidatos en paneles Kanban, entrevistas y emisión de ofertas con firma electrónica.',
    features: ['Pipeline Visual de Candidatos', 'Plantillas de Evaluación', 'Firma de Contratos', 'Portal de Empleo Integrado'],
    iconName: 'UserCheck'
  },
  {
    id: 'crm',
    title: 'CRM & Relaciones Comerciales',
    description: 'Gestión de clientes corporativos, seguimiento de contratos de servicios, personas de contacto para facturación e historial comercial.',
    features: ['Perfiles de Clientes', 'Gestores de Cuentas', 'Control de Vencimientos', 'Auditoría de Actividad'],
    iconName: 'Building2'
  },
  {
    id: 'finance',
    title: 'Operaciones Financieras & Gastos',
    description: 'Liquidación de gastos y dietas, escaneo OCR de tiques, asignación presupuestaria por centro de coste e integración contable.',
    features: ['Escaneo OCR de Recibos', 'Aprobación de Reembolsos', 'Centros de Coste', 'Exportación Contable'],
    iconName: 'PieChart'
  },
  {
    id: 'projects',
    title: 'Gestión de Proyectos & Tareas',
    description: 'Control de hitos, asignación de tareas a colaboradores, imputación de horas facturables y equilibrio de capacidad laboral.',
    features: ['Cronogramas de Hitos', 'Imputación Horaria', 'Capacidad del Equipo', 'Trabajo Colaborativo'],
    iconName: 'Briefcase'
  },
  {
    id: 'ess',
    title: 'Portal del Empleado (ESS)',
    description: 'Acceso seguro web y móvil para que el personal consulte sus nóminas, solicite vacaciones, aporte justificantes y actualice datos.',
    features: ['Descarga Inmediata de Nóminas', 'Solicitud de Permisos', 'Certificados de Retenciones', 'App Móvil'],
    iconName: 'Smartphone'
  },
  {
    id: 'mss',
    title: 'Portal del Responsable (MSS)',
    description: 'Panel de mandos para mandos intermedios con aprobaciones en un clic, control de presencia de equipo y valoraciones de rendimiento.',
    features: ['Aprobación en 1 Clic', 'Calendario del Equipo', 'Evaluaciones de Desempeño', 'Revisión de Jornadas'],
    iconName: 'ShieldCheck'
  },
  {
    id: 'outsourcing',
    title: 'Externalización de Nómina y RRHH',
    description: 'Servicios gestionados por expertos acreditados de NextSoftHR para asesorar en la gestión de nóminas y cumplimiento estatutario.',
    features: ['Gestor de Cuenta Dedicado', 'Asesoría en Retenciones', 'Cierres Anuales', 'Garantías de Nivel de Servicio (SLA)'],
    iconName: 'Workflow'
  }
];

// Comprehensive localized sections dictionary for French, Portuguese, and Spanish
export const SECTION_TRANSLATIONS: Record<SupportedLanguage, Record<string, SectionTranslationMeta>> = {
  en: {}, // fallback to original English in TERMS_SECTIONS
  fr: FR_SECTIONS,
  pt: PT_SECTIONS,
  es: ES_SECTIONS
};

/**
 * Returns the localized sections with titles, summaries, categories, and highlight boxes
 * mapped to the user's selected language, while preserving English structure and IDs.
 */
export function getLocalizedSections(lang: SupportedLanguage): TermSection[] {
  if (lang === 'en') {
    return TERMS_SECTIONS;
  }

  const translations = SECTION_TRANSLATIONS[lang] || {};
  const localizedDefinitions = getLocalizedDefinitions(lang);
  const localizedModules = getLocalizedModules(lang);

  return TERMS_SECTIONS.map((sec) => {
    const meta = translations[sec.id];
    if (!meta) return sec;

    const updated: TermSection = {
      ...sec,
      title: meta.title || sec.title,
      summary: meta.summary || sec.summary,
      category: meta.category || sec.category,
      counselFlag: meta.counselFlag || sec.counselFlag,
      paragraphs: meta.paragraphs && meta.paragraphs.length > 0 ? meta.paragraphs : sec.paragraphs,
      bulletPoints: meta.bulletPoints && meta.bulletPoints.length > 0 ? meta.bulletPoints : sec.bulletPoints
    };

    if (sec.id === 'definitions') {
      updated.definitions = localizedDefinitions;
    }

    if (sec.id === 'platform-use' || sec.modules) {
      updated.modules = localizedModules;
    }

    if (sec.highlightBox) {
      updated.highlightBox = {
        ...sec.highlightBox,
        title: meta.highlightBoxTitle || sec.highlightBox.title,
        text: meta.highlightBoxText || sec.highlightBox.text,
        actionLabel: meta.actionLabel || sec.highlightBox.actionLabel
      };
    }

    return updated;
  });
}

/**
 * Returns localized definitions glossary for the selected language
 */
export function getLocalizedDefinitions(lang: SupportedLanguage): DefinitionItem[] {
  switch (lang) {
    case 'fr':
      return DEFINITIONS_FR;
    case 'pt':
      return DEFINITIONS_PT;
    case 'es':
      return DEFINITIONS_ES;
    default:
      return DEFINITIONS_LIST;
  }
}

/**
 * Returns localized modules scope for the selected language
 */
export function getLocalizedModules(lang: SupportedLanguage): ModuleItem[] {
  switch (lang) {
    case 'fr':
      return MODULES_FR;
    case 'pt':
      return MODULES_PT;
    case 'es':
      return MODULES_ES;
    default:
      return PLATFORM_MODULES;
  }
}
