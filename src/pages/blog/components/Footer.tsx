import React from 'react';
import { NextSoftHrLogo } from './NextSoftHrLogo';
import { Mail, Phone, Globe, ArrowUpRight, Shield, Lock, FileText, Rss } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenBookDemo: () => void;
  onOpenGetStarted: () => void;
  onOpenSitemap: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBookDemo,
  onOpenGetStarted,
  onOpenSitemap,
}) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#051A33] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Column (2 Spans) */}
          <div className="lg:col-span-2 space-y-5">
            <NextSoftHrLogo variant="light" size="lg" showTagline={true} />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              NextSoftHr is the unified global HR, payroll, talent and business management platform built for micro, small, medium and large enterprises across Africa and international markets.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#8EE000] shrink-0" />
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
                <Phone className="w-4 h-4 text-[#8EE000] shrink-0" />
                <a href="tel:+2349158482622" className="hover:text-white transition-colors">
                  +2349158482622
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8EE000] shrink-0" />
                <a href="mailto:insights@nextsofthr.org" className="hover:text-white transition-colors">
                  insights@nextsofthr.org
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              {[
                { name: 'LinkedIn', icon: 'LI', url: 'https://linkedin.com' },
                { name: 'X / Twitter', icon: 'X', url: 'https://x.com' },
                { name: 'Facebook', icon: 'FB', url: 'https://facebook.com' },
                { name: 'YouTube', icon: 'YT', url: 'https://youtube.com' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-300 hover:text-white hover:border-[#8EE000] hover:bg-[#8EE000]/10 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Platform Column */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold tracking-wider uppercase text-white font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8EE000]" />
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'HR Management', route: 'category:hr-management' },
                { label: 'Payroll Automation', route: 'category:payroll' },
                { label: 'Time & Attendance', route: 'category:workforce' },
                { label: 'Leave Management', route: 'category:workforce' },
                { label: 'Shift & Schedule', route: 'category:workforce' },
                { label: 'Talent Acquisition', route: 'category:talent' },
                { label: 'CRM & Client Billing', route: 'category:business' },
                { label: 'Finance Integration', route: 'category:business' },
                { label: 'Projects & Tasks', route: 'category:business' },
                { label: 'Employee Self-Service', route: 'category:employee-experience' },
                { label: 'Manager Self-Service', route: 'category:employee-experience' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate(item.route)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold tracking-wider uppercase text-white font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8EE000]" />
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'SMEs & Growing Firms', action: onOpenGetStarted },
                { label: 'Enterprises & Conglomerates', action: onOpenBookDemo },
                { label: 'HR Outsourcing Partners', action: onOpenBookDemo },
                { label: 'Payroll Outsourcing Hub', action: onOpenBookDemo },
                { label: 'Global & Remote Workforce', action: onOpenGetStarted },
                { label: 'Professional Services', action: onOpenGetStarted },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={item.action}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold tracking-wider uppercase text-white font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8EE000]" />
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Blog & Editorial', route: '/blog' },
                { label: 'HR Guides', route: '#resources' },
                { label: 'Payroll Manuals', route: '#resources' },
                { label: 'Case Studies', route: '#resources' },
                { label: 'FAQs & Knowledge Base', route: '#resources' },
                { label: 'Help Center', route: '#resources' },
                { label: 'Executive Webinars', route: '#resources' },
                { label: 'Workforce Reports', route: '#resources' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate(item.route)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold tracking-wider uppercase text-white font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8EE000]" />
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'About NextSoftHr', action: () => onNavigate('/blog') },
                { label: 'Contact Us', action: onOpenBookDemo },
                { label: 'Partners & Ecosystem', action: onOpenBookDemo },
                { label: 'Pricing Plans', action: onOpenGetStarted },
                { label: 'Careers at NextSoftHr', action: onOpenGetStarted },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={item.action}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button
                onClick={onOpenSitemap}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#8EE000] hover:underline"
              >
                <Rss className="w-3.5 h-3.5" />
                <span>{t('footer.sitemap', 'XML Sitemap & RSS Feed')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            {t('footer.allRights', '© 2026 NextSoftHr. All Rights Reserved.')}
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400">
            <button onClick={() => {}} className="hover:text-white transition-colors">{t('footer.privacy', 'Privacy Policy')}</button>
            <span>·</span>
            <button onClick={() => {}} className="hover:text-white transition-colors">{t('footer.terms', 'Terms of Service')}</button>
            <span>·</span>
            <button onClick={() => {}} className="hover:text-white transition-colors">{t('footer.cookie', 'Cookie Policy')}</button>
            <span>·</span>
            <button onClick={() => {}} className="hover:text-white transition-colors">{t('footer.security', 'Security & Privacy')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

