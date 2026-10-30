import React from 'react';
import { UserRole, PosterType, ParsedResumeProfile } from '../types';
import { GlobalHeader } from '../../../components/GlobalHeader';

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'register', role?: UserRole) => void;
  onOpenPostJob: (posterType?: PosterType) => void;
  onOpenSearch: (params?: { keyword?: string; category?: string; location?: string }) => void;
  onOpenServicesModal: (serviceId?: string) => void;
  onOpenApiDocs: () => void;
  onOpenAiAssistant: (tab?: 'candidate' | 'employer-search' | 'job-drafter' | 'chat') => void;
  savedJobsCount: number;
  onOpenSavedJobs: () => void;
  onOpenJobAlerts: () => void;
  onOpenCandidateDashboard: () => void;
  onOpenRecruiterDashboard?: () => void;
  onOpenResumeBuilder?: () => void;
  onOpenPaymentGateways?: (persona?: 'employer' | 'recruiter' | 'headhunter' | 'candidate', planId?: string) => void;
  savedCandidatesCount?: number;
  alertsCount: number;
  currentUser: { email: string; role: UserRole; name: string } | null;
  onSignOut: () => void;
  onLinkedInSignIn?: (userData: { name: string; email: string; role: UserRole }, parsedProfile: ParsedResumeProfile) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPostJob,
  onOpenServicesModal,
}) => {
  return (
    <GlobalHeader
      onOpenDemo={() => onOpenServicesModal('srv-b')}
      onOpenGetStarted={() => onOpenPostJob('company')}
    />
  );
};
