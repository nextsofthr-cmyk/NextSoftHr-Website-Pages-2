import { Translations } from './types';

export const esTranslations: Translations = {
  nav: {
    platform: 'Plataforma',
    hrPayroll: 'RR. HH. y Nómina',
    trustSecurity: 'Confianza y Seguridad',
    resources: 'Recursos',
    contact: 'Contacto',
    signIn: 'Iniciar Sesión',
    policyAdmin: 'Admin Política',
    privacyDesk: 'Mesa de Privacidad',
    platformOverview: 'Visión General',
    securityArch: 'Arquitectura de Seguridad',
    yourRights: 'Sus Derechos de Privacidad',
    contactDpo: 'Contactar al DPO',
    submitRequest: 'Enviar Solicitud',
  },
  hero: {
    badge: 'Centro de Confianza y Cumplimiento NextSoftHR',
    title: 'Política de Privacidad',
    subtitle:
      'Su privacidad nos importa. Conozca cómo NextSoftHR recopila, utiliza, protege y gestiona su información personal al utilizar nuestra plataforma y servicios.',
    lastUpdated: 'Última Actualización:',
    version: 'Versión',
    updateNotice: '(Actualizar Aviso)',
    searchPlaceholder:
      "Buscar en las secciones (ej. 'retención', 'IA', 'cookies', 'derechos')...",
    clear: 'Limpiar',
    cookiePrefs: 'Preferencias de Cookies',
    requestAssistance: 'Solicitar Asistencia de Privacidad',
    printPdf: 'Imprimir / PDF',
    governanceCore: 'Núcleo de Gobernanza de Datos',
    globalArch: 'Arquitectura Global NextSoftHR',
    activeShield: 'Escudo Activo',
    workforceIdentity: 'Identidad de Personal y Nómina',
    workforceSub: 'Expedientes laborales · Salarios · Asistencia',
    encryptionBridge: 'Cifrado TLS 1.3 · AES-256 en Tránsito y Reposo',
    cloudVault: 'Bóveda en la Nube y Copias Geodiversas',
    cloudVaultSub: 'Particiones cifradas · Respaldos diarios',
    aiEngine: 'IA Responsable y Automatización',
    aiEngineSub: 'Supervisión humana · Telemetría anonimizada',
    governedBadge: 'Gobernado',
    footerRegion: 'África y Mercados Internacionales',
    structuredArticles: '16 Artículos Estructurados',
  },
  toc: {
    title: 'Tabla de Contenidos',
    readTime: '~8 min de lectura',
    needAssistance: '¿Necesita ayuda?',
    assistanceText:
      'Dirija sus consultas sobre derechos de datos laborales a nuestra Oficina de Protección de Datos.',
    contactTeam: 'Contactar al Equipo de Privacidad →',
    section: 'Sección',
    items: {
      introduction: 'Introducción',
      informationWeCollect: 'Información que Recopilamos',
      howWeUseInformation: 'Cómo Usamos su Información',
      cookiesTracking: 'Cookies y Tecnologías de Rastreo',
      dataSharing: 'Intercambio y Divulgación de Datos',
      dataStorageSecurity: 'Almacenamiento y Seguridad de Datos',
      dataRetention: 'Retención y Conservación de Datos',
      yourPrivacyRights: 'Sus Derechos de Privacidad',
      employeeCustomerData: 'Datos de Empleados y Clientes',
      internationalTransfers: 'Transferencias Internacionales de Datos',
      thirdPartyServices: 'Servicios de Terceros e Integraciones',
      childrensPrivacy: 'Privacidad de Menores',
      marketingCommunications: 'Comunicaciones de Marketing',
      aiAutomatedProcessing: 'IA y Procesamiento Automatizado',
      changesToPolicy: 'Cambios a esta Política',
      contactUs: 'Contáctenos',
    },
  },
  policy: {
    sec1: {
      tag: 'Alcance General',
      title: '1. Introducción',
      p1: "NextSoftHR ('NextSoftHR', 'nosotros', 'nuestro' o 'nuestros') respeta la privacidad y los derechos fundamentales de protección de datos de sus usuarios, empleadores, trabajadores, contratistas independientes, clientes potenciales, socios comerciales y visitantes del sitio web. Nos comprometemos a procesar la información personal y laboral bajo estrictos estándares de transparencia, licitud y responsabilidad.",
      p2: 'Esta Política de Privacidad describe cómo NextSoftHR recopila, utiliza, almacena, asegura y divulga información personal cuando usted interactúa con nosotros en diversos canales, incluyendo cuando:',
      scopes: [
        'Visita o navega por nuestro sitio web oficial (www.nextsofthr.org)',
        'Crea, configura o administra una cuenta corporativa de empresa',
        'Accede o utiliza el paquete de software en la nube de NextSoftHR',
        'Contrata nuestros servicios de externalización de nómina y gestión de RR. HH.',
        'Contacta a nuestros equipos de soporte técnico y atención al cliente',
        'Solicita demostraciones de software o propuestas comerciales',
        'Se suscribe a licencias de software o planes comerciales',
        'Se comunica con NextSoftHR por correo electrónico, chat o teléfono',
        'Conecta aplicaciones de terceros e interfaces API integradas',
      ],
      boxTitle: 'Cobertura Integral Multi-Empresa',
      boxDesc:
        'NextSoftHR impulsa la gestión integral de empresas: Gestión de Recursos Humanos, Cálculo y Dispersión de Nómina, Tiempo y Asistencia, Autoservicio del Empleado (ESS), Autoservicio del Gerente (MSS), Gestión de Vacaciones y Permisos, Turnos y Horarios, Adquisición de Talento y Selección, CRM, Finanzas, Proyectos y Tareas, Externalización de Nómina y RR. HH., Gestión Comercial y Asistente de RR. HH. con IA.',
    },
    sec2: {
      tag: 'Taxonomía de Datos',
      title: '2. Información que Recopilamos',
      intro:
        'Recopilamos estrictamente los datos personales que resultan adecuados, pertinentes y limitados a lo necesario para los fines operativos para los cuales son tratados. No solicitamos ni registramos datos innecesarios.',
      categoryOf: 'Categoría',
      processedElements: 'Elementos de Datos Representativos Tratados:',
      adminNotice:
        'Los atributos de datos están regulados por las políticas administrativas y los esquemas de permisos de cada empresa cliente.',
      categories: [
        {
          title: 'Información de Cuenta',
          desc: 'Credenciales de identificación personal y datos de contacto facilitados durante el alta o la administración de la cuenta.',
          items: [
            'Nombre legal completo y nombre de uso habitual',
            'Dirección de correo electrónico corporativo y directo',
            'Número de teléfono de contacto (móvil y de oficina)',
            'Razón social de la empresa y número de identificación fiscal',
            'Cargo, puesto en la organización y nivel de permisos de acceso',
            'Credenciales de acceso cifradas y tokens de autenticación',
            'Idioma del sistema, zona horaria y preferencias de interfaz',
          ],
        },
        {
          title: 'Información Empresarial y Expedientes Laborales',
          desc: 'Datos de la organización y expedientes del personal cargados o gestionados por los administradores de la empresa en la plataforma.',
          items: [
            'Estructura de la compañía, filiales y sedes físicas de trabajo',
            'Organigramas por departamentos, líneas de reporte y centros de costos',
            'Perfiles individuales de empleados, contratos laborales y números de seguridad social',
            'Cálculos de nómina, estructuras salariales, retenciones y cuentas bancarias',
            'Horarios laborales, registros de reloj checador biométrico y sumarios de asistencia',
            'Saldos de vacaciones, solicitudes de permisos e informes médicos justificativos',
            'Programación de turnos, cuadrantes de trabajo y asignación de tareas',
          ],
        },
        {
          title: 'Información Técnica y de Dispositivos',
          desc: 'Telemetría generada de forma automatizada al acceder a las plataformas web, móviles o API de NextSoftHR.',
          items: [
            'Dirección de Protocolo de Internet (IP) y ubicación aproximada (a nivel de ciudad/país)',
            'Tipo de navegador, versión y configuración de idioma',
            'Sistema operativo, modelo del dispositivo y resolución de pantalla',
            'Marcas de tiempo de las sesiones, frecuencia de uso y rutas de navegación',
            'Telemetría de diagnóstico, códigos de error HTTP y métricas de rendimiento',
            'Tokens de sesión, cookies seguras de autenticación y cabeceras contra ataques CSRF',
          ],
        },
        {
          title: 'Información de Comunicación y Soporte',
          desc: 'Consultas entrantes, registros de atención al cliente y valoraciones emitidas durante el soporte.',
          items: [
            'Tickets de asistencia técnica, transcripciones de chat y correos intercambiados',
            'Notas de demostraciones guiadas, requerimientos de software y pliegos de condiciones',
            'Respuestas a encuestas de calidad y sugerencias de mejora funcional',
            'Comunicaciones relativas a facturación, presupuestos y suscripciones',
          ],
        },
      ],
    },
    sec3: {
      tag: 'Finalidades del Tratamiento',
      title: '3. Cómo Usamos su Información',
      intro:
        'Tratamos datos personales y corporativos exclusivamente para fines operativos, comerciales y técnicos legítimos, respaldados por bases jurídicas válidas:',
      purposes: [
        {
          title: 'Prestación de Servicios de RR. HH. y Nómina',
          desc: 'Ejecución automatizada del cálculo salarial neto y bruto, generación de recibos de nómina, retenciones de impuestos y aportes a la previsión social.',
        },
        {
          title: 'Gestión de Cuentas y Accesos de Usuario',
          desc: 'Autenticación de colaboradores autorizados, control de roles de usuario y aplicación de directivas de seguridad corporativa.',
        },
        {
          title: 'Gestión Centralizada de Expedientes de Personal',
          desc: 'Organización de historiales laborales, contratos, contactos de emergencia y promociones internas.',
        },
        {
          title: 'Control de Horarios, Asistencia y Vacaciones',
          desc: 'Registro de cuadrantes de turnos, gestión de días de descanso, sincronización con lectores biométricos y cálculo de horas extra.',
        },
        {
          title: 'Soporte Técnico Especializado para Empresas',
          desc: 'Resolución de incidencias técnicas, aclaración de dudas operativas y cumplimiento de acuerdos de nivel de servicio (SLA).',
        },
        {
          title: 'Fiabilidad y Rendimiento de la Plataforma',
          desc: 'Supervisión en tiempo real del estado de los servidores, tiempos de respuesta y velocidad de transacciones API.',
        },
        {
          title: 'Seguridad y Prevención contra Fraudes',
          desc: 'Detección de ataques de fuerza bruta, prevención de intrusiones no autorizadas y auditoría de acciones administrativas críticas.',
        },
        {
          title: 'Facturación y Cobro de Suscripciones',
          desc: 'Procesamiento de pagos de licencias, emisión de facturas y control de renovaciones contractuales.',
        },
        {
          title: 'Comunicaciones Operativas Imprescindibles',
          desc: 'Envío de notificaciones de seguridad, avisos de mantenimiento planificado y alertas normativas de servicio.',
        },
        {
          title: 'Comunicaciones de Marketing Consentidas',
          desc: 'Envío de seminarios web, manuales de buenas prácticas y avisos de lanzamientos cuando exista consentimiento expreso previo.',
        },
        {
          title: 'Cumplimiento Legal y Normativo',
          desc: 'Atención a legislaciones laborales locales, requerimientos tributarios y mandamientos judiciales obligatorios.',
        },
        {
          title: 'Innovación y Mejora de Productos',
          desc: 'Análisis agregado de patrones de uso anónimos para optimizar los flujos de trabajo de recursos humanos y mejorar la interfaz.',
        },
      ],
    },
    sec4: {
      tag: 'Tecnologías del Navegador',
      title: '4. Cookies y Tecnologías de Rastreo',
      intro:
        'NextSoftHR y sus aliados tecnológicos autorizados emplean cookies, tokens HTTP protegidos y almacenamiento local para asegurar el funcionamiento de la plataforma, recordar sus preferencias y monitorizar el tráfico.',
      types: [
        {
          title: 'Cookies Estrictamente Necesarias',
          desc: 'Imprescindibles para autenticar sesiones, balancear cargas del servidor, proteger contra CSRF y navegar.',
        },
        {
          title: 'Cookies Funcionales',
          desc: 'Conservan el idioma de trabajo, la empresa activa, la zona horaria y configuraciones personalizadas de visualización.',
        },
        {
          title: 'Cookies de Análisis y Rendimiento',
          desc: 'Recopilan métricas anónimas para evaluar los tiempos de respuesta y el uso de las funciones principales.',
        },
        {
          title: 'Cookies de Preferencias',
          desc: 'Recuerdan las densidades de filas en las tablas y los límites de paginación configurados por el usuario.',
        },
        {
          title: 'Tecnologías de Seguridad',
          desc: 'Detectan firmas atípicas en los dispositivos para evitar accesos indebidos o suplantaciones de identidad.',
        },
      ],
      manageTitle: 'Gestione sus Preferencias',
      manageDesc:
        'Puede examinar o modificar su consentimiento respecto a cookies opcionales en cualquier momento.',
      button: 'Preferencias de Cookies',
      browserNote:
        'La gran mayoría de los navegadores permiten administrar las cookies en sus ajustes. Tenga en cuenta que inhabilitar cookies necesarias podría impedirle iniciar sesión en el software NextSoftHR.',
    },
    sec5: {
      tag: 'Subencargados y Divulgación',
      title: '5. Intercambio y Divulgación de Datos',
      intro:
        'NextSoftHR no comercializa, alquila ni cede sus datos personales ni de nómina a intermediarios publicitarios. Compartimos información estrictamente bajo el principio de necesidad de conocer con las siguientes entidades:',
      entities: [
        {
          title: 'Usuarios Corporativos Autorizados',
          desc: 'Compañeros de trabajo y supervisores habilitados dentro de la cuenta de su empresa, según los permisos otorgados por su administrador de RR. HH.',
        },
        {
          title: 'Alojamiento e Infraestructura en la Nube',
          desc: 'Centros de datos en la nube con certificaciones de primer orden, redes de entrega de contenidos (CDN) y bóvedas de datos cifradas.',
        },
        {
          title: 'Procesadores de Pago y Entidades Financieras',
          desc: 'Bancos e instituciones certificadas PCI-DSS que permiten dispersar sueldos y procesar pagos de suscripciones.',
        },
        {
          title: 'Proveedores de Ciberseguridad y Analítica',
          desc: 'Compañías especializadas en supervisión de tráfico, defensa contra incidentes y registro de eventos del sistema.',
        },
        {
          title: 'Socios de Integración de Software',
          desc: 'Sistemas informáticos que su empresa decida vincular (paquetes contables, lectores biométricos, herramientas de colaboración).',
        },
        {
          title: 'Asesores Legales y Auditores Externos',
          desc: 'Abogados y auditores jurados sujetos a estrictas normas de confidencialidad y secreto profesional.',
        },
        {
          title: 'Autoridades Públicas y Judiciales',
          desc: 'Organismos tributarios, inspecciones de trabajo o tribunales competentes únicamente en virtud de mandatos legales válidos.',
        },
      ],
    },
    sec6: {
      tag: 'Arquitectura de Seguridad',
      title: '6. Almacenamiento y Seguridad de Datos',
      intro:
        'NextSoftHR aplica rigurosas salvaguardas técnicas y organizativas diseñadas para blindar la información personal y empresarial frente a accesos no autorizados, pérdidas, alteraciones o destrucción ilícita. Aunque ningún entorno en la nube puede garantizar una inmunidad total, aplicamos una sólida estrategia de defensa en profundidad.',
      standardTag: 'Pilar de Seguridad',
      pillars: [
        {
          title: 'Infraestructura Protegida',
          summary:
            'Entornos en la nube blindados y alojados en centros de datos con certificación ISO Tier-III/IV.',
          details: [
            'Arquitectura con redundancia multizona sin puntos únicos de fallo',
            'Protección frente a ataques DDoS y filtrado mediante Web Application Firewall (WAF)',
            'Redes VPC independientes sin bases de datos expuestas a internet público',
          ],
        },
        {
          title: 'Controles de Acceso Estrictos',
          summary:
            'Principio del mínimo privilegio aplicado a nivel interno y corporativo.',
          details: [
            'Control de acceso basado en roles (RBAC) para nómina, RR. HH. y administración',
            'Autenticación Multifactorial (MFA/2FA) exigida en cuentas con permisos elevados',
            'Cierre automático de sesiones por inactividad e integración con SSO mediante SAML/OIDC',
          ],
        },
        {
          title: 'Cifrado Exhaustivo',
          summary:
            'Protocolos criptográficos robustos que protegen la información en tránsito y en reposo.',
          details: [
            'Cifrado integral TLS 1.3 en todas las conexiones sobre redes públicas',
            'Cifrado por hardware AES de 256 bits para bases de datos y archivos de respaldo',
            'Salting criptográfico y rotación regular de claves de seguridad',
          ],
        },
        {
          title: 'Monitorización y Auditoría',
          summary:
            'Supervisión continua, detección proactiva de incidentes y pistas de auditoría inmutables.',
          details: [
            'Vigilancia automatizada las 24 horas para identificar inicios de sesión inusuales',
            'Registros de auditoría inalterables para cambios salariales y parámetros de nómina',
            'Pruebas periódicas de penetración y revisiones externas de código fuente',
          ],
        },
        {
          title: 'Respaldo y Continuidad de Negocio',
          summary:
            'Mecanismos de restauración fiables para asegurar la continuidad operativa de su empresa.',
          details: [
            'Copias de seguridad diarias cifradas y replicadas en zonas geográficamente aisladas',
            'Objetivos RPO y RTO evaluados trimestralmente en simulacros de recuperación',
            'Respaldos con política WORM (escritura única inmodificable) contra ransomware',
          ],
        },
      ],
      userResponsibility:
        'Aviso de Corresponsabilidad del Usuario: Es deber del usuario proteger la confidencialidad de sus contraseñas, mantener activo el MFA y abstenerse de compartir credenciales con terceros.',
    },
    sec7: {
      tag: 'Calendario de Retención',
      title: '7. Retención y Conservación de Datos',
      intro:
        'Conservamos la información personal únicamente durante el tiempo razonablemente necesario para cumplir con los fines para los cuales fue recopilada, gestionar las cuentas de clientes, cumplir contratos y atender obligaciones laborales y fiscales.',
      table: {
        thCategory: 'Categoría de Datos',
        thPurpose: 'Finalidad Operativa',
        thRetention: 'Plazo de Conservación',
        thRationale: 'Fundamento Legal',
      },
      rules: [
        {
          category: 'Expedientes Laborales y Contratos',
          purpose:
            'Gestión de la relación laboral y administración integral del personal.',
          retentionPeriod:
            'Vigencia del contrato con el cliente + 7 años (o plazo laboral legal)',
          statutoryBasis: 'Legislación Laboral y Previsional',
        },
        {
          category: 'Recibos de Nómina y Declaraciones Fiscales',
          purpose:
            'Fiscalización de remuneraciones, retenciones en la fuente y aportes a pensiones.',
          retentionPeriod:
            'De 6 a 10 años tras el cierre del ejercicio fiscal correspondiente',
          statutoryBasis: 'Normativa Fiscal y Contable',
        },
        {
          category: 'Registros de Acceso y Auditoría',
          purpose:
            'Control de seguridad de la información, prevención de fraudes y análisis forense.',
          retentionPeriod: '12 a 24 meses continuos desde su generación',
          statutoryBasis: 'Interés Legítimo en Ciberseguridad',
        },
        {
          category: 'Soporte al Cliente y Mensajes',
          purpose:
            'Resolución de incidencias, historial técnico y control de calidad del servicio.',
          retentionPeriod: '3 años tras el cierre definitivo del caso',
          statutoryBasis: 'Ejecución Contractual y Soporte',
        },
        {
          category: 'Consentimientos de Marketing y Contactos',
          purpose:
            'Gestión de suscripciones comerciales y novedades del software.',
          retentionPeriod: 'Hasta la retirada del consentimiento o baja',
          statutoryBasis: 'Consentimiento Explícito',
        },
      ],
      expirationNote:
        'Una vez transcurridos los plazos de conservación, los datos son eliminados de forma irreversible mediante borrado criptográfico o convertidos en estadísticas plenamente anonimizadas.',
    },
    sec8: {
      tag: 'Derechos Legales',
      title: '8. Sus Derechos de Privacidad',
      intro:
        'Dependiendo de su jurisdicción y de las leyes de protección de datos aplicables (como las normas de Guinea Ecuatorial, normativas regionales africanas, RGPD o similares), usted dispone de los siguientes derechos fundamentales:',
      rights: [
        {
          name: 'Derecho de Acceso',
          desc: 'Solicitar confirmación y obtener una copia de los datos personales tratados por NextSoftHR.',
        },
        {
          name: 'Derecho de Rectificación',
          desc: 'Solicitar la corrección o actualización de datos incompletos, inexactos o desfasados.',
        },
        {
          name: 'Derecho de Supresión',
          desc: 'Pedir la eliminación de sus datos personales cuando no existan obligaciones legales para retenerlos.',
        },
        {
          name: 'Derecho a la Limitación',
          desc: 'Pausar temporalmente el tratamiento de sus datos durante litigios o verificaciones.',
        },
        {
          name: 'Derecho de Oposición',
          desc: 'Oponerse a actividades de tratamiento basadas únicamente en intereses legítimos corporativos.',
        },
        {
          name: 'Derecho a la Portabilidad',
          desc: 'Recibir sus datos proporcionados en un formato digital estructurado y de lectura mecánica.',
        },
        {
          name: 'Retirada del Consentimiento',
          desc: 'Revocar su autorización en cualquier momento cuando el tratamiento dependa de su consentimiento.',
        },
        {
          name: 'Reclamación ante la Autoridad',
          desc: 'Presentar una queja formal ante el organismo supervisor de protección de datos competente.',
        },
      ],
      ctaTitle: '¿Desea ejercer sus derechos sobre sus datos personales?',
      ctaDesc:
        'Envíe una solicitud formal a nuestro Delegado de Protección de Datos para una respuesta rápida.',
      ctaButton: 'Solicitar Asistencia de Privacidad',
    },
    sec9: {
      tag: 'Deslinde de Responsabilidades',
      title: '9. Datos de Empleados y Clientes',
      intro:
        'Dado que NextSoftHR opera como una plataforma empresarial multi-cliente de gestión de recursos humanos y cálculo de nómina, es indispensable distinguir los roles jurídicos:',
      processorTitle: 'NextSoftHR como Encargado del Tratamiento (Proveedor)',
      processorDesc:
        'NextSoftHR suministra la infraestructura tecnológica, los motores de cálculo de nómina y los módulos de software. Procesamos los datos del personal siguiendo exclusivamente las instrucciones del cliente y de conformidad con el Acuerdo de Tratamiento de Datos (DPA) suscrito.',
      controllerTitle: 'La Empresa Cliente (Empleador) como Responsable del Tratamiento',
      controllerDesc:
        'El cliente empresarial (su empleador o contratante) define qué datos del personal se incorporan, cómo opera el registro de asistencia y qué deducciones aplican. El empleador es directamente responsable del cumplimiento de sus obligaciones legales con sus trabajadores.',
      employeeNoticeTitle: 'Nota para Empleados y Contratistas:',
      employeeNoticeDesc:
        'Si usted es un empleado que utiliza el Autoservicio (ESS) de NextSoftHR y desea consultar su expediente o rectificar un recibo de salario, dirija su solicitud en primer término al departamento de RR. HH. de su empleador. NextSoftHR prestará toda la colaboración técnica requerida a su empleador para atenderle de inmediato.',
    },
    sec10: {
      tag: 'Flujos Transfronterizos',
      title: '10. Transferencias Internacionales de Datos',
      intro:
        'NextSoftHR presta servicios a organizaciones en toda África y en mercados globales. Por ello, la información tratada puede gestionarse o alojarse en servidores situados fuera de su país de residencia.',
      p2: 'Cada vez que transferimos datos internacionalmente, aseguramos salvaguardas legales y técnicas rigurosas de conformidad con las normativas de protección de datos aplicables:',
      safeguards: [
        'Cláusulas Contractuales Tipo (CCT) y Acuerdos de Transferencia con estrictas exigencias de confidencialidad y seguridad.',
        'Evaluaciones de Impacto de Transferencias (EIT) para valorar el marco jurídico en los países receptores.',
        'Opciones de residencia local de datos para corporaciones con requisitos estrictos de soberanía de datos de nómina.',
      ],
    },
    sec11: {
      tag: 'Ecosistema de Conectores',
      title: '11. Servicios e Integraciones de Terceros',
      intro:
        'Nuestra plataforma se conecta sin dificultades con servicios externos como pasarelas bancarias, sistemas de contabilidad empresarial, herramientas colaborativas, proveedores de identidad única (SSO) e infraestructuras en la nube.',
      p2: 'Le recordamos que los servicios de terceros se rigen por sus propias políticas de privacidad. Al habilitar conectores externos, le recomendamos revisar detenidamente su documentación sobre tratamiento de datos antes de autorizar el intercambio.',
    },
    sec12: {
      tag: 'Salvaguarda de Menores',
      title: '12. Privacidad de Menores de Edad',
      intro:
        'NextSoftHR es una plataforma tecnológica de empresa a empresa (B2B) orientada a organizaciones, empleadores y profesionales en activo. No ha sido diseñada ni tiene el propósito de recopilar intencionadamente datos de menores de 16 años (o de la edad legal laboral vigente en su país).',
      p2: 'En caso de constatar que se han recabado datos de un menor sin el consentimiento verificable de sus tutores legales, procederemos de inmediato a su eliminación definitiva de nuestras bases de datos.',
    },
    sec13: {
      tag: 'Difusión Comercial',
      title: '13. Comunicaciones de Marketing',
      intro:
        'NextSoftHR podrá remitir ocasionalmente novedades sobre el software, invitaciones a seminarios web y boletines informativos a los administradores de cuentas o a quienes hayan manifestado su conformidad previa.',
      boxTitle: 'Cancelar Suscripción a Comunicaciones de Marketing',
      boxDesc:
        "Puede darse de baja en cualquier momento pulsando en el enlace 'Darse de baja' presente al pie de cada correo, o indicando su correo corporativo aquí abajo:",
      inputPlaceholder: 'Introduzca su correo electrónico corporativo',
      optOutButton: 'Darse de Baja',
      optOutSuccess:
        'Solicitud de baja registrada. El sistema puede tardar hasta 48 horas en completar la sincronización.',
      transactionalNote:
        '*Nota aclaratoria: La baja de marketing no afecta a mensajes transaccionales esenciales, avisos de cierre de nómina, facturas o alertas de seguridad necesarias para su cuenta.',
    },
    sec14: {
      tag: 'Tecnología Inteligente',
      title: '14. Inteligencia Artificial y Procesamiento Automatizado',
      intro:
        'NextSoftHR incorpora capacidades modernas de inteligencia artificial pensadas para optimizar la gestión de personal y agilizar los procedimientos corporativos. Nuestros asistentes de IA pueden apoyar en:',
      features: [
        'Resolución de dudas frecuentes sobre normativas internas de la empresa',
        'Analítica predictiva de asistencia y rotación de colaboradores',
        'Verificación de consistencia y coherencia en los cálculos de nómina',
        'Automatización de fases de incorporación (onboarding) de nuevos empleados',
        'Consolidación de métricas de productividad laboral en la organización',
        'Recomendaciones para equilibrar y optimizar cuadrantes de turnos',
        'Redacción asistida de plantillas y modelos de documentos de RR. HH.',
      ],
      governanceTitle: 'Gobernanza Ética de la IA y Supervisión Humana Continua',
      governanceDesc:
        'Las empresas clientes configuran y administran los módulos de IA bajo su propio criterio. Las sugerencias y estimaciones analíticas tienen carácter informativo de apoyo a la decisión y no constituyen asesoría legal, laboral o fiscal vinculante.',
      hitlTitle: 'Principio del Humano al Mando (HITL):',
      hitlDesc:
        'NextSoftHR defiende categóricamente que ninguna decisión individual con consecuencias jurídicas directas sobre un trabajador (como despidos, sanciones o cambios retributivos) podrá ser adoptada de forma totalmente automatizada sin revisión humana cualificada.',
      disclaimer:
        'No garantizamos que las respuestas generadas por IA estén totalmente exentas de inexactitudes. Todos los informes deben ser validados por un profesional de RR. HH. antes de su aplicación formal.',
    },
    sec15: {
      tag: 'Historial de Versiones',
      title: '15. Cambios a esta Política de Privacidad',
      intro:
        'NextSoftHR se reserva el derecho de revisar y actualizar periódicamente esta Política de Privacidad para adaptarse a nuevas prestaciones de software, exigencias técnicas y novedades normativas.',
      p2: 'Cuando se realicen modificaciones sustanciales, publicaremos un aviso visible en la plataforma o se lo notificaremos por correo electrónico antes de que las modificaciones surtan efecto.',
      statusLabel: 'Estado Actual de la Política:',
      effectiveLabel: 'En vigor el',
      hideHistory: 'Ocultar Historial',
      viewHistory: 'Historial de Versiones',
    },
    sec16: {
      tag: 'Atención y DPO',
      title: '16. Contáctenos',
      bannerTitle: '¿Tiene Dudas sobre su Privacidad?',
      bannerDesc:
        'Si tiene preguntas, inquietudes o desea ejercer sus derechos sobre el tratamiento de datos en NextSoftHR, nuestro equipo de protección de datos está a su entera disposición.',
      orgLabel: 'Organización',
      websiteLabel: 'Sitio Web Oficial',
      hotlineLabel: 'Línea Directa de Privacidad',
      contactBtn: 'Escríbanos',
      visitBtn: 'Visitar NextSoftHR',
      formTitle: 'Presentar una Solicitud Oficial de Privacidad',
      formDesc:
        'Utilice este formulario seguro para remitir solicitudes de acceso, rectificación, supresión o consultas generales a nuestra mesa de cumplimiento.',
    },
  },
  requestForm: {
    receivedTitle: 'Solicitud de Privacidad Registrada',
    receivedDesc:
      'Su solicitud ha sido turnada a nuestra Oficina de Protección de Datos. Se ha generado un acuse de recibo con su número de expediente.',
    ticketRef: 'Número de Expediente:',
    statutoryTime:
      'Conforme a la normativa aplicable, las solicitudes son atendidas en un plazo habitual de 30 días tras verificar su identidad.',
    submitAnother: 'Enviar Otra Solicitud',
    fullNameLabel: 'Nombre Completo',
    fullNamePlaceholder: 'ej. Alejandro Ondo',
    orgLabel: 'Empresa / Organización',
    orgPlaceholder: 'ej. Compañía de Servicios Petroleros S.A.',
    emailLabel: 'Correo Electrónico Corporativo',
    emailPlaceholder: 'usted@empresa.com',
    typeLabel: 'Tipo de Solicitud',
    types: {
      access: 'Acceso a mis Datos Personales',
      correct: 'Rectificación de Datos Inexactos',
      delete: 'Supresión / Borrado de Datos',
      question: 'Consulta General sobre Privacidad',
      security: 'Notificación sobre Incidente de Seguridad',
      other: 'Otro Asunto de Privacidad',
    },
    messageLabel: 'Descripción Detallada de la Solicitud',
    messagePlaceholder:
      'Indique con precisión los datos de nómina o expedientes involucrados, la empresa empleadora o el motivo de su consulta...',
    attachLabel: 'Documento de Soporte o Acreditación (Opcional)',
    attachButton: 'Seleccionar Archivo (PDF, PNG, JPG ≤ 5MB)',
    consentText:
      'Declaro contar con legitimidad para formular esta solicitud y autorizo a NextSoftHR a corroborar mi identidad con los datos aportados, con arreglo a las leyes de protección de datos.',
    submitBtn: 'Enviar Solicitud de Privacidad',
    submittingBtn: 'Enviando solicitud...',
  },
  cookiesModal: {
    title: 'Preferencias de Cookies y Rastreo',
    subtitle: 'Administre cómo NextSoftHR utiliza las cookies en su navegación',
    intro:
      'NextSoftHR utiliza cookies y tecnologías de almacenamiento local para garantizar la estabilidad de las sesiones, asegurar los accesos, recordar sus preferencias de idioma y analizar el uso del servicio. Puede configurar sus opciones a continuación.',
    essentialTitle: 'Cookies Estrictamente Necesarias',
    essentialTag: 'Obligatorio',
    essentialDesc:
      'Fundamentales para la autenticación cifrada, el equilibrio del tráfico, la seguridad CSRF y el desplazamiento en la plataforma. No pueden desactivarse.',
    alwaysActive: 'Siempre Activas',
    functionalTitle: 'Cookies de Funcionalidad y Preferencias',
    functionalDesc:
      'Guardan el idioma elegido, el espacio de trabajo activo, el huso horario y los formatos personalizados de visualización.',
    analyticsTitle: 'Cookies Analíticas y de Rendimiento',
    analyticsDesc:
      'Datos anonimizados y agregados para ayudar a los desarrolladores a suprimir cuellos de botella y mejorar la experiencia de usuario.',
    marketingTitle: 'Cookies de Atribución Comercial',
    marketingDesc:
      'Permiten garantizar que los avisos de nuevas funciones y comunicados profesionales resulten de su interés.',
    savedSuccess: 'Sus preferencias se han guardado satisfactoriamente.',
    rejectOptional: 'Rechazar Opcionales',
    acceptAll: 'Aceptar Todas',
    savePreferences: 'Guardar Preferencias',
  },
  adminModal: {
    title: 'Configuración del Aviso de Política',
    subtitle:
      'Modifique la fecha de vigencia y la versión de manera dinámica sin recompilar el código',
    banner:
      'Los administradores pueden actualizar la fecha de publicación, el identificador de versión y los números de contacto. Los cambios se reflejan inmediatamente en toda la página.',
    dateLabel: 'Fecha de Vigencia Visible',
    versionLabel: 'Identificador de Versión de la Política',
    orgLabel: 'Organización:',
    hotlineLabel: 'Línea de Atención:',
    savedNotice: '¡Aviso actualizado y guardado correctamente!',
    resetBtn: 'Restablecer Valor Predeterminado',
    cancelBtn: 'Cancelar',
    applyBtn: 'Guardar Aviso',
  },
  trust: {
    tag: 'Arquitectura de Seguridad NextSoftHR',
    title: 'Diseñado con la Privacidad y la Seguridad en el Centro',
    subtitle:
      'Nuestra plataforma empresarial de gestión de nómina y recursos humanos ha sido construida para garantizar la confidencialidad de la información laboral y la soberanía de las empresas.',
    cards: [
      {
        title: 'Protección de Datos Robusta',
        desc: 'Diseñado para ayudar a las organizaciones a proteger información sensible de personal mediante cifrado multicapa y particiones estancas.',
        badge: 'Cifrado Total en Reposo',
      },
      {
        title: 'Accesos Blindados',
        desc: 'Permisos granulares por roles (RBAC), autenticación en dos pasos (MFA) obligatoria y control continuo de sesiones activas.',
        badge: 'RBAC y MFA Integrados',
      },
      {
        title: 'Gestión Responsable de Datos',
        desc: 'Herramientas concebidas para administrar datos de nómina con diligencia: ciclos de purga automática y auditorías verificables.',
        badge: 'Herramientas de Cumplimiento',
      },
      {
        title: 'Soporte Panafricano y Global',
        desc: 'Pensado para empresas que operan en África y a nivel internacional, con soporte multimoneda y adaptación a leyes laborales locales.',
        badge: 'SaaS África e Internacional',
      },
    ],
    readyText: 'Apto para Grandes Empresas',
  },
  footer: {
    desc: 'Plataforma Global y Panafricana de Gestión de Recursos Humanos, Nómina y Administración Empresarial para micro, pequeñas, medianas y grandes empresas.',
    platformTitle: 'Plataforma',
    businessTitle: 'Gestión Empresarial',
    resourcesTitle: 'Recursos',
    legalTitle: 'Legal y Confianza',
    backToTop: 'Subir al Inicio',
    allRightsReserved: 'Todos los Derechos Reservados.',
    tagline: 'Arquitectura de Software SaaS de Nómina y RR. HH.',
  },
  liveChat: {
    buttonLabel: 'Chat en Vivo',
    statusOnline: 'Agentes Disponibles en Línea',
    headerTitle: 'Centro de Soporte en Vivo NextSoftHR',
    replyTime: 'Respuesta habitual en menos de 5 minutos',
    tabChat: 'Chatear con un Agente',
    tabChannels: 'Canales Directos',
    tabFaq: 'Preguntas Frecuentes',
    departmentLabel: 'Categoría de la consulta:',
    departments: {
      privacy: 'Privacidad de Datos y DPO',
      hr: 'Asesoría de RR. HH. y Nómina',
      technical: 'Soporte Técnico y Plataforma en la Nube',
      billing: 'Facturación y Suscripciones',
    },
    initialAgentGreeting:
      '¡Hola! Bienvenido al soporte en vivo de NextSoftHR. Nuestros agentes humanos están disponibles para resolver cualquier duda sobre RR. HH., nómina o privacidad. ¿En qué podemos ayudar a su organización hoy?',
    placeholder: 'Escriba su mensaje para un agente...',
    sendButton: 'Enviar',
    agentTyping: 'El agente está escribiendo...',
    callDirect: 'Llamar a la Línea Directa',
    whatsappChat: 'Conversar por WhatsApp',
    emailDesk: 'Enviar Correo al Soporte',
    operatingHours: 'Lunes a Sábado: 8:00 AM – 6:00 PM (WAT / GMT+1)',
    operatingHoursTitle: 'Horario del Servicio de Atención',
    needPrivacyAssistance: '¿Desea enviar una solicitud formal de protección de datos?',
    privacyFormBtn: 'Abrir Formulario del DPO',
    close: 'Cerrar chat',
    minimize: 'Minimizar',
  },
};

