import React from 'react';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface SuccessCheckmarkProps {
  email?: string;
  roleName?: string;
  onRedirectNow?: () => void;
}

export const SuccessCheckmark: React.FC<SuccessCheckmarkProps> = ({
  email = 'executive@nextsofthr.com',
  roleName = 'Enterprise Workspace',
  onRedirectNow,
}) => {
  return (
    <div className="w-full max-w-[480px] mx-auto animate-in fade-in zoom-in-95 duration-500 fill-mode-both">
      <div className="relative bg-white dark:bg-[#0f1c33] rounded-2xl shadow-2xl shadow-[#0056b3]/15 dark:shadow-black/60 border border-slate-200/90 dark:border-white/10 p-8 sm:p-10 text-center overflow-hidden">
        {/* Top Lemon Green & SaaS Blue accent gradient */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0056b3] via-[#84b800] to-[#caff33]" />

        {/* Ambient glow backdrop */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#caff33]/15 dark:bg-[#caff33]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Checkmark Circle */}
        <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-6">
          {/* Subtle radiating shockwave ring */}
          <div className="absolute inset-0 rounded-full bg-[#caff33]/25 dark:bg-[#caff33]/15 animate-ping opacity-75" />
          
          {/* Outer glowing border ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#caff33] shadow-[0_0_25px_rgba(202,255,51,0.45)] dark:shadow-[0_0_30px_rgba(202,255,51,0.25)] animate-in zoom-in-75 duration-700 ease-out" />

          {/* SVG Animated Circle & Check stroke */}
          <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-[#004494] via-[#0056b3] to-[#0066cc] flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-[#caff33] stroke-[3.5] drop-shadow-md"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Checkmark path with animation */}
              <polyline
                points="20 6 9 17 4 12"
                className="stroke-dash-animation"
                style={{
                  strokeDasharray: 30,
                  strokeDashoffset: 0,
                  animation: 'dash 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
                }}
              />
            </svg>
          </div>
        </div>

        {/* Status Headings */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150 fill-mode-both">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authentication Successful</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1528] dark:text-white tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200 fill-mode-both">
            Welcome to NextSofthr
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300 fill-mode-both">
            Signed in as <span className="font-bold text-[#0056b3] dark:text-[#caff33]">{email}</span>
          </p>
        </div>

        {/* Security Session Details Card */}
        <div className="mt-6 p-3.5 rounded-xl bg-slate-50 dark:bg-[#15233e] border border-slate-200/80 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-500 delay-400 fill-mode-both">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#caff33] animate-pulse" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">{roleName}</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            256-bit TLS Active
          </span>
        </div>

        {/* Loading Progress Bar & Redirect Trigger */}
        <div className="mt-6 pt-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-400 mb-1.5 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#0056b3] dark:text-[#caff33]" />
              Preparing dashboard workspace...
            </span>
            <span className="font-bold text-slate-600 dark:text-slate-300">100%</span>
          </div>

          {/* Animated loading bar */}
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#0056b3] via-[#004494] to-[#caff33] rounded-full animate-in slide-in-from-left duration-1000 fill-mode-both" />
          </div>

          {onRedirectNow && (
            <button
              type="button"
              onClick={onRedirectNow}
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0056b3] dark:text-[#caff33] hover:underline cursor-pointer group"
            >
              <span>Proceed to dashboard now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessCheckmark;
