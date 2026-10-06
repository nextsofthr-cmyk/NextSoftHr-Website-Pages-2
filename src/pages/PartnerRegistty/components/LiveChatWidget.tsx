import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Headphones, 
  Phone, 
  Mail, 
  Clock, 
  CheckCheck, 
  Search, 
  Sparkles, 
  AlertCircle, 
  ExternalLink, 
  ChevronRight, 
  ShieldCheck, 
  FileText,
  ThumbsUp,
  RefreshCw,
  MapPin,
  Bot
} from 'lucide-react';
import { Partner } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LiveChatWidgetProps {
  allPartners?: Partner[];
  onOpenDirectory?: () => void;
  onOpenRegistration?: () => void;
  onOpenAiMatch?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user' | 'system';
  agentName?: string;
  agentRole?: string;
  agentAvatar?: string;
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: () => void }[];
}

interface SupportAgent {
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'busy';
  location: string;
}

const SUPPORT_AGENTS: SupportAgent[] = [
  {
    name: 'Chidinma Okafor',
    role: 'Lead Partner Advisor (West & Central Africa)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    location: 'Lagos, Nigeria'
  },
  {
    name: 'Kwame Mensah',
    role: 'Technical Integration Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    location: 'Accra, Ghana'
  },
  {
    name: 'Tariq Al-Mansoor',
    role: 'Enterprise Partner Success Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    location: 'Dubai & Nairobi'
  }
];

const FAQS = [
  {
    q: 'How are NextSofthr partners verified?',
    a: 'Every verified partner undergoes strict verification: corporate registration check, financial standing, certified NextSofthr specialist examinations, and reference checks on at least 3 live enterprise deployments.'
  },
  {
    q: 'What are the partner commission tiers?',
    a: 'We offer performance-tiered commissions: Platinum (40% margin), Gold (30% margin), Silver (15% margin), and Bronze (20% margin) based on certified headcount and deployment volume.'
  },
  {
    q: 'Can I request a custom RFP or bulk partner tender?',
    a: 'Yes! Our Partner Advisory Desk can compile an RFP shortlist tailored to your region, industry compliance (e.g., local labor laws, banking-grade security), and budget within 24 hours.'
  },
  {
    q: 'How do I submit an application to become a partner?',
    a: 'Click "Become a Partner" or scroll to the Partner Registration form on the homepage. Our team reviews submissions within 2 business days.'
  }
];

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  allPartners = [],
  onOpenDirectory,
  onOpenRegistration,
  onOpenAiMatch
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'ticket' | 'contact' | 'faqs'>('chat');
  const [unreadCount, setUnreadCount] = useState(1);
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [faqSearch, setFaqSearch] = useState('');

  // Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    company: '',
    category: 'Partner Matching Advisory',
    priority: 'Medium',
    message: ''
  });
  const [ticketSubmitted, setTicketSubmitted] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeAgent = SUPPORT_AGENTS[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome-1',
      sender: 'agent',
      agentName: activeAgent.name,
      agentRole: activeAgent.role,
      agentAvatar: activeAgent.avatar,
      text: `Hello! 👋 Welcome to NextSofthr Partner Advisory. I'm ${activeAgent.name}, currently online from ${activeAgent.location}. How can our support team assist your organization today?`,
      timestamp: 'Just now',
      quickActions: [
        { label: '🔍 Find a Partner for my company', action: () => handleQuickPrompt('I need help finding an accredited partner for my company.') },
        { label: '💎 Partner Tiers & Commission (15%-40%)', action: () => handleQuickPrompt('Can you explain the partner tiers and commissions?') },
        { label: '🛡️ Check Partner Verification Status', action: () => handleQuickPrompt('How do I verify a partner\'s credentials?') },
        { label: '📞 Request an Agent Call Back', action: () => handleQuickPrompt('I would like to request a callback from a partner advisor.') }
      ]
    }
  ]);

  // Dismiss greeting bubble after timeout or when chat opens
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreetingBubble(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setShowGreetingBubble(false);
      scrollToBottom();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleQuickPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  const generateAgentResponse = (userQuery: string): { text: string; quickActions?: { label: string; action: () => void }[] } => {
    const q = userQuery.toLowerCase();

    if (q.includes('find') || q.includes('recommend') || q.includes('search') || q.includes('need partner')) {
      const topCount = allPartners.length > 0 ? allPartners.length : 'over 30';
      return {
        text: `We have ${topCount} certified partners across Africa and globally! You can filter directly by Country, Tier (Platinum 40%, Gold 30%, Silver 15%, Bronze 20%), and Industry in our registry. Would you like to view the directory or run the AI Matcher?`,
        quickActions: [
          { label: '📂 Open Directory Registry', action: () => { setIsOpen(false); onOpenDirectory?.(); } },
          { label: '✨ Use Gemini AI Partner Match', action: () => { setIsOpen(false); onOpenAiMatch?.(); } }
        ]
      };
    }

    if (q.includes('tier') || q.includes('commission') || q.includes('percentage') || q.includes('platinum') || q.includes('margin')) {
      return {
        text: `NextSofthr offers industry-leading revenue shares:\n\n• 💎 Platinum: 40% margin (Strategic partners)\n• 🥇 Gold: 30% margin (Premium partners)\n• 🥈 Silver: 15% margin (Professional partners)\n• 🥉 Bronze: 20% margin (Registered specialists)\n\nAll tiers receive dedicated enablement, sandbox environments, and deal protection.`,
        quickActions: [
          { label: '📝 Apply for Partner Program', action: () => { setIsOpen(false); onOpenRegistration?.(); } },
          { label: '📊 Open Tiers & Standards Guide', action: () => { setIsOpen(false); onOpenDirectory?.(); } }
        ]
      };
    }

    if (q.includes('verif') || q.includes('trust') || q.includes('credential') || q.includes('safe')) {
      return {
        text: `Every partner marked with the 🛡️ 'Verified' badge on NextSofthr has completed KYC, company registry check, ISO 27001 data compliance review, and verified client testimonials. Top-Tier partners also maintain 98%+ SLA adherence.`,
        quickActions: [
          { label: '🛡️ View Verified Partners', action: () => { setIsOpen(false); onOpenDirectory?.(); } }
        ]
      };
    }

    if (q.includes('call') || q.includes('phone') || q.includes('speak') || q.includes('human') || q.includes('agent')) {
      return {
        text: `I can arrange for a Senior Partner Advisor to call or email you! You can submit an urgent advisory ticket directly via the 'Submit Ticket' tab above, or email our desk directly at support@nextsofthr.com. Our direct desk hotline is +234 1 800 NEXTSOFT (Mon-Fri 08:00 - 18:00 GMT+1).`,
        quickActions: [
          { label: '🎫 Open Ticket Submission Tab', action: () => setActiveTab('ticket') },
          { label: '☎️ View Direct Desk Contacts', action: () => setActiveTab('contact') }
        ]
      };
    }

    if (q.includes('price') || q.includes('cost') || q.includes('budget') || q.includes('fee')) {
      return {
        text: `Partner engagement fees vary based on scope (e.g. Payroll migration, HRIS customization, or managed services). Typical starter implementations range from $1,200 to $15,000 depending on employee count and regional regulatory complexity. You can toggle global currencies in the header to view estimates in your local currency.`,
        quickActions: [
          { label: '📂 Browse by Starting Budget', action: () => { setIsOpen(false); onOpenDirectory?.(); } }
        ]
      };
    }

    return {
      text: `Thank you for contacting NextSofthr Support. Our partner advisory desk has logged your request: "${userQuery}". An advisor is available to review your project specifics, compliance requirements, or partner application. Would you like to submit a formal ticket or talk via WhatsApp?`,
      quickActions: [
        { label: '🎫 Submit Priority Ticket', action: () => setActiveTab('ticket') },
        { label: '💬 Chat on WhatsApp (+234 800 6398 7638)', action: () => window.open('https://api.whatsapp.com/send?phone=23480063987638&text=Hello%20NextSofthr%20Support', '_blank') }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate realistic human agent typing delay
    setTimeout(() => {
      const response = generateAgentResponse(text);
      const agentMsg: ChatMessage = {
        id: `msg-agent-${Date.now()}`,
        sender: 'agent',
        agentName: activeAgent.name,
        agentRole: activeAgent.role,
        agentAvatar: activeAgent.avatar,
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: response.quickActions
      };

      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1100);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.email || !ticketForm.message) return;

    const generatedId = `NX-SPT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketSubmitted(generatedId);

    // Add a confirmation message into chat history as well
    const confirmMsg: ChatMessage = {
      id: `msg-sys-${Date.now()}`,
      sender: 'agent',
      agentName: activeAgent.name,
      agentRole: 'Support Coordinator',
      agentAvatar: activeAgent.avatar,
      text: `Ticket #${generatedId} has been created for ${ticketForm.name || ticketForm.email}. A Partner Support specialist will follow up via email within 2 business hours.`,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, confirmMsg]);
  };

  const filteredFaqs = FAQS.filter(
    f => f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <>
      {/* Floating Live Chat Launcher Icon container */}
      <div className="relative flex items-center gap-2">
        {/* Proactive Greeting Tooltip Bubble (Dismissible) */}
        {!isOpen && showGreetingBubble && (
          <div className="hidden sm:flex items-center gap-3 p-3 bg-white dark:bg-[#0c2b64] text-slate-800 dark:text-white rounded-2xl shadow-2xl border border-slate-200 dark:border-blue-900/80 w-72 max-w-xs animate-bounce select-none absolute bottom-full right-0 mb-3 z-50">
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 border-[#c8f526] relative">
              <img src={activeAgent.avatar} alt={activeAgent.name} className="w-full h-full object-cover" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#0c2b64] dark:text-[#c8f526]">
                <span>{activeAgent.name}</span>
                <span className="text-[10px] text-emerald-500 font-bold">• {t('chat.online', undefined, 'Online')}</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight mt-0.5 line-clamp-2">
                {t('chat.greeting', undefined, 'Need help finding a verified partner or commission rates? Chat with us!')}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowGreetingBubble(false);
              }}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5 rounded-full cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* The Live Chat Icon Button */}
        <button
          type="button"
          id="floating-live-chat-btn"
          onClick={toggleChat}
          aria-label={isOpen ? 'Close Live Chat' : 'Open Live Chat with Support Agents'}
          className={`relative flex items-center gap-2.5 px-4 py-3 rounded-full text-white font-black text-xs sm:text-sm shadow-2xl transition-all duration-300 transform active:scale-95 group cursor-pointer ${
            isOpen 
              ? 'bg-rose-600 hover:bg-rose-700 ring-4 ring-rose-500/30' 
              : 'bg-gradient-to-r from-[#0c2b64] via-blue-900 to-[#123e8f] hover:from-blue-900 hover:to-[#0c2b64] border-2 border-[#c8f526] ring-4 ring-blue-500/20 hover:scale-105 shadow-blue-950/40'
          }`}
        >
          {/* Active online pulse ring */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-[#071938]"></span>
            </span>
          )}

          {isOpen ? (
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          ) : (
            <div className="relative">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#c8f526]" />
            </div>
          )}

          <span className="font-extrabold tracking-tight">
            {isOpen ? 'Close' : t('chat.launcher', undefined, 'Live Chat')}
          </span>

          {!isOpen && (
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
              {t('chat.online', undefined, 'Online')}
            </span>
          )}

          {!isOpen && unreadCount > 0 && (
            <span className="absolute -top-1.5 -left-1 px-1.5 py-0.2 rounded-full bg-[#c8f526] text-[#071938] text-[10px] font-black shadow-md border border-white">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Floating Help Dialog / Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[610px] max-h-[82vh] bg-white dark:bg-[#071938] rounded-3xl shadow-2xl border border-slate-200 dark:border-blue-900/60 flex flex-col overflow-hidden animate-fadeIn"
          role="dialog"
          aria-labelledby="chat-heading"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#071938] via-[#0c2b64] to-[#123e8f] p-4 text-white shrink-0 relative border-b border-blue-900/60">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 p-0.5 border border-[#c8f526]/50 shadow-inner flex items-center justify-center overflow-hidden">
                    <img src={activeAgent.avatar} alt={activeAgent.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#071938]" title="Agent Online"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 id="chat-heading" className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
                      <span>NextSofthr Partner Advisory</span>
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#c8f526]/20 text-[#c8f526] font-mono font-bold">Live</span>
                  </div>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{activeAgent.name} • 3 agents online</span>
                  </p>
                </div>
              </div>

              {/* Action buttons in header */}
              <div className="flex items-center gap-1 text-slate-300">
                <button
                  type="button"
                  onClick={() => {
                    setMessages([
                      {
                        id: `msg-reset-${Date.now()}`,
                        sender: 'agent',
                        agentName: activeAgent.name,
                        agentRole: activeAgent.role,
                        agentAvatar: activeAgent.avatar,
                        text: `Chat restarted. How can we help you right now?`,
                        timestamp: 'Just now'
                      }
                    ]);
                  }}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Restart Conversation"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Close Dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick SLA Banner */}
            <div className="mt-3 py-1 px-2.5 rounded-lg bg-white/10 backdrop-blur-xs flex items-center justify-between text-[11px] text-slate-200">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#c8f526]" />
                <span>Typical response: <strong>&lt; 2 mins</strong></span>
              </span>
              <span className="font-mono text-[10px] text-slate-300">24/7 Global Desk</span>
            </div>

            {/* Tab navigation */}
            <div className="flex items-center gap-1 mt-3 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'chat'
                    ? 'bg-[#c8f526] text-[#071938] shadow-sm'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{t('chat.tab_chat', undefined, 'Chat')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ticket')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'ticket'
                    ? 'bg-[#c8f526] text-[#071938] shadow-sm'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t('chat.tab_ticket', undefined, 'Ticket')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'contact'
                    ? 'bg-[#c8f526] text-[#071938] shadow-sm'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>{t('chat.tab_desk', undefined, 'Desk Info')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('faqs')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'faqs'
                    ? 'bg-[#c8f526] text-[#071938] shadow-sm'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('chat.tab_faqs', undefined, 'FAQs')}</span>
              </button>
            </div>
          </div>

          {/* TAB 1: LIVE CHAT */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-[#061227]">
              {/* Message scroll list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center my-1">
                  <span className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                    Encrypted Advisory Session with NextSofthr Team
                  </span>
                </div>

                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    {m.sender === 'agent' && (
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        <span className="text-[11px] font-extrabold text-[#0c2b64] dark:text-[#c8f526]">
                          {m.agentName || activeAgent.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {m.timestamp}
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-2 max-w-[88%]">
                      {m.sender === 'agent' && (
                        <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-slate-300 dark:border-blue-900 mt-1">
                          <img src={m.agentAvatar || activeAgent.avatar} alt="Agent" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          m.sender === 'user'
                            ? 'bg-[#123e8f] text-white rounded-br-xs shadow-md'
                            : 'bg-white dark:bg-[#0b1c3b] text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200 dark:border-slate-800 shadow-sm'
                        }`}
                      >
                        <p className="whitespace-pre-line">{m.text}</p>

                        {/* Quick action buttons attached to this message */}
                        {m.quickActions && m.quickActions.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
                            {m.quickActions.map((qa, qIdx) => (
                              <button
                                key={qIdx}
                                type="button"
                                onClick={qa.action}
                                className="w-full text-left px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/70 dark:hover:bg-blue-900/80 text-blue-700 dark:text-[#c8f526] font-bold text-[11px] flex items-center justify-between transition-colors border border-blue-100 dark:border-blue-900/50"
                              >
                                <span>{qa.label}</span>
                                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {m.sender === 'user' && (
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 pr-1">
                        <span>{m.timestamp}</span>
                        <CheckCheck className="w-3 h-3 text-blue-500" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Agent Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs pl-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-300 dark:border-blue-900">
                      <img src={activeAgent.avatar} alt="Agent typing" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center gap-1 bg-white dark:bg-[#0b1c3b] px-3 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">{activeAgent.name} is typing</span>
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse delay-150"></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input bar */}
              <div className="p-3 bg-white dark:bg-[#071938] border-t border-slate-200 dark:border-blue-900/60 shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={t('chat.input_placeholder', undefined, 'Type your message or question...')}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#040e1f] text-slate-900 dark:text-white text-xs placeholder:text-slate-400 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="p-2.5 rounded-xl bg-[#0c2b64] dark:bg-[#123e8f] hover:bg-blue-700 text-[#c8f526] font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shrink-0 cursor-pointer"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>Official NextSofthr Support Agent</span>
                  </span>
                  <span>Press Enter to send</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUBMIT FORMAL TICKET */}
          {activeTab === 'ticket' && (
            <div className="flex-1 overflow-y-auto p-5 bg-slate-50 dark:bg-[#061227]">
              {ticketSubmitted ? (
                <div className="text-center py-8 px-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-300 dark:border-emerald-800 shadow-sm">
                    <CheckCheck className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-extrabold text-[#0c2b64] dark:text-white">Ticket Created Successfully</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xs mx-auto">
                    Your reference ID is <span className="font-mono font-black text-blue-600 dark:text-[#c8f526]">{ticketSubmitted}</span>.
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3">
                    A copy of your ticket and SLA dispatch notice has been assigned to the next available regional partner manager.
                  </p>
                  <div className="mt-6 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('chat')}
                      className="w-full py-2.5 rounded-xl bg-[#0c2b64] text-white text-xs font-bold hover:bg-blue-800 transition-colors"
                    >
                      Return to Live Chat
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTicketSubmitted(null);
                        setTicketForm({
                          name: '',
                          email: '',
                          company: '',
                          category: 'Partner Matching Advisory',
                          priority: 'Medium',
                          message: ''
                        });
                      }}
                      className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    >
                      Submit another ticket
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-3.5">
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0c2b64] dark:text-white">Direct Advisory Support Ticket</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Submit an escalation, partner verification inquiry, or enterprise RFP matching request.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketForm.name}
                      onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                      placeholder="e.g. Samuel Adebayo"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#071938] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={ticketForm.email}
                        onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                        placeholder="samuel@company.com"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#071938] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={ticketForm.company}
                        onChange={(e) => setTicketForm({ ...ticketForm, company: e.target.value })}
                        placeholder="Apex Logistics Ltd"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#071938] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Category
                      </label>
                      <select
                        value={ticketForm.category}
                        onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                        className="w-full px-2.5 py-2 text-xs rounded-xl bg-white dark:bg-[#071938] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option>Partner Matching Advisory</option>
                        <option>Partner Accreditation & KYC</option>
                        <option>Commission & Margin Claim</option>
                        <option>Technical API & Integration</option>
                        <option>SLA Dispute Escalation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Priority
                      </label>
                      <select
                        value={ticketForm.priority}
                        onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                        className="w-full px-2.5 py-2 text-xs rounded-xl bg-white dark:bg-[#071938] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option>Standard (Within 24h)</option>
                        <option>Medium (Within 4h)</option>
                        <option>Urgent Enterprise SLA (&lt; 1h)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Details / Requirements *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={ticketForm.message}
                      onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                      placeholder="Describe your organization's specific requirements, country of operation, and timeline..."
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#071938] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0c2b64] to-[#1652f0] text-white text-xs font-black hover:opacity-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#c8f526]" />
                    <span>Generate & Submit Ticket</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: CONTACT DESK & HOTLINE */}
          {activeTab === 'contact' && (
            <div className="flex-1 overflow-y-auto p-5 bg-slate-50 dark:bg-[#061227] space-y-4">
              <div>
                <h4 className="text-sm font-extrabold text-[#0c2b64] dark:text-white">Multi-Channel Support Desk</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Connect directly with our global partner ecosystem coordinators.
                </p>
              </div>

              {/* Direct channels cards */}
              <div className="space-y-2.5">
                <a
                  href="mailto:support@nextsofthr.com?subject=NextSofthr%20Partner%20Inquiry"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#0b1c3b] border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors shadow-2xs group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#c8f526]">
                      support@nextsofthr.com
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Official Partner Desk Email (2h SLA)</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                </a>

                <a
                  href="tel:+23418006398"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#0b1c3b] border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors shadow-2xs group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-emerald-600">
                      +234 1 800 NEXTSOFT (6398)
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Toll-Free Enterprise Hotline</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </a>

                <a
                  href="https://api.whatsapp.com/send?phone=23480063987638&text=Hello%20NextSofthr%20Partner%20Advisory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#0b1c3b] border border-slate-200 dark:border-slate-800 hover:border-green-500 transition-colors shadow-2xs group"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-green-600">
                      WhatsApp Partner Desk
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Direct mobile chat with advisory agents</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-green-600" />
                </a>
              </div>

              {/* Regional Support Hubs */}
              <div className="pt-2">
                <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Regional Ecosystem Hubs</h5>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#0b1c3b] border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-[#0c2b64] dark:text-[#c8f526] flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Lagos & Accra
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">West Africa Desk • GMT+1</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#0b1c3b] border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-[#0c2b64] dark:text-[#c8f526] flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Nairobi & Kigali
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">East Africa Desk • EAT</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#0b1c3b] border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-[#0c2b64] dark:text-[#c8f526] flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Johannesburg
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Southern Africa Desk • SAST</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#0b1c3b] border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-[#0c2b64] dark:text-[#c8f526] flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> London & Dubai
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Global Enterprise Desk</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INSTANT FAQS */}
          {activeTab === 'faqs' && (
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-[#061227] space-y-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  placeholder="Search partner questions..."
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-[#071938] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                {filteredFaqs.map((faq, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-white dark:bg-[#0b1c3b] border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <h5 className="text-xs font-bold text-[#0c2b64] dark:text-[#c8f526] mb-1.5 flex items-start gap-1.5">
                      <span>Q:</span>
                      <span>{faq.q}</span>
                    </h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed pl-4 border-l-2 border-blue-500/40">
                      {faq.a}
                    </p>
                  </div>
                ))}
                {filteredFaqs.length === 0 && (
                  <div className="text-center py-6 text-xs text-slate-400">
                    No FAQs found matching &quot;{faqSearch}&quot;. Ask us directly in the chat!
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40 text-center">
                <p className="text-[11px] text-blue-800 dark:text-blue-300 font-medium">
                  Still have questions? Our live team is waiting.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('chat')}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-[#0c2b64] text-white text-xs font-bold hover:bg-blue-800 transition-colors"
                >
                  Start Live Chat with Agent
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
