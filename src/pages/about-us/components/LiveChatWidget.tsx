import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  Headphones,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Calendar,
  MessageCircle,
  Check
} from 'lucide-react';
import { BRAND } from '../data/contentData';

interface SupportAgent {
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'busy' | 'away';
}

const SUPPORT_AGENTS: SupportAgent[] = [
  {
    name: 'Chidinma O.',
    role: 'Solutions & Onboarding Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    status: 'online'
  },
  {
    name: 'Tariq A.',
    role: 'Payroll & Statutory Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    status: 'online'
  },
  {
    name: 'Amina B.',
    role: 'Enterprise Support Manager',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    status: 'online'
  }
];

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  agentName?: string;
  agentAvatar?: string;
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string }[];
  ticketId?: string;
}

const FAQ_ITEMS = [
  {
    question: 'How fast can our company get onboarded?',
    answer: 'Most organizations transition within 48 to 72 hours. Our dedicated onboarding specialists assist with importing your historical employee rosters, salary structures, and department trees with zero downtime.'
  },
  {
    question: 'Does NextSofthr support statutory tax compliance across African countries?',
    answer: 'Yes! NextSofthr natively computes PAYE, Pension, NHF, ITF, NSITF, and withholding statutory taxes for Nigeria, Ghana, Kenya, Rwanda, and is continuously updated for regional labor laws.'
  },
  {
    question: 'Can remote or factory staff clock in without expensive hardware?',
    answer: 'Absolutely. Employees can clock in via our GPS-geofenced mobile app, facial verification, or sync seamlessly with any standard biometric fingerprint terminal at your facility.'
  },
  {
    question: 'Is our corporate and employee payroll data secure?',
    answer: 'We employ bank-grade 256-bit AES encryption at rest and in transit, ISO 27001-aligned data residency, strict NDPR/GDPR compliance, and granular role-based access control (RBAC).'
  }
];

interface LiveChatWidgetProps {
  onOpenDemo?: () => void;
  onOpenContact?: () => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  onOpenDemo,
  onOpenContact
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'channels' | 'faqs'>('chat');
  const [hasUnread, setHasUnread] = useState(true);
  const [showTeaser, setShowTeaser] = useState(false);
  const [inputText, setInputText] = useState('');
  const [userContact, setUserContact] = useState('');
  const [contactCaptured, setContactCaptured] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial greeting
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome-1',
      sender: 'agent',
      agentName: 'Chidinma O.',
      agentAvatar: SUPPORT_AGENTS[0].avatar,
      text: 'Hello! 👋 Welcome to NextSofthr. I’m Chidinma from customer solutions. How can we support your team with HR, Payroll, or Enterprise onboarding today?',
      timestamp: 'Just now',
      suggestedActions: [
        { label: 'Talk to a Live Agent', action: 'agent' },
        { label: 'Request Pricing & Plans', action: 'pricing' },
        { label: 'Schedule an Onboarding Demo', action: 'demo' },
        { label: 'Payroll & Statutory Tax Question', action: 'payroll' }
      ]
    }
  ]);

  // Teaser bubble after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTeaser(true);
      }
    }, 2800);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, activeTab]);

  const handleToggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setHasUnread(false);
        setShowTeaser(false);
      }
      return next;
    });
  };

  const handleSendMessage = (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent) return;

    const userMsgId = 'usr-' + Date.now();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: messageContent,
      timestamp: timeNow
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate realistic agent reply
    setTimeout(() => {
      const lower = messageContent.toLowerCase();
      let responseText = '';
      let chosenAgent = SUPPORT_AGENTS[0];
      const ticketNumber = 'NST-' + Math.floor(1000 + Math.random() * 9000);

      if (lower.includes('demo') || lower.includes('schedule') || lower.includes('book')) {
        chosenAgent = SUPPORT_AGENTS[0];
        responseText = `Wonderful! We'd love to walk you through NextSofthr with a live tailored demo for your company. You can book an immediate slot right here or leave your work email.`;
      } else if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost') || lower.includes('plan')) {
        chosenAgent = SUPPORT_AGENTS[2];
        responseText = `Our flexible pricing starts with a free tier for early startups and scales transparently based on active headcount. What is your approximate team size?`;
      } else if (lower.includes('payroll') || lower.includes('tax') || lower.includes('paye') || lower.includes('salary')) {
        chosenAgent = SUPPORT_AGENTS[1];
        responseText = `Hello! Tariq here from the Payroll team. NextSofthr automates gross-to-net calculations, tax remittable schedules, pension, and multi-bank disbursement. Are you managing local or multi-country payroll?`;
      } else {
        chosenAgent = SUPPORT_AGENTS[Math.floor(Math.random() * SUPPORT_AGENTS.length)];
        responseText = `Thank you for reaching out! I've routed this to our active support queue (Ticket #${ticketNumber}). An agent is reviewing your message right now. If you'd like an instant WhatsApp link or direct call, check the 'Channels' tab!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'agent-' + Date.now(),
          sender: 'agent',
          agentName: chosenAgent.name,
          agentAvatar: chosenAgent.avatar,
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ticketId: ticketNumber
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleActionClick = (action: string, label: string) => {
    if (action === 'demo') {
      if (onOpenDemo) {
        onOpenDemo();
        setIsOpen(false);
      } else {
        handleSendMessage('I would like to schedule a personalized demo of NextSofthr.');
      }
    } else {
      handleSendMessage(label);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg-welcome-reset',
        sender: 'agent',
        agentName: 'Chidinma O.',
        agentAvatar: SUPPORT_AGENTS[0].avatar,
        text: 'New conversation started. 👋 How can we help you today with NextSofthr?',
        timestamp: 'Just now',
        suggestedActions: [
          { label: 'Talk to a Live Agent', action: 'agent' },
          { label: 'Request Pricing & Plans', action: 'pricing' },
          { label: 'Schedule an Onboarding Demo', action: 'demo' }
        ]
      }
    ]);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userContact.trim()) return;
    setContactCaptured(true);
    setMessages((prev) => [
      ...prev,
      {
        id: 'sys-' + Date.now(),
        sender: 'agent',
        agentName: 'Support System',
        agentAvatar: SUPPORT_AGENTS[2].avatar,
        text: `Got it! We have linked your email/phone (${userContact}). Our support team will also send transcripts and follow-ups directly to you.`,
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* Teaser Bubble (shows before widget opened) */}
      {showTeaser && !isOpen && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-24 right-6 z-50 max-w-xs bg-white dark:bg-[#0E2038] border border-blue-100 dark:border-blue-900/60 rounded-2xl p-4 shadow-xl shadow-blue-950/15 dark:shadow-black/60 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
        >
          <button
            onClick={() => setShowTeaser(false)}
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
            aria-label="Dismiss chat hint"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <img
                src={SUPPORT_AGENTS[0].avatar}
                alt={SUPPORT_AGENTS[0].name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#84CC16] border-2 border-white dark:border-[#0E2038] rounded-full" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                NextSofthr Support
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                Have questions about our HR &amp; Payroll modules? Our team is live and ready to assist!
              </p>
              <button
                onClick={handleToggleOpen}
                className="mt-2 text-xs font-semibold text-[#0B3B73] dark:text-[#38BDF8] hover:text-[#84CC16] dark:hover:text-[#84CC16] inline-flex items-center gap-1 transition-colors"
              >
                Chat with an agent <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Help Dialog Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Live Chat Support Dialog"
          className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[calc(100vh-6.5rem)] flex flex-col bg-white dark:bg-[#0E2038] rounded-2xl shadow-2xl shadow-blue-950/25 dark:shadow-black/70 border border-slate-200 dark:border-blue-900/50 overflow-hidden transition-all duration-200 animate-in fade-in zoom-in-95"
        >
          {/* Top Brand & Agent Header */}
          <div className="bg-gradient-to-r from-[#0B3B73] via-[#0F4C81] to-[#0A2E5C] text-white p-4 relative shrink-0">
            {/* Background subtle radial highlight */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#84CC16]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between relative z-10 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Headphones className="w-4 h-4 text-[#84CC16]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight flex items-center gap-1.5">
                    Live Support Desk
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#84CC16]/20 text-[#84CC16] border border-[#84CC16]/30">
                      Online
                    </span>
                  </h3>
                  <p className="text-[11px] text-blue-100/80">NextSofthr Customer Experience</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Restart conversation"
                  aria-label="Restart conversation"
                  className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleToggleOpen}
                  title="Close support dialog"
                  aria-label="Close support dialog"
                  className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Agents Row */}
            <div className="flex items-center justify-between bg-black/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {SUPPORT_AGENTS.map((agent, i) => (
                    <div key={i} className="relative">
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-[#0B3B73]"
                      />
                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#84CC16] border border-[#0B3B73]" />
                    </div>
                  ))}
                </div>
                <div className="text-[11px] leading-tight text-blue-100">
                  <span className="font-semibold text-white">3 Agents Online</span>
                  <span className="block text-[10px] text-blue-200/80">Replies in &lt; 2 minutes</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-medium text-[#84CC16]">
                <Clock className="w-3 h-3" />
                <span>WAT 08:00–19:00</span>
              </div>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center gap-1 mt-3 bg-black/30 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 text-xs py-1.5 px-2 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'chat'
                    ? 'bg-white text-[#0B3B73] font-semibold shadow-sm'
                    : 'text-blue-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Live Chat
              </button>
              <button
                onClick={() => setActiveTab('channels')}
                className={`flex-1 text-xs py-1.5 px-2 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'channels'
                    ? 'bg-white text-[#0B3B73] font-semibold shadow-sm'
                    : 'text-blue-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                Direct Channels
              </button>
              <button
                onClick={() => setActiveTab('faqs')}
                className={`flex-1 text-xs py-1.5 px-2 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'faqs'
                    ? 'bg-white text-[#0B3B73] font-semibold shadow-sm'
                    : 'text-blue-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                FAQs
              </button>
            </div>
          </div>

          {/* Dialog Body Depending on Selected Tab */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-[#071322]/60">
              {/* Optional Contact Capture Bar */}
              {!contactCaptured && (
                <form
                  onSubmit={handleSaveContact}
                  className="bg-blue-50/80 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/40 p-2.5 px-3 flex items-center gap-2 shrink-0"
                >
                  <Mail className="w-3.5 h-3.5 text-[#0B3B73] dark:text-[#38BDF8] shrink-0" />
                  <input
                    type="text"
                    value={userContact}
                    onChange={(e) => setUserContact(e.target.value)}
                    placeholder="Enter email or WhatsApp for reply alerts..."
                    className="flex-1 bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="text-[11px] font-semibold text-[#0B3B73] dark:text-[#84CC16] hover:underline shrink-0"
                  >
                    Save
                  </button>
                </form>
              )}

              {/* Message History List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
                {/* Security & Verification note */}
                <div className="text-center my-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] text-slate-500 dark:text-slate-400 bg-white dark:bg-[#0E2038] border border-slate-200 dark:border-blue-950 shadow-xs">
                    <ShieldCheck className="w-3 h-3 text-[#84CC16]" />
                    Encrypted support conversation • NDPR &amp; GDPR Compliant
                  </span>
                </div>

                {messages.map((msg) => {
                  const isAgent = msg.sender === 'agent';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${isAgent ? 'items-start' : 'items-end justify-end'}`}
                    >
                      {isAgent && (
                        <img
                          src={msg.agentAvatar || SUPPORT_AGENTS[0].avatar}
                          alt={msg.agentName || 'Agent'}
                          className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-blue-500/30"
                        />
                      )}

                      <div className={`max-w-[82%] ${isAgent ? 'text-left' : 'text-right'}`}>
                        {isAgent && (
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-semibold text-slate-900 dark:text-white text-[11px]">
                              {msg.agentName}
                            </span>
                            {msg.ticketId && (
                              <span className="text-[10px] font-mono text-[#0B3B73] dark:text-[#84CC16] bg-blue-100 dark:bg-blue-950/80 px-1 rounded">
                                {msg.ticketId}
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                          </div>
                        )}

                        <div
                          className={`p-3 rounded-2xl leading-relaxed shadow-xs ${
                            isAgent
                              ? 'bg-white dark:bg-[#11243E] text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/80 dark:border-blue-900/40'
                              : 'bg-gradient-to-r from-[#0B3B73] to-[#144A8C] text-white rounded-tr-xs'
                          }`}
                        >
                          <p className="whitespace-pre-line text-xs">{msg.text}</p>
                        </div>

                        {!isAgent && (
                          <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                            <span>{msg.timestamp}</span>
                            <Check className="w-3 h-3 text-[#84CC16]" />
                          </div>
                        )}

                        {/* Suggested action chips on agent message */}
                        {isAgent && msg.suggestedActions && (
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {msg.suggestedActions.map((act, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleActionClick(act.action, act.label)}
                                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white dark:bg-[#11243E] text-[#0B3B73] dark:text-[#38BDF8] border border-blue-200/80 dark:border-blue-800/60 hover:bg-[#84CC16]/10 hover:border-[#84CC16] dark:hover:border-[#84CC16] hover:text-slate-900 dark:hover:text-white transition-all text-left shadow-2xs"
                              >
                                {act.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs pl-9">
                    <div className="flex items-center gap-1 bg-white dark:bg-[#11243E] px-3 py-2 rounded-2xl border border-slate-200 dark:border-blue-900/40 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-[#84CC16] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-[#84CC16] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-[#84CC16] animate-bounce" />
                      <span className="text-[11px] ml-1 text-slate-500 dark:text-slate-400">Agent is typing...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-white dark:bg-[#0E2038] border-t border-slate-200 dark:border-blue-900/40 shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message or question..."
                    className="flex-1 bg-slate-100 dark:bg-[#071322] border border-slate-200 dark:border-blue-900/60 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0B3B73] dark:focus:ring-[#84CC16]"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    aria-label="Send message"
                    className="p-2.5 rounded-xl bg-[#0B3B73] hover:bg-[#0A2E5C] dark:bg-[#84CC16] dark:hover:bg-[#65a30d] text-white dark:text-slate-950 font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
                  <span>Press Enter to send</span>
                  <span className="text-[#0B3B73] dark:text-[#84CC16] font-medium">
                    ⚡ Fast response SLA
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Direct Channels Tab */}
          {activeTab === 'channels' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-[#071322]/60 text-xs">
              <div className="text-center p-2 mb-1">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                  Connect Directly with Support Agents
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Reach our dedicated enterprise and solutions team via your preferred communication platform.
                </p>
              </div>

              {/* WhatsApp Direct */}
              <a
                href={`https://wa.me/${BRAND.phone.replace(/[^0-9]/g, '')}?text=Hello%20NextSofthr%20Support,%20I%20would%20like%20assistance%20with%20your%20HR%20and%20Payroll%20platform.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#11243E] border border-slate-200 dark:border-blue-900/40 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      WhatsApp Live Chat
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Chat directly on WhatsApp ({BRAND.phoneDisplay})
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
              </a>

              {/* Direct Phone Call */}
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#11243E] border border-slate-200 dark:border-blue-900/40 hover:border-blue-500 dark:hover:border-blue-400 transition-all shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      Direct Support Line
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {BRAND.phoneDisplay}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </a>

              {/* Email Support */}
              <a
                href={`mailto:${BRAND.email}?subject=NextSofthr%20Support%20Inquiry`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#11243E] border border-slate-200 dark:border-blue-900/40 hover:border-blue-500 dark:hover:border-blue-400 transition-all shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      Email Support Desk
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {BRAND.email}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
              </a>

              {/* Schedule Onboarding / Demo button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenDemo) onOpenDemo();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#11243E] dark:to-[#0B1E38] border border-blue-200 dark:border-blue-800/80 hover:border-[#84CC16] transition-all text-left shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0B3B73]/10 dark:bg-blue-400/10 text-[#0B3B73] dark:text-[#38BDF8] flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      Book Live Screen Walkthrough
                      <span className="px-1.5 py-0.5 rounded-sm text-[9px] font-bold bg-[#84CC16] text-slate-900">
                        Free
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      30-minute tailored 1-on-1 session with a solutions engineer
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0B3B73] dark:group-hover:text-[#84CC16] transition-colors" />
              </button>

              {/* Operating hours info card */}
              <div className="p-3 bg-white dark:bg-[#11243E] rounded-xl border border-slate-200/80 dark:border-blue-900/40 text-[11px] space-y-1.5">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#84CC16]" />
                  Support Desk Operating Hours
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-800 dark:text-slate-100">Monday – Saturday:</strong> 8:00 AM – 7:00 PM WAT
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-800 dark:text-slate-100">Enterprise Clients:</strong> 24/7 dedicated escalation hotline for monthly payroll runs.
                </p>
              </div>
            </div>
          )}

          {/* Quick FAQs Tab */}
          {activeTab === 'faqs' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 bg-slate-50 dark:bg-[#071322]/60 text-xs">
              <div className="text-center p-2 mb-1">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                  Frequently Asked Questions
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Quick answers to common questions about NextSofthr implementation and compliance.
                </p>
              </div>

              {FAQ_ITEMS.map((item, index) => {
                const isExpanded = expandedFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-[#11243E] rounded-xl border border-slate-200 dark:border-blue-900/40 overflow-hidden shadow-2xs transition-colors"
                  >
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : index)}
                      className="w-full p-3 text-left font-medium text-slate-800 dark:text-slate-100 flex items-center justify-between gap-2 hover:text-[#0B3B73] dark:hover:text-[#84CC16] transition-colors"
                    >
                      <span className="text-xs font-semibold">{item.question}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90 text-[#0B3B73] dark:text-[#84CC16]' : ''
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="px-3 pb-3 pt-1 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-blue-900/30 bg-slate-50/50 dark:bg-[#0E2038]/50">
                        <p>{item.answer}</p>
                        <button
                          onClick={() => {
                            setActiveTab('chat');
                            handleSendMessage(`I need more info regarding: "${item.question}"`);
                          }}
                          className="mt-2 text-[11px] font-semibold text-[#0B3B73] dark:text-[#84CC16] inline-flex items-center gap-1 hover:underline"
                        >
                          Ask an agent about this <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/40 text-center mt-3">
                <p className="text-xs text-slate-700 dark:text-slate-200 font-medium">
                  Have a specific technical or custom request?
                </p>
                <button
                  onClick={() => setActiveTab('chat')}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-[#0B3B73] hover:bg-[#0A2E5C] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat with an Agent
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Action Button at Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={handleToggleOpen}
          aria-label={isOpen ? 'Close Live Chat' : 'Open Live Chat with Support Agents'}
          aria-expanded={isOpen}
          className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-full text-white font-semibold shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${
            isOpen
              ? 'bg-slate-800 hover:bg-slate-900 dark:bg-[#11243E] dark:hover:bg-[#183256] ring-2 ring-slate-400/20'
              : 'bg-gradient-to-r from-[#0B3B73] via-[#0E4785] to-[#125399] hover:from-[#082D59] hover:to-[#0F4782] shadow-blue-900/30 hover:shadow-2xl hover:scale-105 active:scale-95'
          }`}
        >
          {/* Animated pulse halo when closed */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-[#84CC16]/30 blur-xs animate-pulse -z-10" />
          )}

          {/* Icon state */}
          <div className="relative flex items-center justify-center">
            {isOpen ? (
              <X className="w-5 h-5 text-white transition-transform duration-200 group-hover:rotate-90" />
            ) : (
              <>
                <MessageSquare className="w-5 h-5 text-white transition-transform duration-200 group-hover:scale-110" />
                {/* Live green dot indicator */}
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84CC16] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#84CC16]" />
                </span>
              </>
            )}
          </div>

          {/* Label */}
          <span className="text-sm tracking-tight font-bold select-none">
            {isOpen ? 'Close Chat' : 'Live Chat'}
          </span>

          {/* Online badge highlight */}
          {!isOpen && (
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#84CC16] text-slate-950 uppercase tracking-wider">
              Online
            </span>
          )}

          {/* Unread badge dot */}
          {hasUnread && !isOpen && (
            <span className="sm:hidden absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#84CC16] text-slate-950 text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#071322]">
              1
            </span>
          )}
        </button>
      </div>
    </>
  );
};
