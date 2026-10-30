import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  Send,
  Linkedin,
  Twitter,
  Globe
} from 'lucide-react';
import { Job } from '../types';

interface SocialShareModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onToast?: (message: string) => void;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  job,
  isOpen,
  onClose,
  onToast
}) => {
  const [selectedChannel, setSelectedChannel] = useState<'linkedin' | 'twitter' | 'whatsapp'>('linkedin');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  // Build clean, shareable URL with job query parameter
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://nextsofthr.com';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const shareUrl = `${origin}${pathname}?job=${job.id}`;

  // Pre-populated content for each channel
  const linkedinPreText = `🚀 Opportunity Alert: ${job.title} at ${job.companyName}\n\n📍 Location: ${job.location} (${job.workArrangement})\n💼 Employment: ${job.employmentType} · Experience: ${job.experienceLevel}\n💰 Remuneration: ${job.salaryRange || 'Competitive'}\n\nVerified mandate via NextSoftHR pan-African talent network. View the role specifications and apply below:\n${shareUrl}`;

  const twitterPreText = `💼 Hiring: ${job.title} at ${job.companyName} (${job.location} · ${job.workArrangement})!\n\n💰 Remuneration: ${job.salaryRange || 'Competitive'}\n\nExplore details and apply on @NextSoftHR 👇`;

  const whatsappPreText = `💼 *Job Opening: ${job.title}*\n🏢 *Company:* ${job.companyName}\n📍 *Location:* ${job.location} (${job.workArrangement})\n💰 *Compensation:* ${job.salaryRange || 'Competitive'}\n📋 *Requirements:* ${job.requirements?.[0] || 'See full specifications'}\n\n👉 *View details & apply on NextSoftHR:*\n${shareUrl}`;

  // Platform share URLs
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterPreText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(`jobs,hiring,NextSoftHR,${job.category.replace(/[^a-zA-Z0-9]/g, '')}`)}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappPreText)}`;

  const currentPreText = selectedChannel === 'linkedin' 
    ? linkedinPreText 
    : selectedChannel === 'twitter' 
    ? `${twitterPreText}\n${shareUrl}` 
    : whatsappPreText;

  const currentPlatformUrl = selectedChannel === 'linkedin'
    ? linkedinShareUrl
    : selectedChannel === 'twitter'
    ? twitterShareUrl
    : whatsappShareUrl;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      if (onToast) onToast(`📋 Job URL copied to clipboard: ${job.title}`);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentPreText);
      setCopiedText(true);
      if (onToast) onToast(`✨ Pre-populated ${selectedChannel.toUpperCase()} message copied!`);
      setTimeout(() => setCopiedText(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${job.title} at ${job.companyName}`,
          text: `Check out this opening for ${job.title} at ${job.companyName} on NextSoftHR!`,
          url: shareUrl
        });
        if (onToast) onToast('Shared successfully!');
      } catch {
        // User cancelled or aborted
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-60 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#142B4A] dark:bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-lime-400">
                  Social Media Sharing
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Pre-Populated
                </span>
              </div>
              <h3 className="text-base font-bold text-white leading-tight">
                Share Job Opening
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close share dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          
          {/* Target Role Snippet */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#142B4A] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {job.companyInitials}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">
                {job.title}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] truncate">
                {job.companyName} · {job.location} ({job.workArrangement})
              </p>
              <span className="inline-block mt-1 font-semibold text-lime-700 dark:text-lime-400 text-[11px]">
                {job.salaryRange || 'Competitive Pay'}
              </span>
            </div>
          </div>

          {/* Social Platform Selection Grid */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-2 text-xs uppercase tracking-wider">
              Choose Social Platform:
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              
              {/* LinkedIn Button */}
              <button
                type="button"
                onClick={() => setSelectedChannel('linkedin')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  selectedChannel === 'linkedin'
                    ? 'border-[#0A66C2] bg-blue-50/70 dark:bg-blue-950/60 text-[#0A66C2] dark:text-blue-400 shadow-xs ring-2 ring-[#0A66C2]/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-xs">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </div>
                <span className="font-bold text-xs">LinkedIn</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Professional Feed</span>
              </button>

              {/* Twitter / X Button */}
              <button
                type="button"
                onClick={() => setSelectedChannel('twitter')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  selectedChannel === 'twitter'
                    ? 'border-slate-900 dark:border-white bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs ring-2 ring-slate-900/20 dark:ring-white/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-xs">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <span className="font-bold text-xs">Twitter / X</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Quick Tweet</span>
              </button>

              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={() => setSelectedChannel('whatsapp')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  selectedChannel === 'whatsapp'
                    ? 'border-[#25D366] bg-emerald-50/70 dark:bg-emerald-950/60 text-[#25D366] dark:text-emerald-400 shadow-xs ring-2 ring-[#25D366]/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.24-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.3z"/>
                  </svg>
                </div>
                <span className="font-bold text-xs">WhatsApp</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Direct Message</span>
              </button>

            </div>
          </div>

          {/* Pre-populated Message Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 dark:text-slate-300 text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                <span>Pre-Populated Content Preview:</span>
              </span>
              <button
                type="button"
                onClick={handleCopyText}
                className="text-[11px] font-semibold text-[#2563EB] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3 h-3 text-lime-600 dark:text-lime-400" />
                    <span className="text-lime-600 dark:text-lime-400">Text Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
              {currentPreText}
            </div>
          </div>

          {/* Primary Action Button (Direct Share to selected platform) */}
          <div className="space-y-2 pt-1">
            <a
              href={currentPlatformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedChannel === 'linkedin'
                  ? 'bg-[#0A66C2] hover:bg-[#084e96] text-white shadow-blue-500/20'
                  : selectedChannel === 'twitter'
                  ? 'bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-slate-900/20'
                  : 'bg-[#25D366] hover:bg-[#1fae53] text-white shadow-emerald-500/20'
              }`}
            >
              <span>Share Directly to {selectedChannel === 'linkedin' ? 'LinkedIn' : selectedChannel === 'twitter' ? 'Twitter / X' : 'WhatsApp'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Quick Share Link & Native Share options */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyLink}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                    <span className="text-lime-600 dark:text-lime-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Job URL</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleNativeShare}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
                <span>More Options</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="bg-slate-50 dark:bg-slate-950 px-6 py-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Powered by NextSoftHR Career Dispatch</span>
          <span className="font-mono text-[10px]">Open in external tab</span>
        </div>

      </div>
    </div>
  );
};
