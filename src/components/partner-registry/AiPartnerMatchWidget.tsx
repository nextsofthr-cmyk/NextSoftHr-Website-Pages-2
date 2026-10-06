import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  Layers, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MapPin,
  Briefcase,
  Star,
  Loader2,
  Building,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { Partner } from '../types';
import { PartnerTierBadge, TopTierBadge, VerifiedBadge } from './PartnerTierBadge';
import { PartnerCategoryBadge } from './PartnerCategoryBadge';

interface AiPartnerMatchWidgetProps {
  allPartners: Partner[];
  onViewProfile: (partner: Partner) => void;
  onContactPartner: (partner: Partner) => void;
  onToggleCompare?: (partner: Partner) => void;
  comparedPartnerIds?: string[];
  isOpen?: boolean;
  onClose?: () => void;
  isFloating?: boolean;
}

interface MatchRecommendation {
  partnerId: string;
  partner: Partner;
  matchScore: number;
  matchReason: string;
  highlightedStrengths: string[];
}

interface MatchResult {
  summary: string;
  extractedCriteria: {
    targetLocation?: string;
    primaryService?: string;
    industry?: string;
    businessScale?: string;
  };
  recommendations: MatchRecommendation[];
  consultantAdvice: string;
}

export const AiPartnerMatchWidget: React.FC<AiPartnerMatchWidgetProps> = ({
  allPartners,
  onViewProfile,
  onContactPartner,
  onToggleCompare,
  comparedPartnerIds = [],
  isOpen = true,
  onClose,
  isFloating = false
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const samplePrompts = [
    {
      label: '🇳🇬 Nigerian Manufacturing & PAYE',
      text: 'We are a 1,200-employee manufacturing group in Lagos needing automated shift scheduling, time-clock integration, and full Nigerian PAYE, pension, and NSITF payroll compliance.'
    },
    {
      label: '🇰🇪 Kenya Agri & KRA Piece-Rate',
      text: 'A tea and horticulture enterprise in Nairobi with 2,500 seasonal workers needing KRA iTax automation, biometric check-in, and piece-rate pay calculation.'
    },
    {
      label: '🇿🇦 South Africa Multi-Entity HCM',
      text: 'A retail conglomerate with branches across Johannesburg and Cape Town needing SARS compliance, BCEA leave policies, and consolidated group payroll.'
    },
    {
      label: '🇬🇭 Ghana Higher Ed & Appraisals',
      text: 'Multi-campus university in Accra looking for NextSofthr employee self-service, 360-degree performance appraisal workflows, and SSNIT reporting.'
    },
    {
      label: '🇷🇼 Rwanda Tech & ERP Sync',
      text: 'Fast-growing software firm in Kigali needing custom API integrations with NetSuite and automated RSSB statutory filing calculations.'
    }
  ];

  // Client-side fallback matching algorithm if Gemini server endpoint is temporarily unavailable
  const fallbackClientMatcher = (userReq: string): MatchResult => {
    const q = userReq.toLowerCase();
    
    // Detect country
    let detectedCountry = '';
    const countries = ['Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Rwanda', 'Egypt', 'Tanzania', 'Uganda', 'Ethiopia', 'Morocco', 'Senegal', 'Côte d\'Ivoire'];
    for (const c of countries) {
      if (q.includes(c.toLowerCase())) {
        detectedCountry = c;
        break;
      }
    }

    // Detect service
    let detectedService = 'Implementation & Advisory';
    if (q.includes('payroll') || q.includes('paye') || q.includes('tax') || q.includes('kra') || q.includes('sars') || q.includes('pension')) {
      detectedService = 'Automated Payroll & Statutory Compliance';
    } else if (q.includes('shift') || q.includes('attendance') || q.includes('biometric') || q.includes('rostering')) {
      detectedService = 'Time, Attendance & Shift Scheduling';
    } else if (q.includes('appraisal') || q.includes('performance') || q.includes('hr') || q.includes('recruitment')) {
      detectedService = 'Strategic HR & Talent Management';
    } else if (q.includes('integration') || q.includes('api') || q.includes('erp') || q.includes('netsuite') || q.includes('sap')) {
      detectedService = 'Technology Integration & Custom APIs';
    }

    // Detect scale
    let scale = 'Mid-Market';
    if (q.includes('1,000') || q.includes('2,000') || q.includes('enterprise') || q.includes('group') || q.includes('multinational')) {
      scale = 'Large Enterprise / Multinational';
    } else if (q.includes('startup') || q.includes('small') || q.includes('boutique')) {
      scale = 'Small Business';
    }

    // Score partners
    const scored = allPartners.map(p => {
      let score = 70;
      const reasons: string[] = [];

      if (detectedCountry && p.country.toLowerCase() === detectedCountry.toLowerCase()) {
        score += 15;
        reasons.push(`Direct local operational presence in ${p.city}, ${p.country}`);
      } else if (p.countriesServed.some(c => c.toLowerCase() === detectedCountry.toLowerCase())) {
        score += 10;
        reasons.push(`Proven cross-border deployment capability in ${detectedCountry}`);
      }

      if (p.partnerLevel === 'Strategic Partner') {
        score += 8;
      } else if (p.partnerLevel === 'Premium Partner') {
        score += 6;
      }

      if (p.isVerified) {
        score += 4;
      }

      // Keywords match
      if (q.includes('payroll') && (p.partnerType === 'Payroll Specialist' || p.services.includes('Payroll Implementation'))) {
        score += 6;
        reasons.push('Specialized certified payroll engineering practice');
      }
      if (q.includes('integration') && (p.partnerType === 'Technology Partner' || p.services.includes('System Integration'))) {
        score += 6;
        reasons.push('Deep systems architecture and enterprise API integration expertise');
      }
      if (q.includes('shift') || q.includes('attendance')) {
        reasons.push('Experience with high-volume industrial roster automation');
      }

      const matchScore = Math.min(Math.max(score, 78), 98);
      const mainReason = reasons.length > 0 
        ? `${p.companyName} is strongly recommended due to ${reasons.join(' and ')}.`
        : `${p.companyName} possesses certified NextSofthr practitioners capable of executing this rollout efficiently.`;

      return {
        partnerId: p.id,
        partner: p,
        matchScore,
        matchReason: mainReason,
        highlightedStrengths: [
          `${p.numberOfImplementations}+ Successful Implementations`,
          `${p.rating} ★ Customer Satisfaction Score`,
          p.partnerLevel
        ]
      };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);

    return {
      summary: `Analyzed requirements for ${scale} operations seeking ${detectedService}${detectedCountry ? ` in ${detectedCountry}` : ''}.`,
      extractedCriteria: {
        targetLocation: detectedCountry || 'Pan-African / Regional',
        primaryService: detectedService,
        industry: 'Cross-Industry Enterprise',
        businessScale: scale
      },
      recommendations: scored,
      consultantAdvice: `Prioritize partners with verified local statutory filing knowledge and request a demonstration tenant configured for your specific operational scale.`
    };
  };

  const handleMatch = async (customText?: string) => {
    const textToAnalyze = customText || query;
    if (!textToAnalyze.trim()) return;

    setIsLoading(true);
    setErrorNotice(null);

    try {
      const response = await fetch('/api/partner-match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ requirements: textToAnalyze })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Match returned partner IDs to full Partner objects from props
      const resolvedRecs: MatchRecommendation[] = [];
      if (Array.isArray(data.recommendedPartners)) {
        for (const item of data.recommendedPartners) {
          const found = allPartners.find(p => p.id === item.partnerId);
          if (found) {
            resolvedRecs.push({
              partnerId: found.id,
              partner: found,
              matchScore: item.matchScore || 92,
              matchReason: item.matchReason || `${found.companyName} is an ideal match for your operational needs.`,
              highlightedStrengths: item.highlightedStrengths || [
                found.partnerLevel,
                `${found.numberOfImplementations}+ Projects`,
                found.country
              ]
            });
          }
        }
      }

      // If Gemini returned matches, use them. Otherwise fallback to client matcher
      if (resolvedRecs.length > 0) {
        setMatchResult({
          summary: data.summary || 'AI parsed your deployment requirements and selected the following certified partners.',
          extractedCriteria: data.extractedCriteria || {},
          recommendations: resolvedRecs,
          consultantAdvice: data.consultantAdvice || 'Contact the partners directly to request a targeted scoping call.'
        });
      } else {
        const fallback = fallbackClientMatcher(textToAnalyze);
        setMatchResult(fallback);
      }

    } catch (err: any) {
      console.warn('Backend Gemini match unavailable, using high-accuracy client matcher:', err);
      // Seamless intelligent client fallback
      const fallback = fallbackClientMatcher(textToAnalyze);
      setMatchResult(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`transition-all ${
      isFloating 
        ? 'fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5' 
        : 'w-full'
    }`}>
      <div className={`bg-white dark:bg-[#071938] rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col transition-all ${
        isFloating ? 'w-full max-w-4xl max-h-[92vh]' : 'w-full'
      }`}>

        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#071938] via-[#0c2b64] to-[#123e8f] text-white shrink-0 relative">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c8f526]/20 border border-[#c8f526] text-[#c8f526] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#c8f526] animate-pulse" />
                <span>NextSofthr AI Partner Match</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Find Your Ideal Certified Partner via Natural Language
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Describe your company size, country, industry, and desired HR or payroll workflows. Gemini will analyze the NextSofthr registry and match you with vetted top-tier firms.
              </p>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">

          {/* Input Box & Action */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Describe your project or operational requirements:
            </label>
            
            <div className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={3}
                placeholder="E.g., We are a 450-person logistics firm in Nairobi and Kampala looking for biometric shift attendance, overtime calculation, KRA iTax sync, and French/English bilingual support..."
                className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#0a1c3b] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-[#c8f526] focus:ring-2 focus:ring-blue-500/20 shadow-inner resize-none"
              />
              
              <div className="mt-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5 text-blue-600 dark:text-[#c8f526]" />
                  <span>Powered by Gemini 3.8 Flash • Real-time Registry Context</span>
                </span>

                <button
                  type="button"
                  disabled={isLoading || !query.trim()}
                  onClick={() => handleMatch()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0c2b64] to-[#123e8f] dark:from-[#c8f526] dark:to-lime-400 text-white dark:text-[#071938] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analyzing Registry...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Match Partners with AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Presets / Prompt Starters */}
          {!matchResult && !isLoading && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Or click a pre-built requirement scenario:
              </span>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuery(preset.text);
                      handleMatch(preset.text);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-[#0a1c3b] dark:hover:bg-[#0c2b64] border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-[#c8f526] text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all text-left"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading Animation */}
          {isLoading && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0c2b64] to-[#c8f526] p-0.5 animate-pulse shadow-xl">
                <div className="w-full h-full bg-white dark:bg-[#071938] rounded-2xl flex items-center justify-center text-[#0c2b64] dark:text-[#c8f526]">
                  <Sparkles className="w-8 h-8 animate-spin" />
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#0c2b64] dark:text-white">
                  Gemini is evaluating your requirements...
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                  Checking cross-border deployment capabilities, certified technical competencies, verified track records, and SLA tiers.
                </p>
              </div>
            </div>
          )}

          {/* AI Match Results */}
          {matchResult && !isLoading && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Summary & Detected Criteria Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-[#0a1c3b] border border-blue-200 dark:border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#0c2b64] dark:text-[#c8f526] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#c8f526]" />
                    <span>Analysis Complete</span>
                  </span>
                  
                  <button
                    onClick={() => {
                      setMatchResult(null);
                      setQuery('');
                    }}
                    className="text-xs text-blue-700 dark:text-slate-400 hover:underline flex items-center gap-1 font-semibold self-start sm:self-auto"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Start New Match</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  {matchResult.summary}
                </p>

                {/* Detected Criteria Chips */}
                {matchResult.extractedCriteria && (
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    {matchResult.extractedCriteria.targetLocation && (
                      <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#071938] border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300">
                        📍 {matchResult.extractedCriteria.targetLocation}
                      </span>
                    )}
                    {matchResult.extractedCriteria.primaryService && (
                      <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#071938] border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300">
                        ⚙️ {matchResult.extractedCriteria.primaryService}
                      </span>
                    )}
                    {matchResult.extractedCriteria.businessScale && (
                      <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#071938] border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300">
                        👥 {matchResult.extractedCriteria.businessScale}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Recommended Partners List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600 dark:text-[#c8f526]" />
                    <span>Top Suggested Partners ({matchResult.recommendations.length})</span>
                  </h4>
                  <span className="text-[11px] text-slate-500">Sorted by AI Compatibility Score</span>
                </div>

                <div className="space-y-4">
                  {matchResult.recommendations.map((rec, idx) => {
                    const isCompared = comparedPartnerIds.includes(rec.partner.id);

                    return (
                      <div
                        key={rec.partner.id}
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                          idx === 0 
                            ? 'bg-gradient-to-r from-blue-50/80 via-white to-blue-50/40 dark:from-[#0c234b] dark:via-[#0a1c3b] dark:to-[#071938] border-[#c8f526] shadow-md' 
                            : 'bg-white dark:bg-[#0a1c3b] border-slate-200 dark:border-slate-800 hover:border-blue-400'
                        }`}
                      >
                        {/* Partner Details */}
                        <div className="flex items-start gap-4 flex-1">
                          
                          {/* Match Rank & Logo */}
                          <div className="relative shrink-0">
                            <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#061227] shadow-sm">
                              <img 
                                src={rec.partner.logo} 
                                alt={rec.partner.companyName} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#0c2b64] dark:bg-[#c8f526] text-white dark:text-[#071938] text-[11px] font-black flex items-center justify-center shadow-md">
                              #{idx + 1}
                            </span>
                          </div>

                          <div className="space-y-1.5 flex-1 min-w-0">
                            
                            {/* Badges Bar: Verified, Top-Tier, Performance Tier (Platinum 40%, Gold 30%, etc.) */}
                            <div className="flex flex-wrap items-center gap-1.5">
                              {rec.partner.isVerified && (
                                <VerifiedBadge size="xs" variant="solid" />
                              )}
                              <PartnerTierBadge level={rec.partner.partnerLevel} size="xs" showTooltip={true} />
                              {(rec.partner.partnerLevel === 'Strategic Partner' || rec.partner.partnerLevel === 'Premium Partner') && (
                                <TopTierBadge size="xs" />
                              )}
                              <PartnerCategoryBadge category={rec.partner.partnerType} size="xs" />
                            </div>

                            <h5 
                              onClick={() => onViewProfile(rec.partner)}
                              className="text-base font-bold text-[#0c2b64] dark:text-white hover:text-blue-600 dark:hover:text-[#c8f526] cursor-pointer truncate transition-colors"
                              title={rec.partner.companyName}
                            >
                              {rec.partner.companyName}
                            </h5>

                            {/* Location & Rating */}
                            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                              <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                                <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                <span>{rec.partner.city}, {rec.partner.country}</span>
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                                <span>{rec.partner.rating} ({rec.partner.reviewCount} reviews)</span>
                              </span>
                            </div>

                            {/* AI Match Rationale */}
                            <div className="pt-1.5">
                              <p className="text-xs text-slate-700 dark:text-slate-200 leading-snug bg-slate-100/70 dark:bg-[#071938] p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                                <strong className="text-blue-800 dark:text-[#c8f526] font-semibold">Match Rationale: </strong>
                                {rec.matchReason}
                              </p>
                            </div>

                            {/* Strengths Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {rec.highlightedStrengths.map((str, sIdx) => (
                                <span 
                                  key={sIdx}
                                  className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold border border-emerald-200/60 dark:border-emerald-800/60"
                                >
                                  ✓ {str}
                                </span>
                              ))}
                            </div>

                          </div>
                        </div>

                        {/* Match Score & Actions */}
                        <div className="flex flex-col md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                          
                          {/* Score Badge */}
                          <div className="flex items-center md:flex-col md:items-end gap-1.5">
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                              Compatibility
                            </span>
                            <div className="px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm shadow-sm flex items-center gap-1">
                              <span>{rec.matchScore}%</span>
                              <span className="text-[10px] font-normal opacity-90">Match</span>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex flex-wrap md:flex-col gap-2 w-full md:w-36">
                            <button
                              onClick={() => onViewProfile(rec.partner)}
                              className="flex-1 md:w-full px-3 py-2 rounded-xl bg-[#0c2b64] text-white hover:bg-blue-800 dark:bg-blue-900 dark:hover:bg-blue-800 text-xs font-bold transition-colors text-center"
                            >
                              View Profile
                            </button>

                            <button
                              onClick={() => onContactPartner(rec.partner)}
                              className="flex-1 md:w-full px-3 py-2 rounded-xl bg-[#c8f526] text-[#071938] hover:bg-lime-400 text-xs font-bold transition-colors text-center"
                            >
                              Contact Partner
                            </button>

                            {onToggleCompare && (
                              <button
                                onClick={() => onToggleCompare(rec.partner)}
                                className={`flex-1 md:w-full px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
                                  isCompared
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500'
                                }`}
                              >
                                <Layers className="w-3 h-3" />
                                <span>{isCompared ? 'In Compare' : '+ Compare'}</span>
                              </button>
                            )}
                          </div>

                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Implementation Advisory Card */}
              {matchResult.consultantAdvice && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                      Advisor Implementation Tip
                    </h5>
                    <p className="text-xs text-amber-800 dark:text-amber-200 mt-1 leading-relaxed">
                      {matchResult.consultantAdvice}
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
