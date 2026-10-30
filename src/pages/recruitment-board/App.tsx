import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AudienceSelector } from './components/AudienceSelector';
import { FeaturedJobs } from './components/FeaturedJobs';
import { CategoryBrowser } from './components/CategoryBrowser';
import { FeaturedCompanies } from './components/FeaturedCompanies';
import { RecruitmentServices } from './components/RecruitmentServices';
import { EmployerConversion } from './components/EmployerConversion';
import { AgencyConversion } from './components/AgencyConversion';
import { HowItWorks } from './components/HowItWorks';
import { AiRecruitmentAssistant } from './components/AiRecruitmentAssistant';
import { TrustAndSecurity } from './components/TrustAndSecurity';
import { CareerResources } from './components/CareerResources';
import { PricingPackages } from './components/PricingPackages';
import { FaqSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingLiveChat } from './components/FloatingLiveChat';

// Modals
import { AuthModal } from './components/AuthModal';
import { PostJobModal } from './components/PostJobModal';
import { JobSearchModalOrPage } from './components/JobSearchModalOrPage';
import { JobDetailsModal } from './components/JobDetailsModal';
import { CompanyModal } from './components/CompanyModal';
import { ServiceRequestModal } from './components/ServiceRequestModal';
import { ArticleModal } from './components/ArticleModal';
import { ApiArchitectureModal } from './components/ApiArchitectureModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { JobAlertModal } from './components/JobAlertModal';
import { CandidateDashboardModal } from './components/CandidateDashboardModal';
import { EmployerRecruiterDashboardModal, SAMPLE_TALENT_POOL } from './components/EmployerRecruiterDashboardModal';
import { ResumeBuilderModal } from './components/ResumeBuilderModal';
import { RegionalPaymentGatewayModal } from './components/RegionalPaymentGatewayModal';
import { ScrollNavigationControl } from './components/ScrollNavigationControl';
import { SAMPLE_RESUMES } from './utils/resumeParser';

// Mock Data & Types
import { 
  INITIAL_JOBS, 
  INITIAL_COMPANIES, 
  JOB_CATEGORIES, 
  RECRUITMENT_SERVICES, 
  PRICING_PLANS, 
  FAQS, 
  ARTICLES 
} from './data/mockData';
import { 
  Job, 
  Company, 
  RecruitmentService, 
  PricingPlan, 
  Article, 
  CandidateApplication, 
  UserRole, 
  JobAlert,
  ScheduledInterview,
  InterviewStatus,
  ParsedResumeProfile,
  PosterType,
  SavedCandidate,
  EmployerSubscription,
  PostedJobRecord,
  CandidatePlanType,
  CandidateSubscription,
  RecruiterPostInterviewFeedback
} from './types';
import { DEFAULT_RECRUITER_FEEDBACK_LIST } from './data/mockRecruiterFeedback';
import { useLanguage } from './context/LanguageContext';

export function App() {
  const { dir } = useLanguage();
  // Core Data States
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [companies] = useState<Company[]>(INITIAL_COMPANIES);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1', 'job-3']);
  const [submittedApplications, setSubmittedApplications] = useState<CandidateApplication[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsoft_applications');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore corrupted storage
        }
      }
    }
    return [
      {
        id: 'app-default-1',
        jobId: 'job-1',
        jobTitle: 'Senior HR Business Partner (People & Culture)',
        companyName: 'Interswitch Group',
        fullName: 'Chioma Okonkwo',
        email: 'chioma.okonkwo@example.com',
        phone: '+234 802 345 6789',
        location: 'Lagos, Nigeria',
        appliedAt: '2 days ago',
        status: 'reviewing',
        resumeFileName: 'Chioma_Okonkwo_HRBP_Resume.pdf',
        yearsOfExperience: 6,
        matchScore: 92
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('nextsoft_applications', JSON.stringify(submittedApplications));
    } catch {
      // ignore
    }
  }, [submittedApplications]);

  const appliedJobIds = submittedApplications.map(a => a.jobId);

  // Resume Builder and Payment Gateway States
  const [resumeBuilderOpen, setResumeBuilderOpen] = useState(false);
  const [paymentModalState, setPaymentModalState] = useState<{
    isOpen: boolean;
    persona: 'employer' | 'recruiter' | 'headhunter' | 'candidate';
    planId?: string;
  }>({
    isOpen: false,
    persona: 'employer'
  });

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<{ email: string; role: UserRole; name: string } | null>(null);

  // Employer Subscription & Quota Tracking
  const [employerSubscription, setEmployerSubscription] = useState<EmployerSubscription>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsoft_employer_subscription');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return {
      planType: 'free',
      planName: 'Starter Free',
      isPaid: false,
      activatedAt: '2025-01-01'
    };
  });

  const [postedJobRecords, setPostedJobRecords] = useState<PostedJobRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsoft_posted_jobs_quota');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('nextsoft_employer_subscription', JSON.stringify(employerSubscription));
    } catch {}
  }, [employerSubscription]);

  useEffect(() => {
    try {
      localStorage.setItem('nextsoft_posted_jobs_quota', JSON.stringify(postedJobRecords));
    } catch {}
  }, [postedJobRecords]);

  const handleRecordJobPosted = (record: PostedJobRecord) => {
    setPostedJobRecords(prev => [record, ...prev]);
  };

  const handleLinkedInSignIn = (userData: { name: string; email: string; role: UserRole }, profile: ParsedResumeProfile) => {
    setCurrentUser(userData);
    handleSaveParsedProfile(profile);
    showToast(`⚡ Signed in via LinkedIn as ${userData.name}! Verified skills and career profile loaded.`);
  };

  // Candidate Subscription & Plan State
  const [candidateSubscription, setCandidateSubscription] = useState<CandidateSubscription>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsoft_candidate_subscription');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return {
      planType: 'basic_free',
      planName: 'Basic Talent',
      isPaid: false,
      priceFormatted: '₦0',
      activatedAt: '2025-01-01',
      features: [
        '5 Job Applications / month',
        'Standard Mock NLP Resume Parser',
        'Standard Job Alerts',
        'Public Job Board Access'
      ]
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('nextsoft_candidate_subscription', JSON.stringify(candidateSubscription));
    } catch {}
  }, [candidateSubscription]);

  const handleSelectCandidatePlan = (planType: CandidatePlanType, planName: string, price: string) => {
    if (planType === 'basic_free') {
      setCandidateSubscription({
        planType: 'basic_free',
        planName: 'Basic Talent',
        isPaid: false,
        priceFormatted: '₦0',
        activatedAt: new Date().toISOString(),
        features: [
          '5 Job Applications / month',
          'Standard Mock NLP Resume Parser',
          'Standard Job Alerts',
          'Public Job Board Access'
        ]
      });
      showToast('🎉 Free Basic Candidate plan active! 5 applications & NLP parser included.');
    } else {
      setCandidateSubscription({
        planType,
        planName,
        isPaid: true,
        priceFormatted: price,
        activatedAt: new Date().toISOString(),
        features: [
          'Unlimited Job Applications',
          '🌟 Featured Candidate Badge on Recruiter Search & Heatmap',
          'AI Personalized Interview Prep module',
          'Direct Real-Time Messaging with Recruiters',
          'Verified Skill Badges & Instant Alerts'
        ]
      });
      setPaymentModalState({ isOpen: true, persona: 'employer' });
      showToast(`Selected ${planName} (${price}). Opening multi-regional payment gateways...`);
    }
  };

  // Modal Control States
  const [authModalState, setAuthModalState] = useState<{ isOpen: boolean; mode: 'login' | 'register'; role?: UserRole }>({
    isOpen: false,
    mode: 'login',
    role: 'job_seeker'
  });

  const [postJobModalState, setPostJobModalState] = useState<{
    isOpen: boolean;
    posterType?: PosterType;
  }>({
    isOpen: false,
    posterType: 'company'
  });

  const handleOpenPostJob = (posterType: PosterType = 'company') => {
    setPostJobModalState({
      isOpen: true,
      posterType
    });
  };
  const [searchModalState, setSearchModalState] = useState<{
    isOpen: boolean;
    params?: { keyword?: string; location?: string; category?: string; employmentType?: string; arrangement?: string };
  }>({
    isOpen: false,
    params: {}
  });

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedService, setSelectedService] = useState<RecruitmentService | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [apiDocsOpen, setApiDocsOpen] = useState(false);
  const [aiAssistantState, setAiAssistantState] = useState<{
    isOpen: boolean;
    tab: 'candidate' | 'employer-search' | 'job-drafter' | 'chat';
  }>({
    isOpen: false,
    tab: 'candidate'
  });

  // Candidate Dashboard & Mock NLP Resume Parser State
  const [candidateDashboardOpen, setCandidateDashboardOpen] = useState(false);
  const [parsedResumeProfile, setParsedResumeProfile] = useState<ParsedResumeProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsoft_parsed_resume');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore corrupted storage
        }
      }
    }
    return SAMPLE_RESUMES.software_engineer;
  });

  const handleSaveParsedProfile = (profile: ParsedResumeProfile) => {
    setParsedResumeProfile(profile);
    try {
      localStorage.setItem('nextsoft_parsed_resume', JSON.stringify(profile));
    } catch {
      // ignore
    }
  };

  // Saved Candidates & Recruiter Dashboard State
  const [recruiterDashboardOpen, setRecruiterDashboardOpen] = useState(false);
  const [savedCandidates, setSavedCandidates] = useState<SavedCandidate[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsoft_saved_candidates');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore corrupted storage
        }
      }
    }
    return [SAMPLE_TALENT_POOL[0], SAMPLE_TALENT_POOL[1]];
  });

  useEffect(() => {
    try {
      localStorage.setItem('nextsoft_saved_candidates', JSON.stringify(savedCandidates));
    } catch {
      // ignore storage errors
    }
  }, [savedCandidates]);

  const handleToggleSaveCandidate = (cand: SavedCandidate) => {
    setSavedCandidates(prev => {
      const exists = prev.some(c => c.id === cand.id);
      if (exists) {
        return prev.filter(c => c.id !== cand.id);
      } else {
        return [{ ...cand, savedAt: 'Just now' }, ...prev];
      }
    });
  };

  const handleUpdateCandidateNote = (candidateId: string, note: string) => {
    setSavedCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, notes: note } : c));
    showToast('Recruiter candidate note updated!');
  };

  // Job Alerts State & Persistence
  const [jobAlerts, setJobAlerts] = useState<JobAlert[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsoft_job_alerts');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore corrupted storage
        }
      }
    }
    return [
      {
        id: 'alert-1',
        email: 'career.growth@example.com',
        keyword: 'Senior HR Business Partner',
        location: 'Lagos',
        category: 'Human Resources',
        workArrangement: 'Any',
        frequency: 'daily',
        createdAt: '2 days ago',
        isActive: true,
        matchCount: 2,
        minSalary: 1200000,
        salaryCurrency: 'NGN',
        preferredCompanySizes: ['growth', 'enterprise'],
        diversityMetrics: ['eeo_pledge', 'family_flexibility']
      },
      {
        id: 'alert-2',
        email: 'developer.nigeria@example.com',
        keyword: 'Software Engineer',
        location: 'Remote',
        category: 'Information Technology',
        workArrangement: 'Remote',
        frequency: 'instant',
        createdAt: 'Yesterday',
        isActive: true,
        matchCount: 3,
        minSalary: 2000000,
        salaryCurrency: 'NGN',
        preferredCompanySizes: ['enterprise', 'conglomerate'],
        diversityMetrics: ['pay_transparency', 'female_leadership', 'disability_accommodations']
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('nextsoft_job_alerts', JSON.stringify(jobAlerts));
    } catch {
      // ignore storage errors
    }
  }, [jobAlerts]);

  // Persistent Interview Scheduler State
  const [interviews, setInterviews] = useState<ScheduledInterview[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsoft_interviews');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore corrupted storage
        }
      }
    }
    const today = new Date();
    const d1 = new Date(today);
    d1.setDate(today.getDate() + 2);
    d1.setHours(10, 0, 0, 0);

    const d2 = new Date(today);
    d2.setDate(today.getDate() + 2);
    d2.setHours(14, 30, 0, 0);

    const d3 = new Date(today);
    d3.setDate(today.getDate() + 3);
    d3.setHours(11, 0, 0, 0);

    const confDate = new Date(today);
    confDate.setDate(today.getDate() + 1);
    confDate.setHours(15, 0, 0, 0);

    return [
      {
        id: 'intv-1',
        jobId: 'job-1',
        jobTitle: 'Senior HR Business Partner (HRBP)',
        companyName: 'NextSoftHR Internal Talent',
        candidateName: 'Adaeze Okonkwo',
        candidateEmail: 'adaeze.okonkwo@example.com',
        recruiterName: 'Chinedu Eze (NextSoft RPO)',
        recruiterEmail: 'chinedu.eze@nextsofthr.com',
        interviewType: 'Video Call (Google Meet)',
        proposedSlots: [
          {
            id: 'slot-101',
            datetime: d1.toISOString().slice(0, 16),
            formattedDate: d1.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
            formattedTime: '10:00 AM (WAT)',
            durationMinutes: 45
          },
          {
            id: 'slot-102',
            datetime: d2.toISOString().slice(0, 16),
            formattedDate: d2.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
            formattedTime: '02:30 PM (WAT)',
            durationMinutes: 45
          },
          {
            id: 'slot-103',
            datetime: d3.toISOString().slice(0, 16),
            formattedDate: d3.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
            formattedTime: '11:00 AM (WAT)',
            durationMinutes: 45
          }
        ],
        meetingLink: 'https://meet.google.com/nxt-hrm-kzp',
        notes: 'Please come prepared with a 15-minute presentation on organizational restructuring for tech firms.',
        status: 'proposed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'intv-2',
        jobId: 'job-2',
        jobTitle: 'Lead Backend & Payment Systems Engineer',
        companyName: 'Paystack Financial',
        candidateName: 'Tunde Adeleke',
        candidateEmail: 'tunde.adeleke@example.com',
        recruiterName: 'Kemi Adebayo (Paystack Talent)',
        recruiterEmail: 'kemi.adebayo@paystack.com',
        interviewType: 'Technical Screen',
        proposedSlots: [
          {
            id: 'slot-201',
            datetime: confDate.toISOString().slice(0, 16),
            formattedDate: confDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
            formattedTime: '03:00 PM (WAT)',
            durationMinutes: 60
          }
        ],
        confirmedSlotId: 'slot-201',
        confirmedSlot: {
          id: 'slot-201',
          datetime: confDate.toISOString().slice(0, 16),
          formattedDate: confDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
          formattedTime: '03:00 PM (WAT)',
          durationMinutes: 60
        },
        meetingLink: 'https://meet.google.com/pay-arch-screen',
        notes: 'Technical live architecture design: distributed reconciliation and webhook resiliency.',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'intv-completed-1',
        jobId: 'job-1',
        jobTitle: 'Senior HR Business Partner (HRBP)',
        companyName: 'NextSoftHR Internal Talent',
        candidateName: 'Adaeze Okonkwo',
        candidateEmail: 'adaeze.okonkwo@example.com',
        recruiterName: 'Chinedu Eze (NextSoft RPO)',
        recruiterEmail: 'chinedu.eze@nextsofthr.com',
        interviewType: 'Executive Panel',
        proposedSlots: [],
        meetingLink: 'https://meet.google.com/nxt-hrm-kzp',
        notes: 'Final executive competency interview completed. Post-interview scorecard and qualitative feedback shared with candidate.',
        status: 'completed',
        createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 6 * 86400000).toISOString()
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('nextsoft_interviews', JSON.stringify(interviews));
    } catch {
      // ignore storage errors
    }
  }, [interviews]);

  // Recruiter Post-Interview Feedback State & Persistence
  const [recruiterFeedbackList, setRecruiterFeedbackList] = useState<RecruiterPostInterviewFeedback[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextsoft_recruiter_feedback');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return DEFAULT_RECRUITER_FEEDBACK_LIST;
  });

  useEffect(() => {
    try {
      localStorage.setItem('nextsoft_recruiter_feedback', JSON.stringify(recruiterFeedbackList));
    } catch {}
  }, [recruiterFeedbackList]);

  const handleSaveInterview = (interview: ScheduledInterview) => {
    setInterviews(prev => {
      const idx = prev.findIndex(i => i.id === interview.id || i.jobId === interview.jobId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = interview;
        return updated;
      }
      return [interview, ...prev];
    });
  };

  const handleUpdateInterviewStatus = (
    interviewId: string, 
    status: InterviewStatus, 
    confirmedSlotId?: string, 
    notes?: string,
    candidateRescheduleSlots?: any[]
  ) => {
    setInterviews(prev => prev.map(inv => {
      if (inv.id !== interviewId) return inv;

      let confirmedSlot = inv.confirmedSlot;
      if (confirmedSlotId) {
        const found = inv.proposedSlots.find(s => s.id === confirmedSlotId);
        if (found) confirmedSlot = found;
      }

      return {
        ...inv,
        status,
        confirmedSlotId: confirmedSlotId !== undefined ? confirmedSlotId : inv.confirmedSlotId,
        confirmedSlot: confirmedSlotId !== undefined ? confirmedSlot : inv.confirmedSlot,
        notes: notes !== undefined ? (inv.notes ? `${inv.notes}\n[Update]: ${notes}` : notes) : inv.notes,
        candidateRescheduleSlots: candidateRescheduleSlots || inv.candidateRescheduleSlots,
        rescheduledAt: status === 'rescheduled' ? new Date().toISOString() : inv.rescheduledAt,
        updatedAt: new Date().toISOString()
      };
    }));
  };

  const [jobAlertModalState, setJobAlertModalState] = useState<{
    isOpen: boolean;
    initialKeyword?: string;
    initialLocation?: string;
    initialCategory?: string;
    initialEmail?: string;
  }>({
    isOpen: false
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Check for shared job URL parameter on initial mount (?job=job-1)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const jobId = params.get('job');
      if (jobId) {
        const found = jobs.find(j => j.id === jobId);
        if (found) {
          setSelectedJob(found);
          showToast(`Opening shared vacancy: ${found.title} at ${found.companyName}`);
        }
      }
    }
  }, [jobs]);

  // Global Keyboard Shortcut: Cmd+K or Ctrl+K opens JobSearchModal from anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalState(prev => ({ ...prev, isOpen: !prev.isOpen }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Job Alert Handlers
  const handleOpenJobAlerts = (params?: { keyword?: string; location?: string; category?: string; email?: string }) => {
    setJobAlertModalState({
      isOpen: true,
      initialKeyword: params?.keyword,
      initialLocation: params?.location,
      initialCategory: params?.category,
      initialEmail: params?.email || currentUser?.email || ''
    });
  };

  const handleSaveAlert = (alertData: Omit<JobAlert, 'id' | 'createdAt' | 'isActive'>) => {
    const newAlert: JobAlert = {
      ...alertData,
      id: `alert-${Date.now()}`,
      createdAt: 'Just now',
      isActive: true
    };
    setJobAlerts(prev => [newAlert, ...prev]);
    showToast(`🔔 Job Alert activated for "${newAlert.keyword}" in "${newAlert.location || 'All Locations'}" (${newAlert.email})!`);
  };

  const handleToggleAlertStatus = (alertId: string) => {
    setJobAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        const nextActive = !a.isActive;
        showToast(`Alert for "${a.keyword}" ${nextActive ? 'resumed' : 'paused'}`);
        return { ...a, isActive: nextActive };
      }
      return a;
    }));
  };

  const handleDeleteAlert = (alertId: string) => {
    setJobAlerts(prev => prev.filter(a => a.id !== alertId));
    showToast('Job alert subscription removed');
  };

  const handleQuickSubscribeAlert = (data: { email: string; keyword: string; location: string }) => {
    handleSaveAlert({
      email: data.email,
      keyword: data.keyword,
      location: data.location,
      frequency: 'instant',
      workArrangement: 'Any'
    });
  };

  // Saved Jobs Toggle
  const handleToggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      if (exists) {
        showToast('Job removed from your saved list');
        return prev.filter(id => id !== jobId);
      } else {
        showToast('Job saved to your candidate dashboard');
        return [...prev, jobId];
      }
    });
  };

  // Open Search with Parameters
  const handleOpenSearchWithParams = (params?: {
    keyword?: string;
    location?: string;
    category?: string;
    employmentType?: string;
    arrangement?: string;
  }) => {
    setSearchModalState({
      isOpen: true,
      params: params || {}
    });
  };

  // Open Service Modal
  const handleOpenServiceModal = (serviceId?: string) => {
    if (serviceId) {
      const found = RECRUITMENT_SERVICES.find(s => s.id === serviceId);
      setSelectedService(found || RECRUITMENT_SERVICES[1]);
    } else {
      setSelectedService(RECRUITMENT_SERVICES[1]); // Default to RPO
    }
  };

  // Job Creation (with matching Job Alert check & simulated email dispatch)
  const handleJobCreated = (newJob: Job) => {
    setJobs(prev => [newJob, ...prev]);

    // Check matching active alerts
    const matchingAlerts = jobAlerts.filter(alert => {
      if (!alert.isActive) return false;
      const kw = alert.keyword.trim().toLowerCase();
      const loc = alert.location.trim().toLowerCase();
      const matchesKw = !kw || 
        newJob.title.toLowerCase().includes(kw) || 
        newJob.description.toLowerCase().includes(kw) || 
        newJob.category.toLowerCase().includes(kw) ||
        newJob.requirements.some(r => r.toLowerCase().includes(kw));
      const matchesLoc = !loc || 
        newJob.location.toLowerCase().includes(loc) || 
        (loc === 'remote' && newJob.workArrangement === 'Remote');
      return matchesKw && matchesLoc;
    });

    if (matchingAlerts.length > 0) {
      const emailsList = Array.from(new Set(matchingAlerts.map(a => a.email))).join(', ');
      showToast(`⚡ Vacancy "${newJob.title}" posted! Dispatched email alert to ${matchingAlerts.length} subscriber(s): ${emailsList}`);
    } else {
      showToast(`Vacancy "${newJob.title}" published successfully!`);
    }
  };

  // Application Submission
  const handleApplicationSubmit = (application: CandidateApplication) => {
    setSubmittedApplications(prev => [application, ...prev]);
    showToast(`Application submitted for ${application.fullName}!`);
  };

  // FAQ Action Click Router
  const handleFaqAction = (target: string) => {
    if (target === 'register-seeker') {
      setAuthModalState({ isOpen: true, mode: 'register', role: 'job_seeker' });
    } else if (target === 'post-job') {
      handleOpenPostJob('company');
    } else if (target === 'login-employer') {
      setAuthModalState({ isOpen: true, mode: 'login', role: 'employer' });
    } else if (target === 'services-modal') {
      handleOpenServiceModal('srv-b');
    } else if (target === 'register-agency') {
      setAuthModalState({ isOpen: true, mode: 'register', role: 'agency' });
    } else if (target === 'register-partner') {
      setAuthModalState({ isOpen: true, mode: 'register', role: 'partner' });
    } else if (target === 'pricing') {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'search-jobs') {
      handleOpenSearchWithParams();
    }
  };

  // Plan Selection
  const handleSelectPlan = (plan: PricingPlan) => {
    if (plan.id === 'plan-free') {
      setEmployerSubscription({
        planType: 'free',
        planName: 'Starter Free (1 Post/Week)',
        isPaid: false,
        activatedAt: new Date().toISOString()
      });
      showToast('🎉 Free Starter Plan selected (1 free post every 7 days)! Opening job posting form...');
      handleOpenPostJob('company');
    } else if (plan.category === 'enterprise') {
      handleOpenServiceModal('srv-b');
    } else {
      setEmployerSubscription({
        planType: 'growth',
        planName: plan.name,
        isPaid: true,
        activatedAt: new Date().toISOString()
      });
      handleOpenPostJob('company');
    }
  };

  return (
    <div dir={dir} className="min-h-screen bg-[#F8FAFC] dark:bg-[#090d16] text-slate-900 dark:text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white transition-colors duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B4A] dark:bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 dark:border-slate-600 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header (Top Bar Contract) */}
      <Header
        onOpenAuth={(mode, role) => setAuthModalState({ isOpen: true, mode, role })}
        onOpenPostJob={handleOpenPostJob}
        onOpenSearch={(params) => handleOpenSearchWithParams(params)}
        onOpenServicesModal={handleOpenServiceModal}
        onOpenApiDocs={() => setApiDocsOpen(true)}
        onOpenAiAssistant={(tab) => setAiAssistantState({ isOpen: true, tab: tab || 'candidate' })}
        savedJobsCount={savedJobIds.length}
        onOpenSavedJobs={() => handleOpenSearchWithParams({ keyword: '' })}
        onOpenJobAlerts={() => handleOpenJobAlerts()}
        onOpenCandidateDashboard={() => setCandidateDashboardOpen(true)}
        onOpenRecruiterDashboard={() => setRecruiterDashboardOpen(true)}
        onOpenResumeBuilder={() => setResumeBuilderOpen(true)}
        onOpenPaymentGateways={(persona, planId) => setPaymentModalState({ isOpen: true, persona: persona || 'employer', planId })}
        savedCandidatesCount={savedCandidates.length}
        alertsCount={jobAlerts.filter(a => a.isActive).length}
        currentUser={currentUser}
        onSignOut={() => {
          setCurrentUser(null);
          showToast('Signed out of NextSoftHR');
        }}
        onLinkedInSignIn={handleLinkedInSignIn}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Section 5: Hero Section */}
        <Hero
          onSearch={(params) => handleOpenSearchWithParams(params)}
          onOpenEmployerFlow={() => setAuthModalState({ isOpen: true, mode: 'register', role: 'employer' })}
          onOpenServicesModal={() => handleOpenServiceModal('srv-b')}
          onOpenPostJob={handleOpenPostJob}
          onSelectCategoryQuick={(category) => handleOpenSearchWithParams({ category })}
          onOpenAiAssistant={(tab) => setAiAssistantState({ isOpen: true, tab: tab || 'candidate' })}
          totalJobsCount={jobs.length}
        />

        {/* Section 6: Audience Selection (4 User Journeys) */}
        <AudienceSelector
          onSelectRoleJourney={(role) => setAuthModalState({ isOpen: true, mode: 'register', role })}
          onOpenSearch={() => handleOpenSearchWithParams()}
          onOpenEmployerModal={() => setAuthModalState({ isOpen: true, mode: 'register', role: 'employer' })}
          onOpenAuth={(mode, role) => setAuthModalState({ isOpen: true, mode, role })}
          onOpenCandidateDashboard={() => setCandidateDashboardOpen(true)}
          onOpenRecruiterPortal={() => setRecruiterDashboardOpen(true)}
        />

        {/* Section 7: Featured Jobs */}
        <FeaturedJobs
          jobs={jobs}
          onSelectJob={(job) => setSelectedJob(job)}
          onToggleSaveJob={handleToggleSaveJob}
          savedJobIds={savedJobIds}
          appliedJobIds={appliedJobIds}
          onViewAllJobs={(filterType) => handleOpenSearchWithParams({ employmentType: filterType })}
          onApplyDirect={(job) => setSelectedJob(job)}
          onOpenJobAlerts={handleOpenJobAlerts}
          onQuickSubscribeAlert={handleQuickSubscribeAlert}
        />

        {/* Section 8: Category & Industry Browser */}
        <CategoryBrowser
          categories={JOB_CATEGORIES}
          onSelectCategory={(categoryName) => handleOpenSearchWithParams({ category: categoryName })}
        />

        {/* Section 9: Featured Companies */}
        <FeaturedCompanies
          companies={companies}
          onSelectCompany={(company) => setSelectedCompany(company)}
          onOpenEmployerRegister={() => setAuthModalState({ isOpen: true, mode: 'register', role: 'employer' })}
        />

        {/* Section 10: Recruitment & Outsourcing Services (A-F) */}
        <RecruitmentServices
          services={RECRUITMENT_SERVICES}
          onRequestService={(serviceId) => handleOpenServiceModal(serviceId)}
        />

        {/* Section 11: Dedicated Employer Conversion */}
        <EmployerConversion
          onCreateEmployerAccount={() => setAuthModalState({ isOpen: true, mode: 'register', role: 'employer' })}
          onSpeakToTeam={() => handleOpenServiceModal('srv-b')}
        />

        {/* Section 12: Recruiter & Agency Conversion */}
        <AgencyConversion
          onJoinRecruiterNetwork={() => setAuthModalState({ isOpen: true, mode: 'register', role: 'agency' })}
          onExploreAgencyFeatures={() => handleOpenServiceModal('srv-d')}
        />

        {/* Section 13: How It Works */}
        <HowItWorks />

        {/* Section 14: AI-Powered Recruitment & Career Assistance */}
        <AiRecruitmentAssistant
          jobs={jobs}
          onSelectJob={(job) => setSelectedJob(job)}
          onOpenSearchWithKeyword={(kw) => handleOpenSearchWithParams({ keyword: kw })}
          onOpenFullAiModal={(tab) => setAiAssistantState({ isOpen: true, tab: tab || 'candidate' })}
        />

        {/* Section 15: Trust & Security */}
        <TrustAndSecurity />

        {/* Section 16: Career Resources */}
        <CareerResources
          articles={ARTICLES}
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* Section 17: Pricing & Recruitment Packages */}
        <PricingPackages
          plans={PRICING_PLANS}
          onSelectPlan={handleSelectPlan}
          onOpenPaymentGateways={(persona, planId) => setPaymentModalState({ isOpen: true, persona: persona || 'employer', planId })}
          onSelectCandidatePlan={handleSelectCandidatePlan}
          currentCandidatePlan={candidateSubscription.planType}
          onToast={showToast}
        />

        {/* Section 18: FAQ Accordion */}
        <FaqSection
          faqs={FAQS}
          onActionClick={handleFaqAction}
        />
      </main>

      {/* Section 19: Comprehensive Footer */}
      <Footer
        onOpenSearch={() => handleOpenSearchWithParams()}
        onOpenAuth={(mode, role) => setAuthModalState({ isOpen: true, mode, role })}
        onOpenPostJob={() => handleOpenPostJob('company')}
        onOpenServicesModal={handleOpenServiceModal}
        onOpenSavedJobs={() => handleOpenSearchWithParams()}
        onOpenApiDocs={() => setApiDocsOpen(true)}
      />

      {/* --- Interactive Modals --- */}

      {/* Sign In & Register Modal (Section 20) */}
      <AuthModal
        isOpen={authModalState.isOpen}
        onClose={() => setAuthModalState(prev => ({ ...prev, isOpen: false }))}
        initialMode={authModalState.mode}
        initialRole={authModalState.role}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Signed in as ${user.name} (${user.role.replace('_', ' ')})`);
        }}
      />

      {/* Full Job Search Directory (Section 21) */}
      <JobSearchModalOrPage
        isOpen={searchModalState.isOpen}
        onClose={() => setSearchModalState({ isOpen: false, params: {} })}
        jobs={jobs}
        initialParams={searchModalState.params}
        onSelectJob={(job) => setSelectedJob(job)}
        onToggleSaveJob={handleToggleSaveJob}
        savedJobIds={savedJobIds}
        appliedJobIds={appliedJobIds}
        onApplyDirect={(job) => setSelectedJob(job)}
        onOpenJobAlerts={handleOpenJobAlerts}
      />

      {/* Subscribe to Job Alerts Modal */}
      <JobAlertModal
        isOpen={jobAlertModalState.isOpen}
        onClose={() => setJobAlertModalState(prev => ({ ...prev, isOpen: false }))}
        jobs={jobs}
        companies={companies}
        alerts={jobAlerts}
        onSaveAlert={handleSaveAlert}
        onToggleAlertStatus={handleToggleAlertStatus}
        onDeleteAlert={handleDeleteAlert}
        initialKeyword={jobAlertModalState.initialKeyword}
        initialLocation={jobAlertModalState.initialLocation}
        initialCategory={jobAlertModalState.initialCategory}
        initialEmail={jobAlertModalState.initialEmail || currentUser?.email || ''}
        onSelectJob={(job) => {
          setJobAlertModalState(prev => ({ ...prev, isOpen: false }));
          setSelectedJob(job);
        }}
      />

      {/* Candidate Career Dashboard with Mock NLP Resume Parser, Resume Score, Verify Skills & Interview Calendar */}
      <CandidateDashboardModal
        isOpen={candidateDashboardOpen}
        onClose={() => setCandidateDashboardOpen(false)}
        jobs={jobs}
        savedJobIds={savedJobIds}
        submittedApplications={submittedApplications}
        onApplySubmit={handleApplicationSubmit}
        parsedProfile={parsedResumeProfile}
        onSaveParsedProfile={handleSaveParsedProfile}
        onSelectJob={(job) => {
          setCandidateDashboardOpen(false);
          setSelectedJob(job);
        }}
        onToast={showToast}
        interviews={interviews}
        onUpdateInterviewStatus={handleUpdateInterviewStatus}
        recruiterFeedbackList={recruiterFeedbackList}
        candidateSubscription={candidateSubscription}
        onSelectCandidatePlan={handleSelectCandidatePlan}
        onOpenPaymentGateways={(persona, planId) => setPaymentModalState({ isOpen: true, persona: persona || 'candidate', planId })}
      />

      {/* Employer & Recruiter Dashboard with Saved Candidates tab & Talent Search */}
      <EmployerRecruiterDashboardModal
        isOpen={recruiterDashboardOpen}
        onClose={() => setRecruiterDashboardOpen(false)}
        jobs={jobs}
        savedCandidates={savedCandidates}
        onToggleSaveCandidate={handleToggleSaveCandidate}
        onUpdateCandidateNote={handleUpdateCandidateNote}
        onScheduleCandidateInterview={(cand) => {
          setRecruiterDashboardOpen(false);
          const targetJob = jobs.find(j => j.title.toLowerCase().includes('engineer') || j.title.toLowerCase().includes('hr')) || jobs[0];
          setSelectedJob(targetJob);
          showToast(`Opening interview scheduler for ${cand.candidateName}...`);
        }}
        onToast={showToast}
      />

      {/* Job Details Modal with Application Form and Interview Scheduler */}
      <JobDetailsModal
        job={selectedJob}
        company={companies.find(c => c.id === selectedJob?.companyId || c.name === selectedJob?.companyName)}
        allJobs={jobs}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        isSaved={selectedJob ? savedJobIds.includes(selectedJob.id) : false}
        onToggleSave={handleToggleSaveJob}
        onApplySubmit={handleApplicationSubmit}
        interviews={interviews}
        onScheduleInterview={handleSaveInterview}
        onUpdateInterviewStatus={handleUpdateInterviewStatus}
        parsedProfile={parsedResumeProfile}
        onSaveParsedProfile={handleSaveParsedProfile}
        onToast={showToast}
        onSelectJob={(newJob) => setSelectedJob(newJob)}
      />

      {/* Company Profile Modal */}
      <CompanyModal
        company={selectedCompany}
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        openJobs={jobs}
        onSelectJob={(job) => {
          setSelectedCompany(null);
          setSelectedJob(job);
        }}
      />

      {/* Post a Vacancy Modal with Persona Options */}
      <PostJobModal
        isOpen={postJobModalState.isOpen}
        onClose={() => setPostJobModalState(prev => ({ ...prev, isOpen: false }))}
        onJobCreated={handleJobCreated}
        initialPosterType={postJobModalState.posterType}
        currentUser={currentUser}
        onOpenAuth={(mode, role) => setAuthModalState({ isOpen: true, mode, role: role || 'employer' })}
        onOpenPaymentGateways={(persona, planId) => setPaymentModalState({ isOpen: true, persona: persona || 'employer', planId })}
        subscription={employerSubscription}
        onUpdateSubscription={setEmployerSubscription}
        postedJobRecords={postedJobRecords}
        onRecordJobPosted={handleRecordJobPosted}
        onToast={showToast}
      />

      {/* Recruitment Consultation / Service Request Modal */}
      <ServiceRequestModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />

      {/* Career Guide Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      {/* Deliverable 9 & 10: Technical API Architecture & Permissions Modal */}
      <ApiArchitectureModal
        isOpen={apiDocsOpen}
        onClose={() => setApiDocsOpen(false)}
      />

      {/* Full AI Talent & Career Copilot Modal */}
      <AiAssistantModal
        isOpen={aiAssistantState.isOpen}
        onClose={() => setAiAssistantState(prev => ({ ...prev, isOpen: false }))}
        jobs={jobs}
        onSelectJob={(job) => {
          setAiAssistantState(prev => ({ ...prev, isOpen: false }));
          setSelectedJob(job);
        }}
        onPublishJobDirectly={(newJob) => {
          handleJobCreated(newJob);
          showToast(`Job "${newJob.title}" generated by AI and published!`);
        }}
        initialTab={aiAssistantState.tab}
      />

      {/* Left-Side Floating Scroll Up & Down Navigation Controller */}
      <ScrollNavigationControl />

      {/* Floating Live Chat Widget */}
      <FloatingLiveChat
        onOpenPostJob={() => handleOpenPostJob('company')}
        onOpenSearch={(params) => handleOpenSearchWithParams(params)}
        onOpenServicesModal={handleOpenServiceModal}
        onOpenAuth={(mode, role) => setAuthModalState({ isOpen: true, mode, role })}
        onOpenAiAssistant={(tab) => setAiAssistantState({ isOpen: true, tab: tab || 'candidate' })}
      />

      {/* Step-by-Step Resume Builder Wizard & PDF Generator */}
      <ResumeBuilderModal
        isOpen={resumeBuilderOpen}
        onClose={() => setResumeBuilderOpen(false)}
        initialProfile={parsedResumeProfile}
        onSaveToProfile={handleSaveParsedProfile}
        onToast={showToast}
      />

      {/* Regional Payment Gateway Modal (West/East/South/Other Africa & Global) */}
      <RegionalPaymentGatewayModal
        isOpen={paymentModalState.isOpen}
        onClose={() => setPaymentModalState(prev => ({ ...prev, isOpen: false }))}
        initialPersona={paymentModalState.persona}
        initialPlanId={paymentModalState.planId}
        onSubscriptionSuccess={(planName, persona, gateway, txRef) => {
          if (persona === 'candidate') {
            const planLower = planName.toLowerCase();
            if (planLower.includes('pro')) {
              handleSelectCandidatePlan('talent_pro', 'Talent Pro', '₦15,000');
            } else if (planLower.includes('executive') || planLower.includes('vip')) {
              handleSelectCandidatePlan('executive_vip', 'Executive VIP Mandate', '₦45,000');
            } else {
              handleSelectCandidatePlan('basic_free', 'Basic Talent', '₦0');
            }
          }
          showToast(`🎉 Subscription to ${planName} active via ${gateway}! Reference: ${txRef}`);
        }}
        onToast={showToast}
      />

    </div>
  );
}

export default App;
