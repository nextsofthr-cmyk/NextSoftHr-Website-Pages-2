import React from 'react';
import { GlobalFooter } from '../../../components/GlobalFooter';

interface FooterProps {
  onOpenDemo?: () => void;
  onOpenSupport?: () => void;
  onOpenPricing?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDemo,
  onOpenSupport,
}) => {
  return (
    <GlobalFooter
      onOpenDemo={onOpenDemo}
      onOpenExpert={onOpenSupport}
    />
  );
};
