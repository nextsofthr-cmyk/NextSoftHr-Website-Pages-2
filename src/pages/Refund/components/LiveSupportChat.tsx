import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Phone,
  Headphones,
  Clock,
  FileText,
  Handshake,
} from 'lucide-react';
import { NextSoftLogo } from './NextSoftLogo';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface Message {
  id: string;
  sender: 'agent' | 'user' | 'system';
  agentName?: string;
  agentRole?: string;
  avatar?: string;
  text: string;
  timestamp: string;
  action?: {
    label: string;
    actionType: 'refund-modal' | 'partner-modal' | 'call';
  };
}

interface LiveSupportChatProps {
  onOpenRefundModal: () => void;
  onOpenPartnerModal: () => void;
  currentLang?: SupportedLanguage;
}

export const LiveSupportChat: React.FC<LiveSupportChatProps> = ({
  onOpenRefundModal,
  onOpenPartnerModal,
  currentLang = 'en',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      agentName: 'Sarah M.',
      agentRole: currentLang === 'fr' ? 'Opérations Facturation' : currentLang === 'pt' ? 'Operações de Faturação' : currentLang === 'es' ? 'Operaciones de Facturación' : 'Senior Billing Operations',
      text: t.liveChat.welcomeMsg,
      timestamp: currentLang === 'fr' ? 'À l\'instant' : currentLang === 'pt' ? 'Agora' : currentLang === 'es' ? 'Ahora' : 'Just now',
    },
  ]);

  // Update initial message if language changes
  useEffect(() => {
    setMessages((prev) => [
      {
        ...prev[0],
        agentRole: currentLang === 'fr' ? 'Opérations Facturation' : currentLang === 'pt' ? 'Operações de Faturação' : currentLang === 'es' ? 'Operaciones de Facturación' : 'Senior Billing Operations',
        text: t.liveChat.welcomeMsg,
      },
      ...prev.slice(1),
    ]);
  }, [currentLang, t.liveChat.welcomeMsg]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const newMsgId = `usr-${Date.now()}`;
    const userMessage: Message = {
      id: newMsgId,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate authentic human agent routing & reply
    setTimeout(() => {
      setIsTyping(false);
      const lower = userText.toLowerCase();

      let reply: Message;
      if (lower.includes('refund') || lower.includes('money back') || lower.includes('double charge')) {
        reply = {
          id: `agt-${Date.now()}`,
          sender: 'agent',
          agentName: 'Sarah M.',
          agentRole: 'Senior Billing Operations',
          text: 'I understand you are inquiring about a refund. Under Section 4 & 17 of our policy, verified claims (such as duplicate payments or technical issues) are audited within 48–72 hours. You can open our formal Claim Form right here to log your transaction details directly into our finance queue.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: {
            label: 'Open Refund Claim Form',
            actionType: 'refund-modal',
          },
        };
      } else if (lower.includes('partner') || lower.includes('reseller') || lower.includes('commission') || lower.includes('distributor')) {
        reply = {
          id: `agt-${Date.now()}`,
          sender: 'agent',
          agentName: 'Tunde A.',
          agentRole: 'Channel Operations Lead',
          text: 'Thank you for reaching out regarding your partner account. Partner commissions, license rollovers, and client refund adjustments are coordinated through our designated Channel Operations Desk (Sections 11–14 & 18). Would you like me to connect you with our Partner Team?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: {
            label: 'Contact Partner Team',
            actionType: 'partner-modal',
          },
        };
      } else if (lower.includes('cancel') || lower.includes('unsubscribe') || lower.includes('downgrade')) {
        reply = {
          id: `agt-${Date.now()}`,
          sender: 'agent',
          agentName: 'Sarah M.',
          agentRole: 'Senior Billing Operations',
          text: 'You can cancel your subscription at any time directly through your NextSoftHR Admin Console (Settings → Billing & Plans). All future automated charges will cease immediately, and your access will remain fully functional until the end of your current paid billing period.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } else {
        reply = {
          id: `agt-${Date.now()}`,
          sender: 'agent',
          agentName: 'Sarah M.',
          agentRole: 'Senior Billing Operations',
          text: 'Thank you for your message! A NextSoftHR billing agent has received your inquiry. For immediate phone assistance, you can also speak directly with an agent at +2349158482622.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: {
            label: 'Call Direct: +2349158482622',
            actionType: 'call',
          },
        };
      }

      setMessages((prev) => [...prev, reply]);
    }, 900);
  };

  const handleQuickTopic = (topic: string) => {
    setInputText(topic);
    setTimeout(() => {
      handleSendMessage();
    }, 50);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Open NextSoftHR Live Support Chat"
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#0A3B7B] hover:bg-[#1E40AF] text-white rounded-full shadow-xl hover:shadow-2xl border-2 border-white/20 dark:border-slate-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#84CC16]/40 cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            {isOpen ? (
              <X className="w-5 h-5 text-white transition-transform duration-200 rotate-90 group-hover:rotate-0" />
            ) : (
              <Headphones className="w-5 h-5 text-[#84CC16]" />
            )}
            {/* Pulsing Online Status Indicator */}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84CC16] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#84CC16]" />
              </span>
            )}
          </div>
          <span className="text-xs font-bold tracking-tight whitespace-nowrap">
            {isOpen ? t.liveChat.buttonLabelClose : t.liveChat.buttonLabelOpen}
          </span>
        </button>
      </div>

      {/* Floating Chat & Help Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="NextSoftHR Live Support Dialog"
          className="fixed bottom-22 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white dark:bg-[#131D31] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[82vh] animate-in fade-in slide-in-from-bottom-4 duration-200 transition-colors"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0A3B7B] to-[#1E40AF] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <NextSoftLogo size="sm" variant="icon-only" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-tight leading-none">
                    {t.liveChat.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-[#84CC16] inline-block" />
                  <span>{t.liveChat.status}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close chat window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Notice Banner */}
          <div className="px-3.5 py-1.5 bg-slate-50 dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-between transition-colors">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#0A3B7B] dark:text-[#38BDF8]" />
              <span>{t.liveChat.hours}</span>
            </div>
            <a
              href="tel:+2349158482622"
              className="font-semibold text-[#0A3B7B] dark:text-[#38BDF8] hover:underline flex items-center gap-1"
            >
              <Phone className="w-2.5 h-2.5 text-[#84CC16]" />
              <span>+2349158482622</span>
            </a>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-[#0B1120]/80 text-xs transition-colors">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {msg.sender === 'agent' && (
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    <span className="font-bold text-[#0A3B7B] dark:text-[#38BDF8]">{msg.agentName}</span>
                    <span>·</span>
                    <span>{msg.agentRole}</span>
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#0A3B7B] dark:bg-[#1E40AF] text-white rounded-br-xs shadow-xs'
                      : 'bg-white dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Contextual Action Button */}
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {msg.action.actionType === 'refund-modal' && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsOpen(false);
                            onOpenRefundModal();
                          }}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#0A3B7B] hover:bg-[#1E40AF] text-white text-[11px] font-bold rounded-lg transition-colors"
                        >
                          <FileText className="w-3 h-3 text-[#84CC16]" />
                          <span>{t.liveChat.openClaimForm}</span>
                        </button>
                      )}

                      {msg.action.actionType === 'partner-modal' && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsOpen(false);
                            onOpenPartnerModal();
                          }}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#0A3B7B] hover:bg-[#1E40AF] text-white text-[11px] font-bold rounded-lg transition-colors"
                        >
                          <Handshake className="w-3 h-3 text-[#84CC16]" />
                          <span>{t.liveChat.openPartnerForm}</span>
                        </button>
                      )}

                      {msg.action.actionType === 'call' && (
                        <a
                          href="tel:+2349158482622"
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#84CC16] hover:bg-[#a3e635] text-[#0A3B7B] text-[11px] font-bold rounded-lg transition-colors"
                        >
                          <Phone className="w-3 h-3 text-[#0A3B7B]" />
                          <span>{t.liveChat.callDirect}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 w-24">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Pre-Set Prompt Buttons */}
          <div className="p-2 bg-slate-100/70 dark:bg-[#0F172A] border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar transition-colors">
            <button
              type="button"
              onClick={() => handleQuickTopic(currentLang === 'fr' ? 'Comment demander un remboursement ?' : currentLang === 'pt' ? 'Como pedir um reembolso?' : currentLang === 'es' ? '¿Cómo solicitar un reembolso?' : 'How do I submit a refund request?')}
              className="text-[10px] font-semibold text-[#0A3B7B] dark:text-[#38BDF8] bg-white dark:bg-[#1E293B] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap"
            >
              {t.liveChat.quickRefund}
            </button>
            <button
              type="button"
              onClick={() => handleQuickTopic(currentLang === 'fr' ? 'Comment fonctionne la résiliation ?' : currentLang === 'pt' ? 'Como funciona o cancelamento?' : currentLang === 'es' ? '¿Cómo funciona la cancelación?' : 'How does subscription cancellation work?')}
              className="text-[10px] font-semibold text-[#0A3B7B] dark:text-[#38BDF8] bg-white dark:bg-[#1E293B] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap"
            >
              {t.liveChat.quickCancel}
            </button>
            <button
              type="button"
              onClick={() => handleQuickTopic(currentLang === 'fr' ? 'Question sur les commissions partenaires' : currentLang === 'pt' ? 'Dúvida sobre comissões de parceiro' : currentLang === 'es' ? 'Pregunta sobre comisiones de socios' : 'Partner commission question')}
              className="text-[10px] font-semibold text-[#0A3B7B] dark:text-[#38BDF8] bg-white dark:bg-[#1E293B] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap"
            >
              {t.liveChat.quickPartner}
            </button>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white dark:bg-[#131D31] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 transition-colors"
          >
            <input
              type="text"
              placeholder={t.liveChat.inputPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3B7B] dark:focus:ring-[#38BDF8] focus:bg-white dark:focus:bg-[#0F172A] transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 bg-[#0A3B7B] hover:bg-[#1E40AF] disabled:opacity-40 text-white rounded-xl transition-colors shrink-0"
              aria-label="Send message to support agent"
            >
              <Send className="w-3.5 h-3.5 text-[#84CC16]" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
