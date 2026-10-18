import React from 'react';
import { GlobalHeader } from '../../../../src/components/GlobalHeader';
import { NavigationPage } from '../../types';

interface NavbarProps {
  currentPage?: NavigationPage;
  onNavigate?: (page: NavigationPage) => void;
  onOpenLeadModal?: (service?: string) => void;
  onOpenPortals?: (portal?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLeadModal,
  onOpenPortals
}) => {
  return (
    <GlobalHeader
      onOpenDemo={() => onOpenPortals?.()}
      onOpenGetStarted={() => onOpenLeadModal?.('Outsourcing Consultation')}
    />
  );
};
