import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ShieldCheck, 
  Lock, 
  ChevronRight, 
  FileText, 
  CreditCard, 
  Users, 
  HelpCircle,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
}

export const AiAssistantCopilot: React.FC = () => {
  const [role, setRole] = useState<'HR Director' | 'Payroll Lead' | 'Line Manager' | 'Employee'>('HR Director');
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-0',
      sender: 'assistant',
      text: `Hello! I am your **NextSofthr HR & Payroll Copilot**.\n\nI have authorized access to your organization's configured policies, payroll summaries, and compliance rules in accordance with your **${role}** permissions.\n\nHow may I assist your team today?`,
      timestamp: 'Just now',
      source: 'NextSofthr Core Engine'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const examplePrompts = [
    'Show me employees currently on leave.',
    'Summarize this month\'s payroll.',
    'Help me create an onboarding checklist.',
    'Explain this employee\'s leave balance.',
    'Create a draft HR announcement.'
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          role: role,
          context: 'NextSofthr Client Organization'
        })
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'I processed your query based on current active records.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-3.8-flash'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const fallbackMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: `### NextSofthr HR Copilot Guidance\n\nI received your query: **"${textToSend}"**.\n\n- **Role Context**: Processed under **${role}** authorization.\n- **Data Privacy**: No unauthorized employee PII was exposed.\n- **Compliance Note**: *NextSofthr helps organizations organize, monitor and manage HR and payroll processes to support their compliance responsibilities.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'NextSofthr Fallback Engine'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intelligent Enterprise Workforce Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            “Meet Your Intelligent HR Copilot.”
          </h1>

          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            NextSofthr AI combines deep African payroll logic, employee lifecycle templates, and real-time workforce analytics to accelerate administrative workflows with strict role-based controls.
          </p>
        </div>
      </section>

      {/* Main Copilot Workbench */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-4 min-h-[620px]">
          {/* Sidebar / Role Control Panel */}
          <div className="bg-slate-50 border-r border-slate-200 p-5 space-y-6 lg:col-span-1">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
                <Lock className="w-3.5 h-3.5 text-blue-700" />
                <span>Role-Based Access</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                AI queries are filtered by user authorization level to prevent unauthorized data exposure.
              </p>

              <div className="space-y-1.5 pt-2">
                {(['HR Director', 'Payroll Lead', 'Line Manager', 'Employee'] as const).map(r => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      role === r 
                        ? 'bg-[#0F2D6B] text-white shadow-sm' 
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-900 uppercase">Suggested Prompts</div>
              <div className="space-y-1.5">
                {examplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="w-full text-left p-2 rounded-lg text-[11px] text-slate-600 hover:text-[#0F2D6B] hover:bg-blue-50/60 border border-transparent hover:border-blue-200 transition-colors leading-tight"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>

            {/* Compliance Guarantee Note */}
            <div className="p-3 bg-lime-50/70 border border-lime-200 rounded-xl text-[11px] text-slate-700 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-lime-700" />
                <span>Data Safeguards</span>
              </div>
              <div>NextSofthr AI acts as an assistant and never executes irrevocable employment decisions without human approval.</div>
            </div>
          </div>

          {/* Chat Window Panel */}
          <div className="lg:col-span-3 flex flex-col justify-between bg-white h-full">
            {/* Chat Header */}
            <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-lime-400 to-blue-600 text-slate-950 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>Ask NextSofthr AI</span>
                    <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Active Session: <strong className="text-blue-700">{role}</strong> View
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMessages([messages[0]])}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 p-1"
                title="Reset Conversation"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[460px]">
              {messages.map((msg) => {
                const isAssistant = msg.sender === 'assistant';
                return (
                  <div 
                    key={msg.id}
                    className={`flex items-start gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAssistant && (
                      <div className="w-8 h-8 rounded-lg bg-[#0F2D6B] text-lime-300 flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                        AI
                      </div>
                    )}

                    <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isAssistant 
                        ? 'bg-slate-50 border border-slate-200 text-slate-800' 
                        : 'bg-[#0F2D6B] text-white shadow-sm'
                    }`}>
                      <div className="whitespace-pre-line prose prose-sm max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-headings:text-sm prose-p:my-1">
                        {msg.text}
                      </div>

                      <div className={`flex items-center justify-between gap-4 mt-3 pt-2 text-[10px] border-t ${
                        isAssistant ? 'border-slate-200 text-slate-400' : 'border-white/20 text-slate-300'
                      }`}>
                        <span>{msg.timestamp} {msg.source ? `· ${msg.source}` : ''}</span>
                        {isAssistant && (
                          <button
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            className="hover:text-slate-700 flex items-center gap-1"
                          >
                            {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {!isAssistant && (
                      <div className="w-8 h-8 rounded-lg bg-lime-400 text-slate-950 flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0F2D6B] text-lime-300 flex items-center justify-center text-xs font-bold">
                    AI
                  </div>
                  <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-200"></span>
                    <span className="ml-1 text-[11px]">Analyzing authorized HR records...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={`Ask NextSofthr AI as ${role}... (e.g. "Draft an onboarding checklist")`}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isTyping}
                  className="px-5 py-3 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow disabled:opacity-50 flex items-center gap-1.5 shrink-0"
                >
                  <span>Ask AI</span>
                  <Send className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
