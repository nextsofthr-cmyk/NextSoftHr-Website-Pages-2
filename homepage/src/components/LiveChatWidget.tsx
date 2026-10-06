import { useState, useEffect, useRef, type FormEvent } from 'react';
import { 
  MessageCircle, X, Send, CheckCheck, Sparkles, Clock, ShieldCheck, 
  Phone, Mail, Headphones, HelpCircle, ChevronRight, ThumbsUp, 
  ThumbsDown, AlertCircle, FileText, Check, Bot, Search, ExternalLink,
  MessageSquare, User, Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SupportAgent {
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'busy' | 'away';
  specialty: string;
}

const SUPPORT_AGENTS: SupportAgent[] = [
  {
    name: 'Sarah Jenkins',
    role: 'Senior HR & Compliance Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    status: 'online',
    specialty: 'Payroll, Labor Law & Statutory Rules'
  },
  {
    name: 'Alex Rivera',
    role: 'Technical Integration Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    status: 'online',
    specialty: 'API, SSO, Biometric Hardware Sync'
  },
  {
    name: 'Elena Morales',
    role: 'Customer Success & Onboarding Lead',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    status: 'online',
    specialty: 'Employee Migration & Plan Customization'
  }
];

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user' | 'system';
  agentName?: string;
  agentAvatar?: string;
  text: string;
  timestamp: string;
  actions?: { label: string; action: string }[];
}

interface KnowledgeArticle {
  id: string;
  category: string;
  title: string;
  summary: string;
  steps: string[];
}

const KNOWLEDGE_BASE: KnowledgeArticle[] = [
  {
    id: 'kb-1',
    category: 'Payroll & Tax',
    title: 'How to run multi-country or off-cycle payroll',
    summary: 'Step-by-step guidance for calculating net wages, tax withholdings, and processing one-off bonuses.',
    steps: [
      'Navigate to Payroll > Pay Runs in your NextSofthr navigation bar.',
      'Select "Create Off-Cycle Run" or select your scheduled monthly cycle.',
      'Review pre-populated attendance, overtime, and leave deductions synced from Core HR.',
      'Click "Run Automated Tax Validation" to preview statutory compliance checks.',
      'Click "Approve & Direct Deposit" or export regional banking NACHA/SEPA/BACS files.'
    ]
  },
  {
    id: 'kb-2',
    category: 'Time & Biometrics',
    title: 'Connecting ZKTeco, Anviz or Hikvision biometric clocks',
    summary: 'Hardware integration and automated clock-in push to employee timesheets.',
    steps: [
      'Open Settings > Integrations > Biometric Terminals.',
      'Click "Register New Terminal" and enter your IP address or Cloud Device Serial.',
      'Map Device ID to your branch or department location.',
      'Verify real-time heartbeat test to confirm ping latency < 50ms.',
      'Punches automatically sync every 60 seconds with geofencing failover.'
    ]
  },
  {
    id: 'kb-3',
    category: 'Onboarding & Migration',
    title: 'Bulk employee import from Excel, Workday or BambooHR',
    summary: 'Migrate thousands of employee master records without data loss.',
    steps: [
      'Head to Core HR > Employee Directory > Bulk Actions > Import Data.',
      'Download our smart CSV/XLS template containing pre-mapped statutory fields.',
      'Paste your workforce data and upload the spreadsheet for AI field matching.',
      'Resolve any highlighted column discrepancies with the smart mapping assistant.',
      'Hit "Confirm Import" — automated welcome emails and portal access are dispatched.'
    ]
  },
  {
    id: 'kb-4',
    category: 'Compliance & Leave',
    title: 'Customizing accrual policies and public holiday calendars',
    summary: 'Configure tiered vacation rules, rollover caps, and statutory sick leaves.',
    steps: [
      'Go to Leave Management > Policy Settings > Add Leave Type.',
      'Define accrual frequency (monthly prorated, annual lump sum, or hours worked).',
      'Set regional holiday calendars based on employee work location.',
      'Enable manager approval hierarchies (Single-tier, Multi-tier, or Auto-Approve).',
      'Changes reflect instantly on mobile Employee Self-Service (ESS).'
    ]
  }
];

export const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'ticket' | 'help'>('chat');
  const [hasUnreadAlert, setHasUnreadAlert] = useState(true);
  const [selectedAgent] = useState<SupportAgent>(SUPPORT_AGENTS[0]);

  // Chat conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      agentName: 'Sarah Jenkins',
      agentAvatar: SUPPORT_AGENTS[0].avatar,
      text: "👋 Hi there! I'm Sarah from the NextSofthr Support & Solutions Team. How can our team assist you today?",
      timestamp: 'Just now',
      actions: [
        { label: 'Schedule Live Platform Demo', action: 'demo' },
        { label: 'Payroll & Tax Compliance', action: 'payroll' },
        { label: 'Biometrics & Time Attendance', action: 'attendance' },
        { label: 'Pricing & Volume Quote', action: 'pricing' },
        { label: 'Connect with a Support Engineer', action: 'human' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<string | null>(null);

  // Ticket Form State
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketRefId, setTicketRefId] = useState('');
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    department: 'General Support',
    priority: 'Medium',
    message: ''
  });

  // Knowledge base search
  const [kbSearch, setKbSearch] = useState('');
  const [expandedKbId, setExpandedKbId] = useState<string | null>('kb-1');

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen, activeTab]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleDialog = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setHasUnreadAlert(false);
    }
  };

  const handleActionClick = (action: string) => {
    let userText = '';
    let responseText = '';
    let chosenAgent = selectedAgent;

    switch (action) {
      case 'demo':
        userText = 'I would like to schedule a personalized live demo of NextSofthr.';
        responseText = "I'd love to set that up! Our solution architects can walk you through automated payroll, attendance geofencing, and AI employee self-service. You can click 'Book a Demo' at the top of the page, or share your work email and team size right here, and I'll send an instant calendar invite!";
        break;
      case 'payroll':
        userText = 'I have questions about multi-country payroll and statutory tax filing.';
        chosenAgent = SUPPORT_AGENTS[0];
        responseText = "NextSofthr automates gross-to-net calculations, statutory social security, pension deductions, and direct bank disbursement across 45+ jurisdictions. Are you currently running payroll in-house, or looking to switch from a legacy provider?";
        break;
      case 'attendance':
        userText = 'How does NextSofthr connect with physical biometric hardware or mobile GPS clocking?';
        chosenAgent = SUPPORT_AGENTS[1];
        responseText = "We support direct cloud integration with all major biometric devices (ZKTeco, Anviz, Hikvision, Suprema) as well as GPS geofenced mobile clock-ins with facial verification. Punches sync in real-time straight into timecards!";
        break;
      case 'pricing':
        userText = 'Can I get a volume discount or custom quote for our organization?';
        chosenAgent = SUPPORT_AGENTS[2];
        responseText = "Certainly! We offer modular packages starting at $2/employee/month, with volume tier discounts for organizations with 50+ members. You can test out our interactive ROI Calculator in the pricing section or let us know your headcount!";
        break;
      case 'human':
        userText = 'Please connect me with a dedicated support engineer.';
        chosenAgent = SUPPORT_AGENTS[1];
        responseText = "Connecting you now... Alex Rivera (Technical Integration Engineer) is available! Please describe your request or issue below, and you can also request an immediate phone callback or WhatsApp session.";
        break;
      default:
        userText = action;
        responseText = "Thank you for reaching out! A member of our support team will assist you with that shortly.";
    }

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        agentName: chosenAgent.name,
        agentAvatar: chosenAgent.avatar,
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMsg]);
    }, 1200);
  };

  const handleSendMessage = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Context-aware response simulation
    setTimeout(() => {
      setIsTyping(false);
      let reply = "Thank you for providing that detail. Our support engineers have received your inquiry. If you need urgent assistance, feel free to use the 'Submit Ticket' tab or call our direct hotline at +1 (800) 555-6398.";
      
      const lower = text.toLowerCase();
      if (lower.includes('price') || lower.includes('cost') || lower.includes('plan')) {
        reply = "Our pricing is transparent and scalable: Starter ($2/user/mo), Professional ($4/user/mo), and Enterprise (Custom SLA & Dedicated Account Manager). Would you like a customized proposal?";
      } else if (lower.includes('api') || lower.includes('integrate') || lower.includes('webhook')) {
        reply = "NextSofthr features open REST APIs and webhooks for syncing with ERPs (SAP, NetSuite, QuickBooks), Slack, Microsoft Teams, and Active Directory / Google Workspace SSO. Documentation is available in our developer portal.";
      } else if (lower.includes('tax') || lower.includes('payroll') || lower.includes('salary')) {
        reply = "Our payroll engine updates automated tax tables and statutory compliance monthly. It includes one-click payslip distribution via web and mobile ESS!";
      } else if (lower.includes('whatsapp') || lower.includes('phone') || lower.includes('call')) {
        reply = "You can chat with our support team on WhatsApp at +1 555 234 7890 or request an instant callback by opening the 'Contact Agents' tab!";
      }

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        agentName: selectedAgent.name,
        agentAvatar: selectedAgent.avatar,
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMsg]);
    }, 1300);
  };

  const handleTicketSubmit = (e: FormEvent) => {
    e.preventDefault();
    const generatedId = `NX-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketRefId(generatedId);
    setTicketSubmitted(true);
    try {
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.8 } });
    } catch {}
  };

  const resetTicketForm = () => {
    setTicketSubmitted(false);
    setTicketForm({
      name: '',
      email: '',
      department: 'General Support',
      priority: 'Medium',
      message: ''
    });
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent("Hi NextSofthr Support Team, I am requesting immediate support assistance with our platform.");
    window.open(`https://wa.me/15552347890?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const filteredArticles = KNOWLEDGE_BASE.filter(item => 
    item.title.toLowerCase().includes(kbSearch.toLowerCase()) ||
    item.summary.toLowerCase().includes(kbSearch.toLowerCase()) ||
    item.category.toLowerCase().includes(kbSearch.toLowerCase())
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none" id="live-chat-widget-root">
      
      {/* Help Dialog Popover */}
      {isOpen && (
        <div
          ref={dialogRef}
          id="live-chat-help-dialog"
          role="dialog"
          aria-labelledby="live-chat-heading"
          className="pointer-events-auto mb-4 w-[92vw] sm:w-[420px] max-h-[85vh] sm:max-h-[640px] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden animate-fadeIn transition-all duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 p-4 sm:p-5 text-white relative shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white ring-2 ring-white/25">
                    <Headphones className="w-6 h-6 text-lime-400" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-lime-400 border-2 border-blue-900 rounded-full animate-pulse" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 id="live-chat-heading" className="font-display font-bold text-base text-white tracking-tight">
                      NextSofthr Support Desk
                    </h2>
                    <span className="text-[10px] bg-lime-400/20 text-lime-300 border border-lime-400/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Live
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100 text-xs mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                    <span>3 Agents Online • Avg reply &lt; 2 min</span>
                  </div>
                </div>
              </div>

              <button
                id="close-live-chat-dialog"
                onClick={toggleDialog}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close Live Chat Dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Support Agent Avatars Strip */}
            <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-white/15 text-xs text-blue-100">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2 overflow-hidden">
                  {SUPPORT_AGENTS.map((agent, i) => (
                    <img
                      key={i}
                      src={agent.avatar}
                      alt={agent.name}
                      title={`${agent.name} (${agent.role})`}
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-blue-700 object-cover"
                    />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-blue-100">
                  Sarah, Alex &amp; Elena ready to assist
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-lime-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>24/7 SLA</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-3 gap-1 mt-3 bg-black/20 p-1 rounded-xl text-xs font-semibold">
              <button
                id="tab-chat"
                onClick={() => setActiveTab('chat')}
                className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'chat' 
                    ? 'bg-white text-blue-800 shadow-sm' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Live Chat</span>
              </button>

              <button
                id="tab-ticket"
                onClick={() => setActiveTab('ticket')}
                className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'ticket' 
                    ? 'bg-white text-blue-800 shadow-sm' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Contact Agents</span>
              </button>

              <button
                id="tab-help"
                onClick={() => setActiveTab('help')}
                className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'help' 
                    ? 'bg-white text-blue-800 shadow-sm' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Instant Help</span>
              </button>
            </div>
          </div>

          {/* Dialog Content Area */}
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950/70 overflow-hidden">
            
            {/* TAB 1: LIVE CHAT */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col min-h-0">
                {/* Chat Messages Log */}
                <div 
                  ref={chatScrollRef}
                  className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs text-slate-800 dark:text-slate-200"
                >
                  <div className="text-center my-1">
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs">
                      Connected with Priority Support Agent
                    </span>
                  </div>

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'agent' && (
                        <img
                          src={msg.agentAvatar || selectedAgent.avatar}
                          alt={msg.agentName || 'Agent'}
                          className="w-7 h-7 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 mt-0.5 shrink-0"
                        />
                      )}

                      <div className={`max-w-[85%] ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm shadow-sm'
                          : 'bg-white dark:bg-slate-800 p-3.5 rounded-2xl rounded-tl-sm border border-slate-200 dark:border-slate-700/80 shadow-xs text-slate-800 dark:text-slate-200'
                      }`}>
                        {msg.sender === 'agent' && msg.agentName && (
                          <div className="flex items-center justify-between mb-1 gap-2">
                            <span className="font-bold text-[11px] text-blue-700 dark:text-blue-400">
                              {msg.agentName}
                            </span>
                            <span className="text-[9px] text-slate-500 dark:text-slate-400 flex items-center gap-0.5">
                              <ShieldCheck className="w-2.5 h-2.5 text-lime-500" />
                              Official Agent
                            </span>
                          </div>
                        )}

                        <p className="leading-relaxed whitespace-pre-line text-[11.5px]">
                          {msg.text}
                        </p>

                        {/* Interactive Suggestion Actions */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/80 space-y-1.5">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                              Choose a topic to begin:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.actions.map((act, i) => (
                                <button
                                  key={i}
                                  onClick={() => handleActionClick(act.action)}
                                  className="text-left px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/60 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-300 border border-slate-200 dark:border-slate-600 text-[11px] font-medium transition-all flex items-center gap-1"
                                >
                                  <span>{act.label}</span>
                                  <ChevronRight className="w-3 h-3 text-slate-400" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className={`flex items-center justify-end gap-1 mt-1.5 text-[9px] ${
                          msg.sender === 'user' ? 'text-blue-200' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          <Clock className="w-2.5 h-2.5" />
                          <span>{msg.timestamp}</span>
                          {msg.sender === 'user' && (
                            <CheckCheck className="w-3 h-3 text-blue-200 ml-0.5" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-2.5 items-center">
                      <img
                        src={selectedAgent.avatar}
                        alt="Agent"
                        className="w-7 h-7 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                      />
                      <div className="bg-white dark:bg-slate-800 py-2 px-3 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
                          {selectedAgent.name} is typing
                        </span>
                        <span className="flex gap-0.5">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Feedback rating snippet after conversation started */}
                  {messages.length >= 3 && !feedbackGiven && (
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px]">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">
                        How is Sarah's response?
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setFeedbackGiven('helpful')}
                          className="px-2 py-1 rounded bg-white dark:bg-slate-700 hover:bg-emerald-50 text-slate-700 dark:text-slate-200 hover:text-emerald-700 border border-slate-200 dark:border-slate-600 text-xs flex items-center gap-1 transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3 text-emerald-600" />
                          <span>Helpful</span>
                        </button>
                        <button
                          onClick={() => setFeedbackGiven('not-helpful')}
                          className="px-2 py-1 rounded bg-white dark:bg-slate-700 hover:bg-rose-50 text-slate-700 dark:text-slate-200 hover:text-rose-700 border border-slate-200 dark:border-slate-600 text-xs flex items-center gap-1 transition-colors"
                        >
                          <ThumbsDown className="w-3 h-3 text-rose-500" />
                          <span>Needs info</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {feedbackGiven && (
                    <div className="text-center py-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center justify-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Thank you for rating our support agent!</span>
                    </div>
                  )}
                </div>

                {/* Chat Input & Fast Actions */}
                <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                  <form onSubmit={handleSendMessage} className="relative flex items-center">
                    <input
                      id="live-chat-input"
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your question for support..."
                      className="w-full pl-3.5 pr-20 py-2.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
                    />
                    <button
                      id="live-chat-send-btn"
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="absolute right-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>Send</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </form>

                  <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500 dark:text-slate-400 px-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      Encrypted Support Session
                    </span>
                    <button
                      onClick={openWhatsApp}
                      className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>WhatsApp Hotline</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CONTACT SUPPORT AGENTS (TICKET / PHONE / WHATSAPP) */}
            {activeTab === 'ticket' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {!ticketSubmitted ? (
                  <div>
                    <div className="mb-3">
                      <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                        Connect Directly with an HR &amp; Tech Specialist
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                        Submit a priority ticket or choose direct contact channels for immediate assistance.
                      </p>
                    </div>

                    {/* Quick Direct Channel Cards */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button
                        onClick={openWhatsApp}
                        className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 hover:border-emerald-400 text-left transition-all group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                            WhatsApp Agent
                          </span>
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <p className="text-[10px] text-emerald-700 dark:text-emerald-400">
                          Instant mobile chat with specialist
                        </p>
                      </button>

                      <a
                        href="tel:18005556398"
                        className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 hover:border-blue-400 text-left transition-all group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300">
                            Support Hotline
                          </span>
                          <Phone className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <p className="text-[10px] text-blue-700 dark:text-blue-400">
                          +1 (800) 555-6398 (Toll Free)
                        </p>
                      </a>
                    </div>

                    {/* Support Ticket Submission Form */}
                    <form onSubmit={handleTicketSubmit} className="space-y-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                          Submit Priority Support Ticket
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={ticketForm.name}
                            onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                            placeholder="HR Manager / Admin"
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={ticketForm.email}
                            onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                            placeholder="admin@company.com"
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Department
                          </label>
                          <select
                            value={ticketForm.department}
                            onChange={(e) => setTicketForm({ ...ticketForm, department: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white"
                          >
                            <option>General Support</option>
                            <option>Payroll &amp; Tax Calculation</option>
                            <option>Time &amp; Biometrics Integration</option>
                            <option>Custom Implementation</option>
                            <option>Billing &amp; License</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Urgency Level
                          </label>
                          <select
                            value={ticketForm.priority}
                            onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white"
                          >
                            <option>Medium (Standard inquiry)</option>
                            <option>High (Payroll or login blocker)</option>
                            <option>Critical (Live system halt)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Issue Description *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={ticketForm.message}
                          onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                          placeholder="Please provide details so our technical specialists can investigate..."
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Ticket to Support Engineers</span>
                      </button>
                    </form>
                  </div>
                ) : (
                  /* Ticket Success Confirmation */
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center animate-fadeIn space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto ring-4 ring-emerald-50 dark:ring-emerald-900/30">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                        Support Ticket Created!
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                        Our Tier-2 engineering team has received your request and logged it into our CRM queue.
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-left text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Ticket Reference:</span>
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{ticketRefId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Assigned To:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Alex Rivera (Integration Lead)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Expected Response:</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">&lt; 15 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Confirmation sent to:</span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[160px]">{ticketForm.email}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={resetTicketForm}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
                      >
                        Submit Another
                      </button>
                      <button
                        onClick={() => setActiveTab('chat')}
                        className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Back to Chat</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: INSTANT HELP & KNOWLEDGE BASE */}
            {activeTab === 'help' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    Self-Service Knowledge Base
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                    Find instant answers to common platform, tax, and hardware questions.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={kbSearch}
                    onChange={(e) => setKbSearch(e.target.value)}
                    placeholder="Search articles (payroll, biometrics, import)..."
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 shadow-xs"
                  />
                  {kbSearch && (
                    <button
                      onClick={() => setKbSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Article Accordion List */}
                <div className="space-y-2 pt-1">
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => {
                      const isExpanded = expandedKbId === article.id;
                      return (
                        <div
                          key={article.id}
                          className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all shadow-xs"
                        >
                          <button
                            onClick={() => setExpandedKbId(isExpanded ? null : article.id)}
                            className="w-full p-3 text-left flex items-start justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <div>
                              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 inline-block mb-1">
                                {article.category}
                              </span>
                              <h4 className="font-semibold text-xs text-slate-900 dark:text-white leading-snug">
                                {article.title}
                              </h4>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 text-slate-400 mt-1 shrink-0 transition-transform ${
                                isExpanded ? 'rotate-90 text-blue-600' : ''
                              }`}
                            />
                          </button>

                          {isExpanded && (
                            <div className="px-3.5 pb-3.5 pt-1 text-slate-600 dark:text-slate-300 text-xs border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                                {article.summary}
                              </p>
                              <ol className="list-decimal list-inside space-y-1 text-[11px] bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700/60">
                                {article.steps.map((step, idx) => (
                                  <li key={idx} className="leading-relaxed">
                                    <span className="text-slate-800 dark:text-slate-200">{step}</span>
                                  </li>
                                ))}
                              </ol>
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-[10px] text-slate-400">Still have questions?</span>
                                <button
                                  onClick={() => {
                                    setActiveTab('chat');
                                    handleActionClick(`I have a follow-up question regarding ${article.title}`);
                                  }}
                                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-[11px] flex items-center gap-0.5"
                                >
                                  <span>Ask in Live Chat</span>
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-6 text-slate-500">
                      <HelpCircle className="w-8 h-8 mx-auto text-slate-300 mb-1" />
                      <p className="text-xs">No articles matching "{kbSearch}"</p>
                      <button
                        onClick={() => setActiveTab('chat')}
                        className="mt-2 text-xs text-blue-600 font-semibold hover:underline"
                      >
                        Ask an agent directly in Live Chat
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) at Bottom-Right */}
      <div className="pointer-events-auto flex items-center gap-3">
        {/* Unread Message / Agent Online Toast when chat is closed */}
        {!isOpen && hasUnreadAlert && (
          <div 
            onClick={toggleDialog}
            id="live-chat-toast-bubble"
            className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold shadow-2xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-blue-400 transition-all animate-bounce select-none group"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-500" />
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                Support agents online
              </span>
              <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                Need help? Live Chat with us
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasUnreadAlert(false);
              }}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
              aria-label="Dismiss chat alert"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Primary Floating 'Live Chat' Icon Button */}
        <button
          id="floating-live-chat-button"
          onClick={toggleDialog}
          aria-expanded={isOpen}
          aria-label="Open Live Chat to contact support agents"
          className={`relative group p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-500/40 ${
            isOpen 
              ? 'bg-slate-900 text-white rotate-90 scale-95 ring-2 ring-slate-700' 
              : 'bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-600 hover:from-blue-800 hover:to-indigo-700 text-white hover:scale-105 active:scale-95 ring-4 ring-blue-600/20'
          }`}
        >
          {/* Subtle pulse ring when closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-blue-500 opacity-25 animate-ping pointer-events-none" />
          )}

          {isOpen ? (
            <X className="w-6 h-6 text-white transition-transform" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-white fill-white/10 stroke-[2.2]" />
              
              {/* Green online badge indicator */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-lime-400 border-2 border-blue-800 rounded-full" />
            </div>
          )}

          {/* Floating pill label on hover for desktop */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold whitespace-nowrap shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity hidden md:flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5 text-lime-400" />
            <span>Live Chat Support</span>
          </span>
        </button>
      </div>
    </div>
  );
};
