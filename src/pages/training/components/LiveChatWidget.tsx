import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Minimize2,
  Maximize2,
  Users,
  CheckCircle2,
  Sparkles,
  Building2,
  GraduationCap,
  Laptop,
  Scale,
  RefreshCw,
  Phone,
  Volume2,
  VolumeX,
  ArrowRight,
  Printer,
  Trash2,
  BookOpen,
} from 'lucide-react';
import { ChatMessage, ChatChannel, TypingStatus, ChatCourseCard } from '../types/chat';
import { BRAND_INFO, COURSES } from '../data/academyData';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';
import { Course } from '../types';

export const CHANNELS: ChatChannel[] = [
  {
    id: 'admissions',
    name: 'Admissions & Intake',
    description: 'Upcoming cohort dates, tuition, and verifiable certification',
    advisorName: 'Dr. Folashade Adeyemi, FCA',
    advisorRole: 'Director of Academic Admissions',
    advisorAvatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    specialty: 'Enrollments & Accredited Diplomas',
    statusText: 'Online · Typical reply in seconds',
  },
  {
    id: 'corporate',
    name: 'Corporate Training',
    description: 'Team upskilling, company invoicing, and custom syllabi',
    advisorName: 'Babatunde Adeleke, ACA',
    advisorRole: 'Lead Enterprise Training Advisor',
    advisorAvatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    specialty: 'Enterprise Accounts & Custom Syllabi',
    statusText: 'Online · Enterprise Desk',
  },
  {
    id: 'faculty',
    name: 'Labs & Tech Curriculum',
    description: 'NextSoftHR software labs, tax exercises & AI tools',
    advisorName: 'Engr. Nnamdi Eze',
    advisorRole: 'Head of HR Tech & Software Labs',
    advisorAvatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    specialty: 'Software Simulation & Analytics',
    statusText: 'Online · Technical Faculty',
  },
  {
    id: 'legal',
    name: 'Labor Law & Disputes',
    description: 'Statutory compliance, labor arbitration & termination audits',
    advisorName: 'Barrister Kemi Alabi',
    advisorRole: 'Senior Labor Attorney & Dispute Lead',
    advisorAvatar:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
    specialty: 'Labor Arbitration & Tax Audits',
    statusText: 'Online · Legal Advisory',
  },
];

// Localized Quick Questions
const QUICK_QUESTIONS_BY_LANG: Record<string, Record<string, string[]>> = {
  en: {
    admissions: [
      'When does the next executive cohort start?',
      'What is the course fee in Nigerian Naira (₦)?',
      'Is the Certificate of Completion verifiable?',
    ],
    corporate: [
      'Can our company receive an official invoice?',
      'Do you provide custom on-site HR training?',
      'Are there group volume discounts for 10+ staff?',
    ],
    faculty: [
      'Do courses include hands-on payroll software labs?',
      'What are the prerequisites for HR Analytics?',
      'How does the AI for HR module work?',
    ],
    legal: [
      'What are lawful termination notice rules?',
      'How to prepare for state tax (SIRS/FIRS) audit defense?',
      'Does the course cover Trade Union dispute arbitration?',
    ],
  },
  fr: {
    admissions: [
      'Quand commence la prochaine cohorte ?',
      'Quels sont les frais de formation ?',
      'Les certificats sont-ils vérifiables ?',
    ],
    corporate: [
      'Pouvez-vous émettre une facture d’entreprise ?',
      'Proposez-vous des formations sur site ?',
      'Y a-t-il des remises pour les groupes ?',
    ],
    faculty: [
      'Les cours incluent-ils des ateliers pratiques ?',
      'Quels sont les prérequis pour l’analytique RH ?',
      'Comment fonctionne le module IA pour RH ?',
    ],
    legal: [
      'Quelles sont les règles de rupture de contrat ?',
      'Comment se préparer aux audits fiscaux et sociaux ?',
      'Le cours couvre-t-il l’arbitrage des conflits ?',
    ],
  },
  pt: {
    admissions: [
      'Quando inicia a próxima turma executiva?',
      'Qual é o valor do curso em moeda local?',
      'O certificado de conclusão é verificável?',
    ],
    corporate: [
      'A nossa empresa pode receber fatura oficial?',
      'Vocês realizam capacitação presencial in-company?',
      'Existe desconto para grupos de 10+ colaboradores?',
    ],
    faculty: [
      'Os cursos possuem laboratórios de software de folha?',
      'Quais são os pré-requisitos para People Analytics?',
      'Como funciona o módulo de IA para RH?',
    ],
    legal: [
      'Quais são as regras para rescisão contratual?',
      'Como preparar a empresa para auditorias fiscais?',
      'O curso aborda mediação de conflitos laborais?',
    ],
  },
  es: {
    admissions: [
      '¿Cuándo inicia la próxima cohorte ejecutiva?',
      '¿Cuál es el importe de la matrícula?',
      '¿El certificado es verificable internacionalmente?',
    ],
    corporate: [
      '¿Pueden emitir factura oficial de empresa?',
      '¿Ofrecen formación in-company personalizada?',
      '¿Hay descuentos por volumen para equipos?',
    ],
    faculty: [
      '¿Los cursos incluyen simulaciones de software?',
      '¿Qué requisitos hay para HR Analytics?',
      '¿Cómo se aplica la IA a la productividad de RRHH?',
    ],
    legal: [
      '¿Cuáles son los plazos legales de preaviso de despido?',
      '¿Cómo preparar la defensa ante auditorías fiscales?',
      '¿Se enseña resolución de conflictos y arbitraje?',
    ],
  },
};

const DEFAULT_INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-admissions-1',
    senderId: 'advisor-folashade',
    senderName: 'Dr. Folashade Adeyemi, FCA',
    senderRole: 'advisor',
    channelId: 'admissions',
    text: 'Welcome to the NextSoftHR Training Academy Live Desk! I am Dr. Folashade Adeyemi, Director of Academic Admissions. Ask any questions about upcoming cohort intakes, curriculum syllabi, or verifiable digital certifications.',
    timestamp: Date.now() - 3600000,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    badge: 'Admissions Dean',
    suggestedCourse: {
      id: 'c1',
      title: 'HR Fundamentals: Core Principles & Modern Operations',
      category: 'HR Management',
      priceUSD: 150,
      priceNGN: 125000,
      duration: '4 Weeks (20 Hours)',
      format: 'Self-Paced',
      level: 'Beginner',
    },
  },
  {
    id: 'msg-corporate-1',
    senderId: 'advisor-babatunde',
    senderName: 'Babatunde Adeleke, ACA',
    senderRole: 'advisor',
    channelId: 'corporate',
    text: 'Welcome! I am Babatunde Adeleke, Lead Enterprise Training Advisor. How can we assist with upskilling your payroll and HR teams? We offer bespoke cohort dates, software labs, and corporate invoicing in NGN or USD.',
    timestamp: Date.now() - 3600000,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    badge: 'Enterprise Faculty',
    suggestedCourse: {
      id: 'c2',
      title: 'Payroll Administration & End-to-End Processing',
      category: 'Payroll',
      priceUSD: 160,
      priceNGN: 135000,
      duration: '4 Weeks (24 Hours)',
      format: 'Live Instructor-Led',
      level: 'Intermediate',
    },
  },
  {
    id: 'msg-faculty-1',
    senderId: 'advisor-nnamdi',
    senderName: 'Engr. Nnamdi Eze',
    senderRole: 'advisor',
    channelId: 'faculty',
    text: 'NextSoftHR Technical & Software Labs desk is online. Feel free to ask about our interactive payroll simulation exercises, AI for HR prompts, or attendance biometric integrations.',
    timestamp: Date.now() - 3600000,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    badge: 'Tech & Labs Faculty',
    suggestedCourse: {
      id: 'c8',
      title: 'AI for HR Professionals: Automation & Productivity',
      category: 'AI for HR',
      priceUSD: 170,
      priceNGN: 145000,
      duration: '3 Weeks (18 Hours)',
      format: 'Self-Paced',
      level: 'Beginner',
    },
  },
  {
    id: 'msg-legal-1',
    senderId: 'advisor-kemi',
    senderName: 'Barrister Kemi Alabi',
    senderRole: 'advisor',
    channelId: 'legal',
    text: 'Greetings! I am Barrister Kemi Alabi, Senior Labor Attorney & Employment Dispute Lead. Inquire here regarding statutory audit defense, labor act arbitration, dismissal procedures, and union compliance.',
    timestamp: Date.now() - 3600000,
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
    badge: 'Labor Law Dean',
    suggestedCourse: {
      id: 'c4',
      title: 'Employee Relations & Labor Dispute Resolution',
      category: 'HR Management',
      priceUSD: 140,
      priceNGN: 120000,
      duration: '3 Weeks (18 Hours)',
      format: 'Self-Paced',
      level: 'Intermediate',
    },
  },
];

interface LiveChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenRegister?: (course?: Course) => void;
  onViewCourse?: (course: Course) => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  isOpen,
  onToggle,
  onOpenRegister,
  onViewCourse,
}) => {
  const { formatAmount } = useCurrency();
  const { language } = useLanguage();

  const [activeChannelId, setActiveChannelId] = useState<string>('admissions');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem('nextsofthr_chat_history');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_INITIAL_MESSAGES;
  });

  const [inputText, setInputText] = useState('');
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('nextsofthr_chat_username') || 'Learner';
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const [userId] = useState<string>(() => {
    const existing = localStorage.getItem('nextsofthr_chat_userid');
    if (existing) return existing;
    const generated = `usr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    localStorage.setItem('nextsofthr_chat_userid', generated);
    return generated;
  });

  const [isConnected, setIsConnected] = useState(true);
  const [activeUsersCount, setActiveUsersCount] = useState(3);
  const [typingUsers, setTypingUsers] = useState<TypingStatus[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showProactiveToast, setShowProactiveToast] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<any>(null);

  const currentChannel =
    CHANNELS.find((c) => c.id === activeChannelId) || CHANNELS[0];

  // Play two-tone Web Audio API synthesized notification sound
  const playMessageChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Audio autoplay restrictions
    }
  };

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setShowProactiveToast(false);
    }
  }, [messages, isOpen, activeChannelId]);

  // Show proactive toast after 4 seconds if unopened
  useEffect(() => {
    if (isOpen) return;
    const timer = setTimeout(() => {
      setShowProactiveToast(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Save messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nextsofthr_chat_history', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Fetch latest messages from REST endpoint on mount
  useEffect(() => {
    fetch('/api/chat/messages')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.messages) && data.messages.length > 0) {
          setMessages((prev) => {
            const map = new Map<string, ChatMessage>();
            prev.forEach((m) => map.set(m.id, m));
            data.messages.forEach((m: ChatMessage) => map.set(m.id, m));
            return Array.from(map.values()).sort((a, b) => a.timestamp - b.timestamp);
          });
        }
      })
      .catch((err) => {
        console.warn('Initial chat REST load notice:', err);
      });
  }, []);

  // Connect to WebSocket Server with graceful fallback
  useEffect(() => {
    let reconnectTimeout: any = null;
    let isMounted = true;

    const connectWebSocket = () => {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}`;
        const ws = new WebSocket(wsUrl);
        socketRef.current = ws;

        ws.onopen = () => {
          if (!isMounted) return;
          setIsConnected(true);
          ws.send(
            JSON.stringify({
              type: 'join',
              payload: {
                userId,
                userName,
                userRole: 'learner',
                channelId: activeChannelId,
              },
            })
          );
        };

        ws.onmessage = (event) => {
          if (!isMounted) return;
          try {
            const data = JSON.parse(event.data);
            const { type, payload } = data;

            if (type === 'init') {
              if (Array.isArray(payload.messages) && payload.messages.length > 0) {
                setMessages((prev) => {
                  const map = new Map<string, ChatMessage>();
                  prev.forEach((m) => map.set(m.id, m));
                  payload.messages.forEach((m: ChatMessage) => map.set(m.id, m));
                  return Array.from(map.values()).sort((a, b) => a.timestamp - b.timestamp);
                });
              }
              if (payload.activeUsersCount) {
                setActiveUsersCount(payload.activeUsersCount);
              }
            } else if (type === 'message_created') {
              const newMsg: ChatMessage = payload;
              setMessages((prev) => {
                if (prev.some((m) => m.id === newMsg.id)) return prev;
                return [...prev, newMsg];
              });

              if (newMsg.senderRole === 'advisor') {
                playMessageChime();
              }

              if (!isOpen && newMsg.senderId !== userId) {
                setUnreadCount((c) => c + 1);
              }
            } else if (type === 'presence_update') {
              if (payload.activeUsersCount) {
                setActiveUsersCount(payload.activeUsersCount);
              }
            } else if (type === 'typing_update') {
              const status: TypingStatus = payload;
              setTypingUsers((prev) => {
                const filtered = prev.filter((p) => p.userId !== status.userId);
                if (status.isTyping) {
                  return [...filtered, status];
                }
                return filtered;
              });
            }
          } catch (e) {
            console.warn('Failed to parse WebSocket message:', e);
          }
        };

        ws.onclose = () => {
          if (!isMounted) return;
          setIsConnected(false);
          reconnectTimeout = setTimeout(connectWebSocket, 4000);
        };

        ws.onerror = () => {
          ws.close();
        };
      } catch {
        reconnectTimeout = setTimeout(connectWebSocket, 5000);
      }
    };

    connectWebSocket();

    return () => {
      isMounted = false;
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (socketRef.current) socketRef.current.close();
    };
  }, [userId]);

  // Update server when active channel changes
  useEffect(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: 'switch_channel',
          payload: { channelId: activeChannelId },
        })
      );
    }
  }, [activeChannelId]);

  // Send message handler with optimistic UI
  const handleSendMessage = async (textToSend?: string) => {
    const content = (textToSend || inputText).trim();
    if (!content) return;

    const newMsg: ChatMessage = {
      id: `msg-client-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      senderId: userId,
      senderName: userName,
      senderRole: 'learner',
      channelId: activeChannelId,
      text: content,
      timestamp: Date.now(),
    };

    // Optimistically update message list
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate instant advisor typing indicator
    setTypingUsers((prev) => [
      ...prev.filter((p) => p.userId !== currentChannel.advisorName),
      {
        userId: currentChannel.advisorName,
        userName: currentChannel.advisorName,
        channelId: activeChannelId,
        isTyping: true,
      },
    ]);

    const payload = {
      senderId: userId,
      senderName: userName,
      senderRole: 'learner',
      channelId: activeChannelId,
      text: content,
    };

    // Send via WebSocket if open
    let sentViaWs = false;
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      try {
        socketRef.current.send(
          JSON.stringify({
            type: 'send_message',
            payload,
          })
        );
        sentViaWs = true;
      } catch {}
    }

    // If not sent via WebSocket, use REST API
    if (!sentViaWs) {
      try {
        const res = await fetch('/api/chat/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success && json.message) {
          // Message already rendered optimistically
        }
      } catch (err) {
        console.warn('Fallback chat send notice:', err);
      }
    }

    // Clear typing timeout
    setTimeout(() => {
      setTypingUsers((prev) => prev.filter((p) => p.userId !== currentChannel.advisorName));
    }, 2500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: 'typing',
          payload: { channelId: activeChannelId, isTyping: true },
        })
      );

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(
            JSON.stringify({
              type: 'typing',
              payload: { channelId: activeChannelId, isTyping: false },
            })
          );
        }
      }, 1500);
    }
  };

  const handleSaveUserName = () => {
    const trimmed = tempName.trim() || 'Learner';
    setUserName(trimmed);
    localStorage.setItem('nextsofthr_chat_username', trimmed);
    setIsEditingName(false);

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: 'join',
          payload: {
            userId,
            userName: trimmed,
            userRole: 'learner',
            channelId: activeChannelId,
          },
        })
      );
    }
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Reset this conversation to initial state?')) return;
    try {
      const res = await fetch('/api/chat/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelId: activeChannelId }),
      });
      const data = await res.json();
      if (data.success && data.messages) {
        setMessages(data.messages);
      } else {
        setMessages(DEFAULT_INITIAL_MESSAGES);
      }
    } catch {
      setMessages(DEFAULT_INITIAL_MESSAGES);
    }
    localStorage.removeItem('nextsofthr_chat_history');
  };

  const handlePrintTranscript = () => {
    window.print();
  };

  // Filter messages for current channel
  const channelMessages = messages.filter((m) => m.channelId === activeChannelId);

  // Active typing indicators for this channel
  const currentChannelTyping = typingUsers.filter(
    (t) => t.channelId === activeChannelId && t.userId !== userId
  );

  const formatTime = (ts: number) => {
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Quick questions localized
  const langKey = language in QUICK_QUESTIONS_BY_LANG ? language : 'en';
  const currentQuestions =
    QUICK_QUESTIONS_BY_LANG[langKey]?.[activeChannelId] ||
    QUICK_QUESTIONS_BY_LANG.en[activeChannelId] ||
    [];

  const getChannelIcon = (id: string) => {
    switch (id) {
      case 'corporate':
        return Building2;
      case 'faculty':
        return Laptop;
      case 'legal':
        return Scale;
      default:
        return GraduationCap;
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
        {/* Proactive Invitation Toast Bubble */}
        {!isOpen && showProactiveToast && (
          <div className="mb-2.5 max-w-xs bg-white dark:bg-[#0F172A] rounded-2xl p-3.5 shadow-2xl border border-slate-200 dark:border-slate-800 text-left text-xs animate-in fade-in slide-in-from-bottom-2 duration-200 relative">
            <button
              onClick={() => setShowProactiveToast(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-2 mb-1.5">
              <img
                src={CHANNELS[0].advisorAvatar}
                alt={CHANNELS[0].advisorName}
                className="w-6 h-6 rounded-full object-cover border border-[#84CC16]"
              />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block leading-none">
                  {CHANNELS[0].advisorName}
                </span>
                <span className="text-[10px] text-lime-600 dark:text-lime-400 font-semibold">
                  Online Admissions Dean
                </span>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed mb-2">
              Have questions about next month's cohort intakes, course fees, or company invoice billing? Ask our faculty live!
            </p>
            <button
              onClick={onToggle}
              className="w-full py-1.5 px-3 text-[11px] font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-3 h-3 text-[#84CC16]" />
              <span>Open Live Admissions Desk</span>
            </button>
          </div>
        )}

        {!isOpen && (
          <button
            onClick={onToggle}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full shadow-xl border-2 border-white dark:border-slate-800 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Open NextSoftHR Live Chat"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-[#84CC16]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#84CC16] ring-2 ring-[#0F4C81]" />
            </div>

            <span className="text-xs font-bold hidden sm:inline">
              Live Admissions Desk
            </span>

            {/* Live Indicator Pill */}
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-lime-400/20 text-[#84CC16] text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
              <span>Live · 4 Desks</span>
            </span>

            {/* Unread badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-extrabold flex items-center justify-center shadow-sm animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Live Chat Window Container */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-200 shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] ${
            isExpanded
              ? 'inset-2 sm:inset-6 md:inset-10 rounded-2xl'
              : 'bottom-4 right-4 sm:right-6 w-[95vw] sm:w-[440px] h-[610px] max-h-[92vh] rounded-2xl'
          } animate-in fade-in slide-in-from-bottom-3`}
        >
          {/* Top Bar Header */}
          <div className="bg-gradient-to-r from-[#0F4C81] via-[#0B3C68] to-[#0A2E50] text-white p-3.5 sm:p-4 flex-shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src={currentChannel.advisorAvatar}
                  alt={currentChannel.advisorName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#84CC16]"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#84CC16] ring-2 ring-[#0F4C81]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    {currentChannel.advisorName}
                  </h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#84CC16]" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-blue-200">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
                  <span>{isConnected ? 'Real-Time Online' : 'Connecting...'}</span>
                  <span>·</span>
                  <span className="text-lime-300 font-semibold">{currentChannel.advisorRole}</span>
                </div>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
                title={soundEnabled ? 'Mute notification sound' : 'Enable notification sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={handlePrintTranscript}
                className="hidden sm:inline-flex p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
                title="Print / Save Chat Transcript"
              >
                <Printer className="w-4 h-4" />
              </button>

              <button
                onClick={handleClearHistory}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
                title="Clear Chat History"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:inline-flex p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
                title={isExpanded ? 'Restore window size' : 'Expand window'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onToggle}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Channel Selector Tabs (4 Desks) */}
          <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-between gap-1 flex-shrink-0">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full">
              {CHANNELS.map((ch) => {
                const isActive = ch.id === activeChannelId;
                const Icon = getChannelIcon(ch.id);
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannelId(ch.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-slate-800 text-[#0F4C81] dark:text-[#84CC16] shadow-2xs font-bold border border-slate-200 dark:border-slate-700'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{ch.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Name Tag & Quick Hotline Bar */}
          <div className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-1.5 truncate">
              <span>Chatting as:</span>
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="px-1.5 py-0.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-100 w-28 focus:outline-none"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveUserName();
                    }}
                  />
                  <button
                    onClick={handleSaveUserName}
                    className="text-[#0F4C81] dark:text-[#84CC16] font-bold hover:underline cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setTempName(userName);
                    setIsEditingName(true);
                  }}
                  className="font-bold text-slate-800 dark:text-slate-200 hover:text-[#0F4C81] dark:hover:text-[#84CC16] flex items-center gap-0.5 cursor-pointer underline decoration-dotted"
                  title="Click to change your display name"
                >
                  <span>{userName}</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                <Users className="w-3 h-3 text-[#84CC16]" />
                <span>{activeUsersCount} online</span>
              </span>
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#65A30D] dark:text-[#84CC16] hover:underline flex items-center gap-1 text-[11px] font-semibold"
                title="Chat on WhatsApp"
              >
                <span>WhatsApp</span>
              </a>
              <span>·</span>
              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="text-[#0F4C81] dark:text-[#84CC16] hover:underline flex items-center gap-1 text-[11px] font-semibold"
                title="Call Admissions Desk"
              >
                <Phone className="w-3 h-3" />
                <span className="hidden sm:inline">Call Desk</span>
              </a>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-[#0B1120]/40">
            {channelMessages.map((msg) => {
              const isMe = msg.senderId === userId;
              const isAdvisor = msg.senderRole === 'advisor';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} transition-opacity animate-in fade-in duration-150`}
                >
                  {/* Sender Header */}
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400 dark:text-slate-500">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {isMe ? 'You' : msg.senderName}
                    </span>
                    {msg.badge && (
                      <span className="px-1.5 py-0.2 rounded bg-lime-100 dark:bg-lime-950/80 text-[#65A30D] dark:text-[#84CC16] font-bold text-[9px] border border-lime-300 dark:border-lime-800/80">
                        {msg.badge}
                      </span>
                    )}
                    <span>·</span>
                    <span>{formatTime(msg.timestamp)}</span>
                  </div>

                  {/* Speech Bubble */}
                  <div
                    className={`relative max-w-[88%] sm:max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed break-words shadow-2xs ${
                      isMe
                        ? 'bg-[#0F4C81] text-white rounded-br-xs'
                        : isAdvisor
                        ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200/90 dark:border-slate-700/80'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-xs'
                    }`}
                  >
                    <div>{msg.text}</div>

                    {/* Interactive Suggested Course Card */}
                    {msg.suggestedCourse && (
                      <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-700/80">
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700 text-left">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-blue-100 dark:bg-blue-950 text-[#0F4C81] dark:text-blue-300">
                              {msg.suggestedCourse.category}
                            </span>
                            <span className="text-[10px] font-extrabold text-[#0F4C81] dark:text-[#84CC16]">
                              {formatAmount(msg.suggestedCourse.priceUSD)}
                            </span>
                          </div>

                          <div className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">
                            {msg.suggestedCourse.title}
                          </div>

                          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                            <span>{msg.suggestedCourse.duration}</span>
                            <span>·</span>
                            <span>{msg.suggestedCourse.format}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 mt-2">
                            {onViewCourse && (
                              <button
                                onClick={() => {
                                  const fullCourse =
                                    COURSES.find((c) => c.id === msg.suggestedCourse!.id) || COURSES[0];
                                  onViewCourse(fullCourse);
                                }}
                                className="px-2 py-1 text-[10px] font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                              >
                                <BookOpen className="w-3 h-3 text-[#0F4C81] dark:text-[#84CC16]" />
                                <span>View Details</span>
                              </button>
                            )}

                            {onOpenRegister && (
                              <button
                                onClick={() => {
                                  const fullCourse =
                                    COURSES.find((c) => c.id === msg.suggestedCourse!.id) || COURSES[0];
                                  onOpenRegister(fullCourse);
                                }}
                                className="px-2 py-1 text-[10px] font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                              >
                                <span>Enroll Now</span>
                                <ArrowRight className="w-3 h-3 text-[#84CC16]" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Real-time Typing Indicator with bouncing dots */}
            {currentChannelTyping.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 italic py-1 px-2 animate-in fade-in">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>
                  {currentChannel.advisorName} is typing a response...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Chips */}
          <div className="px-3.5 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-[#84CC16]" />
              <span>Suggested:</span>
            </span>
            {currentQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#0F4C81] dark:hover:text-[#84CC16] rounded-full border border-slate-200/80 dark:border-slate-700 transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 flex-shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder={`Ask ${currentChannel.advisorName.split(' ')[0]} a question...`}
              className="flex-grow px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0F4C81] dark:focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-[#84CC16]" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
