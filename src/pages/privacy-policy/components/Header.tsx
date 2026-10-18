import React from 'react';
import { GlobalHeader } from '../../../components/GlobalHeader';
import { Theme } from '../hooks/useTheme';
import { Language, LanguageOption, Translations } from '../translations';

interface HeaderProps {
  theme?: Theme;
  resolvedTheme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  currentLanguage?: Language;
  onSelectLanguage?: (lang: Language) => void;
  languageOptions?: LanguageOption[];
  t?: Translations;
  onOpenPrivacyModal?: () => void;
  onOpenAdminModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPrivacyModal,
  onOpenAdminModal,
}) => {
  return (
    <GlobalHeader
      onOpenDemo={onOpenAdminModal}
      onOpenGetStarted={onOpenPrivacyModal}
    />
  );
};
