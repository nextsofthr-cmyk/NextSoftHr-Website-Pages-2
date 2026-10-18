import React from 'react';
import { GlobalHeader } from '../../../components/GlobalHeader';

interface NavbarProps {
  onFindPartnerClick?: () => void;
  onBecomePartnerClick?: () => void;
  onLoginClick?: () => void;
  onPartnerPortalClick?: () => void;
  activeCountry?: string;
  onCountrySelect?: (country: string) => void;
  onSelectCountry?: (country: string) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onOpenAiMatch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBecomePartnerClick,
  onPartnerPortalClick,
}) => {
  return (
    <GlobalHeader
      onOpenDemo={onPartnerPortalClick}
      onOpenGetStarted={onBecomePartnerClick}
    />
  );
};
