import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  Award, 
  Shield, 
  Crown, 
  Gem, 
  ExternalLink,
  ChevronDown,
  MessageSquare
} from 'lucide-react';
import { PartnerTier } from '../types';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  category?: string;
  tier?: PartnerTier;
  reason?: string;
  followUp?: string;
  timestamp: string;
}

interface FloatingAiAssistantProps {
  onSelectCategory?: (categoryName: string) => void;
  onApplyWithCategory?: (categoryName: string) => void;
  selectedCategory?: string;
}

const TIER_ICONS: Record<PartnerTier, React.ComponentType<{ className?: string }>> = {
  bronze: Award,
  silver: Shield,
  gold: Crown,
  platinum: Gem
};

const TIER_BADGES: Record<PartnerTier, { name: string; rate: string; badgeClass: string; textClass: string }> = {
  bronze: {
    name: 'Bronze Partner',
    rate: '15% Recurring',
    badgeClass: 'bg-amber-950/80 border-amber-600/70 text-amber-300',
    textClass: 'text-amber-400'
  },
  silver: {
    name: 'Silver Partner',
    rate: '20% Recurring',
    badgeClass: 'bg-slate-800/80 border-slate-400/70 text-slate-200',
    textClass: 'text-slate-200'
  },
  gold: {
    name: 'Gold Partner',
    rate: '30% Recurring',
    badgeClass: 'bg-amber-900/60 border-yellow-400/80 text-yellow-300 shadow-[0_0_12px_rgba(234,179,8,0.3)]',
    textClass: 'text-yellow-300'
  },
  platinum: {
    name: 'Platinum Partner',
    rate: '40% Recurring',
    badgeClass: 'bg-cyan-950/80 border-cyan-400/80 text-cyan-200 shadow-[0_0_14px_rgba(56,189,248,0.3)]',
    textClass: 'text-[#B8F010]'
  }
};

const QUICK_PROMPTS = [
  "💼 I run a boutique HR advisory firm",
  "📊 Accounting practice with 30+ SME clients",
  "⚡ System Integrator seeking 40% margin",
  "💰 Compare Silver (20%) vs Gold (30%)"
];

export const FloatingAiAssistant: React.FC<FloatingAiAssistantProps> = ({
  onSelectCategory,
  onApplyWithCategory,
  selectedCategory
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasUnreadAlert, setHasUnreadAlert] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: "Hello! I'm the NextSofthr Partner Match AI. What kind of business or services do you offer, and who are your typical clients? I'll match you with your ideal Partner Category and Commission Tier (up to 40%).",
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnreadAlert(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMessageId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      if (!response.ok) {
        throw new Error('Assistant API returned an error');
      }

      const data = await response.json();
      
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || "I've analyzed your firm's background against our 24 partner tracks.",
        category: data.category,
        tier: data.tier,
        reason: data.reason,
        followUp: data.followUp,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      // Local intelligent fallback matching in case of offline or connection issue
      const lower = query.toLowerCase();
      let matchedCategory = 'HR Consultants';
      let matchedTier: PartnerTier = 'silver';
      let matchedReason = 'Great fit for workforce advisory with standard 20% recurring software commissions.';

      if (lower.includes('account') || lower.includes('audit') || lower.includes('bookkeep')) {
        matchedCategory = lower.includes('firm') ? 'Accounting Firms' : 'Accountants';
        matchedTier = lower.includes('firm') ? 'gold' : 'silver';
        matchedReason = 'Direct integration with client payroll journals and reconciliation ledgers.';
      } else if (lower.includes('system') || lower.includes('tech') || lower.includes('integrat') || lower.includes('cloud')) {
        matchedCategory = 'System Integrators';
        matchedTier = 'platinum';
        matchedReason = 'Eligible for top 40% enterprise recurring margin and REST API sandboxes.';
      } else if (lower.includes('recruit') || lower.includes('staffing') || lower.includes('talent')) {
        matchedCategory = 'Recruitment Agencies';
        matchedTier = 'bronze';
        matchedReason = 'Onboard placed candidates directly into client NextSofthr portals.';
      } else if (lower.includes('resell') || lower.includes('distribut') || lower.includes('hardware')) {
        matchedCategory = 'Software Resellers';
        matchedTier = 'gold';
        matchedReason = '30% recurring margin with co-branded sales materials and lead distribution.';
      }

      const fallbackMsg: Message = {
        id: `ai-fallback-${Date.now()}`,
        sender: 'ai',
        text: `Based on your query, we recommend partnering as a ${matchedCategory} at the ${matchedTier.toUpperCase()} Tier. You'll gain recurring software revenue while automating client operations.`,
        category: matchedCategory,
        tier: matchedTier,
        reason: matchedReason,
        followUp: 'Would you like to explore our partner onboarding timeline or application process?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: "Conversation reset. What type of consultancy, accounting firm, or technology practice do you manage? I'm ready to find your optimal partner track.",
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* FLOATING ACTION LAUNCHER BUTTON */}
      <div className="fixed bottom-22 right-6 z-40 flex flex-col items-end">
        
        {/* Floating Bubble Callout (when closed) */}
        {!isOpen && hasUnreadAlert && (
          <div className="mb-3 relative group">
            <div className="bg-[#071D3E] text-white border border-[#B8F010]/80 rounded-2xl px-4 py-2.5 shadow-2xl text-xs max-w-xs flex items-center gap-3 animate-bounce">
              <div className="p-1 rounded-full bg-[#B8F010] text-[#040E1F] shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] leading-tight">
                <strong className="text-[#B8F010] block">Find Your Partner Match</strong>
                Ask AI which tier & category earns you the most.
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setHasUnreadAlert(false);
                }}
                className="text-slate-400 hover:text-white p-0.5"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Pointer arrow */}
            <div className="w-3 h-3 bg-[#071D3E] border-r border-b border-[#B8F010]/80 transform rotate-45 absolute -bottom-1.5 right-6" />
          </div>
        )}

        {/* The Main Circular Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AI Partner Matcher"
          className={`relative p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group ${
            isOpen 
              ? 'bg-blue-900 border-2 border-slate-400 text-white rotate-90 scale-95' 
              : 'bg-gradient-to-tr from-[#071D3E] to-[#1B58B0] border-2 border-[#B8F010] text-[#B8F010] hover:scale-105 hover:shadow-[0_0_25px_rgba(184,240,16,0.4)]'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8F010] opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#B8F010]" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* FLOATING AI ASSISTANT CHAT WINDOW */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] h-[580px] max-h-[calc(100vh-120px)] bg-[#071D3E] border border-blue-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#040E1F] to-[#0A2652] border-b border-blue-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-xl bg-blue-900/80 border border-blue-700 text-[#B8F010]">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#B8F010] border-2 border-[#040E1F] rounded-full" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  NextSofthr Partner AI
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#B8F010]/20 text-[#B8F010] font-bold border border-[#B8F010]/30">
                    Live Advisor
                  </span>
                </h3>
                <p className="text-[11px] text-blue-200">Find your best tier & category</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-900/50 transition-colors"
                title="Reset Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-900/50 transition-colors"
                title="Minimize Window"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Context Banner */}
          {selectedCategory && (
            <div className="bg-blue-950/70 border-b border-blue-900 px-4 py-1.5 text-[10px] text-slate-300 flex items-center justify-between">
              <span>Currently Viewing: <strong className="text-[#B8F010]">{selectedCategory}</strong></span>
              <button 
                onClick={() => onSelectCategory && onSelectCategory(selectedCategory)}
                className="text-[#B8F010] hover:underline"
              >
                Inspect &rarr;
              </button>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              const tierConfig = msg.tier ? TIER_BADGES[msg.tier] : null;
              const TierIcon = msg.tier ? TIER_ICONS[msg.tier] : null;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-7 h-7 rounded-lg bg-blue-900/80 border border-blue-700 text-[#B8F010] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-2.5 ${isAi ? 'text-slate-200' : 'text-white'}`}>
                    
                    {/* Message Bubble */}
                    <div
                      className={`p-3.5 rounded-2xl leading-relaxed text-xs shadow-md ${
                        isAi 
                          ? 'bg-[#040E1F]/90 border border-blue-800/80 rounded-tl-sm' 
                          : 'bg-blue-600 text-white rounded-tr-sm'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>

                    {/* AI Structured Recommendation Card */}
                    {isAi && msg.category && (
                      <div className="rounded-xl bg-gradient-to-br from-[#071D3E] to-[#040E1F] border border-[#B8F010]/60 p-3.5 shadow-lg space-y-2.5 animate-in fade-in duration-300">
                        
                        <div className="flex items-center justify-between gap-2 border-b border-blue-900 pb-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400">
                            Recommended Match:
                          </span>
                          {tierConfig && (
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border flex items-center gap-1 ${tierConfig.badgeClass}`}>
                              {TierIcon && <TierIcon className="w-3 h-3" />}
                              <span>{tierConfig.name}</span>
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-extrabold text-white flex items-center gap-1">
                            <span className="text-[#B8F010]">{msg.category}</span>
                          </h4>
                          {msg.reason && (
                            <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                              {msg.reason}
                            </p>
                          )}
                        </div>

                        {/* Commission Rate & Action Buttons */}
                        <div className="pt-2 border-t border-blue-900 flex flex-col gap-2">
                          {tierConfig && (
                            <div className="text-[11px] font-semibold text-slate-200 flex items-center justify-between">
                              <span>Commission Potential:</span>
                              <strong className="text-[#B8F010] font-extrabold">{tierConfig.rate}</strong>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                if (onSelectCategory && msg.category) {
                                  onSelectCategory(msg.category);
                                }
                              }}
                              className="py-1.5 px-2.5 rounded-lg bg-blue-900/80 hover:bg-blue-800 text-blue-200 hover:text-white border border-blue-700 text-[10px] font-bold transition-all text-center"
                            >
                              View in Grid &rarr;
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (onApplyWithCategory && msg.category) {
                                  onApplyWithCategory(msg.category);
                                  setIsOpen(false);
                                }
                              }}
                              className="py-1.5 px-2.5 rounded-lg bg-[#B8F010] hover:bg-[#cbff1a] text-[#040E1F] text-[10px] font-black transition-all text-center shadow-sm"
                            >
                              Apply for Track &rarr;
                            </button>
                          </div>
                        </div>

                      </div>
                    )}

                    {/* Follow-up question chip if suggested */}
                    {isAi && msg.followUp && (
                      <button
                        onClick={() => handleSendMessage(msg.followUp)}
                        className="text-[11px] text-blue-300 hover:text-[#B8F010] bg-blue-950/60 border border-blue-800/80 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors text-left"
                      >
                        <MessageSquare className="w-3 h-3 text-[#B8F010] shrink-0" />
                        <span>&ldquo;{msg.followUp}&rdquo;</span>
                      </button>
                    )}

                    <span className="text-[9px] text-slate-500 block px-1">
                      {msg.timestamp}
                    </span>

                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-blue-900/80 border border-blue-700 text-[#B8F010] flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className="bg-[#040E1F] border border-blue-800/80 p-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#B8F010] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#B8F010] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#B8F010] rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-slate-400 ml-1">Matching partner tracks...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (shown if less than 3 messages) */}
          {messages.length <= 3 && !isLoading && (
            <div className="px-4 py-2 border-t border-blue-900/60 bg-[#040E1F]/50">
              <div className="text-[10px] font-bold text-slate-400 mb-1.5">
                Suggested partner scenarios:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[10px] text-blue-200 bg-blue-950 border border-blue-800 hover:border-[#B8F010] hover:text-white px-2.5 py-1 rounded-md transition-all text-left truncate max-w-full"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-[#040E1F] border-t border-blue-800/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about partner tiers, categories, or margins..."
                disabled={isLoading}
                className="flex-1 bg-[#071D3E] border border-blue-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#B8F010] disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 rounded-xl bg-[#B8F010] text-[#040E1F] hover:bg-[#cbff1a] disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold shrink-0 shadow-md"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            
            <div className="text-[9px] text-slate-500 text-center mt-1.5">
              Powered by NextSofthr AI Partner Intelligence • www.nextsofthr.org
            </div>
          </div>

        </div>
      )}
    </>
  );
};
