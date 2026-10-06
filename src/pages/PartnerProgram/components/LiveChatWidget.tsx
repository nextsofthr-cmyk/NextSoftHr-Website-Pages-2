import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  MessageCircle,
  X, 
  Send, 
  Phone, 
  Mail, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  User, 
  Headphones, 
  Calendar,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
  Building2,
  FileText
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  agentName?: string;
  agentAvatar?: string;
  text: string;
  time: string;
}

interface LiveChatWidgetProps {
  onGoToApply?: () => void;
}

const SUPPORT_AGENTS = [
  {
    name: 'Amara K.',
    role: 'Partner Success Lead',
    location: 'Lagos',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    status: 'Online'
  },
  {
    name: 'David M.',
    role: 'Partner Solutions Engineer',
    location: 'London',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    status: 'Online'
  },
  {
    name: 'Tunde O.',
    role: 'Channel Onboarding Specialist',
    location: 'Nairobi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    status: 'Online'
  }
];

const COMMON_TOPICS = [
  "🚀 How quickly can I get onboarded as a partner?",
  "💰 When and how are recurring commissions paid?",
  "🖥️ Can I get a personalized demo for my clients?",
  "🤝 How does NextSofthr protect partner-client accounts?"
];

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({ onGoToApply }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'channels' | 'ticket'>('chat');
  const [hasUnreadAlert, setHasUnreadAlert] = useState<boolean>(true);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isAgentTyping, setIsAgentTyping] = useState<boolean>(false);
  
  // Ticket / Callback form state
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General Partner Inquiry',
    message: ''
  });
  const [isTicketSubmitted, setIsTicketSubmitted] = useState<boolean>(false);
  const [ticketRefId, setTicketRefId] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'agent-welcome',
      sender: 'agent',
      agentName: 'Amara (Partner Desk)',
      agentAvatar: SUPPORT_AGENTS[0].avatar,
      text: "Hello! Welcome to NextSofthr Partner Support. I'm Amara from the Partner Success team. How can our agents assist you with our channel program or client onboarding today?",
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnreadAlert(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      if (activeTab === 'chat') {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [isOpen, activeTab, messages]);

  const handleSendMessage = (customText?: string) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsAgentTyping(true);

    // Simulate realistic live agent response based on context
    setTimeout(() => {
      let replyText = "Thank you for reaching out! Our partner team has logged your inquiry. You can also call us directly or chat via WhatsApp at +2349158482622 for immediate priority support.";
      const lower = textToSend.toLowerCase();

      if (lower.includes('onboard') || lower.includes('quick') || lower.includes('start')) {
        replyText = "Partner onboarding takes less than 24-48 hours! Once you submit the application form, our Partner Success team approves your account, issues your Partner ID, and grants access to your Partner Portal and sales materials.";
      } else if (lower.includes('commission') || lower.includes('pay') || lower.includes('money') || lower.includes('percent') || lower.includes('margin')) {
        replyText = "Commissions range from 15% (Bronze) up to 40% (Platinum) recurring for as long as your client stays subscribed to NextSofthr. Commission remittances are calculated and settled monthly into your designated bank account.";
      } else if (lower.includes('demo') || lower.includes('client') || lower.includes('show')) {
        replyText = "We offer dedicated sandbox demo environments and customized co-branded demonstration sessions for your prospects. Would you like us to schedule a 15-minute partner orientation call?";
      } else if (lower.includes('protect') || lower.includes('account') || lower.includes('lead')) {
        replyText = "NextSofthr guarantees strict Partner Account Protection. When you register a lead or onboard a client in your portal, that account is permanently linked to your partner code with guaranteed lifetime recurring revenue attribution.";
      } else if (lower.includes('whatsapp') || lower.includes('phone') || lower.includes('call')) {
        replyText = "You can reach our live partner hotline directly at +2349158482622 or via WhatsApp for 24/7 priority support across Africa and international regions.";
      }

      const agentReply: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        agentName: 'David (Solutions)',
        agentAvatar: SUPPORT_AGENTS[1].avatar,
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, agentReply]);
      setIsAgentTyping(false);
    }, 1200);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `NST-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketRefId(generatedId);
    setIsTicketSubmitted(true);
  };

  return (
    <>
      {/* FLOATING 'LIVE CHAT' ICON (BOTTOM-RIGHT) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        
        {/* Floating Unread Teaser Bubble */}
        {!isOpen && hasUnreadAlert && (
          <div className="mb-2.5 relative group animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-[#071D3E] text-white border border-[#B8F010] rounded-2xl px-4 py-2.5 shadow-2xl text-xs max-w-[260px] flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-900 border border-blue-600 flex items-center justify-center text-[#B8F010]">
                  <Headphones className="w-4 h-4" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#B8F010] border border-[#071D3E]" />
              </div>
              <div className="text-[11px] leading-tight">
                <span className="text-[#B8F010] font-black block">Live Support Online</span>
                <span className="text-slate-300">Chat with a NextSofthr partner specialist</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHasUnreadAlert(false);
                }}
                className="text-slate-400 hover:text-white p-0.5 ml-auto"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Triangular pointer */}
            <div className="w-3 h-3 bg-[#071D3E] border-r border-b border-[#B8F010] transform rotate-45 absolute -bottom-1.5 right-6" />
          </div>
        )}

        {/* Live Chat Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Live Chat Help Dialog"
          className={`flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 group border-2 ${
            isOpen
              ? 'bg-[#040E1F] border-slate-400 text-white'
              : 'bg-gradient-to-r from-[#071D3E] via-[#0D2D5E] to-[#1B58B0] border-[#B8F010] text-white hover:scale-105 hover:shadow-[0_0_25px_rgba(184,240,16,0.45)]'
          }`}
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5 text-slate-300 group-hover:text-white" />
              <span className="text-xs font-bold tracking-wide">Close Help</span>
            </>
          ) : (
            <>
              <div className="relative">
                <MessageSquare className="w-5 h-5 text-[#B8F010] group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8F010] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B8F010]" />
                </span>
              </div>
              <span className="text-xs font-extrabold text-white tracking-wide">
                Live Chat
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#B8F010]/20 text-[#B8F010] border border-[#B8F010]/30">
                Online
              </span>
            </>
          )}
        </button>
      </div>

      {/* LIVE CHAT & HELP DIALOG MODAL / WINDOW */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[430px] h-[600px] max-h-[calc(100vh-120px)] bg-[#071D3E] border-2 border-blue-600 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#040E1F] via-[#071D3E] to-[#0A2652] border-b border-blue-800 relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#B8F010] flex items-center justify-center text-[#040E1F] font-black text-xs shadow-md">
                  NS
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                    NextSofthr Partner Help Desk
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-blue-200">
                    <span className="w-2 h-2 rounded-full bg-[#B8F010] animate-pulse" />
                    <span>3 Agents Online • Avg reply &lt; 2 min</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-blue-950/80 hover:bg-blue-900 border border-blue-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                title="Close Help Dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Active Support Agents Avatars */}
            <div className="flex items-center justify-between pt-2 border-t border-blue-900/60 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2">
                  {SUPPORT_AGENTS.map((agent, i) => (
                    <img
                      key={i}
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-7 h-7 rounded-full border-2 border-[#071D3E] object-cover"
                      title={`${agent.name} (${agent.role} - ${agent.location})`}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-slate-300 pl-1">
                  Amara, David & Tunde are active
                </span>
              </div>
              <span className="text-[10px] text-[#B8F010] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Desk
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-[#040E1F]/70 p-1 rounded-xl border border-blue-900 mt-3">
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'chat'
                    ? 'bg-[#B8F010] text-[#040E1F] shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Live Chat</span>
              </button>

              <button
                onClick={() => setActiveTab('channels')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'channels'
                    ? 'bg-[#B8F010] text-[#040E1F] shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call & WA</span>
              </button>

              <button
                onClick={() => setActiveTab('ticket')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'ticket'
                    ? 'bg-[#B8F010] text-[#040E1F] shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Callback</span>
              </button>
            </div>
          </div>

          {/* TAB 1: LIVE CHAT */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden bg-[#040E1F]">
              
              {/* Chat Thread */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
                {messages.map((msg) => {
                  const isAgent = msg.sender === 'agent';

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${isAgent ? 'justify-start' : 'justify-end'}`}
                    >
                      {isAgent && (
                        <img
                          src={msg.agentAvatar || SUPPORT_AGENTS[0].avatar}
                          alt={msg.agentName}
                          className="w-7 h-7 rounded-full object-cover border border-blue-700 shrink-0 mt-0.5"
                        />
                      )}

                      <div className={`max-w-[82%] space-y-1 ${isAgent ? 'text-slate-200' : 'text-white'}`}>
                        {isAgent && msg.agentName && (
                          <div className="text-[10px] font-bold text-slate-400">
                            {msg.agentName}
                          </div>
                        )}

                        <div
                          className={`p-3 rounded-2xl leading-relaxed text-xs shadow-md ${
                            isAgent
                              ? 'bg-[#071D3E] border border-blue-800 text-slate-200 rounded-tl-sm'
                              : 'bg-blue-600 text-white rounded-tr-sm'
                          }`}
                        >
                          <p>{msg.text}</p>
                        </div>

                        <span className="text-[9px] text-slate-500 block px-1">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Agent Typing Indicator */}
                {isAgentTyping && (
                  <div className="flex gap-2.5 items-center">
                    <img
                      src={SUPPORT_AGENTS[1].avatar}
                      alt="Agent Typing"
                      className="w-7 h-7 rounded-full object-cover border border-blue-700 shrink-0"
                    />
                    <div className="bg-[#071D3E] border border-blue-800 p-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#B8F010] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[#B8F010] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-[#B8F010] rounded-full animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[10px] text-slate-400 ml-1">Support agent is replying...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick FAQ / Prompt Starters */}
              {messages.length <= 2 && (
                <div className="px-4 py-2 border-t border-blue-900/60 bg-[#071D3E]/40">
                  <div className="text-[10px] font-bold text-slate-400 mb-1">
                    Suggested partner questions:
                  </div>
                  <div className="space-y-1">
                    {COMMON_TOPICS.slice(0, 2).map((topic, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(topic)}
                        className="text-[11px] text-blue-200 hover:text-[#B8F010] bg-blue-950/60 border border-blue-800/80 px-2.5 py-1 rounded-md block w-full text-left truncate transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-3 bg-[#071D3E] border-t border-blue-800/80">
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
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message to our support desk..."
                    className="flex-1 bg-[#040E1F] border border-blue-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#B8F010]"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isAgentTyping}
                    className="p-2.5 rounded-xl bg-[#B8F010] text-[#040E1F] hover:bg-[#CBFF1A] disabled:opacity-40 transition-all font-bold shrink-0 shadow"
                    title="Send"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-1">
                  <span>Hotline: +2349158482622</span>
                  <a
                    href="https://wa.me/2349158482622?text=Hello%20NextSofthr%20Support%20Team%2C%20I%20have%20an%20inquiry%20about%20the%20Partner%20Program."
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#B8F010] hover:underline flex items-center gap-1 font-semibold"
                  >
                    Switch to WhatsApp &rarr;
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CALL & DIRECT CHANNELS */}
          {activeTab === 'channels' && (
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#040E1F] text-xs">
              
              <div className="text-center pb-2">
                <h4 className="text-sm font-extrabold text-white">Direct Support Channels</h4>
                <p className="text-[11px] text-slate-300">Connect instantly with human partner directors.</p>
              </div>

              {/* WhatsApp Instant Channel */}
              <a
                href="https://wa.me/2349158482622?text=Hello%20NextSofthr%20Support%20Team%2C%20I%20have%20an%20inquiry%20about%20the%20Partner%20Program."
                target="_blank"
                rel="noreferrer"
                className="block p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-emerald-900/40 border border-emerald-500/50 hover:border-emerald-400 transition-all group shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white group-hover:text-emerald-300 flex items-center gap-1.5">
                        WhatsApp Live Desk
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">Fastest</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">+2349158482622</p>
                      <p className="text-[10px] text-emerald-400/90 mt-1">Available 24/7 for partner inquiries & demo bookings</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>

              {/* Direct Telephone Hotline */}
              <a
                href="tel:+2349158482622"
                className="block p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-blue-900/40 border border-blue-600/50 hover:border-[#B8F010] transition-all group shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white group-hover:text-[#B8F010]">
                        Direct Phone Hotline
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">+2349158482622</p>
                      <p className="text-[10px] text-blue-200/90 mt-1">Mon - Sat: 8:00 AM - 7:00 PM (WAT)</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>

              {/* Email Support */}
              <a
                href="mailto:partner@nextsofthr.org?subject=NextSofthr%20Partner%20Inquiry"
                className="block p-4 rounded-2xl bg-gradient-to-r from-slate-900/80 to-[#071D3E] border border-blue-800/80 hover:border-slate-400 transition-all group shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white group-hover:text-slate-200">
                        Official Partner Email
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">partner@nextsofthr.org</p>
                      <p className="text-[10px] text-slate-400 mt-1">In-depth partnership proposals & enterprise SLAs</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>

              {/* Physical Support Hubs */}
              <div className="p-3.5 rounded-xl bg-[#071D3E] border border-blue-800 text-[11px] space-y-1.5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#B8F010]" />
                  Global Regional Partner Hubs:
                </span>
                <p className="text-slate-300">
                  • <strong>Lagos, Nigeria:</strong> Africa Regional Headquarters<br />
                  • <strong>London, UK:</strong> International Channel Desk<br />
                  • <strong>Nairobi, Kenya:</strong> East Africa Support Office
                </p>
              </div>

            </div>
          )}

          {/* TAB 3: REQUEST A CALLBACK / SUPPORT TICKET */}
          {activeTab === 'ticket' && (
            <div className="flex-1 p-5 overflow-y-auto bg-[#040E1F] text-xs">
              
              {!isTicketSubmitted ? (
                <div>
                  <div className="text-center mb-4">
                    <h4 className="text-sm font-extrabold text-white">Request a Partner Callback</h4>
                    <p className="text-[11px] text-slate-300">An assigned Partner Director will call or email you within 15 minutes.</p>
                  </div>

                  <form onSubmit={handleTicketSubmit} className="space-y-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Samuel Adeyemi"
                        value={ticketForm.name}
                        onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071D3E] border border-blue-700 text-xs text-white focus:outline-none focus:border-[#B8F010]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="samuel@yourfirm.com"
                        value={ticketForm.email}
                        onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071D3E] border border-blue-700 text-xs text-white focus:outline-none focus:border-[#B8F010]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Phone or WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 800 000 0000"
                        value={ticketForm.phone}
                        onChange={(e) => setTicketForm({ ...ticketForm, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071D3E] border border-blue-700 text-xs text-white focus:outline-none focus:border-[#B8F010]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={ticketForm.category}
                        onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071D3E] border border-blue-700 text-xs text-white focus:outline-none focus:border-[#B8F010]"
                      >
                        <option>General Partner Inquiry</option>
                        <option>Commission & Payout Schedule</option>
                        <option>Request Live Client Demo</option>
                        <option>Enterprise Integration & API</option>
                        <option>White-label / Custom Portal</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Brief Note / Request
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Tell us about your client portfolio or questions..."
                        value={ticketForm.message}
                        onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071D3E] border border-blue-700 text-xs text-white focus:outline-none focus:border-[#B8F010]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#B8F010] text-[#040E1F] font-extrabold text-xs hover:bg-[#CBFF1A] transition-all flex items-center justify-center gap-2 shadow-lg mt-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Callback Request</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#B8F010] text-[#040E1F] mx-auto flex items-center justify-center font-black">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  
                  <div>
                    <h4 className="text-base font-extrabold text-white">Callback Dispatched!</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Reference ID: <strong className="text-[#B8F010]">{ticketRefId}</strong>
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#071D3E] border border-blue-800 text-left text-[11px] text-slate-300 space-y-1">
                    <div><strong>Assigned Specialist:</strong> Amara K. (Lead)</div>
                    <div><strong>Expected Call:</strong> Within 15 minutes</div>
                    <div><strong>Destination:</strong> {ticketForm.phone}</div>
                  </div>

                  <button
                    onClick={() => {
                      setIsTicketSubmitted(false);
                      setActiveTab('chat');
                    }}
                    className="text-xs text-[#B8F010] underline font-bold"
                  >
                    Return to Live Chat
                  </button>
                </div>
              )}

            </div>
          )}

          {/* Footer Bar */}
          <div className="px-5 py-2.5 bg-[#040E1F] border-t border-blue-900/80 flex items-center justify-between text-[10px] text-slate-400">
            <span>NextSofthr Partner Ecosystem</span>
            <span className="text-[#B8F010] font-semibold">www.nextsofthr.org</span>
          </div>

        </div>
      )}
    </>
  );
};
