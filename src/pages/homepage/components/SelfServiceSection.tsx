import { useState } from 'react';
import { 
  UserCheck, Shield, Smartphone, Laptop, CheckCircle2, 
  ArrowRight, FileText, Calendar, Clock, DollarSign, Award, Bell 
} from 'lucide-react';
import { ESS_FEATURES, MSS_FEATURES } from '../data/mockData';

interface SelfServiceProps {
  onOpenDemo: () => void;
  onOpenPayslip: () => void;
}

export const SelfServiceSection = ({ onOpenDemo, onOpenPayslip }: SelfServiceProps) => {
  const [activePortal, setActivePortal] = useState<'ess' | 'mss'>('ess');

  return (
    <section id="self-service" className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-wider mb-3 inline-block">
            Self-Service Hub (ESS & MSS)
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Empower Your Employees. Free Up Your Managers.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
            Eliminate endless email threads and routine HR inquiries. Give your workforce mobile self-service and give team leaders real-time supervisory powers.
          </p>
        </div>

        {/* Portal Switcher Buttons */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-xs font-bold">
            <button
              onClick={() => setActivePortal('ess')}
              className={`px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activePortal === 'ess'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Employee Self-Service (ESS)</span>
            </button>

            <button
              onClick={() => setActivePortal('mss')}
              className={`px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activePortal === 'mss'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Manager Self-Service (MSS)</span>
            </button>
          </div>
        </div>

        {/* Interactive Portal Showcase */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10">
          
          {activePortal === 'ess' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              
              {/* ESS Left Features */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                    Worker Mobile Autonomy
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Everything an employee needs in their pocket.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    Employees can independently download verified payslips, submit expense receipts with phone cameras, request time off, and verify tax withholding without burdening HR.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {ESS_FEATURES.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                      <span className="font-medium">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={onOpenPayslip}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-lime-400" />
                    <span>Download Sample Payslip</span>
                  </button>
                  <button
                    onClick={onOpenDemo}
                    className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors"
                  >
                    View Mobile App UI
                  </button>
                </div>
              </div>

              {/* ESS Right Mobile Visual Mockup */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-72 bg-slate-900 rounded-[32px] p-3 shadow-2xl border-4 border-slate-800 text-white">
                  <div className="bg-slate-950 rounded-[24px] p-4 space-y-4">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Hi, Amara 👋</span>
                      <Bell className="w-3.5 h-3.5 text-lime-400" />
                    </div>

                    <div className="p-3 bg-blue-900/60 rounded-2xl border border-blue-700 text-xs">
                      <span className="text-[10px] text-blue-300 uppercase font-semibold">Latest Net Pay</span>
                      <div className="text-xl font-mono font-bold text-lime-400 mt-0.5">$5,450.00</div>
                      <span className="text-[10px] text-slate-300">Disbursed Sep 01 • PDF Ready</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-slate-400 block">Leave Balance</span>
                        <span className="font-bold text-white text-sm">14 Days</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-slate-400 block">Next Shift</span>
                        <span className="font-bold text-lime-400 text-sm">Tomorrow</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[11px] space-y-1">
                      <span className="text-slate-400 block font-semibold">Quick Actions</span>
                      <div className="flex justify-between text-blue-400 font-medium">
                        <span>• Request Absence</span>
                        <span>• Scan Expense</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              
              {/* MSS Left Features */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-bold text-lime-700 dark:text-lime-400 uppercase tracking-wider block mb-1">
                    Supervisory Speed
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Real-time oversight for team leads and executives.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    Managers can approve leave with 1 tap, review overtime caps before violations occur, conduct performance appraisals, and recommend salary adjustments seamlessly.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {MSS_FEATURES.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="font-medium">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenDemo}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <span>Schedule Manager Portal Demo</span>
                    <ArrowRight className="w-3.5 h-3.5 text-lime-400" />
                  </button>
                </div>
              </div>

              {/* MSS Right Desktop Mini Mockup */}
              <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">Engineering Team (18 Reports)</span>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                    94% Staff Present
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Annual Review Due: Elena Rostova</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Peer feedback 100% submitted</p>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer">Open Review</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Shift Swap: Marcus ↔ Amara</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Zero budget delta</p>
                    </div>
                    <span className="text-lime-700 dark:text-lime-400 font-bold bg-lime-50 dark:bg-lime-950/80 px-2 py-0.5 rounded border border-lime-200 dark:border-lime-900/60">
                      Auto-Validated
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
