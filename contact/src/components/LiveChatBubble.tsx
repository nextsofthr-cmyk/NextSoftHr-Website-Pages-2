import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Phone, 
  Sparkles, 
  Clock, 
  UserCheck, 
  Minimize2, 
  Maximize2, 
  Calendar, 
  ExternalLink, 
  ShieldCheck, 
  Mail, 
  Headphones, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { BRAND } from '../data/content';

interface Message {
  id: string;
  sender: 'agent' | 'user' | 'system';
  agentName?: string;
  agentRole?: string;
  agentAvatar?: string;
  text: string;
  timestamp: string;
  quickReplies?: string[];
}

interface LiveChatBubbleProps {
  onOpenDemo?: () => void;
  onOpenSales?: () => void;
}

export const LiveChatBubble: React.FC<LiveChatBubbleProps> = ({
  onOpenDemo,
  onOpenSales,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'channels'>('chat');
  const [hasUnread, setHasUnread] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Callback form state in the Help Dialog
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackTopic, setCallbackTopic] = useState('Payroll & Statutory Deductions');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      agentName: 'Amara Okafor',
      agentRole: 'Support & Workforce Specialist',
      agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      text: 'Hello! Welcome to NextSofthr Support. How can our technical & payroll agents help your organization today?',
      timestamp: 'Just now',
      quickReplies: [
        'Multi-country Payroll Help',
        'Talk to a Live Support Agent',
        'Book a 15-Min System Demo',
        'Request Urgent Callback',
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages, isTyping, activeTab]);

  const handleSendMessage = (textToSend?: string) => {
    const content = textToSend || inputText.trim();
    if (!content) return;

    const userMsgId = `user-${Date.now()}`;
    const userMessage: Message = {
      id: userMsgId,
      sender: 'user',
      text: content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');

    // Simulate Agent Typing & Response
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Thank you for contacting NextSofthr Support. Our team has received your query and can assist you directly or connect you with a regional specialist.";
      let quickOptions: string[] = ['Speak on WhatsApp', 'Request Immediate Callback', 'Contact Sales Team'];

      const lower = content.toLowerCase();
      if (lower.includes('demo') || lower.includes('walkthrough')) {
        replyText = "We would love to show you how NextSofthr automates payroll, attendance, and employee management. You can schedule a 1-on-1 walkthrough right away!";
        quickOptions = ['Schedule Walkthrough Now', 'Contact Sales Team', 'Multi-currency Payroll'];
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('plan')) {
        replyText = "NextSofthr pricing scales flexibly based on your workforce headcount—from startups and SMEs to enterprise organizations across Africa and globally.";
        quickOptions = ['View Pricing Options', 'Talk to Sales', 'Book a System Demo'];
      } else if (lower.includes('payroll') || lower.includes('tax') || lower.includes('nigeria') || lower.includes('kenya') || lower.includes('ghana')) {
        replyText = "NextSofthr includes automated statutory tax calculations and deductions for Nigeria (PAYE, NHF, Pension, ITF), Ghana (GRA, SSNIT), Kenya (KRA, NSSF, NHIF), South Africa, Rwanda, and 10+ other African countries.";
        quickOptions = ['View Statutory Compliance', 'Book a Demo', 'Speak to Support'];
      } else if (lower.includes('support') || lower.includes('agent') || lower.includes('help') || lower.includes('human')) {
        replyText = "Our support specialists are standing by 24/7. You can speak with a live agent immediately via phone at +234 915 848 2622 or via our dedicated WhatsApp channel.";
        quickOptions = ['Call Direct Line', 'Open WhatsApp Support', 'Request Urgent Callback'];
      } else if (lower.includes('callback') || lower.includes('call')) {
        replyText = "We can arrange a callback right away! Please switch to the 'Support Channels' tab or enter your phone number here.";
        quickOptions = ['Switch to Channels Tab', 'Open WhatsApp Support', 'Call Direct Line'];
      }

      const botReply: Message = {
        id: `reply-${Date.now()}`,
        sender: 'agent',
        agentName: 'Amara Okafor',
        agentRole: 'Support & Workforce Specialist',
        agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: quickOptions
      };

      setMessages((prev) => [...prev, botReply]);
    }, 1100);
  };

  const handleQuickReply = (reply: string) => {
    if (reply === 'Book a 15-Min System Demo' || reply === 'Schedule Walkthrough Now') {
      if (onOpenDemo) onOpenDemo();
      handleSendMessage(reply);
      return;
    }
    if (reply === 'Talk to a Live Support Agent' || reply === 'Speak to Support') {
      setActiveTab('channels');
      return;
    }
    if (reply === 'Request Urgent Callback' || reply === 'Switch to Channels Tab') {
      setActiveTab('channels');
      return;
    }
    if (reply === 'Contact Sales Team' || reply === 'Talk to Sales') {
      if (onOpenSales) onOpenSales();
      handleSendMessage(reply);
      return;
    }
    if (reply === 'Call Direct Line') {
      window.location.href = `tel:${BRAND.phoneRaw}`;
      return;
    }
    if (reply === 'Open WhatsApp Support' || reply === 'Speak on WhatsApp') {
      window.open(`https://wa.me/${BRAND.whatsappRaw}`, '_blank');
      return;
    }
    handleSendMessage(reply);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName.trim() || !callbackPhone.trim()) return;
    setCallbackSubmitted(true);
  };

  if (!isVisible && !isOpen) {
    return null;
  }

  return (
    <>
      {/* Persistent Floating Live Chat Icon at Bottom-Right */}
      <aside 
        aria-label="Live Chat Support"
        className={`fixed z-40 bottom-24 sm:bottom-6 right-4 sm:right-6 transition-all duration-300 ${
          isOpen ? 'scale-0 pointer-events-none opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="group relative flex items-center gap-3 bg-[#1769E0] hover:bg-[#1255b8] text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl shadow-[#1769E0]/50 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#C8F000]/60 cursor-pointer"
          aria-label="Open Live Chat Help Dialog"
          title="Need help? Chat with NextSofthr Support"
        >
          {/* Support Agent Avatar with Active Pulse */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
              alt="Support Agent"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white/90 shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#C8F000] border-2 border-[#1769E0] rounded-full animate-pulse"></span>
          </div>

          <div className="hidden sm:flex flex-col text-left pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold font-display text-white">Live Chat</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C8F000]"></span>
            </div>
            <span className="text-[10px] text-blue-100 font-medium tracking-tight">
              Support Online • Fast Reply
            </span>
          </div>

          <div className="sm:hidden w-7 h-7 flex items-center justify-center bg-white/10 rounded-full">
            <Headphones className="w-4 h-4 text-white" />
          </div>

          {/* Attention Badge */}
          {hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8F000] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#C8F000] text-[#0B1F3A] text-[9px] font-black items-center justify-center">
                1
              </span>
            </span>
          )}
        </button>
      </aside>

      {/* Help Dialog Modal Overlay to Contact Support Agents */}
      {isOpen && (
        <section 
          aria-labelledby="help-dialog-heading"
          className="fixed inset-0 z-50 flex items-end sm:items-end justify-end p-0 sm:p-6 pointer-events-none"
        >
          {/* Backdrop on mobile for clarity */}
          <div 
            className="fixed inset-0 bg-black/40 sm:bg-transparent backdrop-blur-[2px] sm:backdrop-blur-none pointer-events-auto transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Help Dialog Card */}
          <div 
            className={`pointer-events-auto relative w-full sm:w-[420px] bg-white dark:bg-[#0B1F3A] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 ${
              isMinimized ? 'h-[72px]' : 'h-[85vh] sm:h-[630px] max-h-[90vh]'
            }`}
          >
            {/* Header */}
            <div className="bg-[#0B1F3A] p-4 text-white flex items-center justify-between border-b border-white/10 relative">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                    alt="Agent"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#C8F000]/70"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#C8F000] border-2 border-[#0B1F3A] rounded-full"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 id="help-dialog-heading" className="font-bold text-sm text-white font-display">
                      NextSofthr Support Desk
                    </h3>
                    <span className="text-[9px] bg-[#C8F000] text-[#0B1F3A] font-extrabold px-1.5 py-0.5 rounded">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8F000] inline-block animate-pulse"></span>
                    Amara Okafor • Replies in &lt; 2 mins
                  </p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1 text-slate-300">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title={isMinimized ? 'Expand Dialog' : 'Minimize Dialog'}
                  aria-label={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Close Help Dialog"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dialog Content */}
            {!isMinimized && (
              <>
                {/* Mode Tabs: Live Chat vs Direct Support Channels */}
                <div className="grid grid-cols-2 bg-slate-100 dark:bg-[#08172c] border-b border-slate-200 dark:border-white/10 p-1">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === 'chat'
                        ? 'bg-white dark:bg-[#0E2442] text-[#1769E0] dark:text-[#C8F000] shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Live Chat</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('channels')}
                    className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === 'channels'
                        ? 'bg-white dark:bg-[#0E2442] text-[#1769E0] dark:text-[#C8F000] shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    <span>Contact Channels</span>
                  </button>
                </div>

                {activeTab === 'chat' ? (
                  /* TAB 1: REAL-TIME LIVE CHAT */
                  <>
                    {/* Secondary Fast Pathway Bar */}
                    <div className="bg-[#F7FAFC] dark:bg-slate-900/60 px-4 py-2 border-b border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#1769E0]" />
                        <span>Average agent reply: <strong>Under 2 mins</strong></span>
                      </div>
                      <a
                        href={`https://wa.me/${BRAND.whatsappRaw}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1769E0] dark:text-[#C8F000] font-semibold hover:underline flex items-center gap-1 text-[11px]"
                      >
                        WhatsApp
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Messages List Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-[#08172c]">
                      {/* Security Notice */}
                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/80 py-1.5 px-3 rounded-full border border-slate-200 dark:border-white/5 max-w-fit mx-auto shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#1769E0]" />
                        <span>Direct encrypted session with support staff</span>
                      </div>

                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            msg.sender === 'user' ? 'items-end' : 'items-start'
                          }`}
                        >
                          <div className="flex items-end gap-2 max-w-[85%]">
                            {msg.sender === 'agent' && (
                              <img
                                src={msg.agentAvatar}
                                alt={msg.agentName}
                                className="w-6 h-6 rounded-full object-cover flex-shrink-0 mb-1 ring-1 ring-slate-200"
                              />
                            )}

                            <div
                              className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-xs ${
                                msg.sender === 'user'
                                  ? 'bg-[#1769E0] text-white rounded-br-none'
                                  : 'bg-white dark:bg-[#0E2442] text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-white/10 rounded-bl-none'
                              }`}
                            >
                              <p>{msg.text}</p>
                              <span
                                className={`block text-[10px] mt-1 text-right ${
                                  msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                                }`}
                              >
                                {msg.timestamp}
                              </span>
                            </div>
                          </div>

                          {/* Quick Reply Pills */}
                          {msg.quickReplies && msg.quickReplies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2 ml-8 max-w-[90%]">
                              {msg.quickReplies.map((reply, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleQuickReply(reply)}
                                  className="text-xs bg-white dark:bg-[#122b4d] hover:bg-[#C8F000] hover:text-[#0B1F3A] dark:hover:bg-[#C8F000] dark:hover:text-[#0B1F3A] text-[#1769E0] dark:text-blue-300 font-medium px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/60 transition-all duration-150 shadow-xs cursor-pointer text-left"
                                >
                                  {reply}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 ml-8">
                          <div className="flex space-x-1 bg-white dark:bg-[#0E2442] px-3 py-2 rounded-2xl rounded-bl-none border border-slate-200 dark:border-white/10 shadow-xs">
                            <span className="w-1.5 h-1.5 bg-[#1769E0] rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-[#1769E0] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-1.5 h-1.5 bg-[#1769E0] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                          </div>
                          <span className="text-[11px]">Amara is typing...</span>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>

                    {/* Fast Bottom Action Bar */}
                    <div className="px-3 py-2 bg-slate-100 dark:bg-slate-900/80 border-t border-slate-200 dark:border-white/5 flex items-center justify-between gap-2 overflow-x-auto">
                      <button
                        onClick={() => {
                          if (onOpenDemo) onOpenDemo();
                          handleSendMessage('I would like to schedule a product demo.');
                        }}
                        className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:text-[#1769E0] whitespace-nowrap px-2.5 py-1 rounded bg-white dark:bg-slate-800 shadow-xs cursor-pointer"
                      >
                        <Calendar className="w-3 h-3 text-[#1769E0]" />
                        Book Demo
                      </button>
                      <button
                        onClick={() => setActiveTab('channels')}
                        className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:text-[#1769E0] whitespace-nowrap px-2.5 py-1 rounded bg-white dark:bg-slate-800 shadow-xs cursor-pointer"
                      >
                        <UserCheck className="w-3 h-3 text-[#C8F000]" />
                        All Channels
                      </button>
                      <a
                        href={`tel:${BRAND.phoneRaw}`}
                        className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:text-[#1769E0] whitespace-nowrap px-2.5 py-1 rounded bg-white dark:bg-slate-800 shadow-xs"
                      >
                        <Phone className="w-3 h-3 text-green-500" />
                        Call Agent
                      </a>
                    </div>

                    {/* Input Form */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="p-3 bg-white dark:bg-[#0B1F3A] border-t border-slate-200 dark:border-white/10 flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your message to support..."
                        className="flex-1 text-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                      />
                      <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="p-2.5 rounded-xl bg-[#1769E0] hover:bg-[#1255b8] text-white disabled:opacity-40 disabled:hover:bg-[#1769E0] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C8F000] cursor-pointer"
                        aria-label="Send message"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </>
                ) : (
                  /* TAB 2: DIRECT SUPPORT AGENT CONTACT CHANNELS & CALLBACK */
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-[#08172c]">
                    <div className="text-center pb-2">
                      <h4 className="text-sm font-bold text-[#0B1F3A] dark:text-white">
                        Connect with NextSofthr Support Agents
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Multiple fast pathways to reach our dedicated team immediately.
                      </p>
                    </div>

                    {/* Direct Contact Cards */}
                    <div className="space-y-2.5">
                      {/* Telephone */}
                      <a
                        href={`tel:${BRAND.phoneRaw}`}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#0E2442] border border-slate-200 dark:border-white/10 hover:border-[#1769E0] transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-green-50 dark:bg-green-950/60 text-green-600 dark:text-green-400 flex items-center justify-center">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Direct Telephone Desk</div>
                            <div className="text-sm font-bold text-[#0B1F3A] dark:text-white font-mono">{BRAND.phone}</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#1769E0] dark:text-[#C8F000] group-hover:underline">
                          Call Agent &rarr;
                        </span>
                      </a>

                      {/* WhatsApp */}
                      <a
                        href={`https://wa.me/${BRAND.whatsappRaw}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#0E2442] border border-slate-200 dark:border-white/10 hover:border-emerald-500 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Instant WhatsApp Support</div>
                            <div className="text-sm font-bold text-[#0B1F3A] dark:text-white">Chat on WhatsApp</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                          Open WhatsApp &rarr;
                        </span>
                      </a>

                      {/* Email */}
                      <a
                        href={`mailto:${BRAND.supportEmail}`}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#0E2442] border border-slate-200 dark:border-white/10 hover:border-[#1769E0] transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#1769E0] dark:text-blue-400 flex items-center justify-center">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Official Support Email</div>
                            <div className="text-sm font-bold text-[#0B1F3A] dark:text-white">{BRAND.supportEmail}</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#1769E0] dark:text-[#C8F000] group-hover:underline">
                          Email Us &rarr;
                        </span>
                      </a>
                    </div>

                    {/* Quick Callback Request Card */}
                    <div className="p-4 rounded-xl bg-white dark:bg-[#0E2442] border border-slate-200 dark:border-white/10 shadow-xs">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#0B1F3A] dark:text-white uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5 text-[#1769E0] dark:text-[#C8F000]" />
                        <span>Request Priority Callback</span>
                      </div>

                      {callbackSubmitted ? (
                        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 text-center space-y-1">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                          <div className="text-xs font-bold text-green-800 dark:text-green-300">
                            Callback Queued Successfully!
                          </div>
                          <p className="text-[11px] text-green-700 dark:text-green-400">
                            A NextSofthr support specialist will call {callbackPhone} shortly.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleCallbackSubmit} className="space-y-2.5">
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={callbackName}
                            onChange={(e) => setCallbackName(e.target.value)}
                            className="w-full text-xs px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#1769E0]"
                          />
                          <input
                            type="tel"
                            required
                            placeholder="Phone Number (e.g. +234...)"
                            value={callbackPhone}
                            onChange={(e) => setCallbackPhone(e.target.value)}
                            className="w-full text-xs px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#1769E0]"
                          />
                          <select
                            value={callbackTopic}
                            onChange={(e) => setCallbackTopic(e.target.value)}
                            className="w-full text-xs px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#1769E0]"
                          >
                            <option>Payroll &amp; Statutory Deductions</option>
                            <option>Account Access &amp; User Setup</option>
                            <option>Employee Self-Service App</option>
                            <option>Enterprise Integration &amp; API</option>
                          </select>
                          <button
                            type="submit"
                            className="w-full py-2 px-3 rounded-lg bg-[#C8F000] text-[#0B1F3A] hover:bg-[#b8dd00] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>Have an Agent Call Me</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      )}
                    </div>

                    <div className="pt-2 text-center">
                      <button
                        onClick={() => setActiveTab('chat')}
                        className="text-xs text-[#1769E0] dark:text-[#C8F000] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>&larr; Return to Real-Time Chat</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};
