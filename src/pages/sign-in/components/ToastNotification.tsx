import React, { createContext, useContext, useState, useCallback, useId } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  success: (message: string, options?: { title?: string; duration?: number; action?: ToastItem['action'] }) => string;
  error: (message: string, options?: { title?: string; duration?: number; action?: ToastItem['action'] }) => string;
  warning: (message: string, options?: { title?: string; duration?: number; action?: ToastItem['action'] }) => string;
  info: (message: string, options?: { title?: string; duration?: number; action?: ToastItem['action'] }) => string;
  dismissToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showToast = useCallback(
    ({ type, title, message, duration = 5000, action }: Omit<ToastItem, 'id'>): string => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast: ToastItem = {
        id,
        type,
        title,
        message,
        duration,
        action,
      };

      setToasts((prev) => {
        // Keep up to 5 toasts on screen
        const updated = [...prev, newToast];
        return updated.slice(-5);
      });

      if (duration && duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }

      return id;
    },
    [dismissToast]
  );

  const success = useCallback(
    (message: string, options?: { title?: string; duration?: number; action?: ToastItem['action'] }) => {
      return showToast({
        type: 'success',
        message,
        title: options?.title,
        duration: options?.duration,
        action: options?.action,
      });
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, options?: { title?: string; duration?: number; action?: ToastItem['action'] }) => {
      return showToast({
        type: 'error',
        message,
        title: options?.title,
        duration: options?.duration ?? 6500, // Slightly longer duration for errors so users can read them
        action: options?.action,
      });
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, options?: { title?: string; duration?: number; action?: ToastItem['action'] }) => {
      return showToast({
        type: 'warning',
        message,
        title: options?.title,
        duration: options?.duration,
        action: options?.action,
      });
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, options?: { title?: string; duration?: number; action?: ToastItem['action'] }) => {
      return showToast({
        type: 'info',
        message,
        title: options?.title,
        duration: options?.duration,
        action: options?.action,
      });
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        success,
        error,
        warning,
        info,
        dismissToast,
        clearAllToasts,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Accessible Toast Container
interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 max-w-sm sm:max-w-md w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </div>
  );
};

interface ToastCardProps {
  toast: ToastItem;
  onDismiss: () => void;
}

const ToastCard: React.FC<ToastCardProps> = ({ toast, onDismiss }) => {
  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';
  const isWarning = toast.type === 'warning';

  // Lemon green palette styling for success, subtle red for error
  let containerStyles = '';
  let iconWrapperStyles = '';
  let icon = <CheckCircle2 className="w-5 h-5 text-[#003366] dark:text-[#caff33]" />;

  if (isSuccess) {
    // Lemon-green theme for success
    containerStyles =
      'bg-emerald-50/95 dark:bg-[#10241b] border-[#caff33]/60 dark:border-[#caff33]/40 text-slate-900 dark:text-slate-100 shadow-[0_10px_25px_-5px_rgba(202,255,51,0.25),0_8px_10px_-6px_rgba(0,0,0,0.1)] ring-1 ring-[#caff33]/50';
    iconWrapperStyles = 'bg-[#caff33] text-[#003366] shadow-[0_0_12px_rgba(202,255,51,0.6)]';
    icon = <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />;
  } else if (isError) {
    // Subtle red palette for error
    containerStyles =
      'bg-red-50/95 dark:bg-[#2b1418] border-red-200 dark:border-red-900/50 text-slate-900 dark:text-slate-100 shadow-[0_10px_25px_-5px_rgba(239,68,68,0.2),0_8px_10px_-6px_rgba(0,0,0,0.1)] ring-1 ring-red-300/40 dark:ring-red-900/40';
    iconWrapperStyles = 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400';
    icon = <AlertCircle className="w-4 h-4 stroke-[2.5]" />;
  } else if (isWarning) {
    containerStyles =
      'bg-amber-50/95 dark:bg-[#2c2010] border-amber-200 dark:border-amber-800/50 text-slate-900 dark:text-slate-100 shadow-lg';
    iconWrapperStyles = 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400';
    icon = <AlertTriangle className="w-4 h-4" />;
  } else {
    containerStyles =
      'bg-blue-50/95 dark:bg-[#101b33] border-blue-200 dark:border-blue-900/50 text-slate-900 dark:text-slate-100 shadow-lg';
    iconWrapperStyles = 'bg-blue-100 dark:bg-blue-900/50 text-[#0056b3] dark:text-[#60a5fa]';
    icon = <Info className="w-4 h-4" />;
  }

  return (
    <div
      role={isError ? 'alert' : 'status'}
      aria-atomic="true"
      className={`pointer-events-auto rounded-2xl border p-4 flex items-start gap-3 backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-top-3 ${containerStyles}`}
    >
      {/* Icon badge */}
      <div className={`p-1.5 rounded-xl shrink-0 mt-0.5 flex items-center justify-center ${iconWrapperStyles}`}>
        {icon}
      </div>

      {/* Message content */}
      <div className="flex-1 min-w-0 pr-1">
        {toast.title && (
          <h4 className="text-xs font-bold uppercase tracking-wider mb-0.5 text-slate-900 dark:text-white flex items-center gap-1.5">
            {toast.title}
            {isSuccess && (
              <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#caff33]/40 text-[#003366] dark:text-[#112200]">
                Success
              </span>
            )}
            {isError && (
              <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-200 dark:bg-red-900/60 text-red-800 dark:text-red-200">
                Notice
              </span>
            )}
          </h4>
        )}
        <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
          {toast.message}
        </p>

        {/* Action Button if specified */}
        {toast.action && (
          <button
            type="button"
            onClick={() => {
              toast.action?.onClick();
              onDismiss();
            }}
            className="mt-2 text-xs font-bold underline text-[#0056b3] dark:text-[#caff33] hover:opacity-80 transition-opacity"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Dismiss Button */}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
