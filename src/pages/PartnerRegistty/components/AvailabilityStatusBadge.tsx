import React from 'react';
import { AvailabilityStatus } from '../types';

interface AvailabilityStatusBadgeProps {
  status?: AvailabilityStatus | string;
  size?: 'xs' | 'sm' | 'md';
  showPulse?: boolean;
  className?: string;
}

export const getPartnerAvailability = (partner: { id: string; availabilityStatus?: string }): AvailabilityStatus => {
  if (partner.availabilityStatus) {
    if (partner.availabilityStatus === 'Currently Booked') {
      return 'Currently Booked';
    }
    return 'Accepting New Clients';
  }
  // Deterministic distribution based on partner ID: 80% accepting, 20% currently booked
  const num = parseInt(partner.id.replace(/\D/g, ''), 10) || 1;
  if (num % 5 === 0 || num % 6 === 4) {
    return 'Currently Booked';
  }
  return 'Accepting New Clients';
};

export const AvailabilityStatusBadge: React.FC<AvailabilityStatusBadgeProps> = ({
  status = 'Accepting New Clients',
  size = 'xs',
  showPulse = true,
  className = ''
}) => {
  const isBooked = status === 'Currently Booked';

  const sizeClasses = {
    xs: 'text-[10px] px-2.5 py-0.5 gap-1.5',
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-xs px-3 py-1.5 gap-2'
  }[size];

  const dotSize = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5'
  }[size];

  if (isBooked) {
    return (
      <span 
        className={`inline-flex items-center rounded-full font-bold transition-colors select-none tracking-tight ${sizeClasses} bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-2xs ${className}`}
        title="Real-Time Status: Currently fully booked on active enterprise rollouts — waitlist queue open"
      >
        <span className={`rounded-full bg-slate-400 dark:bg-slate-500 shrink-0 ${dotSize}`} />
        <span>Currently Booked</span>
      </span>
    );
  }

  return (
    <span 
      className={`inline-flex items-center rounded-full font-extrabold transition-colors select-none tracking-tight ${sizeClasses} bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 shadow-2xs ${className}`}
      title="Real-Time Status: Accepting new client implementations and payroll deployments"
    >
      <span className={`rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0 ${dotSize} ${showPulse ? 'ring-2 ring-emerald-500/40 animate-pulse' : ''}`} />
      <span>Accepting New Clients</span>
    </span>
  );
};
