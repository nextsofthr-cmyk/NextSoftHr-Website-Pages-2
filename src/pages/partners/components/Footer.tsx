import React from 'react';
import { GlobalFooter } from '../../../components/GlobalFooter';

interface FooterProps {
  onApplyClick?: () => void;
  onPortalClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPortalClick }) => {
  return (
    <GlobalFooter
      onOpenDemo={onPortalClick}
    />
  );
};
