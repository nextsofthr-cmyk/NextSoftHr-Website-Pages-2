import React from 'react';
import { LegalModalType } from './LegalModal';
import { Translations } from '../data/translations';
import { DeviceInfo } from '../hooks/useDeviceIdentifier';
import { Link } from 'react-router-dom';
import { ShieldCheck, Laptop, Globe, Clock, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  t: Translations;
  onOpenLegal: (type: LegalModalType) => void;
  deviceInfo?: DeviceInfo;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  t,
  onOpenLegal,
  deviceInfo,
  className = '',
}) => {
  return (
    <footer className={`py-4 text-xs text-slate-500 dark:text-slate-400 space-y-3.5 ${className}`}>
      {/* 'Recently Accessed From' Security Transparency Section */}
      {deviceInfo && (
        <div className="w-full mx-auto max-w-4xl p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-slate-100/80 dark:bg-[#111e36] border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] transition-colors shadow-2xs">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
              <ShieldCheck className="w-4 h-4 text-[#0056b3] dark:text-[#caff33]" />
              <span>Recently Accessed From:</span>
            </span>

            {/* Browser and Device Tag */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-semibold bg-white dark:bg-[#1a2d50] text-[#0056b3] dark:text-[#caff33] border border-slate-200 dark:border-white/10 shadow-2xs">
              <Laptop className="w-3.5 h-3.5 shrink-0" />
              <span>{deviceInfo.deviceLabel}</span>
            </span>

            {/* Approximate Location / Network */}
            <span className="hidden md:inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Globe className="w-3 h-3 text-slate-400" />
              <span>{deviceInfo.approxLocation}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{deviceInfo.timestamp}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200/60 dark:border-emerald-900/60">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>Current Session</span>
            </span>
          </div>
        </div>
      )}

      {/* Main Copyright and Legal Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <span>© 2026 NextSoftHr. {t.allRightsReserved} Trademark of NextSoft-Group</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
          <Link
            to="/privacy-policy"
            className="hover:text-[#0056b3] dark:hover:text-[#caff33] transition-colors cursor-pointer"
          >
            {t.privacy}
          </Link>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <Link
            to="/terms-conditions"
            className="hover:text-[#0056b3] dark:hover:text-[#caff33] transition-colors cursor-pointer"
          >
            {t.terms}
          </Link>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <button
            type="button"
            onClick={() => onOpenLegal('security')}
            className="hover:text-[#0056b3] dark:hover:text-[#caff33] transition-colors cursor-pointer"
          >
            {t.security}
          </button>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <button
            type="button"
            onClick={() => onOpenLegal('help')}
            className="hover:text-[#0056b3] dark:hover:text-[#caff33] transition-colors cursor-pointer"
          >
            {t.helpCenter}
          </button>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <button
            type="button"
            onClick={() => onOpenLegal('contact')}
            className="hover:text-[#0056b3] dark:hover:text-[#caff33] transition-colors cursor-pointer"
          >
            {t.contactSupport}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
