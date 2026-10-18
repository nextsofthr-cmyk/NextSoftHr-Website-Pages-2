import React from 'react';
import { GlobalHeader } from '../../../components/GlobalHeader';

interface NavbarProps {
  onOpenDemo?: () => void;
  onOpenGetStarted?: () => void;
  onOpenExpert?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenDemo, 
  onOpenGetStarted, 
  onOpenExpert 
}) => {
  return (
    <GlobalHeader
      onOpenDemo={onOpenDemo}
      onOpenGetStarted={onOpenGetStarted}
      onOpenExpert={onOpenExpert}
    />
  );
};
