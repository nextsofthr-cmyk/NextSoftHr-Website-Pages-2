import React, { useEffect, useState } from 'react';
import { Course } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import {
  X,
  CheckCircle2,
  Clock,
  Award,
  Video,
  BookOpen,
  ArrowRight,
  Star,
  Users,
  Plus,
  Trash2,
  Sparkles,
  Printer,
  ChevronDown,
  Layers,
  GraduationCap,
} from 'lucide-react';

interface CourseComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourses: Course[];
  allCourses: Course[];
  onRemoveCourse: (courseId: string) => void;
  onAddCourse: (course: Course) => void;
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


export const CourseComparisonModal: React.FC<CourseComparisonModalProps> = ({
  isOpen,
  onClose,
  selectedCourses,
  allCourses,
  onRemoveCourse,
  onAddCourse,
  onViewCourse,
  onEnrollCourse,
}) => {
  const { formatCoursePrice, formatAmount, currency } = useCurrency();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Courses available to add (not currently selected)
  const availableToAdd = allCourses.filter(
    (c) => !selectedCourses.some((sc) => sc.id === c.id)
  );

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Beginner':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
          dots: 1,
        };
      case 'Intermediate':
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 border-blue-200 dark:border-blue-800',
          dots: 2,
        };
      case 'Advanced':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
          dots: 3,
        };
      default:
        return {
          bg: 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
          dots: 1,
        };
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-6xl bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-100/70 dark:bg-blue-950 text-[#0F4C81] dark:text-[#84CC16] text-[11px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-[#84CC16]" />
              <span>Side-by-Side Curriculum Evaluation</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Compare NextSoftHR Masterclasses & Certifications
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Evaluating {selectedCourses.length} of 3 selected programs across duration, difficulty, investment, and learning outcomes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
              title="Print or export comparison sheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              aria-label="Close Comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Comparison Matrix */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-grow">
          {selectedCourses.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No courses selected for comparison
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto mb-4">
                Select up to three courses from the list below or the Popular Courses section to compare their syllabus and tuition side-by-side.
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                {allCourses.slice(0, 3).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onAddCourse(c)}
                    className="px-3 py-1.5 text-xs font-medium bg-blue-50 dark:bg-blue-950 text-[#0F4C81] dark:text-blue-300 hover:bg-blue-100 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors"
                  >
                    + Add {c.title.split(':')[0]}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Top Course Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedCourses.map((course) => {
                  const badge = getLevelBadge(course.skillLevel);
                  return (
                    <div
                      key={course.id}
                      className="relative bg-white dark:bg-slate-800/80 rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col justify-between shadow-xs"
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveCourse(course.id)}
                        className="absolute top-2 right-2 z-10 p-1.5 bg-slate-900/70 hover:bg-red-600 text-white rounded-full transition-colors cursor-pointer shadow-sm"
                        title="Remove from comparison"
                        aria-label={`Remove ${course.title} from comparison`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      {/* Course Image */}
                      <div className="relative h-36 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-2 left-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0F4C81] text-white">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      {/* Course Title & Rating */}
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                              {course.rating.toFixed(2)}
                            </span>
                            <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                              ({course.reviewsCount} reviews)
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                            {course.title}
                          </h3>
                        </div>

                        {/* Price Tag */}
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-baseline justify-between">
                          <span className="text-[10px] uppercase font-bold text-slate-400">
                            Tuition
                          </span>
                          <span className="text-lg font-extrabold text-[#0F4C81] dark:text-[#84CC16]">
                            {formatCoursePrice(course)}
                          </span>
                        </div>
                      </div>

                      {/* Quick CTA */}
                      <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-700/80 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            onViewCourse(course);
                          }}
                          className="px-2.5 py-1.5 text-xs font-semibold text-[#0F4C81] dark:text-blue-300 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md transition-colors text-center cursor-pointer"
                        >
                          Syllabus
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            onEnrollCourse(course);
                          }}
                          className="px-2.5 py-1.5 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span>Enroll</span>
                          <ArrowRight className="w-3 h-3 text-[#84CC16]" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Slot 3 or Slot 2: Add Another Course Placeholder */}
                {selectedCourses.length < 3 && (
                  <div className="relative rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 p-6 flex flex-col items-center justify-center text-center min-h-[280px]">
                    <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0F4C81] dark:text-[#84CC16] flex items-center justify-center mb-3 border border-blue-200 dark:border-blue-800">
                      <Plus className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                      Add Course to Compare
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[200px] mb-4">
                      Select {3 - selectedCourses.length} more course to view side-by-side specs.
                    </p>

                    {/* Dropdown selector */}
                    <div className="relative w-full max-w-[240px]">
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors cursor-pointer"
                      >
                        <span className="truncate">Select from catalog...</span>
                        <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-400 flex-shrink-0" />
                      </button>

                      {dropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white dark:bg-[#0F172A] rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-20 text-left p-1">
                          {availableToAdd.map((avail) => (
                            <button
                              key={avail.id}
                              onClick={() => {
                                onAddCourse(avail);
                                setDropdownOpen(false);
                              }}
                              className="w-full px-2.5 py-1.5 text-xs text-left text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/80 rounded transition-colors truncate block cursor-pointer"
                            >
                              <div className="font-semibold truncate">{avail.title}</div>
                              <div className="text-[10px] text-slate-400">
                                {avail.category} · {formatCoursePrice(avail)}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Side-by-Side Detailed Specs Matrix Table */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900/60 shadow-xs">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#0F4C81] dark:text-[#84CC16]" />
                    <span>Detailed Specification Comparison</span>
                  </h4>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {/* Row 1: Duration & Hours */}
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1 md:mb-0">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Duration & Hours</span>
                    </div>
                    {selectedCourses.map((c) => (
                      <div key={c.id} className="md:px-3 text-slate-900 dark:text-white font-medium">
                        <span className="font-bold text-[#0F4C81] dark:text-[#84CC16]">
                          {c.duration}
                        </span>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {c.modules.length} modules ·{' '}
                          {c.modules.reduce((sum, m) => sum + m.lessons.length, 0)} interactive lessons
                        </div>
                      </div>
                    ))}
                    {Array.from({ length: 3 - selectedCourses.length }).map((_, idx) => (
                      <div key={idx} className="hidden md:block md:px-3 text-slate-400 text-center">
                        —
                      </div>
                    ))}
                  </div>

                  {/* Row 2: Skill Difficulty */}
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1 md:mb-0">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      <span>Difficulty Level</span>
                    </div>
                    {selectedCourses.map((c) => {
                      const badge = getLevelBadge(c.skillLevel);
                      return (
                        <div key={c.id} className="md:px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold border ${badge.bg}`}
                          >
                            <span>{c.skillLevel}</span>
                            <span className="flex gap-0.5 ml-1">
                              {Array.from({ length: badge.dots }).map((_, i) => (
                                <span key={i} className="w-1.5 h-1.5 rounded-full bg-current" />
                              ))}
                            </span>
                          </span>
                        </div>
                      );
                    })}
                    {Array.from({ length: 3 - selectedCourses.length }).map((_, idx) => (
                      <div key={idx} className="hidden md:block md:px-3 text-slate-400 text-center">
                        —
                      </div>
                    ))}
                  </div>

                  {/* Row 3: Training Format */}
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1 md:mb-0">
                      <Video className="w-3.5 h-3.5 text-slate-400" />
                      <span>Delivery Format</span>
                    </div>
                    {selectedCourses.map((c) => (
                      <div key={c.id} className="md:px-3 text-slate-800 dark:text-slate-200">
                        <span className="font-semibold block">{c.format}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {c.format === 'Live Instructor-Led'
                            ? 'Weekend Live Cohorts & Live Q&A'
                            : '24/7 Self-Paced Modular Access'}
                        </span>
                      </div>
                    ))}
                    {Array.from({ length: 3 - selectedCourses.length }).map((_, idx) => (
                      <div key={idx} className="hidden md:block md:px-3 text-slate-400 text-center">
                        —
                      </div>
                    ))}
                  </div>

                  {/* Row 4: Certification Credential */}
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1 md:mb-0">
                      <Award className="w-3.5 h-3.5 text-slate-400" />
                      <span>Verifiable Credential</span>
                    </div>
                    {selectedCourses.map((c) => (
                      <div key={c.id} className="md:px-3 flex items-start gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#65A30D] dark:text-[#84CC16] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">
                            CPD & CIPM Verifiable
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            Digital badge with unique online verification code
                          </span>
                        </div>
                      </div>
                    ))}
                    {Array.from({ length: 3 - selectedCourses.length }).map((_, idx) => (
                      <div key={idx} className="hidden md:block md:px-3 text-slate-400 text-center">
                        —
                      </div>
                    ))}
                  </div>

                  {/* Row 5: Lead Faculty */}
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1 md:mb-0">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>Lead Instructor</span>
                    </div>
                    {selectedCourses.map((c) => (
                      <div key={c.id} className="md:px-3 flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full bg-[#0F4C81] dark:bg-blue-600 text-[#84CC16] font-bold text-xs flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0 shadow-xs"
                          title={c.instructor.name}
                        >
                          {getInstructorInitials(c.instructor.name)}
                        </div>
                        <div className="truncate">
                          <span className="font-bold text-slate-900 dark:text-white block truncate">
                            {c.instructor.name}
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                            {c.instructor.role}
                          </span>
                        </div>
                      </div>
                    ))}
                    {Array.from({ length: 3 - selectedCourses.length }).map((_, idx) => (
                      <div key={idx} className="hidden md:block md:px-3 text-slate-400 text-center">
                        —
                      </div>
                    ))}
                  </div>

                  {/* Row 6: Prerequisites */}
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1 md:mb-0">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>Prerequisites</span>
                    </div>
                    {selectedCourses.map((c) => (
                      <div key={c.id} className="md:px-3 text-slate-700 dark:text-slate-300 text-[11px]">
                        {c.prerequisites && c.prerequisites.length > 0 ? (
                          <ul className="list-disc pl-4 space-y-0.5">
                            {c.prerequisites.slice(0, 2).map((p, idx) => (
                              <li key={idx}>{p}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-slate-500">None required (Entry Level)</span>
                        )}
                      </div>
                    ))}
                    {Array.from({ length: 3 - selectedCourses.length }).map((_, idx) => (
                      <div key={idx} className="hidden md:block md:px-3 text-slate-400 text-center">
                        —
                      </div>
                    ))}
                  </div>

                  {/* Row 7: Key Takeaways */}
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1 md:mb-0">
                      <Sparkles className="w-3.5 h-3.5 text-[#84CC16]" />
                      <span>Key Competencies</span>
                    </div>
                    {selectedCourses.map((c) => (
                      <div key={c.id} className="md:px-3 text-[11px] text-slate-700 dark:text-slate-300">
                        <ul className="space-y-1">
                          {c.whatYouWillLearn.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#0F4C81] dark:bg-[#84CC16] mt-1.5 flex-shrink-0" />
                              <span className="line-clamp-2">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {Array.from({ length: 3 - selectedCourses.length }).map((_, idx) => (
                      <div key={idx} className="hidden md:block md:px-3 text-slate-400 text-center">
                        —
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Pricing shown reflects active regional currency selection ({currency}). All programs include lifetime syllabus access.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              Close Comparison
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
