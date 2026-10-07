import React, { useState } from 'react';
import { 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Smartphone, 
  Fingerprint, 
  Globe, 
  Calendar,
  AlertTriangle,
  Play,
  Square,
  Users
} from 'lucide-react';

interface TimeAndAttendanceProps {
  onOpenLeadModal: (service?: string) => void;
}

export const TimeAndAttendance: React.FC<TimeAndAttendanceProps> = ({ onOpenLeadModal }) => {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [activeBranch, setActiveBranch] = useState('Lagos HQ');

  const attendanceWidgets = [
    { label: 'Present', count: 142, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { label: 'Absent', count: 3, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
    { label: 'Late Arrival', count: 6, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { label: 'On Leave', count: 8, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { label: 'Overtime Hours', count: '48.5 hrs', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' }
  ];

  const handleToggleClock = () => {
    if (!clockedIn) {
      setClockedIn(true);
      setClockInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } else {
      setClockedIn(false);
      setClockInTime(null);
    }
  };

  const integrations = [
    { name: 'Biometric Access Gates (ZKTeco, Suprema, Anviz)', desc: 'Hardware fingerprint & facial recognition synced via NextSofthr Cloud Agent.' },
    { name: 'Mobile GPS-GeoFenced Attendance', desc: 'Field teams & remote workers clock in within verified site perimeter radius.' },
    { name: 'Web & Virtual Office Clocking', desc: 'Secure browser clock-in integrated directly into daily employee workflow.' },
    { name: 'Third-Party ERP & Attendance Sync', desc: 'REST APIs & Webhooks to import external access logs into payroll.' }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Time & Attendance Outsourcing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Know When Your People Work.”
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Eliminate buddy punching, manual sign-in books, and attendance disputes. NextSofthr captures real-time attendance across multiple locations, reconciling hours directly into monthly payroll.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenLeadModal('Time & Attendance Outsourcing')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Outsource Attendance Management</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Widgets: Present | Absent | Late | On Leave | Overtime */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Live Workforce Monitor</span>
            <h2 className="text-2xl font-bold text-slate-900">Today's Shift Attendance Dashboard</h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Filter Location:</span>
            <select
              value={activeBranch}
              onChange={(e) => setActiveBranch(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none"
            >
              <option value="All Locations">All Entities & Branches</option>
              <option value="Lagos HQ">Lagos HQ (Nigeria)</option>
              <option value="Nairobi Hub">Nairobi Hub (Kenya)</option>
              <option value="Accra Branch">Accra Branch (Ghana)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {attendanceWidgets.map((w) => (
            <div key={w.label} className={`p-5 rounded-2xl border ${w.border} ${w.bg} shadow-sm space-y-1`}>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{w.label}</span>
              <div className={`text-2xl sm:text-3xl font-black ${w.color}`}>{w.count}</div>
              <span className="text-[10px] text-slate-500">Reconciled automatically</span>
            </div>
          ))}
        </div>
      </section>

      {/* Live Interactive Clock-In Simulator & Shift Management */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Clock-In Widget Simulator */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-700" />
                <h3 className="font-bold text-slate-900 text-base">Interactive Employee Clock-In Terminal</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                GPS Verified
              </span>
            </div>

            <div className="text-center py-6 space-y-4">
              <div className="text-xs text-slate-500">
                Current Location: <strong>Lagos Victoria Island Office (Geofence radius: 50m)</strong>
              </div>

              <div className="font-mono text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>

              <div className="pt-2">
                <button
                  onClick={handleToggleClock}
                  className={`px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto ${
                    clockedIn
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {clockedIn ? (
                    <>
                      <Square className="w-4 h-4 fill-current" />
                      <span>Clock Out Shift</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Clock In Shift</span>
                    </>
                  )}
                </button>
              </div>

              {clockedIn && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium animate-in fade-in">
                  ✓ Clocked in at <span className="font-mono font-bold">{clockInTime}</span>. Coordinates logged to NextSofthr Time Audit ledger.
                </div>
              )}
            </div>
          </div>

          {/* Biometric & System Integrations */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Fingerprint className="w-5 h-5 text-lime-700" />
              <h3 className="font-bold text-slate-900 text-base">Multi-Channel Attendance Integrations</h3>
            </div>

            <div className="space-y-3">
              {integrations.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>{item.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
