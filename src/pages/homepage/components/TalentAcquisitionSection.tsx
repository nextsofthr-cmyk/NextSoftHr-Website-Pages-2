import { useState, useEffect } from 'react';
import { 
  Briefcase, Sparkles, UserCheck, Search, CheckCircle2, 
  ArrowRight, FileText, Star, Clock, Filter, ChevronLeft, ChevronRight,
  MapPin, Award
} from 'lucide-react';

interface TalentProps {
  onOpenDemo: () => void;
}

export const TalentAcquisitionSection = ({ onOpenDemo }: TalentProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const candidates = [
    {
      name: 'Sarah Jenkins',
      role: 'Staff Product Designer',
      experience: '8+ yrs exp',
      location: 'London (Remote)',
      matchScore: '98%',
      status: 'Final Executive Round',
      skills: ['Design Systems', 'Figma Tokens', 'Enterprise SaaS', 'UX Architecture'],
      aiSummary: 'Top match: 8+ yrs design systems, enterprise SaaS background, strong Figma tokens expertise. Scored top 2% in architecture evaluation with validated portfolio.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Tariq Al-Mansoor',
      role: 'Senior Cloud Infra Lead',
      experience: '10+ yrs exp',
      location: 'Dubai / Hybrid',
      matchScore: '94%',
      status: 'Technical Review',
      skills: ['AWS & Kubernetes', 'Terraform', 'SOC 2 Hardening', 'DevOps CI/CD'],
      aiSummary: 'Strong AWS & Kubernetes background, 10 yrs DevOps, verified certifications. Zero security compliance gaps detected during automated statutory screening.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Kavita Patel',
      role: 'Principal Product Manager',
      experience: '7+ yrs exp',
      location: 'Nairobi (On-site)',
      matchScore: '96%',
      status: 'Offer Extended',
      skills: ['FinTech & Payroll', 'Product Analytics', 'ARR Growth', 'Agile Roadmaps'],
      aiSummary: 'Prior Fintech and HR tech PM lead, scaled ARR from $4M to $25M across African and European multi-currency markets with high retention metrics.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'David Okafor',
      role: 'Lead Backend Engineer',
      experience: '9+ yrs exp',
      location: 'Lagos / Hybrid',
      matchScore: '97%',
      status: 'Technical Deep-Dive',
      skills: ['Golang & Node.js', 'High-Load Systems', 'Banking APIs', 'Microservices'],
      aiSummary: 'Specialized in high-concurrency payroll ledgers and bank batch clearing switches. Proven mastery in financial transaction consistency and double-entry engines.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Elena Vasquez',
      role: 'Director of People & Culture',
      experience: '11+ yrs exp',
      location: 'Madrid / Remote',
      matchScore: '95%',
      status: 'Culture & Leadership',
      skills: ['Global HRBP', 'Talent Retention', 'Comp & Benefits', 'Labor Law'],
      aiSummary: 'Pioneered decentralized hiring and retention across 14 global subsidiaries. High culture-add score with comprehensive EU & UK labor regulation mastery.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    }
  ];

  // Continuous auto-looping slider (advances every 4.2 seconds unless hovered)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % candidates.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isPaused, candidates.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + candidates.length) % candidates.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % candidates.length);
  };

  const currentCand = candidates[currentSlide];

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
          
          {/* Left Column: AI Candidate Matching Looping Slider */}
          <div className="lg:col-span-6 flex flex-col">
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col justify-between"
            >
              <div>
                {/* Header with Slider Controls */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300">
                      <Sparkles className="w-4 h-4 text-lime-700 dark:text-lime-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        AI Candidate Pre-Screening
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Autonomous CV parsing & competency scoring
                      </p>
                    </div>
                  </div>

                  {/* Navigation Arrows & Live Badge */}
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-flex px-2.5 py-1 text-[11px] font-bold rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                      Applicant {currentSlide + 1} of {candidates.length}
                    </span>
                    <button
                      onClick={handlePrev}
                      aria-label="Previous Candidate"
                      className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next Candidate"
                      className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Looping Slider Active Candidate Card */}
                <div className="relative">
                  <div className="p-5 rounded-2xl border bg-blue-50/50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/60 shadow-xs transition-all">
                    
                    {/* Top Row: Avatar, Candidate Title & Match Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative">
                          <img 
                            src={currentCand.avatar} 
                            alt={currentCand.name}
                            className="w-14 h-14 rounded-2xl object-cover border-2 border-white dark:border-slate-700 shadow-sm" 
                          />
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-lime-500 border-2 border-white dark:border-slate-900" />
                        </div>
                        <div>
                          <h5 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                            {currentCand.name}
                          </h5>
                          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">
                            {currentCand.role}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                              {currentCand.experience}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {currentCand.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-lime-200 dark:bg-lime-950/90 text-lime-900 dark:text-lime-300 font-mono shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-lime-600 animate-pulse" />
                          {currentCand.matchScore} Match
                        </span>
                        <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                          {currentCand.status}
                        </span>
                      </div>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {currentCand.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* AI Assessment Callout Box */}
                    <div className="p-3.5 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
                      <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-bold mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                        <span>AI Screening Evaluation</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                        {currentCand.aiSummary}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Looping Slider Pagination Indicators & Quick Select */}
                <div className="flex items-center justify-between pt-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    {candidates.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Go to candidate ${idx + 1}`}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          currentSlide === idx 
                            ? 'w-7 bg-blue-600 dark:bg-lime-400' 
                            : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    Looping slider • Auto-advancing
                  </span>
                </div>
              </div>

              {/* Bottom Quick AI Action */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Includes anti-bias evaluation safeguards</span>
                <button
                  onClick={onOpenDemo}
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Generate Offer Letter</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Recruitment Kanban Pipeline Preview */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Hiring Pipeline (Open Roles: 6)</h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Avg Time to Hire: 16 Days</span>
                </div>

                {/* Simulated mini Kanban stages */}
                <div className="grid grid-cols-3 gap-3 text-xs mb-5">
                  
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
                <div className="p-4 bg-lime-50 dark:bg-lime-950/50 rounded-2xl border border-lime-200 dark:border-lime-900/60 flex items-center justify-between text-xs mb-4">
                  <div className="flex items-center gap-2 text-lime-950 dark:text-lime-300">
                    <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
                    <span>Accepted candidates convert automatically into Day-1 Onboarding dossiers.</span>
                  </div>
                </div>
              </div>

              {/* Recruiter image quote */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" 
                  alt="Recruiter" 
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                  “NextSofthr cut our resume screening time from 3 hours a day down to 10 minutes.”
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
