import React from 'react';
import { GlobalFooter } from '../../../../src/components/GlobalFooter';
import { NavigationPage } from '../../types';

interface FooterProps {
  onNavigate?: (page: NavigationPage) => void;
  onOpenLeadModal?: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLeadModal }) => {
  return (
    <GlobalFooter
      onOpenDemo={() => onOpenLeadModal?.('Demo')}
      onOpenExpert={() => onOpenLeadModal?.('Expert Consultation')}
    />
  );
};
