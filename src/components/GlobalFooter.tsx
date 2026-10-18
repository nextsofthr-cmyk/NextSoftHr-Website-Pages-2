import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, Shield, Lock, CheckCircle2, Sparkles, Coins
} from 'lucide-react';
import { CurrencySelector } from '../pages/homepage/components/CurrencySelector';
import { LanguageSelector } from '../pages/homepage/components/LanguageSelector';
import { ThemeToggle } from '../pages/homepage/components/ThemeToggle';
import { useLanguage } from '../pages/homepage/context/LanguageContext';

export interface GlobalFooterProps {
  onOpenDemo?: () => void;
  onOpenExpert?: () => void;
}

export const GlobalFooter: React.FC<GlobalFooterProps> = () => {
  const { dict } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="inline-block group">
              <img
                src="/next-soft-logo.png"
                alt="NextSoftHr — Powering People. Driving Businesses"
                className="h-11 w-auto object-contain bg-white/95 rounded-lg p-1.5 shadow-sm transition-transform group-hover:scale-[1.02]"
              />
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              All-in-One Modern HR, Payroll and Business Management Platform
              enabling organizations worldwide to manage their entire
              workforce from one unified and intelligent platform.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <Globe className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>Global HQ: London • New York • Singapore • Nairobi • Lagos</span>
            </div>
          </div>

          {/* Col 2: Platform Modules */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Products
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  HR Management
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Payroll
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Attendance
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Shift &amp; Scheduling
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Leave &amp; Time Off
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Recruitment &amp; ATS
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Performance Mgt.
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Manager/Employee ESS
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  AI Assistance
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Rest API
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Business Operations */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Business
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  CRM
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Finance
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Assets
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Expense
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Payment
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Reports
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Solutions */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Solutions
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Small Business
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Medium Business
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Enterprises
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/outsourcing" className="hover:text-lime-400 transition-colors">
                  Outsourcing &amp; BPO
                </Link>
              </li>
              <li>
                <Link to="/training" className="hover:text-lime-400 transition-colors">
                  Academy &amp; Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Statutory */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/training" className="hover:text-white transition-colors">
                  Training
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/partner-registry" className="hover:text-lime-400 transition-colors">
                  Partner Registry
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Career
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Private Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/partners-agreement" className="hover:text-white transition-colors">
                  Partner Agreement
                </Link>
              </li>
              <li>
                <Link to="/partner-commission" className="hover:text-white transition-colors">
                  Partner Commission
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Currency, Theme Appearance & Language Selector in Footer */}
        <div className="pt-8 pb-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
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
                <Globe className="w-3.5 h-3.5 text-lime-400" />
                <span>Language:</span>
              </span>
              <LanguageSelector variant="footer" />
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

          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-lime-400"></span>
            <span>NextSoftHr Platform: Deep Navy &amp; Charcoal with Primary Blue &amp; Lemon Green</span>
          </div>
        </div>

        {/* Trust Badges & Compliance Bar */}
        <div className="pt-6 pb-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Shield className="w-3.5 h-3.5 text-lime-400" /> ISO 27001 Certified
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Lock className="w-3.5 h-3.5 text-lime-400" /> 256-Bit SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" /> GDPR &amp; Statutory Audit Ready
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" /> SOC 2 Type II
            </span>
          </div>

          <div>
            @2026 NextSoftHr. All Rights Reserved Trade Mark of NextSoft-Group
          </div>
        </div>
      </div>
    </footer>
  );
};
