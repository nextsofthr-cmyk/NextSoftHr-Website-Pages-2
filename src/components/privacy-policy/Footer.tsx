import React from 'react';
import { Globe, Phone, Mail, ArrowUp } from 'lucide-react';
import { Language, LanguageOption, Translations } from '../translations';
import { LanguageSelector } from './LanguageSelector';

interface FooterProps {
  onOpenCookiesModal: () => void;
  onOpenPrivacyModal: () => void;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  languageOptions: LanguageOption[];
  t: Translations;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCookiesModal,
  onOpenPrivacyModal,
  currentLanguage,
  onSelectLanguage,
  languageOptions,
  t,
}) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info & Contact (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="https://www.nextsofthr.org"
              className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-white"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F52BA] to-blue-700 flex items-center justify-center text-white ring-1 ring-white/20">
                <span className="font-extrabold text-[#84CC16] text-lg leading-none">N</span>
              </div>
              <span className="font-display text-xl text-white font-extrabold tracking-tight">
                NextSoft<span className="text-[#84CC16]">HR</span>
              </span>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#84CC16]" />
                <a
                  href="https://www.nextsofthr.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  www.nextsofthr.org
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#84CC16]" />
                <a
                  href="tel:+2349158482622"
                  className="hover:text-white transition-colors"
                >
                  +2349158482622
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#84CC16]" />
                <a
                  href="mailto:privacy@nextsofthr.org"
                  className="hover:text-white transition-colors"
                >
                  privacy@nextsofthr.org
                </a>
              </div>
            </div>

            {/* Language Switcher in Footer */}
            <div className="pt-3">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Language / Langue / Idioma:
              </span>
              <LanguageSelector
                currentLanguage={currentLanguage}
                onSelectLanguage={onSelectLanguage}
                options={languageOptions}
              />
            </div>
          </div>

          {/* Column 1: Platform */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.platformTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="https://www.nextsofthr.org#hr" className="hover:text-white transition-colors">
                  Human Resources
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org#payroll" className="hover:text-white transition-colors">
                  Payroll Management
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org#attendance" className="hover:text-white transition-colors">
                  Time & Attendance
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org#leave" className="hover:text-white transition-colors">
                  Leave Management
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org#talent" className="hover:text-white transition-colors">
                  Talent Acquisition
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org#ess" className="hover:text-white transition-colors">
                  Employee Self-Service
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org#mss" className="hover:text-white transition-colors">
                  Manager Self-Service
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org#ai" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>AI HR Assistant</span>
                  <span className="text-[10px] text-[#84CC16] font-semibold">New</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Business */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.businessTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="https://www.nextsofthr.org#crm" className="hover:text-white transition-colors">
                  CRM
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org#finance" className="hover:text-white transition-colors">
                  Finance
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org#projects" className="hover:text-white transition-colors">
                  Projects & Tasks
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org#hr-outsourcing" className="hover:text-white transition-colors">
                  HR Outsourcing
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org#payroll-outsourcing" className="hover:text-white transition-colors">
                  Payroll Outsourcing
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org#management" className="hover:text-white transition-colors">
                  Business Management
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.resourcesTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="https://www.nextsofthr.org/blog" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org/faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org/help" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="https://www.nextsofthr.org/docs" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#contact-us" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.legalTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <span className="text-[#84CC16] font-semibold flex items-center gap-1.5">
                  <span>Privacy Policy</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
                </span>
              </li>
              <li>
                <a href="https://www.nextsofthr.org/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenCookiesModal}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Cookie Policy & Preferences
                </button>
              </li>
              <li>
                <a href="#employee-customer-data" className="hover:text-white transition-colors">
                  Data Processing Agreement (DPA)
                </a>
              </li>
              <li>
                <a href="#data-storage-security" className="hover:text-white transition-colors">
                  Security Overview
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacyModal}
                  className="text-xs text-[#84CC16] hover:underline cursor-pointer"
                >
                  Submit DPO Request
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>&copy; {currentYear} NextSoftHR. {t.footer.allRightsReserved}</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span>{t.footer.tagline}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
