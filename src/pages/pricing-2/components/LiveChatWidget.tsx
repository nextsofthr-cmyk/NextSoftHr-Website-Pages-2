import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Headphones,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Search,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  UserCheck,
  ArrowRight,
} from 'lucide-react';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../data/pricingData';

interface LiveChatWidgetProps {
  selectedCurrency?: CurrencyCode;
  onOpenTrial?: (planName?: string) => void;
  onOpenDemo?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  agentName?: string;
  agentRole?: string;
  agentAvatar?: string;
  text: string;
  time: string;
  suggestedAction?: {
    label: string;
    action: 'trial' | 'demo' | 'whatsapp' | 'call';
  };
}

const SUPPORT_AGENTS = [
  {
    name: 'Chioma Adeyemi',
    role: 'Senior HR & Payroll Specialist',
    avatar: 'CA',
    status: 'Online',
    bg: 'bg-emerald-600',
  },
  {
    name: 'David Kimani',
    role: 'Technical Integration Lead',
    avatar: 'DK',
    status: 'Online',
    bg: 'bg-blue-600',
  },
  {
    name: 'Sarah Mensah',
    role: 'Customer Success & Billing',
    avatar: 'SM',
    status: 'Online',
    bg: 'bg-purple-600',
  },
];

const QUICK_TOPICS = [
  {
    title: 'Plan Recommendation',
    subtitle: 'Find the ideal tier for your workforce size',
    prompt: 'Can you recommend the best plan for my company workforce size?',
  },
  {
    title: 'Multi-Currency & Tax',
    subtitle: 'How NGN, USD, KES, EUR, GBP conversions work',
    prompt: 'How does real-time multi-currency conversion and payroll tax deduction work?',
  },
  {
    title: 'Biometric Attendance',
    subtitle: 'Device compatibility & mobile geolocation setup',
    prompt: 'How do we connect our office biometric devices and mobile GPS clocking?',
  },
  {
    title: 'Speak with Human Agent',
    subtitle: 'Connect directly with an on-duty specialist',
    prompt: 'I want to speak directly with an on-duty support specialist right now.',
  },
];

const HELP_ARTICLES = [
  {
    id: 'cur-1',
    q: 'How does the multi-currency conversion work in NextSofthr?',
    a: 'NextSofthr converts plan pricing, estimates, and payroll figures using live benchmark market rates for NGN, USD, KES, EUR, and GBP. Local invoices are billed in your chosen currency with zero cross-border markup.',
  },
  {
    id: 'tax-2',
    q: 'Are local statutory deductions (PAYE, Pension, NHF, Housing Levy) automated?',
    a: 'Yes. NextSofthr automatically calculates statutory payroll deductions in real-time according to local labor and tax laws across Nigeria, Kenya, UK, Europe, and US.',
  },
  {
    id: 'bio-3',
    q: 'Can NextSofthr sync with existing ZKTeco or Hikvision biometric clocks?',
    a: 'Yes. Our Cloud Biometric Bridge links with LAN/WAN ZKTeco, Hikvision, and Anviz biometric attendance devices without requiring on-premise servers.',
  },
  {
    id: 'trial-4',
    q: 'What is included in the 14-day free trial?',
    a: 'You get full unrestricted access to all features of your selected tier, including payroll simulation, self-service mobile app, leave workflows, and 24/7 support agent onboarding.',
  },
];

import { useLanguage } from '../context/LanguageContext';

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  selectedCurrency = 'USD',
  onOpenTrial,
  onOpenDemo,
}) => {
  const { t, language, tx } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'channels' | 'faq'>('chat');
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  const getWelcomeText = () => {
    switch (language) {
      case 'fr':
        return 'Bonjour ! 👋 Bienvenue sur NextSofthr. Nos conseillers sont en ligne et à votre disposition pour vos questions de tarifs, conformité paie, biométrie ou démo.';
      case 'pt':
        return 'Olá! 👋 Bem-vindo ao NextSofthr. Os nossos especialistas estão online para apoiar na escolha de planos, folha de pagamento, relógios biométricos ou agendamento de demonstração.';
      case 'es':
        return '¡Hola! 👋 Bienvenido a NextSofthr. Nuestros especialistas están conectados para asesorarle sobre planes, cálculo de nómina, biométricos o demostraciones guiadas.';
      default:
        return 'Hello! 👋 Welcome to NextSofthr. Our support agents are active and ready to assist you with pricing, payroll compliance, biometric setups, or scheduling a live demo.';
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'agent',
      agentName: 'Chioma Adeyemi',
      agentRole: 'Senior HR & Payroll Specialist',
      agentAvatar: 'CA',
      text: getWelcomeText(),
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Callback form state
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  // Ticket email form state
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (activeTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (hasUnreadNotification) {
      setHasUnreadNotification(false);
    }
  };

  const generateAgentResponse = (userQuestion: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const lower = userQuestion.toLowerCase();
      let replyText =
        "Thank you for contacting NextSofthr Support! An agent has received your message. You can also connect immediately via direct WhatsApp or submit a callback request.";
      let suggestedAction: ChatMessage['suggestedAction'] = undefined;

      if (lower.includes('price') || lower.includes('plan') || lower.includes('cost') || lower.includes('recommend')) {
        const pStarter = CURRENCIES[selectedCurrency]?.format(29) || '$29';
        const pPro = CURRENCIES[selectedCurrency]?.format(79) || '$79';
        const pBiz = CURRENCIES[selectedCurrency]?.format(179) || '$179';
        replyText = tx(
          'Great question! In {currency}, our plans start at {starter}/month for Starter (up to 15 employees), {pro}/month for Professional (our most popular tier with multi-currency payroll), and {business}/month for Business. Would you like to start a 14-day free trial or see the calculator?',
          { currency: selectedCurrency, starter: pStarter, pro: pPro, business: pBiz }
        );
        suggestedAction = { label: 'Start 14-Day Free Trial', action: 'trial' };
      } else if (lower.includes('biometric') || lower.includes('attendance') || lower.includes('clock') || lower.includes('device')) {
        replyText =
          "NextSofthr supports plug-and-play biometric synchronization with ZKTeco, Hikvision, and Anviz devices via our secure Cloud Bridge, as well as geofenced mobile clock-ins. Our support engineers provide free remote installation assistance during your trial.";
        suggestedAction = { label: 'Book Technical Demo', action: 'demo' };
      } else if (lower.includes('currency') || lower.includes('naira') || lower.includes('ngn') || lower.includes('kes') || lower.includes('usd') || lower.includes('tax') || lower.includes('zar') || lower.includes('ghs')) {
        replyText = tx(
          'We fully support {currency} and all 16 African and global currencies (NGN, USD, GBP, KES, ZAR, GHS, MAD, XAF, AED, UGX, TZS, RWF, ZMW, EGP, ZIP, EUR) with live conversion rates! Invoices and payroll runs are processed in your local denomination with zero foreign exchange markup.',
          { currency: selectedCurrency }
        );
      } else if (lower.includes('demo') || lower.includes('walkthrough') || lower.includes('call')) {
        replyText =
          "We would be delighted to host a 1-on-1 personalized product demo for your leadership team! You can schedule it right now or chat directly on WhatsApp.";
        suggestedAction = { label: 'Schedule 1-on-1 Demo', action: 'demo' };
      } else if (lower.includes('human') || lower.includes('speak') || lower.includes('agent') || lower.includes('whatsapp') || lower.includes('phone')) {
        replyText =
          "You're in touch with our live support desk! Chioma and David are online right now. You can also chat with us instantly on WhatsApp (+2349158482622) for sub-5 minute priority replies.";
        suggestedAction = { label: 'Open WhatsApp Live Chat', action: 'whatsapp' };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `agent-${Date.now()}`,
          sender: 'agent',
          agentName: 'David Kimani',
          agentRole: 'Technical Integration Lead',
          agentAvatar: 'DK',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedAction,
        },
      ]);
      setIsTyping(false);
    }, 1100);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    generateAgentResponse(text);
  };

  const handleOpenWhatsAppDirect = (customPrompt?: string) => {
    const msg = encodeURIComponent(
      customPrompt ||
        'Hello NextSofthr Support Team, I am requesting assistance with my HR & Payroll subscription and features.'
    );
    window.open(`https://wa.me/2349158482622?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleActionClick = (actionType?: string) => {
    if (actionType === 'trial' && onOpenTrial) {
      onOpenTrial();
      setIsOpen(false);
    } else if (actionType === 'demo' && onOpenDemo) {
      onOpenDemo();
      setIsOpen(false);
    } else if (actionType === 'whatsapp') {
      handleOpenWhatsAppDirect();
    }
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackSubmitted(false);
      setCallbackName('');
      setCallbackPhone('');
    }, 4500);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketEmail.trim() || !ticketMessage.trim()) return;
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketEmail('');
      setTicketSubject('');
      setTicketMessage('');
    }, 4500);
  };

  const filteredArticles = HELP_ARTICLES.filter(
    (item) =>
      item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div
      id="live-chat-floating-widget"
      ref={dialogRef}
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto"
      aria-label={tx("Live Chat Support Widget")}
    >
      {/* Help Dialog to Contact Support Agents */}
      {isOpen && (
        <div
          id="live-chat-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="live-chat-header-title"
          className="mb-3 w-[calc(100vw-2rem)] max-w-sm sm:w-[420px] bg-white dark:bg-[#0B132B] rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 flex flex-col max-h-[85vh] sm:max-h-[620px]"
        >
          {/* Dialog Header */}
          <div className="bg-gradient-to-r from-[#0265DC] via-[#0256bc] to-[#013f8c] text-white p-4 sm:p-5 relative shrink-0">
            {/* Header top bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-white/15 text-[#A3E635] shadow-xs">
                  <Headphones className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-100">{tx("NextSofthr Help & Support")}</span>
              </div>
              <button
                id="close-live-chat-dialog-btn"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={tx("Close Live Chat Dialog")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Agent Avatars */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3
                  id="live-chat-header-title"
                  className="font-display font-extrabold text-lg sm:text-xl text-white leading-tight"
                >
                  {t.liveChat.contactSupport}
                </h3>
                <p className="text-xs text-blue-100/90 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
                  <span>{t.liveChat.specialistsOnline}</span>
                </p>
              </div>

              {/* Stacked Agent Avatars */}
              <div className="flex -space-x-2 shrink-0 pt-0.5">
                {SUPPORT_AGENTS.map((agent, i) => (
                  <div
                    key={agent.name}
                    className={`w-8 h-8 rounded-full border-2 border-white dark:border-[#0B132B] flex items-center justify-center text-[10px] font-extrabold text-white shadow-sm ${agent.bg}`}
                    title={`${agent.name} (${tx(agent.role)})`}
                  >
                    {agent.avatar}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 mt-4 p-1 rounded-xl bg-black/20 text-xs">
              <button
                id="chat-tab-btn"
                type="button"
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'chat'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.liveChat.liveChatTab}</span>
              </button>
              <button
                id="channels-tab-btn"
                type="button"
                onClick={() => setActiveTab('channels')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'channels'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t.liveChat.channelsTab}</span>
              </button>
              <button
                id="faq-tab-btn"
                type="button"
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'faq'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{t.liveChat.faqTab}</span>
              </button>
            </div>
          </div>

          {/* Dialog Body by Tab */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 text-slate-800 dark:text-slate-200">
            {/* 1. LIVE CHAT TAB */}
            {activeTab === 'chat' && (
              <div className="flex flex-col h-full space-y-4">
                {/* Active Agent Banner */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/70 dark:bg-[#111C38] border border-blue-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-7 h-7 rounded-full bg-[#0265DC] text-white flex items-center justify-center text-[10px] font-bold">{tx("CA")}</div>
                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#A3E635] border border-white" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{tx("Chioma Adeyemi")}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{tx("Senior HR & Payroll Specialist")}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/50">{tx("Active Now")}</span>
                </div>

                {/* Quick Topic Chips */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <span>{tx("Quick assistance topics:")}</span>
                    <Sparkles className="w-3 h-3 text-[#0265DC] dark:text-[#A3E635]" />
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {QUICK_TOPICS.map((topic, i) => (
                      <button
                        key={i}
                        id={`chat-quick-topic-${i}`}
                        onClick={() => handleSendMessage(topic.prompt)}
                        className="text-left p-2 rounded-xl bg-slate-50 dark:bg-[#111C38] hover:bg-blue-50/70 dark:hover:bg-blue-950/40 border border-slate-200/70 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all text-xs"
                      >
                        <div className="font-semibold text-slate-900 dark:text-white truncate">
                          {tx(topic.title)}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {tx(topic.subtitle)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Messages Stream */}
                <div className="flex-1 space-y-3 min-h-[160px] max-h-[220px] overflow-y-auto pr-1">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      {msg.sender === 'agent' && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1 ml-1">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {msg.agentName}
                          </span>
                          <span>•</span>
                          <span>{tx(msg.time)}</span>
                        </div>
                      )}

                      <div
                        className={`max-w-[88%] rounded-2xl p-3 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                          msg.sender === 'user'
                            ? 'bg-[#0265DC] text-white rounded-tr-xs'
                            : 'bg-slate-100 dark:bg-[#111C38] text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/70 dark:border-slate-800'
                        }`}
                      >
                        <p>{tx(msg.text)}</p>

                        {/* Optional action pill inside agent bubble */}
                        {msg.suggestedAction && (
                          <button
                            onClick={() => handleActionClick(msg.suggestedAction?.action)}
                            className="mt-2.5 w-full py-1.5 px-3 rounded-lg text-xs font-bold bg-[#A3E635] text-slate-950 hover:bg-[#84CC16] shadow-sm flex items-center justify-center gap-1.5 transition-all"
                          >
                            <span>{tx(msg.suggestedAction.label)}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {msg.sender === 'user' && (
                        <div className="text-[10px] text-slate-400 mt-0.5 mr-1 flex items-center gap-1">
                          <span>{tx(msg.time)}</span>
                          <CheckCircle2 className="w-3 h-3 text-blue-500" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-100 dark:bg-[#111C38] text-slate-500 dark:text-slate-400 text-xs w-max animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
                      <span className="ml-1 text-[11px]">{tx("Support agent is typing...")}</span>
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>

                {/* Input Box */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="pt-2 border-t border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <input
                      id="live-chat-message-input"
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={tx("Type your question for an agent...")}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                    />
                    <button
                      id="live-chat-send-btn"
                      type="submit"
                      disabled={!inputText.trim() || isTyping}
                      className="p-2.5 rounded-xl bg-[#0265DC] hover:bg-[#0256bc] disabled:opacity-50 text-white shadow-md transition-all shrink-0"
                      aria-label={tx("Send message to live support agent")}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 2. CHANNELS TAB */}
            {activeTab === 'channels' && (
              <div className="space-y-4">
                {/* Channel 1: WhatsApp Instant Chat */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
                        <MessageCircle className="w-5 h-5 fill-current" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{tx("Direct WhatsApp Support")}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{tx("MsmeBooks Sales & Technical Desk")}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md">{tx("Fastest")}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">{tx("Chat with senior onboarding managers on WhatsApp for quotes, biometric sync, or payroll migration.")}</p>
                  <button
                    id="channel-whatsapp-btn"
                    onClick={() => handleOpenWhatsAppDirect()}
                    className="mt-3 w-full py-2.5 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{tx("Open WhatsApp Chat (+2349158482622)")}</span>
                  </button>
                </div>

                {/* Channel 2: Instant Phone Callback */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Phone className="w-4 h-4 text-[#0265DC] dark:text-blue-400" />
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{tx("Request 15-Minute Phone Callback")}</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2.5">{tx("An enterprise specialist will call your direct line to answer technical questions.")}</p>

                  {callbackSubmitted ? (
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{tx("Callback requested! An agent will call you within 15 minutes.")}</span>
                    </div>
                  ) : (
                    <form onSubmit={handleCallbackSubmit} className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={callbackName}
                          onChange={(e) => setCallbackName(e.target.value)}
                          placeholder={tx("Your Name")}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-xs"
                          required
                        />
                        <input
                          type="tel"
                          value={callbackPhone}
                          onChange={(e) => setCallbackPhone(e.target.value)}
                          placeholder={tx("Phone / Mobile")}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-xs"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-[#0265DC] hover:bg-[#0256bc] text-white text-xs font-bold transition-colors"
                      >{tx("Request Instant Call")}</button>
                    </form>
                  )}
                </div>

                {/* Channel 3: Email Ticket */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Mail className="w-4 h-4 text-[#0265DC] dark:text-blue-400" />
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{tx("Submit Priority Support Ticket")}</h4>
                  </div>

                  {ticketSubmitted ? (
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <p className="font-semibold">{tx("Ticket #NS-9482 created!")}</p>
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-400">{tx("Confirmation sent to")}{' '}{ticketEmail}{tx(". We respond within 1 hour.")}</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleTicketSubmit} className="space-y-2">
                      <input
                        type="email"
                        value={ticketEmail}
                        onChange={(e) => setTicketEmail(e.target.value)}
                        placeholder={tx("work.email@company.com")}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-xs"
                        required
                      />
                      <textarea
                        rows={2}
                        value={ticketMessage}
                        onChange={(e) => setTicketMessage(e.target.value)}
                        placeholder={tx("Describe your inquiry or issue...")}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070D1E] text-xs resize-none"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs font-bold transition-colors"
                      >{tx("Send Ticket to Support Team")}</button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* 3. FAQ TAB */}
            {activeTab === 'faq' && (
              <div className="space-y-3">
                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={faqSearch}
                    onChange={(e) => setFaqSearch(e.target.value)}
                    placeholder={tx("Search answers (currency, tax, biometrics)...")}
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111C38] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0265DC]"
                  />
                </div>

                {/* Articles list */}
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {filteredArticles.map((article) => {
                    const isExpanded = expandedFaq === article.id;
                    return (
                      <div
                        key={article.id}
                        className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-[#111C38] overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFaq(isExpanded ? null : article.id)}
                          className="w-full text-left p-3 flex items-center justify-between gap-2 text-xs font-semibold text-slate-900 dark:text-white hover:text-[#0265DC] dark:hover:text-blue-400 transition-colors"
                        >
                          <span>{tx(article.q)}</span>
                          <ChevronRight
                            className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                              isExpanded ? 'rotate-90 text-[#0265DC]' : ''
                            }`}
                          />
                        </button>
                        {isExpanded && (
                          <div className="px-3 pb-3 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-800/80 pt-2 animate-in fade-in duration-150">
                            {tx(article.a)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Contact agent if question not found */}
                <div className="pt-2 text-center">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className="text-xs font-semibold text-[#0265DC] dark:text-blue-400 hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>{tx("Can't find your answer? Chat with an agent")}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dialog Footer with Security / Guarantee Note */}
          <div className="p-3 bg-slate-50 dark:bg-[#070D1E] border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between shrink-0">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t.liveChat.officialSupport}</span>
            </span>
            <span className="font-mono text-[10px]">{tx("24/7 SLA")}</span>
          </div>
        </div>
      )}

      {/* Main Floating 'Live Chat' Action Button & Label Pill */}
      <div className="flex items-center gap-3">
        {/* Floating Tooltip Pill (visible when chat is closed) */}
        {!isOpen && (
          <button
            id="live-chat-fab-label-pill"
            onClick={handleToggle}
            className="hidden sm:flex items-center gap-2 py-2 px-3.5 rounded-full bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-100 text-xs font-bold shadow-xl border border-slate-200 dark:border-slate-800 hover:border-[#0265DC] dark:hover:border-blue-500 transition-all duration-200 group"
          >
            <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
            <span>{tx(t.liveChat.label)}</span>
            <span className="text-[10px] text-slate-400 font-normal">• {t.liveChat.agentsOnline}</span>
          </button>
        )}

        {/* Floating Icon Button */}
        <button
          id="live-chat-fab-button"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? tx("Close Live Chat") : `${t.liveChat.label} - ${t.liveChat.agentsOnline}`}
          className={`relative p-3.5 sm:p-4 rounded-full text-white shadow-2xl transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-blue-500/40 ${
            isOpen
              ? 'bg-slate-900 dark:bg-slate-700 rotate-90 scale-95'
              : 'bg-gradient-to-r from-[#0265DC] to-[#014fb0] hover:scale-105 shadow-blue-600/35 hover:shadow-blue-600/50'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 fill-current transition-transform group-hover:scale-110" />

              {/* Online Pulse Badge */}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#A3E635] border-2 border-white dark:border-[#0B132B]" />

              {/* Unread Ping Notification Badge */}
              {hasUnreadNotification && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#A3E635] text-[9px] font-extrabold text-slate-950 items-center justify-center border border-white dark:border-slate-900">
                    1
                  </span>
                </span>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
