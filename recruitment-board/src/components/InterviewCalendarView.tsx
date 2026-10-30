import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Users,
  Building2,
  Sparkles,
  Send
} from 'lucide-react';
import { ScheduledInterview, InterviewSlot } from '../types';

interface InterviewCalendarViewProps {
  interviews: ScheduledInterview[];
  onTriggerOneHourAlert?: (interview: ScheduledInterview) => void;
  onSelectInterviewJob?: (jobId: string) => void;
  onRequestReschedule?: (interviewId: string, alternativeSlots: InterviewSlot[], reason: string) => void;
  onToast?: (message: string) => void;
}

export const InterviewCalendarView: React.FC<InterviewCalendarViewProps> = ({
  interviews,
  onTriggerOneHourAlert,
  onSelectInterviewJob,
  onRequestReschedule,
  onToast
}) => {
  const [calendarView, setCalendarView] = useState<'month' | 'week'>('month');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeInterviewAlert, setActiveInterviewAlert] = useState<ScheduledInterview | null>(null);

  // Reschedule Modal State
  const [rescheduleInterview, setRescheduleInterview] = useState<ScheduledInterview | null>(null);
  const [rescheduleReason, setRescheduleReason] = useState('Schedule conflict with critical business deliverable');
  
  // 3 Alternative Slots State
  const getDefaultSlotDate = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().slice(0, 10);
  };

  const [slot1Date, setSlot1Date] = useState(() => getDefaultSlotDate(3));
  const [slot1Time, setSlot1Time] = useState('10:00');
  const [slot2Date, setSlot2Date] = useState(() => getDefaultSlotDate(4));
  const [slot2Time, setSlot2Time] = useState('14:30');
  const [slot3Date, setSlot3Date] = useState(() => getDefaultSlotDate(5));
  const [slot3Time, setSlot3Time] = useState('11:00');

  // Month navigation
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const goToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
  };

  // Month calendar grid computation
  const monthData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: Array<{ day: number; isCurrentMonth: boolean; dateObj: Date }> = [];

    // Leading days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevDate = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false, dateObj: prevDate });
    }

    // Days in current month
    for (let i = 1; i <= daysInMonth; i++) {
      const curr = new Date(year, month, i);
      days.push({ day: i, isCurrentMonth: true, dateObj: curr });
    }

    // Trailing days from next month to fill 35 or 42 cells
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ day: i, isCurrentMonth: false, dateObj: nextDate });
    }

    return days;
  }, [currentDate]);

  // Map interviews to dates
  const interviewsByDateStr = useMemo(() => {
    const map = new Map<string, ScheduledInterview[]>();

    interviews.forEach(inv => {
      const slot = inv.confirmedSlot || inv.proposedSlots[0];
      if (slot?.datetime) {
        const dateKey = slot.datetime.slice(0, 10); // YYYY-MM-DD
        const existing = map.get(dateKey) || [];
        existing.push(inv);
        map.set(dateKey, existing);
      }
    });

    return map;
  }, [interviews]);

  // Check for 1-hour interview alerts on mount or intervals
  useEffect(() => {
    const checkUpcomingOneHour = () => {
      const now = new Date().getTime();
      const oneHourMs = 60 * 60 * 1000;

      for (const inv of interviews) {
        if (inv.status === 'confirmed' && inv.confirmedSlot?.datetime) {
          const slotTime = new Date(inv.confirmedSlot.datetime).getTime();
          const diff = slotTime - now;

          // Within 65 minutes
          if (diff > 0 && diff <= oneHourMs + 5 * 60 * 1000) {
            setActiveInterviewAlert(inv);
            if (onTriggerOneHourAlert) onTriggerOneHourAlert(inv);
            break;
          }
        }
      }
    };

    checkUpcomingOneHour();
    const interval = setInterval(checkUpcomingOneHour, 30000);
    return () => clearInterval(interval);
  }, [interviews, onTriggerOneHourAlert]);

  // Manual trigger for testing 1-Hour Alert
  const handleSimulateOneHourTest = () => {
    const sampleInv = interviews.find(i => i.status === 'confirmed') || interviews[0];
    if (sampleInv) {
      setActiveInterviewAlert(sampleInv);
      if (onTriggerOneHourAlert) {
        onTriggerOneHourAlert(sampleInv);
      }
    }
  };

  const handleSubmitReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleInterview) return;

    const buildSlot = (dateStr: string, timeStr: string, idSuffix: string): InterviewSlot => {
      const d = new Date(`${dateStr}T${timeStr}:00`);
      const formattedDate = isNaN(d.getTime()) 
        ? dateStr 
        : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      
      const [hStr, mStr] = timeStr.split(':');
      const hours = parseInt(hStr || '10', 10);
      const mins = mStr || '00';
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedTime = `${String(displayHours).padStart(2, '0')}:${mins} ${ampm} (WAT)`;

      return {
        id: `alt-slot-${idSuffix}-${Date.now()}`,
        datetime: `${dateStr}T${timeStr}:00`,
        formattedDate,
        formattedTime,
        durationMinutes: 45
      };
    };

    const suggestedSlots: InterviewSlot[] = [
      buildSlot(slot1Date, slot1Time, '1'),
      buildSlot(slot2Date, slot2Time, '2'),
      buildSlot(slot3Date, slot3Time, '3')
    ];

    if (onRequestReschedule) {
      onRequestReschedule(rescheduleInterview.id, suggestedSlots, rescheduleReason);
    }

    if (onToast) {
      onToast(`📅 Reschedule request with 3 alternative slots sent to ${rescheduleInterview.recruiterName} (${rescheduleInterview.companyName})!`);
    }

    setRescheduleInterview(null);
  };

  const selectedDateKey = selectedDate.toISOString().slice(0, 10);
  const selectedDateInterviews = interviewsByDateStr.get(selectedDateKey) || [];

  return (
    <div className="space-y-6">
      {/* 1-Hour Interview Alert Notice Banner (Requirement 6) */}
      {activeInterviewAlert ? (
        <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border-2 border-amber-500/40 text-amber-950 dark:text-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  ⏰ 1-Hour Interview Alert Triggered
                </span>
                <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                  Starts in &lt; 60 mins
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-white mt-0.5">
                {activeInterviewAlert.interviewType} with <strong>{activeInterviewAlert.companyName}</strong> ({activeInterviewAlert.jobTitle})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeInterviewAlert.meetingLink && (
              <a
                href={activeInterviewAlert.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Join Meeting Link</span>
              </a>
            )}
            <button
              onClick={() => setActiveInterviewAlert(null)}
              className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700"
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Bell className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            <span>
              <strong>Automated 1-Hour Reminder Monitor:</strong> You will receive a high-priority banner & toast 1 hour before scheduled interviews.
            </span>
          </div>

          <button
            type="button"
            onClick={handleSimulateOneHourTest}
            className="px-3 py-1 bg-lime-100 hover:bg-lime-200 dark:bg-lime-950/80 dark:hover:bg-lime-900 text-lime-900 dark:text-lime-300 border border-lime-300 dark:border-lime-800 text-[11px] font-bold rounded-lg transition-colors cursor-pointer shrink-0"
          >
            ⚡ Test 1-Hour Alert
          </button>
        </div>
      )}

      {/* Calendar Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#142B4A] dark:bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
            <CalendarIcon className="w-5 h-5 text-lime-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[#142B4A] dark:text-white">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {interviews.filter(i => i.status === 'confirmed').length} Confirmed Sessions
            </span>
          </div>
        </div>

        {/* View Switcher & Month Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setCalendarView('month')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                calendarView === 'month'
                  ? 'bg-white dark:bg-slate-900 text-[#142B4A] dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Month Grid
            </button>
            <button
              onClick={() => setCalendarView('week')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                calendarView === 'week'
                  ? 'bg-white dark:bg-slate-900 text-[#142B4A] dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Weekly Schedule
            </button>
          </div>

          <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-2">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToToday}
              className="px-2.5 py-1 text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg cursor-pointer"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MONTH GRID VIEW */}
      {calendarView === 'month' ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          {/* Days of week header */}
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-center text-xs font-bold text-slate-600 dark:text-slate-400 py-2.5">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Days Cells */}
          <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100 dark:divide-slate-800/80">
            {monthData.map((dObj, idx) => {
              const cellDateKey = dObj.dateObj.toISOString().slice(0, 10);
              const cellInterviews = interviewsByDateStr.get(cellDateKey) || [];
              const isToday = cellDateKey === new Date().toISOString().slice(0, 10);
              const isSelected = cellDateKey === selectedDateKey;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDate(dObj.dateObj)}
                  className={`min-h-[92px] p-2 flex flex-col justify-between transition-colors cursor-pointer ${
                    !dObj.isCurrentMonth
                      ? 'bg-slate-50/40 dark:bg-slate-950/40 text-slate-300 dark:text-slate-600'
                      : isSelected
                      ? 'bg-lime-50/40 dark:bg-lime-950/20'
                      : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center ${
                        isToday
                          ? 'bg-lime-500 text-slate-950 font-black'
                          : isSelected
                          ? 'bg-[#142B4A] text-white'
                          : ''
                      }`}
                    >
                      {dObj.day}
                    </span>

                    {cellInterviews.length > 0 && (
                      <span className="text-[10px] font-bold px-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {cellInterviews.length}
                      </span>
                    )}
                  </div>

                  {/* Interview Pills inside cell */}
                  <div className="space-y-1 mt-1">
                    {cellInterviews.slice(0, 2).map((inv) => (
                      <div
                        key={inv.id}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold truncate flex items-center gap-1 ${
                          inv.status === 'confirmed'
                            ? 'bg-lime-100 dark:bg-lime-950/90 text-lime-900 dark:text-lime-200 border border-lime-300 dark:border-lime-800'
                            : 'bg-amber-100 dark:bg-amber-950/90 text-amber-900 dark:text-amber-200'
                        }`}
                        title={`${inv.interviewType} - ${inv.companyName}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                        <span className="truncate">{inv.companyName}</span>
                      </div>
                    ))}
                    {cellInterviews.length > 2 && (
                      <span className="text-[9px] text-slate-400 font-semibold block">
                        +{cellInterviews.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* WEEKLY VIEW */
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2.5">
            {Array.from({ length: 7 }).map((_, i) => {
              const weekDay = new Date(selectedDate);
              weekDay.setDate(selectedDate.getDate() - selectedDate.getDay() + i);
              const weekKey = weekDay.toISOString().slice(0, 10);
              const dayInvs = interviewsByDateStr.get(weekKey) || [];
              const isToday = weekKey === new Date().toISOString().slice(0, 10);

              return (
                <div
                  key={i}
                  className={`p-3 rounded-2xl border ${
                    isToday
                      ? 'border-lime-500 bg-lime-50/20 dark:bg-lime-950/10'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-500">
                      {weekDay.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className={`font-bold ${isToday ? 'text-lime-600 dark:text-lime-400' : 'text-slate-800 dark:text-white'}`}>
                      {weekDay.getDate()}
                    </span>
                  </div>

                  <div className="space-y-2 mt-2">
                    {dayInvs.map((inv) => (
                      <div
                        key={inv.id}
                        className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1"
                      >
                        <div className="font-bold text-slate-900 dark:text-white truncate">{inv.companyName}</div>
                        <div className="text-[10px] text-slate-500 truncate">{inv.confirmedSlot?.formattedTime || '10:00 AM'}</div>
                        {inv.meetingLink && (
                          <a
                            href={inv.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
                          >
                            <Video className="w-3 h-3" />
                            <span>Meet Link</span>
                          </a>
                        )}
                      </div>
                    ))}
                    {dayInvs.length === 0 && (
                      <span className="text-[11px] text-slate-400 italic block py-4 text-center">No interviews</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Day Agenda Drawer */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            <h4 className="font-extrabold text-sm text-[#142B4A] dark:text-white">
              Agenda for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500">
            {selectedDateInterviews.length} Booked
          </span>
        </div>

        {selectedDateInterviews.length > 0 ? (
          <div className="space-y-3">
            {selectedDateInterviews.map((inv) => (
              <div
                key={inv.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                      {inv.interviewType}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      inv.status === 'confirmed'
                        ? 'bg-lime-100 text-lime-900 dark:bg-lime-950 dark:text-lime-300'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {inv.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Role: <strong>{inv.jobTitle}</strong> at <strong>{inv.companyName}</strong>
                  </p>
                  <div className="text-[11px] text-slate-500 flex items-center gap-3">
                    <span>⏰ {inv.confirmedSlot?.formattedTime || '10:00 AM (WAT)'}</span>
                    <span>👤 Recruiter: {inv.recruiterName}</span>
                  </div>
                  {inv.notes && (
                    <p className="text-[11px] text-blue-700 dark:text-blue-300 italic bg-blue-50/70 dark:bg-blue-950/40 p-2 rounded-lg mt-1 border border-blue-100 dark:border-blue-900/40">
                      <strong>Prep Note:</strong> "{inv.notes}"
                    </p>
                  )}
                {/* Candidate Proposed Reschedule Slots info */}
                {inv.candidateRescheduleSlots && inv.candidateRescheduleSlots.length > 0 && (
                  <div className="mt-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs space-y-1.5">
                    <span className="font-bold text-amber-900 dark:text-amber-300 block">
                      3 Alternative Slots Proposed to {inv.recruiterName} (Awaiting Confirmation):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                      {inv.candidateRescheduleSlots.map((slot, idx) => (
                        <div key={idx} className="p-1.5 bg-white dark:bg-slate-800 rounded-lg border border-amber-100 dark:border-amber-900/40 text-[11px]">
                          <span className="text-[10px] text-slate-400 block font-bold">Slot {idx + 1}</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block">{slot.formattedDate}</span>
                          <span className="text-amber-700 dark:text-amber-400">{slot.formattedTime}</span>
                        </div>
                      ))}
                    </div>
                    {inv.rescheduleReason && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">
                        Note: "{inv.rescheduleReason}"
                      </p>
                    )}
                  </div>
                )}
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {inv.meetingLink && inv.status === 'confirmed' && (
                    <a
                      href={inv.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Meet</span>
                    </a>
                  )}

                  {inv.status === 'confirmed' && (
                    <button
                      type="button"
                      onClick={() => setRescheduleInterview(inv)}
                      className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Propose three alternative time slots to recruiter"
                    >
                      <CalendarIcon className="w-3.5 h-3.5" />
                      <span>Request Reschedule</span>
                    </button>
                  )}

                  {onSelectInterviewJob && (
                    <button
                      type="button"
                      onClick={() => onSelectInterviewJob(inv.jobId)}
                      className="px-3 py-2 bg-white dark:bg-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-600 cursor-pointer"
                    >
                      Job Specs
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-slate-400 text-xs">
            No confirmed interviews scheduled for this date. Select another day with an indicator dot.
          </div>
        )}
      </div>

      {/* Reschedule Request Workflow Modal */}
      {rescheduleInterview && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div 
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#142B4A] dark:bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    Request Interview Reschedule
                  </h3>
                  <p className="text-xs text-slate-400">
                    Suggest 3 alternative time slots to {rescheduleInterview.recruiterName}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRescheduleInterview(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitReschedule} className="p-6 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Currently Confirmed Interview
                </span>
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  {rescheduleInterview.interviewType} · {rescheduleInterview.companyName}
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  Role: {rescheduleInterview.jobTitle}
                </div>
                <div className="text-amber-700 dark:text-amber-300 font-semibold pt-1">
                  Current Slot: {rescheduleInterview.confirmedSlot?.formattedDate} at {rescheduleInterview.confirmedSlot?.formattedTime}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Suggest Three (3) Alternative Time Slots:
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                  Please pick 3 viable dates and times that work for you. The recruiter will be notified to confirm one.
                </p>

                {/* 3 Slot inputs */}
                <div className="space-y-3">
                  {/* Slot 1 */}
                  <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 space-y-1.5">
                    <span className="font-bold text-blue-900 dark:text-blue-300 text-[11px]">
                      Alternative Slot 1 (Preferred)
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        required
                        value={slot1Date}
                        onChange={(e) => setSlot1Date(e.target.value)}
                        className="px-2.5 py-1.5 bg-white dark:bg-slate-750 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-100 text-xs"
                      />
                      <input
                        type="time"
                        required
                        value={slot1Time}
                        onChange={(e) => setSlot1Time(e.target.value)}
                        className="px-2.5 py-1.5 bg-white dark:bg-slate-750 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-100 text-xs"
                      />
                    </div>
                  </div>

                  {/* Slot 2 */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                      Alternative Slot 2
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        required
                        value={slot2Date}
                        onChange={(e) => setSlot2Date(e.target.value)}
                        className="px-2.5 py-1.5 bg-white dark:bg-slate-750 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-100 text-xs"
                      />
                      <input
                        type="time"
                        required
                        value={slot2Time}
                        onChange={(e) => setSlot2Time(e.target.value)}
                        className="px-2.5 py-1.5 bg-white dark:bg-slate-750 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-100 text-xs"
                      />
                    </div>
                  </div>

                  {/* Slot 3 */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                      Alternative Slot 3
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        required
                        value={slot3Date}
                        onChange={(e) => setSlot3Date(e.target.value)}
                        className="px-2.5 py-1.5 bg-white dark:bg-slate-750 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-100 text-xs"
                      />
                      <input
                        type="time"
                        required
                        value={slot3Time}
                        onChange={(e) => setSlot3Time(e.target.value)}
                        className="px-2.5 py-1.5 bg-white dark:bg-slate-750 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-100 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Reason for Reschedule / Note to Recruiter:
                </label>
                <textarea
                  rows={2}
                  required
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  placeholder="e.g. Schedule clash with executive review, available during the suggested afternoon slots..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setRescheduleInterview(null)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800 dark:hover:text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit 3 Slots to Recruiter</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
