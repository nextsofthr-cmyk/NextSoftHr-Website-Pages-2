import { SectionTranslationMeta } from '../types';

export const PT_SECTIONS: Record<string, SectionTranslationMeta> = {
  introduction: {
    title: 'Introdução & Âmbito da Plataforma',
    category: 'General',
    summary: 'A NextSoftHR disponibiliza uma plataforma global de software na nuvem para RH, processamento salarial e gestão de empresas. Estes Termos regulam a relação contratual.',
    paragraphs: [
      'A NextSoftHR Ltd. («NextSoftHR», «nós» ou «nosso») desenvolve e opera uma plataforma integrada em nuvem (SaaS) concebida para apoiar organizações no processamento salarial, gestão de recursos humanos, assiduidade, férias, recrutamento e seleção (ATS), gestão de relações comerciais (CRM), controlo financeiro e projetos empresariais.',
      'Os presentes Termos e Condições («Termos» ou «Contrato») constituem um acordo jurídico vinculativo entre a NextSoftHR e a entidade singular ou coletiva («Cliente», «você» ou «seu») que acede ao serviço, cria uma conta ou subscreve um plano comercial.',
      'Ao aceder ao website www.nextsofthr.org, criar uma conta corporativa ou utilizar as nossas aplicações e interfaces de programação (APIs), confirma expressamente que leu, compreendeu e concorda em cumprir estes Termos na íntegra.'
    ],
    bulletPoints: [
      'Aplicável a micro, pequenas, médias e grandes empresas multinacionais.',
      'Regula todos os módulos operacionais, portais de colaboradores e serviços geridos.',
      'Exige validação e aceitação prévia antes de qualquer processamento salarial.'
    ]
  },

  'acceptance-of-terms': {
    title: 'Aceitação dos Termos de Utilização',
    category: 'General',
    summary: 'A utilização dos serviços implica a aceitação plena e irrevogável destes termos por um representante legalmente autorizado da sua organização.',
    highlightBoxTitle: 'Aviso de Revisão Jurídica Obrigatória',
    highlightBoxText: 'Leia atentamente estes Termos antes de processar salários ou atribuir acessos organizacionais aos seus colaboradores.',
    paragraphs: [
      'Ao assinalar a caixa de confirmação no momento do registo, validar uma Proposta Comercial (Order Form) ou aceder à Plataforma, confirma a sua adesão vinculativa a todas as cláusulas deste documento.',
      'Se estiver a celebrar este acordo em nome de uma sociedade, instituição ou entidade coletiva, declara e garante dispor dos poderes de representação estatutários necessários para vincular juridicamente a referida organização.',
      'Caso não concorde com qualquer disposição destes Termos ou careça dos devidos poderes legais, deve abster-se imediatamente de aceder ou utilizar a Plataforma NextSoftHR.'
    ]
  },

  definitions: {
    title: 'Definições & Terminologia Contratual',
    category: 'General',
    summary: 'Conceitos jurídicos e operacionais fundamentais definidos para garantir clareza absoluta em todas as jurisdições lusófonas e internacionais.',
    paragraphs: [
      'Para efeitos dos presentes Termos e Condições, os termos iniciados com letra maiúscula assumem os significados definidos no glossário interativo abaixo e no clausulado geral deste instrumento.',
      'As definições aplicam-se igualmente no singular e no plural, bem como em todas as suas variantes gramaticais.'
    ]
  },

  eligibility: {
    title: 'Elegibilidade & Capacidade Jurídica',
    category: 'General',
    summary: 'A Plataforma destina-se em exclusivo a empresas e profissionais maiores com capacidade jurídica, excluindo fins de consumo pessoal ou doméstico.',
    paragraphs: [
      'A NextSoftHR é uma solução de software exclusivamente corporativa (B2B). Para subscrever os serviços ou criar uma conta, o Cliente deve ser uma entidade comercial legalmente constituída ou um profissional independente registado perante as autoridades fiscais competentes.',
      'Qualquer Utilizador individual que opere na Plataforma deve ter pelo menos dezoito (18) anos de idade ou ter atingido a maioridade legal estabelecida na sua respetiva jurisdição.',
      'A Plataforma não se destina nem é licenciada para utilizações domésticas, individuais ou para fins particulares de consumidores.'
    ]
  },

  'account-registration': {
    title: 'Registo de Conta & Segurança das Credenciais',
    category: 'General',
    summary: 'O Cliente deve fornecer dados rigorosos, proteger credenciais de acesso e assumir total responsabilidade pela administração dos seus utilizadores.',
    paragraphs: [
      'Ao criar a conta da empresa, o Cliente compromete-se a fornecer informações comerciais completas, exatas e permanentemente atualizadas (designação social, NIF/NIPC, país de sede e representantes credenciados).',
      'O Cliente é o único responsável pela guarda confidencial das suas palavras-passe, chaves de autenticação de dois fatores e tokens de API. Qualquer atividade efetuada através das credenciais do Cliente é juridicamente imputável à organização deste.',
      'O Administrador designado gere os privilégios dos utilizadores internos. Em caso de extravio ou suspeita de comprometimento de dados de acesso, o Cliente deve notificar de imediato a NextSoftHR através de security@nextsofthr.org.'
    ],
    bulletPoints: [
      'Obrigatoriedade de autenticação de dois fatores (MFA) para contas com poderes de administração.',
      'Revogação imediata de credenciais aquando da saída ou transferência de funções de um colaborador.',
      'Proibição absoluta de partilha de um mesmo perfil de acesso entre vários indivíduos.'
    ]
  },

  'user-responsibilities': {
    title: 'Responsabilidades do Utilizador & Uso Aceitável',
    category: 'General',
    summary: 'Proibição rigorosa de engenharia reversa, intrusões informáticas, disseminação de código malicioso ou operações salariais fraudulentas.',
    paragraphs: [
      'O Cliente compromete-se a utilizar a Plataforma NextSoftHR em estrita conformidade com a legislação em vigor, nomeadamente o direito do trabalho aplicável, as normas fiscais de retenção na fonte e as regras de proteção de dados.',
      'É expressamente vedado ao Cliente e a todos os seus Utilizadores:',
      'Qualquer violação comprovada destas normas de conduta confere à NextSoftHR o direito de suspender ou rescindir o acesso à conta sem aviso prévio nem direito a indemnização.'
    ],
    bulletPoints: [
      'Proceder a engenharia reversa, descompilação ou tentativa de extração do código-fonte do software.',
      'Testar, contornar ou violar mecanismos de autenticação e proteção sem autorização prévia por escrito.',
      'Carregar ou transmitir vírus informáticos, trojans ou qualquer software malicioso.',
      'Processar recibos de vencimento fictícios ou executar fluxos financeiros conscientemente fraudulentos.',
      'Efetuar raspagem (scraping) de dados ou perturbar a estabilidade da infraestrutura comum na nuvem.'
    ]
  },

  'platform-use': {
    title: 'Utilização da Plataforma NextSoftHR',
    category: 'Modules',
    summary: 'A NextSoftHR concede uma licença de acesso revogável, não exclusiva e intransmissível aos módulos contratados para as operações internas do Cliente.',
    paragraphs: [
      'Condicionado ao pagamento pontual das mensalidades ou anuidades acordadas e ao cumprimento destes Termos, a NextSoftHR concede ao Cliente uma licença limitada, não exclusiva e intransmissível de acesso à Plataforma a nível mundial para a gestão interna do seu negócio.',
      'O conjunto exato de ferramentas disponíveis depende dos módulos específicos ativados no plano de subscrição (Gestão de RH, Processamento Salarial, Assiduidade, Férias, Recrutamento, CRM, Finanças, Tarefas e Portais de Autosserviço).'
    ]
  },

  'hr-management': {
    title: 'Serviços de Gestão de Recursos Humanos (RH)',
    category: 'Modules',
    summary: 'Centralização de processos cadastrais de pessoal, organigramas, integração de colaboradores e gestão do ciclo de vida funcional.',
    paragraphs: [
      'O módulo de RH possibilita a estruturação de departamentos da organização, administração de fichas de colaboradores (documentos de identificação, habilitações, dados contratuais e contactos de emergência) e fluxos digitais de admissão e rescisão.',
      'O Cliente mantém controlo exclusivo sobre os campos personalizados e compromete-se a recolher apenas dados relevantes e proporcionais à execução dos respetivos contratos de trabalho.'
    ]
  },

  'payroll-services': {
    title: 'Serviços & Processamento Salarial',
    category: 'Modules',
    summary: 'Motor de cálculo do salário bruto ao líquido com retenções legais. O Cliente é o único responsável pela auditoria dos seus parâmetros fiscais.',
    highlightBoxTitle: 'Aviso sobre Conferência de Salários',
    highlightBoxText: 'Antes de autorizar ordens de transferência bancária, o Cliente deve auditar mapas e valores. A NextSoftHR não presta serviços de contabilidade nem assessoria tributária.',
    paragraphs: [
      'A NextSoftHR disponibiliza um motor de cálculo que automatiza vencimentos base, subsídios legais (alimentação, férias, natal), deduções para a segurança social e retenções na fonte de imposto sobre rendimentos.',
      'O Cliente reconhece expressamente que a NextSoftHR não atua como consultoria fiscal, perito contabilista ou solicitador. Cabe exclusivamente ao Cliente parametrizar, verificar e aprovar as taxas aplicáveis e as convenções coletivas antes de emitir pagamentos.',
      'A NextSoftHR não assume responsabilidade por incorreções resultantes de tabelas de impostos incorretamente introduzidas pelo Cliente ou por dados de horas omitidos.'
    ]
  },

  'employee-self-service': {
    title: 'Portal do Colaborador em Autosserviço (ESS)',
    category: 'Modules',
    summary: 'Acesso web e móvel para os trabalhadores descarregarem recibos de vencimento, solicitarem férias e entregarem despesas com autonomia.',
    paragraphs: [
      'O portal ESS faculta aos colaboradores acesso seguro e confidencial aos seus recibos de vencimento digitais, declarações de rendimentos, consulta de saldos de férias e submissão de despesas reembolsáveis.',
      'Cada trabalhador é responsável por guardar as suas credenciais. O acesso ao ESS é cancelado logo que a entidade patronal comunique o termo do vínculo laboral.'
    ]
  },

  'time-attendance': {
    title: 'Controlo de Assiduidade & Gestão de Horários',
    category: 'Modules',
    summary: 'Registo de ponto biométrico ou móvel georreferenciado, escalas de serviço e cômputo automatizado de horas suplementares.',
    paragraphs: [
      'Permite monitorizar tempos de trabalho, marcação de ponto através de dispositivos dedicados ou telemóveis com geolocalização autorizada, escalas por turnos e horas extras.',
      'O Cliente declara que obteve o consentimento e as autorizações legalmente impostas junto dos representantes sindicais ou comissões de trabalhadores relativamente ao registo de dados biométricos ou de localização.'
    ]
  },

  'leave-management': {
    title: 'Gestão de Férias & Ausências',
    category: 'Modules',
    summary: 'Cálculo automatizado do direito a férias, aprovações por níveis hierárquicos e integração com o processamento de vencimentos.',
    paragraphs: [
      'O Cliente estabelece os critérios de férias anuais, licenças de maternidade/paternidade, baixas médicas e faltas justificadas de acordo com o regime laboral da respetiva jurisdição.',
      'Todas as aprovações e recusas ficam permanentemente registadas com data, hora e assinatura eletrónica do responsável no histórico de auditoria.'
    ]
  },

  'recruitment-talent': {
    title: 'Recrutamento & Gestão de Candidatos (ATS)',
    category: 'Modules',
    summary: 'Publicação de vagas de emprego, gestão de candidaturas em quadros Kanban, agendamento de entrevistas e propostas contratuais.',
    paragraphs: [
      'O sistema ATS permite a divulgação de ofertas de trabalho, receção centralizada de currículos e avaliação por critérios objetivos de competência. O Cliente assegura a observância do princípio de não-discriminação.',
      'Os dados dos candidatos não selecionados devem ser conservados ou eliminados nos termos dos prazos legalmente fixados pela legislação de proteção de dados.'
    ]
  },

  'crm-business-features': {
    title: 'CRM & Relações com Clientes Comerciais',
    category: 'Modules',
    summary: 'Acompanhamento de clientes institucionais, contratos de prestação de serviços e registo de contactos de faturação.',
    paragraphs: [
      'As funcionalidades integradas de CRM auxiliam a interligar os contratos comerciais de prestação de serviços às equipas e colaboradores afetos a cada projeto.',
      'O Cliente garante possuir a base de licitude legal necessária para o registo de contactos profissionais na base de dados.'
    ]
  },

  'project-task-management': {
    title: 'Gestão de Projetos & Atribuição de Tarefas',
    category: 'Modules',
    summary: 'Planeamento de atividades, afetação de quadros, registo de tempos faturáveis e acompanhamento de rentabilidade económica.',
    paragraphs: [
      'Permite a divisão de projetos em tarefas operacionais, atribuição de recursos humanos, cômputo de tempos imputados e controlo orçamental em tempo real.',
      'A veracidade e aprovação das horas imputadas pelas equipas constituem obrigação dos gestores nomeados pelo Cliente.'
    ]
  },

  'third-party-integrations': {
    title: 'Integrações & Conexões Externas',
    category: 'Modules',
    summary: 'Interligação com redes bancárias, plataformas fiscais, sistemas de contabilidade ERP e fornecedores de identidade empresarial SSO.',
    paragraphs: [
      'A NextSoftHR disponibiliza conectores para sistemas externos (ficheiros de pagamento bancário, exportação para softwares de contabilidade e autenticação federada com Microsoft Azure AD ou Google Workspace).',
      'A ativação de serviços externos pode carecer de contratos e encargos autónomos perante os respetivos fornecedores, sob responsabilidade do Cliente.'
    ]
  },

  'subscription-plans': {
    title: 'Planos de Subscrição & Preçário',
    category: 'Commercial',
    summary: 'Modelos de subscrição mensal ou anual dimensionados pelo número de colaboradores ativos e pelos módulos ativados na organização.',
    paragraphs: [
      'O acesso à Plataforma baseia-se num regime de subscrição contínua. Os valores são apurados em função dos módulos subscritos e do escalão de trabalhadores registados durante o ciclo de faturação.',
      'Qualquer acréscimo no volume de colaboradores acima do escalão contratado será ajustado de forma proporcional (pro rata) na fatura subsequente.',
      'Os preços são apresentados líquidos de impostos (IVA, imposto de consumo ou retenções tributárias locais), cuja liquidação compete ao Cliente.'
    ]
  },

  'free-trials': {
    title: 'Períodos de Teste Gratuito & Demonstrações',
    category: 'Commercial',
    summary: 'Condições de utilização dos ambientes de avaliação sem compromisso para análise das funcionalidades da plataforma.',
    paragraphs: [
      'A NextSoftHR pode disponibilizar períodos de teste gratuitos com duração de catorze (14) ou trinta (30) dias para apreciação prévia por parte da organização.',
      'Durante a fase de testes, determinadas funcionalidades operacionais, como a emissão de ordens bancárias definitivas, podem permanecer limitadas.',
      'Terminado o período de teste sem que ocorra a subscrição formal de um plano pago, o acesso é suspenso e os dados são guardados de forma segura durante trinta (30) dias antes da sua eliminação definitiva.'
    ]
  },

  'payment-billing': {
    title: 'Faturação & Condições de Pagamento',
    category: 'Commercial',
    summary: 'Liquidação de faturas por cartão, débito direto ou transferência bancária. Procedimento em caso de mora ou recusa de cobrança.',
    paragraphs: [
      'As mensalidades e anuidades vencem-se no início de cada período de faturação. O Cliente obriga-se a manter dados de pagamento válidos e com fundos disponíveis.',
      'Caso ocorra falha na liquidação, é emitida uma notificação de mora. Mantendo-se o incumprimento por período superior a catorze (14) dias, a NextSoftHR reserva-se o direito de suspender os acessos até à integral regularização.',
      'Não são efetuados reembolsos relativos a períodos contratuais já iniciados em caso de cancelamento voluntário antecipado.'
    ]
  },

  'suspension-termination': {
    title: 'Suspensão & Rescisão do Contrato',
    category: 'Commercial',
    summary: 'Procedimento de não renovação no termo do período contratual e causas de suspensão imediata por violação grave dos deveres.',
    paragraphs: [
      'Qualquer uma das partes pode denunciar o contrato com efeitos no final do período em curso, mediante comunicação escrita com pelo menos trinta (30) dias de antecedência.',
      'A NextSoftHR poderá suspender ou cancelar o acesso com efeitos imediatos em casos de incumprimento reiterado de pagamentos, fraude declarada, violação de propriedade intelectual ou comprometimento da segurança dos servidores.',
      'Após o cancelamento definitivo, o Cliente dispõe de um prazo de trinta (30) dias para descarregar o histórico de dados salariais em formatos universais (CSV, Excel, PDF).'
    ]
  },

  'data-ownership': {
    title: 'Propriedade dos Dados do Cliente',
    category: 'Data & Security',
    summary: 'O Cliente mantém a titularidade absoluta e exclusiva sobre todos os dados dos seus colaboradores, ficheiros salariais e documentação.',
    paragraphs: [
      'O Cliente é e permanecerá o titular exclusivo de todos os dados, folhas de cálculo, ficheiros cadastrais e registos de remunerações introduzidos na sua área de trabalho («Dados do Cliente»).',
      'A NextSoftHR não reivindica quaisquer direitos de propriedade sobre os dados dos seus colaboradores. Concede-nos apenas uma licença limitada e estrita para armazenar e tratar a informação estritamente necessária à execução dos serviços contratados.'
    ]
  },

  'privacy-data-protection': {
    title: 'Privacidade & Proteção de Dados Pessoais',
    category: 'Data & Security',
    summary: 'Conformidade com o RGPD, convenções africanas de proteção de dados, leis nacionais de privacidade e disponibilização de DPA formal.',
    highlightBoxTitle: 'Acordo de Processamento de Dados (DPA)',
    highlightBoxText: 'Um Acordo de Processamento de Dados (DPA) formalizando garantias de confidencialidade e segurança está disponível mediante pedido.',
    actionLabel: 'Ver Política',
    paragraphs: [
      'A NextSoftHR trata os dados pessoais em rigorosa conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD), a Lei Geral de Proteção de Dados de Angola (Lei n.º 22/11), a legislação moçambicana e os princípios da Convenção de Malabo da União Africana.',
      'No âmbito da relação contratual, o Cliente atua como «Responsável pelo Tratamento» e a NextSoftHR atua como «Subcontratante», operando estritamente em função das instruções documentadas transmitidas pelo Cliente.',
      'A NextSoftHR nunca comercializa, aluga ou cede dados pessoais de trabalhadores a empresas de marketing ou redes de publicidade de terceiros.'
    ]
  },

  'security-safeguards': {
    title: 'Segurança & Medidas Técnicas de Proteção',
    category: 'Data & Security',
    summary: 'Encriptação total (TLS 1.3 / AES-256), centros de dados certificados, cópias de segurança diárias e gestão rigorosa de acessos RBAC.',
    paragraphs: [
      'A NextSoftHR implementa medidas de segurança organizacionais e lógicas de padrão internacional para assegurar a inviolabilidade, confidencialidade e resiliência dos dados da empresa.',
      'As comunicações são cifradas em trânsito através de TLS 1.3 e em repouso com recurso ao padrão criptográfico AES-256. Os servidores operam em centros de dados certificados pelas normas SOC 2 Tipo II e ISO/IEC 27001.',
      'São geradas cópias de segurança integrais diariamente com replicação geográfica para salvaguardar a continuidade operacional dos clientes contra perdas acidentais.'
    ]
  },

  confidentiality: {
    title: 'Dever de Confidencialidade',
    category: 'Data & Security',
    summary: 'Obrigação mútua de sigilo profissional abrangendo remunerações salariais, relatórios financeiros e segredos de negócio revelados.',
    paragraphs: [
      'Ambas as partes obrigam-se a manter sob rigoroso sigilo qualquer informação técnica, económica, estratégica ou salarial que lhes tenha sido confiada pela contraparte no decurso da relação contratual.',
      'Este dever de confidencialidade perdura durante a vigência do contrato e subsiste por um período de cinco (5) anos após a cessação definitiva dos serviços.'
    ]
  },

  'intellectual-property': {
    title: 'Propriedade Intelectual da NextSoftHR',
    category: 'Legal & Compliance',
    summary: 'A NextSoftHR detém com exclusividade todos os direitos de autor, marcas, patentes e código-fonte relativos à sua plataforma.',
    paragraphs: [
      'Todos os direitos de propriedade intelectual relativos à Plataforma (software, código-fonte, arquitetura de bases de dados, logótipos e documentação) são propriedade exclusiva da NextSoftHR Ltd. e dos seus licenciantes.',
      'O presente acordo não transmite ao Cliente quaisquer direitos de propriedade industrial sobre a Plataforma, limitando-se ao direito pontual de utilização contratado.'
    ]
  },

  'user-content': {
    title: 'Conteúdo Fornecido pelo Utilizador',
    category: 'Legal & Compliance',
    summary: 'Declaração e garantia do Cliente quanto à legitimidade jurídica do tratamento e inserção dos dados dos seus colaboradores.',
    paragraphs: [
      'O Cliente garante dispor de todas as autorizações, bases jurídicas e consentimentos legalmente exigidos para armazenar e tratar na Plataforma os dados pessoais da sua força de trabalho.',
      'O Cliente isenta integralmente a NextSoftHR de quaisquer reclamações formuladas por colaboradores com fundamento em tratamento ilícito promovido pela entidade patronal.'
    ]
  },

  'third-party-services': {
    title: 'Serviços de Terceiros & Ligações Externas',
    category: 'Legal & Compliance',
    summary: 'Exoneração de responsabilidade por atrasos, alterações técnicas ou falhas atribuíveis a entidades bancárias ou portais públicos.',
    paragraphs: [
      'A Plataforma pode permitir o encaminhamento de instruções para entidades externas (redes bancárias, segurança social ou portais de tributação). O funcionamento dessas entidades rege-se pelos respetivos termos próprios.',
      'A NextSoftHR não responde por indisponibilidades técnicas, quebras de comunicação ou alterações unilaterais impostas por tais prestadores externos.'
    ]
  },

  'service-availability': {
    title: 'Disponibilidade do Serviço & Manutenção',
    category: 'Legal & Compliance',
    summary: 'Meta de disponibilidade contínua de 99,9% na nuvem, com ressalva para janelas calendarizadas de manutenção ou incidentes de telecomunicações.',
    paragraphs: [
      'A NextSoftHR envida esforços técnicos comercialmente razoáveis para manter a Plataforma acessível 24 horas por dia, 7 dias por semana, com um objetivo de disponibilidade mensal de 99,9%.',
      'Podem ocorrer interrupções programadas para manutenção preventiva ou atualizações estruturais de segurança, as quais serão comunicadas previamente sempre que viável.'
    ]
  },

  'software-updates': {
    title: 'Atualizações de Software & Evoluções',
    category: 'Legal & Compliance',
    summary: 'Disponibilização periódica de melhorias de interface, patches de proteção e atualizações de tabelas legais de processamento.',
    paragraphs: [
      'A NextSoftHR atualiza periodicamente a sua Plataforma com o intuito de aperfeiçoar a estabilidade, introduzir novos recursos e responder a novas obrigações legais.',
      'As atualizações gerais da versão contratada são disponibilizadas sem custos adicionais, reservando-se a criação de módulos independentes para contratação facultativa.'
    ]
  },

  disclaimers: {
    title: 'Exoneração de Garantias & Advertências',
    category: 'Legal & Compliance',
    summary: 'Fornecimento do software no estado em que se encontra. A NextSoftHR não substitui o juízo profissional e contabilístico do Cliente.',
    highlightBoxTitle: 'Advertência Jurídico-Contabilística',
    highlightBoxText: 'A NextSoftHR fornece uma aplicação informática e não dispensa nem substitui a assessoria contabilística, jurídica e laboral independente.',
    paragraphs: [
      'Ressalvadas as garantias legais inderrogáveis, a Plataforma é disponibilizada «tal como se encontra» («as is»). A NextSoftHR não garante que o software funcione sem pequenas interrupções circunstanciais ou que se adapte integralmente a exigências setoriais atípicas do Cliente.',
      'Compete ao Cliente validar com auditores e contabilistas certificados a conformidade dos mapas e declarações antes do envio para entidades reguladoras.'
    ]
  },

  'limitation-liability': {
    title: 'Limitação de Responsabilidade',
    category: 'Legal & Compliance',
    summary: 'Exclusão de danos indiretos e teto indemnizatório máximo equivalente aos montantes pagos pelo Cliente nos 12 meses anteriores.',
    counselFlag: '[Revisão Jurídica Lusófona Recomendada: Limite padrão de responsabilidade civil SaaS]',
    paragraphs: [
      'Na extensão máxima admitida pela ordem jurídica aplicável, nenhuma das partes poderá ser responsabilizada perante a outra por lucros cessantes, perdas indiretas, quebras de produção ou danos reputacionais.',
      'A responsabilidade indemnizatória máxima acumulada da NextSoftHR perante o Cliente por qualquer causa relacionada com este Contrato fica expressamente limitada ao valor global pago pelo Cliente à NextSoftHR nos doze (12) meses imediatamente anteriores ao facto que originou o pedido.'
    ]
  },

  indemnification: {
    title: 'Indeminização & Salvaguarda Mútua',
    category: 'Legal & Compliance',
    summary: 'Garantias recíprocas contra pedidos de contrafação de software e contra utilizações ilegítimas de dados de pessoal.',
    paragraphs: [
      'A NextSoftHR defenderá e indemnizará o Cliente relativamente a processos judiciais instaurados por terceiros que comprovem violação de direitos de autor pelo software NextSoftHR, desde que avisada imediatamente por escrito.',
      'De igual modo, o Cliente compromete-se a defender a NextSoftHR contra litígios resultantes de incumprimento patronal das obrigações salariais ou fiscais aplicáveis aos seus funcionários.'
    ]
  },

  'force-majeure': {
    title: 'Força Maior',
    category: 'Legal & Compliance',
    summary: 'Exoneração temporária de cumprimento por motivos de catástrofes naturais, conflitos bélicos, greves gerais ou falhas gerais de eletricidade.',
    paragraphs: [
      'Nenhuma das partes responde por atrasos ou incumprimentos decorrentes de eventos imprevistos e insuperáveis de força maior alheios à sua vontade (cataclismos naturais, guerras, tumultos sociais, ciberataques de escala estatal ou apagões elétricos regionais).'
    ]
  },

  'governing-law': {
    title: 'Lei Aplicável & Foro Competente',
    category: 'Legal & Compliance',
    summary: 'Indicação da lei que rege o contrato e foro judiciário convencionado para a resolução de diferendos.',
    counselFlag: '[A indicar pela assessoria jurídica: Sede societária & Foro judicial competente]',
    paragraphs: [
      'Os presentes Termos e qualquer litígio com eles conexo regem-se e são interpretados de acordo com a legislação do país onde se situa a sede social da NextSoftHR Ltd., com exclusão das regras de conflito de leis.',
      'As partes elegem o foro judicial da comarca onde se localiza a sede estatutária da NextSoftHR para dirimir quaisquer litígios pendentes, com renúncia a qualquer outro.'
    ]
  },

  'dispute-resolution': {
    title: 'Resolução de Conflitos & Arbitragem',
    category: 'Legal & Compliance',
    summary: 'Tentativa obrigatória de conciliação amigável durante 30 dias antes de qualquer recurso à via contenciosa ou arbitral.',
    paragraphs: [
      'Na eventualidade de qualquer divergência ou litígio, as partes envidarão os melhores esforços para alcançar uma solução amigável e concertada por via negocial direta, pelo prazo mínimo de trinta (30) dias.',
      'Fracassada a tentativa amigável, o diferendo poderá ser submetido a arbitragem institucional idónea ou aos tribunais comuns competentes.'
    ]
  },

  'changes-to-terms': {
    title: 'Alterações aos Presentes Termos',
    category: 'Legal & Compliance',
    summary: 'Aviso prévio razoável de 30 dias para atualizações contratuais substanciais, com indicação da data da revisão mais recente.',
    paragraphs: [
      'A NextSoftHR poderá rever periodicamente estes Termos para contemplar aperfeiçoamentos no serviço ou acomodar novas exigências regulamentares.',
      'Em caso de alterações materiais que afetem negativamente os direitos do Cliente, será emitido aviso por correio eletrónico ou notificação na Plataforma com pelo menos trinta (30) dias de antecedência relativamente à sua entrada em vigor.'
    ]
  },

  'contact-information': {
    title: 'Contactos Oficiais & Canais de Apoio',
    category: 'Legal & Compliance',
    summary: 'Canais formais para contactar o Departamento Jurídico, o Encarregado de Proteção de Dados (DPO) e a equipa de Conformidade.',
    highlightBoxTitle: 'Atendimento para Contratos Corporativos (Enterprise)',
    highlightBoxText: 'Os clientes institucionais titulares de acordos empresariais (MSA) contam com um gestor de conta dedicado.',
    paragraphs: [
      'Para dúvidas, notificações formais ou questões relacionadas com estes Termos e Condições, contacte os canais oficiais da NextSoftHR:',
      'NextSoftHR Ltd. · Assessoria Jurídica e Conformidade Global · Website oficial: www.nextsofthr.org · Correio eletrónico: legal@nextsofthr.org · Encarregado de Proteção de Dados: dpo@nextsofthr.org · Segurança e Incidentes: security@nextsofthr.org.'
    ]
  }
};
