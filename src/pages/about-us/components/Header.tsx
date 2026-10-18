import React from 'react';
import { GlobalHeader } from '../../../components/GlobalHeader';

interface HeaderProps {
  onOpenDemo?: () => void;
  onOpenContact?: () => void;
  onOpenGetStarted?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDemo,
  onOpenContact,
  onOpenGetStarted,
}) => {
  return (
    <GlobalHeader
      onOpenDemo={onOpenDemo || onOpenContact}
      onOpenGetStarted={onOpenGetStarted}
    />
  );
};
