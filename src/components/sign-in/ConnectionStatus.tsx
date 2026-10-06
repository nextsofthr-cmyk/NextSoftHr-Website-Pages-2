import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useToast } from './ToastNotification';

interface ConnectionStatusProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  className = '',
  variant = 'auto',
}) => {
  const toast = useToast();
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [simulatedOffline, setSimulatedOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Internet connection restored. Offline changes synchronized with NextSofthr Cloud.', {
        title: 'Network Online',
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error('Network disconnected. NextSofthr has enabled local encrypted cache mode.', {
        title: 'Network Offline',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const actuallyOnline = !simulatedOffline && isOnline;

  // Toggle simulation to allow users/testers to test offline mode easily
  const toggleOfflineSimulation = () => {
    const willBeOffline = !simulatedOffline;
    setSimulatedOffline(willBeOffline);

    if (willBeOffline) {
      toast.error('Simulating disconnected network. Offline cache enabled.', {
        title: 'Offline Mode Active',
      });
    } else {
      toast.success('Reconnected to NextSofthr enterprise cloud endpoints.', {
        title: 'Cloud Connected',
      });
    }
  };

  const isDark = variant === 'dark';

  return (
    <>
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <button
          type="button"
          onClick={toggleOfflineSimulation}
          title={
            actuallyOnline
              ? 'Status: Online (Click to simulate offline mode)'
              : 'Status: Offline mode active (Click to reconnect)'
          }
          className={`group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer border select-none ${
            actuallyOnline
              ? isDark
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100/70 dark:hover:bg-emerald-950/70'
              : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700 animate-pulse'
          }`}
        >
          {actuallyOnline ? (
            <>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Wifi className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[11px] font-semibold hidden sm:inline">Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[11px] font-bold text-amber-700">Offline Mode</span>
              <span className="hidden sm:inline text-[9px] px-1 py-0.2 bg-amber-200 text-amber-900 rounded font-semibold">
                Cached
              </span>
            </>
          )}
        </button>
      </div>

      {/* Offline Alert Banner if currently disconnected */}
      {!actuallyOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white px-4 py-2 text-xs font-medium shadow-md flex items-center justify-between animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <WifiOff className="w-4 h-4 text-amber-200 shrink-0" />
            <span>
              <strong>NextSofthr Offline Mode Active:</strong> Reliable internet connectivity is temporarily unavailable. Sign-in credentials and encrypted offline cache will sync automatically once reconnected.
            </span>
          </div>
          <button
            type="button"
            onClick={toggleOfflineSimulation}
            className="ml-3 shrink-0 px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry Connection</span>
          </button>
        </div>
      )}
    </>
  );
};

export default ConnectionStatus;
