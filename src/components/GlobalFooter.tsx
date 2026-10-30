import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Coins,
  Sparkles
} from 'lucide-react';
import { CurrencySelector } from '../pages/homepage/components/CurrencySelector';
import { ThemeToggle } from '../pages/homepage/components/ThemeToggle';

export interface GlobalFooterProps {
  onNavigate?: (page: string) => void;
  onOpenLeadModal?: (service?: string) => void;
  onOpenDemo?: () => void;
  onOpenExpert?: () => void;
}

export const GlobalFooter: React.FC<GlobalFooterProps> = ({
  onNavigate,
  onOpenLeadModal,
  onOpenDemo,
  onOpenExpert,
}) => {
  const navigate = useNavigate();

  const handleTalkToExpert = () => {
    if (onOpenLeadModal) {
      onOpenLeadModal("Full Outsourcing Consultation");
    } else if (onOpenExpert) {
      onOpenExpert();
    } else {
      navigate('/contact');
    }
  };

  const handleCalculate = () => {
    if (onNavigate) {
      onNavigate("calculator");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/outsourcing?view=calculator');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleItemNavigation = (href: string, e?: React.MouseEvent) => {
    if (onNavigate && href.startsWith('/outsourcing?view=')) {
      e?.preventDefault();
      const page = href.split('view=')[1];
      onNavigate(page);
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('view', page);
        window.history.pushState({ page }, '', url.toString());
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemClick = (view: string, fallbackUrl?: string) => {
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (fallbackUrl) {
      navigate(fallbackUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(`/outsourcing?view=${view}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <Link to="/" className="inline-block group">
              <img
                src="/next-soft-logo.png"
                alt="NextSoftHr — Powering People. Driving Businesses"
                className="h-11 w-auto object-contain bg-white/95 rounded-lg p-1.5 shadow-sm transition-transform group-hover:scale-[1.02]"
              />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              All – One – Modern HR, Payroll and Business Management Platform enabling organizations worldwide to manage their entire workforce from one unified and intelligent platform.
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
                <a href="tel:+2349158482622" className="hover:text-white transition-colors">
                  +2349158482622
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-lime-400"></span>
              <span>
                Website:{" "}
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

          {/* First Column: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Products
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  HR Management
                </Link>
              </li>
              <li>
                <Link to="/outsourcing?view=outsourcing-payroll" onClick={(e) => handleItemNavigation('/outsourcing?view=outsourcing-payroll', e)} className="hover:text-white transition-colors">
                  Payroll
                </Link>
              </li>
              <li>
                <Link to="/outsourcing?view=outsourcing-time-attendance" onClick={(e) => handleItemNavigation('/outsourcing?view=outsourcing-time-attendance', e)} className="hover:text-white transition-colors">
                  Attendance
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  Shift &amp; Scheduling
                </Link>
              </li>
              <li>
                <Link to="/outsourcing?view=outsourcing-leave" onClick={(e) => handleItemNavigation('/outsourcing?view=outsourcing-leave', e)} className="hover:text-white transition-colors">
                  Leave &amp; Time Off
                </Link>
              </li>
              <li>
                <Link to="/outsourcing?view=outsourcing-recruitment" onClick={(e) => handleItemNavigation('/outsourcing?view=outsourcing-recruitment', e)} className="hover:text-white transition-colors">
                  Recruitment &amp; ATS
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  Performance Mgt.
                </Link>
              </li>
              <li>
                <Link to="/outsourcing?view=portals" onClick={(e) => handleItemNavigation('/outsourcing?view=portals', e)} className="hover:text-white transition-colors">
                  Manager/Employee ESS
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  WhatsApp
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  Biometrics
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  Letters &amp; Offers
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  AI Assistance
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  Rest API
                </Link>
              </li>
            </ul>
          </div>

          {/* Second Column: Business */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Business
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  CRM
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  Finance
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  Assets
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  Expense
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  Payment
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  Reports
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  Analytics
                </Link>
              </li>
              <li>
                <Link to="/pricing" onClick={(e) => handleItemNavigation('/pricing', e)} className="hover:text-white transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/pricing" onClick={(e) => handleItemNavigation('/pricing', e)} className="hover:text-white transition-colors">
                  Small Business
                </Link>
              </li>
              <li>
                <Link to="/pricing" onClick={(e) => handleItemNavigation('/pricing', e)} className="hover:text-white transition-colors">
                  Medium Business
                </Link>
              </li>
              <li>
                <Link to="/pricing" onClick={(e) => handleItemNavigation('/pricing', e)} className="hover:text-white transition-colors">
                  Enterprises
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleItemNavigation('/services', e)} className="hover:text-white transition-colors">
                  Industries
                </Link>
              </li>
            </ul>
          </div>

          {/* Third Column: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/about-us" onClick={(e) => handleItemNavigation('/about-us', e)} className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={(e) => handleItemNavigation('/contact', e)} className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/training" onClick={(e) => handleItemNavigation('/training', e)} className="hover:text-white transition-colors">
                  Training
                </Link>
              </li>
              <li>
                <Link to="/pricing" onClick={(e) => handleItemNavigation('/pricing', e)} className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/outsourcing-pricing" onClick={(e) => handleItemNavigation('/outsourcing-pricing', e)} className="hover:text-lime-400 transition-colors">
                  Outsourcing Pricing
                </Link>
              </li>
              <li>
                <Link to="/outsourcing" onClick={(e) => handleItemNavigation('/outsourcing', e)} className="hover:text-white transition-colors">
                  Outsourcing
                </Link>
              </li>
              <li>
                <Link to="/partners" onClick={(e) => handleItemNavigation('/partners', e)} className="hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/partner-registry" onClick={(e) => handleItemNavigation('/partner-registry', e)} className="hover:text-lime-400 transition-colors">
                  Partner Registry
                </Link>
              </li>
              <li>
                <Link to="/job-hunt" onClick={(e) => handleItemNavigation('/job-hunt', e)} className="hover:text-white transition-colors">
                  Recruitment Marketplace
                </Link>
              </li>
              <li>
                <Link to="/recruitment-board" onClick={(e) => handleItemNavigation('/recruitment-board', e)} className="hover:text-lime-400 transition-colors">
                  Recruitment Board
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={(e) => handleItemNavigation('/blog', e)} className="hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={(e) => handleItemNavigation('/blog', e)} className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" onClick={(e) => handleItemNavigation('/faq', e)} className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/faq" onClick={(e) => handleItemNavigation('/faq', e)} className="hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={(e) => handleItemNavigation('/contact', e)} className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={(e) => handleItemNavigation('/blog', e)} className="hover:text-white transition-colors">
                  Product Updates
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Supported Pan-African Payroll Hubs Strip */}
        <div className="py-6 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="font-semibold text-slate-300">
            Supported Pan-African Payroll Hubs:
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick("multi-country")}
            >
              🇳🇬 Nigeria (NGN)
            </span>
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick("multi-country")}
            >
              🇬🇭 Ghana (GHS)
            </span>
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick("multi-country")}
            >
              🇰🇪 Kenya (KES)
            </span>
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick("multi-country")}
            >
              🇿🇦 South Africa (ZAR)
            </span>
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick("multi-country")}
            >
              🇺🇬 Uganda (UGX)
            </span>
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick("multi-country")}
            >
              🇹🇿 Tanzania (TZS)
            </span>
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick("multi-country")}
            >
              🇷🇼 Rwanda (RWF)
            </span>
            <span
              className="hover:text-white cursor-pointer"
              onClick={() => handleItemClick("multi-country")}
            >
              🇿🇲 Zambia (ZMW)
            </span>
          </div>
        </div>

        {/* Currency & Theme Appearance Controls Strip */}
        <div className="py-6 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-lime-400" />
                <span>Currency:</span>
              </span>
              <CurrencySelector variant="footer" />
            </div>

            <div className="hidden sm:block h-4 w-px bg-slate-800" />

            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                <span>Appearance:</span>
              </span>
              <ThemeToggle variant="segmented" />
            </div>
          </div>

          {/* Security & Compliance Words */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-slate-300 text-[11px] sm:text-xs font-medium">
            <span>ISO 27001 Certified</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span>256-Bit SSL Encrypted</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span>GDPR &amp; Statutory Audit Ready</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span>SOC 2 Type II</span>
          </div>
        </div>

        {/* Statutory Compliance Notice */}
        <div className="pt-6 pb-4 text-xs text-slate-400/90 leading-relaxed bg-[#040D24] p-4 rounded-xl border border-slate-800 my-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">
              Compliance Standard Notice:{" "}
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
            <Link
              to="/privacy-policy"
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </Link>
            <span>·</span>
            <Link
              to="/terms-conditions"
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </Link>
            <span>·</span>
            <button
              onClick={() => handleItemClick("security", "/terms-conditions")}
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Security Whitepaper
            </button>
            <span>·</span>
            <button
              onClick={() => handleItemClick("compliance", "/privacy-policy")}
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
