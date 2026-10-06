import React from 'react';
import { Globe, Phone, Mail, Clock, ShieldCheck, ArrowRight, LifeBuoy, Handshake } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface ContactSectionProps {
  onOpenSupportModal: () => void;
  onOpenPartnerModal: () => void;
  currentLang?: SupportedLanguage;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenSupportModal,
  onOpenPartnerModal,
  currentLang = 'en',
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="contact-desk" className="scroll-mt-24 py-16 bg-slate-50 dark:bg-[#0B1120] border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#131D31] rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-md relative overflow-hidden transition-colors">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#84CC16]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0A3B7B]/5 dark:bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Cols: Prompt Required Copy & Buttons */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0A3B7B] dark:text-[#38BDF8] uppercase tracking-wider">
                <LifeBuoy className="w-4 h-4 text-[#84CC16]" />
                <span>{t.contact.kicker}</span>
              </div>

              {/* Exact Prompt Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A3B7B] dark:text-white tracking-tight text-balance">
                {t.contact.headline}
              </h2>

              {/* Exact Prompt Text */}
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                {t.contact.text}
              </p>

              {/* Exact Prompt Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenSupportModal}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0A3B7B] hover:bg-[#1E40AF] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <span>{t.contact.contactSupport}</span>
                  <ArrowRight className="w-4 h-4 text-[#84CC16]" />
                </button>

                <button
                  type="button"
                  onClick={onOpenPartnerModal}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-[#1E293B] text-[#0A3B7B] dark:text-[#60A5FA] border-2 border-[#0A3B7B]/20 dark:border-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-[#0A3B7B] dark:hover:border-slate-600 transition-all"
                >
                  <Handshake className="w-4 h-4 text-[#84CC16]" />
                  <span>{t.contact.contactPartnerTeam}</span>
                </button>
              </div>

              {/* Exact Prompt Display Fields */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-y-3 gap-x-8 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500">{t.contact.websiteLabel}</span>
                  <a
                    href="https://www.nextsofthr.org"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[#0A3B7B] dark:text-[#38BDF8] hover:underline flex items-center gap-1.5"
                  >
                    <Globe className="w-4 h-4 text-[#84CC16]" />
                    <span>www.nextsofthr.org</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500">{t.contact.phoneLabel}</span>
                  <a
                    href="tel:+2349158482622"
                    className="font-mono font-bold text-slate-800 dark:text-slate-200 hover:text-[#0A3B7B] dark:hover:text-[#38BDF8] flex items-center gap-1.5 tabular-nums"
                  >
                    <Phone className="w-4 h-4 text-[#84CC16]" />
                    <span>+2349158482622</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Operational SLAs & Direct Routing */}
            <div className="lg:col-span-5 bg-slate-50/80 dark:bg-[#0F172A] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A3B7B] dark:text-[#38BDF8]">
                {t.contact.standardsTitle}
              </h3>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#0A3B7B] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{t.contact.hoursLabel} </span>
                    <span>{t.contact.hoursVal}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#0A3B7B] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{t.contact.responseLabel} </span>
                    <span>{t.contact.responseVal}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#84CC16] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{t.contact.channelLabel} </span>
                    <span>{t.contact.channelVal}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 italic">
                {t.contact.directMailNote}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
