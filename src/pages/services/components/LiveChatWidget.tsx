import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  MessageCircle,
  X,
  Send,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Headphones,
  Paperclip,
  HelpCircle,
} from 'lucide-react';

interface LiveChatWidgetProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  time: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  onOpenDemo,
  onOpenGetStarted,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'contact'>('chat');
  const [hasUnread, setHasUnread] = useState<boolean>(true);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'agent',
      text: 'Hello! Welcome to NextSofthr. I am Tolu from the African Client Advisory team. How can we help your business today?',
      time: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate realistic human support agent response
    setTimeout(() => {
      let replyText =
        'Thank you for reaching out! Our solutions team is reviewing this. You can also reach our direct phone support line immediately at +234 915 848 2622.';
      let actionObj: ChatMessage['action'] | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('whatsapp') || lower.includes('whatsap')) {
        replyText =
          'You can chat directly with our sales and customer advisory team on WhatsApp at +234 915 848 2622! Click below to open WhatsApp.';
        actionObj = {
          label: 'Open WhatsApp Chat (+234 915 848 2622)',
          onClick: () => {
            window.open(
              'https://wa.me/2349158482622?text=Hello%20NextSofthr%20Sales%20Team%2C%20I%20would%20like%20to%20make%20an%20inquiry%20regarding%20your%20HR%20%26%20Payroll%20platform.',
              '_blank',
              'noopener,noreferrer'
            );
          },
        };
      } else if (lower.includes('demo') || lower.includes('tour') || lower.includes('presentation')) {
        replyText =
          'We would love to show you a personalized walkthrough tailored to your headcount and industry. Would you like to schedule a live demo with an HR advisor?';
        actionObj = {
          label: 'Book a Live Demo Now',
          onClick: onOpenDemo,
        };
      } else if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost') || lower.includes('quote')) {
        replyText =
          'NextSofthr offers tiered plans starting from micro-teams (1-15 staff) up to multi-country enterprise conglomerates. You can test the platform completely free for 14 days without a credit card.';
        actionObj = {
          label: 'Start Free 14-Day Trial',
          onClick: onOpenGetStarted,
        };
      } else if (lower.includes('payroll') || lower.includes('tax') || lower.includes('pension') || lower.includes('cra')) {
        replyText =
          'NextSofthr natively computes PAYE, Pension, NHF, NSITF, and ITF according to national tax laws across Nigeria, Ghana, Kenya, Rwanda, South Africa, and more.';
      } else if (lower.includes('attendance') || lower.includes('biometric') || lower.includes('clock')) {
        replyText =
          'Yes! We connect with ZKTeco turnstiles, mobile geofencing, QR codes, and facial biometric terminals directly into our real-time payroll ledger.';
      }

      const agentReply: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: actionObj,
      };

      setMessages((prev) => [...prev, agentReply]);
      setIsTyping(false);
    }, 1200);
  };

  const quickPrompts = [
    'Chat on WhatsApp',
    'How does NextSofthr calculate Nigerian PAYE & Pension?',
    'Can we integrate our biometric turnstile devices?',
    'Book a personalized platform demo',
    'What are your pricing plans?',
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Unread teaser tooltip if closed */}
        {!isOpen && hasUnread && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-[#0D2644] text-[#0A2540] dark:text-white shadow-xl border border-slate-200 dark:border-blue-800 text-xs font-bold cursor-pointer hover:scale-103 transition-transform animate-in fade-in slide-in-from-right duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse" />
            <span>Chat with African HR Advisor</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close Live Support Chat' : 'Open Live Support Chat'}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative cursor-pointer ${
            isOpen
              ? 'bg-[#0A2540] dark:bg-[#07182E] text-white rotate-90 border border-slate-700 dark:border-blue-700'
              : 'bg-gradient-to-tr from-[#0256C4] to-[#014197] hover:from-[#0256C4] hover:to-[#84CC16] text-white hover:scale-105 shadow-blue-500/30'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6" />
              {hasUnread && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#84CC16] ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </>
          )}
        </button>
      </div>

      {/* Pop-up Live Chat Dialog Container */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="NextSofthr Live Support"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[540px] max-h-[85vh] bg-white dark:bg-[#0A2540] rounded-3xl shadow-2xl border border-slate-200 dark:border-blue-900 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 transition-colors"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#0A2540] via-[#0256C4] to-[#0A2540] p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                    alt="Tolu Support Advisor"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#84CC16]"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#84CC16] ring-2 ring-[#0A2540]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Tolu &amp; NextSofthr Team
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#84CC16] text-[#0A2540] font-black">
                      ACTIVE
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#84CC16]" /> Typically replies in under 3 mins
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Minimize Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs (Live Chat vs Direct Contact) */}
            <div className="flex rounded-xl bg-black/20 p-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-white text-[#0A2540] font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Live Messaging
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === 'contact'
                    ? 'bg-white text-[#0A2540] font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Call &amp; Direct Channels
              </button>
            </div>
          </div>

          {/* TAB 1: Live Chat Conversation */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-[#07182E]">
              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="text-center my-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-300 bg-white dark:bg-[#0A2540] px-2.5 py-1 rounded-full border border-slate-200 dark:border-blue-900">
                    Encrypted African Client Support
                  </span>
                </div>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-[#0256C4] text-white rounded-tr-xs'
                          : 'bg-white dark:bg-[#0D2644] text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-blue-800 rounded-tl-xs'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Optional Interactive CTA button inside chat */}
                      {msg.action && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-blue-900/60">
                          <button
                            onClick={msg.action.onClick}
                            className="w-full py-1.5 px-3 rounded-lg bg-[#84CC16] hover:bg-[#73b612] text-[#0A2540] font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>{msg.action.label}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-1.5 bg-white dark:bg-[#0D2644] border border-slate-200 dark:border-blue-800 text-slate-500 dark:text-slate-300 rounded-2xl rounded-tl-xs px-3 py-2 w-max text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0256C4] dark:bg-[#84CC16] animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#0256C4] dark:bg-[#84CC16] animate-bounce"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#0256C4] dark:bg-[#84CC16] animate-bounce"
                      style={{ animationDelay: '0.3s' }}
                    />
                    <span className="ml-1 text-[11px] text-slate-400 dark:text-slate-400">Tolu is typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Inquiry Pills Bar */}
              <div className="p-2 bg-white dark:bg-[#0A2540] border-t border-slate-200/80 dark:border-blue-900/60 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[11px] font-semibold text-[#0256C4] dark:text-[#84CC16] bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800 shrink-0 transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-white dark:bg-[#0A2540] border-t border-slate-200 dark:border-blue-900/60 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask a question or describe an issue..."
                  className="flex-1 bg-slate-100 dark:bg-[#07182E] hover:bg-slate-50 dark:hover:bg-[#0D2644] focus:bg-white dark:focus:bg-[#0D2644] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-blue-800 focus:outline-none focus:ring-2 focus:ring-[#0256C4] dark:focus:ring-[#84CC16] text-slate-800 dark:text-white placeholder-slate-400"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-10 h-10 rounded-xl bg-[#0256C4] hover:bg-[#024bb0] disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white flex items-center justify-center transition-colors shrink-0 shadow-sm cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: Direct Contact & Hotline Channels */}
          {activeTab === 'contact' && (
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 dark:bg-[#07182E]">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 mb-1">
                  Immediate African Hotlines
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Connect with a dedicated implementation consultant in real-time.
                </p>
              </div>

              {/* WhatsApp Sales Channel */}
              <a
                href="https://wa.me/2349158482622?text=Hello%20NextSofthr%20Sales%20Team%2C%20I%20would%20like%20to%20make%20an%20inquiry%20regarding%20the%20NextSofthr%20HR%20%26%20Payroll%20platform."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-[#0A2540] border border-emerald-300 dark:border-emerald-800/80 hover:border-[#25D366] hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 dark:bg-emerald-950 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#25D366] font-extrabold uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                      WhatsApp Sales Desk
                    </div>
                    <div className="text-sm font-extrabold text-[#0A2540] dark:text-white">+234 915 848 2622</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Instant direct chat with African sales advisor</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Direct Phone */}
              <a
                href="tel:+2349158482622"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-[#0A2540] border border-slate-200 dark:border-blue-900/60 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-[#0D2644] text-[#0256C4] dark:text-[#84CC16] flex items-center justify-center group-hover:bg-[#84CC16] group-hover:text-[#0A2540] transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-400 font-bold uppercase">Direct Phone Hotline</div>
                    <div className="text-sm font-extrabold text-[#0A2540] dark:text-white">+234 915 848 2622</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Email Support */}
              <a
                href="mailto:nextsofthr@gmail.com"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-[#0A2540] border border-slate-200 dark:border-blue-900/60 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-[#84CC16] group-hover:text-[#0A2540] transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-400 font-bold uppercase">Support Email</div>
                    <div className="text-sm font-bold text-[#0A2540] dark:text-white">nextsofthr@gmail.com</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">support@nextsofthr.org</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Book Dedicated Session */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-[#0A2540] text-white space-y-2 border border-blue-800">
                <div className="flex items-center gap-1.5 text-xs text-[#84CC16] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Personalized Walkthrough</span>
                </div>
                <h5 className="text-sm font-bold">Need a strategic HR architecture review?</h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Book a 20-minute screen-share with a senior solutions engineer.
                </p>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenDemo();
                  }}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-[#84CC16] hover:bg-[#73b612] text-[#0A2540] font-black text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book 1-on-1 Guided Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Office Operating Hours */}
              <div className="p-3 bg-slate-100 dark:bg-[#0A2540] rounded-xl text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 border border-slate-200 dark:border-blue-900/60">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  Hours: Mon–Fri, 8:00 AM – 6:00 PM (WAT / GMT+1). Urgent server monitoring is 24/7.
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
