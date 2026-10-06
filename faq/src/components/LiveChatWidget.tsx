import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Headphones,
  CheckCircle2,
  Calendar,
  Sparkles,
  Paperclip,
  Clock,
  ArrowRight,
  ShieldCheck,
  Minimize2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LiveChatWidgetProps {
  onOpenDemo: () => void;
  onOpenSupport: () => void;
  onOpenAI: (prompt?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  agentName?: string;
  text: string;
  time: string;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  onOpenDemo,
  onOpenSupport,
  onOpenAI,
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'agent',
      agentName: 'Kemi (Advisory Lead)',
      text: t('chat.welcome', 'Hello! Welcome to NextSoftHR. I am Kemi from our client advisory team. How can we assist you today with workforce management, payroll calculations, or implementation?'),
      time: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickInquiries = [
    t('chat.query1', 'How does NextSoftHR handle statutory payroll taxes?'),
    t('chat.query2', 'Can you help our company migrate employee records?'),
    t('chat.query3', 'What are the pricing tiers for small teams?'),
    t('chat.query4', 'Can we speak to an implementation advisor?'),
  ];

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate authentic human agent response
    setTimeout(() => {
      let agentReply = '';
      const lower = text.toLowerCase();

      if (lower.includes('payroll') || lower.includes('tax') || lower.includes('salary')) {
        agentReply = "Our payroll engine calculates all local statutory taxes (PAYE, Pension, health levies, etc.) automatically. Our payroll specialists can also manage full disbursement for your branches if desired. Would you like to schedule a 15-minute payroll review call with our advisory desk?";
      } else if (lower.includes('migrate') || lower.includes('import') || lower.includes('data')) {
        agentReply = "We provide complimentary data migration assistance! Our implementation specialists migrate your employee history, open leave balances, and salary grades from spreadsheets or legacy systems with zero downtime.";
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('plan')) {
        agentReply = "NextSoftHR plans start at $2.50 per employee/month for Starter and $4.50 for Growth (with attendance, GPS mobile clock-in, and ATS). You can also test any tier free for 14 days without a credit card.";
      } else if (lower.includes('demo') || lower.includes('speak') || lower.includes('advisor') || lower.includes('call')) {
        agentReply = "I would be delighted to connect you directly with a dedicated solutions architect. You can click 'Book a Demo' below to choose a time that fits your schedule, or submit a priority ticket and an advisor will call you within 30 minutes.";
      } else {
        agentReply = `Thank you for reaching out regarding "${text}". Our live support engineers and consultants are on standby. Would you like to book a 1-on-1 walkthrough, or should I open an expedited support ticket for your team?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          agentName: 'Marcus (Support Desk)',
          text: agentReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <>
      {/* Floating Trigger Button at Bottom-Right */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 border border-blue-600 focus-visible:outline-2 focus-visible:outline-lime-400"
            aria-label="Open Live Chat with NextSoftHR support agents"
          >
            {/* Live Indicator Dot */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-400 border border-white dark:border-slate-900" />
            </span>

            <MessageCircle className="w-5 h-5 text-white" />
            
            <span className="tracking-tight font-bold">{t('chat.online', 'Live Chat')}</span>

            {/* Unread indicator */}
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-lime-400 text-slate-950 rounded-full">
                1
              </span>
            )}
          </button>
        )}
      </div>

      {/* Live Chat Help Dialog / Drawer */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2.5rem)] sm:w-96 md:w-[410px] h-[580px] max-h-[85vh] bg-white dark:bg-[#0B132B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="px-5 py-4 bg-linear-to-r from-blue-900 via-blue-950 to-slate-950 text-white flex items-center justify-between border-b border-blue-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm border-2 border-white/20 shadow-xs">
                  NS
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-lime-400 rounded-full border-2 border-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold">{t('chat.headerTitle', 'NextSoftHR Support Concierge')}</h3>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-lime-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block" />
                  <span>{t('chat.headerSub', 'Agents online · Typically replies in < 2 mins')}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close live chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Action Navigation Bar */}
          <div className="px-4 py-2 bg-blue-50/70 dark:bg-[#0F1D3D] border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300">
              <Headphones className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{t('chat.directDesk', 'Direct Support Desk')}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenSupport();
                }}
                className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 hover:underline"
              >
                {t('chat.openTicket', 'Open Ticket')}
              </button>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenDemo();
                }}
                className="text-[11px] font-semibold text-lime-600 dark:text-lime-400 hover:underline"
              >
                {t('chat.bookCall', 'Book Call')}
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70 dark:bg-[#080E1E] transition-colors">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col text-xs sm:text-sm ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {msg.sender === 'agent' && (
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500 inline-block" />
                    <span>{msg.agentName || 'Support Specialist'}</span>
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-700 text-white rounded-br-xs shadow-xs'
                      : 'bg-white dark:bg-[#111F42] border border-slate-200/90 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line text-xs sm:text-[13px]">{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 p-1">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-lime-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-lime-400 animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-lime-400 animate-bounce delay-200" />
                <span className="ml-1 text-[11px]">Support agent is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-white dark:bg-[#0B132B] border-t border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0">
              {t('chat.suggestions', 'Suggestions:')}
            </span>
            {quickInquiries.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="text-[11px] text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-lime-300 hover:bg-blue-50 dark:hover:bg-[#162752] px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700/80 shrink-0 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-[#0B132B] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t('chat.placeholder', 'Ask our support team anything...')}
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-[#111F42] border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#162752]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl transition-colors shrink-0"
              aria-label="Send support message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Footer Assistance Badge */}
          <div className="px-4 py-2 bg-slate-100 dark:bg-[#080E1E] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
              <span>{t('chat.official', 'NextSoftHR Official Support')}</span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenAI();
              }}
              className="font-semibold text-blue-700 dark:text-lime-400 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-lime-500" />
              <span>{t('chat.tryAi', 'Try AI Assistant')}</span>
            </button>
          </div>

        </div>
      )}
    </>
  );
};
