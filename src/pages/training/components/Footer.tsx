import React from 'react';
import { GlobalFooter } from '../../../components/GlobalFooter';

interface FooterProps {
  onNavigateSection?: (sectionId: string) => void;
  onFilterCategory?: (categoryName: string) => void;
  onOpenCorporate?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCorporate,
}) => {
  return (
    <GlobalFooter
      onOpenDemo={onOpenCorporate}
    />
  );
};
