import { Translations } from './types';

export const ptTranslations: Translations = {
  nav: {
    platform: 'Plataforma',
    hrPayroll: 'RH e Salários',
    trustSecurity: 'Confiança e Segurança',
    resources: 'Recursos',
    contact: 'Contacto',
    signIn: 'Entrar',
    policyAdmin: 'Admin Política',
    privacyDesk: 'Gabinete de Privacidade',
    platformOverview: 'Visão Geral da Plataforma',
    securityArch: 'Arquitetura de Segurança',
    yourRights: 'Seus Direitos de Privacidade',
    contactDpo: 'Contactar Encarregado (DPO)',
    submitRequest: 'Submeter Pedido',
  },
  hero: {
    badge: 'Centro de Confiança e Conformidade NextSoftHR',
    title: 'Política de Privacidade',
    subtitle:
      'A sua privacidade é fundamental para nós. Saiba como a NextSoftHR recolhe, utiliza, protege e gere as suas informações pessoais ao utilizar a nossa plataforma e serviços.',
    lastUpdated: 'Última Atualização:',
    version: 'Versão',
    updateNotice: '(Atualizar Aviso)',
    searchPlaceholder:
      "Pesquisar seções (ex.: 'retenção', 'IA', 'cookies', 'direitos')...",
    clear: 'Limpar',
    cookiePrefs: 'Preferências de Cookies',
    requestAssistance: 'Solicitar Apoio de Privacidade',
    printPdf: 'Imprimir / PDF',
    governanceCore: 'Núcleo de Governança de Dados',
    globalArch: 'Arquitetura Global NextSoftHR',
    activeShield: 'Escudo Ativo',
    workforceIdentity: 'Identidade de Pessoal e Salários',
    workforceSub: 'Registos de colaboradores · Salários · Assiduidade',
    encryptionBridge: 'Criptografia TLS 1.3 · AES-256 em Trânsito e Repouso',
    cloudVault: 'Cofre em Nuvem e Cópias Geodiversas',
    cloudVaultSub: 'Partições encriptadas · Backups diários',
    aiEngine: 'IA Responsável e Automação',
    aiEngineSub: 'Supervisão humana · Telemetria anonimizada',
    governedBadge: 'Governado',
    footerRegion: 'África e Mercados Globais',
    structuredArticles: '16 Artigos Estruturados',
  },
  toc: {
    title: 'Índice de Conteúdos',
    readTime: '~8 min de leitura',
    needAssistance: 'Precisa de assistência?',
    assistanceText:
      'Envie questões sobre direitos de dados laborais para o nosso Gabinete de Proteção de Dados.',
    contactTeam: 'Contactar Equipa de Privacidade →',
    section: 'Seção',
    items: {
      introduction: 'Introdução',
      informationWeCollect: 'Informações que Recolhemos',
      howWeUseInformation: 'Como Utilizamos os Dados',
      cookiesTracking: 'Cookies e Tecnologias de Rastreio',
      dataSharing: 'Partilha e Divulgação de Dados',
      dataStorageSecurity: 'Armazenamento e Segurança dos Dados',
      dataRetention: 'Retenção e Conservação de Dados',
      yourPrivacyRights: 'Os Seus Direitos de Privacidade',
      employeeCustomerData: 'Dados de Colaboradores e Clientes',
      internationalTransfers: 'Transferências Internacionais de Dados',
      thirdPartyServices: 'Serviços e Integrações de Terceiros',
      childrensPrivacy: 'Privacidade de Menores',
      marketingCommunications: 'Comunicações de Marketing',
      aiAutomatedProcessing: 'IA e Processamento Automatizado',
      changesToPolicy: 'Alterações a Esta Política',
      contactUs: 'Contacte-nos',
    },
  },
  policy: {
    sec1: {
      tag: 'Âmbito Geral',
      title: '1. Introdução',
      p1: "A NextSoftHR ('NextSoftHR', 'nós', 'nosso' ou 'nossos') respeita a privacidade e os direitos fundamentais de proteção de dados dos seus utilizadores, empregadores, trabalhadores, prestadores independentes, clientes potenciais, parceiros de negócio e visitantes do website. Comprometemo-nos a tratar dados pessoais e laborais com total transparência, licitude e responsabilidade.",
      p2: 'Esta Política de Privacidade esclarece como a NextSoftHR recolhe, utiliza, armazena, salvaguarda e divulga informações pessoais quando interage connosco em múltiplos canais, incluindo quando:',
      scopes: [
        'Visita ou navega no nosso website oficial (www.nextsofthr.org)',
        'Cria, configura ou administra uma conta corporativa',
        'Acede ou utiliza o ecossistema de software na nuvem NextSoftHR',
        'Contrata os nossos serviços de gestão e terceirização de RH e processamento de salários',
        'Contacta as nossas equipas de suporte técnico e sucesso do cliente',
        'Solicita demonstrações de software ou propostas personalizadas',
        'Subscreve licenças de software ou planos comerciais',
        'Comunica com a NextSoftHR por correio eletrónico, chat ou telefone',
        'Interliga aplicações de terceiros e interfaces API autorizadas',
      ],
      boxTitle: 'Cobertura Abrangente para Organizações Multi-Empresa',
      boxDesc:
        'A NextSoftHR gere operações completas de gestão empresarial: Gestão de Recursos Humanos, Processamento Salarial, Controlo de Tempo e Assiduidade, Autoatendimento do Colaborador (ESS), Autoatendimento do Gestor (MSS), Gestão de Férias e Licenças, Gestão de Turnos e Escalas, Atração de Talentos e Recrutamento, CRM, Finanças, Gestão de Projetos e Tarefas, Terceirização de RH e Salários, Gestão de Negócios e Assistente de RH com Inteligência Artificial.',
    },
    sec2: {
      tag: 'Taxonomia de Dados',
      title: '2. Informações que Recolhemos',
      intro:
        'Recolhemos estritamente os dados pessoais que sejam adequados, pertinentes e limitados ao estritamente necessário para os fins operacionais para os quais são tratados. Não solicitamos nem mantemos dados desnecessários.',
      categoryOf: 'Categoria',
      processedElements: 'Exemplos de Elementos de Dados Tratados:',
      adminNotice:
        'Os atributos de dados são regidos pelas configurações administrativas e pelos perfis de permissão estipulados por cada organização cliente.',
      categories: [
        {
          title: 'Informações de Conta',
          desc: 'Credenciais de identificação pessoal e contactos fornecidos no registo ou administração da conta.',
          items: [
            'Nome civil completo e nome profissional',
            'Endereço de e-mail profissional e corporativo',
            'Número de telefone de contacto (móvel e de escritório)',
            'Denominação social da empresa e número de identificação fiscal (NIF/NIPC)',
            'Cargo, função hierárquica e nível de permissões de acesso',
            'Credenciais de acesso criptografadas e tokens de autenticação',
            'Idioma do sistema, fuso horário e preferências de interface',
          ],
        },
        {
          title: 'Informações da Empresa e Dossiers de Funcionários',
          desc: 'Dados organizacionais e registos de funcionários carregados ou geridos pelos administradores da empresa na plataforma.',
          items: [
            'Estrutura societária da empresa, filiais e moradas dos estabelecimentos',
            'Departamentos, organigramas hierárquicos e centros de custo',
            'Perfis cadastrais dos colaboradores, contratos de trabalho e identificação fiscal/segurança social',
            'Cálculos salariais, tabelas de vencimento, deduções legais e dados bancários',
            'Horários de trabalho, marcações biométricas de ponto e sumários de assiduidade',
            'Mapas de férias, pedidos de ausência justificada e comprovativos médicos',
            'Escalas de turnos, escalas de trabalho e atribuição de tarefas',
          ],
        },
        {
          title: 'Informações Técnicas e de Dispositivos',
          desc: 'Telemetria automatizada recolhida ao aceder às plataformas web, aplicações móveis ou APIs da NextSoftHR.',
          items: [
            'Endereço de Protocolo de Internet (IP) e localização geográfica aproximada (nível de cidade/país)',
            'Navegador de internet, versão e configuração de idioma',
            'Sistema operativo, modelo do dispositivo e resolução de ecrã',
            'Carimbos de data/hora da sessão, frequência de acessos e percursos de navegação',
            'Telemetria de diagnóstico, códigos de erro HTTP e métricas de desempenho',
            'Identificadores de sessão, cookies seguros de autenticação e proteção CSRF',
          ],
        },
        {
          title: 'Informações de Comunicação e Suporte',
          desc: 'Mensagens, pedidos de assistência técnica e avaliações prestadas nas interações de apoio.',
          items: [
            'Tickets de suporte ao cliente, transcrições de chat e correspondência mantida',
            'Notas de sessões de demonstração, requisitos expressos e cadernos de encargos',
            'Respostas a inquéritos de satisfação e sugestões de melhoria funcional',
            'Comunicações respeitantes a faturação, contratos e subscrições',
          ],
        },
      ],
    },
    sec3: {
      tag: 'Finalidades do Tratamento',
      title: '3. Como Utilizamos as Suas Informações',
      intro:
        'Tratamos dados pessoais e organizacionais unicamente para finalidades empresariais e técnicas legítimas e fundamentadas:',
      purposes: [
        {
          title: 'Prestação dos Serviços de RH e Salários',
          desc: 'Execução automatizada do processamento de remunerações brutas e líquidas, emissão de recibos de vencimento, deduções fiscais e guias de segurança social.',
        },
        {
          title: 'Administração de Contas e Controlo de Acessos',
          desc: 'Autenticação de utilizadores autorizados, gestão de permissões e cumprimento rigoroso das políticas de segurança empresarial.',
        },
        {
          title: 'Gestão Centralizada do Pessoal',
          desc: 'Organização dos dossiers dos colaboradores, organigramas, contactos de emergência e histórico contratual.',
        },
        {
          title: 'Supervisão de Turnos, Ponto e Férias',
          desc: 'Registo de escalas de trabalho, validação de férias, sincronização com terminais de ponto biométricos e cálculo de horas suplementares.',
        },
        {
          title: 'Suporte Técnico às Empresas',
          desc: 'Resolução de tickets de apoio técnico, esclarecimento de dúvidas e manutenção dos níveis de serviço acordados (SLA).',
        },
        {
          title: 'Fiabilidade e Desempenho da Plataforma',
          desc: 'Monitorização ininterrupta da saúde dos servidores, tempos de resposta e débito de transações nas APIs.',
        },
        {
          title: 'Segurança e Prevenção de Fraudes',
          desc: 'Deteção de acessos suspeitos, proteção contra ataques cibernéticos e controlo de operações administrativas críticas.',
        },
        {
          title: 'Faturação e Cobrança de Subscrições',
          desc: 'Processamento de pagamentos de licenças, emissão de faturas e gestão de renovações contratuais.',
        },
        {
          title: 'Comunicações Operacionais Críticas',
          desc: 'Envio de alertas de manutenção programada, avisos de segurança cibernética e comunicados regulamentares essenciais.',
        },
        {
          title: 'Comunicações de Marketing Autorizadas',
          desc: 'Divulgação de eventos online, artigos técnicos e novidades sobre o produto quando haja consentimento expresso prévio.',
        },
        {
          title: 'Obrigações Legais e Regulatórias',
          desc: 'Cumprimento da legislação laboral aplicável, normas fiscais de retenção e notificações judiciais válidas.',
        },
        {
          title: 'Inovação e Aperfeiçoamento Contínuo',
          desc: 'Análise agregada e anonimizada de fluxos de utilização para simplificar a interface e melhorar a usabilidade geral.',
        },
      ],
    },
    sec4: {
      tag: 'Tecnologias Web',
      title: '4. Cookies e Tecnologias de Rastreio',
      intro:
        'A NextSoftHR e os seus parceiros técnicos certificados utilizam cookies, tokens HTTP protegidos e armazenamento local para assegurar a operação contínua da plataforma, guardar preferências de trabalho e avaliar o tráfego.',
      types: [
        {
          title: 'Cookies Estritamente Necessários',
          desc: 'Imprescindíveis para autenticação de sessões, balanceamento de carga, proteção contra CSRF e navegação.',
        },
        {
          title: 'Cookies Funcionais',
          desc: 'Memorizam o idioma de trabalho, a empresa ativa, o fuso horário e parâmetros personalizados de visualização.',
        },
        {
          title: 'Cookies Analíticos',
          desc: 'Recolhem métricas anónimas relativas à rapidez de carregamento e ao uso das ferramentas principais.',
        },
        {
          title: 'Cookies de Preferências',
          desc: 'Guardam densidades de tabelas nos painéis e limites de paginação definidos pelo utilizador.',
        },
        {
          title: 'Tecnologias de Segurança',
          desc: 'Identificam anomalias nos dispositivos para proteger os utilizadores contra usurpação de identidade.',
        },
      ],
      manageTitle: 'Faça a Sua Escolha',
      manageDesc:
        'Pode rever ou alterar o seu consentimento relativo a cookies opcionais a qualquer momento.',
      button: 'Preferências de Cookies',
      browserNote:
        'A maioria dos navegadores permite gerir cookies através das configurações. Recordamos que desativar cookies estritamente necessários poderá inviabilizar o login no software NextSoftHR.',
    },
    sec5: {
      tag: 'Subcontratantes e Terceiros',
      title: '5. Partilha e Divulgação de Dados',
      intro:
        'A NextSoftHR não comercializa, aluga ou cede dados pessoais ou laborais a intermediários ou anunciantes. Partilhamos dados estritamente de acordo com o princípio da necessidade de conhecer com as seguintes categorias de entidades:',
      entities: [
        {
          title: 'Utilizadores Corporativos Autorizados',
          desc: 'Colegas e gestores autorizados dentro da conta da sua empresa, conforme os perfis atribuídos pelo administrador de RH.',
        },
        {
          title: 'Alojamento e Infraestrutura em Nuvem',
          desc: 'Centros de dados certificados internacionalmente, redes de distribuição de conteúdos (CDN) e bases de dados seguras.',
        },
        {
          title: 'Processadores de Pagamento e Bancos',
          desc: 'Entidades bancárias e de pagamento certificadas PCI-DSS para transferência de salários e liquidação de subscrições.',
        },
        {
          title: 'Fornecedores de Segurança e Auditoria',
          desc: 'Empresas especializadas em monitorização de tráfego, mitigação de ameaças e registo de eventos do sistema.',
        },
        {
          title: 'Parceiros de Integração Tecnológica',
          desc: 'Software de terceiros que a empresa decida conectar (contabilidade, relógios de ponto biométricos, produtividade).',
        },
        {
          title: 'Consultores Jurídicos e Auditores',
          desc: 'Advogados e revisores oficiais de contas vinculados ao sigilo profissional mais rigoroso.',
        },
        {
          title: 'Autoridades Públicas e Reguladoras',
          desc: 'Administrações tributárias, inspeção-geral do trabalho ou tribunais competentes apenas quando legalmente exigido.',
        },
      ],
    },
    sec6: {
      tag: 'Arquitetura de Segurança',
      title: '6. Armazenamento e Segurança dos Dados',
      intro:
        'A NextSoftHR adota salvaguardas técnicas e organizativas concebidas para proteger as informações pessoais e empresariais contra acessos não autorizados, perda, uso indevido, alteração ou destruição. Embora nenhum ambiente em nuvem garanta imunidade absoluta, aplicamos uma estratégia rigorosa de defesa em profundidade.',
      standardTag: 'Pilar de Salvaguarda',
      pillars: [
        {
          title: 'Infraestrutura Protegida',
          summary:
            'Ambientes na nuvem alojados em centros de dados com certificações ISO Tier-III/IV.',
          details: [
            'Arquitetura redundante em múltiplas zonas sem pontos únicos de falha',
            'Proteção contra ataques DDoS e filtragem avançada por Web Application Firewall (WAF)',
            'Redes VPC isoladas sem qualquer base de dados exposta para a internet pública',
          ],
        },
        {
          title: 'Controlos de Acesso Rígidos',
          summary:
            'Princípio do menor privilégio aplicado em todas as camadas internas e corporativas.',
          details: [
            'Gestão granular de perfis (RBAC) para os módulos de RH, Processamento Salarial e Admin',
            'Autenticação Multifator (MFA/2FA) obrigatória para contas com privilégios elevados',
            'Encerramento automático de sessões inativas e integração com SSO via SAML/OIDC',
          ],
        },
        {
          title: 'Encriptação Abrangente',
          summary:
            'Padrões criptográficos sólidos para resguardar dados em trânsito e em repouso.',
          details: [
            'Encriptação de ponta a ponta com TLS 1.3 em todas as redes públicas',
            'Criptografia por hardware AES-256 bits para bases de dados e cópias de segurança',
            'Salting criptográfico e ciclos periódicos de rotação de chaves mestras',
          ],
        },
        {
          title: 'Monitorização e Auditoria',
          summary:
            'Vigilância contínua, identificação proativa de anomalias e trilhas de auditoria imutáveis.',
          details: [
            'Monitorização automatizada 24/7 para identificar comportamentos anómalos de login',
            'Registos de auditoria invioláveis para alterações em salários e parâmetros de cálculo',
            'Auditorias de segurança periódicas e testes de intrusão conduzidos por entidades independentes',
          ],
        },
        {
          title: 'Cópias de Segurança e Recuperação',
          summary:
            'Mecanismos de restauro resilientes para assegurar a continuidade da sua atividade.',
          details: [
            'Backups diários encriptados replicados para centros geograficamente distintos',
            'Objetivos de RPO e RTO validados e testados trimestralmente em exercícios práticos',
            'Cópias de segurança WORM (gravação única não alterável) resistentes a ransomware',
          ],
        },
      ],
      userResponsibility:
        'Aviso sobre Responsabilidade do Utilizador: Os utilizadores são responsáveis por zelar pela confidencialidade das suas palavras-passe, ativar a autenticação multifator (MFA) e não partilhar credenciais de acesso.',
    },
    sec7: {
      tag: 'Calendário de Conservação',
      title: '7. Retenção e Conservação de Dados',
      intro:
        'Conservamos as informações pessoais apenas pelo período razoavelmente indispensável para cumprir os fins contratuais para os quais foram recolhidas, assegurar a gestão das contas, satisfazer obrigações fiscais e laborais e dirimir litígios.',
      table: {
        thCategory: 'Categoria de Dados',
        thPurpose: 'Finalidade Operacional',
        thRetention: 'Prazo de Retenção',
        thRationale: 'Fundamento Legal',
      },
      rules: [
        {
          category: 'Processos de Colaboradores e Contratos',
          purpose:
            'Gestão da relação de trabalho e administração dos processos individuais de RH.',
          retentionPeriod:
            'Vigência do contrato cliente + 7 anos (ou prazo laboral legal)',
          statutoryBasis: 'Legislação Laboral e Segurança Social',
        },
        {
          category: 'Folhas de Pagamento e Ficheiros Fiscais',
          purpose:
            'Fiscalização salarial, retenção de impostos sobre o rendimento e contribuições sociais.',
          retentionPeriod:
            '6 a 10 anos após o encerramento do exercício fiscal relevante',
          statutoryBasis: 'Direito Tributário e Contabilidade',
        },
        {
          category: 'Registos de Autenticação e Auditoria',
          purpose:
            'Controlo da segurança, prevenção de intrusões e auditorias informáticas forenses.',
          retentionPeriod: '12 a 24 meses contínuos a partir do registo',
          statutoryBasis: 'Interesse Legítimo de Cibersegurança',
        },
        {
          category: 'Correspondência e Suporte ao Cliente',
          purpose:
            'Acompanhamento de incidentes, histórico técnico e garantia de qualidade de serviço.',
          retentionPeriod: '3 anos após encerramento definitivo do ticket',
          statutoryBasis: 'Execução Contratual e Suporte',
        },
        {
          category: 'Consentimentos de Marketing e Contactos',
          purpose:
            'Gestão de comunicações de produto e divulgação de atualizações do ecossistema.',
          retentionPeriod: 'Até revogação do consentimento ou cancelamento',
          statutoryBasis: 'Consentimento Expresso',
        },
      ],
      expirationNote:
        'Findos os prazos de retenção estipulados, os dados são destruídos de forma irreversível através de processos de eliminação criptográfica ou tornados anonimizados de modo permanente para efeitos de análise agregada.',
    },
    sec8: {
      tag: 'Direitos Estatutários',
      title: '8. Os Seus Direitos de Privacidade',
      intro:
        'Consoante a jurisdição aplicável e as leis de proteção de dados pertinentes (tais como a Lei de Proteção de Dados de Angola e Moçambique, RGPD ou regimes regionais equivalentes), assistem-lhe os seguintes direitos fundamentais:',
      rights: [
        {
          name: 'Direito de Acesso',
          desc: 'Solicitar confirmação e receber uma cópia clara dos dados pessoais tratados pela NextSoftHR.',
        },
        {
          name: 'Direito de Retificação',
          desc: 'Exigir a retificação de dados incorretos, desatualizados ou incompletos constantes do seu registo.',
        },
        {
          name: 'Direito ao Apagamento',
          desc: 'Solicitar a eliminação dos seus dados quando não subsistam obrigações legais para a sua guarda.',
        },
        {
          name: 'Direito à Limitação',
          desc: 'Pedir a suspensão provisória do tratamento enquanto decorrem averiguações ou litígios.',
        },
        {
          name: 'Direito de Oposição',
          desc: 'Opor-se ao tratamento de dados fundamentado exclusivamente em interesses legítimos.',
        },
        {
          name: 'Direito à Portabilidade',
          desc: 'Receber os dados fornecidos num formato estruturado, de uso comum e leitura automática.',
        },
        {
          name: 'Revogação do Consentimento',
          desc: 'Retirar o seu consentimento a qualquer momento quando o tratamento depender de autorização prévia.',
        },
        {
          name: 'Reclamação à Autoridade',
          desc: 'Apresentar uma reclamação formal junto da agência nacional reguladora de proteção de dados.',
        },
      ],
      ctaTitle: 'Deseja Exercer os Seus Direitos de Proteção de Dados?',
      ctaDesc:
        'Envie o seu pedido oficial diretamente para o nosso Encarregado de Proteção de Dados.',
      ctaButton: 'Solicitar Apoio de Privacidade',
    },
    sec9: {
      tag: 'Divisão de Responsabilidades',
      title: '9. Dados de Colaboradores e Clientes',
      intro:
        'Sendo a NextSoftHR uma plataforma corporativa multi-cliente de gestão de recursos humanos e processamento de salários, é fundamental clarificar as diferentes posições jurídicas:',
      processorTitle: 'A NextSoftHR como Subcontratante (Prestador do Serviço)',
      processorDesc:
        'A NextSoftHR faculta a infraestrutura tecnológica, as rotinas de cálculo salarial e os módulos da plataforma. Tratamos os dados do pessoal unicamente mediante as instruções documentadas da empresa cliente e de acordo com o Acordo de Tratamento de Dados (DPA) em vigor.',
      controllerTitle: 'A Empresa Cliente (Empregador) como Responsável pelo Tratamento',
      controllerDesc:
        'O cliente empresarial (a sua entidade empregadora ou contratante) define quais os dados dos funcionários a carregar, como opera o controlo de assiduidade e quais os descontos aplicáveis. O empregador responde diretamente pelo cumprimento das obrigações laborais perante os seus trabalhadores.',
      employeeNoticeTitle: 'Nota para Funcionários e Prestadores:',
      employeeNoticeDesc:
        'Caso seja colaborador de uma empresa e utilize o Autoatendimento (ESS) da NextSoftHR para consultar a folha salarial ou dados contratuais, dirija o seu pedido prioritariamente ao departamento de RH da sua entidade empregadora. A NextSoftHR prestará de imediato todo o apoio técnico ao seu empregador para dar seguimento ao processo.',
    },
    sec10: {
      tag: 'Fluxos Transfronteiriços',
      title: '10. Transferências Internacionais de Dados',
      intro:
        'A NextSoftHR atende organizações no continente africano e em mercados internacionais. Por este motivo, as informações recolhidas podem ser tratadas ou armazenadas em servidores localizados fora do seu país de residência.',
      p2: 'Sempre que realizamos transferências internacionais de dados, aplicamos garantias técnicas e legais rigorosas em conformidade com as leis de privacidade em vigor:',
      safeguards: [
        'Cláusulas Contratuais-Tipo (CCT) e Acordos de Transferência que impõem deveres estritos de confidencialidade e segurança informática.',
        'Avaliações de Impacto de Transferência (AIT) para averiguar o nível de salvaguarda legal nos países onde os dados são processados.',
        'Opções de residência local de dados para organizações de grande dimensão que exijam a guarda dos dados dentro das fronteiras nacionais.',
      ],
    },
    sec11: {
      tag: 'Ecossistema e Conetores',
      title: '11. Serviços e Integrações de Terceiros',
      intro:
        'A nossa plataforma integra-se de forma nativa com fornecedores terceiros, tais como operadoras bancárias, sistemas de contabilidade (ERP), ferramentas de produtividade, serviços de autenticação única (SSO) e infraestruturas em nuvem.',
      p2: 'Salientamos que os serviços de terceiros mantêm termos e políticas de privacidade independentes. Ao ativar conectores externos, recomendamos vivamente a leitura atenta da respetiva documentação de proteção de dados antes de autorizar a ligação.',
    },
    sec12: {
      tag: 'Menores de Idade',
      title: '12. Privacidade de Menores',
      intro:
        'A NextSoftHR é uma solução tecnológica exclusivamente vocacionada para o ambiente corporativo e para organizações e profissionais em exercício de funções. Não foi concebida nem se destina a recolher intencionalmente dados de menores de 16 anos (ou da idade legal de admissão ao trabalho aplicável).',
      p2: 'Se tomarmos conhecimento de que foram transmitidos dados de um menor sem autorização legalmente comprovada do respetivo encarregado de educação ou tutor, procederemos de imediato à sua eliminação dos nossos sistemas.',
    },
    sec13: {
      tag: 'Divulgação Comercial',
      title: '13. Comunicações de Marketing',
      intro:
        'A NextSoftHR poderá enviar pontualmente novidades da plataforma, avisos de novas versões e convites para eventos a administradores registados ou a pessoas que tenham dado a sua autorização expressa para tal.',
      boxTitle: 'Cancelar Subscrição de Comunicações de Marketing',
      boxDesc:
        "Pode cancelar o envio de e-mails promocionais a qualquer momento clicando no link 'Cancelar Subscrição' presente no rodapé de cada mensagem, ou inserindo o seu e-mail profissional abaixo:",
      inputPlaceholder: 'Introduza o seu e-mail profissional',
      optOutButton: 'Cancelar Subscrição',
      optOutSuccess:
        'Pedido de cancelamento registado. A atualização nos nossos sistemas pode demorar até 48 horas.',
      transactionalNote:
        '*Nota importante: O cancelamento de marketing não afeta alertas de serviço críticos, avisos de fecho de salários, faturas ou avisos de cibersegurança necessários à sua conta.',
    },
    sec14: {
      tag: 'Inteligência Artificial',
      title: '14. Inteligência Artificial e Processamento Automatizado',
      intro:
        'A NextSoftHR incorpora recursos avançados de inteligência artificial desenhados para otimizar os fluxos de trabalho do departamento de pessoal e aumentar a eficiência operacional. A nossa IA pode auxiliar em:',
      features: [
        'Esclarecimento de dúvidas sobre políticas internas e manuais da empresa',
        'Análises de métricas e previsões sobre taxas de assiduidade do pessoal',
        'Validação de consistência e deteção de divergências no processamento salarial',
        'Automação de etapas no acolhimento (onboarding) de novos colaboradores',
        'Consolidação de dados estatísticos de produtividade organizacional',
        'Sugestões na alocação e otimização de escalas de turnos',
        'Apoio na elaboração de minutas e documentos padrão de recursos humanos',
      ],
      governanceTitle: 'Governança Ética da IA e Supervisão Humana Contínua',
      governanceDesc:
        'As empresas clientes administram os módulos de IA com autonomia e responsabilidade. As propostas elaboradas e as previsões analíticas são instrumentos de apoio à decisão e não constituem assessoria jurídica, fiscal ou laboral vinculativa.',
      hitlTitle: 'Princípio do Humano no Controlo (HITL):',
      hitlDesc:
        'A NextSoftHR assegura categoricamente que decisões com impacto significativo nos direitos dos trabalhadores (como demissões, sanções ou reduções salariais) jamais serão adotadas de forma puramente automatizada sem verificação humana qualificada.',
      disclaimer:
        'Não afirmamos que os conteúdos gerados por IA estejam totalmente isentos de imprecisões. Todos os relatórios devem ser conferidos por um profissional de RH antes da sua adoção formal.',
    },
    sec15: {
      tag: 'Histórico de Versões',
      title: '15. Alterações a Esta Política de Privacidade',
      intro:
        'A NextSoftHR reserva-se o direito de atualizar periodicamente a presente Política de Privacidade para acompanhar desenvolvimentos funcionais, melhorias técnicas de segurança e novidades legislativas.',
      p2: 'Quando forem introduzidas modificações materiais, publicaremos um aviso inequívoco na plataforma ou enviaremos uma notificação para o seu e-mail antes da entrada em vigor das alterações.',
      statusLabel: 'Estado da Política:',
      effectiveLabel: 'Válida a partir de',
      hideHistory: 'Ocultar Histórico',
      viewHistory: 'Histórico de Versões',
    },
    sec16: {
      tag: 'Contacto e DPO',
      title: '16. Contacte-nos',
      bannerTitle: 'Tem Dúvidas sobre a Sua Privacidade?',
      bannerDesc:
        'Se tem questões ou pretende exercer os seus direitos relativamente ao tratamento de dados na NextSoftHR, a nossa equipa de conformidade está ao seu inteiro dispor.',
      orgLabel: 'Organização',
      websiteLabel: 'Website Oficial',
      hotlineLabel: 'Linha Direta de Privacidade',
      contactBtn: 'Contactar Equipa',
      visitBtn: 'Visitar NextSoftHR',
      formTitle: 'Submeter um Pedido Formal de Privacidade',
      formDesc:
        'Preencha este formulário verificado para submeter pedidos de acesso, correção, eliminação de dados ou questões gerais à equipa de conformidade.',
    },
  },
  requestForm: {
    receivedTitle: 'Pedido de Privacidade Registado',
    receivedDesc:
      'O seu pedido foi encaminhado para o nosso Gabinete de Proteção de Dados. Foi gerado um comprovativo com o número de referência.',
    ticketRef: 'Código de Referência:',
    statutoryTime:
      'Ao abrigo das normas aplicáveis, os pedidos são analisados e respondidos num prazo médio de 30 dias após verificação de identidade.',
    submitAnother: 'Submeter Outro Pedido',
    fullNameLabel: 'Nome Completo',
    fullNamePlaceholder: 'ex.: Manuel dos Santos',
    orgLabel: 'Empresa / Organização',
    orgPlaceholder: 'ex.: Sociedade Mineira e Comercial SARL',
    emailLabel: 'E-mail Corporativo Oficial',
    emailPlaceholder: 'voce@empresa.com',
    typeLabel: 'Tipo de Pedido',
    types: {
      access: 'Acesso aos meus Dados Pessoais',
      correct: 'Retificação de Dados Incorretos',
      delete: 'Eliminação / Apagamento de Dados',
      question: 'Dúvida Geral sobre Privacidade',
      security: 'Notificação sobre Incidente de Segurança',
      other: 'Outro Assunto de Privacidade',
    },
    messageLabel: 'Descrição Pormenorizada do Pedido',
    messagePlaceholder:
      'Indique com clareza os dados pessoais ou processos de RH em causa, a empresa em que trabalha ou o teor da sua solicitação...',
    attachLabel: 'Documento Comprovativo (Opcional)',
    attachButton: 'Anexar Ficheiro (PDF, PNG, JPG ≤ 5MB)',
    consentText:
      'Declaro que tenho legitimidade para apresentar este pedido e autorizo a NextSoftHR a validar a minha identidade através dos contactos facultados, em conformidade com as leis de proteção de dados.',
    submitBtn: 'Submeter Pedido de Privacidade',
    submittingBtn: 'A enviar pedido...',
  },
  cookiesModal: {
    title: 'Preferências de Cookies e Rastreio',
    subtitle: 'Defina como a NextSoftHR pode utilizar cookies nesta sessão',
    intro:
      'A NextSoftHR utiliza cookies e armazenamento local para manter as sessões ativas, assegurar a integridade dos dados, reter preferências de idioma e acompanhar a utilização do sistema. Pode ajustar as suas opções abaixo.',
    essentialTitle: 'Cookies Estritamente Necessários',
    essentialTag: 'Obrigatório',
    essentialDesc:
      'Essenciais para autenticação cifrada, equilíbrio de tráfego, segurança CSRF e circulação na plataforma. Não podem ser desativados.',
    alwaysActive: 'Sempre Ativos',
    functionalTitle: 'Cookies de Funcionalidade e Preferências',
    functionalDesc:
      'Guardam o idioma escolhido, o perfil de trabalho atual, o fuso horário e parâmetros de formatação de tabelas.',
    analyticsTitle: 'Cookies Analíticos e de Desempenho',
    analyticsDesc:
      'Dados consolidados de forma anónima para identificar possíveis bloqueios no sistema e guiar a melhoria da experiência de navegação.',
    marketingTitle: 'Cookies de Comunicação Comercial',
    marketingDesc:
      'Ajudam a assegurar que recebe apenas anúncios de funcionalidades e materiais que sejam verdadeiramente relevantes para si.',
    savedSuccess: 'As suas preferências foram guardadas no navegador.',
    rejectOptional: 'Rejeitar Opcionais',
    acceptAll: 'Aceitar Todos',
    savePreferences: 'Guardar Preferências',
  },
  adminModal: {
    title: 'Configuração da Notificação de Política',
    subtitle:
      'Altere a data de vigência e o identificador de versão de forma dinâmica',
    banner:
      'Os administradores podem atualizar a data de publicação, a versão legal e as referências de apoio. As mudanças produzem efeitos imediatos em toda a página.',
    dateLabel: 'Data de Vigência Apresentada',
    versionLabel: 'Identificador da Versão da Política',
    orgLabel: 'Organização:',
    hotlineLabel: 'Linha Telefónica:',
    savedNotice: 'Dados da notificação atualizados e guardados com êxito!',
    resetBtn: 'Repor Valor Padrão',
    cancelBtn: 'Cancelar',
    applyBtn: 'Gravar Notificação',
  },
  trust: {
    tag: 'Arquitetura de Segurança NextSoftHR',
    title: 'Edificado com a Privacidade e Segurança no Cerne',
    subtitle:
      'A nossa plataforma de gestão de recursos humanos e processamento salarial foi concebida para salvaguardar a integridade dos colaboradores e a confidencialidade dos negócios.',
    cards: [
      {
        title: 'Proteção de Dados Rigorosa',
        desc: 'Concebido para apoiar as organizações na salvaguarda de dados salariais através de encriptação robusta e partições isoladas.',
        badge: 'Criptografia Total em Repouso',
      },
      {
        title: 'Acessos Seguros',
        desc: 'Definição rigorosa de permissões (RBAC), autenticação multifator (MFA) e registo detalhado de acessos por sessão.',
        badge: 'RBAC e MFA Integrados',
      },
      {
        title: 'Gestão Responsável de Informação',
        desc: 'Instrumentos para gerir dados laborais de forma transparente, com purgas automáticas e auditorias completas.',
        badge: 'Ferramentas de Conformidade',
      },
      {
        title: 'Suporte Pan-Africano e Global',
        desc: 'Construído a pensar em empresas a operar em África e em mercados globais, com suporte a múltiplas moedas e quadros legais locais.',
        badge: 'SaaS África e Internacional',
      },
    ],
    readyText: 'Pronto para Grandes Empresas',
  },
  footer: {
    desc: 'Plataforma Global e Pan-Africana de Gestão de Recursos Humanos, Processamento Salarial e Gestão Empresarial para micro, pequenas, médias e grandes empresas.',
    platformTitle: 'Plataforma',
    businessTitle: 'Gestão de Negócios',
    resourcesTitle: 'Recursos',
    legalTitle: 'Legal e Conformidade',
    backToTop: 'Voltar ao Topo',
    allRightsReserved: 'Todos os Direitos Reservados.',
    tagline: 'Arquitetura de Software SaaS de RH e Salários',
  },
  liveChat: {
    buttonLabel: 'Apoio em Direto',
    statusOnline: 'Agentes Disponíveis Online',
    headerTitle: 'Central de Apoio NextSoftHR',
    replyTime: 'Tempo de resposta habitual inferior a 5 minutos',
    tabChat: 'Falar com um Agente',
    tabChannels: 'Canais Diretos',
    tabFaq: 'Dúvidas Frequentes',
    departmentLabel: 'Área do pedido:',
    departments: {
      privacy: 'Privacidade e Encarregado (DPO)',
      hr: 'Consultoria de RH e Salários',
      technical: 'Suporte Técnico e Plataforma Cloud',
      billing: 'Faturação e Subscrições',
    },
    initialAgentGreeting:
      'Olá! Bem-vindo ao apoio em direto da NextSoftHR. Os nossos operadores humanos estão disponíveis para ajudar a sua empresa em questões de RH, salários ou privacidade. Como podemos ajudar hoje?',
    placeholder: 'Escreva a sua mensagem para o operador...',
    sendButton: 'Enviar',
    agentTyping: 'O operador está a escrever...',
    callDirect: 'Ligar para a Linha Telefónica',
    whatsappChat: 'Conversar pelo WhatsApp',
    emailDesk: 'Enviar Mensagem ao Apoio Técnico',
    operatingHours: 'De Segunda a Sábado: 8h00 – 18h00 (WAT / GMT+1)',
    operatingHoursTitle: 'Horário de Atendimento',
    needPrivacyAssistance: 'Pretende submeter um pedido formal de proteção de dados?',
    privacyFormBtn: 'Abrir Formulário do DPO',
    close: 'Fechar chat',
    minimize: 'Minimizar',
  },
};
