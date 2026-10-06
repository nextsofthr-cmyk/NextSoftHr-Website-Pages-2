import { SectionTranslationMeta } from '../types';

export const ES_SECTIONS: Record<string, SectionTranslationMeta> = {
  introduction: {
    title: 'Introducción & Objeto de la Plataforma',
    category: 'General',
    summary: 'NextSoftHR ofrece una plataforma integral en la nube para nóminas, RRHH y operaciones empresariales. Estos Términos regulan la relación jurídica con el Cliente.',
    paragraphs: [
      'NextSoftHR Ltd. («NextSoftHR», «nosotros», «nuestro» o «nos») desarrolla y opera una plataforma tecnológica en la nube (SaaS) diseñada para que organizaciones de todos los tamaños gestionen empleados, nóminas, control horario, vacaciones, selección de personal (ATS), relaciones comerciales (CRM), finanzas operativas y proyectos corporativos.',
      'Los presentes Términos y Condiciones («Términos» o «Acuerdo») constituyen un contrato vinculante entre NextSoftHR y la persona física o jurídica («Cliente», «usted» o «su») que accede a nuestros servicios, se registra en la plataforma o suscribe un plan comercial.',
      'Al acceder al sitio web www.nextsofthr.org, crear una cuenta de organización o hacer uso de nuestras aplicaciones y APIs, usted declara haber leído, comprendido y aceptado quedar obligado por la totalidad de estos Términos.'
    ],
    bulletPoints: [
      'Aplicable a microempresas, pymes y grandes corporaciones multinacionales.',
      'Regula todos los módulos de gestión, portales de autoservicio y servicios externalizados.',
      'Requiere aceptación formal antes de ejecutar cálculos de nómina en producción.'
    ]
  },

  'acceptance-of-terms': {
    title: 'Aceptación de los Términos de Servicio',
    category: 'General',
    summary: 'El uso de los servicios formaliza el consentimiento vinculante de las presentes condiciones por parte de un representante con poderes bastantes de su organización.',
    highlightBoxTitle: 'Aviso de Examen Legal Previo',
    highlightBoxText: 'Lea atentamente estos Términos antes de procesar nóminas salariales o conceder accesos corporativos a su plantilla.',
    paragraphs: [
      'Al marcar la casilla de aceptación durante el registro, firmar una Orden de Pedido (Order Form) o continuar utilizando la Plataforma, confirma su conformidad incondicional con todas las estipulaciones aquí recogidas.',
      'Si formaliza este acuerdo en representación de una sociedad mercantil, organismo o entidad jurídica, declara y garantiza disponer de las facultades de representación legal suficientes para vincularla.',
      'En caso de no aceptar estos Términos o carecer de los poderes necesarios, deberá cesar de inmediato cualquier acceso y abstenerse de utilizar la Plataforma NextSoftHR.'
    ]
  },

  definitions: {
    title: 'Definiciones & Terminología Legal',
    category: 'General',
    summary: 'Conceptos normativos y operativos esenciales definidos para brindar absoluta transparencia y seguridad jurídica en el mercado hispanohablante e internacional.',
    paragraphs: [
      'A los efectos de los presentes Términos, los vocablos iniciados en mayúscula tendrán el significado unívoco que se les atribuye en el glosario interactivo que figura a continuación y en el clausulado del presente documento.',
      'Estas definiciones conservan idéntico valor interpretativo tanto en singular como en plural y en cualquiera de sus declinaciones gramaticales.'
    ]
  },

  eligibility: {
    title: 'Elegibilidad & Capacidad de Contratación',
    category: 'General',
    summary: 'La Plataforma está reservada exclusivamente a empresas y profesionales en ejercicio con plena capacidad legal, excluyéndose el uso doméstico particular.',
    paragraphs: [
      'NextSoftHR es una solución de software de naturaleza exclusivamente empresarial (B2B). Para contratar los servicios o activar una cuenta, el Cliente debe ser una entidad mercantil legalmente constituida o un profesional autónomo debidamente censado ante la administración tributaria correspondiente.',
      'Cualquier Usuario individual con acceso a la Plataforma debe tener al menos dieciocho (18) años de edad o haber alcanzado la mayoría de edad legal en su país de residencia.',
      'La Plataforma no ha sido diseñada ni se licencia para fines personales, familiares o de consumo privado en el marco del derecho de consumidores.'
    ]
  },

  'account-registration': {
    title: 'Registro de Cuenta & Custodia de Credenciales',
    category: 'General',
    summary: 'El Cliente debe facilitar información fidedigna, custodiar sus contraseñas con la máxima diligencia y responsabilizarse de la gestión de sus administradores.',
    paragraphs: [
      'Al crear la cuenta corporativa, el Cliente se obliga a suministrar datos empresariales exactos, veraces, completos y permanentemente actualizados (denominación social, CIF/NIF, domicilio social y datos de contacto de apoderados).',
      'El Cliente asume la total responsabilidad de mantener la confidencialidad de sus claves de acceso, factores de doble autenticación (2FA) y tokens de API. Toda actividad realizada mediante las credenciales del Cliente se presumirá válidamente autorizada por este.',
      'El Administrador designado tiene la potestad de otorgar o retirar permisos a los miembros del equipo. En caso de sustracción, pérdida o sospecha de acceso ilegítimo, el Cliente debe notificarlo de inmediato a NextSoftHR a través de security@nextsofthr.org.'
    ],
    bulletPoints: [
      'Obligación de activar autenticación multifactor (MFA/2FA) para roles con privilegios de administrador.',
      'Revocación inmediata de accesos en caso de despido, cese o cambio de puesto de cualquier empleado.',
      'Prohibición tajante de compartir un mismo perfil de usuario entre varios empleados o personas.'
    ]
  },

  'user-responsibilities': {
    title: 'Responsabilidades del Usuario & Uso Aceptable',
    category: 'General',
    summary: 'Prohibición estricta de ingeniería inversa, pruebas de intrusión no autorizadas, malware o manipulaciones dolosas en cálculos de nómina.',
    paragraphs: [
      'El Cliente se compromete a utilizar la Plataforma NextSoftHR con estricto apego a las leyes aplicables, en especial la normativa laboral, fiscal y de protección de datos.',
      'Queda expresamente prohibido al Cliente y a cualquiera de sus Usuarios autorizados:',
      'Cualquier transgresión comprobada de estas reglas faculta a NextSoftHR para suspender cautelarmente o resolver de inmediato el acceso al servicio sin derecho a compensación o reintegro alguno.'
    ],
    bulletPoints: [
      'Realizar ingeniería inversa, descompilar o intentar acceder al código fuente del software.',
      'Evadir, probar o vulnerar los controles de seguridad y cortafuegos de la infraestructura sin consentimiento.',
      'Introducir o transmitir virus informáticos, troyanos, gusanos o cualquier código perjudicial.',
      'Simular nóminas ficticias, falsear cotizaciones o ejecutar transacciones deliberadamente fraudulentas.',
      'Extraer masivamente datos de otros clientes o perjudicar la estabilidad del entorno compartido en la nube.'
    ]
  },

  'platform-use': {
    title: 'Uso de la Plataforma NextSoftHR',
    category: 'Modules',
    summary: 'NextSoftHR otorga una licencia de acceso revocable, no exclusiva e intransferible a los módulos contratados para la operativa interna del Cliente.',
    paragraphs: [
      'Siempre que el Cliente satisfaga los honorarios convenidos y respete las condiciones estipuladas, NextSoftHR le concede una licencia limitada, revocable, no exclusiva e intransferible para acceder a la Plataforma a nivel global, para el exclusivo fin de su operativa corporativa.',
      'Las funcionalidades a las que tiene acceso el Cliente dependerán de los módulos suscritos en su plan (Gestión de Personal, Nóminas, Control Horario, Vacaciones, Selección ATS, CRM, Finanzas, Proyectos y Autoservicio).'
    ]
  },

  'hr-management': {
    title: 'Servicios de Gestión de Recursos Humanos (RRHH)',
    category: 'Modules',
    summary: 'Expedientes laborales digitales, organigramas departamentales, procesos de incorporación y gestión integral del ciclo de vida del personal.',
    paragraphs: [
      'El módulo de RRHH permite modelar la estructura organizativa de la empresa, digitalizar la documentación de los empleados (contratos, títulos, números de seguridad social, personas de contacto) y dirigir los circuitos de bienvenida (onboarding) y bajas.',
      'El Cliente ejerce la dirección sobre los campos de datos y se compromete a no recopilar información innecesaria o desproporcionada con arreglo al principio de minimización de datos.'
    ]
  },

  'payroll-services': {
    title: 'Servicios & Procesamiento de Nóminas',
    category: 'Modules',
    summary: 'Motor de cálculo salarial bruto a neto y liquidaciones. El Cliente es el único responsable de auditar los convenios colectivos y tablas fiscales aplicadas.',
    highlightBoxTitle: 'Aviso sobre Validación de Nóminas',
    highlightBoxText: 'Antes de cursar transferencias bancarias o emitir pagos, el Cliente debe auditar las liquidaciones. NextSoftHR no presta asesoramiento contable ni tributario.',
    paragraphs: [
      'NextSoftHR cuenta con un motor que automatiza el cálculo de salarios base, complementos salariales, pluses, pagas extraordinarias, retenciones del IRPF/impuestos directos y cotizaciones a la seguridad social.',
      'El Cliente reconoce que NextSoftHR no es una gestoría administrativa, firma de auditoría ni asesoría jurídica. Corresponde al Cliente configurar, contrastar y autorizar los porcentajes y bases de cotización antes de ordenar el desembolso económico.',
      'NextSoftHR queda exenta de responsabilidad respecto a liquidaciones generadas a partir de tablas salariales desactualizadas o registros horarios inexactos facilitados por el Cliente.'
    ]
  },

  'employee-self-service': {
    title: 'Portal del Empleado (ESS)',
    category: 'Modules',
    summary: 'Acceso multidispositivo para que los trabajadores descarguen nóminas, soliciten permisos y justifiquen gastos de forma ágil y segura.',
    paragraphs: [
      'El portal ESS permite al personal acceder a sus recibos de salario digitales en formato seguro, solicitar ausencias reglamentarias, consultar saldos de vacaciones y justificar gastos de empresa mediante recibos.',
      'Cada trabajador debe conservar en secreto sus contraseñas. El acceso queda cancelado de forma automática cuando el Cliente comunique la rescisión del contrato laboral.'
    ]
  },

  'time-attendance': {
    title: 'Control Horario & Registro de Jornada',
    category: 'Modules',
    summary: 'Fichaje digital, biometría o registro geolocalizado con estricto respeto a los derechos laborales de la plantilla.',
    paragraphs: [
      'Permite contabilizar las horas de entrada y salida, fichar mediante terminales en el centro de trabajo o teléfonos móviles con geocercas, planificar cuadrantes de turnos y computar horas extraordinarias.',
      'El Cliente manifiesta contar con las aprobaciones legales de la representación de los trabajadores necesarias para la implantación de sistemas de geolocalización o lectura biométrica.'
    ]
  },

  'leave-management': {
    title: 'Gestión de Vacaciones & Permisos',
    category: 'Modules',
    summary: 'Cálculo automatizado de días devengados, circuitos de autorización por responsables de equipo y enlace directo con nóminas.',
    paragraphs: [
      'El Cliente establece los baremos de vacaciones anuales, licencias retribuidas, bajas por incapacidad temporal y permisos por cuidado según la normativa laboral aplicable a su actividad.',
      'Todas las solicitudes, concesiones o denegaciones quedan registradas con huella temporal inalterable en el sistema de auditoría.'
    ]
  },

  'recruitment-talent': {
    title: 'Selección de Personal & ATS',
    category: 'Modules',
    summary: 'Publicación de ofertas de empleo, embudos de selección de candidatos en paneles Kanban, entrevistas y cartas de oferta de empleo.',
    paragraphs: [
      'La herramienta ATS facilita la difusión de vacantes, la recepción estructurada de currículums y la evaluación por competencias. El Cliente se compromete a garantizar la igualdad de oportunidades y la no discriminación.',
      'Los expedientes de los candidatos no seleccionados deberán suprimirse o custodiarse dentro de los límites temporales que fije la normativa de protección de datos.'
    ]
  },

  'crm-business-features': {
    title: 'CRM & Gestión de Relaciones con Clientes',
    category: 'Modules',
    summary: 'Seguimiento de cuentas de clientes, contratos de prestación de servicios mercantiles y contactos de facturación corporativa.',
    paragraphs: [
      'Facilita la vinculación entre los contratos de prestación de servicios firmados con sus clientes y el personal asignado en cada proyecto.',
      'El Cliente garantiza disponer de base legítima para el tratamiento de los datos de contacto mercantil de sus socios y clientes.'
    ]
  },

  'project-task-management': {
    title: 'Gestión de Proyectos & Asignación de Tareas',
    category: 'Modules',
    summary: 'Planificación de objetivos, asignación de colaboradores, imputación de horas facturables y control del margen de negocio.',
    paragraphs: [
      'Permite estructurar las tareas del equipo, computar horas dedicadas por proyecto y generar informes de rendimiento presupuestario.',
      'La veracidad de las horas imputadas es responsabilidad de los directores de proyecto designados por el Cliente.'
    ]
  },

  'third-party-integrations': {
    title: 'Integraciones & Conectores Externos',
    category: 'Modules',
    summary: 'Conexión con pasarelas de pago bancario, portales de la administración tributaria, programas contables y sistemas de identidad SSO.',
    paragraphs: [
      'NextSoftHR cuenta con conectores hacia aplicaciones de terceros (banca online para remesas bancarias SEPA, exportaciones a ERP contables y autenticación única mediante Microsoft Azure o Google Workspace).',
      'El uso de estas conexiones puede requerir contratos específicos con los proveedores terceros, siendo administradas bajo la potestad del Cliente.'
    ]
  },

  'subscription-plans': {
    title: 'Planes de Suscripción & Tarifas',
    category: 'Commercial',
    summary: 'Suscripciones mensuales o anuales moduladas en función del número de empleados gestionados y de las herramientas activadas.',
    paragraphs: [
      'El servicio opera en régimen de suscripción periódica. El importe se calcula en función de los módulos contratados y del tramo de empleados activos procesados durante el ciclo de facturación.',
      'Cualquier incremento en el censo laboral que rebase el tramo contratado se liquidará de forma proporcional (pro rata) en la facturación del período siguiente.',
      'Los importes se entenderán siempre netos de tributos indirectos (IVA, IGIC o retenciones locales), los cuales serán abonados por el Cliente.'
    ]
  },

  'free-trials': {
    title: 'Períodos de Prueba Gratuita & Promociones',
    category: 'Commercial',
    summary: 'Términos de evaluación sin compromiso para testear las prestaciones de la plataforma de forma segura.',
    paragraphs: [
      'NextSoftHR podrá poner a disposición del Cliente un período de prueba de catorce (14) o treinta (30) días con el objeto de evaluar el software.',
      'Durante dicho período, ciertas funciones sensibles como el envío de transferencias bancarias reales podrán encontrarse restringidas a modo simulador.',
      'Transcurrida la prueba sin formalización de una suscripción de pago, el acceso se suspenderá y la información de prueba se custodiará de manera cifrada durante treinta (30) días antes de su borrado definitivo.'
    ]
  },

  'payment-billing': {
    title: 'Facturación & Condiciones de Cobro',
    category: 'Commercial',
    summary: 'Abono de recibos mediante tarjeta corporativa, domiciliación bancaria o transferencia. Consecuencias en caso de impago.',
    paragraphs: [
      'Las cuotas se devengarán por anticipado al inicio de cada mensualidad o anualidad. El Cliente mantendrá instrumentos de cobro válidos y con saldo suficiente.',
      'En caso de devolución o impago, se notificará al Cliente. Si la deuda permanece insatisfecha pasados catorce (14) días naturales, NextSoftHR podrá suspender temporalmente el acceso hasta el cobro íntegro.',
      'No se realizarán devoluciones ni abonos proporcionales por cancelaciones anticipadas voluntarias una vez iniciado el período facturado.'
    ]
  },

  'suspension-termination': {
    title: 'Suspensión & Resolución del Contrato',
    category: 'Commercial',
    summary: 'Causas de resolución al vencimiento ordinario y motivos de suspensión inmediata por incumplimiento contractual grave.',
    paragraphs: [
      'Cualquiera de las partes podrá resolver el contrato al vencimiento del período vigente notificándolo por escrito con un mínimo de treinta (30) días de antelación respecto a la fecha de renovación.',
      'NextSoftHR podrá suspender o dar de baja el servicio con efecto inmediato en supuestos de impago reiterado, fraude probado, infracción de derechos de propiedad intelectual o ataques a la integridad del sistema.',
      'Tras la resolución, el Cliente dispondrá de un plazo de treinta (30) días para exportar los históricos de nóminas y expedientes en formatos universales (CSV, Excel, PDF).'
    ]
  },

  'data-ownership': {
    title: 'Propiedad de los Datos del Cliente',
    category: 'Data & Security',
    summary: 'El Cliente ostenta la propiedad exclusiva e inalienable sobre los datos de su plantilla, historiales salariales y documentación empresarial.',
    paragraphs: [
      'El Cliente es y seguirá siendo el único titular de todos los datos personales, nóminas, hojas de cálculo y ficheros que incorpore a la Plataforma («Datos del Cliente»).',
      'NextSoftHR no ostenta ni reclama ningún derecho sobre sus datos de empresa. El Cliente únicamente nos confiere una autorización de alojamiento y cómputo estrictamente ceñida a la ejecución del servicio contratado.'
    ]
  },

  'privacy-data-protection': {
    title: 'Privacidad & Protección de Datos de Carácter Personal',
    category: 'Data & Security',
    summary: 'Cumplimiento exhaustivo del RGPD, convenios internacionales y legislaciones nacionales de privacidad con entrega de DPA formalizado.',
    highlightBoxTitle: 'Acuerdo de Encargo del Tratamiento (DPA)',
    highlightBoxText: 'Un Acuerdo de Encargo del Tratamiento (DPA) con salvaguardas contractuales completas está a su disposición previa solicitud.',
    actionLabel: 'Ver Política',
    paragraphs: [
      'NextSoftHR trata la información confidencial con estricto arreglo al Reglamento General de Protección de Datos (RGPD UE/Reino Unido), las leyes de privacidad de Guinea Ecuatorial y de los distintos países hispanohablantes.',
      'A los efectos de la relación contractual, el Cliente ostenta la condición de «Responsable del Tratamiento» y NextSoftHR actúa como «Encargado del Tratamiento», operando bajo las instrucciones documentadas del Cliente.',
      'NextSoftHR nunca vende, cede ni comercia con los datos de carácter personal de los trabajadores de sus clientes con fines de publicidad de terceros.'
    ]
  },

  'security-safeguards': {
    title: 'Seguridad & Salvaguardas Técnicas',
    category: 'Data & Security',
    summary: 'Cifrado de datos en tránsito (TLS 1.3) y en reposo (AES-256), centros de datos con auditorías SOC 2 e ISO 27001 y copias redundantes.',
    paragraphs: [
      'NextSoftHR adopta las medidas técnicas y organizativas de seguridad más rigurosas del mercado para proteger la confidencialidad, autenticidad y resiliencia de la información salarial.',
      'Las transmisiones se aseguran mediante cifrado TLS 1.3 y los datos se almacenan cifrados con AES-256 en centros de datos provistos de certificaciones SOC 2 Tipo II e ISO/IEC 27001.',
      'Se realizan copias de seguridad íntegras con periodicidad diaria y réplica geográfica para blindar a las organizaciones ante cualquier eventualidad de pérdida fortuita.'
    ]
  },

  confidentiality: {
    title: 'Deber de Confidencialidad Comercial',
    category: 'Data & Security',
    summary: 'Compromiso mutuo de secreto profesional sobre los costes salariales, información financiera y estrategia mercantil revelada.',
    paragraphs: [
      'Ambas partes se comprometen a tratar con estricto secreto toda información técnica, económica, estratégica o retributiva calificada como confidencial facilitada por la contraparte.',
      'Este deber de confidencialidad se mantendrá durante la vigencia del contrato y pervivirá durante un período de cinco (5) años tras la conclusión definitiva del servicio.'
    ]
  },

  'intellectual-property': {
    title: 'Propiedad Intelectual de NextSoftHR',
    category: 'Legal & Compliance',
    summary: 'NextSoftHR es titular exclusivo de los derechos de autor, marcas, patentes y código fuente relativos a su tecnología y software.',
    paragraphs: [
      'Todos los derechos de propiedad intelectual e industrial sobre la Plataforma (códigos fuente, diseños gráficos, flujos de cálculo, marcas registradas y documentación técnica) son propiedad exclusiva de NextSoftHR Ltd. y sus licenciantes.',
      'El presente contrato no confiere al Cliente derecho de propiedad alguno sobre el software, limitándose a una licencia temporal de uso.'
    ]
  },

  'user-content': {
    title: 'Contenido Aportado por el Usuario',
    category: 'Legal & Compliance',
    summary: 'Declaración y garantía del Cliente sobre la base de legitimación jurídica para tratar los datos laborales de sus trabajadores.',
    paragraphs: [
      'El Cliente manifiesta disponer de todas las autorizaciones, títulos y consentimientos normativamente exigibles para almacenar y procesar en la Plataforma la información de sus empleados.',
      'El Cliente mantendrá indemne a NextSoftHR frente a reclamaciones promovidas por empleados o terceros que traigan causa en una recogida o tratamiento ilícito efectuado por el Cliente.'
    ]
  },

  'third-party-services': {
    title: 'Servicios de Terceros & Enlaces Externos',
    category: 'Legal & Compliance',
    summary: 'Exención de responsabilidad por retrasos, paradas técnicas o variaciones impuestas por bancos o portales administrativos públicos.',
    paragraphs: [
      'La Plataforma puede facilitar la comunicación con entidades externas (banca electrónica, agencias tributarias o portales de empleo). Dichos servicios se rigen por las condiciones estipuladas por sus titulares.',
      'NextSoftHR no responde de retrasos, caídas del servicio o cambios imprevistos en las APIs de tales organismos ajenos.'
    ]
  },

  'service-availability': {
    title: 'Disponibilidad del Servicio & Mantenimiento',
    category: 'Legal & Compliance',
    summary: 'Objetivo de servicio ininterrumpido del 99,9% en la nube, con reserva de ventanas planificadas de mantenimiento o causas de fuerza mayor.',
    paragraphs: [
      'NextSoftHR procura mantener una disponibilidad operativa continua de la Plataforma las 24 horas del día, los 7 días de la semana, orientada a un umbral del 99,9% mensual.',
      'Podrán programarse paradas técnicas para mantenimiento correctivo o mejoras críticas de seguridad, notificándose con anterioridad razonable cuando sea posible.'
    ]
  },

  'software-updates': {
    title: 'Actualizaciones de Software & Mejoras',
    category: 'Legal & Compliance',
    summary: 'Lanzamiento periódico de optimizaciones de usabilidad, parches de seguridad y adecuación a variaciones legales de nómina.',
    paragraphs: [
      'NextSoftHR mejora de forma continua sus módulos para responder a requerimientos normativos, afianzar la ciberseguridad e incorporar nuevas ventajas tecnológicas.',
      'Las actualizaciones ordinarias se incluyen en el precio del plan, reservándose el desarrollo de módulos accesorios independientes para contratación optativa.'
    ]
  },

  disclaimers: {
    title: 'Exclusión de Asesoramiento & Garantías',
    category: 'Legal & Compliance',
    summary: 'NextSoftHR proporciona una aplicación informática y no sustituye el juicio profesional ni el asesoramiento legal, fiscal o laboral.',
    highlightBoxTitle: 'Aviso Legal Relevante',
    highlightBoxText: 'Cada empresa debe auditar sus retenciones y convenios laborales con sus asesores tributarios y graduados sociales colegiados.',
    paragraphs: [
      'Con la salvedad de las obligaciones legales imperativas, la Plataforma se ofrece «tal cual» («as is») y «según disponibilidad». NextSoftHR no garantiza la infalibilidad absoluta de los cálculos ante casuísticas sectoriales anómalas sin previa auditoría.',
      'Corresponde a la dirección de la empresa supervisar las liquidaciones con sus respectivos graduados sociales o asesores fiscales colegiados.'
    ]
  },

  'limitation-liability': {
    title: 'Limitación de Responsabilidad',
    category: 'Legal & Compliance',
    summary: 'Exclusión de daños indirectos y tope indemnizatorio equivalente al importe abonado en los doce meses precedentes al hecho causante.',
    counselFlag: '[Sujeto a Revisión de Derecho Local: Topes estándar de responsabilidad civil SaaS]',
    paragraphs: [
      'En la medida máxima permitida por el ordenamiento jurídico aplicable, ninguna de las partes responderá de lucro cesante, pérdidas de negocio, daños reputacionales o perjuicios indirectos.',
      'La responsabilidad económica máxima y agregada de NextSoftHR frente al Cliente por cualquier reclamación derivada del presente contrato quedará limitada a las cantidades efectivamente percibidas por NextSoftHR del Cliente en los doce (12) meses anteriores al siniestro.'
    ]
  },

  indemnification: {
    title: 'Indemnización & Saneamiento',
    category: 'Legal & Compliance',
    summary: 'Garantías mutuas respecto a la propiedad intelectual del software y cumplimiento del Cliente en materia salarial y de prevención.',
    paragraphs: [
      'NextSoftHR indemnizará al Cliente frente a demandas judiciales de terceros que acrediten infracción de derechos de autor por el software NextSoftHR, siempre que se le notifique inmediatamente por escrito.',
      'Recíprocamente, el Cliente mantendrá indemne a NextSoftHR ante controversias derivadas del incumplimiento patronal de los deberes salariales o de seguridad social aplicables.'
    ]
  },

  'force-majeure': {
    title: 'Fuerza Mayor',
    category: 'Legal & Compliance',
    summary: 'Exoneración temporal en supuestos de fenómenos climáticos extremos, conflictos bélicos, huelgas generales o cortes energéticos masivos.',
    paragraphs: [
      'Ninguna de las partes incurrirá en incumplimiento contractual por retrasos debidos a contingencias imprevisibles e insuperables de fuerza mayor ajenas a su control (desastres naturales, guerras, huelgas generales, ciberataques a gran escala o cortes de suministro eléctrico supranacionales).'
    ]
  },

  'governing-law': {
    title: 'Ley Aplicable & Jurisdicción Competente',
    category: 'Legal & Compliance',
    summary: 'Sometimiento a la ley y tribunales del domicilio corporativo que designe formalmente NextSoftHR.',
    counselFlag: '[A indicar por el equipo legal: Domicilio Corporativo & Juzgados Competentes]',
    paragraphs: [
      'Los presentes Términos se rigen e interpretan con arreglo al ordenamiento jurídico del país donde radica la sede social de NextSoftHR Ltd., con exclusión de las normas sobre conflicto de leyes.',
      'Las partes acuerdan someter cualquier discrepancia que no pueda solventarse de mutuo acuerdo a la jurisdicción exclusiva de los juzgados y tribunales de la sede de NextSoftHR.'
    ]
  },

  'dispute-resolution': {
    title: 'Resolución de Conflictos & Arbitraje',
    category: 'Legal & Compliance',
    summary: 'Procedimiento de negociación amistosa previa de 30 días con posibilidad de escalado a arbitraje mercantil independiente.',
    paragraphs: [
      'Ante cualquier discrepancia, las partes convienen abrir un período de negociación directa de buena fe entre sus directivos durante al menos treinta (30) días naturales para alcanzar una solución transaccional.',
      'De no prosperar el acuerdo, el litigio podrá someterse a arbitraje mercantil administrado por una corte arbitral reconocida o a los órganos judiciales ordinarios.'
    ]
  },

  'changes-to-terms': {
    title: 'Modificaciones de estos Términos',
    category: 'Legal & Compliance',
    summary: 'Preaviso de 30 días para modificaciones materiales con actualización de la fecha de última revisión del documento.',
    paragraphs: [
      'NextSoftHR se reserva la facultad de actualizar estos Términos para acomodarlos a innovaciones técnicas o modificaciones en el marco regulatorio.',
      'Cuando se trate de cambios esenciales que afecten a los derechos del Cliente, se remitirá notificación por correo electrónico o aviso en la Plataforma con al menos treinta (30) días de antelación respecto a su entrada en vigor.'
    ]
  },

  'contact-information': {
    title: 'Información de Contacto & Canales Oficiales',
    category: 'Legal & Compliance',
    summary: 'Vías formales para trasladar requerimientos a nuestros delegados de protección de datos, seguridad y soporte al cliente.',
    highlightBoxTitle: 'Soporte Especial para Grandes Cuentas',
    highlightBoxText: 'Los clientes corporativos con acuerdos marco (MSA) disponen de un gestor de cuenta asignado para atención prioritaria.',
    paragraphs: [
      'Para cualquier consulta, requerimiento legal o comunicación formal relativa a estos Términos y Condiciones, puede dirigirse a los canales oficiales de NextSoftHR:',
      'NextSoftHR Ltd. · Asesoría Legal y Cumplimiento Normativo Global · Portal web: www.nextsofthr.org · Correo electrónico: legal@nextsofthr.org · Delegado de Protección de Datos (DPO): dpo@nextsofthr.org · Ciberseguridad: security@nextsofthr.org.'
    ]
  }
};
