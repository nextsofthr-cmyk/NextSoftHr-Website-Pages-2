import React from "react";
import {
  Calendar,
  Headphones,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface StillHaveQuestionsProps {
  onOpenDemo: () => void;
  onOpenSupport: () => void;
}

export const StillHaveQuestions: React.FC<StillHaveQuestionsProps> = ({
  onOpenDemo,
  onOpenSupport,
}) => {
  const { t } = useLanguage();

  return (
    <section
      id="support-cta"
      className="py-16 bg-white dark:bg-[#0B132B] border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-br from-blue-900 via-blue-950 to-slate-900 dark:from-[#0B1528] dark:via-[#0A1226] dark:to-[#060B17] rounded-3xl overflow-hidden shadow-xl text-white relative border border-blue-900/60 dark:border-slate-800">
          {/* Subtle Ambient Glowing Gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-14 relative z-10">
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-800/60 border border-blue-700/60 text-xs font-semibold text-lime-300 mb-4">
                <Headphones className="w-3.5 h-3.5 text-lime-400" />
                <span>{t("cta.tag", "24/7 Human Advisory & Support")}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                {t("cta.title", "Still Have Questions?")}
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mb-8 leading-relaxed">
                {t(
                  "cta.desc",
                  "Our team is ready to help you understand how NextSoftHR can simplify HR, payroll and workforce management for your organization.",
                )}
              </p>

              {/* Action Buttons: Book a Demo, Contact Support, Explore Live Demo */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <button
                  id="still-have-questions-book-demo-btn"
                  onClick={onOpenDemo}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-lime-400 hover:bg-lime-300 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-slate-900" />
                  <span>{t("cta.bookDemo", "Book a Demo")}</span>
                </button>

                <button
                  id="still-have-questions-contact-support-btn"
                  onClick={onOpenSupport}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-800/80 hover:bg-blue-800 rounded-xl border border-blue-700 transition-colors cursor-pointer"
                >
                  <Headphones className="w-4 h-4 text-lime-300" />
                  <span>{t("cta.contactSupport", "Contact Support")}</span>
                </button>

                <a
                  id="still-have-questions-explore-demo-link"
                  href="https://demo.scriptmaster.store/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-blue-900 bg-white hover:bg-slate-100 rounded-xl border border-white/20 shadow-sm transition-all cursor-pointer"
                >
                  <span>{t("cta.exploreLiveDemo", "Explore Live Demo")}</span>
                  <ArrowRight className="w-4 h-4 text-blue-900" />
                </a>
              </div>

              {/* Trust Features Strip */}
              <div className="pt-6 border-t border-blue-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>{t("cta.metric1", "Average response < 5 mins")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>
                    {t("cta.metric2", "Certified HR & Payroll specialists")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>
                    {t("cta.metric3", "Zero-cost implementation consultation")}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: HR & Business Consultant Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 shadow-2xl">
                {/* Advisor Avatar Profile Lockup */}
                <div className="flex items-center gap-4 pb-4 border-b border-white/15">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-lime-400 to-lime-600 text-slate-950 flex items-center justify-center font-extrabold text-xl shadow-md shrink-0">
                    EA
                  </div>
                  <div>
                    <div className="text-base font-bold text-white flex items-center gap-1.5">
                      <span>{t("cta.advisorName", "Efe Adebayo")}</span>
                      <span className="w-2 h-2 rounded-full bg-lime-400 inline-block" />
                    </div>
                    <div className="text-xs text-lime-300 font-medium">
                      {t("cta.advisorRole", "Senior Workforce Consultant")}
                    </div>
                    <div className="text-[11px] text-slate-300">
                      {t("cta.advisorTeam", "NextSoftHR Global Advisory Team")}
                    </div>
                  </div>
                </div>

                {/* Consultation Quote */}
                <p className="text-xs sm:text-sm text-slate-200 italic mt-4 leading-relaxed">
                  {t(
                    "cta.advisorQuote",
                    "“Whether you are rationalizing multi-branch attendance or migrating thousands of employee payroll files from legacy ERPs, our advisory team ensures flawless execution from Day 1.”",
                  )}
                </p>

                {/* Quick Consultation Badge */}
                <div className="mt-5 p-3 rounded-xl bg-blue-900/60 border border-blue-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-lime-400" />
                    <span className="text-slate-200">
                      {t("cta.calLabel", "Consultation Calendar:")}
                    </span>
                    <span className="font-bold text-white">
                      {t("cta.calOpen", "Open Today")}
                    </span>
                  </div>
                  <button
                    onClick={onOpenDemo}
                    className="text-xs font-bold text-lime-300 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>{t("cta.pickTime", "Pick Time")}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
