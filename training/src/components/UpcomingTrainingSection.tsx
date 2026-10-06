import React from 'react';
import { UPCOMING_SESSIONS } from '../data/academyData';
import { UpcomingSession } from '../types';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Users,
  ArrowRight,
} from 'lucide-react';

import { useCurrency } from '../context/CurrencyContext';

interface UpcomingTrainingSectionProps {
  currency?: string;
  onRegisterSession: (session: UpcomingSession) => void;
  onViewSessionCourse: (courseId: string) => void;
}

export const UpcomingTrainingSection: React.FC<UpcomingTrainingSectionProps> = ({
  onRegisterSession,
  onViewSessionCourse,
}) => {
  const { formatSessionPrice } = useCurrency();
  const formatPrice = (session: UpcomingSession) => formatSessionPrice(session);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Limited Seats':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-800';
      case 'Filling Fast':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800';
    }
  };

  return (
    <section id="upcoming-sessions" className="py-16 bg-slate-50 dark:bg-[#0B1120] border-b border-slate-200/70 dark:border-slate-800 scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Live Cohorts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              Upcoming Training Sessions
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Live executive sessions with interactive labs, expert faculty guidance, and direct workplace application.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Interactive Live Cohorts · Small Group Limits
            </span>
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {UPCOMING_SESSIONS.map((session) => (
            <div
              key={session.id}
              className="bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-[#0F4C81]/40 dark:hover:border-blue-500/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Left Column: Date Box & Title */}
              <div className="flex items-start gap-4">
                {/* Date Highlight Badge */}
                <div className="w-16 h-16 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex flex-col items-center justify-center flex-shrink-0 text-[#0F4C81] dark:text-[#84CC16]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {session.date.split(' ')[0]}
                  </span>
                  <span className="text-xl font-extrabold leading-none text-[#0F4C81] dark:text-white">
                    {session.date.split(' ')[1].replace(',', '')}
                  </span>
                  <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500">2026</span>
                </div>

                {/* Course Details */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(
                        session.registrationStatus
                      )}`}
                    >
                      {session.registrationStatus} ({session.availableSeats} seats left)
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-600">·</span>
                    <span className="text-xs font-semibold text-[#0F4C81] dark:text-[#84CC16]">
                      {session.format}
                    </span>
                  </div>

                  <h3
                    onClick={() => onViewSessionCourse(session.courseId)}
                    className="text-base font-bold text-slate-900 dark:text-white hover:text-[#0F4C81] dark:hover:text-[#84CC16] cursor-pointer transition-colors"
                  >
                    {session.courseTitle}
                  </h3>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{session.time} (WAT / UTC+1)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">{session.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{session.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Price & Actions */}
              <div className="flex items-center justify-between lg:justify-end gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                <div className="text-left lg:text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Seat Tuition</div>
                  <div className="text-lg font-extrabold text-[#0F4C81] dark:text-[#84CC16]">
                    {formatPrice(session)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewSessionCourse(session.courseId)}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onRegisterSession(session)}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>Register Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#84CC16]" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
