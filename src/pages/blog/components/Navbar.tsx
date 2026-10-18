import React from 'react';
import { GlobalHeader } from '../../../components/GlobalHeader';

interface NavbarProps {
  currentView?: string;
  onNavigate?: (route: string) => void;
  onOpenBookDemo?: () => void;
  onOpenGetStarted?: () => void;
  onOpenBookmarks?: () => void;
  onOpenCmsAdmin?: () => void;
  bookmarkedCount?: number;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBookDemo,
  onOpenGetStarted,
}) => {
  return (
    <GlobalHeader
      onOpenDemo={onOpenBookDemo}
      onOpenGetStarted={onOpenGetStarted}
    />
  );
};
