import React from 'react';
import { GlobalFooter } from '../../../components/GlobalFooter';

interface FooterProps {
  onOpenDocCenter?: () => void;
  onOpenAcceptance?: () => void;
  onOpenLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLogin,
  onOpenAcceptance,
}) => {
  return (
    <GlobalFooter
      onOpenDemo={onOpenLogin}
      onOpenExpert={onOpenAcceptance}
    />
  );
};
