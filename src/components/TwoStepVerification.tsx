import React, { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  Smartphone,
  Mail,
  KeyRound,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Lock,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

export interface TwoStepVerificationProps {
  phone?: string;
  email?: string;
  onVerifySuccess: (code: string) => void;
  onBack?: () => void;
  backLabel?: string;
  embedded?: boolean;
}

export const TwoStepVerification: React.FC<TwoStepVerificationProps> = ({
  phone,
  email,
  onVerifySuccess,
  onBack,
  backLabel = "Back to Sign In",
  embedded = false,
}) => {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [trustDevice, setTrustDevice] = useState<boolean>(true);
  const [method, setMethod] = useState<"sms" | "email" | "authenticator">(
    "sms",
  );
  const [resendNotice, setResendNotice] = useState<string | null>(null);
  const [showSecurityTip, setShowSecurityTip] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState<boolean>(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      return;
    }

    // Handle multi-character paste into a single box
    if (cleaned.length > 1) {
      const pasted = cleaned.slice(0, 6).split("");
      const next = [...digits];
      pasted.forEach((char, i) => {
        if (index + i < 6) {
          next[index + i] = char;
        }
      });
      setDigits(next);
      const nextFocusIndex = Math.min(5, index + pasted.length);
      inputRefs.current[nextFocusIndex]?.focus();
      setError(null);
      return;
    }

    const next = [...digits];
    next[index] = cleaned[0];
    setDigits(next);
    setError(null);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        const next = [...digits];
        next[index - 1] = "";
        setDigits(next);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pastedData) return;
    const next = ["", "", "", "", "", ""];
    pastedData.split("").forEach((char, idx) => {
      next[idx] = char;
    });
    setDigits(next);
    setError(null);
    const focusIdx = Math.min(5, pastedData.length - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleResendCode = () => {
    setDigits(["", "", "", "", "", ""]);
    setResendNotice("A new 6-digit verification code has been sent.");
    inputRefs.current[0]?.focus();
    setTimeout(() => setResendNotice(null), 4000);
  };

  const handleSwitchMethod = () => {
    setMethod((prev) =>
      prev === "sms" ? "email" : prev === "email" ? "authenticator" : "sms",
    );
    setDigits(["", "", "", "", "", ""]);
    setError(null);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < 6) {
      setError("Please enter all 6 digits of your verification code.");
      return;
    }
    setError(null);
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      onVerifySuccess(code);
    }, 600);
  };

  const isComplete = digits.every((d) => d.length === 1);
  const displayPhone = phone?.trim();
  const displayEmail = email?.trim();

  const cardContent = (
    <div className="w-full max-w-[440px] mx-auto bg-white dark:bg-[#0f1c33] rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 px-6 py-8 sm:px-9 sm:py-10 text-center transition-colors">
      {/* Top Brand Logo */}
      <div className="flex items-center justify-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-[#143a66] text-white flex items-center justify-center shadow-sm">
          <img
            src="/next-soft-logo.png"
            alt="NextSoftHr"
            className="w-6 h-6 object-contain brightness-0 invert"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <span className="text-xl font-black tracking-tight text-[#0b2545] dark:text-white flex items-center gap-1.5">
          <span>NextSoftHr</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#84cc16] inline-block" />
        </span>
      </div>

      {/* Shield Icon Circle */}
      <div className="w-14 h-14 rounded-full bg-[#e8eef5] dark:bg-slate-800 flex items-center justify-center mx-auto mt-5 mb-4">
        <ShieldCheck className="w-7 h-7 text-[#143a66] dark:text-blue-400 stroke-[2]" />
      </div>

      {/* Heading & Subtitle */}
      <h2 className="text-2xl sm:text-[26px] font-black text-[#0b2545] dark:text-white tracking-tight">
        Two-Step Verification
      </h2>
      <p className="mt-2 text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
        Protect your NextSoftHr account with an additional layer of security.
        Enter the 6-digit verification code sent to your registered device.
      </p>

      {/* Delivery Channel Pill */}
      <div className="mt-5 flex justify-start">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f1f5f9] dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200">
          {method === "sms" && (
            <Smartphone className="w-4 h-4 text-[#143a66] dark:text-blue-400 shrink-0" />
          )}
          {method === "email" && (
            <Mail className="w-4 h-4 text-[#143a66] dark:text-blue-400 shrink-0" />
          )}
          {method === "authenticator" && (
            <KeyRound className="w-4 h-4 text-[#143a66] dark:text-blue-400 shrink-0" />
          )}
          <span>
            {method === "sms" &&
              (displayPhone ? `SMS OTP: Sent to ${displayPhone}` : "SMS OTP")}
            {method === "email" &&
              (displayEmail ? `Email OTP: Sent to ${displayEmail}` : "Email OTP")}
            {method === "authenticator" &&
              "Authenticator App: Enter 6-digit TOTP code"}
          </span>
        </div>
      </div>

      {resendNotice && (
        <div className="mt-3 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>{resendNotice}</span>
        </div>
      )}

      {error && (
        <div className="mt-3 p-2 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs font-semibold text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5">
        {/* 6-Digit OTP Inputs */}
        <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              aria-label={`Verification digit ${idx + 1}`}
              className={`h-14 sm:h-16 w-full rounded-2xl border-2 text-center text-xl font-bold text-[#0b2545] dark:text-white bg-white dark:bg-[#162542] transition-all focus:outline-none ${
                digit
                  ? "border-[#143a66] dark:border-blue-400 shadow-xs"
                  : idx === 0
                    ? "border-[#143a66] dark:border-blue-400"
                    : "border-slate-200 dark:border-slate-700"
              } focus:border-[#143a66] dark:focus:border-blue-400 focus:ring-2 focus:ring-[#143a66]/15`}
            />
          ))}
        </div>

        {/* Trust this device checkbox */}
        <label className="mt-5 flex items-center gap-2.5 cursor-pointer select-none text-left">
          <input
            type="checkbox"
            checked={trustDevice}
            onChange={(e) => setTrustDevice(e.target.checked)}
            className="w-4 h-4 rounded accent-[#143a66] cursor-pointer"
          />
          <span className="text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-200">
            Trust this device for 30 days
          </span>
        </label>

        {/* Resend Code & Use another method */}
        <div className="mt-4 flex items-center justify-between text-xs sm:text-[13px] font-semibold">
          <button
            type="button"
            onClick={handleResendCode}
            className="inline-flex items-center gap-1.5 text-[#143a66] dark:text-blue-400 hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resend Code</span>
          </button>

          <button
            type="button"
            onClick={handleSwitchMethod}
            className="text-[#143a66] dark:text-blue-400 underline hover:text-[#0b2545] dark:hover:text-blue-300 cursor-pointer"
          >
            Use another method
          </button>
        </div>

        {/* Verify & Continue Button */}
        <button
          type="submit"
          disabled={verifying}
          className={`w-full mt-5 py-3.5 px-6 rounded-xl font-bold text-white text-sm sm:text-[15px] flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
            isComplete
              ? "bg-[#143a66] hover:bg-[#0b2545]"
              : "bg-[#6c8aa5] hover:bg-[#5b7892]"
          }`}
        >
          <span>{verifying ? "Verifying Code..." : "Verify & Continue"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Never share your verification code notice */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => setShowSecurityTip((prev) => !prev)}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5 text-[#143a66] dark:text-blue-400 shrink-0" />
          <span className="underline decoration-dotted underline-offset-4">
            Never share your verification code with anyone.
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {showSecurityTip && (
          <p className="mt-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            NextSoftHr support will never ask for your 6-digit SMS or
            Authenticator OTP code. Only enter this code on official NextSoftHr
            domains.
          </p>
        )}
      </div>

      {/* Bottom Divider & Back to Sign In */}
      {onBack && (
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-center">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#143a66] dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{backLabel}</span>
          </button>
        </div>
      )}
    </div>
  );

  if (embedded) {
    return cardContent;
  }

  return (
    <div className="min-h-screen w-full bg-[#f4f7fb] dark:bg-[#08101e] flex items-center justify-center p-4">
      {cardContent}
    </div>
  );
};

export default TwoStepVerification;
