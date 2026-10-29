import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Send,
  AlertCircle,
  HelpCircle,
  Video
} from 'lucide-react';
import { Job, ScheduledInterview } from '../types';

interface InterviewPrepReminderCardProps {
  job: Job;
  interview?: ScheduledInterview | null;
  onToast?: (message: string) => void;
  onOpenMockVideo?: () => void;
}

interface PrepTipItem {
  id: string;
  category: 'role' | 'technical' | 'logistics' | 'star';
  title: string;
  detail: string;
  completed: boolean;
}

export const InterviewPrepReminderCard: React.FC<InterviewPrepReminderCardProps> = ({
  job,
  interview,
  onToast,
  onOpenMockVideo
}) => {
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [completedTipIds, setCompletedTipIds] = useState<string[]>(['p1']);

  // Role-specific tips tailored based on job title / category
  const roleTips: PrepTipItem[] = [
    {
      id: 'p1',
      category: 'logistics',
      title: 'Environment & Tech Check (24h Before)',
      detail: 'Test audio microphone, webcam clarity, stable high-speed Wi-Fi, and ensure quiet background lighting.',
      completed: completedTipIds.includes('p1')
    },
    {
      id: 'p2',
      category: 'role',
      title: `Role Alignment for ${job.title}`,
      detail: `Review ${job.companyName}'s core business model, competitor landscape, and prepare 2 specific examples of how you used ${job.skills?.[0] || 'core skills'} in your recent work.`,
      completed: completedTipIds.includes('p2')
    },
    {
      id: 'p3',
      category: 'technical',
      title: `Technical & Domain Deep-Dive (${job.category || 'Domain'})`,
      detail: `Be ready to explain architecture trade-offs or key operational metrics: ${job.requirements[0] || 'hands-on problem solving'}.`,
      completed: completedTipIds.includes('p3')
    },
    {
      id: 'p4',
      category: 'star',
      title: 'STAR Method Behavioral Stories',
      detail: 'Prepare 3 concise stories (Situation, Task, Action, Result) highlighting overcoming setbacks, stakeholder alignment, and data-driven impact.',
      completed: completedTipIds.includes('p4')
    },
    {
      id: 'p5',
      category: 'role',
      title: 'Incisive Reverse Questions for Recruiter',
      detail: `Prepare 2 thoughtful questions for the interviewer regarding team growth at ${job.companyName} and 90-day success metrics for this ${job.title} role.`,
      completed: completedTipIds.includes('p5')
    }
  ];

  const toggleTip = (id: string) => {
    setCompletedTipIds(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const completedCount = roleTips.filter(t => completedTipIds.includes(t.id)).length;
  const progressPercent = Math.round((completedCount / roleTips.length) * 100);

  const handleSimulate24hNotification = () => {
    const slotInfo = interview?.confirmedSlot 
      ? `tomorrow at ${interview.confirmedSlot.formattedTime}` 
      : 'in 24 hours';

    if (onToast) {
      onToast(`🔔 24-Hour Interview Prep Reminder: Your ${job.title} interview with ${job.companyName} is ${slotInfo}! Checklist: ${completedCount}/${roleTips.length} items prepped.`);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-50/70 via-orange-50/30 to-white dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border border-amber-200/90 dark:border-amber-900/50 p-4 sm:p-5 space-y-4 shadow-xs">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-100 dark:border-slate-800">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold shadow-xs shrink-0 mt-0.5">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-[#142B4A] dark:text-white text-xs sm:text-sm">
                24-Hour Interview Prep Notification & Checklist
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                Role-Tailored
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Automated reminder dispatched 24 hours prior to your scheduled slot with tailored checklist items for <strong>{job.title}</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleSimulate24hNotification}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            title="Trigger simulated 24h reminder notification"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Simulate 24h Toast</span>
          </button>
        </div>
      </div>

      {/* Interview Slot Alert Status */}
      <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-amber-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {interview?.confirmedSlot 
                ? `Target Interview: ${interview.confirmedSlot.formattedDate} · ${interview.confirmedSlot.formattedTime}`
                : `Interview Alert: Active for ${job.title} (${job.companyName})`}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
              Push notification + email dispatch armed for 24h before appointment time.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={reminderEnabled}
              onChange={(e) => {
                setReminderEnabled(e.target.checked);
                if (onToast) onToast(e.target.checked ? '🔔 24-hour reminder alert enabled' : '🔕 24-hour reminder paused');
              }}
              className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
            />
            <span>Auto-Alert Active</span>
          </label>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300">
          <span>Readiness Checklist ({completedCount}/{roleTips.length} completed)</span>
          <span className="text-amber-700 dark:text-amber-400 font-bold">{progressPercent}% Ready</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-750 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-lime-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-2">
        {roleTips.map((tip) => {
          const isDone = completedTipIds.includes(tip.id);
          return (
            <div
              key={tip.id}
              onClick={() => toggleTip(tip.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                isDone
                  ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/80'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-750 hover:border-amber-300'
              }`}
            >
              <button 
                type="button" 
                className="mt-0.5 text-amber-600 dark:text-amber-400 shrink-0"
                aria-label={isDone ? 'Mark uncompleted' : 'Mark completed'}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 fill-amber-500 text-white" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-bold ${isDone ? 'text-slate-700 dark:text-slate-300 line-through' : 'text-slate-900 dark:text-white'}`}>
                    {tip.title}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 shrink-0">
                    {tip.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                  {tip.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Mock Video Action */}
      {onOpenMockVideo && (
        <div className="pt-2 border-t border-amber-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Want a quick visual rehearsal before tomorrow?
          </span>
          <button
            type="button"
            onClick={onOpenMockVideo}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-xl border border-blue-200 dark:border-blue-800 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Video className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Watch 60s AI Prep Video</span>
          </button>
        </div>
      )}

    </div>
  );
};
