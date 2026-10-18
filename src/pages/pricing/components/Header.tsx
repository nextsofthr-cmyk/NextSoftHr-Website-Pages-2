import React from 'react';
import { GlobalHeader } from '../../../components/GlobalHeader';
import { CurrencyCode } from '../types';

interface HeaderProps {
  onOpenTrial?: (planName?: string) => void;
  onOpenDemo?: () => void;
  selectedCurrency?: CurrencyCode;
  onSelectCurrency?: (currency: CurrencyCode) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTrial,
  onOpenDemo,
}) => {
  return (
    <GlobalHeader
      onOpenDemo={onOpenDemo}
      onOpenGetStarted={() => onOpenTrial?.()}
    />
  );
};
