import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, CheckCircle2, Clock, Phone, Sparkles } from 'lucide-react';

interface WhatsAppFABProps {
  phoneNumber?: string; // default +2349158482622
  defaultMessage?: string;
}

const QUICK_INQUIRIES = [
  'I would like a pricing & plan recommendation for my workforce.',
  'I need a custom Enterprise quote for multi-entity payroll.',
  'Can I schedule a 1-on-1 live walkthrough with the sales team?',
  'I have questions about attendance biometric & mobile app setup.',
];

export const WhatsAppFAB: React.FC<WhatsAppFABProps> = ({
  phoneNumber = '2349158482622',
  defaultMessage = 'Hello MsmeBooks Sales Team, I would like to make an inquiry regarding NextSofthr pricing and features.',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inquiryText, setInquiryText] = useState(defaultMessage);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
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

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (hasUnreadNotification) {
      setHasUnreadNotification(false);
    }
  };

  const handleSelectQuickInquiry = (prompt: string) => {
    setInquiryText(prompt);
  };

  const handleOpenWhatsApp = (customText?: string) => {
    const textToSend = encodeURIComponent(customText || inquiryText);
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${textToSend}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div
      id="whatsapp-fab-container"
      ref={cardRef}
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto"
      aria-label="Contact MsmeBooks sales team on WhatsApp"
    >
      {/* Interactive Quick-Inquiry Popover Card */}
      {isOpen && (
        <div
          id="whatsapp-chat-card"
          className="mb-3 w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-white dark:bg-[#0B132B] rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 transition-colors"
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-card-title"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#128C7E] to-[#25D366] p-4 sm:p-5 text-white relative">
            <button
              id="whatsapp-card-close-btn"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-black/10 transition-colors"
              aria-label="Close WhatsApp chat card"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white text-[#128C7E] flex items-center justify-center font-display font-extrabold text-lg shadow-md">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <span
                  className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#A3E635] border-2 border-[#128C7E] shadow-xs"
                  title="Online now"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 id="whatsapp-card-title" className="font-display font-bold text-base leading-tight">
                    MsmeBooks Sales Team
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-emerald-100" />
                </div>
                <div className="flex items-center gap-2 text-xs text-white/90 mt-0.5">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635] animate-pulse" />
                    Available on WhatsApp
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-white/80">
                    <Clock className="w-3 h-3" />
                    &lt; 5 min reply
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 sm:p-5 space-y-4">
            {/* Sales Greeting Bubble */}
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#128C7E] dark:text-[#25D366] flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                MB
              </div>
              <div className="bg-slate-100 dark:bg-[#111C38] rounded-2xl rounded-tl-xs p-3.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800 shadow-xs">
                <p className="font-semibold text-slate-900 dark:text-white mb-1">
                  Welcome to NextSofthr! 👋
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Have questions about pricing, payroll compliance, or custom deployments? Chat directly
                  with our sales specialists on WhatsApp.
                </p>
              </div>
            </div>

            {/* Quick Prompts */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">
                <span>Select an inquiry topic:</span>
                <Sparkles className="w-3 h-3 text-[#A3E635]" />
              </div>
              <div className="space-y-1.5">
                {QUICK_INQUIRIES.map((prompt, idx) => (
                  <button
                    key={idx}
                    id={`whatsapp-prompt-btn-${idx}`}
                    onClick={() => handleSelectQuickInquiry(prompt)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start justify-between gap-2 border ${
                      inquiryText === prompt
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-[#25D366] text-[#128C7E] dark:text-[#25D366] font-semibold shadow-xs'
                        : 'bg-slate-50 dark:bg-[#162447] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="line-clamp-2">"{prompt}"</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Inquiry Text Area */}
            <div>
              <label
                htmlFor="whatsapp-inquiry-input"
                className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1"
              >
                Your Message
              </label>
              <textarea
                id="whatsapp-inquiry-input"
                rows={2}
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="Type your inquiry here..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#25D366] resize-none"
              />
            </div>

            {/* Direct Open WhatsApp Button */}
            <div className="pt-1">
              <button
                id="whatsapp-start-chat-btn"
                onClick={() => handleOpenWhatsApp()}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#128C7E] shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span>Start WhatsApp Chat</span>
                <Send className="w-4 h-4 ml-1" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-2.5 px-1">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#128C7E] dark:text-[#25D366]" />
                  +2349158482622
                </span>
                <span>Official MsmeBooks Sales</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Action Button */}
      <div className="flex items-center gap-3">
        {/* Floating Tooltip Pill (visible on desktop or when notification is active) */}
        {!isOpen && (
          <button
            id="whatsapp-fab-label-pill"
            onClick={handleToggle}
            className="hidden sm:flex items-center gap-2 py-2 px-3.5 rounded-full bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-100 text-xs font-bold shadow-xl border border-slate-200 dark:border-slate-800 hover:border-[#25D366] transition-all duration-200 group"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Chat with MsmeBooks Sales</span>
          </button>
        )}

        <button
          id="whatsapp-fab-btn"
          onClick={handleToggle}
          aria-expanded={isOpen}
          className={`relative p-3.5 sm:p-4 rounded-full text-white shadow-2xl transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 ${
            isOpen
              ? 'bg-slate-900 dark:bg-slate-700 rotate-90 scale-95'
              : 'bg-[#25D366] hover:bg-[#20bd5a] hover:scale-105 shadow-emerald-500/35'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current transition-transform group-hover:scale-110" />

              {/* Unread Ping Notification Badge */}
              {hasUnreadNotification && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#A3E635] text-[9px] font-extrabold text-slate-950 items-center justify-center border border-white dark:border-slate-900">
                    1
                  </span>
                </span>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
