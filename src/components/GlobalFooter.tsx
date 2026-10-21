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
              NextSofthr is a technology-powered HR, payroll and workforce outsourcing partner combining professional human support, intelligent automation, deep African compliance, and advanced analytics.
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
                <span>+234 1 888 4768 / +254 20 765 0920</span>
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

          {/* Column 1: Outsourcing Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Outsourcing
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleItemClick("outsourcing-payroll")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Payroll Outsourcing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("outsourcing-hr-admin")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  HR Administration
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("outsourcing-managed-hr")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Managed HR Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("outsourcing-recruitment")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Recruitment &amp; Talent
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("outsourcing-employee-admin")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Employee Administration
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("multi-company")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Enterprise Workforce
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Workforce Tech & Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Platform &amp; Hubs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleItemClick("outsourcing-time-attendance")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Time &amp; Attendance
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("outsourcing-leave")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Leave Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("multi-country")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Multi-Country African Payroll
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("compliance")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Compliance Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("migration")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Data Migration Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("integrations")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Integrations Marketplace
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Company &amp; Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleItemClick("packages")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Outsourcing Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("calculator")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  ROI &amp; Efficiency Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("implementation")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  8-Phase Implementation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("security")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Security &amp; RBAC Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("partners", "/partners")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Partner with NextSofthr
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick("portals")}
                  className="hover:text-lime-400 transition-colors cursor-pointer text-left"
                >
                  Client &amp; Staff Portals
                </button>
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
