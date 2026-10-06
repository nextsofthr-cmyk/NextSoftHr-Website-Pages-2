import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  FileCheck2,
  Lock,
  CheckCircle2,
  ExternalLink,
  FileText,
  Sparkles,
  Globe2,
  Building2,
  Download,
  Eye,
  Info,
} from 'lucide-react';

export interface CertificationBadge {
  id: string;
  code: string;
  name: string;
  issuer: string;
  jurisdiction: string;
  status: 'Certified' | 'Compliant' | 'Audited';
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
  corePillars: string[];
  auditCycle: string;
  certificateRef: string;
}

export const CERTIFICATIONS: CertificationBadge[] = [
  {
    id: 'iso27001',
    code: 'ISO 27001:2022',
    name: 'Information Security Management System (ISMS)',
    issuer: 'International Organization for Standardization',
    jurisdiction: 'Global Standard',
    status: 'Certified',
    accentColor: '#0256C4',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/80',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    badgeText: 'text-[#0256C4] dark:text-blue-300',
    description:
      'Rigorous verification of comprehensive security controls across all NextSofthr payroll engines, HR databases, employee access protocols, and cloud infrastructure.',
    corePillars: [
      'AES-256 end-to-end data encryption at rest and in transit (TLS 1.3)',
      'Granular Role-Based Access Control (RBAC) with mandatory multi-factor authentication (MFA)',
      'Bi-annual independent third-party penetration testing and vulnerability assessments',
      'Immutable audit logging capturing every payroll change, export, and record modification',
    ],
    auditCycle: 'Annual Third-Party Surveillance Audit',
    certificateRef: 'ISO/IEC-ISMS-2024-AFR-0941',
  },
  {
    id: 'ndpr',
    code: 'NDPR / NDPA 2023',
    name: 'Nigeria Data Protection Regulation & Data Protection Act',
    issuer: 'Nigeria Data Protection Commission (NDPC)',
    jurisdiction: 'African Sovereignty (Nigeria & ECOWAS)',
    status: 'Compliant',
    accentColor: '#84CC16',
    badgeBg: 'bg-lime-50 dark:bg-lime-950/60',
    badgeBorder: 'border-lime-200 dark:border-lime-800',
    badgeText: 'text-lime-700 dark:text-[#84CC16]',
    description:
      'Full statutory adherence to Nigerian and West African sovereign data governance, ensuring local employee records and banking credentials meet national privacy mandates.',
    corePillars: [
      'Designated internal Data Protection Officer (DPO) and registered NDPC Data Controller status',
      'African sovereign data residency options with Tier-IV local cloud redundancy',
      'Annual statutory Data Protection Audit filing with licensed DPCO partners',
      'Mandatory employee consent frameworks and transparent data processing registers',
    ],
    auditCycle: 'Annual Statutory NDPC Audit Filing',
    certificateRef: 'NDPC/DPO/REG-2024/00827',
  },
  {
    id: 'gdpr',
    code: 'EU GDPR / UK GDPR',
    name: 'General Data Protection Regulation',
    issuer: 'European Data Protection Board Guidelines',
    jurisdiction: 'Pan-African & International Subsidiaries',
    status: 'Compliant',
    accentColor: '#059669',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    description:
      'Standard Contractual Clauses (SCCs) and Article 28 compliance empowering Pan-African enterprises with European headquarters or multinational expatriate staff.',
    corePillars: [
      'Data Subject Rights portal: Right of Access, Rectification, and Automated Data Erasure ("Right to be Forgotten")',
      'Strict Article 28 Data Processing Agreements (DPA) protecting enterprise employer liability',
      '72-hour automated regulatory breach notification SLA and encrypted forensic telemetry',
      'Zero third-party advertising tracking or unauthorized commercial data monetization',
    ],
    auditCycle: 'Continuous Real-Time Data Flow Governance',
    certificateRef: 'GDPR-DPA-GLOBAL-COMPLIANCE-882',
  },
];

interface ComplianceCertificationProps {
  onOpenWhitepaper?: () => void;
}

export const ComplianceCertification: React.FC<ComplianceCertificationProps> = ({
  onOpenWhitepaper,
}) => {
  const [selectedBadge, setSelectedBadge] = useState<string>('iso27001');
  const [showCertDetails, setShowCertDetails] = useState<boolean>(false);

  const activeBadge = CERTIFICATIONS.find((b) => b.id === selectedBadge) || CERTIFICATIONS[0];

  const handleDownloadSummary = () => {
    // Generates/triggers security brief inquiry or downloadable link
    const mailto = `mailto:compliance@nextsofthr.com?subject=Request%20NextSofthr%20Compliance%20Packet%20(ISO%2027001,%20GDPR,%20NDPR)&body=Hello%20NextSofthr%20Information%20Security%20Team,%0A%0APlease%20provide%20the%20official%20Compliance%20Packet,%20SOC2%20readiness%20summary,%20and%20NDPR%20audit%20certificates%20for%20our%20enterprise%20vendor%20due%20diligence.%0A%0AOrganization:%0AContact%20Name:%0APosition:%0AEmployee%20Count:`;
    window.location.href = mailto;
  };

  return (
    <div className="mt-14 pt-12 border-t border-slate-200/80 dark:border-blue-900/60">
      {/* Header with trust subtitle */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-xs font-bold text-[#0256C4] dark:text-[#84CC16] mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Independent Compliance Governance</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
          Certified Security, Privacy &amp; Data Sovereignty
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
          NextSofthr undergoes regular third-party audits to guarantee that your workforce payroll, biometric attendance, and personal identifiers meet international standards and African legal jurisdictions.
        </p>
      </div>

      {/* 3 Prominent Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CERTIFICATIONS.map((cert) => {
          const isSelected = selectedBadge === cert.id;
          return (
            <div
              key={cert.id}
              onClick={() => setSelectedBadge(cert.id)}
              className={`relative rounded-3xl p-6 sm:p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-white dark:bg-[#0A2540] border-[#0256C4] dark:border-[#84CC16] shadow-xl ring-2 ring-[#0256C4]/20 dark:ring-[#84CC16]/20 scale-[1.01]'
                  : 'bg-white/80 dark:bg-[#082038]/80 border-slate-200/90 dark:border-blue-900/60 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'
              }`}
            >
              {/* Badge Visual Seal / Header */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  {/* Seal Shield */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs shadow-inner ${
                      cert.id === 'iso27001'
                        ? 'bg-[#0256C4] text-white'
                        : cert.id === 'ndpr'
                        ? 'bg-[#84CC16] text-[#0A2540]'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    <ShieldCheck className="w-6 h-6" />
                  </div>

                  {/* Verification Status Pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{cert.status}</span>
                  </div>
                </div>

                {/* Badge Standard Title */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {cert.jurisdiction}
                  </div>
                  <h4 className="text-xl font-black text-[#0A2540] dark:text-white group-hover:text-[#0256C4] dark:group-hover:text-[#84CC16] transition-colors">
                    {cert.code}
                  </h4>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-snug">
                    {cert.name}
                  </div>
                </div>

                {/* Short excerpt */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed line-clamp-3">
                  {cert.description}
                </p>
              </div>

              {/* Bottom Card Footer with Cert ID & Selection Cue */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-blue-900/60 flex items-center justify-between text-[11px]">
                <div className="font-mono text-slate-500 dark:text-slate-400 truncate pr-2">
                  Ref: <span className="font-bold">{cert.certificateRef}</span>
                </div>
                <span
                  className={`font-bold transition-colors flex items-center gap-1 shrink-0 ${
                    isSelected
                      ? 'text-[#0256C4] dark:text-[#84CC16]'
                      : 'text-slate-500 dark:text-slate-400 group-hover:text-[#0A2540] dark:group-hover:text-white'
                  }`}
                >
                  <span>{isSelected ? 'Viewing Scope' : 'Inspect Scope'}</span>
                  <Info className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Active Certification Scope Drawer / Deep Dive */}
      <div className="mt-8 bg-white dark:bg-[#0A2540] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-blue-900/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0256C4]/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Scope & Verified Pillars (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-[#0256C4] dark:text-[#84CC16] font-black text-xs uppercase tracking-wider">
                Audited Scope Specification
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {activeBadge.issuer}
              </span>
            </div>

            <h4 className="text-2xl font-black text-[#0A2540] dark:text-white">
              {activeBadge.code} — Detailed Compliance Implementation
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeBadge.description}
            </p>

            {/* Core Verification Pillars Checklist */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#84CC16]" />
                <span>Verified Technical &amp; Legal Safeguards:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeBadge.corePillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-[#07182E] border border-slate-200/80 dark:border-blue-900/60 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{pillar}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Governance Audit Card & Download Action (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-50 dark:bg-[#07182E] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-blue-900/60 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A2540] dark:text-white">
              <ShieldCheck className="w-4 h-4 text-[#84CC16]" />
              <span>Audit &amp; Governance Metadata</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-blue-900/40">
                <span className="text-slate-500 dark:text-slate-400">Certification:</span>
                <span className="font-bold text-slate-900 dark:text-white">{activeBadge.code}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-blue-900/40">
                <span className="text-slate-500 dark:text-slate-400">Audit Status:</span>
                <span className="font-extrabold text-emerald-600 dark:text-[#84CC16]">Verified &amp; Active</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-blue-900/40">
                <span className="text-slate-500 dark:text-slate-400">Review Frequency:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{activeBadge.auditCycle}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-blue-900/40">
                <span className="text-slate-500 dark:text-slate-400">Registry ID:</span>
                <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">{activeBadge.certificateRef}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleDownloadSummary}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0256C4] hover:bg-[#024aa8] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Request Official Security Packet</span>
              </button>

              <a
                href="https://wa.me/2349158482622?text=Hello%20NextSofthr%20DPO%20Team%2C%20we%20require%20your%20ISO%2027001%20and%20NDPR%20compliance%20documentation%20for%20our%20enterprise%20procurement%20audit."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-white dark:bg-blue-950/60 hover:bg-slate-100 dark:hover:bg-blue-900 text-slate-700 dark:text-slate-300 font-semibold text-[11px] border border-slate-200 dark:border-blue-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Inquire with Compliance Officer via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
