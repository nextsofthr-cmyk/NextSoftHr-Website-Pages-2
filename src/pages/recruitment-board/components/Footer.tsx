import React from 'react';
import { GlobalFooter } from '../../../components/GlobalFooter';
import { UserRole } from '../types';

interface FooterProps {
  onOpenSearch?: () => void;
  onOpenAuth?: (mode: 'login' | 'register', role?: UserRole) => void;
  onOpenPostJob?: () => void;
  onOpenServicesModal?: (serviceId?: string) => void;
  onOpenSavedJobs?: () => void;
  onOpenApiDocs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPostJob,
  onOpenServicesModal,
}) => {
  return (
    <GlobalFooter
      onOpenDemo={() => onOpenServicesModal?.('srv-b')}
      onOpenExpert={onOpenPostJob}
    />
  );
};
