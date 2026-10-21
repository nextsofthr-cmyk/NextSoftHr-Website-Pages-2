import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  Building2,
  CheckCircle2,
  ArrowRight,
  Play,
  Pause,
  Quote,
  ShieldCheck,
  Award,
  Globe2,
  Users,
  Clock,
  DollarSign,
} from "lucide-react";

export interface CaseStudy {
  id: string;
  companyName: string;
  industry: string;
  industryCategory: "tech" | "health" | "hospitality" | "fmcg";
  headquarters: string;
  corridor: string;
  flag: string;
  scaleBadge: string;
  author: string;
  role: string;
  avatar: string;
  quote: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    label: string;
    subtext: string;
  }[];
  featuresUsed: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "paypulse",
    companyName: "PayPulse Technologies",
    industry: "Fintech & Payment Infrastructure",
    industryCategory: "tech",
    headquarters: "Lagos, Nigeria & London, UK",
    corridor: "🇳🇬 Nigeria → 🇬🇧 UK",
    flag: "🇳🇬🇬🇧",
    scaleBadge: "Scaled 18 → 115 Remote Engineers",
    author: "Adebayo Adeleke",
    role: "Chief Operating Officer",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    quote:
      "“NextSoftHr eliminated our multi-currency payroll nightmares across Lagos and London. We scaled our engineering headcount by over 500% without needing to hire a single additional payroll administrator.”",
    challenge:
      "Manually calculating PAYE tax brackets across Nigerian states and UK PAYE using disjointed spreadsheets led to delayed salary payments and constant FIRS filing discrepancies.",
    solution:
      "Implemented NextSofthr unified payroll with automated gross-to-net engine, instant NIBSS/NIP bank disbursement, and automated PenCom pension schedules.",
    results: [
      {
        metric: "94% Faster",
        label: "Monthly Payroll Run",
        subtext: "Reduced from 4 days to 18 mins",
      },
      {
        metric: "100%",
        label: "Tax Compliance",
        subtext: "Zero FIRS & PenCom penalties",
      },
      {
        metric: "$38,000",
        label: "Annual Admin Savings",
        subtext: "Saved on FX spread & manual labor",
      },
    ],
    featuresUsed: [
      "Multi-Currency Payroll",
      "FIRS & PenCom Engine",
      "Direct NIP Settlement",
      "AI Contract Drafter",
    ],
  },
  {
    id: "kigali-health",
    companyName: "Kigali Health Logistics",
    industry: "Healthcare Diagnostics & Cold Chain",
    industryCategory: "health",
    headquarters: "Kigali, Rwanda & Kampala, Uganda",
    corridor: "🇷🇼 Rwanda → 🇺🇬 Uganda",
    flag: "🇷🇼🇺🇬",
    scaleBadge: "Scaled 30 → 220 Clinical Staff",
    author: "Marie-Claire Uwase",
    role: "VP of Human Capital",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    quote:
      "Our medical technicians and mobile phlebotomists clock in on their smartphones from remote medical centers. The biometric GPS precision andautomated overtime tracking save us over 200 management hours every month.",
    challenge:
      "Managing emergency shift rosters, hazard pay multipliers, and biometric attendance for decentralized clinic workers across 8 regional hubs was entirely chaotic.",
    solution:
      "Deployed NextSofthr mobile self-service app with geo-fenced attendance, RSSB maternity & pension auto-filing, and instant MoMo/bank salary disbursement.",
    results: [
      {
        metric: "1.8 Days",
        label: "New Nurse Onboarding",
        subtext: "Down from 14 business days",
      },
      {
        metric: "Zero",
        label: "Overtime Disputes",
        subtext: "100% verified GPS clock-ins",
      },
      {
        metric: "100%",
        label: "RSSB & RRA Aligned",
        subtext: "Direct digital tax clearance",
      },
    ],
    featuresUsed: [
      "Geo-Fenced Clock-in",
      "RSSB Pension Portal",
      "Shift Swap Engine",
      "Mobile Payslip Vault",
    ],
  },
  {
    id: "safarieco",
    companyName: "SafariEco Expeditions & Lodges",
    industry: "Eco-Tourism & Hospitality",
    industryCategory: "hospitality",
    headquarters: "Nairobi, Kenya & Arusha, Tanzania",
    corridor: "🇰🇪 Kenya → 🇹🇿 Tanzania",
    flag: "🇰🇪🇹🇿",
    scaleBadge: "Scaled 45 → 190 Hospitality Staff",
    author: "Daniel Kiprop",
    role: "Director of Operations",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    quote:
      "Our safari guides and lodge staff receive their salaries directly into their M-Pesa wallets on payday morning. Even in remote Maasai Mara camps, staff have immediate access to their digital payslips.",
    challenge:
      "Seasonal fluctuations and remote bush locations without brick-and-mortar bank branches made physical cash payroll hazardous and time-off coordination nearly impossible.",
    solution:
      "Connected NextSofthr with Safaricom M-Pesa B2C instant wage disbursement, automated KRA iTax deductions, and flexible seasonal roster management.",
    results: [
      {
        metric: "< 30 Sec",
        label: "Wage Disbursement",
        subtext: "Direct to 190 mobile wallets",
      },
      {
        metric: "82% Faster",
        label: "Roster Scheduling",
        subtext: "Drag-and-drop shift builder",
      },
      {
        metric: "$0",
        label: "Cash Transit Risk",
        subtext: "100% cashless digital payroll",
      },
    ],
    featuresUsed: [
      "M-Pesa B2C Payouts",
      "KRA iTax Connector",
      "Overtime Rule Engine",
      "Leave Accruals",
    ],
  },
  {
    id: "afritrade",
    companyName: "AfriTrade Wholesale & FMCG",
    industry: "Supply Chain & Commerce Distribution",
    industryCategory: "fmcg",
    headquarters: "Accra, Ghana & Abidjan, Côte d’Ivoire",
    corridor: "🇬🇭 Ghana → 🇨🇮 Côte d’Ivoire",
    flag: "🇬🇭🇨🇮",
    scaleBadge: "Scaled 40 → 160 Warehouse & Fleet",
    author: "Kofi Mensah-Bonsu Director, AfriTrade Wholesale &amp; FMCG",
    role: "Founder & Managing Director",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    quote:
      "“Paper attendance cards and disputed overtime used to cost us hundreds of thousands of Cedis every year. NextSoftHr brought transparency, strict discipline, and automatic GRA compliance to our warehouses.”",
    challenge:
      "Time theft, unapproved driver overtime claims, and manual leave approvals were stalling logistics operations and triggering penalties from Ghana Revenue Authority.",
    solution:
      "Rolled out biometric terminal sync, NextSofthr driver mobile app, automated SSNIT Tier 1 & 2 remittances, and instant WhatsApp payslip delivery.",
    results: [
      {
        metric: "GH₵185k",
        label: "Overtime Leakage Prevented",
        subtext: "Annual savings on false overtime",
      },
      {
        metric: "99.2%",
        label: "On-Time Fleet Punctuality",
        subtext: "Automated shift alerts",
      },
      {
        metric: "100%",
        label: "GRA Audit Approval",
        subtext: "Pre-flight tax validation",
      },
    ],
    featuresUsed: [
      "Biometric Terminal Sync",
      "SSNIT Tier 1 & 2",
      "WhatsApp Delivery",
      "Timesheet Approvals",
    ],
  },
  {
    id: "capecloud",
    companyName: "CapeCloud Digital Studios",
    industry: "Creative Software & Cloud Engineering",
    industryCategory: "tech",
    headquarters: "Cape Town, South Africa & Amsterdam, NL",
    corridor: "🇿🇦 South Africa → 🇳🇱 Netherlands",
    flag: "🇿🇦🇳🇱",
    scaleBadge: "Scaled 22 → 85 Hybrid Specialists",
    author: "Le Roux van der Merwe",
    role: "Co-Founder &amp; CTO, Cape Cloud Digital Studios",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    quote:
      "“We hire top engineering talent across South Africa and deliver projects to clients in Western Europe. NextSoftHr handles our cross-border tax deductions, contracts, and currency conversions effortlessly.”",
    challenge:
      "Struggling with complex South African POPIA data residency requirements, SARS EMP201 monthly declarations, and dual ZAR/EUR contractor payouts.",
    solution:
      "Utilized NextSofthr multi-currency cross-border vault, automated SARS EMP501 bi-annual reconciliations, and built-in IP assignment contract workflows.",
    results: [
      {
        metric: "$45,000",
        label: "FX & Wire Fee Savings",
        subtext: "Institutional rate conversion",
      },
      {
        metric: "100%",
        label: "POPIA & GDPR Compliant",
        subtext: "Encrypted local data residency",
      },
      {
        metric: "24 Hours",
        label: "Contractor Contracting",
        subtext: "Down from 7 business days",
      },
    ],
    featuresUsed: [
      "Dual ZAR/EUR Vault",
      "SARS eFiling Sync",
      "POPIA Data Shield",
      "AI ATS & Screening",
    ],
  },
  {
    id: "biomed",
    companyName: "BioMed Diagnostic Laboratories",
    industry: "Clinical Pathology & Diagnostics",
    industryCategory: "health",
    headquarters: "Cairo, Egypt & Dubai, UAE",
    corridor: "🇪🇬 Egypt → 🇦🇪 UAE",
    flag: "🇪🇬🇦🇪",
    scaleBadge: "Scaled 60 → 310 Medical Professionals",
    author: "Dr. Tarek El-Mansy",
    role: "Managing Partner &amp; Medical Director, BioMed Diagnostic Laboratories",
    avatar:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80",
    quote:
      "“Managing over 300 lab technicians, biochemists, and branch staff across Cairo and Dubai was overwhelming on our admin team. NextSoftHr automated all shift multipliers and statutory withholdings seamlessly.”",
    challenge:
      "Tracking night shift hazard multipliers across 14 laboratory branches while complying with Egypt Unified Tax Law No. 206 and UAE Wages Protection System (WPS).",
    solution:
      "Configured automated Egyptian unified tax bracket calculations, electronic bilingual payslip generation, and Central Bank WPS wage protection clearing rails.",
    results: [
      {
        metric: "98.6%",
        label: "Error Rate Reduction",
        subtext: "Eliminated manual re-calculations",
      },
      {
        metric: "14 Branches",
        label: "Unified Live Cockpit",
        subtext: "Real-time executive oversight",
      },
      {
        metric: "100%",
        label: "WPS Certified",
        subtext: "Automated SIF wage file creation",
      },
    ],
    featuresUsed: [
      "UAE WPS Rails",
      "Egyptian Unified Tax",
      "Shift Roster Multiplier",
      "Executive Analytics",
    ],
  },
];

interface CustomerSuccessStoriesProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

export const CustomerSuccessStories = ({
  onOpenDemo,
  onOpenGetStarted,
}: CustomerSuccessStoriesProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState<
    "all" | "tech" | "health" | "hospitality" | "fmcg"
  >("all");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Filtered stories
  const filteredStories = CASE_STUDIES.filter((story) => {
    if (filter === "all") return true;
    return story.industryCategory === filter;
  });

  // Keep active index in bounds if filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  // Handle Autoplay
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredStories.length);
    }, 7000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, filteredStories.length]);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? filteredStories.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredStories.length);
  };

  const currentStory = filteredStories[activeIndex] || filteredStories[0];

  return (
    <section
      id="customer-stories"
      className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors relative overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Customer Success Stories
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Verified SME Scale Proof
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How African & Global SMEs Scale Fast with NextSofthr.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg mt-3 leading-relaxed">
              Explore how high-growth businesses across technology, healthcare,
              logistics, and hospitality eliminate manual payroll errors,
              automate compliance, and empower remote workforces.
            </p>
          </div>

          {/* Controls & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Industry Filter Pills */}
            <div className="flex flex-wrap items-center bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  filter === "all"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                All Sectors ({CASE_STUDIES.length})
              </button>
              <button
                onClick={() => setFilter("tech")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  filter === "tech"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Fintech & Tech
              </button>
              <button
                onClick={() => setFilter("health")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  filter === "health"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Healthcare
              </button>
              <button
                onClick={() => setFilter("hospitality")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  filter === "hospitality"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Hospitality
              </button>
              <button
                onClick={() => setFilter("fmcg")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  filter === "fmcg"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                FMCG Logistics
              </button>
            </div>

            {/* Navigation Buttons & Autoplay Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                title={
                  isAutoPlaying ? "Pause auto-rotation" : "Resume auto-rotation"
                }
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors shadow-2xs"
                aria-label={isAutoPlaying ? "Pause autoplay" : "Play autoplay"}
              >
                {isAutoPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors shadow-2xs"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
                aria-label="Next story"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Showcase Bento Card */}
        {currentStory && (
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-300"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Top Company & Corridor Bar */}
            <div className="px-6 sm:px-8 py-5 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold font-display text-lg shadow-xs">
                  {currentStory.companyName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                      {currentStory.companyName}
                    </h3>
                    <span className="text-sm" title={currentStory.corridor}>
                      {currentStory.flag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {currentStory.industry} • {currentStory.headquarters}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-lime-100 dark:bg-lime-950/80 text-lime-900 dark:text-lime-300 border border-lime-200 dark:border-lime-800 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-lime-700 dark:text-lime-400" />
                  {currentStory.scaleBadge}
                </span>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Quote, Challenge & Solution */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                {/* Executive Quote Bubble */}
                <div className="relative bg-blue-50/60 dark:bg-slate-800/60 p-6 sm:p-7 rounded-2xl border border-blue-100 dark:border-slate-700/80">
                  <Quote className="w-8 h-8 text-blue-400 dark:text-blue-500/40 absolute top-4 right-4" />
                  <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base font-medium leading-relaxed italic pr-6">
                    “{currentStory.quote}”
                  </p>

                  <div className="flex items-center gap-3.5 mt-5 pt-4 border-t border-blue-200/60 dark:border-slate-700">
                    <div
                      className="w-11 h-11 rounded-full bg-blue-600 dark:bg-lime-400 text-white dark:text-slate-950 font-bold text-sm flex items-center justify-center border-2 border-white dark:border-slate-600 shadow-xs shrink-0 select-none"
                      aria-label={currentStory.author}
                    >
                      {currentStory.author
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {currentStory.author}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {currentStory.role}, {currentStory.companyName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* The Challenge vs Solution Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-red-50/60 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-red-700 dark:text-red-400 uppercase text-[10px] tracking-wider block mb-1 flex items-center gap-1">
                      <span>The Scaling Bottleneck</span>
                    </span>
                    <p className="leading-relaxed">{currentStory.challenge}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase text-[10px] tracking-wider block mb-1 flex items-center gap-1">
                      <span>The NextSofthr Solution</span>
                    </span>
                    <p className="leading-relaxed">{currentStory.solution}</p>
                  </div>
                </div>

                {/* Modules Deployed Badges */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Key NextSofthr Architecture Used:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentStory.featuresUsed.map((feat, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Quantified Scale Metrics & Action */}
              <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Verified Business Impact
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Live Audit
                    </span>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="space-y-3.5">
                    {currentStory.results.map((res, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-baseline justify-between">
                          <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
                            {res.metric}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400">
                            {res.label}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">
                          {res.subtext}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action Box */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={onOpenDemo}
                    className="w-full sm:flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Simulate Similar Growth</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="/sign-in?mode=signup"
                    className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all text-center flex items-center justify-center cursor-pointer"
                  >
                    Start Free Trial
                  </a>
                </div>
              </div>
            </div>

            {/* Carousel Dot Indicators */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Story {activeIndex + 1} of {filteredStories.length}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {currentStory.corridor}
                </span>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {filteredStories.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveIndex(dotIdx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === dotIdx
                        ? "w-7 bg-blue-600 dark:bg-blue-500"
                        : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Global Client Logos Strip */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800/80 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            Trusted by fast-growing businesses across 14+ African &
            International economic corridors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span>🇳🇬 Lagos Tech Hubs</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>🇰🇪 Nairobi Silicon Savannah</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>🇿🇦 Cape Town & Joburg</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>🇷🇼 Kigali Innovation City</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>🇬🇭 Accra Commerce Hub</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>🇪🇬 Cairo & North Africa</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>🇬🇧 London Remote Corridors</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
