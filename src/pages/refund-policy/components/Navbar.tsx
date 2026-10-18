import React from 'react';
import { GlobalHeader } from '../../../components/GlobalHeader';
import { SupportedLanguage } from '../data/translations';

interface NavbarProps {
  onOpenRefundModal?: () => void;
  onOpenPartnerModal?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  currentLang?: SupportedLanguage;
  onSelectLang?: (lang: SupportedLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRefundModal,
  onOpenPartnerModal,
}) => {
  return (
    <GlobalHeader
      onOpenDemo={onOpenPartnerModal}
      onOpenGetStarted={onOpenRefundModal}
    />
  );
};
