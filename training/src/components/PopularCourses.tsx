import React, { useState } from 'react';
import { Course } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { CourseComparisonModal } from './CourseComparisonModal';
import {
  Clock,
  Award,
  Video,
  BookOpen,
  ArrowRight,
  Star,
  Layers,
  Check,
  Sparkles,
} from 'lucide-react';

interface PopularCoursesProps {
  courses: Course[];
  currency?: string;
  onViewCourse: (course: Course) => void;
  onEnrollCourse: (course: Course) => void;
}

const getCourseInitials = (title: string): string => {
  if (!title) return 'NS';
  const clean = title.replace(/[^a-zA-Z0-9\s]/g, '').trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return 'NS';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  const stopWords = new Set(['and', 'for', 'the', 'in', 'of', 'to', 'with', 'a', 'an']);
  const meaningfulWords = words.filter((w) => !stopWords.has(w.toLowerCase()));
  const targetWords = meaningfulWords.length >= 2 ? meaningfulWords : words;
  return (targetWords[0][0] + targetWords[1][0]).toUpperCase();
};

const getInstructorInitials = (name: string): string => {
  if (!name) return 'NS';
  const titles = new Set(['dr', 'dr.', 'mr', 'mr.', 'mrs', 'mrs.', 'ms', 'ms.', 'prof', 'prof.', 'engr', 'engr.']);
  const words = name
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .filter((w) => !titles.has(w.toLowerCase()));
  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};


export const PopularCourses: React.FC<PopularCoursesProps> = ({
  courses,
  onViewCourse,
  onEnrollCourse,
}) => {
  const { formatCoursePrice } = useCurrency();
  const formatPrice = (course: Course) => formatCoursePrice(course);

  // Selected courses for comparison (max 3)
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [compareLimitWarning, setCompareLimitWarning] = useState(false);

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800';
      case 'Advanced':
        return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  const handleToggleCompare = (courseId: string) => {
    setSelectedCompareIds((prev) => {
      if (prev.includes(courseId)) {
        return prev.filter((id) => id !== courseId);
      }
      if (prev.length >= 3) {
        setCompareLimitWarning(true);
        setTimeout(() => setCompareLimitWarning(false), 3000);
        return prev;
      }
      return [...prev, courseId];
    });
  };

  const handleOpenCompare = () => {
    if (selectedCompareIds.length < 2 && courses.length >= 2) {
      // Pre-populate with first 2 courses for immediate comparison
      const firstTwo = courses.slice(0, 2).map((c) => c.id);
      setSelectedCompareIds(firstTwo);
    }
    setIsCompareModalOpen(true);
  };

  const handleRemoveCompare = (courseId: string) => {
    setSelectedCompareIds((prev) => prev.filter((id) => id !== courseId));
  };

  const handleAddCompare = (course: Course) => {
    setSelectedCompareIds((prev) => {
      if (prev.length < 3 && !prev.includes(course.id)) {
        return [...prev, course.id];
      }
      return prev;
    });
  };

  const handleClearCompare = () => {
    setSelectedCompareIds([]);
  };

  const selectedCompareCourses = courses.filter((c) =>
    selectedCompareIds.includes(c.id)
  );

  return (
    <section
      id="popular-courses-container"
      className="py-16 bg-slate-50 dark:bg-[#0B1120] border-b border-slate-200/70 dark:border-slate-800 scroll-mt-20 transition-colors relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#84CC16]" />
              <span>Featured Curriculum</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              Popular Training Courses
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Practical, results-driven programs led by verified faculty and certified by NextSoftHR Training Academy.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
            {/* Compare Courses Trigger Button in Header */}
            <button
              onClick={handleOpenCompare}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer active:scale-95 group"
            >
              <Layers className="w-4 h-4 text-[#84CC16] group-hover:rotate-12 transition-transform" />
              <span>Compare Courses</span>
              <span className="px-1.5 py-0.2 bg-[#84CC16] text-[#0F4C81] rounded-full text-[10px] font-extrabold">
                {selectedCompareIds.length}/3
              </span>
            </button>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              Displaying <strong className="text-slate-800 dark:text-slate-200 font-bold">{courses.length}</strong> available courses
            </div>
          </div>
        </div>

        {/* Comparison Limit Notice */}
        {compareLimitWarning && (
          <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-center justify-between animate-in fade-in duration-200">
            <span>You can compare up to 3 courses simultaneously. Click 'Compare Specs' to view them side-by-side or deselect a course first.</span>
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="font-bold underline cursor-pointer ml-2 flex-shrink-0"
            >
              Open Comparison Modal
            </button>
          </div>
        )}

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-white">No courses match your active filters</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search query, selecting another category, or resetting all filters above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const isCompared = selectedCompareIds.includes(course.id);
              return (
                <div
                  key={course.id}
                  className={`group bg-white dark:bg-[#0F172A] rounded-xl border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative ${
                    isCompared
                      ? 'border-[#0F4C81] dark:border-blue-500 ring-2 ring-[#0F4C81]/20 dark:ring-blue-500/30'
                      : 'border-slate-200/90 dark:border-slate-800 hover:border-[#0F4C81]/40 dark:hover:border-blue-500/50'
                  }`}
                >
                  <div>
                    {/* Course Image & Badges */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                      
                      {/* Subtle Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                      {/* Category & Skill Level Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap z-10">
                        <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-[#0F4C81] dark:bg-blue-600 text-white shadow-xs">
                          {course.category}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getLevelBadgeClass(
                            course.skillLevel
                          )}`}
                        >
                          {course.skillLevel}
                        </span>
                      </div>

                      {/* Compare Checkbox Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleCompare(course.id);
                        }}
                        className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                          isCompared
                            ? 'bg-[#0F4C81] text-white ring-2 ring-[#84CC16]'
                            : 'bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                        }`}
                        title={isCompared ? 'Remove from comparison' : 'Add to side-by-side comparison (max 3)'}
                        aria-pressed={isCompared}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                            isCompared
                              ? 'bg-[#84CC16] border-[#84CC16] text-[#0F4C81]'
                              : 'border-slate-400 bg-white dark:bg-slate-800'
                          }`}
                        >
                          {isCompared && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                        <span>{isCompared ? 'Selected' : 'Compare'}</span>
                      </button>

                      {/* Format pill at bottom */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium z-10">
                        <Video className="w-3.5 h-3.5 text-[#84CC16]" />
                        <span>{course.format}</span>
                      </div>

                      {/* Rating at bottom right */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-semibold text-white z-10">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>{course.rating.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5">
                      {/* Duration & Certificate */}
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{course.duration}</span>
                        </div>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <div className="flex items-center gap-1 text-[#65A30D] dark:text-[#84CC16] font-medium">
                          <Award className="w-3.5 h-3.5" />
                          <span>Certificate Included</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onViewCourse(course)}
                        className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0F4C81] dark:group-hover:text-[#84CC16] transition-colors line-clamp-2 cursor-pointer leading-snug"
                      >
                        {course.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Instructor Info */}
                      <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-full bg-[#0F4C81] dark:bg-blue-600 text-[#84CC16] font-bold text-xs flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0 shadow-xs"
                          title={course.instructor.name}
                        >
                          {getInstructorInitials(course.instructor.name)}
                        </div>
                        <div className="text-xs truncate">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">
                            {course.instructor.name}
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                            {course.instructor.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer: Price & Actions */}
                  <div className="p-5 pt-0 mt-2">
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Tuition</div>
                        <div className="text-lg font-extrabold text-[#0F4C81] dark:text-[#84CC16]">
                          {formatPrice(course)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewCourse(course)}
                          className="px-3 py-2 text-xs font-bold text-[#0F4C81] dark:text-slate-200 hover:text-white bg-blue-50 dark:bg-slate-800 hover:bg-[#0F4C81] dark:hover:bg-blue-600 rounded-md transition-colors cursor-pointer"
                        >
                          View Course
                        </button>
                        <button
                          onClick={() => onEnrollCourse(course)}
                          className="px-3 py-2 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Enroll</span>
                          <ArrowRight className="w-3 h-3 text-[#84CC16]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Comparison Dock (Appears when 1-3 courses are selected) */}
      {selectedCompareIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[94vw] max-w-2xl bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-700 p-3 sm:p-4 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
            <div className="hidden sm:block text-left mr-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                Comparing
              </span>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                {selectedCompareIds.length} of 3
              </span>
            </div>

            {/* Selected Course Badges */}
            {selectedCompareCourses.map((c) => (
              <div key={c.id} className="relative group flex-shrink-0">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-cover border-2 border-[#0F4C81] dark:border-[#84CC16]"
                  title={c.title}
                />
                <button
                  onClick={() => handleRemoveCompare(c.id)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[11px] font-bold shadow-sm hover:scale-110 cursor-pointer"
                  title={`Remove ${c.title}`}
                  aria-label={`Remove ${c.title}`}
                >
                  ×
                </button>
              </div>
            ))}

            {/* Empty Placeholders */}
            {Array.from({ length: 3 - selectedCompareCourses.length }).map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 text-xs font-bold flex-shrink-0"
                title="Select another course to compare"
              >
                +
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleClearCompare}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              Clear
            </button>

            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Compare Specs</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#84CC16]" />
            </button>
          </div>
        </div>
      )}

      {/* Course Comparison Modal */}
      <CourseComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        selectedCourses={selectedCompareCourses}
        allCourses={courses}
        onRemoveCourse={handleRemoveCompare}
        onAddCourse={handleAddCompare}
        onViewCourse={onViewCourse}
        onEnrollCourse={onEnrollCourse}
      />
    </section>
  );
};
