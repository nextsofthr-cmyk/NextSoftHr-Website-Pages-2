import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Star,
  CheckCircle2,
  Quote,
  Sparkles,
  Building2,
  MapPin,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Award,
  Video,
  ExternalLink,
  Layers,
  Laptop,
  Landmark,
  HeartPulse,
  ShoppingBag,
  Truck,
} from 'lucide-react';

interface ClientSpotlightProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

export type IndustryCategory =
  | 'Tech'
  | 'Finance'
  | 'Healthcare'
  | 'Retail'
  | 'Logistics'
  | 'Energy';

interface SpotlightLeader {
  id: string;
  name: string;
  position: string;
  company: string;
  category: IndustryCategory;
  industry: string;
  staffCount: string;
  city: string;
  country: string;
  countryFlag: string;
  avatarUrl: string;
  videoThumbUrl: string;
  headlineQuote: string;
  fullTestimonial: string;
  spokenScript: string;
  videoDuration: string;
  impactMetric: {
    value: string;
    label: string;
  };
  beforeAfter: {
    before: string;
    after: string;
  };
  tags: string[];
}

const SPOTLIGHT_LEADERS: SpotlightLeader[] = [
  {
    id: 'leader-1',
    name: 'Engr. Babatunde Adeleke',
    position: 'Chief Operating Officer & Board Director',
    company: 'Horizon Energy & Industrial Group',
    category: 'Energy',
    industry: 'Heavy Industry & Downstream Energy',
    staffCount: '850+ Staff across 4 States',
    city: 'Lagos & Port Harcourt',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    videoThumbUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
    headlineQuote:
      'We eradicated ghost workers and payroll leaks across our refineries in under 60 days.',
    fullTestimonial:
      'Managing 850 personnel across refinery depots and offshore sites was an administrative nightmare of paper logs and ghost workers. NextSofthr biometric turnstiles and GPS mobile geofencing linked directly to our payroll. We recovered over ₦42 Million in leaked labor costs in our very first year.',
    spokenScript:
      'Before NextSofthr, attendance reconciliation across our four industrial depots took an entire week of arguing over paper logs. With NextSofthr biometric turnstiles syncing straight into payroll, our ghost worker problem disappeared overnight. We saved over 42 Million Naira in our first year.',
    videoDuration: '1:18',
    impactMetric: {
      value: '₦42M+',
      label: 'Annual payroll leakage eliminated',
    },
    beforeAfter: {
      before: '7 days of manual paper timesheet disputes',
      after: 'Instant biometric sync with zero variance',
    },
    tags: ['Biometric Attendance', 'Turnstile Sync', 'Heavy Industry'],
  },
  {
    id: 'leader-6',
    name: 'Chioma Nwachukwu',
    position: 'VP of People Operations & Global Talent',
    company: 'Kora Cloud & Fintech Africa',
    category: 'Tech',
    industry: 'Cloud Infrastructure & High-Growth Fintech',
    staffCount: '540+ Remote Engineers across 8 Countries',
    city: 'Lagos, Nairobi & London',
    country: 'Pan-African Tech Hub',
    countryFlag: '🌍',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop',
    videoThumbUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    headlineQuote:
      'Cross-border split payroll in USD and local currencies runs with 100% precision.',
    fullTestimonial:
      'Our distributed software engineering teams are compensated across multiple African corridors in dual currencies. NextSofthr handles our cross-border FX conversions, split payrolls, equity option vesting schedules, and remote equipment tracking seamlessly. What used to take our finance team 5 days now takes under 30 minutes.',
    spokenScript:
      'Managing 540 remote software engineers across eight African countries used to require three separate payroll tools and endless spreadsheet conversions. NextSofthr brought our multi-currency contracts, compliance, and developer equipment tracking into one unified dashboard.',
    videoDuration: '1:08',
    impactMetric: {
      value: '5 Days → 30 Min',
      label: 'Remote multi-currency payroll prep',
    },
    beforeAfter: {
      before: 'Manual multi-currency banking files & tax spreadsheets',
      after: 'Automated multi-currency payouts & split payslips',
    },
    tags: ['Multi-Currency Payroll', 'Remote Tech Teams', 'Fintech & SaaS'],
  },
  {
    id: 'leader-2',
    name: 'Dr. Farida Mugo',
    position: 'VP of People & Clinical Operations',
    company: 'Savanna Health Networks',
    category: 'Healthcare',
    industry: 'Healthcare & Multi-Hospital Clinics',
    staffCount: '1,200+ Medical Staff',
    city: 'Nairobi & Mombasa',
    country: 'Kenya',
    countryFlag: '🇰🇪',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    videoThumbUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    headlineQuote:
      'Our monthly payroll for 1,200 medical staff went from 4 stressful days down to 45 minutes.',
    fullTestimonial:
      'Hospitals operate 24/7 with complicated doctor call-rotas, night shift differentials, and strict statutory KRA PAYE and NHIF/SHIF deductions. NextSofthr handles our entire multi-facility shift rosters seamlessly. Our clinical staff get their payslips instantly on their mobile phones on the 25th of every month.',
    spokenScript:
      'In hospital operations, our clinicians cannot afford payroll stress. NextSofthr automated our complex shift allowances, on-call rates, and Kenyan statutory tax filings. What previously took four stressful days now runs smoothly in 45 minutes.',
    videoDuration: '1:04',
    impactMetric: {
      value: '4 Days → 45 Min',
      label: 'Monthly payroll turnaround time',
    },
    beforeAfter: {
      before: 'Fragmented Excel files across 8 hospitals',
      after: 'Unified 1-click multi-facility payroll run',
    },
    tags: ['24/7 Shift Rosters', 'KRA & SHIF Statutory', 'Healthcare'],
  },
  {
    id: 'leader-3',
    name: 'Kwame Boateng',
    position: 'Managing Director & Founder',
    company: 'Volta Logistics & Cold-Chain',
    category: 'Logistics',
    industry: 'Logistics, Freight & Distribution',
    staffCount: '420+ Drivers & Crew',
    city: 'Accra, Kumasi & Tema',
    country: 'Ghana',
    countryFlag: '🇬🇭',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    videoThumbUrl: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1200&auto=format&fit=crop',
    headlineQuote:
      'Our drivers clock in via mobile geofence even when deep in transit corridors with spotty network.',
    fullTestimonial:
      'Our fleet moves perishables across Ghana, Togo, and Côte d’Ivoire. The NextSofthr mobile app with offline caching allows our field drivers and warehouse loaders to check in seamlessly. Furthermore, GRA tax schedules and tier-one pension filings are 100% automated with zero fines.',
    spokenScript:
      'Operating interstate logistics means our drivers are constantly on the move. NextSofthr offline GPS geofencing makes check-ins completely painless. We have achieved 99 percent roster adherence without a single statutory tax filing penalty.',
    videoDuration: '0:56',
    impactMetric: {
      value: '99.4%',
      label: 'On-time shift roster adherence',
    },
    beforeAfter: {
      before: 'Unverified paper logs & route absenteeism',
      after: 'GPS verified check-ins & automatic GRA tax files',
    },
    tags: ['Offline Mobile GPS', 'GRA Compliance', 'Fleet Logistics'],
  },
  {
    id: 'leader-4',
    name: 'Sibongile Dlamini',
    position: 'Executive Head of Human Capital',
    company: 'Zenith Financial & Merchant Bank',
    category: 'Finance',
    industry: 'Banking & Financial Services',
    staffCount: '680+ Finance Professionals',
    city: 'Johannesburg & Cape Town',
    country: 'South Africa',
    countryFlag: '🇿🇦',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    videoThumbUrl: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?q=80&w=1200&auto=format&fit=crop',
    headlineQuote:
      'Pristine POPIA data compliance and zero regulatory tax filing penalties.',
    fullTestimonial:
      'As an institutional financial group, audit readiness is non-negotiable. NextSofthr provides bank-grade AES-256 encryption, immutable audit trails for every salary change, and automated SARS tax schedules. It has given our board of directors absolute peace of mind during compliance audits.',
    spokenScript:
      'In commercial banking, regulatory scrutiny from SARS and the Reserve Bank is relentless. NextSofthr provides tamper-evident audit logs and rigorous data isolation. It passed our rigorous information security due diligence with flying colors.',
    videoDuration: '1:12',
    impactMetric: {
      value: '100%',
      label: 'Pristine POPIA & SARS Audit Record',
    },
    beforeAfter: {
      before: 'Manual audit compilations taking 3 weeks',
      after: 'Instant 1-click audit-ready board reports',
    },
    tags: ['POPIA & GDPR', 'Banking Security', 'Audit Ready'],
  },
  {
    id: 'leader-5',
    name: 'Aline Uwase',
    position: 'Chief People & Culture Officer',
    company: 'Great Lakes E-Commerce & Retail',
    category: 'Retail',
    industry: 'E-Commerce & Digital Retail',
    staffCount: '310+ Staff across East Africa',
    city: 'Kigali & Gisenyi',
    country: 'Rwanda',
    countryFlag: '🇷🇼',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop',
    videoThumbUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop',
    headlineQuote:
      'Employee Self-Service dropped internal HR helpdesk requests by 84%.',
    fullTestimonial:
      'Our young tech-savvy workforce expects modern, mobile-first software. With NextSofthr Employee Self-Service, staff check leave balances, submit medical claims, and download their RSSB pension summaries directly on their smartphones without emailing HR.',
    spokenScript:
      'Our team wanted a seamless modern app, not clunky legacy portals. NextSofthr mobile self-service empowered our staff across Kigali to manage their own leaves, tax certificates, and expenses. Our HR inbox went from chaos to calm.',
    videoDuration: '0:52',
    impactMetric: {
      value: '84%',
      label: 'Reduction in routine HR inquiries',
    },
    beforeAfter: {
      before: 'Flooded HR inboxes for routine payslips',
      after: '24/7 instant mobile self-service downloads',
    },
    tags: ['Self-Service App', 'RSSB Rwanda', 'Tech & E-Commerce'],
  },
];

interface CategoryFilterOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORY_FILTERS: CategoryFilterOption[] = [
  { id: 'all', label: 'All Industries', icon: Layers },
  { id: 'Tech', label: 'Tech & Telecom', icon: Laptop },
  { id: 'Finance', label: 'Finance & Banking', icon: Landmark },
  { id: 'Healthcare', label: 'Healthcare & Clinics', icon: HeartPulse },
  { id: 'Retail', label: 'Retail & E-Commerce', icon: ShoppingBag },
  { id: 'Logistics', label: 'Logistics & Fleet', icon: Truck },
  { id: 'Energy', label: 'Heavy Industry & Energy', icon: Building2 },
];

const AUTO_PLAY_INTERVAL = 7000; // 7 seconds per slide

export const ClientSpotlight: React.FC<ClientSpotlightProps> = ({
  onOpenDemo,
  onOpenGetStarted,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState<boolean>(false);
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Dynamically filtered leaders based on selected industry category
  const filteredLeaders = useMemo(() => {
    if (selectedCategory === 'all') {
      return SPOTLIGHT_LEADERS;
    }
    return SPOTLIGHT_LEADERS.filter((leader) => leader.category === selectedCategory);
  }, [selectedCategory]);

  const activeLeader = filteredLeaders[activeIndex] || filteredLeaders[0] || SPOTLIGHT_LEADERS[0];
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<number>(0);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // Reset index safely if filtered leaders count decreases
  useEffect(() => {
    if (activeIndex >= filteredLeaders.length) {
      setActiveIndex(0);
      setProgress(0);
    }
  }, [filteredLeaders.length, activeIndex]);

  // Auto-play progress bar timer
  useEffect(() => {
    if (isAutoPlayPaused || isPlayingVideo || isCardHovered || filteredLeaders.length <= 1) {
      return;
    }

    const stepMs = 50;
    const totalSteps = AUTO_PLAY_INTERVAL / stepMs;
    let currentStep = Math.round((progressRef.current / 100) * totalSteps);

    progressTimerRef.current = setInterval(() => {
      currentStep++;
      const nextProgress = (currentStep / totalSteps) * 100;
      setProgress(nextProgress);

      if (currentStep >= totalSteps) {
        setActiveIndex((prev) => (prev + 1) % filteredLeaders.length);
        currentStep = 0;
        setProgress(0);
      }
    }, stepMs);

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [activeIndex, isAutoPlayPaused, isPlayingVideo, isCardHovered, filteredLeaders.length]);

  // Speech narration when user clicks "Play Video Clip"
  const handleTogglePlayVideo = () => {
    if (!isPlayingVideo) {
      setIsPlayingVideo(true);
      if (!isMuted && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(activeLeader.spokenScript);
          utterance.rate = 1.0;
          utterance.onend = () => setIsPlayingVideo(false);
          utterance.onerror = () => setIsPlayingVideo(false);
          window.speechSynthesis.speak(utterance);
        } catch {
          // Graceful fallback
        }
      }
    } else {
      setIsPlayingVideo(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleNext = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlayingVideo(false);
    setProgress(0);
    if (filteredLeaders.length > 1) {
      setActiveIndex((prev) => (prev + 1) % filteredLeaders.length);
    }
  };

  const handlePrev = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlayingVideo(false);
    setProgress(0);
    if (filteredLeaders.length > 1) {
      setActiveIndex((prev) => (prev - 1 + filteredLeaders.length) % filteredLeaders.length);
    }
  };

  const handleSelectLeader = (index: number) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlayingVideo(false);
    setProgress(0);
    setActiveIndex(index);
  };

  const handleCategoryFilter = (categoryId: string) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlayingVideo(false);
    setSelectedCategory(categoryId);
    setActiveIndex(0);
    setProgress(0);
  };

  return (
    <section
      id="client-spotlight"
      className="py-20 bg-slate-900 text-white relative overflow-hidden transition-colors"
    >
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540] via-[#07182E] to-slate-950 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#0256C4]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#84CC16]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header with Pan-African Context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-[#84CC16] mb-3">
              <Video className="w-3.5 h-3.5" />
              <span>Client Spotlight • Pan-African Executive Case Studies</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Voices of African Leaders{' '}
              <span className="text-[#84CC16]">Scaling with NextSofthr</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Watch real testimonials from enterprise directors, CFOs, and founders across Nigeria, Kenya, Ghana, South Africa, and Rwanda who transformed their operational margins.
            </p>
          </div>

          {/* Controls: Prev / Next Buttons & Auto-Play Status */}
          <div className="flex items-center gap-3 self-start md:self-end shrink-0">
            <div className="text-xs font-mono text-slate-400 hidden sm:block">
              <span className="text-white font-bold">{activeIndex + 1}</span> / {filteredLeaders.length}
            </div>

            <button
              type="button"
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
              aria-label="Previous client spotlight"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-[#84CC16] hover:bg-[#73b612] text-[#0A2540] flex items-center justify-center font-bold transition-all cursor-pointer shadow-md hover:scale-105"
              aria-label="Next client spotlight"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Industry Category Filter Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Filter by Industry:</span>
            </div>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => handleCategoryFilter('all')}
                className="text-xs text-[#84CC16] hover:underline font-semibold cursor-pointer"
              >
                Reset to All Industries
              </button>
            )}
          </div>

          <div
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap"
            role="tablist"
            aria-label="Filter testimonials by industry"
          >
            {CATEGORY_FILTERS.map((filter) => {
              const isSelected = selectedCategory === filter.id;
              const count =
                filter.id === 'all'
                  ? SPOTLIGHT_LEADERS.length
                  : SPOTLIGHT_LEADERS.filter((l) => l.category === filter.id).length;
              const FilterIcon = filter.icon;

              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryFilter(filter.id)}
                  className={`group px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer transform hover:-translate-y-0.5 ${
                    isSelected
                      ? 'bg-[#84CC16] text-[#0A2540] shadow-lg shadow-[#84CC16]/20 ring-2 ring-[#84CC16]/50 scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  <FilterIcon
                    className={`w-3.5 h-3.5 transition-colors ${
                      isSelected ? 'text-[#0A2540]' : 'text-[#84CC16]'
                    }`}
                  />
                  <span>{filter.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold transition-colors ${
                      isSelected
                        ? 'bg-[#0A2540]/25 text-[#0A2540]'
                        : 'bg-white/10 text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Main Card with Hover Scale & Tactile Feedback */}
        <div
          onMouseEnter={() => {
            setIsCardHovered(true);
            setIsAutoPlayPaused(true);
          }}
          onMouseLeave={() => {
            setIsCardHovered(false);
            setIsAutoPlayPaused(false);
          }}
          className={`relative bg-white/5 backdrop-blur-md rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 ease-out transform cursor-default ${
            isCardHovered
              ? 'scale-[1.015] sm:scale-[1.02] border-[#84CC16]/60 shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_35px_rgba(132,204,22,0.18)] ring-1 ring-[#84CC16]/40'
              : 'border-white/15 hover:border-white/25'
          }`}
        >
          {/* Top Progress Bar for active slide */}
          <div className="w-full h-1.5 bg-white/10 relative">
            <div
              className={`h-full transition-all duration-75 ${
                isCardHovered
                  ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                  : 'bg-[#84CC16]'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* LEFT: Video Interview Frame (5 Cols) */}
            <div className="lg:col-span-5 relative bg-black flex flex-col justify-between min-h-[380px] sm:min-h-[460px] overflow-hidden group">
              {/* Presenter Background Thumbnail */}
              <img
                src={activeLeader.videoThumbUrl}
                alt={activeLeader.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 group-hover:scale-103 transition-transform duration-700"
              />

              {/* Shading gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />

              {/* Top Tag & Duration / Hover Pause Feedback */}
              <div className="relative z-10 p-5 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-[#84CC16]">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Executive Video Clip</span>
                </span>

                <div className="flex items-center gap-2">
                  {isCardHovered && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-[10px] font-bold text-amber-300 animate-in fade-in duration-200">
                      <Pause className="w-2.5 h-2.5 fill-current" />
                      <span>Rotation Paused</span>
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/90">
                    {activeLeader.videoDuration} HD
                  </span>
                </div>
              </div>

              {/* Center Play Indicator */}
              <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                <button
                  type="button"
                  onClick={handleTogglePlayVideo}
                  aria-label={isPlayingVideo ? 'Pause executive clip' : 'Play executive clip'}
                  className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer ${
                    isPlayingVideo
                      ? 'bg-black/60 text-white scale-100 hover:scale-105 border border-white/30'
                      : 'bg-[#84CC16] hover:bg-[#73b612] text-[#0A2540] scale-105 hover:scale-110'
                  }`}
                >
                  {isPlayingVideo ? (
                    <Pause className="w-8 h-8 fill-current" />
                  ) : (
                    <Play className="w-8 h-8 fill-current ml-1" />
                  )}
                </button>

                <span className="mt-3 text-xs font-bold text-white tracking-wide bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/15">
                  {isPlayingVideo ? 'Playing Interview Audio (Voice)' : 'Click to Play Audio Clip'}
                </span>
              </div>

              {/* Bottom Speaker Overlay */}
              <div className="relative z-10 p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="flex items-center gap-3">
                  <img
                    src={activeLeader.avatarUrl}
                    alt={activeLeader.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#84CC16] shadow-md shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-white truncate">
                      {activeLeader.name}
                    </div>
                    <div className="text-xs text-[#84CC16] font-medium truncate">
                      {activeLeader.position}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{activeLeader.city}, {activeLeader.country} {activeLeader.countryFlag}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Detailed Testimonial, Impact Metric & Transformation (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              
              {/* Header: Company & Verified Customer Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#84CC16]" />
                  <span className="text-base font-black text-white">{activeLeader.company}</span>
                  <span className="text-xs text-slate-400 hidden sm:inline">• {activeLeader.industry}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#84CC16]" />
                  <span>Verified Customer ({activeLeader.staffCount})</span>
                </div>
              </div>

              {/* Bold Quotation */}
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-white">5.0 Verified Enterprise Rating</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  &ldquo;{activeLeader.headlineQuote}&rdquo;
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  {activeLeader.fullTestimonial}
                </p>
              </div>

              {/* Transformation Bento: Before vs After & Impact Metric */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                {/* Metric Card (5 cols) */}
                <div className="sm:col-span-5 p-4 rounded-2xl bg-gradient-to-br from-[#0256C4]/40 to-[#0A2540] border border-blue-500/30 flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#84CC16]">
                    {activeLeader.impactMetric.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">
                    {activeLeader.impactMetric.label}
                  </div>
                </div>

                {/* Before vs After Card (7 cols) */}
                <div className="sm:col-span-7 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-bold uppercase text-[10px] shrink-0">
                      Before:
                    </span>
                    <span className="text-slate-400 leading-tight">{activeLeader.beforeAfter.before}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase text-[10px] shrink-0">
                      After:
                    </span>
                    <span className="text-white font-semibold leading-tight">{activeLeader.beforeAfter.after}</span>
                  </div>
                </div>
              </div>

              {/* Tags and Direct Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeLeader.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[11px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={onOpenDemo}
                    className="py-2.5 px-4 rounded-xl bg-[#84CC16] hover:bg-[#73b612] text-[#0A2540] font-black text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Request Similar Setup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/2349158482622?text=Hello%20NextSofthr%20Team%2C%20I%20saw%20the%20case%20study%20for%20${encodeURIComponent(activeLeader.company)}%20and%20would%20like%20to%20learn%20how%20you%20can%20do%20the%20same%20for%20our%20business.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
                  >
                    <span>WhatsApp Case Study</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Thumbnail Selector Strip (Click to jump to leader) */}
        <div
          className={`mt-8 grid gap-3 ${
            filteredLeaders.length === 1
              ? 'grid-cols-1 max-w-xs'
              : filteredLeaders.length === 2
              ? 'grid-cols-1 sm:grid-cols-2 max-w-xl'
              : filteredLeaders.length === 3
              ? 'grid-cols-1 sm:grid-cols-3 max-w-3xl'
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
          }`}
        >
          {filteredLeaders.map((leader, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={leader.id}
                type="button"
                onMouseEnter={() => {
                  setIsAutoPlayPaused(true);
                  setIsCardHovered(true);
                }}
                onMouseLeave={() => {
                  setIsAutoPlayPaused(false);
                  setIsCardHovered(false);
                }}
                onClick={() => handleSelectLeader(idx)}
                className={`p-3 rounded-2xl text-left border transition-all duration-300 ease-out cursor-pointer flex items-center gap-3 transform hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-lg ${
                  isSelected
                    ? 'bg-[#0256C4]/50 border-[#84CC16] shadow-lg scale-102 ring-2 ring-[#84CC16]/40 text-white'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#84CC16]/50 hover:shadow-black/40'
                }`}
              >
                <img
                  src={leader.avatarUrl}
                  alt={leader.name}
                  className="w-9 h-9 rounded-full object-cover shrink-0 border border-white/20 shadow-sm"
                />
                <div className="min-w-0">
                  <div className={`text-xs font-bold truncate transition-colors ${isSelected ? 'text-[#84CC16]' : 'text-white group-hover:text-[#84CC16]'}`}>
                    {leader.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {leader.company} • {leader.countryFlag}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Subtle Bottom Dot Navigation & Segmented Progress Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
          {/* Active Story Position & Details */}
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#84CC16]/20 border border-[#84CC16]/40 text-[11px] font-mono font-bold text-[#84CC16]">
              {activeIndex + 1}
            </span>
            <span className="text-slate-400">of {filteredLeaders.length} Testimonials</span>
            {selectedCategory !== 'all' && (
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-[#84CC16] font-medium">
                {CATEGORY_FILTERS.find((c) => c.id === selectedCategory)?.label}
              </span>
            )}
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline font-medium text-white truncate max-w-[280px]">
              {activeLeader.name} ({activeLeader.countryFlag} {activeLeader.company})
            </span>
          </div>

          {/* Interactive Dot / Progress Bar Indicator */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Client testimonial pagination"
          >
            {filteredLeaders.map((leader, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={`dot-${leader.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Go to slide ${idx + 1}: ${leader.name} from ${leader.company}`}
                  onClick={() => handleSelectLeader(idx)}
                  onMouseEnter={() => {
                    setIsAutoPlayPaused(true);
                    setIsCardHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsAutoPlayPaused(false);
                    setIsCardHovered(false);
                  }}
                  className={`group relative py-1.5 focus:outline-none cursor-pointer transition-all duration-300 ${
                    isSelected ? 'px-0.5' : 'px-0.5 hover:scale-125'
                  }`}
                >
                  {isSelected ? (
                    // Active Pill with subtle progress fill inside
                    <div className="w-10 h-2 rounded-full bg-white/15 border border-[#84CC16]/70 overflow-hidden relative shadow-[0_0_10px_rgba(132,204,22,0.3)]">
                      <div
                        className={`h-full transition-all duration-75 ${
                          isCardHovered ? 'bg-amber-400' : 'bg-[#84CC16]'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  ) : (
                    // Subtle Inactive Dot
                    <div className="w-2.5 h-2 rounded-full bg-white/20 group-hover:bg-white/50 transition-colors duration-200" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Prev / Next Pagination Controls */}
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={handlePrev}
              disabled={filteredLeaders.length <= 1}
              aria-label="Previous testimonial"
              className={`p-1.5 rounded-lg border transition-all ${
                filteredLeaders.length <= 1
                  ? 'bg-white/5 border-white/5 text-slate-600 cursor-not-allowed'
                  : 'bg-white/5 hover:bg-white/15 border-white/10 text-slate-300 hover:text-white cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={filteredLeaders.length <= 1}
              aria-label="Next testimonial"
              className={`p-1.5 rounded-lg border transition-all ${
                filteredLeaders.length <= 1
                  ? 'bg-white/5 border-white/5 text-slate-600 cursor-not-allowed'
                  : 'bg-white/5 hover:bg-white/15 border-white/10 text-slate-300 hover:text-white cursor-pointer'
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
