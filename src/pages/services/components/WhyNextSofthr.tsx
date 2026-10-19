import React from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Globe2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  HeartHandshake,
} from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/servicesData';

interface WhyNextSofthrProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

export const WhyNextSofthr: React.FC<WhyNextSofthrProps> = ({ onOpenDemo, onOpenGetStarted }) => {
  return (
    <section id="why-us" className="py-20 bg-slate-50 dark:bg-[#07182E] relative overflow-x-clip transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: image card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-blue-900 group">
              <img
                src="https://img.freepik.com/premium-photo/wideangle-shot-black-male-office-manager-signing-financial-documents-aigenerated_994744-1097.jpg?size=626&ext=jpg&ga=GA1.1.233311484.1695720566&semt=ais"
                alt="African HR managers and business leaders collaborating enthusiastically in a modern corporate office"
                className="w-full h-[480px] sm:h-[580px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-slate-900/40 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84CC16] text-[#0A2540] font-black text-xs uppercase mb-3 w-max">
                  African Built • Globally Scaled
                </div>
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                  Trusted by Forward-Thinking HR Leaders &amp; Founders
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Empowering teams across Lagos, Nairobi, Johannesburg, Kigali, Accra, and international subsidiaries.
                </p>
              </div>
            </div>

            {/* Floating Stat Card Over Image */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white dark:bg-[#0D2644] p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-200 dark:border-blue-800 max-w-xs animate-float-slow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#0256C4] dark:text-blue-300 flex items-center justify-center font-black text-lg">
                  100%
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#0A2540] dark:text-white">Pan-African Tax Engine</div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Auto-updated statutory tables</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Why Businesses Choose NextSofthr (7 Core Pillars) */}
          <div className="lg:col-span-7 flex flex-col gap-5 lg:h-[580px]">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 dark:bg-blue-950/80 text-[#0256C4] dark:text-[#84CC16] text-xs font-extrabold uppercase tracking-widest border border-blue-200 dark:border-blue-800 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
                THE NEXTSOFTHR ADVANTAGE
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
                Why Businesses Choose NextSofthr
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                We bridge the gap between global enterprise software capabilities and the unique operational,
                statutory, and banking realities of running a business in Africa.
              </p>
            </div>

            {/* 7 Pillars - scrolls inside so the column matches the image height */}
            <div
              id="why-us-scroll-list"
              className="flex-1 min-h-0 max-h-[460px] lg:max-h-none overflow-y-auto overscroll-contain pr-2 -mr-2 space-y-4 [scrollbar-width:thin]"
            >
              {WHY_CHOOSE_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#0A2540] p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-blue-900/60 hover:border-[#0256C4]/40 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 flex items-start gap-4 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/60 group-hover:bg-[#84CC16] text-[#0256C4] dark:text-blue-300 group-hover:text-[#0A2540] flex items-center justify-center shrink-0 mt-0.5 transition-colors font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-[#0A2540] dark:text-white group-hover:text-[#0256C4] dark:group-hover:text-[#84CC16] transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-bold text-[#84CC16] bg-lime-50 dark:bg-lime-950/60 px-2 py-0.5 rounded-full border border-lime-200 dark:border-lime-900">
                        {item.tagline}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1 shrink-0">
              <button
                onClick={onOpenGetStarted}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0256C4] hover:bg-[#024bb0] text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Switch to NextSofthr</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-[#0D2644] hover:bg-slate-100 dark:hover:bg-blue-900/60 text-[#0A2540] dark:text-white font-semibold text-sm border border-slate-300 dark:border-blue-700 transition-colors text-center cursor-pointer"
              >
                Schedule Strategic Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
