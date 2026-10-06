import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Headphones,
  ShieldCheck,
  Clock,
  Sparkles,
  ChevronRight,
  PhoneCall,
  CheckCircle2,
  FileText,
  RotateCcw,
  Minus,
  HelpCircle,
  ExternalLink,
  UserCheck,
  Building,
  Mail,
  Phone
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface Message {
  id: string;
  sender: 'agent' | 'user' | 'system';
  agentName?: string;
  agentRole?: string;
  text: string;
  timestamp: string;
  action?: {
    label: string;
    sectionId?: string;
    callbackAction?: string;
  };
}

interface LiveChatWidgetProps {
  onSelectSection?: (id: string) => void;
  onOpenPrivacy?: () => void;
  onOpenContact?: () => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  onSelectSection,
  onOpenPrivacy,
  onOpenContact
}) => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'faq' | 'callback'>('chat');
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Callback form state
  const [callbackName, setCallbackName] = useState('');
  const [callbackEmail, setCallbackEmail] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackDepartment, setCallbackDepartment] = useState('legal');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message configured per language
  const getInitialMessages = (): Message[] => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return [
      {
        id: 'msg-welcome-1',
        sender: 'agent',
        agentName: t.liveChatAgentName,
        agentRole: t.liveChatAgentRole,
        text: t.liveChatWelcomeMsg,
        timestamp: timeStr
      },
      {
        id: 'msg-welcome-2',
        sender: 'system',
        text: t.liveChatWelcomeSecondary,
        timestamp: timeStr
      }
    ];
  };

  const [messages, setMessages] = useState<Message[]>(getInitialMessages);

  // When language changes, refresh default welcome message if only initial messages exist
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 2) {
        return getInitialMessages();
      }
      return prev;
    });
  }, [language, t]);

  // Scroll to bottom when messages update or when widget opens
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages, activeTab, isTyping]);

  // Handle open toggle
  const toggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setUnreadCount(0);
      }
      return next;
    });
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Generate automated agent response based on user input
  const processAgentReply = (userQuery: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const q = userQuery.toLowerCase();
      let replyText = '';
      let replyAction: Message['action'] | undefined = undefined;

      if (q.includes('payroll') || q.includes('paie') || q.includes('salário') || q.includes('nómina') || q.includes('tax')) {
        replyText = language === 'fr'
          ? "Notre module de paie NextSoftHR applique les barèmes fiscaux et retenues légales selon les juridictions locales. En vertu de la Section 9.0 des Conditions, l'employeur demeure responsable de la validation des pointages et déclarations finales."
          : language === 'pt'
          ? "O módulo de folha salarial da NextSoftHR cumpre rigorosamente os quadros tributários e retenções aplicáveis. Conforme estipulado na Secção 9.0, o cliente é responsável pela validação dos dados de remuneração."
          : language === 'es'
          ? "El módulo de nómina de NextSoftHR aplica las tablas impositivas y retenciones de ley locales. Conforme a la Sección 9.0, la empresa mantiene la responsabilidad de validar los cómputos finales."
          : "NextSoftHR's Payroll processing module strictly complies with local statutory tax withholding tables and wage rules. Under Section 9.0 of our Terms, the Customer maintains ultimate responsibility for approving approved hours and final tax submissions.";
        replyAction = {
          label: language === 'fr' ? 'Consulter la Section 9.0 (Paie)' : language === 'pt' ? 'Ver Secção 9.0 (Salários)' : language === 'es' ? 'Ver Sección 9.0 (Nómina)' : 'View Section 9.0 (Payroll)',
          sectionId: 'payroll-services'
        };
      } else if (q.includes('privacy') || q.includes('data') || q.includes('données') || q.includes('dados') || q.includes('gdpr') || q.includes('rgpd') || q.includes('lgpd') || q.includes('dpa')) {
        replyText = language === 'fr'
          ? "NextSoftHR s'engage à une stricte conformité RGPD et conventions africaines de protection des données (Sections 21 & 22). Toutes vos données personnelles RH restent la propriété exclusive de votre entreprise, avec chiffrement AES-256."
          : language === 'pt'
          ? "A NextSoftHR garante total conformidade com o RGPD, LGPD e diretivas africanas de privacidade (Secções 21 e 22). Todos os dados de colaboradores permanecem propriedade exclusiva do cliente com encriptação AES-256."
          : language === 'es'
          ? "NextSoftHR garantiza cumplimiento riguroso con RGPD y normativas internacionales de protección de datos (Secciones 21 y 22). Los datos de sus colaboradores son de su exclusiva propiedad con cifrado AES-256."
          : "NextSoftHR enforces institutional compliance with global and Pan-African data protection frameworks (Sections 21.0 & 22.0). All HR and employee data remains your exclusive property, encrypted with AES-256 at rest and TLS 1.3 in transit.";
        replyAction = {
          label: language === 'fr' ? 'Ouvrir Politique de Confidentialité' : language === 'pt' ? 'Abrir Política de Privacidade' : language === 'es' ? 'Abrir Política de Privacidad' : 'Open Data Protection Brief',
          callbackAction: 'open-privacy'
        };
      } else if (q.includes('sla') || q.includes('uptime') || q.includes('availability') || q.includes('disponibilité') || q.includes('disponibilidade')) {
        replyText = language === 'fr'
          ? "NextSoftHR s'engage sur un taux de disponibilité mensuel garanti de 99,9% pour les déploiements Enterprise (Section 28.0), avec des crédits de service en cas d'interruption non planifiée."
          : language === 'pt'
          ? "A NextSoftHR oferece uma garantia de disponibilidade de 99,9% para subscrições Enterprise (Secção 28.0), acompanhada de créditos de serviço contratuais em caso de indisponibilidade imprevista."
          : language === 'es'
          ? "NextSoftHR mantiene un compromiso de disponibilidad mensual del 99.9% para planes Enterprise (Sección 28.0), respaldado por créditos de servicio si se produce una interrupción imprevista."
          : "NextSoftHR commits to a 99.9% monthly platform uptime SLA for Enterprise accounts (Section 28.0), supported by contractually scheduled service credits for qualifying unscheduled downtime.";
        replyAction = {
          label: language === 'fr' ? 'Consulter la Section 28.0 (Disponibilité)' : language === 'pt' ? 'Ver Secção 28.0 (Disponibilidade)' : language === 'es' ? 'Ver Sección 28.0 (Disponibilidad)' : 'View Section 28.0 (Service Availability)',
          sectionId: 'service-availability'
        };
      } else if (q.includes('bill') || q.includes('price') || q.includes('tarif') || q.includes('preço') || q.includes('precio') || q.includes('cancel') || q.includes('trial') || q.includes('essai')) {
        replyText = language === 'fr'
          ? "Nos forfaits de souscription et périodes d'essai gratuit sont détaillés aux Sections 17, 18 et 19. Aucuns frais imprévus : les renouvellements peuvent être résiliés avec un préavis écrit de 30 jours."
          : language === 'pt'
          ? "Os nossos planos de subscrição e períodos de teste gratuito regem-se pelas Secções 17, 18 e 19. Os cancelamentos de renovação automática requerem pré-aviso de 30 dias sem custos ocultos."
          : language === 'es'
          ? "Nuestros planes de suscripción y pruebas gratuitas se detallan en las Secciones 17, 18 y 19. Las cancelaciones previas a la renovación requieren 30 días de notificación sin penalizaciones imprevistas."
          : "Our subscription billing periods, free trial terms, and cancellation policies are detailed in Sections 17.0, 18.0, and 19.0. Annual subscriptions renew automatically unless 30-day notice is provided prior to term end.";
        replyAction = {
          label: language === 'fr' ? 'Consulter Section 17.0 (Tarifs)' : language === 'pt' ? 'Ver Secção 17.0 (Planos)' : language === 'es' ? 'Ver Sección 17.0 (Planes)' : 'View Section 17.0 (Subscriptions)',
          sectionId: 'subscription-plans'
        };
      } else {
        replyText = language === 'fr'
          ? "Merci pour votre question ! Un conseiller de l'équipe Support & Conformité NextSoftHR a bien pris note de votre message. Si vous souhaitez un échange direct ou une étude personnalisée, nous pouvons aussi organiser un rappel téléphonique."
          : language === 'pt'
          ? "Obrigado pela sua mensagem! Um especialista de suporte e conformidade da NextSoftHR registou a sua consulta. Se desejar, podemos também agendar um contacto direto com um gestor de conta."
          : language === 'es'
          ? "¡Gracias por su consulta! Un especialista de soporte corporativo y cumplimiento de NextSoftHR ha recibido su mensaje. Si precisa asistencia personalizada, puede también solicitar una llamada directa."
          : "Thank you for reaching out! A NextSoftHR Enterprise Support specialist has logged your request. If your matter requires formal legal counsel or custom enterprise terms, you can also transmit an official inquiry or request a telephone callback.";
        replyAction = {
          label: language === 'fr' ? 'Formulaire Juridique Officiel' : language === 'pt' ? 'Formulário Jurídico Oficial' : language === 'es' ? 'Formulario Legal Oficial' : 'Open Legal Inquiry Form',
          callbackAction: 'open-contact'
        };
      }

      const agentMessage: Message = {
        id: `msg-${Date.now()}`,
        sender: 'agent',
        agentName: t.liveChatAgentName,
        agentRole: t.liveChatAgentRole,
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: replyAction
      };

      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1100);
  };

  // Handle sending a message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    processAgentReply(userText);
  };

  // Handle clicking a suggestion chip
  const handleSendChip = (chipText: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: chipText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    processAgentReply(chipText);
  };

  // Handle action click from agent message
  const handleMessageAction = (action: Message['action']) => {
    if (!action) return;

    if (action.sectionId && onSelectSection) {
      onSelectSection(action.sectionId);
      // On mobile or small screens, optionally minimize or let user view
      if (window.innerWidth < 640) {
        setIsOpen(false);
      }
    } else if (action.callbackAction === 'open-privacy' && onOpenPrivacy) {
      onOpenPrivacy();
    } else if (action.callbackAction === 'open-contact' && onOpenContact) {
      onOpenContact();
    }
  };

  // Handle Callback Request submission
  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName.trim() || !callbackEmail.trim()) return;

    setCallbackSubmitted(true);
    setTimeout(() => {
      // Also add confirmation to the chat thread
      const confMsg: Message = {
        id: `msg-callback-${Date.now()}`,
        sender: 'system',
        text: language === 'fr'
          ? `Demande de rappel confirmée pour ${callbackName} (${callbackEmail}). Un conseiller vous appellera sous 2 heures.`
          : language === 'pt'
          ? `Pedido de contacto telefónico agendado para ${callbackName} (${callbackEmail}). O nosso especialista contactará dentro de 2 horas.`
          : language === 'es'
          ? `Llamada agendada con éxito para ${callbackName} (${callbackEmail}). Un especialista se comunicará en un plazo máximo de 2 horas.`
          : `Callback scheduled for ${callbackName} (${callbackEmail}). A dedicated specialist will reach out within 2 hours.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, confMsg]);
    }, 500);
  };

  const handleResetChat = () => {
    setMessages(getInitialMessages());
    setCallbackSubmitted(false);
  };

  // Suggested Quick Chips
  const quickChips = [
    t.liveChatChipPayroll,
    t.liveChatChipDataPrivacy,
    t.liveChatChipSLA,
    t.liveChatChipDPA,
    t.liveChatChipBilling
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* FLOATING LAUNCHER BUTTON                                                  */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-50 no-print flex items-center gap-3">
        <button
          type="button"
          onClick={toggleOpen}
          className={`group relative inline-flex items-center gap-2.5 px-4 py-3 rounded-full font-semibold shadow-xl transition-all duration-300 active:scale-95 cursor-pointer ${
            isOpen
              ? 'bg-slate-900 hover:bg-slate-800 text-white ring-2 ring-slate-700/50'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 ring-2 ring-blue-400/40'
          }`}
          aria-label={isOpen ? 'Close Live Chat Help' : 'Open Live Chat Support Desk'}
          aria-expanded={isOpen}
        >
          {/* Active status pulse indicator */}
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84cc16] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#84cc16]" />
          </span>

          {/* Icon */}
          {isOpen ? (
            <X className="w-5 h-5 text-slate-300 group-hover:text-white transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <MessageSquare className="w-5 h-5 text-white transition-transform group-hover:scale-110 duration-200" />
          )}

          {/* Label (desktop) */}
          <span className="text-sm tracking-tight font-bold hidden sm:inline-block">
            {isOpen ? t.contactCancelBtn : t.liveChatButtonLabel}
          </span>

          {/* Unread count badge if closed and unread */}
          {!isOpen && unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#84cc16] text-slate-950 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* CHAT / HELP DIALOG POPOVER                                                */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="live-chat-heading"
          className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[calc(100vh-7rem)] h-[600px] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-bottom-4"
        >
          {/* Top Brand Header */}
          <div className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 text-white p-4 sm:p-5 shrink-0 border-b border-blue-600/30 dark:border-slate-800">
            {/* Top row with Logo / Agent avatars and controls */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[#84cc16]">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="live-chat-heading" className="text-sm font-extrabold text-white tracking-tight leading-tight">
                    {t.liveChatTitle}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
                    <span className="text-[11px] font-medium text-blue-100 dark:text-blue-200/80">
                      {t.liveChatOnlineStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons (Reset, Minimize, Close) */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Restart Conversation"
                  aria-label="Restart Conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Close Dialog"
                  aria-label="Close Live Chat Dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Representative Avatars & SLA Badge */}
            <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center -space-x-1.5">
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-2xs">
                  SJ
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-600 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-2xs">
                  CR
                </div>
                <div className="w-6 h-6 rounded-full bg-amber-600 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-2xs">
                  TF
                </div>
                <span className="pl-3 text-[11px] text-blue-100/90 font-medium">
                  {t.liveChatAgentName}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-blue-200/90">
                <Clock className="w-3.5 h-3.5 text-[#84cc16]" />
                <span>&lt; 3 mins</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs (Live Chat | FAQ | Callback) */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 text-xs shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2.5 px-3 font-semibold text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'chat'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-slate-900'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.liveChatTabChat}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-2.5 px-3 font-semibold text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'faq'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-slate-900'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.liveChatTabFaq}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('callback')}
              className={`flex-1 py-2.5 px-3 font-semibold text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'callback'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-slate-900'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.liveChatTabCallback}</span>
            </button>
          </div>

          {/* ===================================================================== */}
          {/* TAB 1: LIVE CHAT THREAD                                               */}
          {/* ===================================================================== */}
          {activeTab === 'chat' && (
            <>
              {/* Scrollable Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-slate-950/40 text-xs">
                {messages.map((msg) => {
                  if (msg.sender === 'system') {
                    return (
                      <div key={msg.id} className="text-center my-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-[11px] text-blue-900 dark:text-blue-300 font-medium">
                          {msg.text}
                        </span>
                      </div>
                    );
                  }

                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      {/* Agent badge if applicable */}
                      {!isUser && msg.agentName && (
                        <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-500 dark:text-slate-400">
                          <UserCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          <span className="font-bold text-slate-700 dark:text-slate-300">{msg.agentName}</span>
                          <span>•</span>
                          <span>{msg.agentRole}</span>
                        </div>
                      )}

                      {/* Bubble */}
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed text-xs shadow-2xs ${
                          isUser
                            ? 'bg-blue-600 text-white rounded-br-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 rounded-bl-xs'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Interactive action chip button */}
                        {msg.action && (
                          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                            <button
                              type="button"
                              onClick={() => handleMessageAction(msg.action)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 transition cursor-pointer"
                            >
                              <span>{msg.action.label}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Timestamp */}
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                {/* Agent Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-fit">
                    <span className="inline-flex gap-1 items-center px-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t.liveChatAgentTyping}
                    </span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 shrink-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 px-1">
                  {t.liveChatQuickTopicsHeading}
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                  {quickChips.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendChip(chip)}
                      className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t.liveChatPlaceholder}
                  className="flex-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 px-3 py-2.5 rounded-xl border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-hidden transition"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-xs transition active:scale-95 cursor-pointer"
                  title={t.liveChatSendBtn}
                  aria-label={t.liveChatSendBtn}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {/* ===================================================================== */}
          {/* TAB 2: KEY TERMS FAQ                                                  */}
          {/* ===================================================================== */}
          {activeTab === 'faq' && (
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-950/40 text-xs">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-200">
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Frequently Asked Legal Clauses</span>
                </div>
                <p className="text-[11px] leading-relaxed text-blue-900/80 dark:text-blue-200/80">
                  Quickly review standard contractual positions or jump directly to the relevant clause.
                </p>
              </div>

              {/* FAQ Item 1 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">
                  Who owns employee & business data stored in NextSoftHR?
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  The Customer retains 100% full legal ownership of all uploaded HR records, employee identities, payroll calculations, and documents (Section 21.0).
                </p>
                <button
                  type="button"
                  onClick={() => onSelectSection?.('data-ownership')}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <span>Go to Section 21.0 Data Ownership</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* FAQ Item 2 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">
                  What is the platform uptime guarantee & SLA credits?
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  NextSoftHR guarantees a 99.9% monthly availability SLA for paid subscriptions with service credit protections for unscheduled downtime (Section 28.0).
                </p>
                <button
                  type="button"
                  onClick={() => onSelectSection?.('service-availability')}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <span>Go to Section 28.0 Service Availability</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* FAQ Item 3 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">
                  How does the 14-day Free Trial convert into a subscription?
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  Free trials provide unrestricted platform exploration for 14 days without automatic credit card charging unless explicitly authorized by the administrator (Section 18.0).
                </p>
                <button
                  type="button"
                  onClick={() => onSelectSection?.('free-trials')}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <span>Go to Section 18.0 Free Trials</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* FAQ Item 4 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">
                  Can we sign a custom Data Processing Addendum (DPA)?
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  Yes. NextSoftHR provides executed DPAs incorporating Standard Contractual Clauses (SCCs) for global, EU, and African cross-border data transfers.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('callback');
                    setCallbackDepartment('legal');
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <span>Request Custom DPA Execution</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 3: REQUEST SPECIALIST CALLBACK                                    */}
          {/* ===================================================================== */}
          {activeTab === 'callback' && (
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/40 text-xs">
              {callbackSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Callback Request Scheduled!
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                    A NextSoftHR enterprise support or legal specialist will contact you at <strong>{callbackEmail}</strong> within 2 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCallbackSubmitted(false);
                      setActiveTab('chat');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition cursor-pointer"
                  >
                    Return to Live Chat
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-3.5">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-200">
                    <div className="font-bold flex items-center gap-1.5 mb-0.5">
                      <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Direct Enterprise Support Callback</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-blue-900/80 dark:text-blue-200/80">
                      Need formal guidance, custom contract reviews, or enterprise onboarding? Leave your details for an immediate agent callback.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      placeholder="e.g., Alexandra Wright"
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Corporate Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={callbackEmail}
                      onChange={(e) => setCallbackEmail(e.target.value)}
                      placeholder="alexandra@company.com"
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number (with Country Code)
                    </label>
                    <input
                      type="tel"
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      placeholder="+234 800 000 0000 / +44 20 ..."
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Department / Priority
                    </label>
                    <select
                      value={callbackDepartment}
                      onChange={(e) => setCallbackDepartment(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-hidden"
                    >
                      <option value="legal">Legal & Compliance (Terms / DPA)</option>
                      <option value="payroll">Payroll Specialist (Tax & Statutory)</option>
                      <option value="enterprise">Enterprise Sales & Custom Quotes</option>
                      <option value="technical">Technical Support & Integrations</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5 mt-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Request Agent Callback</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
