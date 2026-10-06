export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type TrainingFormat = 'Self-Paced' | 'Live Instructor-Led' | 'Corporate' | 'On-Site';

export interface Lesson {
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
}

export interface Module {
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface CourseSessionDate {
  date: string;
  time: string;
  timezone: string;
  instructor: string;
  seatsLeft: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  subcategory: string;
  skillLevel: SkillLevel;
  duration: string;
  format: TrainingFormat;
  priceUSD: number;
  priceNGN: number;
  instructor: {
    name: string;
    role: string;
    photo: string;
    organization: string;
    bio: string;
  };
  image: string;
  description: string;
  longOverview: string;
  whatYouWillLearn: string[];
  learningObjectives: string[];
  modules: Module[];
  certificateIncluded: boolean;
  prerequisites: string[];
  targetAudience: string[];
  upcomingDates: CourseSessionDate[];
  rating: number;
  reviewsCount: number;
  popular?: boolean;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  description: string;
  courseCount: number;
  subcategories: string[];
}

export interface LearningPathStep {
  order: number;
  title: string;
  description: string;
  duration: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  badge: string;
  steps: LearningPathStep[];
  totalCourses: number;
  totalDuration: string;
  targetRole: string;
}

export interface TrainingBundle {
  id: string;
  title: string;
  description: string;
  courses: string[];
  totalDuration: string;
  originalPriceUSD: number;
  bundlePriceUSD: number;
  originalPriceNGN: number;
  bundlePriceNGN: number;
  savingsPercentage: number;
  certificateAvailable: boolean;
}

export interface UpcomingSession {
  id: string;
  courseId: string;
  courseTitle: string;
  date: string;
  time: string;
  duration: string;
  instructor: string;
  instructorRole: string;
  format: TrainingFormat;
  location: string;
  availableSeats: number;
  priceUSD: number;
  priceNGN: number;
  registrationStatus: 'Open' | 'Filling Fast' | 'Limited Seats';
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  organization: string;
  yearsExperience: number;
  photo: string;
  bio: string;
  coursesTaught: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  courseCompleted: string;
  content: string;
  photo: string;
  rating: number;
  verifiedStudent: boolean;
}

export interface EnrolledCourse {
  courseId: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessed: string;
  nextLesson: string;
  certificateEarned?: boolean;
  certificateId?: string;
  issuedDate?: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  jobTitle: string;
  country: string;
}

export interface CertificateData {
  id: string;
  certificateId: string;
  courseName: string;
  learnerName: string;
  completionDate: string;
  grade: string;
  instructorName: string;
  instructorRole: string;
  credentialUrl: string;
}

export interface QuizQuestion {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export type CurrencyCode =
  | 'NGN'
  | 'USD'
  | 'GBP'
  | 'EUR'
  | 'KES'
  | 'ZAR'
  | 'GHS'
  | 'MAD'
  | 'XAF'
  | 'AED'
  | 'UGX'
  | 'TZS'
  | 'RWF'
  | 'ZMW'
  | 'EGP'
  | 'ZIP';

