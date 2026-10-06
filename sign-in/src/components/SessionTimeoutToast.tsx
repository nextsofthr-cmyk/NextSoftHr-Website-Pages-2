import React, { useState, useEffect } from 'react';
import { Clock, ShieldAlert, X, RefreshCw, CheckCircle2 } from 'lucide-react';

interface SessionTimeoutToastProps {
  /**
   * Countdown seconds left before expiration when toast appears
   * Default: 120 seconds (2 minutes warning)
   */
  warningDurationSeconds?: number;
  /**
   * Idle timeout in seconds before warning fires
   * Default: 90 seconds in demo mode (so user sees it quickly or can trigger it)
   */
  idleTimeoutSeconds?: number;
  /**
   * Callback fired when session officially expires
   */
  onSessionExpired?: () => void;
  /**
   * Callback when user refreshes / extends session
   */
  onExtendSession?: () => void;
  /**
   * Whether to enable automatic demo trigger timer
   */
  autoDemo?: boolean;
}

export const SessionTimeoutToast: React.FC<SessionTimeoutToastProps> = ({
  warningDurationSeconds = 120,
  idleTimeoutSeconds = 75,
  onSessionExpired,
  onExtendSession,
  autoDemo = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(warningDurationSeconds);
  const [isExtending, setIsExtending] = useState(false);
  const [showExtendedSuccess, setShowExtendedSuccess] = useState(false);

  // Trigger toast after idle time
  useEffect(() => {
    if (!autoDemo) return;

    const timer = setTimeout(() => {
      setSecondsRemaining(warningDurationSeconds);
      setIsOpen(true);
    }, idleTimeoutSeconds * 1000);

    return () => clearTimeout(timer);
  }, [autoDemo, idleTimeoutSeconds, warningDurationSeconds]);

  // Active countdown timer when toast is shown
  useEffect(() => {
    if (!isOpen) return;

    if (secondsRemaining <= 0) {
      setIsOpen(false);
      onSessionExpired?.();
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, secondsRemaining, onSessionExpired]);

  const handleKeepSignedIn = () => {
    setIsExtending(true);
    setTimeout(() => {
      setIsExtending(false);
      setShowExtendedSuccess(true);
      onExtendSession?.();

      setTimeout(() => {
        setShowExtendedSuccess(false);
        setIsOpen(false);
        setSecondsRemaining(warningDurationSeconds);
      }, 1400);
    }, 600);
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  // Quick helper to format mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Percentage for progress ring / bar
  const progressPercent = Math.max(0, Math.min(100, (secondsRemaining / warningDurationSeconds) * 100));

  if (!isOpen) {
    // Subtle mini-trigger button so user can test or verify session anytime
    return (
      <button
        type="button"
        onClick={() => {
          setSecondsRemaining(120);
          setIsOpen(true);
        }}
        className="fixed bottom-4 left-4 z-40 hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/90 dark:bg-[#15233e]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-[#0056b3] dark:hover:text-[#caff33] shadow-xs hover:shadow-md transition-all cursor-pointer opacity-70 hover:opacity-100"
        title="Check session security status"
      >
        <Clock className="w-3 h-3 text-[#0056b3] dark:text-[#caff33]" />
        <span>Session: Active</span>
      </button>
    );
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-5 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 fill-mode-both"
    >
      <div className="relative rounded-2xl bg-white dark:bg-[#0f1c33] border-2 border-amber-300 dark:border-amber-500/50 shadow-2xl shadow-slate-900/20 p-4 sm:p-4.5 overflow-hidden transition-all">
        {/* Top Lemon Green Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-[#84b800] to-[#caff33]" />

        {/* Progress Countdown Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-[#caff33] transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {showExtendedSuccess ? (
          <div className="flex items-center gap-3 py-1 text-emerald-600 dark:text-emerald-400 animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Session Extended Successfully!
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                You will stay safely signed in to NextSofthr.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0 pr-5">
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-[#0b1528] dark:text-white tracking-tight">
                  Your session is about to expire
                </h4>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300">
                  {formatTime(secondsRemaining)}
                </span>
              </div>

              <p className="mt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                For security reasons, your NextSofthr portal session will close due to inactivity unless you extend it.
              </p>

              {/* Action Buttons */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleKeepSignedIn}
                  disabled={isExtending}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#003366] bg-[#caff33] hover:bg-[#bbf022] active:bg-[#a6d81b] shadow-sm shadow-[#caff33]/30 transition-all cursor-pointer disabled:opacity-70"
                >
                  {isExtending ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Extending...</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5" />
                      <span>Keep me signed in</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDismiss}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>

            {/* Close / Dismiss 'X' Button */}
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionTimeoutToast;
