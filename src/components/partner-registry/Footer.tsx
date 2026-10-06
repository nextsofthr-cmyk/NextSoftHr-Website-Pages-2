import React from 'react';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  Heart
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onSelectCountry?: (country: string) => void;
  onOpenPartnerPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCountry, onOpenPartnerPortal }) => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#040e22] text-white border-t border-blue-950 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-blue-900/60">
          
          {/* Col 1: Brand & Contact Info (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0c2b64] border border-[#c8f526] flex items-center justify-center shadow-md">
                <span className="text-white font-black text-xl tracking-tighter">N</span>
                <span className="text-[#c8f526] font-black text-xl tracking-tighter">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">
                  Next<span className="text-[#c8f526]">Softhr</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5">
                  Global Partner Registry
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {t('footer.description', undefined, 'NextSofthr is an all-in-one HR, Payroll and Business Management Platform designed for micro, small, medium-sized and large businesses across Africa and worldwide.')}
            </p>

            {/* Direct Contact Details */}
            <div className="space-y-2 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c8f526] shrink-0" />
                <a href="tel:+2349158482622" className="hover:text-white font-semibold">
                  +234 915 848 2622
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#c8f526] shrink-0" />
                <a 
                  href="https://www.nextsofthr.org" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white font-semibold flex items-center gap-1"
                >
                  <span>www.nextsofthr.org</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c8f526] shrink-0" />
                <a href="mailto:partners@nextsofthr.org" className="hover:text-white font-semibold">
                  partners@nextsofthr.org
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#c8f526] shrink-0" />
                <span>Pan-African Headquarters • Lagos, Nairobi, London</span>
              </div>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c8f526]">
              {t('footer.solutions', undefined, 'Platform Solutions')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#directory" className="hover:text-white transition-colors">Core HR & Employee Portal</a></li>
              <li><a href="#directory" className="hover:text-white transition-colors">Multi-Jurisdiction Payroll</a></li>
              <li><a href="#directory" className="hover:text-white transition-colors">Biometric Time & Attendance</a></li>
              <li><a href="#directory" className="hover:text-white transition-colors">Shift Roster & Scheduling</a></li>
              <li><a href="#directory" className="hover:text-white transition-colors">Recruitment & Applicant Tracking</a></li>
              <li><a href="#directory" className="hover:text-white transition-colors">Performance & Appraisal Loops</a></li>
              <li><a href="#directory" className="hover:text-white transition-colors">Multi-Company / Multi-Branch</a></li>
              <li><a href="#directory" className="hover:text-white transition-colors">AI HR & Payroll Assistant</a></li>
            </ul>
          </div>

          {/* Col 3: Partner Network */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c8f526]">
              {t('footer.network', undefined, 'Partner Network')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#directory" className="hover:text-white transition-colors">Partner Directory</a></li>
              <li><a href="#global-map" className="hover:text-white transition-colors">Global Partner Map</a></li>
              <li><a href="#partner-levels" className="hover:text-white transition-colors">Partner Advancement Levels</a></li>
              <li><a href="#partner-benefits" className="hover:text-white transition-colors">Partner Benefits & Commissions</a></li>
              <li><a href="#referrals" className="hover:text-white transition-colors text-[#c8f526] font-semibold flex items-center gap-1.5">
                <span>Partner Referral & Rewards</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8f526]"></span>
              </a></li>
              <li><a href="#registration" className="hover:text-white transition-colors">Partner Application Form</a></li>
              <li>
                <button
                  onClick={onOpenPartnerPortal}
                  className="text-left text-[#c8f526] hover:underline font-semibold"
                >
                  Partner Portal Login
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const btn = document.getElementById('floating-live-chat-btn');
                    if (btn) btn.click();
                  }}
                  className="text-left hover:text-[#c8f526] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Live Support Desk</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Regional Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c8f526]">
              {t('footer.hubs', undefined, 'Regional Hubs')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#directory" onClick={() => onSelectCountry?.('Nigeria')} className="hover:text-white transition-colors">🇳🇬 Nigeria Partners</a></li>
              <li><a href="#directory" onClick={() => onSelectCountry?.('Kenya')} className="hover:text-white transition-colors">🇰🇪 Kenya Partners</a></li>
              <li><a href="#directory" onClick={() => onSelectCountry?.('Ghana')} className="hover:text-white transition-colors">🇬🇭 Ghana Partners</a></li>
              <li><a href="#directory" onClick={() => onSelectCountry?.('South Africa')} className="hover:text-white transition-colors">🇿🇦 South Africa Partners</a></li>
              <li><a href="#directory" onClick={() => onSelectCountry?.('Rwanda')} className="hover:text-white transition-colors">🇷🇼 Rwanda Partners</a></li>
              <li><a href="#directory" onClick={() => onSelectCountry?.('Egypt')} className="hover:text-white transition-colors">🇪🇬 Egypt Partners</a></li>
              <li><a href="#directory" onClick={() => onSelectCountry?.('United Kingdom')} className="hover:text-white transition-colors">🇬🇧 United Kingdom Partners</a></li>
              <li><a href="#directory" onClick={() => onSelectCountry?.('United States')} className="hover:text-white transition-colors">🇺🇸 United States Partners</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Tagline, & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} NextSofthr. {t('footer.rights', undefined, 'All rights reserved.')}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-slate-400 font-medium">Built in Africa. Connected to the World.</span>
          </div>

          <div className="flex items-center gap-5 text-slate-400">
            <a href="#privacy" className="hover:text-white transition-colors">{t('footer.privacy', undefined, 'Privacy Policy')}</a>
            <a href="#terms" className="hover:text-white transition-colors">{t('footer.terms', undefined, 'Terms of Service')}</a>
            <a href="#security" className="hover:text-white transition-colors">{t('footer.security', undefined, 'Security & Compliance')}</a>
            <a href="#cookies" className="hover:text-white transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
