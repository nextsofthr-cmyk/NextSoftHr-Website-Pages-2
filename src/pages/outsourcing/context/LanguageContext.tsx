import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLanguage = 'en' | 'fr' | 'pt' | 'es';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    region: 'Anglophone & Global'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    region: 'Afrique Francophone & Europe'
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    region: 'África Lusófona & Brasil'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    region: 'Guinea Ecuatorial & Global'
  }
];

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Top Ribbon
    'ribbon.badge': 'Pan-African Payroll & Workforce Outsourcing',
    'ribbon.coverage': 'Covering Nigeria, Ghana, Kenya, South Africa, Rwanda, Senegal & 15+ Markets',
    'ribbon.currency': 'Currency',
    'ribbon.language': 'Language',
    'ribbon.theme': 'Theme',
    'ribbon.compliance': 'Compliance Center',
    'ribbon.calculator': 'ROI Calculator',

    // Nav Items
    'nav.home': 'Home',
    'nav.outsourcing': 'Outsourcing',
    'nav.solutions': 'Solutions',
    'nav.packages': 'Packages',
    'nav.partners': 'Partners',
    'nav.resources': 'Resources',
    'nav.portals': 'Live Portals',
    'nav.talk_expert': 'Talk to an Expert',
    
    // Outsourcing Mega Menu
    'nav.outsourcing_lines': 'Outsourcing Service Lines',
    'nav.outsourcing_lines_sub': 'Technology-powered managed operations for modern teams',
    'nav.hub_overview': 'Hub Overview',
    'nav.payroll_outsourcing': 'Payroll Outsourcing',
    'nav.payroll_outsourcing_desc': 'End-to-end gross-to-net calculations, tax & statutory remittances, salary disbursement',
    'nav.hr_administration': 'HR Administration',
    'nav.hr_administration_desc': 'Employment files, compliance audits, documentation, contracts, labor laws',
    'nav.managed_hr': 'Managed HR Services',
    'nav.managed_hr_desc': 'Embedded HR Business Partners, workplace strategy, leadership advisory',
    'nav.recruitment_outsourcing': 'Recruitment Outsourcing',
    'nav.recruitment_outsourcing_desc': 'Pan-African candidate sourcing, vetting, technical assessments, onboarding',
    'nav.employee_admin': 'Employee Administration',
    'nav.employee_admin_desc': 'Employee lifecycle, benefits management, query desk, verification letters',
    'nav.time_attendance': 'Time & Attendance',
    'nav.time_attendance_desc': 'Biometric clocking, shift scheduling, remote geofencing, overtime audit',
    'nav.leave_management': 'Leave Management',
    'nav.leave_management_desc': 'Accruals, statutory sick/maternity, multi-tier approvals, public holidays',

    // Solutions Menu
    'nav.small_business': 'Small Business Solutions',
    'nav.growing_business': 'Growing Business Solutions',
    'nav.enterprise_multi_company': 'Enterprise Multi-Company',
    'nav.multi_branch': 'Multi-Branch Workforce',
    'nav.pan_african': 'Pan-African Expansion',

    // Resources Menu
    'nav.compliance_center': 'Compliance Center',
    'nav.roi_calculator': 'Outsourcing ROI Calculator',
    'nav.data_migration': 'Data Migration Center',
    'nav.implementation_timeline': 'Implementation Timeline',
    'nav.integrations_directory': 'Integrations Directory',
    'nav.security_center': 'Enterprise Security Center',

    // Live Portals
    'portal.client_admin': 'Client Executive Portal',
    'portal.employee_ess': 'Employee Portal (ESS)',
    'portal.manager_mss': 'Manager Portal (MSS)',
    'portal.outsourcing_ops': 'NextSofthr Ops Center',
    'portal.switch_role': 'Switch Environment',

    // Hero Section
    'hero.badge': 'Pan-African Managed HR & Payroll Infrastructure',
    'hero.title_start': 'Modern Workforce Outsourcing for',
    'hero.title_highlight': 'High-Growth African Enterprises',
    'hero.subtitle': 'NextSofthr combines certified African HR specialists, automated statutory compliance, and multi-country cloud portals to handle payroll, benefits, and employee operations with 100% precision.',
    'hero.cta_quote': 'Get Instant Outsourcing Quote',
    'hero.cta_portals': 'Explore Live Portals',
    'hero.guarantee': '100% Statutory Penalty Guarantee',
    'hero.coverage_count': '15+ African Jurisdictions Supported',
    'hero.sla_time': '99.9% Timely Payroll SLA',

    // Floating Live Chat
    'chat.launcher_text': 'Ask an HR & Payroll Specialist...',
    'chat.online_status': 'Online',
    'chat.active_now': 'Active Now · Typical reply: < 2m',
    'chat.advisor_name': 'Zainab Al-Hassan',
    'chat.advisor_role': 'Senior People Operations & Compliance Partner',
    'chat.welcome_message': "Hello! I'm Zainab from NextSofthr Outsourcing. Are you looking to streamline your payroll processing, outsource employee administration, or manage workforce compliance across African jurisdictions?",
    'chat.input_placeholder': 'Type your question or request...',
    'chat.send': 'Send',
    'chat.reset': 'Reset Chat',
    'chat.prompt_quote': '💰 Request Payroll Outsourcing Quote',
    'chat.prompt_countries': '🌍 Multi-Country African Coverage',
    'chat.prompt_compliance': '🛡️ Statutory Tax & Pension Compliance',
    'chat.prompt_demo': '🚀 Book a 15-Min Live Walkthrough',
    'chat.prompt_portals': '👥 Employee & Manager Portals',
    'chat.callback_title': 'Direct Advisory Callback',
    'chat.callback_desc': 'Leave your details and our Senior Outsourcing Partner will call you back within 15 minutes.',
    'chat.callback_btn': 'Request Callback',
    'chat.return_to_chat': 'Return to Chat',
    'chat.confirm_callback': 'Confirm 15-Minute Callback',
    'chat.security_notice': 'Encrypted ISO-27001 & NDPR compliant consultation',

    // Footer
    'footer.cta_title': 'Ready to outsource your HR & payroll with total peace of mind?',
    'footer.cta_sub': 'Join leading African and multinational employers who trust NextSofthr for precision payroll, compliant statutory operations, and human HR expertise.',
    'footer.talk_expert': 'Talk to an Expert',
    'footer.calculate_needs': 'Calculate Your Needs',
    'footer.rights': 'All rights reserved. NextSofthr Outsourcing Platform.'
  },

  fr: {
    // Top Ribbon
    'ribbon.badge': 'Sous-traitance de la Paie et des Ressources Humaines Panafricaines',
    'ribbon.coverage': 'Présent au Sénégal, Côte d\'Ivoire, Cameroun, Nigéria, Ghana, Kenya et +15 marchés',
    'ribbon.currency': 'Devise',
    'ribbon.language': 'Langue',
    'ribbon.theme': 'Thème',
    'ribbon.compliance': 'Centre de Conformité',
    'ribbon.calculator': 'Calculateur de ROI',

    // Nav Items
    'nav.home': 'Accueil',
    'nav.outsourcing': 'Sous-traitance',
    'nav.solutions': 'Solutions',
    'nav.packages': 'Forfaits',
    'nav.partners': 'Partenaires',
    'nav.resources': 'Ressources',
    'nav.portals': 'Portails en Direct',
    'nav.talk_expert': 'Parler à un Expert',
    
    // Outsourcing Mega Menu
    'nav.outsourcing_lines': 'Lignes de Services de Sous-traitance',
    'nav.outsourcing_lines_sub': 'Opérations gérées assistées par la technologie pour les équipes modernes',
    'nav.hub_overview': 'Vue d\'Ensemble du Hub',
    'nav.payroll_outsourcing': 'Externalisation de la Paie',
    'nav.payroll_outsourcing_desc': 'Calculs brut-au-net, déclarations fiscales et sociales, virement automatisé des salaires',
    'nav.hr_administration': 'Administration RH',
    'nav.hr_administration_desc': 'Dossiers du personnel, conformité légale, contrats de travail, droit du travail local',
    'nav.managed_hr': 'Services RH Délégués',
    'nav.managed_hr_desc': 'HR Business Partners dédiés, stratégie des talents et conseil à la direction',
    'nav.recruitment_outsourcing': 'Sous-traitance du Recrutement (RPO)',
    'nav.recruitment_outsourcing_desc': 'Sourcing panafricain, évaluations techniques certifiées et intégration',
    'nav.employee_admin': 'Gestion du Personnel',
    'nav.employee_admin_desc': 'Cycle de vie des employés, avantages sociaux, attestations et guichet unique',
    'nav.time_attendance': 'Gestion du Temps & Présence',
    'nav.time_attendance_desc': 'Pointage biométrique, plannings, géolocalisation et validation des heures sup',
    'nav.leave_management': 'Gestion des Congés',
    'nav.leave_management_desc': 'Acquisitions, congés maladie/maternité légaux, approbations hiérarchiques',

    // Solutions Menu
    'nav.small_business': 'Solutions pour PME',
    'nav.growing_business': 'Entreprises en Croissance',
    'nav.enterprise_multi_company': 'Grands Groupes Multi-Sociétés',
    'nav.multi_branch': 'Équipes Multi-Sites',
    'nav.pan_african': 'Expansion Panafricaine',

    // Resources Menu
    'nav.compliance_center': 'Centre de Conformité Fiscale & Sociale',
    'nav.roi_calculator': 'Calculateur de ROI de Sous-traitance',
    'nav.data_migration': 'Centre de Migration des Données',
    'nav.implementation_timeline': 'Calendrier de Déploiement',
    'nav.integrations_directory': 'Annuaire des Intégrations',
    'nav.security_center': 'Centre de Sécurité Entreprise',

    // Live Portals
    'portal.client_admin': 'Portail Direction Client',
    'portal.employee_ess': 'Portail Salarié (ESS)',
    'portal.manager_mss': 'Portail Manager (MSS)',
    'portal.outsourcing_ops': 'Centre Opérationnel NextSofthr',
    'portal.switch_role': 'Changer d\'Environnement',

    // Hero Section
    'hero.badge': 'Infrastructure RH & Paie Panafricaine Déléguée',
    'hero.title_start': 'L\'Externalisation RH Moderne pour',
    'hero.title_highlight': 'les Entreprises Africaines en Forte Croissance',
    'hero.subtitle': 'NextSofthr combine des experts RH certifiés, l\'automatisation de la conformité légale et des portails cloud multi-pays pour gérer votre paie avec une exactitude de 100%.',
    'hero.cta_quote': 'Devis d\'Externalisation Immédiat',
    'hero.cta_portals': 'Tester les Portails en Direct',
    'hero.guarantee': 'Garantie Zéro Pénalité Légale 100%',
    'hero.coverage_count': 'Plus de 15 Juridictions Africaines',
    'hero.sla_time': 'SLA de Ponctualité de 99,9%',

    // Floating Live Chat
    'chat.launcher_text': 'Consulter un Spécialiste RH & Paie...',
    'chat.online_status': 'En ligne',
    'chat.active_now': 'En ligne · Réponse moyenne : < 2 min',
    'chat.advisor_name': 'Zainab Al-Hassan',
    'chat.advisor_role': 'Responsable des Opérations & Conformité Panafricaine',
    'chat.welcome_message': "Bonjour ! Je suis Zainab de NextSofthr Sous-traitance. Souhaitez-vous externaliser votre paie, confier votre gestion administrative RH ou assurer votre conformité légale dans vos filiales africaines ?",
    'chat.input_placeholder': 'Posez votre question ou détaillez votre besoin...',
    'chat.send': 'Envoyer',
    'chat.reset': 'Réinitialiser',
    'chat.prompt_quote': '💰 Demander un Devis d\'Externalisation de la Paie',
    'chat.prompt_countries': '🌍 Couverture Panafricaine (Sénégal, CI, Cameroun...)',
    'chat.prompt_compliance': '🛡️ Déclarations Fiscales & Cotisations Sociales',
    'chat.prompt_demo': '🚀 Réserver une Démonstration de 15 Min',
    'chat.prompt_portals': '👥 Découvrir les Portails Salariés & Managers',
    'chat.callback_title': 'Rappel Téléphonique Prioritaire',
    'chat.callback_desc': 'Indiquez vos coordonnées et un Directeur Associé vous rappellera sous 15 minutes.',
    'chat.callback_btn': 'Demander un Rappel',
    'chat.return_to_chat': 'Retour au Chat',
    'chat.confirm_callback': 'Confirmer le Rappel en 15 Min',
    'chat.security_notice': 'Consultation chiffrée et conforme aux normes ISO-27001 & RGPD/NDPR',

    // Footer
    'footer.cta_title': 'Prêt à externaliser votre paie et vos RH en toute sérénité ?',
    'footer.cta_sub': 'Rejoignez les entreprises de premier plan qui font confiance à NextSofthr pour la rigueur de leur paie, leur conformité et l\'expertise humaine de nos consultants.',
    'footer.talk_expert': 'Parler à un Expert',
    'footer.calculate_needs': 'Estimer Vos Besoins',
    'footer.rights': 'Tous droits réservés. Plateforme de Sous-traitance NextSofthr.'
  },

  pt: {
    // Top Ribbon
    'ribbon.badge': 'Terceirização Pan-Africana de Folha de Pagamento e Recursos Humanos',
    'ribbon.coverage': 'Atuação em Angola, Moçambique, Cabo Verde, Nigéria, Gana, Quênia e +15 mercados',
    'ribbon.currency': 'Moeda',
    'ribbon.language': 'Idioma',
    'ribbon.theme': 'Tema',
    'ribbon.compliance': 'Centro de Conformidade',
    'ribbon.calculator': 'Calculadora de ROI',

    // Nav Items
    'nav.home': 'Início',
    'nav.outsourcing': 'Terceirização',
    'nav.solutions': 'Soluções',
    'nav.packages': 'Pacotes',
    'nav.partners': 'Parceiros',
    'nav.resources': 'Recursos',
    'nav.portals': 'Portais ao Vivo',
    'nav.talk_expert': 'Falar com Especialista',
    
    // Outsourcing Mega Menu
    'nav.outsourcing_lines': 'Linhas de Serviços de Terceirização',
    'nav.outsourcing_lines_sub': 'Operações gerenciadas com tecnologia de ponta para empresas modernas',
    'nav.hub_overview': 'Visão Geral do Hub',
    'nav.payroll_outsourcing': 'Terceirização da Folha de Pagamento',
    'nav.payroll_outsourcing_desc': 'Cálculos de proventos e descontos, guias fiscais e previdenciárias (INSS/IRT), crédito bancário',
    'nav.hr_administration': 'Administração de Recursos Humanos',
    'nav.hr_administration_desc': 'Prontuários de colaboradores, auditoria jurídica trabalhista e gestão contratual',
    'nav.managed_hr': 'Serviços de RH Gerenciados',
    'nav.managed_hr_desc': 'Consultores HRBP dedicados, estratégia de retenção e consultoria para lideranças',
    'nav.recruitment_outsourcing': 'Terceirização de Recrutamento (RPO)',
    'nav.recruitment_outsourcing_desc': 'Atração de talentos em toda a África, triagem técnica e admissão rápida',
    'nav.employee_admin': 'Administração de Pessoal',
    'nav.employee_admin_desc': 'Ciclo de vida do colaborador, gestão de benefícios corporativos e atendimento',
    'nav.time_attendance': 'Controle de Ponto e Presença',
    'nav.time_attendance_desc': 'Ponto biométrico, escalas de revezamento, cerca geográfica e banco de horas',
    'nav.leave_management': 'Gestão de Férias e Ausências',
    'nav.leave_management_desc': 'Saldos de férias, atestados, licenças parentais legais e aprovações hierárquicas',

    // Solutions Menu
    'nav.small_business': 'Soluções para PMEs',
    'nav.growing_business': 'Empresas em Crescimento',
    'nav.enterprise_multi_company': 'Grandes Grupos e Múltiplos CNPJs',
    'nav.multi_branch': 'Múltiplas Filiais',
    'nav.pan_african': 'Expansão Pan-Africana',

    // Resources Menu
    'nav.compliance_center': 'Centro de Conformidade Legal e Fiscal',
    'nav.roi_calculator': 'Calculadora de ROI da Terceirização',
    'nav.data_migration': 'Centro de Migração de Dados',
    'nav.implementation_timeline': 'Cronograma de Implantação',
    'nav.integrations_directory': 'Diretório de Integrações',
    'nav.security_center': 'Centro de Segurança Corporativa',

    // Live Portals
    'portal.client_admin': 'Portal Executivo do Cliente',
    'portal.employee_ess': 'Portal do Colaborador (ESS)',
    'portal.manager_mss': 'Portal do Gestor (MSS)',
    'portal.outsourcing_ops': 'Centro de Operações NextSofthr',
    'portal.switch_role': 'Trocar de Ambiente',

    // Hero Section
    'hero.badge': 'Infraestrutura Gerenciada de RH e Folha Pan-Africana',
    'hero.title_start': 'Terceirização Moderna de Pessoal para',
    'hero.title_highlight': 'Empresas Africanas de Alto Crescimento',
    'hero.subtitle': 'A NextSofthr combina especialistas locais certificados, automação fiscal e portais em nuvem para gerir a folha de pagamento com 100% de precisão e zero multas.',
    'hero.cta_quote': 'Solicitar Cotação Instantânea',
    'hero.cta_portals': 'Explorar Portais ao Vivo',
    'hero.guarantee': 'Garantia de Zero Multas Regulatórias',
    'hero.coverage_count': 'Mais de 15 Países Atendidos',
    'hero.sla_time': 'SLA de Pontualidade de 99,9%',

    // Floating Live Chat
    'chat.launcher_text': 'Fale com um Especialista em RH...',
    'chat.online_status': 'Online',
    'chat.active_now': 'Online agora · Resposta típica: < 2 min',
    'chat.advisor_name': 'Zainab Al-Hassan',
    'chat.advisor_role': 'Consultora Sênior de Operações de RH e Conformidade',
    'chat.welcome_message': "Olá! Sou a Zainab da NextSofthr Terceirização. Deseja otimizar sua folha de pagamento, terceirizar a administração de pessoal ou garantir conformidade fiscal em suas operações na África?",
    'chat.input_placeholder': 'Digite sua dúvida ou necessidade...',
    'chat.send': 'Enviar',
    'chat.reset': 'Reiniciar',
    'chat.prompt_quote': '💰 Solicitar Orçamento de Terceirização de Folha',
    'chat.prompt_countries': '🌍 Cobertura em Angola, Moçambique e +15 Países',
    'chat.prompt_compliance': '🛡️ Recolhimento de Impostos (IRT) e Previdência (INSS)',
    'chat.prompt_demo': '🚀 Agendar Demonstração de 15 Minutos',
    'chat.prompt_portals': '👥 Conhecer os Portais de Autoatendimento',
    'chat.callback_title': 'Solicitar Contato Telefônico',
    'chat.callback_desc': 'Deixe seus dados e um de nossos Sócios Especialistas entrará em contato em até 15 minutos.',
    'chat.callback_btn': 'Pedir Ligação',
    'chat.return_to_chat': 'Voltar ao Chat',
    'chat.confirm_callback': 'Confirmar Ligação em 15 Min',
    'chat.security_notice': 'Atendimento criptografado e em conformidade com ISO-27001 e normas de proteção de dados',

    // Footer
    'footer.cta_title': 'Pronto para terceirizar seu RH e folha de pagamento com total tranquilidade?',
    'footer.cta_sub': 'Junte-se a grandes empresas que confiam na NextSofthr para processar sua folha com exatidão, pontualidade e conformidade jurídica rigorosa.',
    'footer.talk_expert': 'Falar com um Especialista',
    'footer.calculate_needs': 'Calcular Suas Necessidades',
    'footer.rights': 'Todos os direitos reservados. Plataforma NextSofthr.'
  },

  es: {
    // Top Ribbon
    'ribbon.badge': 'Externalización Panafricana de Nóminas y Recursos Humanos',
    'ribbon.coverage': 'Presente en Guinea Ecuatorial, Nigeria, Ghana, Kenia, Senegal y +15 mercados',
    'ribbon.currency': 'Moneda',
    'ribbon.language': 'Idioma',
    'ribbon.theme': 'Tema',
    'ribbon.compliance': 'Centro de Cumplimiento',
    'ribbon.calculator': 'Calculadora de ROI',

    // Nav Items
    'nav.home': 'Inicio',
    'nav.outsourcing': 'Externalización',
    'nav.solutions': 'Soluciones',
    'nav.packages': 'Planes',
    'nav.partners': 'Socios',
    'nav.resources': 'Recursos',
    'nav.portals': 'Portales en Vivo',
    'nav.talk_expert': 'Hablar con un Experto',
    
    // Outsourcing Mega Menu
    'nav.outsourcing_lines': 'Líneas de Servicios de Externalización',
    'nav.outsourcing_lines_sub': 'Operaciones delegadas con tecnología de vanguardia para equipos modernos',
    'nav.hub_overview': 'Visión General del Hub',
    'nav.payroll_outsourcing': 'Externalización de Nóminas',
    'nav.payroll_outsourcing_desc': 'Cálculo íntegro bruto a neto, liquidación tributaria, retenciones y dispersión salarial',
    'nav.hr_administration': 'Administración de RRHH',
    'nav.hr_administration_desc': 'Expedientes laborales, auditoría jurídica de contratos y legislación laboral aplicable',
    'nav.managed_hr': 'Servicios de RRHH Gestionados',
    'nav.managed_hr_desc': 'Asesores HRBP dedicados, desarrollo de talento y consultoría para directivos',
    'nav.recruitment_outsourcing': 'Externalización de Selección (RPO)',
    'nav.recruitment_outsourcing_desc': 'Atracción de talento panafricano, pruebas técnicas homologadas e inducción',
    'nav.employee_admin': 'Administración de Empleados',
    'nav.employee_admin_desc': 'Ciclo de vida del empleado, plan de beneficios, certificados laborales y consultas',
    'nav.time_attendance': 'Control de Tiempo y Asistencia',
    'nav.time_attendance_desc': 'Fichaje biométrico, cuadrantes de turnos, geovalla y auditoría de horas extras',
    'nav.leave_management': 'Gestión de Permisos y Vacaciones',
    'nav.leave_management_desc': 'Devengo de vacaciones, bajas médicas y de maternidad, aprobaciones multinivel',

    // Solutions Menu
    'nav.small_business': 'Soluciones para PYMES',
    'nav.growing_business': 'Empresas en Expansión',
    'nav.enterprise_multi_company': 'Grandes Corporaciones Multiempresa',
    'nav.multi_branch': 'Plantillas Multisucursal',
    'nav.pan_african': 'Expansión Panafricana',

    // Resources Menu
    'nav.compliance_center': 'Centro de Cumplimiento Legal y Fiscal',
    'nav.roi_calculator': 'Calculadora de ROI de Externalización',
    'nav.data_migration': 'Centro de Migración de Datos',
    'nav.implementation_timeline': 'Cronograma de Implementación',
    'nav.integrations_directory': 'Directorio de Integraciones',
    'nav.security_center': 'Centro de Seguridad Corporativa',

    // Live Portals
    'portal.client_admin': 'Portal Directivo del Cliente',
    'portal.employee_ess': 'Portal del Empleado (ESS)',
    'portal.manager_mss': 'Portal del Responsable (MSS)',
    'portal.outsourcing_ops': 'Centro de Operaciones NextSofthr',
    'portal.switch_role': 'Cambiar de Entorno',

    // Hero Section
    'hero.badge': 'Infraestructura Gestionada de RRHH y Nómina Panafricana',
    'hero.title_start': 'Externalización Laboral Moderna para',
    'hero.title_highlight': 'Empresas Africanas de Alto Rendimiento',
    'hero.subtitle': 'NextSofthr reúne a especialistas laborales certificados, cumplimiento tributario automatizado y portales cloud multipaís para gestionar su nómina con precisión del 100%.',
    'hero.cta_quote': 'Solicitar Presupuesto de Nómina',
    'hero.cta_portals': 'Ver Portales en Vivo',
    'hero.guarantee': 'Garantía 100% de Cero Sanciones Legales',
    'hero.coverage_count': 'Más de 15 Jurisdicciones Africanas',
    'hero.sla_time': 'SLA de Puntualidad del 99,9%',

    // Floating Live Chat
    'chat.launcher_text': 'Consulte con un Especialista en RRHH...',
    'chat.online_status': 'En línea',
    'chat.active_now': 'En línea ahora · Respuesta promedio: < 2 min',
    'chat.advisor_name': 'Zainab Al-Hassan',
    'chat.advisor_role': 'Especialista Sénior en Operaciones de Personas y Cumplimiento',
    'chat.welcome_message': "¡Hola! Soy Zainab de NextSofthr Externalización. ¿Desea optimizar el cálculo de su nómina, delegar la administración laboral o asegurar el cumplimiento estatutario en sus filiales africanas?",
    'chat.input_placeholder': 'Escriba su consulta o requerimiento...',
    'chat.send': 'Enviar',
    'chat.reset': 'Reiniciar',
    'chat.prompt_quote': '💰 Solicitar Presupuesto de Externalización',
    'chat.prompt_countries': '🌍 Cobertura en Guinea Ecuatorial, Nigeria y +15 Países',
    'chat.prompt_compliance': '🛡️ Liquidación de IRPF, Seguridad Social y Pensiones',
    'chat.prompt_demo': '🚀 Agendar Demostración en Vivo de 15 Min',
    'chat.prompt_portals': '👥 Explorar Portales de Empleados y Gestores',
    'chat.callback_title': 'Solicitud de Llamada Inmediata',
    'chat.callback_desc': 'Facilítenos sus datos y uno de nuestros Socios Consultores le llamará en un plazo de 15 minutos.',
    'chat.callback_btn': 'Solicitar Llamada',
    'chat.return_to_chat': 'Volver al Chat',
    'chat.confirm_callback': 'Confirmar Llamada en 15 Min',
    'chat.security_notice': 'Consulta cifrada conforme a normas de seguridad ISO-27001 y protección de datos',

    // Footer
    'footer.cta_title': '¿Listo para externalizar sus nóminas y RRHH con total tranquilidad?',
    'footer.cta_sub': 'Únase a las corporaciones líderes que confían en NextSofthr por su puntualidad en pagos, rigor legal absoluto y apoyo consultivo de primer nivel.',
    'footer.talk_expert': 'Hablar con un Experto',
    'footer.calculate_needs': 'Calcular Sus Necesidades',
    'footer.rights': 'Todos los derechos reservados. Plataforma de Externalización NextSofthr.'
  }
};

interface LanguageContextType {
  language: LanguageConfig;
  setLanguageCode: (code: SupportedLanguage) => void;
  supportedLanguages: LanguageConfig[];
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageConfig>(() => {
    try {
      const saved = localStorage.getItem('nextsoft_language') as SupportedLanguage;
      if (saved) {
        const found = SUPPORTED_LANGUAGES.find(l => l.code === saved);
        if (found) return found;
      }
      // Check browser navigator language
      if (typeof navigator !== 'undefined' && navigator.language) {
        const browserPrefix = navigator.language.slice(0, 2).toLowerCase();
        const matched = SUPPORTED_LANGUAGES.find(l => l.code === browserPrefix);
        if (matched) return matched;
      }
    } catch {
      // Safe fallback
    }
    return SUPPORTED_LANGUAGES[0]; // Default English
  });

  const setLanguageCode = (code: SupportedLanguage) => {
    const found = SUPPORTED_LANGUAGES.find(l => l.code === code);
    if (found) {
      setLanguage(found);
      try {
        localStorage.setItem('nextsoft_language', code);
      } catch {
        // Safe ignore
      }
    }
  };

  const t = (key: string, fallback?: string): string => {
    const currentDict = TRANSLATIONS[language.code];
    if (currentDict && currentDict[key]) {
      return currentDict[key];
    }
    // Fallback to English dictionary
    const fallbackDict = TRANSLATIONS.en;
    if (fallbackDict && fallbackDict[key]) {
      return fallbackDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguageCode,
        supportedLanguages: SUPPORTED_LANGUAGES,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
