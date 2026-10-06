import React, { useState } from 'react';
import { NextSoftLogo } from './NextSoftLogo';
import { Course, EnrolledCourse, QuizQuestion, CertificateData } from '../types';
import { COURSES, SAMPLE_QUIZ_QUESTIONS } from '../data/academyData';
import {
  X,
  BookOpen,
  Award,
  CheckCircle2,
  PlayCircle,
  HelpCircle,
  User,
  GraduationCap,
  ChevronRight,
  RotateCcw,
  Compass,
} from 'lucide-react';

interface LearnerPortalProps {
  isOpen: boolean;
  onClose: () => void;
  enrolledCoursesState: EnrolledCourse[];
  onUpdateCourseProgress: (courseId: string, delta: number) => void;
  onViewCertificate: (cert: CertificateData) => void;
  onOpenCareerRoadmap?: () => void;
}

export const LearnerPortal: React.FC<LearnerPortalProps> = ({
  isOpen,
  onClose,
  enrolledCoursesState,
  onUpdateCourseProgress,
  onViewCertificate,
  onOpenCareerRoadmap,
}) => {
  const [activeTab, setActiveTab] = useState<'my-courses' | 'assessment' | 'certificates' | 'profile'>('my-courses');
  
  // Interactive Assessment State (Section 18)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Lesson player simulation state
  const [selectedCourseForLearning, setSelectedCourseForLearning] = useState<Course | null>(
    COURSES.find((c) => c.id === 'c2') || COURSES[0]
  );
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  if (!isOpen) return null;

  const currentQuiz: QuizQuestion = SAMPLE_QUIZ_QUESTIONS[currentQuizIndex];

  const handleAnswerSubmit = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
    if (optionIndex === currentQuiz.correctIndex) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < SAMPLE_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-5">
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Portal Navigation Header */}
        <div className="bg-[#0B2540] dark:bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <NextSoftLogo variant="white" />
            <div className="hidden sm:block h-6 w-px bg-slate-700" />
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-lime-300 font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>Learner Operations Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-white block">Chidinma Osuagwu</span>
              <span className="text-[10px] text-slate-400">Head of People Ops · FinBridge</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Portal Horizontal Tabs */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50 dark:bg-slate-900 flex-shrink-0 overflow-x-auto">
          {[
            { id: 'my-courses', label: 'My Enrolled Courses & Lessons', icon: BookOpen },
            { id: 'assessment', label: 'Knowledge Checks & Quizzes', icon: HelpCircle },
            { id: 'certificates', label: 'Earned Certificates', icon: Award },
            { id: 'profile', label: 'Student Profile & Calendar', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#0F4C81] dark:border-[#84CC16] text-[#0F4C81] dark:text-[#84CC16] bg-white dark:bg-slate-800/80'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Portal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* TAB 1: MY COURSES & INTERACTIVE LESSONS */}
          {activeTab === 'my-courses' && (
            <div className="space-y-6">
              
              {/* Quick Progress Summary Cards (matching Section 17 examples) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60">
                  <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">In Progress</span>
                  <h4 className="text-sm font-bold text-[#0F4C81] dark:text-blue-300 mt-1">Payroll Administration</h4>
                  <div className="mt-3 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Course Progress</span>
                    <span>72% Complete</span>
                  </div>
                  <div className="w-full bg-blue-200 dark:bg-slate-700 h-2 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-[#0F4C81] dark:bg-blue-500 h-full rounded-full w-[72%]" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-lime-50/70 dark:bg-lime-950/40 border border-lime-200/80 dark:border-lime-800/60">
                  <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">Completed</span>
                  <h4 className="text-sm font-bold text-[#65A30D] dark:text-[#84CC16] mt-1">HR Fundamentals</h4>
                  <div className="mt-3 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Course Progress</span>
                    <span>100% Completed</span>
                  </div>
                  <div className="w-full bg-lime-200 dark:bg-slate-700 h-2 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-[#84CC16] h-full rounded-full w-full" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">In Progress</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">AI for HR Professionals</h4>
                  <div className="mt-3 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Course Progress</span>
                    <span>35% Complete</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-[#0F4C81] dark:bg-blue-500 h-full rounded-full w-[35%]" />
                  </div>
                </div>
              </div>

              {/* Professional Development Roadmap Recommendation Callout */}
              {onOpenCareerRoadmap && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-[#0F4C81] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-[#84CC16]">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold">Your Professional Development Roadmap is Ready</h4>
                      <p className="text-[11px] text-blue-100">
                        Based on your completed HR Fundamentals (100%) and Payroll Administration (72%), see what course you should take next.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCareerRoadmap();
                    }}
                    className="px-4 py-2 text-xs font-bold text-[#0F4C81] bg-white hover:bg-slate-100 rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 flex-shrink-0"
                  >
                    <span>View Roadmap</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Interactive Virtual Classroom Simulation */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold text-[#65A30D] dark:text-[#84CC16] uppercase tracking-wider">
                      Interactive Lecture Sandbox
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {selectedCourseForLearning?.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateCourseProgress(selectedCourseForLearning?.id || 'c2', 10)}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors cursor-pointer"
                    >
                      + Mark Lesson Complete (Simulate +10%)
                    </button>
                  </div>
                </div>

                {/* Video / Content Player Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Video Screen Mockup */}
                  <div className="lg:col-span-8 bg-slate-900 rounded-xl overflow-hidden aspect-video relative flex flex-col items-center justify-center p-6 text-white text-center shadow-md">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3 cursor-pointer hover:scale-105 transition-transform text-[#84CC16]">
                      <PlayCircle className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-semibold text-lime-300">
                      Module 2 · Lesson {activeLessonIndex + 1}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold mt-1 max-w-md">
                      Calculating Statutory PAYE Allowances & Pension Remittances
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Faculty: Babatunde Adeleke, FCA · NextSoftHR Executive Suite
                    </p>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      <span>08:42 / 24:15 HD</span>
                      <span className="text-[#84CC16]">Interactive Audio & Transcripts Enabled</span>
                    </div>
                  </div>

                  {/* Syllabus Lesson List */}
                  <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                      Module Lessons
                    </h5>
                    <div className="space-y-2">
                      {[
                        { title: 'Gross-to-Net Anatomy', duration: '20 mins', completed: true },
                        { title: 'PAYE Tax Tables & Deductions', duration: '24 mins', active: true },
                        { title: 'Pension Reform Act Guidelines', duration: '18 mins', completed: false },
                        { title: 'Variance Reconciliations Workshop', duration: '35 mins', completed: false },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveLessonIndex(idx)}
                          className={`w-full p-2.5 rounded-lg text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                            item.active
                              ? 'bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-[#0F4C81] dark:text-[#84CC16] font-bold'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {item.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-[#65A30D] dark:text-[#84CC16]" />
                            ) : (
                              <PlayCircle className="w-4 h-4 text-slate-400" />
                            )}
                            <span className="line-clamp-1">{item.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">{item.duration}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ASSESSMENTS & KNOWLEDGE CHECKS (Section 18) */}
          {activeTab === 'assessment' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center">
                <span className="text-[11px] font-bold text-[#0F4C81] dark:text-blue-300 uppercase tracking-wider px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80">
                  Section 18 Practical Knowledge Assessment
                </span>
                <h3 className="text-xl font-extrabold text-[#0F172A] dark:text-white mt-2">
                  Turn Knowledge Into Demonstrable Skills
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Test your real-world HR, payroll, and labor dispute decision-making under verified assessment standards.
                </p>
              </div>

              {quizCompleted ? (
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-lime-100 dark:bg-lime-950 text-[#65A30D] dark:text-[#84CC16] flex items-center justify-center mx-auto">
                    <Award className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    Assessment Completed!
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    You scored <strong className="text-slate-900 dark:text-white">{quizScore} out of {SAMPLE_QUIZ_QUESTIONS.length}</strong> ({Math.round((quizScore / SAMPLE_QUIZ_QUESTIONS.length) * 100)}%).
                  </p>

                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 max-w-sm mx-auto">
                    {quizScore >= 3 ? (
                      <span className="text-[#65A30D] dark:text-[#84CC16] font-bold">
                        Passed with Distinction! Your Certificate Eligibility is validated.
                      </span>
                    ) : (
                      <span className="text-amber-700 dark:text-amber-400 font-semibold">
                        Passing grade is 75%. You have 2 remaining retakes available.
                      </span>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-3">
                    <button
                      onClick={handleResetQuiz}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Assessment</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('certificates')}
                      className="px-5 py-2 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors cursor-pointer"
                    >
                      View Certificate
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xs space-y-5">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-700">
                    <span className="font-semibold text-[#0F4C81] dark:text-[#84CC16]">
                      Question {currentQuizIndex + 1} of {SAMPLE_QUIZ_QUESTIONS.length}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-medium text-slate-700 dark:text-slate-300">
                      Faculty: {currentQuiz.category}
                    </span>
                  </div>

                  {/* Scenario Box */}
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="block text-[11px] uppercase font-bold text-slate-400 dark:text-slate-500 mb-1">
                      Workplace Situation:
                    </strong>
                    "{currentQuiz.scenario}"
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {currentQuiz.question}
                  </h4>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {currentQuiz.options.map((option, oIdx) => {
                      const isChosen = selectedAnswer === oIdx;
                      const isCorrect = oIdx === currentQuiz.correctIndex;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleAnswerSubmit(oIdx)}
                          disabled={selectedAnswer !== null}
                          className={`w-full p-3 text-left text-xs rounded-xl border transition-all cursor-pointer ${
                            selectedAnswer === null
                              ? 'hover:bg-blue-50/50 dark:hover:bg-slate-700/60 hover:border-blue-300 dark:hover:border-slate-600 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                              : isCorrect
                              ? 'bg-lime-50 dark:bg-lime-950/80 border-[#84CC16] text-[#4d7c0f] dark:text-lime-300 font-bold'
                              : isChosen
                              ? 'bg-rose-50 dark:bg-rose-950/80 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-300'
                              : 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center font-bold text-[10px]">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{option}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {showExplanation && (
                    <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                      <div className="font-bold text-[#0F4C81] dark:text-[#84CC16] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#65A30D] dark:text-[#84CC16]" />
                        <span>Explanation & Statutory Basis:</span>
                      </div>
                      <p className="leading-relaxed">{currentQuiz.explanation}</p>

                      <div className="pt-2 text-right">
                        <button
                          onClick={handleNextQuestion}
                          className="px-4 py-2 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors cursor-pointer"
                        >
                          {currentQuizIndex < SAMPLE_QUIZ_QUESTIONS.length - 1
                            ? 'Next Question'
                            : 'See Final Results'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EARNED CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Your Official NextSoftHR Credentials</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Click any credential to preview or print your official certificate.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: 'cert-1',
                    certificateId: 'NSHR-2026-8492',
                    courseName: 'HR Fundamentals: Core Principles & Modern Operations',
                    learnerName: 'Chidinma Osuagwu',
                    completionDate: 'September 20, 2026',
                    grade: 'Pass with Distinction (92%)',
                    instructorName: 'Amina Bello, MCIPM',
                    instructorRole: 'Academic Director',
                    credentialUrl: 'https://www.nextsofthr.org/verify/NSHR-2026-8492',
                  },
                  {
                    id: 'cert-2',
                    certificateId: 'NSHR-2026-8910',
                    courseName: 'Payroll Administration & End-to-End Processing',
                    learnerName: 'Chidinma Osuagwu',
                    completionDate: 'October 02, 2026',
                    grade: 'Validated Master (96%)',
                    instructorName: 'Babatunde Adeleke, FCA',
                    instructorRole: 'Lead Faculty Assessor',
                    credentialUrl: 'https://www.nextsofthr.org/verify/NSHR-2026-8910',
                  },
                ].map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => onViewCertificate(cert)}
                    className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#0F4C81] dark:hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-[#65A30D] dark:text-[#84CC16] uppercase tracking-wider px-2 py-0.5 rounded bg-lime-50 dark:bg-lime-950">
                          Verified & Active
                        </span>
                        <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                          {cert.certificateId}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0F4C81] dark:text-blue-300">{cert.courseName}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Issued to: {cert.learnerName}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                      <span className="text-slate-400 dark:text-slate-500">Date: {cert.completionDate}</span>
                      <span className="text-[#0F4C81] dark:text-[#84CC16] font-bold flex items-center gap-1">
                        <span>View Certificate</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            <div className="max-w-xl mx-auto space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                <div className="w-14 h-14 rounded-full bg-[#0F4C81] text-white flex items-center justify-center font-bold text-lg">
                  CO
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Chidinma Osuagwu</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">chidinma.o@finbridge.africa · Member ID #NSHR-58291</p>
                </div>
              </div>

              <div className="text-xs space-y-2.5 text-slate-700 dark:text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Company:</span>
                  <span className="font-semibold">FinBridge Africa (Victoria Island, Lagos)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Job Title:</span>
                  <span className="font-semibold">Head of People Operations</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Active Path:</span>
                  <span className="font-bold text-[#0F4C81] dark:text-[#84CC16]">Payroll Professional Track</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Academy Advisor:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Amina Bello, MCIPM</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
