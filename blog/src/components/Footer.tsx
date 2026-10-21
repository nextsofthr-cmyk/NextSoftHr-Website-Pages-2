import React from 'react';
import { 
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate?: (route: string) => void;
  onOpenBookDemo?: () => void;
  onOpenGetStarted?: () => void;
  onOpenSitemap?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenGetStarted,
}) => {
  const { t } = useLanguage();

  const handleTalkToExpert = () => {
    if (onOpenGetStarted) {
      onOpenGetStarted();
    } else {
      window.location.href = '/contact';
    }
  };

  const handleCalculate = () => {
    window.location.href = '/outsourcing?view=calculator';
  };

  const handleItemClick = (view: string, fallbackUrl?: string) => {
    if (fallbackUrl && !view) {
      window.location.href = fallbackUrl;
    } else {
      window.location.href = `/outsourcing?view=${view}`;
    }
  };

  return (
    <footer className="bg-[#061537] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Outsource Invitation Bar */}
        <div className="bg-gradient-to-r from-[#0A1E4A] via-[#0F2D6B] to-[#12398C] rounded-2xl p-8 sm:p-10 mb-14 border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-lime-400">
              Transform Your Workforce Operations
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to outsource your HR &amp; payroll with total peace of mind?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Join leading African and multinational employers who trust NextSofthr for precision payroll, compliant statutory operations, and human HR expertise.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleTalkToExpert}
              className="px-6 py-3 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Talk to an Expert</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleCalculate}
              className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-medium text-sm rounded-xl transition-colors border border-white/10 cursor-pointer"
            >
              Calculate Your Needs
            </button>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Corporate Column */}
          <div className="col-span-2 space-y-4">
            <a href="/" className="inline-block group">
              <img
                src="/next-soft-logo.png"
                alt="NextSoftHr — Powering People. Driving Businesses"
                className="h-11 w-auto object-contain bg-white/95 rounded-lg p-1.5 shadow-sm transition-transform group-hover:scale-[1.02]"
              />
            </a>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              All – One – Modern HR, Payroll and Business Management Platform
              enabling organizations worldwide to manage their entire workforce
              from one unified and intelligent platform.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <span>
                  Regional Hubs: Lagos · Nairobi · Accra · Johannesburg · London
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <span>support@nextsofthr.org · outsourcing@nextsofthr.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <span>+2349158482622</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-lime-400"></span>
              <span>
                Website:{' '}
                <a
                  href="http://www.nextsofthr.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:underline"
                >
                  www.nextsofthr.org
                </a>
              </span>
            </div>
          </div>

          {/* Column 1: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Products
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleItemClick('outsourcing-payroll', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  HR Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('outsourcing-hr-admin', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Payroll
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('outsourcing-managed-hr', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Attendance
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('outsourcing-recruitment', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shift &amp; Scheduling
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('outsourcing-employee-admin', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Leave &amp; Time Off
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('multi-company', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Recruitment &amp; ATS
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('multi-company', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Performance Mgt
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('multi-company', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Manager/Employee ESS
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('multi-company', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  WhatsApp
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('multi-company', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Biometrics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('multi-company', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Letters &amp; Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('multi-company', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  AI Assistance
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('multi-company', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Rest API
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Business */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Business
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleItemClick('outsourcing-time-attendance', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  CRM
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('outsourcing-leave', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Finance
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('multi-country', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Assets
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('compliance', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Expense
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('migration', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Project
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('integrations', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Payment
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('integrations', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Report
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('integrations', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('integrations', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('integrations', '/pricing')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Small Business
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('integrations', '/pricing')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Medium Business
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('integrations', '/pricing')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Enterprise
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('integrations', '/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Industries
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="/about-us" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/training" className="hover:text-white transition-colors">
                  Training
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/partners" className="hover:text-white transition-colors">
                  Partners
                </a>
              </li>
              <li>
                <a href="/partner-registry" className="hover:text-lime-400 transition-colors">
                  Partner Registry
                </a>
              </li>
              <li>
                <a href="/about-us" className="hover:text-lime-400 transition-colors">
                  Career
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-lime-400 transition-colors">
                  Resources
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-lime-400 transition-colors">
                  Blogs
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-lime-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-lime-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-lime-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-lime-400 transition-colors">
                  Product Update
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* African Markets Strip */}
        <div className="py-6 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="font-semibold text-slate-300">
            Supported Pan-African Payroll Hubs:
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick('multi-country')}
            >
              🇳🇬 Nigeria (NGN)
            </span>
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick('multi-country')}
            >
              🇬🇭 Ghana (GHS)
            </span>
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick('multi-country')}
            >
              🇰🇪 Kenya (KES)
            </span>
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick('multi-country')}
            >
              🇿🇦 South Africa (ZAR)
            </span>
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick('multi-country')}
            >
              🇺🇬 Uganda (UGX)
            </span>
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick('multi-country')}
            >
              🇹🇿 Tanzania (TZS)
            </span>
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick('multi-country')}
            >
              🇷🇼 Rwanda (RWF)
            </span>
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick('multi-country')}
            >
              🇿🇲 Zambia (ZMW)
            </span>
          </div>
        </div>

        {/* Statutory Compliance Notice */}
        <div className="pt-6 pb-4 text-xs text-slate-400/90 leading-relaxed bg-[#040D24] p-4 rounded-xl border border-slate-800 my-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">
              Compliance Standard Notice:{' '}
            </span>
            NextSofthr helps organizations organize, monitor and manage HR and
            payroll processes to support their compliance responsibilities.
            Local tax regulations, statutory contributions, and labor policies
            are administered in accordance with approved jurisdictional
            frameworks.
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-3">
            <span>
              @2026 NextSoftHr. All Rights Reserved Trade Mark of NextSoft-Group
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="/privacy-policy"
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <span>·</span>
            <a
              href="/terms-conditions"
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </a>
            <span>·</span>
            <button
              onClick={() => handleItemClick('security', '/terms-conditions')}
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Security Whitepaper
            </button>
            <span>·</span>
            <button
              onClick={() => handleItemClick('compliance', '/privacy-policy')}
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              ISO 27001 &amp; NDPR Certified
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
