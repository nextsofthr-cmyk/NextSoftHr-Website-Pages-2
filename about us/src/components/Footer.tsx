import React from "react";
import { Phone, Mail, Globe, MapPin, ShieldCheck, ArrowUp } from "lucide-react";
import { BRAND } from "../data/contentData";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A2540] dark:bg-[#050e18] text-slate-300 pt-16 pb-12 border-t border-blue-900/50 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-white/10 dark:border-slate-800">
          {/* Brand Info Column */}
          <div className="col-span-2 space-y-4">
            <a href="#hero" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0B3B73] to-[#0A2540] flex items-center justify-center shadow border border-blue-800/40">
                <span className="text-white font-extrabold text-xl tracking-tight">
                  N
                </span>
                <span className="w-2 h-2 rounded-full bg-[#84CC16] -ml-1 -mt-3 ring-2 ring-[#0A2540]"></span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white flex items-center">
                Next<span className="text-[#84CC16]">Softhr</span>
              </span>
            </a>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              All – One – Modern HR, Payroll and Business Management Platform
              enabling organizations worldwide to manage their entire workforce
              from one unified and intelligent platform.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-2 hover:text-[#84CC16] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>{BRAND.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2 hover:text-[#84CC16] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>{BRAND.email}</span>
              </a>

              <a
                href={BRAND.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#84CC16] transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>{BRAND.website}</span>
              </a>
            </div>
          </div>

          {/* Column 1: Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="#about-intro"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#our-story"
                  className="hover:text-white transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#people"
                  className="hover:text-white transition-colors"
                >
                  Careers & Team
                </a>
              </li>
              <li>
                <a href="#cta" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#people"
                  className="hover:text-white transition-colors"
                >
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="#platform"
                  className="hover:text-white transition-colors"
                >
                  HR Management
                </a>
              </li>
              <li>
                <a
                  href="#platform"
                  className="hover:text-white transition-colors"
                >
                  Payroll Automation
                </a>
              </li>
              <li>
                <a
                  href="#platform"
                  className="hover:text-white transition-colors"
                >
                  Time & Attendance
                </a>
              </li>
              <li>
                <a
                  href="#platform"
                  className="hover:text-white transition-colors"
                >
                  Leave Management
                </a>
              </li>
              <li>
                <a
                  href="#platform"
                  className="hover:text-white transition-colors"
                >
                  Employee Management
                </a>
              </li>
              <li>
                <a
                  href="#platform"
                  className="hover:text-white transition-colors"
                >
                  Business Operations
                </a>
              </li>
              <li>
                <a
                  href="#ai-future"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>AI Assistant</span>
                  <span className="bg-[#84CC16]/20 text-[#84CC16] text-[9px] font-bold px-1 rounded">
                    NEW
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="#video-story"
                  className="hover:text-white transition-colors"
                >
                  Meet NextSofthr
                </a>
              </li>
              <li>
                <a
                  href="#who-we-serve"
                  className="hover:text-white transition-colors"
                >
                  Solutions by Industry
                </a>
              </li>
              <li>
                <a
                  href="#built-for-africa"
                  className="hover:text-white transition-colors"
                >
                  Tax & Pension Guides
                </a>
              </li>
              <li>
                <a href="#cta" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#cta" className="hover:text-white transition-colors">
                  Help Center & FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Security */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Terms & Conditions
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Security & NDPR
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Cookie Policy
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Audit Governance
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#84CC16]" />
            <span>
              &copy; {new Date().getFullYear()} NextSofthr. All rights reserved.
              Built with African businesses in mind, designed for organizations
              worldwide.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <LanguageSwitcher dropUp />
            <ThemeToggle showLabel />
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#84CC16]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
