import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Bot, User, ArrowRight, CornerDownLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { askNextSoftHRAssistant, Message } from '../services/aiAssistant';
import { useLanguage } from '../context/LanguageContext';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  onOpenDemo: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  initialPrompt = '',
  onOpenDemo,
}) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 'welcome',
      sender: 'assistant',
      text: t('ai.welcome', 'Hello! I am your NextSoftHR AI Assistant. How can I help you today with HR management, multi-country payroll, shift scheduling, or compliance?'),
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    t('ai.sample1', 'How does NextSoftHR automate payroll calculations?'),
    t('ai.sample2', 'Does NextSoftHR support multiple companies and branches?'),
    t('ai.sample3', 'Can employees submit leave and view payslips on mobile?'),
    t('ai.sample4', 'What outsourcing services are available for payroll?'),
  ];

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const answer = await askNextSoftHRAssistant(query);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'I apologize, but I encountered a temporary connection issue. Please feel free to book a live demo or contact our support team.',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0B132B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[600px] max-h-[90vh] transition-colors">
        
        {/* Header */}
        <div className="px-5 py-4 bg-linear-to-r from-slate-900 to-blue-950 text-white flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-lime-400 text-slate-950 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{t('ai.modalTitle', 'NextSoftHR AI Assistant')}</span>
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              </div>
              <div className="text-[11px] text-slate-300">
                {t('ai.modalSub', 'Grounded in official NextSoftHR HR & Payroll documentation')}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close AI dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation Message List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/60 dark:bg-[#080E1E] transition-colors">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-sm ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                  AI
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-700 dark:bg-blue-600 text-white rounded-br-xs shadow-xs'
                    : 'bg-white dark:bg-[#111F42] border border-slate-200/90 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 rounded-bl-xs shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-line text-xs sm:text-sm">{msg.text}</div>
                <div
                  className={`text-[10px] mt-1.5 text-right ${
                    msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400 dark:text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 text-xs font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 p-2">
              <Loader2 className="w-4 h-4 text-blue-700 dark:text-blue-400 animate-spin" />
              <span>{t('ai.loading', 'NextSoftHR AI is reviewing platform documentation...')}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-white dark:bg-[#0B132B] border-t border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 shrink-0">
            {t('chat.suggestions', 'Try:')}
          </span>
          {samplePrompts.map((p) => (
            <button
              key={p}
              onClick={() => handleSendMessage(p)}
              className="text-[11px] text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-lime-300 hover:bg-blue-50 dark:hover:bg-[#162752] px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700/80 shrink-0 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-3 sm:p-4 bg-white dark:bg-[#0B132B] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t('ai.placeholder', 'Type your question about NextSoftHR...')}
            className="flex-1 px-4 py-2.5 text-sm bg-slate-50 dark:bg-[#111F42] border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#162752]"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || loading}
            className="p-2.5 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl transition-colors shrink-0"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Action Footer */}
        <div className="px-4 py-2 bg-slate-100 dark:bg-[#080E1E] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{t('ai.deeperAdvisory', 'Need deeper tailored advisory?')}</span>
          <button
            onClick={() => {
              onClose();
              onOpenDemo();
            }}
            className="font-semibold text-blue-700 dark:text-lime-400 hover:underline flex items-center gap-1"
          >
            <span>{t('nav.bookDemo', 'Schedule live 1-on-1 demo')}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
