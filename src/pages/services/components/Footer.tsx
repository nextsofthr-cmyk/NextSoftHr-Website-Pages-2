import React from 'react';
import {
  ShieldCheck,
  Phone,
  MessageCircle,
  Globe,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowUp,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0A2540] dark:bg-[#07182E] text-slate-300 pt-16 pb-12 border-t border-slate-800 dark:border-blue-900/60 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-14 border-b border-slate-800 dark:border-blue-900/60">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0256C4] to-blue-800 flex items-center justify-center text-white shadow-md relative">
                <ShieldCheck className="w-6 h-6 text-white" />
                <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#84CC16]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white flex items-center">
                Next<span className="text-blue-400">Soft</span>
                <span className="text-[#84CC16]">hr</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-300 leading-relaxed max-w-sm">
              NextSofthr is the modern, intelligent all-in-one HR, Payroll and Business Management Platform designed
              to empower micro, small, medium-sized and large enterprises across Africa and worldwide.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <a
                href="tel:+2349158482622"
                className="flex items-center gap-2 text-slate-300 hover:text-[#84CC16] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#84CC16]" />
                <span className="font-semibold">+234 915 848 2622</span>
              </a>

              <a
                href="https://wa.me/2349158482622?text=Hello%20NextSofthr%20Sales%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20HR%20%26%20Payroll%20platform."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Sales: +234 915 848 2622</span>
              </a>

              <a
                href="https://www.nextsofthr.org"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4 text-blue-400" />
                <span>www.nextsofthr.org</span>
              </a>

              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>Operating across Nigeria, Ghana, Kenya, South Africa &amp; Global Hubs</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 dark:bg-blue-950/80 hover:bg-[#0256C4] flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-transparent dark:border-blue-900/60"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 dark:bg-blue-950/80 hover:bg-[#0256C4] flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-transparent dark:border-blue-900/60"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 dark:bg-blue-950/80 hover:bg-[#0256C4] flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-transparent dark:border-blue-900/60"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 dark:bg-blue-950/80 hover:bg-[#0256C4] flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-transparent dark:border-blue-900/60"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 dark:text-slate-300">
              <li><a href="#services" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Core HR Management</a></li>
              <li><a href="#services" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Smart African Payroll</a></li>
              <li><a href="#services" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Time &amp; Attendance</a></li>
              <li><a href="#services" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Shift Scheduling</a></li>
              <li><a href="#services" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Leave Management</a></li>
              <li><a href="#services" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Performance &amp; OKRs</a></li>
              <li><a href="#ai-section" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">AI HR Assistant</a></li>
            </ul>
          </div>

          {/* Solutions Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 dark:text-slate-300">
              <li><a href="#business-stages" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Micro Businesses</a></li>
              <li><a href="#business-stages" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Small Businesses</a></li>
              <li><a href="#business-stages" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Medium Companies</a></li>
              <li><a href="#business-stages" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Large Enterprises</a></li>
              <li><a href="#industries" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Tech &amp; Startups</a></li>
              <li><a href="#industries" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Manufacturing &amp; Factories</a></li>
              <li><a href="#industries" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Healthcare &amp; Hospitals</a></li>
            </ul>
          </div>

          {/* Resources & Integrations Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 dark:text-slate-300">
              <li><a href="#how-it-works" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Implementation Roadmap</a></li>
              <li><a href="#integrations" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Integration Directory</a></li>
              <li><a href="#security" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Data Security &amp; Privacy</a></li>
              <li><a href="#testimonials" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Customer Case Studies</a></li>
              <li><a href="#faq" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Knowledge Base &amp; FAQ</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Statutory Tax Calculator</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Developer REST APIs</a></li>
            </ul>
          </div>

          {/* Legal & Compliance Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Legal &amp; Trust</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 dark:text-slate-300">
              <li><a href="#" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Data Processing Addendum</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">NDPR &amp; POPIA Compliance</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Security Architecture</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">Responsible AI Policy</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-[#84CC16] transition-colors">System Uptime Status</a></li>
            </ul>
          </div>
        </div>

        {/* African Focus Statement & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="w-2 h-2 rounded-full bg-[#84CC16]" />
            <span className="font-semibold text-slate-300">
              Built for African Businesses. Scaled for the World.
            </span>
          </div>

          <div className="text-center text-slate-400">
            © 2026 NextSofthr. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 dark:bg-blue-950/80 hover:bg-slate-700 dark:hover:bg-blue-900 text-slate-300 hover:text-white transition-colors cursor-pointer border border-transparent dark:border-blue-900/60"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
