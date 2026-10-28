import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  Award, 
  Layers, 
  ChevronRight, 
  TrendingUp, 
  BookOpen, 
  Briefcase,
  Target
} from 'lucide-react';
import { ParsedResumeProfile, Job } from '../types';

interface ResumeScoreCardProps {
  parsedProfile: ParsedResumeProfile | null;
  targetJob?: Job | null;
  onApplySkillSuggestion?: (skill: string) => void;
}

interface IndustryRequirement {
  name: string;
  coreSkills: string[];
  recommendedCerts: string[];
  impactVerbs: string[];
  sampleTitle: string;
}

const INDUSTRY_REQUIREMENTS: Record<string, IndustryRequirement> = {
  'Human Resources': {
    name: 'Human Resources & People Operations',
    coreSkills: [
      'Strategic Workforce Planning',
      'CIPM Certified Member',
      'Nigerian Labour Act Compliance',
      'Performance Management',
      'Executive Talent Acquisition',
      'Employee Relations Investigations',
      'HRMS & Payroll Integration',
      'Compensation & Benefits Design',
      'Succession Architecture',
      'Cross-Cultural Team Leadership'
    ],
    recommendedCerts: ['CIPM Chartered Member', 'SHRM-SCP', 'SPHRi Human Resource Certification'],
    impactVerbs: ['Optimized', 'Negotiated', 'Spearheaded', 'Restructured', 'Decreased turnover by'],
    sampleTitle: 'Senior HR Business Partner'
  },
  'Information Technology': {
    name: 'Information Technology & Software Engineering',
    coreSkills: [
      'TypeScript',
      'Node.js',
      'Go',
      'PostgreSQL',
      'Docker & Kubernetes',
      'Distributed Reconciliation',
      'Kafka / RabbitMQ',
      'Microservices Architecture',
      'CI/CD Pipelines',
      'Payment Gateways (ISO 8583)',
      'System Architecture',
      'Redis'
    ],
    recommendedCerts: ['AWS Certified Solutions Architect', 'CKA Kubernetes Administrator', 'Google Cloud Professional'],
    impactVerbs: ['Engineered', 'Scaled', 'Architected', 'Reduced latency by', 'Refactored'],
    sampleTitle: 'Lead Software Engineer'
  },
  'Banking & Finance': {
    name: 'Banking, Fintech & Financial Management',
    coreSkills: [
      'Financial Modeling',
      'Regulatory Compliance (CBN)',
      'Liquidity & Risk Management',
      'IFRS Reporting Standards',
      'Treasury Management',
      'Internal Audit & Controls',
      'P&L Accountability',
      'Fintech Settlement Engines'
    ],
    recommendedCerts: ['ICAN Chartered Accountant', 'ACCA Certification', 'CFA Chartered Financial Analyst'],
    impactVerbs: ['Audited', 'Monitored', 'Forecasted', 'Maximized return by', 'Reconciled'],
    sampleTitle: 'Head of Financial Planning & Treasury'
  },
  'Sales & Marketing': {
    name: 'Commercial Growth, Sales & Marketing',
    coreSkills: [
      'Customer Acquisition Cost (CAC) Optimization',
      'Multi-Channel Performance Marketing',
      'B2B Enterprise Deal Closing',
      'Go-To-Market (GTM) Strategy',
      'HubSpot / Salesforce CRM',
      'Funnel Analytics (Amplitude/Mixpanel)',
      'Key Account Management'
    ],
    recommendedCerts: ['HubSpot Inbound Sales Certified', 'Google Ads & Analytics Certified', 'Reforge Growth Series'],
    impactVerbs: ['Accelerated', 'Grew ARR by', 'Closed', 'Generated', 'Expanded market share by'],
    sampleTitle: 'Head of Commercial Growth'
  }
};

export const ResumeScoreCard: React.FC<ResumeScoreCardProps> = ({
  parsedProfile,
  targetJob,
  onApplySkillSuggestion
}) => {
  // Target industry selection
  const [selectedIndustry, setSelectedIndustry] = useState<string>(() => {
    if (targetJob?.industry && INDUSTRY_REQUIREMENTS[targetJob.industry]) {
      return targetJob.industry;
    }
    if (parsedProfile?.currentRole?.toLowerCase().includes('hr') || parsedProfile?.currentRole?.toLowerCase().includes('people')) {
      return 'Human Resources';
    }
    if (parsedProfile?.currentRole?.toLowerCase().includes('engineer') || parsedProfile?.currentRole?.toLowerCase().includes('software')) {
      return 'Information Technology';
    }
    return 'Human Resources';
  });

  const industrySpec = INDUSTRY_REQUIREMENTS[selectedIndustry] || INDUSTRY_REQUIREMENTS['Human Resources'];

  // Score Evaluation Logic
  const scoreData = useMemo(() => {
    if (!parsedProfile) {
      return {
        overallScore: 0,
        subscores: {
          skillsMatch: 0,
          experienceTenure: 0,
          credentialsCerts: 0,
          impactLanguage: 0
        },
        matchedSkills: [],
        missingSkills: industrySpec.coreSkills,
        missingCerts: industrySpec.recommendedCerts,
        suggestions: ['Upload or parse a candidate resume to evaluate score against industry standards.']
      };
    }

    const candidateSkillsLower = (parsedProfile.extractedSkills || []).map(s => s.toLowerCase());
    const matchedSkills = industrySpec.coreSkills.filter(reqSkill => 
      candidateSkillsLower.some(candSkill => 
        candSkill.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(candSkill)
      )
    );

    const missingSkills = industrySpec.coreSkills.filter(reqSkill => 
      !matchedSkills.includes(reqSkill)
    );

    // 1. Skills match score (max 40)
    const skillsRatio = industrySpec.coreSkills.length > 0 ? matchedSkills.length / industrySpec.coreSkills.length : 0;
    const skillsScore = Math.min(40, Math.round(skillsRatio * 40));

    // 2. Experience tenure score (max 25)
    let expScore = 15;
    const expText = parsedProfile.yearsOfExperience || '';
    if (expText.includes('7+') || expText.includes('8') || expText.includes('10')) {
      expScore = 25;
    } else if (expText.includes('5') || expText.includes('6')) {
      expScore = 22;
    } else if (expText.includes('3') || expText.includes('4')) {
      expScore = 18;
    }

    // 3. Credentials & Verified Certifications (max 20)
    const allCerts = [
      ...(parsedProfile.certifications || []),
      ...(parsedProfile.externalCertifications || []).map(c => c.name),
      ...(parsedProfile.verifiedSkills || []).map(v => v.certName || '')
    ].filter(Boolean);

    const certOverlap = industrySpec.recommendedCerts.filter(rc => 
      allCerts.some(c => c.toLowerCase().includes(rc.toLowerCase()) || rc.toLowerCase().includes(c.toLowerCase()))
    );

    let certScore = 10;
    if (certOverlap.length >= 2) certScore = 20;
    else if (certOverlap.length === 1) certScore = 16;
    else if (allCerts.length > 0) certScore = 12;

    const missingCerts = industrySpec.recommendedCerts.filter(rc => 
      !allCerts.some(c => c.toLowerCase().includes(rc.toLowerCase()))
    );

    // 4. Impact metrics & strong action verbs (max 15)
    const summaryText = (parsedProfile.summary || '') + ' ' + (parsedProfile.education || '');
    const hasNumbers = /\d+%|\d+\+|\d+M|\d+k|\$\d+|₦\d+/i.test(summaryText);
    const verbMatches = industrySpec.impactVerbs.filter(v => summaryText.toLowerCase().includes(v.toLowerCase()));
    
    let impactScore = 8;
    if (hasNumbers && verbMatches.length >= 2) impactScore = 15;
    else if (hasNumbers || verbMatches.length >= 1) impactScore = 12;

    const overallScore = Math.min(99, skillsScore + expScore + certScore + impactScore);

    // Build specific suggestions
    const suggestions: string[] = [];
    if (missingSkills.length > 0) {
      suggestions.push(`Acquire or highlight key competency tokens: ${missingSkills.slice(0, 3).join(', ')}.`);
    }
    if (missingCerts.length > 0) {
      suggestions.push(`Consider obtaining or linking an external credential such as ${missingCerts[0]} to verify domain rigor.`);
    }
    if (!hasNumbers) {
      suggestions.push('Add quantifiable business metrics (e.g. "% reduction in processing time", "₦ saved", "team size managed") into your summary.');
    }
    if (skillsRatio < 0.6) {
      suggestions.push(`Align resume keywords more closely to ${industrySpec.sampleTitle} job descriptions for automated ATS parsing.`);
    }

    return {
      overallScore,
      subscores: {
        skillsMatch: skillsScore,
        experienceTenure: expScore,
        credentialsCerts: certScore,
        impactLanguage: impactScore
      },
      matchedSkills,
      missingSkills,
      missingCerts,
      suggestions
    };
  }, [parsedProfile, industrySpec]);

  const getScoreColor = (score: number) => {
    if (score >= 85) return { bg: 'bg-lime-500', text: 'text-lime-700 dark:text-lime-400', badge: 'bg-lime-100 text-lime-900 border-lime-300' };
    if (score >= 70) return { bg: 'bg-blue-500', text: 'text-blue-700 dark:text-blue-400', badge: 'bg-blue-100 text-blue-900 border-blue-300' };
    return { bg: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-400', badge: 'bg-amber-100 text-amber-900 border-amber-300' };
  };

  const scoreTheme = getScoreColor(scoreData.overallScore);

  return (
    <div className="space-y-6">
      {/* Top Banner: Industry Target Selector & Overall Score */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Overall Gauge */}
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            {/* Circular Ring using SVG */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-lime-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${scoreData.overallScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-[#142B4A] dark:text-white tabular-nums">
                {scoreData.overallScore}
              </span>
              <span className="text-[9px] uppercase font-bold text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-[#142B4A] dark:text-white">
                Resume ATS & Benchmark Score
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${scoreTheme.badge}`}>
                {scoreData.overallScore >= 85 ? 'Top 10% ATS Match' : scoreData.overallScore >= 70 ? 'Competitive' : 'Needs Optimization'}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              Evaluated against <strong>{industrySpec.name}</strong> criteria, keyword taxonomies, executive certifications, and measurable outcomes.
            </p>
          </div>
        </div>

        {/* Right: Target Industry Dropdown */}
        <div className="w-full md:w-auto bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-1.5 shrink-0">
          <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">
            Evaluate Against Industry:
          </label>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full md:w-56 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 cursor-pointer focus:ring-2 focus:ring-lime-500/30"
          >
            {Object.keys(INDUSTRY_REQUIREMENTS).map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Subscore Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Industry Skills Match</span>
            <span className="font-extrabold text-lime-600 dark:text-lime-400 tabular-nums">{scoreData.subscores.skillsMatch}/40</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-lime-500 h-full rounded-full" style={{ width: `${(scoreData.subscores.skillsMatch / 40) * 100}%` }} />
          </div>
          <span className="text-[10px] text-slate-500 block">
            {scoreData.matchedSkills.length} of {industrySpec.coreSkills.length} key skills extracted
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Tenure & Seniority</span>
            <span className="font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">{scoreData.subscores.experienceTenure}/25</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(scoreData.subscores.experienceTenure / 25) * 100}%` }} />
          </div>
          <span className="text-[10px] text-slate-500 block">
            {parsedProfile?.yearsOfExperience || 'N/A'} track record
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Certifications & Badges</span>
            <span className="font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">{scoreData.subscores.credentialsCerts}/20</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(scoreData.subscores.credentialsCerts / 20) * 100}%` }} />
          </div>
          <span className="text-[10px] text-slate-500 block">
            Verified external and professional credentials
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Impact & Metrics</span>
            <span className="font-extrabold text-lime-600 dark:text-lime-400 tabular-nums">{scoreData.subscores.impactLanguage}/15</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-lime-500 h-full rounded-full" style={{ width: `${(scoreData.subscores.impactLanguage / 15) * 100}%` }} />
          </div>
          <span className="text-[10px] text-slate-500 block">
            Quantified achievements & action verbs
          </span>
        </div>
      </div>

      {/* Two-Column Details: Matched vs Missing Skills & Actionable Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Left Column: Skills Breakdown */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-lime-400" />
              <span>Matched Core Competencies ({scoreData.matchedSkills.length})</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {scoreData.matchedSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-lime-50 dark:bg-lime-950/70 text-lime-800 dark:text-lime-300 border border-lime-200 dark:border-lime-800/80 flex items-center gap-1"
              >
                <span>✓</span>
                <span>{skill}</span>
              </span>
            ))}
            {scoreData.matchedSkills.length === 0 && (
              <span className="text-xs text-slate-400">No overlapping industry skills detected yet.</span>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5 mb-2">
              <Target className="w-4 h-4 text-amber-500" />
              <span>Recommended Industry Skills to Add</span>
            </span>

            <div className="flex flex-wrap gap-1.5">
              {scoreData.missingSkills.map((skill, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onApplySkillSuggestion && onApplySkillSuggestion(skill)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800 hover:bg-lime-50 text-slate-700 dark:text-slate-300 hover:text-lime-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer group"
                  title="Click to add to your profile skills"
                >
                  <span>+ {skill}</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-lime-600 font-bold">Add</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Concrete Suggestions for Improvement */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-lime-600 dark:text-lime-400" />
              <span>Personalized Suggestions for Improvement</span>
            </span>
            <span className="text-[10px] text-slate-400">High Impact</span>
          </div>

          <div className="space-y-2.5">
            {scoreData.suggestions.map((suggestion, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1 leading-relaxed">
                  {suggestion}
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Certification Path */}
          <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 space-y-1">
            <span className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Highest Valued Certification in {selectedIndustry}:</span>
            </span>
            <p className="text-[11px] text-blue-800 dark:text-blue-300">
              {industrySpec.recommendedCerts[0]} — Adds up to +18% ATS ranking and salary leverage during interview stages.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
