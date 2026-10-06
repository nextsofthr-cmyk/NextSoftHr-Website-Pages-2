import React, { useState } from 'react';
import { DOCUMENT_CENTER } from '../data/partnerData';
import { DocumentItem, AcceptanceRecord } from '../types/agreement';
import {
  FileText,
  Download,
  Printer,
  Eye,
  CheckCircle2,
  Clock,
  History,
  FileCheck,
  Shield,
  X,
  ExternalLink
} from 'lucide-react';

interface PartnerDocumentCenterProps {
  acceptanceRecord: AcceptanceRecord | null;
  onOpenAcceptance: () => void;
}

export const PartnerDocumentCenter: React.FC<PartnerDocumentCenterProps> = ({
  acceptanceRecord,
  onOpenAcceptance
}) => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (doc: DocumentItem) => {
    // Generate text/markdown export and download
    const content = `# NEXTSOFTHR LEGAL INSTRUMENT: ${doc.title.toUpperCase()}
Document Code: ${doc.code}
Version: ${doc.version}
Standard Pages: ${doc.pages}
Brand: NextSoftHR (www.nextsofthr.org)
Support: +2349158482622

${doc.description}

==============================================================
INSTRUMENT SUMMARY & OPERATIONAL SCOPE:
${doc.contentPreview}
==============================================================

This document constitutes an official component of the NextSoftHR Reseller, Partner, Distributor, Affiliate and Associate Agreement framework.
All rights reserved © NextSoftHR.`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.code}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(doc.id);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <section id="documents" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
            <span>Official Legal Repository</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>11 Binding Documents</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Partner Document Center & Version Control
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Access, review, and download official schedules, operational handbooks, brand rules, and compliance addenda. All agreements are maintained under strict version control and cryptographic archiving.
          </p>
        </div>

        {/* Version Control & Status Panel (Prompt Requirement) */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <History className="w-5 h-5 text-blue-700" />
              <h3 className="text-base font-bold text-slate-900">
                Legal Document Version Control & Status
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Current Production Release:</span>
              <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                v1.0 (Active)
              </span>
            </div>
          </div>

          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px] mb-1">Agreement Version:</span>
              <span className="font-bold text-slate-900 text-sm">Version 1.0</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px] mb-1">Effective Date:</span>
              <span className="text-slate-900 font-semibold">October 1, 2026</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px] mb-1">Last Updated:</span>
              <span className="text-slate-900 font-semibold">October 1, 2026</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px] mb-1">Previous Version:</span>
              <span className="text-slate-500">v0.9 (Channel Preview)</span>
            </div>
          </div>

          {/* Change Summary & Acceptance Status */}
          <div className="mt-4 pt-4 border-t border-slate-100 grid md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-semibold text-slate-700 block mb-1">Change Summary (v1.0 Release):</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Codified 81 original legal clauses; established 12 partner classifications; updated Lead Protection duration to 90 days with 8 forfeiture exceptions; integrated Schedule D (Data Processing Addendum) for NDPA/GDPR; added Multi-Jurisdiction Schedule C.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-blue-950 block">Your Acceptance Status:</span>
                {acceptanceRecord ? (
                  <span className="text-emerald-700 font-bold text-xs flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accepted on {new Date(acceptanceRecord.acceptanceDate).toLocaleDateString()} ({acceptanceRecord.agreementId})</span>
                  </span>
                ) : (
                  <span className="text-amber-800 text-[11px] block mt-0.5">
                    Not yet executed. Electronic signature required.
                  </span>
                )}
              </div>

              {!acceptanceRecord && (
                <button
                  onClick={onOpenAcceptance}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Accept Now
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 11 Downloadable Documents Grid */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENT_CENTER.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-sm transition-all"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 text-xs">
                  <span className="font-mono text-slate-400">{doc.code}</span>
                  <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {doc.pages} Pages
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {doc.title}
                    </h4>
                    <span className="text-[11px] text-blue-600 font-medium block mt-0.5">
                      {doc.category}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  {doc.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => handleDownload(doc)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  {downloadSuccess === doc.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Document Preview Modal */}
        {selectedDoc && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-lime-400" />
                  <h3 className="text-base font-bold text-white">
                    {selectedDoc.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono">
                  <span>Code: {selectedDoc.code}</span>
                  <span>Version: {selectedDoc.version}</span>
                  <span>Length: {selectedDoc.pages} pages</span>
                </div>

                <div>
                  <span className="font-bold text-slate-900 block mb-1">Overview:</span>
                  <p className="text-slate-600 leading-relaxed">{selectedDoc.description}</p>
                </div>

                <div>
                  <span className="font-bold text-slate-900 block mb-1">Content Preview:</span>
                  <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed border border-slate-800">
                    {selectedDoc.contentPreview}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-[11px] leading-relaxed">
                  To execute this document as part of your partner standing, use the digital acceptance flow or download the verified markdown/PDF schedule.
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownload(selectedDoc)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Document</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
