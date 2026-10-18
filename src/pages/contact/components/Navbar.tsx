import React from 'react';
import { GlobalHeader } from '../../../components/GlobalHeader';

interface NavbarProps {
  onSelectOption?: (type: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectOption }) => {
  return (
    <GlobalHeader
      onOpenDemo={() => onSelectOption?.('demo')}
      onOpenGetStarted={() => onSelectOption?.('quote')}
    />
  );
};
