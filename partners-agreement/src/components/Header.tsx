import React from 'react';
import { GlobalHeader } from '../../../components/GlobalHeader';
import { AcceptanceRecord } from '../types/agreement';

interface HeaderProps {
  activeView?: 'agreement' | 'portal';
  setActiveView?: (view: 'agreement' | 'portal') => void;
  onOpenAcceptance?: () => void;
  acceptanceRecord?: AcceptanceRecord | null;
  onOpenDocCenter?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  setActiveView,
  onOpenAcceptance,
}) => {
  return (
    <GlobalHeader
      onOpenDemo={() => setActiveView?.('portal')}
      onOpenGetStarted={onOpenAcceptance}
    />
  );
};
