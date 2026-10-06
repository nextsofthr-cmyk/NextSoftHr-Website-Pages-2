import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Headphones,
  Sparkles,
  Paperclip,
  CheckCheck,
  Building2,
  Clock,
  ExternalLink,
  MessageCircle,
  PhoneCall,
  Briefcase,
  ChevronRight,
} from 'lucide-react';
import NextSofthrLogo from './NextSofthrLogo';

interface LiveChatSupportProps {
  onOpenHelpCenter?: () => void;
}

interface Message {
  id: string;
  sender: 'agent' | 'user' | 'system';
  senderName: string;
  avatar?: string;
  text: string;
  time: string;
}

export const LiveChatSupport: React.FC<LiveChatSupportProps> = ({
  onOpenHelpCenter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContactMenu, setShowContactMenu] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // WhatsApp business inquiry deep link with pre-filled enterprise inquiry message
  const whatsappUrl =
    'https://wa.me/2348006398763?text=' +
    encodeURIComponent(
      'Hello NextSofthr Support & Sales Team! I am reaching out with a business inquiry regarding enterprise onboarding, workspace access, and multi-country automated payroll compliance for our organization.'
    );

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      senderName: 'Fatima Al-Hassan (NextSofthr Support Lead)',
      text: 'Hello! Welcome to NextSofthr. How can we assist you with signing into your workspace or setting up your multi-country payroll today?',
      time: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: 'You',
      text: inputText.trim(),
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputText.trim();
    setInputText('');
    setIsTyping(true);

    // Auto agent responses tailored to enterprise HR/payroll inquiries
    setTimeout(() => {
      setIsTyping(false);
      let reply =
        "Thank you for contacting NextSofthr Support. Our team across Lagos, Nairobi, and London has received your message. If this is an urgent sign-in blocker, please ensure your company domain is whitelisted or use the 'Forgot Password' link.";

      const lower = currentInput.toLowerCase();
      if (lower.includes('password') || lower.includes('reset') || lower.includes('login') || lower.includes('sign in')) {
        reply =
          "To reset your password, you can click 'Forgot password?' right on the sign-in form. We will dispatch a 30-minute one-time recovery token to your work email.";
      } else if (lower.includes('demo') || lower.includes('trial') || lower.includes('pricing') || lower.includes('cost')) {
        reply =
          "NextSofthr provides a 14-day full feature trial with statutory compliance support across Nigeria, Kenya, South Africa, Ghana, Rwanda, and global contractors. Click 'Start your free trial' on the sign-in card to activate your workspace instantly!";
      } else if (lower.includes('offline') || lower.includes('internet') || lower.includes('network')) {
        reply =
          "NextSofthr features robust offline resilience. When connectivity drops, your local session queue safely caches pending clock-ins and records until connection returns.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          senderName: 'Fatima Al-Hassan (Support)',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Action Button at Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Quick Popout menu when user hovers or taps contact options */}
        {showContactMenu && !isOpen && (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-200 bg-white dark:bg-[#0f1c33] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 p-2 w-64 space-y-1 text-left">
            <div className="px-2.5 py-1.5 border-b border-slate-100 dark:border-white/10">
              <p className="text-[11px] font-bold text-slate-900 dark:text-white">
                Contact NextSofthr
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Sales &amp; customer success team
              </p>
            </div>

            {/* Direct WhatsApp Sales Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 transition-colors group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <MessageCircle className="w-4 h-4 fill-white text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    WhatsApp Sales
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  Chat with regional reps
                </p>
              </div>
            </a>

            {/* Live Chat Drawer Action */}
            <button
              type="button"
              onClick={() => {
                setShowContactMenu(false);
                setIsOpen(true);
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-200 transition-colors group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#004494] to-[#0056b3] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#0056b3] dark:group-hover:text-[#caff33]">
                    Live Web Chat
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#caff33]/30 dark:bg-[#caff33]/20 text-[#003366] dark:text-[#caff33]">
                    Instant
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  Help desk &amp; onboarding
                </p>
              </div>
            </button>
          </div>
        )}

        {/* Floating Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Secondary 'Contact via WhatsApp' button next to live chat */}
          {!isOpen && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold shadow-2xl shadow-emerald-600/35 border-2 border-white/20 transition-all hover:scale-105 cursor-pointer group"
              title="Contact NextSofthr Support via WhatsApp"
              aria-label="Contact via WhatsApp"
            >
              <div className="relative flex items-center justify-center">
                <MessageCircle className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform" />
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#caff33]"></span>
                </span>
              </div>
              <span className="hidden xs:inline sm:inline tracking-wide">
                Contact via WhatsApp
              </span>
            </a>
          )}

          <button
            type="button"
            onClick={() => {
              if (isOpen) {
                setIsOpen(false);
              } else {
                setIsOpen(true);
                setShowContactMenu(false);
              }
            }}
            aria-label={isOpen ? 'Close Live Chat' : 'Open Live Chat Support'}
            className={`group relative flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3.5 rounded-full text-white font-semibold shadow-2xl transition-all duration-300 cursor-pointer ${
              isOpen
                ? 'bg-slate-800 hover:bg-slate-900 rotate-90 scale-95'
                : 'bg-gradient-to-r from-[#0056b3] via-[#004494] to-[#002f66] hover:shadow-[#0056b3]/30 hover:scale-105 border-2 border-white/20'
            }`}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <>
                <div className="relative">
                  <MessageSquare className="w-5 h-5 text-white" />
                  {/* Lemon Green active status ping */}
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#caff33] opacity-85"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#caff33]"></span>
                  </span>
                </div>
                <span className="hidden sm:inline text-xs font-bold tracking-wide">
                  Live Support
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Floating Chat Modal / Dialog */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[390px] h-[520px] max-h-[82vh] bg-white dark:bg-[#0f1c33] rounded-2xl shadow-2xl border border-slate-200/90 dark:border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200 transition-colors">
          {/* Top Brand Header */}
          <div className="p-4 bg-gradient-to-r from-[#002244] via-[#003366] to-[#0056b3] text-white flex items-center justify-between border-b border-white/10 relative">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/15 p-0.5 border border-white/30 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-[#caff33]" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#caff33] border-2 border-[#003366] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white">
                    NextSofthr Support Desk
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-blue-200">
                  <Clock className="w-3 h-3 text-[#caff33]" />
                  <span>Avg reply: &lt; 2 mins • Active Now</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Minimize Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Support Badge info with WhatsApp Direct Sales CTA */}
          <div className="px-4 py-2.5 bg-blue-50/80 dark:bg-[#13223f] border-b border-blue-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0056b3] dark:bg-[#caff33] shrink-0"></span>
              <span className="truncate">Regional Hubs: Lagos • Nairobi • London</span>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] shadow-2xs shrink-0 cursor-pointer transition-colors"
              title="Open WhatsApp Sales Chat"
            >
              <MessageCircle className="w-3 h-3 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-[#0a1222]">
            <div className="text-center my-1">
              <span className="px-2.5 py-1 rounded-full bg-white dark:bg-[#15233e] text-slate-400 dark:text-slate-400 text-[10px] font-semibold border border-slate-200 dark:border-white/10 shadow-2xs">
                Encrypted Support Session
              </span>
            </div>

            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isUser ? 'items-end' : 'items-start'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 dark:text-slate-400 font-medium mb-1 px-1">
                    {msg.senderName}
                  </span>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-[#0056b3] text-white rounded-br-xs shadow-xs'
                        : 'bg-white dark:bg-[#15233e] text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-white/10 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-400 mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic bg-white dark:bg-[#15233e] p-2.5 rounded-2xl rounded-bl-xs border border-slate-200/80 dark:border-white/10 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-200"></span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Support agent is typing...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-1.5 bg-white dark:bg-[#0f1c33] border-t border-slate-100 dark:border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              'Reset Password',
              'Multi-Country Payroll',
              'Offline sync support',
              'Talk to Sales',
            ].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputText(chip)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-[#192b4a] hover:bg-blue-50 dark:hover:bg-[#233b66] hover:text-[#0056b3] dark:hover:text-[#caff33] text-slate-600 dark:text-slate-300 transition-colors border border-slate-200/60 dark:border-white/10"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white dark:bg-[#0f1c33] border-t border-slate-100 dark:border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask support about login, payroll..."
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-[#162542] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#1a2d52] focus:outline-none focus:border-[#0056b3] dark:focus:border-[#60a5fa]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-[#0056b3] hover:bg-[#004494] text-white disabled:opacity-50 transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LiveChatSupport;
