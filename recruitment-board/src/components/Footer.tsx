import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  Linkedin, 
  Twitter 
} from 'lucide-react';
import { UserRole } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface FooterProps {
  onOpenSearch: () => void;
  onOpenAuth: (mode: 'login' | 'register', role?: UserRole) => void;
  onOpenPostJob: () => void;
  onOpenServicesModal: (serviceId?: string) => void;
  onOpenSavedJobs: () => void;
  onOpenApiDocs: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSearch,
  onOpenAuth,
  onOpenPostJob,
  onOpenServicesModal,
  onOpenSavedJobs,
  onOpenApiDocs
}) => {
  const { t } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [legalNotice, setLegalNotice] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && emailInput.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmailInput('');
      }, 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A192F] dark:bg-[#070B14] text-slate-400 pt-16 pb-12 border-t border-slate-800 text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter & Headline Strip */}
        <div className="pb-12 border-b border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Stay ahead of African talent market movements.
            </h3>
            <p className="text-slate-400 max-w-xl text-xs sm:text-sm">
              Subscribe to NextSoftHR Workforce Quarterly for compensation benchmarks, executive hiring trends, and HR technology updates.
            </p>
          </div>

          <div className="lg:col-span-5">
            {isSubscribed ? (
              <div className="p-3 bg-lime-950/60 border border-lime-800/80 rounded-xl text-lime-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400" />
                <span>Thank you! You are subscribed to NextSoftHR Talent Insights.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your work email address"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
          {/* Column 1: NextSoftHR Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-bold text-base">
                N
              </div>
              <span className="text-lg font-extrabold text-white">
                NextSoft<span className="text-[#2563EB]">HR</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unified recruitment marketplace and human resources technology platform. Connecting job discovery, talent acquisition, RPO, and headhunting within one trusted digital ecosystem.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="NextSoftHR on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="NextSoftHR on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Job Seekers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Job Seekers</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenSearch} className="hover:text-white transition-colors">
                  Find Jobs
                </button>
              </li>
              <li>
                <a href="#companies" className="hover:text-white transition-colors">
                  Browse Companies
                </a>
              </li>
              <li>
                <button onClick={onOpenSavedJobs} className="hover:text-white transition-colors">
                  Saved Jobs & Alerts
                </button>
              </li>
              <li>
                <a href="#resources" className="hover:text-white transition-colors">
                  Career Resources
                </a>
              </li>
              <li>
                <button onClick={() => onOpenAuth('register', 'job_seeker')} className="hover:text-white transition-colors">
                  Create Candidate Account
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Employers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Employers</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenPostJob} className="hover:text-white transition-colors text-blue-400 font-semibold">
                  Post a Job Vacancy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuth('login', 'employer')} className="hover:text-white transition-colors">
                  Employer Login
                </button>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Recruitment Software (ATS)
                </a>
              </li>
              <li>
                <button onClick={() => onOpenServicesModal('srv-b')} className="hover:text-white transition-colors">
                  Recruitment Outsourcing (RPO)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenServicesModal('srv-c')} className="hover:text-white transition-colors">
                  Executive Headhunting
                </button>
              </li>
              <li>
                <button onClick={() => onOpenServicesModal('srv-b')} className="hover:text-white transition-colors">
                  Request a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Recruiters & Partners */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Recruiters & Partners</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onOpenAuth('register', 'agency')} className="hover:text-white transition-colors">
                  Agency Registration
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuth('register', 'agency')} className="hover:text-white transition-colors">
                  Headhunter Registration
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuth('register', 'partner')} className="hover:text-white transition-colors">
                  Partner Programme
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuth('login', 'partner')} className="hover:text-white transition-colors">
                  Partner Login
                </button>
              </li>
              <li>
                <button onClick={onOpenApiDocs} className="hover:text-white transition-colors text-lime-400 font-mono">
                  REST & GraphQL API Specs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Company & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company & Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  About NextSoftHR
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Enterprise Support
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Help Centre & FAQ
                </a>
              </li>
              <li>
                <button 
                  type="button" 
                  className="hover:text-white transition-colors text-left" 
                  onClick={() => setLegalNotice("Privacy Policy: NextSoftHR strictly adheres to the Nigeria Data Protection Act (NDPA) and global GDPR standards. Candidate resumes and enterprise records are encrypted and never sold or shared without explicit consent.")}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className="hover:text-white transition-colors text-left" 
                  onClick={() => setLegalNotice("Terms of Service: NextSoftHR provides verified talent acquisition workflows. Employers and candidate accounts must submit authentic credentials. Anti-discrimination and merit-based hiring regulations enforced.")}
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className="hover:text-white transition-colors text-left" 
                  onClick={() => setLegalNotice("Cookie Preferences: Strict essential cookies for authentication and session management are active. Analytical telemetry is anonymized and compliant with privacy frameworks.")}
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>

        </div>

        {legalNotice && (
          <div className="mb-6 p-4 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 flex items-start justify-between gap-4 animate-in fade-in duration-150">
            <div>
              <p className="font-semibold text-white mb-0.5">Policy Information</p>
              <p className="leading-relaxed">{legalNotice}</p>
            </div>
            <button
              onClick={() => setLegalNotice(null)}
              className="text-slate-400 hover:text-white shrink-0 text-xs font-semibold px-2 py-1 rounded bg-slate-800"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Bottom Bar: Copyright & Standards */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>© {currentYear} NextSoftHR Technologies Limited. {t('footer.rights', 'All rights reserved.')}</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:inline text-slate-400">{t('footer.tagline', 'Pan-African Employment & Recruitment Infrastructure')}</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector compact />
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-400 dark:text-lime-400" />
              <span>NDPA & GDPR Compliant</span>
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Operating across Pan-Africa & Global</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
