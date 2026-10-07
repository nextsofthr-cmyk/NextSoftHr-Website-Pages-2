import { useState } from 'react';
import { Calendar, Users, Clock, AlertTriangle, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';

interface ShiftScheduleProps {
  onOpenDemo: () => void;
}

export const ShiftScheduleSection = ({ onOpenDemo }: ShiftScheduleProps) => {
  const [swapped, setSwapped] = useState(false);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const scheduleRoster = [
    {
      name: 'Elena Rostova',
      role: 'Staff Engineer',
      shifts: ['09:00 - 17:00', '09:00 - 17:00', '09:00 - 17:00', '09:00 - 17:00', '09:00 - 17:00', 'OFF', 'OFF'],
      color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800'
    },
    {
      name: 'Marcus Chen',
      role: 'Support Lead',
      shifts: swapped 
        ? ['16:00 - 00:00', 'OFF', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', 'OFF', 'OFF']
        : ['OFF', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', 'OFF', 'OFF'],
      color: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/80 dark:text-purple-300 dark:border-purple-800'
    },
    {
      name: 'Amara Okafor',
      role: 'Operations',
      shifts: swapped 
        ? ['OFF', '08:00 - 16:00', '08:00 - 16:00', '08:00 - 16:00', 'OFF', '08:00 - 16:00', 'OFF']
        : ['08:00 - 16:00', 'OFF', '08:00 - 16:00', '08:00 - 16:00', 'OFF', '08:00 - 16:00', 'OFF'],
      color: 'bg-lime-100 text-lime-900 border-lime-300 dark:bg-lime-950/80 dark:text-lime-300 dark:border-lime-800'
    }
  ];

  return (
    <section id="shifts" className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-wider mb-3 inline-block">
            Shift & Schedule Automation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Build Smarter Workforce Schedules.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
            Eliminate double-booking and overtime fatigue. Plan rotating shifts, manage cross-location rosters, and let employees swap shifts with 1-click manager approvals.
          </p>
        </div>

        {/* Interactive Schedule Board */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mb-12">
          
          {/* Top roster controls */}
          <div className="p-4 sm:p-6 bg-slate-900 dark:bg-slate-950 text-white flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-600 text-white">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white">Global Customer Support & Ops (Week 38)</h4>
                <p className="text-xs text-slate-400">100% Shift Coverage • Overtime Guard Active</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSwapped(!swapped)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-lime-400 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Simulate Shift Swap</span>
              </button>

              <button
                onClick={onOpenDemo}
                className="px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs transition-colors"
              >
                Publish Schedule
              </button>
            </div>
          </div>

          {/* Calendar Roster Table */}
          <div className="p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-3 px-3 font-bold text-slate-700 dark:text-slate-300 w-48">Employee</th>
                  {days.map((d, i) => (
                    <th key={d} className="text-center py-3 px-2 font-bold text-slate-600 dark:text-slate-400">
                      <div>{d}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">Sep {15 + i}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {scheduleRoster.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-3">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{row.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{row.role}</div>
                    </td>
                    {row.shifts.map((shift, sIdx) => (
                      <td key={sIdx} className="text-center py-3 px-1.5">
                        {shift === 'OFF' ? (
                          <span className="px-2 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-md">
                            OFF
                          </span>
                        ) : (
                          <span className={`px-2 py-1 text-[10px] font-bold rounded-md border inline-block whitespace-nowrap ${row.color}`}>
                            {shift}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Overtime & Notification bar */}
            <div className="mt-5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                <span>
                  {swapped ? 'Shift Swap Approved: Marcus Chen & Amara Okafor notified via SMS & App.' : 'All schedules conform with statutory rest regulations and mandatory break intervals.'}
                </span>
              </div>
              <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                Overtime Cap: Max 4 hrs/wk (0 Violations)
              </span>
            </div>
          </div>

        </div>

        {/* Feature Checkpoints */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300 text-center">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            Multi-location Shift Templates
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            Automated Staff Availability
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            Employee Mobile Shift Swapping
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            Overtime & Fatigue Guardrails
          </div>
        </div>

      </div>
    </section>
  );
};
