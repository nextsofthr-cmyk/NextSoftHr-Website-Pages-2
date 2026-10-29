import React from 'react';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Github,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="saas-footer" className="bg-[#070D1F] dark:bg-[#040813] text-slate-400 text-xs border-t border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Contact Info Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0265DC] to-[#004DB3] flex items-center justify-center text-white font-display font-extrabold text-base shadow-sm">
                N
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Next<span className="text-[#0265DC]">Soft</span>
                <span className="text-[#A3E635]">hr</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              All-in-one modern HR, payroll and business management platform enabling organizations
              worldwide to manage their entire workforce from one intelligent platform.
            </p>

            <div className="space-y-2 pt-2 text-slate-300 text-xs">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#0265DC]" />
                <a
                  href="https://www.nextsofthr.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A3E635] transition-colors"
                >
                  www.nextsofthr.org
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#A3E635]" />
                <a href="tel:+2349158482622" className="hover:text-white transition-colors">
                  +2349158482622
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0265DC]" />
                <a href="mailto:info@nextsofthr.org" className="hover:text-white transition-colors">
                  info@nextsofthr.org
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-[#0265DC] hover:text-white flex items-center justify-center transition-colors text-slate-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-[#0265DC] hover:text-white flex items-center justify-center transition-colors text-slate-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-[#0265DC] hover:text-white flex items-center justify-center transition-colors text-slate-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-[#0265DC] hover:text-white flex items-center justify-center transition-colors text-slate-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3.5 font-display">
              Product
            </h4>
            <ul className="space-y-2">
              {[
                'HR Management',
                'Payroll',
                'Attendance',
                'Shift & Scheduling',
                'Leave',
                'Recruitment',
                'Performance',
                'Employee Self-Service',
                'AI Assistant',
              ].map((item) => (
                <li key={item}>
                  <a href="#features" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Column */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3.5 font-display">
              Business
            </h4>
            <ul className="space-y-2">
              {[
                'CRM',
                'Finance',
                'Expenses',
                'Projects',
                'Reports',
                'Analytics',
              ].map((item) => (
                <li key={item}>
                  <a href="#features" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3.5 font-display">
              Solutions
            </h4>
            <ul className="space-y-2">
              {[
                'Small Business',
                'Medium Business',
                'Enterprise',
                'Industry Solutions',
              ].map((item) => (
                <li key={item}>
                  <a href="#industries" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mt-6 mb-3.5 font-display">
              Resources
            </h4>
            <ul className="space-y-2">
              {[
                'Blog',
                'Help Center',
                'Documentation',
                'Tutorials',
                'FAQs',
              ].map((item) => (
                <li key={item}>
                  <a href="#faq" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3.5 font-display">
              Company
            </h4>
            <ul className="space-y-2 mb-6">
              {['About', 'Careers', 'Partners', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#company" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3.5 font-display">
              Legal
            </h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Security', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#legal" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} NextSofthr. All rights reserved. Registered trademark.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A3E635]" />
              Enterprise Data Protection
            </span>
            <a href="#top" className="hover:text-white transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
