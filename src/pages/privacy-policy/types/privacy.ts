export interface TocItem {
  id: string;
  title: string;
  number: string;
}

export interface DataCategory {
  title: string;
  description: string;
  items: string[];
  icon: string;
}

export interface RetentionRule {
  category: string;
  purpose: string;
  retentionPeriod: string;
  statutoryBasis: string;
}

export interface SecurityPillar {
  title: string;
  summary: string;
  details: string[];
}

export interface PrivacyRequestPayload {
  fullName: string;
  organization: string;
  email: string;
  requestType:
    | 'Access My Data'
    | 'Correct My Data'
    | 'Delete My Data'
    | 'Privacy Question'
    | 'Data Security Concern'
    | 'Other';
  message: string;
  attachmentName?: string;
  consent: boolean;
}

export interface CookieSettings {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}
