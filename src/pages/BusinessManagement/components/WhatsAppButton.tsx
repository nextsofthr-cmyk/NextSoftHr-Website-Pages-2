import { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, X, Send, CheckCheck, Sparkles, 
  ArrowUpRight, Clock, ShieldCheck, PhoneCall, HelpCircle
} from 'lucide-react';

interface WhatsAppButtonProps {
  salesPhoneNumber?: string;
  defaultMessage?: string;
}

const INQUIRY_TEMPLATES = [
  {
    label: 'Request Live Demo',
    text: "Hi MsmeBooks Sales Team, I would like to schedule a personalized live walkthrough of the NextSofthr platform for my organization."
  },
  {
    label: 'Pricing & Quotation',
    text: "Hi MsmeBooks Sales Team, I'm interested in receiving a customized pricing plan and volume discount for our workforce."
  },
  {
    label: 'Payroll & Tax Setup',
    text: "Hello, I have questions regarding automated payroll compliance and multi-country tax withholding."
  },
  {
    label: 'HR Outsourcing Services',
    text: "Hi MsmeBooks Team, I'd like to consult with an HR specialist about managed payroll and compliance outsourcing."
  }
];

export const WhatsAppButton = ({
  salesPhoneNumber = '15552347890',
  defaultMessage = "Hi MsmeBooks Sales Team, I have an inquiry about the NextSofthr platform and would like to learn more."
}: WhatsAppButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [hasUnreadAlert, setHasUnreadAlert] = useState(true);
  const chatCardRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside of the chat card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatCardRef.current && !chatCardRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setHasUnreadAlert(false);
    }
  };

  const handleSendWhatsApp = (customText?: string) => {
    const textToSend = (customText || message.trim() || defaultMessage);
    const cleanPhone = salesPhoneNumber.replace(/[^0-9]/g, '');
    const encodedMsg = encodeURIComponent(textToSend);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleSelectTemplate = (templateText: string) => {
    setMessage(templateText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none" id="whatsapp-widget-container">
      {/* Interactive Chat Card Popover */}
      {isOpen && (
        <div
          ref={chatCardRef}
          id="whatsapp-chat-card"
          className="pointer-events-auto mb-4 w-[340px] sm:w-[380px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fadeIn transition-all duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 sm:p-5 text-white relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white ring-2 ring-white/30 font-display font-extrabold text-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-lime-400 border-2 border-emerald-700 rounded-full animate-pulse" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-extrabold text-base text-white leading-tight">
                      MsmeBooks Sales Team
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-100 text-xs mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                    <span>Online | Typically replies instantly</span>
                  </div>
                </div>
              </div>

              <button
                id="whatsapp-chat-close-btn"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close WhatsApp chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/60 max-h-[380px] overflow-y-auto space-y-4 text-xs">
            {/* Incoming greeting bubble */}
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <MessageCircle className="w-3.5 h-3.5" />
              </div>
              <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl rounded-tl-sm border border-slate-200 dark:border-slate-700/80 shadow-xs max-w-[85%] text-slate-800 dark:text-slate-200 leading-relaxed">
                <p className="font-semibold text-slate-900 dark:text-white mb-1">
                  Welcome to MsmeBooks! 👋
                </p>
                <p>
                  Have questions about NextSofthr HR & Payroll, custom implementation, or enterprise pricing?
                </p>
                <p className="mt-1 text-slate-500 dark:text-slate-400 text-[11px]">
                  Select an inquiry topic below or send your custom question directly to our sales specialists via WhatsApp.
                </p>
                <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-400">
                  <Clock className="w-2.5 h-2.5" />
                  <span>Just now</span>
                  <CheckCheck className="w-3 h-3 text-emerald-500 ml-0.5" />
                </div>
              </div>
            </div>

            {/* Quick-Prompt Inquiry Chips */}
            <div>
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Suggested Topics:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {INQUIRY_TEMPLATES.map((tmpl, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectTemplate(tmpl.text)}
                    className="text-left px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all text-[11px] font-medium"
                  >
                    {tmpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Send Template Button if one selected */}
            {message && (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/80 text-emerald-950 dark:text-emerald-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Ready to Send:
                  </span>
                  <button 
                    onClick={() => setMessage('')} 
                    className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline"
                  >
                    Clear
                  </button>
                </div>
                <p className="text-[11px] italic leading-snug">
                  "{message}"
                </p>
              </div>
            )}
          </div>

          {/* Chat Footer Input & Send */}
          <div className="p-3.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="relative flex items-center">
              <input
                id="whatsapp-message-input"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendWhatsApp();
                  }
                }}
                placeholder="Type your inquiry message..."
                className="w-full pl-3.5 pr-24 py-2.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                id="whatsapp-start-chat-btn"
                onClick={() => handleSendWhatsApp()}
                className="absolute right-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Chat</span>
                <Send className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-2.5 text-[10px] text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified Sales Channel
              </span>
              <button
                onClick={() => handleSendWhatsApp()}
                className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5 font-medium"
              >
                <span>Direct WhatsApp Link</span>
                <ArrowUpRight className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (Bottom-Right Corner) */}
      <div className="pointer-events-auto flex items-center gap-3">
        {/* Unread Message Tooltip / Toast when chat is closed */}
        {!isOpen && hasUnreadAlert && (
          <div 
            onClick={handleToggle}
            id="whatsapp-cta-bubble"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold shadow-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-emerald-400 transition-all animate-bounce"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Chat with MsmeBooks Sales</span>
            <X 
              className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-1"
              onClick={(e) => {
                e.stopPropagation();
                setHasUnreadAlert(false);
              }}
            />
          </div>
        )}

        {/* Primary FAB Button */}
        <button
          id="whatsapp-fab-button"
          onClick={handleToggle}
          className={`relative group p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-500/30 ${
            isOpen 
              ? 'bg-slate-900 text-white rotate-90 scale-95' 
              : 'bg-[#25D366] hover:bg-[#20ba59] text-white hover:scale-105 active:scale-95'
          }`}
          aria-label="Contact MsmeBooks Sales Team via WhatsApp"
        >
          {/* Pulsing ring around button */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
          )}

          {isOpen ? (
            <X className="w-6 h-6 text-white transition-transform" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7 text-white fill-white/10 stroke-[2.2]" />
              {hasUnreadAlert && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-950">
                  1
                </span>
              )}
            </>
          )}

          {/* Hover tooltip for desktop */}
          <span className="sr-only">Contact MsmeBooks Sales Team via WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
