import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ArrowRight,
  Minimize2,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LiveChatWidgetProps {
  onOpenBookDemo: () => void;
  onOpenGetStarted: () => void;
}


interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    type: 'demo' | 'trial' | 'phone';
  };
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  onOpenBookDemo,
  onOpenGetStarted,
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'help' | 'contact'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);


  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: 'Hello! Welcome to NextSoftHr. I am Sarah from our Enterprise Solutions & Advisory Desk. How can we assist your HR, payroll, or workforce operations today?',
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages, isTyping]);

  const quickPrompts = [
    'Schedule an executive demo',
    'How does automated payroll work?',
    'Pricing for growing companies',
    'Pan-African tax compliance',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Simulated Intelligent Agent Response
    setTimeout(() => {
      let replyText =
        'Thank you for reaching out! Our advisory team is actively reviewing your request. How large is your current workforce, and what is your target deployment timeline?';
      let action: ChatMessage['action'] = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('demo') || lower.includes('schedule') || lower.includes('walkthrough')) {
        replyText =
          'We would love to show you a live interactive walkthrough of NextSoftHr tailored to your specific organizational structure. Would you like to reserve a personalized session right now?';
        action = { label: 'Book a Demo Walkthrough', type: 'demo' };
      } else if (lower.includes('payroll') || lower.includes('tax') || lower.includes('paye') || lower.includes('compliance')) {
        replyText =
          'NextSoftHr provides 100% automated gross-to-net payroll with built-in statutory compliance across Nigeria (PAYE, NHF, NSITF, Pension), Ghana (GRA, SSNIT), Kenya (KRA), and global markets with zero spreadsheet errors.';
        action = { label: 'Start 14-Day Free Trial', type: 'trial' };
      } else if (lower.includes('pricing') || lower.includes('cost') || lower.includes('plan')) {
        replyText =
          'NextSoftHr offers transparent plans tailored to your headcount: Starter (1-20 staff), Growth (20-150 staff), and Enterprise (150+ multi-entity). All include automated payroll and attendance.';
        action = { label: 'Explore Plans & Free Trial', type: 'trial' };
      } else if (lower.includes('african') || lower.includes('nigeria') || lower.includes('ghana') || lower.includes('kenya')) {
        replyText =
          'NextSoftHr is natively built for Pan-African cross-border operations and AfCFTA commerce, handling multi-currency disbursement and regional labor statutes from a single command center.';
        action = { label: 'Schedule Architecture Review', type: 'demo' };
      }

      const agentReply: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, agentReply]);
    }, 900);
  };

  const handleActionClick = (type: 'demo' | 'trial' | 'phone') => {
    if (type === 'demo') {
      onOpenBookDemo();
    } else if (type === 'trial') {
      onOpenGetStarted();
    } else if (type === 'phone') {
      window.location.href = 'tel:+2349158482622';
    }
  };

  return (
    <aside aria-label="Support & Live Chat" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
      {/* Floating Trigger Button */}
      {!isOpen ? (
        <div className="relative group">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#0A3F7E] dark:bg-[#072448] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-[#8EE000]"
            aria-label="Open Live Chat Support Dialog"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-[#8EE000]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#8EE000] ring-2 ring-[#0A3F7E] animate-pulse" />
            </div>

            <span className="font-bold text-xs sm:text-sm tracking-wide">
              {t('chat.trigger', 'Live Chat')}
            </span>

            {hasUnread && (
              <span className="hidden sm:inline-block px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#8EE000] text-slate-950 font-mono">
                Online
              </span>
            )}
          </button>

          {/* Hover Tooltip / Status Prompt */}
          <div className="absolute bottom-full right-0 mb-3 hidden group-hover:block transition-all pointer-events-none">
            <div className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-xl shadow-lg border border-slate-700 whitespace-nowrap flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8EE000] inline-block animate-ping" />
              <span>Need help? Chat with NextSoftHr Support</span>
            </div>
          </div>
        </div>
      ) : (
        /* Expanded Live Chat Dialog */
        <div className="w-[calc(100vw-2.5rem)] sm:w-96 md:w-[400px] h-[520px] max-h-[85vh] bg-white dark:bg-[#091E3A] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header Bar */}
          <div className="bg-[#051A33] text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#0A3F7E] flex items-center justify-center font-bold text-xs text-white ring-2 ring-[#8EE000]/80">
                  SH
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#8EE000] ring-2 ring-[#051A33]" />
              </div>

              <div>
                <div className="text-sm font-bold flex items-center gap-1.5">
                  <span>NextSoftHr Support Desk</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8EE000]" />
                </div>
                <div className="text-[11px] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8EE000] animate-pulse" />
                  <span>{t('chat.online', 'Online · Typical reply in < 2 mins')}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Minimize chat"
                aria-label="Minimize live chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Close chat"
                aria-label="Close live chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="bg-slate-50 dark:bg-[#07192F] px-3 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  activeTab === 'chat'
                    ? 'bg-[#0A3F7E] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {t('chat.tabChat', 'Live Chat')}
              </button>
              <button
                onClick={() => setActiveTab('help')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  activeTab === 'help'
                    ? 'bg-[#0A3F7E] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {t('chat.tabFaq', 'FAQ Topics')}
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  activeTab === 'contact'
                    ? 'bg-[#0A3F7E] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {t('chat.tabDirect', 'Direct Line')}
              </button>
            </div>


            <span className="text-[10px] font-mono text-[#8EE000] font-semibold">
              Live Channel
            </span>
          </div>

          {/* Tab 1: Live Conversation View */}
          {activeTab === 'chat' && (
            <>
              {/* Message History */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC] dark:bg-[#061528]">
                {/* Security and privacy reassurance badge */}
                <div className="text-center my-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400">
                    <ShieldCheck className="w-3 h-3 text-[#8EE000]" />
                    <span>Encrypted Client Support Session</span>
                  </span>
                </div>

                {messages.map((msg) => {
                  const isAgent = msg.sender === 'agent';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                          isAgent
                            ? 'bg-white dark:bg-[#0B1E36] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 shadow-xs'
                            : 'bg-[#0A3F7E] text-white font-medium rounded-tr-none'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Interactive CTA button inside agent message */}
                        {msg.action && (
                          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700">
                            <button
                              onClick={() => handleActionClick(msg.action!.type)}
                              className="w-full py-1.5 px-3 rounded-lg bg-[#8EE000] hover:bg-[#9EF01A] text-slate-950 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-xs border border-[#7BC500]"
                            >
                              <span>{msg.action.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-400 mt-1 font-mono px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center gap-1.5 p-2.5 max-w-[70px] bg-white dark:bg-[#0B1E36] rounded-2xl border border-slate-200 dark:border-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A3F7E] dark:bg-[#8EE000] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A3F7E] dark:bg-[#8EE000] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A3F7E] dark:bg-[#8EE000] animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Chips */}
              <div className="px-3 py-2 bg-white dark:bg-[#091E3A] border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <Sparkles className="w-3.5 h-3.5 text-[#8EE000] shrink-0" />
                {quickPrompts.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-[#8EE000]/20 hover:text-slate-900 dark:hover:text-white text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Input Field */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-white dark:bg-[#091E3A] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={t('chat.placeholder', 'Type your question or request...')}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#061528] text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0A3F7E] dark:focus:ring-[#8EE000]"
                />


                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2.5 rounded-xl bg-[#0A3F7E] hover:bg-[#082F60] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 text-[#8EE000]" />
                </button>
              </form>
            </>
          )}

          {/* Tab 2: FAQ Help Topics */}
          {activeTab === 'help' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 bg-[#F8FAFC] dark:bg-[#061528] text-xs">
              <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px] mb-1">
                Frequently Asked Inquiries
              </div>

              {[
                {
                  q: 'How does NextSoftHr automate statutory tax filings?',
                  a: 'Our calculation engine incorporates real-time PAYE, Pension, NHF, ITF, and NSITF formulas across jurisdictions, generating one-click export files for tax authorities.',
                },
                {
                  q: 'Can we integrate biometric fingerprint scanners?',
                  a: 'Yes. NextSoftHr connects to leading hardware biometric terminals, GPS-geofenced mobile employee apps, and web kiosks with bi-directional syncing.',
                },
                {
                  q: 'How long does implementation typically take?',
                  a: 'SME setups take under 48 hours with CSV employee imports. Enterprise multi-entity deployments take 5 to 10 business days including custom approval routing.',
                },
                {
                  q: 'Is our corporate workforce data secure?',
                  a: 'NextSoftHr enforces SOC2-standard encryption in transit and at rest, automated daily backups, role-based access controls, and full NDPR/GDPR compliance.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white dark:bg-[#0B1E36] rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5"
                >
                  <div className="font-bold text-slate-900 dark:text-white flex items-start gap-1.5">
                    <span className="text-[#0A3F7E] dark:text-[#8EE000] font-mono">Q.</span>
                    <span>{item.q}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 pl-4 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Direct Contact Information */}
          {activeTab === 'contact' && (
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#F8FAFC] dark:bg-[#061528] text-xs">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm font-heading">
                  Speak Directly with an Advisory Specialist
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                  Our regional consultants in Lagos, Nairobi, and London are available Monday to Saturday.
                </p>
              </div>

              <div className="space-y-2.5">
                <a
                  href="tel:+2349158482622"
                  className="p-3 bg-white dark:bg-[#0B1E36] rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3 hover:border-[#0A3F7E] dark:hover:border-[#8EE000] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0A3F7E]/10 dark:bg-[#8EE000]/10 text-[#0A3F7E] dark:text-[#8EE000] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Direct Phone & WhatsApp</div>
                    <div className="font-mono text-slate-600 dark:text-slate-300 text-xs">+2349158482622</div>
                  </div>
                </a>

                <a
                  href="mailto:insights@nextsofthr.org"
                  className="p-3 bg-white dark:bg-[#0B1E36] rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3 hover:border-[#0A3F7E] dark:hover:border-[#8EE000] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0A3F7E]/10 dark:bg-[#8EE000]/10 text-[#0A3F7E] dark:text-[#8EE000] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Email Advisory Desk</div>
                    <div className="font-mono text-slate-600 dark:text-slate-300 text-xs">insights@nextsofthr.org</div>
                  </div>
                </a>

                <div className="p-3 bg-white dark:bg-[#0B1E36] rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#8EE000]/10 text-[#8EE000] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Operating Hours</div>
                    <div className="text-slate-600 dark:text-slate-300 text-[11px]">8:00 AM – 7:00 PM WAT (Mon–Sat)</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBookDemo}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] transition-all flex items-center justify-center gap-1.5 shadow-xs border border-[#7BC500]"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Video Conference Walkthrough</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
