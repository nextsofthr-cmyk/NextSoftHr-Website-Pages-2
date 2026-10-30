import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Bookmark, 
  Play, 
  Check, 
  ChevronRight,
  Filter,
  Zap,
  Target,
  Search,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { Job, ParsedResumeProfile } from '../types';

interface SkillsGrowthPathWidgetProps {
  parsedProfile: ParsedResumeProfile | null;
  savedJobs: Job[];
  onAddSkillToProfile?: (skillName: string) => void;
  onToast?: (message: string) => void;
  onSelectJob?: (job: Job) => void;
}

interface LearningCourse {
  title: string;
  provider: string;
  providerLogo?: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  freeType: '100% Free' | 'Free Audit' | 'Free Certificate';
  description: string;
  syllabus: string[];
  externalUrl: string;
}

interface SkillPathMapping {
  skill: string;
  category: string;
  course: LearningCourse;
  matchBoostPercent: number;
}

// Curated database of verified, free online learning paths mapped to high-demand skills
const CURATED_GROWTH_PATHS: Record<string, SkillPathMapping> = {
  'Docker & Kubernetes': {
    skill: 'Docker & Kubernetes',
    category: 'Information Technology',
    matchBoostPercent: 18,
    course: {
      title: 'Kubernetes & Container Orchestration for Scalable Systems',
      provider: 'freeCodeCamp & Google Cloud',
      duration: '6 hours · Self-paced',
      level: 'Intermediate',
      freeType: '100% Free',
      description: 'Master containerization workflows, multi-container Pods, deployments, and cluster autoscaling designed for high-availability production environments.',
      syllabus: ['Containerizing microservices with Dockerfiles', 'Kubernetes Pods, Services & Ingress', 'StatefulSets & Persistent Volumes', 'Production zero-downtime rolling updates'],
      externalUrl: 'https://freecodecamp.org/learn'
    }
  },
  'Go': {
    skill: 'Go',
    category: 'Information Technology',
    matchBoostPercent: 16,
    course: {
      title: 'Go Programming: High-Throughput Microservices & Concurrency',
      provider: 'Go.dev Tour & Microsoft Learn',
      duration: '8 hours · Self-paced',
      level: 'Intermediate',
      freeType: '100% Free',
      description: 'Learn idiomatic Go, goroutines, buffered channels, sync primitives, and low-latency API development for payment infrastructure.',
      syllabus: ['Goroutines and CSP Concurrency Patterns', 'Interfaces and Struct Embedding', 'High-throughput HTTP routers & Middleware', 'Graceful server shutdown & context handling'],
      externalUrl: 'https://go.dev/tour'
    }
  },
  'System Architecture': {
    skill: 'System Architecture',
    category: 'Information Technology',
    matchBoostPercent: 20,
    course: {
      title: 'Distributed Systems & Scalable Architecture Design',
      provider: 'MIT OpenCourseWare & System Design Primer',
      duration: '14 hours · Modular',
      level: 'Advanced',
      freeType: '100% Free',
      description: 'Design fault-tolerant distributed systems, idempotent payment processing, database sharding, and consensus protocols.',
      syllabus: ['CAP Theorem & Distributed Consensus', 'Idempotency Keys & Distributed Locks', 'Horizontal Sharding & Read Replicas', 'Event-Driven Architectures with Kafka'],
      externalUrl: 'https://ocw.mit.edu'
    }
  },
  'Kafka / RabbitMQ': {
    skill: 'Kafka / RabbitMQ',
    category: 'Information Technology',
    matchBoostPercent: 15,
    course: {
      title: 'Apache Kafka Event Streams & Async Message Brokering',
      provider: 'Confluent Developer Training',
      duration: '5 hours · Self-paced',
      level: 'Intermediate',
      freeType: '100% Free',
      description: 'Stream real-time financial events, consumer groups, topic partitions, schema registry, and exactly-once message delivery.',
      syllabus: ['Topics, Partitions & Offset Management', 'Producer / Consumer Group Optimization', 'Dead Letter Queues & Retry Logic', 'Stream Processing Basics'],
      externalUrl: 'https://developer.confluent.io'
    }
  },
  'CIPM Certified Member': {
    skill: 'CIPM Certified Member',
    category: 'Human Resources',
    matchBoostPercent: 22,
    course: {
      title: 'Strategic Nigerian Labour Law & CIPM Professional Foundations',
      provider: 'Chartered Institute of Personnel Management (CIPM)',
      duration: '12 hours · Self-paced',
      level: 'Advanced',
      freeType: 'Free Audit',
      description: 'Detailed study of Nigerian statutory employment legislation, industrial relations tribunals, employee grievance dispute architecture, and collective bargaining.',
      syllabus: ['Nigerian Labour Act & Trade Disputes Framework', 'Collective Bargaining & Union Negotiation', 'Workforce Planning & Redundancy Governance', 'Statutory Pension Reform & NSITF Compliance'],
      externalUrl: 'https://cipmnigeria.net'
    }
  },
  'Strategic Workforce Planning': {
    skill: 'Strategic Workforce Planning',
    category: 'Human Resources',
    matchBoostPercent: 16,
    course: {
      title: 'Strategic Talent Capacity & Succession Architecture',
      provider: 'Coursera (University of Minnesota - Free Audit)',
      duration: '7 hours · Self-paced',
      level: 'Intermediate',
      freeType: 'Free Audit',
      description: 'Model future skills shortages, headcount budgeting, competency frameworks, and high-potential leadership development pipelines.',
      syllabus: ['Workforce Demand & Supply Forecasting', '9-Box Succession Architecture', 'Talent Retention in Volatile Markets', 'HR Cost-per-Hire ROI Analysis'],
      externalUrl: 'https://coursera.org'
    }
  },
  'Financial Modeling': {
    skill: 'Financial Modeling',
    category: 'Banking & Finance',
    matchBoostPercent: 18,
    course: {
      title: 'Financial Modeling & Valuation Fundamentals',
      provider: 'Corporate Finance Institute (CFI Free Track)',
      duration: '9 hours · Self-paced',
      level: 'Intermediate',
      freeType: '100% Free',
      description: 'Build 3-statement financial forecasts, discounted cash flow (DCF) models, scenario analysis, and debt scheduling in Excel.',
      syllabus: ['Income Statement, Balance Sheet & Cash Flow Dynamic Linkage', 'Working Capital & Capex Schedules', 'Sensitivity Analysis & Tornado Charts', 'DCF Valuation Modeling'],
      externalUrl: 'https://corporatefinanceinstitute.com'
    }
  },
  'Regulatory Compliance (CBN)': {
    skill: 'Regulatory Compliance (CBN)',
    category: 'Banking & Finance',
    matchBoostPercent: 19,
    course: {
      title: 'African Fintech Regulatory Compliance & AML/CFT Standards',
      provider: 'Fintech Association & edX Global Compliance',
      duration: '8 hours · Modular',
      level: 'Intermediate',
      freeType: '100% Free',
      description: 'Understand central bank fintech licensing frameworks (PSSP, Switching, MMO), Anti-Money Laundering, and NDPR data residency.',
      syllabus: ['CBN Regulatory Sandbox & Licensing Tiers', 'AML/CFT KYC Tier 1-3 Verification Rules', 'Cross-Border FX Inflow Directives', 'Transaction Monitoring & Suspicious Reporting'],
      externalUrl: 'https://edx.org'
    }
  },
  'Go-To-Market (GTM) Strategy': {
    skill: 'Go-To-Market (GTM) Strategy',
    category: 'Sales & Marketing',
    matchBoostPercent: 15,
    course: {
      title: 'B2B Tech Product Go-To-Market & Revenue Acceleration',
      provider: 'HubSpot Academy & Product School',
      duration: '6 hours · Self-paced',
      level: 'Intermediate',
      freeType: 'Free Certificate',
      description: 'Architect ICP definition, value proposition positioning, sales qualification frameworks (MEDDIC), and partner referral channels.',
      syllabus: ['Ideal Customer Profile & Buyer Persona Mapping', 'Value Messaging & Competitive Battlecards', 'Pipeline Velocity & Conversion Funnels', 'Partner Ecosystem Co-Selling'],
      externalUrl: 'https://academy.hubspot.com'
    }
  },
  'Product Analytics & Mixpanel': {
    skill: 'Product Analytics & Mixpanel',
    category: 'Sales & Marketing',
    matchBoostPercent: 14,
    course: {
      title: 'Product Analytics: Funnels, Retention & Cohort Analysis',
      provider: 'Amplitude & Mixpanel Academy',
      duration: '5 hours · Self-paced',
      level: 'Intermediate',
      freeType: 'Free Certificate',
      description: 'Track key product metrics, activation milestones, user retention curves, cohort churn, and A/B test statistical significance.',
      syllabus: ['Event Taxonomy & Tracking Plans', 'Funnel Drop-off Analysis', 'Cohort Retention Curves', 'Feature Adoption Heatmaps'],
      externalUrl: 'https://amplitude.com'
    }
  },
  'TypeScript': {
    skill: 'TypeScript',
    category: 'Information Technology',
    matchBoostPercent: 14,
    course: {
      title: 'TypeScript Professional: Generics, Mapped Types & Architecture',
      provider: 'Microsoft Learn & Total TypeScript',
      duration: '6 hours · Self-paced',
      level: 'Intermediate',
      freeType: '100% Free',
      description: 'Master strict typing, utility types, discriminated unions, generic type helpers, and resilient enterprise frontend state machines.',
      syllabus: ['Discriminated Unions & Type Narrowing', 'Generic Constraints & Conditional Types', 'Template Literal Types', 'Type-Safe API Contracts & Zod'],
      externalUrl: 'https://microsoft.com/learn'
    }
  },
  'AWS Solutions Architect': {
    skill: 'AWS Solutions Architect',
    category: 'Information Technology',
    matchBoostPercent: 20,
    course: {
      title: 'AWS Cloud Architecture & Infrastructure Essentials',
      provider: 'AWS Skill Builder (Official Free Training)',
      duration: '10 hours · Self-paced',
      level: 'Intermediate',
      freeType: '100% Free',
      description: 'Deploy VPCs, multi-AZ high availability, IAM role boundaries, S3 encryption, ECS/EKS clusters, and cost optimization.',
      syllabus: ['VPC Subnetting & Security Groups', 'Auto Scaling Groups & Application Load Balancers', 'IAM Least Privilege Architecture', 'CloudWatch Monitoring & Alerting'],
      externalUrl: 'https://aws.amazon.com/training'
    }
  }
};

export const SkillsGrowthPathWidget: React.FC<SkillsGrowthPathWidgetProps> = ({
  parsedProfile,
  savedJobs,
  onAddSkillToProfile,
  onToast,
  onSelectJob
}) => {
  const [filterType, setFilterType] = useState<'all' | 'quick-wins' | 'high-boost' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourseModal, setActiveCourseModal] = useState<SkillPathMapping | null>(null);

  // Persistent user learning status: skillName -> 'in_progress' | 'completed'
  const [userLearningProgress, setUserLearningProgress] = useState<Record<string, 'in_progress' | 'completed'>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsoft_skills_growth_progress');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return {
      'Docker & Kubernetes': 'in_progress'
    };
  });

  const handleUpdateProgress = (skill: string, status: 'in_progress' | 'completed') => {
    const updated = { ...userLearningProgress, [skill]: status };
    setUserLearningProgress(updated);
    try {
      localStorage.setItem('nextsoft_skills_growth_progress', JSON.stringify(updated));
    } catch {}

    if (status === 'completed') {
      if (onAddSkillToProfile) {
        onAddSkillToProfile(skill);
      }
      if (onToast) {
        onToast(`🎉 Congratulations! "${skill}" has been verified and added to your Candidate Profile!`);
      }
    } else {
      if (onToast) {
        onToast(`🚀 Started learning path for "${skill}". Keep up the momentum!`);
      }
    }
  };

  // Extract candidate's existing known skills
  const knownSkills = useMemo(() => {
    const set = new Set<string>();
    if (parsedProfile) {
      (parsedProfile.extractedSkills || []).forEach(s => set.add(s.toLowerCase().trim()));
      (parsedProfile.verifiedSkills || []).forEach(v => set.add(v.name.toLowerCase().trim()));
    }
    return set;
  }, [parsedProfile]);

  // Analyze saved jobs to discover missing skills and their frequencies
  const analyzedMissingSkills = useMemo(() => {
    const missingMap = new Map<string, { skillName: string; matchingJobs: Job[]; pathInfo: SkillPathMapping }>();

    // Scan all saved jobs
    savedJobs.forEach(job => {
      const allRequirements = [...job.requirements, ...(job.skills || [])];

      allRequirements.forEach(req => {
        // Find best match in CURATED_GROWTH_PATHS
        Object.entries(CURATED_GROWTH_PATHS).forEach(([mappedKey, pathMapping]) => {
          const keyLower = mappedKey.toLowerCase();
          const reqLower = req.toLowerCase();

          if (reqLower.includes(keyLower) || keyLower.includes(reqLower)) {
            // Check if candidate already has this skill
            const hasSkill = Array.from(knownSkills).some(k => k.includes(keyLower) || keyLower.includes(k));
            
            // Check if marked completed
            const isCompleted = userLearningProgress[mappedKey] === 'completed';

            if (!hasSkill && !isCompleted) {
              if (!missingMap.has(mappedKey)) {
                missingMap.set(mappedKey, {
                  skillName: mappedKey,
                  matchingJobs: [job],
                  pathInfo: pathMapping
                });
              } else {
                const current = missingMap.get(mappedKey)!;
                if (!current.matchingJobs.some(j => j.id === job.id)) {
                  current.matchingJobs.push(job);
                }
              }
            }
          }
        });
      });
    });

    // If candidate has few saved jobs, supply default missing skills for their role category
    if (missingMap.size === 0) {
      const fallbackSkills = [
        'Docker & Kubernetes',
        'System Architecture',
        'Go',
        'Kafka / RabbitMQ',
        'AWS Solutions Architect'
      ];
      fallbackSkills.forEach(skillKey => {
        const path = CURATED_GROWTH_PATHS[skillKey];
        if (path && !knownSkills.has(skillKey.toLowerCase())) {
          missingMap.set(skillKey, {
            skillName: skillKey,
            matchingJobs: savedJobs.slice(0, 2),
            pathInfo: path
          });
        }
      });
    }

    return Array.from(missingMap.values());
  }, [savedJobs, knownSkills, userLearningProgress]);

  // Compute aggregate metrics
  const totalMissing = analyzedMissingSkills.length;
  const inProgressCount = Object.values(userLearningProgress).filter(s => s === 'in_progress').length;
  const completedCount = Object.values(userLearningProgress).filter(s => s === 'completed').length;
  const totalBoostPotential = analyzedMissingSkills.reduce((acc, item) => acc + item.pathInfo.matchBoostPercent, 0);

  // Filter items
  const filteredSkills = analyzedMissingSkills.filter(({ skillName, pathInfo }) => {
    const status = userLearningProgress[skillName];
    if (filterType === 'in-progress' && status !== 'in_progress') return false;
    if (filterType === 'completed' && status !== 'completed') return false;
    if (filterType === 'quick-wins' && !pathInfo.course.duration.includes('5') && !pathInfo.course.duration.includes('6')) return false;
    if (filterType === 'high-boost' && pathInfo.matchBoostPercent < 18) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = skillName.toLowerCase().includes(q) ||
        pathInfo.course.title.toLowerCase().includes(q) ||
        pathInfo.course.provider.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Value Banner */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-[#142B4A] via-indigo-950 to-blue-900 text-white shadow-xl border border-blue-800/40 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-lime-400 text-slate-950 flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Gap Analysis Engine</span>
              </span>
              <span className="text-xs text-blue-200 font-medium">
                Targeted to your {savedJobs.length} Saved Job{savedJobs.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs text-blue-200">Max Projected Fit Boost</span>
              <div className="text-xl font-black text-lime-400">+{Math.min(totalBoostPotential, 45)}% Overall</div>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Personalized Skills Growth Path & Free Certifications
          </h3>

          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
            Our engine analyzed your parsed profile against the required competencies in your saved jobs. We found <strong className="text-lime-300 font-bold">{totalMissing} missing skills</strong>. Completing these 100% free accredited courses will close your qualifications gap and advance your candidacy.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
              <span className="text-[11px] text-slate-300 block">Missing Skills Identified</span>
              <span className="text-xl font-black text-white">{totalMissing}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
              <span className="text-[11px] text-slate-300 block">In Progress</span>
              <span className="text-xl font-black text-amber-300">{inProgressCount}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
              <span className="text-[11px] text-slate-300 block">Completed & Badged</span>
              <span className="text-xl font-black text-lime-400">{completedCount}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
              <span className="text-[11px] text-slate-300 block">All Courses Cost</span>
              <span className="text-xl font-black text-emerald-300">100% Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>

          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#142B4A] dark:bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Recommended ({analyzedMissingSkills.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterType('high-boost')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterType === 'high-boost'
                ? 'bg-[#142B4A] dark:bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            High Impact (&ge; +18% Boost)
          </button>

          <button
            type="button"
            onClick={() => setFilterType('quick-wins')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterType === 'quick-wins'
                ? 'bg-[#142B4A] dark:bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Quick Wins (&le; 6 hrs)
          </button>

          <button
            type="button"
            onClick={() => setFilterType('in-progress')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterType === 'in-progress'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            In Progress ({inProgressCount})
          </button>
        </div>

        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills or course providers..."
            className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Recommended Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.length === 0 ? (
          <div className="col-span-2 p-10 text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-500 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h4 className="font-bold text-slate-800 dark:text-white text-sm">
              All Filtered Skills Satisfied!
            </h4>
            <p className="text-xs max-w-sm mx-auto">
              No matching courses in this category, or you have already added these skills to your active profile.
            </p>
          </div>
        ) : (
          filteredSkills.map(({ skillName, matchingJobs, pathInfo }) => {
            const userStatus = userLearningProgress[skillName];
            const isInProgress = userStatus === 'in_progress';
            const isCompleted = userStatus === 'completed';

            return (
              <div
                key={skillName}
                className={`p-5 rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-200 flex flex-col justify-between space-y-4 shadow-xs ${
                  isCompleted
                    ? 'border-emerald-300 dark:border-emerald-700/80 ring-1 ring-emerald-500/20 bg-emerald-50/10'
                    : isInProgress
                    ? 'border-amber-300 dark:border-amber-700/80 ring-1 ring-amber-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800">
                          Missing in Profile
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-lime-100 dark:bg-lime-950 text-lime-800 dark:text-lime-300 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>+{pathInfo.matchBoostPercent}% Fit Boost</span>
                        </span>
                      </div>

                      <h4 className="text-base font-extrabold text-[#142B4A] dark:text-white flex items-center gap-2 pt-1">
                        <span>{skillName}</span>
                      </h4>
                    </div>

                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950/70 text-[#2563EB] dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                      {pathInfo.course.freeType}
                    </span>
                  </div>

                  {/* Course Details Card */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white">
                      <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="truncate">{pathInfo.course.title}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        🏛️ {pathInfo.course.provider}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {pathInfo.course.duration}
                      </span>
                      <span>·</span>
                      <span>Level: {pathInfo.course.level}</span>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {pathInfo.course.description}
                    </p>
                  </div>

                  {/* Matching Saved Jobs */}
                  {matchingJobs.length > 0 && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-blue-500" />
                        <span>Required by:</span>
                      </span>
                      {matchingJobs.slice(0, 2).map((j, idx) => (
                        <button
                          key={j.id}
                          type="button"
                          onClick={() => onSelectJob && onSelectJob(j)}
                          className="font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          {j.title} ({j.companyName}){idx < Math.min(matchingJobs.length, 2) - 1 ? ',' : ''}
                        </button>
                      ))}
                      {matchingJobs.length > 2 && (
                        <span>+{matchingJobs.length - 2} more saved jobs</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveCourseModal(pathInfo)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Syllabus</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {!isCompleted && !isInProgress && (
                      <button
                        type="button"
                        onClick={() => handleUpdateProgress(skillName, 'in_progress')}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Start Path
                      </button>
                    )}

                    {isInProgress && (
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40">
                        <Clock className="w-3 h-3" />
                        <span>In Progress</span>
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleUpdateProgress(skillName, 'completed')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black'
                      }`}
                      title="Mark course as completed and add verified skill to profile"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{isCompleted ? 'Added to Profile ✓' : 'Complete & Add'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Syllabus Detail Modal */}
      {activeCourseModal && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveCourseModal(null)}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {activeCourseModal.skill} Growth Path
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                  {activeCourseModal.course.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeCourseModal.course.provider} · {activeCourseModal.course.duration}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveCourseModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Course Overview</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeCourseModal.course.description}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                What You Will Master (Curriculum Modules):
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {activeCourseModal.course.syllabus.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveCourseModal(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={activeCourseModal.course.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    handleUpdateProgress(activeCourseModal.skill, 'in_progress');
                    if (onToast) onToast(`Enrolling in free course via ${activeCourseModal.course.provider}...`);
                  }}
                  className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Enroll Free Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    handleUpdateProgress(activeCourseModal.skill, 'completed');
                    setActiveCourseModal(null);
                  }}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Mark Completed ✓
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
