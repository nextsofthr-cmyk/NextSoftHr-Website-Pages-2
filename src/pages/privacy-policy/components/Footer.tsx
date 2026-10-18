import React from 'react';
import { GlobalFooter } from '../../../components/GlobalFooter';
import { Language, LanguageOption, Translations } from '../translations';

interface FooterProps {
  onOpenCookiesModal?: () => void;
  onOpenPrivacyModal?: () => void;
  currentLanguage?: Language;
  onSelectLanguage?: (lang: Language) => void;
  languageOptions?: LanguageOption[];
  t?: Translations;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCookiesModal,
  onOpenPrivacyModal,
}) => {
  return (
    <GlobalFooter
      onOpenDemo={onOpenCookiesModal}
      onOpenExpert={onOpenPrivacyModal}
    />
  );
};
