import React, { useState } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface WhatsAppFABProps {
  phoneNumber?: string;
  displayPhone?: string;
  defaultMessage?: string;
}

export const WhatsAppFAB: React.FC<WhatsAppFABProps> = ({
  phoneNumber = '2349158482622',
  displayPhone = '+234 915 848 2622',
  defaultMessage = 'Hello NextSofthr Sales Team, I would like to inquire about your HR & Payroll platform for my organization.',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customText, setCustomText] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const quickInquiries = [
    {
      id: 'pricing',
      label: '💰 Pricing & Headcount Plans',
      message: 'Hello NextSofthr Sales Team, I would like to inquire about your pricing plans and headcount tiers for our business.',
    },
    {
      id: 'demo',
      label: '🚀 Request a Live Demo',
      message: 'Hello NextSofthr Sales Team, I would like to schedule a personalized live demonstration for our executive team.',
    },
    {
      id: 'payroll',
      label: '🇳🇬 Payroll & Tax Compliance',
      message: 'Hello, I have questions regarding automated PAYE, NHF, Pension, and statutory tax reporting across our branches.',
    },
    {
      id: 'attendance',
      label: '🕒 Biometric Attendance & Rostering',
      message: 'Hello, we would like to know how NextSofthr integrates with biometric clocking devices and handles multi-shift rostering.',
    },
  ];

  const handleOpenWhatsApp = (messageToUse?: string) => {
    const textToSend = messageToUse || customText.trim() || defaultMessage;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSelectTopic = (topicMsg: string) => {
    setSelectedTopic(topicMsg);
    setCustomText(topicMsg);
  };

  return (
    <>
      {/* Floating Action Button Cluster in Bottom-Right */}
      <div className="fixed bottom-22 sm:bottom-24 right-4 sm:right-6 z-40 flex items-center gap-3">
        {/* Teaser pill on desktop (auto-visible or hoverable) */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-[#0D2644] text-[#0A2540] dark:text-white shadow-xl border border-slate-200 dark:border-blue-800 text-xs font-bold cursor-pointer hover:scale-103 transition-transform animate-in fade-in slide-in-from-right duration-300 group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] -ml-4" />
            <span>Chat on WhatsApp</span>
            <span className="text-[10px] uppercase font-extrabold bg-[#25D366]/20 text-[#128C7E] dark:text-[#25D366] px-1.5 py-0.5 rounded">
              Sales
            </span>
          </div>
        )}

        {/* The Circular WhatsApp Floating Action Button */}
        <button
          id="whatsapp-floating-action-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close WhatsApp Inquiry Box' : 'Contact NextSofthr Sales via WhatsApp'}
          title="Chat with NextSofthr Sales on WhatsApp"
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative cursor-pointer border ${
            isOpen
              ? 'bg-[#0A2540] dark:bg-[#07182E] text-white border-slate-700 dark:border-blue-700 rotate-90'
              : 'bg-[#25D366] hover:bg-[#20ba5a] text-white border-emerald-400 hover:scale-105 shadow-emerald-500/40'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7 text-white stroke-[2.2]" />
              {/* Pulsing Active Online Badge */}
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-300 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            </>
          )}
        </button>
      </div>

      {/* Popover Card for WhatsApp Inquiries */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="NextSofthr WhatsApp Sales Contact"
          className="fixed bottom-38 sm:bottom-40 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] bg-white dark:bg-[#0A2540] rounded-3xl shadow-2xl border border-slate-200 dark:border-blue-900 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 transition-colors"
        >
          {/* Header Banner - Signature WhatsApp Brand Green */}
          <div className="bg-[#075E54] dark:bg-[#064e46] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-[#128C7E] flex items-center justify-center text-white border-2 border-[#25D366]">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#25D366] ring-2 ring-[#075E54]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    NextSofthr Sales Desk
                    <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                  </h3>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    Online • Instant Response
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close WhatsApp popover"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Section with African Chat Pattern */}
          <div className="p-4 bg-slate-50 dark:bg-[#07182E] flex-1 space-y-3.5">
            {/* Agent Intro Bubble */}
            <div className="bg-white dark:bg-[#0D2644] p-3.5 rounded-2xl rounded-tl-xs border border-slate-200 dark:border-blue-900/80 shadow-xs text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed space-y-1.5">
              <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                👋 Hello &amp; Welcome!
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                How can our African client advisory team help you today? Select an inquiry below or type a message to start chatting directly on WhatsApp.
              </p>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 text-right">
                NextSofthr Sales • {displayPhone}
              </div>
            </div>

            {/* Quick Inquiry Option Chips */}
            <div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Frequently Asked Inquiries:
              </div>
              <div className="space-y-1.5">
                {quickInquiries.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTopic(item.message)}
                    className={`w-full text-left text-xs p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedTopic === item.message
                        ? 'bg-emerald-50 dark:bg-emerald-950/70 border-[#25D366] text-emerald-900 dark:text-emerald-200 font-semibold'
                        : 'bg-white dark:bg-[#0A2540] border-slate-200 dark:border-blue-900 text-slate-700 dark:text-slate-300 hover:border-emerald-300 dark:hover:border-emerald-700'
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 ml-1.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Editable Message Box */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Your WhatsApp Message:
              </label>
              <textarea
                rows={3}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type your question or customized requirements here..."
                className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-blue-800 bg-white dark:bg-[#0A2540] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#25D366] resize-none"
              />
            </div>

            {/* Primary Action Button */}
            <div className="space-y-2 pt-1">
              <button
                id="whatsapp-start-chat-btn"
                onClick={() => {
                  handleOpenWhatsApp();
                  setIsOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Start WhatsApp Conversation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              {/* Direct Telephone link */}
              <div className="flex items-center justify-between text-[11px] px-1 text-slate-500 dark:text-slate-400">
                <span>Prefer a phone call?</span>
                <a
                  href={`tel:${phoneNumber}`}
                  className="font-bold text-[#0256C4] dark:text-[#84CC16] hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call {displayPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
