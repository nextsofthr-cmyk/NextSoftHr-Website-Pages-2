import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Users, TrendingUp, DollarSign, Clock } from 'lucide-react';
import heroTeamImage from '../assets/images/hero_african_hr_team_1789551904753.jpg';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onTalkToTeam: () => void;
  onBookDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onTalkToTeam, onBookDemo }) => {
  const { t } = useLanguage();

  return (
    <section id="hero-section" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#0B1F3A] via-[#0D2547] to-[#0B1F3A] text-white">
      {/* Background Animated Gradient Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#1769E0]/20 via-[#C8F000]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute -top-24 right-0 w-96 h-96 bg-[#1769E0]/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-[-100px] w-80 h-80 bg-[#C8F000]/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Subtle Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C8F000]/30 backdrop-blur-md mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C8F000] animate-ping"></span>
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#C8F000] font-display">
                {t.hero.eyebrow}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 font-display">
              {t.hero.headlinePart1} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#C8F000]">
                {t.hero.headlineHighlight}
              </span>{' '}
              {t.hero.headlinePart2}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              {t.hero.subtitle}
              <br className="hidden sm:inline" />
              <span className="text-slate-200 font-medium">
                {t.hero.subtitleHighlight}
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10 flex-wrap">
              <button
                id="hero-primary-cta"
                onClick={onTalkToTeam}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-base text-[#0B1F3A] bg-[#C8F000] hover:bg-[#bde300] shadow-lg shadow-[#C8F000]/20 hover:shadow-[#C8F000]/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 text-[#0B1F3A]" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={onBookDemo}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                <span>{t.hero.ctaSecondary}</span>
              </button>

              <a
                id="hero-live-demo-cta"
                href="https://demo.scriptmaster.store/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base text-white bg-[#1769E0] hover:bg-[#1258c2] shadow-lg shadow-[#1769E0]/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <span>Explore Live Demo</span>
                <ArrowRight className="w-4 h-4 text-[#C8F000]" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-white/10 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8F000] shrink-0" />
                <span>{t.hero.statCompliance}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C8F000] shrink-0" />
                <span>{t.hero.statPayroll}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Users className="w-4 h-4 text-[#C8F000] shrink-0" />
                <span>{t.hero.statScaling}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Floating UI Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Professional Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/40 bg-[#0B1F3A]">
                <img
                  src={heroTeamImage}
                  alt="NextSofthr African HR professionals and business executives collaborating on workforce software"
                  className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[16/11] brightness-95 contrast-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Subtle bottom gradient on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent"></div>

                {/* Status Bar inside the image */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0B1F3A]/90 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C8F000] animate-pulse"></span>
                    <span className="font-semibold text-white">NextSofthr Unified Suite</span>
                  </div>
                  <span className="text-slate-300 font-mono text-[11px]">Africa + Global v4.2</span>
                </div>
              </div>

              {/* Floating UI Card 1: HR Management (Top Left) */}
              <div className="absolute -top-5 -left-4 sm:-left-6 p-3 rounded-xl bg-[#0B1F3A]/90 border border-[#1769E0]/40 backdrop-blur-md shadow-xl text-left hidden sm:flex items-center gap-3 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="w-9 h-9 rounded-lg bg-[#1769E0] flex items-center justify-center text-white font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-300">{t.hero.floatingActiveEmployees}</div>
                  <div className="text-xs font-extrabold text-white">HR &amp; Workforce</div>
                  <div className="text-[10px] text-[#C8F000] font-medium">{t.hero.floatingAccuracyRate}</div>
                </div>
              </div>

              {/* Floating UI Card 2: Payroll (Top Right) */}
              <div className="absolute -top-3 -right-3 sm:-right-5 p-3 rounded-xl bg-[#0B1F3A]/90 border border-[#C8F000]/40 backdrop-blur-md shadow-xl text-left flex items-center gap-3 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="w-9 h-9 rounded-lg bg-[#C8F000] flex items-center justify-center text-[#0B1F3A] font-bold">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#C8F000]">Automated</div>
                  <div className="text-xs font-extrabold text-white">{t.hero.floatingPayrollTitle}</div>
                  <div className="text-[10px] text-slate-300 font-medium">{t.hero.floatingTimeSaved}</div>
                </div>
              </div>

              {/* Floating UI Card 3: Employee Self-Service (Middle Left) */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-6 p-2.5 rounded-xl bg-[#0B1F3A]/95 border border-white/20 backdrop-blur-md shadow-xl text-left hidden md:flex items-center gap-2.5 transform -translate-x-2">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#C8F000]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">Employee Self-Service</div>
                  <div className="text-[9px] text-slate-300">Leave • Payslips • Requests</div>
                </div>
              </div>

              {/* Floating UI Card 4: Time & Attendance (Bottom Left) */}
              <div className="absolute -bottom-6 -left-3 sm:-left-5 p-3 rounded-xl bg-[#0B1F3A]/95 border border-white/20 backdrop-blur-md shadow-xl text-left flex items-center gap-2.5 transform rotate-1">
                <div className="w-8 h-8 rounded-lg bg-[#1769E0]/30 border border-[#1769E0] flex items-center justify-center text-[#C8F000]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Time &amp; Attendance</div>
                  <div className="text-[10px] text-slate-300">Biometric &amp; Geo-Clock In</div>
                </div>
              </div>

              {/* Floating UI Card 5: AI HR Assistant (Bottom Right) */}
              <div className="absolute -bottom-8 -right-3 sm:-right-4 p-3 rounded-xl bg-[#0B1F3A]/95 border border-[#C8F000]/50 backdrop-blur-md shadow-2xl text-left flex items-center gap-3 transform -rotate-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1769E0] to-[#C8F000] flex items-center justify-center text-[#0B1F3A]">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#C8F000] flex items-center gap-1">
                    <span>AI Assistant</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8F000] animate-ping"></span>
                  </div>
                  <div className="text-xs font-extrabold text-white">Business Management</div>
                  <div className="text-[9px] text-slate-300">{t.hero.floatingDisbursed}</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
