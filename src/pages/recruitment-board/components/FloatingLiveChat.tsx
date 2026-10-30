import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Building2, 
  UserCheck, 
  Briefcase, 
  ArrowRight, 
  Minimize2, 
  Bot, 
  CheckCheck, 
  PhoneCall,
  Clock
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'advisor' | 'user';
  text: string;
  time: string;
  quickActions?: { label: string; action: () => void }[];
}

interface FloatingLiveChatProps {
  onOpenPostJob: () => void;
  onOpenSearch: (params?: { keyword?: string; category?: string; location?: string }) => void;
  onOpenServicesModal: (serviceId?: string) => void;
  onOpenAuth: (mode: 'login' | 'register', role?: any) => void;
  onOpenAiAssistant: (tab?: 'candidate' | 'employer-search' | 'job-drafter' | 'chat') => void;
}

export const FloatingLiveChat: React.FC<FloatingLiveChatProps> = ({
  onOpenPostJob,
  onOpenSearch,
  onOpenServicesModal,
  onOpenAuth,
  onOpenAiAssistant
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      sender: 'advisor',
      text: 'Hello! Welcome to NextSoftHR. I am Folake from our Talent Advisory Team in Lagos. How can we support your workforce or career journey today?',
      time: 'Just now',
      quickActions: [
        {
          label: 'AI Match Jobs & Career (Job Seekers)',
          action: () => {
            handleQuickAction('I want AI assistance to match jobs based on my skills and career experience.', () => onOpenAiAssistant('candidate'));
          }
        },
        {
          label: 'AI Find Candidates & Sourcing (Employers)',
          action: () => {
            handleQuickAction('I am an employer/recruiter looking for AI assistance to find qualified candidates.', () => onOpenAiAssistant('employer-search'));
          }
        },
        {
          label: 'Post a Job / Hire Talent',
          action: () => {
            handleQuickAction('I want to post a job vacancy and hire talent.', () => onOpenPostJob());
          }
        },
        {
          label: 'Executive Search & RPO',
          action: () => {
            handleQuickAction('I need information on Recruitment Outsourcing & Executive Headhunting.', () => onOpenServicesModal('srv-b'));
          }
        },
        {
          label: 'Search Career Opportunities',
          action: () => {
            handleQuickAction('I am looking for jobs in Nigeria / remote opportunities.', () => onOpenSearch());
          }
        }
      ]
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleQuickAction = (userText: string, onExecute: () => void) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "Great! Opening that workflow for you now. Our senior talent specialists are available to guide you through your requirements.";
      if (userText.includes('skills and career experience') || userText.includes('match jobs')) {
        reply = "Opening NextSoftHR AI Career Advisor! We'll analyze your skills, target compensation, and experience level to find your highest-compatibility job matches.";
      } else if (userText.includes('find qualified candidates') || userText.includes('sourcing')) {
        reply = "Opening NextSoftHR AI Candidate Sourcer! We'll formulate African & diaspora sourcing strategies, boolean search strings, and interview scorecards.";
      } else if (userText.includes('post a job')) {
        reply = "Opening our vacancy publisher now. You can publish directly or connect your organization with NextSoftHR Core HRMS.";
      } else if (userText.includes('Recruitment Outsourcing')) {
        reply = "Directing you to our Executive Search & RPO advisory intake. Our practice leads will review your leadership brief within 24 hours.";
      } else if (userText.includes('jobs')) {
        reply = "Opening the verified job directory now with active openings across Lagos, Abuja, Nairobi, and remote African hubs.";
      }

      const botReply: ChatMessage = {
        id: `adv-${Date.now()}`,
        sender: 'advisor',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botReply]);
      setTimeout(() => {
        onExecute();
      }, 500);
    }, 700);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          conversationHistory: messages.slice(-4).map(m => ({ sender: m.sender, text: m.text }))
        })
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setIsTyping(false);
        const advisorReply: ChatMessage = {
          id: `adv-${Date.now()}`,
          sender: 'advisor',
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickActions: [
            { label: 'Explore Verified Jobs', action: () => onOpenSearch() },
            { label: 'Post a Vacancy', action: () => onOpenPostJob() }
          ]
        };
        setMessages(prev => [...prev, advisorReply]);
        return;
      }
    } catch (err) {
      console.warn('AI chat error, using contextual fallback:', err);
    }

    // Contextual simulated response
    setTimeout(() => {
      setIsTyping(false);
      const lower = userText.toLowerCase();
      let replyText = "Thank you for reaching out! You can explore our verified job directory, post openings, or schedule an executive consultation.";
      let actions: { label: string; action: () => void }[] | undefined = undefined;

      if (lower.includes('ai') || lower.includes('assistant') || lower.includes('skill') || lower.includes('match') || lower.includes('resume')) {
        replyText = "NextSoftHR AI Talent Assistant can match your skills to vacancies, source high-caliber candidates, or draft complete job specifications in seconds.";
        actions = [
          { label: 'Match Jobs with AI (Job Seeker)', action: () => { setIsOpen(false); onOpenAiAssistant('candidate'); } },
          { label: 'Source Candidates with AI (Employer)', action: () => { setIsOpen(false); onOpenAiAssistant('employer-search'); } },
          { label: 'AI Job Post Drafter', action: () => { setIsOpen(false); onOpenAiAssistant('job-drafter'); } }
        ];
      } else if (lower.includes('salary') || lower.includes('pay') || lower.includes('compensation')) {
        replyText = "All listings on NextSoftHR feature transparent compensation benchmarks in Nigerian Naira (₦) or USD ($). You can also review our Salary Benchmarking guide in Career Resources.";
      } else if (lower.includes('hrms') || lower.includes('payroll') || lower.includes('software')) {
        replyText = "NextSoftHR integrates applicant tracking directly with our Core HRMS payroll engine. Successful candidates transition into active employees with a single click.";
        actions = [{ label: 'Explore Software Plans', action: () => { document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); } }];
      } else if (lower.includes('headhunt') || lower.includes('executive') || lower.includes('c-suite') || lower.includes('rpo')) {
        replyText = "Our Executive Search practice conducts confidential talent mapping for VP and C-level roles across Africa and the diaspora.";
        actions = [{ label: 'Request Executive Search Brief', action: () => onOpenServicesModal('srv-c') }];
      } else if (lower.includes('candidate') || lower.includes('hire') || lower.includes('recruiter') || lower.includes('talent')) {
        replyText = "Employers and recruitment partners can source talent using our AI Candidate Finder, or publish a verified vacancy.";
        actions = [
          { label: 'AI Candidate Finder', action: () => { setIsOpen(false); onOpenAiAssistant('employer-search'); } },
          { label: 'Post a Vacancy', action: () => onOpenPostJob() }
        ];
      } else if (lower.includes('apply') || lower.includes('cv') || lower.includes('job')) {
        replyText = "You can browse verified job vacancies and apply directly with your CV without leaving the platform, or use AI to match your exact competencies.";
        actions = [
          { label: 'AI Job & Skill Matcher', action: () => { setIsOpen(false); onOpenAiAssistant('candidate'); } },
          { label: 'Browse Open Vacancies', action: () => onOpenSearch() }
        ];
      } else {
        replyText = "Thanks for your message! Our human talent advisors in Victoria Island, Lagos are active from 8:00 AM to 6:00 PM WAT. You can also select any of the direct services below:";
        actions = [
          { label: 'AI Assistant', action: () => { setIsOpen(false); onOpenAiAssistant('candidate'); } },
          { label: 'Post a Job', action: () => onOpenPostJob() },
          { label: 'Talk to Recruitment Team', action: () => onOpenServicesModal('srv-b') }
        ];
      }
      const advisorReply: ChatMessage = {
        id: `adv-${Date.now()}`,
        sender: 'advisor',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: actions
      };

      setMessages(prev => [...prev, advisorReply]);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded Live Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] max-h-[82vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#142B4A] dark:bg-slate-950 text-white p-4 flex items-center justify-between shrink-0 border-b border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#0F9D8A] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  NS
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#142B4A] dark:border-slate-950 rounded-full" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>NextSoftHR Live Advisory</span>
                </h3>
                <p className="text-[11px] text-lime-300 dark:text-lime-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  <span>Online · Average response &lt; 2m</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Minimize chat"
                aria-label="Minimize chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subheader info strip */}
          <div className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Enterprise Talent & HRMS Inquiries</span>
            <span className="font-mono text-slate-600 dark:text-slate-300">Lagos · West Africa</span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-slate-950/60 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#2563EB] dark:bg-blue-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                  <span>{msg.time}</span>
                  {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-blue-500 dark:text-blue-400" />}
                </div>

                {/* Quick Action Prompt Chips */}
                {msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                    {msg.quickActions.map((qa, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={qa.action}
                        className="px-2.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-[#2563EB] dark:hover:text-blue-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 text-slate-700 dark:text-slate-200 font-medium rounded-xl text-[11px] transition-all flex items-center gap-1 shadow-2xs text-left cursor-pointer"
                      >
                        <span>{qa.label}</span>
                        <ArrowRight className="w-3 h-3 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-2xl w-fit text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[10px]">Folake is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about hiring, jobs, or RPO..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 dark:disabled:text-slate-600 rounded-xl transition-colors shadow-xs cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#142B4A] dark:bg-blue-600 hover:bg-[#1E3A5F] dark:hover:bg-blue-500 text-white rounded-full shadow-2xl hover:shadow-blue-900/30 border border-slate-700/60 dark:border-blue-400/30 transition-all duration-200 active:scale-95 cursor-pointer"
        aria-label="Toggle Live Chat"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#142B4A] rounded-full" />
          )}
        </div>

        <div className="flex flex-col text-left leading-tight pr-1">
          <span className="text-xs font-bold text-white tracking-wide">Live Support</span>
          <span className="text-[10px] text-lime-300 font-medium">Talent Advisors Active</span>
        </div>

        {hasUnread && !isOpen && (
          <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping ml-0.5" />
        )}
      </button>

    </div>
  );
};
