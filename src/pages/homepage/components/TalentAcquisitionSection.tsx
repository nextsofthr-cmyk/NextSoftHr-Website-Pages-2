import { useState } from 'react';
import { 
  Briefcase, Sparkles, UserCheck, Search, CheckCircle2, 
  ArrowRight, FileText, Star, Clock, Filter 
} from 'lucide-react';

interface TalentProps {
  onOpenDemo: () => void;
}

export const TalentAcquisitionSection = ({ onOpenDemo }: TalentProps) => {
  const [selectedCandidate, setSelectedCandidate] = useState(0);

  const candidates = [
    {
      name: 'Sarah Jenkins',
      role: 'Staff Product Designer',
      matchScore: '98%',
      aiSummary: 'Top match: 8+ yrs design systems, enterprise SaaS background, strong Figma tokens expertise.',
      status: 'Final Round',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Tariq Al-Mansoor',
      role: 'Senior Cloud Infra Lead',
      matchScore: '94%',
      aiSummary: 'Strong AWS & Kubernetes background, 10 yrs DevOps, verified certifications.',
      status: 'Technical Review',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Kavita Patel',
      role: 'Principal Product Manager',
      matchScore: '96%',
      aiSummary: 'Prior Fintech and HR tech PM lead, scaled ARR from $4M to $25M.',
      status: 'Offer Extended',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <section id="talent" className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-wider mb-3 inline-block">
            Talent Acquisition & ATS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Find, Hire and Onboard Great Talent.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
            Accelerate your hiring velocity with AI CV screening, automated candidate scoring, multi-stage interview pipelines, and 1-click compliant offer letters.
          </p>
        </div>

        {/* Interactive Kanban & AI Matching Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Left Column: AI Candidate Matching Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300">
                    <Sparkles className="w-4 h-4 text-lime-700 dark:text-lime-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">AI Candidate Pre-Screening</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Autonomous CV parsing & competency scoring</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                  34 Applicants
                </span>
              </div>

              {/* Candidate Cards */}
              <div className="space-y-3">
                {candidates.map((cand, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedCandidate(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      selectedCandidate === idx
                        ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 dark:border-blue-400 shadow-sm ring-2 ring-blue-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <img 
                      src={cand.avatar} 
                      alt={cand.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-xs" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-sm text-slate-900 dark:text-white">{cand.name}</h5>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-lime-200 dark:bg-lime-950/80 text-lime-900 dark:text-lime-300 font-mono">
                          {cand.matchScore} Match
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{cand.role}</p>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 p-2 rounded-lg mt-2 border border-slate-200/60 dark:border-slate-700/80 leading-tight">
                        <span className="font-bold text-blue-700 dark:text-blue-400">AI Note:</span> {cand.aiSummary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick AI Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Includes anti-bias evaluation safeguards</span>
                <button
                  onClick={onOpenDemo}
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Generate Offer Letter</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Recruitment Kanban Pipeline Preview */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Hiring Pipeline (Open Roles: 6)</h4>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Avg Time to Hire: 16 Days</span>
            </div>

            {/* Simulated mini Kanban stages */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              
              {/* Column 1: Sourced */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Screening</span>
                  <span className="bg-slate-200 dark:bg-slate-700 px-1.5 rounded text-[10px] text-slate-700 dark:text-slate-300">14</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs mb-2">
                  <p className="font-bold text-slate-900 dark:text-white text-[11px]">Alex Vance</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">React Architect</p>
                  <span className="inline-block mt-1 text-[9px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1 rounded">
                    Score: 91%
                  </span>
                </div>
              </div>

              {/* Column 2: Interviewing */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Interview</span>
                  <span className="bg-slate-200 dark:bg-slate-700 px-1.5 rounded text-[10px] text-slate-700 dark:text-slate-300">6</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs mb-2">
                  <p className="font-bold text-slate-900 dark:text-white text-[11px]">Sarah Jenkins</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Staff Designer</p>
                  <span className="inline-block mt-1 text-[9px] font-bold text-lime-700 dark:text-lime-400 bg-lime-100 dark:bg-lime-950/60 px-1 rounded">
                    Score: 98%
                  </span>
                </div>
              </div>

              {/* Column 3: Hired / Onboard */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Offer Stage</span>
                  <span className="bg-slate-200 dark:bg-slate-700 px-1.5 rounded text-[10px] text-slate-700 dark:text-slate-300">4</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs mb-2">
                  <p className="font-bold text-slate-900 dark:text-white text-[11px]">Kavita Patel</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Principal PM</p>
                  <span className="inline-block mt-1 text-[9px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1 rounded">
                    e-Sign Sent
                  </span>
                </div>
              </div>

            </div>

            {/* Seamless transition to onboarding */}
            <div className="p-4 bg-lime-50 dark:bg-lime-950/50 rounded-2xl border border-lime-200 dark:border-lime-900/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-lime-950 dark:text-lime-300">
                <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
                <span>Accepted candidates convert automatically into Day-1 Onboarding dossiers.</span>
              </div>
            </div>

            {/* Recruiter image quote */}
            <div className="flex items-center gap-3 pt-2">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" 
                alt="Recruiter" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                “NextSofthr cut our resume screening time from 3 hours a day down to 10 minutes.”
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
