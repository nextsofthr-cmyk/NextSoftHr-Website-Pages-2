import React, { useMemo, useState } from "react";
import {
  PartnerBadgeOptions,
  generatePartnerBadgeSvg,
  downloadPartnerBadgeSvg,
  downloadPartnerBadgePng,
  generatePartnerBadgeEmbedCode,
  TIER_THEMES,
} from "../utils/badgeGenerator";
import {
  Download,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";

interface PartnerBadgeProps {
  options: PartnerBadgeOptions;
  className?: string;
  size?: "sm" | "md" | "lg" | "responsive";
  showControls?: boolean;
  onOpenModal?: (options: PartnerBadgeOptions) => void;
}

export const PartnerBadge: React.FC<PartnerBadgeProps> = ({
  options,
  className = "",
  size = "md",
  showControls = true,
  onOpenModal,
}) => {
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedSvg, setCopiedSvg] = useState<boolean>(false);
  const [isDownloadingPng, setIsDownloadingPng] = useState<boolean>(false);

  // Generate the dynamic SVG string
  const svgContent = useMemo(() => {
    return generatePartnerBadgeSvg(options);
  }, [options]);

  const theme = TIER_THEMES[options.tier] || TIER_THEMES.platinum;

  const handleDownloadSvg = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadPartnerBadgeSvg(options);
  };

  const handleDownloadPng = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setIsDownloadingPng(true);
      await downloadPartnerBadgePng(options, undefined, 2);
    } finally {
      setIsDownloadingPng(false);
    }
  };

  const handleCopySvg = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(svgContent);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2500);
  };

  const handleCopyEmbed = (e: React.MouseEvent) => {
    e.stopPropagation();
    const embed = generatePartnerBadgeEmbedCode(options);
    navigator.clipboard.writeText(embed);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Dimensions based on size prop and style variant
  const isCompact = options.styleVariant === "compact";

  const sizeClasses = {
    sm: isCompact ? "w-48 h-14" : "w-24 h-24",
    md: isCompact ? "w-64 h-18" : "w-44 h-44",
    lg: isCompact ? "w-80 h-24" : "w-64 h-64",
    responsive: "w-full h-auto max-w-[340px]",
  }[size];

  return (
    <div className={`relative group inline-block ${className}`}>
      {/* Dynamic SVG Container */}
      <div
        onClick={() => onOpenModal && onOpenModal(options)}
        className={`${sizeClasses} flex items-center justify-center transition-all duration-300 transform group-hover:scale-[1.03] cursor-pointer filter drop-shadow-md group-hover:drop-shadow-2xl`}
        title={`Click to view official ${options.partnerName} verification badge`}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {/* Quick Action Overlay (Appears on Hover when showControls is true) */}
      {showControls && (
        <div className="absolute inset-x-0 -bottom-10 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto flex items-center justify-center gap-1.5 z-20">
          <div className="bg-[#030914]/95 border border-slate-700 dark:border-blue-700/80 p-1.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-1 text-[11px] text-white">
            {/* Download SVG */}
            <button
              onClick={handleDownloadSvg}
              title="Download Vector SVG"
              className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1 transition-all"
            >
              <Download className="w-3 h-3" />
              <span>SVG</span>
            </button>

            {/* Download PNG */}
            <button
              onClick={handleDownloadPng}
              disabled={isDownloadingPng}
              title="Download High-Res PNG"
              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold flex items-center gap-1 transition-all"
            >
              <ImageIcon className="w-3 h-3" />
              <span>{isDownloadingPng ? "..." : "PNG"}</span>
            </button>

            {/* Copy SVG XML */}
            <button
              onClick={handleCopySvg}
              title="Copy Raw SVG XML"
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all"
            >
              {copiedSvg ? (
                <Check className="w-3.5 h-3.5 text-[#B8F010]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Inspect / Open Studio Modal */}
            {onOpenModal && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(options);
                }}
                title="Open Badge Studio & Verification Certificate"
                className="px-2 py-1 rounded-lg bg-[#B8F010] text-[#040E1F] font-extrabold flex items-center gap-1 hover:bg-[#CBFF1A] transition-all"
              >
                <Sparkles className="w-3 h-3" />
                <span>Studio</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
