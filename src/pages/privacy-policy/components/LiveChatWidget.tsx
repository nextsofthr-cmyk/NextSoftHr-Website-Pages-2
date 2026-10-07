import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCheck,
  Minimize2,
  ExternalLink,
  HelpCircle,
  Headphones,
  Paperclip,
  Check,
  Copy,
  ChevronRight,
  FileText,
  User,
  Users
} from 'lucide-react';
import { Translations } from '../translations';

interface LiveChatWidgetProps {
  t: Translations;
  onOpenPrivacyModal: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  senderName: string;
  avatar?: string;
  text: string;
  time: string;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({ t, onOpenPrivacyModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'channels' | 'faq'>('chat');
  const [selectedDept, setSelectedDept] = useState<'privacy' | 'hr' | 'technical' | 'billing'>('privacy');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-1',
      sender: 'agent',
      senderName: 'Amina Bello (NextSoftHR Support)',
      text: t.liveChat.initialAgentGreeting,
      time: 'Just now',
    },
  ]);

  // Update initial message when language changes if no user messages sent yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].sender === 'agent') {
        return [
          {
            ...prev[0],
            text: t.liveChat.initialAgentGreeting,
          },
        ];
      }
      return prev;
    });
  }, [t.liveChat.initialAgentGreeting]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, activeTab]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setHasOpenedOnce(true);
      if (activeTab === 'chat') {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [isOpen, activeTab]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'You',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate smart support agent reply
    setTimeout(() => {
      setIsTyping(false);

      let reply = '';
      const lower = trimmed.toLowerCase();

      if (lower.includes('gdpr') || lower.includes('privacy') || lower.includes('delete') || lower.includes('dpo') || lower.includes('right') || lower.includes('rectification')) {
        reply = `Thank you for your inquiry regarding data privacy. Under NextSoftHR's data protection architecture, you have full statutory rights to access, rectify, or request deletion of personal records. For formal verification, you can also launch our DPO Request Form directly from this dialog.`;
      } else if (lower.includes('payroll') || lower.includes('salary') || lower.includes('tax') || lower.includes('payslip')) {
        reply = `NextSoftHR processes multi-tenant payroll with automated statutory tax calculations, multi-currency support, and encrypted ledger distribution. Our regional HR specialists are available to review your organization's custom pay schedules.`;
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('billing') || lower.includes('plan')) {
        reply = `NextSoftHR provides transparent per-employee subscription tiers tailored for micro, medium, and large enterprises across Africa and globally. Contact our billing desk or schedule an enterprise quote via sales@nextsofthr.org.`;
      } else if (lower.includes('demo') || lower.includes('trial') || lower.includes('contact')) {
        reply = `We'd love to show you the full platform! Our technical solutions engineering team can arrange a live demonstration customized for your company's workforce size. You can reach us directly at +2349158482622.`;
      } else {
        reply = `Thank you for reaching out to NextSoftHR Support! We've logged your request under ticket #NSH-${Math.floor(1000 + Math.random() * 9000)}. A representative from our ${t.liveChat.departments[selectedDept]} team is reviewing your message.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'agent',
          senderName: 'David Mensah (Senior Support Lead)',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const handleCopy = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && !hasOpenedOnce && (
          <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-[#0c1527] px-3.5 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-lg shadow-blue-900/10 text-xs font-medium text-slate-700 dark:text-slate-200 animate-bounce duration-1000">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84CC16] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#84CC16]"></span>
            </span>
            <span>{t.liveChat.statusOnline}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={t.liveChat.buttonLabel}
          className="relative group flex items-center gap-2.5 px-4 sm:px-5 py-3.5 rounded-full bg-gradient-to-r from-[#0F52BA] to-[#0A3D8F] hover:from-[#135ed4] hover:to-[#0c48a8] text-white font-semibold text-sm shadow-xl shadow-blue-600/30 hover:shadow-blue-600/45 focus:outline-hidden focus:ring-4 focus:ring-[#84CC16]/40 transition-all duration-300 transform active:scale-95 cursor-pointer"
        >
          <div className="relative">
            {isOpen ? (
              <X className="w-5 h-5 text-white transition-transform duration-200" />
            ) : (
              <MessageSquare className="w-5 h-5 text-white transition-transform duration-200" />
            )}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84CC16] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#84CC16] border border-blue-900"></span>
            </span>
          </div>

          <span className="hidden sm:inline tracking-wide font-medium">
            {t.liveChat.buttonLabel}
          </span>

          {unreadCount > 0 && !isOpen && (
            <span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#84CC16] text-[#052e16] text-xs font-bold leading-none shadow-xs">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Floating Dialog Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="live-chat-title"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[640px] h-[580px] bg-white dark:bg-[#0c1527] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-2xl shadow-slate-900/25 flex flex-col overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-bottom-5"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0F52BA] via-[#0D47A1] to-[#0A3370] text-white p-4 sm:p-5 flex-shrink-0 relative overflow-hidden">
            {/* Subtle glow accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#84CC16]/10 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />

            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white shadow-inner">
                    <Headphones className="w-5 h-5 text-[#84CC16]" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#84CC16] border-2 border-[#0F52BA] rounded-full"></span>
                </div>

                <div>
                  <h3 id="live-chat-title" className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                    {t.liveChat.headerTitle}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {t.liveChat.statusOnline}
                    </span>
                    <span className="text-blue-200/60 text-xs">•</span>
                    <span className="text-[11px] text-blue-100/80">{t.liveChat.replyTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title={t.liveChat.minimize}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title={t.liveChat.close}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 mt-4 p-1 bg-black/20 backdrop-blur-xs rounded-xl border border-white/10 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-white text-blue-950 font-bold shadow-xs'
                    : 'text-white/85 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.liveChat.tabChat}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('channels')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === 'channels'
                    ? 'bg-white text-blue-950 font-bold shadow-xs'
                    : 'text-white/85 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.liveChat.tabChannels}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === 'faq'
                    ? 'bg-white text-blue-950 font-bold shadow-xs'
                    : 'text-white/85 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.liveChat.tabFaq}
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/60 dark:bg-[#090e1a]/80">
            {/* TAB 1: Chat Stream */}
            {activeTab === 'chat' && (
              <>
                {/* Department Selector */}
                <div className="px-4 py-2.5 bg-white dark:bg-[#0c1527] border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs flex-shrink-0">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {t.liveChat.departmentLabel}
                  </span>
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value as any)}
                    className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0F52BA] cursor-pointer"
                  >
                    <option value="privacy">{t.liveChat.departments.privacy}</option>
                    <option value="hr">{t.liveChat.departments.hr}</option>
                    <option value="technical">{t.liveChat.departments.technical}</option>
                    <option value="billing">{t.liveChat.departments.billing}</option>
                  </select>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                  {/* Security notice banner */}
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900/60 text-[11px] text-blue-900 dark:text-blue-200 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0F52BA] dark:text-[#60A5FA] flex-shrink-0" />
                    <span>Communications are secured with end-to-end TLS encryption and compliant with enterprise privacy policies.</span>
                  </div>

                  {messages.map((msg) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 px-1">
                          {!isUser && (
                            <span className="w-4 h-4 rounded-full bg-[#0F52BA] text-white flex items-center justify-center text-[9px] font-bold">
                              NS
                            </span>
                          )}
                          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            {msg.senderName}
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">
                            {msg.time}
                          </span>
                        </div>

                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-2xs ${
                            isUser
                              ? 'bg-[#0F52BA] text-white rounded-tr-xs'
                              : 'bg-white dark:bg-[#111c33] border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}

                  {isTyping && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pl-2 py-1">
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F52BA] animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F52BA] animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F52BA] animate-bounce [animation-delay:0.4s]"></span>
                      </span>
                      <span className="text-[11px] italic">{t.liveChat.agentTyping}</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 bg-white dark:bg-[#0c1527] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 flex-shrink-0"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t.liveChat.placeholder}
                    className="flex-1 bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F52BA]/50 focus:border-[#0F52BA]"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    aria-label={t.liveChat.sendButton}
                    className="p-2.5 rounded-xl bg-[#0F52BA] hover:bg-[#0D47A1] disabled:opacity-40 disabled:hover:bg-[#0F52BA] text-white transition-all cursor-pointer flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}

            {/* TAB 2: Direct Support Channels */}
            {activeTab === 'channels' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                <div className="bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-[#0F52BA] dark:text-[#60A5FA] flex items-center justify-center">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {t.liveChat.callDirect}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          +2349158482622
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopy('+2349158482622', 'phone')}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs transition-colors cursor-pointer"
                        title="Copy number"
                      >
                        {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href="tel:+2349158482622"
                        className="px-2.5 py-1.5 rounded-lg bg-[#0F52BA] text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Call
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {t.liveChat.emailDesk}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          privacy@nextsofthr.org
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopy('privacy@nextsofthr.org', 'email')}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs transition-colors cursor-pointer"
                        title="Copy email"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href="mailto:privacy@nextsofthr.org"
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                      >
                        Email
                      </a>
                    </div>
                  </div>
                </div>

                {/* Operating hours */}
                <div className="bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                    <Clock className="w-4 h-4 text-[#84CC16]" />
                    <span>{t.liveChat.operatingHoursTitle}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t.liveChat.operatingHours}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-1">
                    Global multi-tenant incident escalation available 24/7 for Enterprise Tier customers.
                  </p>
                </div>

                {/* DPO Formal Form CTA */}
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-50 to-slate-100 dark:from-blue-950/40 dark:to-slate-900 border border-blue-200 dark:border-blue-900/60 text-xs">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {t.liveChat.needPrivacyAssistance}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-2.5">
                    Exercise statutory rights regarding data access, rectifications, deletions, or data processing agreements.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onOpenPrivacyModal();
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-[#0F52BA] hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#84CC16]" />
                    <span>{t.liveChat.privacyFormBtn}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Quick FAQs */}
            {activeTab === 'faq' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                {[
                  {
                    q: 'How do I submit an employee data rectification or access request?',
                    a: 'If you are an employee utilizing NextSoftHR ESS, please first reach out to your HR department (the Data Controller). Alternatively, launch our DPO Request form for direct escalation.',
                  },
                  {
                    q: 'What is the standard response time for GDPR/NDPR requests?',
                    a: 'NextSoftHR acknowledges formal requests within 48 business hours and fulfills complete statutory verification within thirty (30) calendar days.',
                  },
                  {
                    q: 'Where are NextSoftHR servers and data centers hosted?',
                    a: 'We utilize enterprise-grade Tier-IV sovereign cloud infrastructure with geographic redundancy, AES-256 at rest, and TLS 1.3 in transit.',
                  },
                  {
                    q: 'Can our organization sign a Data Processing Agreement (DPA)?',
                    a: 'Yes, enterprise DPAs including Standard Contractual Clauses (SCCs) are available for all corporate subscribers upon request to privacy@nextsofthr.org.',
                  },
                ].map((item, i) => (
                  <details
                    key={i}
                    className="group bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs"
                  >
                    <summary className="font-semibold text-slate-800 dark:text-slate-200 cursor-pointer list-none flex items-center justify-between gap-2">
                      <span>{item.q}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                    </summary>
                    <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-2 text-[11px]">
                      {item.a}
                    </p>
                  </details>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenPrivacyModal();
                  }}
                  className="w-full mt-3 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#0F52BA] dark:text-[#60A5FA]" />
                  <span>{t.liveChat.privacyFormBtn}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
