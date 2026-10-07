import React, { useState, useMemo } from 'react';
import { 
  PartnerBadgeOptions, 
  BadgeStyleVariant, 
  BadgeTier,
  generatePartnerBadgeSvg, 
  downloadPartnerBadgeSvg, 
  downloadPartnerBadgePng, 
  generatePartnerBadgeEmbedCode,
  TOP_TIER_PARTNER_PRESETS,
  TIER_THEMES,
  generateSecurityHash
} from '../utils/badgeGenerator';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  Sliders, 
  Award, 
  CheckCircle2, 
  Image as ImageIcon,
  Code2,
  FileCode,
  Share2
} from 'lucide-react';

interface PartnerBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOptions?: PartnerBadgeOptions;
}

export const PartnerBadgeModal: React.FC<PartnerBadgeModalProps> = ({
  isOpen,
  onClose,
  initialOptions
}) => {
  const defaultOpts: PartnerBadgeOptions = initialOptions || TOP_TIER_PARTNER_PRESETS[0];

  const [partnerName, setPartnerName] = useState<string>(defaultOpts.partnerName);
  const [tier, setTier] = useState<BadgeTier>(defaultOpts.tier);
  const [partnerId, setPartnerId] = useState<string>(defaultOpts.partnerId);
  const [year, setYear] = useState<number | string>(defaultOpts.year || 2026);
  const [specialization, setSpecialization] = useState<string>(defaultOpts.specialization || 'Enterprise Cloud HR & Payroll');
  const [region, setRegion] = useState<string>(defaultOpts.region || 'West Africa & Global');
  const [styleVariant, setStyleVariant] = useState<BadgeStyleVariant>(defaultOpts.styleVariant || 'crest');

  const [copiedEmbed, setCopiedEmbed] = useState<boolean>(false);
  const [copiedSvg, setCopiedSvg] = useState<boolean>(false);
  const [isDownloadingPng, setIsDownloadingPng] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'embed' | 'svg'>('embed');

  // Sync state if initialOptions changes when opening
  React.useEffect(() => {
    if (initialOptions) {
      setPartnerName(initialOptions.partnerName);
      setTier(initialOptions.tier);
      setPartnerId(initialOptions.partnerId);
      setYear(initialOptions.year || 2026);
      setSpecialization(initialOptions.specialization || 'Enterprise Cloud HR & Payroll');
      setRegion(initialOptions.region || 'West Africa & Global');
      setStyleVariant(initialOptions.styleVariant || 'crest');
    }
  }, [initialOptions]);

  // Current badge configuration object
  const currentBadgeOptions: PartnerBadgeOptions = useMemo(() => {
    return {
      partnerName,
      tier,
      partnerId,
      year,
      specialization,
      region,
      styleVariant,
      securityHash: generateSecurityHash(partnerId, partnerName, tier)
    };
  }, [partnerName, tier, partnerId, year, specialization, region, styleVariant]);

  // Generate dynamic SVG string
  const currentSvg = useMemo(() => {
    return generatePartnerBadgeSvg(currentBadgeOptions);
  }, [currentBadgeOptions]);

  // Current tier theme
  const theme = TIER_THEMES[tier] || TIER_THEMES.platinum;

  if (!isOpen) return null;

  const handleDownloadSvg = () => {
    downloadPartnerBadgeSvg(currentBadgeOptions);
  };

  const handleDownloadPng = async () => {
    try {
      setIsDownloadingPng(true);
      await downloadPartnerBadgePng(currentBadgeOptions, undefined, 2);
    } finally {
      setIsDownloadingPng(false);
    }
  };

  const handleCopySvg = () => {
    navigator.clipboard.writeText(currentSvg);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2500);
  };

  const handleCopyEmbed = () => {
    const embed = generatePartnerBadgeEmbedCode(currentBadgeOptions);
    navigator.clipboard.writeText(embed);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  const handleSelectPreset = (preset: PartnerBadgeOptions) => {
    setPartnerName(preset.partnerName);
    setTier(preset.tier);
    setPartnerId(preset.partnerId);
    setYear(preset.year || 2026);
    setSpecialization(preset.specialization || 'Enterprise Cloud HR & Payroll');
    setRegion(preset.region || 'West Africa & Global');
    if (preset.styleVariant) setStyleVariant(preset.styleVariant);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white dark:bg-[#040E1F] border border-slate-200 dark:border-blue-800/80 shadow-2xl overflow-hidden my-auto">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4.5 bg-slate-50 dark:bg-[#071D3E] border-b border-slate-200 dark:border-blue-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/80 border border-blue-300 dark:border-[#B8F010]/50 flex items-center justify-center text-blue-700 dark:text-[#B8F010]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  Partner Certification Badge Studio
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-[#B8F010]">
                  DYNAMIC VECTOR SVG
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official accreditation seals for verified NextSofthr channel partners
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-blue-900/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Badge Live Rendering & Download Suite (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-blue-900/60 bg-gradient-to-b from-slate-50/50 to-white dark:from-[#030914] dark:to-[#040E1F]">
            
            {/* Style Selector Tabs */}
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Select Badge Style Architecture
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'crest', label: 'Crest Seal', desc: 'Classic Medallion', icon: '🎖️' },
                  { id: 'shield', label: 'Heraldic Shield', desc: 'Enterprise Cyber', icon: '🛡️' },
                  { id: 'hex', label: 'Tech Hexagon', desc: 'Cloud & AI Node', icon: '⬡' },
                  { id: 'compact', label: 'Signature Banner', desc: 'Email & Website', icon: '🏷️' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyleVariant(s.id as BadgeStyleVariant)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      styleVariant === s.id
                        ? 'bg-blue-50 dark:bg-blue-900/60 border-blue-600 dark:border-[#B8F010] shadow-sm text-slate-900 dark:text-white'
                        : 'bg-white dark:bg-blue-950/40 border-slate-200 dark:border-blue-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <span className="text-base block mb-0.5">{s.icon}</span>
                    <span className="text-xs font-bold block">{s.label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Interactive SVG Canvas Display */}
            <div className="relative py-8 px-4 rounded-3xl bg-slate-900/5 dark:bg-[#020611] border-2 border-dashed border-slate-300 dark:border-blue-900/80 flex items-center justify-center min-h-[340px] shadow-inner overflow-hidden group">
              {/* Subtle background glow */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none blur-3xl transition-all duration-500"
                style={{ backgroundColor: theme.accentColor }}
              />

              {/* Dynamic SVG Rendered */}
              <div 
                className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 filter drop-shadow-2xl"
                dangerouslySetInnerHTML={{ __html: currentSvg }}
              />

              {/* Resolution Watermark */}
              <span className="absolute bottom-3 right-4 text-[10px] font-mono text-slate-400 dark:text-slate-600">
                Vector 1:1 • Lossless XML SVG
              </span>
            </div>

            {/* Instant Download & Export Actions */}
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Download Vector SVG */}
                <button
                  onClick={handleDownloadSvg}
                  className="px-5 py-3 rounded-2xl bg-[#B8F010] text-[#040E1F] font-black text-xs hover:bg-[#CBFF1A] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl shadow-[#B8F010]/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download SVG (Vector Asset)</span>
                </button>

                {/* Download Retina High-Res PNG */}
                <button
                  onClick={handleDownloadPng}
                  disabled={isDownloadingPng}
                  className="px-5 py-3 rounded-2xl bg-blue-600 dark:bg-blue-900 hover:bg-blue-500 dark:hover:bg-blue-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>{isDownloadingPng ? 'Rendering PNG...' : 'Download High-Res PNG'}</span>
                </button>
              </div>

              {/* Code Snippet Box (Embed Code & SVG XML) */}
              <div className="rounded-2xl bg-white dark:bg-[#020713] border border-slate-200 dark:border-blue-900/80 p-3">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-blue-900/60">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveCodeTab('embed')}
                      className={`text-[11px] font-bold px-2 py-1 rounded-md transition-colors ${
                        activeCodeTab === 'embed'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-[#B8F010]'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                      }`}
                    >
                      HTML Embed Snippet
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('svg')}
                      className={`text-[11px] font-bold px-2 py-1 rounded-md transition-colors ${
                        activeCodeTab === 'svg'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-[#B8F010]'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                      }`}
                    >
                      Raw SVG XML
                    </button>
                  </div>

                  <button
                    onClick={activeCodeTab === 'embed' ? handleCopyEmbed : handleCopySvg}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 dark:text-[#B8F010] hover:underline"
                  >
                    {(activeCodeTab === 'embed' ? copiedEmbed : copiedSvg) ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="font-mono text-[10px] text-slate-600 dark:text-slate-300 overflow-x-auto max-h-20 whitespace-pre p-1 bg-slate-50 dark:bg-[#030914] rounded-lg">
                  {activeCodeTab === 'embed' 
                    ? generatePartnerBadgeEmbedCode(currentBadgeOptions)
                    : currentSvg}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Customizer & Verification Certificate (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 bg-white dark:bg-[#040E1F]">
            
            {/* Quick Top-Tier Presets */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
                Verified Partner Leaders (Quick Load)
              </span>
              <div className="space-y-1.5">
                {TOP_TIER_PARTNER_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPreset(p)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                      partnerId === p.partnerId
                        ? 'bg-blue-50 dark:bg-blue-900/50 border-blue-500 dark:border-[#B8F010] text-slate-900 dark:text-white'
                        : 'bg-slate-50 dark:bg-blue-950/30 border-slate-200 dark:border-blue-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-blue-950'
                    }`}
                  >
                    <div>
                      <span className="font-bold block truncate max-w-[210px]">{p.partnerName}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{p.partnerId}</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                      p.tier === 'platinum' 
                        ? 'bg-[#B8F010] text-[#040E1F]' 
                        : 'bg-amber-400 text-slate-950'
                    }`}>
                      {p.tier}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Customizer Fields */}
            <div className="space-y-3.5 pt-4 border-t border-slate-200 dark:border-blue-900/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Dynamic Credential Attributes
              </span>

              {/* Partner Name Input */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Partner Organization Name
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-blue-950 border border-slate-300 dark:border-blue-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010]"
                  placeholder="e.g. Apex Advisory Services Ltd"
                />
              </div>

              {/* Tier Selection */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Accreditation Tier
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['platinum', 'gold', 'silver', 'bronze'] as BadgeTier[]).map((tId) => (
                    <button
                      key={tId}
                      type="button"
                      onClick={() => setTier(tId)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize border text-center transition-all ${
                        tier === tId
                          ? 'bg-blue-600 dark:bg-[#B8F010] text-white dark:text-[#040E1F] border-transparent shadow-sm'
                          : 'bg-slate-50 dark:bg-blue-950/60 border-slate-200 dark:border-blue-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {tId} ({tId === 'platinum' ? '40%' : tId === 'gold' ? '30%' : tId === 'silver' ? '20%' : '15%'})
                    </button>
                  ))}
                </div>
              </div>

              {/* Partner ID & Year in 2 columns */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Partner ID
                  </label>
                  <input
                    type="text"
                    value={partnerId}
                    onChange={(e) => setPartnerId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs font-mono bg-slate-50 dark:bg-blue-950 border border-slate-300 dark:border-blue-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010]"
                    placeholder="NX-PTR-8832"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Certification Year
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs font-mono bg-slate-50 dark:bg-blue-950 border border-slate-300 dark:border-blue-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010]"
                    placeholder="2026"
                  />
                </div>
              </div>

              {/* Specialization Input */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Practice Specialization
                </label>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-blue-950 border border-slate-300 dark:border-blue-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-[#B8F010]"
                  placeholder="Enterprise Cloud HR & Payroll"
                />
              </div>
            </div>

            {/* Official Digital Verification Certificate Card */}
            <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-50/80 to-slate-100 dark:from-[#071D3E] dark:to-[#040E1F] border border-blue-200 dark:border-blue-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-900 dark:text-[#B8F010] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>OFFICIAL CREDENTIAL PROOF</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                  VERIFIED ACTIVE
                </span>
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Security Hash:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{currentBadgeOptions.securityHash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Issuing Authority:</span>
                  <span className="font-semibold text-slate-800 dark:text-blue-200">NextSofthr Global Operations</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Valid Through:</span>
                  <span className="font-semibold text-slate-800 dark:text-blue-200">December 2027</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-blue-800 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 dark:text-slate-400">Direct Verification URL:</span>
                <a
                  href={`https://nextsofthr.com/partners/verify?id=${encodeURIComponent(partnerId)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Verified credential for ${partnerName} (${tier.toUpperCase()} Partner, ID: ${partnerId}). Authenticated by NextSofthr Partner Registry.`);
                  }}
                  className="font-mono text-blue-700 dark:text-[#B8F010] flex items-center gap-1 hover:underline"
                >
                  <span>verify/{partnerId}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
