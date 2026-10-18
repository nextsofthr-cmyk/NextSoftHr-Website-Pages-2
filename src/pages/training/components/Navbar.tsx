import React from 'react';
import { GlobalHeader } from '../../../components/GlobalHeader';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  onOpenPortal?: () => void;
  onOpenCorporate?: () => void;
  onOpenRegister?: () => void;
  onOpenAIAdvisor?: () => void;
  onOpenLiveChat?: () => void;
  currency?: string;
  onToggleCurrency?: () => void;
  enrolledCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenCorporate,
}) => {
  return (
    <GlobalHeader
      onOpenDemo={onOpenCorporate}
      onOpenGetStarted={onOpenRegister}
    />
  );
};
