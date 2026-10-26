import React from 'react';
import {
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Globe2,
  Users2,
} from 'lucide-react';
import { Translations } from '../data/translations';
import { TestimonialSlider } from './TestimonialSlider';

interface BrandExperienceProps {
  t: Translations;
}

export const BrandExperience: React.FC<BrandExperienceProps> = ({ t }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 lg:p-8 xl:p-10 overflow-hidden bg-gradient-to-br from-[#002244] via-[#003366] to-[#004494] text-white select-none">
      {/* Dynamic Background Mesh & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle geometric grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Lemon green radial glow aura */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#caff33]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#0056b3]/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-[#caff33]/10 rounded-full blur-3xl pointer-events-none" />

        {/* High-fidelity photography background with professional dark SaaS overlay */}
        <div className="absolute inset-0 mix-blend-luminosity opacity-20">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80"
            alt="African business professionals in modern tech workspace"
            className="w-full h-full object-cover object-center filter saturate-125 contrast-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#001c38] via-[#003366]/85 to-[#002244]/90" />
      </div>

      {/* Top Header: Brand Logo & Global Positioning Badge */}
      <div className="relative z-10 shrink-0">
        <div className="flex flex-col items-start">
          <img
            src="/next-soft-logo.png"
            alt="NextSoftHr — Powering People. Driving Businesses"
            className="h-14 w-auto object-contain"
          />
          <p className="mt-2 text-xs sm:text-sm font-semibold tracking-wide text-blue-100/90">
            People. HR. Payroll. Business. Simplified. Secured.
          </p>
        </div>

        {/* "Built for the Realities of Africa • Ready for the World" Badge */}
        <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wide">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#caff33] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#caff33]"></span>
          </span>
          <span className="text-white/90">BUILT FOR THE REALITIES OF AFRICA.</span>
          <span className="text-[#caff33]">•</span>
          <span className="text-blue-200">READY FOR THE WORLD</span>
        </div>
      </div>

      {/* Middle Core Content: Value Proposition & Hero Visual Showcase */}
      <div className="relative z-10 my-auto py-3">
        {/* Main Headline */}
        <h1 className="text-3xl lg:text-4xl xl:text-[2.6rem] font-black tracking-tight leading-[1.18] text-white">
          {t.brandHeadline}
        </h1>

        {/* Supporting Copy */}
        <p className="mt-3 text-base lg:text-lg text-blue-100/90 font-normal leading-relaxed">
          {t.brandSupporting}
        </p>

        {/* Highlighting 7 Enterprise Features with Lemon Green Accents */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {t.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] transition-colors border border-white/10 backdrop-blur-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-[#caff33] shrink-0 drop-shadow-[0_0_8px_rgba(202,255,51,0.5)]" />
              <span className="text-xs lg:text-sm font-medium text-white/95 tracking-wide">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Image after Welcome Back section before Testimonial (Made longer to reduce spacing) */}
      <div className="relative z-10 shrink-0 my-3 rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white/[0.05]">
        <img
          src="/assets/images/hero_african_hr_team_1789551904753.jpg"
          alt="NextSoftHr Enterprise Platform"
          className="w-full h-48 sm:h-56 lg:h-64 object-cover object-center"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80';
          }}
        />
      </div>

      {/* Client Testimonials Slider */}
      <div className="relative z-10 shrink-0">
        <TestimonialSlider variant="dark" />

        <div className="mt-2.5 px-1 flex items-center justify-between text-xs text-blue-200/80">
          <div className="flex items-center gap-1.5">
            <Users2 className="w-3.5 h-3.5 text-[#caff33]" />
            <span>Trusted by 12,000+ businesses across 34 countries</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#caff33]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>99.98% Uptime</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: African Presence Hubs & Security Seal */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-blue-200/80 shrink-0">
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-[#caff33]" />
          <span>Lagos • Nairobi • Johannesburg • Kigali • Accra • London</span>
        </div>

        <div className="flex items-center gap-1.5 font-medium text-white/90">
          <ShieldCheck className="w-4 h-4 text-[#caff33]" />
          <span>Enterprise Grade Security</span>
        </div>
      </div>
    </div>
  );
};

export default BrandExperience;
