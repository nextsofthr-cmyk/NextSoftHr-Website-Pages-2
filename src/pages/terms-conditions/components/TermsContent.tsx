import React, { useState } from 'react';
import {
  Link as LinkIcon,
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Info,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Lock,
  FileText,
  Sliders,
  Sparkles
} from 'lucide-react';
import { TermSection } from '../data/termsData';
import { useLanguage } from '../i18n/LanguageContext';
import { DefinitionsCard } from './DefinitionsCard';
import { ModulesGrid } from './ModulesGrid';
import { FreeTrialConfigCard } from './FreeTrialConfigCard';

interface TermsContentProps {
  sections: TermSection[];
  searchQuery: string;
  summaryMode: boolean;
  counselMode: boolean;
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
}

export const TermsContent: React.FC<TermsContentProps> = ({
  sections,
  searchQuery,
  summaryMode,
  counselMode,
  onOpenPrivacy,
  onOpenContact
}) => {
  const { t } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to render text with counsel highlights if counselMode is active
  const renderHighlightedText = (text: string) => {
    if (!counselMode) {
      return text;
    }

    // Match placeholder patterns like [Insert ...] or [Pending ...] or [Default: ...]
    const regex = /(\[[^\]]+\])/g;
    const parts = text.split(regex);

    return parts.map((part, i) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <mark
            key={i}
            className="bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[11px] px-1.5 py-0.5 rounded font-semibold inline-block mx-0.5"
            title="Jurisdiction or company variable requiring qualified legal counsel review before final execution."
          >
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-12">
      {sections.map((sec) => {
        const isMatch =
          searchQuery &&
          (sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sec.paragraphs.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
            sec.summary.toLowerCase().includes(searchQuery.toLowerCase()));

        return (
          <section
            key={sec.id}
            id={sec.id}
            className={`scroll-mt-28 bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 p-6 sm:p-8 ${
              isMatch
                ? 'border-blue-400 dark:border-blue-500 ring-2 ring-blue-100 dark:ring-blue-950 shadow-md'
                : 'border-slate-200/90 dark:border-slate-800/90 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {/* Section Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                    {t.sectionLabel} {sec.sectionNumber}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{sec.category}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {sec.title}
                </h2>
              </div>

              {/* Action buttons (Copy link) */}
              <div className="flex items-center gap-1.5 shrink-0 pt-1 no-print">
                <button
                  type="button"
                  onClick={() => handleCopyLink(sec.id)}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded-md transition cursor-pointer"
                  title="Copy permanent link to this clause"
                  aria-label={`Copy link to Section ${sec.sectionNumber} ${sec.title}`}
                >
                  {copiedId === sec.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#65a30d] dark:text-[#84cc16]" />
                      <span className="text-[11px] text-[#65a30d] dark:text-[#84cc16] font-medium">{t.copiedAction}</span>
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span className="text-[11px]">{t.linkAction}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Counsel Review Tag if present */}
            {sec.counselFlag && counselMode && (
              <div className="mt-3.5 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="font-semibold">{sec.counselFlag}</span>
              </div>
            )}

            {/* Plain-English Executive Summary Callout */}
            {summaryMode && (
              <div className="mt-4 p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 text-xs text-blue-950 dark:text-blue-200 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-blue-900 dark:text-blue-300 mb-0.5">{t.executiveSummaryHeading}</div>
                  <div className="leading-relaxed text-blue-900/90 dark:text-blue-200/90">{sec.summary}</div>
                </div>
              </div>
            )}

            {/* Main Paragraphs */}
            <div className="mt-5 space-y-4 text-sm sm:text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">
              {sec.paragraphs.map((para, idx) => (
                <p key={idx}>{renderHighlightedText(para)}</p>
              ))}
            </div>

            {/* Bullet Points */}
            {sec.bulletPoints && sec.bulletPoints.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {sec.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
                    <span className="leading-relaxed">{renderHighlightedText(point)}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Highlight Box if present */}
            {sec.highlightBox && (
              <div
                className={`mt-6 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs leading-relaxed ${
                  sec.highlightBox.type === 'warning'
                    ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-amber-950 dark:text-amber-200'
                    : sec.highlightBox.type === 'policy'
                    ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60 text-blue-950 dark:text-blue-200'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {sec.highlightBox.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className="block font-bold mb-0.5">{sec.highlightBox.title}</strong>
                    <span>{sec.highlightBox.text}</span>
                  </div>
                </div>

                {sec.highlightBox.actionLabel && (
                  <button
                    type="button"
                    onClick={() => {
                      if (sec.highlightBox?.actionType === 'privacy-modal') {
                        onOpenPrivacy();
                      } else {
                        onOpenContact();
                      }
                    }}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition shadow-2xs"
                  >
                    <span>{sec.highlightBox.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Embedded Definitions Card for Section 3 */}
            {sec.definitions && <DefinitionsCard definitions={sec.definitions} />}

            {/* Embedded Platform Modules Grid for Section 7 */}
            {sec.modules && <ModulesGrid modules={sec.modules} />}

            {/* Embedded Free Trial Config Card for Section 18 */}
            {sec.id === 'free-trials' && <FreeTrialConfigCard />}

            {/* Special Action for Privacy Section 22 */}
            {sec.id === 'privacy-data-protection' && (
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  {t.privacyNoticeText}
                </span>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-xs cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.readPrivacyPolicy}</span>
                </button>
              </div>
            )}

            {/* Special Action for Contact Section 37 */}
            {sec.id === 'contact-information' && (
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  {t.contactLegalNoticeText}
                </span>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-slate-900 bg-[#84cc16] hover:bg-[#74c62b] transition shadow-xs cursor-pointer"
                >
                  <span>{t.submitLegalInquiry}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};
