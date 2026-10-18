import React from 'react';
import { GlobalFooter } from '../../../components/GlobalFooter';
import { SupportedLanguage } from '../data/translations';

interface FooterProps {
  onOpenTermsModal?: () => void;
  onOpenPrivacyModal?: () => void;
  onOpenRefundModal?: () => void;
  onOpenPartnerModal?: () => void;
  currentLang?: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRefundModal,
  onOpenPartnerModal,
}) => {
  return (
    <GlobalFooter
      onOpenDemo={onOpenPartnerModal}
      onOpenExpert={onOpenRefundModal}
    />
  );
};
