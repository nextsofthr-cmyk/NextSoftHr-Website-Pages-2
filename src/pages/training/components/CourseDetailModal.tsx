import React, { useState } from 'react';
import { Course } from '../types';
import {
  X,
  Clock,
  Award,
  Video,
  CheckCircle2,
  Calendar,
  User,
  Star,
  ChevronDown,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  FileCheck,
  Building2,
} from 'lucide-react';

import { useCurrency } from '../context/CurrencyContext';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  currency?: string;
  onEnroll: (course: Course) => void;
  onRequestInfo: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onEnroll,
  onRequestInfo,
}) => {
  const { formatCoursePrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor' | 'dates'>('overview');
  const [expandedModuleIndex, setExpandedModuleIndex] = useState<number | null>(0);

  if (!course) return null;

  const formatPrice = (c: Course) => formatCoursePrice(c);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header Banner */}
        <div className="relative bg-[#0F4C81] dark:bg-blue-950 text-white p-6 sm:p-8 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#84CC16] text-[#0F4C81]">
              {course.category}
            </span>
            <span className="text-white/40">·</span>
            <span className="text-xs text-blue-100 font-medium">
              {course.subcategory}
            </span>
            <span className="text-white/40">·</span>
            <span className="text-xs text-lime-300 font-semibold">
              {course.skillLevel} Level
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight max-w-2xl">
            {course.title}
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-2xl leading-relaxed">
            {course.description}
          </p>

          {/* Quick Stat Bar */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-4 pt-4 border-t border-white/15 text-xs text-blue-100">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-lime-300" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Video className="w-4 h-4 text-lime-300" />
              <span>{course.format}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-lime-300" />
              <span>Verified Certificate Included</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>
                {course.rating.toFixed(2)} ({course.reviewsCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50 dark:bg-slate-900 flex-shrink-0 overflow-x-auto">
          {[
            { id: 'overview', label: 'Course Overview' },
            { id: 'curriculum', label: `Curriculum (${course.modules.length} Modules)` },
            { id: 'instructor', label: 'Instructor Faculty' },
            { id: 'dates', label: `Dates & Cohorts (${course.upcomingDates.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#0F4C81] dark:border-[#84CC16] text-[#0F4C81] dark:text-[#84CC16]'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Comprehensive Description
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {course.longOverview}
                </p>
              </div>

              {/* What You Will Learn */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#65A30D] dark:text-[#84CC16]" />
                  <span>What You Will Learn & Apply</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] mt-1.5 flex-shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites & Target Audience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                    Prerequisites
                  </h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                    {course.prerequisites.map((p, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-[#0F4C81] dark:text-[#84CC16]">·</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                    Target Audience
                  </h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                    {course.targetAudience.map((a, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-[#65A30D] dark:text-[#84CC16]">·</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CURRICULUM */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Click each module to view detailed lesson topics, practical exercises, and knowledge checks.
              </p>
              {course.modules.map((mod, idx) => {
                const isExpanded = expandedModuleIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setExpandedModuleIndex(isExpanded ? null : idx)}
                      className="w-full px-5 py-3.5 bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-left cursor-pointer"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-[#0F4C81] dark:text-[#84CC16] uppercase tracking-wider block">
                          Module {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{mod.title}</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{mod.duration}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-4 bg-white dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
                        {mod.lessons.map((lesson, lIdx) => (
                          <div
                            key={lIdx}
                            className="py-2.5 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0F4C81] dark:text-blue-300 font-bold text-[10px] flex items-center justify-center">
                                {lIdx + 1}
                              </span>
                              <span className="font-medium text-slate-800 dark:text-slate-200">{lesson.title}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[11px]">
                              <span className="capitalize">{lesson.type}</span>
                              <span>·</span>
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: INSTRUCTOR */}
          {activeTab === 'instructor' && (
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-6 items-start">
              <img
                src={course.instructor.photo}
                alt={course.instructor.name}
                className="w-24 h-24 rounded-xl object-cover border-2 border-white dark:border-slate-700 shadow-sm flex-shrink-0"
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{course.instructor.name}</h3>
                <div className="text-xs font-semibold text-[#0F4C81] dark:text-[#84CC16] mt-0.5">
                  {course.instructor.role}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">{course.instructor.organization}</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{course.instructor.bio}</p>
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs font-semibold text-[#65A30D] dark:text-[#84CC16]">
                  <Award className="w-4 h-4" />
                  <span>Accredited Senior Faculty Member</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DATES & COHORTS */}
          {activeTab === 'dates' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Available Upcoming Cohorts
              </h4>
              {course.upcomingDates.map((d, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-slate-700 text-[#0F4C81] dark:text-[#84CC16] flex flex-col items-center justify-center font-bold">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{d.date}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {d.time} ({d.timezone}) · Lead: {d.instructor}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 px-2.5 py-1 rounded border border-rose-200 dark:border-rose-800">
                      {d.seatsLeft} seats remaining
                    </span>
                    <button
                      onClick={() => onEnroll(course)}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors cursor-pointer"
                    >
                      Reserve Seat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Sticky Bottom Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Total Tuition</span>
            <div className="text-2xl font-extrabold text-[#0F4C81] dark:text-[#84CC16]">
              {formatPrice(course)}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Includes materials & certificate</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onRequestInfo(course)}
              className="w-1/2 sm:w-auto px-4 py-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-md transition-colors cursor-pointer text-center"
            >
              Request More Information
            </button>
            <button
              onClick={() => onEnroll(course)}
              className="w-1/2 sm:w-auto px-6 py-3 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-4 h-4 text-[#84CC16]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
