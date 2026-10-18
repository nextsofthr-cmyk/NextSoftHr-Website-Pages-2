import React from 'react';
import { GlobalFooter } from '../../../components/GlobalFooter';

interface FooterProps {
  onSelectCountry?: (country: string) => void;
  onOpenPartnerPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPartnerPortal }) => {
  return (
    <GlobalFooter
      onOpenDemo={onOpenPartnerPortal}
    />
  );
};
