import React from 'react';
import { Globe, Phone, Mail, Shield } from 'lucide-react';
import { NextSoftLogo } from './NextSoftLogo';
import { POLICY_META } from '../data/policyData';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface FooterProps {
  onOpenTermsModal: () => void;
  onOpenPrivacyModal: () => void;
  onOpenRefundModal: () => void;
  onOpenPartnerModal: () => void;
  currentLang?: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTermsModal,
  onOpenPrivacyModal,
  onOpenRefundModal,
  onOpenPartnerModal,
  currentLang = 'en',
}) => {
  const currentYear = 2026;
  const t = TRANSLATIONS[currentLang];

  return (
    <footer className="bg-slate-900 dark:bg-[#070D18] text-slate-300 dark:text-slate-400 pt-16 pb-12 border-t border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <NextSoftLogo size="md" variant="monochrome-white" showTagline />
            <p className="text-xs text-slate-400 leading-relaxed pr-2">
              {t.footer.tagline}
            </p>
            <div className="pt-2 text-xs space-y-2">
              <a
                href="https://www.nextsofthr.org"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>www.nextsofthr.org</span>
              </a>
              <a
                href="tel:+2349158482622"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-mono tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>+2349158482622</span>
              </a>
            </div>
          </div>

          {/* Product Col (Exact Prompt List) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">{t.footer.productCol}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">HR</a></li>
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">Payroll</a></li>
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">Time &amp; Attendance</a></li>
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">Leave Management</a></li>
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">Recruitment</a></li>
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">Employee Self-Service</a></li>
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">Manager Self-Service</a></li>
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">CRM</a></li>
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">Finance</a></li>
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">Project Management</a></li>
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">AI Tools</a></li>
            </ul>
          </div>

          {/* Company Col (Exact Prompt List) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">{t.footer.companyCol}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#contact-desk" className="hover:text-white transition-colors">Contact</a></li>
              <li><button onClick={onOpenPartnerModal} className="hover:text-white transition-colors text-left">Partners</button></li>
              <li><button onClick={onOpenPartnerModal} className="hover:text-white transition-colors text-left">Resellers</button></li>
              <li><button onClick={onOpenPartnerModal} className="hover:text-white transition-colors text-left">Distributors</button></li>
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">Training</a></li>
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Legal Col (Exact Prompt List) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">{t.footer.legalCol}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={onOpenTermsModal} className="hover:text-white transition-colors text-left">Terms &amp; Conditions</button></li>
              <li><button onClick={onOpenPrivacyModal} className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
              <li><a href="#overview" className="text-[#84CC16] font-semibold hover:underline">Refund Policy</a></li>
              <li><a href="https://www.nextsofthr.org" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#section-19" className="hover:text-white transition-colors">Service Level Agreement</a></li>
            </ul>
          </div>

          {/* Contact Col (Exact Prompt List) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">{t.footer.contactCol}</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#84CC16]" />
                <a href="https://www.nextsofthr.org" target="_blank" rel="noreferrer" className="hover:text-white transition-colors font-medium">
                  www.nextsofthr.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#84CC16]" />
                <a href="tel:+2349158482622" className="hover:text-white transition-colors font-mono tabular-nums">
                  +2349158482622
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#84CC16]" />
                <a href="mailto:billing@nextsofthr.org" className="hover:text-white transition-colors">
                  billing@nextsofthr.org
                </a>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={onOpenRefundModal}
                  className="w-full text-center px-3 py-2 bg-[#84CC16] text-[#0A3B7B] font-bold text-xs rounded-lg hover:bg-[#a3e635] transition-colors"
                >
                  {t.footer.submitRequestBtn}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal Counsel Compliance Notice as Required by Prompt */}
        <div className="my-8 p-4 bg-slate-800/80 dark:bg-[#0F172A] rounded-xl border border-slate-700/80 dark:border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-[#84CC16] shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200">{t.footer.counselNoticeTitle} </strong>
              {t.footer.counselNoticeText}
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-2">
          <div>
            &copy; {currentYear} {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Version {POLICY_META.version}</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>{t.footer.slaCompliant}</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>{t.footer.dataStandards}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
