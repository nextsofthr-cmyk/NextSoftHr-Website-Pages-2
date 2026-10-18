import { useState } from 'react';
import { 
  MapPin, ShieldCheck, CheckCircle2, Globe, Building2, 
  ArrowRight, Landmark, ExternalLink, Zap, Users
} from 'lucide-react';

export interface CompliancePartnerHub {
  id: string;
  city: string;
  country: string;
  flag: string;
  continent: 'Africa' | 'Europe' | 'Americas' | 'Middle East' | 'Asia-Pacific';
  x: number; // SVG viewBox 0-1000
  y: number; // SVG viewBox 0-500
  currency: string;
  partnerEntity: string;
  statutoryRegime: string;
  activeCompanies: string;
  activeEmployees: string;
  clearingRail: string;
  settlementSpeed: string;
  compliancePillars: string[];
  connections: string[]; // Connected hub IDs
}

export const COMPLIANCE_PARTNER_HUBS: CompliancePartnerHub[] = [
  {
    id: 'lagos',
    city: 'Lagos',
    country: 'Nigeria',
    flag: '🇳🇬',
    continent: 'Africa',
    x: 490,
    y: 275,
    currency: 'NGN (₦)',
    partnerEntity: 'Lagos Statutory Advisory & Tax Chambers',
    statutoryRegime: 'FIRS PAYE, PenCom, NDPA 2023, NSITF, ITF',
    activeCompanies: '1,420+ Co.',
    activeEmployees: '64,000+ Staff',
    clearingRail: 'NIBSS / NIP Instant Interbank',
    settlementSpeed: '< 60 Seconds',
    compliancePillars: ['State IRS Tax Deduction', 'PenCom 8%+10% Pension Remittance', 'Direct Remita/NIP Batching'],
    connections: ['london', 'nairobi', 'accra', 'kigali', 'newyork']
  },
  {
    id: 'nairobi',
    city: 'Nairobi',
    country: 'Kenya',
    flag: '🇰🇪',
    continent: 'Africa',
    x: 600,
    y: 290,
    currency: 'KES (KSh)',
    partnerEntity: 'Silicon Savannah Legal & Compliance LLP',
    statutoryRegime: 'KRA iTax, NSSF Act 2013, SHIF/NHIF, ODPC DPA',
    activeCompanies: '980+ Co.',
    activeEmployees: '42,000+ Staff',
    clearingRail: 'Safaricom M-Pesa B2C / Pesalink',
    settlementSpeed: '< 30 Seconds',
    compliancePillars: ['KRA Real-Time Withholding', 'Affordable Housing Levy (1.5%)', '24/7 Mobile Money Wage Rails'],
    connections: ['lagos', 'kigali', 'johannesburg', 'london', 'dubai']
  },
  {
    id: 'johannesburg',
    city: 'Johannesburg',
    country: 'South Africa',
    flag: '🇿🇦',
    continent: 'Africa',
    x: 550,
    y: 395,
    currency: 'ZAR (R)',
    partnerEntity: 'Vanguard Southern Africa HR Advisory',
    statutoryRegime: 'SARS eFiling (EMP201/501), POPIA, UIF, SDL, COIDA',
    activeCompanies: '850+ Co.',
    activeEmployees: '38,500+ Staff',
    clearingRail: 'BankservAfrica EFT / PayShap',
    settlementSpeed: 'Same-Day / Instant',
    compliancePillars: ['EMP501 Automated Bi-Annual Recon', 'POPIA Local Data Residency', 'BCEA Overtime Rules'],
    connections: ['nairobi', 'london', 'lagos', 'amsterdam']
  },
  {
    id: 'accra',
    city: 'Accra',
    country: 'Ghana',
    flag: '🇬🇭',
    continent: 'Africa',
    x: 465,
    y: 280,
    currency: 'GHS (GH₵)',
    partnerEntity: 'Gold Coast Statutory & Payroll Partners',
    statutoryRegime: 'GRA Taxpayer Portal, SSNIT Tier 1 & 2, DPC Act 843',
    activeCompanies: '620+ Co.',
    activeEmployees: '22,400+ Staff',
    clearingRail: 'GhIPSS Instant Pay / MoMo Rail',
    settlementSpeed: '< 45 Seconds',
    compliancePillars: ['SSNIT 13.5% + 5% Tier Deductions', 'GRA Pre-Flight Validation', 'Dual Mobile Money Settlement'],
    connections: ['lagos', 'london']
  },
  {
    id: 'kigali',
    city: 'Kigali',
    country: 'Rwanda',
    flag: '🇷🇼',
    continent: 'Africa',
    x: 575,
    y: 300,
    currency: 'RWF (RF)',
    partnerEntity: 'Kigali Innovation City HR Chambers',
    statutoryRegime: 'RRA E-Tax Law 027, RSSB Maternity & Pensions, NCSA DPA',
    activeCompanies: '440+ Co.',
    activeEmployees: '16,200+ Staff',
    clearingRail: 'RIPPS / National MoMo Direct',
    settlementSpeed: '< 30 Seconds',
    compliancePillars: ['100% Digital RRA Tax Direct', 'RSSB Maternity Fund Automated Filing', 'Biometric Clinic GPS Verification'],
    connections: ['nairobi', 'lagos', 'london']
  },
  {
    id: 'cairo',
    city: 'Cairo',
    country: 'Egypt',
    flag: '🇪🇬',
    continent: 'Africa',
    x: 570,
    y: 195,
    currency: 'EGP (E£)',
    partnerEntity: 'Nile Jurisdictional & Tax Consultants',
    statutoryRegime: 'ETA Unified Payroll Tax Law 206, NOSI Social Insurance',
    activeCompanies: '510+ Co.',
    activeEmployees: '29,000+ Staff',
    clearingRail: 'InstaPay / National Clearing System',
    settlementSpeed: 'Instant (< 20s)',
    compliancePillars: ['Unified Electronic Payroll Lodgement', 'NOSI Employer/Employee Social Deductions', 'Bilingual Arabic/English Slips'],
    connections: ['dubai', 'london', 'nairobi']
  },
  {
    id: 'london',
    city: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    continent: 'Europe',
    x: 480,
    y: 140,
    currency: 'GBP (£)',
    partnerEntity: 'City of London International EOR Partners Ltd',
    statutoryRegime: 'HMRC Real Time Information (RTI), Auto-Enrolment, UK GDPR',
    activeCompanies: '1,890+ Co.',
    activeEmployees: '82,000+ Staff',
    clearingRail: 'BACS / Faster Payments / CHAPS',
    settlementSpeed: 'Instant (< 15s)',
    compliancePillars: ['HMRC RTI Full Payment Submissions', 'Pensions Regulator Workplace Auto-Enrolment', 'IR35 Worker Classification Defense'],
    connections: ['newyork', 'lagos', 'nairobi', 'johannesburg', 'dubai', 'singapore']
  },
  {
    id: 'newyork',
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    continent: 'Americas',
    x: 235,
    y: 165,
    currency: 'USD ($)',
    partnerEntity: 'Manhattan Corporate Governance & Tax PC',
    statutoryRegime: 'IRS 50-State Withholding, FICA/FUTA, SOC 2 Type II, Nacha',
    activeCompanies: '2,150+ Co.',
    activeEmployees: '110,000+ Staff',
    clearingRail: 'Same-Day ACH / Fedwire / FedNow',
    settlementSpeed: 'Same-Day',
    compliancePillars: ['Multi-State Reciprocal Payroll', '1099-NEC & W-2 Autonomous Generation', 'ERISA 401(k) Pre-Tax Sync'],
    connections: ['london', 'lagos', 'toronto']
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    continent: 'Middle East',
    x: 630,
    y: 215,
    currency: 'AED (د.إ)',
    partnerEntity: 'DIFC Global Workforce Advisory',
    statutoryRegime: 'Central Bank WPS, MOHRE Labor Directive, GPSSA',
    activeCompanies: '720+ Co.',
    activeEmployees: '34,000+ Staff',
    clearingRail: 'UAE Central Bank SIF Electronic Rail',
    settlementSpeed: 'Same-Day WPS',
    compliancePillars: ['Mandatory SIF Wage File Verification', 'End of Service Gratuity Actuarial Vault', '0% Personal Tax Certification'],
    connections: ['london', 'cairo', 'nairobi', 'singapore']
  },
  {
    id: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    continent: 'Asia-Pacific',
    x: 770,
    y: 295,
    currency: 'SGD (S$)',
    partnerEntity: 'Marina Bay Cross-Border HR Advisors',
    statutoryRegime: 'IRAS Auto-Inclusion Scheme, CPF Board, PDPA',
    activeCompanies: '690+ Co.',
    activeEmployees: '31,500+ Staff',
    clearingRail: 'FAST / PayNow Interbank Network',
    settlementSpeed: 'Instant (< 10s)',
    compliancePillars: ['CPF Tiered Contribution Auto-Lodgement', 'IR8A Electronic Year-End Submissions', 'Foreign Worker Levy (FWL) Calculation'],
    connections: ['london', 'dubai', 'sydney']
  },
  {
    id: 'sydney',
    city: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    continent: 'Asia-Pacific',
    x: 880,
    y: 390,
    currency: 'AUD (A$)',
    partnerEntity: 'Pacific Rim Workplace Legal Advisory',
    statutoryRegime: 'ATO STP Phase 2, SuperStream, Privacy Act 1988',
    activeCompanies: '580+ Co.',
    activeEmployees: '26,000+ Staff',
    clearingRail: 'NPP Direct / Osko / BECS',
    settlementSpeed: 'Instant Real-Time',
    compliancePillars: ['Single Touch Payroll (STP 2) Disaggregation', 'Superannuation Guarantee (11.5%) Auto-Clearing', 'Fair Work Modern Award Pay Rates'],
    connections: ['singapore', 'london']
  }
];

interface GlobalComplianceMapProps {
  onOpenDemo: () => void;
}

export const GlobalComplianceMap = ({ onOpenDemo }: GlobalComplianceMapProps) => {
  const [selectedHub, setSelectedHub] = useState<CompliancePartnerHub>(COMPLIANCE_PARTNER_HUBS[0]);
  const [hoveredHub, setHoveredHub] = useState<CompliancePartnerHub | null>(null);
  const [regionFilter, setRegionFilter] = useState<'All' | 'Africa' | 'Global'>('All');

  // Filter hubs
  const visibleHubs = COMPLIANCE_PARTNER_HUBS.filter(h => {
    if (regionFilter === 'All') return true;
    if (regionFilter === 'Africa') return h.continent === 'Africa';
    return h.continent !== 'Africa';
  });

  const activeHub = hoveredHub || selectedHub;

  // Find connections for the active hub
  const activeConnections = activeHub.connections
    .map(targetId => COMPLIANCE_PARTNER_HUBS.find(h => h.id === targetId))
    .filter(Boolean) as CompliancePartnerHub[];

  return (
    <div className="mt-12 bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      
      {/* Decorative Radial Background */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-800/90 gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-lime-400/20 text-lime-300 border border-lime-400/30 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-lime-400" />
              <span>Interactive Global Compliance Map</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>11 Active Sovereign Regulatory Corridors</span>
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            Licensed Compliance Partners in Every Operating Jurisdiction
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            NextSofthr pairs enterprise cloud technology with certified, in-country statutory partners across Africa, Europe, the Americas, and the Middle East to ensure audit-proof payroll and legal coverage.
          </p>
        </div>

        {/* Region Filters */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 self-start lg:self-center">
          <button
            onClick={() => setRegionFilter('All')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              regionFilter === 'All'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Corridors ({COMPLIANCE_PARTNER_HUBS.length})
          </button>
          <button
            onClick={() => setRegionFilter('Africa')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              regionFilter === 'Africa'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Africa Hubs (6)
          </button>
          <button
            onClick={() => setRegionFilter('Global')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              regionFilter === 'Global'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            International Hubs (5)
          </button>
        </div>
      </div>

      {/* Main Map + Details Layout */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left / Top: Interactive SVG Map Canvas */}
        <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-6 overflow-hidden relative flex flex-col justify-between h-full">
          
          <div className="relative w-full flex-1 flex items-center justify-center min-h-[380px] lg:min-h-[480px]">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Glow Filter for Active Node */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Corridor Flow Linear Gradient */}
                <linearGradient id="corridor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Stylized Graticule Lines (Parallels & Meridians) */}
              <g stroke="#1e293b" strokeWidth="0.75" strokeDasharray="3 6" opacity="0.6">
                <line x1="50" y1="125" x2="950" y2="125" />
                <line x1="50" y1="250" x2="950" y2="250" />
                <line x1="50" y1="375" x2="950" y2="375" />
                <line x1="250" y1="40" x2="250" y2="460" />
                <line x1="500" y1="40" x2="500" y2="460" />
                <line x1="750" y1="40" x2="750" y2="460" />
              </g>

              {/* Simplified Geometric World Landmasses (High Contrast, Technical Vector Silhouette) */}
              <g fill="#1e293b" opacity="0.75">
                {/* North America */}
                <path d="M 120 70 L 220 50 L 280 80 L 320 120 L 290 180 L 240 210 L 210 240 L 180 200 L 130 180 L 110 130 Z" />
                {/* Greenland */}
                <path d="M 330 35 L 390 30 L 410 65 L 360 85 Z" />
                {/* South America */}
                <path d="M 270 260 L 330 260 L 360 320 L 340 420 L 300 440 L 280 370 L 260 310 Z" />
                {/* Europe */}
                <path d="M 450 90 L 530 80 L 560 120 L 530 170 L 480 170 L 440 140 Z" />
                {/* Africa (Highlighted in clean prominent geometry) */}
                <path d="M 460 180 L 580 180 L 610 240 L 620 310 L 570 420 L 520 420 L 470 330 L 440 260 L 450 200 Z" fill="#334155" opacity="0.9" />
                {/* Asia / Middle East */}
                <path d="M 570 90 L 750 70 L 870 110 L 890 190 L 820 260 L 730 270 L 660 220 L 600 180 Z" />
                {/* Australia */}
                <path d="M 800 340 L 910 330 L 930 410 L 830 430 L 790 380 Z" />
              </g>

              {/* Active Hub Connecting Arcs (Curved Bézier Paths) */}
              <g>
                {activeConnections.map(target => {
                  // Calculate control point for curved arc
                  const midX = (activeHub.x + target.x) / 2;
                  const midY = Math.min(activeHub.y, target.y) - Math.abs(activeHub.x - target.x) * 0.18;
                  const pathData = `M ${activeHub.x} ${activeHub.y} Q ${midX} ${midY} ${target.x} ${target.y}`;

                  return (
                    <g key={`${activeHub.id}-${target.id}`}>
                      {/* Faint Guide Arc */}
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        opacity="0.6"
                      />
                      {/* Animated Pulse Packet */}
                      <circle r="3" fill="#a7f3d0">
                        <animateMotion
                          path={pathData}
                          dur="2.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  );
                })}
              </g>

              {/* Hub Location Markers */}
              {visibleHubs.map(hub => {
                const isSelected = selectedHub.id === hub.id;
                const isHovered = hoveredHub?.id === hub.id;
                const isConnected = activeHub.connections.includes(hub.id);

                return (
                  <g
                    key={hub.id}
                    transform={`translate(${hub.x}, ${hub.y})`}
                    className="cursor-pointer group"
                    onClick={() => setSelectedHub(hub)}
                    onMouseEnter={() => setHoveredHub(hub)}
                    onMouseLeave={() => setHoveredHub(null)}
                  >
                    {/* Concentric Ping for Selected/Active */}
                    {(isSelected || isHovered) && (
                      <>
                        <circle
                          r="18"
                          fill="none"
                          stroke={hub.continent === 'Africa' ? '#10b981' : '#3b82f6'}
                          strokeWidth="1.5"
                          opacity="0.75"
                          className="animate-ping"
                        />
                        <circle
                          r="11"
                          fill={hub.continent === 'Africa' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)'}
                        />
                      </>
                    )}

                    {/* Outer Circle */}
                    <circle
                      r={isSelected ? 7 : isHovered ? 6 : 5}
                      fill={
                        isSelected
                          ? '#10b981'
                          : isConnected
                          ? '#38bdf8'
                          : hub.continent === 'Africa'
                          ? '#34d399'
                          : '#60a5fa'
                      }
                      stroke="#020617"
                      strokeWidth="2"
                      filter={isSelected || isHovered ? 'url(#glow)' : 'none'}
                      className="transition-all duration-200"
                    />

                    {/* Center Dot */}
                    <circle r="2" fill="#ffffff" />

                    {/* Label Badge */}
                    <g transform="translate(0, -12)">
                      <rect
                        x="-30"
                        y="-12"
                        width="60"
                        height="14"
                        rx="4"
                        fill="#020617"
                        stroke={isSelected ? '#10b981' : isHovered ? '#38bdf8' : '#334155'}
                        strokeWidth="0.8"
                        opacity={isSelected || isHovered ? 1 : 0.85}
                      />
                      <text
                        textAnchor="middle"
                        y="-2"
                        fill={isSelected ? '#a7f3d0' : '#f8fafc'}
                        fontSize="8px"
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        {hub.flag} {hub.city}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Footer Info */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Africa Sovereign Hubs (6)</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span>International Corridors (5)</span>
              </span>
            </div>

            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hover or click any node to trace bilateral compliance connections</span>
            </span>
          </div>

        </div>

        {/* Right / Bottom: Selected Hub Partner Dossier */}
        <div className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-6 h-full">
          
          <div>
            {/* Header / Partner Title */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedHub.flag}</span>
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{selectedHub.city}, {selectedHub.country}</span>
                  </h4>
                  <span className="text-xs text-emerald-400 font-semibold">
                    {selectedHub.continent} Regional Corridor
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800 text-lime-400 border border-slate-700">
                  {selectedHub.currency}
                </span>
              </div>
            </div>

            {/* Certified Partner Entity Card */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/90">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                Active Local Compliance Partner
              </span>
              <p className="text-sm font-bold text-white leading-snug">
                {selectedHub.partnerEntity}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Statutory Regime: <span className="text-slate-300 font-mono">{selectedHub.statutoryRegime}</span>
              </p>
            </div>

            {/* Key Corridors & Speed */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Local Clearing Rail</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{selectedHub.clearingRail}</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Settlement Speed</span>
                <span className="font-bold text-emerald-400 text-xs mt-0.5 block font-mono">{selectedHub.settlementSpeed}</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Active Managed Entities</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{selectedHub.activeCompanies}</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Covered Workforce</span>
                <span className="font-bold text-lime-400 text-xs mt-0.5 block font-mono">{selectedHub.activeEmployees}</span>
              </div>
            </div>

            {/* Compliance Guarantee Checklist */}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Automated Statutory Guarantees:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {selectedHub.compliancePillars.map((pillar, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pillar}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={onOpenDemo}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Simulate {selectedHub.city} Entity Setup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              Includes bilateral tax treaty checks and local banking rail pre-verification
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
