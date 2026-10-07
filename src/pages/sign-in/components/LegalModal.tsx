import React from 'react';
import { X, Shield, FileText, HelpCircle, PhoneCall, Lock } from 'lucide-react';
import NextSofthrLogo from './NextSofthrLogo';

export type LegalModalType = 'privacy' | 'terms' | 'security' | 'help' | 'contact' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap: Record<
    Exclude<LegalModalType, null>,
    { title: string; icon: React.ReactNode; body: React.ReactNode }
  > = {
    privacy: {
      title: 'Privacy Policy',
      icon: <Lock className="w-5 h-5 text-[#0056b3]" />,
      body: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <p>
            At NextSofthr (www.nextsofthr.org), safeguarding the privacy and confidential personnel data of African and international businesses is central to our operational principles.
          </p>
          <h5 className="font-bold text-slate-800 text-sm">Data Collection &amp; Use</h5>
          <p>
            We process business identification, payroll parameters, tax compliance metadata, and workforce records strictly to deliver accurate payroll calculations, statutory remittance reports, and employee self-service capabilities.
          </p>
          <h5 className="font-bold text-slate-800 text-sm">Regional Data Sovereignty</h5>
          <p>
            Customer data is stored and processed with strict adherence to regional African data protection frameworks (such as Nigeria NDPR, Kenya Data Protection Act, South Africa POPIA, Ghana DPA) as well as global standards (GDPR).
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms of Service',
      icon: <FileText className="w-5 h-5 text-[#0056b3]" />,
      body: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <p>
            Welcome to NextSofthr. By accessing or using the NextSofthr platform, you agree to comply with our enterprise terms of service.
          </p>
          <h5 className="font-bold text-slate-800 text-sm">Authorized Business Use</h5>
          <p>
            Accounts must be created by authorized company representatives. Workspaces are protected under role-based access control (RBAC), and administrators are responsible for designating appropriate access tiers for payroll and HR staff.
          </p>
          <h5 className="font-bold text-slate-800 text-sm">Service Availability &amp; SLAs</h5>
          <p>
            NextSofthr maintains a targeted 99.98% service uptime across African and global regions, backed by redundant cloud infrastructure.
          </p>
        </div>
      ),
    },
    security: {
      title: 'Enterprise Security Architecture',
      icon: <Shield className="w-5 h-5 text-[#0056b3]" />,
      body: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <p>
            NextSofthr incorporates defense-in-depth security engineered for multi-jurisdiction African payroll and HR operations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-800 text-xs">256-Bit TLS &amp; AES Encryption</div>
              <p className="text-[11px] text-slate-500 mt-1">Data encrypted in transit and at rest with hardware security modules.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-800 text-xs">Role-Based Access (RBAC)</div>
              <p className="text-[11px] text-slate-500 mt-1">Granular separation between payroll executors, HR leads, and line managers.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-800 text-xs">Multi-Factor Authentication (MFA)</div>
              <p className="text-[11px] text-slate-500 mt-1">Enforced 2FA with biometric passkeys, authenticator apps, and SMS OTPs.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-800 text-xs">Continuous Audit Logging</div>
              <p className="text-[11px] text-slate-500 mt-1">Tamper-evident logs of all payroll runs, salary updates, and employee profile modifications.</p>
            </div>
          </div>
        </div>
      ),
    },
    help: {
      title: 'NextSofthr Help Center',
      icon: <HelpCircle className="w-5 h-5 text-[#0056b3]" />,
      body: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <p>
            Need assistance with signing into your NextSofthr workspace or configuring company accounts?
          </p>
          <div className="space-y-2 pt-1">
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
              <span className="font-semibold text-slate-800">Signing In with SSO:</span>
              <p className="text-[11px] text-slate-500 mt-0.5">If your organization uses Google Workspace or Microsoft Azure AD, select "Continue with Google" or "Continue with Microsoft".</p>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
              <span className="font-semibold text-slate-800">Password Reset:</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Click "Forgot password?" on the login page to receive a secure 30-minute one-time recovery token.</p>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
              <span className="font-semibold text-slate-800">Multi-country Payroll Questions:</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Explore our statutory guides for PAYE, NHF, NSSF, NHIF, UIF, and SSNIT compliance.</p>
            </div>
          </div>
        </div>
      ),
    },
    contact: {
      title: 'Contact NextSofthr Support',
      icon: <PhoneCall className="w-5 h-5 text-[#0056b3]" />,
      body: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <p>
            Our dedicated enterprise customer support teams operate across West Africa, East Africa, Southern Africa, and international timezones.
          </p>
          <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-slate-700 space-y-1.5">
            <div><strong>Enterprise Desk:</strong> support@nextsofthr.org</div>
            <div><strong>Web:</strong> www.nextsofthr.org</div>
            <div><strong>Live Support:</strong> 24/7 dedicated support for active workspaces</div>
          </div>
        </div>
      ),
    },
  };

  const current = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0f1c33] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 p-6 overflow-hidden max-h-[85vh] flex flex-col transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60">
              {current.icon}
            </div>
            <h3 className="text-base font-bold text-[#0b1528] dark:text-white">{current.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 overflow-y-auto pr-1 text-slate-600 dark:text-slate-300">
          {current.body}
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
          <NextSofthrLogo size="sm" showTagline={false} />
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0056b3] hover:bg-[#004494] rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default LegalModal;
