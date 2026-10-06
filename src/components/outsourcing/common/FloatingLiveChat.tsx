import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Check, 
  Phone, 
  Mail, 
  Clock, 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  ArrowRight,
  ShieldCheck,
  Building,
  UserCheck,
  Headphones,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  FileText,
  MapPin
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useLanguage } from '../../context/LanguageContext';

interface Message {
  id: string;
  sender: 'advisor' | 'user' | 'system';
  advisorName?: string;
  advisorRole?: string;
  avatar?: string;
  text: string;
  timestamp: string;
  action?: {
    type: 'open_lead_modal' | 'open_wizard' | 'open_portal';
    label: string;
    payload?: string;
  };
}

interface SupportAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  location: string;
  status: 'online' | 'busy';
  languages: string[];
}

interface FloatingLiveChatProps {
  onOpenLeadModal: (service?: string) => void;
  onOpenWizard?: () => void;
  onOpenPortals?: (portal?: string) => void;
}

export const FloatingLiveChat: React.FC<FloatingLiveChatProps> = ({
  onOpenLeadModal,
  onOpenWizard,
  onOpenPortals
}) => {
  const { formatCurrency, currency } = useCurrency();
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'contact' | 'ticket'>('chat');
  const [unreadCount, setUnreadCount] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Ticket / Help Form state
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: 'Payroll & Remittances',
    message: ''
  });
  const [ticketSubmitted, setTicketSubmitted] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const supportAgents: SupportAgent[] = [
    {
      id: 'agent-1',
      name: 'Zainab Al-Hassan',
      role: 'Senior People Operations & Compliance Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      location: 'Lagos & Accra Operations Hub',
      status: 'online',
      languages: ['English', 'French']
    },
    {
      id: 'agent-2',
      name: 'Oluwaseun Adeleke',
      role: 'Managing Director & Payroll Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      location: 'Lagos Headquarters',
      status: 'online',
      languages: ['English', 'Yoruba']
    },
    {
      id: 'agent-3',
      name: 'Tariq Mensah',
      role: 'Technical Integration & ESS Support Agent',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      location: 'Nairobi Regional Desk',
      status: 'online',
      languages: ['English', 'Swahili']
    }
  ];

  const primaryAgent = supportAgents[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome-1',
      sender: 'advisor',
      advisorName: primaryAgent.name,
      advisorRole: primaryAgent.role,
      avatar: primaryAgent.avatar,
      text: t('chat.welcome_message', "Hello! I'm Zainab from NextSofthr Support & Outsourcing. Are you looking to streamline your payroll processing, outsource employee administration, or speak with an agent about our multi-country African operations?"),
      timestamp: 'Just now'
    }
  ]);

  // Sync initial welcome message when language changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id.startsWith('msg-welcome')) {
        return [{
          id: 'msg-welcome-1',
          sender: 'advisor',
          advisorName: primaryAgent.name,
          advisorRole: primaryAgent.role,
          avatar: primaryAgent.avatar,
          text: t('chat.welcome_message', "Hello! I'm Zainab from NextSofthr Support & Outsourcing. Are you looking to streamline your payroll processing, outsource employee administration, or speak with an agent about our multi-country African operations?"),
          timestamp: 'Just now'
        }];
      }
      return prev;
    });
  }, [language.code]);

  const quickPrompts = [
    { label: t('chat.prompt_quote', '💰 Request Payroll Outsourcing Quote'), query: language.code === 'fr' ? 'Quels sont les tarifs pour l\'externalisation de la paie ?' : language.code === 'pt' ? 'Quais são os valores para terceirização da folha de pagamento?' : language.code === 'es' ? '¿Cuáles son los precios de externalización de nóminas?' : 'What is the pricing for payroll outsourcing?' },
    { label: t('chat.prompt_countries', '🌍 Multi-Country African Coverage'), query: language.code === 'fr' ? 'Quels pays africains couvrez-vous pour la paie et les RH ?' : language.code === 'pt' ? 'Quais países africanos vocês atendem para folha e RH?' : language.code === 'es' ? '¿Qué países africanos cubren para nómina y RRHH?' : 'Which African countries do you support for payroll and HR?' },
    { label: t('chat.prompt_compliance', '🛡️ Statutory Tax & Pension Compliance'), query: language.code === 'fr' ? 'Comment assurez-vous la conformité fiscale et sociale ?' : language.code === 'pt' ? 'Como vocês gerenciam os recolhimentos fiscais e previdenciários?' : language.code === 'es' ? '¿Cómo gestionan el cumplimiento fiscal y de pensiones?' : 'How do you handle statutory remittances and tax compliance?' },
    { label: t('chat.prompt_demo', '🚀 Book a 15-Min Live Walkthrough'), query: language.code === 'fr' ? 'Je souhaite réserver une démonstration en direct de 15 minutes.' : language.code === 'pt' ? 'Gostaria de agendar uma demonstração ao vivo de 15 minutos.' : language.code === 'es' ? 'Deseo reservar una demostración en vivo de 15 minutos.' : 'I would like to book a 15-minute system demonstration.' },
    { label: t('chat.prompt_portals', '👥 Employee & Manager Portals'), query: language.code === 'fr' ? 'Puis-je voir les portails salariés et managers ?' : language.code === 'pt' ? 'Posso visualizar os portais de autoatendimento para colaboradores?' : language.code === 'es' ? '¿Puedo ver los portales de autoservicio de empleados?' : 'Can I see the self-service employee portal?' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      scrollToBottom();
      setUnreadCount(0);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isOpen, messages, isTyping, activeTab]);

  const playNotificationSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // Safe ignore
    }
  };

  const generateSmartReply = (userQuery: string): { text: string; action?: Message['action'] } => {
    const q = userQuery.toLowerCase();
    const lang = language.code;

    // Pricing & Quotes
    if (q.includes('price') || q.includes('cost') || q.includes('pricing') || q.includes('quote') || q.includes('rate') || q.includes('fee') || q.includes('tarif') || q.includes('devis') || q.includes('prix') || q.includes('preço') || q.includes('orçamento') || q.includes('valor') || q.includes('precio') || q.includes('presupuesto')) {
      const startingPrice = formatCurrency(250000);
      const managedPrice = formatCurrency(650000);

      if (lang === 'fr') {
        return {
          text: `Nos forfaits de sous-traitance s'adaptent à vos effectifs :\n\n• Externalisation de la Paie dédiée : dès ~${startingPrice}/mois (inclus déclarations fiscales, cotisations sociales, virements bancaires et bulletins sur portail).\n• Gestion RH Intégrale : dès ~${managedPrice}/mois avec HRBP dédié, gestion des contrats et conformité légale.\n\nTarifs transparents en ${currency.code}, sans coûts d'implémentation cachés. Souhaitez-vous une proposition personnalisée ?`,
          action: {
            type: 'open_lead_modal',
            label: 'Obtenir une Proposition Tarifaire',
            payload: 'Demande de devis sous-traitance paie'
          }
        };
      }

      if (lang === 'pt') {
        return {
          text: `Nossos planos de terceirização são modulares e escalam com sua equipe:\n\n• Terceirização de Folha de Pagamento: a partir de ~${startingPrice}/mês (cálculo líquido/bruto, IRT/INSS, guias de recolhimento e contracheques digitais).\n• Gestão de RH Integral: a partir de ~${managedPrice}/mês com consultor HRBP dedicado e assessoria jurídica trabalhista.\n\nValores transparentes em ${currency.code}, sem taxas ocultas. Deseja receber uma proposta personalizada?`,
          action: {
            type: 'open_lead_modal',
            label: 'Obter Proposta de Preço Exata',
            payload: 'Cotação de Terceirização da Folha'
          }
        };
      }

      if (lang === 'es') {
        return {
          text: `Nuestros planes de externalización se adaptan al tamaño de su plantilla:\n\n• Externalización de Nóminas dedicada: desde ~${startingPrice}/mes (cálculo íntegro bruto a neto, liquidación fiscal, dispersión salarial y nóminas digitales).\n• Gestión de RRHH Integral: desde ~${managedPrice}/mes con consultor HRBP asignado y auditoría laboral permanente.\n\nPrecios transparentes en ${currency.code} sin cargos de alta ocultos. ¿Desea una propuesta detallada para su empresa?`,
          action: {
            type: 'open_lead_modal',
            label: 'Obtener Presupuesto Detallado',
            payload: 'Presupuesto de Externalización de Nómina'
          }
        };
      }

      return {
        text: `Our outsourcing plans are modular and scale with your headcount:\n\n• Dedicated Payroll Outsourcing: starts at ~${startingPrice}/month (includes tax, pension, bank disbursement advice, and self-service payslips).\n• Comprehensive Managed HR: starts at ~${managedPrice}/month with a dedicated HRBP, employment contracts, and disciplinary oversight.\n\nAll pricing is transparent with zero hidden setup fees in ${currency.code}. Would you like an instant customized proposal?`,
        action: {
          type: 'open_lead_modal',
          label: 'Get Exact Pricing Proposal',
          payload: 'Outsourcing Pricing Inquiry'
        }
      };
    }

    // Pan-African Coverage & Countries
    if (q.includes('countr') || q.includes('africa') || q.includes('nigeria') || q.includes('kenya') || q.includes('ghana') || q.includes('pays') || q.includes('afrique') || q.includes('senegal') || q.includes('cameroun') || q.includes('país') || q.includes('angola') || q.includes('moçambique') || q.includes('guinea')) {
      if (lang === 'fr') {
        return {
          text: `NextSofthr gère activement la paie et la conformité légale dans :\n\n🌍 Afrique de l'Ouest : Sénégal, Côte d'Ivoire, Cameroun, Bénin, Nigéria, Ghana\n🌍 Afrique de l'Est : Kenya, Rwanda, Ouganda, Tanzanie\n🌍 Afrique Australe : Afrique du Sud, Zambie, Zimbabwe\n🌍 Afrique du Nord : Égypte, Maroc\n\nNous calculons les rémunérations en ${currency.code} ou en monnaies locales (FCFA, NGN, KES...) dans le respect total des conventions collectives nationales.`,
          action: {
            type: 'open_lead_modal',
            label: 'Consulter pour une Expansion Panafricaine',
            payload: 'Expansion Panafricaine'
          }
        };
      }

      if (lang === 'pt') {
        return {
          text: `A NextSofthr opera serviços de folha de pagamento e compliance regulatório em:\n\n🌍 África Lusófona : Angola, Moçambique, Cabo Verde\n🌍 África Ocidental : Nigéria, Gana, Costa do Marfim, Senegal\n🌍 África Oriental : Quênia, Ruanda, Uganda\n🌍 África Austral : África do Sul, Zâmbia\n\nProcessamos pagamentos em ${currency.code} ou em moeda local com total garantia de cumprimento da legislação trabalhista.`,
          action: {
            type: 'open_lead_modal',
            label: 'Consultar sobre Expansão Pan-Africana',
            payload: 'Operações em Múltiplos Países Africanos'
          }
        };
      }

      if (lang === 'es') {
        return {
          text: `NextSofthr opera con entidades registradas y cumplimiento normativo en:\n\n🌍 África Occidental y Central : Guinea Ecuatorial, Senegal, Costa de Marfil, Camerún, Nigeria, Ghana\n🌍 África Oriental : Kenia, Ruanda, Uganda\n🌍 África Austral : Sudáfrica, Zambia\n🌍 Norte de África : Egipto, Marruecos\n\nCalculamos remuneraciones en ${currency.code} o moneda de curso legal garantizando apego estricto a las leyes laborales locales.`,
          action: {
            type: 'open_lead_modal',
            label: 'Consultar Expansión Panafricana',
            payload: 'Operaciones Multipaís África'
          }
        };
      }

      return {
        text: `NextSofthr operates active in-country payroll and statutory compliance entities across:\n\n🌍 West Africa: Nigeria, Ghana, Côte d'Ivoire, Cameroon, Senegal\n🌍 East Africa: Kenya, Rwanda, Uganda, Tanzania\n🌍 Southern Africa: South Africa, Zambia, Zimbabwe\n🌍 North Africa & Middle East: Egypt, Morocco, UAE\n\nWe calculate multi-currency salaries in ${currency.code} or local domestic tender, while guaranteeing 100% adherence to national labor laws.`,
        action: {
          type: 'open_lead_modal',
          label: 'Inquire About Pan-African Expansion',
          payload: 'Pan-African Multi-Country Operations'
        }
      };
    }

    // Statutory Compliance & Tax
    if (q.includes('compliance') || q.includes('tax') || q.includes('pension') || q.includes('paye') || q.includes('audit') || q.includes('fiscal') || q.includes('social') || q.includes('impôt') || q.includes('imposto') || q.includes('tribut')) {
      if (lang === 'fr') {
        return {
          text: `Nous assumons la responsabilité juridique de l'ensemble de vos déclarations :\n\n• Retenues fiscales (IRPP/VRS) et états de fin d'année\n• Cotisations aux régimes de retraite et prévoyance (IPRES, CNPS, CSS, NSSF)\n• Assurances maladie obligatoires et fonds de formation professionnelle\n• Adossé à notre garantie contractuelle 100% zéro pénalité fiscale.`,
          action: {
            type: 'open_lead_modal',
            label: 'Demander un Audit de Conformité Gratuit',
            payload: 'Audit de Conformité Fiscale et Sociale'
          }
        };
      }

      if (lang === 'pt') {
        return {
          text: `Assumimos a responsabilidade operacional por todas as obrigações fiscais e trabalhistas:\n\n• Guias mensais de Imposto sobre o Rendimento do Trabalho (IRT / PAYE)\n• Contribuições previdenciárias obrigatórias (INSS / Previdência Social)\n• Seguros contra acidentes de trabalho e fundos habitacionais\n• Respaldado pela nossa garantia de 100% livre de multas regulatórias.`,
          action: {
            type: 'open_lead_modal',
            label: 'Solicitar Auditoria Gratuita de Conformidade',
            payload: 'Auditoria de Conformidade Tributária'
          }
        };
      }

      if (lang === 'es') {
        return {
          text: `Asumimos la gestión integral y oportuna de todas las obligaciones patronales:\n\n• Retenciones tributarias periódicas y declaraciones anuales de IRPF\n• Aportaciones obligatorias a fondos de pensiones y Seguridad Social\n• Seguros de accidentes de trabajo y fondos de formación profesional\n• Con garantía contractual del 100% contra recargos o sanciones fiscales.`,
          action: {
            type: 'open_lead_modal',
            label: 'Solicitar Auditoría de Cumplimiento Gratuita',
            payload: 'Auditoría Fiscal y Laboral'
          }
        };
      }

      return {
        text: `We assume operational responsibility for all statutory filings:\n\n• PAYE Income Tax schedules & annual employer returns (Form H1 / P9 / IRP5)\n• Pension contribution remittances (PenCom 8% employee + 10% employer, NSSF, Tier 1/2)\n• National housing & social insurance funds (NHF, NSITF, NHIF, UIF)\n• Backed by a 100% zero-statutory-penalty SLA guarantee.`,
        action: {
          type: 'open_lead_modal',
          label: 'Request Free Compliance Audit',
          payload: 'Compliance & Statutory Audit'
        }
      };
    }

    // Demos & Portals
    if (q.includes('demo') || q.includes('walkthrough') || q.includes('portal') || q.includes('portail') || q.includes('demonstra') || q.includes('fiches') || q.includes('holerite') || q.includes('nómina')) {
      if (lang === 'fr') {
        return {
          text: `NextSofthr met à votre disposition des portails en direct adaptés à vos équipes :\n\n• Espace Salarié (ESS) : bulletins de paie certifiés, demandes d'absences, pointages.\n• Espace Manager (MSS) : circuits de validation et suivi des effectifs.\n• Direction Client : tableaux de bord salariaux et approbations en un clic.\n\nVous pouvez tester ces portails en temps réel directement sur notre application !`,
          action: {
            type: 'open_portal',
            label: 'Lancer les Portails en Direct'
          }
        };
      }

      if (lang === 'pt') {
        return {
          text: `A NextSofthr disponibiliza portais em nuvem para toda a sua estrutura corporativa:\n\n• Autoatendimento do Colaborador (ESS): acesso a recibos de vencimento, férias e ponto.\n• Portal do Gestor (MSS): aprovação ágil de horas e ausências.\n• Painel Executivo do Cliente: autorização de lotes de pagamento e relatórios analíticos.\n\nVocê pode testar todos os 4 ambientes de portais agora mesmo!`,
          action: {
            type: 'open_portal',
            label: 'Acessar Portais ao Vivo'
          }
        };
      }

      if (lang === 'es') {
        return {
          text: `NextSofthr incluye portales interactivos en la nube para toda su organización:\n\n• Autoservicio del Empleado (ESS): descarga de recibos salariales, solicitud de permisos y fichajes.\n• Portal del Responsable (MSS): aprobación ágil de turnos y vacaciones.\n• Panel Directivo del Cliente: control centralizado de nóminas y auditoría.\n\n¡Puede probar los 4 entornos interactivos ahora mismo!`,
          action: {
            type: 'open_portal',
            label: 'Abrir Portales en Directo'
          }
        };
      }

      return {
        text: `NextSofthr includes interactive portals for your entire workforce:\n\n• Employee Self-Service (ESS): Download digital payslips, apply for leave, verify biometric attendance.\n• Manager Self-Service (MSS): One-click sign-offs on leaves, overtime, and appraisals.\n• Client Admin: Executive gross-to-net authorization and audit trails.\n\nYou can test all 4 live portal environments right now on this app!`,
        action: {
          type: 'open_portal',
          label: 'Launch Live Portals Environment'
        }
      };
    }

    // Default intelligent advisory response
    if (lang === 'fr') {
      return {
        text: `Merci pour votre demande. En tant que partenaire de confiance pour la paie et les RH en Afrique, NextSofthr combine consultants de terrain et automatisation pour supprimer vos contraintes administratives.\n\nSouhaitez-vous planifier un échange de 15 minutes avec l'un de nos Directeurs Associés ou générer une simulation de devis adaptée à votre entreprise ?`,
        action: {
          type: 'open_lead_modal',
          label: 'Parler à un Directeur Associé',
          payload: 'Contact Chat en Direct'
        }
      };
    }

    if (lang === 'pt') {
      return {
        text: `Obrigada pelo seu contato. Como parceira de terceirização de RH e folha na África, a NextSofthr combina especialistas locais com tecnologia de ponta para simplificar suas rotinas corporativas.\n\nGostaria de agendar uma conversa de 15 minutos com nossa Diretoria ou solicitar um orçamento customizado para sua organização?`,
        action: {
          type: 'open_lead_modal',
          label: 'Falar com Diretor Especialista',
          payload: 'Contato via Chat ao Vivo'
        }
      };
    }

    if (lang === 'es') {
      return {
        text: `Gracias por su consulta. Como aliado en la externalización laboral en África, NextSofthr une experiencia legal y tecnología cloud para eliminar fricciones operativas.\n\n¿Desea una sesión consultiva de 15 minutos con nuestros Socios Directores o recibir una propuesta ajustada a su empresa?`,
        action: {
          type: 'open_lead_modal',
          label: 'Contactar con Socio Director',
          payload: 'Contacto Chat en Vivo'
        }
      };
    }

    return {
      text: `Thank you for contacting NextSofthr. Our support agents and senior HR consultants are here to help you optimize payroll, automate pension remittances, or set up multi-country operations.\n\nWould you like me to connect you with our Managing Director Oluwaseun Adeleke for a 15-minute consultation, or generate a tailored quotation for your organization?`,
      action: {
        type: 'open_lead_modal',
        label: 'Connect with Senior Consultant',
        payload: 'Live Chat Escalation'
      }
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const messageContent = (textToSend || inputMessage).trim();
    if (!messageContent) return;

    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: messageContent,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateSmartReply(messageContent);
      const advisorMsg: Message = {
        id: `msg-adv-${Date.now()}`,
        sender: 'advisor',
        advisorName: primaryAgent.name,
        advisorRole: primaryAgent.role,
        avatar: primaryAgent.avatar,
        text: reply.text,
        timestamp: 'Just now',
        action: reply.action
      };

      setIsTyping(false);
      setMessages(prev => [...prev, advisorMsg]);
      playNotificationSound();

      if (!isOpen) {
        setUnreadCount(c => c + 1);
      }
    }, 1100);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `NS-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketSubmitted(ticketId);

    const confirmationMsg: Message = {
      id: `msg-system-${Date.now()}`,
      sender: 'system',
      text: `✓ Support ticket created successfully: #${ticketId}! Assigned to ${primaryAgent.name}. We will contact ${ticketForm.email || ticketForm.phone} within 15 minutes.`,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, confirmationMsg]);
    playNotificationSound();
  };

  const handleActionClick = (action: Message['action']) => {
    if (!action) return;
    if (action.type === 'open_lead_modal') {
      onOpenLeadModal(action.payload || 'Live Chat Lead');
    } else if (action.type === 'open_wizard' && onOpenWizard) {
      onOpenWizard();
    } else if (action.type === 'open_portal' && onOpenPortals) {
      onOpenPortals('employee-ess');
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: 'advisor',
        advisorName: primaryAgent.name,
        advisorRole: primaryAgent.role,
        avatar: primaryAgent.avatar,
        text: `Chat session reset. Hello! How can our support agents assist your workforce today?`,
        timestamp: 'Just now'
      }
    ]);
  };

  // Live Chat button label translated
  const liveChatButtonLabel = language.code === 'fr' 
    ? 'Chat en direct' 
    : language.code === 'pt' 
    ? 'Chat ao vivo' 
    : language.code === 'es' 
    ? 'Chat en vivo' 
    : 'Live Chat';

  return (
    <>
      {/* Floating 'Live Chat' Icon at Bottom-Right */}
      {!isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
          {/* Teaser pill (desktop only) */}
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden md:flex items-center gap-2.5 px-3.5 py-2 bg-white dark:bg-[#0A1938] text-slate-800 dark:text-slate-100 rounded-2xl shadow-xl border border-slate-200 dark:border-blue-900/60 cursor-pointer hover:border-lime-400 dark:hover:border-lime-400 transition-all group"
          >
            <div className="flex -space-x-2 overflow-hidden">
              <img 
                src={supportAgents[0].avatar} 
                alt={supportAgents[0].name} 
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#0A1938] object-cover" 
              />
              <img 
                src={supportAgents[1].avatar} 
                alt={supportAgents[1].name} 
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#0A1938] object-cover" 
              />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Support Agents Online</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Typical response &lt; 2m</p>
            </div>
          </div>

          {/* Prominent Floating 'Live Chat' Action Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative px-4 py-3 bg-gradient-to-r from-[#07173D] via-[#0F2D6B] to-[#0A1E4A] hover:from-[#091F4D] hover:to-[#0F2D6B] text-white rounded-full shadow-2xl hover:shadow-lime-500/25 border-2 border-lime-400 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 group"
            aria-label="Open Live Chat to contact support agents"
            title="Open Live Chat to contact support agents"
          >
            {/* Live Indicator Dot */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-400"></span>
            </span>

            {/* Chat Icon */}
            <MessageSquare className="w-5 h-5 text-lime-400 group-hover:rotate-6 transition-transform shrink-0" />

            {/* Clear 'Live Chat' Text */}
            <span className="font-bold text-xs sm:text-sm tracking-wide text-white group-hover:text-lime-300 transition-colors">
              {liveChatButtonLabel}
            </span>

            {/* Unread indicator */}
            {unreadCount > 0 && (
              <span className="bg-lime-400 text-slate-950 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Help Dialog to Contact Support Agents */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized 
              ? 'bottom-20 right-4 sm:bottom-6 sm:right-6 w-80' 
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[440px] max-w-[460px] h-[620px] max-h-[88vh]'
          } bg-white dark:bg-[#071330] rounded-2xl shadow-2xl border border-slate-200 dark:border-blue-900/60 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6`}
          role="dialog"
          aria-labelledby="live-chat-dialog-title"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#07173D] via-[#0F2D6B] to-[#0A1E4A] text-white p-4 flex items-center justify-between border-b border-blue-900/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex -space-x-2">
                  <img 
                    src={supportAgents[0].avatar} 
                    alt={supportAgents[0].name} 
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-lime-400"
                  />
                  <img 
                    src={supportAgents[1].avatar} 
                    alt={supportAgents[1].name} 
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[#0A1E4A]"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#0A1E4A]"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 id="live-chat-dialog-title" className="text-sm font-bold text-white">
                    {t('nav.talk_expert', 'Live Support & Help Desk')}
                  </h3>
                  <span title="Verified Enterprise Support">
                    <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse"></span>
                  <span>3 Support Agents Online · Reply &lt; 2m</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title={soundEnabled ? 'Mute notification sound' : 'Enable notification sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-lime-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>

              {/* Minimize / Expand */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title={isMinimized ? 'Expand dialog' : 'Minimize dialog'}
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Close support dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Tab Navigation: Chat / Contact Agents / Submit Ticket */}
              <div className="px-3 pt-2 bg-slate-50 dark:bg-[#050E24] border-b border-slate-200 dark:border-blue-900/40 flex items-center justify-between text-xs">
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`px-3 py-1.5 font-bold rounded-t-lg transition-all flex items-center gap-1.5 ${
                      activeTab === 'chat'
                        ? 'bg-white dark:bg-[#071330] text-[#0F2D6B] dark:text-lime-300 border-t-2 border-lime-400 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Live Chat</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`px-3 py-1.5 font-bold rounded-t-lg transition-all flex items-center gap-1.5 ${
                      activeTab === 'contact'
                        ? 'bg-white dark:bg-[#071330] text-[#0F2D6B] dark:text-lime-300 border-t-2 border-lime-400 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    <span>Contact Agents</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('ticket')}
                    className={`px-3 py-1.5 font-bold rounded-t-lg transition-all flex items-center gap-1.5 ${
                      activeTab === 'ticket'
                        ? 'bg-white dark:bg-[#071330] text-[#0F2D6B] dark:text-lime-300 border-t-2 border-lime-400 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Help Ticket</span>
                  </button>
                </div>

                <div className="text-[10px] text-emerald-600 dark:text-lime-400 font-semibold flex items-center gap-1 pr-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Active</span>
                </div>
              </div>

              {/* TAB 1: LIVE CHAT */}
              {activeTab === 'chat' && (
                <>
                  {/* Messages Stream */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60 dark:bg-[#050E24]/60">
                    <div className="text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 bg-white dark:bg-[#071330] px-2.5 py-1 rounded-full border border-slate-200 dark:border-blue-900/30">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        <span>ISO-27001 & NDPR Compliant Support Session</span>
                      </span>
                    </div>

                    {messages.map(msg => (
                      <div 
                        key={msg.id}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
                      >
                        {msg.sender === 'advisor' && (
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium pl-1">
                            <span className="font-bold text-slate-700 dark:text-slate-300">{msg.advisorName}</span>
                            <span>·</span>
                            <span>{msg.advisorRole}</span>
                          </div>
                        )}

                        <div 
                          className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-[#0F2D6B] dark:bg-blue-600 text-white rounded-br-xs shadow-sm font-medium'
                              : msg.sender === 'system'
                              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 rounded-xl'
                              : 'bg-white dark:bg-[#0B1A3D] text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200 dark:border-blue-900/50 shadow-sm'
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.text}</p>

                          {msg.action && (
                            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-blue-900/40">
                              <button
                                type="button"
                                onClick={() => handleActionClick(msg.action)}
                                className="w-full py-1.5 px-3 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-[11px] rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5"
                              >
                                <span>{msg.action.label}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>

                        {msg.sender === 'user' && (
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono pr-1">
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span>Delivered to agent</span>
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex items-center gap-2 pl-1 animate-in fade-in">
                        <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 ring-1 ring-lime-400">
                          <img src={primaryAgent.avatar} alt="Agent typing" className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-white dark:bg-[#0B1A3D] p-2.5 px-3 rounded-2xl rounded-bl-xs border border-slate-200 dark:border-blue-900/40 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-lime-400 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-lime-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                          <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-lime-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                        <span className="text-[10px] text-slate-400 italic">{primaryAgent.name} is typing...</span>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Prompts Carousel */}
                  <div className="px-3 py-2 bg-white dark:bg-[#071330] border-t border-slate-100 dark:border-blue-900/40 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
                    {quickPrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(p.query)}
                        className="inline-block px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#0B1A3D] hover:bg-lime-100 dark:hover:bg-lime-950/60 hover:text-slate-900 dark:hover:text-lime-300 text-slate-700 dark:text-slate-300 text-[10px] font-semibold transition-colors border border-slate-200 dark:border-blue-900/50"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Message Input Bar */}
                  <div className="p-3 bg-white dark:bg-[#071330] border-t border-slate-200 dark:border-blue-900/60">
                    <form 
                      onSubmit={e => { e.preventDefault(); handleSendMessage(); }}
                      className="flex items-center gap-2"
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={e => setInputMessage(e.target.value)}
                        placeholder="Type your message to support agents..."
                        className="flex-1 px-3.5 py-2.5 bg-slate-100 dark:bg-[#050E24] text-slate-900 dark:text-white rounded-xl text-xs border border-transparent focus:border-blue-500 dark:focus:border-lime-400 focus:bg-white dark:focus:bg-[#050E24] focus:outline-none transition-all"
                      />
                      <button
                        type="submit"
                        disabled={!inputMessage.trim() || isTyping}
                        className="p-2.5 bg-[#0F2D6B] dark:bg-lime-400 hover:bg-[#0A1E4A] dark:hover:bg-lime-300 text-white dark:text-slate-950 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs shrink-0"
                        aria-label="Send message to support agent"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                    <div className="flex items-center justify-between pt-2 px-1 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>NextSofthr Live Help Concierge</span>
                      </span>
                      <button
                        onClick={handleResetChat}
                        className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      >
                        Reset Chat
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: CONTACT SUPPORT AGENTS (DIRECT CHANNELS) */}
              {activeTab === 'contact' && (
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60 dark:bg-[#050E24]/60 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      Meet Our Dedicated Support Agents
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Available across West Africa, East Africa, and European hubs.
                    </p>
                  </div>

                  {/* Agents Directory Cards */}
                  <div className="space-y-2.5">
                    {supportAgents.map(agent => (
                      <div 
                        key={agent.id}
                        className="p-3 bg-white dark:bg-[#0B1A3D] rounded-xl border border-slate-200 dark:border-blue-900/50 flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img 
                              src={agent.avatar} 
                              alt={agent.name} 
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-lime-400" 
                            />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white"></span>
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>{agent.name}</span>
                              <span className="text-[10px] text-emerald-600 dark:text-lime-400 font-mono bg-emerald-50 dark:bg-emerald-950/60 px-1 py-0.2 rounded">
                                Online
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">{agent.role}</p>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{agent.location}</span>
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setActiveTab('chat');
                            handleSendMessage(`Hello ${agent.name}, I would like to speak directly with you about our workforce.`);
                          }}
                          className="px-2.5 py-1.5 bg-blue-50 dark:bg-blue-900/40 hover:bg-lime-400 hover:text-slate-950 text-[#0F2D6B] dark:text-lime-300 font-bold text-[11px] rounded-lg transition-all shrink-0"
                        >
                          Chat Now
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Direct Contact Lines */}
                  <div className="p-3.5 bg-white dark:bg-[#0B1A3D] rounded-xl border border-slate-200 dark:border-blue-900/50 space-y-3">
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block">
                      Direct Regional Helplines & Desks
                    </span>

                    <div className="space-y-2">
                      <a 
                        href="tel:+23418884767" 
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#071330] hover:bg-slate-100 dark:hover:bg-blue-950/60 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-lime-400" />
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white block text-[11px]">Nigeria & West Africa Desk</span>
                            <span className="text-[10px] text-slate-400 font-mono">+234 (0) 1 888 4767</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-lime-600 dark:text-lime-400">Call Direct</span>
                      </a>

                      <a 
                        href="tel:+254207903800" 
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#071330] hover:bg-slate-100 dark:hover:bg-blue-950/60 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-lime-400" />
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white block text-[11px]">Kenya & East Africa Desk</span>
                            <span className="text-[10px] text-slate-400 font-mono">+254 20 790 3800</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-lime-600 dark:text-lime-400">Call Direct</span>
                      </a>

                      <a 
                        href="mailto:support@nextsofthr.org" 
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#071330] hover:bg-slate-100 dark:hover:bg-blue-950/60 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-lime-400" />
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white block text-[11px]">Priority Support Email</span>
                            <span className="text-[10px] text-slate-400 font-mono">support@nextsofthr.org</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-lime-400">Send Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: HELP TICKET & IMMEDIATE CALLBACK */}
              {activeTab === 'ticket' && (
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60 dark:bg-[#050E24]/60 text-xs">
                  {ticketSubmitted ? (
                    <div className="p-6 bg-white dark:bg-[#0B1A3D] rounded-2xl border border-emerald-200 dark:border-emerald-800/40 text-center space-y-3 animate-in zoom-in-95">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-lime-400 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        Support Ticket Created!
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Reference Number: <span className="font-mono font-bold text-[#0F2D6B] dark:text-lime-400">{ticketSubmitted}</span>
                      </p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        Support agent Zainab Al-Hassan has received your inquiry. We will contact you at <strong>{ticketForm.email || ticketForm.phone}</strong> within 15 minutes.
                      </p>
                      <button
                        onClick={() => { setTicketSubmitted(null); setActiveTab('chat'); }}
                        className="px-4 py-2 bg-lime-400 text-slate-950 font-bold rounded-xl text-xs shadow-sm hover:bg-lime-300 transition-colors"
                      >
                        Return to Live Chat
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleTicketSubmit} className="space-y-3">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          Open an Urgent Support Ticket
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Route your query directly to an authorized payroll & compliance specialist.
                        </p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={ticketForm.name}
                          onChange={e => setTicketForm({ ...ticketForm, name: e.target.value })}
                          placeholder="e.g. Oluwatosin Adeyemi"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#050E24] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-lime-400 text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Work Email *</label>
                          <input
                            type="email"
                            required
                            value={ticketForm.email}
                            onChange={e => setTicketForm({ ...ticketForm, email: e.target.value })}
                            placeholder="name@company.com"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#050E24] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-lime-400 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Phone / WhatsApp *</label>
                          <input
                            type="tel"
                            required
                            value={ticketForm.phone}
                            onChange={e => setTicketForm({ ...ticketForm, phone: e.target.value })}
                            placeholder="+234..."
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#050E24] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-lime-400 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Inquiry Category</label>
                        <select
                          value={ticketForm.category}
                          onChange={e => setTicketForm({ ...ticketForm, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#050E24] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-lime-400 text-xs"
                        >
                          <option value="Payroll & Remittances">Payroll Calculations & Remittances</option>
                          <option value="Multi-Country Expansion">Pan-African Multi-Country Expansion</option>
                          <option value="Statutory Tax & Pension Audit">Statutory Tax & Pension Audit</option>
                          <option value="ESS / MSS Portal Access">Employee Portal (ESS/MSS) Access</option>
                          <option value="Custom Quotation">Custom Outsourcing Quotation</option>
                          <option value="General Support">General Support</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Describe Your Request</label>
                        <textarea
                          rows={3}
                          value={ticketForm.message}
                          onChange={e => setTicketForm({ ...ticketForm, message: e.target.value })}
                          placeholder="Please provide details about your headcount, countries of interest, or question..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#050E24] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-lime-400 text-xs"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Submit Ticket to Support Agents</span>
                      </button>
                    </form>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
