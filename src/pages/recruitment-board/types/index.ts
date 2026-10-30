export type JobType = 'Full-Time' | 'Part-Time' | 'Contract' | 'Remote' | 'Hybrid' | 'Internship';

export type ExperienceLevel = 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Lead / Director' | 'Executive';

export type UserRole = 'job_seeker' | 'employer' | 'agency' | 'partner';

export type PosterType = 'individual' | 'company' | 'agency' | 'headhunter';

export interface PosterDetails {
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  isConfidential?: boolean;
  agencyClientName?: string;
  headhunterFirm?: string;
  individualTitle?: string;
  retainedMandateLevel?: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  companyInitials: string;
  isVerified: boolean;
  location: string;
  workArrangement: 'Remote' | 'Hybrid' | 'On-Site';
  employmentType: JobType;
  salaryRange: string;
  currency: 'NGN' | 'USD' | 'EUR' | 'GBP' | 'KES' | 'GHS' | 'ZAR' | 'CAD' | 'RWF' | 'AED' | string;
  experienceLevel: ExperienceLevel;
  category: string;
  industry: string;
  datePosted: string;
  deadline?: string;
  isFeatured?: boolean;
  isUrgent?: boolean;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  applicantCount: number;
  recruiterSource?: 'Direct Employer' | 'Individual / Founder' | 'Partner Agency' | 'Executive Headhunter' | 'NextSoftHR RPO' | string;
  posterType?: PosterType;
  posterDetails?: PosterDetails;
  shift?: 'Day Shift' | 'Night Shift' | 'Flexible / Rotational' | 'Weekend Shift' | string;
  genderPreference?: 'All Genders Welcome' | 'Female-Preferred / Diversity Initiative' | 'Equal Opportunity' | string;
  degreeLevel?: 'Any Level' | 'High School / SSCE / OND' | "Bachelor's / B.Sc / HND" | "Master's / M.Sc / MBA" | 'Doctorate / Ph.D' | 'Professional Certification' | string;
  skills?: string[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  initials: string;
  industry: string;
  location: string;
  headquarters: string;
  employeeCount: string;
  website: string;
  isVerified: boolean;
  description: string;
  activeVacanciesCount: number;
  perks: string[];
}

export interface JobCategory {
  id: string;
  name: string;
  iconName: string;
  jobCount: number;
  description: string;
}

export interface RecruitmentService {
  id: string;
  code: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  title: string;
  subtitle: string;
  targetAudience: string;
  deliverables: string[];
  ctaLabel: string;
  iconName: string;
  badge?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  category: 'posting' | 'software' | 'agency' | 'enterprise';
  price: string;
  period: string;
  description: string;
  highlighted?: boolean;
  features: string[];
  ctaText: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'seekers' | 'employers' | 'agencies' | 'services';
  actionLabel?: string;
  actionTarget?: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  readTime: string;
  publishedDate: string;
  tags: string[];
}

export interface CandidateApplication {
  id?: string;
  jobId: string;
  jobTitle?: string;
  companyName?: string;
  fullName: string;
  email: string;
  phone: string;
  currentRole: string;
  linkedinUrl?: string;
  coverNote: string;
  cvFileName?: string;
  resumeFileName?: string;
  appliedAt: string;
  status?: 'reviewing' | 'shortlisted' | 'interview' | 'offered' | 'rejected' | string;
  extractedSkills?: string[];
  yearsOfExperience?: string | number;
  matchScore?: number;
  location?: string;
}

export interface ParsedResumeProfile {
  fileName: string;
  fileSize?: string;
  parsedAt: string;
  fullName: string;
  email: string;
  phone: string;
  currentRole: string;
  yearsOfExperience: string;
  extractedSkills: string[];
  education: string;
  summary: string;
  confidenceScore: number;
  pastCompanies?: string[];
  certifications?: string[];
  verifiedSkills?: VerifiedSkill[];
  externalCertifications?: ExternalCertification[];
}

export interface JobAlert {
  id: string;
  email: string;
  keyword: string;
  location: string;
  category?: string;
  workArrangement?: 'Any' | 'Remote' | 'Hybrid' | 'On-Site';
  frequency: 'instant' | 'daily' | 'weekly';
  createdAt: string;
  isActive: boolean;
  matchCount?: number;
  minSalary?: number;
  salaryCurrency?: string;
  preferredCompanySizes?: string[];
  diversityMetrics?: string[];
  salaryTrendAlert?: boolean;
  targetRoleOrIndustry?: string;
  salaryShiftThresholdPercent?: number; // e.g. 5
  currentBenchmarkSalary?: string;
  lastMarketShiftPercent?: number;
}

export interface JobAlertNotification {
  id: string;
  alertId: string;
  recipientEmail: string;
  job: Job;
  matchedReason: string;
  sentAt: string;
}

export type InterviewStatus = 'proposed' | 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';

export type InterviewType = 
  | 'Video Call (Google Meet)'
  | 'Technical Screen' 
  | 'On-Site Assessment' 
  | 'Executive Panel'
  | 'HR Cultural Fit';

export interface InterviewSlot {
  id: string;
  datetime: string;
  formattedDate: string;
  formattedTime: string;
  durationMinutes: number;
}

export interface VerifiedSkill {
  name: string;
  verifiedAt: string;
  score?: number;
  type: 'assessment' | 'certification';
  certName?: string;
  issuer?: string;
}

export interface ExternalCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  skillsVerified: string[];
  isVerified: boolean;
}

export interface SavedCandidate {
  id: string;
  candidateName: string;
  email: string;
  phone?: string;
  currentRole: string;
  experienceYears: string;
  location: string;
  extractedSkills: string[];
  verifiedSkills: VerifiedSkill[];
  certifications?: string[];
  notes?: string;
  savedAt: string;
  sourceJobTitle?: string;
  matchScore?: number;
  avatarColor?: string;
}

export interface ScheduledInterview {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  candidateName: string;
  candidateEmail: string;
  recruiterName: string;
  recruiterEmail: string;
  interviewType: InterviewType;
  proposedSlots: InterviewSlot[];
  confirmedSlotId?: string;
  confirmedSlot?: InterviewSlot;
  meetingLink?: string;
  location?: string;
  notes?: string;
  status: InterviewStatus;
  createdAt: string;
  updatedAt: string;
  candidateRescheduleSlots?: InterviewSlot[];
  rescheduleReason?: string;
  rescheduledAt?: string;
  recruiterFeedback?: RecruiterPostInterviewFeedback;
}

export interface RecruiterCriterionRating {
  criterion: string;
  score: number; // 1 to 5
  description: string;
}

export interface RecruiterPostInterviewFeedback {
  id: string;
  interviewId: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  candidateName: string;
  recruiterName: string;
  recruiterRole: string;
  recruiterAvatar?: string;
  interviewDate: string;
  interviewType: string;
  completedAt: string;
  overallScore: number; // 1 to 5
  recommendation: 'Strong Hire' | 'Hire / Proceed to Next Stage' | 'Consider for Future Roles' | 'Constructive Feedback Provided';
  recommendationColor: string;
  criteriaRatings: RecruiterCriterionRating[];
  summaryNotes: string;
  keyStrengths: string[];
  growthAreas: string[];
  nextSteps: string;
  feedbackSharedDate: string;
  isVerified: boolean;
  candidateRead?: boolean;
}

export interface InterviewFeedback {
  id: string;
  interviewId?: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  interviewType: string;
  isAnonymous: boolean;
  candidateName?: string;
  candidateRole?: string;
  overallRating: number; // 1 to 5
  professionalismRating: number; // 1 to 5
  clarityRating: number; // 1 to 5
  relevanceRating: number; // 1 to 5
  punctualityRating: number; // 1 to 5
  difficulty: 'Easy' | 'Fair & Balanced' | 'Challenging' | 'Very Tough';
  wouldRecommend: boolean;
  feedbackTimeline: 'Prompt (< 48 hrs)' | 'Reasonable (3-5 days)' | 'Slow (> 1 week)' | 'Still Awaiting';
  whatWentWell: string;
  constructiveFeedback: string;
  adviceForCandidates?: string;
  submittedAt: string;
  reviewedByRecruiter?: boolean;
}

export type EmployerPlanType = 'none' | 'free' | 'growth' | 'enterprise' | 'recruiter' | 'headhunter';

export interface EmployerSubscription {
  planType: EmployerPlanType;
  planName: string;
  isPaid: boolean;
  activatedAt: string;
  expiresAt?: string;
}

export interface PostedJobRecord {
  id: string;
  title: string;
  category: string;
  postedAt: string;
  planType: EmployerPlanType;
  userEmail: string;
}

export type CandidatePlanType = 'basic_free' | 'talent_pro' | 'executive_vip';

export interface CandidateSubscription {
  planType: CandidatePlanType;
  planName: string;
  isPaid: boolean;
  priceFormatted: string;
  activatedAt: string;
  expiresAt?: string;
  features: string[];
}

export interface ApplicationMessage {
  id: string;
  applicationId: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  candidateName: string;
  candidateEmail: string;
  senderRole: 'recruiter' | 'candidate';
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  read: boolean;
  quickCategory?: 'screening' | 'interview_clarification' | 'document_request' | 'offer_inquiry' | 'general';
  attachmentName?: string;
}

export interface ApplicationConversation {
  applicationId: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  candidateName: string;
  candidateEmail: string;
  lastMessageAt: string;
  lastMessageText: string;
  unreadCountCandidate: number;
  unreadCountRecruiter: number;
  messages: ApplicationMessage[];
}
