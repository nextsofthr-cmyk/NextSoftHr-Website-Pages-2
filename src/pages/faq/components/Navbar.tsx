import React from 'react';
import { GlobalHeader } from '../../../components/GlobalHeader';

interface NavbarProps {
  onOpenDemo?: () => void;
  onOpenSupport?: () => void;
  onOpenAI?: () => void;
  onOpenPricing?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDemo,
  onOpenSupport,
}) => {
  return (
    <GlobalHeader
      onOpenDemo={onOpenDemo}
      onOpenGetStarted={onOpenSupport}
    />
  );
};
