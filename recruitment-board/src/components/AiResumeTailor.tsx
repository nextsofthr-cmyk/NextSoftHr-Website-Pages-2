import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Plus, 
  Zap, 
  RefreshCw, 
  Check, 
  Target
} from 'lucide-react';
import { Job, ParsedResumeProfile } from '../types';

interface AiResumeTailorProps {
  job: Job;
  candidateProfile?: ParsedResumeProfile | null;
  extractedSkills?: string[];
  onApplyBulletToCoverNote?: (bullet: string) => void;
  onToast?: (message: string) => void;
}

interface TailoredBullet {
  id: string;
  original: string;
  tailored: string;
  keywordsAdded: string[];
  impactMetric: string;
  relevanceReason: string;
}

export const AiResumeTailor: React.FC<AiResumeTailorProps> = ({
  job,
  candidateProfile,
  extractedSkills = [],
  onApplyBulletToCoverNote,
  onToast
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [appliedId, setAppliedId] = useState<string | null>(null);
  const [customBulletInput, setCustomBulletInput] = useState('');
  const [isGeneratingCustom, setIsGeneratingCustom] = useState(false);
  const [customTailoredResult, setCustomTailoredResult] = useState<{
    original: string;
    tailored: string;
    keywords: string[];
  } | null>(null);

  // Extract job required keywords
  const jobKeywords = [
    ...(job.skills || []),
    ...job.requirements.slice(0, 3).map(r => r.split(' ')[0] + ' ' + (r.split(' ')[1] || '')).filter(Boolean)
  ].filter((v, i, a) => a.indexOf(v) === i && v.length > 2);

  const candidateSkillsCombined = [
    ...(candidateProfile?.extractedSkills || []),
    ...extractedSkills
  ];

  // Matched vs missing keywords
  const matchedKeywords = jobKeywords.filter(k => 
    candidateSkillsCombined.some(c => c.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(c.toLowerCase()))
  );
  const missingKeywords = jobKeywords.filter(k => !matchedKeywords.includes(k));

  const alignmentScore = Math.min(
    95, 
    Math.max(45, Math.round((matchedKeywords.length / Math.max(1, jobKeywords.length)) * 100) + 15)
  );

  // Suggested refinements customized to this job title and company
  const defaultTailoredBullets: TailoredBullet[] = [
    {
      id: 'b1',
      original: 'Worked on backend services and APIs for company platforms.',
      tailored: `Architected and optimized microservices in production, decreasing API latency by 38% and meeting key ${job.skills?.[0] || 'high-availability'} benchmarks required for ${job.companyName}'s scale.`,
      keywordsAdded: [job.skills?.[0] || 'Backend Architecture', 'Latency Optimization', 'Production Scale'],
      impactMetric: '38% Latency Reduction',
      relevanceReason: `Directly matches ${job.title} requirement for scalable performance.`
    },
    {
      id: 'b2',
      original: 'Collaborated with team members to build user interfaces and features.',
      tailored: `Spearheaded cross-functional delivery with design and product teams, delivering modern UI workflows using ${job.skills?.[1] || 'modern web stacks'} and boosting candidate onboarding completion by 24%.`,
      keywordsAdded: [job.skills?.[1] || 'Full-Stack Delivery', 'Cross-Functional Leadership', 'UX Iteration'],
      impactMetric: '+24% Task Completion',
      relevanceReason: `Aligns with ${job.companyName}'s collaborative product lifecycle.`
    },
    {
      id: 'b3',
      original: 'Managed database queries and maintained code quality through tests.',
      tailored: `Instituted automated test coverage and streamlined query indexing across distributed environments, reducing production error rates by 45% and maintaining 99.9% uptime.`,
      keywordsAdded: ['Quality Engineering', 'Distributed Systems', 'Uptime SLA'],
      impactMetric: '45% Bug Reduction',
      relevanceReason: `Demonstrates the rigor and reliability sought in ${job.experienceLevel} candidates.`
    }
  ];

  const handleCopyBullet = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      if (onToast) onToast('📋 Tailored resume bullet copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleApplyToCover = (text: string, id: string) => {
    if (onApplyBulletToCoverNote) {
      onApplyBulletToCoverNote(text);
      setAppliedId(id);
      if (onToast) onToast('✨ Added tailored bullet to application note!');
      setTimeout(() => setAppliedId(null), 2000);
    }
  };

  const handleTailorCustomBullet = () => {
    if (!customBulletInput.trim()) return;
    setIsGeneratingCustom(true);

    setTimeout(() => {
      const topJobSkill = job.skills?.[0] || 'Modern Technologies';
      const secondarySkill = job.skills?.[1] || 'Performance Optimization';
      
      const refined = `Engineered and executed ${customBulletInput.replace(/^[•\-\*]\s*/, '').trim()}, integrating ${topJobSkill} and ${secondarySkill} to enhance operational efficiency and accelerate deliverables for ${job.companyName}.`;

      setCustomTailoredResult({
        original: customBulletInput.trim(),
        tailored: refined,
        keywords: [topJobSkill, secondarySkill, 'Measurable Impact']
      });
      setIsGeneratingCustom(false);
      if (onToast) onToast('✨ Custom bullet successfully tailored for this role!');
    }, 600);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-50/70 via-blue-50/50 to-white dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border border-blue-200 dark:border-blue-900/60 p-4 sm:p-5 space-y-4 shadow-xs">
      
      {/* Header & Alignment Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-blue-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-[#142B4A] dark:text-white text-xs sm:text-sm">
                AI Resume Tailor & Keyword Alignment
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Tailored for {job.companyName}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Refines generic bullets into measurable, high-impact statements matching this role's exact keywords.
            </p>
          </div>
        </div>

        {/* Alignment Gauge */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-blue-200/80 dark:border-slate-700 shrink-0 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Role Match</span>
            <span className="text-xs font-black text-blue-600 dark:text-blue-400">{alignmentScore}%</span>
          </div>
          <div className="w-12 h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500" 
              style={{ width: `${alignmentScore}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Keywords Breakdown */}
      <div className="space-y-2 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Target Role Keywords Identified ({jobKeywords.length}):</span>
          </span>
          <span className="text-slate-400 text-[10px]">
            {matchedKeywords.length} aligned · {missingKeywords.length} suggested to emphasize
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {jobKeywords.slice(0, 8).map((kw) => {
            const isMatched = matchedKeywords.includes(kw);
            return (
              <span
                key={kw}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 border ${
                  isMatched
                    ? 'bg-lime-50 text-lime-800 dark:bg-lime-950/60 dark:text-lime-300 border-lime-200 dark:border-lime-800'
                    : 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                }`}
              >
                {isMatched ? (
                  <CheckCircle2 className="w-3 h-3 text-lime-600 dark:text-lime-400 shrink-0" />
                ) : (
                  <Plus className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                )}
                <span>{kw}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Suggested Bullet-Point Refinements */}
      <div className="space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Suggested Bullet-Point Refinements
        </span>

        <div className="space-y-3">
          {defaultTailoredBullets.map((bullet) => (
            <div 
              key={bullet.id}
              className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 space-y-2.5 text-xs shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Original (Generic):
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/60">
                  Impact: {bullet.impactMetric}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 italic pl-2 border-l-2 border-slate-200 dark:border-slate-700 text-[11px]">
                "{bullet.original}"
              </p>

              <div className="pt-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                  <span>AI Refinement (Tailored for {job.title}):</span>
                </div>
                <p className="text-slate-900 dark:text-slate-100 font-medium pl-2 border-l-2 border-blue-500 dark:border-blue-400 leading-relaxed text-xs">
                  {bullet.tailored}
                </p>
              </div>

              {/* Keywords & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-750">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-[10px] text-slate-400 font-medium">Keywords inserted:</span>
                  {bullet.keywordsAdded.map((kw, i) => (
                    <span 
                      key={i} 
                      className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyBullet(bullet.tailored, bullet.id)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                    title="Copy tailored bullet"
                  >
                    {copiedId === bullet.id ? (
                      <>
                        <Check className="w-3 h-3 text-lime-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {onApplyBulletToCoverNote && (
                    <button
                      type="button"
                      onClick={() => handleApplyToCover(bullet.tailored, bullet.id)}
                      className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                      title="Insert into cover note"
                    >
                      {appliedId === bullet.id ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Applied!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Add to Note</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Bullet Refiner */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
        <label className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Tailor Your Own Resume Bullet for this Job:</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customBulletInput}
            onChange={(e) => setCustomBulletInput(e.target.value)}
            placeholder="e.g. Led frontend development and resolved customer bugs..."
            className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-650 rounded-lg text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleTailorCustomBullet();
              }
            }}
          />
          <button
            type="button"
            onClick={handleTailorCustomBullet}
            disabled={isGeneratingCustom || !customBulletInput.trim()}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            {isGeneratingCustom ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>Tailor</span>
          </button>
        </div>

        {customTailoredResult && (
          <div className="mt-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 space-y-2 animate-in fade-in duration-150">
            <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block">
              AI Tailored Result:
            </span>
            <p className="text-xs font-medium text-slate-900 dark:text-white leading-relaxed">
              {customTailoredResult.tailored}
            </p>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <span>Integrated keywords: {customTailoredResult.keywords.join(', ')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleCopyBullet(customTailoredResult.tailored, 'custom')}
                  className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[11px] font-semibold border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  {copiedId === 'custom' ? 'Copied' : 'Copy'}
                </button>
                {onApplyBulletToCoverNote && (
                  <button
                    type="button"
                    onClick={() => handleApplyToCover(customTailoredResult.tailored, 'custom')}
                    className="px-2 py-0.5 rounded bg-blue-600 text-white text-[11px] font-bold cursor-pointer"
                  >
                    {appliedId === 'custom' ? 'Applied!' : 'Add to Note'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
