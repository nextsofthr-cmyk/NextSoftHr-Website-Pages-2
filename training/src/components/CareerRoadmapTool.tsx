import React, { useState, useMemo } from 'react';
import { CAREER_TRACKS, CareerTrack, CareerTrackNode } from '../data/careerRoadmaps';
import { COURSES } from '../data/academyData';
import { Course, EnrolledCourse } from '../types';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  RotateCcw,
  Printer,
  MessageSquare,
  TrendingUp,
  Target,
  ShieldCheck,
  Zap,
  PlayCircle,
  Briefcase,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';

interface CareerRoadmapToolProps {
  enrolledCourses: EnrolledCourse[];
  onSelectCourse: (course: Course) => void;
  onEnrollCourse: (course: Course) => void;
  onOpenLiveChat?: () => void;
  onOpenCorporate?: () => void;
  currency?: string;
}

interface CourseSimulatedStatus {
  status: 'completed' | 'in-progress' | 'not-started';
  progress: number;
}

export const CareerRoadmapTool: React.FC<CareerRoadmapToolProps> = ({
  enrolledCourses,
  onSelectCourse,
  onEnrollCourse,
  onOpenLiveChat,
  onOpenCorporate,
}) => {
  const { formatCoursePrice } = useCurrency();
  const { t } = useLanguage();
  // Selected Career Track
  const [selectedTrackId, setSelectedTrackId] = useState<string>(CAREER_TRACKS[0].id);

  // Simulated Course Status State (initialized from actual enrolledCourses prop)
  const [simulatedStatuses, setSimulatedStatuses] = useState<Record<string, CourseSimulatedStatus>>(() => {
    const initial: Record<string, CourseSimulatedStatus> = {};
    // Seed all 12 courses as not started
    COURSES.forEach((c) => {
      initial[c.id] = { status: 'not-started', progress: 0 };
    });
    // Populate from active enrolled courses
    enrolledCourses.forEach((ec) => {
      if (ec.progress >= 100) {
        initial[ec.courseId] = { status: 'completed', progress: 100 };
      } else if (ec.progress > 0) {
        initial[ec.courseId] = { status: 'in-progress', progress: ec.progress };
      }
    });
    return initial;
  });

  // Track currently active
  const currentTrack: CareerTrack = useMemo(() => {
    return CAREER_TRACKS.find((t) => t.id === selectedTrackId) || CAREER_TRACKS[0];
  }, [selectedTrackId]);

  // Sync with live enrolledCourses
  const handleSyncWithPortal = () => {
    const updated: Record<string, CourseSimulatedStatus> = {};
    COURSES.forEach((c) => {
      updated[c.id] = { status: 'not-started', progress: 0 };
    });
    enrolledCourses.forEach((ec) => {
      if (ec.progress >= 100) {
        updated[ec.courseId] = { status: 'completed', progress: 100 };
      } else if (ec.progress > 0) {
        updated[ec.courseId] = { status: 'in-progress', progress: ec.progress };
      }
    });
    setSimulatedStatuses(updated);
  };

  // Reset simulator
  const handleResetSimulator = () => {
    const reset: Record<string, CourseSimulatedStatus> = {};
    COURSES.forEach((c) => {
      reset[c.id] = { status: 'not-started', progress: 0 };
    });
    setSimulatedStatuses(reset);
  };

  // Toggle status for a specific course node
  const handleToggleCourseStatus = (courseId: string) => {
    setSimulatedStatuses((prev) => {
      const current = prev[courseId] || { status: 'not-started', progress: 0 };
      let nextStatus: 'completed' | 'in-progress' | 'not-started';
      let nextProgress: number;

      if (current.status === 'not-started') {
        nextStatus = 'in-progress';
        nextProgress = 50;
      } else if (current.status === 'in-progress') {
        nextStatus = 'completed';
        nextProgress = 100;
      } else {
        nextStatus = 'not-started';
        nextProgress = 0;
      }

      return {
        ...prev,
        [courseId]: { status: nextStatus, progress: nextProgress },
      };
    });
  };

  // Calculate Roadmap Progress & Statistics for the active track
  const trackStats = useMemo(() => {
    const totalNodes = currentTrack.nodes.length;
    let completedCount = 0;
    let inProgressCount = 0;
    let totalProgressSum = 0;
    let hoursRemaining = 0;

    currentTrack.nodes.forEach((node) => {
      const st = simulatedStatuses[node.courseId] || { status: 'not-started', progress: 0 };
      if (st.status === 'completed') {
        completedCount++;
        totalProgressSum += 100;
      } else if (st.status === 'in-progress') {
        inProgressCount++;
        totalProgressSum += st.progress;
        hoursRemaining += Math.round(node.learningHours * (1 - st.progress / 100));
      } else {
        hoursRemaining += node.learningHours;
      }
    });

    const completionPercentage = Math.round(totalProgressSum / totalNodes);
    return {
      totalNodes,
      completedCount,
      inProgressCount,
      completionPercentage,
      hoursRemaining,
    };
  }, [currentTrack, simulatedStatuses]);

  // SMART SUGGESTION ENGINE: "What Should You Take Next?"
  const nextRecommendation = useMemo(() => {
    // 1. Is there an active in-progress course on this track?
    const activeInProgressNode = currentTrack.nodes.find((node) => {
      const st = simulatedStatuses[node.courseId];
      return st && st.status === 'in-progress';
    });

    if (activeInProgressNode) {
      const course = COURSES.find((c) => c.id === activeInProgressNode.courseId);
      const st = simulatedStatuses[activeInProgressNode.courseId];
      return {
        type: 'finish-active' as const,
        node: activeInProgressNode,
        course,
        title: `Finish Active Course: ${activeInProgressNode.courseTitle}`,
        progress: st.progress,
        reason: `You are currently ${st.progress}% through ${activeInProgressNode.courseTitle}. Completing this course unlocks Stage ${activeInProgressNode.milestoneOrder + 1} competencies and satisfies prerequisites for higher-level credentials.`,
        actionLabel: 'Continue Learning',
        estimatedRemaining: `${Math.round(activeInProgressNode.learningHours * (1 - st.progress / 100))} hrs left`,
      };
    }

    // 2. Find the first incomplete node whose prerequisites are met
    for (const node of currentTrack.nodes) {
      const st = simulatedStatuses[node.courseId];
      const isCompleted = st && st.status === 'completed';

      if (!isCompleted) {
        // Check if prerequisites are satisfied
        const unfulfilledPrereqs = node.prerequisiteCourseIds.filter((prereqId) => {
          const pst = simulatedStatuses[prereqId];
          return !pst || pst.status !== 'completed';
        });

        if (unfulfilledPrereqs.length === 0) {
          // All prerequisites satisfied! This is the next recommended course!
          const course = COURSES.find((c) => c.id === node.courseId);
          return {
            type: 'start-next' as const,
            node,
            course,
            title: `Recommended Next Priority: ${node.courseTitle}`,
            progress: 0,
            reason: node.whyThisCourse,
            actionLabel: 'Enroll in Next Course',
            estimatedRemaining: `${node.estimatedWeeks} Weeks · ${node.learningHours} Hours`,
          };
        } else {
          // First unfulfilled prerequisite is needed first
          const prereqCourse = COURSES.find((c) => c.id === unfulfilledPrereqs[0]);
          return {
            type: 'prerequisite-needed' as const,
            node,
            course: prereqCourse,
            title: `Prerequisite Required First: ${prereqCourse?.title || unfulfilledPrereqs[0]}`,
            progress: 0,
            reason: `Before taking ${node.courseTitle}, you should first complete ${prereqCourse?.title || 'the foundational prerequisite'} to build foundational domain knowledge.`,
            actionLabel: 'Start Required Prerequisite',
            estimatedRemaining: `${node.estimatedWeeks} Weeks`,
          };
        }
      }
    }

    // 3. All courses in this track are completed!
    return {
      type: 'all-completed' as const,
      node: currentTrack.nodes[currentTrack.nodes.length - 1],
      course: undefined,
      title: `🎉 Career Goal Readiness Achieved: 100%!`,
      progress: 100,
      reason: `Outstanding achievement! You have satisfied all ${currentTrack.nodes.length} recommended learning milestones for the ${currentTrack.targetRole} role. Your skills are validated for senior leadership.`,
      actionLabel: 'Explore Adjacent Specialization',
      estimatedRemaining: 'Completed',
    };
  }, [currentTrack, simulatedStatuses]);

  // Handle Print / Export
  const handlePrintRoadmap = () => {
    window.print();
  };

  return (
    <section
      id="learning-paths"
      className="py-16 bg-white dark:bg-[#0B1120] border-b border-slate-200/70 dark:border-slate-800 scroll-mt-20 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Compass className="w-3.5 h-3.5 text-[#0F4C81] dark:text-[#84CC16]" />
            <span>{t('roadmap.badge', 'Interactive Career Pathing & Progression')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            {t('roadmap.title', 'Professional Development Roadmap')}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {t('roadmap.subtitle', 'Map out your structured trajectory from operational fundamentals to executive leadership. Track your completed competencies, simulate career progress, and receive intelligent recommendations on what course to take next.')}
          </p>
        </div>

        {/* Career Track Selector (Interactive Tabs) */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
            {t('roadmap.target_destination', 'Select Your Target Career Destination:')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CAREER_TRACKS.map((track) => {
              const isSelected = track.id === selectedTrackId;
              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrackId(track.id)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#0F4C81] dark:bg-blue-900 text-white border-[#0F4C81] dark:border-blue-600 shadow-md ring-2 ring-lime-400/40'
                      : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-blue-800 dark:bg-blue-950 text-lime-300'
                          : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {track.badge}
                    </span>
                    <TrendingUp className={`w-4 h-4 ${isSelected ? 'text-[#84CC16]' : 'text-slate-400'}`} />
                  </div>
                  <h3 className={`text-sm font-bold leading-snug line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {track.title}
                  </h3>
                  <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                    {track.targetRole}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* DYNAMIC SMART RECOMMENDATION CARD ("What Should You Take Next?") */}
        <div className="mb-10 bg-gradient-to-r from-blue-50/80 via-white to-lime-50/70 dark:from-slate-900 dark:via-[#0F172A] dark:to-slate-900 border-2 border-lime-300/80 dark:border-lime-500/50 rounded-2xl p-6 sm:p-7 shadow-sm transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F4C81] dark:text-[#84CC16]">
                  {nextRecommendation.type === 'finish-active'
                    ? '⚡ Active Progress Priority'
                    : nextRecommendation.type === 'all-completed'
                    ? '🎓 Goal Mastered'
                    : '🎯 What You Should Take Next'}
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {nextRecommendation.estimatedRemaining}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
                {nextRecommendation.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed max-w-3xl">
                {nextRecommendation.reason}
              </p>

              {/* In-progress bar if active */}
              {nextRecommendation.type === 'finish-active' && (
                <div className="mt-3.5 max-w-md">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Current Progress</span>
                    <span className="text-[#0F4C81] dark:text-[#84CC16]">{nextRecommendation.progress}% Completed</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0F4C81] to-[#84CC16] rounded-full transition-all duration-500"
                      style={{ width: `${nextRecommendation.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Strategic impact kicker */}
              {nextRecommendation.node && (
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16] flex-shrink-0" />
                  <span>
                    <strong className="text-slate-700 dark:text-slate-200">Executive Impact:</strong>{' '}
                    {nextRecommendation.node.strategicImpact}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
              {nextRecommendation.course ? (
                <>
                  <button
                    onClick={() => onEnrollCourse(nextRecommendation.course!)}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{nextRecommendation.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#84CC16]" />
                  </button>
                  <button
                    onClick={() => onSelectCourse(nextRecommendation.course!)}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#0F4C81] dark:text-[#84CC16]" />
                    <span>View Course Details</span>
                  </button>
                </>
              ) : (
                onOpenLiveChat && (
                  <button
                    onClick={onOpenLiveChat}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#84CC16]" />
                    <span>Speak with Career Dean</span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* ROADMAP PROGRESS DASHBOARD STRIP */}
        <div className="bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#0F4C81] dark:text-[#84CC16]" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Roadmap Progress: {currentTrack.title}
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Target Compensation Range: <span className="font-semibold text-slate-700 dark:text-slate-300">{currentTrack.targetSalaryRange}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {/* Completion Meter */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('roadmap.career_readiness', 'Career Readiness')}</span>
                <span className="text-base font-extrabold text-[#0F4C81] dark:text-[#84CC16]">
                  {trackStats.completionPercentage}%
                </span>
              </div>
              <div className="w-28 sm:w-36 h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0F4C81] to-[#84CC16] rounded-full transition-all duration-300"
                  style={{ width: `${trackStats.completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Milestones Count */}
            <div className="border-l border-slate-200 dark:border-slate-800 pl-4 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('roadmap.milestones_mastered', 'Milestones Mastered')}</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {trackStats.completedCount} of {trackStats.totalNodes} Stages
              </span>
            </div>

            {/* Estimated Remaining */}
            <div className="border-l border-slate-200 dark:border-slate-800 pl-4 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('roadmap.time_to_completion', 'Time to Completion')}</span>
              <span className="font-bold text-[#65A30D] dark:text-[#84CC16]">
                {trackStats.hoursRemaining} Learning Hours
              </span>
            </div>

            {/* Simulator Controls */}
            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4">
              <button
                onClick={handleSyncWithPortal}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded transition-colors cursor-pointer"
                title="Sync roadmap with your enrolled courses"
              >
                {t('roadmap.sync_portal', 'Sync with Portal')}
              </button>
              <button
                onClick={handleResetSimulator}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                title="Reset simulation toggles"
                aria-label="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* PROFESSIONAL DEVELOPMENT ROADMAP TIMELINE (The 5 Ordered Stages) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Interactive Sequential Progression (Click status buttons to simulate completion):
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Ordered by prerequisite dependency
            </span>
          </div>

          <div className="space-y-3.5">
            {currentTrack.nodes.map((node, index) => {
              const sim = simulatedStatuses[node.courseId] || { status: 'not-started', progress: 0 };
              const course = COURSES.find((c) => c.id === node.courseId);
              const isNextRecommended = nextRecommendation.node?.courseId === node.courseId;

              // Check if prerequisites are satisfied
              const unfulfilledPrereqs = node.prerequisiteCourseIds.filter((pId) => {
                const s = simulatedStatuses[pId];
                return !s || s.status !== 'completed';
              });
              const isLocked = unfulfilledPrereqs.length > 0 && sim.status === 'not-started';

              return (
                <div
                  key={node.courseId}
                  className={`bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border transition-all duration-200 relative ${
                    isNextRecommended
                      ? 'border-[#0F4C81] dark:border-[#84CC16] shadow-md ring-2 ring-[#0F4C81]/15 dark:ring-[#84CC16]/20'
                      : sim.status === 'completed'
                      ? 'border-emerald-200 dark:border-emerald-950 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Left: Stage Icon & Details */}
                    <div className="flex items-start gap-4">
                      {/* Step Number Circle */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm flex-shrink-0 transition-colors ${
                          sim.status === 'completed'
                            ? 'bg-emerald-600 text-white'
                            : isNextRecommended
                            ? 'bg-[#0F4C81] text-white ring-4 ring-blue-100 dark:ring-blue-900/60'
                            : sim.status === 'in-progress'
                            ? 'bg-amber-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {sim.status === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span>{node.milestoneOrder}</span>
                        )}
                      </div>

                      {/* Main Node Content */}
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold text-[#0F4C81] dark:text-[#84CC16] uppercase tracking-wider">
                            {node.stageName}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">·</span>
                          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                            Target Level: {node.roleLevel}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">·</span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {node.estimatedWeeks} Weeks ({node.learningHours} hrs)
                          </span>
                          {isNextRecommended && (
                            <span className="px-2 py-0.5 rounded bg-lime-100 dark:bg-lime-950/80 text-[#4D7C0F] dark:text-[#84CC16] text-[10px] font-extrabold uppercase tracking-wide border border-lime-300 dark:border-lime-700">
                              ★ Recommended Next Course
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {node.courseTitle}
                        </h4>

                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                          {node.whyThisCourse}
                        </p>

                        {/* Unlocked Competency Tags */}
                        <div className="mt-3 flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
                            Competencies:
                          </span>
                          {node.keyCompetencies.map((comp, idx) => (
                            <span
                              key={idx}
                              className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                                sim.status === 'completed'
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              {sim.status === 'completed' ? '✓ ' : ''}{comp}
                            </span>
                          ))}
                        </div>

                        {/* Prerequisites notice if locked */}
                        {isLocked && (
                          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded border border-amber-200 dark:border-amber-900/50">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>
                              Requires completion of Stage{' '}
                              {node.prerequisiteCourseIds.map((p) => p.toUpperCase()).join(', ')} first
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Interactive State Changer & Action CTAs */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800 flex-shrink-0">
                      {/* State Segmented Toggle */}
                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                        <button
                          onClick={() => {
                            setSimulatedStatuses((prev) => ({
                              ...prev,
                              [node.courseId]: { status: 'not-started', progress: 0 },
                            }));
                          }}
                          className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                            sim.status === 'not-started'
                              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold'
                              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                        >
                          Not Started
                        </button>
                        <button
                          onClick={() => {
                            setSimulatedStatuses((prev) => ({
                              ...prev,
                              [node.courseId]: { status: 'in-progress', progress: 50 },
                            }));
                          }}
                          className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                            sim.status === 'in-progress'
                              ? 'bg-amber-500 text-white font-bold shadow-2xs'
                              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => {
                            setSimulatedStatuses((prev) => ({
                              ...prev,
                              [node.courseId]: { status: 'completed', progress: 100 },
                            }));
                          }}
                          className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                            sim.status === 'completed'
                              ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                        >
                          Completed ✓
                        </button>
                      </div>

                      {/* Course Interaction Links */}
                      {course && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#0F4C81] dark:text-[#84CC16]">
                            {formatCoursePrice(course)}
                          </span>
                          <button
                            onClick={() => onSelectCourse(course)}
                            className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded transition-colors cursor-pointer"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => onEnrollCourse(course)}
                            className="px-3 py-1.5 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <span>Enroll</span>
                            <ArrowRight className="w-3 h-3 text-[#84CC16]" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROADMAP FOOTER ACTION BAR */}
        <div className="mt-10 p-6 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Need a Custom Enterprise Development Plan for Your Team?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              We tailor multi-stage career progression paths and competency matrices for corporate HR and payroll departments.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handlePrintRoadmap}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#0F4C81] dark:text-[#84CC16]" />
              <span>Print / Save Roadmap</span>
            </button>

            {onOpenCorporate && (
              <button
                onClick={onOpenCorporate}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>Request Corporate Path</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
