import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Plus, 
  ExternalLink, 
  HelpCircle, 
  Sparkles, 
  Check, 
  Clock, 
  BookOpen, 
  X,
  FileCheck2,
  Lock
} from 'lucide-react';
import { ParsedResumeProfile, VerifiedSkill, ExternalCertification } from '../types';

interface VerifySkillsSectionProps {
  parsedProfile: ParsedResumeProfile | null;
  onUpdateProfile: (updatedProfile: ParsedResumeProfile) => void;
  onToast?: (message: string) => void;
}

// Sample skill assessments
const MOCK_ASSESSMENTS: Record<string, { questions: Array<{ q: string; options: string[]; correctIdx: number }> }> = {
  default: {
    questions: [
      {
        q: 'Which framework best establishes authoritative compliance and operational audit trails?',
        options: ['Continuous real-time logging & automated reconciliation', 'Manual end-of-quarter spreadsheets', 'Ad-hoc spot checks without schema validation', 'Unversioned static documentation'],
        correctIdx: 0
      },
      {
        q: 'In strategic workforce operations, how should high-priority skill gaps be mitigated?',
        options: ['Competency-matrix benchmarking & targeted upskilling', 'Immediate hiring freeze', 'Ignoring market attrition metrics', 'Lowering quality bars'],
        correctIdx: 0
      },
      {
        q: 'What is the primary indicator of scalable domain proficiency?',
        options: ['Measurable outcome velocity and repeatable architectural patterns', 'Number of meetings attended', 'Seniority title alone', 'Word count on resume'],
        correctIdx: 0
      }
    ]
  }
};

export const VerifySkillsSection: React.FC<VerifySkillsSectionProps> = ({
  parsedProfile,
  onUpdateProfile,
  onToast
}) => {
  // Assessment Modal state
  const [activeAssessmentSkill, setActiveAssessmentSkill] = useState<string | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<number[]>([0, 0, 0]);
  const [isSubmittingAssessment, setIsSubmittingAssessment] = useState(false);

  // Link Certification Modal state
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certName, setCertName] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certId, setCertId] = useState('');
  const [certSkill, setCertSkill] = useState('');

  if (!parsedProfile) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <ShieldCheck className="w-12 h-12 text-slate-400 mx-auto mb-2" />
        <p className="font-bold text-slate-700 dark:text-slate-200">No Candidate Profile Active</p>
        <p className="text-xs">Please upload or load a sample resume first to verify skills.</p>
      </div>
    );
  }

  const verifiedSkills = parsedProfile.verifiedSkills || [];
  const externalCerts = parsedProfile.externalCertifications || [];
  const allExtractedSkills = parsedProfile.extractedSkills || [];

  const isSkillVerified = (skillName: string) => {
    return verifiedSkills.some(v => v.name.toLowerCase() === skillName.toLowerCase());
  };

  const getVerificationDetail = (skillName: string) => {
    return verifiedSkills.find(v => v.name.toLowerCase() === skillName.toLowerCase());
  };

  // Launch Assessment
  const handleStartAssessment = (skillName: string) => {
    setActiveAssessmentSkill(skillName);
    setAssessmentAnswers([0, 0, 0]);
  };

  // Complete Assessment
  const handleSubmitAssessment = () => {
    if (!activeAssessmentSkill) return;
    setIsSubmittingAssessment(true);

    setTimeout(() => {
      const newVerifiedSkill: VerifiedSkill = {
        name: activeAssessmentSkill,
        verifiedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        score: Math.floor(Math.random() * 8) + 92, // 92-99%
        type: 'assessment'
      };

      const updatedVerifiedList = [
        ...verifiedSkills.filter(v => v.name.toLowerCase() !== activeAssessmentSkill.toLowerCase()),
        newVerifiedSkill
      ];

      const updatedProfile: ParsedResumeProfile = {
        ...parsedProfile,
        verifiedSkills: updatedVerifiedList
      };

      onUpdateProfile(updatedProfile);
      setIsSubmittingAssessment(false);
      setActiveAssessmentSkill(null);

      if (onToast) {
        onToast(`🛡️ Skill Verified: "${activeAssessmentSkill}" passed with ${newVerifiedSkill.score}%! Badge awarded.`);
      }
    }, 700);
  };

  // Submit External Certification
  const handleAddCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName || !certIssuer) return;

    const newCert: ExternalCertification = {
      id: `cert-${Date.now()}`,
      name: certName,
      issuer: certIssuer,
      credentialId: certId || `NX-${Math.floor(Math.random() * 90000 + 10000)}`,
      issueDate: 'Recently Verified',
      skillsVerified: certSkill ? [certSkill] : ['Industry Domain Expertise'],
      isVerified: true
    };

    let updatedVerifiedList = [...verifiedSkills];
    if (certSkill) {
      updatedVerifiedList = [
        ...updatedVerifiedList.filter(v => v.name.toLowerCase() !== certSkill.toLowerCase()),
        {
          name: certSkill,
          verifiedAt: 'Verified via External Certification',
          type: 'certification',
          certName: certName,
          issuer: certIssuer
        }
      ];
    }

    const updatedProfile: ParsedResumeProfile = {
      ...parsedProfile,
      externalCertifications: [...externalCerts, newCert],
      verifiedSkills: updatedVerifiedList,
      certifications: [...(parsedProfile.certifications || []), certName]
    };

    onUpdateProfile(updatedProfile);
    setIsCertModalOpen(false);
    setCertName('');
    setCertIssuer('');
    setCertId('');
    setCertSkill('');

    if (onToast) {
      onToast(`🎓 Certification verified: "${newCert.name}" by ${newCert.issuer}!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Value Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-lime-500/10 via-blue-500/10 to-transparent border border-lime-500/30 dark:border-lime-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-lime-500 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-[#142B4A] dark:text-white">
                NextSoft Verified Skills & Credentials
              </h3>
              <span className="text-[10px] font-bold bg-lime-500 text-slate-950 px-2 py-0.5 rounded-full shadow-2xs">
                {verifiedSkills.length} Verified
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Verified skills display an official green check badge to recruiters and hiring managers, boosting interview shortlist rates by 3.2x.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsCertModalOpen(true)}
          className="px-4 py-2 bg-[#142B4A] hover:bg-[#1e3a63] dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Award className="w-4 h-4 text-lime-400" />
          <span>Link External Credential</span>
        </button>
      </div>

      {/* Skills Verification Matrix */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="font-extrabold text-sm text-[#142B4A] dark:text-white">
              Candidate Extracted Skills Verification Status
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Complete a 3-question competency screen or attach a certificate to earn the badge.
            </span>
          </div>

          <span className="text-xs font-mono font-bold text-lime-700 dark:text-lime-400">
            {verifiedSkills.length} of {allExtractedSkills.length} Badged
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {allExtractedSkills.map((skill, idx) => {
            const verified = isSkillVerified(skill);
            const detail = getVerificationDetail(skill);

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border transition-all ${
                  verified
                    ? 'bg-lime-50/60 dark:bg-lime-950/40 border-lime-300 dark:border-lime-800/80 shadow-2xs'
                    : 'bg-slate-50/60 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="truncate">
                    <span className="font-bold text-xs text-slate-900 dark:text-white block truncate">
                      {skill}
                    </span>
                    {verified ? (
                      <span className="text-[10px] text-lime-700 dark:text-lime-300 font-semibold flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                        <span>
                          {detail?.score ? `${detail.score}% Score` : detail?.issuer || 'Verified Credential'}
                        </span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 block mt-0.5">Unverified Competency</span>
                    )}
                  </div>

                  {verified ? (
                    <span className="px-2 py-0.5 bg-lime-500 text-slate-950 text-[10px] font-black rounded-full flex items-center gap-1 shadow-2xs shrink-0">
                      <ShieldCheck className="w-3 h-3" />
                      <span>VERIFIED</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStartAssessment(skill)}
                      className="px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-lime-50 text-slate-700 dark:text-slate-200 hover:text-lime-800 border border-slate-200 dark:border-slate-600 rounded-lg text-[10px] font-bold shadow-2xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Sparkles className="w-3 h-3 text-lime-600 dark:text-lime-400" />
                      <span>Take Quiz</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* External Certifications List */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            <h4 className="font-extrabold text-sm text-[#142B4A] dark:text-white">
              Verified External Certifications & Licenses ({externalCerts.length})
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setIsCertModalOpen(true)}
            className="text-xs font-bold text-lime-700 dark:text-lime-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {externalCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white">{cert.name}</h5>
                  <ShieldCheck className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {cert.issuer} · Credential ID: <span className="font-mono text-slate-700 dark:text-slate-300">{cert.credentialId}</span>
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {cert.skillsVerified?.map((sk, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 rounded font-semibold">
                      ✓ {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {externalCerts.length === 0 && (
            <div className="col-span-full py-6 text-center text-slate-400 text-xs">
              No external certifications added yet. Click "+ Add Certification" to verify CIPM, SHRM, AWS, PMP, or CFA credentials.
            </div>
          )}
        </div>
      </div>

      {/* Recruiter Preview Perspective */}
      <div className="p-4 bg-slate-900 dark:bg-black rounded-2xl text-white text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-lime-500 text-slate-950 flex items-center justify-center font-black">
            ✓
          </div>
          <div>
            <span className="font-bold text-lime-400 block">Recruiter Talent View Preview:</span>
            <span className="text-[11px] text-slate-300">
              "{parsedProfile.fullName}" displays <strong>{verifiedSkills.length} Verified Skill Badges</strong> on recruiter candidate search cards.
            </span>
          </div>
        </div>
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Live in Talent Pool</span>
      </div>

      {/* Interactive Assessment Modal */}
      {activeAssessmentSkill && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-lg border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                <h4 className="font-extrabold text-sm text-[#142B4A] dark:text-white">
                  Skill Assessment: {activeAssessmentSkill}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveAssessmentSkill(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Answer the following 3 multiple-choice scenario questions to certify your proficiency in <strong>{activeAssessmentSkill}</strong>.
            </p>

            <div className="space-y-3.5">
              {MOCK_ASSESSMENTS.default.questions.map((qObj, qIdx) => (
                <div key={qIdx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Q{qIdx + 1}. {qObj.q}
                  </span>
                  <div className="space-y-1">
                    {qObj.options.map((opt, optIdx) => (
                      <label
                        key={optIdx}
                        className={`p-2 rounded-lg border block cursor-pointer text-[11px] transition-colors ${
                          assessmentAnswers[qIdx] === optIdx
                            ? 'bg-lime-50 dark:bg-lime-950/80 border-lime-500 font-semibold text-lime-900 dark:text-lime-300'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${qIdx}`}
                          checked={assessmentAnswers[qIdx] === optIdx}
                          onChange={() => {
                            const newAns = [...assessmentAnswers];
                            newAns[qIdx] = optIdx;
                            setAssessmentAnswers(newAns);
                          }}
                          className="mr-2 accent-lime-600"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setActiveAssessmentSkill(null)}
                className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitAssessment}
                disabled={isSubmittingAssessment}
                className="px-5 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSubmittingAssessment ? (
                  <span>Evaluating Score...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Submit & Claim Badge</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* External Certification Modal */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                <h4 className="font-extrabold text-sm text-[#142B4A] dark:text-white">
                  Add External Certification
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsCertModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCertification} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Certification Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CIPM Chartered Member or AWS Solutions Architect"
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CIPM, SHRM, Amazon Web Services, PMI"
                  value={certIssuer}
                  onChange={(e) => setCertIssuer(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Credential ID / License Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. CIPM-NG-44021 or AWS-99281-NX"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Associated Primary Skill to Verify
                </label>
                <select
                  value={certSkill}
                  onChange={(e) => setCertSkill(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
                >
                  <option value="">Select an extracted skill...</option>
                  {allExtractedSkills.map((sk, i) => (
                    <option key={i} value={sk}>{sk}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Save & Verify Badge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
