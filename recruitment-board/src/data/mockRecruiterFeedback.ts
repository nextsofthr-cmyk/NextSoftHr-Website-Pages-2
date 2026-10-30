import { RecruiterPostInterviewFeedback } from '../types';

export const DEFAULT_RECRUITER_FEEDBACK_LIST: RecruiterPostInterviewFeedback[] = [
  {
    id: 'rfb-1',
    interviewId: 'intv-completed-1',
    jobId: 'job-1',
    jobTitle: 'Senior HR Business Partner (HRBP)',
    companyName: 'NextSoftHR Internal Talent',
    candidateName: 'Adaeze Okonkwo',
    recruiterName: 'Chinedu Eze',
    recruiterRole: 'Principal Talent Acquisition Lead & Executive HRBP',
    recruiterAvatar: 'CE',
    interviewDate: 'Oct 24, 2026',
    interviewType: 'Executive Panel & Competency Assessment',
    completedAt: 'Completed 6 days ago',
    overallScore: 4.8,
    recommendation: 'Strong Hire',
    recommendationColor: 'emerald',
    criteriaRatings: [
      {
        criterion: 'Strategic HR & Org Design',
        score: 5,
        description: 'Demonstrated mastery in restructuring high-growth tech firms with zero voluntary key talent attrition.'
      },
      {
        criterion: 'Stakeholder Communication & Empathy',
        score: 5,
        description: 'Exceptionally structured, de-escalating executive leadership conflicts with poise and clarity.'
      },
      {
        criterion: 'Labour Law & Regional Compliance',
        score: 4.5,
        description: 'Strong command of Nigerian and Kenyan statutory codes; demonstrated proactive knowledge of employee relations.'
      },
      {
        criterion: 'Culture & Trust Leadership',
        score: 4.8,
        description: 'High emotional intelligence, transparent communication, and genuine passion for people development.'
      }
    ],
    summaryNotes: 'Adaeze was an absolute standout in the panel interview. She presented a compelling 90-day onboarding blueprint and articulated how to align talent acquisition with business KPI expansion across West Africa. The hiring panel unanimously endorsed extending an executive offer.',
    keyStrengths: [
      'Deep understanding of distributed talent retention metrics and compensation leveling across Africa.',
      'Clear, metric-driven case studies: reduced engineering attrition by 24% at previous organization.',
      'Exceptional executive presence, structured answering (STAR methodology), and deep emotional intelligence.',
      'Proven ability to partner with C-Suite leaders on sensitive organizational changes.'
    ],
    growthAreas: [
      'Recommend taking a refresher seminar on Francophone WAEMU regional compliance differences ahead of multi-country team rollouts.'
    ],
    nextSteps: 'Formal Written Offer in Preparation — People Operations team will reach out with the complete compensation & equity package.',
    feedbackSharedDate: 'Oct 26, 2026 (48 hours post-interview)',
    isVerified: true,
    candidateRead: true
  },
  {
    id: 'rfb-2',
    interviewId: 'intv-completed-2',
    jobId: 'job-2',
    jobTitle: 'Lead Backend & Payment Systems Engineer',
    companyName: 'Paystack Financial',
    candidateName: 'Tunde Adeleke',
    recruiterName: 'Kemi Adebayo',
    recruiterRole: 'Head of Engineering Talent & Technical Sourcing',
    recruiterAvatar: 'KA',
    interviewDate: 'Oct 26, 2026',
    interviewType: 'Technical Architecture & System Design Screen',
    completedAt: 'Completed 4 days ago',
    overallScore: 4.7,
    recommendation: 'Strong Hire',
    recommendationColor: 'emerald',
    criteriaRatings: [
      {
        criterion: 'Distributed Systems & Architecture',
        score: 4.8,
        description: 'Superb whiteboard breakdown of idempotent webhook delivery and asynchronous reconciliation buffers.'
      },
      {
        criterion: 'Database Tuning & Concurrency',
        score: 4.7,
        description: 'Mastery over PostgreSQL transaction isolation levels, connection pooling, and optimistic locking.'
      },
      {
        criterion: 'Problem Solving Under Pressure',
        score: 4.6,
        description: 'Calmly adapted when unannounced network partition scenarios were injected into the system prompt.'
      },
      {
        criterion: 'Technical Communication & Clarity',
        score: 4.8,
        description: 'Explains complex distributed systems trade-offs in plain, actionable language with pragmatic trade-off analysis.'
      }
    ],
    summaryNotes: 'Tunde demonstrated world-class backend engineering craftsmanship. He answered every question on high-throughput payment reconciliation with precision and showed genuine curiosity about Paystack’s cross-border settlement architecture.',
    keyStrengths: [
      'Flawless handling of African payment switch edge cases (NIBSS, M-Pesa B2C timeouts, automated retry backoffs).',
      'Wrote production-grade idempotent wrapper logic with structured logging and Prometheus metrics.',
      'Strong architectural maturity: prioritizes simplicity and maintainability over unnecessary microservice sprawl.'
    ],
    growthAreas: [
      'Could deepen experience with OpenTelemetry distributed tracing spans across high-volume asynchronous worker queues.'
    ],
    nextSteps: 'Advanced to Executive Leadership Round with Engineering Director & VP.',
    feedbackSharedDate: 'Oct 27, 2026 (24 hours post-interview)',
    isVerified: true,
    candidateRead: false
  },
  {
    id: 'rfb-3',
    interviewId: 'intv-completed-3',
    jobId: 'job-5',
    jobTitle: 'Senior Product Designer',
    companyName: 'Flutterwave',
    candidateName: 'Folake Adeyemi',
    recruiterName: 'Ayodele Balogun',
    recruiterRole: 'Lead Product Design Recruiter',
    recruiterAvatar: 'AB',
    interviewDate: 'Oct 28, 2026',
    interviewType: 'Portfolio Deep Dive & Product Thinking',
    completedAt: 'Completed 2 days ago',
    overallScore: 4.5,
    recommendation: 'Hire / Proceed to Next Stage',
    recommendationColor: 'blue',
    criteriaRatings: [
      {
        criterion: 'Design Craft & Systems',
        score: 4.7,
        description: 'Clean Figma component architecture, token variables, and WCAG AAA accessibility compliance.'
      },
      {
        criterion: 'User Research & Data Empathy',
        score: 4.4,
        description: 'Strong qualitative synthesis from interviews with African SME merchants and diaspora remitters.'
      },
      {
        criterion: 'Product Strategy & Business Sense',
        score: 4.5,
        description: 'Understands how checkout conversion funnel friction directly impacts merchant revenue retention.'
      },
      {
        criterion: 'Cross-functional Collaboration',
        score: 4.5,
        description: 'Pragmatic communication with engineering and product managers on design feasibility.'
      }
    ],
    summaryNotes: 'Folake gave an impressive presentation of her previous fintech onboarding redesign. Her user-first approach and mobile-responsive prototyping were thoroughly praised by the design team.',
    keyStrengths: [
      'Superb mobile UX patterns optimized for 3G/low-bandwidth mobile African networks.',
      'High attention to typography, micro-interactions, and accessible forms.',
      'Clear articulate presentation style with engaging storytelling.'
    ],
    growthAreas: [
      'Incorporate more statistical A/B test hypothesis validation frameworks into early discovery slides.'
    ],
    nextSteps: 'Final Design Challenge Presentation with Head of Product Design scheduled for next Tuesday.',
    feedbackSharedDate: 'Oct 29, 2026 (24 hours post-interview)',
    isVerified: true,
    candidateRead: false
  }
];
