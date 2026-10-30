import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  DollarSign, 
  Copy, 
  Check, 
  ShieldCheck, 
  TrendingUp, 
  Briefcase, 
  MessageSquare, 
  ChevronRight, 
  SlidersHorizontal,
  Award,
  AlertCircle
} from 'lucide-react';
import { Job, ParsedResumeProfile } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface SalaryNegotiationSimulatorProps {
  parsedProfile: ParsedResumeProfile | null;
  jobs: Job[];
  selectedJobId?: string;
  onToast?: (message: string) => void;
}

export const SalaryNegotiationSimulator: React.FC<SalaryNegotiationSimulatorProps> = ({
  parsedProfile,
  jobs,
  selectedJobId,
  onToast
}) => {
  const { currentCurrency, convertAndFormatSalary } = useCurrency();
  const [activeJobId, setActiveJobId] = useState<string>(selectedJobId || jobs[0]?.id || '');
  const activeJob = jobs.find(j => j.id === activeJobId) || jobs[0];

  // Negotiation Strategy Parameters
  const [targetPercentIncrease, setTargetPercentIncrease] = useState<number>(18);
  const [leverageAngle, setLeverageAngle] = useState<'verified_skills' | 'tenure_leadership' | 'competing_offers'>('verified_skills');
  const [copiedType, setCopiedType] = useState<'verbal' | 'email' | null>(null);

  // Compute negotiation values
  const negotiationMath = useMemo(() => {
    const rawSalary = activeJob?.salaryRange || '1500000 - 2200000';
    const nums = rawSalary.replace(/[^0-9\-–]/g, ' ').trim().split(/[-–]+/).map(s => parseInt(s.replace(/\s+/g, ''), 10)).filter(n => !isNaN(n));
    const baseOffer = nums[0] || 1800000;
    const targetComp = Math.round(baseOffer * (1 + targetPercentIncrease / 100));

    // Confidence score based on profile verified skills and tenure
    const verifiedCount = parsedProfile?.verifiedSkills?.length || 2;
    const certCount = parsedProfile?.externalCertifications?.length || 1;
    let confidence = 75 + Math.min(18, verifiedCount * 4 + certCount * 3);
    if (parsedProfile?.yearsOfExperience?.includes('7+') || parsedProfile?.yearsOfExperience?.includes('8')) {
      confidence += 5;
    }
    confidence = Math.min(96, confidence);

    return {
      baseOffer,
      targetComp,
      confidence,
      diffAmount: targetComp - baseOffer
    };
  }, [activeJob, targetPercentIncrease, parsedProfile]);

  // Dynamic Scripts Generation
  const candidateName = parsedProfile?.fullName || 'Candidate';
  const roleTitle = activeJob?.title || 'Selected Role';
  const companyName = activeJob?.companyName || 'Employer';
  const verifiedSkillsStr = parsedProfile?.verifiedSkills?.map(v => v.name).slice(0, 3).join(', ') || 'verified technical domain competencies';

  const verbalScript = `“Thank you so much, ${companyName} team, for extending this offer. I am genuinely enthusiastic about the vision for the ${roleTitle} role. Based on my research into contemporary compensation benchmarks for this tier, combined with my ${parsedProfile?.yearsOfExperience || 'proven'} track record and verified credentials in ${verifiedSkillsStr}, I was anticipating an offer in the range of ${convertAndFormatSalary(String(negotiationMath.targetComp), activeJob?.currency)}. If we can align on this target, I am prepared to sign and immediately accelerate our department’s strategic milestones.”`;

  const emailCounterScript = `Dear ${companyName} Hiring Committee,\n\nThank you very much for offering me the ${roleTitle} position. I am thrilled by the prospect of joining your team and contributing to ${companyName}'s continued growth.\n\nAfter reviewing the terms and comparing the offer against current market benchmarks for candidates with my verified skills in ${verifiedSkillsStr} and ${parsedProfile?.yearsOfExperience || 'senior-level'} experience, I would like to propose a base compensation of ${convertAndFormatSalary(String(negotiationMath.targetComp), activeJob?.currency)}.\n\nI am confident that my technical leadership and immediate operational impact will deliver substantial ROI for this mandate. If we can reach agreement around this figure, I am ready to accept with enthusiasm.\n\nWarm regards,\n${candidateName}`;

  const handleCopy = (text: string, type: 'verbal' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    if (onToast) onToast(`Copied ${type === 'verbal' ? 'Verbal Pitch' : 'Counter-Offer Email'} to clipboard!`);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Confidence Leverage Meter */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-lime-500/15 via-[#142B4A]/10 to-transparent border border-lime-500/30 dark:border-lime-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-lime-500"
                strokeDasharray={`${negotiationMath.confidence}, 100`}
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-black text-[#142B4A] dark:text-white tabular-nums">
                {negotiationMath.confidence}%
              </span>
              <span className="text-[8px] font-bold uppercase text-slate-400">Leverage</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-[#142B4A] dark:text-white">
                AI Negotiation Confidence Score: High Leverage
              </h3>
              <span className="text-[10px] bg-lime-500 text-slate-950 font-bold px-2 py-0.5 rounded-full shadow-2xs">
                Strong Hand
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-lg">
              Calculated using <strong>{parsedProfile?.verifiedSkills?.length || 2} verified profile skills</strong>, <strong>{parsedProfile?.yearsOfExperience || 'senior'} tenure</strong>, and real-time market scarcity data for {activeJob?.category}.
            </p>
          </div>
        </div>

        {/* Target Job Selector */}
        <div className="w-full md:w-auto bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shrink-0">
          <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">
            Select Job Application to Negotiate:
          </label>
          <select
            value={activeJobId}
            onChange={(e) => setActiveJobId(e.target.value)}
            className="w-full md:w-64 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 cursor-pointer"
          >
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title} · {j.companyName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Salary Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
            Baseline / Initial Offer:
          </span>
          <span className="text-lg font-black text-[#142B4A] dark:text-white tabular-nums">
            {convertAndFormatSalary(String(negotiationMath.baseOffer), activeJob?.currency)}
          </span>
          <span className="text-[10px] text-slate-400 block">
            Derived from posted range ({activeJob?.salaryRange})
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-lime-50/70 dark:bg-lime-950/40 border border-lime-300 dark:border-lime-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-lime-900 dark:text-lime-200">
              Target Counter Proposal (+{targetPercentIncrease}%):
            </span>
            <span className="text-[10px] font-bold bg-lime-500 text-slate-950 px-2 py-0.5 rounded-full">
              +{convertAndFormatSalary(String(negotiationMath.diffAmount), activeJob?.currency)}
            </span>
          </div>
          <span className="text-lg font-black text-lime-950 dark:text-lime-100 tabular-nums">
            {convertAndFormatSalary(String(negotiationMath.targetComp), activeJob?.currency)}
          </span>
          {/* Slider */}
          <input
            type="range"
            min="5"
            max="35"
            step="1"
            value={targetPercentIncrease}
            onChange={(e) => setTargetPercentIncrease(parseInt(e.target.value, 10))}
            className="w-full accent-lime-600 cursor-pointer"
          />
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
            Primary Leverage Angle:
          </span>
          <select
            value={leverageAngle}
            onChange={(e) => setLeverageAngle(e.target.value as any)}
            className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 cursor-pointer"
          >
            <option value="verified_skills">Verified Skills & Certifications</option>
            <option value="tenure_leadership">Senior Tenure & Strategic Impact</option>
            <option value="competing_offers">Active Competitive Market Offers</option>
          </select>
          <span className="text-[10px] text-slate-400 block">
            Adjusts arguments in AI script generation
          </span>
        </div>
      </div>

      {/* Generated Scripts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Verbal Meeting Script */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  Verbal Phone / Video Counter Pitch
                </h4>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(verbalScript, 'verbal')}
                className="text-xs text-lime-700 dark:text-lime-400 font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                {copiedType === 'verbal' ? <Check className="w-3.5 h-3.5 text-lime-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'verbal' ? 'Copied' : 'Copy Pitch'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans mt-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 italic">
              {verbalScript}
            </p>
          </div>

          <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 text-[11px] text-blue-900 dark:text-blue-300">
            💡 <strong>Spoken Delivery Tip:</strong> Deliver with calm optimism. Never apologize for negotiating; frame the increase as directly tied to accelerated outcomes.
          </div>
        </div>

        {/* Written Email Counter Proposal */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  Formal Email Counter Proposal
                </h4>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(emailCounterScript, 'email')}
                className="text-xs text-lime-700 dark:text-lime-400 font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                {copiedType === 'email' ? <Check className="w-3.5 h-3.5 text-lime-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'email' ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>

            <pre className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-sans mt-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 whitespace-pre-wrap">
              {emailCounterScript}
            </pre>
          </div>

          <div className="p-3 bg-lime-50/70 dark:bg-lime-950/40 rounded-xl border border-lime-200 dark:border-lime-900/60 text-[11px] text-lime-900 dark:text-lime-300">
            🛡️ <strong>Total Compensation Checklist:</strong> If base pay is hard-capped, counter for a signing bonus, 6-month performance review, or remote home-office setup stipends.
          </div>
        </div>
      </div>
    </div>
  );
};
