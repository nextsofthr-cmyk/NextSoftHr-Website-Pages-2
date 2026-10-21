import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Award,
  CreditCard,
  Sparkles,
  Users,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HeroSectionProps {
  onExploreTraining: () => void;
  onViewCourses: () => void;
  onCorporateTraining: () => void;
  onSelectCourseQuick: (courseId: string) => void;
  onOpenAIAdvisor?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreTraining,
  onViewCourses,
  onCorporateTraining,
  onSelectCourseQuick,
  onOpenAIAdvisor,
}) => {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 dark:from-[#0B1120] dark:via-[#09101F] dark:to-[#0F172A] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/70 dark:border-slate-800">
      {/* Subtle brand geometry & subtle ambient accents: strict primary blue & lemon green */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100/40 dark:bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-lime-100/40 dark:bg-lime-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Academy Kicker / Tagline */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800 text-[#0F4C81] dark:text-blue-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse" />
                <span>NextSoftHR Training Academy</span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span className="text-slate-600 dark:text-slate-300 font-normal">
                  Build Skills · Empower People
                </span>
              </div>

              {onOpenAIAdvisor && (
                <button
                  type="button"
                  onClick={onOpenAIAdvisor}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-lime-100 dark:bg-lime-950/80 hover:bg-lime-200 dark:hover:bg-lime-900 border border-lime-300 dark:border-lime-700/80 text-[#0F4C81] dark:text-[#84CC16] text-xs font-bold transition-all cursor-pointer shadow-2xs group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#65A30D] dark:text-[#84CC16] group-hover:rotate-12 transition-transform" />
                  <span>AI Course Advisor</span>
                </button>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-[1.15] mb-4">
              {t("hero.title_part1", "Build HR & Payroll Expertise.")}{" "}
              <span className="text-[#0F4C81] dark:text-[#84CC16]">
                {t("hero.title_highlight", "Empower Your Workforce.")}
              </span>
            </h1>

            {/* Supporting Headline */}
            <p className="text-base sm:text-lg font-semibold text-[#0F4C81] dark:text-blue-300 mb-3">
              {t("hero.accredited_kicker", "CPD & CIPM Aligned Curriculum")}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
              {t(
                "hero.subtitle",
                "Develop practical HR, payroll, workforce management and business skills through expert-led courses designed for HR professionals, payroll teams, managers, business owners, consultants and organizations.",
              )}
            </p>

            {/* Action Buttons: 3 explicit CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                onClick={onExploreTraining}
                className="px-6 py-3.5 text-sm font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-sm transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>{t("hero.cta_explore", "Explore Training")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewCourses}
                className="px-5 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-md transition-colors cursor-pointer"
              >
                {t("hero.cta_courses", "View Courses")}
              </button>

              <button
                onClick={onCorporateTraining}
                className="px-5 py-3.5 text-sm font-semibold text-[#0F4C81] dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-md transition-colors cursor-pointer"
              >
                {t("hero.cta_corporate", "Corporate Training")}
              </button>
            </div>

            {/* Value Indicators Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#65A30D] dark:text-[#84CC16] flex-shrink-0" />
                <span>
                  {t(
                    "hero.val1",
                    "Executive faculty with 12+ years field experience",
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#65A30D] dark:text-[#84CC16] flex-shrink-0" />
                <span>
                  {t(
                    "hero.val2",
                    "Directly applicable statutory templates & audit models",
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#65A30D] dark:text-[#84CC16] flex-shrink-0" />
                <span>
                  {t(
                    "hero.val3",
                    "CPD-verifiable digital diploma & certificate credentials",
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#65A30D] dark:text-[#84CC16] flex-shrink-0" />
                <span>
                  {t(
                    "hero.val4",
                    "Flexible self-paced or live cohort weekend sessions",
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with African & Global Professionals + Floating UI Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-900">
                <img
                  src="https://img.freepik.com/free-photo/industrial-designers-working-3d-model_23-2149370157.jpg?size=626&amp;ext=jpg&amp;ga=GA1.1.233311484.1695720566&amp;semt=ais"
                  alt="African HR Professional and trainer leading a workshop"
                  className="w-full h-[420px] object-cover object-top"
                />

                {/* Subtle blue and lemon-green technology overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2540]/80 via-[#0F4C81]/25 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#65A30D]/20 to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-lime-300">
                        Live Executive Workshop
                      </p>
                      <h3 className="text-sm font-bold text-white">
                        NextSoftHR Professional Learning Suite
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#84CC16] text-[#0F4C81]">
                      Cohort Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating UI Card 1: HR Certification (Top-Right) */}
              <button
                onClick={() => onSelectCourseQuick("c1")}
                className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-2.5 hover:scale-105 transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-slate-700 text-[#0F4C81] dark:text-[#84CC16] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F4C81] group-hover:text-white transition-colors">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#65A30D] dark:text-[#84CC16] uppercase tracking-wider">
                    Accredited
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-white">
                    HR Certification
                  </div>
                </div>
              </button>

              {/* Floating UI Card 2: Payroll Training (Top-Left) */}
              <button
                onClick={() => onSelectCourseQuick("c2")}
                className="absolute top-20 -left-4 sm:-left-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-2.5 hover:scale-105 transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-lime-50 dark:bg-slate-700 text-[#65A30D] dark:text-[#84CC16] flex items-center justify-center flex-shrink-0 group-hover:bg-[#65A30D] group-hover:text-white transition-colors">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Tax & Audit
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-white">
                    Payroll Training
                  </div>
                </div>
              </button>

              {/* Floating UI Card 3: AI-Powered HR (Middle-Right) */}
              <button
                onClick={() => onSelectCourseQuick("c8")}
                className="absolute top-48 -right-3 sm:-right-5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-2.5 hover:scale-105 transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-900 text-white flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-[#84CC16]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#0F4C81] dark:text-lime-300 uppercase tracking-wider">
                    New Frontier
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-white">
                    AI-Powered HR
                  </div>
                </div>
              </button>

              {/* Floating UI Card 4: Leadership Skills (Bottom-Left) */}
              <button
                onClick={() => onSelectCourseQuick("c10")}
                className="absolute -bottom-4 -left-4 sm:-left-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-2.5 hover:scale-105 transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-[#0F4C81] dark:text-[#84CC16]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Executive
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-white">
                    Leadership Skills
                  </div>
                </div>
              </button>

              {/* Floating UI Card 5: Certificate of Completion Badge (Bottom-Right) */}
              <div className="absolute -bottom-5 right-4 bg-[#0F4C81] dark:bg-blue-900 text-white p-3 rounded-xl shadow-xl flex items-center gap-2.5 border border-blue-700/60 dark:border-blue-600">
                <div className="w-7 h-7 rounded-full bg-[#84CC16] text-[#0F4C81] flex items-center justify-center font-bold">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-lime-300">
                    Verified Credential
                  </div>
                  <div className="text-xs font-extrabold text-white">
                    Certificate of Completion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
