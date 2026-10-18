import React from 'react';
import { GlobalHeader } from '../../../src/components/GlobalHeader';

interface NavbarProps {
  onApplyClick?: () => void;
  onPortalClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onApplyClick, onPortalClick }) => {
  return (
    <GlobalHeader
      onOpenDemo={onPortalClick}
      onOpenGetStarted={onApplyClick}
    />
  );
};
