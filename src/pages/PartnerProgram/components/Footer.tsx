import React from 'react';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  ArrowUp,
  Linkedin, 
  Twitter, 
  Facebook, 
  Youtube 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onApplyClick: () => void;
  onPortalClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onApplyClick, onPortalClick }) => {
  const { strings } = useLanguage();
  const f = strings.footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#030914] text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-blue-900/80 pt-16 pb-12 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-blue-900/60">
          
          {/* Brand Col (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0E356A] to-[#071D3E] border border-[#B8F010] flex items-center justify-center shadow-lg">
                <span className="font-black text-[#B8F010] text-lg tracking-wider">NS</span>
              </div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Next<span className="text-blue-600 dark:text-[#B8F010]">Soft</span>hr
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              {f.tagline}
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <a 
                href="https://www.nextsofthr.org" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-[#B8F010] transition-colors"
              >
                <Globe className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
                <span>www.nextsofthr.org</span>
              </a>

              <a 
                href="tel:+2349158482622" 
                className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-[#B8F010] transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
                <span>+234 915 848 2622</span>
              </a>

              <a 
                href="mailto:partners@nextsofthr.org" 
                className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-[#B8F010] transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
                <span>partners@nextsofthr.org</span>
              </a>

              <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
                <span>{f.lagosHub} • {f.nairobiHub} • {f.abidjanHub} • {f.londonHub}</span>
              </div>
            </div>
          </div>

          {/* Partner Quick Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-900 dark:text-white tracking-wider">
              {f.programTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#categories" className="hover:text-blue-600 dark:hover:text-[#B8F010] transition-colors">
                  {strings.categories.tag}
                </a>
              </li>
              <li>
                <a href="#commission" className="hover:text-blue-600 dark:hover:text-[#B8F010] transition-colors">
                  {strings.commission.tag}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-[#B8F010] transition-colors">
                  {strings.how.tag}
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-blue-600 dark:hover:text-[#B8F010] transition-colors">
                  {strings.benefits.tag}
                </a>
              </li>
              <li>
                <a href="#network" className="hover:text-blue-600 dark:hover:text-[#B8F010] transition-colors">
                  {strings.network.tag}
                </a>
              </li>
              <li>
                <button onClick={onPortalClick} className="text-left text-blue-700 dark:text-[#B8F010] hover:underline font-bold">
                  {strings.nav.portal} &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* NextSofthr Product Platform (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-900 dark:text-white tracking-wider">
              {f.productTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#ecosystem" className="hover:text-blue-600 dark:hover:text-white">Core HR & People Management</a></li>
              <li><a href="#ecosystem" className="hover:text-blue-600 dark:hover:text-white">African & Global Multi-Currency Payroll</a></li>
              <li><a href="#ecosystem" className="hover:text-blue-600 dark:hover:text-white">Time, Attendance & Geofenced Shifts</a></li>
              <li><a href="#ecosystem" className="hover:text-blue-600 dark:hover:text-white">Leave & Holiday Administration</a></li>
              <li><a href="#ecosystem" className="hover:text-blue-600 dark:hover:text-white">Talent Acquisition & Recruitment</a></li>
              <li><a href="#ecosystem" className="hover:text-blue-600 dark:hover:text-white">Performance Management & OKRs</a></li>
              <li><a href="#ai-platform" className="text-blue-700 dark:text-[#B8F010] hover:underline font-semibold">AI HR & Payroll Intelligence Assistant</a></li>
            </ul>
          </div>

          {/* Social & Application (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-bold text-slate-900 dark:text-white tracking-wider">
              Connect With Us
            </h4>

            <div className="flex items-center gap-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-[#071D3E] border border-slate-300 dark:border-blue-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-[#B8F010] hover:border-blue-500 dark:hover:border-[#B8F010] transition-colors shadow-xs"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-[#071D3E] border border-slate-300 dark:border-blue-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-[#B8F010] hover:border-blue-500 dark:hover:border-[#B8F010] transition-colors shadow-xs"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-[#071D3E] border border-slate-300 dark:border-blue-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-[#B8F010] hover:border-blue-500 dark:hover:border-[#B8F010] transition-colors shadow-xs"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-[#071D3E] border border-slate-300 dark:border-blue-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-[#B8F010] hover:border-blue-500 dark:hover:border-[#B8F010] transition-colors shadow-xs"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={onApplyClick}
                className="w-full py-2.5 px-3 rounded-xl bg-[#B8F010] text-[#040E1F] text-xs font-black hover:bg-[#CBFF1A] transition-all shadow"
              >
                {strings.nav.applyNow}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span>&copy; 2026 NextSofthr. {f.allRights}</span>
            <span className="hidden sm:inline">•</span>
            <span>{f.panAfricanNotice}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-[#B8F010] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
