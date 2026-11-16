import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalHeader } from "../../components/GlobalHeader";
import { GlobalFooter } from "../../components/GlobalFooter";
import { TwoStepVerification } from "../../components/TwoStepVerification";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

export const AuthenticationPage: React.FC = () => {
  const navigate = useNavigate();
  const [verifiedCode, setVerifiedCode] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fb] dark:bg-[#08101e] transition-colors duration-200">
      <GlobalHeader />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {verifiedCode ? (
          <div className="w-full max-w-[440px] mx-auto bg-white dark:bg-[#0f1c33] rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 px-6 py-10 sm:px-9 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-lime-100 dark:bg-lime-950/70 text-[#65a30d] dark:text-[#a3e635] flex items-center justify-center mx-auto mb-4 ring-8 ring-lime-50 dark:ring-lime-950/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-black text-[#0b2545] dark:text-white tracking-tight">
              Verification Successful!
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Your two-step verification code (
              <span className="font-mono font-bold text-[#143a66] dark:text-blue-400">
                {verifiedCode}
              </span>
              ) has been confirmed and this device is now trusted for 30 days.
            </p>

            <div className="mt-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>256-Bit Encrypted Enterprise Session Active</span>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-[#143a66] hover:bg-[#0b2545] text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>Continue to Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setVerifiedCode(null)}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs transition-colors cursor-pointer"
              >
                Test Verification Again
              </button>
            </div>
          </div>
        ) : (
          <TwoStepVerification
            embedded
            onVerifySuccess={(code) => setVerifiedCode(code)}
            onBack={() => navigate("/sign-in")}
            backLabel="Back to Sign In"
          />
        )}
      </main>

      <GlobalFooter />
    </div>
  );
};

export default AuthenticationPage;
