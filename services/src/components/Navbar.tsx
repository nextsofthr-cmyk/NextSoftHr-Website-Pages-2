import React from 'react';
import { GlobalHeader } from '../../../src/components/GlobalHeader';

interface NavbarProps {
  onOpenDemo?: () => void;
  onOpenGetStarted?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, onOpenGetStarted }) => {
  return (
    <GlobalHeader
      onOpenDemo={onOpenDemo}
      onOpenGetStarted={onOpenGetStarted}
    />
  );
};
