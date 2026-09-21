import React, { useState } from 'react';
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
  ExternalLink
} from 'lucide-react';

export const MissionVision: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<string>('lagos');

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
  ];

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
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0A2540] via-[#0B3B73] to-[#0A2540] text-white relative overflow-hidden">
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

            <div className="p-6 sm:p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/15 shadow-xl mt-4">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-100 leading-snug">
                “To empower businesses with{' '}
                <span className="text-[#84CC16]">simple, intelligent and accessible technology</span>{' '}
                that makes managing people, payroll and business operations easier,
                faster and more efficient.”
              </p>
            </div>
          </div>

          {/* 6 Supporting Visual Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {missionPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-[#84CC16]/50 rounded-2xl p-6 transition-all duration-300 group shadow-sm hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0A2540] border border-[#84CC16]/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[#84CC16]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#84CC16] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR VISION (Contrasting Light Section with Interactive World Map) */}
      <section className="py-20 lg:py-28 bg-white text-slate-900 border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#0B3B73]">
              <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
              <span>Global Reach • African Core</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] tracking-tight">
              Our Vision
            </h2>

            <div className="p-6 sm:p-8 bg-[#F0F7FF] rounded-2xl border border-blue-100 text-slate-800 shadow-sm mt-4">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0A2540] leading-snug">
                “To become a{' '}
                <span className="text-[#0B3B73] underline decoration-[#84CC16] decoration-4 underline-offset-4">
                  trusted global technology platform
                </span>{' '}
                that enables businesses of every size to build better workplaces, manage
                operations smarter and achieve sustainable growth.”
              </p>
            </div>
          </div>

          {/* Interactive World Map Visualization */}
          <div className="bg-[#0A2540] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl border border-slate-800">
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
