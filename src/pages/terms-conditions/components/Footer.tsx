import React from 'react';
import { GlobalFooter } from '../../../components/GlobalFooter';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenContact }) => {
  return (
    <GlobalFooter
      onOpenDemo={onOpenContact}
      onOpenExpert={onOpenPrivacy}
    />
  );
};
