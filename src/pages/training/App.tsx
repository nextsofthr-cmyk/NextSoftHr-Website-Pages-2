import React, { useState, useMemo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CurrencyProvider, useCurrency } from './context/CurrencyContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { CourseSearchSection } from './components/CourseSearchSection';
import { TrainingCategories } from './components/TrainingCategories';
import { PopularCourses } from './components/PopularCourses';
import { CareerRoadmapTool } from './components/CareerRoadmapTool';
import { TrainingFormatsSection } from './components/TrainingFormatsSection';
import { WhyNextSoftHR } from './components/WhyNextSoftHR';
import { CorporateTrainingSection } from './components/CorporateTrainingSection';
import { TrainingBundlesSection } from './components/TrainingBundlesSection';
import { UpcomingTrainingSection } from './components/UpcomingTrainingSection';
import { InstructorsSection } from './components/InstructorsSection';
import { StudentSuccessSection } from './components/StudentSuccessSection';
import { AIPoweredLearningSection } from './components/AIPoweredLearningSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { CourseDetailModal } from './components/CourseDetailModal';
import { RegistrationModal } from './components/RegistrationModal';
import { CorporateModal } from './components/CorporateModal';
import { CertificateModal } from './components/CertificateModal';
import { LearnerPortal } from './components/LearnerPortal';
import { AITrainingAdvisorModal } from './components/AITrainingAdvisorModal';
import { LiveChatWidget } from './components/LiveChatWidget';

import { COURSES } from './data/academyData';
import { Course, EnrolledCourse, CertificateData, LearningPath, TrainingBundle, UpcomingSession } from './types';

function AcademyApp() {
  // Global State from Currency Provider
  const { currency } = useCurrency();

  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedCertification, setSelectedCertification] = useState<boolean | null>(null);

  // Modals & Drawers State
  const [detailCourse, setDetailCourse] = useState<Course | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [regPreselectedCourse, setRegPreselectedCourse] = useState<Course | null>(null);
  const [isCorporateOpen, setIsCorporateOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isAIAdvisorOpen, setIsAIAdvisorOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState<CertificateData | null>(null);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  // Enrolled Courses Tracking State
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([
    {
      courseId: 'c2',
      progress: 72,
      completedLessons: 14,
      totalLessons: 20,
      lastAccessed: 'Today at 09:30 AM',
      nextLesson: 'PAYE Tax Tables & Deductions',
    },
    {
      courseId: 'c1',
      progress: 100,
      completedLessons: 16,
      totalLessons: 16,
      lastAccessed: '3 days ago',
      nextLesson: 'Completed',
      certificateEarned: true,
      certificateId: 'NSHR-2026-8492',
    },
    {
      courseId: 'c8',
      progress: 35,
      completedLessons: 6,
      totalLessons: 16,
      lastAccessed: 'Yesterday',
      nextLesson: 'Generative AI Policy Drafting',
    },
  ]);

  // Filtering Logic
  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      // Search Term Filter
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDesc = course.description.toLowerCase().includes(query);
        const matchesCategory = course.category.toLowerCase().includes(query);
        const matchesSubcategory = course.subcategory.toLowerCase().includes(query);
        const matchesInstructor = course.instructor.name.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesSubcategory && !matchesInstructor) {
          return false;
        }
      }

      // Category Filter
      if (selectedCategory !== 'All' && course.category !== selectedCategory) {
        return false;
      }

      // Skill Level Filter
      if (selectedSkillLevel !== 'All' && course.skillLevel !== selectedSkillLevel) {
        return false;
      }

      // Training Format Filter
      if (selectedFormat !== 'All' && course.format !== selectedFormat) {
        return false;
      }

      // Certification Filter
      if (selectedCertification !== null && course.certificateIncluded !== selectedCertification) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, selectedSkillLevel, selectedFormat, selectedCertification]);

  // Action Handlers
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (catName: string) => {
    setSelectedCategory(catName);
    handleScrollToSection('courses-section');
  };

  const handleSelectFormatFromFormatsSection = (fmtName: string) => {
    setSelectedFormat(fmtName);
    handleScrollToSection('courses-section');
  };

  const handleQuickCourseSelect = (courseId: string) => {
    const target = COURSES.find((c) => c.id === courseId);
    if (target) {
      setDetailCourse(target);
    }
  };

  const handleEnrollCourse = (course: Course) => {
    setDetailCourse(null);
    setRegPreselectedCourse(course);
    setIsRegistrationOpen(true);
  };

  const handleStartLearningPath = (path: LearningPath) => {
    const targetCourse = COURSES.find(
      (c) => c.title.toLowerCase().includes(path.steps[0].title.toLowerCase())
    ) || COURSES[0];
    setRegPreselectedCourse(targetCourse);
    setIsRegistrationOpen(true);
  };

  const handleSelectBundle = (bundle: TrainingBundle) => {
    const firstCourseName = bundle.courses[0];
    const target = COURSES.find((c) => c.title === firstCourseName) || COURSES[0];
    setRegPreselectedCourse(target);
    setIsRegistrationOpen(true);
  };

  const handleRegisterSession = (session: UpcomingSession) => {
    const target = COURSES.find((c) => c.id === session.courseId) || COURSES[0];
    setRegPreselectedCourse(target);
    setIsRegistrationOpen(true);
  };

  const handleRegistrationSuccess = (courseId: string) => {
    setEnrolledCourses((prev) => {
      if (prev.some((item) => item.courseId === courseId)) return prev;
      return [
        {
          courseId,
          progress: 5,
          completedLessons: 1,
          totalLessons: 16,
          lastAccessed: 'Just now',
          nextLesson: 'Module 1: Orientation & Frameworks',
        },
        ...prev,
      ];
    });
  };

  const handleUpdateCourseProgress = (courseId: string, delta: number) => {
    setEnrolledCourses((prev) =>
      prev.map((c) => {
        if (c.courseId === courseId) {
          const newProgress = Math.min(100, c.progress + delta);
          return {
            ...c,
            progress: newProgress,
            lastAccessed: 'Just now',
            certificateEarned: newProgress === 100,
          };
        }
        return c;
      })
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedSkillLevel('All');
    setSelectedFormat('All');
    setSelectedCertification(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Sticky Navigation */}
      <Navbar
        onNavigate={handleScrollToSection}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenCorporate={() => setIsCorporateOpen(true)}
        onOpenRegister={() => {
          setRegPreselectedCourse(COURSES[0]);
          setIsRegistrationOpen(true);
        }}
        onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        onOpenLiveChat={() => setIsLiveChatOpen(true)}
        enrolledCount={enrolledCourses.length}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Section 3: Hero Section */}
        <HeroSection
          onExploreTraining={() => handleScrollToSection('courses-section')}
          onViewCourses={() => handleScrollToSection('popular-courses-container')}
          onCorporateTraining={() => setIsCorporateOpen(true)}
          onSelectCourseQuick={handleQuickCourseSelect}
          onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        />

        {/* Section 4: Trust / Value Strip */}
        <TrustStrip />

        {/* Section 5: Course Search Section */}
        <CourseSearchSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedSkillLevel={selectedSkillLevel}
          onSkillLevelChange={setSelectedSkillLevel}
          selectedFormat={selectedFormat}
          onFormatChange={setSelectedFormat}
          selectedCertification={selectedCertification}
          onCertificationChange={setSelectedCertification}
          totalFilteredCount={filteredCourses.length}
          onResetFilters={handleResetFilters}
          onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        />

        {/* Section 6: Featured Training Categories */}
        <TrainingCategories onSelectCategory={handleSelectCategory} />

        {/* Section 7: Popular Courses */}
        <PopularCourses
          courses={filteredCourses}
          currency={currency}
          onViewCourse={(c) => setDetailCourse(c)}
          onEnrollCourse={handleEnrollCourse}
        />

        {/* Section 8: Interactive Career Pathing & Professional Development Roadmap */}
        <CareerRoadmapTool
          enrolledCourses={enrolledCourses}
          onSelectCourse={(c) => setDetailCourse(c)}
          onEnrollCourse={handleEnrollCourse}
          onOpenLiveChat={() => setIsLiveChatOpen(true)}
          onOpenCorporate={() => setIsCorporateOpen(true)}
          currency={currency}
        />

        {/* Section 9: Learn Your Way (Training Formats) */}
        <TrainingFormatsSection
          onSelectFormat={handleSelectFormatFromFormatsSection}
          onOpenCorporate={() => setIsCorporateOpen(true)}
        />

        {/* Section 10: Why NextSoftHR Training */}
        <WhyNextSoftHR />

        {/* Section 12: Training For Businesses (Corporate) */}
        <CorporateTrainingSection onRequestCorporate={() => setIsCorporateOpen(true)} />

        {/* Section 13: Professional Learning Bundles */}
        <TrainingBundlesSection currency={currency} onSelectBundle={handleSelectBundle} />

        {/* Section 14: Upcoming Training Sessions (Calendar) */}
        <UpcomingTrainingSection
          currency={currency}
          onRegisterSession={handleRegisterSession}
          onViewSessionCourse={(courseId) => handleQuickCourseSelect(courseId)}
        />

        {/* Section 15: Experienced Instructors Faculty */}
        <InstructorsSection
          onSelectCourseByName={(courseName) => {
            setSearchTerm(courseName);
            handleScrollToSection('courses-section');
          }}
        />

        {/* Section 16: Student Success & Testimonials */}
        <StudentSuccessSection />

        {/* Section 19: AI-Powered Learning (Meet the Future of HR Learning) */}
        <AIPoweredLearningSection
          onExploreCourse={(courseId) => handleQuickCourseSelect(courseId)}
          onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        />

        {/* Section 20: Frequently Asked Questions */}
        <FaqSection onOpenLiveChat={() => setIsLiveChatOpen(true)} />

        {/* Section 21: Final CTA Section */}
        <FinalCtaSection
          onExploreCourses={() => handleScrollToSection('courses-section')}
          onRegisterNow={() => {
            setRegPreselectedCourse(COURSES[0]);
            setIsRegistrationOpen(true);
          }}
          onRequestCorporate={() => setIsCorporateOpen(true)}
        />
      </main>

      {/* Section 22: Footer */}
      <Footer
        onNavigateSection={handleScrollToSection}
        onFilterCategory={handleSelectCategory}
        onOpenCorporate={() => setIsCorporateOpen(true)}
      />

      {/* Real-Time Live Chat & Admissions Widget */}
      <LiveChatWidget
        isOpen={isLiveChatOpen}
        onToggle={() => setIsLiveChatOpen((prev) => !prev)}
        onOpenRegister={(course) => {
          setRegPreselectedCourse(course || COURSES[0]);
          setIsRegistrationOpen(true);
        }}
        onViewCourse={(course) => {
          setDetailCourse(course);
        }}
      />

      {/* MODAL 1: Course Details (Section 23) */}
      <CourseDetailModal
        course={detailCourse}
        onClose={() => setDetailCourse(null)}
        currency={currency}
        onEnroll={handleEnrollCourse}
        onRequestInfo={() => {
          setDetailCourse(null);
          setIsCorporateOpen(true);
        }}
      />

      {/* MODAL 2: Registration Flow (Section 24) */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        preSelectedCourse={regPreselectedCourse}
        currency={currency}
        onRegistrationSuccess={handleRegistrationSuccess}
        onOpenLearnerPortal={() => setIsPortalOpen(true)}
      />

      {/* MODAL 3: Corporate Request Form (Section 25) */}
      <CorporateModal
        isOpen={isCorporateOpen}
        onClose={() => setIsCorporateOpen(false)}
      />

      {/* MODAL 4: Certificate View & Print (Section 10) */}
      <CertificateModal
        isOpen={isCertificateOpen}
        certificate={activeCertificate}
        onClose={() => {
          setIsCertificateOpen(false);
          setActiveCertificate(null);
        }}
      />

      {/* MODAL 5: Learner Operations Portal & Knowledge Checks (Section 17 & 18) */}
      <LearnerPortal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        enrolledCoursesState={enrolledCourses}
        onUpdateCourseProgress={handleUpdateCourseProgress}
        onViewCertificate={(cert) => {
          setActiveCertificate(cert);
          setIsCertificateOpen(true);
        }}
        onOpenCareerRoadmap={() => handleScrollToSection('learning-paths')}
      />

      {/* MODAL 6: AI Training Advisor & Course Matcher (Section 19 / AI Assistance) */}
      <AITrainingAdvisorModal
        isOpen={isAIAdvisorOpen}
        onClose={() => setIsAIAdvisorOpen(false)}
        currency={currency}
        onSelectCourse={(course) => {
          setIsAIAdvisorOpen(false);
          setDetailCourse(course);
        }}
        onEnrollCourse={(course) => {
          setIsAIAdvisorOpen(false);
          handleEnrollCourse(course);
        }}
        onSelectPath={(path) => {
          setIsAIAdvisorOpen(false);
          handleStartLearningPath(path);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <AcademyApp />
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
