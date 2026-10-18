import React from 'react';
import { GlobalFooter } from '../../../components/GlobalFooter';

interface FooterProps {
  onNavigate?: (route: string) => void;
  onOpenBookDemo?: () => void;
  onOpenGetStarted?: () => void;
  onOpenSitemap?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBookDemo,
  onOpenGetStarted,
}) => {
  return (
    <GlobalFooter
      onOpenDemo={onOpenBookDemo}
      onOpenExpert={onOpenGetStarted}
    />
  );
};
