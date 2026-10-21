import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  UserPlus, 
  Star, 
  Briefcase, 
  Mail, 
  Phone, 
  FileText, 
  ChevronRight,
  Send,
  HelpCircle,
  BrainCircuit,
  Filter
} from 'lucide-react';
import { SAMPLE_CANDIDATES } from '../../data/mockData';
import { JobCandidate, NavigationPage } from '../../types';
import { SolutionNavigationFooter } from '../layout/SolutionNavigationFooter';

interface RecruitmentOutsourcingProps {
  onOpenLeadModal: (service?: string) => void;
  onNavigate?: (page: NavigationPage) => void;
  onBack?: () => void;
}

export const RecruitmentOutsourcing: React.FC<RecruitmentOutsourcingProps> = ({ 
  onOpenLeadModal,
  onNavigate,
  onBack
}) => {
  const [candidates, setCandidates] = useState<JobCandidate[]>(SAMPLE_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<JobCandidate>(SAMPLE_CANDIDATES[0]);
  
  // AI assistant tools
  const [aiTool, setAiTool] = useState<'jd' | 'summary' | 'questions' | 'email'>('questions');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const stages: JobCandidate['stage'][] = [
    'Applied', 
    'Screening', 
    'Shortlisted', 
    'Interview', 
    'Offer', 
    'Hired', 
    'Onboarding'
  ];

  const handleMoveCandidate = (candidateId: string, nextStage: JobCandidate['stage']) => {
    setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, stage: nextStage } : c));
    if (selectedCandidate.id === candidateId) {
      setSelectedCandidate(prev => ({ ...prev, stage: nextStage }));
    }
  };

  const runAiAssistant = (toolType: 'jd' | 'summary' | 'questions' | 'email') => {
    setAiTool(toolType);
    setIsGenerating(true);

    setTimeout(() => {
      if (toolType === 'questions') {
        setGeneratedContent(`### NextSofthr AI Interview Question Set for: ${selectedCandidate.jobTitle}\n\n1. **Technical Depth**: "Walk us through a scenario where a core statutory tax formula or workforce process failed in production. How did you diagnose and remediate?"\n2. **Stakeholder Alignment**: "How do you navigate pushback from department heads when introducing stricter timesheet approval deadlines?"\n3. **Integrity & Compliance**: "Tell us about a time you identified an inadvertent overpayment or policy deviation. What was your immediate escalation path?"\n\n*Reminder: AI questions assist human interviewers to conduct rigorous, unbiased evaluations.*`);
      } else if (toolType === 'summary') {
        setGeneratedContent(`### AI Candidate Profile Summary: ${selectedCandidate.name}\n\n- **Target Role**: ${selectedCandidate.jobTitle}\n- **Experience**: ${selectedCandidate.experienceYears} Years in High-Growth Environments\n- **Core Competencies**: ${selectedCandidate.keySkills.join(', ')}\n- **Evaluation Rating**: ${selectedCandidate.rating}/5.0\n- **Recommendation**: Strong candidate for final panel interview. Demonstrates demonstrated mastery of regional regulatory frameworks.`);
      } else if (toolType === 'jd') {
        setGeneratedContent(`### Generated Role Requisition: ${selectedCandidate.jobTitle}\n\n**About the Role**: Lead strategic workforce delivery across multi-entity operations in West and East Africa.\n**Key Responsibilities**:\n- Oversee end-to-end statutory payroll calculations and compliance filings\n- Coordinate team member lifecycle from digital onboarding to retention reviews\n- Partner with executive leadership to forecast headcount and optimize labor budgets.\n**Requirements**: Bachelor's degree, 5+ years relevant experience, proficiency in cloud HRIS platforms.`);
      } else {
        setGeneratedContent(`### Draft Candidate Communication\n\n**Subject**: NextSofthr Recruitment: Invitation to Final Panel Interview - ${selectedCandidate.jobTitle}\n\nDear ${selectedCandidate.name},\n\nThank you for taking the time to speak with our talent specialist. Following your strong preliminary evaluation, we are pleased to invite you to the final executive panel interview scheduled for this Thursday.\n\nPlease confirm your preferred time slot via your candidate scheduling portal.\n\nWarm regards,\nNextSofthr Talent Operations Team`);
      }
      setIsGenerating(false);
    }, 600);
  };

  const recruitmentFeatures = [
    'Workforce planning & headcount modeling',
    'AI-assisted job description creation',
    'Multi-channel job publishing across Africa',
    'Proactive executive candidate sourcing',
    'Application management & ATS pipeline tracking',
    'Structured candidate screening & scoring',
    'Automated interview scheduling & calendar sync',
    'Candidate communication & status updates',
    'Multi-tier hiring approvals workflow',
    'Offer letter management & compensation benchmarking',
    'Seamless transition to digital onboarding',
    'Recruitment analytics & time-to-hire reporting'
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recruitment & Talent Outsourcing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Find, Hire and Onboard <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400">
              the Right People.”
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            From requisition drafting to final offer letters, NextSofthr acts as your dedicated talent acquisition engine. Combining human headhunters with intelligent ATS workflows and AI assistance.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenLeadModal('Recruitment Outsourcing')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Outsource Your Talent Pipeline</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Applicant Tracking Dashboard (ATS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Interactive ATS Pipeline</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Live Candidate Pipeline Experience
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Experience our 7-stage candidate progression pipeline: Applied → Screening → Shortlisted → Interview → Offer → Hired → Onboarding.
          </p>
        </div>

        {/* 7-Stage Pipeline Board */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 space-y-6">
          {/* Pipeline Stage Bar */}
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center min-w-[700px] gap-2">
              {stages.map((stage, idx) => {
                const count = candidates.filter(c => c.stage === stage).length;
                return (
                  <div 
                    key={stage}
                    className="flex-1 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center"
                  >
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Step 0{idx + 1}</div>
                    <div className="text-xs font-bold text-slate-900 truncate">{stage}</div>
                    <div className="text-xs font-mono font-bold text-blue-700 mt-0.5">{count} active</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Candidate Cards and Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Candidate List Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase">Candidates in Process</span>
                <span className="text-xs text-slate-500 font-mono">{candidates.length} profiles</span>
              </div>

              <div className="space-y-2">
                {candidates.map(candidate => {
                  const isSelected = selectedCandidate.id === candidate.id;
                  return (
                    <div
                      key={candidate.id}
                      onClick={() => setSelectedCandidate(candidate)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-blue-50/80 border-blue-600 shadow-sm' 
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-sm text-slate-900">{candidate.name}</div>
                        <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          {candidate.stage}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">{candidate.jobTitle}</div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                        <span>Match: <strong className="text-emerald-700">{candidate.matchScore}%</strong></span>
                        <span>Exp: {candidate.experienceYears} yrs</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Candidate Dossier & Move Stage Actions */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h4 className="text-base font-bold text-slate-900">{selectedCandidate.name}</h4>
                  <div className="text-xs text-slate-500">{selectedCandidate.jobTitle}</div>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{selectedCandidate.rating}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div><span className="text-slate-500">Current Stage:</span> <strong className="text-blue-700">{selectedCandidate.stage}</strong></div>
                <div><span className="text-slate-500">Applied Date:</span> {selectedCandidate.appliedDate}</div>
                <div><span className="text-slate-500">Core Skills:</span> {selectedCandidate.keySkills.join(', ')}</div>
              </div>

              {/* Move to next stage button */}
              <div className="pt-2">
                <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1.5">
                  Advance Candidate Stage:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {stages.map(stage => (
                    <button
                      key={stage}
                      onClick={() => handleMoveCandidate(selectedCandidate.id, stage)}
                      className={`text-xs py-1.5 px-2 rounded-lg border text-center transition-all ${
                        selectedCandidate.stage === stage
                          ? 'bg-[#0F2D6B] text-white border-[#0F2D6B] font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Recruitment Assistant (Job description, interview questions, summary, communication) */}
            <div className="bg-gradient-to-b from-blue-900 to-[#0A1E4A] text-white rounded-xl p-5 border border-blue-800 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-lime-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-lime-400">NextSofthr AI Copilot</span>
                </div>
                <span className="text-[10px] text-slate-400 bg-white/10 px-2 py-0.5 rounded">Human-in-the-Loop</span>
              </div>

              <p className="text-[11px] text-slate-300">
                AI assists human recruiters with tasks, drafting rubrics and correspondence. It never makes autonomous hiring decisions.
              </p>

              {/* Tools Switcher */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => runAiAssistant('questions')}
                  className={`p-2 rounded-lg border text-left transition-colors ${
                    aiTool === 'questions' ? 'bg-white/20 border-lime-400 text-white font-bold' : 'bg-white/5 border-white/10 text-slate-300'
                  }`}
                >
                  Interview Questions
                </button>
                <button
                  onClick={() => runAiAssistant('summary')}
                  className={`p-2 rounded-lg border text-left transition-colors ${
                    aiTool === 'summary' ? 'bg-white/20 border-lime-400 text-white font-bold' : 'bg-white/5 border-white/10 text-slate-300'
                  }`}
                >
                  Candidate Summary
                </button>
                <button
                  onClick={() => runAiAssistant('jd')}
                  className={`p-2 rounded-lg border text-left transition-colors ${
                    aiTool === 'jd' ? 'bg-white/20 border-lime-400 text-white font-bold' : 'bg-white/5 border-white/10 text-slate-300'
                  }`}
                >
                  Job Requisition Draft
                </button>
                <button
                  onClick={() => runAiAssistant('email')}
                  className={`p-2 rounded-lg border text-left transition-colors ${
                    aiTool === 'email' ? 'bg-white/20 border-lime-400 text-white font-bold' : 'bg-white/5 border-white/10 text-slate-300'
                  }`}
                >
                  Email Candidate
                </button>
              </div>

              {/* Generated Content Box */}
              <div className="p-3 bg-black/30 rounded-lg border border-white/10 text-xs text-slate-200 max-h-48 overflow-y-auto font-sans leading-relaxed whitespace-pre-line">
                {isGenerating ? (
                  <div className="flex items-center gap-2 text-lime-400 py-4 justify-center">
                    <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping"></span>
                    <span>Generating intelligent assessment...</span>
                  </div>
                ) : (
                  generatedContent || 'Click any tool above to generate structured recruiter materials for this role.'
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scope Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Features</span>
            <h3 className="text-2xl font-bold text-slate-900">12 Pillars of Recruitment Outsourcing</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recruitmentFeatures.map(feat => (
              <div key={feat} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-lime-600 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onOpenLeadModal('Recruitment Consultation')}
              className="px-8 py-3.5 bg-[#0F2D6B] hover:bg-[#0A1E4A] text-white font-bold rounded-xl text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Scale Your Hiring with NextSofthr</span>
              <ArrowRight className="w-4 h-4 text-lime-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Explore Other Outsourcing Solutions & Return Home */}
      {onNavigate && (
        <SolutionNavigationFooter
          currentSolutionId="outsourcing-recruitment"
          onNavigate={onNavigate}
          onOpenLeadModal={onOpenLeadModal}
        />
      )}
    </div>
  );
};
