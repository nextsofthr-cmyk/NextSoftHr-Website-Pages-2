import React from 'react';
import { ArrowRight, Download, LogIn, CheckCircle2, Shield, Globe, Users, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  onOpenAcceptance: () => void;
  onOpenLogin: () => void;
  onOpenDocCenter: () => void;
  onScrollToTiers: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAcceptance,
  onOpenLogin,
  onOpenDocCenter,
  onScrollToTiers
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-16 pb-20 lg:pt-20 lg:pb-24 border-b border-slate-800">
      {/* Background Architectural Vector Grid & Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Decorative ambient color spots (Blue & Lemon Green) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[250px] bg-lime-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Messaging & Required Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Version & Date Metadata Pill Bar */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-300">
              <span className="text-lime-400 font-semibold tracking-wide uppercase">Official Portal</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Agreement Version: 1.0</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Effective Date: October 1, 2026</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Last Updated: October 1, 2026</span>
            </div>

            {/* Display Headlines */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Build With NextSoftHR.
              </h1>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-lime-300 leading-tight">
                Grow With NextSoftHR.
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Join the NextSoftHR global partner ecosystem and build recurring revenue by helping businesses simplify HR, payroll and business management.
            </p>

            {/* Required Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onScrollToTiers}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-900 bg-lime-400 hover:bg-lime-300 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <span>Become a Partner</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAcceptance}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-lime-300" />
                <span>Accept Agreement</span>
              </button>

              <button
                onClick={onOpenDocCenter}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Download Agreement</span>
              </button>

              <button
                onClick={onOpenLogin}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-slate-400" />
                <span>Partner Login</span>
              </button>
            </div>

            {/* Trust and Compliance Markers */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Original Legally Structured SaaS Instrument</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-lime-400" />
                <span>Multi-Jurisdiction Territory Framework</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>15% - 40% Recurring Commission</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Instrument Card / Agreement Summary */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 p-6 border border-slate-700/80 shadow-2xl backdrop-blur-xl">
              {/* Header of instrument box */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-lime-400"></div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Master Agreement Instrument
                  </span>
                </div>
                <span className="text-xs font-mono text-lime-400 bg-lime-950/70 border border-lime-700/50 px-2 py-0.5 rounded">
                  81 Master Clauses
                </span>
              </div>

              {/* Instrument Details */}
              <div className="mt-5 space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Parties:</span>
                  <span className="text-slate-100 font-semibold text-sm">NextSoftHR & Accredited Global Partner</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
                    <span className="text-slate-400 block mb-1">Brand Entity</span>
                    <span className="text-white font-semibold block text-sm">NextSoftHR</span>
                    <span className="text-slate-400 text-[11px] block mt-0.5">www.nextsofthr.org</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
                    <span className="text-slate-400 block mb-1">Global Support Phone</span>
                    <span className="text-white font-semibold block text-sm">+2349158482622</span>
                    <span className="text-slate-400 text-[11px] block mt-0.5">24/7 Channel Desk</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-blue-950/40 border border-blue-800/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-300 font-semibold">Tagline & Mandate</span>
                    <span className="text-[10px] text-blue-400">Global SaaS</span>
                  </div>
                  <p className="text-slate-200 text-xs italic">
                    “Powering People. Driving Businesses.”
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Serving micro, small, medium and large enterprises across multi-tenant HR, payroll, attendance, and business operations.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Lead Protection: 90 Days Standard</span>
                  <span>Disbursement: Monthly (15th)</span>
                </div>
              </div>

              {/* Legal Review Disclaimer */}
              <div className="mt-5 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <span className="text-slate-200 font-semibold block mb-0.5">Legal Notice:</span>
                This portal features original legal language specifically drafted for NextSoftHR. Reference agreements are structural only. Must be reviewed by qualified legal counsel before binding execution.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
