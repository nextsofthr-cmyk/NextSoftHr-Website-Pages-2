import React from 'react';
import { NextSoftLogo } from './NextSoftLogo';
import { BRAND_INFO } from '../data/academyData';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  ArrowUpRight,
} from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onFilterCategory: (categoryName: string) => void;
  onOpenCorporate: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onFilterCategory,
  onOpenCorporate,
}) => {
  return (
    <footer className="bg-[#0B1E33] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info Col */}
          <div className="lg:col-span-2">
            <NextSoftLogo variant="white" />
            <p className="text-xs text-slate-400 mt-4 leading-relaxed max-w-sm">
              NextSoftHR is the global HR, payroll, and business management platform empowering organizations and people. Our Training Academy equips professionals with demonstrable skills for the modern workplace.
            </p>

            <div className="mt-4 text-xs font-bold text-[#84CC16] tracking-wide uppercase">
              "Powering People. Driving Businesses."
            </div>

            {/* Direct Contact Block */}
            <div className="mt-6 space-y-2.5 text-xs text-slate-300">
              <a
                href={BRAND_INFO.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>{BRAND_INFO.website}</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>{BRAND_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>{BRAND_INFO.email}</span>
              </a>

              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>{BRAND_INFO.address}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#0F4C81] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#0F4C81] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#0F4C81] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#0F4C81] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 1: Training */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Training
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateSection('courses-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  All Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterCategory('HR Management')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  HR Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterCategory('Payroll')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Payroll Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterCategory('Leadership & Management')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Leadership Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterCategory('HR Analytics')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  HR Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterCategory('AI for HR')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  AI for HR
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('learning-paths')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Learning Paths
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('upcoming-sessions')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Training Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: For Businesses */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              For Businesses
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenCorporate}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Corporate Training
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCorporate}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Team Training
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCorporate}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Customized Training
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCorporate}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Request a Quote
                </button>
              </li>
            </ul>

            <h4 className="text-xs font-bold text-white uppercase tracking-wider mt-6 mb-3">
              NextSoftHR
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href={BRAND_INFO.websiteUrl} className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href={BRAND_INFO.websiteUrl} className="hover:text-white transition-colors">
                  HR Platform
                </a>
              </li>
              <li>
                <a href={BRAND_INFO.websiteUrl} className="hover:text-white transition-colors">
                  Features & Modules
                </a>
              </li>
              <li>
                <a href={BRAND_INFO.websiteUrl} className="hover:text-white transition-colors">
                  Pricing Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href={BRAND_INFO.websiteUrl} className="hover:text-white transition-colors">
                  NextSoftHR Blog
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('faq-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  FAQ Knowledgebase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('courses-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Training Resources
                </button>
              </li>
              <li>
                <a href={BRAND_INFO.websiteUrl} className="hover:text-white transition-colors">
                  Knowledge Centre
                </a>
              </li>
            </ul>

            {/* Accreditation / Quality Notice */}
            <div className="mt-6 p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block mb-1">
                Academic Standard
              </span>
              <p className="text-[11px] text-slate-400 leading-snug">
                NextSoftHR Training Academy courses follow rigorous corporate competency standards.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} NextSoftHR Training Academy. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </a>
            <span>·</span>
            <a href="#cookies" className="hover:text-slate-300 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
