import React from 'react';
import { NextSoftLogo } from './NextSoftLogo';
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Eye,
  ArrowRight,
} from 'lucide-react';

interface CertificationSectionProps {
  onExploreCertified: () => void;
  onPreviewSampleCert: () => void;
}

export const CertificationSection: React.FC<CertificationSectionProps> = ({
  onExploreCertified,
  onPreviewSampleCert,
}) => {
  return (
    <section className="py-16 bg-white dark:bg-[#0F172A] border-b border-slate-200/70 dark:border-slate-800 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Narrative & Details */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/80 text-[#0F4C81] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
              Professional Credentials
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight mb-4">
              Learn. Demonstrate.{' '}
              <span className="text-[#0F4C81] dark:text-[#84CC16]">Get Certified.</span>
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Learners receive verified Certificates of Completion for eligible NextSoftHR training programs upon completing course milestones and passing the practical assessment. Showcase your validated HR and payroll competencies to employers, boards, and clients worldwide.
            </p>

            {/* Credential Attributes */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-lime-100 dark:bg-lime-950 text-[#65A30D] dark:text-[#84CC16] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Unique Verifiable Credential ID</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Each certificate features an encrypted alphanumeric verification code searchable in the NextSoftHR registry.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-lime-100 dark:bg-lime-950 text-[#65A30D] dark:text-[#84CC16] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Demonstrated Practical Skill Evaluation</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Issued only after passing real-world scenario tests (minimum 75% passing threshold required).</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-lime-100 dark:bg-lime-950 text-[#65A30D] dark:text-[#84CC16] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Digital Sharing & PDF Download</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Easily attach to your LinkedIn certifications, CV, employer records, and printable high-res formats.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreCertified}
                className="px-5 py-3 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0B3C68] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Certified Training</span>
                <ArrowRight className="w-4 h-4 text-[#84CC16]" />
              </button>

              <button
                onClick={onPreviewSampleCert}
                className="px-4 py-3 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#0F4C81] dark:text-[#84CC16]" />
                <span>Preview Interactive Certificate</span>
              </button>
            </div>

            {/* Explicit Honest Standard Notice */}
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4 italic">
              *NextSoftHR certificates validate skills acquired through NextSoftHR Training Academy curriculum and practical evaluations.
            </p>
          </div>

          {/* Right Column: Realistic Professional Certificate Mockup */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Certificate Card Container with classic executive border */}
              <div
                onClick={onPreviewSampleCert}
                className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-8 border-slate-100 dark:border-slate-800 ring-1 ring-slate-300/80 dark:ring-slate-700 cursor-pointer hover:shadow-2xl transition-all group"
              >
                {/* Certificate Inner Double Border */}
                <div className="border-2 border-[#0F4C81]/20 p-6 rounded-lg bg-gradient-to-b from-slate-50/40 via-white to-slate-50/40 relative">
                  
                  {/* Watermark / Logo Top */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <NextSoftLogo />
                    <div className="text-right">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-[#0F4C81]">Executive Faculty</div>
                      <div className="text-[10px] text-slate-500 font-mono">ID: NSHR-2026-8492</div>
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <div className="text-center my-6">
                    <div className="inline-block mb-1 text-[11px] font-bold text-[#65A30D] tracking-[0.25em] uppercase">
                      Certificate of Completion
                    </div>
                    <p className="text-[11px] text-slate-500">This is to certify that</p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight my-1.5 font-serif">
                      Chidinma Osuagwu
                    </h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto">
                      has successfully satisfied all instructional requirements and practical assessments for
                    </p>
                    <div className="my-2.5 px-3 py-1.5 bg-blue-50/80 rounded-md border border-blue-200/60 inline-block">
                      <span className="text-xs sm:text-sm font-extrabold text-[#0F4C81]">
                        Payroll Administration & End-to-End Processing
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Demonstrating mastery in gross-to-net computation, statutory tax compliance, and payroll reconciliation.
                    </p>
                  </div>

                  {/* Signatures & Seal */}
                  <div className="flex items-end justify-between pt-4 border-t border-slate-200 mt-6">
                    <div className="text-center">
                      <div className="font-serif italic text-sm text-slate-800 border-b border-slate-300 pb-1 mb-1 px-2">
                        Amina Bello
                      </div>
                      <div className="text-[10px] font-bold text-slate-700">Amina Bello, MCIPM</div>
                      <div className="text-[9px] text-slate-400">Academic Director</div>
                    </div>

                    {/* Gold/Lemon Certified Seal */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0F4C81] to-[#1E6091] text-white flex flex-col items-center justify-center p-1 shadow-md border-2 border-[#84CC16]">
                      <Award className="w-5 h-5 text-[#84CC16]" />
                      <span className="text-[8px] font-extrabold tracking-widest uppercase">Verified</span>
                    </div>

                    <div className="text-center">
                      <div className="font-serif italic text-sm text-slate-800 border-b border-slate-300 pb-1 mb-1 px-2">
                        Babatunde Adeleke
                      </div>
                      <div className="text-[10px] font-bold text-slate-700">Babatunde Adeleke, FCA</div>
                      <div className="text-[9px] text-slate-400">Lead Faculty Assessor</div>
                    </div>
                  </div>

                  {/* Hover prompt */}
                  <div className="absolute inset-0 bg-[#0F4C81]/85 backdrop-blur-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
                    <Eye className="w-8 h-8 text-[#84CC16] mb-2" />
                    <span className="text-sm font-bold">Click to View Full Certificate</span>
                    <span className="text-xs text-slate-200 mt-1">Interactive verification, high-res & print ready</span>
                  </div>

                </div>
              </div>

              {/* Floating Verification Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#65A30D] dark:text-[#84CC16]" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Instant Online Credential Verification</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
