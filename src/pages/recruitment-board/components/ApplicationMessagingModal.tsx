import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  X, 
  Send, 
  MessageSquare, 
  Paperclip, 
  CheckCheck, 
  Clock, 
  Sparkles, 
  User, 
  Building2, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { ApplicationConversation, ApplicationMessage, UserRole } from '../types';

interface ApplicationMessagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserRole?: 'recruiter' | 'candidate';
  currentUserName?: string;
  initialConversationId?: string;
  onScheduleInterview?: (candidateEmail: string, jobTitle: string) => void;
  onToast?: (msg: string) => void;
  isEmbedded?: boolean;
}

export const INITIAL_CONVERSATIONS: ApplicationConversation[] = [
  {
    applicationId: 'app-default-1',
    jobId: 'job-1',
    jobTitle: 'Senior HR Business Partner (People & Culture)',
    companyName: 'Interswitch Group',
    candidateName: 'Chioma Okonkwo',
    candidateEmail: 'chioma.okonkwo@example.com',
    lastMessageAt: '10 mins ago',
    lastMessageText: 'Thank you for reviewing my profile! I have attached my CIPM certification credentials.',
    unreadCountCandidate: 0,
    unreadCountRecruiter: 1,
    messages: [
      {
        id: 'msg-101',
        applicationId: 'app-default-1',
        jobId: 'job-1',
        jobTitle: 'Senior HR Business Partner (People & Culture)',
        companyName: 'Interswitch Group',
        candidateName: 'Chioma Okonkwo',
        candidateEmail: 'chioma.okonkwo@example.com',
        senderRole: 'recruiter',
        senderName: 'Chinedu Eze (Head of Talent, Interswitch)',
        senderAvatar: '',
        text: 'Hello Chioma, thank you for your application for the Senior HRBP vacancy. Your background in Nigerian Labour Law compliance caught our team\'s attention. Could you clarify your availability for a 30-minute culture-fit interview this week?',
        timestamp: 'Today at 09:30 AM',
        read: true,
        quickCategory: 'interview_clarification'
      },
      {
        id: 'msg-102',
        applicationId: 'app-default-1',
        jobId: 'job-1',
        jobTitle: 'Senior HR Business Partner (People & Culture)',
        companyName: 'Interswitch Group',
        candidateName: 'Chioma Okonkwo',
        candidateEmail: 'chioma.okonkwo@example.com',
        senderRole: 'candidate',
        senderName: 'Chioma Okonkwo',
        senderAvatar: '',
        text: 'Thank you for reaching out, Chinedu! I am available on Wednesday and Thursday after 2:00 PM WAT. I have also verified my CIPM and SHRM credentials on NextSoftHR.',
        timestamp: 'Today at 10:15 AM',
        read: true,
        quickCategory: 'interview_clarification'
      },
      {
        id: 'msg-103',
        applicationId: 'app-default-1',
        jobId: 'job-1',
        jobTitle: 'Senior HR Business Partner (People & Culture)',
        companyName: 'Interswitch Group',
        candidateName: 'Chioma Okonkwo',
        candidateEmail: 'chioma.okonkwo@example.com',
        senderRole: 'recruiter',
        senderName: 'Chinedu Eze (Head of Talent, Interswitch)',
        senderAvatar: '',
        text: 'Excellent. What is your expected compensation range and current notice period?',
        timestamp: 'Today at 11:00 AM',
        read: true,
        quickCategory: 'screening'
      },
      {
        id: 'msg-104',
        applicationId: 'app-default-1',
        jobId: 'job-1',
        jobTitle: 'Senior HR Business Partner (People & Culture)',
        companyName: 'Interswitch Group',
        candidateName: 'Chioma Okonkwo',
        candidateEmail: 'chioma.okonkwo@example.com',
        senderRole: 'candidate',
        senderName: 'Chioma Okonkwo',
        senderAvatar: '',
        text: 'My target base is in line with the posted bracket (₦1,800,000 - ₦2,200,000 net monthly), and my contractual notice is 30 days. Looking forward to speaking further!',
        timestamp: '10 mins ago',
        read: false,
        quickCategory: 'screening'
      }
    ]
  },
  {
    applicationId: 'app-default-2',
    jobId: 'job-2',
    jobTitle: 'Lead Backend & Payment Systems Engineer',
    companyName: 'Paystack Financial',
    candidateName: 'Tunde Adeleke',
    candidateEmail: 'tunde.adeleke.dev@gmail.com',
    lastMessageAt: '1 hour ago',
    lastMessageText: 'Here is the link to my GitHub microservice demo with Kafka & PostgreSQL.',
    unreadCountCandidate: 1,
    unreadCountRecruiter: 0,
    messages: [
      {
        id: 'msg-201',
        applicationId: 'app-default-2',
        jobId: 'job-2',
        jobTitle: 'Lead Backend & Payment Systems Engineer',
        companyName: 'Paystack Financial',
        candidateName: 'Tunde Adeleke',
        candidateEmail: 'tunde.adeleke.dev@gmail.com',
        senderRole: 'recruiter',
        senderName: 'Kemi Adebayo (Engineering Talent Lead, Paystack)',
        senderAvatar: '',
        text: 'Hi Tunde, we were very impressed by your CKA Kubernetes certification and fintech architecture background. Could you share an example of how you solved idempotency in high-throughput payment webhooks?',
        timestamp: 'Yesterday at 04:15 PM',
        read: true,
        quickCategory: 'screening'
      },
      {
        id: 'msg-202',
        applicationId: 'app-default-2',
        jobId: 'job-2',
        jobTitle: 'Lead Backend & Payment Systems Engineer',
        companyName: 'Paystack Financial',
        candidateName: 'Tunde Adeleke',
        candidateEmail: 'tunde.adeleke.dev@gmail.com',
        senderRole: 'candidate',
        senderName: 'Tunde Adeleke',
        senderAvatar: '',
        text: 'Hi Kemi! In my previous system, we enforced idempotency keys in Redis with a 24-hour TTL combined with database unique constraints on transaction references. I would love to walk through the architecture diagram during our technical screen.',
        timestamp: 'Yesterday at 05:40 PM',
        read: true,
        quickCategory: 'screening'
      },
      {
        id: 'msg-203',
        applicationId: 'app-default-2',
        jobId: 'job-2',
        jobTitle: 'Lead Backend & Payment Systems Engineer',
        companyName: 'Paystack Financial',
        candidateName: 'Tunde Adeleke',
        candidateEmail: 'tunde.adeleke.dev@gmail.com',
        senderRole: 'recruiter',
        senderName: 'Kemi Adebayo (Engineering Talent Lead, Paystack)',
        senderAvatar: '',
        text: 'That sounds right on target. I am coordinating with the Principal Systems Architect for our deep dive interview. Could you send your public GitHub profile or repo link in the meantime?',
        timestamp: '1 hour ago',
        read: false,
        quickCategory: 'document_request'
      }
    ]
  }
];

export const ApplicationMessagingModal: React.FC<ApplicationMessagingModalProps> = ({
  isOpen,
  onClose,
  currentUserRole = 'recruiter',
  currentUserName,
  initialConversationId,
  onScheduleInterview,
  onToast,
  isEmbedded = false
}) => {
  const [conversations, setConversations] = useState<ApplicationConversation[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsoft_application_conversations');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore corrupted JSON
        }
      }
    }
    return INITIAL_CONVERSATIONS;
  });

  const [activeConversationId, setActiveConversationId] = useState<string>(() => {
    return initialConversationId || INITIAL_CONVERSATIONS[0].applicationId;
  });

  const [messageInput, setMessageInput] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [activePromptCategory, setActivePromptCategory] = useState<'all' | 'screening' | 'interview' | 'compensation'>('all');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialConversationId) {
      setActiveConversationId(initialConversationId);
    }
  }, [initialConversationId]);

  useEffect(() => {
    try {
      localStorage.setItem('nextsoft_application_conversations', JSON.stringify(conversations));
    } catch {}
  }, [conversations]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversations, activeConversationId]);

  const activeConversation = useMemo(() => {
    return conversations.find(c => c.applicationId === activeConversationId) || conversations[0];
  }, [conversations, activeConversationId]);

  const filteredConversations = useMemo(() => {
    if (!searchFilter.trim()) return conversations;
    const q = searchFilter.toLowerCase();
    return conversations.filter(c => 
      c.candidateName.toLowerCase().includes(q) ||
      c.jobTitle.toLowerCase().includes(q) ||
      c.companyName.toLowerCase().includes(q) ||
      c.messages.some(m => m.text.toLowerCase().includes(q))
    );
  }, [conversations, searchFilter]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || messageInput.trim();
    if (!text || !activeConversation) return;

    const senderName = currentUserName || (currentUserRole === 'recruiter' ? 'Recruiter Hiring Team' : activeConversation.candidateName);

    const newMessage: ApplicationMessage = {
      id: `msg-${Date.now()}`,
      applicationId: activeConversation.applicationId,
      jobId: activeConversation.jobId,
      jobTitle: activeConversation.jobTitle,
      companyName: activeConversation.companyName,
      candidateName: activeConversation.candidateName,
      candidateEmail: activeConversation.candidateEmail,
      senderRole: currentUserRole,
      senderName,
      text,
      timestamp: 'Just now',
      read: true
    };

    setConversations(prev => prev.map(conv => {
      if (conv.applicationId === activeConversation.applicationId) {
        return {
          ...conv,
          lastMessageAt: 'Just now',
          lastMessageText: text,
          unreadCountCandidate: currentUserRole === 'recruiter' ? conv.unreadCountCandidate + 1 : conv.unreadCountCandidate,
          unreadCountRecruiter: currentUserRole === 'candidate' ? conv.unreadCountRecruiter + 1 : conv.unreadCountRecruiter,
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    }));

    setMessageInput('');
    if (onToast) onToast('Message sent in real-time!');

    // Simulate real-time response from counterpart after 1.8 seconds
    setTimeout(() => {
      simulateCounterpartReply(activeConversation.applicationId, currentUserRole, text);
    }, 1800);
  };

  const simulateCounterpartReply = (appId: string, roleSent: 'recruiter' | 'candidate', sentText: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.applicationId !== appId) return conv;

      const counterpartRole: 'recruiter' | 'candidate' = roleSent === 'recruiter' ? 'candidate' : 'recruiter';
      const counterpartName = counterpartRole === 'recruiter' ? `Hiring Team (${conv.companyName})` : conv.candidateName;

      let replyText = '';
      if (counterpartRole === 'candidate') {
        if (sentText.toLowerCase().includes('salary') || sentText.toLowerCase().includes('compensation')) {
          replyText = `Thank you for asking. My salary expectation is aligned with the stated range, and I am open to discussing performance incentives.`;
        } else if (sentText.toLowerCase().includes('interview') || sentText.toLowerCase().includes('availability')) {
          replyText = `I am completely flexible this week! Please send across the Google Meet invite at your earliest convenience.`;
        } else if (sentText.toLowerCase().includes('github') || sentText.toLowerCase().includes('portfolio')) {
          replyText = `Certainly! I have updated my profile link and portfolio artifacts. Please review and let me know if you need code samples.`;
        } else {
          replyText = `Thank you for the message! I am very excited about the ${conv.jobTitle} opportunity and look forward to the next steps.`;
        }
      } else {
        if (sentText.toLowerCase().includes('available') || sentText.toLowerCase().includes('time')) {
          replyText = `Great to hear! We will initiate the interview scheduler through the NextSoftHR portal.`;
        } else {
          replyText = `Thank you for providing that detail, ${conv.candidateName}. Our hiring panel is reviewing this immediately.`;
        }
      }

      const replyMsg: ApplicationMessage = {
        id: `msg-${Date.now()}`,
        applicationId: conv.applicationId,
        jobId: conv.jobId,
        jobTitle: conv.jobTitle,
        companyName: conv.companyName,
        candidateName: conv.candidateName,
        candidateEmail: conv.candidateEmail,
        senderRole: counterpartRole,
        senderName: counterpartName,
        text: replyText,
        timestamp: 'Just now',
        read: false
      };

      return {
        ...conv,
        lastMessageAt: 'Just now',
        lastMessageText: replyText,
        messages: [...conv.messages, replyMsg]
      };
    }));
  };

  // Quick Follow-up Question Prompts
  const recruiterPrompts = [
    { label: 'Schedule Follow-up Screen', text: 'Hello! Our team would like to invite you for a 30-minute virtual follow-up screen. When are you next available?' },
    { label: 'Clarify Salary Expectations', text: 'Could you please confirm your expected compensation bracket and preferred payment currency?' },
    { label: 'Request Portfolio / Code Samples', text: 'Could you share recent code repositories, architectural designs, or portfolio links demonstrating your work in this domain?' },
    { label: 'Notice Period & Relocation', text: 'What is your current notice period with your current employer, and are you open to hybrid office presence?' }
  ];

  const candidatePrompts = [
    { label: 'Confirm Interview Availability', text: 'Thank you for following up! I am available any afternoon this week from 2:00 PM WAT onwards.' },
    { label: 'Share Portfolio Link', text: 'I have refreshed my portfolio and GitHub profile with recent fintech projects. Looking forward to your thoughts!' },
    { label: 'Inquire About Hiring Timeline', text: 'Could you share more details regarding the anticipated timeline for next stage technical rounds and final decision?' }
  ];

  const activePrompts = currentUserRole === 'recruiter' ? recruiterPrompts : candidatePrompts;

  if (!isOpen) return null;

  const content = (
    <div 
      className={`bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full flex flex-col overflow-hidden animate-in fade-in duration-200 ${
        isEmbedded ? 'h-[580px] shadow-sm' : 'max-w-5xl h-[88vh]'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Header Bar */}
      <div className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-5 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#142B4A] dark:text-white">
                Application Direct Messaging
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Real-Time Active</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct follow-up questions & screening without leaving NextSoftHR
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
            Role: <strong className="text-slate-800 dark:text-slate-200 capitalize">{currentUserRole}</strong>
          </span>
          {!isEmbedded && (
            <button 
              onClick={onClose} 
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messaging Layout: Split Screen */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Application Threads */}
        <div className="w-full sm:w-80 md:w-88 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-950/40 shrink-0">
          {/* Search Input */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search candidate or job role..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 space-y-2">
                <p>No conversations found.</p>
              </div>
            ) : (
              filteredConversations.map(conv => {
                const isSelected = conv.applicationId === activeConversation?.applicationId;
                const unread = currentUserRole === 'recruiter' ? conv.unreadCountRecruiter : conv.unreadCountCandidate;

                return (
                  <button
                    key={conv.applicationId}
                    onClick={() => setActiveConversationId(conv.applicationId)}
                    className={`w-full p-3.5 text-left transition-colors flex items-start gap-3 cursor-pointer ${
                      isSelected 
                        ? 'bg-blue-50/90 dark:bg-blue-950/50 border-l-4 border-[#2563EB]' 
                        : 'hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center shrink-0 text-sm">
                      {conv.candidateName.split(' ').map(w => w[0]).join('').substring(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                          {currentUserRole === 'recruiter' ? conv.candidateName : conv.companyName}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {conv.lastMessageAt}
                        </span>
                      </div>
                      <p className="text-[11px] font-medium text-[#2563EB] dark:text-blue-400 truncate mb-1">
                        {conv.jobTitle}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {conv.lastMessageText}
                      </p>
                    </div>
                    {unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {unread}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Main Pane: Active Conversation */}
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 overflow-hidden">
          {activeConversation ? (
            <>
              {/* Active Chat Header */}
              <div className="p-3.5 sm:px-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/40 dark:bg-slate-900 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {activeConversation.candidateName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {currentUserRole === 'recruiter' ? activeConversation.candidateName : activeConversation.companyName}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold truncate">
                        {activeConversation.jobTitle}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      Applicant: {activeConversation.candidateEmail} · Company: {activeConversation.companyName}
                    </p>
                  </div>
                </div>

                {currentUserRole === 'recruiter' && onScheduleInterview && (
                  <button
                    type="button"
                    onClick={() => onScheduleInterview(activeConversation.candidateEmail, activeConversation.jobTitle)}
                    className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Schedule Screen</span>
                  </button>
                )}
              </div>

              {/* Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30 dark:bg-slate-950/20">
                <div className="text-center my-2">
                  <span className="px-3 py-1 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                    🔒 Direct Application Messaging · End-to-End Logged for Auditing
                  </span>
                </div>

                {activeConversation.messages.map((msg) => {
                  const isCurrentUser = msg.senderRole === currentUserRole;

                  return (
                    <div 
                      key={msg.id}
                      className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {msg.senderName}
                        </span>
                        <span>·</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div 
                        className={`max-w-[85%] sm:max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                          isCurrentUser
                            ? 'bg-[#2563EB] text-white rounded-br-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-xs'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        {msg.attachmentName && (
                          <div className="mt-2 p-2 rounded-lg bg-black/10 dark:bg-white/10 flex items-center gap-2 text-[11px]">
                            <FileText className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{msg.attachmentName}</span>
                          </div>
                        )}
                      </div>

                      {isCurrentUser && (
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 px-1">
                          <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                          <span>Delivered</span>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Pre-built Prompt Chips for Fast Follow-ups */}
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Quick Follow-Up Prompts ({currentUserRole === 'recruiter' ? 'Recruiter' : 'Candidate'}):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(p.text)}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200 dark:border-slate-700 hover:border-blue-300 text-[11px] text-slate-700 dark:text-slate-300 transition-colors cursor-pointer text-left flex items-center gap-1"
                    >
                      <span>{p.label}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input Box */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (onToast) onToast('Simulated portfolio/PDF attachment added to draft!');
                    setMessageInput(prev => `${prev} [Attached: Portfolio_Verification_Docs.pdf]`);
                  }}
                  className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  title="Attach CV, Portfolio or Document"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={`Type a direct follow-up message to ${currentUserRole === 'recruiter' ? activeConversation.candidateName : activeConversation.companyName}...`}
                  className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />

                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="px-4 py-2.5 bg-[#2563EB] hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
              <p>Select a conversation from the left to start messaging.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );

  if (isEmbedded) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {content}
    </div>
  );
};
