import React from 'react';
import { NextSoftHRLogo } from './NextSoftHRLogo';
import {
  Globe,
  ShieldCheck,
  Lock,
  ArrowUp,
  Linkedin,
  Twitter,
  Github,
  Youtube,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenContact }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const platformLinks = [
    { label: 'HR', href: '#hr-management' },
    { label: 'Payroll', href: '#payroll-services' },
    { label: 'Time & Attendance', href: '#time-attendance' },
    { label: 'Leave', href: '#leave-management' },
    { label: 'Recruitment', href: '#recruitment-talent' },
    { label: 'CRM', href: '#crm-business-features' },
    { label: 'Finance', href: '#platform-use' },
    { label: 'Projects & Tasks', href: '#project-task-management' },
  ];

  const companyLinks = [
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact', onClick: onOpenContact },
    { label: 'Partners', href: '#partners' },
    { label: 'Careers', href: '#careers' },
    { label: 'Blog', href: '#blog' },
  ];

  const legalLinks = [
    { label: 'Terms & Conditions', href: '#', active: true },
    { label: 'Privacy Policy', href: '#privacy-data-protection', onClick: onOpenPrivacy },
    { label: 'Cookie Policy', href: '#cookie-policy', onClick: onOpenPrivacy },
    { label: 'Security', href: '#security' },
  ];

  return (
    <footer className="bg-slate-900 dark:bg-[#060b16] text-slate-400 pt-16 pb-12 border-t border-slate-800 dark:border-slate-800/80 no-print transition-colors" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: NextSoftHR Logo + Short Company Description */}
          <div className="lg:col-span-5 space-y-4">
            <NextSoftHRLogo variant="light" size="md" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Global HR, Payroll and Business Management SaaS platform empowering micro, small, medium and large enterprises worldwide to streamline workforce operations, automate compliance, and scale teams with confidence.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-blue-600 flex items-center justify-center transition-colors"
                aria-label="NextSoftHR on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-blue-500 flex items-center justify-center transition-colors"
                aria-label="NextSoftHR on X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
                aria-label="NextSoftHR Developer APIs on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-red-600 flex items-center justify-center transition-colors"
                aria-label="NextSoftHR Product Tutorials on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-xs text-slate-500">
              Official Portal:{' '}
              <a
                href="https://www.nextsofthr.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#84cc16] transition-colors"
              >
                www.nextsofthr.org
              </a>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform
            </h3>
            <ul className="space-y-2 text-sm">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                    className={`transition-colors ${
                      item.active
                        ? 'text-[#84cc16] font-semibold flex items-center gap-1.5'
                        : 'hover:text-white'
                    }`}
                  >
                    {item.label}
                    {item.active && <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-4 text-xs text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#84cc16]" />
                <span>Enterprise Grade Security</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>Global Data Protection</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-center sm:text-left">
            <span>&copy; {currentYear} NextSoftHR. All rights reserved.</span>
            <span>·</span>
            <span>Registered Global SaaS Architecture</span>
            <span>·</span>
            <span>www.nextsofthr.org</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
