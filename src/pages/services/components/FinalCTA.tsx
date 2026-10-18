import React from 'react';
import {
  ArrowRight,
  Play,
  Phone,
  Globe,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface FinalCTAProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenDemo, onOpenGetStarted }) => {
  return (
    <section className="py-20 bg-white dark:bg-[#0A2540] relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#0256C4] to-[#0A2540] dark:from-[#07182E] dark:via-[#024bb0] dark:to-[#07182E] text-white shadow-2xl p-8 sm:p-12 lg:p-16 border border-slate-800 dark:border-blue-900/60">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#84CC16]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#84CC16]/20 border border-[#84CC16]/40 text-[#84CC16] text-xs font-black uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5 text-[#84CC16]" />
                JOIN THE WORKFORCE REVOLUTION
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Ready to Transform How Your Business Manages{' '}
                <span className="text-[#84CC16]">People and Operations?</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                Join businesses that use NextSofthr to simplify HR, automate payroll, manage attendance and empower
                their workforce from one connected platform.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="/signup"
                  className="px-8 py-4 rounded-xl font-extrabold text-base text-[#0A2540] bg-[#84CC16] hover:bg-[#73b612] shadow-lg shadow-lime-500/25 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="https://demo.scriptmaster.store/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl font-bold text-base text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current text-[#84CC16]" />
                  <span>Explore Demo</span>
                </a>
              </div>

              {/* Reassurance Badges requested */}
              <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 font-semibold">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#84CC16]" /> No credit card required
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#84CC16]" /> Quick 48-hour setup
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#84CC16]" /> Scales with your business
                </span>
              </div>
            </div>

            {/* Right Contact Card & African Business Visual */}
            <div className="lg:col-span-5 space-y-4">
              {/* African Business Leader Image Card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-xl group h-60 sm:h-72">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop"
                  alt="Confident African business owner smiling in front of tech workspace"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5">
                  <span className="text-xs font-bold text-[#84CC16]">Direct VIP Onboarding Support</span>
                  <p className="text-sm font-semibold text-white">Speak with an African workforce implementation advisor today.</p>
                </div>
              </div>

              {/* Direct Reach Card */}
              <div className="bg-slate-950/70 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="tel:+2349158482622"
                  className="flex items-center gap-3 text-left hover:text-[#84CC16] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0256C4] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#84CC16]" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Call Us Directly</div>
                    <div className="text-sm font-extrabold text-white">+234 915 848 2622</div>
                  </div>
                </a>

                <a
                  href="https://www.nextsofthr.org"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-left hover:text-[#84CC16] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-[#84CC16]" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Official Portal</div>
                    <div className="text-sm font-extrabold text-white">www.nextsofthr.org</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
