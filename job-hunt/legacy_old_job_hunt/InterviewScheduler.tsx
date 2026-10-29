import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  XCircle, 
  Plus, 
  Trash2, 
  User, 
  Mail, 
  ExternalLink, 
  Copy, 
  Check, 
  CalendarDays,
  Sparkles,
  Info,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { 
  Job, 
  ScheduledInterview, 
  InterviewSlot, 
  InterviewStatus, 
  InterviewType 
} from '../types';

interface InterviewSchedulerProps {
  job: Job;
  interviews: ScheduledInterview[];
  onScheduleInterview: (interview: ScheduledInterview) => void;
  onUpdateInterviewStatus: (
    interviewId: string, 
    status: InterviewStatus, 
    confirmedSlotId?: string, 
    notes?: string
  ) => void;
  initialPerspective?: 'recruiter' | 'candidate';
  candidateDefaultName?: string;
  candidateDefaultEmail?: string;
  onToast?: (message: string) => void;
}

const INTERVIEW_TYPES: InterviewType[] = [
  'Video Call (Google Meet)',
  'Technical Screen',
  'On-Site Assessment',
  'Executive Panel',
  'HR Cultural Fit'
];

export const InterviewScheduler: React.FC<InterviewSchedulerProps> = ({
  job,
  interviews,
  onScheduleInterview,
  onUpdateInterviewStatus,
  initialPerspective = 'candidate',
  candidateDefaultName = 'Adaeze Okonkwo',
  candidateDefaultEmail = 'adaeze.okonkwo@example.com',
  onToast
}) => {
  // Perspective: Recruiter proposes slots, Candidate confirms slots
  const [perspective, setPerspective] = useState<'recruiter' | 'candidate'>(initialPerspective);

  // Find existing interview for this job
  const jobInterviews = interviews.filter(i => i.jobId === job.id);
  const activeInterview = jobInterviews.length > 0 ? jobInterviews[0] : null;

  // Candidate Slot Selection State
  const [selectedSlotId, setSelectedSlotId] = useState<string>(
    activeInterview?.confirmedSlotId || activeInterview?.proposedSlots[0]?.id || ''
  );
  const [rescheduleReason, setRescheduleReason] = useState('');
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Recruiter Proposal Form State
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [recruiterName, setRecruiterName] = useState(job.recruiterSource === 'NextSoftHR RPO' ? 'Chinedu Eze (NextSoft RPO)' : 'Hiring Lead');
  const [recruiterEmail, setRecruiterEmail] = useState('recruitment@nextsofthr.com');
  const [candidateName, setCandidateName] = useState(activeInterview?.candidateName || candidateDefaultName);
  const [candidateEmail, setCandidateEmail] = useState(activeInterview?.candidateEmail || candidateDefaultEmail);
  const [interviewType, setInterviewType] = useState<InterviewType>(activeInterview?.interviewType || 'Video Call (Google Meet)');
  const [meetingLink, setMeetingLink] = useState('https://meet.google.com/nxt-hrm-' + Math.random().toString(36).substring(2, 6));
  const [locationAddress, setLocationAddress] = useState(job.location || 'Victoria Island, Lagos');
  const [notes, setNotes] = useState(activeInterview?.notes || 'Please be prepared to discuss your past projects and portfolio accomplishments.');

  // Default slots helper
  const getDefaultSlots = (): InterviewSlot[] => {
    const today = new Date();
    const d1 = new Date(today);
    d1.setDate(today.getDate() + 2);
    d1.setHours(10, 0, 0, 0);

    const d2 = new Date(today);
    d2.setDate(today.getDate() + 2);
    d2.setHours(14, 30, 0, 0);

    const d3 = new Date(today);
    d3.setDate(today.getDate() + 3);
    d3.setHours(11, 0, 0, 0);

    return [
      {
        id: `slot-${Date.now()}-1`,
        datetime: d1.toISOString().slice(0, 16),
        formattedDate: d1.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
        formattedTime: '10:00 AM (WAT)',
        durationMinutes: 45
      },
      {
        id: `slot-${Date.now()}-2`,
        datetime: d2.toISOString().slice(0, 16),
        formattedDate: d2.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
        formattedTime: '02:30 PM (WAT)',
        durationMinutes: 45
      },
      {
        id: `slot-${Date.now()}-3`,
        datetime: d3.toISOString().slice(0, 16),
        formattedDate: d3.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
        formattedTime: '11:00 AM (WAT)',
        durationMinutes: 45
      }
    ];
  };

  const [proposedSlots, setProposedSlots] = useState<InterviewSlot[]>(
    activeInterview?.proposedSlots && activeInterview.proposedSlots.length > 0
      ? activeInterview.proposedSlots
      : getDefaultSlots()
  );

  // Handle adding slot
  const handleAddSlot = () => {
    const today = new Date();
    today.setDate(today.getDate() + (proposedSlots.length + 1));
    today.setHours(10 + (proposedSlots.length % 5), 0, 0, 0);

    const newSlot: InterviewSlot = {
      id: `slot-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      datetime: today.toISOString().slice(0, 16),
      formattedDate: today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      formattedTime: '10:00 AM (WAT)',
      durationMinutes: 45
    };
    setProposedSlots(prev => [...prev, newSlot]);
  };

  // Handle slot field changes
  const handleSlotChange = (index: number, field: keyof InterviewSlot, value: any) => {
    setProposedSlots(prev => {
      const updated = [...prev];
      const slot = { ...updated[index], [field]: value };
      
      if (field === 'datetime') {
        try {
          const dateObj = new Date(value);
          if (!isNaN(dateObj.getTime())) {
            slot.formattedDate = dateObj.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            });
            slot.formattedTime = dateObj.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }) + ' (WAT)';
          }
        } catch {
          // ignore parsing error
        }
      }
      
      updated[index] = slot;
      return updated;
    });
  };

  const handleRemoveSlot = (index: number) => {
    if (proposedSlots.length <= 1) {
      if (onToast) onToast('At least one interview time slot is required.');
      return;
    }
    setProposedSlots(prev => prev.filter((_, i) => i !== index));
  };

  // Preset button
  const addPresetSlot = (daysOffset: number, hours: number, minutes: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    d.setHours(hours, minutes, 0, 0);
    const newSlot: InterviewSlot = {
      id: `slot-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      datetime: d.toISOString().slice(0, 16),
      formattedDate: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      formattedTime: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' (WAT)',
      durationMinutes: 45
    };
    setProposedSlots(prev => [...prev, newSlot]);
    if (onToast) onToast(`Added slot for ${newSlot.formattedDate} at ${newSlot.formattedTime}`);
  };

  // Recruiter: Propose Slots
  const handleProposeSlotsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (proposedSlots.length === 0) {
      if (onToast) onToast('Please add at least one proposed time slot.');
      return;
    }

    const newInterview: ScheduledInterview = {
      id: activeInterview?.id || `intv-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.companyName,
      candidateName,
      candidateEmail,
      recruiterName,
      recruiterEmail,
      interviewType,
      proposedSlots,
      meetingLink: interviewType.includes('Video') ? meetingLink : undefined,
      location: interviewType === 'On-Site Assessment' ? locationAddress : undefined,
      notes,
      status: 'proposed',
      createdAt: activeInterview?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onScheduleInterview(newInterview);
    setIsCreatingNew(false);
    setSelectedSlotId(proposedSlots[0]?.id || '');
    if (onToast) {
      onToast(`Successfully proposed ${proposedSlots.length} interview slots to ${candidateName}!`);
    }
  };

  // Candidate: Confirm Slot
  const handleConfirmSlot = () => {
    if (!activeInterview) return;
    if (!selectedSlotId) {
      if (onToast) onToast('Please select a time slot to confirm.');
      return;
    }

    const chosen = activeInterview.proposedSlots.find(s => s.id === selectedSlotId);
    onUpdateInterviewStatus(activeInterview.id, 'confirmed', selectedSlotId);
    if (onToast) {
      onToast(`Interview confirmed for ${chosen?.formattedDate || 'the selected date'} at ${chosen?.formattedTime || 'selected time'}!`);
    }
  };

  // Candidate: Request Reschedule
  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInterview) return;

    onUpdateInterviewStatus(
      activeInterview.id, 
      'rescheduled', 
      undefined, 
      rescheduleReason ? `Candidate Note: ${rescheduleReason}` : 'Candidate requested alternate times'
    );
    setShowRescheduleForm(false);
    if (onToast) {
      onToast('Reschedule request sent to the hiring recruiter.');
    }
  };

  // Copy Meeting Link
  const handleCopyMeetingLink = (linkToCopy: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(linkToCopy);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      if (onToast) onToast('Meeting link copied to clipboard!');
    }
  };

  // Generate .ICS Calendar download
  const handleDownloadCalendarEvent = () => {
    if (!activeInterview || !activeInterview.confirmedSlot) return;
    const slot = activeInterview.confirmedSlot;
    const startIso = new Date(slot.datetime).toISOString().replace(/-|:|\.\d+/g, '');
    const endDate = new Date(new Date(slot.datetime).getTime() + (slot.durationMinutes || 45) * 60000);
    const endIso = endDate.toISOString().replace(/-|:|\.\d+/g, '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NextSoftHR//Interview Scheduler//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${activeInterview.id}@nextsofthr.com`,
      `DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d+/g, '')}`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      `SUMMARY:${activeInterview.interviewType}: ${job.title} at ${job.companyName}`,
      `DESCRIPTION:Interview with ${activeInterview.recruiterName}. Meeting Link: ${activeInterview.meetingLink || 'N/A'}\\nNotes: ${activeInterview.notes || ''}`,
      `LOCATION:${activeInterview.meetingLink || activeInterview.location || 'Online Video Meeting'}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `NextSoftHR_Interview_${job.companyName.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (onToast) onToast('Calendar invite (.ics) downloaded!');
  };

  // Status Badge UI helper
  const renderStatusBadge = (status: InterviewStatus) => {
    switch (status) {
      case 'proposed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Slots Proposed (Awaiting Candidate)
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-lime-50 dark:bg-lime-950/50 text-lime-800 dark:text-lime-300 border border-lime-200 dark:border-lime-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
            Interview Confirmed
          </span>
        );
      case 'rescheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            <RefreshCw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-spin" />
            Reschedule Requested
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Interview Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
            <XCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Perspective Switcher & Role Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/50 to-teal-50/40 dark:from-slate-900 dark:via-blue-950/30 dark:to-teal-950/20 border border-blue-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#2563EB] dark:text-blue-400" />
            <h3 className="font-bold text-sm sm:text-base text-[#142B4A] dark:text-white">
              Interactive Interview Scheduler
            </h3>
            {activeInterview && renderStatusBadge(activeInterview.status)}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Toggle your perspective below to experience both recruiter time proposing and candidate slot confirmation.
          </p>
        </div>

        {/* Dual Role Segmented Buttons */}
        <div className="flex items-center bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto shrink-0 shadow-xs">
          <button
            type="button"
            onClick={() => setPerspective('candidate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              perspective === 'candidate'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>🎯 Candidate View</span>
          </button>
          <button
            type="button"
            onClick={() => setPerspective('recruiter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              perspective === 'recruiter'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>👔 Recruiter / Hiring Team</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. CANDIDATE PERSPECTIVE */}
      {/* ------------------------------------------------------------- */}
      {perspective === 'candidate' && (
        <div className="space-y-6">
          {!activeInterview ? (
            <div className="p-8 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  No Interview Proposed Yet
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  The recruiter has not yet issued time slots for this opening. You can switch to the Recruiter View above to propose slots for testing!
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPerspective('recruiter');
                  setIsCreatingNew(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Switch to Recruiter View & Propose Slots</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Interview Overview Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                      {activeInterview.interviewType}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      Interview with {activeInterview.recruiterName}
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      For Position: <strong className="text-slate-700 dark:text-slate-200">{job.title}</strong> at {job.companyName}
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-slate-400 block">Candidate Name</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {activeInterview.candidateName}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                      {activeInterview.candidateEmail}
                    </span>
                  </div>
                </div>

                {/* Logistics Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-xs">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <Video className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <div className="truncate">
                      <span className="text-[11px] text-slate-400 block">Interview Format</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                        {activeInterview.meetingLink ? 'Google Meet Video Call' : activeInterview.location || 'Remote Video Session'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <Clock className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
                    <div>
                      <span className="text-[11px] text-slate-400 block">Estimated Duration</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {activeInterview.confirmedSlot?.durationMinutes || activeInterview.proposedSlots[0]?.durationMinutes || 45} Minutes
                      </span>
                    </div>
                  </div>
                </div>

                {activeInterview.notes && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Interviewer Notes & Preparation:</span>
                      <p className="mt-0.5 leading-relaxed">{activeInterview.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Specific Section */}
              {activeInterview.status === 'confirmed' && activeInterview.confirmedSlot ? (
                /* Confirmed Banner & Meeting Room Card */
                <div className="p-6 rounded-2xl bg-gradient-to-br from-lime-50 via-teal-50 to-white dark:from-slate-900 dark:via-lime-950/20 dark:to-slate-900 border-2 border-lime-500/30 dark:border-lime-600/40 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-lime-100 dark:bg-lime-900/60 text-lime-700 dark:text-lime-300 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                        Your Interview is Confirmed!
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        A calendar appointment and confirmation email have been locked in.
                      </p>
                    </div>
                  </div>

                  {/* Confirmed Slot Details Highlight */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-lime-200 dark:border-lime-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-lime-50 dark:bg-slate-700 rounded-xl text-lime-700 dark:text-lime-400">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 uppercase font-semibold">Scheduled Appointment</span>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {activeInterview.confirmedSlot.formattedDate}
                        </div>
                        <div className="text-xs font-semibold text-lime-700 dark:text-lime-400">
                          {activeInterview.confirmedSlot.formattedTime} ({activeInterview.confirmedSlot.durationMinutes} mins)
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleDownloadCalendarEvent}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Download .ics file for Google Calendar, Outlook, Apple Calendar"
                      >
                        <CalendarDays className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Add to Calendar (.ics)</span>
                      </button>

                      {activeInterview.meetingLink && (
                        <a
                          href={activeInterview.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                        >
                          <Video className="w-4 h-4" />
                          <span>Join Video Meeting</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Meeting Link with Copy Button */}
                  {activeInterview.meetingLink && (
                    <div className="flex items-center justify-between gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Video className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
                        <span className="text-slate-500 dark:text-slate-400 text-[11px]">Meeting Link:</span>
                        <span className="font-mono text-slate-700 dark:text-slate-300 truncate">
                          {activeInterview.meetingLink}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyMeetingLink(activeInterview.meetingLink!)}
                        className="px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-lime-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}

                  {/* Reschedule option */}
                  <div className="pt-2 flex items-center justify-between border-t border-emerald-200/60 dark:border-slate-800">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Need to adjust or change this time?
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowRescheduleForm(!showRescheduleForm)}
                      className="text-xs text-[#2563EB] dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Request a Reschedule</span>
                    </button>
                  </div>
                </div>
              ) : activeInterview.status === 'rescheduled' ? (
                /* Rescheduled State Notice */
                <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/80 text-indigo-600 dark:text-indigo-300 flex items-center justify-center shrink-0">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Reschedule Requested
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        You requested a new time slot from the recruiter. They will review their availability and propose alternate times shortly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => setPerspective('recruiter')}
                      className="text-xs text-indigo-700 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
                    >
                      Switch to Recruiter View to update slots &rarr;
                    </button>
                  </div>
                </div>
              ) : (
                /* Proposed State: Candidate Slot Selection Grid */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Select Your Preferred Interview Slot
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Choose one of the recruiter's proposed times below and confirm your slot.
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {activeInterview.proposedSlots.length} available slots
                    </span>
                  </div>

                  {/* Slot Cards List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {activeInterview.proposedSlots.map((slot) => {
                      const isSelected = selectedSlotId === slot.id;
                      return (
                        <div
                          key={slot.id}
                          onClick={() => setSelectedSlotId(slot.id)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#2563EB] bg-blue-50/50 dark:bg-blue-950/40 shadow-md shadow-blue-500/10'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Calendar className={`w-4 h-4 ${isSelected ? 'text-[#2563EB] dark:text-blue-400' : 'text-slate-400'}`} />
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                                {slot.formattedDate}
                              </span>
                            </div>

                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-[#2563EB] bg-[#2563EB] text-white'
                                : 'border-slate-300 dark:border-slate-600'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>

                          <div className="mt-3 space-y-1">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>{slot.formattedTime}</span>
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                              Duration: {slot.durationMinutes} minutes
                            </span>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                            <span className={isSelected ? 'text-blue-700 dark:text-blue-400 font-semibold' : 'text-slate-400'}>
                              {isSelected ? 'Selected' : 'Click to select'}
                            </span>
                            <span className="text-slate-400 font-mono text-[10px]">WAT</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Confirm CTA Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setShowRescheduleForm(!showRescheduleForm)}
                      className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold flex items-center gap-1 cursor-pointer order-2 sm:order-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>None of these times work? Request reschedule</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleConfirmSlot}
                      disabled={!selectedSlotId}
                      className="w-full sm:w-auto px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Selected Slot</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Candidate Reschedule Form Modal/Drawer */}
              {showRescheduleForm && (
                <form 
                  onSubmit={handleRescheduleSubmit}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in duration-150"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Request Alternate Time Slots</span>
                    </h5>
                    <button
                      type="button"
                      onClick={() => setShowRescheduleForm(false)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Let the recruiter know what days or times work best for your schedule (e.g. afternoons after 3 PM, next Tuesday, etc.).
                  </p>
                  <textarea
                    rows={2}
                    required
                    value={rescheduleReason}
                    onChange={(e) => setRescheduleReason(e.target.value)}
                    placeholder="e.g. I have a prior commitment during morning hours. Could we do Thursday or Friday afternoon after 2:00 PM?"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Reschedule Request</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. RECRUITER / HIRING TEAM PERSPECTIVE */}
      {/* ------------------------------------------------------------- */}
      {perspective === 'recruiter' && (
        <div className="space-y-6">
          
          {/* Active Status Overview & Actions */}
          {activeInterview && !isCreatingNew && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Active Interview Pipeline Record
                    </span>
                    {renderStatusBadge(activeInterview.status)}
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Candidate: <strong>{activeInterview.candidateName}</strong> ({activeInterview.candidateEmail})
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(true)}
                    className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-lg border border-blue-200 dark:border-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Edit Slots / Propose New</span>
                  </button>

                  {activeInterview.status !== 'completed' && (
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateInterviewStatus(activeInterview.id, 'completed');
                        if (onToast) onToast('Interview marked as Completed!');
                      }}
                      className="px-3 py-1.5 bg-lime-50 dark:bg-lime-950/60 hover:bg-lime-100 text-lime-800 dark:text-lime-300 text-xs font-bold rounded-lg border border-lime-200 dark:border-lime-800 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark Completed</span>
                    </button>
                  )}

                  {activeInterview.status !== 'cancelled' && (
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateInterviewStatus(activeInterview.id, 'cancelled');
                        if (onToast) onToast('Interview status changed to Cancelled.');
                      }}
                      className="px-3 py-1.5 bg-red-50 dark:bg-red-950/60 hover:bg-red-100 text-red-700 dark:text-red-300 text-xs font-bold rounded-lg border border-red-200 dark:border-red-800 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Slot Breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Current Proposed Slots & Confirmation Status:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {activeInterview.proposedSlots.map((s, idx) => {
                    const isConfirmedSlot = activeInterview.confirmedSlotId === s.id;
                    return (
                      <div 
                        key={s.id} 
                        className={`p-3 rounded-xl border flex flex-col justify-between ${
                          isConfirmedSlot
                            ? 'bg-lime-50 dark:bg-lime-950/40 border-lime-300 dark:border-lime-800 text-lime-900 dark:text-lime-200 font-semibold'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 uppercase">Option {idx + 1}</span>
                          {isConfirmedSlot && (
                            <span className="text-[10px] font-bold text-lime-700 dark:text-lime-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Confirmed
                            </span>
                          )}
                        </div>
                        <div className="mt-1 font-bold">{s.formattedDate}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{s.formattedTime} ({s.durationMinutes}m)</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Direct Link Info */}
              {activeInterview.meetingLink && (
                <div className="flex items-center justify-between gap-2 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 truncate">
                    Google Meet: <strong className="text-slate-700 dark:text-slate-200 font-mono">{activeInterview.meetingLink}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyMeetingLink(activeInterview.meetingLink!)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                    title="Copy Meeting Link"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Slot Proposal Form (New or Editing) */}
          {(isCreatingNew || !activeInterview) && (
            <form onSubmit={handleProposeSlotsSubmit} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-sm text-[#142B4A] dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Propose Interview Time Slots to Candidate</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Specify 1 to 4 available windows. The candidate will pick their preferred slot.
                  </p>
                </div>
                {activeInterview && (
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {/* Candidate & Recruiter Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Candidate Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="e.g. Babatunde Sowore"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Candidate Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      placeholder="candidate@example.com"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Interview Stage / Type
                  </label>
                  <select
                    value={interviewType}
                    onChange={(e) => setInterviewType(e.target.value as InterviewType)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {INTERVIEW_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Recruiter / Interviewer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={recruiterName}
                    onChange={(e) => setRecruiterName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Format Details: Video URL or Physical Location */}
              {interviewType === 'On-Site Assessment' ? (
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 text-xs">
                    Office / Assessment Center Address
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={locationAddress}
                      onChange={(e) => setLocationAddress(e.target.value)}
                      placeholder="e.g. NextSoft Innovation Hub, 14 Adeola Hopewell, VI, Lagos"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 text-xs">
                      Video Meeting URL (Google Meet / Zoom)
                    </label>
                    <button
                      type="button"
                      onClick={() => setMeetingLink(`https://meet.google.com/nxt-${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 5)}`)}
                      className="text-[11px] text-[#2563EB] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Generate Google Meet</span>
                    </button>
                  </div>
                  <div className="relative">
                    <Video className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="url"
                      value={meetingLink}
                      onChange={(e) => setMeetingLink(e.target.value)}
                      placeholder="https://meet.google.com/..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Slots List Section */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="font-bold text-slate-800 dark:text-slate-200 text-xs block">
                      Proposed Time Windows
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Add options for the candidate to select from.
                    </span>
                  </div>

                  {/* 1-Click Quick Presets */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Quick add:</span>
                    <button
                      type="button"
                      onClick={() => addPresetSlot(1, 10, 0)}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-semibold cursor-pointer transition-colors"
                    >
                      + Tomorrow 10am
                    </button>
                    <button
                      type="button"
                      onClick={() => addPresetSlot(1, 14, 0)}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-semibold cursor-pointer transition-colors"
                    >
                      + Tomorrow 2pm
                    </button>
                    <button
                      type="button"
                      onClick={() => addPresetSlot(3, 11, 30)}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-semibold cursor-pointer transition-colors"
                    >
                      + In 3 Days 11:30am
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {proposedSlots.map((slot, index) => (
                    <div 
                      key={slot.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-3 text-xs"
                    >
                      <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-[#2563EB] dark:text-blue-300 font-bold flex items-center justify-center shrink-0 text-xs">
                        {index + 1}
                      </div>

                      {/* Date & Time Picker */}
                      <div className="flex-1 w-full sm:w-auto">
                        <label className="text-[10px] text-slate-400 block mb-0.5">Date & Time (WAT)</label>
                        <input
                          type="datetime-local"
                          required
                          value={slot.datetime}
                          onChange={(e) => handleSlotChange(index, 'datetime', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Duration Picker */}
                      <div className="w-full sm:w-36">
                        <label className="text-[10px] text-slate-400 block mb-0.5">Duration</label>
                        <select
                          value={slot.durationMinutes}
                          onChange={(e) => handleSlotChange(index, 'durationMinutes', Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={30}>30 minutes</option>
                          <option value={45}>45 minutes</option>
                          <option value={60}>60 minutes</option>
                          <option value={90}>90 minutes</option>
                        </select>
                      </div>

                      {/* Formatted Preview */}
                      <div className="w-full sm:w-44 text-[11px] text-slate-600 dark:text-slate-300 truncate">
                        <span className="font-semibold block truncate">{slot.formattedDate}</span>
                        <span className="text-slate-400">{slot.formattedTime}</span>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleRemoveSlot(index)}
                        disabled={proposedSlots.length <= 1}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 disabled:opacity-30 cursor-pointer transition-colors"
                        title="Delete Slot"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddSlot}
                  className="w-full py-2.5 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Time Slot Option</span>
                </button>
              </div>

              {/* Recruiter Notes / Agenda */}
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 text-xs">
                  Candidate Agenda & Preparation Instructions
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. 15-min background, 20-min portfolio deep-dive, 10-min Q&A..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Propose Slots to Candidate</span>
                </button>
              </div>
            </form>
          )}

        </div>
      )}

      {/* Trust & Verification Footnote */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 flex items-center gap-2.5 text-[11px] text-slate-500 dark:text-slate-400">
        <ShieldCheck className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
        <span>
          NextSoftHR Interview Shield verifies real-time calendar availability, generates encrypted video links, and logs candidate status changes in your persistent hiring pipeline.
        </span>
      </div>

    </div>
  );
};
