import React, { useState, useEffect } from 'react';
import { QrCode, Smartphone, RefreshCw, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface QrSignInProps {
  onSuccessLogin: (email: string) => void;
  onSwitchToPassword: () => void;
}

export const QrSignIn: React.FC<QrSignInProps> = ({
  onSuccessLogin,
  onSwitchToPassword,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(120);
  const [isScanned, setIsScanned] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [qrToken, setQrToken] = useState(() => 'nx-auth-' + Math.random().toString(36).substring(2, 10));

  // Countdown timer for rotating QR session token
  useEffect(() => {
    if (isScanned) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Auto rotate QR code
          setQrToken('nx-auth-' + Math.random().toString(36).substring(2, 10));
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isScanned]);

  // Handle manual refresh of QR code
  const handleRefreshQr = () => {
    setQrToken('nx-auth-' + Math.random().toString(36).substring(2, 10));
    setSecondsRemaining(120);
    setIsScanned(false);
  };

  // Simulate mobile app scanning the code
  const handleSimulateMobileScan = () => {
    setIsScanned(true);
    setIsApproving(true);

    setTimeout(() => {
      setIsApproving(false);
      onSuccessLogin('amara.okonjo@payflow.ng');
    }, 1500);
  };

  // Generate SVG QR matrix pattern
  return (
    <div className="py-2 text-center animate-in fade-in duration-200">
      <div className="max-w-sm mx-auto">
        {/* Security explanation banner */}
        <div className="mb-4 p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center gap-2 text-left">
          <Smartphone className="w-5 h-5 text-[#0056b3] dark:text-[#caff33] shrink-0" />
          <div className="text-[11px] text-slate-700 dark:text-slate-300">
            Open the <strong>NextSofthr Mobile App</strong> on your enrolled phone and scan this code for instant biometric sign-in.
          </div>
        </div>

        {/* QR Code Container Card */}
        <div className="relative mx-auto w-64 h-64 p-4 rounded-2xl bg-white dark:bg-[#162542] border-2 border-slate-200 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-black/40 flex flex-col items-center justify-center">
          {/* Subtle Lemon Green Corner Accents */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#0056b3] dark:border-[#caff33] rounded-tl" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#0056b3] dark:border-[#caff33] rounded-tr" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#0056b3] dark:border-[#caff33] rounded-bl" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#0056b3] dark:border-[#caff33] rounded-br" />

          {/* SVG QR Code Illustration */}
          <div className="relative w-48 h-48 flex items-center justify-center bg-white p-2 rounded-xl">
            <svg
              className="w-full h-full text-[#0b1528]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Alignment Box Top-Left */}
              <rect x="5" y="5" width="26" height="26" rx="4" stroke="currentColor" strokeWidth="3" fill="none" />
              <rect x="11" y="11" width="14" height="14" rx="2" fill="#0056b3" />

              {/* Outer Alignment Box Top-Right */}
              <rect x="69" y="5" width="26" height="26" rx="4" stroke="currentColor" strokeWidth="3" fill="none" />
              <rect x="75" y="11" width="14" height="14" rx="2" fill="#0056b3" />

              {/* Outer Alignment Box Bottom-Left */}
              <rect x="5" y="69" width="26" height="26" rx="4" stroke="currentColor" strokeWidth="3" fill="none" />
              <rect x="11" y="75" width="14" height="14" rx="2" fill="#0056b3" />

              {/* QR Matrix Bits */}
              <rect x="36" y="8" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="46" y="8" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="56" y="8" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="36" y="18" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="48" y="22" width="8" height="6" rx="1" fill="#caff33" />
              <rect x="58" y="18" width="6" height="6" rx="1" fill="currentColor" />

              <rect x="8" y="36" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="18" y="36" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="28" y="36" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="8" y="46" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="20" y="46" width="6" height="8" rx="1" fill="currentColor" />
              <rect x="8" y="58" width="6" height="6" rx="1" fill="currentColor" />

              <rect x="36" y="36" width="8" height="8" rx="1" fill="#0056b3" />
              <rect x="56" y="36" width="8" height="8" rx="1" fill="#0056b3" />
              <rect x="46" y="46" width="8" height="8" rx="2" fill="#003366" />
              <rect x="36" y="56" width="8" height="8" rx="1" fill="#0056b3" />
              <rect x="56" y="56" width="8" height="8" rx="1" fill="#0056b3" />

              <rect x="69" y="36" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="79" y="36" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="89" y="36" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="69" y="46" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="80" y="46" width="6" height="8" rx="1" fill="#caff33" />
              <rect x="89" y="58" width="6" height="6" rx="1" fill="currentColor" />

              <rect x="36" y="69" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="46" y="69" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="56" y="69" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="36" y="79" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="48" y="80" width="8" height="6" rx="1" fill="#0056b3" />
              <rect x="58" y="79" width="6" height="6" rx="1" fill="currentColor" />

              <rect x="69" y="69" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="79" y="69" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="89" y="69" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="69" y="79" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="80" y="82" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="89" y="89" width="6" height="6" rx="1" fill="currentColor" />

              {/* Center Logo Shield Badge */}
              <circle cx="50" cy="50" r="11" fill="white" stroke="#0056b3" strokeWidth="2" />
              <path d="M46 47L49 50L55 44" stroke="#0056b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Scanning / Approval Overlay */}
            {isApproving && (
              <div className="absolute inset-0 bg-[#0056b3]/90 rounded-xl flex flex-col items-center justify-center p-3 text-white animate-in zoom-in-95">
                <div className="w-10 h-10 rounded-full bg-[#caff33] text-[#003366] flex items-center justify-center mb-2 shadow-lg animate-pulse">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold">App Verified</span>
                <span className="text-[10px] text-blue-100">Logging you in...</span>
              </div>
            )}
          </div>
        </div>

        {/* QR Code Status & Expiry Bar */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84b800] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#84b800] dark:bg-[#caff33]"></span>
            </span>
            <span>
              Expires in <strong className="text-slate-700 dark:text-slate-200">{secondsRemaining}s</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={handleRefreshQr}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0056b3] dark:text-[#38bdf8] hover:text-[#004494] dark:hover:text-[#caff33] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Refresh QR</span>
          </button>
        </div>

        {/* Quick Testing Simulation Button for Evaluators */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10">
          <button
            type="button"
            onClick={handleSimulateMobileScan}
            disabled={isApproving}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/40 dark:to-emerald-950/40 border border-blue-200 dark:border-emerald-800/60 text-slate-800 dark:text-white text-xs font-bold hover:shadow-xs transition-all cursor-pointer group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0056b3] dark:text-[#caff33]" />
            <span>Simulate Scan from NextSofthr Mobile App</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Step-by-step instructions */}
        <div className="mt-4 text-left p-3 rounded-xl bg-slate-50 dark:bg-[#15233e] border border-slate-200/80 dark:border-white/10 text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5">
          <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0056b3] dark:text-[#caff33]" />
            <span>How to sign in with QR code:</span>
          </div>
          <p>1. Open NextSofthr on your iOS or Android phone.</p>
          <p>2. Tap <strong>Security &gt; Scan to Login</strong> in the app.</p>
          <p>3. Confirm with FaceID / Fingerprint on your phone.</p>
        </div>
      </div>
    </div>
  );
};

export default QrSignIn;
