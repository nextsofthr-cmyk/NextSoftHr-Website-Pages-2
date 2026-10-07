import { useState, useEffect } from 'react';
import { 
  Clock, MapPin, Fingerprint, Smartphone, CheckCircle2, 
  AlertCircle, Radio, Timer, Activity, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { TIME_ATTENDANCE_FEATURES } from '../data/mockData';

interface TimeAttendanceSectionProps {
  onOpenDemo: () => void;
}

export const TimeAttendanceSection = ({ onOpenDemo }: TimeAttendanceSectionProps) => {
  const [clockedIn, setClockedIn] = useState(true);
  const [currentTime, setCurrentTime] = useState('09:42:18 AM');
  const [geoStatus, setGeoStatus] = useState<'verified' | 'locating'>('verified');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleClock = () => {
    setGeoStatus('locating');
    setTimeout(() => {
      setClockedIn(!clockedIn);
      setGeoStatus('verified');
    }, 400);
  };

  return (
    <section id="attendance" className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 border border-lime-300 dark:border-lime-800 uppercase tracking-wider mb-3 inline-block">
            Smart Attendance & Time Tracking
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Know Who’s Working, When and Where.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
            Eliminate buddy punching and time leakage. Combine mobile GPS geofencing, facial biometrics, and automated overtime tracking into one live operational roster.
          </p>
        </div>

        {/* Visual Split: Live Mobile Clock-In Simulator & Attendance Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column: Interactive Mobile Clock-In Simulator */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-slate-900 rounded-[38px] p-4 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700">
              
              {/* Phone screen */}
              <div className="bg-slate-950 rounded-[30px] p-5 text-white flex flex-col justify-between min-h-[480px]">
                
                {/* Status Bar */}
                <div className="flex justify-between items-center text-[11px] text-slate-400 pb-3 border-b border-slate-800">
                  <span className="font-mono">{currentTime}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                    <span className="text-lime-300 font-semibold">GPS Active</span>
                  </div>
                </div>

                {/* User Header */}
                <div className="text-center my-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-lime-400 p-0.5 mx-auto mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                      alt="Employee selfie"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h4 className="font-bold text-sm text-white">Amara Okafor</h4>
                  <p className="text-xs text-slate-400">London Regional Office</p>
                </div>

                {/* Geofence check badge */}
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" /> Geofence Zone
                    </span>
                    <span className="text-lime-400 font-bold text-[11px]">
                      {geoStatus === 'locating' ? 'Acquiring Fix...' : 'Inside Perimeter (12m)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Fingerprint className="w-3.5 h-3.5 text-lime-500" /> Biometric Token
                    </span>
                    <span className="text-slate-300 font-mono text-[10px]">Verified ✓</span>
                  </div>
                </div>

                {/* Big Interactive Clock In/Out Button */}
                <div className="my-5 text-center">
                  <button
                    id="mobile-clock-toggle-btn"
                    onClick={handleToggleClock}
                    className={`w-32 h-32 rounded-full mx-auto flex flex-col items-center justify-center font-bold transition-all shadow-xl active:scale-95 ${
                      clockedIn
                        ? 'bg-gradient-to-b from-rose-500 to-rose-700 text-white shadow-rose-900/40 hover:from-rose-600 hover:to-rose-800'
                        : 'bg-gradient-to-b from-lime-400 to-lime-600 text-slate-950 shadow-lime-900/40 hover:from-lime-300 hover:to-lime-500'
                    }`}
                  >
                    <Clock className="w-7 h-7 mb-1" />
                    <span className="text-sm uppercase tracking-wider">
                      {clockedIn ? 'Clock Out' : 'Clock In'}
                    </span>
                    <span className="text-[10px] opacity-80 mt-0.5">
                      {clockedIn ? 'Working 4h 18m' : 'Tap to Start'}
                    </span>
                  </button>
                </div>

                {/* Bottom live confirmation */}
                <div className="text-center text-xs text-slate-400">
                  {clockedIn ? (
                    <span className="text-lime-400 font-semibold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" /> Shift Active • Overtime Safe
                    </span>
                  ) : (
                    <span className="text-slate-400">Off Clock • Next Shift Tomorrow 09:00</span>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Attendance Management Cockpit */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Status Roster Card */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-600 text-white">
                    <Radio className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">Live Attendance Radar</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Real-time synchronization across 14 global offices</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  98.2% On-Time Today
                </span>
              </div>

              {/* Attendance metrics bar */}
              <div className="grid grid-cols-3 gap-3 my-5 text-center">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">2,766</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Clocked In Now</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400">18</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Late Arrivals (Auto-Logged)</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-xl font-extrabold text-slate-700 dark:text-slate-300">56</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">On Approved Leave</div>
                </div>
              </div>

              {/* Sample real-time records */}
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="font-bold text-slate-900 dark:text-white">Marcus Chen</span>
                    <span className="text-slate-400 dark:text-slate-500">Sales Ops (Singapore)</span>
                  </div>
                  <span className="text-slate-600 dark:text-slate-400 font-mono">08:58 AM • Fingerprint Terminal 02</span>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="font-bold text-slate-900 dark:text-white">Sarah Jenkins</span>
                    <span className="text-slate-400 dark:text-slate-500">Remote (New York)</span>
                  </div>
                  <span className="text-slate-600 dark:text-slate-400 font-mono">09:02 AM • Mobile GPS Verified</span>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="font-bold text-slate-900 dark:text-white">David Althaus</span>
                    <span className="text-slate-400 dark:text-slate-500">Health Clinic (Berlin)</span>
                  </div>
                  <span className="text-amber-700 dark:text-amber-400 font-medium">Overtime Threshold: 1.5h Remaining</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Exportable to statutory compliance payroll audit logs in 1 click.
                </span>
                <button
                  onClick={onOpenDemo}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>View Attendance Reporting</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIME_ATTENDANCE_FEATURES.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
            >
              <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">
                {feat.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
