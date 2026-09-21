import React from 'react';
import {
  ArrowRight,
  Phone,
  Globe,
  Mail,
  ShieldCheck,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { BRAND } from '../data/contentData';

interface CTASectionProps {
  onOpenGetStarted: () => void;
  onOpenDemo: () => void;
  onOpenContact: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onOpenGetStarted,
  onOpenDemo,
  onOpenContact,
}) => {
  return (
    <section id="cta" className="py-20 lg:py-28 bg-gradient-to-br from-[#0A2540] via-[#0B3B73] to-[#0A2540] text-white relative overflow-hidden">
      {/* Decorative Radial Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#84CC16]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-[#84CC16]">
            <ShieldCheck className="w-4 h-4" />
            <span>Join Hundreds of Forward-Thinking Workplaces</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Build a{' '}
            <span className="text-[#84CC16]">Smarter Business?</span>
          </h2>

          {/* Body */}
          <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto">
            Discover how NextSofthr can help your organization simplify HR, payroll and
            business management from one connected platform.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#84CC16] hover:bg-[#74be12] text-[#0A2540] font-extrabold px-8 py-4 rounded-xl text-base shadow-xl shadow-[#84CC16]/25 hover:shadow-2xl transition-all cursor-pointer group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/20 text-white font-bold px-7 py-4 rounded-xl text-base border border-white/20 backdrop-blur-md transition-all cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-[#84CC16]" />
              <span>Book a Demo</span>
            </button>

            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-slate-200 hover:text-white font-semibold px-6 py-4 rounded-xl text-base border border-white/15 transition-all cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 text-blue-300" />
              <span>Contact Us</span>
            </button>
          </div>

          {/* Direct Brand Contact Links */}
          <div className="pt-10 mt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm">
            <a
              href={BRAND.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-200 hover:text-[#84CC16] font-semibold transition-colors"
            >
              <Globe className="w-4 h-4 text-[#84CC16]" />
              <span>{BRAND.website}</span>
            </a>

            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center gap-2 text-slate-200 hover:text-[#84CC16] font-semibold transition-colors"
            >
              <Phone className="w-4 h-4 text-[#84CC16]" />
              <span>{BRAND.phoneDisplay}</span>
            </a>

            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-2 text-slate-200 hover:text-[#84CC16] font-semibold transition-colors"
            >
              <Mail className="w-4 h-4 text-[#84CC16]" />
              <span>{BRAND.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
