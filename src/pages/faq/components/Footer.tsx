import React from 'react';
import { Globe, Linkedin, Twitter, Facebook, Youtube, Github, Shield, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenDemo: () => void;
  onOpenSupport: () => void;
  onOpenPricing: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemo, onOpenSupport, onOpenPricing }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Global Mission Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-12 border-b border-slate-900 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center font-extrabold text-lg shadow-xs relative">
                N
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-lime-400 rounded-full border border-slate-950" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">NextSoft</span>
              <span className="text-xl font-extrabold tracking-tight text-blue-500 -ml-1">HR</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              {t('footer.tagline', 'NextSoftHR — Powering People. Driving Businesses.')}
            </p>
            <p className="text-xs text-slate-300 mt-1">
              {t('footer.sub', 'Global HR, Payroll & Business Management Platform for micro, small, medium, and large enterprises worldwide.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a
              href="https://www.nextsofthr.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-lime-400 font-semibold border border-slate-800 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>www.nextsofthr.org</span>
            </a>

            <div className="flex items-center gap-2 text-slate-400">
              <a
                href="#linkedin"
                onClick={(e) => { e.preventDefault(); }}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                onClick={(e) => { e.preventDefault(); }}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                onClick={(e) => { e.preventDefault(); }}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                onClick={(e) => { e.preventDefault(); }}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#github"
                onClick={(e) => { e.preventDefault(); }}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 5 Column SaaS Footer */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12">
          
          {/* PRODUCT */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t('footer.product', 'Product')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#category-hr-management" className="hover:text-white transition-colors">{t('cat.hr-management', 'HR Management')}</a></li>
              <li><a href="#category-payroll" className="hover:text-white transition-colors">{t('cat.payroll', 'Payroll')}</a></li>
              <li><a href="#category-time-attendance" className="hover:text-white transition-colors">{t('cat.time-attendance', 'Time & Attendance')}</a></li>
              <li><a href="#category-leave-management" className="hover:text-white transition-colors">{t('cat.leave-management', 'Leave Management')}</a></li>
              <li><a href="#category-recruitment-talent" className="hover:text-white transition-colors">{t('cat.recruitment-talent', 'Recruitment')}</a></li>
              <li><a href="#category-ai-assistant" className="hover:text-lime-300 text-lime-400 font-semibold transition-colors flex items-center gap-1"><span>{t('cat.ai-assistant', 'AI HR Assistant')}</span><span className="w-1.5 h-1.5 rounded-full bg-lime-400" /></a></li>
              <li><a href="#category-self-service" className="hover:text-white transition-colors">{t('cat.self-service', 'Employee Self-Service')}</a></li>
              <li><a href="#category-self-service" className="hover:text-white transition-colors">Manager Self-Service</a></li>
            </ul>
          </div>

          {/* SOLUTIONS */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t('footer.solutions', 'Solutions')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#category-getting-started" className="hover:text-white transition-colors">Small Businesses</a></li>
              <li><a href="#category-business-management" className="hover:text-white transition-colors">Medium Businesses</a></li>
              <li><a href="#category-security-compliance" className="hover:text-white transition-colors">Enterprise</a></li>
              <li><a href="#category-outsourcing-services" className="hover:text-white transition-colors">Payroll Outsourcing</a></li>
              <li><a href="#category-outsourcing-services" className="hover:text-white transition-colors">HR Outsourcing</a></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t('footer.resources', 'Resources')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#hero" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#faq-main" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">FAQ Support Center</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#category-integrations" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Guides</a></li>
              <li>
                <button onClick={onOpenSupport} className="hover:text-white transition-colors text-left">
                  {t('nav.contact', 'Contact Support')}
                </button>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t('footer.company', 'Company')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#hero" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#integrations-section" className="hover:text-white transition-colors">{t('nav.partners', 'Partners')}</a></li>
              <li>
                <button onClick={onOpenSupport} className="hover:text-white transition-colors text-left">
                  {t('nav.contact', 'Contact')}
                </button>
              </li>
              <li>
                <button onClick={onOpenPricing} className="hover:text-white transition-colors text-left">
                  {t('nav.pricing', 'Pricing Plans')}
                </button>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t('footer.legal', 'Legal')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); }} className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); }} className="hover:text-white transition-colors">Terms &amp; Conditions</a></li>
              <li><a href="#security" onClick={(e) => { e.preventDefault(); }} className="hover:text-white transition-colors">Security Architecture</a></li>
              <li><a href="#ndpr" onClick={(e) => { e.preventDefault(); }} className="hover:text-white transition-colors">NDPR &amp; GDPR Compliance</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            © {new Date().getFullYear()} NextSoftHR Inc. {t('footer.copyright', 'All rights reserved.')}
          </div>
          <div className="flex items-center gap-1">
            <span>{t('footer.mission', 'Powering people. Driving businesses worldwide.')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
