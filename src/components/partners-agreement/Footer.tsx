import React from 'react';
import { Phone, Globe, Shield, FileText, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenDocCenter: () => void;
  onOpenAcceptance: () => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDocCenter,
  onOpenAcceptance,
  onOpenLogin
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mandate Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white">NextSoft</span>
              <span className="text-xl font-bold tracking-tight text-blue-400">HR</span>
              <span className="h-2 w-2 rounded-full bg-lime-400 inline-block"></span>
            </div>

            <p className="text-slate-300 font-medium text-sm">
              Powering People. Driving Businesses.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              NextSoftHR is a global HR, Payroll and Business Management Platform serving micro, small, medium and large organizations across Africa, Europe, the Americas, and the Middle East.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href="https://www.nextsofthr.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  www.nextsofthr.org
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-lime-400 shrink-0" />
                <a
                  href="tel:+2349158482622"
                  className="hover:text-white transition-colors font-mono"
                >
                  +2349158482622
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column 1: Ecosystem */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block font-mono">
              Ecosystem
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#overview" className="hover:text-white transition-colors">
                  Partner Program
                </a>
              </li>
              <li>
                <a href="#agreement-text" className="hover:text-white transition-colors">
                  Partner Agreement
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenLogin}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Partner Login
                </button>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Partner Directory
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAcceptance}
                  className="hover:text-white transition-colors text-left cursor-pointer text-lime-400 font-semibold"
                >
                  Accept Agreement
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Legal & Governance */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block font-mono">
              Legal & Compliance
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={onOpenDocCenter}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDocCenter}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <a href="#agreement-text" className="hover:text-white transition-colors">
                  Cookie Policy (Clause 17)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenDocCenter}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Data Processing Agreement (DPA)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDocCenter}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Partner Code of Conduct
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Global Desks */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block font-mono">
              Channel Helpdesk
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="mailto:partners@nextsofthr.org" className="hover:text-white transition-colors">
                  partners@nextsofthr.org
                </a>
              </li>
              <li>
                <a href="mailto:legal@nextsofthr.org" className="hover:text-white transition-colors">
                  legal@nextsofthr.org
                </a>
              </li>
              <li>
                <a href="tel:+2349158482622" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                Operating Hours: 24/7 Global Channel Dispatch
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Notice & Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} NextSoftHR. All Rights Reserved.
          </div>

          <div className="text-center sm:text-right">
            <span>Reseller, Partner, Distributor, Affiliate & Associate Digital Agreement · Version 1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
