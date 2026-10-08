import React from 'react';
import { NextSoftLogo } from './NextSoftLogo';
import { CertificateData } from '../types';
import { X, Printer, ShieldCheck, Download, Award } from 'lucide-react';

interface CertificateModalProps {
  isOpen?: boolean;
  certificate: CertificateData | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen = true,
  certificate,
  onClose,
}) => {
  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Award className="w-4 h-4 text-[#84CC16]" />
            <span>NextSoftHR Official Credential Verification Viewer</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Sheet Container (Always crisp classic certificate parchment for print accuracy) */}
        <div className="p-6 sm:p-10 bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-x-auto">
          <div
            id="printable-certificate"
            className="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-xl shadow-lg border-8 border-slate-200 relative text-slate-900 font-sans"
          >
            {/* Guilloche / Geometric Inner Frame */}
            <div className="border-4 border-[#0F4C81]/30 p-6 sm:p-8 rounded-lg relative bg-gradient-to-b from-blue-50/20 via-white to-blue-50/20">
              
              {/* Top Watermark & Serial */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <NextSoftLogo />
                <div className="text-right">
                  <div className="text-[10px] font-extrabold tracking-widest uppercase text-[#0F4C81]">
                    Official Credential
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-700">
                    ID: {certificate.certificateId}
                  </div>
                </div>
              </div>

              {/* Central Citation */}
              <div className="text-center my-8">
                <div className="inline-block px-3 py-1 bg-lime-100/70 border border-lime-300 rounded text-xs font-extrabold text-[#65A30D] tracking-[0.25em] uppercase mb-2">
                  Certificate of Completion
                </div>

                <p className="text-xs text-slate-500 uppercase tracking-widest mt-2">
                  This is proudly presented to
                </p>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight my-2 font-serif">
                  {certificate.learnerName}
                </h2>

                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  for successfully completing all prescribed lectures, practical simulations, and rigorous examination requirements for
                </p>

                <div className="my-4 px-4 py-2 bg-blue-50/90 border border-blue-200/80 rounded-md inline-block">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#0F4C81]">
                    {certificate.courseName}
                  </h3>
                </div>

                <p className="text-xs text-slate-500">
                  Demonstrated Competency Grade: <strong className="text-slate-800">{certificate.grade}</strong> · Issued on <strong className="text-slate-800">{certificate.completionDate}</strong>
                </p>
              </div>

              {/* Bottom Signatures & Seal */}
              <div className="flex items-end justify-between pt-6 border-t border-slate-200 mt-8">
                <div className="text-center w-36">
                  <div className="font-serif italic text-base text-slate-800 border-b border-slate-300 pb-1 mb-1">
                    Amina Bello
                  </div>
                  <div className="text-[11px] font-bold text-slate-800">Amina Bello, MCIPM</div>
                  <div className="text-[10px] text-slate-400">Academic Director</div>
                </div>

                {/* Central NextSoftHR Seal */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0F4C81] to-[#1E6091] text-white flex flex-col items-center justify-center p-1 shadow-md border-2 border-[#84CC16]">
                  <ShieldCheck className="w-6 h-6 text-[#84CC16]" />
                  <span className="text-[7px] font-extrabold tracking-widest uppercase">Verified</span>
                </div>

                <div className="text-center w-36">
                  <div className="font-serif italic text-base text-slate-800 border-b border-slate-300 pb-1 mb-1">
                    {certificate.instructorName}
                  </div>
                  <div className="text-[11px] font-bold text-slate-800">{certificate.instructorName}</div>
                  <div className="text-[10px] text-slate-400">{certificate.instructorRole}</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#65A30D] dark:text-[#84CC16]" />
          <span>Credential ID verifiable at https://www.nextsofthr.org/verify/{certificate.certificateId}</span>
        </div>

      </div>
    </div>
  );
};
