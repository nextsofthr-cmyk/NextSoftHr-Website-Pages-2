import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Filter, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  MessageSquare, 
  X,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { SavedCandidate, Job } from '../types';

export interface TalentRegion {
  id: string;
  name: string;
  country: string;
  cx: number;
  cy: number;
  qualifiedCount: number;
  activeApplicantsCount: number;
  topTalentCount: number;
  avgExperience: string;
  topIndustries: string[];
  candidates: SavedCandidate[];
}

interface GeographicTalentHeatmapProps {
  candidates?: SavedCandidate[];
  jobs?: Job[];
  onSelectCandidate?: (candidate: SavedCandidate) => void;
  onScheduleInterview?: (candidate: SavedCandidate) => void;
  onOpenMessage?: (candidate: SavedCandidate) => void;
  onToast?: (msg: string) => void;
}

export const GeographicTalentHeatmap: React.FC<GeographicTalentHeatmapProps> = ({
  candidates = [],
  jobs = [],
  onSelectCandidate,
  onScheduleInterview,
  onOpenMessage,
  onToast
}) => {
  // Pan and Zoom States
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Filter Layer: All Candidates, Active Applicants, Top Talent
  const [filterMode, setFilterMode] = useState<'all' | 'active' | 'top'>('all');
  const [selectedRegion, setSelectedRegion] = useState<TalentRegion | null>(null);

  // Region Definitions with Geographic SVG coordinates
  const regions: TalentRegion[] = useMemo(() => {
    return [
      {
        id: 'reg-lagos',
        name: 'Lagos & South-West',
        country: 'Nigeria',
        cx: 340,
        cy: 310,
        qualifiedCount: 48,
        activeApplicantsCount: 29,
        topTalentCount: 18,
        avgExperience: '6.4 yrs',
        topIndustries: ['Fintech', 'HR Management', 'Banking', 'E-commerce'],
        candidates: [
          {
            id: 'cand-lag-1',
            candidateName: 'Adaeze Okonkwo (CIPM, SHRM-SCP)',
            email: 'adaeze.okonkwo@talentleader.org',
            currentRole: 'Senior HR Business Partner & People Operations Lead',
            experienceYears: '7+ years',
            location: 'Lagos, Nigeria (Hybrid)',
            extractedSkills: ['Strategic Workforce Planning', 'Labour Act Compliance', 'Performance Management'],
            verifiedSkills: [
              { name: 'Labour Act Compliance', verifiedAt: 'Verified Assessment', score: 98, type: 'assessment' },
              { name: 'Strategic Workforce Planning', verifiedAt: 'CIPM Credentials', type: 'certification' }
            ],
            savedAt: '2 days ago',
            matchScore: 97,
            avatarColor: 'bg-lime-600'
          },
          {
            id: 'cand-lag-2',
            candidateName: 'Tunde Adeleke (AWS & CKA Certified)',
            email: 'tunde.adeleke.dev@gmail.com',
            currentRole: 'Senior Backend & Distributed Systems Architect',
            experienceYears: '6+ years',
            location: 'Lagos, Nigeria (Remote)',
            extractedSkills: ['TypeScript', 'Node.js', 'Go', 'Kubernetes', 'Kafka', 'Payment Gateways'],
            verifiedSkills: [
              { name: 'TypeScript', verifiedAt: 'Verified Assessment', score: 96, type: 'assessment' },
              { name: 'Docker & Kubernetes', verifiedAt: 'CKA Certified', type: 'certification' }
            ],
            savedAt: 'Yesterday',
            matchScore: 99,
            avatarColor: 'bg-blue-600'
          },
          {
            id: 'cand-lag-3',
            candidateName: 'Oluwaseun Bakare',
            email: 'seun.bakare@fintechleads.ng',
            currentRole: 'Lead Financial Analyst & Regulatory Compliance Specialist',
            experienceYears: '5+ years',
            location: 'Lagos, Nigeria',
            extractedSkills: ['Financial Modeling', 'IFRS', 'CBN Regulatory Compliance'],
            verifiedSkills: [{ name: 'Financial Modeling', verifiedAt: 'Verified Assessment', score: 93, type: 'assessment' }],
            savedAt: '3 days ago',
            matchScore: 92,
            avatarColor: 'bg-emerald-600'
          }
        ]
      },
      {
        id: 'reg-abuja',
        name: 'Abuja & North-Central',
        country: 'Nigeria',
        cx: 370,
        cy: 280,
        qualifiedCount: 26,
        activeApplicantsCount: 16,
        topTalentCount: 10,
        avgExperience: '7.1 yrs',
        topIndustries: ['Public Sector Advisory', 'Treasury & FP&A', 'Enterprise IT'],
        candidates: [
          {
            id: 'cand-abj-1',
            candidateName: 'Fatima Al-Mansoor (ICAN, CFA)',
            email: 'f.almansoor@financeadvisors.ng',
            currentRole: 'Financial Controller & Treasury Operations Lead',
            experienceYears: '8+ years',
            location: 'Abuja, Nigeria',
            extractedSkills: ['Financial Modeling', 'Liquidity Management', 'IFRS Standards'],
            verifiedSkills: [{ name: 'Financial Modeling', verifiedAt: 'Verified Assessment', score: 97, type: 'assessment' }],
            savedAt: 'Just now',
            matchScore: 95,
            avatarColor: 'bg-amber-600'
          },
          {
            id: 'cand-abj-2',
            candidateName: 'Ibrahim Shehu',
            email: 'i.shehu@cyberdefense.ng',
            currentRole: 'Chief Information Security Officer (CISO)',
            experienceYears: '9+ years',
            location: 'Abuja, Nigeria',
            extractedSkills: ['ISO 27001', 'SOC-2 Compliance', 'Cloud Security'],
            verifiedSkills: [{ name: 'Cloud Security', verifiedAt: 'Verified Assessment', score: 94, type: 'assessment' }],
            savedAt: '4 days ago',
            matchScore: 93,
            avatarColor: 'bg-purple-600'
          }
        ]
      },
      {
        id: 'reg-ph',
        name: 'Port Harcourt & South-South',
        country: 'Nigeria',
        cx: 375,
        cy: 335,
        qualifiedCount: 19,
        activeApplicantsCount: 12,
        topTalentCount: 7,
        avgExperience: '6.8 yrs',
        topIndustries: ['Energy & Infrastructure', 'Supply Chain & Logistics', 'HSE & Compliance'],
        candidates: [
          {
            id: 'cand-ph-1',
            candidateName: 'Tamuno Briggs',
            email: 'tamuno.briggs@logisticsops.org',
            currentRole: 'Logistics Operations & Marine Freight Director',
            experienceYears: '8+ years',
            location: 'Port Harcourt, Nigeria',
            extractedSkills: ['Fleet Logistics', 'Customs Clearance', 'SAP Supply Chain'],
            verifiedSkills: [{ name: 'Fleet Logistics', verifiedAt: 'Verified Assessment', score: 91, type: 'assessment' }],
            savedAt: '5 days ago',
            matchScore: 91,
            avatarColor: 'bg-cyan-600'
          }
        ]
      },
      {
        id: 'reg-nairobi',
        name: 'Nairobi & East Africa',
        country: 'Kenya',
        cx: 560,
        cy: 330,
        qualifiedCount: 38,
        activeApplicantsCount: 24,
        topTalentCount: 15,
        avgExperience: '5.9 yrs',
        topIndustries: ['Mobile Money & Agritech', 'Product Management', 'Go & Python'],
        candidates: [
          {
            id: 'cand-nbo-1',
            candidateName: 'Chukwudi Nwachukwu (CSPO)',
            email: 'c.nwachukwu.pm@outlook.com',
            currentRole: 'Lead Product Growth & Monetization Strategist',
            experienceYears: '5+ years',
            location: 'Nairobi, Kenya',
            extractedSkills: ['Product Strategy & Vision', 'User Journey Mapping', 'A/B Testing'],
            verifiedSkills: [{ name: 'Product Strategy & Vision', verifiedAt: 'Verified Assessment', score: 94, type: 'assessment' }],
            savedAt: '3 days ago',
            matchScore: 94,
            avatarColor: 'bg-purple-600'
          },
          {
            id: 'cand-nbo-2',
            candidateName: 'Wanjiku Kamau',
            email: 'wanjiku.kamau@siliconkenya.ke',
            currentRole: 'Senior Data Engineer (Spark, Snowflake, dbt)',
            experienceYears: '6+ years',
            location: 'Nairobi, Kenya (Remote)',
            extractedSkills: ['Apache Spark', 'Python', 'Snowflake', 'Airflow'],
            verifiedSkills: [{ name: 'Python', verifiedAt: 'Verified Assessment', score: 96, type: 'assessment' }],
            savedAt: '2 days ago',
            matchScore: 96,
            avatarColor: 'bg-rose-600'
          }
        ]
      },
      {
        id: 'reg-accra',
        name: 'Accra & West Africa',
        country: 'Ghana',
        cx: 300,
        cy: 310,
        qualifiedCount: 22,
        activeApplicantsCount: 14,
        topTalentCount: 9,
        avgExperience: '5.5 yrs',
        topIndustries: ['Cross-Border Remittances', 'Fullstack Engineering', 'B2B Sales'],
        candidates: [
          {
            id: 'cand-acc-1',
            candidateName: 'Kofi Mensah',
            email: 'kofi.mensah@techghana.com',
            currentRole: 'Staff Frontend Engineer (React, TypeScript, Next.js)',
            experienceYears: '6+ years',
            location: 'Accra, Ghana (Remote)',
            extractedSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Performance Optimization'],
            verifiedSkills: [{ name: 'React', verifiedAt: 'Verified Assessment', score: 95, type: 'assessment' }],
            savedAt: '1 day ago',
            matchScore: 94,
            avatarColor: 'bg-yellow-600'
          }
        ]
      },
      {
        id: 'reg-joburg',
        name: 'Johannesburg & Southern Africa',
        country: 'South Africa',
        cx: 460,
        cy: 480,
        qualifiedCount: 31,
        activeApplicantsCount: 19,
        topTalentCount: 14,
        avgExperience: '7.3 yrs',
        topIndustries: ['Enterprise Architecture', 'Cloud Infrastructure', 'Financial Risk'],
        candidates: [
          {
            id: 'cand-jnb-1',
            candidateName: 'Lindiwe Dlamini',
            email: 'lindiwe.dlamini@sandtontech.co.za',
            currentRole: 'Lead Cloud Solutions Architect (Azure & AWS)',
            experienceYears: '8+ years',
            location: 'Johannesburg, South Africa',
            extractedSkills: ['Cloud Migration', 'Kubernetes', 'Terraform', 'Zero-Trust'],
            verifiedSkills: [{ name: 'Kubernetes', verifiedAt: 'Verified Assessment', score: 97, type: 'assessment' }],
            savedAt: 'Yesterday',
            matchScore: 98,
            avatarColor: 'bg-indigo-600'
          }
        ]
      },
      {
        id: 'reg-london',
        name: 'London & European Corridor',
        country: 'United Kingdom (Remote)',
        cx: 360,
        cy: 110,
        qualifiedCount: 28,
        activeApplicantsCount: 15,
        topTalentCount: 16,
        avgExperience: '8.2 yrs',
        topIndustries: ['Executive Search', 'C-Suite Tech Leadership', 'Cross-Border Fintech'],
        candidates: [
          {
            id: 'cand-lon-1',
            candidateName: 'Alistair Vance',
            email: 'alistair.vance@panatlantic.co.uk',
            currentRole: 'Interim CTO & Engineering Director',
            experienceYears: '11+ years',
            location: 'London, UK (Remote Mandate)',
            extractedSkills: ['Engineering Scaling', 'Payment Rails', 'Board Advisory'],
            verifiedSkills: [{ name: 'Payment Rails', verifiedAt: 'Verified Assessment', score: 99, type: 'assessment' }],
            savedAt: '3 days ago',
            matchScore: 96,
            avatarColor: 'bg-slate-700'
          }
        ]
      },
      {
        id: 'reg-cairo',
        name: 'Cairo & North Africa',
        country: 'Egypt',
        cx: 470,
        cy: 180,
        qualifiedCount: 24,
        activeApplicantsCount: 13,
        topTalentCount: 11,
        avgExperience: '6.0 yrs',
        topIndustries: ['AI & Computer Vision', 'Mobile Apps (Flutter)', 'Data Science'],
        candidates: [
          {
            id: 'cand-cai-1',
            candidateName: 'Youssef El-Masry',
            email: 'youssef.masry@cairotech.eg',
            currentRole: 'Senior Machine Learning & NLP Specialist',
            experienceYears: '6+ years',
            location: 'Cairo, Egypt (Remote)',
            extractedSkills: ['PyTorch', 'Transformers', 'FastAPI', 'MLOps'],
            verifiedSkills: [{ name: 'PyTorch', verifiedAt: 'Verified Assessment', score: 95, type: 'assessment' }],
            savedAt: '2 days ago',
            matchScore: 93,
            avatarColor: 'bg-teal-600'
          }
        ]
      }
    ];
  }, []);

  // Zoom and Pan Handlers
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Total Metrics Computed
  const totalStats = useMemo(() => {
    const totalQualified = regions.reduce((acc, r) => acc + r.qualifiedCount, 0);
    const totalActive = regions.reduce((acc, r) => acc + r.activeApplicantsCount, 0);
    const totalTop = regions.reduce((acc, r) => acc + r.topTalentCount, 0);
    return { totalQualified, totalActive, totalTop };
  }, [regions]);

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      
      {/* Top Controls Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-[#142B4A] dark:text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
              <span>Geographic Talent Heatmap & Density Visualizer</span>
            </h3>
            <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold px-2 py-0.5 rounded-full">
              Interactive Pan & Zoom
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Concentration of pre-screened talent across Africa & international corridors for high-ROI recruitment budgeting.
          </p>
        </div>

        {/* Filter Layer Toggles (User Request #5) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Layer:</span>
          </span>
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-slate-900 text-[#2563EB] dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All Candidates ({totalStats.totalQualified})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('active')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterMode === 'active'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Active Applicants ({totalStats.totalActive})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('top')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterMode === 'top'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Top Talent (Score 90%+)
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Canvas & Zoom Panel Container */}
      <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-inner h-[460px] select-none">
        
        {/* Floating Zoom & Pan Controls (User Request #4) */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700 shadow-lg">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            title="Reset Pan & Zoom"
            aria-label="Reset zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="px-1 text-[9px] text-center font-mono text-slate-400 border-t border-slate-800 pt-1">
            {Math.round(zoom * 100)}%
          </div>
        </div>

        {/* Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-2xl border border-slate-700 text-[11px] text-slate-300 space-y-1 shadow-md">
          <div className="font-bold text-white text-xs flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span>Talent Density Concentration:</span>
          </div>
          <div className="flex items-center gap-3 pt-0.5">
            <span className="flex items-center gap-1 text-[10px] text-blue-300">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> High (30+)
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Medium (20-29)
            </span>
            <span className="flex items-center gap-1 text-[10px] text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Emerging (10-19)
            </span>
          </div>
        </div>

        {/* Pan and Zoom SVG Viewport */}
        <div
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
          >
            {/* Background Grid Pattern */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" opacity="0.4" />
              </pattern>
              {/* Radial gradient pulses */}
              <radialGradient id="pulse-blue" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="pulse-emerald" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="pulse-amber" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="800" height="600" fill="#090d16" />
            <rect width="800" height="600" fill="url(#grid)" />

            {/* Stylized African Continent Silhouette Path */}
            <path
              d="M 330 190 Q 420 180 500 200 Q 560 250 580 320 Q 550 420 480 530 Q 430 550 410 490 Q 370 380 320 340 Q 260 320 280 260 Q 300 210 330 190 Z"
              fill="#131c31"
              stroke="#253554"
              strokeWidth="1.5"
            />

            {/* UK / Europe Corridor Node */}
            <path
              d="M 340 90 Q 370 80 390 100 Q 380 130 350 125 Z"
              fill="#131c31"
              stroke="#253554"
              strokeWidth="1"
            />
            {/* Connecting Flight/Talent Line */}
            <path
              d="M 360 120 Q 350 210 340 310"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity="0.4"
            />
            <path
              d="M 340 310 Q 450 320 560 330"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity="0.4"
            />

            {/* Region Interactive Heat Nodes */}
            {regions.map(region => {
              const count = filterMode === 'all' 
                ? region.qualifiedCount 
                : filterMode === 'active' 
                ? region.activeApplicantsCount 
                : region.topTalentCount;

              const circleRadius = Math.max(16, Math.min(36, count * 0.85));
              const isSelected = selectedRegion?.id === region.id;
              const fillGrad = count >= 30 ? 'url(#pulse-blue)' : count >= 20 ? 'url(#pulse-emerald)' : 'url(#pulse-amber)';
              const strokeCol = count >= 30 ? '#3b82f6' : count >= 20 ? '#10b981' : '#f59e0b';

              return (
                <g 
                  key={region.id} 
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => setSelectedRegion(region)}
                >
                  {/* Outer Pulsing Aura */}
                  <circle
                    cx={region.cx}
                    cy={region.cy}
                    r={circleRadius * 1.8}
                    fill={fillGrad}
                    className="animate-pulse"
                  />

                  {/* Core Indicator Circle */}
                  <circle
                    cx={region.cx}
                    cy={region.cy}
                    r={circleRadius}
                    fill="#0f172a"
                    stroke={strokeCol}
                    strokeWidth={isSelected ? 3 : 2}
                    filter={isSelected ? 'drop-shadow(0 0 10px rgba(59,130,246,0.8))' : 'none'}
                  />

                  {/* Region Candidate Count Text */}
                  <text
                    x={region.cx}
                    y={region.cy + 4}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    {count}
                  </text>

                  {/* Label Tooltip Under Marker */}
                  <text
                    x={region.cx}
                    y={region.cy + circleRadius + 14}
                    textAnchor="middle"
                    fill="#cbd5e1"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="sans-serif"
                  >
                    {region.name.split('&')[0].trim()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Region Top Candidates Modal / Drawer (User Request #4) */}
      {selectedRegion && (
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-500/40 shadow-xl space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {selectedRegion.name} ({selectedRegion.country})
                  </h4>
                  <span className="text-[10px] bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300 font-bold px-2 py-0.5 rounded-full">
                    {selectedRegion.candidates.length} Profiles Loaded
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Avg. Experience: <strong>{selectedRegion.avgExperience}</strong> · Key Industries: {selectedRegion.topIndustries.join(', ')}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedRegion(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Regional Candidates List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedRegion.candidates.map(cand => (
              <div 
                key={cand.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3 hover:border-blue-400 transition-all shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                      {cand.candidateName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 shrink-0">
                      {cand.matchScore}% Match
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-1">
                    {cand.currentRole} · {cand.experienceYears}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {cand.extractedSkills.slice(0, 3).map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] text-slate-700 dark:text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {cand.location}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {onOpenMessage && (
                      <button
                        type="button"
                        onClick={() => onOpenMessage(cand)}
                        className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Message</span>
                      </button>
                    )}

                    {onScheduleInterview && (
                      <button
                        type="button"
                        onClick={() => onScheduleInterview(cand)}
                        className="px-2.5 py-1 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Schedule</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
