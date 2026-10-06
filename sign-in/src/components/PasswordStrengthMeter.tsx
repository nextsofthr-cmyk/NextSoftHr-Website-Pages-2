import React from 'react';
import { Check, ShieldAlert } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
  showDetails?: boolean;
}

export type StrengthTier = 'low' | 'medium' | 'high';

export interface PasswordScore {
  score: number; // 1 to 3 tier score (or 0 if empty)
  tier: StrengthTier;
  label: 'Low' | 'Medium' | 'High' | 'Too Short';
  colorClass: string;
  badgeBg: string;
  barColor: string;
  checks: {
    length: boolean;
    hasNumber: boolean;
    hasLetter: boolean;
    hasSpecial: boolean;
  };
}

export function calculatePasswordStrength(pass: string): PasswordScore {
  if (!pass) {
    return {
      score: 0,
      tier: 'low',
      label: 'Too Short',
      colorClass: 'text-slate-400',
      badgeBg: 'bg-slate-100 dark:bg-slate-800 text-slate-500',
      barColor: 'bg-slate-200 dark:bg-slate-700',
      checks: { length: false, hasNumber: false, hasLetter: false, hasSpecial: false },
    };
  }

  const checks = {
    length: pass.length >= 8,
    hasNumber: /\d/.test(pass),
    hasLetter: /[a-zA-Z]/.test(pass),
    hasSpecial: /[^A-Za-z0-9]/.test(pass),
  };

  let passed = 0;
  if (checks.length) passed++;
  if (checks.hasNumber) passed++;
  if (checks.hasLetter) passed++;
  if (checks.hasSpecial) passed++;

  // Map directly into Low, Medium, High tiers
  if (pass.length < 8 || passed <= 1) {
    return {
      score: 1,
      tier: 'low',
      label: 'Low',
      colorClass: 'text-rose-600 dark:text-rose-400',
      badgeBg: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900',
      barColor: 'from-rose-500 to-amber-400',
      checks,
    };
  }

  if (passed === 2 || passed === 3) {
    return {
      score: 2,
      tier: 'medium',
      label: 'Medium',
      colorClass: 'text-amber-600 dark:text-amber-400',
      badgeBg: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900',
      barColor: 'from-amber-400 to-[#caff33]',
      checks,
    };
  }

  return {
    score: 3,
    tier: 'high',
    label: 'High',
    colorClass: 'text-[#0056b3] dark:text-[#caff33]',
    badgeBg: 'bg-[#caff33]/20 dark:bg-[#caff33]/15 text-[#003366] dark:text-[#caff33] border-[#caff33]/50',
    barColor: 'from-[#0056b3] via-[#7aa800] to-[#caff33]',
    checks,
  };
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  showDetails = false,
}) => {
  if (!password) return null;

  const strength = calculatePasswordStrength(password);
  const segments = [1, 2, 3]; // 3 segments corresponding to Low, Medium, High

  // Dynamic styling for Low, Medium, High
  const getSegmentStyle = (segment: number) => {
    if (segment > strength.score) {
      return 'bg-slate-200 dark:bg-slate-800 opacity-50';
    }
    switch (strength.tier) {
      case 'low':
        return 'bg-gradient-to-r from-rose-500 to-amber-500 shadow-[0_0_8px_rgba(244,63,94,0.35)]';
      case 'medium':
        return 'bg-gradient-to-r from-[#0056b3] via-[#4d8600] to-[#a3db10] shadow-[0_0_8px_rgba(202,255,51,0.4)]';
      case 'high':
      default:
        return 'bg-gradient-to-r from-[#0056b3] via-[#7aa800] to-[#caff33] shadow-[0_0_12px_rgba(202,255,51,0.65)]';
    }
  };

  return (
    <div className="mt-2 space-y-1.5 animate-in fade-in duration-150">
      {/* 3-Tier Segmented Progress Bar: Low, Medium, High */}
      <div
        className="flex items-center gap-1.5 w-full"
        role="progressbar"
        aria-valuenow={strength.score}
        aria-valuemin={0}
        aria-valuemax={3}
        aria-valuetext={`Password strength: ${strength.label}`}
      >
        {segments.map((segment) => {
          return (
            <div
              key={segment}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${getSegmentStyle(segment)}`}
            />
          );
        })}
      </div>

      {/* Label & Score text with clear Low / Medium / High badge */}
      <div className="flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
          <span>Password Security:</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border transition-all ${strength.badgeBg}`}
          >
            {strength.label}
          </span>
          {strength.tier === 'high' && (
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#caff33] text-[#003366]">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          )}
        </div>
      </div>

      {/* Detailed checklist */}
      {showDetails && (
        <div className="pt-1 grid grid-cols-2 gap-1 text-[10px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                strength.checks.length
                  ? 'bg-[#84b800] dark:bg-[#caff33]'
                  : 'bg-slate-300 dark:bg-slate-600'
              }`}
            />
            <span>8+ characters</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                strength.checks.hasLetter
                  ? 'bg-[#84b800] dark:bg-[#caff33]'
                  : 'bg-slate-300 dark:bg-slate-600'
              }`}
            />
            <span>Letters</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                strength.checks.hasNumber
                  ? 'bg-[#84b800] dark:bg-[#caff33]'
                  : 'bg-slate-300 dark:bg-slate-600'
              }`}
            />
            <span>Numbers</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                strength.checks.hasSpecial
                  ? 'bg-[#84b800] dark:bg-[#caff33]'
                  : 'bg-slate-300 dark:bg-slate-600'
              }`}
            />
            <span>Special character</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
