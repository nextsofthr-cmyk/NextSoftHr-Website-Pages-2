import React, { useState, useEffect } from 'react';
import {
  Users,
  Cpu,
  Zap,
  TrendingUp,
  Workflow,
  Trophy,
  Globe2,
  MapPin,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const MissionVision: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<string>('lagos');
  const [pillarItemsPerPage, setPillarItemsPerPage] = useState<number>(4);
  const [pillarPage, setPillarPage] = useState<number>(0);
  const [pillarTouchStart, setPillarTouchStart] = useState<number | null>(null);
  const [pillarTouchEnd, setPillarTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPillarItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setPillarItemsPerPage(2);
      } else {
        setPillarItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const missionPillars = [
    {
      title: 'People',
      description: 'Human-centered workflows that prioritize employee dignity, transparent compensation, and clarity.',
      icon: Users,
    },
    {
      title: 'Technology',
      description: 'Cloud infrastructure engineered for 99.9% uptime, data encryption, and instant synchronization.',
      icon: Cpu,
    },
    {
      title: 'Productivity',
      description: 'Drastically shortening payroll cycles, leave sign-offs, and compliance filings from days to minutes.',
      icon: Zap,
    },
    {
      title: 'Growth',
      description: 'Scalable architecture that supports your venture from 5 initial staff to thousands across continents.',
      icon: TrendingUp,
    },
    {
      title: 'Automation',
      description: 'Intelligent engines handling statutory calculations, shift rotations, and variance alerts automatically.',
      icon: Workflow,
    },
    {
      title: 'Business Success',
      description: 'Actionable leadership intelligence that turns workforce data into sustainable commercial advantage.',
      icon: Trophy,
    },
    {
      title: 'Security & Trust',
      description: 'Enterprise data sovereignty, role-based controls, and SOC-2 standard encryption for confidential payroll.',
      icon: ShieldCheck,
    },
    {
      title: 'Global Scale',
      description: 'Multi-currency settlement and cross-border payroll architectures supporting seamless expansion worldwide.',
      icon: Globe2,
    },
  ];

  const totalPillarPages = Math.ceil(missionPillars.length / pillarItemsPerPage);

  useEffect(() => {
    if (pillarPage >= totalPillarPages) {
      setPillarPage(Math.max(0, totalPillarPages - 1));
    }
  }, [totalPillarPages, pillarPage]);

  const handlePillarNext = () => {
    setPillarPage((prev) => (prev + 1) % totalPillarPages);
  };

  const handlePillarPrev = () => {
    setPillarPage((prev) => (prev - 1 + totalPillarPages) % totalPillarPages);
  };

  const onPillarTouchStart = (e: React.TouchEvent) => {
    setPillarTouchEnd(null);
    setPillarTouchStart(e.targetTouches[0].clientX);
  };

  const onPillarTouchMove = (e: React.TouchEvent) => {
    setPillarTouchEnd(e.targetTouches[0].clientX);
  };

  const onPillarTouchEnd = () => {
    if (!pillarTouchStart || !pillarTouchEnd) return;
    const distance = pillarTouchStart - pillarTouchEnd;
    if (distance > 50) {
      handlePillarNext();
    } else if (distance < -50) {
      handlePillarPrev();
    }
  };

  const globalHubs: Record<
    string,
    {
      name: string;
      region: string;
      role: string;
      coordinates: { x: number; y: number };
      details: string;
      connectedTo: string[];
    }
  > = {
    lagos: {
      name: 'Lagos Hub (West Africa)',
      region: 'Africa',
      role: 'Primary Commercial & Product Center',
      coordinates: { x: 470, y: 310 },
      details: 'Headquarters & core product engineering, serving West African enterprises and statutory frameworks.',
      connectedTo: ['nairobi', 'johannesburg', 'london', 'dubai'],
    },
    nairobi: {
      name: 'Nairobi Hub (East Africa)',
      region: 'Africa',
      role: 'East Africa Regional Operations',
      coordinates: { x: 550, y: 330 },
      details: 'Managing East African operations, KRA compliance, mobile money integrations, and customer training.',
      connectedTo: ['lagos', 'johannesburg', 'dubai'],
    },
    johannesburg: {
      name: 'Johannesburg (Southern Africa)',
      region: 'Africa',
      role: 'Southern Africa Enterprise Center',
      coordinates: { x: 530, y: 430 },
      details: 'Southern African labor standards, multi-branch mining, manufacturing, and retail client operations.',
      connectedTo: ['lagos', 'nairobi', 'london'],
    },
    london: {
      name: 'London (Europe Hub)',
      region: 'Europe',
      role: 'European & Diaspora Partnerships',
      coordinates: { x: 480, y: 170 },
      details: 'Cross-border UK/European diaspora businesses employing talent across African commercial capitals.',
      connectedTo: ['lagos', 'newyork'],
    },
    dubai: {
      name: 'Dubai (Middle East Hub)',
      region: 'Middle East',
      role: 'Middle East & GCC Trade Bridge',
      coordinates: { x: 600, y: 260 },
      details: 'Supporting emerging trade links, multinational logistics, and regional trade corridors.',
      connectedTo: ['nairobi', 'singapore'],
    },
    newyork: {
      name: 'New York (North America Hub)',
      region: 'North America',
      role: 'Global Capital & Enterprise Expansion',
      coordinates: { x: 260, y: 200 },
      details: 'Multi-entity corporate billing, international currency settlement, and global institutional clients.',
      connectedTo: ['london', 'lagos'],
    },
    singapore: {
      name: 'Singapore (Asia Hub)',
      region: 'Asia',
      role: 'Asia-Pacific Supply & Tech Corridor',
      coordinates: { x: 740, y: 340 },
      details: 'Cross-continental manufacturing partners, supply chain management, and international trade.',
      connectedTo: ['dubai', 'lagos'],
    },
  };

  const currentHub = globalHubs[selectedHub];

  return (
    <div id="mission-vision">
      {/* SECTION 5: OUR MISSION (Prominent Blue & Lemon Green) */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0A2540] via-[#0B3B73] to-[#0A2540] dark:from-[#050e18] dark:via-[#091f3c] dark:to-[#071322] text-white relative overflow-hidden transition-colors duration-300">
        {/* Lemon green radial glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#84CC16]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#84CC16]/20 border border-[#84CC16]/40 text-xs font-bold text-[#84CC16]">
              <span>Our Purpose & Commitment</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Our Mission
            </h2>

            <div className="p-6 sm:p-8 bg-white/5 dark:bg-[#071322]/60 backdrop-blur-md rounded-2xl border border-white/15 dark:border-blue-900/40 shadow-xl mt-4">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-100 leading-snug">
                “To empower businesses with{' '}
                <span className="text-[#84CC16]">simple, intelligent and accessible technology</span>{' '}
                that makes managing people, payroll and business operations easier,
                faster and more efficient.”
              </p>
            </div>
          </div>

          {/* Visual Pillars Slider (4 in a row) */}
          <div
            className="relative px-0 sm:px-6 focus:outline-hidden pt-4"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') handlePillarPrev();
              if (e.key === 'ArrowRight') handlePillarNext();
            }}
            aria-label="Our mission pillars slider"
          >
            {/* Side Prev Arrow */}
            <button
              type="button"
              onClick={handlePillarPrev}
              aria-label="Previous pillars"
              title="Previous pillars"
              className="flex absolute -left-2 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-[#84CC16] hover:text-[#061124] text-white border border-white/20 backdrop-blur-md shadow-xl items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Side Next Arrow */}
            <button
              type="button"
              onClick={handlePillarNext}
              aria-label="Next pillars"
              title="Next pillars"
              className="flex absolute -right-2 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-[#84CC16] hover:text-[#061124] text-white border border-white/20 backdrop-blur-md shadow-xl items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Sliding Track Viewport */}
            <div
              className="overflow-hidden py-2"
              onTouchStart={onPillarTouchStart}
              onTouchMove={onPillarTouchMove}
              onTouchEnd={onPillarTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${pillarPage * 100}%)` }}
              >
                {missionPillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="w-full sm:w-1/2 lg:w-1/4 shrink-0 px-2.5 flex flex-col"
                    >
                      <div className="bg-white/10 dark:bg-[#0E2038]/60 hover:bg-white/15 dark:hover:bg-[#11243E] backdrop-blur-md border border-white/15 dark:border-blue-900/40 hover:border-[#84CC16]/50 dark:hover:border-[#84CC16]/50 rounded-2xl p-6 transition-all duration-300 group shadow-sm hover:shadow-lg flex flex-col justify-between h-full">
                        <div>
                          <div className="w-12 h-12 rounded-xl bg-[#0A2540] dark:bg-[#162D4E] border border-[#84CC16]/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-[#84CC16]" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#84CC16] transition-colors">
                            {pillar.title}
                          </h3>
                          <p className="text-sm text-slate-300 leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Pagination Dots */}
            <div className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination controls">
              {Array.from({ length: totalPillarPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to slide page ${idx + 1}`}
                  onClick={() => setPillarPage(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    pillarPage === idx
                      ? 'w-8 h-2.5 bg-[#84CC16]'
                      : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR VISION (Contrasting Light Section with Interactive World Map) */}
      <section className="py-20 lg:py-28 bg-white dark:bg-[#071322] text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 text-xs font-bold text-[#0B3B73] dark:text-[#38BDF8]">
              <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
              <span>Global Reach • African Core</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
              Our Vision
            </h2>

            <div className="p-6 sm:p-8 bg-[#F0F7FF] dark:bg-[#0E2038] rounded-2xl border border-blue-100 dark:border-blue-900/40 text-slate-800 dark:text-slate-200 shadow-sm mt-4">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0A2540] dark:text-white leading-snug">
                “To become a{' '}
                <span className="text-[#0B3B73] dark:text-[#38BDF8] underline decoration-[#84CC16] decoration-4 underline-offset-4">
                  trusted global technology platform
                </span>{' '}
                that enables businesses of every size to build better workplaces, manage
                operations smarter and achieve sustainable growth.”
              </p>
            </div>
          </div>

          {/* Interactive World Map Visualization */}
          <div className="bg-[#0A2540] dark:bg-[#06101E] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl border border-slate-800 dark:border-blue-900/40 transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#84CC16]">
                  Global Connection Network
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Africa at the Center, Connected Worldwide
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Subtle linkages connecting African economic centers to Europe, North America, Middle East & Asia.
                </p>
              </div>

              {/* Hub Selector Pills */}
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(globalHubs).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedHub(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedHub === key
                        ? 'bg-[#84CC16] text-[#0A2540]'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {globalHubs[key].name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Interactive SVG Map Canvas */}
            <div className="relative my-6 aspect-[16/9] max-h-[460px] w-full bg-slate-950/60 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 900 500" className="w-full h-full object-contain select-none">
                <defs>
                  {/* Gradients for arcs */}
                  <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#84CC16" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0B3B73" stopOpacity="0.2" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Subtle World Map Silhouette outlines */}
                {/* North America */}
                <path
                  d="M160,110 Q220,100 270,140 Q310,190 270,260 Q210,240 180,210 Z"
                  fill="#1E293B"
                  opacity="0.4"
                />
                {/* South America */}
                <path
                  d="M260,280 Q320,300 330,370 Q280,450 250,420 Q240,340 260,280 Z"
                  fill="#1E293B"
                  opacity="0.4"
                />
                {/* Europe */}
                <path
                  d="M440,110 Q510,100 530,160 Q490,190 440,170 Z"
                  fill="#1E293B"
                  opacity="0.4"
                />
                {/* Prominent Africa with Highlighting */}
                <path
                  d="M440,210 Q530,200 570,280 Q560,390 510,450 Q460,400 430,300 Q420,240 440,210 Z"
                  fill="#0F2D59"
                  stroke="#84CC16"
                  strokeWidth="2"
                  filter="url(#glow)"
                  opacity="0.9"
                />
                {/* Middle East & Asia */}
                <path
                  d="M550,170 Q660,130 760,180 Q810,290 750,370 Q670,300 600,240 Z"
                  fill="#1E293B"
                  opacity="0.4"
                />

                {/* Connection Arcs from Lagos Hub */}
                <path
                  d="M470,310 Q500,220 480,170"
                  fill="none"
                  stroke="url(#arcGrad)"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <path
                  d="M470,310 Q510,300 550,330"
                  fill="none"
                  stroke="url(#arcGrad)"
                  strokeWidth="2"
                />
                <path
                  d="M470,310 Q490,380 530,430"
                  fill="none"
                  stroke="url(#arcGrad)"
                  strokeWidth="2"
                />
                <path
                  d="M470,310 Q540,260 600,260"
                  fill="none"
                  stroke="url(#arcGrad)"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <path
                  d="M470,310 Q350,220 260,200"
                  fill="none"
                  stroke="url(#arcGrad)"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <path
                  d="M600,260 Q670,280 740,340"
                  fill="none"
                  stroke="url(#arcGrad)"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />

                {/* Draw Hub Markers */}
                {Object.entries(globalHubs).map(([key, hub]) => {
                  const isSelected = selectedHub === key;
                  const isAfrica = hub.region === 'Africa';
                  return (
                    <g
                      key={key}
                      onClick={() => setSelectedHub(key)}
                      className="cursor-pointer group"
                    >
                      {/* Pulsing ring for selected or African hubs */}
                      <circle
                        cx={hub.coordinates.x}
                        cy={hub.coordinates.y}
                        r={isSelected ? 16 : isAfrica ? 12 : 8}
                        fill={isAfrica ? '#84CC16' : '#38BDF8'}
                        opacity={isSelected ? 0.35 : 0.15}
                        className="animate-ping"
                      />
                      <circle
                        cx={hub.coordinates.x}
                        cy={hub.coordinates.y}
                        r={isSelected ? 9 : isAfrica ? 7 : 5}
                        fill={isSelected ? '#84CC16' : isAfrica ? '#65A30D' : '#0284C7'}
                        stroke="#FFFFFF"
                        strokeWidth={isSelected ? 2.5 : 1.5}
                      />
                      <text
                        x={hub.coordinates.x}
                        y={hub.coordinates.y - 12}
                        textAnchor="middle"
                        fill={isSelected ? '#84CC16' : '#FFFFFF'}
                        fontSize={isSelected ? '12' : '10'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {hub.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Active Hub Details Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16]"></span>
                  <span className="text-xs font-extrabold uppercase text-[#84CC16]">
                    {currentHub.region} Region • {currentHub.role}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">{currentHub.name}</h4>
                <p className="text-xs text-slate-300 max-w-2xl">{currentHub.details}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs bg-[#84CC16] text-[#0A2540] font-bold px-3 py-1.5 rounded-lg">
                  Multi-Currency & Jurisdictions
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
