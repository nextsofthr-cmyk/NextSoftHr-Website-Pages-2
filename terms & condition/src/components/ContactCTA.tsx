import React from 'react';
import { Mail, HelpCircle, ExternalLink, ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import { NextSoftHRLogo } from './NextSoftHRLogo';

interface ContactCTAProps {
  onOpenContact: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onOpenContact }) => {
  return (
    <section className="my-14 no-print" aria-labelledby="cta-heading">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl">
        
        {/* Subtle decorative background mesh in Blue and Lemon Green */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#84cc16]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-blue-200 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
              <span>NextSoftHR Global Legal Support</span>
            </div>

            <h2 id="cta-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Questions About These Terms?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
              Have questions about the NextSoftHR Terms &amp; Conditions? Our team is available to help.
            </p>

            {/* Platform Identification Card */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#84cc16]" />
                <span className="font-semibold text-white">NextSoftHR</span>
                <span className="text-slate-400">· Global HR, Payroll &amp; Business Management Platform</span>
              </div>
              <div className="hidden sm:block text-slate-500">|</div>
              <div>
                Website:{' '}
                <a
                  href="https://www.nextsofthr.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#84cc16] hover:underline font-medium inline-flex items-center gap-1"
                >
                  www.nextsofthr.org
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Action Buttons */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-950 bg-[#84cc16] hover:bg-[#74c62b] active:bg-[#65a30d] px-6 py-3.5 rounded-xl shadow-lg shadow-lime-500/10 transition-all hover:scale-[1.02] focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-[#84cc16]"
            >
              <Mail className="w-4 h-4" />
              <span>Contact NextSoftHR</span>
            </button>

            <a
              href="#contact-information"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 px-6 py-3.5 rounded-xl transition-all focus:outline-hidden focus:ring-2 focus:ring-white/40"
            >
              <HelpCircle className="w-4 h-4 text-blue-300" />
              <span>Visit Help Center</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
