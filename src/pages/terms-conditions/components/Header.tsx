import React from 'react';
import { GlobalHeader } from '../../../components/GlobalHeader';

interface HeaderProps {
  onContactClick?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  return (
    <GlobalHeader
      onOpenDemo={onContactClick}
      onOpenGetStarted={onContactClick}
    />
  );
};
